// OpenGrok Autocomplete GM User Script
// version 0.1
// 2006-10-10
// Copyright (c) 2006, Jim R. Wilson (wilson.jim.r at gmail)
// Released under The MIT License (http://www.opensource.org/licenses/mit-license.php)
//
// Purpose:
//    This userscript addes autocomplete drop-down lists for OpenGrok search pages.
//
// Example:
//     To see an example of this script in action, visit the OpenSolaris source browser:
//         http://cvs.opensolaris.org/source/
//     Just start typing in any of the first four fields to see the drop-down
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
// select "OpenGrok Autocomplete", and click Uninstall.
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
// @name          OpenGrok Autocomplete
// @namespace     http://jimbojw.blogspot.com/
// @description   Adds autocomplete functionality to fields in OpenGrok searches.
// @include       *
// ==/UserScript==

// Wrap the whole thing in an anonymous function.
// (This avoids inadvertantly affecting other scripts by adding global vars.)
(function() {

// Since OpenGrok searches could preumably have any imaginable URL, we have to do DOM inspection as a primitive test.
// If all the tests pass, we can be reasonably sure that the page is an OG search.
var isOG = true;
try {
    isOG = isOG && document.getElementById('Masthead').tagName.toLowerCase()=='div';
    isOG = isOG && document.getElementById('MastheadLogo').tagName.toLowerCase()=='div';
    isOG = isOG && document.getElementsByTagName('form')[0].name=='sbox';
    var inputs = document.getElementsByTagName('input');
    isOG = isOG && inputs[0].name=='q';
    isOG = isOG && inputs[1].name=='defs';
    isOG = isOG && inputs[2].name=='refs';
    isOG = isOG && inputs[3].name=='path';
    isOG = isOG && inputs[4].name=='hist';
} catch (err) {
    isOG = false;
}

// Perform page transformations if page is an OpenGrok search page.
if (isOG) {

/**
 * Inject Prototype and Scriptaculous dependencies.
 * Note: This is less than ideal - it would be preferable to find a way to include just the relevant pieces in this GM userscript directly.
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
 * Inject the OpenGrokAutocompleter.
 * Note: Once again, this has to be injected right into the page in order to leverage the Scriptaculous library.
 */
var scriptText = 
    'OpenGrokAutocompleter = Class.create();' + "\n" +
    'Object.extend(Object.extend(OpenGrokAutocompleter.prototype, Ajax.Autocompleter.prototype), {' + "\n" +
    '  getUpdatedChoices: function() {' + "\n" +
    '    entry = encodeURIComponent(this.options.paramName) + "=" + ' + "\n" +
    '      encodeURIComponent(this.getToken()+"*");' + "\n" +
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
    '    text = text.replace(new RegExp(\'[\\\\s\\\\S]*<table\',"im"),"<table");' + "\n" +
    '    text = text.replace(new RegExp(\'</table>[\\\\s\\\\S]*\',"im"),"</table>");' + "\n" +
    '    doc.innerHTML = text;' + "\n" +
    '    var tab = doc.firstChild;' + "\n" +
    '    var list = new Array();' + "\n" +
    '    if (this.options.pathSearch) {' + "\n" +
    '        var tds = tab.getElementsByTagName("td");' + "\n" +
    '        var lim = (this.options.limit ? this.options.limit : anchs.length);' + "\n" +
    '        for (var i = j = 0; i<tds.length && j<lim; i++) {' + "\n" +
    '            var td = tds[i];' + "\n" +
    '            if (td.className == "f") {' + "\n" +
    '                var a = td.getElementsByTagName("a")[0].innerHTML;' + "\n" +
    '                if (!list.include(a) &&' + "\n" +
    '                    (new RegExp(this.getToken(),"i")).test(a)) {' + "\n" +
    '                    list.push(a);' + "\n" +
    '                    j++;' + "\n" +
    '                }' + "\n" +
    '            }' + "\n" +
    '        }' + "\n" +
    '    } else {' + "\n" +
    '        var anchs = tab.getElementsByTagName("a");' + "\n" +
    '        var lim = (this.options.limit ? this.options.limit : anchs.length);' + "\n" +
    '        for (var i = j = 0; i<anchs.length && j<lim; i++) {' + "\n" +
    '            var a = anchs[i];' + "\n" +
    '            if (a.className == "s") {' + "\n" +
    '                var b = a.getElementsByTagName("b")[0].innerHTML.replace(/\\W/g,"");' + "\n" +
    '                if (!list.include(b)) {' + "\n" +
    '                    list.push(b);' + "\n" +
    '                    j++;' + "\n" +
    '                }' + "\n" +
    '            }' + "\n" +
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
 * Inject the OG Autocompleter style.
 */
var styleText = 
    'div.autocomplete {' + "\n" +
    '  position:absolute;' + "\n" +
    '  width:250px;' + "\n" +
    '  background-color:white;' + "\n" +
    '  border:1px solid #888;' + "\n" +
    '  margin:0px;' + "\n" +
    '  padding:0px;' + "\n" +
    '}' + "\n" +
    'div.autocomplete ul {' + "\n" +
    '  list-style-type:none;' + "\n" +
    '  margin:0px;' + "\n" +
    '  padding:0px;' + "\n" +
    '}' + "\n" +
    'div.autocomplete ul li.selected { background-color: #ffb;}' + "\n" +
    'div.autocomplete ul li {' + "\n" +
    '  list-style-type:none;' + "\n" +
    '  display:block;' + "\n" +
    '  margin:0;' + "\n" +
    '  cursor:pointer;' + "\n" +
    '}';
var style = document.createElement('style');
style.appendChild(document.createTextNode(styleText));
document.getElementsByTagName('head')[0].appendChild(style);

/**
 * When the window is finished loading, finish out the DOM and hook in the autocompleters.
 */
window.addEventListener('load', function(event) {

    // Gank the OpenGrokAutocompleter which we added to the page previously.
    // Note: Since we created this class ourselves, it's *ok* that we're grabbing it here, though
    //   it would still be preferable if there were a way to inline the whole business in this GM userscript.
    OpenGrokAutocompleter = unsafeWindow['OpenGrokAutocompleter'];

    // Adding the OpenGrok Autocomplete functionality
    var fields = ['q','defs','refs','path'];
    var inputs = document.getElementsByTagName('input');
    for (var i=0; i<inputs.length; i++) {
        var q = inputs[i];
        if (/^(q|defs|refs|path)$/.test(q.name)) {
            q.id = q.name + '_query';
            var td = q.parentNode;
            var div = document.createElement('div');
            div.id = q.id + '_auto_complete';
            div.className = 'autocomplete';
            div.style.display = 'none';
            td.appendChild(div);
            new OpenGrokAutocompleter(
                q.id,
                div.id,
                'search',
                { tokens: ' ', limit: '30', pathSearch: (q.name=='path') });
        }
    }

}, 'false');

} // end if (isOG)

})(); // end anonymous function wrapper

