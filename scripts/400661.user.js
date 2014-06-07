// ==UserScript==
// @name       签到全选
// @namespace  
// @version    0.1
// @description  
// @match      http://218.1.73.12/PingJia/Default.aspx*
// @copyright  2014+, Jast
// ==/UserScript==


if(!document.getElementById('gvquestion_ctl02_rblscore_4').disabled){
document.getElementById('gvquestion_ctl02_rblscore_4').checked='checked';
    document.getElementById('gvquestion_ctl03_rblscore_4').checked='checked';
    document.getElementById('gvquestion_ctl04_rblscore_4').checked='checked';
    document.getElementById('gvquestion_ctl05_rblscore_4').checked='checked';
    document.getElementById('gvquestion_ctl06_rblscore_4').checked='checked';
    document.getElementById('rblcomment_0').checked='checked';

var sel = document.getElementById('ddlcourse'); 
var tec = sel.options[sel.selectedIndex].text.substr(0,1);
document.getElementsByTagName('textarea')[0].value='感谢' + tec + '老师！'
}