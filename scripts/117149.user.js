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
// @name 				PoolLider for NNTT.ORG 
// @version				1.3 
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
					var pool_width = new Array();	
					
					$("img")
						.filter("[src='http://www.nntt.org/styles/nnttClassic/imageset/poll_center.gif'],[src='http://www.nntt.org/styles/nnttModern/imageset/poll_center.gif']")
						.each(function(index, e){				
							pool_width[index] = new Object({ w:($(this).parent("td").next().next().text().match(/\[\s([0-9]+?)\s\]/i)[1]), p:index });						
							$(this)
								.parent("td")
									.parent("tr")
										.addClass("pool_value");
						})

					if (pool_width.length)
					{
						pool_width.sort(function(a, b) { // По убыванию
							if (+a.w > +b.w) return -1;
							else {
								if (+a.w < +b.w) return 1;
								else return 0;	}	
						});

						$("tr.pool_value")
							.eq(pool_width[0].p)
								.css('background-color','#ffd700')	// gold
									.children("td:eq(1)")
										.wrap("<span style='font-weight:bold;'></span>")
									.end()
								.end()
							.eq(pool_width[1].p)
								.css('background-color','#c0c0c0')	// silver
									.children("td:eq(1)")
										.wrap("<span style='font-weight:bold;'></span>")
									.end()
								.end()
							.eq(pool_width[2].p)
								.css('background-color','#cd7f32')	// bronze
									.children("td:eq(1)")
										.wrap("<span style='font-weight:bold;'></span>");
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