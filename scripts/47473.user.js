// ==UserScript==
// @name        Ikariam Auto Login
// @namespace   http://fluidapp.com
// @description Automatically logs you into Ikariam using Fluid.
// @include     http://*.ikariam.*/*
// @author      Kahil Young
// ==/UserScript==

var alpha = "s1.ikariam.com";
var beta = "s2.ikariam.com";
var gamma = "s3.ikariam.com";
var delta = "s4.ikariam.com";
var epsilon = "s5.ikariam.com";
var zeta = "s6.ikariam.com";
var eta = "s7.ikariam.com";
var theta = "s8.ikariam.com";
var iota = "s9.ikariam.com";
var kappa = "s10.ikariam.com";

// Replace the sections below that are in all CAPS with your login info. Leave the quote symbols in place.

var world = WORLD;
var username = "USERNAME";
var password = "PASSWORD";


window.addEventListener("load",function() {
	document.getElementById("universe").value = world
	document.getElementById("login").select()
	document.getElementById("login").value = username
	document.getElementById("pwd").select()
	document.getElementById("pwd").value = password
	document.getElementById('loginForm').action = "http://" + world + "/index.php?action=loginAvatar&function=login";
	document.getElementById("loginForm").submit()
},true)