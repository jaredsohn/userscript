// ==UserScript==
// @name           InsertUnit
// @namespace      http://brucknerite.net
// @description    Adds a button to Blogger's edit post interface to insert unit microformats.
// @include        http://www.blogger.com/*
// ==/UserScript==

// Triggers page modification code modifyPage() on page load event.
window.addEventListener('load', modifyPage, true);

/**
 * Just to save space.
 * 
 * @param id    Element id attribute to return.
 * @return Element whose id attribute was specified.
 */
function $(id) {
    return document.getElementById(id);
}

/**
 * Modifies Blogger's edit post page to append a button to the html editing bar.
 * This button acts as a control for an unit insertion dialog.
 */
function modifyPage() {
    var htmlBarPreviewAction = $('htmlbar_PreviewAction');
    if (htmlBarPreviewAction) {
        var unitButton = document.createElement('span');
        unitButton.setAttribute('id', 'htmlbar_UnitButton');
        unitButton.setAttribute('title', 'Add units uF');
        unitButton.setAttribute('style', 'width:18px');
        unitButton.addEventListener('mousedown', unitButtonMouseDownHandler, false);
        unitButton.addEventListener('mouseup', unitButtonMouseUpHandler, false);
        unitButton.addEventListener('mouseout', unitButtonMouseOutHandler, false);
        unitButton.addEventListener('mouseover', unitButtonMouseOverHandler, false);
        unitButton.innerHTML = 'uF';
        var separator = document.createElement('div');
        separator.setAttribute('class', 'vertbar');
        separator.innerHTML = '<span class="g">&nbsp;</span><span class="w">&nbsp;</span>';
        htmlBarPreviewAction.parentNode.insertBefore(unitButton, htmlBarPreviewAction);
        htmlBarPreviewAction.parentNode.insertBefore(separator, htmlBarPreviewAction);
        unitForm = createUnitFormDiv();
        htmlBarPreviewAction.parentNode.parentNode.appendChild(unitForm);
        unitForm.style.top = (unitButton.offsetTop + unitButton.offsetHeight) + 'px';
        linkUnitFormEvents(unitForm);
    }
}

/**
 * Handles mousedown event for the button inserted in the html editing bar
 * of Blogger's edit post pages. Mimics other buttons' behaviour.
 * 
 * @param event A mousedown event.
 */
function unitButtonMouseDownHandler(event) {
    unsafeWindow.CheckFormatting(event);
    unsafeWindow.ButtonMouseDown(this);
}

/**
 * Handles mouseup event for the button inserted in the html editing bar
 * of Blogger's edit post pages. Reveals unit insertion dialog.
 * 
 * @param event A mouseup event.
 */
function unitButtonMouseUpHandler(event) {
    var unitFormDiv = $('unitForm');
    var unitButton = $('htmlbar_UnitButton');
    if (unitFormDiv) {
        $('htmlbar_UnitButton').style.backgroundColor = '#f5ede3';
        unitFormDiv.style.display = 'block';
        var unitForm = $('insertUnitForm');
        var textarea = $('textarea');
        $('insertUnitDescription').value = getSelection(textarea);
        $('insertUnitDescription').focus();
    }
}

/**
 * Handles mouseout event for the button inserted in the html editing bar
 * of Blogger's edit post pages. Mimics other buttons' behaviour.
 * 
 * @param event A mouseout event.
 */
function unitButtonMouseOutHandler(event) {
    unsafeWindow.ButtonHoverOff(this);
}

/**
 * Handles mouseover event for the button inserted in the html editing bar
 * of Blogger's edit post pages. Mimics other buttons' behaviour.
 * 
 * @param event A mouseover event.
 */
function unitButtonMouseOverHandler(event) {
    unsafeWindow.ButtonHoverOn(this);
}

/**
 * Handles unit insertion dialog testing event.
 *
 * @param event An event signalling a conversion test request.
 */
function insertUnitFormTest(event) {
    var unitForm = event.target.parentNode.parentNode.parentNode;
    var value = $('insertUnitValue').value;
    var unit = $('insertUnitUnit').value;
    if ($('insertUnitNull').checked) {
        unit = '';
    }
    var target = $('insertUnitTarget').value;
    queryGoogle(value, unit, target);
}

/**
 * Handles unit insertion dialog confirmation event.
 *
 * @param event An event signalling confirmation (the 'Ok' button was pressed).
 */
function insertUnitFormOk(event) {
    var unitForm = event.target.parentNode.parentNode;
    var description = $('insertUnitDescription').value;
    var value = $('insertUnitValue').value;
    var unit = $('insertUnitUnit').value;
    if ($('insertUnitNull').checked) {
        unit = 'null';
    }
    var target = $('insertUnitTarget').value;
    var uFormat = '<abbr title="' + value + '" class="unit ' + unit;
    if (target && target != '') {
        uFormat += ' ' + target;
    }
    uFormat += '">' + description + '</abbr>';
    var textarea = $('textarea');
    insertAtCursor(textarea, uFormat);
    insertUnitFormCancel(event);
}

/**
 * Handles unit insertion dialog cancellation event.
 *
 * @param event An event signalling cancellation (i.e. the 'Cancel' button was pressed).
 */
function insertUnitFormCancel(event) {
    var unitForm = $('insertUnitForm');
    unitForm.reset();
    $('insertUnitUnit').disabled = false;
    $('testResult').innerHTML = '&nbsp;';
    unitForm.parentNode.style.display = 'none';
    $('htmlbar_UnitButton').style.backgroundColor = '#e1d4c0';
    $('textarea').focus();
}

/**
 * Verifies 'Ok' button activation for the unit insertion dialog. This
 * button should only be active whenever both the scalar value of the unit
 * and its name are specified.
 */
function checkOkActivation() {
    var unitForm = $('insertUnitForm');
    var value = $('insertUnitValue').value;
    var unit = $('insertUnitUnit').value;
    var unitNull = $('insertUnitNull').checked;
    $('okButton').disabled = 
        value.length == 0 || (unit.length == 0 && !unitNull);
}

/**
 * Verifies unit name text field activation for the unit insertion dialog.
 * This field should be active only if the null unit checkbox is not
 * checked.
 */
function checkUnitActivation() {
    var unitElem = $('insertUnitUnit');
    var unitNull = $('insertUnitNull');
    unitElem.disabled = unitNull.checked;
}

/**
 * Creates a div containing the unit insertion dialog.
 *
 * @return Container element for the unit insertion dialog.
 */
function createUnitFormDiv() {
    var unitForm = document.createElement('div');
    unitForm.setAttribute('id', 'unitForm');
    unitForm.setAttribute('style', 'position:absolute;display:none;background-color:#f5ede3;border-width:2px;border-top-color:#f5ede3;border-right-color:#cccccc;border-bottom-color:#cccccc;border-left-color:#cccccc;border-top-style:solid;border-right-style:solid;border-bottom-style:solid;border-left-style:solid;');
    unitForm.innerHTML = '<style type="text/css">#insertUnitForm {width:300px;margin-bottom:3em;}#insertUnitForm fieldset {border-color:#000000 rgb(255, 255, 255) rgb(255, 255, 255);border-style:solid;border-width:1px 0pt 0pt;display:block;margin:0pt 0pt 1em;padding:0pt 1em 0em;}#insertUnitForm input {display:block;left:8em;position:relative;top:-1.4em;}#insertUnitForm input[type="checkbox"] {clear:both;float:left;position:static;margin-right:0.5em;}#insertUnitForm input.submit {clear:both;top:0pt;}#insertUnitForm label {clear:both;display:block;float:left;font-weight:bold;margin-top:-1em;width:8em;}#insertUnitForm label.checkbox {font-weight:normal;margin-left:8em;margin-top:0.25em;position:relative;top:-1.25em;width:12em;}#insertUnitForm label.first {margin-top:0.5em;}#testResult {clear:both;display:block;padding:1em;background-color:#e1d4c0;}#buttonBlock {float:right;margin-top:1.4em;margin-right:10em;}#insertUnitForm #buttonBlock input {display:inline;position:relative;}</style><form id="insertUnitForm"><fieldset><legend>Measurement Unit</legend><label class="first" for="insertUnitDescription">Text:<input id="insertUnitDescription" type="text" tabindex="1"/></label><label for="insertUnitValue">Value:<input id="insertUnitValue" type="text" tabindex="2"/></label><label for="insertUnitUnit">Unit:<input id="insertUnitUnit" type="text" tabindex="3"/></label><label for="insertUnitNull" class="checkbox"><input id="insertUnitNull" name="insertUnitNull" type="checkbox" value="null" tabindex="4"/><abbr title="Check this box whenever no unit should be specified: base conversions...">No source unit</abbr></label><label for="insertUnitTarget">Target Unit:<input id="insertUnitTarget" type="text" tabindex="5"/></label><label for="testResult"><a id="testConversionLink" href="#" tabindex="6">Test conversion</a><div id="testResult">&nbsp;</div></label></fieldset><div id="buttonBlock"><input id="okButton" type="button" value="Ok" tabindex="7" disabled="true"/><input id="cancelButton" type="button" value="Cancel" tabindex="8"/></div></form>';
    return unitForm;
}

/** 
 * Wires up various events to components of the unit insertion dialog and
 * others on the post edit page, namely:
 *  'okButton' (unit insertion dialog confirmation button): click event
 *  'cancelButton' (unit insertion dialog cancellation button): click event
 *  'insertUnitValue' (unit insertion dialog scalar part text box): keyup event,
 *      to verify 'okButton' activation status
 *  'insertUnitUnit' (unit insertion dialog unit name text box): keyup event,
 *      to verify 'okButton' activation status
 *  'insertUnitNull' (unit insertion dialog no source unit checkbox): click event,
 *      to verify 'okButton' activation status
 *  'insertUnitNull': click event, to verify 'insertUnitUnit' activation status
 *  'testConversionLink' (unit insertion dialog test control link): click event
 *  'ShowRichEditor' (edit post page rich editor mode activation control tab): 
 *      mousedown event, performing the same as 'cancelButton'
 *  'htmlbar' (edit post page html control bar): mousedown event, performing
 *      the same as 'cancelButton'
 */
function linkUnitFormEvents() {
    var unitForm = $('insertUnitForm');
    $('okButton').addEventListener('click', insertUnitFormOk, true);
    $('cancelButton').addEventListener('click', insertUnitFormCancel, true);
    $('insertUnitValue').addEventListener('keyup', checkOkActivation, true);
    $('insertUnitUnit').addEventListener('keyup', checkOkActivation, true);
    $('insertUnitNull').addEventListener('click', checkOkActivation, true);
    $('insertUnitNull').addEventListener('click', checkUnitActivation, true);
    $('testConversionLink').addEventListener('click', insertUnitFormTest, true);
    $('ShowRichEditor').addEventListener('mousedown', insertUnitFormCancel, true);
    $('htmlbar').addEventListener('mousedown', insertUnitFormCancel, true);
}

/**
 * Inserts some text at the current caret position for a textarea.
 *
 * @param textarea  Textarea to use as text destination.
 * @param text      Text to insert.
 */
function insertAtCursor(textarea, text) {
    var startPos = textarea.selectionStart;
    var endPos = textarea.selectionEnd;
    textarea.value = textarea.value.substring(0, startPos) + 
        text + 
        textarea.value.substring(endPos, textarea.value.length);
}

/**
 * Returns the currently selected text in a textarea.
 * 
 * @param textarea  Textarea to use as text source.
 * @return Selected text inside the textarea.
 */
function getSelection(textarea) {
    var startPos = textarea.selectionStart;
    var endPos = textarea.selectionEnd;
    return textarea.value.substring(startPos, endPos);
}

/**
 * Queries Google via xmlHttpRequest for unit conversions; 'unit' and 'target' 
 * should be mutually interchangeable units in a format acceptable to Google Calc 
 * (whatever that means). The response is handled by processResponseData(html). 
 *
 * @param value     Unit scalar part.
 * @param unit      Origin unit name.
 * @param target    Destination unit name.
 */
function queryGoogle(value, unit, target) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.google.com/search?q=' + value + '+' + escape(unit) + 
            '+in+' + escape(target),
        headers: {
            'User-agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.10) Gecko/20071126 Ubuntu/7.10 (gutsy) Firefox/2.0.0.10'
        },
        onload: function(response) {
            processResponseData(response.responseText);
        }
    });
    waitForResult();
}

/**
 * Inserts a waiting message in 'testResult' container.
 */
function waitForResult() {
    $('testResult').innerHTML = 'Please wait...';
}

/**
 * Parses Google Calc's responses and shows the unit conversion results inside
 * 'testResult' container. If the conversion could not be carried out, an error
 * message is shown (WARNING: it's the same error message, whether the conversion
 * intended was absurd or Google's servers are down --yes, it happens).
 *
 * @param html  HTML text with Google Calc's response to process.
 */
function processResponseData(html) {
    var re = new RegExp(' = .+</b>', 'g');
    var matches = html.match(re);
    var result = 'Error in conversion. Please check your inputs.';
    if (matches && matches.length > 0) {
         result = matches[0].split('</b>')[0];
    }
    $('testResult').innerHTML = result;
}