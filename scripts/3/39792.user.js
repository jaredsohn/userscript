// ==UserScript==
// @name           Previous&Next Users Links
// @namespace      
// @description    Adds links to previous and next user profiles
// @include        http://leprosorium.ru/users/*
// @include        http://*.leprosorium.ru/users/*
// @author         http://leprosorium.ru/users/14685
// ==/UserScript==

uidstr = window.location.toString().match(/.*\/(\d+)/)[1];
uid = parseInt(uidstr);
prevuid = uid - 1;
nextuid = uid + 1;
container = document.createElement('span');
container.innerHTML = '<br><table cellspacing="0" cellpadding="0" style="width: 100%; border: 0px;"><tr><td style="text-align: left; width: 50%;"><a href="http://leprosorium.ru/users/' + prevuid + '" style="font-size: 11px; font-family: tahoma; color:#999; text-decoration: none;"><span style="font-size: 14px;">&#8592;</span>&nbsp;previous user</a></td><td style="text-align: right; width: 50%;"><a href="http://leprosorium.ru/users/' + nextuid + '" style="font-size:11px; font-family: tahoma; color: #999; margin-right: 20px;  text-decoration: none;">next user&nbsp;<span style="font-size: 14px;">&#8594;</span></a></td></tr></table>';
document.getElementById('generic-wrapper').insertBefore(container, document.getElementById('generic-wrapper').childNodes[0]);