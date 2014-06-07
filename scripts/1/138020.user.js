// ==UserScript==
// @name        SolusOS Forums Dark Theme
// @namespace   http://userscripts.org/scripts/show/138020
// @description Display the SolusOS forums using a dark theme
// @include     http://main.solusos.com/*
// @version     2.2.1
// @grant	none
// ==/UserScript==
/* 
    Originally written by riser

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

document.getElementById('vsapp_boxswitch').removeAttribute('style');

var node, node2;

node = document.querySelector('#vsappmdf > div');
if (node) { node.removeAttribute('style'); }

node = document.querySelector('#vsapp_opts > div:nth-child(2)');
if (node) { node.removeAttribute('style'); }

node = document.querySelector('div[style="padding:0px;margin:0px;border-top:0px;border-bottom:1px;border-left:1px;border-right:1px;border-color:#777777;border-style:solid;"]');
if (node) {
  node.removeAttribute('style');
  node.setAttribute('class', 'thumbs_content');

  node2 = node.querySelector('tr:first-child');
  if (node2) { node2.setAttribute('class', 'thumbs_header_row'); }
}

node = document.querySelector('div[style="padding:0px;margin:0px;border-top:0px;border-bottom:1px;border-left:1px;border-right:1px;border-color:#777777;border-style:solid;"]');
if (node) {
  node.removeAttribute('style');
  node.setAttribute('class', 'thanks_given');
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'body {\
  color: #9F9F9F;\
}\
\
a {\
  text-decoration: none;\
}\
\
.doc_header,\
.globalsearch .buttoncontainer,\
#sidebar_container .userprof_content .blockrow,\
#sidebar_container.member_summary .mainblock .blocksubhead,\
.wysiwyg_block .formcontrols .blockrow,\
span.cke_skin_kama,\
.navbar_search input {\
  border: 0;\
}\
\
.vbform .actionbuttons .group,\
.cms_widget .block,\
.blockfootpad,\
.formcontrols .section,\
#content_container,\
span.cke_skin_kama,\
#cke_vB_Editor_QR_editor {\
  padding: 0;\
}\
\
.actionbuttons .group {\
  padding: 0 5px;\
}\
\
.blockfootpad {\
  width: 50%;\
}\
\
#below_searchresults {\
  margin: -15px 0;\
}\
\
.logo-image img {\
  height: 30px;\
  padding-left: 20px;\
}\
\
#entry22,\
.blockfoot.actionbuttons,\
.blockrow.texteditor.forum {\
  padding: 3px;\
}\
\
.widget_content,\
.formcontrols .blockrow {\
  padding: 10px 0;\
}\
\
#content ul li ul li,\
.cat_main_menuitem a {\
  padding: 5px 0;\
}\
\
.buttoncontainer {\
  border-right: 0;\
  border-left: 0;\
}\
\
.savepreferences {\
  padding-top: 2px;\
}\
\
.breadcrumb {\
  border-bottom: 0;\
  float: left;\
}\
\
.above_postlist,\
#above_postlist {\
  margin-top: 0;\
  margin-bottom: 10px;\
}\
\
#pm_filterform,\
.below_postlist .pagination_bottom,\
.navpopupmenu.popupmenu.nohovermenu,\
.newactivity,\
.moreactivity {\
  margin-top: 0;\
}\
\
#charnav,\
#subscription_navpopup,\
.above_postlist .pagination_top {\
  margin-top: 10px;\
}\
\
div.pda {\
  margin-top: 20px;\
  border: 0;\
  border-radius: 5px;\
}\
\
.groupcontrols {\
  padding-top: 0;\
}\
\
.noinlinemod.below_postlist {\
  margin-top: -35px;\
}\
\
#group-after-list,\
.group-after-list {\
  margin-top: -10px;\
}\
\
#commentform,\
.below_postlist {\
  margin-bottom: 20px;\
}\
\
#sidebar_container.member_summary .textcontrol {\
  margin-left: 0;\
}\
\
.actionbutton_container,\
.below_postlist .pagination_bottom .pagination {\
  margin-bottom: 5px;\
}\
\
dl.tabslight dd a {\
  border-top-left-radius: 0;\
  border-top-right-radius: 0;\
}\
\
.navtabs li:first-child {\
  border-left: 0;\
}\
\
.navtabs li {\
  border-right: 0;\
}\
\
.navtabs ul li {\
  padding-right: 10px;\
}\
\
.globalsearch {\
  right: 40px;\
}\
\
ul.userlist_showavatars div.buddylist_details div.friend label,\
.globalsearch .textboxcontainer {\
  border-right: 0;\
  border-left: 0;\
  text-align: right;\
}\
\
.searchthread.popupmenu .popupbody input.button {\
  margin-top: 1px;\
}\
\
#pm_navpopup {\
  margin-top: -25px;\
}\
\
.wgo_block .blockhead,\
.forum_info .blockhead,\
.blockhead h2,\
#forum_icon_legend h5,\
.thread_info h4,\
#usercp_nav h2.blockhead,\
#content .blockhead {\
  font-weight: normal;\
}\
\
.toolsmenu {\
  color: #9F9F9F;\
  background: transparent;\
  width: 50%;\
  clear: both;\
  float: right;\
  border: 0;\
  margin: -20px 0 0 0;\
}\
\
.popupbody li.formsubmit input[type="submit"],\
.popupbody li.formsubmit input[type="reset"],\
.popupbody li.formsubmit input[type="button"] {\
  float: right;\
  margin-top: 5px;\
  margin-right: 30%;\
  margin-bottom: 5px;\
}\
\
.toplinks ul.isuser li.welcomelink,\
.forumicon {\
  display: none;\
}\
\
.cms_widget,\
.forumhead,\
.blockhead,\
.forum_info .blockhead,\
#forum_icon_legend h5,\
.vbform .blockhead,\
.wgo_block .blockhead,\
#usercp_nav .blockhead,\
.threadlisthead div,\
.threadlisthead.sgbithead,\
#sidebar_container .blocksubhead.smaller {\
  border-radius: 10px 10px 0 0;\
}\
\
.forumbit_nopost .subforumdescription {\
  border: 1px solid #002031;\
}\
\
.wgo_block .blockbody,\
li.activitybit,\
.navtabs .popupbody li,\
.popupbody li,\
.toolsmenu .popupgroup .popupbody form ul,\
#sidebar_container .block.smaller,\
.settings_form_top_border,\
.pmlist .blockrow:first-child,\
.pmlist .blockrow {\
  border-top: 1px solid #323232;\
}\
\
dl.tabslight,\
.blogsubheader,\
#searchtypeswitcher,\
.postbit .posttitle,\
.postbit.postbit-lite,\
.postbitlegacy .title,\
.cms_widget_header,\
tr.ygtvrow td,\
.vb-tree-menu .ygtvitem,\
#sidebar_container .blocksubhead,\
#memberlist_table tr td,\
.sortrow {\
  border-bottom: 1px solid #323232;\
}\
\
.memberaction_body.popupbody,\
.forumbit_nopost .forumrow,\
.forumbit_nopost .forumhead,\
.forumbit_post .forumrow,\
.forumbit_post .forumhead,\
.forumbits .forumhead,\
.forum_info .blockbody,\
.threadbit,\
.threadbit.sgbit,\
.wgo_block,\
.cms_widget,\
.blocksubhead,\
.thread_info .blockbody {\
  box-shadow: none;\
}\
\
.above_threadlist {\
  width: 50%;\
  float: right;\
  margin-top: -20px;\
}\
\
.above_threadlist .threadpagenav {\
  position: relative;\
}\
\
.above_threadlist .newcontent_textcontrol {\
  float: right;\
  position: relative;\
}\
\
.above_content .newcontent_textcontrol {\
  clear: left;\
  margin-top: 5px;\
}\
\
#pagetitle,\
.pagetitle {\
  width: 100%;\
  clear: none;\
  padding: 0;\
  border-bottom: 0;\
}\
\
.postbitlegacy .userinfo .userinfo_extra {\
  font-size: 11px;\
}\
\
.navtabs .popupbody {\
  background: #323232;\
  border: 1px solid #545454;\
  min-width: 180px;\
}\
\
#sidebar_container .controls a.textcontrol:hover,\
#sidebar_container .controls .textcontrol:hover,\
#navtabs .popupmenu ul li a {\
  text-decoration: none;\
}\
\
#sidebar_container .underblock,\
.memberprofiletabunder {\
  height: 1px;\
}\
\
.formcontrols .blockrow label,\
.formcontrols .blockrow .group li label,\
.formcontrols .blockrow .group dt label {\
  width: 240px;\
  font-size: 13px;\
}\
\
#memberlist .blockhead {\
  left: 0;\
}\
\
.menusearch.popupmenu .popupbody {\
  left: -120px !important;\
  min-width: 250px;\
  max-width: 250px;\
}\
\
#vbtab_forum ul li {\
  padding-right: 10px;\
}\
\
#navtabs .popupmenu ul li {\
  padding-right: 0;\
}\
\
.polloptionsblock {\
  background: url("images/misc/poll_question_mark.png") no-repeat scroll 30px 10px #222222;\
}\
\
.toplinks .nonotifications a.nonpopupctrl:hover,\
.toplinks .notifications a.popupctrl:hover,\
.toplinks .nonotifications a.popupctrl:hover,\
.toplinks .nonotifications a.popupctrl.active,\
.navtabs li.selected li:hover a.popupctrl {\
  color: #CFCFCF;\
  background: url("digitalvb/vbfour/misc/arrow.png") no-repeat scroll right center #003A59;\
  border: 0;\
}\
\
.postbitlegacy .signature,\
.postbitlegacy .lastedited {\
  margin-top: 5px;\
  padding: 5px 10px 0;\
}\
\
.activitystream .popupbody td,\
.postbitlegacy .postfoot .textcontrols span.seperator,\
.postbit .postfoot .textcontrols span.seperator {\
  border-right: 1px solid #323232;\
}\
\
.postbitlegacy .postfoot .textcontrols a.quickreply,\
.postbit .postfoot .textcontrols a.quickreply,\
.postbitlegacy .postfoot .textcontrols a.forwardpost,\
.postbit .postfoot .textcontrols a.forwardpost {\
  background: url("digitalvb/vbfour/buttons/reply_40b.png") no-repeat scroll left center transparent;\
}\
\
.postbitlegacy .postfoot .textcontrols a.newreply,\
.postbit .postfoot .textcontrols a.newreply {\
  background: url("digitalvb/vbfour/buttons/quote_40b.png") no-repeat scroll left center transparent;\
}\
\
.postbitlegacy .postfoot .textcontrols a.multiquote,\
.postbit .postfoot .textcontrols a.multiquote {\
  background: url("digitalvb/vbfour/buttons/multiquote-back_40b.png") no-repeat scroll left center transparent;\
}\
\
.postbitlegacy .postfoot .textcontrols a.report,\
.postbit .postfoot .textcontrols a.report {\
  background: url("digitalvb/vbfour/buttons/report-40b.png") no-repeat scroll left center transparent;\
}\
\
.postbitlegacy .postfoot .textcontrols a.report:hover,\
.postbit .postfoot .textcontrols a.report:hover {\
  background: url("digitalvb/vbfour/buttons/report-40b-hover.png") no-repeat scroll left center transparent;\
}\
\
#inlinemod_formctrls a.popupctrl span.ctrlcontainer {\
  padding-right: 20px;\
  padding-left: 5px;\
}\
\
#groupsearch .searchbox,\
#forumdisplay_navpopup .popupctrl,\
#showthread_navpopup .popupctrl {\
  margin-right: 10px;\
  margin-left: 5px;\
}\
\
#sidebar_container.member_summary a.imagecontrol img {\
  display: none;\
}\
\
#sidebar_container.member_summary a.imagecontrol {\
  background: url("digitalvb/vbfour/buttons/edit_40b.png") no-repeat center #141414;\
}\
\
#sidebar_container.member_summary a.imagecontrol:hover {\
  background: url("digitalvb/vbfour/buttons/edit_40b-hover.png") no-repeat center #141414;\
}\
\
#inlinemod_formctrls a.popupctrl:hover,\
.toolsmenu .popupgroup a.popupctrl:hover,\
.popupgroup .popupmenu:hover a.popupctrl,\
.navpopupmenu a.popupcontrol:hover,\
.toolsmenu .popupgroup .popupmenu a.popupctrl:hover,\
.navpopupmenu.popupmenu.nohovermenu a.popupctrl:hover {\
  background: url("digitalvb/vbfour/misc/arrow.png") no-repeat scroll right center #003A59;\
  border-radius: 5px;\
}\
\
.navlinks {\
  border-top: 0;\
  margin: -20px 0 10px 0;\
  padding: 5px 0 10px 0;\
  width: 40%;\
  float: right;\
  text-align: right;\
}\
\
li.activitybit,\
.vbform {\
  margin: 0;\
}\
\
#sidebar_container .blockrow,\
#moreactivity_container,\
.navtabs .popupbody li:first-child,\
.popupbody li:first-child {\
  border-top: 0;\
}\
\
.postbit.postbit-lite,\
#below_buddylist_pagenav,\
#above_threadlist {\
  padding-bottom: 5px;\
}\
\
#usercp_content {\
  padding-bottom: 10px;\
}\
\
#usercp_nav .block,\
.postbitlegacy .postrow.has_after_content,\
#forum_icon_legend {\
  padding-bottom: 0;\
}\
\
#content_inner,\
.memberaction_body.popupbody li a:hover {\
  background-color: transparent !important;\
}\
\
.navtabs ul,\
.navlinks,\
.blockfoot,\
.blocksubfoot,\
.underblock,\
.popupbody li.formsubmit,\
.popupbody li.formsubmit.jumptopage > label,\
.forumbit_nopost .subforumdescription,\
.blocksubhead,\
tr.ygtvrow:hover td.ygtvcontent,\
.main_menuitem a,\
.active_menuitem a,\
.main_menuitem,\
.active_menuitem,\
#activity_tab_container > div,\
#groupsearch .searchimg,\
.pagination span a,\
.pagination span a.popupctrl,\
.cke_skin_kama .cke_editor .cke_rcombo a,\
.cke_skin_kama .cke_editor .cke_toolgroup,\
li.sgicon .maincol,\
#memberlist_table td.alt1,\
#sidebar li.sgicon .maincol,\
#sidebar_container .underblock {\
  background: transparent;\
}\
\
.formcontrols .blockrow {\
  background: transparent;\
  border: 0;\
  padding: 10px 5px;\
}\
\
.navpopupmenu.popupmenu.nohovermenu a.popupctrl span.ctrlcontainer {\
  background: transparent;\
  padding: 0 10px 0 0;\
}\
\
.thumbs_content,\
.thanks_given,\
#sidebar_container > ul,\
#content .blockrow > li,\
#content .blockrow > ol {\
  background: transparent;\
  border-top: 0;\
  border-right: 1px solid #323232;\
  border-bottom: 1px solid #323232;\
  border-left: 1px solid #323232;\
  box-shadow: none;\
}\
\
.activitystream .blockhead {\
  background: transparent;\
  margin-top: -30px;\
  width: 40%;\
  float: right;\
  border: 0;\
}\
\
html,\
.above_body {\
  background: #000000;\
}\
\
.vbfour-box {\
  background: #000000;\
  width: 100%;\
  padding: 0;\
}\
\
#footer {\
  background: #003A59;\
  border: 0;\
  box-shadow: none;\
}\
\
#entry17,\
.blogentrybit,\
.lightbox > div > div,\
.eventbit .eventdetails .eventbody,\
.moreactivity,\
.blockbody,\
.faqlinks,\
.pmlist .blockrow,\
.cms_widget,\
#usercp_nav .blockrow,\
#content .blockrow,\
.postbit-lite,\
.postbit-lite .postbithead,\
.postbitlegacy .postbody,\
.threadbit .nonsticky,\
.threadbit .discussionrow,\
.threadbit.sgbit .nonsticky,\
.thread_info .blockbody,\
.vb-tree-menu .ygtvitem a,\
#forum_icon_legend dl,\
.formcontrols .section,\
.forumhead + .childforum .L2:first-child .forumrow,\
.forumhead + .L2 .forumrow,\
li.userprof_content,\
#pmfolderlist .blockrow.imod_highlight,\
#sidebar_container .userprof_content .blockrow,\
#sidebar_container .block,\
#sidebar_container .block.smaller,\
#sidebar_container .blockbody,\
#sidebar_container .blockrow,\
.cms_widget .block,\
.quote_container,\
.grey_select_item {\
  background: #141414;\
}\
\
#header,\
div.pagebody,\
.body_wrapper {\
  background: #1C1C1C;\
}\
\
.attachments,\
h3.blocksubhead,\
.columnsort a:hover,\
.vb-tree-menu:hover,\
.vb-tree-menu .ygtvitem a.ygtvlabel:hover,\
.main_menuitem a:hover,\
.active_menuitem a:hover,\
#usercp_nav .blockrow * a:hover {\
  background: #272727;\
}\
\
.postbitlegacy .postbody,\
.eventbit .eventdetails .eventbody {\
  border-left: 1px solid #323232;\
}\
\
.body_wrapper {\
  margin-top: 10px;\
  border-radius: 10px;\
}\
\
.navtabs ul {\
  border-top: 1px solid #323232;\
  border-radius: 0;\
}\
\
.forumhead + .childforum .L2:first-child .forumrow,\
.forumhead + .L2 .forumrow {\
  border-top: 0;\
}\
\
blockquote.preview .bbcode_container div.bbcode_code,\
blockquote.preview .bbcode_container pre.bbcode_code,\
.bbcode_container div.bbcode_quote,\
.bbcode_container div.bbcode_code,\
.bbcode_container pre.bbcode_code {\
  background: #272727;\
  border-left: 3px solid #323232;\
  overflow: auto;\
}\
\
.thumbs_header_row,\
.thumbs_content .blocksubhead,\
.blogsubheader,\
.memberprofiletabunder,\
#vsapp_opts .blocksubhead,\
.formcontrols .blockrow input.textbox:focus,\
.formcontrols .blockrow textarea:focus {\
  background: #323232;\
}\
\
#ajax_post_errors {\
  background: #9F9F9F;\
}\
\
.threadbit .sticky,\
.stickies .pagination span a {\
  /*background: #F4F3EA;*/\
  background: #EEE5DE;\
}\
\
#usercp_nav .blockrow .active,\
#usercp_nav .blockrow .active a,\
#usercp_nav .blockrow .active a:hover {\
  color: #003333 !important;\
  background: #CFCFCF;\
}\
\
html > body dl.tabslight dd.selected a:hover,\
div.pda:hover,\
div.pda a:hover,\
.popupbody li.formsubmit input[type="submit"]:hover,\
.popupbody li.formsubmit input[type="reset"]:hover,\
.popupbody li.formsubmit input[type="button"]:hover {\
  color: #003A59;\
  background: #CFCFCF;\
}\
\
dl.tabslight dd a,\
.button:hover,\
.userprof_button:hover,\
.actionbuttons .group .button:hover,\
.forum_info_form .options_input_block .button:hover,\
.actionbuttons .group .button:hover,\
.cke_skin_kama .cke_dialog_contents a.cke_dialog_ui_button_ok:hover,\
.cke_skin_kama .cke_dialog_contents a.cke_dialog_ui_button_cancel:hover,\
.textcontrols a:hover,\
#sidebar_container a.textcontrol:hover,\
#recentgroups .controls a:hover,\
.navpopupmenu.popupmenu.nohovermenu a.textcontrol:hover,\
.navpopupmenu a.textcontrol:hover,\
.formcontrols input.button:hover {\
  color: #003A59;\
  background: #CFCFCF;\
  margin-right: 5px;\
}\
\
.newactivity,\
.moreactivity,\
.newactivity a,\
.moreactivity a {\
  color: #0077B6;\
  font-size: 11px;\
}\
\
body a,\
legend,\
.pagetitle a,\
.lastposttitle a,\
.blogentrybit h4,\
.postbithead a.username,\
#forums a.username,\
#content ul li ul li a,\
.postbitlegacy .userinfo .username_container .memberaction a,\
a.firstunread,\
.wgo_block a,\
.blocksubhead a,\
a.blockheadinfo,\
.bbcodeblock ul li a,\
h2.searchlisthead span,\
h2.searchlisthead span a,\
.stickies .pagination span a,\
.vb-tree-menu .ygtvitem a,\
.main_menuitem a,\
.active_menuitem a,\
.rules_link a,\
.pagination span a,\
.threadbit a,\
.forumbit_post .foruminfo .forumdata .forumtitle a,\
.forumbit_nopost .forumbit_nopost .forumrow .forumtitle a,\
#view-friends-content a.floatright,\
#sidebar_container a,\
#sidebar_container .userprof_content a,\
#sidebar_container .mainblock .blocksubhead .username,\
#sidebar_container.member_summary a.textcontrol,\
#sidebar_container.member_summary .textcontrol {\
  color: #0077B6;\
  border: 0;\
}\
\
#usercp_nav hr {\
  color: #323232;\
  background: #272727;\
}\
\
.postbitlegacy .postfoot .textcontrols a.quickreply:hover,\
.postbit .postfoot .textcontrols a.quickreply:hover,\
.postbitlegacy .postfoot .textcontrols a.forwardpost:hover,\
.postbit .postfoot .textcontrols a.forwardpost:hover,\
.postbitlegacy .postfoot .textcontrols a.newreply:hover,\
.postbit .postfoot .textcontrols a.newreply:hover,\
.postbitlegacy .postfoot .textcontrols a.multiquote:hover,\
.postbit .postfoot .textcontrols a.multiquote:hover,\
.postbitlegacy .postfoot .textcontrols a.blog:hover,\
.postbit .postfoot .textcontrols a.blog:hover,\
.postbitlegacy .postfoot .textcontrols a.editpost:hover,\
.postbit .postfoot .textcontrols a.editpost:hover,\
.eventbit .eventfoot .textcontrols a.editevent:hover,\
.postbitlegacy .postfoot .textcontrols a.report:hover,\
.postbit .postfoot .textcontrols a.report:hover,\
.popupbody li.formsubmit .advancedsearchlink a {\
  color: #417394;\
}\
\
.postbit-lite .postbitfoot .postcontrols a:hover,\
.entrycontrols li > a:hover {\
  color: #579B07 !important;\
  text-decoration: underline;\
}\
\
.vb-tree-menu .ygtvitem a.ygtvlabel:hover,\
.main_menuitem a:hover,\
.active_menuitem a:hover,\
.blocksubhead a:hover,\
.thread_info .blockbody,\
#content ul li ul li a:hover,\
#forums .L1 .forumhead a:hover {\
  color: #579B07;\
  text-decoration: none;\
}\
\
a.blockheadinfo:hover,\
#sidebar_container a:hover,\
.newactivity a:hover,\
.moreactivity a:hover,\
#moreactivitylink a:hover,\
li.activitybit a:hover,\
.navbar_advanced_search li a:hover,\
.navtabs li.selected li:hover a,\
.bbcodeblock ul li a:hover,\
h2.searchlisthead span a:hover,\
.forumbit_post .foruminfo .forumdata .forumtitle a:hover,\
.rules_link a:hover,\
.pagination span a:hover,\
.breadcrumb .navbit a:hover,\
.navlinks a:hover,\
.userprof_headers a:hover,\
.postbithead a.username:hover,\
.postbitlegacy .userinfo .username_container .memberaction a:hover,\
#view-friends-content a.floatright:hover,\
#sidebar_container .userprof_content a:hover,\
#sidebar_container .blockrow a:hover,\
#sidebar_container .mainblock .blocksubhead .username:hover,\
#sidebar_container.member_summary a.textcontrol:hover,\
#sidebar_container.member_summary .textcontrol:hover,\
.popupbody li.formsubmit .advancedsearchlink a:hover {\
  color: #579B07;\
  border: 0;\
  text-decoration: underline;\
}\
\
.activitystream .popupbody td a:hover {\
  color: #579B07;\
  background: #1C1C1C;\
}\
\
.blogsubheader,\
.newactivity > span,\
.moreactivity span,\
#pollinfo .polltitle,\
.activitystream_block dd a,\
dd.userprof_moduleinactive a,\
dl.tabslight dd.userprof_moduleinactive a,\
dl.as-tabs dd a,\
.widget_content,\
.widget_post_content,\
.member_content a,\
.navbar a,\
.time,\
.eventbit .eventrow,\
h3.blocksubhead,\
.userprof_celltitle,\
#content ul li a,\
li.userprof_content,\
#sidebar_container .userprof_content .blockrow,\
#sidebar_container .blockbody,\
.info_subblock ul li,\
.above_threadlist .threadpagenav .threadpagestats,\
.activitystream .popupbody th,\
.activitystream .popupbody a,\
.postbit-lite .postbithead,\
.postbitlegacy .postrow,\
.postbitdeleted .postrow,\
.postbitignored .postrow,\
.postbitlegacy .postfoot .textcontrols a.quickreply,\
.postbit .postfoot .textcontrols a.quickreply,\
.postbitlegacy .postfoot .textcontrols a.forwardpost,\
.postbit .postfoot .textcontrols a.forwardpost,\
.postbitlegacy .postfoot .textcontrols a.newreply,\
.postbit .postfoot .textcontrols a.newreply,\
.postbitlegacy .postfoot .textcontrols a.multiquote,\
.postbit .postfoot .textcontrols a.multiquote,\
.postbitlegacy .postfoot .textcontrols a.blog,\
.postbit .postfoot .textcontrols a.blog,\
.postbitlegacy .postfoot .textcontrols a.editpost,\
.postbit .postfoot .textcontrols a.editpost,\
.eventbit .eventfoot .textcontrols a.editevent,\
.postbitlegacy .postfoot .textcontrols a.report,\
.postbit .postfoot .textcontrols a.report,\
.popupbody li.formsubmit .submitoptions label {\
  color: #9F9F9F;\
}\
\
dl.stats dt,\
#sidebar_container dl.stats,\
#sidebar_container .blockbody.userprof_content,\
#sidebar_container .userprof_content .time,\
.userprof_content .time {\
  color: #9F9F9F;\
  font-size: 100%;\
}\
\
.postbitlegacy .postfoot .textcontrols a.editpost,\
.postbit .postfoot .textcontrols a.editpost,\
.eventbit .eventfoot .textcontrols a.editevent {\
  color: #9F9F9F;\
  background: url("digitalvb/vbfour/buttons/edit_40b.png") no-repeat scroll left center transparent;\
}\
\
.postbitlegacy .postfoot .textcontrols a.blog,\
.postbit .postfoot .textcontrols a.blog {\
  color: #9F9F9F;\
  background: url("digitalvb/vbfour/misc/blog/blogpost_40b.png") no-repeat scroll left center transparent;\
}\
\
.toolsmenu div {\
  color: #9F9F9F;\
  clear: none;\
  border: 0\
}\
\
.formcontrols .blockrow .description {\
  color: #9F9F9F;\
  margin-top: 0;\
  margin-left: 250px;\
  max-width: 400px;\
}\
\
#pollresults,\
#message_list,\
.postbit,\
.postbitlegacy,\
.eventbit {\
  color: #9F9F9F;\
  border: 1px solid #323232;\
}\
\
.userprof_headers,\
.profile_content .actionbuttons,\
#groupsearch {\
  color: #9F9F9F;\
  background: transparent;\
  border: 0;\
}\
\
.pollresultsblock,\
.vb-tree-menu .ygtvitem,\
.postbitlegacy .postdetails,\
.postbitlegacy .userinfo,\
.postbit .postfoot,\
.postbitlegacy .postfoot,\
.postbit .postfoot .textcontrols,\
.postbitlegacy .postfoot .textcontrols,\
a.editpost,\
.eventbit .eventfoot,\
.eventbit .eventdetails,\
.eventbit .eventfoot .eventcontrols,\
.eventbit .eventfoot .textcontrols a.editevent,\
li.activitybit,\
.newactivity,\
.wgo_block .blockbody,\
.wgo_block .section,\
.wgo_block .blocksubhead,\
#usercp_nav .blockbody,\
.standard_error .blockbody,\
.forumbit_nopost .forumbit_nopost .forumrow,\
.forumbit_post .forumrow,\
.lightgraybackground,\.forum_info .blockbody,\
.forum_info .section,\
.forum_info .blocksubhead,\
.userprof_tab_active,\
.userprof_moduleinactive,\
.activitystream_block dd,\
dd.userprof_moduleinactive {\
  color: #9F9F9F;\
  background: #141414;\
}\
\
.navtabs {\
  color: #9F9F9F;\
  background: #1C1C1C;\
}\
\
.toplinks .nonotifications .popupbody a,\
.memberaction_body.popupbody,\
.navtabs li.selected .popupbody li a,\
.popupbody,\
.popupbody li a,\
.popupbody li label,\
.navpopupbody,\
#usercp_nav .blocksubhead,\
.activitystream .popupbody td,\
.activitystream .popupbody td a {\
  color: #9F9F9F;\
  background: #272727;\
}\
\
.navpopupbody {\
  min-width: 350px;\
}\
\
.lightbox .buttonrow, .lightbox .descrow,\
div.pda a,\
.threadlist,\
.threadlisthead a,\
.threadlisthead a:hover,\
.threadlisthead.sgbithead a,\
.threadlisthead.sgbithead a:hover,\
h2.searchlisthead,\
h2.searchlisthead a,\
h2.searchlisthead span.mainsearchstats,\
dl.as-tabs a:hover,\
dl.tabslight dd.userprof_module:hover,\
dl.tabslight dd.userprof_module a:hover,\
dl.tabslight dd.userprof_moduleinactive:hover,\
dl.tabslight dd.userprof_moduleinactive a:hover,\
dl.as-tabs dd.selected a:hover,\
.navtabs li.selected,\
.navtabs li.selected li:hover a.popupctrl.active,\
.navtabs li.selected li a.popupctrl.active,\
.popupbody li input.searchbox,\
.popupbody li input.searchbox:focus,\
.toolsmenu .popupgroup .popupmenu:hover a.popupctrl,\
.toolsmenu .popupgroup .popupmenu:hover .popupctrl a.popupctrl.active,\
.forumbit_nopost .forumhead span,\
.forumbit_nopost .forumhead .collapse,\
.forumbit_post .forumhead h2 span,\
.forumbit_nopost .forumhead .forumtitle,\
.forumbit_nopost .forumhead .forumtitle a,\
.ck_bottom_restore_autosave,\
.cke_skin_kama *,\
.cke_skin_kama a:hover,\
.cke_skin_kama a:link,\
.cke_skin_kama a:visited,\
.cke_skin_kama a:active,\
.cke_button a,\
.restoretext a,\
#forums .L1 .forumhead a {\
  color: #CFCFCF;\
}\
\
html > body dl.tabslight dd.selected a,\
#searchtypeswitcher li.selected a,\
#searchtypeswitcher li a:hover,\
#sidebar_container .controls a,\
#recentgroups .controls a,\
.cke_skin_kama .cke_editor .cke_rcombo a:hover,\
.cke_skin_kama .cke_editor .cke_rcombo a:focus,\
.cke_skin_kama .cke_editor .cke_rcombo a:active,\
.cke_skin_kama .cke_editor .cke_button a:hover,\
.cke_skin_kama .cke_editor .cke_button a:focus,\
.cke_skin_kama .cke_editor .cke_button a:active,\
.activitystream_block dd:hover,\
dd.userprof_moduleinactive:hover,\
.tabslight dd.userprof_moduleinactive:hover,\
dl.tabslight dd a:hover,\
.navtabs li a.navtab:hover,\
.navtabs li.selected a.navtab,\
.toplinks ul.isuser li a:hover {\
  color: #CFCFCF;\
  background: #003A59;\
}\
\
div.pda,\
#inlinemod_formctrls a.popupctrl:hover,\
.activitystream_block dd.selected,\
dd.userprof_module,\
dl.tabslight dd.userprof_module a,\
dl.as-tabs dd.selected a,\
.pagination span.selected a {\
  color: #CFCFCF;\
  background: #003A59;\
  border: 0;\
}\
\
.cms_table_th,\
.postbit .posthead,\
.postbitlegacy .posthead,\
.eventbit .eventhead {\
  color: #CFCFCF;\
  background: #003A59;\
  border: 1px solid #323232;\
}\
\
#inlinemod_formctrls .popupctrl,\
#inlinemod_formctrls a.popupctrl span.ctrlcontainer,\
#inlinemod_formctrls a.popupctrl:hover,\
.popupgroup .popupmenu a.popupctrl,\
.toolsmenu .popupgroup a.popupctrl,\
.toolsmenu .popupgroup .popupmenu a.popupctrl,\
.navtabs li.selected li a.popupctrl,\
.navpopupmenu.popupmenu.nohovermenu a.popupctrl {\
  color: #CFCFCF;\
  background: url("digitalvb/vbfour/misc/arrow.png") no-repeat scroll right center transparent;\
  border: 0;\
}\
\
.button,\
.userprof_button,\
.actionbuttons .group .button,\
.forum_info_form .options_input_block .button,\
.actionbuttons .group .button,\
.cke_skin_kama .cke_dialog_contents a.cke_dialog_ui_button_ok,\
.cke_skin_kama .cke_dialog_contents a.cke_dialog_ui_button_cancel,\
.textcontrols a,\
a.textcontrol,\
.navpopupmenu.popupmenu.nohovermenu a.textcontrol,\
.navpopupmenu .popupctrl .ctrlcontainer,\
.navpopupmenu a.textcontrol,\
.formcontrols input.button {\
  color: #CFCFCF;\
  background: #003A59;\
  border: 0;\
  border-radius: 5px;\
  padding-left: 5px;\
  padding-right: 5px;\
  margin-right: 5px;\
}\
\
#navbar,\
.navbar,\
.navpopupbody li.optionlabel {\
  color: #CFCFCF;\
  background: #1C1C1C;\
}\
\
.forumhead,\
.cke_skin_kama .cke_wrapper.cke_ltr,\
.cke_skin_kama .cke_wrapper.cke_rtl,\
.texteditor.forum textarea {\
  color: #CFCFCF;\
  background: #272727;\
}\
\
#searchtypeswitcher li a,\
.texteditor.forum .cke_skin_kama textarea.cke_source,\
.toplinks .nonotifications .popupbody a:hover,\
.navtabs li.selected .popupbody li a:hover,\
.popupbody li > a:hover,\
.popupbody li > label:hover {\
  color: #CFCFCF;\
  background: #323232;\
  text-decoration: none;\
}\
\
#groupsearch input,\
.texteditor.content .cke_skin_kama textarea.cke_source,\
.texteditor textarea,\
.textbox,\
textarea,\
select,\
.searchbox {\
  color: #CFCFCF;\
  background: #323232;\
  border: 1px solid #323232;\
}\
\
.commentsheader,\
#pagetitle h1,\
.blockhead a,\
#pollinfo .blockhead h2 {\
  color: #FF8000;\
}\
\
.cms_widget_header h3,\
#sidebar_container .blocksubhead {\
  color: #FF8000;\
  font-weight: normal;\
  padding: 4px;\
}\
\
.threadlisthead,\
.threadlisthead.sgbithead,\
h2.searchlisthead,\
.blockhead,\
.forum_info .blockhead,\
.wgo_block .blockhead,\
#content .blockhead,\
#usercp_nav .blockhead,\
#blog_user_sidebar,\
#blog_sidebar_generic,\
#sidebar_container.member_summary,\
.vbform .blockhead,\
.thread_info h4,\
#forum_icon_legend h5,\
#sidebar_container .blocksubhead.smaller {\
  color: #FF8000;\
  background: #141414;\
  border: 1px solid #323232;\
  box-shadow: none;\
}\
\
#olderactivity,\
.navbar_advanced_search li a,\
.navtabs li.selected li a,\
.navlinks a,\
.breadcrumb .navbit a {\
  color: #FFCC33;\
  border: 0;\
}\
\
html > body dl.tabslight dd.selected a,\
html > body dl.tabslight dd.selected a:hover,\
ul.userlist_showavatars li,\
.signature,\
.threadbit .nonsticky,\
.threadbit .discussionrow,\
.threadbit.sgbit .nonsticky,\
.userprof_editor,\
li.userprof_content_border,\
.userprof_content_border,\
.profile_editor_border,\
.cms_widget,\
.userprof_tab_active,\
.activitystream_block dd,\
dd.userprof_moduleinactive,\
.navtabs,\
#content,\
#navbar,\
#charnav dd a,\
.threadbit .sticky {\
  border-color: #545454;\
}\
\
.forumhead {\
  border: 1px solid #323232;\
  margin-top: 15px;\
}\
\
.navbar {\
  border: 0;\
  border-radius: 10px;\
}\
\
.searchbox {\
  border-radius: 3px;\
}\
\
.navpopupbody popupbody ul {\
  left: 30px !important;\
}\
\
.postbit .postfoot,\
.postbitlegacy .postfoot,\
.eventbit .eventfoot {\
  border-top: 1px solid #323232;\
}\
\
#usercp_nav li.active a.usercp_folder-left,\
#usercp_nav li.active a.usercp_folder-left:hover {\
  color: #003333;\
  background: url("digitalvb/vbfour/cms/sections.png") no-repeat scroll 10px 4px #CFCFCF;\
}\
\
#usercp_nav li a.usercp_folder-left:hover {\
  background: url("digitalvb/vbfour/cms/sections.png") no-repeat scroll 10px 4px #323232;\
}\
\
#activity_tab_container {\
  margin-bottom: 0;\
}\
\
html > body dl.tabslight dd.selected a,\
html > body dl.tabslight dd.selected a:hover,\
tr.ygtvrow:hover,\
.main_menuitem,\
.active_menuitem,\
.main_menuitem:hover,\
.active_menuitem:hover,\
.main_menuitem a:hover,\
.active_menuitem a:hover,\
#sidebar_container .blocksubhead.smaller {\
  border-bottom: 0;\
}\
\
.popupbody li label,\
.blocksubhead {\
  border-top: 0;\
  padding: 5px;\
}\
\
form .rightcol {\
  margin-left: 240px;\
}\
\
#cke_vB_Editor_QE_1_editor {\
  border: 0;\
  padding: 0;\
}\
\
.columnsort,\
.postbit-lite .postbithead {\
  border-top: 0;\
  border-right: 0;\
  border-bottom: 1px solid #323232;\
  border-left: 0;\
}\
\
.forumbit_nopost .subforumdescription,\
.faqtext + .faqlinks {\
  border-top: 1px solid #323232;\
  border-right: 0;\
  border-bottom: 0;\
  border-left: 0;\
}\
\
.bloglist,\
#entry17,\
#entry22,\
.attachments,\
.lightbox > div > div,\
div.pagebody,\
#pollinfo,\
.restore th,\
.restore td,\
.cms_table_tr,\
#cke_vB_Editor_001_editor,\
#cke_vB_Editor_QR_editor,\
#sidebar_container .blockbody,\
.activitystream_block dd.selected,\
.moreactivity,\
.newactivity,\
.lightgraybackground {\
  border: 1px solid #323232;\
}\
\
.notices li,\
#showthread_threadrate_form ul,\
#charnav,\
dd.userprof_module,\
dd.userprof_moduleinactive:hover,\
.tabslight dd.userprof_moduleinactive:hover,\
.popupbody {\
  border: 1px solid #545454;\
}\
\
.pmbit,\
.visitormessage {\
  border-left: 1px solid #323232;\
  border-right: 1px solid #323232;\
}\
\
.faqlinks,\
.threadbit .nonsticky,\
.threadbit .deleted,\
.threadbit .discussionrow,\
.threadbit .ignored,\
.threadbit.sgbit .nonsticky,\
#usercp_nav .blockbody,\
#vsapp_boxswitch,\
.blockbody.postpreview,\
ul#w_newgroups,\
#vsappmdf,\
#vsapp_opts > div:nth-child(2),\
.faqblock .blockbody,\
#activitylist,\
#ajax_post_errors .blockrow,\
#memberlist .blockbody,\
.standard_error .blockbody,\
.formcontrols,\
.thread_info .blockbody,\
.forum_info .blockbody,\
.blockbody.settings_form_border,\
.blockbody.formcontrols.floatcontainer,\
.forumbit_nopost .forumbit_nopost .forumrow,\
.forumbit_post .forumrow {\
  border-top: 0;\
  border-right: 1px solid #323232;\
  border-bottom: 1px solid #323232;\
  border-left: 1px solid #323232;\
}\
\
#profileform .blockbody.formcontrols .blockrow .rightcol * {\
  margin-left: 0px;\
}\
\
.faqsearch .formcontrols .blockrow p.description,\
#profileform .formcontrols .blockrow p.description {\
  margin-top: 0;\
  margin-left: 240px;\
}\
\
.formcontrols input.button, .actionbuttons,\
form#quick_reply .actionbuttons .group {\
  float: left;\
}\
\
.attachments {\
  margin: 15px;\
}\
\
.cp_content .blockrow .description {\
  margin-top: 0;\
}\
\
.cp_content .posticons label {\
  width: 80px;\
}\
\
.blockfoot.actionbuttons {\
  width: 60%;\
}\
\
.wysiwyg_block {\
  margin-bottom: 30px;\
}\
\
#view-friends-content a.floatright {\
  margin-top: -15px;\
  position: relative;\
  top: 20px;\
}\
\
.body_wrapper > .blockhead:nth-child(3),\
.vbform .blockhead,\
h3.blockhead {\
  margin-top: 30px;\
}\
\
.editor_textbox textarea {\
  min-width: 100%;\
  max-width: 100%;\
}\
\
#pagetitle a.pagetitleinfo.textcontrol,\
.actionbutton_container a.pagetitleinfo.textcontrol,\
.newcontent_textcontrol {\
  background: url("images/buttons/newbtn_middle.png") repeat-x scroll left top #003A59;\
  border-radius: 10px;\
  box-shadow: none;\
  color: #CFCFCF !important;\
  font: 14px Arial,sans-serif;\
  padding: 4px 15px;\
}\
\
#pagetitle a.pagetitleinfo.textcontrol:hover,\
.actionbutton_container a.pagetitleinfo.textcontrol:hover {\
  background: url("images/buttons/newbtn_middle.png") repeat-x scroll left top #51566B !important;\
  color: #FFFFFF !important;\
  text-decoration: none !important;\
}\
\
.newcontent_textcontrol,\
.above_postlist .newcontent_textcontrol {\
  margin-left: 10px;\
}\
\
.notices li {\
  background: none repeat scroll 0 0 #202020;\
  box-shadow: none;\
}\
\
#entry17 {\
  padding: 10px;\
}\
\
.commentsheader,\
.toolsmenu .popupgroup .popupbody,\
#sidebar_container {\
  padding: 0 !important;\
}\
\
#navlinks,\
#content_inner,\
.faqblock .faqlinks,\
.popupbody li.formsubmit label:hover,\
.widget_content {\
  background: transparent !important;\
  border: 0 !important;\
}');

var replaceColorAttributes = function (element, searchValue, replaceValue) {
    searchValue = searchValue.toUpperCase();
    var nodes = element.getElementsByTagName('font');

    for (var i = 0, length = nodes.length; i < length; i++) {
        var node = nodes[i];
	var color = node.getAttribute("color", 2);
        if (color == undefined) { continue; }
	if (color.toUpperCase() == searchValue) { node.setAttribute("color", replaceValue); }
    }
}

replaceColorAttributes(document.body, "#000000", "#545454");
replaceColorAttributes(document.body, "#0000CD", "#545454");