// ==UserScript==
// @name           Penny Arcade Random Button
// @namespace      pennyarcade@random.button
// @description    Adds a random comic button to penny-arcade.com
// @include        http://*penny-arcade.com/comic*
// ==/UserScript==


GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.penny-arcade.com/archive/',
    onload: function(responseDetails) {
        var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(responseDetails.responseText,"application/xml");
      var comics = xmlDoc.getElementById('id_comic');
      var n = comics.options.length;
      var myLink=comics.options[Math.floor(Math.random()*n)].value;
      var btns = document.getElementsByClassName('buttons');
      if(btns.length>0)
      {
        var newElement = document.createElement('a');
        newElement.innerHTML='Random';
        newElement.href=myLink;
        btns[0].appendChild(newElement);
      }
    }
  });


