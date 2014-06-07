// ==UserScript==
// @name           Alert IMDB
// @namespace      marclucchini
// @description    Add your preferred movie released date in your Google Agenda
// @include        http://www.imdb.com/title/*
// ==/UserScript==

var title = document.title;
var dates = document.evaluate('/html/body/div/div/layer/div/div/div/div/div[8]/div', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var date  = dates.snapshotItem(0);
var dateText = date.innerHTML;
var dateSplit = dateText.split(' ');
var day = dateSplit[0].trim();
day = day < 10 ? '0' + day : day;
var monthText = dateSplit[1];
var months = new Array();
months['January'] = '01';
months['February'] = '02';
months['March'] = '03';
months['April'] = '04';
months['May'] = '05';
months['June'] = '06';
months['July'] = '07';
months['August'] = '08';
months['September'] = '09';
months['October'] = '10';
months['November'] = '11';
months['December'] = '12';
var year = dateSplit[2];
var googleDate = year + months[monthText] + day + '/' + year + months[monthText] + day;
date.parentNode.appendChild(document.createElement("a"), date).innerHTML = '<a href="http://www.google.com/calendar/event?action=TEMPLATE&text=' + title + '&dates=' + googleDate + '&details=&location=CINEMA&trp=false&sprop=&sprop=name:" target="_blank"><img src="http://www.google.com/calendar/images/ext/gc_button1_fr.gif" border=0></a>';
