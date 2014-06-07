// ==UserScript==
// @name           Search Youku
// @namespace      video.baidu.com
// @description    只搜索优酷的视频 for 百度视频搜索
// @include        http://video.baidu.com/*
// @version        1.5
// ==/UserScript==

// Index of new added button
var newBtnIndex = 0;

// Remove the ads
var resultsSpan = document.getElementById("results"); // Get the result div
if(resultsSpan) {
    var resultsChildren = resultsSpan.childNodes; // Get the children
    if(resultsSpan.childNodes && resultsChildren.length > 0)
    {
        // Loop the children
        for(var i=0; i<resultsChildren.length; i++)
        {
            // The first div is for ads
            if(resultsChildren[i].nodeType == 1 && resultsChildren[i].tagName == "DIV" && resultsChildren[i].className.indexOf("brand-ad") >= 0) // 1= Node.ELEMENT_NODE
            {
                resultsSpan.removeChild(resultsChildren[i]);
                break;
            }
        }
    }
}

// Get the default submit button
var submitButton = document.getElementById("su");
if(submitButton) {
    // Add the new submit button
    submitButton.parentNode.style.width = "220px";
    submitButton.parentNode.style.background = "transparent";
    submitButton.parentNode.appendChild(createNewYoukuButton(newBtnIndex++));

    // Add submit hanlder for the default submit button, 
    //  when click the default submit button search everywhere
    submitButton.addEventListener("click", function(){
        // Replace keywords
        replaceKeywords();
        
        return true;
    }, false);
}

// Get other submit buttons
var defaultSubmitButtons = getElementX(
    "input",
    {
        type: 'submit',
        className: 's_btn'
    }
);
// Make the keywords
for(var i=0; i<defaultSubmitButtons.length; i++) {
    // Add the new submit button
    defaultSubmitButtons[i].parentNode.style.width = "220px";
    defaultSubmitButtons[i].parentNode.style.background = "transparent";
    defaultSubmitButtons[i].parentNode.appendChild(createNewYoukuButton(newBtnIndex++));

    // Add submit hanlder for the default submit button, 
    //  when click the default submit button search everywhere
    defaultSubmitButtons[i].addEventListener("click", function(){
        // Replace keywords
        replaceKeywords();
        
        return true;
    }, false);
}

// Create a new youku search button
function createNewYoukuButton(guid) {
    // Create new submit button
    var youkuSubmitButton = document.createElement("input");
        youkuSubmitButton.id = "syouku" + guid;
        youkuSubmitButton.value = "我只看优酷";
        youkuSubmitButton.type = "submit";
        youkuSubmitButton.className="s_btn btn";
        youkuSubmitButton.style.marginLeft = "10px";
        youkuSubmitButton.setAttribute("onmouseout", "javascript:this.className='btn';");
        youkuSubmitButton.setAttribute("onmousedown", "javascript:this.className='btn btn_h';");
    
    // Add submit hanlder for the new submit button
    youkuSubmitButton.addEventListener("click", function(){
        // Replace keywords
        replaceKeywords(true);
        
        return true;
    }, false);
    
    return youkuSubmitButton;
}

// Replace keywords
// toAdd: add "site:youku.com" ?
function replaceKeywords(toAdd) {
    // Get current keywords by ID
    var o = document.getElementById("ww") || document.getElementById("kw");
    
    // Make the keywords
    var s = o.value;
    if(toAdd) {
        if(s.indexOf("site:youku.com") < 0) {
            o.value += " site:youku.com";
        }
    } else {
        if(s.indexOf(" site:youku.com") >= 0) {
            o.value = s.replace(/ site:youku\.com/i, "");
        }
    }
    
    // Get current keywords by tag name
    var keywordsInputs = getElementX(
        "input",
        {
            type: 'text',
            name: 'word'
        }
    );
    
    // Make the keywords
    for(var i=0; i<keywordsInputs.length; i++) {
        var ki = keywordsInputs[i];
        
        // Make the keywords
        var s = ki.value;
        if(toAdd) {
            if(s.indexOf("site:youku.com") < 0) {
                ki.value += " site:youku.com";
            }
        } else {
            if(s.indexOf(" site:youku.com") >= 0) {
                ki.value = s.replace(/ site:youku\.com/i, "");
            }
        }
    }
}


/* Common Functions */

// xpath function
// allButtons = xpath("//input[normalize-space(@class)='s_btn']");
// alert(allButtons.snapshotLength);
function xpath(query) {
    return document.evaluate(
        query, 
        document, 
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
        null
    );
}

// Get element by tagName and properties
function getElementX(tag, props) {
    // Check tag name
    if(!tag) return;
    
    // Get elments by tag name
    var els = document.getElementsByTagName(tag);
    
    // No props setted
    if(!props) return els;
    
    // Get right elments
    var results = new Array();
    for(var i=0; i<els.length; i++) {
        var rightEl = true;
        for(s in props) {
            if(els[i][s] != props[s]) {
                rightEl = false;
                break;
            }
        }
        
        if(rightEl) results.push(els[i]);
    }
    
    return results;
}
