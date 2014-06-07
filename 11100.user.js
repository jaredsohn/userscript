// ==UserScript== //
// @name           Miniclip in Fullscreen
// @namespace      http://scripting.douweikkuh.nl
// @description    Open a  Miniclip.com-game in fullscreen
// @include        http://www.miniclip.com/games/*/*/
// ==/UserScript== //


  var allPageTags = new Array(); 

  function addToClass(theClass,theStr) {
    //Populate the array with all the page tags
    var allPageTags=document.getElementsByTagName("*");
    //Cycle through the tags using a for loop
    for (i=0; i<allPageTags.length; i++) {
      //Pick out the tags with our class name
      if (allPageTags[i].className==theClass) {
        //Manipulate this in whatever way you want
        allPageTags[i].innerHTML=theStr+allPageTags[i].innerHTML;
      }
    }
  }


  var addButton = addToClass('buttons','<li class="addtominiclips"><a href="http://www.miniclip.com" id="fullscreenButton" style="background: transparent url(http://www.douweikkuh.nl/gmonkey/miniclipinfullscreen/button_fullscreen.png) repeat scroll 0%; color: red;">Open in fullscreen</a></li>');

  var addClickEvent = document.getElementById('fullscreenButton').addEventListener('click',  fullscreen, true);


  function fullscreen(){

    alert("The fullscreen-game will now be opened in an new tab.\nWhen you press [F11] also the window will be fullscreen-ed.\nIn this way, you'll get the ultimate game experience.\nYou can set the window-size back to normal, by clicking the taskbars, and than pressing [F11] again.");
  
    var gameParams = document.getElementById('gameContainer').getElementsByTagName("param");
    var gameUrl = document.location.href;
    for(var i=0; i<gameParams.length; i++) {
      if (gameParams[i].getAttribute("name")=="movie") {
        var gameUrl = gameParams[i].getAttribute("value");
      }
      if (gameParams[i].getAttribute("name")=="src") {
        var gameUrl = gameParams[i].getAttribute("value");
      }
    }

    if(document.getElementById('cpenguin')){
      var gameUrl = "http://play.clubpenguin.com/load.swf";
    }

    window.open(gameUrl);

  }