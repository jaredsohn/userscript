// ==UserScript==
// @name            Zhyper Shoutbox
// @namespace       http://github.com/darvid
// @description     Adds a shoutbox to the Zhyper WoW forums.
// @version         0.1
// @author          darvid
// @match           http://muonline.biz/wow/*
// @include         http://muonline.biz/wow/*
// ==/UserScript==

// Options:
var shoutboxHeight = "350px";
var parentContainerId = "vsa_fh_stats"; // f.ex: "breadcrumb", "vsa_fh_stats"
//

var shoutboxContainer = document.createElement("div");
shoutboxContainer.setAttribute("style", "border-bottom: 1px dashed #555;");
var shoutboxIFrame = document.createElement("iframe");
shoutboxIFrame.setAttribute("style", "width: 100%; height: " + shoutboxHeight + ";");
shoutboxIFrame.setAttribute("src", "http://zhyperwow.freeshoutbox.net");
shoutboxIFrame.setAttribute("frameBorder", "0");
shoutboxContainer.appendChild(shoutboxIFrame);

var parent = document.getElementById(parentContainerId);
parent.insertBefore(shoutboxContainer, parent.childNodes[0]);