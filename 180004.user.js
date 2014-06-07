// ==UserScript==
// @name        alibdgaba
// @namespace   copy righted for : 
// @description writed by 
// @include     *://*.alibaba.com/*
// @version     1.4
// @grant       none
// ==/UserScript==
var subject = 'We want your products';
var text = 'Hi,</br>
We want to buy your products for our business.</br>
It’s a little hard to explain, so first please check our 11 pages, and after that we can start discuss with you for buy your products.</br>
1) Open (First link ) on the page: www.producbcenter.com/productneed1.php</br>
2) Open (Second link) on the page: www.producbcenter.com/productneed2.php</br>
3) Open (First link ) on the page: www.producbcenter.com/productneed3.php</br>
4) Open (First link ) on the page: www.producbcenter.com/productneed4.php</br>
5) Open (Second link) on the page: www.producbcenter.com/productneed5.php</br>
6) Open (First link ) on the page: www.producbcenter.com/productneed6.php</br>
7) Open (Second link) on the page: www.producbcenter.com/productneed7.php</br>
8) Open (Second link ) on the page: www.producbcenter.com/productneed8.php</br>
9) Open (Second link ) on the page: www.producbcenter.com/productneed9.php</br>
10) Open (Second link ) on the page: www.producbcenter.com/productneed10.php</br>
11) Open (First link) on the page: www.producbcenter.com/productneed12.php</br>
12) Open (First link) on the page: www.producbcenter.com/productneed14.php</br>
13) Open (First link) on the page: www.producbcenter.com/productneed15.php</br>
14) Open (First link) on the page: www.producbcenter.com/productneed16.php</br>
<font color=red>Remember: You should check all pages first (just open links). It’s very, very import for us.</br> It’s very import for start contract with you (If you don’t do that, we can’t buy from you).</br>
After check, please contact us as soon as you can</font></br>
<font color=black>With the best regards</br>
SBP Team</br>
Phone: +982637309153</br>
Fax: +982637303101</br>
Address: SBP Team –MAHDASHT city – ALBORZ state – IRAN</font>';
var userpass = "q199@producbcenter.com+q198@producbcenter.com+q197@producbcenter.com+q196@producbcenter.com+q195@producbcenter.com";
var defaultpassword = '12345678';
var idold = '200176409,214795695,214781283,214929309,50031386,214874526,213870032,200926274,217525422,200697898,50013116,213607565,200835066,200730361,200305000,200462068,50054912,218328978,200875029,200955071,50062291,215250857,200722473,213918178,215057861,200730082,214700321,214963567,218406524,50009174,200947143,50140581,200397012,214160814,50065170,200886162,214552858,213975649,213601203,200515575,217605842,200521887,215147106,200182266,215170666,213607641,200763584,200755116,50057908,200175089,200008650,218196423,200010078,200761347,200721318,200218935,213749468,50002424,200965709,50018161,200699893,214666361,101178948,215218153,214657298,218208098,200709571,200558023,200097010,200717526,200714813,200458063,200655001,218393959,215271780,200702139,200411100,213675425,214886958,214040119,11188836,200007234,200722078,200807003,50064672,50145015,200218698,218460568,200094015,50140782,200176286,200765112,218493767,218481370,200191053,215293149,200875238,213569448,214779830,200205056,213589127,200278040,200896061,200189047,200016046,213700525,200746030,200558158,218397715,215008884,213646541,200505006,200218376,218449426,200969653,200715465,200521608,200719864,200747399,200070882,200932972,200430077,200219687,200829083,200829162,50144570,213597864,200175065,200812022,200504093,200798204,200846149,200851096,200771009,213608894,200515203,50029093,200217085,200297209,200988151,214761603,217365463,213750004,218388193,214860983,120398750,117404270,200179430,217419246,200674128,214662884,102058838,200729158,10181208,200670029,100258671,218373368,213578536,213925389,50077569,200431191,217387617,214911566,50010057,100527605,50012114,50144793,50053708,200098019,200078023,200783148,213607819,50053828,200517470,200536201,213599298,50143619,200846242,200518634,200524059,50141735,213595758,50073508,213603246,200801373,200518957,200561052,200955174,200964128,213789146,200928256,200269403,200087035,218437827,200727048,200915411,218428246,200021254,200182277,218440350,200676106,200719594,200465141,200955856,10602922,101253020,50144243,50053373,200517856,200844152,200838010,50057467,200515122,213592388,200819101,200398070,50023627';
//var userpass = "think.yan@yahoo.com,jackbauer363636+seyyedamin@yahoo.com,60701903";
var i;
var address=location.pathname;
var spamidcount=Number(getCookie("spamidcount"));
var aString = '';
	var spamid = idold.split(",");  
	var dd;
	for (i = Number(getCookie("spamidcount")) + 1; i < Number(getCookie("spamidcount")) + 41; i++) {
	// for (i = 1; i < 10; i++) {
		aString = aString + ',' + spamid[i];
		dd = i;
		}
	   setCookie("spamidcount",Number(getCookie("spamidcount")) + 40,365);		
	   idold = aString;
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
			setCookie("spamidcount",0,365);
			setCookie("Emaildefault",username2,365);
			
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
                if (typeof url[i-1] != 'undefined'){
                    var win=window.open('http://message.alibaba.com/msgsend/contact.htm?action=contact_action&domain=2&id='+url[i-1],'_blank');
                    win.focus();
                }
            }
        }
    }else{
        var n=address.match(/msgsend\/contact\.htm/gi);
        if(n=='msgsend/contact.htm'){
                document.getElementById('subject').value=subject;
                document.getElementById('contentMessage').value=text;
                document.getElementById('email').value=getCookie("Emaildefault");           
            setTimeout(function (){
                document.getElementById("send").click();
            },10000);
        }

        if(address=='/msgsend/memberInquirySuccess.htm'){
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
