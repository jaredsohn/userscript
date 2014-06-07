// Copyright (C) 2012-2014 by LOK-Soft Lars-Olof Krause http://lok-soft.net
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//
// ==UserScript==
// @name           GC GeoPostOffice
// @description    This Script marks known GPOs and adds the ability to add GPOs to the geopostoffice.com database 
// @namespace      LOK-Soft.net/GC
// @include        http://geopostoffice.com/*
// @include        http://*.geopostoffice.com/*
// @include        http://www.geocaching.com/geocache/GC*
// @include        http://www.geocaching.com/seek/cache_details.aspx*
// @include        http://www.geocaching.com/seek/nearest.aspx*
// @include        http://www.geocaching.com/bookmarks/view.aspx*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_log
// @grant          GM_registerMenuCommand
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @version        1.5
// ==/UserScript==

var GM_log=function(){}
//GM_log = unsafeWindow.console.log;

GM_log("start");

//DEBUG
//GM_registerMenuCommand('GC-GeoPostOffice - GetDataFromSite', getdatafromsite);
var type = "";
var gccode = "";


function initGPO(){
  if(document.getElementById('ctl00_divNotSignedIn')){
    GM_log("not logdin");
    return 0;
  }

  var datadate = GM_getValue('datadate','');
  var jetzt = new Date();
  var unixtime = Math.floor(jetzt.getTime() / 1000);
  GM_log("datacheck" + datadate + " - " + unixtime)
  if(datadate === undefined || datadate < (unixtime - 21600)){
    updatedata(datadate);
  }else{
    GM_registerMenuCommand('GC-GeoPostOffice - Get New Data', updatedata);
  }

  if(loc.indexOf("/geocache/GC") != -1 || loc.indexOf("/seek/cache_details") != -1){
    GM_log("detail-page");
    var page = document.getElementById('ctl00_divContentMain').innerHTML;
    if(page.indexOf('class="OldWarning"><li>This cache has been archived') != -1){
      GM_log("archived");
      page = "";
      return 0;
    }

    //Get Type
    type = document.getElementById('cacheDetails').getElementsByTagName('img')[0].title;
    var imgcont;
    switch(type){
      case "Traditional Cache":
        type = "T";
        imgcont = imgT;
      break;
      case "Letterbox Hybrid":
        type = "L";
        imgcont = imgL;
      break;
      case "Multi-cache":
        type = "M";
        imgcont = imgM;
      break;
      case "Unknown Cache":
        type = "X";
        imgcont = imgX;
      break;
      default:
        type = "";
        GM_log("wrong type");
    }
    GM_log("type: "+type);

    if(type != ""){
      gccode = document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode').firstChild.data;
      GM_log("gccode: " + gccode);
      var gpogccodes = GM_getValue('gpogccodes','')
      if(gpogccodes.indexOf(gccode + " ") != -1){
        GM_log("is GPO");
        var img = document.getElementById('cacheDetails').getElementsByTagName('img')[0];
        img.title = img.title + " - GeoPostOffice";
        img.alt = img.alt + " - GeoPostOffice";
        img.removeAttribute("width");
        img.src = "data:image/jpeg;base64,"+imgcont;
        GM_log("img data set");
        img.parentNode.href="http://geopostoffice.com";
        img.parentNode.title="GeoPostOffice";
        GM_log("link set");
      }else{
        GM_log("is no GPO");
        var gpolink = document.createElement("a");
        gpolink.id = "gpolink";
        gpolink.style.cssFloat = "left";
        gpolink.style.height = "15px";
        gpolink.style.paddingRight = "5px";
        gpolink.style.cursor = "pointer";

        var gpoaddimg = document.createElement("img");
        gpoaddimg.title = "Add as GeoPostOffice";
        gpoaddimg.alt = "Add as GeoPostOffice";
        gpoaddimg.src = "data:image/jpeg;base64,"+imgAdd;
        gpolink.appendChild(gpoaddimg);

        document.getElementById('cacheDetails').appendChild(gpolink);

        var element = document.getElementById('gpolink');
        if( element.addEventListener )
          element.addEventListener( 'click', getdatafromsite, false );
        else if( element.attachEvent )
          element.attachEvent( 'onclick', getdatafromsite );
        else
          document.onClick = getdatafromsite;
      }
    }
  }else if(loc.indexOf("/seek/nearest.aspx") != -1){
    GM_log("nearest-page");
    var rows = document.getElementById('ctl00_ContentBody_ResultsPanel').getElementsByTagName('table')[1].getElementsByTagName('tr');
    for(var i = 1; i<rows.length; i++){
    	var row = rows[i];
	    GM_log("row " + i);

    	//Retrieve GC-Code
    	gccode = getElementsByClass('small', getElementsByClass('Merge', row, 'td')[1], 'span')[0].firstChild.data.split('|')[1].replace (/^\s+/, '').replace (/\s+$/, '');
 	    GM_log("GC-Code: " + gccode);
 	    
        var gpogccodes = GM_getValue('gpogccodes','')
    	if(gpogccodes.indexOf(gccode + " ") != -1){
        	GM_log("is GPO");
        	//Check Type
	    	var img = getElementsByClass('SearchResultsWptType', row, 'img')[0];
	    	var typetitle = img.title;
	    	var imgcont;
		    switch(typetitle){
		      case "Traditional Cache":
		        type = "T";
		        imgcont = imgT;
		      break;
		      case "Letterbox Hybrid":
		        type = "L";
		        imgcont = imgL;
		      break;
		      case "Multi-cache":
		        type = "M";
		        imgcont = imgM;
		      break;
		      case "Unknown Cache":
		        type = "X";
		        imgcont = imgX;
		      break;
		      default:
		        type = "";
		        GM_log("wrong type");
		    }
		    //Replace image
	        img.title = img.title + " - GeoPostOffice";
	        img.alt = img.alt + " - GeoPostOffice";
	        img.src = "data:image/jpeg;base64,"+imgcont;
	        GM_log("img data set");
    	}
    }
  }else if(loc.indexOf("/bookmarks/view.aspx") != -1){
  	GM_log("bookmark-page");
  	var addCol = 0;
  	try {
  		if(document.getElementById('ctl00_ContentBody_lbHeading').getElementsByTagName('a')[0].title == 'Edit')addCol = 1;
  	}catch(e){}
  	
    var rows = document.getElementById('ctl00_divContentMain').getElementsByTagName('table')[0].getElementsByTagName('tr');

	for(var i = 1; i<rows.length; i+=2){
    	var row = rows[i];
	    GM_log("row " + i);
	    
	    var tableentries = row.getElementsByTagName('td');
    	//Retrieve GC-Code
		gccode = tableentries[2+addCol].getElementsByTagName('a')[0].firstChild.data.replace (/^\s+/, '').replace (/\s+$/, '')
 	    GM_log("GC-Code: " + gccode);
 	    
 	    var gpogccodes = GM_getValue('gpogccodes','')
    	if(gpogccodes.indexOf(gccode + " ") != -1){
        	GM_log("is GPO");
        	//Check Type
	    	var img = tableentries[3+addCol].getElementsByTagName('img')[0];
	    	var typetitle = img.alt;
	    	var imgcont;
		    switch(typetitle){
		      case "Traditional Cache":
		        type = "T";
		        imgcont = imgT;
		      break;
		      case "Letterbox Hybrid":
		        type = "L";
		        imgcont = imgL;
		      break;
		      case "Multi-cache":
		        type = "M";
		        imgcont = imgM;
		      break;
		      case "Unknown Cache":
		        type = "X";
		        imgcont = imgX;
		      break;
		      default:
		        type = "";
		        GM_log("wrong type");
		    }
		    //Replace image
	        img.alt = img.alt + " - GeoPostOffice";
	        img.src = "data:image/jpeg;base64,"+imgcont;
	        img.removeAttribute("height");
	        img.removeAttribute("width");
	        GM_log("img data set");
    	}

 	}
  }
}

function getElementsByClass(classname, startelement, tagname){
  if(startelement === undefined)startelement = document;
  if(tagname === undefined)tagname = '*';
  var result = new Array();
  var all_elements = startelement.getElementsByTagName(tagname);

  for(var i=0; i<all_elements.length;i++){
  	var elemclasses = all_elements[i].className.split(' ');
    if(in_array(classname, elemclasses)){
      result.push(all_elements[i]);
    }
  }

  return result;
}

function in_array(search,arr){
  for(var i=0; i<arr.length;i++) if(arr[i] == search) return true;
  return false;
}


function updatedata(datadate){
  GM_log("updatedata");
  GM_xmlhttpRequest({
    method: 'GET',
    url: "http://geopostoffice.com/gm/data.php?date="+parseInt(datadate),
    onload:function(results){
      GM_log( results.responseText );
      processupdate(results.responseText);
    }
  });
}

function processupdate(data){
  var dataarr = data.split(',');
  GM_log(dataarr[0]);
  GM_setValue('datadate', dataarr.shift());
  GM_setValue('gpogccodes', dataarr.join(","));
  delete dataarr;
}


function getdatafromsite(){
  GM_log("get data from site");

//Get Name
    var name = document.getElementById('ctl00_ContentBody_CacheName').firstChild.data;
    GM_log("name:" + name);

//Get Difficulty
    var d = document.getElementById('ctl00_ContentBody_uxLegendScale').getElementsByTagName('img')[0].alt.split(' ')[0];
    GM_log("d:" + d);

//Get Terrain
    var t = document.getElementById('ctl00_ContentBody_Localize12').getElementsByTagName('img')[0].alt.split(' ')[0];
    GM_log("t:" + t);

//Get Size
    var size = document.getElementById('ctl00_ContentBody_size').getElementsByTagName('small')[0].firstChild.data;
    if(size == "")size = document.getElementById('ctl00_ContentBody_Localize12').parentNode.nextSibling.nextSibling.getElementsByTagName('small')[0].firstChild.data;
    GM_log("readout-size:" + size);
    switch(size.toLowerCase()){
      case "(micro)":
        size = "M";
      break;
      case "(small)":
        size = "S";
      break;
      case "(regular)":
        size = "R";
      break;
      case "(large)":
        size = "L";
      break;
      case "(other)":
        size = "U";
      break;
      default:
        size = "";
    }
    GM_log("size:" + size);

//Get Coordinates
    var latlng = document.getElementById('uxLatLon').innerHTML.substring(0,26);
    GM_log("latlng" + latlng);
    var lat = latlng.substr(0,12);
    var lng = latlng.substr(13,26);
    delete latlng;
    var latdeg = parseInt(lat.substr(2,2),10) + (parseFloat(lat.substr(6)) / 60);
    if(lat.substr(0,1) == "S")latdeg = latdeg * -1;
    var lngdeg = parseInt(lng.substr(2,3),10) + (parseFloat(lng.substr(7)) / 60);
    if(lng.substr(0,1) == "W")lngdeg = lngdeg * -1;
    latdeg = Math.round(latdeg*1000000)/1000000; //auf 6 Nachkommastellen runden
    lngdeg = Math.round(lngdeg*1000000)/1000000;
    GM_log("lat: " + latdeg + " lng: " + lngdeg);
    delete lat;
    delete lng;

//Get Country, Area
	var posstr = document.getElementById('ctl00_ContentBody_Location').firstChild.data;
    if(posstr.length < 7)posstr = "In " + document.getElementById('ctl00_ContentBody_Location').getElementsByTagName('a')[0].firstChild.data;
    var pos = posstr.split(',');
    if(pos[1]){
      var country = pos[1].substring(1);
      var area = pos[0].substring(3);
    }else{
      var country = pos[0].substring(3);
      var area = "";
    }
    delete pos;
    GM_log("country: " + country + " area: " + area);

    sendtosystem(gccode, name, type, size, d, t, country, area, latdeg, lngdeg);

}

  //N 50° 06.830 E 008° 40.955
  //50 + 6,83 / 60    if S: *-1
  //8 + 40,955 / 60   if W: *-1

function sendtosystem(gccode, name, type, size, d, t, country, area, lat, lng){
  var data = "gccode="+ encodeURIComponent(gccode) +"&name="+ encodeURIComponent(name) +"&type="+ encodeURIComponent(type) +"&size="+encodeURIComponent(size)+"&d="+encodeURIComponent(d)+"&t="+encodeURIComponent(t)+"&country="+encodeURIComponent(country)+"&area="+encodeURIComponent(area)+"&lat="+ encodeURIComponent(lat) +"&lng="+encodeURIComponent(lng)+"&submit=submit";

if(GM_getValue('gpoadmin', '').length > 10)data = data + "&acc="+encodeURIComponent(GM_getValue('gpoadmin',''));

  GM_log(data);

  GM_xmlhttpRequest({
    method: 'POST',
    url: "http://geopostoffice.com/po.php?add=1",
    headers: {'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'},
    data: data,
    onload:function(results){
      GM_log(results.responseText);
      if(results.responseText.indexOf("<!--SUCCESS-->") != -1){
        document.getElementById('gpolink').innerHTML = "added as GPO";
      }else if(results.responseText.indexOf("<!--EXISTS-->") != -1){
        document.getElementById('gpolink').innerHTML = "Cache is already reported as GPO";
        updatedata();
      }else if(results.responseText.indexOf("<!--CONTINENT-->") != -1){
        document.getElementById('gpolink').innerHTML = "Continent could not be allocated";
      }else{
        document.getElementById('gpolink').innerHTML = "undefined Error";
        GM_log(results.responseText);
      }
    }
  });
}


var adminlink = document.createElement("a");
adminlink.style.display = "none";
adminlink.id = "gpoadmin";
var adminlinktxt = document.createTextNode(".");
adminlink.appendChild(adminlinktxt);
document.getElementsByTagName('body')[0].appendChild(adminlink);
var element = document.getElementById('gpoadmin');
if( element.addEventListener )
  element.addEventListener( 'click', adminpass, false );
else if( element.attachEvent )
  element.attachEvent( 'onclick', adminpass );
else
  document.onClick = adminpass;

function adminpass(){
  GM_log("addAdminPass");
  var pass_promt = prompt('Please enter adminpassword');
  if(pass_promt){
    GM_setValue('gpoadmin', pass_promt);
  }
}


//Definining Base64-Images
var imgL = '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';

var imgT = "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";

var imgM = "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";

var imgX = "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";

var imgAdd = "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";


//Script for changes on geopostoffice.com
function initHome(){
  if(loc.indexOf("po.php?add=1&gccode=") != -1){
    var gccodebox = document.getElementById('name');
    gccodebox.setAttribute("disabled", "disabled");
    gccodebox.value = "please use Greasemonkey-Script at gc.com to add a GPO";
    gccodebox.style.width = "350px";
    gccodebox.id = "usegm";
  }

  var gmnotice = document.getElementById('gmnotice');
  if(gmnotice)gmnotice.parentNode.removeChild(gmnotice);
  var gmstar = document.getElementById('gmstar');
  if(gmstar) gmstar.parentNode.removeChild(gmstar);
}





//Init System
var loc = String(document.location);
if(loc.indexOf("geocaching.com") != -1)
  initGPO();
else if(loc.indexOf("geopostoffice.com") != -1)
  initHome();


//Update Check by Jarett (http://userscripts.org/scripts/show/20145)
var SUC_script_num = 106066; // Change this to the number given to the script by userscripts.org (check the address bar)

 GM_registerMenuCommand('GC GeoPostOffice - Check for Updates', function(){updateCheck(true);});


try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}

	updateCheck(false);
}
catch(err)
{}