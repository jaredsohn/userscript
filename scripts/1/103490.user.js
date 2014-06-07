// ==UserScript==
// @name           8Realms Audio
// @namespace      8Realms_Audio
// @description    Adds a sound effect to 8Realms when something has been completed.
// @include        http://www.8realms.com/*/play.ws
// @include        https://secure.8realms.com/m=eightrealms_central/*/play
// @include        http://services.8realms.com/m=eightrealms1/*/settlement
// @include        http://www.google.com.au/
// @resource       GMwavaudio http://www.ousob.com/wavfiles/CIRCLE_K.WAV
// ==/UserScript==

//Making audio stuff

var oggB64 = GM_getResourceURL("GMwavaudio");
var au = document.createElement('audio');
au.setAttribute('src', oggB64);
au.setAttribute('control', 'true');
au.setAttribute('id', 'GMwavaudio');
document.body.appendChild(au);

//Check for new messages.

var unread = 0;

window.setInterval(function(){ 
  var notify = document.getElementsByClassName('button icon as_notify');

    for (var i=0; i<notify.length; i++) {
        var thisElem = notify[i];
        newunread = notify[i].innerHTML;


        if (newunread>unread) {
          au.play();
          unread=newunread; //A new message!
        }

        if ((newunread < unread) && (newunread != '')) {
          unread=newunread; //A message was read, adjust.
        }

        if ((newunread == '') && (unread>0)) { 
          unread = 0; //All messages read, reset.
        }


  }
},1000);