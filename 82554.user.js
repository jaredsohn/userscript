// ==UserScript==
// @name           Pennergame - Signatur ausblenden
// @author	   abwasch - pennerhack.foren-city.de
// @description    Blendet die Signatur aus. Entfernt den Eintrag '<cash>'(Geld) aus der API.
// @include        *.pennergame.de/settings/*
// ==/UserScript==

var link = 'http://'+document.URL.split('/')[2];
var user_name = document.body.innerHTML.split('Deine persönlicher Link ist: <a href="http://')[1].split('.')[0];
document.getElementsByClassName('settingpoint setold')[0].innerHTML += '<div id=\"sig_anzeige\" class=\"tieritemA\" style=\"width:528px; font-weight:bold\"></div>';

test_sig()

function test_sig(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: link+'/dev/api/user.getname.xml?name='+user_name,
		onload:function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			if (dom.getElementsByTagName('cash')[0]){
				document.getElementById('sig_anzeige').innerHTML = '<span style=\"color:#F61010\">Signatur wird angezeigt&emsp;</span>'
					+'<input class="formbutton" type=\"submit\" id=\"sig_set\" value=\"Deaktivieren\">';
				document.getElementById('sig_set').addEventListener('click', function(){
					GM_xmlhttpRequest({
						method: 'POST',url: link+'/settings/signature_delete/',
						headers:  {'Content-type': 'application/x-www-form-urlencoded'},
						data: encodeURI('sigdel=Signatur deaktivieren'),
						onload:function() {test_sig()}
					});
				},false);
			}
			else {
				document.getElementById('sig_anzeige').innerHTML = '<span style=\"color:#80E640\">Signatur deaktiviert&emsp;</span>'
					+'<input class="formbutton" type=\"submit\" id=\"sig_set\" value=\"Anzeigen\">';
				document.getElementById('sig_set').addEventListener('click', function(){
					GM_xmlhttpRequest({
						method: 'POST',url: link+'/settings/signature_save/',
						headers:  {'Content-type': 'application/x-www-form-urlencoded'},
						data: encodeURI('uploader=Speichern'),
						onload:function() {test_sig()}
					});
				},false);
			}
		}
	}, false);
}
