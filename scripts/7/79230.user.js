// JavaScript Document
// ==UserScript==
// @name           Ikariam Seschin 1.0 - baixar - Ikariam Seschin Pach 1.0
// @autor          Renan Nicoletti, Baseado em Brasil = Portugal
// @e-mail         indisponivel@indisponivel.com.br
// @description    Pequenas alterações no cenário oceânico e terrestre
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==,

// ---- Version 2.1 ---- 

var Horalocal = new Date();
var hora = Horalocal.getHours()

function Noche(css) {

if ( hora >= 1 && hora <= 24 || hora >= 0 && hora <= 5 )

    {var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);}
}

// ---------- NOCHE -----------

//--------------------------------terrenos--------------------------------
Noche('#city #container .phase1 {    background-image:url(http://img295.imageshack.us/img295/5064/citylevel1.jpg);}');
Noche('#city #container .phase3 {    background-image:url(http://img62.imageshack.us/img62/7505/citylevel3.jpg);}');
Noche('#city #container .phase4 {    background-image:url(http://img121.imageshack.us/img121/3799/citylevel4.jpg);}');
Noche('#city #container .phase5 {    background-image:url(http://img534.imageshack.us/img534/4715/citylevel5.jpg);}');
Noche('#city #container .phase6 {    background-image:url(http://img227.imageshack.us/img227/421/citylevel6.jpg);}');
Noche('#city #container .phase8 {    background-image:url(http://img687.imageshack.us/img687/4721/citylevel8.jpg);}');
Noche('#city #container .phase9 {    background-image:url(http://img97.imageshack.us/img97/9687/citylevel9.jpg);}');
Noche('#city #container .phase10 {    background-image:url(http://img229.imageshack.us/img229/8353/citylevel10.jpg);}');
Noche('#city #container .phase11 {    background-image:url(http://img444.imageshack.us/img444/6294/citylevel11.jpg);}');
Noche('#city #container .phase12 {    background-image:url(http://img46.imageshack.us/img46/5397/citylevel12.jpg);}');
Noche('#city #container .phase13 {    background-image:url(http://img37.imageshack.us/img37/6715/citylevel13.jpg);}');
Noche('#city #container .phase14 {    background-image:url(http://img413.imageshack.us/img413/1888/citylevel14.jpg);}');
Noche('#city #container .phase15 {    background-image:url(http://img52.imageshack.us/img52/4564/citylevel15.jpg);}');
Noche('#city #container .phase16 {    background-image:url(http://img822.imageshack.us/img822/3866/citylevel16.jpg);}');
Noche('#city #container .phase17 {    background-image:url(http://img44.imageshack.us/img44/4875/citylevel17.jpg);}');
Noche('#city #container .phase18 {    background-image:url(http://img444.imageshack.us/img444/6641/citylevel18.jpg);}');
Noche('#city #container .phase19 {    background-image:url(http://img210.imageshack.us/img210/7858/citylevel19.jpg);}');
Noche('#city #container .phase20 {    background-image:url(http://img408.imageshack.us/img408/3749/citylevel20.jpg);}');
Noche('#city #container .phase21 {    background-image:url(http://img293.imageshack.us/img293/9094/citylevel21.jpg);}');
Noche('#city #container .phase22 {    background-image:url(http://img39.imageshack.us/img39/171/citylevel22.jpg);}');
Noche('#city #container .phase23 {    background-image:url(http://img269.imageshack.us/img269/3018/citylevel23.jpg);}');
Noche('#city #container .phase24 {    background-image:url(http://img706.imageshack.us/img706/3281/citylevel24y.jpg);}');
