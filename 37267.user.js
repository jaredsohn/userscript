// ==UserScript==
// @name           DataEntryAutomation
// @namespace      DataEntryAutomation
// @description    For Farm to enter data more easily.
// @include        https://vector.dna13.com/dna13portal/monitoring/savemediacontent.jsp*
// ==/UserScript==

if (document.getElementById('savemediacontentsource'))
	document.getElementById('savemediacontentsource').value = decodeURIComponent(getQuerystring('url'));
if (document.getElementsByName('PARAM_MEDIA_AUTHOR')[0])
	document.getElementsByName('PARAM_MEDIA_AUTHOR')[0].value = decodeURIComponent(getQuerystring('website'));
if (document.getElementsByName('cliptitle')[0])
	document.getElementsByName('cliptitle')[0].value = decodeURIComponent(getQuerystring('title'));
if (document.getElementsByName('ContentProvider')[0])
	document.getElementsByName('ContentProvider')[0].value = decodeURIComponent(getQuerystring('website'));
if (document.getElementsByName('dateMonth')[0])
	document.getElementsByName('dateMonth')[0].value = decodeURIComponent(getQuerystring('month'));	
if (document.getElementsByName('dateDayOfMonth')[0])
	document.getElementsByName('dateDayOfMonth')[0].value = decodeURIComponent(getQuerystring('day'));
	
function getQuerystring(key, default_) {
  if (default_==null) default_=""; 
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
} 