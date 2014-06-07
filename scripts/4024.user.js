// Google Video script, Copyright 2006, tk, under GPL license.
//
// ==UserScript==
// @name          Google Video script
// @namespace     http://tkhere.blogspot.com
// @description   Allows users to stream/download Google videos as avi files.
// @include       http://video.google.*/videoplay?docid=*
// ==/UserScript==

window.addEventListener("load", function(e) {
  function change_embed() {
    if (document.getElementById('VideoPlayback')) {
      var video = document.getElementById('VideoPlayback');
      if (video.style.display != 'none') {
        video.style.display = 'none';
        append_avinode();
        document.getElementById('flashkiller').innerHTML = 'Gimme back my flash!';
      }
      else {
        remove_avinode();
        video.style.display = 'block';
        document.getElementById('flashkiller').innerHTML = 'Kill the flash and watch the avi instead!';
      }
    }
  }
  
  function append_avinode() {
    if (document.getElementById('flashobjectplaceholder')) {
      var flashObj = document.createElement('embed');
      flashObj.style.width = '100%';
      flashObj.style.height = '100%'; 
      flashObj.style.display = 'block';
      flashObj.setAttribute('id', 'AviVideoPlayback');
      flashObj.setAttribute('align', 'middle');
      flashObj.setAttribute('src', document.getElementById('macdownloadlink').getAttribute('href'));
      document.getElementById('flashobjectplaceholder').appendChild(flashObj);
    }
  }
  
  function remove_avinode() {
    if (document.getElementById('flashobjectplaceholder').childNodes.length > 1) document.getElementById('flashobjectplaceholder').removeChild(document.getElementById('AviVideoPlayback'));
  }
  
  function get_random() {
    var ranNum= Math.floor(Math.random()*5);
    return ranNum;
  }

  function getQuote() {
    var ranQuote=get_random();
    var quote=new Array(5)
    quote[0]="Keeping it on my computer as an avi file!";
    quote[1]="posterity! Avi files rock!";
    quote[2]="fun! My harddisk doesn't have enough avi files!";   
    quote[3]="? You're asking me why I want this avi?!?";
    quote[4]="the sake of downloading avi files.";
    return quote[ranQuote]; 
  }

  if (document.getElementById('platform')) {
    var newoption = document.createElement('option');
    newoption.setAttribute('value', 'mac');
    newoption.appendChild(document.createTextNode(getQuote()));
    document.getElementById('platform').insertBefore(newoption, document.getElementById('platform').firstChild);
    var gvp = document.createElement('option');
    gvp.setAttribute('value', 'gvp');
    gvp.appendChild(document.createTextNode("Windows/Mac"));
    document.getElementById('platform').removeChild(document.getElementById('platform').childNodes[1]);
    document.getElementById('platform').insertBefore(gvp, document.getElementById('platform').childNodes[1]);
  }
  
  if (document.getElementById('description')) {
    var newline = document.createElement('p');
    var switch_embed = document.createElement('a');
    switch_embed.setAttribute('href', 'javascript:void(0);');
    switch_embed.addEventListener("click", change_embed, true);
    switch_embed.setAttribute('id', 'flashkiller');
    switch_embed.appendChild(document.createTextNode('Kill the flash and watch the avi instead!'));
    newline.appendChild(switch_embed);
    document.getElementById('description').insertBefore(newline, document.getElementById('description').firstChild);
  }
}, false);
