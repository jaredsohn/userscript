// ==UserScript==
// @name           phpBBv3 Quick Reply
// @description    Adds a primitive quick reply form to a phpBBv3 topic page
// @namespace      http://glenncarr.com/greasemonkey/phpbb
// @include        *viewtopic.php*
// @include        *posting.php*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 389 $
// $LastChangedDate: 2007-12-19 00:34:27 -0600 (Wed, 19 Dec 2007) $
// ==/UserScript==
/*
    about:config options
        attach_signature - default: true
        disable_bbcode - default: false
        disable_smilies - default: false
        disable_parse_urls - default: false
        notify_on_reply - default: false
*/
/*
    Updates:
    25-Jul-2007 - Bugfix
    25-Jul-2007 - Bugfix: Quick Reply wasn't being inserted on topics with only one post; Also added 'Save' button
    25-Jul-2007 - Yet another bugfix: Quick Reply wasn't being inserted in other situation
    25-Jul-2007 - Make tab order match the regular post page; Change button text
    26-Jul-2007 - Add posting options (attach sig, etc.)
    26-Jul-2007 - Added ability to quote posts by holding down ALT key when 'Quote' is clicked; Made height of TEXTAREA taller
    27-Jul-2007 - Added ability to increase/decrease message area dynamically with little buttons on the right
    27-Jul-2007 - Added keybindings for Alt-PageUp and Alt-PageDown to resize message area; Fixed bug where height wasn't limited
    27-Jul-2007 - Added client-side POST so that there's no intermediate page after replying
    29-Jul-2007 - Display errors when a post a made too soon after posting
    29-Jul-2007 - Add keybinding to use Alt-Enter to submit the post
    29-Jul-2007 - Removed experimental 'View Smilies' link
    31-Jul-2007 - Stop default behavior of downloading link when Alt-clicking on Quote buttons
    31-Jul-2007 - Only handle Alt-Enter if quick reply textarea has focus
    01-Aug-2007 - Added subject; Removed resize buttons from tab traversal
    03-Aug-2007 - Added smiley support
    08-Aug-2007 - Shortened help tip
    14-Sep-2007 - Fixed bug where topic ID wasn't found
    20-Nov-2007 - Was broken by RC6,7.  Fixed by including valid values for new form field values.
    27-Nov-2007 - Allow Alt-Enter to work on regular posting page.
    16-Dec-2007 - Fixes due to certain board mods
    19-Dec-2007 - Fix bug introduced with last 'fix'.
*/

(function() {

// As well as adding quick reply functionality, also take the liberty to add the same
// keyboard shortcut (Alt-Enter) to submit posts for the regular posting page used to reply/edit/post.
// (I was constantly annoyed that hitting Alt-Enter didn't work on those pages after becoming so
// accustomed to hitting with the Quick Reply/Edit scripts.
if ( /posting\.php/i.test( location.href ) )
{
    var textarea = document.getElementById( 'message' );
    if ( textarea == null )
        return;

    // Find first 'Submit' button and fire a click on it.
    var submitButton = document.evaluate("//input[@type='submit'][@value='Submit']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if ( submitButton.snapshotLength == 0 )
        return;
    submitButton = submitButton.snapshotItem( 0 );

    textarea.addEventListener('keydown', function(e)
        {
            if ( e.altKey && e.keyCode == 13 && confirm( 'Submit message?' ) )
            {
                // Thanks to Mihai Parparita for the simulateClick function:
                // http://googlereader.blogspot.com/2005/11/warning-geekery-ahead.html
                var event = submitButton.ownerDocument.createEvent("MouseEvents");
                event.initMouseEvent("click",
                                     true, // can bubble
                                     true, // cancellable
                                     submitButton.ownerDocument.defaultView,
                                     1, // clicks
                                     50, 50, // screen coordinates
                                     50, 50, // client coordinates
                                     false, false, false, false, // control/alt/shift/meta
                                     0, // button,
                                     submitButton);

                submitButton.dispatchEvent(event);
            }
            return false;
        },
        false);
    return;
}

var WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
"0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
"02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
"136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
"2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
"%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
"00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
"4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
"3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";

var sidanchors = document.evaluate("//a[contains(@href,'sid=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( sidanchors.snapshotLength == 0 )
    return;

var sid = sidanchors.snapshotItem( 0 ).href.replace( /^.*&sid=([^&]+)/, '$1' );

var elementToPrecede = document.getElementById( 'viewtopic' );
if ( !elementToPrecede || elementToPrecede.tagName != 'FORM' )
{
    var topicActions = document.evaluate("//div[@class='topic-actions']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if ( topicActions.snapshotLength != 2 )
        return;

    elementToPrecede = topicActions.snapshotItem( 1 );
}

var forumId = location.href.replace( /^.*[?&]f=(\d+).*$/, '$1' );
if ( !forumId || !/^\d+$/.test( forumId ) )
{
    var f = document.evaluate("//a[contains(@href,'viewforum.php?f=')][contains(.,'Return to ')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if ( f.snapshotLength == 0 )
        return;

    forumId = f.snapshotItem( 0 ).href.replace( /^.*[?&]f=(\d+).*$/, '$1' );
    if ( !forumId || !/^\d+$/.test( forumId ) )
        return;
}

var t = document.evaluate("//h2/a[contains(@href,'viewtopic.php?t=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( t.snapshotLength == 0 )
{
    t = document.evaluate("//h2/a[contains(@href,'viewtopic.php?f=')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if ( t.snapshotLength == 0 )
        return;
}

var topicId = t.snapshotItem( 0 ).href.replace( /^.*[?&]t=(\d+).*$/, '$1' );
if ( !topicId || !/^\d+$/.test( topicId ) )
    return;
var subject = t.snapshotItem( 0 ).innerHTML;

t = document.evaluate( "//a[contains(@href,'posting.php?mode=reply')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( t.snapshotLength == 0 )
    return;
var postReplyUrl = t.snapshotItem( 0 ).href;

GM_addStyle( '\
*::-moz-any-link input, *::-moz-any-link textarea { /* FX only disappearing caret anyone? */ overflow: auto; }\
.gncQuoteHelp { font-style: italic }\
FORM#gncQuickReply { text-align: center }\
FORM#gncQuickReply > div { padding: 3px 3px }\
FORM#gncQuickReply TEXTAREA { font-size: 1.3em; height: 150px; }\
li.gncQuickReplyNote { font-style: italic; padding-top: 2px; color: #666; }\
' );

var ATTACH_SIG = GM_getValue( 'attach_signature', true );
GM_setValue( 'attach_signature', ATTACH_SIG );

var DISABLE_BBCODE = GM_getValue( 'disable_bbcode', false );
GM_setValue( 'disable_bbcode', DISABLE_BBCODE );

var DISABLE_SMILIES = GM_getValue( 'disable_smilies', false );
GM_setValue( 'disable_smilies', DISABLE_SMILIES );

var DISABLE_PARSE_URLS = GM_getValue( 'disable_parse_urls', false );
GM_setValue( 'disable_parse_urls', DISABLE_PARSE_URLS );

var NOTIFY_ON_REPLY = GM_getValue( 'notify_on_reply', false );
GM_setValue( 'notify_on_reply', NOTIFY_ON_REPLY );

var qrForm = document.createElement( 'form' );
qrForm.id = 'gncQuickReply';
qrForm.method = 'post';
qrForm.action = './posting.php?mode=reply&f=' + forumId + '&sid=' + sid + '&t=' + topicId;

var IMAGE_URL_DECREASE = 'data:image/gif;base64,R0lGODlhFQAJAIABAE1NTQAAACH5BAEAAAEALAAAAAAVAAkAAAIUjI%2Bpe8BvgIRLWlpxnbpZ14UiUgAAOw%3D%3D';
var IMAGE_URL_INCREASE = 'data:image/gif;base64,R0lGODlhFQAJAIABAE1NTQAAACH5BAEAAAEALAAAAAAVAAkAAAIUjI%2Bpy50AoVtxMmBVlPnUjmAgWAAAOw%3D%3D';

qrForm.style.display = 'none';
qrForm.innerHTML = '\
<div id="postingbox" class="panel"><div class="inner" align="center">\
<h3>Quick Reply</h3>\
<div id="message-box">\
<table style="width: 100%;" cellpadding="0" cellspacing="0">\
<tr><td valign="bottom" nowrap style="padding-bottom: 1px">\
<strong><label for="subject">Subject:</label></strong> \
<input tabindex="2" class="inputbox" type="text" value="Re: ' + subject + '" size="45" maxlength="64" id="subject" name="subject"/></td></tr>\
<tr><td valign="top">\
<textarea tabindex="3" id="message" name="message"></textarea>\
</td><td valign="top" style="padding-left: 3px; width: 3px">\
<a tabindex="-1" href="#" id="gncDecreaseMessageArea"><img src="' + IMAGE_URL_DECREASE + '" title="Decrease message area (Alt-Page Up)" /></a>\
<br/>\
<a tabindex="-1" href="#" id="gncIncreaseMessageArea"><img src="' + IMAGE_URL_INCREASE + '" title="Decrease message area (Alt-Page Up)" /></a>\
</td></tr></table>\
<div id="smilies" width="100%" style="text-align: center">Loading smilies...<img src="' + WORKING_IMG_URL + '" /></div>\
<fieldset class="fields1">\
<label for="disable_bbcode"><input type="checkbox" ' + (DISABLE_BBCODE ? 'checked="checked"' : '' ) + ' id="disable_bbcode" name="disable_bbcode"/> Disable BBCode</label>\
 <label for="disable_smilies"><input type="checkbox" ' + (DISABLE_SMILIES ? 'checked="checked"' : '' ) + ' id="disable_smilies" name="disable_smilies"/> Disable smilies</label>\
 <label for="disable_magic_url"><input type="checkbox" ' + (DISABLE_PARSE_URLS ? 'checked="checked"' : '' ) + ' id="disable_magic_url" name="disable_magic_url"/> Do not parse URLs</label>\
 <label for="attach_sig"><input type="checkbox" ' + (ATTACH_SIG ? 'checked="checked"' : '' ) + ' id="attach_sig" name="attach_sig"/> Attach signature</label>\
 <nobr><label for="notify"><input type="checkbox" ' + (NOTIFY_ON_REPLY ? 'checked="checked"' : '' ) + ' id="notify" name="notify"/> Notify me on reply</label></nobr>\
</fieldset>\
<fieldset class="submit-buttons">\
<input type="submit" tabindex="6" class="button2" value="Save" name="save" /> \
<input type="submit" tabindex="4" onclick="document.getElementById(\'gncQuickReply\').action += \'#preview\';" class="button1" value="Preview" name="preview"/> \
<input type="submit" tabindex="5" class="button1" value="Submit" name="post"/>\
</fieldset>\
<div class="gncQuoteHelp">(To add quoted text from posts above, hold down ALT while clicking "Quote" buttons.<br/>To resize message area, use Alt-Page Up and Alt-Page Down.  To submit post, use Alt-Enter.)</div>\
</div></div>\
</div>\
';

var replyInputs = new Array();

// http://www.fantasybaseballcafe.com/forums/posting.php?mode=reply&f=9&t=300640
GM_xmlhttpRequest({
    method: 'GET',
    url: postReplyUrl,
    onload:
        function( responseDetails )
        {
            try
            {
                if ( responseDetails.status != 200 )
                {
                    smileyArea.innerHTML = 'Unable to retrieve smilies: ' + responseDetails.statusText;
                    return;
                }
                var smileyArea = document.getElementById( 'smilies' );
                var html = responseDetails.responseText.replace( /[\r\n]/g, '' ).replace( /^.*<div id="smiley-box">(.*)/, '$1' ).split( /<\/div>/ )[ 0 ];
                var tmp = document.createElement( 'span' );
                tmp.innerHTML = html;
                var smileyLinks = tmp.getElementsByTagName( 'a' );
                var smileyHtml = new Array();
                var xmlSerializer = new XMLSerializer();
                for ( var i = 0; i < smileyLinks.length; i++ )
                {
                    if ( /<img/i.test( smileyLinks[ i ].innerHTML ) )
                        smileyHtml.push( xmlSerializer.serializeToString( smileyLinks[ i ] ) );
                }
                smileyArea.innerHTML = smileyHtml.join( ' ' );
                var smileyLinks = smileyArea.getElementsByTagName( 'a' );
                for ( var i = 0; i < smileyLinks.length; i++ )
                {
                    var a = smileyLinks[ i ];
                    a.addEventListener( 'click', function(e)
                        {
                        e.stopPropagation();
                        e.preventDefault();

                        var smileyText = ' ' + this.firstChild.alt + ' ';

                        if (!isNaN(textarea.selectionStart))
                        {
                            var sel_start = textarea.selectionStart;
                            var sel_end = textarea.selectionEnd;

                            mozWrap(textarea, smileyText, '')
                            textarea.selectionStart = sel_start + smileyText.length;
                            textarea.selectionEnd = sel_end + smileyText.length;
                        }
                        else if (textarea.createTextRange && textarea.caretPos)
                        {
                            if (baseHeight != textarea.caretPos.boundingHeight)
                            {
                                textarea.focus();
                                storeCaret(textarea);
                            }

                            var caret_pos = textarea.caretPos;
                            caret_pos.text = caret_pos.text.charAt(caret_pos.text.length - 1) == ' ' ? caret_pos.text + smileyText + ' ' : caret_pos.text + smileyText;
                        }
                        else
                        {
                            textarea.value = textarea.value + smileyText;
                        }

                        }, true );
                }

                // Grab all the form fields so that we can include valid values when we post
                html = '<form id="postform" ' + responseDetails.responseText.replace( /[\r\n]/g, '' ).split( /<form[^>]+id="postform"/i )[ 1 ];
                html = html.replace( /(<\/form>).*/i, '$1' );
                tmp.innerHTML = html;
                var inputElements = tmp.getElementsByTagName( 'input' );
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
                qrForm.style.display = 'block';
            }
            catch ( e )
            {
                smileyArea.innerHTML = 'Unable to retrieve smilies: ' + e.description;
            }
        },
    });

elementToPrecede.parentNode.insertBefore( qrForm, elementToPrecede );
var textarea = document.getElementById( 'message' );

// Post using client-side request
var submitButton = qrForm.elements.namedItem( 'post' );
submitButton.addEventListener( 'click', function(e)
    {
        e.stopPropagation();
        e.preventDefault();
        postMessage();
    }, false );

var increase = document.getElementById( 'gncIncreaseMessageArea' );
increase.addEventListener( 'click', function(e)
    {
        e.stopPropagation();
        e.preventDefault();
        resizeMessageArea( +100 );
    }, false );

var decrease = document.getElementById( 'gncDecreaseMessageArea' );
decrease.addEventListener( 'click', function(e)
    {
        e.stopPropagation();
        e.preventDefault();
        resizeMessageArea( -100 );
    }, false );

function resizeMessageArea( heightDelta )
{
    var height = parseInt( document.defaultView.getComputedStyle(textarea, '').getPropertyValue("height"), 10 );
    height = Math.max( 100, Math.min( 1000, height + heightDelta ) );
    textarea.style.height = (height + 'px');
}

textarea.addEventListener('keydown', function(e)
    {
        if ( e.altKey && e.keyCode == 13 && confirm( 'Post quick reply?' ) )
            postMessage();
        return false;
    },
    false);

document.addEventListener('keydown', function(e)
    {
        if ( e.altKey /* && e.ctrlKey && e.shiftKey */ )
        {
            if ( e.keyCode == 33 ) // Page Up
                 resizeMessageArea( -100 );
            else if ( e.keyCode == 34 ) // Page Down
                 resizeMessageArea( +100 );
        }
        return false;
    },
    false);

var quoteButtons = document.evaluate("//li/a[contains(@href,'?mode=quote')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for ( var i = 0; i < quoteButtons.snapshotLength; i++ )
{
    var quoteButton = quoteButtons.snapshotItem( i );
    quoteButton.title = quoteButton.title + ' (Hold Alt to quote in Quick Reply)';

    var linote = document.createElement( 'li' );
    linote.setAttribute( "class", "gncQuickReplyNote" );
    linote.innerHTML = '(<b>Alt-Quote</b> to Quick Reply quote)';
    var libutton = quoteButton.parentNode;
    libutton.parentNode.insertBefore( linote, libutton.parentNode.firstChild );

    quoteButton.addEventListener( 'click', function(e) {
        if ( !e.altKey )
            return;

        e.stopPropagation();
        e.preventDefault();

        GM_xmlhttpRequest({
            method: 'GET',
            url: this.href,
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
                        var quote = responseDetails.responseText.split( /<textarea[^>]*>/gim )[ 1 ].split( /<\/textarea>/ )[ 0 ];
                        var span = document.createElement( 'span' );
                        span.innerHTML = quote;
                        var textarea = document.getElementById( 'message' );
                        textarea.value += span.innerHTML;
                        textarea.focus();
                    }
                    catch ( e )
                    {
                        alert( 'Unable to retrieve quoted text: ' + e.description );
                    }
                },
            });

        }, false );
}

function nextSiblingEx( el )
{
    var p = el;
    do
        p = p.nextSibling;
    while (p && p.nodeType != 1);
    return p;
}

function postMessage()
{
    var postData = 'message=' + encodeURIComponent( qrForm.elements.namedItem( 'message' ).value );
    postData += '&subject=' + encodeURIComponent( qrForm.elements.namedItem( 'subject' ).value );

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

    if ( qrForm.elements.namedItem( 'disable_bbcode' ).checked )
        postData += '&disable_bbcode=' + encodeURIComponent( qrForm.elements.namedItem( 'disable_bbcode' ).value );
    if ( qrForm.elements.namedItem( 'disable_smilies' ).checked )
        postData += '&disable_smilies=' + encodeURIComponent( qrForm.elements.namedItem( 'disable_smilies' ).value );
    if ( qrForm.elements.namedItem( 'disable_magic_url' ).checked )
        postData += '&disable_magic_url=' + encodeURIComponent( qrForm.elements.namedItem( 'disable_magic_url' ).value );
    if ( qrForm.elements.namedItem( 'attach_sig' ).checked )
        postData += '&attach_sig=' + encodeURIComponent( qrForm.elements.namedItem( 'attach_sig' ).value );
    if ( qrForm.elements.namedItem( 'notify' ).checked )
        postData += '&notify=' + encodeURIComponent( qrForm.elements.namedItem( 'notify' ).value );
    postData += '&post=Submit';

    GM_xmlhttpRequest({
        method: 'POST',
        url: qrForm.action,
        headers: {'Content-type': 'application/x-www-form-urlencoded' },
        data: postData,
        onload:
            function( responseDetails )
            {
                try
                {
                    if ( responseDetails.status != 200 )
                    {
                        alert( 'Unable to post reply: ' + responseDetails.statusText + ', ' + responseDetails.responseText );
                        return;
                    }

                    // Find this in the response:
                    //   <a href="./viewtopic.php?f=9&amp;t=300640&amp;p=2480844#p2480844">View your submitted message</a>
                    var matches = responseDetails.responseText.match( /<a href="(.\/viewtopic\.php?[^"]+)">View your submitted message<\/a>/ );
                    if ( matches )
                        window.location.href = matches[ 1 ].replace( /&amp;/gi, '&' );
                    else
                    {
                        var matches = responseDetails.responseText.match( /<p class="error">([^<]+)<\/p>/i );
                        if ( matches )
                            alert( matches[ 1 ] );
                        //window.location.reload( false );
                    }
                }
                catch ( e )
                {
                    alert( 'Unable to post reply: ' + e.description );
                }
            },
        });
}


/**
* From http://www.massless.org/mozedit/
*/
function mozWrap(txtarea, open, close)
{
    var selLength = txtarea.textLength;
    var selStart = txtarea.selectionStart;
    var selEnd = txtarea.selectionEnd;
    var scrollTop = txtarea.scrollTop;

    if (selEnd == 1 || selEnd == 2)
    {
        selEnd = selLength;
    }

    var s1 = (txtarea.value).substring(0,selStart);
    var s2 = (txtarea.value).substring(selStart, selEnd)
    var s3 = (txtarea.value).substring(selEnd, selLength);

    txtarea.value = s1 + open + s2 + close + s3;
    txtarea.selectionStart = selEnd + open.length + close.length;
    txtarea.selectionEnd = txtarea.selectionStart;
    txtarea.focus();
    txtarea.scrollTop = scrollTop;

    return;
}

/**
* Insert at Caret position. Code from
* http://www.faqts.com/knowledge_base/view.phtml/aid/1052/fid/130
*/
function storeCaret(textEl)
{
    if (textEl.createTextRange)
    {
        textEl.caretPos = document.selection.createRange().duplicate();
    }
}

})();