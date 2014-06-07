// ==UserScript==
// @name        alibaba13
// @namespace   copy righted for : 
// @description writed by 
// @include     *://*.alibaba.com/*
// @version     1.4
// @grant       none
// ==/UserScript==
var subject = 'subject';
var text = 'hello M.R.<br>how are you?<br>I love you.';
var userpass = "q198@producbcenter.com+q197@producbcenter.com+q196@producbcenter.com+q195@producbcenter.com";
var defaultpassword = '12345678';
var idold = '114825860,11053980,109021652,114938359,115010107,115006097,114997076,114993432,114989347,100553379,114970156,102075611,109871239,114951951,114943231,101191016,114923063,10842215,114579111,114908357,114904516,114567026,10345458,114874587,114873187,114870024,102300220,11384648,101485835,114853841,114854614,10860855,114846834,10130607,106877003,10622866,209535011,111544035,114781414,114813729,114809147,114805449,212288873,114794094,114659438,114782853,213283681,10313007,114776936,114770167,105838706,114761384,10379864,10120059,101172477,114711913,114698371,114687645,106999620,109876913,114625849,100605898,114416372,114631650,207235398,101219561,113403200,114327172,114604165,11378186,10252665,211888451,114559103,113844674,114569283,101176706,114536122,207633713,114538260,114534764,113403365,10139431,114486021,10765783,112459502,100223802,114205361';
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
