// ==UserScript==
// @name           UnitFormat
// @namespace      http://brucknerite.net
// @description    Unit microformat processing and conversion.
// ==/UserScript==

// License:
//
// Copyright (c) 2007 Ivan Rivera
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.

// Null unit name array
var nullUnits = [ 'null', 'roman', 'decimal', 'binary', 'octal', 'hex' ];

// Select all <abbr> elements with an "unit" class using XPath
var allUnits = document.evaluate(
    '//abbr[contains(@class,"unit")]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
// Send everyone of them off to Google for conversion
for (var i = 0; i < allUnits.snapshotLength; i++) {
    queryGoogle(allUnits.snapshotItem(i));
}

/**
 * Queries Google via xmlHttpRequest for unit conversions. Origin and 
 * destination unit are specified in the class attribute of <abbr> elements 
 * with the following syntax:
 *      class="unit [origin] [destination]"
 * where origin and destination are mutually interchangeable units in a format 
 * acceptable to Google Calc (whichever that means). The response is handled by 
 * processResponseData(unitElem, html, altUnit). Any kind of error (parsing,
 * connectivity or otherwise) should result in the function returning without
 * side effects.
 *
 * @param unitElem  <abbr> DOM element representing a unit microformat.
 */
function queryGoogle(unitElem) {
    var value = unitElem.getAttribute('title');
    var classes = unitElem.getAttribute('class').split(' ');
    if (classes.length < 3) {
        return;
    }
    var unit = classes[1];
    var alt = classes[2];
    var shouldParseNumber = true;
    if (nullUnits.indexOf(unit.toLowerCase()) > -1) {
        unit = '';
        shouldParseNumber = alt.indexOf('decimal') > -1;
    }
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.google.com/search?q=' + value + '+' + escape(unit) + 
            '+in+' + escape(alt),
        headers: {
            'User-agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.1) Gecko/2008071719 Firefox/3.0.1'
        },
        onload: function(response) {
            processResponseData(unitElem, response.responseText, alt, shouldParseNumber);
        }
    });
}

/**
 * Parses Google Calc's responses and creates an element containing the 
 * conversion in the form of an asterisk adjacent to the original unit
 * microformat. The generated HTML is unit-microformat compliant in itself,
 * but contains no target unit:
 *      <abbr title="[destination_unit_value]" class="unit [destination_unit]">
 *          <a title="[destination_unit_value] [destination_unit]">*</a>
 *      </abbr>
 *
 * @param unitElem          <abbr> DOM element representing a unit microformat.
 * @param html              HTML text with Google Calc's response to process.
 * @param altUnit           Destination unit name.
 * @param shouldParseNumber true if the result is expected to be decimal.
 */
function processResponseData(unitElem, html, altUnit, shouldParseNumber) {
    var re = new RegExp(' = .+</b></h2>', 'g');
    var matches = html.match(re);
    if (matches && matches.length > 0) {
        var value = shouldParseNumber ? 
            parseHtmlNumber(matches[0]) : 
            matches[0].split('</b>')[0].split('= ')[1];
        var badge = document.createElement('sup');
        badge.innerHTML = '<abbr title="' + value + '" class="unit ' + altUnit +
            '"><a title="' + value + ' ' + altUnit + '">*</a></abbr>';
        unitElem.parentNode.insertBefore(badge, unitElem.nextSibling);
    }
}

/**
 * Takes a number expressed as HTML text and returns the corresponding floating 
 * point number Parsing assumes a single number, maybe with presentational HTML 
 * interspersed, perhaps containing some power of ten. Not expecting more than 
 * one separator sign (decimal, maybe "," or ".").
 *
 * @param html        HTML text containing a number.
 * @paran precision   Decimal places for the result (default 2). 
 * @return            Parsed floating point number.
 */
function parseHtmlNumber(html, precision) {
    var mantissa = 0;
    var exponent = 0;
    var pexp = !precision ? 100 : Math.pow(10, precision);
    // Let's deal with the exponent first
    if (html.indexOf('<sup>') > -1) {
        supSplit = html.split('<sup>');
        exponent = parseInt(supSplit[1]);
        html = supSplit[0].split('�')[0];
        if (isNaN(exponent)) {
            exponent = 0;
        }
    }
    // Follow up with the mantissa
    html = html.replace(/<[^<>]+> ?/g, '')
        .replace(/[^0-9,.-]/g, '')
        .replace(/,/g, '.');
    mantissa = parseFloat(html);
    if (isNaN(mantissa)) {
        mantissa = 0;
    }
    // Adjust mantissa's fractional part to the desired precision
    var integer = mantissa > 0 ? Math.floor(mantissa) : Math.ceil(mantissa);
    var frac = mantissa - integer;
    var roundedfrac = Math.round(frac * pexp) / pexp;
    if (roundedfrac == 0 && integer == 0) {
        // We have rounded to zero! For now, let's revert the operation
        roundedfrac = frac;
    }
    mantissa = integer + roundedfrac;
    //return mantissa * Math.pow(10, exponent);
    var result = '' + mantissa;
    if (exponent != 0) {
        result += ' * 10^' + exponent;
    } 
    return result;
}