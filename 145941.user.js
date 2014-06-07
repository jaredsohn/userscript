// ==UserScript==
// @name        standalonescraper
// @namespace   www.lkaiser.com
// @description standalonescraper
// @include     http*://www.google.com*
// @version     1
// @grant 			none
// @require     http://code.jquery.com/jquery.min.js
// ==/UserScript==

function searchDataInit(n) {
    var data = {};
		data.add = function (a,b) {
			this[a] = b;
		}
		var opt = {};
		opt['lastclick'] = 0;
		opt['maxpage'] = 3;
		opt['searchinterval'] = 5;
		opt['refresh'] = 0;
		data['opt'] = opt;
		
  data.add('1',{keywords:"Patricia Mcadams Nagel attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('2',{keywords:"King M. Trimble attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('3',{keywords:"Robert P Majerus attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('4',{keywords:"Edmund L Epstein attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('5',{keywords:"Gregory Tella attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('6',{keywords:"Rock Wharton Lindsay attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('7',{keywords:"Ethan J Cantor attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('8',{keywords:"Roger W Baker attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('9',{keywords:"Gerald William Laska attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('10',{keywords:"Leonard M Hoffius attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('11',{keywords:"David Aaron Wegner attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('12',{keywords:"Benjamin E Wick attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('13',{keywords:"Ann B. Riley attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('14',{keywords:"Dylan Thomas Devito attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('15',{keywords:"Gary S Altman attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('16',{keywords:"Malcolm Buie Seawell Jr. attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('17',{keywords:"W. Gordon Rauck attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('18',{keywords:"John Anmar Siddeek attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('19',{keywords:"Harry Myles Bleeker attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('20',{keywords:"Mervyn L. Young attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('21',{keywords:"Samuel Levine attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('22',{keywords:"Gary Carl Johnson attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('23',{keywords:"Ralph Thomas Caldwell attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('24',{keywords:"Robert Elery Wages III attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('25',{keywords:"Judith S Singleton attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('26',{keywords:"Amy Sanchez attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('27',{keywords:"William M. Austin III attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('28',{keywords:"Randal Gene Reid attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('29',{keywords:"Raymond L. Randall attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('30',{keywords:"Suzanne B. O'Neill attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('31',{keywords:"John S Phillips attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('32',{keywords:"Linda Jo Schutjer attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('33',{keywords:"Stephen John Grubiss attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('34',{keywords:"Gordon H Rowe Jr. attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('35',{keywords:"Christopher Jonathan Pooley attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('36',{keywords:"Christopher J. Pooley attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('37',{keywords:"Tracy Leigh Kinsella attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('38',{keywords:"Lisa Start attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('39',{keywords:"Joshua B Zugish attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('40',{keywords:"Jean M Christman attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('41',{keywords:"Jannine R Mohr attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('42',{keywords:"Peter A Martin attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('43',{keywords:"Barry Lee Schumacher attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('44',{keywords:"Don Killian Deford attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('45',{keywords:"Claire Laura Evans attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('46',{keywords:"Robert A Francis attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('47',{keywords:"William David Rippy attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('48',{keywords:"Mary Lynn Rippy attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('49',{keywords:"Leon Robert Levy III attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  data.add('50',{keywords:"Julie A Teel attorney email",check:false,onsearch:false,page:"",match:"",url:""});
  
		localStorage.removeItem('searchData');
		localStorage.setItem("searchData",JSON.stringify(data)); 
		//console.log(localStorage.getItem("searchData")); 
}


function sendData() {
var data = JSON.parse(localStorage.getItem("searchData"));
$("<div>",{
id:'search-result',
"class":"text",
"style":"border:1px solid #FED395;background:none repeat scroll 0 0 #FFF9E8;position:absolute;width:2000px;height:2000px;left:0px;top:200px;",
click:function(){
$(this).toggleClass('test');
}
}).appendTo("body");	

//$('#search-result').attr('height','200');

var t = 0;
//console.log(dt);
if(data) {
	 for(key in data) {
	 //console.log('cccccccccccccccccc');
		t++;
			$("<li>",{
			text:data[key].keywords+'   '+data[key].match+'      '+data[key].url,
			"class":"text"
			}).appendTo("#search-result");
		}
}		



}


function fireEvent(cur,event) {
	 window.location.href = cur.attr("href");
	 return;
	// var element = cur[0];
   if (document.createEvent) {
       // dispatch for firefox + others
       var evt = document.createEvent("HTMLEvents");
       evt.initEvent(event, true, true ); // event type,bubbling,cancelable
       //return !element.dispatchEvent(evt);
   } else {
       // dispatch for IE
       var evt = document.createEventObject();
       return element.fireEvent('on'+event,evt)
   }
}


function dosearch(input,btn,data,key) {
	input.value = data[key].keywords;
	data['opt']['lastclick'] = new Date().getTime();
	data['opt']['lastserachkey'] = key;
	localStorage.setItem("searchData",JSON.stringify(data));
	btn.click();
} 

// current page
function curpage(){
  var s = $('#navcnt');
  if(s.length>0) {
  	return parseInt($.trim(s.find('td.cur').text()));
  }
}

function navigaeToNext(data) {
    
		var cur = $('#pnnext');
		if(cur.length>0) {
			fireEvent(cur,'click');
		}else {
			var lskey = data['opt']['lastserachkey'];
			data[lskey].check = true;
			localStorage.setItem("searchData",JSON.stringify(data));
		}
}

function hasNext() {
	var cur = $('#pnnext');
	if(cur.length>0)
	  return true;
	 return false; 
}

function keywordsmartching(data) {
	var lskey = data['opt']['lastserachkey'];
	var strs = data[lskey].keywords.split(" ");
	
	var mailpatten = /([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+\.\w+/;
	if(strs.length == 4) {
		eval("var re1 = /" + strs[0] + "[\\.\\s]" + strs[1] + "/;");
	}
	if(strs.length > 4) {
		eval("var re1 = /" + strs[0] + "[\\.\\s]" + strs[2] + "[\\.\\s]" + strs[1] + "/i;");
		eval("var re2 = /" + strs[2] + "[\\.\\s]" + strs[1] + "[\\.\\s]" + strs[0] + "/i;");
		eval("var re3 = /" + strs[0] + "[\\.\\s]" + strs[1].substr(0,1) + "\\w+" + "[\\.\\s]" + strs[2] + "/i;");
	}
		
	$('#search').find('span.st').each(function(){
		var text = $(this).text();

		if(strs.length ==4) {
			var mailmatch = text.match(mailpatten);
			var re1match = text.match(re1);
			if(mailmatch && re1match && mailmatch.index > re1match.index) {
				if(data[lskey].match.indexOf(mailmatch[0]) == -1) {
					data[lskey].match += mailmatch[0]+";";
				}
			} 
		}
		
		if(strs.length >4) {
			var mailmatch = text.match(mailpatten);
			var re1match = text.match(re1);
			var re2match = text.match(re2);
			var re3match = text.match(re3);
			if((re1match || re2match || re3match) && mailmatch) {
				var index = 10000;
				if(re1match)
				  index = re1match.index;
				if(re2match)
				  index = Math.min(index,re2match.index);
				if(re3match)
					index = Math.min(index,re3match.index);
				if(index < mailmatch.index) {
					if(data[lskey].match.indexOf(mailmatch[0]) == -1) {
						data[lskey].match += mailmatch[0]+";";
					}
				}	    
			}
		}
	});
	
	$('#search').find('h3.r a').each(function(){
			if($(this).attr('href').indexOf('member.calbar.ca.gov') != -1) {
				data[lskey].url += $(this).attr('href')+";";
			}
			if($(this).attr('href').indexOf('plainsite.org') != -1) {
				data[lskey].url += $(this).attr('href')+";";
			}
	});

	
	
}

// scrape the current page
function pagescrape(data,key) {
  var maxpage = parseInt(data['opt']['maxpage']);
	var lskey = data['opt']['lastserachkey'];
	var cur = curpage();
	if(!cur)
	  cur = 1;
	if(!lskey)
	  return;
	if(lskey != key)
	  return;
	//console.log('cur='+cur.toString()+' page='+data[lskey].page+' key='+data[lskey].keywords);
	if(lskey && cur<=maxpage && data[lskey].page.indexOf(cur.toString()) == -1) {
	    //console.log('crape page '+cur + ' with key index ' + lskey + ' key words ' + data[lskey].keywords);
			keywordsmartching(data);
			data[lskey].page = data[lskey].page+cur+';';
			if(!hasNext() || cur == maxpage) {
				data[lskey].check = true;
				if(!data['opt']['refresh']) {
					data['opt']['refresh'] = 1;
				}else {
					data['opt']['refresh'] ++;
				}
				//console.log('data[lskey].match='+data[lskey].match);
				//console.log('data[lskey].url='+data[lskey].url);
			}else {
				data['opt']['lastclick'] = new Date().getTime();
			}
			localStorage.setItem("searchData",JSON.stringify(data));
	}
	
	if(cur && cur<maxpage){
		navigaeToNext(data);
	}
}

function startjob() {
	//localStorage.removeItem('searchData');
	//return;
	if(!window.localStorage) {
		alert('This browser does NOT support localStorage');
		return;
	}
	
	if(!localStorage.getItem("searchData")) {
		searchDataInit(8);
		setTimeout(startjob,30000);
		return;
	}
	
	
	var data = JSON.parse(localStorage.getItem("searchData"));
	
	if('finish' == data['opt']['status']) {
		sendData(data);
	  //setTimeout(startjob,60000);
		return;
	}
	
	var rscount = data['opt']['refresh'];
	if(rscount) {
	  if(rscount > 20) {
	  	//console.log('refresh');
	  	data['opt']['refresh'] = 0;
	  	localStorage.setItem("searchData",JSON.stringify(data));
			document.location.href="http://www.google.com";
			return;
		}
	}
	
	var jinput = $('input[name="q"]');
	
	if(jinput.length == 0) {
		document.location.href="http://google.com";
		return;
	}
	
	var input = $('input[name="q"]')[0];
	
	
	
	var btn = document.getElementById('gbqfba');
	if(!btn) {
	  btn = document.getElementsByName('btnG')[0];
	}
	if(!btn) {
		btn = $('#logocont').next().find('input[type="submit"]')[0];
	}

	var f = false;
	var interval = parseInt(data['opt']['searchinterval']);
	var maxpage = parseInt(data['opt']['maxpage']);
	if(data) {
		for(key in data) {
		if(key != 'opt') {
			if(!data[key].check) {
			  f = true;
				
			  var last = data['opt']['lastclick'];
			  var now = new Date().getTime();
			  if(parseInt(last)+interval*1000 > now) {
			  	var wait = parseInt(last)+interval*1000 - now + 4000*Math.random();
			  	//console.log('wait for '+ key + ' ' + data[key].keywords + ' ' + wait + ' seconds');
					
			  	setTimeout(startjob,wait);
			  	return;
			  }
	  		//console.log(data[key].keywords);
	  		//console.log('key='+key+' lastsearchkey='+data['opt']['lastserachkey']+" page="+data[key].page+" checked="+data[key].check);
	  		
	  		
	  		
	  		if(key != data['opt']['lastserachkey'] || input.value == "") {
					dosearch(input,btn,data,key);
					setTimeout(startjob,1000);
		  		return;
				}
			
	  		pagescrape(data,key);
	  		setTimeout(startjob,1000);
	  		return;
	  		
	  		//if(!data[key].check && key == data['opt']['lastserachkey']) {
	  			
	  		//}
	  		
			}
			
			
		}
		}
		if(true) {
		  //console.log('work finished');
		  data['opt']['status'] = 'finish';
		  localStorage.setItem("searchData",JSON.stringify(data));
			sendData(data);
			//document.location.href="http://google.com";
		}
	}

}

$(document).ready(function(){
  //sendData();
  startjob();
});
