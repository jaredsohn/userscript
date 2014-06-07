// ==UserScript==
// @name        alibaba
// @namespace   copy righted for : 
// @description writed by 
// @include     *://*.alibaba.com/*
// @version     1.4
// @grant       none
// ==/UserScript==
var subject = 'subject';
var text = 'hello M.R.<br>how are you?<br>I love you.';
var userpass = "q199@producbcenter.com+q198@producbcenter.com+q197@producbcenter.com+q196@producbcenter.com+q195@producbcenter.com";
var defaultpassword = '12345678';
var idold = '114486021,10765783,112459502,100223802,114205361,114242365,114193511,114235737,100107013,114233621,114229434,202919489';
//var userpass = "think.yan@yahoo.com,jackbauer363636+seyyedamin@yahoo.com,60701903";
var i;
var address=location.pathname;
var spamid=getCookie("spamid");
var spamidcount=getCookie("spamidcount");
var aString = '';
if (spamid!=null && spamid!="")
{
	var spamid = spamid.split(",");
	for (i = spamidcount; i < spamidcount + 40; i++) {
		var temp = spamid[i];
		aString = aString + ',' + temp;
			setCookie("spamidcount",spamidcount + 40,365);		
	}
idold = aString;
}

var parts = window.location.search.substr(1).split("&");
var $_GET = {};
for (i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}
////
if($_GET.hasOwnProperty('startspam')){
    var userpass = userpass.split('+');
        var userpass2 = userpass[$_GET.startspam].split(',');
        var username2 = userpass2[0].replace(/^\s+|\s+$/g, '');
		var password2 = defaultpassword;
		if(userpass2.length > 1)
        var password2 = userpass2[1].replace(/^\s+|\s+$/g, '');
			setCookie("spamid",idold,365);
			setCookie("spamidcount",0,365);
        var win=window.open('https://login.alibaba.com/login.htm?usernamedefault='+username2+'&passworddefault='+password2,'_blank');
        win.focus();

}
if(address=="/login.htm"){
    if($_GET.hasOwnProperty('usernamedefault')){
        doLogin($_GET.usernamedefault,$_GET.passworddefault);
    }
}
else {doJob();}
/////////////////////// functions 
function do_click(){
    document.getElementById("send").click();
}
function doJob(){
    if(address=="/" && !$_GET.hasOwnProperty('startspam')){
        var id=idold;
        if(id!=null){
            var url=id.split(',');
            for(i=1;i<=url.length;i++){
                var win=window.open('http://message.alibaba.com/msgsend/contact.htm?action=contact_action&domain=2&id='+url[i-1],'_blank');
                win.focus();
            }
        }
    }else{
        var n=address.match(/msgsend\/contact\.htm/gi);
        if(n=='msgsend/contact.htm'){
            document.getElementById('subject').value=subject;
            document.getElementById('contentMessage').value=text;
            setInterval(function (){ document.getElementById("send").click();},1000);
        }
        var b=address.match(/msgsend\/memberInquirySuccess\.htm/gi);
        if(b=='msgsend/memberInquirySuccess.htm'){
        window.open('','_parent','');
        window.close();
        }
    }
}
function doLogin(username,password)
{
    setTimeout(function(){
        document.getElementById('xloginPassportId').value=username;
        document.getElementById('xloginPasswordId').value=password;
        document.getElementById('signInButton').click();
    },8000);
}
//////////////////////
function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}
////////////////////////
function getCookie(c_name)
{
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {
  c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {
  c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) + 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
  {
c_end = c_value.length;
}
c_value = unescape(c_value.substring(c_start,c_end));
}
return c_value;
}
/////////////////////////
