// ==UserScript==
// @name			Syrnia Layout Tweaks UPDATED
// @version             1.7
// @include		http://www.syrnia.com/game.php*
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
var body = document.getElementsByTagName('body')[0];
//We make the Menu Div and give it some inline styles and it's insides
var div_context = document.createElement('div');
div_context.setAttribute('style','display: none; position: absolute;');
div_context.setAttribute('id','divContext');
div_context.innerHTML = '<ul class="cmenu"><li><a href="" id="thieve">Thieve Player</a></li><li><a href="" id=playerwhisper>Whisper Player</a></li><li><a href="" id="sendmessage">Message Player</a></li><li><a href="" id="dwpage">DW-HQ Stats Page</a></li></ul>';
body.appendChild(div_context);

//We make a style element and attach it to the end of the head.
var style = document.createElement('style');
style.setAttribute('type','text/css');
style.innerHTML = '\
#centerPlayerList{text-align:left;}\
#centerPlayerList a{color:#00ffff;}\
#centerPlayerList a:hover{color:#e7c720;}\
.tag{display:block;float:left;text-align:right;width:35%;}\
.name{font-weight:bold;}\
#chatMessage{width:50%;}\
/*#googleSearchContainer, td.leftTD > a[onclick][href=""]{display:none;}*/\
#divContext{border: 1px solid black;border:4px solid #330030;}\
.cmenu {margin: 0; padding: 0.3em; list-style-type: none; background-color: #003300;text-align:center;font-weight:bold;}\
.cmenu a {border: 0 !important; color:#00ffff; text-decoration: none !important;}\
.cmenu a:hover {color: #e7c720 !important;}\
td.rightTD{\
    width:160px !important;\
}\
td.rightTD > table[width="160"]\
{\
    float:right !important;\
    overflow-x:hidden !important;\
    overflow-y:hidden !important;\
}\
td.rightTD > table[width="170"][border="1"]\
{\
    border:0 !important;\
    width:161px !important;\
}\
#mapContents{\
    border:0 !important;\
    padding:0 !important;\
}\
#chatHolderDisabled{\
left: 0!important;\
right: 0!important;\
position:static !important;\
}\
#chatContent > span{\
display:block;\
}\
\
#googleSearchContainer > table{\
width:100%;\
}\
\
#googleSearchContainer input[type="submit"]{\
width: 40px;\
}\
#googleSearchContainer input[type="text"]{\
width: 30px;\
}\
\
';
head.appendChild(style);

//Create a javascript element and attach it to the body.
var script_b = document.createElement('script');
script_b.innerHTML = "\
var _replaceContext = false;\
var _mouseOverContext = false;\
var _noContext = false;\
var _divContext = $('divContext');\
var div_cpl;\
\
setWatch = function(){\
	try{\
		div_cpl = $('centerPlayerList');\
		div_cpl.watch('innerHTML', setFormatting);\
		setFormatting();\
	}catch(e){\
		setTimeout('setWatch();',1000)\
	}\
};\
setWatch();\
\
";
body.appendChild(script_b);
body.removeChild(script_b);


//Create a javascript element and attach it to the head. This overwrites one of the games javascript functions.
var script_h = document.createElement('script');
script_h.innerHTML = "\
\
setFormatting = function(property, oldval, newval)\
{\
	$('moveMuch').value = 9999999;\
	$('frmChat').parentNode.style.height = '';\
	$('playerInventory').style.height = ($('playerInventory').style.height.slice(0,-2) / 1) + Element.getHeight($$('td.leftTD')[0]) - (Position.cumulativeOffset($$('table.leftTD[width=\"187\"]')[0])[1] + Element.getHeight($$('table.leftTD[width=\"187\"]')[0])) + 'px';\
		$('playerInventory').style.height = ($('playerInventory').style.height.slice(0,-2) / 1) + Element.getHeight($$('td.leftTD')[0]) - (Position.cumulativeOffset($$('table.leftTD[width=\"187\"]')[0])[1] + Element.getHeight($$('table.leftTD[width=\"187\"]')[0])) + 'px';\
			chatContent = $('chatContent');\
			chatContent.style.height = $$('td.centerTD')[0].getHeight() - Position.cumulativeOffset(chatContent)[1] - $('chatHolderDisabled').lastChild.getHeight();\
			centerContent = $('centerContent');\
			locContent = $('LocationContent');\
			worktd = centerContent.firstChild.firstChild.firstChild.lastChild;\
			locContent.style.height = locContent.getHeight() + worktd.getHeight() - (worktd.firstChild.getHeight() + worktd.lastChild.getHeight()) + 'px';\
			InitContext();\
			return newval;\
};\
\
function InitContext()\
{\
	_divContext.onmouseover = function() { _mouseOverContext = true; };\
	_divContext.onmouseout = function() { _mouseOverContext = false; };\
	document.body.onmousedown = ContextMouseDown;\
	document.body.oncontextmenu = ContextShow;\
}\
\
function ContextMouseDown(event)\
{\
	if (_noContext || _mouseOverContext)\
		return;\
	\
	var target = event.target;\
	\
	if (event.button == 2 && target.tagName.toLowerCase() == 'a' && target.parentNode.className == 'name')\
		_replaceContext = true;\
	else if (!_mouseOverContext)\
		_divContext.style.display = 'none';\
}\
\
function CloseContext()\
{\
	_mouseOverContext;\
	_divContext.style.display = 'none';\
}\
\
function ContextShow(event)\
{\
	if (_noContext || _mouseOverContext)\
		return;\
	\
	var target = event.target;\
	\
	if (_replaceContext) \
	{\
		$('sendmessage').href = 'http://www.syrnia.com/theGame/includes2/messages.php?p=messages&stuur=1&name='+target.innerHTML;\
		$('sendmessage').target = '_blank';\
		$('sendmessage').onclick = function(e){_divContext.style.display='none';};\
		$('playerwhisper').onclick = function( e ) { $('chatMessage').value = target.innerHTML + '@';$('chatMessage').focus();window.scroll(0,9999999);_divContext.style.display='none'; return false;};\
		$('dwpage').href = 'http://tlgrounds.com/showplayer.php?player='+target.innerHTML;\
		$('dwpage').target = '_blank';\
		$('dwpage').onclick = function(e){_divContext.style.display='none';};\
		$('thieve').onclick = function(e){_divContext.style.display='none';thieving('player',target.innerHTML,'');window.scroll(0,-9999999);return false;};\
		\
		var scrollTop = document.body.scrollTop;\
		var scrollLeft = document.body.scrollLeft;\
		\
		_divContext.style.display = 'none';\
		_divContext.style.left = event.clientX + scrollLeft + 'px';\
		_divContext.style.top = event.clientY + scrollTop + 'px';\
		_divContext.style.display = 'block';\
		\
		_replaceContext = false;\
		\
		return false;\
	}\
}\
/*Game's function*/\
function addPlayer2(name, tag, attack, hp, level)\
{\
	var level=\"\";\
	if(attack==1){ /*PVP Enemy*/\
		return tag+\" <a href=\\\"\\\" onClick=\\\"updateCenterContents('showPlayer', '\"+name+\"');return false;\\\"><b><font color=white>\"+name+\"</font></b></a> <a href=\\\"\\\" onClick=\\\"updateCenterContentsExtended('pvp', 'attack', '\"+name+\"');return false;\\\"><b><font color=red>Attack</font></b></a> \"+level+\" (\"+hp+\" hp)<br />\";\
	}else if(attack==2){/*PVP yourself*/\
	$(\"statsHPText\").innerHTML=hp;\
		return tag+\" <a href=\\\"\\\" onClick=\\\"updateCenterContents('showPlayer', '\"+name+\"');return false;\\\"><b><font color=white>\"+name+\"</font></b></a> \"+level+\" (\"+hp+\" hp)<br />\";\
	}else if(attack==3){/*PVP friendly*/\
		return tag+\" <a href=\\\"\\\" onClick=\\\"updateCenterContents('showPlayer', '\"+name+\"');return false;\\\"><b><font color=white>\"+name+\"</font></b></a> <a href=\\\"\\\" onClick=\\\"updateCenterContentsExtended('pvp', 'attack', '\"+name+\"');return false;\\\"><b><font color=green>Attack</font></b></a> \"+level+\" (\"+hp+\" hp)<br />\";\
	}else{/*non-PVP*/\
		return \"<div><span class=\\\"tag\\\"><a href=\\\"http://tlgrounds.com/showclan.php?tag=\"+tag.replace(/(\\[|\\])/g, \"\")+\"\\\" target=\\\"_blank\\\">\" + tag + \"</a>&nbsp;</span><span class=\\\"name\\\"><a href=\\\"\\\" onClick=\\\"updateCenterContents('showPlayer', '\"+name+\"');return false;\\\">\"+name+\"</a></span></div>\";\
	}\
};\
	\
	\
";
body.appendChild(script_h);
body.removeChild(script_h);