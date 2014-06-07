// ==UserScript==
// @name           Flickr DNA
// @namespace      http://zoolcar9.lhukie.net/greasemonkey
// @include        http://www.flickr.com/*
// @include        http://flickr.com/*
// @description    Adds links to BigHugeLabs' Flickr DNA of selected person on buddy icon menu and your account on user's menubar.
// ==/UserScript==

// Last updated: 2008-01-15

var dna_url = "http://bighugelabs.com/flickr/dna.php?username=";
init_candyMenu();
init_personMenu();

function init_candyMenu() {
  var menu = document.getElementById("candy_nav_menu_you");
  if (!menu) return;

  var nsid = unsafeWindow.global_nsid;
  var name = unsafeWindow.photos_url.replace(/\/photos\//, "")
                                    .match(/[^\/]+/)
                                    .toString();

  var separator = document.evaluate("./a[starts-with(@href, " +
                                    "'/recent_activity.gne')]",
                                    menu, null, 9, null).singleNodeValue;

  var link = document.createElement("a");
  link.href = dna_url + (name ? name : nsid);
  link.appendChild(document.createTextNode("Your DNA"));
  menu.insertBefore(link, separator);
}

function init_personMenu() {
  var personHover = document.getElementById("person_hover");
  if (!personHover) return;

  var persons = ["other", "you"];

  for (var i in persons) {
    var menu = document.getElementById("person_menu_" + persons[i] +
                                       "_div");
    addDNAlink(menu, persons[i]);
    menu.addEventListener("DOMAttrModified", function(e) {
      updateDNAlink(this.id.replace(/div$/, "dna"),
                    personHover.wrappedJSObject.hover_icon.nsid);
    }, false);
  }
}

function addDNAlink(aNode, aUser) {
  var div = aNode.appendChild(document.createElement("div"));
  div.className = "menu_item_line_above";
  var lnk = div.appendChild(document.createElement("a"));
  lnk.id = "person_menu_" + aUser + "_dna";
  lnk.className = "block";
  lnk.appendChild(document.createTextNode("View DNA"));
}

function updateDNAlink(aID, aNSID) {
  var lnk = document.getElementById(aID);
  lnk.href = dna_url + aNSID;
}