// ==UserScript==
// @name           Ieskok statuses
// @namespace      http://userscripts.org/users/91982
// @description    Parodo peržiūrėtas/rašytas/atsakytas anketas
// @include        http://*.ieskok.lt/*
// ==/UserScript==

window.getStatus = function(id) {
  return GM_getValue(id, "unviewed");
}


window.setStatus = function(id, stat) {
  GM_setValue(id, stat);
  GM_setValue("needsUpdate", true);
}

window.colorProfilesInListing = function() {
  // Ieskok has jquery
  var images = document.getElementsByClassName('pp_mf');
  for (var index = 0; index < images.length; index++) {
    var img = images[index];
    var id = idFromImg(img);
    var container = img.parentNode;
    var stat = getStatus(id);

    // Store original HTML
    var origHTML = container.getAttribute('origHTML');
    if (! origHTML) {
      container.setAttribute('origHTML', container.innerHTML);
      origHTML = container.getAttribute('origHTML');
    }

    if (stat == "viewed") {
      // Light green
      container.style.color = '#74FF60';
      container.innerHTML = origHTML + " / Peržiūrėta";
    }
    else if (stat == "wrote") {
      // Light blue
      container.style.color = '#ADDEFB';
      container.innerHTML = origHTML + " / Parašei tu";
    }
    else if (stat == "received") {
      // Some kind of brownish
      container.style.color = '#FFAA8F';
      container.innerHTML = origHTML + " / Parašė tau";
    }
    else if (stat == "chat") {
      // Orange
      container.style.color = '#FFBF00';
      container.style.fontWeight = 'bold';
      container.innerHTML = origHTML + " / Pokalbis";
    }

    if (container.style.color) {
      // Dark blue
      container.style.backgroundColor = '#2B303F';
    }
    else {
      container.style.backgroundColor = '#FFFFFF';
    }
  }

  GM_setValue("needsUpdate", false);
}

getStatus = window.getStatus;
setStatus = window.setStatus;

function idFromImg(img) {
  return img.src.match(/(\d+)\.jpg$/)[1];
}

var href = window.location.href;
var profileView = href.match(/ieskok\.lt\/anketa\.php\?id=(\d+)/) ||
  href.match(/^http:\/\/(\d+).ieskok.lt/);

// Profile view
if (profileView) {
  var id = profileView[1];
  var stat = getStatus(id);
  if (stat == "unviewed") {
    setStatus(id, "viewed");
  }

  if (stat == "unviewed" || stat == "viewed" || stat == "received") {
    var form = document.forms.namedItem('msgf');
    var button = form.elements.namedItem('hu1');
    button.addEventListener("click", function() {
      if (stat == "received") {
        setStatus(id, "chat");
      }
      else {
        setStatus(id, "wrote");
      }
    }, true);
  }
}
// Profiles listing
else if (href.match(/index\.php\?w=prisijunge/)) {
  window.colorProfilesInListing();

  // Periodicaly recolor to show changes.
  setInterval(function() {
    if (GM_getValue("needsUpdate", false)) {
      window.colorProfilesInListing();
    }
  }, 1000);
}
// Inbox
else if (href.match(/inod\.php$/) || href.match(/inod\.php\?.*?&mo=0/)) {
  var images = document.getElementsByClassName('imagemf');
  var length = images.length;
  for (var index = 0; index < length; index++) {
    var id = idFromImg(images[index]);
    var stat = getStatus(id);

    if (stat == "unviewed" || stat == "viewed") {
      setStatus(id, "received");
    }
    else if (stat == "wrote") {
      setStatus(id, "chat");
    }
  }
}
