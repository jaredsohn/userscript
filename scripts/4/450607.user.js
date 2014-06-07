// ==UserScript==
// @name        Google Tag Manager Import Export
// @namespace   gtm_import_export.gm.maschek.hu
// @description Google Tag Manager Import Export
// @include     https://www.google.com/tagmanager/web/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @downloadURL https://github.com/maschek/gtm_import_export/raw/master/Google_Tag_Manager_Import_Export.user.js
// @see         https://github.com/maschek/gtm_import_export
// @version     1
// @grant       none
// ==/UserScript==

(function($) {


    /**
     * Add checkboxes to the macro, condition (rule) and tagtables.
     *
     * Parse out the target id (tid) as we will need that to do AJAX requests.
     * tid-s are placed as data attribute in the checkbox element.
     *
     * The function is called every few seconds in order to place checkboxes after a search is made or
     * any other way GTM updates its interface due to dynamic rendering.
     */
    function addCheckboxes() {

        //table ids where to find clickabe elements
        var tableIds     = ['#ID-macroTable',     '#ID-conditionTable',     '#ID-tagTable'];
        //corresponding click element classes (different in each table)
        var clickClasses = ['.ACTION-clickMacro', '.ACTION-clickCondition', '.ACTION-clickTag'];

        for (var i = 0; i < tableIds.length; i++) {
            if ($(tableIds[i]).find('.cb_export').length == 0) {
                $(tableIds[i]).find(clickClasses[i]).each(function(index, element) {

                    var matches = $(element).attr('class').match(/TARGET-(\d+)/);
                    var tid     = matches ? matches[1] : '';

                    $(element).before('<input type="checkbox" data-tid="' + tid + '" class="cb_export"/>');
                });
            }
        }
    }

    /**
     * Toggles the checkboxes of a given table.
     *
     * The table is found by the click event's parent target.
     * The toggle is done in reverse of the first element's checked property.
     * @param event
     */
    function toggleCheckboxes(event) {

        var table = event.delegateTarget;
        $(table).find('.cb_export').prop('checked', !$(table).find('.cb_export').prop('checked'));
    }


    /**
     * Logs a message line to the messages textarea.
     *
     * Locates #import_export_messages and appends a line with line ending.
     * Scrolls automatically to the bottom.
     * @param text The text to be logged
     */
    function logMessage(text) {
        var textarea = $('#import_export_messages');
        textarea.append(text + "\n");
        textarea[0].scrollTop = textarea[0].scrollHeight;
    }

    /**
     * Handles response for single AJAX import calls.
     *
     * After each call is made, we check the result if it was a success or an error.
     * We log the event in both cases.
     *
     * @param data       The response data in json format
     * @param importName The name of the element that was about to be imported (saved)
     */
    function handleImportResponse(data, importName) {
        if (typeof data['update-response'] == 'undefined') {
            logMessage(importName + ': FAILED : ' + JSON.stringify(data));
            return;
        }
        if (data['update-response'].status != 'SUCCESS') {
            if (typeof data.fieldErrors != 'undefined') {
                logMessage(importName + ': ' + data.fieldErrors[0].messages[0]);
            }
            else {
                //just dump the object in case the structure is unknown
                logMessage(importName + ': FAILED : ' + JSON.stringify(data));
            }
        }
        else {
            logMessage(importName + ': imported');
        }
    }

    /**
     * Does some initial checks on the data to be imported.
     *
     * Is the import box empty? Does it contain json data? Does it contain an array?
     * Does it contain the right kind of data compared to the view where the user is?
     *
     * @param {string}    type       The type of the expected import (tag|rule|macro)
     * @param {string}    lookupName The element to look for in the content to be imported (tagName|conditionName|macroName)
     * @returns {boolean} True if the import is good to go on, false otherwise
     */
    function importIsValidForView(type, lookupName) {
        var content = $('#import_export').val();

        if ($.trim(content) == '') {
            logMessage('Import area is empty. Please paste values from an export.');
            return false;
        }

        //try to parse
        try {
            var json = jQuery.parseJSON(content);
            if (!$.isArray(json)) {
                logMessage('Import area does not contain a valid json array. Cannot import.');
                return false;
            }
            //lookup first element if it's the right kind
            if (typeof json[0][lookupName] == 'undefined') {
                logMessage('Import area does not contain a valid ' + type + ' export. Are you sure you want to import ' + type + 's?');
                return false;
            }
        }
        catch(e) {
            logMessage('Import area does not contain a valid json array. Cannot import.');
            return false;
        }

        logMessage('Import of ' + json.length + ' ' + type + 's started.');

        return true;
    }

    /**
     * Imports tags from the #import_export textarea.
     *
     * Data is supposed to be already in a format that is ready to be sent.
     */
    function importTags() {

        if (CONDITIONS.length == 0 || CONDITIONS[CONTAINER_ID].length == 0) {
            getAllConditions();
        }

        if (!importIsValidForView('tag', 'tagName')) {
            return;
        }
        var toimport = jQuery.parseJSON($('#import_export').val());

        var default_post_data = {
            'token'                  : POST_TOKEN,
            'TagManagementPage.mode' : 'ADD_TAG',
            'sid'                    : 'tagEditor',
            'hl'                     : 'en_US',
            'ds'                     : CONTAINER_ID
        };

        var post_data = {};
        var import_length = toimport.length;
        for (var i = 0; i < import_length; i++) {

            post_data = toimport[i];

            //lookup condition IDs
            var positiveConditionIds = [];
            for (var j = 0; j < post_data.positiveCondition.length; j++) {
                positiveConditionIds.push(CONDITIONS[CONTAINER_ID][post_data.positiveCondition[j].name]);
            }
            post_data.positiveConditionIds = positiveConditionIds.join(',');

            var negativeConditionIds = [];
            for (var j = 0; j < post_data.negativeCondition.length; j++) {
                negativeConditionIds.push(CONDITIONS[CONTAINER_ID][post_data.negativeCondition[j].name]);
            }
            post_data.negativeConditionIds = negativeConditionIds.join(',');

            //remove condition members as they will not needed to be sent via ajax
            delete post_data.positiveCondition;
            delete post_data.negativeCondition;

            $.extend(post_data, default_post_data);

            $.ajax({
                type     : 'POST',
                //if number of elements smaller than PARALLEL_AJAX_REQUESTS, do parallel requests, otherwise wait for the response
                async    : import_length < PARALLEL_AJAX_REQUESTS,
                url      : '/tagmanager/web/submitForm',
                dataType : 'json',
                tagName  : post_data.tagName,
                data     : post_data
            })
            .done(function(data) {
                handleImportResponse(data, this.tagName);
            });
        }

    }

    /**
     * Imports rules (conditions) from the #import_export textarea.
     *
     * Data is supposed to be already in a format that is ready to be sent.
     */
    function importRules() {

        if (!importIsValidForView('rule', 'conditionName')) {
            return;
        }
        var toimport = jQuery.parseJSON($('#import_export').val());

        var default_post_data = {
            'token'                  : POST_TOKEN,
            'TagManagementPage.mode' : 'ADD_CONDITION',
            'sid'                    : 'conditionEditor',
            'hl'                     : 'en_US',
            'ds'                     : CONTAINER_ID
        };


        var post_data = {};
        var import_length = toimport.length;
        for (var i = 0; i < import_length; i++) {

            post_data = toimport[i];

            $.extend(post_data, default_post_data);

            $.ajax({
                type          : 'POST',
                //if number of elements smaller than PARALLEL_AJAX_REQUESTS, do parallel requests, otherwise wait for the response
                async         : import_length < PARALLEL_AJAX_REQUESTS,
                url           : '/tagmanager/web/submitForm',
                dataType      : 'json',
                conditionName : post_data.conditionName,
                data          : post_data
            })
            .done(function(data) {
                handleImportResponse(data, this.conditionName);
            });
        }

    }

    /**
     * Imports macros from the #import_export textarea.
     *
     * Data is supposed to be already in a format that is ready to be sent.
     */
    function importMacros() {

        if (!importIsValidForView('macro', 'macroName')) {
            return;
        }
        var toimport = jQuery.parseJSON($('#import_export').val());

        var default_post_data = {
            'token'                  : POST_TOKEN,
            'TagManagementPage.mode' : 'ADD_MACRO',
            'sid'                    : 'macroEditor2',
            'hl'                     : 'en_US',
            'dataLayerVersion'       : '2',
            'ds'                     : CONTAINER_ID
        };

        var post_data = {};
        var import_length = toimport.length;
        for (var i = 0; i < import_length; i++) {

            post_data = toimport[i];

            $.extend(post_data, default_post_data);

            $.ajax({
                type      : 'POST',
                //if number of elements smaller than PARALLEL_AJAX_REQUESTS, do parallel requests, otherwise wait for the response
                async     : import_length < PARALLEL_AJAX_REQUESTS,
                url       : '/tagmanager/web/submitForm',
                dataType  : 'json',
                macroName : post_data.macroName,
                data      : post_data
            })
            .done(function(data) {
                handleImportResponse(data, this.macroName);
            });
        }
    }

    /**
     * Fetches all conditions into a name indexed array.
     *
     * This helper function is used during tag export to detect the condition ids of conditions assigned to tags.
     * All name -> id pairs are stored in the CONDITIONS[CONTAINER_ID] array.
     */
    function getAllConditions() {

        logMessage('Fetching all conditions.');

        $.ajax({
            type      : 'POST',
            async     : false,
            url       : '/tagmanager/web/getPage?TagManagementPage.mode=CONTAINER_OVERVIEW&containerOverview.tab=RULES&id=TagManagement&ds=' + CONTAINER_ID + '&hl=en_US&token=' + POST_TOKEN,
            dataType  : 'json'
        })
        .done(function(data) {
                var resp = data.components[0].conditionTableContainer.row;
                CONDITIONS[CONTAINER_ID] = [];
                for (var i = 0; i < resp.length; i++) {
                    CONDITIONS[CONTAINER_ID][resp[i].name] = resp[i].conditionId;
                }

        });

    }

    /**
     * Prepares export.
     *
     * Empties the export textarea and sets up global ajaxStop event to notify the user when the export is done.
     * Before setting up the global event, we remove the previously set event with the help of the 'export' namespace.
     * @param {string} type  The type of the export in plural (tags|rules|macros)
     * @param {int}    count The number of selected checkboxes that we want to export
     */
    function prepareExport(type, count) {

        if (count == 0) {
            logMessage('Please select items to export.');
            return;
        }

        logMessage('Export of ' + count + ' ' + type + ' started.');

        //clear textarea
        $('#import_export').val('');

        //bind namespaced ajaxStop event to be able to remove it later
        $(document).on('ajaxStop.export', function() {
            logMessage('Exporting ' + type + ' finished.');
            //unbind namespaced ajaxStop event
            $(document).off('ajaxStop.export');
        });

    }

    /**
     * Pushes a new object into the array of already exported items stored in #import_export.
     *
     * @param new_obj   The new object to be pushed to the array
     * @param nameField The name field which defines how to look up the object name in the new_obj
     */
    function pushToExport(new_obj, nameField) {

        var export_obj = [];
        if ($('#import_export').val() != '') {
            export_obj = jQuery.parseJSON($('#import_export').val());
        }
        export_obj.push(new_obj);

        $('#import_export').val(JSON.stringify(export_obj));

        logMessage(new_obj[nameField] + ': exported');
    }

    /**
     * Export tags selected by the checkboxes.
     *
     * For each tag it calls an AJAX request to GTM to get the data.
     * During processing the response, it already formulates it in a way that will be easily imported, except the
     * positive and negative conditions that have to be treated differently during import.
     *
     * Currently supported tags:
     * * ARBITRARY_HTML
     * * ARBITRARY_PIXEL
     * * ADWORDS_CONVERSION
     *
     * Other types will show 'skipping' in the status window.
     */
    function exportSelectedTags() {

        var checkboxes = $('#ID-tagTable .cb_export:checked');
        prepareExport('tags', checkboxes.length);

        checkboxes.each(function(index, element) {
            $.ajax({
                type     : 'POST',
                async    : checkboxes.length < PARALLEL_AJAX_REQUESTS,
                url      : "/tagmanager/web/getPage?TagManagementPage.mode=EDIT_TAG&TagManagementPage.tagId=" + $(element).data('tid') + "&id=TagManagement&ds=" + CONTAINER_ID,
                dataType : 'json'
            })
            .done(function(data) {
                var component = data.components[0];

                var new_obj = {
                    tagName : component.tagData.name,
                    tagType : component.tagData.type,
                    scheduleStart : component.tagData.scheduleStart,
                    scheduleEnd   : component.tagData.scheduleEnd,
                    fireProdOnly  : component.tagData.liveOnly
                };

                //watch out: not enough to export the IDs here, because they might be different in the target system
                //we suppose the name will be unique and the same both in the source and the target
                //if the name is the same, but the condition is indeed different, the script doesnt handle that!
                new_obj.positiveCondition = component.positiveCondition;
                new_obj.negativeCondition = component.negativeCondition;


                //if custom html
                if (new_obj.tagType == 'ARBITRARY_HTML') {
                    $.extend(new_obj, {
                        usePostscribe : component.customTagData.arbitraryHtml.usePostscribe,
                        html          : component.customTagData.arbitraryHtml.template,
                        enableNewJsMacroBehavior : true
                    });
                }
                //if custom pixel
                else if (new_obj.tagType == 'ARBITRARY_PIXEL') {
                    var urlparts = component.tagData.arbitraryPixel.url.string.split('//');
                    $.extend(new_obj, {
                        urlScheme             : urlparts[0] + '//',
                        urlRest               : urlparts[1],
                        useCacheBuster        : component.tagData.arbitraryPixel.useCacheBuster,
                        cacheBusterQueryParam : component.tagData.arbitraryPixel.cacheBusterQueryParam.string
                    });
                }
                //if adwords conversion tracking
                else if (new_obj.tagType == 'ADWORDS_CONVERSION') {
                    $.extend(new_obj, {
                        conversionId    : component.tagData.adwordsConversion.googleConversionId.string,
                        conversionLabel : component.tagData.adwordsConversion.googleConversionLabel.string,
                        conversionValue : component.tagData.adwordsConversion.googleConversionValue.string
                    });
                }
                else {
                    logMessage(new_obj.tagName + ': skipping. Unsupported type: ' + new_obj.tagType);
                    return;
                }

                pushToExport(new_obj, 'tagName');
            });
        });


    }

    /**
     * Export rules selected by the checkboxes.
     *
     * For each rule it calls an AJAX request to GTM to get the data.
     * During processing the response, it already formulates it in a way that will be easily imported.
     * All conditions are supported, because the underlying data is JSON encoded in the predicates field.
     *
     */
    function exportSelectedRules() {

        var checkboxes = $('#ID-conditionTable .cb_export:checked');
        prepareExport('rules', checkboxes.length);


        checkboxes.each(function(index, element) {
            $.ajax({
                type     : 'POST',
                async    : checkboxes.length < PARALLEL_AJAX_REQUESTS,
                url      : "/tagmanager/web/getPage?TagManagementPage.mode=EDIT_CONDITION&TagManagementPage.conditionId=" + $(element).data('tid') + "&id=TagManagement&ds=" + CONTAINER_ID,
                dataType : 'json'
            })
            .done(function(data) {
                var component = data.components[0];
                var new_obj = {
                    conditionName : component.conditionName,
                    //watch out: import expects predicateS (plural), but export provides predicate (singular)
                    predicates    : JSON.stringify(component.predicate)
                };

                pushToExport(new_obj, 'conditionName');
            });
        });
    }

    /**
     * Export macros selected by the checkboxes.
     *
     * For each macro it calls an AJAX request to GTM to get the data.
     * During processing the response, it already formulates it in a way that will be easily imported.
     * Currently supported macros:
     * * CUSTOM_VAR
     * * COOKIE
     * * AUTO_EVENT_VAR
     * * CONSTANT
     * * EVENT
     * * ARBITRARY_JAVASCRIPT
     * * DOM_ELEMENT
     * * REFERRER
     * * URL
     *
     * Other types will show 'skipping' in the status window.
     */
    function exportSelectedMacros() {

        var checkboxes = $('#ID-macroTable .cb_export:checked');
        prepareExport('macros', checkboxes.length);

        checkboxes.each(function(index, element) {
            $.ajax({
                type     : 'POST',
                async    : checkboxes.length < PARALLEL_AJAX_REQUESTS,
                url      : "/tagmanager/web/getPage?_.versionId=0&TagManagementPage.mode=EDIT_MACRO&TagManagementPage.macroId=" + $(element).data('tid') + "&id=TagManagement&ds=" + CONTAINER_ID,
                dataType : 'json'
            })
            .done(function(data) {

                var component = data.components[0];

                var new_obj = {
                    macroType : component.macroData.type,
                    macroName : component.macroData.name
                }

                if (new_obj.macroType == 'CUSTOM_VAR') {
                    new_obj.customVarName = component.macroData.customVarMacro.name.string;
                }
                else if (new_obj.macroType == 'COOKIE') {
                    new_obj.cookieName = component.macroData.cookieMacro.name.string;
                }
                else if (new_obj.macroType == 'CONSTANT') {
                    new_obj.macroValue = component.macroData.constantMacro.value.string;
                }
                else if (new_obj.macroType == 'EVENT') {
                    //no additional data needed
                }
                else if (new_obj.macroType == 'REFERRER') {
                    //no additional data needed
                }
                else if (new_obj.macroType == 'ARBITRARY_JAVASCRIPT') {
                    new_obj.javascript = component.macroData.arbitraryJavascriptMacro.javascript.string;
                }
                else if (new_obj.macroType == 'AUTO_EVENT_VAR') {
                    new_obj.varType      = component.macroData.autoEventVarMacro.varType;
                    if (typeof component.macroData.autoEventVarMacro.defaultValue != 'undefined') {
                        new_obj.defaultValue = component.macroData.autoEventVarMacro.defaultValue.string;
                    }
                }
                else if (new_obj.macroType == 'DOM_ELEMENT') {
                    new_obj.elementId      = component.macroData.domElementMacro.elementId.string;
                    if (typeof component.macroData.domElementMacro.attributeName != 'undefined') {
                        new_obj.attributeName = component.macroData.domElementMacro.attributeName.string;
                    }
                }
                else if (new_obj.macroType == 'URL') {
                    new_obj.urlComponentType      = component.macroData.urlMacro.component;
                    if (typeof component.macroData.urlMacro.queryKey != 'undefined') {
                        new_obj.queryKey = component.macroData.urlMacro.queryKey.string;
                    }
                    if (typeof component.macroData.urlMacro.stripWww != 'undefined') {
                        new_obj.stripWww = component.macroData.urlMacro.stripWww.boolean;
                    }
                    if (typeof component.macroData.urlMacro.defaultPages != 'undefined') {
                        new_obj.defaultPages = '';
                        for (var i = 0; i < component.macroData.urlMacro.defaultPages.listItem.length; i++) {
                            new_obj.defaultPages+= component.macroData.urlMacro.defaultPages.listItem[i].string + "\n";
                        }
                    }

                }
                else {
                    logMessage(new_obj.macroName + ': skipping. Unsupported type: ' + new_obj.macroType);
                    return;
                }

                pushToExport(new_obj, 'macroName');
            });
        });


    }


    /**
     * Loads a script asynchronously and calls a callback when done.
     *
     * @see   http://davidwalsh.name/loading-scripts-jquery
     * @param url      The url of the javascript to load
     * @param callback The callback function to call when loaded
     */
    function loadScript(url, callback) {
        $.ajax({
            url         : url,
            dataType    : 'script',
            cache       : true,
            crossDomain : true
        }).done(callback);
    }

    /**
     * Track a pageview with Google Analytics.
     *
     * Loads the Universal Analytics script and reports a pageview.
     */
    function trackUsage() {
        loadScript('https://www.google-analytics.com/analytics.js', function() {
            ga('create', 'UA-49741788-1', 'google.com');
            ga('send', 'pageview');
        });
    }


    /**
     * The main initialization function.
     *
     * The following operations are made:
     * 1. CSS Styles appended to html body
     * 2. sets initial csrf token value (POST_TOKEN), and sets up a global AJAX handler to detect when it changes
     * 3. an anonymous interval function is defined which will do the following:
     * 3a. Checks if we are on an exportable table view. If not, exits.
     * 3b. parses out and stores the account and container id (CONTAINER_ID)
     * 3c. sets up checkboxes
     * 3d. sets up textares
     * 3e. sets up buttons and their clickhandlers
     *
     * The settimout is needed, because the page is constantly changing due to AJAX based dynamic rendering.
     * The account id can also change while we navigate through the accounts and containers.
     */
    function init() {

        //inject styles
        $('body').append("<style>\
            .cb_export {float: left;}\
            #import_export {height: 54px; width: 48%; font: 11px monospace; background-color: #F9F9F9;}\
            #import_export_messages {height: 54px; width: 48%;  font: 11px monospace; background-color: #F9F9F9;}\
        </style>");

        //set up initial token, then check AJAX responses for updates
        POST_TOKEN   = window.preload.token.value;
        $(document).ajaxComplete(function(event, xhr, settings) {
            try {
                var json = jQuery.parseJSON(xhr.responseText);
            }
            catch(e) {
                //do nothing
            }
            if (typeof json.error != 'undefined' && json.error == 'token_expired') {
                //update global token
                POST_TOKEN = json.token.value;
            }
        });



        window.setInterval(function() {

            //exit if not on the correct screen
            if ($('#ID-macroTable').length == 0 && $('#ID-conditionTable').length == 0 && $('#ID-tagTable').length == 0) {
                return;
            }

            //get container id and token - they might change as you navigate through accounts
            var matches  = location.href.match(/TagManagement\/(\w+)\//);
            CONTAINER_ID = matches ? matches[1] : '';

            addCheckboxes();

            if ($('#import_export_messages').length == 0) {
                $('#ID-tabPanel .TAB_PANEL_TAB_SPACER_MAX').append("<textarea id='import_export_messages' placeholder='This is the status area. Messages will appear here.'></textarea>");
            }
            if ($('#import_export').length == 0) {
                $('#ID-tabPanel .TAB_PANEL_TAB_SPACER_MAX').append("<textarea id='import_export' placeholder='This is the import/export area. Exports appear here and imports are taken from here.'></textarea>");
            }

            //inject export buttons if they do not exist yet
            if ($('#export_selected_macros').length == 0) {
                $('#ID-macroTable .CT_TABLE_FILTER')
                    .before('<div class="CL_KENNEDY_BUTTON gm_gtm_toggle_selection">[ Select/deselect all ]</div>&nbsp;')
                    .before('<div id="export_selected_macros" class="CL_KENNEDY_BUTTON">[ Export selected ]</div>&nbsp;')
                    .before('<div id="import_macros"          class="CL_KENNEDY_BUTTON">[ Import ]</div>&nbsp;')
                ;
                //re-add event handlers
                $('#ID-macroTable')
                    .on('click', '.gm_gtm_toggle_selection', toggleCheckboxes)
                    .on('click', '#export_selected_macros', exportSelectedMacros)
                    .on('click', '#import_macros', importMacros)
                ;
            }
            if ($('#export_selected_rules').length == 0) {
                $('#ID-conditionTable .CT_TABLE_FILTER')
                    .before('<div class="CL_KENNEDY_BUTTON gm_gtm_toggle_selection">[ Select/deselect all ]</div>&nbsp;')
                    .before('<div id="export_selected_rules" class="CL_KENNEDY_BUTTON">[ Export selected ]</div>&nbsp;')
                    .before('<div id="import_rules"          class="CL_KENNEDY_BUTTON">[ Import ]</div>&nbsp;')
                ;
                //re-add event handlers
                $('#ID-conditionTable')
                    .on('click', '.gm_gtm_toggle_selection', toggleCheckboxes)
                    .on('click', '#export_selected_rules', exportSelectedRules)
                    .on('click', '#import_rules', importRules)
                ;
            }
            if ($('#export_selected_tags').length == 0) {
                $('#ID-tagTable .CT_TABLE_FILTER')
                    .before('<div class="CL_KENNEDY_BUTTON gm_gtm_toggle_selection">[ Select/deselect all ]</div>&nbsp;')
                    .before('<div id="export_selected_tags" class="CL_KENNEDY_BUTTON">[ Export selected ]</div>&nbsp;')
                    .before('<div id="import_tags"          class="CL_KENNEDY_BUTTON">[ Import ]</div>&nbsp;')
                ;
                //re-add event handlers
                $('#ID-tagTable')
                    .on('click', '.gm_gtm_toggle_selection', toggleCheckboxes)
                    .on('click', '#export_selected_tags', exportSelectedTags)
                    .on('click', '#import_tags', importTags)
                ;
            }



        }, 1500);

        trackUsage();


    }//end init

    // MAIN SECTION ////////////////////////////////////////////////////////////////////////////////////////////////////

    //global variables
    var CONTAINER_ID, POST_TOKEN;
    var PARALLEL_AJAX_REQUESTS = 10;
    var CONDITIONS = [];

    //launch the magic
    window.setTimeout(init, 500);


})(jQuery.noConflict());
