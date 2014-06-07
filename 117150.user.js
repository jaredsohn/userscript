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
// @name 				IAmPeer for NNTT.ORG 
// @version				1.2 
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
					$(document).ready(function() {	
						var url = $("div.datebar>table.menubar2").find("a:first").attr('href');
						if (url){
							var profile_id = url.match(/\.\/memberlist\.php\?mode=viewprofile&u=([0-9]+)$/i)[1];
							if (profile_id){
								$("#show_peers").ajaxSuccess(function(evt, request, settings){
   								$("div.show_peers_content a.seed[href$='memberlist.php?mode=viewprofile&u=" + profile_id + "']")
   									.parents("tr:first")
   										.css('background-color','#fddbb5');
 								});
							}
						}
					});
				});
					
				var term_in  = text.indexOf("{");
				var term_out = text.lastIndexOf('}');
      			
				script.appendChild (document.createTextNode("/* <![CDATA[ */" + text.substring(term_in + 1, term_out) + "/* ]]> */"));
				document.getElementsByTagName('head')[0].appendChild(script); 
   		}  
 		}, false);
})();