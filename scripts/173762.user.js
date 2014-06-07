// ==UserScript==
// @name          gdi UnUnregistered
// @description	  Removes posts made by unregistered users from gdi.
// @version       0.2
// @include       http://facepunch.com/*
// @include       https://facepunch.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

gdiUnregPosts = [];
gdiUnregContent = [];

unsafeWindow.gdiShowUnregPost = function(i)
{
    $(gdiUnregPosts[i]).html(gdiUnregContent[i]);
}

function gdiCleanup()
{
    var gdi = ($("span.navbit:contains('Disruption')")[0] !== undefined || $("div[id='lastelement']:contains('Disruption')")[0] !== undefined)
    
    if (gdi)
    {
        // Posts
        if (document.getElementsByClassName("posts")[0] !== undefined)
        {
            $("span.usertitle:contains('Guest')").closest($("li.postbitim")).each(function(i)
                                                                                  {
                                                                                      var pBody = $(this).children("div.postdetails").children("div.postbody")[0];
                                                                                      gdiUnregPosts[i] = $(pBody)
                                                                                      gdiUnregContent[i] = $(pBody).html();
                                                                                      $(pBody).html('<h2 class="title">This message is hidden because the user is unregistered.</h2><br /><a href="javascript:void(0)" onclick="return gdiShowUnregPost(' + i + ');">View Post</a>');
                                                                                  });
        }
    }
}

window.addEventListener ("load", gdiCleanup, false);