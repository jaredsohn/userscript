// ==UserScript==
// @name           Kostenloser Magenauspump Button
// @namespace      magenauspumper by basti1012  (http://pennerhack.foren-city.de).version 6 Ueberarbeitet von NewMan (http://ego-shooters.net)
// @description    SEin button um kostenlops den magen auspumpen zu lassen beta versiion f?r hamburg und berlin
// @include        http://*pennergame.de*
// @include        http://*berlin.pennergame.de*
// @include        http://*menelgame.pl*
// @include        http://*dossergame.co.uk*
// ==/UserScript==




if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var pgurl = 'http://berlin.pennergame.de/';
};
if(document.location.href.indexOf('pennergame.de/')>=0) {
var pgurl = 'http://www.pennergame.de/';
};
if(document.location.href.indexOf('menelgame.pl/')>=0) {
var pgurl = 'http://menelgame.pl/';
};
if(document.location.href.indexOf('clodogame.fr/')>=0) {
var pgurl = 'http://clodogame.fr/';
};
if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var pgurl = 'http://dossergame.co.uk/';
};



var table = document.getElementsByTagName('form')[0];
var li = table.getElementsByTagName('li')[6];
li.innerHTML += "<input type='button' id ='magen' value='Magen auspumpen'>";
			
			






document.getElementById('magen').addEventListener('click', function start() {
	
versichergehen ();

},false); 


function versichergehen (){

	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+pgurl+'/city/medicine/insurance/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('id=1&submitForm=Durchf%C3%BChren'),
		onload: function(responseDetails)


{
auspunpen (versichergehen);
//location.reload();
}
	});   


}





function auspunpen (versichergehen){

	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+pgurl+'/city/medicine/help/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('id=2&submitForm=Durchf%C3%BChren'),
		onload: function(responseDetails)


{
Kuendigen (auspunpen, versichergehen);
//location.reload();
}
	});   

}


function Kuendigen (auspunpen, versichergehen){
	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+pgurl+'/city/medicine/insurance/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('id=1&submitForm=K%C3%BCndigen'),
		onload: function(responseDetails)
{
aktuellen (auspunpen, versichergehen);
//location.reload();
}
	});   
}



function aktuellen (auspunpen, versichergehen){
window.setTimeout("location.reload()", 30);
//location.reload();
}







