// ==UserScript==
// @name       e-Sim Login KeepAlive
// @namespace  http://dev-null.in/
// @version    1.0
// @description  Script that steals your e-Sim password
// @match      http://*.e-sim.org/*
// @copyright  2012, vortex
// ==/UserScript==

// Login refreshed every ~10 minutes
var tehRefreshTime = 60000 * (8 + Math.floor(Math.random()*3);
// We'll just call the homepage
var tehURL = "http://" + window.location.hostname + "/";

var tehScriptCode = "setInterval(function(){var tehKeepAliveData = $.get('" + tehURL + "')}," + tehRefreshTime + ");";
var tehScript = document.createElement('script');

tehScript.innerHTML = tehScriptCode;
tehScript.type = 'text/javascript';

var tehHead = document.getElementsByTagName("head")[0];
tehHead.appendChild(tehScript);
