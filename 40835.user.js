// ==UserScript==
// @name           GA Enhanced Graphs
// @namespace      http://userscripts.org/users/77945
// @description    Enhance google analytics graphs
// @include        http://www.google.com/analytics/*
// ==/UserScript==
var GRIDLINES = 5;


function keypressed(event) {
    if (event.which == 115) {
        scaleAllGraphs(false);
    }
    if (event.which == 98) {
        scaleAllGraphs(true);
    }
}

window.addEventListener("keypress", keypressed, false);

//global var
var embed;
function scaleAllGraphs(makeHigher) {
    for (embed = document.getElementsByTagName('embed'), i = embed.length - 1; i >= 0; i--) {
        var regexp0 = /(OverTimeGraph\.swf)/;
        if (embed[i].getAttribute('src').match(regexp0)) {
            if (makeHigher == true) {
                changeHeight(i);
            }
            else
            {
                scaleGraph(i);
            }
            //        var rangeDiv = document.createElement('div');
            //        rangeDiv.setAttribute('style', 'position:relative;top:-152px;left:100px;z-index:1000');
            //        
            //        var tn1 = document.createTextNode('Change y scale (blank for auto) ');
            //        rangeDiv.appendChild(tn1);
            //        
            //        
            //        
            ////        var yMinBox = document.createElement('input');
            ////        var yMaxBox = document.createElement('input');
            ////        yMinBox.size = 3;
            ////        yMaxBox.size = 3;
            //        var redrawLink = document.createElement('a');
            //        redrawLink.href = 'javascript:void(0)';
            //        redrawLink.setAttribute('onclick','scaleGraph(' + i + ');');
            //        
            //        var linkText = document.createTextNode('Scale');
            //        redrawLink.appendChild(linkText);
            ////        var tn2 = document.createTextNode('Min: ');
            ////        rangeDiv.appendChild(tn2);
            ////        rangeDiv.appendChild(yMinBox);
            ////        var tn3 = document.createTextNode(' Max: ');
            ////        rangeDiv.appendChild(tn3);
            ////        rangeDiv.appendChild(yMaxBox);
            //        rangeDiv.appendChild(redrawLink);
            //        

            //        embed[i].parentNode.appendChild(this.rangeDiv);
            //        
            //     with (embed[i].parentNode) appendChild(rangeDiv);
        }
    }
}

function changeHeight(i) {
    embed[i].setAttribute('height', 300);

    with (embed[i].parentNode) appendChild(removeChild(embed[i]));
} 
 
function scaleGraph(i) {
    //Get flashvars
    var flashvars = unescape(embed[i].getAttribute('flashvars'));

    var labelSets = extractRawLabelSets(flashvars);
    var sets = 1; //default not a compaison
    if (labelSets.length > 2)
        sets = 2; //compare case clip last set
    var rawLabels = new Array(sets);
    var actualValues = new Array(sets);
    var graphedValues = new Array(sets);
    for (var k = 0; k < sets; k++) {
        rawLabels[k] = extractRawLabels(labelSets[k]);
        actualValues[k] = extractActualValues(rawLabels[k]);
    }

    var min = getMin(actualValues);

    var max = getMax(actualValues);

    for (var j = 0; j < sets; j++) {
        graphedValues[j] = translatePoints(min, actualValues[j]);
    }

    var newFlashargs = rewriteFlashargs(flashvars, actualValues, graphedValues);

    newFlashargs = scaleAxis(newFlashargs, max - min, min, GRIDLINES);
    embed[i].setAttribute('flashvars', urlEncode(newFlashargs));

    with (embed[i].parentNode) appendChild(removeChild(embed[i]));
}

function extractRawLabelSets(flashvars) {
    var regexp = /("Points":\[(null\,)*\{(.*?)\]\}\]\})/g;
    return flashvars.match(regexp);
}

//Extract point array
function extractRawLabels(flashvars) {
    var regexp = /("Value":\["(.*?)"\],)/g;
    return flashvars.match(regexp);
}

//Extract actual values        
function extractActualValues(rawLabelArray) {

    var actualValues = new Array(rawLabelArray.length);
    var regexp2 = /("(.*?)")/g;
    for (j = 0; j < rawLabelArray.length; j++) {
        var tempArray = rawLabelArray[j].match(regexp2);
        actualValues[j] = tempArray[1].replace(/"/g, '');
    }
    return actualValues;
}

//Get Minimum point
function getMin(pointValues) {
    var min = pointValues[0][0];
    for (var j = 0; j < pointValues.length; j++) {
        for (var i = 1; i < pointValues[j].length; i++) if (pointValues[j][i] < min) min = pointValues[j][i];
    }
    return min;
}

//Get Maximum point
function getMax(pointValues) {
    var max = pointValues[0][0];
    for (var j = 0; j < pointValues.length; j++) {
        for (var i = 1; i < pointValues[j].length; i++) if (pointValues[j][i] > max) max = pointValues[j][i];
    }
    return max;
}

//Write special case for times and percentages
function scaleAxis(flashvars, actualmax, min, gridlines) {
    var newLineActual = new Array(gridlines);
    var newLineLabel = new Array(gridlines);

    for (var k = 0; k < gridlines; k++) {
        newLineActual[k] = Math.round((actualmax / gridlines) * (k + 1));
        newLineLabel[k] = newLineActual[k] + parseInt(min);

    }

    var gridLineStr = "";
    for (var i = 0; i < gridlines; i++) {
        gridLineStr += '["' + newLineActual[i] + '", "' + newLineLabel[i] + '"]';
        if (i < gridlines - 1)
            gridLineStr += ',';
    }
    var regexp3 = /("YLabels":\[\["(.*?)"\]\],)/g
    flashvars = flashvars.replace(regexp3, '"YLabels":[' + gridLineStr + '],');
    return flashvars;
}

//Translate the points down by the minima (making the new minima actual value 0
function translatePoints(min, pointValues) {
    var newValues = new Array(pointValues.length);
    for (var k = 0; k < pointValues.length; k++) {
        newValues[k] = pointValues[k] - min;
    }
    return newValues;
}

function rewriteFlashargs(flashvars, pointValues, scalePoints) {
    for (var i = 0; i < pointValues.length; i++) {
        for (var n = 0; n < pointValues[i].length; n++) {
            flashvars = flashvars.replace(pointValues[i][n], scalePoints[i][n]);
        }
    }

    return flashvars;
}

function urlEncode(flashvars) {
    flashvars = flashvars.replace(/input=/, "");
    flashvars = flashvars.replace(/&locale=en-US/, "");
    flashvars = "input=" + escape(flashvars) + "&locale=en-US";
    return flashvars

}

