// ==UserScript==
// @name           Custom Graphics On Replay
// @namespace      pbr/cgor
// @include        http://*goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.08.13b
// @require        http://userscripts.org/scripts/source/54630.user.js
// ==/UserScript==

const scriptName = "Custom Graphics";
const scriptVersion = "09.08.13b";
const scriptWebpage = "http://userscripts.org/scripts/show/54524";

// XML stadium descriptions are at the bottom of this file
var useXMLDescription = true;
var useRemoteXML = true;

// if XML descriptions = true, set the booleans to image types you want to see.
// if XML descriptions = false, set the booleans to image types you want to see and set the addresses here.
// 1080x480
var enableFieldLayer = true;
var fieldImage = "http://img242.imageshack.us/img242/6797/fieldnewbasefixedkp2.png";

// 1080x480
var enableLineLayer = true;
var lineImage = "http://img527.imageshack.us/img527/3776/glblinesyk7.png";

// 480x91 including outline
var enableLowerDecalLayer = true;
var northEndZoneImage = "http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-top.jpg";
var southEndZoneImage = "http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-bottom.jpg";

// x & y size MUST be set to the size of your image
var enableMiddleDecalLayer = true;
var middleDecalImage = "http://img184.imageshack.us/img184/320/glblogotx0.png";
var middleDecalImageX = 224; //set to the x-axis length of your image if not using xml
var middleDecalImageY = 140; //set to the y-axis length of your image if not using xml

// 1080x480
var enableUpperDecalLayer = false;
var upperDecalImage = "http://img515.imageshack.us/img515/9223/glboverlaymappedto100vu7.png";

// you can modify the previous variables

// don't screw with these
var hometeam = unsafeWindow.home;
var runUpdate = fieldGraphicsUpdate;

window.setTimeout( function() {
    init();
}, 100);

function activate(e) {
    console.log("activate custom graphics");

    lock();

    var inp = document.getElementById("use_graphics");
    if (inp == null) {
        var br = document.createElement("br");
        inp = document.createElement("input");
        inp.id = "use_graphics";
        inp.type = "checkbox";
        var data = "0";
        if (GM_getValue) {
            data = GM_getValue("use_graphics",0);
            if (data == "1") {
                inp.checked = true;
            }
        }

        var text = document.createElement("text");
        text.textContent = " Use default field";

        var footer = document.getElementById("replay_footer");
        footer.style.height = "68px";

        var options = document.getElementById("color_options");
        options.appendChild(br);
        options.appendChild(inp);
        options.appendChild(text);

        inp.addEventListener("click",boxClicked,false);
    }

    if (inp.checked == false) {
        runUpdate();
    }
    unlock();
}

function boxClicked(e) {
    lock();
    if (e.target.checked == false) {
        if (GM_setValue) {
            GM_setValue("use_graphics",0);
        }

        var addr = window.location.toString();
        addr = addr.split("game")[0]+"game/team.pl?team_id="+hometeam;
	    getInetPage(addr, remoteXMLHandler, null);
    }
    else {
        if (GM_setValue) {
            GM_setValue("use_graphics",1);
        }

        var ids = ["upperdecals","middledecals","lowerdecals","linelayer"];
        for (var i=0; i<ids.length; i++) {
            var div = document.getElementById(ids[i]);
            if (div != null) {
                div.parentNode.removeChild(div);
            }
        }

        var saved = useRemoteXML;
        useRemoteXML = false;
        fieldGraphicsUpdate("<root><team id='"+hometeam+"'><field>http://goallineblitz.com/images/field.jpg</field></team></root>");
        useRemoteXML = saved;
    }
}

function remoteXMLHandler(addr, page) {
    //console.log(page.responseText);
    var xmlDesc = null;
    var src = page.responseText.split('<div id="team_note_content"');
    if (src.length > 1) {
        src = '<div id="team_note_content"'+src[1];
        src = src.split("</div>")[0]+"</div";
        var div = document.createElement("div");
        div.innerHTML = src;
        src = div.textContent;
        //console.log(src);

        xmlDesc = '<root><team id="'+hometeam+'">';
        var found = false;
        var tags = ["field","north","south","middle","upper"];
        for (var i=0; i<tags.length; i++) {
            var layer = "";
            var start = src.indexOf("<"+tags[i]);
            if (start != -1) {
                var end = src.indexOf("</"+tags[i]+">")+("</"+tags[i]+">").length;
                layer = src.slice(start, end);
                xmlDesc += layer;
                found = true;
            }
            //console.log(start+" -- "+end+" : "+layer);
        }
        if (found == true) {
            xmlDesc += '</team></root>';
        }
        else {
            xmlDesc = null;
        }
    }
    else if (useXMLDescription == true) {
        console.log("No remote XML source. Using xmlDescription.");
    }
    
    var saved = useRemoteXML;
    useRemoteXML = false;
    fieldGraphicsUpdate(xmlDesc);
    useRemoteXML = saved;
}

function fieldGraphicsUpdate(xml) {
    console.log("xml="+xml);
    if (useRemoteXML == true) {
//        console.log("hometeam="+hometeam);
        var addr = window.location.toString();
        addr = addr.split("game")[0]+"game/team.pl?team_id="+hometeam;

	    getInetPage(addr, remoteXMLHandler, null);
        return;
    }

    if (xml != null) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xml, "application/xml");
        var teams = xmlDoc.getElementsByTagName("team");
        console.log("Remote XML: "+hometeam);
        var found = false;
        for (var i=0; i<teams.length; i++) {
            var t = teams[i];
            if (t.getAttribute("id") == hometeam) {
                if (setImages(t) == true) {
                    fieldGraphicsInsert();
                    found = true;
                    break;
                }
            }
        }
        if (found == false) {
            for (var i=0; i<teams.length; i++) {
                var t = teams[i];
                if (t.getAttribute("id") == "-1") {
                    if (setImages(t) == true) {
                        fieldGraphicsInsert();
                        break;
                    }
                }
            }
        }
    }
    else if (useXMLDescription == true) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xmlDescription, "application/xml");
        var teams = xmlDoc.getElementsByTagName("team");
        console.log("Local XML: "+hometeam+": number of teams in XML = "+teams.length);
        var found = false;
        for (var i=0; i<teams.length; i++) {
            var t = teams[i];
            if (t.getAttribute("id") == hometeam) {
                if (setImages(t) == true) {
                    fieldGraphicsInsert();
                    found = true;
                    break;
                }
            }
        }
        if (found == false) {
            for (var i=0; i<teams.length; i++) {
                var t = teams[i];
                if (t.getAttribute("id") == "-1") {
                    if (setImages(t) == true) {
                        fieldGraphicsInsert();
                        break;
                    }
                }
            }
        }
    }
    else {
        fieldGraphicsInsert();
    }
}

function setImages(t) {
    var change = false;
    var f = t.getElementsByTagName("field")[0];
    if (f != null) {
        fieldImage = f.textContent;
    	if (f.textContent.length == 0) fieldImage = null;
        change = true;
    }
    else fieldImage = null;

    var l = t.getElementsByTagName("line")[0];
    if (l != null) {
        lineImage = l.textContent;
        if (l.textContent.length == 0) lineImage = null;
        change = true;
    }
    else lineImage = null;

    var n = t.getElementsByTagName("north")[0];
    if (n != null) {
        northEndZoneImage = n.textContent;
    	if (n.textContent.length == 0) northEndZoneImage = null;
        change = true;
    }
    else northEndZoneImage = null;

    var s = t.getElementsByTagName("south")[0];
    if (s != null) {
        southEndZoneImage = s.textContent;
    	if (s.textContent.length == 0) southEndZoneImage = null;
        change = true;
    }
    else southEndZoneImage = null;

    var u = t.getElementsByTagName("upper")[0];
    if (u != null) {
        upperDecalImage = u.textContent;
        if (u.textContent.length == 0) upperDecalImage = null;
        change = true;
    }
    else upperDecalImage = null;

    var m = t.getElementsByTagName("middle")[0];
    if (m != null) {
        middleDecalImage = m.textContent;
        if (m.textContent.length == 0) middleDecalImage = null;
        else {
            middleDecalImageX = parseInt(m.getAttribute("xsize"));
            middleDecalImageY = parseInt(m.getAttribute("ysize"));
            change = true;
            if ((middleDecalImageX == null) || (middleDecalImageY == null)) {
                alert("Replay Rewrite: Image sizes for middle decal aren't included! Fix it!")
                change = false;
            }
        }
    }
    else middleDecalImage = null;

    //console.log(middleDecalImage+" --- "+middleDecalImageX);
    return change;
}

function fieldGraphicsInsert() {
	if ((enableFieldLayer == true) && (fieldImage != null)) {
        var field = document.getElementById("replay_area");
        field.style.backgroundImage = "url("+fieldImage+")";
	}

    if ((enableLowerDecalLayer == true) && (northEndZoneImage != null) && (southEndZoneImage != null)) {
		var d = document.getElementById("lowerdecals");
		if (d == null) {
			var repdiv = document.getElementById("replay_area");
			var parstyle = repdiv.getAttribute("style");
			if (parstyle == null) parstyle = "";

			div = document.createElement("div");
			div.setAttribute("style","position:absolute; z-index:"+lowerDecalLayerZ+";");
			div.setAttribute("id","lowerdecals");
			div.zIndex=lowerDecalLayerZ;

			var img = document.createElement("img");
			img.src = northEndZoneImage;
			img.setAttribute("style","position: absolute; top:0px; left:0px; z-index:"+lowerDecalLayerZ+";");
			img.zIndex=lowerDecalLayerZ;
			div.appendChild(img);

			var img = document.createElement("img");
			img.src = southEndZoneImage;
			img.setAttribute("style","position: absolute; top:988px; left:0px; z-index:"+lowerDecalLayerZ+";");
			img.zIndex=lowerDecalLayerZ;
			div.appendChild(img);

			repdiv.appendChild(div);
		}
    }

	if ((enableLineLayer == true) && (lineImage != null)) {
		var d = document.getElementById("linelayer");
		if (d == null) {
			var repdiv = document.getElementById("replay_area");

			div = document.createElement("div");
			div.setAttribute("style","position:absolute; z-index:"+lineLayerZ+";");
			div.setAttribute("id","linelayer");
			div.zIndex=lineLayerZ;

			var img = document.createElement("img");
			img.src = lineImage;
			img.setAttribute("style","position: absolute; z-index:"+lineLayerZ+";");
			img.zIndex=lineLayerZ;
			div.appendChild(img);

			repdiv.appendChild(div);
		}
    }

    if ((enableMiddleDecalLayer == true) && (middleDecalImage != null)) {
		var d = document.getElementById("middledecals");
		if (d == null) {
			var repdiv = document.getElementById("replay_area");
			var parstyle = repdiv.getAttribute("style");
			if (parstyle == null) parstyle = "";

			div = document.createElement("div");
			div.setAttribute("style","position:absolute; z-index:"+middleDecalLayerZ+";");
			div.setAttribute("id","middledecals");
			div.zIndex=middleDecalLayerZ;

			//50 yard line image
			var imgysize = middleDecalImageX;
			var imgxsize = middleDecalImageY; //set to the y-axis length of your image
			var img = document.createElement("img");
			img.src = middleDecalImage;
			img.setAttribute("style","position: absolute; top:"+(540-(imgysize>>1))+"px; left:"+(240-(imgxsize>>1))+"px; z-index:"+middleDecalLayerZ+";");
			img.zIndex=middleDecalLayerZ;
			div.appendChild(img);

			repdiv.appendChild(div);
		}
    }

    if ((enableUpperDecalLayer == true) && (upperDecalImage != null)) {
		var d = document.getElementById("upperdecals");
		if (d == null) {
			var repdiv = document.getElementById("replay_area");

			div = document.createElement("div");
			div.setAttribute("style","position:absolute; z-index:"+upperDecalLayerZ+";");
			div.setAttribute("id","upperdecals");
			div.zIndex=upperDecalLayerZ;

			var img = document.createElement("img");
			img.src = upperDecalImage;
			img.setAttribute("style","position: absolute; opacity:0.45; z-index:"+upperDecalLayerZ+";");
			img.zIndex=upperDecalLayerZ;
			div.appendChild(img);

			repdiv.appendChild(div);
		}
    }
    
    runUpdate = function() { return; }; //disable subsequent runs
    unlock();
}

//these fields have yard lines already. DISABLE THE LINE LAYER.
//fields[fields.length] = 'http://img517.imageshack.us/img517/2792/glbfieldgrassph5.jpg';
//fields[fields.length] = 'http://img517.imageshack.us/img517/2551/glbfieldturfhl0.jpg';
//fields[fields.length] = 'http://img517.imageshack.us/img517/811/glbfieldwornwh2.jpg';
//fields[fields.length] = 'http://img215.imageshack.us/img215/5927/glbfieldsloppyweatheryf1.jpg';
//fields[fields.length] = 'http://img205.imageshack.us/img205/2179/glbfieldsnowvs1.jpg';
//fields[fields.length] = 'http://img523.imageshack.us/img523/6463/glbfieldrb0.gif';
//fields[fields.length] = 'http://img95.imageshack.us/img95/2734/myfield.jpg';

// upper decal images
//img.src = "http://img409.imageshack.us/img409/8636/northshadowxf1.png";
//img.src = "http://img510.imageshack.us/img510/1931/eastshadowhs0.png";
//img.src = "http://img515.imageshack.us/img515/9223/glboverlaymappedto100vu7.png";

//my unlined field
//"http://img296.imageshack.us/img296/4293/smoothfieldpq9.jpg"

// my lines
//"http://img527.imageshack.us/img527/3776/glblinesyk7.png"

//two GLB endzones
//north: "http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-top.jpg"
//south: "http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-bottom.jpg"

// GLB logo for the middle
// "http://img184.imageshack.us/img184/320/glblogotx0.png"; 224x140

/*
 * To add a stadium for a particular team, just copy/paste a new <team> --> </team> block.
 * set the id to that team's ID number and insert their particular images in the appropriate places.
 * The xsize/ysize options MUST BE SET for the mid field image.
 *
 * The block for id# -1 is the default stadium to use if no ID match can be found.
 */
var xmlDescription = '\n\
<root>\n\
    <team id="-2">\n\
        <field>http://img296.imageshack.us/img296/4293/smoothfieldpq9.jpg</field>\n\
        <line>http://img527.imageshack.us/img527/3776/glblinesyk7.png</line>\n\
        <north>http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-top.jpg</north>\n\
        <south>http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-bottom.jpg</south>\n\
        <middle xsize="224" ysize="140">http://img184.imageshack.us/img184/320/glblogotx0.png</middle>\n\
        <upper></upper>\n\
    </team>\n\
<team id="-1">\n\
        <field></field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="224" ysize="140"></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="0">\n\
        <field>http://goallineblitz.com/images/field.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="29">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/RedWolvesField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
   <team id="59">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/MafiaField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="116">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/MastermindsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="252">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/CocksField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="507">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/VikingsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="624">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/GrizzliesField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="637">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/DynamoField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="647">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/PunksField-2.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="682">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/PatriotsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="819">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/GryphonArmyField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i283.photobucket.com/albums/kk311/raider5326/field/SGAShadow.png</upper>\n\
    </team>\n\
    <team id="877">\n\
        <field>http://img10.imageshack.us/img10/9922/revengefield.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="991">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/PiratesField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Fields/EastWest.png</upper>\n\
    </team>\n\
   <team id="997">\n\
        <field>http://i41.tinypic.com/rwi849.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="1030">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/FirebirdsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Fields/Dome.png</upper>\n\
    </team>\n\
    <team id="1038">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/GuerrillasField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="1064">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/PainField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Fields/Dome.png</upper>\n\
    </team>\n\
    <team id="1070">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/MountainMen2Field.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="1135">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/BulldogsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
   <team id="1306">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/InvadersField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
   <team id="1325">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/DemonsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="1427">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/ClamsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="224" ysize="140"></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="1438">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/NighthawksField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="224" ysize="140"></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="1635">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/BastardsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="1638">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/CorsairsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="1976">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/BlueBirdsField.gif</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="2766">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/CerealKillersField.gif</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="2803">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/SultansField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="224" ysize="140"></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="2831">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/RaidersField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="2843">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/BullsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="2846">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/AmphibiansField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
   <team id="3177">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/BeersField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
   <team id="3414">\n\
        <field>http://i31.tinypic.com/igiyol.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="3465">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/DirtbagsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Fields/Dome.png</upper>\n\
    </team>\n\
    <team id="3478">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/HustlasField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="4126">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/WolfpackField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="4132">\n\
        <field>http://i58.photobucket.com/albums/g259/waketripper/glb/SEA%20WASPS/SeaWaspFieldv3-1.jpg?t=1240439000</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="4204">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/IronWolvesField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="4329">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/SpidersField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="4374">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/HeadHuntersField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Fields/Dome.png</upper>\n\
    </team>\n\
   <team id="4384">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/LACField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="4480">\n\
        <field>http://i19.photobucket.com/albums/b155/gustoonarmy/1d.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="4740">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/ThrowbackCowboysField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Fields/Dome.png</upper>\n\
    </team>\n\
<team id="4796">\n\
<field>http://img233.imageshack.us/img233/9695/teenytinystadiumfieldim.jpg</field>\n\
<line></line>\n\
<north></north>\n\
<south></south>\n\
<middle xsize="" ysize=""></middle>\n\
<upper>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Fields/Dome.png</upper>\n\
</team>\n\
    <team id="4811">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/StormField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="4900">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/frogfeild-1.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="4964">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/BroncosField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="5003">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/BangersField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="5073">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/CoyotesField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="5148">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/ShadowsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="5330">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/MountiesField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="5502">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/RockersField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="5544">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/EskimoHuntersField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="5559">\n\
        <field>http://img7.imageshack.us/img7/425/bbtest.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="224" ysize="140"></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="5573">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/MantisField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="5640">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/WarmaggedonsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="224" ysize="140"></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="5642">\n\
        <field>http://i58.photobucket.com/albums/g259/waketripper/glb/team/HurricaneFieldv2.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
   <team id="5866">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/GorillasField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="5903">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/DragonField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="5937">\n\
        <field>http://i58.photobucket.com/albums/g259/waketripper/glb/STING/STINGField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="5972">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/VikingsField2.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="5975">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/KnightRidersField.gif</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
   <team id="6121">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/HitmenField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6147">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/KnightsField-1.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6226">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/FightingDutchStadium.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Fields/EastWest.png</upper>\n\
    </team>\n\
    <team id="6285">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/SchiltronField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6301">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/AllStarsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Fields/Dome.png</upper>\n\
    </team>\n\
    <team id="6395">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/WarriorsField-1.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6408">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Cougars-Field.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6449">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/FunkyBunchField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6464">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/LocksmithsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6479">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/BRMField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6492">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/BoobiesField.gif</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6501">\n\
        <field>http://i58.photobucket.com/albums/g259/waketripper/glb/WOLVERINES/wolverinesField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6508">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/TimeLordsField-2.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Fields/EastWest.png</upper>\n\
    </team>\n\
    <team id="6800">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/BabyRockersField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6811">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/FirefliesField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6873">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/WildcatsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6914">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/MormonsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="7020">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/BulliesField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="7206">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/FancyPantsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="7208">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/RenegadesField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
   <team id="7225">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/GigolosField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
   <team id="7228">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/EpicField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="7255">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/JaguarsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="7292">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/AthleticsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="7309">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Warriors2Field.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Fields/Dome.png</upper>\n\
    </team>\n\
    <team id="7475">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/CreB33rsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="7520">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/IncasField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="7569">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/GunSlingersField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="7736">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/BuckeyesField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="8008">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/RedskinsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="8047">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/CowboyzField.gif</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="8056">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/VDPField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="8074">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/MetalGodzField.gif</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="8176">\n\
        <field>http://img517.imageshack.us/img517/811/glbfieldwornwh2.jpg</field>\n\
        <line></line>\n\
        <north>http://i534.photobucket.com/albums/ee346/bossjayroc/GLB/Minotaurs/MinotaursNorth.jpg</north>\n\
        <south>http://s534.photobucket.com/albums/ee346/bossjayroc/GLB/Minotaurs/MinotaursSouth.jpg</south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://img510.imageshack.us/img510/1931/eastshadowhs0.png</upper>\n\
    </team>\n\
    <team id="8194">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/PosersField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Fields/Dome.png</upper>\n\
    </team>\n\
    <team id="8266">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/GarageRockersField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="8321">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/SharkeezField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="8394">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/MisfitsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="8641">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/PanicField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="8649">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/SidewindersField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/Fields/EastWest.png</upper>\n\
    </team>\n\
    <team id="8689">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/DolphinsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
   <team id="8901">\n\
        <field>http://i27.photobucket.com/albums/c196/l33tpr0ducti0ns/CottonmouthsField.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
</root>\n\
';
