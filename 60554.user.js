// ==UserScript==
// @name           Firefox Extension for Buycomm
// @description    Markum.Net Buycomm'un firefox üzerinden yönetilmesi
// @author         Hasan_Aytekin
// @version        0.1
// @include        https://www.markum.net/*
// @include        https://*.markum.net/*
// @include        https://markum.net/*
// ==/UserScript==

var ticket = document.getElementById('ticket_id').indexOf('value=');

if (document.getElementById('guncelleyen_bos').innerHTML != '')
{

 document.getElementById('guncelleyen_bos').innerHTML = '<a href=../yonet/ticket_guncelleyenAdmin.asp?ticket_id>deneme';

}