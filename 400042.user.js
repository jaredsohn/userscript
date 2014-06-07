// ==UserScript==
// @name       favs
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.bbc.co.uk/radio/favourites
// @copyright  2012+, You
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var divContainingOrderedList = document.getElementById('fav-favourites');

var list = divContainingOrderedList.getElementsByTagName('li');
addGlobalStyle('.inserted_sub li { border: 1px; border-color: #f54997; border-style: solid; margin: 10px; padding: 10px}');
addGlobalStyle('.inserted_sub .favourites-module { display: none;}');
  //alert(list[0].id);
  
  

  for (var i=0, len=list.length; i<len; i++) {
  //alert(list[i].id); 
  GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.bbc.co.uk/programmes/"+list[i].id+"/episodes/player.inc",
onload: function(response) {
    var logo = document.createElement("div");
    logo.setAttribute('class', 'inserted_sub'); 
    logo.innerHTML = response.responseText;
    var prog = response.finalUrl.substring(32,40);
    var divContainingOrderedList = document.getElementById('fav-favourites');
    var list = divContainingOrderedList.getElementsByTagName('li');
    for (var i=0, len=list.length; i<len; i++) {
        if (list[i].id==prog) {
            list[i].appendChild(logo);
        }
    }
  }
});
  };