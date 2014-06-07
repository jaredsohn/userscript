// ==UserScript==
// @name       Global reddit No Participation
// @namespace  http://www.doctormckay.com/
// @version    1.1.0
// @description  Enforces No Participation on reddit globally, even if the subreddit doesn't support it
// @match      *://np.reddit.com/*
// @include    *://np.reddit.com/*
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function() {
    var arrows = document.getElementsByClassName('arrow');
    for(var i = 0; i < arrows.length; i++) {
        arrows[i].style.visibility = 'hidden';
    }
    
    var removeParents = document.querySelectorAll('.report-button, a[onclick*="return reply(this)"]');
    for(var i = 0; i < removeParents.length; i++) {
        removeParents[i].parentNode.style.display = 'none';
    }
    
    var remove = document.querySelectorAll('.usertext-edit, .sidebox.submit, .commentingAs, .markdownEditor, .subButtons, .helplink, .titlebox .fancy-toggle-button.toggle > .option.add');
    for(var i = 0; i < remove.length; i++) {
        remove[i].style.display = 'none';
    }
    
    var headerLinks = document.querySelectorAll('#header a');
    for(var i = 0; i < headerLinks.length; i++) {
        headerLinks[i].href = headerLinks[i].href.replace("http://np.reddit.com", "https://pay.reddit.com").replace("https://np.reddit.com", "https://pay.reddit.com");
    }
    
    document.title = "[NP] " + document.title;
});