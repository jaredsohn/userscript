// Google Code Search Autocomplete
// version 0.1
// 2006-10-12
// Copyright (c) 2006, Jim R. Wilson (wilson.jim.r at gmail)
// Released under The MIT License (http://www.opensource.org/licenses/mit-license.php)
//
// Purpose:
//    This userscript adds an autocomplete drop-down to Google's Code Search
//
// Example:
//     To see an example of this script in action, visit the Google's Code Search:
//        http://www.google.com/codesearch
//     Just start typing in the search box to see the drop-down list of suggestions.
//     Please note that not all queries will return results.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Code Search Autocomplete", and click Uninstall.
//
// --------------------------------------------------------------------
// Copyright (c) 2006 Jim R. Wilson
// 
// Permission is hereby granted, free of charge, to any person 
// obtaining a copy of this software and associated documentation 
// files (the "Software"), to deal in the Software without 
// restriction, including without limitation the rights to use, 
// copy, modify, merge, publish, distribute, sublicense, and/or 
// sell copies of the Software, and to permit persons to whom the 
// Software is furnished to do so, subject to the following conditions:
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
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Code Search Autocomplete
// @namespace     http://jimbojw.blogspot.com/
// @description   Adds autocomplete functionality to fields in Google Code Searches.
// @include       http://www.google.com/codesearch*
// @exclude       http://www.google.com/codesearch/advanced_code_search*
// ==/UserScript==

// Anonymous wrapper function
(function() {

/**
 * Inject Prototype and Scriptaculous dependencies.
 */
var scripts = [
    'http://wiki.script.aculo.us/javascripts/prototype.js',
    'http://wiki.script.aculo.us/javascripts/effects.js',
    'http://wiki.script.aculo.us/javascripts/controls.js'
];
for (var i=0; i<scripts.length; i++) {
    var script = document.createElement('script');
    script.src = scripts[i];
    document.getElementsByTagName('head')[0].appendChild(script);
}

/**
 * Inject the GCSAutocompleter.
 * Note: This has to be injected straight into the page to previously included libraries.
 */
var scriptText = 
    'window["sf"] = function(){};' + "\n" +
    'GCSAutocompleter = Class.create();' + "\n" +
    'Object.extend(Object.extend(GCSAutocompleter.prototype, Ajax.Autocompleter.prototype), {' + "\n" +
    '  getUpdatedChoices: function() {' + "\n" +
    '    entry = encodeURIComponent(this.options.paramName) + "=" + ' + "\n" +
    '      encodeURIComponent(this.getToken()+"\\\\w*");' + "\n" +
    '     this.options.parameters = this.options.callback ?' + "\n" +
    '      this.options.callback(this.element, entry) : entry;' + "\n" +
    '     if(this.options.defaultParams) ' + "\n" +
    '      this.options.parameters += "&" + this.options.defaultParams;' + "\n" +
    '     new Ajax.Request(this.url, this.options);' + "\n" +
    '  },' + "\n" +
    '  onComplete: function(request) {' + "\n" +
    '    if (request.responseText.length > 500000) return;' + "\n" +
    '    var doc = document.createElement("div");' + "\n" +
    '    var text = request.responseText;' + "\n" +
    '    text = text.replace(new RegExp(\'[\\\\s\\\\S]*<body\',"im"),"<body");' + "\n" +
    '    text = text.replace(new RegExp(\'</body>[\\\\s\\\\S]*\',"im"),"</body>");' + "\n" +
    '    doc.innerHTML = text;' + "\n" +
    '    var bs = doc.getElementsByTagName("b");' + "\n" +
    '    var list = new Array();' + "\n" +
    '    var lim = (this.options.limit ? this.options.limit : bs.length);' + "\n" +
    '    var wordRE = new RegExp(this.getToken(),"i");' + "\n" +
    '    for (var i = j = 0; i<bs.length && j<lim; i++) {' + "\n" +
    '        if (bs[i].className!="hl") continue;' + "\n" +
    '        var b = bs[i].innerHTML;' + "\n" +
    '        if (!list.include(b) && wordRE.test(b)) {' + "\n" +
    '            list.push(b);' + "\n" +
    '            j++;' + "\n" +
    '        }' + "\n" +
    '    }' + "\n" +
    '    list = list.sort( function (x,y) {' + "\n" +
    '        var a = String(x).toUpperCase(); ' + "\n" +
    '        var b = String(y).toUpperCase(); ' + "\n" +
    '        if (a > b) return 1 ' + "\n" +
    '        if (a < b) return -1 ' + "\n" +
    '        return 0;' + "\n" +
    '    });' + "\n" +
    '    if (!list.length) return;' + "\n" +
    '    var tokenRE = new RegExp("("+this.getToken()+")","i");' + "\n" +
    '    list = list.invoke( "replace", tokenRE, "<b>$1</b>" );' + "\n" +
    '    list = list.join("</li><li style=\'height:1.15em;\'>");' + "\n" +
    '    list = "<ul><li style=\'height:1.15em;\'>" + list + "</li></ul>";' + "\n" +
    '    this.updateChoices(list);' + "\n" +
    '  }' + "\n" +
    '});';
var script = document.createElement('script');
script.appendChild(document.createTextNode(scriptText));
document.getElementsByTagName('head')[0].appendChild(script);

/**
 * Inject the GCS Autocompleter style.
 */
var styleText = 
    'div.autocomplete {' + "\n" +
    '  background-color:#fff;' + "\n" +
    '  border:1px solid #888;' + "\n" +
    '  margin:0px;' + "\n" +
    '  padding:0px;' + "\n" +
    '}' + "\n" +
    'div.autocomplete ul {' + "\n" +
    '  list-style-type:none;' + "\n" +
    '  margin:0px;' + "\n" +
    '  padding:0px;' + "\n" +
    '}' + "\n" +
    'div.autocomplete ul li.selected {' + "\n" +
    '  background-color:#3366cc;' + "\n" +
    '  color:#fff;' + "\n" +
    '}' + "\n" +
    'div.autocomplete ul li {' + "\n" +
    '  list-style-type:none;' + "\n" +
    '  display:block;' + "\n" +
    '  margin:0;' + "\n" +
    '  padding:0 0 0.25em 0.25em;' + "\n" +
    '  cursor:pointer;' + "\n" +
    '  text-align:left;' + "\n" +
    '  font-size:0.78em;' + "\n" +
    '}';
var style = document.createElement('style');
style.appendChild(document.createTextNode(styleText));
document.getElementsByTagName('head')[0].appendChild(style);

/**
 * On window load, finish out the DOM and hook in the autocompleter.
 */
window.addEventListener('load', function(event) {

    // Grab the GCSAutocompleter which we added to the page previously.
    GCSAutocompleter = unsafeWindow['GCSAutocompleter'];
    
    // Adding the GCS Autocomplete functionality to all inputs with name='q'
    var firstq = null;
    var inputs = document.getElementsByTagName('input');
    for (var i=0; i<inputs.length && firstq==null; i++) {
        var q = inputs[i];
        if (q.name != 'q') continue;
        q.id = 'q' + i;
        var td = q.parentNode;
        var div = document.createElement('div');
        div.id = 'q_autocomplete' + i;
        div.className = 'autocomplete';
        div.style.display = 'none';
        td.appendChild(div);
        new GCSAutocompleter(
            q.id,
            div.id,
            'codesearch',
            { tokens: ' ', limit: '30', defaultParams: 'btnG=Search&num=30', method: 'get'}
        );
        if (!firstq) firstq = q;
    }
    firstq.focus();
}, 'false');

})(); // end anonymous function wrapper
