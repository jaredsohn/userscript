// ==UserScript==
// @name           HADcommentFixerV2
// @namespace      nickswebsite.co.cc
// @description    Fixes HackaDay Comments
// @include        http://hackaday.com/*
// @include        http://*.hackaday.com/*
// @match          http://hackaday.com/*
// @match          http://*.hackaday.com/*
// ==/UserScript==
function readCookie(name,defaultvalue) { // even though the below code include this in the page,
                                         //declare it here for use with the UserScript.
   var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for(var i=0;i < ca.length;i++) {
     var c = ca[i];
     while (c.charAt(0)==' ') c = c.substring(1,c.length);
     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
   }
    return defaultvalue;
   }
function main(){
  window.createCookie = function(name,value,days) {
   if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
   }
   else var expires = "";
   document.cookie = name+"="+value+expires+"; path=/";
  }

   window.readCookie = function(name,defaultvalue) {
   var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for(var i=0;i < ca.length;i++) {
     var c = ca[i];
     while (c.charAt(0)==' ') c = c.substring(1,c.length);
     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
   }
    return defaultvalue;
   }

   //Previous code was found on http://www.last.fm/user/gadgetchannel/journal/2008/12/13/2c01v0_converting_greasemonkey_scripts_to_work_in_google_chrome
   //Using Cookies to store data. cause Google Chrome doest support GM_* functions
   // and for some setting GM_* manually when not defined isn't working...
   // maybe because GM_* functions dont work in-page?
   window.showComm = function(id){
     var comm =document.getElementsByClassName("commentlinks");
     var state = comm[id].childNodes[1].style.display;//="block";
     if(state=="none")comm[id].childNodes[1].style.display="block";
     else comm[id].childNodes[1].style.display="none";
   }
   window.createDialog = function(){
     //create div....
     var configDialog = document.createElement('div');
     configDialog.setAttribute('style','position:fixed;top:50%;left:50%;width:200px;height:150px;background-color:white;margin-left:-100px;margin-top:-75px;display:none;');
     configDialog.setAttribute('id','configDlg');
     configDialog.innerHTML = "<style>"+
                              "#BlockList{position:absolute;left:0px;height:100%;width:60%;color:black;}"+
                              "input.dlg{position:absolute;right:0px;height:19px;}"+
                              "</style>"+
                              "<select size=3 id=\"BlockList\">"+
                              "</select>"+
                              "<input type=\"button\" value=\"Add...\" onclick=\"dlgNewUser();\" class=\"dlg\"/><br/>"+
                              "<input type=\"button\" value=\"Remove\" class=\"dlg\" onclick=\"dlgRmvUser()\"/><br/>"+
                              "<input type=\"button\" value=\"Done\" onclick=\"dlgDone()\" class=\"dlg\"/><br/>"+
                              "<input type=\"button\" value=\"Cancel\" onclick=\"dlgCancel();\" class=\"dlg\"/>";
     document.getElementsByTagName("body")[0].appendChild(configDialog);
     var UserList = eval("("+readCookie("HADBlockList","[]")+")");
     for(i=0;i!=UserList.length;i++){
        document.getElementById("BlockList").innerHTML+="<option>"+UserList[i]+"</option>\n";
     }
   }
   window.dlgRmvUser = function(){
     var list = document.getElementById("BlockList");
     var options = list.getElementsByTagName("option");
     list.removeChild(options[list.selectedIndex]);
   }
   window.dlgNewUser = function(){
     var list = document.getElementById("BlockList");
     var user = prompt("Enter user to add to block list","");
     if(user)
     list.innerHTML+="<option>"+user+"</option>\n";
   }
   window.dlgNewUserPreDef = function(user){
     var list = document.getElementById("BlockList");
     if(user)
     list.innerHTML+="<option>"+user+"</option>\n";
   }
   window.dlgDone = function(){
     var list = document.getElementById("BlockList");
     var options = list.getElementsByTagName("option");
     var JSON = "[";
     for(i=0;i!=options.length;i++){
        JSON+="\""+options[i].innerHTML+"\"";
        if(i+1!=options.length)
          JSON+=",";
     }
     JSON+="]";
     console.log(JSON);
     createCookie("HADBlockList",JSON);
     location.reload(true);
   }
   window.dlgCancel = function(){
     document.getElementById("configDlg").style.display="none";
   }
   window.dlgShow = function(){
     document.getElementById("configDlg").style.display="inline";
   }
   createDialog();
   window.replyToUser = function(user){
     field = document.getElementById("comment");
     if(document.selection){//IE, why do I have this here? AFAIK IE doesn't support userscripts
        field.focus();
        sel = document.selection.createRange();
        sel.text = "@"+user;
     }else if(field.selectionStart || field.selectionStart==0){
       var startP = field.selectionStart;
       var endP = field.selectionEnd;
       field.value = field.value.substring(0,startP) + 
                   ("@"+user)+
                   field.value.substring(endP, field.value.length);
     }else{
       field.value +="@"+user;
     }
  }
  window.BlockUser = function(user){
     dlgNewUserPreDef(user);
     dlgDone();
  }
}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
//Found this on stack overflow:
//http://stackoverflow.com/questions/2303147/injecting-js-functions-into-the-page-from-a-greasemonkey-script-on-chrome
//WAY better than base64 encoding a whole string.
function oc(a)
{
  var o = {};
  for(var i=0;i<a.length;i++)
  {
    o[a[i]]='';
  }
  return o;
}
var BlockList = eval("("+readCookie("HADBlockList","[\"\"]")+")");
function stripHTML(input){
  var output = input.replace(/(<([^>]+)>)/ig,""); 
  return output;
}
var comments =document.getElementsByClassName("commentlinks");
for(i=0;i!=comments.length;i++){
  comment=comments[i].childNodes[1];//this should just be firstChild, BUT IT IS NOT! I don't know why...
  var credit = comment.getElementsByClassName("credits")[0];
  var rawCredit = stripHTML(credit.innerHTML);
  var user = rawCredit.split(/(.*) by (.*)/)[2];
  if(user in oc(BlockList)){
     comment.style.display="none";
     var showHide = document.createElement("div");
     var hideClass = i%2?"statsclass2":"statsclass1";
     showHide.setAttribute("class",hideClass);
     showHide.setAttribute("style","border-top:0px;");
     showHide.innerHTML = "Comment was hidden<br><b onclick=\"showComm("+i+")\" style=\"cursor:pointer\">Show/Hide</b>";
     comments[i].appendChild(showHide);
  }
  var uOptions = document.createElement("span");
  uOptions.innerHTML="&nbsp;<a href=\"javascript: replyToUser('"+user+"');\"/>Reply</a>&nbsp;<a href=\"javascript:BlockUser('"+user+"');\">Block this user</a>";
  credit.appendChild(uOptions);
}
document.getElementById("comments").innerHTML+="<br/><input type=\"button\" value=\"HackADay CommentFixer Settings...\" onclick=\"dlgShow();\"/>";