// ==UserScript==
// @name                eRepublik Company Helper
// @author         	eCitizen xorange
// @version        	0.1beta
// @namespace	        eChinaxorange
// @description		for employee managing
// @include		http://economy.erepublik.com/en/company/employees/*
// ==/UserScript==

alert('during development');

var targetDiv = getElementById("employee_list");

var firstChild = targetDiv.firstChild;
var newContent = document.createElement('p');
newContent.innerHTML = "added by company helper";

targetDiv.insertBefore(newContent, firstChild);