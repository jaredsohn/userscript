// ==UserScript==
// @name           email an freunde senden blocker fuer Pennergame 4.0 berlin hamburg
// @namespace      Basti1012 http:///pennerhack.foren-city.de  xsd
// @description    Blockt das neue email anfreunde senden feld diese version ist fuer ha,bur berlin 4.0 
// @include        *www.pennergame.de/overview*
// @include        *berlin.pennergame.de/overview*
//@exclude        http://*highscore.pennergame.de*
// ==/UserScript==


var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://berlin.pennergame.de/overview/"

}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de/overview/"
}





GM_xmlhttpRequest({
  	method: 'GET',
	url: link,
		onload: function(responseDetails) {
		var profil = responseDetails.responseText;
		var suche = profil.search("Ausblenden");
	  	if (suche != -1) {
//alert("ausgeblendet");
document.getElementsByClassName('tieritemA')[2].style.display = 'none';
		}else {
//alert("eingeblendet");
document.getElementsByClassName('tieritemA')[1].style.display = 'none';


			      };
	}
});
