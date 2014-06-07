// ==UserScript==
// @name           PinoySG.com Shoutbox Upgrade Beta 1.2
// @namespace      supermamon
// @description    This script positions the shoutbox at the top of the right column. Other features coming soon.
// @include        http://www.pinoysg.com
// @include        http://www.pinoysg.com/
// @include        http://www.pinoysg.com/index.php*
// ==/UserScript==
( function ()
{

/* ** helper functions ****************************************************** */	
var dc=document;
function fid(i){return dc.getElementById(i)};
function ftg(t,o){o=(o?o:dc);return o.getElementsByTagName(t);}
function vof(o){if (iob(o)) o.style.display='none';}
function von(o){if (iob(o)) o.style.display='inline';}
function len(e){return e.length};
function iob(o){var r=false;if(o)if(o.tagName)r=true;return r}
function fhid(i){var e=fid(i);if(e) vof(e)};
function gget(k){var e=GM_getValue(k);if(e) return e; else return '';}
function gset(k,v){GM_setValue(k,v)}
function gmnu(c,f){GM_registerMenuCommand(c,f)};
/* ************************************************************************** */

/* CUSTOMIZATION */
var shoutbox_height = 420;
var textbox_width = '100%';
//var favcolor = gget('psgsb_msgcolor');
var default_text = '[color=purple]  [/color]'; //not working

// right column
var jamasscol = document.getElementById('ja-masscol');
//tabs
var jatabswrap = document.getElementById('ja-tabswrap'); 
var jacol1 = document.getElementById('ja-col1');

//shoutbox
var SB;// = jacol1.childNodes[5];							
SB = jacol1.lastChild.previousSibling.previousSibling.previousSibling;
//move shoutbox before tabs
jamasscol.insertBefore(SB, jatabswrap);

// biggie size
var chatoutput=document.getElementById('chatoutput');
chatoutput.style.height= shoutbox_height + 'px';

// chat input
var chatForm = document.getElementById('chatForm');
var table = chatForm.lastChild.previousSibling;
table.width='100%';
table.border=0;
var msg = table.previousSibling.previousSibling;
var chatbarText = document.getElementById('chatbarText');
var tr = chatbarText.parentNode.parentNode;
var submitchat = document.getElementById('submitchat');
//submitchat.className = '';
var moresmileys = document.getElementById('moresmileys');
//moresmileys.className='';

// move textbox out of table
chatForm.insertBefore(chatbarText,msg);
chatForm.insertBefore(msg,chatbarText);
// biggie size textbox
chatbarText.style.width = textbox_width;

table.childNodes[1].removeChild(tr);
table.height='1';
//------------------------------------------------------------------------------
var script = document.createElement('script');
script.type = 'text/javascript';
script.text = '';
script.text += '\n';
script.text += 'var chatbarText = document.getElementById(\'chatbarText\');\n';
script.text += 'var bbcolor=\'Black\'\n';
script.text += 'var msg=\'\'\n';
script.text += '\n';
script.text += 'function d2h(dec) { \n';
script.text += '  var h = dec.toString(16);\n';
script.text += '  if (h.length==0) { h=\'00\'; } \n';
script.text += '  if (h.length==1) { h=\'0\'+h; } \n';
script.text += '  return h; \n';
script.text += '}\n';
script.text += '\n';
script.text += 'function td_mouseover(r,g,b){\n';
script.text += '  var cpreview = document.getElementById(\'cpreview\');\n';
script.text += '  cpreview.style.backgroundColor=\'#FFFFFF\';\n';
script.text += '  cpreview.style.color=\'RGB(\'+r+\',\'+g+\',\'+b+\')\';\n';
script.text += '}\n';
script.text += '\n';
script.text += 'function td_click(r,g,b){\n';
script.text += '  selcolor=\'#\'+ d2h(r) + \'\' + d2h(g) + \'\' + d2h(b);\n';
//script.text += '  alert(selcolor);\n';
script.text += '  chatbarText.style.color=selcolor;\n';
script.text += '}\n';
script.text += '\n';
script.text += 'function preEnter(o, e){\n';
script.text += '  if (e.which==13) { \n';
script.text += '    setText();\n';
script.text += '  }\n';
script.text += '}\n';
script.text += 'function setText(){\n';
script.text += '    chatbarText.value=\'[color=\'+ selcolor +\']\'+ chatbarText.value + \'[/color]\'\n';
script.text += '}\n';

document.body.appendChild(script);

chatbarText.setAttribute('onkeypress','preEnter(this, event); return pressedEnter(this, event);');
submitchat.setAttribute('onClick','setText(); return true;');

var colorpicker = document.createElement('DIV');
var ctable = document.createElement('TABLE');
ctable.cellSpacing = 0;
ctable.cellPadding = 0;
ctable.border=0;
ctable.align='center';
var ctr,td;


for (var r=0;r<=255;r+=51) {
	ctr = document.createElement('TR');
	for (var g=0;g<=255;g+=51) {
		for (var b=0;b<=255;b+=51) {
			td = document.createElement('TD');
			td.style.backgroundColor = 'RGB('+r+','+g+','+b+')';
			td.style.width='9px';
			td.style.height='9px';
			td.style.borderWidth = '0px';
			td.style.cursor='hand';
			td.innerText = '&nbsp;';
			td.setAttribute('onMouseOver','td_mouseover('+r+','+g+','+b+');')
			td.setAttribute('onClick','td_click('+r+','+g+','+b+');')
			ctr.appendChild(td);
			ctable.appendChild(ctr);
		}
		
	}
}
ctr = document.createElement('TR');
td = document.createElement('TD');
td.id ='cpreview';
td.setAttribute('colspan','36');
td.setAttribute('align','center');
td.style.backgroundColor = 'White';
td.style.color = 'Black';
td.style.borderWidth = '0px';
td.style.height = '8px;'
td.appendChild( document.createTextNode('Pinoy SG rules!') );
ctr.appendChild(td);
ctable.appendChild(ctr);

colorpicker.appendChild(ctable);
chatForm.insertBefore(colorpicker,chatbarText);


}
)();