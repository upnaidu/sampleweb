var departNames;
var departmentList;
var emptyErrorMsg = "This field is required.";
var approverLevel;

$(document).ready(function() {	
	
	
	var ctxPath = getContextPath();

	$("#btn_saveUser").click(function(event) {
		var urlString = ctxPath + '/registration';

		var data = {}
		if(validateUser() == "false"){

			data["firstName"] = $("#firstName").val();
			data["lastName"] = $("#lastName").val();
			data["emailId"] = $("#emailId").val();
			data["username"] = $("#userName").val();
			data["roleId"] = $("input[name='role']:checked").val().substr(0, 1);
			data["deptId"] = $("#deptName").val();
			data["letterSecurityLevel"] = $("#letterSecLevel").val();
			if($("#approverSecLevel").val() != null)
			data["approverSecurityLevel"] = $("#approverSecLevel").val();
			else
				data["approverSecurityLevel"] = "0";	

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
							document.getElementById("userNameError").innerHTML = "Username already in use. Please select another username.";
							$("#userNameError").closest('.form-group').addClass('has-error');
							$("#userNameError").closest('.form-group').removeClass("has-success");
							$("#userNameError").show();
						}
						else if(data.status == 200){
							console.log("user created successfully");
							$("#modal_createuser").hide();
						$("#modal_save").show();
						}
						else if(data.status == 404){
							console.log("user not created");
						}
		            }
			});
		}
	});
	
	
	$("#btn_saveEditUser").click(function(event) {
		var urlString = ctxPath + '/updateUser';

		var data = {}
		if(validateEditUser() == "false"){

			data["username"] = $("#modifyUsername").val();
			data["roleId"] = $("input[name='modifyRole']:checked").val().substr(0, 1);
			data["deptId"] = $("#modifyDept").val();
			data["letterSecurityLevel"] = $("#modifyletterSecLevel").val();
			if($("#modifyApproverSecLevel").val() != null)
			 data["approverSecurityLevel"] = $("#modifyApproverSecLevel").val();
			else
			 data["approverSecurityLevel"] = "0";
			
			data["flag"] = true;
			if($("#modifyStatus").is(":checked")==true){
				data["flag"] = false;
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
		            	if(data.status == 200){
		            	clearModifyData();
		            	$("#modal_edituserdetails").hide();
						$("#modal_editsave").show();
		            	}
		            	else if(data.status == 304){
		            		console.log("User not modified");
			            }
		            }
			});
		}
	});
	
	
	$("#approverSecDiv").hide();
	
	
				$(document).mousemove(function(e){
					left=e.pageX;
					top=e.pageY;
				});
				
				function findHighestZIndex(elem)
			{
			  var elems = document.getElementsByTagName(elem);
			  var highest = 0;
			  for (var i = 0; i < elems.length; i++)
			  {
				var zindex=document.defaultView.getComputedStyle(elems[i],null).getPropertyValue("z-index");
				
				if ((zindex != 'auto')){
				if(zindex > highest)
				{
				  highest = zindex;
				}}
			  }
			  
			  return highest;
			}
			
			var highindex;
				$("#modal_services").draggable({
					  handle: ".popup_default-header",
					  zIndex: 1059,
					  containment:'body',
				});
				$('div.note-editable').attr('id', 'textInput_summernote');
				$("#modal_services li").draggable({
					cursor: 'move',
					helper: 'clone',
					zIndex: 1099,
					revert: 'invalid',
					containment:"body",
					appendTo: "body",
  
				});
				
				$("#modal_top_close").click(function(){
				$("#modal_services").hide();
			});
				
			
			
		
			
			
			$('#link_createnewuser').click(function(){
			highindex=findHighestZIndex('div');
				
		
				$("#modal_createuser").css('display','block');
				disable_tab();
			});
			$('#btn_save').click(function(){
			highindex=findHighestZIndex('div');
				
		
			});
			
			$("#btn_createuser_close").click(function(){
				$("#modal_createuser").hide();
				enable_tab();
			});
			$("#btn_createuser_cancel").click(function(){
				$("#modal_createuser").hide();
				enable_tab();
			});
			
			
			$('#link_viewuser').click(function(){
			highindex=findHighestZIndex('div');
				
		
				$("#modal_viewuser").css('display','block');
				
			});
				
			$(".modal_userlinkmodify").click(function(){
			highindex=findHighestZIndex('div');
				
		
				$("#modal_edituserdetails").css('display','block');
				disable_tab();
			});		

			
				$("#link_modifyuser").click(function(){
			highindex=findHighestZIndex('div');
				
		
				$("#modal_modifyuser").css('display','block');
				disable_tab();
			});			
				
				$('#btn_edituserdetails_save').click(function(){
			highindex=findHighestZIndex('div');
				
		
				$("#modal_editsave").css('display','block');
				disable_tab();
				
			});
			
			
			
			var tooltip = $("#tooltip");
    $('[data-tooltip]').bind('mouseover', function() {
	
        var $this = $(this), offset = $this.offset(), posX = offset.left, posY = offset.top;
        posX = $this.find('a').innerWidth()+20;
		console.log("inside thisssssssssssssss:"+$this+"          "+posX);
        tooltip.css({left: posX + "px", top: posY + "px"}).
            text($this.attr('data-tooltip')).
            removeClass("nd");
    }).bind('mouseout', function() { tooltip.addClass('nd'); });
			
			$("#search_txt").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#field_db li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

			
			
			$('#link_createnewdept').click(function(){
				$("#modal_services").hide();
				highindex=findHighestZIndex('div');
					
			
					$("#modal_createdept").css('display','block');
					disable_tab();
					
				});
				$('#btn_savedept').click(function(){
				highindex=findHighestZIndex('div');
					
			
					$("#modal_savedept").css('display','block');
					
				});
				
				$("#btn_createdept_close").click(function(){
					$("#modal_createdept").hide();
					enable_tab();
				});
				$("#btn_createdept_cancel").click(function(){
					$("#modal_createdept").hide();
					enable_tab();
				});
				
				
				$('#link_viewdept').click(function(){
				highindex=findHighestZIndex('div');
					
			
					$("#modal_viewdept").css('display','block');
					disable_tab();

				});
					
				$(".modal_deptlinkmodify").click(function(){
				highindex=findHighestZIndex('div');
					
			
					$("#modal_editdeptdetails").css('display','block');
				});		

				
					$("#link_modifydept").click(function(){
				highindex=findHighestZIndex('div');
					
			
					$("#modal_modifydept").css('display','block');
				});			
					
					$('#btn_editdeptdetails_save').click(function(){
				highindex=findHighestZIndex('div');
					
			if(validateModifieDeptModal==true){
					$("#modal_editsavedept").css('display','block');
			}
				});
		
	
		});
		

//validating user creating modal page using validateUser existing function.
$(document).on('keyup change','#btn_saveUser',function(){
	
	//validateUser();
});
//validating user edit user modal page using validateEditUser existing function.
$(document).on('keyup change','#btn_saveEditUser',function(){
	validateEditUser();
});

		function modal_save_close()
		{enable_tab();
		$("#modal_save").hide();
		$("#modal_createuser").hide();
		var ctxPath = getContextPath();
		var urlString = ctxPath + '/viewAllUsers';
		window.location.href=urlString;
		
		}
		function modal_viewuser_close()
		{
		$("#modal_viewuser").hide();
		enable_tab();
		}
		
		
		function modal_modifyuser_close()
		{$("#modal_modifyuser").hide();
		
		enable_tab();
		
		}
		function btn_edituserdetails_close()
		{
			clearModifyData();
		$("#modal_edituserdetails").hide();
		$("#modal_modifyuser").hide();
		enable_tab();
		}
		function modal_editsaveclose(){
			clearModifyData();
		$("#modal_edituserdetails").hide();
		$("#modal_editsave").hide();
		enable_tab();
		var ctxPath = getContextPath();
		var urlString = ctxPath + '/modifyAllUser';
		window.location.href=urlString;
		
		}
		
function findUserDetails(userName){
	var ctxPath = getContextPath();
	var urlString = ctxPath + '/modifyUser?username='+userName;
	$.ajax({
		
		url  : urlString,
		type : 'get',
		async : false,
		cache : false,
		success : function(result) {
			
			$("#modal_edituserdetails").css('display','block');
			disable_tab();

			departNames = "";
	        roleNames = "";
	        roles = '<option value="0">--- Select ---</option>';
				departNames = '<option value="0">--- Select ---</option>';
				result[1].forEach(function(name) {
					departNames += '<option value="'
							+ name.deptID + '">' + name.deptName + '</option>';
				});
				$("#modifyDept").html(departNames);
				
				
				result[2].forEach(function(name) {
					roleNames += '<label class="column_padding"><input  type="radio" id="role' + name.roleid + '" name="modifyRole" value="' + name.roleid + name.role+ '" onchange="findRoleModify(this)">' + name.role + '</label><br>';
				});
				$("#modifyRole").html(roleNames);
				result[3].forEach(function(name) {
					roles += '<option value="'
							+ name + '">' + name + '</option>';
				});
				$("#modifyApproverSecLevel").html(roles);
			
			$("#modifyFname").val(result[0].firstname);
			$("#modifyLname").val(result[0].lastname);
			$("#modifyEmail").val(result[0].email);
			$("#modifyUsername").val(result[0].username);
			
			$("#role"+result[0].roleid).prop('checked',true);
			
			
			if(result[0].flag==true){
				$("#modifyStatus1").prop('checked',true);
			}else{
				$("#modifyStatus").prop('checked',true);
			}
			
			var value = ($("input[name='modifyRole']:checked").val());
	
			
			if(value.substr(1, value.length) == "Administrator"){
				document.getElementById("modifyApproverSecLevel").value = '0';
				   $("#approverData").hide();
				   
				   document.getElementById("modifyDept").value = '0';
				   $("#modifyDeptDiv").hide();
				   
				   document.getElementById("modifyletterSecLevel").value = '0';
				   $("#modifyletterSecurityDiv").hide();
				   $("#modifySecurityDiv").hide();
				}
			   else{
				   
				   
				   if(value.substr(1, value.length) == "Approver"){
					   approverLevel = result[0].approverSecurityLevel;
					   $("#approverData").show();
					   $("#modifyApproverSecLevel").val(result[0].approverSecurityLevel);
					   
					   $("#modifyDeptDiv").show();
					   $("#modifyDept").val(result[0].deptid);
					   
					   $("#modifySecurityDiv").show();
					   $("#modifyletterSecurityDiv").show();
					   $("#modifyletterSecLevel").val(result[0].letterSecurityLevel);
					}
				   else{
					   $("#approverData").hide();
					   document.getElementById("modifyApproverSecLevel").value = '0';
					   $("#modifyDeptDiv").show();
					   $("#modifyDept").val(result[0].deptid);
					   
					   $("#modifySecurityDiv").show();
					   $("#modifyletterSecurityDiv").show();
					   $("#modifyletterSecLevel").val(result[0].letterSecurityLevel);
				   }
			   }
			
			
			
		},
		error : function(result) {
		 
		}
	});
}
function disable_tab(){
	$("header :focusable").addClass("disabled").attr("tabindex", -1);
	$("section :focusable").addClass("disabled").attr("tabindex", -1);
	// To disable
	$('.note-editable').attr('contenteditable',false); 
}
function enable_tab(){
	$("header :focusable").removeClass("disabled").attr("tabindex", 0);
	$("section :focusable").removeClass("disabled").attr("tabindex", 0);	
	
	// To enable
	$('.note-editable').attr('contenteditable',true);	
}
	
  
function validateUser(){
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var emailId = document.getElementById("emailId").value;
	var userName = document.getElementById("userName").value;
	var role = $("input[name='role']:checked").val();
	var deptName = document.getElementById("deptName").value;
	var letterSecLevel = document.getElementById("letterSecLevel").value;
	var approverSecLevel = document.getElementById("approverSecLevel").value;
	
	console.log("Validating user details");
	var error = "false";
	var value = $("input[name='role']:checked").val();
	
/* .....................................First name validation ................................................*/
	var regex = /^[a-zA-Z]*$/;
	
	if(firstName.trim().length == 0){
		$("#firstName").closest('.form-group').addClass('has-error');
		$("#firstName").closest('.form-group').removeClass("has-success");
		$("#firstNameError").html("");
		$("#firstNameError").show();
		error = "true";
	}
	else if(firstName.trim().length < 2 || firstName.trim().length > 32){
		document.getElementById("firstNameError").innerHTML = "Use 2 to 32 characters for first name.";
		$("#firstName").closest('.form-group').addClass('has-error');
		$("#firstName").closest('.form-group').removeClass("has-success");
		$("#firstNameError").show();
		error = "true";
	}
	
	
	else{
		$("#firstNameError").hide();
		$("#firstName").closest('.form-group').removeClass('has-error');
		$("#firstName").closest('.form-group').addClass("has-success");
	}
/* .....................................Last name validation ................................................*/
	if(lastName.trim().length == 0){
		$("#lastName").closest('.form-group').addClass('has-error');
		$("#lastName").closest('.form-group').removeClass("has-success");
		$("#lastNameError").html("");
		$("#lastNameError").show();
		error = "true";
	}
	else if(lastName.trim().length < 2 || lastName.trim().length > 32){
		document.getElementById("lastNameError").innerHTML = "Use 2 to 32 characters for last name.";
		$("#lastName").closest('.form-group').addClass('has-error');
		$("#lastName").closest('.form-group').removeClass("has-success");
		$("#lastNameError").show();
		error = "true";
	}
	
	else{
		$("#lastNameError").hide();
		$("#lastName").closest('.form-group').removeClass('has-error');
		$("#lastName").closest('.form-group').addClass("has-success");
	}
/* .....................................User name validation ................................................*/
	if(userName.trim().length == 0){
		$("#userName").closest('.form-group').addClass('has-error');
		$("#userName").closest('.form-group').removeClass("has-success");
		$("#userNameError").html("");
		$("#userNameError").show();
		error = "true";
	}
	else if((userName.trim().length < 3 || userName.trim().length > 8) && (userName.trim().length != 0)){
		document.getElementById("userNameError").innerHTML = "Use 3 to 8 characters for username.";
		$("#userName").closest('.form-group').addClass('has-error');
		$("#userName").closest('.form-group').removeClass("has-success");
		$("#userNameError").show();
		error = "true";
	}
	
	else{
		$("#userNameError").hide();
		$("#userName").closest('.form-group').removeClass('has-error');
		$("#userName").closest('.form-group').addClass("has-success");
	}
/* .........................................Email validation ................................................*/
	if(emailId.trim().length == 0){
		$("#emailId").closest('.form-group').addClass('has-error');
		$("#emailId").closest('.form-group').removeClass("has-success");
		$("#emailIdError").html("");
		$("#emailIdError").show();
		error = "true";
	}
	else if ((reg.test(emailId) == false) && (emailId.trim().length != 0)) 
    {
		document.getElementById("emailIdError").innerHTML = "Invalid Email-Id.";
		$("#emailId").closest('.form-group').addClass('has-error');
		$("#emailId").closest('.form-group').removeClass("has-success");
		$("#emailIdError").show();
		error = "true";
    }
	else{
		$("#emailIdError").hide();
		$("#emailId").closest('.form-group').removeClass('has-error');
		$("#emailId").closest('.form-group').addClass("has-success");
	}
	
	/* .............................................Role validation ................................................*/	
	if($("input[name='role']:checked").val() == undefined){
		$("#role").closest('.form-group').addClass('has-error');
		$("#role").closest('.form-group').removeClass("has-success");
		error = "true";
	}
	else{
		$("#role").closest('.form-group').removeClass('has-error');
		$("#role").closest('.form-group').addClass("has-success");
	}
	
if(value == undefined || value.substr(1, value.length) != "Administrator"){

	
/* .........................................Department validation ................................................*/	
		if($("#deptName option:selected").text() == "--- Select ---"){
		$("#deptName").closest('.form-group').addClass('has-error');
		$("#deptName").closest('.form-group').removeClass("has-success");
		error = "true";
	}
	else{
		$("#deptName").closest('.form-group').removeClass('has-error');
		$("#deptName").closest('.form-group').addClass("has-success");
	}
	
/* .........................................Letter security level validation ................................................*/	
		if($("#letterSecLevel option:selected").text() == "--- Select ---"){
		$("#letterSecLevel").closest('.form-group').addClass('has-error');
		$("#letterSecLevel").closest('.form-group').removeClass("has-success");
		error = "true";
	}
	else{
		$("#letterSecLevel").closest('.form-group').removeClass('has-error');
		$("#letterSecLevel").closest('.form-group').addClass("has-success");
	}
		
/* .........................................Approver security level validation ................................................*/	
	if(value != undefined){
		if(value.substr(1, value.length) == "Approver"){
		if($("#approverSecLevel option:selected").text() == "--- Select ---"){
		$("#approverSecLevel").closest('.form-group').addClass('has-error');
		$("#approverSecLevel").closest('.form-group').removeClass("has-success");
		error = "true";
	}	else{
		$("#approverSecLevel").closest('.form-group').removeClass('has-error');
		$("#approverSecLevel").closest('.form-group').addClass("has-success");
	}
		}
}
}		
	return error;
}



function validateEditUser(){
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	var value = $("input[name='modifyRole']:checked").val();
	
	console.log("Validating user details");
	var error = "false";
	
	
/* .............................................Role validation ................................................*/	
	if(value == undefined){
		$("#role1").closest('.form-group').addClass('has-error');
		$("#role1").closest('.form-group').removeClass("has-success");
		$("#role2").closest('.form-group').addClass('has-error');
		$("#role2").closest('.form-group').removeClass("has-success");
		$("#role3").closest('.form-group').addClass('has-error');
		$("#role3").closest('.form-group').removeClass("has-success");
		$("#role4").closest('.form-group').addClass('has-error');
		$("#role4").closest('.form-group').removeClass("has-success");
		error = "true";
	}
	else{
		$("input[name=modifyRole]").closest('.form-group').removeClass('has-error');
		$("input[name=modifyRole]").closest('.form-group').addClass("has-success");
	}
	
/* .............................................Staus validation ................................................*/	
	if($("input[name='modifyFlag']:checked").val() == undefined){
		$("#modifyStatus").closest('.form-group').addClass('has-error');
		$("#modifyStatus").closest('.form-group').removeClass("has-success");
		$("#modifyStatus1").closest('.form-group').addClass('has-error');
		$("#modifyStatus1").closest('.form-group').removeClass("has-success");
		
		error = "true";
	}
	else{
		$("#modifyStatus").closest('.form-group').removeClass('has-error');
		$("#modifyStatus").closest('.form-group').addClass("has-success");
	}
if(value == undefined || value.substr(1, value.length) != "Administrator"){		
/* .........................................Department validation ................................................*/	
	if(document.getElementById("modifyDept").value == "0"){
		$("#modifyDept").closest('.form-group').addClass('has-error');
		$("#modifyDept").closest('.form-group').removeClass("has-success");
		error = "true";
	}
	else{
		$("#modifyDept").closest('.form-group').removeClass('has-error');
		$("#modifyDept").closest('.form-group').addClass("has-success");
	}
	
/* .........................................Letter security level validation ................................................*/	
	if(document.getElementById("modifyletterSecLevel").value == "0"){
		$("#modifyletterSecLevel").closest('.form-group').addClass('has-error');
		$("#modifyletterSecLevel").closest('.form-group').removeClass("has-success");
		error = "true";
	}
	else{
		$("#modifyletterSecLevel").closest('.form-group').removeClass('has-error');
		$("#modifyletterSecLevel").closest('.form-group').addClass("has-success");
	}
/* .........................................Approver security level validation ................................................*/
if(value != undefined){
  if(value.substr(1, value.length) == "Approver"){
	if(document.getElementById("modifyApproverSecLevel").value == "0"){
		$("#modifyApproverSecLevel").closest('.form-group').addClass('has-error');
		$("#modifyApproverSecLevel").closest('.form-group').removeClass("has-success");
		error = "true";
	}	
	else{
		$("#modifyApproverSecLevel").closest('.form-group').removeClass('has-error');
		$("#modifyApproverSecLevel").closest('.form-group').addClass("has-success");
	}
  }
}
}
	return error;
}


function createUserData(){
	$("#modal_services").hide();
	var ctxPath = getContextPath();
	var urlString = ctxPath + '/createUserData';
	
	console.log("inside department list");
	$.ajax({
		url  : urlString,
		type : 'get',
		async : false,
		cache : false,
		success : function(result) {
			
		if(result.length != 0){
			
			

        departNames = "";
        roleNames = "";
			departNames = '<option value="0">--- Select ---</option>';
			
		if(result[0].length != 0){
				console.log("department list length:: "+result[0].length);
			result[0].forEach(function(name) {
				departNames += '<option value="'
						+ name.deptID + '">' + name.deptName + '</option>';
			});
			$("#deptName").html(departNames);
			$("#deptName").attr("title", " ");
		}
		else{
			$("#deptName").attr("title", "please create department first");
		}
		console.log("rolet list length:: "+result[1].length);
		
			result[1].forEach(function(name) {
				roleNames += '<label ><input  type="radio" id="role" name="role" value="' + name.roleid + name.role+ '" onchange="findRole()">' + name.role + '</label><br>';
			});
			$("#roleName").html(roleNames);
		}
		$("#approverSecLevel").value = '0';
	},
		error : function(result) {
		 
		}
	});
}

function findRole(){
	console.log('i am inside findRole():::::::::::::::');
	
	var value = $("input[name='role']:checked").val();
	
	if($("#role").closest('.form-group').hasClass('has-error') && value != undefined){
		 $("#role").closest('.form-group').removeClass('has-error');
			$("#role").closest('.form-group').addClass("has-success");
	 }
	
	if(value.substr(1, value.length) == "Approver"){
		findApprover();
		$("#approverSecDiv").show();
		$("#approverSecLevel").closest('.form-group').removeClass('has-error');
		$("#approverSecLevel").closest('.form-group').removeClass("has-success");
	}
	
	else{
		$("#approverSecDiv").hide();
	}
	
	if(value.substr(1, value.length) == "Administrator"){
		
		
		$("#deptName").closest('.form-group').removeClass('has-error');
		$("#deptName").closest('.form-group').removeClass("has-success");
		document.getElementById("deptName").value = '0';
		$("#departmentDiv").hide();
		
		$("#letterSecLevel").closest('.form-group').removeClass('has-error');
		$("#letterSecLevel").closest('.form-group').removeClass("has-success");
		document.getElementById("letterSecLevel").value = '0';
		$("#letterSecDiv").hide();
		
		
		$("#securityDiv").hide();
		
	}
	
	else{
		$("#securityDiv").show();
		
		$("#departmentDiv").show();
		
		$("#letterSecDiv").show();
	}	
}


function findRoleModify(value){
	
	var val = $(value).val().substr(1, value.length);
	
	if(($("#role1").closest('.form-group').hasClass('has-error') || $("#role2").closest('.form-group').hasClass('has-error')
			|| $("#role3").closest('.form-group').hasClass('has-error') || $("#role4").closest('.form-group').hasClass('has-error'))
			 && val != undefined){
		 $("#role1").closest('.form-group').removeClass('has-error');
		 $("#role1").closest('.form-group').addClass("has-success");
		 $("#role2").closest('.form-group').removeClass('has-error');
		 $("#role2").closest('.form-group').addClass("has-success");
		 $("#role3").closest('.form-group').removeClass('has-error');
		 $("#role3").closest('.form-group').addClass("has-success");
		 $("#role4").closest('.form-group').removeClass('has-error');
		 $("#role4").closest('.form-group').addClass("has-success");
	 }
	
		if(val !="Approver"){
		 $("#approverData").hide();
	}else{
		
		findApproverModify();
		$("#approverData").show();
		document.getElementById("modifyApproverSecLevel").value = '0';
		$("#modifyApproverSecLevel").closest('.form-group').removeClass('has-error');
		$("#modifyApproverSecLevel").closest('.form-group').removeClass("has-success");
	}
	
		if(val =="Administrator"){
		 $("#approverData").hide();
		 $("#modifyDeptDiv").hide();
		 $("#modifySecurityDiv").hide();
		 $("#modifyletterSecurityDiv").hide();
		 
		 $("#modifyDept").closest('.form-group').removeClass('has-error');
			$("#modifyDept").closest('.form-group').removeClass("has-success");
			$("#modifyletterSecLevel").closest('.form-group').removeClass('has-error');
			$("#modifyletterSecLevel").closest('.form-group').removeClass("has-success");
			$("#modifyApproverSecLevel").closest('.form-group').removeClass('has-error');
			$("#modifyApproverSecLevel").closest('.form-group').removeClass("has-success");
			
			document.getElementById("modifyletterSecLevel").value = '0';
			document.getElementById("modifyDept").value = '0';
			document.getElementById("modifyApproverSecLevel").value = '0';
			
	}else{
		$("#modifySecurityDiv").show();
		$("#modifyDeptDiv").show();
		
		$("#modifyletterSecurityDiv").show();
		
	}
}


function modal_savedept_close()
{
$("#saveDeptModal").hide();
$("#modal_createdept").hide();
enable_tab();
var ctxPath = getContextPath();
var urlString = ctxPath + '/viewAllDepartments';
window.location.href=urlString;


}
function modal_viewdept_close()
{
$("#modal_viewdept").hide();
enable_tab();
}

function modal_modifydept_close()
{

$("#modal_modifydept").hide();
enable_tab();
}
function btn_editdeptdetails_close()
{
$("#modal_editdeptdetails").hide();
$("#modal_modifydept").hide();
enable_tab();
}
function modal_editsavedeptclose(){
$("#modal_editdeptdetails").hide();
$("#modal_modifydept").hide();
$("#modal_editsavedept").hide();

var ctxPath = getContextPath();
var urlString = ctxPath + '/updateAllDepartment';
window.location.href=urlString;
} 

/*copy letter functions */
function modal_copylettersucces(){
	 
    $("#modal_copyletter").modal('hide');
    $("#modal_copyletter").hide();
	$("#modal_copylettersuccess").show();
	
	var ctxPath = getContextPath();
	var urlString = ctxPath + '/allLetters';
	window.location.href=urlString;

	}

function modal_copyletteropen(){
	$("#modal_copyletter").modal('hide');
	
	$("#modal_copyletter").hide();
	$("#modal_copyletter").show();
	disable_tab();
}


function clear_modal_copyletter(){
	
	$("#copyToLetterId").closest('.form-group').removeClass('has-error has-success');
	$("#copyToLetterId").val("select");
	$("#copyToLetterDescError").text("");
	$("#copyToLetterDesc").closest('.form-group').removeClass('has-error has-success');
	$("#copyToLetterDesc").val("");
	$("#copyToLetterName").closest('.form-group').removeClass('has-error has-success');
	$("#copyToLetterName").val("");
	$("#copyToLetterNameError").text("");
	$("#copyToSecurityLevel").closest('.form-group').removeClass('has-error has-success');
	$("#copyToSecurityLevel").val("");
}

function modal_copyletterclose(){
	
	$("#copyToLetterId").closest('.form-group').removeClass('has-error has-success');
	$("#copyToLetterId").val("select");
	$("#copyToLetterDescError").text("");
	$("#copyToLetterDesc").closest('.form-group').removeClass('has-error has-success');
	$("#copyToLetterDesc").val("");
	$("#copyToLetterName").closest('.form-group').removeClass('has-error has-success');
	$("#copyToLetterName").val("");
	$("#copyToLetterNameError").text("");
	$("#copyToSecurityLevel").closest('.form-group').removeClass('has-error has-success');
	$("#copyToSecurityLevel").val("");
	$("#modal_copyletter").hide();
	enable_tab();
}

/*copy conditional functions*/

function modal_copyconditionclose(){
	
	enable_tab();
	$("#modal_copyCondition").hide();
	$("#copyToConditionId").closest('.form-group').removeClass('has-error has-success');
	$("#copyToConditionId").val('select');
	
	$("#copyToConditionDesc").closest('.form-group').removeClass('has-error has-success');
	$("#copyToConditionDesc").val('');
	$("#copyToConditionDescError").text("");
	
	$("#copyToConditionName").closest('.form-group').removeClass('has-error has-success');
	$("#copyToConditionName").val('');
	$("#copyToConditionNameError").text("");
}
function clear_modal_conditionletter(){
	
	$("#copyToConditionId").closest('.form-group').removeClass('has-error has-success');
	$("#copyToConditionId").val('select');
	
	$("#copyToConditionDesc").closest('.form-group').removeClass('has-error has-success');
	$("#copyToConditionDesc").val('');
	$("#copyToConditionDescError").text("");
	
	$("#copyToConditionName").closest('.form-group').removeClass('has-error has-success');
	$("#copyToConditionName").val('');
	$("#copyToConditionNameError").text("");
	
}

function modal_copycondition_success_close(){
	
	enable_tab();
	
	$("#modal_copyCondition").hide();
	$("#modal_copyconditionsuccess").show();
	
	
	var ctxPath = getContextPath();
	var urlString = ctxPath + '/fetchCondStmt';
	window.location.href=urlString;
}

function AlphabetsAndSpace(e, t) {

    try {

        if (window.event) {

            var charCode = window.event.keyCode;

        }

        else if (e) {

            var charCode = e.which;

        }

        else { return true; }

        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode == 32))

            return true;

        else

            return false;

    }

    catch (err) {

        alert("only alphabate");

    }
    

}

function alphabetsAndNumeric(e, t) {

    try {

        if (window.event) {

            var charCode = window.event.keyCode;

        }

        else if (e) {

            var charCode = e.which;

        }

        else { return true; }

        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode > 47 && charCode < 58))

            return true;

        else

            return false;

    }

    catch (err) {

        alert("only alphabate");

    }

}

function clearUserData(){
	document.getElementById("firstName").value = '';
	document.getElementById("lastName").value = '';
	document.getElementById("emailId").value = '';
	document.getElementById("userName").value = '';
	//document.getElementById("role").value = '';
	document.getElementById("deptName").value = '0';
	document.getElementById("letterSecLevel").value = '0';
	document.getElementById("approverSecLevel").value = '0';
	
	$("#firstName").closest('.form-group').removeClass('has-error');
	$("#firstName").closest('.form-group').removeClass("has-success");
	$("#lastName").closest('.form-group').removeClass('has-error');
	$("#lastName").closest('.form-group').removeClass("has-success");
	$("#emailId").closest('.form-group').removeClass('has-error');
	$("#emailId").closest('.form-group').removeClass("has-success");
	$("#userName").closest('.form-group').removeClass('has-error');
	$("#userName").closest('.form-group').removeClass("has-success");
	$("#role").closest('.form-group').removeClass('has-error');
	$("#role").closest('.form-group').removeClass("has-success");
	$("#deptName").closest('.form-group').removeClass('has-error');
	$("#deptName").closest('.form-group').removeClass("has-success");
	$("#letterSecLevel").closest('.form-group').removeClass('has-error');
	$("#letterSecLevel").closest('.form-group').removeClass("has-success");
	$("#approverSecLevel").closest('.form-group').removeClass('has-error');
	$("#approverSecLevel").closest('.form-group').removeClass("has-success");
	
	document.getElementById("firstNameError").value = '';
	document.getElementById("lastNameError").value = '';
	document.getElementById("userNameError").value = '';
	document.getElementById("emailIdError").value = '';
	
	$("#firstNameError").hide();
	$("#lastNameError").hide();
	$("#userNameError").hide();
	$("#emailIdError").hide();
	$("#approverSecDiv").hide();
	
	$("input[type='radio']").prop("checked", false);
	
	$("#departmentDiv").show();
	$("#letterSecDiv").show();
	$("#securityDiv").show();
	$("#deptName").attr("title", " ");
}

function clearModifyData(){
	$("#modifyFname").closest('.form-group').removeClass('has-error');
	$("#modifyFname").closest('.form-group').removeClass("has-success");
	$("#modifyLname").closest('.form-group').removeClass('has-error');
	$("#modifyLname").closest('.form-group').removeClass("has-success");
	$("#modifyEmail").closest('.form-group').removeClass('has-error');
	$("#modifyEmail").closest('.form-group').removeClass("has-success");
	$("#modifyUsername").closest('.form-group').removeClass('has-error');
	$("#modifyUsername").closest('.form-group').removeClass("has-success");
	$("#modifyRole").closest('.form-group').removeClass('has-error');
	$("#modifyRole").closest('.form-group').removeClass("has-success");
	$("#modifyDept").closest('.form-group').removeClass('has-error');
	$("#modifyDept").closest('.form-group').removeClass("has-success");
	$("#modifyletterSecLevel").closest('.form-group').removeClass('has-error');
	$("#modifyletterSecLevel").closest('.form-group').removeClass("has-success");
	$("#modifyApproverSecLevel").closest('.form-group').removeClass('has-error');
	$("#modifyApproverSecLevel").closest('.form-group').removeClass("has-success");
	$("#modifyStatus1").closest('.form-group').removeClass('has-error');
	$("#modifyStatus1").closest('.form-group').removeClass("has-success");
	$("#modifyStatus").closest('.form-group').removeClass('has-error');
	$("#modifyStatus").closest('.form-group').removeClass("has-success");
	
	document.getElementById("modifyRole").value = '';
	document.getElementById("modifyDept").value = '0';
	document.getElementById("modifyletterSecLevel").value = '0';
	document.getElementById("modifyApproverSecLevel").value = '0';
	
	$("#role1").prop("checked", false);
	$("#role2").prop("checked", false);
	$("#role3").prop("checked", false);
	$("#role4").prop("checked", false);
	$("#modifyStatus").prop("checked", false);
	$("#modifyStatus1").prop("checked", false);
	
	$("#modifyApproverSecLevel").prop("disabled", false);
	$("#modifyApproverSecLevel").attr("title", "");
	$("#approverData").hide();
	$("#modifyDeptDiv").show();
	$("#modifyletterSecurityDiv").show();
	$("#modifySecurityDiv").show();
		approverLevel = "";
};

function clearButtonModify(){
	$("#modifyFname").closest('.form-group').removeClass('has-error');
	$("#modifyFname").closest('.form-group').removeClass("has-success");
	$("#modifyLname").closest('.form-group').removeClass('has-error');
	$("#modifyLname").closest('.form-group').removeClass("has-success");
	$("#modifyEmail").closest('.form-group').removeClass('has-error');
	$("#modifyEmail").closest('.form-group').removeClass("has-success");
	$("#modifyUsername").closest('.form-group').removeClass('has-error');
	$("#modifyUsername").closest('.form-group').removeClass("has-success");
	$("#modifyRole").closest('.form-group').removeClass('has-error');
	$("#modifyRole").closest('.form-group').removeClass("has-success");
	$("#modifyDept").closest('.form-group').removeClass('has-error');
	$("#modifyDept").closest('.form-group').removeClass("has-success");
	$("#modifyletterSecLevel").closest('.form-group').removeClass('has-error');
	$("#modifyletterSecLevel").closest('.form-group').removeClass("has-success");
	$("#modifyApproverSecLevel").closest('.form-group').removeClass('has-error');
	$("#modifyApproverSecLevel").closest('.form-group').removeClass("has-success");
	$("#modifyStatus1").closest('.form-group').removeClass('has-error');
	$("#modifyStatus1").closest('.form-group').removeClass("has-success");
	$("#modifyStatus").closest('.form-group').removeClass('has-error');
	$("#modifyStatus").closest('.form-group').removeClass("has-success");
	
	document.getElementById("modifyRole").value = '';
	document.getElementById("modifyDept").value = '0';
	document.getElementById("modifyletterSecLevel").value = '0';
	document.getElementById("modifyApproverSecLevel").value = '0';
	
	$("#role1").prop("checked", false);
	$("#role2").prop("checked", false);
	$("#role3").prop("checked", false);
	$("#role4").prop("checked", false);
	$("#modifyStatus").prop("checked", false);
	$("#modifyStatus1").prop("checked", false);
	
	$("#modifyApproverSecLevel").prop("disabled", false);
	$("#modifyApproverSecLevel").attr("title", "");
	$("#approverData").hide();
	$("#modifyDeptDiv").show();
	$("#modifyletterSecurityDiv").show();
	$("#modifySecurityDiv").show();
	if(approverLevel == 0)
		approverLevel = "";
};

function findApprover(){
	var deptname=document.getElementById("deptName").value;
	console.log("inside findApprover method");
	console.log(deptname);
	var roleList = '<option value="0">--- Select ---</option>';
	var value = ($("input[name='role']:checked").val());
	
	if($("#deptName").closest('.form-group').hasClass('has-error') && deptname != "0"){
		 $("#deptName").closest('.form-group').removeClass('has-error');
			$("#deptName").closest('.form-group').addClass("has-success");
	 }
if(value != undefined){
	if((value.substr(1, value.length) == "Approver")  && (deptname != "0")){	
		var ctxPath = getContextPath();
		var urlString = ctxPath + '/findApprover';
		
	$.ajax({
		url : urlString,
		type : 'get',
		data : {
			deptname : deptname
		},
		async : false,
		cache : false,
		success : function(result) {
			
			if(result.length != 0){
			result.forEach(function(name) {
				roleList += '<option value="'
						+ name + '">' + name + '</option>';
			});
			$("#approverSecLevel").html(roleList);
			
			$("#approverSecLevel").prop("disabled", false);
			$("#approverSecLevel").prop("title", "");
			}
			else{
				$("#approverSecLevel").html(roleList);
				$("#approverSecLevel").value = '0';
				$("#approverSecLevel").prop("disabled", true);
				$("#approverSecLevel").attr("title", "approver not available");
			}
		},
		error : function(result) {
		 
		}
	});
}
	else{
		roleList = '<option value="0">--- Select ---</option>';
		$("#approverSecLevel").html(roleList);
		}
}
	
	
}

function checkDept(){
	if($("#deptName option:selected").text() == "--- Select ---"){
		$("#approverSecLevel").attr("disabled", "disabled");
		$("#approverSecLevel").attr("title", "please select department first");
	}
	
	if($("#modifyDept option:selected").text() == "--- Select ---"){
		$("#modifyApproverSecLevel").attr("disabled", "disabled");
		$("#modifyApproverSecLevel").attr("title", "please select department first");
	}
}

function findApproverModify(){
	var deptname=document.getElementById("modifyDept").value;
	var value = ($("input[name='modifyRole']:checked").val());
	console.log("inside findApprover method");
	
	if($("#modifyDept").closest('.form-group').hasClass('has-error') && deptname != "0"){
		 $("#modifyDept").closest('.form-group').removeClass('has-error');
			$("#modifyDept").closest('.form-group').addClass("has-success");
	 }
	
	console.log(deptname);
	var roleList="";
	if(value != undefined){
	if( (deptname != "0") && (value.substr(1, value.length) == "Approver")){
		var ctxPath = getContextPath();
		var urlString = ctxPath + '/findApprover';
		
	$.ajax({
		url : urlString,
		type : 'get',
		data : {
			deptname : deptname
		},
		async : false,
		cache : false,
		success : function(result) {
			if(result.length != 0){
			
			roleList = '<option value="0">--- Select ---</option>';
			result.forEach(function(name) {
				roleList += '<option value="'
						+ name + '">' + name + '</option>';
			});
			$("#modifyApproverSecLevel").html(roleList);
			
			$("#modifyApproverSecLevel").prop("disabled", false);
			$("#modifyApproverSecLevel").prop("title", "");
			document.getElementById("modifyApproverSecLevel").value = '0';
			
			}
			else{
				if(approverLevel != 0){
					roles = '<option value="0">--- Select ---</option>';
					roles += '<option value="'
						+ approverLevel + '">' + approverLevel + '</option>';
					$("#modifyApproverSecLevel").html(roles);
					$("#modifyApproverSecLevel").prop("disabled", false);
					$("#modifyApproverSecLevel").attr("title", " ");
				}
				else{
				document.getElementById("modifyApproverSecLevel").value = '0';
				$("#modifyApproverSecLevel").prop("disabled", true);
				$("#modifyApproverSecLevel").attr("title", "approver not available");
				}
			}
		},
		error : function(result) {
		 
		}
	});
}
		else{
			roleList = '<option value="0">--- Select ---</option>';
			$("#modifyApproverSecLevel").html(roleList);
		}
}
	}

function removeError1(val){
	debugger;
	console.log(val);
	var letterLevel = document.getElementById(val).value;
	console.log(letterLevel);
	if($("#"+val).closest('.form-group').hasClass('has-error') && (letterLevel != "0" || letterLevel != undefined)){
		 $("#"+val).closest('.form-group').removeClass('has-error');
			$("#"+val).closest('.form-group').addClass("has-success");
	 }
}

function removeError(value){
	console.log(value);
		 if($("#"+value).closest('.form-group').hasClass('has-error')){
			 $("#"+value).closest('.form-group').removeClass('has-error');
				$("#"+value).closest('.form-group').addClass("has-success");
		 }
		 
		 if($("#"+value+"Error").text().length != 0){
			 document.getElementById(value+"Error").value = '';
			 $("#"+value+"Error").hide();
		 }
}