// ==UserScript==
// @name			Ikariam No-Plus2
// @version			v.0.2.1
// @author			Cellax Based on Ikariam No-Plus by Mow - (KAPPA/BR)	
// @description		Remove all links of Ikariam PLUS v.0.4.2
// @include			http://s*.ikariam.*/*  
// ==/UserScript==

var version = 'v.0.2.1';
var date = '2011-FEB-14';
var license = 'Creative Commons Attribution-Noncommercial-Share Alike 2.5';
var copyright = '©2009-11 Cellax Mow';

function removeElement(e) {
	return e.parentNode.removeChild(e);
}

function testPlus(element){
	var premium = element.indexOf("remium");
	var trash = element.indexOf("oldView");
	if((premium > 0) && ((trash < 0) || (premium < trash))) return true;
	else return false;
}


function addException(element){
		var nivel = 0;
		switch(element.className){
			case "button":
			case "setMax":
			case "setMin":
			case "enlarge":
			case "notenough":
                        case "premiumFeature":
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
                        case "premiumFeature":
				return "";	
			default:
				break;
		}
		if(element.parentNode.parentNode.parentNode.className == "ambrosia") return "";
		while(element.className.length == 0){
			element = element.parentNode;
			nivel++;
		}
		if(element.className) return "<p>" + "Class ".bold() + element.className.link('javascript:void(0)') + ", Level ".bold() + nivel + "</p>";
}

function removePlus(e){
	var other = "";
	var plus = document.links;
	for(i=plus.length-1;i>=0;i--){
		if(testPlus(plus[i].href)){
			if(((banner = plus[i].parentNode).className == "premium") || (banner.className == "next") || (banner.className == "premiumExchange") || (banner.parentNode.className == "reply") || (banner.parentNode.className == "msgText") || (banner.className == "premiumFeature") || (banner.parentNode.className == "action"))
			{
				removeElement(banner);
			}
			else
				if((plus[i].className == "ambrosiaCost") || (plus[i].className == "plusteaser") || (plus[i].className == "premiumExchange") || (plus[i].className == "trader") || (plus[i].className == "premiumFeature") || (plus[i].parentNode.className == "link"))
				{
				   removeElement(plus[i]);
				}
				else
					if((!document.getElementById("premium"))&&(!document.getElementById("premiumTrader")))
					  {
						if(((banner = plus[i].parentNode.parentNode.parentNode).className == "dynamic") || (banner.className == "premium") || (banner.className == "premiumFeature") || (banner.className == "contentBox"))
						{
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
								if(plus[i].parentNode.className == "info")
								{	
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
}

removePlus(this);

// Replace the normal Advisor with premium one
GM_addStyle("#advisors #advCities a.normal {background-image:url(/skin/layout/advisors/mayor_premium.gif)}");
GM_addStyle("#advisors #advCities a.normalactive {background-image:url(/skin/layout/advisors/mayor_premium_active.gif)}");
GM_addStyle("#advisors #advMilitary a.normal {background-image:url(/skin/layout/advisors/general_premium.gif)}");
GM_addStyle("#advisors #advMilitary a.normalactive {background-image:url(/skin/layout/advisors/general_premium_active.gif)}");
GM_addStyle("#advisors #advMilitary a.normalalert {background-image:url(/skin/layout/advisors/general_premium_alert.gif)}");
GM_addStyle("#advisors #advResearch a.normal {background-image:url(/skin/layout/advisors/scientist_premium.gif)}");
GM_addStyle("#advisors #advResearch a.normalactive {background-image:url(/skin/layout/advisors/scientist_premium_active.gif)}");
GM_addStyle("#advisors #advDiplomacy a.normal {background-image:url(/skin/layout/advisors/diplomat_premium.gif)}");
GM_addStyle("#advisors #advDiplomacy a.normalactive {background-image:url(/skin/layout/advisors/diplomat_premium_active.gif)}");