// ==UserScript==
// @name        traaviaan
// @namespace   travian
// @description traaviaan.ir -----> active gold member in right panel
// @copyright	© Mehrdad,sarbaz 2014(script © Mehrdad, for other call me mehrdad.salamat[at]Gmail.com)
// @include     *.traaviaan.ir/*
// @version     1.0.0.0
// @grant       none
// ==/UserScript==
var elemArray = document.getElementsByClassName('layoutButton Rally gold disabled');
elemArray[0].setAttribute('class', 'layoutButton Rally gold enable');
var elemArray1 = document.getElementsByClassName('layoutButton Rally gold enable');
elemArray1[0].setAttribute('onclick', 'window.location =\'build.php?id=39\'');
var elemArray = document.getElementsByClassName('layoutButton workshopBlack gold disabled');
elemArray[0].setAttribute('class', 'layoutButton workshopBlack gold enable');
var elemArray1 = document.getElementsByClassName('layoutButton workshopBlack gold enable');
elemArray1[0].setAttribute('onclick', 'window.location =\'build.php?id=37&gid=21\'');
var elemArray = document.getElementsByClassName('layoutButton stableBlack gold disabled');
elemArray[0].setAttribute('class', 'layoutButton stableBlack gold enable');
var elemArray1 = document.getElementsByClassName('layoutButton stableBlack gold enable');
elemArray1[0].setAttribute('onclick', 'window.location =\'build.php?id=34&gid=20\'');
var elemArray = document.getElementsByClassName('layoutButton barracksBlack gold disabled');
elemArray[0].setAttribute('class', 'layoutButton barracksBlack gold enable');
var elemArray1 = document.getElementsByClassName('layoutButton barracksBlack gold enable');
elemArray1[0].setAttribute('onclick', 'window.location =\'build.php?id=31&gid=19\'');
var elemArray = document.getElementsByClassName('layoutButton Market gold disabled');
elemArray[0].setAttribute('class', 'layoutButton Market gold enable');
var elemArray1 = document.getElementsByClassName('layoutButton Market gold enable');
elemArray1[0].setAttribute('onclick', 'window.location =\'build.php?id=27&gid=17\'');
var elemArray = document.getElementsByClassName('layoutButton Raid gold disabled');
elemArray[0].setAttribute('class', 'layoutButton Raid gold enable');
var elemArray1 = document.getElementsByClassName('layoutButton Raid gold enable');
elemArray1[0].setAttribute('onclick', 'window.location =\'build.php?id=39&t=99\'');
var elemArray = document.getElementsByClassName('layoutButton a2b gold disabled ');
elemArray[0].setAttribute('class', 'layoutButton a2b gold enable');
var elemArray1 = document.getElementsByClassName('layoutButton a2b gold enable');
elemArray1[0].setAttribute('onclick', 'window.location =\'a2b.php\'');
var elemArray = document.getElementsByClassName('layoutButton Stats gold disabled');
elemArray[0].setAttribute('class', 'layoutButton Stats gold enable');
var elemArray1 = document.getElementsByClassName('layoutButton Stats gold enable');
elemArray1[0].setAttribute('onclick', 'window.location =\'statistiken.php?tid=7\'');
var elemArray = document.getElementsByClassName('layoutButton troops gold disabled');
elemArray[0].setAttribute('class', 'layoutButton troops gold enable');
var elemArray1 = document.getElementsByClassName('layoutButton troops gold enable');
elemArray1[0].setAttribute('onclick', 'window.location =\'dorf3.php\'');
var elemArray = document.getElementsByClassName('layoutButton marketBlack gold disabled');
elemArray[0].setAttribute('class', 'layoutButton marketBlack gold enable');
var elemArray1 = document.getElementsByClassName('layoutButton marketBlack gold enable');
elemArray1[0].setAttribute('onclick', 'window.location =\'build.php?id=21&t=3\'');