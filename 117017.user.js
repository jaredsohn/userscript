/*
	??????????? ??????? ??????????????? ?? ??????? "??? ????", 
	????? ?? ????? ??????? ??????????????? ?? ??????????? 
	????????????? ??????? ???????????? ????????, ? ??? ????? 
	??????????? ??????? ??? ???? ??????? ?? ??? ?????????????, 
	??? ????????????? ??? ? ??????????????? ?????.
	??????????? ??????? ????????? ?????????, ????????? ?? ????????????.
*/
//
// ==UserScript==
// @author				alexg
// @name 				SpoilerViewer for NNTT.ORG 
// @version				3.1
// @include 			http://nntt.org/*
// @include 			http://www.nntt.org/*
// ==/UserScript==
//
(function(){  
   if (document.addEventListener) 
      document.addEventListener("DOMContentLoaded", function(){
		if(document.body){		
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.charset = 'utf-8';
			var text = new String(function(){ 
				$(document).ready(function(){
					var in_time				= 50;		// milliseconds
					var out_time			= 100;	// milliseconds
					var pause_for_popup	= 200;	// milliseconds
							
					var spv = document.createElement("div");
					$(spv).attr("id", "spoiler_viewer");
					$(spv).css({'display':'none', 
									'position':'absolute', 
									'border':'solid 1px #C3CBD1', 
									'background-color':'#ffffff',
									'padding':'10px',
									'overflow':'hidden',
									'margin':'15px 0px 0px 15px',
									'max-width':screen.width*0.6+'px',
									'max-height':screen.height*0.4+'px' });
						
					$(document.body).append(spv);
					
					var spoiler_prv_elem_html;		
					var spoiler_prv_pageX;
					var spoiler_prv_pageY;
					var spoiler_prv_timer;
					
					$("div.spoiler-head")
						.bind("mouseleave", function(){
							clearTimeout(spoiler_prv_timer);
							if($(this).is(":animated"))
								$(this).stop(true);
							$("#spoiler_viewer").stop(true, true)
													  .fadeOut(out_time);
						})
						.bind("click", function(){ 
							if($(this).is(":animated"))
								$(this).stop(true);
							$("#spoiler_viewer").stop(true, true)
													  .fadeOut(out_time);
						})			
						.bind("mouseover", function(e){ 
							if($(this).next().is("div.spoiler-body:hidden")){
								spoiler_prv_elem_html = $(this).next('.spoiler-body').html();
								spoiler_prv_pageX = e.pageX;
								spoiler_prv_pageY = e.pageY;
								spoiler_prv_timer = setTimeout (function(){
									$("#spoiler_viewer").html(spoiler_prv_elem_html)
									$("#spoiler_viewer")
										.css({ 'left':spoiler_prv_pageX+'px','top':spoiler_prv_pageY+'px' })
										.children("img")
											.css({ 'max-width':screen.width*0.3+'px','max-height':screen.height*0.3+'px' })
										.end() 			
										.children(".spoiler-foot:last").remove()
										.end()
										.fadeIn(in_time);
								}, pause_for_popup);	
							}										 
						});
				});
			});
     
			var term_in  = text.indexOf("{");
			var term_out = text.lastIndexOf('}');
      			
			script.appendChild (document.createTextNode("/* <![CDATA[ */" + text.substring(term_in + 1, term_out) + "/* ]]> */"));
			document.getElementsByTagName('head')[0].appendChild(script); 
		}  
	}, false);
})();