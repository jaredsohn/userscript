// ==UserScript==
// @name           Topic Poster
// @author         Mr.SpIdEy -http://www.orkut.com/Profile.aspx?uid=9481981899837315324
// @description    This script will Post same topic in all joined communities easily, You just need to enter capatcha and press enter and it will post topic smoothly. Created by someone else and fixed by Spidey.
// @namespace      hyderabadyouth.com
// @include        http://www.orkut.com/*
// ==/UserScript==

var subject = "!~FREE RAPIDSHARE PREMIUM A/cs && 500+ PC HACKS~!";
var msg = "[blue][b]http://syshacks.com/index.php?referredby=1015[/blue]

[b]RAPIDSHARE ACCOUNT FOR FREE !! GIVEN ONCE IN A MONTH FOR THREE DAYS KEEP CHECKING ![/b]

[b]
[red]Our Features are:[/red]

    [b]* PREMIUM ACCOUNTS FOR FREE[/b]
    * 500+ Unique PC Hacks
    * Any Technical Solving by Our Expert Team ( 4 Software Engineers)
    * 200+ Orkut Tips and Tricks
    * Online Gadgets
    * Freewares & Demoz
    * 500+ Java Applets
    * Website Development
    * 45 Online Games
    * BatchFile Codings
    * Virus Removal Tools/Help
    * Grease monkey scripts 
    * Videos/Images
    * Desktop Customization
    * Mobile Tips/Tricks/News
    * Java Programs
    * Hosting (Contact STALKER)
  
 [red]   * Top 3 posters will be paid
    * If your post rate is more than 30 for 5 days...you will be the Global Mod of this site! 
    * U get a rapidshare account if no of your posts exceeds 200!

Sign up here : http://syshacks.com/index.php?referredby=1015";


var credit = "[b]Click here for more orkut tricks<br><br>http://syshacks.com/index.php?referredby=1015[/b]";
      // It will make me happy if you put this line while posting in
      communities however its not necessary to put in it.

window.addEventListener("load", function(e) {
if(document.location.href.indexOf("Communities.aspx")>=0)
{
var anchorTags = document.getElementsByTagName('a');
var communities = "";
var j=0;
for(var i=0;i<anchorTags.length-1;i++)
{
       if(anchorTags[i].href.indexOf("Community.aspx")>=0)
{
if(j>0)
{
communities=communities+",";
}
           
communities=communities+anchorTags[i].href.split("cmm=")[1];
 j++;
}   
}
GM_setValue("communities",communities);
GM_setValue("postCount",0);
    
document.location.href="http://www.orkut.com/CommMsgPost.aspx?cmm="+GM_getValue("communities").split(",")[GM_getValue("postCount")];
 }
 if(document.location.href.indexOf("CommMsgPost.aspx")>=0)
 {
     GM_setValue("postCount",GM_getValue("postCount")+1);
     document.getElementById("subject").value= subject;
     document.getElementById("messageBody").value= msg + credit;
    document.location.href="javascript:_submitForm(document.forms[1],'submit','')"}
if(document.location.href.indexOf("CommMsgs.aspx")>=0)
 {
if(GM_getValue("communities").split(",").length>GM_getValue("postCount"))
{
document.location.href="http://www.orkut.com/CommMsgPost.aspx?cmm="+GM_getValue("communities").split(",")[GM_getValue("postCount")];
}
 else
{
alert("All the communities have been posted with the
      message. Visit Orkuted.com for Orkut Related Graphics");
}
}
}, false);




