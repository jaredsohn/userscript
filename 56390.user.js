// ==UserScript==
// @name           change background on http://goldbeads.net
// @namespace      none
// @include        http://goldbeads.net
// @description    Change background to make the gold beads, ear wires, head pins, clasps, bead caps, spacers, ribbed beads, granulated beads, jump rings, necklace strands, chains, findings, and gemset beads stand out better due to the gold being on the best quality background.
// ==/UserScript==

var bgcolor = document.getElementsByTagName("body")[0]
bgcolor.setAttribute("bgcolor","dddddd")