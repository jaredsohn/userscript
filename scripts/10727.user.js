// ==UserScript==
// @name           phpBB Add New Topic Button
// @namespace      http://glenncarr.com/greasemonkey/phpbb
// @description    Adds 'New Topic' next to 'Post Reply' on topic page of phpbbv3 standard template
// @include        *viewtopic.php*
// @author         Glenn Carr (glenn at glenncarr dot com)
// $LastChangedRevision: 178 $
// $LastChangedDate: 2007-07-17 10:58:38 -0500 (Tue, 17 Jul 2007) $
// ==/UserScript==

(function(){

var buttonAreas = document.evaluate( '//div[@class="buttons"]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if ( !buttonAreas )
    return;
    
for ( var i = 0; i < buttonAreas.snapshotLength; i++ )
{
    var buttonArea = buttonAreas.snapshotItem( i );
    var buttons = buttonArea.getElementsByTagName( 'div' );
    for ( var iButton = 0; iButton < buttons.length; iButton++ )
    {
        var button = buttons[ iButton ];
        if ( /^reply-icon$/i.test( button.getAttribute( "class" ) ) )
        {
            var newButton = document.createElement( 'div' );
            newButton.setAttribute( "class", "post-icon" );
            newButton.setAttribute( "style", "margin-right: 0px" );
            newButton.innerHTML = button.innerHTML.replace( /\?mode=reply/, '?mode=post' ).replace( /&amp;t=\d+/, '' );
            buttonArea.insertBefore( newButton, button );
            break;
        }
    }
}

})();