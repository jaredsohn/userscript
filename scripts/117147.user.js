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
// @author 		alexg
// @name 		SmartLink for NNTT.ORG
// @version 	2.0
// @include 	http://nntt.org*
// @include 	http://www.nntt.org*
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
						/*
							$("a.postlink").each(function(i, a_obj){
								var url = $(a_obj).attr("href");
								if (url && (url.indexOf("nntt.org") == -1))
									$(a_obj).after("<span style='color:#d46400'>&nbsp;(Внешний ресурс!)</span>");
							});
						*/	
							$("a.postlink-local").each(function(i, a_obj){
								var url = $(a_obj).attr("href");
								if (url && (url.indexOf("nntt.org") != -1)){
									if ($(a_obj).text().indexOf(".php") != -1)
									{

										jQuery.ajax({
   										type: "GET",
   										url: url,
   										dataType: "html",
   										success: function(data)
   										{
     											var title_text = getTitle(data);
    											$(a_obj).html(title_text);
   										}
 										});
 				
										function getTitle(resp)
										{
											resp = resp || 0;	
											if (resp && resp.length){					
    											var begin = resp.indexOf("<title>");
    											var end 	 = resp.indexOf("</title>");
    											if ((begin != -1) && (end != -1))	{
  													var sep;
    												var ret = String(resp.substring(begin + 7, end));
    												if ((sep = ret.indexOf("-")) != -1)
  														ret = ret.substring (sep + 1);
  													return ret;
    											}
  											}
  										}									
									}
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