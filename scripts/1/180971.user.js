// ==UserScript==
// @name        hukd-display-version-adapter
// @namespace   http://www.hotukdeals.com
// @description This script adapts the display of the new header and price on listing page on HUKD to old skin
// @version     1.0.2
// @include     /^http(s)?://www\.hotukdeals\.com/.*$/
// @grant       none
// ==/UserScript==

function reConstructTopicsList(){

    var filterLabel, newListItem;
    var topicsDropdown = document.getElementById("topics-dropdown");
    var topicsList = document.getElementById("t-content");
    var topicsListChildNodes = topicsList.childNodes;
    
    var sortTabs = document.getElementsByClassName("s-tabs-new")[0];
    var currentTopicSpan = document.getElementById("t-link");
    
    var topicsArray = new Array("All Topics", 
                                "Customised Settings", 
                                "Audiovisual", 
                                "Mobiles", 
                                "Computers", 
                                "Entertainment", 
                                "Home",
                                "Fashion",
                                "Kids",
                                "Groceries",
                                "Travel",
                                "Restaurants");
    
    var newTopicsLists = document.createElement("ul");
    var newCurrentTopicSpan = document.createElement("span");

    if(sortTabs && topicsDropdown && currentTopicSpan){
       
       for(var i=0; i < topicsArray.length; i++){
            
            if(topicsArray[i] == currentTopicSpan.textContent){
                
                newListItem = document.createElement("li");
                
                newListItem.setAttribute("class", "current-topic");
                newListItem.appendChild(createTopicLink(currentTopicSpan.getAttribute("href"), 
                                        currentTopicSpan.textContent,
                                        currentTopicSpan.getAttribute("title")));
            }else{
                
                for(var j=0; j < topicsListChildNodes.length; j++){
                    
                    var listLink = topicsListChildNodes[j].getElementsByTagName("a")[0];
                    
                    if(topicsArray[i] == listLink.textContent){
                       
                       newListItem = document.createElement("li");
                       
                       newListItem.appendChild(createTopicLink(listLink.getAttribute("href"), 
                                        listLink.textContent,
                                        listLink.getAttribute("title")));
                        break;
                    }
                }
            }
            
            newTopicsLists.appendChild(newListItem);
       }
       
       newTopicsLists.setAttribute("id", "t-content-reconstructed");

       filterLabel = topicsDropdown.previousSibling;
       
       if(filterLabel && newCurrentTopicSpan){
            newCurrentTopicSpan.textContent = currentTopicSpan.textContent;
            filterLabel.appendChild(newCurrentTopicSpan);
       }
       
       topicsDropdown.removeChild(currentTopicSpan);
       topicsDropdown.removeChild(topicsList);
       topicsDropdown.setAttribute("id", "topics-dropdown-reconstructed");
       
       topicsDropdown.appendChild(newTopicsLists);
              
       sortTabs.parentNode.insertBefore(topicsDropdown, sortTabs);
    }    
}

function createTopicLink(hrefText, contentText, title){
    var topicLink = document.createElement("a");
    
    topicLink.setAttribute("href", hrefText);
    topicLink.setAttribute("title", title);
    topicLink.textContent = contentText;
    
    return topicLink;
}

function addPriceElementToDeaLink(){

    var threadWrappers = document.getElementsByClassName('thread-wrapper');
    
    if(threadWrappers.length > 0){
        
        for(var i = 0; i < threadWrappers.length; i++){
            
            var priceSpan, newPriceSpan, dealLinkDiv, gotoDealAnchor;
            
            priceSpan = threadWrappers[i].getElementsByClassName('price')[0];
            
            if(priceSpan){
                newPriceSpan = document.createElement('span');
                newPriceSpan.textContent = priceSpan.textContent;
                newPriceSpan.setAttribute('class', 'price-reconstructed');
                
                dealLinkDiv = threadWrappers[i].getElementsByClassName('deal-links')[0];
                gotoDealAnchor = threadWrappers[i].getElementsByClassName('external-button')[0];
                
                if(newPriceSpan && dealLinkDiv && gotoDealAnchor){
                
                    dealLinkDiv.insertBefore(newPriceSpan, gotoDealAnchor);
                }
            }
            
        }
    }
}

function addCustomCss(cssString){
    
    var headTag = document.getElementsByTagName("head")[0];
    
    if(!headTag){
        return false;
    }
    
    var cssStyle = document.createElement('style');
    
    cssStyle.type = "text/css";
    cssStyle.innerHTML = cssString;
    
    headTag.appendChild(cssStyle);
    
}

function customizeMyHukdDisplay(){

    addCustomCss(getCustomCss());
    reConstructTopicsList();
    addPriceElementToDeaLink();
}

function getCustomCss(){
    return '#topics-dropdown-reconstructed{padding:7px 10px 7px 9px; clear:both; font-size: 1.10em;}' +
    
    '#t-content-reconstructed{overflow: auto; list-style-type: none; margin:0; padding:0; display:block !important;}' +
    '#t-content-reconstructed li{float: left; padding: 5px 12px;}' +
    '#t-content-reconstructed li a {color: #333230;}' +

    '.s-tabs-new{margin-top: 0 !important;}' +

    '.current-topic a {text-decoration: underline;}' + 
    
    'span.price-reconstructed {display: block; padding: 0 5px 4px; text-align: center; color: #333230; font-size: 1.25em; font-weight:bold;}';
    
}

customizeMyHukdDisplay();