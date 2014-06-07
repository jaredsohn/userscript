// ==UserScript==
// @name           PH! hozzászólás-előnézet ALFA
// @namespace      http://prohardver.hu/
// @include        http://logout.hu/muvelet/hsz/uj.php*
// @include        http://logout.hu/muvelet/hsz/modosit.php*
// ==/UserScript==

// Tells whether a value is in an array or not
function inArray(cValue, cArray)
{
  for(var i = 0; i < cArray.length; i++) if(cArray[i] == cValue) return true;
  return false;
}

// Normalizes a string
function textNorm(str)
{
  return str.replace(/\s+/g, " ").replace(/^ | $/g, "");
}

// Tells whether an HTML element has a CSS class or not
function hasClass(cElement, cClass)
{
  if(!cElement.className) return false;
  else return inArray(cClass, cElement.className.split(/\s/));
}

// Adds/removes a CSS class to/from an HTML element
function setClass(cElement, cClass, value)
{
  var classes = (cElement.className ? cElement.className : "");
  if(classes) {
    classes = classes.split(/\s/);
    for(var i = 0; i < classes.length; i++) if(classes[i] == cClass) classes[i] = "";
    classes = classes.join(" ");
  }
  if(value) classes += " " + cClass;
  cElement.className = textNorm(classes);
}


// Gets the child elements of an HTML element
function getChildElems(cElement)
{
  if(!cElement.childNodes || !cElement.nodeType) return null;
  var childNodes = cElement.childNodes, childElems = [];
  for(var i = 0; i < childNodes.length; i++) if(childNodes[i].nodeType == 1) childElems[childElems.length] = childNodes[i];
  return childElems;
}

// Gets the first child of an HTML element that has the given CSS class
function getClassChild(cElement, cClass)
{
  var childElems = getChildElems(cElement);
  if(childElems) for(var i = 0; i < childElems.length; i++)
    if(hasClass(childElems[i], cClass)) return childElems[i];
  return null;
}

function msg_find()
{
	msg = document.getElementsByTagName('div');

	var found = false;
	
        // üzenetblokk keresése
	for(var i in msg)
	{
		if(hasClass(msg[i], 'msgblk')) {
			msg = msg[i];
			found = true;
			break;
		}
	}
	
        // ha nincs üzenetblokk akkor csinál
	if(!found) {
		//document.getElementById('page').innerHTML = '<br /><div class="msgblk"><h4 class="uzifo">hozzászólások</h4><div class="uzik"></div></div>';
		
		// VALAMIÉRT DOMMAL kell, innerHTML
		
		// <br /> csatolása
		document.getElementById('page').appendChild(document.createElement('br'));
		
		// üzenetblokk
		msg = document.createElement('div');
		msg.setAttribute('class', 'msgblk');
		
		// kis h4
		h = document.createElement('h4');
		h.setAttribute('class', 'uzifo');
		h.appendChild(document.createTextNode('hozzászólások'));
		
		// kis div
		//d2 = document.createElement('div');
		//d2.setAttribute('class', 'uzik');
		
		// kis cuccok csatolása
		msg.appendChild(h);
		//d.appendChild(d2);
		
		// nagy cucc csatolása
		document.getElementById('page').appendChild(msg);
	}
	
	msg.innerHTML += '<div class="uzik"><div class="fejlec"><h4>(<a name="msg1" href="#" title="Sorszám és hivatkozás erre a hozzászólásra">#</a>) <a href="/tag/lezso6.html" target="_blank" onclick="return popup(this,event);">lezso6</a></h4><div>2010-06-20 22:22:22</div></div><div class="arc"><img src="/dl/faces/c13.gif" alt="" /><br /><b>lezso6</b><br />(őstag)<br />(<a href="http://logout.hu/blog/lezso6/">LOGOUT blog</a>)</div><div class="uzi"><p class="mgt0"></p><p class="sign"><i></i></p></div><div class="clr"></div></div>';

        msg = msg.lastChild;
        msg = getClassChild(msg, 'uzi');
}
  
function msg_bb_format(text, tag)
{
	return text.replace(new RegExp('\\[' + tag + '\\]([^]*?)\\[\/' + tag + '\\]', 'g'), '<' + tag + '>$1</' + tag + '>'); 
}

function msg_update(cEvent)
{
	text = document.forms[0].elements[0].value;

	// formázás
	text = msg_bb_format(text, 'B');
	text = msg_bb_format(text, 'I');
	text = msg_bb_format(text, 'U');
	text = msg_bb_format(text, 'S');

	// kód
	text = text.replace(/\[M\]([^]*?)\[\/M\]/g, '<tt><span>$1</span></tt>');
	
	// off
	text = text.replace(/\[OFF\]([^]*?)\[\/OFF\]/g, '<small>$1</small>');
	
	// bekezdések
	text = text.replace(/\[P\]([^]*?)\[\/P\]/g, '<p class="mgt0 tad">$1</p>');
	text = text.replace(/\[P:L\]([^]*?)\[\/P\]/g, '<p class="mgt0 tal">$1</p>');
	text = text.replace(/\[P:R\]([^]*?)\[\/P\]/g, '<p class="mgt0 tar">$1</p>');
	text = text.replace(/\[P:C\]([^]*?)\[\/P\]/g, '<p class="mgt0 tac">$1</p>');
	text = text.replace(/\[P:J\]([^]*?)\[\/P\]/g, '<p class="mgt0 taj">$1</p>');

	// kép
	text = text.replace(/\[IMG:([^]*?)\]([^]*?)\[\/IMG\]/g, '<img src="$1" title="$2" />');

	// link
	text = text.replace(/\[L:([^]*?)\]([^]*?)\[\/L\]/g, '<a href="$1" target="_blank">$2</a>');
	
	// smile
	for(i=document.images.length-1;i>=0;i--) {
		if(!document.images[i].alt) continue;
		while(text.indexOf(document.images[i].alt) !== -1) {
			text = text.replace(document.images[i].alt, '<img src="' + document.images[i].src + '" />');
		}
	}
	
	ps = text.split('\n\n');
	for(i=0;i<ps.length;i++) {
		ps[i] = ps[i].replace(/\n/g, '<br />');
		if(i == 0) {
			msg.innerHTML = '<p class="mgt0">' + ps[i] + '</p>';
		} else {
			msg.innerHTML += '<p class="mgt1">' + ps[i] + '</p>';
		}
	}
}

function msg_on(cEvent)
{
        setClass(msg.parentNode, 'uff', false);
}

function msg_off(cEvent)
{
        setClass(msg.parentNode, 'uff', true);
}

// gombok eseményvezérlése
inputs = document.getElementsByTagName('input');
for(var i in inputs) {
	if(inputs[i].type != 'button') continue;
	inputs[i].addEventListener('click', msg_update, false);
}

// smile-k eseményvezérlése
imgs = document.getElementsByTagName('img');
for(var i in imgs) {
        imgs[i].addEventListener('click', msg_update, false);
}

var msg;

msg_find();

if(document.forms[0].elements[2].checked) msg_off();

document.forms[0].elements[0].addEventListener('keyup', msg_update, false);

document.forms[0].elements[1].addEventListener('click', msg_on, false);
document.forms[0].elements[2].addEventListener('click', msg_off, false);

msg_update(null);