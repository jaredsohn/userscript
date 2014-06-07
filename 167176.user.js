// ==UserScript==
// @name       START THE PARTY
// @namespace  http://userscripts.org/scripts/show/167176
// @version    0.4
// @description  Puts a few interesting controls on webpages...
// @match      http://*/*
// @match      https://*/*
// @match      file://*/*
// @copyright  2013+, Andrew Silver
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.$jQ$=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

//var jqScript = document.createElement("script");
//jqScript.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
//document.head.appendChild(jqScript);

addJQuery(function() {
var scripts = document.createElement("script");
scripts.innerHTML="var flash=0;\n"+customCss.toString()+lightning.toString()+startTheParty.toString()+seizure.toString()+makePonies.toString();
document.head.appendChild(scripts);


var partyControl = document.createElement("div");
partyControl.setAttribute("id", "party-controls")
partyControl.setAttribute("style", "background: white; padding: 15px 15px; position: fixed; right: 20px; top: 20px; border: 6px solid black; opacity: .95; z-index: 10000000; text-align: center;");
partyControl.innerHTML = '<button onclick="startTheParty()" id="startPartyButton" style="z-index: 1000;">Start the Party!</button><br>';
partyControl.innerHTML += '<button onclick="seizure()" id="startSeizureButton" style="z-index: 1000;">Seizure mode Activate!</button><br>';
partyControl.innerHTML += '<button onclick="$jQ$(\'#ponyControls\').toggle()" id="showPonies" style="z-index: 1000;">Ponies</button>';
document.body.appendChild(partyControl);

var ponyControls=document.createElement("div");
ponyControls.setAttribute("id","ponyControls");
ponyControls.setAttribute("style","display: none; background: white; padding: 15px 15px; position: fixed; right: 45%; top: 30%; border: 6px solid black; opacity: .95; z-index: 10000000; text-align: center;");
ponyControls.innerHTML += '<button onclick="makePonies(\'mane6\')" id="startSeizureButton" style="z-index: 1000;">Mane 6</button><br>';
ponyControls.innerHTML += '<button onclick="makePonies(\'random\')" id="startSeizureButton" style="z-index: 1000;">Random Pony</button><br>';
ponyControls.innerHTML += '<button onclick="makePonies(\'all\')" id="startSeizureButton" style="z-index: 1000;">All Ponies</button><br>';
ponyControls.innerHTML += '<button onclick="makePonies(\'remove\')" id="startSeizureButton" style="z-index: 1000;">Remove All</button><br>';
ponyControls.innerHTML += '<button onclick="makePonies(\'done\')" id="startSeizureButton" style="z-index: 1000;">Done</button>';
document.body.appendChild(ponyControls);



function customCss(){
    //$jQ$('head').append('<link rel="stylesheet" href="http://tf2calculator.com/scrap.css" type="text/css" />');
    //$jQ$('head').append('<link type="image/x-icon" rel="shortcut icon" href="http://zsp10.pless.pl/wp-content/plugins/tango-smileys-extended/tango/poop.png" />');
    //$jQ$('head').append('<audio src="http://puu.sh/1O2ea.mp3" autoplay></audio>');
    $jQ$('head').append('<audio autoplay><source src="http://ubuntuone.com/1GQLMevmFytqPFXe1WwJt3" type="audio/mpeg"/><source src="http://ubuntuone.com/1mg5CZvHYKiiS8BTtBRD1A" type="audio/ogg"/></audio>');
    $jQ$('body').append('<img alt="full screen background image" src="http://i.imgur.com/ntHyi.gif" id="full-screen-background-image" />');
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.container{	display: block !important;} #full-screen-background-image { z-index: -999; height: 100%; width: auto; position: fixed; top: 0; right: 0; } div{ opacity: 0.975; }';
    document.getElementsByTagName('head')[0].appendChild(style);
}

function lightning()
{flash=flash+1;
 if(flash==1){document.body.style.background = 'white'; setTimeout("lightning()",100);}
 if(flash==2){document.body.style.background = 'black'; setTimeout("lightning()",90);}
 if(flash==3){document.body.style.background = 'red'; setTimeout("lightning()",85);}
 if(flash==4){document.body.style.background = 'blue'; setTimeout("lightning()",80);}
 if(flash==5){document.body.style.background = 'purple'; setTimeout("lightning()",75);}
 if(flash==6){document.body.style.background = 'white'; setTimeout("lightning()",70);}
 if(flash==7){document.body.style.background = 'black'; setTimeout("lightning()",65);}
 if(flash==8){document.body.style.background = 'red'; setTimeout("lightning()",60);}
 if(flash==9){document.body.style.background = 'blue'; setTimeout("lightning()",50);}
 if(flash==10){document.body.style.background = 'purple'; setTimeout("lightning()",40);}
 if(flash==11){document.body.style.background = 'black'; setTimeout("lightning()",30);}
 if(flash==12){document.body.style.background = 'white'; setTimeout("lightning()",25);}
 if(flash==13){document.body.style.background = 'red'; setTimeout("lightning()",20);}
 if(flash==14){document.body.style.background = 'blue'; setTimeout("lightning()",10);}
 if(flash==15){document.body.style.background = 'purple'; setTimeout("lightning()",5);}
 if(flash==16){document.body.style.background = 'white'; setTimeout("lightning()",1);}
 if(flash==17){document.body.style.background = 'black'; setTimeout("lightning()",1);}
 if(flash==18){document.body.style.background = 'blue'; setTimeout("lightning()",1);}
 if(flash==19){document.body.style.background = 'purple'; setTimeout("lightning()",1);}
 if(flash==20){flash=0; setTimeout("lightning()",100);}
}
function startTheParty() {
    $jQ$('#party-controls').remove()
    setTimeout("lightning()",1);
    document.title = "LETS GET THIS PARTY STARTED!!!";
    if($jQ$(".container")){
        customCss();
    }
}
function seizure() {
    document.body.innerHTML='';
    setTimeout("lightning()",1);
}
function makePonies(pony) {
    if(pony==='random') {
        (function (srcs,cfg) { var cbcount = 1; var callback = function () { -- cbcount; if (cbcount === 0) { BrowserPonies.setBaseUrl(cfg.baseurl); if (!BrowserPoniesBaseConfig.loaded) { BrowserPonies.loadConfig(BrowserPoniesBaseConfig); BrowserPoniesBaseConfig.loaded = true; } BrowserPonies.loadConfig(cfg); if (!BrowserPonies.running()) BrowserPonies.start(); } }; if (typeof(BrowserPoniesConfig) === "undefined") { window.BrowserPoniesConfig = {}; } if (typeof(BrowserPoniesBaseConfig) === "undefined") { ++ cbcount; BrowserPoniesConfig.onbasecfg = callback; } if (typeof(BrowserPonies) === "undefined") { ++ cbcount; BrowserPoniesConfig.oninit = callback; } var node = (document.body || document.documentElement || document.getElementsByTagName('head')[0]); for (var id in srcs) { if (document.getElementById(id)) continue; if (node) { var s = document.createElement('script'); s.type = 'text/javascript'; s.id = id; s.src = srcs[id]; node.appendChild(s); } else { document.write('\u003cscript type="text/javscript" src="'+ srcs[id]+'" id="'+id+'"\u003e\u003c/script\u003e'); } } callback();})({"browser-ponies-script":"http://panzi.github.io/Browser-Ponies/browserponies.js","browser-ponies-config":"http://panzi.github.io/Browser-Ponies/basecfg.js"},{"fadeDuration":500,"volume":1,"fps":25,"speed":3,"audioEnabled":false,"showFps":false,"showLoadProgress":true,"speakProbability":0.1,"baseurl":"http://panzi.github.io/Browser-Ponies/","spawnRandom":1});void(0)
        hide=false;
    } else if(pony==='all') {
        (function (srcs,cfg) { var cbcount = 1; var callback = function () { -- cbcount; if (cbcount === 0) { BrowserPonies.setBaseUrl(cfg.baseurl); if (!BrowserPoniesBaseConfig.loaded) { BrowserPonies.loadConfig(BrowserPoniesBaseConfig); BrowserPoniesBaseConfig.loaded = true; } BrowserPonies.loadConfig(cfg); if (!BrowserPonies.running()) BrowserPonies.start(); } }; if (typeof(BrowserPoniesConfig) === "undefined") { window.BrowserPoniesConfig = {}; } if (typeof(BrowserPoniesBaseConfig) === "undefined") { ++ cbcount; BrowserPoniesConfig.onbasecfg = callback; } if (typeof(BrowserPonies) === "undefined") { ++ cbcount; BrowserPoniesConfig.oninit = callback; } var node = (document.body || document.documentElement || document.getElementsByTagName('head')[0]); for (var id in srcs) { if (document.getElementById(id)) continue; if (node) { var s = document.createElement('script'); s.type = 'text/javascript'; s.id = id; s.src = srcs[id]; node.appendChild(s); } else { document.write('\u003cscript type="text/javscript" src="'+ srcs[id]+'" id="'+id+'"\u003e\u003c/script\u003e'); } } callback();})({"browser-ponies-script":"http://panzi.github.io/Browser-Ponies/browserponies.js","browser-ponies-config":"http://panzi.github.io/Browser-Ponies/basecfg.js"},{"baseurl":"http://panzi.github.io/Browser-Ponies/","fadeDuration":500,"volume":1,"fps":25,"speed":3,"audioEnabled":false,"showFps":false,"showLoadProgress":true,"speakProbability":0.1,"spawn":{"allie way":1,"aloe":1,"angel":1,"apple bloom":1,"apple bumpkin":1,"apple fritter":1,"applejack":1,"applejack (filly)":1,"archer":1,"beauty brass":1,"berry punch":1,"big mac":1,"big macintosh":1,"blinkie pie":1,"blossomforth":1,"blues":1,"bon-bon":1,"boxxy brown":1,"braeburn":1,"caesar":1,"candy mane":1,"caramel":1,"carrot top":1,"changeling":1,"cheerilee":1,"cheerilee (80s)":1,"cherry berry":1,"cloud kicker":1,"cloudchaser":1,"clyde pie":1,"colgate":1,"daisy":1,"daring do":1,"davenport":1,"derpy hooves":1,"diamond mint":1,"diamond tiara":1,"dinky hooves":1,"discord":1,"doctor whooves":1,"doctor whooves (fan character)":1,"donut joe":1,"elsie":1,"fancypants":1,"fido":1,"filthy rich":1,"flam":1,"fleur de lis":1,"flim":1,"flitter":1,"fluttershy":1,"fluttershy (filly)":1,"fredrick horseshoepin":1,"gilda":1,"granny smith":1,"gummy":1,"gustave le grand":1,"hoity-toity":1,"horse power":1,"horte cuisine":1,"inky pie":1,"iron will":1,"lemon hearts":1,"lightning bolt":1,"lily":1,"little strongheart":1,"lotus":1,"lyra":1,"master":1,"mayor mare":1,"mjolna":1,"mr cake":1,"mrs cake":1,"mrs sparkle":1,"mysterious mare do well":1,"nightmare moon":1,"nurse redheart":1,"octavia":1,"opalescence":1,"parasprite":1,"philomena":1,"photo finish":1,"pinkamina diane pie":1,"pinkie pie":1,"pinkie pie (filly)":1,"pinkie pie (gala)":1,"pipsqueak":1,"pokey pierce":1,"princess cadence":1,"princess cadence (teenager)":1,"princess celestia":1,"princess celestia (alternate filly)":1,"princess celestia (filly)":1,"princess luna":1,"princess luna (filly)":1,"princess luna (season 1)":1,"queen chrysalis":1,"rainbow dash":1,"rainbow dash (filly)":1,"rainbowshine":1,"raindrops":1,"rarity":1,"rarity (filly)":1,"rarity's father":1,"rarity's mother":1,"roseluck":1,"rover":1,"royal guard":1,"royal night guard":1,"ruby pinch":1,"rumble":1,"sapphire shores":1,"scootaloo":1,"screwball":1,"sea swirl":1,"shadowbolt":1,"sheriff silverstar":1,"shining armour":1,"silver spoon":1,"silverspeed":1,"sindy":1,"sir colton vines":1,"snails":1,"snips":1,"soarin'":1,"soigne folio":1,"sparkler":1,"spike":1,"spitfire":1,"spot":1,"stella":1,"steven magnet":1,"sue pie":1,"surprise":1,"sweetie belle":1,"tank":1,"thunderlane":1,"trixie":1,"twilight sparkle":1,"twilight sparkle (filly)":1,"twinkleshine":1,"twist":1,"uncle orange":1,"vinyl scratch":1,"violet":1,"wild fire":1,"winona":1,"zecora":1},"spawnRandom":1});void(0)
    } else if (pony==='mane6'){
        (function (srcs,cfg) { var cbcount = 1; var callback = function () { -- cbcount; if (cbcount === 0) { BrowserPonies.setBaseUrl(cfg.baseurl); if (!BrowserPoniesBaseConfig.loaded) { BrowserPonies.loadConfig(BrowserPoniesBaseConfig); BrowserPoniesBaseConfig.loaded = true; } BrowserPonies.loadConfig(cfg); if (!BrowserPonies.running()) BrowserPonies.start(); } }; if (typeof(BrowserPoniesConfig) === "undefined") { window.BrowserPoniesConfig = {}; } if (typeof(BrowserPoniesBaseConfig) === "undefined") { ++ cbcount; BrowserPoniesConfig.onbasecfg = callback; } if (typeof(BrowserPonies) === "undefined") { ++ cbcount; BrowserPoniesConfig.oninit = callback; } var node = (document.body || document.documentElement || document.getElementsByTagName('head')[0]); for (var id in srcs) { if (document.getElementById(id)) continue; if (node) { var s = document.createElement('script'); s.type = 'text/javascript'; s.id = id; s.src = srcs[id]; node.appendChild(s); } else { document.write('\u003cscript type="text/javscript" src="'+ srcs[id]+'" id="'+id+'"\u003e\u003c/script\u003e'); } } callback();})({"browser-ponies-script":"http://panzi.github.io/Browser-Ponies/browserponies.js","browser-ponies-config":"http://panzi.github.io/Browser-Ponies/basecfg.js"},{"baseurl":"http://panzi.github.io/Browser-Ponies/","fadeDuration":500,"volume":1,"fps":25,"speed":3,"audioEnabled":false,"showFps":false,"showLoadProgress":true,"speakProbability":0.1,"spawn":{"applejack":1,"fluttershy":1,"pinkie pie":1,"rainbow dash":1,"rarity":1,"twilight sparkle":1}});void(0)
    } else if (pony==='done') {
        $jQ$('#ponyControls').toggle(false)
    } else if (pony==='remove') {
        BrowserPonies.unspawnAll();BrowserPonies.stop();void(0)
    }
}
//seizure();
});