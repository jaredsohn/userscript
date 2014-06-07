// ==UserScript==
// @name           TTNET - ADSL Quota Information - Clean Login Form
// @version        1.0
// @date           02.01.2010
// @author         Volkan KIRIK
// @namespace      http://userscripts.org/users/volkan
// @description    Changes Login Page Address(in Frame) to one with Clean Design
// @include        http://ttnet.com.tr/adsl-kota-sorgulama/*
// @include        http://www.ttnet.com.tr/adsl-kota-sorgulama/*
// ==/UserScript==

var re = /kota_giris[\w]*\.asp/;

if (document.frames)
{
	var n10 = document.frames[0];
}
else
{
	var n10 = document.getElementsByTagName('iframe')[0];
}

if (n10 && n10.src.match(re))
{
	n10.src = 'http://adslkota.ttnet.com.tr/adslkota/login_tr.jsp';
}
