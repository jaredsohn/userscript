// ==UserScript==
// @name			Ikariam No-Plus
// @version			v.0.3.2G
// @author			Mow - (KAPPA/BR)	
// @description		Remove all links to version of Ikariam PLUS v.0.3.2 
// @include			http://s*.ikariam.*/*  
// ==/UserScript==

var version = 'v.0.3.2G';
var date = '2009-DEC-12';
var license = 'Creative Commons Attribution-Noncommercial-Share Alike 2.5';
var copyright = '©2009 Mow';

function removeElement(e) {
	return e.parentNode.removeChild(e);
}

function testPlus(element){
	var premium = element.indexOf("remium");
	var trash = element.indexOf("oldView");
	if((premium > 0) && ((trash < 0) || (premium < trash))) return true;
	else return false;
}

function addInfo(title,text){
	if((esquerda = document.getElementById("container2")) && (text)){
			var txt='\
		        <h3 class="header">' + title +'</h3>\
		            <div class="content">\
		    			<div align="left">\
		    			' + text + '\
		    			</div>\
					</div>\
		        	<div class="footer"></div>';
			var div = document.createElement("div");
			div.setAttribute("class","dynamic");
			div.innerHTML =  txt;
			esquerda.insertBefore(div, esquerda.childNodes[2]);
			return true;	
	}
	else return false;
}

function appendCredits(){
	var info = '\
		<p>'+'Version: '.bold() + version + '</p>\
		<p>'+'Last update: '.bold() + date + '</p>\
		<p>'+'License: '.bold() + license + '</p>\
		<p>'+'Copyright: '.bold() + copyright + '</p>\
		<table border="0" width="100%">\
			<tr>\
				<td width="55%">\
					<p align="center">\
					<a target="_blank" href="http://creativecommons.org/licenses/by-nc-sa/2.5/">\
						<img border="0" src="http://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png" width="88" height="31">\
					</a>\
				</td>\
				<td  width="45%">\
					<p align="center">\
					<a target="_blank" href="http://creativecommons.org/licenses/by-nc-sa/2.5/br/">\
						<img border="0" src="http://creativecommons.org/images/international/br.png" width="54" height="36">\
					</a>\
				</td>\
			</tr>\
		</table>';
	addInfo("Ikariam No-Plus",info);
}

function addException(element){
		var nivel = 0;
		switch(element.className){
			case "button":
			case "setMax":
			case "setMin":
			case "enlarge":
			case "notenough":
				return "";	
			default:
				break;
		}
		switch(element.parentNode.className){
			case "nextCity": 
			case "previousCity":
			case "feature":
			case "content":
			case "ambrosia":
			case "delete":
				return "";	
			default:
				break;
		}
		if(element.parentNode.parentNode.parentNode.className == "ambrosia") return "";
		while(element.className.length == 0){
			element = element.parentNode;
			nivel++;
		}
		element.style.border = 'thick dashed #FF0000';
		element.style.color = '#FF0000';
		element.style.textDecoration = 'blink';
		if(element.className) return "<p>" + "Class ".bold() + element.className.link('javascript:void(0)') + ", Level ".bold() + nivel + "</p>";
}

function removePlus(e){
	var other = "";
	var plus = document.links;
	for(i=plus.length-1;i>=0;i--){
		if(testPlus(plus[i].href)){
			if(((banner = plus[i].parentNode).className == "premium") ||
				(banner.className == "next")||
				(banner.className == "premiumExchange")||
			    (banner.parentNode.className == "reply") ||
			    (banner.parentNode.className == "msgText") ||
				(banner.parentNode.className == "action")){
				removeElement(banner);
			}
			else
				if((plus[i].className == "plusteaser") ||
				   (plus[i].className == "premiumExchange") ||
				   (plus[i].className == "trader") ||
				   (plus[i].parentNode.className == "link")){
				   removeElement(plus[i]);
				}
				else
					if((!document.getElementById("premium"))&&(!document.getElementById("premiumTrader"))){
						if(((banner = plus[i].parentNode.parentNode.parentNode).className == "dynamic") ||
							(banner.className == "premium") ||
							(banner.className == "contentBox")){
							removeElement(banner);
						}
						else
							if(plus[i].className == "yes"){
										var p = plus[i].parentNode.getElementsByTagName("p")[1];
										var hr = plus[i].parentNode.getElementsByTagName("hr")[0];
										removeElement(hr);
										removeElement(p);
										removeElement(plus[i]);
							}
							else
								if(plus[i].parentNode.className == "info"){	
									(banner = plus[i].parentNode.parentNode).parentNode.removeAttribute("onMouseOut");
									banner.parentNode.removeAttribute("onMouseOver");
									removeElement(banner);
								}
								else
									if(plus[i].parentNode.className == "cannotbuild"){
										var txt = plus[i].parentNode;
										removeElement(plus[i]);
										txt.innerHTML = txt.innerHTML.substr(0,txt.innerHTML.length-2);
									}
									else 
										if((txt = plus[i].parentNode).parentNode.className == "error"){
											removeElement(plus[i]);
											txt.innerHTML = txt.innerHTML.substr(0,txt.innerHTML.length-4);
										}
										else other += addException(plus[i]);
					}				
		}
	}
	if(addInfo("Exceptions",other)) alert("Ikariam No-Plus: There are exceptions on this page!");
}

removePlus(this);
if(document.getElementById("tradeAdvisor")) appendCredits();
