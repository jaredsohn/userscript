// ==UserScript==
// @name			HKGalden Stat
// @version			0.1.1
// @description			Three different statistical models of HKGalden
// @icon                https://i.na.cx/ncimg/i1307/j2Va.gif
// @include		https://hkgalden.com/topics/BW
// @include			http://hkgalden.com/topics/BW
// @include		https://hkgalden.com/member/profile/*
// updateURL		https://userscripts.org/scripts/source/173750.meta.js
// downloadURL		https://userscripts.org/scripts/source/173750.user.js
// ==/UserScript==

//sarina_uk's mother is prostitute, father is dog, himself is big6people

var $ = function (selector) {
	return document.querySelector(selector);
}

var $$ = function (selector) {
	return document.querySelectorAll(selector);
}


var tag = new Array();
var table = new Array();

var win=this.unsafeWindow;
win.mainfunction = function (json) {

         //get data from spreadsheet
	 var obj = json.feed.entry[0];
	 var k = 0;
	 for (var key in obj){
		if( key.indexOf("gsx")==0 ){
			tag[k] = key;
			table[k]=obj[key].$t;
		  k++;
		}
	 }
	 
	 var obj3 = json.feed.entry[1];
	 var latestmember = parseInt(obj3[tag[1]].$t);
	 var interval = parseInt(table[3]);
	 var reloadtime = parseInt(table[4]);
	 
	//alert(latestmember);
	var docURL = document.URL;
	//alert($('.ihodr').innerHTML.indexOf('開啟'));
        //if you are at blow water board and including tomato board
	if ( (docURL.indexOf('https://hkgalden.com/topics/BW') != -1 || docURL.indexOf('http://hkgalden.com/topics/BW') != -1 ) && $('.ihodr').innerHTML.indexOf('開啟過濾') !=-1){
		
      // alert($('.ihodr').innerHTML);
		
		var current = new Date();
	//	alert($('開啟過濾模式').innerHTML);
		//for stat 1 visitors
		var time1 = new Date(table[0]);
		if ( current-time1 > interval ){
		//alert($('.ihodr').innerHTML.indexOf('開啟'));
			//alert($('5 分鐘內瀏覽人數').innerHTML);
            var	nodes1 = $('#plm').querySelectorAll('small');		
            var last1 = nodes1[0].innerHTML;
            var visitors = last1.substr(last1.indexOf('數')+2);
			//alert($('#plm').querySelector('.span').innerHTML);
			//var visitors = $('.onlineuser').innerHTML.substr(10);
            
			var first = $('.lt').querySelector('.lrt-t').innerHTML;
			var nodes = $$('.dt');
			var last = nodes[nodes.length- 1].querySelector('.lrt-t').innerHTML;
			//alert(first);
						//alert(last);
			var sumbitform = 'https://docs.google.com/forms/d/1g7oamxwC6q8WUNWKusYsC1xpzDRV5h4K0T2gx7DO07s/formResponse?ifq&entry.832959760='+visitors+'&entry.716618986='+first+'&entry.171533140='+last+'&submit=Submit';
			
			var request = new XMLHttpRequest();
			request.open("GET", sumbitform, true);
			request.send(null);
		}	
		
		setTimeout(function (t){window.location.reload()}, reloadtime);
		//for stat 2 member stat
		
		
	}else if ( docURL.indexOf('https://hkgalden.com/member/profile/') != -1 || docURL.indexOf('http://hkgalden.com/member/profile/') !=-1){
		var curmember;
		if ( docURL.indexOf('https://hkgalden.com/member/profile/') != -1)
			curmember = parseInt(docURL.substr(36));
		if ( docURL.indexOf('http://hkgalden.com/member/profile/') != -1)
			curmember = parseInt(docURL.substr(35));
		
		if ( curmember == latestmember+1 ){
			var datastring = $('#hkga-pftb').innerHTML;
			if ( datastring.indexOf('1970') != -1 ){
				setTimeout(function (t){window.location.reload()}, reloadtime);
			}
			else{
				var memberid = $(".usrinfo").querySelector('td').innerHTML;
				
				
				
				var membername;
				if ($(".unm.bro"))
				 membername = $(".unm.bro").innerHTML;
				if ($(".unm.sis"))
				 membername = $(".unm.sis").innerHTML;
			   var subbmitform = 'https://docs.google.com/forms/d/1g7oamxwC6q8WUNWKusYsC1xpzDRV5h4K0T2gx7DO07s/formResponse?ifq&entry.1906422367='+memberid+'&entry.1481248762='+membername+'&submit=Submit';
				

			
			    var request = new XMLHttpRequest();
				request.open("GET", subbmitform, true);
				request.send(null);
			    setTimeout(function (u){
			        
			        var newURL;
					if (document.URL.indexOf('https') != -1)
						newURL = 'https://hkgalden.com/member/profile/'+(parseInt(memberid)+1).toString();
					else
						newURL = 'http://hkgalden.com/member/profile/'+(parseInt(memberid)+1).toString();
				
					window.open (newURL,'_self',false)
			    	}, 15000);
				
			}
		}else{
			    setTimeout(function (s){
        
        							var newURL = 'https://hkgalden.com/member/profile/'+(latestmember+1).toString();
			
																	window.open (newURL,'_self',false)
													    	}, reloadtime);
	

			
		}
	
	
	
	}else
		var temp=0;
	
	
}
var jsonapi = document.createElement('script');
jsonapi.src = 'https://spreadsheets.google.com/feeds/list/0ApEyQph2NSyNdENUbDlFRUhKWC1wSEJfa2h3bWotQmc/od7/public/values?alt=json-in-script&callback=mainfunction';
var doc = $('head');
doc.appendChild(jsonapi);