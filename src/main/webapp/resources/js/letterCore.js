var text = "";
var DragSourceElementID = "";
var id_count = 0;
var letterValue = "";

function getParametersPreview(loanNumber) {
	var loanNumber = loanNumber;
	var ctxPath = getContextPath();
	var urlString = ctxPath + '/parameters1/' + loanNumber;
	var flag = true;
	text = $('.note-editable').html();
	var nodes = $("[id^=engine]");
	var finalList = [];

	for (var startIndex = 0; startIndex < nodes.length; startIndex++) {
		var serviceName = nodes[startIndex].id.substring(6);
		var beforeDotServiceName = serviceName.substring(0, serviceName
				.indexOf('.'));
		var afterDotFieldName = (serviceName
				.substring(serviceName.indexOf('.'))).replace('.', "");
		finalList.push({
			serviceName : beforeDotServiceName,
			fieldName : afterDotFieldName
		});
	}

	var conds = $("[id^=condstmts]");
	var condstmtList = [];

	for (var startIndex = 0; startIndex < conds.length; startIndex++) {
		var condName = conds[startIndex].id.replace('condstmts','').trim();
		//var beforeCondName = condName.substring().replace('.', "");
		condName=condName.replace(new RegExp("_",'g'), " ")
		condstmtList.push({
			condStmtName : condName
		});

	}

	var condUrl = ctxPath + '/condtions/' + loanNumber;

	$.ajax({
		url : condUrl,
		type : 'get',
		async : false,
		cache : false,
		data : {
			condArr : JSON.stringify(condstmtList)
		},
		success : function(data, textStatus, xhr) {
		/*	for (var startInd = 0; startInd < conds.length; startInd++) {
				let firstIndex1 = conds[startInd].innerHTML.indexOf("[");
				let lastIndex1 = conds[startInd].innerHTML.indexOf("]");
				var one1 = conds[startInd].innerHTML.substring(firstIndex1 + 1,
						lastIndex1);
				if(one1.includes("&amp")){
					one1=one1.replace("&amp","&");
					
				}*/
			 for(var a in condstmtList){
				for(var k in condstmtList[a]){
					 let one1= condstmtList[a][k];
				for (var i = 0; i < data.length; i++) {
					if (one1 == data[i].condStmtName) {
						var valuestmt = data[i].letterCondData.toString();
						if (valuestmt.includes("StatusCode") && valuestmt.includes("Description")) {
							var resjson = JSON.parse(valuestmt);
							$("#modal_condition_stmt").css('display', 'none');
								flag = false;
								disable_tab();
								$("#modal_loannumber").show();
								$("#loan_error").text(resjson.StatusCode + ":"+ resjson.Description);
								text = "error";
						} else {
							let strongTagId=one1.replace(/[^A-Z0-9]/ig, "");
							console.log("selected Id ::"+strongTagId +"\t"+$("#"+strongTagId).text());
							let dragCondName=$("#"+strongTagId).html();
							if(dragCondName.includes("&amp;")){
								dragCondName=dragCondName.replace(new RegExp('&amp;', 'g'), '&');
								
							}
							if(dragCondName.includes("&lt;")){
								dragCondName=dragCondName.replace(new RegExp('&lt;', 'g'), '<');
							}
							if(dragCondName.includes("&gt;")){
								dragCondName=dragCondName.replace(new RegExp('&gt;', 'g'), '>');
							}
						console.log(dragCondName+"display content ...")
							if(dragCondName !=undefined && dragCondName.indexOf("[" + one1 + "]") !=-1){
								dragCondName=dragCondName.replace("[" + one1 + "]",valuestmt);
								$("strong#"+strongTagId).html(dragCondName)
							}
							text = $('.note-editable').html();
							if (text != "") {
								text = text;
							} else {
								text = "No data found on canvas!!!!!!!!!!";
							}
						}
					}

				}

			}
	      }
		},

		error : function(data, textStatus, xhr) {
			console.log("error in data");
		}
	});

	if (flag == true) {

		$
				.ajax({
					url : urlString,
					type : 'post',
					dataType : 'json',
					async : false,
					cache : false,
					data : {
						serviceArr : JSON.stringify(finalList)
					},
					success : function(data, textStatus, xhr) {
						for (var startIndex = 0; startIndex < nodes.length; startIndex++) {
							let firstIndex = nodes[startIndex].innerHTML
									.indexOf("{");
							let lastIndex = nodes[startIndex].innerHTML
									.indexOf("}");
							let one = nodes[startIndex].innerHTML.substring(
									firstIndex + 1, lastIndex);

							if (one in data) {
								let value = data[one].toString();
								console.log("service Name ::" + one
										+ "\t value is :: " + value);
								
								text = text.replace("<strong>{"+ one +"}</strong>", value);
								
							}
						}

						if (text != "") {
							text = text;
						} else {
							text = "No data found on canvas!!!!!!!!!!";
						}
					},

					error : function(data, textStatus, xhr) {
						disable_tab();
						$("#modal_loannumber").show();
						$("#loan_error").text(
								data.responseJSON.StatusCode + ":"
										+ data.responseJSON.Description);

						text = "error";

					}
				});

	}
	return text.replace(new RegExp('</strong>', 'g'), '</span>').replace(new RegExp('<strong', 'g'), '<span');
}

function getParametersPreviewData(loanNumber, conditionDataInJSON) {
	var loanNumber = loanNumber;
	var ctxPath = getContextPath();
	var urlStringdata = ctxPath + '/parametersData/' + loanNumber;
	;

	// var serviceValue = document.getElementById("dataId").value;
	// text = $('.note-editable').html();
	var nodes = $("[id^=conditional]");
	var finalList1 = [];

	for (var startIndex = 0; startIndex < nodes.length; startIndex++) {
		var serviceName = nodes[startIndex].id.substring(11);
		var beforeDotServiceName = serviceName.substring(0, serviceName
				.indexOf('.'));
		var afterDotFieldName = (serviceName
				.substring(serviceName.indexOf('.'))).replace('.', "");
		if (beforeDotServiceName != "" && afterDotFieldName != "" && finalList1[serviceName] !=afterDotFieldName) {
			finalList1.push({serviceName : beforeDotServiceName,fieldName : afterDotFieldName});
		}
		
		if($("#updateCondStmtUpdateFlag").val()=="Update"){
			let dbServiceList=JSON.parse($("#condStmtJSON").val());
		  	for(let j in dbServiceList["serviceMappingList"]["0"]){

			 for(let k in dbServiceList["serviceMappingList"]["0"][j]) {
				    if(finalList1[j] !=dbServiceList["serviceMappingList"]["0"][j][k]){
				    	finalList1.push({serviceName:j,fieldName:dbServiceList["serviceMappingList"]["0"][j][k]}); 
					}
			 }
		  }
		}
	}

	$("#ifStatement_preview").html("");
	$
			.ajax({
				url : urlStringdata,
				type : 'post',
				dataType : 'json',
				async : false,
				cache : false,
				data : {
					serviceArrData : JSON.stringify(finalList1),
					conditionData : conditionDataInJSON
				},

		success : function(data, textStatus, xhr) {
			disable_tab();
			if(loanNumber.trim()!=""){
				$("#ifStatement_preview").html("");
				let content='<textarea type="text" class=" form-control textarea-size" readonly name="ifStatement" id="if_elseif_in_dd_"></textarea>';
				$("#ifStatement_preview").append(content);
				let finalValue="";
				for(let z in data){
					console.log(data[z])
					finalValue=finalValue+" "+data[z];
				};
				$("#if_elseif_in_dd_").val(finalValue);
				$('#accordion_results').addClass("colapse in");
				$("#accordion_if").parent().hide();
				$('#accordion_results').parent().show();
			}else{
				$('#accordion_results').removeClass("colapse in");
				$('#accordion_if').addClass("colapse in");
				$('#accordion_results').parent().hide();
				$("#accordion_if").parent().show();
			}
	
		},
		error : function(data, textStatus, xhr) {
			disable_tab();
			
			console.log("getParametersPreviewData status code :: "+data.status);
			if(data.status=200){
				if(loanNumber.trim()!=""){
					$("#ifStatement_preview").html("");
					let content='<textarea type="text" readonly name="ifStatement" style="margin: 0px; width: 498px; height: 132px;" class="form-control textarea-size result_txtarea" id="if_elseif_in_dd_"/>';
					$("#ifStatement_preview").append(content);
					if(data.responseText.includes("Invalid Condition was formed. Please adjust the field(s) :") || data.responseText.includes("Data Types Incompatible")){
						if(!$('#modal_datatype').is(':visible')){
							 $("#modal_datatype").show();
							 $("#datatype_error").append(data.responseText+" [Missing AND or OR]");
						 }
					}else{
						$("#modal_loannumber").show();
						$("#if_elseif_in_dd_").val(data.responseText);
					}					
					$('#accordion_results').addClass("colapse in");
					$("#accordion_if").parent().hide();
					$('#accordion_results').parent().show();
				}else{
					$('#accordion_results').removeClass("colapse in");
					$('#accordion_if').addClass("colapse in");
					$('#accordion_results').parent().hide();
					$("#accordion_if").parent().show();
				}
			}
			
			if(data.responseJSON!=undefined){
			if(data.status == "405" || data.responseJSON.StatusCode =="405"){
				$("#ifStatement_preview").html("Loan Selected did not meet Conditional Statement Criteria");
				$('#accordion_results').addClass("colapse in");
				$("#accordion_if").parent().hide();
				$('#accordion_results').parent().show();
			}else if(data.responseJSON.StatusCode =="404" || data.responseJSON.StatusCode =="500" || data.responseJSON.StatusCode =="503"){
				
				$("#ifStatement_preview").html("Internal Technical Problem/Server Down");
				$('#accordion_results').addClass("colapse in");
				$("#accordion_if").parent().hide();
				$('#accordion_results').parent().show();
			}else{
				$('#accordion_results').removeClass("colapse in");
				$('#accordion_if').addClass("colapse in");
				$('#accordion_results').parent().hide();
				$("#accordion_if").parent().show();
			}
			} 
		//	$("#loan_error").text(data.responseJSON.StatusCode + ":" + data.responseJSON.Description);
			text = "error";
				
				}
			});

	return text;
}

drag1 = function(sender, ev) {
	var condstmt = "condstmts";
	condstmt = condstmt+ev.target.innerText;
	var par1 = "<lable id='"+ condstmt.replace(new RegExp(" ",'g'), "_") +"'><strong id='"+ev.target.innerText.replace(/[^A-Z0-9]/ig, "") +"'>[" + ev.target.innerText +"]</strong></lable><span>&nbsp;</span>";
	
	$("#summerObj").append(" " + " " + ev.target.innerText);
	ev.dataTransfer.setData("text", "&nbsp;" + par1);
}

drag = function(sender, ev) {

	/*
	 * var serviceName = "engine"; serviceName = serviceName + serviceNameForId +
	 * "." + ev.target.innerText; var par = "<a href='#' id=" + serviceName + "
	 * class='disableanchor' onclick='AlertPrevWord(\"" + ev.target.innerText +
	 * "\",\"" + serviceNameForId + "\")'>" + ev.target.innerText + "</a>";
	 * //var par="<a>"+tempid+"</label>"; $("#summerObj").append(" " + "
	 * "+ev.target.innerText); //$("#textInput_summernote").append(" " +
	 * ev.target.innerText); ev.dataTransfer.setData("text"," "+par);
	 */

	var serviceName = "engine";
	serviceName = serviceName + serviceNameForId + "." + ev.target.innerText;

	var par = "<span id=" + serviceName + "><strong>{" +  ev.target.innerText 
			+ "}</strong></span>&nbsp;";

	$("#summerObj").append(" " + " " + ev.target.innerText);
	ev.dataTransfer.setData("text", "&nbsp;" + par);

}

allowDrop = function(ev) {
	ev.preventDefault();
}

// Log off automatically when screen is idle for 30 mins
var idleSeconds = 1800;
$(function() {
	var idleTimer;
	function resetTimer() {
		clearTimeout(idleTimer);
		idleTimer = setTimeout(whenUserIdle, idleSeconds * 1000);
	}
	$(document.body).bind('mousemove keydown click', resetTimer); // space
	// separated
	// events
	// list that
	// we want
	// to
	// monitor
	resetTimer(); // Start the timer when the page loads
});

function whenUserIdle() {
	document.forms['logoutForm'].submit();
}



/*function modal_create_letter_template_error(){
enable_tab();
$("#modal_create_letter_template_error").hide();
var ctxPath = getContextPath();
var urlString = ctxPath + '/allLetters';
window.location.href=urlString;
}*/