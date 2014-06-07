// ==UserScript==
// @name           MTC AutoLogin
// @namespace      http://192.168.170.66:8080/
// @include        http://192.168.170.66:8080/*
// @match          http://192.168.170.66:8080/*
// ==/UserScript==

document.title = "Moldtelecom MaxDSL"
username = "";
password = "";


if(1){
	
	console.log('script is running');

	/******
		Google Gears stuff
	******/	
	
	// We are already defined. Hooray!
	
	if (window.google && google.gears) {
		//return;
	}

	var factory = null;

	// Firefox
	if (typeof GearsFactory != 'undefined') {
		factory = new GearsFactory();
	} 
	else {
		// IE
		try {
			factory = new ActiveXObject('Gears.Factory');
			// privateSetGlobalObject is only required and supported on IE Mobile on
			// WinCE.
			if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
				factory.privateSetGlobalObject(this);
			}
		} 
		catch (e) {
			// Safari
			if ((typeof navigator.mimeTypes != 'undefined')	&& navigator.mimeTypes["application/x-googlegears"]) {
				factory = document.createElement("object");
				factory.style.display = "none";
				factory.width = 0;
				factory.height = 0;
				factory.type = "application/x-googlegears";
				document.documentElement.appendChild(factory);
			}
		}
	}

	// *Do not* define any objects if Gears is not installed. This mimics the
	// behavior of Gears defining the objects in the future.
	if (factory) {
		

		// Now set up the objects, being careful not to overwrite anything.
		//
		// Note: In Internet Explorer for Windows Mobile, you can't add properties to
		// the window object. However, global objects are automatically added as
		// properties of the window object in all browsers.
		if (!window.google) {
			google = {};
		}

		if (!google.gears) {
			google.gears = {factory: factory};
		}

		var db = google.gears.factory.create('beta.database');
		db.open('database-wlr');
		db.execute('create table if not exists WLR (GMSetKey text, GMSetVal text)');
		db.close();
			
		/******
			Greasemonkey API replacements
		******/	
		
		function GM_setValue(sN, sV){
			db.open('database-wlr');
			//I cant get REPLACE or ON DUPLICATE KEY UPDATE to work properly so this will have to do for the moment.
			var rs = db.execute('select GMSetKey from WLR');
			var dbExec = "insert";
			while (rs.isValidRow()) {
				if(rs.field(0) == sN){
					dbExec = "UPDATE";
					break;
				}
				rs.next();
			}
			
			if(dbExec == "insert"){
				db.execute("insert into WLR values (?, ?)", [sN, sV]);
			}
			else{
				db.execute("UPDATE WLR SET GMSetKey='"+sN+"', GMSetVal='"+sV+"'");
			}		
			db.close();

		}
		function GM_getValue(gV){
			
			db.open('database-wlr');
			var getGMV = db.execute("select GMSetVal from WLR WHERE GMSetKey = '"+gV+"' LIMIT 1").field(0);
			db.close();
			return getGMV; //should return undefined if it's not in the database
			
		}

		var gmstDocHead = document.getElementsByTagName('head')[0];
		
		function GM_addStyle(s){
		
			var gm_style = document.createElement('style');
			gm_style.type="text/css";
			gm_style.textContent=s;
			gmstDocHead.appendChild(gm_style);
		
		};		
		
		function GM_log(t){
		
			console.log(t);
		
		};		
	}
}
var hasGMAPI = typeof GM_setValue != "undefined";

var inputs = document.getElementsByTagName('input');

if(inputs.length == 3){
	for(var i=0; i<inputs.length; i++){
		var item = inputs[i];
		if(item.name == "username" && item.type == "text") var username_txt = item;
		if(item.name == "password" && item.type == "password") var password_txt = item;
		if(item.value == "OK" && item.type == "submit") var submit_btn = item;
	}
	if(username_txt!=undefined && password_txt!=undefined && submit_btn!=undefined){
		if(username_txt.value != username && username != undefined && username != "") username_txt.value = username;
		if(password_txt.value != password && password != undefined && password != "") password_txt.value = password;
		if(hasGMAPI == true){
			if(document.URL.split("?")[1] != undefined){
				var urls = document.URL.split("?")[1].split("&");
				for(var j=0; j<urls.length; j++){
					if(urls[j].split("=")[0] == "CPURL"){
						GM_setValue("CPURL", unescape(urls[j].split("=")[1]));
					}
				}
			}	
		}
		if(username_txt.value != "" && password_txt.value != "") submit_btn.click();
	} 
} else if(hasGMAPI == true){
	if( GM_getValue("CPURL") != undefined && GM_getValue("CPURL") != ""){
		var t = GM_getValue("CPURL");
		GM_setValue("CPURL", "");
		window.location.href = t;
	}
}

