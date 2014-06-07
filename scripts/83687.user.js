// ==UserScript==
// @name        La Guerre Des Fans
// @namespace   lgdf
// @description Soutenez votre membre favori !
// @include     http://www.siteduzero.com/*
// @version     0.2
// ==/UserScript==

// Variables à modifier lignes 22 et 23.
/** Constantes **/
const POSITION_TOP = 1;
const POSITION_SIGNATURE = 2;
const POSITION_BOTTOM = 3;

const LEGEND_SOUTIEN = 1;
const LEGEND_TROUE = 2;
const LEGEND_LOVE = 3;
const LEGEND_VAINCRA = 4;

/** Preferences **/
var prefs = {
  position: POSITION_SIGNATURE,
  legend: LEGEND_VAINCRA,
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
    if(div.parentNode.className == 'boite_message'){
      var parent = div.parentNode.parentNode.parentNode.getElementsByTagName('td')[0];
    }
    else{
      var parent = div.parentNode.parentNode.getElementsByTagName('td')[0];
    }
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
      case LEGEND_VAINCRA:
        var text = document.createTextNode(nick + ' vaincra !');
        break;
      default:
        var text = document.createTextNode(nick);
    }
    
    var box = document.createElement('span');
    box.className = 'gras blanc';
    box.style.background = '#' + colors[(nick.charCodeAt(0) ^ nick.charCodeAt(1) ^ nick.charCodeAt(2)) % colors.length];
    box.style.border = '1px solid rgba(0, 0, 0, 0.3)';
    box.style.borderRadius = '5px';
    box.style.display = 'inline-block';
    box.style.margin = '2px';
    box.style.padding = '2px 5px';
    box.style.MozBackgroundOrigin = 'border';
    box.style.MozBorderRadius = '5px';
    box.style.WebkitBorderRadius = '5px';
    var a = document.createElement('a');
    a.href = 'http://www.siteduzero.com/membres-294-' + mid + '.html';
    box.appendChild(text);
    a.appendChild(box);
    switch(prefs['position']){
      case POSITION_TOP:
        parent.insertBefore(document.createElement('br'), parent.firstChild);
        parent.insertBefore(a, parent.firstChild);
        break;
      case POSITION_SIGNATURE:
        var divi = document.createElement('div');
        divi.style.textAlign = 'center';
        divi.appendChild(a);
        div.style.overflow = 'visible';
        div.removeChild(div.firstChild);
        div.removeChild(div.firstChild);
        if(div.firstChild.nodeName == 'BR'){
          div.removeChild(div.firstChild);
        }
        div.insertBefore(divi, div.firstChild);
        div.insertBefore(document.createElement('hr'), div.firstChild);
        div.style.height = (((div.offsetHeight) ? div.offsetHeight : div.style.pixelHeight) + 20) + "px";
        break;
      default:
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
  var nick = document.querySelector('h1').innerHTML.match(/^Profil du membre : +(.+)$/)[1];
  
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
            span.innerHTML = 'F&#233;licitations :)';
          }
        };
        xhr2.send(params);
      }
    };
    xhr.send(null);
  }, false);
  h3.appendChild(span);
}

// Merci a m@tteo78 pour ses ajouts au code !
// Merci a hilnius, Teol, @lex 3001, xababafr, Adroneus, Agbeladem, Tycale, et
// tous les autres pour leurs bug reports.
// Merci a delphiki pour la reouverture du topic.
// Merci a LIDL pour ses flammekueche pas cheres.
// Vous ne devriez pas lire les sources comme ça.
//
//   --- Iso