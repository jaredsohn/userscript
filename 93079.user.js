// ==UserScript==
// @name           DS - Extended Map
// @namespace      Die St mme
// @description    erweitert Karteninformationen
// @include        http://*.die-staemme.de/*
// @include        http://*.staemme.ch/*
// @include        http://*.tribalwars.nl/*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==


var version = "0.0.3";

//visual options
var xthickness = 6; // conical settings
var ythickness = 3;

var transperancy = "0.45";
var onmapchecktolerance = 1;

//dynamic mapinformations
var xoffset;
var yoffset;
var size;

//Optios
GM_setValue("opt1", "1");
GM_setValue("opt1b", "1");
GM_setValue("opt2", "0");

//linked images
var wallimage = new Image();
wallimage.src = '/graphic/buildings/wall.png?1';
var ramimage = new Image();
ramimage.src = '/graphic/unit/unit_ram.png?1';
var axeimage = new Image();
axeimage.src = '/graphic/unit/unit_axe.png?1';
var spyimage = new Image();
spyimage.src = '/graphic/unit/unit_spy.png?1';
var lightimage = new Image();
lightimage.src = '/graphic/unit/unit_light.png?1';
var snobimage = new Image();
snobimage.src = '/graphic/unit/unit_snob.png?1';
var attimage = new Image();
attimage.src = '/graphic/unit/att.png?1';


function Village(arg0, arg1, arg2, arg3, arg4){
  this.x=arg0;
  this.y=arg1;
  this.destx=arg2;
  this.desty=arg3;
  this.movementtype=arg4;
  this.isVillageOnCurrentMap = function () {
    if (this.x > xoffset+onmapchecktolerance && this.x < (parseInt(xoffset)+parseInt(size)) && this.y > yoffset+onmapchecktolerance && this.y < (parseInt(yoffset)+parseInt(size)) ) return true;
    if (this.destx > xoffset+onmapchecktolerance && this.destx < (parseInt(xoffset)+parseInt(size)) && this.desty > yoffset+onmapchecktolerance && this.desty < (parseInt(yoffset)+parseInt(size)) ) return true;
    return false;
  }

  this.drawVillageDataToCanvasGrid = function ano1() {
  var canvas = document.getElementById("map_canvas");
    if (canvas != null) { //theres no canvas rendered without 'Glaubensradius anzeigen' -> should be fixed; canvas will be created under the same name if not exist
            var x1 = 26 + ((this.x - xoffset)*53);
            var y1 = 19 + ((this.y - yoffset)*38);
            var x2 = 26 + ((this.destx - xoffset)*53);
            var y2 = 19 + ((this.desty - yoffset)*38);
            var c=18;
            var d=10;
            if(x1==x2)
            {
             var x3=x2+d;
             var x4=x2-d;
             if(y2>y1)
             { var y3=y2-c; var y4=y2-c; }
             else
             { var y3=y2+c; var y4=y2+c; }
            }
            else if(y1==y2)
            {
             if(x2>x1)
             {
              x3=x2-c;
              x4=x2-c;
              y3=y2+d;
              y4=y2-d;
             }
             else
             {
              x3=x2+c;
              x4=x2+c;
              y3=y2-d;
              y4=y2+d;
             }
            }
            else
            {
             var m=(y2-y1)/(x2-x1);
             var n=(-x2*m)+y2;
             var alpha=Math.atan(m);
             if(x1<x2){ var b=Math.cos(alpha)*c; } else { b=Math.cos(alpha)*(-c); }
             var xs=x2-b;
             var ys=(m*xs)+n;
             var f=Math.cos(alpha)*d;
             var e=Math.sin(alpha)*d;
             var x3=xs+e;
             var y3=ys-f;
             var x4=xs-e;
             var y4=ys+f;
            }

            /*var m=(y1-y2)/(x1-x2);
            var m2=m/1;
	   var n=y1+(-x1*m);
            var c=8;
            var b=8;
            var alpha=(180*Math.atan(m))/Math.PI;
            var a=(Math.sin(alpha)*c)/m;
            var xs=x2-a;
            var ys=m*xs+n;
            var n2=ys+(-xs*m2);
            var alpha2=(180*Math.atan(m2))/Math.PI;
            var e=Math.cos(alpha2)*b;
            var x3=xs-e;
            var x4=xs-(-e);
            var y3=Math.round((m2*x3)+n2);
            var y4=Math.round((m2*x4)+n2);
            x3=Math.round(x3);
            x4=Math.round(x4);    */
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = "rgba(" + ((this.movementtype == 1) ? "0,0,233" : (this.movementtype == 2) ? "0,233,0" : (this.movementtype == 3) ? "230,233,0" : "233,0,0") + ", " + transperancy + ")"; // i like transperancy ;)
            ctx.beginPath();
            ctx.moveTo(x1, y1);

            //var xcorrect = (x1>x2 && y1>y2) ? xthickness*-1 : xthickness*2;
            //ctx.lineTo(x2-xcorrect, y2-ythickness);
            //ctx.lineTo(x2+xcorrect, y2+ythickness);
            ctx.lineTo(x3,y3);
            ctx.lineTo(x4,y4);
            ctx.lineTo(x1+1, y1);
            ctx.fill();
            var xfactor = Math.abs(x2-x1) / 2;
            var yfactor = Math.abs(y2-y1) / 2;
            //1: spy; 2: snob; 3: light; 4: ram; 5: axe
            var image = (this.movementtype==1) ? spyimage : (this.movementtype==2) ? snobimage : (this.movementtype==3) ? lightimage : (this.movementtype==4) ? ramimage : axeimage;
            ctx.drawImage(image, (x1<x2) ? x1+xfactor : x1-xfactor , (y1<y2) ? y1+yfactor : y1-yfactor);//--->   point_x = x1 +- (abs(x2-x1) / 2)


 }
  }


  this.drawIconOverVillage = function() {
    var canvas = document.getElementById("map_canvas");
    if (canvas != null) {

      var x1 = 26 + ((this.x - xoffset)*53);
      var y1 = 19 + ((this.y - yoffset)*38);
      var ctx = canvas.getContext("2d");
      ctx.drawImage(wallimage,x1,y1);
    }
  }

  this.markVillageAsTarget = function() {
    var canvas = document.getElementById("map_canvas");
    if (canvas != null) {

      var x1 = 6 + ((this.x - xoffset)*53);
      var y1 = 19 + ((this.y - yoffset)*38);
      var ctx = canvas.getContext("2d");
      ctx.drawImage(attimage,x1,y1);
        ctx.fillStyle = "rgba(200,0,0," + transperancy + ")";

        ctx.beginPath();
        ctx.arc(x1+4, y1+4, 8, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();

    }
  }

}



function getElementsByPath(arg0, arg1) {
        if(!arg1) var arg1 = document;
        var path = document.evaluate(arg0, arg1, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var stack = [];
        for(var i = 0; i < path.snapshotLength; i++) {
                stack.push(path.snapshotItem(i));
        }
        return stack;
}


function setCookie(cname, value, days) {
        if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";

        document.cookie = cname + "=" + value + expires;
}

function getCookie(cname) {
        if(document.cookie.match(/;/)) {
                var cooks = document.cookie.split("; ");
                for(var i = 0; i < cooks.length; i++) {
                        var cookie = cooks[i];
                        if(cookie.match(cname + "=")) {
                                var value = cookie.replace(cname + "=", "");
                                break;
                        } else {
                                var value = false;
                        }
                }
        } else {
                var cookie = document.cookie;
                if(cookie.match(cname + "="))
                        var value = cookie.replace(cname + "=", "");
                else
                        var value = false;
        }
        return value;
}






var test = document.getElementById('map_popup_options');
if (test!=null) { // pa and map available ?

        //read mapoffset and size
        var mapCoords = document.getElementById('mapCoords');
        yoffset = mapCoords.getElementsByTagName("tr")[0].getElementsByTagName("td")[0].innerHTML;
        var size = (mapCoords.getElementsByTagName("tr").length-1) / 2;
        xoffset = mapCoords.getElementsByTagName("tr")[size*2].getElementsByTagName("td")[1].innerHTML;

        //render some options
        var mapoptions = getElementsByPath('//form/table[@class="map_container"]/parent::*/parent::td');
        if (mapoptions.length > 0) {
                var div = document.createElement('div');
                div.style.padding = '8px';

                var canv = document.getElementById("map_canvas");
                if (canv==null) {

                        //creating map_canvas
                        //so inno doesnt need the canvas for just drawing pngs, we have to render our own canvas an give him the same id...

                        var map = document.getElementById("map");
                        var mapOld = document.getElementById("mapOld");

                        var container = document.createElement('div');
                        //container.style.height="795";
                        //container.style.width="570";
                        container.style.zIndex="1";
                        container.style.position="absolute";

                        var newCanvas = document.createElement('canvas');
                        newCanvas.height="570";
                        newCanvas.width="795";
                        newCanvas.zIndex="1000";
                        newCanvas.position="absolute";
                        newCanvas.id="map_canvas";

                        container.appendChild(newCanvas);

                        map.insertBefore(container, mapOld);
                }

                var opt1 = GM_getValue("opt1","0");
                var opt1b = GM_getValue("opt1","0");
                var opt2 = GM_getValue("opt1","0");
                var dorfid = document.location.href.split("village=")[1].split("&")[0];

                var html = '<br><a href="/game.php?village=' + dorfid + '&screen=overview_villages&mode=commands&group=0" target="_blank" title="Oeffnet ein neues Fenster mit der Befehlsuebersicht.">Befehlsuebersicht</a><br/><span style="font-size: 10px;"> Achtung: Gruppe -alle- wird ausgewaehlt.</span>';
                html += '<h4>Legende</h4><div style="float:left; width: 10px;height: 10px;background-color: #D00;"></div><div style="float:left">&nbsp;Angriff &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div style="float:left; width: 10px;height: 10px;background-color: #00D;"></div><div style="float:left">&nbsp;Spaeh &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div style="float:left; width: 10px;height: 10px;background-color: #0D0;"></div><div style="float:left">&nbsp;AG </div>';


                div.innerHTML = html;
                mapoptions[0].appendChild(div);
        }


        var villages = new Array();

        var allmovements = true;
        var opt2 = GM_getValue("opt2","0");
        if (opt2==1) allmovements = false;

        //read movement-informations from gm-store
        var save = GM_getValue("ds_attacks");
        if (save != null) {
                var coords = save.split(";");
                for (i = 0; i < coords.length-1; i++) {
                        var cos = coords[i];

                        var x1 = cos.substring(0, cos.indexOf('\|'));
                        var y1 = cos.substring(cos.indexOf('\|')+1, cos.indexOf('-'));
                        var x2 = cos.substring(cos.indexOf('>')+1, cos.lastIndexOf('\|'));
                        var y2 = cos.substring(cos.lastIndexOf('\|')+1, cos.lastIndexOf(','));

                        //check if movements source or destination on map
                        var foobar = new Village(x1, y1 , x2, y2, cos.substr(cos.length-1,1));
                        if (allmovements==true) {
                                villages.push(foobar);
                        } else {
                                if (foobar.isVillageOnCurrentMap()) {
                                        villages.push(foobar);
                                }
                        }

                }

                //draw movements
                        for (i = 0; i < villages.length; i++) {
                                var village = villages[i];
                                village.drawVillageDataToCanvasGrid();
                        }
        }

        //process building data
        villages = new Array();
        var builddata = GM_getValue("ds_buildings");
        if (builddata != null) {
                var walldown = builddata.split(";");
                for (i = 0; i < walldown.length-1; i++) {
                        var cos = walldown[i];
                        var x1 = cos.substring(0, cos.indexOf('\|'));
                        var y1 = cos.substring(cos.indexOf('\|')+1, cos.length);
                        var foobar = new Village(x1, y1 , 0, 0, 0);
                        if (foobar.isVillageOnCurrentMap()) {
                                villages.push(foobar);
                        }

                }
                //draw building info
                var opt2 = GM_getValue("opt2","0");;
                if (opt2==1) {
                        for (i = 0; i < villages.length; i++) {
                                var village = villages[i];
                                village.drawIconOverVillage();
                        }
                }
        }

        //process incs
        villages = new Array();
        var incdata = GM_getValue("ds_incs");
        if (incdata != null) {
                var incoming = incdata.split(";");
                for (i = 0; i < incoming.length-1; i++) {
                        var cos = incoming[i];
                        var x1 = cos.substring(0, cos.indexOf('\|'));
                        var y1 = cos.substring(cos.indexOf('\|')+1, cos.length);
                        var foobar = new Village(x1, y1 , 0, 0, 0);
                        if (foobar.isVillageOnCurrentMap()) {
                                villages.push(foobar);
                        }

                }
                //draw building info
                var opt1 = GM_getValue("opt1","0");;
                if (opt1==1) {
                        for (i = 0; i < villages.length; i++) {
                                var village = villages[i];
                                village.markVillageAsTarget();
                        }
                }
        }



}

//read orders...
if (location.href.match('screen=overview_villages&mode=commands')) {
        var rows = getElementsByPath('//tr[contains(@class, "nowrap row_")]');
        var text = "";

        var idx_spy = 0;
        var idx_axe = 0;
        var idx_light = 0;
        var idx_ram = 0;
        var idx_snob = 0;

        for(var i = 0; i < rows.length; i++) {

                        var row = rows[i];

                        //parse headerLine's picturesrc to get the right indexes by unit
                        if (i==0) {
                                var headers = row.parentNode.getElementsByTagName("th");
                                for (j = 0; j < headers.length; j++) {
                                        var th = headers[j];
                                        var children = th.childNodes;
                                        for (k = 0; k<children.length; k++) {
                                                picsrc = children[k].src;
                                                if (picsrc != undefined) {
                                                        if (picsrc.indexOf("spy") != -1) idx_spy = j;
                                                        if (picsrc.indexOf("axe") != -1) idx_axe = j;
                                                        if (picsrc.indexOf("light") != -1) idx_light = j;
                                                        if (picsrc.indexOf("ram") != -1) idx_ram = j;
                                                        if (picsrc.indexOf("snob") != -1) idx_snob = j;
                                                }
                                        }
                                }
                        }


                        var mode = 1;

                        var cell0 = row.getElementsByTagName("td")[0];
                        var cell1 = row.getElementsByTagName("td")[1];

                        // if theres no attack-> continue
                        if(!cell0.textContent.match('Angriff')) {
                                continue;
                        }

                        //1: spy; 2: snob; 3: light; 4: ram; 5: axe
                        var spy = (idx_spy>0) ? row.getElementsByTagName("td")[idx_spy].textContent : 0;
                        if (spy>0) mode = 1;
                        var axe = (idx_axe>0) ? row.getElementsByTagName("td")[idx_axe].textContent : 0;
                        if (axe>0) mode = 5;
                        var light = (idx_light>0) ? row.getElementsByTagName("td")[idx_light].textContent : 0;
                        if (light>0) mode = 3;
                        var ram = (idx_ram>0) ? row.getElementsByTagName("td")[idx_ram].textContent : 0;
                        if (ram>0) mode = 4;
                        var snob = (idx_snob>0) ? row.getElementsByTagName("td")[idx_snob].textContent : 0;
                        if (snob>0) mode = 2;

                        var c1 = cell1.textContent;
                        var coordsFrom = c1.substring(c1.indexOf('(')+1, c1.indexOf(')'));
                        var c2 = cell0.textContent;
                        var coordsTo = c2.substring(c2.indexOf('(')+1, c2.indexOf(')'));

                        text += coordsFrom + "->" + coordsTo + "," + mode + ";"
                }
        GM_setValue("ds_attacks", text);
}


//read incs...
if (location.href.match('screen=overview_villages&mode=incomings')) {

        var rows = getElementsByPath('//tr[contains(@class, "nowrap row_")]');
        var text = "";
        for(var i = 0; i < rows.length; i++) {
                var row = rows[i];

                var cell0 = row.getElementsByTagName("td")[0];

                if(!cell0.textContent.match('Angriff')) {
                        continue;
                }


                var target = row.getElementsByTagName("td")[1].textContent;
                text += target.substring(target.indexOf('(')+1, target.indexOf(')')) + ";";

        }
        GM_setValue("ds_incs", text);

}





//read buildings...
var opt2 = GM_getValue("opt2","0");
if (opt2==1) {
        if (location.href.match('screen=overview_villages&mode=buildings')) {
                var rows = getElementsByPath('//tr[contains(@class, "row_")]');
                var text = "";
                var idx_wall = 0;

                for(var i = 0; i < rows.length; i++) {

                        var row = rows[i];


                        //parse headerLine's picturesrc to get the right index for the wall
                        if (i==0) {
                                var headers = row.parentNode.getElementsByTagName("th");
                                for (j = 0; j < headers.length; j++) {
                                        var th = headers[j];
                                        var children = th.childNodes;
                                        for (k = 0; k<children.length; k++) {
                                                picsrc = children[k].href;
                                                if (picsrc != undefined) {
                                                        if (picsrc.indexOf("wall") != -1) idx_wall = j;
                                                }
                                        }
                                }
                        }

                        var cellwall = (idx_wall > 0) ? row.getElementsByTagName("td")[idx_wall] : 20;

                        if (cellwall.textContent!=20) {
                                var cell0 = row.getElementsByTagName("td")[0];
                                var c0 = cell0.textContent;
                                var coordsFrom = c0.substring(c0.indexOf('(')+1, c0.indexOf(')'));
                                text += coordsFrom + ";";
                        }
                }
                GM_setValue("ds_buildings", text);
        }
}