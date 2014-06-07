// ==UserScript==
// @name           StudiVZ in Dunkelblau
// @namespace      http://www.bistr-o-mahik.org
// @description    StudiVZ in Dunkelblau, passend zum Redesign vom 7. Februar 2008.
// @include        http://*studivz.net/*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
var cssdata = (<r><![CDATA[
/* StudiVZ dark blue style by Florian Jung */
body {color:#333;}
#pageHeader {background:#68b; margin-top:2px; border-color:#369;}
#pageFooter {background:#cde; border: 1px solid #369;}
#content {border-color:#369;}
#logo a img {display:none;}
#logo a {display:block; height:64px;}
#logo {background:url(data:image/gif;base64,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) 0 0 no-repeat;}
#topHeader{background:#036 url(data:image/png;base64,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);}
/* =headings */
h2, .mH {color:#479; background:#cde; border:1px solid #369; border-width:1px 0 !important; line-height: 1.6em}
h3 {color:#000;}
#startLeft h2 {border-color:#369;}
/* =links */
a {color:#147}
a:hover {color:#000;}
.linkList a:hover {background:#cde; color: #000;}
#GroupsSnipplet li a, .coursesColumn li a {display:block; line-height:1.7em; border-bottom:1px solid #f6f6f6;}
#GroupsSnipplet li a:hover, .coursesColumn li a:hover {background:#def; text-decoration:none;}
.pinboard_Entry p a {color:#147;}
.pinboard_Entry p a:hover {color:#000;}
#profileRight h2 a {color:#479;}
#profileRight h2 a:hover, #profileRight h3 a:hover {color:#000;}
#topNavi a:hover {background:#cde; color:#000; -moz-border-radius:4px;}
#pageFooter a:hover {background: none; color:#000; text-decoration:underline;}
#tabBar li a {color:#147 !important;}
/* =buttons */
.inputbutton, .inputsubmit, input[type~="submit"], input[type~="button"], input.fieldBtnSubmit, input.fieldBtnCancel {border: 1px solid #999; color: #333; padding: 2px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoBAMAAAAMH8foAAAALVBMVEXMzMzOzs7Q0NDT09PV1dXY2Nja2trd3d3f39/h4eHk5OTm5ubp6enr6+vu7u7eqdEYAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1ggUCBwXjA9XuQAAAEBJREFUGNNjeAcHDEjMu3DAcAYOGHbDAcMqOGCYCQcMHXDAUA4HDGlwwBAKBwwucMBgDAcMSnDAIAgHDKMAHQAALbFPB3X6hlUAAAAASUVORK5CYII=);}
.inputbutton:hover, .inputsubmit:hover, input[type~="submit"]:hover, input[type~="button"]:hover, input.fieldBtnSubmit:hover, input.fieldBtnCancel:hover {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoBAMAAAAMH8foAAAALVBMVEXd3d3f39/h4eHk5OTm5ubo6Ojr6+vt7e3v7+/y8vL09PT29vb5+fn7+/v+/v53XgCvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1ggUCBsmkpDBRAAAAEBJREFUGNNjeAcHDEjMu3DAcAYOGHbDAcMqOGCYCQcMHXDAUA4HDGlwwBAKBwwucMBgDAcMSnDAIAgHDKMAHQAALbFPB3X6hlUAAAAASUVORK5CYII=);}
/* =other */
.microblogInfo, .friendsInfo, .pinboard_Navi, .photosmHNavi, .groupsmHNavi, .forummHNavi {background:#eee; color:#406b90; border-bottom:1px solid #abd;}
#microblogContent, .groupsRightColumns {border:none;}
.visitorsNavi {border-color:#cde;}
ul.linkList {border-top:1px solid #eee;}
.linkList li {border-color:#eee; line-height:1.7em;}
#Kds {border-color:#369;}
#GroupsSnipplet ul, .coursesColumn ul {border-top:1px solid #f6f6f6; color:#e00;}
#GroupsSnipplet ul li, .coursesColumn ul li {padding: 0}
#Search_Results #GroupList {background:#eee;}
#GroupCategories {border-color:#369;}
#ccaptains {background:#cde; border-color:#369;}
#ccaptains .toggleLink {color: #147 !important;}
ul#tabBar {border-color:#369;}
#tabBar li.selected {background:#68b;}
#tabBar li:hover, #tabBar li.selected:hover {background:#cde;}
#QuickFormSearch input {border-color:#369; background:#fff; padding:3px; width:116px;}
.resultsRow, #FriendsList .pagerCont, .friendsListLinks {background:#eee;}
.friendsSearchBox {background:#cde; border-color:#369;}
ul.tcl li {border-color:#369;}
.tcl .Links .linkList li {border-color:#eee;}
.commentMetaData {border-top:1px solid #369; border-bottom:1px solid #cde;}
#PhotoAlbums_User .thumb {background:#eee;}
.thumb {background: #fff; border-color:#68b;}
.thumb:hover {border-color:#369;}
.ThumbsOverview {border-color:#68b; background:#eee;}
#PhotoAlbums_SingleView .pagerCont {border-color:#68b;}
#tagBar {border-color:#68b !important;}
.AlbumCont {background:#eee; border-color:#369;}
.AlbumCont .clearFix {border-color:#369;}
.fn-note {opacity:.8;}
.groupsWrap {background:#eee;}
.groupsWrap ul li.clearFix {border-color:#369;}
.threadPageCounter {background:#eee; color:#68b;}
.threadWrap {background:#cde;}
.threadWrapBorder, .threadImage {border-color:#369;}
strong.pager {color:#000; font-weight:bold;}
#Messages_List thead {background:#cde;}
#Messages_List td {border-color:#68b;}
.opened td.subject .wrap {background-color:#eee; border-color:#68b;}
]]></r>).toString();
addGlobalStyle(cssdata);
// Local variables:
// mode:css
// End:
