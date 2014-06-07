// ==UserScript==
// @name	Pub's eRep Avatar Fix
// @version	0.14
// @description	Fixes eRep avatars on citizen pages so they don't look dumb
// @author Publius
// @namespace http://www.erepublik.com/en/referrer/Publius
// @match http://www.erepublik.com/*/citizen/*
// @match http://economy.erepublik.com/*/accounts/*
// @match http://economy.erepublik.com/*/citizen/*
// @match http://economy.erepublik.com/*/inventory
// @include	http://www.erepublik.com/*/citizen/*
// @include http://economy.erepublik.com/*/accounts/*
// @include http://economy.erepublik.com/*/citizen/*
// @include http://economy.erepublik.com/*/inventory
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    $("img.citizen_avatar").attr("src", $("img.citizen_avatar").css("background-image").match("http://.*?jpg"));
    $("img.citizen_avatar").css("background-image","");
}

// load jQuery and execute the main function
addJQuery(main);


