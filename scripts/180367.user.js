// ==UserScript==
// @name     Remove related youtubes at end of movie
// @include  http://*.youtube.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/title%3D(.(?!%26))*?ryse(?!%2C)(.(?!%2C))*?id%3D[\w-]{11}/ig, 'id%3D');
document.body.innerHTML = document.body.innerHTML.replace(/id%3D[\w-]{11}(?!%2C)(?=([^&](?!%2C))*?ryse)/ig, 'id%3D');

//document.body.innerText = document.body.innerHTML;