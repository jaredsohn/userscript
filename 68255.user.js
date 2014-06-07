// ==UserScript==
// @name           Last.fm > Metal Archives 
// @namespace      http://userscripts.org/users/121410
// @description    Creates a small M in front of each artist link on www.last.fm. The M's are linked to perform a band search on www.metal-archives.com
// @version        1.7
// @include        http://www.last.fm*
// @include        http://www.lastfm.*
// @include        http://cn.last.fm*
// ==/UserScript==


function addStyle(css) 
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    try {
        style.innerHTML = css;
    } catch(err) {
        style.innerText = css;
    }
    head.appendChild(style);
}

addStyle('.LMAa { font-size: 70% !important; display: inline}' +
         '.text-over-image-text>.LMAa,.libraryItems .LMAa, .similar-artists li .LMAa {color: #000; padding: 3px; position: absolute; z-index: 99; background: #FFF; border: 1px solid #000;line-height: 80%}' +
         '.text-over-image-text>.LMAa {right: 2px; top: 2px;}' +
         '.media>.LMAa,.chartbar .LMAa {display:none}'
         );

function parser(doc) 
{   
    //Create a node-list of all a-tags
    var nodeListA = doc.getElementsByTagName('a');
    
    //Regular expression
    //Match /music/ and one or more characters which is not /
    var re = /\/music\/([^/#]+)$/i;
    var id;
    
    //Iterate through the node-list
    for (var i = 0; i < nodeListA.length; i++) { 
        
        //Check if current a-element has childnodes and that the firstchild is not an image
        //If so continue whit next iteration.
        if ((nodeListA[i].className.search(/(LMA|mSend|plays)/) > -1) 
            || (!nodeListA[i].hasChildNodes()) 
            || (nodeListA[i].hasChildNodes() && nodeListA[i].firstChild.nodeName == 'IMG'))
            continue;
        
        //Match the href against the regular expression
        if (id = nodeListA[i].href.match(re)) {
            
            //Use className as a marker
            nodeListA[i].className += ' LMA';
            
            //Create the M
            var nma = doc.createElement('a');
            nma.className = 'LMAa'; 
            nma.innerHTML = 'M ';
            nma.title = 'Search '+id[1]+' on Metal Archives';
            
            nma.href = 'http://www.metal-archives.com/search?type=band_name&searchString='+id[1];
            nma = nodeListA[i].parentNode.insertBefore(nma, nodeListA[i]);
            
            //Since the nodelist is "live".
            i++;
        }
    }
    
    //Init the ticker
    ticker(doc,i);        
}

//Method to check if the document has changed
function ticker(doc,aCount) 
{
    //if there are new a-tags
    if(aCount != doc.getElementsByTagName('a').length) {
        parser(doc);
        return;
    }

    //Call the ticker again
    window.setTimeout(function() {ticker(doc,aCount);}, 1000);
}

parser(document);