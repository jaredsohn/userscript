// ==UserScript==
// @name           Wiremod Sig Length
// @namespace      WMSIGLENGTHITSBTH
// @description    N/A
// @include        http://www.wiremod.com/forum/*
// ==/UserScript==
(function() {
    var lst =  document.getElementsByClassName("postcontainer");
    for (var i = 0; i < lst.length; i++)
    {
        var signature = lst[i].getElementsByClassName("signature")[0];
        if (!signature) continue;
        var height = signature.clientHeight;
        var uextra = lst[i].getElementsByClassName("userinfo_extra")[0];
        var dt = document.createElement("dt");
        dt.innerHTML = "Signature";
        uextra.appendChild(dt);
        var dd = document.createElement("dd");
        dd.innerHTML = height.toString() + " px";
        if (height > 200) dd.style.color = "#F00";
        uextra.appendChild(dd);
        
    }
})()