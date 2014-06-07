// ==UserScript==
// @name         CanReef Active Topics Cleanup
// @namespace    http://www.canreef.com/modules/Active_Topics/index.php*
// @description  This script hides System Messages, Featured Photos, and Latest Poll blocks.
// 
// @include    http://www.canreef.com/modules/Active_Topics/index.php
// ==/UserScript==

function remove(element) { element.parentNode.removeChild(element); }
remove(document.getElementById("collapseobj_vbpblock_38").parentNode);
remove(document.getElementById("collapseobj_featurepal").parentNode.parentNode.parentNode.parentNode.parentNode);
remove(document.getElementById("collapseobj_vbpblock_51").parentNode);
remove(document.getElementById("content").getElementsByTagName("br")[0]);