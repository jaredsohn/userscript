// ==UserScript==
// @name           Highlight2TranslateDK
// @namespace      google
// @include        *
// ==/UserScript==
window.div=document.createElement("div")
var divStyle="position:absolute;display:none;z-index:1000;border-left:solid 0.5px #0000AA;border-top:solid 1px #0000AA;border-right:solid 2.5px #0000AA;border-bottom:solid 2px #0000AA;background-color:white;padding-left:5px;padding: 1pt 3pt 1pt 3pt;font-size: 10pt;color: #000000;"
window.div.setAttribute("style",divStyle)

document.getElementsByTagName("body")[0].appendChild(window.div);

function languageLoaded() {
	window.addEventListener("mouseup",window.mouseUp,false)
	}
window.mouseUp=function (event){
						window.event=event
						if (window.event.target==window.div)
						return
						window.div.style.display="none"
						window.text=window.getSelection();
						if (window.text=="")
							return;
						unsafeWindow.google.language.detect(window.text,window.detectLanguage)
					}
window.detectLanguage=function(result) {
							window.text = window.text.toString()
							unsafeWindow.google.language.translate(window.text,result.language,"da",translateResult)
							}
window.translateResult=function(result){
							if (result.translation)
							{
							
							window.div.innerHTML=window.text+": "+result.translation;
							window.div.style.left=(window.event.screenX+window.scrollX+10).toString()+"px"
							window.div.style.top=(window.event.screenY+window.scrollY+10).toString()+"px"
							window.div.style.display="inline"
							}
						}
unsafeWindow.doneLoadingJSAPI = function() { unsafeWindow.google.load('language','1', {"callback" : languageLoaded}); }

var script = document.createElement('script'); script.src = 'http://www.google.com/jsapi?callback=doneLoadingJSAPI'; script.type = "text/javascript"; document.getElementsByTagName('head')[0].appendChild(script); 
