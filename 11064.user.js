// ==UserScript==
// @name           phpBBv3 Quick Edit
// @namespace      http://glenncarr.com/greasemonkey/phpbb
// @description    Allow quick post edits on a phpBBv3 standard template board
// @include        *viewtopic.php*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 613 $
// $LastChangedDate: 2012-02-09 13:27:27 -0600 (Thu, 09 Feb 2012) $
// ==/UserScript==
/*
    Updates:
    01-Aug-2007 - Added minimum height for textarea
    08-Aug-2007 - Shortened help tip
    10-Aug-2007 - Double-clicking on post does a quick edit (in addition to Alt-Edit).
    12-Aug-2007 - Bugfix: correct post wasn't always being displayed after saving
    16-Aug-2007 - Bugfix: Ampersands in message were being converted to &amp;
    20-Aug-2007 - Bugfix: Message options weren't being saved (attach signature, etc.) after a quick edit save
    20-Nov-2007 - Was broken by RC6,7.  Fixed by including valid values for new form field values.
    11-Dec-2007 - Bug fixes, in particular fixed a problem with a moderator/admin editing another user's posts.
    14-Dec-2007 - Fixed problem when editing posts with HTML entities (<,>,&,etc.) they'd be saved as '&lt;', etc.
    16-Dec-2007 - Fix for certain board mods.
    19-Dec-2007 - Fix bug introduced with last 'fix'.
    21-Mar-2008 - Add confirmation when hitting escape to prevent accidental cancels.
    09-Feb-2011 - Require Alt key while double-clicking to edit post so that double-clicks can be used to select words.
*/

(function() {

var WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
"0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
"02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
"136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
"2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
"%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
"00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
"4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
"3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";

var TEXTAREA_MAX_HEIGHT = 500.0;
var TEXTAREA_MIN_HEIGHT = 100.0;

GM_addStyle( '\
.gncEditContent input.button2 { margin: 2px 2px; width: 80px !important; } \
.gncEditContent div.buttons { width: 100%; text-align: center; } \
.gncEditHelp { font-style: italic; width: 100%; text-align: center }\
#gncWorking { text-align: left; font-style: italic }\
li.gncQuickEditNote { font-style: italic; padding-top: 2px; color: #666; }\
' );

var FONT_FAMILY = null;
var FONT_SIZE = null;

var editButtons = document.evaluate("//li/a[contains(@href,'?mode=edit')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for ( var i = 0; i < editButtons.snapshotLength; i++ )
{
    var editButton = editButtons.snapshotItem( i );
    editButton.title = editButton.title + ' (Hold Alt for Quick Edit)';

    var linote = document.createElement( 'li' );
    linote.setAttribute( "class", "gncQuickEditNote" );
    linote.innerHTML = '(<b>Alt-Edit</b> or Alt-double-click to Quick Edit)';
    var libutton = editButton.parentNode;
    libutton.parentNode.insertBefore( linote, libutton.parentNode.firstChild );

    var postbody = editButton;
    do
        postbody = postbody.parentNode;
    while ( postbody != null && postbody.getAttribute( "class" ) != 'postbody' );
    if ( postbody == null )
        continue;
    postbody.parentNode.addEventListener( 'dblclick', getEditHandler( editButton, postbody ), false );
    editButton.addEventListener( 'click', getClickEditHandler( editButton, postbody ), false );
}

function getClickEditHandler( editButton, postbody )
{
    return function( e )
        {
            if ( !e.altKey )
                return;

            e.stopPropagation();
            e.preventDefault();
            editPost( e, editButton, postbody );
        }
}

function getEditHandler( editButton, postbody )
{
    return function( e )
        {
            if ( !e.altKey )
                return;

            e.stopPropagation();
            e.preventDefault();
            editPost( e, editButton, postbody );
        }
}

var replyInputs;

function editPost( e, editButton, postbody )
{
    replyInputs = new Array();
    var divs = postbody.getElementsByTagName( 'div' );
    var content = null;
    for ( var i = 0; i < divs.length; i++ )
    {
        if ( divs[ i ].getAttribute( "class" ) == 'content' )
        {
            content = divs[ i ];
            break;
        }
    }
    if ( content == null )
        return;

    var textareas = content.parentNode.getElementsByTagName( 'textarea' );
    if ( textareas.length > 0 )
    {
        textareas[ 0 ].focus();
        return;
    }

    var height = document.defaultView.getComputedStyle(content, '').getPropertyValue("height");
    var fheight = Math.max( Math.min( parseFloat( height ), TEXTAREA_MAX_HEIGHT ), TEXTAREA_MIN_HEIGHT );
    height = fheight.toString() + height.replace( /^[\d\.]+(.+)$/, '$1' );

    var editcontent = document.createElement( 'div' );
    editcontent.style.display = 'none';
    editcontent.setAttribute( 'class', 'gncEditContent' );

    var textarea = document.createElement( 'textarea' );
    textarea.setAttribute( 'wrap', 'soft' );
    textarea.style.height = height;
    textarea.style.width = '100%';
    if ( FONT_FAMILY == null )
        FONT_FAMILY = document.defaultView.getComputedStyle(content, '').getPropertyValue("font-family");
    textarea.style.fontFamily = FONT_FAMILY;
    if ( FONT_SIZE == null )
        FONT_SIZE = document.defaultView.getComputedStyle(content, '').getPropertyValue("font-size");
    textarea.style.fontSize = FONT_SIZE;

    editcontent.appendChild( textarea );

    var divButtons = document.createElement( 'div' );
    divButtons.setAttribute( 'class', 'buttons' );
    var saveButton = document.createElement( 'input' );
    saveButton.value = 'Save';
    saveButton.type = 'submit';
    saveButton.setAttribute( 'class', 'button2' );
    divButtons.appendChild( saveButton );

    var cancelButton = document.createElement( 'input' );
    cancelButton.value = 'Cancel';
    cancelButton.type = 'reset';
    cancelButton.setAttribute( 'class', 'button2' );
    cancelButton.addEventListener( 'click', function(e) {
		if ( confirm( 'Are you sure you want to discard changes?' ) )
		{
			editcontent.parentNode.removeChild( editcontent );
			content.style.display = 'block';
		}
    }, false );
    divButtons.appendChild( cancelButton );
    editcontent.appendChild( divButtons );

    var divHelp = document.createElement( 'div' );
    divHelp.setAttribute( "class", "gncEditHelp" );
    divHelp.innerHTML = '(Alt-Enter will save changes. Escape will cancel changes.)';
    divButtons.appendChild( divHelp );

    var divWorking = document.createElement( 'div' );
    divWorking.id = 'gncWorking';
    divWorking.innerHTML = 'Retrieving editable message... <img src="' + WORKING_IMG_URL + '" />';
    content.parentNode.insertBefore( divWorking, content );

    var subject = '';
    var lastclick = '';
    var posturl = '';
    GM_xmlhttpRequest({
        method: 'GET',
        url: editButton.href,
        onload:
            function( responseDetails )
            {
                try
                {
                    if ( responseDetails.status != 200 )
                    {
                        alert( 'Unable to retrieve quoted text: ' + responseDetails.statusText );
                        return;
                    }
                    content.parentNode.insertBefore( editcontent, content.nextSibling );

                    var quote = responseDetails.responseText.split( /<textarea[^>]*>/gim )[ 1 ].split( /<\/textarea>/ )[ 0 ];
                    var span = document.createElement( 'span' );
                    span.innerHTML = quote;
                    textarea.value = html_entity_decode( span.innerHTML );
                    content.style.display = 'none';
                    divWorking.parentNode.removeChild( divWorking );
                    editcontent.style.display = 'block';
                    textarea.focus();

                    // <input type="text" name="subject" id="subject" size="45" maxlength="64" tabindex="2" value="" class="inputbox" />
                    var matches = responseDetails.responseText.match( /<input[^>]+ name="subject"[^>]* value="([^"]*)"/i );
                    if ( !matches )
                    {
                        alert( 'Unable to save post [1].' );
                        return;
                    }
                    subject = matches[ 1 ];

                    // <input type="hidden" name="lastclick" value="1185770431" />
                    var matches = responseDetails.responseText.match( /<input[^>]+ name="lastclick"[^>]* value="([^"]*)"/i );
                    if ( !matches )
                    {
                        alert( 'Unable to save post [2].' );
                        return;
                    }
                    lastclick = matches[ 1 ];

                    // action="./posting.php?mode=edit&amp;f=9&amp;sid=801683ae9c28a84bbd04a7814a9de9bc&amp;t=300640&amp;p=2483156"
                    var matches = responseDetails.responseText.match( / action="(\.\/posting[^"]*)"/i );
                    if ( !matches )
                    {
                        alert( 'Unable to save post [3].' );
                        return;
                    }
                    posturl = matches[ 1 ].replace( /&amp;/gi, '&' );

                    var disable_bbcode = responseDetails.responseText.match( /name="disable_bbcode" id="disable_bbcode"([^>]+)\/>/i )[ 1 ].replace( /\s+/g, '' );
                    var disable_smilies = responseDetails.responseText.match( /name="disable_smilies" id="disable_smilies"([^>]+)\/>/i )[ 1 ].replace( /\s+/g, '' );
                    var disable_magic_url = responseDetails.responseText.match( /name="disable_magic_url" id="disable_magic_url"([^>]+)\/>/i )[ 1 ].replace( /\s+/g, '' );
                    var attach_sig = responseDetails.responseText.match( /name="attach_sig" id="attach_sig"([^>]+)\/>/i )[ 1 ].replace( /\s+/g, '' );
                    var matches = responseDetails.responseText.match( /name="notify" id="notify"([^>]+)\/>/i );
                    var notify = '';
                    if ( matches ) // 'Notify' option isn't there when a mod is editing another user's post
                        var notify = matches[ 1 ].replace( /\s+/g, '' );

                    // Grab all the form fields so that we can include valid values when we post
                    html = '<form id="postform" ' + responseDetails.responseText.replace( /[\r\n]/g, '' ).split( /<form[^>]+id="postform"/i )[ 1 ];
                    html = html.replace( /(<\/form>).*/i, '$1' );
                    span.innerHTML = html;
                    var inputElements = span.getElementsByTagName( 'input' );
                    for ( var i = 0; i < inputElements.length; i++ )
                    {
                        var elementType = inputElements[ i ].getAttribute( "type" ).toLowerCase();
                        switch ( elementType )
                        {
                            case 'text':
                            case 'hidden':
                                replyInputs.push( { name:inputElements[ i ].getAttribute( "name" ),
                                                    value:inputElements[ i ].getAttribute( "value" ) } );
                                break;
                            default:
                                break;
                        }
                    }

                    saveButton.addEventListener( 'click', function(e) {
                        savePost( textarea, subject, lastclick, posturl, postbody, editcontent, content, disable_bbcode, disable_smilies, disable_magic_url, attach_sig, notify );
                    }, false );

                    textarea.addEventListener('keydown', function(e)
                        {
                            if ( e.keyCode == 27 ) // ESC
                            {
								if ( confirm( 'Are you sure you want to discard changes?' ) )
								{
									editcontent.parentNode.removeChild( editcontent );
									content.style.display = 'block';
								}
                            }
                            else if ( e.altKey && e.keyCode == 13 )
                            {
                                if ( confirm( 'Save changes?' ) )
                                    savePost( textarea, subject, lastclick, posturl, postbody, editcontent, content, disable_bbcode, disable_smilies, disable_magic_url, attach_sig, notify );
                            }
                            return false;
                        },
                        false);
                }
                catch ( e )
                {
                    alert( 'Unable to retrieve quoted text: ' + e.description );
                }
            },
        });
}

function savePost( textarea, subject, lastclick, posturl, postbody, editcontent, content, disable_bbcode, disable_smilies, disable_magic_url, attach_sig, notify )
{
    var postData = 'message=' + encodeURIComponent( textarea.value );
    postData += '&subject=' + encodeURIComponent( subject );

    for ( var i = 0; i < replyInputs.length; i++ )
    {
        var inputName = replyInputs[ i ].name.toLowerCase();
        if ( /^addbbcode/i.test( inputName ) )
            continue;
        switch( replyInputs[ i ].name.toLowerCase() )
        {
            case 'message':
            case 'subject':
                break;
            default:
                postData += '&' + replyInputs[ i ].name + '=' + encodeURIComponent( replyInputs[ i ].value );
                break;
        }
    }

    postData += '&lastclick=' + encodeURIComponent( lastclick );
    if ( disable_bbcode != '' )
        postData += '&disable_bbcode=on';
    if ( disable_smilies != '' )
        postData += '&disable_smilies=on';
    if ( disable_magic_url != '' )
        postData += '&disable_magic_url=on';
    if ( attach_sig != '' )
        postData += '&attach_sig=on';
    if ( notify != '' )
        postData += '&notify=on';
    postData += '&post=Submit';

    posturl = location.href.replace( /^(.+)\/[^/]+$/, '$1' ) + posturl.replace( /^\./, '' );
    GM_xmlhttpRequest({
        method: 'POST',
        url: posturl,
        headers: {'Content-type': 'application/x-www-form-urlencoded' },
        data: postData,
        onload:
            function( responseDetails )
            {
                if ( responseDetails.status != 200 )
                {
                    alert( 'Unable to retrieve quoted text: ' + responseDetails.statusText );
                    return;
                }

                var matches = responseDetails.responseText.match( /<a href="(.\/viewtopic\.php?[^"]+)">View your submitted message<\/a>/ );
                if ( matches )
                {
                    editcontent.parentNode.removeChild( editcontent );
                    content.style.display = 'block';
                    content.innerHTML = '<i>Saving... <img src="' + WORKING_IMG_URL + '" /></i>';
                    updatePost( matches[ 1 ].replace( /&amp;/gi, '&' ), textarea, postbody, editcontent, content );
                }
                else
                {
                    var matches = responseDetails.responseText.match( /<p class="error">([^<]+)<\/p>/i );
                    if ( matches )
                        alert( matches[ 1 ] );
                }
            },
        });
}

function updatePost( posturl, textarea, postbody, editcontent, content )
{
    posturl = location.href.replace( /^(.+)\/[^/]+$/, '$1' ) + posturl.replace( /^\./, '' );
    var postid = posturl.replace( /^.+#([^#]+)$/, '$1' );

    GM_xmlhttpRequest({
        method: 'GET',
        url: posturl,
        onload:
            function( responseDetails )
            {
                if ( responseDetails.status != 200 )
                {
                    alert( 'Unable to retrieve quoted text: ' + responseDetails.statusText );
                    return;
                }

                var span = document.createElement( 'span' );
                var html = responseDetails.responseText.replace( /[\r\n]+/gim, '' );
                span.innerHTML = html.replace( /^.*<body[^>]+>(.+)<\/body>/i, '$1' );
                var divs = span.getElementsByTagName( 'div' );

                var authorNew = null;
                var contentNew = null;
                var noticeNew = null;
                var postDiv = null;

                for ( var i = 0; i < divs.length && ( contentNew == null || noticeNew == null ); i++ )
                {
                    var div = divs[ i ];
                    if ( div.id == postid )
                        postDiv = div;

                    if ( postDiv == null )
                        continue;

                    if ( contentNew == null && div.getAttribute( "class" ) == 'content' )
                        contentNew = div;

                    if ( noticeNew == null && div.getAttribute( "class" ) == 'notice' )
                        noticeNew = div;
                }

                var divs = postbody.getElementsByTagName( 'div' );
                var noticeUpdated = false;
                for ( var i = 0; i < divs.length; i++ )
                {
                    var div = divs[ i ];
                    if ( contentNew != null && div.getAttribute( "class" ) == 'content' )
                        div.innerHTML = contentNew.innerHTML;

                    if ( noticeNew != null && div.getAttribute( "class" ) == 'notice' )
                    {
                        div.innerHTML = noticeNew.innerHTML;
                        noticeUpdated = true;
                    }
                }
                if ( !noticeUpdated )
                {
                    content.parentNode.insertBefore( noticeNew, content.nextSibling );
                }
            },
        });
}

var html_entity_decode_ta = document.createElement( "textarea" );
function html_entity_decode( str )
{
  html_entity_decode_ta.innerHTML = str.replace( /</g, "&lt;" ).replace( />/g, "&gt;" );
  return html_entity_decode_ta.value;
}

})();
