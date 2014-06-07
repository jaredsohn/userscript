/*
Another Dark 4chan Stylesheet .20100504 by lilmoder
  __                                    
 /\ \                                   
 \_\ \    ___     ___      __     ____  
 /'_` \  / __`\ /' _ `\  /'_ `\  /',__\ 
/\ \L\ \/\ \L\ \/\ \/\ \/\ \L\ \/\__, `\
\ \___,_\ \____/\ \_\ \_\ \____ \/\____/
 \/__,_ /\/___/  \/_/\/_/\/___L\ \/___/ 
                           /\____/      
                           \_/__/       

oh god what is all this :<
*/
// ==UserScript==

// @name           4chan dark style

// @namespace      http://what.cd/forums.php?action=viewthread&threadid=59546

// @description    Sexy

// @include        http://boards.4chan.org/*

// @include        http://rs.4chan.org/*

// @version        0.1

// @date           2011-08-03

// ==/UserScript==
/* If you install this using "Stylish" addon, before applying this stylesheet search for lines with "STYLISH" (case sensitive) and follow the instructions! */

/* ATTENTION "STYLISH" ADDON USERS: REMOVE THIS LINE!
@name Aww yeah
@namespace url(http://www.w3.org/1999/xhtml);
@-moz-document domain("boards.4chan.org"), domain("rs.4chan.org")  {

ATTENTION "STYLISH" ADDON USERS: REMOVE THIS LINE! */

/* ///////////// MAIN ///////////// */

.spoiler
{
text-shadow: none !important;
border-radius: 5px !important;
-moz-border-radius: 5px !important;
-khtml-border-radius: 5px !important;
-webkit-border-radius: 5px !important;
border: 1px transparent solid !important;
padding-left: 3px !important;
padding-right: 3px !important;
}

.logo img, .rules, .postarea>
form>
table>
tbody>
tr>
td>
small, .postarea>
form>
div, #footer center, #logo, #copyright
{
display: none !important;
}

hr
{
border: none !important;
}

.postarea>
form>
table>
tbody>
tr>
td>
input.inputtext,
.postarea>
form>
table>
tbody>
tr>
td>
textarea.inputtext,
.postarea>
form>
table>
tbody>
tr>
td>
input
{
width: 350px !important;
}

.postarea>
form>
table
{
width: 410px !important;
}

.postarea { 
padding-left: 0px !important;
}

body
{
top: 0px !important;
left: 0px !important;
margin: 0px !important;
}

.doubledash
{
margin-right: 3px !important;
color: #4f4f4f !important;
text-shadow: none !important;
}

html, body, blockquote, font, b, td, input, h2, small, /* ATTENTION "STYLISH" ADDON USERS: REMOVE "input, " FROM THIS LINE! */
.filesize, .filetitle, .omittedposts, .abbr, .inputtext, .replytitle, /*  ATTENTION "STYLISH" ADDON USERS: REMOVE ".inputtext, " FROM THIS LINE! */
#header, #footer, #navbot, #navbotr
{
font-family: DejaVu, sans-serif !important;
font-size: 9pt !important;
color: #d2d2d2 !important;
}

/*  ATTENTION "STYLISH" ADDON USERS: REMOVE THIS LINE
input, .inputtext
{
font-family: Calibri !important;
font-size: 9pt !important;
}
ATTENTION "STYLISH" ADDON USERS: REMOVE THIS LINE */

.replyhl, .reply
{
padding: 3px !important;
}

.filetitle, .replytitle
{
margin-left: 5px !important;
}

.reply, .replyhl, .postblock, .pages, th, .box-outer, #navtop, #navbot
{
border-radius: 5px !important;
-moz-border-radius: 5px !important;
-khtml-border-radius: 5px !important;
-webkit-border-radius: 5px !important;
background-color: #3f3f3f!important;
border: #4f4f4f solid 1px !important;
}

#navtop, #navbot
{
padding: 3px !important;
margin-top: 5px !important;
margin-bottom: 5px !important;
}

.box-outer
{
margin: 5px !important;
}

.replyhl
{
border: #c0dbff solid 1px !important;
box-shadow:0px 0px 2px #000000 !important;
-moz-box-shadow:0px 0px 2px #000000 !important;
-khtml-box-shadow:0px 0px 2px #000000 !important;
-webkit-box-shadow:0px 0px 2px #000000 !important;
}

.replyhl>
blockquote
{

}

th
{
margin-bottom: 5px !important;
display: block !important;
}

.inputtext
{
border: #7b7b7b solid 1px !important;
background-color: #595959 !important; 
}

.inputtext:focus
{
border: #c0dbff solid 1px !important;
}

.inputtext:active
{
border: #c0dbff dotted 1px !important;
}

input
{
border: #7b7b7b solid 1px !important;
background-color: #494949 !important;
font-weight: bold !important;
}

input:focus
{
border: #c0dbff solid 1px !important;
}

input:active
{
border: #c0dbff dotted 1px !important;
}

.postarea>
form>
table>
tbody>
tr>
td>
input
{
margin-top: 1px !important;
}

.deletebuttons>
input
{
margin-right: 5px !important;
}

/* ///// .reply, .replyhl
{
width: 500px !important;
}

.postblock
{
border-radius: 0px !important;
-moz-border-radius: 0px !important;
-khtml-border-radius: 0px !important;
-webkit-border-radius: 0px !important;
} ///// */

body, html
{
background-image: none !important;
background-color: #2F2F2F !important;
}

.postername, .commentpostername
{
color: #ffa200 !important;
}

.postertrip
{
color: #ff00a2 !important;
}

.unkfunc
{
color: #b8ffb5 !important;
}

.postarea>td>.inputtext, .postarea>
form>
table>
tbody>
tr>
td>
input
{
height: 20px !important;
}

.postblock
{
height: 20px !important;
}

a
{
color: #c0dbff !IMPORTANT;
text-decoration: none !important;
}

a:hover
{
border-bottom: 1px dotted #c0dbff !important;
}

.logo b span
{
font-family: DejaVu Sans !important;
font-size: 26pt !important;
color: #d2d2d2 !important;
letter-spacing: normal !important;
}

form a img
{
border-radius: 2px !important;
-moz-border-radius: 2px !important;
-khtml-border-radius: 2px !important;
-webkit-border-radius: 2px !important;
}

form a img, .boxcontent>
img
{
margin-top: 5px !important;
margin-bottom: 5px !important;
border: #d2d2d2 1px solid !important;
box-shadow:0px 0px 5px #000000 !important;
-moz-box-shadow:0px 0px 5px #000000 !important;
-khtml-box-shadow:0px 0px 5px #000000 !important;
-webkit-box-shadow:0px 0px 5px #000000 !important;
}

form a img:hover
{
border: 1px solid #c0dbff !important;
}

form a img a:hover
{
border: none !important;
}

form a img:active
{
border: 1px dotted #c0dbff !important;
}

.reply>
input, .replyhl>
input, .checkbox, label.pointer>
input, html>
body>
form>
input
{
border-radius: 2px !important;
-moz-border-radius: 2px !important;
-khtml-border-radius: 2px !important;
-webkit-border-radius: 2px !important;
box-shadow: inset 0px 0px 2px #000000 !important;
-moz-box-shadow: inset 0px 0px 2px #000000 !important;
-khtml-box-shadow: inset 0px 0px 2px #000000 !important;
-webkit-box-shadow: inset 0px 0px 2px #000000 !important;
}

.boxbar
{
background-color: transparent !important;
background-image: none !important;
}

/* //////////// CHANCHIMP //////////// */

#cc-newpostarea, #cc-newpostarea2, #cc-newpostarea.chanchimp>
div
{
background-color: #313131 !important;
}

#cc-templatesmenu, #cc-prefbox.chanchimp>
div, #cc-showpostarea.chanchimp, #cc-newpostarea2 
{
border-radius: 5px !important;
-moz-border-radius: 5px !important;
-khtml-border-radius: 5px !important;
-webkit-border-radius: 5px !important;
background-color: #3f3f3f!important;
border: #4f4f4f solid 1px !important;
box-shadow:0px 0px 2px #000000 !important;
-moz-box-shadow:0px 0px 2px #000000 !important;
-khtml-box-shadow:0px 0px 2px #000000 !important;
-webkit-box-shadow:0px 0px 2px #000000 !important;
font-size: 9pt !important;
color: #d2d2d2 !important; 
text-shadow:0px -1px 0px #1d1d1d !important;
}

#cc-newpostarea
{
border-top: #4f4f4f solid 1px !important;
box-shadow:0px 0px 2px #000000 !important;
-moz-box-shadow:0px 0px 2px #000000 !important;
-khtml-box-shadow:0px 0px 2px #000000 !important;
-webkit-box-shadow:0px 0px 2px #000000 !important;
}

#cc-fields1>
textarea.inputtext
{
width: 100% !important;
}

#cc-dragpopup
{
background-color: #3f3f3f !important;
}

#cc-prefbox.chanchimp>
div>
div, #cc-prefbox.chanchimp>
div>
form>
div
{
border: none !important;
}

#cc-showpostarea.chanchimp
{
padding: 5px !important;
border-bottom: none !important;
border-right: none !important;
border-top-right-radius: 0px !important;
-moz-border-top-right-radius: 0px !important;
-khtml-border-top-right-radius: 0px !important;
-webkit-border-top-right-radius: 0px !important;
border-bottom-right-radius: 0px !important;
-moz-border-bottom-right-radius: 0px !important;
-khtml-border-bottom-right-radius: 0px !important;
-webkit-border-bottom-right-radius: 0px !important;
border-bottom-left-radius: 0px !important;
-moz-border-bottom-left-radius: 0px !important;
-khtml-border-bottom-left-radius: 0px !important;
-webkit-border-bottom-left-radius: 0px !important;
}

.forwardlinks>
font>
table
{
border: none !important;
}

.chanchimp>
div>
form>
div>
textarea 
{
font-family: DejaVu Sans !important;
font-size: 9pt !important;
color: #d2d2d2 !important; /*  ATTENTION "STYLISH" ADDON USERS: REMOVE THIS LINE! */
border: #7b7b7b solid 1px !important;
background-color: #595959 !important;
}

#cci-form-container>
tbody>
tr>
td#cc-fields1>
input, .chanchimp>
div>
form#post>
table#cci-form-container2>
tbody>
tr>
td#cc-fields1-2>
input
{
margin-left: 5px !important;
}

#cc-newpostarea.chanchimp>
div>
form#post>
table#cci-form-container>
tbody>
tr>
td#cc-fields1>
span#cci-newthread-floater>
input#cci-newthread
{
box-shadow: inset 0px 0px 2px #000000 !important;
-moz-box-shadow: inset 0px 0px 2px #000000 !important;
-khtml-box-shadow: inset 0px 0px 2px #000000 !important;
-webkit-box-shadow: inset 0px 0px 2px #000000 !important;
}

#cc-dragpopup>
a
{
padding-left: 5px !important;
}

#vai-wrapper
{
background-color: #313131 !important;
border: #4f4f4f solid 1px !important;
box-shadow: 0px 0px 2px #000000 !important;
-moz-box-shadow: 0px 0px 2px #000000 !important;
-khtml-box-shadow: 0px 0px 2px #000000 !important;
-webkit-box-shadow: 0px 0px 2px #000000 !important;
}

#vai-wrapper>
table
{
background-color: #3f3f3f!important;
border: #4f4f4f solid 1px !important;
}

blockquote>
font.unkfunc>
table
{
border: none !important;
}

/* //////////// YA4CIE //////////// */

.filesize>
span>
label.pointer, .filesize>
span>
select
{
margin-left: 5px !important;
}

#ya4cie.reply
{
width: 180px !important;
}

/* /////////// LOL FAILBOOK /////////// */
#fb_tr
{
display: none !important;
}

/* ///////////// 4CHAN X //////////// */
#updater.reply
{
width: 70px !important;
padding: 3px !important;
}

#tw.reply
{
width: 250px !important;
}

#options.reply
{
width: 180px !important;
}

/* ///////////// 4CHANX UPDATER //////////// */
#updater
{
opacity: 0.4 !important;
margin: 0px !important;
}

#updater:hover
{
opacity: 1.0 !important;
}

#updater.reply
{
text-align: center;
width: 100px !important;
padding: 5px !important;
border: #4f4f4f solid 1px !important;
box-shadow: 0px 0px 2px #000000 !important;
-moz-box-shadow: 0px 0px 2px #000000 !important;
-khtml-box-shadow: 0px 0px 2px #000000 !important;
-webkit-box-shadow: 0px 0px 2px #000000 !important;
color: #d2d2d2 !important;
}

#status.new
{
background-color: transparent !important;
background: transparent !important;
font-weight: bold !important;
}

/* ///////////// 4CHAN FILTER //////////// */

#thread_filter.reply
{
width: 242px !important;
font-family: DejaVu Sans !important;
font-size: 9pt !important;
color: #d2d2d2 !important;
box-shadow:0px 0px 2px #000000 !important;
-moz-box-shadow:0px 0px 2px #000000 !important;
-khtml-box-shadow:0px 0px 2px #000000 !important;
-webkit-box-shadow:0px 0px 2px #000000 !important;
line-height: 20px !important;
opacity: 0.4 !important;
}

#thread_filter.reply:hover
{
opacity: 1 !important;
}

/* ///////////// MISC ///////////// */
gmmenoo
{
padding: 3px !important;
border-radius: 5px !important;
-moz-border-radius: 5px !important;
-khtml-border-radius: 5px !important;
-webkit-border-radius: 5px !important;
background-color: #3f3f3f!important;
border: #4f4f4f solid 1px !important;
border-top: none !important;
border-top-left-radius: 0px !important;
}

/* ///// ADDED BY ME ///// */
.quotelink
{
font-weight:bold;
}

/* ATTENTION "STYLISH" ADDON USERS: REMOVE THIS LINE!

}

ATTENTION "STYLISH" ADDON USERS: REMOVE THIS LINE! */