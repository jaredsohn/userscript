// ==UserScript==
// @name        Google Search Hack Style
// @namespace   userscripts.org/users/HoMax
// @description Google Search Hack Style
// @include     https://www.google.com*
// @include     http://www.google.com*
// @include     http://www.google.*
// @version     1
// @grant       none
// ==/UserScript==



(function() {
    var links = document.getElementsByClassName("r");
    for(var i = 0; i < links.length ; i ++) {
        var link = links[i].firstChild;
        link.setAttribute('onmouseover', 'this.style.backgroundColor=\'#CCFFFF\'');
        link.setAttribute('onmouseout', 'this.style.backgroundColor=\'\'');
        link.setAttribute('style', 'font-weight: bold; font-size:17px;');
        link.removeAttribute("onmousedown");
        link.setAttribute('target', '_blank');
    }
    
    var allLinks = document.getElementsByTagName("a");
    for(var i = 0; i < allLinks.length ; i ++) {
        allLinks[i].setAttribute('onmouseover', 'this.style.backgroundColor=\'#CCFFFF\'');
        allLinks[i].setAttribute('onmouseout', 'this.style.backgroundColor=\'\'');
        allLinks[i].style.color = "#5588cc";
    }
    
    document.getElementsByClassName("sfbg nojsv")[0].style.top = null;
    console.log("set allLinks begin");
})();

(function() {
	var styles = document.styleSheets;
	for(var i=0;i<styles.length;i++)
	{
		var rules = styles[i].cssRules;
		for(var j=0;j<rules.length;j++)
		{
			if(rules[j].selectorText == "body, td, div, .p, a"
				|| rules[j].selectorText == "#hdtb" || rules[j].selectorText == ".sfbgg"
				|| rules[j].selectorText == "#gbx3, #gbx4" || rules[j].selectorText == ".lst-d"
				)
			{
				rules[j].style.backgroundColor = "#222222";
				rules[j].style.color = "#666666";
			}
			if(rules[j].selectorText == ".fbar" || rules[j].selectorText == "#hdtbSum"
				|| rules[j].selectorText == ".gbto .gbts" || rules[j].selectorText == ".gbm" 
				|| rules[j].selectorText == ".gbmc" || rules[j].selectorText == ".hdtb-mn-o, .hdtb-mn-c"
				|| rules[j].selectorText == "#hdtbMenus" || rules[j].selectorText == ".lst-t")	//remove background style
			{
				rules[j].style.background = null;
			}
			if(rules[j].selectorText == "#hdtbSum" || rules[j].selectorText == ".fbar")	//remove border-bottom style
			{
				rules[j].style.borderBottom = null;
				rules[j].style.borderTop = null;
			}
			if(rules[j].selectorText == "a:link, .w, #prs a:visited, #prs a:active, .q:active, .q:visited, .kl:active, .tbotu"
				|| rules[j].selectorText == "a.fl:link, .fl a, .flt, a.flt, .gl a:link, a.mblink, .mblink b"
				|| rules[j].selectorText == "#lst-ib")
			{
				rules[j].style.color = "#5588cc";
			}
			if(rules[j].selectorText == ".lst-d")
			{
				rules[j].style.borderColor = "#5588cc";
			}
		}
	}
})();
