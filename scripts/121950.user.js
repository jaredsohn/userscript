// ==UserScript==
// @name        MusicBrainz: Batch-add tags to works, add type column to work page
// @version     1.1.2
// @author      Brian Schweitzer (brianfreud)
// @namespace   MBTagWorks
// @match       http://musicbrainz.org/artist/*/works*
// @include     http://musicbrainz.org/artist/*/works*
// @description Adds the ability to mass-tag works from an artist's works listing page, rather than having to open each work individually to tag it.  Also adds a work type column.
// ==/UserScript==

/* ----------------------------------- */
// Script Update Checker: http://userscripts.org/scripts/show/20145
var SUC_script_num = 121950;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)console.log('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)console.log('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

/* ----------------------------------- */
// Chrome support for jQuery: http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery(callback) {var script = document.createElement("script");script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js");script.addEventListener('load', function() {var script = document.createElement("script");script.textContent = "(" + callback.toString() + ")();";document.body.appendChild(script);}, false);document.body.appendChild(script);}addJQuery(main);
/* ----------------------------------- */

function main() {
    jQuery.noConflict();
    (function ($) {
        var $workRows = $("table.tbl > tbody > tr"),
              $workMaster = $('<br/>').after($('<div style="margin-top: 4px;" class="tagDiv"/>')
                                                       .append($('<input type="text" class="worktags"/>')
                                                           .css({
                                                                'border-color': 'grey',
                                                                'border-width': '1px',
                                                                'font-size':    '80%',
                                                                'margin-left':  '1em',
                                                                width:          '55%'
                                                                }))
                                                       .prepend($('<span style="color: grey; margin-left: 2em; font-size: 80%;"/>')
                                                           .text('Tag this work as...'))),
              markMeChanged = function ($changedInput) {
                  $changedInput.css('border-color', 'red')
                               .data("changed", true)
                               .val($changedInput.val().toLowerCase());
              },
              $blankRow = $('<tr/>'),
              $blankCell = $blankRow.clone().append($('<td/>')),
              $checkboxes, $works, $inputs, $tagDivs;
        $checkboxes = $workRows.find('input');
        $works = $workRows.find('a[href^="http://musicbrainz.org/work/"]');
        if ($works.length !== 0 && /musicbrainz\.org\/artist\/[a-z\d]{8}\-[a-z\d]{4}\-[a-z\d]{4}\-[a-z\d]{4}\-[a-z\d]{12}\/works/.test(window.location.href)) {
            $("table.tbl > thead > tr > th:last").before($('<th class="thType">Type</th>'));
            $workRows.each(function () {
                                       $(this).find('td:last').before($('<td class="rowType"/>'));
                                       });
            $("<table></table>").css({
                                                  background: '#F2F2F2',
                                                  border:     '1px #999 solid',
                                                  margin:     '0.5em'
                                                 })
                                          .append($blankCell.clone()
                                                            .append($('<h3 style="margin: .5em 0;"/>')
                                                                .text('Tag checked works with…')))
                                          .append($blankCell.clone()
                                                            .append($('<input id="globalTag" type="text" style="width: 95%;"/>')))
                                          .append($blankCell.clone()
                                                            .append($('<button type="button" id="tagShowHide"> tag controls</button>')
                                                                .prepend($('<span class="tagshowhide" id="hideText"/>').text('Hide'))
                                                                .prepend($('<span class="tagshowhide"/>').text('Show').hide()))
                                                            .append($('<button type="button" style="margin-left: 0.25em;" id="tagApply">Apply tags</button>'))
                                                            .append($('<button type="button" id="tagSubmit">Submit tags</button>')))
                                          .insertBefore($("form").last());
            $works.each(function (i) {
                $(this).after($workMaster.clone());
                $.get($(this).attr('href'), function (data) {
                    var tags = $(data).find('.tag-input').val();
                        type = $(data).find('.properties').find('dt:contains("Type:")').next().text();
                    $('.worktags:eq(' + i + ')').val(tags)
                                                .data('originalTags', tags);
                    $('.rowType:eq(' + i + ')').text(type);
                });
            });
            $inputs = $('.worktags');
            $tagDivs = $('.tagDiv');
            $inputs.on('change', function () {
                markMeChanged($(this));
            });
            $('#tagShowHide').on('click', function () {
                                                      $('.tagshowhide').toggle();
                                                      $tagDivs.toggle();
                                                      $('#tagSubmit, #globalTag, #tagApply').toggle();
                                                      });
            $('#tagApply').on('click', function () {
                $checkboxes.each(function (i) {
                    if ($(this).filter(':checked').length) {
                        var $thistag = $inputs.filter(':eq(' + i + ')'),
                            newtag = $('#globalTag').val();
                        if ($thistag.val().length > 0) newtag = ',' + newtag;
                        $thistag.val($thistag.val() + newtag)
                        markMeChanged($thistag);
                    }
                });
            });
            $('#tagSubmit').on('click', function () {
                var tagsToSubmit = [];
                $inputs.each(function (i) {
                    var newTags = $.trim($(this).val());
                    if ($(this).data("changed") && newTags !== $(this).data('originalTags')) {
                        tagsToSubmit[tagsToSubmit.length] = {
                                                            MBID:    $($works[i]).attr('href'),
                                                            $entity: $(this),
                                                            tags:    newTags
                                                            }
                    }
                    for (var i = 0, j = tagsToSubmit.length; i < j; i++) {
                        $.get(tagsToSubmit[i].MBID + '/ajax/tag', { tags: tagsToSubmit[i].tags })
                         .success(function ($entity) {
                                                     var tags = $entity.val().toLowerCase();
                                                     $entity.data("changed", false)
                                                            .data("originalTags", tags)
                                                            .css("border-color", "grey")
                                                            .val(tags);

                         }(tagsToSubmit[i].$entity));
                    }
                });
            });
            setTimeout(function () {
                                   $("#content").find('table:not(:last)').css({
                                                                              display:          "inline-block",
                                                                              "vertical-align": "top"
                                                                              })
                                   $('#tagShowHide').click();
                                   }, 1);
        }
    }(jQuery));
}