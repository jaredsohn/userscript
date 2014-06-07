// ==UserScript== 
// @name           Recon Garage Links 
// @namespace      LFTO@kwierso.com 
// @include        http://*.roosterteeth.com/forum/viewTopic.php?id=2213737&*
// @include        http://*.roosterteeth.com/forum/viewTopic.php?id=2213737
// @include        http://*.roosterteeth.com/editMe.php?a=forumPosts&i=*&return=*2213737*
// ==/UserScript== 

(function() { 
    try { 
        var postRow = document.getElementById("Post").getElementsByTagName("tr")[1]; 
    } catch (e) { 
        var postRow = document.getElementById("Edit Post").getElementsByTagName("tr")[1]; 
    } 
    var postBox = document.getElementsByTagName("textarea")[0]; 
    var buttoncell = document.createElement("td"); 
    buttoncell.vAlign = "bottom"; 
    buttoncell.appendChild(document.createTextNode(" [ ")); 
    
    var button = document.createElement("a"); 
    button.addEventListener("click", function () { 
        postBox.value += "[link=http://rvb.roosterteeth.com/groups/news/?id=2232]Daily News[/link]\n" + 
        "[link=http://rvb.roosterteeth.com/groups/profile.php?id=2232]Recon Thread Garage[/link]\n" + 
        "[link=http://rvb.roosterteeth.com/groups/profile.php?id=3146]NATO of BvR.[/link]\n\n"; 
        postBox.focus(); 
    }, false); 
    
    button.className = "small"; 
    button.innerHTML = "Group Buttons"; 
    button.title = "Click Here to Paste Group Links!"; 
    buttoncell.appendChild(button); 
    buttoncell.appendChild(document.createTextNode(" ] ")); 
    postRow.insertBefore(buttoncell, postRow.childNodes[2]); 
})();
