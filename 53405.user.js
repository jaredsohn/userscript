// ==UserScript==
// @name           Alliance Gathering (v1.0)
// @description    Allows for the gathering of information for alliance web sites to process for intel
// @include        http://*.ikariam.com/index.php?view=diplomacyAdvisorAlly
// @include	   http://*.ikariam.com/*embassyGeneralAttacksFromAlly*
// @include	   http://*.ikariam.com/*embassyGeneralAttacksToAlly* 
// @include	   http://*.ikariam.com/index.php?view=island*
// @include	   http://*.ikariam.com/index.php?view=options
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// author: none
// contact: none

var loc = document.location + "";
var version = "1.0";
var server = document.location.toString().split('/')[2];
var alliance_server = GM_getValue('alliance_server'+server,"");
var alliance_user = GM_getValue('alliance_user'+server,"");
var alliance_pass = GM_getValue('alliance_pass'+server,"");

var post_general_info = "";
var post_alliance_info = "";
var post_island_info = "";

var output = function(text) {
	var li = document.createElement("li");
	li.className = "help";
	li.innerHTML = "<a><span class='textLabel'>Output from Server: " + text + "</span></a>";
	var liList = document.getElementsByTagName("li");
	for(var i=0;i<liList.length;i++) {
               if(liList[i].className=='help') {
               		liList[i].parentNode.appendChild(li);
			break;			
	       }
	}	
	body[0].insertBefore(div,body[0].lastChild);
}

var getLoginInfo = function() {

	return "login=" + encodeData(alliance_user) + "&pass=" + encodeData(alliance_pass); 

}

var encodeData = function(data) {
        data = encodeURIComponent(data);
	data = data.replace(/\+/g,'%2B');
	data = data.replace(/%20/g,'+');
	return data;
}	

var processCity = function(li) {

	var aList = li.getElementsByTagName("a");
        var cityData = "<city>";
        for(var i=0;i<aList.length;i++) {
		var a = aList.item(i);
		if(a.id.indexOf("city_")!=-1) {
                        var cityId = a.id.split("_");
			cityData = cityData + '<id>' + cityId[1] + '</id><nameData>' + a.innerHTML + '</nameData>'; 	
		} else if(a.href.indexOf("allyId")!=-1 &&a.className.indexOf("messageSend")==-1) {
                        var tmp = a.href.split("allyId=");
			var allyId = tmp[1].split("&");
			cityData = cityData + '<allyId>' + allyId[0] + '</allyId><allyName>' + a.innerHTML + '</allyName>'; 
		}
	}
	return cityData + "</city>";

}	

var hasRequiredInfo = false;

if(alliance_server 
	&& alliance_user 
	&& alliance_pass 
	&& alliance_server.length!=0
	&& alliance_user.length!=0 
	&& alliance_pass.length!=0) {
	
	hasRequiredInfo = true;
}	

	
if(hasRequiredInfo && loc.indexOf("embassyGeneralAttacksToAlly")!=-1) {
        view = "incoming";
} else if(hasRequiredInfo && loc.indexOf("embassyGeneralAttacksFromAlly")!=-1) {
	view = "outgoing";
} else if(hasRequiredInfo && loc.indexOf("diplomacyAdvisorAlly")!=-1) {
	view = "alliance";
} else if(hasRequiredInfo && loc.indexOf("view=island")!=-1) {
	view = "island";
} else if(loc.indexOf("view=options")!=-1) {
	view = "options";
} else {
	view = "nopage";
}

if(view == "outgoing" || view == "incoming") {

	var list = document.getElementsByTagName("div");
	var dataa = "";

	for(var i=0;i<list.length;i++) {
		var cl = list.item(i).className;
		if(cl.lastIndexOf("contentBox01h")>-1) {
			dataa = list.item(i).innerHTML;
			break;
		}
	}

	if(dataa.length!=0) {

		dataa = encodeData(dataa);
	
		GM_xmlhttpRequest({
		  method: "POST",
	  	  url: alliance_server+post_general_info,
	  	  data: getLoginInfo() + "&version=" + version + "&view=" + view + "&data=" + dataa,
	 	  headers: {
	    	    "Content-Type": "application/x-www-form-urlencoded"
	  	  },
	  	  onload: function(response) {
		     output(response.responseText);
		  }
		});
	}
} else if(view == "alliance") {

	var data = "";
	var aList = document.getElementsByTagName("a");
        for(var i=0;i<aList.length;i++) {
		var a = aList.item(i);
		if(a.className.indexOf("city")!=-1) {
			data = data + '<a href="' + a.href + '" class="' + a.className + '">' + a.innerHTML + '</a>'; 	
		}
	}

	if(data.length!=0) {

		data = encodeData(data);
	
		GM_xmlhttpRequest({
		  method: "POST",
	  	  url: alliance_server+post_alliance_info,
	  	  data: getLoginInfo() + "&version=" + version + "&view=" + view + "&data=" + data,
	 	  headers: {
	    	    "Content-Type": "application/x-www-form-urlencoded"
	  	  },
	  	  onload: function(response) {
		     output(response.responseText);
		  }
		});
	} 	
} else if (view == "island") {       
 	var data = "<island>";

	data = data + "<coords>";

	var spanList = document.getElementsByTagName("span");

	for(var i=0;i<spanList.length;i++) {
        	var span = spanList.item(i);
		if(span.className == "island") {
                	var spl = span.innerHTML.split("[");
			var coords = spl[1].split(":");
			data = data + "<x>" + coords[0] + "</x><y>" + coords[1].substring(0,coords[1].length-1) + "</y>"
			break;
		}
	}

        data = data + "</coords><cities>";

        var cities = document.getElementById("cities");
	var liList = cities.getElementsByTagName("li");
        for(var i=0;i<liList.length;i++) {
		var li = liList.item(i);
		if(li.className.indexOf(" city ")!=-1) {
                	data = data + processCity(li);
		}
	}


	data = data + "</cities></island>";

	if(data.length!=0) {

	        data = encodeData(data);
	
		GM_xmlhttpRequest({
		  method: "POST",
	  	  url: alliance_server+post_island_info,
	  	  data: getLoginInfo() + "&version=" + version + "&view=" + view + "&data=" + data,
	 	  headers: {
	    	    "Content-Type": "application/x-www-form-urlencoded"
	  	  },
	  	  onload: function(response) {
		     output(response.responseText);
		  }
		});
	}	
} else if(view == "options") {
        var div = document.createElement("div");
        div.style.textAlign = "center";
	var content = "<h3>Alliance Gathering Information:</h3>";
	content += "Alliance Server:<input id='alliance_server' name='alliance_server' type='text' value='"+alliance_server+"'/><br/>";
	content += "Alliance Username:<input id='alliance_user' name='alliance_user' type='text' value='"+alliance_user+"'/><br/>";
	content += "Alliance Password:<input id='alliance_pass' name='alliance_pass' type='password' value='"+alliance_pass+"'/><br/>";
	content += "<input id='alliance_button' class='button' value='Save Alliance Gathering Information' type='button'>";
        div.innerHTML = content;
	var debug = document.getElementById("options_debug");
	debug.parentNode.insertBefore(div,debug);
	document.getElementById("alliance_button").addEventListener("click", function(event) {

		alliance_server = document.getElementById('alliance_server').value; 
		alliance_user = document.getElementById('alliance_user').value;
		alliance_pass = document.getElementById('alliance_pass').value;
    		
		GM_setValue('alliance_server'+server,alliance_server);
		GM_setValue('alliance_user'+server,alliance_user);
		GM_setValue('alliance_pass'+server,alliance_pass);  

    		event.stopPropagation();
    		event.preventDefault();
	}, true);
	
}
