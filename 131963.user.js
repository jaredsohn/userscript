// ==UserScript==
// @name           Seelenseite-Reloaded
// @namespace      http://FACEdePALMA
// @version        1.4
// @include        http://www.dieverdammten.de/*
// @match          http://www.dieverdammten.de/*
// ==/UserScript==

// http://wiki.greasespot.net/Content_Scope_Runner
if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

// function hook
var oriFunc = window._tid.onLoad;
window._tid.onLoad = function() {
   check();
   return oriFunc.apply(window._tid);
};

function check() {
   // Wir sind auf der Seelenseite?
   if (document.location.hash.indexOf("ghost/user") === -1) {
      // nein -> fertig!
      return false;
   }
   
   // Auszeichnungsliste bereits vorhanden?
   if (document.querySelector("ul.levelList")) {
      window.console.log("already present");
      // dann sind wir hier fertig!
      return true;
   }
   
   window.console.log("check");
   // existiert ein tr-Element (Tabellenzeile) in der Errungenschaftenliste, bevor das Twinoid-Script die Hovertips verarbeitet hat (tid.Boot.checkTips), tid_parsed also noch nicht gesetzt?
   if (document.querySelector("div.tid_reachList tr.tid_tip:not(.tid_parsed)")) {
      // dann sind wir genau richtig!
      init();
      generateDistinctionList();
      moveTwinoidScore();
      addPlayerTitle();
   }
}

var g_userTitleSpan = null;
var g_userTitle = "";

function init() {
   // span-Element mit gewählten Spielertitel auswählen
   g_userTitleSpan = document.querySelector("span.tid_userTitle");
   // falls ein Titel vorhanden ist
   if (g_userTitleSpan) {
      // Titel ohne führende Leerzeichen etc. und eingeschlossen in "" in g_userTitle speichern
      g_userTitle = '"' + g_userTitleSpan.textContent.trim() + '"';
      window.console.log(g_userTitle);
   }
}

function generateDistinctionList() {
   window.console.log("generate");
   // bestimmten div-Container links auswählen, wo später die Auszeichnungsliste eingefügt wird
   var target = document.querySelector("div.tid_goals div.tid_links");
   
   // hier kommen alle seltenen Auszeichnungen rein
   var rareList = {};
   // alle seltenen Auszeichnungen aus der Seite auswählen
   var rare = document.querySelectorAll("div.tid_goalListWrapper > div.tid_rare");
   for (var i=0; i<rare.length; ++i) {
      // Icon-URL (als Id) = Anzahl
      rareList[rare[i].children[1].src] = parseInt(rare[i].children[0].children[0].textContent);
   }
   // Sortierung in absteigender Reihenfolge
   var descRare = Object.keys(rareList);
   descRare.sort(function(a,b) { return rareList[b]-rareList[a]; });

   // hier kommen alle normalen Auszeichnungen rein
   var normalList = {};
   // alle normalen Auszeichnungen aus der Seite auswählen
   var normal = document.querySelectorAll("div.tid_goalListWrapper > div:not(.tid_rare)");
   for (var i=0; i<normal.length; ++i) {
      // Icon-URL (als Id) = Anzahl
      normalList[normal[i].children[1].src] = parseInt(normal[i].children[0].children[0].textContent);
   }
   // Sortierung in absteigender Reihenfolge
   var descNormal = Object.keys(normalList);
   descNormal.sort(function(a,b) { return normalList[b]-normalList[a]; });

   // hier kommen alle Auszeichnungstitel rein
   var distList = {};
   var title_icon = "";
   // alle Titel (Errungenschaften) aus der Seite auswählen
   var elems = document.querySelectorAll("td.tid_name");

   // für jeden Titel
   for (var i=0; i<elems.length; ++i) {
      var title_text = "";
      var tip_text = "";
      // existiert ein Kind-Element, handelt es sich um das Icon...
      if (elems[i].firstElementChild) {
         title_icon = elems[i].firstElementChild.src;
      // ...ansonsten um den Titeltext
      } else {
         // trim() um unnötige Leerzeichen/Zeilenumbrüche zu entfernen
         title_text = elems[i].textContent.trim();
         // Hovertip-Text aus dem übergeordneten Element (Tabellenzeile) nehmen
         tip_text = elems[i].parentNode.title;
         // folgende Zeile aktivieren (Kommentierung aufheben), falls die erreichte Punktzahl statt der erforderlichen Punktzahl beim Hovertip zum Titel angezeigt werden soll
         //tip_text = tip_text.replace(/\d+$/, (normalList[title_icon] || rareList[title_icon]));
      }
      // auf die interne Liste (der höchste Titel ersetzt dabei evtl. seinen Vorgänger)
      distList[title_icon] = {'title': title_text, 'tiptext': tip_text};
   }
   
   // Auszeichnungsliste
   var distinctions = new DistinctionList();
   
   // seltene Auszeichnungen 
   for (var i=0; i<descRare.length; ++i) {
      // existiert zur Auszeichnung ein Titel?
      if (descRare[i] in distList) {
         // dann auf die Auszeichnungsliste setzen (true = selten)
            distinctions.addTitle(descRare[i], distList[descRare[i]].title, distList[descRare[i]].tiptext, true, (distList[descRare[i]].title == g_userTitle));
      }
   }
   
   // die übrigen Auszeichnungen
   for (var i=0; i<descNormal.length; ++i) {
      // existiert zur Auszeichnung ein Titel?
      if (descNormal[i] in distList) {
         // dann auf die Auszeichnungsliste (false = normal)
         distinctions.addTitle(descNormal[i], distList[descNormal[i]].title, distList[descNormal[i]].tiptext, false, (distList[descNormal[i]].title == g_userTitle));
      }
   }
   
   // Auszeichnungsliste in Seelenseite einfügen
   target.parentNode.insertBefore(distinctions.getList(), target);
}

function moveTwinoidScore() {
   window.console.log("move");
   // Div-Container mit der Twinoidpunktzahl auswählen
   var twinScoreDiv = document.querySelector("div.tid_overall");
   // die Punktzahl auslesen
   var twinScore = twinScoreDiv.innerHTML.trim();
   // den Div-Container mit der Twinoidpunktzahl aus der Seite entfernen
   twinScoreDiv.parentElement.removeChild(twinScoreDiv);
   // strong-Element erstellen und als Textinhalt die Punktzahl setzen
   var strong = document.createElement("strong");
   strong.textContent = twinScore;
   // img-Element erstellen und als Quelle die Seelenauszeichnungsgrafik setzen (andere Grafik als bei den Seelenpunkten)
   var img = document.createElement("img");
   img.src = "http://www.dieverdammten.de/img/icons/r_ptame.gif";
   // HTML-Textknoten erstellen
   var tn = document.createTextNode(" Twinoidpunktzahl: ");
   // br-Element (Zeilenumbruch) erstellen
   var br = document.createElement("br");
   // span-Element erstellen mit CSS-Klassenname "twinoidpoints" und allen zuvor erstellten Elementen
   var span = document.createElement("span");
   span.className = "twinoidpoints";
   span.appendChild(br);
   span.appendChild(img);
   span.appendChild(tn);
   span.appendChild(strong);
   // div-Container mit der Seelenpunktzahl auswählen
   var scoreContainer = document.querySelector("div.score");
   // den (einzigen) Link dort auswählen (Hilfe-Kasten)
   var help = scoreContainer.getElementsByTagName("a")[0];
   // neues span-Element mit Twinoidpunkten davor einfügen
   scoreContainer.insertBefore(span, help);
   // Hilfe-Kasten entfernen
   scoreContainer.removeChild(help);
}

function addPlayerTitle() {
   // falls ein Titel vorhanden ist
   if (g_userTitleSpan) {
      // linken oberen div Container auswählen
      var side = document.querySelector("div.side");
      if (side) {
         // und dort eine Kopie des Titel-Knoten einfügen
         side.appendChild(g_userTitleSpan.cloneNode(true));
      }
   }
}



// "Klasse" Auszeichnungsliste
var DistinctionList = function() {
   var _ul;
   
   // Ctor
   _ul = document.createElement("ul");
   _ul.className = "levelList";
   // Klick auf die Liste führt zum Twinoid-Titel-Ändern-Dialog
   _ul.setAttribute("onclick", "_tid.askTitleEdit()");
   
   // Methoden   
   this.getList = function() {
      return _ul;
   };
      
   this.addTitle = function(icon, title, tiptext, rare, selected) {
      // Auszeichnungs-Icon
      var img = document.createElement("img");
      img.className = "icon";
      img.setAttribute('src', icon);

      // Auszeichnungs-Text
      var span = document.createElement("span");
      span.textContent = title;
      
      // Listenelement erstellen
      var li = document.createElement("li");
      
      // "title"-Attribut mit Hovertip-Text erstellen (wird von der Twinoid-checkTips-Funktion benutzt)
      li.setAttribute("title", tiptext);
      
      // CSS-Klassenname "tid_tip", damit es von der Twinoid-checkTips-Funktion geparst wird
      li.className = "tid_tip";

      // bei seltenen Auszeichnungen die CSS-Klasse "rare" hinzufügen
      if (rare === true) {
         li.classList.add("rare");
      }
      // beim ausgewählten Titel die CSS-Klasse "selected" ergänzen
      if (selected === true) {
         li.classList.add("selected");
      }
      
      // Titel-Icon und Titel-Text zum Listenelement hinzufügen
      li.appendChild(img);
      li.appendChild(span);
      
      // Listenelement in Liste einfügen
      _ul.appendChild(li);
   };
};

// Workaround für Google Chrome
// Twinoid Funktion "initGoals" überschreiben um das Erzeugen eines Inline CSS-Styles zu unterdrücken
window._tid.initGoals = function() { return; };
