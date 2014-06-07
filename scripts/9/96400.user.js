//
// ==UserScript==
// @name          HabraUserNote
// @namespace     http://habrahabr.ru/
// @description   Adding notes for users at habrahabr.ru
// @author        crea7or
// @include       http://*.habrahabr.ru/
// @require       http://crea7or.spb.ru/scripts/user.js.updater.php?id=85482&days=7
// @version       1.0.0
// ==/UserScript==
//


var divProfileHeader = document.querySelector('div.profile-header');
var divPageNav = document.querySelector('div.page-navigation');
if ( divProfileHeader )
{
	var divComment = document.createElement('div');	
	divComment.setAttribute('style', 'overflow: hidden; width: 100%; clear: both; height: 36px; background-color: #F0F0F0; padding: 3px 3px 3px 3px; margin-bottom: 3px;');
	divComment.setAttribute('id', 'div-usernote');
	var habraUserComment = localStorage.getItem( "userNote" );
	if ( habraUserComment == null )
	{
		habraUserComment = 'Заметка о пользователе';
	}
	else
	{
		habraUserComment = JSON.parse( habraUserComment );
	}
	var textComment = document.createTextNode( habraUserComment );
	divComment.appendChild( textComment );
	divProfileHeader.parentNode.insertBefore( divComment, divPageNav );
	addEvent( document, 'click', userDocumentClick);
	addEvent( divComment, 'click', userCommentClick);
}

function userCommentClick( e )
{
	e.stopPropagation();
	var inputUserNote = document.getElementById('input-usernote');
	var divUserNote = document.getElementById('div-usernote');
	if( inputUserNote == null && divUserNote != null )
	{
		inputUserNote = document.createElement('textarea');
		inputUserNote.setAttribute('id', 'input-usernote');
		inputUserNote.setAttribute('style', 'width: 100%; height: 32px;');
		inputUserNote.value = divUserNote.innerHTML;
		divUserNote.innerHTML = '';
		if ( divUserNote.firstChild != null )
		{
			divUserNote.removeChild( divUserNote.firstChild );
		}
		inputUserNote.focus();
		divUserNote.appendChild( inputUserNote );
		addEvent( inputUserNote, 'keydown', userKeyDown);
	}
	e.preventDefault();
}

function userKeyDown( e )
{
	var inputUserNote = document.getElementById('input-usernote');
	if( inputUserNote )
	{
		if ( e.keyCode == 13 ) //enter
		{
			saveNote( inputUserNote.value );
			e.preventDefault();
		}
		else if (e.keyCode == 27 ) //ecs
		{
			var habraUserComment = localStorage.getItem( "userNote" );
			if ( habraUserComment != null)
			{
				saveNote( JSON.parse( habraUserComment ));
			}
			else				
			{	
				saveNote( null );
			}
			e.preventDefault();
		}
	}
}

function userDocumentClick( e )
{
	var inputUserNote = document.getElementById('input-usernote');
	if( inputUserNote )
	{
		saveNote( inputUserNote.value );
	}
}

function saveNote( habraUserComment )
{
	var inputUserNote = document.getElementById('input-usernote');
	if( inputUserNote )
	{
		if ( habraUserComment == null || habraUserComment.length == 0 )
		{
			habraUserComment = 'Заметка о пользователе';
		}
		localStorage.setItem( "userNote", JSON.stringify( habraUserComment ));
		var divUserNote = document.getElementById('div-usernote');
		divUserNote.removeChild( inputUserNote );
		if ( divUserNote )
		{
			var textComment = document.createTextNode( habraUserComment );
			divUserNote.appendChild( textComment );
		}
	}
}

function addEvent(obj,sEvent,sFunc)
{
	if(obj.addEventListener) obj.addEventListener(sEvent,sFunc,false);
	else if(obj.attachEvent) obj.attachEvent('on'+sEvent,sFunc);
}

