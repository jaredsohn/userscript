// ==UserScript==
// @name                Youtube Link to Subscription Home Page
// @namespace	        Kevin Sweeney
// @description	        Script that links to subscriptions as a homepage for youtube
// @include		        https://*.youtube.com/*
// @include		        http://*.youtube.com/*
// @run-at              document-start
// @updateURL           http://userscripts.org/scripts/source/151767.user.js
// @downloadURL         http://userscripts.org/scripts/source/151767.user.js
// ==/UserScript==

<script type = "text/javascript">

function changeYoutubeLink()
{
    var uLinker = document.getElementById("logo-container");
	uLinker.innerHTML = "<a id="logo-container" href="/feed/subscribers" title="YouTube home">"
	uLinker.href = "/feed/subscriptions";
}

</script>