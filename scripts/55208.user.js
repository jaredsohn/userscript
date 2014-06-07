// ==UserScript==
// @name           Direkt Krieg/Buendnissverlinker auf Bandenprofil Pennergame alle Games by Boggler
// @namespace      Boggler @ Pennerhack ( visit:http://pennerhack.de.tc/ ) EDIT BY BASTI1012
// @description    Auf Bandenprofilen werden 2 Links erstellt um die Bande als Feind/Freund hinzuzufuegen 
// @license		 Creative Commons by-nc-sa
// @include        */profil/bande:*/
// @include 	     */gang/pact/*
// ==/UserScript==




// Farbeinstellungen
var position = 'absolute';
var top = '400';
var right = '650';


if(document.location.href.indexOf('/profil/bande:')>0){
var body = document.getElementsByTagName('body')[0];
var bandenname = body.innerHTML.split('src="/headline/')[1].split('/')[0];
body.innerHTML += '<span style="position:'+position+';top:'+top+'px;right:'+right+'px;"><input type="button" id="freund" value="Als B&uuml;ndnispartner hinzuf&uuml;gen"><br><br><input type="button" id="feind" value="Als Feind hinzuf&uuml;gen"></span>';
}


document.getElementById('freund').addEventListener('click', function feind(){
freund='0';
text = 'BUENDNISANFRAGE';
war(freund,text)
},false);


document.getElementById('feind').addEventListener('click', function feind(){
freund='1';
text = 'KRIEGSERKLAERUNG';
war(freund,text)
},false);


function war(freund,text){
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://'+ window.location.hostname+'/gang/pact/faction/add/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('f_name='+bandenname+'&f_type='+freund+'&Submit=Hinzuf%C3%BCgen'),
		onload: function(responseDetails)
     	{
                	var content = responseDetails.responseText;
			var ange = content.split('id="nicon">')[1].split('tabnav')[0];
			var ange = ange.split('<p>')[1].split('</p>')[0];
		alert(""+text+"\n\n"+ange+"")
    	 }
});	
}