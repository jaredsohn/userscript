// ==UserScript==
// @name           UserScripts.org Script Age
// @namespace      http://vidzbigger.com
// @description    Adds info about how long a particular script has been around to each script profile page on UserScripts.org.
// @include        http://userscripts.org/scripts/show/*
// ==/UserScript==

var usoScriptAgeVersion = 0.005;
unwin = window;//:0
if( typeof(unsafeWindow)!='undefined' ) unwin=unsafeWindow;
String.prototype.qslice=function(before,after) {
	var s = this.indexOf(before)+before.length; 
	var e = this.indexOf(after,s);
	return this.substr(s,e-s);
}
String.prototype.trim=function() {
	return this.replace(/^\s+|\s+$/g,"");
};
function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}
function loadMonthInt(str){
	var mos=new Array();
	mos['Jan']=0;
	mos['Feb']=1;
	mos['Mar']=2;
	mos['Apr']=3;
	mos['May']=4;
	mos['Jun']=5;
	mos['Jul']=6;
	mos['Aug']=7;
	mos['Sep']=8;
	mos['Oct']=9;
	mos['Nov']=10;
	mos['Dec']=11;
	return(mos[str]);
}
unwin.usoDiffDisplayStyleB=false;
function getResultFromData(rst){
	//alert(rst);
	//isolate correct UL as reliably as possible
	//grab all html betwen two strings:
	rst = rst.qslice('Older versions are provided',"<div id='right'>");
	var lis = rst.split('<li>');
	
	var oldestScriptUploaded = lis[lis.length-1].qslice("\n",'[');
	
	oldestScriptUploaded = oldestScriptUploaded.trim();
	oldestScriptUploaded = oldestScriptUploaded.replace('  ',' ');
	var fullDate = oldestScriptUploaded;
	oldestScriptUploaded = oldestScriptUploaded.replace(',','');
	oldestScriptUploaded = oldestScriptUploaded.replace(':',' ');
	
	var dateTimePieces = oldestScriptUploaded.split(' ');
	
	var dn=new Date();
	var d=new Date();
	dateTimePieces[0] = loadMonthInt(dateTimePieces[0]);
	
	
	d.setMonth(dateTimePieces[0]);
	d.setDate(dateTimePieces[1]);
	d.setYear(dateTimePieces[2]);
	d.setHours(dateTimePieces[3]);
	d.setMinutes(dateTimePieces[4]);
	
//	d.setSeconds(0);
	
	var one_minute=60000;
	var one_hour=3600000;
	var one_day=86400000;//1000*60*60*24;
	var one_week=one_day*7;
	var one_month=one_day*29.530588853;//average month length
	var one_year=one_day*365.2425;//average year length
	
	var diff = dn-d;
	
	var dDif = roundNumber((diff)/one_day,1);
	var wDif = roundNumber((diff)/one_week,1);
	var mDif = roundNumber((diff)/one_month,2);
	var yDif = roundNumber((diff)/one_year,2);
	
	//next for the more logical less useful method
	var dyDif = Math.floor((diff)/one_year,2);diff-=dyDif*one_year;
	var dmDif = Math.floor((diff)/one_month,2);diff-=dmDif*one_month;
	var dwDif = Math.floor((diff)/one_week,1);diff-=dwDif*one_week;
	var ddDif = Math.floor((diff)/one_day,1);diff-=ddDif*one_day;
	var dhDif = Math.floor((diff)/one_hour,1);diff-=dhDif*one_hour;
	var diDif = Math.floor((diff)/one_minute,1);diff-=diDif*one_minute;
	
	var dDifstr='';
	dDifstr+= dDif + ' days, or ';
	dDifstr+= wDif + ' weeks, or ';
	dDifstr+= mDif + ' months, or ';
	dDifstr+= yDif + ' years  ago.';
	
	var bdDifstr='';
	bdDifstr+= dyDif + ' years ';
	bdDifstr+= dmDif + ' months ';
	bdDifstr+= dwDif + ' weeks ';
	bdDifstr+= ddDif + ' days ';
	bdDifstr+= dhDif + ' hours ';
	bdDifstr+= diDif + ' minutes ago.';
	
	unwin.usoDifStringA=dDifstr;
	unwin.usoDifStringB=bdDifstr;
	
	unwin.usoDiffDisplayStyleB=GM_getValue('usoDiffDisplayStyleB',unwin.usoDiffDisplayStyleB);
	
	var toShow = dDifstr;
	if(unwin.usoDiffDisplayStyleB){
		toShow = bdDifstr;
	}
	
	document.getElementById('details').innerHTML += '&nbsp; <br/><a title="Created on '+fullDate+' | US.o Script Age - Version '+usoScriptAgeVersion+'" href="http://userscripts.org/scripts/show/44748">Created</a>: <span id="difstring" style="cursor:pointer;">'+(toShow)+'</span>';
	document.getElementById('difstring').addEventListener('click',toggleDiffStringFormat,false)//when it is loaded start animating!
	
}
window.toggleDiffStringFormat=function(who){
	unwin.toggleDiffStringFormat(who);
}
unwin.toggleDiffStringFormat=function(who){
	if( document.getElementById('difstring').innerHTML == unwin.usoDifStringA){
		document.getElementById('difstring').innerHTML=unwin.usoDifStringB;
		unwin.usoDiffDisplayStyleB=true;
	}else{
		document.getElementById('difstring').innerHTML=unwin.usoDifStringA;
		unwin.usoDiffDisplayStyleB=false;
	}
	window.setTimeout(function(){
		GM_setValue('usoDiffDisplayStyleB',unwin.usoDiffDisplayStyleB);
	} ,250 );
}

//get script ID from URL
var scriptURL = new String(window.location);
var dirs = scriptURL.split('/');
if( dirs[dirs.length-1].indexOf('?') > 0 ){//superfluous chck?
	var qs = dirs[dirs.length-1].split('?');
	dirs[dirs.length-1]=qs[0];
}
scriptID = dirs[dirs.length-1];

var scriptageurl='http://userscripts.org/scripts/versions/'+scriptID;
GM_xmlhttpRequest({
  method: 'GET',
  url: scriptageurl,
  onload: function(responseDetails) 
  {
  	var rst = new String((responseDetails.responseText));
  	var pageCheck = rst.qslice('<div class="pagination">','Next');
  	
		pageCheck = pageCheck.split('<a href="');
		//checking to see if there is more than one page, and getting the last page
		if( pageCheck.length > 1 ){
			var pageUrl = pageCheck[pageCheck.length-2].split('"');
			pageUrl = pageUrl[0];
			//alert('getting page '+pageUrl );
			if( pageUrl.length > 0 ){
				
				if( pageUrl.indexOf('ttp://') < 0 ){
					pageUrl='http://userscripts.org'+pageUrl;
				}

				GM_xmlhttpRequest({
				  method: 'GET',
				  url: pageUrl,
				  onload: function(responseDetailsb) 
				  {
				  	var rst = new String((responseDetailsb.responseText));
				  	getResultFromData(rst);
				  	
					}
				});
			}else{
				//never gets here, it always works haha
			}
		}else{		
			//only one page, we got it already
			getResultFromData(rst);
	  }
  }
});
