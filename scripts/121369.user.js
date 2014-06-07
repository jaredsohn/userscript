// ==UserScript==
// @name        MusicBrainz swap artists and titles in RE
// @version     1.0.1
// @author      Brian Schweitzer (brianfreud)
// @include     http://musicbrainz.org/release/add*
// @include     http://musicbrainz.org/release/*/edit*
// @match       http://musicbrainz.org/release/add*
// @match       http://musicbrainz.org/release/*/edit*
// ==/UserScript==

/* ----------------------------------- */
// Script Update Checker: http://userscripts.org/scripts/show/20145
var SUC_script_num = 121369;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)console.log('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)console.log('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
/* ----------------------------------- */
// Chrome support for jQuery: http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery(callback) {var script = document.createElement("script");script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js");script.addEventListener('load', function() {var script = document.createElement("script");script.textContent = "(" + callback.toString() + ")();";document.body.appendChild(script);}, false);document.body.appendChild(script);}addJQuery(main);
/* ----------------------------------- */

function main() {
    jQuery.noConflict();
    (function ($) {
        var $swapButton = $('<input type="button"/>');
        $swapButton.addClass('buttonSwap')
                  .val('Swap titles and artists');
        $('td.tools').each(function () {
            $(this).prepend($swapButton.clone());
        });
        $('.buttonSwap').on('click', function () {
            var tracks = [],
                $thisMedium = $(this).parents('fieldset');
            var $thisMediumFields = $thisMedium.find('input'),
                $thisMediumACFields = $thisMedium.find('.artist-credit');
            tracks.$title = $thisMediumFields.filter('.track-name');
            tracks.$artist = $thisMediumFields.filter('.track-artist');
            tracks.$ACEditorArtist = $thisMediumACFields.find('.name');
            tracks.$ACEditorCredit = $thisMediumACFields.find('.credit');
            for (var i = 0, j = tracks.$title.length; i < j; i++) {
                var $thisTrack = tracks.$title.eq(i),
                    $thisArtist = tracks.$artist.eq(i),
                    $thisACEditorArtist = tracks.$ACEditorArtist.eq(i);
                    $thisACEditorCredit = tracks.$ACEditorCredit.eq(i);
                var artistName = $thisTrack.val();   // Store the initial values from the track title fields
                $thisTrack.val($thisArtist.val());   // Set the title fields
                $thisArtist.val(artistName);         // Set the artist fields in the release
                $thisACEditorArtist.val(artistName); // Set the artist fields in the AC editor fields
                $thisACEditorCredit.val(artistName); // Set the artist credit fields in the AC editor fields
            }
        });
    }(jQuery));
}