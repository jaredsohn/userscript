// ==UserScript==
// @name            Platypus-uni50.ogame.de/game/inde
// @namespace       Platypus
// @include         http://uni50.ogame.de/game/index.php?page=galaxy
// ==/UserScript==
function do_platypus_script() {
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV[7]/DIV[2]/DIV[2]/TABLE[1]/TBODY[1]/TR[9]/TD[5]/A[1]/IMG[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV[7]/DIV[2]/DIV[2]/TABLE[1]/TBODY[1]/TR[9]/TD[5]/A[1]/IMG[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
erase_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[2]/DIV[1]/DIV[7]/DIV[2]/DIV[2]/TABLE[1]/TBODY[1]/TR[9]/TD[5]/A[1]/IMG[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
}; // Ends do_platypus_script
