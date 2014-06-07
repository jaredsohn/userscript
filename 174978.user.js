// ==UserScript==
// @name		GF MW CodeColl and Inv
// @namespace   net.gfsrv.mobilewar.invite
// @include	http://live.mobilewar.gfsrv.net/*
// @include	http://anonymous-vpn.de/alliance.php* 
// @grand GM_getValue
// @grand GM_setValue
// @grand GM_deleteValue
// @grand GM_log
// @version	4.1
// @require http://code.jquery.com/jquery-1.7.2.min.js
// @require http://cdnjs.cloudflare.com/ajax/libs/xregexp/2.0.0/xregexp-min.js
// ==/UserScript==



var DOINVITE = true, // sollen gefundene codes automatisch auf /clan eingeladen werden?
	DOSEARCHCODES = true, // sollen auf besuchten seiten automatisch nach codes gesucht werden?
	PARSEBODY = false, //deprecated since v3 (daten werden im local store der falschen domain gespeichert)
	codetoadds_string =  "",// fuegt hier gefundene codes als text oder eins drunter als javascript array an. (wieder entfernen, sonst wirds immer gescannt)
	codetoadds_array = [ ],//[ "006.937.762" ];
	mywindow = (typeof (unsafeWindow) !== 'undefined') ? unsafeWindow : window,
	$jq = jQuery.noConflict(),
	$ = mywindow.$;
	

String.prototype.trim = function () { "use strict"; return this.replace(/^\s+|\s+$/g, ''); };
String.prototype.ltrim = function () { "use strict"; return this.replace(/^\s+/, ''); };
String.prototype.rtrim = function () { "use strict"; return this.replace(/\s+$/, ''); };
String.prototype.untag = function () { "use strict"; return this.replace(/<[^ > ]* > /g, ''); };
String.prototype.clean = function () { "use strict"; return this.replace(/<\/?[^ > ]+( > |$)/g, ''); };
String.prototype.contains = function (searchstring) { return (this.indexOf(searchstring) !== -1); };
Array.prototype.unique = function () {
	var a = [ ],
		l = this.length,
		i, j;
	for (i = 0; i < l; ++i) {
		for (j = i + 1; j < l; ++j) {
			if (this[ i ] === this[ j ]){
				j = ++i;
			}
		}
		a.push(this[ i ]);
	}
	return a;
};

if (typeof(console) === 'undefined') {
	console = { log: function () {}, info: function () {}, warn: function () {}, error: function () {} };
}
if (typeof(JSON) === 'undefined') {
	JSON = { parse: function () {}, stringify: function () {} };
}

var DEBUG = {
	debuglevel: 0, //off (0), debug(1), info (2), warn(3), error(4)
	debug: function(debug){
		if (this.debuglevel >= 1){
			console.log(debug);
		}
	},
	info: function(info){
		if (this.debuglevel >= 2){
			console.info(info);
		}
	},
	warn: function(warning){
		if (this.debuglevel >= 3){
			console.warn(warning);
		}
	},
	error: function(errormsg){
		if (this.debuglevel >= 4){
			console.error(errormsg);
		}
	},
	setDebugLvl: function(nr){
		if (typeof(nr) !== 'number') { return false; }
		this.debuglevel = nr;
	}
};

var registry = {
			getValue: function(key, def, type){
				DEBUG.debug(key+", "+ def+", "+type+", "+registry.getValue.caller);
				switch (type) {
				case 'localStorage':
					return mywindow.localStorage[ key ] || def;
					break;
				default:
				case 'GM':
					return GM_getValue(key, def);
					break;
				}
			},
			setValue: function(key, value, type){
				DEBUG.debug(key+", "+ value+", "+type+", "+registry.setValue.caller);
				switch (type) {
				case 'localStorage':
					mywindow.localStorage[ key ] = value;
					return mywindow.localStorage[ key ];
					break;
				case 'GM':
				default:
					return GM_setValue(key,value);
					break;
				}
				
			},
			deleteValue: function(key, type){
				DEBUG.debug(key+", "+type+", "+registry.deleteValue.caller);
				switch (type) {
				
				case 'localStorage':
					return delete mywindow.localStorage[ key ];
					break;
				default:
				case 'GM':
					return GM_deleteValue( key );
					break;
					
				}
				
			}
			
	};
	
	mywindow.registry=registry;
//}
/**

seite http://anonymous-vpn.de/alliance.php aufrufen
firebug oeffnen, firequery aktivieren und folgenden code ausfuehren
// letzter 280.243.119
import:
	values = [ ];
	$('table tr').each(function () {
		values.push($(this).find('td:eq(1)').text());
	})
	console.log(JSON.stringify(jQuery.unique(values)))
	console.log("");

export:
	codes = "";
	count = 0

	$jq.each(JSON.parse(localStorage[ "kriegsspielallycodes" ]), function () {
		if (this.s == "c" || this.s == "self"){
			codes = codes + '[ "'+this.c+'" ], ';
			count++
		}
	})
console.log(codes);
	
*/

var codecollection = [ ];


/**
---------------------------------------------------------------------------------------------------------------------------------------------------------
*/

var meta = {
	url: mywindow.location.href,
	server: ""+mywindow.location.protocol+"//"+mywindow.location.host,
	view: mywindow.location.pathname.split('?')[ 0 ],
	parameter: function () { //returns the array of the parameter or the value of the requestet (true of no value, but parameter existing)
		if (mywindow.location.href.split('?').length <= 1)
			return false;

		var params = mywindow.location.href.split('?')[ 1 ],
			res = [ ];
		for (var i in (vars = params.split('&')))
		{
			if (vars.hasOwnProperty(i))
			{
				v = vars[ i ].split("=");
				res[ v[ 0 ] ] = v[ 1 ] ? v[ 1 ] : true;
			}
		}
		//return res;
		return (arguments.length > 0) ? ((res.hasOwnProperty(arguments[ 0 ])) ? res[ arguments[ 0 ] ] : false) : res;
	},
	title: mywindow.document.title
};

var utils = {
	refresh: function(url, seconds){
		if (url==="") url = window.location.href; //self
		if (typeof(seconds) !== "number") seconds = 0; //instant
		setTimeout('window.location="'+ url +'"', seconds*1000); // reload to url every x minutes
	},
	click: function(target, seconds) {
		if (!target) return false;
		if (typeof(seconds) !== "number") seconds = 0; //instant
		setTimeout('$("'+target+'").trigger("click")', seconds*1000);
	}
};

var loca = {
		language: null,
		languageDefault:  'DE',
		// LoCa
		'DE': {
			"info/language" : "Deutsch",
			"invite/codenotfound" : "Es wurde niemand mit diesem Allianzcode gefunden.", //nonexistent
			"invite/alreadymember" : "ist bereits Mitglied deiner Allianz.", //confirmed, known for me
			"invite/successfullyinvited" : " in deine Allianz eingeladen.", //existence confirmed, new for me
			"invite/cantinviteyourself" : "Du kannst dich nicht selbst in deine Allianz einladen.", //self
			"label/next" : "n&auml;chster",
			"label/previous" : "vorheriger"
		},
		'EN': {
			"info/language" : "english",
			"invite/codenotfound" : "No-one with this alliance code was found.",
			"invite/alreadymember" : "is already a member of your alliance.", 
			"invite/successfullyinvited" : "You have invited", 
			"invite/cantinviteyourself" : "You cannot invite yourself to your alliance.",
			"label/next" : "next",
			"label/previous" : "previous"
		},
		setLanguage: function(lang){
			this.language = lang;
		},
		getLocaString: function (property){
			if (!this.language || !this[ this.language ]){
				DEBUG.warn("warning: your language isnt set");
				this.language = this.languageDefault;
			}			
			if (!property) {
				DEBUG.warn("warning: argument 'property' not set");
				return false;
			}

			if (this[ this.language ].hasOwnProperty(property)){
				DEBUG.info("property '"+this.language+"':'"+property+"' = > "+this[ this.language ][ property ]);
				return this[ this.language ][ property ]; 
			}  
			if (this[ this.languageDefault ].hasOwnProperty(property)){
				console.warn("warning: property '"+ property +"' in language "+ this.language +" not availeable. fallback to default "+ this.languageDefault);
				return this[ this.languageDefault ][ property ]; 
			}

			DEBUG.warn("error: property '"+ property +"' in neither in language "+ this.language +" and defaultlang '"+ this.languageDefault +"' availeable");
			return "--UNSET('"+ property +"')";
		}
};



function Player(code, status, id){
	this.c = code;
	this.s = status; //new n (default), confirmed c, invited i(0 or 1), nonexistent non
}

var mobcodes = {
	codelist: JSON.parse(registry.getValue("kriegsspielallycodes",'{}','GM')), //existing
	add: function(codetoadd) { //tries to add the code if not exist and returns the success
		codetoadd = this.formatCode(codetoadd);
		if (!this.isValid(codetoadd)) {
			DEBUG.warn("preformattet code not valid: "+codetoadd);
			return false;
		}
		playerelem = new Player(codetoadd, "n");
		if (!this.has(playerelem)){
			this.codelist[ playerelem.c ] = playerelem;
			DEBUG.info("+++code added: "+ JSON.stringify(codetoadd));
			return true;
		} else {
			DEBUG.debug("---code '" +codetoadd+ "' already in codelist. status: " +playerelem.s);
			return false; 
		}
		
	},
	clean: function(){
		for (var code in this.codelist){
			if (!this.isValid(code)) {
				console.warn(this.codelist[code]);
				delete this.codelist[code];
			}
			if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s == "non") {
				console.warn(this.codelist[code]);
				delete this.codelist[code];
			}
		}
		this.save();
	},
	isValid: function(code){
		return /([0-9]{3}(\.)[0-9]{3}(\.)[0-9]{3})/.test(code)
	},
	getWithStatus: function(withstatus) {
		var array = [ ], 
			i = 0;
		for (var code in this.codelist){
			if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s == withstatus) {
				array[ i++ ] = this.codelist[ code ];
			}
		}
		return array;
	},
	has: function(hasplayer){
		return this.codelist.hasOwnProperty(hasplayer.c); //arrayindex the same as the code
	},
	getAll: function () { return this.codelist; },
	reset: function(passphrase) { 
		if (passphrase!="imsure") return "wtf do you want to do?";
		this.codelist = [ ];
		this.save();
	},
	count: function(withstatus) {
		var size = 0, code;
		switch(withstatus){	
			case "all":
				for (code in this.codelist) {
					if (this.codelist.hasOwnProperty(code)) size++;
				}
				return size;
			default:
				for (code in this.codelist){
					if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s == withstatus){
						size++;
					}
				}
				return size;
		}
	},
	save: function () { 
		//DEBUG.debug("save: "+JSON.stringify(this.codelist));
		registry.setValue("kriegsspielallycodes", JSON.stringify(this.codelist),'GM');
	},
	formatCode: function(code){
		code = code.toString().replace(/(\.| |,|-)/g ,"");
		//todo: hier auf [ 0-9 ]{9} testen oder entfernen
		return code.slice(0, 3)+"."+code.slice(3, 6)+"."+code.slice(6, 9);
	},
	parseAllycode: function(str) {
		if (typeof(str) != "string" || str.length === 0) return 0;
		DEBUG.debug("parseAllycode: "+str);
		var match,
			regex = XRegExp.globalize(/([0-9]{3}(\.| |-|,)?[0-9]{3}(\.| |-|,)?[0-9]{3})/),
			count = [ ];
			count.newCode = 0;
			count.knownCode = 0;
			
		while (match = regex.exec(str)) {
			success = this.add(match.toString());
			if (success) count.newCode++;
			else count.knownCode++;
		}
		
		DEBUG.debug("count of found codes; new: "+ count.newCode +" known: "+ count.knownCode+" in view: "+meta.view);
		return count;
		//this.save();
	},
	getLastInvited: function () {
		for (var code in this.codelist){
			if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s == "i"){
				//DEBUG.debug(this.codelist[ code ])
				return this.codelist[ code ];
			}
		}
		return false;
	},
	setLastInvited: function(setLastInvitedstring){
		this.codelist[ setLastInvitedstring ].s = "i";
	},
	hasNext: function () {
		for (var code in this.codelist){
			if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s=="n"){
				return true;
			}
		}
		return false;
	},
	getNext: function () {
		for (var code in this.codelist){
			if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s == "i"){
				this.setStatus(this.codelist[ code ], "n"); //if the last i has no status - > n
			}
		}
		for (code in this.codelist){
			if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s =="n"){
				this.codelist[ code ].s = "i";
				//this.save();
				return this.codelist[ code ].c; //first element with new wird returned
			}
		}
		return false;
	},
	setStatus: function(player, newstatus){
		//DEBUG.debug("status for code: "+pplayer.c+" set to: "+newstatus)
		this.codelist[ player.c ].s = newstatus;
		//this.save();
	},
	printStatus: function(target) {
		$jq(target).append("<p > con:"+this.count("c")+"/ new:"+this.count("n")+"/ all:"+this.count("all")+" / non:"+this.count("non")+"</p > ");	//needs too much time, probably because of the loop
	},
	parseBody: function () { 
		this.parseAllycode(mywindow.document.getElementsByTagName('body')[ 0 ].innerHTML.replace(/<( ?:.|\s)*? > /g,""));
	},
	check: function () {
		try {
			statustext = ""+$jq(".msgBox div div p").text();
			//DEBUG.debug("statustext: "+ statustext)
			if (!statustext) return false;
						
			if (statustext.contains(loca.getLocaString("invite/codenotfound"))) { // loca: invite/codenotfound
				this.setStatus(this.getLastInvited(), "non"); //nonexistent
				return;
			} else if (statustext.contains(loca.getLocaString("invite/alreadymember"))) {//loca: invite/alreadymember
				this.setStatus(this.getLastInvited(), "c"); //confirmed, known for me
				return;
			} else if (statustext.contains(loca.getLocaString("invite/successfullyinvited"))) {// loca: invite/successfullyinvited
				this.setStatus(this.getLastInvited(), "c"); //existence confirmed, new for me
				return;
			}  else if (statustext.contains(loca.getLocaString("invite/cantinviteyourself"))) {// loca: invite/cantinviteyourself
				this.setStatus(this.getLastInvited(), "self");
				return;
			} else this.setStatus(this.getLastInvited(), statustext);
		}
		catch (err) {
			DEBUG.error(err);
		}	
	}
};
mywindow.mobcodes = mobcodes;



try  {

	$jq(document).ready(function () {
		loca.setLanguage("DE"); //automatisieren :)
		$jq("body").removeClass("iscroll");
		
		if ($jq(".msgBox div div p").size() > 0) mobcodes.check(); 
		if (PARSEBODY) mobcodes.parseBody();
		
		if ($jq("input#inviteInput_clancode").size()) { // Allianz
			if (DOINVITE && mobcodes.hasNext()){
				$jq('#inviteInput_clancode').val(mobcodes.getNext());
				mobcodes.printStatus('#tab1');
				mobcodes.save();
				setTimeout('$(".simpleForm").submit()', 2000*Math.random()+500);
			} else if (DOINVITE){
				utils.refresh('/clan', 5*60); // reload every 5 minutes and check new
			}
		} else if ($jq("body#home").size() || $jq("body#profile").size()) { //HOME & Profil
		
			
			if (DOSEARCHCODES) {
				/*mobcodes.parseAllycode(codetoadds_string);
				for (code in codetoadds_array) {
					mobcodes.parseAllycode(JSON.stringify(codetoadds_array[ code ]));
				}*/
				// add every textblock you want to parse
				
				mobcodes.parseAllycode($jq('.broadcast a p').text()); //
				mobcodes.parseAllycode($jq('.comment a p').text());
				mobcodes.parseAllycode($jq('.commentMsg').text());
				mobcodes.save();
				mobcodes.printStatus('#statsBarXP');
				utils.refresh(meta.view, 30); // reload every 30 seconds and check new (variable, because here are different views checked
				
				
			}
		} 
		
		try {
			$jq('a[ href^="/profile/index/id/" ]').each(function () {
				$jq(this).attr("href", $jq(this).attr("href").replace(/index/g,"comments"));
			});
			
			if (meta.view.contains("profile/info/id/")){
				userid = meta.view.replace("/profile/info/id/","").split("/")[ 0 ];
				$jq("ul.tabs").prepend("<li > <a id='previous' href='/profile/info/id/"+(parseInt(userid, 10)-1)+"' > "+loca.getLocaString("label/previous")+"</a > </li > ");
				$jq("ul.tabs").append("<li > <a id='next' href='/profile/info/id/"+(parseInt(userid, 10)+1)+"' > "+loca.getLocaString("label/next")+"</a > </li > ");

			}
		} catch(error){
			DEBUG.error(error);
		}
	});
}
 catch (err)  {
	DEBUG.error(err);
}