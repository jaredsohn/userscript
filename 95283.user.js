// ==UserScript==
// @name           Yamm ADFREE
// @namespace      _caizzz
// @description    A Yammrol szedi le a Citybankos es egyeb post form korulotti szart
// @version        1.1
// @include        http://yamm.hu/*
// // ==/UserScript==


GM_addStyle("
    #post textarea { border: 1px solid #e0;   }

    #post .actions .remaining { font-family: "segoe wp light";
 text-shadow: 1px 2px 1px #999; }
    

#post form {
background:none !important;
}
#post textarea {
background: #E0E0E0; !important;
}
body {
font-family: "arial"; 
font-size: 0.6em;
}");