// ==UserScript==
// @name         Singletrackworld Personal Blacklist
// @namespace    http://userscripts.org/scripts/show/92336
// @include      http://www.singletrackworld.com/forum/topic/*
// @include      http://singletrackworld.com/forum/topic/*
// @author       thebunk
// @description  Set up a blacklist and either hide their posts or replace with something more pleasing to you.
// ==/UserScript==
function BlockUsers(showAll)
{
    // make sure this is defined as a boolean
    showAll = showAll == true;
    // show the posts at first
    $("[originalpost]").each(function ()
    {
        $(this).html($(this).attr("originalpost")); // show the original post
    });

    // set up user settings
    var storage = window.localStorage;
    // function checks to see if storage exists, otherwise creates default data
    CheckUserData(storage);
    // get the user settings
    var blockedUsers = storage.getItem("STWBlockedUsers").split(",");
    // cant work out storage and boolean types, so frig it
    var redactBlockedUsers = storage.getItem("STWRedactBlockedUsers") == "true"; // replaces the blocked text with something of your choice. If false then you wont even see the fact that they posted
    // text to replace the blocked users post with
    var redactText = storage.getItem("STWRedactText");
    // all posts
    var posts = $(".threadpost");
    // summary data
    var filteredAuthors = new Array();
    filteredAuthors[0] = "None";
    var filteredPostCount = 0;

    // loop through page posts
    $(posts).each(function ()
    {
        // get the author of the post
        var authorName = $(this).find(".threadauthor").find("strong").text();
        // check to see if author is in black list
        if ($.inArray(authorName.toLowerCase(), blockedUsers) > -1)
        {
            // set up the summary info
            if (filteredAuthors[0] == "None")
            {
                filteredAuthors.length = 0;
            }
            // prevent the author appearing more than once in the summary
            if ($.inArray(authorName, filteredAuthors) == -1)
            {
                filteredAuthors[filteredAuthors.length] = authorName;
            }
            filteredPostCount++;

            $(this).find(".post").fadeOut(function () // fadeout the post and replace with whatever
            {
                if ((redactBlockedUsers == true) || (showAll == true))
                {
                    if (showAll)
                    {
                        ShowPost(this);
                    }
                    else
                    {
                        HidePost(this, authorName);
                    }
                }
                else
                {
                    // just murderise the post
                    $(this).parent().parent().fadeOut();
                }
            });
        }
    });
    // set up the summary stuff so that the user can do settings
    var filterDetail;
    if (redactBlockedUsers == true) // 
    {
        filterDetail = "<a href='#' id='redactChange'> Posts Replaced</a>: " + filteredPostCount;
    }
    else
    {
        filterDetail = "<a href='#' id='hiddenChange'> Posts Hidden</a>: " + filteredPostCount;
    }

    var toggleFilter;
    if (showAll)
    {
        toggleFilter = "Apply Filter";
    }
    else
    {
        toggleFilter = "Remove filter for this page";
    }

    $("#filterDetails").remove();
    $(".topicmeta LI:first").html($(".topicmeta LI:first").html() + "<div id='filterDetails'> | " + filterDetail + " | <a id='setBlackList' href='#'>Filtered Authors</a>: " + filteredAuthors + " | <a href='#' id='toggleFiltered'>" + toggleFilter + "</a></div>");

    $("#redactChange").click(function ()
    {
        var changeToBlock = window.confirm("Click OK to completely hide posts from your blacklisted users");
        
        if (changeToBlock == true)
        {
            storage.setItem("STWRedactBlockedUsers", "false");
            BlockUsers();
        }
    });

    $("#hiddenChange").click(function ()
    {
        var changeToRedact = window.confirm("Click OK to replace text from blacklisted users");
        if (changeToRedact == true)
        {
            var redactText = storage.getItem("STWRedactText");
            redactText = window.prompt("Specify the text that you want to see on blacklisted user posts. 'StuartBaggs' will be replaced by the name of the blocked user", redactText);
            storage.setItem("STWRedactText", redactText);
            storage.setItem("STWRedactBlockedUsers", "true");
            BlockUsers();
        }
    });

    $("#setBlackList").click(function ()
    {
        var blockedUsers = storage.getItem("STWBlockedUsers");
        blockedUsers = window.prompt("Specify the usernames that you want blacklisted. Use Commas to separate users.", blockedUsers).split(",");
        var cleanedBlockedUsers = new Array();
        for (var i = 0; i < blockedUsers.length; i++)
        {
            // set to lower case and trim spaces
            cleanedBlockedUsers[cleanedBlockedUsers.length] = $.trim(blockedUsers[i].toLowerCase());
        }

        storage.setItem("STWBlockedUsers", cleanedBlockedUsers);
        BlockUsers();
    });

    $("#toggleFiltered").click(function ()
    {
        BlockUsers(showAll == false);
    });

    function ShowPost(post)
    {
        $(post).html($(post).attr("originalpost")); // show the original post
        $(post).fadeIn("fast"); // fade it back in
        $(post).unbind(); // remove this click event
        $(post).parent().parent().fadeIn();
    }

    function HidePost(post, authorName)
    {
        // store the original post
        $(post).attr("originalpost", $(post).html());
        // replace!
        $(post).html("<p>" + redactText.replace("StuartBaggs", authorName) + "</p>");
        // fade in the redactText
        $(post).fadeIn();
        $(post).parent().parent().fadeIn();
        // allow the user to click the post to view the original post
        $(post).click(function ()
        {
            $(post).fadeOut("fast", function () // fades out the redactText
            {
                $(post).html($(post).attr("originalpost")); // show the original post
                $(post).fadeIn("fast"); // fade it back in
                $(post).unbind(); // remove this click event
            });
        });
    }

    function CheckUserData(storage)
    {
        // create default values if there isnt any storage (on first run)
        if (storage.getItem("STWBlockedUsers") == null)
        {
            storage.setItem("STWBlockedUsers", "StuartBaggs,Fred,Ro");
        }

        if (storage.getItem("STWRedactBlockedUsers") == null)
        {
            storage.setItem("STWRedactBlockedUsers", "true");
        }

        if (storage.getItem("STWRedactText") == null)
        {
            storage.setItem("STWRedactText", "StuartBaggs said something stupid.");
        }
    }
}

// a function that loads jQuery and calls a callback function when jQuery has finished loading, nicked from teh internets
function AddJQuery(callback)
{
    // can't work out how to get greasemonkey scripts to use the current websites jquery...
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    script.addEventListener('load', function ()
    {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}


// load jQuery and execute the main function
AddJQuery(BlockUsers);
