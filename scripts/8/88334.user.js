// ==UserScript==
// @name DS مدير المزرعة
// @description Version 2.0.11.Zeigt erweiterte Dorfinfos auf der Karte, sowie im VP 
// @author Hypix
// @namespace http://hypix.de/
// @include http://*.tribalwars.ae/game.php*
// @include http://ch*.staemme.ch/game.php*
// ==/UserScript==
//
// 
//


var version="100%";
var displayedflag = 0;

unsafeWindow.displaywiki = function() {
	if(displayedflag == 0) {
		document.getElementById("wikiframe").innerHTML = '<iframe width="764" border="0" frameborder="0" height="100%" src="http://tw4me.com/" style="margin-left:26px;"></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showwiki = function() {
	if(document.getElementById("wikibar").style.left == "-802px")
	{
		document.getElementById("wikibar").style.left = "0px;"
	}
	document.getElementById("wikibar").style.left = "0px;"
}

unsafeWindow.hidewiki = function() {
	document.getElementById("wikibar").style.left = "-802px;"
}

vwikibar = document.createElement("div");
vwikibar.setAttribute("id", "wikibar");

var body = document.getElementsByTagName("body");

body[0].appendChild(vwikibar);


var wkHTML = '<div id="wikitab" onmouseover="showwiki()" onclick="hidewiki()"><a style="height:100%;width:100%;"></a></div>'
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:800px;position:absolute;top:0px;left:0px;height:30px;background:url(http://ae1.tribalwars.ae/graphic/background/bg-tile.jpg);background-repeat:no-repeat;">'
	+ '<a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://plapl.com">plapl.com'+version+'</a></div>'
	+ '<div id="wikiframe" style="position:absolute;top:30px;bottom:3px;left:4px;" onmouseover="displaywiki()">Mouse over this area to load the wiki</div>'
	+ '<div style="width:800px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://ae1.tribalwars.ae/graphic/background/bg-tile.jpg);background-repeat:no-repeat;"></div>';

GM_addStyle("#wikibar { background:url(http://ae1.tribalwars.ae/graphic/background/bg-tile.jpg); padding-top:33px; width:800px; position:fixed; left:-802px; top:15px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#wikibar:hover { left:0px; }");
GM_addStyle("#wikitab { background:url(http://dc01.arabsh.com/i/00106/tf0q156i0xhf.png); width:17px; height:102px; position:absolute; right:-17px; top:0px; } ");
GM_addStyle("#wikitab:hover { cursor: pointer; } ");

document.getElementById("wikibar").innerHTML = wkHTML;

///// End of script /////

(function(){
var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
var version = "2.0.10";
var params = parseParams(location.href);
var menu = document.getElementById("menu_row");
if( !menu || !/screen=memo/.test(menu.innerHTML) )
  return;

if( typeof( Debug ) == "undefined" )
{
  function Debug()
  {
    this.log = function(msg)
    {
      if( typeof(GM_log) == "function" )
        GM_log(msg);
      else if( opera )
        opera.postError(msg);
      else if( console )
        console.log(msg);
      else
        alert(msg);
    }  
    
    this.dumpObj = function(obj)
    {
      var str = "\n{";
      for( var key in obj )
      {
        if( typeof( obj[key] ) == "object" )
        {
          str += "\n" + key + ":";
          str += this.dumpObj(obj[key],true)
        }
        else
          str += "\n" + key + ": " + obj[key];
      }
      str += "\n}";
      this.log(str);
      return str;
    }
  }
}

if( typeof(StorageHandler) == "undefined" )
{
  var StorageHandler = function(prefix,forceGM)
  {
    var win = gm ? unsafeWindow : window;
    var ls = false;
    try {ls = typeof(win.localStorage) != "undefined";} catch(e) {new Debug().log(e.description);}
    if( forceGM && gm || !ls)
    {
      if( gm )
      {
        prefix = prefix + "_" + document.location.host.split('.')[0];
        this.setValue = function(key,value) 
        {
          GM_setValue(prefix+"_"+key,value);
        };
        this.getValue = function(key,defaultValue)
        {
          return GM_getValue(prefix+"_" + key, defaultValue);
        }
        this.deleteValue = function(key)
        {
          GM_deleteValue(prefix+"_"+key);
        }
        this.listValues = function()
        {
          var allkeys = GM_listValues();
          var serverKeys = [];
          var re = new RegExp("^"+prefix+"_(.*)");
          for( var i = 0; i < allkeys.length; i++ )
          {
            var res = allkeys[i].match(re);
            if( res )
              serverKeys.push(res[1]);
          }
          return serverKeys;
        }
      }
      else
      {
        alert( "Keine geeignete Speichermöglichkeit gefunden!");
        end;
      }
    }
    else if( ls )
    {
      this.setValue = function(key,value) 
      {
        localStorage.setItem(prefix+"_"+key, value );
      };    
      this.getValue = function(key,defaultValue)
      {
        var value = localStorage.getItem(prefix+"_"+key);
        if( value )
          return value;
        else
          return defaultValue;
      };
      this.deleteValue = function(key)
      {
        localStorage.removeItem("hpxdsfm_"+key);
      }
      this.listValues = function()
      {
        var keys = [];
        for( var i = 0; i < win.localStorage.length; i++ )
        {
          var res = localStorage.key(i).match("^hpxdsfm_(.*)");
          if( res )
            keys.push(res[1]);
        }
        return keys;
      }
    }
    else
    {
      alert( "Keine geeignete Speichermöglichkeit gefunden!");
      end;
    }
    this.clear = function()
    {
      var keys = this.listValues();
      for( var i = 0; i < keys.length; i++ )
        this.deleteValue(keys[i]);
    }
  }
}

var debug = new Debug();
var storage = new StorageHandler("hpxdsfm",true);

function village(x,y)
{
  if( typeof(y) == "undefined" )
  {
    var coords = x.split("_");
    x = coords[0];
    y = coords[1];
  }
  this.coords = { x: parseInt(x,10), y: parseInt(y,10) };
  this.bonus = Number.NaN;
  this.color = "";
  this.eq = 100;
  this.lastreport = {rid : 0, timestamp: 0};
  this.loyalty = { rid: 0, timestamp: 0, value: 100 };
  this.res = { rid: 0, timestamp: 0 };
  this.buildings = { rid: 0, timestamp: 0 };
  this.unitsin = { rid: 0, timestamp: 0, hasUnits: false };
  this.unitsout = { rid: 0, timestamp: 0, hasUnits: false };
  
  this.load = function()
  {
    var vKey = this.coords.x + "_" + this.coords.y;
    var data = storage.getValue(vKey,"NaN,;100;0,0;0,0,100;0,0,0,0,0;0,0,;0,0,;0,0,");
    this.fromString(data);
    return this;
  };

  this.fromString = function(str)
  {
    var ts = getTime();
    var minTS = ts - settings.reportMaxAge * 86400;
    var data = str.split(";");
    var parts = data[0].split(",");
    this.bonus = parseInt(parts[0],10);
    this.color = parts[1];
    this.eq = parseInt(data[1],10);
    if( this.eq > 100 )
      this.eq = 100;
    parts = data[2].split(",");
    this.lastreport.rid = parseInt(parts[0],10);
    this.lastreport.timestamp = parseInt(parts[1],10);
    parts = data[3].split(",");
    this.loyalty.rid = parseInt(parts[0],10);
    this.loyalty.timestamp = parseInt(parts[1],10);
    this.loyalty.value = parseInt(parts[2],10);
    parts = data[4].split(",");
    this.res.rid = parseInt(parts[0],10);
    var ts = parseInt(parts[1],10);
    this.res.timestamp = ts < minTS ? 0 : ts;
    this.res.wood = parseInt(parts[2],10);
    this.res.stone = parseInt(parts[3],10);
    this.res.iron = parseInt(parts[4],10);
    parts = data[5].split(",");
    this.buildings.rid = parseInt(parts[0],10);
    ts = parseInt(parts[1],10);
    this.buildings.timestamp = ts < minTS ? 0 : ts;
    for( var i = 0; i < buildinginfo.length; i++ )
    {
      var level = parseInt(parts[i*2+2],10);
      this.buildings[buildinginfo[i].name] = { level: isNaN(level) ? 0 : level, change: parseInt(parts[i*2+3],10) };
    }
    parts = data[6].split(",");
    this.unitsin.rid = parseInt(parts[0],10);
    ts = parseInt(parts[1],10);
    this.unitsin.timestamp = ts < minTS ? 0 : ts;
    i = 2;
    for( var key in unitinfo )
    {
      var val = parseInt(parts[i++]);
      this.unitsin[key] = isNaN(val) ? 0 : val;
      if( this.unitsin[key] > 0 )
        this.unitsin.hasUnits = true;
    }
    parts = data[7].split(",");
    this.unitsout.rid = parseInt(parts[0],10);
    ts = parseInt(parts[1],10);
    this.unitsout.timestamp = ts < minTS ? 0 : ts;
    i = 2;
    for( var key in unitinfo )
    {
      var val = parseInt(parts[i++]);
      this.unitsout[key] = isNaN(val) ? 0 : val;
      if( this.unitsout[key] > 0 )
        this.unitsout.hasUnits = true;
    }
    return this;
  };
  
  this.toString = function(str)
  {
    if( this.eq > 100 )
      this.eq = 100;
    var str = this.bonus+","+this.color+";"+this.eq+";"+this.lastreport.rid+","+this.lastreport.timestamp+";";
    str += this.loyalty.rid + "," + this.loyalty.timestamp + ","  + this.loyalty.value + ";";
    str += this.res.rid + "," + this.res.timestamp + ",";
    str += this.res.wood + ",";
    str += this.res.stone + ",";
    str += this.res.iron + ";";
    str += this.buildings.rid + "," + this.buildings.timestamp + ",";
    if( this.buildings.timestamp > 0 )
    {
      for( var i = 0; i < buildinginfo.length; i++ )
      {
        if( i > 0 )
          str += ",";
        str += this.buildings[buildinginfo[i].name].level + "," + this.buildings[buildinginfo[i].name].change;
      }
    }
    str += ";";
    str += this.unitsin.rid + "," + this.unitsin.timestamp + ",";
    if( this.unitsin.timestamp > 0 )
    {
      var units = "";
      for( var key in unitinfo )
        units += "," + this.unitsin[key];
      str += units.substring(1);
    }
    str += ";";
    str += this.unitsout.rid + "," + this.unitsout.timestamp + ",";
    if( this.unitsout.timestamp > 0 )
    {
      var units = "";
      for( var key in unitinfo )
        units += "," + this.unitsout[key];
      str += units.substring(1);
    }
    return str;
  };
  
  this.save = function()
  {
    storage.setValue(this.coords.x+"_"+this.coords.y, this.toString());
    return this;
  };
  
  this.merge = function(vil)
  {
    if( this.lastreport.timestamp < vil.lastreport.timestamp )
    {
      this.bonus = vil.bonus;
      this.color = vil.color;
      this.lastreport = vil.lastreport;
      this.eq = vil.eq;
    }
    if( this.loyalty.timestamp < vil.loyalty.timestamp )
      this.loyalty = vil.loyalty;
    if( this.res.timestamp < vil.res.timestamp )
      this.res = vil.res;
    if( this.buildings.timestamp < vil.buildings.timestamp )
      this.buildings = vil.buildings;
    if( this.unitsin.timestamp < vil.unitsin.timestamp )
      this.unitsin = vil.unitsin;
    if( this.unitsout.timestamp < vil.unitsout.timestamp )
      this.unitsout = vil.unitsout;
    return this;
  };
  
  this.updateMapData = function(bonus,color)
  {
    var modified = false;
    if( this.bonus != bonus )
    {
      this.bonus = bonus;
      modified = true;
    }
    if( this.color != color )
    {
      this.color = color;
      modified = true;
    }
    if( this.lastreport.timestamp > 0 && modified )
      this.save();
    return this;
  }
}

var timeDiff = getTimeDiff();
var game_data = getGameData();

var server = document.location.host.split('.')[0];
res = server.match(/^([a-z]+)(\d+)/);
var lang = res[1];
var welt = parseInt(res[2], 10);

if( lang == "ae" || (lang == "ch" && welt < 4) || lang == "chs" )
  lang = "de";

var texts = 
{
  de: 
  { 
    units: 
    {
      spear: "مقاتل رمح",
      sword: "مقاتل سيف",
      axe: "مقاتل سيف",
      archer: "رماة الاسهم",
      spy: "كشافة",
      light: "فارس خفيف",
      marcher: "فارس قويس",
      heavy: "فارس تقيل",
      ram: "محطمة",
      catapult: "مقلاع",
      knight: "قائد الفرسان",
      snob: "نبيل"
    },
    
    buildings:
    {
      main: " ﻪﻳﺮﻘﻟﺍ ﺰﻛﺮﻣ ",
      barracks: "التكنات",
      stable: "الاسطبل", 
      garage: "الورشة",
      church: "Kirche",
      church_f1: "Erste Kirche",
      snob: "الاكادمية",
      smith: "الجداد",
      place: "نقطة التجمع", 
      statue: "النصب التدكاري",
      market: "السوق",
      wood: "الخشاب",
      stone: "ﻲﻤﻄﻟﺍ ﺓﺮﻔﺣ",
      iron: "منجم الحديد",
      farm: "المزارع",
      storage: "المخازن",
      hide: "المخبا",
      wall: "الحائط"
    },
    
    resources:
    {
      wood: "خشب",
      stone: "طمي",
      iron: "حديد"
    },

    gui:
    {
      title: "Mr-ALA1 مدير مزرعة ",
      redir_villageinfo: "الوضع العادي",
      redir_place: "هجوم على القرية",
      redir_market: "ارسال موارد",
      redir_centermap: "مركز القرية وسط الخريطة",
      redir_removeinfo: "حدف المعلومات", 
      redir_selectvillage: "اختيار القرية",
      redir_togglenofarm: "تعيين مزارعك على الخريطة",
      redir_reserve: "Dorf reservieren",
      redir_getress: "استقبال الموارد",
      delinfos: "حدف معلومات مدير المزارع",
      confirm_delinfos: "هل تريد حدف معلومات مدير المزرعة حقا?",
      delattmark: "Angriffsmarker حدف",
      addfarmlist: "Farmlistensperre aufheben",
      sum: "المجموع",
      unitsin: "القوات",
      unitsout: "Truppen ausserhalb",
      buildings: "المباني",
      load: "حمولة القوات",
      insertunits: "ادخال الوحدات",
      farmlist: "قائمة المزارع",
      ok_with_hotkey: "Ok [↵]",
      delfromfarmlist: "اضفة القريه قائمة المزارع",
      resources: "موارد",
      spy: "تجسس",
      current: "aktuell",
      arrival: "bei Ankunft",
      coords: "x|y",
      dist: "Entf.",
      redirTitle: "تطبيق الامر التالي :",
      statsTitle: ["موارد مضة عليها ", "ساعة"],
      addbb2fl: "BB-Dörfer zur Farmliste hinzufügen",
      reports: "التقارير",
      close: "اغلاق",
      infoTitle: "TW4-معلومات - مدير المزرعة ",
      noInfos: "لا توجد معلومات متاحة",
      mining: "الدعم / الذاكرة",
      loyalty: "Zustimmung",
      confirm_delinfosxy: ["بيانة القرية "," حدف?"],
      catas: "Katas",
      level: "المستوى",
      age: "Alter",
      days: ["يوم", "Tage"],
      hours: "ساعة",
      minutes: "دقيقة",
      stateTitle: "معلومات مدير المزارع",
      ownVillage: "قرية خاصة",
      oldReport: "التقرير هدا قديم جدا ",
      reportRead: "قراءة التقرير",
      reportKnown: "تمت قراءة هذا التقرير",
      confirm_delAll: "هل حقا تريد حذف جميع معلومات في العالم هدا",
      allDataDeleted: "تم حذف جميع البيانات في العالم الحالي.",
      useHotKeys: "تمكين مفاتيح الاختصار",
      mapSettings: "Karten-Einstellungen",
      rememberMapPos: "Kartenpositionen wiederherstellen",
      mapRedirActive: "\"Klick auf Dorf\"-Umleitungen aktiviert",
      reportMaxAge: "Maximales Berichtalter in Tagen",
      sumHours: ["Beute der letzen ", "  Stunden addieren" ],
      overlayTitle: "Overlays", 
      popupTitle: "Dorf-Popup", 
      ageTransparency: ["Overlay ab","Tagen Berichtalter langsam ausblenden"],
      popupShowRessis: "Aktuell erwartete Rohstoffe anzeigen",
      opacityMin: "Min. Deckkraft der Rohstoffsumme (0 - 100)",
      popupShowReportAge: ["Berichtalter anzeigen ab", "Stunden"],
      opacityMaxRes: "Min. erwartete Ressourcen für volle Deckkraft",
      popupShowBuildings: "Gebäudestufen anzeigen",
      mapShowRessis: "Aktuell erwartete Rohstoffe anzeigen",
      popupShowBuildingChange: "التنقيحات مستوى البناء",
      mapPlayerColored: "Rohstoffe bei Spielerdörfern farbig",
      popupShowMining: "Förderung und Speichergröße anzeigen",
      mapShowBars: "Speicherfüllstandsgrafik anzeigen",
      popupShowUnitsIn: "Einheiten im Dorf anzeigen",
      mapShowWall: "Wall anzeigen",
      popupShowUnitsOut: "Einheiten außerhalb anzeigen",
      popupShowLoyalty: "Zustimmung anzeigen",
      placeSettings: "Versammlungsplatz-Einstellungen",
      placeNoReportLoad: ["Einheiten mit", "Ladekapazität einfügen, wenn kein Bericht vorhanden" ],
      placeShowRessis: "Erwartete Rohstoffe anzeigen",
      placeShowUnitsIn: "Einheiten im Dorf anzeigen",
      placeShowUnitsOut: "Einheiten ausserhalb anzeigen",
      placeShowBuildings: ["عرض البناء", "لا", " فقط الجدار", "الكل"],
      placeShowBuildingChange: "Gebäudestufenänderungen anzeigen",
      placeShowCatas: "المقاليع المطلوبة لتدمير المباني وتظهر",
      placeOkOnPlayer: ["Ok-Button auf der Bestätigungsseite", ", wenn Angriff auf ein Spielerdorf geht", "belassen", "Rot färben", "deaktivieren", "deaktiveren und Dorf sperren" ],
      placeMinLoad: ["Angriff-Button deaktiveren, wenn die Ladekapazität unter", "sinkt" ],
      farmlistSettings: ["قائمة المزارع","Farmen mit den meissten Rohstoffen im Umkreis von","Feldern","Umkreis erhöhen, wenn nicht alle Top-Farmen min. ", " Resourcen haben ."],
      savebutton: "حفظ",
      importbutton: "استيراد البيانات",
      exportbutton: "تصدير البيانات",
      deletebutton: "حدف البيانات",
      startimport: "استيراد",
      importTitle: "استيراد",
      exportTitle: "تصدير",
      importDone: "Die Daten wurden importiert",
      unknowVersion: "Unbekannte Version",
      wrongFormat: "Falsches Format",
      settingsSaved: " تم حفظ إعدادات مدير المزرعة Mr-ALA1! ",
      farmUnitsConfig: "تكوين مجموعات وحدات لزراعة",
      priority: "الأولوية",
      groupName: "المجموعات",
      higherPrio: "Höhere Priorität",
      lowerPrio: "Niedriegere Priorität",
      unitInfoKnown: "Einheiten wurden ermittelt",
      enableAttack: "Angriff freigeben",
      mapShowGroups: "Gruppen eigener Dörfer anzeigen",
      mapShowPoints: "Punkte fremder Dörfer anzeigen",
      maxAttAge: "max. Alter der Angriffsmarker in Stunden",
      attackAgain: "هجوم مرة أخرى",
      quotient: "Erfolgsquotient",
      usequotient: "اعتبار نسبة النجاح",
      incompleteExp: "البيانات لا يبدو أن يكون كاملا (معرف نهاية مفقود)!",
      reportStates: ["تقرير معروف ", "تقرير الميلاد ", "التقرير غير معروف" ],
      loadServerCfg: "سيتم تحديد ملقم التكوين...",
      serverCfgKnown: "Serverkonfiguration wurde ermittelt",
      loadUnitinfo: "سيتم تحديد وحدات...",
      unitInfoKnown: "Einheiten wurden ermittelt",
      error: "Fehler",
      ok: "ok",
      fl_sum: "&sum;",
      fl_eq: "EQ",
      ok_btn: "OK",
      cancel_btn: "Abbrechen",
      all: "Alle",
      unsupportedVersion: "Das Datenformat dieser Version wird nicht unterstützt",
      unknownBaseConfig: "Unbekannte Konfiguration!",
      getatts: "قراءة الهجمات المستمرة",
      attsparsed: "تم العتور على هجمات متحركة",
      placeSendRam: ["ضمن المحطمة فقط, اذا","تدقيق الحائط. في مستوى", "هو","genug Rammen vorhanden sind, um den Wall zu zerstören"],
      sendram: "استخدام محطمة الحائط",
      unitGroups: "مجموععات الوحدات ",
      delGroup: "حدف المجموعة",
      newGroup: "مجموعة جديدة",
      minUnits: "(حدد) الحد الأدنى من كمية الوحدات",
      stayOrderTitle: "وحدات ذات اولوية / وحدات احتمال وجودها في القرية ",
      stayUnits: "عدد جنود احتمال وجودها في القرية",
      unit: "الوحدات",
      unitSelect: ["اختيار الوحدات","آلي","يدوي"],
      wrongworld: "Die Daten sind für von einem anderem Server",
      attackOwnVillage: "Wirklich den Angriff auf ein eigenes Dorf freigeben?",
    },
    
    regex:
    {
      reportTitle: "<[Hh]3>لقد انتصر المهاجم| المدافع في المعركة<\\/[Hh]3>",
      villageLink: "\\((\\d{1,3})\\|(\\d{1,3})\\) K(\\d+)$", // hier ist eigentlich nur das "K" für Kontintent anzupassen
      reportDate: "(\\d{2})\\.(\\d{2})\\.(\\d{2}) (\\d{2}):(\\d{2})",
      sendDate: "تم الارسال<\\/[tT][dD]><[Tt][Dd]>(\\d{2})\\.(\\d{2})\\.(\\d{2}) (\\d{2}):(\\d{2})",
      loyaltyChange: "esunken von <[Bb]>\\d+<\\/[Bb]> auf <[Bb]>(-?\\d+)",
      attack: "المهاجم",
      spy: "التجسس",
      spyres: "الموارد:",
      spybuildings: "المباني",
      buildinglevel: "\\s*([^\\)]*)\\((\\d+) المستوى\\)",
      defunits: "Einheiten außerhalb:",
      beute: ":ﺔﻤﻴﻨﻐﻟﺍ",
      settings: "الخيارات",
      damage: "[^>]+>(.+) لقد تم تدمير الحائط او تم خفض المستواى من <[Bb]>\\d+<\/[Bb]> الى <[Bb]>(\\d+)",
    },
    
    locale:
    {
      date2MS: function(res) { return new Date( 2000 + parseInt(res[3],10), parseInt(res[2],10)-1, parseInt(res[1],10), parseInt(res[4],10), parseInt(res[5],10), 0 ).getTime() }, // Funtion um aus dem match-Result von "regex.sendDate" den Timestamp zu erhalten
      nrgroupsign: "."
    }
  },
  ch: 
  { 
    units: 
    {
      spear: "مقاتل الرمح",
      sword: "مقاتل السيف",
      axe: "مقاتل الفاس",
      archer: "رماة الاسهم",
      spy: "كشافة",
      light: "فارس خفيف",
      marcher: "فارس تقيل",
      heavy: "فارس القوس",
      ram: "محطمة الحائط",
      catapult: "مقلاع",
      knight: "قائد الفرسان",
      snob: "نبيل"
    },
    
    buildings:
    {
      main: "مركز القريه",
      barracks: "الثكنات",
      stable: "الاسطبل", 
      garage: "الورشة",
      church: "Chiuche",
      church_f1: "Erschti Chiuche",
      snob: "الاكاديميه",
      smith: "الحداد",
      place: "نقطة التجمع", 
      statue: "النصب التذكاري",
      market: "السوق",
      wood: "الخشاب",
      stone: "حفرة الطمي",
      iron: "منجم الحديد",
      farm: "المزارع",
      storage: "المخازن",
      hide: "المخابئ",
      wall: "الحائط"
    },
    
    resources:
    {
      wood: "خشب",
      stone: "طمي",
      iron: "حديد"
    },

    gui: {},
    
    regex:
    {
      svr_gamespeed: "Spiugeschwindigkeit",
      svr_unitspeed: "Iheitegschwindigkeit",
      svr_version: "Version",
      infovillage: "Dorfübersicht",
      reportTitle: "<h3>Dr Agrifer|Vrteidiger het gwunne<\\/h3>",
      villageLink: "\\((\\d{1,3})\\|(\\d{1,3})\\) K(\\d+)$", // hier ist eigentlich nur das "K" für Kontintent anzupassen
      loyaltyChange: "Zuestimmig gsunke vo <b>\\d+<\\/b> uf <b>(-?\\d+)",
      sendDate: "Gsändet<\\/td><td>(\\d{2})\\.(\\d{2})\\.(\\d{2}) (\\d{2}):(\\d{2})",
      reportDate: "(\\d{2})\\.(\\d{2})\\.(\\d{2}) (\\d{2}):(\\d{2})",
      attack: "هجوم",
      spy: "ﺲﺴﺠﺘﻟﺍ",
      spyres: ":ﺩﺭﺍﻮﻤﻟﺍ",
      spybuildings: "ﻲﻧﺎﺒﻣ",
      buildinglevel: "\\s*([^\\)]*)\\((\\d+) ﻯﻮﺘﺴﻤﻟﺍ\\)",
      defunits: "Truppe des Verteidiger",
      beute: ":ﺔﻤﻴﻨﻐﻟﺍ",
      settings: "Istellige"
    },
    
    locale:
    {
      date2MS: function(res) { return new Date( 2000 + parseInt(res[3],10), parseInt(res[2],10)-1, parseInt(res[1],10), parseInt(res[4],10), parseInt(res[5],10), 0 ).getTime() },
      nrgroupsign: "."
    }
  },
}

texts.ch.gui = texts.de.gui;

if( typeof(texts[lang]) == "undefined" )
{
  alert( "Farmmanager:\nLanguage not supported!" );
  return;
}

var nofarmpng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAA7wsK9wMG9wQD9gUE9wQF9wQH9AYE9QYF9QYJ8ggG9gsM9wwO9g4P+wEC+QMA+gIB+gIC+QID+gIE+AMF+AQC+AQD+AYF/QAA/QAB/QAC/AIB+AgJ+AsN8xAP8xER9BAQ9BMS9BIT9RQV9RYV8hoa9RsZ9hob9hse9h8i8iAd9CAi8S4s71BQ81RS8F9e7GFe62Nh6mNj62Nl62dk62Zl7GFg7WBh7GNg7WJi7mRg7WVh7WZg7mRm7m9w7W9x7W9y63J07HNy7Hd17Hd373h38GNh8GVk82hm8XVz8XZ38Xx79Ht754aG6YWH6YaF6IqK6oyI7IuK7YyL8oOF8oaG8ouJ85GT8pWX9JmW9JqW9Z+d85+g9aei96io9Kqt9K2t9a6u86+w8rGu9LKv9rSv8rOx8bK29LKx9LSz9bq39bq7+Li598zM9dTT99zaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH1mncAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAAzElEQVQYV2P4DwS+BuZmZmZ+ICYDEDsKCUhKSUkJ2UP4TqJSUpJAICHiAOI7igqAeEC+hJDdfwZ/dnVxBWUlMU1uIV45Fn8GS8+McI98b/2kFM7c+FBTBotIXS2hHKFYxSjtZMZMEwYjlQgfID+RI0wnL93WhsFQjyubI0s0Tj5aNU1Y2prBOCQxhi2VyS0pnitBWNKKIYBDTVyQR1BIQ0ZaVlA4iOG/Mys/xH5JSSFXkPtcmMHOleIT9oK4H6oCKAvh/w+0dQeCYBATAHESSVaqgfK6AAAAAElFTkSuQmCC";
var attentionpng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAvlI+tlhDu1pHt2JTs2xfvHNbtX1xyDEK0isIy0Uux1Ax3kcm3lIt5Uce5Ukp5FAo6VEp5V0/4GM+6GM701xI0mFB22dL12pR0nhf3Hln6GpO63ZV6XJZ73Fb1ol23ol47Ixv5YBy7Yd6h4eDgImEioqKmp6ltYuAt5aOqaeirKyltbW1tLix1J2M25OB2ZiG25+P2quZ27Gn4ZeK4ZqO7JOB5Z2U46eZ4ame7aiW7bOp5bex4MK86sjF6srI8M/D8d7Z997b7ODb9eHe9OLe7e/37vL09eTl9e7z9vHw9vT89fj79Pr79vr8+vv3+fn4+fn5+Pr4+v35+/37+/z8+Pz+/P76/Pz8/f78////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKNkz+QAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAAiklEQVQYV2P4jwoYcPH1IBIweUVlU2S+uJCDqzFC3kDGzMvdEsEXlnNUV3UxhOkXE7Dy1lbxN4fyjQSlPUJ11MKd9CHm84pY+0ZGRUUGAa0A8iX5ZD1DInS1IoKd5UF8Dn5bnzC/qKjAADclIJ+Nk8fezsbCREFKQpQbJM/ExcjMwsquoYnsXpi3AEDdknMUSj+yAAAAAElFTkSuQmCC";
var wallpng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAMAAADXT/YiAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZ3bsYwAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAAJ0lEQVQYV2P4//8/IyMjkGQAMkAcEAvEADEZIAwgEysLoQ5JL8w8ALK7PNjpoF2NAAAAAElFTkSuQmCC";
var unitspng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAMAAADXT/YiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAszD0iAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAAKUlEQVQYV2P4//8/AwMDiAQzQEwGIAMsDJWBS0DUgiUhuuDqkPTCzAMA4dos1Ep3neEAAAAASUVORK5CYII=";

var buildinginfo = [ { name: "main",      img: '<img src="graphic/buildings/main.png" border="0"/>',     show: true, minlevel: 1},
                     { name: "barracks",  img: '<img src="graphic/buildings/barracks.png" border="0"/>', show: true, minlevel: 0},
                     { name: "stable",    img: '<img src="graphic/buildings/stable.png" border="0"/>',   show: true, minlevel: 0},
                     { name: "garage",    img: '<img src="graphic/buildings/garage.png" border="0"/>',   show: true, minlevel: 0},
                     { name: "church",    img: '<img src="graphic/buildings/church.png" border="0"/>',   show: true, minlevel: 0},
                     { name: "church_f1", img: '<img src="graphic/buildings/church.png" border="0"/>',   show: true, minlevel: 0},
                     { name: "snob",      img: '<img src="graphic/buildings/snob.png" border="0"/>',     show: true, minlevel: 0},
                     { name: "smith",     img: '<img src="graphic/buildings/smith.png" border="0"/>',    show: true, minlevel: 0},
                     { name: "place",     img: '<img src="graphic/buildings/place.png" border="0"/>',    show: true, minlevel: 0},
                     { name: "statue",    img: '<img src="graphic/buildings/statue.png" border="0"/>',   show: true, minlevel: 0},
                     { name: "market",    img: '<img src="graphic/buildings/market.png" border="0"/>',   show: true, minlevel: 0},
                     { name: "wood",      img: '<img src="graphic/buildings/wood.png" border="0"/>',     show: true, minlevel: 0},
                     { name: "stone",     img: '<img src="graphic/buildings/stone.png" border="0"/>',    show: true, minlevel: 0},
                     { name: "iron",      img: '<img src="graphic/buildings/iron.png" border="0"/>',     show: true, minlevel: 0},
                     { name: "farm",      img: '<img src="graphic/buildings/farm.png" border="0"/>',     show: true, minlevel: 1},
                     { name: "storage",   img: '<img src="graphic/buildings/storage.png" border="0"/>',  show: true, minlevel: 1},
                     { name: "hide",      img: '<img src="graphic/buildings/hide.png" border="0"/>',     show: true, minlevel: 0},
                     { name: "wall",      img: '<img src="graphic/buildings/wall.png" border="0"/>',     show: true, minlevel: 0} ];
var buildingKeys = {};
var resKey = {};
for( var key in texts[lang].resources )
  resKey[texts[lang].resources[key]] = key;
for( var key in texts[lang].buildings )
  buildingKeys[texts[lang].buildings[key]] = key;

var katasNeeded = [0,2,6,10,15,21,28,36,45,56,68,82,98,115,136,159,185,215,248,286,328,376,430,490,558,634,720,815,922,1041,1175];
var ramsNeeded = [0,2,4,7,10,14,19,24,30,37,46,55,65,77,91,106,124,143,166,191,219];
var redirTargets = { villageinfo:   { key: 68 }, 
                     place:         { key: 84 },
                     market:        { key: 82 }, 
                     getress:       { key: 72 },                     
                     centermap:     { key: 90 },
                     removeinfo:    { key: 76 },
                     selectvillage: { key: 65 },
                     togglenofarm:  { key: 70 },
//                     reserve:       { key: 79 }, 
                   };
 
var resInfos = { wood:  { img: "graphic/holz.png", bonus: 1}, 
                 stone: { img: "graphic/lehm.png", bonus: 2 },
                 iron:  { img: "graphic/eisen.png", bonus: 3} };
var ressis = ["wood", "stone", "iron" ];
var boni = { "none": 0, "wood": 1, "stone": 2, "iron": 3, "farm": 4, "barracks": 5, "stable": 6, "garage": 7, "all": 8, "storage": 9 };
var settingNames = [ "rememberMapPos",
                     "sumHours",
                     "reportMaxAge",
                     "opacityMin", 
                     "opacityMaxRes",
                     "ageTransparency",
                     "minAgeTransparency",
                     "mapShowBars", 
                     "mapShowRessis", 
                     "mapPlayerColored", 
                     "mapShowWall",
                     "popupShowRessis",
                     "popupShowReportAge", 
                     "popupMinReportAge",
                     "popupShowBuildings",
                     "popupShowMining",  
                     "popupShowUnitsIn", 
                     "popupShowUnitsOut", 
                     "popupShowLoyalty",
                     "placeShowRessis",
                     "placeShowUnitsIn",
                     "placeShowUnitsOut",
                     "placeShowBuildings",
                     "placeShowCatas",
                     "placeNoReportLoad",
                     "mapRedirActive",
                     "placeMaxFarms",
                     "placeFarmDist",
                     "placeOkOnPlayer",
                     "placeIncRangeRes",
                     "useHotKeys",
                     "popupShowBuildingChange",
                     "placeShowBuildingChange",
                     "placeMinLoad",
                     "mapShowGroups",
                     "mapShowPoints",
                     "maxAttAge",
                     "placeMinRamWall",
                     "placeMinRamsNeeded"];
var settingDefaults = "1,24,5,40,20000,1,1,1,1,1,1,1,1,48,1,1,1,1,1,1,1,1,2,1,10000,1,10,8,1,10000,1,1,1,10,1,1,24,1,1";
var colBgColor = ['rgb(248, 244, 232)', 'rgb(222, 211, 185)' ];
var minBarMax = 0;
var settings;

if( parseInt(storage.getValue("patch",0),10)==0)
{
  var vals = storage.getValue("settings",settingDefaults).split(",");
  if( vals.length == 40 )
  {
    vals.splice(37,1);
    storage.setValue("settings", vals.join(","));
  }
  storage.deleteValue("unitinfo");
  storage.deleteValue("farmunitscfg");
  storage.setValue("patch",1);
}

loadSettings();

var redirTarget = storage.getValue("redirTarget", "villageinfo");
var mapId = ["mapOld", "mapNew"];
var curMap = 0;
var iconSize = { width: 53, height: 38 };
var mapSize = { width: 0, height: 0, count: 0 };
var placeX=-1;
var placeY=-1;
var timer;
var mapMoveSteps;
var report;
var userLoad = false;
var farmunits;
var farmUnitsCfg;
var curFarmDist;
var maxRangeInc = 10;
var placeSubmits;
var farmListSort;
var hotKeys = [];
var atts = storage.getValue( "atts","");
var nofarms = storage.getValue( "nofarms", "");
var bbs = [];
var useeq = storage.getValue( "useeq", 1 );
var serverlistmode = 0;
var isUV = !isNaN(parseInt(params.t,10));
if( isUV )
  uv = "t=" + params.t + "&";
else
  uv = "";

var serverCfg;
var unitinfo;
var ajaxLoaded = 0;
eval( "serverCfg = " + storage.getValue("svrcfg") + ";" );
eval( "unitinfo = " + storage.getValue("unitinfo") + ";" );
var ownPid = parseInt(game_data.player.id,10);
var curVillage = parseInt(game_data.village.id,10);
var coords = game_data.village.coord.split("|");
var curX = parseInt(coords[0],10);
var curY = parseInt(coords[1],10);
var map_x0;
var map_y0;
setGlobalHotkeys();

if( typeof(unitinfo) != "object" || typeof(serverCfg) != "object" )
{
  var div = createShadowDiv("block");
  div = div.appendChild(document.createElement("div"));
  div.style.position="absolute";
  div.style.width = "300px";
  div.style.height = "50px";
  div.style.top = ((window.innerHeight - 50) / 2) + "px";
  div.style.left = ((window.innerWidth - 300) / 2) + "px";
  div.style.zIndex = 1000;
  html = '<table class="main" style="border:2px solid #804000; width:300px; height:50px;">';
  html += '<tr><th><table cellpadding="0" cellspacing="0" width="100%"><tr><td>'+texts[lang].gui.title+'</td><td style="text-align:right;"><a href="javascript:;" onclick="javascript:document.location.reload();">'+texts[lang].gui.close+'</a></td></tr></table></th></tr>';
  html += '<tr><td>';
  if( serverCfg )
  {
    html += '<span style="font-weight:bold; color:green;">'+texts[lang].gui.serverCfgKnown+'</span>';
    ajaxLoaded++;
  }
  else
  {
    html += texts[lang].gui.loadServerCfg + '... <span id="dsfm_svrcfg" style="font-weight:bold;"/>';
    loadConfig();
  }
  html += '</td></tr><tr><td>';
  if( unitinfo )
  {
    html += '<span style="font-weight:bold; color:green;">'+texts[lang].gui.unitInfoKnown+'</span>';
    ajaxLoaded++;
  }
  else
  {
    html += texts[lang].gui.loadUnitinfo + '... <span id="dsfm_units"  style="font-weight:bold;"/>';
    loadUnits();
  }
  html += "</td></tr>";
  html += '</td></tr></table>';
  div.innerHTML = html;
  storage.setValue("patch",1);
  if( ajaxLoaded != 2  )
    return;
}

var unitanz = 0;
for( var key in unitinfo )
  unitanz++;

var getMining;
var getStorageSize;
var getHideSize;

switch( serverCfg.game_base_config )
{
  case 1:
    getMining = function(level) { return (level == 0 ? 5 : Math.round(15 * Math.pow(1.1849979,(level-1)))) * serverCfg.speed };
    getStorageSize = function(report) { var ret = 1000*Math.pow(1.23,report.buildings.storage.level-1); if( report.bonus == 9 ) ret *= 1.5; return Math.round(ret); };
    getHideSize = function(level) { return level == 0 ? 0 : Math.round(100*Math.pow(1.3511,level-1)); };
    break;
  case 3:
    getMining = function(level) { return (level == 0 ? 5 : Math.round(30 * Math.pow(1.149999,(level-1)))) * serverCfg.speed };
    getStorageSize = function(report) { var ret = 1000*Math.pow(1.23,report.buildings.storage.level-1); if( report.bonus == 9 ) ret *= 1.5; return Math.round(ret); };
    getHideSize = function(level) { return level == 0 ? 0 : Math.round(100*Math.pow(1.3511,level-1)); };
    break;
  case 4:
  case 5:
  case 6:
    getMining = function(level) { return (level == 0 ? 5 : Math.round(30 * Math.pow(1.163118,(level-1)))) * serverCfg.speed };
    getStorageSize = function(report) { var ret = 1000*Math.pow(1.2294934,report.buildings.storage.level-1); if( report.bonus == 9 ) ret *= 1.5; return Math.round(ret); };
    getHideSize = function(level) { return level == 0 ? 0 : Math.round(150*Math.pow(1.3335,level-1)); };
    break;
  default:
    alert( texts[lang].gui.unknownBaseConfig );
    return;
    break;
}

if( isUV )
  ownPid = parseInt(params.t,10);

if( params.screen == "report" && params.get("view",0) == 0 )
{
  var e = document.getElementsByTagName("form")[0].getElementsByTagName("table")[1];
  if( e )
  {
    e.rows[0].appendChild(document.createElement("th")).innerHTML = "FM";
    e.rows[e.rows.length-1].appendChild(document.createElement("th"));
    var lnks = e.getElementsByTagName("a");
    var row = 1;
    var maxAge = settings.reportMaxAge * 24 * 60 * 60;
    var states = ["green","yellow","red"];
    var rids = storage.getValue("rids","");
    for( var i = 0; i < lnks.length; i++ )
    {
      var id = lnks[i].href.match(/view=(\d+)/);
      if( id )
      {
        var hasReport = new RegExp("\\d+,"+id[1]+";").test(rids);
        var state = 0;
        if( !hasReport )
        {
          var ts = texts[lang].locale.date2MS(e.rows[row].cells[1].innerHTML.match(new RegExp(texts[lang].regex.reportDate)))/1000;
          if( getTime() - ts > maxAge )
            state = 1;
          else
            state = 2;
        }
        e.rows[row++].appendChild(document.createElement("td")).innerHTML = '<img src="/graphic/dots/' + states[state] + '.png" alt="" title="' + texts[lang].gui.reportStates[state] + '"/>';
      }
    }
  }
}

if( params.screen == "settings" && params.mode == "settings" )
{
  showSettings();
  return;
}

// Karte
if( params.screen == "map" )
{
  cleanUp();
  mapInit();
  mapCreateOverlays();
  return;
}

// Bericht
if( params.screen=="report" )
{
  if( (params.mode == "all" || params.mode == "attack") && params.get("view",0) > 0 )
    parseReport(false);
  else if( params.mode="view_public_report" )
    parseReport(true);
  return;
}

if( params.screen == "info_village" )
{
  var tab = document.getElementsByClassName("main")[0].getElementsByTagName("table")[0];
  var coords = tab.rows[1].cells[1].innerHTML.split("|");
  coords = coords[0]+"_"+coords[1];
  var hasAtts = new RegExp(coords+";").test(atts);
  var hasData = storage.getValue(coords);
  if( hasData )
  {
    var row = tab.insertRow(tab.rows.length);
    var cell = row.insertCell(0);
    cell.colSpan=2;
    var a = cell.appendChild(document.createElement("a"));
    a.href = "javascript:;";
    a.innerHTML = "&raquo; "+texts[lang].gui.delinfos;
    a.addEventListener("click", function(e){ if( confirm(texts[lang].gui.confirm_delinfos) ) {  deleteVillageInfos(coords); e.target.parentNode.parentNode.removeChild(e.target.parentNode);} }, false );
  }
  var row = tab.insertRow(tab.rows.length);
  var cell = row.insertCell(0);
  cell.colSpan=2;
  var input = cell.appendChild(document.createElement("input"));
  cell.appendChild(document.createTextNode(texts[lang].gui.delfromfarmlist));
  input.type="checkbox";
  input.checked = new RegExp(coords+";").test(storage.getValue("nofarms",""));
  input.addEventListener("click", function(e){ if( this.checked ) storage.setValue("nofarms",storage.getValue("nofarms")+coords+";"); else storage.setValue("nofarms",storage.getValue("nofarms","").replace(new RegExp(coords+";","g"),"")); }, false );
  return;
}

if( params.screen == "place" && document.getElementById("inputx") )
{
  placeSubmits = [];
  userLoad = false;
  farmUnitsCfg  = loadFarmUnitConfig();
  cleanUp();
  var e = document.getElementById("inline_popup");
  if( e )
  {
    loadFarmList();
    var input = e.parentNode.getElementsByTagName("input");
    var selunits = parseInt(storage.getValue("unitsselected",0),10);
    for( var i = 0; i < input.length; i++ )
    {
      if( input[i].className=="unitsInput" )
      {
        input[i].parentNode.className="nowrap";
        input[i].addEventListener("keyup", updatePlace, false );
        var chk = document.createElement("input");
        chk.type="checkbox";
        chk.id="dsfm_"+input[i].name+"_use";
        chk.value = unitinfo[input[i].name].bit;
        chk.disabled = true;
        chk.checked = (selunits & parseInt(chk.value,10)) > 0;
        chk.addEventListener("click", function() { var units = parseInt(storage.getValue("unitsselected",0),10); if( this.checked ) units |= this.value; else units &= ~this.value; storage.setValue("unitsselected", units ); }, false );
        input[i].parentNode.insertBefore(chk,input[i]);
        i++; // Die eingefügte Checkbox ist direkt in input[] vorhanden und ist am aktuellen index, also überspringen, damit wir wieder auf dem Eingabefeld sind
      }
      else if( input[i].name == "attack" )
      {
        placeSubmits[0] = input[i];
        if( settings.useHotKeys )
        {
          input[i].value = input[i].value + " [↵]";
          hotKeys.push( { key: 13, func: function(e) { placeSubmits[0].click(); } } );
        }
      }
      else if( input[i].name == "support" )
      {
        placeSubmits[1] = input[i];
        if( settings.useHotKeys )
        {
          input[i].value = input[i].value + " [U]";
          hotKeys.push( { key: 85, func: function(e) { placeSubmits[1].click(); } } );
        }
        var row = input[i].parentNode.parentNode;
        var cell = row.insertCell(row.cells.length);
        var a = cell.appendChild(document.createElement("a"));
        a.style.display = "none";
        a.href = "javascript:;";
        a.id = "dsfm_enableattack";
        a.addEventListener("click", enableAttack, false );
        a.innerHTML = "&raquo; "+ texts[lang].gui.enableAttack;
      }
    }
    var tab = e.parentNode.insertBefore(document.createElement("table"),e);
    tab.id = "dsfm_tab";
    tab.style.border = "1px solid rgb(222, 211, 185)";
    tab.className="nowrap";
    tab.style.width = "630px";
    var row = tab.insertRow(tab.rows.length);
    var cell = row.appendChild(document.createElement("th"));
    cell.colSpan = 5;
    cell.innerHTML = texts[lang].gui.title;
    row = tab.insertRow(tab.rows.length);
    row.id = "dsfm_row_ress";
    row.style.display = "none";
    cell = row.insertCell(0);
    cell.innerHTML = '<span id="dsfm_title"></span><br/><span style="display:none; font-size:xx-small;" id="dsfm_resources_age"></span>';
    cell = row.insertCell(1);
    cell.colSpan = 3;
    var html = '<table cellspacing="0" cellpadding="0"><tr><td><img src="graphic/holz.png" style="border: 0 none;" alt="'+texts[lang].resources.wood+'" title="'+texts[lang].resources.wood+'"/></td><td id="dsfm_wood" style="padding-right:20px; font-weight:bold;"></td>';
    html += '<td><img src="graphic/lehm.png" style="border: 0 none;" alt="'+texts[lang].resources.stone+'" title="'+texts[lang].resources.stone+'"/></td><td id="dsfm_stone" style="padding-right:20px; font-weight:bold;"></td>';
    html += '<td><img src="graphic/eisen.png" style="border: 0 none;" alt="'+texts[lang].resources.iron+'" title="'+texts[lang].resources.iron+'"/></td><td id="dsfm_iron" style="padding-right:20px; font-weight:bold;"></td>';
    html += '<td><img src="graphic/res.png" style="border: 0 none;" alt="Summe" title="'+texts[lang].gui.sum+'"/></td><td style="padding-right: 20px; font-weight:bold;"><span id="dsfm_cur_load"></span> / <span id="dsfm_sum"></span></td>';
    html += '<td style="font-weight: bold;"><span title="'+texts[lang].gui.quotient+'">&#216; </span><span id="dsfm_eq"></span>%</td></tr></table>';
    cell.innerHTML = html;
    row = tab.insertRow(tab.rows.length);
    row.id = "dsfm_row_unitsin";
    row.style.display = "none";
    cell = row.insertCell(0);
    cell.innerHTML = texts[lang].gui.unitsin+':<br/><span style="display:none; font-size:xx-small;" id="dsfm_unitsin_age"></span>';
    cell = row.insertCell(1);
    cell.colSpan=4;
    cell.id = "dsfm_unitsin";

    row = tab.insertRow(tab.rows.length);
    row.id = "dsfm_row_unitsout";
    row.style.display = "none";
    cell = row.insertCell(0);
    cell.innerHTML = texts[lang].gui.unitsout+':<br/><span style="display:none; font-size:xx-small;" id="dsfm_unitsout_age"></span>';
    cell = row.insertCell(1);
    cell.colSpan=4;
    cell.id = "dsfm_unitsout";

    row = tab.insertRow(tab.rows.length);
    row.id = "dsfm_row_buildings";
    row.style.display = "none";
    cell = row.insertCell(0);
    cell.innerHTML = texts[lang].gui.buildings+':<br/><span style="display:none; font-size:xx-small;" id="dsfm_buildings_age"></span>';;
    cell = row.insertCell(1);
    cell.colSpan=4;
    cell.id = "dsfm_buildings";

    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    cell.innerHTML = texts[lang].gui.load+":";
    cell = row.insertCell(1);
    cell.colSpan=2;
    
    input = cell.appendChild(document.createElement("input"));
    input.id = "dsfm_load";
    input.size = 5;
    input.value = settings.placeNoReportLoad;
    input.addEventListener("keydown", function(){ if( this.value.length > 0 ) {userLoad=true}else{userLoad=false; updatePlace(); }}, false );

    input = cell.appendChild( document.createElement("input"));
    input.type = "checkbox";
    input.id = "dsfm_useeq";
    input.checked = useeq;
    cell.appendChild(document.createTextNode(texts[lang].gui.usequotient + (settings.useHotKeys?" [Q]":"")));
    input.addEventListener("click", function() { useeq = this.checked ? 1 : 0; storage.setValue( "useeq", useeq ); loadFarmList(); updateTarget(true); document.getElementById("dsfm_fl_useeq").checked = useeq; if( document.getElementById("inline_popup").style.display == "block" ) showFarmList(); }, false );
    
    row = tab.insertRow(tab.rows.length);
    if( unitinfo.ram )
    {
      cell = row.insertCell(row.cells.length);
      input = cell.appendChild( document.createElement("input"));
      input.type = "checkbox";
      input.id = "dsfm_sendram";
      input.checked = parseInt(storage.getValue("sendram",0),10);
      cell.appendChild(document.createTextNode(texts[lang].gui.sendram + (settings.useHotKeys?" [R]":"")));
      var ramchk = document.getElementById("dsfm_ram_use");
      ramchk.checked = input.checked; 
      ramchk.addEventListener("click", function() { storage.setValue( "sendram", this.checked ? 1 : 0 ); document.getElementById("dsfm_sendram").checked = this.checked; }, false ); 
      input.addEventListener("click", function() { storage.setValue( "sendram", this.checked ? 1 : 0 ); document.getElementById("dsfm_ram_use").checked = this.checked; }, false );
    }
    
    cell = row.insertCell(row.cells.length);
    cell.appendChild(document.createTextNode(texts[lang].gui.unitSelect[0] + (settings.useHotKeys?" [W]":"") +": "));
    input = cell.appendChild( document.createElement("select"));
    input.size = 1;
    input.id = "dsfm_unitselect";
    input.options[0] = new Option(texts[lang].gui.unitSelect[1],0,true,false);
    input.options[1] = new Option(texts[lang].gui.unitSelect[2],1,false,false);
    input.options[parseInt(storage.getValue("unitselect",0),10)].selected = true;
    input.addEventListener("change", onUnitSelectChanged, false );
    onUnitSelectChanged();
    
    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    var a = cell.appendChild(document.createElement("a"));
    var html = "&raquo; " + texts[lang].gui.insertunits;
    if( settings.useHotKeys )
    {
      html += " [E]";
      hotKeys.push( { key: 69, func: insertUnits } );
    }
    a.innerHTML = html;
    a.href = "javascript:;";
    a.addEventListener("click", insertUnits, false );
    

    cell = row.insertCell(1);
    a = cell.appendChild(document.createElement("a"));
    a.href = "javascript:;";
    a.id = "dsfm_getatts";
    html = "&raquo; " + texts[lang].gui.getatts;
    if( settings.useHotKeys )
    {
      html += " [L]";
      hotKeys.push( { key: 76, func: getAtts } );
    }
    a.innerHTML = html;
    a.addEventListener("click", getAtts, false );

    cell = row.insertCell(2);
    a = cell.appendChild(document.createElement("a"));
    a.id = "dsfm_show_list";
    html = "&raquo; " + texts[lang].gui.farmlist;
    if( settings.useHotKeys )
    {
      html += " [F]";
      hotKeys.push( { key: 70, func: showFarmList } );
      hotKeys.push( { key: 27, func: function(e) { document.getElementById("inline_popup").style.display = "none"; } } );
      for( var i = 0; i < 10; i++ )
      {
        hotKeys.push( { key: i+48, func: function(e) { var idx = e.which == 48 ? 9 : e.which - 49; if( farmlist[idx] ) selectTarget(farmlist[idx]["dst"]["x"]+"|"+farmlist[idx]["dst"]["y"]);} } ); 
        hotKeys.push( { key: i+96, func: function(e) { var idx = e.which == 96 ? 9 : e.which - 97; if( farmlist[idx] ) selectTarget(farmlist[idx]["dst"]["x"]+"|"+farmlist[idx]["dst"]["y"]);} } ); 
      }
    }
    a.innerHTML = html;
    a.href = "javascript:;";
    a.addEventListener("click", showFarmList, false );
   
    a = e.parentNode.getElementsByTagName("a");
    for( var i = 0; i < a.length; i++ )
    {
      if( /insertUnit/.test(a[i].href) )
        a[i].addEventListener("click", unitClick, false);
    }

    var input = e.parentNode.getElementsByTagName("input");
    for( var i = 0; i < input.length; i++ )
    {
      if( input[i].className == "unitsInput" )
        input[i].id = "dsfm_"+input[i].name;
    }

    if( settings.useHotKeys )
    {
      hotKeys.push( { key: 81, event: { id: "dsfm_useeq", event: "click" } } );
      hotKeys.push( { key: 82, event: { id: "dsfm_sendram", event: "click" } } );
      hotKeys.push( { key: 87, func: function() { var sel = document.getElementById("dsfm_unitselect"); var val = parseInt(sel.value,10) + 1; if( val >= sel.options.length ) val = 0; sel.value = val; onUnitSelectChanged();} } );
      if( gm )
        hotKeys.push( { key: 65, func: function() { var a = document.getElementById("selectAllUnits"); var cmd = ""; if( gm ) cmd += "unsafeWindow."; cmd += a.href.replace("javascript:",""); debug.log(cmd); eval(cmd); } } );
      else
        hotKeys.push( { key: 65, event: { id:"selectAllUnits", event: "click" } } );
      a = document.getElementById("selectAllUnits");
      a.innerHTML += " [A]";
    }
    window.setInterval( updateTarget, 1000 );
    
    updateTarget();
    updatePlace();
  }
  return;
}

function onUnitSelectChanged()
{
  var val = document.getElementById("dsfm_unitselect").value;
  storage.setValue( "unitselect", val );
  for( var key in unitinfo) 
  {
    if( unitinfo[key].bit > 0 )
    {
      var chk = document.getElementById("dsfm_"+key+"_use");
      chk.disabled = val==0;
    }
  }
  document.getElementById("dsfm_sendram").checked = document.getElementById("dsfm_ram_use").checked;
}

if( params.screen == "place" && params["try"] == "confirm"  && !document.getElementById("inputx") )
{  
  var form = document.getElementsByTagName("form")[0];
  var inputs = form.getElementsByTagName("input");
  var input = inputs[inputs.length-1];
  placeSubmits = [input];
  if( settings.useHotKeys )
  {
    input.value = texts[lang].gui.ok_with_hotkey;
    hotKeys.push( { key: 13, func: function(e){ placeSubmits[0].click(); } } );
  }
  var node = document.getElementsByTagName("h2")[0];
  if( new RegExp(texts[lang].regex.attack).test( node.innerHTML )  )
  {
    while( node.nodeName != "TABLE" )
      node = node.nextSibling;
    var owner = 0;
    for( var i = 0; i < node.rows.length; i++ )
    {
      if( node.rows[i].cells.length > 1 )
      {
        if( /info_player/.test(node.rows[i].cells[1].innerHTML) )
        {
          owner = parseInt(node.rows[i].cells[1].innerHTML.match(/id=(\d+)/)[1],10);
          break;
        }
      }
    }
    var inputs = form.getElementsByTagName("input");
    var x = 0;
    var y = 0;
    var coords = "";
    for( var i= 0; i < inputs.length; i++ )
    {
      switch(inputs[i].name)
      {
        case "x":
          x = inputs[i].value;
          coords += x +"_";
          break;
        case "y":
          y = inputs[i].value;
          coords += y;
          break;
        case "submit":
          if(owner > 0)
          {
            if( owner == ownPid )
            {
              deleteVillageInfos(coords);
              placeSubmits[0].disabled=true;
              inputs[i].parentNode.appendChild(document.createElement("br"));
              var a = inputs[i].parentNode.appendChild(document.createElement("a"));
              a.href = "javascript:;";
              a.id = "dsfm_enableattack";
              a.style.fontSize = "xx-small";
              a.innerHTML = "&raquo; "+ texts[lang].gui.enableAttack;
              a.addEventListener("click", function() { if(confirm(texts[lang].gui.attackOwnVillage)) { enableAttack(); placeSubmits[0].style.backgroundColor = "#FF0000"; placeSubmits[0].style.color = "#FFFFFF";} }, false );
            }
            else
            {
              switch( settings.placeOkOnPlayer )
              {
                case 1:
                  inputs[i].style.backgroundColor = "#FF0000";
                  inputs[i].style.color = "#FFFFFF";
                  break;
                case 2:
                case 3:
                  placeSubmits[0].disabled=true;
                  inputs[i].parentNode.appendChild(document.createElement("br"));
                  var a = inputs[i].parentNode.appendChild(document.createElement("a"));
                  a.href = "javascript:;";
                  a.id = "dsfm_enableattack";
                  a.addEventListener("click", enableAttack, false );
                  a.innerHTML = "&raquo; "+ texts[lang].gui.enableAttack;
                  if( settings.placeOkOnPlayer == 3 )
                    storage.setValue("nofarms",storage.getValue("nofarms","")+coords+";");
                  break;
              }
              
              if( !new RegExp(coords+";").test(storage.getValue("nofarms","")) )
              {
                inputs[i].parentNode.appendChild(document.createElement("br"));
                var a = inputs[i].parentNode.appendChild(document.createElement("a"));
                a.href = "javascript:;";
                a.id = "dsfm_remove";
                a.innerHTML = "&raquo; " + texts[lang].gui.delfromfarmlist;
                a.addEventListener("click", function(e){ storage.setValue("nofarms",storage.getValue("nofarms","")+coords+";"); e.target.parentNode.removeChild(e.target); }, false );
              }
            }
          }
          break;
      }
    }
    form.addEventListener("submit", function(e) { var ts = parseInt(getTime(), 10); atts = storage.getValue("atts",""); atts += ts + "," + ownPid + "," + coords+";"; storage.setValue("atts",atts); }, false );
  }
  return;
}

if( params.screen == "overview_villages" && params.mode == "commands" )
{
  var func = getAtts;
  if( params.group == 0 && params.type=="attack" && params.page==-1 )
  {
    if( parseInt(storage.getValue("getatts",0),10) )
    {
      parseAtts();
      return;
    }
    else
      func = parseAtts;
  }
  var tab = document.getElementById("commands_table");
  var a = tab.parentNode.insertBefore(document.createElement("a"),tab);
  var html = "&raquo; " + texts[lang].gui.getatts;
  if( settings.useHotKeys )
  {
    html += " [L]";
    hotKeys.push( { key: 76, func: func } );
  }
  a.innerHTML = html;
  a.href = "javascript:;";
  a.id = "dsfm_getatts";
  a.addEventListener("click", func, false );
}

function cleanUp()
{
  var last = parseInt(storage.getValue("lastcleanup",0),10);
  var ts = getTime();
  if( ts - last > 3600 )
  {
    storage.setValue( "lastcleanup", parseInt(ts) );
    atts = doCleanUp("atts", ts - settings.maxAttAge * 3600);
    doCleanUp("rids", ts - settings.reportMaxAge * 86400);
    doCleanUp("beute", ts - settings.sumHours * 3600);
  }
}

function doCleanUp(key,minTS)
{
  var data = storage.getValue(key);
  var newData = "";
  if( data )
  {
    debug.log( "cleanUp "+"" + key + ": " + minTS );
    data = data.split(";");
    for( var i = 0; i < data.length; i++ )
    {
      var parts = data[i].split(",");
      if( parseInt(parts[0],10) > minTS )
          newData += data[i] + ";";
    }
  }
  storage.setValue(key,newData);
  return newData;
}

function enableAttack()
{
  document.getElementById("dsfm_enableattack").style.display="none"; 
  placeSubmits[0].disabled=false; 
}

function keyUpHandler(e)
{
  if( e.target.nodeName == "INPUT" && e.target.type == "text")
  {
    return;
  }
  if( e.target.nodeName != "TEXTAREA" )
  {
    for( var i = 0; i < hotKeys.length; i++ )
    {
      if( hotKeys[i].key == e.which )
      {
        if( hotKeys[i].func )
          hotKeys[i].func(e);
        if( hotKeys[i].href )
          location.href = hotKeys[i].href;
        if( hotKeys[i].event )
          fireEvent( document.getElementById(hotKeys[i].event.id), hotKeys[i].event.event );
      }
    }
  }
}

function mapKeyHandler(e)
{
  for( var key in redirTargets )
  {
    if( e.which == redirTargets[key]["key"] )
    {
      document.getElementById("dsfm_redir_"+key).checked = true;
      redirTargetChanged(key);
    }
  }
}

function updateTarget(force)
{
  var x = parseInt(document.getElementById("inputx").value, 10);
  var y = parseInt(document.getElementById("inputy").value, 10);
  if( !isNaN(x) && !isNaN(y) && (x != placeX || y != placeY || force == true ) )
  {
    placeX = x;
    placeY = y;
    var key = "" + x + "_" + y;
    document.getElementById("dsfm_row_ress").style.display = "none";
    document.getElementById("dsfm_row_unitsin").style.display = "none";
    document.getElementById("dsfm_row_unitsout").style.display = "none";
    document.getElementById("dsfm_row_buildings").style.display = "none";
    report = new village(key).load();
    var f = useeq ? report.eq / 100 : 1;
    if( report.res.timestamp > 0 )
    {
      var cell = document.getElementById("dsfm_title").innerHTML = texts[lang].gui.resources+' ('+(report.buildings.timestamp>0?texts[lang].gui.current:texts[lang].gui.spy)+'):';
      if( report.buildings.timestamp > 0 )
        showReportAge(report.buildings.timestamp, "resources");
      else
      {
        showReportAge(report.res.timestamp, "resources");
        var sum = 0;
        for( var i = 0; i < 3; i++ )
        {
          var res = Math.round(report.res[ressis[i]]*f);
          sum += res;
          document.getElementById("dsfm_"+ressis[i]).innerHTML = res;
        }
        document.getElementById("dsfm_sum").innerHTML = sum;      
        if( !userLoad )
          document.getElementById("dsfm_load").value = sum;
      }
      if( settings.placeShowRessis )
        document.getElementById("dsfm_row_ress").style.display = "";
      updatePlace();    
      document.getElementById("dsfm_eq").innerHTML = report.eq;
    }
    else
    {
      if( !userLoad )
        document.getElementById("dsfm_load").value = settings.placeNoReportLoad;
      document.getElementById("dsfm_row_ress").style.display = "none";
    }
     
    if( report.unitsin.hasUnits && settings.placeShowUnitsIn)
    {
      document.getElementById("dsfm_unitsin").innerHTML = getUnitsTab(report.unitsin);
      document.getElementById("dsfm_row_unitsin").style.display = "";
      showReportAge(report.unitsin.timestamp, "unitsin");
    }
    if( report.unitsout.hasUnits && settings.placeShowUnitsOut)
    {
      document.getElementById("dsfm_unitsout").innerHTML = getUnitsTab(report.unitsout);
      document.getElementById("dsfm_row_unitsout").style.display = "";
      showReportAge(report.unitsout.timestamp, "unitsout");
    }
    if( report.buildings.timestamp > 0 && settings.placeShowBuildings > 0 )
    {
      cell = document.getElementById("dsfm_buildings");
      if( settings.placeShowBuildings == 1 )
        cell.innerHTML = '<img src="graphic/buildings/wall.png" alt="'+texts[lang].buildings.wall+':" border="0"/>'+report.buildings.wall.level;
      else
        cell.innerHTML = getBuildingsTab(report.buildings,1,settings.placeShowCatas);
      showReportAge(report.buildings.timestamp, "buildings");
      document.getElementById("dsfm_row_buildings").style.display="";
    }
  }
}

function loadFarmList()
{
  var hide = storage.getValue( "atts","") + storage.getValue( "nofarms", "");
  
  var regex = new RegExp( "^\\d{1,3}_\\d{1,3}$" );
  var vals = storage.listValues();
  farmlist = [];
  for(var i = 0; i < vals.length; i++ )
  {
    if( regex.test(vals[i]) )
    {
      var coords = vals[i]; //.substring(server.length+1);
      if( !new RegExp(coords+";").test(hide) )
      {
        coords = coords.split("_");
        coords[0] = parseInt(coords[0],10);
        coords[1] = parseInt(coords[1],10);
        var dist = Math.sqrt(Math.pow(curX - coords[0], 2) + Math.pow(curY - coords[1], 2));
        if( dist < settings.placeFarmDist + maxRangeInc )
        {
          var report = new village(vals[i]).load();
          if( report.res.timestamp > 0 )
          {
            var color = 0;
            if( report.buildings.timestamp > 0 )
            {
              var max = getStorageSize(report)-getHideSize(report.buildings.hide.level);
              var sum = 0;
              var entry = { "dst": {x: coords[0], y:coords[1]}, "dist": dist, "eq": report.eq, "color": report.color, "wood": 0, "woodcolor": 0, "stone": 0, "stonecolor":0, "iron": 0, "ironcolor": 0, "sum": 0, "storage": max, "sumcolor": 0 }
              var f = useeq ? report.eq / 100 : 1;
              for( var r = 0; r < 3; r++ )
              {
                var res = Math.round(getRessource(report, ressis[r]) * f);
                entry[ressis[r]] = res;
                if( res >= max )
                  entry[ressis[r]+"color"] = 2;
                else if( res >= max*0.75 && entry[ressis[r]+"color"] < 2)
                  entry[ressis[r]+"color"] = 1;
                entry.sum += res;
                entry.sumcolor = Math.max(entry.sumcolor, entry[ressis[r]+"color"]);
              }
              
              if( entry.sum >= settings.placeIncRangeRes )
                farmlist.push( entry );
            }
            else
            {
              var sum = 0;
              var entry = { "dst": {x: coords[0], y:coords[1]}, "dist": dist, "eq": report.eq, "color": report.color, "wood": 0, "woodcolor": 3, "stone": 0, "stonecolor":3, "iron": 0, "ironcolor": 3, "sum": 0, "storage": max, "sumcolor": 3 }
              for( var r = 0; r < 3; r++ )
              {
                entry[ressis[r]] = report.res[ressis[r]];
                entry.sum += report.res[ressis[r]];
              }
              if( entry.sum >= settings.placeIncRangeRes )
                farmlist.push( entry );
            }
          }
        }
      }
    }
  }
  farmlistSort = parseInt(storage.getValue("farmsort",0),10);
  curFarmDist = settings.placeFarmDist;
  
  if( farmlist.length > 0 )
  {
    var count = Math.min( settings.placeMaxFarms, farmlist.length );
    do
    {
      farmlist.sort(compareFarms1);
      for( i = 0; i < count; i++ )
      {
        if( farmlist[i]["sum"] < settings.placeIncRangeRes )
        {
          curFarmDist++;
          break;
        }
      }
      if( i == count || curFarmDist - settings.placeFarmDist > maxRangeInc)
        break;
    } while( true );
    farmlist = farmlist.slice(0,settings.placeMaxFarms);
    if( farmlistSort != 0 )
      farmlist.sort(compareFarms2);
  }
}

function showFarmList(event)
{
  farmlist.sort(compareFarms2);
  var colors = [ "#000", "#FF6A00", "#FF0000", "rgb(0,38,255)" ];
  var popup = document.getElementById("inline_popup");
  popup.style.width="450px";
  var content = document.getElementById("inline_popup_main");
  content.style.width="444px";
  content = document.getElementById("inline_popup_content");
  content.style.width="100%";
  content.innerHTML = "";
  var input = content.appendChild( document.createElement("input"));
  input.type = "checkbox";
  input.checked = useeq;
  input.id = "dsfm_fl_useeq";
  content.appendChild(document.createTextNode(texts[lang].gui.usequotient + (settings.useHotKeys?" [Q]":"")));
  input.addEventListener("click", function() { fireEvent(document.getElementById("dsfm_useeq"),"click"); }, false );
  var tab = content.appendChild(document.createElement("table"));
  tab.className = "vis";
  tab.style.width = "100%";
  var row = tab.insertRow(0);
  var cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = texts[lang].gui.coords;
  cell.colSpan=2;
  cell = row.appendChild(document.createElement("th"));
  var a = cell.appendChild(document.createElement("a"));
  a.href = "javascript:;";
  a.innerHTML = '<img src="/graphic/holz.png" alt="'+texts[lang].resources.wood+'" title="'+texts[lang].resources.wood+'"/>';
  a.addEventListener("click", function(e){ farmlistSort = 2;  storage.setValue("farmsort", farmlistSort); showFarmList() }, false );
  cell.style.textAlign = "center";
  cell = row.appendChild(document.createElement("th"));
  a = cell.appendChild(document.createElement("a"));
  a.href = "javascript:;";
  a.innerHTML = '<img src="/graphic/lehm.png" alt="'+texts[lang].resources.stone+'" title="'+texts[lang].resources.stone+'"/>';
  a.addEventListener("click", function(e){ farmlistSort = 3;  storage.setValue("farmsort", farmlistSort); showFarmList() }, false );
  cell.style.textAlign = "center";
  cell = row.appendChild(document.createElement("th"));
  a = cell.appendChild(document.createElement("a"));
  a.href = "javascript:;";
  a.innerHTML = '<img src="/graphic/eisen.png" alt="'+texts[lang].resources.iron+'" title="'+texts[lang].resources.iron+'"/>';
  a.addEventListener("click", function(e){ farmlistSort = 4;  storage.setValue("farmsort", farmlistSort); showFarmList() }, false );
  cell.style.textAlign = "center";
  cell = row.appendChild(document.createElement("th"));
  a = cell.appendChild(document.createElement("a"));
  a.href = "javascript:;";
  a.innerHTML = texts[lang].gui.fl_sum;
  cell = row.appendChild(document.createElement("th"));
  cell.style.textAlign = "center";
  cell.innerHTML = texts[lang].gui.fl_eq;
  a.addEventListener("click", function(e){ farmlistSort = 0;  storage.setValue("farmsort", farmlistSort); showFarmList() }, false );
  cell.style.textAlign = "right";
  cell = row.appendChild(document.createElement("th"));
  cell.style.textAlign = "right";
  a = cell.appendChild(document.createElement("a"));
  a.href = "javascript:;";
  a.innerHTML = texts[lang].gui.dist;
  a.addEventListener("click", function(e){ farmlistSort = 1; storage.setValue("farmsort", farmlistSort); showFarmList() }, false );
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = "X";
  cell.style.textAlign = "center";
  
  for( i = 0; i < farmlist.length; i++ )
  {
    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    if( farmlist[i].color.length > 0 )
    {
      var div = cell.appendChild(document.createElement("div"));
      div.style.width="5px";
      div.style.height="5px";
      div.style.backgroundColor="#"+farmlist[i].color;
      div.style.border="1px solid black";
    }
    else
      cell.innerHTML = "?";
    cell = row.insertCell(1);
    cell.style.whiteSpace="nowrap";
    var a = cell.appendChild(document.createElement("a"));
    a.id = "dsfm_fl_" + i;
    a.href = "javascript:;";
    a.innerHTML = farmlist[i].dst["x"]+'|'+farmlist[i].dst["y"];
    a.addEventListener("click", function(e) {selectTarget(e.target.innerHTML);}, false );
    if( i < 10 )
      cell.appendChild(document.createTextNode(i < 9 ? " ("+(i+1)+")" : " (0)"));;
    cell = row.insertCell(row.cells.length);
    cell.innerHTML = farmlist[i].wood;
    cell.style.textAlign = "right";
    cell.style.color = colors[farmlist[i].woodcolor];
    cell = row.insertCell(row.cells.length);
    cell.innerHTML = farmlist[i].stone;
    cell.style.textAlign = "right";
    cell.style.color = colors[farmlist[i].stonecolor];
    cell = row.insertCell(row.cells.length);
    cell.innerHTML = farmlist[i].iron;
    cell.style.textAlign = "right";
    cell.style.color = colors[farmlist[i].ironcolor];
    cell = row.insertCell(row.cells.length);
    cell.innerHTML = farmlist[i].sum;
    cell.style.textAlign = "right";
    cell.style.color = colors[farmlist[i].sumcolor];
    cell = row.insertCell(row.cells.length);
    cell.style.textAlign = "right";
    cell.innerHTML = farmlist[i].eq + "%";
    cell = row.insertCell(row.cells.length);
    cell.innerHTML = Math.round(farmlist[i].dist*100)/100
    cell.style.textAlign = "right";
    cell = row.insertCell(row.cells.length);
    cell.style.textAlign = "center";
    cell.style.fontWeight = "bold";
    a = cell.appendChild(document.createElement("a"));
    a.href = "javascript:;";
    a.innerHTML = "X";
    a.style.color = "red";
    a.title = texts[lang].gui.delfromfarmlist;
    a.addEventListener("click", function(e){ var coords = e.target.parentNode.parentNode.cells[1].firstChild.innerHTML.replace(/\|/,"_"); storage.setValue("nofarms",storage.getValue("nofarms","")+coords+";"); loadFarmList(); showFarmList(); }, false );
  }
  popup.style.display = "block";
  if( event )
  {
    popup.style.left = (event.clientX + 50) + "px";
    popup.style.top = (event.clientY - 90) + "px";
  }
}

function compareFarms1(a,b)
{
  var vars = ["sum","sum","wood","stone","iron"];
  var ret = 0;
  if( a.dist <= curFarmDist && b.dist <= curFarmDist )
    ret = b[vars[farmlistSort]]-a[vars[farmlistSort]];
  else if( a.dist > curFarmDist && b.dist <= curFarmDist )
    ret = 1;  
  else if( b.dist > curFarmDist && a.dist <= curFarmDist )
    ret = -1;
  return ret;
}

function compareFarms2(a,b)
{
  if( farmlistSort == 1 )
  {
    if( a["dist"] == b["dist"] )
      return b["sum"]-a["sum"];
    else
      return a["dist"]-b["dist"];
  }
  else
    return compareFarms1(a,b);
}

function selectTarget(coords)
{
  var xy = coords.split("|");
  document.getElementById("inputx").value = xy[0];
  document.getElementById("inputy").value = xy[1];
  document.getElementById("inline_popup").style.display = "none";
  updateTarget();
  insertUnits();
}

function insertUnits()
{
  var sum = parseInt(document.getElementById("dsfm_load").value, 10);
  if( !isNaN(sum) )
  {
    var load = 0;
    if( parseInt(storage.getValue("unitselect",0),10) == 0 )
    {
      var bestgroup = { units: 0, load: 0 };
      for( var i = 0; i < farmUnitsCfg.groups.length; i++ )
      {
        load = insertGroupUnits(sum,farmUnitsCfg.groups[i].units);
        if( load >= settings.placeMinLoad )
          break;
        if( load > bestgroup.load )
        {
          bestgroup.load = load;
          bestgroup.units = farmUnitsCfg.groups[i].units;
        }
      }
    }
    else
    {
      load = insertGroupUnits(sum, parseInt(storage.getValue("unitsselected",0),10));
    }
    if( load < settings.placeMinLoad )
    {
      insertGroupUnits(sum, bestgroup.units);
      document.getElementById("dsfm_enableattack").style.display = "";
      placeSubmits[0].disabled = true;
    }
    var spy = document.getElementById("dsfm_spy");
    var spys = Math.max( 0, parseInt(spy.getAttribute("maxunits"), 10 ) - farmUnitsCfg.stayNOrder.spy.stay );
    if( spy && spys >= farmUnitsCfg.minUnits.spy )
      spy.value = farmUnitsCfg.minUnits.spy;
  }
}

function insertGroupUnits(sum,groupbits)
{
  var input = document.getElementById("units_form").getElementsByTagName("input");
  for( var i = 0; i < input.length; i++ )
  {
    if( input[i].className=="unitsInput" )
      input[i].value = "";
  }
  var load = 0;
  if( (groupbits & unitinfo["ram"].bit) > 0 && parseInt(storage.getValue("sendram",0),10) && report && report.buildings.wall.level >= settings.placeMinRamWall )
  {
    input = document.getElementById("dsfm_ram");
    var maxunits = parseInt(input.getAttribute("maxunits"), 10);
    if( maxunits > (settings.placeMinRamsNeeded?ramsNeeded[report.buildings.wall.level]:0) )
    {
      var needed = Math.min(maxunits,ramsNeeded[report.buildings.wall.level]);
      if( needed > 0 )
      {
        input.value = needed;
        updatePlace();
      }
    }
  }
  for( var key in farmUnitsCfg.stayNOrder )
  {
    if( (groupbits & unitinfo[key].bit) > 0 && unitinfo[key].load > 0)
    {
      input = document.getElementById("dsfm_"+key );
      if( input )
      {
        var maxunits = parseInt(input.getAttribute("maxunits"), 10);
        var max = Math.max(0,maxunits-farmUnitsCfg.stayNOrder[key].stay);
        if( max > 0 )
        {
          input.value = 1;
          updatePlace();
          sum = parseInt(document.getElementById("dsfm_load").value, 10);
          var needed = Math.ceil((sum-load) / unitinfo[key].load);
          var count = Math.min(needed,max);
          load += count * unitinfo[key].load;
          input.value = count;
          updatePlace();
          sum = parseInt(document.getElementById("dsfm_load").value, 10);
          if( load >= sum )
            break;
        }
      }
    }
  }
  for( var key in farmUnitsCfg.minUnits )
  {
    if( farmUnitsCfg.minUnits[key] > 0 )
    {
      var units = key.split("_");
      var unitSum = 0;
      var mask = 0;
      for( var j = 0; j < units.length; j++ )
      {
        mask |= unitinfo[units[j]].bit;
        var unitAnz = parseInt(document.getElementById("dsfm_"+units[j]).value,10);
        if( !isNaN(unitAnz) )
          unitSum += unitAnz;
      }
      if( unitSum > 0 && unitSum < farmUnitsCfg.minUnits[key] )
      {
        groupbits &= ~mask;
        return insertGroupUnits(sum,groupbits);
      }
    }
  }
  return load;
}

function unitClick()
{
  window.setTimeout( updatePlace, 100 );
}

function getSelectedUnitsInfo()
{
  var e = document.getElementById("inline_popup").parentNode;
  var input = e.getElementsByTagName("input");
  var ret = { slowest: 0, load: 0 };
  for( var i = 0; i < input.length; i++ )
  {
    if( input[i].className == "unitsInput" )
    {
      var val = parseInt(input[i].value, 10);
      if( !isNaN(val) && val > 0 )
      {
        e = input[i].nextSibling.nextSibling;
        var unit = e.href.match(/forms\[0\].([^,]+)/)[1]; 
        ret.load += val * unitinfo[unit].load;
        if( unitinfo[unit].speed > ret.slowest )
          ret.slowest = unitinfo[unit].speed;
      }
    }
  }
  return ret;
}

function updatePlace()
{
  enableAttack();
  if( report )
  {
    if( report.res.timestamp > 0 )
    {
      var selUnitsInfo = getSelectedUnitsInfo();
      if( report.buildings.timestamp > 0 )
      {
        var ts = getTime();
        var title = document.getElementById("dsfm_title");
        var dist = 0;
        if( selUnitsInfo.slowest > 0 )
        {
          dist = Math.sqrt(Math.pow(curX - report.coords.x, 2) + Math.pow(curY - report.coords.y, 2));
          ts += (dist * selUnitsInfo.slowest * serverCfg.unit_speed)*60;
          if( title ) title.innerHTML = texts[lang].gui.resources + " ("+texts[lang].gui.arrival+")";
        }
        else
          if( title ) title.innerHTML = texts[lang].gui.resources + " ("+texts[lang].gui.current+")";;
        var f = useeq ? report.eq / 100 : 1;
        var res = Math.round(getRessource(report, "wood", ts)*f);
        var sum = res;
        document.getElementById("dsfm_wood").innerHTML = formatNumber(res);
        res = Math.round(getRessource(report, "stone", ts)*f);
        sum += res;
        document.getElementById("dsfm_stone").innerHTML = formatNumber(res);
        res = Math.round(getRessource(report, "iron", ts)*f);
        sum += res;
        document.getElementById("dsfm_iron").innerHTML = formatNumber(res);
        document.getElementById("dsfm_cur_load").innerHTML = formatNumber(selUnitsInfo.load);
        document.getElementById("dsfm_sum").innerHTML = formatNumber(sum);
        if( !userLoad )
          document.getElementById("dsfm_load").value = sum;
      }
      else
      {
        document.getElementById("dsfm_cur_load").innerHTML = formatNumber(selUnitsInfo.load);
      }
    }
  }
}

function formatNumber(nr)
{
  if( nr == 0 )
    return "0";
  var ret = ""
  do
  {
    var tmp = "00" + nr%1000;
    ret = tmp.substr(tmp.length-3,3) + '<span class="grey">'+texts[lang].locale.nrgroupsign+'</span>' + ret;
    nr = Math.floor(nr/1000);
  } while( nr > 0 );
  ret = ret.replace(/^0*/g,"").replace(/\<span class="grey">.{1}<\/span>$/g,"");
  return ret;
}

function getRessource(report, name, ts)
{
  if( report.buildings.timestamp > 0 )
  {
    if( !ts )
      ts = getTime();
    var mins = (ts - report.buildings.timestamp) / 60;
    var max = getStorageSize(report) - getHideSize(report.buildings.hide.level);
    var factor = 1;
    if( report["bonus"] == resInfos[name].bonus )
      factor = 2;
    else if( report["bonus"] == 8 )
      factor = 1.30;
    var minprod = getMining(report.buildings[name].level) / 60.0 * factor;
    return Math.min(max, Math.floor(report.res[name] + minprod * mins));
  }
  return -1;
}

function setGlobalHotkeys()
{
  if( settings.useHotKeys )
    window.addEventListener("keyup", keyUpHandler, false );
  var container = document.getElementById("menu_row2");
  var coords = storage.getValue(curVillage+"_mapxy");
  var a = container.cells[1].getElementsByTagName("a")[0];
  if( coords )
  {
    coords = coords.split(",");
    if( params.screen != "map" && settings.rememberMapPos )
      a.href += "&x=" + coords[0] + "&y=" + coords[1];
  }
  if( settings.useHotKeys )
    hotKeys.push( {key: 75, href: a.href} );

  if( settings.useHotKeys )
  {
    hotKeys.push( { key: 80, href: createLink( "place", true ) } );
    var a = container.cells[2].getElementsByTagName("a");
    for( var j = 2; j < 4; j++ )
    {
      a = container.cells[j].getElementsByTagName("a");
      if( a && a.length > 0) {
        if( a[0].accessKey == "a" )
          hotKeys.push( { key: 109, href: a[0].href } );
        else if( a[0].accessKey == "d" )
          hotKeys.push( { key: 107, href: a[0].href } );
      }
    }
  }
}

function mapInit()
{
  var mapRows = document.getElementById(mapId[curMap]).getElementsByTagName("tr").length;
  mapSize.count = mapRows;
  mapSize.width = iconSize.width * mapRows;
  mapSize.height = iconSize.height * mapRows;
  mapMoveSteps = parseInt(storage.getValue("mapmovesteps", mapSize.count), 10);
  var container = document.getElementsByClassName("map_container")[0];
	var tds = container.getElementsByTagName("td");
  container = document.getElementById("mapCoords");
  if( tds[0].innerHTML == "" )
  {
    var off = (mapSize.count-1)/2;
    var xCenter = parseInt(container.rows[container.rows.length-1].cells[1].innerHTML, 10) + off;
    var yCenter = parseInt(container.rows[0].cells[0].innerHTML, 10) + off;
    var x = Math.max(0,xCenter-mapMoveSteps);
    var y = Math.max(0,yCenter-mapMoveSteps);
    tds[0].align = "center";
    tds[0].innerHTML = '<a href="' + createLink("map", "x", x, "y", y, true) + '"><img src="graphic/map/map_nw.png" style="z-index: 1; position: relative;" alt="NW" /></a>';
    x = Math.min(999,xCenter+mapMoveSteps);
    tds[2].innerHTML = '<a href="' + createLink("map", "x", x, "y", y, true) + '"><img src="graphic/map/map_ne.png" style="z-index: 1; position: relative;" alt="NO" /></a>';
    y = Math.min(999,yCenter+mapMoveSteps);
    tds[tds.length-1].innerHTML = '<a href="' + createLink("map", "x", x, "y", y, true) + '"><img src="graphic/map/map_se.png" style="z-index: 1; position: relative;" alt="SO" /></a>';
    x = Math.max(0,xCenter-mapMoveSteps);
    tds[tds.length-3].innerHTML = '<a href="' + createLink("map", "x", x, "y", y, true) + '"><img src="graphic/map/map_sw.png" style="z-index: 1; position: relative;" alt="SW" /></a>';
  }
  tds[1].addEventListener("click",function() {document.getElementById("dsfm_overlays").innerHTML = ""; timer=window.setInterval(followMap,250);}, true);
	tds[3].addEventListener("click",function() {document.getElementById("dsfm_overlays").innerHTML = "";timer=window.setInterval(followMap,250);}, true);
	tds[tds.length-4].addEventListener("click",function() {document.getElementById("dsfm_overlays").innerHTML = "";timer=window.setInterval(followMap,250);}, true);
	tds[tds.length-2].addEventListener("click",function() {document.getElementById("dsfm_overlays").innerHTML = "";timer=window.setInterval(followMap,250);}, true);
  
  container = document.getElementsByClassName("map_container")[1];
  container = container.parentNode.parentNode;
  container = container.appendChild(document.createElement("table"));
  container.width = "100%";
  var row;
  var cell;
  if( settings.mapRedirActive )
  {
    row = container.insertRow(0);
    cell = row.appendChild(document.createElement("th"));
    cell.innerHTML = texts[lang].gui.redirTitle;

    for( var key in redirTargets )
    {
      row = container.insertRow(container.rows.length);
      cell = row.insertCell(0);
      var input = cell.appendChild(document.createElement("input"));
      input.type = "radio";
      input.name = "dsfm_redirTarget";
      input.id = "dsfm_redir_"+key;
      input.value = key;
      input.checked = input.value == redirTarget;
      input.setAttribute("dsfm_fallback", redirTargets[key].fallback ? "1":"0");
      var txt = texts[lang].gui["redir_"+key];
      if( settings.useHotKeys )
      {
        txt += " ["+String.fromCharCode(redirTargets[key].key)+"]";
        hotKeys.push( { key: redirTargets[key].key, func: mapKeyHandler } );
      }
      cell.appendChild(document.createTextNode(txt));
      input.addEventListener("click", function(e) { redirTargetChanged(e.target.id.split("_")[2]); }, false );
    }
  }
  row = container.insertRow(container.rows.length);
  cell = row.insertCell(0);
  input = cell.appendChild(document.createElement("input"));
  input.type = "checkbox";
  input.checked = useeq;
  input.id = "dsfm_useeq";
  input.addEventListener("click", function() { useeq = this.checked ? 1 : 0; storage.setValue("useeq",useeq); mapCreateOverlays();  }, false );
  cell.appendChild(document.createTextNode(texts[lang].gui.usequotient+(settings.useHotKeys?" [Q]":"")));
  
  row = container.insertRow(container.rows.length);
  cell = row.insertCell(0);
  input = cell.appendChild(document.createElement("a"));
  input.id = "dsfm_stats";
  input.href = "javascript:;";
  input.innerHTML = "&raquo; " + texts[lang].gui.statsTitle[0] + settings.sumHours + texts[lang].gui.statsTitle[1] + (settings.useHotKeys?" [S]":"");
  input.addEventListener("click", showBeuteSum, false );

  row = container.insertRow(container.rows.length);
  cell = row.insertCell(0);
  input = cell.appendChild(document.createElement("a"));
  input.href = "javascript:;";
  input.id = "dsfm_addbb2fl";
  input.innerHTML = "&raquo; " + texts[lang].gui.addbb2fl + (settings.useHotKeys?" [B]":"");
  input.addEventListener("click", addbb2fl, false );
  
  if( settings.useHotKeys )
  {
    hotKeys.push( { key: 66, event: { id: "dsfm_addbb2fl",  event: "click" } } );
    hotKeys.push( { key: 81, event: { id: "dsfm_useeq", event: "click" } } );
    hotKeys.push( { key: 83, event: { id: "dsfm_stats", event: "click" } } );
  }

  var div = createShadowDiv("none");    
  container = div.appendChild(document.createElement("div"));
  container.style.position = "absolute";
  container.id="dsfm_beutesum";
  container.style.width = "200px";
  container.style.height = "200px";
  container.style.display="none";
  container.style.zIndex=1000;
  container.style.padding="0";
  
  var html = '<table class="main" width="100%" style="border:2px solid #804000; background-color:;"><tr><th colspan="2">'+texts[lang].gui.statsTitle[0] + settings.sumHours + texts[lang].gui.statsTitle[1]+'</th></tr>';
  html += '<tr><td><img src="graphic/holz.png" border="0" alt=""/> '+texts[lang].resources.wood+':</td><td id="dsfm_sumwood" style="text-align:right;"></td></tr>';
  html += '<tr><td><img src="graphic/lehm.png" border="0" alt=""/> '+texts[lang].resources.stone+':</td><td id="dsfm_sumstone" style="text-align:right;"></td></tr>';
  html += '<tr><td><img src="graphic/eisen.png" border="0" alt=""/> '+texts[lang].resources.iron+':</td><td id="dsfm_sumiron" style="text-align:right;"></td></tr>';
  html += '<tr><td colspan="2"><div style="width:100%; height:2px; border-top:1px solid black; border-bottom:1px solid black"/></td></tr>';
  html += '<tr><td><img src="graphic/res.png" border="0" alt=""/> '+texts[lang].gui.sum+':</td><td id="dsfm_sumtotal" style="text-align:right;"></td></tr>';
  html += '<tr><td colspan="2" style="text-align:right"><span id="dsfm_sumreports"></span> '+texts[lang].gui.reports+'</td></tr>';
  html += '<tr><th colspan="2" style="text-align:center"><a href="javascript:;" id="dsfm_close" onclick="javascript:document.getElementById(\'dsfm_shadow_div\').style.display=\'none\';">'+texts[lang].gui.close+(settings.useHotKeys?" [ESC]":"")+'</a></th></tr></table>';
  if( settings.useHotKeys )
    hotKeys.push( { key: 27, event: { id: "dsfm_close", event: "click" } } );
  container.innerHTML = html;

  for( i = 0; i < settingNames.length; i++ )
  {
    if( /popupShow/.test(settingNames[i]) )
    {
      if( settings[settingNames[i]] > 0 )
        break;
    }
  }
  if( i < settingNames.length )
  {
    container = document.getElementById("info_content");
    var row = container.insertRow(container.rows.length);
    var cell = row.insertCell(0)
    cell.colSpan=3;
    container = cell.appendChild(document.createElement("table"));
    container.style.width="100%";
    container.style.border = "1px solid rgb(222, 211, 185)";
    container.className="vis";
    container.id="dsfm_popupinfos";
    
    row = container.insertRow(0);
    var cell = row.appendChild(document.createElement("th"));
    cell.colSpan=2;
    cell.innerHTML = texts[lang].gui.infoTitle;
    
    row = container.insertRow(container.rows.length);
    row.style.display = "none";
    row.id = "dsfm_noinfos_row";
    row.insertCell(0).innerHTML = texts[lang].gui.noInfos;
    row.cells[0].colSpan=2;

    var popupLines = [ "resources", "mining", "buildings", "unitsin", "unitsout", "loyalty" ];
    for( i = 0; i < popupLines.length; i++ )
    {
      row = container.insertRow(container.rows.length);
      row.style.display = "none";
      row.id = "dsfm_"+popupLines[i]+"_row";
      cell = row.insertCell(0)
      cell.style.whiteSpace="nowrap";
      cell.appendChild(document.createTextNode(texts[lang].gui[popupLines[i]]));
      cell.appendChild(document.createElement("br"));
      var age = cell.appendChild(document.createElement("span"));
      age.style.fontSize="xx-small";
      age.id = "dsfm_"+popupLines[i]+"_age";
      age.style.display = "none";
      row.insertCell(1).id="dsfm_"+popupLines[i];
    }
  }
  container = document.getElementById("map");
  var overlayDiv = container.appendChild(document.createElement("div"));
  overlayDiv.id="dsfm_overlays";
  overlayDiv.style.position = "relative";
  overlayDiv.style.width = container.style.width;
  overlayDiv.style.height = container.style.height;
}

function mapCreateOverlays()
{
  var ts = getTime();
  var popupInfos = document.getElementById("dsfm_popupinfos");
  var overlayDiv = document.getElementById("dsfm_overlays");
  overlayDiv.style.display = "none";
  overlayDiv.innerHTML = "";
  villages = new Array();
	var container = document.getElementById("mapCoords");
  bbs = [];
  if( container )
  {
    map_x0 = parseInt(container.rows[container.rows.length-1].cells[1].innerHTML, 10);
    map_y0 = parseInt(container.rows[0].cells[0].innerHTML, 10);
    if( settings.rememberMapPos && curVillage )
    {
      var off = (mapSize.count-1)/2;
      var x = map_x0 + off;
      var y = map_y0 + off;
      if( curVillage )
        storage.setValue(curVillage+"_mapxy", x+","+y);
    }
  }
  container = document.getElementById(mapId[curMap]);
  if( container )
  {
    var tds = container.getElementsByTagName('td');
    var idx = 0;
    for( var i = 0; i < tds.length; i++ )
    {
      var a = tds[i].getElementsByTagName('a');
      if( a.length == 1 )
      {
        a = a[0];
        var parts = parseMapData(a.getAttribute("onmouseover"));
        if( !parts )
          debug.log( a.getAttribute("onmouseover") );
        var coords = parts.title.match(/\((\d{1,3})\|(\d{1,3})\)/);
        var key = coords[1]+"_"+coords[2];
        var y = Math.floor(i / mapSize.count);
        var x = i % mapSize.count;
        var f = map_x0 % 5;
        if( f == 0 ) f = 5;
        var xOff = Math.floor((x+f)/5);
        f = map_y0 % 5;
        var yOff = Math.floor((y+f)/5);;
        var apar = parseParams(a.href);
        var vid = apar.village;
        var bonus = parts.bonus_image.match(/graphic\/bonus\/([^\.]+)\.png/);
        if( !parts.owner ) 
          bbs.push(key);
        if( apar.screen == "info_village" && settings.mapRedirActive)
        {
          var off = a.parentNode.id.split("_");
          a.setAttribute("dsfm_village", apar.id +","+(map_x0+parseInt(off[1], 10))+","+(map_y0+parseInt(off[2], 10)) );
          a.addEventListener("click", redirectLink, false );
        }

        if( !bonus )
          bonus = "none";
        else
          bonus = bonus[1];
        bonus = boni[bonus];
        var img = tds[i].getElementsByTagName("img")[0];
        img.setAttribute("dsfm_key", key);
        if( popupInfos )
          img.addEventListener("mouseover", function(e) { setPopupInfos(e.target.getAttribute("dsfm_key")); }, false );
        var divTop = (y*iconSize.height+yOff);
        var divLeft = (x*iconSize.width+xOff);
        if( parts.village_groups )
        {
          if( settings.mapShowGroups )
          {
            var groups = parts.village_groups.replace(/, /g, "<br/>");
            var divOverlay = overlayDiv.appendChild(document.createElement("div"));
            divOverlay.style.position = "absolute";
            divOverlay.style.width = (iconSize.width - 10)+"px";
            divOverlay.style.height = iconSize.height+"px";
            divOverlay.style.top = divTop+"px";
            divOverlay.style.left = (divLeft+10)+"px";
            divOverlay.id = "dsfm_"+key;
            divOverlay.style.overflow = "hidden";
            var txt = document.createElement("font");
            txt.style.fontSize="xx-small";
            txt.style.color="rgb(240, 200, 0)";
            txt.innerHTML = groups;
            divOverlay.appendChild( txt );
          }
        }
        else
        {
          var col = tds[i].style.backgroundColor.match(/rgb\((\d+), (\d+), (\d+)\)/);
          if( col )
          {
            var r = "0" + parseInt(col[1],10).toString(16);
            var g = "0" + parseInt(col[2],10).toString(16);
            var b = "0" + parseInt(col[3],10).toString(16);
            col = r.substring(r.length-2) + g.substring(g.length-2) + b.substring(b.length-2);
          }
          else
            col = tds[i].style.backgroundColor.substring(1);
          var report = new village(key).load();
          report.updateMapData(bonus,col);

          var re = new RegExp(coords[1]+"_"+coords[2]);
          var hasAtt = re.test(atts);
          var isNoFarm = re.test(nofarms);
          
          var attDiv = overlayDiv.appendChild(document.createElement("div"));
          attDiv.style.position = "absolute";
          attDiv.style.width = "15px";
          attDiv.style.height = "15px";
          attDiv.style.top = (divTop + (iconSize.height-15) / 2) +"px";
          attDiv.style.left = (divLeft + (iconSize.width-15) / 2)+"px";
          attDiv.style.zIndex = 1;
          var src;
          var attdif = parts.lastatt - report.lastreport.timestamp;
          if( isNoFarm )
            src = nofarmpng;
          else if( attdif > 0 && attdif < settings.reportMaxAge * 86400 )
            src = attentionpng;
          else if( hasAtt && !/\/attack.png/.test(document.getElementById("tile_"+x+"_"+y).innerHTML))
            src = attentionpng;
          else
            src = "graphic/map/empty.png";
          attDiv.innerHTML = '<img id="dsfm_att_'+key+'" src="'+src+'" border="0"/>';

          if( settings.mapShowPoints )
          {
            var div = overlayDiv.appendChild(document.createElement("div"));
            div.style.position = "absolute";
            div.style.color = "rgb(240, 240, 240)";
            div.style.width = (iconSize.width-12)+"px";
            div.style.height = "5px";
            div.style.top = (y*iconSize.height)+"px";
            div.style.left = (x*iconSize.width+12)+"px";
            div.style.zIndex = 1;
            div.innerHTML = formatNumber(parts.points);
            div.style.fontSize = "xx-small";
          }
          
          var age = (ts - (report.lastreport.timestamp == 0 ? report.res.timestamp : report.lastreport.timestamp) ) / 3600;
          var ageOpacity = 1;
          if( age > settings.minAgeTransparency )
            ageOpacity = 1-(age/(settings.reportMaxAge*24));
          var divOverlay = overlayDiv.appendChild(document.createElement("div"));
          divOverlay.style.position = "absolute";
          divOverlay.style.width = iconSize.width+"px";
          divOverlay.style.height = iconSize.height+"px";
          divOverlay.style.top = (y*iconSize.height+yOff)+"px";
          divOverlay.style.left = (x*iconSize.width+xOff)+"px";
          divOverlay.id = "dsfm_"+key;
          divOverlay.style.opacity = ageOpacity;
          
          if( settings["mapShowWall"] && (report.buildings.timestamp>0 && report.buildings.wall.level > 0 || report.unitsin.hasUnits || report.unitsout.hasUnits) )
          {
            var div = divOverlay.appendChild(document.createElement("img"));
            div.style.position = "relative";
            div.style.top = "0px";
            div.style.left = "0px";
            if( report.unitsin.hasUnits || report.unitsout.hasUnits )
              div.src = unitspng;
            else
              div.src = wallpng;
          }
          if( report.res.timestamp > 0 && (settings["mapShowRessis"] || settings["mapShowBars"]) )
          {
            var color;
            var barWidth = iconSize.width - 10;
            if( report.buildings.timestamp > 0 )
            {
              var size = new Array( 0, 0, 0, 0 );
              var f = useeq ? report.eq / 100 : 1;
              var max = getStorageSize(report) - getHideSize(report.buildings.hide.level);
              var barMax = Math.max(max, minBarMax);
              var cur = Math.round(getRessource(report, "wood")*f);
              var sum = cur;
              size[0] = Math.floor(barWidth * cur / barMax);
              cur = Math.round(getRessource(report, "stone")*f);
              sum += cur;
              size[1] = Math.floor(barWidth * cur / barMax);
              cur = Math.round(getRessource(report, "iron" )*f);
              sum += cur;
              size[2] = Math.floor(barWidth * cur / barMax);
              var sumOpacity = settings.opacityMin / 100.0;
              var sumOpacity =  Math.min(sumOpacity + (1.0 - sumOpacity/100) * (sum / settings.opacityMaxRes), 1);
              if( sum > 1000 )
                sum = Math.round(sum / 100) / 10 + "k";
              if( settings.mapPlayerColored && parts.owner )
                color = "rgba(255,100,100,"+sumOpacity+")";
              else
                color = "rgba(255,255,255,"+sumOpacity+")";
              size[3] = Math.floor((iconSize.width-8) * report.eq / 100);
            }
            else if( report.res.timestamp > 0 )
            {
              var sum = report.res["wood"] + report.res["stone"] + report.res["iron"];
              var sumOpacity = settings.opacityMin / 100.0;
              var sumOpacity =  Math.min(sumOpacity + (1.0 - sumOpacity/100) * (sum / settings.opacityMaxRes), 1);
              if( sum > 1000 )
                sum = Math.round(sum / 100) / 10 + "k";
              if( settings.mapPlayerColored && parts.owner )
                color = "rgba(255,128,255,"+sumOpacity+")";
              else
                color = "rgba(81,236,255,"+sumOpacity+")";
                
            }
            if( settings["mapShowRessis"] )
            {
              div = divOverlay.appendChild(document.createElement("div"));
              div.style.position = "absolute";
              div.style.width = (iconSize.width-4)+"px";
              div.style.color = color;
              div.style.height = "13px";
              div.style.top = (iconSize.height - 28)+"px";
              div.style.left = "1px";
              div.appendChild(document.createTextNode(sum));
              div.style.fontSize = "x-small";
              div.style.fontWeight = "bold";
            }
            if( settings["mapShowBars"] && report.buildings.timestamp > 0)
            {
              div = divOverlay.appendChild(document.createElement("div"));
              div.style.border="1px solid #804000";
              div.style.position = "absolute";
              div.style.width = (iconSize.width-6)+"px";
              div.style.height = "14px";
              div.style.top = (iconSize.height - 16)+"px";
              div.style.left = "1px";
              div.style.backgroundColor="rgba(255,255,255,0.2)";
              var barHeight = "2px";
              var divRes = div.appendChild(document.createElement("div"));
              divRes.style.position = "relative";
              divRes.style.opacity="1";
              divRes.style.border = "1px solid rgba(255,255,255,0.6)";
              divRes.style.top = "1px";
              divRes.style.left = "1px";
              divRes.style.width = size[0]+"px";
              divRes.style.height = barHeight;
              divRes.style.backgroundColor = "#9E7E3F";
              divRes = div.appendChild(document.createElement("div"));
              divRes.style.position = "relative";
              divRes.style.opacity="1";
              divRes.style.border = "1px solid rgba(255,255,255,0.6)";
              divRes.style.top = "1px";
              divRes.style.left = "1px";
              divRes.style.width = size[1]+"px";
              divRes.style.height = barHeight;
              divRes.style.backgroundColor = "#963306";
              divRes = div.appendChild(document.createElement("div"));
              divRes.style.position = "relative";
              divRes.style.opacity="1";
              divRes.style.border = "1px solid rgba(255,255,255,0.6)";
              divRes.style.top = "1px";
              divRes.style.left = "1px";
              divRes.style.width = size[2]+"px";
              divRes.style.height = barHeight;
              divRes.style.backgroundColor = "#8E8787";
              
              divRes = div.appendChild(document.createElement("div"));
              divRes.style.position = "absolute";
              divRes.style.opacity="1";
              divRes.style.top = "0px";
              divRes.style.left = size[3]+"px";
              divRes.style.width = "1px";
              divRes.style.height = "14px";
              divRes.style.backgroundColor = "#00EE00";
            }
          }
          delete report;
        }
      }
    }
  }
  if( settings.mapRedirActive )
    redirTargetChanged(redirTarget);
  overlayDiv.style.display = "";
}

function showBeuteSum()
{
  var div = document.getElementById("dsfm_shadow_div");
  div.style.width =  Math.max(document.body.clientWidth,window.innerWidth)+"px";
  div.style.height =  Math.max(document.body.clientHeight,window.innerHeight)+"px";
  div.style.display="block";
  div = document.getElementById("dsfm_beutesum");
  div.style.top = window.pageYOffset + ((window.innerHeight - 200) / 2) + "px";
  div.style.left = window.pageXOffset + ((window.innerWidth - 200) / 2) + "px";
  div.style.display = "block";
  var minTS = getTime();
  minTS -= settings.sumHours * 3600;
  var beute = doCleanUp("beute",minTS).split(";");
  var sums = [ 0, 0, 0, 0 ];
  for(var i = 0; i < beute.length; i++ )
  {
    var vals = beute[i].split(",");
    if( ownPid == vals[1] )
    {
      sums[0] += parseInt(vals[2],10);
      sums[1] += parseInt(vals[3],10);
      sums[2] += parseInt(vals[4],10);
      sums[3]++;
    }
  }
  document.getElementById("dsfm_sumwood").innerHTML = formatNumber(sums[0]);
  document.getElementById("dsfm_sumstone").innerHTML = formatNumber(sums[1]);
  document.getElementById("dsfm_sumiron").innerHTML = formatNumber(sums[2]);
  document.getElementById("dsfm_sumtotal").innerHTML = formatNumber(sums[0]+sums[1]+sums[2]);
  document.getElementById("dsfm_sumreports").innerHTML = formatNumber(sums[3]);
}

function redirectLink(e)
{
  var report = this.getAttribute("dsfm_village").split(",");
  switch( redirTarget )
  {
    case "removeinfo":
      if( confirm( texts[lang].gui.confirm_delinfosxy[0]+" "+report[1]+"|"+report[2]+" "+texts[lang].gui.confirm_delinfosxy[1] ) )
      {
        deleteVillageInfos(report[1]+"_"+report[2]);
        var infos = document.getElementById("dsfm_"+report[1]+"_"+report[2] );
        infos.parentNode.removeChild(infos);
      }
      break;
    case "togglenofarm":
      nofarms = storage.getValue("nofarms","");
      var re =  new RegExp(report[1]+"_"+report[2]+";" )
      if( re.test(nofarms) )
        nofarms = nofarms.replace(new RegExp(report[1]+"_"+report[2]+";","g"), "");
      else
        nofarms += report[1]+"_"+report[2]+";"
      setAttImg(report[1],report[2]);
      storage.setValue("nofarms",nofarms);
      break;
  }
}

function redirTargetChanged(target) 
{ 
  var container = document.getElementById(mapId[curMap]);
  if( container )
  {
    storage.setValue("redirTarget", target); 
    redirTarget = target;
    var tds = container.getElementsByTagName('td');
    var idx = 0;
    for( var i = 0; i < tds.length; i++ )
    {
      var a = tds[i].getElementsByTagName('a');
      if( a.length == 1 )
      {
        a = a[0];
        var report = a.getAttribute("dsfm_village");
        if( report )
        {
          report = report.split(",");
          var apar = parseParams(a.href);
          var vid = apar.village;
          var container = document.getElementById("mapCoords");
          var off = (mapSize.count-1)/2;
          var x = map_x0 + off;
          var y = map_y0 + off;
          switch( target )
          {
            case "villageinfo":
              a.href =  createLink("info_village", "id", report[0], false);
              break;
            case "place":
              a.href = createLink("place", "mode", "command", "target", report[0], false);
              break;
            case "market":
              a.href = createLink("market", "mode", "send", "target", report[0], false);
              break;
            case "getress":
              var href = createLink("market", "mode", "send", "target", curVillage, false);
              a.href = href.replace("village="+curVillage,"village="+report[0]);
              break;
            case "centermap":
              a.href = createLink("map", "x", report[1], "y", report[2], false);
              break;
            case "removeinfo":
              a.href = "javascript:;";
              break;
            case "selectvillage":
              var href = createLink("map", "x", x, "y", y, false);
              a.href = href.replace("village="+curVillage,"village="+report[0]);
              break;
            case "togglenofarm":
              a.href = "javascript:;"
              break;
            case "delattmark":
              a.href = "javascript:;"
              break;
          }
        }
      }
    }
  }
}

function addbb2fl()
{
  var ts = getTime();
  var minTS = ts - settings.reportMaxAge * 86400;
  var anz = Math.round(settings.placeNoReportLoad / 3);
  for( var i = 0; i < bbs.length; i++ )
  {
    var report = new village(bbs[i]).load();
    if( report.lastreport.timestamp < minTS )
    {
      report.lastreport.timestamp = ts;
      report.res.timestamp = ts;
      report.res.wood = anz;
      report.res.stone = anz;
      report.res.iron = anz;
      report.save();
    }
  }
  mapCreateOverlays();
}

function setAttImg(x,y)
{
  var coords = x+"_"+y;
  x = parseInt(x,10)-map_x0;
  y = parseInt(y,10)-map_y0;
  var img = document.getElementById("dsfm_att_"+coords);
  if( img )
  {
    var re = new RegExp(coords);
    if( re.test(nofarms) )
      img.src = nofarmpng;
    else if( re.test(atts) && !/\/attack/.test(document.getElementById("tile_"+x+"_"+y).innerHTML) )
      img.src = attentionpng;
    else
      img.src = "graphic/map/empty.png";
  }
}

function setPopupInfos(key)
{
  var report = new village(key).load();
  var hasInfos = false;
  var row = document.getElementById("dsfm_noinfos_row");
  row.style.display = '';
  while(row = row.nextSibling)
    row.style.display="none";
  if( report )
  {
    var html = "";
    var f = useeq ? report.eq / 100 : 1;
    if( report.res.timestamp > 0 && settings.popupShowRessis )
    {
      html = '<table style="white-space: nowrap;"><tr>';
      if( report.buildings.timestamp > 0 )
      {
        var max = getStorageSize(report)-getHideSize(report.buildings.hide.level);
        var sum = 0;
        for( var i = 0; i < 3; i++ )
        {
          var res = Math.round(getRessource(report, ressis[i]) * f);
          if( res < 0 )
            res = 0;
          var txt = formatNumber(res);
          sum += res;
          var color = "#000";
          if( res >= max )
            color = "#FF0000";
          else if( res >= max*0.75 )
            color ="#FF6A00";
          else if( report["bonus"] == resInfos[ressis[i]].bonus || report["bonus"] == 8)
            color = "#00A012";
          html += '<td><img src="'+resInfos[ressis[i]].img+'" border="0" alt=""/></td><td style="padding-right:20px; color:'+color+'">'+txt+'</td>';
        }
        if( sum >= 0 )
          html += '<td><img src="graphic/res.png" border="0" alt=""/></td><td>'+formatNumber(sum)+'</td>';
        
        html += '<td>&#216; ' + report.eq + '%</td>'
        
        showReportAge(report.buildings.timestamp, "resources");
      }
      else if( report.res.timestamp > 0 )
      {
        var sum = 0;
        for( var i = 0; i < 3; i++ )
        {
          var res = report.res[ressis[i]];
          sum += res;
          var color = "rgb(0,38,255)";
          html += '<td><img src="'+resInfos[ressis[i]].img+'" border="0" alt=""/></td><td style="padding-right:20px; color:'+color+';">'+formatNumber(res)+'</td>';
        }
        if( sum >= 0 )
          html += '<td><img src="graphic/res.png" border="0" alt=""/></td><td>'+formatNumber(sum)+'</td>';
        showReportAge(report.res.timestamp, "resources");
      }
      html += '</tr></table>';
      document.getElementById("dsfm_resources").innerHTML = html;
      document.getElementById("dsfm_resources_row").style.display = '';
      hasInfos = true;
    }
    if( report.buildings.timestamp > 0 )
    {
      if( settings.popupShowBuildings )
      {
        document.getElementById("dsfm_buildings_row").style.display = '';
        document.getElementById("dsfm_buildings").innerHTML = getBuildingsTab(report.buildings, settings.popupShowBuildingChange, 0);
        showReportAge(report.buildings.timestamp, "buildings");
        hasInfos = true;
      }
      if( settings.popupShowMining && report.buildings.storage.level > 0)
      {
        document.getElementById("dsfm_mining_row").style.display = '';
        html = '<table><tr>';
        var val;
        var color;
        for( i = 0; i < 3; i++ )
        {
          val = getMining(report.buildings[ressis[i]].level);
          color = "#000";
          if( report["bonus"] == 8 )
          {
            val = Math.round(val * 1.3);
            color = "#00A012";
          }
          else if( report["bonus"] == resInfos[ressis[i]].bonus )
          {
            val = Math.round(val * 2);
            color = "#00A012";
          }
          html += '<td><img src="'+resInfos[ressis[i]].img+'" border="0" alt=""/></td><td style="padding-right:20px; color:'+color+'">'+formatNumber(val)+'</td>';
        }
        val = getStorageSize(report);
        color = "#000";
        if( report["bonus"] == 9)
          color = "#00A012";
        html += '<td><img src="graphic/res.png" border="0" alt=""/></td><td style="padding-right:20px; color:'+color+'">'+formatNumber(val)+'</td>';
        html += '<td><img src="graphic/buildings/hide.png" border="0" alt=""/></td><td>'+formatNumber(getHideSize(report.buildings.hide.level))+'</td>';
        html += '</tr></table>';
        document.getElementById("dsfm_mining").innerHTML = html;
        showReportAge(report.buildings.timestamp, "resources");
        hasInfos = true;
      }
    }
    if( report.unitsin.hasUnits && settings.popupShowUnitsIn )
    {
      document.getElementById("dsfm_unitsin_row").style.display = '';
      document.getElementById("dsfm_unitsin").innerHTML = getUnitsTab(report.unitsin);
      showReportAge(report.unitsin.timestamp, "unitsin");
      hasInfos = true;
    }
    if( report.unitsout.hasUnits && settings.popupShowUnitsOut )
    {
      document.getElementById("dsfm_unitsout_row").style.display = '';
      document.getElementById("dsfm_unitsout").innerHTML = getUnitsTab(report.unitsout);
      showReportAge(report.unitsout.timestamp, "unitsout");
      hasInfos = true;
    }
    if( report["loyalty"] && settings.popupShowLoyalty )
    {
      var loyalty = report["loyalty"]["value"];
      var h = Math.round((getTime() - report["loyalty"].timestamp) / 3600);
      loyalty += Math.round(h * serverCfg.speed);
      if( loyalty < 100 )
      {
        document.getElementById("dsfm_loyalty_row").style.display = '';
        document.getElementById("dsfm_loyalty").innerHTML = loyalty;
        hasInfos = true;
      }
    }
  }
  if( hasInfos )
    document.getElementById("dsfm_noinfos_row").style.display="none";
}

function getBuildingsTab(buildings, change, katas )
{
  var rows = ['','','',''];
  var colidx = 0;
  for( var i = 0; i < buildinginfo.length; i++ )
  {
    if( buildings[buildinginfo[i].name].level > 0 )
    {
      rows[0] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center; width:25px">'+buildinginfo[i].img+'</td>';
      rows[1] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center;">'+buildings[buildinginfo[i].name].level+'</td>';
      rows[2] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center; color:';
      if( isNaN(buildings[buildinginfo[i].name].change))
        rows[2] += 'grey;">---';
      else if( buildings[buildinginfo[i].name].change < 0 )
        rows[2] += 'red;">' + buildings[buildinginfo[i].name].change;
      else if(buildings[buildinginfo[i].name].change > 0 )
        rows[2] += 'green;">+' + buildings[buildinginfo[i].name].change;
      else
        rows[2] += 'grey;">0';
      rows[2] += '</td>';
      rows[3] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center;">'+katasNeeded[buildings[buildinginfo[i].name].level]+'</td>';
      colidx ^= 1;
    }
  }
  var html = '<table cellspacing="0" style="border: 1px solid rgb(222, 211, 185);"><tr>'+rows[0]+'<td/></tr><tr>'+rows[1];
  if( change || katas )
    html += '<td>'+texts[lang].gui.level+'</td>';
  if(change)
    html += '</tr><tr>'+rows[2]+'<td><b style="color: green">+</b><b style="color:red">-</b></td>';
  
  if(katas)
    html += '</tr><tr>'+rows[3]+'<td><img src="graphic/unit/unit_catapult.png" border="0" alt'+texts[lang].gui.catas+'"/></td>';
  html += '</tr></table>';
  return html;
}

function getUnitsTab(units)
{
  if( typeof(units["spear"]) == "undefined" )
    return "Keine";  
    
  var colidx = 0;
  var row = ["",""];
  for( var key in unitinfo )
  {
    if( units[key] > 0 )
    {
      row[0] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center"><img src="graphic/unit/unit_'+key+'.png" border="0"/></td>';
      row[1] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center">'+units[key]+'</td>';
      colidx ^= 1;
    }
  }
  return '<table cellspacing="0" style="border: 1px solid rgb(222, 211, 185);"><tr>'+row[0]+'</tr><tr>'+row[1]+'</tr></table>';
}

function showReportAge(ts, key)
{
  var span = document.getElementById( "dsfm_"+key+"_age" );
  span.style.display = "none";
  if( settings.popupShowReportAge )
  {
    var age = (getTime() - ts);
    if( age / 3600 > settings.popupMinReportAge )
    {
      var str = "";
      var val = Math.floor(age / 86400);
      if( val > 0 )
        str += val + " " + texts[lang].gui.days[val==1?0:1] + " ";
      age %= 86400;
      if( age > 0 )
      {
        val = Math.floor(age / 3600);
        if( val > 0 )
          str += val + texts[lang].gui.hours + " ";
        age %= 3600;
        if( age > 0 )
        {
          val = Math.floor(age / 60);
          if( val > 0 )
            str += val + texts[lang].gui.minutes;
        }
      }
      span.innerHTML = texts[lang].gui.age + ": " + str;
      span.style.display="";
    }
  }
}

function parseReport(isPublicReport)
{
  // TODO
  if( isPublicReport )
    return;
  var rid = parseInt(location.href.match( /view=(\d+)/ )[1], 10);
  var tables = document.getElementsByClassName("vis");
  var table;
  if( settings.useHotKeys )
  {
    var a = [ tables[1].getElementsByTagName("a"), tables[1].nextSibling.nextSibling.nextSibling.getElementsByTagName("a") ];
    tables[1].style.whiteSpace="nowrap";
    tables[1].nextSibling.nextSibling.nextSibling.style.whiteSpace="nowrap";
    
    for( var i = 0; i < a[0].length; i++ )
    {
      var txt = "";
      var key = 0;
      if( /mode=forward/.test(a[0][i].href) )
      {
        txt = "W";
        key = 87;
      }
      else if( /mode=move/.test(a[0][i].href) )
      {
        txt = "V";
        key = 86;
      }
      else if( /action=del_one/.test(a[0][i].href) )
      {
        txt = "L";
        key = 76;
      }
      else if( a[0][i].innerHTML == "&lt;&lt;" )
      {
        txt = "<b>&larr;</b>";
        key = 37;
      }
      else if( a[0][i].innerHTML == "&gt;&gt;" )
      {
        txt = "<b>&rarr;</b>";
        key = 39;
      }
      
      if( key > 0 )
      {
        hotKeys.push( { key: key, href: a[0][i].href } );
        a[0][i].innerHTML += " [" + txt + "]";
        a[1][i].innerHTML += " [" + txt + "]";
      }
    }
  }
  var table = tables[2];
  var res = table.innerHTML.match(new RegExp( texts[lang].regex.sendDate ) );
  var ts = texts[lang].locale.date2MS(res)/1000;
  var age = (getTime() - ts) / 3600;
  var rids = storage.getValue("rids","");
  var ridre = new RegExp( "\\d+,"+rid+";" );
  var known = ridre.test(rids);
  if( new RegExp(texts[lang].regex.reportTitle).test(table.innerHTML) )
  {
    var msgRow = table.insertRow(1);
    msgRow.insertCell(0).innerHTML = texts[lang].gui.stateTitle;
    var msg = msgRow.insertCell(1);
    
    var playerids = [0,0];
    
    var tab = document.getElementById("attack_info_att");
    res = tab.rows[0].cells[1].innerHTML.match( /id=(\d+)/ );
    if( res )
      playerids[0] = parseInt(res[1],10);
    
    tab = document.getElementById("attack_info_def");
    res = tab.rows[0].cells[1].innerHTML.match( /id=(\d+)/ );
    if( res )
      playerids[1] = parseInt(res[1],10);
    var vid = parseInt(tab.rows[1].cells[1].innerHTML.match( /id=(\d+)/ )[1],10);
    var dstCoords = tab.rows[1].cells[1].getElementsByTagName("a")[0].innerHTML.match(new RegExp( texts[lang].regex.villageLink));
    var vpa = table.rows[table.rows.length-1].cells[0].lastChild.previousSibling.parentNode;
    vpa.insertBefore(document.createElement("br"), vpa.childNodes[vpa.childNodes.length-4]);
    vpa = vpa.insertBefore(document.createElement("a"), vpa.childNodes[vpa.childNodes.length-4]);
    vpa = vpa.appendChild(document.createElement( "a" ));
    vpa.href = createLink("place", "mode", "command", "target", vid, false );
    vpa.innerHTML = "&raquo; " + texts[lang].gui.attackAgain;

    var vKey = dstCoords[1]+"_"+dstCoords[2];

    if( known )
      msg.innerHTML = texts[lang].gui.reportKnown;
    else
    {
      var restab = document.getElementById("attack_results");
      var loy = 100;
      if( restab )
      {
        var res = restab.innerHTML.match(new RegExp(texts[lang].regex.loyaltyChange));
        if( res )
          loy = parseInt(res[1], 10);
      }
      if( playerids[1] == ownPid || playerids[0] == ownPid && loy <= 0 )
      {
        deleteVillageInfos(dstCoords[1]+"_"+dstCoords[2]);
        msg.innerHTML = texts[lang].gui.ownVillage;
      }
      else
      {
        var villageInfo = new village( vKey ).load();
        if( villageInfo.lastreport.timestamp < ts || villageInfo.lastreport.rid < rid )
        {
          villageInfo.lastreport.rid = rid;
          villageInfo.lastreport.timestamp = ts;
        }
        if( loy < 100 && (villageInfo.loyalty.timestamp < ts || villageInfo.loyalty.rid < rid) )
        {
          villageInfo.loyalty.rid = rid;
          villageInfo.loyalty.timestamp = ts; 
          villageInfo.loyalty.value = loy;
        }
   
        atts = storage.getValue( "atts","");
        atts = atts.replace(new RegExp("\\d+,"+playerids[0]+","+dstCoords[1]+"_"+dstCoords[2]+";"),"");
        storage.setValue("atts",atts);
        if( age > settings.reportMaxAge * 24 )
          msg.innerHTML = texts[lang].gui.oldReport;
        else
        {
          if( restab && restab.rows.length > 0 && age < settings.sumHours )
          {
            if( new RegExp( texts[lang].regex.beute ).test(restab.rows[0].cells[0].innerHTML) )
            {
              var beute = {"wood":0, "stone":0, "iron":0};
              var imgs = restab.rows[0].cells[1].getElementsByTagName("img");
              var res = restab.rows[0].cells[1].innerHTML.replace(/<[^>]+>/g, "").replace(/\./g,"").split(" ");
              var load = restab.rows[0].cells[2].innerHTML.replace(/<[^>]+>/g, "").replace(/\./g,"").split("/");
              load[0] = parseInt(load[0],10);
              load[1] = parseInt(load[1],10);
              villageInfo.eq = Math.round((villageInfo.eq + (load[0] * 100 / load[1]))/2);
              for( var b = 0; b < imgs.length; b++ )
                beute[resKey[imgs[b].title]] = res[b];
              var beuten = storage.getValue("beute","");
              if( !new RegExp(","+rid+";").test(beuten) )
                storage.setValue("beute", beuten + ts + "," + playerids[0] + "," + beute["wood"]+","+beute["stone"]+","+beute["iron"]+","+rid+";");
            }
          }
          
          tab = document.getElementById("attack_spy");
          if( tab ) 
          {
            if( new RegExp(texts[lang].regex.spyres).test(tab.rows[0].cells[0].innerHTML) )
            {
              var imgs = tab.rows[0].cells[1].getElementsByTagName("img");
              res = tab.rows[0].cells[1].innerHTML.replace(/<[^>]+>/g, "").replace(/\./g,"").split(" ");
              if( villageInfo.res.timestamp < ts || villageInfo.res.rid < rid )
              {
                villageInfo.res.rid = rid;
                villageInfo.res.timestamp = ts;
                for( i = 0; i < imgs.length; i++ )
                  villageInfo.res[resKey[imgs[i].title]] = res[i];
              }
            }
            if( tab.rows.length > 1 && new RegExp( texts[lang].regex.spybuildings ).test( tab.rows[1].cells[0].innerHTML ) )
            {
              if( villageInfo.buildings.timestamp < ts || villageInfo.buildings.rid < rid )
              {
                var buildings = tab.rows[1].cells[1].innerHTML.replace(/<[^>]+>/g,"").split("\n");
                var levels = { };
                for( var key in buildingKeys )
                  levels[buildingKeys[key]] = 0;
                for( i = 0; i < buildings.length; i++ )
                {
                  res = buildings[i].match(new RegExp( texts[lang].regex.buildinglevel ));
                  if( res )
                    levels[buildingKeys[res[1].substring(0,res[1].length-1)]] = parseInt(res[2],10);
                }
                for( var key in levels )
                {
                  var change = levels[key] - villageInfo.buildings[key].level;
                  villageInfo.buildings[key].level = levels[key];
                  if( villageInfo.buildings.rid > 0 )
                    villageInfo.buildings[key].change = change;
                }
                villageInfo.buildings.rid = rid;
                villageInfo.buildings.timestamp = ts;
              }
            }
            if( tab.rows.length > 2 && new RegExp(texts[lang].regex.defunits).test(tab.rows[tab.rows.length-2].cells[0].innerHTML) )
            {
              if( villageInfo.unitsout.timestamp < ts || villageInfo.unitsout.rid < rid )
              {
                var unittab = tab.rows[tab.rows.length-1].cells[0].getElementsByTagName("table")[0];
                villageInfo.unitsout.rid = rid;
                villageInfo.unitsout.timestamp = ts;
                for( var i = 0; i < unittab.rows[0].cells.length; i++ )
                {
                  res = unittab.rows[0].cells[i].innerHTML.match(/unit\/unit_([^\.]+)\.png/);
                  villageInfo.unitsout[res[1]] = parseInt(unittab.rows[1].cells[i].innerHTML, 10);
                }
              }
            }
          }
          else if( villageInfo.res.timestamp < ts || villageInfo.res.rid < rid )
          {
            villageInfo.res.rid = rid;
            villageInfo.res.timestamp = ts;
            if( load && load[0] == load[1] )
            {
              for( i = 0; i < ressis.length; i++ )
              {
                villageInfo.res[ressis[i]] -= beute[ressis[i]];
                if( villageInfo.res[ressis[i]] < 0 )
                  villageInfo.res[ressis[i]] = 0;
              }
            }
            else
            {
              villageInfo.res.wood = 0;
              villageInfo.res.stone = 0;
              villageInfo.res.iron = 0;
            }
          }
          if( villageInfo.buildings.rid != rid )
          {
            res = restab.innerHTML.match(new RegExp(texts[lang].regex.damage,"g"));
            if( res )
            {
              for( var i = 0; i < res.length; i++ )
              {
                var vals = res[i].match(new RegExp(texts[lang].regex.damage));
                if( vals )
                {
                  var level = parseInt( vals[2], 10 );
                  villageInfo.buildings[buildingKeys[vals[1]]].change = level - villageInfo.buildings[buildingKeys[vals[1]]].level;
                  villageInfo.buildings[buildingKeys[vals[1]]].level = level;
                }
              }
            }
          }

          var unittab = document.getElementById("attack_info_def_units");
          if( unittab && (villageInfo.unitsin.timestamp < ts || villageInfo.unitsin.rid < rid) )
          {
            villageInfo.unitsin.rid = rid;
            villageInfo.unitsin.timestamp = ts;
            var units = {};
            for( var i = 1; i < unittab.rows[0].cells.length; i++ )
            {
              res = unittab.rows[0].cells[i].innerHTML.match(/unit\/unit_([^\.]+)\.png/);
              villageInfo.unitsin[res[1]] = parseInt(unittab.rows[1].cells[i].innerHTML, 10) - parseInt(unittab.rows[2].cells[i].innerHTML, 10);
            }
          }
          
          msg.innerHTML = texts[lang].gui.reportRead;
          villageInfo.save();
        }
      }
    }
  }
  if( age < settings.reportMaxAge * 24 && !known )
  {
    rids += ts + "," + rid + ";"
    storage.setValue("rids",rids);
  }
}

function clearAllInfos()
{
  if( confirm( texts[lang].gui.confirm_delAll ) )
  {
    var vals = storage.listValues();
    for(var i = 0; i < vals.length; i++ )
      storage.deleteValue(vals[i]);
    alert( texts[lang].gui.allDataDeleted );
  }
}

function deleteVillageInfos(coords)
{
  storage.deleteValue(coords);
  atts = storage.getValue("atts", "").replace(new RegExp("\\d+,\\d+,"+coords+";","g"), "");
  storage.setValue("atts",atts);
  nofarms = storage.getValue("nofarms","").replace(new RegExp(coords+";","g"), "");
  storage.setValue("nofarms",nofarms);
}


function followMap()
{
  var map = document.getElementById(mapId[curMap]);
  if( map )
  {
    var left = Math.abs(parseInt(map.style.left, 10));
    var top = Math.abs(parseInt(map.style.top, 10));
    if( left == mapSize.width || top == mapSize.height )
    {
      curMap ^= 1;
      clearInterval(timer);
      mapCreateOverlays();
    }
  }
}

function showSettings()
{
  var e = document.getElementsByTagName("h3");
  for( var i = 0; i < e.length; e++ )
  {
    if( new RegExp(texts[lang].regex.settings).test(e[i].innerHTML) )
    {
      e = e[i].parentNode;
      break;
    }
  }
  var p = e.appendChild(document.createElement("p"));
  e = p.appendChild(document.createElement("form"));
  e.name="dsfm_settingsFrm";
  e.action = "javascript:;";
  e = e.appendChild(document.createElement("table"));
  e.style.border = "1px solid rgb(222, 211, 185)";
  var row = e.insertRow(e.rows.length);
  var cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = texts[lang].gui.title + " " + version;
 
  row = e.insertRow(e.rows.length);
  cell = row.insertCell(0);
  cell.innerHTML = '<input type="checkbox" id="dsfm_useHotKeys"'+(settings.useHotKeys?' checked="checked"':'')+'/> ' + texts[lang].gui.useHotKeys;
  row = e.insertRow(e.rows.length);
  cell = row.insertCell(0);
  cell.innerHTML = '<input type="text" size="4" id="dsfm_maxAttAge" value="'+settings.maxAttAge+'"/> '+texts[lang].gui.maxAttAge;

  row = e.insertRow(e.rows.length);
  cell = row.insertCell(0);
  
  var section = cell.appendChild(document.createElement("table"));
  section.className="vis";
  section.style.border = "1px solid rgb(222, 211, 185)";
  section.style.width = "100%";
  section.id="dsfm_map_settings";
  var html = '<tr><th colspan="4">'+texts[lang].gui.mapSettings+'</th></tr>';
  html += '<tr>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_rememberMapPos"'+(settings.rememberMapPos?' checked="checked"':'')+'/> '+texts[lang].gui.rememberMapPos+'</td>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_mapRedirActive"'+(settings.mapRedirActive?' checked="checked"':'')+'/> '+texts[lang].gui.mapRedirActive+'</td>';
  html += '</tr>';
  
  html += '<tr>';
  html += '<td><input type="text" id="dsfm_reportMaxAge" value="'+settings.reportMaxAge+'" size="1"/></td><td>'+texts[lang].gui.reportMaxAge+'</td>';
  html += '<td colspan="2">'+texts[lang].gui.sumHours[0]+'<input type="text" size="2" id="dsfm_sumHours" value="'+settings.sumHours+'"/>'+texts[lang].gui.sumHours[1]+'</td>';
  html += '</tr>';
  
  html += '<tr><td colspan="2"><b>'+texts[lang].gui.overlayTitle+':</b><td colspan="2"><b>'+texts[lang].gui.popupTitle+':</b></td></tr>';
  
  html += '<tr>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_ageTransparency"'+(settings.ageTransparency?' checked="checked"' : '')+'/> '+texts[lang].gui.ageTransparency[0]+' <input type="text" size="1" id="dsfm_minAgeTransparency" value="'+settings.minAgeTransparency+'"/> '+texts[lang].gui.ageTransparency[1]+'</td>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_popupShowRessis"'+(settings.popupShowRessis?' checked="checked"' : '')+'/> '+texts[lang].gui.popupShowRessis+'</td>';
  html += '</tr>';
  
  html += '<tr>';
  html += '<td><input type="text" size="4" id="dsfm_opacityMin" value="'+settings.opacityMin+'"/></td><td>'+texts[lang].gui.opacityMin+'</td>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_popupShowReportAge"'+(settings.popupShowReportAge?' checked="checked"' : '')+'/> '+texts[lang].gui.popupShowReportAge[0]+' <input type="text" size="3" id="dsfm_popupMinReportAge" value="'+settings.popupMinReportAge+'"/> '+texts[lang].gui.popupShowReportAge[1]+'</td>';
  html += '</tr>';
  
  html += '<tr>';
  html += '<td><input type="text" size="5" id="dsfm_opacityMaxRes" value="'+settings.opacityMaxRes+'"/></td><td>'+texts[lang].gui.opacityMaxRes+'</td>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_popupShowBuildings"'+(settings.popupShowBuildings ? ' checked="checked"' : '')+'/> '+texts[lang].gui.popupShowBuildings+'</td>';
  html += '</tr>';
  
  html += '<tr>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_mapShowRessis"'+(settings.mapShowRessis?' checked="checked"' : '')+'/> '+texts[lang].gui.mapShowRessis+'</td>';
  html += '<td colspan="2">-<input type="checkbox" id="dsfm_popupShowBuildingChange"'+(settings.popupShowBuildingChange ? ' checked="checked"' : '')+'/> '+texts[lang].gui.popupShowBuildingChange+'</td>';
  html += '</tr>';
  
  html += '<tr>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_mapPlayerColored"'+(settings.mapPlayerColored?' checked="checked"' : '')+'/> '+texts[lang].gui.mapPlayerColored+'</td>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_popupShowMining"'+(settings.popupShowMining ? ' checked="checked"' : '')+'/> '+texts[lang].gui.popupShowMining+'</td>';
  html += '</tr>';

  html += '<tr>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_mapShowBars"'+(settings.mapShowBars?' checked="checked"' : '')+'/> '+texts[lang].gui.mapShowBars+'</td>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_popupShowUnitsIn"'+(settings.popupShowUnitsIn?' checked="checked"' : '')+'/> '+texts[lang].gui.popupShowUnitsIn+'</td>';
  html += '<td colspan="2"/>';
  html += '</tr>';

  html += '<tr>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_mapShowWall"'+(settings.mapShowWall?' checked="checked"' : '')+'/> '+texts[lang].gui.mapShowWall+'</td>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_popupShowUnitsOut"'+(settings.popupShowUnitsOut?' checked="checked"' : '')+'/> '+texts[lang].gui.popupShowUnitsOut+'</td>';
  html += '</tr>';

  html += '<tr>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_mapShowGroups"'+(settings.mapShowGroups?' checked="checked"' : '')+'/> '+texts[lang].gui.mapShowGroups+'</td>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_popupShowLoyalty"'+(settings.popupShowLoyalty?' checked="checked"' : '')+'/> '+texts[lang].gui.popupShowLoyalty+'</td>';
  html += '</tr>';

  html += '<tr>';
  html += '<td colspan="2"><input type="checkbox" id="dsfm_mapShowPoints"'+(settings.mapShowPoints?' checked="checked"' : '')+'/> '+texts[lang].gui.mapShowPoints+'</td>';
  html += '<td colspan="2"></td>';
  html += '</tr>';

  section.innerHTML = html;

  row = e.insertRow(e.rows.length);
  cell = row.insertCell(0);
  section = cell.appendChild(document.createElement("table"));
  section.className="vis";
  section.style.border = "1px solid rgb(222, 211, 185)";
  section.style.width = "100%";
  section.id="dsfm_place_settings";
  
  html = '<tr><th>'+texts[lang].gui.placeSettings+'</th></tr>';
  html += '<tr><td>'+texts[lang].gui.placeSendRam[0]+'</td></tr>';
  html += '<tr><td>- '+texts[lang].gui.placeSendRam[1]+' <input type="text" size="2" id="dsfm_placeMinRamWall" value="'+settings.placeMinRamWall+'"/> '+texts[lang].gui.placeSendRam[2]+'</td></tr>';
  html += '<tr><td>- <input type="checkbox" id="dsfm_placeMinRamsNeeded"'+(settings.placeMinRamsNeeded?' checked="checked"':'')+'/> '+texts[lang].gui.placeSendRam[3]+'</td></tr>';
  html += '<tr><td>'+texts[lang].gui.placeNoReportLoad[0]+' <input type="text" size="5" id="dsfm_placeNoReportLoad" value="'+(settings.placeNoReportLoad)+'"/> '+texts[lang].gui.placeNoReportLoad[1]+'</td></tr>';
  html += '<tr><td><input type="checkbox" id="dsfm_placeShowRessis"'+(settings.placeShowRessis?' checked="checked"':'')+'/> '+texts[lang].gui.placeShowRessis+'</td></tr>';
  html += '<tr><td><input type="checkbox" id="dsfm_placeShowUnitsIn"'+(settings.placeShowUnitsIn?' checked="checked"':'')+'/> '+texts[lang].gui.placeShowUnitsIn+'</td></tr>';
  html += '<tr><td><input type="checkbox" id="dsfm_placeShowUnitsOut"'+(settings.placeShowUnitsOut?' checked="checked"':'')+'/> '+texts[lang].gui.placeShowUnitsOut+'</td></tr>';
  html += '<tr><td>'+texts[lang].gui.placeShowBuildings[0]+':<select id="dsfm_placeShowBuildings">';
  html += '<option value="0"'+(settings.placeShowBuildings==0 ?' selected="selected"':'')+'>'+texts[lang].gui.placeShowBuildings[1]+'</option>';
  html += '<option value="1"'+(settings.placeShowBuildings==1 ?' selected="selected"':'')+'>'+texts[lang].gui.placeShowBuildings[2]+'</option>';
  html += '<option value="2"'+(settings.placeShowBuildings==2 ?' selected="selected"':'')+'>'+texts[lang].gui.placeShowBuildings[3]+'</option>';
  html += '</select></td></tr>';
  html += '<tr><td>-<input type="checkbox" id="dsfm_placeShowBuildingChange"'+(settings.placeShowBuildingChange ? ' checked="checked"' : '')+'/> '+texts[lang].gui.placeShowBuildingChange+'</td>';
  html += '<tr><td>-<input type="checkbox" id="dsfm_placeShowCatas"'+(settings.placeShowCatas?' checked="checked"':'')+'/> '+texts[lang].gui.placeShowCatas+'</td></tr>';
  html += '<tr><td>'+texts[lang].gui.placeMinLoad[0]+' <input type="text" size="5" id="dsfm_placeMinLoad" value="'+(settings.placeMinLoad)+'"/> '+texts[lang].gui.placeMinLoad[1]+'</td></tr>';
  html += '<tr><td>'+texts[lang].gui.placeOkOnPlayer[0]+' <select id="dsfm_placeOkOnPlayer">';
  html += '<option value="0"'+(settings.placeOkOnPlayer==0 ?' selected="selected"':'')+'>'+texts[lang].gui.placeOkOnPlayer[2]+'</option>';
  html += '<option value="1"'+(settings.placeOkOnPlayer==1 ?' selected="selected"':'')+'>'+texts[lang].gui.placeOkOnPlayer[3]+'</option>';
  html += '<option value="2"'+(settings.placeOkOnPlayer==2 ?' selected="selected"':'')+'>'+texts[lang].gui.placeOkOnPlayer[4]+'</option>';
  html += '<option value="3"'+(settings.placeOkOnPlayer==3 ?' selected="selected"':'')+'>'+texts[lang].gui.placeOkOnPlayer[5]+'</option>';
  html += '</select> ' +texts[lang].gui.placeOkOnPlayer[1]+'</td></tr>';
  html += '<tr><td><b>'+texts[lang].gui.farmlistSettings[0]+':</b></tr>';
  html += '<tr><td><input type="text" size="2" id="dsfm_placeMaxFarms" value="'+(settings.placeMaxFarms)+'"/> '+texts[lang].gui.farmlistSettings[1]+' <input type="text" size="2" id="dsfm_placeFarmDist" value="'+(settings.placeFarmDist)+'"/> '+texts[lang].gui.farmlistSettings[2]+'</td></tr>';
  html += '<tr><td>'+texts[lang].gui.farmlistSettings[3]+' <input type="text" size="5" id="dsfm_placeIncRangeRes" value="'+(settings.placeIncRangeRes)+'"/> '+texts[lang].gui.farmlistSettings[4]+'</td></tr>';
  section.innerHTML = html;
  
  row = e.insertRow(e.rows.length);
  cell = row.insertCell(0);
  createUnitConfigForm(cell);

  row = e.insertRow(e.rows.length);
  cell = row.insertCell(0);
  var input = cell.appendChild(document.createElement("input"));
  input.type = "button";
  input.value = texts[lang].gui.savebutton;
  input.name = "dsfm_save";
  input.addEventListener("click", saveConfig, false);

  input = cell.appendChild(document.createElement("input"));
  input.type = "button";
  input.value = texts[lang].gui.exportbutton;
  input.name = "dsfm_export";
  input.addEventListener("click", function(){ exportData(); }, false);
  
  input = cell.appendChild(document.createElement("input"));
  input.type = "button";
  input.value = texts[lang].gui.importbutton;
  input.name = "dsfm_import";
  input.addEventListener("click", function(){ showImpExpForm(true) }, false);

  input = cell.appendChild(document.createElement("input"));
  input.type = "button";
  input.value = texts[lang].gui.deletebutton;
  input.name = "dsfm_delete";
  input.addEventListener("click", function(){ clearAllInfos(); }, false);
  
  var div = document.body.appendChild(document.createElement("div"));
  div.style.position="absolute";
  div.style.width = "600px";
  div.style.height = "400px";
  div.style.display = "none";
  div.id = "dsfm_impexp_div";
  div.style.zIndex = 1000;
  html = '<table class="main" style="border:2px solid #804000; width:600px; height:400px;">';
  html += '<tr><th><table cellpadding="0" cellspacing="0" width="100%"><tr><td id="dsfm_impexp_title"></td><td style="text-align:right;"><a href="javascript:;" id="dsfm_close" onclick="javascript:document.getElementById(\'dsfm_impexp_div\').style.display=\'none\'; document.getElementById(\'dsfm_shadow_div\').style.display=\'none\';">'+texts[lang].gui.close+(settings.useHotKeys?" [ESC]":"")+'</a></td></tr></table></th></tr>';
  html += '<tr height="100%"><td><textarea onclick="this.select()" id="dsfm_impexp_report" style="width:595px; height:100%;"></textarea></td></tr>';
  html += '<tr><td id="dsfm_impexp_desc"></td></tr>';
  html += '<tr id="dsfm_impbtn_row"><td style="text-align:center"><input id="dsfm_import_btn" type="button" value="'+texts[lang].gui.startimport+'"/></td></tr>';
  html += '</table>';
  div.innerHTML = html;
  document.getElementById("dsfm_import_btn").addEventListener("click", importData, false);
  if( settings.useHotKeys )
    hotKeys.push( { key: 27, event: { id: "dsfm_close", event: "click" } } );
  
  tab = p.appendChild(document.createElement("table"));
  row = tab.insertRow(-1);
  row.insertCell(-1).innerHTML = "Entwicklung des Farmmanagers unterstützen:";
  row.insertCell(-1).innerHTML = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><table><tr><td><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="DTQ463G5SFB28"><input type="image" src="https://www.paypal.com/de_DE/DE/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="Jetzt einfach, schnell und sicher online bezahlen – mit PayPal."><img alt="" border="0" src="https://www.paypal.com/de_DE/i/scr/pixel.gif" width="1" height="1"></td></tr></table></form>';
  row.insertCell(-1).innerHTML = '<a href="https://billing.micropayment.de/fastdonate/?account=20505&theme=type1-blue" target="DONATE" onclick="wnd=window.open(\'about:blank\', \'DONATE\', \'width=210, height=135\'); wnd.focus()"><img src="http://www.micropayment.de/resources/?what=img&group=fastdonatebtn&show=type3-blue" border="0" width="109" height="30" alt="Donate Now"></a>';
  createShadowDiv("none");
}

function createShadowDiv(display)
{
  var div = document.body.appendChild(document.createElement("div"));
  div.style.position = "absolute";
  div.style.top = "0px";
  div.style.left = "0px";
  div.style.width =  Math.max(document.body.clientWidth,window.innerWidth)+"px";
  div.style.height =  Math.max(document.body.clientHeight,window.innerHeight)+"px";
  div.style.backgroundColor = "rgba(0,0,0,0.7)";
  div.style.zIndex = 999;
  div.style.display=display;
  div.id = "dsfm_shadow_div";
  return div;
}

function showImpExpForm(isImport)
{
  var div = document.getElementById("dsfm_shadow_div");
  div.style.width =  Math.max(document.body.clientWidth,window.innerWidth)+"px";
  div.style.height =  Math.max(document.body.clientHeight,window.innerHeight)+"px";
  div.style.display="block";
  div = document.getElementById("dsfm_impexp_div");
  div.style.top = window.pageYOffset + ((window.innerHeight - 600) / 2) + "px";
  div.style.left = window.pageXOffset + ((window.innerWidth - 400) / 2) + "px";
  div.style.display="block";
  document.getElementById("dsfm_impexp_report").innerHTML = "";
  document.getElementById("dsfm_impexp_title").innerHTML = texts[lang].gui.title + " - " + (isImport ? texts[lang].gui.importTitle : texts[lang].gui.exportTitle);
  document.getElementById("dsfm_impbtn_row").style.display = isImport ? "" : "none";
}

function importData()
{
  var lines = document.getElementById("dsfm_impexp_report").value.replace(/\r\n/g,"\n").replace(/\n\r/g,"\n").split("\n");
  if( lines[0] == "hpxdsfmexp" )
  {
    if( parseInt(lines[1].split(".")[0],10) > 1 )
    {
      if( lines[2] == server ) 
      {
        if( lines[lines.length-1] != "hpxdsfmexp" )
          alert(texts[lang].gui.incompleteExp);
        for( var i = 2; i < lines.length; i++ )
        {
          var parts = lines[i].split(":");
          if( parts.length > 1 )
          {
            var name = parts[0];
            parts = parts.splice( 1 );
            var value = parts.join(":");
            if( /\d{1,3}_\d{1,3}/.test(name) )
            {
              var curVil = new village(name).load();
              var impVil = new village(name);
              impVil.fromString(value);
              curVil.merge(impVil);
              curVil.save();
            }
            else
            {
              if( name == "rids" )
              {
                var cur = storage.getValue(name,"");
                var imp = value.split(";");
                for( var j = 0; j < imp.length; j++ )
                {
                  if( cur.indexOf(imp[j]) == -1 )
                    cur += imp[j]+";";
                }
                value = cur;
              }
              storage.setValue(name,value);
            }
          }
        }
        alert( texts[lang].gui.importDone );
        document.getElementById("dsfm_impexp_div").style.display="none";
        document.getElementById("dsfm_shadow_div").style.display="none";
      }
      else
        alert(texts[lang].gui.wrongworld);
    }
    else
      alert( texts[lang].gui.unsupportedVersion );
  }
  else
  {
    alert( texts[lang].gui.wrongFormat );
  }
}

function exportData()
{
  var str = "hpxdsfmexp\n"+version+"\n"+server+"\n";
  var vals = storage.listValues();
  for(var i = 0; i < vals.length; i++ )
    str += vals[i]+":"+storage.getValue(vals[i])+"\n";
  str += "hpxdsfmexp";
  var div = document.getElementById("dsfm_impexp_div");
  showImpExpForm(false);
  document.getElementById("dsfm_impexp_report").value = str;
}

function saveConfig()
{
  for( var i = 0; i < settingNames.length; i++ )
  {
    var input = document.getElementById("dsfm_"+settingNames[i]);
    if( !input ) 
    {
      debug.log(settingNames[i]);
      settings[settingNames[i]] = 0;
    }
    else
    {
      if( input.type == "checkbox" )
        settings[settingNames[i]] = input.checked ? 1 : 0;
      else
        settings[settingNames[i]] = parseInt(input.value, 10);
    }
  }
  saveSettings();
  saveFarmUnitConfig();
  alert( texts[lang].gui.settingsSaved );
}

function loadSettings()
{
  var vals = storage.getValue("settings", settingDefaults).split(",");
  defVals = settingDefaults.split(",");
  settings = { };
  for( var i = 0; i < defVals.length; i++ )
  {
    if( i < vals.length )
      settings[settingNames[i]] = parseInt(vals[i], 10);
    else
      settings[settingNames[i]] = parseInt(defVals[i], 10);
  }
}

function saveSettings()
{
  var str = "";
  for( var i = 0; i < settingNames.length; i++ )
  {
    if( str.length > 0 )
      str += ",";
    str += settings[settingNames[i]];
  }
  storage.setValue("settings",str);
}

function parseParams(url)
{
  url = url.substring(url.indexOf("?")+1);
  url = url.replace( /&amp;/g, "&" );
  url = url.split("&");
  var params = { get: function(name,def) { if(typeof(this[name]) == "undefined") return def; else return this[name]; }, };
  for( var i = 0; i < url.length; i++ )
  {
    var param = url[i].split("=");
    params[param[0]] = param[1];
  }
  return params;
}

function mapData() {
  var idx = 1;
  var data = { title: mapData.arguments[idx], 
               bonus_image: arguments[idx+1],
               bonus_text: arguments[idx+2],
               points: arguments[idx+3],
               owner: arguments[idx+4],
               ally: arguments[idx+5],
               reserved_by: arguments[idx+6],
               reserved_till: arguments[idx+7],
               village_groups: arguments[idx+8],
               lastatt: arguments[idx+12] ? texts[lang].locale.date2MS(arguments[idx+12].match(texts[lang].regex.reportDate))/1000 : 0,
         };
  return data;
}

function parseMapData(mapdata) {
  var data;
  var parts;
  var event = "";
  eval( "data = mapData" + mapdata.substring(mapdata.indexOf("(")) );
  return data;
}

function loadServerCfg()
{
  if( params.article == "server_info" )
  {
    var container = document.getElementsByTagName("center")[0];
    if( container )
    {
      var rows = container.getElementsByTagName("tr");
      for( var i = 0; i < rows.length; i++ )
      {
        if( rows[i].cells.length > 1 )
        {
          if( new RegExp(texts[lang].regex.svr_gamespeed).test(rows[i].cells[0].innerHTML) )
            gamespeed = parseFloat(rows[i].cells[1].innerHTML );
          else if( new RegExp(texts[lang].regex.svr_unitspeed).test(rows[i].cells[0].innerHTML) )
            unitspeed = parseFloat(rows[i].cells[1].innerHTML );
          else if( new RegExp(texts[lang].regex.svr_version).test(rows[i].cells[0].innerHTML) )
            serverVersion = parseFloat(rows[i].cells[1].innerHTML.split(" ")[1] );
        }
      }
      storage.setValue("svrcfg", "{ gamespeed: " + gamespeed + ", unitspeed: " + unitspeed + ", version: " + serverVersion + "}");
      container.appendChild(document.createTextNode(texts[lang].gui.svrcfgsaved));
      container.appendChild(document.createElement("br"));
      return storage.getValue("svrcfg");
    }
  }
  else
  {
    cfg = storage.getValue("svrcfg");
    if( cfg )
    {
      eval( "cfg = " + cfg + ";" );
      return cfg;
    }
  }
}

function getTimeDiff() 
{
  var diff = 0; 
  try
  {
    var span = document.getElementById("serverTime");
    var hms = span.firstChild.nodeValue.split(":");
    span = document.getElementById("serverDate");
    var dmy = span.firstChild.nodeValue.split("/");
    var t = parseInt(hms[0], 10) * 3600 + parseInt(hms[1], 10) * 60 + parseInt( hms[2], 10 );
    diff = new Date( parseInt(dmy[2], 10), parseInt(dmy[1], 10) - 1, parseInt(dmy[0], 10), parseInt(hms[0], 10), parseInt(hms[1], 10), parseInt( hms[2], 10 )).getTime() / 1000 - new Date().getTime() / 1000;
  }
  catch(e)
  {
  }
  return diff;
}

function getTime()
{
  return parseInt(new Date().getTime() / 1000 + timeDiff, 10);
}

function loadConfig()
{
  var req = new XMLHttpRequest();

  if (req == null)
    alert("Error creating request object!");
  
  req.open("GET", "/interface.php?func=get_config", true);

  req.onreadystatechange = 
  function()
  {            
    if( req.readyState == 4 )
    {
      var span = document.getElementById("dsfm_svrcfg");
      if(req.status!=200) {
        span.innerHTML = texts[lang].gui.error + req.status;
        span.style.color = "red";
      }
      else
      {    
        var cfgVals = [ "speed", "unit_speed", "game/base_config", "game/tech" ];
        serverCfg = "{";
        var xml = req.responseXML;
        for( var i = 0; i < cfgVals.length; i++ )
        {
          var path = cfgVals[i].split("/");
          var name = "";
          var e = xml;
          for( var j = 0; j < path.length; j++ )
          {
            e = e.getElementsByTagName(path[j]);
            var len = e.length;
            e = e[0];
            if( len > 0 )
            {
              if( j > 0 ) 
                name += "_";
              name += path[j];
            }
            else
              break;
          }
          if( i > 0 )
            serverCfg += ",";
          var val = null;
          if( e )
            serverCfg += name + ":" + e.firstChild.nodeValue;
          else
          {
            serverCfg += cfgVals[i].replace( "/", "_" ) + ":null";
            debug.log( cfgVals[i] + " not found" );
          }
        }
        serverCfg += "};";
        storage.setValue( "svrcfg", serverCfg );
        span.style.color = "green";
        span.innerHTML = texts[lang].gui.ok;
        ajaxLoaded++;
      }
    }
  }
  req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.send(null);
}
function loadUnits()
{
  var req = new XMLHttpRequest();

  if (req == null)
    alert("Error creating request object!");
  
  req.open("GET", "/interface.php?func=get_unit_info", true);

  req.onreadystatechange = 
  function()
  {            
    if( req.readyState == 4 )
    {
      var span = document.getElementById("dsfm_units");
      if(req.status!=200) {
        span.innerHTML = texts[lang].gui.error + req.status;
        span.style.color = "red";
      }
      else
      {    
        var xml = req.responseXML;
        units = "{";
        var e = xml.firstChild;
        var bit = 1;
        for( var i = 0; i < e.childNodes.length; i++ )
        {
          var unitnode = e.childNodes[i];
          if( unitnode.nodeName != "#text" )
          {
            units += unitnode.nodeName + ":{speed:" + unitnode.getElementsByTagName("speed")[0].firstChild.nodeValue;
            var load = parseInt(unitnode.getElementsByTagName("carry")[0].firstChild.nodeValue,10);
            units += ",load:" + load,
            units += ",bit: ";
            if( unitnode.nodeName != "snob" )
            {
              units += bit;
              bit <<= 1;
            }
            else
              units += "0";
            units += "},";
          }
        }        
        units = units.substring(0,units.length-1)+"};"
        storage.setValue( "unitinfo", units );
        span.style.color = "green";
        span.innerHTML = "ok";
        ajaxLoaded++;
      }
    }
  }
  req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
  req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  req.send(null);
}

function getAtts() 
{ 
  storage.setValue("getatts", 1); 
  location.href = createLink("overview_villages", "mode", "commands", "group", 0, "type", "attack", "page", -1, false);
};

function parseAtts()
{
  storage.setValue( "getatts", 0 );
  var tab = document.getElementById("commands_table");
  var atts = storage.getValue("atts","").replace(new RegExp("\\d+,"+ownPid+",\\d+_\\d+;","g"),"");
  var re = new RegExp(texts[lang].regex.villageLink);
  var ts = getTime();
  for( var i = 1; i < tab.rows.length; i++ )
  {
    var res = document.getElementById("labelText["+(i-1)+"]").innerHTML.match( re );
    if( res )
      atts += ts + "," + ownPid + "," + res[1] + "_" + res[2] + ";";
  }
  storage.setValue( "atts", atts );
  var a = document.getElementById("dsfm_getatts");
  if( a )
    a.parentNode.removeChild(a);
  alert( texts[lang].gui.attsparsed );
}

function loadFarmUnitConfig()
{
  var cfg = storage.getValue("farmunitscfg","");
  if( cfg.length == 0 )
  {
    cfg = "{ groups: ";
    var bits = 0;
    for( var key in unitinfo )
      bits |= unitinfo[key].bit;
    cfg += "[{name: \""+texts[lang].gui.all+"\", units: "+ bits +"}], ";
    
    var units = [];
    for( var key in unitinfo )
    {
      if( unitinfo[key].bit > 0 && key != "knight" )
        units.push( { name: key, speed: unitinfo[key].speed } );
    }

    cfg += " minUnits: {";
    var speed = 0;
    for( var i = 0; i < units.length; i++ )
    {
      if( speed != units[i].speed )
      {
        if( speed > 0 )
          cfg = cfg.substring(0, cfg.length-1) + ": 0,";
        speed = units[i].speed;
      }
      cfg += units[i].name + "_";
    }
    cfg = cfg.substring(0, cfg.length-1);
    cfg += ":0}, stayNOrder: {";
    units.sort( function(a,b) { return b.speed-a.speed; } );
    for( i = 0; i < units.length; i++ )
      cfg += units[i].name + ": { stay: 0, maxTime: 0 },";
    cfg = cfg.substring(0, cfg.length-1) + "}}";
  }
  eval( "cfg = "+cfg+";");
  if( cfg.minUnits.spy == 0 )
    cfg.minUnits.spy = 1;
  return cfg;
}

function saveFarmUnitConfig()
{
  var tab = document.getElementById("dsfm_unitgrpconfig");
  var cfg = "{ groups: [";
  for( var i = 1; i < tab.rows.length-1; i++ )
  {
    if( i > 1 )
      cfg += ",";
    cfg += "{name: \"" +  tab.rows[i].cells[1].firstChild.value.replace(/\\/g, "\\\\") .replace(/"/g,"\\\"") + "\",";
    var units = 0;
    for( var c = 2; c < tab.rows[i].cells.length-1; c++ )
    {
      var chk = tab.rows[i].cells[c].firstChild;
      if( chk.checked )
        units |= parseInt(chk.value,10);
    }
    if( unitinfo.spy )
      units |= unitinfo.spy.bit;
    cfg += "units: " + units;
    cfg += "}";
  }
  cfg += "], minUnits: {";
  tab = document.getElementById("dsfm_minunits");
  for( var i = 0; i < tab.rows[1].cells.length; i++ )
  {
    if( i > 0 )
      cfg += ",";
    var input = tab.rows[1].cells[i].firstChild;
    var val = parseInt(input.value,10);
    if( isNaN(val) )
      val = 0;
    cfg += input.name + ":" + val;
  }
  cfg += "}, stayNOrder: {";
  tab = document.getElementById("dsfm_stayNOrder");
  for( var i = 1; i < tab.rows.length; i++ )
  {
    if( i > 1 )
      cfg += ",";
    var input = tab.rows[i].cells[2].firstChild;
    var val = parseInt(input.value,10);
    if( isNaN(val) )
      val = 0;
    cfg += input.name + ": { stay:" + val;
    cfg += ", maxTime: 0}";
  }
  cfg += "}}";
  storage.setValue("farmunitscfg",cfg);
}

function createUnitConfigForm(parent)
{
  var anz = 0;
  for( var key in unitinfo )
    if( unitinfo[key].bit > 0 )
      anz++;
  var tabCfg = parent.appendChild(document.createElement("table"));
  tabCfg.className="vis";
  tabCfg.style.border = "1px solid rgb(222, 211, 185)";
  tabCfg.style.width = "100%";
  var row = tabCfg.insertRow(tabCfg.rows.length);
  var cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = texts[lang].gui.farmUnitsConfig;
  //cell.colSpan=anz+1;
  row = tabCfg.insertRow(tabCfg.rows.length);
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = texts[lang].gui.unitGroups;
  
  row = tabCfg.insertRow(tabCfg.rows.length);
  cell = row.insertCell(0);
  tab = cell.appendChild(document.createElement("table"));
  tab.id="dsfm_unitgrpconfig";
  tab.style.width = "100%";
  row = tab.insertRow(tab.rows.length);
  cell = row.appendChild(document.createElement("th"));

  cell.innerHTML = texts[lang].gui.priority;
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = texts[lang].gui.groupName;
  for( var key in unitinfo )
  {
    if( unitinfo[key].bit > 0 && key != "spy")
    {
      cell = row.appendChild(document.createElement("th"));
      cell.style.textAlign = "center";
      cell.innerHTML = '<img src="graphic/unit/unit_'+key+'.png" alt="'+texts[lang].units[key]+'" title="'+texts[lang].units[key]+'"/>';
    }
  }
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = "X";
  cell.style.fontWeight = "bold";
  cell.style.color = "red";

  row = tab.insertRow(tab.rows.length);
  cell = row.insertCell(0);
  cell.colSpan = anz + 3;
  cell.style.textAlign="center";
  input = cell.appendChild(document.createElement("input"));
  input.type = "button";
  input.value = texts[lang].gui.newGroup;
  input.addEventListener("click", function() { var tab = this.parentNode.parentNode.parentNode; appendGroup(tab,texts[lang].gui.newGroup,0); createPrioLinks(tab,1,1,0); }, false );
  
  var cfg = loadFarmUnitConfig()
  for( var i = 0; i < cfg.groups.length; i++ )
  {
    appendGroup(tab,cfg.groups[i].name,cfg.groups[i].units);
  }
  createPrioLinks(tab,1,1,0);
  
  row = tabCfg.insertRow(tabCfg.rows.length);
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = texts[lang].gui.minUnits;
  
  row = tabCfg.insertRow(tabCfg.rows.length);
  cell = row.insertCell(0);
  tab = cell.appendChild(document.createElement("table"));
  tab.id="dsfm_minunits";
  tab.style.width = "100%";
  var rowTitle = tab.insertRow(tab.rows.length);
  row = tab.insertRow(tab.rows.length);
  var speed = 0;
  for( var key in cfg.minUnits )
  {
    cell = row.insertCell(row.cells.length);
    cell.style.textAlign = "center";
    input = cell.appendChild(document.createElement("input"));
    input.type = "text";
    input.name=key;
    input.size = 6;
    input.value = cfg.minUnits[key];
    cell = rowTitle.appendChild(document.createElement("th"));
    cell.style.textAlign = "center";
    var units = key.split("_");
    for( var i = 0; i < units.length; i++ )
    {
      var img = cell.appendChild(document.createElement("img"));
      img.src = "graphic/unit/unit_"+units[i]+".png";
      img.alt = texts[lang].units[units[i]];
      img.title = texts[lang].units[units[i]];
    }
  }
  
  row = tabCfg.insertRow(tabCfg.rows.length);
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = texts[lang].gui.stayOrderTitle;
  row = tabCfg.insertRow(tabCfg.rows.length);
  cell = row.insertCell(0);
  tab = cell.appendChild(document.createElement("table"));
  tab.id="dsfm_stayNOrder";
  tab.style.width = "100%";
  row = tab.insertRow(tab.rows.length);
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = texts[lang].gui.priority;
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = texts[lang].gui.unit;
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = texts[lang].gui.stayUnits;
 
  var withload = 1;
  for( var key in cfg.stayNOrder)
  {
    var idx = tab.rows.length;
    if( unitinfo[key].bit > 0 && unitinfo[key].load > 0 )
      idx = withload++;
    row = tab.insertRow(idx);
    cell = row.insertCell(row.cells.length);
    cell = row.insertCell(row.cells.length);
    var img = cell.appendChild(document.createElement("img"));
    img.src = "graphic/unit/unit_"+key+".png";
    img.alt = texts[lang].units[key];
    img.title = texts[lang].units[key];
    cell.appendChild(document.createTextNode(texts[lang].units[key]));
    cell = row.insertCell(row.cells.length);
    input = cell.appendChild(document.createElement("input"));
    input.name = key;
    input.type = "text";
    input.size = 4;
    input.value = cfg.stayNOrder[key].stay;
  }
  createPrioLinks(tab,1,tab.rows.length-withload,0);
}

function appendGroup(tab,name,units)
{
  var row = tab.insertRow(tab.rows.length-1);
  var cell = row.insertCell(0);
  cell = row.insertCell(1);
  var input = cell.appendChild(document.createElement("input"));
  input.type = "text";
  input.length = 10;
  input.value = name;
  
  for( var key in unitinfo )
  {
    if( unitinfo[key].bit > 0 && key != "spy")
    {
      cell = row.insertCell(row.cells.length);
      cell.style.textAlign = "center";
      input = cell.appendChild(document.createElement("input"));
      input.type = "checkbox";
      input.checked = (units & unitinfo[key].bit) > 0;
      input.value = unitinfo[key].bit;
    }
  }
  cell = row.insertCell(row.cells.length);
  input = cell.appendChild(document.createElement("a"));
  input.innerHTML = "X";
  input.style.fontWeight = "bold";
  input.style.color = "red";
  input.href = "javascript:;";
  input.title = texts[lang].gui.delGroup;
  input.addEventListener( "click", function() { var tab = this.parentNode.parentNode.parentNode; tab.removeChild(this.parentNode.parentNode); createPrioLinks(tab,1,1,0); }, false );
}

function createPrioLinks(tab,headlines,footlines,col)
{
  var order = 1;
  for( var i = headlines; i < tab.rows.length - footlines; i++ )
  {
    var cell = tab.rows[i].cells[col];
    cell.innerHTML = order + " ";
    if( order > 1 )
    {
      input = cell.appendChild(document.createElement("a"));
      input.href = "javascript:;";
      input.innerHTML = '<img src="graphic/map/map_n.png" border="0" alt="+" title="'+texts[lang].gui.higherPrio+'"/>';
      input.addEventListener("click", function(e) { reorderTable(this.parentNode.parentNode, -1, col); }, false );
    }
    if( order < tab.rows.length-headlines-footlines )
    {
      input = cell.appendChild(document.createElement("a"));
      input.href = "javascript:;";
      input.innerHTML = '<img src="graphic/map/map_s.png" border="0" alt="-" title="'+texts[lang].gui.lowerPrio+'"/>';
      input.addEventListener("click", function(e) { reorderTable(this.parentNode.parentNode, 1, col); }, false );
    }
    order++;
  }
}

function reorderTable(row,dir,prioCol)
{
  var row2 = row;
  do
  {
    row2 = (dir==-1) ? row2.previousSibling : row2.nextSibling;
  } while( row2 && row2.nodeType != 1 );
  for( var i = 0; i < row.cells.length; i++ )
  {
    var first = row.cells[i].firstChild;
    if( i != prioCol && first.nodeName != "A" )
    {
      var inputs = first.nodeName == "INPUT";
      var isCheckbox = false;
      if( inputs )
      {
        isCheckBox = first.type == "checkbox";
        var vals = [];
        if( isCheckBox )
        {
          vals[0] = row.cells[i].firstChild.checked;
          vals[1] = row2.cells[i].firstChild.checked;
        }
        else
        {
          vals[0] = row.cells[i].firstChild.value;
          vals[1] = row2.cells[i].firstChild.value;
        }
      }
      var tmp = row.cells[i].innerHTML;
      row.cells[i].innerHTML = row2.cells[i].innerHTML;
      row2.cells[i].innerHTML = tmp;
      if( inputs )
      {
        if( isCheckBox )
        {
          row.cells[i].firstChild.checked = vals[1];
          row2.cells[i].firstChild.checked = vals[0];
        }
        else
        {
          row.cells[i].firstChild.value = vals[1];
          row2.cells[i].firstChild.value = vals[0];
        }
      }
    }
  }
}
function fireEvent(obj,evt){
  var fireOnThis = obj;
  if( document.createEvent ) 
  {
    var evObj = document.createEvent('MouseEvents');
    evObj.initEvent( evt, true, false );
    fireOnThis.dispatchEvent(evObj);
  } else if( document.createEventObject ) 
  {
    fireOnThis.fireEvent('on' + evt);
  }
}
function getGameData()
{
  var game_data;
  if(gm) 
  {
    game_data = unsafeWindow.game_data;
  }
  else 
  {
    var script = document.createElement("script");
    script.type = "application/javascript";
    script.textContent = 	"var input=document.createElement('input');" + 
                "input.type='hidden';" + 
                "input.value=JSON.stringify(game_data);"  + 
                "input.id='game_data';" + 
                "document.body.appendChild(input);";
    document.body.appendChild(script);
    document.body.removeChild(script);
    
    eval("game_data=" + document.getElementById("game_data").value + ";");
  }
  game_data.link_base = game_data.link_base.replace(/&amp;/g,"&");
  return game_data;
}

// screen, paraName1, paraVal1, paraName2, paraVal2, ... paraNameX, paraValX, escape
function createLink(screen)
{
  var lnk = game_data.link_base.replace("screen=","screen="+screen);
  var len = arguments.length - 1;
  for( var i = 1; i < len; i++ )
  {
    lnk += "&" + arguments[i] + "=";
    i++;
    if( i < len )
      lnk += arguments[i];
  }
  if( arguments[len] == true)
    lnk.replace( /&/g, "&amp;" );
  return lnk;
}
})();