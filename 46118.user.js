// ==UserScript==
                        // @name           xiami + Last.fm
                        // @namespace      http://sospartan.xiami.com
                        // @description    Inserts xiami links on Last.fm
                        // @include        http://last.fm/*
                        // @include        http://*.last.fm/*
                        // @include        http://lastfm.*/*
                        // @include        http://*.lastfm.*/*
                        // ==/UserScript==
                        
                        // Last.fm seems to urlencode strings twice so remove the second urlencode step.
                        function cleanurl(str) {
                            return str.replace(/%25([0-9]{2})/, '%$1');
                        }
                        
                        // Remove whitespace in the beginning and end
                        function trim(str) {
                            return str.replace(/^\s+/, '').replace(/\s+$/, '');
                        }
                        
                        // Creates a link element
                        function createLink(link) {
                            var a = document.createElement('a');
                            a.href = link;
                        	a.target= '_blank';
                            a.title = 'listen in Xiami.com'
                            a.setAttribute('xiamiLink', true);
                            var img = document.createElement('img');
                            img.style.border = 'none';
                            img.style.marginLeft = '3px';
                            img.src = 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAPxJREFUKFNjZICC13EMoaxSMquYePlhQnD697PHCDGQwh+Lff7/P1aIgT81qv2HqwQrnOP0/+d8t//fplrD8Z81wf8/1SqiKZxs8f9tKsceoCZzGP5cp/T/U6UMmsIu3f9ABauQHfmpROw/CDMAJYSA2OBNIlPlz0ZlsEIgZgViLSA2+1wo/P9TvuB/hnfJrKu/dtp+/tGg9f9vvTxMYeyXKtWn36YF/ftTI/3/Uxb3f4aPRbK//7Xq/f9fLvb/Zz4fSGE7EC/5W6fy/3+V9P8/xYL/P6Sw3md4l8A051MKy1cg/v0hiXkrUJEgEPt8TGZ+DhT7D6SvA9V4AQA78aLQOkpNkwAAAABJRU5ErkJggg==';
                            a.appendChild(img);
                        
                            return a;
                        }
                        
                        // Add links for the content under this element.
                        function addLinks(topElem) {
                            // Check if we already added links for this content
                            if (topElem.hasAttribute('xiamiLinksAdded'))
                                return;
                            topElem.setAttribute('xiamiLinksAdded', true);
                        
                            // This is a last.fm url that we want to rewrite
                            var re = /^http:\/\/(.*\.|)(last\.fm|lastfm\.[^\/]+)\/music\/([^\?#]*)$/i;
                            
                            var elems = topElem.getElementsByTagName('a');
                            for (var i = 0; i < elems.length; i++) {
                                var elem = elems[i];
                            
                                // Ignore image links
                                if (!elem.href || trim(elem.textContent) == '' || elem.className.match(/\blfmButton\b/))
                                    continue;
                        
                                // Check if the link matches
                                if (m = re.exec(elem.href)) {
                                    var found = false;
                        
                                    // Go though parts and check if it is an url that we want to change
                                    parts = m[3].split('/');
                                    for (var j = 0; j < parts.length; j++) {
                                        if (parts[j][0] == '+') {
                                            found = true;
                                            break;
                                        }
                                    }
                        
                                    if (found)
                                        continue;
                        
                                    // Ignore links in the left menu and some other places
                                    var p = elem;
                                    while (p != null) {
                                        if (p.id && p.id.match(/^(secondaryNavigation|featuredArtists)$/) || p.className && p.className.match(/\b(pagehead|image|artistsMegaWithFeatured)\b/)) {
                                            found = true;
                                            break;
                                        }
                                        p = p.parentNode;
                                    }
                            
                                    if (found)
                                        continue;
                        
                                    // Create the xiami url
                                    q = ['artist='+ cleanurl(parts[0])];
                                    if (parts[1] && parts[1] != '_')
                                        q.push('album='+ cleanurl(parts[1]));
                                    if (parts[2])
                                        q.push('song='+ cleanurl(parts[2]));
                            
                                    var a = createLink('http://www.xiami.com/search/find?'+ q.join('&'));
                        
                                    // Insert the link after the found link
                                    // Check if it already have a xiami url
                                    if (!elem.nextSibling || !elem.nextSibling.hasAttribute || !elem.nextSibling.hasAttribute('xiamiLink')) {
                                        elem.parentNode.insertBefore(a, elem.nextSibling);
                                    }
                                }
                            }
                        }
                        
                        // Add listener so if the content changes we add links to the new content
                        document.addEventListener('DOMNodeInserted', function(ev){ addLinks(ev.originalTarget); }, true);
                        
                        // Add links to titles like the artist name on the artist page.
                        var body = document.body;
                        var div = document.getElementById('catalogueHead');
                        if (body.className && div) {
                            if (body.className.match(/\br\-artist\b/)) {
                                // artist page
                                var h1 = div.getElementsByTagName('h1')[0];
                                h1.appendChild(createLink('http://www.xiami.com/search/find?artist='+ encodeURIComponent(h1.textContent) ));
                            } else if (body.className.match(/\br\-album\b/)) {
                                // album page
                                var h1 = div.getElementsByTagName('h1')[0];
                                var a = createLink('http://www.xiami.com/search/find?artist='+ encodeURIComponent(h1.firstChild.textContent) +'&album='+ encodeURIComponent(h1.lastChild.textContent));
                        
                                h1.appendChild(a);
                                div.previousSibling.previousSibling.getElementsByTagName('h1')[0].appendChild(a.cloneNode(true))
                            } else if (body.className.match(/\br\-track\b/)) {
                                // track page
                                var h1 = div.getElementsByTagName('h1')[0];
                                var a = createLink('http://www.xiami.com/search/find?artist='+ encodeURIComponent(h1.firstChild.textContent) +'&song='+ encodeURIComponent(h1.lastChild.textContent.substring(3)));
                        
                                h1.appendChild(a);
                                div.previousSibling.previousSibling.getElementsByTagName('h1')[0].appendChild(a.cloneNode(true))
                            }
                        }
                        
                        // Find links and add xiami links to them
                        addLinks(body);