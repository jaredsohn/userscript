// ==UserScript==
// @name          Hellbound Realistic 11
// @version       alpha
// @namespace     dark89ninja
// @description	  Helps you complete Realistic 11
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include       https://www.hellboundhackers.org/challenges/real11/clients/backup.php
// @include       https://*
// @include       http://*
// @include       /*
// @include       *

// ==/UserScript==
document.getElementsByName('number')[0].value=document.getElementsByTagName('b')[0].innerHTML.match('hr>([0-9]*?)<')[1]*2; document.forms[0].submit();