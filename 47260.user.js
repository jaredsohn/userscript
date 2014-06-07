// ==UserScript==
        // @name           RT IsSpam and Next
        // @namespace      http://userscripts.org/users/87745
        // @description    A small addon for Request Tracker (RT). It adds two links in the spam-suspects-queue with the ability to delete a ticket, and to get redirected to the next ticket in one click.
        // @include        https://hjelp.uio.no/Ticket/Display.html?id=*
        // ==/UserScript==
        
        (function() {
            var delID;
            var nextID;
            var prevID;
            
            function isSpamLink(theUrl) {
                if (theUrl == null)
                    return(false);
        
                var searchStr = "/Display.html?Status=deleted&Queue=spam-suspects&id=";
                
                var pos = theUrl.indexOf(searchStr);
                
                if (pos > 0) {
                    var temp = theUrl.substring(pos + searchStr.length);
                    
                    // Are there any more slashes? One more is ok.
                    var pos = temp.indexOf("/");
                    // If there are no more slashes, then success.
                    if (pos == -1) {
                        var tables = document.getElementsByTagName("td");
                        for (var i = 0; i < tables.length; ++i) { 
                            var node = tables[i];
                            var class = node.getAttribute("class");
                            
                            var searchClass = "value queue";
                            
                            if (class.indexOf(searchClass) == 0) {
                                if (getNodeText(node, true).indexOf("spam-suspects") == 0) { 
                                    delID = temp;
                                    return(true);
                                }
                            } 
                        }
                    }
                    temp = temp.substring(pos+1);
                    
                    // Is there anything left?
                    return (temp == null || temp.length == 0);
                }
            }
                        
            function getNodeText(node, goDeep){
                var nodeText = node.nodeValue;
                
                if (goDeep && nodeText == null && node.childNodes != null && node.childNodes.length > 0)
                {
                    nodeText= "";
                    
                    for (var i=0; i < node.childNodes.length; ++i)
                    {
                        nodeText += getNodeText(node.childNodes.item(i), goDeep);    
                    }
                }
                return(nodeText == null ? "" : nodeText);
            }
            
            function createLinks() {
                var container = document.createElement("span");
                container.appendChild(document.createTextNode(" "));
                
                if (prevID || nextID) {
                    var newBull = document.createElement("span");
                    newBull.setAttribute("class", "bullet");
                    newBull.textContent = "· [";
                    container.appendChild(newBull);
                
                    if (prevID) {
                        var prevLink = document.createElement("a");
                        prevLink.setAttribute("href", "JavaScript:(window.open('Display.html?Status=deleted&greasemonkey=true&Queue=spam-suspects&id="+delID+"', 'delete').close());window.location='https://hjelp.uio.no/Ticket/Display.html?id="+prevID+"'");
                        prevLink.textContent = "IsSpam&Prev";
                        container.appendChild(prevLink);
                    }
        
                    if (nextID) {
                        var nextLink = document.createElement("a");
                        nextLink.textContent = "IsSpam&Next";
                        nextLink.setAttribute("href", "JavaScript:(window.open('Display.html?Status=deleted&greasemonkey=true&Queue=spam-suspects&id="+delID+"', 'delete').close());window.location='https://hjelp.uio.no/Ticket/Display.html?id="+nextID+"'");
                        
                        if (prevID) {
                            var newBull = document.createElement("span");
                            newBull.setAttribute("class", "bullet");
                            newBull.textContent = " · ";
                        }
                        
                        container.appendChild(newBull);
                        container.appendChild(nextLink);
                    }
                
                    var newBull = document.createElement("span");
                    newBull.setAttribute("class", "bullet");
                    newBull.textContent = "]";
                    container.appendChild(newBull);
                }
        
                return(container);
            }
        
            function insertLinks() {
                var hyperlinks = document.getElementsByTagName("a");
                for (var i = 0; i < hyperlinks.length; ++i) { 
                    var node = hyperlinks[i];
                    var href = node.getAttribute("href");
                    
                    var searchStr = "/Display.html?id=";
                    if (getNodeText(node, true).indexOf("Next >") > 0) {
                        var pos = href.indexOf(searchStr);
                        nextID = href.substring(pos + searchStr.length);
                    }
        
                    if (getNodeText(node, true).indexOf("< Prev") > 0) {
                        var pos = href.indexOf(searchStr);
                        prevID = href.substring(pos + searchStr.length);
                    }
        
                    if (isSpamLink(href)) {
                        var link = createLinks();
                        if (link != null)
                        {
                            if (node.nextSibling == null)
                                node.parentNode.appendChild(link);
                            else
                                node.parentNode.insertBefore(link, node.nextSibling);
                        }
                    }                
                }
            }
            
            insertLinks();
            
        })();