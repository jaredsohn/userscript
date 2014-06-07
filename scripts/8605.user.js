// ==UserScript==
// @name          Zip.ca and IMDB interlinking
// @namespace     http://slive.ca/greasemonkey
// @description   Interlink zip.ca and IMDb movie pages
// @include       http://*.imdb.com/title/*
// @include       http://imdb.com/title/*
// @include       http://www.zip.ca/Browse/Title*
// ==/UserScript==

// Add links from zip.ca and imdb movie pages to each other's sites.
// Also, fix up external links from zip.ca movie pages so they don't
// open in resized, crippled windows.

// Author: Joshua Slive, joshua@slive.ca
// Based on the netflix script by Ed Hager, ed@artefxdesign.com

(function() 
{
  
    function getMovieNameFromIMDbTitle()
    {
        var theTitle = document.title;
        if (theTitle)
        {
            var pos = theTitle.indexOf("(");
            if (pos >= 0)
                theTitle = theTitle.substring(0, pos);
        }
        
        return theTitle;
    }
    
    function getMovieNameFromZipTitle()
    {
    var theTitle = document.title;
        if (theTitle)
        {
            var pos = theTitle.indexOf("-");
            var endpos = theTitle.indexOf("Online");
            if (pos >= 0)
                theTitle = theTitle.substring(pos+2,endpos-1);
        }
        
        return theTitle;
    }

    function getNodeText(node, goDeep)
    {
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
    
    function makeZipLink(movieName)
    {
        if (movieName != null && movieName.length > 0)
        {
            var container = document.createElement("span");
            container.setAttribute("style", "font-size:smaller");
            
            var image = document.createElement("img");
            image.setAttribute("src","http://images.zip.ca/zip/en-CA/btn_rent_small.gif");
            image.setAttribute("border","0");
            image.setAttribute("title","View at Zip.ca");
            
            var newLink = document.createElement("a");
            newLink.setAttribute("href", "http://www.zip.ca/browse/search.aspx?f=wc(" + movieName + ")");
            newLink.appendChild(image);
            container.appendChild(newLink);
            
            return(container);
        }
        
        return(null);
    }

    function makeIMDbLink(movieName)
    {
        if (movieName != null && movieName.length > 0)
        {
            var container = document.createElement("span");
            container.setAttribute("style", "font-size:smaller");
            
            var favicon = document.createElement("img");
            favicon.setAttribute("src","http://www.imdb.com/favicon.ico")
            favicon.setAttribute("border","0")
            favicon.setAttribute("title","View in IMDb")
            var newLink = document.createElement("a");
            newLink.setAttribute("href", "http://www.imdb.com/find?q=" + movieName + ";s=tt");
            newLink.appendChild(favicon);
            container.appendChild(newLink);
            
            return(container);
        }
        
        return(null);
    }
    
    function insertLinks()
    {
    
    
        if (location.href.indexOf('imdb.com')>=0)
        {
            // This is very very very dependent on the page structure.  Unfortunately, I don't
            // see a clear way to obtain the movie name.  I tried using the title but Nexflix does not
            // like the year in parenthesis.
            var movieName = getMovieNameFromIMDbTitle();
            if (movieName)
            {
                var allElements, thisElement;
                allElements = document.evaluate(
                    '//h1/span',
                    document,
                     null,
                     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                     null);
                yearElement = allElements.snapshotItem(0);
                
                var linkNode = makeZipLink(movieName);
                yearElement.parentNode.insertBefore(linkNode,yearElement.nextSibling);
            }
        }


        if (location.href.indexOf('zip.ca')>=0)
        {
            var allElements, thisElement; 
            allElements = document.evaluate( 
               '//span[@id="lblOverviewTitle"]', 
               document, 
               null, 
               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
               null); 
            titleElement = allElements.snapshotItem(0); 
            newElement = makeIMDbLink(getMovieNameFromZipTitle()); 
            titleElement.parentNode.insertBefore(newElement,titleElement.nextSibling); 
  
            
            // fix up links to remove javascript sillyness
            links = document.evaluate(
                "//a[contains(@href, 'javascript:openPopWindow')]",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);
            for (var i = 0; i < links.snapshotLength; i++) {
                a = links.snapshotItem(i);
                var indstart = a.href.indexOf('~http');
                var indend = a.href.indexOf("','");
                if (indstart > 0 && indend > indstart)
                {
                    a.href = a.href.substring(indstart+1,indend);
                }
            }
            
        }

    }
    
    insertLinks();

    
})();
