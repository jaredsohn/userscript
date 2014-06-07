// ==UserScript==
// @name        AddmeFast
// @namespace   AddmeFast
// @include     http://www.addmefast.com
// @version       1
// ==/UserScript==
var macroStart;
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
    macroStart += "TAG POS=1 TYPE=INPUT:SUBMIT ATTR=VALUE:Like" + "\n";
    macroStart += "TAB T=2" + "\n";
	macroStart +="WAIT SECONDS=3" + "\n";
    macroStart += "TAB T=1" + "\n";
	macroStart += "TAB CLOSEALLOTHERS" + "\n";
    macroStart +="WAIT SECONDS=2" + "\n";
    macroStart +="TAG POS=1 TYPE=INPUT:BUTTON FORM=ID:form1 ATTR=ID:subscribeButton" + "\n";
	macroStart +="WAIT SECONDS=3" + "\n";
	macroStart +="TAG POS=1 TYPE=IMG ATTR=SRC:http://www.addmefast.com/images/layout/bottom_arrow.png" + "\n";
	macroStart +="WAIT SECONDS=2" + "\n";
    macroStart += "TAG POS=1 TYPE=A ATTR=TXT:Like" + "\n";
    macroStart += "TAB T=2" + "\n";
    macroStart += " FRAME F=0" + "\n";
    macroStart += "TAG POS=1 TYPE=INPUT:SUBMIT ATTR=VALUE:Like" + "\n";
    macroStart += "TAB T=2" + "\n";
	macroStart +="WAIT SECONDS=2" + "\n";
    macroStart += "TAB T=1" + "\n";
	macroStart += "TAB CLOSEALLOTHERS" + "\n";
    macroStart +="WAIT SECONDS=2" + "\n";
    macroStart +="TAG POS=1 TYPE=INPUT:BUTTON FORM=ID:form1 ATTR=ID:subscribeButton" + "\n";
	macroStart +="WAIT SECONDS=3" + "\n";
	macroStart +="TAG POS=1 TYPE=IMG ATTR=SRC:http://www.addmefast.com/images/layout/bottom_arrow.png" + "\n";
	macroStart +="WAIT SECONDS=2" + "\n";
    macroStart += "TAG POS=1 TYPE=A ATTR=TXT:Like" + "\n";
    macroStart += "TAB T=2" + "\n";
    macroStart += " FRAME F=0" + "\n";
    macroStart += "TAG POS=1 TYPE=INPUT:SUBMIT ATTR=VALUE:Like" + "\n";
    macroStart += "TAB T=2" + "\n";
	macroStart +="WAIT SECONDS=2" + "\n";
    macroStart += "TAB T=1" + "\n";
	macroStart += "TAB CLOSEALLOTHERS" + "\n";
    macroStart +="WAIT SECONDS=2" + "\n";
    macroStart +="TAG POS=1 TYPE=INPUT:BUTTON FORM=ID:form1 ATTR=ID:subscribeButton" + "\n";
	macroStart +="WAIT SECONDS=3" + "\n";
	macroStart +="TAG POS=1 TYPE=IMG ATTR=SRC:http://www.addmefast.com/images/layout/bottom_arrow.png" + "\n";
   



var i=0;
var n=prompt("Input the number of Facebook loops.",5)

for (i=1; i <= n; i++)
{
iimPlay("CODE:"+"URL GOTO=www.addmefast.com")


iimPlay(macroStart,25)

iimDisplay("Current loop is: "+i)

iimDisplay("Refreshing the page")
iimPlay("CODE:"+"TAB T=1\n"+"TAG POS=1 TYPE=INPUT:BUTTON ATTR=NAME:reload&&VALUE:Reload<SP>the<SP>page\n"+"REFRESH")

iimDisplay("New Page")

}



