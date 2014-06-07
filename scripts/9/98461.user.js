// ==UserScript==
// @name           ynet Title Changer
// @description	   used to pull pranks on new workers. if you are one, I'm sorry.
// @namespace      http://userscripts.org/users/yairraz
// @include        http://*.ynet.co.il/*
// @include        http://ynet.co.il/*
// @include        http://*.mynet.co.il/*
// @include        http://mynet.co.il/* 
function changeTopStoryInSection()
{
	var hoaxLink = "http://www.ynet.co.il";
	var hoaxImage = "http://booksefer.co.il/files/catalog/media/12170018236276.JPG";
	var hoaxImageText = "כותרת תמונה";
	var hoaxImageAlt = "טקסט שמופיע שעומדים על התמונה";
	var hoaxText = "בלעדי: Google קונה את Peer39 הישראלית ב – 840 מ' דולר";

	//elements to be changed
	var imageAnchorXPath = '//*[@id="tbl_mt_8"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr/td/table/tbody/tr/td/a';
	var textAnchorXpath = '//*[@id="tbl_mt_8"]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table[2]/tbody/tr/td/table/tbody/tr[2]/td[2]/a';
	
	var imageAnchor = document.evaluate(imageAnchorXPath , document, null, XPathResult.ANY_TYPE, null).iterateNext();
	var textAnchor = document.evaluate(textAnchorXpath , document, null, XPathResult.ANY_TYPE, null).iterateNext();
	
	//change htmls
	
	imageAnchor.innerHTML = '<a href="' + hoaxLink + '"><img src="' + hoaxImage + '" alt="' + hoaxImageAlt + '" title="' + hoaxImageText + '" hm="1" width="116" border="0" height="74"></a>';
	textAnchor.innerHTML = '<a class="smallheader" href="' + hoaxLink + '">' + hoaxText + '</a>';

}

changeTopStoryInSection();
//sorry for that.

// ==/UserScript==