// ==UserScript==
// @name          Forum Simplu
// @namespace     www.forumsimplu.ro
// @description   Buton forum Simplu
// @include       http://ro11.the-west.*/game.php*
// ==/UserScript==
var einstellungen = document.getElementById('menu_settings');
var duel_button = document.getElementById('menu_duel');
var nachrichten = document.getElementById('menu_messages');
var settings = document.getElementById('menu_settings');
var actual_url = window.location.host;
var actual_world = "";
var region = "";
var number_found = false;
var forumsimplu_link = document.createElement("li");
var forumsimplu2_link = document.createElement("li");
var forumsimplu3_link = document.createElement("li");
var forumsimplu4_link = document.createElement("li");	


for (var i = 0; i<actual_url.length; i++){
  if(actual_url.charCodeAt(i)>= 48 && actual_url.charCodeAt(i) <=57){
    actual_world = actual_world + actual_url.substr(i,1);
    number_found = true;
  }
  else if(!number_found){
         region = region + actual_url.substr(i,1);
       }
}
{
forumsimplu_link.innerHTML = '<a style="background:url(http://i65.servimg.com/u/f65/12/55/38/27/simplu11.png)" href="http://west-simplu.forumz.ro/Academia-Simplu-Forum-h21.htm" target="_blank"></a>';

forumsimplu2_link.innerHTML = '<a style="background:url(http://i65.servimg.com/u/f65/12/55/38/27/simplu12.jpg)" href="http://west-simplu.forumz.ro/Academia-Simplu-Forum-h21.htm" target="_blank"></a>';

forumsimplu3_link.innerHTML = '<a style="background:url(http://i65.servimg.com/u/f65/12/55/38/27/simplu13.gif)" href="http://west-simplu.forumz.ro/Academia-Simplu-Forum-h21.htm" target="_blank"></a>';

forumsimplu4_link.innerHTML = '<a style="background:url(http://i65.servimg.com/u/f65/12/55/38/27/simplu10.png)" href="http://west-simplu.forumz.ro/Academia-Simplu-Forum-h21.htm" target="_blank"></a>';

}




http://i65.servimg.com/u/f65/12/55/38/27/simplu11.gif
if (duel_button) {
  duel_button.parentNode.insertBefore(forumsimplu_link, duel_button.nextSibling);

  duel_button.parentNode.insertBefore(forumsimplu2_link, duel_button.nextSibling);

  duel_button.parentNode.insertBefore(forumsimplu3_link, duel_button.nextSibling);

  duel_button.parentNode.insertBefore(forumsimplu4_link, duel_button.nextSibling);

  duel_button.parentNode.insertBefore(forumsimplu5_link, duel_button.nextSibling);
}
else{
  alert('Eroare. Doar dati click si eroarea va disparea');
}
if (duel_button) {
  duel_button.parentNode.insertBefore(twtool_link, duel_button.nextSibling);
}
else{
  alert('Eroare. Doar dati click si eroarea va disparea');
}
if (nachrichten && region == 'ro'){
  tw_times_link.innerHTML = '<a style="background:url(http://bsienok.bs.funpic.org/twscriptro/random.jpg) no-repeat" target="_blank"></a>';
  nachrichten.parentNode.insertBefore(tw_times_link, settings.nextSibling);
  }
else{
  alert('Eroare. Doar dati click si eroarea va disparea');
}



