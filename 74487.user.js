// ==UserScript==
// @name           YYN Save PM
// @namespace      yyn
// @description    Always save sent yoyonation PMs to the outbox. The checkbox won't even appear.
// @include        http://www.yoyonation.com/talk/index.php?action=pm;sa=send;*
// ==/UserScript==

var pmCheckBox = document.getElementById('outbox');
pmCheckBox.checked = true;

var trNode = pmCheckBox.parentNode.parentNode.parentNode;
trNode.style.visibility = 'collapse';