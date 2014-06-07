// ==UserScript==
// @name        Buttplug for PersoAnal Office
// @namespace   po
// @match     http://po/po/personal_docs_exec.php?f=docs&option=notready&page_num=&route=*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1
// ==/UserScript==


var at ='';
var route  = $('#document_chk_1').val();


var sts = $('form[name=docum_list]').html();
var myRe = /(overlib\(')(.*)(\', CAPTION)/gi;
var ovelibinfo = myRe.exec(sts);
var table = ovelibinfo[2];


var re = /\\"/gi;
var re2 = /\\'/gi;

var table = table.replace(re, "\"");
table = table.replace(re2, "\"");
table ="<div id='tmpdatatable'>"+table+"</div>";

$('#TD123').prepend(table);

var num = $('form[name=docum_list] table tbody tr:nth-child(3n) td:nth-child(6n)').html();
var date = $('form[name=docum_list] table tbody tr:nth-child(3n) td:nth-child(7n)').html();

var maintitle = $('#tmpdatatable table tbody tr:nth-child(1n) td:nth-child(2n)').html();
var subj = $('#tmpdatatable table tbody tr:nth-child(10n) td:nth-child(2n)').html();
var description = $('#tmpdatatable table tbody tr:nth-child(11n) td:nth-child(2n)').html();

at +='<div style="">';
at +='<h2>'+maintitle+' // '+subj+'</h2>';
at +='№'+num+' от'+date+'<br><br>';
at +='<b>Примечание: </b><br>'+description+'<br><br>';
at +='<b>Файлы: </b><br>';
var files = $('form[name=docum_list] table tbody tr:nth-child(3n) td:nth-child(3n) font a');

files.each(function(){
label = 'скачать файл';
label = this.title;
at+= '<li><a href="'+this.href+'" download="file.ind">'+label+'</a></li>';
});


//alert($('#tmpdatatable table tbody tr:nth-child(10n) td:nth-child(2n)').html());

at +='<br><br></div><a href="#" onclick="alert(\'для этого нужно отключить скрипт ;-)\')">вернуть адъ</a>';

//$('#TD123').prepend(at);
//showTooltip22167
$('#TD123').html(at);
$('#MenuTable').hide();


var body = $('body').html();

var re3 = /Персональный офис/gi;
var body = body.replace(re3, "Персоанальный офис");
$('body').html(body);