// ==UserScript==
// @name	MobileStoneage autobot
// @namespace	net.gfsrv.mobilestoneage.bot
// @include	http://live.mobilestoneage.gfsrv.net/*
// @version	1.11
// @grant	none
// @require http://code.jquery.com/jquery-1.7.2.min.js
// @require http://cdnjs.cloudflare.com/ajax/libs/xregexp/2.0.0/xregexp-min.js
// ==/UserScript==


var codetoadds_string = "";

var mywindow = (typeof (unsafeWindow) !== 'undefined') ? unsafeWindow : window,
	$jq = jQuery.noConflict();
mywindow.jQuery = jQuery;
mywindow.XRegExp = XRegExp;

String.prototype.trim = function () { "use strict"; return this.replace(/^\s+|\s+$/g, ''); };
String.prototype.ltrim = function () { "use strict"; return this.replace(/^\s+/, ''); };
String.prototype.rtrim = function () { "use strict"; return this.replace(/\s+$/, ''); };
String.prototype.untag = function () { "use strict"; return this.replace(/<[^>]*>/g, ''); }; //removes all tags
String.prototype.clean = function () { "use strict"; return this.replace(/<\/?[^>]+(>|$)/g, ''); }; //similar to untag, should also delete script and css values
String.prototype.replaceNonDigit = function () { "use strict"; return this.replace(/[^0-9]/g, ''); };
String.prototype.contains = function (s) { "use strict"; return (this.search(s) !== -1); };
Object.prototype.equals = function(x) // copied from http://stackoverflow.com/a/1144249
{
  var p;
  for(p in this) {
      if(typeof(x[p])=='undefined') {return false;}
  }
  for(p in this) {
      if (this[p]) {
          switch(typeof(this[p])) {
              case 'object':
                  if (!this[p].equals(x[p])) { return false; } break;
              case 'function':
                  if (typeof(x[p])=='undefined' ||
                      (p != 'equals' && this[p].toString() != x[p].toString()))
                      return false;
                  break;
              default:
                  if (this[p] != x[p]) { return false; }
          }
      } else {
          if (x[p])
              return false;
      }
  }
  for(p in x) {
      if(typeof(this[p])=='undefined') {return false;}
  }
  return true;
};
Array.prototype.unique = function () { //copied from... dont know
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
function empty (mixed_var) { // copied from http://phpjs.org/functions/empty:392
	var key;
	if (mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false || typeof mixed_var === 'undefined') {
		return true;
	}
	if (typeof mixed_var == 'object') {
		for (key in mixed_var) {
			return false;
		}
		return true;
	} 
	return false;
}
function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (Object.prototype.toString.call(value) == '[object Array]') {
                s = 'array';
            } //else object
        } else {
            s = 'null';
        }
    }
    return s;
}

if (typeof(console) === 'undefined') {
	console = { log: function () {}, info: function () {}, warn: function () {}, error: function () {} };
}
if (typeof(JSON) === 'undefined') {
	JSON = { parse: function () {}, stringify: function () {} };
}

var DEBUG = {
	debuglevel: 3, //off (0), error(1), warn(2), info (3), debug(4)
	GM_log: function(str){
		if (typeof (GM_log) === 'function') GM_log(str);
	},
	error: function(errormsg){
		if (this.debuglevel >= 1){
			console.error(errormsg);
			this.GM_log(errormsg);
		}
	},
	warn: function(warning){
		if (this.debuglevel >= 2){
			console.warn(warning);
			this.GM_log(warning);
		}
	},
	info: function(info){
		if (this.debuglevel >= 3){
			console.info(info);
			this.GM_log(info);
		}
	},
	debug: function(debug){
		if (this.debuglevel >= 4){
			console.log(debug);
			this.GM_log(debug);
		}
	},
	setDebugLvl: function(nr){
		if (typeof(nr) === 'number') { this.debuglevel = nr;}
		if (typeof(nr) === 'string') { 
			switch(new String(nr).toLowerCase()){
			case 'off':
				this.debuglevel = 0;
				break;
			case 'error':
				this.debuglevel = 1;
				break;
			case 'warn':
				this.debuglevel = 2;
				break;
			case 'info':
				this.debuglevel = 3;
				break;
			case 'debug':
				this.debuglevel = 4;
				break;
			default:
				return false;
			}
		}
		return false; 
	}
};
//if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported") > -1)) {
this.GM_getValue = function (key, def) {
	return mywindow.localStorage[ key ] || def;
};
this.GM_setValue = function (key, value) {
	mywindow.localStorage[ key ] = value;
	return mywindow.localStorage[ key ];
};
this.GM_deleteValue = function (key) {
	return delete mywindow.localStorage[ key ];
};
//}


var kata = {
	url: mywindow.location.href,
	server: ""+mywindow.location.protocol+"//"+mywindow.location.host,
	path: mywindow.location.pathname.split('?')[ 0 ],
	view: mywindow.location.pathname.split("/")[ 1 ],
	action: mywindow.location.pathname.split("/")[ 2 ] ? location.pathname.split("/")[ 2 ] : "index", 
	parameter: function () { //returns the array of the parameter or the value of the requestet (true of no value, but parameter existing)
		if (mywindow.location.href.split('?').length <= 1 && mywindow.location.pathname.replace("/","").split("/").length <=2 )
			return false;

		var httpparams = mywindow.location.href.split('?').length >1 ? mywindow.location.href.split('?')[ 1 ].split('&') : null,
			kataparams = mywindow.location.pathname.replace("/", "").split('/'),
			res = [ ];
		for (var i in httpparams) //extract ?foo=bar&baz parameter
		{
			if (httpparams.hasOwnProperty(i))
			{
				v = httpparams[ i ].split("=");
				res[ v[ 0 ] ] = v[ 1 ] ? v[ 1 ] : true;
			}
		}
		for (var j=0; j<kataparams.length;j++)	//extract /id/asfdsadfsdf/hash/foobar parameter
		{
		  if (j<2) continue; //view/action
		  res[ kataparams[j++] ] = kataparams[j] ?  kataparams[j] : true;
		}
		return (arguments.length > 0) ? ((res.hasOwnProperty(arguments[ 0 ])) ? res[ arguments[ 0 ] ] : false) : res; //returns the value of param is given or an array of all params
	},
	title: mywindow.document.title
};

var dateUtil = {
	//days: [ 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	days: [ 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
	//months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	months: ["Jan", "Feb", "M&auml;r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
	/**
	 * @param Timestamp des gewuenschten Datum und das Datumformat
	 * @return formatiertes Datum (String) 
	 */
	getFormatedDate: function (timestamp, format)  {
		var currTime = new Date();
		currTime.setTime(timestamp);
		str = format;
		str = str.replace('[d]', this.dezInt(currTime.getDate(),2));
		str = str.replace('[D]', this.days[currTime.getDay()]);
		str = str.replace('[m]', this.dezInt(currTime.getMonth()+1,2));
		str = str.replace('[M]', this.months[currTime.getMonth()]);
		str = str.replace('[j]', parseInt(currTime.getDate()));
		str = str.replace('[Y]', currTime.getFullYear());
		str = str.replace('[y]', currTime.getFullYear().toString().substr(2,4));
		str = str.replace('[G]', currTime.getHours());
		str = str.replace('[H]', this.dezInt(currTime.getHours(), 2));
		str = str.replace('[i]', this.dezInt(currTime.getMinutes(), 2));
		str = str.replace('[s]', this.dezInt(currTime.getSeconds(), 2));
		return str;
	},
	/** * adds prefix digits to a number ('2'->'02')
	 *
	 * @param int   number
	 * @param int   digits
	 * @param str   prefix, default is '0'
	 */
	dezInt: function (num, size, prefix)  {
		prefix = (prefix) ? prefix : "0";
		var minus = (num < 0) ? "-" : "",
		result = (prefix === "0") ? minus : "";
		num = Math.abs(parseInt(num,10));
		size -= ("" + num).length;
		for (var i = 1; i <= size ; i++) {
			result += "" + prefix;
		}
		result += ((prefix !== "0") ? minus : "") + num;
		return result;
	},
	/**
	 * @return gibt den aktuellen DatumString im Format [d].[m].[Y] [H]:[i] zurueck
	 */
	getDate: function () {
		formattedDate = this.getFormatedDate(new Date().getTime(), '[d].[m].[Y] [H]:[i]');
		return formattedDate; 
	},
	parseTime: function (str) {
		
		var time = str.split(":").reverse(), seconds=0;
		switch(time.length){
		case 3:
			seconds += parseInt(time.pop(),10)*60*60; //hours
		case 2:
			seconds += parseInt(time.pop(),10)*60; //minutes
		case 1:
			seconds += parseInt(time.pop(),10)*1; //seconds
			break;
		default:
			seconds = -1;
			break;
		}
		return seconds;
	}
};

var utils = {
	refresh: function(url, seconds){
		if (url==="") url = window.location.href; //self
		if (typeof(seconds) !== "number") seconds = 0; //instant
		DEBUG.info("click on '"+url+"' in "+seconds+" s");
		setTimeout('window.location="'+ url +'"', seconds*1000); // reload to url every x minutes
	},
	click: function(target, seconds) {
		if (!target) return false;
		if (typeof(seconds) !== "number") seconds = 0; //instant
		DEBUG.info("click on '"+target+"' in "+seconds+" s");
		setTimeout('$("'+target+'").trigger("click")', seconds*1000);
	}
};

var loca = {
		language: null,
		languageDefault:  'DE',
		// LoCa
		'DE': {
			"info/language" : "Deutsch",
			'invite/successfullyinvited' : /Du hast (.*) in deinen Klan eingeladen./,
			'invite/alreadymember' : /(.*) ist bereits Mitglied deines Klans./,
			'invite/codenotfound' : 'Es wurde niemand mit diesen Klanglyphen gefunden.',
			'invite/cantinviteyourself' : "Du kannst dich nicht selbst in deinen Klan einladen.",
			"label/next" : "n&auml;chster",
			"label/previous" : "vorheriger"
		},
		'EN': {
			"info/language" : "english"
		},
		setLanguage: function(lang){
			this.language = lang;
		},
		getString: function (property){
			if (!property) {
				DEBUG.warn("warning: argument 'property' not set");
				return false;
			}
			if (!this.language || !this[ this.language ]){
				DEBUG.warn("warning: your language isnt set");
				this.language = this.languageDefault;
			}			
			if (this[ this.language ].hasOwnProperty(property)){
				DEBUG.debug("property '"+this.language+"':'"+property+"' = > "+this[ this.language ][ property ]);
				return this[ this.language ][ property ]; 
			}  
			if (this[ this.languageDefault ].hasOwnProperty(property)){
				DEBUG.warn("warning: property '"+ property +"' in language "+ this.language +" not availeable. fallback to default "+ this.languageDefault);
				return this[ this.languageDefault ][ property ]; 
			}

			DEBUG.warn("error: property '"+ property +"' in neither in language "+ this.language +" and defaultlang '"+ this.languageDefault +"' availeable");
			return "--UNSET('"+ property +"')";
		}
};
/**
 * hier ist alles drin. von spielerdaten bis hin zu spielmechanik
 */
var gamemeta = {
	xpcurrent: parseInt($jq('#statsBarXPlabel_value').text().split("/")[0],10),
	xpnextlevel: parseInt($jq('#statsBarXPlabel_value').text().split("/")[1],10),
	level: parseInt($jq('#statsBarLevel .statsBarValue i').text().replaceNonDigit(),10),
	skillpointsavaileable: $jq('#statsBarLevel').hasClass("pulsate"),
	premium: parseInt($jq('#statsBarPremium .statsBarValue').text().replaceNonDigit(),10),
	tactics: parseInt($jq('#statsBarPvPEnergy .statsBarValue .statsBarValueCurrent').text().replaceNonDigit(),10),
	tacticsMax: parseInt($jq('#statsBarPvPEnergy .statsBarValue .statsBarValueMax').text().replaceNonDigit(),10),
	tacticsMin: 10,
	tacticsRegenerationTimeMax: 2*60,
	tacticsRegenerationTime: dateUtil.parseTime($jq('#statsBarPvPEnergy .statsBarLabel').text()),
	oil: parseInt($jq('#statsBarPvEEnergy .statsBarValue .statsBarValueCurrent').text().replaceNonDigit(),10),
	oilMax: parseInt($jq('#statsBarPvEEnergy .statsBarValue .statsBarValueMax').text().replaceNonDigit(),10),
	oilMin: 0,
	oilRegenerationTimeMax: 5*60,
	oilRegenerationTime: dateUtil.parseTime($jq('#statsBarPvEEnergy .statsBarLabel').text()),
	health: parseInt($jq('#statsBarHealth .statsBarValue .statsBarValueCurrent').text().replaceNonDigit(),10),
    healthMax: parseInt($jq('#statsBarHealth .statsBarValue .statsBarValueMax').text().replaceNonDigit(),10),
    healthMin: 25,
    healthRegenerationTimeMax: 3*60,
    healthRegenerationTimeMax:dateUtil.parseTime($jq('#statsBarHealth .statsBarLabel').text()),
    money: parseInt($jq('#statsBarBlood .statsBarValue').text().replaceNonDigit(),10),
	moneyMin: function(){
		var healthcostfactor =1;
		if (this.level>=1) healthcostfactor = 80;
		if (this.level>=100) healthcostfactor = 190;
		return this.level *(this.healthMax) * healthcostfactor*2; //should be enough for 2 medikits
	},
	moneyRegenerationTimeMax: 60*60,
	moneyRegenerationTime: dateUtil.parseTime($jq('.statsBarLabel_netto .statsBarLabel').text()),
    msgBox: $jq('.msgBox').filter(':eq(0)'),
    msgBoxStatus: $jq('.msgBox').filter(':eq(0)').find('div div h3'),
    msgBoxMessage: $jq('.msgBox').filter(':eq(0)').find('div div p'),
    amortisationTimeMax: 1500
};
mywindow.gamemeta = gamemeta;

function Player(code, status, id){
	this.c = code;
	this.s = status; //new n (default), confirmed c, invited i(0 or 1), nonexistent non
}

var mobcodes = {
	codelist: JSON.parse(GM_getValue("stoneagegameallycodes",'{}')), //existing
	//codearraylist: new ArrayList(),
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
			DEBUG.debug("---code '" +codetoadd+ "' already in codelist. status: " +this.codelist[ codetoadd ].s);
			return false; 
		}
	},
	clean: function(){
		for (var code in this.codelist){
			if (!this.codelist.hasOwnProperty(code)) continue;
			if (!this.isValid(code)) {
				console.warn(this.codelist[code]);
				delete this.codelist[code];
			}
			if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s == "non") {
				console.warn(this.codelist[code]);
				delete this.codelist[code];
			}
			if (code != code.toUpperCase()){
				DEBUG.warn("convert "+code+" to "+code.toUpperCase());
				this.codelist[code.toUpperCase()] = this.codelist[code];
				delete this.codelist[code];
			}
		}
		this.save();
	},
	isValid: function(code){
		return /([0-9a-zA-Z]{6})/.test(code) && !/([a-zA-Z]{6})/.test(code);
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
		GM_setValue("stoneagegameallycodes", JSON.stringify(this.codelist));
	},
	formatCode: function(code){
		code = code.toString().replace(/(\.| |,|-)/g ,"").trim().toUpperCase();
		return code;
	},
	parseAllycode: function(str) {
		if (typeof(str) != "string" || str.length === 0) return 0;
		str = " "+str.trim()+" ";
		DEBUG.debug("parseAllycode: "+str);
		var match,
			regex = XRegExp.globalize(/\b([A-Za-z0-9]{6})\b/),
			count = [ ];
			count.newCode = 0;
			count.knownCode = 0,
			matches = [];
			
		while (match = regex.exec(str)) {
			matches.push(match[1].toString());
		}
		matches = matches.unique(); //filter 
		for (var m in matches){
			if (matches.hasOwnProperty(m)){
				success = this.add(matches[m]);
				if (success) count.newCode++;
				else count.knownCode++;
			}
		}
		DEBUG.info("count of found codes; new: "+ count.newCode +" known: "+ count.knownCode+" in view: "+kata.path);
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
				return this.codelist[ code ].c; //first element with new will be returned
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
		$jq(target).append("<p >"+this.count("n")+"+"+this.count("c")+"+ ("+this.count("non")+")="+this.count("all")+"</p > ");	//needs too much time, probably because of the loop
	},
	parseBody: function () { 
		this.parseAllycode(mywindow.document.getElementsByTagName('body')[ 0 ].innerHTML.replace(/<( ?:.|\s)*? > /g,""));
	},
	searchCodes: function() {
		if (!empty(codetoadds_string)) mobcodes.parseAllycode(codetoadds_string);
		/*
		for (code in codetoadds_array) {
			mobcodes.parseAllycode(JSON.stringify(codetoadds_array[ code ]));
		}*/
		// add every textblock you want to parse
		
		//mobcodes.parseAllycode($jq('.broadcast a p').text()); //
		$jq('.broadcast a p').each(function(){
			mobcodes.parseAllycode($jq(this).text()); //
		});
		$jq('.comment a p').each(function(){
			mobcodes.parseAllycode($jq(this).text()); //
		});
		$jq('.commentMsg').each(function(){
			mobcodes.parseAllycode($jq(this).text()); //
		});
		mobcodes.save();
		mobcodes.printStatus('#statsBarXP');
		utils.refresh(kata.path, 30); // reload every 30 seconds and check new (variable, because here are different views checked
	},
	/**
	 * prueft auf der seite /clan die statusboxen und ordnet sie dem letzten invite zu
	 * TODO: potentieller bug: /clan darf nicht in mehreren tabs offen sein, da lastInvited sonst falsch sein kann
	 */
	check: function () {
		try {
			statustext = ""+gamemeta.msgBoxMessage.text();
			//DEBUG.debug("statustext: "+ statustext)
			if (!statustext) return false;
			switch(true){
			case (statustext.contains(loca.getString("invite/successfullyinvited")))://existence confirmed, new for me
			case (statustext.contains(loca.getString("invite/alreadymember")))://existence confirmed, known for me
				this.setStatus(this.getLastInvited(), "c"); 
				break;
			case (statustext.contains(loca.getString("invite/codenotfound")))://nonexistent
				this.setStatus(this.getLastInvited(), "non"); 
				break;
			case (statustext.contains(loca.getString("invite/cantinviteyourself"))):// myself
				this.setStatus(this.getLastInvited(), "self");
				break;
			default:
				this.setStatus(this.getLastInvited(), statustext);
				break;
			}
			
		}
		catch (err) {
			DEBUG.error(err);
		}	
	}
};
mywindow.mobcodes = mobcodes;

try  {
	
	$jq(document).ready(function () {
		loca.setLanguage("DE"); //automatisieren :) zB mit navigator.language - crossbrowser?!
		//DEBUG.setDebugLvl(2);
		DEBUG.setDebugLvl(4);
		switch (kata.view) {
		case 'home':
			mobcodes.searchCodes();
			break;
		case 'economy':
		    $jq("ul.listView").find('.panel').each(function(index, value) {
			if($jq(this).hasClass('premium')) $jq(this).hide();
			var income = $jq(this).find('.slaveItemValue_income').find('strong').html();
			    //alert(income);
			var vesz = $jq(this).find('.icon_blood').html();
			if (income != null && vesz != null) {
			    var szam1 = parseInt(vesz.replace(/\./gi,''));
			    var szam2 = parseInt(income.replace(/\./gi,''));
			    $jq(this).find('.buttons').prepend('<strong>' + szam1/szam2 + ' /pcs</strong>');
			}
		    });
		    break;//$("ul li:nth-child(2)")
		case 'enhancement':
		    var e = 0;
		    $jq("ul.listView").find('.listViewItem').each(function(index, value) {
			e++;
			var amount = $jq(this).find(".buttons .buttoncombi:nth-child(2)").find('[name="amount"]');
			var upkeep = $jq(this).find(".buttons .buttoncombi:nth-child(1)").find('.enhanceItemValue_upkeep');
			
			var btnExtend = $jq(this).find(".buttons .buttoncombi:nth-child(2)").find(".btnExtend");
			
			if (btnExtend.length!=0){
			  btnExtend.attr('id', 'btnExtend'+e);
			  upkeep.attr('id', 'upkeep'+e);
			  var re = new RegExp("[^0-9]", "g");
			  var pricePerPcs = $jq(this).find("#btnExtend"+e+" span").html();
			  if (upkeep.length!=0){
			    var upK = upkeep.find('strong').html();
			  } else { var upK = '0'; }
			  var ppp = pricePerPcs.replace(re,"") + "|" + upK.replace(re,"");
			  
			  var amountOptions = '<div style="clear: both; position:relative;"><input style="width: 25px; clear: both; float: left;" type="button" onclick="changeAmount(\'amount'+e+'\',\'-1\', \''+btnExtend.attr('id')+'\', \''+upkeep.attr('id')+'\', \''+ppp+'\')" value="-" id="neg'+e+'"><input style="width: 40px; float: left;" type="text" value="1" name="amount" id="amount'+e+'"><input style="width: 25px; float: left;" type="button" onclick="changeAmount(\'amount'+e+'\',\'1\', \''+btnExtend.attr('id')+'\', \''+upkeep.attr('id')+'\', \''+ppp+'\')" value="+" id="poz'+e+'"></div>';

			  amount.replaceWith(amountOptions);
			}
		    });
		    break;//$("ul li:nth-child(2)")
		case 'profile':
			mobcodes.searchCodes();
			switch(kata.action) {
			case 'skills':
				break;
			case 'info':
				break;
			case 'comments':
				userid = parseInt(kata.parameter("id"), 10);
				$jq("ul.tabs").prepend("<li><a id='previous' href='/profile/comments/id/"+(userid-1)+"'> "+loca.getString("label/previous")+"</a> </li> ");
				$jq("ul.tabs").append("<li><a id='next' href='/profile/comments/id/"+(userid+1)+"'> "+loca.getString("label/next")+"</a> </li> ");
				break;
			}				
			break;
		case 'clan':
			switch(kata.action) {
			case 'invite':
				if (gamemeta.msgBoxMessage.size() > 0) mobcodes.check(); 
				//break;
			case 'index':
				if (mobcodes.hasNext()){
					$jq('#inviteInput_clancode').val(mobcodes.getNext());
					mobcodes.printStatus('#tab1');
					mobcodes.save();
					utils.click("form[action*='/clan/invite'] input[type='submit']", 2*Math.random()+0.5);
					//setTimeout('$(".simpleForm").submit()', 2000*Math.random()+500);
				} else {
					utils.refresh('/clan', 30*60); // reload every 30 minutes and check new
				}
				break;
			case 'myclan':
				$jq('.contentBlock h4:first').before($jq('.pagination')[0].outerHTML); //blaetterfunktion auch ueber der tabelle
				break;
			case 'respond': //allyanfrage ablehnen/bestätigen
				break;
			}
			break;
		default:
			DEBUG.warn("unhandled view:"+kata.path);
			break;
		}
		
		$jq('a[href^="/profile/index/id/"]').each(function () {
			$jq(this).attr("href", $jq(this).attr("href").replace(/index/g,"comments"));
		});
		$jq('head').append('function formatNumberWithSeparator(numStr, separator) {'
		+ 'if (typeof separator != "undefined" && separator != "") {'
		+ '	numStr += "";'
		+ '	var regExp = /(\d+)(\d{3})/;'
		+ '	while (regExp.test(numStr)) {'
		+ '		numStr = numStr.replace(regExp, "$1" + separator + "$2");'
		+ '	}'
		+ '}'
		+ 'return numStr;'
		+ '}');
		$jq('head').append('<script type="text/javascript">function changeAmount(id, n, btn, upkeep, ppp) {'
		+ 'var inpAmount = $("ul.listView").find("#"+id).val();'
		+ 'var prices = ppp.split("|");'
		+ 'if(parseInt(inpAmount)>0 && n>0){inpAmount++;$("ul.listView").find("#"+id).val(inpAmount);}'
		+ 'else if(parseInt(inpAmount)>1 && n<0){inpAmount--;$("ul.listView").find("#"+id).val(inpAmount);}'
		+ 'var toBtn = prices[0] * $("ul.listView").find("#"+id).val();'
		+ '$("ul.listView").find("#"+btn+" span").html(formatNumberWithSeparator(toBtn,"."));'
		+ 'var toUpk = prices[1] * $("ul.listView").find("#"+id).val();'
		+ '$("ul.listView").find("#"+upkeep+" strong").html(formatNumberWithSeparator(toUpk,"."));'
		+ '}</script>');
	});
	
}
 catch (err)  {
	 console.error(err);
}

 try {
	$jq("body").removeClass("iscroll");
	$jq('#footer').css({'bottom':'0','left':'0','position':'fixed','z-index':'400'}); //causes an jQuery bug: name.replace is not a function on line 6725
}
 catch (err)  {
	console.log( err );
}