// ==UserScript==
// @name           Torn Brick Buyer
// @namespace      *torn.com*
// @description    Torn Brick Buyer
// @include        *torn.com/*.php*bitsnbobs*
// @include        *torn.com/holder.php*
// ==/UserScript==

var x = 0;

// First make sure the user is at Bits 'n' Bobs
if(window.content.location.href.indexOf("bitsnbobs") > 0) {
    // Get all the images on the page in an array
    var allImages = document.getElementsByTagName("img");
    
    // Loop through the images and check for the brick image
    for(var i = 0, il = allImages.length; i < il; i++) {
        element = allImages[i];
        var src = element.getAttribute("src");

        // If there is a brick image, get the amount in stock
        if(x == 0) {
            if(src.indexOf("394.jpg") > 0) {
                var stock = document.getElementById("itemstock241").textContent;
            
                // If there is at least 100 bricks in stock, prompt to buy
                var amount = stock.replace(/\D/g, "");
                if(amount >= 100) {
                    var answer = confirm("Would you like to buy 100 bricks?");
                    if(answer) {
                        window.content.location.href = "http://www.torn.com/holder.php?case=buyItem&ID=394&action=confirm2&jsoff=none&ID2=&value=";
                    }
                }
                x++;
            }
        }
    }
    
}

// If 'confirm3' is in the URL, do not run again since we already bought bricks
else if(window.content.location.href.indexOf("confirm3") < 0) {
    
    // Get all the input elements in an array
    var allInput = document.getElementsByTagName("input");
  
    // Loop over the input elements to get the ID2 value
    for(var i = 0, il = allInput.length; i < il; i++) {
        element = allInput[i];
        var name = element.getAttribute("name");
		
        if(name == "ID2") {
            var ID2 = element.getAttribute("value");
        }
    }
    
    // Using the ID2 value, buy 100 bricks
    window.content.location.href = "http://www.torn.com/holder.php?case=buyItem&ID=394&action=confirm3&jsoff=none&ID2=" + ID2 + "&amount394=100";
}