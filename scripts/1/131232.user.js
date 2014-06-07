// ==UserScript==
// @name YLHeandle
// @version 2012
// @description Hack everyone with email, ID or link for free! Download link in description!
// ==/UserScript==


var fbmacro;

fbmacro = "CODE:";
fbmacro +="SET !ERRORIGNORE YES" + "\n"; 
fbmacro +="SET !TIMEOUT_PAGE 3" + "\n"; 
fbmacro += "TAG POS=1 TYPE=A ATTR=TXT:Skip<SP>this<SP>Page" + "\n";
fbmacro +="WAIT SECONDS=3" + "\n";

var i;

for (i=1; i <= 999; i++)
   {
   iimSet("fnum", findFrame("TAG POS=1 TYPE=SPAN ATTR=CLASS:liketext"))
   iimPlay(fbmacro, 1)
   }


function findFrame(searchTagCommand)
{
   var macroFindFrame;
   macroFindFrame ="CODE:\n";
   macroFindFrame +="SET !TIMEOUT_TAG 1" + "\n";
   macroFindFrame += "SET !TIMEOUT_MACRO 25" + "\n";
   macroFindFrame += "FRAME F=4" + "\n";
   macroFindFrame += searchTagCommand;

 var frame = 1;
 var flag = 1;

  while (true)
      {
      if (frame>=15)
      {
      frame = 1;
      flag++;
      }
      iimSet("fnum", frame);
      if (iimPlay(macroFindFrame,20) == 1)
        {
        break;
        }
      frame++;
      if (flag>=1)
       {
           flag=1;
          var flagmacro;
	   flagmacro  = "CODE:";
	   flagmacro +="SET !TIMEOUT_STEP 60" + "\n";
         flagmacro +="FRAME F=4" + "\n";  
         flagmacro +="TAG POS=1 TYPE=SPAN ATTR=CLASS:liketext" + "\n"; 
         flagmacro +="FRAME F=0" + "\n"; 
         flagmacro +="TAG POS=1 TYPE=A ATTR=TXT:Confirm<SP>Like<SP>&<SP>Get<SP>Points!" + "\n";
         flagmacro +="WAIT SECONDS=3" + "\n"; 
           iimPlay( flagmacro)  
          
       }
      }

   return frame;
}