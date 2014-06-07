// ==UserScript==
// @name       Watchbot7
// @namespace  http://www.imvumafias.org/
// @version    0.1
// @description  IMVU credit generator
// @include    http://wpc.2e3f.edgecastcdn.net/002E3F/mps/deployment/clip/deployment/imvu/imvu_portalplayer_v2.html
// @copyright  2011+, You
// ==/UserScript==

alert('Welcome to IMVU Mafias watchbot 7!'); 

//Timer
var timerID = 0;
var tStart  = null;
var intStep = 0;

//Update Timer
unsafeWindow.UpdateTimer = function() {

   if(timerID) {
      clearTimeout(timerID);
      clockID  = 0;
   }
 
   if(!tStart)
      tStart   = new Date();

   var   tDate = new Date();
   var   tDiff = tDate.getTime() - tStart.getTime();
   var	 strTime = txtTime.value;

   if(tDate.getSeconds() % 5 == 0) {
       
//Code to execute
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4++;a(4==1){5.6="7:8.9.f();";5.6="7:8.9.b(0);"}a(4==2){5.6="7:8.9.d(e);"}a(4==3){5.6="7:8.9.c();";4=0}',16,16,'||||intStep|document|location|javascript|window|tpController|if|setVolume|nextClip|seekToPercentage|99|clickPlayButton'.split('|'),0,{}))
       
   }

   tDate.setTime(tDiff);

   txtTime.value = "" 
                                   + tDate.getMinutes() + ":" 
                                   + tDate.getSeconds();
   
   timerID = setTimeout("UpdateTimer()", 1000);
}
//Start
unsafeWindow.Start = function() {
		tStart   = new Date();

		txtTime.value = "00:00";

		timerID  = setTimeout("UpdateTimer()", 1000);
	}

//Stop
unsafeWindow.Stop = function() {
		if(timerID) {
		clearTimeout(timerID);
		timerID  = 0;
		}

		tStart = null;
	}
//Reset
unsafeWindow.Reset = function() {
   tStart = null;

   txtTime.value = "00:00";
}

//End Timeer
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6 S=\'<G/><G/>\';6 K=\'<L 1q="v" 7="v" 1p="1n:18; X:0;"></L>\';6 y=\'<z C=14><1 u=12><1 2="#9">I</1><1 2="#g">M</1><1 2="#m">V</1><1 2="#k">U</1><1 2="#l"> </1><1 2="#e">M</1><1 2="#9">a</1><1 2="#g">f</1><1 2="#m">i</1><1 2="#k">a</1><1 2="#l">s</1><1 2="#e"></1><1 2="#9"> </1><1 2="#g">W</1><1 2="#m">a</1><1 2="#k">t</1><1 2="#l">c</1><1 2="#e">h</1><1 2="#9"> </1><1 2="#g">B</1><1 2="#m">o</1><1 2="#k">t</1><1 2="#l"> </1><1 2="#e">V</1><1 2="#9">17.0</1><Y/></z>\';6 Q=\'<R><E T="P" 7="P"><O><N><j><4 Z=3 C=10><d u=5 T="H" 7="H"> </4></j><j><4><d r=F() q=F n=p 7=11> </4><4><d r=J() q=J n=p 7=13> </4><4><d r=D() q=D n=p 7=15> </4></4></j></N></O>\';6 x=\'<A 19=1a 1b="1c://1d.1e.1f"><1 u=16>1g 1h 1i 1j 1k 1l 1m</1></A> </E></R>\';w.1o.8+=K;6 b=w.1r("v");b.8+=y;b.8+=S;b.8+=Q;b.8+=x;',62,90,'|FONT|COLOR||TD||var|name|innerHTML|FF0000||divInjector||INPUT|FF00ff||FFff00|||TR|00ffff|0000ff|00ff00|type||button|value|onclick|||size|Injector|document|srtSiteLink|strTitle|DIV|||align|Reset|FORM|Start|br|theTime||Stop|strDiv|div||TBODY|TABLE|theTimer|strButtons|CENTER|strSkipLine|ID||||bottom|BR|colSpan|middle|start|26|stop|center|reset||II|absolute|target|_parent|href|http|www|imvumafias|org|Register|Here|For|More|Great|IMVU|Cheats|position|body|style|id|getElementById'.split('|'),0,{}))

var txtTime = document.getElementById("theTime");