$(document).ready(function() {

	/* it will clear modal form data when it is getting hide */
	$("#exampleModalCenter").on('hidden.bs.modal', function() {
		$("#mydialog").text("");
	});
});

$(document).on(
		'blur keyup',
		'.form-group.has-error',
		function() {
			var obj = $(this).find('input[type=text]')[0];
			if ($(obj).val() != "select" && $(obj).val() != ""
					&& $(obj).val() != null && $(obj).val() != "undefined") {
				$(this).removeClass("has-error");
				$(this).addClass("has-success");
			}

		});

$(document).on('blur keyup', '.textarea-size.result_txtarea1', function() {
	//debugger;
	if ($(this).val().trim() == "") {
		$(this).closest('.col-md-12').addClass("has-error");
		$(this).closest('.col-md-12').removeClass("has-success");
	} else {
		$(this).closest('.col-md-12').removeClass("has-error");
		$(this).closest('.col-md-12').addClass("has-success");
	}

});
$(document).on(
		'mouseup',
		'.form-group.has-error',
		function() {
			var obj = $(this).find("option:selected")[0];
			if ($(obj).val() != "select" && $(obj).val() != ""
					&& $(obj).val() != null && $(obj).val() != "0") {
				$(this).removeClass("has-error");
				$(this).addClass("has-success");
			}
		});

$(document).on('keyup', '#searchTable', function() {
	var value = $(this).val().toLowerCase();
	$("tbody tr").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});
})
$(document).on('click', 'button.testRegister,input[type=submit],a.loadingTest',
		function() {
			$('.loading-overlay').fadeIn('fast'); 
			//$('.preloader-icon').fadeIn('fast');
		});

$(document).on(
		'keydown keyup',
		'.require',
		function(event) {
			var yourInput = $(this).val();
			res = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
			var isSplChar = res.test(yourInput);
			if (isSplChar) {
				var no_spl_char = yourInput.replace(
						/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
				$(this).val(no_spl_char);
			}
		});

function getDocParameters() {

	var serviceValue = document.getElementById("dataId").value;
	var ctxPath = getContextPath();
	var urlString = ctxPath + '/parameters';

	$
			.ajax({
				url : urlString,
				type : 'get',
				data : {
					service : serviceValue
				},
				async : false,
				cache : false,
				success : function(result) {

					text = $('.note-editable').html();
					for (var count = 0; count < result.length; count++) {
						var Parameters = result[count]["service_parameters"]
								.toString();
						var value = result[count]["value"].toString();
						$('.note-editable').each(
								function() {

									var str1 = "${";
									var str2 = "}";
									var value = str1.concat(Parameters).concat(
											str2);

									text = text.replace(new RegExp(Parameters,
											'g'), value);

								});

					}
					if (text != "") {

						$("#letterData").val(text);

					} else {

						text = "No data found on canvas!!!!!!!!!!";

						document.getElementById("letterFormData").innerHTML = text;

					}

				}
			});
}

var count = 0;
function validateLetterForm(countValue) {
	if (countValue == false) {
		count = count + 1;
	}
	var flag = true;
	var radio_val = true;
	var regx = "^[a-zA-Z0-9]+$";
	for (var i = 0; i < $(".require1").length; i++) {
		console.log($("#approved").is(':checked') + "                  "
				+ $("#updates").is(':checked'));
		var inputTag = $(".require1")[i];

		if ($(inputTag).attr('type') != 'radio' && countValue == false) {
			if ($(inputTag).val() == "" || $(inputTag).val() == null) {
				$(inputTag).closest('.form-group').addClass('has-error');
				$(inputTag).closest('.form-group').removeClass("has-success");
				flag = false;
			} else {
				$(inputTag).closest('.form-group').addClass('has-success');
				$(inputTag).closest('.form-group').removeClass("has-error");
			}
		}
		if($("#letterName").val().includes(".") || $("#letterName").val().includes("_") || $("#letterName").val().includes("\'") || $("#letterName").val().replace(/[^A-Z0-9]/ig, "") == ""){
			$("#letterName").closest('.form-group').addClass('has-error');
			$("#letterName").closest('.form-group').removeClass("has-success");
			flag = false;
		}
	}

	if ((countValue == false && $("#approved").val() != undefined)
			|| (count > 0 && countValue == true)) {
		count = count++;
		if ($("#approved").is(':checked')) {
			console.log("i am >>>>>>>>>>>>>>>>>>>" + $(inputTag).attr('type')
					+ "    " + $("#approved").is(':checked'));
			$("#approved").closest('.radio').removeClass('has-error');
			$("#approved").closest('.radio').addClass("has-success");
			$("#updates").closest('.radio').removeClass('has-error');
			$("#updates").closest('.radio').removeClass("has-success");
		} else if ($("#updates").is(':checked')) {
			console.log("i am iside <<<<<<<<<<<<<<<<<"
					+ $(inputTag).attr('type') + "    "
					+ $("#updates").is(':checked'));
			$("#updates").closest('.radio').removeClass('has-error');
			$("#updates").closest('.radio').addClass("has-success");
			$("#approved").closest('.radio').removeClass('has-error');
			$("#approved").closest('.radio').removeClass("has-success");
		} else if (!($("#approved").is(':checked') && $("#updates").is(
				':checked'))) {

			$("#approved").closest('.radio').addClass("has-error");
			$("#approved").closest('.radio').removeClass("has-success");
			$("#updates").closest('.radio').addClass("has-error");
			$("#updates").closest('.radio').removeClass("has-success");
			flag = false;
		}

		var id1 = $(this).attr('id');
		console.log(id1);
		if ($("#approved").is(':checked') || $("#updates").is(':checked')) {
			if (!$("#approved").prop("checked")) {
				if ($("#updates").prop("checked")) {
					$("#approvelNoChanges1").css('color', '#00a65a');
					$("#approvelNoChanges").css('color', '#333');
				} else {
					$(this).closest('.radio').removeClass('has-error');
					$(this).closest('.radio').addClass("has-success");
					$("#approvelNoChanges").css('color', '#333');
				}
				$(this).closest('.radio').removeClass('has-error');
				$(this).closest('.radio').addClass("has-success");

			} else {
				if ($("#approved").prop("checked")) {
					$("#approvelNoChanges").css('color', '#00a65a');
					$("#approvelNoChanges1").css('color', '#333');
				} else {
					$(this).closest('.radio').removeClass('has-error');
					$(this).closest('.radio').addClass("has-success");
					$("#approvelNoChanges1").css('color', '#00a65a');
				}

			}
		}
	}

	if (flag && countValue == false) {
		$("#saveForm").prop('disabled', true);
	}
	fadeOutAfterValidation();

	return flag;
}

function validateLetterId(e) {
	var k = e.keyCode;
	return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k >= 48 && k <= 57));
}

function getActiveValue(activeLetterId) {
	$('[data-toggle="tooltip"]').tooltip("hide");
	var ctxPath = getContextPath();
	var urlString = ctxPath + '/makingInactiveTemplate';
	var selectLtrIdvalue = activeLetterId;

	bootbox
			.prompt({
				title : "Provide  a reason  for making it into Inactive ",
				maxlength : 60,
				placeholder : "Enter Description",
				callback : function(result) {
					if (typeof result !== undefined && result !== null
							&& result.trim() != "") {
						$.ajax({
							url : urlString,
							type : 'get',
							data : {
								activeLetterId : selectLtrIdvalue,
								reasonofMakingInactive : result
							},
							dataType : "json",
							async : false,
							cache : false,
							success : function(result) {

							},
							error : function(result) {

							}
						});
						$('.bootbox-form').removeClass('has-error');
						setTimeout(function() {
							location.reload();
						}, 500);

					} else if (result == null) {
						$('.bootbox-form').removeClass('has-error');
						$('.bootbox-prompt').modal('hide');
						$("#" + letterVersionId).prop('checked', false);
					} else {
						$('.bootbox-form').addClass('has-error');
						return false;
					}
				}
			});

}

function getInactiveValue(activeLetterId) {
	$.ajax({
		url : '${contextPath}/makingActiveTemplate',
		type : 'get',
		data : {
			activeLetterId : selectLtrIdvalue
		},
		async : false,
		cache : false,
		success : function(result) {

		},
		error : function(result) {

		}
	});

}
var variableList = [];
function Jsonfieldfuntion() {
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
	var finalJson = JSON.stringify(finalList);
	$("#finalJson").val(finalJson);

}

function AlertPrevWord(tempid, service) {
	var text = tempid;
	var caretPos = GetCaretPosition(text);
	var caretPosval = GetCaretPositionEnd(text);
	var word = ReturnWord(text, caretPos);
	var afterWord = ReturnAfterWord(text, caretPosval);
	if (word != null) {
	}

	if (afterWord != null) {
	}

}

function GetCaretPosition(ctrl) {
	var CaretPos = 0;
	if (document.selection) {
		ctrl.focus();
		var Sel = document.selection.createRange();
		Sel.moveStart('character', -ctrl.value.length);
		CaretPos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;
	return (CaretPos);
}

function GetCaretPositionEnd(ctrl) {
	var CaretPos = 0; // IE Support
	if (document.selection) {
		ctrl.focus();
		var Sel = document.selection.createRange();
		Sel.moveEnd('character', -ctrl.value.length);
		CaretPos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;
	return (CaretPos);
}

function ReturnWord(text, caretPos) {
	var index = text.indexOf(caretPos);
	var preText = text.substring(0, caretPos);
	if (preText.indexOf(" ") > 0) {
		var words = preText.split(" ");
		return words[words.length - 1]; // return last word
	} else {
		return preText;
	}
}

function ReturnAfterWord(text, caretPos) {
	var index = text.indexOf(caretPos);
	var text = text.substring(caretPos);
	if (text != null) {
		var words = text.indexOf(' ');
		if (words != -1) {
			return text.substring(0, words); // return last word
		} else {
			return text;
		}

	} else {
		return text;
	}
}
function fadeOutAfterValidation() {
	setTimeout(function() {
		$('.loading-overlay').fadeOut('fast');
	}, 1000);
}
function removeNumbers(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return true;

	return false;
}

function makeCondInactive(activeLetterId) {
	$('[data-toggle="tooltip"]').tooltip("hide");
	
	var ctxPath = getContextPath();
	var urlString = ctxPath + '/makingInactiveCondStmt';
	var selectLtrIdvalue = activeLetterId;

	bootbox
			.prompt({
				title : "Provide  a reason  for making it into Inactive ",
				maxlength : 60,
				placeholder : "Enter Description",
				callback : function(result) {
					if (typeof result !== undefined && result !== null
							&& result.trim() != "") {
						$.ajax({
							url : urlString,
							type : 'get',
							data : {
								activeLetterId : selectLtrIdvalue,
								reasonofMakingInactive : result
							},
							dataType : "json",
							async : false,
							cache : false,
							success : function(result) {

							},
							error : function(result) {

							}
						});
						$('.bootbox-form').removeClass('has-error');
						setTimeout(function() {
							location.reload();
						}, 500);

					} else if (result == null) {
						$('.bootbox-form').removeClass('has-error');
						$('.bootbox-prompt').modal('hide');
						$("#" + letterVersionId).prop('checked', false);
					} else {
						$('.bootbox-form').addClass('has-error');
						return false;
					}
				}
			});

}