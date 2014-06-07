// ==UserScript==
// @name           Userscripts spam filter
// @namespace      jp.tkgreen
// @description    Blocks annoying spam on userscripts
// @include        http://*userscripts.*/*
// ==/UserScript==

function strpos(haystack, needle, offset) { 
    var i = (haystack+'').indexOf(needle, (offset || 0));
    return i === -1 ? false : i+1;
}

var count=0;
var trs = document.getElementsByTagName('tr');

for (i=0; i<trs.length; i++)
{
	var elmn = trs[i];
	if(elmn.id){
		var td = elmn.getElementsByTagName('td');
		var p = td[0].getElementsByTagName('p');
		if(strpos(p[0].innerHTML, "READ the DESCRIPTION IN ORDER to INSTALL it CORRECTLY",0) | strpos(p[0].innerHTML, "READ DESCRIPTION IN ORDER to INSTALL it CORRECTLY",0)) {
			elmn.style.display = 'none';
			count += 1;
		}
	}
}

if(!strpos(document.location.href, 'http://userscripts.org/scripts/show/', 0)) {
	if(document.location.href == 'http://userscripts.org/scripts') (document.getElementsByTagName('p'))[0].innerHTML += ", " + count +" removed ";
	else (document.getElementsByTagName('h5'))[0].innerHTML += ", " + count +" removed ";
}
var end
end