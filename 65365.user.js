// ==UserScript==
// @name           cet2locale
// @namespace      http://xinjia.name
// @description    CET time converts to local time
// @include        http://mantis.bysoft.fr/my_view_page.php
// ==/UserScript==
function cet2local(allmatched, cet_string) //string
{
	ds = cet_string+' GMT+0100';
	ld = new Date(Date.parse(ds.replace(/-/g, "/")));
	return ld.toLocaleFormat('<font style="color:green;">%Y-%m-%d %H:%M Canton</font>');
}

document.body.innerHTML = document.body.innerHTML.replace(/(\d{4}-\d{2}-\d{2}\s*\d{2}:\d{2})(?:\s*CET)?/g, cet2local);