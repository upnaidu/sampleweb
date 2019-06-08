var specials=/[*|\:<>[\]=`\\()';&]/;
var commonMessage="Invalid Condition was formed. Please adjust the field(s) :";
var commonMessageForInvalidDataTypes="Invalid Data Type field(s) :";
var invalidConditionMessage="";
conditionaldrag = function(sender, ev) {
	
	var serviceName = "conditional";
	serviceName = serviceName + serviceNameForId + "." + ev.target.innerText;
	var par ="<label id=" +	serviceName+"><strong>{" +	ev.target.innerText+"}</strong></label>";
	
	$("#conditionalServices").append(par);
	ev.dataTransfer.setData("text"," "+"{"+ev.target.innerText+"}");

}


conditionaldragOperators=function(sender, ev) {
	//ev.dataTransfer.effectsAllowed = "copy"; 
	//ev.dataTransfer.background='none';
	ev.dataTransfer.setData("text/plain"," "+ev.target.innerText);
}

logicaldragOperators=function(sender, ev) {
	ev.dataTransfer.setData("text"," "+ev.currentTarget.attributes.value.value);
}

var saveFlag=true;
var operatorArray=[];
operatorArray.push(">");
operatorArray.push("<");
operatorArray.push("==");
operatorArray.push("!=");
operatorArray.push("<=");
operatorArray.push(">=");


function validateInNOtINFileds(){
let validateFlag=false;
			if($("#if_in_dd0").val().trim()=="1" && $("#if_in_stmt0").val().split(',').length==1){
					var invalidConditionMessage="The (IN) qualifier requires more than one value selection.";
					  $("#modal_datatype").show();
					  $("#if_in_dd0").closest('.form-group').addClass('has-error');
	             	   $("#datatype_error").text(invalidConditionMessage);
	             	  validateFlag=true;
				   }
				
				if($("#if_in_dd0").val().trim()=="2" && $("#if_in_stmt0").val().split(',').length==1){
					 invalidConditionMessage="The NOTIN qualifier requires more than one value selection.";
					 invalidConditionMessageFlag=true;
					 $("#modal_datatype").show();
					  $("#if_in_dd0").closest('.form-group').addClass('has-error');
	             	   $("#datatype_error").text(invalidConditionMessage);
	             	  validateFlag=true;
				   }
                 if(!validateFlag){
			    for (var i = 0; i < $(".conditions").length; i++) {
					let obj = $(".conditions")[i];
					let current_index = $(obj).attr('id').match(/\d/g).join("");
				   
					if($("#if_elseif_in_dd_"+ current_index).val() =="1" && $("#if_elseif_in_stmt_"+current_index).val().split(',').length==1){
								 var invalidConditionMessage="The (IN) qualifier requires more than one value selection.";
									  $("#modal_datatype").show();
									  $("#if_elseif_in_dd_"+ current_index).closest('.form-group').addClass('has-error');
					             	   $("#datatype_error").text(invalidConditionMessage);
					             	  validateFlag=true;
					             	  break;
									} 
									
					if($("#if_elseif_in_dd_"+ current_index).val() =="2" && $("#if_elseif_in_stmt_"+current_index).val().split(',').length==1){
								var invalidConditionMessage="The NOTIN qualifier requires more than one value selection.";
									  $("#modal_datatype").show();
									  $("#if_elseif_in_dd_"+ current_index).closest('.form-group').addClass('has-error');  
					             	   $("#datatype_error").text(invalidConditionMessage);
					             	  validateFlag=true;
					             	  break;
									} 
			    }
                 }
                 
                 return  validateFlag;
	}

function validateConditionForm(conditionData1){
	
	var flag = true;
	var regex = /^[a-zA-Z]*$/;
	var regex_spaces = /^[a-zA-Z0-9 ]*$/; 
	 if ($("#condStmtID").val().trim() == "" && $("#condStmtID").val().trim().length == 0) {
			$("#condStmtID").closest('.form-group').addClass('has-error');
			$("#condStmtID").closest('.form-group').removeClass("has-success");
			//$("#letteridconditionError").text("This field is required.");
			flag = false;
		}else{
			$("#condStmtID").closest('.form-group').removeClass('has-error');
			$("#condStmtID").closest('.form-group').addClass("has-success");
		}
	   
	    if ($("#condStmtName").val().trim() == "" && $("#condStmtName").val().trim().length == 0 || $("#condStmtName").val().includes(".") ||
	    		$("#condStmtName").val().includes("_") || $("#condStmtName").val().includes("\'") ||  $("#condStmtName").val().replace(/[^A-Z0-9]/ig, "")=="") {
			$("#condStmtName").closest('.form-group').addClass('has-error');
			$("#condStmtName").closest('.form-group').removeClass("has-success");
			//$("#conditionNameError").text("This field is required.");
			flag = false;
		}/*else if (!regex_spaces.test($("#condStmtName").val())) {
			$("#condStmtName").closest('.form-group').addClass('has-error');
			$("#condStmtName").closest('.form-group').removeClass("has-success");
			//$("#conditionNameError").text("Condition Name  should contain only alphabets.");
			flag = false;
		}*/else{
			$("#condStmtName").closest('.form-group').removeClass('has-error');
			$("#condStmtName").closest('.form-group').addClass("has-success");
			$("#conditionNameError").text("");
		} 
		
	    if ($("#condStmtDesc").val().trim() == "" && $("#condStmtDesc").val().trim().length == 0) {
			$("#condStmtDesc").closest('.form-group').addClass('has-error');
			$("#condStmtDesc").closest('.form-group').removeClass("has-success");
			$("#condStmtDesc").text("This field is required.");
			flag = false;
		}/*else if (!regex_spaces.test($("#condStmtDesc").val())) {
			$("#condStmtDesc").closest('.form-group').addClass('has-error');
			$("#condStmtDesc").closest('.form-group').removeClass("has-success");
			$("#condStmtDesc").text("Condition Name  should contain only alphabets.");
			flag = false;
		}*/else{
			$("#condStmtDesc").closest('.form-group').removeClass('has-error');
			$("#condStmtDesc").closest('.form-group').addClass("has-success");
			$("#condStmtDesc").text("");
		} 
	    
 flag= conditionStatmentValidations(conditionData1,flag);

	    
		return flag;
}

function conditionStatmentValidations(conditionData1,flag){
	    for (var i = 0; i < $(".conditions").length; i++) {
			let obj = $(".conditions")[i];
			let current_index = $(obj).attr('id').match(/\d/g).join("");
			if (i == 0) {
				if($("#ifStatement_text").val().trim() ==""){
					$("#ifStatement_text").closest('.form-group').addClass('has-error');
					flag=false;
					saveFlag=false;
				}else{
					$("#ifStatement_text").closest('.form-group').removeClass('has-error');
					saveFlag=true;
				}
				
			 
				checkFlagForSingleOrMuiltipleCond=true;
				validationForINAndOut(conditionData1,current_index,i);
			 
			/* if($("#if_in_stmt0").val().trim()==""){
				 $("#if_in_stmt0").closest('.form-group').addClass('has-error');
				 flag=false;
			 }else{
				 $("#if_in_stmt0").closest('.form-group').removeClass('has-error'); 
			 }*/
			 
			 if($("#result0").val().trim()=="" || $("#result0").val().match(specials)){
				 $("#result0").closest('.col-md-12').addClass('has-error');
				 saveFlag=false;
				 flag=false;
			 }else{
				 $("#result0").closest('.col-md-12').removeClass('has-error'); 
				 if(saveFlag){
					 saveFlag=true;
				 }
				 
			 }
			 
			 if($("#finalelseresult").val().trim()=="" || $("#finalelseresult").val().match(specials)){
				 $("#finalelseresult").closest('.col-md-12').addClass('has-error');
				 saveFlag=false;
				 flag=false;
			 }else{
				 $("#finalelseresult").closest('.col-md-12').removeClass('has-error'); 
				 if(saveFlag){
					 saveFlag=true;
				 }
			 }

			} else {
				checkFlagForSingleOrMuiltipleCond=true;
				validationForINAndOut2(conditionData1,current_index,i);
				if($("#if_elseif_statement_text_"+current_index).val().trim() ==""){
					$("#if_elseif_statement_text_"+current_index).closest('.form-group').addClass('has-error');
					flag=false;
				}else{
					//$("#if_elseif_statement_text_"+current_index).closest('.form-group').removeClass('has-error');
				}
				
			/* if($("#if_elseif_in_dd_"+ current_index).val().trim()=="select"){
				 $("#if_elseif_in_dd_"+ current_index).closest('.form-group').addClass('has-error');
				 flag=false;
			 }else{
				 $("#if_elseif_in_dd_"+ current_index).closest('.form-group').removeClass('has-error'); 
			 }
			 
			 if($("#if_elseif_in_stmt_"+ current_index).val().trim()==""){
				 $("#if_elseif_in_stmt_"+ current_index).closest('.form-group').addClass('has-error');
				 flag=false;
			 }else{
				 $("#if_elseif_in_stmt_"+ current_index).closest('.form-group').removeClass('has-error'); 
			 }*/
			 
			 if($("#if_elseif_result_"+ current_index).val().trim()=="" || $("#if_elseif_result_"+ current_index).val().match(specials)){
				 $("#if_elseif_result_"+ current_index).closest('.col-md-12').addClass('has-error');
				 flag=false;
			 }else{
				 $("#if_elseif_result_"+ current_index).closest('.col-md-12').removeClass('has-error'); 
			 }
			}
		}
	    
		return flag;
}

// create conditional StmtJsonfield object
function conditionalStmtJsonfieldfuntion(){
	var nodes = $("[id^=conditional]");
	var finalList=[];
	for (var startIndex = 0; startIndex < nodes.length; startIndex++) {
		var serviceName=nodes[startIndex].id.substring(11);
		var beforeDotServiceName= serviceName.substring(0, serviceName.indexOf('.')); 
		var afterDotFieldName = (serviceName.substring(serviceName.indexOf('.'))).replace('.', "");
		if(beforeDotServiceName !="" && afterDotFieldName !="" && finalList[serviceName] !=afterDotFieldName){
			finalList.push({serviceName:beforeDotServiceName,fieldName:afterDotFieldName}); 
		}
	}
	
		if($("#updateCondStmtUpdateFlag").val()=="Update"){
			let dbServiceList=JSON.parse($("#condStmtJSON").val());
		  	for(let j in dbServiceList["serviceMappingList"]["0"]){

			 for(let k in dbServiceList["serviceMappingList"]["0"][j]) {
				    if(finalList[j] !=dbServiceList["serviceMappingList"]["0"][j][k]){
						finalList.push({serviceName:j,fieldName:dbServiceList["serviceMappingList"]["0"][j][k]}); 
					}
			 }
		  }
		}
	
	
 return JSON.stringify(finalList);
}
//Save letter condition form data
$(document).on('click','#if_save_btn,#show_previewData',function(event) {
                 //  disable_tab();
	if($("#if_condition").is(":visible")){
					var eventFrom=$(this).attr('id');
					var ctxPath = getContextPath();
					var urlString = ctxPath + '/saveConditionalStmt';
					var conditionData= {};
					var conditionData1= {};
					var dataTypeValue;
					
					$("#modal_services").css('display', 'none');
					conditionData["condStmtID"] = $("#condStmtID").val();
					conditionData["condStmtDesc"] = $("#condStmtDesc").val();
					conditionData["condStmtName"] = $("#condStmtName").val();
					//data["letterCondData"] = $("#ifStatement_text").val();
					
					if($("#updateCondStmtUpdateFlag").val()=="Update"){
						console.log("Update Condition Stmt Hidden Fields Data ");
						conditionData["updateFlag"] = $("#updateCondStmtUpdateFlag").val();
						conditionData["lettercondId"] = $("#updateCondLetterCondId").val();
						conditionData["versions"] = $("#updateCondStmtVersions").val();
						conditionData["condVersionId"] = $("#updateCondVersionId").val();
						conditionData["deptAutoIncrement"] = $("#updateDeptAutoIncrement").val();
						conditionData["activeUpdateFlag"] = $("#updateActiveUpdateFlag").val();
						conditionData["conditionIsActive"] = $("#updateConditionIsActive").val();
					}
					
					var conditionalarray = [];
					for (var i = 0; i < $(".conditions").length; i++) {
						let obj = $(".conditions")[i];
						let current_index = $(obj).attr('id')
								.match(/\d/g).join("");
						let condition = {};
						if (i == 0) {
							condition["if"] = $("#ifStatement_text")
									.val();
							condition["in"] = $("#if_in_dd0").val();
							condition["stmt"] = $("#if_in_stmt0")
									.val();
							condition["result"] = $("#result0")
									.val();
							condition["else"] = $("#finalelseresult").val();
							condition["id"] ="#ifStatement_text";
							
						} else {
							condition["elseif"] = $(
									"#if_elseif_statement_text_"
											+ current_index).val();
							condition["in"] = $(
									"#if_elseif_in_dd_"
											+ current_index).val();
							condition["stmt"] = $(
									"#if_elseif_in_stmt_"
											+ current_index).val();
							condition["result"] = $(
									"#if_elseif_result_"
											+ current_index).val();
							condition["id"] ="#if_elseif_statement_text_";
						
						}
						conditionalarray.push(condition);
					}
					
					var combinedObj = {};
					conditionData["letterCondData"] = JSON.stringify(conditionalarray);
					conditionData["letterDragData"] =conditionalStmtJsonfieldfuntion();
					conditionData1=conditionData;
					if(eventFrom=="show_previewData"){
						if(conditionStatmentValidations(conditionData1,true) && !validateInNOtINFileds()){
							$.ajax({
								type : "POST",
								contentType : "application/json",
								url : urlString,
								data : JSON.stringify(conditionData),
								dataType : 'json',
								success : function(data, textStatus, xhr) {
									dataTypeValue=data;
									validateIfCondition(conditionData1,dataTypeValue,eventFrom);
									 if(eventFrom=="show_previewData"){
										 if(!($('#modal_datatype').is(':visible')) && $(".conditions div.has-error").length==0){
												getParametersPreviewData($("#loan_Number").val(), JSON.stringify(conditionData1)); 
												if(!$('#modal_datatype').is(':visible')){
													modal_condition_open();
												 }
												 $("#ifStatement_preview").closest('.col-md-12').removeClass('has-success'); 
												 $("#ifStatement_preview").closest('.col-md-12').removeClass('has-error');
										 }
								
									 }
								},
								error : function(data, textStatus, xhr) {
									if (data.status == 200) {
										disable_tab();
									}										
									
								}
							});
						}
					
					}else{
					if (validateConditionForm(conditionData) && !validateInNOtINFileds()) {
						$.ajax({
							type : "POST",
							contentType : "application/json",
							url : urlString,
							data : JSON.stringify(conditionData),
							dataType : 'json',
							success : function(data, textStatus, xhr) {
								dataTypeValue=data;
								validateIfCondition(conditionData1,dataTypeValue,eventFrom);
								 if(eventFrom=="show_previewData"){
									 if(!($('#modal_datatype').is(':visible')) && $(".conditions div.has-error").length==0){
											getParametersPreviewData($("#loan_Number").val(), JSON.stringify(conditionData1)); 
											modal_condition_open();
											 $("#ifStatement_preview").closest('.col-md-12').removeClass('has-success'); 
											 $("#ifStatement_preview").closest('.col-md-12').removeClass('has-error');
									 }
							
								 }
							},
							error : function(data, textStatus, xhr) {
								if (data.status == 200) {
									disable_tab();
								}										
								
							}
						});
					}
				  }
				}

			});	

			function validateIfCondition(conditionData1,dataTypeValue,eventFrom){
				
				var errorText="";
				var invalidConditionMessageFlag=false;
				var finalErrorResult=false;
				var jsonObj=JSON.parse(conditionData1.letterCondData);
				var lengthIf=jsonObj.length;
				for(var jsonCount=0;jsonCount<lengthIf;jsonCount++){
					var ifCondition;
					if(jsonCount==0){
						ifCondition=jsonObj[jsonCount].if;
					}else{
						ifCondition=jsonObj[jsonCount].elseif;
					}
					var firstSplittedValues=ifCondition.split("&&");
					var secondSplitttedValues=[];
					for(var j=0;j<firstSplittedValues.length;j++){
						var orCondtionSplit=firstSplittedValues[j].split("||");
						for(var k=0;k<orCondtionSplit.length;k++){
							secondSplitttedValues.push(orCondtionSplit[k]);
						}
					}
					for(var finalCount=0;finalCount<secondSplitttedValues.length;finalCount++){
						for(var operatorCount1=0;operatorCount1<operatorArray.length;operatorCount1++){
							 if(secondSplitttedValues[finalCount].includes(operatorArray[operatorCount1])){
								 checkFlagForDirtyCondition=true;
								 var finalSplitCondition=secondSplitttedValues[finalCount].split(operatorArray[operatorCount1]);
								 var splitValueFromLessOrGt=finalSplitCondition[1].split("=");
								 if(splitValueFromLessOrGt[1]!=undefined){
										finalSplitCondition[1]=splitValueFromLessOrGt[1];
									}		
								 var myFirstSubString = finalSplitCondition[0].substring(
											finalSplitCondition[0].lastIndexOf("{") + 1, 
											finalSplitCondition[0].lastIndexOf("}")
										);
								 var mySecondSubString = finalSplitCondition[1].substring(
											finalSplitCondition[1].lastIndexOf("{") + 1, 
											finalSplitCondition[1].lastIndexOf("}")
										);
								 var dataTypeText="";
								 var flagCheck=true;
								 var stringCheck=undefined;;
								 var intCheck=undefined;
								 var dataTypeFromCoreEngine1=dataTypeValue.dataTypes[myFirstSubString];
								 var dataTypeFromCoreEngine2=dataTypeValue.dataTypes[mySecondSubString];
								 
								if(dataTypeFromCoreEngine1=="CHARACTER" || dataTypeFromCoreEngine1=="VARCHAR"){
									stringCheck="CHARACTER";
								}
								if(dataTypeFromCoreEngine2=="NUMERIC" || dataTypeFromCoreEngine2=="BIGINT"){
									intCheck="NUMERIC";
								}
								if(dataTypeFromCoreEngine2=="CHARACTER" || dataTypeFromCoreEngine2=="VARCHAR"){
									stringCheck="CHARACTER";
								}
								if(dataTypeFromCoreEngine1=="NUMERIC" || dataTypeFromCoreEngine1=="BIGINT"){
									intCheck="NUMERIC";
								}
								
								if(dataTypeFromCoreEngine1=="DATE" || dataTypeFromCoreEngine1=="DATE"){
									intCheck="NUMERIC";
								}
								 
								 if(dataTypeFromCoreEngine2!=undefined){
									 if(intCheck!=undefined&&stringCheck!=undefined){
									 if(stringCheck!=intCheck){
										 finalErrorResult=true;
										 flagCheck=false;
										 saveFlag=true;
										 
											if(errorText.includes("Invalid Data Type field(s) :")){
												var textFinal=" {\""+myFirstSubString+"\"} is an \""+dataTypeFromCoreEngine1+"\" field ";
												if(!$('#modal_datatype').is(':visible')){
													 $("#modal_datatype").show();
													 $("#datatype_error").append(textFinal);
												 }  
												 return false;
												
											}else{
												 errorText=errorText+ "Invalid Data Type field(s) : {\""+myFirstSubString+"\"} is an \""+dataTypeFromCoreEngine1+"\" field ";
												       	  if(!$('#modal_datatype').is(':visible')){
														 $("#modal_datatype").show();
														 $("#datatype_error").text(errorText);
													 }
												       	 return false;
								             	  
								             	  }
										 
									 		}
									 }
									 
									 
								 if((dataTypeFromCoreEngine1=="CHARACTER" || dataTypeFromCoreEngine1=="VARCHAR") && (dataTypeFromCoreEngine2=="CHARACTER" || dataTypeFromCoreEngine2=="VARCHAR")){
									 flagCheck=false;
								 }
								 
								 if((dataTypeFromCoreEngine1=="NUMERIC" || dataTypeFromCoreEngine1=="BIGINT") && (dataTypeFromCoreEngine2=="NUMERIC" || dataTypeFromCoreEngine2=="BIGINT")){
									 flagCheck=false; 
								 }
								 }
								 
							 }	 
					}
				}
					if(flagCheck){
				for(var finalCount=0;finalCount<secondSplitttedValues.length;finalCount++){
					for(var operatorCount=0;operatorCount<operatorArray.length;operatorCount++){
						if(secondSplitttedValues[finalCount].split(operatorArray[operatorCount]).length>1){
							var finalSplitCondition=secondSplitttedValues[finalCount].split(operatorArray[operatorCount]);
							var splitValueFromLessOrGt=finalSplitCondition[1].split("=");
							if(splitValueFromLessOrGt[1]!=undefined){
								finalSplitCondition[1]=splitValueFromLessOrGt[1];
							}							
							var mySubString = finalSplitCondition[0].substring(
									finalSplitCondition[0].lastIndexOf("{") + 1, 
									finalSplitCondition[0].lastIndexOf("}")
								); 
							var trimVariable=finalSplitCondition[0].trim();
							var firstIndexVal=trimVariable.lastIndexOf("{");
							var sliceFirstResult;
							if(firstIndexVal==0){
								sliceFirstResult = trimVariable.slice(1); 
							}else{
								sliceFirstResult = trimVariable.slice(firstIndexVal); 
							}							
							
							var secondIndexVal=sliceFirstResult.lastIndexOf("}");
							if(secondIndexVal!=sliceFirstResult.length-1){
								if(/^[a-zA-Z0-9- ]*$/.test(sliceFirstResult) == false) {
									
									if(invalidConditionMessage.includes("Invalid Condition was formed. Please adjust the field(s) :")){
										var textFinal=" {\""+finalSplitCondition[0]+"\"}";
										if(!$('#modal_datatype').is(':visible')){
											 $("#modal_datatype").show();
											 $("#datatype_error").append(textFinal);
										 }
										 
									}else{
										invalidConditionMessage=commonMessage+" {\""+finalSplitCondition[0]+"\"}";
										if(!$('#modal_datatype').is(':visible')){
											 $("#modal_datatype").show();
											 $("#datatype_error").append(invalidConditionMessage);
										 }
										
									}
									 invalidConditionMessageFlag=true;
									 
					             	 
					             	  saveFlag=true;
					             	   break;
									}	
							}
							var dataTypeFromCoreEngine=dataTypeValue.dataTypes[mySubString];
							if(!((dataTypeFromCoreEngine=="CHARACTER" || dataTypeFromCoreEngine=="VARCHAR") && (secondSplitttedValues[finalCount].indexOf("==") > -1 || secondSplitttedValues[finalCount].indexOf("!=") > -1))){
								if((dataTypeFromCoreEngine=="CHARACTER" || dataTypeFromCoreEngine=="VARCHAR")){
									finalErrorResult=true;
									errorText= errorText+"Invalid Syntax (qualifier symbol is invalid for field {\""+finalSplitCondition[0]+"\"})";
									saveFlag=true;
									break;
								}
							}								
							var findDataTypeFromCondition=typeof(finalSplitCondition[1]);
							var stringError="";
							var findSingleQuotes=finalSplitCondition[1].split("\'");
							//alert(findSingleQuotes.length);
							if(isNaN(finalSplitCondition[1]) && finalSplitCondition[1].split(")").length!=2){
								if(finalSplitCondition[1].match(new RegExp("\'", "g"))!=null){
								if((finalSplitCondition[1].match(new RegExp("\'", "g"))).length!=2){
									stringError=stringError+"Current field :: {\""+finalSplitCondition[0]+"\"} is string So please enter single Quotes for the value {\'"+finalSplitCondition[1]+"\'}";
									 invalidConditionMessageFlag=true;
									  if(!$('#modal_datatype').is(':visible')){
											 $("#modal_datatype").show();
											 $("#datatype_error").text(stringError);
										 }
					             	
					             	  saveFlag=true;
					             	   break;
								}
							}
								
							}
							
							
							var typeValue;
							var findLastIndex=finalSplitCondition[1].replace(")","").trim();
							if(isNaN(findLastIndex)){
								typeValue=true;
							}else{
								typeValue=false;;
							}
							if(!($('#modal_datatype').is(':visible'))){
							if((dataTypeFromCoreEngine=="CHARACTER" || dataTypeFromCoreEngine=="VARCHAR") && typeValue){
							}else{
								if(!(dataTypeFromCoreEngine=="NUMERIC" || dataTypeFromCoreEngine=="BIGINT") && typeValue){
									if(errorText.includes("Invalid Data Type field(s) :")){
										var textFinal=" {\""+finalSplitCondition[0]+"\"} is an \""+dataTypeFromCoreEngine+"\" field ";
										if(!$('#modal_datatype').is(':visible')){
											 $("#modal_datatype").show();
											 $("#datatype_error").append(textFinal);
										 }  
										// return false;
										
									}else{
										 errorText=errorText+ "Invalid Data Type field(s) : {\""+finalSplitCondition[0]+"\"} is an \""+dataTypeFromCoreEngine+"\" field ";
										       	  if(!$('#modal_datatype').is(':visible')){
												 $("#modal_datatype").show();
												 $("#datatype_error").text(errorText);
											 }
										       	// return false;
						             	  
						             	  }
									finalErrorResult=true;
									saveFlag=true;
								}else{
									if((dataTypeFromCoreEngine=="CHARACTER" || dataTypeFromCoreEngine=="VARCHAR")){
										if(errorText.includes("Invalid Data Type field(s) :")){
											var textFinal=" {\""+finalSplitCondition[0]+"\"} is an \""+dataTypeFromCoreEngine+"\" field ";
											if(!$('#modal_datatype').is(':visible')){
												 $("#modal_datatype").show();
												 $("#datatype_error").append(textFinal);
											 }  
											// return false;
											
										}else{
											 errorText=errorText+ "Invalid Data Type field(s) : {\""+finalSplitCondition[0]+"\"} is an \""+dataTypeFromCoreEngine+"\" field ";
											       	  if(!$('#modal_datatype').is(':visible')){
													 $("#modal_datatype").show();
													 $("#datatype_error").text(errorText);
												 }
											  //     	 return false;
							             	  
							             	  }
										finalErrorResult=true;
										saveFlag=true;
									}else{
										if((dataTypeFromCoreEngine=="NUMERIC" || dataTypeFromCoreEngine=="BIGINT") && typeValue){
											if(errorText.includes("Invalid Data Type field(s) :")){
												var textFinal=" {\""+finalSplitCondition[0]+"\"} is an \""+dataTypeFromCoreEngine+"\" field ";
												if(!$('#modal_datatype').is(':visible')){
													 $("#modal_datatype").show();
													 $("#datatype_error").append(textFinal);
												 }  
												// return false;
												
											}else{
												 errorText=errorText+ "Invalid Data Type field(s) : {\""+finalSplitCondition[0]+"\"} is an \""+dataTypeFromCoreEngine+"\" field ";
												       	  if(!$('#modal_datatype').is(':visible')){
														 $("#modal_datatype").show();
														 $("#datatype_error").text(errorText);
													 }
												  //     	 return false;
								             	  
								             	  }
											finalErrorResult=true;
											saveFlag=true;
										}
									}
								}	
									
								}
							}
						}
					
					}
					
				}
				}		
				}
				if(finalErrorResult && !invalidConditionMessageFlag){
				}else{
					if(saveFlag && !($('#modal_datatype').is(':visible')) && eventFrom!="show_previewData"){
						var ctxPath = getContextPath();
						var urlString = ctxPath + '/saveConditionstmtletter';
						$.ajax({
							type : "POST",
							contentType : "application/json",
							url : urlString,
							data : JSON.stringify(conditionData1),
							dataType : 'json',
							success : function(data, textStatus, xhr) {
								
							},
							error : function(data, textStatus, xhr) {
								disable_tab();
								if(data.status == 302){
									$("#condStmtName").closest('.form-group').addClass('has-error');
									$("#condStmtName").closest('.form-group').removeClass("has-success");
									//$("#condStmtNameError").text("Condition Name already exist");
									$("#modal_create_condition_error").show();
								}
								else if (data.status == 200) {
									 $("#if_in_dd0").closest('.form-group').removeClass('has-error');
									 $("#if_in_stmt0").closest('.form-group').removeClass('has-error');
									 $("#modal_services").hide();
									 $("#modal_create_condition_success").show();
									if($("#updateCondStmtUpdateFlag").val()=="Update"){
										$("#modal_update_condition_success").show();
										 $("#modal_create_condition_success").hide();
									}
								}
							}
						});
					}
				}
			}			
						
function modal_cerate_condition_succes(){
	enable_tab();
	$("#modal_create_condition_success").hide();
	var ctxPath = getContextPath();
	var urlString = ctxPath + '/fetchCondStmt';
	window.location.href=urlString;
}
function modal_update_condition_succes(){
	enable_tab();
	$("#modal_update_condition_success").hide();
	var ctxPath = getContextPath();
	var urlString = ctxPath + '/fetchCondStmt';
	window.location.href=urlString;
}
function modal_cerate_condition_error(){
	enable_tab();
	$("#modal_create_condition_error").hide();
	/*var ctxPath = getContextPath();
	var urlString = ctxPath + '/fetchCondStmt';
	window.location.href=urlString;*/
}

function validationForINAndOut(conditionData1,current_index,index){
var jsonObj=JSON.parse(conditionData1.letterCondData);
var lengthIf=jsonObj.length;
var jqueryId=jsonObj[index].id;
var conditionLastIndexOfBrace=true;
var openbracecount=0;
var closebracecount=0;
	var ifCondition;
		ifCondition=jsonObj[index].if;
	var firstSplittedValues=ifCondition.split("&&");
	var secondSplitttedValues=[];
	for(var j=0;j<firstSplittedValues.length;j++){
		var orCondtionSplit=firstSplittedValues[j].split("||");
		for(var k=0;k<orCondtionSplit.length;k++){
			secondSplitttedValues.push(orCondtionSplit[k]);
		}
	}
	
		for(var i = 0; i < secondSplitttedValues.length ; i++){
			let countOfEquals=(secondSplitttedValues[i].match(/==/g) || []).length;
			let countOfNotEquals=(secondSplitttedValues[i].match(/!=/g) || []).length;
			let countOfGreaterThanEquals=(secondSplitttedValues[i].match(/>=/g) || []).length;
			let countOfLessThanEquals=(secondSplitttedValues[i].match(/<=/g) || []).length;
			let finalCount=countOfEquals+countOfNotEquals+countOfGreaterThanEquals+countOfLessThanEquals;
			if(((secondSplitttedValues[i].match(/>=/g) || []).length==2 || (secondSplitttedValues[i].match(/<=/g) || []).length==2 || (secondSplitttedValues[i].match(/==/g) || []).length==2|| (secondSplitttedValues[i].match(/!=/g) || []).length==2|| (secondSplitttedValues[i].match(/>/g) || []).length==2|| (secondSplitttedValues[i].match(/</g) || []).length==2) || finalCount>=2){
				if(!$('#modal_datatype').is(':visible')){
					 $("#modal_datatype").show();
					 $("#datatype_error").append("Invalid Condition was formed. Please adjust the field(s) :" + secondSplitttedValues[i] + "[Missing AND or OR]");
				 }	
			}
			for (var j=0; j<secondSplitttedValues[i].length; j++) 
	        { 
				   if (secondSplitttedValues[i].charAt(j) == '(' ) {
			            openbracecount++;
			      }
				  if(secondSplitttedValues[i].charAt(j) == ')'){
					  closebracecount++;
				  }
	        }  
		}
		
		if(openbracecount != closebracecount){
			if(invalidConditionMessage.includes("Invalid Condition was formed. Please adjust the field(s) :")){
				var textFinal=" {\""+secondSplitttedValues[secondSplitttedValues.length-1]+"\"}";
				if(!$('#modal_datatype').is(':visible')){
					 $("#modal_datatype").show();
					 $("#datatype_error").append(textFinal);
				 }  
				
			}else{
				invalidConditionMessage=commonMessage+" {\""+secondSplitttedValues[secondSplitttedValues.length-1]+"\"}";
				if(!$('#modal_datatype').is(':visible')){
					 $("#modal_datatype").show();
					 $("#datatype_error").append(invalidConditionMessage);
				 }  
			}
			 invalidConditionMessageFlag=true;
	    	  saveFlag=true;
	    	  conditionLastIndexOfBrace=false; 
		}
	
	
			for(var finalCount=0;finalCount<secondSplitttedValues.length;finalCount++){
				for(var operatorCount=0;operatorCount<operatorArray.length;operatorCount++){
			if(secondSplitttedValues[finalCount].split(operatorArray[operatorCount]).length==2){
				var finalSplitCondition=secondSplitttedValues[finalCount].split(operatorArray[operatorCount]);
				var splitValueFromLessOrGt=finalSplitCondition[1].split("=");
				if(splitValueFromLessOrGt[1]!=undefined){
					finalSplitCondition[1]=splitValueFromLessOrGt[1];
				}		
				var trimVariable=finalSplitCondition[0].trim();
				var firstIndexVal=trimVariable.lastIndexOf("{");
				var sliceFirstResult;
				if(firstIndexVal==0){
					sliceFirstResult = trimVariable.slice(1); 
				}else{
					sliceFirstResult = trimVariable.slice(firstIndexVal); 
				}							
				
				var secondIndexVal=sliceFirstResult.lastIndexOf("}");
				if(!(secondIndexVal!=sliceFirstResult.length-1) && finalSplitCondition.length==1){
					if(/^[a-zA-Z0-9- ]*$/.test(sliceFirstResult) == false) {
						if($("#if_in_dd0").val().trim()=="select"){
						 $("#if_in_dd0").closest('.form-group').addClass('has-error');
						 saveFlag=false;
						 flag=false;
						}else{
							 $("#if_in_dd0").closest('.form-group').removeClass('has-error');
							 saveFlag=true;
						}
						
						if($("#if_in_stmt0").val().trim()==""){
							 $("#if_in_stmt0").closest('.form-group').addClass('has-error');	
							 saveFlag=false;
						}else{
							 $("#if_in_stmt0").closest('.form-group').removeClass('has-error');
							 saveFlag=true;
						}
						}
					break;
				}else{
					if(secondSplitttedValues[finalCount].split(operatorArray[operatorCount]).length==2){
						$("#if_in_dd0").closest('.form-group').removeClass('has-error'); 
						 $("#if_in_stmt0").closest('.form-group').removeClass('has-error');
						 saveFlag=true;
						 break;
					}else{
						if(secondIndexVal!=sliceFirstResult.length-1){
							if(/^[a-zA-Z0-9- ]*$/.test(sliceFirstResult) == false) {
								
								if(invalidConditionMessage.includes("Invalid Condition was formed. Please adjust the field(s) :")){
									var textFinal=" {\""+finalSplitCondition[0]+"\"}";
									if(!$('#modal_datatype').is(':visible')){
										 $("#modal_datatype").show();
										 $("#datatype_error").append(textFinal);
									 }
									  
								}else{
									invalidConditionMessage=commonMessage+" {\""+finalSplitCondition[0]+"\"}";
									if(!$('#modal_datatype').is(':visible')){
										 $("#modal_datatype").show();
										 $("#datatype_error").append(invalidConditionMessage);
									 }
									
								}
								 invalidConditionMessageFlag=true;
								 
				             	 
				             	  saveFlag=true;
				             	   break;
								}	
						}
						break;
					}
				}
				
			}else{
				var finalSplitCondition=secondSplitttedValues[finalCount].split(operatorArray[operatorCount]);
				var trimVariable=finalSplitCondition[0].trim();
				var firstIndexVal=trimVariable.lastIndexOf("{");
				if(firstIndexVal==-1){
					
					if(invalidConditionMessage.includes("Invalid Condition was formed. Please adjust the field(s) :")){
						var textFinal=" {\""+finalSplitCondition[0]+"\"}";
						if(!$('#modal_datatype').is(':visible')){
							 $("#modal_datatype").show();
							  $("#datatype_error").append(textFinal);
						 }
						
					}else{
						invalidConditionMessage=commonMessage+" {\""+finalSplitCondition[0]+"\"}";
						if(!$('#modal_datatype').is(':visible')){
							 $("#modal_datatype").show();
							 $("#datatype_error").append(invalidConditionMessage);
						 }
						
					}
					 invalidConditionMessageFlag=true;
	             	  saveFlag=true;
	             	   break;
				}
				var sliceFirstResult;
				if(firstIndexVal==0){
					sliceFirstResult = trimVariable.slice(1); 
				}else{
					sliceFirstResult = trimVariable.slice(firstIndexVal); 
				}							
				var secondIndexVal=sliceFirstResult.lastIndexOf("}");
				var checkFlagForDirtyCondition=false;
				var lengthOfCondition="";
				 if(secondIndexVal!=sliceFirstResult.length-1){
				 for(var operatorCount=0;operatorCount<operatorArray.length;operatorCount++){
					 if(sliceFirstResult.includes(operatorArray[operatorCount])){
						  lengthOfCondition=sliceFirstResult.trim().split(operatorArray[operatorCount]); 
							if(lengthOfCondition.length>1){
								if(lengthOfCondition[1]!=""){
						 checkFlagForDirtyCondition=true;
								}
							}
					 }
				 }
				 if(/^[a-zA-Z0-9- ]*$/.test(sliceFirstResult) == false && !checkFlagForDirtyCondition) {
					 if((lengthOfCondition.length==2 || lengthOfCondition.length==0)&& (lengthOfCondition[1] =="" || lengthOfCondition[1]==undefined)){
					 if($("#if_in_dd0").val().trim()=="select"){
						 $("#if_in_dd0").closest('.form-group').addClass('has-error');
						
						 flag=false;
						}else{
							 $("#if_in_dd0").closest('.form-group').removeClass('has-error'); 
							 saveFlag=true;
						}
						
						if($("#if_in_stmt0").val().trim()==""){
							 $("#if_in_stmt0").closest('.form-group').addClass('has-error');	
							 saveFlag=false;
						}else{
							 $("#if_in_stmt0").closest('.form-group').removeClass('has-error');
							 saveFlag=true;
						}
						
						if(invalidConditionMessage.includes("Invalid Condition was formed. Please adjust the field(s) :")){
							var textFinal=" {\""+finalSplitCondition[0]+"\"}";
							if(!$('#modal_datatype').is(':visible')){
								 $("#modal_datatype").show();
								 $("#datatype_error").append(textFinal);
							 }
							 
						}else{
							invalidConditionMessage=commonMessage+" {\""+finalSplitCondition[0]+"\"}";
							if(!$('#modal_datatype').is(':visible')){
								 $("#modal_datatype").show();
								 $("#datatype_error").append(invalidConditionMessage);
							 }
							
						}
						 invalidConditionMessageFlag=true;
						 
		             	 
		             	  saveFlag=true;
		             	   break;
						}
				 }
					
				 }else{
					var checkFlagForDirtyCondition=false;
					 for(var operatorCount=0;operatorCount<operatorArray.length;operatorCount++){
						 if(secondSplitttedValues[finalCount].includes(operatorArray[operatorCount])){
							 checkFlagForDirtyCondition=true;
						 }
					 }
					if(!checkFlagForDirtyCondition){
						if($("#if_in_dd0").val().trim()=="select"){
							 $("#if_in_dd0").closest('.form-group').addClass('has-error');
							 saveFlag=false;
							 break; 
						}
						if($("#if_in_stmt0").val().trim()==""){
							$("#if_in_stmt0").closest('.form-group').addClass('has-error');
							 saveFlag=false;
							 break; 
						}
						 
						
					}
						
					}
				
			}
	}	
	
}
}


function validationForINAndOut2(conditionData1,current_index,index){
	var jsonObj=JSON.parse(conditionData1.letterCondData);
	var lengthIf=jsonObj.length;
	var ifCondition;
	var openbracecount=0;
	var closebracecount=0;
	var conditionLastIndexOfBrace=true;
	ifCondition=jsonObj[index].elseif;
	var jqueryId=jsonObj[index].id;
		var firstSplittedValues=ifCondition.split("&&");
		var secondSplitttedValues=[];
		for(var j=0;j<firstSplittedValues.length;j++){
			var orCondtionSplit=firstSplittedValues[j].split("||");
			for(var k=0;k<orCondtionSplit.length;k++){
				secondSplitttedValues.push(orCondtionSplit[k]);
			}
		}
for(var i = 0; i < secondSplitttedValues.length ; i++){
	let countOfEquals=(secondSplitttedValues[i].match(/==/g) || []).length;
	let countOfNotEquals=(secondSplitttedValues[i].match(/!=/g) || []).length;
	let countOfGreaterThanEquals=(secondSplitttedValues[i].match(/>=/g) || []).length;
	let countOfLessThanEquals=(secondSplitttedValues[i].match(/<=/g) || []).length;
	let finalCount=countOfEquals+countOfNotEquals+countOfGreaterThanEquals+countOfLessThanEquals;
	if(((secondSplitttedValues[i].match(/>=/g) || []).length==2 || (secondSplitttedValues[i].match(/<=/g) || []).length==2 || (secondSplitttedValues[i].match(/==/g) || []).length==2|| (secondSplitttedValues[i].match(/!=/g) || []).length==2|| (secondSplitttedValues[i].match(/>/g) || []).length==2|| (secondSplitttedValues[i].match(/</g) || []).length==2) || finalCount>=2){
		if(!$('#modal_datatype').is(':visible')){
			 $("#modal_datatype").show();
			 $("#datatype_error").append("Invalid Condition was formed. Please adjust the field(s) :" + secondSplitttedValues[i] + "[Missing AND or OR]");
		 }	
	}
			for (var j=0; j<secondSplitttedValues[i].length; j++) 
	        { 
				   if (secondSplitttedValues[i].charAt(j) == '(' ) {
			            openbracecount++;
			      }
				  if(secondSplitttedValues[i].charAt(j) == ')'){
					  closebracecount++;
				  }
	        }  
		}
		
		if(openbracecount != closebracecount){
			
			if(invalidConditionMessage.includes("Invalid Condition was formed. Please adjust the field(s) :")){
				var textFinal=" {\""+secondSplitttedValues[secondSplitttedValues.length-1]+"\"}";
				if(!$('#modal_datatype').is(':visible')){
					 $("#modal_datatype").show();
					 $("#datatype_error").append(textFinal);
				 }
				 
			}else{
				invalidConditionMessage=commonMessage+" {\""+secondSplitttedValues[secondSplitttedValues.length-1]+"\"}";
				if(!$('#modal_datatype').is(':visible')){
					 $("#modal_datatype").show();
					 $("#datatype_error").append(invalidConditionMessage);
				 }
				
			}
			 invalidConditionMessageFlag=true;
	    	  saveFlag=true;
	    	  conditionLastIndexOfBrace=false; 
		}
			
		
		for(var finalCount=0;finalCount<secondSplitttedValues.length;finalCount++){
			for(var operatorCount=0;operatorCount<operatorArray.length;operatorCount++){
					if(secondSplitttedValues[finalCount].split(operatorArray[operatorCount]).length==2){
					var finalSplitCondition=secondSplitttedValues[finalCount].split(operatorArray[operatorCount]);
					var splitValueFromLessOrGt=finalSplitCondition[1].split("=");
					if(splitValueFromLessOrGt[1]!=undefined){
						finalSplitCondition[1]=splitValueFromLessOrGt[1];
					}		
					var trimVariable=finalSplitCondition[0].trim();
					var firstIndexVal=trimVariable.lastIndexOf("{");
					if(firstIndexVal==-1){
					
						if(invalidConditionMessage.includes("Invalid Condition was formed. Please adjust the field(s) :")){
							var textFinal=" {\""+finalSplitCondition[0]+"\"}";
							if(!$('#modal_datatype').is(':visible')){
								 $("#modal_datatype").show();
								  $("#datatype_error").append(textFinal);
							 }
							
						}else{
							invalidConditionMessage=commonMessage+" {\""+finalSplitCondition[0]+"\"}";
							if(!$('#modal_datatype').is(':visible')){
								 $("#modal_datatype").show();
								 $("#datatype_error").append(invalidConditionMessage);
							 }
							
						}
						 invalidConditionMessageFlag=true;
						 
		             	 
		             	  saveFlag=true;
		             	   break;
					}
					var sliceFirstResult;
					if(firstIndexVal==0){
						sliceFirstResult = trimVariable.slice(1); 
					}else{
						sliceFirstResult = trimVariable.slice(firstIndexVal); 
					}							
					
					var secondIndexVal=sliceFirstResult.lastIndexOf("}");
					if(!(secondIndexVal!=sliceFirstResult.length-1) && finalSplitCondition.length==1){
						if(/^[a-zA-Z0-9- ]*$/.test(sliceFirstResult) == false) {
							if($("#if_elseif_in_dd_"+ current_index).val().trim()=="select"){
								 $("#if_elseif_in_dd_"+ current_index).closest('.form-group').addClass('has-error');
								 saveFlag=false;
								 flag=false;
							}else{
								saveFlag=true;
								$("#if_elseif_in_dd_"+ current_index).closest('.form-group').removeClass('has-error');  
							}
							
							if($("#if_elseif_in_stmt_"+ current_index).val().trim()==""){
								 $("#if_elseif_in_stmt_"+ current_index).closest('.form-group').addClass('has-error');
								 saveFlag=false;
								 flag=false;
							}else{
								$("#if_elseif_in_stmt_"+ current_index).closest('.form-group').removeClass('has-error'); 
								saveFlag=true;
							}
							}
						break;
					}else{
						if(secondSplitttedValues[finalCount].split(operatorArray[operatorCount]).length==2){
							 $("#if_elseif_in_dd_"+ current_index).closest('.form-group').removeClass('has-error');  
							 $("#if_elseif_in_stmt_"+ current_index).closest('.form-group').removeClass('has-error'); 
							 saveFlag=true;
							 break;
						}else{
							if(secondIndexVal!=sliceFirstResult.length-1){
								if(/^[a-zA-Z0-9- ]*$/.test(sliceFirstResult) == false) {
								
									if(invalidConditionMessage.includes("Invalid Condition was formed. Please adjust the field(s) :")){
										var textFinal=" {\""+finalSplitCondition[0]+"\"}";
										if(!$('#modal_datatype').is(':visible')){
											 $("#modal_datatype").show();
											  $("#datatype_error").append(textFinal);
										 }
										
									}else{
										invalidConditionMessage=commonMessage+" {\""+finalSplitCondition[0]+"\"}";
										if(!$('#modal_datatype').is(':visible')){
											 $("#modal_datatype").show();
											 $("#datatype_error").append(invalidConditionMessage);
										 }
										 
									}
									 invalidConditionMessageFlag=true;
					             	  saveFlag=true;
					             	   break;
									}	
								
							}
							break;
						}
					}
					
				}else{
					var finalSplitCondition=secondSplitttedValues[finalCount].split(operatorArray[operatorCount]);
					var trimVariable=finalSplitCondition[0].trim();
					var firstIndexVal=trimVariable.lastIndexOf("{");
					var sliceFirstResult;
					if(firstIndexVal==0){
						sliceFirstResult = trimVariable.slice(1); 
					}else{
						sliceFirstResult = trimVariable.slice(firstIndexVal); 
					}							
					var secondIndexVal=sliceFirstResult.lastIndexOf("}");
					var lengthOfCondition="";
					var checkFlagForDirtyCondition=false;
					 if(secondIndexVal!=sliceFirstResult.length-1){
					 for(var operatorCount=0;operatorCount<operatorArray.length;operatorCount++){
						 if(sliceFirstResult.includes(operatorArray[operatorCount]) ){
							 lengthOfCondition=sliceFirstResult.trim().split(operatorArray[operatorCount]); 
							if(lengthOfCondition.length>1){
								if(lengthOfCondition[1]!=""){
									checkFlagForDirtyCondition=true;
								}
								
							}
							 
						 }
					 }
					 if(/^[a-zA-Z0-9- ]*$/.test(sliceFirstResult) == false && !checkFlagForDirtyCondition) {
						 if((lengthOfCondition.length==2 || lengthOfCondition.length==0)&& (lengthOfCondition[1] =="" || lengthOfCondition[1]==undefined)){
							if($("#if_elseif_in_dd_"+ current_index).val().trim()=="select"){
								 $("#if_elseif_in_dd_"+ current_index).closest('.form-group').addClass('has-error');
								 flag=false;
							}else{
								 $("#if_elseif_in_dd_"+ current_index).closest('.form-group').removeClass('has-error');  
								 saveFlag=true;
							}
							
							if($("#if_elseif_in_stmt_"+ current_index).val().trim()==""){
								 $("#if_elseif_in_stmt_"+ current_index).closest('.form-group').addClass('has-error');
								 flag=false;
							}else{
								$("#if_elseif_in_stmt_"+ current_index).closest('.form-group').removeClass('has-error'); 
								saveFlag=true;
							}
							
							if(invalidConditionMessage.includes("Invalid Condition was formed. Please adjust the field(s) :")){
								var textFinal=" {\""+finalSplitCondition[0]+"\"}";
								if(!$('#modal_datatype').is(':visible')){
									 $("#modal_datatype").show();
									 $("#datatype_error").append(textFinal);
								 }
								  
							}else{
								invalidConditionMessage=commonMessage+" {\""+finalSplitCondition[0]+"\"}";
								if(!$('#modal_datatype').is(':visible')){
									 $("#modal_datatype").show();
									 $("#datatype_error").append(invalidConditionMessage);
								 }
								
							}
							 invalidConditionMessageFlag=true;
			             	  saveFlag=true;
			             	   break;
			             	  $(jqueryId+ current_index).closest('.form-group').addClass('has-error');
			             	  break;
							}
					 }
						
					 }else{
						 var checkFlagForDirtyCondition=false;
						 for(var operatorCount=0;operatorCount<operatorArray.length;operatorCount++){
							 if(secondSplitttedValues[finalCount].includes(operatorArray[operatorCount])){
								 checkFlagForDirtyCondition=true;
							 }
						 }
						 
						 if(!checkFlagForDirtyCondition){
								if($("#if_elseif_in_dd_"+ current_index).val().trim()=="select"){
									$("#if_elseif_in_dd_"+ current_index).closest('.form-group').addClass('has-error');
									 saveFlag=false;
									 break; 
								}
								if($("#if_elseif_in_stmt_"+ current_index).val().trim()==""){
									$("#if_elseif_in_stmt_"+ current_index).closest('.form-group').addClass('has-error');
									 saveFlag=false;
									 break; 
								}
								 
								
							}
						 
						 
						 
						}
					
				}
		}	
		
	}
	}

$(function(){
	// restricting special characters 
	$(document).on('keypress','.restrictSpChar',function(e) {
		var k = e.keyCode,
		$return = (k ==45 || k == 46 || k==39 || (k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32  || (k >= 48 && k <= 57));
	      if(!$return) {
	       	return false;
	      }
	});
	
	// restricting comma symbols 
	$(document).on('keypress ','.commaSpecial',function(e) {
	var k = e.keyCode,
	$return = (k == 45 ||k == 46 || k == 44 || (k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
      if(!$return) {
       	return false;
      }
    });
	
	// restricting dot and underscore symbols 
	$(document).on('keypress ','.restrictDotUnder',function(e) {
				var k = e.keyCode,
				$return = (k == 46 || k == 95 || k== 39);
			      if($return) {
			       	return false;
			      }
	});
});
  
