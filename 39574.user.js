{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1515;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name           Replay Rewrite\par
// @description    Adds some new features to the replay page.\par
// @namespace      pbr\par
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*\par
// @include        http://goallineblitz.com/game/home.pl\par
// @require        http://userscripts.org/scripts/source/28938.user.js\par
// @require        http://userscripts.org/scripts/source/31566.user.js       \par
// @require        http://userscripts.org/scripts/source/31567.user.js\par
// @require        http://userscripts.org/scripts/source/31573.user.js\par
// @require        http://userscripts.org/scripts/source/32044.user.js\par
// @version        08.12.30\par
// ==/UserScript==\par
\par
/* \par
 * \par
 * pabst did this 08/07/31+\par
 *\par
 * \par
 */\par
\par
// ---------- main ----------------\par
\tab\par
// you can modify the following variables\par
var autoplay = false;\par
var preDelay = 3000;\par
var postDelay = 30000; //increasing this may hide early play changes, but the problem is your computer is too slow\par
var alwaysPause = false;\par
var alwaysShowPlayText = false;\par
var highlightPlayers = true;\par
var alternatePlayers = false;\par
\par
var enableFieldLayer = false;       //the field\par
var enableLowerDecalLayer = false;  //end zone images\par
var enableLineLayer = false;        //yardlines\par
var enableMiddleDecalLayer = false; //field graphics\par
var enableUpperDecalLayer = false;  //used for shadowing, only have retractable roof right now\par
\par
var disablePlayerOverlays = false; //true can improve performance with decal layers\par
// you can modify the previous variables\par
\par
var currentPlay = -1;\par
var lastPlay = -1;\par
var plays = [];\par
\par
var playDone = false;\par
var playPaused = false;\par
\par
var prePlayTimer = null;\par
var pauseCheckTimer = null;\par
var postPlayTimer = null;\par
var playFinishedTimer = null;\par
\par
var httpRequest = null;\par
\par
var myCurrentFrame = 0;\par
window.setTimeout( function() \{\par
\tab\tab if ((window.location+"").indexOf("home.pl") != -1) \{\par
\tab\tab\tab pbr_replay_highlight_main();\par
\tab\tab\}\par
\tab\tab else \{\par
\tab\tab\tab document.addEventListener("page loaded",changePlays,true);\par
\tab\tab\tab pbp();\par
\tab\tab\tab restructurePage();\par
\tab\tab\tab\par
\tab\tab\tab playFinishedTimer = setInterval(isPlayFinished,3000);\par
\tab\tab\tab //console.log("playFinishedTimer started");\par
\par
            if (alwaysPause == true) \{\par
                playPaused = false;\par
                pauseReplay();\par
            \}\par
\tab\tab\}\par
\}, 100);\par
\par
// ---------- end main ------------\par
\par
var fieldLayerZ = 0;\par
var lowerDecalLayerZ = 128;\par
var lineLayerZ = 256;\par
var middleDecalLayerZ = 384;\par
var playerLayerZ = 512;\par
var upperDecalLayerZ = 768;\par
var iconOverlayLayerZ = 1024;\par
\par
function playerGraphicsUpdate() \{\par
    if (alternatePlayers == true) \{\par
    \tab var players = document.getElementsByClassName("player_icon");\par
    \tab for (var i=0; i<players.length; i++) \{\par
    \tab\tab var img = players[i].childNodes[0];\par
    \tab\tab if (img == null) continue;\par
    \tab\tab var z = playerLayerZ;\par
    \tab\tab if (img.src.indexOf("ball.gif") != -1) \{\par
        \tab\tab //img.src = img.src.replace("http://goallineblitz.com/images/","path to your ball.gif image");\par
    \tab\tab\tab z++;\par
    \tab\tab\}\par
    \tab\tab else if (players[i].id == "los") \{\par
    \tab\tab\tab z--;\par
    \tab\tab\}\par
    \tab\tab else if (players[i].id == "fdm") \{\par
    \tab\tab\tab z--;\par
    \tab\tab\}\par
    \tab\tab else \{\par
    \tab\tab\tab //img.src = img.src.replace("http://goallineblitz.com/images/","http://i10.photobucket.com/albums/a136/ggakma/GLB/");\par
    \tab\tab\}\par
    \tab\tab //console.log(players[i].id);\par
        \tab var s = players[i].getAttribute("style");\par
        \tab s += "z-index:"+z+";";\par
        \tab players[i].setAttribute("style",s);\par
        \tab players[i].zIndex = z;\par
    \tab\}\par
    \}\par
    else \{\par
    \tab var players = document.getElementsByClassName("player_icon");\par
    \tab for (var i=0; i<players.length; i++) \{\par
    \tab\tab var z = playerLayerZ;\par
    \tab\tab if (players[i].id == "los") \{\par
    \tab\tab\tab z--;\par
    \tab\tab\}\par
    \tab\tab else if (players[i].id == "fdm") \{\par
    \tab\tab\tab z--;\par
    \tab\tab\}\par
        \tab var s = players[i].getAttribute("style");\par
        \tab s += "z-index:"+z+";";\par
        \tab players[i].setAttribute("style",s);\par
        \tab players[i].zIndex = z;\par
    \tab\}\par
    \}\par
    \par
\tab if (disablePlayerOverlays == false) \{\par
\tab\tab var playerdivs = document.getElementsByClassName("player_icon_overlay");\tab\par
\tab\tab for (var i=0; i<playerdivs.length; i++) \{\par
\tab\tab\tab var s = playerdivs[i].getAttribute("style");\par
\tab\tab\tab if (s == null) \{\par
\tab\tab\tab\tab s = "z-index:"+iconOverlayLayerZ+";";\par
\tab\tab\tab\}\par
\tab\tab\tab else if (s.indexOf("z-index") == -1) \{\par
\tab\tab\tab\tab s += "z-index:"+iconOverlayLayerZ+";";\par
\tab\tab\tab\}\par
\tab\tab\tab playerdivs[i].setAttribute("style",s);\par
\tab\tab\}\par
\tab\}\par
\}\par
\par
function fieldGraphicsUpdate() \{\par
\tab if (enableFieldLayer == true) \{ //1080x480\par
        var fields = [];\par
        fields[fields.length] = 'http://img296.imageshack.us/img296/4293/smoothfieldpq9.jpg';\par
\par
        //these fields have yard lines already. DISABLE THE LINE LAYER.\par
        //fields[fields.length] = 'http://img517.imageshack.us/img517/2792/glbfieldgrassph5.jpg';\par
        //fields[fields.length] = 'http://img517.imageshack.us/img517/2551/glbfieldturfhl0.jpg';\par
        //fields[fields.length] = 'http://img517.imageshack.us/img517/811/glbfieldwornwh2.jpg';\par
        //fields[fields.length] = 'http://img215.imageshack.us/img215/5927/glbfieldsloppyweatheryf1.jpg';\par
        //fields[fields.length] = 'http://img205.imageshack.us/img205/2179/glbfieldsnowvs1.jpg';\par
        //fields[fields.length] = 'http://img523.imageshack.us/img523/6463/glbfieldrb0.gif';\par
        var field = document.getElementById("replay_area");\par
        var hometeam = document.getElementsByClassName("team_name")[2].innerHTML;\par
        hometeam = hometeam.slice(hometeam.indexOf("team_id=")+"team_id=".length);\par
        hometeam = hometeam.slice(0,hometeam.indexOf('"'));\par
        field.style.backgroundImage = "url("+fields[parseInt(hometeam)%fields.length]+")";\par
\tab\}\par
\par
    if (enableLowerDecalLayer == true) \{\par
\tab\tab var d = document.getElementById("lowerdecals");\par
\tab\tab if (d == null) \{\par
\tab\tab\tab var repdiv = document.getElementById("replay_area");\par
\tab\tab\tab var parstyle = repdiv.getAttribute("style");\par
\tab\tab\tab if (parstyle == null) parstyle = "";\par
\tab\tab\tab\par
\tab\tab\tab div = document.createElement("div");\par
\tab\tab\tab div.setAttribute("style","position:absolute; z-index:"+lowerDecalLayerZ+";");\par
\tab\tab\tab div.setAttribute("id","lowerdecals");\tab\par
\tab\tab\tab div.zIndex=lowerDecalLayerZ;\par
\par
\tab\tab\tab //north end zone - 480x91 including outline\par
\tab\tab\tab var img = document.createElement("img");\par
\tab\tab\tab img.src = "http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-top.jpg";\par
\tab\tab\tab img.setAttribute("style","position: absolute; top:0px; left:0px; z-index:"+lowerDecalLayerZ+";");\par
\tab\tab\tab img.zIndex=lowerDecalLayerZ;\par
\tab\tab\tab div.appendChild(img);\par
\tab\tab\tab\par
\tab\tab\tab //south end zone - 480x91 including outline\par
\tab\tab\tab var img = document.createElement("img");\par
\tab\tab\tab img.src = "http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-bottom.jpg";\par
\tab\tab\tab img.setAttribute("style","position: absolute; top:988px; left:0px; z-index:"+lowerDecalLayerZ+";");\par
\tab\tab\tab img.zIndex=lowerDecalLayerZ;\par
\tab\tab\tab div.appendChild(img);\par
\tab\tab\tab\par
\tab\tab\tab repdiv.appendChild(div);\par
\tab\tab\}\par
    \}\par
    \par
\tab if (enableLineLayer == true) \{ //1080x480\par
\tab\tab var d = document.getElementById("linelayer");\par
\tab\tab if (d == null) \{\par
\tab\tab\tab var repdiv = document.getElementById("replay_area");\par
\tab\tab\tab\par
\tab\tab\tab div = document.createElement("div");\par
\tab\tab\tab div.setAttribute("style","position:absolute; z-index:"+lineLayerZ+";");\par
\tab\tab\tab div.setAttribute("id","linelayer");\tab\par
\tab\tab\tab div.zIndex=lineLayerZ;\par
\tab\tab\par
\tab         var lines = [];\par
\tab         lines[lines.length] = "http://img527.imageshack.us/img527/3776/glblinesyk7.png";\par
\tab         \par
\tab\tab\tab var img = document.createElement("img");\par
\tab\tab\tab img.src = lines[0];\par
\tab\tab\tab img.setAttribute("style","position: absolute; z-index:"+lineLayerZ+";");\par
\tab\tab\tab img.zIndex=lineLayerZ;\par
\tab\tab\tab div.appendChild(img);\par
\tab\tab\tab\par
\tab\tab\tab repdiv.appendChild(div);\par
\tab\tab\}\par
    \}\par
\par
    if (enableMiddleDecalLayer == true) \{\par
\tab\tab var d = document.getElementById("middledecals");\par
\tab\tab if (d == null) \{\par
\tab\tab\tab var repdiv = document.getElementById("replay_area");\par
\tab\tab\tab var parstyle = repdiv.getAttribute("style");\par
\tab\tab\tab if (parstyle == null) parstyle = "";\par
\tab\tab\tab\par
\tab\tab\tab div = document.createElement("div");\par
\tab\tab\tab div.setAttribute("style","position:absolute; z-index:"+middleDecalLayerZ+";");\par
\tab\tab\tab div.setAttribute("id","middledecals");\tab\par
\tab\tab\tab div.zIndex=middleDecalLayerZ;\par
\par
\tab\tab\tab //50 yard line image \par
\tab\tab\tab var imgysize = 224; //set to the y-axis length of your image\par
\tab\tab\tab var imgxsize = 140; //set to the x-axis length of your image\par
\tab\tab\tab var img = document.createElement("img");\par
\tab\tab\tab img.src = "http://img184.imageshack.us/img184/320/glblogotx0.png";\par
\tab\tab\tab img.setAttribute("style","position: absolute; top:"+(540-(imgysize>>1))+"px; left:"+(240-(imgxsize>>1))+"px; z-index:"+middleDecalLayerZ+";");\par
\tab\tab\tab img.zIndex=middleDecalLayerZ;\par
\tab\tab\tab div.appendChild(img);\par
\tab\tab\tab\par
\tab\tab\tab repdiv.appendChild(div);\par
\tab\tab\}\par
    \}\par
\par
    if (enableUpperDecalLayer == true) \{ //1080x480\par
\tab\tab var d = document.getElementById("upperdecals");\par
\tab\tab if (d == null) \{\par
\tab\tab\tab var repdiv = document.getElementById("replay_area");\par
\tab\tab\tab\par
\tab\tab\tab div = document.createElement("div");\par
\tab\tab\tab div.setAttribute("style","position:absolute; z-index:"+upperDecalLayerZ+";");\par
\tab\tab\tab div.setAttribute("id","upperdecals");\tab\par
\tab\tab\tab div.zIndex=upperDecalLayerZ;\par
\tab\tab\par
\tab\tab\tab var img = document.createElement("img");\par
            //img.src = "http://img409.imageshack.us/img409/8636/northshadowxf1.png";\par
            //img.src = "http://img510.imageshack.us/img510/1931/eastshadowhs0.png";\par
\tab\tab\tab img.src = "http://img515.imageshack.us/img515/9223/glboverlaymappedto100vu7.png";\par
\tab\tab\tab img.setAttribute("style","position: absolute; opacity:0.45; z-index:"+upperDecalLayerZ+";");\par
\tab\tab\tab img.zIndex=upperDecalLayerZ;\par
\tab\tab\tab div.appendChild(img);\par
\tab\tab\tab\par
\tab\tab\tab repdiv.appendChild(div);\par
\tab\tab\}\par
    \}\par
\}\par
\par
function restructureInfo() \{\par
\tab playerGraphicsUpdate();\par
\tab fieldGraphicsUpdate();\par
\tab\par
\tab var offOrder = ["WR1","WR3","LOT","LG","C","RG","ROT","TE","WR5","WR4","WR2","QB","HB","FB"];\par
\tab var defOrder = ["CB1","CB3","ROLB","RDE","RILB","DT","MLB","NT","LILB","LDE","LOLB","CB4","CB2","FS","SS"];\par
\tab\par
\tab var teams = document.getElementsByClassName("team");\par
\tab for each (var t in teams) \{\par
\tab\tab var clears = t.getElementsByClassName("clear");\par
\tab\tab for (var i=clears.length-1; i>-1; i--) \{\par
\tab\tab\tab t.removeChild(clears[i]);\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab var players = document.getElementsByClassName("player_listing");\par
\tab //doing this twice until I get a sort working\par
\tab for (var i=players.length-1; i>-1; i--) \{\par
\tab\tab var p = players[i].parentNode;\par
\tab\tab var t = p.removeChild(players[i]);\par
\tab\tab t.setAttribute("style","clear:left;");\par
\tab\tab //t.lastChild.firstChild.nextSibling.nodeValue = "";  //remove actual position\par
\tab\tab p.appendChild(t);\par
\tab\}\par
\tab\par
\tab var stats = new Stats();\par
\tab for (var i=0; i<currentPlay; i++) \{\par
\tab\tab playHandler(stats, new Drive(), plays[i]);\par
\tab\}\par
\tab\par
\tab var players = document.getElementsByClassName("player_listing");\par
\tab for (var i=players.length-1; i>-1; i--) \{\par
\tab\tab var p = players[i].parentNode;\par
\tab\tab var t = p.removeChild(players[i]);\par
\tab\tab t.setAttribute("style","clear:left;");\par
\tab\tab //t.lastChild.firstChild.nextSibling.nodeValue = "";  //remove actual position\par
\tab\tab p.appendChild(t);\par
\tab\tab\par
\tab\tab var div = document.createElement("div");\par
\tab\tab div.setAttribute("style","clear:left;margin-left:40px;margin-bottom:10px;");\par
\tab\tab div.setAttribute("class","player_stats");\par
\tab\tab\par
\tab\tab var pos = t.firstChild.innerHTML;\par
\tab\tab var name = t.firstChild.nextSibling.firstChild.innerHTML;\par
\tab\tab //console.log(pos+") '"+name+"'");\par
\tab\tab if (pos.match("QB") != null) \{\par
\tab\tab\tab div.innerHTML = getPassingString(stats, name);\par
\tab\tab\}\par
\tab\tab else if ((pos.match("HB") != null) || (pos.match("FB") != null)) \{\par
\tab\tab\tab div.innerHTML = getRushingString(stats, name);\par
\tab\tab\}\par
\tab\tab else if ((pos.match("WR") != null) || (pos.match("TE") != null)) \{\par
\tab\tab\tab div.innerHTML = getReceivingString(stats, name);\par
\tab\tab\}\par
\tab\tab else if (pos.match("KR") != null) \{\par
\tab\tab\tab div.innerHTML = getReturnString(stats, name, true);\par
\tab\tab\}\par
\tab\tab else if (pos.match("PR") != null) \{\par
\tab\tab\tab div.innerHTML = getReturnString(stats, name, false);\par
\tab\tab\}\par
\tab\tab else if ((pos.match("RS") != null) || (pos.match("OS") != null) ||\par
\tab\tab\tab\tab (pos.match("LS") != null)) \{\par
\tab\tab\tab div.innerHTML = getDefensiveSTString(stats, name);\par
\tab\tab\}\par
\tab\tab else if ((pos.match("CB") != null) || (pos.match("S") != null)) \{\par
\tab\tab\tab div.innerHTML = getDefensiveString(stats, name);\par
\tab\tab\}\par
\tab\tab else if ((pos.match("G") != null) || (pos.match("C") != null) || \par
\tab\tab\tab\tab  (pos.match("OT") != null)) \{\par
\tab\tab\tab div.innerHTML = getOffensiveLineString(stats, name);\par
\tab\tab\}\par
\tab\tab else if (pos.match("K") != null) \{\par
\tab\tab\tab div.innerHTML = getKickingString(stats, name);\par
\tab\tab\}\par
\tab\tab else if (pos.match("P") != null) \{\par
\tab\tab\tab div.innerHTML = getPuntingString(stats, name);\par
\tab\tab\}\par
\tab\tab else \{\par
\tab\tab\tab div.innerHTML = getDefensiveString(stats, name);\par
\tab\tab\}\par
\tab\tab p.appendChild(div);\par
\tab\}\par
\}\par
\par
function getPassingString(stats, name) \{\par
\tab var output = "&nbsp;";\par
\tab var index = stats.playerPassingName[1].indexOf(name);\par
\tab if (index != -1) \{\par
\tab\tab var s = stats.playerPassingStats[1][index];\par
\tab\tab var att = s[0];\par
\tab\tab var cmp = s[1];\par
\tab\tab var y = s[2];\par
\tab\tab var td = s[3];\par
\tab\tab var int = s[4];\par
\tab\tab\par
\tab\tab output = att+" / "+cmp+", "+y.toFixed(0)+" yards";\par
\tab\tab if (td != 0) output += ", "+td+" td";\par
\tab\tab if (int != 0) output += ", "+int+" int";\par
\tab\tab //console.log(s);\par
\tab\}\par
\tab return output;\par
\}\par
function getRushingString(stats, name) \{\par
\tab var output = "&nbsp;";\par
\tab var index = stats.playerRushingName[1].indexOf(name);\par
\tab if (index != -1) \{\par
\tab\tab var s = stats.playerRushingStats[1][index];\par
\tab\tab var att = s[0];\par
\tab\tab var y = s[1];\par
\tab\tab //var td = s[?];\par
\tab\tab\par
\tab\tab output = att+" att, "+y.toFixed(0)+" yards";\par
\tab\tab //if (td != 0) output += ", "+td+" td";\par
\tab\tab //console.log(s);\par
\tab\}\par
\tab return output;\par
\}\par
function getReceivingString(stats, name) \{\par
\tab var output = "&nbsp;";\par
\tab var index = stats.playerReceivingName[1].indexOf(name);\par
\tab if (index != -1) \{\par
\tab\tab var s = stats.playerReceivingStats[1][index];\par
\tab\tab var tgt = s[1];\par
\tab\tab var rec = s[0];\par
\tab\tab var d = s[2];\par
\tab\tab var y = s[3];\par
\tab\tab //var td = s[?];\par
\tab\tab\par
\tab\tab output = "";\par
\tab\tab if (tgt == rec) \{\par
\tab\tab\tab output += rec+" rec, "+y.toFixed(0)+" yards";\par
\tab\tab\}\par
\tab\tab else \{\par
\tab\tab\tab output = tgt +" tgt";\par
\tab\tab\tab if (rec != 0) output += ", "+rec+" rec, "+y.toFixed(0)+" yards";\par
\tab\tab\}\par
\tab\tab if (d != 0) output += ", "+d+" drop";\par
\tab\tab //if (td != 0) output += ", "+td+" td";\par
\tab\tab //console.log(s);\par
\tab\}\par
\tab return output;\par
\}\par
function getOffensiveLineString(stats, name) \{\par
\tab return "&nbsp;";\par
\}\par
function getDefensiveString(stats, name) \{\par
\tab var output = "&nbsp;";\par
\tab var rush = stats.playerDefensiveRushName[0].indexOf(name);\par
\tab var pass = stats.playerDefensivePassName[0].indexOf(name);\par
\tab if (rush+pass != -2) \{\par
\tab\tab var tk=0; var miss=0; var stop=0; var dft=0; var pd=0;\par
\tab\tab if (rush != -1) \{\par
\tab\tab\tab tk += stats.playerDefensiveRushStats[0][rush][0];\par
\tab\tab\tab miss += stats.playerDefensiveRushStats[0][rush][1];\par
\tab\tab\tab stop += stats.playerDefensiveRushStats[0][rush][3];\par
\tab\tab\tab dft += stats.playerDefensiveRushStats[0][rush][4];\par
\tab\tab\}\par
\tab\tab if (pass != -1) \{\par
\tab\tab\tab tk += stats.playerDefensivePassStats[0][pass][0];\par
\tab\tab\tab miss += stats.playerDefensivePassStats[0][pass][1];\par
\tab\tab\tab stop += stats.playerDefensivePassStats[0][pass][3];\par
\tab\tab\tab dft += stats.playerDefensivePassStats[0][pass][4];\par
\tab\tab\tab pd += stats.playerDefensivePassStats[0][pass][7];\par
\tab\tab\}\par
\tab\tab\par
\tab\tab output = "";\par
\tab\tab if (tk != 0) output += tk+" tkl";\par
\tab\tab if (miss != 0) \{\par
\tab\tab\tab if (output.length == 0) \{\par
\tab\tab\tab\tab output += "0 tkl";\par
\tab\tab\tab\}\par
\tab\tab\tab output += ", "+miss+" miss";\par
\tab\tab\}\par
\tab\tab if (stop != 0) output += ", "+stop+" stop";\par
\tab\tab if (dft != 0) output += ", "+dft+" dft";\par
\tab\tab if (pd != 0) \{\par
\tab\tab\tab if (output.length != 0) \{\par
\tab\tab\tab\tab output += ", "+pd+" pd";\par
\tab\tab\tab\}\par
\tab\tab\tab else \{\par
\tab\tab\tab\tab output += pd+" pd";\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\}\par
\tab return output;\par
\}\par
function getReturnString(stats, name, isKickRet) \{\par
\tab var output = "&nbsp;";\par
\tab var rn = stats.playerKickReturnName;\par
\tab var rs = stats.playerKickReturnStats;\par
\tab if (isKickRet == false) \{\par
\tab\tab rn = stats.playerPuntReturnName;\par
\tab\tab rs = stats.playerPuntReturnStats;\par
\tab\}\par
\tab var index = rn[1].indexOf(name);\par
\tab\par
\tab if (index != -1) \{\par
\tab\tab var s = rs[1][index];\par
\tab\tab var ret = s[0];\par
\tab\tab var y = s[1];\par
\tab\tab var td = s[3];\par
\tab\tab\par
\tab\tab output = ret+" ret, "+(y/ret).toFixed(1)+" avg";\par
\tab\tab if (td != 0) output += ", "+td+" td";\par
\tab\tab //console.log(s);\par
\tab\}\par
\tab return output;\par
\}\par
function getDefensiveSTString(stats, name) \{\par
\tab var output = "&nbsp;";\par
\tab var index = stats.playerDefensiveSTName[0].indexOf(name);\par
\par
\tab if (index != -1) \{\par
\tab\tab var tk = stats.playerDefensiveSTStats[0][index][0];\par
\tab\tab var miss = stats.playerDefensiveSTStats[0][index][1];\par
\tab\tab\tab\par
\tab\tab output = "";\par
\tab\tab if (tk != 0) output += tk+" tkl";\par
\tab\tab if (miss != 0) \{\par
\tab\tab\tab if (output.length == 0) \{\par
\tab\tab\tab\tab output += "0 tkl";\par
\tab\tab\tab\}\par
\tab\tab\tab output += ", "+miss+" miss";\par
\tab\tab\}\par
\tab\}\par
\tab return output;\par
\}\par
function getKickingString(stats, name) \{\par
\tab var output = "&nbsp;";\par
\tab var index = stats.playerKickingName[0].indexOf(name);\par
\par
\tab if (index != -1) \{\par
\tab\tab var k = stats.playerKickingStats[0][index][0];\par
\tab\tab var y = stats.playerKickingStats[0][index][1];\par
\tab\tab var tb = stats.playerKickingStats[0][index][3];\par
\tab\tab\par
\tab\tab output = "";\par
\tab\tab if (k != 0) output += k+" att, "+(y/k).toFixed(1)+" avg";\par
\tab\tab if (tb != 0) output += ", "+tb+" tb";\par
\tab\}\par
\tab return output;\par
\}\par
function getPuntingString(stats, name) \{\par
\tab var output = "&nbsp;";\par
\tab var index = stats.playerPuntingName[0].indexOf(name);\par
\par
\tab if (index != -1) \{\par
\tab\tab var p = stats.playerPuntingStats[0][index][0];\par
\tab\tab var y = stats.playerPuntingStats[0][index][1];\par
\tab\tab var tb = stats.playerPuntingStats[0][index][3];\par
\tab\tab var in20 = stats.playerPuntingStats[0][index][4];\par
\tab\tab\par
\tab\tab output = "";\par
\tab\tab if (p != 0) output += p+" att, "+(y/p).toFixed(1)+" avg";\par
\tab\tab if (tb != 0) output += ", "+tb+" tb";\par
\tab\tab if (in20 != 0) output += ", "+in20+" in 20";\par
\tab\}\par
\tab return output;\par
\}\par
\par
function restructurePage() \{\par
\tab var div = document.createElement("div");\par
\tab div.setAttribute("id","restructure");\par
\tab\par
\tab var banner = document.createElement("div");\par
\tab banner.setAttribute("style","width:74%;height:80px;margin-left:auto;margin-right:auto;");\par
\tab\par
\tab var left = document.createElement("div");\par
\tab left.setAttribute("style","position:absolute;left:0px;width:250px;border:1px solid #000000;text-align:left;");\par
\tab left.setAttribute("class","content_container");\par
\tab\par
\tab var center = document.createElement("div");\par
\tab center.setAttribute("style","margin-left:249px;margin-right:250px;");\par
\tab\par
\tab var right = document.createElement("div");\par
\tab right.setAttribute("style","position:absolute;right:0px;width:250px;border:1px solid #000000;text-align:left;");\par
\tab right.setAttribute("class","content_container");\par
\tab\par
\tab var replay = document.getElementById("replay");\par
\tab var btn = document.createElement("div");\par
\tab btn.setAttribute("id","button_panel");\par
\tab btn.setAttribute("style","margin-left:25px;");\par
\tab\par
\tab var pn = document.getElementsByClassName("prev_next")[0];\par
\tab pn.parentNode.removeChild(pn);\par
\tab\par
\tab var teams = document.getElementsByClassName("team");\par
\tab left.appendChild(teams[0].parentNode.removeChild(teams[0]));\par
\tab var teams = document.getElementsByClassName("team");\par
\tab right.appendChild(teams[0].parentNode.removeChild(teams[0]));\par
\tab\par
\tab var content = document.getElementById("content");\par
\tab content.appendChild(div);\par
\par
\tab var info = document.getElementById("replay_info");\par
\tab var p = info.getElementsByClassName("small_head play");\par
\tab var dnd = p[0];\par
\tab var dsc = p[1];\par
\tab dnd.setAttribute("style","text-align:center;");\par
    if (alwaysShowPlayText == false) \{\par
    \tab dsc.setAttribute("style","text-align:center;visibility:hidden;");\par
    \}\par
    else \{\par
    \tab dsc.setAttribute("style","text-align:center");\par
    \}\par
\tab replay.insertBefore(dsc,replay.firstChild);\par
\tab replay.insertBefore(dnd,replay.firstChild);\par
\tab\par
\tab div.appendChild(banner);\par
\tab div.appendChild(left);\par
\tab center.appendChild(btn);\par
\tab center.appendChild(replay.parentNode.removeChild(replay));\par
\tab center.appendChild(info);\par
\tab div.appendChild(center);\par
\tab div.appendChild(right);\tab\par
\tab\par
\tab var control = document.getElementById("controls");\par
\tab for each (var c in control.childNodes) \{\par
\tab\tab if (c.text == "Pause") \{\par
\tab\tab\tab c.setAttribute("onclick","");\par
\tab\tab\tab c.setAttribute("onClick","");\par
\tab\tab\tab c.onclick = "";\par
\tab\tab\tab c.addEventListener("click",pauseReplay,true);\par
\tab\tab\}\par
\tab\tab if (c.text == "Play") \{\par
\tab\tab\tab c.setAttribute("onclick","");\par
\tab\tab\tab c.setAttribute("onClick","");\par
\tab\tab\tab c.onclick = "";\par
\tab\tab\tab c.addEventListener("click",playReplay,true);\par
\tab\tab\}\par
\tab\}\par
\}\par
\par
function playReplay() \{\par
\tab playPaused = false;\par
\tab if (playDone == false) \{\par
\tab\tab unsafeWindow.play();\par
\tab\}\par
\}\par
\par
function pauseReplay() \{\par
\tab //console.log(playPaused+" -- "+!playPaused);\par
\tab playPaused = !playPaused;\par
\tab if (playPaused == true) \{\par
\tab\tab unsafeWindow.pause();\par
\tab\}\par
\tab else \{\par
\tab\tab if (playDone == false) \{\par
\tab\tab\tab unsafeWindow.play();\par
\tab\tab\}\par
\tab\}\par
\}\par
\par
function handleFieldGoal(play) \{\par
\tab unsafeWindow.pause();\par
\tab unsafeWindow.currentFrame = 0;\par
\tab unsafeWindow.play_data = [unsafeWindow.play_data[0]];\par
\tab if (unsafeWindow.play_data[0] != null) \{\par
\tab\tab unsafeWindow.resetPlay();\par
\tab\tab unsafeWindow.play();\par
\tab\}\par
\tab\tab\par
\tab var p = plays[play];\par
\tab var shp = document.getElementsByClassName("small_head play");\par
\tab shp[0].innerHTML = p.timeRemaining+" "+p.down+" & "+p.togo+" on "+p.marker;\par
\tab shp[1].innerHTML = p.play;\par
\}\par
\par
function input(evt) \{\par
\tab if (postPlayTimer != null) \{\par
\tab\tab clearTimeout(postPlayTimer);\par
\tab\tab //console.log("postPlayTimer stopped");\par
\tab\tab postPlayTimer = null;\par
\tab\}\par
\tab\par
\tab clearInterval(playFinishedTimer);\par
\tab //console.log("playFinishedTimer stopped");\par
\tab playFinished = null;\par
\tab\par
\tab if (prePlayTimer != null) \{\par
\tab\tab clearTimeout(prePlayTimer);\par
\tab\tab //console.log("prePlayTimer stopped");\par
\tab\tab prePlayTimer = null;\par
\tab\}\par
\tab\par
\tab if (pauseCheckTimer != null) \{\par
\tab\tab clearTimeout(pauseCheckTimer);\par
\tab\tab //console.log("pauseCheckTimer stopped");\par
\tab\tab pauseCheckTimer = null;\par
\tab\}\par
\tab\par
\tab unsafeWindow.pause();\par
\tab evt.target.innerHTML = "Loading .";\par
\tab var id = evt.target.parentNode.getAttribute("id")+"";\par
\tab lastPlay = currentPlay;\par
\tab currentPlay = parseFloat(id);\par
\tab\par
\tab if (currentPlay == plays.length) \{\par
\tab\tab currentPlay--;\par
\tab\tab assignButtons();\par
\tab\tab return;\par
\tab\}\par
\tab\par
\tab var address = plays[currentPlay].replay+"";\par
\tab\par
\tab if (address == "[object XPCNativeWrapper [object Text]]") \{\par
\tab\tab handleFieldGoal(currentPlay);\par
\tab\tab assignButtons();\par
\tab\tab setTimeout(playIsFinished, 6000);\par
\tab\tab //console.log("playIsFinishedTimer started");\par
\tab\}\par
\tab else \{\par
\tab\tab if (httpRequest != null) \{\par
\tab\tab\tab httpRequest.abort();\par
\tab\tab\}\par
\tab\tab httpRequest = getInetPage(address,change, evt.target);\par
\tab\}\par
\}\par
\par
function getButton(name,id) \{\par
\tab var div = document.createElement("div");\par
\tab var a = document.createElement("a");\par
\tab a.innerHTML = name;\par
\tab div.setAttribute("class","tab");\par
\tab div.setAttribute("id",id);\par
\tab div.addEventListener("click",input,true);\par
\tab div.appendChild(a);\par
\tab if ((id >= plays.length) || (id == currentPlay) || (id < 0)) \{\par
\tab\tab var s = div.getAttribute("style");\par
\tab\tab if (s == null) s = "";\par
\tab\tab div.setAttribute("style","visibility:hidden;"+s);\par
\tab\}\par
\tab return div;\par
\}\par
\par
function assignButtons() \{\par
\tab var nextButton = null;\par
\tab var prevButton = null;\par
\tab\par
\tab var buttons = document.getElementsByClassName("tab");\par
\tab while (buttons.length != 0) \{\par
\tab\tab buttons[0].parentNode.removeChild(buttons[0]);\par
\tab\tab buttons = document.getElementsByClassName("tab");\par
\tab\}\par
\tab var saved = autoplay;\par
\tab var check = document.getElementById("autoplay");\par
\tab if (check != null) \{\par
\tab\tab saved = check.checked;\par
\tab\tab check.parentNode.removeChild(check);\par
\tab\}\par
\tab\tab\par
\tab var prevPossButton = getButton("< Prev Poss",findPoss(currentPlay,-99));\par
\tab var prevButton = getButton("< Prev Play",currentPlay-1);\par
\tab var nextButton = getButton("Next Play >",currentPlay+1);\par
\tab var nextPossButton = getButton("Next Poss >",findPoss(currentPlay,99));\par
\tab var autoplayBox = document.createElement("input");\par
\tab autoplayBox.setAttribute("id","autoplay");\par
\tab autoplayBox.setAttribute("type","checkbox");\par
\tab autoplayBox.checked = saved;\par
\tab\par
\tab var buttonPanel = document.getElementById("button_panel");\par
\tab buttonPanel.appendChild(prevPossButton);\par
\tab buttonPanel.appendChild(prevButton);\par
\tab buttonPanel.appendChild(nextButton);\par
\tab buttonPanel.appendChild(nextPossButton);\par
\tab buttonPanel.appendChild(autoplayBox);\par
\}\par
\par
function findPoss(idx, direction) \{\par
\tab var play = plays[idx];\par
\tab var currTeam = play.team;\par
\tab\par
\tab if (direction > 0) \{\par
\tab\tab for (var i=idx+1; i<plays.length; i++) \{\par
\tab\tab\tab if (plays[i].team != currTeam) \{\par
\tab\tab\tab\tab return i;\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab return idx;\par
\tab\}\par
\tab else if (direction < 0) \{\par
\tab\tab var i = idx;\par
\tab\tab //console.log("curr="+plays[i]);\par
\tab\tab for (i=i; i>0; i--) \{\par
\tab\tab\tab if (plays[i].team != currTeam) \{\par
\tab\tab\tab\tab //console.log("prev1="+plays[i]);\par
\tab\tab\tab\tab break;\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab for (i=i-1; i>0; i--) \{\par
\tab\tab\tab if (plays[i].team == currTeam) \{\par
\tab\tab\tab\tab //console.log("prev2="+plays[i+1]);\par
\tab\tab\tab\tab return i+1;\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab return 0;\par
\tab\}\par
\tab return 0;\par
\}\par
\par
function changeInfo(page) \{\par
\tab var div = document.createElement("div");\par
\tab div.innerHTML = page.responseText;\par
\tab\par
\tab var newteams = div.getElementsByClassName("team");\par
\tab var teams = document.getElementsByClassName("team");\par
\tab teams[0].innerHTML = newteams[0].innerHTML;\par
\tab teams[1].innerHTML = newteams[1].innerHTML;\par
\tab\par
\tab var newinfo = div.getElementsByClassName("small_head play")\par
\tab var info = document.getElementsByClassName("small_head play")\par
\tab info[0].innerHTML = newinfo[0].innerHTML+"&nbsp;&nbsp;";\par
    if (alwaysShowPlayText == false) \{\par
    \tab info[1].setAttribute("style","text-align:center;visibility:hidden;");\par
    \}\par
    else \{\par
    \tab info[1].setAttribute("style","text-align:center;");\par
    \}\par
\tab info[1].innerHTML = newinfo[1].innerHTML;\par
\par
\tab var link = document.getElementById("pbrlink");\par
\tab if (link != null) \{\par
\tab\tab link.parentNode.removeChild(link);\par
\tab\}\par
\tab link = document.createElement("a");\par
\tab link.id = "pbrlink";\par
\tab link.innerHTML = "(link)";\par
\tab link.href = plays[currentPlay].replay;\par
\tab info[0].appendChild(link);\par
\}\par
\par
function changePlays(page) \{\par
\tab var temp = [];\par
\tab temp.responseText = document.getElementsByTagName("body")[0].innerHTML; \par
\tab changeInfo(temp);\par
\tab var idx = page.responseText.indexOf("var players =");\par
\tab if (idx != -1) \{\par
\tab\tab var p = page.responseText.slice(idx+"var players =".length);\par
\tab\tab p = p.slice(0,p.indexOf("var play_data"));\par
\tab\tab var pd = page.responseText.slice(page.responseText.indexOf("var play_data =")+"var play_data =".length);\par
\tab\tab pd = pd.slice(0,pd.indexOf(";"));\par
\tab\tab\par
\tab\tab var newplayers = null;\par
\tab\tab var newplay_data = null;\par
\tab\tab eval("newplayers = "+p);\par
\tab\tab newplay_data = eval(pd);\par
\tab\tab\par
\tab\tab unsafeWindow.pause();\par
\tab\tab if (newplayers != null) unsafeWindow.players = newplayers;\par
\tab\tab if (newplay_data != null) unsafeWindow.play_data = newplay_data;\par
\tab\tab\tab\par
\tab\tab myCurrentFrame = 0;\par
\tab\tab unsafeWindow.currentFrame = myCurrentFrame;\tab\par
\tab\tab unsafeWindow.initialize();\par
\tab\tab unsafeWindow.resetPlay();\par
\tab\tab unsafeWindow.updateFrame();\par
\tab\tab\par
\tab\tab runOtherScripts();\par
\tab\tab prePlayTimer = setTimeout(beginPlay,preDelay);\par
\tab\tab //console.log("prePlayTimer started");\par
\par
        if (alwaysPause == true) \{\par
            playPaused = false;\par
            pauseReplay();\par
        \}\par
 \tab\}\par
\tab else \{\par
\tab\tab //console.log(page+" is not a good page");\par
\tab\tab unsafeWindow.pause();\par
\tab\}\par
\}\par
\par
function beginPlay() \{\par
\tab //console.log("beginPlay");\par
\tab if (postPlayTimer != null) \{\par
\tab\tab clearTimeout(postPlayTimer);\par
\tab\tab //console.log("postPlayTimer stopped");\par
\tab\tab postPlayTimer = null;\par
\tab\}\par
\tab if (playPaused == true) \{\par
\tab\tab clearTimeout(pauseCheckTimer);\par
\tab\tab //console.log("pauseCheckTimer stopped");\par
\tab\tab pauseCheckTimer = setTimeout(beginPlay,3000);\par
\tab\tab //console.log("pauseCheckTimer started");\par
\tab\tab return;\par
\tab\}\par
\tab //console.log("beginPlay says: "+unsafeWindow.currentFrame+" ||| mcf "+myCurrentFrame);\par
\tab myCurrentFrame = 0;\par
\tab\par
    runOtherScripts();\par
\tab unsafeWindow.play();\par
\tab\par
\tab playerGraphicsUpdate();\par
\tab\par
\}\par
\par
function playIsFinished() \{\par
\tab //console.log("playIsFinished : "+unsafeWindow.currentFrame+" | mcf "+myCurrentFrame);\par
\tab if (postPlayTimer != null) \{\par
\tab\tab clearTimeout(postPlayTimer);\par
\tab\tab //console.log("postPlayTimer stopped");\par
\tab\tab postPlayTimer = null;\par
\tab\}\par
\tab if (playPaused == true) \{\par
\tab\tab clearTimeout(pauseCheckTimer);\par
\tab\tab //console.log("pauseCheckTimer stopped");\par
\tab\tab pauseCheckTimer = setTimeout(playIsFinished,3000);\par
\tab\tab //console.log("pauseCheckTimer started");\par
\tab\tab return;\par
\tab\}\par
\tab playDone = false;\par
\tab if (document.getElementById("autoplay").checked == false) \{\par
\tab\tab //console.log("autoplay is false, restarting play");\par
\tab\tab myCurrentFrame = 0;\par
\tab\tab unsafeWindow.currentFrame = myCurrentFrame;\tab\par
\tab\tab unsafeWindow.initialize();\par
\tab\tab unsafeWindow.resetPlay();\par
\tab\tab unsafeWindow.updateFrame();\par
\tab\tab beginPlay();\par
\tab\}\par
\tab else \{\par
        var buttons = document.getElementsByClassName("tab");\par
\tab\tab for each (var b in buttons) \{\par
            if(b.innerHTML.indexOf("Next Play")!=-1) \{\par
            \tab var evt = [];\par
            \tab evt.target = b.firstChild;\par
            \tab input(evt);\par
            \}\par
\tab\tab\}\par
\tab\}\par
\}\par
\par
function isPlayFinished() \{\tab\par
\tab //console.log("isPlayFinished : "+unsafeWindow.currentFrame+" --- mcf="+myCurrentFrame);\par
\tab if (postPlayTimer != null) \{\par
\tab\tab return;\par
\tab\}\par
\tab if (playPaused == true) \{\par
\tab\tab return;\par
\tab\}\par
\tab if (playDone == true) \{\par
\tab\tab playDone = false;\par
\tab\tab if ((postPlayTimer == null) && (playFinishedTimer != null)) \{\par
\tab\tab\tab postPlayTimer = setTimeout(playIsFinished,postDelay);\par
\tab\tab\tab //console.log("postPlayTimer started");\par
\tab\tab\}\par
\tab\}\par
\}\par
\par
function drawBall() \{\par
\tab var playerId = null;\par
\tab var pd = unsafeWindow.play_data;\par
\tab var frame = unsafeWindow.currentFrame;\par
\tab var b = pd[frame];\par
\tab if (b == null) \{\par
\tab\tab playDone = true;\par
\tab\tab return;\par
\tab\}\par
\tab b = b[0];\par
\tab\par
\tab var el = document.getElementById("pbrball");\par
\tab if (el != null) \{\par
\tab\tab s = el.parentNode.lastChild.innerHTML;\par
\tab\tab var idx = s.indexOf("player_id=")+"player_id=".length;\par
\tab\tab var idx2 = s.slice(idx).indexOf('"');\par
\tab\tab var id = s.slice(idx,idx+idx2);\par
\tab\tab id = parseInt(id);\par
\tab\tab var unchanged = pd[frame].some(\par
\tab\tab\tab function(el) \{ \par
\tab\tab\tab\tab if (el.id != id) return false;\par
\tab\tab\tab\tab if (el.x != b.x) return false;\par
\tab\tab\tab\tab if (el.y != b.y) return false;\par
\tab\tab\tab\tab return true;\par
\tab\tab\tab\}\par
\tab\tab );\par
\tab\tab if (unchanged == true) return;\par
\tab\}\par
\tab\par
\tab var poss = pd[frame].filter(\par
\tab\tab function(el) \{\par
\tab\tab\tab if (el.x != b.x) return false;\par
\tab\tab\tab if (el.y != b.y) return false;\par
\tab\tab\tab return true;\par
\tab\tab\}\par
\tab );\par
\tab if (poss.length > 1) playerId = poss[1].id;\par
\par
\tab if (el != null) \{\par
\tab\tab el.parentNode.removeChild(el);\par
\tab\}\par
\tab if (playerId != null) \{\par
\tab\tab for each (var l in document.links) \{\tab\tab\tab\par
\tab\tab\tab var s = "player_id="+playerId;\par
\tab\tab\tab if ((l+"").indexOf(s) != -1) \{\par
\tab\tab\tab\tab var div = document.createElement('div');\par
\tab\tab\tab\tab div.id = 'pbrball';\par
\tab\tab\tab\tab div.className = 'player_icon';\par
\tab\tab\tab\tab div.innerHTML = '<img src="/images/ball.gif">';\par
\tab\tab\tab\tab l.parentNode.parentNode.insertBefore(div, l.parentNode.parentNode.firstChild);\par
\tab\tab\tab\tab break;\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\}\par
\}\par
\par
unsafeWindow.positionFrame = function () \{\par
\tab var ball = unsafeWindow.$('ball');\par
\tab\par
\tab var y_spot = parseInt(ball.style.top);\par
\tab if (y_spot <= 200) \{\par
\tab\tab unsafeWindow.$('replay_area').style.top = '0px';\par
\tab\}\par
\tab else if (y_spot >= 880) \{\par
\tab\tab unsafeWindow.$('replay_area').style.top = '-680px';\par
\tab\}\par
\tab else \{\par
\tab\tab unsafeWindow.$('replay_area').style.top = '-' + (y_spot - 200) + 'px';\par
\tab\}\par
\}\par
\par
unsafeWindow.nextFrame = function () \{\tab\par
\tab drawBall();\par
\tab\par
\tab if (unsafeWindow.frameSpeed == 50) \{ //20fps\par
\tab\tab myCurrentFrame += 0.5;\par
\tab\tab unsafeWindow.currentFrame = myCurrentFrame;\par
\tab\}\par
\tab else \{ //10fps\par
\tab\tab myCurrentFrame++;\par
\tab\tab unsafeWindow.currentFrame = myCurrentFrame;\par
\tab\}\par
\tab //console.log(unsafeWindow.currentFrame+" --- "+unsafeWindow.play_data.length);\par
\tab if (myCurrentFrame < unsafeWindow.play_data.length) \{\par
\tab\tab unsafeWindow.updateFrame();\par
\tab\}\par
\tab else \{\par
\tab\tab console.log("done? : "+\tab myCurrentFrame+" --- "+unsafeWindow.currentFrame+" --- "+unsafeWindow.play_data.length);\par
\par
\tab\tab unsafeWindow.pause();\par
\tab\tab playDone = true;\par
\tab\tab var p = document.getElementsByClassName("play");\par
\tab\tab p[1].setAttribute("style","text-align:center;");\par
\tab\}\par
\}\par
\par
unsafeWindow.initialize = function () \{\par
\tab var repdiv = document.getElementsByClassName("player_icon_overlay");\par
\tab while (repdiv.length != 0) \{\par
\tab\tab repdiv[0].parentNode.removeChild(repdiv[0]);\par
\tab\}\par
\tab var repdiv = document.getElementsByClassName("player_icon");\par
\tab while (repdiv.length != 0) \{\par
\tab\tab repdiv[0].parentNode.removeChild(repdiv[0]);\par
\tab\}\par
\tab\par
\tab if (unsafeWindow.play_data.length > 0) \{\par
\tab\tab for (var i = 1; i < unsafeWindow.play_data[0].length; i++) \{\par
\tab\tab\tab var data = unsafeWindow.play_data[0][i];\par
\tab\tab\tab unsafeWindow.drawPlayer(data.id, data.x, data.y);\par
\tab\tab\}\par
\tab\tab // Draw ball\par
\tab\tab unsafeWindow.drawPlayer('ball', unsafeWindow.play_data[0][0].x, \par
\tab\tab\tab\tab\tab unsafeWindow.play_data[0][0].y);\par
\tab\}\par
\tab else \{\par
\tab\tab console.log("timeout called");\par
\tab\tab playDone = true;\par
\tab\tab var p = plays[currentPlay];\par
\tab\tab var shp = document.getElementsByClassName("small_head play");\par
\tab\tab shp[0].innerHTML = p.timeRemaining+" "+p.down+" & "+p.togo+" on "+p.marker;\par
\tab\tab shp[1].innerHTML = p.play;\par
\tab\tab shp[1].setAttribute("style","text-align:center;");\par
\tab\tab isPlayFinished();\par
\tab\}\par
\}\par
\tab\par
\tab\par
function runOtherScripts() \{\par
    if (alternatePlayers == true) \{\par
    \tab playerGraphicsUpdate();\par
    \}\par
\tab if (highlightPlayers == true) \{\par
\tab\tab // highlight my players\par
\tab\tab pbr_replay_highlight_main();\par
\tab\}\par
\par
\tab //needed for first down marker\par
\tab var play_data = unsafeWindow.play_data;\par
\tab var currentFrame = unsafeWindow.currentFrame;\par
\tab\par
\tab // ------- copied from GLB javascript, originally by tciss -------------------\par
\tab var fdcolor = "yellow";\par
\tab var play_container = document.getElementById("replay_area");\par
\tab var dirt = document.getElementsByClassName("play");\par
\tab var dir = dirt[0];\par
\tab var dirText = dir.innerHTML;\par
\tab var ytg = "";\par
\tab if(dirText.indexOf(" inches ")!=-1) \{\par
\tab\tab var ytg = '.3';\par
\tab\}\par
\tab else \{   \par
\tab\tab if(dirText.indexOf(" G on ")!=-1) \{\par
\tab\tab\tab // later\par
\tab\tab\}\par
\tab\tab else \{\par
\tab\tab\tab var p2 = dirText.indexOf(" &amp; ")+7;\par
\tab\tab\tab var p1 = dirText.indexOf(" on ");\par
\tab\tab\tab var ytg = dirText.substring(p2,p1);\par
\tab\tab\tab if (dirText.substring(5,p2).indexOf("4") != -1) \{\par
\tab\tab\tab\tab fdcolor = "red";\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\}\par
\tab // ----------------- end -------------------\par
\tab\par
\par
\tab //line of scrimmage\par
\tab var greater=0;\par
\tab for (var i=1; i<play_data[0].length; i++) \{\par
\tab\tab if (play_data[0][i].y > play_data[0][0].y) greater++;\par
\tab\tab else greater--;\par
\tab\}\par
\tab var diff = (greater / Math.abs(greater))*(12+3 + 0*9);\par
\tab var los = parseFloat(play_data[0][0].y) * 3;\par
\tab\par
\tab var ls = document.getElementById("los");\par
\tab if (ls != null) \{\par
\tab\tab ls.parentNode.removeChild(ls);\par
\tab\}\par
\tab var div = document.createElement('div');\par
\tab div.id = 'los';\par
\tab div.className = 'player_icon';\par
\tab div.style.top  = (los + diff) + 'px';\par
\tab div.style.width = '480px';\par
\tab div.style.height = '2px';\par
\tab div.style.backgroundColor = 'blue';\par
\tab var s = div.getAttribute("style");\par
\tab s += "z-index:"+(playerLayerZ-1)+";";\par
\tab div.setAttribute("style",s);\par
\tab div.style.zIndex = playerLayerZ-1;\par
\tab play_container.appendChild(div);\par
\tab //end los\par
\tab\par
\tab //first down marker\par
\tab var fdm = document.getElementById("fdm");\par
\tab if (fdm != null) \{\par
\tab\tab fdm.parentNode.removeChild(fdm);\par
\tab\}\par
\tab var diff = (greater / Math.abs(greater))*(12+3 + ytg*9);\par
\tab var los = parseFloat(play_data[0][0].y) * 3;\par
\tab var div = document.createElement('div');\par
\tab div.id = 'fdm';\par
\tab div.className = 'player_icon';\par
\tab div.style.top  = (los + diff) + 'px';\par
\tab div.style.width = '480px';\par
\tab div.style.height = '2px';\par
\tab div.style.backgroundColor = fdcolor;\par
\tab var s = div.getAttribute("style");\par
\tab s += "z-index:"+(playerLayerZ-1)+";";\par
\tab div.setAttribute("style",s);\par
\tab div.style.zIndex = playerLayerZ-1;\par
\tab play_container.appendChild(div);\par
\tab //end fdm\par
\}\par
\par
function change(address, page) \{\par
\tab clearTimeout(postPlayTimer);\par
\tab //console.log("postPlayTimer stopped");\par
\tab httpRequest = null;\par
\tab assignButtons();\par
\tab changeInfo(page);\tab\par
\tab changePlays(page);\par
\tab updateScoreboard();\par
\tab playFinishedTimer = setInterval(isPlayFinished,3000);\par
\tab //console.log("playFinishedTimer started");\par
\}\par
\par
function pbp() \{\par
\tab var href = window.location.toString();\par
\tab href = href.replace("replay.pl","game.pl");\par
\tab\par
\tab var idx = href.indexOf("&pbp_id");\par
\tab href = href.slice(0,idx) + "&mode=pbp";\par
\par
\tab getInetPage(href,pbpHandler);\par
\}\par
\par
function pbpHandler(address, page) \{\par
\tab var prev = null;\par
\tab var next = null;\par
\tab loadPBPSimple(page);\par
\tab\par
\tab for (var i=0; i<plays.length-1; i++) \{\par
\tab\tab if (plays[i].replay == window.location.href) \{\par
\tab\tab\tab currentPlay = i;\par
\tab\tab\tab break;\par
\tab\tab\}\par
\tab\}\par
\tab loadScoreboard(page);\par
\tab updateScoreboard();\par
\tab assignButtons(currentPlay-1, currentPlay+1);\par
\par
\tab var clr = document.getElementsByClassName("clear");\par
\tab for each (var c in clr) \{\par
\tab\tab if (c == null) continue;\par
\tab\tab c.parentNode.removeChild(c);\par
\tab\}\par
\tab var p = eval(page);\par
\tab p.responseText = document.getElementsByTagName("body")[0].innerHTML;\par
\tab changePlays(p);\par
\}\par
\par
function updateScoreboard() \{\par
\tab var last = lastPlay;\par
\tab var curr = currentPlay;\par
\tab\par
\tab var p = plays[curr];\par
\tab\par
\tab var thisQuarter = document.getElementById("sb: "+(p.quarter-1)+" "+p.team);\par
\tab var qscore = parseFloat(thisQuarter.innerHTML);\par
\tab if (isNaN(qscore) == true) qscore = 0;\par
\tab\par
\tab var thisTotal = document.getElementById("sb: 5 "+p.team);\par
\tab var tscore = parseFloat(thisTotal.innerHTML);\par
\tab if (isNaN(tscore) == true) tscore = 0;\par
\tab\par
\tab var count = curr-last;\par
\tab if (count > 0) \{\par
\tab\tab for (var i=Math.max(0,last); i!=curr; i++) \{\par
\tab\tab\tab var play = plays[i];\par
\par
\tab\tab\tab var thisQuarter = document.getElementById("sb: "+(play.quarter-1)+" "+play.team);\par
\tab\tab\tab if (thisQuarter.innerHTML == "-") thisQuarter.innerHTML = 0;\par
\tab\par
\tab\tab\tab var thisTotal = document.getElementById("sb: 5 "+play.team);\par
\tab\tab\tab if (thisTotal.innerHTML == "-") thisTotal.innerHTML = 0;\par
\tab\tab\tab\par
\tab\tab\tab if (play.score != 0) \{\par
\tab\tab\tab\tab var qscore = parseFloat(thisQuarter.innerHTML);\par
\tab\tab\tab\tab if (isNaN(qscore) == true) qscore = 0;\par
\tab\tab\tab\tab qscore += play.score;\par
\tab\tab\tab\tab thisQuarter.innerHTML = qscore;\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab var tscore = parseFloat(thisTotal.innerHTML);\par
\tab\tab\tab\tab if (isNaN(tscore) == true) tscore = 0;\par
\tab\tab\tab\tab tscore += play.score;\par
\tab\tab\tab\tab thisTotal.innerHTML = tscore;\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\}\par
\tab else \{\par
\tab\tab for (var i=last-1; i>=curr; i--) \{\par
\tab\tab\tab var play = plays[i];\par
\tab\tab\tab var thisQuarter = document.getElementById("sb: "+(play.quarter-1)+" "+play.team);\par
\tab\tab\tab var thisTotal = document.getElementById("sb: 5 "+play.team);\par
\tab\tab\tab\par
\tab\tab\tab if (play.score != 0) \{\par
\tab\tab\tab\tab var qscore = parseFloat(thisQuarter.innerHTML);\par
\tab\tab\tab\tab if (isNaN(qscore) == true) qscore = 0;\par
\tab\tab\tab\tab qscore -= play.score;\par
\tab\tab\tab\tab thisQuarter.innerHTML = qscore;\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab var tscore = parseFloat(thisTotal.innerHTML);\par
\tab\tab\tab\tab if (isNaN(tscore) == true) tscore = 0;\par
\tab\tab\tab\tab tscore -= play.score;\par
\tab\tab\tab\tab thisTotal.innerHTML = tscore;\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\}\par
\par
\tab var clock = document.getElementsByClassName("clock");\par
\tab var shp = document.getElementsByClassName("small_head play");\par
\tab var t = shp[0].innerHTML;\par
\tab clock[1].innerHTML = t.split(" ")[0];\par
\tab\par
\tab restructureInfo();\par
\par
\tab yac_main(unsafeWindow.players, unsafeWindow.play_data);\tab\par
\}\par
\par
function loadScoreboard(page) \{\par
\tab var div = document.createElement("div");\par
\tab div.innerHTML = page.responseText;\par
\par
\tab var css = document.createElement("link");\par
\tab css.setAttribute("href","/css/game/game.css");\par
\tab css.setAttribute("type","text/css");\par
\tab css.setAttribute("rel","stylesheet");\par
\tab var head = document.getElementsByTagName("head");\par
\tab head[0].appendChild(css);\par
\tab\par
\tab var scoreboard = findChild("scoreboard",div);\par
\tab var d = document.createElement("div");\par
\tab d.setAttribute("id","scoreboard");\par
\par
\tab //fix scores\par
\tab var quarters = scoreboard.getElementsByClassName("quarter");\par
\tab for (var i=0; i<quarters.length; i++) \{\par
\tab\tab var q = quarters[i];\par
\tab\tab var parent = q.parentNode;\par
\tab\tab var tm = parent.getElementsByClassName("team_name");\par
\tab\tab tm = tm[0].firstChild.innerHTML;\par
\tab\tab if (q.parentNode.className.indexOf("alternating_color") == 0) \{\par
\tab\tab\tab q.innerHTML = "-";\par
\tab\tab\tab q.setAttribute("id","sb: "+(i%5)+" "+tm);\par
\tab\tab\}\par
\tab\}\tab\par
\tab var totals = scoreboard.getElementsByClassName("total");\par
\tab for (var i=0; i<totals.length; i++) \{\par
\tab\tab var t = totals[i];\par
\tab\tab var parent = t.parentNode;\par
\tab\tab var tm = parent.getElementsByClassName("team_name");\par
\tab\tab tm = tm[0].firstChild.innerHTML;\par
\tab\tab if (t.parentNode.className.indexOf("alternating_color") == 0) \{\par
\tab\tab\tab t.innerHTML = "-";\par
\tab\tab\tab t.setAttribute("id","sb: 5 "+tm);\par
\tab\tab\}\par
\tab\}\par
\tab d.innerHTML = scoreboard.innerHTML.replace("team_row winner","team_row");\par
\par
\tab var parent = document.getElementById("restructure");\par
\tab parent.firstChild.appendChild(d);\tab\par
\}\par
}
