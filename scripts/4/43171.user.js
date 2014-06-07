// ==UserScript==
// @name	   Bugzilla DateTime localizator
// @namespace      http://www.ucw.cz/
// @description    Transform datetime fields in Bugzilla show_bug and show_activity pages to viewer's local timezone
// @include	   https://bugzilla.novell.com/show_bug.cgi?id=*
// @include	   https://bugzilla.novell.com/process_bug.cgi
// @include	   https://bugzilla.novell.com/show_activity.cgi?id=*
// @include	   https://bugzilla.novell.com/post_bug.cgi
// @include        https://bugzilla.novell.com/attachment.cgi
// ==/UserScript==

var datetimere=/20\d\d-\d\d-\d\d \d\d:\d\d(?::\d\d)* M(?:S|D)T/;

function lz(s) {
	return (s<10?"0"+s:s);
}
function localizeDates(dd) {
	var so =  new String(dd);
	so=so.replace(/\,(:\d\d)*$/,"");
	so=so.replace(/ (\d\d:\d\d) (M(?:S|D)T)/," $1:00 $2");
	if(!window.opera) {
		so=so.replace(/^(\d\d\d\d)-(\d\d)-(\d\d) /,"$2 $3 $1 ");
	}
	var d = new Date(so);
	return d;
  }
function formatdate(d) {
	var s = d.getFullYear()+"-"+lz(1+Number(d.getMonth()))+"-"+lz(Number(d.getDate()))+" "+
		lz(d.getHours())+":"+lz(d.getMinutes())+":"+lz(d.getSeconds());
	return s;
}

function rewriteDateTime(tagname,parentclass) {
	var x;
	var m;
	var itags = document.getElementsByTagName(tagname);
	
	for (x=0;x<itags.length;x++) {
		if(parentclass=="" || itags[x].parentNode.className==parentclass) {
			if (itags[x].innerHTML.match(/<td[ >]/)) {
				continue;
			}
			m = itags[x].innerHTML.match(datetimere);
			if (m) {
				dd = localizeDates(m);
				itags[x].innerHTML=itags[x].innerHTML.replace(datetimere,formatdate(dd));
			}
		}
	}
	return false;
  }


rewriteDateTime("i","bz_comment_head");
rewriteDateTime("i","bz_first_comment_head");
rewriteDateTime("td","");
