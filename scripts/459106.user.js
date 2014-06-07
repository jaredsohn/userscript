// ==UserScript==
// @name        WCAG2.0 Quick Sheriff
// @description Highlights WCAG 2.0 Techniques inspected by Compliance Sheriff on the W3C's "How to Meet WCAG 2.0" page at http://www.w3.org/WAI/WCAG20/quickref/
// @namespace   http://frontporchpublishing.ca/
// @include     http://www.w3.org/WAI/WCAG20/quickref/
// @include     http://www.w3.org/WAI/WCAG20/quickref/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// ==/UserScript==
 
//Avoid conflicts
this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function()
{
    // alert("jQuery is loaded");
    
$("a[href$='C12']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='C17']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='C27']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='C30']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='F10']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='F14']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='F24']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='F3']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='F4']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='F66']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G105']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G107']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G130']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G134']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G14']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G141']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='G145']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G149']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G151']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G158']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G159']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G17']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G18']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G19']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G197']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G5']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G54']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G56']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G60']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G62']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='G69']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G71']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='G75']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G78']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G79']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G8']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G83']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G87']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G89']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G9']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='G98']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='H2']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H24']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H25']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H27']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='H28']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H32']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H33']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='H35']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H36']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H37']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H39']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H4']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='H42']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H43']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H44']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H45']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='H46']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='H51']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H53']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='H56']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='H57']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H58']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='H59']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H60']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='H63']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H64']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H65']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H67']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H73']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H76']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H83']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H84']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='H85']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='HS2']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='HS4']").attr("title","Sheriff Automated").wrap("<mark></mark>");
$("a[href$='HS5']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='SCR1']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='SCR18']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='SCR2']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");
$("a[href$='SCR24']").attr("title","Sheriff Visual").wrap("<mark style='background-color:#ccffcc'></mark>");

});