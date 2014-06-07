// ==UserScript==
// @name     E-learning Import List from Electsys
// @namespace -
// @include  http://backup.se.sjtu.edu.cn/elearning/course/importcoursestudent.asp*
// @include  http://backup.se.sjtu.edu.cn/elearning/studentmanage/studentlist.asp*
// @description 从electsys向elearning导入学生名单(需要两网站的管理员权限)。
// @version  1.0.2
// ==/UserScript==


// 导入界面
if (window.location.href.indexOf(
  "http://backup.se.sjtu.edu.cn/elearning/course/importcoursestudent.asp"
  )!=-1) {

const
  BSID_URL="bsid=";
  ElectSys_StudentList
    = "http://electsys.sjtu.edu.cn/edu/teacher/studentlist.aspx?";
  ElectSys_TimeOut
    = "http://electsys.sjtu.edu.cn/edu/outTimePage.aspx";
  STUDENTID_PRE
    = '<td width="70" class="tabitem">';
  STUDENTNAME_PRE
    = '<td width="50" class="tabitem">';

// 获取当前地址栏中的bsid
function getBSID(str) {
  if (str.indexOf(BSID_URL)!=-1) {
    str=str.substring(str.indexOf(BSID_URL)+BSID_URL.length,str.length);
    if (str.indexOf("&")!=-1) str=str.substring(0,str.indexOf("&"));
    return isNaN(Number(str))?null:Number(str);
  } else return null;
}
var bsid=getBSID(window.location.href);

function reform(response) {
  // 检查页面读取是否正常
  if (response.status!=200)
    if (confirm("读取“"+ElectSys_StudentList+bsid+"”发生错误：\n"+
      response.status+" "+response.statusText+
      "\n点击确定重试。")) location.reload();
    else return;
  if (response.finalUrl==ElectSys_TimeOut) 
    if (confirm("错误：教学信息服务网账号未登录或已超时。"+
      "\n点击确定重试。")) location.reload();
    else return;
  // 从该页面中获取对应的学号姓名等信息
  var student_id="", student_name="";
  var ta=document.getElementsByTagName("textarea")[0];
  var list=response.responseText, loc=0;
  while ((loc=list.indexOf(STUDENTID_PRE))!=-1) {
    list=list.substring(loc+STUDENTID_PRE.length,list.length);
    student_id=list.substring(0,list.indexOf("<"));
    if (student_id=="") continue;
    list=list.substring(
      list.indexOf(STUDENTNAME_PRE)+STUDENTNAME_PRE.length,list.length);
    student_name=list.substring(0,list.indexOf("<"));
    ta.value+=student_name+","+student_id+"\n";
  }
}
// 利用GreaseMonkey的API获取网页内容
if (bsid) 
  GM_xmlhttpRequest({
    method  : "GET",
    url     : ElectSys_StudentList+BSID_URL+bsid,
    onload  : reform
  });

}

// 选课学生查看页面
if (window.location.href.indexOf(
  "http://backup.se.sjtu.edu.cn/elearning/studentmanage/studentlist.asp"
  )!=-1) {
  const
    IMPORT_URL = "importcoursestudent.asp";
  var linkList = document.getElementsByTagName("a");
  for (var i=0; i<linkList.length; i++)
   if (linkList[i].getAttribute("href") &&
       linkList[i].getAttribute("href").indexOf(IMPORT_URL)!=-1) 
   break;
  linkList[i].setAttribute("onclick","return (function inputBSID() {     \n\
    var text_input,bsid;                                                 \n\
    do {                                                                 \n\
      text_input=prompt('请输入该课程对应的bsid号或含有该号码的URL：');  \n\
      if (!text_input) return true;                                      \n\
      if (text_input.indexOf('bsid=')!=-1) {                             \n\
        text_input=text_input.substring(                                 \n\
          text_input.indexOf('bsid=')+'bsid='.length,text_input.length); \n\
        if (text_input.indexOf('&')!=-1)                                 \n\
          text_input=text_input.substring(0,text_input.indexOf('&'));    \n\
      }                                                                  \n\
      text_input=isNaN(Number(text_input))?null:Number(text_input);      \n\
      if (!text_input) alert('输入无法识别，如无需导入请留空。');        \n\
    } while (!text_input);                                               \n\
    if (bsid=text_input) {                                               \n\
      setAttribute('href',href+'&'+'bsid='+bsid);                        \n\
      return true;                                                       \n\
    } else return false;                                                 \n\
  })();");
}