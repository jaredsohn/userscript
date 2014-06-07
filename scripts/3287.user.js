// ==UserScript==
// @name           Urban Dead Suicide
// @namespace      http://jes5199.livejournal.com
// @description    Use any attack or item on yourself
// @include        http://urbandead.com/map.cgi*
// ==/UserScript==

myname = "";
mynumber = 0;

paragraphs = (document.getElementsByTagName("p"));
for(p=0;p < paragraphs.length; p++){
  if(paragraphs[p].className == 'gt'){
    mynumber = (paragraphs[p].firstChild.nextSibling.href);
    mynumber = mynumber.replace(/[^0-9]*/,'');
    myname = paragraphs[p].firstChild.nextSibling.firstChild.innerHTML;
  }
}

selects = (document.getElementsByTagName("select"));
for(s=0;s <selects.length; s++){
  if(selects[s].name == "target"){
    selects[s].innerHTML = "<option value='" + mynumber + "'>" + myname + "</option>" + selects[s].innerHTML;
  }
}
