// ==UserScript==
// @name           Team-Ulm-MessageNotifier
// @description    Macht auf neue Nachrichten aufmerksam
// @namespace      Flo aka _blacksheep
// @include        http://*.team-ulm.de/*
// ==/UserScript==
//-----------------------------------------------------------------

function getCookieVal (offset) {
    var endstr = document.cookie.indexOf (";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

function getCookie (name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
        return getCookieVal (j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break; 
    }
    return null;
}

function notify(){
 new Ajax.Request('/msg_report.ajax.php', {
  method: 'get',
  onSuccess: function(transport) {
		var response = transport.responseText.evalJSON(true);
		if (getCookie('last') != response.msgID && response.msgID != 0) {
			if (confirm('Neue Nachricht erhalten.\nÖffnen?')) {
				window.location = 'http://www.team-ulm.de/popup/msg_view.php?msgid=' + response.msgID;
				document.cookie = 'last=0; path=/;';
			} else {
				document.cookie = 'last='+response.msgID+'; path=/;';
				document.getElementsByTagName('div')[5].innerHTML = "<a href='/popup/msg_view.php?msgid="+getCookie('last')+"' style='color:#ff4012;font-weight:bold;'>Neue Nachricht!</a>";
			}
		} else if (response.msgID != 0) {
			document.getElementsByTagName('div')[5].innerHTML = "<a href='/msg_view.php?msgid="+getCookie('last')+"' style='color:#ff4012;font-weight:bold;'>Neue Nachricht!</a>";
		} else {
			document.cookie = 'last=0; path=/;';
		}
  }
 });
}

notify();
