// ==UserScript==
// @name           Google Youtube Search
// @namespace      www.google.com
// @include        http://www.google.*
// ==/UserScript==


unsafeWindow.sBtnf = function(){
sBtn = document.getElementsByClassName('gac_od')[0];
sBtn.setAttribute("onmouseover", "sBtn = document.getElementsByTagName('input')[11];sBtn.type = 'button';sBtn.value = 'YouTube';sBtn.setAttribute('onmouseover', 'sBtn = document.getElementsByName(\"q\")[0];	sBtn.setAttribute(\"name\", \"search_query\");		sBtn = document.getElementsByName(\"f\")[0];	sBtn.setAttribute(\"action\", \"http://www.youtube.com/results\");	');sBtn.setAttribute('onclick','document.f.submit();');sBtn.setAttribute('onmouseout', 'sBtn = document.getElementsByName(\"search_query\")[0];sBtn.setAttribute(\"name\", \"q\");				sBtn = document.getElementsByName(\"f\")[0];	sBtn.setAttribute(\"action\", \"\search\");		');");
}

sBtn = document.getElementsByName("btnI")[0];
sBtn.type = "button";
sBtn.value = "YouTube";
sBtn.setAttribute("onmouseover", "sBtn = document.getElementsByName('q')[0];	sBtn.setAttribute('name', 'search_query');			sBtn = document.getElementsByName('f')[0];	sBtn.setAttribute('action', 'http://www.youtube.com/results');	");
sBtn.setAttribute("onclick","document.f.submit();");
sBtn.setAttribute("onmouseout", "sBtn = document.getElementsByName('search_query')[0];	sBtn.setAttribute('name', 'q');				sBtn = document.getElementsByName('f')[0];	sBtn.setAttribute('action', '/search');				");

sBtn = document.getElementsByTagName('body')[0];
sBtn.setAttribute("onload", "sBtnf()");
