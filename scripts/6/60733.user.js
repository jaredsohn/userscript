// ==UserScript==
// @name           Kongregate Rating Count
// @namespace      http://laughdonor.doesntexist.com/
// @include        http://*.kongregate.com/accounts/*/rewards*
// @include        http://kongregate.com/accounts/*/rewards*
// ==/UserScript==

var ratings=0;
var rated="";
var rc=document.cookie.split(";");
for(var i in rc){
  rc[i]=unescape(rc[i]);
  if(match=rc[i].match(/ratings=\d+$/))
    ratings=match[0].substr(8);
  if(match=rc[i].match(/rated=.*$/))
    rated=match[0].substr(6);
  if(match=rc[i].match(/kong_user_data=.*$/))
    if(location.pathname.match(/\/\w+/g )[1].substr(1)!=match[0].match(/\"username\"\:\"\w*\"/)[0].split('"')[3])return;
}
var span=document.createElement("li");
span.innerHTML="Total Rated Games Today: <span id='ratings' style='font-weight:bold;color:black'>"+ratings+"</span>";
span.style.textTransform="capitalize";
document.getElementById("secondary").childNodes[1].appendChild(span);
Date.prototype.getMonthName=function(){return['Jan. ','Feb. ','Mar. ','Apr. ','May. ','Jun. ','Jul. ','Aug. ','Sep. ','Oct. ','Nov. ','Dec. '][this.getUTCMonth()];};
var today=new Date();
today.setUTCHours(today.getUTCHours()-8);
var date=today.getMonthName()+today.getUTCDate()+", "+today.getUTCFullYear();
var row=document.getElementById("secondary").childNodes[5].childNodes[3].firstChild;
do{
  row=row.nextSibling;
  if(row.className=="summary")break;
  if(row.childNodes[1].innerHTML!=date)continue;
  if(row.childNodes[5].firstChild.innerHTML!="Rated game")continue;
  if(rated.search(row.childNodes[5].childNodes[2].childNodes[1].innerHTML+";")+1)continue;
  rated+=row.childNodes[5].childNodes[2].childNodes[1].innerHTML+";";
  ratings++;
}while(row=row.nextSibling);
today.setUTCHours(23);
today.setUTCMinutes(59);
today.setUTCSeconds(59);
today.setUTCMilliseconds(999);
today.setUTCHours(today.getUTCHours()+8);
document.cookie="ratings="+ratings+"; expires="+today.toUTCString()+"; path=/";
document.cookie="rated="+escape(rated)+"; expires="+today.toUTCString()+"; path=/";
document.getElementById("ratings").innerHTML=ratings;