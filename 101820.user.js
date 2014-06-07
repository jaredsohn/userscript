// ==UserScript==

// @name           planetfinder

// @namespace      http://blogpagliaccio.wordpress.com

// @description    find planet in imperion

// @include        http://*.imperion.*/map*

// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js

// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js

// @version 1.3.1

// @svc:version    [0.7.0]

// ==/UserScript==



// +++++++++++++++++++++++++++++++++++++++++++estract data info***********************************************



user = unsafeWindow.uiData;





var finder={

		// init

	k:0,

	b:0,

	production:new Array("","very low","low","medium","higth","very higth"),

	preload : new Array(),

	sid:user.current_planet.id_System,

	planet:new Array(),

	bonus:new Array(),

	typesort:new Array(),

	flagbar:false,

	// ******************************************estract map info***********

	mapinfo : function () {

		$.ajax({

			url : "/map/index/preload/",

			data : "systemId=" + finder.sid + "&planetId="	+ user.current_planet.id_planet,

			type : "post",

			dataType : "json",

			success : function(data) {

				pr = data[0].data;

				i=0;

				for ( var key in pr) {

					finder.preload[i]= key;

					i++

				}

				

				finder.findC();

			}

		});

	},

	menufind : function () {

		finder.sid=prompt("inserire l'id del sistema (l'id dei pianeti senza le ultime 2 cifre)",finder.sid);

		finder.mapinfo();

	},

	findC:function () {

		j = 0;

		finder.k=0;

		finder.b=0;

		$('#area2').show();

		$('#bottone2').show();

		$('#bottone2').text("attendi");

		for (i = 0; i < finder.preload.length; i++) {

			$.ajax({

				url : "/map/index/system/",

				data : "systemId=" + finder.preload[i] + "&planetId="+ user.current_planet.id_planet,

				type : "post",

				dataType : "json",

				success : function(data) {

					vect=data[0].data.planets;

					

					for (var key in vect ) {

						finder.planet[finder.k]=new Array();

						finder.planet[finder.k].id=vect[key].id_planet;

						finder.planet[finder.k].name=vect[key].name;

						if (typeof(vect[key].map_info.production) == "undefined") finder.planet[finder.k].prod=0;

						else 

							finder.planet[finder.k].prod=vect[key].map_info.production.box_count;

						finder.planet[finder.k].bonus=new Array();

						for (a=0;a<5;a++) {

							finder.planet[finder.k].bonus[vect[key].map_info.bonuses[a].bonusType]=vect[key].map_info.bonuses[a].value;

							bool=true;

							for (var bo in finder.bonus) {

								if (finder.bonus[bo]==vect[key].map_info.bonuses[a].bonusType) bool=false;

							}

							if (bool) {finder.bonus[finder.b]=vect[key].map_info.bonuses[a].bonusType;finder.b++}

						}

						finder.k++;

					}

					j++;

					if (j >= finder.preload.length) finder.end();

					else {

						// 100:x=preload.length:j

						p=100*j/finder.preload.length;

						$('#area2').html("loading..."+parseInt(p)+"%");

					}

				}

			});

		}

	},

	end : function () {

		//alert(finder.typesort);

		finder.planet.sort(sortplanet);

		text='';check='';

		//if (!finder.flagbar) {

			text='<link media="all" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/themes/base/jquery-ui.css" rel="stylesheet">'+

			'<button id="save" >save data</button>'+

			'<div id="bs">order by <button id="all">all</button><button id="production">production</button>';

			for (var key in finder.bonus) {

				if (jQuery.inArray(finder.bonus[key],finder.typesort)>=0) check='checked="true"';

				else check="";

				text+=' <input '+check+' type="checkbox" id="l'+key+'" value="'+finder.bonus[key]+'" /><label for="l'+key+'">'+finder.bonus[key]+'</label> ';

			}

			text+='</div>';//<div id="table">';

		//}

		text+='<table><tr><th>name</th></tr>';

		for (var key in finder.planet) {

			text+='<tr><td><a href="/map/index/index/stage/ORB/targetPlanetId/'+finder.planet[key].id+'" style="color:black;">'+finder.planet[key].name+'</a></td><td> '+finder.production[finder.planet[key].prod]+' </td>';

			for (var ke in finder.planet[key].bonus) {

				bon=finder.planet[key].bonus[ke];

				text+='<td>'+ke+':<span style="color:'+(bon<0 ? "red" : "green" )+';">'+bon+'%</span></td>';

			}

			text+='</tr>';

		}

		text+='</table>';

		//if (!finder.flagbar) text+="</div>";

		$('#bottone2').html("close");

		//if (finder.flagbar) $('#table').html(text);

		//else 

			$('#area2').html(text);

		$("#all").click(function() {

			$('#bs input').attr('checked',"");

			finder.typesort=new Array();

			finder.typesort[0]="all";

			finder.end();

		});

		$("#production").click(function() {

			$('#bs input').attr('checked',"");

			finder.typesort=new Array();

			finder.typesort[0]="prod";

			finder.end();

		});

		$("#save").click(function() {

			save='{"bonus":[';

			for (var key in finder.bonus)

				save+='"'+finder.bonus[key]+'",';

			save=save.substr(0,save.length-1);

			save+='],"planet":[';

			for (var key in finder.planet) {

				save+='{"id":"'+finder.planet[key].id+'","name":"'+finder.planet[key].name+'","prod":"'+finder.planet[key].prod+'","bonus":{';

				for (var ke in finder.planet[key].bonus) {

					bon=finder.planet[key].bonus[ke];

					save+='"'+ke+'":"'+bon+'",';

				}

				save=save.substr(0,save.length-1);

				save+='}},';

			}

			save=save.substr(0,save.length-1);

			save+=']}';

			auto=GM_getValue("autosave",1);

			name=prompt("save name?","auto_"+auto);

			if (name=="auto_"+auto) {

				auto++;

				GM_setValue("autosave",auto);

			}

			GM_setValue("save_"+name,save);

			save='this is a code for export data on other pc <br/>'+save;

			$('#area2').html(save);



			$('#bottone2').html("close");

			$('#area2').show();

			$('#bottone2').show();

		});

		$('#bs input[type="checkbox"]').click(function() {

				finder.typesort=new Array();

				for(k=0;$('#bs input:checked').eq(k).val();k++ ) {

					finder.typesort.push($('#bs input:checked').eq(k).val());

				}

				finder.end();

			});

		//$('#bs').buttonset();

		//if (!finder.flagbar) finder.flagbar=true; 

	},

	loaddata : function () {

		$('#area2').show();

		$('#bottone2').show();

		saves=GM_listValues();

		h="<div>data aviable</div>";

		for(var val in saves)

			if (saves[val].substr(0,5)=="save_")

			h+='<div><a href="#" style="color:black;" id="'+saves[val]+'">'+saves[val]+

			'</a><a  href="#" style="color:black;" id="del'+saves[val]+'">[x]</a></div>';

		h+='<h3>or parse data</h3><textarea id="pdata"></textarea><button id="parsep">parse</button>';



		$('#area2').html(h);

		$('#parsep').click(function (){

			try {

				data=jQuery.parseJSON($("#pdata").val());

			}

			catch(e) {

				alert(e);

			}



			comet=data;

			max.id=comet[0].maxid;



			end();

		});

		for(var val in saves)

			if (saves[val].substr(0,5)=="save_") {

				$('#'+saves[val]).click(function() {

					finder.doload(this.id);

				});

				$('#del'+saves[val]).click(function() {

					GM_deleteValue(this.id.substr(3));

					finder.loaddata();

				});

			}

			

	},

	doload : function (id) {

		data=jQuery.parseJSON(GM_getValue(id));

		finder.planet=data.planet;

		finder.bonus=data.bonus;

		finder.end();

	}

};



finder.typesort[0]="all";



// *********************************************comand menu

GM_registerMenuCommand("find planet on system by id",finder.menufind);

GM_registerMenuCommand("load planet data", finder.loaddata);





// create windows on display planet

$('body').append('<div id="area2" style="display:none;top: 100px; left: 250; width: 800px; border: 1px solid black; height: 500px; position: absolute; z-index: 1000; overflow: auto; background: none repeat scroll 0% 0% white;">please  wait</div>');

$('body').append('<button id="bottone2" style="display:none;top: 80px; left: 750px; position: absolute; z-index: 1001;">wait</button>');

$('#bottone2').click(function() {

	$('#area2').hide();

	$('#bottone2').hide();

});





function sortplanet(a,b) {

	if (finder.typesort.length==1) {

		switch (finder.typesort[0]) {

			case "all": maxa=0;

				for (var key in a.bonus) {

					maxa=maxa*1+parseInt(a.bonus[key]);

				}

				maxb=0;

				for (var key in b.bonus) {

					maxb=maxb*1+parseInt(b.bonus[key]);

				}

				r=maxb-maxa;

			break;

			case "prod" :

				r=b.prod-a.prod;

			break;

			case "shipCost":

			case "buildingCost":

			case "buildingEnergyConsumption":

				if (typeof(b.bonus[finder.typesort[0]]) == "undefined") b2=-100; else b2=-b.bonus[finder.typesort[0]];

				if (typeof(a.bonus[finder.typesort[0]]) == "undefined") a2=-100; else a2=-a.bonus[finder.typesort[0]];

				r=b2-a2;

			break;

			default : if (typeof(b.bonus[finder.typesort[0]]) == "undefined") b2=-100; else b2=b.bonus[finder.typesort[0]];

				if (typeof(a.bonus[finder.typesort[0]]) == "undefined") a2=-100; else a2=a.bonus[finder.typesort[0]];

				r=b2-a2;

			break;

		}

	}

	else {

		a2=0;

		b2=0;

		for (var k in finder.typesort) {

			if (typeof(b.bonus[finder.typesort[k]]) == "undefined") b2-=100; 

			else {

				if ((finder.typesort[k]=="buildingEnergyConsumption")||(finder.typesort[k]=="buildingCost")||(finder.typesort[k]=="shipcost"))

					b2-=b.bonus[finder.typesort[k]];

				else 

					b2+=b.bonus[finder.typesort[k]];

			}

			if (typeof(a.bonus[finder.typesort[k]]) == "undefined") a2-=100; 

			else {

				if ((finder.typesort[k]=="buildingEnergyConsumption")||(finder.typesort[k]=="buildingCost")||(finder.typesort[k]=="shipcost"))

					a2-=a.bonus[finder.typesort[k]];

				else a2+=a.bonus[finder.typesort[k]];

			}

		}

		r=b2-a2;

	}

	return r;

}





// ****************version check *****



var SVC = {

	currentVersion: "1.3.1", // Needed to compare working version with the

								// download version at userscript.org

	scriptName: "planetfinder", // Used in the message to users of any version

								// changes to the script

	scriptNum: 101820, // Needed to connect to the download page at

						// userscript.org

	

	currentDate: null,

	latestVersion: null,

	userRequestCheck: null,

	

	trim: function (str, chars) {

		return SVC.ltrim(SVC.rtrim(str, chars), chars);

	},

 

	ltrim: function (str, chars) {

		chars = chars || "\\s";

		return str.replace(new RegExp("^[" + chars + "]+", "g"), "");

	},

 

	rtrim: function (str, chars) {

		chars = chars || "\\s";

		return str.replace(new RegExp("[" + chars + "]+$", "g"), "");

	},

	

	versionInfo: {



		init: function () {

			SVC.currentDate = new Date();

			var cv = parseInt( String(/[1-9].*/.exec(SVC.currentVersion)).replace(/\./g, "") );

			

			// INITIALIZE LOCAL VALUES (FOR FIRST-TIME USE)

			if (!GM_getValue("latest")) GM_setValue("latest", cv );

			if (!GM_getValue("notified")) GM_setValue("notified", false);

			if (!GM_getValue("lastChecked")) GM_setValue("lastChecked", (SVC.currentDate.getTime() - 1000*60*60*25) + "");

			

			// UPDATE LOCAL VALUES (FOR FIRST-TIME USE AFTER REINSTALL NEWER

			// VERSION)

			if (GM_getValue("latest") < cv) {

				GM_setValue("latest", cv);

				GM_setValue("notified", false);

				GM_setValue("lastChecked", SVC.currentDate.getTime() + "");

			}

		},

		

		verifyNotification: function() {

			SVC.userRequestCheck = false;

			var sp = SVC.currentDate.getTime() - parseInt(GM_getValue("lastChecked"));

			

			// CHECK SOURCE IF USER HAS BEEN NOTIFIED OF AN UPDATED VERSION

			// BEFORE AND 14 DAYS HAVE PASSED

			if (GM_getValue("notified")) {

				if ( sp / (1000*60*60*24) > 14 ) SVC.versionInfo.startXmlHttp();

				

			// CHECK SOURCE FOR THE LATEST VERSION IF ONE DAY HAS PASSED SINCE

			// LAST CHECKED

			} else {

				if ( sp / (1000*60*60*24) > 1 ) SVC.versionInfo.startXmlHttp();

			}		

		},

		

		startXmlHttp: function () {	

			try {

				GM_xmlhttpRequest({

					method: 'GET', url: "http://userscripts.org/scripts/review/" + SVC.scriptNum, 

					onload: function(responseDetails) {

						if (responseDetails.status == 404) {

							if (SVC.userRequestCheck) SVC.versionInfo.manualErrorMsg();



						} else if (responseDetails.status == 200) {

							var newElem = document.createElement('div');

							newElem.innerHTML = responseDetails.responseText;

							// newElem.style.display = 'none';

                                          		// newElem.getElementsByClassName('ad')[0].innerHTML='';

							// document.body.appendChild(newElem);

							var theSource = newElem.getElementsByTagName('pre')[0];

							// alert(theSource.innerHTML);

							var uv = SVC.versionInfo.processResponseText(theSource);

							if (uv) {

								SVC.updatedVersion = parseInt(uv.replace(/\./g, ""));

								SVC.versionInfo.compareVersions(SVC.updatedVersion);

							} else {

								if (SVC.userRequestCheck) SVC.versionInfo.manualErrorMsg();

							}

                                          		// newElem.parentNode.removeChild(newElem);

						}



					}

				});

			}

			catch(err) {

			}

		},

			

		processResponseText: function (theNewElem) {

		    var versionfound = false;

		    var theVersionPart;

	    	    var theLines = theNewElem.innerHTML.split('\n');

	    	    for(i=0; i<theLines.length; i++) {

	    	    	theLines[i]=SVC.trim(theLines[i]);

	    	        if(theLines[i].indexOf('// @version')==0) {

	    	            versionfound = true;

	    	            theVersionPart = SVC.trim(theLines[i].substring(11));

	    	        }

	    	    }

	    	    if(versionfound) {

	    	        return theVersionPart;

	    	    } else {

	    	        return false;

	    	    }

		},



		compareVersions: function (updatedVersion) {

			

			// DO NOTHING IF NO CHANGE IN VERSIONS

			if (updatedVersion <= GM_getValue("latest",0)) {

				if (SVC.userRequestCheck) alert('Auto-check completed!\n---------------------------\n\nYou are using the latest greasemonkey script \n\n~ ' + SVC.scriptName + ' ~ version ' + SVC.currentVersion + '.\n\n  ');

				return;

			}

			

			// UPDATE LOCAL VALUES

			if (String(updatedVersion).length == 2) updatedVersion = "0" + String(updatedVersion);

			SVC.latestVersion = String(updatedVersion).replace(/\B/g, ".");

			

			GM_setValue("notified", true);

			GM_setValue("lastChecked", SVC.currentDate.getTime() + "");

			

			// NOTIFY USER

			if (SVC.userRequestCheck) {

			

				var reply = confirm('Auto-check completed!\n---------------------------\n\nThe Greasemonkey Script\n~ ' + SVC.scriptName + ' ~\nhas recently been updated to v.' + SVC.latestVersion + '. \n\nYou are currently using version ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscripts.org now?\n\n  ');

				

				if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);

				

			} else {

			

				var reply = confirm('Latest news for Greasemonkey Scripts!\n-----------------------------------------------\n\nThe Greasemonkey Script\n~ ' + SVC.scriptName + ' ~\nhas recently been updated to v.' + SVC.latestVersion + '. \n\nYour current working version is ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscripts.org now?\n\n  ');

				

				if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);

			

			}

		},

		

		autoChecking: function () {

			SVC.versionInfo.init();

			SVC.versionInfo.verifyNotification();

		},

		

		manualChecking: function () {

			SVC.userRequestCheck = true;

			SVC.versionInfo.startXmlHttp();

		},



		manualErrorMsg: function () {

			var reply = confirm('Alert!\n-------\n\nAuto-checking for the latest version of the Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has not been successful.\n\nYou may wish to try again later or visit the download page to check manually. For your information, your current working version is ' + SVC.currentVersion + '. \n\nWould you like to visit the download page at userscripts.org now?\n\n  ');

			if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);

		},

		

	}



};



window.addEventListener(

  'load',

  function () {

    SVC.versionInfo.autoChecking();

  },

true);



GM_registerMenuCommand("Check Latest Version for planetfinder", SVC.versionInfo.manualChecking);