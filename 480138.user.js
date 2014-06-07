// ==UserScript==
// @name           teste
// @author         teste
// @include        http://*barafranca.com/*
// @include        https://omerta.pt/*
// ==/UserScript==


//alert('done');

var Link = "";

      var Main = setInterval(
            function ()
            {
            	alert(window.location.href);
            }, 1000);