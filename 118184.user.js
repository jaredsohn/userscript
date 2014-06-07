// ==UserScript==
// @name        MusicBrainz artist splitter enhancer
// @version     1.1.2
// @author      Brian Schweitzer (brianfreud)
// @description Enhances the artist splitter page to make it more functional
// @include     http://musicbrainz.org/artist/*/split
// @include     http://musicbrainz.org/artist/*/split
// @include     http://musicbrainz.org/artist/*/credit/*/edit
// @match       http://musicbrainz.org/artist/*/split
// @match       http://musicbrainz.org/artist/*/credit/*/edit
// ==/UserScript==

/* ----------------------------------- */
// Script Update Checker
// http://userscripts.org/scripts/show/20145
var SUC_script_num = 118067;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
/* ----------------------------------- */
// Chrome support for jQuery
// http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
/* ----------------------------------- */
    function addJQuery(callback) {
    var script = document.createElement("script");script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js");script.addEventListener('load', function() {var script = document.createElement("script");script.textContent = "(" + callback.toString() + ")();";document.body.appendChild(script);}, false);document.body.appendChild(script);}addJQuery(main);
/* ----------------------------------- */

function main() {
    jQuery.noConflict();
    (function($) { 
        function makeBasicSortName(thisname) {
            var splitName = thisname.split(" "), i;
            var nameLen = splitName.length;
            if (nameLen > 1) {
                var sortName = splitName[nameLen - 1] + ",";
                for (i = 0; i < (nameLen - 1); i++) {
                    sortName += " " + splitName[i];
                }
                return(sortName);
            } else {
                return(thisname);
            }
        }
        $(function() {
            var addArtist = function () { $('.add-artist-credit')[0].click(); },
                $addForm,
                artistArray = $('.ui-autocomplete-input')[0].value.split(/[,|\s&]\s/),
                $artistFields,
                buttonCSS = { color: 'rgb(82,146,20)', marginLeft: '.5em', fontWeight: 'normal' },
                $createButton,
                i,
                label = "label { float: left; min-width: 140px; }",
                legend = "legend { color: #FC6714; font-weight: bold; margin: 0 10px; }",
                rightCSS = {position: "absolute", right: "1em"};
            var $basicButton = $('<input type="button"/>').addClass('positive')
                                                          .css(buttonCSS);
            /* Prevent tab from freezing in Chrome if artist cannot be split. */
            if($('p:contains("This artist has relationships other than")').length === 0) {
                /* Get the add artist form */
                $.get('http://musicbrainz.org/artist/create', function (data) {
                    $addForm = $('<form id="addForm"/>').append($(data).find('.half-width > *'));
                    var submitButton = $addForm.find('button');
                    submitButton.css(buttonCSS);
                    if ($.browser.mozilla) { submitButton.css(rightCSS); }
                    $addForm.find("label:eq(7),p").remove();
                    $addForm.find("textarea").attr("rows", 2);
                    $addForm.find('[id="label-id-edit-artist.begin_date"]').text("Begin:");
                    $addForm.find('[id="label-id-edit-artist.end_date"]').text("End:");
                    $addForm.find('[name="edit-artist.gender_id"]').attr("disabled", true);
                });
                /* Open the artist splitter dialog */
                $('#open-ac').click();
                while (!$('.artist-credit-container:visible').length) { /* Do nothing */ }
                /* Add enough fields to hold all artists */
                for (i = 0; i < (artistArray.length - 1); i++) { addArtist(); }
                /* Populate the artist fields */
                $('.ui-autocomplete-input:not(:first)').each(function (index) {
                                                                              $(this).val($.trim(artistArray[index]))
                                                                                     .removeClass("lookup-performed")
                                                                                     .addClass("error");
                                                                              });
                $(".credit:first").val($.trim(artistArray[0]));
                /* Add support for creating artists inline */
                $(".remove-artist-credit").each(function (index) {
                    $createButton = $basicButton.clone()
                                                .data("open", false)
                                                .val('Create');
                    $(this).after($createButton);
                    $createButton.click(function () {
                        if ($(this).data("open")) { // Add form is open, so close it
                            $('#addContainer' + index).remove();
                            $(this).data("open", false).val("Create");
                        } else { // Add form is closed, so open it
                            var $addContainer = $('<div id="addContainer' + index + '" />').addClass("bubble").css("marginTop", ".5em"),
                                $artistGender,
                                $artistType,
                                $buttonBox,
                                $copyButton,
                                $guessSortButton,
                                $labelBegin,
                                $labelEnd,
                                newArtistGID,
                                typeArray = [];
                            $(this).after($addContainer)
                                   .data("open", true)
                                   .val("Cancel");
                            /* Create the add artist form */
                            $('<iframe id="separateedit' + index + '" style="border: none" />').load(function(){
                                var $contents = $(this).contents();
                                $contents.find('body')
                                         .prepend($("<style type='text/css'>" + label + legend + "</style>"))
                                         .prepend($addForm.clone(true));
                                $(this).height(($contents.height() - 100) + "px")
                                       .width(($contents.width() + 140) + "px");
                                $contents.find("input:first").val(artistArray[index]);
                                /* Replicate the functionality of an add artist form... */
                                /* ...the guess sort name button */
                                $guessSortButton = $basicButton.clone().val('Guess')
                                                               .click(function () {
                                                                                  $contents.find("input:eq(1)").val(makeBasicSortName($contents.find('[name="edit-artist.name"]').val()));
                                                                                  });
                                /* ...the copy sort name button */
                                $copyButton = $basicButton.clone().val('Copy')
                                                          .click(function () {
                                                                                     $contents.find("input:eq(1)").val($contents.find('[name="edit-artist.name"]').val());
                                                                                     });
                                $buttonBox = $("<div/>").append($guessSortButton).append($copyButton);
                                $contents.find("input:eq(1)").prev().after($buttonBox.prepend($contents.find("input:eq(1)")));
                                /* ...the submit edit button */
                                $contents.find('.submit').click(index, $.proxy(function () {
                                    var newArtistName = $contents.find('[name="edit-artist.name"]').val(),
                                        $iFrame = $('#separateedit' + index),
                                        submitString = $contents.find('#addForm').serialize();
                                    /* Synchronize the new artist's name back to the lookup field, just in case we've changed the name from within the form. */
                                    $('[name="split-artist.artist_credit.names.' + index + '.artist.name"]').val(newArtistName);
                                    $('[name="split-artist.artist_credit.names.' + index + '.name"]').val(newArtistName);
                                    /* Change the form display to make it a status field */
                                    $contents.find('#addForm').empty();
                                    $iFrame.height("").contents().find('body').append('<strong id="workingText"><em>Working...</em></strong>');
                                    $('[name="split-artist.artist_credit.names.' + index + '.artist.name"]').val(newArtistName);
                                    /* Submit the edit */
                                    $.post('http://musicbrainz.org/artist/create', submitString, $.proxy(function (data) {
                                        newArtistGID = $(data).find('.gid').val();
                                        $contents.find('#workingText').hide();
                                        if (typeof(newArtistGID) === "undefined") { // Edit failed.
                                            $contents.find('body').append("<em>Sorry, the add artist edit failed.</em><br/><br/>Most likely, this is because another artist with the same name already exists.<br/>If you are sure that the artist you want is not already in the database,<br/>please use the regular add artist page to create this artist.");
                                            $iFrame.parent().prev().val("Close");
                                        } else { // Edit succeeded, resolve the artist and get rid of the form.
                                            /* Split artist is one of the few which still uses rowIDs, so we need  */
                                            /* to convert the GID into an ID.  Merge Artist also uses rowIDs.      */
                                            $contents.find('body').append("<strong>Edit succeeded.</strong><br/><br/>Almost done, please wait one more moment...");
                                            $.get('http://musicbrainz.org/artist/' + newArtistGID, $.proxy(function (data) {
                                                var rowID = $(data).find('a:contains("Merge artist")').attr("href").split("=")[1],
                                                    previewText = "";
                                                $('[name="split-artist.artist_credit.names.' + index + '.artist.id"]').val(rowID);
                                                $('[name="split-artist.artist_credit.names.' + index + '.artist.name"]').removeClass("error")
                                                                                                                        .addClass("lookup-performed");
                                                /* Update the preview text */
                                                $('.credit,.join').each(function (i) {
                                                    var inputText = $(this).val();
                                                    if (!(i % 2) && inputText.length === 0) {
                                                        previewText += $(this).parent().parent().prev().find('span > input:first').val();
                                                    } else {
                                                        previewText += inputText;
                                                    }
                                                    $('.artist-credit-preview').html(previewText);
                                                });
                                            },index));
                                            $iFrame.parent().prev().click();
                                        }
                                    }, $iFrame));
    
                                }, $contents));
                                /* ...The right date text for the artist type, and ensure that only people can have genders */
                                $artistGender = $contents.find('[name="edit-artist.gender_id"]');
                                $artistType = $contents.find('[name="edit-artist.type_id"]');
                                $labelBegin = $contents.find('[id="label-id-edit-artist.begin_date"]');
                                $labelEnd = $contents.find('[id="label-id-edit-artist.end_date"]');
                                typeArray[1]  = { type: 'unknown', value: '', hasGender: false, beginText: 'Began',   endText: 'Ended'     };
                                typeArray[11] = { type: 'person',  value: 1,  hasGender: true,  beginText: 'Born',    endText: 'Deceased'  };
                                typeArray[21] = { type: 'group',   value: 2,  hasGender: false, beginText: 'Founded', endText: 'Dissolved' };
                                typeArray[31] = { type: 'other',   value: 3,  hasGender: false, beginText: 'Began',   endText: 'Ended'     };
                                $artistType.change(function () {
                                                               var newType = typeArray[$artistType.val() + 1];
                                                               $labelBegin.text(newType.beginText);
                                                               $labelEnd.text(newType.endText);
                                                               if (!newType.hasGender) { $artistGender.val(""); }
                                                               $artistGender.attr("disabled", !newType.hasGender);
                                                               });
                            /* Insert the finished add artist form */
                            }).appendTo($addContainer);
                        }
                    });
                });
            }
        });
    })(jQuery);
}