// ==UserScript==
// @name           HalloweenTheme_V1
// @author         SB_edit_by_Merl1
// @license        Public
// @namespace      SB_edit_by_merl1
// @include       http://fr1.grepolis.*/*
// @include       http://fr2.grepolis.*/*
// @include       http://fr3.grepolis.*/*
// @include       http://fr4.grepolis.*/*
// @include       http://fr5.grepolis.*/*
// @include       http://fr6.grepolis.*/*
// @include       http://fr7.grepolis.*/*
// @include       http://fr8.grepolis.*/*
// @include       http://fr9.grepolis.*/*
// @include       http://fr10.grepolis.*/*
// @include       http://fr11.grepolis.*/*
// @include       http://fr12.grepolis.*/*
// @include       http://fr13.grepolis.*/*
// @include       http://fr14.grepolis.*/*
// @include       http://fr15.grepolis.*/*
// @include       http://fr16.grepolis.*/*
// @include       http://fr17.grepolis.*/*

// ==/UserScript==

function addStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addStyle('#temple_shield.zeus{background-image: url(http://img11.hostingpics.net/pics/294778staticgrepoliscomimagesgametemplezeusbigkrjp.png) ;}#temple_shield.poseidon{background-image: url(http://img11.hostingpics.net/pics/412164staticgrepoliscomimagesgametemplearesbigkrjp.png) ;}#temple_shield.hera{background-image: url(http://www.hostingpics.net/viewer.php?id=262502staticgrepoliscomimagesgametempleherabigkrjp.png) ;}#temple_shield.athena{background-image: url(http://img11.hostingpics.net/pics/176646staticgrepoliscomimagesgametempleathenabigkrjp.png) ;}#temple_god_description #god_mini_athena{background: url(http://img11.hostingpics.net/pics/504692staticgrepoliscomimagesgametempleathenaminikr.png) 0 0 no-repeat;}#temple_god_description #god_mini_hera{background: url(http://img11.hostingpics.net/pics/495043staticgrepoliscomimagesgametempleheraminikr.png) 0 0 no-repeat;}#temple_god_description #god_mini_zeus{background: url(http://img11.hostingpics.net/pics/460038staticgrepoliscomimagesgametemplezeusminikr.png) 0 0 no-repeat;}#temple_god_description #god_mini_poseidon{background: url(http://img11.hostingpics.net/pics/948181staticgrepoliscomimagesgametempleposeidonminikr.png) 0 0 no-repeat;}a#temple_zeus {background-image: url(http://img11.hostingpics.net/pics/454520staticgrepoliscomimagesgametemplezeus.png);}a#temple_hera {background-image: url(http://img11.hostingpics.net/pics/625159staticgrepoliscomimagesgametemplehera.png);}a#temple_poseidon{background-image: url(http://img11.hostingpics.net/pics/670592staticgrepoliscomimagesgametempleposeidon.png);}a#temple_athena {background-image: url(http://img11.hostingpics.net/pics/798140staticgrepoliscomimagesgametempleathena.png);}.god_mini{background-image: url(http://cdn.grepolis.com/images/game/layout/favor_gods_2.0_halloween.png);float: right;}.god_micro{background-image: url();}#start #rules{position: absolute;right: 8px;left: 8px;top: 20px;bottom: -8px;padding: 20px;overflow-y: auto;overflow-x: hidden;}#registered_form{position: static;}#choose_direction{position: relative;z-index: 10;}');