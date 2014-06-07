// ==UserScript==
// @name        Ghost Pepper's TF2R Notification Mod
// @namespace   http://kuai.heliohost.org/tf2r/
// @description Parses the TF2R notification page and spits out some interesting (if not entirely useful) stats!
// @include     http://tf2r.com/notifications.html
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1.3.5
// @grant       none
// ==/UserScript==

$(function() {
    //Count all notifications...
    $.fn.countTF2Rstuff = function()
    {
        var lastWin = "";
        
        //Loop through each notification...
        var returnVar = this.each(function()
        {
            //Nab the contents...
            var contents = $(this).text();

            //Is it a loss?
            if(contents.search(possibles[0]) > -1)
            {
                if(!endStreak)
                    ++lossStreak;

                ++lostCount;
            }
            //Is it a comment?
            else if(contents.search(possibles[1]) > -1)
                ++commentCount;
            //Is it a win?
            else if(contents.search(possibles[2]) > -1)
            {
                var thisWin = $(this).find("a").attr("href")
                
                //If multiple items were won, count the first win and skip the following ones.
				if(lastWin == thisWin)
                	return;
                
                lastWin = thisWin;
                endStreak = 1;
                ++wonCount;
            }
            //Is it one of my raffles?
            else if(contents.search(possibles[3]) > -1)
                ++raffleCount;
            //Is it something else entirely?
            else
                ++huhCount;
        });

        //Can't divide by 0, so make a default value.
        var every = "No Wins";
        
        //If we can calculate an average, do so!
        if(lostCount && wonCount)
            every = Math.round(lostCount / wonCount*100)/100;
        else if(lostCount == 0 && wonCount)
            every = "100% Won"


        //Add the clear button...
        var theButton = $("<input type=\"button\" value=\"Clear All\">").bind("click", function() {
            $.fn.deleteAllPrompt();
        });

        var theThousandButton = $("<input type=\"button\" value=\"Clear (Keep latest 1,000)\">").bind("click", function() {
            $.fn.deleteMostPrompt();
        });

        var theLostButton = $("<input type=\"button\" value=\"Clear Lost\">").bind("click", function() {
            $.fn.deleteLostPrompt();
        });

        //Display the results.
        $(".welcome_font").slice(-1).html(
            "<div align=\"center\"><table cellpadding=\"5\"><tr><td align=\"right\" style=\"color:#00ff00\">Wins:</td><td align=\"left\">" + wonCount + "</td>\n" +
            "<td align=\"right\" style=\"color:#ff0000\">Losses:</td><td align=\"left\">" + lostCount + "</td>\n" +
            "<td align=\"right\" style=\"color:#cccccc\">Average:</td><td align=\"left\">" + every + "</td>\n" +

            "<tr><td align=\"right\" style=\"color:#009900\">Comments:</td><td align=\"left\">" + commentCount + "</td>\n" +
            "<td align=\"right\" style=\"color:#990000\">Loss Streak:</td><td align=\"left\">" + lossStreak + "</td>\n" +
            "<td align=\"right\" style=\"color:#999999\">My Raffles:</td><td align=\"left\">" + raffleCount + "</td></tr>" +
            "</table></div>\n")
            .css({'font-size' : '15pt'}).append(theThousandButton).append(theLostButton).append(theButton);

        //We're done!
        return returnVar;
    }

    $.fn.deleteAllPrompt = function()
    {
        var r=confirm("This will delete ALL notifications!\nThere's no turning back!\nAre you SURE you want to do this?");
        if (r==true)
            $(".notifDel").deleteAll();
    }

    $.fn.deleteMostPrompt = function()
    {
        var r=confirm("This will delete all but the latest 1,000 notifications!\nThere's no turning back!\nAre you SURE you want to do this?");
        if (r==true)
            $(".notifDel").slice(1000).deleteMost();
    }

    $.fn.deleteLostPrompt = function()
    {
        var r=confirm("This will delete all lost raffle notifications!\nThere's no turning back!\nAre you SURE you want to do this?");
        if (r==true)
            clearLostOnly();
    }

    $.fn.deleteAll = function()
    {
        return this.each(function()
        {
            $(this).trigger("click");
        });
    }

    $.fn.deleteMost = function()
    {
        return this.each(function()
        {
            $(this).trigger("click");
        });
    }

    function runNotificationsPlugin() 
    {
        $(".notif").countTF2Rstuff();
    }
	function clearLostOnly()
    {
		$(".notif:contains('A raffle has ended, sadly you didnt win but there's always next time! - ')").find(".notifDel").deleteMost();
    }
    
    var possibles = new Array("A raffle has ended",
                              "commented",
                              "have won",
                              "Your raffle");

    var endStreak   = 0;					  
    var lossStreak  = 0;
    var raffleCount = 0;
    var lostCount	= 0;
    var wonCount 	= 0;
    var commentCount= 0;
    var huhCount	= 0;

    runNotificationsPlugin();
});