var list_highlight_page=0;
function list_removehighlight(){
	
		for(var i=1;i<=9;i++){
			$("#active_"+i).removeClass("active");
		}
		$("#active_"+list_highlight_page).addClass("active");
}