// ==UserScript==
// @name           TwitterSafe!
// @author         David Rodrigues
// @version        0.9.9
// @namespace      http://sixhat.net/
// @description    Ranks what kind of User this Twitter User is according http://twitter.com/evan/statuses/782291082 and according a Twitter Rank Algorithm (TR)
// @include        http://twitter.com/*
// @include        https://twitter.com/*

// @exclude        http://twitter.com/*/*
// @exclude        http://twitter.com/*/statuses*
// @exclude        http://twitter.com/home*
// @exclude        http://twitter.com/followers
// @exclude        http://twitter.com/direct_messages
// @exclude        http://twitter.com/invitations
// @exclude        http://twitter.com/favorites
// @exclude        http://twitter.com/badges

// @exclude        https://twitter.com/*/*
// @exclude        https://twitter.com/*/statuses*
// @exclude        https://twitter.com/home*
// @exclude        https://twitter.com/followers
// @exclude        https://twitter.com/direct_messages
// @exclude        https://twitter.com/invitations
// @exclude        https://twitter.com/favorites
// @exclude        https://twitter.com/badges

// ==/UserScript==
Date.prototype.setISO8601 = function (string) { var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" + "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" + "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?"; var d = string.match(new RegExp(regexp)); var offset = 0; var date = new Date(d[1], 0, 1); if (d[3]) { date.setMonth(d[3] - 1); } if (d[5]) { date.setDate(d[5]); } if (d[7]) { date.setHours(d[7]); } if (d[8]) { date.setMinutes(d[8]); } if (d[10]) { date.setSeconds(d[10]); } if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); } if (d[14]) { offset = (Number(d[16]) * 60) + Number(d[17]); offset *= ((d[15] == '-') ? 1 : -1); } offset -= date.getTimezoneOffset(); time = (Number(date) + (offset * 60 * 1000)); this.setTime(Number(time)); }


var ti=document.evaluate(
	"//abbr[@class='published']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);


if (ti.snapshotLength) {
	ultimo=ti.snapshotItem(0);
	primeiro=ti.snapshotItem(ti.snapshotLength-1);
}

pr=new Date();
pr.setISO8601(primeiro.title);
ul=new Date();
var T=(ul.getTime()-pr.getTime())/(1000*60*60);


var tt=document.evaluate(
	"//h2[@class='thumb'][last()]",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var bb=document.evaluate(
	"//ul[@class='stats']/li/span",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);



var aa=bb.snapshotItem(1);
var cc=bb.snapshotItem(3);
var dd=bb.snapshotItem(5);
var ee=bb.snapshotItem(6);

var v1=aa.textContent.replace(',','');
var v2=cc.textContent.replace(',','');
var v3=dd.textContent.replace(',','');
var v4=ee.textContent.replace(',','');


var R;
R=((2*v1+v2)/3)*(v4/T)*(1+Math.log(v3+1));
R=Math.log(R+1);
R=Math.floor(R*1)/1;

var rank=T+" "+v1+" "+v2+" "+v3+" "+v4+" ="+R;

rac=v1/v2
if (rac<0.2) 
{
	if (R<6) {
		desc="a loud newcomer"
	} else {
		desc="a twittercaster"
	}
}
else if (rac<0.5) 
{
	if (R<6) {
		desc="starting strong"
	} else {
		desc="a notable"
	}
} 
else if (rac<1) 
{
	if (R<6) {
		desc="just starting"
	} else {
		desc="socially healthy"
	}
}
else if (rac<2) 
{
	if (R<6) {
		desc="a newbie"
	} else {
		desc="a social climber"
	}
}
else if (rac<5) 
{
	if (R<6) {
		desc="on the wrong foot"
	} else {
		desc="a twitter spammer"
	}

}
else 
{
	desc="a bot, alert!"
}
if (tt.snapshotLength==1) {
	desc="<em>"+tt.snapshotItem(0).textContent+"</em> is "+desc+"; <em title='Twitter Rank'>TR="+R+"</em>"

var main, newElement;
main = document.getElementById('content');
if (main){
	newElement = document.createElement('h2');
	newElement.innerHTML=desc;
	newElement.style.background='#FFCCCC';
	newElement.style.width='535px';
	newElement.style.padding='10px';
	main.parentNode.insertBefore(newElement,main);
}
}