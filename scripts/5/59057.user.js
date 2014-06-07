// ==UserScript==
// @name           Airline Manager Catch Routes
// @namespace      http://airlinemanager.info
// @include        http://apps.facebook.com/airline_manager/route.php
// @include        http://apps.facebook.com/airline_manager/route.php?uID=new
// @include        http://apps.facebook.com/airline_manager/route2.php
// @include        http://apps.facebook.com/airline_manager/route3.php
// ==/UserScript==
function getCookie(c_name){
	if(document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name+"=");
		if(c_start!=-1){
			c_start=c_start+c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if(c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}
function setCookie(c_name,value,expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+"=" +escape(value)+((expiredays==null)?"":";expires="+exdate.toGMTString());
}
var values = new Array('103','125','117','93','23','111','20','65','45','58','27','107','61','105','10','47','122','118','88','41','85','19','44','56','124','126','71','4','53','32','81','28','67','37','98','9','77','73','97','26','59','113','74','108','52','120','83','57','34','78','84','60','43','24','6','1','13','101','5','100','54','70','48','29','66','15','106','21','72','109','89','46','80','68','25','92','110','79','7','91','114','104','12','35','102','119','42','62','14','76','16','64','63','90','18','36','82','33','87','121','8','69','30','123','86','49','51','39','99','17','112','40','11','75','22','96','50');
var i=getCookie('i');
if(!i) i=1;
var j=getCookie('j');
if(!j) j=0;

var url=document.URL;
if(url=='http://apps.facebook.com/airline_manager/route.php')
{
	document.location.href='http://apps.facebook.com/airline_manager/route.php?uID=new';
}
else if(url=='http://apps.facebook.com/airline_manager/route.php?uID=new')
{
	var ac = document.getElementsByName('ac');
	ac[0].options[0].selected=true;
	document.forms[1].submit();
}
else if(url=='http://apps.facebook.com/airline_manager/route2.php')
{
	if(i==j)
		j++;
	var selectDeparture = document.getElementsByName('departure');
	selectDeparture[0].options[i].selected=true;
	var selectArrival = document.getElementsByName('arrival');
	selectArrival[0].options[j].selected=true;
	j++;
	if(j==117)
	{
		j=0;
		i++;
	}
	if(i<117)
	{
		setCookie('i',i,3);
		setCookie('j',j,3);
		document.forms[2].submit();
	}
}
else if(url=='http://apps.facebook.com/airline_manager/route3.php')
{
	var tables = document.getElementsByTagName('table');
	var tables2 = tables[0].getElementsByTagName('table');
	var tables3 = tables2[3].getElementsByTagName('table');
	var row = tables3[2].rows[1];
	airline = new Object();
	// Cities
	var cities = row.cells[0].innerHTML.split(" - ");
	airline.departure = cities[0].replace('<b>','');
	airline.departure = airline.departure.replace(' ','+');
	airline.arrival = cities[1].replace('</b>','');
	airline.arrival = airline.arrival.replace(' ','+');
	// Distance
	airline.distance = row.cells[1].innerHTML;
	airline.distance = airline.distance.substr(0,airline.distance.length-3);
	// Cookie
	var cookie = getCookie('airlineCookie'+i);
	if(!cookie) cookie = '';
	setCookie('airlineCookie'+i,cookie+'@'+airline.departure+'_'+airline.arrival+'_'+airline.distance,3);
	var form = document.forms[1];
	if(!form) form = document.forms[2];
	form.submit();
}
