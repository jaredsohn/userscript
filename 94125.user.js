// ==UserScript==
// @name           Mr. Beer BOM flag
// @namespace      http://www.ludoholic.com/greasemonkey
// @description    A helper script for the Mr. Beer community forum to highlight the Brewer's of the Month
// @include        http://community.mrbeer.com/*
//
// Author: Ed Mittelstedt, email: bugladen !at! GMail
//
// Change Log:
//     Apr.10.2012: 
//		* Added BOM Master List link to the badge
//
//     Apr.09.2012: 
//		* Updated code for new site
//		* Added BOM to profile page
// ==/UserScript==

    
    //Are we in a forum view page
    var inForumView = window.location.href.indexOf("/forum/") != -1;
	var inProfileView = window.location.href.indexOf("/forum/profile") != -1;

    if (inForumView || inProfileView)
    {
        // Inject BOM array into the DOM
        var GM_Array = document.createElement('script');
        GM_Array.src = 'http://www.ludoholic.com/greasemonkey/mrbeer.bom.array.js';
        GM_Array.type = 'text/javascript';

        var GM_JQ = document.createElement('script');
        GM_JQ.src = 'http://code.jquery.com/jquery-latest.js';
        GM_JQ.type = 'text/javascript';

        //document.getElementsByTagName('head')[0].appendChild(GM_Array);
        document.body.appendChild(GM_Array);
        document.body.appendChild(GM_JQ);
		
        waitForScriptsLoad();
    }



    // Check if jQuery's and overlib is loaded.  If not, wait and check again
    function waitForScriptsLoad() 
    {
        var scriptWindow = (typeof unsafeWindow == "undefined" ? window : unsafeWindow);
        
        if (typeof scriptWindow.jQuery == 'undefined' || typeof(scriptWindow.nameArray) == 'undefined') 
            window.setTimeout(waitForScriptsLoad,100); 
        else 
        {
            $ = scriptWindow.jQuery; 

            //Call the main function depending on the page we are in
			if (inProfileView)
                ProfileView();
            else if (inForumView)
                ForumView();
        }
    }



    function ProfileView()
    {
        var found = false;

        var scriptWindow = (typeof unsafeWindow == "undefined" ? window : unsafeWindow);
        var nameArray = scriptWindow.nameArray;
        var monthArray = scriptWindow.monthArray;
        var linkArray = scriptWindow.linkArray;

		//Get span that contains user name
        var userNameElement = $("span.k-name");
		var userName = $.trim(userNameElement.text());
		
		//Split out the username from the parens
		var index = userName.indexOf('(');
		userName = userName.substring(index+1);
		userName = userName.substring(0, userName.length-1);

		//Get div that makes up left profile window
        var section = $("#kprofile-stats");

		found = false;
		for ( i in nameArray )
		{
			if (nameArray[i] == userName)
			{
				found = true;
				break;
			}
		}

		//We have found a BOM!
		if (found)
		{
			var div = "&nbsp;<br>&nbsp;<br><div style='font-weight:bold; text-align:center'>&nbsp;<br><img src='http://www.ludoholic.com/greasemonkey/bom.image.php?bom=" + userName + "'/><br>Brewer of the Month<br><a target='_blank' href='" + linkArray[i] + "'>" + monthArray[i] + "</a><br>&nbsp;<br><a target='_blank' href='http://bit.ly/jnfb28'>BOM Master List</a></div>";
			section.append(div);
		}
	}
	
	

    function ForumView()
    {
        var found = false;

        var scriptWindow = (typeof unsafeWindow == "undefined" ? window : unsafeWindow);
        var nameArray = scriptWindow.nameArray;
        var monthArray = scriptWindow.monthArray;
        var linkArray = scriptWindow.linkArray;

        //Get the list of divs that make up the profile panel for each post
		//Get  table that makes up each message
        $(".kmsg").each(function()
        {
            var profileList = $("ul", this);
            var userNameElement = $("li[.kpost-username] a", this);
            var userName = $.trim(userNameElement.text());

            found = false;
            for ( i in nameArray )
            {
                if (nameArray[i] == userName)
                {
                    found = true;
                    break;
                }
            }

            //We have found a BOM!
            if (found)
            {
                var div = "<li>&nbsp;<br>&nbsp;<br></li><li style='font-weight:bold;'>&nbsp;<br><img src='http://www.ludoholic.com/greasemonkey/bom.image.php?bom=" + userName + "'/><br>Brewer of the Month<br><a target='_blank' href='" + linkArray[i] + "'>" + monthArray[i] + "</a><br>&nbsp;<br><a target='_blank' href='http://bit.ly/jnfb28'>BOM Master List</a></li>";
                profileList.append(div);
            }
        });
    }
