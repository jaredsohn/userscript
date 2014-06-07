// ==UserScript==
// @name           Log IP Remover
// @include        *slavehack*log*
// @exclude       *slavehack*logout*
// @exclude       *slavehack*index2.php?page=logs*
// @version                3.0
// ==/UserScript==
var realip = '';
try
  {
 function fireEvent(obj,evt){
	var fireOnThis = obj;
	if( document.createEvent ) {
	  var evObj = document.createEvent('MouseEvents');
	  evObj.initEvent( evt, true, false );
	  fireOnThis.dispatchEvent(evObj);
	} else if( document.createEventObject ) {
	  fireOnThis.fireEvent('on'+evt);
	}
}
var allSmall = document.getElementsByTagName('h2');
fireEvent(allSmall[0].childNodes[1],'click');
realip = allSmall[0].childNodes[1].innerHTML;
  }
catch(err)
  {
  var ipArr = new Array();
ipArr = document.getElementsByTagName('small');
ipString = ipArr[0].innerHTML;
ipAddress = ipString.substring(74).replace(']','');
ripAddress = ipAddress.replace('<span onclick="this.innerHTML=','').replace(/'/g,'').replace('"><small>Click to show IP</small></span>','');
realip = ripAddress;
  }
var str=document.getElementById('editlog').value;
var pos=str.indexOf(realip);
if (str.indexOf(realip)>=0 || str.indexOf('bank')>=0)
{
document.getElementById('editlog').value=str.replace(new RegExp(realip, 'g'), 'The Guardians');
var et = document.getElementById('editlog').value;
var ets = et.split(/\r\n|\r|\n/);
var nl = ''
for(i = 0; i < ets.length; i++){
	if ( ets[i].indexOf('bank') >=0) {
	} else {
		nl = nl + ets[i] + "\n"
	}
}
	document.getElementById('editlog').value=nl
	document.getElementById("editlog").parentNode.childNodes[3].click();
}