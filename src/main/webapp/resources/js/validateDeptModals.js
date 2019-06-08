/*function getCSRFTokenValue() {
	$(function() {
		var token = $("meta[name='_csrf']").attr("content");
		var header = $("meta[name='_csrf_header']").attr("content");
		$(document).ajaxSend(function(e, xhr, options) {
			xhr.setRequestHeader(header, token);
		});
	});
}*/

/* 
<meta name="_csrf" content="${_csrf.token}"/>
<meta name="_csrf_header" content="${_csrf.headerName}"/>

var csrfToken = $("meta[name='_csrf']").attr("content");
var csrfHeader = $("meta[name='_csrf_header']").attr("content");
 
$(document).ajaxSend(function(e, xhr, options) {
    xhr.setRequestHeader(header, token);
});*/

$(document).ready(function($) {

	var ctxPath = getContextPath();
	var urlString = ctxPath + '/saveDepartment';
	
	
	$("#btn_savedept").click(function(event) {

		var data = {}
		if (validateDepartment()) {		 
		    
			data["_csrf.parameterName"] = $("#csrf_token").val();
			data["deptDesc"] = $("#deptDesc").val();
			data["deptName"] = $("#deptNameCreate").val();
			if ($("#flag1").prop('checked')) {
				data["flag"] = 0; // on
			} else {
				data["flag"] = 1; // off
			}

			$.ajax({
				type : "POST",
				contentType : "application/json",
				url : urlString,
				data : JSON.stringify(data),
				dataType : 'json',			 
				success: function (data, textStatus, xhr) {
		            },
		        error: function (data, textStatus, xhr) {
		            	
		                if(data.status == 302){
		                	$("#deptNameCreate").closest('.form-group').addClass('has-error');
		            		$("#deptNameCreate").closest('.form-group').removeClass("has-success");
		            		$("#deptNameCreateError").text("Department ID already exist");
		                }else if(data.status == 200){
		                	$("#modal_createdept").hide();
		                	$("#saveDeptModal").show();
		                	// $("#successMsg").text("Department Created Successfully");
		                }
		            }
			});
		}
	});

});

// save modified department modal
$(document).on('click','#btn_editdeptdetails_save',function() {

		var ctxPath = getContextPath();
		var urlString = ctxPath + '/saveDepartment';
		
		if (validateModifieDeptModal()) {

			var data = {}
			data["deptID"] = $("#modifyDeptId").val();
			data["deptDesc"] = $("#modifydeptDesc").val();
			data["deptName"] = $("#modifydeptName").val();
			if ($("#modifyDeptFlag1").prop('checked')) {
				data["flag"] = 0; // on
			} else {
				data["flag"] = 1; // off
			}
			$.ajax({
				type : "POST",
				contentType : "application/json",
				url :urlString,
				data : JSON.stringify(data),
				dataType : 'json',
					success: function (data, textStatus, xhr) {
						  alert(data.status);
		            },
		            error: function (data, textStatus, xhr) {
		              
		            	if(data.status == 200){
		            		 $("#modal_editdeptdetails").modal('hide');
				             /*	 $("#modifedsuccessMsg").text("Department Updated Successfully");*/
				            $("#modal_editsavedept").show();
		                }
		            }
			});
		}
	}); 

function validateDepartment() {
	
		var flag = true;
		var regex = /^[a-zA-Z]*$/;
		var regex_spaces = /^[a-zA-Z ]*$/;

		if ($("#deptDesc").val().trim() == "" && $("#deptDesc").val().trim().length == 0) {
			$("#deptDesc").closest('.form-group').addClass('has-error');
			$("#deptDesc").closest('.form-group').removeClass("has-success");
			//$("#deptDescError").text("This field is required.");
			flag = false;
		} else if (!regex_spaces.test($("#deptDesc").val())) {
			$("#deptDesc").closest('.form-group').addClass('has-error');
			$("#deptDesc").closest('.form-group').removeClass("has-success");
			$("#deptDescError").text(
					"Department Description should contain only alphabets.");
			flag = false;
		} else {
			$("#deptDesc").closest('.form-group').addClass('has-success');
			$("#deptDesc").closest('.form-group').removeClass("has-error");
			$("#deptDescError").text("");

		}
		if ($("#deptNameCreate").val().trim() == "") {
			$("#deptNameCreate").closest('.form-group').addClass('has-error');
			$("#deptNameCreate").closest('.form-group').removeClass("has-success");
			//$("#deptNameCreateError").text("This field is required.");
			flag = false;
		} else if (!regex.test($("#deptNameCreate").val().trim())) {
			$("#deptNameCreate").closest('.form-group').addClass('has-error');
			$("#deptNameCreate").closest('.form-group').removeClass("has-success");
			$("#deptNameCreateError").text("Department ID should contain only alphabets.");
			flag = false;
		} else if ($("#deptNameCreate").val().trim().length !== 4) {
			$("#deptNameCreate").closest('.form-group').addClass('has-error');
			$("#deptNameCreate").closest('.form-group').removeClass("has-success");
			$("#deptNameCreateError").text("Department ID should be 4 characters");
			$("#deptNameCreateError").show();
			flag = false;
		} else {
			$("#deptNameCreate").closest('.form-group').addClass('has-success');
			$("#deptNameCreate").closest('.form-group').removeClass("has-error");
			$("#deptNameCreateError").text("");

		}

		if ($('input[name="flag"]:checked').length == 0) {
		
			$("#flagError").closest('.form-group').addClass('has-error');
			$("#flagError").closest('.form-group').removeClass("has-success");
           //$("#flagError").text("This field is required.");
			flag = false;
		} else {
			$("#flagError").text("");
			$("#flagError").closest('.form-group').addClass('has-success');
			$("#flagError").closest('.form-group').removeClass("has-error");
		}

		return flag;
}

$(document).on('click','.close_createDept', function() {
		$("#deptDesc").val("");
		$("#deptDescError").text("");
		$("#deptDesc").closest('.form-group').removeClass("has-success");
		$("#deptDesc").closest('.form-group').removeClass("has-error");
		$("#deptNameCreate").val("");
		$("#deptNameCreateError").text("");
		$("#deptNameCreate").closest('.form-group').removeClass("has-success");
		$("#deptNameCreate").closest('.form-group').removeClass("has-error");
		$("input[type=radio][name=flag]").prop('checked',false);
		$("#flagError").text("");
		$("#flagError").closest('.form-group').removeClass("has-success");
		$("#flagError").closest('.form-group').removeClass("has-error");
		$("#successMsg").text("");
});

$("#deptDesc").bind('paste', function(e) {
	  var self = this;
	  setTimeout(function(e) {
	    var val = $(self).val();
	    if (val != '0') {
	      if (val.match(/^[0-9]+$/) != null) {
	        $("#deptDesc").val("");
	      }
	      $(this).val(val);
	    }
	  }, 0);
	});

$("#deptNameCreate").bind('paste', function(e) {
	  var self = this;
	  setTimeout(function(e) {
	    var val = $(self).val();
	    if (val != '0') {
	      if (val.match(/^[0-9]+$/) != null) {
	        $("#deptNameCreate").val("");
	      }
	      $(this).val(val);
	    }
	  }, 0);
	});

	
// Fetching the modified department modal 
function getdeptIDValue(deptId){
		
		var deptId = deptId;
		
		var ctxPath = getContextPath();
		var urlString = ctxPath + '/getDepartmentData';
		
		  $.ajax({
			    url :urlString,
			    data : {
			    	deptId : deptId,
    			},
				type : 'get',
				contentType : "application/json",
				dataType: "json",
				async : false,
				cache : false,
				success : function(result) {
					$("#modal_editdeptdetails").modal("show");
					disable_tab();
					$("#modifyDeptId").val(result.deptID);
					$("#modifydeptDesc").val(result.deptDesc);
					$("#modifydeptName").val(result.deptName);
					if(result.flag == 0)
					$("#modifyDeptFlag1").prop('checked',true);
					else
						$("#modifyDeptFlag2").prop('checked',true);
					
				},
				error : function(result) {
					
				}
			});
}
	
function validateModifieDeptModal(){

		var flag = true;
		var regex = /^[a-zA-Z]*$/;
		var regex_spaces = /^[a-zA-Z ]*$/;
		
		if ($("#modifydeptDesc").val().trim() == "" && $("#modifydeptDesc").val().trim().length == 0) {
			$("#modifydeptDesc").closest('.form-group').addClass('has-error');
			$("#modifydeptDesc").closest('.form-group').removeClass("has-success");
		//	$("#modifydeptDescError").text("This field is required.");
			flag = false;
		} else if (!regex_spaces.test($("#modifydeptDesc").val())) {
			$("#modifydeptDesc").closest('.form-group').addClass('has-error');
			$("#modifydeptDesc").closest('.form-group').removeClass("has-success");
			$("#modifydeptDescError").text(
					"Department Description should contain only alphabets.");
			flag = false;
		} else {
			$("#modifydeptDesc").closest('.form-group').addClass('has-success');
			$("#modifydeptDesc").closest('.form-group').removeClass("has-error");
			$("#modifydeptDescError").text("");

		}

		if ($("#modifydeptName").val().trim() == "") {
			$("#modifydeptName").closest('.form-group').addClass('has-error');
			$("#modifydeptName").closest('.form-group').removeClass("has-success");
			$("#modifydeptNameError").text("This field is required.");
			flag = false;
		} else if (!regex.test($("#modifydeptName").val())) {
			$("#modifydeptName").closest('.form-group').addClass('has-error');
			$("#modifydeptName").closest('.form-group').removeClass("has-success");
			$("#modifydeptNameError").text("Department ID should contain only alphabets.");
			flag = false;
		} else if ($("#modifydeptName").val().trim().length !== 4) {
			$("#modifydeptName").closest('.form-group').addClass('has-error');
			$("#modifydeptName").closest('.form-group').removeClass("has-success");
			$("#modifydeptNameError").text("Department ID should be 4 characters");
			flag = false;
		}  

		if ($('input[name="modifyDeptFlag"]:checked').length == 0) {
			$("#modifyDeptFlagError").closest('.form-group').addClass('has-error');
			$("#modifyDeptFlagError").closest('.form-group').removeClass("has-success");
			//$("#modifyDeptFlagError").text("This field is required.");
			flag = false;
		} else {
			$("#modifyDeptFlagError").text("");
			$("#modifyDeptFlagError").closest('.form-group').addClass('has-success');
			$("#modifyDeptFlagError").closest('.form-group').removeClass("has-error");
		}

		return flag;
}

//clears copy paste numbers in  modifydeptDesc
$("#modifydeptDesc").bind('paste', function(e) {
	  var self = this;
	  setTimeout(function(e) {
	    var val = $(self).val();
	    if (val != '0') {
	      if (val.match(/^[0-9]+$/) != null) {
	        $("#modifydeptDesc").val("");
	      }
	      $(this).val(val);
	    }
	  }, 0);
});
	

$(document).on('click','.close_ModifyDept', function() {
	
		if($("#modifydeptName").attr('disabled') == undefined){
		      $("#modifydeptName").val("");
		}
		$("#modifydeptNameError").text("");
		$("#modifydeptName").closest('.form-group').removeClass("has-success");
		$("#modifydeptName").closest('.form-group').removeClass("has-error");
		
		$("#modifydeptDesc").val("");
		$("#modifydeptDescError").text("");
		$("#modifydeptDesc").closest('.form-group').removeClass("has-success");
		$("#modifydeptDesc").closest('.form-group').removeClass("has-error");
		$("input[type=radio][name=modifyDeptFlag]").prop('checked',false);
		$("#modifyDeptFlagError").closest('.form-group').removeClass("has-success");
		$("#modifyDeptFlagError").closest('.form-group').removeClass("has-error");
		$("#modifedsuccessMsg").text("");
		$("#modifyDeptFlagError").text("");
		
		$("#modifydeptName").attr('disabled')
});


//Fetching  letter template  to create a copy letter  
function getCopyLetterIDValue(activeLetterId){
		
		var activeLetterId = activeLetterId;
		
		var ctxPath = getContextPath();
		var urlString = ctxPath + '/copyLetter';
		
		  $.ajax({
			    url :urlString,
			    data : {
			    	activeLetterId : activeLetterId,
    			},
				type : 'get',
				async : false,
				cache : false,
				success : function(result) {
					
					$("#modal_copyletter").show();
					disable_tab();
					$("#copyHeaderLetterName").text("Copy Letter -"+result[1].letterName);
					$("#copyFromLetterId").val(result[1].letterId.substring(0, 4));
					$("#copyFromLetterDesc").val(result[1].letterDescription);
					$("#copyFromLetterName").val(result[1].letterName);
					$('#copyFromSecurityLevel').val(result[1].level);
					
					$("#copyFromLetterFormData").val(result[1].letterFormData);
					$("#copyFromActiveLetterId").val(result[1].activeLetterId);
					$("#copyFromLetterVersionId").val(result[1].letterVersionId);
					$('#copyFromActiveUpdateFlag').val(result[1].activeUpdateFlag);
					$('#copyFromLetterIsActive').val(result[1].letterIsActive);
					
					// Department List (ADMIN & LIBRARIAN)
					//findDeptList();
					deptList = '<option value="select">--- Select ---</option>';
					result[0].forEach(function(name) {
						deptList += '<option value="'+ name + '">' + name + '</option>';
					});
					$("#copyToLetterId").html(deptList);
					 
					
				},
				error : function(result) {
					
				}
			});
}

// fetching department list for admin and librarian
function findDeptList(){
	
	var ctxPath = getContextPath();
	var urlString = ctxPath + '/fetchDeptList';
	
	$.ajax({
		url : urlString,
		type : 'get',
		async : false,
		cache : false,
		success : function(result) {
			
			deptList = '<option value="select">--- Select ---</option>';
			result.forEach(function(name) {
				deptList += '<option value="'+ name + '">' + name + '</option>';
			});
			$("#copyToLetterId").html(deptList);
			$("#copyToConditionId").html(deptList);
			
		},
		error : function(result) {
		 
		}
	});
 
	}

//save copied letter modal
$(document).on('click','#btn_copyletter_save',function() {

		var ctxPath = getContextPath();
		var urlString = ctxPath + '/copyLetterSave';
		
		if (validateCopyLetterForm()) {

			var data = {}
		 

			data["letterId"] = $("#copyToLetterId").val();
			data["letterDescription"] = $("#copyToLetterDesc").val();
			data["letterName"] = $("#copyToLetterName").val();
			data["level"] = $('#copyFromSecurityLevel').val();
			
			data["letterFormData"] = $('#copyFromLetterFormData').val();
			//data[" "] = $('#copyFromUpdateFlag').val();
			data["activeLetterId"] = $('#copyFromActiveLetterId').val();
			//data[" "] = $('#copyFromVersions').val();
			data["letterVersionId"] = $('#copyFromLetterVersionId').val();
			//data[" "] = $('#copyFromDeptAutoIncrement').val();
			data["activeUpdateFlag"] = $('#copyFromActiveUpdateFlag').val();
			data["letterIsActive"] = $('#copyFromLetterIsActive').val();
			
			
			$.ajax({
				type : "POST",
				contentType : "application/json",
				url :urlString,
				data : JSON.stringify(data),
				dataType : 'json',
					success: function (data, textStatus, xhr) {
						  alert(data.status);
		            },
		            error: function (data, textStatus, xhr) {
		            	 if(data.status == 302){
		                	$("#copyToLetterName").closest('.form-group').addClass('has-error');
		            		$("#copyToLetterName").closest('.form-group').removeClass("has-success");
		            		$("#copyToLetterNameError").text("Letter Template  name already exists");
			               } else if(data.status == 200){
		            		$("#modal_copyletter").hide();
		            		$("#modal_copylettersuccess").show();
		                  
		                }
		            }
			});
		}
	});

function validateCopyLetterForm(){
	var flag=true;
	var regx="^[a-zA-Z0-9]+$";
	
	
	if ($("#copyToLetterId").val().trim() == "select") {
		$("#copyToLetterId").closest('.form-group').addClass('has-error');
		$("#copyToLetterId").closest('.form-group').removeClass("has-success");
		//$("#copyToLetterDescError").text("This field is required.");
		flag = false;
	}else{
		
		$("#copyToLetterId").closest('.form-group').removeClass('has-error');
		$("#copyToLetterId").closest('.form-group').addClass("has-success");
	}
	
	if ($("#copyToLetterDesc").val().trim() == "" && $("#copyToLetterDesc").val().trim().length == 0) {
		$("#copyToLetterDesc").closest('.form-group').addClass('has-error');
		$("#copyToLetterDesc").closest('.form-group').removeClass("has-success");
		//$("#copyToLetterDescError").text("This field is required.");
		flag = false;
	} else if( $("#copyFromLetterDesc").val().trim().toUpperCase() == $("#copyToLetterDesc").val().trim().toUpperCase()){
		
		$("#copyToLetterDescError").text("Letter Description cannot be the same as the Copy From");
		$("#copyToLetterDesc").closest('.form-group').addClass('has-error');
		$("#copyToLetterDesc").closest('.form-group').removeClass("has-success");
		$("#copyToLetterDescError").show();
		flag=false;
	} else{ 
		  //$("#copyToLetterDescError").html("");
		$("#copyToLetterDesc").closest('.form-group').removeClass('has-error');
		$("#copyToLetterDesc").closest('.form-group').addClass("has-success");
		$("#copyToLetterDescError").text("");
	}
	

	if ($("#copyToLetterName").val().trim() == "" && $("#copyToLetterName").val().trim().length == 0 || $("#copyToLetterName").val().includes(".") || $("#copyToLetterName").val().includes("_") || $("#copyToLetterName").val().includes("\'") || $("#copyToLetterName").val().replace(/[^A-Z0-9]/ig, "") == "") {
		$("#copyToLetterName").closest('.form-group').addClass('has-error');
		$("#copyToLetterName").closest('.form-group').removeClass("has-success");
		//$("#copyToLetterNameError").text("This field is required.");
		flag = false;
	} else if( $("#copyFromLetterName").val().trim().toUpperCase() === $("#copyToLetterName").val().trim().toUpperCase() ){	
		
		$("#copyToLetterNameError").text("Letter Name cannot be the same as the Copy From");
		$("#copyToLetterName").closest('.form-group').addClass('has-error');
		$("#copyToLetterName").closest('.form-group').removeClass("has-success");
		$("#copyToLetterNameError").show();
		flag = false;
	} else {
		//$("#copyToLetterNameError").html("");
		$("#copyToLetterNameError").text("");
		$("#copyToLetterName").closest('.form-group').removeClass('has-error');
		$("#copyToLetterName").closest('.form-group').addClass("has-success");
	}
	
	
	if ($("#copyToSecurityLevel").val().trim() == "" && $("#copyToSecurityLevel").val().trim().length == 0) {
		$("#copyToSecurityLevel").closest('.form-group').addClass('has-error');
		$("#copyToSecurityLevel").closest('.form-group').removeClass("has-success");
		//$("#copyToLetterDescError").text("This field is required.");
		flag = false;
	}else{
		
		$("#copyToSecurityLevel").closest('.form-group').removeClass('has-error');
		$("#copyToSecurityLevel").closest('.form-group').addClass("has-success");
	}
	
	return flag;
}


//Fetching  conditional statement to create  a copy conditional statement 
function getCopyConditionIDValue(condStmtID){
		
		var condStmtID = condStmtID;
		
		var ctxPath = getContextPath();
		var urlString = ctxPath + '/copyConditionStmt';
		
		  $.ajax({
			    url :urlString,
			    data : {
			    	condStmtID : condStmtID,
    			},
				type : 'get',
				async : false,
				cache : false,
				success : function(result) {
					
					$("#modal_copyCondition").show();
					disable_tab();
					$("#copyHeaderConditionName").text("Copy Conditional Statement -"+result[1].condStmtName);
					$("#copyFromConditionId").val(result[1].condStmtID.substring(0, 4));
					$("#copyFromConditionDesc").val(result[1].condStmtDesc);
					$("#copyFromConditionName").val(result[1].condStmtName);
					
					$("#copyFromletterCondData").val(result[1].letterCondData);
					$("#copyFromCondActiveLetterId").val(result[1].lettercondId);
					$("#copyFromCondVersions").val(result[1].condVersionId);
					$('#copyFromCondActiveUpdateFlag').val(result[1].activeUpdateFlag);
					$('#copyFromCondLetterIsActive').val(result[1].conditionIsActive);
					
					// Department List (ADMIN & LIBRARIAN)
					//findDeptList();
					deptList = '<option value="select">--- Select ---</option>';
					result[0].forEach(function(name) {
						deptList += '<option value="'+ name + '">' + name + '</option>';
					});
					$("#copyToConditionId").html(deptList);
					
				},
				error : function(result) {
					
				}
			});
}

//save copied conditional stmt modal
$(document).on('click','#btn_copyCondition_save',function() {

		var ctxPath = getContextPath();
		var urlString = ctxPath + '/saveCopyConditionalStmt';
		
		if (validateCopyConditionForm()) {

			var data = {}
		 
			data["condStmtID"] = $("#copyToConditionId").val();
			data["condStmtDesc"] = $("#copyToConditionDesc").val();
			data["condStmtName"] = $("#copyToConditionName").val();
			
			data["letterCondData"] = $('#copyFromletterCondData').val();
			//data[" "] = $('#copyFromUpdateFlag').val();
			data["lettercondId"] = $('#copyFromCondActiveLetterId').val();
			//data[" "] = $('#copyFromVersions').val();
			data["condVersionId"] = $('#copyFromCondVersions').val();
			//data[" "] = $('#copyFromDeptAutoIncrement').val();
			data["activeUpdateFlag"] = $('#copyFromCondActiveUpdateFlag').val();
			data["conditionIsActive"] = $('#copyFromCondLetterIsActive').val();	
			
			
			$.ajax({
				type : "POST",
				contentType : "application/json",
				url :urlString,
				data : JSON.stringify(data),
				dataType : 'json',
					success: function (data, textStatus, xhr) {
						  alert(data.status);
		            },
		            error: function (data, textStatus, xhr) {		             
		             if(data.status == 302){
		                	$("#copyToConditionName").closest('.form-group').addClass('has-error');
		            		$("#copyToConditionName").closest('.form-group').removeClass("has-success");
		            		$("#copyToConditionNameError").text("Conditional Statement name already exists");
		                }else if(data.status == 200){
		                	$("#modal_copyCondition").hide();
		            		$("#modal_copyconditionsuccess").show();
		                }
		                
		            }
			});
		}
	});


function validateCopyConditionForm(){
	
	var flag=true;
	var regx="^[a-zA-Z0-9]+$";
	
	
	if ($("#copyToConditionId").val().trim() == "select") {
		$("#copyToConditionId").closest('.form-group').addClass('has-error');
		$("#copyToConditionId").closest('.form-group').removeClass("has-success");
		//$("#copyToLetterDescError").text("This field is required.");
		flag = false;
	}else{
		
		$("#copyToConditionId").closest('.form-group').removeClass('has-error');
		$("#copyToConditionId").closest('.form-group').addClass("has-success");
	}
	
	if ($("#copyToConditionDesc").val().trim() == "" && $("#copyToConditionDesc").val().trim().length == 0) {
		$("#copyToConditionDesc").closest('.form-group').addClass('has-error');
		$("#copyToConditionDesc").closest('.form-group').removeClass("has-success");
		//$("#copyToLetterDescError").text("This field is required.");
		flag = false;
	} else if( $("#copyFromConditionDesc").val().trim().toUpperCase() == $("#copyToConditionDesc").val().trim().toUpperCase()){
		
		$("#copyToConditionDescError").text("Conditional Statement Description cannot be the same as the Copy From");
		$("#copyToConditionDesc").closest('.form-group').addClass('has-error');
		$("#copyToConditionDesc").closest('.form-group').removeClass("has-success");
		$("#copyToConditionDescError").show();
		flag=false;
	} else{ 
		$("#copyToConditionDesc").closest('.form-group').removeClass('has-error');
		$("#copyToConditionDesc").closest('.form-group').addClass("has-success");
		$("#copyToConditionDescError").text("");
	}
	

	if ($("#copyToConditionName").val().trim() == "" && $("#copyToConditionName").val().trim().length == 0 || $("#copyToConditionName").val().includes(".") || $("#copyToConditionName").val().includes("_") || $("#copyToConditionName").val().includes("\'") || $("#copyToConditionName").val().replace(/[^A-Z0-9]/ig, "") == "") {
		$("#copyToConditionName").closest('.form-group').addClass('has-error');
		$("#copyToConditionName").closest('.form-group').removeClass("has-success");
		//$("#copyToLetterNameError").text("This field is required.");
		flag = false;
	} else if( $("#copyFromConditionName").val().trim().toUpperCase() === $("#copyToConditionName").val().trim().toUpperCase() ){	
		
		$("#copyToConditionNameError").text("Conditional Statement Name cannot be the same as the Copy From");
		$("#copyToConditionName").closest('.form-group').addClass('has-error');
		$("#copyToConditionName").closest('.form-group').removeClass("has-success");
		$("#copyToConditionNameError").show();
		flag = false;
	} else {
		$("#copyToConditionNameError").text("");
		$("#copyToConditionName").closest('.form-group').removeClass('has-error');
		$("#copyToConditionName").closest('.form-group').addClass("has-success");
	}
	
	return flag;
}

var updateSelectedValue="";
$(document).ready(function() {
	if($("#condStmtJSON").val() !=undefined && $("#condStmtJSON").val() !=""){
	var jsonObj = JSON.parse($("#condStmtJSON").val().trim());
	condStmtObj = jsonObj.letterCondStmtVO;
	dataFormation(condStmtObj);
	
	function dataFormation(condStmtObj) {
		let condStmtData = "";
		for ( var i in condStmtObj) {
			
			$("#condStmtID").val(condStmtObj[i].condStmtID.substring(0, 4)).prop("disabled", true);
			updateSelectedValue=condStmtObj[i].condStmtID.substring(0, 4);
			$("#updateCondStmtId").val(condStmtObj[i].deptAutoIncrement);
			$("#condStmtName").val(condStmtObj[i].condStmtName).prop("disabled", true);
			$("#condStmtDesc").val(condStmtObj[i].condStmtDesc);			
			
			$("#updateCondStmtUpdateFlag").val(condStmtObj[i].updateFlag);         
			$("#updateCondLetterCondId").val(condStmtObj[i].lettercondId);         
			$("#updateCondStmtVersions").val(condStmtObj[i].versions);            
			$("#updateCondVersionId").val(condStmtObj[i].condVersionId);          
			$("#updateDeptAutoIncrement").val(condStmtObj[i].deptAutoIncrement);  	
			$("#updateActiveUpdateFlag").val(condStmtObj[i].activeUpdateFlag);     
			$("#updateConditionIsActive").val(condStmtObj[i].conditionIsActive);
			
			loopThroughConditions(JSON.parse(condStmtObj[i].letterCondData.replace(new RegExp(escapeRegExp('^'), 'g'), "'")));
						
		}
		return condStmtData;
	}
	}
	
	function escapeRegExp(string){
	    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}
	
	function loopThroughConditions(data){
	 var lengthOfData=data.length;
	for (var j in data) {
		if(j==0){
			$("#ifStatement_text").val(data[j].if);		
			$("#result0").val(data[j].result);
			$("#if_in_dd0").val(data[j].in);
			$("#if_in_stmt0").val(data[j].stmt);
			$("#finalelseresult").val(data[j].else);
		}else{
				$("#btn_addelseif").click();
				$("#if_elseif_statement_text_"+j).val(data[j].elseif);	
				$("#if_elseif_result_"+j).val(data[j].result);
				$("#if_elseif_in_dd_"+j).val(data[j].in);
				$("#if_elseif_in_stmt_"+j).val(data[j].stmt);
				 
		}
	} 
	}
	 
});