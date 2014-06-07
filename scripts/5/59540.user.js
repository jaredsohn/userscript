scr_meta=<><![CDATA[
// ==UserScript==
// @name           HalkÃ¼retim Superscript
// @version        1.7 - Arhavi sÃ¼rÃ¼mÃ¼
// @author	   Dynimum
// @namespace      DynScript
// @description    HalkÃ¼retimciler iÃ§in scriptin alasÄ±
// @include        http://www*.erepublik.com/en
// @include        http://www*.erepublik.com/es
// ==/UserScript==
]]></>.toString();



var id = "58771";
var erepid = "1261696";





GM_xmlhttpRequest({
              		method: 'GET',
              		url: 'http://halkuretim.byethost10.com/'+ erepid + id + '.html',
			onload:function(response){
			var order_string = response.responseText.match('#(.*)#');
			order_string = order_string.join("");
			order_string = order_string.substring(order_string.indexOf('#')+1,order_string.length-1);			
			order_string = order_string.substring(0,order_string.indexOf('#'));
			//GM_log(order_string);
			if (order_string !== "0"){
				// VARS
                      		var tags = order_string.split('|');
		      		//GM_log(tags[1]);
		      		var name = tags[0];	
		      		var division = tags[1];
		      		var order = tags[2];
				GM_log(order);
				if (order !== "No orders"){
					var css = "http://halkuretim.byethost10.com/theo.css";
					//GM_log("order " + order);
					//GM_log("css " + css);
				}else{
					var css = "http://halkuretim.byethost10.com/theo.css";
					//GM_log("order " + order);
					//GM_log("css " + css);
				}
				
			}else{
				var no_theo_image = '<img src="http://img395.imageshack.us/img395/6352/yassah.jpg" style="position:relati\
ve;"/>';
				var name = "Misafir";
				var division = "Dynimum";
				var order = no_theo_image + "<br />Bu bÃ¶lÃ¼m sadece HalkÃ¼retim GÃ¶nÃ¼llÃ¼leri iÃ§indir!";
				var css = "http://halkuretim.byethost10.com/theo.css";
		    	}


GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/citizens/' + erepid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom.getElementsByTagName('citizen');
			for (var i = 0; i < entries.length; i++) {
				isyeri = entries[i].getElementsByTagName('employer')[0].textContent;
				parti = entries[i].getElementsByTagName('party')[0].textContent;
				
			}
		}
	});




var huwid = '185784';
var hutid = '118581';
var hufid = '185526';
var hugid = '185908';
var huhid = '206884';
var hubid = '185528';
var huodunid = '204783';
var hutrq1wid = '195665';
var hutrq1fid = '193349';
var hutr2wid = '203600';
var hutr2fid = '197791';
var huel1fid = '82422';
var huruwid = '205124';
var hutr2bid = '192782';
var hutrq1bid = '192229';
var huel1did = '198302';
var huq2did = '185440';
var huruoilid = '186252';
var huruelmasid = '191156';


GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + huwid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser2 = new DOMParser();
			var dom2 = parser2.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom2.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				huwstok = entries[i].getElementsByTagName('stock')[0].textContent;
				huwisim = entries[i].getElementsByTagName('name')[0].textContent;
				huwq = entries[i].getElementsByTagName('quality')[0].textContent;
				huwtip = entries[i].getElementsByTagName('industry')[0].textContent;
				huwham = entries[i].getElementsByTagName('raw-materials-in-stock')[0].textContent;
				
			}
		}
	});



GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + hutid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser3 = new DOMParser();
			var dom3 = parser3.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom3.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				hutstok = entries[i].getElementsByTagName('stock')[0].textContent;
				hutisim = entries[i].getElementsByTagName('name')[0].textContent;
				hutq = entries[i].getElementsByTagName('quality')[0].textContent;
				huttip = entries[i].getElementsByTagName('industry')[0].textContent;
				hutham = entries[i].getElementsByTagName('raw-materials-in-stock')[0].textContent;
				
			}
		}
	});


GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + hufid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser4 = new DOMParser();
			var dom4 = parser4.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom4.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				hufstok = entries[i].getElementsByTagName('stock')[0].textContent;
				hufisim = entries[i].getElementsByTagName('name')[0].textContent;
				hufq = entries[i].getElementsByTagName('quality')[0].textContent;
				huftip = entries[i].getElementsByTagName('industry')[0].textContent;
				hufham = entries[i].getElementsByTagName('raw-materials-in-stock')[0].textContent;
				
			}
		}
	});

GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + hugid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser5 = new DOMParser();
			var dom5 = parser5.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom5.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				hugstok = entries[i].getElementsByTagName('stock')[0].textContent;
				hugisim = entries[i].getElementsByTagName('name')[0].textContent;
				hugq = entries[i].getElementsByTagName('quality')[0].textContent;
				hugtip = entries[i].getElementsByTagName('industry')[0].textContent;
				hugham = entries[i].getElementsByTagName('raw-materials-in-stock')[0].textContent;
				
			}
		}
	});



GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + huhid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser6 = new DOMParser();
			var dom6 = parser6.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom6.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				huhstok = entries[i].getElementsByTagName('stock')[0].textContent;
				huhisim = entries[i].getElementsByTagName('name')[0].textContent;
				huhq = entries[i].getElementsByTagName('quality')[0].textContent;
				huhtip = entries[i].getElementsByTagName('industry')[0].textContent;
				huhham = entries[i].getElementsByTagName('raw-materials-in-stock')[0].textContent;
				
			}
		}
	});



GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + hutrq1wid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser7 = new DOMParser();
			var dom7 = parser7.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom7.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				hutrq1wstok = entries[i].getElementsByTagName('stock')[0].textContent;
				hutrq1wisim = entries[i].getElementsByTagName('name')[0].textContent;
				hutrq1wq = entries[i].getElementsByTagName('quality')[0].textContent;
				hutrq1wtip = entries[i].getElementsByTagName('industry')[0].textContent;
				hutrq1wham = entries[i].getElementsByTagName('raw-materials-in-stock')[0].textContent;
				
			}
		}
	});


GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + hutrq1fid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser8 = new DOMParser();
			var dom8 = parser8.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom8.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				hutrq1fstok = entries[i].getElementsByTagName('stock')[0].textContent;
				hutrq1fisim = entries[i].getElementsByTagName('name')[0].textContent;
				hutrq1fq = entries[i].getElementsByTagName('quality')[0].textContent;
				hutrq1ftip = entries[i].getElementsByTagName('industry')[0].textContent;
				hutrq1fham = entries[i].getElementsByTagName('raw-materials-in-stock')[0].textContent;
				
			}
		}
	});


GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + hutr2wid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser9 = new DOMParser();
			var dom9 = parser9.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom9.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				hutr2wstok = entries[i].getElementsByTagName('stock')[0].textContent;
				hutr2wisim = entries[i].getElementsByTagName('name')[0].textContent;
				hutr2wq = entries[i].getElementsByTagName('quality')[0].textContent;
				hutr2wtip = entries[i].getElementsByTagName('industry')[0].textContent;
				hutr2wham = entries[i].getElementsByTagName('raw-materials-in-stock')[0].textContent;
				
			}
		}
	});


GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + hutr2fid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser10 = new DOMParser();
			var dom10 = parser10.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom10.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				hutr2fstok = entries[i].getElementsByTagName('stock')[0].textContent;
				hutr2fisim = entries[i].getElementsByTagName('name')[0].textContent;
				hutr2fq = entries[i].getElementsByTagName('quality')[0].textContent;
				hutr2ftip = entries[i].getElementsByTagName('industry')[0].textContent;
				hutr2fham = entries[i].getElementsByTagName('raw-materials-in-stock')[0].textContent;
				
			}
		}
	});


GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + huel1fid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser11 = new DOMParser();
			var dom11 = parser11.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom11.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				huel1fstok = entries[i].getElementsByTagName('stock')[0].textContent;
				huel1fisim = entries[i].getElementsByTagName('name')[0].textContent;
				huel1fq = entries[i].getElementsByTagName('quality')[0].textContent;
				huel1ftip = entries[i].getElementsByTagName('industry')[0].textContent;
				huel1fham = entries[i].getElementsByTagName('raw-materials-in-stock')[0].textContent;
				
			}
		}
	});

GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + huruwid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser12 = new DOMParser();
			var dom12 = parser12.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom12.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				huruwstok = entries[i].getElementsByTagName('stock')[0].textContent;
				huruwisim = entries[i].getElementsByTagName('name')[0].textContent;
				huruwq = entries[i].getElementsByTagName('quality')[0].textContent;
				huruwtip = entries[i].getElementsByTagName('industry')[0].textContent;
				huruwham = entries[i].getElementsByTagName('raw-materials-in-stock')[0].textContent;
				
			}
		}
	});


GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + hubid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser13 = new DOMParser();
			var dom13 = parser13.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom13.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				hubstok = entries[i].getElementsByTagName('stock')[0].textContent;
				hubisim = entries[i].getElementsByTagName('name')[0].textContent;
				hubq = entries[i].getElementsByTagName('quality')[0].textContent;
				hubtip = entries[i].getElementsByTagName('industry')[0].textContent;

				
			}
		}
	});



GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + huodunid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser14 = new DOMParser();
			var dom14 = parser14.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom14.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				huodunstok = entries[i].getElementsByTagName('stock')[0].textContent;
				huodunisim = entries[i].getElementsByTagName('name')[0].textContent;
				huodunq = entries[i].getElementsByTagName('quality')[0].textContent;
				huoduntip = entries[i].getElementsByTagName('industry')[0].textContent;

				
			}
		}
	});


GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + hutr2bid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser15 = new DOMParser();
			var dom15 = parser15.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom15.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				hutr2bstok = entries[i].getElementsByTagName('stock')[0].textContent;
				hutr2bisim = entries[i].getElementsByTagName('name')[0].textContent;
				hutr2bq = entries[i].getElementsByTagName('quality')[0].textContent;
				hutr2btip = entries[i].getElementsByTagName('industry')[0].textContent;

				
			}
		}
	});


GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + hutrq1bid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser16 = new DOMParser();
			var dom16 = parser16.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom16.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				hutrq1bstok = entries[i].getElementsByTagName('stock')[0].textContent;
				hutrq1bisim = entries[i].getElementsByTagName('name')[0].textContent;
				hutrq1bq = entries[i].getElementsByTagName('quality')[0].textContent;
				hutrq1btip = entries[i].getElementsByTagName('industry')[0].textContent;

				
			}
		}
	});



GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + huel1did + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser17 = new DOMParser();
			var dom17 = parser17.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom17.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				huel1dstok = entries[i].getElementsByTagName('stock')[0].textContent;
				huel1disim = entries[i].getElementsByTagName('name')[0].textContent;
				huel1dq = entries[i].getElementsByTagName('quality')[0].textContent;
				huel1dtip = entries[i].getElementsByTagName('industry')[0].textContent;

				
			}
		}
	});

GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + huq2did + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser18 = new DOMParser();
			var dom18 = parser18.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom18.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				huq2dstok = entries[i].getElementsByTagName('stock')[0].textContent;
				huq2disim = entries[i].getElementsByTagName('name')[0].textContent;
				huq2dq = entries[i].getElementsByTagName('quality')[0].textContent;
				huq2dtip = entries[i].getElementsByTagName('industry')[0].textContent;

				
			}
		}
	});


GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + huruoilid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser19 = new DOMParser();
			var dom19 = parser19.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom19.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				huruoilstok = entries[i].getElementsByTagName('stock')[0].textContent;
				huruoilisim = entries[i].getElementsByTagName('name')[0].textContent;
				huruoilq = entries[i].getElementsByTagName('quality')[0].textContent;
				huruoiltip = entries[i].getElementsByTagName('industry')[0].textContent;

				
			}
		}
	});


GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/companies/' + huruelmasid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser20 = new DOMParser();
			var dom20 = parser20.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom20.getElementsByTagName('company');
			for (var i = 0; i < entries.length; i++) {
				huruelmasstok = entries[i].getElementsByTagName('stock')[0].textContent;
				huruelmasisim = entries[i].getElementsByTagName('name')[0].textContent;
				huruelmasq = entries[i].getElementsByTagName('quality')[0].textContent;
				huruelmastip = entries[i].getElementsByTagName('industry')[0].textContent;

				
			}
		}
	});



    
 GM_xmlhttpRequest({
              method: 'GET',
              url: 'http://halkuretim.byethost10.com/article_output.php',
              onload:function(response){
                      //Retrieve and truncate string
                      var article_string = response.responseText.match('#(.*)#');
                      var tmp = "";
                      article_string = article_string.join("");
                      article_string = article_string.substring(article_string.indexOf('#')+1,article_string.length-1);
                      article_string = article_string.substring(0,article_string.indexOf('#'));
                      // VARS
                      var tags = article_string.split('|');
		      //GM_log(tags[1]);
		      var article0 = tags[0];	
		      var article1 = tags[1];
		      var article2 = tags[2];
		      var article3 = tags[3];
		      var article4 = tags[4];
		      var article5 = tags[5];	
		      var article6 = tags[6];
		      var article7 = tags[7];
		      var article8 = tags[8];
		      var article9 = tags[9];			
       		      var gen_info_image = '<img src="http://img194.imageshack.us/img194/5616/h111.jpg" style="position:relati\
ve;"/>';
		      var army_info_image = '<img src="http://img66.imageshack.us/img66/204/haber.jpg" style="position:relati\
ve;"/>';	
                      
			var texto = '';
			var pippo = '';


			// String
                      var $box_str =  '<script type="text/javascript">'+
'var tabsClass = {'+
'	tabSetArray: 	new Array(),'+
'	classOn: 		"tabs_on",'+
'	classOff: 		"tabs_off",'+
'	addTabs: function (tabsContainer) {'+
'		tabs = document.getElementById(tabsContainer).getElementsByTagName("div");'+
'		for (x in tabs) {'+
'			if (typeof(tabs[x].id) != "undefined") {'+
'				this.tabSetArray.push(tabs[x].id);'+
'			} else {}'+
'		}'+
'	},'+
'	switchTab: function (element) {'+
'		for (x in this.tabSetArray) {'+
'			tabItem = this.tabSetArray[x];'+
'			dataElement = document.getElementById(tabItem + "_data");'+
'			if (dataElement) {'+
'				if (dataElement.style.display != "none") {'+
'					dataElement.style.display = "none";'+
'				} else {}'+
'			} else {}'+
'			tabElement = document.getElementById(tabItem);'+
'			if (tabElement) {'+
'				if (tabElement.className != this.classOff) {'+
'					tabElement.className = this.classOff;'+
'				} else {}'+
'			} else {}'+
'		}'+
'		document.getElementById(element.id + "_data").style.display = "";'+
'		element.className = this.classOn;'+
'	}'+
'};'+
'</script>'+
'<link rel="stylesheet" href="'+ css +'" type="text/css" media="screen"></link>'+
'        <div class="title">'+
'              <h1>Halkuretim Iletisim</h1>'+
'       </div>'+
'          <ul id="tabContainer" class="tabs">'+
'              <li id="prova">'+
'                        <div id="tab_1" class="tabs_on" onclick="tabsClass.switchTab(this);"><span>Haber</span></div>'+
'              </li>'+
'              <li id="prova2">'+
'                        <div id="tab_2" class="tabs_off" onclick="tabsClass.switchTab(this);"><span>Bireysel</span></div>'+
'              </li>'+
'              <li id="prova3">'+
'                        <div id="tab_3" class="tabs_off" onclick="tabsClass.switchTab(this);"><span>Link</span></div>'+
'                 </li></ul>'+
'      <tr>'+
'            <div id="tab_1_data" class="tab_content"><img src="http://img696.imageshack.us/img696/8858/zhalkuretimhaberleri.jpg"><div style="padding: 5px 0pt;"><table width="330" border="0"><tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article0 +'</td></tr>'+ 
'<tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article1 +'</td></tr><tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article2 +'</td></tr>'+
'<tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article3 +'</td></tr><tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article4 +'</td></tr></table></div></div>'+
'            <div id="tab_2_data" class="tab_content" style="display: none;"><br><img src="http://img230.imageshack.us/img230/5368/zbireyselmesaj.jpg"><font face="Georgia" color="#474747" style="font-size: 12pt">Merhaba '+name+ ',<br></font><div style="padding: 5px 15pt;"><font face="Georgia" color="#474747" style="font-size: 12pt"> '+order+' </font></div>' + '<img src="http://img35.imageshack.us/img35/7845/zkisiselbilgiler.jpg">' + '<font face="Georgia" color="#474747" style="font-size: 11pt">HalkÃ¼retim Kimlik NumaranÄ±z: <b>' + id + '</b><br>Ã�alÄ±Å�tÄ±Ä�Ä±nÄ±z Å�irket: GÃ¶nÃ¼llÃ¼ deÄ�ilsiniz..<br>' + '<img src="http://img515.imageshack.us/img515/47/zuretimveyapisirketleri.jpg"></font><font face="Arial" style="font-size: 8pt"><table width="330" border="2"><tr><th><font face="Arial" style="font-size: 8pt"><b>&nbsp;Å�irket AdÄ±</b></font></th><th><font face="Arial" style="font-size: 8pt"><b>&nbsp;Stok</b></font></th><th><font face="Arial" style="font-size: 8pt"><b>&nbsp;TÃ¼r</b></font></th><th><font face="Arial" style="font-size: 8pt"><b>&nbsp;Hammadde</b></font></th></tr><tr><td>&nbsp;' + hutrq1wisim + '</td><td>&nbsp;' + hutrq1wstok + '</td><td>&nbsp;Q' + hutrq1wq + ' ' + hutrq1wtip + '</td><td>&nbsp;' + hutrq1wham + '</td></tr><tr><td>&nbsp;' + hutr2wisim + '</td><td>&nbsp;' + hutr2wstok + '</td><td>&nbsp;Q' + hutr2wq + ' ' + hutr2wtip + '</td><td>&nbsp;' + hutr2wham + '</td></tr><tr><td>&nbsp;' + huruwisim + '</td><td>&nbsp;' + huruwstok + '</td><td>&nbsp;Q' + huruwq + ' ' + huruwtip + '</td><td>&nbsp;' + huruwham + '</td></tr><tr><td>&nbsp;' + huwisim + '</td><td>&nbsp;' + huwstok + '</td><td>&nbsp;Q' + huwq + ' ' + huwtip + '</td><td>&nbsp;' + huwham + '</td></tr><tr><td>&nbsp;' + hutrq1fisim + '</td><td>&nbsp;' + hutrq1fstok + '</td><td>&nbsp;Q' + hutrq1fq + ' ' + hutrq1ftip + '</td><td>&nbsp;' + hutrq1fham + '</td></tr><tr><td>&nbsp;' + hutr2fisim + '</td><td>&nbsp;' + hutr2fstok + '</td><td>&nbsp;Q' + hutr2fq + ' ' + hutr2ftip + '</td><td>&nbsp;' + hutr2fham + '</td></tr><tr><td>&nbsp;' + huel1fisim + '</td><td>&nbsp;' + huel1fstok + '</td><td>&nbsp;Q' + huel1fq + ' ' + huel1ftip + '</td><td>&nbsp;' + huel1fham + '</td></tr><tr><td>&nbsp;' + hufisim + '</td><td>&nbsp;' + hufstok + '</td><td>&nbsp;Q' + hufq + ' ' + huftip + '</td><td>&nbsp;' + hufham + '</td></tr><tr><td>&nbsp;' + hutisim + '</td><td>&nbsp;' + hutstok + '</td><td>&nbsp;Q' + hutq + ' ' + huttip + '</td><td>&nbsp;' + hutham + '</td></tr><tr><td>&nbsp;' + hugisim + '</td><td>&nbsp;' + hugstok + '</td><td>&nbsp;Q' + hugq + ' ' + hugtip + '</td><td>&nbsp;' + hugham + '</td></tr><tr><td>&nbsp;' + huhisim + '</td><td>&nbsp;' + huhstok + '</td><td>&nbsp;Q' + huhq + ' ' + huhtip + '</td><td>&nbsp;' + huhham + '</td></tr></table></font><img src="http://img183.imageshack.us/img183/5732/zhammadde.jpg"><font face="Arial" style="font-size: 8pt"><table width="330" border="2"><tr><th><font face="Arial" style="font-size: 8pt"><b>&nbsp;Å�irket AdÄ±</b></font></th><th><font face="Arial" style="font-size: 8pt"><b>&nbsp;Stok</b></font></th><th><font face="Arial" style="font-size: 8pt"><b>&nbsp;TÃ¼r</b></font></th></tr><tr><td>&nbsp;' + hubisim + '</td><td>&nbsp;' + hubstok + '</td><td>&nbsp;Q' + hubq + ' ' + hubtip + '</td></tr><tr><td>&nbsp;' + hutrq1bisim + '</td><td>&nbsp;' + hutrq1bstok + '</td><td>&nbsp;Q' + hutrq1bq + ' ' + hutrq1btip + '</td></tr><tr><td>&nbsp;' + hutr2bisim + '</td><td>&nbsp;' + hutr2bstok + '</td><td>&nbsp;Q' + hutr2bq + ' ' + hutr2btip + '</td></tr><tr><td>&nbsp;' + huodunisim + '</td><td>&nbsp;' + huodunstok + '</td><td>&nbsp;Q' + huodunq + ' ' + huoduntip + '</td></tr><tr><td>&nbsp;' + huel1disim + '</td><td>&nbsp;' + huel1dstok + '</td><td>&nbsp;Q' + huel1dq + ' ' + huel1dtip + '</td></tr><tr><td>&nbsp;' + huq2disim + '</td><td>&nbsp;' + huq2dstok + '</td><td>&nbsp;Q' + huq2dq + ' ' + huq2dtip + '</td></tr><tr><td>&nbsp;' + huruoilisim + '</td><td>&nbsp;' + huruoilstok + '</td><td>&nbsp;Q' + huruoilq + ' ' + huruoiltip + '</td></tr><tr><td>&nbsp;' + huruelmasisim + '</td><td>&nbsp;' + huruelmasstok + '</td><td>&nbsp;Q' + huruelmasq + ' ' + huruelmastip + '</td></tr></table></font></div>'+ 
'            <div id="tab_3_data" class="tab_content" style="display: none;"><a href="http://sites.google.com/site/halkuretim/"><img src="http://img231.imageshack.us/img231/2292/zlogo.jpg"></a><img src="http://img694.imageshack.us/img694/50/zlinkler.jpg"><a href="http://tinyurl.com/y8skuur"><img src="http://img98.imageshack.us/img98/306/saray002kayit.jpg"></a><a href="http://tinyurl.com/ya459ad"><img src="http://img444.imageshack.us/img444/5640/saray003ihtiyacistek.jpg"></a><a href="http://tinyurl.com/ykujexk"><img src="http://img444.imageshack.us/img444/5017/saray002iletisim.jpg"></a><a href="http://tinyurl.com/ybjwfas"><img src="http://img444.imageshack.us/img444/9582/saray003wellness.jpg"></a><a href="http://tinyurl.com/yjvtdup"><img src="http://img444.imageshack.us/img444/8884/saray002raporlar.jpg"></a><a href="http://tinyurl.com/ybcozoq"><img src="http://img63.imageshack.us/img63/9721/saray003retim.jpg"></a><a href="http://tinyurl.com/yle9tn7"><img src="http://img99.imageshack.us/img99/3009/saray002evbildirimi.jpg"></a><a href="http://tinyurl.com/yz58no5"><img src="http://img99.imageshack.us/img99/1124/saray003dagitim.jpg"></a><br><br><img src="http://img231.imageshack.us/img231/5720/zkayitformu.jpg"><iframe src="http://spreadsheets.google.com/embeddedform?key=0AvOUl5zFELLudFdqbkF4bmhTa1NQeFQwWDhLVGhBVkE" width="340" height="300" frameborder="1" marginheight="0" marginwidth="0">Loading...</iframe><div style="padding: 5px 0pt;"></div>'+ 
'                  </div>'+
'                  <script type="text/javascript">'+
'			tabsClass.addTabs("tabContainer");'+
'			</script>'
'        </tr>';

                      columna=document.getElementById('shouts');
                      contenedor = document.createElement("div");
                      contenedor.setAttribute('class', 'box');
                      contenedor.setAttribute('id', 'shouts');
                      contenedor.innerHTML = $box_str;
       
                      if(article_string.length) {   //Only insert if string is uncommented
                              columna.parentNode.insertBefore(contenedor, columna);
                      }
              }
      });

}
});

