// ==UserScript==
// @name        Facebook Feed Filter
// @namespace   SadiqK
// @description Allows users to filter the newsfeed on facebook's home page by keyword
// @include     http*://www.facebook.com/
// @include     http*://www.facebook.com/?ref=*
// @version     1.1.2
// @grant       none
// ==/UserScript==

(function(){

    var feed, display1, display2;
    
    // Find the facebook page container
    var globalContainer = document.getElementById("globalContainer");
    // Fetch new status updates on the page every second
    setInterval(function(){feed=document.getElementsByClassName("_8ru")}, 1000);
    // Filter the news feed every second
    setInterval(filter, 1000);
    
    // Create and style the main container
    var filterContainer = document.createElement("div");
    filterContainer.style.margin = "10px 12px 0 12px";
    filterContainer.style.padding = "10px";
    filterContainer.style.border = "1px dashed #999";
    filterContainer.style.backgroundColor = "rgb(223, 224, 227)";
    
    // Create and style the inner container
    var innerFilterContainer = document.createElement("div");
    innerFilterContainer.name = "innerFilterContainer";
    innerFilterContainer.className = "clearfix";
    
    // Create and style the text box where the user inputs the keyword(s)
    var keywordInput = document.createElement("input");
    keywordInput.type = "input";
    keywordInput.name = "keywordInput";
    keywordInput.className = "textInput";
    keywordInput.placeholder = "Start typing the keyword(s) to filter your news feed...";
    keywordInput.style.height = "20px";
    keywordInput.style.width = "300px";
    keywordInput.oninput = filter;
    
    // Create the dropdown menu for filtering options
    var filterType = document.createElement("select");
    filterType.style.height = "25px";
    filterType.className = "uiSelectorButton";
    var onlyInclude = document.createElement("option");
    onlyInclude.value = "include";
    onlyInclude.innerHTML = "Only Include";
    var dontInclude = document.createElement("option");
    dontInclude.value = "dontinclude";
    dontInclude.innerHTML = "Don't Include";
    filterType.appendChild(onlyInclude);
    filterType.appendChild(dontInclude);
    
    // Link to display info
    var infoButton = document.createElement("a");
    infoButton.className = "rfloat";
    infoButton.onclick = function() { window.alert("Start typing a keyword in the textbox and your news feed will be filtered automatically.\nChoose from the menu whether you want to see only posts that include the keywords or only posts that don't!")};
    infoButton.innerHTML = "Help?";
    
    // Put stuff inside stuff
    innerFilterContainer.appendChild(keywordInput);
    innerFilterContainer.appendChild(filterType);
    innerFilterContainer.appendChild(infoButton);
    filterContainer.appendChild(innerFilterContainer);
    globalContainer.insertBefore(filterContainer, globalContainer.firstChild);
    
    // The filter function where the magic happens
    function filter(){
        if(keywordInput.value == ''  || keywordInput.value == keywordInput.placeholder){
            for (var i = 0; i < feed.length; ++i){
    			feed[i].style.display = 'block';
            }
        } else {
            if(filterType.value == "include"){
                display1 = 'none';
                display2 = 'block';
            } else {
                display2 = 'none';
                display1 = 'block';
            }
            // Black magic
            for (var i = 0; i < feed.length; ++i){
                var text = feed[i].textContent.toLowerCase(), val = keywordInput.value.toLowerCase();
    			feed[i].style.display = text.indexOf(val) === -1 ? display1 : display2;
            }
        }
    }
   
})();