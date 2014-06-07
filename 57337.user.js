// ==UserScript==
// @name           Facebook Grayscaler
// @namespace      happinessiseasy
// @description    Makes Facebook Display in Grayscale
// @include        http*://facebook.com/*
// @include        http*://*.facebook.com/*
// ==/UserScript==

//NOTE: FOR NOW, THE IMAGES WON'T WORK.
//YOU CAN HACK IT YOURSELF BY UPLOADING THEM TO YOUR OWN SERVER:
   var YOURHOST = "http://";
//I'M WORKING ON A MORE PERMANENT SOLUTION

//All Image/Icon Manipulation by FastStone Photo Resizer

window.addEventListener("load",
 function()
 {
  var body = document.getElementsByTagName('body')[0];
  if (body)
  {
   var style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML = "";

/////////////COLOR/STYLE/////////////////

//Top Main Bar
   style.innerHTML += "#menubar_container {background-color:#535353 !important;}\n";
   style.innerHTML += "#fb_menubar {background-color:#535353 !important;}\n";
   style.innerHTML += "ul.fb_menu_list {background-color:#535353 !important;}\n";
   style.innerHTML += "li.fb_menu {background-color:#535353 !important;}\n";
   style.innerHTML += "a.fb_menu_link {background-color:#535353 !important;}\n";
   style.innerHTML += "a.fb_menu_link {color:#EFEFEF !important;}\n";

//Search Bar
   style.innerHTML += "input.inputtext {background-color:#EFEFEF !important;}\n";
   style.innerHTML += "#universal_search #universal_search_submit a {border:1px solid #5B5B5B}\n";
   style.innerHTML += "#universal_search #universal_search_input #q {border-color: #5B5B5B -moz-use-text-color #5B5B5B #5B5B5B}\n";

//Body Background
   style.innerHTML += "body {background-color:#EFEFEF !important;}\n";

//Body Links
   style.innerHTML += "a {color:#535353 !important;}\n";

//Buttons
   style.innerHTML += "span.UIFormButton {color:#EFEFEF !important; background-color:#6E6E6E !important;}\n";
   style.innerHTML += "input.UIButton_Text {color:#EFEFEF !important; background-color:#535353 !important;}\n";
   style.innerHTML += "input.inputsubmit {background-color:#6E6E6E !important;}\n";

//Left Navigation Bar
   style.innerHTML += ".UIFilterList_Footer, .UIFilterList_EditLink {border-top:1px solid #D9D9D9}\n";
   style.innerHTML += ".UIFilterList_BlankState {border-top:1px solid #DDDDDD;color:#666666}\n";
   style.innerHTML += ".UIFilterList .UIObject_SelectedItem {background-color:#8C8C8C;border:1px solid #646464}\n";
   style.innerHTML += ".UIFilterList_ItemLink {border-top:1px solid #D9D9D9;color:#333333}\n";
   style.innerHTML += ".UIFilterList_Item .UIFilterList_ItemLink:hover {background-color:#F2F2F2}\n";
   style.innerHTML += ".UIObject_SelectedItem .UIFilterList_ItemLink:hover {background-color:transparent}\n";
   style.innerHTML += ".UIObject_SelectedItem .UIFilterList_ItemLink .UIFilterList_Title {color:#FFFFFF}\n";

//Left Inbox Navigation Bar
//   style.innerHTML += "li.UIObject_SelectedItem {color:#EFEFEF !important; background-color:#6E6E6E !important;}\n";
//   style.innerHTML += "li.UINestedFilterList_Selected {color:#EFEFEF !important; background-color:#6E6E6E !important;}\n";
//   style.innerHTML += "a.UINestedFilterList_Item_Link {color:#EFEFEF !important; background-color:#6E6E6E !important;}\n";
//   style.innerHTML += "span.UINestedFilterList_Title {color:#EFEFEF !important; background-color:#6E6E6E !important;}\n";

//Status Update Box
   style.innerHTML += "div.UIComposer_InputArea {background-color:#EFEFEF !important;}\n";
   style.innerHTML += "textarea.UIComposer_TextArea {background-color:#EFEFEF !important;}\n";

//Profile Top
   style.innerHTML += ".profile .profile_top_wash {background:#DDDDDD url(/rsrc.php/z8OIN/hash/enyi8d10.gif) repeat-x scroll left bottom}\n";

//Profile Tabs
   style.innerHTML += ".profile .top_bar ul.tabs li {background:#DDDDDD none repeat scroll 0 0}\n";
   style.innerHTML += ".profile .top_bar ul.tabs li a.tab_link {border-color:#DDDDDD #DDDDDD -moz-use-text-color}\n";
   style.innerHTML += ".profile .top_bar ul.tabs li a.tab_link:hover {background-color: #707070; border-color: #707070}\n";
//==> (More) Icon
   style.innerHTML += ".profile .top_bar ul.tabs li.selected_tab_more a.tab_link{border-top:solid 1px #707070;border-left:solid 1px #707070;border-right:solid 1px #707070}\n";
   style.innerHTML += ".profile .top_bar ul.tabs li.profile_tab_more a.tab_link:hover, .profile .top_bar ul.tabs li.selected_tab_more a.tab_link {border-left:1px solid #707070;border-right:1px solid #707070;border-top:1px solid #707070}\n";

//Profile Boxes
   style.innerHTML += ".profile .box .box_header {background:#DCDCDC none repeat scroll 0 0}\n";
   style.innerHTML += ".profile .box {border-top:1px solid #A9A9A9;}\n";
   style.innerHTML += ".profile .box_column {border-bottom:1px solid #CDCDCD;border-right:1px solid #CCCCCC}\n";

//Feed Items
   style.innerHTML += "div.UIStory {background-color:#EFEFEF !important;}\n";
   style.innerHTML += "div.UIIntentionalStory {background-color:#EFEFEF !important;}\n";
   style.innerHTML += ".profile .basic_info_summary {border-right:1px solid #CCCCCC;}\n";

//Feed Comment/Like
   style.innerHTML += "div.ufi_section {background-color:#DCDCDC !important;}\n";
   style.innerHTML += "label.comment_link {color:#535353 !important;}\n";
   style.innerHTML += "textarea.add_comment_text {background-color:#EFEFEF !important;}\n";

//Share Link
   style.innerHTML += "a.share_a:hover {background-color:#DCDCDC !important;}\n";
   style.innerHTML += ".share_and_hide .share_a{border:solid 1px #9A9A9A}\n";

//Notification Menu
   style.innerHTML += "h2.clearfix {color:#EFEFEF !important; background-color:#666666 !important; border-color:#404145 #404145 #404145 !important;}\n";
   style.innerHTML += "h2.UIMediaHeader_Title {background-color:#EFEFEF !important;}\n";
   style.innerHTML += "#presence_bar .notif_unread {background-color:#DDDDDD}\n";


/////////////IMAGES/////////////////


/* z28K9/hash/wjc46okw.png */
//Main Facebook Logo
   style.innerHTML += "#fb_menubar_logo .fb_logo_img {background:transparent url(" + YOURHOST + "/rsrc.php_z28K9_hash_wjc46okw.png) no-repeat scroll -480px -66px}\n";
//Search Box Magnifier
   style.innerHTML += "#universal_search #universal_search_submit a span{background:#757575 url(" + YOURHOST + "/rsrc.php_z28K9_hash_wjc46okw.png) no-repeat -429px -65px}\n";
   style.innerHTML += "#universal_search #universal_search_submit a:active span{background:url(" + YOURHOST + "/rsrc.php_z28K9_hash_wjc46okw.png) no-repeat -449px -65px}\n";
//Notification Count
   style.innerHTML += "#presence_bar #presence_notifications_count strong{background-image:url(" + YOURHOST + "/rsrc.php_z28K9_hash_wjc46okw.png)}\n";

/* zBFIH/hash/9datb8uf.png */
//Friend Group Icons
   style.innerHTML += ".spritemap_app_icons{background-image:url(" + YOURHOST + "/rsrc.php_zBFIH_hash_9datb8uf.png)}\n";

/* zALOO/hash/aw6u5ib5.gif */
//Edit Friend Group Pencil Icons
   style.innerHTML += ".UIObject_SelectedItem .UIFilterList_EditIcon{background:transparent url(" + YOURHOST + "/rsrc.php_zALOO_hash_aw6u5ib5.gif) no-repeat 0 -70px;}\n";
//Reorder Friend Group Drag Handles
   style.innerHTML += ".UIFilterList_DragHandle{background:url(" + YOURHOST + "/rsrc.php_zALOO_hash_aw6u5ib5.gif) no-repeat -16px -70px}\n";

/* z7M7F_hash_4k0zzgdi.png */
//Stock App Icons/Thumbs Up/Comments Icons for Feed Stories
   style.innerHTML += ".spritemap_icons{background-image:url(" + YOURHOST + "/rsrc.php_z7M7F_hash_4k0zzgdi.png)}\n";

/* z9BIW/hash/c7wov700.gif */
//Thumbs Up Icons for Advert Sidebar
   style.innerHTML += ".UIEMUASSLikeFrame_like{background:url(" + YOURHOST + "/rsrc.php_z9BIW_hash_c7wov700.gif) no-repeat left top}\n";

/* z4BZ9/hash/d0p9bnvk.gif */
//Edit Pencil Icons for Profile Boxes
   style.innerHTML += ".profile .basic_info_summary a.box_editor{background:url(" + YOURHOST + "/rsrc.php_z4BZ9_hash_d0p9bnvk.gif) left -36px no-repeat}\n";
   style.innerHTML += ".profile .info_tab a.info_edit_link{background:transparent url(" + YOURHOST + "/rsrc.php_z4BZ9_hash_d0p9bnvk.gif) right top no-repeat}\n";
   style.innerHTML += ".profile .top_bar ul.tabs li.selected a.edit{background:url(" + YOURHOST + "/rsrc.php_z4BZ9_hash_d0p9bnvk.gif)}\n";
   style.innerHTML += ".profile .box a.box_editor, .profile .blurb a.edit_link, .profile .basic_info_summary a.box_editor {background:transparent url(" + YOURHOST + "/rsrc.php_z4BZ9_hash_d0p9bnvk.gif) no-repeat scroll left -36px}\n";

/* z2B8V/hash/bsw5js90.gif */
//Profile Tabs ==> (More) Icon
   style.innerHTML += ".profile .top_bar ul.tabs li.profile_tab_more a.tab_link {background:transparent url(" + YOURHOST + "/rsrc.php_z2B8V_hash_bsw5js90.gif) no-repeat scroll 0 -1px}\n";
   style.innerHTML += ".profile .top_bar ul.tabs li.selected_tab_more a.tab_link{background:#717171 url(" + YOURHOST + "/rsrc.php_z2B8V_hash_bsw5js90.gif) 0 -26px no-repeat}\n";
   style.innerHTML += ".profile .top_bar ul.tabs li.profile_tab_more a.tab_link:hover, .profile .top_bar ul.tabs li.selected_tab_more a.tab_link {background:#717171 url(" + YOURHOST + "/rsrc.php_z2B8V_hash_bsw5js90.gif) no-repeat scroll 0 -26px}\n";

/* z4HKO/hash/2w85g3xc.gif */
//Notification Menu Delete Button
   style.innerHTML += "#presence_bar .del_button{background:url(" + YOURHOST + "/rsrc.php_z4HKO_hash_2w85g3xc.gif) no-repeat center top}\n";

/* zD93Q/hash/6aqv88j2.gif */
//Notification Menu Delete Button (Hovering Over)
   style.innerHTML += "#presence_bar .del_button:hover{background-image:url(" + YOURHOST + "/rsrc.php_zD93Q_hash_6aqv88j2.gif)}\n";

/* z7NSY/hash/ajh5dbgz.gif */
//Notes Icons
   style.innerHTML += ".notes_titles li.written {background:transparent url(" + YOURHOST + "/rsrc.php_z7NSY_hash_ajh5dbgz.gif) no-repeat scroll left 1px}\n";

/* z4ZVD/hash/9opk33m7.gif */
   style.innerHTML += ".notes_titles li.imported {background:transparent url(" + YOURHOST + "/rsrc.php/z4ZVD_hash_9opk33m7.gif) no-repeat scroll left 1px}\n";

//UPLOAD THIS FILE
//Share Link
   style.innerHTML += ".s_and_h_big .share_a {background:white url(/rsrc.php/z28K9/hash/wjc46okw.png) no-repeat scroll right -274px}\n";

   body.appendChild(style);
  }
 },true);


//TODO LIST
//-"SHOW [X] SIMILAR POSTS background
//-Radio Buttons?
//Loading: style.innerHTML += "div.UIFilterList_Loading
//Dotted line when dragging profile boxes