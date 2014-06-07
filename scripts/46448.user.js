// ==UserScript==
// @name           Add_Ikariam_Plus_Points
// @namespace      
// @description    Changes Ikariam Plus points from 0 to 100
// @author         Batnas
// @include        *s*.ikariam.*/*
// ==/UserScript==
//
// Changes IkariamPlus points from 0 to a value you set.
// Just fun.

var Amount = '100';
var Replace = 'Ikariam PLUS (0)';
var ReplaceWith = 'Ikariam PLUS (' + Amount + ')';
var ID = 'GF_toolbar';
var Content = document.getElementById(ID).innerHTML;
Content = Content.replace(Replace, ReplaceWith);
document.getElementById(ID).innerHTML = Content;