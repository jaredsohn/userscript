// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install the script, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "OKCupid Fix Tags", and click Uninstall.
//
// --------------------------------------------------------------------
// 
// Author's contact info:
//
// zzyzx.xyzzy@gmail.com
// zzyzx_xyzzy (OKCupid)
// zzyzx_xyzzy@userscripts.org
// http://zzyzx.xyzzy.googlepages.com/okcupidhacks
// 
// Copyright (c) 2008, the author.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the author nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//

// ==UserScript==
// @name           OKCupid Fix Tags
// @namespace      http://zzyzx.xyzzy.googlepages.com/okcupidfixtags
// @description    Fixes hanging tags when reading journal comments; closes your tags for you when you post.
// @include        http://*.okcupid.com/*/journal*
// ==/UserScript==

//look for journal comments blocks and install a watcher...
watchJournal(document);
watchCommentForms(document);

function watchJournal(node) {
    //GM_log('watchJournal');
    //select the divs with numeric ids
    var boards = document.evaluate(
        "descendant::div[@id > 0]",
        node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for (var i = 0; i <  boards.snapshotLength; i++) {
        watchBoard(boards.snapshotItem(i));
    }
}

function watchBoard(node) {
    //install the watcher...    
    watchObject(node.wrappedJSObject, 'innerHTML', function(prop, oldval, newval) {
        //Called when each board loads.

        // what we're going to do is split this raw text up at the beginning of
        // each comment.  Then ask Firefox to parse each of them separately,
        // retreive the raw HTML, and use that as the newval.

        //find each comment text and fix it. This presumes no DIV tags in the
        //comment text itself, which should be the case, right?
        var pattern = new RegExp("<div[^>]*journalCommentText.*?</div>", 'gi');
        newval = newval.replace(pattern, function (contents, offset, s) {
            return fixTags(contents);

        });
        //GM_log(newval);

        return newval;
    });
}

function watchCommentForms(node) {
    var forms = document.evaluate(
        "//div[contains(concat(' ', @class, ' '), 'comment_add')]/form",
        node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < forms.snapshotLength; i++) {
        watchForm(forms.snapshotItem(i));
    }
}

function watchForm(form) {
    var btn = form.elements.namedItem('button');
    btn.addEventListener('click', function(e) {
	    var text = form.elements.namedItem('text').value;
        text = fixTags(text);
        form.elements.namedItem('text').value = text;
	    return true;
    }, false, 1); //nonzero priority to go before the existing submit handler.
}

//we'll need an unattached div to exploit Firefox's parser
var dummyDiv = document.createElement('div');

function fixTags(contents) {
    //GM_log(contents);
    dummyDiv.innerHTML = contents;
    //now Firefox gets a chance to take a look at it and closes the
    //dangling tags automagically.
    return dummyDiv.innerHTML;
}

function watchObject(obj, prop, func) {
    //cascading watch used in all my scripts...
    var old = obj['_watch_' + prop];
    if (old) {
        obj['_watch_' + prop] = function(prop, oldVal, newVal) {
            newVal = old(prop, oldVal, newVal);
            newVal = func(prop, oldVal, newVal);
            return newVal;
        }
    } else {
        obj['_watch_' + prop] = func;
    }
    obj.watch(prop, obj['_watch_' + prop]);
}

