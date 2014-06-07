/*
	Программный продукт предоставляется по принипу "как есть", 
	автор не несёт никакой ответственности за последствия 
	использования данного программного продукта, в том числе 
	неполучение прибыли или иных доходов от его использования, 
	или использование его в противозаконных целях.
	Программный продукт полностью бесплатен, поддержки не предлагается.
*/
//
// ==UserScript==
// @author				alexg
// @name 				MenuOnTop for NNTT.ORG 
// @version				5.1
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
							
							$("object").attr("wmode", "opaque");	// попытка решить проблему с флэш

							// menu herstellen
							var menu 	= document.createElement("div");
							var menu_ex = document.createElement("tr");
							var td 		= document.createElement("td");
		
							$(menu).attr("id", "popup_menu");
							$(menu).css({'top':'0px','display':'none','position':'fixed','left':'0px','width':'100%',
											 'border':'none', 'background':'none', 'padding':'0','margin':'0'});
					
							$(td).attr("colSpan", "3"); 
							$(td).css("text-align", "center");
							$(td).html(	"<a href='./index.php'>Главная страница</a>" +
											" . " +
											"<a href='./ucp.php?i=main&mode=subscribed'>Подписки</a>" +
											" . " +
											"<a href='./ucp.php?i=main&mode=bookmarks'>Закладки</a>" +
											" · " +
											"<a href='./search.php?search_id=unreadposts'>Непрочитанные сообщения</a>" +
											" · " +
											"<a href='./search.php?search_id=newposts'>Новые сообщения</a>");
	
							$(document.body).append(menu);		
							$(menu).append($(".menubar2:first").clone(true));		// создаём клон	
							$(menu_ex).append(td);
							$(menu).find("tbody").append($(menu_ex));
						
/*							var img_url = $(".menubar2").css('background-image');
							var img 	= document.createElement("img");
							$(img).attr({ 'src':'http://www.nntt.org/styles/nnttModern/theme/images/cat_mini.jpg' })
							 		.css({ 'width':'100%', 'height':'100%' });
							
							var div 	= document.createElement("div");
							$(div).css({ 'z-index':100, 'position': 'absolute', 'top':'0px', 'left':'0px', 'background-image':"url('http://www.nntt.org/styles/nnttModern/theme/images/cat_mini.jpg')"});
							$(div).append(img);
							
							var div2 = document.createElement("div");
							$(div2).css({ 'background-image': 'url("http://www.nntt.org/styles/nnttModern/theme/images/cat_mini.jpg")' });
						
							$(".menubar2").wrapInner(div2);
							$(".menubar2").append(div);
						$(".menubar2").css({ 'background-image':'none' });
							*/
							$(menu).fadeOut(0);		// отобразим меню видимым, но скрытым
							$(menu).css("display", "true");
							
							$(window).mousemove(function(e) {
								if ($(window).scrollTop() > $(".menubar2:first").position().top + $(menu).height()){
									if ($(menu).is(":hidden")){
										if (e.clientY < $(menu).height()){
											$(menu).fadeIn(in_time).bind("mouseleave", function(){
												$(menu).fadeOut(out_time).unbind("mouseleave");
											});
										}
									}
									else{	
										if (e.clientY > $(menu).height())
											$(menu).fadeOut(out_time);			
									}
								}
							});						
									
							// обработчик скрола
							$(window).scroll(function(e){
								if ($(window).scrollTop() < $(".menubar2:first").position().top + $(menu).height())
									$(menu).fadeOut(out_time);
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
