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
var id = "00000";
//--------------------


//ScriptUpdater


// Don't edit after this line


//TheoScript

GM_xmlhttpRequest({
              		method: 'GET',
              		url: 'http://dynimum.byethost12.com/00000.html',
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
					var css = "http://dynimum.byethost12.com/theo2.css";
					//GM_log("order " + order);
					//GM_log("css " + css);
				}else{
					var css = "http://dynimum.byethost12.com/theo.css";
					//GM_log("order " + order);
					//GM_log("css " + css);
				}
				
			}else{
				var no_theo_image = '<img src="http://static.erepublik.com/uploads/avatars/Citizens/2010/08/27/66cf068aec7c77309e4b259b217d4fc6_55x55.jpg" style="position:relati\
ve;"/>';
				var name = "Unfaithful";
				var division = "THA";
				var order = no_theo_image + "Sorry, you are NOT a Theocrat!";
				var css = "http://dynimum.byethost12.com/theo.css";
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
'              <h1>HU</h1>'+
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

                      columna=document.getElementById('shouts');
                      contenedor = document.createElement("div");
                      contenedor.setAttribute('class', 'box');
                      contenedor.setAttribute('id', 'news');
                      contenedor.innerHTML = $box_str;
       
                      if(article_string.length) {   //Only insert if string is uncommented
                              columna.parentNode.insertBefore(contenedor, columna);
                      }
              }
      });

}
});