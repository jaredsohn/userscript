// ==UserScript==
// @name            Fix Top Frame in Polopoly
// @namespace       hsswebteam
// @description     Fixes the height issue of top frame on Polopoly launch at ed.ac.uk
// @include         https://www.polopoly.mis.ed.ac.uk/*
 // ==/UserScript==

topFrame = document.getElementById('mainframeset');
topFrame.setAttribute('rows','78, *');