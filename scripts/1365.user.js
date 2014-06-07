// ==UserScript==
// @name           Flickr group search with Google
// @namespace      http://plutor.org/
// @description    Adds a Google group search.  The default search is baaad.
// @include        http://flickr.com/groups/
// @include        http://www.flickr.com/groups/
// ==/UserScript==

// updated by steeev to work with gm 0.6.4 + ff 1.5  2nd may 2006

unsafeWindow.addgooglesearch = function() {
        /* Find the H4 tag with the text "Search for a group" */
        var xpath = "//h4[text() = 'Search for a group']";
        var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        //var t0 = new Date().getTime();
        for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
                //alert(i + " " + cand);

                var newh4 = document.createElement('h4');
                newh4.style.marginTop = '35px';
                newh4.appendChild(document.createTextNode('Search for a group with Google'));

                var newform = document.createElement('form');
                newform.action = 'http://www.google.com/search';
                newform.method = 'get';
                newform.addEventListener( "submit", unsafeWindow.googlesubmit, true );
                newform.innerHTML = '<input type="text" name="q" size="20">&nbsp;<input type="submit" class="SmallButt" value="SEARCH">'

                cand.parentNode.insertBefore(newh4, cand);
                cand.parentNode.insertBefore(newform, cand);
        }
}

unsafeWindow.googlesubmit=function (e) {
        if (!e || !e.currentTarget || !e.currentTarget.q) return false;
        var tform = e.currentTarget;

        //document.forms.namedItem("tform").elements.namedItem("q").value='site:flickr.com/groups ' + document.forms.namedItem("tform").elements.namedItem("q").value;
        tform.q.value = 'site:flickr.com/groups ' + tform.q.value;

        document.forms.namedItem("tform").submit();
        //tform.submit()
}

//unsafeWindow.addgooglesearch();
unsafeWindow.addEventListener("load", function() { unsafeWindow.addgooglesearch() }, false);

