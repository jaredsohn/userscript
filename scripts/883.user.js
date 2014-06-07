// ==UserScript==
// @name          Leetify
// @namespace     http://vgm16.tripod.com/greasemonkey/Leetify.user.js
// @description   Makes j00r pages 1337, d00d!
// ==/UserScript==
const LEETIFY = 'Leetify';
var leet_on = true;
interceptor_setup();
function toggle_intercept(flag) {
	leet_on = flag;
	GM_setValue(LEETIFY, leet_on);
	location.reload();
	setup_leet_button();
}

function setup_leet_button() {
	var leet = document.getElementById('__leet_toggle');
	if (!leet) {
	    leet = new_node('span', '__leet_toggle');
	    leet.textContent = '1337';
	    document.getElementsByTagName('body')[0].appendChild(leet);
	    leet.addEventListener('click',
				function() {toggle_intercept(!leet_on)},
				false);

	    var leet_toggle_style = ' \
#__leet_toggle { \
  position: fixed; \
  bottom: 0; right: 0; \
  display: inline; \
  padding: 2px; \
  font: caption; \
  font-weight: bold; \
  cursor: crosshair; \
} \
#__leet_toggle:hover { \
  border-width: 2px 0 0 2px; \
  border-style: solid none none solid; \
  border-color: black; \
} \
';
	    add_style("__leet_toggle_style", leet_toggle_style);
	}

	if (leet_on) {
	    leet.textContent = '1337 is On';
	    leet.setAttribute('title', 'Click to turn L33tify Off');
	    leet.style.backgroundColor = '#000000';
	    leet.style.color = '#00ff00';
	} else {
	    leet.textContent = 'Leet is Off';
	    leet.setAttribute('title', 'Click to turn Leetify On');
	    leet.style.backgroundColor = '#ccc';
	    leet.style.color = '#888';
	}
    }

function interceptor_setup() {
	if (window.GM_getValue) {
	    leet_on = GM_getValue(LEETIFY, false);
	    GM_log('leet_on = ' + leet_on);
	    setup_leet_button();
	} else {
	    leet_on = true;
	}
}

function new_node(type, id) {
	var node = document.createElement(type);
	if (id && id.length > 0)
	    node.id = id;
	return node;
}

function new_text_node(txt) {
	return document.createTextNode(txt);
}

function add_style(style_id, style_rules) {
	if (document.getElementById(style_id))
	    return;

	var style = new_node("style", style_id);
	style.type = "text/css";
	style.innerHTML = style_rules;
	document.getElementsByTagName('head')[0].appendChild(style);
}
 
var leetletters;
var leetary = {
'!+' : ', dood!!!11one',
'you' : 'joo',
'(\\s)\\|5( |\\.|\\?|\\!)' : '$1 iz $2',
'(\\s)7#3( |\\.|\\?|\\!)' : '$1 teh $2',
a : '@',
b : 'ÃÂ',
c : 'ÃÂ¢',
d : 'ÃÂ°',
e : 'ÃÂ£',
f : '|=',
g : '9',
h : '|-|',
i : 'ÃÂ¡',
k : 'ÃÂ¦<',
l : '|',
m : '|\\/|',
n : 'ÃÂ±',
o : 'ÃÂ¸',
p : 'ÃÂ',
q : 'ÃÂ¶',
r : 'ÃÂ®',
s : 'ÃÂ§',
t : '7',
u : 'ÃÂµ',
v : '\\/',
w : 'VV',
x : '><',
y : 'ÃÂ¥',
z : 2
};
var mildleet = 0;
if (mildleet) {
	leetary = {
		e : 3,
		i : 'ÃÂ¡',
		o : 0,
		s : 5,
		t : 7,
		z : 2,
		'!+' : ', dood!!!11one',
		'y0u' : 'joo',
		'(\\s)\\ÃÂ¡2( |\\.|\\?|\\!)' : '$1iz$2',
		'(\\s)7h3( |\\.|\\?|\\!)' : '$1t3h$2',
	};
}
function leetify(leetMe) {
	var tmp = leetMe;
	var rxp;
	var leetlet;
	for (leetlet in leetary) {
		rxp = new RegExp(leetlet, "gi");
		tmp = tmp.replace(rxp,leetary[leetlet]);
	}
		// Needs special handling due to pipe in find string
	return tmp;
}
var tmp;
if (leet_on) {
var els = document.evaluate('//*', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var el,i=0;

while (el=els.snapshotItem(i++)) {
	//don't mess with these tags
	if ('SCRIPT'==el.tagName) continue;
	if ('STYLE'==el.tagName) continue;
	//if ('A'==el.tagName) continue;

	for (var j=0; j<el.childNodes.length; j++) {
		if ('#text'==el.childNodes[j].nodeName) {
			tmp=el.childNodes[j].textContent;
			tmp = leetify(tmp);
			el.childNodes[j].textContent = tmp;			
		}
	}
}
}