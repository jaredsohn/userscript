// ==UserScript==
// @name         My Last Open Seat
// @namespace    www.technikov.com
// @version   	 1.0
// @description  The program hides all FULL classes on  Saddleback and IVC College Class Schedule web page and shows only OPEN classes that are left. 
// @match        http://*.socccd.cc.ca.us/*
// @copyright    2012+, Konstantin Budnikov
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
//If it finds the ".section_full" class the code hides it from users view.
$('.section_full').parent().parent().hide();
