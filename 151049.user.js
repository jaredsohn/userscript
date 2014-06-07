// ==UserScript==
// @name           Ad click
// @version        1.3
// @namespace      Name space ?
// @description    Click ads on google
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @match      http://*.google.*/*
// @match      https://*.google.*/*
// @grant none
// ==/UserScript==
(function(){

// Select the words to look for after you search on google    
    var googleSearch1 = "word_from_link1";
    var googleSearch2 = "word_from_link2";
    
    var foundList = [];
    
    var linkList = $("[href]");
    
    
    
    for (var step=0; step < linkList.length; step++) {
        
        element = linkList[step];
        
        if ($(element).attr('href').indexOf("aclk") != -1) {
            
            
            
            foundList[foundList.length] = $(element);
            
        }
        
        
        
    }
    
    
    
    for (step=0; step<foundList.length; step++) {
        
        console.log(foundList[step].attr('href').toLowerCase());
        
        
        
        if (foundList[step].attr('href').toLowerCase().indexOf(googleSearch1) != -1 || foundList[step].attr('href').toLowerCase().indexOf(googleSearch2) != -1) {
            
            document.location.href = foundList[step].attr('href');
            
        }
        
    }
    
})();
