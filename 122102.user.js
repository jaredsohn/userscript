// ==UserScript==
// @name           codeplex-full-width
// @namespace      codeplex
// @description    Make Codeplex Full Width
// @match http://*.codeplex.com/*
// @match https://*.codeplex.com/*
// @match http://*.codeplex.com*
// @match https://*.codeplex.com*
// @include        http://*.codeplex.com/*
// @include        https://*.codeplex.com/*
// @author				 Kieron Lanning
// ==/UserScript==

function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
    $(function () {
      $("#WikiContent, .WikiContent, #ctl00_ctl00_MasterContent_ProjectBody, .FixedWidth, .wikidoc, .WikiHolder").css("width", "100%");
    });    
});