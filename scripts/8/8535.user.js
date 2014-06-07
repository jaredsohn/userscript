// ==UserScript==
// @name           camacama
// @namespace      כמה כמה
// @description    אתר משחקי מתמטיקה בטלביזיה - תיקון סרגל תפריט ותצוגת וידאו
// @include        http://www.camacama.org.il/*
// ==/UserScript==

//var logo = document.getElementById('menu');
//logo.style.marginTop = '2em';
//logo.style.backgroundColor = 'white';
//logo.style.color = 'red';

var player = document.getElementById('Player');
var VideoFile = player.firstChild.value.replace("manager/main/../..","");
//alert(VideoFile);

var div = player.parentNode;
    // Remove CamaCama's Original MSPlayer - Video Object
    var newDiv = div.cloneNode(false);
    div.parentNode.replaceChild(newDiv, div);

    var newObj = document.createElement("object");

    newObj.id = "Player";
    newObj.type = "video/x-ms-wmv";
    newObj.height = 300;
    newObj.width = 320;
    newObj.data = VideoFile;

    newDiv.appendChild(newObj);

//
// ChangeLog
// 2007-04-12 - 0.1 - created :-)
//