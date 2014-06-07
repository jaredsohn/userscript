// ==UserScript==
// @name           Privoxy to NetPostive
// @namespace      blambi.chebab.com
// @description    Modifies the 503 error messages of privoxy to look similar to how NetPositive's looked.
// @include        *
// ==/UserScript==

/* Copyright (C) 2010  Patrik Lembke

   Copying and distribution of this file, with or without modification,
   are permitted in any medium without royalty provided the copyright
   notice and this notice are preserved.  This file is offered as-is,
   without any warranty.

   The messages are not my copyright, they are taken from:
                                 http://8325.org/haiku/
*/

/* version 0.2 */

messages = [
      "The web site you seek<br />Lies beyond our perception<br />But others await."
      ,
      "Sites you are seeking<br />From your path they are fleeing<br />Their winter has come."
      ,
      "A truth found, be told<br />You are far from the fold, Go<br />Come back yet again."
      ,
      "Wind catches lily<br />Scatt'ring petals to the wind:<br />Your site is not found."
      ,
      "These three are certain:<br />Death, taxes, and site not found.<br />You, victim of one."
      ,
      "Ephemeral site.<br />I am the Blue Screen of Death.<br />No one hears your screams."
      ,
      "Aborted effort:<br />The site, passed this veil of tears.<br />You ask way too much."
      ,
//      "Mourning and sorrow<br />404 not with us now<br />Lost to paradise."
//      ,
      "Not a pretty sight<br />When the web dies screaming loud<br />The site is not found."
      ,
      "Site slips through fingers<br />Pulse pounding hard and frantic<br />Vanishing like mist."
      ,
      "The dream is shattered<br />The web site cannot be found<br />Inside the spring rain."
      ,
      "Bartender yells loud<br />Your site cannot be found, boy<br />Buy another drink."
      ,
      "Chrome megaphone barks<br />It's not possible to talk<br />Not yet anyway."
      ,
      "Emptyness of soul<br />Forever aching blackness:<br />'Blah.com not found.'"
      ,
//      "Click exciting link<br />Gossamer threads hold you back<br />404 not found."
//      ,
      "With searching comes loss<br />And the presence of absence:<br />The site is not found."
      ,
      "You step in the stream,<br />But the water has moved on<br />The site is not here."
      ,
      "Rather than a beep<br />Or a rude error message,<br />These words: 'Site not found.'"
      ,
      "Something you entered<br />Transcended parameters.<br />The site is unknown."
      ,
      "Stay the patient course<br />Of little worth is your ire<br />The server is down"
      ,
      "There is a chasm<br />Of carbon and silicon<br />The server can't bridge."
      ,
      "Chaos reigns within.<br />Reflect, repent, and retry.<br />Server shall return."
      ,
      "Won't you please observe<br />A brief moment of silence<br />For the dead server?"
      ,
      "First snow, then silence.<br />This expensive server dies<br />So beautifully."
      ,
      "Seeing my great fault<br />Through darkening dead servers<br />I begin again."
      ,
      "Visit the home page<br />It can't be done easily<br />When the site is down."
      ,
      "Cables have been cut<br />Southwest of Northeast somewhere<br />We are not amused."
      ,
      "Site is silent, yes<br />No voices can be heard now<br />The cows roll their eyes."
      ,
      "Silicon shudders<br />The site is down for the count<br />One big knockout punch."
      ,
      "Yesterday it worked<br />Today it is not working<br />The web is like that."
      ,
      "The ten thousand things<br />How long do any persist?<br />The file, not there."
      ,
      "A file that big?<br />It might be very useful<br />But now it is gone."
      ,
      "To have no errors<br />Would be life without meaning<br />No struggle, no joy"
      ,
      "Errors have occurred.<br />We won't tell you where or why.<br />Lazy programmers."
      ,
      "The code was willing<br />It considered your request,<br />But the chips were weak."
      ,
      "Error reduces<br />Your expensive computer<br />To a simple stone."
      ,
      "Server's poor response<br />Not quick enough for browser.<br />Timed out, plum blossom."
      ,
      "Login incorrect.<br />Only perfect spellers may<br />Enter this system." ];

if( document.title.search( "503 - Connect failed" ) == 0 || document.title.search( "502 - Bad Gateway" ) == 0 )
{
    /* generate a message */
    x = Math.round( Math.random() * messages.length );
    msg = messages[ x ];

    if( document.title.search( "503 - Connect failed" ) == 0 )
      title = "Web site not found";
    else
      title = "Domain not found/Bad gateway";

    document.body.innerHTML = "<h1>" + title + "</h1><font size=4>The web site <a href='" + document.URL + "'>" + document.domain + "</a> could not be found.  If you have entered the web address manually, please make sure that you have typed it correctly. If you have gotten this error by clicking on a link from another site, you may wish to contact the site administrator about the out-of-date link.</font><p><tr><td width=30>&nbsp;</td><td><i><font size=2>" + msg + "</font></i></td></tr></table>";
    document.title = "Web site not found";   
}
