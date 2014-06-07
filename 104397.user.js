// ==UserScript==
// @name           Better 8Realms
// @namespace      Better 8Realms
// @description    Enhances 8Realms
// @include        https://secure.8realms.com/m=eightrealms_central/*/play
// @include        http://services.8realms.com/m=eightrealms1/*
// @resource       GMwavaudio http://www.ousob.com/wavfiles/CIRCLE_K.WAV
// @version        1.0.1
// ==/UserScript==

//Making audio stuff

var oggB64 = GM_getResourceURL("GMwavaudio");
var au = document.createElement('audio');
au.setAttribute('src', oggB64);
au.setAttribute('control', 'true');
au.setAttribute('id', 'GMwavaudio');
document.body.appendChild(au);

//Set global vars

var code = document.URL.split("/")[4];
var sName;
var unread = 0;

window.setInterval(function(){ 

//Check for new messages.

  var notify = document.getElementsByClassName('button icon as_notify');
    for (var i=0; i<notify.length; i++) {
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

//Add 'View on Map' button


  var backshadow = document.getElementsByClassName('backshadow');
  if ((!backshadow[0]) && (sName)) {
    sName = '';
  }

  var dTab = document.getElementsByClassName('details_tab');

  if (dTab[0]) {
    if (dTab[0].innerHTML != sName) {
      sName = dTab[0].innerHTML;

      var tDs = document.getElementsByClassName('troopDetails stationary');

      for (var i=0; i<tDs.length; i++) {
        var s = tDs[i].getElementsByClassName('stretchy7 stretch_half');
        var p2 = tDs[i].getElementsByClassName('part2');
        if (s[0]) {
          var t=new String(s[0].innerHTML).split("=");
          if (t[17]) {
            var x = t[11].split("&")[0];
            var y = t[12].split("&")[0];
          }
          else {
            var x = t[8].split("&")[0];
            var y = t[9].split("&")[0];
          }

          if (s[1]) {
            var span = document.createElement("span");
            span.className = 'stretchy7 stretch_half';
            span.innerHTML = '<span><span><a target="game_frame" href="/m=eightrealms1/' + code + '/worldmap?_type=%3A%3Aeightrealms%23worldmapRequest.v1&amp;sX=' + x + '&amp;sY=' + y + '&amp;cX=' + x + '&amp;cY=' + y + '">View on Map</a></span></span></span>';
            p2[1].appendChild(span);
          }
        }
      }
    }
  }
},1000);


//CSS fix thanks to soapy44

function addCSS(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addCSS('.empireWindow #list > .overbox > .mm > .overbox_inner { height: 270px; overflow-y: scroll; }')