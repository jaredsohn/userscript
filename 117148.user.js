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
// @name 				NewSearch for NNTT.ORG 
// @version				1.1 
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
						function addSearch (ref, text, url){
							var opt = document.createElement('option');
							$(opt)
								.val(url)
								.addClass('extra_search')
								.html(text)					
								.appendTo(ref);	
						}
						$("form#quick-search")
							.find("select#search-action")
								.each(function(e){
									addSearch (this, "&nbsp;в Яндексе&nbsp;", "http://yandex.ru/yandsearch?site=www.nntt.org&text=");
									addSearch (this, "&nbsp;в Google&nbsp;", "http://www.google.ru/search?sitesearch=www.nntt.org&q=");
								})
							.end()
							.find("input[type='submit']")
								.click(function(e){
									var searchText = $("form#quick-search input#search-text").val();
									if(searchText.length && searchText != 'Поиск...' && $("form#quick-search option:selected").hasClass('extra_search')){
										window.open($("form#quick-search select#search-action option:selected").val() + searchText);
										return false;
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