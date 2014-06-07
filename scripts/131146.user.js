// ==UserScript==
// @name           TGP Classifieds
// @namespace      Scott Whigham
// @include        http://www.thegearpage.net/board/forumdisplay.php?f=5
// @include	http://www.thegearpage.net/board/forumdisplay.php?f=6*
// @include	http://www.thegearpage.net/board/forumdisplay.php?f=22*
// @include	http://www.thegearpage.net/board/forumdisplay.php?f=33*
// @include	http://www.thegearpage.net/board/forumdisplay.php?f=77*
// @include	http://www.thegearpage.net/board/forumdisplay.php?f=59*
// @include	http://www.thegearpage.net/board/forumdisplay.php?f=42*
// ==/UserScript==

var debug = false; // show popups?

var allElements, thisElement;
allElements = document.evaluate(
 '//tr/td/div/a',
 document,
 null,
 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
 null);
 
var counter = 0;
var highlightedRows = 0;

for (var i = 0; i < allElements.snapshotLength; i++) 
{
	 thisElement = allElements.snapshotItem(i);
	 
	   ///////////////////// Hide these rows
	   
	   // Any
	 if(thisElement.innerHTML.search(/(4x12|4x10|sold|signature|ebay|Behringer|auction|line6|line 6|50s|60s|70s|lefty|re-issue|reissue|\(UK\))/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	   
	   // Players
	 if(thisElement.innerHTML.search(/(vaughn|vaughan|SRV|Stevie|lynch|eric|yngwie|YJM|evh|halen)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	   
	   // Guitars 1
	 if(thisElement.innerHTML.search(/(ibanez|carvin|suhr|tyler|epiphone|PRS|Hamer|Guild|Ball|Paul Reed|ESP)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	   
	   // Guitars 2
	 if(thisElement.innerHTML.search(/(seagull|Jackson|peavey|ricken|dean|washburn|road|anderson|asat|legacy|martin|parker|taylor)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	   
	   // Guitars 3
	 if(thisElement.innerHTML.search(/(larrivee|gretsch|evh|mij|mim|takamine|mayer|floyd|danelectro|soloway|reverend|american|rampage|charvel|mojo)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	   
	   // Guitars 4
	 if(thisElement.innerHTML.search(/(Duesenberg|partscaster|partocaster|eric|grosh|thorn|relic|schecter|godin|Silvertone|Breedlove|Eastwood|Tuttle|LSL|BC Rich)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	   
	   // Guitars: Fender
	 if(thisElement.innerHTML.search(/(Squier|Bullet|Fender Custom|nocaster|jaguar|pawn|blacktop|Mustang|tele|custom strat|jazzmaster)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	   
	   // Guitars: Gibson
	 if(thisElement.innerHTML.search(/(gibson|les paul|lp jr|vos|Es335|es345|es-335)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Amps 1
	 if(thisElement.innerHTML.search(/(Mesa|Egnater|Swart|Bogner|Jet|Reinhart|Germino|Reason|Morgan|Clark|Carr|bad|two-rock|two rock|top hat|fargen|divided|%13|Maz)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Amps 2
	 if(thisElement.innerHTML.search(/(Carol|Avatar|Silverface|Dr\. Z|DrZ|Dr Z|Victoria|tech21|tech 21|sansamp|kustom|rivera|THD|Laney|Crate|Blackheart|Roland|Fishman)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Amps 3
	 if(thisElement.innerHTML.search(/(orange|musicman|music man|fuchs|engl|redplate|ceriatone|hiwatt|retro|matchless|budda|reinhardt|soldano|dsl|Trace|splawn|blackstar)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Amps 4
	 if(thisElement.innerHTML.search(/(event horizon|vht|Komet|valvetech|CAA|CAE|Custom Audio|SWR|VVT|Ampeg|Tophat|5E3|Bludo|Frenzel|Demeter|Bruno)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Amps 5
	 if(thisElement.innerHTML.search(/(Sunn|65amps|65 amps|first act)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Amps: Marshall
	 if(thisElement.innerHTML.search(/(JMP|JCM|JVM|Class5|class 5|JTM|Marshall Slash)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Amps: Fender
	 if(thisElement.innerHTML.search(/(champ|prince|deville|prosonic|pro junior|pro jr|hotrod|hot rod|M80|Evil Twin|Blues Jr)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Amps: Vox
	 if(thisElement.innerHTML.search(/(AC4|Brian May)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Attenuators
	 if(thisElement.innerHTML.search(/(Alex|Masslite|Mass Lite|Brakelite|Faustine|Aracom)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Effects 1
	 if(thisElement.innerHTML.search(/(Boss|mxr|xotic|zvex|planet waves|wampler|pig|fulltone|barber|Maxon|Nova|JHS|Crowther|Lovepedal|Kanji|Stone)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Effects 2
	 if(thisElement.innerHTML.search(/(OCD|Cmatmods|Hermida|Zendrive|Trex|T-Rex|Timmy|Catalinbread|Katana|DMM|Sparkle|Durham|Pedaltrain|Voodoo Lab|Way Huge)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Effects 3
	 if(thisElement.innerHTML.search(/(Empress|Diamond|Arion|Subdecay|T1M|this1smyne|Korg|Helicon|Malekko|Bearfoot|BYOC|Blender|Paul Cochrane|Memory Man|Lava)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Effects 4
	 if(thisElement.innerHTML.search(/(DL4|Cioks|TS9|D\*A\*M|Morley|Decimator|Rockbox|Flashback|Guyatone|TC Electronics|Fulldrive|Crybaby|Professor|Analogman|Suhr)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Effects 5
	 if(thisElement.innerHTML.search(/(Visual Sound|Dunlop|Loopmaster|Loop Master|Loop-Master|Tone Monk|Koko|PP2\+|Foxrox|Skreddy|Keeley|Landgraf|Skreddy)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Effects 6
	 if(thisElement.innerHTML.search(/(Polytune|Poly-Tune|SKB|pedalboard)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Recording
	 if(thisElement.innerHTML.search(/(Macbook|dbx|furman|qsc|Tascam|Alesis|Motu|Audix|laptop|desktop|computer)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Misc
	 if(thisElement.innerHTML.search(/(Zandt|Warmoth|Zebra|Texas Specials|EMG|Palmer|keyboard|synth})/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }
	 
	 // Misc
	 if(thisElement.innerHTML.search(/(AxeFx|Axe-Fx|Axe FX|Fractal|HD500|HD-500|GSP|11Rack|Eleven Rack)/i)>=0) {
	   thisElement.parentNode.parentNode.parentNode.style.display="none";
	   counter++;
	 }

	  ///////////////////// Highlight these elements
	  
	  // Amps and guitars
	 if(thisElement.innerHTML.search(/(Dallas|Bletchley|Blitz|Danny Russell|Naylor|Xits|Lentz|Collings|Dumble|Kemper|Vibrolux|196|195|'6|'5)/i)>=0) { // 
	   thisElement.parentNode.parentNode.style.backgroundColor="yellow";
	}
	  
	  // Recording 1
	 if(thisElement.innerHTML.search(/(Bricasti|Chandler|Wunder|Distressor|Dallas|BAE|NPNG|Buzz|Focal|Opal|Anamod|Brauner|Gordon|AEA|SF12|LA2A|LA-2A|Thermionic)/i)>=0) {
	 	thisElement.parentNode.parentNode.style.backgroundColor="yellow";
	 	highlightedRows++;
	}
	
	// Recording 2	 	
	 if(thisElement.innerHTML.search(/(Pendulum|Schoeps)/i)>=0) {
	 	thisElement.parentNode.parentNode.style.backgroundColor="yellow";
	 	highlightedRows++;
	}
	
	// Effects
	 if(thisElement.innerHTML.search(/(Freeze|Clinch|Strymon|Trombetta|PTD|Devi|Skinpimp|Fairfield|Klon|XTS|Cornish|Moogerfooger|Moog|Frantone|Goodrich)/i)>=0) {
	 	thisElement.parentNode.parentNode.style.backgroundColor="yellow";
	 	highlightedRows++;
	}
	
	// Misc
	 if(thisElement.innerHTML.search(/(Area|DP416|DP415|Callaham|Bluechip|Blue Chip|National|Resonator|Harp|Weissenborn|RS Guitar|Van Den Hul)/i)>=0) {
	 	thisElement.parentNode.parentNode.style.backgroundColor="yellow";
	 	highlightedRows++;
	}
}

var msg = counter + ' ads filtered';
GM_log(msg);

if(debug)
	alert("Removed " + counter);

