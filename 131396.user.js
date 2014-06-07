// ==UserScript==
// @id             wololo.net-4fc40ff7-1651-4329-9540-ef0cbf2753d9@xnx_sig_test0
// @name           suigintou_sig
// @version        1.0
// @namespace      xnx_sig_test0
// @author         Xian Nox
// @description    signature test
// @include        http://wololo.net/talk/*
// @run-at         document-end
// ==/UserScript==

for (var i = 0; i < document.images.length; i++) {
    if(document.images[i].src == "http://img11.imageshack.us/img11/2280/suigintout.png") {
        //alert("found");
        document.images[i].src = "http://fc01.deviantart.net/fs37/f/2008/257/d/f/Suigintou_Signature_by_solid002.png";
    }
}