// ==UserScript==
// @name           bb_salary_calculator
// @author         Joker @ II.3 FEx
// @source	   http://163.25.102.134/bbsc.user.js
// @include        http://www.buzzerbeater.com/*
// #2009/11 v1.0 球員個人頁面顯示下季薪資
// #2009/12 v1.1 轉會球員顯示薪資、全隊球員各別顯示薪資、全隊下季薪資統計
//          v1.2 球員個人增加soft cap上限
//          v1.3 切換聯盟連結、顯示職員最低薪資期限
// #2010/01      新增IV聯連結
// #2010/02      更新潛力對應薪資上限
//
// 發現bug、新功能建議歡迎在m群上提出。enjoy it!!
// ==/UserScript==

//Make script accessible to Firebug 
function a() {return a.caller.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')}
document.body.appendChild(document.createElement('script')).innerHTML=a();
return;

//cookie處理
//***儲存cookie
function saveCookie(name,value,expires,path,domain,secure)
{
 var strCookie = name + "=" + value;
 if (expires){
              var curTime = new Date();
              curTime.setTime(curTime.getTime() + expires*24*60*60*1000);
              strCookie += "; expires=" + curTime.toGMTString();
              }
 strCookie += (path) ? "; path=" + path : "";
 strCookie += (domain) ? "; domain=" + domain : "";
 strCookie += (secure) ? "; secure" : "";
 document.cookie = strCookie;
}

//***取值cookie
function getCookie(name)
{
 var strCookies = document.cookie;
 var cookieName = name + "="; //cookie名稱
 var valueBegin, valueEnd, value;//尋找是否有此cookie名稱
 valueBegin = strCookies.indexOf(cookieName);
 if (valueBegin == -1) return null; //沒找到
 valueEnd = strCookies.indexOf(";", valueBegin);
 if (valueEnd == -1) valueEnd = strCookies.length;
 value = strCookies.substring(valueBegin+cookieName.length,valueEnd);
 return value;
}
//***檢查cookie存在
function checkCookieExist(name)
{
 if (getCookie(name)) return true;
 else return false;
}
//***刪除cookie
function deleteCookie(name,path,domain)
{
 var strCookie;
 if (checkCookieExist(name))
 {
 strCookie = name + "=";
 strCookie += (path) ? ";path=" + path : "";
 strCookie += (domain) ? "; domain=" + domain : "";
 strCookie += "; expires=Thu, 01-Jan-70 00:00:01 GMT";
 document.cookie = strCookie;
 }
}
//常數表
    var cem = [1,1,1.008,1.002,1,1,1.129,1.138,1.130,1.064,1,1.003,1,293];// 常數表
    var pfm = [1.071,1,1.008,1,1,1.007,1.114,1.116,1.110,1.067,1.008,1,1.008,277];
    var sfm = [1.177,1.080,1.068,1,1,1,1,1.058,1.088,1.002,1.001,1,1.006,315];
    var sgm = [1.115,1.142,1.120,1.005,1.016,1.001,1,1.001,1.064,1.001,1.008,1.005,1.003,295];
    var pgm = [1.027,1.044,1.078,1.080,1.040,1.152,1.002,1,1.035,1,1.004,1,1,300];
    var potm = ["5,000","5,000","9,500","11,500 ~ 13,500","21,000 ~ 24,000","33,000 ~ 40,000","43,000 ~ 65,000","80,000 ~ 100,000","125,000 ~ 145,000","195,000 ~ 230,000","500,000+","1,000,000+"];//潛力-薪資上限

var docWeek=0;var trainWeek=0;var prWeek=0;

if(checkCookieExist("docDueDate"))
{
var a=getCookie("docDueDate")
a=new Date(a);
var c = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
var usesweek=Math.round((a-c)/1000/3600/24/7);
if (usesweek>=0)
docWeek="還有"+usesweek+"周";
else
docWeek="<font color=red>已超過</font>"+Math.abs(usesweek)+" 周";
}
else
{docWeek="尚未設定"}
if(checkCookieExist("trainDueDate"))
{
var a=getCookie("trainDueDate")
a=new Date(a);
var c = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
var usesweek=Math.round((a-c)/1000/3600/24/7);
if (usesweek>=0)
trainWeek="還有"+usesweek+"周";
else
trainWeek="<font color=red>已超過</font>"+Math.abs(usesweek)+" 周";
}
else
{trainWeek="尚未設定"}
if(checkCookieExist("prDueDate"))
{
var a=getCookie("prDueDate")
a=new Date(a);
var c = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate());
var usesweek=Math.round((a-c)/1000/3600/24/7);
if (usesweek>=0)
prWeek="還有"+usesweek+"周";
else
prWeek="<font color=red>已超過</font>"+Math.abs(usesweek)+" 周";
}
else
{prWeek="尚未設定"}

var docDes="隊醫薪資最低："+docWeek;
var trainDes="<br>訓練員薪資最低："+trainWeek;
var prDes="<br>公關薪資最低："+prWeek;

//切換聯盟link
if(!/forum/.test(location.href))
{
var obj1=document.createElement("p");
document.getElementById("rightColumn").insertBefore(obj1,document.getElementById("rightColumn").childNodes[2]);
obj1.innerHTML=docDes+trainDes+prDes+
"<br><br><select name='mySelect' id='s1' style='width:100px' onchange='javascript:changeLeague(value)'><option value='1'>--瀏覽各聯盟--</option>"+
"<option value='2319'>I.1</option><option value='2320'>II.1</option><option value='2321'>II.2</option><option value='2322'>II.3</option><option value='2323'>II.4</option>"+
"<option value='7817'>III.1</option><option value='7818'>III.2</option><option value='7819'>III.3</option><option value='7820'>III.4</option><option value='7821'>III.5</option><option value='7822'>III.6</option><option value='7823'>III.7</option><option value='7824'>III.8</option>"+
"<option value='7825'>III.9</option><option value='7826'>III.10</option><option value='7827'>III.11</option><option value='7828'>III.12</option><option value='7829'>III.13</option><option value='7830'>III.14</option><option value='7831'>III.15</option><option value='7832'>III.16</option>"+
"<option value='13487'>IV.1</option><option value='13488'>IV.2</option><option value='13489'>IV.3</option><option value='13490'>IV.4</option><option value='13491'>IV.5</option><option value='13492'>IV.6</option><option value='13493'>IV.7</option><option value='13494'>IV.8</option>"+
"<option value='13495'>IV.9</option><option value='13496'>IV.10</option><option value='13497'>IV.11</option><option value='13498'>IV.12</option><option value='13499'>IV.13</option><option value='13500'>IV.14</option><option value='13501'>IV.15</option><option value='13502'>IV.16</option>"+
"<option value='13503'>IV.17</option><option value='13504'>IV.18</option><option value='13505'>IV.19</option><option value='13506'>IV.20</option><option value='13507'>IV.21</option><option value='13508'>IV.22</option><option value='13509'>IV.23</option><option value='13510'>IV.24</option>"+
"<option value='13511'>IV.25</option><option value='13512'>IV.26</option><option value='13513'>IV.27</option><option value='13514'>IV.28</option><option value='13515'>IV.29</option><option value='13516'>IV.30</option><option value='13517'>IV.31</option><option value='13518'>IV.32</option>"+
"</select>";

function changeLeague(lgname)
{
var link ="http://www.buzzerbeater.com/league/"+lgname+"/overview.aspx";
window.location.href=link;
}
}

//*****************************************職員頁面
if(/staff.aspx/.test(location.href))
{
var staffdiv=document.createElement("div");
document.getElementById("ctl00_cphContent_rptrStaff_ctl01_btnFire").parentNode.appendChild(staffdiv);
staffdiv.innerHTML="<br><input type='button' name='docPButton' style='width:30px' value='編輯' onclick='staffEdit(1)'>";
var staffdiv=document.createElement("div");
document.getElementById("ctl00_cphContent_rptrStaff_ctl02_btnFire").parentNode.appendChild(staffdiv);
staffdiv.innerHTML="<br><input type='button' name='docPButton' style='width:30px' value='編輯' onclick='staffEdit(2)'>";
var staffdiv=document.createElement("div");
document.getElementById("ctl00_cphContent_rptrStaff_ctl03_btnFire").parentNode.appendChild(staffdiv);
staffdiv.innerHTML="<br><input type='button' name='docPButton' style='width:30px' value='編輯' onclick='staffEdit(3)'>";


var nowis;

function staffEdit(class)
{
var startsalary = prompt("輸入初始工資："); 
var buyprice = prompt("輸入買價："); 
var level = prompt("輸入職員等級：　　範圍：1　~　7"); 

var date = prompt("輸入購入日期：　　格式：yyyy/mm/dd"); 
//var nowsalary = prompt("輸入本周薪水："); 

var rate=[1,0.01,0.0125,0.015,0.0175,0.02,0.0225,0.025];
var week=staffCal(parseInt(buyprice),parseInt(startsalary),rate[level]);	

var a=new Date(date.split("/")[0],date.split("/")[1]-1,date.split("/")[2]);//轉換成時間標準格式
a=a.valueOf();
a=a+ 1000*3600*24*7*week
a=new Date(a);
  if (class==1) 
  {
  saveCookie("docDueDate",a,360,"/","buzzerbeater.com");
  }
  else if(class==2)
  {
  saveCookie("trainDueDate",a,360,"/","buzzerbeater.com");
  }
  else 
  {
  saveCookie("prDueDate",a,360,"/","buzzerbeater.com");
  }
}

//薪資計算function
function staffCal(buyprice,startsalary,rate,now)
{
var current=startsalary;
var next=current*(1+rate);
var average=current+next+buyprice;
var min=average;
var week;
  for(i=2;i<=100;i++)
  {
   if(now==current) 
   {
   nowis=i;
   }
   current=next;
   next=next*(1+rate);
   average=(average*(i-1)+next)/i
   if (min>average)
   min=average;
   else
   {week=i-1; 
   break;}
  }
min=Math.round(min);
return week;
}
}

//*****************************************轉會頁面
if(/transferlist/.test(location.href))
{   
    var stat = new Array();
    for(var i=0;i<=9;i++){
    stat[0] = document.getElementById("ctl00_cphContent_rptListedPlayers_ctl0"+i+"_skillPanel_sdJumpShot_linkDen").title;// 跳投
    stat[1] = document.getElementById("ctl00_cphContent_rptListedPlayers_ctl0"+i+"_skillPanel_sdJumpRange_linkDen").title; // 範圍
    stat[2] = document.getElementById("ctl00_cphContent_rptListedPlayers_ctl0"+i+"_skillPanel_sdperimDef_linkDen").title; // 外防
    stat[3] = document.getElementById("ctl00_cphContent_rptListedPlayers_ctl0"+i+"_skillPanel_sdhandling_linkDen").title; // 控球
    stat[4] = document.getElementById("ctl00_cphContent_rptListedPlayers_ctl0"+i+"_skillPanel_sddriving_linkDen").title; // 運球
    stat[5] = document.getElementById("ctl00_cphContent_rptListedPlayers_ctl0"+i+"_skillPanel_sdpassing_linkDen").title; // 傳球
    stat[6] = document.getElementById("ctl00_cphContent_rptListedPlayers_ctl0"+i+"_skillPanel_sdinsideShot_linkDen").title; // 內投
    stat[7] = document.getElementById("ctl00_cphContent_rptListedPlayers_ctl0"+i+"_skillPanel_sdinsideDef_linkDen").title; // 內防
    stat[8] = document.getElementById("ctl00_cphContent_rptListedPlayers_ctl0"+i+"_skillPanel_sdrebound_linkDen").title; // 籃板
    stat[9] = document.getElementById("ctl00_cphContent_rptListedPlayers_ctl0"+i+"_skillPanel_sdshotBlock_linkDen").title; // 封阻
    stat[10] = document.getElementById("ctl00_cphContent_rptListedPlayers_ctl0"+i+"_skillPanel_sdstamina_linkDen").title; // 體能
    stat[11] = document.getElementById("ctl00_cphContent_rptListedPlayers_ctl0"+i+"_skillPanel_sdfreeThrow_linkDen").title; // 罰球
    stat[12] = document.getElementById("ctl00_cphContent_rptListedPlayers_ctl0"+i+"_skillPanel_sdexperience_linkDen").title; // 經驗
    stat[13] = 1;
    
    var center=1;
    var pf=1;
    var sf=1;
    var sg=1;
    var pg=1;

    for(var j=0;j<=13;j++){
        if(stat[j]=="20+")
        stat[j]=20;
        center*=Math.pow(cem[j],stat[j]);
        pf*=Math.pow(pfm[j],stat[j]);
        sf*=Math.pow(sfm[j],stat[j]);
        sg*=Math.pow(sgm[j],stat[j]);
        pg*=Math.pow(pgm[j],stat[j]);
        };

   var maxpos="";
   var maxsal=Math.max(sg,pg,sf,pf,center);

   if(maxsal==center){maxpos="C";}
   if(maxsal==pf){maxpos="PF";}
   if(maxsal==sf){maxpos="SF";}
   if(maxsal==sg){maxpos="SG";}
   if(maxsal==pg){maxpos="PG";}

    var newsal = document.getElementById("ctl00_cphContent_rptListedPlayers_ctl0"+i+"_skillPanel_sdexperience_linkDen");
    td = document.createElement("td");
    br = document.createElement("br");
    text = document.createTextNode("下季薪水："+Math.round(maxsal));
    text1 = document.createTextNode("推薦位置："+ maxpos);
    td.appendChild(text);
    td.appendChild(br);    
    td.appendChild(text1);
    newsal.parentNode.parentNode.appendChild(td);
    newsal.parentNode.parentNode.removeChild(newsal.parentNode.parentNode.childNodes[3]);
};

}

//*****************************************單一球員頁面
if(/overview/.test(location.href))
{
    var stat = new Array();
    stat[0] = document.getElementById("ctl00_cphContent_skillTable_sdJumpShot_linkDen").title;// 跳投
    stat[1] = document.getElementById("ctl00_cphContent_skillTable_sdJumpRange_linkDen").title;// 範圍
    stat[2] = document.getElementById("ctl00_cphContent_skillTable_sdperimDef_linkDen").title;// 外防
    stat[3] = document.getElementById("ctl00_cphContent_skillTable_sdhandling_linkDen").title;// 控球
    stat[4] = document.getElementById("ctl00_cphContent_skillTable_sddriving_linkDen").title;// 運球
    stat[5] = document.getElementById("ctl00_cphContent_skillTable_sdpassing_linkDen").title;// 傳球
    stat[6] = document.getElementById("ctl00_cphContent_skillTable_sdinsideShot_linkDen").title;// 內投
    stat[7] = document.getElementById("ctl00_cphContent_skillTable_sdinsideDef_linkDen").title;// 內防
    stat[8] = document.getElementById("ctl00_cphContent_skillTable_sdrebound_linkDen").title;// 籃板
    stat[9] = document.getElementById("ctl00_cphContent_skillTable_sdshotBlock_linkDen").title;// 封阻
    stat[10] =document.getElementById("ctl00_cphContent_skillTable_sdstamina_linkDen").title;// 體力
    stat[11] =document.getElementById("ctl00_cphContent_skillTable_sdfreeThrow_linkDen").title;// 罰球
    stat[12]= document.getElementById("ctl00_cphContent_skillTable_sdexperience_linkDen").title;// 經驗
    stat[13]= 1;
     
 
    var center=1;
    var pf=1;
    var sf=1;
    var sg=1;
    var pg=1;

    for (var i=0; i<=13; i++){
        if(stat[i]=="20+")
        stat[i]=20;
        center*= Math.pow(cem[i],stat[i]);
        pf*=Math.pow(pfm[i],stat[i]);
        sf*=Math.pow(sfm[i],stat[i]);
        sg*=Math.pow(sgm[i],stat[i]);
        pg*=Math.pow(pgm[i],stat[i]);
        };

   var maxpos="";
   var maxsal=Math.max(sg,pg,sf,pf,center);

   if(maxsal==center){maxpos="C";};
   if(maxsal==pf){maxpos="PF";};
   if(maxsal==sf){maxpos="SF";};
   if(maxsal==sg){maxpos="SG";};
   if(maxsal==pg){maxpos="PG";};

   var pot=document.getElementById("ctl00_cphContent_potential_linkDen").title;//潛力值
   if (pot=="10+")pot=11;

    var newsal = document.getElementById("ctl00_cphContent_panelDraftLink");
    if(newsal.hasChildNodes()) { 
        newsal.removeChild(newsal.childNodes[0]);
    };
    var text = document.createTextNode("下季薪水："+Math.round(maxsal)+"  推薦位置："+ maxpos+"　　　　　＊薪資上限估計：$"+potm[pot]); 
    newsal.appendChild(text); 
}
//*****************************************全隊球員頁面
if(/players/.test(location.href))
{   
    var header;
    var tosal=0;
    var stat = new Array();
    try{
    for(var i=0;i<=30;i++){
    if(i>=10)
    header="ctl00_cphContent_Repeater1_ctl"+i;
    else
    header="ctl00_cphContent_Repeater1_ctl0"+i;
    stat[0] = document.getElementById(header+"_skillPanel_sdJumpShot_linkDen").title;// 跳投
    stat[1] = document.getElementById(header+"_skillPanel_sdJumpRange_linkDen").title; // 範圍
    stat[2] = document.getElementById(header+"_skillPanel_sdperimDef_linkDen").title; // 外防
    stat[3] = document.getElementById(header+"_skillPanel_sdhandling_linkDen").title; // 控球
    stat[4] = document.getElementById(header+"_skillPanel_sddriving_linkDen").title; // 運球
    stat[5] = document.getElementById(header+"_skillPanel_sdpassing_linkDen").title; // 傳球
    stat[6] = document.getElementById(header+"_skillPanel_sdinsideShot_linkDen").title; // 內投
    stat[7] = document.getElementById(header+"_skillPanel_sdinsideDef_linkDen").title; // 內防
    stat[8] = document.getElementById(header+"_skillPanel_sdrebound_linkDen").title; // 籃板
    stat[9] = document.getElementById(header+"_skillPanel_sdshotBlock_linkDen").title; // 封阻
    stat[10] = document.getElementById(header+"_skillPanel_sdstamina_linkDen").title; // 體能
    stat[11] = document.getElementById(header+"_skillPanel_sdfreeThrow_linkDen").title; // 罰球
    stat[12] = document.getElementById(header+"_skillPanel_sdexperience_linkDen").title; // 經驗
    stat[13] = 1;

    var center=1;
    var pf=1;
    var sf=1;
    var sg=1;
    var pg=1;

    for (var j=0; j<=13; j++){
        if(stat[j]=="20+")
        stat[j]=20;
        center*=Math.pow(cem[j],stat[j]);
        pf*=Math.pow(pfm[j],stat[j]);
        sf*=Math.pow(sfm[j],stat[j]);
        sg*=Math.pow(sgm[j],stat[j]);
        pg*=Math.pow(pgm[j],stat[j]);
        };

   var maxpos="";
   var maxsal=Math.max(sg,pg,sf,pf,center);

   if(maxsal==center){maxpos="C";}
   if(maxsal==pf){maxpos="PF";}
   if(maxsal==sf){maxpos="SF";}
   if(maxsal==sg){maxpos="SG";}
   if(maxsal==pg){maxpos="PG";}

    var newsal = document.getElementById(header+"_skillPanel_sdexperience_linkDen");
    br = document.createElement("td");
    br1 = document.createElement("br");
    text = document.createTextNode("下季薪水："+Math.round(maxsal));
    text1 = document.createTextNode("推薦位置："+ maxpos);
    br.appendChild(text);
    br.appendChild(br1);    
    br.appendChild(text1);
    newsal.parentNode.parentNode.appendChild(br);
    newsal.parentNode.parentNode.removeChild(newsal.parentNode.parentNode.childNodes[3]);
    tosal+=Math.round(maxsal);
    
}}
finally{
var text1=document.getElementById("ctl00_cphContent_lblNumberOfPlayers");
br = document.createElement("br");
var text2=document.createTextNode("下季球隊總薪資為：$"+tosal);
text1.appendChild(br);
text1.appendChild(text2);
}
}