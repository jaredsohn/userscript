// ==UserScript==
// @name           Ogero Lebanon Instant Login To DSL Bandwidth Usage + More Bandwidth Info
// @namespace      ~dkhal~
// @include        http://www.ogero.gov.lb/Published/EN/index_layers.html
// @include        http://www.ogero.gov.lb/admin/BillDetails/DSL/profile.php
// ==/UserScript==

// Xpath to manipulate the site
function xpathGetAll(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}
// Encode the password for secure connection
var output= new String;
function Encrypt1(thePassword) { // The encryption used for the password
if(!thePassword)
{alert ('you must enter your password')
exit}
Temp = new Array();
Temp1 = new Array();
Temp2 = new Array();
PassSize = thePassword.length;
for (i = 0; i < PassSize; i++) {
rnd = Math.round(Math.random() * 930) + 89;	// generate a random value
Temp[i] = thePassword.charCodeAt(i) + rnd + 999;	
Temp1[i] = rnd * rnd;
}
for (j = 0; j < PassSize; j++){
Temp2[2*j] = Temp[j];
Temp2[2*j+1] = Temp1[j];
}
output = Temp2.join(",");
return output;
}

if(document.location.href=="http://www.ogero.gov.lb/admin/BillDetails/DSL/DSLUsage2Way.php?language=L&point=1"){ // Gives more info about bandwidth

length=xpathGetAll("//th")[0].innerHTML.indexOf(" GB Download")-xpathGetAll("//th")[0].innerHTML.indexOf("usage is ")-9;
download=xpathGetAll("//th")[0].innerHTML.substr(xpathGetAll("//th")[0].innerHTML.indexOf("usage is ")+9,length)*1000; // Gets your download limit

length2=xpathGetAll("//th")[0].innerHTML.indexOf(" GB Upload")-xpathGetAll("//th")[0].innerHTML.indexOf("Download and ")-13;
upload=xpathGetAll("//th")[0].innerHTML.substr(xpathGetAll("//th")[0].innerHTML.indexOf("Download and ")+13,length2)*1000; // Gets your upload limit

length3=xpathGetAll("//th[@class='txtHome']")[0].innerHTML.indexOf(" MB")-xpathGetAll("//th[@class='txtHome']")[0].innerHTML.indexOf("download free volume ")-21;;
downloaded=xpathGetAll("//th[@class='txtHome']")[0].innerHTML.substr(xpathGetAll("//th[@class='txtHome']")[0].innerHTML.indexOf("download free volume ")+21,length3); // Gets your download usage

length4=xpathGetAll("//th[@class='txtHome']")[1].innerHTML.indexOf(" MB")-xpathGetAll("//th[@class='txtHome']")[1].innerHTML.indexOf("upload free volume ")-19;
uploaded=xpathGetAll("//th[@class='txtHome']")[1].innerHTML.substr(xpathGetAll("//th[@class='txtHome']")[1].innerHTML.indexOf("upload free volume ")+19,length4); // Gets your upload usage

var today=new Date();
today.getDate();
day=today.getDay();
mon=today.getMonth();
var days=0;

if(mon=="2"){ days=29; }
if(mon=="4" || mon=="6" || mon=="9" || mon=="11"){ days=30; }
if(mon=="1" || mon=="3" || mon=="5" || mon=="7" || mon=="8" || mon=="10" || mon=="12"){ days=31; }

possible=Math.floor(day/days*100); // Get the possible average percentage for each day
possible_d=download*possible/100;
possible_u=upload*possible/100;

if(possible_d>downloaded){
stat_d="green";
text_d="Good";
}
else{
stat_d="red";
text_d="Bad";
}

if(possible_u>uploaded){
stat_u="green";
text_u="Good";
}
else{
stat_u="red";
text_u="Bad";
}

// Generate Table Variables
// Daily
daily_MB_D=Math.floor(download/days)+" MB";
daily_MB_U=Math.floor(upload/days)+" MB";
daily_P_D=Math.floor(1/days*100)+" %";
daily_P_U=Math.floor(1/days*100)+" %";
daily_MB_L_D=Math.floor(download/days)-downloaded+" MB";
daily_MB_L_U=Math.floor(upload/days)-uploaded+" MB";
daily_P_L_D=Math.floor((1/days*100)-(downloaded/download)*100)+" %";
daily_P_L_U=Math.floor((1/days*100)-(uploaded/upload)*100)+" %";
// Monthly
monthly_MB_L_D=download-downloaded+" MB";
monthly_MB_L_U=upload-uploaded+" MB";
monthly_P_L_D=100-(downloaded/download)*100+" %";
monthly_P_L_U=100-(uploaded/upload)*100+" %";
// Stats
stat_D="<font color="+stat_d+">"+text_d+"</font>";
stat_U="<font color="+stat_u+">"+text_u+"</font>";

// Print the table
table='<div align="center"><center><table border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse" bordercolor="#C0C0C0" width="322"><tr><td width="184" align="center">&nbsp;</td><td width="126" align="center"><u><b>Download :</b></u></td><td width="118" align="center"><u><b>Upload :</b></u></td></tr><tr><td width="184" align="center"><u><b>Daily Limit MB</b></u></td><td width="126" align="center">'+daily_MB_D+'</td><td width="118" align="center">'+daily_MB_U+'</td></tr><tr><td width="184" align="center"><u><b>Daily Limit %</b></u></td><td width="126" align="center">'+daily_P_D+'</td><td width="118" align="center">'+daily_P_U+'</td></tr><tr><td width="184" align="center"><u><b>Daily Left MB</b></u></td><td width="126" align="center">'+daily_MB_L_D+'</td><td width="118" align="center">'+daily_MB_L_U+'</td></tr><tr><td width="184" align="center"><u><b>Daily Left %</b></u></td><td width="126" align="center">'+daily_P_L_D+'</td><td width="118" align="center">'+daily_P_L_U+'</td></tr><tr><td width="184" align="center"><u><b>Monthly Left MB</b></u></td><td width="126" align="center">'+monthly_MB_L_D+'</td><td width="118" align="center">'+monthly_MB_L_U+'</td></tr><tr><td width="184" align="center"><u><b>Monthly Left %</b></u></td><td width="126" align="center">'+monthly_P_L_D+'</td><td width="118" align="center">'+monthly_P_L_U+'</td></tr><tr><td width="184" align="center"><u><b>Status</b></u></td><td width="126" align="center">'+stat_D+'</td><td width="118" align="center">'+stat_U+'</td></tr></table></center></div><br>';
table='';
xpathGetAll("//td[@colspan='2']")[7].innerHTML=table;
}
else{
if(document.location.href=="http://www.ogero.gov.lb/admin/BillDetails/DSL/profile.php"){ // Check if logged in already
document.location="http://www.ogero.gov.lb/admin/BillDetails/DSL/DSLUsage2Way.php?language=L&point=1";
}
else{
document.getElementById('PhoneNumber').value="yourphonenbr";
document.getElementById('Password').value="yourpassword";
document.getElementById('Password').value=Encrypt1(document.getElementById('Password').value); // Encrypt the password so no one can guess it anymore
document.getElementsByName('login_bill')[0].submit(); // Submit the login
}
}
// No need to enter your password anymore this does it for you or do a single action