// ==UserScript==
// @name           pof spam script
// @namespace      pof
// @include        http://www.plentyoffish.com/*
// ==/UserScript==







var SPAM_COMMENT = new Array();
SPAM_COMMENT[0] = "Hello gorgeous";
SPAM_COMMENT[1] = "Hello sexy ";
SPAM_COMMENT[2] = "Hello Sweety";
SPAM_COMMENT[3] = "Hiya lovely";
SPAM_COMMENT[4] = "Hiya sexy";
SPAM_COMMENT[5] = "Hiya beautiful";
SPAM_COMMENT[6] = "Hiya honey";
SPAM_COMMENT[7] = "Hey there lovely";
SPAM_COMMENT[8] = "Hey there luvvy";
SPAM_COMMENT[9] = "Heyaxxxx";


var SPAM_SUBJECT = new Array();
SPAM_SUBJECT[0] = "xxxxxxxxxxxx";
SPAM_SUBJECT[1] = "hmm bit of a long shot lol";
SPAM_SUBJECT[2] = "maybe i should say this ";
SPAM_SUBJECT[3] = "lol dont go mental but..";
SPAM_SUBJECT[4] = " heyzzzzzzzzzzzzz xx";
SPAM_SUBJECT[5] = "hiya im sam.. not far from you";
SPAM_SUBJECT[6] = " hmm bit of a long shot lol";
SPAM_SUBJECT[7] = "maybe i should say this (long shot) ";
SPAM_SUBJECT[8] = "lol dont go mental but..";


var SPAM_HELLO = new Array();
SPAM_HELLO[0] = "Heyaaaaa i'm dave";
SPAM_HELLO[1] = "hi im dave";
SPAM_HELLO[2] = "Heyasss im dave";
SPAM_HELLO[3] = "HEYA XX ";
SPAM_HELLO[4] = "heya x";
SPAM_HELLO[5] = "< HELLO <3";
SPAM_HELLO[6] = "hi im sam";
SPAM_HELLO[7] = "Heyasss im dave";
SPAM_HELLO[8] = "HEYA XX ";
SPAM_HELLO[9] = "heya x";


var SPAM_KISSES = new Array();
SPAM_KISSES[0] = "xxcxx xxxx";
SPAM_KISSES[1] = "x xx";
SPAM_KISSES[2] = " xxxxx  xxxxxx";
SPAM_KISSES[3] = "xxxccxxxxx<3";
SPAM_KISSES[4] = "  ccxxxxxx xxxxxxxx";
SPAM_KISSES[5] = "<3xxcx xxxxx<3";
SPAM_KISSES[6] = "xxcxx xxxx";
SPAM_KISSES[7] = "x xx";
SPAM_KISSES[8] = "xxxxx  xxxxxx";


var MySpamCounterSubject = GM_getValue("MySpamCounterSubject",0);
var MySpamCounterMessage = GM_getValue("MySpamCounterMessage",0);


if (window.location.href.indexOf('viewprofile.aspx?profile_id=') != -1)
{
	if (MySpamCounterMessage > 9)
		MySpamCounterMessage = 0;
		
	if (MySpamCounterSubject > 8)
		MySpamCounterSubject = 0;
	
	var subjectstring, commentstring;
	
	commentstring=SPAM_HELLO[MySpamCounterMessage] + " " + SPAM_KISSES[MySpamCounterSubject] + "\n\n" + SPAM_COMMENT[MySpamCounterMessage];
	
	document.getElementsByName('message')[0].value=commentstring;
	document.getElementsByName('subject')[0].value=SPAM_SUBJECT[MySpamCounterSubject];

	MySpamCounterMessage++;
	GM_setValue("MySpamCounterMessage",MySpamCounterMessage);
		
	MySpamCounterSubject++;
	GM_setValue("MySpamCounterSubject",MySpamCounterSubject);
}