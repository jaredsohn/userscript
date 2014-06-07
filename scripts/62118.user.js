// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Anda Windrose
// @description   Nord Ost Süd West Anker für Städte
// @include       http://game1.andaloria.de/Map.php
// @include       http://game1.andaloria.de/Map.php?_x=*

// ==/UserScript==


// Uebergibt die aktuelle Adresse ins Formular

var GM_sc = document.createElement('script');
GM_sc.src = 'http://marsh-mellow.de/anda/anbtn.js';
GM_sc.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_sc);



// Serien speichern script(Cookies setzen)

var GM_sc = document.createElement('script');
GM_sc.src = 'http://marsh-mellow.de/anda/phpmap_an.js';
GM_sc.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_sc);



// Gespeicherte Serien - Cookies auslesen

function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}



// Menue Buttons Show/Hide js & css

var GM_sc = document.createElement('script');
GM_sc.src = 'http://marsh-mellow.de/anda/showhide.js';
GM_sc.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_sc);




function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#myGM_topLine3 { visibility: hidden ;height : 0em !important;background: transparent !important;color: #fff !important;}');


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#myGM_topLine6 { visibility: hidden ;height : 0em !important;background: transparent !important;color: #fff !important;');


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#myGM_topLine7 { visibility: hidden ;height : 0em !important;background: transparent !important;color: #fff !important;}');



function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#myGM_topLine8 { visibility: hidden ;height : 0em !important;background: transparent !important;color: #fff !important;}');



function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#myGM_topLine9 { visibility: hidden ;height : 0em !important;background: transparent !important;color: #fff !important;}');



function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#myGM_topLine10 { visibility: hidden ;height : 0em !important;background: transparent !important;color: #fff !important;}');




function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#myGM_topLine2 a{color:#8A3207};');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#myGM_topLine6 a{color:black;}');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#myGM_topLine7 a{color:black;}');



// Formularfelder der Serien aus Cookies lesen

if (get_cookie ("phpmap_koords_o1x") == null){
   var o1x = "";
}else{
var o1x = get_cookie ("phpmap_koords_o1x");
}

if (get_cookie ("phpmap_koords_o2x") == null){
   var o2x = "";
}else{
var o2x = get_cookie ("phpmap_koords_o2x");
}

if (get_cookie ("phpmap_koords_o3x") == null){
   var o3x = "";
}else{
var o3x = get_cookie ("phpmap_koords_o3x");
}

if (get_cookie ("phpmap_koords_o4x") == null){
   var o4x = "";
}else{
var o4x = get_cookie ("phpmap_koords_o4x");
}

if (get_cookie ("phpmap_koords_o5x") == null){
   var o5x = "";
}else{
var o5x = get_cookie ("phpmap_koords_o5x");
}

if (get_cookie ("phpmap_koords_o6x") == null){
   var o6x = "";
}else{
var o6x = get_cookie ("phpmap_koords_o6x");
}

if (get_cookie ("phpmap_koords_o7x") == null){
   var o7x = "";
}else{
var o7x = get_cookie ("phpmap_koords_o7x");
}

if (get_cookie ("phpmap_koords_o8x") == null){
   var o8x = "";
}else{
var o8x = get_cookie ("phpmap_koords_o8x");
}

if (get_cookie ("phpmap_koords_o9x") == null){
   var o9x = "";
}else{
var o9x = get_cookie ("phpmap_koords_o9x");
}

if (get_cookie ("phpmap_koords_o10x") == null){
   var o10x = "";
}else{
var o10x = get_cookie ("phpmap_koords_o10x");
}

if (get_cookie ("phpmap_koords_o11x") == null){
   var o11x = "";
}else{
var o11x = get_cookie ("phpmap_koords_o11x");
}

if (get_cookie ("phpmap_koords_o12x") == null){
   var o12x = "";
}else{
var o12x = get_cookie ("phpmap_koords_o12x");
}

if (get_cookie ("phpmap_koords_o13x") == null){
   var o13x = "";
}else{
var o13x = get_cookie ("phpmap_koords_o13x");
}

if (get_cookie ("phpmap_koords_o14x") == null){
   var o14x = "";
}else{
var o14x = get_cookie ("phpmap_koords_o14x");
}

if (get_cookie ("phpmap_koords_o15x") == null){
   var o15x = "";
}else{
var o15x = get_cookie ("phpmap_koords_o15x");
}

if (get_cookie ("phpmap_koords_o16x") == null){
   var o16x = "";
}else{
var o16x = get_cookie ("phpmap_koords_o16x");
}

if (get_cookie ("phpmap_koords_o17x") == null){
   var o17x = "";
}else{
var o17x = get_cookie ("phpmap_koords_o17x");
}

if (get_cookie ("phpmap_koords_o18x") == null){
   var o18x = "";
}else{
var o18x = get_cookie ("phpmap_koords_o18x");
}

if (get_cookie ("phpmap_koords_o19x") == null){
   var o19x = "";
}else{
var o19x = get_cookie ("phpmap_koords_o19x");
}

if (get_cookie ("phpmap_koords_o20x") == null){
   var o20x = "";
}else{
var o20x = get_cookie ("phpmap_koords_o20x");
}








if (get_cookie ("phpmap_koords_b1") == null){
   var besch1 = "";
}else{
var besch1 = get_cookie ("phpmap_koords_b1");
}


if (get_cookie ("phpmap_koords_b5") == null){
   var besch5 = "";
}else{
var besch5 = get_cookie ("phpmap_koords_b5");
}


if (get_cookie ("phpmap_koords_b9") == null){
   var besch9 = "";
}else{
var besch9 = get_cookie ("phpmap_koords_b9");
}

if (get_cookie ("phpmap_koords_b10") == null){
   var besch10 = "";
}else{
var besch10 = get_cookie ("phpmap_koords_b10");
}
if (get_cookie ("phpmap_koords_b11") == null){
   var besch11 = "";
}else{
var besch11 = get_cookie ("phpmap_koords_b11");
}

// Windrose Stadt 1

if (besch1 != ''){

var gm_topLineHeight3 = '0em';
var gm_topLineColor3 = '#DDDDDD';

var gm_topLineFontSize3 = '14px';
var gm_topLineTextAlign3 = 'Center';

var gm_topLineStyle3 = 'style="'+
                'height :' + gm_topLineHeight3 + ';' +
                'background: transparent; ' +
                'color: '+ gm_topLineColor3 + ';"'

var gm_topLineInnerStyle3 = 'style="' +
                'margin: 0px auto 0px auto; ' +
                'position: fixed; top:200px; right:150px; ' +
                'width: 130px; ' +
                'height: 60%; ' +
                'z-index: 100; ' +
                'height :' + gm_topLineHeight3 +
                'border-bottom: 1px solid #000000; ' +
                'margin-bottom: 2px; ' +
                'font-family: Verdana, Geneva, Arial, Helvetica, sans-serif; ' +
                'font-weight: bold;' +
                'font-size: ' + gm_topLineFontSize3 + '; ' +
                'text-align: ' + gm_topLineTextAlign3 + ';' +
                'color: '+ gm_topLineColor3 + ';"'

var gm_topLine3 = document.createElement("div");
gm_topLine3.setAttribute('id', 'myGM_topLine3');

gm_topLine3.innerHTML = '<div '+ gm_topLineStyle3 + '>' +
        '<div ' + gm_topLineInnerStyle3 + '>' +

"<TABLE width=197 border=0 cellpadding=0 cellspacing=0> "+
"<TR><TD rowspan=2 style=\'background-image:url(http://marsh-mellow.de/anda/wr-1_01.gif); padding-top: 15px;\' width=138 height=46>" + besch1 + "</TD> "+
"<TD><a href=\"" + o4x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_02.gif\" width=30 height=23></a></TD>"+
"<TD><a href=\"" + o1x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_03.gif\" width=29 height=23></TD>"+
"</TR><TR>"+
"<TD><a href=\"" + o3x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_04.gif\" width=30 height=23></TD>"+
"<TD><a href=\"" + o2x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_05.gif\" width=29 height=23></TD>"+
"</TR></TABLE>"+

"<TABLE width=197 border=0 cellpadding=0 cellspacing=0> "+
"<TR><TD rowspan=2 style=\'background-image:url(http://marsh-mellow.de/anda/wr-1_01.gif); padding-top: 15px;\' width=138 height=46>" + besch5 + "</TD> "+
"<TD><a href=\"" + o8x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_02.gif\" width=30 height=23></a></TD>"+
"<TD><a href=\"" + o5x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_03.gif\" width=29 height=23></TD>"+
"</TR><TR>"+
"<TD><a href=\"" + o7x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_04.gif\" width=30 height=23></TD>"+
"<TD><a href=\"" + o6x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_05.gif\" width=29 height=23></TD>"+
"</TR></TABLE>"+

"<TABLE width=197 border=0 cellpadding=0 cellspacing=0> "+
"<TR><TD rowspan=2 style=\'background-image:url(http://marsh-mellow.de/anda/wr-1_01.gif); padding-top: 15px;\' width=138 height=46>" + besch9 + "</TD> "+
"<TD><a href=\"" + o12x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_02.gif\" width=30 height=23></a></TD>"+
"<TD><a href=\"" + o9x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_03.gif\" width=29 height=23></TD>"+
"</TR><TR>"+
"<TD><a href=\"" + o11x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_04.gif\" width=30 height=23></TD>"+
"<TD><a href=\"" + o10x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_05.gif\" width=29 height=23></TD>"+
"</TR></TABLE>"+

"<TABLE width=197 border=0 cellpadding=0 cellspacing=0> "+
"<TR><TD rowspan=2 style=\'background-image:url(http://marsh-mellow.de/anda/wr-1_01.gif); padding-top: 15px;\' width=138 height=46>" + besch10 + "</TD> "+
"<TD><a href=\"" + o16x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_02.gif\" width=30 height=23></a></TD>"+
"<TD><a href=\"" + o13x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_03.gif\" width=29 height=23></TD>"+
"</TR><TR>"+
"<TD><a href=\"" + o15x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_04.gif\" width=30 height=23></TD>"+
"<TD><a href=\"" + o14x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_05.gif\" width=29 height=23></TD>"+
"</TR></TABLE>"+

"<TABLE width=197 border=0 cellpadding=0 cellspacing=0> "+
"<TR><TD rowspan=2 style=\'background-image:url(http://marsh-mellow.de/anda/wr-1_01.gif); padding-top: 15px;\' width=138 height=46>" + besch11 + "</TD> "+
"<TD><a href=\"" + o20x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_02.gif\" width=30 height=23></a></TD>"+
"<TD><a href=\"" + o17x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_03.gif\" width=29 height=23></TD>"+
"</TR><TR>"+
"<TD><a href=\"" + o19x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_04.gif\" width=30 height=23></TD>"+
"<TD><a href=\"" + o18x + "\"><IMG src=\"http://marsh-mellow.de/anda/wr-1_05.gif\" width=29 height=23></TD>"+
"</TR></TABLE>"+

        '</div></div>';

document.body.insertBefore(gm_topLine3, document.body.firstChild);

}




// Save button

var gm_topLineHeight6 = '0em';
var gm_topLineColor6 = '#DDDDDD';

var gm_topLineFontSize6 = '14px';
var gm_topLineTextAlign6 = 'Center';

var gm_topLineStyle6 = 'style="'+
                'height :' + gm_topLineHeight6 + ';' +
                'background: transparent; ' +
                'color: '+ gm_topLineColor6 + ';"'

var gm_topLineInnerStyle6 = 'style="' +
                'margin: 0px auto 0px auto; ' +
                'position: fixed; top:143px; left:980px; ' +
                'width: 130px; ' +
                'height: 60%; ' +
                'z-index: 100; ' +
                'height :' + gm_topLineHeight6 +
                'border-bottom: 1px solid #000000; ' +
                'margin-bottom: 2px; ' +
                'font-family: Verdana, Geneva, Arial, Helvetica, sans-serif; ' +
                'font-weight: bold;' +
                'font-size: ' + gm_topLineFontSize6 + '; ' +
                'text-align: ' + gm_topLineTextAlign6 + ';' +
                'color: '+ gm_topLineColor6 + ';"'

var myGM_topLine6 = document.createElement("div");
myGM_topLine6.setAttribute('id', 'myGM_topLine6');

myGM_topLine6.innerHTML = '<div '+ myGM_topLine6 + '>' +
        '<div ' + gm_topLineInnerStyle6 + '>' +

"<table><tr><td><a href=\"javascript:ShowHideFight('myGM_topLine8')\"><img src=\"http://marsh-mellow.de/anda/sv.jpg\"></a></td></tr></table> " +

        '</div></div>';

document.body.insertBefore(myGM_topLine6, document.body.firstChild);




//

var gm_topLineHeight7 = '0em';
var gm_topLineColor7 = '#EEAAAA';

var gm_topLineFontSize7 = '10px';
var gm_topLineTextAlign7 = 'left';

var gm_topLineStyle7 = 'style="'+
                'height :' + gm_topLineHeight7 + ';' +
                'background: transparent; ' +
                'color: '+ gm_topLineColor7 + ';"'

var gm_topLineInnerStyle7 = 'style="' +
                'margin: 0px auto 0px auto; ' +
                'position: fixed; top:98px; right:35px; ' +
                'width: 100px; ' +
                'height: 60%; ' +
                'z-index: 100; ' +
                'height :' + gm_topLineHeight7 +
                'border-bottom: 1px solid #000000; ' +
                'margin-bottom: 5px; ' +
                'font-size: ' + gm_topLineFontSize7 + '; ' +
                'text-align: ' + gm_topLineTextAlign7 + ';' +
                'color: '+ gm_topLineColor7 + ';"'

var gm_topLine7 = document.createElement("div");
gm_topLine7.setAttribute('id', 'myGM_topLine7');

gm_topLine7.innerHTML = '<div '+ gm_topLineStyle7 + '>' +
        '<div ' + gm_topLineInnerStyle7 + '>' +


        '</div></div>';

document.body.insertBefore(gm_topLine7, document.body.firstChild);




// Formular Serien Speichern

var inhaltx = document.getElementById("coord_x").value;
var inhalty = document.getElementById("coord_y").value;

var gm_topLineHeight8= '0em';
var gm_topLineColor8 = '#DDDDDD';

var gm_topLineFontSize8 = '12px';
var gm_topLineTextAlign8 = 'left';

var gm_topLineStyle8 = 'style="'+
                'height :' + gm_topLineHeight7 + ';' +
                'background: transparent; ' +
                'color: '+ gm_topLineColor7 + ';"'

var gm_topLineInnerStyle8 = 'style="' +
                'margin: 0px auto 0px auto; ' +
                'position: absolute; top:10px; left:10px; ' +
                'z-index: 200; ' +
                'height :' + gm_topLineHeight8 +
                'border-bottom: 1px solid #000000; ' +
                'margin-bottom: 5px; ' +
                'font-family: Verdana, Geneva, Arial, Helvetica, sans-serif; ' +
                'font-size: ' + gm_topLineFontSize8 + '; ' +
                'font-weight: bold;' +
                'text-align: ' + gm_topLineTextAlign8 + ';' +
                'color: '+ gm_topLineColor8 + ';"'

var gm_topLine8 = document.createElement("div");
gm_topLine8.setAttribute('id', 'myGM_topLine8');

gm_topLine8.innerHTML = '<div '+ gm_topLineStyle8 + '>' +
        '<div ' + gm_topLineInnerStyle8 + '>' +


"<form id=\"sc\" name=\"sc\"><table width=\"480px\" height=\"300px\"  style=\'background-image:url(http://img.andaloria.com/7660/layout/backgrounds/background_buttons.jpg); border:1px solid #000000; padding:2px;\' align=\'left\'> " +
"<tr> <td height=\"13px\" align=\"right\" style=\"background-image:url(http://img.andaloria.com/7660/layout/town_msg_m.jpg);\"><span style=\"color:white\"><b> Position Speichern </b></span><a href=\"javascript:ShowHideFight('myGM_topLine8')\"><img src=\"http://marsh-mellow.de/anda/cancel.png\" style=\"margin-top:-4px;padding-left:160px;\"></a></td> </tr>"+
"<tr> <td align=\"center\"> Aktuelle Position - <span style=\"font-size:13px;\"><b><u>" + inhaltx + ":" + inhalty + "</u></b></span> </td> </tr>"+
"<tr><td><table>" +

"<tr> <td>1) </td><td > Name</td><td> <input name=\"besch1\" value=\"" + besch1 + "\" size=\"16\" maxlength=\"30\" type=\"text\" style=\"background-image:url(http://img.andaloria.com/7660/layout/town_msg_m.jpg); color:white;\"></td>  <td> </td> </tr>"+
"<tr> <td>   </td><td> Nord</td><td> <input name=\"o1x\" value=\"" + o1x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart1()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart1b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a> </td>  <td> Ost </td><td><input name=\"o2x\" value=\"" + o2x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart2()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart2b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td> </tr>"+
"<tr> <td>   </td><td> Süd </td><td> <input name=\"o3x\" value=\"" + o3x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart3()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart3b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a> </td>  <td> West </td><td><input name=\"o4x\" value=\"" + o4x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart4()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart4b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td> </tr>"+

"<tr> <td>2) </td><td> Name</td><td> <input name=\"besch5\" value=\"" + besch5 + "\" size=\"16\" maxlength=\"30\" type=\"text\" style=\"background-image:url(http://img.andaloria.com/7660/layout/town_msg_m.jpg); color:white;\"></td>  <td> </td> </tr>"+
"<tr> <td>   </td><td> Nord </td><td><input name=\"o5x\" value=\"" + o5x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart5()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart5b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td>  <td> Ost </td><td><input name=\"o6x\" value=\"" + o6x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart6()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart6b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td> </tr>"+
"<tr> <td>   </td><td> Süd </td><td> <input name=\"o7x\" value=\"" + o7x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart7()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart7b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td>  <td> West </td><td><input name=\"o8x\" value=\"" + o8x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart8()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart8b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td> </tr>"+

"<tr> <td>3) </td><td> Name</td><td> <input name=\"besch9\" value=\"" + besch9 + "\" size=\"16\" maxlength=\"30\" type=\"text\" style=\"background-image:url(http://img.andaloria.com/7660/layout/town_msg_m.jpg); color:white;\"></td>  <td> </td> </tr>"+
"<tr> <td>   </td><td> Nord </td><td><input name=\"o9x\" value=\"" + o9x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart9()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart9b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td>  <td> Ost </td><td><input name=\"o10x\" value=\"" + o10x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart10()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart10b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td> </tr>"+
"<tr> <td>   </td><td> Süd  </td><td><input name=\"o11x\" value=\"" + o11x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart11()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart11b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td>  <td> West </td><td><input name=\"o12x\" value=\"" + o12x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart12()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart12b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td> </tr>"+

"<tr> <td>4) </td><td> Name</td><td> <input name=\"besch10\" value=\"" + besch10 + "\" size=\"16\" maxlength=\"30\" type=\"text\" style=\"background-image:url(http://img.andaloria.com/7660/layout/town_msg_m.jpg); color:white;\"></td>  <td> </td> </tr>"+
"<tr> <td>   </td><td> Nord </td><td><input name=\"o13x\" value=\"" + o13x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart13()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart13b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td>  <td> Ost </td><td><input name=\"o14x\" value=\"" + o14x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart14()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart14b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td> </tr>"+
"<tr> <td>   </td><td> Süd  </td><td><input name=\"o15x\" value=\"" + o15x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart15()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart15b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td>  <td> West </td><td><input name=\"o16x\" value=\"" + o16x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart16()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart16b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td> </tr>"+

"<tr> <td>5) </td><td> Name </td><td><input name=\"besch11\" value=\"" + besch11 + "\" size=\"16\" maxlength=\"30\" type=\"text\" style=\"background-image:url(http://img.andaloria.com/7660/layout/town_msg_m.jpg); color:white;\"></td>  <td> </td> </tr>"+
"<tr> <td>   </td><td> Nord </td><td><input name=\"o17x\" value=\"" + o17x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart17()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart17b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td>  <td> Ost </td><td><input name=\"o18x\" value=\"" + o18x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart18()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart18b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td> </tr>"+
"<tr> <td>   </td><td> Süd  </td><td><input name=\"o19x\" value=\"" + o19x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart19()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart19b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td>  <td> West </td><td><input name=\"o20x\" value=\"" + o20x + "\" size=\"15\" maxlength=\"49\" type=\"text\"></td><a href=\"javascript:setStart20()\"><img src=\"http://marsh-mellow.de/anda/ok.png\"></a> &nbsp; <a href=\"javascript:setStart20b()\"><img src=\"http://marsh-mellow.de/anda/cancel.png\"></a></td> </tr>"+


"</td></tr></table></td></tr> " +
"<tr> <td colspan=\"4\" align=\"center\"><input type=\"button\" value=\"&Uuml;bernehmen\" onClick=\"setCookie(); javascript:ShowHideFight('myGM_topLine8');\"></td> </tr>"+
"</table></td></tr>" +
"</table></form>" +

        '</div></div>';



document.body.insertBefore(gm_topLine8, document.body.firstChild);








// Menue Buttons

var gm_topLineHeight5 = '0em';
var gm_topLineColor5 = '#fff';

var gm_topLineFontSize5 = 'small';
var gm_topLineTextAlign5 = 'left';

var gm_topLineStyle5 = 'style="'+
                'height :' + gm_topLineHeight5 + ';' +
                'background: transparent; ' +
                'color: '+ gm_topLineColor5 + ';"'

var gm_topLineInnerStyle5 = 'style="' +
                'margin: 0px auto 0px auto; ' +
                'position: fixed; top:143px; left:945px; ' +
                'width: 20px; ' +
                'z-index: 100; ' +
                'height :' + gm_topLineHeight5 +
                'border-bottom: 1px solid #000000; ' +
                'font-size: ' + gm_topLineFontSize5 + '; ' +
                'text-align: ' + gm_topLineTextAlign5 + ';' +
                'color: '+ gm_topLineColor5 + ';"'

var gm_topLine5 = document.createElement("div");
gm_topLine5.setAttribute('id', 'myGM_topLine5');

gm_topLine5.innerHTML = '<div '+ gm_topLineStyle5 + '>' +
        '<div ' + gm_topLineInnerStyle5 + '>' +

"<table style=\'background-color:transparent;border:0px solid black;padding:0px;margin:0px;\' align=\'left\'>"+
"<tr><td><a href=\"javascript:ShowHideFight('myGM_topLine3'); javascript:ShowHideFight('myGM_topLine6');\"><img class=\"my\" src=\"http://marsh-mellow.de/anda/bttn.jpg\"></a></td></tr> " +
"</td></tr></table>" +

        '</div></div>';

document.body.insertBefore(gm_topLine5, document.body.firstChild);