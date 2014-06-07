// ==UserScript==
// @name            Flickr API Method Drop-down
// @namespace       http://netcetera.org
// @include         http://www.flickr.com/services/api/*
// @description     Adds a method drop-down to pages in the Flickr API docs/tools
// ==/UserScript==

window.addEventListener("load", function() { FAEDD_add_dropdown() }, false);

function FAEDD_add_dropdown() {

    // find where to put the drop-down
    var obj;
    var i = 0;
    var method;
    
    while (!obj && ++i <= 3) {
        var headers = document.getElementsByTagName('h'+i);
        for (var h in headers) {
            var temp = headers[h];
            if (temp && temp.innerHTML) {
                var matches = temp.innerHTML.match(/\b(flickr\.[a-zA-Z.]+)\b/);
                if (matches && matches.length > 1) {
                    obj = temp;
                    method = matches[1];
                }
            }
        }
    }
    
    if (!obj) {
        return;
    }
    
    var n  = obj.nextSibling;
    var p  = document.createElement('p');
    p.innerHTML = 'Getting method drop-down...';
    obj.parentNode.insertBefore(p, n);

    GM_xmlhttpRequest({
        method: 'GET',
        url:    'http://api.flickr.com/services/rest/?method=flickr.reflection.getMethods'
              + '&api_key=45d5d4b7dff9bc653c8eb3e73271c10c'
              + '&format=json&nojsoncallback=1',
               
        onload: function(responseDetails) {
            var data        = eval('(' + responseDetails.responseText + ')');
            var methods     = data['methods']['method'];
            
            for (i in methods) {
                methods[i] = methods[i]['_content'];
            }
            
            methods = methods.sort();

            var dd = document.createElement('select');
            
            for (i in methods) {
                var m = methods[i];
                var e = document.createElement('option');
                e.setAttribute('value', m);
                if (m == method)
                    e.setAttribute('selected', true);
                e.innerHTML = m;
                dd.appendChild(e)
            }
            p.innerHTML = '';
            p.appendChild(dd);

            dd.addEventListener('change', function(e) {
                var re = new RegExp(method);
                if (document.location.href.match(re))
                    document.location.href = document.location.href.replace(new RegExp(method), dd.value);
                else if (document.location.href.match(/\?/))
                    document.location.href += '&method=' + dd.value;
                else
                    document.location.href += '?method=' + dd.value;
            }, false);
        }
    });
}
