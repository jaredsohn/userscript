// ==UserScript==
// @name           Post warner basti1012 fuer pennergame 4.0 
// @namespace      by basti1012 (visit pennerhack.foren-city.de.de)
// @description    Zeigt an ob man neue post gekriegt hat 
// @include        *pennergame.de*
// ==/UserScript==
	
GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.pennergame.de/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('Dein Penner')[1];
			var userid = text1.split('Sauberkeit:')[0];
try{
			var userp = userid.split('[')[1];
			var post = userp.split(']')[0];

var table = document.getElementById("my-profile");
var tr = table.getElementsByClassName("zleft")[0];
tr.innerHTML ='<a href="http://www.pennergame.de/messages/"><img src="http://media.pennergame.de/img/overview/new_msg.gif" width="46" height="46"</a><font style=\"color:black; font-size:250%;\"><b>'+post+'</b></font>';
}catch(e){}
}});