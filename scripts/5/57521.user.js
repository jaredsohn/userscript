// ==UserScript==
// @name           Delicious My Tracks
// @namespace      http://userscripts.org/users/106516
// @include        http://*
// ==/UserScript==

var TAG_POPULAR = true;         //add popular tags
var TAG_RECOMMENDED = true;     //add recommended tags
var SHARED = false;             //share post if true, make private if false
var REPLACE = false;            //replace post if given url has already been posted
var DEFAULT_TAGS = 'autopost';  //default tags, separate with spaces
var DEBUG = false;              //display alerts for debugging
	
if (! GM_xmlhttpRequest) 
{
    return;
}

document.addEventListener('click', function(e) {
    
    var theTarget = e.target;
    var resultUrl;
    var title;
    var tags;
    var validResultClick = false;
    var protocol = window.location.protocol + "//";
    var preUrl = protocol + window.location.host;
    
    if(DEBUG){ alert('Click detected.'); }
    theTarget.setAttribute("accessKey", "1");
    
    if (theTarget.hasAttribute("href"))
    {
        title = theTarget.innerHTML; 
        resultUrl = theTarget.getAttribute("href");		
        validResultClick = true;	
    }
    else if (theTarget.parentNode.hasAttribute("href"))
    {
        title = theTarget.parentNode.innerHTML;
        resultUrl = theTarget.parentNode.getAttribute("href");			
        validResultClick = true;				
    }
    
    if(DEBUG){ alert('Valid link: ' + validResultClick); }
    
    if (validResultClick && resultUrl && resultUrl != null)
    {
        if(resultUrl.indexOf(protocol) < 0){
            if(DEBUG){ alert('Link is relative. Cleaning up.'); }
            resultUrl = preUrl + resultUrl;
        }
        if(title && title != null && title.length > 0){
            if(DEBUG){ alert('Removing html from title'); }
            title = title.replace(/<\/?[^>]+(>|$)/g, "");
        }else{
            if(DEBUG){ alert('No title found. Setting title as url'); }
            title = resultUrl;
        }
        
        var suggestUrl = "https://api.del.icio.us/v1/posts/suggest?";
        suggestUrl += "url=" + resultUrl;
        
        if(TAG_POPULAR || TAG_RECOMMENDED){
            if(DEBUG){ alert('Retrieving tags from delicious at ' + suggestUrl); }
            
            GM_xmlhttpRequest({ method:  "GET",
                url:     suggestUrl,
                headers: {
                    'User-agent':
                    'Mozilla/4.0 (compatible)',
                    'Accept': 'text/xml,application/xml',
                },
                onload: function(response) {
                    if(DEBUG){ alert('Response: ' + response.responseText); }
                    tags = tagsFromXml(response.responseText);
                    
                    postDelicious(resultUrl, title, tags);
            } });
        }else{
            postDelicious(resultUrl, title, '');
        }
                            
    }
}, false);

function postDelicious(resultUrl, title, tags){
    var addUrl = "https://api.del.icio.us/v1/posts/add?";
    addUrl += "url=" + resultUrl;
    if(!SHARED) {addUrl += "&shared=no";}
    if(!REPLACE) {addUrl += "&replace=no";}
    addUrl += "&description=" + encodeURIComponent(title);
    addUrl += "&tags=" + encodeURIComponent(DEFAULT_TAGS + ' ' + tags);
    
    if(DEBUG){ alert('Posting to delicious at ' + addUrl); }
    
    GM_xmlhttpRequest({ method:  "GET",
        url:     addUrl,
        headers: {
            'User-agent':
            'Mozilla/4.0 (compatible)',
            'Accept': 'text/xml,application/xml',
        },
        onload: function(response) {
            if(DEBUG){ alert('Response: ' + response.responseText); }
            
            if (response.responseText.indexOf("\"done\"") < 0)
            {
                if(DEBUG){ alert("Not posted"); }
            }else{
                if(DEBUG){ alert("Posted"); }
            }
    } });

}


function tagsFromXml(text){
    try 
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async="false";
        xmlDoc.loadXML(text);
    }
    catch(err)
    {
        parser=new DOMParser();
        xmlDoc=parser.parseFromString(text,"text/xml");
    }
    var tags = "";
    if(xmlDoc){
        var xmlRoot = xmlDoc.documentElement;
        if(xmlRoot){
            for(var i = 0; i < xmlRoot.childNodes.length; i++){
                if(xmlRoot.childNodes[i].tagName){
                    var tagname = xmlRoot.childNodes[i].tagName.toUpperCase();
                    if(tagname == 'POPULAR' || tagname == 'RECOMMENDED'){
                        if(xmlRoot.childNodes[i].textContent){
                            tags += xmlRoot.childNodes[i].textContent + ' ';
                        }
                    }
                }
            } 
        }  
    }
    return tags;
}
