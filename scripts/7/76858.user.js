// ==UserScript==
// @name           Koordinaten
// @namespace      sdgsdgserg
// @include        http://de*.die-staemme.de/forum.php*answer=true*
// @include        http://de*.die-staemme.de/game.php*screen=mail*view=*
// @include        http://de*.die-staemme.de/forum.php*mode=new_thread*
// @include        http://de*.die-staemme.de/forum.php*mode=new_poll*
// @include        http://de*.die-staemme.de/game.php*screen=mail*mode=new*
// ==/UserScript==

/*
document.getElementById("message").setAttribute("onkeyup", "javascript:this.value = this.value.replace(/(\\d\\d\\d)\\/(\\d\\d\\d)/g, '[coord]$1|$2[/coord]');this.scrollTop = this.scrollHeight;");

var a = document.createElement("a");


a.innerHTML = "<input type='checkbox' id='how_to_do_it' checked='checked' onclick=\"javascript:if(this.checked == true){document.getElementById('message').setAttribute('onkeyup', 'javascript:this.value = this.value.replace(/(\\d\\d\\d)\\/(\\d\\d\\d)/g, \\'[coord]$1|$2[/coord]\\');this.scrollTop = this.scrollHeight;');}else{document.getElementById('message').setAttribute('onkeyup', '');}document.getElementById('message').focus();\">Live beim Schreiben";


document.getElementsByClassName("vis")[0].getElementsByTagName("div")[0].appendChild(a);
*/


var welches = 0;
if(document.URL.search(/mail/) != -1)
{
 welches = 1;
}
var a = document.createElement("a");


a.innerHTML = "<input type='button' value='Ersetzen' onclick=\"document.getElementById('message').value = document.getElementById('message').value.replace(/(\\d\\d\\d)\\/(\\d\\d\\d)/g, '[coord]$1|$2[/coord]');document.getElementById('message').scrollTop = document.getElementById('message').scrollHeight;document.getElementById('message').focus();\">";


document.getElementsByClassName("vis")[welches].getElementsByTagName("div")[0].appendChild(a);