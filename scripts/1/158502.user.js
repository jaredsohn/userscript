// ==UserScript==
// @name        Google Video Switcheroo
// @namespace   com.freshlabs.googleswitcheroo
// @description Switches YouTube link with Video link in "More" group
// @include     https://www.google.de/*
// @include     http://www.google.de/*
// @grant none
// @version     1
// ==/UserScript==

var ytButton = document.getElementById('gb_36');
var vdButton = document.getElementById('gb_12');
var moreCont = document.getElementById('gbmm');

var vdLabel = vdButton.innerHTML;
vdButton.innerHTML = '';

// Modify element to fit into menu bar (inner spans)
vdButton.className = 'gbzt';
var span1 = document.createElement('span');
span1.className = 'gbtb2';
vdButton.appendChild(span1);

var span2 = document.createElement('span');
span2.className = 'gbts';
span2.innerHTML = vdLabel;
vdButton.appendChild(span2);

// Insert Video button before YouTube button
ytButton.parentNode.insertBefore(vdButton, ytButton);

// build list element and append YouTube button to "more" container
var ytList = document.createElement('li');
ytList.className = 'gbmtc';
ytList.appendChild(ytButton);
ytButton.innerHTML = 'YouTube';
ytButton.className = 'gbmt';
moreCont.appendChild(ytList);