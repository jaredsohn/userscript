// ==UserScript==
// @name          Userscripts enlaces directos Plus!
// @description   Añade enlaces directos para acciones de edicion, en el gestionador de script personales
// @version       1.20
// @namespace     Juampi_Mix
// @include       http://userscripts.org/home/scripts
// @include       http://userscripts.org/home/scripts/*
// @include       http://userscripts.org/home/scripts?*
// @exclude       http://userscripts.org/users/*/scripts
// @require       http://userscripts.org/scripts/source/60663.user.js
// @history       1.20 Modificado el nombre (me habia olvidado el Plus!)
// @history       1.10 Retoque en la version, para comprobar el actualizador.
// @history       1.00 Creacion del script

// ==/UserScript==
var table = document.getElementsByClassName('wide forums')[0];
if (!table) return;
var scriptTrs = table.getElementsByTagName('tr');
var scol = location.href.split('/')[3] == "home" ? 1 : 0;
var reviews = 0, posts = 0, fans = 0, installs = 0;
var luw = 0;
for (var i=1; i<scriptTrs.length; i++) {
  var tds = scriptTrs[i].getElementsByTagName('td');
  var reviewAnchor = tds[scol+1].getElementsByTagName('a')[0];
  if (reviewAnchor) reviews += parseInt(reviewAnchor.innerHTML);
  posts    += parseInt(tds[scol+2].innerHTML);
  fans     += parseInt(tds[scol+3].innerHTML);
  installs += parseInt(tds[scol+4].innerHTML);
  var oriclass = tds[scol+1].getAttribute('class');
  if (scol==1) { // own scripts page
    tds[scol].setAttribute('class',oriclass+' center');
    tds[scol].setAttribute('style','white-space:nowrap;');
  }
  tds[scol+1].setAttribute('class',oriclass+' center');
  tds[scol+2].setAttribute('class',oriclass+' right');
  tds[scol+3].setAttribute('class',oriclass+' right');
  tds[scol+4].setAttribute('class',oriclass+' right');
  tds[scol+5].setAttribute('class',oriclass+' center');
  iw = tds[scol+5].getElementsByTagName('abbr')[0].offsetWidth +5;
  if ( iw > luw ) luw = iw;
  var scriptID = /scripts-(\d+)/.exec(tds[scol].parentNode.id)[1],
      sourceLink = document.createElement('a'),
	  dlLink = document.createElement('a'),
	  span = document.createElement('span');
  sourceLink.href = 'http://userscripts.org/scripts/review/' +scriptID;
  sourceLink.innerHTML = 'view source';
  dlLink.href = 'http://userscripts.org/scripts/source/' +scriptID +'.user.js';
  dlLink.innerHTML = 'install';
  if (scol==0) {
	span.setAttribute('style','float:right;margin-right:5px;');
	span.appendChild(sourceLink);
	span.appendChild(document.createTextNode(' | '));
	span.appendChild(dlLink);
	el = tds[scol].getElementsByTagName('a')[0];
	el.parentNode.insertBefore(span,el);
  } else {
    var sourceEdit = document.createElement('a'),
	    imagesLink = document.createElement('a');
	sourceEdit.href = 'http://userscripts.org/scripts/edit_src/' +scriptID;
	imagesLink.href = 'http://userscripts.org/scripts/images/' +scriptID;
	sourceEdit.innerHTML = 'edit source';
	imagesLink.innerHTML = 'images';
	tds[scol].appendChild(document.createElement('br'));
	tds[scol].appendChild(sourceLink);
	tds[scol].appendChild(document.createTextNode(' | '));
	tds[scol].appendChild(sourceEdit);
	tds[scol].appendChild(document.createElement('br'));
	tds[scol].appendChild(imagesLink);
	tds[scol].appendChild(document.createTextNode(' | '));
	tds[scol].appendChild(dlLink);
  }
}
var tbody = table.getElementsByTagName('tbody')[0];
var totalTr = document.createElement('tr');
totalTr.id = 'scripts-total';
var td = document.createElement('td');
td.innerHTML = '<b>Totals</b>';
td.style.borderLeft = 0;
totalTr.appendChild(td);
for (var i=0; i<5+scol; i++) {
  td = document.createElement('td');
  td.className = 'right inv lp';
  totalTr.appendChild(td);
}
var totalTds = totalTr.getElementsByTagName('td');
totalTds[0].style.borderBottom = 0;
totalTds[scol+1].innerHTML = '<b>' + reviews + '</b>';
totalTds[scol+2].innerHTML = '<b>' + posts + '</b>';
totalTds[scol+3].innerHTML = '<b>' + fans + '</b>';
totalTds[scol+4].innerHTML = '<b>' + installs + '</b>';
if (scriptTrs[0].getElementsByTagName('th')[scol+5].getElementsByTagName('a')[0].offsetWidth+5 > luw)
  luw = scriptTrs[0].getElementsByTagName('th')[scol+5].getElementsByTagName('a')[0].offsetWidth+5;
scriptTrs[0].getElementsByTagName('th')[scol+5].style.width = luw+'px';
tbody.appendChild(totalTr);
GM_addStyle('td.right { text-align: right; } td.center { text-align: center; }');


ScriptUpdater.check(61572, '1.20');
ScriptUpdater.forceNotice(61572, '1.20');
ScriptUpdater.forceCheck(61572, '1.20');
function handleReturnedVersion(v) {
}
ScriptUpdater.check(61572, "1.20", handleReturnedVersion);