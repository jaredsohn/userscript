// ==UserScript==
// @name          حذف اطلاع رسانی واحد های پاس شده، باقی مانده ، تعداد مشروطی ها و . . .
// @namespace     notification remover
// @version       1
// @date          2013-08-21
// @author        Pooya Estakhri
// @description     با این اسکریپت میتونید سیستم اطلاع رسانی جدیدی که در برخی نسخه های سیستم ثبت نام و اطلاع رسانی دانشگاه آزاد وجود داره رو حذف کنید  
// @copyright     2013, Pooya Estakhri; 
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @include       http*://*.iaut.ac.ir/*
// ==/UserScript==

var el = document.getElementById( 'ctl00_Edu_Panel' );
el.parentNode.removeChild( el );