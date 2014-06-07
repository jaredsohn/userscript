// ==UserScript==
// @name          LJ Skins: Class Adder
// @namespace     http://community.livejournal.com/ljskins/
// @description   Adds appropriate classes on the BODY tag to identify site schemes on LiveJournal, and to identify whether someone is logged in or out, if they're using Horizon or Vertigo.
// @include       http://*.livejournal.com/*
// @include       http://livejournal.com/*
// ==/UserScript==

(function() {
  var bodytag = document.getElementsByTagName("body").item(0);
  var navbar  = document.getElementById("NavBar");
  if (navbar) {
         if (navbar.parentNode.id == "Navigation")           { bodytag.className += "v1-generic horizon horizon-generic"; }
    else if (document.getElementById("utility-nav-wrapper")) { bodytag.className += "v1-generic vertigo vertigo-generic"; }
    else if (document.getElementById("content-inner"))       {
      // it's one of the v2 schemes
      bodytag.className += " v2-generic";
      // TODO: Find a way of detecting horizon2. Maybe through the LINK tag?
           if (document.getElementById("nav-vertical") && document.getElementById("nav-vertical").childNodes.item(1).childNodes.length > 1)
             { bodytag.className += " vertigo2 vertigo-generic"; }
      else   { bodytag.className += " horizon2 horizon-generic"; }
    }
    // we need to identify if the user is logged in or not. We can do this by seeing if the Userpic ID'd element
    // contains anything - if it does, we're logged in. (works even for users with no userpic)
    var userpicdiv = document.getElementById("Userpic");
    if (userpicdiv) {
      if (userpicdiv.childNodes.length >= 1) { bodytag.className += " loggedin";  }
                                        else { bodytag.className += " loggedout"; }
    }
  }
})();
