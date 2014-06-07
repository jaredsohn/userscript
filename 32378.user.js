// ==UserScript==
// @name           UserScripts Totals Data
// @namespace      http://userscripts.org/scripts/show/32378
// @version        0.7.4.3
// @description    Totals the installs, comments and fans on userscripts profiles.
// @include        http://*userscripts.org/*/scripts*
// @include        http://*userscripts.org/*/favorites*
// ==/UserScript==
commafy=function(x) {
	var str = (x+'').split('.'), dec=str[1]||'', num=str[0], reg = /(\d+)(\d{3})/;
	while (reg.test(num))
		num=num.replace(reg, '$1,$2');
	return (dec) ? num+'.'+dec : num;
};

GM_addStyle(".editbox a{cursor:-moz-alias;color:yellow;font-weight:bold}.editbox{color:white;font-size:13px;padding:2px 11px!important}");

var r=document.evaluate("//table",document,null,9,null).singleNodeValue.rows, l=r.length,
    total=0, com=0, fans=0, off=/\/home\/scripts/.test(document.URL) ? 1 : 0,
    get=function(x,i) {return parseInt(x[i+off].textContent) || 0};

for(i=1;i<l;i++)
	with(r[i]) { 
		com+=get(cells,2);
		fans+=get(cells,3);
		total+=get(cells,4);
	}

m="These scripts have been installed a total of <strong>"+commafy(total)+"</strong> times, commented on <strong>"+commafy(com)+"</strong> times, and have <strong>"+commafy(fans)+"</strong> fans.";

document.body.innerHTML+="<div class=\"editbox\">"+m+" Click <a onclick=\"document.body.removeChild(this.parentNode)\">here</a> to close this message.</div>";