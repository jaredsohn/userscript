// ==UserScript==
// @name           Upload Link
// @namespace      GLB
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

var test = window.location.href.split('?', 2)
var userid = test[1].split('_id=', 2)

var avatar = document.getElementById('my_account')
var avatar2 = document.getElementById('player')
var avatar3 = document.getElementById('team')

if (avatar != null){
var link = document.createElement('div');
link.setAttribute('id', 'upload');
link.innerHTML = '<a href="/game/user_pic_upload.pl?user_id=' + userid[1] + '"><img src="/images/game/design/upload_button.png"/></a>'
avatar.appendChild(link)}

if (avatar2 != null){
var link2 = document.createElement('div');
link2.setAttribute('id', 'upload');
link2.innerHTML = '<a href="/game/player_pic_upload.pl?player_id=' + userid[1] + '"><img src="/images/game/design/upload_button.png"/></a>'
avatar2.appendChild(link2)}

if (avatar3 != null){
var link3 = document.createElement('div');
link3.setAttribute('id', 'upload');
link3.innerHTML = '<a href="/game/team_pic_upload.pl?team_id=' + userid[1] + '"><img src="/images/game/design/upload_button.png"/></a>'
avatar3.appendChild(link3)}