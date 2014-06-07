// ==UserScript==
// @name          Wolfram|Matrix
// @namespace     http://www.sammyshp.de
// @description   Matrix-editor for Wolfram|Alpha
// @author        Sven Karsten Greiner <sven@sammyshp.de>
// @version       0.04
// @license       GPLv3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @copyright     Copyright 2011 Sven Karsten Greiner
// @include       http://*.wolframalpha.com/*
// ==/UserScript==

// Icons from http://www.famfamfam.com/lab/icons/silk/

// updater from http://userscripts.org/scripts/show/20145
var SUC_script_num = 106519;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000*2 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

var version = "0.04";

var mDefault = 3;
var nDefault = 3;
var mSize;
var nSize;
var stayOnTop;

var help;
var editor;
var matrixTable;
var inputcontainer;
var inputfield;

// Images
var helpImg   = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKkSURBVDjLpZPdT5JhGMb9W+BPaK3matVqndXWOOigA6fmJ9DUcrUMlrN0mNMsKTUznQpq6pyKAm8CIogmypcg8GIiX8rHRHjhVbPt6o01nMvZWge/k3vP9duuZ/edAyDnf/hjoCMP2Vr3gUDj3CdV6zT1xZ6iFDaKnLEkBFOmPfaZArWT5sw60iFP+BAbOzTcQSqDZzsNRyCNkcVoaGghzDlVQKylOHJrMrUZ2Yf52y6kc36IxpyoH1lHF7EBgyMKV4jCJ5U/1UVscU4IZOYEa3I1HtwI01hwxlDLhDoJD/wxGr5YGmOLAdRIrVCuhmD3JdA6SQabx12srGB0KSpc86ew4olDOGjH4x4z0gdHDD9+c4TaQQtq+k2Yt0egXYugTmoVZgV9cyHSxXTtJjZR3WNCVfcK/NE0ppYDUNu2QTMCtS0IbrsOrVMOWL27eNJtJLOCDoWXdgeTEEosqPxoBK/TwDzWY9rowy51gJ1dGr2zLpS2aVH5QQ+Hbw88sZ7OClrGXbQrkMTTAQu4HXqUv9eh7J0OSfo7tiIU+GItilpUuM/AF2tg98eR36Q+FryQ2kjbVhximQu8dgPKxPMoeTuH4tfqDIWvCBQ2KlDQKEe9dBlGTwR36+THFZg+QoUxAL0jgsoOQzYYS+wjskcjTzSToVAkA7Hqg4Spc6tm4vgT+eIFVvmb+eCSMwLlih/cNg0KmpRoGzdl+BXOb5jAsMYNjSWAm9VjwesPR1knFilPNMu510CkdPZtqK1BvJQsoaRZjqLGaTzv1UNp9EJl9uNqxefU5QdDnFNX+Y5Qxrn9bDLUR6zjqzsMizeWYdG5gy6ZDbk8aehiuYRz5jHdeDTKvlY1IrhSMUxe4g9SuVwpdaFsgDxf2i84V9zH/us1/is/AdevBaK9Tb3EAAAAAElFTkSuQmCC';
var clearImg  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFuSURBVBgZBcG/S1RxAADwz3teyp3XFUUWNVSoRGQR3dLQIESBbUZt9gekm9XW2lRbNDv0gxbJWoJoCcT+ABskTgcDDwLpOD19d+/73rfPJ4kAANaejUx03t5eBZIIgKe34r3JB7OTVVvZuzf9lderiKIoip7MLba+xY24H4v4N36PC635uSgFIJ2/Pz7ppH19w66aHk/nqQCfk8LU1BWJAyMyo3Y1bV2nwpeh8nxxthg+Vm+ZUFVKHDjhK1UqlJeK52E61LOkasOhRDAic8EWKp/qxaupmdOO6Fi3bVyiEAQdA6Th7tjMGYcyDTcdtWlUoqYtypHmjy/atadrX6JpU5QaMhDlSPNTFX9kMj0H6rr+gYFCjnSw3XNZ2y9dPfT1lUq5UkA6+Phb3TU3NJArHFeKhtTkSBc+rC//0NBQVbNmwphzGu5oCztUGDz8udydbSrlVmI9eSkIirzYKZokESw+yl+EdtgL75eWAID/yIWfXhcZhKEAAAAASUVORK5CYII=';
var insertImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC';
var closeImg  = '';
var matrixImg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAPAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgADQAOAwERAAIRAQMRAf/EAGMAAQEBAAAAAAAAAAAAAAAAAAAEBwEBAQAAAAAAAAAAAAAAAAAAAAEQAAADBAcJAAAAAAAAAAAAABESEwABAhQhMTIDMwQVQWFCUmKiNAUWEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDfbzQ0PeDMlWgnATEyzwS3G5tjAzWiL5M8ybTnpFTBFG8Ew8ZRqoFguj+nT9mXEUh03CsKPN2BaYF99Mrl0rEo+YwvJTiCvrLVQ0H/2Q%3D%3D'; //'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////mZmZjlBKsgAAADRJREFUeNpiYGBgZGQAAygN5UEZcB6EyQhSBUUMSGwYQihmJIzwKEazCN0ZaI5E8QJAgAEAIaIAUXlYKGAAAAAASUVORK5CYII=';

function clearMatrix()
{
    for (var i = matrixTable.childNodes.length; i > 0; i--)
    {
        matrixTable.removeChild(matrixTable.firstChild);
    }
    
    resizeMatrix();
}

function resetMatrix()
{
    mSize.value = mDefault;
    nSize.value = nDefault;
    
    clearMatrix();
}

function getMatrixString()
{
    var rows = new Array();
    
    for (var i = 0; i < matrixTable.childNodes.length; i++)
    {
        var values = new Array();
        var row = matrixTable.childNodes[i];
        
        for (var j = 0; j < row.childNodes.length; j++)
        {
            var v = row.childNodes[j].firstChild.value;
            values.push(("" == v) ? 0 : v);
        }
        
        rows.push("{" + values.join(",") + "}");
    }
    
    return "{" + rows.join(",") + "}";
}

function insertMatrix()
{
    if (!stayOnTop)
    {
        toggleMatrixEditor();
    }
    
    var begin = inputfield.selectionStart;
    var end   = inputfield.selectionEnd;
    
    inputfield.value = inputfield.value.substr(0, begin)
                     + getMatrixString()
                     + inputfield.value.substr(end, inputfield.value.length);

    inputfield.focus();
}

function insertEditor()
{
    // Stylesheets
    GM_addStyle('div#meHelpContainer {display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999; background: rgba(0, 0, 0, 0.5); color: #000; font-size: 14px; margin: 0; padding: 0; line-height: 1.5em; overflow-y: scroll;}');
    GM_addStyle('div#meHelpContainer * {margin: 0; padding: 0;}');
    GM_addStyle('div#meHelpContainer h1 {color: #FE6518; font-weight: bold; font-size: 100%; margin-bottom: 1em;}');
    GM_addStyle('div#meHelpContainer td {vertical-align: top;}');
    GM_addStyle('div#meEditorContainer {display: none; position: absolute; top: 45px; right: -50px; z-index: 500; background: #fff; box-shadow: 0 0 10px 2px #F47F1D; border-radius: 20px; border: 1px solid #FA6800; padding: 1em;}');
    GM_addStyle('div#meMatrixTableContainer {margin-left: auto; margin-right: auto; margin-top: 1em; padding: 0.5em; border-radius: 10px; border-left: 2px solid black; border-right: 2px solid black;}');
    GM_addStyle('div#meMatrixTableContainer input.meMatrixTableCell {width: 2em; border: none; background: #eee; margin: 0.2em; text-align: center;}');
    GM_addStyle('div#meMatrixTableContainer input.meMatrixTableCell:focus {background: #FFEBCC;}');
    
    // help
    help = document.createElement('div');
    help.setAttribute('id', 'meHelpContainer');
    help.innerHTML = '<div style="margin: auto; margin-top: 10em; width: 30em; z-index: 1000; background: #eee; box-shadow: 0 0 10px 2px #F47F1D; border-radius: 20px; border: 1px solid #FA6800; padding: 1em;"><h1>Help</h1><table style="text-align: left; vertical-align: top;"><tr><td style="width: 2em;"><img src="' + matrixImg + '"></td><td><b>Single click:</b> Toggle editor on/off.<br /><b>Double click:</b> Toggle stay-on-top on/off.<br />&nbsp;</td></tr><tr><td><img src="' + insertImg + '"></td><td><b>Single click:</b> Insert matrix at cursor-position. Selected text will be replaced.<br /><b>Double click:</b> Load selected Text into matrix (will be resized automatically). Coming in next version.<br />&nbsp;</td></tr><tr><td><img src="' + clearImg + '"></td><td><b>Single click:</b> Clear content of matrix.<br /><b>Double click:</b> Clear content and resize to default values.</td></tr></table><p><br /><br /></p><h1>About</h1><p>Copyright 2011 <a href="http://www.sammyshp.de/">Sven Karsten Greiner</a><br />License: <a href="http://www.gnu.org/copyleft/gpl.html">GPLv3 or any later version</a><br />Icons from <a href="http://www.famfamfam.com/lab/icons/silk/">FamFamFam (Silk)</a><br /><a href="http://userscripts.org/scripts/show/20145">Updater by Jarett</a><br />Version: ' + version + '<br /><br /><br /></p><h1>Settings</h1></div>';
    document.body.appendChild(help);
    
    var settingsContainer = document.createElement('p');
    settingsContainer.appendChild(document.createTextNode("Default values:"));
    settingsContainer.appendChild(document.createElement("br"));
    settingsContainer.appendChild(document.createElement("br"));
    help.firstChild.appendChild(settingsContainer);
    
    var settingsStayOnTop = document.createElement('input');
    settingsStayOnTop.setAttribute('type', 'checkbox');
    settingsStayOnTop.setAttribute('style', 'margin-right: 1em;');
    settingsStayOnTop.addEventListener('click', function(){GM_setValue('stayOnTop', this.checked); stayOnTop = this.checked;}, false);
    settingsContainer.appendChild(settingsStayOnTop);
    settingsContainer.appendChild(document.createTextNode("stay on top after insert"));
    settingsContainer.appendChild(document.createElement("br"));
    
    var settingsDefaultM = document.createElement('input');
    settingsDefaultM.setAttribute('type', 'text');
    settingsDefaultM.setAttribute('style', 'width: 2em;');
    settingsDefaultM.setAttribute('value', mDefault);
    settingsDefaultM.addEventListener('change', function(e){if (isInt(this.value) && this.value > 0) {GM_setValue('mDefault', this.value); mDefault = this.value;} else { this.value = mDefault;}}, false);
    settingsContainer.appendChild(settingsDefaultM);
    settingsContainer.appendChild(document.createTextNode("x"));
    
    var settingsDefaultN = document.createElement('input');
    settingsDefaultN.setAttribute('type', 'text');
    settingsDefaultN.setAttribute('style', 'width: 2em; margin-right: 1em;');
    settingsDefaultN.setAttribute('value', nDefault);
    settingsDefaultN.addEventListener('change', function(e){if (isInt(this.value) && this.value > 0) {GM_setValue('nDefault', this.value); nDefault = this.value;} else { this.value = nDefault;}}, false);
    settingsContainer.appendChild(settingsDefaultN);
    settingsContainer.appendChild(document.createTextNode("default Size m x n"));
    settingsContainer.appendChild(document.createElement("br"));
    
    var closeB = document.createElement('input');
    closeB.setAttribute('type', 'button');
    closeB.setAttribute('value', 'close');
    closeB.setAttribute('style', 'margin-left: 25em;');
    closeB.addEventListener('click', toggleHelp, false);
    help.firstChild.appendChild(closeB);
    
    // editor-container
    editor = document.createElement('div');
    editor.setAttribute('id', 'meEditorContainer');
    inputcontainer.appendChild(editor);
    
    // help-button
    var helpB = document.createElement('img');
    helpB.setAttribute('src', helpImg);
    helpB.setAttribute('style', 'position: absolute; top: -8px; right: -15px; cursor: pointer; opacity: 0.5;');
    helpB.setAttribute('title', "help/settings");
    helpB.addEventListener('click', toggleHelp, false);
    helpB.addEventListener('mouseover', function(){this.style.opacity = 1;}, false);
    helpB.addEventListener('mouseout', function(){this.style.opacity = 0.5;}, false);
    editor.appendChild(helpB);
    
    // control-container
    var editorControl = document.createElement('div');
    editorControl.setAttribute('style', 'text-align: center; width: 100%;');
    editor.appendChild(editorControl);
    
    // i-value
    mSize = document.createElement('input');
    mSize.setAttribute('type', 'text');
    mSize.setAttribute('title', 'height');
    mSize.setAttribute('style', 'width: 2em; border: none; background: #eee; margin: 0 0.3em; text-align: center;');
    mSize.value = mDefault;
    mSize.addEventListener('change', resizeMatrix, false);
    editorControl.appendChild(mSize);
    
    // x
    editorControl.appendChild(document.createTextNode("x"));
    
    // j-value
    nSize = document.createElement('input');
    nSize.setAttribute('type', 'text');
    nSize.setAttribute('title', 'width');
    nSize.setAttribute('style', 'width: 2em; border: none; background: #eee; margin: 0 0.3em; text-align: center;');
    nSize.value = nDefault;
    nSize.addEventListener('change', resizeMatrix, false);
    editorControl.appendChild(nSize);
    
    // clear-button
    var clearB = document.createElement('img');
    clearB.setAttribute('src', clearImg);
    clearB.setAttribute('style', 'margin: 0 0.3em; margin-bottom: -3px; cursor: pointer;');
    clearB.setAttribute('title', "clear/reset");
    clearB.addEventListener('click', clearMatrix, false);
    clearB.addEventListener('dblclick', resetMatrix, false);
    editorControl.appendChild(clearB);
    
    // insert-button
    var insertB = document.createElement('img');
    insertB.setAttribute('src', insertImg);
    insertB.setAttribute('style', 'margin: 0 0.3em; margin-bottom: -3px; cursor: pointer;');
    insertB.setAttribute('title', "insert");
    insertB.addEventListener('click', insertMatrix, false);
    //insertB.addEventListener('dblclick', parseMatrix, false);
    editorControl.appendChild(insertB);
    
    // table
    matrixTableC = document.createElement('div');
    matrixTableC.setAttribute('id', 'meMatrixTableContainer');
    matrixTable = document.createElement('table');
    /*matrixTable.setAttribute('border', '0');
    matrixTable.setAttribute('cellpadding', '0');
    matrixTable.setAttribute('cellspacing', '0');*/
    matrixTable.setAttribute('style', 'margin: auto;');
    matrixTableC.appendChild(matrixTable);
    editor.appendChild(matrixTableC);
    
    resizeMatrix();
    
    // Button
    var editorButton = document.createElement("img");
    editorButton.setAttribute('src', matrixImg);
    editorButton.setAttribute('style', 'position: absolute; right: 25px; z-index: 500; cursor: pointer; top: ' + getComputedStyle(document.getElementById("equal")).top + ';');
    editorButton.setAttribute('title', 'toggle matrix-editor');
    editorButton.addEventListener('click', toggleMatrixEditor, false);
    editorButton.addEventListener('dblclick', toggleStayOnTop, false);
    inputcontainer.appendChild(editorButton);
    
    // reduce size of input-field
    inputfield.style.width = parseInt(getComputedStyle(inputfield).width) - 18 + "px";
}

function toggleMatrixEditor()
{
    editor.style.display = (editor.style.display == "block") ? "none" : "block";
    matrixTable.childNodes[0].childNodes[0].firstChild.focus();
}

function toggleHelp()
{
    //help.style.height  = Math.max(parseInt(getComputedStyle(document.body).height), parseInt(window.innerHeight)) + "px";
    help.style.display = (help.style.display == "block") ? "none" : "block";
}

function toggleStayOnTop()
{
    stayOnTop = !stayOnTop;
    toggleMatrixEditor();
}

function resizeMatrix()
{
    if (!isInt(mSize.value) || mSize.value < 1)
    {
        mSize.value = 1;
    }
    
    if (!isInt(nSize.value) || nSize.value < 1)
    {
        nSize.value = 1;
    }
    
    var oldMatrix = matrixTable.cloneNode(true);
    
    for (var i = matrixTable.childNodes.length; i > 0; i--)
    {
        matrixTable.removeChild(matrixTable.firstChild);
    }
    
    for (var i = 1; i <= mSize.value; i++)
    {
        var row = document.createElement("tr");
        var oldRow = document.createElement("tr");
        
        if (oldMatrix.hasChildNodes())
        {
            oldRow = oldMatrix.firstChild;
            oldMatrix.removeChild(oldMatrix.firstChild);
        }
        
        for (var j = 1; j <= nSize.value; j++)
        {
            if (oldRow.hasChildNodes())
            {
                row.appendChild(oldRow.firstChild);
                //oldRow.removeChild(oldRow.firstChild);
            }
            else
            {
                var field = document.createElement("input");
                field.setAttribute('type', 'text');
                field.setAttribute('class', 'meMatrixTableCell');
                
                var cell = document.createElement("td");
                cell.appendChild(field);
                
                row.appendChild(cell);
            }
        }
        
        matrixTable.appendChild(row);
    }
    
    //matrixTable.parentNode.style.width = 1 + 2.3 * nSize.value + "em";
}

function isInt(n)
{
    return n.toString() == parseInt(n).toString();
}

function init()
{
    // we need a few elements
    inputcontainer = document.getElementById("equal").parentNode;
    var icInputs   = inputcontainer.getElementsByTagName("input");
    inputfield     = icInputs[0];
    
    // load configuration / presets
    mDefault  = (GM_getValue('mDefault') && isInt(GM_getValue('mDefault')) && GM_getValue('mDefault') > 0) ? GM_getValue('mDefault') : mDefault;
    nDefault  = (GM_getValue('nDefault') && isInt(GM_getValue('nDefault')) && GM_getValue('nDefault') > 0) ? GM_getValue('nDefault') : nDefault;
    stayOnTop = GM_getValue('stayOnTop');
    
    // insert Editor
    insertEditor();
}

window.addEventListener('load', init, false);

/*
Changelog:

0.03
  - new: Fill empty fields with 0
  - new: Update-checker
  - fix: Help-style
  - new: highlight active cell
  - new: settings

0.02
  - fix: right margin in input-field
  - fix: few cleanups
  - fix: icon-attribution
  - new: border, position
  - new: help
  - new: insert at cursor-position, replace selected text
  - new: toggle to stay on top
  - new: reset matrix

0.01
  - Initial release
*/