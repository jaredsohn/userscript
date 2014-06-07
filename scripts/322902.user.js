// ==UserScript==
// @name           Twitter - Loading bar(like Youtube)
// @namespace      forsureitsme@gmail.com
// @version        1.0
// @description    Loading bar for every twitter user.
// @copyright      2014, Pedro Cardoso da Silva
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require		   http://github.hubspot.com/pace/pace.js
// ==/UserScript==

$('head').append('<style type="text/css">.pace .pace-progress {  background: #29d;  position: fixed;  z-index: 2000;  top: 0;  left: 0;  height: 2px;  -webkit-transition: width 1s;  -moz-transition: width 1s;  -o-transition: width 1s;  transition: width 1s;}.pace-inactive {  display: none;}</style');