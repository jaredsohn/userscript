// ==UserScript==
// @name           Gameknot remove advertisement
// @namespace      gameknot.com
// @description    Gameknot remove advertisement
// @include        http://gameknot.com/*
// ==/UserScript==

(function(){
document.getElementById("gk_wrap").removeChild(document.getElementById("gk_wrap").getElementsByTagName("div")[0]);
})();