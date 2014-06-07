// ==UserScript==
// @name        hub games CE to GMT
// @namespace   CS
// @grant       none
// @description adds your local time after CE times
// @include     http://*.chosenspace.com/*
// @include     http://*.csgalaxies.com/*
// @include     http://*.galacticfleets.com/*
// @include     http://*.interstellarwar.com/*
// ==/UserScript==
var alltags,at,thistag,text,cleaned,gf,tt,d,m,y,h,n,GMTd,matches,cl6,duration_days,duration_hours,duration_minutes;
var nd=new Date();
var re=/.{0,9}\s*-*\d{1,}\.*\d*\s*CE/ig;
var fu=/for/i;
var ac=/active/i;
var iac=/inactive/i;
var vac=/mode/i;
var fuy=/\.\d{1}\s*CE/i;
var fue=/\./;
var gff=/galacticfleets\.com/i;
var iwf=/interstellarwar\.com/i;
var ics=true;
var icsui=/user_info/i;
var icsfi=/faction_info/i;
var icssd=/spacedock/i;
if(icsui.test(location.href))ics=false;
else if(icsfi.test(location.href))ics=false;
else if(icssd.test(location.href))ics=false;
if(gff.test(location.href)){ics=false;time=1184452020;}
else if(iwf.test(location.href)){ics=false;time=1288440000;}
else var time=1142530020;
var now,ttex;
var first=true;
function checkTime(i){if(i<10)i="0"+i;return i;}
alltags=document.evaluate("//text()[contains(.,'CE')]|//text()[contains(.,'ce')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
at=alltags.snapshotLength;
for(var i=0;i<at;i++){
	thistag=alltags.snapshotItem(i);
	text=thistag.textContent;
	for (matches = re.exec(text); matches != null; matches = re.exec(text)) {
		for (var j=0; j<matches.length; j++) {
			if(matches[j]&&matches[j]!='For '&&thistag.parentNode.nodeName!="TEXTAREA"){
				add="";
				if(fuy.test(matches[j])) add="0";
				else if(!fue.test(matches[j])) add="00";
				if(fu.test(matches[j])||ac.test(matches[j])||vac.test(matches[j])||add!=""){
					cleaned=matches[j].replace(/\D/g,"");
					cleaned=(cleaned+add)*1;
					ttex="";
					if(ics&&cleaned<=1500){
						var untilstar=(1500-cleaned)*60;
						tt=(now+time+untilstar)*1000;
						nd.setTime(tt);
						d=checkTime(nd.getDate());
						m=checkTime(nd.getMonth()+1);
						y=nd.getFullYear();
						h=checkTime(nd.getHours());
						n=checkTime(nd.getMinutes());
						ttex+="15ce @ "+d+"."+m+"."+y+"\u00A0"+h+":"+n+" ::: ";
					}
					else if(iac.test(matches[j])||vac.test(matches[j])) cleaned=(now/60)-cleaned;
					duration_days=Math.floor(cleaned/1440);
					duration_hours=Math.floor((cleaned%1440)/60);
					duration_minutes=(cleaned%1440)%60;
					var front="since ";
					if(ac.test(matches[j])||vac.test(matches[j])) front="for ";
					if(duration_days==0&&duration_hours==0&&duration_minutes==0)
						ttex+="No time difference";
					else if(duration_days==0&&duration_hours==0)
						ttex+=front+duration_minutes+" min.";
					else if(duration_days==0)
						ttex+=front+duration_hours+" hours "+duration_minutes+" min.";
					else ttex+=front+duration_days+" days "+duration_hours+" hours "+duration_minutes+" min.";
					if(ac.test(matches[j])||vac.test(matches[j])) thistag.textContent+=" ("+ttex+")";
					else if(ics)thistag.parentNode.setAttribute("title",ttex);
				}
				else{
					cleaned=matches[j].replace(/\D/g,"");
					if(cleaned!=1440&&cleaned!=''){
						cl6=cleaned*60;
						if(first){now=cl6;first=false;}
						tt=(cl6+time)*1000;
						nd.setTime(tt);
						d=checkTime(nd.getDate());
						m=checkTime(nd.getMonth()+1);
						y=nd.getFullYear();
						h=checkTime(nd.getHours());
						n=checkTime(nd.getMinutes());
						GMTd="("+d+"."+m+"."+y+"\u00A0"+h+":"+n+")";
						thistag.textContent+=" "+GMTd;
					}
				}
			}
		}
	}
}
