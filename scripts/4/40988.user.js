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
// @name           VZT Extra
// @namespace      vztoolsaddon
// @description    Verschiedene Funktionen für StudiVZ (z.T. auch MeinVZ). Da die Entwicklung vom Ausgangsskript einen anderen Weg geht, habe ich mit Version 2.6 den Namen geändert. Sollte die Meldung für ein notwendiges Update trotz erfolgtem Update weiter erscheinen, muss bei Greasemonkey das alte Skript gelöscht (bzw. deaktiviert) werden. LIZENZ: GPL Version 2 (oder höher)
// @version				 2.6.0.3
// @include        http://*.meinvz.net/*
// @include        http://*.studivz.net/*
// @include        http://*.schuelervz.net/*
// ==/UserScript==
// Ursprungsversion unter http://userscripts.org/scripts/show/38483
// Versions-Information:
var version = "2.6.0.3";	//20100329
var versiondate = "29.03.2010"

var host = window.location.host;
var url = window.location.protocol + '//' + host + '/';
var siteName = host.slice(host.indexOf('.')+1, host.length);

var color1 = '#FFFFFF';
var color2 = '#FFFFFF';

if (siteName == 'meinvz.net') {
  color1 = '#ff781e';
  color2 = '#ffa05f';
}else{
  color1 = '#ee0000';
  color2 = '#ffa0a0';
}

var profId = document.evaluate('//ul[@id="Grid-Navigation-Main"]/li[2]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).wrappedJSObject;
    profId = profId.singleNodeValue.href
    profId = profId.substring(profId.indexOf('Profile/')+8, profId.length - 8);
    
var s_prefix = profId + "_";

// Funktioniert nicht mehr?
if (window.location.href.indexOf('Start') != -1) {
  var doesnotwork = document.createElement('div');
        doesnotwork.setAttribute('style','z-index: 5000; text-align: center; position: absolute; top: 0px; right: 0px; width: 280px; padding: 10px; height: 170px; background-color: #FF0000; color: #FFFFFF;');
    doesnotwork.innerHTML = '<h1>VZTExtra funktioniert nicht mehr!</h1><br />Dies kann verschiedene Ursachen haben. Bitte besuche die Projektseite auf userscripts.org, um nähere Informationen zu erhalten, ein Update zu installieren oder ein Problem zu melden.' +
                            '<br /><br /><a style="color: #FFFFFF" href="http://userscripts.org/scripts/show/40988" target="_blank">[Zur Projektseite]</a><br />' +
                            '<br /><a style="color: #FFFFFF" href="http://userscripts.org/scripts/discuss/40988" target="_blank">[Zum Diskussionsforum]</a><br />' +
                            '<br /><a style="color: #FFFFFF" href="/Groups/Overview/f1b245e816b2c967">[Zur Support-Gruppe]</a>';
    document.body.appendChild(doesnotwork);
}

1
window.addEventListener("load", function() {
   if (GM_getValue(s_prefix + 'hide_banners', 1) == 1) {
     removeMainAds();
   }
   if (GM_getValue(s_prefix + 'allow_savepics', 1) == 1) {
     allowSavePics();
   }
   if (GM_getValue(s_prefix + 'use_bookmarks', 1) == 1) {
     addNotes();
     addBookmarks();
   }
   // Einladungen überall
   if (GM_getValue(s_prefix + 'hide_invitation_everywhere', 0) == 1) {
     addGlobalStyle('#Grid-Page-Left #mod-invitation-invitationbox { display: none !important;}');
     addGlobalStyle('#Invitation-Importer-Snipplet .teaserbox { display: none !important;}');
   }
   // Toolbar einblenden
  if (GM_getValue(s_prefix + 'use_toolbar', 0) == 1) {
    showToolbar();
   }
   // Zusätzlichen Logout-Link
  if (GM_getValue(s_prefix + 'add_logout', 0) == 1) {
     additionalLogoutLink();
   }
	 },true);


	 
// Generelle Informationen sammeln

var host = window.location.host;
var siteName = host.slice(host.indexOf('.')+1, host.length);

// Hilfsfunktionen

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// == BEGINN Leiste oben ==
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
  var html = '<li><img src="'+friendsicon+'" valign="absmiddle" /> <span id="numfriends" title="Anzahl Deiner Freunde"></span> <a href="/Friends/Friends/'+profId+'/">Freunde</a></li>';
  html += '<li><img src="'+onlineicon+'" valign="absmiddle" /> <span id="numfriendsonline" title="Freunde online"></span> <a href="/Friends/Friends/'+profId+'/online/1">online</a></li>';
  if (GM_getValue(s_prefix + 'f_guestbook',1) == 1) {
    html += '<li onMouseOver="document.getElementById(\'lastguestbookd\').style.display = \'block\';" onMouseOut="document.getElementById(\'lastguestbookd\').style.display = \'none\';"><img src="'+gbicon+'" valign="absmiddle" /> <span id="numguestbook" title="Anzahl Pinnwandeinträge"></span> <a href="/Pinboard/'+profId+'/p/1">auf Pinnwand</a></li>';
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
  document.getElementById('Grid-Page-Left').insertBefore(topbar, document.getElementById('Grid-Navigation-Main'));
}
 
window.addEventListener("load", function() {
  if (GM_getValue(s_prefix + 'u_position', 0) == 0) {
    if (window.location.href.indexOf('Start') < 1) {
      displayNewOverview();
      getNumberOfFriends(false);
      getNumberOfFriends(true);
    }
  }
}, true); 
// == ENDE Leiste oben == 

// == BEGINN Pinnwand ==

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
       document.getElementById('numguestbook').innerHTML = numgb;
     
       var gbl = gb.getElementsByClassName('comment-metainfo')[0].wrappedJSObject.getElementsByClassName('profile')[0];
       var gbu = gb.getElementsByClassName('comment-metainfo')[0].wrappedJSObject.getElementsByClassName('profile')[0].innerHTML;
       document.getElementById('lastguestbook').innerHTML = '<a href="'+gbl+'">'+gbu+'</a>';
     
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

if (((window.location.href.indexOf('Profile') > 0) || (window.location.href.indexOf('Pinboard') > 0)) && (window.location.href.indexOf(profId) > 0)) {
  getNumberOfGuestbook(true);
}

// == ENDE Pinnwand ==

// == BEGINN Bilder ==

getNumberOfPictures = function(update) {
GM_xmlhttpRequest({
  method:"GET",
  url: url + "/Photos/Tags/"+profId,
  headers:{
    "User-Agent":"Mozilla/5.0", // Recommend using navigator.userAgent when possible
    "Accept":"text/xml"
  },
  onload:function(response) {
  var gb = document.createElement('div');
  gb.innerHTML = response.responseText;
  var gbi = trim(gb.getElementsByClassName('info')[0].wrappedJSObject.innerHTML);
  var numgb = gbi.split(" ")[3];

  if (!update) {
  document.getElementById('numpictures').innerHTML = numgb;
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

if ((window.location.href.indexOf('Tags') > 0) && (window.location.href.indexOf(profId) > 0)) {
 getNumberOfPictures(true);
}
// == ENDE Bilder ==


// == BEGINN Usability ==

// Zusätzlicher Logout-Link
function additionalLogoutLink() {
	var li_tag = document.createElement("li");
	var a_tag = document.createElement("a");
	a_tag.setAttribute('href', profId);
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
  } else {
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
  document.getElementById('vzt_config').addEventListener('click', showConfigDialog, true)
}

// Notizfunktion im Profil
function addNotes() {
  if (window.location.href.indexOf('Profile') > -1) {  
    var name = document.getElementById('Mod-Profile-Information-Account').getElementsByTagName('dd')[0].innerHTML;
    name = name.replace(/\s+$/,"").replace(/^\s+/,"");
    var id = window.location.href.substr(window.location.href.indexOf('Profile') + 8,43);
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

function remove(s, t) {
  /*
  **  Remove all occurrences of a token in a string
  **    s  string to be processed
  **    t  token to be removed
  **  returns new string
  */
  i = s.indexOf(t);
  r = "";
  if (i == -1) return s;
  r += s.substring(0,i) + remove(s.substring(i + t.length), t);
  return r;
  }


function removeFromNotesList(id) {
  GM_setValue(s_prefix + 'notes', remove(GM_getValue(s_prefix + 'notes', ""), id + '|'));
  
}

function addToNotesList(id) {
  GM_setValue(s_prefix + 'notes', GM_getValue(s_prefix + 'notes', "") + id + '|');
}

saveNote = function() {
  var name = document.getElementById('Mod-Profile-Information-Account').getElementsByTagName('dd')[0].innerHTML;
  name = name.replace(/\s+$/,"").replace(/^\s+/,"");
  var id = window.location.href.substr(window.location.href.indexOf('Profile') + 8,43);
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

toggleNotes = function() {
  if (document.getElementById('note').style.display == 'none') {
    document.getElementById('note').style.display = 'block';
  }else{
    document.getElementById('note').style.display = 'none';
  }
}

// == BEGINN Startseite und Werbung ==

// Letzte Profilbesucher austauschen
function swapVisitors() {
  if (document.getElementById('Visitors').getElementsByClassName('obj-thumbnaillist')[0]) {
    var content = document.getElementById('Visitors').getElementsByClassName('obj-thumbnaillist')[0].wrappedJSObject.innerHTML;
    document.getElementById('KdsList').innerHTML = content;
    document.getElementById('Kds').getElementsByTagName('h2')[0].innerHTML = 'Letzte Besucher';
    var counter = document.getElementsByClassName('visitorsCounter')[0].innerHTML;
    document.getElementById('Kds').getElementsByTagName('p')[0].innerHTML = counter + '<br /><br /><a href="'+url+'Visitors/LongList/">mehr Besucher...</a>';
    document.getElementById('Visitors').parentNode.removeChild(document.getElementById('Visitors'));
  }
}

// Nervtötende Werbung weg:
function removeMainAds() {
    if (document.getElementById('Grid-Advertising-Top')) {
      document.getElementById('Grid-Advertising-Top').innerHTML = "";
      document.getElementById('Grid-Advertising-Top').style.display = "none";
    }
    if (document.getElementById('Grid-Advertising-Right')) {
      document.getElementById('Grid-Advertising-Right').innerHTML = "";
      document.getElementById('Grid-Advertising-Right').style.display = "none";
    }
	//hinzugefuegt BJOG
	// "Telegramm"
    if (document.getElementById('ad280x50')) {
      document.getElementById('ad280x50').innerHTML = "";
      document.getElementById('ad280x50').style.display = "none";
    }
	// Werbeblock links unter dem Menü
    if (document.getElementById('ad125x125')) {
      document.getElementById('ad125x125').innerHTML = "";
      document.getElementById('ad125x125').style.display = "none";
    }
	// Werbeblock bei Gruppensuche
    if (document.getElementById('adRow-1')) {
      document.getElementById('adRow-1').innerHTML = "";
      document.getElementById('adRow-1').style.display = "none";
    }
	// Werbung nach Logout
    if (document.getElementById('ad300x250')) {
      document.getElementById('ad300x250').innerHTML = "";
      document.getElementById('ad300x250').style.display = "none";
    }

}


// == BEGINN Freundeslisten-Export ==
var index = 1;
var results = "";
var hashes = "";

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
         wnd.document.write("<script type='text/javascript'>alert('Fertig. Das Dokument kann nun über >>Datei/Seite speichern unter<< archiviert werden. Sollte angezeigt werden, dass die Seite noch immer lädt, hilft ein Druck auf die ESC-Taste.');</script>");
       }
       GM_setValue(s_prefix + 'friendslist', hashes);
       return false;
     }
     
     for ( var i=0 ; i < nodes.length; i++ ) {
            if (nodes[i].childNodes[1]){
                        if (nodes[i].childNodes[1].childNodes[1]){
                           var url = nodes[i].childNodes[1].childNodes[1].href;
                           var name = nodes[i].childNodes[1].childNodes[1].childNodes[1].alt;
                           var id = url.substring(url.length - 16, url.length);
                           results += '<tr><td>'+index+'</td><td>'+id+'</td><td><a href="'+url+'" target="_blank">'+ name + '</a></td></tr>';
                           hashes += id + '|||' + name + '§!=';
                           index++;
                        }
                }
         }
     loadFriendsRecursive(wnd, page + 1);
   }
 });
}

var differences = "";
var oldfriends = GM_getValue(s_prefix + 'friendslist', '');
var oldlist = oldfriends.split('§!=');

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
       // Todo: Differenzen anzeigen
       for each (var item in oldlist) {
         if (item != '') {
           differences += "<li>"+item.split('|||')[1] + "<a href='/Profile/"+item.split('|||')[0]+"/'> [Zum Profil]</a></li>";
         }
       }
       document.getElementById('friendalert').innerHTML += '<p align="left"><ul style="text-align: left;">'+differences+"</ul></p><a id='confirm_friends' href='javascript:void(null)'>[OK]</a>";
       document.getElementById('confirm_friends').addEventListener('click', removeLostFriendsAlert, true)
       return false;
     }
     
     for ( var i=0 ; i < nodes.length; i++ ) {
       var url = nodes[i].childNodes[1].childNodes[1].href;
       var name = nodes[i].childNodes[1].childNodes[1].childNodes[1].alt;
       var id = url.substring(url.length - 43, url.length);
       // Todo: Differenz überprüfen
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

exportFriends = function(event) {
  wnd = window.open('about:blank', '', '');
  wnd.document.write('Laden, bitte warten...');
  results = "";
  hashes = "";
  loadFriendsRecursive(wnd, 1);
}

//GM_registerMenuCommand('Freundesliste exportieren', exportFriends);

// == ENDE Freundeslisten-Export ==

// == BEGINN Freundesanzeige Startseite ==

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
         document.getElementById('numfriends').innerHTML = count;
       }else{
         document.getElementById('numfriendsonline').innerHTML = count;
       }
       return false;
     }
     countFriendsRecursive(online, page + 1, count);
   }
 });
}

function trim(s) {
  return s.replace(/\s+$/,"").replace(/^\s+/,"");
}

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
		 var count = temp.substring(8,temp.length - 53);
     document.getElementById('numfriends').innerHTML = count;
     // Neu hinzugekommene oder gelöschte Freunde?
     if (count != GM_getValue(s_prefix + 'friendscount', 0)) {
       //document.getElementById('store_friends').style.display = 'inline';
       // geloeschte Freunde?
       if (parseInt(count) < parseInt(GM_getValue(s_prefix + 'friendscount', 0))) {
         document.getElementById('friendalert').style.display = 'block';
         var deleted = parseInt(GM_getValue(s_prefix + 'friendscount', 0)) - parseInt(count);
         document.getElementById('friendalert').innerHTML = 'Du hast ' + deleted +' gelöschte Freundschaften!';
         differences = "";
         compareFriendsRecursive(1);
       }else{
        if (!checkUsage()) {
          if (confirm('Die Anzahl Deiner Freunde hat sich erhöht. Möchtest Du diesen neuen Wert speichern, um Fehlfunktionen zu vermeiden (empfohlen)?')) {
             results = "";
             hashes = "";
             loadFriendsRecursive(false, 1);
				     storeFriendsCount();           
          }
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

showFriendsOverview = function() {
  getNumberOfFriends(false);
  getNumberOfFriends(true);
//  if (GM_getValue(s_prefix + 'f_guestbook', 1) == 1) {
//    getNumberOfGuestbook(false);
//  }
  var friendsBox, insert;
  insert = document.getElementsByClassName("teaserbox")[1].getElementsByClassName('text')[0].wrappedJSObject;
  if (GM_getValue(s_prefix + 'f_position',0) == 0) {
    insert.innerHTML = "";
  }
  if (insert) {
  var prepare = '<h2 style="margin-bottom: 0px;"><div id="topsettings" style="padding-top: 2px; float: right; font-weight: normal; font-size: 7pt;"><a href="javascript:void(null)" id="vzt_config">konfigurieren</a></div> Was machen Deine Freunde?</h2>';

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
									'</ul>'+
									'<ul id="newguestbook" style="margin: 0px; padding: 0px; display: none;">'+
									'<li class="no-float" style="margin: 0px; padding-top: 2px; padding-bottom: 2px; border-bottom-style: solid"><div class="float-left" style="font-weight: bold;"><span id="numng">0</span> neue Pinwanndeinträge!</div><div class="float-right text-right"><a href="/Pinboard/'+profId+'/p/1">anzeigen</a></div></li>'+
									'</ul>';
	}
	if (GM_getValue(s_prefix + 'f_pictures',1) == 1) {
	  getNumberOfPictures(false);
	  prepare += '<ul style="margin: 0px; padding: 0px;">'+
		    '<li class="no-float" style="margin: 0px; padding-top: 2px; padding-bottom: 2px; border-bottom-style: solid;"><div class="float-left">Bildverlinkungen: <span id="numpictures"><i>zählen...</i></span></div>'+
			'</ul>'+
			'<ul id="newpictures" style="margin: 0px; padding: 0px; display: none;">'+
			'<li class="no-float" style="margin: 0px; padding-top: 2px; padding-bottom: 2px; border-bottom-style: solid"><div class="float-left" style="font-weight: bold;"><span id="numnp">0</span> neue Bildverlinkungen!</div><div class="float-right text-right"><a href="/Photos/Tags/'+profId+'">anzeigen</a></div></li>'+
			'</ul>';
	}
	}else{
    displayNewOverview();
	prepare = '<ul id="newguestbook" style="margin: 0px; padding: 0px; display: none; margin-bottom: 10px;">'+
            '<li class="no-float" style="margin: 0px; padding-top: 2px; padding-bottom: 2px; border-bottom-style: solid"><div class="float-left" style="font-weight: bold;"><span id="numng">0</span> neue Pinwanndeinträge!</div><div class="float-right text-right"><a href="/Pinboard/'+profId+'/p/1">anzeigen</a></div></li>'+
			'</ul>' +
			'<ul id="newpictures" style="margin: 0px; padding: 0px; display: none; margin-bottom: 10px;">'+
			'<li class="no-float" style="margin: 0px; padding-top: 2px; padding-bottom: 2px; border-bottom-style: solid"><div class="float-left" style="font-weight: bold;"><span id="numnp">0</span> neue Bildverlinkungen!</div><div class="float-right text-right"><a href="/Photos/Tags/'+profId+'">anzeigen</a></div></li>'+
			'</ul>'+prepare;
    }
  	prepare +=	'<br /> <div id="friendalert" style="display: none; margin-bottom: 10px; padding: 5px; background-color: #FFA0A0; font-weight: bold; text-align: center;"></div><div id="friends_details"></div>';
	insert.innerHTML += prepare;
    document.getElementById('vzt_config').addEventListener('click', showConfigDialog, true)
  }
}

storeFriendsCount = function() {
  GM_setValue(s_prefix + 'friendscount', document.getElementById('numfriends').innerHTML);
  alert('Die aktuelle Anzahl Deiner Freunde wurde gespeichert.');
}

removeLostFriendsAlert = function() {
  document.getElementById('friendalert').style.display = 'none';
  results = "";
  hashes = "";
  loadFriendsRecursive(false, 1);
	storeFriendsCount();
}

resetFriends = function() {
  GM_setValue(s_prefix + 'friendscount', 0);
  GM_setValue(s_prefix + 'friendslist', '');
  GM_setValue(s_prefix + 'num_guestbook', 0);
  alert('Die Statistiken zu Deinen Freunden und dem Gästebuch wurden zurückgesetzt');
}

checkUsage = function () {
  if ((GM_getValue(s_prefix + 'friendscount', 0) == 0) && (GM_getValue(s_prefix + 'friendslist', '') == '')) {
    if (confirm('Du hast die Freundes-Funktionen noch nicht benutzt. Möchtest Du jetzt alle für die korrekte Funktion benötigten Daten speichern?')) {
      results = "";
      hashes = "";
      loadFriendsRecursive(false, 1);
      storeFriendsCount(); 
    }
    return true;
  }else{
    if (GM_getValue(s_prefix + 'friendslist', '') == '') {
        if (confirm('Du hast noch keine Liste Deiner Freunde gespeichert. Möchtest Du dies jetzt nachholen, damit Dir beim Löschen von Freundschaften die Namen der gelöschten Freunde angezeigt werden?')) {
        results = "";
        hashes = "";
        loadFriendsRecursive(false, 1);
      }
      return true;
    }
  }
  return false;
}

// == ENDE Freundesanzeige Startseite ==

// == BEGINN Freundesdetails Startseite ==

var details = '';

var gfdr_count;

getFriendsDetailsRecursive = function(page) {
  if (page == 1) {
    gfdr_count = 0;
  }
  GM_xmlhttpRequest({
   method:"GET",
   url: url + "Friends/All/"+profId+"/p/"+page,
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
         // Ausgabe
         document.getElementById('friends_details').innerHTML = '<table cellspacing="0">'+details+'</table><br />&nbsp;';
         var piclinks = document.getElementsByName('picturelink');
         for (var n = 0; n < piclinks.length; n++) {
           piclinks[n].wrappedJSObject.addEventListener('click', showFriendsPicture, true);
         }
       return false;
     }
     
     var lastact = "";
     
     for ( var i=0 ; i < nodes.length; i++ ) {
       var url = nodes[i].childNodes[1].childNodes[1].href;
       var name = nodes[i].childNodes[1].childNodes[1].childNodes[1].alt;
       var pic = nodes[i].childNodes[1].childNodes[1].childNodes[1].src;
       var id = url.substring(url.length - 43, url.length);
       var status = "";
       var text = nodes[i].getElementsByClassName('microblog');
       if(text[1]) {
         var statuslength = text[1].getElementsByClassName('microblog-age')[0].innerHTML;
         text[1].removeChild(text[1].getElementsByClassName('microblog-age')[0]);
         status = trim(text[1].innerHTML);
         status = status.substring(0, status.length - 4);
       }
       var output = false;
       var out = "";
       var updated = nodes[i].getElementsByClassName('lastUpdate');
       if ((updated[0]) && (GM_getValue(s_prefix + 'f_profile',1) == 1)) {
         updated = updated[0].innerHTML;
	       if ((updated) && (((lastact == "") || (updated == lastact)) && (page == 1))) {
	         var updatetype = nodes[i].getElementsByClassName('lastUpdateTypeName')[0].innerHTML;
	         if ((updatetype) && (updatetype != "(Ist gerade ...)")) {
	           if (updatetype == "") {
	             updatetype = "etwas";
	           }
	           lastact = updated;
	           if (updatetype == "(Profilfoto)") {
	             out += '<b>hat <span name="picturelink" id="'+pic+'" title="'+name+'s neues Profilfoto anzeigen" style="font-style: italic; border-bottom: 1px dotted #000000; cursor: pointer;">'+updatetype.substring(1,updatetype.length - 1)+'</span> aktualisiert.</b>';
	           }else{
	             out += '<b>hat <span style="font-style: italic;">'+updatetype.substring(1,updatetype.length - 1)+'</span> aktualisiert.</b>';
	           }
	           output = true;
	         }
	       }
       }
      if ((status != "") && (GM_getValue(s_prefix + 'f_status',1) == 1)) {
        if (out != "") {
          out += "<br /><br />";
        }
        out += '&raquo; '+status+' &laquo; <small style="color: #C0C0C0;">'+statuslength+'</small>';
        output = true;
      }
      if ((output) && (gfdr_count < GM_getValue(s_prefix + 'f_num', 10))) {
        gfdr_count++;
        if (GM_getValue(s_prefix + 'f_details_tabular', 1) == 0) {
          details += '<tr><td valign="top" style="border-bottom: 1px solid #C0C0C0;"><nobr><b><a href="'+url+'">'+ name + '</a>:&nbsp;</b></nobr>'+out+'</td></tr>';
        }else{
          details += '<tr><td valign="top" style="border-bottom: 1px solid #C0C0C0;"><nobr><b><a href="'+url+'">'+ name + '</a>:&nbsp;</b></nobr></td><td style="border-bottom: 1px solid #C0C0C0;">'+out+'</td></tr>';
        }
      }
     }
     getFriendsDetailsRecursive(page + 1);
   }
 });
}

if (window.location.href.indexOf('Start') > 0) {
  showFriendsOverview();
  if (GM_getValue(s_prefix + 'f_details', 1) == 1) {
    getFriendsDetailsRecursive(1);
  }
  window.addEventListener("load", function() {
   hideColumns();
   if (GM_getValue(s_prefix + 'swap_visitors', 0) == 1) {
     swapVisitors();
   }
   if (GM_getValue(s_prefix + 'show_bookmarks', 0) == 1) {
     showBookmarksAndNotes();
   }
	 },true);

} else {  //hinzugefuegt BJOG
  window.addEventListener("load", function() {
   hideColumns();
   if (GM_getValue(s_prefix + 'f_visitors', 0) == 1) {
     swapVisitors();
   }
  },true);
}

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
  
  // Telegramm
  if (GM_getValue(s_prefix + 'hide_telegram', 0) == 1) {
    if (document.getElementById('telegram_staticContent')) {
      document.getElementById('telegram_staticContent').parentNode.removeChild(document.getElementById('telegram_staticContent'));
    }
  }
  
  // AhaOho
  if (GM_getValue(s_prefix + 'hide_ahaoho', 0) == 1) {
    addGlobalStyle('#AdLinkAhaOhoBirthdayCard { display: none !important;}');
  }

  
  // Einladungen
  if (GM_getValue(s_prefix + 'hide_invitation', 0) == 1) {
    addGlobalStyle('#mod-invitation-invitationbox { display: none !important;}');
    addGlobalStyle('#Invitation-Importer-Snipplet { display: none !important;}');
//    addGlobalStyle('#mod-invitation-invitationbox-content { display: none !important;}');
  }
  
  // Neuigkeiten
  if (GM_getValue(s_prefix + 'hide_news', 0) == 1) {
    addGlobalStyle('#news_staticContent { display: none !important;}');
  }
  
  //hinzugefuegt BJOG

  // Roten Footer weg
  if (GM_getValue(s_prefix + 'no_red_footer', 0) == 1) {
    if (document.getElementById('Grid-Page-Center-Footer')) {
      document.getElementById('Grid-Page-Center-Footer').parentNode.removeChild(document.getElementById('Grid-Page-Center-Footer'));
	}
  }
  // Buschfunk weg
  if (GM_getValue(s_prefix + 'no_buschfunk', 0) == 1) {
    if (document.getElementById('Mod-Feedbox-Snipplet')) {
      document.getElementById('Mod-Feedbox-Snipplet').parentNode.removeChild(document.getElementById('Mod-Feedbox-Snipplet'));
	}
  }
  // Roehre weg
  if (GM_getValue(s_prefix + 'no_roehre', 0) == 1) {
    if (document.getElementById('gadget-menu-header')) {
      document.getElementById('gadget-menu-header').parentNode.removeChild(document.getElementById('gadget-menu-header'));
	}
  }
  // meinVZ-Generve weg
  if (GM_getValue(s_prefix + 'nicht_verb', 0) == 1) {
    if (document.getElementById('Not_Connected')) {
      document.getElementById('Not_Connected').parentNode.removeChild(document.getElementById('Not_Connected'));
	}
  }
  // Plauderkasten weg - weil unverbunden oder ungewollt
  if (GM_getValue(s_prefix + 'no_talk', 0) == 1) {
    if (document.getElementById('Chat_Header')) {
      document.getElementById('Chat_Header').parentNode.removeChild(document.getElementById('Chat_Header'));
	}
  }
  // Photo-Slider
  if (GM_getValue(s_prefix + 'photo_slider', 0) == 1) {
    if (document.getElementById('Snipplet-Photos-Slider')) {
      document.getElementById('Snipplet-Photos-Slider').parentNode.removeChild(document.getElementById('Snipplet-Photos-Slider'));
	}
  }
  // Spruchkasten links
  if (GM_getValue(s_prefix + 'linke_box', 0) == 1) {
    if (document.getElementById('LeftsideBox')) {
      document.getElementById('LeftsideBox').parentNode.removeChild(document.getElementById('LeftsideBox'));
	}
  }

}

// == ENDE Anpassungen der Seiten ==


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
/*    case "handle5":
        document.getElementById('tab5').style.display = 'block';
      break; */
    case "handle6":
        document.getElementById('tab6').style.display = 'block';
      break;
    case "handle7":
        document.getElementById('tab7').style.display = 'block';
      break;
	//hinzugefuegt BJOG weil Extrawunsch
    case "handle8":
        document.getElementById('tab8').style.display = 'block';
      break;
  }
}

function showConfigDialog() {

  var text = "";
	text += "<div id='handle1' class='tabhandle' style='background-color: "+color2+"; cursor: pointer; font-weight: bold; border: 1px solid "+color1+"; border-bottom: none; padding: 4px;float: left;'>Startseite</div>";
	text += "<div id='handle2' class='tabhandle' style='cursor: pointer; font-weight: bold; border: 1px solid  "+color1+"; border-bottom: none; border-left: none; padding: 4px;float: left;'>Werbung</div>";
	text += "<div id='handle7' class='tabhandle' style='cursor: pointer; font-weight: bold; border: 1px solid  "+color1+"; border-bottom: none; border-left: none; padding: 4px;float: left;'>Überblick</div>";
	text += "<div id='handle8' class='tabhandle' style='cursor: pointer; font-weight: bold; border: 1px solid  "+color1+"; border-bottom: none; border-left: none; padding: 4px;float: left;'>Übersicht</div>";
	text += "<div id='handle3' class='tabhandle' style='cursor: pointer; font-weight: bold; border: 1px solid  "+color1+"; border-bottom: none; border-left: none; padding: 4px;float: left;'>Benutzbarkeit</div>";
	text += "<div id='handle4' class='tabhandle' style='cursor: pointer; font-weight: bold; border: 1px solid  "+color1+"; border-bottom: none; border-left: none; padding: 4px;float: left;'>Wartung</div>";
//	text += "<div id='handle5' class='tabhandle' style='cursor: pointer; font-weight: bold; border: 1px solid  "+color1+"; border-bottom: none; border-left: none; padding: 4px;float: left;'>exp.</div>";
	text += "<div id='handle6' class='tabhandle' style='cursor: pointer; font-weight: bold; border: 1px solid  "+color1+"; border-bottom: none; border-left: none; padding: 4px;float: left;'>Hilfe</div>";
	
  text += "<div style='position: relative; clear: both; width: 480px; height: 390px; border: 1px solid  "+color1+";'>";
  
  // Tab1 "Startseite"
  text += "<div id='tab1' class='tabpage' style='width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";
  
  text += "<h2>Spalten ausblenden</h2><br />";
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

	text += "<h2>Elemente ausblenden/umordnen</h2><br />";

	text += "<input type='checkbox' id='vt_f_remove_invitation' ";
  if (GM_getValue(s_prefix + 'hide_invitation', 0) == 1) {
    text += "checked";
  }
	text += "> &quot;Neue Leute einladen&quot;/&quot;Adressbuch checken&quot; ausblenden ";
	
	text += "(<input type='checkbox' id='vt_f_remove_invitation_everywhere' ";
  if (GM_getValue(s_prefix + 'hide_invitation_everywhere', 0) == 1) {
    text += "checked";
  }
	text += "> Überall)<br />";
	
	text += "<input type='checkbox' id='vt_f_swap_visitors' ";
  if (GM_getValue(s_prefix + 'swap_visitors', 0) == 1) {
    text += "checked";
  }
	text += "> Letzte Profilbesucher statt &quot;Kennst Du schon?&quot; anzeigen<br /><br />";

  text += "</div>";

  // Tab7 "Ueberblick"
  text += "<div id='tab7' class='tabpage' style='display: none; width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";

  text += "<h2>Überblick</h2><br />";
    // Gaestebuchanzeige
  text += "<input type='checkbox' id='vt_f_show_guestbook' ";
  if (GM_getValue(s_prefix + 'f_guestbook', 1) == 1) {
    text += "checked";
  } text += "> Anzahl von Pinnwandeinträgen anzeigen<br />";

  text += "<input type='checkbox' id='vt_f_show_gb_last_author' ";
  if (GM_getValue(s_prefix + 'f_gb_last_author', 0) == 1) {
    text += "checked";
  } text += "> Autor des letzten Beitrags anzeigen<br />";

  text += "<input type='checkbox' id='vt_f_show_pictures' ";
  if (GM_getValue(s_prefix + 'f_pictures', 1) == 1) {
    text += "checked";
  } text += "> Anzahl von Bildverlinkungen anzeigen<br />"; 

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
    text += "</select><br /><br />"; 

  //Freunde-Ticker
  text += "<input type='checkbox' id='vt_f_show_details' ";
  if (GM_getValue(s_prefix + 'f_details', 1) == 1) {
    text += "checked";
  } text += "> Details zu Aktivitäten Deiner Freunde anzeigen<br />";
  text += "<input type='checkbox' id='vt_f_show_details_tabular' ";
  if (GM_getValue(s_prefix + 'f_details_tabular', 1) == 1) {
    text += "checked";
  } text += "> Details tabellarisch anzeigen<br />";

  //
  text += "<input type='checkbox' id='vt_f_show_profile' ";
  if (GM_getValue(s_prefix + 'f_profile', 1) == 1) {
    text += "checked";
  } text += "> Profil-Aktualisierungen anzeigen<br />";
  text += "<input type='checkbox' id='vt_f_show_status' ";
  if (GM_getValue(s_prefix + 'f_status', 1) == 1) {
    text += "checked";
  } text += "> Microblogs anzeigen<br />";
  text += "Maximale Anzahl von Einträgen auf der Startseite: <input type='text' size='2' maxlength='2' id='vt_f_max' ";
  text += "value='"+GM_getValue(s_prefix + 'f_num',10)+"'";
  text += "/><br /><br />";

  text += "Position: <select size='1' id='vt_f_position' >";
  text += "<option value='0' ";
  if (GM_getValue(s_prefix + 'f_position', 0) == 0) {
    text += "selected";
  } text += ">Willkommens-Text ersetzen</option>";
    text += "<option value='1' ";
    if (GM_getValue(s_prefix + 'f_position', 0) == 1) {
      text += "selected";
    }
    text += ">Unterhalb des Willkommenstextes</option>";
    text += "</select><br /><br />";

  text += "</div>";

  // Tab2 "Werbung"
  text += "<div id='tab2' class='tabpage' style='display: none; width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";
  text += "<h2>Werbung auf der Startseite</h2><br />";
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

  if (siteName != 'meinvz.net') {
	  text += "<input type='checkbox' id='vt_f_remove_telegram' ";
    if (GM_getValue(s_prefix + 'hide_telegram', 0) == 1) {
      text += "checked";
    }
	text += "> &quot;Telegramm&quot; ausblenden<br />";
  }
  
	text += "<input type='checkbox' id='vt_f_remove_ahaoho' ";
  if (GM_getValue(s_prefix + 'hide_ahaoho', 0) == 1) {
    text += "checked";
  }
	text += "> &quot;Glückwunschkarte per Post&quot; (AhaOho) ausblenden<br /><br />";
	text += "<h2>Werbung außerhalb der Seite</h2><br />";
	text += "<input type='checkbox' id='vt_f_hide_banners' ";
  if (GM_getValue(s_prefix + 'hide_banners', 1) == 1) {
    text += "checked";
  }
	text += "> Bannerwerbung ausblenden<br /><br />";
  text += "</div>";
  
  // Tab 3 "Benutzbarkeit"
  text += "<div id='tab3' class='tabpage' style='display: none; width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";
  text += "<h2>Allgemeine Ärgernisse</h2><br />";
	text += "<input type='checkbox' id='vt_f_allow_savepics' ";
  if (GM_getValue(s_prefix + 'allow_savepics', 1) == 1) {
    text += "checked";
  }
	text += "> Abspeichern von Bildern ermöglichen<br /><br />";
	text += "<h2>Funktionserweiterungen</h2><br />";
	text += "<input type='checkbox' id='vt_f_use_bookmarks' ";
  if (GM_getValue(s_prefix + 'use_bookmarks', 1) == 1) {
    text += "checked";
  }
	text += "> Benutzer-Notizen einschalten<br />";
	
	text += "<input type='checkbox' id='vt_f_show_bookmarks' ";
  if (GM_getValue(s_prefix + 'show_bookmarks', 0) == 1) {
    text += "checked";
  }
	text += "> Benutzer-Notizen auf der Startseite anzeigen<br /><br />";

	text += "<h2>Kleinigkeiten</h2><br />";
	text += "<input type='checkbox' id='vt_f_add_logout' ";
	if (GM_getValue(s_prefix + 'add_logout', 0) == 1) {
		text += "checked";
	}
	text += "> Zusätzlicher Logout-Link in der linken Navigationsleiste<br />";

 	text += "</div>";

  // Tab 4: "Wartung"
  text += "<div id='tab4' class='tabpage' style='display: none; width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";
  text += "<h2>Sonstiges und Wartung</h2><br />";
	text += "&raquo; <a href='javascript:void(null)' id='v_reset'>Gespeicherte Informationen zurücksetzen</a><br />";
	text += "&raquo; <a href='javascript:void(null)' id='v_export'>Freundesliste exportieren</a><br /><br />";
	text += "<h2>Skript-Updates</h2><br />";
	text += "Du setzt derzeit die Skript-Version "+version+" ein. ";
	if (version < global_update) {
	  text += "<br /><b>Aktuell ist jedoch die Version "+global_update+".</b><br /><br />";
	  text += "<center><a href='http://userscripts.org/scripts/source/40988.user.js'><big><b>Jetzt updaten!</b></big></a></center><br /><br />";
	}else{
	  text += "Damit bist Du auf dem neuesten Stand.<br />";
	  text += "<br />";
	  text += "&raquo; <a href='javascript:void(null)' id='v_update'>jetzt auf Skript-Updates prüfen</a><br />";
	}
	text += "</div>";
	
	// Tab 6: "Hilfe"
	text += "<div id='tab6' class='tabpage' style='display: none; width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";
	text += "<h2>Hilfe, Support und Feature Requests</h2><br />";
	text += "Das Skript funktioniert nicht so wie es soll, Du hast Anregungen oder es zerreißt Dir die komplette Seite oder andere Skripts?<br />";
	text += "&raquo; <a href='/Groups/Overview/f1b245e816b2c967'>Zur Support-Gruppe (StudiVZ/MeinVZ)</a><br /><br />";
	text += "&raquo; <a href='http://userscripts.org/scripts/discuss/40988' target='_blank'>Wünsche dieser Version?</a><br /><br />";
	text += "<h2>Neuigkeiten?</h2><br />";
	text += "Du willst wissen, welche Features die neueste Version hinzugefügt hat?<br />";
	text += "&raquo; <a href='http://userscripts.org/scripts/show/40988' target='_blank'>Zur Projektseite der Erweiterungen</a><br /><br />";
	text += "</div>";
	
  // Tab8: "Uebersicht_2"
  //hinzugefuegt BJOG
  text += "<div id='tab8' class='tabpage' style='display: none; width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";
  text += "<h2>Anzeigen verändern</h2><br />";
	text += "<input type='checkbox' id='vt_f_no_red_footer' ";
    if (GM_getValue(s_prefix + 'no_red_footer', 0) == 1) {
      text += "checked";
    }
	text += "> Dicken roten Footer der Seite ausblenden<br /><br />";

	text += "<input type='checkbox' id='vt_f_no_buschfunk' ";
    if (GM_getValue(s_prefix + 'no_buschfunk', 0) == 1) {
      text += "checked";
    }
	text += "> Buschfunk komplett ausblenden<br /><br />";

	text += "<input type='checkbox' id='vt_f_no_roehre' ";
    if (GM_getValue(s_prefix + 'no_roehre', 0) == 1) {
      text += "checked";
    }
	text += "> Roehre entfernen<br /><br />";

	text += "<input type='checkbox' id='vt_f_no_talk' ";
    if (GM_getValue(s_prefix + 'no_talk', 0) == 1) {
      text += "checked";
    }
	text += "> Plauderkasten entfernen<br /><br />";

	text += "<input type='checkbox' id='vt_f_nicht_verb' ";
    if (GM_getValue(s_prefix + 'nicht_verb', 0) == 1) {
      text += "checked";
    }
	text += ">meinVZ-Verbindungshinweise ausblenden<br /><br />";

	text += "<input type='checkbox' id='vt_f_photo_slider' ";
      if (GM_getValue(s_prefix + 'photo_slider', 0) == 1) {
        text += "checked";
      }
	text += "> Mini Fotoalben-Slider in den Profilen entfernen<br /><br />";

	text += "<input type='checkbox' id='vt_f_linke_box' ";
      if (GM_getValue(s_prefix + 'linke_box', 0) == 1) {
        text += "checked";
      }
	text += "> Sprüchebox links entfernen<br /><br />";

  text += "</div>";
  
  // Tab 5: "Experimentell"
  text += "<div id='tab5' class='tabpage' style='display: none; width: 460px; padding: 10px; position: absolute; top: 0px; left: 0px;'>";
  text += "<h2>Experimentelle Funktionen</h2><br />";
	text += "<input type='checkbox' id='vt_f_use_toolbar' ";
  if (GM_getValue(s_prefix + 'use_toolbar', 0) == 1) {
    text += "checked";
  }
	text += "> Taskbar verwenden<br /><i>Blendet eine Taskbar im Stil von Facebook ein</i><br /><br />";
	text += "<h2>Warnung</h2><br />";
	text += "<b>Die Funktionen, die sich hier aktivieren lassen, befinden sich noch in Entwicklung. Es ist davon auszugehen, daß Fehlfunktionen auftreten oder daß einzelne Funktionselemente nicht verfügbar sind.</b>";
	text += "</div>";
	
	text += "</div><br />";

	
  text += '<br /><br /><center><a href="javascript:void(null)" id="savecd" ><b>[Speichern]</b></a> <a href="javascript:void(null)" id="closecd" ><b>[Abbrechen]</b></a></center>';
  cdialog = unsafeWindow.Phx.UI.Dialog.ButtonDialog(
                        'VZT Extra - Einstellungen',
                        {
                            'message' : text,
                            'buttons' : [ ]
                        });
  cdialog.show();
  if (document.getElementById('v_update')) {
    document.getElementById('v_update').addEventListener('click',updateScript,false);
  }
  document.getElementById('v_reset').addEventListener('click',resetFriends,false);
  document.getElementById('v_export').addEventListener('click',exportFriends,false);
  document.getElementById('closecd').addEventListener('click',function (e) {cdialog.close();},false);
  document.getElementById('savecd').addEventListener('click',saveVZTConfig,false);
  
  document.getElementById('handle1').addEventListener('click', swapTabs, false);
  document.getElementById('handle2').addEventListener('click', swapTabs, false);
  document.getElementById('handle3').addEventListener('click', swapTabs, false);
  document.getElementById('handle4').addEventListener('click', swapTabs, false);
//  document.getElementById('handle5').addEventListener('click', swapTabs, false);
  document.getElementById('handle6').addEventListener('click', swapTabs, false);
  document.getElementById('handle7').addEventListener('click', swapTabs, false);
  document.getElementById('handle8').addEventListener('click', swapTabs, false);	//hinzugefuegt BJOG
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
  if (document.getElementById('vt_f_remove_showcase').checked) {
    GM_setValue(s_prefix + 'hide_showcase',1);
  }else{
    GM_setValue(s_prefix + 'hide_showcase',0);
  }
  if (siteName != 'meinvz.net') {
    if (document.getElementById('vt_f_remove_telegram').checked) {
      GM_setValue(s_prefix + 'hide_telegram',1);
    }else{
      GM_setValue(s_prefix + 'hide_telegram',0);
    }
  }
  if (document.getElementById('vt_f_remove_ahaoho').checked) {
    GM_setValue(s_prefix + 'hide_ahaoho',1);
  }else{
    GM_setValue(s_prefix + 'hide_ahaoho',0);
  }
  if (document.getElementById('vt_f_remove_invitation').checked) {
    GM_setValue(s_prefix + 'hide_invitation',1);
  }else{
    GM_setValue(s_prefix + 'hide_invitation',0);
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
  //hinzugefuegt BJOG
  //roter Footer der Site
  if (document.getElementById('vt_f_no_red_footer').checked) {
    GM_setValue(s_prefix + 'no_red_footer',1);
  }else{
    GM_setValue(s_prefix + 'no_red_footer',0);
  }
  //buschfunk
  if (document.getElementById('vt_f_no_buschfunk').checked) {
    GM_setValue(s_prefix + 'no_buschfunk',1);
  }else{
    GM_setValue(s_prefix + 'no_buschfunk',0);
  }
  //Roehre
  if (document.getElementById('vt_f_no_roehre').checked) {
    GM_setValue(s_prefix + 'no_roehre',1);
  }else{
    GM_setValue(s_prefix + 'no_roehre',0);
  }
  //Plauderkasten
  if (document.getElementById('vt_f_no_talk').checked) {
    GM_setValue(s_prefix + 'no_talk',1);
  }else{
    GM_setValue(s_prefix + 'no_talk',0);
  }
  //meinVZ Verbindungsnerven
  if (document.getElementById('vt_f_nicht_verb').checked) {
    GM_setValue(s_prefix + 'nicht_verb',1);
  }else{
    GM_setValue(s_prefix + 'nicht_verb',0);
  }
  // Photo-Slider
  if (document.getElementById('vt_f_photo_slider').checked) {
    GM_setValue(s_prefix + 'photo_slider',1);
  }else{
    GM_setValue(s_prefix + 'photo_slider',0);
  }
  // linke Box
  if (document.getElementById('vt_f_linke_box').checked) {
    GM_setValue(s_prefix + 'linke_box',1);
  }else{
    GM_setValue(s_prefix + 'linke_box',0);
  }
  //Gaestebuch anzeigen
  if (document.getElementById('vt_f_show_guestbook').checked) {
    GM_setValue(s_prefix + 'f_guestbook',1);
  }else{
    GM_setValue(s_prefix + 'f_guestbook',0);
  }
  //Letzter Autor
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
  alert("Deine Einstellungen wurden gespeichert. Sie treten nach einem Seiten-Refresh in Kraft.");
  cdialog.close();
}

// sucht nun auf der Seite der Erweiterung
// Originalskript unter http://userscripts.org/scripts/show/38483
function updateScript() {
  GM_xmlhttpRequest({
   method:"GET",
   url: "http://userscripts.org/scripts/show/40988",
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(response) {
     var update_info = document.createElement('div');
     update_info.innerHTML = response.responseText;
     var last_update = update_info.getElementsByClassName('date')[0].wrappedJSObject.innerHTML;
     last_update = last_update.replace(/\s+$/,"").replace(/^\s+/,"");
     last_update = last_update.substring(12, last_update.length);
     if (confirm("Die neueste Version stammt vom "+last_update+". Du besitzt die Version vom "+versiondate+".\nMöchtest Du zur Userscripts-Projektseite wechseln?")) {
       window.open("http://userscripts.org/scripts/show/40988","","");
     }
   }
	 });
}

var global_update;

function checkForUpdates() {
   GM_xmlhttpRequest({
   method:"GET",
   url: "http://userscripts.org/scripts/show/40988",
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml"
   },
   onload:function(response) {
     var update_info = document.createElement('div');
     update_info.innerHTML = response.responseText;
     var last_update = update_info.wrappedJSObject.getElementsByTagName('span')[6].innerHTML;
     global_update = last_update;
     
     if (version < last_update) {
       if ((last_update.search('minutes') == -1) && (last_update.search('hour') == -1)) {
         var insert = document.getElementById("Grid-Page-Left");
         var update_message = document.createElement('div');
         update_message.setAttribute('class','update');
         update_message.innerHTML += "<b>Ein Update für VZT Extra ist verfügbar!</b><br /><br />"+
										"Deine Version: "+version+"<br /><b>Neue Version: "+global_update+"</b><br /><br />" + 
										"<center><a href='http://userscripts.org/scripts/source/40988.user.js' id='go_update'>[updaten]</a><br /><br /><a href='http://userscripts.org/scripts/show/40988' target='_blank' id='go_update'>[was ist neu?]</a></center></div>";
         addGlobalStyle('.update {width: 110px;  margin-top: 10px; padding: 5px; background-color: #FFA0A0; color: #FFFFFF; border: 1px solid #FF0000;}');
         addGlobalStyle('.update a {color: #FFFFFF; font-weight: bold;}');
         insert.wrappedJSObject.appendChild(update_message);
       }
     }
   }
	 });
}

GM_registerMenuCommand('VZT Extra - Einstellungen', showConfigDialog);

checkForUpdates();

// == ENDE Konfiguration ==

// == BEGINN Toolbar ==

// WIDGETS

// == BEGINN Grafiken ==
var icon_visible = "data:image/gif,GIF89a%14%00%14%00%87%00%00%FF%00%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%03%00%00%00%00%2C%00%00%00%00%14%00%14%00%00%08H%00%01%08%1CH%B0%A0%C1%83%08%13*%5C%C8Pa%80%87%01%1A%02%80H1%A2%C3%87%04!%26%C4(%90%E3D%8B%05%3DR%1C%E8%B1%23%C8%8A'A%9A%24%A9q%A5A%91)7%96l)%13%A5%C4%91%12s%EA%DC%C9%B3'%C2%80%00%3B";
var icon_invisible = "data:image/gif,GIF89a%14%00%14%00%87%00%00%FF%00%00%FF%00%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%03%00%00%01%00%2C%00%00%00%00%14%00%14%00%00%08e%00%03%08%1CH%B0%A0%C1%83%08%13*L%08%40aC%83%00%22%0A%14%40Q%80%C0%88%0F%07b%8CX%B1%E2F%88%1F5bD%B8%11%00%C5%8D%16%0D%9E%2C9%92bA%97%01Xf%849%10%26%CB%89)_Z%BCIS%A5L%93%0E%7Ff%04%89q%E5H%A2%12E%1EU%9A%94%60%C9%82K%A16u%EAp%A1%D5%00%01%01%00%3B";
var icon_online = "data:image/gif,GIF89a%14%00%14%00%87%00%00%FF%00%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%03%00%00%00%00%2C%00%00%00%00%14%00%14%00%00%08F%00%01%08%1CH%B0%A0%C1%83%08%13%16%0C%C00%80%C2%85%04%1D%3E%04%201%E2%C4%8A%16%15b%9C8p%23%C7%86%1C%3B%8A%0CY%D1c%C2%86%0CCR%1C%F9%91%E5%C7%94*%05%9A%84H%F3%E1%C6%99%06Q%E2%8Cy0%20%00%3B";
var icon_offline = "data:image/gif,GIF89a%14%00%14%00%87%00%00%FF%00%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%03%00%00%00%00%2C%00%00%00%00%14%00%14%00%00%08C%00%01%08%1CH%B0%A0%C1%83%08%13%16%0C%C00%80%C2%85%04%1D%3E%04%201%E2%C3%86%06%2Bf%1C%A8%F1%22%C7%89%1C%1Bv%F48%92%24%C8%93(O%8A%2C%89%B0%22%CB%83.%15v%C4%E8%D1%22%C8%95)S%06%04%00%3B";
// == ENDE Grafiken == 

// Notification-Widget ein- und ausschalten:
function toggleNotificationArea() {
  if (document.getElementById('widget_notify') && (GM_getValue(s_prefix + 'w_notify', 0) == 1)) {
    document.getElementById('widget_notify').style.display = 'none';
    GM_setValue(s_prefix + 'w_notify', 0);
  }else{
    GM_setValue(s_prefix + 'w_notify', 1);
    if (document.getElementById('widget_notify')) {
      document.getElementById('widget_notify').style.display = 'block';
    }else{
      getNotificationWidget();
    }
  }
}

function getNotificationWidget() {
  var nwidget = document.createElement('div');
      nwidget.setAttribute('style', 'display: block; float: right; padding-left: 5px; padding-right: 5px; border-left: 1px solid #FFFFFF; color: #FFFFFF; padding-top: 4px; margin-top: 4px; height: 20px;');
      nwidget.setAttribute('id','widget_notify');
      nwidget.innerHTML = '<img id="priv" src="'+icon_visible+'" /><img id="visible" src="'+icon_online+'" /><span id="msgc"></div>';
      document.getElementById('taskbar').appendChild(nwidget);
      updateNotificationWidget();
      window.setInterval(updateNotificationWidget, 10000);
}

var updateNotificationWidget = function() {
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
            document.getElementById('priv').src = icon_visible;
            document.getElementById('priv').setAttribute('title', 'Deine Profilbesuche sind für andere sichtbar.');
				 }else{
				    document.getElementById('priv').src = icon_invisible;
				    document.getElementById('priv').setAttribute('title', 'Deine Profilbesuche sind für andere NICHT sichtbar.');
				 }
			 }
			 if (pv[n].getAttribute('id') == 'pvcHideOnlineStatus_1') {
         if (pv[n].checked) {
            document.getElementById('visible').src = icon_offline;
            document.getElementById('visible').setAttribute('title', 'Für andere Nutzer erscheinst Du OFFLINE.');
				 }else{
				    document.getElementById('visible').src = icon_online;
            document.getElementById('visible').setAttribute('title', 'Für andere Nutzer erscheinst Du ONLINE.');
				 }
       }
     }
   }
	 });
}

// Widgets initialisieren
function initWidgets() {
  if (GM_getValue(s_prefix + 'w_notify', 1) == 1) {
    getNotificationWidget();
  }
}

// DARSTELLUNG TOOLBAR UND STARTMENÜ, EVENTHANDLER:

// Startmenü-Eventhandler
function startMenuClickEvent(evt) {
  if (evt.target.id == 'sm_settings') {
    showConfigDialog();
  }
}

function startMenuHoverEvent(evt) {
  // Bei onHover bei speziellen Startmenüeinträgen
  var submenus = document.getElementsByClassName('submenu');
  for (var n = 0; n < submenus.length; n++) {
    submenus[n].wrappedJSObject.style.display = 'none';
  }
  if (evt) {
    if (evt.target.id == 'sm_widgets') {
      document.getElementById('sub_widgets').style.display = 'block';
    }
    if (evt.target.id == 'sm_pictures') {
      document.getElementById('sub_gallery').style.display = 'block';
    }
    if (evt.target.id == 'sm_history') {
      document.getElementById('sub_history').style.display = 'block';
    }
    if (evt.target.id == 'sm_bookmarks') {
      document.getElementById('sub_bookmarks').style.display = 'block';
    }
  }
}

function widgetMenuClickEvent(evt) {
  if (evt.target.id == 'w_notification') {
    toggleNotificationArea();
  }
}

function getStartMenu() {
  addGlobalStyle('div#startmenu { z-index: -1; display: none; position: absolute;  bottom: 33px; height: 250px; width: 180px; border: 2px solid '+color1+'; background-color: '+color2+'; -moz-border-radius: 5px;}');
  addGlobalStyle('a.startmenu { cursor: pointer; display: block; color: #FFFFFF; height: 18px; border-bottom: 1px solid #FFFFFF; padding: 7px; padding-left: 32px; font-size: 12px; font-weight: bold; }');
  addGlobalStyle('a.startmenu:hover { text-decoration: none; background-color: #fff0e1; color: '+color1+'; }');
  
  addGlobalStyle('.submenu a { cursor: pointer; display: block; color: #FFFFFF; height: 10px; border-bottom: 1px solid #FFFFFF; padding: 5px;  padding-top: 3px; font-size: 11px; font-weight: bold; }');
  addGlobalStyle('.submenu a:hover { text-decoration: none; background-color: #fff0e1; color: '+color1+'; }');
  
  addGlobalStyle('.submenu h3 { display: block; color: #FFFFFF; border-bottom: 2px solid '+color1+'; font-size: 10pt; padding-left: 5px;}');
  var result = "<div id='startmenu'>";
  // Startmenüeinträge:
  result += "<strike><a class='startmenu' id='sm_history'><span style='float: right; font-size: 12pt; font-weight: bold;'>&rsaquo;</span> History</a></strike>";
  result += "<strike><a class='startmenu' id='sm_bookmarks'><span style='float: right; font-size: 12pt; font-weight: bold;'>&rsaquo;</span> Bookmarks</a></strike>";
  result += "<strike><a class='startmenu' id='sm_pictures'><span style='float: right; font-size: 12pt; font-weight: bold;'>&rsaquo;</span> Bilder & Galerien</a></strike>";
  result += "<a class='startmenu' id='sm_widgets'><span style='float: right; font-size: 12pt; font-weight: bold;'>&rsaquo;</span> Widgets</a>";
  result += "<a class='startmenu' id='sm_settings'>Einstellungen</a>";
  result += "<a class='startmenu' href='"+url+"Logout' id='sm_logout'>Logout</a>";
  result += "</div>";
  
  // Untermenü "Widgets":
  addGlobalStyle('div#sub_widgets { z-index: 0; display: none; position: absolute;  bottom: 48px; left: 180px; height: 150px; width: 150px; border: 1px solid '+color1+'; background-color: '+color2+'; -moz-border-radius: 5px;}');
  result += "<div id='sub_widgets' class='submenu'>";
  result += "<h3>Widgets</h3>";
  result += "<a class='widgetmenu' id='w_notification'>Benachrichtigungen</a>";
  result += "<strike><a class='widgetmenu' id='w_gmonster'>Gruschelmonster</a></strike>";
  result += "<strike><a class='widgetmenu' id='w_friends'>Freunde</a></strike>";
  result += "<strike><a class='widgetmenu' id='w_groups'>Gruppen</a></strike>";
  result += "</div>";
  
  // Untermenü "Bilder & Galerien":
  addGlobalStyle('div#sub_gallery { z-index: 0; display: none; position: absolute;  bottom: 75px; left: 180px; height: 150px; width: 150px; border: 1px solid '+color1+'; background-color: '+color2+'; -moz-border-radius: 5px;}');
  result += "<div id='sub_gallery' class='submenu'>";
  result += "<h3>Bilder & Galerien</h3>";
  result += "</div>";
  
  // Untermenü "Bookmarks":
  addGlobalStyle('div#sub_bookmarks { z-index: 0; display: none; position: absolute;  bottom: 75px; left: 180px; height: 200px; width: 150px; border: 1px solid '+color1+'; background-color: '+color2+'; -moz-border-radius: 5px;}');
  result += "<div id='sub_bookmarks' class='submenu'>";
  result += "<h3>Bookmarks</h3>";
  result += "</div>";
  
  // Untermenü "History":
  addGlobalStyle('div#sub_history { z-index: 0; display: none; position: absolute;  bottom: 75px; left: 180px; height: 220px; width: 150px; border: 1px solid '+color1+'; background-color: '+color2+'; -moz-border-radius: 5px;}');
  result += "<div id='sub_history' class='submenu'>";
  result += "<h3>History</h3>";
  result += "</div>";
  
  return result;
}

function addToolbarHandlers() {
  document.getElementById('startbutton').addEventListener("click", function() {document.getElementById('startmenu').style.display = 'block';}, false);
  document.body.addEventListener("click", function() {document.getElementById('startmenu').style.display = 'none'; startMenuHoverEvent();}, true);
  var sm_items = document.getElementsByClassName('startmenu');
  for (var n = 0; n < sm_items.length; n++) {
    sm_items[n].wrappedJSObject.addEventListener("click", startMenuClickEvent, false);
    sm_items[n].wrappedJSObject.addEventListener("mouseover", startMenuHoverEvent, false);
  }
  var sm_items = document.getElementsByClassName('widgetmenu');
  for (var n = 0; n < sm_items.length; n++) {
    sm_items[n].wrappedJSObject.addEventListener("click", widgetMenuClickEvent, false);
  }
}

function getStartButton() {
  addGlobalStyle('div#startbutton { cursor: pointer; position: absolute; left: 10px; top: -28px; border: 2px solid '+color1+'; -moz-border-radius: 10px; width: 76px; height: 52px; background-color: '+color2);
  addGlobalStyle('div#startbutton:hover { border: 2px solid #c86428; background-color: #fff0e1');
  var result = "<div id='startbutton' title='Klicke hier, um weitere Funktionen aufzurufen'>";
  if (siteName == 'meinvz.net') {
    result += "<img src='http://static.pe.meinvz.net/20090126-0/Img/logo.png' width='60' style='margin-left: 8px; margin-top: 10px;'/>";
  }else{
    result += "<img src='http://static.pe.studivz.net/20090126-0/Img/logo.png' width='60' style='margin-left: 8px; margin-top: 10px;'/>";
  }
  result += "</div>";
  return result;
}

function zeroPad(num,count)
{
var numZeropad = num + '';
while(numZeropad.length < count) {
numZeropad = "0" + numZeropad;
}
return numZeropad;
}

var updateTime = function() {
  var now = new Date;
  document.getElementById('taskbar_clock').wrappedJSObject.title = now.toLocaleString();
  document.getElementById('taskbar_clock').innerHTML = zeroPad(now.getHours(), 2) + ':' + zeroPad(now.getMinutes(), 2);
}

function getTaskbarClock() {
  addGlobalStyle('div#taskbar_clock { font-weight: bold; padding-top: 4px; text-align: center; float: right; height: 20px; margin-top: 4px; color: #FFFFFF; width: 60px; border-left: 1px solid #FFFFFF; }');
  var now = new Date;
  var result = '<div id="taskbar_clock" title="'+now.toLocaleString()+'">'+zeroPad(now.getHours(), 2) + ':' + zeroPad(now.getMinutes(), 2)+'</div>';
  window.setInterval(updateTime, 5000);
  return result;
}

function showToolbar() {
  addGlobalStyle('div#taskbar { cursor: default; position: fixed; margin-left: 10%; margin-right: 10%; bottom: 0px; z-index: 2000; width: 80%; height: 34px; -moz-border-radius-topleft: 5px; -moz-border-radius-topright: 5px; background-color: '+color1+' }');
  var toolbar = document.createElement('div');
  toolbar.setAttribute('id', 'taskbar');
  toolbar.innerHTML = getStartButton();
  toolbar.innerHTML += getStartMenu();
  toolbar.innerHTML += getTaskbarClock();
  document.getElementsByClassName('javascript-enabled')[0].wrappedJSObject.appendChild(toolbar);
  if (document.getElementById('topsettings')) {
    document.getElementById('topsettings').style.display = 'none';
  }
  addToolbarHandlers();
  initWidgets();
}

// == ENDE Toolbar ==

if (doesnotwork) {
  doesnotwork.style.display = 'none';
}