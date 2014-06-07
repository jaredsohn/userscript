// Copyright (c) 2006 Brian Donovan briandonovan.info/self-assembly/
// $Date: 2006-06-19 00:26:29 +0800 (Mon, 19 Jun 2006) $
// ==UserScript==
// @name Add line numbers to PRE-CODE source snippets
// @namespace http://projects.briandonovan.info/projects/greasemonkey-user-scripts/
// @description Add line numbers to lines within CODE elements nested within PRE elements (the format for code snippets on many developer-oriented sites)
// @include *
// ==/UserScript==

var xpathResult = document.evaluate('//pre/code', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var regexpPatternLines = /.+/g;  // . is any character except newline or other Unicode line terminator and + matches 1 or more of the previous characters
for (var i=0; i<xpathResult.snapshotLength; i++) {
    var nodeCodePreForLineNumbering = xpathResult.snapshotItem(i);
    var strThisCodePreContents = nodeCodePreForLineNumbering.childNodes[0].nodeValue;
    //------------------------------------------------
    // Each element in array below is a single line
    //------------------------------------------------
    var arrLinesInThisCodePreValue = strThisCodePreContents.match(regexpPatternLines);
    var intNumLines = arrLinesInThisCodePreValue.length;
    //------------------------------------------------
    // Don't bother numbering lines if there's just one line
    //------------------------------------------------
    if (intNumLines > 1) {
        var strNewCodePreContents = '';
        for (var j=0; j<arrLinesInThisCodePreValue.length; j++) {
            //------------------------------------------------
            // Handle leading 0's (if any)
            //------------------------------------------------
            var strTotalNumLinesThisPreCodeValue = intNumLines.toString();
            var strThisLineNumber = (j + 1).toString();
            var intDiffLength = strTotalNumLinesThisPreCodeValue.length - strThisLineNumber.length;
            //------------------------------------------------
            var funcReturnThisLineNumber = function(strThisLineNumber, intDiffLength){
                var strPrecedingZeros = '';
                for (var k=0; k<intDiffLength; k++) {
                    strPrecedingZeros += '0';
                }
                strPaddedLineNumber = strPrecedingZeros + strThisLineNumber;
                return strPaddedLineNumber;
            };
            //------------------------------------------------
            strNewCodePreContents += funcReturnThisLineNumber(strThisLineNumber, intDiffLength) + '. ' + arrLinesInThisCodePreValue[j] + "\n";
        }
        nodeCodePreForLineNumbering.childNodes[0].nodeValue = strNewCodePreContents;
    }
}
