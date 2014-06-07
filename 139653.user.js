// ==UserScript==
// @name        The Student Room Sidebar Remover
// @description Will fix where if you don't want to see the sidebar on pages other than the homepage. Updated for latest site style and bug-fixes.
// @author      Robert Humphries
// @include     http://www.thestudentroom.co.uk/*
// @include     http://thestudentroom.co.uk/*
// @exclude     http://thestudentroom.co.uk
// @exclude     http://*.thestudentroom.co.uk/
// @version     1.2
// ==/UserScript==

var sidebar 	= document.getElementById('gutter_content');
sidebar.style.display = "none";

var stylesheet 	= document.createElement('style')
stylesheet.innerHTML = "#primary_content {width: 97%;}";
document.body.appendChild(stylesheet);