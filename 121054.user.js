// ==UserScript==
// @name        MusicBrainz Add artist relationship filtering
// @version     1.0.2
// @author      Brian Schweitzer (brianfreud)
// @description Adds filters to artist relationship pages
// @include     http://musicbrainz.org/artist/*/relationships
// @match       http://musicbrainz.org/artist/*/relationships
// ==/UserScript==

/* ----------------------------------- */
// Script Update Checker: http://userscripts.org/scripts/show/20145
var SUC_script_num = 121054;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)console.log('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)console.log('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
/* ----------------------------------- */
// Chrome support for jQuery: http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery(callback) {var script = document.createElement("script");script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js");script.addEventListener('load', function() {var script = document.createElement("script");script.textContent = "(" + callback.toString() + ")();";document.body.appendChild(script);}, false);document.body.appendChild(script);}addJQuery(main);
/* ----------------------------------- */

function main() {
    jQuery.noConflict();
    (function ($) {
        var entityTypes = ['recording', 'release-group', 'release', 'work'];
        $('#content').find('.tbl').before($('<div id="buttonContainer"/>'));
        for (var i = 0; i < entityTypes.length; i++) {
            var $newbutton = $('<input type="button" name="' + entityTypes[i] + '" />')
                                                        .val(entityTypes[i].charAt(0).toUpperCase() + entityTypes[i].slice(1) + 's')
                                                        .css({
                                                             background:      '#F0F0F0',
                                                             color:           '#529214',
                                                             cursor:          'pointer',
                                                             'font-weight':   'bold',
                                                             'margin-right':  '5px',
                                                             'margin-top':    '10px',
                                                             padding:         '4px 8px 4px 6px'
                                                             })
                                                        .click(function () { 
                                                            var $ARs = $('.tbl > tbody > tr > td:nth-child(2) > a[href*="/' + $(this).attr('name') + '/"]').parent().parent();
                                                            var $ARsOpenEdits = $('.tbl > tbody > tr > td:nth-child(2) > span > a[href*="/' + $(this).attr('name') + '/"]').parent().parent().parent();
                                                            if ($(this).css('color') == 'rgb(82, 146, 20)') {
                                                                $ARs.hide();
                                                                $ARsOpenEdits.hide();
                                                                $(this).css('color', '#D12F19');
                                                            } else {
                                                                $ARs.show();
                                                                $ARsOpenEdits.show();
                                                                $(this).css('color', '#529214');
                                                            }
                                                        });
            $('#buttonContainer').append($newbutton);
        }
        $('#content').find('.tbl').find('thead:not(:first)').each(function(){ 
            $(this).next().hide();
            $(this).find('th:first').css({
                                         textAlign: 'center',
                                         width: '6em'
                                         }).html('[ <span style="color: #002BBA; cursor: pointer">show</span> ]')
                                           .click(function () {
                                                              if ($(this).find('span').text() == 'show') {
                                                                  $(this).find('span').text('hide');
                                                              } else {
                                                                  $(this).find('span').text('show');
                                                              }
                                                              $(this).parent().parent().next().toggle();
                                                          });
        });
    }(jQuery));
}