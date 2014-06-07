//
// ==UserScript==
// @name          DirtyCommentsPreview
// @namespace   http://dirty.ru/
// @description   Dirty Feature Pack
// @author	crea7or, Stasik0
// @include       http://dirty.ru/comments/*
// @include       http://www.dirty.ru/comments/*
// @include       http://dirty.ru/my/inbox/*
// @include       http://www.dirty.ru/my/inbox/*
// @version        1.0.3
// ==/UserScript==
//

function addEvent(obj,sEvent,sFunc)
{
	if(obj.addEventListener) obj.addEventListener(sEvent,sFunc,false);
	else if(obj.attachEvent) obj.attachEvent('on'+sEvent,sFunc);
}
	
function vPreview(e)
{
	var vPrvDiv = document.getElementById( 'js-comments_reply_block' );
	var vPrvTextArea = document.getElementById( 'comment_textarea' );
	if ( vPrvTextArea && vPrvDiv )
	{
		vRemovePreview( null );
		var newdiv = document.createElement('div');
		newdiv.setAttribute('style', 'padding: 5px 5px 5px 5px; margin-left: 0px  !important; border: 1px dashed grey;');
		newdiv.setAttribute('id', 'vprw-preview');
		newdiv.setAttribute('class', 'comment');
		newdiv.innerHTML = vPrvTextArea.value.replace(/\n/g,'<br>');
		vPrvDiv.appendChild( newdiv );
	}
	e.preventDefault();
	return false;
}

function vRemovePreview(e)
{
	var vPrvDiv = document.getElementById( 'js-comments_reply_block' );
	var vPrvTextArea = document.getElementById( 'comment_textarea' );
	if ( vPrvTextArea && vPrvDiv )
	{
		vPrvTextPreview = document.getElementById( 'vprw-preview' );
		if ( vPrvTextPreview )
		{
			vPrvDiv.removeChild( vPrvTextPreview );
		}
	}
	return false;
}

var vPrvDiv = document.querySelector('div.comments_add_pics');
if ( vPrvDiv )
{
	var newdiv = document.createElement('div');
	newdiv.setAttribute('style', 'margin-right: 30px; float: right;');
	newdiv.innerHTML = "<a href=\"#\" id=\"prevLink\" class=\"dashed\" style=\"color: black; font-size: 11px;\">предпросмотр</a>";
	vPrvDiv.parentNode.insertBefore( newdiv, vPrvDiv );
	addEvent(document.getElementById('prevLink'), "click", vPreview);
	addEvent(document.getElementById('js-post-yarrr'), "click", vRemovePreview);
}
