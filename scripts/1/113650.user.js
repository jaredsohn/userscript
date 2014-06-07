// ==UserScript==
// @name           Tweet Delete
// @namespace      pigeontech.com
// @include        http://twitter.com/#!/*
// ==/UserScript==

//Check if on your profile

alert("Continue deleting tweets?");
(function() {
    if (document.getElementsByClassName('follow-state')[0].firstElementChild.getAttribute("class") == "thats-you") {
    
        

    //fill up the array and sort out the elements we want
    var n = document.getElementsByClassName('delete-action js-action-del');
    var links = [];
    for (var i = 0; i < n.length; i++) {
        //put it in an array
        links.push(n[i]);
    }
    
    
    //check if we have any tweets
    if (typeof links[0] !== 'undefined' && links[0] !== null) {
        //we have links.  let's click on them.
        console.log("Deleting tweets...");
        var i = 0;
        //we self invoke this function to get it going the intial time
        (function eachLink() {
            if (i < links.length) {
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                var canceled = !links[i].dispatchEvent(evt);
                //click the popup
                var evt2 = document.createEvent("MouseEvents");
                evt2.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                var canceled2 = !document.getElementsByClassName('button js-prompt-ok selected')[i].dispatchEvent(evt2);
                i++;
                //recall this own internal function again.  the i variable is remembered so it won't loop forever.
                setTimeout(eachLink, 1500);
            } else {
                //refresh to load some more
                setTimeout("location.reload(true);", 1000);
            }
        })();
    } else {
        //no tweets
        console.log("Nothing to delete");
    }

} else {
    alert('nope');
}

})();

