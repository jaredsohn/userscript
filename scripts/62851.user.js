// ==UserScript==
// @name           Google Reader - Colorize the Time
// @namespace      http://d.hatena.ne.jp/blooo/
// @include        http://www.google.*/reader*
// @include        https://www.google.*/reader*
// @version        0.1
// @description    Colorize the Time(Date) to know whether and how the article is new(old). 
// ==/UserScript==

document.body.addEventListener("DOMNodeInserted", function(e) {
    var element = e.target;
	var items = document.evaluate('.//div[@class="entry-date"]',element,null,7,null);
	for (var i = 0; i < items.snapshotLength; i++)
	{
		var item = items.snapshotItem(i);
		var dateText=item.innerHTML;
		var date = new Date();
	    item.style.background = getColor(dateText,date);
	}
}, false);

function getColor(dateText,date)
{
	var itemDate = new Date();
	if(dateText.match(/^([0-9])+:([0-9])+$/)) //today
	{
		dateText = date.getFullYear()  + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + dateText;
		var itemTime = Date.parse(dateText);
		itemDate.setTime(itemTime);
		diffMin = (date - itemDate) / 60000;
		if(diffMin < 180) //within 3 hour
			return '#ffb2b2';
		else if(diffMin < 720) //within 12 hours
			return '#ffc1e0';
		else //within a day
			return '#ffccff';
	}
	else
	{
		var itemTime = Date.parse(dateText);
		itemDate.setTime(itemTime);
		diffDay = (date - itemDate) / 86400000;
		if(diffDay < 3) //within 3 days
			return '#ead6ff';
		else if(diffDay < 7) //within a week
			return '#e0e0ff';
		else if(diffDay < 14) //within two weeks
			return '#eaf4ff';
		else if(diffDay < 30) //within a month
			return '#f4ffff';
		else
			return '#ffffff';
	}
}

GM_addStyle(<><![CDATA[
#entries.list .entry-date{
	padding:0 5px !important;
}
]]></>);
