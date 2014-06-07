// ==UserScript==
// @name           dA Birthday Today
// @namespace      http://solitude12.deviantart.com/
// @description    Adds a notification on a users page of the user's birthday! (If their birthday is on dABirthdays)
// @include        http://*.deviantart.com/
// @include        http://*.deviantart.com/?*
// ==/UserScript==

/* 
 * Author: Solitude12
 * Date: September 21, 2009/May 19, 2010/June 30, 2010
 * Version: 0.5c
 *
 * Copyright © Solitude12 - http://solitude12.deviantart.com/
 * Please do not redistribute any part of this code without
 * permission of Solitude12.
*/

deviantNAME = window.location.host.substring(0, window.location.host.replace('http://www.', 'http://').indexOf(".")).toLowerCase();
var newdiv = document.createElement("a");
newdiv.setAttribute("class",  "gmbutton2 gmbutton2ggr disabledbutton");
newdiv.setAttribute("id",  "newinnerbeing");
newdiv.innerHTML = '<i class="icon i43"></i><span style="font-size:10px;line-height:11px;display:inline-block;"><small>Birthday...</small><br/>Loading</span><b></b>';
var place = document.evaluate("//div[@class='gmbutton2town moarbuttons']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if(place) {
	place.appendChild(newdiv);
	
	var supersecretwhy = document.evaluate("//div[@class='pbox']", document.getElementById('super-secret-why'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if(supersecretwhy && supersecretwhy.innerHTML.match(/<dt class="f h">Birthday<\/dt><dd class="f h">(.*?)<\/dd>/)){
		var birthdaymatch = supersecretwhy.innerHTML.match(/<dt class="f h">Birthday<\/dt><dd class="f h">(.*?)<\/dd>/)[1];//August 23, 1984
		var parts = birthdaymatch.replace(',','').split(' ');
		var bmonth = parts[0];
		var day = parts[1];
		
		var d = new Date();
		var today = d.getDate();
		var toyear = d.getFullYear();
		var month=new Array(12)
		month[0]="January"
		month[1]="February"
		month[2]="March"
		month[3]="April"
		month[4]="May"
		month[5]="June"
		month[6]="July"
		month[7]="August"
		month[8]="September"
		month[9]="October"
		month[10]="November"
		month[11]="December"
		var tomonth = month[d.getMonth()];
		var days=(Math.round((Date.parse(bmonth+" "+day+", "+toyear)-Date.parse(tomonth+" "+today+", "+toyear))/(24*60*60*1000))*1);
		
		if (days<0){days = 365 + days;}
		
		if (days==0){
			document.getElementById('newinnerbeing').className="gmbutton2 gmbutton2ggr";
			//document.getElementById('newinnerbeing').setAttribute("href",  'http://birthdays.24bps.com/user/'+deviantNAME);
			document.getElementById('newinnerbeing').setAttribute("title", bmonth+' '+day);
			document.getElementById('newinnerbeing').setAttribute("style","background-image:url(http://st.deviantart.net/minish/messages/gmbutton2g.gif);color:#587F1F !important;");					
			document.getElementById('newinnerbeing').innerHTML= '<i class="icon i29"></i><span style="font-size:10px;font-weight:bold;line-height:11px;display:inline-block;"><small>Birthday...</small><br>Today!</span><b style="background-image:url(http://st.deviantart.net/minish/messages/gmbutton2g.gif)"></b>';
		} else {
			if (days==1) {
				document.getElementById('newinnerbeing').className="gmbutton2 gmbutton2ggr";
			//	document.getElementById('newinnerbeing').setAttribute("href",  'http://birthdays.24bps.com/user/'+deviantNAME);
				document.getElementById('newinnerbeing').setAttribute("title", bmonth+' '+day);
				document.getElementById('newinnerbeing').innerHTML= '<i class="icon i23"></i><span style="font-size:10px;font-weight:bold;line-height:11px;display:inline-block;"><small>Birthday...</small><br>Tomorrow!</span><b></b>';
			} else {	
				document.getElementById('newinnerbeing').className="gmbutton2 gmbutton2ggr";
				//document.getElementById('newinnerbeing').setAttribute("href",  'http://birthdays.24bps.com/user/'+deviantNAME);
				document.getElementById('newinnerbeing').setAttribute("title", bmonth+' '+day);
				document.getElementById('newinnerbeing').innerHTML= '<i class="icon i21"></i><span style="font-size:10px;line-height:11px;display:inline-block;"><small>Birthday in</small><br>'+days+' days!</span><b></b>';
			}
		}
		//alert('woo');
	} else {	
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://birthdays.24bps.com/user/'+deviantNAME,
			onload: function(responseDetails) {
				var data = responseDetails.responseText;
			if (data.match(/<h1>Could not find user<\/h1>/)){
				document.getElementById('newinnerbeing').innerHTML= '<i class="icon i45"></i><span style="font-size:10px;line-height:11px;display:inline-block;"><small>Birthday...</small><br/>Not Found</span><b></b>';
			} else {
				var bmonth = data.match(/<title>dA birthdays! - (.*)<\/title>/)[1];
				if (data.match(/<td id="d(.*)"><a name="d(.*)"><\/a><h2>(.*)<\/h2><ul>(.*)<li><strong class="uh"><a href="http:\/\/(.*).deviantart.com\/">(.*)<\/a><\/strong><\/li>(.*)<\/ul><\/td>/)){
					var day = data.match(/<td id="d(.*)"><a name="d(.*)"><\/a><h2>(.*)<\/h2><ul>(.*)<li><strong class="uh"><a href="http:\/\/(.*).deviantart.com\/">(.*)<\/a><\/strong><\/li>(.*)<\/ul><\/td>/)[1].replace('" class="today', '');
					var d = new Date();
					var today = d.getDate();
					var toyear = d.getFullYear();
					var month=new Array(12)
					month[0]="January"
					month[1]="February"
					month[2]="March"
					month[3]="April"
					month[4]="May"
					month[5]="June"
					month[6]="July"
					month[7]="August"
					month[8]="September"
					month[9]="October"
					month[10]="November"
					month[11]="December"
					var tomonth = month[d.getMonth()];
					var days=(Math.round((Date.parse(bmonth+" "+day+", "+toyear)-Date.parse(tomonth+" "+today+", "+toyear))/(24*60*60*1000))*1);
					
					if (days<0){days = 365 + days;}
					
					if (days==0){
						document.getElementById('newinnerbeing').className="gmbutton2 gmbutton2ggr";
						document.getElementById('newinnerbeing').setAttribute("href",  'http://birthdays.24bps.com/user/'+deviantNAME);
						document.getElementById('newinnerbeing').setAttribute("title", bmonth+' '+day);
						document.getElementById('newinnerbeing').setAttribute("style","background-image:url(http://st.deviantart.net/minish/messages/gmbutton2g.gif);color:#587F1F !important;");					
						document.getElementById('newinnerbeing').innerHTML= '<i class="icon i29"></i><span style="font-size:10px;font-weight:bold;line-height:11px;display:inline-block;"><small>Birthday...</small><br>Today!</span><b style="background-image:url(http://st.deviantart.net/minish/messages/gmbutton2g.gif)"></b>';
					} else {
						if (days==1) {
							document.getElementById('newinnerbeing').className="gmbutton2 gmbutton2ggr";
							document.getElementById('newinnerbeing').setAttribute("href",  'http://birthdays.24bps.com/user/'+deviantNAME);
							document.getElementById('newinnerbeing').setAttribute("title", bmonth+' '+day);
							document.getElementById('newinnerbeing').innerHTML= '<i class="icon i23"></i><span style="font-size:10px;font-weight:bold;line-height:11px;display:inline-block;"><small>Birthday...</small><br>Tomorrow!</span><b></b>';
						} else {	
							document.getElementById('newinnerbeing').className="gmbutton2 gmbutton2ggr";
							document.getElementById('newinnerbeing').setAttribute("href",  'http://birthdays.24bps.com/user/'+deviantNAME);
							document.getElementById('newinnerbeing').setAttribute("title", bmonth+' '+day);
							document.getElementById('newinnerbeing').innerHTML= '<i class="icon i21"></i><span style="font-size:10px;line-height:11px;display:inline-block;"><small>Birthday in</small><br>'+days+' days!</span><b></b>';
						}
					}
				} else {
						document.getElementById('newinnerbeing').innerHTML= '<i class="icon i45"></i><span style="font-size:10px;line-height:11px;display:inline-block;"><small>Uh oh!</small><br>Error!</span><b></b>';
				}
			}
			}
		});
	}
}