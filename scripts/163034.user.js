// ==UserScript==
// @name           Hotmail Close Ad
// @namespace      http://indie-elitist.blogspot.com/
// @description    Closes the vertical far right ad column.
// @include        https://*.mail.live.com/*
// @include        http://*.mail.live.com/*
// ==/UserScript==

document.querySelector('div#RightRailContainer.t_sbgc').style.display="none";
document.querySelector('div#MainContent.t_mbgc.t_qtc.t_urtc').style["right"]=0;