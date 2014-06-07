// ==UserScript==
// @name           replace y'all
// @namespace      yall@kwierso.com
// @description    Replaces "y'all" with "you all".
// @include        http://*.roosterteeth.com/*
// ==/UserScript==
(function()
{
	//GM_setValue("yall.replacement", "you all");

	var replacement = GM_getValue("yall.replacement", "you all");
	var replacement2;
	
	var doc = document.getElementById("pageContent");
	
	var myRegExp = new RegExp("y'all", "g");
	var replacedby = "<b><u>(("+replacement+"))</u></b>";
	
	replacement2 = replacement;
	for(i = 0;i < replacement2.length; i++)
	{
		if(i==0)
		{
			replacement = replacement2.charAt(i).toUpperCase();
		}
		else
		{
			replacement +=replacement2.charAt(i);
		}
	}
	
	var myRegExp2 = new RegExp("Y'all", "gi");
	var replacedby2 = "<b><u>(("+replacement+"))</u></b>";
	
	var myRegExp3 = new RegExp("yall", "gi");
	var replacedby3 = "<b><u>(("+replacement+"))</u></b>";
	
	var myRegExp4 = new RegExp("ya'll", "gi");
	var replacedby4 = "<b><u>(("+replacement+"))</u></b>";
	
	var myRegExp5 = new RegExp("yal'l", "gi");
	var replacedby5 = "<b><u>(("+replacement+"))</u></b>";
	
	var myRegExp6 = new RegExp("yall'", "gi");
	var replacedby6 = "<b><u>(("+replacement+"))</u></b>";
	
	var myRegExp7 = new RegExp("'yall", "gi");
	var replacedby7 = "<b><u>(("+replacement+"))</u></b>";
	
	var dochtml = doc.innerHTML.replace(myRegExp2, replacedby2);
	doc.innerHTML = dochtml;
	
	dochtml = doc.innerHTML.replace(myRegExp, replacedby);
	doc.innerHTML = dochtml;
	
	dochtml = doc.innerHTML.replace(myRegExp3, replacedby3);
	doc.innerHTML = dochtml;
	
	dochtml = doc.innerHTML.replace(myRegExp4, replacedby4);
	doc.innerHTML = dochtml;
	
	dochtml = doc.innerHTML.replace(myRegExp5, replacedby5);
	doc.innerHTML = dochtml;
	
	dochtml = doc.innerHTML.replace(myRegExp6, replacedby6);
	doc.innerHTML = dochtml;
	
	dochtml = doc.innerHTML.replace(myRegExp7, replacedby7);
	doc.innerHTML = dochtml;
}
)();