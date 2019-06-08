// JavaScript Document
$(function()
		   {

 $('#advsearchclick').click(function() {
		$('.searchpop').toggle();
		return false;
	});
	$('#hidesearchpopcancel').on('click',function() {
		$('.searchpop').hide();
		return false;
	});
	$('#hidesearchpop').click(function() {
		$('.searchpop').hide();
		return false;
	});
		});