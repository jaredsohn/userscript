// ==UserScript==
// @name           Sort Xbox Friends
// @namespace      thlayli.detrave.net
// @description    Sort Xbox Friends Management list by date/time
// @include        http://live.xbox.com/en-us/profile/Friends.aspx*
// @version        1.2.1
// ==/UserScript==

var mainTable = document.evaluate("//table[contains(@class,'XbcProfileTable XbcFriendsListTable')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
var tds = mainTable.singleNodeValue.getElementsByTagName('td');

trs = document.getElementsByTagName('tr');
offTime = new Array();
offDate = new Array();
offBlank = new Array();
function sortByTime(a,b) {
    var x = parseFloat(a.time);
    var y = parseFloat(b.time);
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}
function sortByDate(a,b) {
    var x = Date.parse(a.date);
    var y = Date.parse(b.date);
    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
}
for(i=0;i<trs.length;i++){
	if(trs[i].textContent.indexOf('Last seen')!=-1&&trs[i].textContent.indexOf('Offline')!=-1&&trs[i].textContent.indexOf('ago')!=-1){
		time = trs[i].textContent.replace(/.+Last seen (\d{1,60} \w{4,7}) ago(.+)?/,'$1');
		if(time.indexOf('minute')!=-1)
			time = time.replace(/ minutes?/,'');
		if(time.indexOf('hour')!=-1)
			time = time.replace(/(\d{1,60}) hours?/,'$1') * 60;
		offTime[offTime.length]={time:time,row:trs[i]};
	}
}
for(i=0;i<trs.length;i++){
	if(trs[i].textContent.indexOf('Last seen')!=-1&&trs[i].textContent.indexOf('Offline')!=-1&&trs[i].textContent.indexOf('ago')==-1){
		date = trs[i].textContent.replace(/.+Last seen (\d{1,2}\/\d{1,2}\/\d{2})(.+)?/,'$1');
		offDate[offDate.length]={date:date,row:trs[i]};
	}
}
for(i=0;i<trs.length;i++){
	if(trs[i].innerHTML.indexOf('<p>&nbsp;</p>')!=-1)
		offBlank[offBlank.length]=trs[i];
}
offTime.sort(sortByTime);
offDate.sort(sortByDate);
for(i=0;i<offTime.length;i++){
	prt = offTime[i].row.parentNode;
	prt.removeChild(offTime[i].row);
}
for(i=0;i<offDate.length;i++){
	prt = offDate[i].row.parentNode;
	prt.removeChild(offDate[i].row);
}
for(i=0;i<offBlank.length;i++){
	prt = offBlank[i].parentNode;
	prt.removeChild(offBlank[i]);
}
for(i=0;i<offTime.length;i++)
	prt.appendChild(offTime[i].row);
for(i=0;i<offDate.length;i++)
	prt.appendChild(offDate[i].row);
for(i=0;i<offBlank.length;i++)
	prt.appendChild(offBlank[i]);