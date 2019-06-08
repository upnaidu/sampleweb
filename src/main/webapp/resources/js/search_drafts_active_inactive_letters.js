var contextPath = "";
var loginUser = "";
var defaultDraftLettersTableBody = "";
var defaultActiveLettersTableBody = "";
var defaultInactiveLettersTableBody = "";
var role = "";

$(function() {
	contextPath = $("#contextPath").val();
	$('#searchResultsCount').hide();
	loginUser = $("#loginUser").val();
	role = $("#userPrincipal").val();
	if (document.getElementById("draftLettersBody") !== null)
		defaultDraftLettersTableBody = defaultDraftLettersTableBody
				+ document.getElementById("draftLettersBody").innerHTML;
	if (document.getElementById("activeLettersBody") !== null)
		defaultActiveLettersTableBody = defaultActiveLettersTableBody
				+ document.getElementById("activeLettersBody").innerHTML;
	if (document.getElementById("inactiveLettersBody") !== null)
		defaultInactiveLettersTableBody = defaultInactiveLettersTableBody
				+ document.getElementById("inactiveLettersBody").innerHTML;

});

function delay(callback, ms) {
	var timer = 0;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function() {
			callback.apply(context, args);
		}, ms || 0);
	};
}

$('#searchDraft')
		.keyup(
				delay(
						function(e) {

							if ($("#searchDraft").val().length != 0) {

								var yourInput = $(this).val();
								res = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
								var isSplChar = res.test(yourInput);

								if (isSplChar) {
									$("#draftLettersPagination").hide();
									$("#draftLettersBody").html("");
									$('#searchResultsCount').show();
									$('#searchResultsCount').html(
											"0 results found");
								}

								else {
									$("#draftLettersPagination").hide();
									$("#draftLettersBody").html("");
									var tbody = "";

									$
											.ajax({
												type : "GET",
												url : '/letterwriter/searchLetters?flag=false&queryString='
														+ $("#searchDraft")
																.val(),
												success : function(objects) {
													$('#searchResultsCount').show();
												
													if(objects.length == 1)															
														$('#searchResultsCount').html("1 result found");
													else $('#searchResultsCount').html(objects.length + " results found");

													if (objects.length > 0) {
														$
																.each(
																		objects,
																		function(
																				index,
																				value) {

																			tbody = tbody
																					+ "<tr><td>"
																					+ value.letterVersionId
																					+ "</td>"
																					+ "<td>"
																					+ value.letterName
																					+ "</td>"
																					+ "<td>"
																					+ value.letterId
																					+ "</td>"
																					+ "<td>"
																					+ value.letterAuthor
																					+ "</td>"
																					+ "<td>"
																					+ value.letterDescription
																					+ "</td>"
																					+ "<td align='left' class='dateInUSA'>"
																					+ formatDate(value.letterUpdatedDate)
																					+ "</td>"
																					+ approvalStartValidation(value)
																					+ "<td>"
																					+ value.approvealStaus
																					+ "</td>"
																					+ "<td>"
																					+ value.approverName
																					+ "</td>"
																					+ "<td>"
																					+ templateUpdateURLValidation(value)
																					+ "</td>"
																					+ activateButtonValidation(value)
																					+ "</tr>"

																		});

														$("#draftLettersBody")
																.html(tbody);
													}
												}
											});
								}
							} else {
								$("#draftLettersBody").html(
										defaultDraftLettersTableBody);
								$("#draftLettersPagination").show();
								$('#searchResultsCount').hide();
							}
						}, 1000));

$('#searchID')
		.keyup(
				delay(
						function(e) {
							if ($("#searchID").val().length != 0) {

								var yourInput = $(this).val();
								res = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
								var isSplChar = res.test(yourInput);

								if (isSplChar) {
									$("#activeLettersPagination").hide();
									$("#activeLettersBody").html("");
									$('#searchResultsCount').show();
									$('#searchResultsCount').html(
											"0 results found");
								}

								else {
									$("#activeLettersPagination").hide();
									$("#activeLettersBody").html("");
									var tbody = "";

									$
											.ajax({
												type : "GET",
												url : '/letterwriter/searchLetters?flag=true&queryString='
														+ $("#searchID").val(),
												success : function(data) {
													$('#searchResultsCount').show();
													
													if(data.length == 1)															
														$('#searchResultsCount').html("1 result found");
													else $('#searchResultsCount').html(data.length + " results found");

													if (data.length > 0) {
														$
																.each(
																		data,
																		function(
																				index,
																				value) {
																			tbody = tbody
																					+ "<tr><td>"
																					+ value.letterVersionId
																					+ "</td>"
																					+ "<td>"
																					+ value.letterName
																					+ "</td>"
																					+ "<td>"
																					+ value.letterId
																					+ "</td>"
																					+ "<td>"
																					+ value.level
																					+ "</td>"
																					+ "<td>"
																					+ value.letterAuthor
																					+ "</td>"
																					+ "<td>"
																					+ value.letterDescription
																					+ "</td>"
																					+ "<td align='left' class='dateInUSA'>"
																					+ formatDate(value.letterUpdatedDate)
																					+ "</td>"
																					+ inactiveButtonDisplayValidation(value)
																					+ "<td> <a type='button' target='_blank' href='downloadActivePdf?ltrIdValue="
																					+ value.letterVersionId
																					+ '&letterVersion='
																					+ value.activeLetterId
																					+ "'class='btn loading btn-size-border' title='Preview' data-toggle='tooltip' ><i class='fas fa-file fa-lg'></i></td>"
																					+ "</tr>"

																		});

														$("#activeLettersBody")
																.html(tbody);
													}
												}
											});
								}
							} else {
								$("#activeLettersBody").html(
										defaultActiveLettersTableBody);
								$("#activeLettersPagination").show();
								$('#searchResultsCount').hide();
							}
						}, 1000));

$('#searchInactiveID')
		.keyup(
				delay(
						function(e) {

							if ($("#searchInactiveID").val().length != 0) {

								var yourInput = $(this).val();
								res = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
								var isSplChar = res.test(yourInput);

								if (isSplChar) {
									$("#inactiveLettersPagination").hide();
									$("#inactiveLettersBody").html("");
									$('#searchResultsCount').show();
									$('#searchResultsCount').html(
											"0 results found");
								}

								else {
									$("#inactiveLettersPagination").hide();
									$("#inactiveLettersBody").html("");
									var tbody = "";

									$
											.ajax({
												type : "GET",
												url : '/letterwriter/searchInactiveLetters?queryString='
														+ $("#searchInactiveID")
																.val(),
												success : function(data) {
													$('#searchResultsCount')
															.show();

													if(data.length == 1)															
														$('#searchResultsCount').html("1 result found");
													else $('#searchResultsCount').html(data.length + " results found");

													if (data.length > 0) {
														$
																.each(
																		data,
																		function(
																				index,
																				value) {
																			tbody = tbody
																					+ "<tr><td>"
																					+ value.inactiveVersionId
																					+ "</td>"
																					+ "<td>"
																					+ value.letterName
																					+ "</td>"
																					+ "<td>"
																					+ value.letterUpdatedId
																					+ "</td>"
																					+ "<td>"
																					+ value.level
																					+ "</td>"
																					+ "<td>"
																					+ value.letterAuthor
																					+ "</td>"
																					+ "<td>"
																					+ value.letterDescription
																					+ "</td>"
																					+ "<td  align='left' class='dateInUSAFmt'>"
																					+ formatDate(value.letterUpdatedDate)
																					+ "</td>"
																					+ "<td> <a type='button' target='_blank' href='downloadInactivePdf?ltrIdValue="
																					+ value.inactiveVersionId
																					+ "'class='btn loading btn-size-border' title='Preview' data-toggle='tooltip' ><i class='fas fa-file fa-lg'></i></td>"
																					+ "</tr>"
																		});
														$(
																"#inactiveLettersBody")
																.html(tbody);
													}

												}
											});
								}
							} else {
								$("#inactiveLettersBody").html(

								defaultInactiveLettersTableBody);
								$("#inactiveLettersPagination").show();
								$('#searchResultsCount').hide();
							}
						}, 1000));

function formatDate(date) {
	var d = new Date(date), month = '' + (d.getMonth() + 1), day = ''
			+ d.getDate(), year = d.getFullYear();

	return month + "/" + day + "/" + year + " " + d.getHours() + ":"
			+ d.getMinutes() + ":" + d.getSeconds();
}

// computation to enable or disable radio button
function approvalStartValidation(data) {
	var radioButtonCode = "";
	if (data.departOnOff == 0) {
		if (data.approvalStarted === "false") {
			if (data.noApprover === "true") {
				radioButtonCode = "<td>&nbsp;&nbsp;<input class='radio_loading' type='radio' id="
						+ data.activeLetterId
						+ " name= 'letterActive' title= 'Click to start approval'"
						+ "onclick='noApprover("
						+ data.activeLetterId
						+ ")'></td> ";
			} else {
				radioButtonCode = "<td>&nbsp;&nbsp;<input class='radio_loading' type='radio' id="
						+ data.activeLetterId
						+ " name = 'letterActive' title = 'Click to start approval' "
						+ "onclick = 'startApproval("
						+ data.activeLetterId
						+ ")'></td>";
			}
		} else {
			if (data.noApprover === "false") {
				radioButtonCode = "<td>&nbsp;&nbsp;<input type='radio' disabled='disabled' name='letterActive'></td>";
			} else {
				radioButtonCode = " <td>&nbsp;&nbsp;<input type='radio' disabled='disabled' name='letterActive'></td>";
			}
		}

	} else
		radioButtonCode = "<td>&nbsp;&nbsp;<input type='radio' disabled='disabled' name='letterActive'></td>";

	return radioButtonCode;
}

// computation for update letter url
function templateUpdateURLValidation(data) {
	var upadteURLCode = "";

	if (role === 'ROLE_ADMIN' || role === 'ROLE_LIBRARIAN') {
		if (data.approvalStarted === 'true')
			upadteURLCode = "<a type='button' href='#' class='disable-link btn btn-disable loading btn-size-border' title='Update' data-toggle='tooltip' ><i class='fas fa-edit fa-lg'></i></a>";
		else
			upadteURLCode = "<a href='" + contextPath
					+ "/getDataByLetterId?activeLetterId="
					+ data.activeLetterId + "'type='button' class='btn loading btn-size-border' title='Update' data-toggle='tooltip' ><i class='fas fa-edit fa-lg'></i></a>";
	} else if (role === 'ROLE_APPROVER') {
		if (data.approvalStarted === 'true') {
			if (loginUser === data.currentApprover) {
				if (data.departOnOff == 0) {
					if (data.approvealStaus !== 'Complete')
						upadteURLCode = "<a href='" + contextPath
								+ "/getDataByLetterId?activeLetterId="
								+ data.activeLetterId + "'type='button' class='btn loading btn-size-border' title='Update' data-toggle='tooltip' ><i class='fas fa-edit fa-lg'></i></a>";
					else
						upadteURLCode = "<a type='button' href='#' class='disable-link btn btn-disable loading btn-size-border ' title='Update' data-toggle='tooltip' ><i class='fas fa-edit fa-lg'></i></a>";
				} else
					upadteURLCode = "<a type='button' href='#' class='disable-link btn btn-disable loading btn-size-border' title='Update' data-toggle='tooltip' ><i class='fas fa-edit fa-lg'></i></a>";
			} else
				upadteURLCode = "<a type='button' href='#' class='disable-link btn btn-disable loading btn-size-border btn-size-border-disable' title='Update' data-toggle='tooltip' ><i class='fas fa-edit fa-lg'></i></a>";
		} else
			upadteURLCode = "<a type='button' href='#' class='disable-link btn btn-disable loading btn-size-border' title='Update' data-toggle='tooltip' ><i class='fas fa-edit'></i></a>";
	}

	return upadteURLCode;
}

// Activate button validation
function activateButtonValidation(data) {
	var activateButtonCode = "";

	if (data.departOnOff == 1) {
		if (role === 'ROLE_ADMIN' || role === 'ROLE_LIBRARIAN') {
			activateButtonCode = "<td>&nbsp;&nbsp;<input type='radio' name='makeActive' title='Click to make active' id='"
					+ data.activeLetterId
					+ "' onclick='makeTemplateActive("
					+ data.activeLetterId + ")'></td>";
		} else
			activateButtonCode = "<td>&nbsp;&nbsp;<input type='radio' disabled='disabled' name='makeActive'/></td>";
	}

	if (data.approvealStaus !== 'Complete') {
		if (data.departOnOff == 0)
			activateButtonCode = "<td>&nbsp;&nbsp;<input type='radio' disabled='disabled' name='makeActive' ></td>";
	} else {
		if (role === 'ROLE_ADMIN' || role === 'ROLE_LIBRARIAN') {
			activateButtonCode = "<td>&nbsp;&nbsp;<input type='radio' name='makeActive' title='Click to make active' id='"
					+ data.activeLetterId
					+ "' onclick='makeTemplateActive("
					+ data.activeLetterId + ")'/></td>";
		} else
			activateButtonCode = "<td>&nbsp;&nbsp;<input type='radio' disabled='disabled'name='makeActive'> </td>	";
	}
	return activateButtonCode;
}

function inactiveButtonDisplayValidation(data) {
	if (role === 'ROLE_ADMIN' || role === 'ROLE_LIBRARIAN')
		return "<td><input type='radio' name='letterIsActive' title='Click to make Inactive' id='"
				+ data.activeLetterId
				+ "' onclick='getActiveValue("
				+ data.activeLetterId + ")'></td>";
	else
		return "";
}