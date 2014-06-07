// ==UserScript==
// @name        MaximumPC Troll Remover
// @namespace   maximumpc.jerkoffs
// @description Remove trolls from comments to articles posted on www.maximumpc.com
// @include     http://www.maximumpc.com/*
// @require     http://code.jquery.com/jquery-latest.js
// @version     1.0.2
// @grant       none
// ==/UserScript==

$(function () {
    var joList = ["maxeeemum",
                  "RUSENSITIVESWEETNESS",
                 ];
    
    var joLength = joList.length;
    
    var thisJo, userName, ref;
    
    for(var i=0; i<joLength; i++)
    {
        thisJo = encodeURIComponent(joList[i].replace('.', '')   // Periods in usernames are allowed but are not stored
                                             .replace(' ', '_')) // Spaces in usernames are replaced with underscores 
                                   .toLowerCase();               // The MPC site stores most usernames in all lower case
                                    
        joList[i] = thisJo;
    }
    
    $('a[title="View user profile."]').each(function(index, value) 
    {
        ref = this.href;
        
        // Non-ASCII chars are URI encoded (hex, upper case), so convert userName to lower
        userName = ref.substring(ref.lastIndexOf("/") + 1)
                                    .toLowerCase();
        
        for(var i=0; i<joLength; i++) 
        {
            if(userName == joList[i])
            {
                $(this).closest('div.comment-published').detach();
                break;
            }
        }
     });
});