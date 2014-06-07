// ==UserScript==
// @name           Prévia do tópico
// @namespace      Fr4nk
// @Profile        ?uid=8057530411904348432
// @include        http*://*.orkut.*/CommTopics?cmm=*
// @include	   http*://*.orkut.*/Community?cmm=*
// ==/UserScript==

function GET(x) { 
			with(new XMLHttpRequest)
					open("GET", String(x).split("\x23") [1] , 0),
						send(0),
						/class=[\47\42]?para[\47\42]?>([\r\n]*[^\n]+)/(responseText);
							return x.title = RegExp.$1.replace(/<[^>]*>/ig,
															function(t) { 
																return /<br[^>]*>/(t) ? "\r\n" : ""
															}
													) || "";
		}


	
		for(c = 0; c != ($ = unsafeWindow.document.getElementsByTagName("a")).length; c++)
				if(String($[c]).indexOf("CommMsgs") != -1)
						$[c].onmouseover = function() { return GET(this); }