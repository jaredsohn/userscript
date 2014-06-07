// ==UserScript==
// @name            KUAS Enhanced Mod
// @namespace	    http://www.grd.idv.tw/about
// @description	    fix every vbscript and no need IE anymore.
// @include         http://140.127.113.*/kuas/*
// @include         http://140.127.113.*/kuas/system/*
// @version         1.5.2
// @author          Louie Lu (grapherd at gmail dot com)
// require         http://update.sizzlemctwizzle.com/176759.js?uso
// @updateURL       http://userscripts.org/scripts/source/176759.user.js
// @downloadURL     http://userscripts.org/scripts/source/176759.user.js
// @grant           GM_info
// @grant           GM_xmlhttpRequest
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_openInTab
// @grant           GM_registerMenuCommand
// ==/UserScript==

//== Update Log ==
// 1.5.2:
//    個人課表老師名子處加上大頭照, 目前僅有資工系教師
// 1.5.1:
//    修改密碼的新密碼改為 password(非明碼顯示)
// 1.5.0:
//    update 學雜費列印
//    fix server problem (not only 231, 227...etc)
//


//var SUC_script_num = 176759; // Change this to the number given to the script by userscripts.org (check the address bar)
//try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


var change_pwd = 'function change_pwd_onclick(){thisform.action="system/sys010_changepwd.jsp";thisform.submit()}';
var send_pwd = 'function send_pwd(){if(!thisform.opwd.value){alert("密碼欄不可為空白！");thisform.opwd.focus();return 0}if(!thisform.spwd.value){alert("確認密碼欄位不可空白！");thisform.spwd.focus();return 0}if(thisform.opwd.value!=thisform.spwd.value){alert("密碼不一致，請重新輸入！");thisform.opwd.value="";thisform.spwd.value="";thisform.opwd.focus();return 0}thisform.submit()}';
var relogin = 'function relogin_onclick(){thisform.std_id.value=parent.frames["Lmenu"].document.getElementById("std_id1").value;thisform.action="reclear.jsp";thisform.submit()}';
var of_display = "function of_display(fncid) {thisform.fncid.value = fncid;thisform.submit();}";
var ag112_go_next = 'function go_next(sid){thisform.unt_id.value=sid;thisform.action="ag112_02.jsp";thisform.submit()}';
var ag201_go_next = 'function go_next(s1){thisform.sentvalue.value=s1;thisform.action="ag201_1.jsp";thisform.submit()}';
var ag222_switch_yms = "function switch_yms() { url = document.location.href; thisform.spath.value = url.substring(url.indexOf('=', 40) + 1, url.length); spath = thisform.spath.value;ls = thisform.yms.value.split(',');  thisform.arg01.value = ls[0]; thisform.arg02.value = ls[1];  thisform.action = '../' + thisform.spath.value.substring(0, thisform.spath.value.length - 1);thisform.submit();}"
var ag222_go_next = 'function go_next(s1,s2,s3){thisform.arg01.value=s1;thisform.arg02.value=s2;thisform.arg04.value=s3;thisform.action="ag064_print.jsp";thisform.submit()}';
var ag300_send_onclick = 'function send_onclick(){thisform.action="ag300_02.jsp";thisform.target="bottom";thisform.submit();}';
var ag300_reload = 'function reload(){thisform.action="";thisform.target="top";thisform.submit()}';
var ag304_go_next = 'function go_next(s1,s2,s3){if(typeof s2=="undefined"&&typeof s3=="undefined"){thisform.arg.value=s1;thisform.submit()}else{thisform.arg01.value=s1;thisform.arg02.value=s2;thisform.arg04.value=s3;thisform.action="ag064_print.jsp";thisform.submit()}}';
var ag402_reload = 'function reload(s){thisform.action="ag402_01.jsp";thisform.submit()}';
var ag402_qry = 'function qry(s){if(s=="Y"){if(thisform.emut_kind.value=="dgr"){if(thisform.etxt_list.value!="%"){thisform.action="ag402_02_1.jsp"}else{thisform.action="ag402_02_2.jsp"}}else{thisform.action="ag402_02_3.jsp"}thisform.submit()}}';
var ag450_reload = 'function reload(){thisform.action="ag450_01.jsp";thisform.target="top";thisform.submit()}';
var ag450_go_qry = 'function go_query(){svalue=[thisform.exditem.value,thisform.examdate.value,thisform.exd_prd.value,thisform.division.value,thisform.romkid.value].join("*$*");thisform.content.value=svalue;thisform.action="ag450_03.jsp";thisform.submit()}';

var ay100_go_next = 'function go_next(s1,s2){thisform.ls_apyno.value=s1;thisform.ls_trnno.value=s2;thisform.submit()}';
var ay100_go_selclick = 'function go_selclick(s1,s2,s3,s4,s5,s6){frm1.ls_syear.value=s1;frm1.ls_ssms.value=s2;frm1.ls_serlno.value=s3;frm1.ls_clsid.value=s4;frm1.ls_dgrid.value=s5;frm1.ls_untid.value=s6;frm1.ebtn_goprt.disabled=false}';
var ay100_go_print = 'function go_print(){frm1.action="ay100_pdf.jsp";frm1.submit()}';
var ay101_go_print = 'function go_print(){frm1.action="ay101_pdf.jsp";frm1.submit()}';

var bk001_go_next = 'function go_next(s){thisform.action=s;thisform.submit()}';
var bk0013_go_next_onclick = 'function go_next_onclick(){thisform.action="bk001_4.jsp";thisform.submit()}';
var bk0014_go_next_onclick = 'function go_next_onclick(){thisform2.action="bk001_z20.jsp";thisform2.target="Main";thisform2.submit();}';
var bk0015_go_next_onclick = 'function go_next_onclick(){thisform2.action="bk001_17.jsp";thisform2.target="Main";thisform2.submit();}';
var bk001_pic_photo_display = 'function photo_display(){thisform.enctype="application/x-www-form-urlencoded";thisform.action="bk001_pic_02.jsp";thisform.submit()}';
var bk001_pic_update = 'function upload_onclick(){if(!thisform.file_name.value){alert("檔名不可空白, 請先選擇檔案！");return 0}s1=thisform.file_name.value.trim();thisform.action="bk001_pic_01.jsp";thisform.enctype="multipart/form-data";thisform.submit()}';


var ck001_confirm = 'function confirm_onclick(){form1.confirm.disabled=true;form1.submit()}';
var ck002_go_next = 'function go_next(s){thisform.cba_district.value=s;thisform.submit()}';
var ck002_go_print = 'function go_print(s){thisform.cba_district.value=s;thisform.action="ck002_print.jsp";thisform.submit()}';
var ck003_go_print = 'function go_print(s){thisform.cba_district.value=s;thisform.action="ck003_print.jsp";thisform.submit()}';


console.log(document.location.href);

function add_function(func, check_url, deubg) {
    if (check_url) {
        if (!~document.location.href.search(check_url)) {
            return 0;
        }
    }
    
    var script = document.createElement("script");
    script.innerHTML = func;
    document.body.appendChild(script);
    
    if (debug == true) {
        alert("IN");
    }
}

// f_head function
if (~document.location.href.search('f_head')) {
    document.getElementById('change_pwd').setAttribute('onclick', 'change_pwd_onclick();');
    document.getElementById('relogin').setAttribute('onclick', 'relogin_onclick();');
}
if (~document.location.href.search('sys010_chang')) {
    document.getElementById('sent').setAttribute('onclick', 'send_pwd();');
    document.getElementById('opwd').setAttribute('type', 'password');
}

add_function(send_pwd, 'sys010_chang');
add_function(change_pwd + relogin, 'f_head'); //更換密碼, 重新登入

add_function(of_display, 'f_left.jsp'); // 側邊欄
add_function(ag222_switch_yms, 'ag008.jsp'); // 學期成績
add_function(ag222_switch_yms + ag112_go_next, 'ag112_01.jsp'); // 開課資訊 
add_function(ag222_switch_yms + ag222_go_next, 'ag222.jsp'); // 個人課表
add_function(ag222_go_next, 'ag302'); // 教室課表
add_function(ag201_go_next, 'ag201.jsp'); // 課程規劃表

// 為老師名子加上圖片
var teacher = {"張雲龍": "http://www.csie.kuas.edu.tw/fac_image/wlchang.jpg",
  "陳昭和": "http://www.csie.kuas.edu.tw/fac_image/thchen.jpg",
  "羅孟彥": "",
  "林威成": "http://www.csie.kuas.edu.tw/fac_image/linwc.jpg",
  "張道行": "http://www.csie.kuas.edu.tw/fac_image/thc.jpg",
  "王志強": "http://www.csie.kuas.edu.tw/fac_image/ccw.jpg",
  "蕭淳元": "http://www.csie.kuas.edu.tw/fac_image/cyhsiao.jpg",
  "陳洳瑾": "http://www.csie.kuas.edu.tw/fac_image/jcchen.jpg",
  "楊孟翰": "http://www.csie.kuas.edu.tw/fac_image/menghanyang.jpg",
  "鐘文鈺": "http://www.csie.kuas.edu.tw/fac_image/wychung.jpg"
}

var teacher_key = Object.keys(teacher)

if (~document.location.href.search("ag222")) {
    console.log("IN");
    td = document.getElementsByTagName("td");
    for (var i=0; i < td.length; ++i) {
        for (var j=0; j < teacher_key.length; ++j) {
            if (~td[i].innerHTML.search(teacher_key[j])) {
                td[i].innerHTML += "<img src='" + teacher[teacher_key[j]] + "'></img>";
            }
        }
    }            
}


if (~document.location.href.search('ag300_01')) {
    document.getElementsByClassName('button')[0].setAttribute('onclick', 'send_onclick();');
    
    add_function(ag300_send_onclick + ag300_reload + ag222_go_next, 'ag300'); // 開課課表
}
add_function(ag300_send_onclick + ag300_reload + ag222_go_next, 'ag300'); // 開課課表



add_function(ag304_go_next, 'ag304'); // 班級課表
add_function(ag402_reload + ag402_qry, 'ag402'); // 班級人數

add_function(ag222_switch_yms, 'ak002_01'); // 學生個人缺曠請假明細表
add_function(ag222_switch_yms, 'ak010'); // 學生個人獎懲狀況明細表
add_function(ay100_go_next + ay100_go_selclick + ay100_go_print, 'ay100'); // 學雜費列印
add_function(ay100_go_selclick + ay101_go_print, 'ay101');

// BK001 function //個人資料登入
if (~document.location.href.search('bk001_3')) {
    document.getElementById('go_next').setAttribute('onclick', 'go_next_onclick();');
} else if (~document.location.href.search('bk001_4')) {
    document.getElementById('go_next').setAttribute('onclick', 'go_next_onclick();');
} else if (~document.location.href.search('bk001_z20')) {
    document.getElemetnById('go_next').setAttribute('onclick', 'go_next_onclick();');
}
add_function(bk001_go_next, 'bk001.jsp');
add_function(bk0013_go_next_onclick, 'bk001_3');
add_function(bk0014_go_next_onclick, 'bk001_4');
add_function(bk0015_go_next_onclick, 'bk001_z20');

// BK001 photo
if (~document.location.href.search('bk001_pic')) {
    document.getElemetnById('btn_upload').setAttribute('onclick', 'upload_onclick();');
}
add_function(bk001_pic_photo_display + bk001_pic_update, 'bk001_pic');

// CK001 (紙本作業)學生請假作業
if (~document.location.href.search('ck001_00')) {
    document.getElementById('confirm').setAttribute('onclick', 'confirm_onclick();');
}
add_function(ck001_confirm, 'ck001_00'); //	(紙本作業)學生請假作業

add_function(ck002_go_next + ck002_go_print, 'ck002'); // 機車通行證
add_function(ck002_go_next + ck003_go_print, 'ck003'); // 腳踏車通行證

// Untest function
add_function(ag450_reload + ag450_go_qry, 'ag450'); //未考試教室


/*
 * PRIORITY:
 *   學生基本資料表 
 *
 *
 * DO LIST:
 *  修改密碼
 *  登出
 *
 *  學務資訊查詢:
 *    班級名單(紙本列印)         No premission
 *    學生個人缺曠請假明細表      OK
 *    學生個人獎懲狀況明細表      OK
 *    宿舍優良名單               Not in range
 *    校內宿舍申請結果查詢        Not in time
 *    弱勢助學輔助申請查詢        No premission
 *    學生社團紀錄查詢           NOT SURE
 *    個人兵役申辦紀錄           NOT SURE
 *
 *  總務資訊查詢:
 *    列印學雜費繳費單            Not in time
 *    學雜費繳費收據列印          Not in time
 *
 *  教務登錄作業:
 *  【學生】個人通訊資料維護        Not in time
 *  【學生】銀行帳號登錄作業        No
 *  【系所】暑修開課意願調查作業    Not in time
 * 
 *  學務登錄作業:
 *   學生基本資料表                       !Half
 *   社員登錄作業                         No premission
 *   社團資料維護作業                      No premission
 *   學生會場地租借系統                    No, 404 not found
 *   學期預計活動登錄作業                  No premission
 *   活動申請登錄作業                      No premission
 *   服務學習生銀行帳號登錄作業             No premission
 *   學生服務學習助學金與計畫酬金管理系統     OK
 *   校內宿舍申請登錄                      Not in time
 *   社團活動獎懲建議表登錄                 No premission
 *   行善銷過申請登錄                      Not in time
 *   班級通行證繳費登錄                    No premission
 *   (紙本作業)學生請假作業                Half, please use online version
 *   (線上審核)線上請假與審核作業           OK
 *   
 * 
 *  教務申請作業:
 *   休-復-退學暨畢業申請作業          OK, Original javascript
 *   研究生學位考試申請作業            NaN
 *   學程資格申請                    OK, Original javascript
 *  學務申請作業:
 *   機車通行證申購                   OK
 *   腳踏車通行證申購                 OK
 *   停車證申請作業(施工中)            OK, Original javascirpt, but school testing now
 *   學生公假請假作業                 NO, Can't use
 *   學生班級幹部證明書申請            NaN
 *   學生歷年獎懲證明書申請            NaN
 *   弱勢助學補助申請作業              Not in time
 *   外國產碩助學金申請                OK, Original javascript
 *   生活學習獎助金申請                OK, Original javascript
 *   TA教學助理申請                   OK, Original javascript
 *   TA_通識中心專用教學助理申請        OK, Original javascript
 *   TA_共同科專用教學助理申請          OK, Original javascript
 *   學生出差作業                     NOT SURE...
 *   
 * 卓越教學
 * 其它作業
 * 校友功能
 * 教務資訊查詢：
 *  【學生】學籍資料        OK
 *  【學生】學期成績        OK, ag008, switch_yms
 *  【學生】期中預警資料     NaN
 *  【學生】試務資料        Not in time
 *  【學生】歷年成績        OK
 *  【選課】選課清單        Not in time
 *  【暑修】開課資訊        OK, ag112_go_next
 *  【系所】課程規劃表      OK, ag201_go_next
 *  【系所】課程資料        OK, original javascript
 *  【學生】個人課表        OK, ag222_go_next
 *  【教師】開課課表        !Half, 教學綱要
 *  【系所】教室課表        OK, ag222_go_next
 *  【系所】班級課表        OK, ag304_go_next, ag222_go_next
 *  【系所】班級人數        OK
 *  未考試教室查詢         Untest, ag450
 *  【學生】通識課程查詢      OK, original done
 *  【學生】畢業預審報表(測試中) Not in time
 *  教師補(調)課查詢        NO DATA, white page
 *  學程修習狀況查詢        OK, original javascript
 *  可修學程建議查詢        NO DATA
 *
 */
