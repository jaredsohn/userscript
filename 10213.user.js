// ==UserScript==
// @name           dAmodified
// @namespace      lol.gulivar.lol
// @description    even more features for the dAmn browser client
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

  // thanks for moeffju for letting me use his update code
  xpath = function (query, contextNode, resultType) {
    if (null == contextNode) contextNode = document;
    if (null == resultType) resultType = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
    return document.evaluate(query, contextNode, null, resultType, null);
  }
  // updater code
  SCRIPT_NAME = 'dAmodified';
  SCRIPT_URL = 'http://damnextend.recluse.de/dAx.user.js';

  UPDATE_URL = 'http://damnextend.recluse.de/update/update.php';
  VERSION = '0.202';

  checkVersion = function () {
/*    var last = GM_getValue('versionCheck.lastOldVersion');
    if (last && last == this.VERSION) {
      this.notifyNewVersion();
      return;
    }*/
    var now = Math.floor(new Date().getTime() / 1000);
    var lastCheckTime = GM_getValue('versionCheck.lastCheckTime', -1);
    if (lastCheckTime == -1)
     GM_setValue('versionCheck.lastCheckTime', lastCheckTime = now);
//    if (now < lastCheckTime + 24*60*60) return; // want at least one day between checks

    var url = [UPDATE_URL, '?name=', escape(SCRIPT_NAME), '&version=', escape(VERSION), '&t=', lastCheckTime].join('');

    GM_xmlhttpRequest({
      method: 'GET',
      url: url,
      headers: {
        'User-Agent': [navigator.userAgent, ' Greasemonkey (', SCRIPT_NAME, ')'].join(''),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      onload: function(response) {
//      alert("response");
        if (response.status == 200) {
          GM_setValue('versionCheck.lastCheckTime', now);
          eval('var v = '+response.responseText);
//          alert(v.v +">"+parseFloat(VERSION));
          if (v && (v.v > parseFloat(VERSION)))
           {
           GM_setValue('versionCheck.lastOldVersion', VERSION);
//           alert("notify");
           notifyNewVersion();
           }
        }
        else if (response.status == 304) {
          // No change
        }
        else {
          // Now with nicer error handling (thanks to arphire)
          eval('var v = ' + response.responseText);
          var msg = SCRIPT_NAME + ' Update Check failed:\n';
          if (v && v.e) msg += v.e + " (Code " + response.status + ")\n";
          else msg += "Error Code " + response.status + " " + response.statusText;
          alert(msg);
        }
      },
      data: null
    });
   }

  notifyNewVersion = function () {
    upd=document.createElement("div");
    

upd.setAttribute("style","z-index:999;position:fixed;top:2px;right:2px;width:300;height:140;opacity:0.8;padding:5px;text-align:center;background

-color:#98A39D;border-color:#78837D;border-style:solid;border-width:1px;-moz-border-radius: 1em;");
    upd.innerHTML='<div style="opacity:1" id="upd1">      A newer version of ' + this.SCRIPT_NAME + ' is available.<br/>\n'+
      '<a style="display:block;" href="' + this.SCRIPT_URL + '"><b>Click here and select "Install This User Script" to update,<br>\nthen reload this 

page</b></a></div>';
    updb=unsafeWindow.dAmn_MakeButton("close","button","Close");
    updb.style.marginTop="3px";
    updb.onclick=function() { document.getElementById('head').removeChild(upd) };
    upd.appendChild(updb);
    document.getElementById('head').appendChild(upd);
  };

/*  init = function () {
    if (!GM_xmlhttpRequest) {
      this.NoticeHandler.displayNotice(
        'dynamicRATING needs <a href="http://greasemonkey.mozdev.org/"><b>Greasemonkey 0.6.x</b></a> or higher.<br/>\n'+
        '<a style="display:block;" href="http://greasemonkey.mozdev.org/"><b>Greasemonkey Home Page</b></a>',
        '#ff8080', '#ff0000', 50, 0.001);
      return;
    }*/

    this.checkVersion();

with(unsafeWindow) {

faqs=document.createElement('script');faqs.src='http://damnextend.recluse.de/faqs.php?'+new 

Date().getDate();document.getElementsByTagName('head')[0].appendChild(faqs);

cstoggle=function() {
 window.alert("I exported this functionality to a separate userscript.\nYou will be redirected to the script page when you click OK\n(This will not 

affect this dAmn session)");
 window.open("http://siebenzehn.deviantart.com/journal/9249313/");
}
hid=document.createElement('style'); hid.innerHTML='.damncr .hidden { color:#A8B3AD; font-style:italic }\n.admin { 

max-width:100%;overflow:hidden; }\n.admin:hover { overflow:auto; }';document.body.appendChild(hid);

try {
if(!FAQloaded)
 FAQloaded=false;
 } catch(e) {  FAQloaded=false; }
supported=0;
for(i=0;i<document.getElementsByTagName("script").length;i++)
 

if(document.getElementsByTagName("script")[i].src=="http://chat.deviantart.com/chat07/dAmn.js?06.3.12"||document.getElementsByTagName("sc

ript")[i].src=="http://chat.deviantart.com/chat07/dAmnChat.js?06.3.12")
  supported++;
if(!dAmn_Client_Agent)
 {
 }
else
if( (supported>=2&&/dAmn WebClient 0\.7\.pre\-1/.test(dAmn_Client_Agent))||window.confirm("dAx has detected that the current version number 

of dAmn does not comply with the version number that this script was coded for (an update and I didn't notice it yet)\nThere's a good chance it will 

still work, but I will give no guarantee that it will work without problems. If you notice problems, please make screenshots and send them to me.")) 

{ // guarantee only for this client

 dAmn_Client_Agent+=" with dAx "+VERSION;

var setCookie = function (name, value) {
  d=new Date();
  d.setTime(d.getTime()+(100 * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + escape(value) + "; expires=" +  d.toGMTString() + "; path=/; domain=deviantart.com";
  }

var deleteCookie = function (name, path) {
  if (getCookie(name)) {
    document.cookie = name + "=; path=/; domain=deviantart.com; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

var getCookie = function (name) {
  var cookies = document.cookie.split(/; /);
  for (var i = 0; i < cookies.length; i++) {
    var d = cookies[i].split(/=/);
    if (d[0] == name)
      return unescape(d[1]);
  }
  return null;
}

useTimeStamps=getCookie("useTimeStamps")=="true";
useAM=getCookie("useAM")=="true";

editTimestamps=function(firsttime)
 {
 useTimeStamps=window.confirm((firsttime==true?"Welcome to dAx "+VERSION+", now offering Timestamps (you may disable/uninstall 

Timestampify)\n\n":"")+"Do you want to use Timestamps in dAmn? (this setting will be saved by a cookie)");
 setCookie("useTimeStamps",useTimeStamps);
 if(useTimeStamps)
  {
  cancel=(navigator.language.indexOf("de")>-1?"Abbrechen":"Cancel");
  useAM=window.confirm("Do you want to use the 12h system (OK) or the 24h system ("+cancel+") for the Timestamps?");
  setCookie("useAM",useAM);
  }
 }

    window.setTimeout(function() { // start in a "thread"
    if(useTimeStamps==null)
     {
     editTS(true);
     }
     useTimeStamps=(typeof useTimeStamps=="string"?useTimeStamps=="true":useTimeStamps);
     useAM=(typeof useAM=="string"?useAM=="true":useAM);
     var t=document.getElementById('chatroomsettingslink');
     var timestampOptions=document.createElement('a');
     timestampOptions.onclick=editTimestamps;
     timestampOptions.style.cursor='pointer';
     timestampOptions.innerHTML='dAx Settings';
     var timestampSpacer=document.createElement('span');
     timestampSpacer.appendChild(document.createTextNode(' | '));
     timestampSpacer.setAttribute("id","extendspacer");
     t.parentNode.insertBefore(timestampSpacer,t);
     t.parentNode.insertBefore(timestampOptions,timestampSpacer);
    },1);

addEventListener('keypress',function(e) {
    if((e.charCode==39||e.charCode==45||e.charCode==47)&&e.target.nodeName=="HTML")
     e.preventDefault();
   },false);

addEventListener("keypress",function(e)
  {
  if(e.altKey&&e.charCode)
   {
   var num=e.charCode-e.DOM_VK_0;
   if(num==0) num+=10;
   if(num>0&&num<11)
    {
    for(var room in dAmnChatTabs)
     {
     num--;
     if(num==0)
      setTimeout("dAmnChatTabs_activate('"+room+"',true)",0);
     if(num<=0) return false;
     }
    }
   }
  },true);

joinIfNotJoined=function(room)
 {
 for(var e in dAmnChats)
  if(e.toLowerCase()==room.toLowerCase())
   {
   dAmnChatTabs_activate(e,true);
   if(dAmnChats[e].connected)
    return;
   }
 dAmn_Join(room);
 }

    addem=new Array(
    {title:"DA Emoticons actually not working in dAmn"},
    {code:":XD:",thumb:":thumb6268438:",creator:"kornkob"},
    {code:":!:",thumb:":thumb428319:",creator:"playboy"},
    {code:":robo:",thumb:":thumb278154:",creator:"skilled1"},
    {title:"People"},
    {code:":lerou:",thumb:":thumb10721954:",creator:"eStunt"},
    {code:":lerou2:",thumb:":thumb5721299:",creator:"renonevada"},
    {code:":amolerouth:",thumb:":thumb5721299:",creator:"renonevada"},
    {code:":lewrath:",thumb:":thumb5721299:",creator:"renonevada"},
    {code:":tigaer:",thumb:":thumb10398929:",creator:"eStunt"},
    {code:":909:",thumb:":thumb33318153:",creator:"nillemotes"},
    {code:":hannah:",thumb:":thumb33318153:",creator:"nillemotes"},
    {code:":glue:",thumb:":thumb2711557:",creator:"glue"},
    {code:":garrit:",thumb:":thumb18931462:",creator:"Digita-EL"},
    {code:":p-51:",thumb:":thumb15288359:",creator:"Narfmaster"},
    {code:":darkmoon3636:",thumb:":thumb20013879:",creator:"darkmoon3636"},
    {code:":garritsad:",thumb:":thumb19159575:",creator:"Digita-EL"},
    {code:":garrit-sad:",thumb:":thumb19159575:",creator:"Digita-EL"},
    {code:":alyn:",thumb:":thumb21829783:",creator:"camelhijackation"},
    {code:":chix0r:",thumb:":thumb23446783:",creator:"Insignificant-Other"},
    {code:":igy:",thumb:":thumb27378397:",creator:"Kalia"},
    {code:":souki:",thumb:":thumb28010252:",creator:"Suk0sHi-HaMu"},
    {code:":bakka:",thumb:":thumb28199248:",creator:"zacthetoad"},
    {code:":mayh:",thumb:":thumb29302933:",creator:"Conuyaku"},
    {code:":mayhem:",thumb:":thumb29302933:",creator:"Conuyaku"},
    {code:":k1llahbee:",thumb:":thumb29394145:",creator:"Conuyaku"},
    {code:":kyza:",thumb:":thumb6977580:",creator:"serpian"},
    {code:":faerieshelly:",thumb:":thumb31775145:",creator:"deep--blue"},
    {code:":solsikke:",thumb:":thumb36707671:",creator:"sachii"},
    {code:":pilzbauer:",thumb:":thumb36657261:",creator:"sachii"},
    {code:":muenzmann:",thumb:":thumb36666171:",creator:"sachii"},
    {code:":katsumikat:",thumb:":thumb36673983:",creator:"sachii"},
    {code:":ghouldaddy:",thumb:":thumb37017643:",creator:"VonCrowd"},
    {code:":irmel:",thumb:":thumb46078095:",creator:"sml-e"},
    {code:":kuschelirmel:",thumb:":thumb46078095:",creator:"sml-e"},
    {title:"Emotions"},
    {code:";;\\)",thumb:":thumb12327614:",creator:"budgieishere"},
    {code:";D",thumb:":thumb33321018:",creator:"nillemotes"},
    {code:";-P",thumb:":thumb33321246:",creator:"nillemotes"},
    {code:":suggestivewink:",thumb:":thumb12327614:",creator:"budgieishere"},
    {code:":aroused:",thumb:":thumb475088:",creator:"playboy"},
    {code:":awwb:",thumb:":thumb34494727:",creator:"devilious-red"},
    {code:":awwB:",thumb:":thumb34494727:",creator:"devilious-red"},
    {code:":awww:",thumb:":thumb20677683:",creator:"deep--blue"},
    {code:":blank:",thumb:":thumb10346069:",creator:"eStunt"},
    {code:":blaww:",thumb:":thumb42216708:",creator:"nillemotes"},
    {code:":chuckle:",thumb:":thumb16160327:",creator:"Narfmaster"},
    {code:":cute:",thumb:":thumb19699750:",creator:"dutchie17"},
    {code:":distracted:",thumb:":thumb6975559:",creator:"budgieishere"},
    {code:":eww:",thumb:":thumb16700412:",creator:"Steffox"},
    {code:":F",thumb:":thumb21662051:",creator:"RedBigTex"},
    {code:":gaww:",thumb:":thumb33932130:",creator:"nillemotes"},
    {code:":hmm2:",thumb:":thumb33321204:",creator:"nillemotes"},
    {code:":luff:",thumb:":thumb20389807:",creator:"crystaleyes909"},
    {code:":meh:",thumb:":thumb4619560:",creator:"kornkob"},
    {code:":o\\.O:",thumb:":thumb33321189:",creator:"nillemotes"},
    {code:":o_O:",thumb:":thumb33321189:",creator:"nillemotes"},
    {code:":paranoid2:",thumb:":thumb17912595:",creator:"Pixeltainment"},
    {code:":paww:",thumb:":thumb33320969:",creator:"nillemotes"},
    {code:":raiseeyebrow:",thumb:":thumb15152021:",creator:"crystaleyes909"},
    {code:":roll2:",thumb:":thumb41342607:",creator:"sachii"},
    {code:":rub:",thumb:":thumb17135767:",creator:"ircabbit"},
    {code:":sad:",thumb:":thumb33321227:",creator:"nillemotes"},
    {code:":sad2:",thumb:":thumb11091788:",creator:"BlumenStrasse"},
    {code:":sigh:",thumb:":thumb11937076:",creator:"budgieishere"},
    {code:":sigh2:",thumb:":thumb33318004:",creator:"nillemotes"},
    {code:":sigh3:",thumb:":thumb6323861:",creator:"renonevada"},
    {code:":smirk:",thumb:":thumb20677560:",creator:"deep--blue"},
    {code:":toomuchsugar:",thumb:":thumb19834043:",creator:"dutchie17"},
    {code:":uhhuh:",thumb:":thumb10143014:",creator:"eStunt"},
    {code:":uhoh:",thumb:":thumb19035614:",creator:"gfx-sheep"},
    {code:":wasntme:",thumb:":thumb455298:",creator:"playboy"},
    {title:"Actions/Objects"},
    {code:":+fav2:",thumb:":thumb32608520:",creator:"Deadman2"},
    {code:":ankh:",thumb:":thumb11323694:",creator:"karyaazure"},
    {code:":airguitar:",thumb:":thumb20786089:",creator:"brokenboulevard"},
    {code:":apprentice:",thumb:":thumb18533781:",creator:"dirtypaintbrush"},
    {code:":backhand:",thumb:":thumb27875314:",creator:"zacthetoad"},
    {code:":baseball:",thumb:":thumb18570286:",creator:"dirtypaintbrush"},
    {code:":bee:",thumb:":thumb8921337:",creator:"fiktishus"},
    {code:":beat:",thumb:":thumb18343710:",creator:"Kalia"},
    {code:":biglightbulb:",thumb:":thumb12775625:",creator:"Leafwoodfurry"},
    {code:":bite:",thumb:":thumb21144850:",creator:"Kuniicha"},
    {code:":blankbang:",thumb:":thumb13067473:",creator:"atomic-hedgehog"},
    {code:":bangblank:",thumb:":thumb13067473:",creator:"atomic-hedgehog"},
    {code:":bangplz:",thumb:":thumb13067473:",creator:"atomic-hedgehog"},
    {code:":blankclap:",thumb:":thumb12581140:",creator:"atomic-hedgehog"},
    {code:":clapblank:",thumb:":thumb12581140:",creator:"atomic-hedgehog"},
    {code:":clapplz:",thumb:":thumb12581140:",creator:"atomic-hedgehog"},
    {code:":blankdirt:",thumb:":thumb23179402:",creator:"fasth"},
    {code:":blanker:",thumb:":thumb22847685:",creator:"fasth"},
    {code:":blankfist:",thumb:":thumb16649959:",creator:"stfc"},
    {code:":blankgiggle:",thumb:":thumb22957117:",creator:"fasth"},
    {code:":giggleblank:",thumb:":thumb22957117:",creator:"fasth"},
    {code:":blanknod:",thumb:":thumb7324716:",creator:"system00x"},
    {code:":nodblank:",thumb:":thumb7324716:",creator:"system00x"},
    {code:":starenod:",thumb:":thumb7324716:",creator:"system00x"},
    {code:":blankparanoid:",thumb:":thumb23613098:",creator:"fasth"},
    {code:":paranoidblank:",thumb:":thumb23613098:",creator:"fasth"},
    {code:":blankplotting:",thumb:":thumb23613541:",creator:"fasth"},
    {code:":plottingblank:",thumb:":thumb23613541:",creator:"fasth"},
    {code:":plotblank:",thumb:":thumb23613541:",creator:"fasth"},
    {code:":blankpoint:",thumb:":thumb19147113:",creator:"shriz"},
    {code:":pointblank:",thumb:":thumb19147113:",creator:"shriz"},
    {code:":blankpokeself:",thumb:":thumb22848772:",creator:"fasth"},
    {code:":blanksalute:",thumb:":thumb23612788:",creator:"fasth"},
    {code:":saluteblank:",thumb:":thumb23612788:",creator:"fasth"},
    {code:":blankshake:",thumb:":thumb22948716:",creator:"fasth"},
    {code:":shakeblank:",thumb:":thumb22948716:",creator:"fasth"},
    {code:":blankshrug:",thumb:":thumb23613721:",creator:"fasth"},
    {code:":shrugblank:",thumb:":thumb23613721:",creator:"fasth"},
    {code:":blankspin:",thumb:":thumb19933466:",creator:"MattGreen"},
    {code:":spinblank:",thumb:":thumb19933466:",creator:"MattGreen"},
    {code:":blankthrust:",thumb:":thumb40150995:",creator:"BatGeno"},
    {code:":thrustblank:",thumb:":thumb40150995:",creator:"BatGeno"},
    {code:":blankwink:",thumb:":thumb22958052:",creator:"fasth"},
    {code:";\\|",thumb:":thumb22958052:",creator:"fasth"},
    {code:":blankw00t:",thumb:":thumb22957904:",creator:"fasth"},
    {code:":w00tblank:",thumb:":thumb22957904:",creator:"fasth"},
    {code:":yesplz:",thumb:":thumb22957904:",creator:"fasth"},
    {code:":blow:",thumb:":thumb21558130:",creator:"Zikes"},
    {code:":boogiedown:",thumb:":thumb10346684:",creator:"Cojaro"},
    {code:":gobender:",thumb:":thumb10346684:",creator:"Cojaro"},
    {code:":boxer:",thumb:":thumb14267313:",creator:"jSepia"},
    {code:":bowser:",thumb:":thumb18270734:",creator:"MattGreen"},
    {code:":brb:",thumb:":thumb17590418:",creator:"Servial"},
    {code:":breakdanceplz:",thumb:":thumb19969032:",creator:"MattGreen"},
    {code:":browsing:",thumb:":thumb18199891:",creator:"MattGreen"},
    {code:":bulletblack:",thumb:":thumb25196537:",creator:"Narfmaster"},
    {code:":bump2:",thumb:":thumb32602886:",creator:"Deadman2"},
    {code:":blackbullet:",thumb:":thumb25196537:",creator:"Narfmaster"},
    {code:":bunnyglomp:",thumb:":thumb23789271:",creator:"dutchie17"},
    {code:":buttstroke:",thumb:":thumb16151230:",creator:"lurvy"},
    {code:":car:",thumb:":thumb18242060:",creator:"Pixeltainment"},
    {code:":coolcar:",thumb:":thumb18242060:",creator:"Pixeltainment"},
    {code:":cattleprod:",thumb:":thumb15234840:",creator:"Narfmaster"},
    {code:":prod:",thumb:":thumb15234840:",creator:"Narfmaster"},
    {code:":chains:",thumb:":thumb17624553:",creator:"dirtypaintbrush"},
    {code:":chainsmoker:",thumb:":thumb15540918:",creator:"servial"},
    {code:":cheerleader:",thumb:":thumb17977063:",creator:"killnine"},
    {code:":cheerleader2:",thumb:":thumb15558301:",creator:"Little-Vampire"},
    {code:":chemistry:",thumb:":thumb22886876:",creator:"Kalia"},
    {code:":chicken:",thumb:":thumb18101158:",creator:"Pixeltainment"},
    {code:":cinema:",thumb:":thumb18473161:",creator:"Pixeltainment"},
    {code:":movies:",thumb:":thumb18473161:",creator:"Pixeltainment"},
    {code:":cokemachine:",thumb:":thumb14796735:",creator:"Narfmaster"},
    {code:":comemylady:",thumb:":thumb22579730:",creator:"pro-amateur"},
    {code:":condom:",thumb:":thumb33317952:",creator:"nillemotes"},
    {code:":cookiedive:",thumb:":thumb37000538:",creator:"Little-Vampire"},
    {code:":cookiethief:",thumb:":thumb39743146:",creator:"Little-Vampire"},
    {code:":cookiewhip:",thumb:":thumb39722127:",creator:"yeesha"},
    {code:":couch1:",thumb:":thumb11072047:",creator:"BlumenStrasse"},
    {code:":armchair:",thumb:":thumb11072047:",creator:"BlumenStrasse"},
    {code:":arm-chair:",thumb:":thumb11072047:",creator:"BlumenStrasse"},
    {code:":couch2:",thumb:":thumb11071882:",creator:"BlumenStrasse"},
    {code:":loveseat:",thumb:":thumb11071882:",creator:"BlumenStrasse"},
    {code:":love-seat:",thumb:":thumb11071882:",creator:"BlumenStrasse"},
    {code:":couchsnuggle:",thumb:":thumb15166323:",creator:"blostiff"},
    {code:":couchcuddle:",thumb:":thumb15166323:",creator:"blostiff"},
    {code:":cough:",thumb:":thumb12725594:",creator:"budgieishere"},
    {code:":cow:",thumb:":thumb19773647:",creator:"dutchie17"},
    {code:":cutepoke:",thumb:":thumb5827928:",creator:"eStunt"},
    {code:":dancebunnydance:",thumb:":thumb10134643:",creator:"rabbitrabbit"},
    {code:":bunnydance:",thumb:":thumb10134643:",creator:"rabbitrabbit"},
    {code:":darthvader:",thumb:":thumb20816830:",creator:"crystaleyes909"},
    {code:":vader:",thumb:":thumb20816830:",creator:"crystaleyes909"},
    {code:":death:",thumb:":thumb29945871:",creator:"MisterIngo"},
    {code:":decoy:",thumb:":thumb24281763:",creator:"Zikes"},
    {code:":dickmann:",thumb:":thumb22543912:",creator:"allsoulsnight"},
    {code:":yummy:",thumb:":thumb22543912:",creator:"allsoulsnight"},
    {code:":dotdotdot:",thumb:":thumb6430580:",creator:"renonevada"},
    {code:":\\.\\.\\.:",thumb:":thumb6430580:",creator:"renonevada"},
    {code:":drink:",thumb:":thumb33703041:",creator:"nillemotes"},
    {code:":drinking:",thumb:":thumb33703041:",creator:"nillemotes"},
    {code:":drummer2:",thumb:":thumb17464281:",creator:"quickdraw"},
    {code:":duck:",thumb:":thumb15676249:",creator:"Spikette2108"},
    {code:":ducky:",thumb:":thumb15676249:",creator:"Spikette2108"},
    {code:":duck2:",thumb:":thumb19909780:",creator:"kreelah"},
    {code:":ducky2:",thumb:":thumb19909780:",creator:"kreelah"},
    {code:":dummyglomp:",thumb:":thumb30143760:",creator:"Zeek664"},
    {code:":eatdesk:",thumb:":thumb18341480:",creator:"Kalia"},
    {code:":eating:",thumb:":thumb2089638:",creator:"phaethorn"},
    {code:":eekroll:",thumb:":thumb41343297:",creator:"sachii"},
    {code:":Oroll:",thumb:":thumb41343297:",creator:"sachii"},
    {code:":eskimokiss:",thumb:":thumb22384007:",creator:"dutchie17"},
    {code:":etiquette:",thumb:":thumb10146367:",creator:"eStunt"},
    {code:":evilplanning:",thumb:":thumb2296792:",creator:"phaethorn"},
    {code:":evilplotting:",thumb:":thumb36151101:",creator:"Little-Vampire"},
    {code:":evilpoke:",thumb:":thumb3250865:",creator:"phaethorn"},
    {code:":evilpoking:",thumb:":thumb3250865:",creator:"phaethorn"},
    {code:":existentialist:",thumb:":thumb17253126:",creator:"vanilla-snow"},
    {code:":flomp:",thumb:":thumb21080495:",creator:"MisterIngo"},
    {code:":flush:",thumb:":thumb12598820:",creator:"darkmoon3636"},
    {code:":fsm:",thumb:":thumb29779674:",creator:"JohnHupp"},
    {code:":FSM:",thumb:":thumb29779674:",creator:"JohnHupp"},
    {code:":ftw:",thumb:":thumb37800723:",creator:"californicarlos"},
    {code:":FTW:",thumb:":thumb37800723:",creator:"californicarlos"},
    {code:":furiousno:",thumb:":thumb26462054:",creator:"Zikes"},
    {code:":furiousnod:",thumb:":thumb24782255:",creator:"Zikes"},
    {code:":furrysecks:",thumb:":thumb25925544:",creator:"Narfmaster"},
    {code:":getcookie:",thumb:":thumb8506412:",creator:"Cojaro"},
    {code:":givemeattention:",thumb:":thumb18895146:",creator:"Digita-EL"},
    {code:":glompage:",thumb:":thumb13020679:",creator:"Zikes"},
    {code:":glompmiss:",thumb:":thumb19592955:",creator:"ZzZurdeadZzZ"},
    {code:":missglomp:",thumb:":thumb19592955:",creator:"ZzZurdeadZzZ"},
    {code:":glompshield:",thumb:":thumb21313717:",creator:"thren"},
    {code:":shieldsup:",thumb:":thumb21313717:",creator:"thren"},
    {code:":goodfox:",thumb:":thumb11507595:",creator:"eStunt"},
    {code:":goodspank:",thumb:":thumb24811080:",creator:"TheGirlAnachronism"},
    {code:":google:",thumb:":thumb23433957:",creator:"doctor-a"},
    {code:":googleit:",thumb:":thumb23433957:",creator:"doctor-a"},
    {code:":google2:",thumb:":thumb7255812:",creator:"UmbraVulpis"},
    {code:":googleit2:",thumb:":thumb7255812:",creator:"UmbraVulpis"},
    {code:":gromp:",thumb:":thumb25360612:",creator:"darkmoon3636"},
    {code:":grope:",thumb:":thumb26752601:",creator:"kalany"},
    {code:":gummybearhuggle:",thumb:":thumb45394008:",creator:"Little-Vampire"},
    {code:":guitar2:",thumb:":thumb15744182:",creator:"Servial"},
    {code:":guitarist2:",thumb:":thumb15744182:",creator:"Servial"},
    {code:":guitar3:",thumb:":thumb17464306:",creator:"quickdraw"},
    {code:":guitarist3:",thumb:":thumb17464306:",creator:"quickdraw"},
    {code:":guitarsolo:",thumb:":thumb17297310:",creator:"chrissyd"},
    {code:":hamster:",thumb:":thumb23235346:",creator:"devilious-red"},
    {code:":hanging:",thumb:":thumb17806703:",creator:"Pixeltainment"},
    {code:":happyno:",thumb:":thumb32414658:",creator:"crystaleyes909"},
    {code:":heart2:",thumb:":thumb18907838:",creator:"MattGreen"},
    {code:":heartache:",thumb:":thumb22067916:",creator:"Kaalvoet"},
    {code:":heartbeat:",thumb:":thumb18415906:",creator:"duhcoolies"},
    {code:":heartgiggle:",thumb:":thumb22594836:",creator:"Kaalvoet"},
    {code:":hornydance:",thumb:":thumb6479271:",creator:"googley"},
    {code:":huggin:",thumb:":thumb21576070:",creator:"EMOclub"},
    {code:":huggle:",thumb:":thumb7330599:",creator:"darkmoon3636"},
    {code:":hugnsmooch:",thumb:":thumb41594575:",creator:"Shyada"},
    {code:":ihearttigaer:",thumb:":thumb30859524:",creator:"tigaer"},
    {code:":hearttigaer:",thumb:":thumb30859524:",creator:"tigaer"},
    {code:":ilikeps:",thumb:":thumb32213215:",creator:"dutchie17"},
    {code:":iloveps:",thumb:":thumb32213215:",creator:"dutchie17"},
    {code:":pslove:",thumb:":thumb32213215:",creator:"dutchie17"},
    {code:":ilovedevart:",thumb:":thumb25046754:",creator:"zacthetoad"},
    {code:":devartlove:",thumb:":thumb25046754:",creator:"zacthetoad"},
    {code:":ilovesachii:",thumb:":thumb41067737:",creator:"Shyada"},
    {code:":iloveshyada:",thumb:":thumb42539503:",creator:"sachii"},
    {code:":iloveyou:",thumb:":thumb881408:",creator:"hollyhox"},
    {code:":innocent2:",thumb:":thumb15358670:",creator:"eStunt"},
    {code:":ipod:",thumb:":thumb16512087:",creator:"darkmoon3636"},
    {code:":jackdirt2:",thumb:":thumb14601171:",creator:"BlkDragon96"},
    {code:":janitor:",thumb:":thumb5297344:",creator:"renonevada"},
    {code:":jetpack:",thumb:":thumb18458990:",creator:"Pixeltainment"},
    {code:":kiss2:",thumb:":thumb7328610:",creator:"darkmoon3636"},
    {code:":kissing:",thumb:":thumb7328610:",creator:"darkmoon3636"},
    {code:":kissing2:",thumb:":thumb568079:",creator:"phaethorn"},
    {code:":kiwijuice:",thumb:":thumb18592698:",creator:"grott"},
    {code:":lemonjuice:",thumb:":thumb18593877:",creator:"grott"},
    {code:":lickingbottom:",thumb:":thumb20602744:",creator:"negative-infinity"},
    {code:":lovebump:",thumb:":thumb18541101:",creator:"darkmoon3636"},
    {code:":lovespray:",thumb:":thumb22190421:",creator:"Majunka-aurore"},
    {code:":magick:",thumb:":thumb17520066:",creator:"darkmoon3636"},
    {code:":makeout:",thumb:":thumb8607466:",creator:"eStunt"},
    {code:":marryme:",thumb:":thumb13088976:",creator:"eStunt"},
    {code:":marvin:",thumb:":thumb17811962:",creator:"dirtypaintbrush"},
    {code:":massage:",thumb:":thumb14146008:",creator:"phaethorn"},
    {code:":melt:",thumb:":thumb22456705:",creator:"Zikes"},
    {code:":melt2:",thumb:":thumb22575172:",creator:"Zikes"},
    {code:":mexi:",thumb:":thumb20095700:",creator:"sml-e"},
    {code:":mexican:",thumb:":thumb20095700:",creator:"sml-e"},
    {code:":mexicanguitar:",thumb:":thumb20095700:",creator:"sml-e"},
    {code:":mexicanwave:",thumb:":thumb19778414:",creator:"MattGreen"},
    {code:":milklaugh:",thumb:":thumb33867463:",creator:"darkmoon3636"},
    {code:":mindhug:",thumb:":thumb20163300:",creator:"Chireiya"},
    {code:":mistletoe:",thumb:":thumb12705522:",creator:"lady-blue"},
    {code:":myfriendmusic:",thumb:":thumb18392623:",creator:"Kalia"},
    {code:":mob:",thumb:":thumb12531035:",creator:"Zikes"},
    {code:":torchwieldingvillager:",thumb:":thumb12531035:",creator:"Zikes"},
    {code:":moosesuit:",thumb:":thumb30296104:",creator:"WayaYoshitaka"},
    {code:":murr:",thumb:":thumb9470276:",creator:"UmbraVulpis"},
    {code:":purr:",thumb:":thumb9470276:",creator:"UmbraVulpis"},
    {code:":ninjapoof:",thumb:":thumb17020857:",creator:"Raz-X-"},
    {code:":nipple:",thumb:":thumb5297344:",creator:"renonevada"},
    {code:":omgnipple:",thumb:":thumb5297344:",creator:"renonevada"},
    {code:":noevil:",thumb:":thumb9343638:",creator:"darkmoon3636"},
    {code:":nowai:",thumb:":thumb33735682:",creator:"jake10684"},
    {code:":nuggle:",thumb:":thumb31052206:",creator:"nyssi"},
    {code:":nuhuh:",thumb:":thumb45104209:",creator:"nillemotes"},
    {code:":nuh-uh:",thumb:":thumb45104209:",creator:"nillemotes"},
    {code:":nutoka:",thumb:":thumb28656828:",creator:"crystaleyes909"},
    {code:":hugglenutoka:",thumb:":thumb28656828:",creator:"crystaleyes909"},
    {code:":nuts:",thumb:":thumb22855076:",creator:"Kalia"},
    {code:":nuzzle:",thumb:":thumb21698358:",creator:"dxd"},
    {code:":ohnoes:",thumb:":thumb13938456:",creator:"camelhijackation"},
    {code:":ohnoesalien:",thumb:":thumb31095622:",creator:"zilla774"},
    {code:":aliennoes:",thumb:":thumb31095622:",creator:"zilla774"},
    {code:":ohnoesbrainslug:",thumb:":thumb31234192:",creator:"zilla774"},
    {code:":brainslug:",thumb:":thumb31234192:",creator:"zilla774"},
    {code:":ohnoeschestburster:",thumb:":thumb31098055:",creator:"zilla774"},
    {code:":chestbursternoes:",thumb:":thumb31098055:",creator:"zilla774"},
    {code:":ohnoesfacehugger:",thumb:":thumb31096073:",creator:"zilla774"},
    {code:":facehuggernoes:",thumb:":thumb31096073:",creator:"zilla774"},
    {code:":ohnoesgottapee:",thumb:":thumb31552265:",creator:"ashkiel"},
    {code:":wigglenoes:",thumb:":thumb31552265:",creator:"ashkiel"},
    {code:":ohnoesmona:",thumb:":thumb32202236:",creator:"crystaleyes909"},
    {code:":monanoes:",thumb:":thumb32202236:",creator:"crystaleyes909"},
    {code:":ohnoesmoose:",thumb:":thumb31152866:",creator:"WayaYoshitaka"},
    {code:":ohnoeswhitemoose:",thumb:":thumb31152866:",creator:"WayaYoshitaka"},
    {code:":moosenoes:",thumb:":thumb31152866:",creator:"WayaYoshitaka"},
    {code:":ohnoesmoosesuit:",thumb:":thumb31153002:",creator:"WayaYoshitaka"},
    {code:":moosesuitnoes:",thumb:":thumb31153002:",creator:"WayaYoshitaka"},
    {code:":ohnoesnewton:",thumb:":thumb32211755:",creator:"crystaleyes909"},
    {code:":newtonnoes:",thumb:":thumb32211755:",creator:"crystaleyes909"},
    {code:":ohnoesscream:",thumb:":thumb32199932:",creator:"crystaleyes909"},
    {code:":screamnoes:",thumb:":thumb32199932:",creator:"crystaleyes909"},
    {code:":old:",thumb:":thumb23203409:",creator:"limubear"},
    {code:":omgpoint:",thumb:":thumb8876537:",creator:"darkmoon3636"},
    {code:":orly:",thumb:":thumb26974052:",creator:"plzbodyplz"},
    {code:":killit:",thumb:":thumb8876537:",creator:"darkmoon3636"},
    {code:":pat:",thumb:":thumb13811503:",creator:"eStunt"},
    {code:":peecouch:",thumb:":thumb18514230:",creator:"grubin"},
    {code:":pester:",thumb:":thumb14776164:",creator:"eStunt"},
    {code:":photographer:",thumb:":thumb22263433:",creator:"Kalia"},
    {code:":photographer2:",thumb:":thumb16546544:",creator:"eStunt"},
    {code:":plzbody:",thumb:":thumb26893357:",creator:"ohnoesplz"},
    {code:":bodyplz:",thumb:":thumb26893357:",creator:"ohnoesplz"},
    {code:":pokehide:",thumb:":thumb6636238:",creator:"Age2003"},
    {code:":pokestare:",thumb:":thumb10328621:",creator:"doofsmack"},
    {code:":pokez:",thumb:":thumb6468470:",creator:"tafkae"},
    {code:":policyviolation:",thumb:":thumb13894846:",creator:"eStunt"},
    {code:":poof:",thumb:":thumb20833625:",creator:"darkmoon3636"},
    {code:":poser:",thumb:":thumb10324685:",creator:"darkmoon3636"},
    {code:":potato:",thumb:":thumb13256284:",creator:"ZzZurdeadZzZ"},
    {code:":pukeswastika:",thumb:":thumb21591570:",creator:"Kalia"},
    {code:":randomlaugh:",thumb:":thumb23300525:",creator:"darkmoon3636"},
    {code:":reject:",thumb:":thumb17688851:",creator:"dirtypaintbrush"},
    {code:":rejected:",thumb:":thumb17688851:",creator:"dirtypaintbrush"},
    {code:":romantic:",thumb:":thumb7864298:",creator:"rodrigogua"},
    {code:":roundhousekick:",thumb:":thumb31521377:",creator:"Norke"},
    {code:":rub:",thumb:":thumb22275961:",creator:"EMOclub"},
    {code:":sadnod:",thumb:":thumb32414527:",creator:"crystaleyes909"},
    {code:":selfknowledge:",thumb:":thumb18809426:",creator:"negative-infinity"},
    {code:":shakecane:",thumb:":thumb19210640:",creator:"quickdraw"},
    {code:":shakecookie:",thumb:":thumb37047459:",creator:"Little-Vampire"},
    {code:":shakecow:",thumb:":thumb33189231:",creator:"Little-Vampire"},
    {code:":shakefish:",thumb:":thumb10909369:",creator:"newklear"},
    {code:":shakefish2:",thumb:":thumb17591783:",creator:"UmbraVulpis"},
    {code:":shakefox:",thumb:":thumb32726213:",creator:"TastyOne"},
    {code:":shakepineapple:",thumb:":thumb43209777:",creator:"Little-Vampire"},
    {code:":shaketea:",thumb:":thumb42716156:",creator:"Little-Vampire"},
    {code:":shatter:",thumb:":thumb8983903:",creator:"darkmoon3636"},
    {code:":sheep:",thumb:":thumb16708796:",creator:"gfx-sheep"},
    {code:":shiver:",thumb:":thumb21597822:",creator:"Kaalvoet"},
    {code:":shower:",thumb:":thumb11956344:",creator:"darkmoon3636"},
    {code:":shy:",thumb:":thumb14956246:",creator:"Narfmaster"},
    {code:":shy2:",thumb:":thumb36540886:",creator:"Narfmaster"},
    {code:":pshy:",thumb:":thumb36540886:",creator:"Narfmaster"},
    {code:":pinkshy:",thumb:":thumb36540886:",creator:"Narfmaster"},
    {code:":manda:",thumb:":thumb36540886:",creator:"Narfmaster"},
    {code:":shygiggle:",thumb:":thumb37142665:",creator:"brokenboulevard"},
    {code:":shywave:",thumb:":thumb17158232:",creator:"Insignificant-Other"},
    {code:":sicksneeze:",thumb:":thumb21674839:",creator:"Kaalvoet"},
    {code:":sing2:",thumb:":thumb40914398:",creator:"darkmoon3636"},
    {code:":sith:",thumb:":thumb18580337:",creator:"Pixeltainment"},
    {code:":slaughter:",thumb:":thumb980835:",creator:"crylar"},
    {code:":slowdance:",thumb:":thumb21371769:",creator:"serge"},
    {code:":shoppingcart:",thumb:":thumb8710499:",creator:"Cojaro"},
    {code:":smack:",thumb:":thumb8158033:",creator:"DarkAngelX"},
    {code:":smoke:",thumb:":thumb12602042:",creator:"budgieishere"},
    {code:":smoking:",thumb:":thumb12602042:",creator:"budgieishere"},
    {code:":smoke2:",thumb:":thumb2049172:",creator:"phaethorn"},
    {code:":smoking2:",thumb:":thumb2049172:",creator:"phaethorn"},
    {code:":snailmail:",thumb:":thumb13255327:",creator:"darkmoon3636"},
    {code:":snicker:",thumb:":thumb18949843:",creator:"IsisNamune"},
    {code:":snicker2:",thumb:":thumb17576175:",creator:"passer-by"},
    {code:":snuggle:",thumb:":thumb16149608:",creator:"lurvy"},
    {code:":spam2:",thumb:":thumb1030253:",creator:"phaethorn"},
    {code:":spin2:",thumb:":thumb18601495:",creator:"Kalia"},
    {code:":splomp:",thumb:":thumb21096785:",creator:"MisterIngo"},
    {code:":squeeze:",thumb:":thumb32303701:",creator:"crystaleyes909"},
    {code:":squid:",thumb:":thumb12966512:",creator:"Zikes"},
    {code:":squirrel:",thumb:":thumb20733820:",creator:"silivren25"},
    {code:":stalk:",thumb:":thumb19574174:",creator:"darkmoon3636"},
    {code:":stfucup:",thumb:":thumb16809469:",creator:"Fast-Bear"},
    {code:":stroke:",thumb:":thumb10484700:",creator:"eStunt"},
    {code:":surprise:",thumb:":thumb17593939:",creator:"darkmoon3636"},
    {code:":sweetkiss:",thumb:":thumb8445387:",creator:"eStunt"},
    {code:":sway:",thumb:":thumb21926010:",creator:"E-motive"},
    {code:":swim:",thumb:":thumb20754741:",creator:"2bitter-being6"},
    {code:":tackleglomp:",thumb:":thumb6378255:",creator:"kornkob"},
    {code:":talktothehand:",thumb:":thumb16556375:",creator:"crystaleyes909"},
    {code:":talktothehand2:",thumb:":thumb6812768:",creator:"darkmoon3636"},
    {code:":teabag:",thumb:":thumb17081284:",creator:"ThechemistNL"},
    {code:":tears2:",thumb:":thumb22113698:",creator:"limubear"},
    {code:":tequila:",thumb:":thumb767170:",creator:"strangledbyart"},
    {code:":thrust:",thumb:":thumb8141183:",creator:"pikachan"},
    {code:":thumbsupnod:",thumb:":thumb27991879:",creator:"suk0shi-hamu"},
    {code:":thwack:",thumb:":thumb26471400:",creator:"zacthetoad"},
    {code:":tourists:",thumb:":thumb2021968:",creator:"crylar"},
    {code:":towelwhip:",thumb:":thumb20658962:",creator:"neek-zique"},
    {code:":trapped:",thumb:":thumb25132164:",creator:"Deadman2"},
    {code:":trillian:",thumb:":thumb142805:",creator:"javageek"},
    {code:":tumbleweed:",thumb:":thumb9564127:",creator:"darkmoon3636"},
    {code:":vampypoof:",thumb:":thumb37272781:",creator:"Little-Vampire"},
    {code:":danypoof:",thumb:":thumb37272781:",creator:"Little-Vampire"},
    {code:":vaseline:",thumb:":thumb23242232:",creator:"keiross"},
    {code:":violin:",thumb:":thumb6782225:",creator:"renonevada"},
    {code:":waffle:",thumb:":thumb18907764:",creator:"MattGreen"},
    {code:":wakeup:",thumb:":thumb24917495:",creator:"cacrew"},
    {code:":cutebump:",thumb:":thumb24917495:",creator:"cacrew"},
    {code:":wallglomp:",thumb:":thumb22006813:",creator:"Azundo"},
    {code:":washingmachine:",thumb:":thumb30541269:",creator:"Little-Vampire"},
    {code:":washingmachine2:",thumb:":thumb42774151:",creator:"Little-Vampire"},
    {code:":wave2:",thumb:":thumb48570963:",creator:"Link3Kokiri"},
    {code:":waveline:",thumb:":thumb10776892:",creator:"eStunt"},
    {code:":whip:",thumb:":thumb10112890:",creator:"eStunt"},
    {code:":whisper2:",thumb:":thumb720584:",creator:"phaethorn"},
    {code:":whistle:",thumb:":thumb33317985:",creator:"nillemotes"},
    {code:":wiggle:",thumb:":thumb30754061:",creator:"ashkiel"},
    {code:":wonderbra:",thumb:":thumb18346408:",creator:"Kalia"},
    {code:":woo:",thumb:":thumb22771552:",creator:"Deadman2"},
    {code:":yabber:",thumb:":thumb32220114:",creator:"Little-Vampire"},
    {code:":yarly:",thumb:":thumb33220080:",creator:"crystaleyes909"},
    {code:":yawn2:",thumb:":thumb40899530:",creator:"nyssi"},
    {code:":zombieflomp:",thumb:":thumb21749624:",creator:"MisterIngo"},
    {code:":zombieglomp:",thumb:":thumb21713387:",creator:"MisterIngo"},
    {code:":zombiepoke:",thumb:":thumb31450738:",creator:"darkmoon3636"},

    {title:"DA emoticon shortcuts"},
    {code:":B",thumb:":bucktooth:",creator:"ja22"},

    {title:"the Deviants - the DA band"},
    {code:":band:",thumb:":thumb22520206::thumb22520072::thumb22520287::thumb22520488::thumb22520366:",creator:"darkmoon3636"},
    {code:":drummer:",thumb:":thumb22520287:",creator:"darkmoon3636"},
    {code:":bassist:",thumb:":thumb22520206:",creator:"darkmoon3636"},
    {code:":guitar:",thumb:":thumb22520072:",creator:"darkmoon3636"},
    {code:":guitarist:",thumb:":thumb22520072:",creator:"darkmoon3636"},
    {code:":eguitar:",thumb:":thumb22520366:",creator:"darkmoon3636"},
    {code:":eguitarist:",thumb:":thumb22520366:",creator:"darkmoon3636"},
    {code:":singer:",thumb:":thumb22520488:",creator:"darkmoon3636"},
    {code:":leadsinger:",thumb:":thumb22520488:",creator:"darkmoon3636"},

    {title:"the DeviantART Sesame Street Gang"},
    {code:":thegang:",thumb:":icona-t-o-m-i-c::iconparasight::icondogabone::iconl-courni::iconsiebenzehn:",creator:"a-t-o-m-i-c"},
    {code:":cookiemonster:",thumb:":icona-t-o-m-i-c:",creator:"a-t-o-m-i-c"},
    {code:":zoe:",thumb:":iconparasight:",creator:"a-t-o-m-i-c"},
    {code:":kermit:",thumb:":icondogabone:",creator:"a-t-o-m-i-c"},
    {code:":ernie:",thumb:":iconl-courni:",creator:"a-t-o-m-i-c"},
    {code:":bert:",thumb:":iconsiebenzehn:",creator:"a-t-o-m-i-c"},

    {code:":siebenzehn:",thumb:":iconsiebenzehn:",creator:"a-t-o-m-i-c"},
    {code:":memories:",thumb:":thumb5638179:",creator:"siebenzehn"},
    {code:":wake:",thumb:":thumb19332108:",creator:"siebenzehn"},
    {code:":script:",thumb:":thumb16684830:",creator:"siebenzehn"},
    {code:":scriptlink:",thumb:"<a href='http://www.deviantart.com/view/16684830' title='dAx, formerly known as 

dAmn.extend'>dAx</a>",creator:"siebenzehn"}

    );

    addemotes=new Array();
    for(var e in addem)
     {
     addemotes[addem[e].code]=addem[e]
     }

    unsafeWindow.addem=new Array();
    addtimeout=12; // wait one minute for additional emote scripts to load

    importEmotes=function() {
    var oldlen=addemotes.length;
    var code, thumb, creator;
    if(unsafeWindow.addem.length)
     for(var e in unsafeWindow.addem)
      {
      if((code=/^(\:[a-zA-Z0-9][a-zA-Z0-9]+\:)|(\:[A-Z])$/.exec(unsafeWindow.addem[e].code)) && !addemotes[code[0]] && 

(thumb=/\:thumb[0-9][0-9]+\:/.exec(unsafeWindow.addem[e].thumb)) && (creator=/[a-zA-Z0-9\-]+/.exec(unsafeWindow.addem[e].creator)))
       addemotes[code[0]]={code:code[0],thumb:thumb[0],creator:creator[0]};
      }
    unsafeWindow.addem=new Array(); // clear
    if(addtimeout--);
     window.setTimeout(importEmotes,5000);
    }
    window.setTimeout(importEmotes,5000);

// global variables

    isAway=false;
    awayMessage="";
    awayStatus="away";
    silentAway=false;
    ar_timeout=null;
    autoReplyInterval=10000;


    noAwayChans=new Array();
    noAwayChans["chat:IdleRPG"]=1;
    noAwayChans["chat:help"]=1;
    noAwayChans["chat:devart"]=1;
    noAwayChans["chat:Trivia"]=1;
    noAwayChans["debug:conn"]=1;
    noAwayChans["chat:photographers"]=1;

// custom functions

dAmn_getIgnoreList=function()
 {
 if(getCookie("ignorelist"))
  return getCookie("ignorelist").split(",");
 else
  return new Array();
 }
ignorelist=dAmn_getIgnoreList;

dAmn_setIgnoreList=function(ignorelist)
 {
 setCookie("ignorelist",ignorelist);
 }

dAmn_Ignore=function(username)
 {
 if(username.toLowerCase()==dAmn_Client_Username.toLowerCase())
  return dAmnChats[dAmnChatTab_active].channels.main.makeText('','','You can\'t ignore yourself!');

 var ignorelist=dAmn_getIgnoreList();
 // there is no array_unique in JS
 for(var i=0;i<ignorelist.length;i++)
  if(ignorelist[i]==username.toLowerCase())
   {
   dAmnChats[dAmnChatTab_active].channels.main.makeText('',username,'is already ignored');
   return;
   }
 if(!window.confirm('Do you really want to ignore \''+username+'\'?\nIgnoring a user means you won\'t receive any messages\nor actions this user 

sends.\nUse this command without parameters to view the list of ignored users,\nand remove users from this list with the /unignore command.'))
  return;
 ignorelist.push(username.toLowerCase());
 dAmn_setIgnoreList(ignorelist);
 dAmnChats[dAmnChatTab_active].Send('action','main','is blissfully ignoring \''+username+'\' now and forever.');
 }

dAmn_Unignore=function(username)
 {
 var ignorelist=dAmn_getIgnoreList();
 for(var i=0;i<ignorelist.length;i++)
  if(ignorelist[i]==username.toLowerCase())
   {
   ignorelist.splice(i,1);
   dAmnChats[dAmnChatTab_active].Send('action','main','is not ignoring \''+username+'\' anymore');
   return dAmn_setIgnoreList(ignorelist);
   }
 dAmnChats[dAmnChatTab_active].channels.main.makeText('',username,'is currently not ignored');
 }

dAmn_ShowIgnoreList=function()
 {
 var ignorelist=dAmn_getIgnoreList();
 dAmnChats[dAmnChatTab_active].channels.main.makeText('','Users that are currently ignored: ',dAmn_getIgnoreList().join(', '));
 }

function dAmnChat_AddLetterBox_Images( el, format, hovertext )
 {
    var iN = dAmn_AddNewEl( el, 'IMG' );
    iN.title = hovertext;
    iN.alt = hovertext;
    iN.src = 'http://damnextend.recluse.de/img1/'+format+'.png';

    var iH = dAmn_AddNewEl( el, 'IMG' );
    iH.style.position='absolute';
    iH.style.visibility='hidden';
    iH.style.top='0';   // prevent scrollbars
    iH.style.left='0';
    iH.title = hovertext;
    iH.alt = hovertext;
    iH.src = 'http://damnextend.recluse.de/img1/'+format+'_hover.png';
 }

function addTag(target,tag,par1,text1,par2,text2)
 {
 ts=target.selectionStart;
 te=target.selectionEnd;
 tagp=tag;
 tagt=target.value.substring(ts,te);
 if(par1&&text1)
  {
  p1=window.prompt(text1,"");
  if(!p1) return false;
  tagp=tag+" "+par1+"=\""+p1+"\"";
  if(par2&&text2)
   {
   p2=window.prompt(text2,"");
   if(!p2) return false;
   tagp+=" "+par2+"=\""+p2+"\"";
   }
  if(ts==te)
   tagt=window.prompt("Please enter a text for this tag","");
  if(!tagt) tagt="";
  }
 target.value=target.value.substring(0,ts)+"<"+tagp+">"+ tagt +"</"+tag+">"+target.value.substring(te);
 target.setSelectionRange(ts+tagp.length+2,ts+tagp.length+tagt.length+2);
 return false;
 }
function addImgTag(target)
 {
 ts=target.selectionStart;
 te=target.selectionEnd;
 src=window.prompt("Please enter the URL of the image");
 if(!src) return false;
 target.value=target.value.substring(0,te)+"<img src=\""+ src +"\">"+target.value.substring(te);
 target.setSelectionRange(te+10+src.length+2,te+10+src.length+2);
 return false;
 }

function addThumb(target)
 {
 ts=target.selectionStart;
 te=target.selectionEnd;
 t=window.prompt("Please enter the URL or the ID of the deviation");
 if(t!=parseInt(t))
  {
  re=/[view|deviation|edit]\/(\d+)\D*/;
  if(v=t.match(re))
   t=v[1];
  else
   if(th=t.match(/\:thumb(\d+)\:/))
    t=th[1];
   else
    return alert("Sorry, but your input does not appear to be a valid ID or deviation URL");

  }
 t=":thumb"+t+":";
 target.value=target.value.substring(0,ts)+t+target.value.substring(ts);
 target.setSelectionRange(ts+t.length,ts+t.length);
 }


    DeformatMsg = function(msg)
    {
        bkcolor="";
        // bold
        msg = msg.replace(/&b\t/g,"<b>");
        msg = msg.replace(/&\/b\t/g,"</b>");
        // italic
        msg = msg.replace(/&i\t/g,"<i>");
        msg = msg.replace(/&\/i\t/g,"</i>");
        // underline
        msg = msg.replace(/&u\t/g,"<u>");
        msg = msg.replace(/&\/u\t/g,"</u>");
        // subscript
        msg = msg.replace(/&sub\t/g,"<sub>");
        msg = msg.replace(/&\/sub\t/g,"</sub>");
        // superscript
        msg = msg.replace(/&sup\t/g,"<sup>");
        msg = msg.replace(/&\/sup\t/g,"</sup>");
        // strike
        msg = msg.replace(/&s\t/g,"<s>");
        msg = msg.replace(/&\/s\t/g,"</s>");
        // paragraph
        msg = msg.replace(/&p\t/g,"<p>");
        msg = msg.replace(/&\/p\t/g,"</p>");
        // break
        msg = msg.replace(/&br\t/g,"<br/>");
        // code
        msg = msg.replace(/&code\t/g,"<code>");
        msg = msg.replace(/&\/code\t/g,"</code>");
        // bcode
        msg = msg.replace(/&bcode\t/g,"<bcode>");
        msg = msg.replace(/&\/bcode\t/g,"</bcode>");
        //li
        msg = msg.replace(/&li\t/g,"<li>");
        msg = msg.replace(/&\/li\t/g,"</li>");
        //ul
        msg = msg.replace(/&ul\t/g,"<ul>");
        msg = msg.replace(/&\/ul\t/g,"</ul>");
        //ol
        msg = msg.replace(/&ol\t/g,"<ol>");
        msg = msg.replace(/&\/ol\t/g,"</ol>");
        // acronym
        msg = msg.replace(/&acro\t([^\t]+)\t/g,'<acronym title="$1">');
        msg = msg.replace(/&\/acro\t/g,"</acronym>");
        // abbr
        msg = msg.replace(/&abbr\t([^\t]+)\t/g,'<abbr title="$1">');
        msg = msg.replace(/&\/abbr\t/g,"</abbr>");

        // embedded types
        msg = msg.replace(/&img\t([^\t]+)\t([^\t]*)\t([^\t]*)\t/g,'<img src="$1" alt="$2" title="$3">');
        msg = msg.replace(/&(iframe|embed)\t([^\t]+)\t([^\t]*)\t([^\t]*)\t/g,'<$1 src="$2" width="$3" height="$4">');
        msg = msg.replace(/&\/(iframe|embed)\t/g,"</$1>");

        // anchor
        msg = msg.replace(/&a\t([^\t]+)\t([^\t]*)\t/g,'<a href="$1" title="$2">');  // untested
        msg = msg.replace(/&\/a\t/g,"</a>");                                                         // deviant
        msg = msg.replace(/&dev\t([^\t])\t([^\t]+)\t/g,':dev$2:');
        // link no description
        msg = msg.replace(/&link\t([^\t]+)\t&/g,'$1');
        // link with description
        msg = msg.replace(/&link\t([^\t]+)\t([^\t]+)\t&\t/g,'<a href="$1">$2</a>');
        msg = msg.replace(/&emote\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t/g,'$1');
        // avatar
        msg = msg.replace(/&avatar\t([^\t]+)\t([^\t]+)\t/g,':icon$1:');
        // thumb
        msg = msg.replace(/&thumb\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t/g,':thumb$1:');
        return msg;
    }

function makeResultBox(channel,icon,iconWidth,result)
 {
        var o = dAmn_MakeDiv( "userinfo-outer" )
        var i = dAmn_AddDiv( o, "userinfo-inner" );
        var u = dAmn_AddDiv( i, "userinfo alt0 damncri-member" );
        var t = this;
        dAmnChat_AddImgBox( u, "damncr-close", 'close', 'close', function(el){ dAmn_DeleteSelf(el); t.scroll_once = true;  dAmn_InvalidateLayout(); }, 

o );
        var m = dAmn_AddDiv( u, "damncri-member" );
        if(parseInt(iconWidth)!=0)
         dAmn_AddDiv( m, 'aside-left avatar alt1', icon );
        var r = dAmn_AddDiv( m, 'bodyarea alt1-left-border' );
        r.style.borderWidth="0 0 0 "+iconWidth;
        var b = dAmn_AddDiv( r, 'b read' );
        dAmn_AddNewEl(  b, 'SPAN', null, result );
        channel.addDiv( o, null, 0 );
 }

function FAQSearch(args,target)
 {
 if(!FAQloaded)
  return dAmnChats[dAmnChatTab_active].channels.main.onErrorEvent( 'faqsearch', 'FAQ not loaded yet or unavailable' );
 KeySearch=args.toLowerCase().split(" ");
 results="";
 for(var It in FAQ)
  {
  Item=FAQ[It];
  if(!Item||!Item.keywords) continue;
  i=-1;
  while(KeySearch[++i])
   if(Item.keywords.indexOf(KeySearch[i])>=0 || Item.question.toLowerCase().indexOf(KeySearch[i])>=0) break;
  if(!KeySearch[i]) continue;
  results+='<b>FAQ #'+Item.id+':</b> <a href="http://help.deviantart.com/'+Item.id+'/">'+Item.question+'</a><br>';
  }
 if(results!="")
  {
        makeResultBox(target,'<img src="http://e.deviantart.com/emoticons/f/faq.gif" width="33" height="27" alt="I have a frequently asked 

question!" title="I have a frequently asked question!" />', "43px", '<b>*** FAQ Search Results for "'+args+'":</b><br>'+results);
  }
 else
 target.onErrorEvent( 'faqsearch', 'No FAQ Search Results for "'+args+'"' );
 }


function updateTitle()
 {
 current=dAmnChatTab_active;
 if(!current) return;
 if( 0 == current.search("chat:") )
  document.title="dAmn - #"+current.split(':')[1];
 else if( 0 == current.search("pchat:") )
  document.title="dAmn - "+current.split(':')[1];
 else
  document.title="dAmn - disconnected";
 }

function dAmnBeep(from, channel, body) {
 if(isAway)
  {
  if(!silentAway)
   if(!noAwayChans[channel.cr.ns])
    {
    window.clearTimeout(ar_timeout);
    silentAway=true;
    ar_timeout=window.setTimeout("silentAway=false",autoReplyInterval);
    channel.cr.Send( 'msg','main', from+", I am currently "+awayStatus+". Reason: "+awayMessage);
    }
  }
 else
  {
  // upcoming feature: a beep when someone says your name
  }
 }

function applyEmotes(msg)
 {
dAmn_objForEach(addemotes, function(em)
 {
// while(msg.search(em.code)>-1)
 if(em.code)
  msg=msg.replace(RegExp(em.code,"g"),em.thumb);
 } );

 mytime=new Date();
// while(msg.search(":mytime:")>-1)
  

msg=msg.replace(/\:mytime\:/g,(mytime.getHours()<10?"0":"")+mytime.getHours()+":"+(mytime.getMinutes()<10?"0":"")+mytime.getMinutes()+":"

+(mytime.getSeconds()<10?"0":"")+mytime.getSeconds());

 if(FAQloaded)
 while ((arr = /(:faq(\d+):)/.exec(msg)) != null)
  {
  var item=null;
  for(var it in FAQ)
   if(FAQ[it].id&&FAQ[it].id==arr[2]) { item=FAQ[it]; break; }
  if(item)
   msg =   msg.substr( 0, arr.index ) +
           "<strong>FAQ #" + arr[2] + ":</strong> <a href='http://help.deviantart.com/" + item.id + "/'> " + item.question + "</a>" +
           msg.substr( arr.index+arr[1].length );
  else // invalidate
   msg =   msg.substr( 0, arr.index ) +
           ":faq<em></em>"+ arr[2] + ":" +
           msg.substr( arr.index+arr[1].length );
  }
 return msg;
 }

setAway=function(args,mode)
 {
 isAway=true;
 if(!args)
  silentAway=true;
 awayMessage=args?args:window.prompt("Please enter away message",awayMessage);
 awayStatus=mode?mode:"away";
 if(awayMessage!=null)
  dAmn_objForEach(dAmnChats,function(chan,name) {
   if(!noAwayChans[name])
    chan.channels.main.cr.Send( 'action','main', " is "+awayStatus+": "+awayMessage );
   });
 }

setBack=function()
 {
 isAway=silentAway=false;
 dAmn_objForEach(dAmnChats,function(chan,name) {
  if(!noAwayChans[name])
   chan.channels.main.cr.Send( 'action','main', " is back" );
  });
 }

try {
 GM_registerMenuCommand("Set Away",setAway,null,"a");
 GM_registerMenuCommand("Set Back",setBack,null,"b");
 } catch(e) {}

joinIfNotJoined=function(room)
 {
 for(var e in dAmnChats)
  if(e.toLowerCase()==room.toLowerCase())
   {
   dAmnChatTabs_activate(e,true);
   if(dAmnChats[e].connected)
    return;
   }
 dAmn_Join(room);
 }

srchRoomsText=function(node)
 {
 // replace algorithm style borrowed from the Linkify user script by Aaron Boodman
 // http://ftp.iasi.roedu.net/pub/mirrors/mozdev.org/greasemonkey/linkify.user.js
 var re=/\B#([a-zA-Z][a-zA-Z0-9]+)\b/g;
 try {
  var candidates = document.evaluate(".//a[starts-with(@href,'http://chat.deviantart.com/chat/')]", node, null, 

XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++)
   if(cand.href.substring(cand.href.lastIndexOf('/')+1)!="")
    {
    cand.onclick=function()
     {
     if(!e.shiftKey&&!e.ctrlKey)
      {
      joinIfNotJoined('chat:'+this.href.substring(this.href.lastIndexOf('/')+1));
      e.preventDefault();
      }
     }
    if(!cand.title||cand.title==cand.href)
     cand.title="";
    else
     cand.title+=" | ";
    cand.title+="joidn\n #"+cand.href.substring(cand.href.lastIndexOf('/')+1);
    }
  candidates = document.evaluate(".//text()[contains(.,'#') and not(ancestor::a) and not(ancestor::code) and not(ancestor::pre)]", node, null, 

XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++)
   if(re.test(cand.nodeValue))
    {
    var old=cand.nodeValue;
    var newnode = document.createElement("span");
    cand.parentNode.replaceChild(newnode,cand);
    re.lastIndex=0;
    for (var match = null, lastLastIndex = 0; (match = re.exec(old)); ) {
     newnode.appendChild(document.createTextNode(old.substring(lastLastIndex, match.index)));
     var a = document.createElement("a");
     a.channel=match[1];
     a.onclick=function() { joinIfNotJoined("chat:"+this.channel); };
     a.title="join #"+a.channel;
     a.style.cursor='pointer';
     a.appendChild(document.createTextNode(match[0]));
     newnode.appendChild(a);
     lastLastIndex = re.lastIndex;
    }
            newnode.appendChild(document.createTextNode(old.substring(lastLastIndex)));

    }
 } catch(e) { }

 }

// overwrite dAmn functions

/*dAmnChatInput_extend=dAmnChatInput;
dAmnChatInput = function (cr,channel,element)
    {
        this.dAmnChatInput_extend=dAmnChatInput_extend;
        this.dAmnChatInput_extend(cr,channel,element);
        // needed to execute the function in this object

    }*/

dAmnChatInput_onKey_extend=dAmnChatInput_onKey;
dAmnChatInput_onKey = function (e,kc,force)
 {
 noclear="";
 var el = this.chatinput_el;
 if(e.altKey&&kc==109) // Alt+M
  {
  dAmnChatbase_imgbox_onclick({target:this.cr.channels.main.multi_el.firstChild});
  this.chatinput_el.focus();
  }
 if(e.altKey&&kc==98) // Alt+B
  return addTag(this.chatinput_el,"b");
 if(e.altKey&&kc==99) // Alt+C
  return addTag(this.chatinput_el,"code");
 if(e.altKey&&kc==105) // Alt+I
  return addTag(this.chatinput_el,"i");
 if(e.altKey&&kc==108) // Alt+L
  return addTag(this.chatinput_el,"a","href","Please enter the URL of the link","title","Do you want the link to have a title?\n(mouseover hover, leave 

blank if not needed)");
 if(e.altKey&&kc==112) // Alt+P
  return addImgTag(this.chatinput_el);
 if(e.altKey&&kc==116) // Alt+T
  return addThumb(this.chatinput_el);
 if(e.altKey&&kc==117) // Alt+U
  return addTag(this.chatinput_el,"u");
 if(e.altKey&&kc==13&&!this.multiline)
  return 

this.chatinput_el.value=this.chatinput_el.value.substr(0,this.chatinput_el.selectionEnd)+"<br/>"+this.chatinput_el.value.substring(this.chatinput_e

l.selectionEnd);
 if(e.ctrlKey&&kc==32)
  return 

this.chatinput_el.value=this.chatinput_el.value.substr(0,this.chatinput_el.selectionEnd)+"&nbsp;"+this.chatinput_el.value.substring(this.chatinput_

el.selectionEnd);
 // hit tab?
 if (kc == 9) {
  if (e.ctrlKey || e.shiftKey) {
  //continue
  }
  else
  if (this.tablist) {
  //continue
  } else
   {
   this.tabstart   = el.value.lastIndexOf(' ') + 1;
   var tabstr      = el.value.substr( this.tabstart );
   var rt = /^(\:[(dev)|(icon)])[a-zA-Z0-9|-]+/i;
   var modif=null;
   if(erg=rt.exec(tabstr))
    {
    modif=erg[1]==':d'?':dev':':icon';
    tabstr=tabstr.substring(modif.length);
    }
   if (tabstr.length)
    {
    var a;
    // create canidates
    if (tabstr.charAt(0) == '/')
     { // search cmds
     var trex = RegExp( '^'+tabstr.substr(1)+'\\S*', "i" );
     a = new Array();
     dAmn_objForEach(this.cmds, function(o,cmd) {
       if (-1 != cmd.search( trex ))
        a = a.concat( '/'+cmd+' ' );
       });
     }
    else if (tabstr.charAt(0) == '#')
     { // search channels
     var trex = RegExp( '^'+tabstr.substr(1)+'\\S*', "i" );
     a = new Array();
     dAmn_objForEach(dAmnChats, function(o,chan) {
     if (!chan.indexOf("chat:")&&-1 != chan.substring(5).search( trex ))
      a = a.concat( '#'+chan.substring(5) );
      });
     }
    else
     {  // search member names
     a = this.cr.members.MatchMembers( RegExp( '^'+tabstr+'\\S*', "i" ) );
     if (0==this.tabstart&&!modif)
      {
      var i = a.length;
      while (i--)
       a[i]+=': ';
      }
     }
     var i = a.length;
     if(modif!=null)
      while(i--)
       a[i]=modif+a[i]+':';
     a.sort(function(a,b){return a.toLowerCase()>b.toLowerCase()?1:-1;});
     if (a.length)
      { // set to the first
      el.value = el.value.substr( 0, this.tabstart ) + a[0];
      if (a.length > 1)
       {
       this.tablist = a;
       this.tabindex = 0;
       }
      }
     }
    return false;
    }
   }
  else
   {
   if( !this.multiline )
    this.prev_multiline_str = null;
   dAmnChatTabs_activate( this.cr.ns, true );
   // dunno exactly what this does, so this stays...

   // didn't tab? -- clear tablist
   delete this.tablist;

   // hit enter
   if( kc == 13 && ( force || !this.multiline || e.shiftKey || e.ctrlKey ) )
    {
    if( el.value )
     {
     // send non-parsed
     if( e.shiftKey || (!this.multiline && e.ctrlKey) )
      {
      //continue
      }
     else
      {
       var didsmth=false;
       var cmdre = el.value.match( /^\/([a-z]+)([\s\S]*)/m );

       if( !cmdre )
        {
        //continue
        }
       else
        {
        var cmd  = cmdre[1].toLowerCase();
        var args = null;
        if( cmdre[2] && (tmp = cmdre[2].match(/^\s([\s\S]*)/)) && tmp.length )
         args = tmp[1];
        if( cmd == 'j' ) cmd = 'join';
        if( !this.cmds[cmd] )
         {}
        else
         if( this.cmds[cmd][0] )
          if( !args )
           {}
          else
           {
           // args required
           switch( cmd )
            {
            case 'faqsearch':
             FAQSearch(args,this.cr.channels.main);
             didsmth=true;
             break;
            case 'join':
             argarr=args.split(" ");
             for(var args in argarr)
              if (params = argarr[args].match( /^\s*(\S*)\s*$/ ))
               dAmn_Join( 'chat:'+params[1].match( /^#?(.*)/ )[1] );
              else
               this.cr.channels.main.onErrorEvent( 'syntax', "/join #chatroom" );
             didsmth=true;
             break;
            case 'whois':
             argarr=args.split(" ");
             for(var args in argarr)
              if( params = argarr[args].match( /^\s*(\S*)\s*$/ ) )
               dAmn_Get( 'login:'+params[1], 'info' );
              else
               this.cr.channels.main.onErrorEvent( 'syntax', "/whois username" );
             didsmth=true;
             break;
            case 'unignore':
             if(!args)
              this.cr.channels.main.onErrorEvent( 'syntax', "/unignore username" );
             else
              {
              argarr=args.split(" ");
              for(var args in argarr)
               if( params = argarr[args].match( /^\s*(\S*)\s*$/ ) )
                dAmn_Unignore(params[1]);
              }
              didsmth=true;
              break;
            }
           }
           else
            {
            noclear="";
            switch( cmd )
             {
             case 'part':
             if (args)
              {
              argarr=args.split(" ");
              for(var args in argarr)
               if (params = argarr[args].match( /^\s*(\S*)\s*$/ ))
                dAmn_Part( 'chat:'+(params[1].match( /^#?(.*)/ ))[1]);
              else
               this.cr.channels.main.onErrorEvent( 'syntax', "/part #chatroom" );
              }
             else
              dAmn_Part( this.cr.ns );
             didsmth=true;
             break;

             case 'gettitle':
               didsmth=true;
               if(!this.cr.title_el.orig)
                {
                var str = '<span class="error">could not retrieve title source, title not sent yet or sent before dAx loadup</span>';
                dAmn_addTimedDiv( this.cr.channels.main.error_el, "error", str, 10 );
                break;
                }
               if(!args||args!='info')
                noclear="/title "+this.cr.title_el.orig;
               dt=new Date();
               dt.setTime(this.cr.title_el.ts*1000);
                var str = '<span class="error">title info: </span><span class="arg1"> set by '+this.cr.title_el.by+' on '+dt.toLocaleString()+'</span>';
                dAmn_addTimedDiv( this.cr.channels.main.error_el, "error", str, 10 );

               break;
             case 'gettopic':
               didsmth=true;
               if(!this.cr.topic_el_orig)
                {
                var str = '<span class="error">could not retrieve topic source, topic not sent yet or sent before dAx loadup</span>';
                dAmn_addTimedDiv( this.cr.channels.main.error_el, "error", str, 10 );
                break;
                }
               if(!args||args!='info')
                noclear="/topic "+this.cr.topic_el_orig;
               dt=new Date();
               dt.setTime(this.cr.topic_el_ts*1000);
                var str = '<span class="error">topic info: </span><span class="arg1"> set by '+this.cr.topic_el_by+' on 

'+dt.toLocaleString()+'</span>';
                dAmn_addTimedDiv( this.cr.channels.main.error_el, "error", str, 10 );
               break;
            case 'setaway':
            case 'setbusy':
               if(!args)
                {
                args="[silentaway]";
                silentAway=true;
                }
               setAway(args,cmd.substring(3));
               didsmth=true;
               break;
            case 'setback':
               setBack();
               didsmth=true;
               break;
            case 'emotes':
               window.open(this.cmds[cmd][1]);
               didsmth=true;
               break;
            case 'about':
               if(!args) args="default";
               args=args.replace(/^\s(\S*)\s$/,RegExp.$1);
//               while(args.charAt(0)==" ") args=args.substring(1);
//               while(args.charAt(args.length-1)==" ") args=args.substring(0,args.length-1);
               switch(args)
                {
                case 'gettitle':
                case 'gettopic': makeResultBox(this.channel,'',0,'<b>/'+args+'</b><br>Enter this command to retrieve the code for the 

T'+args.substring(4)+' of the current room<br>/'+args.substring(3)+' will already be added, so you can edit the code easily and hit enter to update 

the T'+args.substring(4)); break;
                case 'faqsearch': makeResultBox(this.channel,'',0,'<b>/faqsearch</b><br>browses an internal database of the DeviantART FAQ entries 

for the given keywords and displays the result in an outbox box (just like this one)<br>Please note that this database might not always be up to 

date with the DA FAQ, especially for newly added entries, and you <i>will</i> have to reload the chat page (and hence this script) anyway to make 

the updates apply'); break;
                case 'setback':
                case 'setbusy':
                case 'setaway': makeResultBox(this.channel,'',0,'<b>/setaway</b><br>starts an away mode with optional auto-reply when someone 

talks to you (says your name)<br>If called with a parameter (the away reason), the auto-reply will mention this reason, <span title="this technically 

has no effect whatsoever, but it was requested ;)">if called without parameter, auto-reply is deactivated</span><br>to turn the away mode off 

again, use the command <i>/setback</i>'); break;
                case 'chat': makeResultBox(this.channel,'',0,'<b>/chat</b><br>opens a private chatroom with another online user on dAmn. <b>This 

user has to enter this room manually, by entering <i>/chat yourname</i> as well.</b>'); break;

                default: makeResultBox(this.channel,'', 0,'<b><a href="http://www.deviantart.com/view/16684830/">dAx 

'+VERSION+'</a></b><br><i>Features:</i><ul><li><i>:faq##:</i> support and adds <i>/faqsearch</i> command<li><i>/gettitle</i> and 

<i>/gettopic</i> commands added &gt;&gt; /about gettitle or /about gettopic<li><i>/setaway</i> starts an away mode &gt;&gt; /about 

setaway<li><i>/chat</i> creates a private chatroom with another user of dAmn &gt;&gt; /about chat<li>Additional emoticons added. For a list, 

use the <i>/emotes</i> command<li>Timestamps (originally created by `<a href="http://doofsmack.deviantart.com/">doofsmack</a>) are a 

part of dAx now <sub>(included them already since FF 1.5 broke them for some people)</sub></ul>'); break;
                }
               didsmth=true;
               break;
            case 'ignore':
              if(args)
               {
               argarr=args.split(" ");
               for(var args in argarr)
                if( params = argarr[args].match( /^\s*(\S*)\s*$/ ) )
                 dAmn_Ignore(params[1]);
               }
              else
               dAmn_ShowIgnoreList();
              didsmth=true;
              break;
               }
             }
            }
           }
       if(didsmth)
        {
        if( this.history_pos != -1  && this.history[this.history_pos] == el.value ) // posting from history.. move to the end
         {
         var before = this.history.slice(0,this.history_pos);
         var after  = this.history.slice(this.history_pos+1);
         this.history = before.concat(after).concat( this.history[this.history_pos] );
         }
        else
         {
         // add to history -- limit to 300
         this.history = this.history.concat( el.value );
         if( this.history.length > 300 )
         this.history = this.history.slice(1);
         }
        this.history_pos = -1;
        el.value='';
        if(noclear!="")
         el.value=noclear;
        el.focus();
        return false;
        }
       }
      }
     }

 return this.onKey_extend(e,kc,force)?true:false;
 }

dAmnChat_onData_extend = dAmnChat_onData;
dAmnChat_onData = function ( pkt )
 {
 this.onData_extend(pkt);
 if( pkt.param == this.ns )
  {
  switch( pkt.cmd )
   {
   case 'property':
     switch( pkt.args.p )
      {
      case 'title':
        this.title_el.orig = DeformatMsg(pkt.body);
        this.title_el.by = pkt.args.by;
        this.title_el.ts = pkt.args.ts;
        srchRoomsText(this.title_el);
        break;
      case 'topic':
       if( !pkt.args.c ) // assume main
         pkt.args.c = 'main';
        if( this.channels[pkt.args.c] )
         {
         this.topic_el_orig = DeformatMsg(pkt.body);
         this.topic_el_by = pkt.args.by;
         this.topic_el_ts = pkt.args.ts;
         srchRoomsText(this.channels.main.topic_el);
         }
        break;
      case "members":
       if (this.nstype == 'pchat')
        {
        var p=this.ns.split(':');
        var other=p[1]==dAmn_Client_Username?p[2]:p[1];
        var data = pkt.body;
        do
         {
         var userpkt = dAmn_ParsePacket( data );
         if( userpkt ){
           if(userpkt.param==other)
            return this.channels.main.makeText( '', '** '+ other ,' has joined the private chat', 2 );
           data = userpkt.body;
          }
         } while( userpkt && data );
        this.channels.main.makeText( '', '** '+ other ,' has not yet joined the private chat. Messages you send will not be received by '+other, 2 );
        }
      }
      break;
   case 'recv':
      var rp = dAmn_ParsePacket( pkt.body );
      if (this.nstype == 'pchat' && rp.param != dAmn_Client_Username)
      switch (rp.cmd) {
       case "join":
        this.channels.main.makeText( rp.cmd, '** '+ rp.param ,' has joined the private chat', 2 );
        break;
       case 'part':
        this.channels.main.makeText( rp.cmd, '** '+ rp.param, ' has left the private chat' + (pkt.args.r?(' ['+pkt.args.r+']'):''));
        break;
      }
      break;
   }
  }
 }

 function createTagButton(input,tag,tagname,par1,text1,par2,text2) {

     button = document.createElement("DIV");
     button.tag=tag;
     button.tagname=tagname;
     button.par1=par1;
     button.text1=text1;
     button.par2=par2;
     button.text2=text2;
     button.input=input;
     button.className = 'damncrc-icon-multi';
     if(tag=="thumb")
      button.onclick = function(e) {
          el = (e?e.target:window.event.srcElement).parentNode;
          addThumb(el.input.chatinput_el);
          };
     else if(tag=="img")
      button.onclick = function(e) {
          el = (e?e.target:window.event.srcElement).parentNode;
          addImgTag(el.input.chatinput_el);
          };
     else if(par1)
      if(par2)
       button.onclick = function(e) {
          el = (e?e.target:window.event.srcElement).parentNode;
          addTag(el.input.chatinput_el,el.tag,el.par1,el.text1,el.par2,el.text2);
          };
      else
       button.onclick = function(e) {
          el = (e?e.target:window.event.srcElement).parentNode;
          addTag(el.input.chatinput_el,el.tag,el.par1,el.text1);
          };
     else
      button.onclick = function(e) {
          el = (e?e.target:window.event.srcElement).parentNode;
          addTag(el.input.chatinput_el,el.tag);
          };

     button.onmouseover = dAmnChat_ImgBoxHover_enter;
     button.onmouseout = dAmnChat_ImgBoxHover_exit;
     dAmnChat_AddLetterBox_Images(button,tag,tagname);
//     button.width="20px";
//     button.background="blue";
     return button;
//     this.iconbar_el.appendChild(this.bold_el);
  }

    dAmnChanChat.prototype.takeFocus_extend=dAmnChanChat.prototype.takeFocus;
    dAmnChanChat.prototype.takeFocus=function(ar)
     {
     this.takeFocus_extend(ar);
     var t = this;
     dAmn_arrayForEach(ar, function(el) {
        el.onmouseup        = function(e)
        {
            try{
                if(!e)
                    e = window.event;
                var up  = {x:e.clientX,y:e.clientY};

                var d = {x:t.dd_down_xy.x-up.x,y:t.dd_down_xy.y-up.y};
                if( d.x < 0 )
                    d.x = -d.x;
                if( d.y < 0 )
                    d.y = -d.y;

                if( d.x < 5 && d.y < 5 && !e.button )
                    t.input.setFocus(true);

            }catch(e){}
        }
        });
     }

dAmnChanChat.prototype.Init_extend = dAmnChanChat.prototype.Init;
dAmnChanChat.prototype.Init = function( cr, name, parent_el )
     {
     this.Init_extend( cr, name, parent_el );
     var cie=this.input;
     // modification/unlocking of existing
     cie.cmds['chat']=[1];
     // additional
     cie.cmds['gettopic']=[0,''];
     cie.cmds['gettitle']=[0,''];
     cie.cmds['faqsearch']=[1,'faqsearch'];
     cie.cmds['setaway']=[0,''];
     cie.cmds['setbusy']=[0,''];
     cie.cmds['setback']=[0,''];
     cie.cmds['emotes']=[0,'http://siebenzehn.deviantart.com/journal/545257/'];
     cie.cmds['about']=[0];
     cie.cmds['ignore']=[0];
     cie.cmds['unignore']=[1];
     }

dAmnChanChat.prototype.InitButtons = function()
 {
     var cie=this.input;
     this.buttonbar=document.createElement('SPAN');
     this.iconbar_el.appendChild(this.buttonbar);
     this.bold_el=createTagButton(cie,"b","Bold");
     this.buttonbar.appendChild(this.bold_el);
     this.italic_el=createTagButton(cie,"i","Italic");
     this.buttonbar.appendChild(this.italic_el);
     this.underline_el=createTagButton(cie,"u","Underline");
     this.buttonbar.appendChild(this.underline_el);
     this.link_el=createTagButton(cie,"a","Link","href","Please enter the URL of the link","title","Do you want the link to have a title?\n(mouseover 

hover, leave blank if not needed)");
     this.buttonbar.appendChild(this.link_el);
     this.image_el=createTagButton(cie,"img","Image","src","Please enter the URL of the image");
     this.buttonbar.appendChild(this.image_el);
     this.sup_el=createTagButton(cie,"sup","Superscript");
     this.buttonbar.appendChild(this.sup_el);
     this.sub_el=createTagButton(cie,"sub","Subscript");
     this.buttonbar.appendChild(this.sub_el);
     this.code_el=createTagButton(cie,"code","Code");
     this.buttonbar.appendChild(this.code_el);
     this.thumb_el=createTagButton(cie,"thumb","Thumb");
     this.buttonbar.appendChild(this.thumb_el);
 }

dAmnChanChat.prototype.UnInitButtons = function()
 {
 if(this.buttonbar)
  {
  this.iconbar_el.removeChild(this.buttonbar);
  this.buttonbar=null;
  }
 }


dAmnChatTabs_activate_extend = dAmnChatTabs_activate;
dAmnChatTabs_activate = function( id , real )
  {
    if (dAmnChatTabs_activate_timer) {
        window.clearTimeout( dAmnChatTabs_activate_timer );
    }
    dAmnChatTabs_activate_timer = null;

    if (real && dAmnChatTabStack[0] != id) {
        dAmnChatTabStack = dAmn_arrayRemValue( dAmnChatTabStack, id );
        dAmnChatTabStack = [id].concat(dAmnChatTabStack);
    }

    if (dAmnChatTab_active != id) {
  dAmn_objForEach(dAmnChats,
   function(chat)
    {
    chat.channels.main.UnInitButtons();
    });

  dAmnChatTabs_activate_extend(id, real);

            var extendSpacer = document.getElementById( 'extendspacer' );
            if (extendSpacer) {
                var ar = id.split(':');
                if (ar && ar[0] == 'chat')
                    extendSpacer.style.display='inline';
                else
                    extendSpacer.style.display='none';
            }

     try {
     dAmnChats[dAmnChatTab_active].channels.main.InitButtons();
      } catch (e) { alert("buttons:\n"+e) }
       updateTitle();
    }
  }

 butttitleinit=function()
  {
  try {
   dAmn_objForEach(dAmnChats,
    function(chat)
     {
     chat.channels.main.UnInitButtons();
     });
   dAmnChats[dAmnChatTab_active].channels.main.InitButtons();
   updateTitle();
   } catch (e) { setTimeout(butttitleinit,2000); }
  }
 butttitleinit();

 dAmnChanChat.prototype.onAction_extend=dAmnChanChat.prototype.onAction;
 dAmnChanChat.prototype.onAction=function( from, body )
    {
        var ignorelist=dAmn_getIgnoreList();
        for(var i=0;i<ignorelist.length;i++)
         if(ignorelist[i]==from.toLowerCase()&&from!=dAmn_Client_Username) // you shouldn't be able to ignore yourself :roll:
          return;
        this.onAction_extend(from, body);
    }

 dAmnChanChat.prototype.onMsg_extend = dAmnChanChat.prototype.onMsg;
 dAmnChanChat.prototype.onMsg = function( from, body )
    {
        var ignorelist=dAmn_getIgnoreList();
        for(var i=0;i<ignorelist.length;i++)
         if(ignorelist[i]==from.toLowerCase()&&from!=dAmn_Client_Username) // you shouldn't be able to ignore yourself :roll:
          return;

        var style;
        if( -1 != from.search( RegExp("([^A-Za-z]+|^)"+dAmn_Client_Username+"([^A-Za-z]+|$|s$|s[^A-Za-z]+)","i") ) )
         style = 'self-hl';
        else if( -1 != body.search( RegExp("([^A-Za-z]+|^)"+dAmn_Client_Username+"([^A-Za-z]+|$|s$|s[^A-Za-z]+)","im") ) )
         style = 'other-hl';
        this.makeText( style?style:'', '&lt;'+from+'&gt;', body, from==dAmn_Client_Username?-1:style?2:1 );

        if( -1 != body.search( RegExp("([^A-Za-z0-9]+|^)"+dAmn_Client_Username+"([^A-Za-z0-9]+|$|s$|s[^A-Za-z0-9]+)","im") ) && 

!(body.indexOf("away")>-1) && !(from.toLowerCase().indexOf("bot")>-1) && from!=dAmn_Client_Username )
            dAmnBeep(from, this, body);
    }

    dAmnChatTabs_newData=function(id,level)
{
        if (dAmnChatTab_active != id) {
        var tab = dAmnChatTabs[id];
        if (tab && level>-1 && (!tab.data || tab.data < level)) {
            if (tab.timer) {
                window.clearTimeout(tab.timer);
            }
            tab.data = level;
            tab.flash_count = 6; // has to be even
            dAmnChatTabs_flashTab(tab);
        }
    }
}

    dAmnChanChat.prototype.makeText=function( style, from, text, hilite )
    {
        var o = dAmn_MakeDiv( "msg " + style );
        o.style.display='none';
        this.chat_el.appendChild(o);

        var i = dAmn_AddDiv( o , "inner" );

        if(useTimeStamps)
         {
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();

         oh=h;
         h=(useAM?h%12:h);
         if(useAM&&h==0) h=12;
        if(h<10) h = '0' + h;
        if(m<10) m = '0' + m;
        if(s<10) s = '0' + s;
        var t = dAmn_AddSpan( i, "timestamp", h + ':' + m + ':' + s + (useAM?"&nbsp;"+(oh>12?"pm":"am"):"") );
        t.style.marginTop = '2px';
        t.style.marginRight = '4px';
        t.style.marginLeft = '2px';

        t.style.color = '#88938d';
        t.style.fontWeight = 'bold';
        t.style.fontSize = '0.9em';
        t.style.fontStyle = 'normal';
         }

        var bkColor;
        if(IE)
            bkColor = GetBkColor( i );
        var f = dAmn_AddSpan(i,'from' );
        dAmn_AddSpan(f,null, '<img src=\'\' alt=\' \' width=0 height=0>' + from );
        if( text )
        {
            var t = dAmn_AddSpan(i,'text');
            tt = dAmn_AddSpan(t,null, '<img src=\'\' alt=\' \' width=0 height=0>'+this.FormatMsg(text,bkColor) );
            srchRoomsText(tt);
        }
        this.addDiv( o, true, hilite );
    }

  dAmn_Kick_extend=dAmn_Kick;
  dAmn_Kick=function( ns, user, reason )
   {
   reason=applyEmotes(reason);
   dAmn_Kick_extend( ns, user, reason );
   }

  dAmn_Set_extend=dAmn_Set;
  dAmn_Set=function( ns, property, data )
   {
   data=applyEmotes(data);
   dAmn_Set_extend( ns, property, data );
   }

  //you should do that with the other stuff, too - to make sure other GM scripts have a chance, too.
  //ask doofsmack if you don't know what it means ;)
  //but autoreplies on /setaway don;t work anymore :|
  //time for bed, let's fix that later.
  //dAmnChat_Send_extend=dAmnChat_Send;
  dAmnChat_Send_extend=dAmnChat.prototype.Send;

  dAmnChat_Send=function(cmd, channel, str)
   {
   if(cmd=="msg"||cmd=="action"||cmd=="title"||cmd=="topic"||cmd=="kick")
    str=applyEmotes(str);
   this.Send_extend(cmd, channel, str);
   }

dAmnChatTabs_flashTab_dev=function(tab)
{
    if (dAmnChatTab_active != tab.id && tab.tab_el.tagName == 'A') {
        var c;

        switch (tab.data) {
            case 1:
                c = 'maroon';
                break;
            case 2:
                c = 'white';
                break;
        }

        if (tab.tab_el.style.color != c) {
            tab.tab_el.style.color=c;
            tab.tab_el.style.fontWeight='bold';
        }
        tab.tab_el.style.color = (tab.flash_count&1)?'#BBC2BB':c;
        if (tab.tab_el.firstChild) {
//            tab.tab_el.firstChild.style.visibility= (tab.flash_count&1)?'hidden':'visible';
        }
        if (tab.flash_count--) {
            tab.timer = window.setTimeout( function(){ dAmnChatTabs_flashTab(tab); }, 500 );
        }
    }
}

 dAmnChanChat.prototype.FormatMsg_extend = dAmnChanChat.prototype.FormatMsg;
 dAmnChanChat.prototype.FormatMsg = function(msg,bkcolor)
  {
  sa = /&thumb\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t/g;
  msg=msg.replace(sa,"&thmb\t$1\t$2\t$3\t$4\t$5\t$6\t$7\t");

  msg = dAmnChanChat.prototype.FormatMsg_extend(msg,bkcolor);

         if( !IE )
            bkcolor = 'alpha'

           var re = /&thmb\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t([^\t]+)\t/g;
            var arr;
            var res;
            while ((arr = re.exec(msg)) != null)
            {
                // the anchor text
                var id    = arr[1];
                var title = arr[2] + ' by ' + arr[3] + ', ' + arr[4];
                var wh    = arr[4].split('x');
                var server= arr[5];
                var file  = arr[6];
                var flags = arr[7].split(':');

                var w = wh[0];
                var h = wh[1];

                var thumb_w = 100;
                var thumb_h = 100;

                if( w/h > thumb_w/thumb_h ){
                    h = parseInt((h*thumb_h)/w);
                    w = thumb_w;
                } else {
                    w = parseInt((w*thumb_w)/h);
                    h = thumb_h;
                }

                if( w > wh[0] || h > wh[1] ){
                    w = wh[0];
                    h = wh[1];
                }



//                file = file.replace(/:/,".deviantart.com/");
                var shadow = false;
                if( flags[1] != '0' ) // mature?
                    res = '<a target="_blank" href="http://www.deviantart.com/view/'+id+'" title="'+title+'">[mature deviation:'+arr[2]+']</a>';
                else if( flags[2] != '0')   // no priv
                    res = '<a target="_blank" href="http://www.deviantart.com/view/'+id+'" title="'+title+'">[deviation:'+arr[2]+']</a>';
                else {

                    if( file.match(/\.gif$/i) ){
                        file = file.replace(/:/,".deviantart.com/");
                        if( wh[0] > 100 || wh[1] > 100 )
                            res = '<a target="_blank" href="http://www.deviantart.com/view/'+id+'" title="'+title+'">[deviation:'+arr[2]+']</a>';
                        else
                        {
                            var path = 'images.deviantart.com/'+file;
                            var tmp = file.split('/');
                            if( tmp && tmp.length > 1 ){
                                tmp = tmp[0].split('.')
                                if( tmp && tmp.length > 2 )
                                    path = path = 

file.replace(/^fs(\d+)\.deviantart\.com/,"fc04.deviantart.com/fs$1").replace(/^images\.deviantart\.com/,"fc04.deviantart.com/images").replace(/^i

mages2\.deviantart\.com/,"fc04.deviantart.com/images2").replace(/^images3\.deviantart\.com/,"fc04.deviantart.com/images3");
                                    // temporary fix while fsX servers are down
                            }
                            res = '<a target="_blank" href="http://www.deviantart.com/view/'+id+'"><img title="'+title+'" width="'+w+'" height="'+h+'" 

alt=":thumb'+id+':" src="http://'+path+'"/></a>';
                        }
                    }
                    else
                    {
                        file = file.replace(/:/,"/150/");
                        if( flags[0] == '0' )
                            shadow = true;
                        res = '<a target="_blank" href="http://www.deviantart.com/view/'+id+'"><img title="'+title+'" width="'+w+'" height="'+h+'" 

alt=":thumb'+id+':" src="http://tn'+server+'.deviantart.com/'+file+'"/></a>';
                    }
                }
                if( shadow  )
                    res =   '<span class="shadow-holder"><span class="shadow" style="background-image:url(http://sh.deviantart.com/shadow/'+
                            bkcolor+
                            '-000000/5.1-0.6/'+w+'/'+h+'/null.png);">' +
                            res +
                            '</span></span>';

                msg =   msg.substr( 0, arr.index ) +
                            res +
                        msg.substr( re.lastIndex );
            }
    return msg;
  }

  dAmn_printAvatar_extend=dAmn_printAvatar;
  dAmn_printAvatar=function( username, usericon )
    {
    msg=dAmn_printAvatar_extend( username, usericon );
    msg=msg.replace("alt=\"\"","alt=\":icon"+username+":\"");
    return msg;
    }

// re-assign functions
dAmnChatInput.prototype.onKey = dAmnChatInput_onKey;
dAmnChatInput.prototype.onKey_extend = dAmnChatInput_onKey_extend;
dAmnChat.prototype.onData       = dAmnChat_onData;
dAmnChat.prototype.onData_extend       = dAmnChat_onData_extend;
dAmnChatInput.prototype.setFocus = dAmnChatInput_setFocus;
dAmnChatInput.prototype.SetElement = dAmnChat_SetElement;
dAmnChatInput.prototype.toggleInput = dAmnChatInput_toggleInput;
dAmnChatInput.prototype.appendText = dAmnChatInput_appendText;
dAmnChat.prototype.onDisconnect = dAmnChat_onDisconnect;
dAmnChat.prototype.Send         = dAmnChat_Send;
dAmnChat.prototype.Send_extend         = dAmnChat_Send_extend;
dAmnChat.prototype.onShutdown   = dAmnChat_onShutdown;
dAmnChat.prototype.onResize     = dAmnChat_onResize;
dAmnChat.prototype.onClose      = dAmnChat_onClose;
dAmnChat.prototype.doRemove     = dAmnChat_doRemove;

// apply changed function&attributes to possibly already created channels (have to consider loading time from server)
dAmn_objForEach(dAmnChats,function(chan)
               {
               main=chan.channels.main;
               main.onMsg=dAmnChanChat.prototype.onMsg;
               main.onMsg_extend=dAmnChanChat.prototype.onMsg_extend;
               // modification/unlocking of existing
               main.input.cmds['chat']=[1];
               // additional
               main.input.cmds['gettopic']=[0,''];
               main.input.cmds['gettitle']=[0,''];
               main.input.cmds['faqsearch']=[1,'faqsearch'];
               main.input.cmds['setaway']=[0,''];
               main.input.cmds['setbusy']=[0,''];
               main.input.cmds['setback']=[0,''];
               main.input.cmds['emotes']=[0,'http://siebenzehn.deviantart.com/journal/545257/'];
               main.input.cmds['about']=[0];
               main.input.cmds['ignore']=[0];
               main.input.cmds['unignore']=[1];
               main.input.onKey=dAmnChatInput_onKey;
               main.input.onKey_extend=dAmnChatInput_onKey_extend;
               main.onData=dAmnChat_onData;
               main.onData_extend=dAmnChat_onData_extend;
               main.Send=dAmnChat_Send;
               main.Send_extend=dAmnChat_Send_extend;
               main.FormatMsg=dAmnChanChat.prototype.FormatMsg;
               main.FormatMsg_extend=dAmnChanChat.prototype.FormatMsg_extend;
               dAmnChatTabs_activate_active();
/*               main.takeFocus=dAmnChanChat.prototype.takeFocus;
               main.takeFocus_extend=dAmnChanChat.prototype.takeFocus_extend;
               main.takeFocus( [  main.lo_rf_el, main.lo_rt_el, main.title_el,
                            main.lo_rf_el,
                            main.lo_rt_el,
                            main.lo_rb_el,
                            main.topic_el,
                            main.chatw_el,
                            main.chato_el,
                            main.chati_el,
                            main.chat_el,
                            main.iconbar_el ]);*/
               });

} // end of guarantee
else
 {
 alert("This version of the dAmn client doesn't comply with the version of the dAx script you have installed.\nPlease contact siebenzehn 

(http://siebenzehn.deviantart.com) if he already has made a new version for the new dAmn client.\n(a forced reload with Ctrl+F5 might help in case 

your browser still caches the old script file)");
 }

function alertObj(o)
 {
 var s="";
 for(var e in o)
  s+=e + " = " + o[e]+"\n";
 if(s=="") s=o;
 var out=window.open("about:blank");
 if(out)
  out.document.write("<body style=overflow:auto topmargin=0 leftmargin=0><textarea 

style='width:100%;height:100%;position:absolute'>"+s.replace("</textarea>","&lt;/textarea>")+"</textarea>");
 else
  alert(s);
 }

function objToStr(o,ind)
 {
 if(!ind) ind="";
 s=ind+"------------------\n";
 for(var e in o)
  {
  if(e=="args")
   s+="args=\n"+objToStr(o[e],ind+"  ");
  else
   s+=ind+e + " = " + o[e]+"\n";
  }
 return s;
 }

 }