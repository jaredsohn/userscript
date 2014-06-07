// ==UserScript==
// @name           Reddit Mold Cleaner
// @namespace      http://www.reddit.com/mold
// @description    Still want to comment while suffering Reddit Mold? (Code based on the fantastic RES)
// @author         Sparq
// @include        http://reddit.com/*
// @include        https://reddit.com/*
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// ==/UserScript==

// This is all shamelessly ripped from RES, go to http://reddit.honestbleeps.com/ to find this excellent Reddit Enhancement Suite!

var mold = [
    [/e/g, 'ẹ'], [/E/g, 'Ẹ'],
    [/x/g, 'ẋ'], [/X/g, 'Ẋ'],
    [/v/g, 'ṿ'], [/V/g, 'Ṿ'],
    [/o/g, 'ọ'], [/O/g, 'Ọ'],
    [/d/g, 'ḍ'], [/D/g, 'Ḍ'],
    [/f/g, 'ḟ'], [/F/g, 'Ḟ'],
    [/b/g, 'ḅ'], [/B/g, 'Ḅ'],
    [/z/g, 'ẓ'], [/Z/g, 'Ẓ'],
    [/w/g, 'ẉ'], [/W/g, 'Ẉ'],
    [/j/g, 'ĵ'], [/J/g, 'Ĵ'],
    [/g/g, 'ḡ'], [/G/g, 'Ḡ'],
    [/i/g, 'ì'], [/I/g, 'Ì'],
    [/t/g, 'ṭ'], [/T/g, 'Ṭ'],
    [/y/g, 'ẏ'], [/Y/g, 'Ẏ'],
    [/k/g, 'ḳ'], [/K/g, 'Ḳ'],
    [/s/g, 'ṣ'], [/S/g, 'Ṣ'],
    [/q/g, 'ɋ'], [/Q/g, 'Ɋ'],
    [/l/g, 'ḷ'], [/L/g, 'Ḷ'],
    [/r/g, 'ṛ'], [/R/g, 'Ṛ'],
    [/u/g, 'ụ'], [/U/g, 'Ụ'],
    [/n/g, 'ṇ'], [/N/g, 'Ṇ'],
    [/c/g, 'ç'], [/C/g, 'Ç'],
    [/a/g, 'ạ'], [/A/g, 'Ạ'],
];

var yourMold = document.querySelectorAll('.side .moldtaunt').length;



var includes = Array(
	/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]+\/comments\/[-\w\.]+/i,
	/https?:\/\/([a-z]+).reddit.com\/message\/[-\w\.]*\/?[-\w\.]*/i,
	/https?:\/\/([a-z]+).reddit.com\/r\/[-\w\.]*\/submit\/?/i,
	/https?:\/\/([a-z]+).reddit.com\/submit\/?/i
);

if (!isMatchURL(includes)) {
	return;
}

wireupExistingCommentEditors()

GM_addStyle('.markdownEditor { white-space: nowrap;  }');
GM_addStyle('.markdownEditor a { margin-right: 8px; text-decoration: none; font-size: 11px; }');
GM_addStyle('.demoldLink { font-weight: bold; background-color: #CCEEBB; border-radius: 3px 3px 3px 3px; display: inline-block; padding: 2px }');

// Watch for any future 'reply' forms, or stuff loaded in via "load more comments"...
document.body.addEventListener(
	'DOMNodeInserted',
	function( event ) {
		if (event.target.tagName == 'FORM') {
			wireupNewCommentEditors( event.target );
		}
		if ((event.target.tagName == 'DIV') && (hasClass(event.target,'thing'))) {
			wireupNewCommentEditors( event.target );
		}
	},
	false
);

/***********************************************************************************/

function isMatchURL(urls) {
	var currURL = location.href;
	for (i=0, len=includes.length; i<len; i++) {
		if (includes[i].test(currURL)) {
			return true;
		}
	}
	return false;
}

function wireupNewCommentEditors( parent )
{	
	if (!parent.getElementsByTagName) return;
	
	if ( parent.tagName == 'FORM' )
	{		
		//removeExistingEditor( parent );
		addMarkdownEditorToForm( parent );
	}
	else
	{		
		var forms = parent.getElementsByTagName('form');
		
				

		for ( var i=0, form=null; form=forms[i]; i++ ) {			
			if ( form.getAttribute('id') && (form.getAttribute('id').match(/^commentreply_./)))	{				
				addMarkdownEditorToForm( form );
			} else if (form.getAttribute('id').match(/^form-./)) {
				var usertext = form.querySelector('.usertext-edit');
				addMarkdownEditorToForm( usertext );
			}

		}
	}
}

function wireupExistingCommentEditors()
{
	var editDivs = document.body.querySelectorAll('div.usertext-edit');
	//First one is not an edit form.
	for ( var i = 0, len=editDivs.length; i < len; i++)
	{
		var editDiv = editDivs[i];
		addMarkdownEditorToForm( editDiv );
	}
	
}

function addMarkdownEditorToForm( parent ) 
{	
	var textAreas = parent.getElementsByTagName('textarea');
	
	
	if ( !textAreas[0] ) return;
	
	var targetTextArea = textAreas[0];
	
	var controlBox = parent.querySelector('.markdownEditor'); // Piggyback on RES
	
	if ( !controlBox )
	{
		controlBox = document.createElement( 'div' );
		controlBox.setAttribute('class', 'markdownEditor');
		parent.insertBefore( controlBox, parent.firstChild );
	}
	
	var demold = new EditControl(
		'<span class="demoldLink">De-mold</span>',
		function()
		{
			var newText = targetTextArea.value;
			var newMold = mold.slice(0, yourMold * 2);
			for (i = 0; i < newMold.length; i++) {
				newText = newText.replace(newMold[i][0],newMold[i][1]);
			}
			targetTextArea.value = newText;
		}
	);

var moremold = new EditControl(
		'<span class="demoldLink">+ Mold [' + yourMold + ']</span>',
		function()
		{
			yourMold = yourMold + 1;
			this.innerHTML = '<span class="demoldLink">+ Mold [' + yourMold + ']</span>';
		}
	);
	
	controlBox.appendChild( demold.create() );
	controlBox.appendChild( moremold.create() );
}

function EditControl( label, editFunction )
{
	this.create = function() 
	{
		var link = document.createElement('a');
		link.innerHTML = label;
		link.href = 'javascript:;';
		
		link.execute = editFunction;
		
		addEvent( link, 'click', 'execute' );
		
		
		return link;	
	}
}

function addEvent( target, eventName, handlerName )
{
	target.addEventListener(eventName, function(e){target[handlerName](e);}, false);
}