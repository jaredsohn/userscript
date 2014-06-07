// ==UserScript==
// @name           Muteki Reskin
// @namespace      2010-05-17-muteki@avaeda
// @description    Re-skins the Muteki Anime bittorrent tracker.
// @include        http://tracker.muteki-anime.com/*
// ==/UserScript==

var style = "http://pastebin.com/download.php?i=RZucz8Mx";

// If this page is part of the forum
if (window.location.pathname.indexOf("/smf/") == 0) {
	//TODO: use the forum style. For now we do nothing.
	GM_log("skipping restyle for a forum page");
	return;
}

// Iterate over all the linked stylesheets on the document
var links = document.getElementsByTagName( "link" );
var lastLink;
for (var idx = 0; idx < links.length; idx++) {
	// If this link element is a stylesheet
	if (links[idx].getAttribute("rel").toLowerCase().indexOf("style") != -1) {
		lastLink = links[idx];
		// If this is a primary stylesheet, make it an alternate
		if (lastLink.getAttribute("rel").toLowerCase().indexOf("alt") == -1)
			lastLink.setAttribute("rel", "alternate stylesheet");
		// If this stylesheet is persistent, make it part of the default style
		if (!lastLink.hasAttribute("title"))
			lastLink.setAttribute("title", "Default Style");
	}	
}

// Add the new stylesheet
//var link = document.createElement("link");
//link.setAttribute("type", "text/css");
//link.setAttribute("href", style);
//link.setAttribute("rel", "stylesheet");
//link.setAttribute("title", "Dark");
//lastLink.parentNode.insertBefore (link, lastLink.nextSibling);

var elem = document.createElement("style");
elem.setAttribute("type", "text/css");
elem.setAttribute("rel", "stylesheet");
elem.setAttribute("title", "Dark");
lastLink.parentNode.insertBefore (elem, lastLink.nextSibling);

// Use sneaky E4X here-doc to set style contents
elem.innerHTML = ""+<r><![CDATA[
/* Color Scheme:
 * #1D1E21 - Background
 * #26272B - Sections
 * #2D2E33 - Data Rows
 * #40424A - Data Headers
 * #5E616B - Section Headers
 *
 */

/* ######### Start Main Tracker Body ######### */
body {
    font-family: tahoma, arial, helvetica, sans-serif;
    font-size: 8pt;
    background: #1D1E21;
	color: #B4B8CC;
    margin: 10px 12px 20px 8px;
    padding: 0;
}

.highlight {
  background: #F8F81A;
  color: #FF0000;
}

/* A quote, perhaps from another post. */
.quote {
    color: #000;
    background-color: #D7DAEC;
    border-style: inset;
    border-width: 1px solid;
    border-color: #000;
    margin: 1px;
    padding: 1px;
    font-size: x-small;
    line-height: 1.4em;
}

/* A code block - maybe even PHP ;). */
.code {
    color: #000;
    background-color: #ECECEC;
    font-family: "courier new", "times new roman", monospace;
    font-size: x-small;
    line-height: 1.3em;
    /* Put a nice border around it. */
    border-style: inset;
    border-width: 1px solid;
    border-color: #000;
    margin: 1px auto 1px auto;
    padding: 1px;
    width: 99%;
    /* Wrap its contents, and show scrollbars. */
    white-space: wrap;
    overflow: auto;
    /*Stop after about 24 lines, and just show a scrollbar.*/ 
    max-height: 10em;
}

.post {
  border:1px solid #4E7FCD;
  background-color: #E8EFF7;
  padding:0px;
  margin:1px;
  color:#000000;
  line-height: 1.4em;
  text-align:left;
  white-space:wrap;
    overflow: auto;
}

img {
  border:0px;
}

textarea {
    display: block;
    overflow: auto;
    line-height: 1.4em;
    background: #2D2E33;
    color: #B4B8CC;
    border: 1px solid #5E616B;
}

input {
    background: #2D2E33;
    color: #B4B8CC;
    border: 1px solid #5E616B;
}

select {
    /* This is flagged as important to force correct coloration of the
     * select boxen in the PM editor, which use inline styles. */
    background: #2D2E33 !important;
    color: #B4B8CC;
    border: 1px solid #5E616B;
}

.btn {
    cursor: pointer;
}

select.drop_pager {
    font-size: 10px;
}

.pager {
    background: #2D2E33;
    padding: 1px 3px 1px 3px;
    border: 1px solid #5E616B;
}

.pagercurrent {
    background: #40424A;
    padding: 1px 3px 1px 3px;
    border: 1px solid #5E616B;
}

.pager a:link,
.pager a:visited,
.pagercurrent a:link,
.pagercurrent a:visited {
    text-decoration:none;
}

.pager a:hover,
.pagercurrent a:hover {
    text-decoration:none;
}

#main {
    display:block; 
    width:100%;
    padding:2px;
    margin: 10px auto;
}

#logo {
    background: url("images/logo_bg.jpg");
    background-repeat: repeat-x;
    height:100px;
    width:100%;
}

.tracker_logo {
    background: url("images/logo.jpg") no-repeat; 
    align:center; 
    height:100px; 
    width:750px;
}

#header{
    width:100%;
}
#nocolumns { width:100%; align:center; }
#footer{
    /*background: #DDE5EB;*/
    height:100px;
    width:100%;
}

div.chat {
/* Wrap its contents, and show scrollbars. */
    white-space: wrap;
    overflow: auto;
    max-height: 30em;
    width: 100%;
    padding: 0px;
}


a:link,a:active,a:visited {
	color: #9296A6;
	text-decoration: none;
}
a:hover {
	text-decoration: none;
	color: #EE4000;
}

h1 {
    font-size: 12pt;
}

p {
    font-size: 10pt;
}

table {
    border: 0px;
}

table.lista {
    background: #26272B;
    border: 1px solid #ADADAD;
}

td.block {
    background: #5E616B;
    height:25px;
    padding-left: 3px;
    padding-right: 3px;
}

td.blocklist {
    background: #2D2E33;
    padding: 2px;
    margin: 0px;
    font-size: 8pt;
    font-weight: bold;
}

td.lista {
    background: #2D2E33;
    padding: 2px;
    margin: 0px;
    font-size: 8pt;
    text-align:left;
}

td {

}

td.header {
    height:27px;
    font-style: normal;
    background: #40424A;
    padding-left: 5px;
    padding-right: 5px;
}

td.title {
    font-size: 8pt;
}

td.navigation {
    background-color: #DDE5EB;
    font-weight: bold;
    font-size: 8pt;
}

form {
    margin-top: 0;
    margin-bottom: 0;
}

.sublink {
    font-style: italic;
    font-size: 7pt;
    font-weight: normal;
}

a.index {
    font-weight: bold;
}

a.biglink {
    font-weight: bold;
    font-size: 10pt;
}

.important {
    font-weight: bold;
    font-size: 10pt;
}

td.red {
    color: red;
    background: #2D2E33;
}


td.yellow {
    color: #BEC635;
    background: #2D2E33;
}


td.green {
    color: green;
    background: #2D2E33;
}

td.progress {
    padding: 0px;
    background-image: url(images/backprogress.gif);
    background-repeat: repeat-x;
    height: 10px;
}

td.red a:link {
    color: red;
}
td.red a:visited {
    color: red;
}

td.yellow a:link {
    color: #BEC635;
}
td.yellow a:visited {
    color: #BEC635;
}

td.green a:link {
    color: green;
}

td.green a:visited {
    color: green;
}
li{
list-style-position:inside;
} 

.error { color:black; font-weight: bold; font-size: 14pt; background:url(images/chr.gif); background-repeat: repeat-x;}
.information { color:black; font-weight: bold; font-size: 14pt; background:url(images/chb.gif); background-repeat: repeat-x;}
.success { color:black; font-weight: bold; font-size: 14pt; background:url(images/chg.gif); background-repeat: repeat-x;}

/* ######### End Main Tracker Body ######### Start Ajax Poll System ######### */

td.deleted {
    background-color:#FF95AC;
    color:#000000;
}

td.added {
    background-color:#C1FF83;
    color:#000000;
}

td.modified {
    background-color:#DEDEDE;
    color:#000000;
}

#mainContainer {
    width: 100%;
    overflow: auto;
    text-align: left;
}

#mainContent {
    padding: 0px;
}
  
.clear {
    clear: both;
}

.poller {  /* The poller box */
  
    width:100%;
    /*background:#DDE6EF;*/
        overflow:hidden;
}

.pollerTitle {  /* Poller title above radio buttons */
    margin-top:0px;
    margin-bottom:5px;
    font-weight:bold;
    font-size:1em;
}

.pollerOption {  /* Label for each radio button */
    margin:0px;
}

.result_pollerOption {  /* Label for each option above graph - i.e. results */
    margin:0px;
    font-size:0.8em;
}

.result_pollerTitle {  /* Title of poller - when ajax shows the results */
    margin-top:0px;
    margin-bottom:5px;
    font-weight:bold;
    font-size:1em;
}

.result_pollGraph img {  /* Don't change this one, it is used to get the left and right image(the corner) positioned correctly */
    float:left;
}

.result_pollGraph div {  /* The <div> tag where the percentage result is shown */
    float:left;
    height:12px;
    background-repeat:repeat-x;
    color:#FFF;
    font-size:0.9em;
    line-height:16px;
}

.result_pollGraph {  /* Graph div - parent of both the corner images and the div displaying percentage votes */  
    height:12px;
}
  
.poller_waitMessage {  /* Message when Ajax is working getting restults fromt the server */
    display:none;  
}  

.result_totalVotes{
    clear:left;
    font-size:0.8em;
    margin-top:10px;
    font-style:italic;
    background:transparent;
}

th {
    text-align:left;
}
.formButton {
    width:75px;
}
/* ######### End Ajax Poll System ######### Start Ajax Chat ######### */
#chat {
overflow: auto;
width: 100%;
height: 220px;
padding: 0px;
}

#chatoutput ul {
    list-style: none;
    margin:0px;
    padding:0px;
    padding:5px 4px 6px 5px;
}

div.chatoutput {
    background:#dde6ef;
    padding:5px 0px 3px 10px;
    margin:0px;
    color:#006699;
    line-height: 150%;
    margin-bottom:2px;
}

div.loader {
background-image: url('images/ajaxchat/loading.gif'); 
background-repeat: no-repeat; 
background-position:center center; 
width:32px; 
height:32px;
}

#chatoutput ul li {
}

#chatoutput ul li span.name {
    display: block;
    background:url(images/ajaxchat/bubble.png) no-repeat left;
    padding-left:19px;
      margin-bottom:1px;
    font-weight: normal;
    color: #000;
}

#chatoutput ul li:hover span.name {
    background:url(images/ajaxchat/bubblehover.png) no-repeat left;
}

form {
    padding:0px;
    margin:6px;
}

#chatoutput {
    text-align: left;
    margin-right: 0px;
}

/* swaps edit and delete images on mouse over */
img.EditSwap {
background:url(images/ajaxchat/shout_edit_gray.gif) no-repeat bottom;
}
img.EditSwap:hover {
background:url(images/ajaxchat/shout_edit.png) no-repeat bottom; 
}
img.DeleteSwap {
background:url(images/ajaxchat/shout_delete_gray.gif) no-repeat bottom;
}
img.DeleteSwap:hover {
background:url(images/ajaxchat/shout_delete.png) no-repeat bottom; 
}
/* end of swaping */

img.form {
background:url(images/ajaxchat/frame.png) no-repeat;
}
img.form:hover {
background:url(images/ajaxchat/frame_hover.png) no-repeat;
}
/* ######### End Ajax Chat ######### */
]]></r>;
