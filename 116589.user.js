// ==UserScript==
// @name           phpBB Add Quick Search Options
// @namespace      http://glenncarr.com/greasemonkey/phpbb
// @include        *warezserbia.com*
// $LastChangedRevision: 133 $
// $LastChangedDate: 2007-06-18 13:48:59 -0500 (Mon, 18 Jun 2007) $
// ==/UserScript==
/*
    about:config settings:

    save_last_search_within - whether to save last 'search within' option
    last_search_within - default search within option (all/msgonly/titleonly/firstpost)
    
Updates:
    18-Jun-2007 - Added tweak to change font size of 'search this topic' quick search and some buttons
*/

(function() {

var SAVE_LAST_SEARCH_WITHIN = GM_getValue("save_last_search_within", true);
var LAST_SEARCH_WITHIN = GM_getValue("last_search_within", "all");
var SEARCH_THIS_TOPIC_FONT_SIZE = GM_getValue("fix_search_this_topic_font_size", '11px');
GM_setValue( "fix_search_this_topic_font_size", SEARCH_THIS_TOPIC_FONT_SIZE );

var searchForm = document.forms.namedItem( 'search' );
if ( !searchForm )
    return;

var submitButton = document.evaluate(
        "//form[@id='search']//input[@type='submit']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null).snapshotItem( 0 );
if ( !submitButton )
    return;

GM_addStyle('\
div#gncSearch, div.gncSearch select { font-size: 9px }\
div#gncSearch { text-align: left; }\
div#gncSearch select { width: 100%; }\
INPUT.tiny, INPUT.button2 { font-size: ' + SEARCH_THIS_TOPIC_FONT_SIZE + '}\
');

var elSelect = document.createElement( 'select' );
elSelect.name = 'sf';
elSelect.innerHTML = '\
<option value="all">Subjects and message</option>\
<option value="msgonly">Message text only</option>\
<option value="titleonly">Topic titles only</option>\
<option value="firstpost">First posts of topics</option>\
';

if ( SAVE_LAST_SEARCH_WITHIN )
{
    for ( var i = 0; i < elSelect.options.length; i++ )
    {
        if ( elSelect.options[ i ].value == LAST_SEARCH_WITHIN )
        {
            elSelect.options[ i ].selected = true;
            break;
        }
    }
}

var div = document.createElement( 'div' );
div.id = 'gncSearch';
div.innerHTML = 'Search within:<br/>';
div.appendChild( elSelect );

submitButton.parentNode.insertBefore( div, submitButton.nextSibling.nextSibling );

if ( SAVE_LAST_SEARCH_WITHIN )
{
    submitButton.addEventListener( 'click', function(e) {
        GM_setValue("last_search_within", searchForm.elements.namedItem( 'sf' ).value );
    }, false );
}

})();