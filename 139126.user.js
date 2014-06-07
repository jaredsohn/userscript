// ==UserScript==
// @name       Facepalm
// @namespace  http://my.psype.fr/
// @version    0.1
// @description  Changes "Facebook" logo to "Fasepalm". Nothing more than that.
// @match      http://*.facebook.com/*
// @match      https://*.facebook.com/*
// @include    http://*.facebook.com/*
// @include    https://*.facebook.com/*
// @copyright  2012+, TwK
// ==/UserScript==

var contain = document.getElementById("pageLogo");
var flink = contain.getElementsByTagName("A")[0];

flink.style.backgroundImage = "url('http://i46.tinypic.com/21mgtj6.png')";