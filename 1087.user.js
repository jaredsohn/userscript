// See demo at http://blog.yanime.org/GreaseMonkey.htm
// Shameless plug: manage your rss/atom with RssFwd! http://www.rssfwd.com/
// Author: choonkeat at gmail, modified by josephgrossberg at yahoo
//
// ChangeLog
// 31 Jan 2006:
//        - cleaner layout
// 25 Aug 2005:
//        - updated to fit delicious's new css
// 19 May 2005:
//        - using 'top.location == location' condition to ensure that floating <c.../> only appear on main page, not inside ads or frames.
//
// 31 Mar 2005:
//        - Introduced [x] click-to-hide beside <c.../>
//
// 29 Mar 2005:
//        - Fixed minor bug where there are links, but no comments: 'No comments' will show up now; instead of blank page.
//        - Going directly to Del.icio.us to fetch content
//        - Not using innerHtml = innerHtml + .. ; Disrupts some websites.
//        - Added 'px' to font size, duh; Now <c/> is <c.../>, drop-shadowed and is same size on every site.
//
// 28 Mar 2005:
//        - Displaying <c/> twice, 1 in light color another in dark color so chances of appearing increases, without requiring an opaque background colour.
//        - Included mouse-over tooltip to guide user to click
//        - Adjusted the dynamic iframe height and width
// 
// ==UserScript==
// @name          Newsmasher
// @namespace     http://blog.yanime.org/post/1/194
// @description      Inspired by http://www.kokogiak.com/delicious_linkbacks.html ; I love his script, but pop-up/bookmarklet doesn't cut it for me, so..
// @include       http://*/*
// @exclude       http://*/*.js
// ==/UserScript==

(function () {

    // helper function copied from "Google Image Relinker" Greasemonkey script
    function selectNodes(doc, context, xpath) {
       var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
       var result = new Array( nodes.snapshotLength );
       
       for (var x=0; x < result.length; x++) 
       {
          result[x] = nodes.snapshotItem(x);
       }
       
       return result;
    }
    
    // function copied from http://www.faqts.com/knowledge_base/view.phtml/aid/11698    
    function addHTML (html) {
        if (document.all)
            document.body.insertAdjacentHTML('beforeEnd', html);
        else if (document.createRange) {
            var range = document.createRange();
            range.setStartAfter(document.body.lastChild);
            var docFrag = range.createContextualFragment(html);
            document.body.appendChild(docFrag);
        }
        else if (document.layers) {
            var l = new Layer(window.innerWidth);
            l.document.open();
            l.document.write(html);
            l.document.close();
            l.top = document.height;
            document.height += l.document.height;
            l.visibility = 'show';
        }
    }

    // ensures that only main page carries tatoo.. 
    if (top.location == location) { 
    
        if (document) {
            if (document.body) {
                // for every other page, lets add a small <comments/> label at top-left
                
                html =
                    '<div title="Newsmasher: Click to show/hide comments!" id="delicious_comments_clickable" style="position:absolute; left:1px; top:1px; z-index: 5; cursor: pointer; visibility: visible; display: block; " ' +
                    ' onclick="if (document.getElementById(\'delicious_comments_div\').innerHTML.indexOf(\'iframe\') == -1) { document.getElementById(\'delicious_comments_div\').innerHTML = ' + 
                    '\'<IFRAME STYLE=\\\'filter:alpha(Opacity=95); -moz-opacity: 0.95; z-index: 5; \\\' HEIGHT=400 WIDTH=600 BORDER=1 ' + 
                    ' SRC=\\\'http:\/\/del\.icio\.us\/url\?url\=' + escape(location.href) + '\\\' TITLE=\\\'Thoughtlinks from Del.icio.us\\\'><\/IFRAME>\';' + 
                    ' } else { document.getElementById(\'delicious_comments_div\').innerHTML = \'\'; }" ' +
                    '>' +
                    '<div id="delicious_comments_label2" style="position:fixed; left:0px; top:0px; font-family: sans-serif; font-size: 10px; color: #000; background: #fff; border: 1px solid #000; z-index: 5; padding: 2px; -moz-opacity: .4;" ' +
                    '>' + 'del.icio.us' + '</div>' +
                    '<br><div id="delicious_comments_div" ></div>' +
                    '</div>' +
                    '';
                addHTML(html);
            }
        }

    } else if (document && location.href.indexOf('http\:\/\/del\.icio\.us\/url\/') != -1) {
            
        // this is supposed to occur inside the iframe
        //
        // reformats the del.icio.us html
        // removes all entries without "extended comments"
        // removes all the hyperlink to the url (redundant)
        // and removes the banner
        var nodes = selectNodes(document, document.body, "//div[contains(@class,'post')]");

        var hasResult = false;
        var div_c = 0;
        var del_i = 0;
        var auth_i = 0;
        for (var x=0; x < nodes.length; x++) 
        {
            div_c = 0;
            del_i = 0;
            auth_i = 0;
            for (var y=0; y < nodes[x].childNodes.length; y++) {
                if (nodes[x].childNodes.item(y).nodeType == 1) {
                    div_c++;
                    if (div_c == 1) {
                        del_i = y;                        
                    } else if (div_c == 3) {
                        auth_i = y;
                    } else if (div_c > 3) {
                        break;
                    }
                }
            }

            if (div_c == 3) {
                // var hrefnodes = selectNodes(document, nodes[x].childNodes.item(auth_i), "./a");
                // nodes[x].parentNode.replaceChild(nodes[x], hrefnodes[0]);
                nodes[x].removeChild(nodes[x].childNodes.item(del_i));
                hasResult = true;
            } else {
                nodes[x].parentNode.removeChild(nodes[x]);
            }

        }

        if (! hasResult) {
            nodes = selectNodes(document, document.body, "//div[contains(@class,'delMain')]");
            var ele = document.createElement('h1');
            document.importNode(ele, true);
            var txt = document.createTextNode('No comments');
            document.importNode(txt, true);
            nodes[0].appendChild(ele).appendChild(txt);
            // document.body.innerHTML = '<centre><h1>no comments</h1></centre>';

        } 

        nodes = selectNodes(document, document.body, "//div[contains(@class,'date') or contains(@class,'banner')]");
        for (var x=0; x < nodes.length; x++) 
        {
	        nodes[x].innerHTML = '';
        }
        
    }

    
})();

