// ==UserScript==
// @name                Reciprocatr
// @description     Show who is not returning your follows, and who you are not following back
// @namespace      http://stupidinboston.tumblr.com/
// @include        http://www.tumblr.com/following
// @include        http://www.tumblr.com/followers
// @version        0.1.
// ==/UserScript==

Array.prototype.find = function(searchStr) {
  var returnArray = false;
  for (i=0; i<this.length; i++) {
    if (typeof(searchStr) == 'function') {
      if (searchStr.test(this[i])) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    } else {
      if (this[i]===searchStr) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    }
  }
  return returnArray;
}

function xpath(doc,xpathText) {
	return doc.evaluate(
		xpathText, doc, null,
		XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null
	);
}

function createHTMLDocumentByString(str) {
    var html = str.replace(/<!DOCTYPE.*?>/, '').replace(/<html.*?>/, '').replace(/<\/html>.*/, '')
    var htmlDoc  = document.implementation.createDocument(null, 'html', null)
    var fragment = createDocumentFragmentByString(html)
    try {
        fragment = htmlDoc.adoptNode(fragment)
    } catch(e) {
        fragment = htmlDoc.importNode(fragment, true)
    }
    htmlDoc.documentElement.appendChild(fragment)
   return htmlDoc
}


function createDocumentFragmentByString(str) {
    var range = document.createRange()
    range.setStartAfter(document.body)
    return range.createContextualFragment(str)
}


function injectContent(html) {
    //create the div element,
	var div = document.createElement('div');
	div.id = 'content';
    
    // add the HTML to our div element
	div.innerHTML = '<h1 style="margin: 0px 0px 10px; font-size: 23px;">'
        + html.length + ' people not reciprocating</h1>'
        + '<ul id="following">' 
        + html.join('\n') 
        + '</ul>'
        + '<div class="clear"/>';

    // add the new div element to the DOM, inserting it just above the current "content" div
    var contentNode = document.getElementById('content');
	contentNode.parentNode.insertBefore(div, contentNode);
}

function doMain() {
    if ( document.location.pathname == "/following" ) { 
        var page = "http://www.tumblr.com/followers"

    	GM_xmlhttpRequest({
            method: 'GET',
            url: page,
            onload: function(res) {
                var htmlDoc = createHTMLDocumentByString(res.responseText);
                var altHtmlDoc = htmlDoc.ownerDocument ? htmlDoc.ownerDocument : htmlDoc;
                var altNodes = xpath(altHtmlDoc,'id("following")/li');
                
                var altUsers = [];
                var altNode;

                while (altNode = altNodes.iterateNext()) {
                    if (altNode.innerHTML.match(/media.tumblr.com\/avatar_(\w+)\./m))
                        var altTumblrid = RegExp.$1;
                        altUsers.push(altTumblrid);
                }

                var curNodes = xpath(document,'id("following")/li');
                var misUsers = [];
                var curNode;

                while (curNode = curNodes.iterateNext()) {
                    var html = '<li>' + curNode.innerHTML + '</li>';
                	if (html.match(/media.tumblr.com\/avatar_(\w+)\./m)) {
                		var curTumblrid = RegExp.$1;
                        if (!altUsers.find(curTumblrid)) {
                            misUsers.push(html);
                        }
                    }
                }
            
                injectContent(misUsers);
            }
        });
    } else if ( document.location.pathname == "/followers" ) {
        var page = "http://www.tumblr.com/following"

    	GM_xmlhttpRequest({
            method: 'GET',
            url: page,
            onload: function(res) {
                var htmlDoc = createHTMLDocumentByString(res.responseText);
                var altHtmlDoc = htmlDoc.ownerDocument ? htmlDoc.ownerDocument : htmlDoc;
                var altNodes = xpath(altHtmlDoc,'id("following")/li');
                
                var altUsers = [];
                var altNode;

                while (altNode = altNodes.iterateNext()) {
                    if (altNode.innerHTML.match(/media.tumblr.com\/avatar_(\w+)\./m))
                        var altTumblrid = RegExp.$1;
                        altUsers.push(altTumblrid);
                }

                var curNodes = xpath(document,'id("following")/li');
                var misUsers = [];
                var curNode;

                while (curNode = curNodes.iterateNext()) {
                    var html = '<li>' + curNode.innerHTML + '</li>';
                	if (html.match(/media.tumblr.com\/avatar_(\w+)\./m)) {
                		var curTumblrid = RegExp.$1;
                        if (!altUsers.find(curTumblrid)) {
                            misUsers.push(html);
                        }
                    }
                }
            
                injectContent(misUsers);
            }
        });
        
    }
}

doMain();
