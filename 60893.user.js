// ==UserScript==
// @name           douban event notifier
// @namespace      me.plucury.douban.eventnotifier
// @description    同步豆瓣活动到google calendar
// @include        http://www.douban.com/event/*/
// ==/UserScript==

if(document.getElementById("actchoice").childNodes.length>1){
	var objA=document.createElement("a");
	objA.setAttribute("class","redbutt ll");
	objA.setAttribute("id","toGCalendar");
	objA.setAttribute("target","_blank");
	var objSpan=document.createElement("span");
	objSpan.innerHTML="同步到GCal";
	objA.appendChild(objSpan);
	document.getElementById("actchoice").insertBefore(objA,document.getElementById("actchoice").childNodes[4]);
	var loc=window.location.href;
	eventId=loc.split("http://www.douban.com/event/")[1].split("/")[0];
	doubanReq=getDoubanReq(eventId);

}

function getDoubanReq(eventId){
	return	GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://api.douban.com/event/'+eventId,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(result) {
					var dom=new DOMParser().parseFromString(result.responseText,'text/xml');
					var summary=dom.getElementsByTagName("summary").item(0).firstChild.nodeValue;
					var title=dom.getElementsByTagName("title").item(0).firstChild.nodeValue;
					var calLac=dom.getElementsByTagName("gd:where").item(0).getAttribute("valueString");
					var startTime=dom.getElementsByTagName("gd:when").item(0).getAttribute("startTime");
					var endTime=dom.getElementsByTagName("gd:when").item(0).getAttribute("endTime");
					var gCalURL="http://www.google.com/calendar/event?action=TEMPLATE&text="+title+"&dates="+parseTime(startTime)+"/"+parseTime(endTime)+"&trp=false&location="+calLac+"&details="+loc;

					document.getElementById("toGCalendar").setAttribute("href",gCalURL);
				}
			});
}

function parseTime(time){
	var dateStampStr=time.split("+")[0];
	var dateStr=dateStampStr.split("T")[0];
	var timeStampStr=dateStampStr.split("T")[1];
	var year=dateStr.split("-")[0];
	var month=dateStr.split("-")[1];
	var day=dateStr.split("-")[2];
	var hour=timeStampStr.split(":")[0];
	var min=timeStampStr.split(":")[1];
	var sec=timeStampStr.split(":")[2];
	var UTCDate=new Date(year,month-1,day,hour,min,sec);
	var UTC=""+UTCDate.getUTCFullYear()+addZero(UTCDate.getUTCMonth()+1)+addZero(UTCDate.getUTCDate())+"T"+addZero(UTCDate.getUTCHours())+addZero(UTCDate.getUTCMinutes())+addZero(UTCDate.getUTCSeconds())+"Z";
	return UTC;
}

function addZero(num){
	return num==0?"00":(num<10?"0"+num:num+"");
}
