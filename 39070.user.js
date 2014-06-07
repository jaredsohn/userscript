// ==UserScript==
// @name           Suivi des forums OVS
// @namespace      http://nantes.onvasortir.com
// @description    Indicateur de présence de nouveaux messages 1.0 (c) ovs nantes 2008
// @include        http://*/forum.php
// ==/UserScript==

function gup( adresse,name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( adresse );
  if( results == null )
    return "";
  else
    return results[1];
}

var oHREF = document.getElementsByTagName('a')
for (var i = 0; i < oHREF.length; i++) {
	if (oHREF[i].href.indexOf('forum_read.php')>0){
	topicid=gup(oHREF[i].href,'id');
	if (typeof(GM_getValue(String(topicid)))!='undefined'){ 
		if (oHREF[i].innerHTML!=GM_getValue(String(topicid)))
		oHREF[i].innerHTML='<b>' + oHREF[i].innerHTML+'</b>';
	}
	oHREF[i].addEventListener("click", function() {GM_setValue(String(gup(this.href,'id')), this.text);}, false);
}
}
