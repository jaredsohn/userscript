// ==UserScript==
// @name           Xhodon-AddOn
// @require        http://code.jquery.com/jquery-2.0.3.min.js
// @namespace      Xhodon
// @description    Addon for Xhodon
// @author         Friedrich Puelz, rewritten by nigr(A)ngelus, rewritten by Pitti68
// @email          fpuelz@gmx.de, nigroangelus@arcor.de, pitti68@go4more.de
// @license        GPL v2
// @include        http://*.xhodon.*
// @exclude        http://forum.xhodon.*
// @exclude        http://wiki*.xhodon.*
// @exclude        http://chat.xhodon.*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @grant          unsafeWindow
// @version        1.0.3
// @history        1.0.3   12/04/2013: calculates the total base values for war-camps and shows this in battle reports
// @history        1.0.2   12/04/2013: monitor capacity of the secret cave in the resource stock
// @history        1.0.1   12/04/2013: unused heroes can be hidden with name "---"
// @history        1.0     12/01/2013: full code revision, new design for battle reports, creeps are now classified by battle reports for better reference, heroes can be sorted by xp
// @history        0.3.23  09/05/2013: fixed: timing troubles, added: support for sitting
// @history        0.3.22  09/05/2013: insert mana production in summon time slider
// @history        0.3.21  08/27/2013: combat report analysis redesigned, some bugs fixed
// @history        0.3.20  08/27/2013: combat report analysis added
// @history        0.3.19  08/22/2013: extended guard preview with full victory range and hide defeat
// @history        0.3.18  08/22/2013: fixed errors: pushing limit calculation in conjunction with a new palace, message forwarding button
// @history        0.3.17  08/21/2013: pushing limit calculation including dealer conversion
// @history        0.3.16  08/20/2013: select heroes position in the map
// @history        0.3.15  08/19/2013: hide advertisement without magic account
// @history        0.3.14  08/18/2013: guard preview has a new design including rounds and heroes losses
// @history        0.3.13  08/17/2013: ress production now correct calculated for each world, elixir bonus in worlds without elixir now zero instead NaN-error
// @history        0.3.12  08/16/2013: elixir bonus and active dragons are now calculated correctly
// @history        0.3.11  08/14/2013: heroes skill bonus is now calculated correctly
// @history        0.3.10  08/14/2013: item-bonus is now calculated inside the unit tooltip
// @history        0.3.9   08/14/2013: added values for the ErobererWelt
// @history        0.3.8   08/13/2013: using hero_id instead of hero_name for using the same name for several heroes
// @history        0.3.8   08/13/2013: saving all data incl. settings per world
// @history        0.3.7   03/13/2013: includet guards till lv 17 in Feen
// @history        0.3.7   07/20/2011: just saving Ress, injecting gold value to Altar
// @history        0.3.6   04/12/2011: updated to new layout of xhodon, added new guard-infos (Lv.17), new update-routine
// @history        0.3.5   03/13/2011: fixed elv_magican (not shown before), fixed values for elv_magican doubleaxe_dwarf fire_fay for TrollWelt, fixed bug in guardian preview (works until W14 now), added server selection for guardian units (more work needed). thx to Caraliran!
// @history        0.3.4   11/25/2010: Provide different styles for unit tooltips and guard info, Store hero attributes and other data seperately for each world, allow to store settings only for the current world, different unit/guard values for each world, Changes from 'nigroangelus': Values for all guard units, values for units/guards in the fairy world, better guard info style
// @history        0.3.3   11/24/2010: The browser title can now be changed, using ext. script for update checking, now using GM_getValue/GM_setValue to store settings, more unit tooltip options
// @history        0.3.2   11/22/2010: AddOn settings are now available in the profile page through a new button under "Account settings", new values for the shaman hut (unicorns, storm faries).
// @history        0.3.1   11/20/2010: Nicer AddOn settings with tooltips, new unit values for the shaman hut (axe swinging dwarfs, double axe dwarfs, elven archer), formatted tick countdown.
// @history        0.3     11/19/2010: Addon settings can now be stored in a cookie, at the top left corner an "add-on" button is added, each feature can be enabled/disabled separately.
// @history        0.2     11/19/2010: Separate total values for units of the hero / in the cave and units in the palace, unit tooltips now additionaly display values of a single unit, in the "load hero" page the points are no longer added for all units (only in the tooltip), the script now doesn't not run sometimes any longer.
// @history        0.1.1   11/12/2010: Several optimizations (~6 times faster) + compiled with Google Closure Compiler.
// @history        0.1     11/11/2010: Initial version.
// ==/UserScript==

//****************************************************************************************************************************************************************
// globale Daten
//****************************************************************************************************************************************************************
var server="";
var server_name="";
var page={name:"",id:-1};
var palace="";
var hero={};
var summon_timer=-1;

var Ressi={};
var ItemBonus={};
var ElixirBonus={};
var Helden={};
var Wächter={};

//****************************************************************************************************************************************************************
// Einstellungen
//****************************************************************************************************************************************************************
var Settings={
	default:{
  	format_tick:true,           // Tick-Restzeit formatiert anzeigen
  	hide_advert:true,           // Werbung ohne Magie-Account ausblenden
  	unit_tooltips:true,         // Tooltip der einzelnen Wesen anzeigen
	  utt_strength_weakness:true, // Stärken und Schwächen der Wesen in den Tooltips anzeigen
	  utt_title:true,             // Titel und Bild der Wesen im Tooltip anzeigen
	  utt_speed:true,             // Geschwindigkeit der Wesen im Tooltip anzeigen
  	unit_totals:true,           // Gesamt-Wesen und Heldenwerte anzeigen
    guard_info:true,            // Wächtervorschau anzeigen
    guard_info_full:true,       // komplette Wächtervorschau
    guard_info_no_defeat:false, // Niederlage ausblenden
	  shaman:true,                // Extra-Infos für die Schamanenhütte
	  hero_sorting:true,          // Helden nach EP sortieren
	  hero_pos_to_map:true,       // Helden-Position in Karte übernehmen
  	res_calc:true,              // Produktionsberechnung zu den Produktionsgebäuden hinzufügen
  	cave_warning:false,         // Kapazität der Geheimen Grotte im Resourcenlager überwachen
	  br_info:true,               // umfassende Analyse der Kampfberichte hinzufügen
	  br_info_basedata:true,      // Basiswerte
	  br_info_shaman:true,        // Schamanenhütte
	  br_info_score:true,         // Machtpunkte
  },
  saved:{},
  data:{},
	showMenu:function() {
    var html_extra="<table class='dynamicTabs'><tr><td>";
    html_extra+="<a class='firstBtn firstBtn_selected'>";
    html_extra+="<table><tbody><tr>";
    html_extra+="<td class='btnStart'><div class='spacer'></div></td>";
    html_extra+="<td class='btnMidd'>Xhodon-Addon</td>";
    html_extra+="<td class='btnEnd'><div class='spacer'></div></td>";
    html_extra+="</tr></table>";
    html_extra+="</a>";
    html_extra+="</td></tr></table>";
		for(var i in this.featureSections) html_extra+=this.settingsTable(this.featureSections[i]);
    $("#content").html("<h1>Extra<small> - Einstellungen für das Xhodon-Addon</small></h1><div class='profileTableContent paddingContent'>"+html_extra+"</div>");
    $("#xAddon_format_tick").attr('checked',Settings.data.format_tick);
    $("#xAddon_hide_advert").attr('checked',Settings.data.hide_advert);
    $("#xAddon_unit_tooltips").attr('checked',Settings.data.unit_tooltips);
    $("#xAddon_utt_sub_title").attr('checked',Settings.data.utt_title);
    $("#xAddon_utt_sub_sw").attr('checked',Settings.data.utt_strength_weakness);
    $("#xAddon_utt_sub_speed").attr('checked',Settings.data.utt_speed);
    $("#xAddon_unit_totals").attr('checked',Settings.data.unit_totals);
    $("#xAddon_guard_info").attr('checked',Settings.data.guard_info);
    $("#xAddon_guard_info_full").attr('checked',Settings.data.guard_info_full);
    $("#xAddon_guard_info_no_defeat").attr('checked',Settings.data.guard_info_no_defeat);
    $("#xAddon_shaman").attr('checked',Settings.data.shaman);
    $("#xAddon_hero_sorting").attr('checked',Settings.data.hero_sorting);
    $("#xAddon_hero_pos_to_map").attr('checked',Settings.data.hero_pos_to_map);
    $("#xAddon_res_calc").attr('checked',Settings.data.res_calc);
    $("#xAddon_cave_warning").attr('checked',Settings.data.cave_warning);
    $("#xAddon_br_info").attr('checked',Settings.data.br_info);
    $("#xAddon_br_info_basedata").attr('checked',Settings.data.br_info_basedata);
    $("#xAddon_br_info_shaman").attr('checked',Settings.data.br_info_shaman);
    $("#xAddon_br_info_score").attr('checked',Settings.data.br_info_score);
		$(".xAddon_settingsGroup").each(function() {
			Settings.autoGroup(this);
		});
	},
  settingsTable:function(options) {
    options=$.extend({title:"",features:""},options);
    var html_extra="<table class='designedTable'>";
    html_extra+="<tr class='topBody'>";
    html_extra+="<td class='gray_first'>"+options.title+"</td>";
    html_extra+="</tr><tr>";
    html_extra+="<td class='white_first'><table>"
    if(typeof(options.features)=="string")
    	html_extra+=options.features;
    else
    	for (var i=0;i<options.features.length;i++) {html_extra+=this.settingsFeature(this.features[options.features[i]]);}
    html_extra+="</table></td>";
    html_extra+="</tr></table>";
    return html_extra;
  },
  settingsFeature:function(options,indentation) {
    options=$.extend({id:"xAddon_feature",group:"",type:"checkbox",text:"",tooltip:"",img:"",options:[],subcheckboxes:[]},options);
    if (typeof(indentation)=='undefined') indentation=0;
    var indent_style=(indentation>0)?("margin-left: "+(indentation*25)+"px;"):"";
    var t1="<tr><td style='text-align:center; width:25px;"+indent_style+"'>";
    var img=t1+AddHTML.addImage(options.img[0],options.img[1],options.img[2],options.img[3])+"</td><td>";
    switch (options.type) {
      case "checkbox":
      	var res=img;
      	res+="<input type='checkbox' id='"+options.id+"' class='"+options.group+"' style='"+indent_style+"'>";
      	res+="<label for='"+options.id+"' title='"+options.tooltip+"'> "+options.text+"</label>";
      	res+="</td></tr>";
        return res;
      case "checkbox_group":
        var res=img;
        if(options.group=="") options.group="xAddon_settingsGroup";
        res+="<input type='checkbox' id='"+options.id+"' class='"+options.group+"' onclick='autoGroup(this);' style='"+indent_style+"'>";
        res+="<label for='"+options.id+"' title='"+options.tooltip+"'> "+options.text+"</label>";
        res+="</td></tr>";
        for (i=0;i<options.subcheckboxes.length;++i) {
        	options.subcheckboxes[i].group=options.group+" "+options.id;
          res+=this.settingsFeature(options.subcheckboxes[i],indentation+1);
        }
        return res;
      case "select":
        var select_options="";
        for (var i=0;i<options.options.length;++i) {
          var option=$.extend({value:"",text:"",tooltip:""},options.options[i]);
          select_options+="<option value='"+option.value+"' title='"+option.tooltip+"'> "+option.text+"</option>";
        }
        var res=img;
        res+="<label for='"+options.id+"' style='"+indent_style+"'> "+options.text+":</label>";
        res+="<select id='"+options.id+"' title='"+options.tooltip+"' style='"+indent_style+"'>"+select_options+"</select>";
        res+="</td></tr>";
        return res;
      default: return "";
    }
  },
	features:{
    'xAddon_unit_tooltips':{
      id:"xAddon_unit_tooltips",
      text:"Einheiten-Tooltips",
      type:"checkbox_group",
      tooltip:"Einheiten-Tooltips anzeigen",
      subcheckboxes:[
        {
        	id:"xAddon_utt_sub_title",
        	text: "Titel anzeigen",
      		type:"checkbox",
        	tooltip:"Einen Titel mit grösserem Einheiten-Bild, Einheiten-Namen und der Anzahl anzeigen."
        },
        {
        	id:"xAddon_utt_sub_speed",
        	text:"Geschwindigkeit anzeigen",
      		type:"checkbox",
        	tooltip:"Geschwindigkeiten in den Tooltips anzeigen."
        },
        {
        	id:"xAddon_utt_sub_sw",
        	text:"St&auml;rken/Schw&auml;chen anzeigen",
      		type:"checkbox",
        	tooltip:"Stärken/Schwächen-Information in den Tooltips anzeigen."
        },
      ],
    },
    'xAddon_unit_totals':{
      id:"xAddon_unit_totals",
      text:"Gesamt-Einheiten-Werte anzeigen",
  		type:"checkbox",
      tooltip:"Zusammengerechnete Werte aller Einheiten beim Helden, im Palast und der geheimen Grotte anzeigen.",
      img:["direct","<big><b>&#8721;</b></big>"]
    },
    'xAddon_guard_info':{
      id:"xAddon_guard_info",
      text:"Wächter-Info anzeigen",
      type:"checkbox_group",
      tooltip: "Auf der Held Beladen-Seite werden zusätzliche Wächter-Info angezeigt.\nDie Wächter-Referenzen werden aus den KB ermittelt.",
      img:["unit","default"],
      subcheckboxes:[
        {
        	id:"xAddon_guard_info_full",
        	text: "komplette Wächter-Vorschau anzeigen",
      		type:"checkbox",
        	tooltip:"Die komplette Wächter-Vorschau ab sehr gutem Sieg anzeigen."
        },
        {
        	id:"xAddon_guard_info_no_defeat",
        	text:"Wächter bei Niederlage nicht anzeigen",
      		type:"checkbox",
        	tooltip:"Die Wächterstufe, bei der der Held unterlegen ist, nicht anzeigen."
        },
      ]
    },
    'xAddon_shaman':{
      id:"xAddon_shaman",
      text:"Extra-Infos in der Schamanhütte",
  		type:"checkbox",
      tooltip:"Zeigt weitere Infos in der Schamanenhütte an, z.B. insgesamt benötigte Pilze für die Wiederbelebung.",
      img:["image","mushrooms.png"]
    },
    'xAddon_hero_sorting':{
      id:"xAddon_hero_sorting",
      text:"Kampfhelden nach ihren EP sortieren",
  		type:"checkbox",
      tooltip:"Kampfhelden werden nach ihren Erfahrungspunkten sortiert angezeigt.",
    },
    'xAddon_hero_pos_to_map':{
      id:"xAddon_hero_pos_to_map",
      text:"Heldenposition ins Auge übernehmen",
  		type:"checkbox",
      tooltip:"Beim Wechsel vom Held ins Irre Auge wird die Position des Helden direkt eingestellt.",
    },
    'xAddon_res_calc':{
      id:"xAddon_res_calc",
      text:"Rohstoffe pro Stunde / Tag / beliebig anzeigen",
  		type:"checkbox",
      tooltip:"In den Rohstoff-Gebäude-Seiten werden Werte in andere Zeiteinheiten umgerechnet.",
      img:["image","essenz.png"]
    },
    'xAddon_cave_warning':{
      id:"xAddon_cave_warning",
      text:"Kapazität der Geheimen Grotte im Resourcenlager überwachen",
  		type:"checkbox",
      tooltip:"Warnt, wenn der Lagerinhalt nicht in die Geheime Grotte passt.",
    },
    'xAddon_br_info':{
      id:"xAddon_br_info",
      text:"zusätzliche Analyse der Kampfberichte",
      type:"checkbox_group",
      tooltip:"Zeigt zusätzliche Infos in den Kampfberichten.",
      subcheckboxes:[
        {
        	id:"xAddon_br_info_basedata",
        	text: "Basiswerte",
      		type:"checkbox",
        	tooltip:"Die Basiswerte aller beteiligten Einheiten werden angezeigt."
        },
        {
        	id:"xAddon_br_info_shaman",
        	text:"Schamanenhütte",
      		type:"checkbox",
        	tooltip:"Bedarf an Pilzen und Kraftsteinen sowie die zugehörigen Punkte werden angezeigt."
        },
        {
        	id:"xAddon_br_info_score",
        	text:"Machtliste",
      		type:"checkbox",
        	tooltip:"Die Gesamtpunktzahl für die Machtliste wird angezeigt."
        },
      ]
    },
    'xAddon_format_tick':{
      id:"xAddon_format_tick",
      text:"Tick-Countdown formatieren",
  		type:"checkbox",
      tooltip: "Den Tick-Countdown hervorheben.",
      img:["image","time/timeleft.gif"]
    },
    'xAddon_hide_advert':{
      id:"xAddon_hide_advert",
      text:"Werbung ausblenden",
  		type:"checkbox",
      tooltip: "Die Werbebanner auch ohne Magie-Account ausblenden."
    },
	},
  featureSections:{
  	"Funktionen":{
      title:"Funktionen",features:[
        'xAddon_unit_tooltips',
      	'xAddon_unit_totals',
      	'xAddon_guard_info',
      	'xAddon_shaman',
      	'xAddon_hero_sorting',
      	'xAddon_hero_pos_to_map',
      	'xAddon_res_calc',
      	'xAddon_cave_warning',
      	'xAddon_br_info',
      ],
    },
    "Layout":{
      title:"Layout",features:[
      	'xAddon_format_tick',
      	'xAddon_hide_advert',
      ],
    },
    "Speichern":{
      title:"Einstellungen speichern",
      features:"<input type='button' value='Speichern' onclick='saveAddonSettings();' class='stSubmitBtn' style='margin:10px;'>",
    },
  },
  autoGroup:function(cb) {
  	$("."+($(cb).attr("id"))).prop("disabled",!$(cb).is(':checked'));
  },
  saveSettings:function() {
    Settings.data.format_tick=$("#xAddon_format_tick").is(':checked');
    Settings.data.hide_advert=$("#xAddon_hide_advert").is(':checked');
    Settings.data.unit_tooltips=$("#xAddon_unit_tooltips").is(':checked');
    Settings.data.utt_title=$("#xAddon_utt_sub_title").is(':checked');
    Settings.data.utt_speed=$("#xAddon_utt_sub_speed").is(':checked');
    Settings.data.utt_strength_weakness=$("#xAddon_utt_sub_sw").is(':checked');
    Settings.data.unit_totals=$("#xAddon_unit_totals").is(':checked');
    Settings.data.guard_info=$("#xAddon_guard_info").is(':checked');
    Settings.data.guard_info_full=$("#xAddon_guard_info_full").is(':checked');
    Settings.data.guard_info_no_defeat=$("#xAddon_guard_info_no_defeat").is(':checked');
    Settings.data.shaman=$("#xAddon_shaman").is(':checked');
    Settings.data.hero_sorting=$("#xAddon_hero_sorting").is(':checked');
    Settings.data.hero_pos_to_map=$("#xAddon_hero_pos_to_map").is(':checked');
    Settings.data.res_calc=$("#xAddon_res_calc").is(':checked');
    Settings.data.cave_warning=$("#xAddon_cave_warning").is(':checked');
    Settings.data.br_info=$("#xAddon_br_info").is(':checked');
    Settings.data.br_info_basedata=$("#xAddon_br_info_basedata").is(':checked');
    Settings.data.br_info_shaman=$("#xAddon_br_info_shaman").is(':checked');
    Settings.data.br_info_score=$("#xAddon_br_info_score").is(':checked');
    setTimeout(function() {
    	GM_setValue(server+".Settings",DataIO.serialize(Settings.data));
    	window.location.reload(false);
    },1);
  },
};

//****************************************************************************************************************************************************************
// Daten laden und speichern
//****************************************************************************************************************************************************************
var DataIO={
	serialize:function(mixed_value) {
		var _getType=function (inp) {
			var type=typeof inp,match;
			var key;
			if (type=='object' && !inp) return 'null';
			if (type=="object") {
				if (!inp.constructor) return 'object';
				var cons=inp.constructor.toString();
				if (match=cons.match(/(\w+)\(/)) cons=match[1].toLowerCase();
				var types=["boolean","number","string","array"];
				for (key in types) {if (cons==types[key]) {type=types[key]; break;}}
			}
			return type;
		};
		var type=_getType(mixed_value);
		var val,ktype='';
		switch (type) {
		case "function": val=""; break;
		case "undefined": val="N"; break;
		case "boolean": val="b:"+(mixed_value?"1":"0"); break;
		case "number": val=(Math.round(mixed_value)==mixed_value?"i":"d")+":"+mixed_value; break;
		case "string": val="s:"+mixed_value.length+":\""+mixed_value+"\""; break;
		case "array":
		case "object":
			val="a";
			var count=0;
			var vals="";
			var okey;
			var key;
			for (key in mixed_value) {
				ktype=_getType(mixed_value[key]);
				if (ktype=="function") continue;
				okey=(key.toString().match(/^[0-9]+$/) ? parseInt(key) : key);
				vals+=this.serialize(okey)+this.serialize(mixed_value[key]);
				count++;
			}
			val+=":"+count+":{"+vals+"}"; break;
		}
		if (type!="object"&&type!="array") val+=";";
		return val;
	},
	unserialize:function(data) {
		var error=function(type,msg,filename,line) {throw new window[type](msg,filename,line);};
		var read_until=function (data,offset,stopchr) {
			var buf=[];
			var chr=data.slice(offset,offset+1);
			var i=2;
			var datalength=data.length;
			while(chr!=stopchr) {
				if ((i+offset)>datalength) error('Error','Invalid');
				buf.push(chr);
				chr=data.slice(offset+(i-1),offset+i);
				i+=1;
			}
			return [buf.length,buf.join('')];
		};
		var read_chrs=function(data,offset,length) {
			buf=[];
			for (var i=0; i<length; i++) {
				var chr=data.slice(offset+(i-1),offset+i);
				buf.push(chr);
			}
			return [buf.length,buf.join('')];
		};
		var _unserialize=function(data,offset) {
			if (!offset) offset=0;
			var buf=[];
			var dtype=(data.slice(offset,offset+1)).toLowerCase();
			var dataoffset=offset+2;
			var typeconvert=new Function('x','return x');
			var chrs=0;
			var datalength=0;
	
			switch (dtype) {
			case "i":
				typeconvert=new Function('x','return parseInt(x)');
				var readData=read_until(data,dataoffset,';');
				var chrs=readData[0];
				var readdata=readData[1];
				dataoffset+=chrs+1;
				break;
			case "b":
				typeconvert=new Function('x','return (parseInt(x)==1)');
				var readData=read_until(data,dataoffset,';');
				var chrs=readData[0];
				var readdata=readData[1];
				dataoffset+=chrs+1;
				break;
			case "d":
				typeconvert=new Function('x','return parseFloat(x)');
				var readData=read_until(data,dataoffset,';');
				var chrs=readData[0];
				var readdata=readData[1];
				dataoffset+=chrs+1;
				break;
			case "n":
				readdata=null;
				break;
			case "s":
				var ccount=read_until(data,dataoffset,':');
				var chrs=ccount[0];
				var stringlength=ccount[1];
				dataoffset+=chrs+2;
				var readData=read_chrs(data,dataoffset+1,parseInt(stringlength));
				var chrs=readData[0];
				var readdata=readData[1];
				dataoffset+=chrs+2;
				if (chrs!=parseInt(stringlength) && chrs!=readdata.length) {error('SyntaxError','String length mismatch');}
				break;
			case "a":
				var readdata={};
				var keyandchrs=read_until(data,dataoffset,':');
				var chrs=keyandchrs[0];
				var keys=keyandchrs[1];
				dataoffset+=chrs+2;
				for (var i=0; i<parseInt(keys); i++) {
					var kprops=_unserialize(data,dataoffset);
					var kchrs=kprops[1];
					var key=kprops[2];
					dataoffset+=kchrs;
					var vprops=_unserialize(data,dataoffset);
					var vchrs=vprops[1];
					var value=vprops[2];
					dataoffset+=vchrs;
					readdata[key]=value;
				}
				dataoffset+=1;
				break;
			default:
				error('SyntaxError','Unknown / Unhandled data type(s): '+dtype);
				break;
			}
			return [dtype,dataoffset-offset,typeconvert(readdata)];
		};
		return _unserialize(data,0)[2];
	},
};

//****************************************************************************************************************************************************************
// Daten konvertieren
//****************************************************************************************************************************************************************
var DataConvert={
	GetNumber:function(text) {
		if(text=="") return 0;
    return parseInt(text.replace(/\./g,''));
	},
  FormatNumber:function(number) {
    number=number+"";
    var i=number.length-3;
    while (i>0) {
      if (i==1&&number[0]=="-") break;
      number=number.substring(0,i)+"."+number.substring(i,number.length);
      i-=3;
    }
    return number;
  },
  FormatTPGNumber:function(speed,text) {
    var color;
    switch (speed) {
      case 1: color="#00cc00";break;
      case 2: color="#339900";break;
      case 3: color="#335500";break;
      case 4: color="#994400";break;
      case 5: color="#cc0000";break;
      default: return this.FormatNumber(speed);
    }
    return "<span style='color:"+color+";'>"+this.FormatNumber(speed)+text+"</span>";
  },
  FormatPercentage:function(number) {
    number+="";
    switch(number.length) {
    	case 0: number="000"; break;
    	case 1: number="00"+number; break;
    	case 2: number="0"+number; break;
    }
    number=number.substring(0,number.length-2)+"."+number.substring(number.length-2)+"%";
    return number;
  },
  FormatTimeFromTicks:function(ticks) {
    var minutes=ticks*BaseData.ticktime();
    var hours=Math.floor(minutes/60);
    minutes-=hours*60;
    return hours+":"+(minutes>=10?minutes:"0"+minutes);
  },
};

//****************************************************************************************************************************************************************
// Grunddaten der einzelnen Server
//****************************************************************************************************************************************************************
var BaseData={
	ticktime:function() {
		switch(server) {
			case "troll":
			case "zentauren":
			case "feen":
				return 5;
			case "drachen":
			case "eroberer":
				return 4;
			case "einhorn":
				return 1;
			default:
				return 0;
		}
	},
	pushingticks:function() {
		switch(server) {
			case "troll":
				return 0;
			case "zentauren":
				return 12*24*7*5;
			case "feen":
				return 12*24*7;
			case "drachen":
			case "eroberer":
				return 15*24*7;
			case "einhorn":
				return 60*24*7;
			default:
				return 0;
		}
	},
  maxGuardLevel:function() {
  	switch(server) {
  		case "troll":
  		case "zentauren":
  		case "feen":
  		  return 17;
  		case "drachen":
  		case "eroberer":
  		case "einhorn":
  		  return 9;
  		default:
  		  return 0;
    }
  },
  guardValues:function(guard_level) {
    switch (server) {
      case "troll":
        switch (guard_level) {
          case  1: return {  attack:           52,defense:           52,live:           150,unicorns:     10};
          case  2: return {  attack:          330,defense:          330,live:          1500,unicorns:     60};
          case  3: return {  attack:         2900,defense:         2900,live:         14000,unicorns:    600};
          case  4: return {  attack:        27000,defense:        27000,live:        105000,unicorns:   3000};
          case  5: return {  attack:       171000,defense:       171000,live:        660000,unicorns:  30000};
          case  6: return {  attack:       950000,defense:       950000,live:       2750000,unicorns: 150000};
          case  7: return {  attack:      3200000,defense:      3200000,live:      10500000,unicorns: 300000};
          case  8: return {  attack:      7900000,defense:      7900000,live:      35200000,unicorns: 500000};
          case  9: return {  attack:     16000000,defense:     16000000,live:      77100000,unicorns:1500000};
          case 10: return {  attack:    107000000,defense:    107000000,live:     455000000,unicorns:2500000};
          case 11: return {  attack:    365000000,defense:    365000000,live:    1550000000,unicorns:5500000};
          case 12: return {  attack:   1750000000,defense:   1750000000,live:    8300000000,unicorns:9999999};
          case 13: return {  attack:  11610000000,defense:  11610000000,live:   58650000000,unicorns:9999999};
          case 14: return {  attack:  74000000000,defense:  74000000000,live:  336000000000,unicorns:9999999};
          case 15: return {  attack: 250000000000,defense: 250000000000,live: 1300000000000,unicorns:9999999};
          case 16: return {  attack:1455000000000,defense:1455000000000,live: 5840000000000,unicorns:9999999};
          case 17: return {  attack:7100000000000,defense:7100000000000,live:36000000000000,unicorns:9999999};
        }
        return {attack:999999999999999,defense:999999999999999,live:999999999999999,unicorns:999999999999999};
      case "zentauren":
        switch (guard_level) {
          case  1: return {  attack:           25,           defense:25,      live:    170,   unicorns:  10};
          case  2: return {  attack:          175,          defense:175,      live:   1300,   unicorns:  30};
          case  3: return {  attack:         1800,         defense:1800,      live:  13000,   unicorns: 250};
          case  4: return {  attack:        31000,        defense:31000,      live: 205000,   unicorns: 800};
          case  5: return {  attack:       302000,       defense:302000,      live:2200000,   unicorns:3500};
          case  6: return {attack:      1000000, defense:      1000000, live:     7000000, unicorns:  16000};
          case  7: return {attack:      6800000, defense:      6800000, live:    51000000, unicorns:  55000};
          case  8: return {attack:     46000000, defense:     46000000, live:   334000000, unicorns: 160000};
          case  9: return {attack:    185000000, defense:    185000000, live:  1200000000, unicorns: 210000};
          case 10: return {attack:    600000000, defense:    600000000, live:  4000000000, unicorns: 400000};
          case 11: return {attack:   1800000000, defense:   1800000000, live: 12000000000, unicorns: 700000};
          case 12: return {attack:   4700000000, defense:   4700000000, live: 32000000000, unicorns: 660000};
          case 13: return {  attack:  12000000000, defense:  12000000000, live: 81000000000,                               unicorns: 0};
          case 14: return {attack:  26000000000, defense:  26000000000, live:163000000000, unicorns: 960000};
          case 15: return {  attack:  54000000000, defense:  54000000000, live:390000000000,                               unicorns: 0};
          case 16: return {  attack: 410000000000,    defense:410000000000,      live:2700000000000,unicorns:3500};
          case 17: return {  attack:1400000000000,    defense:1400000000000,     live:8700000000000,unicorns:3500};
        }
        return {attack:999999999999999,defense:999999999999999,live:999999999999999,unicorns:999999999999999};
      case "feen":
        switch (guard_level) {
          case  1: return {  attack:           25,           defense:25,      live:    170,   unicorns:  10};
          case  2: return {  attack:          175,          defense:175,      live:   1300,   unicorns:  30};
          case  3: return {  attack:         1800,         defense:1800,      live:  13000,   unicorns: 250};
          case  4: return {attack:        26000, defense:       26000, live:       170000,                                  unicorns: 800};
          case  5: return {attack:       320000, defense:      320000, live:      2300000, unicorns:    3500};
          case  6: return {  attack:      2800000,       defense:2800000,     live:22000000,   unicorns:22000};
          case  7: return {attack:     14000000, defense:    14000000, live:    110000000, unicorns:   50000};
          case  8: return {attack:    102000000, defense:   102000000, live:    765000000,                                   unicorns:172000};
          case  9: return {attack:    420000000, defense:   420000000, live:   2800000000,                                   unicorns:310000};
          case 10: return {attack:   1700000000, defense:  1700000000, live:  10600000000, unicorns:  500000};
          case 11: return {attack:   4700000000, defense:  4700000000, live:  31000000000, unicorns:  900000};
          case 12: return {attack:  12900000000, defense: 12900000000, live:  86000000000, unicorns: 1850000};
          case 13: return {attack:  33000000000, defense: 33000000000, live: 225000000000, unicorns: 2400000};
          case 14: return {attack:  84000000000, defense: 84000000000, live: 535000000000, unicorns: 3900000};
          case 15: return {attack: 155000000000, defense:155000000000, live:1100000000000, unicorns: 7000000};
          case 16: return {attack: 421000000000, defense:421000000000, live:2900000000000, unicorns: 8200000};
          case 17: return {attack:1200000000000, defense:1200000000000,live:7600000000000,                                    unicorns:0};
        }
        return {attack:999999999999999,defense:999999999999999,live:999999999999999,unicorns:999999999999999};
      case "drachen":
        switch (guard_level) {
          case 1: return {  attack:         25, defense:       25, live:     170, unicorns:     10};
          case 2: return {  attack:        120, defense:      140, live:    1000, unicorns:     30};
          case 3: return {  attack:       1600, defense:     2300, live:   15000, unicorns:    250};
          case 4: return {  attack:      21000, defense:    34000, live:  190000, unicorns:    900};
          case 5: return {  attack:       302000,       defense:302000,      live:2200000,unicorns:3500};
          case 6: return {  attack:      2800000,      defense:2800000,     live:22000000,unicorns:22000};
          case 7: return {  attack:     12000000,     defense:12000000,     live:90000000,unicorns:52000};
          case 8: return {  attack:     90000000,     defense:90000000,    live:660000000,unicorns:172000};
          case 9: return {  attack:    485000000,    defense:485000000,   live:3200000000,unicorns:310000};
        }
        return {attack:999999999999999,defense:999999999999999,live:999999999999999,unicorns:999999999999999};
      case "eroberer":
        switch (guard_level) {
          case 1: return {attack:         15, defense:       20, live:     140, unicorns:     10};
          case 2: return {attack:        150, defense:      200, live:    1300, unicorns:     35};
          case 3: return {attack:       1900, defense:     2300, live:   15000, unicorns:    190};
          case 4: return {attack:      26000, defense:    33000, live:  215000, unicorns:    790};
          case 5: return {attack:     246000, defense:   335000, live: 2300000, unicorns:   3600};
          case 6: return {  attack:      2800000,       defense:2800000,     live:22000000,unicorns:22000};
          case 7: return {  attack:     12000000,     defense:12000000,     live:90000000,unicorns:52000};
          case 8: return {  attack:     90000000,     defense:90000000,    live:660000000,unicorns:172000};
          case 9: return {  attack:    485000000,    defense:485000000,   live:3200000000,unicorns:310000};
        }
        return {attack:999999999999999,defense:999999999999999,live:999999999999999,unicorns:999999999999999};
      case "einhorn":
        switch (guard_level) {
          case 1: return {  attack:         25, defense:       25, live:     170, unicorns:     10};
          case 2: return {  attack:        120, defense:      140, live:    1000, unicorns:     30};
          case 3: return {  attack:       1600, defense:     2300, live:   15000, unicorns:    250};
          case 4: return {  attack:      21000, defense:    34000, live:  190000, unicorns:    900};
          case 5: return {  attack:       302000,       defense:302000,      live:2200000,unicorns:3500};
          case 6: return {  attack:      2800000,       defense:280000,     live:22000000,unicorns:22000};
          case 7: return {  attack:     12000000,     defense:12000000,     live:90000000,unicorns:52000};
          case 8: return {  attack:     90000000,     defense:90000000,    live:660000000,unicorns:172000};
          case 9: return {  attack:    485000000,    defense:485000000,   live:3200000000,unicorns:310000};
        }
        return {attack:999999999999999,defense:999999999999999,live:999999999999999,unicorns:999999999999999};
    }
  },
  unitData:{
  	"troll": { //TODO Werte anpassen
      "unicorn":               {id:"unicorn",              name:'Einhornwagen',            attack:  0,defense:  0,live:  20,speed: 1,points:  35,reviveMushrooms:  25,revivePowerStones:  1000,strength:"",weakness:"",s_data:[],w_data:[]},
      "dragon_egg":            {id:"dragon_egg",           name:'Dracheneier',             attack:  1,defense:  1,live:  80,speed: 4,points:2251,reviveMushrooms:3000,revivePowerStones:120000,strength:"",weakness:"",s_data:[],w_data:[]},
      "goblin":                {id:"goblin",               name:'Kobold',                  attack:  1,defense:  1,live:  25,speed: 3,points:   5,reviveMushrooms:   3,revivePowerStones:   120,strength:"",weakness:"",s_data:[],w_data:[]},
      "icewarrior":            {id:"icewarrior",           name:'Eiskrieger',              attack:  2,defense:  3,live:  50,speed: 3,points:  10,reviveMushrooms:   5,revivePowerStones:   200,strength:"",weakness:"",s_data:[],w_data:[]},
      "powerchild":            {id:"powerchild",           name:'Kinder der Macht',        attack:  3,defense:  3,live:  15,speed: 3,points:   6,reviveMushrooms:   3,revivePowerStones:   120,strength:"",weakness:"",s_data:[],w_data:[]},
      "hysterical_centauress": {id:"hysterical_centauress",name:'Hysterische Zentaurin',   attack:  4,defense:  4,live:  19,speed: 1,points:  12,reviveMushrooms:   7,revivePowerStones:   280,strength:"",weakness:"",s_data:[],w_data:[]},
      "warriorpriest":         {id:"warriorpriest",        name:'Kriegerpriester',         attack:  4,defense:  4,live:  65,speed: 2,points:  19,reviveMushrooms:  10,revivePowerStones:   400,strength:"",weakness:"",s_data:[],w_data:[]},
      "wild_centaur":          {id:"wild_centaur",         name:'Wilde Zentauren',         attack:  9,defense:  8,live:  31,speed: 1,points:  23,reviveMushrooms:  13,revivePowerStones:   520,strength:"",weakness:"",s_data:[],w_data:[]},
      "axe_swinging_dwarf":    {id:"axe_swinging_dwarf",   name:'Axtschwingende Zwerge',   attack:  6,defense:  7,live: 120,speed: 2,points:  35,reviveMushrooms:  19,revivePowerStones:   760,strength:"",weakness:"",s_data:[],w_data:[]},
      "elven_archer":          {id:"elven_archer",         name:'Elfenbogenschützen',      attack: 17,defense: 19,live:  64,speed: 2,points:  40,reviveMushrooms:  21,revivePowerStones:   840,strength:"",weakness:"",s_data:[],w_data:[]},
      "doubleaxe_dwarf":       {id:"doubleaxe_dwarf",      name:'Doppelaxtzwerge',         attack: 10,defense:  9,live: 182,speed: 3,points:  49,reviveMushrooms:  25,revivePowerStones:  1000,strength:"",weakness:"",s_data:[],w_data:[]},
      "singing_halfgiant":     {id:"singing_halfgiant",    name:'Singende Halbriesen',     attack: 16,defense: 17,live: 336,speed: 1,points: 105,reviveMushrooms:  58,revivePowerStones:  2320,strength:"",weakness:"",s_data:[],w_data:[]},
      "stone_throwing_troll":  {id:"stone_throwing_troll", name:'Steinwerfende Bergtrolle',attack: 34,defense: 31,live: 650,speed: 3,points: 154,reviveMushrooms:  81,revivePowerStones:  3240,strength:"",weakness:"",s_data:[],w_data:[]},
      "treegiant":             {id:"treegiant",            name:'Baumriese',               attack: 38,defense: 38,live: 144,speed: 3,points:  77,reviveMushrooms:  42,revivePowerStones:  1680,strength:"",weakness:"",s_data:[],w_data:[]},
      "elv_magican":           {id:"elv_magican",          name:'Elfenmagier',             attack: 47,defense: 47,live: 163,speed: 1,points: 122,reviveMushrooms:  65,revivePowerStones:  2600,strength:"",weakness:"",s_data:[],w_data:[]},
      "fire_fay":              {id:"fire_fay",             name:'Feuerfeen',               attack: 19,defense: 19,live:  23,speed: 1,points:  30,reviveMushrooms:  19,revivePowerStones:   760,strength:"",weakness:"",s_data:[],w_data:[]},
      "storm_faerie":          {id:"storm_faerie",         name:'Sturmfeen',               attack:  1,defense:  8,live:  65,speed: 1,points:  33,reviveMushrooms:  20,revivePowerStones:   800,strength:"",weakness:"",s_data:[],w_data:[]},
      "dragon":                {id:"dragon",               name:'Drache der Alten',        attack:  0,defense:  0,live: 100,speed:10,points:4502,reviveMushrooms:6000,revivePowerStones:240000,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_17":              {id:"creep_17",             name:"Salamander",              attack:  1,defense:  1,live:   4,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_18":              {id:"creep_18",             name:"Wurzelwichte",            attack:  0,defense:  1,live:   8,speed: 2,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_19":              {id:"creep_19",             name:"Fleischhummeln",          attack:  2,defense:  2,live:  12,speed: 4,points:   0,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_20":              {id:"creep_20",             name:"Skarabaeus",              attack:  2,defense:  2,live:  16,speed: 4,points:   0,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_21":              {id:"creep_21",             name:"Gnome",                   attack:  3,defense:  3,live:  20,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_22":              {id:"creep_22",             name:"Irrlichter",              attack:  3,defense:  3,live:  24,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_23":              {id:"creep_23",             name:"Skrälinge",               attack:  4,defense:  4,live:  28,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_24":              {id:"creep_24",             name:"Warzengiftratten",        attack:  4,defense:  4,live:  32,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_25":              {id:"creep_25",             name:"Sylphen",                 attack:  5,defense:  5,live:  36,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_26":              {id:"creep_26",             name:"Midgardschlangen",        attack:  0,defense:  5,live:  20,speed: 2,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_27":              {id:"creep_27",             name:"Nymphen",                 attack:  6,defense:  6,live:  48,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_28":              {id:"creep_28",             name:"Schlingpflanzen",         attack:  7,defense:  7,live:  53,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_29":              {id:"creep_29",             name:"Meerjungfrauen",          attack:  8,defense:  8,live:  59,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_30":              {id:"creep_30",             name:"Werwölfe",                attack:  9,defense:  9,live:  62,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_31":              {id:"creep_31",             name:"Gorgonen",                attack: 10,defense: 10,live:  73,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_32":              {id:"creep_32",             name:"Harpien",                 attack: 11,defense: 11,live:  77,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_33":              {id:"creep_33",             name:"Weißadler",               attack: 12,defense: 12,live:  97,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_34":              {id:"creep_34",             name:"Morlocks",                attack: 13,defense: 13,live: 110,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_35":              {id:"creep_35",             name:"Riesen Marokspinnen",     attack: 14,defense: 14,live: 121,speed: 4,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_36":              {id:"creep_36",             name:"Feuerteufel",             attack:  0,defense: 15,live:  30,speed: 2,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_37":              {id:"creep_37",             name:"Fenriswolf",              attack: 16,defense: 16,live: 132,speed: 4,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_38":              {id:"creep_38",             name:"Dämon",                   attack: 17,defense: 17,live: 143,speed: 4,points:   5,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_39":              {id:"creep_39",             name:"Horngolems",              attack: 18,defense: 18,live: 154,speed: 5,points:   5,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_40":              {id:"creep_40",             name:"Sonnenpferde",            attack: 19,defense: 19,live: 165,speed: 5,points:   6,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_41":              {id:"creep_41",             name:"Minotauren",              attack: 20,defense: 20,live: 187,speed: 5,points:   6,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_42":              {id:"creep_42",             name:"Greifen",                 attack: 22,defense: 22,live: 209,speed: 5,points:   7,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_43":              {id:"creep_43",             name:"Blutalben",               attack: 23,defense: 23,live: 222,speed: 5,points:   7,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_44":              {id:"creep_44",             name:"Zyklopen",                attack:  0,defense: 25,live:  40,speed: 2,points:   8,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_45":              {id:"creep_45",             name:"Mantikoren",              attack: 28,defense: 28,live: 265,speed: 5,points:   9,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_46":              {id:"creep_46",             name:"Behemoth",                attack: 35,defense: 35,live: 300,speed: 5,points:  10,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_47":              {id:"creep_47",             name:"Oger",                    attack: 40,defense: 40,live: 345,speed: 5,points:  12,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_48":              {id:"creep_48",             name:"Sandwürmer",              attack: 50,defense: 50,live: 450,speed: 5,points:  15,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_49":              {id:"creep_49",             name:"Todesengel",              attack:  0,defense: 60,live: 100,speed: 2,points:  20,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_50":              {id:"creep_50",             name:"Goldene Sphinx",          attack: 80,defense: 80,live: 750,speed: 5,points:  24,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_51":              {id:"creep_51",             name:"Feuerstacheldrachen",     attack:100,defense:100,live: 840,speed: 5,points:  30,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_52":              {id:"creep_52",             name:"Eisaugendrachen",         attack:150,defense:150,live:1100,speed: 5,points:  40,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_53":              {id:"creep_53",             name:"Schlangenhalsdrachen",    attack:200,defense:200,live:1400,speed: 5,points:  50,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
    },
  	"zentauren": {
      "unicorn":               {id:"unicorn",              name:'Einhornwagen',            attack:  0,defense:  0,live:  20,speed: 2,points:   7,reviveMushrooms:   3,revivePowerStones:   120,strength:"",weakness:"",s_data:[],w_data:[]},
      "dragon_egg":            {id:"dragon_egg",           name:'Dracheneier',             attack:  1,defense:  1,live:  80,speed: 5,points:2251,reviveMushrooms:3000,revivePowerStones:120000,strength:"",weakness:"",s_data:[],w_data:[]},
      "goblin":                {id:"goblin",               name:'Kobold',                  attack:  1,defense:  1,live:  25,speed: 4,points:   5,reviveMushrooms:   3,revivePowerStones:   120,strength:"",weakness:"",s_data:[],w_data:[]},
      "icewarrior":            {id:"icewarrior",           name:'Eiskrieger',              attack:  2,defense:  3,live:  50,speed: 5,points:  10,reviveMushrooms:   5,revivePowerStones:   200,strength:"",weakness:"",s_data:[],w_data:[]},
      "powerchild":            {id:"powerchild",           name:'Kinder der Macht',        attack:  3,defense:  3,live:  15,speed: 5,points:   6,reviveMushrooms:   3,revivePowerStones:   120,strength:"",weakness:"",s_data:[],w_data:[]},
      "hysterical_centauress": {id:"hysterical_centauress",name:'Hysterische Zentaurin',   attack:  4,defense:  4,live:  19,speed: 3,points:  11,reviveMushrooms:   7,revivePowerStones:   280,strength:"",weakness:"",s_data:[],w_data:[]},
      "warriorpriest":         {id:"warriorpriest",        name:'Kriegerpriester',         attack:  4,defense:  4,live:  65,speed: 4,points:  17,reviveMushrooms:  10,revivePowerStones:   400,strength:"",weakness:"",s_data:[],w_data:[]},
      "wild_centaur":          {id:"wild_centaur",         name:'Wilde Zentauren',         attack:  9,defense:  8,live:  31,speed: 3,points:  21,reviveMushrooms:  13,revivePowerStones:   520,strength:"",weakness:"",s_data:[],w_data:[]},
      "axe_swinging_dwarf":    {id:"axe_swinging_dwarf",   name:'Axtschwingende Zwerge',   attack:  6,defense:  7,live: 120,speed: 4,points:  32,reviveMushrooms:  19,revivePowerStones:   760,strength:"",weakness:"",s_data:[],w_data:[]},
      "elven_archer":          {id:"elven_archer",         name:'Elfenbogenschützen',      attack: 15,defense: 17,live:  58,speed: 4,points:  36,reviveMushrooms:  21,revivePowerStones:   840,strength:"",weakness:"",s_data:[],w_data:[]},
      "doubleaxe_dwarf":       {id:"doubleaxe_dwarf",      name:'Doppelaxtzwerge',         attack:  9,defense:  8,live: 165,speed: 5,points:  43,reviveMushrooms:  25,revivePowerStones:  1000,strength:"",weakness:"",s_data:[],w_data:[]},
      "singing_halfgiant":     {id:"singing_halfgiant",    name:'Singende Halbriesen',     attack: 13,defense: 14,live: 280,speed: 3,points:  96,reviveMushrooms:  58,revivePowerStones:  2320,strength:"",weakness:"",s_data:[],w_data:[]},
      "stone_throwing_troll":  {id:"stone_throwing_troll", name:'Steinwerfende Bergtrolle',attack: 26,defense: 24,live: 500,speed: 5,points: 135,reviveMushrooms:  81,revivePowerStones:  3240,strength:"",weakness:"",s_data:[],w_data:[]},
      "treegiant":             {id:"treegiant",            name:'Baumriese',               attack: 32,defense: 32,live: 120,speed: 5,points:  70,reviveMushrooms:  42,revivePowerStones:  1680,strength:"",weakness:"",s_data:[],w_data:[]},
      "elv_magican":           {id:"elv_magican",          name:'Elfenmagier',             attack: 36,defense: 36,live: 125,speed: 3,points: 108,reviveMushrooms:  65,revivePowerStones:  2600,strength:"",weakness:"",s_data:[],w_data:[]},
      "fire_fay":              {id:"fire_fay",             name:'Feuerfeen',               attack: 19,defense: 19,live:  23,speed: 3,points:  30,reviveMushrooms:  19,revivePowerStones:   760,strength:"",weakness:"",s_data:[],w_data:[]},
      "storm_faerie":          {id:"storm_faerie",         name:'Sturmfeen',               attack:  1,defense:  8,live:  65,speed: 2,points:  33,reviveMushrooms:  20,revivePowerStones:   800,strength:"",weakness:"",s_data:[],w_data:[]},
      "dragon":                {id:"dragon",               name:'Drache der Alten',        attack:  0,defense:  0,live: 100,speed:10,points:4502,reviveMushrooms:6000,revivePowerStones:240000,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_17":              {id:"creep_17",             name:"Salamander",              attack:  1,defense:  1,live:   4,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_18":              {id:"creep_18",             name:"Wurzelwichte",            attack:  1,defense:  1,live:   8,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_19":              {id:"creep_19",             name:"Fleischhummeln",          attack:  2,defense:  2,live:  12,speed: 4,points:   0,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_20":              {id:"creep_20",             name:"Skarabaeus",              attack:  2,defense:  2,live:  16,speed: 4,points:   0,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_21":              {id:"creep_21",             name:"Gnome",                   attack:  3,defense:  3,live:  20,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_22":              {id:"creep_22",             name:"Irrlichter",              attack:  3,defense:  3,live:  24,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_23":              {id:"creep_23",             name:"Skrälinge",               attack:  4,defense:  4,live:  28,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_24":              {id:"creep_24",             name:"Warzengiftratten",        attack:  4,defense:  4,live:  32,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_25":              {id:"creep_25",             name:"Sylphen",                 attack:  5,defense:  5,live:  36,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_26":              {id:"creep_26",             name:"Midgardschlangen",        attack:  5,defense:  5,live:  40,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_27":              {id:"creep_27",             name:"Nymphen",                 attack:  6,defense:  6,live:  44,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_28":              {id:"creep_28",             name:"Schlingpflanzen",         attack:  7,defense:  7,live:  48,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_29":              {id:"creep_29",             name:"Meerjungfrauen",          attack:  8,defense:  8,live:  52,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_30":              {id:"creep_30",             name:"Werwölfe",                attack:  9,defense:  9,live:  56,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_31":              {id:"creep_31",             name:"Gorgonen",                attack: 10,defense: 10,live:  66,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_32":              {id:"creep_32",             name:"Harpien",                 attack: 11,defense: 11,live:  70,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_33":              {id:"creep_33",             name:"Weißadler",               attack: 12,defense: 12,live:  88,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_34":              {id:"creep_34",             name:"Morlocks",                attack: 13,defense: 13,live: 100,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_35":              {id:"creep_35",             name:"Riesen Marokspinnen",     attack: 14,defense: 14,live: 110,speed: 4,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_36":              {id:"creep_36",             name:"Feuerteufel",             attack: 15,defense: 15,live:  90,speed: 4,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_37":              {id:"creep_37",             name:"Fenriswolf",              attack: 16,defense: 16,live: 120,speed: 4,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_38":              {id:"creep_38",             name:"Dämon",                   attack: 17,defense: 17,live: 130,speed: 4,points:   5,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_39":              {id:"creep_39",             name:"Horngolems",              attack: 18,defense: 18,live: 140,speed: 5,points:   5,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_40":              {id:"creep_40",             name:"Sonnenpferde",            attack: 19,defense: 19,live: 150,speed: 5,points:   6,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_41":              {id:"creep_41",             name:"Minotauren",              attack: 20,defense: 20,live: 170,speed: 5,points:   6,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_42":              {id:"creep_42",             name:"Greifen",                 attack: 22,defense: 22,live: 190,speed: 5,points:   7,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_43":              {id:"creep_43",             name:"Blutalben",               attack: 23,defense: 23,live: 210,speed: 5,points:   7,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_44":              {id:"creep_44",             name:"Zyklopen",                attack: 25,defense: 25,live: 160,speed: 5,points:   8,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_45":              {id:"creep_45",             name:"Mantikoren",              attack: 28,defense: 28,live: 230,speed: 5,points:   9,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_46":              {id:"creep_46",             name:"Behemoth",                attack: 35,defense: 35,live: 260,speed: 5,points:  10,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_47":              {id:"creep_47",             name:"Oger",                    attack: 40,defense: 40,live: 300,speed: 5,points:  12,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_48":              {id:"creep_48",             name:"Sandwürmer",              attack: 50,defense: 50,live: 390,speed: 5,points:  15,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_49":              {id:"creep_49",             name:"Todesengel",              attack: 60,defense: 60,live: 400,speed: 5,points:  20,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_50":              {id:"creep_50",             name:"Goldene Sphinx",          attack: 80,defense: 80,live: 630,speed: 5,points:  24,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_51":              {id:"creep_51",             name:"Feuerstacheldrachen",     attack:100,defense:100,live: 700,speed: 5,points:  30,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_52":              {id:"creep_52",             name:"Eisaugendrachen",         attack:150,defense:150,live: 920,speed: 5,points:  40,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_53":              {id:"creep_53",             name:"Schlangenhalsdrachen",    attack:200,defense:200,live:1200,speed: 5,points:  50,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
    },
  	"feen": {
      "unicorn":               {id:"unicorn",              name:'Einhornwagen',            attack:  0,defense:  0,live:  20,speed: 2,points:   7,reviveMushrooms:   3,revivePowerStones:   120,strength:"",weakness:"",s_data:[],w_data:[]},
      "dragon_egg":            {id:"dragon_egg",           name:'Dracheneier',             attack:  1,defense:  1,live:  80,speed: 4,points:2251,reviveMushrooms:3000,revivePowerStones:120000,strength:"",weakness:"",s_data:[],w_data:[]},
      "goblin":                {id:"goblin",               name:'Kobold',                  attack:  1,defense:  1,live:  25,speed: 4,points:   5,reviveMushrooms:   3,revivePowerStones:   120,strength:"",weakness:"",s_data:[],w_data:[]},
      "icewarrior":            {id:"icewarrior",           name:'Eiskrieger',              attack:  2,defense:  3,live:  50,speed: 4,points:  10,reviveMushrooms:   5,revivePowerStones:   200,strength:"",weakness:"",s_data:[],w_data:[]},
      "powerchild":            {id:"powerchild",           name:'Kinder der Macht',        attack:  3,defense:  3,live:  15,speed: 4,points:   6,reviveMushrooms:   3,revivePowerStones:   120,strength:"",weakness:"",s_data:[],w_data:[]},
      "hysterical_centauress": {id:"hysterical_centauress",name:'Hysterische Zentaurin',   attack:  4,defense:  4,live:  19,speed: 2,points:  12,reviveMushrooms:   7,revivePowerStones:   280,strength:"",weakness:"",s_data:[],w_data:[]},
      "warriorpriest":         {id:"warriorpriest",        name:'Kriegerpriester',         attack:  4,defense:  4,live:  65,speed: 3,points:  19,reviveMushrooms:  10,revivePowerStones:   400,strength:"",weakness:"",s_data:[],w_data:[]},
      "wild_centaur":          {id:"wild_centaur",         name:'Wilde Zentauren',         attack:  9,defense:  8,live:  31,speed: 2,points:  23,reviveMushrooms:  13,revivePowerStones:   520,strength:"",weakness:"",s_data:[],w_data:[]},
      "axe_swinging_dwarf":    {id:"axe_swinging_dwarf",   name:'Axtschwingende Zwerge',   attack:  6,defense:  7,live: 120,speed: 3,points:  35,reviveMushrooms:  19,revivePowerStones:   760,strength:"",weakness:"",s_data:[],w_data:[]},
      "elven_archer":          {id:"elven_archer",         name:'Elfenbogenschützen',      attack: 17,defense: 19,live:  64,speed: 3,points:  40,reviveMushrooms:  21,revivePowerStones:   840,strength:"",weakness:"",s_data:[],w_data:[]},
      "doubleaxe_dwarf":       {id:"doubleaxe_dwarf",      name:'Doppelaxtzwerge',         attack: 10,defense:  9,live: 182,speed: 4,points:  49,reviveMushrooms:  25,revivePowerStones:  1000,strength:"",weakness:"",s_data:[],w_data:[]},
      "singing_halfgiant":     {id:"singing_halfgiant",    name:'Singende Halbriesen',     attack: 16,defense: 17,live: 336,speed: 2,points: 105,reviveMushrooms:  58,revivePowerStones:  2320,strength:"",weakness:"",s_data:[],w_data:[]},
      "stone_throwing_troll":  {id:"stone_throwing_troll", name:'Steinwerfende Bergtrolle',attack: 34,defense: 31,live: 650,speed: 4,points: 154,reviveMushrooms:  81,revivePowerStones:  3240,strength:"",weakness:"",s_data:[],w_data:[]},
      "treegiant":             {id:"treegiant",            name:'Baumriese',               attack: 38,defense: 38,live: 144,speed: 4,points:  77,reviveMushrooms:  42,revivePowerStones:  1680,strength:"",weakness:"",s_data:[],w_data:[]},
      "elv_magican":           {id:"elv_magican",          name:'Elfenmagier',             attack: 47,defense: 47,live: 163,speed: 2,points: 122,reviveMushrooms:  65,revivePowerStones:  2600,strength:"",weakness:"",s_data:[],w_data:[]},
      "fire_fay":              {id:"fire_fay",             name:'Feuerfeen',               attack: 19,defense: 19,live:  23,speed: 2,points:  30,reviveMushrooms:  19,revivePowerStones:   760,strength:"",weakness:"",s_data:[],w_data:[]},
      "storm_faerie":          {id:"storm_faerie",         name:'Sturmfeen',               attack:  1,defense:  8,live:  65,speed: 1,points:  33,reviveMushrooms:  20,revivePowerStones:   800,strength:"",weakness:"",s_data:[],w_data:[]},
      "dragon":                {id:"dragon",               name:'Drache der Alten',        attack:  0,defense:  0,live: 100,speed:10,points:4502,reviveMushrooms:6000,revivePowerStones:240000,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_17":              {id:"creep_17",             name:"Salamander",              attack:  1,defense:  1,live:   4,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_18":              {id:"creep_18",             name:"Wurzelwichte",            attack:  1,defense:  1,live:   8,speed: 3,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_19":              {id:"creep_19",             name:"Fleischhummeln",          attack:  2,defense:  2,live:  12,speed: 4,points:   0,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_20":              {id:"creep_20",             name:"Skarabaeus",              attack:  2,defense:  2,live:  16,speed: 4,points:   0,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_21":              {id:"creep_21",             name:"Gnome",                   attack:  3,defense:  3,live:  20,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_22":              {id:"creep_22",             name:"Irrlichter",              attack:  3,defense:  3,live:  24,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_23":              {id:"creep_23",             name:"Skrälinge",               attack:  4,defense:  4,live:  28,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_24":              {id:"creep_24",             name:"Warzengiftratten",        attack:  4,defense:  4,live:  32,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_25":              {id:"creep_25",             name:"Sylphen",                 attack:  5,defense:  5,live:  36,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_26":              {id:"creep_26",             name:"Midgardschlangen",        attack:  5,defense:  5,live:  40,speed: 3,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_27":              {id:"creep_27",             name:"Nymphen",                 attack:  6,defense:  6,live:  44,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_28":              {id:"creep_28",             name:"Schlingpflanzen",         attack:  7,defense:  7,live:  48,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_29":              {id:"creep_29",             name:"Meerjungfrauen",          attack:  8,defense:  8,live:  52,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_30":              {id:"creep_30",             name:"Werwölfe",                attack:  9,defense:  9,live:  56,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_31":              {id:"creep_31",             name:"Gorgonen",                attack: 10,defense: 10,live:  66,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_32":              {id:"creep_32",             name:"Harpien",                 attack: 11,defense: 11,live:  70,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_33":              {id:"creep_33",             name:"Weißadler",               attack: 12,defense: 12,live:  88,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_34":              {id:"creep_34",             name:"Morlocks",                attack: 13,defense: 13,live: 100,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_35":              {id:"creep_35",             name:"Riesen Marokspinnen",     attack: 14,defense: 14,live: 110,speed: 4,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_36":              {id:"creep_36",             name:"Feuerteufel",             attack: 15,defense: 15,live:  90,speed: 3,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_37":              {id:"creep_37",             name:"Fenriswolf",              attack: 16,defense: 16,live: 120,speed: 4,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_38":              {id:"creep_38",             name:"Dämon",                   attack: 17,defense: 17,live: 130,speed: 4,points:   5,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_39":              {id:"creep_39",             name:"Horngolems",              attack: 18,defense: 18,live: 140,speed: 5,points:   5,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_40":              {id:"creep_40",             name:"Sonnenpferde",            attack: 19,defense: 19,live: 150,speed: 5,points:   6,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_41":              {id:"creep_41",             name:"Minotauren",              attack: 20,defense: 20,live: 170,speed: 5,points:   6,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_42":              {id:"creep_42",             name:"Greifen",                 attack: 22,defense: 22,live: 190,speed: 5,points:   7,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_43":              {id:"creep_43",             name:"Blutalben",               attack: 23,defense: 23,live: 210,speed: 5,points:   7,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_44":              {id:"creep_44",             name:"Zyklopen",                attack: 25,defense: 25,live: 160,speed: 4,points:   8,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_45":              {id:"creep_45",             name:"Mantikoren",              attack: 28,defense: 28,live: 230,speed: 5,points:   9,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_46":              {id:"creep_46",             name:"Behemoth",                attack: 35,defense: 35,live: 260,speed: 5,points:  10,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_47":              {id:"creep_47",             name:"Oger",                    attack: 40,defense: 40,live: 300,speed: 5,points:  12,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_48":              {id:"creep_48",             name:"Sandwürmer",              attack: 50,defense: 50,live: 390,speed: 5,points:  15,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_49":              {id:"creep_49",             name:"Todesengel",              attack: 60,defense: 60,live: 400,speed: 4,points:  20,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_50":              {id:"creep_50",             name:"Goldene Sphinx",          attack: 80,defense: 80,live: 630,speed: 5,points:  24,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_51":              {id:"creep_51",             name:"Feuerstacheldrachen",     attack:100,defense:100,live: 700,speed: 5,points:  30,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_52":              {id:"creep_52",             name:"Eisaugendrachen",         attack:150,defense:150,live: 920,speed: 5,points:  40,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_53":              {id:"creep_53",             name:"Schlangenhalsdrachen",    attack:200,defense:200,live:1200,speed: 5,points:  50,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
    },
  	"drachen": { //TODO Werte anpassen
      "unicorn":               {id:"unicorn",              name:'Einhornwagen',            attack:  0,defense:  0,live:  20,speed: 1,points:  35,reviveMushrooms:  25,revivePowerStones:  1000,strength:"",weakness:"",s_data:[],w_data:[]},
      "dragon_egg":            {id:"dragon_egg",           name:'Dracheneier',             attack:  1,defense:  1,live:  80,speed: 4,points:2251,reviveMushrooms:3000,revivePowerStones:120000,strength:"",weakness:"",s_data:[],w_data:[]},
      "goblin":                {id:"goblin",               name:'Kobold',                  attack:  1,defense:  1,live:  25,speed: 3,points:   5,reviveMushrooms:   3,revivePowerStones:   120,strength:"",weakness:"",s_data:[],w_data:[]},
      "icewarrior":            {id:"icewarrior",           name:'Eiskrieger',              attack:  2,defense:  3,live:  50,speed: 3,points:  10,reviveMushrooms:   5,revivePowerStones:   200,strength:"",weakness:"",s_data:[],w_data:[]},
      "powerchild":            {id:"powerchild",           name:'Kinder der Macht',        attack:  3,defense:  3,live:  15,speed: 3,points:   6,reviveMushrooms:   3,revivePowerStones:   120,strength:"",weakness:"",s_data:[],w_data:[]},
      "hysterical_centauress": {id:"hysterical_centauress",name:'Hysterische Zentaurin',   attack:  4,defense:  4,live:  19,speed: 1,points:  12,reviveMushrooms:   7,revivePowerStones:   280,strength:"",weakness:"",s_data:[],w_data:[]},
      "warriorpriest":         {id:"warriorpriest",        name:'Kriegerpriester',         attack:  4,defense:  4,live:  65,speed: 2,points:  19,reviveMushrooms:  10,revivePowerStones:   400,strength:"",weakness:"",s_data:[],w_data:[]},
      "wild_centaur":          {id:"wild_centaur",         name:'Wilde Zentauren',         attack:  9,defense:  8,live:  31,speed: 1,points:  23,reviveMushrooms:  13,revivePowerStones:   520,strength:"",weakness:"",s_data:[],w_data:[]},
      "axe_swinging_dwarf":    {id:"axe_swinging_dwarf",   name:'Axtschwingende Zwerge',   attack:  6,defense:  7,live: 120,speed: 2,points:  35,reviveMushrooms:  19,revivePowerStones:   760,strength:"",weakness:"",s_data:[],w_data:[]},
      "elven_archer":          {id:"elven_archer",         name:'Elfenbogenschützen',      attack: 17,defense: 19,live:  64,speed: 2,points:  40,reviveMushrooms:  21,revivePowerStones:   840,strength:"",weakness:"",s_data:[],w_data:[]},
      "doubleaxe_dwarf":       {id:"doubleaxe_dwarf",      name:'Doppelaxtzwerge',         attack: 10,defense:  9,live: 182,speed: 3,points:  49,reviveMushrooms:  25,revivePowerStones:  1000,strength:"",weakness:"",s_data:[],w_data:[]},
      "singing_halfgiant":     {id:"singing_halfgiant",    name:'Singende Halbriesen',     attack: 16,defense: 17,live: 336,speed: 1,points: 105,reviveMushrooms:  58,revivePowerStones:  2320,strength:"",weakness:"",s_data:[],w_data:[]},
      "stone_throwing_troll":  {id:"stone_throwing_troll", name:'Steinwerfende Bergtrolle',attack: 34,defense: 31,live: 650,speed: 3,points: 154,reviveMushrooms:  81,revivePowerStones:  3240,strength:"",weakness:"",s_data:[],w_data:[]},
      "treegiant":             {id:"treegiant",            name:'Baumriese',               attack: 38,defense: 38,live: 144,speed: 3,points:  77,reviveMushrooms:  42,revivePowerStones:  1680,strength:"",weakness:"",s_data:[],w_data:[]},
      "elv_magican":           {id:"elv_magican",          name:'Elfenmagier',             attack: 47,defense: 47,live: 163,speed: 1,points: 122,reviveMushrooms:  65,revivePowerStones:  2600,strength:"",weakness:"",s_data:[],w_data:[]},
      "fire_fay":              {id:"fire_fay",             name:'Feuerfeen',               attack: 19,defense: 19,live:  23,speed: 1,points:  30,reviveMushrooms:  19,revivePowerStones:   760,strength:"",weakness:"",s_data:[],w_data:[]},
      "storm_faerie":          {id:"storm_faerie",         name:'Sturmfeen',               attack:  1,defense:  8,live:  65,speed: 1,points:  33,reviveMushrooms:  20,revivePowerStones:   800,strength:"",weakness:"",s_data:[],w_data:[]},
      "dragon":                {id:"dragon",               name:'Drache der Alten',        attack:  0,defense:  0,live: 100,speed:10,points:4502,reviveMushrooms:6000,revivePowerStones:240000,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_17":              {id:"creep_17",             name:"Salamander",              attack:  1,defense:  1,live:   4,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_18":              {id:"creep_18",             name:"Wurzelwichte",            attack:  0,defense:  1,live:   8,speed: 2,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_19":              {id:"creep_19",             name:"Fleischhummeln",          attack:  2,defense:  2,live:  12,speed: 4,points:   0,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_20":              {id:"creep_20",             name:"Skarabaeus",              attack:  2,defense:  2,live:  16,speed: 4,points:   0,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_21":              {id:"creep_21",             name:"Gnome",                   attack:  3,defense:  3,live:  20,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_22":              {id:"creep_22",             name:"Irrlichter",              attack:  3,defense:  3,live:  24,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_23":              {id:"creep_23",             name:"Skrälinge",               attack:  4,defense:  4,live:  28,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_24":              {id:"creep_24",             name:"Warzengiftratten",        attack:  4,defense:  4,live:  32,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_25":              {id:"creep_25",             name:"Sylphen",                 attack:  5,defense:  5,live:  36,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_26":              {id:"creep_26",             name:"Midgardschlangen",        attack:  0,defense:  5,live:  20,speed: 2,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_27":              {id:"creep_27",             name:"Nymphen",                 attack:  6,defense:  6,live:  48,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_28":              {id:"creep_28",             name:"Schlingpflanzen",         attack:  7,defense:  7,live:  53,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_29":              {id:"creep_29",             name:"Meerjungfrauen",          attack:  8,defense:  8,live:  59,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_30":              {id:"creep_30",             name:"Werwölfe",                attack:  9,defense:  9,live:  62,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_31":              {id:"creep_31",             name:"Gorgonen",                attack: 10,defense: 10,live:  73,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_32":              {id:"creep_32",             name:"Harpien",                 attack: 11,defense: 11,live:  77,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_33":              {id:"creep_33",             name:"Weißadler",               attack: 12,defense: 12,live:  97,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_34":              {id:"creep_34",             name:"Morlocks",                attack: 13,defense: 13,live: 110,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_35":              {id:"creep_35",             name:"Riesen Marokspinnen",     attack: 14,defense: 14,live: 121,speed: 4,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_36":              {id:"creep_36",             name:"Feuerteufel",             attack:  0,defense: 15,live:  30,speed: 2,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_37":              {id:"creep_37",             name:"Fenriswolf",              attack: 16,defense: 16,live: 132,speed: 4,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_38":              {id:"creep_38",             name:"Dämon",                   attack: 17,defense: 17,live: 143,speed: 4,points:   5,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_39":              {id:"creep_39",             name:"Horngolems",              attack: 18,defense: 18,live: 154,speed: 5,points:   5,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_40":              {id:"creep_40",             name:"Sonnenpferde",            attack: 19,defense: 19,live: 165,speed: 5,points:   6,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_41":              {id:"creep_41",             name:"Minotauren",              attack: 20,defense: 20,live: 187,speed: 5,points:   6,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_42":              {id:"creep_42",             name:"Greifen",                 attack: 22,defense: 22,live: 209,speed: 5,points:   7,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_43":              {id:"creep_43",             name:"Blutalben",               attack: 23,defense: 23,live: 222,speed: 5,points:   7,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_44":              {id:"creep_44",             name:"Zyklopen",                attack:  0,defense: 25,live:  40,speed: 2,points:   8,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_45":              {id:"creep_45",             name:"Mantikoren",              attack: 28,defense: 28,live: 265,speed: 5,points:   9,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_46":              {id:"creep_46",             name:"Behemoth",                attack: 35,defense: 35,live: 300,speed: 5,points:  10,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_47":              {id:"creep_47",             name:"Oger",                    attack: 40,defense: 40,live: 345,speed: 5,points:  12,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_48":              {id:"creep_48",             name:"Sandwürmer",              attack: 50,defense: 50,live: 450,speed: 5,points:  15,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_49":              {id:"creep_49",             name:"Todesengel",              attack:  0,defense: 60,live: 100,speed: 2,points:  20,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_50":              {id:"creep_50",             name:"Goldene Sphinx",          attack: 80,defense: 80,live: 750,speed: 5,points:  24,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_51":              {id:"creep_51",             name:"Feuerstacheldrachen",     attack:100,defense:100,live: 840,speed: 5,points:  30,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_52":              {id:"creep_52",             name:"Eisaugendrachen",         attack:150,defense:150,live:1100,speed: 5,points:  40,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_53":              {id:"creep_53",             name:"Schlangenhalsdrachen",    attack:200,defense:200,live:1400,speed: 5,points:  50,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
    },
  	"eroberer": {
      "unicorn":               {id:"unicorn",              name:'Einhornwagen',            attack:  0,defense:  0,live:  20,speed: 1,points:  35,reviveMushrooms:  25,revivePowerStones:  1000,strength:"",weakness:"",s_data:[["","(keine)"]]                                               ,w_data:[["","(keine)"]]},
      "dragon_egg":            {id:"dragon_egg",           name:'Dracheneier',             attack:  1,defense:  1,live:  80,speed: 4,points:2251,reviveMushrooms:3000,revivePowerStones:120000,strength:"",weakness:"",s_data:[["","(keine)"]]                                               ,w_data:[["","(keine)"]]},
      "goblin":                {id:"goblin",               name:'Kobold',                  attack:  1,defense:  1,live:  25,speed: 3,points:   5,reviveMushrooms:   3,revivePowerStones:   120,strength:"",weakness:"",s_data:[["fire_fay","4fach"],["stone_throwing_troll","2fach"]]        ,w_data:[["icewarrior","2fach"],["hysterical_centauress","4fach"]]},
      "icewarrior":            {id:"icewarrior",           name:'Eiskrieger',              attack:  2,defense:  3,live:  50,speed: 3,points:  10,reviveMushrooms:   5,revivePowerStones:   200,strength:"",weakness:"",s_data:[["elv_magican","4fach"],["goblin","2fach"],["creep_26","1/6"]],w_data:[["warriorpriest","2fach"],["fire_fay","4fach"]]},
      "powerchild":            {id:"powerchild",           name:'Kinder der Macht',        attack:  3,defense:  3,live:  15,speed: 3,points:   6,reviveMushrooms:   3,revivePowerStones:   120,strength:"",weakness:"",s_data:[],w_data:[]},
      "hysterical_centauress": {id:"hysterical_centauress",name:'Hysterische Zentaurin',   attack:  4,defense:  4,live:  19,speed: 1,points:  12,reviveMushrooms:   7,revivePowerStones:   280,strength:"",weakness:"",s_data:[],w_data:[]},
      "warriorpriest":         {id:"warriorpriest",        name:'Kriegerpriester',         attack:  4,defense:  4,live:  65,speed: 2,points:  19,reviveMushrooms:  10,revivePowerStones:   400,strength:"",weakness:"",s_data:[],w_data:[]},
      "wild_centaur":          {id:"wild_centaur",         name:'Wilde Zentauren',         attack:  9,defense:  8,live:  31,speed: 1,points:  23,reviveMushrooms:  13,revivePowerStones:   520,strength:"",weakness:"",s_data:[],w_data:[]},
      "axe_swinging_dwarf":    {id:"axe_swinging_dwarf",   name:'Axtschwingende Zwerge',   attack:  6,defense:  7,live: 120,speed: 2,points:  35,reviveMushrooms:  19,revivePowerStones:   760,strength:"",weakness:"",s_data:[],w_data:[]},
      "elven_archer":          {id:"elven_archer",         name:'Elfenbogenschützen',      attack: 17,defense: 19,live:  64,speed: 2,points:  40,reviveMushrooms:  21,revivePowerStones:   840,strength:"",weakness:"",s_data:[],w_data:[]},
      "doubleaxe_dwarf":       {id:"doubleaxe_dwarf",      name:'Doppelaxtzwerge',         attack: 10,defense:  9,live: 182,speed: 3,points:  49,reviveMushrooms:  25,revivePowerStones:  1000,strength:"",weakness:"",s_data:[],w_data:[]},
      "singing_halfgiant":     {id:"singing_halfgiant",    name:'Singende Halbriesen',     attack: 16,defense: 17,live: 336,speed: 1,points: 105,reviveMushrooms:  58,revivePowerStones:  2320,strength:"",weakness:"",s_data:[],w_data:[]},
      "stone_throwing_troll":  {id:"stone_throwing_troll", name:'Steinwerfende Bergtrolle',attack: 34,defense: 31,live: 650,speed: 3,points: 154,reviveMushrooms:  81,revivePowerStones:  3240,strength:"",weakness:"",s_data:[],w_data:[]},
      "treegiant":             {id:"treegiant",            name:'Baumriese',               attack: 38,defense: 38,live: 144,speed: 3,points:  77,reviveMushrooms:  42,revivePowerStones:  1680,strength:"",weakness:"",s_data:[],w_data:[]},
      "elv_magican":           {id:"elv_magican",          name:'Elfenmagier',             attack: 47,defense: 47,live: 163,speed: 1,points: 122,reviveMushrooms:  65,revivePowerStones:  2600,strength:"",weakness:"",s_data:[],w_data:[]},
      "fire_fay":              {id:"fire_fay",             name:'Feuerfeen',               attack: 19,defense: 19,live:  23,speed: 1,points:  30,reviveMushrooms:  19,revivePowerStones:   760,strength:"",weakness:"",s_data:[],w_data:[]},
      "storm_faerie":          {id:"storm_faerie",         name:'Sturmfeen',               attack:  1,defense:  8,live:  65,speed: 1,points:  33,reviveMushrooms:  20,revivePowerStones:   800,strength:"",weakness:"",s_data:[],w_data:[]},
      "dragon":                {id:"dragon",               name:'Drache der Alten',        attack:  0,defense:  0,live: 100,speed:10,points:4502,reviveMushrooms:6000,revivePowerStones:240000,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_17":              {id:"creep_17",             name:"Salamander",              attack:  1,defense:  1,live:   4,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_18":              {id:"creep_18",             name:"Wurzelwichte",            attack:  0,defense:  1,live:   8,speed: 2,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_19":              {id:"creep_19",             name:"Fleischhummeln",          attack:  2,defense:  2,live:  12,speed: 4,points:   0,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_20":              {id:"creep_20",             name:"Skarabaeus",              attack:  2,defense:  2,live:  16,speed: 4,points:   0,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_21":              {id:"creep_21",             name:"Gnome",                   attack:  3,defense:  3,live:  20,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_22":              {id:"creep_22",             name:"Irrlichter",              attack:  3,defense:  3,live:  24,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_23":              {id:"creep_23",             name:"Skrälinge",               attack:  4,defense:  4,live:  28,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_24":              {id:"creep_24",             name:"Warzengiftratten",        attack:  4,defense:  4,live:  32,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_25":              {id:"creep_25",             name:"Sylphen",                 attack:  5,defense:  5,live:  36,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_26":              {id:"creep_26",             name:"Midgardschlangen",        attack:  0,defense:  5,live:  20,speed: 2,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_27":              {id:"creep_27",             name:"Nymphen",                 attack:  6,defense:  6,live:  48,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_28":              {id:"creep_28",             name:"Schlingpflanzen",         attack:  7,defense:  7,live:  53,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_29":              {id:"creep_29",             name:"Meerjungfrauen",          attack:  8,defense:  8,live:  59,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_30":              {id:"creep_30",             name:"Werwölfe",                attack:  9,defense:  9,live:  62,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_31":              {id:"creep_31",             name:"Gorgonen",                attack: 10,defense: 10,live:  73,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_32":              {id:"creep_32",             name:"Harpien",                 attack: 11,defense: 11,live:  77,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_33":              {id:"creep_33",             name:"Weißadler",               attack: 12,defense: 12,live:  97,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_34":              {id:"creep_34",             name:"Morlocks",                attack: 13,defense: 13,live: 110,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_35":              {id:"creep_35",             name:"Riesen Marokspinnen",     attack: 14,defense: 14,live: 121,speed: 4,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_36":              {id:"creep_36",             name:"Feuerteufel",             attack:  0,defense: 15,live:  30,speed: 2,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_37":              {id:"creep_37",             name:"Fenriswolf",              attack: 16,defense: 16,live: 132,speed: 4,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_38":              {id:"creep_38",             name:"Dämon",                   attack: 17,defense: 17,live: 143,speed: 4,points:   5,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_39":              {id:"creep_39",             name:"Horngolems",              attack: 18,defense: 18,live: 154,speed: 5,points:   5,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_40":              {id:"creep_40",             name:"Sonnenpferde",            attack: 19,defense: 19,live: 165,speed: 5,points:   6,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_41":              {id:"creep_41",             name:"Minotauren",              attack: 20,defense: 20,live: 187,speed: 5,points:   6,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_42":              {id:"creep_42",             name:"Greifen",                 attack: 22,defense: 22,live: 209,speed: 5,points:   7,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_43":              {id:"creep_43",             name:"Blutalben",               attack: 23,defense: 23,live: 222,speed: 5,points:   7,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_44":              {id:"creep_44",             name:"Zyklopen",                attack:  0,defense: 25,live:  40,speed: 2,points:   8,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_45":              {id:"creep_45",             name:"Mantikoren",              attack: 28,defense: 28,live: 265,speed: 5,points:   9,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_46":              {id:"creep_46",             name:"Behemoth",                attack: 35,defense: 35,live: 300,speed: 5,points:  10,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_47":              {id:"creep_47",             name:"Oger",                    attack: 40,defense: 40,live: 345,speed: 5,points:  12,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_48":              {id:"creep_48",             name:"Sandwürmer",              attack: 50,defense: 50,live: 450,speed: 5,points:  15,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_49":              {id:"creep_49",             name:"Todesengel",              attack:  0,defense: 60,live: 100,speed: 2,points:  20,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_50":              {id:"creep_50",             name:"Goldene Sphinx",          attack: 80,defense: 80,live: 750,speed: 5,points:  24,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_51":              {id:"creep_51",             name:"Feuerstacheldrachen",     attack:100,defense:100,live: 840,speed: 5,points:  30,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_52":              {id:"creep_52",             name:"Eisaugendrachen",         attack:150,defense:150,live:1100,speed: 5,points:  40,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_53":              {id:"creep_53",             name:"Schlangenhalsdrachen",    attack:200,defense:200,live:1400,speed: 5,points:  50,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
    },
  	"einhorn": { //TODO Werte anpassen
      "unicorn":               {id:"unicorn",              name:'Einhornwagen',            attack:  0,defense:  0,live:  20,speed: 1,points:  35,reviveMushrooms:  25,revivePowerStones:  1000,strength:"",weakness:"",s_data:[],w_data:[]},
      "dragon_egg":            {id:"dragon_egg",           name:'Dracheneier',             attack:  1,defense:  1,live:  80,speed: 4,points:2251,reviveMushrooms:3000,revivePowerStones:120000,strength:"",weakness:"",s_data:[],w_data:[]},
      "goblin":                {id:"goblin",               name:'Kobold',                  attack:  1,defense:  1,live:  25,speed: 3,points:   5,reviveMushrooms:   3,revivePowerStones:   120,strength:"",weakness:"",s_data:[],w_data:[]},
      "icewarrior":            {id:"icewarrior",           name:'Eiskrieger',              attack:  2,defense:  3,live:  50,speed: 3,points:  10,reviveMushrooms:   5,revivePowerStones:   200,strength:"",weakness:"",s_data:[],w_data:[]},
      "powerchild":            {id:"powerchild",           name:'Kinder der Macht',        attack:  3,defense:  3,live:  15,speed: 3,points:   6,reviveMushrooms:   3,revivePowerStones:   120,strength:"",weakness:"",s_data:[],w_data:[]},
      "hysterical_centauress": {id:"hysterical_centauress",name:'Hysterische Zentaurin',   attack:  4,defense:  4,live:  19,speed: 1,points:  12,reviveMushrooms:   7,revivePowerStones:   280,strength:"",weakness:"",s_data:[],w_data:[]},
      "warriorpriest":         {id:"warriorpriest",        name:'Kriegerpriester',         attack:  4,defense:  4,live:  65,speed: 2,points:  19,reviveMushrooms:  10,revivePowerStones:   400,strength:"",weakness:"",s_data:[],w_data:[]},
      "wild_centaur":          {id:"wild_centaur",         name:'Wilde Zentauren',         attack:  9,defense:  8,live:  31,speed: 1,points:  23,reviveMushrooms:  13,revivePowerStones:   520,strength:"",weakness:"",s_data:[],w_data:[]},
      "axe_swinging_dwarf":    {id:"axe_swinging_dwarf",   name:'Axtschwingende Zwerge',   attack:  6,defense:  7,live: 120,speed: 2,points:  35,reviveMushrooms:  19,revivePowerStones:   760,strength:"",weakness:"",s_data:[],w_data:[]},
      "elven_archer":          {id:"elven_archer",         name:'Elfenbogenschützen',      attack: 17,defense: 19,live:  64,speed: 2,points:  40,reviveMushrooms:  21,revivePowerStones:   840,strength:"",weakness:"",s_data:[],w_data:[]},
      "doubleaxe_dwarf":       {id:"doubleaxe_dwarf",      name:'Doppelaxtzwerge',         attack: 10,defense:  9,live: 182,speed: 3,points:  49,reviveMushrooms:  25,revivePowerStones:  1000,strength:"",weakness:"",s_data:[],w_data:[]},
      "singing_halfgiant":     {id:"singing_halfgiant",    name:'Singende Halbriesen',     attack: 16,defense: 17,live: 336,speed: 1,points: 105,reviveMushrooms:  58,revivePowerStones:  2320,strength:"",weakness:"",s_data:[],w_data:[]},
      "stone_throwing_troll":  {id:"stone_throwing_troll", name:'Steinwerfende Bergtrolle',attack: 34,defense: 31,live: 650,speed: 3,points: 154,reviveMushrooms:  81,revivePowerStones:  3240,strength:"",weakness:"",s_data:[],w_data:[]},
      "treegiant":             {id:"treegiant",            name:'Baumriese',               attack: 38,defense: 38,live: 144,speed: 3,points:  77,reviveMushrooms:  42,revivePowerStones:  1680,strength:"",weakness:"",s_data:[],w_data:[]},
      "elv_magican":           {id:"elv_magican",          name:'Elfenmagier',             attack: 47,defense: 47,live: 163,speed: 1,points: 122,reviveMushrooms:  65,revivePowerStones:  2600,strength:"",weakness:"",s_data:[],w_data:[]},
      "fire_fay":              {id:"fire_fay",             name:'Feuerfeen',               attack: 19,defense: 19,live:  23,speed: 1,points:  30,reviveMushrooms:  19,revivePowerStones:   760,strength:"",weakness:"",s_data:[],w_data:[]},
      "storm_faerie":          {id:"storm_faerie",         name:'Sturmfeen',               attack:  1,defense:  8,live:  65,speed: 1,points:  33,reviveMushrooms:  20,revivePowerStones:   800,strength:"",weakness:"",s_data:[],w_data:[]},
      "dragon":                {id:"dragon",               name:'Drache der Alten',        attack:  0,defense:  0,live: 100,speed:10,points:4502,reviveMushrooms:6000,revivePowerStones:240000,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_17":              {id:"creep_17",             name:"Salamander",              attack:  1,defense:  1,live:   4,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_18":              {id:"creep_18",             name:"Wurzelwichte",            attack:  0,defense:  1,live:   8,speed: 2,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_19":              {id:"creep_19",             name:"Fleischhummeln",          attack:  2,defense:  2,live:  12,speed: 4,points:   0,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_20":              {id:"creep_20",             name:"Skarabaeus",              attack:  2,defense:  2,live:  16,speed: 4,points:   0,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_21":              {id:"creep_21",             name:"Gnome",                   attack:  3,defense:  3,live:  20,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_22":              {id:"creep_22",             name:"Irrlichter",              attack:  3,defense:  3,live:  24,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_23":              {id:"creep_23",             name:"Skrälinge",               attack:  4,defense:  4,live:  28,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_24":              {id:"creep_24",             name:"Warzengiftratten",        attack:  4,defense:  4,live:  32,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_25":              {id:"creep_25",             name:"Sylphen",                 attack:  5,defense:  5,live:  36,speed: 4,points:   1,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_26":              {id:"creep_26",             name:"Midgardschlangen",        attack:  0,defense:  5,live:  20,speed: 2,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_27":              {id:"creep_27",             name:"Nymphen",                 attack:  6,defense:  6,live:  48,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_28":              {id:"creep_28",             name:"Schlingpflanzen",         attack:  7,defense:  7,live:  53,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_29":              {id:"creep_29",             name:"Meerjungfrauen",          attack:  8,defense:  8,live:  59,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_30":              {id:"creep_30",             name:"Werwölfe",                attack:  9,defense:  9,live:  62,speed: 4,points:   2,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_31":              {id:"creep_31",             name:"Gorgonen",                attack: 10,defense: 10,live:  73,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_32":              {id:"creep_32",             name:"Harpien",                 attack: 11,defense: 11,live:  77,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_33":              {id:"creep_33",             name:"Weißadler",               attack: 12,defense: 12,live:  97,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_34":              {id:"creep_34",             name:"Morlocks",                attack: 13,defense: 13,live: 110,speed: 4,points:   3,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_35":              {id:"creep_35",             name:"Riesen Marokspinnen",     attack: 14,defense: 14,live: 121,speed: 4,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_36":              {id:"creep_36",             name:"Feuerteufel",             attack:  0,defense: 15,live:  30,speed: 2,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_37":              {id:"creep_37",             name:"Fenriswolf",              attack: 16,defense: 16,live: 132,speed: 4,points:   4,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_38":              {id:"creep_38",             name:"Dämon",                   attack: 17,defense: 17,live: 143,speed: 4,points:   5,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_39":              {id:"creep_39",             name:"Horngolems",              attack: 18,defense: 18,live: 154,speed: 5,points:   5,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_40":              {id:"creep_40",             name:"Sonnenpferde",            attack: 19,defense: 19,live: 165,speed: 5,points:   6,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_41":              {id:"creep_41",             name:"Minotauren",              attack: 20,defense: 20,live: 187,speed: 5,points:   6,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_42":              {id:"creep_42",             name:"Greifen",                 attack: 22,defense: 22,live: 209,speed: 5,points:   7,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_43":              {id:"creep_43",             name:"Blutalben",               attack: 23,defense: 23,live: 222,speed: 5,points:   7,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_44":              {id:"creep_44",             name:"Zyklopen",                attack:  0,defense: 25,live:  40,speed: 2,points:   8,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_45":              {id:"creep_45",             name:"Mantikoren",              attack: 28,defense: 28,live: 265,speed: 5,points:   9,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_46":              {id:"creep_46",             name:"Behemoth",                attack: 35,defense: 35,live: 300,speed: 5,points:  10,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_47":              {id:"creep_47",             name:"Oger",                    attack: 40,defense: 40,live: 345,speed: 5,points:  12,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_48":              {id:"creep_48",             name:"Sandwürmer",              attack: 50,defense: 50,live: 450,speed: 5,points:  15,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_49":              {id:"creep_49",             name:"Todesengel",              attack:  0,defense: 60,live: 100,speed: 2,points:  20,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_50":              {id:"creep_50",             name:"Goldene Sphinx",          attack: 80,defense: 80,live: 750,speed: 5,points:  24,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_51":              {id:"creep_51",             name:"Feuerstacheldrachen",     attack:100,defense:100,live: 840,speed: 5,points:  30,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_52":              {id:"creep_52",             name:"Eisaugendrachen",         attack:150,defense:150,live:1100,speed: 5,points:  40,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
      "creep_53":              {id:"creep_53",             name:"Schlangenhalsdrachen",    attack:200,defense:200,live:1400,speed: 5,points:  50,reviveMushrooms:   0,revivePowerStones:     0,strength:"",weakness:"",s_data:[],w_data:[]},
    },
  },
  unitInfos:function(item,count) {
  	var isNamedUnit=true;
    if (isNaN(count)||typeof(count)=='undefined'||count<0) count=1;
    var values={};
    var unit_name="";
    var class_name=item.attr("class").split(" ");
    for(var i=0;i<class_name.length;i++) {
    	var pos=class_name[i].search(/unit_/);
    	if(pos>=0) {
    		unit_name=class_name[i].substr(pos+5);
    		break;
    	}
    }
    if(unit_name=="") return false;
    if(unit_name=="default") {
    	isNamedUnit=false;
      var id_test=item.attr('href').match(/&id=(\d+)$/);
      if (id_test) unit_name="creep_"+id_test[1];
    }
    values=this.unitData[server][unit_name];
    values.strength="";
    for(var i=0;i<values.s_data.length;i++) values.strength+=AddHTML.addImage("unittext",values.s_data[i][0],values.s_data[i][1]);
    if(values.strength=="") values.strength="(nicht definiert)";
    values.weakness="";
    for(var i=0;i<values.w_data.length;i++) values.weakness+=AddHTML.addImage("unittext",values.w_data[i][0],values.w_data[i][1]);
    if(values.weakness=="") values.weakness="(nicht definiert)";
    if (typeof(values.id)=='undefined') return false;
    attack_bonus=Math.round(0.02*hero.attack*count*Math.pow(values.attack,isNamedUnit?1.28:1));
    defense_bonus=Math.round(0.025*hero.defense*count*Math.pow(values.defense,isNamedUnit?1.28:1));
    live_bonus=Math.round(0.011*hero.live*count*Math.pow(values.live,isNamedUnit?1.24:1));
    return {
      one:values,
      total:{
        id:values.id,
        name:values.name,
        count:count,
        attack:count*values.attack,
        defense:count*values.defense,
        live:count*values.live,
        attack_bonus:attack_bonus,
        defense_bonus:defense_bonus,
        live_bonus:live_bonus,
        speed:values.speed,
        points:count*values.points,
        reviveMushrooms:count*values.reviveMushrooms,
        revivePowerStones:count*values.revivePowerStones,
        strength:values.strength,
        weakness:values.weakness
      }
    }
  }
};

//****************************************************************************************************************************************************************
// Daten-Abruf und -Einstellung
//****************************************************************************************************************************************************************
var GetSetData={
	RessiLager:function() {
		if (!Ressi[palace]) Ressi[palace]={
			Essenzen:{Lager:0, Basis:0, Bonus:0},
			Kristallsplitter:{Lager:0, Basis:0, Bonus:0},
			Kraftsteine:{Lager:0, Basis:0, Bonus:0},
			Goldharz:{Lager:0, Basis:0, Bonus:0},
			Mana:{Lager:0, Basis:0, Bonus:0},
			Grotte:{Ressi:0, Mana:0}
		};
		if(typeof(Ressi[palace].Grotte)=="undefined") Ressi[palace].Grotte={Ressi:0, Mana:0};
    $("#palace_resources td").each(function(i) {
      var item=$(this);
      var count=DataConvert.GetNumber(item.text());
      if (i==0) Ressi[palace].Essenzen.Lager=count;
      if (i==1) Ressi[palace].Kristallsplitter.Lager=count;
      if (i==2) Ressi[palace].Kraftsteine.Lager=count;
      if (i==3) Ressi[palace].Goldharz.Lager=count;
      if (i==4) Ressi[palace].Mana.Lager=count;
    });
    GM_setValue(server_name+".Ressi",DataIO.serialize(Ressi));
  },
  Grotte:function() {
  	var cave=$(".cave").text();
  	var ressi=/Deine geheime Grotte schützt jeweils eine Menge von\s+([0-9\.]*)\s+all deiner Rohstoffe/i.exec(cave);
  	var mana=/Zusätzlich schützt deine geheime Grotte\s+([0-9\.]*)\s+Mana/i.exec(cave);
  	if(ressi!=null) Ressi[palace].Grotte.Ressi=DataConvert.GetNumber(ressi[1]);
  	if(mana!=null) Ressi[palace].Grotte.Mana=DataConvert.GetNumber(mana[1]);
    GM_setValue(server_name+".Ressi",DataIO.serialize(Ressi));
  },
  ItemBonus:function() {
  	if($("#avatar_values").length==0) return;
    ItemBonus={attack:0,defense:0,live:0};
    $("#avatar_values table tbody tr").each(function () {
      var modifier=$(this).find("td").eq(0).text();
      var value=$(this).find("td").eq(1).text();
      if(value.search(/\./)<0) value=value.replace(/\%/,".0%");
      var type=$(this).find("td").eq(2).text();
      switch (type) {
      	case "Angriff":
      	  var attack=/(\d+).(\d+)\%/.exec(value);
      	  ItemBonus.attack=((attack&&attack.length>=1)?(attack[1]):0)+"."+((attack&&attack.length>=2)?(attack[2]):0);
      	  break;
      	case "Verteidigung":
      	  var defense=/(\d+).(\d+)\%/.exec(value);
      	  ItemBonus.defense=((defense&&defense.length>=1)?(defense[1]):0)+"."+((defense&&defense.length>=2)?(defense[2]):0);
      	  break;
      	case "Leben":
      	  var live=/(\d+).(\d+)\%/.exec(value);
      	  ItemBonus.live=((live&&live.length>=1)?(live[1]):0)+"."+((live&&live.length>=2)?(live[2]):0);
      	  break;
      }
      GM_setValue(server_name+".ItemBonus",DataIO.serialize(ItemBonus));
    });
  },
  ElixirBonus:function() {
  	if($("#activeElixirs").length==0) return;
    ElixirBonus={attack:0,defense:0,live:0};
    $("#activeElixirs tbody tr").each(function () {
      var type=$(this).find("td").eq(2).text().trim();
      var value=$(this).find("td").eq(3).text().trim();
      if(value.search(/\./)<0) value=value.replace(/\%/,".0%");
      switch (type) {
      	case "Angriff":
      	  var attack=/(\d+).(\d+)\%/.exec(value);
      	  ElixirBonus.attack=((attack&&attack.length>=1)?(attack[1]):0)+"."+((attack&&attack.length>=2)?(attack[2]):0);
      	  break;
      	case "Verteidigung":
      	  var defense=/(\d+).(\d+)\%/.exec(value);
      	  ElixirBonus.defense=((defense&&defense.length>=1)?(defense[1]):0)+"."+((defense&&defense.length>=2)?(defense[2]):0);
      	  break;
      	case "Leben":
      	  var live=/(\d+).(\d+)\%/.exec(value);
      	  ElixirBonus.live=((live&&live.length>=1)?(live[1]):0)+"."+((live&&live.length>=2)?(live[2]):0);
      	  break;
      }
      GM_setValue(server_name+".ElixirBonus",DataIO.serialize(ElixirBonus));
    });
  },
  Drachen:function() {
    var attack=true;
    var defense=true;
    var live=true;
    $("#hero_footer tbody tr:contains('Aktivierbare Drachen-Boni') ~ tr").each(function() {
    	var type=$(this).find("td").eq(2).text().trim();
    	switch(type) {
    		case "Angriff":
    		  attack=false;
    		  break;
    		case "Verteidigung":
    		  defense=false;
    		  break;
    		case "Leben":
    		  live=false;
    		  break;
    		}
    });
    return {
    	attack:attack,
    	defense:defense,
    	live:live
    }
  },
  HeldenID:function(ref) {
  	var hero_ref=/heros.php\?numeric\[hero_id\]=(\d+)/.exec(ref);
  	return (hero_ref&&(hero_ref.length>=1))?hero_ref[1]:-1;
  },
  HeldenDaten:function () {
  	var hero_id=this.HeldenID($(".selected_hero").attr("href"));
    var hero_name=$("#hero_name").text();
    if (typeof(Helden[hero_id])=='undefined') {
      Helden[hero_id]={
      	name:hero_name,
        isBattleHero:true,
        attack:0,
        defense:0,
        live:0,
        xp:0,
        x:0,
        y:0,
      };
    }
    Helden[hero_id].isBattleHero=!$(".selected_hero .sbPic").hasClass("hero_pegasus");
  	Helden[hero_id].xp=DataConvert.GetNumber($("#hero_info table tbody tr td:contains('Erfahrung') ~td").text());
  	var pos=/(\d+):(\d+):(\d+)/.exec($("#hero_info table tbody tr td:contains('Position') ~td").text());
  	Helden[hero_id].x=(pos&&pos.length>=1)?pos[1]:0;
  	Helden[hero_id].y=(pos&&pos.length>=2)?pos[2]:0;
    $(".upgrade .upgradeBtns strong").each(function () {
      var text=$(this).text();
      var pos=text.indexOf(":");
      if (pos==-1) return;
      var attribute=text.substring(0,pos);
      var value=parseInt(text.substring(pos+1));
      if (isNaN(value)) return;
      switch(attribute) {
        case "Angriff": Helden[hero_id].attack=value;break;
        case "Verteidigung": Helden[hero_id].defense=value;break;
        case "Leben": Helden[hero_id].live=value;break;
        default: return;
      }
    });
    GM_setValue(server_name+".Helden",DataIO.serialize(Helden));
    return Helden[hero_id];
  },
  SchamaneDaten:function() {
    return {
      remaining:parseInt($(".mushrooms tbody .top .white_middle").text()),
      perTick:parseInt($(".mushrooms tbody .brdTop:first .white_last").text()),
      limit:parseInt($(".mushrooms tbody .btm .white_last").text())
    }
  },
  addToValues:function(values,infos) {
    values.attack+=infos.attack;
    values.attack_bonus+=infos.attack_bonus;
    values.defense+=infos.defense;
    values.defense_bonus+=infos.defense_bonus;
    values.live+=infos.live;
    values.live_bonus+=infos.live_bonus;
    if (infos.speed>values.speed) values.speed=infos.speed;
    values.points+=infos.points;
    values.reviveMushrooms+=infos.reviveMushrooms;
    values.revivePowerStones+=infos.revivePowerStones;
    return values;
  },
  setHeldKordi:function() {
  	if(Settings.data.hero_pos_to_map) {
  		var pos=$("#map_detail_head_div").text();
    	if(typeof(hero.x)!="undefined") {
        $("#coord_x").val(hero.x);
        $("#coord_y").val(hero.y);
        $("#coord_y").focus();
      }
    }
  },
};

//****************************************************************************************************************************************************************
// zusätzlicher HTML-Code
//****************************************************************************************************************************************************************
var AddHTML={
	addRessiProd:function() {
    var Essenzen=0;
    var Kristallsplitter=0;
    var Kraftsteine=0;
    var Goldharz=0;
  	for (var i in Ressi) {
  		if(Ressi[i]) {
        Essenzen+=Ressi[i].Essenzen.Basis;
        Kristallsplitter+=Ressi[i].Kristallsplitter.Basis;
        Kraftsteine+=Ressi[i].Kraftsteine.Basis;
        Goldharz+=Ressi[i].Goldharz.Basis;
      }
    }
    Essenzen*=BaseData.pushingticks();
    Kristallsplitter*=BaseData.pushingticks();
    Kraftsteine*=BaseData.pushingticks();
    Goldharz*=BaseData.pushingticks();
    var Essenzen_total=Essenzen+Kristallsplitter*1.125+Kraftsteine*2.5+Goldharz*5;
    var Kristallsplitter_total=Math.floor(Essenzen_total/1.125);
    var Kraftsteine_total=Math.floor(Essenzen_total/2.5);
    var Goldharz_total=Math.floor(Essenzen_total/5);
    $("#palace_resources").css("top","-16px");
    $("#palace_resources table tbody tr td a").each(function () {
      var color_blue="#0000aa";
      var color_red="#aa0000";
      var color_green="#008800";
      var color="";
      var basis=0;
      var bonus=0;
      var item=$(this);
      if (item.get(0).tagName=="A") {
        if (!item.hasClass("xAddonItem")) {
          var typ=item.attr('href').substr((item.attr('href').lastIndexOf("="))+1);
          if (Ressi[palace]) {
          	switch(typ) {
          		case "1":
          			basis=Ressi[palace].Essenzen.Basis;
          			bonus=Ressi[palace].Essenzen.Bonus;
          			color=(Ressi[palace].Essenzen.Lager>=Ressi[palace].Grotte.Ressi)?color_red:color_green;
          			if(Ressi[palace].Grotte.Ressi==0) color="";
          			break;
          		case "2":
          			basis=Ressi[palace].Kristallsplitter.Basis;
          			bonus=Ressi[palace].Kristallsplitter.Bonus;
          			color=(Ressi[palace].Kristallsplitter.Lager>=Ressi[palace].Grotte.Ressi)?color_red:color_green;
          			if(Ressi[palace].Grotte.Ressi==0) color="";
          			break;
          		case "3":
          			basis=Ressi[palace].Kraftsteine.Basis;
          			bonus=Ressi[palace].Kraftsteine.Bonus;
          			color=(Ressi[palace].Kraftsteine.Lager>=Ressi[palace].Grotte.Ressi)?color_red:color_green;
          			if(Ressi[palace].Grotte.Ressi==0) color="";
          			break;
          		case "16":
          			basis=Ressi[palace].Goldharz.Basis;
          			bonus=Ressi[palace].Goldharz.Bonus;
          			color=(Ressi[palace].Goldharz.Lager>=Ressi[palace].Grotte.Ressi)?color_red:color_green;
          			if(Ressi[palace].Grotte.Ressi==0) color="";
          			break;
          		case "0":
          			basis=Ressi[palace].Mana.Basis;
          			bonus=Ressi[palace].Mana.Bonus;
          			color=(Ressi[palace].Mana.Lager>=Ressi[palace].Grotte.Mana)?color_red:color_green;
          			if(Ressi[palace].Grotte.Mana==0) color="";
          			break;
          	}
          }
          var limit="<br><br>Pushing-Limit: ";
          var limit_total="<br>Händler-Limit: ";
          switch(typ) {
          	case "1": limit+=DataConvert.FormatNumber(Essenzen); limit_total+=DataConvert.FormatNumber(Essenzen_total); break;
          	case "2": limit+=DataConvert.FormatNumber(Kristallsplitter); limit_total+=DataConvert.FormatNumber(Kristallsplitter_total); break;
          	case "3": limit+=DataConvert.FormatNumber(Kraftsteine); limit_total+=DataConvert.FormatNumber(Kraftsteine_total); break;
          	case "16": limit+=DataConvert.FormatNumber(Goldharz); limit_total+=DataConvert.FormatNumber(Goldharz_total); break;
          	case "0": limit=""; limit_total=""; break;
          }
          var html_extra="<div align=center><font color="+color_blue+" onmouseout=\"nd();\" onmouseover=\"return overlib('";
          html_extra+="Basis: "+DataConvert.FormatNumber(basis)+"&nbsp;&nbsp;-&nbsp;&nbsp;Bonus: "+DataConvert.FormatNumber(bonus);
          if(BaseData.pushingticks!=0) html_extra+=limit+limit_total;
          html_extra+="');\">";
          html_extra+="(+"+DataConvert.FormatNumber(basis+bonus)+")</font></div>"
          item.append(html_extra);
          item.addClass("xAddonItem");
          if(Settings.data.cave_warning&&(color!="")) item.css("color",color);
        }
      }
    });
  },
  createTotalsTooltip:function (id,values) {
  	var html_extra="<div id='wisdom_sidebar' class='sbInnerContainer xAddon xAddon_ut_a totals'>";
  	html_extra+="<table class='designedTable' id='"+id+"'>";
  	html_extra+="<thead><tr><td class='clear_first brdRight'></td><td class='white_last'></td></tr></thead>";
  	html_extra+="<tbody><tr class='top'>";
  	html_extra+="<td class='clear_first xAddon_ut_label xAddon_ut_label_attack'>";
  	html_extra+="<b>Angriff</b><br/>";
  	html_extra+="Basis:<br/>";
  	html_extra+="HeldenBonus:<br/>";
  	html_extra+="ItemBonus:<br/>";
  	html_extra+="ElixierBonus:<br/>";
  	html_extra+="Drache:<br/>";
  	html_extra+="Gesamt:</td>";
  	html_extra+="<td class='white_last xAddon_ut_value xAddon_ut_attack'>";
  	html_extra+="<br/>";
  	html_extra+="<span style='font-weight:normal;color:black;'>"+DataConvert.FormatNumber(values.attack)+"</span><br/>";
  	html_extra+="<span style='font-weight:normal;color:green;'>"+DataConvert.FormatNumber(values.attack_bonus)+"</span><br/>";
  	html_extra+="<span style='font-weight:normal;color:green;'>"+DataConvert.FormatNumber(values.attack_item)+"</span><br/>";
  	html_extra+="<span style='font-weight:normal;color:green;'>"+DataConvert.FormatNumber(values.attack_elix)+"</span><br/>";
  	html_extra+="<span style='font-weight:normal;color:green;'>"+DataConvert.FormatNumber(values.attack_dragon)+"</span><br/>";
  	html_extra+="<span style='font-weight:bold;color:green;'>"+DataConvert.FormatNumber(values.attack_total)+"</span></td>";
  	html_extra+="</tr><tr>";
  	html_extra+="<td class='clear_first xAddon_ut_label xAddon_ut_label_attack'>";
  	html_extra+="<b>Verteidigung</b><br/>";
  	html_extra+="Basis:<br/>";
  	html_extra+="HeldenBonus:<br/>";
  	html_extra+="ItemBonus:<br/>";
  	html_extra+="ElixierBonus:<br/>";
  	html_extra+="Drache:<br/>";
  	html_extra+="Gesamt:</td>";
  	html_extra+="<td class='white_last xAddon_ut_value xAddon_ut_attack'>";
  	html_extra+="<br/>";
  	html_extra+="<span style='font-weight:normal;color:black;'>"+DataConvert.FormatNumber(values.defense)+"</span><br/>";
  	html_extra+="<span style='font-weight:normal;color:green;'>"+DataConvert.FormatNumber(values.defense_bonus)+"</span><br/>";
  	html_extra+="<span style='font-weight:normal;color:green;'>"+DataConvert.FormatNumber(values.defense_item)+"</span><br/>";
  	html_extra+="<span style='font-weight:normal;color:green;'>"+DataConvert.FormatNumber(values.defense_elix)+"</span><br/>";
  	html_extra+="<span style='font-weight:normal;color:green;'>"+DataConvert.FormatNumber(values.defense_dragon)+"</span><br/>";
  	html_extra+="<span style='font-weight:bold;color:green;'>"+DataConvert.FormatNumber(values.defense_total)+"</span></td>";
  	html_extra+="</tr><tr>";
  	html_extra+="<td class='clear_first xAddon_ut_label xAddon_ut_label_attack'>";
  	html_extra+="<b>Leben</b><br/>";
  	html_extra+="Basis:<br/>";
  	html_extra+="HeldenBonus:<br/>";
  	html_extra+="ItemBonus:<br/>";
  	html_extra+="ElixierBonus:<br/>";
  	html_extra+="Drache:<br/>";
  	html_extra+="Gesamt:</td>";
  	html_extra+="<td class='white_last xAddon_ut_value xAddon_ut_attack'>";
  	html_extra+="<br/>";
  	html_extra+="<span style='font-weight:normal;color:black;'>"+DataConvert.FormatNumber(values.live)+"</span><br/>";
  	html_extra+="<span style='font-weight:normal;color:green;'>"+DataConvert.FormatNumber(values.live_bonus)+"</span><br/>";
  	html_extra+="<span style='font-weight:normal;color:green;'>"+DataConvert.FormatNumber(values.live_item)+"</span><br/>";
  	html_extra+="<span style='font-weight:normal;color:green;'>"+DataConvert.FormatNumber(values.live_elix)+"</span><br/>";
  	html_extra+="<span style='font-weight:normal;color:green;'>"+DataConvert.FormatNumber(values.live_dragon)+"</span><br/>";
  	html_extra+="<span style='font-weight:bold;color:green;'>"+DataConvert.FormatNumber(values.live_total)+"</span></td>";
  	html_extra+="</tr><tr>";
  	html_extra+="<td class='clear_first xAddon_ut_label xAddon_ut_label_speed'>Geschwindigkeit:</td>";
  	html_extra+="<td class='white_last xAddon_ut_value xAddon_ut_speed'>"+DataConvert.FormatNumber(values.speed)+" tpg</td>";
  	html_extra+="</tr><tr>";
  	html_extra+="<td class='clear_first xAddon_ut_label xAddon_ut_label_points'>Punkte:</td>";
  	html_extra+="<td class='white_last xAddon_ut_value xAddon_ut_points'>"+DataConvert.FormatNumber(values.points)+"</td>";
  	html_extra+="</tr></tbody>";
  	html_extra+="<tfoot><tr><td class='clear_first brdRight'></td><td class='white_last'></td></tr></tfoot>";
  	html_extra+="</table>";
  	html_extra+="</div>";
  	return html_extra;
  },
  addUniversalUnitTooltip:function () {
    var html_extra="<div id='wisdom_sidebar' class='sbInnerContainer xAddon xAddon_ut_a universal'>";
    html_extra+="<table class='designedTable' id='xAddon_Tooltip'>";
    html_extra+="<thead><tr><td class='clear_first'></td><td class='white_last'></td></tr></thead>";
    html_extra+="<tbody>";
    if(Settings.data.utt_title) {
      html_extra+="<tr class='top'>";
      html_extra+="<td class='clear_first xAddon_ut_title'></td>";
      html_extra+="<td class='white_last xAddon_ut_count'></td>";
      html_extra+="</tr><tr>";
    }
    else {
      html_extra+="<tr class='top'>";
    }
    html_extra+="<td class='clear_first xAddon_ut_label xAddon_ut_label_attack'>Angriff<span class='xAddon_ut_attack_info'></span>:</td>";
    html_extra+="<td class='white_last xAddon_ut_value xAddon_ut_attack'></td>";
    html_extra+="</tr><tr>";
    html_extra+="<td class='clear_first xAddon_ut_label xAddon_ut_label_defense'>Verteidigung<span class='xAddon_ut_defense_info'></span>:</td>";
    html_extra+="<td class='white_last xAddon_ut_value xAddon_ut_defense'></td>";
    html_extra+="</tr><tr>";
    html_extra+="<td class='clear_first xAddon_ut_label xAddon_ut_label_live'>Leben<span class='xAddon_ut_live_info'></span>:</td>";
    html_extra+="<td class='white_last xAddon_ut_value xAddon_ut_live'></td>";
    html_extra+="</tr>";
    if(Settings.data.utt_speed) {
      html_extra+="<tr>";
      html_extra+="<td class='clear_first xAddon_ut_label xAddon_ut_label_speed'>Geschwindigkeit:</td>";
      html_extra+="<td class='white_last xAddon_ut_value xAddon_ut_speed'></td>";
      html_extra+="</tr>";
    }
    html_extra+="<tr class='xAddonBeforeInfo'>";
    html_extra+="<td class='clear_first xAddon_ut_label xAddon_ut_label_points'>Punkte<span class='xAddon_ut_points_info'></span>:</td>";
    html_extra+="<td class='white_last xAddon_ut_value xAddon_ut_points'></td>";
    html_extra+="</tr>";
    if(Settings.data.utt_strength_weakness) {
      html_extra+="<tr>";
      html_extra+="<td class='clear_first xAddon_ut_strength' colspan='2'></td>";
      html_extra+="</tr><tr>";
      html_extra+="<td class='clear_first xAddon_ut_weakness' colspan='2'></td>";
      html_extra+="</tr>";
    }
    html_extra+="</tbody>";
    html_extra+="<tfoot><tr><td class='clear_first'></td><td class='clear_last'></td></tr></tfoot>";
    html_extra+="</table>";
    html_extra+="</div>";
    $("body").append(html_extra);
  },
  adjustUnitTooltip:function (count_item,item,tooltip,count,infos,infos_one) {
    tooltip.find(".xAddon_ut_title").html(AddHTML.addImage("unit",infos.id,true,"xAddon_ut_img")+"&nbsp;"+infos.name);
    tooltip.find(".xAddon_ut_count").html(DataConvert.FormatNumber(count));
    tooltip.find(".xAddon_ut_attack").html(DataConvert.FormatNumber(infos.attack));
    tooltip.find(".xAddon_ut_defense").html(DataConvert.FormatNumber(infos.defense));
    tooltip.find(".xAddon_ut_live").html(DataConvert.FormatNumber(infos.live));
    tooltip.find(".xAddon_ut_speed").html(DataConvert.FormatTPGNumber(infos.speed,"&nbsp;tpg"));
    tooltip.find(".xAddon_ut_points").html(DataConvert.FormatNumber(infos.points));
    tooltip.find(".xAddon_ut_attack_info").html("&nbsp;("+DataConvert.FormatNumber(infos_one.attack)+")");
    tooltip.find(".xAddon_ut_defense_info").html("&nbsp;("+DataConvert.FormatNumber(infos_one.defense)+")");
    tooltip.find(".xAddon_ut_live_info").html("&nbsp;("+DataConvert.FormatNumber(infos_one.live)+")");
    tooltip.find(".xAddon_ut_points_info").html("&nbsp;("+DataConvert.FormatNumber(infos_one.points)+")");
    tooltip.find(".xAddon_ut_strength").html("<span class='xAddon_ut_label_sw'>Stärken:</span> "+infos.strength);
    tooltip.find(".xAddon_ut_weakness").html("<span class='xAddon_ut_label_sw'>Schwächen:</span> "+infos.weakness);
  },
  addUnitTooltips:function () {
    var totalValues={
    	attack:0,
    	attack_bonus:0,
    	attack_hero:0,
    	attack_item:0,
    	attack_elix:0,
    	attack_dragon:0,
    	attack_total:0,
    	defense:0,
    	defense_bonus:0,
    	defense_hero:0,
    	defense_item:0,
    	defense_elix:0,
    	defense_dragon:0,
    	defense_total:0,
    	live:0,
    	live_bonus:0,
    	live_hero:0,
    	live_item:0,
    	live_elix:0,
    	live_dragon:0,
    	live_total:0,
    	speed:0,
    	speed:1,
    	points:0,
    	reviveMushrooms:0,
    	revivePowerStones:0
    };
    var totalValuesPalace={
    	attack:0,
    	attack_bonus:0,
    	attack_hero:0,
    	attack_item:0,
    	attack_elix:0,
    	attack_dragon:0,
    	attack_total:0,
    	defense:0,
    	defense_bonus:0,
    	defense_hero:0,
    	defense_item:0,
    	defense_elix:0,
    	defense_dragon:0,
    	defense_total:0,
    	live:0,
    	live_bonus:0,
    	live_hero:0,
    	live_item:0,
    	live_elix:0,
    	live_dragon:0,
    	live_total:0,
    	speed:0,
    	speed:1,
    	points:0,
    	reviveMushrooms:0,
    	revivePowerStones:0
    };
    var hasPalaceUnits=false;
    var unit_data="#transfer_hero_units #transfer_table tr td a, ";
    unit_data+="#transfer_cave #transfer_table tr td a, ";
    unit_data+="#current_units_production #current_unit_prduction table tbody tr td div, ";
    unit_data+="#units_build_list form .pngfix";
    $(unit_data).each(function() {
      var item=$(this);
      var palaceUnit=false;
      if (item.get(0).tagName=="A") {
        var nextItem=item.parent().next();
        if (nextItem&&nextItem.get(0).tagName=="TD") {nextItem=nextItem.next();palaceUnit=nextItem&&nextItem.hasClass("clear_last");}
      }
      item.addClass("xAddonItem");
      var count_item;
      if (item.hasClass("pngfix")) {
        count_item=item.next().children(".top").children("a");
        count_item.addClass("xAddonShaman");
      }
      else {
        count_item=item.parent().next();
        count_item.prev().toggleClass("clear_first white_first");
        count_item.toggleClass("clear_middle white_middle xAddonDefault");
      }
      var count=parseInt(count_item.html().replace(/\.|^Menge:\s*|\s+-\s+[A-Za-z\s]*$/g,''));
      var unit_infos=BaseData.unitInfos(item,count);
      if (!unit_infos) return;
      var infos=unit_infos.total;
      var infos_one=unit_infos.one;
      if (palaceUnit) {
        totalValuesPalace=GetSetData.addToValues(totalValuesPalace,infos);
        hasPalaceUnits=hasPalaceUnits||count>0;
      }
      else {totalValues=GetSetData.addToValues(totalValues,infos);}
      if (Settings.data.unit_tooltips) {
        count_item.hover(function(e) {
          var tooltip=$("#xAddon_Tooltip");
          AddHTML.adjustUnitTooltip(count_item,item,tooltip,count,infos,infos_one);
          AddHTML.positionTooltip(e,tooltip);
          tooltip.css({width:150,height:100});
          tooltip.show();
        }, function() {$("#xAddon_Tooltip").hide();}).mousemove(function(e) {
          AddHTML.positionTooltip(e,$("#xAddon_Tooltip"));
        });
      }
    });
    if (totalValues.speed==0) return totalValues;
    var old_tooltip=$("#xAddon_tooltip_total");
    if (old_tooltip.length>0) old_tooltip.remove();
    var old_tooltip_palace=$("#xAddon_tooltip_total_palace");
    if (old_tooltip_palace.length>0) old_tooltip_palace.remove();
    if (Settings.data.unit_totals) {
      totalValues.attack_hero=totalValues.attack+totalValues.attack_bonus;
      totalValues.defense_hero=totalValues.defense+totalValues.defense_bonus;
      totalValues.live_hero=totalValues.live+totalValues.live_bonus;
      totalValues.attack_item=Math.round(totalValues.attack_hero/100*parseFloat(isNaN(ItemBonus.attack)?0:ItemBonus.attack));
      totalValues.defense_item=Math.round(totalValues.defense_hero/100*parseFloat(isNaN(ItemBonus.defense)?0:ItemBonus.defense));
      totalValues.live_item=Math.round(totalValues.live_hero/100*parseFloat(isNaN(ItemBonus.live)?0:ItemBonus.live));
      totalValues.attack_elix=Math.round(totalValues.attack_hero/100*parseFloat(isNaN(ElixirBonus.attack)?0:ElixirBonus.attack));
      totalValues.defense_elix=Math.round(totalValues.defense_hero/100*parseFloat(isNaN(ElixirBonus.defense)?0:ElixirBonus.defense));
      totalValues.live_elix=Math.round(totalValues.live_hero/100*parseFloat(isNaN(ElixirBonus.live)?0:ElixirBonus.live));
      var dragons=GetSetData.Drachen();
      totalValues.attack_dragon=Math.round(dragons.attack?(totalValues.attack_hero/10):0);
      totalValues.defense_dragon=Math.round(dragons.defense?(totalValues.defense_hero/10):0);
      totalValues.live_dragon=Math.round(dragons.live?(totalValues.live_hero/10):0);
      totalValues.attack_total=totalValues.attack_hero+totalValues.attack_item+totalValues.attack_elix+totalValues.attack_dragon;
      totalValues.defense_total=totalValues.defense_hero+totalValues.defense_item+totalValues.defense_elix+totalValues.defense_dragon;
      totalValues.live_total=totalValues.live_hero+totalValues.live_item+totalValues.live_elix+totalValues.live_dragon;
      var id="xAddon_tooltip_total";
      $("body").append(AddHTML.createTotalsTooltip(id,totalValues));
      unit_data="#transfer_hero_units #transfer_table .top .gray_first, ";
      unit_data+="#transfer_cave #transfer_table .top .gray_first";
      var inset=$(unit_data);
      inset.hover(function(e) {
          var tooltip=$("#"+id);
          AddHTML.positionTooltip(e,tooltip);
          tooltip.css({width:150,height:100});
          tooltip.show();
      }, function () {$("#"+id).hide();});
      inset.mousemove(function(e) {AddHTML.positionTooltip(e,$("#"+id));});
      if (inset.text().indexOf("Wesen beim Held")!=-1) {
        inset.html("<small class='xAddon' style='font-weight:normal;'>beim Held: "+DataConvert.FormatNumber(totalValues.points)+" Punkte</small>");
      }
      else if (inset.text().indexOf("Wesen im Palast")!=-1) {
        inset.html("<small class='xAddon' style='font-weight:normal;'>im Palast: "+DataConvert.FormatNumber(totalValues.points)+" Punkte</small>");
      }
      else inset.append("<small class='xAddon' style='font-weight:normal;'> "+DataConvert.FormatNumber(totalValues.points)+" Punkte</small>");
      if (hasPalaceUnits) {
        totalValuesPalace.attack_hero=totalValuesPalace.attack+totalValuesPalace.attack_bonus;
        totalValuesPalace.defense_hero=totalValuesPalace.defense+totalValuesPalace.defense_bonus;
        totalValuesPalace.live_hero=totalValuesPalace.live+totalValuesPalace.live_bonus;
        totalValuesPalace.attack_item=Math.round(totalValuesPalace.attack_hero/100*parseFloat(ItemBonus.attack));
        totalValuesPalace.defense_item=Math.round(totalValuesPalace.defense_hero/100*parseFloat(ItemBonus.defense));
        totalValuesPalace.live_item=Math.round(totalValuesPalace.live_hero/100*parseFloat(ItemBonus.live));
        totalValuesPalace.attack_elix=Math.round(totalValuesPalace.attack_hero/100*parseFloat(isNaN(ElixirBonus.attack)?0:ElixirBonus.attack));
        totalValuesPalace.defense_elix=Math.round(totalValuesPalace.defense_hero/100*parseFloat(isNaN(ElixirBonus.defense)?0:ElixirBonus.defense));
        totalValuesPalace.live_elix=Math.round(totalValuesPalace.live_hero/100*parseFloat(isNaN(ElixirBonus.live)?0:ElixirBonus.live));
        var dragons=GetSetData.Drachen();
        totalValuesPalace.attack_dragon=Math.round(dragons.attack?(totalValuesPalace.attack_hero/10):0);
        totalValuesPalace.defense_dragon=Math.round(dragons.defense?(totalValuesPalace.defense_hero/10):0);
        totalValuesPalace.live_dragon=Math.round(dragons.live?(totalValuesPalace.live_hero/10):0);
        totalValuesPalace.attack_total=totalValuesPalace.attack_hero+totalValuesPalace.attack_item+totalValuesPalace.attack_elix+totalValuesPalace.attack_dragon;
        totalValuesPalace.defense_total=totalValuesPalace.defense_hero+totalValuesPalace.defense_item+totalValuesPalace.defense_elix+totalValuesPalace.defense_dragon;
        totalValuesPalace.live_total=totalValuesPalace.live_hero+totalValuesPalace.live_item+totalValuesPalace.live_elix+totalValuesPalace.live_dragon;
        var id_palace="xAddon_tooltip_total_palace";
        $("body").append(AddHTML.createTotalsTooltip(id_palace,totalValuesPalace));
        unit_data="#transfer_hero_units #transfer_table .top .gray_last, ";
        unit_data+="#transfer_cave #transfer_table .top .gray_last";
        var inset=$(unit_data);
        inset.hover(function(e) {
          var tooltip=$("#"+id_palace);
          AddHTML.positionTooltip(e,tooltip);
          tooltip.css({width:150,height:100});
          tooltip.show();
        }, function() {$("#"+id_palace).hide();});
        inset.mousemove(function (e) {AddHTML.positionTooltip(e,$("#"+id_palace));});
        if (inset.text().indexOf("Wesen in der Grotte")!=-1) {
          inset.html("<small class='xAddon' style='font-weight:normal;'> in der Grotte: "+DataConvert.FormatNumber(totalValuesPalace.points)+" Punkte</small>");
        }
        else if (inset.text().indexOf("Wesen im Palast")!=-1) {
          inset.html("<small class='xAddon' style='font-weight:normal;'>im Palast: "+DataConvert.FormatNumber(totalValuesPalace.points)+" Punkte</small>");
        }
        else inset.append("<small class='xAddon' style='font-weight:normal;'> "+DataConvert.FormatNumber(totalValues.points)+" Punkte</small>");
      }
    }
    return totalValues;
  },
  positionTooltip:function(e,tooltip) {
    var top=e.pageY-10;
    var max_bottom=$(window).height()+$(document).scrollTop();
    if (top+tooltip.height()>max_bottom) top=max_bottom-tooltip.height();
    tooltip.css({left:e.pageX+35,top:top});
  },
  addGuardInfo:function(totalValues) {
  	if(!Settings.data.guard_info) return;
  	if(totalValues.attack_total<=0) return;
    var max_guard_level=(typeof(Wächter[0])=="undefined")?0:Wächter[0].maxGuard;
    if(max_guard_level==0) {
    	alert("Es sind aktuell keine Wächter-Referenzen gespeichert.\nBitte lest eure KB, um Wächter-Referenzen anzulegen.");
    	return;
    }
    var guard_level=1;
    var first_guard_level=1;
    var last_guard_level=1;
    var guard_values=[];
    var hero_min_live=Math.round(totalValues.live_total*0.3);
    while(true) {
    	if(typeof(Wächter[guard_level])!="undefined") {
        var values=Wächter[guard_level];
        var guard_min_live=Math.round(values.live*0.3);
        var hero_attack=totalValues.attack_total;
        var hero_live=totalValues.live_total;
        var hero_damage=0;
        var guard_defense=values.defense;
        var guard_live=values.live;
        var guard_damage=0;
        var rounds=1;
        while(true) {
        	hero_damage=guard_defense/hero_live;
        	guard_damage=hero_attack/guard_live;
        	hero_live-=guard_defense;
        	guard_live-=hero_attack;
        	if((hero_live<hero_min_live)||(guard_live<guard_min_live)) break;
        	guard_defense-=Math.round(guard_defense*guard_damage)
        	hero_attack-=Math.round(hero_attack*hero_damage);
        	++rounds;
        }
        values.rounds=rounds;
        values.rating=Math.min(Math.round((1-hero_live/totalValues.live_total)*10000),10000);
      	guard_values[guard_level]=values;
        if((guard_level>max_guard_level)||(values.rating>=7000)) {
        	last_guard_level=Math.min(max_guard_level,guard_level);
        	break;
        }
        else if(values.rating<=100) {
        	first_guard_level=guard_level;
        }
      }
      guard_level++;
      if(guard_level>max_guard_level) {
      	last_guard_level=max_guard_level;
      	break;
      }
    }
  	if(Settings.data.guard_info_no_defeat) last_guard_level=Math.max(1,last_guard_level-1);
  	if(!Settings.data.guard_info_full) first_guard_level=Math.max(1,last_guard_level-2);
    var rate_guard_level=function(rating) {
      if (rating<=100) return 1;
      else if (rating<=500) return 2;
      else if (rating<=2500) return 3;
      else if (rating<=7000) return 4;
      else return 5;
    };
    var rate_guard=function(rating) {
    	var color="";
    	var victory="";
    	switch(rate_guard_level(rating)) {
    		case 1: color="008800"; victory="Sehr gut!"; break;
    		case 2: color="00CC00"; victory="Gut"; break;
    		case 3: color="AAAA00"; victory="Verluste"; break;
    		case 4: color="CC7700"; victory="hohe Verluste"; break;
    		case 5: color="CC0000"; victory="Niederlage!"; break;
      }
      return "<table width='95%'><tr><td style='color:#"+color+";'>&nbsp;&nbsp;"+victory+"</td><td style='text-align:right;'>"+DataConvert.FormatPercentage(rating)+"</td></tr></table>";
    };
    var guard_html=function (rating_level,guard_level,guard_values,rating) {
    	var html_extra="<tr class='xAddon_gi_row xAddon_gi_"+rating_level+"'>";
    	html_extra+="<td><img class='xAddon_gi_img' src='http://xhodon.de/xhodon/gfx/map/images/Icons/waechter/level"+guard_level+".png'/></td>";
    	html_extra+="<td class='xAddon_gi_level'>Wächter "+guard_level+":</td>";
    	html_extra+="<td class='xAddon_gi_defense'>"+DataConvert.FormatNumber(guard_values.defense)+"</td>";
    	html_extra+="<td class='xAddon_gi_live'>"+DataConvert.FormatNumber(guard_values.live)+"</td>";
    	html_extra+="<td class='xAddon_gi_rounds'>"+DataConvert.FormatNumber(guard_values.rounds)+"</td>";
    	html_extra+="<td class='xAddon_gi_rating'>"+rating+"</td>";
    	html_extra+="</tr>";
    	return html_extra;
    };
    var guard_list_html="";
    for(var i=first_guard_level;i<=last_guard_level;i++) {
    	if(typeof(guard_values[i])=="undefined") continue;
      guard_list_html+=guard_html(rate_guard_level(guard_values[i].rating),i,guard_values[i],rate_guard(guard_values[i].rating));
    }
    var html_extra="<tr class='top xAddon'>";
    html_extra+="<td class='gray_first' colspan=5>Wächtervorschau <small style='font-weight:normal;'>- stärkster bekannter Wächter: Level "+max_guard_level+"</small></td>";
    html_extra+="<td class='gray_last' colspan=3></td>";
    html_extra+="</tr><tr>";
    html_extra+="<td class='clear_first xAddon_gi_container' colspan=7>";
    html_extra+="<table id='guard_info'><tbody width=100%>";
    html_extra+="<tr class='xAddon_gi_header'>";
    html_extra+="<td></td><td></td>";
    html_extra+="<td class='xAddon_gi_header_defense'>Verteidigung</td>";
    html_extra+="<td class='xAddon_gi_header_live'>Leben</td>";
    html_extra+="<td class='xAddon_gi_header_rounds'>Runden</td>";
    html_extra+="<td class='xAddon_gi_header_rating'>Verluste</td>";
    html_extra+="</tr>";
    html_extra+=guard_list_html;
    html_extra+="</table>";
    html_extra+="</td>";
    html_extra+="</tr>";
    $("#transfer_hero_resources #transfer_table .top").before(html_extra);
  },
  addRessiCalc:function(res_kind) {
    var storyTxt=$('#resource_production .storyTxt');
    if (storyTxt==null) return;
    var text=storyTxt.html();
    if (text==null) return;
    if (text.search(/\/Tick/i)==-1) {
      var res=/Momentane Produktion:\s+([0-9\.]*)\s+\(\+?(-?[0-9\.]*)\)/i.exec(text);
      if (res==null) {
        res=/Momentane Produktion:\s+([0-9\.]*)/i.exec(text);
        if (res==null) return;
        res[2]=0;
      }
      var baseProduction=DataConvert.GetNumber(res[1]);
      var extraProduction=DataConvert.GetNumber(res[2]);
      var production=baseProduction+extraProduction;
			switch(res_kind) {
				case "1":
				  Ressi[palace].Essenzen.Basis=baseProduction;
				  Ressi[palace].Essenzen.Bonus=extraProduction;
				  break;
				case "2":
				  Ressi[palace].Kristallsplitter.Basis=baseProduction;
				  Ressi[palace].Kristallsplitter.Bonus=extraProduction;
				  break;
				case "3":
				  Ressi[palace].Kraftsteine.Basis=baseProduction;
				  Ressi[palace].Kraftsteine.Bonus=extraProduction;
				  break;
				case "16":
				  Ressi[palace].Goldharz.Basis=baseProduction;
				  Ressi[palace].Goldharz.Bonus=extraProduction;
				  break;
				case "0":
				  Ressi[palace].Mana.Basis=baseProduction;
				  Ressi[palace].Mana.Bonus=extraProduction;
				  break;
			}
      GM_setValue(server_name+".Ressi",DataIO.serialize(Ressi));
      if(!Settings.data.res_calc) return;
      var html_extra="<br/><br/><table class='designedTable'>";
      html_extra+="<thead><tr><td class='gray_first' width=50%></td><td class='gray_last'></td></tr></thead>";
      html_extra+="<tbody><tr class='top'>";
      html_extra+="<td class='gray_first'>Produktions-Zeit</td>";
      html_extra+="<td class='gray_last'>Ertrag</td>";
      html_extra+="</tr><tr class='brdTop'>";
      html_extra+="<td class='white_first'>pro Tick</td>";
      html_extra+="<td class='clear_last' align='right'>"+DataConvert.FormatNumber(production)+"</td>";
      html_extra+="</tr><tr class='brdTop'>";
      html_extra+="<td class='white_first'>je Stunde</td>";
      html_extra+="<td class='clear_last' align='right'>"+DataConvert.FormatNumber(production*60/BaseData.ticktime())+"</td>";
      html_extra+="</tr><tr class='brdTop'>";
      html_extra+="<td class='white_first'>am Tag</td>";
      html_extra+="<td class='clear_last' align='right'>"+DataConvert.FormatNumber(production*60/BaseData.ticktime()*24)+"</td>";
      html_extra+="</tr><tr class='brdTop'>";
      html_extra+="<td class='white_first'>in <input type='text' maxlength='3' id='calc_hours'/> Stunden</td>";
      html_extra+="<td class='clear_last' align='right'><span id='calc_ress'>---</span></td>";
      html_extra+="</tr></tbody>";
      html_extra+="<tfoot><tr><td class='white_first'></td><td class='clear_last'></td></tr></tfoot>";
      html_extra+="</table>";
      text+=html_extra;
      storyTxt.html(text);
      $("#calc_hours").width(25)
        .keydown(function(e) {
          return((e.which>=48&&e.which<=57)||(e.which>=96&&e.which<=105)||e.which==8||e.which==46);
        })
        .keyup(function(e) {
          if((e.which>=48&&e.which<=57)||(e.which>=96&&e.which<=105)||e.which==8||e.which==46) {
            var val=$(this).val();
            if (val=="") $("#calc_ress").html("---");
            else $("#calc_ress").html(DataConvert.FormatNumber(production*60/BaseData.ticktime()*parseInt(val)));
          }
        });
    }
  },
  addSchamaneInfo:function(totalValues) {
  	if(!Settings.data.shaman) return;
    var mushroomTable=$(".mushrooms");
    if (mushroomTable.length==0) return;
    mushroomTable.css({'margin-top':-10});
    var mushroom=GetSetData.SchamaneDaten();
    var perTickRow=$(".mushrooms tbody .brdTop");
    while (perTickRow.length>1) {perTickRow.last().remove();perTickRow=$(".mushrooms tbody .brdTop");}
    var mushroomDiff=totalValues.reviveMushrooms-mushroom.remaining;
    var mushroomTicks=Math.ceil(mushroomDiff/mushroom.perTick);
    var mushroomInfo=(mushroomDiff<=0)
      ?"(<span style='color:darkgreen;'>Genug vorhanden</span>)"
      :"(<span style='color:red;'>noch "+DataConvert.FormatNumber(mushroomDiff)+" verfügbar in "+DataConvert.FormatTimeFromTicks(mushroomTicks)+" Stunden</span>)";
    var powerStoneInfo=(Ressi[palace].Kraftsteine.Lager>=totalValues.revivePowerStones)
      ?"(<span style='color:darkgreen;'>Genug vorhanden</span>)"
      :"(<span style='color:red;'>es fehlen "+DataConvert.FormatNumber(totalValues.revivePowerStones-Ressi[palace].Kraftsteine.Lager)+"</span>)";
    var html_extra="<tr class='brdTop xAddon'>";
    html_extra+="<td class='white_first'>Insgesamt ben&ouml;tigte Pilze</td>";
    html_extra+="<td colspan='2' class='white_last'>"+DataConvert.FormatNumber(totalValues.reviveMushrooms);
    html_extra+="<img alt='Pilze' src='http://xhodon.de/xhodon/gfx/icons/mushrooms.png' class='icon20px'> "+mushroomInfo+"</td>";
    html_extra+="</tr><tr class='brdTop xAddon'>";
    html_extra+="<td class='white_first'>Insgesamt ben&ouml;tigte Kraftsteine</td>";
    html_extra+="<td colspan='2' class='white_last'>"+DataConvert.FormatNumber(totalValues.revivePowerStones);
    html_extra+="<img alt='Kraftsteine' src='http://xhodon.de/xhodon/gfx/icons/kraftstein.png' class='icon20px'> "+powerStoneInfo+"</td>";
    html_extra+="</tr><tr class='brdTop xAddon'>";
    html_extra+="<td class='white_first'>Punkte f&uuml;r alle Wesen</td>";
    html_extra+="<td colspan='2' class='white_last'>"+DataConvert.FormatNumber(totalValues.points)+"</td>";
    html_extra+="</tr>";
    $(".mushrooms tbody .brdTop:first").after(html_extra);
  },
  insertMsgButtons:function() {
    var msg_href=""
    var forward_button=false;
    $("#messagecontainer .message-bottom .stSubmitBtn").each(function() {
      var button=$(this);
      if (button&&button.text().indexOf("Löschen")!=-1) msg_href=button.attr('href');
      if (button&&button.text().indexOf("Weiterleiten")!=-1) forward_button=true;
    });
    if ((msg_href!="")&&!forward_button) {
    	msg_href=msg_href.replace("?mode=delete&mid","?write&mode=forward&mid");
      $("#messagecontainer .message-bottom").append('<a onclick="return ajax_link(this.href);" href="'+msg_href+'" class="stSubmitBtn right">Weiterleiten</a>');  
    }
  },
  insertCfgButton:function() {
    if ($("#xAddonConfig").length==0) {
      var profile_account_buttons=$("#sidebar .button");
      profile_account_buttons.each(function() {
        var button=$(this);
        if (button&&button.text().indexOf("Account-Einstellungen")!=-1) {
        	var html_extra="<li id='xAddonConfig' class='button small'>";
        	html_extra+="<a onclick='showAddonSettings(); return false;' href='#' class='first'>Xhodon-Addon Config</a>";
        	html_extra+="</li>";
          button.after(html_extra);
        }
      });
    }
  },
  addImage:function(typ,p1,p2,p3) {
  	switch(typ) {
  		case "image":
        var tt=(typeof(p3)=="string")?"onmouseout='nd();' onmouseover=\"return overlib('"+p3+"');\" ":"";
        return "<img "+tt+" alt='"+p2+"' src='http://xhodon.de/xhodon/gfx/icons/"+p1+"' class='icon20px'>";
      case "unit":
        if(p1.substr(0,6)=="creep_") p1="default";
        if(typeof(p2)=='undefined') p2=false;
        if(typeof(p3)=='undefined') p3="";
        if(p2) return "<div class='middleUBIcon' style='display:inline-block'><div class='xAddon_unit_image unit_"+p1+" "+p3+"' style='display:inline-block; vertical-align:middle;'></div></div>";
        else return "<div class='xAddon_unit_image unit_"+p1+" "+p3+"' "+"style='display:inline-block; vertical-align:middle;'></div>";
      case "unittext": //(unit_name,text,big_image)
        if(p1=="") return p2;
        var unit_real_name=BaseData.unitData[server][p1].name;
        var addText=" ("+unit_real_name+")";
        return "<div style='white-space:nowrap; vertical-align:middle;'>"+this.addImage("unit",p1,p3)+"&nbsp;"+p2+addText+"</div>";
      case "direct":
        return p1;
      default: return "";
    }
  },
  addManaProd:function() {
  	var summon=$("#input_time table tbody tr");
  	if(!summon.html()) return;
  	var ticks=summon.find("#build_value").val();
  	var mana=(Ressi[palace].Mana.Basis+Ressi[palace].Mana.Bonus)*ticks;
  	var html_extra="<td class='xAddon'>&nbsp;";
  	html_extra+="<img class='icon20px manaprod' onmouseover='return overlib(\"Mana-Produktion\");' onmouseout='nd();' title='' alt='Mana'";
  	html_extra+="src='http://eroberer.xhodon.de/xhodon/gfx//icons/mana.png'>";
  	html_extra+="</td><td>";
  	html_extra+="<span id='xAddon_build_mana'> "+mana+"</span>";
  	html_extra+="</td>";
  	summon.append(html_extra);
  	summon_timer=setInterval(function() {
  		var mana=(Ressi[palace].Mana.Basis+Ressi[palace].Mana.Bonus)*summon.find("#build_value").val();
  		$("#xAddon_build_mana").text(DataConvert.FormatNumber(mana));
  	},100);
  },
  addBRInfo:function() {
  	var msg=$(".container");
    if(msg.find("#messages_list").html()) return;
    if(msg.hasClass("xAddonTable")) return;
    var html_orig=msg.html();
    var pos_attack=html_orig.search(/<b>Angreifer<\/b>/);
    var pos_defense=html_orig.search(/<b>Verteidiger<\/b>/);
    var html_orig_prolog=html_orig.substring(0,pos_attack);
    var html_orig_attack=html_orig.substring(pos_attack,pos_defense);
    var html_orig_defense=html_orig.substring(pos_defense);
		var count_attack=0;
		var html_attack=[];
		var patt=/Erfahrung:/g;
		var offset=0;
		while(patt.test(html_orig_attack)) {
		  html_attack[count_attack]=html_orig_attack.substring(offset,patt.lastIndex-10);
		  offset=patt.lastIndex-10;
		  count_attack++;
		}
		html_attack[count_attack]=html_orig_attack.substring(offset);
		if(count_attack==0) return;
		var count_defense=0;
		var html_defense=[];
		var patt=/Erfahrung:|Wächter Le|Palast/g;
		var offset=0;
		while(patt.test(html_orig_defense)) {
			var diff=(html_orig_defense[patt.lastIndex-1]!="t")?10:6;
		  html_defense[count_defense]=html_orig_defense.substring(offset,patt.lastIndex-diff);
		  offset=patt.lastIndex-diff;
		  count_defense++;
		}
		html_defense[count_defense]=html_orig_defense.substring(offset);
		if(count_defense==0) return;
    var color_blue="#0000aa";
    var color_red="#aa0000";
    var color_green="#008800";
		var attack_sum=0;
		var defense_sum=0;
		var live_sum=0;
		var addData=function(data,kl) {
			var typ="";
			var typ_level=0;
			var typ_xp=0;
			switch(data.html()[0]) {
				case "E":
					typ="H";
					var xp_orig=/Erfahrung:\s+([0-9\.]*)/.exec(data.html());
					typ_xp=DataConvert.GetNumber(xp_orig[1]);
					data.html(data.html().replace(xp_orig[0],xp_orig[0].replace(xp_orig[1],DataConvert.FormatNumber(typ_xp))));
				  break;
				case "W":
					typ="W";
					var typ_level=DataConvert.GetNumber(/Wächter Level:\s+([0-9]*)/.exec(data.html())[1]);
				  break;
				case "(":
				  typ="P";
				  break;
			}
			var brt=data.find("table").first();
			if(brt.hasClass("xAddonTable")) return;
		  brt.addClass("xAddonTable");
      var attack=[0,0,0,0,0];
      var defense=[0,0,0,0,0];
      var live=[0,0,0,0,0];
      var points=[0,0,0,0,0];
      var revivePoints=[0,0,0,0,0];
      var reviveMushrooms=[0,0,0,0,0];
      var revivePowerStones=[0,0,0,0,0];
      var cols=0;
			brt.find("tbody tr").each(function() {
        var name=$(this).find("td").eq(0).text();
        if(!name) {
        	cols=$(this).find("th").length-1;
        	$(this).find("th:eq(0)").css("text-align","left");
        	$(this).find("th:not(:eq(0))").css("text-align","right");
        	return;
        }
        var values={};
        for (var i in BaseData.unitData[server]) {
        	if(name==BaseData.unitData[server][i].name) {
        		values=BaseData.unitData[server][i];
        		break;
        	}
        }
        var parm=[];
        for(var i=cols;i>0;i--) {
          parm[i]={};
          parm[i].td=$(this).find("td").eq(i);
          parm[i].count=parseInt(parm[i].td.text()?parm[i].td.text():0);
          if((i==2)&&(cols==4)) parm[i].count+=parm[4].count;
          parm[i].td.text(((parm[i].count==0)&&(i==4))?"":DataConvert.FormatNumber(parm[i].count));
          parm[i].td.css({"text-align":"right"});
          attack[i]+=values.attack*parm[i].count;
          defense[i]+=values.defense*parm[i].count;
          live[i]+=values.live*parm[i].count;
          points[i]+=values.points*parm[i].count;
          var reviveCount=Math.round(parm[i].count*(kl?7:8)/10);
          if(values.reviveMushrooms!=0) {
            revivePoints[i]+=values.points*reviveCount;
            reviveMushrooms[i]+=values.reviveMushrooms*reviveCount;
            revivePowerStones[i]+=values.revivePowerStones*reviveCount;
          }
        }
			});
			attack_sum=attack[1];
			defense_sum=defense[1];
			live_sum=live[1];
			var html_extra="";
			if(Settings.data.br_info_basedata) {
  			html_extra+="<table class='kbTable designedTable xAddonTable'>";
  			html_extra+="<tbody>";
  			html_extra+="<tr><th style='text-align:left;'>Basiswerte</th><th style='text-align:right;'>Vorher</th><th style='text-align:right;'>Nachher</th><th style='text-align:right;'>Änderung</th></tr>";
  			var attack_info="<tr style='color: "+color_blue+";'><td class='white_first'>Angriff</td>";
  			var defense_info="<tr style='color: "+color_blue+";'><td class='white_first'>Verteidigung</td>";
  			var live_info="<tr style='color: "+color_blue+";'><td class='white_first'>Leben</td>";
				var points_info="<tr style='color: "+color_blue+";'><td class='white_first'>Punkte</td>";
  			for(var i=1;i<=cols;i++) {
  				switch(i) {
  					case 1:
  					case 2:
      				attack_info+="<td style='text-align: right;' class='clear_middle'>"+DataConvert.FormatNumber(attack[i])+"</td>";
      				defense_info+="<td style='text-align: right;' class='clear_middle'>"+DataConvert.FormatNumber(defense[i])+"</td>";
      				live_info+="<td style='text-align: right;' class='clear_middle'>"+DataConvert.FormatNumber(live[i])+"</td>";
    					points_info+="<td style='text-align: right;' class='clear_middle'>"+DataConvert.FormatNumber(points[i])+"</td>";
      				break;
  					case 3:
        			attack_info+="<td style='text-align: right; color: "+((attack[1]>attack[2])?color_red:color_green)+";' class='clear_middle'>"+DataConvert.FormatNumber(attack[2]-attack[1])+"</td>";
        			defense_info+="<td style='text-align: right; color: "+((defense[1]>defense[2])?color_red:color_green)+";' class='clear_middle'>"+DataConvert.FormatNumber(defense[2]-defense[1])+"</td>";
        			live_info+="<td style='text-align: right; color: "+((live[1]>live[2])?color_red:color_green)+";' class='clear_middle'>"+DataConvert.FormatNumber(live[2]-live[1])+"</td>";
        			points_info+="<td style='text-align: right; color: "+((points[1]>points[2])?color_red:color_green)+";' class='clear_middle'>"+DataConvert.FormatNumber(points[2]-points[1])+"</td>";
      				break;
    			}
  			}
  			attack_info+="</tr>";
  			defense_info+="</tr>";
  			live_info+="</tr>";
				points_info+="</tr>";
  			html_extra+=((typ!="W")?attack_info:"")+defense_info+live_info+((typ!="W")?points_info:"");
  			html_extra+="</tbody>";
  			html_extra+="</table>";
  		}
			if(Settings.data.br_info_shaman&&(reviveMushrooms[3]>0)) {
  			html_extra+="<table class='kbTable designedTable xAddonTable'>";
  			html_extra+="<tbody>";
  			html_extra+="<tr><th style='text-align:left;'>Schamanenhütte</th><th style='text-align:right;'>Pilze</th><th style='text-align:right;'>Kraftsteine</th><th style='text-align:right;'>Punkte</th></tr>";
  			html_extra+="<tr style='color: "+color_blue+";'>";
  			html_extra+="<td class='white_first'>Schamanenhütte</td>";
  			html_extra+="<td style='text-align: right;' class='clear_middle'>"+DataConvert.FormatNumber(reviveMushrooms[3])+"</td>";
  			html_extra+="<td style='text-align: right;' class='clear_middle'>"+DataConvert.FormatNumber(revivePowerStones[3])+"</td>";
  			html_extra+="<td style='text-align: right; color: "+color_green+";' class='clear_middle'>"+DataConvert.FormatNumber(revivePoints[3])+"</td>";
  			html_extra+="</tr>";
  			html_extra+="</tbody>";
  			html_extra+="</table>";
			}
			if(Settings.data.br_info_score&&(typ!="W")) {
  			html_extra+="<table class='kbTable designedTable xAddonTable'>";
  			html_extra+="<tbody>";
  			html_extra+="<tr><th style='text-align:left;'>Punkte</th>"+((typ=="H")?"<th style='text-align:right;'>Erfahrung</th>":"")+"<th style='text-align:right;'>Wesen</th><th style='text-align:right;'>Schamanenhütte</th></tr>";
  			html_extra+="<tr style='color: "+color_blue+";'>";
  			html_extra+="<td class='white_first'></td>";
  			if(typ=="H") html_extra+="<td style='text-align: right; color: "+color_green+";' class='clear_middle'>"+DataConvert.FormatNumber(typ_xp)+"</td>";
        html_extra+="<td style='text-align: right; color: "+((points[1]>points[2])?color_red:color_green)+";' class='clear_middle'>"+DataConvert.FormatNumber(points[2]-points[1])+"</td>";
				html_extra+="<td style='text-align: right; color: "+color_green+";' class='clear_middle'>"+DataConvert.FormatNumber(revivePoints[3])+"</td>";
  			html_extra+="</tr>";
  			html_extra+="<tr style='color: "+color_blue+";'>";
  			var total_points=typ_xp+points[2]-points[1]+revivePoints[3];
  			html_extra+="<td class='white_first'><strong>Gesamt</strong></td>";
				html_extra+="<td colspan=3 style='text-align: right; color: "+((total_points<0)?color_red:color_green)+";' class='clear_middle'><strong>"+DataConvert.FormatNumber(total_points)+"</strong></td>";
  			html_extra+="</tr>";
  			html_extra+="</tbody>";
  			html_extra+="</table>";
			}
			if((typ=="W")&&(typ_level<99)) {
				if(typeof(Wächter[0])=="undefined") Wächter[0]={maxGuard:0};
				Wächter[0].maxGuard=Math.max(Wächter[0].maxGuard,typ_level);
				if(typeof(Wächter[typ_level])=="undefined") Wächter[typ_level]={defense:0, live:0};
				if((Wächter[typ_level].defense<defense)||(Wächter[typ_level].live<live)) alert("Neue Werte für Wächter Stufe "+typ_level+" ermittelt!");
				Wächter[typ_level].defense=Math.max(Wächter[typ_level].defense,defense[1]);
				Wächter[typ_level].live=Math.max(Wächter[typ_level].live,live[1]);
      	GM_setValue(server_name+".Wächter",DataIO.serialize(Wächter));
			}
			brt.after(html_extra);
		};
		var attack_asum=0;
		var defense_asum=0;
		var live_asum=0;
		for(var i=1;i<=count_attack;i++) {
			var extra=$("<p></p>").html(html_attack[i])
			addData(extra,count_attack>1);
			attack_asum+=attack_sum;
			defense_asum+=defense_sum;
			live_asum+=live_sum;
			html_attack[i]=extra.html();
		}
		var attack_dsum=0;
		var defense_dsum=0;
		var live_dsum=0;
		for(var i=1;i<=count_defense;i++) {
			var extra=$("<p></p>").html(html_defense[i]);
			addData(extra,false);
			attack_dsum+=attack_sum;
			defense_dsum+=defense_sum;
			live_dsum+=live_sum;
			html_defense[i]=extra.html();
		}
		// if((count_attack>1)||(count_defense>1)) alert("Angreifer: "+DataConvert.FormatNumber(attack_asum)+" / "+DataConvert.FormatNumber(live_asum)+"\nVerteidiger: "+DataConvert.FormatNumber(defense_dsum)+" / "+DataConvert.FormatNumber(live_dsum));
		var html_neu=html_orig_prolog;
		for(var i=0;i<=count_attack;i++) html_neu+=html_attack[i];
		for(var i=0;i<=count_defense;i++) html_neu+=html_defense[i];
		if((count_attack>1)||(count_defense>1)) {
			html_neu+="<br><br><table class='kbTable designedTable xAddonTable'>";
			html_neu+="<tbody>";
			html_neu+="<tr><th style='text-align:left;'>Total-Basiswerte</th><th style='text-align:right;'>Angriff</th><th style='text-align:right;'>Verteidigung</th><th style='text-align:right;'>Leben</th></tr>";
			html_neu+="<tr style='color: "+color_blue+";'>";
			html_neu+="<td class='white_first'>Angreifer</td>";
			html_neu+="<td style='text-align: right;' class='clear_middle'>"+DataConvert.FormatNumber(attack_asum)+"</td>";
			html_neu+="<td style='text-align: right;' class='clear_middle'>"+DataConvert.FormatNumber(defense_asum)+"</td>";
			html_neu+="<td style='text-align: right; color: "+color_green+";' class='clear_middle'>"+DataConvert.FormatNumber(live_asum)+"</td>";
			html_neu+="</tr>";
			html_neu+="<tr style='color: "+color_blue+";'>";
			html_neu+="<td class='white_first'>Verteidiger</td>";
			html_neu+="<td style='text-align: right;' class='clear_middle'>"+DataConvert.FormatNumber(attack_dsum)+"</td>";
			html_neu+="<td style='text-align: right;' class='clear_middle'>"+DataConvert.FormatNumber(defense_dsum)+"</td>";
			html_neu+="<td style='text-align: right; color: "+color_green+";' class='clear_middle'>"+DataConvert.FormatNumber(live_dsum)+"</td>";
			html_neu+="</tr>";
			html_neu+="</tbody>";
			html_neu+="</table>";
		}
  	if(Settings.data.br_info) msg.html(html_neu);
  },
  sortHeroes:function() {
  	if(!Settings.data.hero_sorting) return;
		var sidebar=$("ul.heroSidebar");
		var heroes_html_orig=sidebar.html();
		var heroes_html=[];
		var heroes_count=0;
		var patt=/<\/li>/g;
		var offset=0;
		while(patt.test(heroes_html_orig)) {
		  heroes_html[heroes_count]=heroes_html_orig.substring(offset,patt.lastIndex);
		  offset=patt.lastIndex;
		  heroes_count++;
		}
		heroes_html[heroes_count]=heroes_html_orig.substring(offset);
		if(heroes_count<=1) return;
  	var battle_count=0;
  	var battle_heroes=[];
  	var trans_count=0;
  	var trans_heroes=[];
  	for(var i=0;i<(heroes_count-1);i++) {
  		var hero=$("<p></p>").html(heroes_html[i]);
  		var id=GetSetData.HeldenID(hero.find("a").first().attr("href"));
  		if(hero.find("td:eq(0)").text()=="---") {
  			hero.find("li").css("display","none");
  			heroes_html[i]=hero.html();
  		}
  		if((typeof(Helden[id])!="undefined")&&Helden[id].isBattleHero) battle_heroes[battle_count++]={id:id,html:heroes_html[i]}; else trans_heroes[trans_count++]={id:id,html:heroes_html[i]};
  	}
		for(var i=1;i<battle_count;i++) {
			for(var j=i;j>0;j--) {				
				if(Helden[battle_heroes[j-1].id].xp>Helden[battle_heroes[j].id].xp) break;
				var tmp=battle_heroes[j-1];
				battle_heroes[j-1]=battle_heroes[j];
				battle_heroes[j]=tmp;
			}
		}
		var extra_html="";
		for(var i=0;i<battle_count;i++) extra_html+=battle_heroes[i].html;
		for(var i=0;i<trans_count;i++) extra_html+=trans_heroes[i].html;
		extra_html+=heroes_html[heroes_count-1];
		sidebar.html(extra_html);
  },
};

//****************************************************************************************************************************************************************
// globale Funktionen am unsafeWindow
//****************************************************************************************************************************************************************
unsafeWindow.showAddonSettings=function() {
	Settings.showMenu();
};
unsafeWindow.saveAddonSettings=function() {
	Settings.saveSettings();
};
unsafeWindow.autoGroup=function(cb) {
	Settings.autoGroup(cb);
};

//****************************************************************************************************************************************************************
// Initialisierung des AddOn-Systems
//****************************************************************************************************************************************************************
/*
ID  0 = Baum des Lebens
ID  1 = Kräuterschule
ID  2 = Kristallhöhle
ID  3 = Steinwurzel
ID  4 = Kriegsbrunnen
ID  5 = ---
ID  6 = Xhodotorischer Kokon
ID  7 = Steinmantel
ID  8 = Kristallturm
ID  9 = ---
ID 10 = Heldenstatue
ID 11 = Palasthof
ID 12 = ---
ID 13 = Zuchtstation
ID 14 = ---
ID 15 = Irres Auge
ID 16 = Harzader
ID 17 = Geheime Grotte
ID 18 = Kristallines Katapult
ID 19 = ---
ID 20 = Schamanenhütte
*/
if(typeof(unsafeWindow.ajax_load)=="undefined") return;
unsafeWindow.ajax_load_orig=unsafeWindow.ajax_load;
unsafeWindow.ajax_load=function(display) {
	unsafeWindow.ajax_load_orig(display);
	if(display==false) {
		setTimeout(function() {
			var tmp;
			tmp=/http:\/\/([^\.]*)\.xhodon.*/.exec(document.location);
			server=(tmp&&tmp.length>1)?tmp[1]:"";
			server_name=server;
			var sitter=$("#global_msg").text();
			if(sitter!="") {
				var sittername=/Vertretung Aktiv auf: (\S+)Ausschalten/.exec(sitter);
				server_name+=((sittername&&sittername.length>=1)?("_"+sittername[1]):"");
			}
			if (GM_getValue(server+".Settings")) Settings.saved=DataIO.unserialize(GM_getValue(server+".Settings"));
			$.extend(Settings.data,Settings.default,Settings.saved);
      if (GM_getValue(server_name+".Wächter")) Wächter=DataIO.unserialize(GM_getValue(server_name+".Wächter")); else Wächter={};
      if (GM_getValue(server_name+".Helden")) Helden=DataIO.unserialize(GM_getValue(server_name+".Helden")); else Helden={};
      if (GM_getValue(server_name+".ItemBonus")) ItemBonus=DataIO.unserialize(GM_getValue(server_name+".ItemBonus")); else ItemBonus={};
      if (GM_getValue(server_name+".Ressi")) Ressi=DataIO.unserialize(GM_getValue(server_name+".Ressi")); else Ressi={};
      if (GM_getValue(server_name+".ElixirBonus")) ElixirBonus=DataIO.unserialize(GM_getValue(server_name+".ElixirBonus")); else ElixirBonus={};
			if (Settings.data.format_tick) {
				var tick=$("#klick_countdown");
				window.setInterval(function() {
					if (tick.html()) tick.css({'color':'rgb(0,255,0)','font-weight':'bold','font-size':'1.6em'});
				},999);
			}
			var hash=document.location.hash;
			var pos=hash.indexOf(".php");
			var slashPos=hash.lastIndexOf("/",pos);
			if ((pos!=-1)&&(slashPos!=-1)) {
				page.name=hash.substring(slashPos+1,pos);
				if(page.name=="index") {
					var slashPos2=hash.lastIndexOf("/",slashPos-1);
					page.name=hash.substring(slashPos2+1,slashPos);
				}
				if (page.name=="building") {
					var id=/building.php\?numeric\[building_id\]=(\d+)/.exec(hash);
					page.id=(id&&id.length>=1)?id[1]:-1;
				}
			}
			$(".xAddon").remove();
  		clearInterval(summon_timer);
			var style=".xAddon_ut_a table {display:none;position:absolute;background:rgba(240,240,240,.8);border-radius:5px;}";
			style+=".xAddon_ut_title {font:small-caps 11px Verdana;text-align:right;}";
			style+=".xAddon_ut_count {font-weight:bold;font-size:1.2em;text-align:right;}";
			style+=".xAddon_ut_label {font-weight:normal !important;text-align:right;}";
			style+=".xAddon_ut_value {font-weight:normal !important;text-align:right;}";
			style+=".xAddon_ut_label_sw {font-weight:bold;}";
			style+=".xAddon_ut_attack_info,.xAddon_ut_defense_info,.xAddon_ut_live_info,.xAddon_ut_points_info {color:#808080;}";
      GM_addStyle(style);
      style="#guard_info {width:100%;height:100%;font-weight:normal;}";
      style+=".xAddon_gi_container {padding:0px;}";
      style+=".xAddon_gi_row {}";
      style+=".xAddon_gi_header {text-align:right;font-weight:bold;}";
      style+=".xAddon_gi_header_rating {text-align:center;}";
      style+=".xAddon_gi_1 {background:rgba(160,250,160,.6);}";
      style+=".xAddon_gi_2 {background:rgba(160,250,160,.3);}";
      style+=".xAddon_gi_3 {background:rgba(220,220,160,.3);}";
      style+=".xAddon_gi_4 {background:rgba(240,200,160,.6);}";
      style+=".xAddon_gi_5 {background:rgba(250,160,160,.6);}";
      style+=".xAddon_gi_img {height:26px;}";
      style+=".xAddon_gi_level {font-weight:bold;}";
      style+=".xAddon_gi_defense,.xAddon_gi_live,.xAddon_gi_rounds {text-align:right;}";
      style+=".xAddon_gi_rating {text-align:left;}";
      GM_addStyle(style);
			if(Settings.data.hide_advert) {
				$(".deactivateAdvert").hide();
				$("#advert").hide();
			}
			AddHTML.addUniversalUnitTooltip();
      tmp=$("#palace_selector").text();
      palace=tmp.substr((tmp.indexOf(":"))-2,(tmp.lastIndexOf(":"))+2).trim();
      GetSetData.RessiLager();
			if (page.name=="messages") AddHTML.insertMsgButtons();
			if (page.name=="user_profile") AddHTML.insertCfgButton();
			if (page.name=="items") GetSetData.ItemBonus();
			if (page.name=="elixir") GetSetData.ElixirBonus();
			var totalValues=false;
			if((page.name=="heros")||(page.name=="hero_get_targets")) {
				AddHTML.sortHeroes();
				hero=GetSetData.HeldenDaten();
				totalValues=AddHTML.addUnitTooltips();
				AddHTML.addGuardInfo(totalValues===false?AddHTML.addUnitTooltips():totalValues);
			}
			if (page.name=="building") {
				if (page.id<=3||page.id==16) AddHTML.addRessiCalc(page.id);
				if (page.id==6||page.id==13||page.id==17||page.id==20) totalValues=AddHTML.addUnitTooltips();
				if (page.id==17) GetSetData.Grotte();
				if (page.id==20) AddHTML.addSchamaneInfo(totalValues===false?AddHTML.addUnitTooltips():totalValues);
			}
			AddHTML.addRessiProd();
			if (page.name=="summon") AddHTML.addManaProd();
			if (page.name=="messages") AddHTML.addBRInfo();
			if (page.name=="map") GetSetData.setHeldKordi();
		},1);
	}
};
