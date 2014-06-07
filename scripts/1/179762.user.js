// ==UserScript==
// @name       La Centrale Big Picture
// @namespace  http://www.lacentrale.fr/*-annonce-*
// @version    0.1
// @description  Provides you big pictures on LaCentrale.fr and improve swaping pics system
// @include      http://www.lacentrale.fr/*-annonce-*
// @copyright  2012+, You
// ==/UserScript==

$( ".Fdgris" ).css('opacity','0.5');
$( ".OpacT" ).css('display','none');

e = document.getElementById('AnnPhotoMultiListe');

e.innerHTML = e.innerHTML.replace(/OpaCtPho/g, ''); 
e.innerHTML = e.innerHTML.replace(/-vign.jpg/g, '.jpg'); 
e.innerHTML = e.innerHTML.replace(/onmouseout="Javascript:change_pho/g, 'onmouseout="return;Javascript:change_pho');
e.innerHTML = e.innerHTML.replace(/onmouseover="Javascript:change_pho/g, 'onmouseover="document.getElementsByTagName(\'object\')[0].style.display=\'none\';$( \'.Fdgris\' ).css(\'opacity\',\'0.5\');$(this).children().css(\'opacity\',\'1\');Javascript:change_pho');
e.innerHTML = e.innerHTML.replace(/a rel="group" href=/g, 'a rel="group" name=');

//JS on first pic
firstpicurl = e.innerHTML.split('onmouseout="return;Javascript:change_pho(\'')[1].split('\'')[0];
e.innerHTML = e.innerHTML.replace('photo 1" class="Fdgris"','photo 1" class="Fdgris" style="opacity:1" onmouseover="document.getElementsByTagName(\'object\')[0].style.display=\'none\';$( \'.Fdgris\' ).css(\'opacity\',\'0.5\');$(this).css(\'opacity\',\'1\');Javascript:change_pho(\''+firstpicurl+'\');"');

document.getElementById('SideBar').style.marginTop = "488px";
document.getElementById('PhotCont').style.height = "485px";
document.getElementById('PhotCont').style.width = "707px";
document.getElementById('PhotCont').style.overflow = "hidden";
document.getElementById('PhotCont').style.margin = "auto";

document.getElementById('main').src = firstpicurl;
document.getElementById('main').style.width = "auto";
document.getElementById('main').style.maxWidth = "100%";
document.getElementById('main').style.height = "auto";
