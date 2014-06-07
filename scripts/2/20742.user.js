// ==UserScript==
// @name           InvisionForums
// @namespace      MaemoForums
// @description    Nokia Tablet style tweaks for Invision Power Board forum
// @include        http://forums.egullet.org/*
// @include        http://forums.opinionatedabout.com/*
// ==/UserScript==

const TOPIC_STYLES = [
   ".postcolor { font-size: 140%;}",
   "#ipbwrapper { width: 100%; margin:0 }",
   "#ipbwrapper > center, #ipbwrapper > div[align=center], #ipbwrapper > hr,",
   "#ipbwrapper > br { display:none; }",
   "#submenu p, .nopad { padding:0; }",
   "#navstrip { margin: 0; padding: 0;}",
   ".newslink input { margin: 0 auto;}",
   ".row1 a { font-size: 140%;}",
   ".quotemain br {line-height: 20%;}",
   "br+br { line-height:50%; }",
   ].join("\n");
GM_addStyle(TOPIC_STYLES);
