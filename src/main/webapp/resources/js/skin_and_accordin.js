$(function() {		    
		  // Handler for .ready() called.
		  var s = $(window).height();
		  
		  $(window).resize(function() {
			  if ($(window).width() < 1000) {
				  $('.content-wrapper').css("min-height", s );
					  $('.content').css("min-height", s);
			  }
			});
		  
		  
		 // $('[data-toggle="popover"]').popover(); 
		 $('[data-toggle="popover"]').popover({ html : true });
		  $('.content-wrapper').css("min-height", s );
		  $('.content').css("min-height", s);
		  
		  
		  // for wizards
		
		$(".container .themes>span").click(function(e) {
			alert('d');
			$(".container .themes>span").removeClass("selectedx");
			$(this).addClass("selectedx");
            $(".stepsForm").removeClass().addClass("stepsForm");
			$(".stepsForm").addClass("sf-theme-"+$(this).attr("data-value"));
        });
		
		
		  var theme_dark = "control-sidebar control-sidebar-dark";
		  var theme_light = "control-sidebar control-sidebar-dark";
		  
		  $("#theme_default").click(function(){
				$("body").removeClass("skin-black-light");
				$("body").removeClass("skin-yellow-light");
				$("body").addClass("skin-blue");
				
				if($("#control_pane").className="")
				$("#control_pane").removeClass("control-sidebar control-sidebar-light");
				$("#control_pane").addClass("control-sidebar control-sidebar-dark");
		  });
		  $("#theme_black-light").click(function(){
				$("body").removeClass("skin-blue");
				$("body").removeClass("skin-yellow-light");
				$("body").addClass("skin-black-light");
				$("#control_pane").removeClass("control-sidebar control-sidebar-dark");
				$("#control_pane").addClass("control-sidebar control-sidebar-light");
		  });
		  $("#theme_wraming").click(function(){
				$("body").removeClass("skin-blue");
				$("body").removeClass("skin-black-light");
				$("body").addClass("skin-yellow-light");
				$("#control_pane").removeClass("control-sidebar control-sidebar-dark");
				$("#control_pane").addClass("control-sidebar control-sidebar-light");				
		  });		  
		   $("#theme_green").click(function(){
				$("body").removeClass("skin-blue");
				$("body").removeClass("skin-black-light");
				$("body").removeClass("skin-yellow-light");
				$("body").addClass("skin-green");
				$("#control_pane").removeClass("control-sidebar control-sidebar-light");
				$("#control_pane").addClass("control-sidebar control-sidebar-dark");				
		  });
		  
		  $('#preloader').on('load', function () {
			$(this).fadeIn();
		});	
		
				
		});
		
		
		
		function setcookie( name, value, expiry, path ) {
		  if(expiry) {
			var now = new Date();
			now.setTime( now.getTime() + Math.round(86400000*expiry) );
			expiry = now.toGMTString();
		  }
		  expiry = expiry ? '; expires=' + expiry : '';
		  path = path ?'; path=' + path:'';
		  document.cookie = name + '=' + escape(value) + expiry + path;
		}
		function getcookie( name ) {
		  var cookie = document.cookie;
		  if( cookie.indexOf( name + '=' ) < 0 ) { return null; }
		  var start = cookie.indexOf( name + '=' ) + name.length + 1;
		  var finish = cookie.substring( start, cookie.length );
		  finish = ( finish.indexOf( ';' ) < 0 ) ? cookie.length : start + finish.indexOf( ';' );
		  return unescape( cookie.substring( start, finish ) );
		}
		function setsheet( name ) {
		  var l = document.getElementsByTagName( 'link' ), i, o, t;
		  for( i=0; (o = l[i]); i++ ) {
			if( 'alternate stylesheet'===o.getAttribute( 'rel' ) && ( t = o.getAttribute( 'title' ) ) ) {
			  o.disabled = true; // browser bug: will not enable on next line otherwise
			  o.disabled = ( t !== name );
		} } }
		function setstyle( list ) {
		 var name;
		 if( ( name = list.options[ list.selectedIndex ].value ) ) {
		  setcookie( 'style', name, 90, '/' );
		  setsheet( name );
		  document.body.className = name + " sidebar";		
		  if(name == 'skin-black')
		  {
			document.getElementById('panel_topcolor').className = 'box box-default';		
		  }
		  else if(name == 'skin-Blue')
		  {
			document.getElementById('panel_topcolor').className = 'box box-info';		
		  }
		   else if(name == 'skin-purple')
		  {
			document.getElementById('panel_topcolor').className = 'box box-laven';		
		  }
		  else if(name == 'skin-red')
		  {			
			document.getElementById('panel_topcolor').className = 'box box-purple';		
		  }
		  else if(name == 'skin-yellow')
		  {			
			document.getElementById('panel_topcolor').className = 'box box-yellow';		
		  }
		  else if(name == 'skin-green')
		  {			
			document.getElementById('panel_topcolor').className = 'box box-success';		
		  }
		  
		  else{
			document.getElementById('panel_topcolor').className = 'box box-info';
		  }
		  
		  
		  
		  
		  
		} }
		// do this before the <body> opening tag and the user will see no flickering
		if( ( name = getcookie( 'style' ) ) ) {
		  setsheet( name );
		}
		/* Accordion & Toggle */
	
	jQuery(".accordion").each(function(){
		if (jQuery(this).hasClass("toggle-accordion")) {
			jQuery(this).find(".accordion-toggle-open").addClass("active");
			jQuery(this).find(".accordion-toggle-open").next(".accordion-inner").show();
		}else {
			var what_active = jQuery(this).attr("what-active");
			if (what_active != undefined) {
				jQuery(this).find(".accordion-inner:nth-child("+what_active * 2+")").show();
				jQuery(this).find(".accordion-inner:nth-child("+what_active * 2+")").prev().addClass("active");
			}
		}
	});
	
	jQuery(".accordion .accordion-title").each(function(){
		//i_color
		var i_color = jQuery(this).parent().attr("i_color");
		jQuery(this).parent().find(".accordion-title i").css({"color":i_color});
		//i_click
		var i_click = jQuery(this).parent().attr("i_click");
		jQuery(this).parent().find(".accordion-title.active i").css({"color":i_click});
	
		jQuery(this).click(function() {
			if (jQuery(this).parent().hasClass("toggle-accordion")) {
				jQuery(this).parent().find("li:first .accordion-title").addClass("active");
				jQuery(this).toggleClass("active");
				jQuery(this).next(".accordion-inner").slideToggle();
				
			}else {
				if (jQuery(this).next().is(":hidden")) {
					jQuery(this).parent().find(".accordion-title").removeClass("active").next().slideUp(200);
					jQuery(this).toggleClass("active").next().slideDown(200);
				}
			}
			if (jQuery(this).parent().hasClass("acc-style-4")) {
				jQuery(this).parent().find(".accordion-title.active").next().css({"border-bottom":"1px solid #DEDEDE"});
			}
			//i_color
			jQuery(this).parent().find(".accordion-title i").css({"color":i_color});
			//i_click
			jQuery(this).parent().find(".accordion-title.active i").css({"color":i_click});
			return false;
		});
		function toggleChevron(e) {
			$(e.target)
				.prev('.panel-heading')
				.find("i.indicator")
				.toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
		}
		$('#accordion').on('hidden.bs.collapse', toggleChevron);
		$('#accordion').on('shown.bs.collapse', toggleChevron);
	     
	});