// ==UserScript==
// @name           Custom Graphics On Replay
// @namespace      pbr/cgor
// @include        http://*goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://glb.warriorgeneral.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.12.29
// @require        http://userscripts.org/scripts/source/54630.user.js
// ==/UserScript==

var scriptName = "Custom Graphics";
var scriptVersion = "13.12.29";
var scriptWebpage = "http://userscripts.org/scripts/show/54524";

// XML stadium descriptions are at the bottom of this file
var useXMLDescription = true;
var useRemoteXML = true;

// if XML descriptions = true, set the booleans to image types you want to see.
// if XML descriptions = false, set the booleans to image types you want to see and set the addresses here.
// 1080x480
var enableFieldLayer = true;
var fieldImage = null; //"http://img242.imageshack.us/img242/6797/fieldnewbasefixedkp2.png";
var fieldImageX = 520; //set to the x-axis length of your image if not using xml
var fieldImageY = 1160; //set to the y-axis length of your image if not using xml

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
var enableUpperDecalLayer = true;
var upperDecalImage = "http://img515.imageshack.us/img515/9223/glboverlaymappedto100vu7.png";

// you can modify the previous variables

// don't screw with these
var hometeam = unsafeWindow.home;
var runUpdate = fieldGraphicsUpdate;
var deff = "/images/game/fields/grass_plain.jpg";

window.setTimeout( function() {
    init();
}, 100);

function activate(e) {
    console.log("activate custom graphics");

    lock();

    if (fieldImage == null) {
        if (document.getElementById("field_image") != null) {
            console.log("no field_image element yet! failure imminent?");
            fieldImage = document.getElementById("field_image").src;
            deff = fieldImage;
        }
        else {
            fieldImage = deff; //deff @ 51
        }
    }
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
        footer.style.height = "90px";

        var options = document.getElementById("options_popup");
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
        fieldGraphicsUpdate("<root><team id='"+hometeam+"'><field x='520' y='1160'>"+deff+"</field></team></root>");
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
		xmlDesc = xmlDescription;
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
        if ((f.textContent != null) && (f.textContent != "null")) {
            if (f.textContent.length > 0) {
                fieldImage = f.textContent;
            }
        }

        var x = f.getAttribute("x");	
        var y = f.getAttribute("y");
        if (x != null) fieldImageX = parseInt(x);
        if (y != null) fieldImageY = parseInt(y);
        change = true;
    }
    else {
        fieldImage = null;

    }

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
    if (document.getElementById("field_image") == null) {
        console.log("FGI: no field_image element. delaying.");
        setTimeout( function() { fieldGraphicsInsert(); }, 1000);
    }
    
    if ((enableFieldLayer == true) && (fieldImage != null)) {
        //        var field = document.getElementById("replay_area");
        //        field.style.backgroundImage = "url("+fieldImage+")";
        var field = document.getElementById("field_image");
        field.src = fieldImage;
        field.style.position = "absolute";
        field.style.left = ((520-fieldImageX)>>1)+"px";
        field.style.top = ((1160-fieldImageY)>>1)+"px";

        console.log("("+fieldImageX+","+fieldImageY+") "+fieldImage);
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
    runUpdate = function() { 
        someOwnersAreFuckingJackasses();
    };
    unlock();
}

function someOwnersAreFuckingJackasses() {
    var fi = document.getElementById("field_image");
    console.log("Jackass who cannot follow directions ahoy!");
    if (fi.naturalWidth == 480) {
        fi.style.width = "480px";
        fi.style.height = "1080px";
        fi.style.top = "40px";
        fi.style.left = "20px";
    }
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
    <team id="0">\n\
        <field>http://img296.imageshack.us/img296/4293/smoothfieldpq9.jpg</field>\n\
        <line>http://img527.imageshack.us/img527/3776/glblinesyk7.png</line>\n\
        <north>http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-top.jpg</north>\n\
        <south>http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-bottom.jpg</south>\n\
        <middle xsize="224" ysize="140">http://img184.imageshack.us/img184/320/glblogotx0.png</middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="-1">\n\
        <field x="'+fieldImageX+'" y="'+fieldImageY+'">'+fieldImage+'</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
</root>\n\
';
