// ==UserScript==
// @name          Hide comments on VOTT
// @namespace     http://vott.ru/
// @description   Hides the specified users comments on the site VOTT.RU
// @include       http://vott.ru/entry*
// @include       http://vott.ru/entry/*
// ==/UserScript==

// version 0.2
// date 2011-08-01
// author Slawa
// Copyright (c) 2010
// Released under the GPL license
// =============================================================================
// User Settings
//
// Rate info person
var rateInfoPerson = true; // Репутация пользователей
// Color coding person
var colorCodingPerson = true; // Красить пользователей
// Hide who
var hideCommentText = true; // Убрать сам комментарий.
var hideCommentUser = true; // Убрать пользователя с глаз долой.
var hideCommentRow = false; // Убрать всю строчку, что бы даже не видно.
// Persons to be hide from comments
var hidePersons = new Array(); // Примеры пользователей!!!
hidePersons[0] = 'beautyolya'; // beautyolya
hidePersons[1] = '%D0%97%D0%90%D0%91%D0%BE%D1%80'; // ЗАБор
hidePersons[2] = 'ekonbez'; // ekonbez
hidePersons[3] = 'natazha16w'; // natazha16w
//
// =============================================================================
// Script Settings
// link person
var linkPerson = '/user/';
// par
var this_is_IE = navigator.appName.toLowerCase().indexOf("explorer") != -1;
var namePersons = new Array();
var infoPersons = new Array();
var ratePersons = new Array();

// hide from comment
function hideComment(xdiv)
{
    if(xdiv){
        xdiv.style.display = 'none';
    }
}

// hide from comments at persons
function hideComments(linkToPerson)
{
    if(hideCommentText||hideCommentUser||hideCommentRow){
        // get persons
        for(var j = 0; j < hidePersons.length; j++) {
            // check person
            if (linkToPerson.href.toString().indexOf(hidePersons[j])>0){
                if(hideCommentRow){
                    hideComment(((linkToPerson).parentNode).parentNode);
                }
                var divChildNodes = (((linkToPerson).parentNode).parentNode).childNodes;
                // get div
                for(var ij = 0; ij < divChildNodes.length; ij++) {
                    // check child div
                    if(divChildNodes[ij].className == 'comment_info' && hideCommentUser){
                        hideComment(divChildNodes[ij]);
                    }
                    if(divChildNodes[ij].className == 'comment_body' && hideCommentText){
                        hideComment(divChildNodes[ij]);
                    }
                }
            }
        }
    }
}

// color
function colorElement(xdiv, color, color2)
{
    if(xdiv){
        //xdiv.innerHTML += '<font color='+color+'>'+xdiv.innerHTML+'</font>';
        if(color2){
            xdiv.style.background = 'none repeat scroll 0 0 '+color2;
        }
        xdiv.style.color = ' '+color;
    }
}

// Color coding
function colorCoding(parentNodePerson, ratePerson)
{
    if (colorCodingPerson){
        var rate = parseInt(ratePerson.substring(
            ratePerson.indexOf(':')+1,ratePerson.indexOf('</')));
        if (rate < 0) {
            colorElement(parentNodePerson,'MistyRose','LightSkyBlue');
        } else if (rate > 50000) {
            colorElement(parentNodePerson,'Black');
        } else if (rate > 10000) {
            colorElement(parentNodePerson,'Orange');
        } else if (rate > 1000) {
            colorElement(parentNodePerson,'DarkKhaki');
        } else {
            colorElement(parentNodePerson,'DarkSlateBlue');
        }
    }
}

// Add info
function addInfo(linkToPerson, parentNodePerson)
{
    if (rateInfoPerson){
        var flag = false;
        var name = linkToPerson.href.toString().substr(
            linkToPerson.href.toString().indexOf(linkPerson)+6);
        var indexCurr=0;
        // get persons
        for(var j = 0; j < namePersons.length; j++) {
            // check person
            if (linkToPerson.href.toString().indexOf(namePersons[j])>0){
                flag=true;
                indexCurr=j;
                break;
            }
        }
        if (!flag) {
            var req = new XMLHttpRequest();
            if (req) {
                req.open("GET", linkToPerson, false);
                req.send(null);
                // check pos
                var fromIndexInt = (req.responseText).indexOf('<ul>');
                var toIndexInt = (req.responseText).indexOf('</ul>',fromIndexInt)+5;
                // mem
                indexCurr=namePersons.length;
                namePersons[indexCurr]=name;
                infoPersons[indexCurr]=(req.responseText).substring(fromIndexInt, toIndexInt);
                // check pos two
                fromIndexInt=0;
                toIndexInt=0;
                for(var i = 0; i < 6; i++) {
                    toIndexInt = infoPersons[indexCurr].indexOf('<li>',toIndexInt+1);
                    if (toIndexInt>-1) {
                        fromIndexInt=toIndexInt;
                    } else {
                        break;
                    }
                }
                toIndexInt = infoPersons[indexCurr].indexOf('</li>',fromIndexInt)+5;
                ratePersons[indexCurr]=infoPersons[indexCurr].substring(fromIndexInt, toIndexInt);
            }
        }
        // check paren div
        if(((linkToPerson).parentNode).className == 'comment_info'){
            ((linkToPerson).parentNode).innerHTML += ratePersons[indexCurr];
            colorCoding(parentNodePerson, ratePersons[indexCurr]);
        }
    }
}

// onLoad
function onLoad()
{
    // get links name
    for (var i = 0; i < document.links.length; i++) {
        // check link
        if (document.links[i].href.toString().indexOf(linkPerson) > 0 ){
            hideComments(document.links[i]);
            addInfo(document.links[i], document.links[i].parentNode);
        }
    }
}

// run
if(!this_is_IE) {
    window.addEventListener("load", onLoad, false);
}
else {
    onLoad();
}
