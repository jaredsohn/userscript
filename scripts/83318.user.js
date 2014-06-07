// ==UserScript==
// @name           Title Grabber
// @namespace      Title
// @description    Grab Title of Another Frame
// @include        http://*engadget.com/*
// @include        http://*newsvine.com/*
// @include        http://*re1ease.net/*
// @include        http://*icefilms.info/*
// @include        http://*torrentfreak.com/*
// @include        http://*xbox.com/*
// @include        http://*facebook.com/*
// @include        https://localhost/*
// @require	   http://code.google.com/apis/gears/gears_init.js
// ==/UserScript==

var url = location.href;
var title = document.title;
var domain = document.domain;

var db = google.gears.factory.create('beta.database');
db.open('startpage');
db.execute('create table if not exists titles' +
           ' (title text, url text, domain text)');

db.execute('insert into titles values (?, ?, ?)', [title, url, domain]);

rs.close();