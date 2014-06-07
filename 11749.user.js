// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hide result of recent events from Sherdog fighter stats
// @namespace     http://www.sherdog.com
// @description   For use when you have not yet seen a recent(less than a week old) event but still want to see the fighters background. Simply to avoid spoilers.
// @include       http://www.sherdog.com/fightfinder/fightfinder.asp?FighterID=*

// ==/UserScript==
var minDaysAgo =7;
var firstRow= xpath("/html/body/table[2]/tbody/tr[5]/td[2]/table/tbody/tr[11]/td/table/tbody/tr[2]/td/table/tbody/tr[2]").snapshotItem(0);
var dateString = firstRow.getElementsByTagName('td')[4].innerHTML;
var eventDate = new Date(dateString.split('/')[2],dateString.split('/')[0]-1,dateString.split('/')[1]);
var today= new Date();
var oneDay=1000*60*60*24
var eventDaysAgo= Math.ceil((today.getTime()-eventDate.getTime())/oneDay)
if(eventDaysAgo<minDaysAgo){
	firstRow.getElementsByTagName('td')[0].setAttribute('onMouseOver',"javascript:this.innerHTML='" + firstRow.getElementsByTagName('td')[0].innerHTML +"'");
	firstRow.getElementsByTagName('td')[0].setAttribute('onMouseOut',"javascript:this.innerHTML='xxx'");
	firstRow.getElementsByTagName('td')[0].innerHTML = 'xxx';
	firstRow.getElementsByTagName('td')[2].setAttribute('onMouseOver',"javascript:this.innerHTML='" + firstRow.getElementsByTagName('td')[2].innerHTML +"'");
	firstRow.getElementsByTagName('td')[2].setAttribute('onMouseOut',"javascript:this.innerHTML='xxx'");
	firstRow.getElementsByTagName('td')[2].innerHTML ='xxx'
	firstRow.getElementsByTagName('td')[5].setAttribute('onMouseOver',"javascript:this.innerHTML='" + firstRow.getElementsByTagName('td')[5].innerHTML +"'");
	firstRow.getElementsByTagName('td')[5].setAttribute('onMouseOut',"javascript:this.innerHTML='xxx'");
	firstRow.getElementsByTagName('td')[5].innerHTML = 'xxx';
	firstRow.getElementsByTagName('td')[6].setAttribute('onMouseOver',"javascript:this.innerHTML='" + firstRow.getElementsByTagName('td')[6].innerHTML +"'");
	firstRow.getElementsByTagName('td')[6].setAttribute('onMouseOut',"javascript:this.innerHTML='xxx'");
	firstRow.getElementsByTagName('td')[6].innerHTML = 'xxx';
}



function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
