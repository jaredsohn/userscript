// ==UserScript==
// @name           FriendFeed Dark Theme
// @version        0.1
// @namespace      FriendFeed Dark Theme
// @description    Makes FriendFeed Darker     
// @author         Brandon Partridge
// ==/UserScript==


@namespace url(http://www.w3.org/1999/xhtml);

@-moz-document domain("friendfeed.com") {

/*----FriendFeed Dark Theme v.1----

Author: Brandon Partridge (http://friendfeed.com/partridge) 
Official Updates: http://friendfeed.com/rooms/friendfeed-dark

----FriendFeed Dark Theme v.1----*/

body {
background-color:black !important;
margin:0pt;
position:relative;
}


/*side bar*/
.rounded {
background-color:black !important;
}
/*end side bar*/
#sharedialog .content {
background: #111 !important;
}
#sharedialog .content, #sharedialog .lhs .body {
background-color:#111 !important;
}
#sharedialog .rhs, #sharedialog .rhs .body {
background-color:#222 !important;
white-space:nowrap;
}

#sharedialog .tl {
background:transparent !important;
left:0pt;
top:0pt;
}
#sharedialog .bl {
background:transparent !important;
bottom:0pt;
left:0pt;
}
#sharedialog .tr {
background:transparent !important;
right:0pt;
top:0pt;
}
#sharedialog .br {
background:transparent !important;
bottom:0pt;
right:0pt;
}



#tabhead {
background-color:black !important;
border-bottom:1px solid #222 !important;
}

#tabhead img {

}

.logo img {
filter:alpha(opacity=20) !important;
-moz-opacity:.20 !important;
opacity:.20 !important;

}

#subtabs, .rounded.blue {
background-color:#222 !important;
}
.feed .entry .media img {
border:1px solid #333333 !important;
padding:3px;
}
body, input, textarea, select, select option {
color:#999 !important;
font-family:Arial,sans-serif;
font-size:10pt;
}

/*EDIT BELOW FOR LINK COLORS*/
.feed .entry .link a:visited {
color:#1030cc  !important;
}
a, a:visited, a.n, a.n:visited {
color:#1030cc  !important;
}
/*EDIT ABOVE FOR LINK COLORS*/

.feed .entry .comments textarea {
color:black !important;
width:35em;
}

.popupmenu .foreground a {
background-color:#111 !important;
display:block;
padding:4px 5px;
}
.userpopup {
background:#111 !important;
border-color:-moz-use-text-color #333 !important;
border-style:none solid solid;
border-width:2px 2px 2px 2px !important;
margin-left:4px;
margin-top:4px;
padding:10px;
z-index:2;
}
.info {
font-weight:bolder !important;
font-style:italic !important;
}
.info a {
font-weight:normal !important;
}
.summary {
font-weight:bolder !important;
}
.summary a {
font-weight:bolder !important;
}



/*rounded images*/
.rounded .t {
background:transparent !important;
}
.rounded.white .t, .rounded.blue .t {
background-image:url(/static/images/r-b.png?v=1);
}
.rounded.subtab .t {
background:transparent none repeat scroll 0% 0%;
}
.rounded .b {
background:transparent !important;
}
.rounded.subtab .b {
background:transparent none repeat scroll 0% 0%;
}
.rounded .l {
background:transparent !important;
}
.rounded.subtab .l {
background:transparent none repeat scroll 0% 0%;
}
.rounded .r {
background:transparent !important;
}
.rounded.subtab .r {
background:transparent none repeat scroll 0% 0%;
}
.rounded .tl {
background:transparent !important;
}
.rounded.white .tl {
background-image:url(/static/images/r-tl-w.png?v=1);
}
.rounded.bb .tl {
background-image:url(/static/images/r-b-tl.png?v=1);
}
.rounded.bb.white .tl {
background-image:url(/static/images/r-b-tl-w.png?v=1);
}
.rounded.blue .tl {
background-image:url(/static/images/r-b-tl-b.png?v=1);
}
.rounded.subtab .tl {
background-image:url(/static/images/rs-tl.png?v=1);
}
.rounded.wg .tl {
background-image:url(/static/images/r-w-tl.png?v=1);
}
.rounded.green .tl {
background-image:url(/static/images/r-g-tl.png?v=1);
}
.rounded .tr {
background:transparent !important;
}
.rounded.white .tr {
background-image:url(/static/images/r-tr-w.png?v=1);
}
.rounded.bb .tr {
background-image:url(/static/images/r-b-tr.png?v=1);
}
.rounded.bb.white .tr {
background-image:url(/static/images/r-b-tr-w.png?v=1);
}
.rounded.blue .tr {
background-image:url(/static/images/r-b-tr-b.png?v=1);
}
.rounded.subtab .tr {
background-image:url(/static/images/rs-tr.png?v=1);
}
.rounded.wg .tr {
background-image:url(/static/images/r-w-tr.png?v=1);
}
.rounded.green .tr {
background-image:url(/static/images/r-g-tr.png?v=1);
}
.rounded .bl {
background:transparent !important;
}
.rounded.wg .bl {
background-image:url(/static/images/r-w-bl.png?v=1);
}
.rounded.green .bl {
background-image:url(/static/images/r-g-bl.png?v=1);
}
.rounded.bb .bl {
background-image:url(/static/images/r-b-bl.png?v=1);
}
.rounded.subtab .bl {
background:transparent none repeat scroll 0% 0%;
}
.bubbletabs .rounded.subtab .bl {
background:transparent !important;
}
.rounded .br {
background:transparent !important;
}
.rounded.wg .br {
background-image:url(/static/images/r-w-br.png?v=1);
}
.rounded.green .br {
background-image:url(/static/images/r-g-br.png?v=1);
}
.rounded.bb .br {
background-image:url(/static/images/r-b-br.png?v=1);
}
.rounded.subtab .br {
background:transparent none repeat scroll 0% 0%;
}
.bubbletabs .rounded.subtab .br {
background:transparent url(/static/images/rs-br.png?v=1) no-repeat scroll right bottom;
}
.rounded.wg .t, .rounded.wg .l, .rounded.wg .r, .rounded.wg .b {
background-image:url(/static/images/r-w.png?v=1);
}
.rounded.green .t, .rounded.green .l, .rounded.green .r, .rounded.green .b {
background-image:url(/static/images/r-g.png?v=1);
}

/*input overrides*/
INPUT {
background-color: #777 !important;
color: black !important;
}

TEXTAREA {
background-color: #777 !important;
color: black !important;
}

}