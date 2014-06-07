// ==UserScript==
// @name           TipTopLolz Overlay Remover
// @description    Removes the annoying http://www.tiptoplolz.com signup overlay!
// @author         Cosmin Parvulescu
// @match          http://tiptoplolz.*
// @match          http://*.tiptoplolz.*
// @version        0.3
// ==/UserScript==


function removeAll() {
    // Remove the signup popup
    var popup = document.getElementById("signUpPhoto");
    var background = document.getElementById("cover");
    
    popup.style.visibility = 'hidden';
    background.style.visibility = 'hidden';
    popup.parentNode.removeChild(popup);
    background.parentNode.removeChild(background);
    
    // They changed the site structure so this is obsolete
    /**
    // Get all the left divs and mark the important ones [i.e. picture, comments, navigation]
    var divs = document.getElementsByTagName("div");
    var importantDivs = [5, 8, 14, 15, 9, 12, 10, 11, 13, 23, 24, 25, 27, 26];
    
    // Loop and delete unimportant divs
    for(var i = 0; i < divs.length; i++) {       
        var important = false;
        for(var j = 0; j < importantDivs.length; j++) {
            if(i === importantDivs[j]) {
                important = true;
            }
        }
        if(!important) {
            divs[i].style.visibility = 'hidden';
        } else {
            // Stuff happened without this code :D
            divs[i].style.visibility = 'visibile';
        }
    }  
    
    // All the ads are in iFrames in <ins> so all the ins have to be removed
    var inserts = document.getElementsByTagName("ins");
    for(var i = 0; i < inserts.length; i++) {
        inserts[i].style.visibility = 'hidden';
    }
    **/
}

removeAll();