// ==UserScript==
// @name           United Colonies - Gamma
// @namespace      Astroempires
// @include        http://gamma.astroempires.com/map.aspx?loc*
// ==/UserScript==


// Definition :

var guild_tag = new Array("United Colonies");  
var Soundsrc = "http://www.jatko.org/astroempires/gamma/FleetAlarm.wav";
var isloop = true;                              
var Waitime = "1";                                  

var CurrentTime = new Date();
var ScanDato = Date.parse(CurrentTime);

var OldFleet = "";
var Ctom = (ScanDato) + 28800000;
//GM_setValue("FleetOldf", "");
//alert ((ScanDato) + "-" + Ctom);
if(GM_getValue("Dato", "") > Ctom){
GM_setValue("FleetOldf", "");
}
   // time :
   var CurrentTime = new Date();
   var ScanDato = Date.parse(CurrentTime);

   // planet coordinate :
   var FinkReplaceEd = "no";
   var finkToReplace = "http://gamma.astroempires.com/map.aspx?loc=";
   FinkReplaceEd = document.URL.replace(finkToReplace, "");
   var FRealRegion = "";
   var FDrl = (FinkReplaceEd.length);
   var FtexLinkRep = FinkReplaceEd;

   // stored fleet :
   var stoOld = "";
   stoOld = GM_getValue("FleetOldf", "");
   
   if(stoOld.length > 0){
   OldFleet = GM_getValue("FleetOldf", "");
   }

function encodeutf (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n=0, k=string.length; n < k; n++) {
            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

function decodeutf (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }
        return string;
}



// Function planet-view :

if(FDrl == "12"){
   var Minks = document.getElementsByTagName( 'a' );
   var IsMember = false, Mlist = "";
   for (var i = 0; i < Minks.length; i++){
     element = Minks[ i ];
     if(element.href.indexOf("fleet") > 0 && element.text.length > 0){
         var istabel = "";
         istabel = element.parentNode;
         var istabol = "";
         istabol = istabel.tagName;
         if(istabol == "TD"){
            var isfleet = "";
            var isplayer = "";
            var isfleetb = element.parentNode.firstChild;
            // fleetname :
            isfleet = isfleetb.firstChild.data;
            if(isfleet != undefined){
               if(isplayerb = element.parentNode.nextSibling){
                 // player :
                 isplayerb = isplayerb.firstChild;
                 isplayer = isplayerb.firstChild.data;
                 // arrival :
                 var isarrivaltimeb = element.parentNode.nextSibling.nextSibling;
                 var isarrivaltime = 0;
                 if(isarrivaltimeb.title.length > 0){
                 isarrivaltime = isarrivaltimeb.title;
                 }
                 // size :
                 var isfleetsizeb = element.parentNode.nextSibling.nextSibling.nextSibling;
                 isfleetsizeb = isfleetsizeb.firstChild;
                 var isfleetsize = isfleetsizeb.firstChild.data;
                 var isaplayer = encodeutf(isplayer);
                 //alert(isaplayer);

                 var guild_anz = guild_tag.length;
                 for(var u = 0; u < guild_anz; u++){

                  if(guild_tag[u] == isplayer.substring(0, (guild_tag[u].length))){
                     var isafleet = escape(isfleet);
                     // already detected :
                     if(OldFleet.indexOf(isafleet) >= 0){
                     //var isold = "0";
                     myMemWindow = window.open("http://www.jatko.org/astroempires/gamma/FleetAlarm.htm", "FleetFound", "width=280,height=200,left=0,top=0,scrollbars=yes");
                     myMemWindow.document.close();
                     } else {
                     Mlist = Mlist + isfleet + " - " + isplayer + " - " + isarrivaltime + " - " + isfleetsize + escape("<br>");   //+ isdestination+ escape("<br>");
                     var isafleet = escape(isfleet);
                     var isgfleet = OldFleet + isafleet;
                     OldFleet = OldFleet + (escape(isfleet));
                     GM_setValue("FleetOldf", isgfleet);
                     }
                  }

                 } // for
               }
            }
         }
     } // for
   }
}


if(Mlist.length > 0){
var Rmlist = unescape(Mlist)
myMemWindow = window.open("http://www.jatko.org/astroempires/gamma/FleetAlarm.htm", "FleetFound", "width=280,height=200,left=0,top=0,scrollbars=yes");
myMemWindow.document.write("<html><title>Fleet Found</title><body><h3>Incoming fleet detected : " + FinkReplaceEd + "</h3><embed src='" + Soundsrc + "' name='awave' loop='" + isloop + "' autostart='true'></embed><p>" + Rmlist + "</p></body></html>");
myMemWindow.document.close();
}
if (self.name != "FleetFound"){
var adti = 1000;
if(GM_getValue("asl", "") == ""){
adti = 15000;
GM_setValue("asl", "1")
} else {
GM_setValue("asl", "")
}
var Wuitime = Waitime * 1000 * 60 - adti;
window.setTimeout(function (){location.href = document.URL}, Wuitime);
}

