// ==UserScript==
// @id             qlrankswebupdater@phob.net
// @name           QLRanks.com Web Updater
// @version        0.21
// @namespace      phob.net
// @author         wn
// @description    Update a player's QLRanks info from QLRanks.com
// @include        http://qlranks.com/*
// @include        http://*.qlranks.com/*
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/162868.meta.js
// ==/UserScript==


function getPos(el) {
  var o = { x: el.offsetLeft, y: el.offsetTop };
  while (el = el.offsetParent) {
    o.x += el.offsetLeft;
    o.y += el.offsetTop;
  }
  return o;
}


var RE_isPlayer = /^(?:\/(?:duel|tdm|ctf|ca)\/player\/(\w+)|http:\/\/www\.quakelive\.com\/#!profile\/summary\/(\w+))/i
  , allAnchors = Array.prototype.slice.call(document.getElementsByTagName("a"))
  , modalBox = document.createElement("div")
  , modalMsg = document.createElement("div")
  , updateBox = document.createElement("div")
  , updateLink
  , updateBoxActive = false
  , pendingRequest = false
  , hideTimeout
  , HIDE_DELAY = 1000
  ;

// Template of an UpdatePlayer request
var UPDATE_TEMPLATE = "<?xml version='1.0' encoding='utf-8'?>"
    + "<soap12:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap12='http://www.w3.org/2003/05/soap-envelope'>"
    + "<soap12:Body>"
    + "<UpdatePlayer xmlns='http://qlranksScanningEngine.qlranks.com'>"
    + "<playerName>{{PLAYER_NAME}}</playerName>"
    + "</UpdatePlayer>"
    + "</soap12:Body>"
    + "</soap12:Envelope>";


// Modal helpers
var modal = {
    interval: null
  , startTick: function (aDelay) {
      aDelay = aDelay || 1E3;
      modal.interval = window.setInterval(function() { modalMsg.innerHTML += "." }, aDelay);
    }

  , stopTick: function() {
      if (modal.interval) {
        window.clearInterval(modal.interval);
        modal.interval = null;
      }
    }

  , updating: function(aPlayer) {
      modalMsg.innerHTML = "<h3>Checking " + aPlayer + "</h3><br>"
                         + "Please wait for the update of <b>" + aPlayer + "</b> to complete";
      modalBox.style.display = "inline";
      modal.startTick();
    }

  , buildRow: function(aTitle, aKey, aLowIsGood, aStats) {
      var tmp = "<tr><td class='grey'><b>" + aTitle + "</b></td>"
        , newThing = aStats["New"+aKey]
        , oldThing = aStats["Previous"+aKey]
        ;
      if ((aLowIsGood && oldThing > newThing) || (!aLowIsGood && oldThing < newThing)) {
        tmp += "<td class='red'>" + oldThing + "</td><td class='green'>" + newThing + "</td>";
      }
      else if ((aLowIsGood && oldThing < newThing) || (!aLowIsGood && oldThing > newThing)) {
        tmp += "<td class='green'>" + oldThing + "</td><td class='red'>" + newThing + "</td>";
      }
      else {
        tmp += "<td>" + oldThing + "</td><td>" + newThing + "</td>";
      }
      return tmp + "</tr>";
    }

  , done: function(aStats) {
      modal.stopTick();

      var tmp = "";

      if (!(aStats.DuelScanned + aStats.TdmScanned + aStats.CtfScanned + aStats.CaScanned)) {
        tmp = "<h3>Nothing new for " + aStats.PlayerName + "!</h3><br>"
            + "There were no new matches to scan, but here are the results anyways:<br><br>";
      }
      else {
        tmp = "<h3>Successfully updated " + aStats.PlayerName + "!</h3><br>"
      }

      tmp += "<b>Matches Scanned:</b> " + aStats.DuelScanned + " Duel, " + aStats.TdmScanned + " TDM, " + aStats.CtfScanned + " CTF, " + aStats.CaScanned + " CA<br><br>"
           + "<table id ='modalTable'>"
           + "<thead><tr><th></th><th class='grey'>Old</th><th class='grey'>New</th></tr></thead>"
           + "<tbody>"
           + modal.buildRow("Duel Elo", "DuelElo", false, aStats)
           + modal.buildRow("Duel Rank", "DuelRank", true, aStats)
           + modal.buildRow("TDM Elo", "TdmElo", false, aStats)
           + modal.buildRow("TDM Rank", "TdmRank", true, aStats)
           + modal.buildRow("CTF Elo", "CtfElo", false, aStats)
           + modal.buildRow("CTF Rank", "CtfRank", true, aStats)
           + modal.buildRow("CA Elo", "CaElo", false, aStats)
           + modal.buildRow("CA Rank", "CaRank", true, aStats)
           + "</tbody>"
           + "</table>";

      modalMsg.innerHTML = tmp;
    }

  , close: function(aEvent) {
      modal.stopTick();
      if (pendingRequest && !window.confirm("Really close?  You won't see the results of "
          + "the update for " + updateLink.getAttribute("data-qlranks-player"))) {
        return;
      }
      modalBox.style.display = "none";
    }
}


// Stylin'
GM_addStyle(
    "#modalTable { border-collapse: collapse; text-align: center; }"
  + "#modalTable, #modalTable th, #modalTable td { border: 1px solid #000; padding: 5px; }"
  + "#modalTable td.grey, #modalTable th.grey { background: #ccc; }"
  + "#modalTable td.red { background: rgba(255,0,0,0.2); }"
  + "#modalTable td.green { background: rgba(0,255,0,0.2); }"
  + "#modalBox { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 100; background: #000; opacity: 0.9; }"
  + "#modalMsg { position: fixed; height: 380px; width: 250px; top: 50%; left: 50%; margin-left: -125px; margin-top: -150px; background: #fff;"
  + "            border: 1px solid #000; padding: 10px; text-align: left; }"
  + "#updateBox { display: none; position: absolute; z-index: 99; background: #ddd; border: 1px solid #8A3333; border-radius: 3px; padding: 2px }"
);


// Add the modal display
modalBox.id = "modalBox";
modalBox.onclick = modal.close;

modalMsg.id = "modalMsg";
modalMsg.onclick = function(aEvent) { aEvent.stopPropagation() };

modalBox.appendChild(modalMsg);
document.body.insertBefore(modalBox, document.body.firstChild);


// Add the Update widget
updateBox.id = "updateBox";
updateBox.innerHTML = "<a href='http://phob.net' id='updateLink'>Hello World</a>";
updateBox.onmouseover = function() { updateBoxActive = true };
updateBox.onmouseout = maybeHideUpdate;
document.body.insertBefore(updateBox, document.body.firstChild);

updateLink = document.getElementById("updateLink");
updateLink.onclick = function handleUpdateRequest(aEvent) {
  var thePlayer = updateLink.getAttribute("data-qlranks-player")
    , body
    ;

  aEvent.preventDefault();

  if (pendingRequest) {
    return window.alert("Please wait until the request for "
        + thePlayer + " has completed.");
  }

  pendingRequest = true;
  modal.updating(thePlayer);

  body = UPDATE_TEMPLATE.replace("{{PLAYER_NAME}}", thePlayer);

  GM_xmlhttpRequest({
      method: "POST"
    , url: "http://qlranksscanningengine.qlranks.com/qlranksscanningengine.asmx"
    , headers: {
          "Host": "qlranksscanningengine.qlranks.com"
        , "Content-Type": "application/soap+xml; charset=utf-8"
        , "Content-Length": body.length
      }
    , data: body
    , onload: processResponse
    , onerror: function(aResponse) {
        pendingRequest = false;
        window.alert("QLRanks request failed: " + aResponse.statusText);
      }
  });
}


// Process response data
function processResponse(aResponse) {
  pendingRequest = false;

  var parser = new DOMParser()
    , doc = parser.parseFromString(aResponse.responseText, "application/xml")
    , UpdatePlayerResult
    , ScanResults
    , result = {}
    ;

  // root > soap:Envelope > soap:Body > UpdatePlayerResponse > UpdatePlayerResult > TextNode
  UpdatePlayerResult = doc.getElementsByTagName("UpdatePlayerResult")[0];

  if (!UpdatePlayerResult) {
    window.alert("Sorry, there was a server problem.  Please try later.");
    return modal.close();
  }

  UpdatePlayerResult = UpdatePlayerResult.firstChild.data
                                                    .replace("&lt;", "<")
                                                    .replace("&gt;", ">");
  UpdatePlayerResult = parser.parseFromString(UpdatePlayerResult, "application/xml");

  ScanResults = UpdatePlayerResult.firstChild.children;

  for (var i = 0, e = ScanResults.length, content; i < e; ++i) {
    content = ScanResults[i].textContent;
    result[ScanResults[i].nodeName] = isNaN(content) ? content : parseInt(content);
  }
  modal.done(result);
}


// Handle a player link mouseover
function handleOnMouseOver(aEvent) {
  //var anchor = aEvent.originalTarget
  var anchor = aEvent.target
    , pos = getPos(anchor)
    , thePlayer = anchor.getAttribute("data-qlranks-player")
    ;

  updateBoxActive = true;

  updateBox.style.display = "block";
  updateBox.style.top = pos.y + "px";
  updateBox.style.left = (pos.x + anchor.offsetWidth + 5) + "px";

  // Wait for the previous request to complete before changing the link
  if (!pendingRequest) {
    updateLink.setAttribute("data-qlranks-player", thePlayer);
    updateLink.innerHTML = "Update " + thePlayer;
  }
}


// Wait a bit to see if we really need to hide the widget
function maybeHideUpdate(aEvent) {
  updateBoxActive = false;
  hideTimeout = window.setTimeout(function() {
    if (!updateBoxActive) {
      updateBox.style.display = "none";
    }
    hideTimeout = null;
  }, HIDE_DELAY);
}


// Process all player links
for (var i = 0, e = allAnchors.length; i < e; ++i) {
  var p = RE_isPlayer.exec(allAnchors[i].getAttribute("href"));
  if (null === p) continue;

  allAnchors[i].setAttribute("data-qlranks-player", p[1] || p[2]);
  allAnchors[i].onmouseover = handleOnMouseOver;
  allAnchors[i].onmouseout = maybeHideUpdate;
}
