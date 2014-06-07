// ==UserScript==
// @name        addmefast.com
// @namespace   admefast
// @include     http://addmefast.com/free_points/youtube_likes.html
// @include     http://addmefast.com/free_points/youtube_views.html
// @version     1
// ==/UserScript==

ar macroStart;
    macroStart ="CODE:";
    macroStart +="SET !ERRORIGNORE YES" + "\n"; 
    macroStart +="SET !TIMEOUT_TAG 1" + "\n";
    macroStart +="SET !TIMEOUT_STEP 1" + "\n";
    macroStart +="SET !TIMEOUT_PAGE 30" + "\n";
    macroStart +=" SET !REPLAYSPEED FAST" + "\n";
    macroStart +="SET !TIMEOUT_MACRO 150" + "\n";
    macroStart +="TAB T=1" + "\n";
    macroStart +="WAIT SECONDS=0" + "\n";
    macroStart += "TAG POS=1 TYPE=A ATTR=TXT:Facebook<SP>Likes" + "\n";
	macroStart +="WAIT SECONDS=2" + "\n";
    macroStart += "TAG POS=1 TYPE=A ATTR=TXT:Like" + "\n";
    macroStart += "TAB T=2" + "\n";
    macroStart += " FRAME F=0" + "\n";
    macroStart += "TAG POS=1 TYPE=LABEL ATTR=ID:timelineHeadlineLikeButton" + "\n";
    macroStart += "TAB T=2" + "\n";
	macroStart +="WAIT SECONDS=5" + "\n";
    macroStart += "TAB T=1" + "\n";
	macroStart += "TAB CLOSEALLOTHERS" + "\n";
    macroStart +="WAIT SECONDS=5" + "\n";
    macroStart += "TAG POS=1 TYPE=A ATTR=TXT:Like" + "\n";
    macroStart += "TAB T=2" + "\n";
    macroStart += " FRAME F=0" + "\n";
    macroStart += "TAG POS=1 TYPE=LABEL ATTR=ID:timelineHeadlineLikeButton" + "\n";
    macroStart += "TAB T=2" + "\n";
	macroStart +="WAIT SECONDS=2" + "\n";
    macroStart += "TAB T=1" + "\n";
	macroStart += "TAB CLOSEALLOTHERS" + "\n";
    macroStart +="WAIT SECONDS=5" + "\n";
    macroStart += "TAG POS=1 TYPE=A ATTR=TXT:Like" + "\n";
    macroStart += "TAB T=2" + "\n";
    macroStart += " FRAME F=0" + "\n";
    macroStart += "TAG POS=1 TYPE=LABEL ATTR=ID:timelineHeadlineLikeButton" + "\n";
    macroStart += "TAB T=2" + "\n";
	macroStart +="WAIT SECONDS=2" + "\n";
    macroStart += "TAB T=1" + "\n";
	macroStart += "TAB CLOSEALLOTHERS" + "\n";
    macroStart +="WAIT SECONDS=5" + "\n";
    macroStart += "TAG POS=1 TYPE=A ATTR=TXT:Like" + "\n";
    macroStart += "TAB T=2" + "\n";
    macroStart += " FRAME F=0" + "\n";
    macroStart += "TAG POS=1 TYPE=LABEL ATTR=ID:timelineHeadlineLikeButton" + "\n";
    macroStart += "TAB T=2" + "\n";
	macroStart +="WAIT SECONDS=3" + "\n";
    macroStart += "TAB T=1" + "\n";
	macroStart += "TAB CLOSEALLOTHERS" + "\n";
    macroStart +="WAIT SECONDS=5" + "\n";
    macroStart += "TAG POS=1 TYPE=A ATTR=TXT:Like" + "\n";
    macroStart += "TAB T=2" + "\n";
    macroStart += " FRAME F=0" + "\n";
    macroStart += "TAG POS=1 TYPE=LABEL ATTR=ID:timelineHeadlineLikeButton" + "\n";
    macroStart += "TAB T=2" + "\n";
	macroStart +="WAIT SECONDS=2" + "\n";
    macroStart += "TAB T=1" + "\n";
	macroStart += "TAB CLOSEALLOTHERS" + "\n";
    macroStart +="WAIT SECONDS=5" + "\n";
    macroStart += "TAG POS=1 TYPE=A ATTR=TXT:Like" + "\n";
    macroStart += "TAB T=2" + "\n";
    macroStart += " FRAME F=0" + "\n";
    macroStart += "TAG POS=1 TYPE=LABEL ATTR=ID:timelineHeadlineLikeButton" + "\n";
    macroStart += "TAB T=2" + "\n";
	macroStart +="WAIT SECONDS=2" + "\n";
    macroStart += "TAB T=1" + "\n";
	macroStart += "TAB CLOSEALLOTHERS" + "\n";
    macroStart +="WAIT SECONDS=5" + "\n";
    macroStart += "TAG POS=1 TYPE=A ATTR=TXT:Like" + "\n";
    macroStart += "TAB T=2" + "\n";
    macroStart += " FRAME F=0" + "\n";
    macroStart += "TAG POS=1 TYPE=LABEL ATTR=ID:timelineHeadlineLikeButton" + "\n";
    macroStart += "TAB T=2" + "\n";
	macroStart +="WAIT SECONDS=2" + "\n";
    macroStart += "TAB T=1" + "\n";
	macroStart += "TAB CLOSEALLOTHERS" + "\n";
    macroStart +="WAIT SECONDS=5" + "\n";
   



var i=0;
var n=prompt("Input the number of Facebook loops.",5)

for (i=1; i <= n; i++)
{
iimPlay("CODE:"+"URL GOTO=www.addmefast.com")


iimPlay(macroStart,25)

iimDisplay("Current loop is: "+i)

iimDisplay("New Page")

}



