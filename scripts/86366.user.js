// ==UserScript==
// @id	mde_buttons
// @name	Mods.de Button Overhaul
// @version	1.3
// @include	http://forum.mods.de/bb/newreply.php*
// @include	http://forum.mods.de/bb/editreply.php*
// @include	http://forum.mods.de/bb/newthread.php*
// @include	http://forum.mods.de/bb/thread.php?*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant	GM_addStyle
// @run-at	window-load
// ==/UserScript==

'use strict'

// wird unter scriptish beim onload ausgeführt, damit es nach dem quickreply-script lädt.

function addJQuery(callback) {
    var script = document.createElement('script')
    script.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js')
    script.addEventListener('load', function() {
        var script2 = document.createElement('script')
        script2.textContent = '(' + callback.toString() + ')();'
        document.body.appendChild(script2)
    }, false)
    document.body.appendChild(script)
}

function main() {

//when used on a text input widget, this inserts bb tags around the selection
//use what you would use in the start tag.
//example:
//given a textarea with the id 'ta' and the selected content <selection>,
//$('#ta').insertRoundCaret('url=http://goo.gl') yields [url="http://goo.gl"]<selection>[/url] and
//$('#ta').insertRoundCaret('url=http://','Insert URL:') yields [url=<url>]<selection>[/url],
//where <url> is fetched via a popup which is prefilled with 'http://'

$.fn.insertRoundCaret = function (tag, question) {
	return this.each(function() {
		var i = tag.indexOf('=')
		  , tagName  = (i === -1) ? tag : tag.substring(0, i)
		  , tagValue = (i === -1) ? ''  : tag.substring(i + 1)
		//if there is a question, prompt it, using the value as preset, else use the value if present
		var strStart = '[' + tagName
		  , strEnd = '[/' + tagName + ']'
		
		if (tagValue.length > 0 || question) {
			if (question)
				tagValue = window.prompt('Bitte ' + question, tagValue) //Autopoliteness (TM)
			if (tagValue.length > 0)
				strStart += '="' + tagValue + '"'
		}
		strStart += ']'
		
		$(this).insertCustomCaret(strStart, strEnd)
	})
}

$.fn.insertCustomCaret = function(strStart, strEnd) {
	return this.each(function() {
		//if there is a selection, wrap tags around it
		if (this.selectionStart || this.selectionStart === 0) {
			var startPos  = this.selectionStart
			  , endPos    = this.selectionEnd
			  , scrollTop = this.scrollTop
			this.value = this.value.substring(0, startPos) + strStart + this.value.substring(startPos, endPos) + strEnd + this.value.substring(endPos)
			this.focus()
			this.selectionStart = startPos	+ strStart.length
			this.selectionEnd   = endPos	+ strStart.length
			this.scrollTop      = scrollTop
		} else { // if no selection is present, just append tags to the end
			this.value += strStart + strEnd
			this.focus()
			this.selectionStart = this.selectionEnd = this.value.length - strEnd.length
		}
	})
}

$.fn.insertPerLine = function(str) {
	return this.each(function() {
		if (this.selectionStart || this.selectionStart === 0) {
			var startPos  = this.selectionStart
			  , endPos    = this.selectionEnd
			  , scrollTop = this.scrollTop
			  , lines = this.value.substring(startPos, endPos).split('\n')
			lines.forEach(function(line, i) {
				lines[i] = str + line
			})
			this.value = this.value.substring(0, startPos) + lines.join('\n') + this.value.substring(endPos)
			this.focus()
			this.selectionStart = startPos +  str.length
			this.selectionEnd   = endPos   + (str.length * lines.length)
			this.scrollTop      = scrollTop
		} else {
			this.value += str
			this.focus()
			this.selectionStart = this.selectionEnd = this.value.length
		}
	})
}

function smilieWindow() {
    window.open(
    	'misc.php?view=smilies&amp;window=1',
    	'smilieWindow',
    	'width=300, height=400, status=no, toolbar=no, menubar=no, location=no, directories=no, resizeable=no, scrollbars=yes')
}

GM_addStyle([
'#qr_insertcustombuttonshere > img,',
'.newInsertButton {',
'	float:     left;',
'	max-width: 28px;',
'}',
'',
'#qr_insertcustombuttonshere > img,',
'.newInsertButton,',
'input[type="submit"] {',
'	border: 1px solid #224;',
'	background-color: #394e63;',
'	box-shadow:	0px 1px 3px rgba(255,255,255,.3) inset;',
'	-o-box-shadow:	0px 1px 3px rgba(255,255,255,.3) inset;',
'	-moz-box-shadow:	0px 1px 3px rgba(255,255,255,.3) inset;',
'	-webkit-box-shadow:	0px 1px 3px rgba(255,255,255,.3) inset;',
'	height: 24px;',
'	overflow: show;',
'	text-align: center;',
'	color:  white;',
'	margin-right: 3px;',
'}',
'',
'#qr_insertcustombuttonshere > img:hover:not(:active),',
'.newInsertButton:hover:not(:active),',
'input[type="submit"]:hover:not(:active) {',
'	border-color: #008fe1;',
'	box-shadow: 0px 1px 3px rgba(255,255,255,.3) inset,',
'	            0px 0px 2px #008fe1;',
'	-o-box-shadow: 0px 1px 3px rgba(255,255,255,.3) inset,',
'	               0px 0px 2px #008fe1;',
'	-moz-box-shadow: 0px 1px 3px rgba(255,255,255,.3) inset,',
'	                 0px 0px 2px #008fe1;',
'	-webkit-box-shadow: 0px 1px 3px rgba(255,255,255,.3) inset,',
'	                    0px 0px 2px #008fe1;',
'}',
'',
'#qr_insertcustombuttonshere > img:hover:active,',
'.newInsertButton:hover:active,',
'input[type="submit"]:hover:active {',
'	box-shadow: 0px 1px 3px rgba(0,0,0,.3) inset;',
'	-o-box-shadow: 0px 1px 3px rgba(0,0,0,.3) inset;',
'	-moz-box-shadow: 0px 1px 3px rgba(0,0,0,.3) inset;',
'	-webkit-box-shadow: 0px 1px 3px rgba(0,0,0,.3) inset;',
'}',
'',
'.newInsertButton .border {border:1px solid silver; display:inline-block; width:1.2em}',
'.newInsertButton .spoiler {text-shadow:0px 0px 2px rgba(255,255,255,.5)}',
'.newInsertButton .brdr,',
'.newInsertButton .spoiler {min-width:16px; display:inline-block}',
'.newInsertButton .tex {font-family:serif}',
].join('\n'))

//shamelessly stolen from kambfhase
if (!document.evaluate('//a[contains(@href, "./quickmod")]', document, null, 8, null).singleNodeValue)
	GM_addStyle('.iAmMod { display:none }')

var toolbar = $('img[alt="Fett"]').parent()
  , ta = $('#pstmsg,#message,#thrmsg')
  , buttonTmpl = $('<button/>').addClass('newInsertButton').attr('type', 'button')
  , buttons = [
	['Fett',	'<b>F</b>',	function() { ta.insertRoundCaret('b') }],
	['Unterstreichen',	'<u>U</u>',	function() { ta.insertRoundCaret('u') }],
	['Code',	'<code class="border">C</code>',	function() { ta.insertRoundCaret('code') }],
	['Kursiv',	'<i>K</i>',	function() { ta.insertRoundCaret('i') }],
	['Durchstreichen',	'<s>S</s>',	function() { ta.insertRoundCaret('s') }],
	['Trigger',	'<span class="trigger">T</span>',	function() { ta.insertRoundCaret('trigger') }],
	['Monospace',	'<code>M</code>',	function() { ta.insertRoundCaret('m') }],
	['TeX',	'<span class="tex">T</span>',	function() { ta.insertRoundCaret('tex') }],
	['Audio',	'♫',	function() { ta.insertRoundCaret('audio') }],
	['Video',	'▶',	function() { ta.insertRoundCaret('video') }],
	['PHP',	'<code class="border">P</code>',	function() { ta.insertRoundCaret('php') }],
	['Bild einfügen',	'⌧',	function() { ta.insertRoundCaret('img') }],
	['Link',	'<u>url</u>',	function() { ta.insertRoundCaret('url=http://', 'URL angeben') }],
	['Liste',	'☰', function() {
		ta.insertRoundCaret('list=1', 'Listentyp angeben: 1, a oder leer')
		ta.insertCustomCaret('\n', '\n')
		ta.insertPerLine('[*] ')
	}],
	['Listenelement',	'•',	function() { ta.insertCustomCaret('[*] ','') }],
	['Smiley einfügen',	'☺',	smilieWindow],
	['Quote',	'<span class="border">Q</i>',	function() { ta.insertRoundCaret('quote') }],
	['Spoiler',	'<span class="spoiler">S</i>',	function() { ta.insertRoundCaret('spoiler') }],
	['Mod',	'Mod',	function() { ta.insertRoundCaret('mod') }],
]

toolbar.empty()
buttons.forEach(function(btn) {
	buttonTmpl.clone()
	   .appendTo(toolbar)
	   .attr('alt', btn[0])
	   .html(btn[1])
	   .click(btn[2])
})

$('button[alt="Mod"]').addClass('iAmMod')

}

if ($)
	main()
else
	addJQuery(main)