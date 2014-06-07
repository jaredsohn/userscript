// ==UserScript==

// @name           Better-tabs 2.0

// @description    Redoes the tabs in the RT header

// @include        http://roosterteeth.com/*
// @include        http://redvsblue.com/*
// @include        http://achievementhunter.com/*
// @include        http://grifball.com/*
// @include        http://roosterteethcomics.com/*

// ==/UserScript==

(function()
{
	//Define what you want each tab to do and look like.
	//There are two variables that change each tab.
	//Text variables change the displayed text. Be aware of text length and tab size.
	//Link variables change the address the tab links to. Any valid address is fine.
	
	//Leaving the Link variable blank will set the tab to it's default
	
	//Each drop-down selection has been listed with only the main tab marked with the default name, then the sub-tabs listed in order.
	//There are currently 49 tabs, numbered 0-48. If more are added, the script will need updating.
    
    //The Title and TLink variables change header title and link in the same way as the regular tabs.

	var Text = [];
	var Link = [];
    var Title = [];
    var TLink = [];

    //Logo - 5 Tabs
    Text[0] = "";
    Link[0] = "";

    Text[1] = "";
    Link[1] = "";

    Text[2] = "";
    Link[2] = "";

    Text[3] = "";
    Link[3] = "";

    Text[4] = "";
    Link[4] = "";
    
    //News - Header
    Title[0] = "Web";
    TLink[0] = "http://www.google.com";
        
    //News - 4 Tabs
    Text[5] = "Scienceblogs";
    Link[5] = "http://scienceblogs.com/channel/24-hours/";

    Text[6] = "Boing Boing";
    Link[6] = "http://www.boingboing.net/";

    Text[7] = "Lifehacker";
    Link[7] = "http://lifehacker.com/";

    Text[8] = "XMarks";
    Link[8] = "https://my.xmarks.com/";

    //Store - Header
    Title[1] = "Forum";
    TLink[1] = "http://redvsblue.com/forum";

    //Store - 12 Tabs
    Text[9] = "P&CE";
    Link[9] = "http://redvsblue.com/forum/forum.php?fid=14";

    Text[10] = "P&T";
    Link[10] = "http://redvsblue.com/forum/forum.php?fid=38";

    Text[11] = "Music";
    Link[11] = "http://redvsblue.com/forum/forum.php?fid=4";

    Text[12] = "Books";
    Link[12] = "http://redvsblue.com/forum/forum.php?fid=15";

    Text[13] = "Website";
    Link[13] = "http://redvsblue.com/forum/forum.php?fid=8";

    Text[14] = "Technical";
    Link[14] = "http://redvsblue.com/forum/forum.php?fid=11";
        
    Text[15] = "RTSE";
    Link[15] = "http://redvsblue.com/forum/viewTopic.php?id=2184252&page=9999";

    Text[16] = "P&CE BAR";
    Link[16] = "http://redvsblue.com/forum/viewTopic.php?id=2223848&page=9999";

    Text[17] = "P&CE Blog";
    Link[17] = "http://redvsblue.com/forum/viewTopic.php?id=2186795&page=9999";
    
    Text[18] = "Science";
    Link[18] = "http://redvsblue.com/forum/viewTopic.php?id=2196182&page=9999";
    
    Text[19] = "Brits";
    Link[19] = "http://redvsblue.com/forum/viewTopic.php?id=2221023&page=9999";

    //This last line is not bold by default. Use <b></b> tags to make it fit with the others.
    Text[20] = "<b>Clear New</b>";
    Link[20] = "http://redvsblue.com/forum/clearNew.php?return=%2Fforum%2F";

    //Videos - Header
    Title[2] = "P&CE Group";
    TLink[2] = "http://redvsblue.com/groups/forum/?id=10117";

    //Videos - 8 Tabs
    Text[21] = "";
    Link[21] = "";

    Text[22] = "";
    Link[22] = "";

    Text[23] = "";
    Link[23] = "";

    Text[24] = "";
    Link[24] = "";
        
    Text[25] = "";
    Link[25] = "";
        
    Text[26] = "";
    Link[26] = "";
    
    Text[27] = "";
    Link[27] = "";
 
    //This last line is not bold by default. Use <b></b> tags to make it fit with the others.
    Text[28] = "";
    Link[28] = "";

    //Comics - Header
    Title[3] = "";
    TLink[3] = "";

    //Comics - 2 Tabs
    Text[29] = "";
    Link[29] = "";
    
    Text[30] = "";
    Link[30] = "";
    
    //Podcasts  - Header
    Title[4] = "";
    TLink[4] = "";
    
    Text[31] = "";
    Link[31] = "";
   
    Text[32] = "";
    Link[32] = "";

    //Games - Header
    Title[5] = "";
    TLink[5] = "";

    //Games - 7 Tabs
    Text[33] = "";
    Link[33] = "";

    Text[34] = "";
    Link[34] = "";

    Text[35] = "";
    Link[35] = "";

    Text[36] = "";
    Link[36] = "";

    Text[37] = "";
    Link[37] = "";

    Text[38] = "";
    Link[38] = "";
    
    Text[39] = "";
    Link[39] = "";

    //Members - Header
    Title[6] = "Profile";
    TLink[6] = "http://redvsblue.com/members/index.php";

    //Members - 8 Tabs
    Text[40] = "Edit Profile";
    Link[40] = "http://redvsblue.com/members/editProfile.php";

    Text[41] = "Friends Journals";
    Link[41] = "http://redvsblue.com/members/journal/friendsJournals.php";

    Text[42] = "Journal";
    Link[42] = "http://redvsblue.com/members/journal/";

    Text[43] = "Mod History";
    Link[43] = "http://redvsblue.com/members/modHistory.php";

    Text[44] = "Messages";
    Link[44] = "http://redvsblue.com/members/messaging/";
    
    Text[45] = "Log";
    Link[45] = "http://redvsblue.com/members/log.php";
    
    Text[46] = "Comments";
    Link[46] = "http://redvsblue.com/members/comments/";

    //This last line is not bold by default. Use <b></b> tags to make it fit with the others.
    Text[47] = "<b>Stats</b>";
    Link[47] = "http://redvsblue.com/members/stats/myStats.php";


		//IGNORE EVERYTHING BELOW THIS POINT


    var Tabs = [];
	    
	Tabs[0] = document.getElementById("navDivSites").getElementsByTagName("a");
    Tabs[1] = document.getElementById("navDiv1").getElementsByTagName("a");
	Tabs[2] = document.getElementById("navDiv2").getElementsByTagName("a");
	Tabs[3] = document.getElementById("navDiv3").getElementsByTagName("a");
	Tabs[4] = document.getElementById("navDiv4").getElementsByTagName("a");
	Tabs[5] = document.getElementById("navDiv9").getElementsByTagName("a");
	Tabs[6] = document.getElementById("navDiv6").getElementsByTagName("a");
	Tabs[7] = document.getElementById("navDiv7").getElementsByTagName("a");
    
    var Header = [];
    
    Header[0] = document.getElementById("navButton1");
    Header[1] = document.getElementById("navButton2");
    Header[2] = document.getElementById("navButton3");
    Header[3] = document.getElementById("navButton4");
    Header[4] = document.getElementById("navButton9");
    Header[5] = document.getElementById("navButton6");
    Header[6] = document.getElementById("navButton7");

    var a = 0;
    
	for(i in Tabs)
	{
        for (j in Tabs[i])
        {
            if(Link[a] != "")
			
            {
                Tabs[i][j].href = Link[a];
			
                Tabs[i][j].innerHTML = Text[a];
            
                
            }
            a++
		}
	}
    
    
    for(k in Header)
    {
        if(TLink[k] != "")
        {
            Header[k].href = TLink[k];
            
            Header[k].innerHTML = Title[k];
        }
    }

})();