// ==UserScript==
// @name           BCwebtsi
// @namespace      AlinClaudiu
// @include        https://webtsi.rdsnet.ro/web/*
// @include        https://rdsdbis.rdsnet.ro/*
// @version        0.2.3
// @require	https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require	http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// ==/UserScript==


//var ticketid = $('input[name=ticket_id]');
//var tkid = ticketid;

//alert(ticket_id.value);

//x1.append("xxxxl");



var tkID = document.title.split("#");
tkID=tkID[1];



//$("TRID_0:nth-child(2)").append("<span> - 2nd!</span>");
var tlog = $('input[class=inputtext]');
//if(typeof(tkID) !== 'undefined'){
//var prefix=tkID.substring(0,4)
//tlog.val(prefix);

//var x1=$('form[name=form1]');
//x1=x1.parent();
//$("td:first",x1).html('<p class="inputbutton">'+tkID.substring(0,4)+' <b>'+tkID.substring(4,tkID.length)+'</b></p>');



//var loc=$('p[class=inputbutton]');
//loc.append("cuci");
/*
var tel=$('input[name=client_contact_phone]');
tel=tel.val();
if(tel.length == 10){
    tel=tel.substring(0,4)+'.'+tel.substring(4,7)+'.'+tel.substring(7,10);
}else{
    tel=tel.length;
}

var interval=$('#div_teamIntervalStart');
interval=interval.html();
if(interval=='01.01.1970 00:00:00'){
    interval='Fara interval';
}else{
var int =interval.split(" ");
var data=int[0]
data=data.split(".");
var ceas=int[1];
ceas=ceas.split(":");
var zi=data[0];
var luna=data[1];
var an=data[2];
var ora=ceas[0];
var minut=ceas[1];
var secunda=ceas[2];

//var dt = new Date(year, month, day, hours, minutes, seconds);
//var dob = Date.parse(interval);
//if (dob.addYears(18) < Date.today())
//{
    interval=ora;
//}
}
*/


//}
var clientid = $('input[name=clientid]');
var clid = clientid.val();
var locationid = $('input[name=locationid]');
var lid=locationid.val();

//alert(clid);
//tlog.parent().parent().append("cux");
//var xdiv='<div id="FloatingLayerx" style="position: absolute; width: 250px; left: 150px; top: 140px; visibility: visible;">  xx</div>';
//tlog.parent().append('<a href="https://status.rdslink.ro/usersftth/conturiftth/?client_id='+clid+'" target="Main">TK</a> ');
tlog.parent().append('<a href="http://oss.rcs-rds.ro//clients/pppoe/pppoeSearchUser.php?o1=3&o2=6&o3=129&pppoe_id_client='+clid+'&act=search&tab=1" target="xlMain">OSS</a>');
tlog.parent().append('&nbsp;<a href="http://oss.rcs-rds.ro/clients/client_search.php?o1=3&o2=6&o3=56&id_client='+clid+'" target="xlMain">ID</a>');
if(lid >= 2){tlog.parent().append('&nbsp;<a href="http://oss.rcs-rds.ro/clients/client_search.php?o1=3&o2=6&o3=56&id_location='+lid+'" target="xlMain">LID</a>');};
//$('#FloatingLayerxt').load('"http://oss.rcs-rds.ro//clients/pppoe/pppoeSearchUser.php?o1=3&o2=6&o3=129&pppoe_id_client='+clid+'&act=search&tab=3');
//tlog.append('<input onclick="#" value="MUMU" class="button" onmouseover=\'this.style.backgroundColor="#F0F0FF";this.style.color="blue"\' onmouseout=\'this.style.backgroundColor="B4CDEB";this.style.color="#000060"\' type="submit">');
//tlog.append('<input type=button class=submit value="[ Int ]" onClick="" onMouseOver="this.style.borderColor=\'#7BCB7B\'" onMouseOut="this.style.borderColor=\'#7B7D7B\'">');
//var tk = $('p[class=inputbutton]');
//tk.css('background-color:#123456;');

//####linkuri sus
var tklinkuri = $('table[class=maintable]');

tklinkuri.append('<div id="FloatingLayer" style="position:absolute;width:250px;right:0;top:0;visibility:visible;font-size : 10px"><a class=mainmenulink href="https://webtsi.rdsnet.ro/web/ViewTicket?type_id=0&client_id=-1&source_id=0&created_by=0&lastdays=0&lastupdatedays=31&assignedtouser=0&assignedtodept=-1&priority_id=0&title=&limit=1000&assignedtogroup=3034250&status=1,2,3,4,7,8,20" target=page>Admin</a>&nbsp;&nbsp;&nbsp;<a class=mainmenulink href="https://webtsi.rdsnet.ro/web/ViewTicket?type_id=0&client_id=-1&source_id=0&created_by=0&lastdays=0&lastupdatedays=31&assignedtouser=0&assignedtodept=-1&priority_id=0&title=&limit=1000&assignedtogroup=3034261&status=1,2,3,4,7,8,20" target=page>Business</a>&nbsp; &nbsp; <a class=mainmenulink href="https://webtsi.rdsnet.ro/web/ViewTicket?type_id=0&client_id=-1&source_id=0&created_by=0&lastdays=0&lastupdatedays=31&assignedtouser=0&assignedtodept=-1&priority_id=0&title=&limit=1000&assignedtogroup=3034283&status=1,2,3,4,7,8,20" target=page>Support</a>&nbsp;&nbsp;   &nbsp;  <a class=mainmenulink  href="/cgi-bin/tehnic/t_search_client.cgi" target="page">Cauta</a></div>');
//tlog.parent().append('<div id="FloatingLayerX" style="position:absolute;width:50px;left:500;top:80;visibility:visible;font-size : 13px;; ">ID: <b>'+clid+'</b> / '+tel+' / '+interval+'</div>');
//### inserare CID updatestate
//var insertCID= $('input[name=typename]');
//insertCID.parent().append('cuci');
