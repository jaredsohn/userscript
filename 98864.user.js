// ==UserScript==
// @name        Radpaper
// @namespace   http://jason.karns.name
// @version     1.1.0
// @grant       none
// @description Add a 'Radbox' action for sending Instapaper items to Radbox
// @match       http://www.instapaper.com/*
// @match       https://www.instapaper.com/*
// ==/UserScript==

Array.prototype.forEach.call(document.querySelectorAll('.tableViewCell'), function(item){
  var link = item.querySelector('.tableViewCellTitleLink');

  var radLink = document.createElement('a');
    radLink.textContent = "Radbox";
    radLink.className   = "actionLink";
    radLink.href        = "http://radbox.me/api/add?t="+ encodeURIComponent(link.textContent) +"&url="+ encodeURIComponent(link.href) +"&sr=Radpaper";
    radLink.target      = "_blank";

  var separator = document.createElement('span');
    separator.textContent = "\u2022 ";
    separator.className = "separator";

  var controls = item.querySelector('.secondaryControls');
    controls.appendChild(separator);
    controls.appendChild(radLink);
});
