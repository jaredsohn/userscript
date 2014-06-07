// Copyright (c) 2008, Nathaniel Tucker
// Released under the Creative Commons Attribution 3.0
// Version 20080808
// ==UserScript==
// @name           Fix FB Nav
// @namespace      facebook
// @description    Fixes Facebook's top navigation even when scrolling
// @include        http://www.new.facebook.com/*
// ==/UserScript==
function setNav() {
  var dropmenu_container = document.getElementById("dropmenu_container");
  var preview_bar = document.getElementsByClassName("fbnew_preview_bar")[0];
  var parent = dropmenu_container.parentNode;
  var firstChild;
  if (preview_bar) {
    firstChild = preview_bar;
  } else {
    firstChild = dropmenu_container;
  }

  // Drop-menu items should not be based on fixed location (new in 20080804)
  var container2 = document.createElement("div");
  container2.style.width      = "964px";
  container2.style.margin     = "0 auto";
  container2.style.position   = "relative";
  container2.style.height     = 0;
  container2.style.lineHeight = 0;
  container2.style.display    = "block"
  container2.style.padding    = 0;
  parent.insertBefore(container2, dropmenu_container);
  while (dropmenu_container.hasChildNodes()) {
    var tmp = dropmenu_container.firstChild;
    dropmenu_container.removeChild(tmp);
    container2.appendChild(tmp);
  }
  dropmenu_container = container2;

  // Fixes typeahead search not being fixed (new in 20080808)
  var searchbox = document.getElementById("q");
  function fixtypeahead() {
    var typeahead = document.getElementsByClassName("typeahead_search typeahead_list")[0];
    typeahead.style.position = "fixed";
    this.removeEventListener('focus', fixtypeahead, false);
  }
  searchbox.addEventListener('focus', fixtypeahead, false);

  // Construct fixed container
  var container = document.createElement("div");
  container.style.position = "fixed";
  container.style.width = "100%";
  container.style.zIndex = 20;
  
  // Place our fixed elements in new fixed container
  parent.insertBefore(container, firstChild);
  if (preview_bar) {
    parent.removeChild(preview_bar);
    container.appendChild(preview_bar);
  }
  parent.removeChild(dropmenu_container);
  container.appendChild(dropmenu_container);
  
  // Appropriately pad the content
  var content = document.getElementById("content");
  content.style.paddingTop = "24px";
  
  // Get rid of 1px white line at bottom of nav bar
  var fb_menubar = document.getElementById("fb_menubar");
  fb_menubar.style.clip = "rect(0px 9640px 28px 0px)";

}

document.onLoad = setNav();
