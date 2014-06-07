// ==UserScript==
// @name Reverie RO
// @namespace p4nszp4n@gmail.com
// @description Check Server status
// @include http://reverie-ro.com/?module=news*
// ==/UserScript==




var players = 1;
var sec = 60;
window.setTimeout(countclick, 1000);
function countclick() {
	
	players = document.getElementById('col2_content').innerHTML.split('Players Online: <strong>')[1].split('<')[0];
	if(players==0) {count();}
	else {
                document.title = 'Server is Online~!';
                document.body.innerHTML += '<embed src="http://www.htmlcodetutorial.com/graphics/sounds/helloo.wav" hidden=true LOOP="true" autostart=true ></embed>';
        }
}
function reload() {
	window.location.reload();
}
function count() {
	if(sec==0) {
                sec = 60;
                window.location.reload();
        }
        else {
                document.title = 'Checking server status... ('+sec+')';
                sec--;
                window.setTimeout(count, 1000);
        }
}