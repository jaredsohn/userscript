// ==UserScript==
// @name           Animate FINN 3D
// @namespace      http://userscripts.org/users/hennings
// @description    Control the 3D map
// @include        http://kart.finn.no/3d/
// ==/UserScript==

/*

http://kart.finn.no/?mapType=3D&utmx=261962&utmy=6650705&heading=321&pitch=66&distance=1183&autoRotate=0
http://kart.finn.no/?mapType=3D&utmx=262012&utmy=6650697&heading=322&pitch=74&distance=228&autoRotate=0&sec=6
http://kart.finn.no/?mapType=3D&utmx=262229&utmy=6651065&heading=330&pitch=78&distance=200&autoRotate=0&sec=6
http://kart.finn.no/?mapType=3D&utmx=262251&utmy=6651254&heading=330&pitch=78&distance=200&autoRotate=0&sec=4
http://kart.finn.no/?mapType=3D&utmx=262158&utmy=6651101&heading=159&pitch=70&distance=304&autoRotate=0&sec=4



http://kart.finn.no/?mapType=3D&utmx=261962&utmy=6650705&heading=321&pitch=66&distance=1183&autoRotate=0&store=1

*/

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
    unsafeWindow.FinnAnim = {};

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
      $("#whereAreWe").after("<div id='animBox' style='position:absolute;left: 630px; top:4px'><textarea style='font-size:30%' id='anim'  rows=1 width=20></textarea><input type='button' value='run' id='animb' onclick='FinnAnim.runAnimation()'/><input type='button' value='save' id='shot' onclick='FinnAnim.store()'/></div>")


unsafeWindow.console.log("greasemonkey startup");

var frameNr=0;
var  pos = [];
var  factor = 1.0;
var  tm;
var  tm2;


function genxml(url, overrideSec) {
  if (!url) return {ok:false};
  console.log("Handling "+ url);
  regexp=/utmx=(\d+)&utmy=(\d+)&heading=(\d+)&pitch=(\d+)&distance=(\d+)/;
  url.match(regexp);
  var x = RegExp.$1;
  var y = RegExp.$2;
  var head = RegExp.$3;
  var pitch = RegExp.$4;
  var d = RegExp.$5;
  var sec = 0;
  if (url.match(/sec=(\d+\.?\d?)/)) sec = RegExp.$1
  if (url.match(/factor=(\d+\.?\d?)/)) {
    factor = RegExp.$1;
  }

  if (!sec) sec = 1;
  if (overrideSec) sec = overrideSec;
  console.log(x+' '+y+' '+head+' '+pitch+' '+d+' '+sec)

    if (y==0 || x==0) return {ok: false};
  // sec,y,x,d,head,pitch

  console.log("Go to "+y+","+x+", dist "+d+", head "+head+", pitch "+pitch +" in " + sec + " sec");
  return { xml: '<?xml version="1.0" ?><xml-data><client><viewer><camera><autorotate>0</autorotate><animate>'+sec+'</animate><position>UTM33,'+y+','+x+','+d+'</position><heading>'+head+'</heading><pitch>'+pitch+'</pitch></camera></viewer></client></xml-data>', sec: sec, ok: true};
}



n = 0;
function doit() {
  clearTimeout(tm);
  unsafeWindow.console.log("doit...")
  nextPos = genxml(pos[n]);
  n++;
  
  if (nextPos.ok) {
    var next = parseFloat(nextPos.sec)+0.2;
    unsafeWindow.console.log(n + " / " + pos.length+", wait " + next);
    unsafeWindow.document.getElementById("myVR").XMLString=nextPos.xml;
  } else {
    unsafeWindow.console.log(n + " / " + pos.length+" was not ok!");
  }
  if (n<pos.length) {
    unsafeWindow.console.log("next in " + next*factor);
    tm=setTimeout(unsafeWindow.FinnAnim.doit,next*1000 * factor); 
    console.log("schedule next in " + next +" s");
  } else {
    n = 0; stop();
    console.log("finished!\n");
  }
}

 unsafeWindow.FinnAnim.store = store;
 unsafeWindow.FinnAnim.runAnimation = runAnimation;
 unsafeWindow.FinnAnim.doit = doit;
 unsafeWindow.FinnAnim.stop = stop;

function store() {
  unsafeWindow.document.getElementById("myVR").XMLString='<?xml version="1.0" ?><xml-data><client><viewer><screenshot><keepgui>true</keepgui></screenshot></viewer></client></xml-data>';
}

function runAnimation(f) {
  clearTimeout(tm);
  clearInterval(tm2);
  if (f) factor = f;
  n = 0;
  frameNr = 0;
  pos = document.getElementById("anim").value.split(/\n/);
  unsafeWindow.console.log("starting animation with " + pos.length);
  var np = genxml(pos[n],0.5);
  unsafeWindow.console.log("X: " + np.xml);
  unsafeWindow.document.getElementById("myVR").XMLString=np.xml;
  tm = setTimeout(doit,np.sec+5000);
  if (pos[n].match(/store/)) {
    tm2 = setInterval(storeFrame,250);
  }
}


function stop() {
  clearTimeout(tm);
  clearInterval(tm2);
  unsafeWindow.console.log("stopped");
}

 var zero="000000000000000000000"; 

function storeFrame() {
  var sFrameNr = "" + frameNr;
  sFrameNr = zero.substring(0,6-sFrameNr.length)+sFrameNr;

  var filename='c:/tmp/3d/f';

  console.log("store: " + sFrameNr);

  unsafeWindow.document.getElementById("myVR").XMLString='<?xml version="1.0" ?><xml-data><client><viewer><screenshot><filename>'+filename+'-'+sFrameNr+'.jpg'+'</filename><keepgui>false</keepgui></screenshot>      </viewer>       </client> </xml-data>';

  frameNr++;

}


}
