// updated by raptorMAX
// ==UserScript==
// @name           cometfinder
// @description    find comet on imperion
// @include        http://*.imperion.*/map*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @version 1.1.2
// @svc:version    [1.1.2]
// ==/UserScript==


// estract data info
user = unsafeWindow.uiData;
// estract map info
var recyclerCapacity=3900;
var preload=new Array();
var sid=user.current_planet.id_System;
function mapinfo() {
	$.ajax({
		url : "/map/index/preload/",
		data : "systemId=" + sid + "&planetId="+ user.current_planet.id_planet,
		type : "post",
		dataType : "json",
		success : function(data) {
			pr = data[0].data;
			ids = "";
			i=0;
			for ( var key in pr) {
				preload[i]= key;
				i++
			}
			ids = ids.substr(0, ids.length - 1);
			findC();

		}
	});
}

//                      menu command
GM_registerMenuCommand("find comet on system by id",menufind);

function menufind() {
	sid=prompt("insert SystemId:");
	max.id=0;
	max.val=0;
	mapinfo();
}

$("#Imperion-Template-InterfaceMapShowLegend").click(mapinfo);
$('body').append('<div id="area" style="display:none;top: 800px; left: 350px; width: 900px; border: 1px solid black; height: 150px; position: absolute; z-index: 1000; text-align: left; overflow: auto; background: none repeat scroll 0% 0% white;">Comets:\n</div>');
$('body').append('<button id="bottone" style="display:none;top: 780px; left: 1000px; position: absolute; z-index: 1001;">attendi</button>');
$('#bottone').click(function() {
	$('#area').hide();
	$('#bottone').hide();
});
var max = new Object;
max.id=0;
max.val=0;
var num=0;
var text2="<br/><br/>Debris:";
function findC() {
	j = 0;
	$('#area').show();
	$('#area').html("systemscans: "+preload.length );
	$('#bottone').show();
	$('#bottone').text("wait");
    num=0;
	for (i = 0; i < preload.length; i++) {
	 
		$.ajax({
		  
			url : "/map/index/system/",
			data : "systemId=" + preload[i] + "&planetId="+ user.current_planet.id_planet,
			type : "post",
			dataType : "json",
			success : function(data) {
				if ((typeof (data[0].data.comets) != 'undefined')					&& (data[0].data.comets != '')) {
					text = '<br /><br />system:<a href="/map/index/index/stage/ORB/targetPlanetId/'+data[0].data.id_system+'01" style="color:black;text-decoration: underline;">' + data[0].data.id_system + "</a> ";
					for ( var key in data[0].data.comets) {
					   num=num+1;
                        
                        value = data[0].data.comets[key];
                        slotnumber=5-value.map_info.slots.length;
                        
						text += '<br /> comet: <a href="/map/index/index/stage/ORB/targetCometId/' + key+'" style="color:blue;text-decoration: underline;">'+key+ "</a> " ;
						text += "  free slots: " + slotnumber ;
                        
                  
						tot = value.crystal * 1 + value.metal * 1 + value.tritium * 1;
						if (max.val<tot) {
							max.id=key;
							max.val=tot;

						}
                        text+= ' metal:<span style="color:#a9522f;"> '+value.metal * 1+"</span> "+'crystal:<span style="color:#249f20;"> '+value.crystal * 1+"</span> "+'tritium:<span style="color:#1137b4;"> '+value.tritium * 1+"</span> ";
						text += ' recycler: <span style="color:blue;">' + Math.ceil(tot*1 / recyclerCapacity*1)+ "</span>";

					}
					//text += "]";
					$('#area').html($('#area').html() + text);
				}
				// @todo modificare

				
                    if ((typeof (data[0].data.planets) != 'undefined')	&& (data[0].data.planets != '')) {
                	for ( var keys in data[0].data.planets) {
                     value = data[0].data.planets[keys].debris;
                   //  text+=value;
                     if(value!=undefined ){
                      // text2+='<br/><span style="color:black;">debrisfields';
                      tot = value.crystal * 1 + value.metal * 1 + value.tritium * 1;
                     text2+= '<br />Debris-Planet: <a href="/map/index/index/stage/ORB/targetPlanetId/'+data[0].data.planets[keys].id_planet+'" style="color:black;text-decoration: underline;">' + data[0].data.planets[keys].id_planet + "</a> ";   
                        text2+= ' metal:<span style="color:#a9522f;"> '+value.metal * 1+"</span> "+'crystal:<span style="color:#249f20;"> '+value.crystal * 1+"</span> "+'tritium:<span style="color:#1137b4;"> '+value.tritium * 1+"</span> ";
                      	text2 += ' recycler: <span style="color:blue;">' + Math.ceil(tot*1 / recyclerCapacity*1)+ "</span>";
                    }
                    }
                 	
                }
				 

				//*/
				j++;
				if (j >= preload.length) end();
			}
		});
	}
}
function end() {
	text=$('#area').html();
//	text=text.replace(max.id,'<span style="color:green;">'+max.id+'</span>');
	$('#area').html(text);
    
     $('#area').html($('#area').html() + text2);
	$('#bottone').html("close");

}

//****************version check *****


var SVC = {
	currentVersion: "1.1.2", // Needed to compare working version with the download version at userscript.org
	scriptName: "cometfinder", // Used in the message to users of any version changes to the script
	scriptNum: 100644, // Needed to connect to the download page at userscript.org
	
	// GLOBAL SETTINGS
	currentDate: null, userRequestCheck: null, timer: null,
	
	init: function () {
		SVC.currentDate = new Date();
		var cv = parseInt(/[1-9][\d]*/.exec(SVC.currentVersion.replace(/\D/g, "")));

		// INITIALIZE LOCAL VALUES (FOR FIRST-TIME USE)
		if (!GM_getValue("latest")) GM_setValue("latest", cv );
		if (!GM_getValue("notified")) GM_setValue("notified", false);
		if (!GM_getValue("lastChecked")) GM_setValue("lastChecked", (SVC.currentDate.getTime() - 1000*60*60*25) + "");
		
		// UPDATE LOCAL VALUES (FOR FIRST-TIME USE AFTER REINSTALL NEWER VERSION)
		if (GM_getValue("latest") < cv) {
			GM_setValue("latest", cv);
			GM_setValue("notified", false);
			GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
		}
	},
	verify: function () {
		SVC.userRequestCheck = false;
		var sp = SVC.currentDate.getTime() - parseInt(GM_getValue("lastChecked"));
		
		// CHECK SOURCE IF USER HAS BEEN NOTIFIED OF AN UPDATED VERSION BEFORE AND 14 DAYS HAVE PASSED
		if (GM_getValue("notified") && (sp / (1000*60*60*24) > 14)) SVC.getInfo();
			
		// CHECK SOURCE FOR THE LATEST VERSION IF ONE DAY HAS PASSED SINCE LAST CHECKED
		if (!GM_getValue("notified") && ( sp / (1000*60*60*24) > 1 )) SVC.getInfo();
	},
	getInfo: function () {	
		var uso = 'http://userscripts.org';
		function retrieve(url, re, count) {
			SVC.xhr.get(url, function (status, text) {
				window.clearTimeout(SVC.timer);
				if (status == 404 && SVC.userRequestCheck) SVC.manualErrorMsg();
				if (status == 200) {
					if (re.test(text)) var uv = re.exec(text)[1];
					if (uv) SVC.compare(uv);
					if (!uv && count == 1) {
						retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
					} else if (!uv && SVC.userRequestCheck) {
						SVC.manualErrorMsg();
					}
				}
			});
			SVC.timer = setTimeout(function () { 
				if (count == 1) retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
				if (count == 2) 
					if (SVC.userRequestCheck) SVC.manualErrorMsg(); // *new in v0.3.0* notify only if it is a user request check
					else GM_setValue("lastChecked", SVC.currentDate.getTime() + ""); // *new in v0.3.0* the next check will be on the next day
			}, 3000); // *new in v0.3.0* change to 3secs to allow more time for heavy loaded sites
		};
		retrieve(uso + '/scripts/source/' + SVC.scriptNum + '.meta.js', /@svc:version[\s]*\[(.+)\]/, 1);
	},
	xhr: {
		get: function (url, process) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onload: function (res) { process(res.status, res.responseText); },
			});
		},
	},
	compare: function (version) {
			
			var updatedVersionInt = parseInt(/[1-9][\d]*/.exec(version.replace(/\D/g, "")));		
			
			// *NEW IN v0.3.0* 
			// IF UPDATEDVERSIONINT IS NOT A NUMBER...
			if (isNaN(updatedVersionInt)) {
				if (SVC.userRequestCheck) SVC.manualErrorMsg();
				else GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
				return;
			}
			
			// DO NOTHING IF NO CHANGE IN VERSIONS
			if (updatedVersionInt <= GM_getValue("latest")) {
				if (SVC.userRequestCheck) alert('Auto-check completed!\n---------------------------\n\nYou are using the latest greasemonkey script \n\n~ ' + SVC.scriptName + ' ~ version ' + SVC.currentVersion + '.\n\n  ');
				return;
			}
			
			GM_setValue("notified", true);
			GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
			
			// NOTIFY USER
			if (SVC.userRequestCheck) {
			
				var reply = confirm('Auto-check completed!\n---------------------------\n\nThe Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has recently been updated to v.' + version + '. \n\nYou are currently using version ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscript.org now?\n\n  ');
				
				if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
				
			} else {
			
				var reply = confirm('Latest news for Greasemonkey Scripts!\n-----------------------------------------------\n\nThe Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has recently been updated to v.' + version + '. \n\nYour current working version is ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscript.org now?\n\n  ');
				
				if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
			
			}
		},
	versionInfo: {
		autoChecking: function () {
			SVC.init();
			SVC.verify();
		},
		manualChecking: function () {
			SVC.userRequestCheck = true;
			SVC.getInfo();
		},
	},
	manualErrorMsg: function () {
		var reply = confirm('Alert!\n-------\n\nAuto-checking for the latest version of the Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has not been successful.\n\nYou may wish to try again later or visit the download page to check manually. For your information, your current working version is ' + SVC.currentVersion + '. \n\nWould you like to visit the download page at userscript.org now?\n\n  ');
		if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
	},
};

GM_registerMenuCommand("Check Latest Version", SVC.versionInfo.manualChecking);
SVC.versionInfo.autoChecking();
