// ==UserScript==
// @name          Gladiatus loger
// @namespace     ivancompany@mail.ru
// @description   Give you opportunity to save fighting reports from Gladiatus
// @include       http://*gladiatus.*mod=report*
// ==/UserScript==

function str_replace(search, replace, subject) {
return subject.split(search).join(replace);
}

var report = document.getElementById('battlerep');
var logo = 'bob';
logo = report.innerHTML;

logo=str_replace('<', '&lt;',logo);
logo=str_replace('>', '&gt;',logo);
var patt0=/&lt;!-- content end --&gt;/igm;
var patt2=/\n+|\t+|\r+/igm;
var patt1=/&lt;script.*?\/script&gt;/igm;
var patt3=/input/igm;
var patt4=/=/igm;
var patt5=/\"/igm;
logo=logo.replace(patt0,'');
//logo=logo.replace(patt2,'');
//logo=logo.replace(patt1,'');
logo=logo.replace(patt3,'inp1');
logo=logo.replace(patt4,'ravno');
logo=logo.replace(patt5,'kavi4ka');
logo=str_replace('=','ravno',logo);
logo=str_replace('"','kavi4ka',logo);
logo=str_replace('class', 'clas1s',logo);
logo=str_replace('id', 'i1d',logo);
logo=str_replace('form', 'fo1rm',logo);
logo=str_replace('name', 'na1me',logo);
logo=str_replace('value', 'v1alue',logo);
//logo="value='"+logo+"'";
//report.innerHTML = logo;
report.innerHTML = '<div class="reportHeader reportLose"><form action="http://gladiatuslog.blackget.com/saveReport.php" method="post" target="_blank">'+
'<TEXTAREA name="reptext" style="display: none">'+logo+'</TEXTAREA><input type="submit" value="Save report"></form></div>' +
report.innerHTML;