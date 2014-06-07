// ==UserScript==
// @name           name
// @namespace      myyearbook_all_in_one.js
// @description    the description
// @include        http://userscripts.org/topics/*
// ==/UserScript==
//imacros-js:showsteps no
// Masser v2.0 by doctor script
// If you like this show my page some LUV!  


// BEGIN SECTION 1
nL = "\n";


NUMBER_OF_PEOPLE = prompt("Number of People to do", 1000);



alert("The script has paused, please go to the search page, Members Online now, people who voted, or your friends " + '\n' + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME" + '\n' + '\n' + "SHOW ME SOME LOVE BACK,PZ..TY! http://www.myyearbook.com/mrssup");


PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE);



PEOPLE_PER_PAGE = prompt("How Many People per page? " + '\n' + '\n' + " Search page has 16, New style Friends lists have 20 and Notifications have 10, others are 12",'20' );
PEOPLE_PER_PAGE = PEOPLE_PER_PAGE.replace(/ /g, "<sp>");
PEOPLE_PER_PAGE = PEOPLE_PER_PAGE.replace(/"/g, '\"');



FRIENDS = prompt("IMPORTANT!!!  Are you MASSING to your FRIENDS? yes or no " + '\n' + '\n' + "If so use the New style, simple view.  ",'yes');



// Friends section


if (FRIENDS=="yes")


{

FRIENDPAGE = "CODE:";
FRIENDPAGE = FRIENDPAGE+"URL GOTO=http://www.myyearbook.com/apps/home" +nL; 

FRIENDPAGE = FRIENDPAGE+"TAG POS=1 TYPE=A ATTR=TXT:Friends" +nL;
FRIENDPAGE = FRIENDPAGE+"TAG POS=1 TYPE=DIV ATTR=TXT:A" +nL;
iimPlay(FRIENDPAGE);

ONLINE = prompt("IMPORTANT!!!  Are you MASSING to your ONLINE FRIENDS? yes or no " + '\n' + '\n' + "Make sure and use the New style, simple view.  ",'yes');

if (ONLINE=="yes")


{
ON_LINE = "CODE:";
//ON_LINE = ON_LINE+"URL GOTO=http://www.myyearbook.com/apps/home" +nL; 
//ON_LINE = ON_LINE+"TAG POS=1 TYPE=A ATTR=TXT:Friends" +nL;
ON_LINE = ON_LINE+"TAG POS=1 TYPE=INPUT:CHECKBOX FORM=ACTION:http:/// ATTR=ID:onlineNow CONTENT=YES" +nL;
iimPlay(ON_LINE);
}

GS = prompt("Gold Star? yes or no",'yes');

HF = prompt("High Five? yes or no",'yes');

AM = prompt("Admiring people? yes or no",'yes');

FL = prompt("Flirt? yes or no",'no');

if (FL=="yes")
{

FLIRT = prompt("FLIRT comment",'LM A Flirt for you!' );
FLIRT = FLIRT.replace(/ /g, "<sp>");
FLIRT = FLIRT.replace(/"/g, '\"');
}

ST = prompt("Sticker? " + '\n' + '\n' + " This will automatically give them the last sticker you have created.",'no');

//var GI = prompt("Gift?",'no');
//if (GI=="yes") 
//{
//GIFT = prompt("GIFT comment",'LM Thought you might like one of these!' );
//GIFT = GIFT.replace(/ /g, "<sp>");
//GIFT = GIFT.replace(/"/g, '\"');
//}


PC = prompt("Pic Comment?",'yes');

if (PC=="yes") 
{
PICCOMMENT = prompt("Pic Comment",'SHOWING LOVE TO YOUR PIC!' );
PICCOMMENT = PICCOMMENT.replace(/ /g, "<sp>");
PICCOMMENT = PICCOMMENT.replace(/"/g, '\"');
}



AU = prompt("Autograph?",'yes');


if (AU=="yes") 
{

AUTOGRAPH = prompt("AUTOGRAPH",'<h1>showing a lil love</h1>' );
AUTOGRAPH = AUTOGRAPH.replace(/ /g, "<sp>");
AUTOGRAPH = AUTOGRAPH.replace(/"/g, '\"');
}


MS = prompt("Sending a message?",'yes')
if (MS=="yes")
{
SUBJECT=prompt("Email Subject",'thank you');
SUBJECT = SUBJECT.replace(/ /g, "<sp>");
SUBJECT = SUBJECT.replace(/"/g, '\"');

BODY=prompt("Email Body",'join my group on my page');
BODY = BODY.replace(/ /g, "<sp>");
BODY = BODY.replace(/"/g, '\"');
}
var START_PAGE_NUMBER;
NUMBER_OF_PAGES = NUMBER_OF_PEOPLE / PEOPLE_PER_PAGE;

alert("We are ready to start doing the Add Star Admire Message thing, please check back periodically for captchas" + '\n' + "Or if you minimize it to work on something, look for the Taskbar to flash");

var FP
var ia
FP = new Array();

FP.push("A"); 
FP.push("B");
FP.push("C");
FP.push("D");
FP.push("E");
FP.push("F");
FP.push("G");
FP.push("H");
FP.push("I");
FP.push("J");
FP.push("K");
FP.push("L");
FP.push("M");
FP.push("N");
FP.push("O");
FP.push("P");
FP.push("Q");
FP.push("R");
FP.push("S");
FP.push("T");
FP.push("U");
FP.push("V");
FP.push("W");
FP.push("X");
FP.push("Y");
FP.push("Z");

for (ia = 0; ia < FP.length; ia++)

{


FRIENDPAGE = "CODE:";
//FRIENDPAGE = FRIENDPAGE+"URL GOTO=http://www.myyearbook.com/apps/home" +nL; 
//FRIENDPAGE = FRIENDPAGE+"TAG POS=1 TYPE=A ATTR=TXT:Friends" +nL;
FRIENDPAGE = FRIENDPAGE+"TAG POS=1 TYPE=DIV ATTR=TXT:" + FP[ia] +nL;
iimPlay(FRIENDPAGE);

for (START_PAGE_NUMBER = 1; START_PAGE_NUMBER <= NUMBER_OF_PAGES ; START_PAGE_NUMBER++ )
{

var POS = 1;
for (START_NUMBER = 1; START_NUMBER <= PEOPLE_PER_PAGE; START_NUMBER++ )
{



// STAR

if (GS=="yes")
{
GOLD_STAR = "CODE:";
GOLD_STAR = GOLD_STAR+"SET !ERRORIGNORE YES" + nL
GOLD_STAR = GOLD_STAR+"SET !TIMEOUT 10" +nL; 
GOLD_STAR = GOLD_STAR + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:largeActionIcon<SP>btnActionIcon<SP>aiIconPopUp*" +nL;  
GOLD_STAR = GOLD_STAR + "WAIT SECONDS=1" +nL; 
GOLD_STAR = GOLD_STAR+"TAG POS=" + POS + " TYPE=A ATTR=CLASS:btnActionIcon<SP>aiGoldStar" +nL;
GOLD_STAR = GOLD_STAR+"WAIT SECONDS=1" +nL; 
GOLD_STAR = GOLD_STAR+"TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(GOLD_STAR);


CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK=="Get a new challenge")
{

alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME");
PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE);
}
else
{
SENDING = "CODE:";
SENDING = SENDING+"SET !ERRORIGNORE YES" + nL
SENDING = SENDING+"SET !TIMEOUT 10" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*white_x.gif" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
iimPlay(SENDING);
}
}





// High 5
if (HF=="yes")
{
HIGH_FIVE = "CODE:";
HIGH_FIVE = HIGH_FIVE+"SET !ERRORIGNORE YES" + nL
HIGH_FIVE = HIGH_FIVE+"SET !TIMEOUT 10" +nL; 
HIGH_FIVE = HIGH_FIVE + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:largeActionIcon<SP>btnActionIcon<SP>aiIconPopUp*" +nL;  
HIGH_FIVE = HIGH_FIVE + "WAIT SECONDS=1" +nL; 
HIGH_FIVE = HIGH_FIVE+"TAG POS=1 TYPE=A ATTR=CLASS:btnActionIcon<SP>aiHighFive" +nL; 
HIGH_FIVE = HIGH_FIVE+"WAIT SECONDS=1" +nL;
HIGH_FIVE = HIGH_FIVE+"TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(HIGH_FIVE);


CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK=="Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME");
PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE);
}
else
{
SENDING = "CODE:";
SENDING = SENDING+"SET !ERRORIGNORE YES" + nL
SENDING = SENDING+"SET !TIMEOUT 10" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*white_x.gif" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
iimPlay(SENDING);
}
}

// ADMIRE
if (AM=="yes")
{
ADMIRE_YOU = "CODE:";
ADMIRE_YOU = ADMIRE_YOU+"SET !ERRORIGNORE YES" + nL
ADMIRE_YOU = ADMIRE_YOU+"SET !TIMEOUT 10" +nL; 
ADMIRE_YOU = ADMIRE_YOU + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:largeActionIcon<SP>btnActionIcon<SP>aiIconPopUp*" +nL;  
ADMIRE_YOU = ADMIRE_YOU + "WAIT SECONDS=1" +nL; 
ADMIRE_YOU = ADMIRE_YOU+"TAG POS=1 TYPE=A ATTR=CLASS:btnActionIcon<SP>aiAdmire" +nL; 
ADMIRE_YOU = ADMIRE_YOU+"WAIT SECONDS=1" +nL; 
ADMIRE_YOU = ADMIRE_YOU+"TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(ADMIRE_YOU);


CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK=="Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME");
PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE);
}
else
{
SENDING = "CODE:";
SENDING = SENDING+"SET !ERRORIGNORE YES" + nL
SENDING = SENDING+"SET !TIMEOUT 10" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*white_x.gif" +nL; 
iimPlay(SENDING);
}
}


// Flirt
if (FL=="yes")
{
FLIRT_YOU = "CODE:";
FLIRT_YOU = FLIRT_YOU+"SET !ERRORIGNORE YES" + nL
FLIRT_YOU = FLIRT_YOU+"SET !TIMEOUT 10" +nL; 
//FLIRT_YOU = FLIRT_YOU + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:largeActionIcon<SP>btnActionIcon<SP>aiIconPopUp*" +nL;  
//FLIRT_YOU = FLIRT_YOU + "WAIT SECONDS=1" +nL; 
FLIRT_YOU = FLIRT_YOU+"TAG POS=" + POS + " TYPE=A ATTR=CLASS:btnActionIcon<SP>aiFlirt" +nL; 
FLIRT_YOU = FLIRT_YOU+"WAIT SECONDS=1" +nL; 
FLIRT_YOU = FLIRT_YOU+"TAG POS=1 TYPE=INPUT:RADIO FORM=NAME:NoFormName ATTR=NAME:flirtText&&VALUE:userEntered " +nL; 
FLIRT_YOU = FLIRT_YOU+"WAIT SECONDS=1" +nL; 
FLIRT_YOU = FLIRT_YOU+"TAG POS=1 TYPE=INPUT:TEXT FORM=NAME:NoFormName ATTR=NAME: CONTENT=" + FLIRT +nL; 
FLIRT_YOU = FLIRT_YOU+"WAIT SECONDS=1" +nL; 
FLIRT_YOU = FLIRT_YOU+"TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(FLIRT_YOU);


CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK=="Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME");
PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PASE);
}
else
{
SENDING = "CODE:";
SENDING = SENDING+"SET !ERRORIGNORE YES" + nL
SENDING = SENDING+"SET !TIMEOUT 10" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*btn_submit.gif" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*white_x.gif" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
iimPlay(SENDING);
}
}

// Sticker

if (ST=="yes")
{
STICK_YOU = "CODE:";
STICK_YOU = STICK_YOU+"SET !ERRORIGNORE YES" + nL
STICK_YOU = STICK_YOU+"SET !TIMEOUT 10" +nL; 
STICK_YOU = STICK_YOU + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:largeActionIcon<SP>btnActionIcon<SP>aiIconPopUp*" +nL;  
STICK_YOU = STICK_YOU + "WAIT SECONDS=2" +nL; 
STICK_YOU = STICK_YOU+"TAG POS=1 TYPE=A ATTR=CLASS:btnActionIcon<SP>aiSticker" +nL; 
STICK_YOU = STICK_YOU+"WAIT SECONDS=3" +nL; 
STICK_YOU = STICK_YOU+"TAG POS=1 TYPE=SELECT FORM=NAME:NoFormName ATTR=ID:stickerSortBy CONTENT=%my" +nL; 
STICK_YOU = STICK_YOU+"WAIT SECONDS=5" +nL; 
STICK_YOU = STICK_YOU+"TAG POS=1 TYPE=IMG ATTR=ALT:stickerImage" +nL; 
STICK_YOU = STICK_YOU+"WAIT SECONDS=1" +nL; 
STICK_YOU = STICK_YOU+"TAG POS=1 TYPE=INPUT:IMAGE FORM=ID:mainForm ATTR=ID:stickerSubmit" +nL; 
STICK_YOU = STICK_YOU+"WAIT SECONDS=1" +nL; 
STICK_YOU = STICK_YOU+"TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(STICK_YOU);


CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK=="Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME");
PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE);
}
else
{
SENDING = "CODE:";
SENDING = SENDING+"SET !ERRORIGNORE YES" + nL
SENDING = SENDING+"SET !TIMEOUT 10" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*btn_submit.gif" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*white_x.gif" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
iimPlay(SENDING);
}
}
// Pic Comment

if (PC=="yes")
{
PIC_YOU = "CODE:";
PIC_YOU = PIC_YOU+"SET !ERRORIGNORE YES" + nL
PIC_YOU = PIC_YOU+"SET !TIMEOUT 10" +nL; 
PIC_YOU = PIC_YOU + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:largeActionIcon<SP>btnActionIcon<SP>aiIconPopUp*" +nL;  
PIC_YOU = PIC_YOU + "WAIT SECONDS=1" +nL; 
PIC_YOU = PIC_YOU+"TAG POS=1 TYPE=A ATTR=CLASS:btnActionIcon<SP>aiPicture*" +nL; 
PIC_YOU = PIC_YOU+"WAIT SECONDS=5" +nL; 
PIC_YOU = PIC_YOU+"TAG POS=1 TYPE=A ATTR=TXT:Post<SP>Comment" +nL; 
PIC_YOU = PIC_YOU+"WAIT SECONDS=1" +nL; 
PIC_YOU = PIC_YOU+"TAG POS=1 TYPE=TEXTAREA FORM=NAME:NoFormName ATTR=ID:commentText CONTENT=" + PICCOMMENT +nL; 
PIC_YOU = PIC_YOU+"WAIT SECONDS=1" +nL; 
PIC_YOU = PIC_YOU+"TAG POS=1 TYPE=INPUT:IMAGE FORM=ID:mainForm ATTR=ID:btnPostComment" +nL; 
PIC_YOU = PIC_YOU+"WAIT SECONDS=1" +nL; 
PIC_YOU = PIC_YOU+"TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(PIC_YOU);


CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK=="Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME");
PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE);
}
else
{
SENDING = "CODE:";
SENDING = SENDING+"SET !ERRORIGNORE YES" + nL
SENDING = SENDING+"SET !TIMEOUT 10" +nL; 
//SENDING = SENDING+"WAIT SECONDS=1" +nL; 
//SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=ALT:Submit" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*white_x.gif" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
iimPlay(SENDING);
}
}

// Gift



// Autograph
if (AU=="yes")
{
AUTO_YOU = "CODE:";
AUTO_YOU = AUTO_YOU+"SET !ERRORIGNORE YES" + nL
AUTO_YOU = AUTO_YOU+"SET !TIMEOUT 10" +nL; 
//AUTO_YOU = AUTO_YOU + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:largeActionIcon<SP>btnActionIcon<SP>aiIconPopUp*" +nL;  
//AUTO_YOU = AUTO_YOU + "WAIT SECONDS=1" +nL; 
AUTO_YOU = AUTO_YOU+"TAG POS=" + POS + " TYPE=A ATTR=CLASS:btnActionIcon<SP>aiAutograph*" +nL; 
AUTO_YOU = AUTO_YOU+"WAIT SECONDS=1" +nL; 
AUTO_YOU = AUTO_YOU+"TAG POS=1 TYPE=TEXTAREA FORM=NAME:NoFormName ATTR=ID:aiTextbox CONTENT=" + AUTOGRAPH +nL; 
AUTO_YOU = AUTO_YOU+"WAIT SECONDS=1" +nL; 
AUTO_YOU = AUTO_YOU+"TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(AUTO_YOU);

CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK=="Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME");
PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE);
}
else
{
SENDING = "CODE:";
SENDING = SENDING+"SET !ERRORIGNORE YES" + nL
SENDING = SENDING+"SET !TIMEOUT 10" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*btn_submit.gif" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*white_x.gif" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
iimPlay(SENDING);
}
}


// Message
if (MS=="yes")
{
BEGIN_EMAILING = "CODE:";
BEGIN_EMAILING = BEGIN_EMAILING + "SET !ERRORIGNORE YES" + nL;
BEGIN_EMAILING = BEGIN_EMAILING + "SET !TIMEOUT 10" +nL; 
BEGIN_EMAILING = BEGIN_EMAILING + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:btnActionIcon<SP>aiMessage*" +nL;  
BEGIN_EMAILING = BEGIN_EMAILING + "WAIT SECONDS=1" +nL; 
BEGIN_EMAILING = BEGIN_EMAILING + "TAG POS=1 TYPE=INPUT:TEXT ATTR=ID:aiPrompt CONTENT=" + SUBJECT + nL; 
BEGIN_EMAILING = BEGIN_EMAILING + "WAIT SECONDS=1" +nL; 
BEGIN_EMAILING = BEGIN_EMAILING + "TAG POS=1 TYPE=TEXTAREA FORM=NAME:NoFormName ATTR=ID:aiTextbox CONTENT=" + BODY +nL; 
BEGIN_EMAILING = BEGIN_EMAILING + "'Checking for Captchas" +nL; 
BEGIN_EMAILING = BEGIN_EMAILING + "WAIT SECONDS=1" +nL; 
BEGIN_EMAILING = BEGIN_EMAILING + "TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(BEGIN_EMAILING);

CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK == "Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, PLEASE HIT CONTINUE TO RESUME");

PAUSE_FOR_PAGE_ADJUST = "CODE:";
PAUSE_FOR_PAGE_ADJUST = PAUSE_FOR_PAGE_ADJUST + "SET !SINGLESTEP YES"  + nL; 
PAUSE_FOR_PAGE_ADJUST = PAUSE_FOR_PAGE_ADJUST + "SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE_FOR_PAGE_ADJUST);
}
else
{
SENDING_EMAIL= "CODE:";
SENDING_EMAIL = SENDING_EMAIL + "SET !ERRORIGNORE YES" + nL
SENDING_EMAIL = SENDING_EMAIL + "SET !TIMEOUT 10" +nL; 
SENDING_EMAIL = SENDING_EMAIL + "WAIT SECONDS=1" +nL; 
SENDING_EMAIL = SENDING_EMAIL+"TAG POS=1 TYPE=IMG ATTR=SRC:*btn_submit.gif" +nL; 
SENDING_EMAIL = SENDING_EMAIL + "WAIT SECONDS=1" +nL; 
iimPlay(SENDING_EMAIL);
}
}


var POS = POS + 1;
}
NEXTPAGE_CHECK = "CODE:";
NEXTPAGE_CHECK = NEXTPAGE_CHECK + "WAIT SECONDS=2" +nL;
NEXTPAGE_CHECK = NEXTPAGE_CHECK + "TAG POS=1 TYPE=A ATTR=TXT:> EXTRACT=TXT " +nL;
NEXTPAGE_CHECK = NEXTPAGE_CHECK + "WAIT SECONDS=2" +nL;
iimPlay(NEXTPAGE_CHECK);

_NEXTPAGE_ARROW = iimGetLastExtract(1);

if (_NEXTPAGE_ARROW == ">")
{
SWITCH_PAGES = "CODE:";
SWITCH_PAGES = SWITCH_PAGES + "WAIT SECONDS=2" +nL; 
SWITCH_PAGES = SWITCH_PAGES + "TAG POS=1 TYPE=A ATTR=TXT:>" +nL; 
SWITCH_PAGES = SWITCH_PAGES + "WAIT SECONDS=4" +nL; 
iimPlay(SWITCH_PAGES);
}
else


{

//alert("MOVING TO THE NEXT LETTER " + '\n' + "Thank you for using the 0Pete Masser");
break;
}
CAPTCHA_BETWEEN_PAGES = "CODE:";
CAPTCHA_BETWEEN_PAGES = CAPTCHA_BETWEEN_PAGES + "SET !TIMEOUT 10" +nL; 
CAPTCHA_BETWEEN_PAGES = CAPTCHA_BETWEEN_PAGES + "WAIT SECONDS=2" +nL;
CAPTCHA_BETWEEN_PAGES = CAPTCHA_BETWEEN_PAGES + "TAG POS=1 TYPE=IMG ATTR=ID:captcha EXTRACT=ALT" +nL;
iimPlay(CAPTCHA_BETWEEN_PAGES);

_CAPTCHA = iimGetLastExtract(1);

if (_CAPTCHA == "Human Input Validation")
{

alert("CAPTCHA Needs filled out, Hit OK and Fill Out Captcha and HIT Submit" + '\n' + "Then in your IMacros Side Bar, PLEASE HIT CONTINUE TO RESUME");
PAUSE_FOR_PAGE_ADJUST = "CODE:";
PAUSE_FOR_PAGE_ADJUST = PAUSE_FOR_PAGE_ADJUST + "'Pausing, Continue when Ready" +nL; 
PAUSE_FOR_PAGE_ADJUST = PAUSE_FOR_PAGE_ADJUST + "SET !SINGLESTEP YES"  + nL; 
PAUSE_FOR_PAGE_ADJUST = PAUSE_FOR_PAGE_ADJUST + "SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE_FOR_PAGE_ADJUST);
}
}
}

}



// NON-Friends section

if (FRIENDS!="yes")

{

ADD = prompt("Adding people?",'yes');

GS = prompt("Gold Star?",'yes');

HF = prompt("High Five?",'yes');

AM = prompt("Admiring people?",'yes');

FL = prompt("Flirt?",'no');

if (FL=="yes")
{

FLIRT = prompt("FLIRT comment",'LM A Flirt for you!' );
FLIRT = FLIRT.replace(/ /g, "<sp>");
FLIRT = FLIRT.replace(/"/g, '\"');
}

ST = prompt("Sticker? " + '\n' + '\n' + " This will automatically give them the last sticker you have created.",'yes');


//var GI = prompt("Gift?",'no');
//if (GI=="yes") 
//{
//GIFT = prompt("GIFT comment",'LM Thought you might like one of these!' );
//GIFT = GIFT.replace(/ /g, "<sp>");
//GIFT = GIFT.replace(/"/g, '\"');
//}


PC = prompt("Pic Comment?",'yes');
if (PC=="yes") 
{
PICCOMMENT = prompt("Pic Comment",'LM Cool pics!' );
PICCOMMENT = PICCOMMENT.replace(/ /g, "<sp>");
PICCOMMENT = PICCOMMENT.replace(/"/g, '\"');
}



MS = prompt("Sending a message?",'yes')
if (MS=="yes")
{
SUBJECT=prompt("Email Subject",'Have a GREAT DAY!');
SUBJECT = SUBJECT.replace(/ /g, "<sp>");
SUBJECT = SUBJECT.replace(/"/g, '\"');
BODY=prompt("Email Body",'And a GREAT WEEK too!');
BODY = BODY.replace(/ /g, "<sp>");
BODY = BODY.replace(/"/g, '\"');
}
var START_PAGE_NUMBER;
NUMBER_OF_PAGES = NUMBER_OF_PEOPLE / PEOPLE_PER_PAGE;


alert("We are ready to start doing the Add Star Admire thing, please check back periodically for captchas" + '\n' + "Or if you minimize it to work on something, look for the Taskbar to flash");


for (START_PAGE_NUMBER = 1; START_PAGE_NUMBER <= NUMBER_OF_PAGES ; START_PAGE_NUMBER++ )
{
var POS = 1;


for (START_NUMBER = 1; START_NUMBER <= PEOPLE_PER_PAGE; START_NUMBER++ )
{
// ADD
if (ADD=="yes") 
{
ADDING_FRIEND = "CODE:";
ADDING_FRIEND = ADDING_FRIEND+"SET !ERRORIGNORE YES" + nL
ADDING_FRIEND = ADDING_FRIEND+"SET !TIMEOUT 10" +nL; 
ADDING_FRIEND = ADDING_FRIEND + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:largeActionIcon<SP>btnActionIcon<SP>aiIconPopUp*" +nL;  
ADDING_FRIEND = ADDING_FRIEND + "WAIT SECONDS=1" +nL; 
ADDING_FRIEND = ADDING_FRIEND+"TAG POS=1 TYPE=A ATTR=CLASS:btnActionIcon<SP>aiFriend" +nL; 
ADDING_FRIEND = ADDING_FRIEND+"WAIT SECONDS=1" +nL; 
ADDING_FRIEND = ADDING_FRIEND+"TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(ADDING_FRIEND);


CAPTCHA_CHECK = iimGetLastExtract(1);
if (CAPTCHA_CHECK=="Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME");
PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE);
}
else
{
SENDING = "CODE:";
SENDING = SENDING+"SET !ERRORIGNORE YES" + nL
SENDING = SENDING+"SET !TIMEOUT 10" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=ALT:Submit" +nL; 
SENDING = SENDING+"WAIT SECONDS=2" +nL; 
iimPlay(SENDING);
}
}



// STAR

if (GS=="yes") 
{
GOLD_STAR = "CODE:";
GOLD_STAR = GOLD_STAR+"SET !ERRORIGNORE YES" + nL
GOLD_STAR = GOLD_STAR+"SET !TIMEOUT 10" +nL; 
GOLD_STAR = GOLD_STAR + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:largeActionIcon<SP>btnActionIcon<SP>aiIconPopUp*" +nL;  
GOLD_STAR = GOLD_STAR + "WAIT SECONDS=1" +nL; 
GOLD_STAR = GOLD_STAR+"TAG POS=1 TYPE=A ATTR=CLASS:btnActionIcon<SP>aiGoldStar" +nL;
GOLD_STAR = GOLD_STAR+"WAIT SECONDS=1" +nL; 
GOLD_STAR = GOLD_STAR+"TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(GOLD_STAR);


CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK=="Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME");
PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE);
}
else
{
SENDING = "CODE:";
SENDING = SENDING+"SET !ERRORIGNORE YES" + nL
SENDING = SENDING+"SET !TIMEOUT 10" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*white_x.gif" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
iimPlay(SENDING);
}
}


// High 5
if (HF=="yes")
{
HIGH_FIVE = "CODE:";
HIGH_FIVE = HIGH_FIVE+"SET !ERRORIGNORE YES" + nL
HIGH_FIVE = HIGH_FIVE+"SET !TIMEOUT 10" +nL; 
HIGH_FIVE = HIGH_FIVE + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:largeActionIcon<SP>btnActionIcon<SP>aiIconPopUp*" +nL;  
HIGH_FIVE = HIGH_FIVE + "WAIT SECONDS=1" +nL; 
HIGH_FIVE = HIGH_FIVE+"TAG POS=1 TYPE=A ATTR=CLASS:btnActionIcon<SP>aiHighFive" +nL; 
HIGH_FIVE = HIGH_FIVE+"TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(HIGH_FIVE);


CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK=="Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME");
PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE);
}
else
{
SENDING = "CODE:";
SENDING = SENDING+"SET !ERRORIGNORE YES" + nL
SENDING = SENDING+"SET !TIMEOUT 10" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*white_x.gif" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
iimPlay(SENDING);
}
}


// ADMIRE
if (AM=="yes")
{
ADMIRE_YOU = "CODE:";
ADMIRE_YOU = ADMIRE_YOU+"SET !ERRORIGNORE YES" + nL
ADMIRE_YOU = ADMIRE_YOU+"SET !TIMEOUT 10" +nL; 
ADMIRE_YOU = ADMIRE_YOU + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:largeActionIcon<SP>btnActionIcon<SP>aiIconPopUp*" +nL;  
ADMIRE_YOU = ADMIRE_YOU + "WAIT SECONDS=1" +nL; 
ADMIRE_YOU = ADMIRE_YOU+"TAG POS=1 TYPE=A ATTR=CLASS:btnActionIcon<SP>aiAdmire" +nL; 
ADMIRE_YOU = ADMIRE_YOU+"WAIT SECONDS=1" +nL; 
ADMIRE_YOU = ADMIRE_YOU+"TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(ADMIRE_YOU);


CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK=="Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME");
PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE);
}
else
{
SENDING = "CODE:";
SENDING = SENDING+"SET !ERRORIGNORE YES" + nL
SENDING = SENDING+"SET !TIMEOUT 10" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*white_x.gif" +nL; 
iimPlay(SENDING);
}
}

// Flirt
if (FL=="yes")
{
FLIRT_YOU = "CODE:";
FLIRT_YOU = FLIRT_YOU+"SET !ERRORIGNORE YES" + nL
FLIRT_YOU = FLIRT_YOU+"SET !TIMEOUT 10" +nL; 
FLIRT_YOU = FLIRT_YOU + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:largeActionIcon<SP>btnActionIcon<SP>aiIconPopUp*" +nL;  
FLIRT_YOU = FLIRT_YOU + "WAIT SECONDS=1" +nL; 
FLIRT_YOU = FLIRT_YOU+"TAG POS=1 TYPE=A ATTR=CLASS:btnActionIcon<SP>aiFlirt" +nL; 
FLIRT_YOU = FLIRT_YOU+"WAIT SECONDS=1" +nL; 
FLIRT_YOU = FLIRT_YOU+"TAG POS=1 TYPE=INPUT:RADIO FORM=NAME:NoFormName ATTR=NAME:flirtText&&VALUE:userEntered " +nL; 
FLIRT_YOU = FLIRT_YOU+"WAIT SECONDS=1" +nL; 
FLIRT_YOU = FLIRT_YOU+"TAG POS=1 TYPE=INPUT:TEXT FORM=NAME:NoFormName ATTR=NAME: CONTENT=" + FLIRT +nL; 
FLIRT_YOU = FLIRT_YOU+"WAIT SECONDS=1" +nL; 
FLIRT_YOU = FLIRT_YOU+"TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(FLIRT_YOU);


CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK=="Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME");
PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE);
}
else
{
SENDING = "CODE:";
SENDING = SENDING+"SET !ERRORIGNORE YES" + nL
SENDING = SENDING+"SET !TIMEOUT 10" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=ALT:Submit" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*white_x.gif" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
iimPlay(SENDING);
}
}

// Sticker

if (ST=="yes")
{
STICK_YOU = "CODE:";
STICK_YOU = STICK_YOU+"SET !ERRORIGNORE YES" + nL
STICK_YOU = STICK_YOU+"SET !TIMEOUT 10" +nL; 
STICK_YOU = STICK_YOU + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:largeActionIcon<SP>btnActionIcon<SP>aiIconPopUp*" +nL;  
STICK_YOU = STICK_YOU + "WAIT SECONDS=1" +nL; 
STICK_YOU = STICK_YOU+"TAG POS=1 TYPE=A ATTR=CLASS:btnActionIcon<SP>aiSticker" +nL; 
STICK_YOU = STICK_YOU+"WAIT SECONDS=4" +nL; 
STICK_YOU = STICK_YOU+"TAG POS=1 TYPE=SELECT FORM=NAME:NoFormName ATTR=ID:stickerSortBy CONTENT=%my" +nL; 
STICK_YOU = STICK_YOU+"WAIT SECONDS=5" +nL; 
STICK_YOU = STICK_YOU+"TAG POS=1 TYPE=IMG ATTR=ALT:stickerImage" +nL; 
STICK_YOU = STICK_YOU+"WAIT SECONDS=1" +nL; 
STICK_YOU = STICK_YOU+"TAG POS=1 TYPE=INPUT:IMAGE FORM=ID:mainForm ATTR=ID:stickerSubmit" +nL; 
STICK_YOU = STICK_YOU+"WAIT SECONDS=1" +nL; 
STICK_YOU = STICK_YOU+"TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(STICK_YOU);

CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK=="Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME");
PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE);
}
else
{
SENDING = "CODE:";
SENDING = SENDING+"SET !ERRORIGNORE YES" + nL
SENDING = SENDING+"SET !TIMEOUT 10" +nL; 
//SENDING = SENDING+"WAIT SECONDS=1" +nL; 
//SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=ALT:Submit" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*white_x.gif" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
iimPlay(SENDING);
}
}

// Pic Comment
if (PC=="yes")
{
PIC_YOU = "CODE:";
PIC_YOU = PIC_YOU+"SET !ERRORIGNORE YES" + nL
PIC_YOU = PIC_YOU+"SET !TIMEOUT 10" +nL; 
PIC_YOU = PIC_YOU + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:largeActionIcon<SP>btnActionIcon<SP>aiIconPopUp*" +nL;  
PIC_YOU = PIC_YOU + "WAIT SECONDS=1" +nL; 
PIC_YOU = PIC_YOU+"TAG POS=1 TYPE=A ATTR=CLASS:btnActionIcon<SP>aiPicture*" +nL; 
PIC_YOU = PIC_YOU+"WAIT SECONDS=5" +nL; 
PIC_YOU = PIC_YOU+"TAG POS=1 TYPE=A ATTR=TXT:Post<SP>Comment" +nL; 
PIC_YOU = PIC_YOU+"WAIT SECONDS=1" +nL; 
PIC_YOU = PIC_YOU+"TAG POS=1 TYPE=TEXTAREA FORM=NAME:NoFormName ATTR=ID:commentText CONTENT=" + PICCOMMENT +nL; 
PIC_YOU = PIC_YOU+"WAIT SECONDS=1" +nL; 
PIC_YOU = PIC_YOU+"TAG POS=1 TYPE=INPUT:IMAGE FORM=ID:mainForm ATTR=ID:btnPostComment" +nL; 
PIC_YOU = PIC_YOU+"WAIT SECONDS=1" +nL; 
PIC_YOU = PIC_YOU+"TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(PIC_YOU);

CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK=="Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, THEN HIT CONTINUE TO RESUME");
PAUSE = "CODE:";
PAUSE = PAUSE+"'Pausing, Continue when Ready" +nL; 
PAUSE = PAUSE+"SET !SINGLESTEP YES"  + nL; 
PAUSE = PAUSE+"SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE);
}
else
{
SENDING = "CODE:";
SENDING = SENDING+"SET !ERRORIGNORE YES" + nL
SENDING = SENDING+"SET !TIMEOUT 10" +nL; 
//SENDING = SENDING+"WAIT SECONDS=1" +nL; 
//SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=ALT:Submit" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
SENDING = SENDING+"TAG POS=1 TYPE=IMG ATTR=SRC:*white_x.gif" +nL; 
SENDING = SENDING+"WAIT SECONDS=1" +nL; 
iimPlay(SENDING);
}
}

// Gift

// Autograph

// Message

if (MS=="yes")
{
BEGIN_EMAILING = "CODE:";
BEGIN_EMAILING = BEGIN_EMAILING + "SET !ERRORIGNORE YES" + nL;
BEGIN_EMAILING = BEGIN_EMAILING + "SET !TIMEOUT 10" +nL; 
BEGIN_EMAILING = BEGIN_EMAILING + "TAG POS=" + POS + " TYPE=A ATTR=CLASS:btnActionIcon<SP>aiMessage*" +nL;  
BEGIN_EMAILING = BEGIN_EMAILING + "WAIT SECONDS=1" +nL; 
BEGIN_EMAILING = BEGIN_EMAILING + "TAG POS=1 TYPE=INPUT:TEXT ATTR=ID:aiPrompt CONTENT=" + SUBJECT + nL; 
BEGIN_EMAILING = BEGIN_EMAILING + "WAIT SECONDS=1" +nL; 
BEGIN_EMAILING = BEGIN_EMAILING + "TAG POS=1 TYPE=TEXTAREA FORM=NAME:NoFormName ATTR=ID:aiTextbox CONTENT=" + BODY +nL; 
BEGIN_EMAILING = BEGIN_EMAILING + "'Checking for Captchas" +nL; 
BEGIN_EMAILING = BEGIN_EMAILING + "WAIT SECONDS=1" +nL; 
BEGIN_EMAILING = BEGIN_EMAILING + "TAG POS=1 TYPE=IMG ATTR=ID:recaptcha_reload EXTRACT=ALT" +nL; 
iimPlay(BEGIN_EMAILING);

CAPTCHA_CHECK = iimGetLastExtract(1);

if (CAPTCHA_CHECK == "Get a new challenge")
{
alert("CAPTCHA Needs filled out, Script will Pause, Hit OK and Enter Captcha, then HIT SUBMIT" + '\n' + "Then in your IMacros Side Bar, PLEASE HIT CONTINUE TO RESUME");
PAUSE_FOR_PAGE_ADJUST = "CODE:";
PAUSE_FOR_PAGE_ADJUST = PAUSE_FOR_PAGE_ADJUST + "SET !SINGLESTEP YES"  + nL; 
PAUSE_FOR_PAGE_ADJUST = PAUSE_FOR_PAGE_ADJUST + "SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE_FOR_PAGE_ADJUST);
}
else
{
SENDING_EMAIL= "CODE:";
SENDING_EMAIL = SENDING_EMAIL + "SET !ERRORIGNORE YES" + nL
SENDING_EMAIL = SENDING_EMAIL + "SET !TIMEOUT 10" +nL; 
SENDING_EMAIL = SENDING_EMAIL + "WAIT SECONDS=2" +nL; 
SENDING_EMAIL = SENDING_EMAIL + "TAG POS=1 TYPE=IMG ATTR=ALT:Submit" +nL; 
SENDING_EMAIL = SENDING_EMAIL + "WAIT SECONDS=2" +nL; 
iimPlay(SENDING_EMAIL);
}
}


var POS = POS + 1;
}


NEXTPAGE_CHECK = "CODE:";
NEXTPAGE_CHECK = NEXTPAGE_CHECK + "WAIT SECONDS=2" +nL;
NEXTPAGE_CHECK = NEXTPAGE_CHECK + "TAG POS=2 TYPE=A ATTR=TXT:> EXTRACT=TXT " +nL;
NEXTPAGE_CHECK = NEXTPAGE_CHECK + "WAIT SECONDS=2" +nL;
iimPlay(NEXTPAGE_CHECK);

_NEXTPAGE_ARROW = iimGetLastExtract(1);
if (_NEXTPAGE_ARROW == ">")
{
SWITCH_PAGES = "CODE:";
SWITCH_PAGES = SWITCH_PAGES + "WAIT SECONDS=2" +nL; 
SWITCH_PAGES = SWITCH_PAGES + "TAG POS=2 TYPE=A ATTR=TXT:>" +nL; 
SWITCH_PAGES = SWITCH_PAGES + "WAIT SECONDS=4" +nL; 
iimPlay(SWITCH_PAGES);
}
else
{
alert("You have reached the end of the list" + '\n' + "Thank you for using the 0Pete Masser");
break;
}
CAPTCHA_BETWEEN_PAGES = "CODE:";
CAPTCHA_BETWEEN_PAGES = CAPTCHA_BETWEEN_PAGES + "SET !TIMEOUT 10" +nL; 
CAPTCHA_BETWEEN_PAGES = CAPTCHA_BETWEEN_PAGES + "WAIT SECONDS=1" +nL;
CAPTCHA_BETWEEN_PAGES = CAPTCHA_BETWEEN_PAGES + "TAG POS=1 TYPE=IMG ATTR=ID:captcha EXTRACT=ALT" +nL;
iimPlay(CAPTCHA_BETWEEN_PAGES);

_CAPTCHA = iimGetLastExtract(1);

if (_CAPTCHA == "Human Input Validation")
{

alert("CAPTCHA Needs filled out, Hit OK and Fill Out Captcha and HIT Submit" + '\n' + "Then in your IMacros Side Bar, PLEASE HIT CONTINUE TO RESUME");
PAUSE_FOR_PAGE_ADJUST = "CODE:";
PAUSE_FOR_PAGE_ADJUST = PAUSE_FOR_PAGE_ADJUST + "'Pausing, Continue when Ready" +nL; 
PAUSE_FOR_PAGE_ADJUST = PAUSE_FOR_PAGE_ADJUST + "SET !SINGLESTEP YES"  + nL; 
PAUSE_FOR_PAGE_ADJUST = PAUSE_FOR_PAGE_ADJUST + "SET !SINGLESTEP NO"  + nL;
iimPlay(PAUSE_FOR_PAGE_ADJUST);
}
}
}