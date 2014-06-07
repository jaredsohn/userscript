// ==UserScript==
// @name           Gmail Smiley Extender : Plurk
// @description    Add extra emojii to your Gmail chat!
// @author         1nfected & artyfarty
// @version        1.4.1
// @namespace      1nfected
// @license        CC by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/

// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==


(function() {

// -------- USER CONFIGURABLE OPTIONS ------- //

// User defined CUSTOM SMILEYS
/* Declare your custom smileys here in the following format:

	var customSmileys = [
		[<REGEXP>, <FULL_PATH_TO_SMILEY>],
		[<REGEXP>, <FULL_PATH_TO_SMILEY>]
	];
	 
	EXAMPLE:
	var customSmileys = [
		[/:lol:/      ,'http://www.example.com/lol.gif'],
		[/:roflmao:/  ,'http://example.com/smileys/roflmao.png'],
		[/lmao/		  ,'https://ex.ample.org/laugingmyassoff.jpg']
	];
*/

var customSmileys;

// ------ END USER CONFIGURABLE OPTIONS ------ //

// -------- DONT EDIT BELOW THIS LINE -------- //

try { if(self != window.top) { return; } }
catch(e) { return; }

testGM();

var smileys, smileyURL;

var version = '0.5';
var scriptid = 77439;

// Test for Greasemonkey API & adapt accordingly
function testGM() {
	const LOG_PREFIX = 'Gmail Smiley Extender: ';
	const LOG = true;
	const DEBUG = false;
	isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
	log = isGM ? function(msg) { if(LOG) GM_log(msg) } : window.opera ? function(msg) { if(LOG) opera.postError(LOG_PREFIX+msg); } : function(msg) { try { if(LOG) console.info(LOG_PREFIX+msg); } catch(e) {} }
	debug = function(msg) { if(LOG && DEBUG) log('** Debug: '+msg+' **') }
}


// All in one function to get elements
function $(q,root,single,context) {
	root = root || document;
	context = context || root;
	if(q[0] == '#') return root.getElementById(q.substr(1));
	if(q.match(/^[\/*]|^\.[\/\.]/)) {
		if(single) return root.evaluate(q,context,null,9,null).singleNodeValue;
		var arr = []; var xpr = root.evaluate(q,context,null,7,null);
		for(var i = 0, len = xpr.snapshotLength; i < len; i++) arr.push(xpr.snapshotItem(i));
		return arr;
	}
	if(q[0] == '.') {
		if(single) return root.getElementsByClassName(q.substr(1))[0];
		return root.getElementsByClassName(q.substr(1));
	}
	if(single) return root.getElementsByTagName(q)[0];
	return root.getElementsByTagName(q);
}

function addStyle(css) {
	var head = $('head')[0];
	if(!head) return;
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode(css));
	head.appendChild(style);
}

// Waits for a given set of Elements to load. Takes a callback as argument which is called if all the elements are found.
// mode == 0 : callback only if all the elements are found. (DEFAULT)
// mode == 1 : callback even if none of the elements are found.
// mode == 2 : callback immed if any single element is found.
function $W(Q,callback,mode,t) {
	t = t || 1; mode = mode || 0;
	var arr = Q instanceof Array;
	var l = arr ? Q.length : 1;
	var matches = [];
	for(var i = 0; i < l; i++) {
		var O = arr ? Q[i] : Q;
		var q = O.q || O, r = O.r, s = O.s, c = O.c;
		var T = O.t || 10, I = O.i || 250, N = O.n, F = O.f;
		var match = $(q,r,s,c);
		if(match && match.length == 0) match = null;
		if(match) { matches.push(match); if(mode == 2) { break; } }
		else {
			if(i !== (l-1) && mode == 2) { continue; }
			if(t >= T) {
				if(F) log(F);
				if(mode !== 1)
					return;
			}
			else {
				if(N) debug(t+' - '+N+' in '+t*I+'ms...');
				window.setTimeout(function(){$W(Q,callback,mode,++t)},t*I);
				return;
			}
		}
	}
	if(typeof callback == 'function') {
		if(matches.length == 1) matches = matches[0];
		if(matches.length == 0) matches = null;
		callback(matches);
	}
}

window.addEventListener('load', init, false);

function init() {
	$W({q:'.no',t:20,i:150,r:document,s:true,n:'Finding root element...',f:'Failed to find root element!'},chatHook,2);

	smileys = [
		[':-[','ah.gif'],
		[']:->','aq.gif'],
		['[:-}','ar.gif'],
		[':-!','at.gif'],
		['@}->--','ax.gif'],
		['*DRINK*','az.gif'],
		['*IN LOVE*','ba.gif'],
		['@=','bb.gif'],
		['*HELP*','bc.gif'],
		['\m/','bd.gif'],
		['%)','be.gif'],
		['*LOL*','dy.gif'],
		['(русский)','gf.gif'],
		['(onfire)','onfire.gif'],
		['(pufface)','hh.gif'],
		['(pufface_dad)','dad.gif'],
		['(rboy)','rboy.gif'],
		['(doh)','ge.gif'],
		['(dapanic)','id.gif'],
		['(fuu)','ff.gif'],
		['(gfuu)','fg.gif'],
		['(raeg)','raeg.gif'],
		['(rage)','hj.gif'],
		['(redeyes)','ix.gif'],
		['(yay)','fh.gif'],
		['(gyay)','fi.gif'],
		['(yaay)','hn.gif'],
		['(yee)','ho.gif'],
		['(whoa)','ih.gif'],
		['(sheep)','sheep.gif'],
		['(aha)','fl.gif'],
		['(gaha)','fm.gif'],
		['(iaha)','he.gif'],
		['(ahatroll)','ii.gif'],
		['(troll)','ft.gif'],
		['(gtroll)','fs.gif'],
		['(troll_dance)','troll_dance.gif'],
		['(troll_wave)','troll_wave.gif'],
		['(no_troll)','hg.gif'],
		['(vtroll)','gj.gif'],
		['(trolldad_jump)','iy.gif'],
		['(badum)','badum.gif'],
		['(yea)','yea.gif'],
		['(gyea)','fo.gif'],
		['(chrome_yea)','chrome_yea.gif'],
		['(pokerface)','pokerface.gif'],
		['(gpokerface)','fq.gif'],
		['(derp)','hc.gif'],
		['(ie_derp)','ie_derp.gif'],
		['(uderp)','ij.gif'],
		['(jumper)','jumper.gif'],
		['(ynou)','hp.gif'],
		['(ynou_orig)','ynou_orig.gif'],
		['(jackie)','it.gif'],
		['(pony_ynou)','pony_ynou.gif'],
		['(seriously)','seriously.gif'],
		['(haa)','ig.gif'],
		['(eww)','eww.gif'],
		['(bah)','fj.gif'],
		['(gbah)','fk.gif'],
		['(whatever)','fu.gif'],
		['(gwhatever)','fw.gif'],
		['(me_gusta)','me_gusta.gif'],
		['(alone)','ha.gif'],
		['(NO)','NO.gif'],
		['(huh)','hd.gif'],
		['(okay)','hq.gif'],
		['(cry)','ik.gif'],
		['(biggrin)','il.gif'],
		['(ca)','im.gif'],
		['(concentrated)','in.gif'],
		['(determined)','io.gif'],
		['(ewbte)','ip.gif'],
		['(gasp)','iq.gif'],
		['(gasp_r)','gasp_r.gif'],
		['(gman)','ir.gif'],
		['(gtfo)','is.gif'],
		['(pfftch)','iv.gif'],
		['(prrr)','iw.gif'],
		['(all)','all.gif'],
		['(point)','point.gif'],
		['(sing)','hk.gif'],
		['(dance)','ga.gif'],
		['(banana_cool)','gb.gif'],
		['(banana_rock)','gc.gif'],
		['(no_dance)','hf.gif'],
		['(dance_okok)','hb.gif'],
		['(droid_dance)','gd.gif'],
		['(cryblood)','if.gif'],
		['(jazzhands)','fr.gif'],
		['(rushface)','gk.gif'],
		['(puffy)','hi.gif'],
		['(taser_okok)','hl.gif'],
		['(vawesome)','hm.gif'],
		['(knife)','hr.gif'],
		['(bunny_dance)','hs.gif'],
		['(bunny_pose)','ia.gif'],
		['(cat)','ib.gif'],
		['(catface)','ic.gif'],
		['(wobbly)','ie.gif'],
		['(pcface)','iu.gif'],
		['(awesome)','awesome.gif'],
		['(boyan)','boyan.gif'],
		['(creeper)','creeper.gif'],
		['(kill)','kill.gif'],
		['(omsk)','omsk.gif'],
		['(rainbow)','rainbow.gif'],
		['(wall)','wall.gif']
	];
	smileyURL = 'http://artyfarty.ru/emo/';
	
	for(var i = smileys.length-1; i >= 0; i--) {
		smileys[i][0] = new RegExp(addslashes(smileys[i][0]), "gim");
		smileys[i][1] = smileyURL+smileys[i][1];
	}
	
	addStyle(".smileyext{margin-top:-2px;vertical-align:middle}");
}

function chatHook(match) {
	match.addEventListener('DOMNodeInserted',function(event) {
		var source = event.target;
		if(source.className == 'km' || source.className == 'kl' || source.className == 'Z8Dgfe') {
			insertSmiley(source);
		}
	},false);
	
	log('Smiley Extender started.');
}

function insertSmiley(node) {
	for(var i = smileys.length-1; i >= 0; i--) {
		var smileyRegex = smileys[i][0];
		var smileyImg = smileys[i][1];
		if (node.innerHTML.match(smileyRegex)) {
			node.innerHTML = node.innerHTML.replace(smileyRegex,' <img class="smileyext" src="'+smileyImg+'"> ');
			
			node.addEventListener('DOMSubtreeModified',function(event) {
				insertSmiley(node);
			},false);
		}
	}
}

function addslashes( str ) {    // Quote string with slashes
    //return str.replace('/(["\'\])/g', "\\$1").replace('/\0/g', "\\0");
	return str.replace(/([\\\(\)\[\]\+\-\*])/g, "\\$1");
}


})();
