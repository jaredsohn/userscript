// ==UserScript==
// @name           KU Light Login 
// @namespace      http://jittat.wordpress.com/gmscripts
// @description    This script strips down all assets in KU Login Form
// @include        https://login*.ku.ac.th/*
// ==/UserScript==

var form = document.getElementById('loginform');
var tables = document.getElementsByTagName('table');
var mainTable = tables[0];
mainTable.rows[0].innerHTML = '<td style="text-align:center;"><b>KU Light Login</b></td>';
mainTable.rows[1].innerHTML = '<td></td>';
mainTable.rows[1].cells[0].appendChild(form);
mainTable.deleteRow(2);
mainTable.deleteRow(2);
mainTable.deleteRow(2);

