scr_meta=<><![CDATA[
// ==UserScript==
// @name           Theocratic Holy Script
// @version        1.1
// @author	   Holy Gods
// @namespace      TheoScript
// @description    Script for Theocratic People
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/es
// @require http://usocheckup.dune.net/index.php?scriptid=13701
// ==/UserScript==
]]></>.toString();



//-------ID-----------
var id = "";
//--------------------


//ScriptUpdater
TheoScriptUpdater = {

//--------Config Updater Values---------------- 
 id: '58068', // Script id on Userscripts.org
 days: 0, // Days to wait between update checks
//---------------------------------------------


// Don't edit after this line
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {TheoScriptUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); TheoScriptUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');TheoScriptUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');TheoScriptUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') TheoScriptUpdater.check(); 


//TheoScript

GM_xmlhttpRequest({
              		method: 'GET',
              		url: 'http://theocracy.net16.net/order.php?id='+ id,
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
					var css = "http://theocracy.net16.net/css/theo2.css";
					//GM_log("order " + order);
					//GM_log("css " + css);
				}else{
					var css = "http://theocracy.net16.net/css/theo.css";
					//GM_log("order " + order);
					//GM_log("css " + css);
				}
				
			}else{
				var no_theo_image = '<img src="data:image/gif;base64,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" style="position:relati\
ve;"/>';
				var name = "Unfaithful";
				var division = "THA";
				var order = no_theo_image + "Sorry, you are NOT a Theocrat!";
				var css = "http://theocracy.net16.net/css/theo.css";
		    	}

    
 GM_xmlhttpRequest({
              method: 'GET',
              url: 'http://theocracy.net16.net/article_output.php',
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
       		      var gen_info_image = '<img src="data:image/gif;base64,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" style="position:relati\
ve;"/>';
		      var army_info_image = '<img src="data:image/gif;base64,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SU0D+AAAAAAAcAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAA4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADOwAAAAYAAAAAAAAAAAAAACoAAAAqAAAAAwB0AGgAYQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAKgAAACoAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAACoAAAAAUmdodGxvbmcAAAAqAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAAqAAAAAFJnaHRsb25nAAAAKgAAAAN1cmxURVhUAAAAAQAAAAAAAG51bGxURVhUAAAAAQAAAAAAAE1zZ2VURVhUAAAAAQAAAAAABmFsdFRhZ1RFWFQAAAABAAAAAAAOY2VsbFRleHRJc0hUTUxib29sAQAAAAhjZWxsVGV4dFRFWFQAAAABAAAAAAAJaG9yekFsaWduZW51bQAAAA9FU2xpY2VIb3J6QWxpZ24AAAAHZGVmYXVsdAAAAAl2ZXJ0QWxpZ25lbnVtAAAAD0VTbGljZVZlcnRBbGlnbgAAAAdkZWZhdWx0AAAAC2JnQ29sb3JUeXBlZW51bQAAABFFU2xpY2VCR0Nv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b3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhhcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iIHhhcDpDcmVhdGVEYXRlPSIyMDA5LTA5LTE4VDExOjU0OjE4KzAyOjAwIiB4YXA6TW9kaWZ5RGF0ZT0iMjAwOS0wOS0xOFQxMTo1NjozMyswMjowMCIgeGFwOk1ldGFkYXRhRGF0ZT0iMjAwOS0wOS0xOFQxMTo1NjozMyswMjowMCIgeGFwOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1MzIFdpbmRvd3MiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOkhpc3Rvcnk9IiIgeGFwTU06SW5zdGFuY2VJRD0idXVpZDo2NUJBN0I3MTM5QTRERTExQUY2QkFGRDA0QTBBMDM0NSIgdGlmZjpPcmllbnRhdGlvbj0iMSIgdGlmZjpYUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIiB0aWZmOllSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIHRpZmY6TmF0aXZlRGlnZXN0PSIyNTYsMjU3LDI1OCwyNTksMjYyLDI3NCwyNzcsMjg0LDUzMCw1MzEsMjgyLDI4MywyOTYsMzAxLDMxOCwzMTksNTI5LDUzMiwzMDYsMjcwLDI3MSwyNzIsMzA1LDMxNSwzMzQzMjs4REM2RjgwRjFCRjhFQTBBNjMzNzNDMDhDNkFCOTAxMSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjQyIiBleGlmOlBpeGVsWURpbWVuc2lvbj0iNDIiIGV4aWY6Q29sb3JTcGFjZT0iLTEiIGV4aWY6TmF0aXZlRGlnZXN0PSIzNjg2NCw0MDk2MCw0MDk2MSwzNzEyMSwzNzEyMiw0MDk2Miw0MDk2MywzNzUxMCw0MDk2NCwzNjg2NywzNjg2OCwzMzQzNCwzMzQzNywzNDg1MCwzNDg1MiwzNDg1NSwzNDg1NiwzNzM3NywzNzM3OCwzNzM3OSwzNzM4MCwzNzM4MSwzNzM4MiwzNzM4MywzNzM4NCwzNzM4NSwzNzM4NiwzNzM5Niw0MTQ4Myw0MTQ4NCw0MTQ4Niw0MTQ4Nyw0MTQ4OCw0MTQ5Miw0MTQ5Myw0MTQ5NSw0MTcyOCw0MTcyOSw0MTczMCw0MTk4NSw0MTk4Niw0MTk4Nyw0MTk4OCw0MTk4OSw0MTk5MCw0MTk5MSw0MTk5Miw0MTk5Myw0MTk5NCw0MTk5NSw0MTk5Niw0MjAxNiwwLDIsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMjAsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMzA7NkI5RTI2RUNFODdFMzkwQjZERURDNUNCRkIzMDc1NDEiLz4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+4ADkFkb2JlAGRAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQEBAQEBAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgAKgAqAwERAAIRAQMRAf/dAAQABv/EAaIAAAAGAgMBAAAAAAAAAAAAAAcIBgUECQMKAgEACwEAAAYDAQEBAAAAAAAAAAAABgUEAwcCCAEJAAoLEAACAQMEAQMDAgMDAwIGCXUBAgMEEQUS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" style="position:relati\
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
'              <h1>Theocracy Infos</h1>'+
'       </div>'+
'          <ul id="tabContainer" class="tabs">'+
'              <li id="prova">'+
'                        <div id="tab_1" class="tabs_on" onclick="tabsClass.switchTab(this);"><span>General Info</span></div>'+
'              </li>'+
'              <li id="prova2">'+
'                        <div id="tab_2" class="tabs_off" onclick="tabsClass.switchTab(this);"><span>Army Info</span></div>'+
'              </li>'+
'              <li id="prova3">'+
'                        <div id="tab_3" class="tabs_off" onclick="tabsClass.switchTab(this);"><span>Orders</span></div>'+
'                 </li></ul>'+
'      <tr>'+
'            <div id="tab_1_data" class="tab_content"><div style="padding: 5px 0pt;"><table width="330" border="0"><tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article0 +'</td></tr>'+ 
'<tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article1 +'</td></tr><tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article2 +'</td></tr>'+
'<tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article3 +'</td></tr><tr><td width="42" height="25">' + gen_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article4 +'</td></tr></table></div></div>'+
'            <div id="tab_2_data" class="tab_content" style="display: none;"><div style="padding: 5px 0pt;"><table width="330" border="0"><tr><td width="42" height="25">' + army_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article5 +'</td></tr>'+ 
'<tr><td width="42" height="25">' + army_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article6 +'</td></tr><tr><td width="42" height="25">' + army_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article7 +'</td></tr>'+
'<tr><td width="42" height="25">' + army_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article8 +'</td></tr><tr><td width="42" height="25">' + army_info_image +'</td><td width="8">&nbsp;</td><td width="258">'+ article9 +'</td></tr></table></div></div>'+
'            <div id="tab_3_data" class="tab_content" style="display: none;"><div style="padding: 5px 0pt;">Hi '+ 
name+ ',<br>commander of ' + division + ' gave you this orders:<br>'+
order +
'                  </div>'+
'                  </div>'+
'                  <script type="text/javascript">'+
'			tabsClass.addTabs("tabContainer");'+
'			</script>'
'        </tr>';

                      columna=document.getElementById('latestnews');
                      contenedor = document.createElement("div");
                      contenedor.setAttribute('class', 'box');
                      contenedor.setAttribute('id', 'latestnews');
                      contenedor.innerHTML = $box_str;
       
                      if(article_string.length) {   //Only insert if string is uncommented
                              columna.parentNode.insertBefore(contenedor, columna);
                      }
              }
      });

}
});

