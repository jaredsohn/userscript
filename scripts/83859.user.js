// ==UserScript==
// @name        La Guerre Des Fans
// @namespace   lgdf
// @description Soutenez votre membre prÃ©fÃ©rÃ© !
// @include     http://www.siteduzero.com/*
// @version     0.1
// ==/UserScript==

/** Constantes **/
const POSITION_TOP = 1;
const POSITION_BOTTOM = 2;

const LEGEND_SOUTIEN = 1;
const LEGEND_TROUE = 2;
const LEGEND_LOVE = 3;

/** Preferences **/
var prefs = {
  position: POSITION_TOP,
  legend: LEGEND_LOVE
};

function decode(str){
  str = str.replace(/&amp;/g,   '&');
  str = str.replace(/&quot;/g,  '"');
  str = str.replace(/&#039;/g,  '\'');
  str = str.replace(/&lt;/g,    '<');
  str = str.replace(/&gt;/g,    '>');
  return str;
}

// Forums
var divs = document.querySelectorAll('div.signature');

// Profil
var h3 = document.querySelector('h3#profil');

var colors = ['0000FF', '8A2BE2', 'A52A2A', 'DEB887', '5F9EA0', 'D2691E',
              'FF7F50', '6495ED', 'DC143C', '00008B', '008B8B', '006400',
              '8B008B', '556B2F', 'FF8C00', '8B0000', '2F4F4F', '4B0082',
              '808000', '4169E1', '9ACD32'];

// Forums
Array.prototype.forEach.call(divs, function(div){
  var link = div.innerHTML.match(/^<hr(?: \/)?><a href="\/forum-83-550351-p1-userscript-sdz-la-guerre-des-fans-1\.html\?m=(\d+)">#LGDF: (.+?) vaincra !/);
  
  if(link){
    var mid = link[1];
    var nick = link[2];
    var parent = div.parentNode.parentNode.parentNode.getElementsByTagName('td')[0];
    
    switch(prefs['legend']){
      case LEGEND_SOUTIEN:
        var text = document.createTextNode('Ce membre soutient ' + nick + '.');
        break;
      case LEGEND_TROUE:
        var text = document.createTextNode(nick + ' troue fane.');
        break;
      case LEGEND_LOVE:
        var text = document.createTextNode(nick + ' <3');
        break;
      default:
        var text = document.createTextNode(nick);   
    }
    
    var box = document.createElement('span');
    box.className = 'gras blanc';
    box.style.background = '#' + colors[(nick.charCodeAt(0) ^ nick.charCodeAt(1) ^ nick.charCodeAt(2)) % 21];
    box.style.border = '1px solid rgba(0, 0, 0, 0.3)';
    box.style.borderRadius = '5px';
    box.style.display = 'inline-block';
    box.style.margin = '2px';
    box.style.padding = '2px 5px';
    box.style.MozBackgroundOrigin = 'border';
    box.style.MozBorderRadius = '5px';
    box.style.WebkitBorderRadius = '5px';
    var a = document.createElement('a');
    a.href = 'http://www.siteduzero.com/membres-294-' + mid + '.html'
    
    box.appendChild(text);
    a.appendChild(box);
    
    if(prefs['position'] == POSITION_TOP){
      parent.insertBefore(document.createElement('br'), parent.firstChild);
      parent.insertBefore(a, parent.firstChild);
    }
    else{
      parent.appendChild(a);
    }
  }
});

// Profils
if(h3 && document.querySelector('div#mp_box')){
  var span = document.createElement('span');
  span.appendChild(document.createTextNode(' Devenir fan o/'));
  
  span.style.background = 'left center no-repeat url("/Templates/images/designs/2/etoile.png")';
  span.style.cssFloat = 'right';
  span.style.cursor = 'pointer';
  span.style.paddingLeft = '20px';
  
  var mid = location.href.match(/294-(\d+)/)[1];
  var nick = document.querySelector('h1').innerHTML.match(/^Profil de (.+)$/)[1];
  
  span.addEventListener('click', function(){
    this.innerHTML = 'Chargement&#133;';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/membres-341.html', true);
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200){
        var challenge = xhr.responseText.match(/value="(.+?)" name="challenge"/)[1];
        var quote = decode(xhr.responseText.match(/id="citat" value="(.*?)"/)[1]);
        var sig = decode(xhr.responseText.match(/cols="40" rows="15">([\s\S]*?)</)[1]);
        sig = sig.replace(/^<lien url="\/forum-83-550351-p1-userscript-sdz-la-guerre-des-fans-1\.html\?m=\d+">#LGDF: .+? vaincra !<\/lien>\s+/, '')
        sig = '<lien url="/forum-83-550351-p1-userscript-sdz-la-guerre-des-fans-1.html?m=' + mid + '">#LGDF: ' + nick + ' vaincra !</lien>\n' + sig;
        var xhr2 = new XMLHttpRequest();
        var params = 'challenge=' + challenge + '&citat=' + encodeURIComponent(quote) + '&sig=' + encodeURIComponent(sig) + '&send=Envoyer'
        
        xhr2.open('POST', '/membres-341.html', true);
        xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr2.setRequestHeader('Content-length', params.length);
        xhr2.setRequestHeader('Connection', 'close');
        xhr2.onreadystatechange = function(){
          if(xhr2.readyState == 4 && xhr2.status == 200){
            span.innerHTML = 'F&eacute;licitations :)';
          }
        };
        xhr2.send(params);
      }
    };
    xhr.send(null);
  }, false);
  h3.appendChild(span);
}