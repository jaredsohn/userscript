// ==UserScript==
// @name           OGame Redesign: Appunti
// @namespace      Appunti
// @description    Aggiunge un blocco appunti al menu di OGame
// @include        http://*.ogame.*/game*
// ==/UserScript==
function setCookie() {
  var dtOggi = new Date()
  var dtExpires = new Date()
  dtExpires.setTime
    (dtOggi.getTime() + 24 * 365 * 3600000)
  document.cookie = 'appunti' + "=" + escape(txtbox.value) +
    "; expires=" + dtExpires.toGMTString();
}

function getCookie(sNome) {
  var asCookies = document.cookie.split("; ");
  for (var iCnt = 0; iCnt < asCookies.length; iCnt++)
  {
    var asCookie = asCookies[iCnt].split("=");
    if (sNome == asCookie[0]) { 
      return (unescape(asCookie[1]));
    }
  }
  return("");
}

var divcnt = document.createElement('div');
divcnt.className = "content-box-s";
divcnt.style.position = "fixed";
divcnt.style.bottom = "20px";
divcnt.style.left = "10px";

var divhd = document.createElement('div');
divhd.className = "header";
divhd.innerHTML = "<h3>Appunti</h3>";

var divcnt2 = document.createElement('div');
divcnt2.className = "content";

var divft = document.createElement('div');
divft.className = "footer";

var txtbox = document.createElement('textarea');
txtbox.rows = 10;
txtbox.cols = 24;
txtbox.style.backgroundColor = "#274650";
txtbox.style.color = "#848484";
txtbox.style.border = "1px solid #141A1E";
txtbox.style.fontFamily = "Helvetica";
txtbox.style.fontSize = "12px";
txtbox.value = getCookie('appunti');
var btn = document.createElement('input');
btn.type = 'button';
btn.value = 'Salva';
btn.className ="buttonSave";
btn.style.color = "#ffffff";
btn.addEventListener('click', setCookie, true);
divcnt2.appendChild(txtbox);
divcnt2.appendChild(btn);
divcnt.appendChild(divhd);
divcnt.appendChild(divcnt2);
divcnt.appendChild(divft);
document.getElementById('inhalt').appendChild(divcnt);
