// ==UserScript==
// @name           bhol VOD ads skipper
// @namespace      http://techplusil.wordpress.com/
// @description    change player in bhol.co.il
// @include        http://www.bhol.co.il/*
// ==/UserScript==
(function()
{
    var res = document.getElementById("main_player");
    res.innerHTML = res.innerHTML.split("advert=")[0] + "buffer" + res.innerHTML.split("buffer")[1];
	
    var res2 = document.getElementById("lbvid_video");
    res2.innerHTML = res2.innerHTML.split("advert=")[0] + "buffer" + res2.innerHTML.split("buffer")[1];

})();