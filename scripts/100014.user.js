// ==UserScript==
// @name          Super Theme Final 
// @namespace     Texnolize Full Ability
// @description	  Theme and new adjustment ability
// @homepage      http://ruifujiwara.co.cc
// @include        http://*.facebook.com/
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==
 (function() {
var css = "html {background: -moz-linear-gradient( top, rgba(59,89,152,1) 40px, transparent 100px) fixed, -moz-linear-gradient(bottom, rgba(30,44,76,1) 0px, transparent 150px) fixed, url(\"http://img838.imageshack.us/img838/1456/themec.jpg \") fixed repeat center center  !important;}\n\nbody, #content, .presence_menu_content_wrapper, .presence_menu_opts, .presence_menu_content_wrapper, #buddy_list_panel, #buddy_list_panel_lists_control, .panel_item, #buddy_list_content, #buddy_list_all, #buddy_list_parent, .friendlist_name .title a, .chat_conv, .tab_handle, .advanced_controls_link, .UIMediaHeader_TitleWrapper, .dh_new_media, .dh_new_media *, .summary_simple, .who_can_tab, .uiBubbleCount .number, .tl, .tr, .br, .bl, .section_header h3 span, .header h3 span, .confirm, .fbNubButton, .fbNubFlyout, .rNubContainer {background: transparent !important;}\n\n.switch, .friend {background-color: transparent !important;}\n\n.friend:hover, .subitem:hover, #navAccount ul li:not(#navAccountInfo):hover a, .notification:hover, .jewelBox li:hover, .dh_new_media span:hover, .inputbutton:hover, .inputsubmit:hover, .UIButton:hover {background-color: rgba(59,89,152,.5) !important;}\n\n.buddy_row:hover a {background-color: rgba(180,200,225,.5) !important;}\n\n.uiSideNav .uiCloseButton, #pageHead {background: rgba(59,89,152,1) !important;}\n\n.GBTabset_Pill.selected span, .profile_actions a:hover, .uiBubbleCount, .PillFilter_filter.Tabset_selected, .fbNubFlyoutTitlebar {background: rgba(59,89,152,.5) !important;}\n\n.jewelBox, #navAccount ul, .GBThreadMessageRow:hover, #buddy_list_tab:hover, #buddy_list_tab.focused, .chat_window, .tab_button_div:hover, .tab_handle.focused .tab_button_div, .info_section:hover, #fbDockChatBuddylistNub:hover {background: rgba(255,255,255,.85) !important;}\n\n#contentCol, #leftCol, .GBThreadMessageRow, #buddy_list_tab, #buddy_list, .friendlist_name, .UIMentor:not(.UIMentor_Action) > .UIImageBlock:hover, .friend_grid_col .UIImageBlock:hover, .UIRequestBox_Request:hover, .GBThreadRow:hover, .ego_unit:hover, #pageFooter, .tab_button_div, .UIComposer_Box, .uiListItem:hover, .album:hover, #main_notes_column + .wide-right-column, .info_section, .photo_comment_container:hover, .UIStory:hover, .module h3, .video_gallery .video:hover, .confirm_boxes:hover, #fbDockChatBuddylistNub, .fbNubFlyoutBody, .fbChatTab, .board_topic:hover {background: rgba(255,255,255,.5) !important;}\n\n.UIStory, .uiSideNav, .friends_online_sidebar, .buddy_row, .item, #rightCol > div, .friend_grid_col .UIImageBlock, .UIMentor:not(.UIMentor_Action) > .UIImageBlock, .UIShowMore_Pager, .UIWell, .UIUpcoming, .UIRequestBox_Request, .fbxWelcomeBox, .friend_list, .UIUpcoming_Item:hover, .GBThreadRow, .uiListItem, #friend_guess_grid_see_more, .box_row, #intro, .ego_unit, #footerContainer, .right_column_container, .profile_top_wash, .profile_bottom_wash, .profile_actions a, .blurb, .box, .secondary_actions, .ThreadListWrapper, .pageScan, .UIStandardFrame_Container,  #photoborder, .photo_metadata, #photoinfo, .commentable_item, #photoinfo #rightcolumn, .UIWashFrame_Container, .UIWashFrame_Header, .UIWashFrame_Content, .panel, .album, .bar, .UIMediaHeader_Container, .profile_name_and_status, .photo_table, .main_content, .extra_content, .note_body, .app_tab, .walltext, .photo_comment_container, .photo_comments_main, .photo_comments_container, #newalbum, .title_header, .tabs, #upload, .summary .body, #profile_settings, #video_info, #tagger, .video_gallery .video, .UIMediaHeader_Nav, .video_with_comments, .video_pane, #upload_form, .UIFullPage_Container, .confirm_boxes, .UIHomeBox, .profileInfoTable, #fbChatBuddyListParent, .friend_list_container, .fbNubFlyout:hover, .board_topic  {background: rgba(255,255,255,.25) !important;}\n\n.uiHeaderNav, .ufi_section, .UIIntentionalStream_Top, .UITitledBox_Top, .uiHeader:not(.fbx_stream_header), .GBControlHeader, .chat_info, .box_header, .unread, .dh_new_media span, .note_header, .photos_tab_header, .single_photo_header, .wallheader, .UIMediaHeader_Container, .inputbutton, .inputsubmit, .UIButton, .item:hover, .section_header h3, .header h3, .confirm_boxes .UIImageBlock {background: rgba(180,200,225,.5) !important;}\n\n\n\n#webmail, .box_row, .uiSideNav *, .GenericStory_Body, #presence *, .message_pane *, .ThreadListWrapper *, .box_row, .box_row *, #contentArea, #footerContainer, #leftCol, #contentCol, #rightCol, .box, .app_custom_content *, .box_column, .uiListItem, #myphoto, #photoborder, .UIMediaHeader_TitleWrapper, .panel, .bar, .photo_table, .UIPhotoGrid_PhotoLink img, .main_content, .extra_content, .profile_info .item, .note_footer, .ufi_section, .wallinfo, .wallactions, .who_can_tab, .summary_simple, .privacy_widget, .privacy_widget *, #video_info, #tagger, .confirm, .profileInfoSection, .fbNubButton, .friend_list_container *, .board_topic {border: none !important;}\n\n.UIStory, .UIShowMore_Pager, #rightCol > div, .GBThreadMessageRow, .uiHeader:not(.fbx_stream_header), .UIIntentionalStream_Top, .chat_input_div, .UIComposer_Box, .blurb, .box, .secondary_actions, .GBThreadRow, .GBToolbarTop .UIWell, .GBControlHeader, .GBToolbarBottom .UIWell, .ThreadListWrapper, .pageScan, .uiList, .album, .dh_new_media span, #main_notes_column + .wide-right-column, .note_body, .info_section, .photo_table, .photos_tab_header, .single_photo_header, #photoborder, #photoinfo, .wallheader, .walltext, .photo_comment_container, .photo_comments_main, #upload, .inputbutton, .inputsubmit, .UIButton, .uiSideNav, .video_gallery .video, .video_with_comments, .confirm_boxes, .rNubContainer, .fbNubFlyoutTitlebar, .fbChatTab {border: 1px rgba(20,20,100,.25) solid !important;}\n\n.GBToolbarBottom .UIWell {border-top-color: transparent !important;}\n.ThreadListWrapper{border-bottom-color: transparent !important;}\n.confirm_boxes .UIImageBlock {border-bottom: 1px rgba(20,20,100,.25) solid !important;}\n\n\n\n.UIStory, #rightCol > div, .GBThreadRow {margin: 4px 0 !important; }\n#buddy_list h2 {margin-left: 0px !important;}\n.uiSideNav .uiCloseButton {margin-left: 170px !important;}\n.uiSideNav .uiCloseButton input {margin-top: -3px !important; margin-left: -1px !important;}\n.pageScan {margin-top: 10px !important;}\n#intro {margin-bottom: 15px !important;}\n.box {margin-bottom:5px !important;}\n.buddy_row, .uiListItem  {margin-bottom: 2px !important;}\n.uiHeader {margin-left: 0px !important;}\n#footerRight {margin-right: 10px !important; margin-top: 4px !important;}\n.tab_handle {margin-right: 5px !important;}\n.advanced_controls_link {margin-top: -4px !important;}\n#right_column {margin-right: 10px !important;}\n#left_column {margin-left: 10px !important;}\n.ThreadListWrapper, .section_header, .commentable_item {margin: 0px !important;}\n.GBToolbarTop .UIWell {margin-right: 5px !important;}\n#photoborder, .single_photo_header {margin: 0px 20px !important;}\n#photoinfo {margin: 10px 160px !important;}\n.divider {margin-top: 2px !important;}\n.photo_metadata, .profile_bottom_container  {margin: 0px 20px !important;}\n.UIWashFrame_Header {margin: 25px 20px 0px 20px !important;}\n#main_album_content .album_cell {margin-left:18px !important;}\n.photo_table .extra_content .album_cell {margin-left: 6px !important;}\n.info_section, .profile_info .item {margin: 5px !important;}\n.uiHeader .uiHeaderTitle {margin-left: 20px !important;}\n.fbx_stream_header .uiHeaderTitle {margin-left: 15px !important;}\n.uiHeader .lfloat {padding-left: 10px !important;}\n.photos_tab {margin-left: 23px !important;}\n#info_tab {margin-left: 15px !important;}\n#feedwall_with_composer {margin-left: 15px !important;}\n#tab_canvas {margin-left: -170px !important;}\n#main_notes_column {margin-left: 0px !important;}\n.box_tab {margin-left: 27px !important;}\n.photo_comment_container {margin: 10px 55px !important;}\n.photo_comments_main {margin: 0 50px !important;}\n#results .album {margin: 15px 100px !important;}\n#upload {margin: 0 100px !important;}\n.note_content {margin-left: 10px !important;}\n#player {margin: 10px auto !important; float: none !important;}\n.mvp_player, .profile_top_wash, .profile_bottom_wash, .UIStandardFrame_Container, .UIStandardFrame_Content, .UIWashFrame_Container, #content {margin: 0 auto !important;}\n#video_info, #tagger, .commentable_item, .video_gallery .video, .video_with_comments, .board_topic {margin: 10px !important;}\n.UIMediaHeader_Nav {margin: -5px 70px 10px 70px !important;}\n.summary_bar {margin: 10px 10px 0px 10px !important;}\n.profileInfoTable {margin-top: 0px !important;}\n#main_notes_column + .wide-right-column {margin-left: 695px !important;}\n\n\n\n\n.UIIntentionalStream_Top, #buddy_list_tab, #buddy_list, #buddy_list h2, .uiHeader, .GBControlHeader, .chat_header, .chat_window, .tab_button_div, #headNavOut, .tabs, .tabs li, .tabs li a, .single_photo_header, .right_column_container, .photos_tab_header, .see_all_link, .section_header h3, .note_header, .app_tab, .uiListItem:not(.buddy_row):first-child, .wallheader, .uiSideNav li:first-child a, #profile_settings .header h3, .module h3, .confirm_boxes .UIImageBlock, .UIHomeBox .UITitledBox_Top,  .box > .box_header, .rNubContainer, .fbNubButton, .fbNubFlyout, .fbNubFlyoutTitlebar, .friendlist_name, #fbDockChatBuddylistNub, .fbChatTab  {-moz-border-radius-topleft: 8px !important; -moz-border-radius-topright: 8px !important;}\n\n#footerContainer, #pageFooter, #intro, .GBToolbarTop .UIWell, .GBToolbarBottom .UIWell,  .uiListItem:not(.buddy_row):last-child, #photoborder, .photo_table, .walltext, .uiSideNav li:last-child a, .profileInfoTable, .friendsList {-moz-border-radius-bottomright: 8px !important; -moz-border-radius-bottomleft: 8px !important;}\n\n.profile_top_wash, .UIWashFrame_Container, .UIWashFrame_Header, .UIMediaHeader_Container, .UIStandardFrame_Container, .title_header, .lock_b   {-moz-border-radius-topleft: 8px !important;}\n\n#navAccount, #navAccountLink {-moz-border-radius-topright: 8px !important;}\n\n#leftCol{-moz-border-radius-topleft: 8px !important;-moz-border-radius-bottomleft: 8px !important;}\n\n.photo_table .extra_content {-moz-border-radius-bottomright: 8px !important;}\n\n.photo_table .main_content {-moz-border-radius-bottomleft: 8px !important;}\n\n.UIShowMore_Pager, .UIStory, #rightCol > div, .GBThreadMessageRow, .UIToolbarWell:not(.GBToolbarTop):not(.GBToolbarBottom) .UIWell, .GBThreadRow, #friend_guess_grid_see_more, .box_row, .UIComposer_Box, .blurb, .box, .secondary_actions, .fbxWelcomeBox, .ufi_section, .unread, .pageScan, .photo_metadata, #photoinfo, .commentable_item, #photoinfo #rightcolumn, .album, .profile_name_and_status, .dh_new_media span, .info_section, .profile_info .item, .note_body, #main_notes_column + .wide-right-column, .photo_comment_container, .photo_comments_main, #upload, .summary .body, .inputbutton, .inputsubmit, .UIButton:not(.UIActionButton), .uiBubbleCount, .uiSideNav, .PillFilter_filter.Tabset_selected, #profile_settings, #video_info, #tagger, .video_header_bar, .video_gallery .video, .UIMediaHeader_Nav, .summary_bar, .video_with_comments, #uploaded_panel, .confirm_boxes, .UIHomeBox, .uiListItem:only-child, .uiList:not(.friendsList), .board_topic {-moz-border-radius: 8px 8px 8px 8px !important;}\n\n\n\n.GenericStory_Body {padding-top: 8px !important;}\n.GenericStory_Pic {padding-top: 9px !important;}\n.uiSideNav li{padding-bottom: 2px !important;}\n.UIIntentionalStream_Top, .uiHeader, #intro {padding: 4px !important;}\n#footerContainer, .photo_metadata, #photoinfo, #photoinfo #rightcolumn {padding: 8px !important;}\n.friend_grid_row .UIImageBlock_Ext {padding-right: 8px !important;}\n.uiHeader {padding-left: 6px !important;}\n#contentArea {padding-top: 2px !important;}\n.ThreadListWrapper, .profile_name_and_status {padding: 5px !important;}\n.uiListItem:not(.buddy_row), .pageScan .lfloat, .pageScan .rfloat, .single_photo_header, .section_header h3 span, .header h3 span, .minor_section .left, .minor_section .right, .module h3  {padding: 0px 10px !important;}\n.info_section, #profile_settings, .video_thumb, .video_with_comments {padding: 10px !important;}\n.profile_info .item {padding: 3px !important;}\n.album {padding: 5px !important;}\n#photos_box {padding-left: 0px !important;}\n.dh_new_media {padding-right: 50px !important;}\n.notes_button {padding-right: 65px !important;}\n.UIMediaHeader_Container  {padding-left: 10px !important;}\n.photo_comments_main, #upload  {padding: 10px 0 !important;}\n.UIStory {padding-right: 10px !important; padding-bottom: 4px !important;}\n.video_header_bar {padding: 5px 10px !important;}\n.UIMediaHeader_Nav, .summary_bar {padding: 5px 10px !important;}\n.commentable_item {padding: 2px 0px 2px 0px !important; }\n.UIRecentActivityStory, .UIRecentActivity_Stream {padding-left: 8px !important;}\n.UIFullPage_Container {padding: 20px !important;}\n.confirm_boxes .UIImageBlock {padding: 4px 8px 2px 8px !important}\n.UIHomeBox {padding-bottom: 4px !important;}\n.UITitledBox_Top {padding: 4px 8px 4px 8px !important;}\n.profileInfoTable .label, .profileInfoTable .data {padding-left: 5px !important;}\n.profileInfoTable tr {padding: 5px !important;}\n\n\n\n\n#people_search {width: 250px !important;}\n.profile_top_wash, .profile_bottom_wash, .UIStandardFrame_Container, .UIStandardFrame_Content, .UIWashFrame_Container, #content {width: 980px !important; }\n.app_tab, .box_tab {width: 520px !important;}\n#feedwall_with_composer, #info_tab {width: 680px !important;}\n#main_album_content .content_wrapper {width: 708px !important;}\n.UIWashFrame_Content, .profile_bottom_container {width: 941px !important;}\n.photo_table {width: 861px !important;}\n.photos_tab_header {width: 841px !important;}\n.main_content, #main_album_content {width: 680px !important;}\n.photo_table .extra_content {width: 190px !important;}\n.uiSideNav li {width: 178px !important;}\n.photos_tab {width: 870px !important;}\n#tab_canvas, #tab_canvas > div {width: 710px !important;}\n#pagelet_ads {width: 0px !important;}\n.note_body, .wide_note, .notes {width: 660px !important;}\n.note_content {width: 640px !important;}\n#headNavOut {width: 784px !important;}\n.topic_info {width: 440px !important;}\n\n\n.confirm_boxes:hover, .UIStory:hover, .info_section:hover, .GBThreadMessageRow:hover, .jewelBox, #navAccount ul, #buddy_list_tab:hover, #buddy_list, .GBThreadRow:hover, .chat_window, .tab_button_div.hover, .uiListItem:hover:not(.buddy_row), .album:hover, .photo_comment_container:hover, .video_gallery .video:hover, .board_topic:hover {-moz-box-shadow: rgba(30,44,76,.5) 0px 0px 2em 4px !important;}\n.UIPhotoGrid_Image, .album_thumb, .photo_comments_image img:hover, .mvp_player embed, .video_thumb_link {-moz-box-shadow: rgba(30,44,76,1) 0px 0px 1em 0px !important;}\n.UIPhotoGrid_Image:hover, .album_thumb:hover, .mvp_player embed:hover, .video_thumb_link:hover {-moz-box-shadow: rgba(30,44,76,1) 0px 0px 1em 4px !important;}\n#myphoto:hover {-moz-box-shadow: rgba(30,44,76,1) 0px 0px 2em 1em !important;}\n.subitem:hover, #navAccount ul li:not(#navAccountInfo):hover a, .notification:hover, .jewelBox li:hover  {-moz-box-shadow: rgba(30,44,76,.5) 0px 0px 1em 3px, inset rgba(30,44,76,.5) 0px 0px 3px !important;}\n.fbNubButton:hover {-moz-box-shadow: rgba(255,255,255,1) 0px 0px 2em 3px !important;}\n.friend:hover {-moz-box-shadow: inset rgba(30,44,76,.5) 0px 0px 3px 1px !important;}\n\n\n#pagelet_pokebox, #pagelet_adbox, #contentCurve, .chat_input_border, .UIStandardFrame_SidebarAds, .UIWashFrame_SidebarAds, .module_right_line_block, .lock_b_bottom_line, .shade_b, .divider {display: none !important;}\n\n#pagelet_ads, .uiHeaderNavEmpty {display: block !important; visibility: hidden !important;}\n\n\n.subitem:hover .count, .inputbutton:hover, .inputsubmit:hover, .UIButton input:hover, .dh_new_media span:hover {color: #ffffff !important; }\nh4, .copyright, .notification:hover .timestamp, .UIRecentActivity_Header, .buddy_count_num, .tagline, .uiTextSubtitle, .UIActionLinks, .date, .count, #status_time_inner, #status_time, .label, .sampleImageCaption, .title a, .uiTextMetadata, .UIStoryAttachment_Copy, .timestamp {color: #FFFFFF !important;}\n.inputsubmit, .UIButton input, .inputbutton, .UIStoryAttachment_Label, .UIStoryAttachment_Value {color: #FFFFFF !important;}\n\n\n#pageHead {position: fixed !important; width: 983px !important; top: -1px !important;left: 0 !important; right: 0 !important;margin: 0 auto !important;}\n#blueBar {position: fixed !important; width: 100% !important; margin: 0 auto !important; top: 0px !important; height: 41px !important;}\n#content {margin-top: 41px !important;}\n\n\n.dh_new_media span {text-shadow: none !important;}\na:hover, a span:hover, .comment_link:hover, .like_link:hover {text-shadow: #FF00001px 1px 4px !important;}\n\n\n* {text-decoration: none !important;}\n\n\n*{outline: none !important;}\n\n.inputbutton, .inputsubmit {-moz-appearance:none!important; }\n#main_notes_column + .wide-right-column {position: absolute !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
javascript:var o=document.getElementById('pageLogo').getElementsByTagName('a')[0];void(o.style.backgroundImage='url("http://img831.imageshack.us/img831/4821/fakenotelogo.png")');void(o.style.backgroundPosition='0 0')
var logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAAAfCAIAAAB1UkQCAAAABnRSTlMAAAAAAABupgeRAAAG0klEQ"+
           "VR4nO1Ya0wUVxQ%2Bs7O7s7AsLC9REAXfr%2FqIIjG20mprTaimWLESaW1tbNWgrdY0aQhVYm2axtQXQdJWo4iKVkOt2BhRfAAK"+
           "LApWEQRXHsLusizsm33Mzk5%2F3GVY2NlxScVf%2B%2F26c%2B53zzn3zLn3nBkAP%2Fzwww8%2F%2FMBeyth39OasKVEhQQQAa"+
           "I3WlHdnjrxXAACffnc%2BWCLKyVo10oZWbsmPDBNLg0S%2Ffp%2F8ajReLWsiSYruh95ofTV6OXHx2uP79Z0dKn1nl36kbV251f"+
           "joqUrdY3r0VPVqNBb8XUsPRq%2B%2B79Wo5kSPrg%2BZM5hG%2FCUxW2tu0%2Fi%2Bis8xlzgnlhnrDNZefZ9G9zqiRpIUGlAUP"+
           "dK27CQlFOAAQDuHYYvHMRdACNDA6XTuPnJ94rjwxNmxHHw%2FAADalTqUvfb%2Bl%2F96oOo2IrtavWWkbdnsDmSrqaXb91XsJ3"+
           "T%2F8bKJ48LCQ0ToEedBSUWzyWLXG6yfrZ5%2F5nJdQIArDR0Op0pjqm%2Fuysv%2B0F3DxsyLSxMnxMWEigOEdpLq0ZnlL7SVd"+
           "e2n938MAOt3nXt7YfzU%2BEiJmLCTlKLbUCZr9SxhOI7l%2F%2FVgfLRUIiZIytmpMlyraHY3tDX70pL5cbHRUkKIW6yONoW2tO"+
           "r58X0fuSvxheOOtJ2Fe7Ytw3k8ALDZHTMnR%2FkYSqh53EGzobNL%2F2VWEUVRQ%2BSkgyqtlDPLj12o6bPYPZcfKbgHAD%2F%2"+
           "FdltvtA6Zcjqd%2F9x5ipYzueYJi5XMzrmBaEUl9e71nSEcu1DDePJSjmeu3a5%2BzjCv3Gr0NWQAIHvEHrWHjcrsnBvetnT41F"+
           "0A4CAcPFmRtrOQNaAMgTtqNE23dPQCwIET5RycAyfKfeQMiVrmwWtOpxNJOrv0KRkFrPFhP6F1DQob6Zg%2FI0ZE8AGApun79Qo"+
           "b6ah9otQbrRW1bYgmwPHxMdKo8CD0iGpuWvJs9EjTUNugeNaqAYDw0MDoUSE9ur6khPgAket035G1XLrREB8btil1ASHkA8DKd6"+
           "Z9A0AD3a%2BBbpB3P5GroyKCFs8bx%2BPxAGB0hAQAkpOmunmrbG7rmTtt9OS4CCRJTpq6wzcOA1RCN69LxDAMOZ9XWF2Uk%2B4"+
           "9tbyAqQak92qwftc5q41EtAa5GgAMJtfpa1PoPPmllXLmbW%2FNvoSE8vYeJNEZLACgUBvQo9YwUA0Yjs3uAIBevaunU6gNiJCS"+
           "UcAIUV%2FpC4fJtYeNymMXahjf7shaOCLD1a%2FxMPbvrdTtp6dMiJQEEgBgsZEURbn0YAAAAj6OaAa2DwmcN6BzT8ayH7YaASA"+
           "0JMDlDT64E3JroUx9dlbfTGYbGhTlpB%2FK1IUGBzCzvnAYjImUpK6YhcZag%2BWPP2Wse3f5yTHHit%2FPV695%2Fw1psMgbga"+
           "Zde8W4ekEAgMgw8RCJQIAPUuUWtiGbZCYwt9eA9XNonzmszsgedeb%2FspbD8%2BFFbfeR61%2BsSfCSgh5uOV%2Bi7ckztcVGY"+
           "m7qzJZBCYW5%2FVxw0uy9u3tPT%2F8PjkpjJIR8lIaL543bmHmRozsZXtQS58Qyeyy9J79b1y7g49s%2FWYQueLRJinJFi7n13U"+
           "E6Bq7Io4VVrL80WG%2BGoEAhGri23b93ghiwIhL2b2dwsnFx%2BtGlMVXWvfhq3UIAEAcKN61JOL7P0wsXhhc1IX%2Fg1NU2KrO"+
           "2Lt3%2B42UmWdA50GjN4kAhAIyPkV4ta2pq1QBAhDRw7JiQKzcbHzerly2ahPg7NiyeM7XabCFxnBcaLBodEdTwXLMtfdGAOQF2"+
           "4ES5zU7NnT4mLkaKhH1WEgC0Bgu6JWJHB5dUNDe2aBbMimFOGSojvnAYiAjB5rTE5Hf0Y6OCASBxTmzWoZK9X783rPgAAHSo9EN"+
           "qaN7ZKqbK2OwOlcZIOgZ6SBSgw6fuemuRDuVXpG4%2FzRRZT6CukrtfQ82we73zBGpifeEM6df25pYyhDaFdtWW%2FGFHTaUZ8B"+
           "5JUjIKmFAyYNrCNoUW0a6WNbE6mnumEgCyc254CxyKGvOnyBNPW7rX7jgLAB9sPln%2BoJVDiY8cRoKaZxj8XVRY%2FJA1Mlwnt"+
           "L6pSy7qBberqignPVB0bvXymTMmjcIxTK01y%2F7toJx0UkI8ALxQun4irnhrStahkiUL4mKiQkQE3%2BGgtEZrh0pf16AEgN0Z"+
           "y%2BTt55e%2FOXn6xFFSiYjHw%2BwkZTTbujQm1CUdv1AzfWJkZFiQREwQQhwALDZS02uuqVfcqn5enLcBAIrzNhTnwd7c0oWzY"+
           "6MjJQTBt1jJTrWhXNby07crkBu%2BcMpqWnGcBwDqXhOS5J6t%2BjxlPo%2BHAUCw91bBDz%2F88MMPP%2Fzw4zXhP4xva6the9"+
           "vrAAAAAElFTkSuQmCC";     

function submit() {
  node = document.getElementById("Rui Fujiwara");
  setup = {colour1:node.getElementsByTagName("input")[0].value,
           colour2:node.getElementsByTagName("input")[1].value};
  GM_setValue("setup", uneval(setup));
  window.clearInterval(inter);
  node.parentNode.removeChild(node);
}

function cancel() {
  node = document.getElementById("Rui Fujiwara");
  addStyle(eval(GM_getValue("setup",'({colour1:"#000000", colour2:"#000000"})')));
  window.clearInterval(inter);
  node.parentNode.removeChild(node);
}

function setColours() {

  var setup = eval(GM_getValue("setup",'({colour1:"#000000", colour2:"#000000"})'));
  if (!setup.colour1 && !setup.colour2)
      setup = eval('({colour1:"#000000", colour2:"#000000"})');

  newDiv = document.createElement("div");
  newDiv.setAttribute("id", "Rui Fujiwara");
  newDiv.setAttribute("style", "position: fixed; left: "+((window.innerWidth / 2) - 290)+"px; top: "+((window.innerHeight / 2) - 200)+"px; z-index: 1337; background: #fff; border: 2px solid #000; padding: 3px; width: 577px");
  newDiv.innerHTML += "<center><b><h2>Banner Colour Changer by Rui Fujiwara<h2></b></center>";
  
  table = document.createElement("table");
  
  row0 = document.createElement("tr");
  column01 = document.createElement("td");
  column02 = document.createElement("td");
  column01.innerHTML = "<center>Colour 1</center>";
  column02.innerHTML = "<center>Colour 2</center>";
  row0.appendChild(column01);
  row0.appendChild(column02);
  table.appendChild(row0);
  
  colour1 = document.createElement("input");
  colour1.setAttribute("type", "text");
  colour1.setAttribute("class", "color");
  colour1.setAttribute("value", setup.colour1);
  
  colour2 = document.createElement("input");
  colour2.setAttribute("type", "text");
  colour2.setAttribute("class", "color");
  colour2.setAttribute("value", setup.colour2);
    
  colour1Div = document.createElement("div");
  colour1Div.setAttribute("id", "colour1");
  colour1Div.appendChild(colour1);
  column11 = document.createElement("td");
  column11.appendChild(colour1Div);
    
  colour2Div = document.createElement("div");
  colour2Div.setAttribute("id", "colour2");
  colour2Div.appendChild(colour2);
  column12 = document.createElement("td");
  column12.appendChild(colour2Div);
  
  row1 = document.createElement("tr");
  row1.appendChild(column11);
  row1.appendChild(column12);
  table.appendChild(row1);
  
  newDiv.appendChild(table);
  
  buttonInput = document.createElement("form");
  button1 = document.createElement("input");
  button1.setAttribute("type", "button");
  button1.setAttribute("value", "Cancel");
  button1.addEventListener("click", cancel, false);
  
  button2 = document.createElement("input");
  button2.setAttribute("type", "button");
  button2.setAttribute("value", "Set!");
  button2.addEventListener("click", submit, false);
  
  buttonInput.appendChild(button2);
  buttonInput.appendChild(button1);
  
  anotherDiv = document.createElement("div");
  anotherDiv.setAttribute("style", "float: right");
  anotherDiv.appendChild(buttonInput);
  newDiv.appendChild(anotherDiv);
  
  document.body.appendChild(newDiv);
  
  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
  style.type = 'text/css';
  oldColour1 = '';
  oldColour2 = '';
  inter = window.setInterval(function (){
    var colour1 = document.getElementById("Rui Fujiwara").getElementsByTagName("input")[0].value;
    var colour2 = document.getElementById("Rui Fujiwara").getElementsByTagName("input")[1].value;
    if(oldColour1 != colour1 || oldColour2 != colour2)
      addStyle({colour1:colour1, colour2:colour2});
    oldColour1 = colour1;
    oldColour2 = colour2;
  },1000);
  
  /** The following code is taken and slightly modified from code by Bob Ippolito <bob@redivi.com>.
   ** See somewhere in the middle of this code for the original and unmodified copyright notice.
   **/
  var CROSSHAIRS_LOCATION =
     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVAgMAAADUeU0FAAAACVBMVEUAAPD%2F%2F%2F8AAAAXuLmo"+
     "AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfWAxYAMBoYReiIAAAAHXRFWHRD"+
     "b21tZW50AENyZWF0ZWQgd2l0aCBUaGUgR0lNUO9kJW4AAAAhSURBVAiZY2RgULvFwMBILrWK4Q8LwzXGUBD1GsajzEwAP%2FoZVv"+
     "c4N8oAAAAASUVORK5CYII%3D";
  var HUE_SLIDER_LOCATION =
     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAADICAIAAADtOM9PAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAA"+
     "CXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gMXAjE1EbdXmwAAAQlJREFUeNrtmlEOgkAMRBupy%2BL97wqsgnICPtSM7uR5gZ"+
     "fHTBtKzGeIfhmjjFQNnSZywsmeRPdwYp7ICaf%2B3yMcnx7dw%2BlH87SlirQXFWmRXZ9r%2BDk5klYaAYkdgdMJaWYb0T2cmNwT"+
     "UqN7dM8%2Bpy2uqptQRgrV8X6QqqHTRE40gu7RCPYeOeFk1r3CPNE95qk%2Fp12Wk%2Br8zGgy0gKpi0Y4Os3khBNOzBPdw%2BkP"+
     "Sbp5anSP7rnndLmrSIOMpPo7bGQNP6cpyOl9UiEnnOx3hKPTzdBppHs42e%2Fyyjzx9HiP%2BN5NqPr0kUM8VBe16ng%2FSKuh00"+
     "JOH5BmGanRCLqHEyS6hxPzRE44%2BZJeueFsJ8zY3KsAAAAASUVORK5CYII%3D";
  var HUE_SLIDER_ARROWS_LOCATION =
     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAALCAQAAABfL%2FyJAAAAAmJLR0QA%2F4ePzL8AAAAJcEhZcw"+
     "AACxMAAAsTAQCanBgAAAAHdElNRQfWAxYPFQ14OfqVAAAAnElEQVQoz63Suw2EMAwGYJ9Ss0BaBkCsAYtki6uRmAM2yRwREh0Sgc"+
     "hURj%2FNne5o7oEsV3bx2bJNI7hBBrocGTcjqEW%2FcRQHc4Ew4jj2Wwu6gVDCpzWg%2BhOp1uBTCcId9KzVCCl6FD8SRfQh1Y%2"+
     "FkjSEYuH3mpYP9Qtilm9ntry2cGALBYhCZkH9AcpkGOXfSn0ZhNyqXUvkbnS8%2BAP2Frl9tNFLoAAAAAElFTkSuQmCC";
  var SAT_VAL_SQUARE_LOCATION =
     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAAAAAnNCSVQICFXsRgQAAAAZdEVYdFNvZn"+
     "R3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAsAUlEQVR42u1823IkOXakA0FWVXdLM6Oe1a5GL2u2L2u2%2F%2F99jE1mBAD3cx"+
     "yISFaP9NI21qQimRcWHH47CKpgx8fjvz19v3%2F186%2F47%2FjM13%2BD%2F5LfsvwJyJ%2BA%2FAnIn4D8CYhe4QqQ8tOfWW6%"+
     "2BoiwAKeYdiv6evHQf9MnnVaGflef39vXze31%2Brx%2F18%2Bv%2B9vi%2B7T8%2B3vZv%2B%2Ff9f3782%2F6f%2B%2F%2F7gw"+
     "C5eH35KYaUe5sAZf0brH8vA1eJcBPs9F0BOWAQQD4hOH6yPa8%2Bgfj83%2FsDim3%2F9eN9%2F%2FH43z8%2Bfn8A8n%2B%2FBM"+
     "jFfi9fkKz0GuBqt17Dfi5RfLTIZ5QJICW9Q6FPKcKJ0r%2B3qwbB8b9PZtQTkMaMbf%2F2AORt%2F%2B3j%2BwOOX%2Fb%2F%2FP"+
     "j7%2Fh%2F7%2F3kBECx070VOlbjkt5d3sd%2BxWHoja0VBC4AUgavIaxSC4zmlA3JcNUAOkXoyAw8YPg5mHIB8itX7%2Fi9PQH59"+
     "APL7%2Fr%2F2%2F30JCL4gQE8WlUuGFA8IPMBl%2FQ4f9Lqp4OTFffwMV47AslQYkJ394fh%2Bfj2BGCJVniJ1cOP98d%2BnWP3y"+
     "EKv3%2FV8%2FfpyA%2FG3%2F9%2F0fC0D2l%2FX8hkEX%2FxmT1xQnQPscJg%2FIECXnAIMh9BWWC0GWDnhOLiACUjsgjRmfgGyP"+
     "r98%2BPgF5wwDklwcg%2F%2Fj46%2F73B0duA1IuTX3FiRIASI861T9lsrg8lSGAdwAnOOO5ZYA29wfkzDTkaYjTU6p2ZkY5odi6"+
     "jdfuHW8PGD4B%2BcvJkP94APL7gyMeENwOixecKDYGFJOyyhyufIVirT4BgmjJLEP0Fc4f2tITBOwWHZDmGiRVOACpZOMHIBsD8v"+
     "GObydDfnkA8pf93x4cKVchtkxTVpnLEi4dIOT72CMKZr9BMe9QvD%2FsElZzU8BgBMuRfDchlowbDQKcSeqEpXeNjbyjAfL9BOQz"+
     "8D4AeYbeXx495F%2F3vz4gyYBgIh8CVtknmo%2Bl6yBLn75TmcpkMZ9dwiYoi8rGvkDpqF2BOTF%2BKsygJDX8oj43TxMpDbinWO"+
     "HwjsM9MiDfnwz5949%2F2f%2By%2F20NSJlkLpt4sLBky6kuZ6tISuJUYuxdQZBC6xCpAhNhB0CYuUXZBxeGSDV4tmDm9QnMIVZv"+
     "T35sT4a8PQD5%2FPr%2BkKxvJyCfDPkfD0A%2BOVKSd0xFxhe4Mk9SXnDgTb2Q05TIHydHH8q4woDsboxxfEYQpQHIrhB0IFAEGE"+
     "pSEnCbZNXeOIZ7tOZxBN7AkEcP%2BY5f9r9%2F%2FLZ%2FQnIPEHgBKzu8AFmGTX1hzgKz%2B4MzjMXGpEVg0qyZFyxW3LSHfWPU"+
     "PWEIhmtk7yhn0D2%2BPuzcAPIshvix%2F%2F4A5Lc5ICVlrhR7UzNugdKmItezoYOLMgD6MBOk3Y4xfGjdba1zJa%2F%2FFzqGDk"+
     "AaBCxVI1dhBN3GjMd31MSQh4egecghWe8EyK%2F7J0dKDrEh8ew3UlIIrZcTUqTq9hEtvwTYg1SlLs2Zqf8McfxX%2BqPBxKl3r1"+
     "0DvWtUsfGazfxp5y3uHg3kwRAwQz6L4ees9wd%2B%2F%2FhlBkhJNr4aUahwmd3%2Fod5hkxPLEpIcOWYguEb%2FvcajnRecnFLJ"+
     "O0082vhe4mQKHRDykBh0t715R2lVEAzIp71%2F3xmQT4Z8ewDyt4%2FPvv7bBSBY73cNumXCKWPXe%2FIKGg6WAJf0B5QkWcW4Rg"+
     "kD8RhlAQWgg8AiBZasYiSrnh5SaUhSUNOw5H0nhnxKFhiQT4Z8fwTeX54jlBUgMPa7MPViISyGPVGGkmvwdKlDWgykRUw9dIw9l7"+
     "yQo0CeQQPzYeqHP4TmIeORBywY7nF6CN46IMc4sXtIM3U8m%2FqDG7%2BdgPx1BkiZBV1oykqZCX5%2Fd8nDfLxtmwNSj1AIiBmj"+
     "d9OiS8AdYpVntcMrCp3tHS18DNFHK9fxSB%2BSNDNvcRfEkM%2Bv6JJ1eMg5XDwA%2BfYA5JhplVT6BJDixaoNrcPpRjE%2BM8Ai"+
     "XwgFsyDNXs1V2Q0wVPNKl1AZgyDMaiXmVkpZ45o4sc%2Bbx%2FbkD02t%2BonHWQhx5Ks2MtlwNPUfrRg%2Bv%2F72rIffHy39GK"+
     "EsASmToUay8dWUyXkHjf9mQjSCwDQzQYaB4GHgUeeIIQLT55U0DcicCqFxQIIu9KzjbOjNQ%2FZKKWvDKVm9hxBDBJBvJyA%2FIi"+
     "A2JWmuQjG920xXY67afXIqPONKpxEYuYiWdXAjXxUHCMp8ZrvL7HbnE7%2B6880JvQQ%2BzbyNScZpYD%2F5AM93W8qKPaQB8usJ"+
     "yDFCmQEyFSDLmmtuYNoi5Lyu7IsExdKFLFLEE5GzC9c4PAMyFgHGnAoyHuH%2B0WNvJQ854y4IkMfVN1MMP039De9nXz8A%2BR4B"+
     "8RCY0zfXIniuBC9nplXsdvQRXhPnVEWANpwwpxiZIRxs0SNtvDmhyHVVyUIEpMfdnY%2BkJGWhnYf8%2BHg%2FAXk3gCD2bQsIxd"+
     "6RsiY%2B8aFi1F5hgy2LFCZzWeULdY0CBE7AiBM3D%2FEMeMmiY9k%2BHqnkGsND6vAQjP5xpKwMyCiGD0Ae8BwMeTZ23AEEbhQe"+
     "rBnBonPD5jqHLEp6nhE4AZuneDKF1LszIIi5qkrvyHmKYAmStVHsbUD0w9p99I9PsTpS1kOyoIBsAsjZ2PGZtiaAGE5g5g%2BWG5"+
     "jYtwGAY68cp3pxigORIFnJLeAGhl2snntfbRydE72H7GOi%2BylZlU5AWhU8vr%2FJULGdhDxNHQOQ7WTIs6%2FvDZBPhnxjQIxI"+
     "wQ474E19UvJkyGLiLaxxA25Ky%2BVvz5I1GMLeUYU3o2lw9QP6nAq5k7NkVYKngsaJ%2FfyjNfVNAXma%2BycUDw%2FBdgLyft7q"+
     "cAASGJKyElzvJsOGHf%2BBu3khCEuGoh%2BgQlJSGg4O1sAZd%2FeHfTIWaYxBlKo2NoxVUCogjGQhjhOPwGtMHdsYv%2Fc7Fh8N"+
     "5WRIA%2BS3JyCOITCtAlaUXMdwxo3UMFjIYAYiu70Jh8Yi6TxDe4hhRkHu4o0Xw8BrP4rKQLRuzpLVGnq7Ge5tH6OTfjSFkyEnIM"+
     "8jXLSDqgbIr5eA7DIONFKTjN%2Fs%2FuAZYXjO7GIWmPE50mHrnscjEnCR5lS7ubGt%2F0wmuUiS9TTuqt08eYiYuktZgyHnucjn"+
     "jdYDkHcPSJauaPEy1IBpGeYAVfgSjJrf19t4irRIN%2BogBVxpHGlatXMRTIdP%2FacDiGbnlaSrYnhIMvUxy9pPhpzF8HkrKQ7J"+
     "%2BgTkGKF83qX1fgKCRWba4%2BldONuO53VI9Q7mfFt5wyIFc5LRuIA0uw2SVYQvAlY849i5i3c7l6DL8NRT0NrpeY%2B958%2Fe"+
     "nhb%2FJieF9cmNp6mj3US64WTI2Ud%2BPPv6eaCLb3cAKaEKFmRYSkpSiS%2BIzynh9eITKxsHi1wxklUHXzAGiMlDxsCkDUsQgi"+
     "6fl2P8qU3zkPMEBAtTP2%2F%2FOXrIEX%2B%2FPx1FATmPq14BpCB1DMuFC054z%2FBdo8sbGXZoFQxTlKxeAXe%2Bd6TnKklV6G"+
     "GW%2BdK4EE5Adh24H7I2TP3zPd732ENq7yGHkzAgxy0PDwfBXLKQjkxnpo7UIiYVMKatYvkxyVMBCEiUHR5SSNa0g3dguGk0a%2B"+
     "9iFcaI1ENYsuoJj8Te08wLhqlvx4khzth7pq1v558jHI29MeR5XJUAQUpJM0CQslPnTX6FDD6gyYmKHRBahTN1GYRgIll96SETXD"+
     "AEYXCoAZd6CMLAHeGMsHnIuDEO%2FL3F3vaXIQaQ%2FROSXz4z15cBUTPnrhEYVnLADaYee3ef2qJM4CkpXUnpa4NDFD%2Bt2osx"+
     "9fZ%2FyfQqSBVLVg09pN2JFc5DMFKWA6T19XbC%2FsaAlPidx4mYhNjJ1xBwEY6XELpFZ4izcQeERForWY09lKuEEyPgXjCkS9U5"+
     "y2qSdY4Ty2njBeohb03CDg85Je1bD7%2FHyeEGvuUhMGQFyAkEwh0ghkUTH4nwjJsSgDQilFGhgDUXKWaCdo10dY4TNeYahohUtT"+
     "5SRxuJsbd%2F5ZTVTP3o7d%2BojbSZVmPIjzUg5moGCIFWbsCjO9xbenxOtu9s6kOqQIbdzwLPYNuHJZAiGE0devJRd7k7cc8e0k"+
     "y930K6aw%2FpsRetjTRAvndA5pJl%2FWHs3ZTHjIcEi0dRw4%2BPBgmLnCBwMCl%2FbkgiztHPBNuA3QqXStYARAbuwUN6D4Hc04"+
     "tw5yIUkDbTOgDZnpIVAZmbt4iLadjzirfLXSHziDvhibuKix8hmEgW4jyX%2Fybw%2FKkwpKqpt1t%2BTqk6Y696CHj8%2FgnB8Z"+
     "0AOYfwvbE%2FAfkE5pCsNw%2FI7OvCI%2BZQuCtt35qriC%2FF%2FIwe1TYOCbqQPyKAzVXUxRGbB%2FGCDm2pofem3m2cTL2dhx"+
     "zfz7%2BgOvsIAXIw5Pib3OYlXwAkghJqHkpylHTFNyVAZrdYcSI%2FWoOpG8nS5hGuKg8XIUdRx9QKEZAaRidvF6Zez5A7CuLR1B"+
     "sw54Hu1wA5FzYtbx%2BEyJRpJlLJtjX28u6HDA4xy1Whk8sA8bRx8B9pgnJUY8%2BCIdJDKsZfSY3RSfOSt2DqDEib%2Bh5fWx%2"+
     "F5to9h%2FBIQuR9kNIbRsAHZ0enKQWBsWzLTghNi6to1gCBSRf%2FuSRjUeFPD6CQwZCpZjSFn7AUB0oaLqAGY1kMyIK0efg7jtx"+
     "kgIlIo0kN6yoK0iysIQCfigUUm6HLKQmJI39NYitTJE%2B4aH%2FQ1pixQN%2B%2FAkJkjAaKxFwkQAqb1kHeqh44h2wmIgkCcaH"+
     "3kYumFN1GybNcIS36LE4MZwESsBqDDJTCOZU3QHT0kMySa%2BVSyQD1EPQQtZdUzZbXwS%2BeHNNn6FK0vAJK4FAGZxtvElA8HR4"+
     "Jgz4NDgOZVoNE6dDgCEamzECKnqilDcEOyvgBIFcl63hN%2F3Bx0B5Bh24Ebkpmyh%2FBz2K5N60CZAJQYA%2FYJXwLRl77fURI4"+
     "gQQAlBPn40vJyh5Cpr5JU3%2Ba%2BlEQQbfN7Xo6chcQ2zr6M%2BGyEy10cosUarG09JS5pPyJkCVTl8pH0ytwqkKQrCo%2FreMs"+
     "HXQ3L7yHFDTvMID0gtgkq81%2B38jcZ4DAZaaZOMkEagKBFELEya0yJApYJb9xA0QEwx5Dki5VMN2cs1aMvSc3%2BrQ3jE7qPoB5"+
     "a7cBURt5SlVIWa2HnPfCdy9pDGnmPgFkzLJk13uwCKYC2zVCIZwxZOYhaUhCECTXSHkqDUeyhyRT30YbwRjDS1PvnGiAHE2d%2Fh"+
     "xhpKzOl36XFtrU96yJp5dkQEAnGBGQmVtgJkv8M3GHDmEBcQhhLBLESQSM09Ww84%2FkGaCBe%2BQGAVC6OJ3wEC8qar%2Bh%2Bi"+
     "lcfbjYZ1mdKScgBzM6IG9P7%2Bi3POzCkFPADCDnneyu4KFPcr2puyTlxiAwDMlJaogUWJxax1BO9OaBMN8FnXUMv6Alh2EID9zJ"+
     "1Luj9Nt%2FwLOswj2ETb3Pss4T9p3%2BSBoKyBl%2FLwEZxc6mLH6UBoWYSpbLVpkhMVedzxXR0gEi8UWZcjID2jwwUlZiSEXoId"+
     "jaiSGN3Qv6n3mi3%2BTQi6HE39M7hCGHl9wBxCSpBIjad1505kv%2Fc0zER0u%2BJv4UAfEOQ8azBheAGHRjypqaOoKZ95R18sX0"+
     "kHO4mGZaz4lW9xJiSOdJT1sekGzxMiqUrLQSKfUDhEWW4WLgRBqPjKmVdA2Tq2Bibx6WNA%2BJnsLdPKYsmNg7esgiZR0wbect2M"+
     "SQY%2Bb7fPVZEAkQ1zx4%2BjRb%2BmjnzsbR77HyjEgQaAVk%2BxZuECCcsmLsHaOTQs8JKUu4II6CLaSs%2FjdT6Och0BPDrZk6"+
     "zXyf%2F5%2FlwmSLGXIXkDiDyiaeuwZmkuUZIdeh4A23IKmCmV4h2bk%2BRonKpCxiSOWmDuJL%2BxOd7iHD2slDQOciJ1Pa1Xs7"+
     "rsJIW9rbIyA5R00Aiabu4aGjKLFx2feJN5KrkBjCIoVs38M1qsReBSLGXLqWHlL3zJTmL02yhqkfTb0QBFvoIScsY%2Fb7PKaquA"+
     "Yk1bzEBWVBXGx7VVK%2BUobU%2FdLG1TUQjmcbBOwgCYqQqoQhNMtClQFKhTZ1OTFEK4abANHco9%2FykAE5haufkkRAlnOqBMhS"+
     "pJJbrAFIrqFjRBkVJm6cwIw8NVwCFohJyiIbj5JV%2B6TLSlbzkHGmTl7SiiGdH2Kcjhw18TwluQcIx965qSs8WgU9M9jUMxR11M"+
     "QERJMnx5B4RbF35CgCrRqAnGQ9T0KQeggBUsbN1sfzJWWN2HsO4%2FvtpUOy6gGI4YSWvixno28jw3QhWTcYksVJJrkIWSsE3JLT"+
     "Fe4xZOMj3A6hk6xRE%2Bs%2B0tax96mPLAB5E4aIZF0AEnZ%2FNHXXuxMXFgwZj9PhU%2BCELr2TrNkVT3uVIXylAKVC2LLXaOo6"+
     "OtEeAhkyQo6rnkCMmkiTrTUg3c7TMpvG0U4%2BUgs3AjZhzCRXSW%2F3DKHmoYN2neuiBKuPpr4JQNLUsZasdh7SYKHRCdrIscfe"+
     "kbkwTL1eApKYYgC54xq5YchrNVUxTASLDg7Tc5xYnTdOn%2FDW8GhiiJWsY6e3VlLJ3Kmpd0DaGJ5N%2FbxxzjJk9JFrQCYscLFX"+
     "4XMQIPiBADOVrHD4tKdCOGUI3c7AwmWaRhOnLFl9uCg8EQ9B4fE795Bxfkix90xgXcA2ir%2FvXcAyIGmHBxAm9j037jAUSWnLMc"+
     "R4yG4aOkwV9DYeHr3NEMpg56MIw8VxhCumXmLK6vAcdh4GKfv5527n9zUgKKmHBECQGHMhWXr%2BcQKH8efJRceKMFMr9pJzqYqw"+
     "gc46UDIHMl8gp%2BgwKWvMsk5OpB5CNTF6ySFcNIwHO8o5%2B3WAyHw3AoJ0oBRM3QtYDdXReAbyIIUaemcTM6SxITOkgZYaOntI"+
     "jr1s6uAxYr8CHVBhpC1n6jT13bmVvFPyenoJ6L5fLoY8idVzitBDjKkX8wpZbANaOGrS8gdt38KTwZ8FIKkQ5tEJokS1Z9W9cg8Z"+
     "R7gY0qWjkyZSzkNKX3ye%2Fb7vMkg5Bey8W%2Bs2IDlPwdykgFmeypI1Y0jRhdfmjUkVNLkKLE7XHjJjCMb3zpAce9ssq1k83sax"+
     "FacsErCtCdgLgHC3mOcpwwkGTSSL05YxdWZBqILQs0FmyPheDAfoSMp5iGdMj7Y0OsEi9vKoEbmxbwGQAdPx5591AQjCbW7sHtHU"+
     "nRxdSpbG3sGQMCyJYtUELJi7BSS4ha2CJmXVyBBJV6EY9u9bl7Pa4VEv6SmLezt49nves6WAlPj9GJ1wMbRcmHIiSpYx9Sr9XeVK"+
     "YRlQriWLTgP7zzIEIKMODOlsqtJKKjOkO0zwEBQCgoGh2S%2BUIX0Y37%2FfBkRZVCaLnvmiklU%2FnIk7Ux8xuO6hmV8yhMbvsb"+
     "FjImB0PSbAG4MjvJl6CIXgw%2BQHENLbh2S9BghF2yksMw9R6BjCAi9ZQ5YiF4Cq8CCN2xND%2Bpn6zENiMWxDxQAFzbLacJE8pN"+
     "K0t1C6ev7svB4jxyxZ51nJCpBQ8zhxudIHD0%2FjAssPXI6CjbjQ8z8CK8%2BxvI1DYu%2FcQ9pwcWeYsplTD5l6SDP1aO7a2zVz"+
     "nSH4ChANvMYtMBMpATJIVkHqIROGRFgiPL15eMlKsdcJWU0MobtOhDE2ZSUP6UN4NfVu7d1RCJCtheAuXWtAwjhEDqBckprnKdtD"+
     "xNQxGSCi39QDsfFbDCGwnIcMvtBPa%2F%2FpSFcnC3o7yR6ykZNEU5di2DPXe2wlERCSqglPrKl7EMagUCSrRokC5aooSyd%2Fxn"+
     "MJgtE5PCA%2B9sbRCZpdR7GqYuYqYdLUR02kITw1doFAJltj9nsa%2FuElXwfEB11o4z73N0kWM%2BYGQ4aHsKmPgXvwibH7Qbvf"+
     "c4LljEeIQ6Q2uWIPaVOsPn7vs9%2FzqjX29kcKaCJVAiDvPYHdBiTnq7qAZ%2BYoSbKYZ8KCEWmzh%2BhzbjPE5Cr1jAbFtmtTP%"+
     "2FZ7bfPddg%2B8THsXpt5nwDzZeustfgNPgh0g1kmWeUoFy8rXYE039Jlkcf4aQxJp6loM5wxRiw8egjw62eTRlLLaPb50tRFrjK"+
     "lDbg7SyZZpJS1trQDRJJVTlkZbdY1RARdMqZYhNHAH32VlYq92jQhIuHIM6VdaDIUvtVv9ELKqvb2bu9zy0KHgzCWz31uAjGGJzq"+
     "sAE1fVA5KHWCCYFZEhNN81HhJiLxBkqYqchWlv8BAzOtFiiDGMV2DOwAw5HcHWrb1%2Fl%2F4%2BmPIm8PQ7468BUQgiF0zXmLoF"+
     "QuWDjENihmrPqgkcSVl8iw8SMOYqw9S%2FJrGi8xDIiSFM7BVTb95Bf6QAuTkIb5YhK0B4MgUztZK9rf4AvV9kJVkMGjMkGbgzdf"+
     "WZnqtmgCQImC8CDYXgSgJWQ%2FaykqWTLQJGQ7Dp7TcACSxwcjSD4EKycqoyDBEPkWJIsdflKiCORaBDxs3yhXkwJGtTASORois%"+
     "2BD0Eydb71AcyQ8jIgOjoZ4hRSFtl4ELDIJRqpw5u6GPfcQ9CvJbReMMT1kC5RKfaOua8WQ5YsGaTQCfvZ20f83VrspQnw4MsrgJ"+
     "gwS48lmAwE3Dnc%2BDAyREfrgyFQMy%2FaQ%2Bg5JRl%2BACQwRH%2B6xUlX6iEiWRgWPxwlMiWGYK6JMla5BkR8QkfrCCUwPZpj"+
     "LwHxAkOsd%2Bx8awJoeRGX3sVeA0%2BY9iINFYNIudnv%2BDqY8uZHjRjSRY6yAiT5xAyCBScyEKn6iamP67pneEbjgLIACk%2F%"+
     "2BWRidxKYOdx1uJV1JFpl6SaMTuhdF%2BNKlCxqCDSDGxi0g%2BdGVhygzgkRZFsTmoR4iMK0YcukhwhCkpo4wyxpylnqI8RCMaW"+
     "8JgEQP2QYgOTNFQGbsqeFRx5c7kjVjyMxD2MBLSEuXgFgBo9HJpWQNuCr9LAMSGeIkqzhTn5n5TMAil9iikRf7iwyRlDX5WZlIlg"+
     "PCe0gYLs5MfSpZMow3HtI4UYgTGx3o0uz3BOYSkOpjL4rr5lO%2BqB9oynpeAzo4TBCod5QXGYIeYpcMuZSsIVwsUiNfVQGERo6j"+
     "lSBNtu4CogI2yVOWE1IBM1MCA8qSIfIV8%2BaBeYI6Xxlt%2B6aHIMyy5KdpstXcAjOGRIvXEPw6ICkYT3MVXpEsxxDt5uIh1M2j"+
     "jUN3%2F3UP4ZR1W7JKU%2FyQubKHlHY0S4D0ydZPAQJcG%2FcdD%2BEzDjH1Psui3Y8kR23H1x0XrqFgFTmcJXjumDqKcCLH3vI8"+
     "XioTU%2B9%2FGAr1kOEkF4D0zDXvGAsPqXPJsi5xgyGzdDUHJDkKT3ZlqnvPQyZNvZA4maYuvKnjRgjwFbeSFSCYlD7EGW1e7AxP"+
     "lKwq3oHBCb0aKSv5TGXORGAwib1WwOrEYSqqeEc%2FMQx8qSJgzfBpyBhGjnS8m2riHBCXkiYB14rU0swZgImpm5TF6Qq032Eibb"+
     "b46CEbQZemvXyTQzL3bTiL6%2B3IXvJcdLL4LmepJl4AMurisaMNILqgYXkB7d7FpCwnWVVYVB1PhofkzOXs2%2FUQcpT2rHQbED"+
     "82gi%2FF3trjgHgIwilJuznoVUCGWNVx%2B2hMUAveWA9RycqmPou2whdiSOBNKoYKiPUQTWJq8jXWRO0hqBceErzE9fZx7xbepD"+
     "Q6QHQyFZ1BoNNo20teconUP1BkwK67fvClsSebuWQvnWVdx97kEp0TKmjqHSH2HlafPYSBKAECvqrm6nVA1C0oEsfJVJhTTcycn8"+
     "2ewhZPTZ2WFcICmMWOrtOWv3rjRwrFq5Qlo5MwSMH4TimLOOH4YgGJo8IQbaGDwBsespSsYOrMEK2CKU9BZEmvZv4ikdbwJcVezH"+
     "oICRjkdIR7iJo69XeNxNRKen%2B%2FA0h6ROHxrlGoUau4Rc9QTqDv7Ro8BAjjRJIla9%2B4frQGk9%2Fouc7Uu0hZD6FRI5u6gS"+
     "fVxBUgqXdrJw%2FW7iBI4tQlLwsZD0L00dEqSHhC1yjRxvkOLK2J4dFNi%2BGYZek4EYEx3kOGqaMYc5fJ1jhNpIFjeRWQkKeQrT"+
     "p7SElGzhwA%2BcJUsjhX0fIi1DzA7%2F4yfzSkqhR7aYDS4aEgMBhkJlvJ3A9mKDzt%2Bz1AcsCFMWyxeuczAwIrWeFZJf%2FXly"+
     "4%2FI8OURUpj77bgS82xNxXCzhBoCB5jyQo6rjKmHuFhAXvDC4CYPIUyNfWw73sKIskKyamkxTYMkcVG2O%2FFiJSJvQwa23ac9t"+
     "IIUTkRhosMjzP1G4C8iYAZQAqKBSTEXhgI2MZz6YO37ThApJ8aRiB387TY0Eg7T1kyOtmycAV4OOiyhwyRiqZOM2AC5K2%2FgoHY"+
     "IiApVyGKVYi9tyEQi3%2Fhv8gFXHKiIHQMzHmzhXer574N3RwqZJU6y8ZAGg8ZKavG2S8PUjog7VN2D0QGJHMj%2Fix5CIGlklV1"+
     "ssXjkf7dL325DYGK0%2BQ5PDqhTt4ZEYthcJY%2BSMk1kb6fKWucjmAA0wPyBSDT7GQAWXsIFpJFr6HrPFonATvnu6nYXS29g4lG"+
     "J2GU0riQw29d8KVSQObvPfbidUAiENxD%2BGdYQyABN0tWNHVT%2FoBJBQyLjrzYroe42Eu7vYgMRbhsygoheKOsJd97V6GaiDFC"+
     "6RbvAAnMcI0j8aRfOw9hyRLoKo0N%2B3WYTGn%2B8eauvFEIjKmzbQfh01Asw0X%2BTjZeEYbxPWsVEqkegmNv%2F0lA5m7Bpn5h"+
     "0%2BeSCUxjoptMHXFwCA6zmKUsYUh4hROwipyvQg8JoFFvp9LIZl4nKes%2BIJyd7rkFR%2BIsUiJ5%2BkzzX5SsXBbZ4ldB1zPE"+
     "glYJtCK7naWoSxeH38CPYOoJmNBDksUzMBNAQtCNsRfZZyhXWXiMZHWJmkIQxAlmmac27k09eogCDDpTH%2FDwQVXiy8bwBgFrAF"+
     "Hs5cHjsPbbgMjejvadx%2BdlCY9IVoI2Li%2BQBiDIzmJTVmzquOEhkqt41JjTVoSA4AsCxrG3AUIWfwkIwik4XHZCkB4RqakYBc"+
     "maPGqHJQhng0Hkkj%2BklFaDS2S%2BVHmHmnrIeIeKUBODkG0iYN1ZvMUjjVUsIDElqX3nlKUewuPymWSFJQMyBBB9l8UGnHELp5"+
     "yAFdnfJTFE7kKhQQqBJTJHN9NR5uIYMCDoI3qSMTtWmQIikoPp0murMB4Slgq7kSwFQpbQiZW%2Fqk6y3HPSKyKI1YHXH60iZJVe"+
     "YQYpWhfV4um4aglICrx8cpHkjLKXW2AWDitZ4%2FWDVZqZIHsZab%2Fn55TJVeTUptCjEgeGHBUBZssDFXNV2Wfkasstvvf2eh%2"+
     "BQEHsnz%2FSArK96KMiSld3CsijudywYsq34Iq%2BpKfDSvMsCUpFOR2iZt9Dmq%2FxsDFI6ICxAziHQQ6dbXqDOPMRcmVQVfGLB"+
     "kIksAfVKnLJtJ4bUCXg1sapOr4a%2FUMoKV3KIpZOt57MmgDAnkEyZlxPRJ1zAnTAEwhXPiX5FDeZKpJDEqSxAqwHgKUNUwDQEE0"+
     "%2FGZ8pABcM1BgT1BUAST2zADUs92%2F36XPUMl6hiZirJERJfbjNkLHIN77u5qxB%2F5fwwh2BoEqv2qgvZPUC8cA1ZCjyZLLrP"+
     "T31%2FJ0aILFlHgKh%2BWUTj8YwIzJZBMw6zCcwhDPPjebIFGaEIPKmrnP%2B%2FrOeAxEW3i9zdIk%2Bvwu6n2GvZw0e4srCpVc"+
     "AuL%2Ba5ysVemJQ1Z0gCgvmQenuYbMXYO%2BBhAUst3gGSxiIX4gRZwAUEQXjQfwHo6YbvGjH2hiQ1bRwBmDp5TmKIPEeAGWMX10"+
     "pQffZieNhRgoBdAaJHSxNxwpIFQZRIhtCNWo1bMpNOcsnb3KJ7sNbPya%2BpSaxSU0923iAkww%2BxN9VE6ygMiFnsYe7SQ%2BZ%"+
     "2BEV0jccGZ93ynx708sfE4OqHsFERqHgPC%2BwlDDG9qkLUaLZ6ZYlrJKV1rQOKBat%2Bf1EPULUpYRhAL1GeqPj9kJBqxkywRQ2"+
     "K68sbt3WIuZBRPiTFRrGIYJp%2FJ0FS4fLYhHPNSNH4VEFrQMCoU%2BdBHww0LKe6W8GgJ4mICrnUEXEnW9NGaPKQmAav0DtU8ug"+
     "k8mwC8hRwW%2BfKzgHj7pkcjJyYCJu%2FDzpSTFOJ%2BD1A6hpQpQyq9zwuSJcvb9r%2FnCzf1OMv6GUC8P4h9a3935pwhCM%2Fg"+
     "XR%2B9g0Uqs0dgwlqysqkb2w4MkddsFq5s3MwGfafNRuNKUDT2fQmQiZFba5cix5IVe0eyfiNSyeI9BGVi%2BDU%2FGmUtMySejk"+
     "DnXbrkKlJRutTGvwLIDJYlXJSrUoRl66Te0bKblRy%2FvAy4hWcmZwkCXk7iD8vb8X8ZmGrkC9m3DhnH1zJyVRw8rgGpYtjaH9zS"+
     "dw%2BZ2TjD4ziwBGJu9cvn0NJvM9DuMERgYz8gyZLFF1DjeCVPhAXQBEhoHgYQyVM5V808ZLK%2FI3NWIlWDPMYFnRg2lgOVvhwT"+
     "hggXzIRrkqvkp4k3DpBKn7prnoqAVMpRDhBn2VMPyeNDF3hnPSQsOrCQLPsKXbKbpo7cSqp5xZYFbAHIYM8ApP2%2BcVgyaxUce5"+
     "2dLzmRJEtMvKQ8hMnux5IFU0CmLHIMkSUPMDm%2BVB1HtldQTI5tvmJm%2BAUWEOVL36UTLvTlnHAiP1ZMDCYQ%2B%2FJiutjxfa"+
     "xkWS9ipT%2B%2FGpN3bJpKVlvuIHlVXCc4ypcBkaVCWA51GN3DtpOnRYbs4iGTJfFnvryToBzMt8iuz5%2BxpXeXO1IExCBZKVdF"+
     "L%2FFXXwAkSU8%2B99PjprB3kZNTPgMnN3JOIn7jOOEYcgvCqWS5lGVZVBEmwdFDgtWbYcsVIBcQ6MHS5BUqP2WekTQCpCvynZUj"+
     "mOwW4alTIVsxJJm6il56TjVSR7KmFi9s0XhwDxDNNuoWxtSTh9jntKswYl91jOV%2BX10FIQtLt2BIMvkNYV4cXhG7iDSWnwAkSA"+
     "1SOoJReV78EvZgMT6jn%2B0zmHOUqUh5OTOPboFhKj2TlCWuUWnJyUPC95C5QhJbAxKXWReyLZI19ZHEdCdHt6he1hY9JHHMJykD"+
     "gQFEdn2JJTByIrLJSpaM5uN8WGqf5i1z5QHJUEAtWkeC2RHcWGS6vxH%2ByY4%2FvFQwC3pTsgKEM4ZkiRJTj5LlPSQGZZ0IB3iU"+
     "UwX7zC8iIJ4FszZepZ1Uy7T2bjC7FzeWF9cMib4wedeZjRdKUkay7LtnYNZ8qQK6ByRGWpOZ4PxBFhthJ2O6nLww8wVd7fcFIAtg"+
     "K%2F8GhhP8G9QocxY0qYn9J8qXBM8fAEgWucnCIcXL%2Fg70GRGCi6WfcGr9Ci84kSFh0rWSLMOpal5BQFq%2BbOEVCkgsdjN%2F"+
     "cLI2ax5h78IsByaydGO%2Fzxly4SFxC2zmUzo8WbLS7q8ibtv4nhiWABFgrgCJ%2FjBEKT03yVFOYFOrV6DjgtqUdYchlzBtE8mK"+
     "i60iExc7OhSJFL3bRMCuAammhdOUiZ4dihw%2FJ1bA0VHoOSUJhoM9LGTmRAe8msWty%2FeR4eKoiTmRyb%2BsujCc5Kwm2K2A%2"+
     "FQGAZJ8YXAj%2FcKR%2FuPsHw%2B3pBLdCuVreKYRZlGQHx0%2FZougZgDf5lE16zNcBMXaedZwXGwhWTf%2FU1DzCMuRFji7kIS"+
     "gvQlDNZ08Eh5YpL52RLEpSyUMCMGsBI0fp%2F0IDiLZou9gj6WQPMa4xRi8ukbkl1PdbmLoH5MVXyGKHn9bE3JTEQl8PsCdxq1Ow"+
     "VoDw3rWADMBMKnJmaWAq7C2TpStmsdMr%2BJNdnpqAtk0ZkgNukCXnISmXScoaImWCwxyQlIRwseRi6uGfhrRbYfZw3gQr%2B%2F"+
     "0yQ%2BxyFvuZji9ZsiSJGQirelQCRA6EMyDnglr3oPzjl3f4TPqnuv0dmTV5hyk8Nxly%2BWganUz5UtOj29zw8wiFYwD7VIDuCh"+
     "AvVixHdtFhrBTTBQT%2FU70cmSZzExBn6twb9N%2ByZNOMBVOpuhapnwLEdQzNZQvQ9F3M%2FuTm4eVI392NRebsGScXE0DDZxpx"+
     "CkmK42vYRPqcGrObAhLeZQGIvaLFAeICZnsE%2FDIgMEKflXzH7P5y4zmJIfPnjMwzh9TyOHgItxLimOPEFSA8LJk5ghY4ywLYfz"+
     "gwFxxcLtZU9G4udvzMapnrXrNNN0E1n1nN7%2Bzic2ZWlU29ACQ17SAbKl3CE%2FOPwFRiUjFcu4W%2Bw1yy0m87vQrvVxfvUO07"+
     "1MTKuoTQXHlAomAkQHRXcLSVX38WYctCMKygTQw%2F7c%2FLq0sP0d5tnktBQCCsZoNs4TepKBMIavpNPCCL%2FY74i1pZmnFKX1"+
     "lWnJjsd7wOCOt5ZsSUcVt2IW4l5nfeAoTyPlYILwGxIXaykHEPzpYD%2Bk8KjIiwLMXlCjSz2PrZc4bMF2niDGkT1LQJKupL8DAg"+
     "a06kfzjSHhSfMAsHzPaw8a2LhUwwGU6sN0HgsXbzCcfc8tbF6x0r6xKem4AUR%2BwkXeH1brfyabzbn3a%2FOyBeYMjkFZsP3hPw"+
     "6vIz6xRuM0N%2BHZBq8xD8viSmuL3nd3venyXvyLyQ1wK04ML6OSkz3fitN%2Ff7xKbueogMZOpLgMgvDk9l5yjhF0UOkDOG0Fh%"+
     "2FKk5u0S8B9UJG9%2FZefWa0evt71cXvVW3drMnB96lrTPdy2jnR1L2YZJGzUpiXF64T3GdI%2BozqXeySldtKGLOpO%2BmSz6jm"+
     "MxiQOC2a7r2JxHjNn0FIMeDGgvr97hfQc2qyow1HnUXP3yGIXZm7RljLzfarO4AYouPGcgAzu10xBLcW%2B4pTC9eZpazLd0%2Bg"+
     "Xb77WghfBOR6cTD5RevckSavmOr7LL3deoVjZZ28Yrb73Tbabr6iLn6vOv0MBcRF28VCzrOXlx%2BsesilNCz3%2B5wh812%2FkC"+
     "z%2FfvX2%2B20LYIOjJF2Kqr%2B7Rb%2Fee2Vu0JfLac9Q7nnIHUBWzkRBpeJLkOZes%2BRxvfh3ZUAmi35p0Qzh1eIkBb%2B3vL"+
     "jHosk%2FdVt8xtc3wfbCv3O78Rk3AUkWfb0cJgrPc1l9cfd%2FgSHL55QLaU7StV%2F%2Bzuk51T4nb3wfVJc0vQfhffJjCWm9gv"+
     "Q%2BINMWMdX3tW%2B9zsobSvQFQBSWV15x21IX%2Fwy8%2BIrt1r%2FkugndcUcF4pVXXANywwonfLncVcvl2F%2BC9GsMgTuzfP"+
     "kzzQ7f7nzmhfasAfmafNzh1LWl%2FtcAcuP9tj%2Fit7y50e4D8kLKenU5v7a8WH5KfQnCL24CvJYm%2F1mA%2FAEfewnIfz9Dvg"+
     "bI%2FrNr%2BccA8pOc%2Bqd85j8DkP2f%2F1v%2Bf2jmJBw1Fe8SAAAAAElFTkSuQmCC";
     
  // Here are some boring utility functions. The real code comes later.
  function hexToRgb(hex_string, default_){
    if (default_ == undefined)
        default_ = null;
    if (hex_string.substr(0, 1) == '#')
        hex_string = hex_string.substr(1);
    var r;
    var g;
    var b;
    if (hex_string.length == 3) {
      r = hex_string.substr(0, 1);
      r += r;
      g = hex_string.substr(1, 1);
      g += g;
      b = hex_string.substr(2, 1);
      b += b;
    } else if (hex_string.length == 6) {
      r = hex_string.substr(0, 2);
      g = hex_string.substr(2, 2);
      b = hex_string.substr(4, 2);
    } else {
      return default_;
    }
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    if (isNaN(r) || isNaN(g) || isNaN(b))
      return default_;
    else
      return {r: r / 255, g: g / 255, b: b / 255};
  }
  
  function rgbToHex(r, g, b, includeHash) {
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    if (includeHash == undefined)
      includeHash = true;
    r = r.toString(16);
    if (r.length == 1)
      r = '0' + r;
    g = g.toString(16);
    if (g.length == 1)
      g = '0' + g;
    b = b.toString(16);
    if (b.length == 1)
      b = '0' + b;
    return ((includeHash ? '#' : '') + r + g + b).toUpperCase();
  }
  
  var arVersion = navigator.appVersion.split("MSIE");
  var version = parseFloat(arVersion[1]);
  
  function fixPNG(myImage) {
    if ((version >= 5.5) && (version < 7) && (document.body.filters)) {
      var node = document.createElement('span');
      node.id = myImage.id;
      node.className = myImage.className;
      node.title = myImage.title;
      node.style.cssText = myImage.style.cssText;
      node.style.setAttribute('filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader" + "(src=\'" + myImage.src + "\', sizingMethod='scale')");
      node.style.fontSize = '0';
      node.style.width = myImage.width.toString() + 'px';
      node.style.height = myImage.height.toString() + 'px';
      node.style.display = 'inline-block';
      return node;
    } else {
      return myImage.cloneNode(false);
    }
  }
  
  function trackDrag(node, handler) {
    function fixCoords(x, y) {
      var nodePageCoords = pageCoords(node);
      x = (x - nodePageCoords.x) + document.documentElement.scrollLeft;
      y = (y - nodePageCoords.y) + document.documentElement.scrollTop;
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > node.offsetWidth - 1) x = node.offsetWidth - 1;
      if (y > node.offsetHeight - 1) y = node.offsetHeight - 1;
      return {x: x, y: y};
    }
    function mouseDown(ev) {
      var coords = fixCoords(ev.clientX, ev.clientY);
      var lastX = coords.x;
      var lastY = coords.y;
      handler(coords.x, coords.y);
      function moveHandler(ev) {
        var coords = fixCoords(ev.clientX, ev.clientY);
        if (coords.x != lastX || coords.y != lastY) {
          lastX = coords.x;
          lastY = coords.y;
          handler(coords.x, coords.y);
        }
      }
      function upHandler(ev) {
        myRemoveEventListener(document, 'mouseup', upHandler);
        myRemoveEventListener(document, 'mousemove', moveHandler);
        myAddEventListener(node, 'mousedown', mouseDown);
      }
      myAddEventListener(document, 'mouseup', upHandler);
      myAddEventListener(document, 'mousemove', moveHandler);
      myRemoveEventListener(node, 'mousedown', mouseDown);
      if (ev.preventDefault) ev.preventDefault();
    }
    myAddEventListener(node, 'mousedown', mouseDown);
    //node.onmousedown = function(e) { return false; };
    //node.onselectstart = function(e) { return false; };
    //node.ondragstart = function(e) { return false; };
  }
  
  var eventListeners = [];
  
  function findEventListener(node, event, handler) {
    var i;
    for (i in eventListeners)
      if (eventListeners[i].node == node && eventListeners[i].event == event && eventListeners[i].handler == handler)
        return i;
    return null;
  }
  
  function myAddEventListener(node, event, handler) {
    if (findEventListener(node, event, handler) != null)
      return;
    if (!node.addEventListener)
      node.attachEvent('on' + event, handler);
    else
      node.addEventListener(event, handler, false);
    eventListeners.push({node: node, event: event, handler: handler});
  }
  
  function removeEventListenerIndex(index) {
    var eventListener = eventListeners[index];
    delete eventListeners[index];
    if (!eventListener.node.removeEventListener)
      eventListener.node.detachEvent('on' + eventListener.event, eventListener.handler);
    else
      eventListener.node.removeEventListener(eventListener.event, eventListener.handler, false);
  }
  
  function myRemoveEventListener(node, event, handler) {
    removeEventListenerIndex(findEventListener(node, event, handler));
  }
  function cleanupEventListeners() {
    var i;
    for (i = eventListeners.length; i > 0; i--)
      if (eventListeners[i] != undefined)
        removeEventListenerIndex(i);
  }
  
  myAddEventListener(window, 'unload', cleanupEventListeners);
  
  // This copyright statement applies to the following two functions,
  // which are taken from MochiKit.
  //
  // Copyright 2005 Bob Ippolito <bob@redivi.com>
  //
  // Permission is hereby granted, free of charge, to any person obtaining
  // a copy of this software and associated documentation files (the
  // \"Software\"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to
  // permit persons to whom the Software is furnished to do so, subject
  // to the following conditions:
  //
  // The above copyright notice and this permission notice shall be
  // included in all copies or substantial portions of the Software.
  // 
  // THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,
  // EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  // NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  // BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  // ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  // CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  
  function hsvToRgb(hue, saturation, value) {
    var red;
    var green;
    var blue;
    if (value == 0.0) {
      red = 0;
      green = 0;
      blue = 0;
    } else {
      var i = Math.floor(hue * 6);
      var f = (hue * 6) - i;
      var p = value * (1 - saturation);
      var q = value * (1 - (saturation * f));
      var t = value * (1 - (saturation * (1 - f)));
      switch (i) {
        case 1: red = q; green = value; blue = p; break;
        case 2: red = p; green = value; blue = t; break;
        case 3: red = p; green = q; blue = value; break;
        case 4: red = t; green = p; blue = value; break;
        case 5: red = value; green = p; blue = q; break;
        case 6: // fall through
        case 0: red = value; green = t; blue = p; break;
      }
    }
    return {r: red, g: green, b: blue};
  }
  
  function rgbToHsv(red, green, blue) {
    var max = Math.max(Math.max(red, green), blue);
    var min = Math.min(Math.min(red, green), blue);
    var hue;
    var saturation;
    var value = max;
    if (min == max) {
      hue = 0;
      saturation = 0;
    } else {
      var delta = (max - min);
      saturation = delta / max;
      if (red == max)
        hue = (green - blue) / delta;
      else if (green == max)
        hue = 2 + ((blue - red) / delta);
      else
        hue = 4 + ((red - green) / delta);
      hue /= 6;
      if (hue < 0) hue += 1;
      if (hue > 1) hue -= 1;
    }
    return {
      h: hue,
      s: saturation,
      v: value
    };
  }
  function pageCoords(node) {
    var x = node.offsetLeft;
    var y = node.offsetTop;
    var parent = node.offsetParent;
    while (parent != null) {
      x += parent.offsetLeft;
      y += parent.offsetTop;
      parent = parent.offsetParent;
    }
    return {x: x, y: y};
  }
  
  // The real code begins here.
  var huePositionImg = document.createElement('img');
  huePositionImg.galleryImg = false;
  huePositionImg.width = 35;
  huePositionImg.height = 11;
  huePositionImg.src = HUE_SLIDER_ARROWS_LOCATION;
  huePositionImg.style.position = 'absolute';
  var hueSelectorImg = document.createElement('img');
  hueSelectorImg.galleryImg = false;
  hueSelectorImg.width = 35;
  hueSelectorImg.height = 200;
  hueSelectorImg.src = HUE_SLIDER_LOCATION;
  hueSelectorImg.style.display = 'block';
  var satValImg = document.createElement('img');
  satValImg.galleryImg = false;
  satValImg.width = 200;
  satValImg.height = 200;
  satValImg.src = SAT_VAL_SQUARE_LOCATION;
  satValImg.style.display = 'block';
  var crossHairsImg = document.createElement('img');
  crossHairsImg.galleryImg = false;
  crossHairsImg.width = 21;
  crossHairsImg.height = 21;
  crossHairsImg.src = CROSSHAIRS_LOCATION;
  crossHairsImg.style.position = 'absolute';
  
  function makeColorSelector(inputBox) {
    var rgb, hsv
    function colorChanged() {
      var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      var hueRgb = hsvToRgb(hsv.h, 1, 1);
      var hueHex = rgbToHex(hueRgb.r, hueRgb.g, hueRgb.b);
      previewDiv.style.background = hex;
      inputBox.value = hex;
      satValDiv.style.background = hueHex;
      crossHairs.style.left = ((hsv.v*199)-10).toString() + 'px';
      crossHairs.style.top = (((1-hsv.s)*199)-10).toString() + 'px';
      huePos.style.top = ((hsv.h*199)-5).toString() + 'px';
    }
    function rgbChanged() {
      hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      colorChanged();
    }
    function hsvChanged() {
      rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
      colorChanged();
    }
    var colorSelectorDiv = document.createElement('div');
    colorSelectorDiv.style.padding = '15px';
    colorSelectorDiv.style.position = 'relative';
    colorSelectorDiv.style.height = '275px';
    colorSelectorDiv.style.width = '250px';
    var satValDiv = document.createElement('div');
    satValDiv.style.position = 'relative';
    satValDiv.style.width = '200px';
    satValDiv.style.height = '200px';
    var newSatValImg = fixPNG(satValImg);
    satValDiv.appendChild(newSatValImg);
    var crossHairs = crossHairsImg.cloneNode(false);
    satValDiv.appendChild(crossHairs);
    function satValDragged(x, y) {
      hsv.s = 1-(y/199);
      hsv.v = (x/199);
      hsvChanged();
    }
    trackDrag(satValDiv, satValDragged)
    colorSelectorDiv.appendChild(satValDiv);
    var hueDiv = document.createElement('div');
    hueDiv.style.position = 'absolute';
    hueDiv.style.left = '230px';
    hueDiv.style.top = '15px';
    hueDiv.style.width = '35px';
    hueDiv.style.height = '200px';
    var huePos = fixPNG(huePositionImg);
    hueDiv.appendChild(hueSelectorImg.cloneNode(false));
    hueDiv.appendChild(huePos);
    function hueDragged(x, y) {
      hsv.h = y/199;
      hsvChanged();
    }
    trackDrag(hueDiv, hueDragged);
    colorSelectorDiv.appendChild(hueDiv);
    var previewDiv = document.createElement('div');
    previewDiv.style.height = '50px'
    previewDiv.style.width = '50px';
    previewDiv.style.position = 'absolute';
    previewDiv.style.top = '225px';
    previewDiv.style.left = '15px';
    previewDiv.style.border = '1px solid black';
    colorSelectorDiv.appendChild(previewDiv);
    function inputBoxChanged() {
      rgb = hexToRgb(inputBox.value, {r: 0, g: 0, b: 0});
      rgbChanged();
    }
    myAddEventListener(inputBox, 'change', inputBoxChanged);
    inputBox.size = 8;
    inputBox.style.position = 'absolute';
    inputBox.style.right = '15px';
    inputBox.style.top = (225 + (25 - (inputBox.offsetHeight/2))).toString() + 'px';
    colorSelectorDiv.appendChild(inputBox);
    inputBoxChanged();
    return colorSelectorDiv;
  }
  /** End of code that's not written by me. **/

  (node=document.getElementById("colour1").getElementsByTagName("input")[0]).parentNode.insertBefore(makeColorSelector(node), null);
  (node=document.getElementById("colour2").getElementsByTagName("input")[0]).parentNode.insertBefore(makeColorSelector(node), null);
}

function addStyle(setup) {
  if (!setup.colour1 && !setup.colour2)
    setup = eval('({colour1:"#000000", colour2:"#000000"})');

  style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
  style.type = 'text/css';
  style.innerHTML = ".groupProfileHeader .fsxl {" +
                  "    color: #1C2A47;" +
                  "}" +
                  ".groups_highlight_box {" +
                  "    color: #535353;" +
                  "}" +
                  ".uiComposer .attachmentFrame {" +
                  "    border-color: #B4BBCD #B4BBCD #CCCCCC;" +
                  "}" +
                  ".uiComposerHideMessageBox .attachmentFrame, .uiComposerHideInput .attachmentFrame {" +
                  "    border-bottom-color: #B4BBCD;" +
                  "}" +
                  ".uiComposerMessageBox {" +
                  "    border-color: #B4BBCD;" +
                  "    border-right: 1px solid #B4BBCD;" +
                  "}" +
                  ".uiComposerMessageBox .inputContainer {" +
                  "    border: 1px solid #B4BBCD;" +
                  "}" +
                  ".uiComposerMessageBox .composerTypeahead {" +
                  "    border-bottom: 1px solid #B4BBCD !important;" +
                  "    border-color: #B4BBCD !important;" +
                  "}" +
                  ".uiComposerMessageBox .composerTypeahead .wrap {" +
                  "    border-color: #B4BBCD !important;" +
                  "}" +
                  ".uiMentionsInput .highlighter b {" +
                  "    background: none repeat scroll 0 0 #D8DFEA;" +
                  "}" +
                  ".uiToken {" +
                  "    background: none repeat scroll 0 0 #E2E6F0;" +
                  "    border: 1px solid #9DACCC;" +
                  "    color: #1C2A47;" +
                  "}" +
                  ".uiTokenSelected {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiInlineTokenizer {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".interaction_form .underline {" +
                  "    border-bottom: 1px solid #EDEFF5;" +
                  "}" +
                  ".interaction_form .link_placeholder {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".giftshop .extra_text strong {" +
                  "    color: #008000;" +
                  "}" +
                  "#embedded_store #giftshop_search_option_input {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  "#embedded_store #store_footer {" +
                  "    border-top: 1px solid #D5D5DF;" +
                  "}" +
                  ".UIErrorForm_Field select {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".UIErrorForm_NoError {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".UIErrorForm_ErrorField {" +
                  "    border: 2px solid #DD3C10;" +
                  "}" +
                  ".UIErrorForm_Flag_Inner {" +
                  "    background-color: #FFEBE8;" +
                  "    border-bottom: 1px solid #EB8266;" +
                  "}" +
                  ".contextual_dialog .contextual_dialog_content {" +
                  "    border-color: #333333 #333333 #283E6A;" +
                  "}" +
                  ".UIHelpFlag_Close:hover {" +
                  "    background-color: #F9EFB3;" +
                  "}" +
                  ".UIHelpFlag_Block .UIHelpFlag_Inner {" +
                  "    background-color: #FFF9D7;" +
                  "    border-bottom: 1px solid #E2C822;" +
                  "}" +
                  ".UIErrorFlag .UIErrorFlag_Inner {" +
                  "    background-color: #FFEBE8;" +
                  "    border-bottom: 1px solid #EB8266;" +
                  "}" +
                  ".error_field {" +
                  "    background: none repeat scroll 0 0 #DD3C10;" +
                  "}" +
                  ".error_field input.inputtext, .error_field input.inputpassword, .error_field #captcha_response {" +
                  "    border-color: #DD3C10;" +
                  "}" +
                  "#ci_module_list li.ci_module:hover {" +
                  "    background-color: #EDEFF4;" +
                  "}" +
                  "#ci_module_list li.ci_module.expanded {" +
                  "    background-color: #EDEFF4;" +
                  "}" +
                  "#wizard_step #ci_module_list, #wizard_step #ci_module_list li.ci_module.expanded, #wizard_step #ci_module_list li.ci_module.expanded:hover {" +
                  "    background-color: #EDEDED;" +
                  "}" +
                  "#ci_module_list .ci_module {" +
                  "    border-color: #D8DFEA;" +
                  "}" +
                  ".autoimport .error {" +
                  "    background: none repeat scroll 0 50% #FFEBE8;" +
                  "    border: 1px solid #DD3C10;" +
                  "}" +
                  "#filter a:hover {" +
                  "    border-color: #D8DFEA;" +
                  "}" +
                  "#filter a.selected {" +
                  "    border-color: #D8DFEA #D8DFEA "+setup.colour1+";" +
                  "}" +
                  ".friendtable .info .updates {" +
                  "    background: none repeat scroll 0 0 #FFF8CC;" +
                  "    border-bottom: 1px solid #FFE222;" +
                  "}" +
                  ".friendtable .actions a, .friendtable .actions span {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".friendtable .actions a:hover {" +
                  "    background: none repeat scroll 0 0 "+setup.colour1+";" +
                  "}" +
                  ".confirmcount {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".confirm {" +
                  "    border: 1px solid #D8DFEA;" +
                  "}" +
                  ".public_listing .search_bar span.highlight {" +
                  "    background-color: #FFF8CC;" +
                  "}" +
                  "#public_listing_pages .category h3 {" +
                  "    border-bottom: 1px solid #D3DAE8;" +
                  "}" +
                  ".public_listing .logged_in_vertical_alert {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "    border: 1px solid #E2C822;" +
                  "}" +
                  ".uiComboInput {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".fbEmu .body a.signature {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".fbEmuHide .thex:hover {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  ".pagerpro .pagerpro_a:hover {" +
                  "    background-color: "+setup.colour1+";" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-color: #D8DFEA #D8DFEA "+setup.colour1+";" +
                  "}" +
                  ".pagerpro .current .pagerpro_a {" +
                  "    border-bottom: 2px solid "+setup.colour1+";" +
                  "    border-color: "+setup.colour1+";" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".pagerpro .current .pagerpro_a:hover {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  ".footer_bar .pagerpro .pagerpro_a:hover {" +
                  "    border-bottom: 2px solid "+setup.colour1+";" +
                  "    border-top: 2px solid "+setup.colour1+";" +
                  "}" +
                  ".footer_bar .pagerpro .current .pagerpro_a, .footer_bar .pagerpro .current .pagerpro_a:hover {" +
                  "    border-top: 2px solid "+setup.colour1+";" +
                  "}" +
                  ".photo_tag_frame {" +
                  "    border: 5px solid #D8DFEA;" +
                  "}" +
                  ".editphotos .photo_tag_frame {" +
                  "    border: 4px solid #D8DFEA;" +
                  "}" +
                  ".photo_tag_frame_inside {" +
                  "    border: 2px solid "+setup.colour1+";" +
                  "}" +
                  "}" +
                  "#photo_tag_selector {" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  "#pts_invite_msg {" +
                  "    background-color: #FFFFBB;" +
                  "}" +
                  ".photo_list .album img:hover {" +
                  "    border: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".sharelink {" +
                  "    border: 1px solid #D8DFEA;" +
                  "}" +
                  ".single_photo_header h2 {" +
                  "    color: #192B46;" +
                  "}" +
                  "#photocomment .actions a small {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "#comment_error {" +
                  "    color: #996666;" +
                  "}" +
                  "#photoactions a {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  "#photoactions a:hover, #photoactions .action_link:hover {" +
                  "    background: none repeat scroll 0 0 "+setup.colour1+";" +
                  "}" +
                  "#rotateleft a:hover {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/z4/r/YMPqumRb_-C.gif\") no-repeat scroll 2px 2px "+setup.colour1+";" +
                  "}" +
                  "#rotateright a:hover {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zx/r/qAjhwbqxvdd.gif\") no-repeat scroll 3px 2px "+setup.colour1+";" +
                  "}" +
                  "#tagging_instructions {" +
                  "    background: none repeat scroll 0 0 #FFFBE2;" +
                  "    border: 1px solid #FFE222;" +
                  "}" +
                  ".tag_outer {" +
                  "    border: 7px solid #D8DFEA;" +
                  "}" +
                  ".tag_inner {" +
                  "    border: 2px solid "+setup.colour1+";" +
                  "}" +
                  "a {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "select {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  "textarea, .inputtext, .inputpassword {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".inputbutton, .inputsubmit {" +
                  "    background-color: "+setup.colour1+";" +
                  "    border-color: #D9DFEA #0E1F5B #0E1F5B #D9DFEA;" +
                  "}" +
                  "button.as_link {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".UIComposer_PrivacyCallout_Title, .UIComposer_PrivacyCallout_Text {" +
                  "    border: 1px solid #467C2C;" +
                  "}" +
                  ".UIComposer_PrivacyCallout_Title {" +
                  "    background-color: #67A54B;" +
                  "}" +
                  ".UIActionLinks_bottom a, .UIActionLinks_bottom button.as_link, .UIActionLinks_left, .UIActionLinks_right {" +
                  "    color: "+setup.colour2+";" +
                  "}" +
                  ".UIActionLinks .uiBlingBox {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".typeahead_list {" +
                  "    border-color: -moz-use-text-color #BDC7D8 #BDC7D8;" +
                  "    border-right: 1px solid #BDC7D8;" +
                  "}" +
                  ".typeahead_list .typeahead_suggestion em {" +
                  "    background: none repeat scroll 0 0 #D8DFEA;" +
                  "}" +
                  ".typeahead_list .typeahead_selected {" +
                  "    background: none repeat scroll 0 0 "+setup.colour1+";" +
                  "}" +
                  ".typeahead_list .typeahead_selected small {" +
                  "    color: #95A5C6;" +
                  "}" +
                  ".typeahead_list .typeahead_selected em {" +
                  "    background: none repeat scroll 0 0 #5670A6;" +
                  "}" +
                  "input.typeahead_found {" +
                  "    background-color: #E1E9F6;" +
                  "}" +
                  ".typeahead_friendlist_icon.on_selected {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "div.standard_tokenizer div.tokenizer {" +
                  "    border: 1px solid #8F96BD;" +
                  "}" +
                  ".pop_content h2.dialog_title {" +
                  "    background: none repeat scroll 0 0 "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" -moz-use-text-color;" +
                  "}" +
                  ".pop_content h2.dialog_title .dialog_x {" +
                  "    background: none repeat scroll 0 0 "+setup.colour2+";" +
                  "}" +
                  ".pop_content h2.secure {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zu/r/jp8TzrZb6J1.png\") no-repeat scroll 98% 50% "+setup.colour2+";" +
                  "}" +
                  ".pop_content h2.loading {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/z-/r/AGUNXgX_Wx3.gif\") no-repeat scroll 98% 50% "+setup.colour2+";" +
                  "}" +
                  ".pop_content h2.dialog_loading {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/z-/r/AGUNXgX_Wx3.gif\") no-repeat scroll 400px 10px "+setup.colour2+";" +
                  "}" +
                  ".uiButtonSpecial {" +
                  "    background-color: #69A74E;" +
                  "    border-color: #3B6E22 #3B6E22 #2C5115;" +
                  "}" +
                  ".uiButtonSpecial:active {" +
                  "    background: none repeat scroll 0 0 #609946;" +
                  "    border-bottom-color: #3B6E22;" +
                  "}" +
                  ".uiButtonSpecial.uiButtonDisabled, .uiButtonSpecial.uiButtonDisabled:active, .uiButtonSpecial.uiButtonDisabled:focus, .uiButtonSpecial.uiButtonDisabled:hover {" +
                  "    background: none repeat scroll 0 0 #B4D3A7;" +
                  "    border-color: #9DB791;" +
                  "}" +
                  ".uiButtonConfirm {" +
                  "    background-color: #5B74A8;" +
                  "    border-color: #29447E #29447E #1A356E;" +
                  "}" +
                  ".uiButtonConfirm:active {" +
                  "    background: none repeat scroll 0 0 #4F6AA3;" +
                  "    border-bottom-color: #29447E;" +
                  "}" +
                  ".uiButtonConfirm.uiButtonDisabled, .uiButtonConfirm.uiButtonDisabled:active, .uiButtonConfirm.uiButtonDisabled:focus, .uiButtonConfirm.uiButtonDisabled:hover {" +
                  "    background: none repeat scroll 0 0 #ADBAD4;" +
                  "    border-color: #94A2BF;" +
                  "}" +
                  ".uiLinkButton input {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiLinkButton:hover, .uiLinkButton input:hover, .uiLinkButton input:focus, .uiLinkButton input:active {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiBoxLightblue {" +
                  "    background-color: #EDEFF4;" +
                  "    border: 1px solid #D8DFEA;" +
                  "}" +
                  ".uiBoxRed {" +
                  "    background-color: #FFEBE8;" +
                  "    border: 1px solid #DD3C10;" +
                  "}" +
                  ".uiBoxYellow {" +
                  "    background-color: #FFF9D7;" +
                  "    border: 1px solid #E2C822;" +
                  "}" +
                  ".uiListBulleted {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiTextHighlight {" +
                  "    background: none repeat scroll 0 0 #FFF8CC;" +
                  "    border-bottom: 1px solid #FFE222;" +
                  "}" +
                  ".uiMenu {" +
                  "    border-color: #777777 #777777 #293E6A;" +
                  "}" +
                  ".uiMenuItem a:active, .uiMenuItem a:focus {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiMenu .checked a:active, .uiMenu .checked a:focus {" +
                  "    background-color: "+setup.colour2+";" +
                  "}" +
                  ".uiSelector .openToggler .uiSelectorButton, .uiSelector .openToggler .uiSelectorButton:active, .uiSelector .openToggler .uiSelectorButton:focus, .uiSelector .openToggler .uiSelectorButton:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" "+setup.colour2+";" +
                  "}" +
                  ".uiHeader h2 {" +
                  "    color: #1C2A47;" +
                  "}" +
                  ".uiHeader h2 a {" +
                  "    color: #1C2A47;" +
                  "}" +
                  ".action_links_title .comment_link, .action_links_bottom .comment_link, .feedback_toggle_link .feedback_show_link, .feedback_toggle_link .feedback_hide_link, .UIActionLinks .comment_link {" +
                  "    color: "+setup.colour2+";" +
                  "}" +
                  ".uiUfi .ufiItem {" +
                  "    background-color: #EDEFF4;" +
                  "    border-bottom: 1px solid #E5EAF1;" +
                  "}" +
                  ".uiUfi .uiUfiUnseenItem {" +
                  "    border-left: 2px solid #A8B2CE;" +
                  "}" +
                  "div.file_help {" +
                  "    background: none repeat scroll 0 0 #FCFCFC;" +
                  "}" +
                  ".editor #start_calendar, .editor #end_calendar {" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-left: 1px solid #D8DFEA;" +
                  "    border-right: 1px solid #D8DFEA;" +
                  "}" +
                  "#new_ff #friend_guesser div.see_more {" +
                  "    border-top: 1px solid #D8DFEA;" +
                  "}" +
                  "#new_ff #friend_guesser a.see_more:hover {" +
                  "    background-color: #E6EDF8;" +
                  "}" +
                  "#fbDockChatBuddylistNub .chat_buddylist_typeahead input {" +
                  "    border-color: #93A2C1;" +
                  "}" +
                  ".fbChatBuddylist a.friend em {" +
                  "    background-color: #DCE1E8;" +
                  "}" +
                  ".fbChatBuddylist a.selected em, .fbChatBuddylistContent a:hover em {" +
                  "    background-color: #5670A6;" +
                  "}" +
                  ".fbChatBuddylist a.friend:hover, .fbChatBuddylist a.selected {" +
                  "    background-color: "+setup.colour2+" !important;" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  "#fbDockChatBuddylist #reorder_fl_alert {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "    border-bottom: 1px solid #E2C822;" +
                  "}" +
                  "#fbDockChatBuddylist #error_fl_alert {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "    border-bottom: 1px solid #E2C822;" +
                  "}" +
                  ".fbChatBuddylistPanel .flyout_open a.panel_item {" +
                  "    background-color: "+setup.colour2+";" +
                  "}" +
                  ".fbChatBuddylistPanel .flyout_open {" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" -moz-use-text-color;" +
                  "}" +
                  ".fbChatBuddylistPanel .flyout a:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".fbDockChatTab.highlight .fbNubButton {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zq/r/hjN1fTOtVAm.png\") repeat-x scroll 0 0 "+setup.colour2+" !important;" +
                  "    border-color: #283B8A;" +
                  "}" +
                  ".fbDockChatTab .inputContainer {" +
                  "    border-top: 1px solid #93A2C1;" +
                  "}" +
                  ".fbDockChatTab .titlebarReportLink {" +
                  "    color: #B2BED7;" +
                  "}" +
                  "#jewelBoxMail .author {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".negativeBalance {" +
                  "    color: #F03D25;" +
                  "}" +
                  ".fbNubFlyoutTitlebar {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: #254588 #254588 -moz-use-text-color;" +
                  "}" +
                  ".fbNubFlyoutHeader.videoHeader {" +
                  "    border-bottom: 1px solid #93A2C1;" +
                  "}" +
                  ".jewelCount {" +
                  "    background-color: #00376A;" +
                  "}" +
                  ".jewelCount span {" +
                  "    background-color: #F03D25;" +
                  "    border-color: -moz-use-text-color #DD3822 #DD3822;" +
                  "    border-right: 1px solid #DD3822;" +
                  "}" +
                  ".jewelToggler:active, .jewelToggler:focus, .jewelToggler:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "}" +
                  "#jewelCase .jewelBox {" +
                  "    border-color: #333333 #333333 #293E6A;" +
                  "}" +
                  "#jewelCase .jewelItemNew {" +
                  "    background: none repeat scroll 0 0 #EFF1F7;" +
                  "}" +
                  "#jewelCase .jewelItemResponded {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "}" +
                  "#jewelCase .jewelFooter a:hover, #jewelCase .jewelFooter a:active, #jewelCase .jewelFooter a:focus {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  "#jewelCase .jewelHighlightItem li a:hover, #jewelCase .jewelHighlightItem li a:active, #jewelCase .jewelHighlightItem li a:focus {" +
                  "    background-color: "+setup.colour2+" !important;" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  "#jewelBoxNotif .blueName {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "#blueBar {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "#pageLogo a {" +
                  "    background-image: url("+logo+");" +
                  "    background-position: 0;" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "#pageLogo a:hover, #pageLogo a:focus, #pageLogo a:active {" +
                  "    background-image: url("+logo+");" +
                  "    background-position: 0;" +
                  "    background-color: "+setup.colour2+";" +
                  "}" +
                  "#headNav {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" -moz-use-text-color;" +
                  "}" +
                  "#pageNav a:hover, #pageNav a:focus, #pageNav a:active {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "#navAccount ul {" +
                  "    border-color: #333333 #333333 #2D4486;" +
                  "}" +
                  "#navAccount ul a, #navAccount ul .logoutButton input {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "#navAccount ul a:hover, #navAccount ul a:focus, #navAccount ul a:active, #navAccount .logoutButton:hover input, #navAccount .logoutButton input:active, #navAccount .logoutButton input:focus {" +
                  "    background: none repeat scroll 0 0 "+setup.colour2+";" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  "ul #navAccountInfo a:hover, ul #navAccountInfo a:focus, ul #navAccountInfo a:active {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  "#navSearch .uiTypeahead, #navSearch .uiTypeahead .wrap {" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .item:hover, .uiSideNav .item:active, .uiSideNav .item:focus, .uiSideNav .subitem:hover, .uiSideNav .subitem:active, .uiSideNav .subitem:focus {" +
                  "    background-color: #EFF2F7;" +
                  "}" +
                  ".uiSideNav .selectedItem .item, .uiSideNav .selectedItem .item:hover, .uiSideNav ul .selectedItem .subitem, .uiSideNav ul .selectedItem .subitem:hover {" +
                  "    background-color: #D8DFEA;" +
                  "}" +
                  ".uiSideNav .loading a {" +
                  "    background-color: #EFF2F7;" +
                  "    border-color: #EFF2F7 #EFF2F7 #FFFFFF;" +
                  "}" +
                  ".status {" +
                  "    background-color: #FFF9D7;" +
                  "    border-color: #E2C822;" +
                  "}" +
                  ".error {" +
                  "    background-color: #FFEBE8;" +
                  "    border-color: #DD3C10;" +
                  "}" +
                  ".error a {" +
                  "    color: #DD3C10;" +
                  "}" +
                  ".explanation_note {" +
                  "    border-color: #BDC7D8;" +
                  "}" +
                  ".explanation_note a {" +
                  "    color: #DD3C10;" +
                  "}" +
                  ".uiSearchInput {" +
                  "    border-color: #6484B4 #899BC1 #899BC1;" +
                  "    border-right: 1px solid #899BC1;" +
                  "}" +
                  ".uiPhotoThumb:hover {" +
                  "    border: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".uiSideNavCountSprited {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNavCountSprited span.countValue {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .selectedItem .subitem:hover .uiSideNavCountSprited span.countValue {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .selectedItem a:hover .uiSideNavCountSprited span.countValue {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNavCount {" +
                  "    background-color: #D8DFEA;" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .selectedItem .subitem:hover .uiSideNavCount {" +
                  "    background-color: #D8DFEA;" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNav .selectedItem a:hover .uiSideNavCount {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiSideNavCount .countValue {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiStreamSubstories .unseenItem {" +
                  "    border-left: 2px solid #A8B2CE;" +
                  "}" +
                  ".uiTypeahead {" +
                  "    border-color: #BDC7D8;" +
                  "}" +
                  ".uiTypeahead .wrap {" +
                  "    border-color: #BDC7D8;" +
                  "}" +
                  ".uiTypeahead .selected .textInput {" +
                  "    background: none repeat scroll 0 0 #E2E8F6;" +
                  "}" +
                  ".uiTypeaheadView ul {" +
                  "    border-color: #333333 #333333 #293E6A;" +
                  "}" +
                  ".uiTypeaheadView strong {" +
                  "    background-color: #D8DFEA;" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiTypeaheadView .selected {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiTypeaheadView .selected strong {" +
                  "    background-color: #5670A6;" +
                  "}" +
                  ".uiTypeahead .uiTypeaheadView .calltoaction.selected {" +
                  "    background: none repeat scroll 0 0 "+setup.colour2+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".typeaheadLoading .uiTypeaheadView .calltoaction.selected {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/z-/r/AGUNXgX_Wx3.gif\") no-repeat scroll 50% 50% "+setup.colour2+";" +
                  "}" +
                  ".uiTypeaheadView .search img {" +
                  "    background-color: #ECEFF5;" +
                  "}" +
                  ".uiTypeaheadView .search .text {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiTypeaheadView .search .seeMore {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiBlingBox:hover {" +
                  "    background-color: #ECEFF5;" +
                  "    border-bottom: 1px solid #E5EAF1;" +
                  "}" +
                  ".menu_login_container .inputtext, .menu_login_container .inputpassword {" +
                  "    border-color: #1D2A5B;" +
                  "}" +
                  ".menu_login_container label {" +
                  "    color: #98A9CA;" +
                  "}" +
                  ".menu_login_container a, .menu_login_container a:hover {" +
                  "    color: #98A9CA;" +
                  "}" +
                  ".loggedout_menubar_container {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  ".signup_bar_container {" +
                  "    background-color: #EDEFF4;" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".signup_box {" +
                  "    color: #203360;" +
                  "}" +
                  ".LogoutPage_MobileMessageContainer {" +
                  "    color: #203360;" +
                  "}" +
                  ".registration #reg_box .inputtext, .registration #reg_box .inputpassword {" +
                  "    border-color: #BDC7D8;" +
                  "}" +
                  ".registration #reg_box .error_field input.inputtext, .registration #reg_box .error_field input.inputpassword {" +
                  "    border-color: #DD3C10;" +
                  "}" +
                  "#reg_pages_msg {" +
                  "    border-top: 1px solid #A0A9C0;" +
                  "}" +
                  ".registration #cancel_button {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".uiMediaThumbSelected {" +
                  "    background-color: "+setup.colour1+";" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiMediaThumb:hover, .uiMediaThumb:hover .uiMediaThumbWrap, .uiMediaThumb:active, .uiMediaThumb:active .uiMediaThumbWrap, .uiMediaThumb:focus, .uiMediaThumb:focus .uiMediaThumbWrap {" +
                  "    border-color: "+setup.colour1+";" +
                  "}" +
                  ".uiCollapsedFacepile .showAllLink {" +
                  "    border-color: #7792BA;" +
                  "}" +
                  ".WelcomePage_MainMessage {" +
                  "    color: #203360;" +
                  "}" +
                  ".WelcomePage_SignUpHeadline {" +
                  "    color: #203360;" +
                  "}" +
                  ".WelcomePage_SignUpSubheadline {" +
                  "    color: #203360;" +
                  "}" +
                  "#reg_box .label {" +
                  "    color: #1D2A5B;" +
                  "}" +
                  "#reg_box .inputtext, #reg_box .inputpassword {" +
                  "    border-color: #96A6C5;" +
                  "}" +
                  ".ff2 #reg_box select, .ff3 #reg_box select {" +
                  "    border-color: #96A6C5;" +
                  "}" +
                  "#openid_buttons_box {" +
                  "    background: none repeat scroll 0 0 #FFF9D7;" +
                  "    border: 1px solid #E2C822;" +
                  "}" +
                  "#captcha_response {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  "#reg_error, #captcha_error {" +
                  "    background: none repeat scroll 0 0 #FFEBE8;" +
                  "    border: 1px solid #DD3C10;" +
                  "}" +
                  "#reg_captcha h2 {" +
                  "    color: #1D2A5B;" +
                  "}" +
                  "#reg_captcha #cancel_button {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".actionspro .actionspro_li {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".actionspro .actionspro_a:hover {" +
                  "    background: none repeat scroll 0 0 "+setup.colour1+";" +
                  "}" +
                  ".link_menu .menu_content a:hover, .link_menu_list .menu_content ul li a.tab_link:hover {" +
                  "    background-color: #899BC1;" +
                  "}" +
                  ".dropdown_menu .menu_content {" +
                  "    border: 1px solid #6076A5;" +
                  "}" +
                  ".dropdown_menu a:hover {" +
                  "    background: none repeat scroll 0 0 #5C75AA;" +
                  "}" +
                  ".dropdown_head .dropdown_link.selected {" +
                  "    background: none repeat scroll 0 0 #5C75AA;" +
                  "    border-left: 1px solid "+setup.colour1+";" +
                  "    border-right: 1px solid "+setup.colour1+";" +
                  "    border-top: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".profile .basic_info_summary {" +
                  "    border-right: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile .box {" +
                  "    border-top: 1px solid #94A3C4;" +
                  "}" +
                  ".profile .box .box_header {" +
                  "    background: none repeat scroll 0 0 #ECEFF5;" +
                  "}" +
                  ".profile .box h4.box_header {" +
                  "    border-bottom: 1px solid #ECEFF5;" +
                  "}" +
                  ".profile .box_placeholder {" +
                  "    border: 3px dashed #93A4C6;" +
                  "}" +
                  ".profile .add_new_box_border .pop_content {" +
                  "    border-color: "+setup.colour1+" "+setup.colour1+" -moz-use-text-color;" +
                  "}" +
                  ".profile .add_new_box_border .border_frame {" +
                  "    border: 10px solid #868686;" +
                  "}" +
                  ".profile .add_new_box_border .dialog_buttons {" +
                  "    background: none repeat scroll 0 0 #F7F7F7;" +
                  "    border-color: #CCCCCC "+setup.colour1+" "+setup.colour1+";" +
                  "    border-right: 1px solid "+setup.colour1+";" +
                  "}" +
                  "#photos_box .added .album {" +
                  "    background: none repeat scroll 0 0 #FFF8CC;" +
                  "    border-bottom: 1px solid #FFE222;" +
                  "}" +
                  ".profile .profile_top_wash {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zb/r/3LyZkLVshsc.gif\") repeat-x scroll left bottom #EDEFF4;" +
                  "}" +
                  ".profile .top_bar .status_source a {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".profile .top_bar .mobile_status .clear_link a, .profile .top_bar .mobile_status .profile_empty_status a {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".profile .top_bar .mobile_status small a {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".profile .top_bar ul.tabs li {" +
                  "    background-color: #D8DFEA;" +
                  "}" +
                  ".profile .top_bar ul.tabs li a.tab_link {" +
                  "    border-color: #D8DFEA #D8DFEA -moz-use-text-color;" +
                  "}" +
                  ".profile .top_bar ul.tabs li a.tab_link:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour2+";" +
                  "}" +
                  ".profile .top_bar ul.tabs li.selected_menu_icon a.tab_link, .profile .top_bar ul.tabs li.add_tab a.tab_link:hover {" +
                  "    background-color: "+setup.colour2+";" +
                  "    border-color: "+setup.colour2+";" +
                  "}" +
                  ".profile .top_bar ul.tabs li.selected a.tab_link:hover {" +
                  "    border-color: #D8DFEA;" +
                  "}" +
                  ".profile .top_bar ul.tabs li.selected a.selected {" +
                  "    border-left: 1px solid #6076A5;" +
                  "}" +
                  ".profile .top_bar ul.tabs li.profile_tab_more a.tab_link:hover, .profile .top_bar ul.tabs li.selected_tab_more a.tab_link {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zS/r/UK_y4vNfbHf.gif\") no-repeat scroll 0 -26px #899BC1;" +
                  "    border-left: 1px solid "+setup.colour2+";" +
                  "    border-right: 1px solid "+setup.colour2+";" +
                  "    border-top: 1px solid "+setup.colour2+";" +
                  "}" +
                  ".profile_actions a.profile_action {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile_actions .holder {" +
                  "    border-bottom: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile_actions a:hover {" +
                  "    background-color: "+setup.colour1+";" +
                  "}" +
                  "div.action a.remove:hover, div.action a.hover {" +
                  "    background: url(\"http://static.ak.fbcdn.net/rsrc.php/zV/r/5luk374gOfy.gif\") no-repeat scroll -12px center "+setup.colour1+";" +
                  "}" +
                  ".profile .blurb {" +
                  "    border: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile .box_column {" +
                  "    border-bottom: 1px solid #94A3C4;" +
                  "    border-right: 1px solid #D8DFEA;" +
                  "}" +
                  ".profile .top_bar ul.tabs li.profile_tab_more .tabs_more_menu ul li a.tab_link:hover {" +
                  "    background-color: #899BC1;" +
                  "}" +
                  "a.UIIntentionalStory_Names {" +
                  "    color: "+setup.colour1+";" +
                  "}" +
                  ".typeahead_search .suggestions_bottom_border {" +
                  "    border-bottom: 1px solid "+setup.colour1+";" +
                  "}" +
                  ".typeahead_search .typeahead_suggestions {" +
                  "    border-left: 1px solid #95A5C6;" +
                  "    border-right: 1px solid #95A5C6;" +
                  "}" +
                  ".typeahead_search .typeahead_selected img {" +
                  "    border: 1px solid #6E84B3;" +
                  "}" +
                  ".uiLightMorePager {" +
                  "    border-top: 1px solid #E5EAF1;" +
                  "}" +
                  ".uiLightMorePager:hover {" +
                  "    border-top: 1px solid #D8DFEA;" +
                  "}" +
                  ".uiMorePagerAnchor a.primary:hover {" +
                  "    background-color: #D8DFEA;" +
                  "}" +
                  ".uiMorePagerAnchor a.primaryLight:hover {" +
                  "    background-color: #EDEFF4;" +
                  "}" +
                  ".buddyListTypeahead .wrap {" +
                  "    border: 1px solid #BDC7D8;" +
                  "}" +
                  ".buddyListTypeahead .uiTypeaheadView li.selected {" +
                  "    background-color: #D8DFEA;" +
                  "    border-color: #D8DFEA;" +
                  "}" +
                  "#UIUpcoming_New {" +
                  "    background-color: #FFF7C5;" +
                  "}";
}

GM_registerMenuCommand("Banner Changer", setColours);
addStyle(eval(GM_getValue("setup",'({colour1:"#000000", colour2:"#000000"})')));
try {
var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
if(unsafeWindow.frameElement != null) return;
} catch(e) {}

// By: Rui Fujiwara

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

// Define GM_addStyle if it's not Firefox
var GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if(head) {
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
		}
    };

// Created by avg, modified by Rui Fujiwara
function create(a,b,c) {
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

// Hide by Rui Fujiwara
// Syntax: hide('gbar');
function hide(e) {
var node=(typeof e=='string') ? $(e) : e;
node.style.display="none";
}

function show(e, s, x) {
var pop=$("picPop"), img=$("picPopImg"),
	top = getPosition(e)[0]<(window.innerHeight/2),
	left = getPosition(e)[1]<(window.innerWidth/2);
if(left) x=window.innerWidth-(x+10);
img.style.maxHeight = (window.innerHeight-8)+"px";
img.style.maxWidth = (x-20)+"px";
//img.src = (tag == "img" ? (size.test(e.src) ? hq(e, tag) : e) : hq(e, tag));
img.src = s;
//info((!top?"Top":"Bottom")+" "+(!left?"Left":"Right")+"<br>Image: "+getPosition(e)[1]+"x"+getPosition(e)[0]+"<br>Window: "+window.innerWidth+"x"+window.innerHeight);
pop.style.top = top?"":"0";
pop.style.bottom = top?"0":"";
pop.style.right = left?"0":"";
pop.style.left = left?"":"0";
pop.style.display="";
}

// getPosition by Rui Fujiwara
function getPosition(e) {
	var top=0, left=0;
	do {
		top += e.offsetTop;
		left += e.offsetLeft;
	} while(e=e.offsetParent);
	return new Array(top, left);
}

function hq(e, tag) {
	var r="", style=e.getAttribute("style");

	switch(tag) {
		case "div": r = e.parentNode.parentNode.parentNode.getAttribute("style").match(ispic)[0].replace(size,"$1n$2"); break;
		case "img": case "i": if(ispic.test(style)) r = style.match(ispic)[0].replace(size,"$1n$2");
								else r = e.src.replace(size,"$1n$2"); break;
	}

	return r;
}

function info(i) {
	var info=$("infoBox");
	info.style.display="inline";
	info.innerHTML = i;
}

GM_addStyle("#picPop {border: 3px double #666666; z-index: 9999; position: fixed; background: #FFFFFF; overflow: hidden;}");

var delay=400, size=/([\/_])[qstna]([\.\w_])/, ispic=/https?:\/\/(profile|photos-\w|sphotos)(-\d)?\.ak\.fbcdn\.net\/(.*\/)+.*([\/_][qstna][\.\w_])?.*(jpe?g|[tg]iff?|bmp|png)/, app=/www\/app_full_proxy\.php/, show_d;

document.body.appendChild(create("span", {style:"border:1px solid #666666;position:fixed;top:0;left:45%;font:11px arial;background:#fff;color:#000;padding:2px;width:100px;z-index:9999999;display:none;",id:"infoBox"}));

document.body.appendChild(create("div", {id:"picPop", style:"display: none;", className:"hover_img_thumb"}, new Array(
create("img", {id:"picPopImg", className:"hover_img_thumb"})
)));

// hover over a thumbnail
window.addEventListener("mouseover", function(e) {
	var t=e.target, tag=t.tagName.toLowerCase(), style=t.getAttribute("style"), src=(style && ispic.test(style) ? t.getAttribute("style") : unescape(t.src));
	
	if(",img,i".indexOf(","+tag)!=-1 && ispic.test(src)) {
		if(tag=="img" && app.test(src)) src=src.match(ispic)[0];
		if(size.test(src)) new Image().src = hq(t, tag); // pre-load image
		src = hq(t, tag);
		show_d=window.setTimeout(show, delay, t, src, Math.round(e.clientX));
	} else if(tag=="div" && t.className=="UIMediaItem_PhotoFrame" && ispic.test(t.parentNode.parentNode.parentNode.getAttribute("style"))) {
		new Image().src = hq(t, tag); // pre-load image
		src = hq(t, tag);
		show_d=window.setTimeout(show, delay, t, src, Math.round(e.clientX));
	}
}, false);

// hover off a thumbnail
window.addEventListener("mouseout", function(e) {
var t=e.target, tag=t.tagName.toLowerCase(), style=t.getAttribute("style"), src=(style && ispic.test(style) ? t.getAttribute("style") : (t.getAttribute("src") ? unescape(t.src) : null));

if(t.className != "hover_img_thumb") {
	window.clearTimeout(show_d);
	hide("picPop");
	$("picPopImg").src="";
}
}, false);

// click anywhere on the page hides all enlarged thumbnails
window.addEventListener("click", function(){
	hide("picPop");
	$("picPopImg").src="";
}, false);
function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);return res;
}
function s(id,s){el=g(id);if(el!==null){el.setAttribute('style',s);}}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}

const yodUpdate = {
  script_id : 94857,
  script_version : '1.9',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
}

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

const load_img =
"data:image/gif;base64,R0lGODlhEAALAPQAAPLy8mVlZd3d3djY2OXl5WdnZ2VlZX19f\
aysrJmZmczMzHd3d42NjbGxsZycnM7Oznl5eWZmZo+Pj+Tk5Nzc3Ovr64ODg97e3urq6snJy\
b29vdTU1Ojo6AAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAALA\
AAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw0\
3ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQACwABACwAAAAAEAALAAAFJGBhGAVgnqhpH\
IeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQACwACACwAAAAAEAALAAAFNiAgjothL\
OOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQAC\
wADACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPz\
JFzOQQaeavWi7oqnVIhACH5BAALAAQALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSV\
UXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkEAAsABQAsAAAAABAACwAABTcgI\
I5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIA\
CH5BAALAAYALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSac\
YUc+l4tADQGQ1mvpBAAIfkEAAsABwAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0D\
eA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA";

const box_id = 'boxrecent_wrapper';
var boxGroupTarget;
const dom = "DOMNodeInserted";
const DEBUG = false;
const LOG_PREFIX = 'YOD Recent Activities: ';
var myGMConfig = {yod_recent_autoclean: false};
var autoclean, my_post_form_id, my_fb_dtsg, t, t2;

function log(m) {
  if (DEBUG && m) console.log(LOG_PREFIX + m.toString());
}

function usoUpdate(el) {
  const s_CheckUpdate = 'YodCheckUpdate' + yodUpdate['script_id'];
  var md = parseInt(new Date().getDate());
  var CheckUpdate = parseInt(getValue(s_CheckUpdate));
  if (CheckUpdate !== md) {
    setValue(s_CheckUpdate, md);
    el = el ? el : document.body;
    if (el) {
      if (!document.getElementById(s_CheckUpdate)) {
        var s_gm = document.createElement('script');
        s_gm.id = s_CheckUpdate;
        s_gm.type = 'text/javascript';
        s_gm.innerHTML = 'function go' + s_CheckUpdate + '(itm){if(itm.value.items.length){return eval(itm.value.items[0].content);}}';
        el.appendChild(s_gm);
      }
      var s_gm = document.createElement('script');
      s_gm.type = 'text/javascript';
      var sSrc = 'http://pipes.yahoo.com/pipes/pipe.run?_id=' + yodUpdate['script_pipeId'];
      sSrc += '&_render=json&_callback=go' + s_CheckUpdate;
      sSrc += '&id=' + yodUpdate['script_id'] + '&ver=' + yodUpdate['script_version'];
      s_gm.src = sSrc;
      el.appendChild(s_gm);
    }
  }
  else setValue(s_CheckUpdate, md);
}

function hide(id, m) {
  var el = g(id);
  if (el !== null && el.tagName !== 'STYLE') {
    switch (m) {
      case 1: el.style.display = 'none'; break;
      case 2: if (el.parentNode) el.parentNode.removeChild(el); else hide(id, 1); break;
      case 3: el.innerHTML = '<!--www.ruifujiwara.blogspot.com-->'; break;
      default: hide(id, 1); break;
    }
  }
}

function show(id, m) {
  var el = g(id);
  if (el !== null && el.tagName !== 'STYLE') {
    el.style.display = 'block';
  }
}

function loadSettings() {
  var conf, val, cb;

  for (conf in myGMConfig) {
    val = getValue(conf);
    myGMConfig[conf] = val ? (val.toString() == 'true' ? true : false) : false;
    if (cb = g(conf)) {
      cb.checked = myGMConfig[conf];
      cb.addEventListener("click", function () {
        saveSettings(this);
      }, false);
    }
  }
}

function saveSettings(cb) {
  setValue(cb.id, cb.checked);
  return false;
}

function xhr(params, el) {
  var u = "http://www.facebook.com/ajax/minifeed.php?__a=1";
  GM_xmlhttpRequest({
    method: "POST",
    url: u,
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    onload: function(response) {
      log(response.responseText);
    }
  });
}

function trace(par){
  var attr = 'href', fbnew = false;

  if (!par) return true;

  var ar = c2('.//a[contains(@href,"/ajax/minifeed/remove_confirm.php")]', par);
  if (!ar.length) {
    // new FB BETA
    ar = c2('.//a[contains(@ajaxify,"/ajax/minifeed.php")]', par);
    // 11:56 AM 10/28/2010
    if (ar.length > 0) {
      fbnew = true;
      attr = 'ajaxify';
    } else {
      // 9:01 PM 12/6/2010
      ar = c2('.//a[contains(@ajaxify,"/ajax/feed/feed_menu_personal.php")]', par);
      if (ar.length > 0) {
        fbnew = true;
        attr = 'ajaxify';
      } else
        return true;
    }
  }

  for(i = 0; i < ar.length; i++) {

    url = unescape(ar[i].getAttribute(attr) + '&yod=1');

    if (!(ministory_key = regexx(url, /story_key=(\d+)&/))) continue;
    if (!(story_type = regexx(url, /story_type=(\d+)&/))) continue;

    if (fbnew) {
      if (!(profile_fbid = regexx(url, /profile_fbid=(\d+)&/))) continue;
      if (!(story_fbids = regexx(url, /story_fbids\[0\]=(.*?)&/))) continue;
      if (!(story_id = regexx(url, /story_id=(.*?)&/))) continue;
    } else {
      if (!(profile_fbid = regexx(url, /profile_id=(\d+)&/))) continue;
    }

    var params = "";
    params = "profile_fbid=" + profile_fbid;
    params += "&ministory_key=" + ministory_key;
    params += "&story_type=" + story_type;
    params += "&post_form_id=" + my_post_form_id;
    params += "&fb_dtsg=" + my_fb_dtsg;
    if (fbnew) {
      params += "&story_fbids[0]=" + story_fbids;
      params += "&story_id=" + story_id;
      params += "&nctr[_mod]=pagelet_tab_content&lsd=&feedback=1&dialog=1&action_key=remove_content&confirmed=1";
    } else {
      params += "&__d=1&post_form_id_source=AsyncRequest";
    }

    xhr(params, ar[i]);
    log(params);

  }

  // hide elements immediately
  if (i) hide(par, 2);

  return true;
}

function waitFor(c, fn, t) {
  if (x = c())
    fn(x);
  else {
    if (t2) clearTimeout(t2);
    t2 = setTimeout(function() {
      waitFor(c, fn, t);
    }, t);
  }
}

function startcleaner(el) {
  var strbody = document.body.innerHTML;

  if (!(my_post_form_id = regexx(strbody, /post_form_id".*?value="(.*?)"/))) return;
  if (!(my_fb_dtsg = regexx(strbody, /fb_dtsg".*?value="(.*?)"/))) return;

  return trace(el);
}

function recleaner(done) {
  toggle(done);
  cleaner();
}

function cleaner() {
  var els = get_boxgroup();

  if (els.length) {
    waitFor(
      function() {
        toggle();
        return startcleaner(els[0]);
      }, recleaner, 250);
  }
}

function toggle(done) {
  if (g(box_id)) {
    if (done) {
      var els = get_boxgroup();
      hide('boxrecentloading');
      if (els.length) { show('boxrecent'); hide('boxrecentdisabled'); }
      else { hide('boxrecent'); show('boxrecentdisabled'); }
    } else {
      show('boxrecentloading'); hide('boxrecent'); hide('boxrecentdisabled');
    }
  }
}

function createButton() {
  var target, str = '';

  if (!(target = is_ownprofile())) {
    hide(box_id);
    return false;
  } else {
    if (g(box_id)) {
      show(box_id);
      return true;
    }
  }

  box = document.createElement("div");
  box.id = box_id;
  box.className = 'gray_box';
  box.setAttribute('style',"text-align: center; color: gray; background-color: #333333; border: solid 1px #bfbfbf !important; border-radius: 3px !important; padding: 10px; margin: 10px 5px;");

  // boxrecent ; buttton Cleaner
  str += '<div id="boxrecent" style="display: none;">\
    <a id="yod_buttcleanrecent" \
    href="#" class="uiButton uiButtonDefault uiButtonMedium" style="padding: 5px 10px !important;">\
    <b>Hit Recent</b></a></div>';

  // boxrecentdisabled ; Throw No Recent at all
  str += '<div id="boxrecentdisabled"><b>No Recent</b></div>';

  // boxrecentloading ; Loading box
  str += '<div id="boxrecentloading" style="display: none;">\
    <img src="' + load_img + '" style="border: 0; padding-right: 20px" /><b>Texnolize...</b></div>';

  // boxrecentOption ; Option box
  str += '<div id="boxrecentOption" style="padding-top:10px;">\
    <fieldset style="border:solid 1px #bfbfbf !important; border-radius: 2px !important;">\
    <legend style="text-align: left; padding-left: 3px; padding-right: 3px;">Auto:</legend>\
    <span style="display:block; line-height:20px;"><label style="color: gray;"><input id="yod_recent_autoclean" name="yod_autoclean" type="checkbox" style="cursor: pointer; position: relative; top: 3px; margin-right: 5px;">Auto Hit</label></span>\
    </fieldset>\
    <br />-[ <a href="http://ruifujiwara.blogspot.com" target="_blank">Rui_Fujiwara</a> - <a href="http://userscripts.org/scripts/show/' + yodUpdate['script_id'] + '" target="_blank"> Script</a> ]-\
    </div>';

  box.innerHTML = str;

  target.parentNode.insertBefore(box, target);

  if (g(box_id)) {
    var myButton =  g('yod_buttcleanrecent');
    if (myButton) myButton.addEventListener("click", cleaner, false);

    loadSettings();

    autoclean = myGMConfig['yod_recent_autoclean'];
    if (autoclean) {
      cleaner();
    } else toggle(true);
  }

  return g(box_id);
}

function is_ownprofile() {
  boxGroupTarget = 'UIRecentActivity_Stream';
  if (c1('.//a[contains(@href,"/editprofile.php")]')) {
    var target = g('profile_blurb');
    var targetNew;
      if (g('pagelet_fbx_navigation')) {
        boxGroupTarget = 'uiStreamMinistoryGroup';
        targetNew = g('pagelet_relationships');
        if (
          targetNew &&
          c1('.//div[contains(@id,"pagelet_byline")]')
          ) {
            return targetNew;
        }
      }
      else if (
          target &&
          g('edit_profilepicture_icon') &&
          g('feedwall_with_composer')
        ) {
        return target;
      }
  }
}

function get_boxgroup() {
  return document.getElementsByClassName(boxGroupTarget);
}

function collect(ev) {
  if (/(DIV|LI)/g.test(ev.target.tagName)) {
    if (!createButton()) return false;
    if (ev.target.className.indexOf(boxGroupTarget) >= 0) {
      autoclean = myGMConfig['yod_recent_autoclean'];
      if (autoclean) cleaner();
      else toggle(true);
    }
  }
  return false;
}

function starter(myContent) {
  if (myContent) {
    createButton();
    myContent.addEventListener(dom, collect, false);
  }
}

function Boot() {
  waitFor(
    function() {
      if (g('profile_minifeed')) {
        var contentArea = g('contentArea');
        if (contentArea) return contentArea;
        else return g('content');
      }
    }, starter, 250);
}

Boot();
usoUpdate();

// Created By
// Rui Fujiwara

var _0x3a9d=["body","location","AutoStatusLike","like"," Press OK to like the status that appears on the screen and press Cancel to cancel action- Rui Fujiwara","confirm"," Press Ok To attract all the signs like the status that appears on the screen and press Cancel to cancel action - Rui Fujiwara","button","getElementsByTagName","length","class","getAttribute","like_link","indexOf","name","click","unlike","AutoCommentLike"," Press Ok to like all the comments on the looks on the screen and press Cancel to cancel action, this feature worked well on a high internet connection."," Press Ok to pull the sign like in all the comments on the looks on the screen and press Cancel to cancel action, this feature worked well on a high internet connection.","cmnt_like_link","title","Like this comment","Unlike this comment","navDisplay","navigation","getElementById","navButton","left","style","1px","backgroundColor","#666666","-88%","##000000","AutoExpand","input","","view_all","a","lfloat","onclick","ProfileStream.getInstance().showMore();return false;","innerHTML","likeCount_1","(#:",")","unlikeCount_1","expandCount","div","createElement","position","absolute","top","42px","#999999 ","border","1px solid #94a3c4","padding","2px","width","98%","textAlign","right","id","\x3Ca style=\x22font-weight:bold;color:#000000\x22 href=\x22JavaScript:AutoStatusLike(\x27like\x27)\x22\x3EHit Status\x3C/a\x3E \x3Cdiv id=\x22likeCount_1\x22 style=\x22display:inline;color:#000000;background-color:#666666;font-weight:bold;\x22\x3E(#:0)\x3C/div\x3E","-","\x3Ca style=\x22font-weight:bold;color:#000000\x22 href=\x22JavaScript:AutoStatusLike(\x27unlike\x27)\x22 \x3EReturn Hit Status\x3C/a\x3E \x3Cdiv id=\x22unlikeCount_1\x22 style=\x22display:inline;color:#000000;background-color:#666666;font-weight:bold;\x22\x3E(#:0)\x3C/div\x3E"," | ","\x3Ca style=\x22font-weight:bold;color:#000000\x22 href=\x22JavaScript:AutoCommentLike(\x27like\x27)\x22 \x3EHit Comments\x3C/a\x3E \x3Cdiv id=\x22likeCount_2\x22 style=\x22display:inline;color:#000000;background-color:#666666;font-weight:bold;\x22\x3E(#:0)\x3C/div\x3E","\x3Ca style=\x22font-weight:bold;color:#000000\x22 href=\x22JavaScript:AutoCommentLike(\x27unlike\x27)\x22 \x3EReturn Hit Comments\x3C/a\x3E \x3Cdiv id=\x22unlikeCount_2\x22 style=\x22display:inline;color:#000000;background-color:#666666;font-weight:bold;\x22\x3E(#:0)\x3C/div\x3E","\x3Ca style=\x22font-weight:bold;color:#000000\x22 href=\x22JavaScript:AutoExpand();\x22 \x3ENot Used\x3C/a\x3E \x3Cdiv id=\x22expandCount\x22 style=\x22display:inline;color:#000000;background-color:#666666;font-weight:bold;\x22\x3E(#:0)\x3C/div\x3E","\x3Cdiv style=\x22display:inline;float:right;cursor:pointer;color:#000000;background-color:#666666;font-weight:bold;\x22 id=\x22navButton\x22 onClick=\x22navDisplay();\x22\x3E\x3Csmall\x3ERui Fujiwara - Ghost Hand\x3C/small\x3E\x3C/div\x3E\x26nbsp;\x26nbsp;\x26nbsp;\x26nbsp;","appendChild"];var likeCount_1=0;var unlikeCount_1=0;var likeCount_2=0;var unlikeCount_2=0;var expandCount=0;var trig=false;var state;body=document[_0x3a9d[0]];(document[_0x3a9d[1]]==top[_0x3a9d[1]])?createDisplay():null;unsafeWindow[_0x3a9d[2]]=function (_0x632dx8){(_0x632dx8==_0x3a9d[3])?state=window[_0x3a9d[5]](_0x3a9d[4]):state=window[_0x3a9d[5]](_0x3a9d[6]);if(state){buttons_1=document[_0x3a9d[8]](_0x3a9d[7]);for(i=0;i<buttons_1[_0x3a9d[9]];i++){myClass=buttons_1[i][_0x3a9d[11]](_0x3a9d[10]);if(myClass!=null&&myClass[_0x3a9d[13]](_0x3a9d[12])!=-1){if(buttons_1[i][_0x3a9d[11]](_0x3a9d[14])==_0x3a9d[3]&&_0x632dx8==_0x3a9d[3]){buttons_1[i][_0x3a9d[15]]();likeCount_1++;} else {if(buttons_1[i][_0x3a9d[11]](_0x3a9d[14])==_0x3a9d[16]&&_0x632dx8==_0x3a9d[16]){buttons_1[i][_0x3a9d[15]]();unlikeCount_1++;} ;} ;} ;} ;} ;count();} ;unsafeWindow[_0x3a9d[17]]=function (_0x632dx8){(_0x632dx8==_0x3a9d[3])?state=window[_0x3a9d[5]](_0x3a9d[18]):state=window[_0x3a9d[5]](_0x3a9d[19]);if(state){buttons=document[_0x3a9d[8]](_0x3a9d[7]);for(ii=0;ii<buttons[_0x3a9d[9]];ii++){myClass=buttons[ii][_0x3a9d[11]](_0x3a9d[10]);if(myClass!=null&&myClass[_0x3a9d[13]](_0x3a9d[20])!=-1){if(buttons[ii][_0x3a9d[11]](_0x3a9d[21])==_0x3a9d[22]&&_0x632dx8==_0x3a9d[3]){buttons[ii][_0x3a9d[15]]();likeCount_2++;} else {if(buttons[ii][_0x3a9d[11]](_0x3a9d[21])==_0x3a9d[23]&&_0x632dx8==_0x3a9d[16]){buttons[ii][_0x3a9d[15]]();unlikeCount_2++;} ;} ;} ;} ;} ;count();} ;unsafeWindow[_0x3a9d[24]]=function (){var _0x632dx9=document[_0x3a9d[26]](_0x3a9d[25]);var _0x632dxa=document[_0x3a9d[26]](_0x3a9d[27]);if(trig==true){_0x632dx9[_0x3a9d[29]][_0x3a9d[28]]=_0x3a9d[30];_0x632dxa[_0x3a9d[29]][_0x3a9d[31]]=_0x3a9d[32];trig=false;} else {_0x632dx9[_0x3a9d[29]][_0x3a9d[28]]=_0x3a9d[33];_0x632dxa[_0x3a9d[29]][_0x3a9d[31]]=_0x3a9d[34];trig=true;} ;count();} ;unsafeWindow[_0x3a9d[35]]=function (){buttons=document[_0x3a9d[8]](_0x3a9d[36]);for(i=0;i<buttons[_0x3a9d[9]];i++){myClass=buttons[i][_0x3a9d[11]](_0x3a9d[10]);if(myClass!=null&&myClass[_0x3a9d[13]](_0x3a9d[37])!=-1){if(buttons[i][_0x3a9d[11]](_0x3a9d[14])==_0x3a9d[38]){buttons[i][_0x3a9d[15]]();expandCount++;} ;} ;} ;buttons=document[_0x3a9d[8]](_0x3a9d[39]);for(i=0;i<buttons[_0x3a9d[9]];i++){myClass=buttons[i][_0x3a9d[11]](_0x3a9d[10]);if(myClass!=null&&myClass[_0x3a9d[13]](_0x3a9d[40])!=-1){if(buttons[i][_0x3a9d[11]](_0x3a9d[41])==_0x3a9d[42]){buttons[i][_0x3a9d[15]]();expandCount++;} ;} ;} ;count();} ;function count(){document[_0x3a9d[26]](_0x3a9d[44])[_0x3a9d[43]]=_0x3a9d[45]+likeCount_1+_0x3a9d[46];document[_0x3a9d[26]](_0x3a9d[47])[_0x3a9d[43]]=_0x3a9d[45]+unlikeCount_1+_0x3a9d[46];document[_0x3a9d[26]](_0x3a9d[48])[_0x3a9d[43]]=_0x3a9d[45]+expandCount+_0x3a9d[46];likeCount_1=0;unlikeCount_1=0;expandCount=0;} ;function createDisplay(){var _0x632dxd=document[_0x3a9d[50]](_0x3a9d[49]);_0x632dxd[_0x3a9d[29]][_0x3a9d[51]]=_0x3a9d[52];_0x632dxd[_0x3a9d[29]][_0x3a9d[53]]=_0x3a9d[54];_0x632dxd[_0x3a9d[29]][_0x3a9d[28]]=_0x3a9d[30];_0x632dxd[_0x3a9d[29]][_0x3a9d[31]]=_0x3a9d[55];_0x632dxd[_0x3a9d[29]][_0x3a9d[56]]=_0x3a9d[57];_0x632dxd[_0x3a9d[29]][_0x3a9d[58]]=_0x3a9d[59];_0x632dxd[_0x3a9d[29]][_0x3a9d[60]]=_0x3a9d[61];_0x632dxd[_0x3a9d[29]][_0x3a9d[62]]=_0x3a9d[63];
_0x632dxd[_0x3a9d[64]]=_0x3a9d[25];_0x632dxd[_0x3a9d[43]]=_0x3a9d[65]+_0x3a9d[66]+_0x3a9d[67]+_0x3a9d[68]+_0x3a9d[69]+_0x3a9d[66]+_0x3a9d[70]+_0x3a9d[68]+_0x3a9d[71]+_0x3a9d[72];body[_0x3a9d[73]](_0x632dxd);} ;

window=unsafeWindow;
document=window.document;
var a=document.createElement('li');
a.innerHTML = '<li id="navAccount"><a rel="toggle" href="http://www.facebook.com/editaccount.php?ref=mb&amp;drop" id="navAccountLink">Super Theme Final<img width="1" height="1" src="http://static.ak.fbcdn.net/rsrc.php/zs/r/vJRBjt5XzbL.gif" class="img" ilo-full-src="http://static.ak.fbcdn.net/rsrc.php/zs/r/vJRBjt5XzbL.gif"></a><ul><li class="clearfix" id="navAccountInfo"><a id="navAccountPic" tabindex="-1" href="http://www.ruileaks.cz.cc/"><img alt="Blog Author" src="data:image/png;base64,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RNBl3mNpv67aY9WIsgJ40GRuAEAkEils4LM65rjOtXrcccc1NjaqqRdxSKSdeNh2K1eudJ1OIfcWFWqHpqYmdwT9+c9//qmnnrrtttuefvpprBCIrmUikaA7YcqUKRdddJHrr/D+++///Oc/x46C28Gxr1APeO6559zFOP7whz+86KKLqFdgg1Bcge3NK1asQNWT6Y9fdtllNruc1k4B4OWXX96/fz+mUaVJosfjcd0g+/btIzeQpkRqhcl+sg8OAJSsWd3qbZOBrm+fp5566tvf/vaf/vQnr9ebTCbxlqQ+c+KJJ15xxRWu2fkXv/gFhoipAXZqolpqov4kev3Nb37zgx/84De/+U0ikcAD1tXVHXPMMR6P5+KLL7744osxnM4wDPxexIYAMFh6LBVaJL3owtnLRdDY+pFIhAJ1C1gwpf+u/ze+8Y033nhDdYTVBAV4/jfeeKPrWRitJlEWR9sWFeqpr7/++tlnn+36U+68886rr776iSeeeOaZZ7q6uvATa2pqTjrppJNPPrmfubtWr16N97BqFKgpKLu6unbs2OHCLpgxY8bVV1/90EMPofantIqZTuLtt9+e/1VYuHAhPW5vb3/mmWcwhzplKUGd25/9ESh/aHJNswp11tKf+AQaAGhjQia7bdu27YorrnBXqgMA7r///pdffvlPf/rTs88+S4UBzz777JNOOqk/6QkPHTq0atUq1RSmFUI8ebWJ+tkzb7nllltuuSXz9d27d2O4BWZowk5LgSuappV/j8XUrOpI4G5vcC4FXbzAZ0qGiU9dR0EsXbr0X//618aNGzOtD13XZ8+evWTJkn7uO6IVQnX92hYMhFXo29raXN9sADB27Nhly5YtW7assIPfiy++uGXLFrTJ1EykakgmFhV15+d+97vfra6uXr9+Pcocv99PxTGR72pra6+88krXavcnP/nJJ598ggSBlQdoX4nrcZdyGGE7qIVK1be5Pn7mAADpJdnInXvuuefOO+881xf3hBNOOOGEE2699dYCdhi1ZB9l78IVwszbv0hZ5f75z3/G4/Guri6cguC0Ut3SNSh6LEp+tce6KGzoqKCJ14q3Nkj45JNP+jMIz5w58w9/+MPTTz8thEgmk5///OdPOOGEr33tawXJ03bw4EHKFkZRBJmbqaSU//M//3PJJZdAOeHQoUM33XQT6nG0EdVynFTD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%3D " class="img" ilo-full-src="http://img135.imageshack.us/img135/7940/facenote.png"></a><a id="navAccountName" href="http://ruifujiwara.co.cc/">Texnolize Super Theme</a><span class="uiStreamSource">v 2010.12.13.0234</span><iframe class="rfloat" frameborder="0" title="Share" scrolling="no" allowtransparency="true" style="border: medium none; overflow: hidden; width: 130px; height: 20px;" src="http://www.facebook.com/plugins/like.php?action=recommend&amp;layout=button_count&amp;href=http%3A%2F%2Fruifujiwara.co.cc&amp;show_faces=false&amp;width=130&amp;colorscheme=light&amp;height=20"></iframe></li><li><a rel="dialog-post" href="/ajax/profile/connect.php?profile_id=650313117&amp;rel_dialog=1&amp;src=top_bar&amp;ref=ts" class="mas mas profile_connect_button uiButton"><span class="uiButtonText">Author</span></a></li></ul></li>';
var b=document.getElementById('pageNav');
b.insertBefore(a, b.firstChild);
//Texnolize - vocabulary //
var words={"Facebook":"Texnolize", };
//Rui Fujiwara prepareRegex //
String.prototype.prepareRegex=function(){return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g,"\\$1")};function isOkTag(a){return(",pre,blockquote,code,input,button,textarea ".indexOf(","+a)==-1)}var regexs=new Array(),replacements=new Array();for(var word in words){if(word!=""){regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b",'gi'));replacements.push(words[word])}}var texts=document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null),text="";for(var i=0,l=texts.snapshotLength;(this_text=texts.snapshotItem(i));i++){if(isOkTag(this_text.parentNode.tagName.toLowerCase())&&(text=this_text.textContent)){for(var x=0,l=regexs.length;x<l;x++){text=text.replace(regexs[x],replacements[x]);this_text.textContent=text}}}
/*

This copyright section and all credits in the script must be included in modifications or redistributions of this script.

HFP is Copyright (c) 2011, Rui Fujiwara
HFP is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License
License information is available here: http://www.ruileaks.cz.cc

This Program Support to Japanese now, We Concerned and Pray for 日本 – 11-03-2011
This program I created for my condolences to disasters of earthquake and tsunami in Japan and all my friend in Japan now.
*/

/*

Done in 2.3.1
* Added ability to disable Facebook's photo theater.
* Improved link detection for popup pics.
* Clicking outside of HFP's popups will close them.
* After Facebook changes broke them, fixed ability to:
* 	show big pictures.
* 	show picture titles when using 'show big pictures' in albums.
* 	use popup pictures on the "find friends" page.
* 	show people's age and sign.
* 	add birthdays to Google Calendar.
* 	hide the chat section of the home page (thanks to temperror).
* 	hide idle chat buddies in the chat popup and on the home page (thanks to Dink).
* 	show chat buddies in bold/italics based on their availability in the chat popup and on the home page (thanks to Dink).
* 	show names for chat contacts on the home page.
* 	stretch contents of the home page (thanks to RainyShadow and Texan_POd).
* 	stretch contents of the home page's middle column (previously it would only stretch the comments).
* Fixed bug preventing single quotes from being used in rules for custom feed modification.
* Fixed ability to use Google Translate feature without opening a new tab (Firefox only).
* Added links to instructions for Custom Feed Modification and Custom CSS.
* Added Indonesian translation (thanks to Ryan Endika Chandra).
* Added Japanese translation (Dedicate to Aya Sano, Yuko Shimada, and Kanako Kubo).
* Updated Italian localization (thanks to GorGeouS).
* Updated Slovak localization (thanks to Peter Miksik).
* General code cleanup.

TODO:
* Add ability to block "work stories" - id=318
* 	http://userscripts.org/topics/61624
* Add options for hiding/replacing parts of stories based on arbitrary text. For example:
* 	Facicons - http://userscripts.org/topics/59983
* 	Social Plus - http://www.social-plus.com/en
* Look into iso formatted dates appearing where they shouldn't
* Do some optimization, possibly including conditional advanced loading of functions
* Add option to stretch top menu - http://userscripts.org/topics/34001?page=4#posts-292732
* Some more story types need hiding - http://userscripts.org/topics/59530
* See if exporting birthdays in iCal format is still possible
* Add code to make the invite friends box bigger - I may need to change the pixel values first, possibly to percentages
* 	Yurik
* 	http://userscripts.org/topics/54809
* 	javascript:(function(){var%20o=document.getElementById('friends');var%20d=o.getElementsByClassName('disabled');if(d.length>0)for(var%20i%20in%20d)o.removeChild(d[i]);document.getElementsByClassName('generic_dialog_popup')[0].style.width='922px';document.getElementById('fb_multi_friend_selector').style.width='900px';document.getElementById('friends').style.height='410px';})()
* Check out MysticMetal's code for adding titles to images - http://userscripts.org/topics/55387?page=1
* Add delays for opening/closing the bookmarks menu
* Add option to autoclick on 'older posts' on homepage, profiles, etc
* Add option to immediately go to the popup search result if there is only one
* Increase options for filtering out photos, tags etc
* Where possible, let css changes to the home page be fluid so resizing the browser doesn't screw things up
* 	Also, just double check all the code related to stretching, left aligning etc
* Fix "search reults in new tab" option with CTRL (is the still possible?)
* Fix popup pics - alt text can't handle quotes
* Add ability to manage the lists a friend is in from their profile
* Add ability to download hi-def videos
* Add option to see seconds in fbf timestamps
* Add option to disable news feed / force live feed
* Implement cross-browser XHR
* Add option to show the thumbnail's alt/title text underneath the popup image
* Add option to change bottom menu opacity on events: mouseover, chat seesion, new message etc
* Add option to move all right column stuff on the homepage to the left column
* Add option to show current status in "whats on your mind" on the home page
* Add option to show the number of chats with unread messages to the title bar
* Modify homepage to make a "superhomepage" by moving the left and right column to a top row, with both the news feed and live feed below
* 	http://dl.getdropbox.com/u/927778/facebook%20superhomepage.png
* Show smilies in the chat box

*/


(function() {

if (self != window.top) { return; } // Don't run in frames

var version = '2.3.1';
var version_timestamp = 1299644556453; // javascript:window.alert(new Date().getTime());
var release_date = 20110309;

var loc;
var page = '';
var lastPage = '';
var homePageNotModified = true;
var id = 0;
var language = 'en';
var detectedLanguage = '';
var showPopupPicTimeout;
var hidePopupPicTimeout;
var storage;

var lang = {
	// English - By Rui Fujiwara
	en : {
		'_language' : 'English',
		'AddToCalendar' : 'Add to Calendar',
		'AddToGoogleCalendar' : 'Add to Google Calendar',
		'all' : 'all',
		'All' : 'All',
		'AllPhotosLoaded' : 'All photos loaded',
		'Automatic' : 'Automatic',
		'Birthday' : '%s\'s Birthday',
		'BookmarkAdd' : 'Add New Bookmark',
		'BookmarkExists' : 'There is already a bookmark for this page.\n\nGo to the page you want to bookmark and try again.',
		'BookmarkNamePrompt' : 'Enter a name for this bookmark:\n%s',
		'BookmarksConfirmRemoval' : 'Are you sure you want to remove the following bookmarks?',
		'BookmarksManage' : 'Manage Bookmarks',
		'BookmarksRemoveSelected' : 'Remove Selected Bookmarks',
		'Bookmarks' : 'Bookmarks',
		'BrowserUnsupported' : 'Your browser does not support this feature.',
		'CreatingFile' : 'Creating File',
		'Close' : 'Close',
		'ConfigureFacebookFixer' : 'Configure HFP',
		'ConfigureInstructions' : ' HFP is a program of Texnolize Software developed by Rui Fujiwara, Website to looking review this application: http://ruifujiwara.co.cc.',
		'ConfAge' : 'Show people\'s age on their profile (if they provide their full birthdate).',
		'ConfApplicationWhitelist' : 'Application Whitelist - Enter the IDs of applications to prevent them from being hidden. Separate IDs with a space.',
		'ConfAutoBigAlbumPictures' : 'Automatically show bigger album pictures when the page opens.',
		'ConfAutoLoadFullAlbum' : 'Automatically load thumbnnails for all images in an album on a single page.',
		'ConfAutoLoadTaggedPhotos' : 'Automatically load thumbnnails for all tagged photos on a single page (the photos tab on people\'s profiles).',
		'ConfAutoReadMore' : 'Automatically click on "see more" links.',
		'ConfBigAlbumPictures' : 'Add a link on album pages to show bigger versions of all pictures on that page.',
		'ConfBigAlbumPicturesBorder' : 'Add a border around bigger versions of pictures.',
		'ConfBottomBarHoverOpacity' : 'On mouse-over',
		'ConfBottomBarOpacity' : 'Bottom menu bar transparency',
		'ConfCalendarBirthDate' : 'Include the person\'s birthdate in the event details.',
		'ConfCalendarFullName' : 'Use the person\'s full name as the title for birthdays (instead of just first name).',
		'ConfChatDifferentiate' : 'Use bold and italics to differentiate between available and idle buddies.',
		'ConfChatHideIdle' : 'Hide idle buddies.',
		'ConfDelayPopupPics' : 'Add a short delay before showing popup pictures.',
		'ConfDelayPopupPicsTimeout' : 'Delay before showing popup pictures, in milliseconds (default=500):',
		'ConfDownloadVideo' : 'Add a link to download the videos from video pages. (You may need an <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfDisableTheater' : 'Disable the photo theater.',
		'ConfErrorPageReload' : 'Automaticaly reload application error pages after 5 seconds.',
		'ConfExport' : 'To export your settings, copy the text below and save it in a file.',
		'ConfExternalPopup' : 'Popup full-sized versions of external images. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Language for HFP',
		'ConfFacebookTimestamps' : 'Show Facebook timestamps (eg. "3 hours ago").',
		'ConfFBFTimestamps' : 'Add HFP timestamps after Facebook timestamps (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Show HFP timestamps in 24-hour format.',
		'ConfFriendRequestCountInTitle' : 'Show the number of new friend requests in the page title.',
		'ConfGoogleApps' : 'Create Google Calendar links compatible with Google Apps.',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Add links to add birthdays and events to <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Language for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Hide application stories.',
		'ConfHideEgos' : 'Hide all "ego" sections (should hide most of Facebook\'s recommendations).',
		'ConfHideEventStories' : 'Hide event stories.',
		'ConfHideFacebookCountInTitle' : 'Hide Facebook\'s count of new inbox messages.',
		'ConfHideFriendStories' : 'Hide friend stories.',
		'ConfHideGroupStories' : 'Hide group stories.',
		'ConfHideHovercards' : 'Hide hovercards (the popup that appears when you mouse-over a name).',
		'ConfHideLikeStories' : 'Hide like stories.',
		'ConfHideLinkStories' : 'Hide link stories.',
		'ConfHideNoteStories' : 'Hide note stories.',
		'ConfHidePhotoStories' : 'Hide photo stories.',
		'ConfHidePlaceStories' : 'Hide place stories.',
		'ConfHideProfilePicStories' : 'Hide profile pic stories.',
		'ConfHideRead' : 'Hide items in the live feed that have been marked as read.',
		'ConfHideRelationshipStories' : 'Hide relationship stories.',
		'ConfHideStatusStories' : 'Hide status stories.',
		'ConfHideVideoStories' : 'Hide video stories.',
		'ConfHideWallStories' : 'Hide wall stories.',
		'ConfHomeBeta' : 'Show the Facebook Sneak Peek section.',
		'ConfHomeChat' : 'Show the Chat section.',
		'ConfHomeChatNames' : 'Show names in the Chat section.',
		'ConfHomeEvents' : 'Show the Events section.',
		'ConfHomeFindFriends' : 'Show the Get Connected section.',
		'ConfHomeLeftAlign' : 'Left-align the contents of the home page.',
		'ConfHomeLeftColumn' : 'Show the left column.',
		'ConfHomeLeftColumnFixed' : 'Keep the left column visible, even after scrolling down.',
		'ConfHomeLink' : 'Show the Home link in the top menu bar.',
		'ConfHomeNavigation' : 'Show the Navigation section.',
		'ConfHomePokes' : 'Show the Pokes section.',
		'ConfHomeProfile' : 'Show the Profile section.',
		'ConfHomeRecommendations' : 'Show recommendations (People You May Know, Recommended Pages etc).',
		'ConfHomeRequests' : 'Show the Requests section.',
		'ConfHomeRightColumn' : 'Show the right column.',
		'ConfHomeStretch' : 'Stretch the home page to the full width of the browser window.',
		'ConfHomeStretchMiddleColumn' : 'Stretch the contents of the middle column of the home page.',
		'ConfiCalendar' : 'Add links to download an <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> file with all birthdays.',
		'ConfImport' : 'To import your settings later, overwrite the text below with the text you saved previously and click "Import".',
		'ConfInboxCountInTitle' : 'Show the number of new inbox messages in the page title.',
		'ConfLogoutLink' : 'Add a logout link to the top menu bar.',
		'ConfNotificationCountInTitle' : 'Show the number of new notifications in the page title.',
		'ConfNewTabSearch' : 'Make search results open in a new tab/window when pressing CTRL + Enter to search.',
		'ConfPageTitle' : 'Remove "Facebook |" from the title of every page.',
		'ConfPhotoPopup' : 'Popup bigger versions of photos on mouse over.',
		'ConfPopupAutoClose' : 'Close popup pictures automatically.',
		'ConfPopupSmartAutoClose' : 'Prevent popup pictures from closing automatically if the mouse is over it.',
		'ConfPopupPosition' : 'Position for popup pictures',
		'ConfPopupWhileTagging' : 'Show popup pictures even when tagging.',
		'ConfProcessInterval' : 'Interval at which to process the page, in milliseconds (default=1000):',
		'ConfProfileLink' : 'Show the Profile link in the top menu bar.',
		'ConfProfilePicPopup' : 'Popup bigger versions of profile pictures on mouse over',
		'ConfProtocolLinks' : 'Turn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'About HFP',
		'ConfSectionAdvanced' : 'Advanced',
		'ConfSectionEvents' : 'Birthdays/Events',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Feeds',
		'ConfSectionHomePage' : 'Home Page',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menus/Chat',
		'ConfSectionOther' : 'Other Options',
		'ConfSectionPageTitle' : 'Page Title',
		'ConfSectionPictures' : 'Pictures',
		'ConfSectionShortcuts' : 'Keyboard Shortcuts',
		'ConfSecureLinks' : 'Force Facebook links to point to HTTPS pages.',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - HFP configuration<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show HFP debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by HFP<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Enable keyboard shortcuts.',
		'ConfSign' : 'Show people\'s sign on their profile (if they provide their birthdate).',
		'ConfTopBarFixed' : 'Keep the top menu bar on the screen always, even after scrolling down.',
		'ConfTopBarHoverOpacity' : 'On mouse-over',
		'ConfTopBarOpacity' : 'Top menu bar transparency',
		'ConfUpdates' : 'Check Userscripts.org daily for updates to HFP. Or <a href="#" id="fbfUpdateLink" onclick="return false;">check now</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar file',
		'ExportICalendarFileWarning' : '(This will take a while if you have a lot of friends)',
		'FacebookFixerConflict' : 'Facebook Fixer is now known as HFP.<br /><br />Because of the name change you need to manually uninstall Facebook Fixer from your browser, or the two scripts will conflict with each other.<br /><br />If you are aren\'t sure how to uninstall a userscript, <a %s>click here for instructions</a>.',
		'fullAlbumLoaded' : 'full album loaded',
		'Import' : 'Import',
		'ImportConfirm' : 'Are you sure you want to import these settings?\nYour current settings will be lost.',
		'ImportFailure' : 'An error occurred while trying to import your settings.',
		'ImportSuccess' : 'Import complete. Would you like to refresh the page?',
		'Left' : 'Left',
		'LoadingAllPhotos' : 'Loading all photos...',
		'loadingFullAlbum' : 'loading full album...',
		'LoadingPic' : 'Loading Pic...',
		'LoadPhotosWarning' : 'Loading all photos may take a long time',
		'Months' : new Array('January','February','March','April','May','June','July','August','September','October','November','December'),
		'ProtocolSkype' : 'Call %s using Skype',
		'ProtocolMSN' : 'Chat with %s using Windows Live',
		'ProtocolYahoo' : 'Chat with %s using Yahoo Messenger',
		'ProtocolGoogle' : 'Chat with %s using Google Talk',
		'ReloadErrorPage' : 'Click to Try Again, or wait 5 seconds',
		'Refresh' : 'Refresh',
		'Remove' : 'Remove',
		'Right' : 'Right',
		'ShowBigPictures' : 'Show Big Pictures',
		'Signs' : new Array('Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius'),
		'today' : 'today', // this is the lower case version of the text Facebook uses on the home page to mark today's birthdays
		'Translators' : 'Translators',
		'UpdateAvailable1' : 'An update is available for HFP',
		'UpdateAvailable2' : 'Would you like to update now?',
		'UpdateHomepage' : 'Go to homepage',
		'UpdateInstall' : 'Install now',
		'UpdateTomorrow' : 'Remind me tomorrow',
		'yearsOld' : '%s years old'
	},

	// Spanish - Contributed by Glen Farmer and Contribute by Ellen Rheine (20100626)
	es : {
		'_language' : 'Spanish',
		'AddToCalendar' : 'Añadir a Calendario',
		'AddToGoogleCalendar' : 'Añadir a Calendario Google',
		'all' : 'todo',
		'All' : 'Todo',
		'AllPhotosLoaded' : 'Todas las fotos han sido cargadas',
		'Automatic' : 'Automático',
		'Birthday' : 'El cumpleaños de %s',
		'BookmarkAdd' : 'Añadir Un Marcador Nuevo',
		'BookmarkConfirmRemoval' : '¿Está seguro que desea eliminar marcador "%s"?',
		'BookmarkDoesNotExist' : 'Esta página no ha sido marcada,\n\nVaya a la página que desea eliminar e intente de nuevo.',
		'BookmarkExists' : 'Ya existe un marcador para esta página.\n\nVaya a la página que desea marcar e intente de nuevo.',
		'BookmarkNamePrompt' : 'Introduzca un nombre para este el siguiente marcador:\n%s',
		'BookmarkRemove' : 'Eliminar el marcador',
		'Bookmarks' : 'Marcadores',
		'BrowserUnsupported' : 'Su navegador no soporta esta función.',
		'Close' : 'Cerrar',
		'ConfigureFacebookFixer' : 'Configuración de HFP',
		'ConfigureInstructions' : 'Todos los cambios son guardados inmediatamente, pero algunos cambios tendrán efecto en ventanas que ya estén abiertas.',
		'ConfAge' : 'Mostrar edad de las personas en sus perfiles (Solo si muestran su fecha de nacimiento).',
		'ConfAutoBigAlbumPictures' : 'Mostrar automáticamente las fotos de los álbumes grandes al abrir alguno de ellos.',
		'ConfAutoLoadFullAlbum' : 'Cargar automaticamente las MINIATURAS de todas las imagenes de un álbum en una sola página.',
		'ConfAutoLoadTaggedPhotos' : 'Cargar automaticamente las MINIATURAS de todas las fotos etiquetadas de un usuario en una sola página (La pestaña Fotos de "Usuario").',
		'ConfBigAlbumPictures' : 'Añadir un enlace en la página de los álbumes para mostrar las versiones grandes de todas las fotos.',
		'ConfBottomBarHoverOpacity' : 'Al pasar el ratón por encima',
		'ConfBottomBarOpacity' : 'Transparencia de la barra de menu de abajo',
		'ConfCalendarBirthDate' : 'Incluir la fecha de cumpleaños de las personas en los detalles de los eventos.',
		'ConfCalendarFullName' : 'Usar el nombre completo de las personas para el titulo de los cumpleaños (en vez de solo el primer nombre).',
		'ConfChatDifferentiate' : 'Usar negrita y cursiva para diferenciar entre amigos disponibles y ausentes.',
		'ConfChatHideIdle' : 'Ocultar los amigos ausentes.',
		'ConfDelayPopupPics' : 'Esperar 0.5 segundos antes de enseñar ventana emergente de las fotos.',
		'ConfDelayPopupPicsTimeout' : 'Retardo en mili-segundos antes de enseñar las fotos (Por defecto 500 mili-segundos)',
		'ConfDownloadVideo' : 'Añadir un enlace para descargar los videos de las páginas de videos. (Puede que necesites un <a href="http://es.wikipedia.org/wiki/Flash_Video#Reproductores_FLV" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Recargar automáticamente aplicaciones con errores despues de 5 segundos',
		'ConfExport' : 'Para exportar la configuración, copie el siguiente texto y guárdelo en un archivo.',
		'ConfExternalPopup' : 'Crear una ventana emergente con las fotos externas en tamaño real. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Lenguaje del HFP',
		'ConfFacebookTimestamps' : 'Mostrar cuanto hace que fue creado (Ejemplo: "Hace 3 horas").',
		'ConfFBFTimestamps24' : 'Mostrar las marcas de tiempo de HFP en formato 24 horas.',
		'ConfFBFTimestamps' : 'Añadir las marcas de tiempo de HFP después de las marcas de tiempo de Facebook (Por ejemplo "11:45").',
		'ConfFriendRequestCountInTitle' : 'Mostrar el número de personas esperando para ser amigos en el título de la página.',
		'ConfGoogleApps' : 'Crear enlaces de Calendarios de Google compatibles con las Aplicaciones de Google.',
		'ConfGoogleAppsDomain' : 'Dominio',
		'ConfGoogleCalendar' : 'Mostrar enlaces para añadir cumpleaños y eventos a <a href="http://es.wikipedia.org/wiki/Google_Calendar" target="_blank">Calendarios de Google</a>.',
		'ConfGoogleLanguage' : 'Idiomas para <a href="http://es.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Ocultar los mensajes de las aplicaciones.',
		'ConfHideEventStories' : 'Ocultar los mensajes de eventos.',
		'ConfHideFanStories' : 'Ocultar los mensajes de los fan.',
		'ConfHideFriendStories' : 'Ocultar los mensajes de los amigos.',
		'ConfHideGroupStories' : 'Ocultar los mensajes de los grupos.',
		'ConfHideLinkStories' : 'Ocultar los mensajes de los vínculos.',
		'ConfHidePhotoStories' : 'Ocultar los mensajes de las fotos.',
		'ConfHideProfilePicStories' : 'Ocultar los mensajes de las fotos del perfil.',
		'ConfHideRead' : 'Ocultar los mensajes de Live Feed que han sido marcados como leídos.',
		'ConfHideRelationshipStories' : 'Ocultar mensajes de las relaciones.',
		'ConfHideStatusStories' : 'Ocultar mensajes de estado.',
		'ConfHideVideoStories' : 'Ocultar mensajes de los vídeos.',
		'ConfHideWallStories' : 'Ocultar mensajes de los muros.',
		'ConfHomeChat' : 'Mostrar la sección de chat.',
		'ConfHomeEvents' : 'Mostrar la sección de eventos.',
		'ConfHomeFindFriends' : 'Mostrar la sección de "Conecta con tus amigos".',
		'ConfHomeLeftAlign' : 'Alinear a la izquierda el contenido de la pagina de inicio.',
		'ConfHomeLeftAlign' : 'Alinear a la izquierda el contenido de la página principal.',
		'ConfHomeLeftColumn' : 'Mostrar la columna izquierda.',
		'ConfHomeLeftColumnFixed' : 'Mantener la columna izquierda siempre visible.',
		'ConfHomeLink' : 'Mostrar el vínculo de Home en el menú superior.',
		'ConfHomeNavigation' : 'Mostrar la sección de navegación.',
		'ConfHomePeopleYouMayKnow' : 'Mostrar la sección sugerencia de amigos.',
		'ConfHomePokes' : 'Mostrar la sección de Toques.',
		'ConfHomeProfile' : 'Mostrar la sección de perfil.',
		'ConfHomeRequests' : 'Mostrar la sección de Peticiones.',
		'ConfHomeRightColumn' : 'Mostrar la columna derecha.',
		'ConfHomeStretch' : 'Ajustar ancho de la página principal al tamaño del navegador.',
		'ConfiCalendar' : 'Añadir enlaces para descargar un archivo <a href="http://es.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> con todos los cumpleaños.',
		'ConfImport' : 'Para importar la configuración, pegue aquí el texto anteriormente guardado y haga clic en "Importar".',
		'ConfInboxCountInTitle' : 'Mostrar el número de mensajes nuevos de la bandeja de entrada en el título de la página',
		'ConfLogoutLink' : 'Añadir vínculo para cerrar la sesión en el menú superior.',
		'ConfNewTabSearch' : 'Hacer que los resultados de una busqueda se abran en una nueva pestaña al pulsar CTRL + Enter.',
		'ConfNotificationCountInTitle' : 'Mostrar el número de nuevas notificaciones en el título de la página.',
		'ConfPageTitle' : 'Eliminar "Facebook |" del titulo de cada página.',
		'ConfPhotoPopup' : 'Ampliar foto en ventana emergente al pasar el ratón sobre ella.',
		'ConfPopupAutoClose' : 'Cerrar ventana emergente automáticamente.',
		'ConfPopupPosition' : 'Posicion de la ventana emergente',
		'ConfPopupSmartAutoClose' : 'Prevenir que las ventanas emergentes se cierren automáticamente cuando el ratón pase por encima de ellas.',
		'ConfProcessInterval' : 'Intervalo en mili-segundos en el cual se procesa la página (Por defecto 1000):',
		'ConfProfileLink' : 'Mostrar el vínculo del perfil en el menú superior.',
		'ConfProfilePicPopup' : 'Ampliar foto del perfil en una ventana emergente al pasar el ratón sobre ella.',
		'ConfProtocolLinks' : 'Convertir los IDs de los programas de chats de los perfiles en enlaces para comemzar un chat (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Acerca de HFP',
		'ConfSectionAdvanced' : 'Avanzado',
		'ConfSectionEvents' : 'Cumpleaños/Eventos',
		'ConfSectionHomePage' : 'Inicio',
		'ConfSectionImportExport' : 'Importar/Exportar',
		'ConfSectionMenu' : 'Menús/Chat',
		'ConfSectionOther' : 'Otras Opciones',
		'ConfSectionPageTitle' : 'Título de la Página',
		'ConfSectionPictures' : 'Fotos',
		'ConfSectionShortcuts' : 'Atajos de Teclado',
		'ConfSecureLinks' : 'Hacer que los links apunten a paginas HTTPS.',
		'ConfShortcutList' : '<b>Atajos de Teclado</b> (sensible a la diferencia entre minúsculas y mayúsculas):<br /><br /><i>Desde cualquier página:</i><br />&nbsp;<b>A</b> - Álbumes/Fotos<br />&nbsp;<b>B</b> - Activar/Desactivar lista de amigos (Amigos conectados)<br />&nbsp;<b>C</b> - Configuración de HFP<br />&nbsp;<b>D</b> - Cumpleaños<br />&nbsp;<b>E</b> - Eventos<br />&nbsp;<b>F</b> - Amigos<br />&nbsp;<b>H</b> - Página de Inicio<br />&nbsp;<b>I</b> - Bandeja de Entrada<br />&nbsp;<b>K</b> - Añadir Marcador<br />&nbsp;<b>L</b> - Seleccionar vínculo para terminar la sesión (presione Enter después para terminar la sesión)<br />&nbsp;<b>N</b> - Notificaciones<br />&nbsp;<b>P</b> - Perfil<br />&nbsp;<b>R</b> - Peticiones<br />&nbsp;<b>S</b> - Saltar a el campo de búsqueda<br />&nbsp;<b>T</b> - Traducir el texto seleccionado<br />&nbsp;<b>?</b> - Mostrar la información de depuración de HFP<br />&nbsp;<b><escape></b> - Cerrar la ventana emergente creada por HFP<br /><br /><i>Desde la página de inicio (filtros)</i>:<br />&nbsp;<b>a</b> - Páginas<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Grupos<br />&nbsp;<b>l</b> - Vínculos<br />&nbsp;<b>n</b> - Noticias<br />&nbsp;<b>p</b> - fotos<br />&nbsp;<b>s</b> or <b>u</b> - Estatus de las Actualizaciones<br />&nbsp;<b>t</b> - Notas<br />&nbsp;<b>v</b> - Vídeos<br /><br /><i>Desde los perfiles</i>:<br />&nbsp;<b>i</b> - Información<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>w</b> - Muro<br />&nbsp;<b>x</b> - Cajas<br /><br /><i>Desde las páginas con paginación (previo, siguiente, etc)</i><br />&nbsp;<b><left arrow></b> - Previo<br />&nbsp;<b><right arrow></b> - Siguiente<br />&nbsp;<b><shift> + <left arrow></b> - Primera (cuando este disponible)<br />&nbsp;<b><shift> + <right arrow></b> - Ultimo (cuando este disponible)<br /><br /><i>Al ver albumes/fotos:</i><br />&nbsp;<b>a</b> - Ver todas la miniaturas (cuando este disponible)<br />&nbsp;<b>b</b> - Ver fotos grandes<br />&nbsp;<b>c</b> - Ver comentarios<br />&nbsp;<b>k</b> - De vuelta al álbum<br />&nbsp;<b>m</b> - Fotos de (personas) y yo<br /><br /><i>Al ver albumes recientes y fotos subidas/marcadas:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Albumes Recientes<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Fotos de Móviles<br />&nbsp;<b>o</b> - Fotos de mi<br />&nbsp;<b>p</b> - Mis Fotos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Amigos Marcados', 'ConfTopBarHoverOpacity' : 'Al pasar el ratón por encima', 'FacebookFixerConflict' : 'Facebook Fixer ahora se llama HFP.<br /><br />Por el cambio de nombre es necesario desinstalar Facebook Fixer manualmente de su navegador o los dos programas entraran en conflicto.<br /><br />Si no sabe como desinstalar un userscript, <a %s>haga clic aquí para ver instrucciones</a>.',
		'ConfShortcuts' : 'Abilitar los atajos de teclado.',
		'ConfSign' : 'Mostrar los signos zodiacales de las personas en sus perfiles (Si indican fecha de nacimiento).',
		'ConfTopBarFixed' : 'Mantener la barra superior de menu en la pantalla siempre.',
		'ConfTopBarHoverOpacity' : 'Al pasar el ratón por encima',
		'ConfTopBarOpacity' : 'Transparencia de la barra de menu superior',
		'ConfUpdates' : 'Revisar Userscripts.org diarimente por si hay actualizaciones en HFP. O <a href="#" id="fbfUpdateLink" onclick="return false;">revisar Ahora</a>.',
		'CreatingFile' : 'Creando Archivo',
		'DownloadVideo' : 'Descargar el Video',
		'ExportICalendarFile' : 'Exportar el archivo de iCalendar',
		'ExportICalendarFileWarning' : '(Esto puede tardar bastante dependiendo de la cantidad de amigos)',
		'FacebookFixerConflict' : 'Facebook Fixer ahora se llama HFP.<br /><br />Por el cambio de nombre es necesario desinstalar Facebook Fixer manualmente de su navegador o los dos programas entraran en conflicto.<br /><br />Si no sabe como desinstalar un userscript, <a %s>haga clic aquí para ver instrucciones</a>.',
		'fullAlbumLoaded' : 'álbum completamente cargado',
		'Import' : 'Importar',
		'ImportConfirm' : '¿Está seguro que desea importar esta configuración?\nPerderá la configuración actual al hacer esto.',
		'ImportFailure' : 'Ha ocurrido un error al tratar de importar la configuración.',
		'ImportSuccess' : 'Se ha importado la configuración. ¿Desea refrescar la página?',
		'Left' : 'Izquierda',
		'LoadingAllPhotos' : 'Cargando todas las fotos...',
		'loadingFullAlbum' : 'Cargando álbumes completos...',
		'LoadingPic' : 'Cargando Foto...',
		'LoadPhotosWarning' : 'Cargar todas las fotos puede tomar mucho tiempo',
		'Months' : new Array('enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'),
		'ProtocolGoogle' : 'Chatear con %s usando Google Talk',
		'ProtocolMSN' : 'Chatear con %s usando Windows Live',
		'ProtocolSkype' : 'Llamar a  %s usando Skype',
		'ProtocolYahoo' : 'Chatear con %s usando Yahoo Messenger',
		'Refresh' : 'Recargar',
		'ReloadErrorPage' : 'Hacer clic para intentar de nuevo o esperar 5 segundos',
		'Remove' : 'Eliminar',
		'Right' : 'Derecha',
		'ShowBigPictures' : 'Mostrar Imágenes Grandes',
		'Signs' : new Array('Capricornio','Acuario','Piscis','Aries','Tauro','Géminis ','Cancer','Leo','Virgo','Libra','Escorpio','Sagitario'),
		'today' : 'hoy',
		'Translators' : 'Tranductores',
		'UpdateAvailable1' : 'Hay una actualización disponible para HFP',
		'UpdateAvailable2' : '¿Desea actualizar ahora?',
		'UpdateHomepage' : 'Ir a la página de inicio',
		'UpdateInstall' : 'Instalar ahora',
		'UpdateTomorrow' : 'Recordar mañana',
		'yearsOld' : '%s años'
	},

	// French - Contributed by Dedicate to Eclaire (20100329)
	fr : {
		'_language' : 'French',
		'AddToCalendar' : 'Ajouter &agrave; l\'Agenda',
		'AddToGoogleCalendar' : 'Ajouter au Google Agenda',
		'all' : 'tout',
		'All' : 'Tout',
		'AllPhotosLoaded' : 'Toutes les photos sont charg&eacute;es',
		'Automatic' : 'Automatique',
		'Birthday' : 'Anniversaire de %s',
		'BookmarkAdd' : 'Ajout d\'un Marque-Page',
		'BookmarkConfirmRemoval' : 'Etes vous s&ucirc;r de vouloir supprimer le marque-page "%s"?',
		'BookmarkDoesNotExist' : 'Cette page n\'a pas &eacute;t&eacute; marqu&eacute;e.\n\nAllez &agrave; la page que vous souhaitez supprimer et r&eacute;-essayez.',
		'BookmarkExists' : 'Cette page a d&eacute;j&agrave; &eacute;t&eacute; marqu&eacute;e.\n\nAllez &agrave; la page que vous souhaitez marquer et r&eacute;-essayez.',
		'BookmarkNamePrompt' : 'Entrez un nom pour ce marque-page:\n%s',
		'BookmarkRemove' : 'Supprimer le marque-page',
		'Bookmarks' : 'Marque-pages',
		'BrowserUnsupported' : 'Votre navigateur Internet ne supporte pas cette fonction.',
		'CreatingFile' : 'Cr&eacute;ation du fichier',
		'Close' : 'Fermer',
		'ConfigureFacebookFixer' : 'Configurer HFP',
		'ConfigureInstructions' : 'Tout changement est imm&eacute;diatement sauvegard&eacute;, mais il est possible que certains changements ne s\'actualisent pas dans des onglets d&eacute;j&agrave; ouverts.',
		'ConfAge' : 'Affichage de l\'&acirc;ge des personnes sur leur profil (si la date de naissance ins&eacute;r&eacute;e est compl&egrave;te).',
		'ConfAutoBigAlbumPictures' : 'Affichage automatique des photos agrandies &agrave; l\'ouverture d\'un album.',
		'ConfAutoLoadFullAlbum' : 'Chargement automatique des aper&ccedil;us de toutes les images contenues dans l\'album, sur une seule page.',
		'ConfAutoLoadTaggedPhotos' : 'Chargement automatique des aper&ccedil;us de toutes les photos identifi&eacute;es, sur une seule page (l\'onglet Photos des profils).',
		'ConfAutoReadMore' : 'Clic automatique sur les liens "Afficher d\'avantage".',
		'ConfBigAlbumPictures' : 'Ajout d\'un lien dans les albums permettant d\'afficher une version agrandie de toutes les images de la page.',
		'ConfBottomBarHoverOpacity' : 'Au passage de la souris',
		'ConfBottomBarOpacity' : 'Transparence de la barre de menu inf&eacute;rieure',
		'ConfCalendarBirthDate' : 'Ajout de la date d\'anniversaire de la personne dans les d&eacute;tails de l\'&eacute;v&eacute;nement.',
		'ConfCalendarFullName' : 'Utilisation du nom complet de la personne lors de l\'anniversaire de celle-ci (&agrave; la place du pr&eacute;nom uniquement).',
		'ConfChatDifferentiate' : 'Utilisation du gras et de l\'italique pour diff&eacute;rencier les amis connect&eacute;s et d&eacute;connect&eacute;s.',
		'ConfChatHideIdle' : 'Cacher les amis inactifs.',
		'ConfDelayPopupPics' : 'Ajout d\'un court temps d\'attente avant l\'affichage des images en popup.',
		'ConfDelayPopupPicsTimeout' : 'Temps d\'attente avant l\'affichage des images en popup, en millisecondes (par d&eacute;faut=500):',
		'ConfDownloadVideo' : 'Ajout d\'un lien de t&eacute;l&eacute;chargement des vid&eacute;os sur la page des vid&eacute;os. (Il peut s\'av&eacute;rer n&eacute;cessaire d\'installer un <a href="http://fr.wikipedia.org/wiki/Flash_Video#Logiciels_de_lecture_de_ce_format" target="_blank">lecteur de vid&eacute;os Flash</a>)',
		'ConfErrorPageReload' : 'Rechargement automatique de la page apr&egrave;s 5 secondes en cas d\'erreur.',
		'ConfExport' : 'Pour exporter vos param&egrave;tres, copiez le texte suivant et sauvez-le dans un fichier.',
		'ConfExternalPopup' : 'Affichage en taille originale des images externes en popup. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Langue de HFP',
		'ConfFacebookTimestamps' : 'Affichage de la datation Facebook (ex. "Il y a 3 heures").',
		'ConfFBFTimestamps' : 'Ajout de la datation HFP apr&egrave;s la datation Facebook (ex. "11:45").',
		'ConfFBFTimestamps24' : 'Affichage de la datation HFP au format 24 heures.',
		'ConfFriendRequestCountInTitle' : 'Affichage du nombre de demande d\'ajout &agrave; la liste d\'amis dans l\'en-t&ecirc;te de la page.',
		'ConfGoogleApps' : 'Cr&eacute;ation de liens Google Agenda compatibles avec les Google Apps.',
		'ConfGoogleAppsDomain' : 'Nom de domaine',
		'ConfGoogleCalendar' : 'Ajout d\'un lien pour ajouter les anniversaires et les &eacute;v&eacute;nements au <a href="http://fr.wikipedia.org/wiki/Google_Agenda" target="_blank">Google Agenda</a>.',
		'ConfGoogleLanguage' : 'Langue utilis&eacute;e par <a href="http://fr.wikipedia.org/wiki/Google_Traduction" target="_blank">Google Traduction</a>',
		'ConfHideApplicationStories' : 'Cache les publications des applications.',
		'ConfHideEventStories' : 'Cache les publications des &eacute;v&eacute;nements.',
		'ConfHideFanStories' : 'Cache les publications des pages fan.',
		'ConfHideFriendStories' : 'Cache les publications des ajouts &agrave; la liste d\'amis .',
		'ConfHideGroupStories' : 'Cache les publications des groupes.',
		'ConfHideLinkStories' : 'Cache les publications des liens.',
		'ConfHidePhotoStories' : 'Cache les publications des photos.',
		'ConfHideProfilePicStories' : 'Cache les publications des changements de photo de profil.',
		'ConfHideRead' : 'Cache les publications de la page principale qui ont &eacute;t&eacute; marqu&eacute;es comme lues.',
		'ConfHideRelationshipStories' : 'Cache les publications des relations.',
		'ConfHideStatusStories' : 'Cache les publications des status.',
		'ConfHideVideoStories' : 'Cache les publications des vid&eacute;os.',
		'ConfHideWallStories' : 'Cache les publications des messages sur le mur.',
		'ConfHomeChat' : 'Affichage de la section Discussion intantan&eacute;e.',
		'ConfHomeEvents' : 'Affichage de la section Ev&eacute;nements.',
		'ConfHomeFindFriends' : 'Affichage de la section Communiquez avec vos amis.',
		'ConfHomeLeftAlign' : 'Alignement &agrave; gauche du contenu de la page d\'accueil.',
		'ConfHomeLeftColumn' : 'Affichage de la colonne de gauche.',
		'ConfHomeLeftColumnFixed' : 'Maintien l\'affichage de la colonne de gauche &agrave; l\'&eacute;cran, m&ecirc;me apr&egrave;s &ecirc;tre descendu dans la page.',
		'ConfHomeLink' : 'Affichage du lien Accueil dans la barre de menu sup&eacute;rieure.',
		'ConfHomePeopleYouMayKnow' : 'Affichage de la section Suggestions.',
		'ConfHomeNavigation' : 'Affichage de la section Navigation.',
		'ConfHomePokes' : 'Affichage de la section Pokes.',
		'ConfHomeProfile' : 'Affichage de la section Profil.',
		'ConfHomeRequests' : 'Affichage de la section Invitations.',
		'ConfHomeRightColumn' : 'Affichage de la colonne de droite.',
		'ConfHomeStretch' : 'Etirement du contenu de la page d\'accueil jusqu\'&agrave; la largeur compl&egrave;te de la fen&ecirc;tre.',
		'ConfiCalendar' : 'Ajoute un lien de t&eacute;l&eacute;chargement d\'un fichier <a href="http://fr.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> contenant tous les anniversaires.',
		'ConfImport' : 'Pour importer vos param&egrave;tres, remplacez le texte suivant par celui pr&eacute;c&eacute;demment sauvegard&eacute; et cliquez sur "Importer".',
		'ConfInboxCountInTitle' : 'Affichage du nombre de nouveaux messages dans l\'en-t&ecirc;te de la page.',
		'ConfLogoutLink' : 'Ajoute un lien de d&eacute;connection dans la barre de menu sup&eacute;rieure.',
		'ConfNotificationCountInTitle' : 'Affichage du nombre de notifications dans l\'en-t&ecirc;te de la page.',
		'ConfNewTabSearch' : 'Fait appara&icirc;tre les r&eacute;sultats de la recherche dans un nouvel onglet/une nouvelle fen&ecirc;tre lors de l\'utilisation de CTRL + Enter pour valider la recherche.',
		'ConfPageTitle' : 'Suppression du "Facebook |" contenu dans l\'en-t&ecirc;te de chaque page.',
		'ConfPhotoPopup' : 'Affichage de versions plus grandes des photos en popup au passage de la souris.',
		'ConfPopupAutoClose' : 'Fermeture automatique des images en popup.',
		'ConfPopupSmartAutoClose' : 'Emp&ecirc;che la fermeture automatique des images en popup si la souris se trouve dessus.',
		'ConfPopupPosition' : 'Position des images en popup',
		'ConfProcessInterval' : 'Intervalle à laquelle la page sera trait&eacute;e, en millisecondes (par d&eacute;faut=1000):',
		'ConfProfileLink' : 'Affichage du lien Profil dans la barre de menu sup&eacute;rieure.',
		'ConfProfilePicPopup' : 'Affichage de versions plus grandes des photos de profil en popup au passage de la souris',
		'ConfProtocolLinks' : 'Transforme les identifiants de messagerie des profils en liens permettant de commencer une conversation instantan&eacute;e (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'A propos de HFP',
		'ConfSectionAdvanced' : 'Avanc&eacute;',
		'ConfSectionEvents' : 'Anniversaires/Ev&eacute;nements',
		'ConfSectionImportExport' : 'Importer/Exporter',
		'ConfSectionFeeds' : 'Publications sur la page d\'accueil',
		'ConfSectionHomePage' : 'Page d\'accueil',
		'ConfSectionLiveFeed' : 'Fil d\'actualit&eacute;',
		'ConfSectionMenu' : 'Menus/Discussion instantan&eacute;e',
		'ConfSectionOther' : 'Autres options',
		'ConfSectionPageTitle' : 'En-t&ecirc;te de la page',
		'ConfSectionPictures' : 'Photos',
		'ConfSectionShortcuts' : 'Raccourcis clavier',
		'ConfSecureLinks' : 'Force les liens Facebook &agrave; pointer vers des pages HTTPS.',
		'ConfShortcutList' : '<b>Raccourcis clavier</b> (sensible &agrave; la casse):<br /><br /><i>Sur toutes les pages:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Affichage de la liste d\'amis (amis en ligne)<br />&nbsp;<b>C</b> - Configuration de HFP<br />&nbsp;<b>D</b> - Anniversaires<br />&nbsp;<b>E</b> - Ev&eacute;nements<br />&nbsp;<b>F</b> - Amis<br />&nbsp;<b>H</b> - Page d\'accueil<br />&nbsp;<b>I</b> - Bo&icirc;te de r&eacute;ception<br />&nbsp;<b>K</b> - Ajout d\'un marque-page<br />&nbsp;<b>L</b> - S&eacute;lection du lien de d&eacute;connection (appuyez ensuite sur Enter pour vous d&eacute;connecter)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Votre profil<br />&nbsp;<b>R</b> - Invitations<br />&nbsp;<b>S</b> - Saut au champ de recherche<br />&nbsp;<b>T</b> - Traduction du texte s&eacute;lectionn&eacute;<br />&nbsp;<b>?</b> - Affiche les informations de debug de HFP<br />&nbsp;<b>&lt;escape&gt;</b> - Ferme les popups cr&eacute;es par HFP<br /><br /><i>Sur la page d\'accueil (filtres)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Fil d\'actualit&eacute;s r&eacute;centes<br />&nbsp;<b>g</b> - Groupes<br />&nbsp;<b>l</b> - Liens<br />&nbsp;<b>n</b> - Fil d\'actualit&eacute;s &agrave; la une<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Changements de status<br />&nbsp;<b>t</b> - Articles<br />&nbsp;<b>v</b> - Vid&eacute;os<br /><br /><i>Sur les profils</i>:<br />&nbsp;<b>i</b> - Infos<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Mur<br />&nbsp;<b>x</b> - Encarts<br /><br /><i>Sur les pages avec pagination (pr&eacute;c&eacute;dent, suivant, etc)</i><br />&nbsp;<b>&lt;fl&egrave;che gauche&gt;</b> - Pr&eacute;c&eacute;dent<br />&nbsp;<b>&lt;fl&egrave;che droite&gt;</b> - Suivant<br />&nbsp;<b>&lt;shift&gt; + &lt;fl&egrave;che gauche&gt;</b> - Premier (si disponible)<br />&nbsp;<b>&lt;shift&gt; + &lt;fl&egrave;che droite&gt;</b> - Dernier (si disponible)<br /><br /><i>Lors de l\'affichage d\'albums/photos:</i><br />&nbsp;<b>a</b> - Chargement de tous les aper&ccedil;us (si disponible)<br />&nbsp;<b>b</b> - Affichage de plus grandes images<br />&nbsp;<b>c</b> - Affichage des commentaires<br />&nbsp;<b>k</b> - Retour &agrave; l\'album<br />&nbsp;<b>m</b> - Photos de (la personne) et de moi<br /><br /><i>Lors de l\'affichage d\'albums r&eacute;cents et de photos ajout&eacute;es/identifi&eacute;es:</i><br />&nbsp;<b>a</b> ou &nbsp;<b>r</b> - Albums r&eacute;cents<br />&nbsp;<b>m</b> ou &nbsp;<b>u</b> - Ajout depuis un mobile<br />&nbsp;<b>o</b> - Photos de moi<br />&nbsp;<b>p</b> - Mes photos<br />&nbsp;<b>t</b> ou &nbsp;<b>f</b> - Amis identifi&eacute;s',
		'ConfShortcuts' : 'Active les raccourcis clavier.',
		'ConfSign' : 'Affiche le signe zodiacal des personnes sur leur profil (si la date de naissance ins&eacute;r&eacute;e est compl&egrave;te).',
		'ConfTopBarFixed' : 'Maintien la barre de menu sup&eacute;rieure &agrave; l\'&eacute;cran, m&ecirc;me apr&egrave;s &ecirc;tre descendu dans la page.',
		'ConfTopBarHoverOpacity' : 'Au passage de la souris',
		'ConfTopBarOpacity' : 'Transparence de la barre de menu sup&eacute;rieure',
		'ConfUpdates' : 'V&eacute;rifie quotidiennement si une mise &agrave; jour de HFP est disponible sur Userscripts.org. Ou <a href="#" id="fbfUpdateLink" onclick="return false;">v&eacute;rifier maintenant</a>.',
		'DownloadVideo' : 'T&eacute;l&eacute;charger la vid&eacute;o',
		'ExportICalendarFile' : 'Exporter en fichier iCalendar',
		'ExportICalendarFileWarning' : '(Cette op&eacute;ration prendra un moment si vous avez beaucoup d\'amis)',
		'FacebookFixerConflict' : 'HFP est maintenant devenu HFP. A cause du changement de nom, vous aurez besoin de d&eacute;sinstaller manuellement HFP de votre explorateur, ou les deux scripts rentreront en conflit. Si vous n\'&ecirc;tes pas s&ucirc;r de comment faire pour d&eacute;sinstaller un userscript, <a %s>cliquez ici pour la marche &agrave; suivre</a>.',
		'fullAlbumLoaded' : 'l\'album complet est charg&eacute;',
		'Import' : 'Importer',
		'ImportConfirm' : 'Etes-vous s&ucirc;r de vouloir importer ces param&egrave;tres?\nVotre configuration actuelle sera perdue.',
		'ImportFailure' : 'Une erreur est survenue lors de l\'importation de vos param&egrave;tres.',
		'ImportSuccess' : 'Importation r&eacute;ussie. Voulez-vous recharger la page?',
		'Left' : 'Gauche',
		'ListeningRestarted' : 'HFP s\'est remit \340 l\'\351coute des changements \351ventuels.',
		'ListeningStopped' : 'HFP a arret\351 d\'\352tre \340 l\'\351coute des changements \351ventuels.\nAppuyez sur L (SHIFT + l) pour r\351-activer l\'\351coute',
		'LoadingAllPhotos' : 'Chargement de toutes les photos...',
		'loadingFullAlbum' : 'chargement de l\'album complet...',
		'LoadingPic' : 'Chargement de l\'image...',
		'LoadPhotosWarning' : 'Charger toutes les photos peut prendre un moment',
		'Months' : new Array('janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'),
		'ProtocolSkype' : 'Appeler %s via Skype',
		'ProtocolMSN' : 'Discuter avec %s via Windows Live',
		'ProtocolYahoo' : 'Discuter avec %s via Yahoo Messenger',
		'ProtocolGoogle' : 'Discuter avec %s via Google Talk',
		'ReloadErrorPage' : 'Cliquez ici pour essayer &agrave; nouveau, ou attendez 5 secondes',
		'Refresh' : 'Rafra&icirc;chir',
		'Remove' : 'Enlever',
		'Right' : 'Droite',
		'ShowBigPictures' : 'Afficher les images en plus grand',
		'Signs' : new Array('Capricorne','Verseau','Poissons','Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire'),
		'today' : 'aujourd\'hui',
		'Translators' : 'Traducteurs',
		'UpdateAvailable1' : 'Une mise &agrave; jour de HFP est disponible',
		'UpdateAvailable2' : 'Voulez-vous effectuer la mise &agrave; jour ?',
		'UpdateHomepage' : 'Aller &agrave; la page principale',
		'UpdateInstall' : 'Installer maintenant',
		'UpdateTomorrow' : 'Me le rappeler demain',
		'yearsOld' : '%s ans'
	},

	// Italian - Contributed by Dario Archetti and GorGeouS (20101028)
	it : {
		'_language' : 'Italian',
		'AddToCalendar' : 'Aggiungi al calendario',
		'AddToGoogleCalendar' : 'Aggiungi a Google Calendar',
		'all' : 'tutto',
		'All' : 'Tutto',
		'AllPhotosLoaded' : 'Tutte le foto sono state caricate.',
		'Automatic' : 'Automatico',
		'Birthday' : 'Il compleanno di %s',
		'BookmarkAdd' : 'Aggiungi un nuovo segnalibro',
		'BookmarkExists' : 'Questa pagina è già tra i segnalibri.\n\nVai alla pagina che vuoi aggiungere e riprova.',
		'BookmarkNamePrompt' : 'Inserisci un nome per questo segnalibro:\n%s',
		'BookmarksConfirmRemoval' : 'Sei sicuro di voler rimuovere i segnalibri seguenti?',
		'BookmarksManage' : 'Manage Bookmarks',
		'BookmarksRemoveSelected' : 'Rimuovi Segnalibri Selezionati',
		'Bookmarks' : 'Segnalibri',
		'BrowserUnsupported' : 'Il tuo browser mom supporta questa funzionalita\'.',
		'CreatingFile' : 'Sto creando il file',
		'Close' : 'Chiudi',
		'ConfigureFacebookFixer' : 'Impostazioni di HFP',
		'ConfigureInstructions' : 'I cambiamenti vengono salvati immediatamente, ma alcuni possono non avere effetto nelle schede già aperte.',
		'ConfAge' : 'Mostra l\'età nel profilo dei tuoi amici (se hanno inserito la data di nascita).',
		'ConfApplicationWhitelist' : 'Whitelist Applicazioni - Inserisci gli ID delle applicazioni che non vuoi che vengano nascoste. Separa gli ID con uno spazio.',
		'ConfAutoBigAlbumPictures' : 'Negli album mostra automaticamente immagini più grandi quando la pagina si apre.',
		'ConfAutoLoadFullAlbum' : 'Carica automaticamente le anteprime di tutte le immagini in un album o in una pagina.',
		'ConfAutoLoadTaggedPhotos' : 'Carica automaticamente le anteprime di tutte le foto taggate in una pagina (nella sezione "Foto" dei profili).',
		'ConfAutoReadMore' : 'Clicca automaticamente sui link "Mostra tutto".',
		'ConfBigAlbumPictures' : 'Aggiungi un link negli album per mostrare una versione più grande di ogni foto nella pagina.',
		'ConfBigAlbumPicturesBorder' : 'Aggiungi un bordo intorno alle foto quando vengono visualizzate in formato grande.',
		'ConfBottomBarHoverOpacity' : 'Al passaggio del mouse',
		'ConfBottomBarOpacity' : 'Trasparenza della barra inferiore',
		'ConfCalendarBirthDate' : 'Includi il compleanno di una persona nei dettagli dell\'evento.',
		'ConfCalendarFullName' : 'Usa il nome completo di una persona come titolo per i compleanni. (invece che soltanto il nome).',
		'ConfChatDifferentiate' : 'Usa il grassetto e l\'italico per differenziare contatti disponibili e inattivi.',
		'ConfChatHideIdle' : 'Nascondi i contatti inattivi.',
		'ConfDelayPopupPics' : 'Mostra i popup con un piccolo ritardo.',
		'ConfDelayPopupPicsTimeout' : 'Ritardo prima di mostrare i popup (default=500):',
		'ConfDownloadVideo' : 'Aggiungi un link per scaricare i video. (Per riprodurli avrai bisogno di un <a href="http://it.wikipedia.org/wiki/Flash_Video" target="_blank">programma esterno</a>)',
		'ConfErrorPageReload' : 'Dopo 5 secondi ricarica automaticamente la pagina di errore di un\'applicazione.',
		'ConfExport' : 'Per esportare le tue impostazioni, copia il testo sotto e salvalo in un file.',
		'ConfExternalPopup' : 'Mostra in un popup, al passaggio del mouse, una versione più grande delle immagini esterne. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Lingua di HFP',
		'ConfFacebookTimestamps' : 'Mostra l\'orario dei post usando il metodo classico (es. "3 ore fa").',
		'ConfFBFTimestamps' : 'Mostra l\'orario dei post usando l\'ora esatta (es. "11:45").',
		'ConfFBFTimestamps24' : 'Mostra l\'ora dei post nel formato 24 ore.',
		'ConfFriendRequestCountInTitle' : 'Mostra il numero di richieste di amicizia nella barra del titolo.',
		'ConfGoogleApps' : 'Crea un link a Google Calendar compatibile con Google Apps.',
		'ConfGoogleAppsDomain' : 'Dominio',
		'ConfGoogleCalendar' : 'Aggiungi link per inserire compleanni ed eventi a <a href="http://it.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Lingua per <a href="http://it.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Nascondi i post delle applicazioni.',
		'ConfHideEgos' : 'Nascondi tutte le sezioni "personali" (potrebbe nascondere la maggior parte delle raccomandazioni di Facebook).',
		'ConfHideEventStories' : 'Nascondi i post degli eventi.',
		'ConfHideFacebookCountInTitle' : 'Nascondi la visualizzazione del numero di nuovi messaggi da leggere.',
		'ConfHideFriendStories' : 'Nascondi le notizie "ha stretto amicizia con...".',
		'ConfHideGroupStories' : 'Nascondi le notizie "si è iscritto al gruppo...".',
		'ConfHideHovercards' : 'Nascondi hovercard (il popup che appare quando si passa con il mouse sopra il nome di una persona).',
		'ConfHideLikeStories' : 'Nascondi i post riguardanti i "Mi piace".',
		'ConfHideLinkStories' : 'Nascondi i post riguardanti link.',
		'ConfHideNoteStories' : 'Nascondi i post riguardanti le note.',
		'ConfHidePhotoStories' : 'Nascondi i post riguardanti foto.',
		'ConfHidePlaceStories' : 'Nascondi i post riguardanti i luoghi.',
		'ConfHideProfilePicStories' : 'Nascondi i post riguardanti foto del profilo.',
		'ConfHideRead' : 'Nascondi gli elementi del live feed che sono stati segnati come già letti.',
		'ConfHideRelationshipStories' : 'Nascondi le notizie riguardanti relazioni.',
		'ConfHideStatusStories' : 'Nascondi gli aggiornamenti di stato.',
		'ConfHideVideoStories' : 'Nascondi i post di video.',
		'ConfHideWallStories' : 'Nascondi le attività delle bacheche.',
		'ConfHomeBeta' : 'Mostra la sezione Sneak Peek di Facebook.',
		'ConfHomeChat' : 'Mostra gli amici online.',
		'ConfHomeChatNames' : 'Mostra i nomi nella sezione della chat.',
		'ConfHomeEvents' : 'Mostra la sezione "Eventi".',
		'ConfHomeFindFriends' : 'Mostra la sezione "Connettiti con i tuoi amici".',
		'ConfHomeLeftAlign' : 'Allinea a sinistra il contenuto della homepage.',
		'ConfHomeLeftColumn' : 'Mostra la colonna di sinistra.',
		'ConfHomeLeftColumnFixed' : 'Mantieni visibile la colonna di sinistra anche dopo lo scroll.',
		'ConfHomeLink' : 'Mostra il link "Home" nella barra superiore.',
		'ConfHomeNavigation' : 'Mostra i filtri.',
		'ConfHomePokes' : 'Mostra la sezione "Poke".',
		'ConfHomeProfile' : 'Mostra la propria immagine del profilo.',
		'ConfHomeRecommendations' : 'Mostra racommandazioni (Persone che potresti conoscere, Pagine raccomandate, ecc).',
		'ConfHomeRequests' : 'Mostra la sezione "Richieste".',
		'ConfHomeRightColumn' : 'Mostra la colonna di destra.',
		'ConfHomeStretch' : 'Allarga la homepage affinché si adatti alla larghezza della finestra del browser.',
		'ConfHomeStretchComments' : 'Allarga la zona dei commenti sulla homepage.',
		'ConfiCalendar' : 'Aggiungi link per scaricare un file di <a href="http://it.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> con tutti i compleanni.',
		'ConfImport' : 'Successivamente, per importare le tue impostazioni, sovrascrivi il testo sottostante con quello che hai salvato precedentemente e clicca "Importa".',
		'ConfInboxCountInTitle' : 'Mostra il numero di nuovi messaggi nel titolo della pagina.',
		'ConfLogoutLink' : 'Aggiungi un link per il logout alla barra superiore',
		'ConfNotificationCountInTitle' : 'Mostra il numero di notifiche nella barra del titolo.',
		'ConfNewTabSearch' : 'Fai in modo che i risultati delle ricerche si aprano in una nuova scheda quando si preme CTRL + Invio per cercare.',
		'ConfPageTitle' : 'Rimuovi "Facebook |" dal titolo di ciascuna pagina.',
		'ConfPhotoPopup' : 'Mostra in un popup, al passaggio del mouse, una versione più grande delle foto.',
		'ConfPopupAutoClose' : 'Chiudi i popup automaticamente.',
		'ConfPopupSmartAutoClose' : 'Non far chiudere i popup se il mouse è sopra di essi.',
		'ConfPopupPosition' : 'Posizione del popup',
		'ConfPopupWhileTagging' : 'Mostra i popup delle immagini anche sui tag.',
		'ConfProcessInterval' : 'Intervallo dopo il qualeprocessare la pagina, in millisecondi (default=1000):',
		'ConfProfileLink' : 'Mostra il link "Profilo" nella barra superiore.',
		'ConfProfilePicPopup' : 'Mostra in un popup, al passaggio del mouse, una versione più grande delle immagini dei profili.',
		'ConfProtocolLinks' : 'Converti gli ID di messaggistica nei profili in link che iniziano una conversazione. (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Riguardo di HFP',
		'ConfSectionAdvanced' : 'Avanzate',
		'ConfSectionEvents' : 'Compleanni/Eventi',
		'ConfSectionImportExport' : 'Importa/Esporta',
		'ConfSectionFeeds' : 'Notizie',
		'ConfSectionHomePage' : 'Home Page',
		'ConfSectionLiveFeed' : 'Aggiornamenti in tempo reale',
		'ConfSectionMenu' : 'Menu/Chat',
		'ConfSectionOther' : 'Altre opzioni',
		'ConfSectionPageTitle' : 'Titolo della pagina',
		'ConfSectionPictures' : 'Foto',
		'ConfSectionShortcuts' : 'Scorciatoie da tastiera',
		'ConfSecureLinks' : 'Forza i link di Facebook ad aprire pagine HTTPS.',
		'ConfShortcutList' : '<b>Scorciatoie da tasiera</b> (prestare attenzione a maiuscole/minuscole):<br /><br /><i>In ogni pagina</i><br /> <b>A</b> - Album/foto<br /> <b>B</b> - Apri la lista degli amici online<br /> <b>C</b> - Impostazioni di HFP<br /> <b>D</b> - Compleanni<br /> <b>E</b> - Eventi<br /> <b>F</b> - Amici<br /> <b>H</b> - Home page<br /> <b>I</b> - Posta in arrivo<br /> <b>K</b> - Aggiungi segnalibro<br /> <b>L</b> - Seleziona il link per effettuare il logout (poi premi Invio per effettuare il logout)<br /> <b>N</b> - Notifiche<br /> <b>P</b> - Il tuo profilo<br /> <b>R</b> - Richieste<br /> <b>S</b> - Seleziona il campo di ricerca<br /> <b>T</b> - Traduci il testo selezionato<br /> <b>?</b> - Mostra le informazioni di debug di HFP<br /> <b><escape></b> - Chiudi i pop-up creati da HFP<br /><br /><i>Dalla home page (filtri)</i>:<br /> <b>a</b> - Pagine<br /> <b>f</b> - Notizie in tempo reale<br /> <b>g</b> - Gruppi<br /> <b>l</b> - Link<br /> <b>n</b> - Notizie<br /> <b>p</b> - Foto<br /> <b>s</b> o <b>u</b> - Aggiornamenti di stato<br /> <b>t</b> - Note<br /> <b>v</b> - Video<br /><br /><i>Dai profili</i>:<br /> <b>i</b> - Info<br /> <b>p</b> - Foto<br /> <b>w</b> - Bacheca<br /> <b>x</b> - Riquadri<br /><br /><i>Dalle pagine con paginazione (precedente, successivo, etc)</i><br /> <b><freccia sinistra></b> - Precedente<br /> <b><freccia destra></b> - Successivo<br /> <b><shift> + <freccia sinistra></b> - Primo (Quando disponibile)<br /> <b><shift> + <freccia destra></b> - Ultimo (Quando disponibile)<br /><br /><i>Mentre si guardano album/foto:</i><br /> <b>a</b> - Carica tutte le anteprime (quando disponibile)<br /> <b>b</b> - Mostra immagini grandi<br /> <b>c</b> - Mostra i commenti<br /> <b>k</b> - Torna all\' album<br /> <b>m</b> - Foto con me<br /><br /><i>Mentre si guardano album recenti e foto appena caricate/taggate:</i><br /> <b>a</b> o  <b>r</b> - Album recenti<br /> <b>m</b> o  <b>u</b> - Upload via mobile<br /> <b>o</b> - Foto con me<br /> <b>p</b> - Le mie foto<br /> <b>t</b> o  <b>f</b> - Amici taggati',
		'ConfShortcuts' : 'Attiva le scorciatoie da tastiera.',
		'ConfSign' : 'Mostra il segno zodiacale nel profilo dei tuoi amici (se hanno inserito la data di nascita).',
		'ConfTopBarFixed' : 'Mantieni fissa la posizione della barra superiore.',
		'ConfTopBarHoverOpacity' : 'Al passaggio del mouse',
		'ConfTopBarOpacity' : 'Trasparenza della barra superiore',
		'ConfUpdates' : 'Controlla ogni giorno Userscripts.org per eventuali update, oppure <a href="#" id="fbfUpdateLink" onclick="return false;">controlla adesso!</a>.',
		'DownloadVideo' : 'Scarica il video.',
		'ExportICalendarFile' : 'Esporta file di iCalendar.',
		'ExportICalendarFileWarning' : '(Questo impiegherà un po\' se hai molti amici!)',
		'FacebookFixerConflict' : 'HFP ha cambiato nome in HFP. A causa del cambiamento dovrai disinstallare manualmente HFP dal tuo browser, o i due script andranno in conflitto. Se non sei sicuro di come disinstallare un userscript <a %s>clicca qui per le istruzioni</a>.',
		'fullAlbumLoaded' : 'l\'album completo è stato caricato.',
		'Import' : 'Importa',
		'ImportConfirm' : 'Sei sicuro di voler importare queste impostazioni?\nLe tue impostazioni attuali saranno sovrascritte.',
		'ImportFailure' : 'Un errore è accaduto durante l\'importazione delle impostazioni.',
		'ImportSuccess' : 'Importazione completata. Vuoi ricaricare la pagina?',
		'Left' : 'Sinistra',
		'LoadingAllPhotos' : 'Sto caricando tutte le foto...',
		'loadingFullAlbum' : 'Sto caricando l\'album completo...',
		'LoadingPic' : 'Sto caricando l\'immagine...',
		'LoadPhotosWarning' : 'Il caricamento di tutte le immagini può richiedere qualche minuto.',
		'Months' : new Array('Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'),
		'ProtocolSkype' : 'Chiama %s usando Skype',
		'ProtocolMSN' : 'Chatta con %s usando Windows Live',
		'ProtocolYahoo' : 'Chatta con %s usando Yahoo Messenger',
		'ProtocolGoogle' : 'Chatta con %s usando Google Talk.',
		'ReloadErrorPage' : 'Clicca per riprovare, oppure aspetta 5 secondi.',
		'Refresh' : 'Ricarica',
		'Remove' : 'Rimuovi',
		'Right' : 'Destra',
		'ShowBigPictures' : 'Mostra immagini a grandi dimensioni.',
		'Signs' : new Array('Capricorno','Aquario','Pesci','Ariete','Toro','Gemelli','Cancro','Leone','Vergine','Bilancia','Scorpione','Sagittario'),
		'today' : 'oggi',
		'Translators' : 'Traduttori',
		'UpdateAvailable1' : 'È disponibile un update per HFP.',
		'UpdateAvailable2' : 'Vuoi scaricare l\'aggiornamento adesso?',
		'UpdateHomepage' : 'Visita la Homepage',
		'UpdateInstall' : 'Installa ora.',
		'UpdateTomorrow' : 'Ricordamelo domani.',
		'yearsOld' : '%s anni.'
	},

	// German - Contributed by Constantin Groß (20090830)
	de : {
		'_language' : 'German',
		'AddToCalendar' : 'Zu Kalender hinzugügen',
		'AddToGoogleCalendar' : 'Zu Google Kalender hinzufügen',
		'all' : 'alle',
		'All' : 'Alle',
		'AllPhotosLoaded' : 'Alle Fotos geladen',
		'Automatic' : 'Automatisch',
		'Birthday' : '%ss Geburtstag',
		'CreatingFile' : 'Erstelle Datei',
		'Close' : 'Schließen',
		'ConfigureFacebookFixer' : 'HFP konfigurieren',
		'ConfigureInstructions' : 'Alle Änderungen werden sofort gespeichert, aber einige Änderungen können in bereits offenen Tabs nicht angewendet werden.',
		'ConfAge' : 'Alter von Personen im Profil anzeigen (wenn das volle Geburtsdatum angegeben wurde).',
		'ConfAutoBigAlbumPictures' : 'Automatisch größere Albenbilder beim öffnen der Seite anzeigen.',
		'ConfAutoLoadFullAlbum' : 'Vorschaubilder für alle Bilder eines Albums automatisch laden.',
		'ConfAutoLoadTaggedPhotos' : 'Vorschaubilder für alle getaggten Bilder automatisch laden (Fotos-Tab auf der Profilseite).',
		'ConfBigAlbumPictures' : 'Link auf Albumseiten hinzüfügen, über den größere Versionen aller Bilder angezeigt werden können.',
		'ConfBottomBarHoverOpacity' : 'Bei Mouse-Over',
		'ConfBottomBarOpacity' : 'Transparenz der unteren Menüleiste',
		'ConfCalendarBirthDate' : 'Geburtstage in Event-Details anzeigen.',
		'ConfCalendarFullName' : 'Vollständigen Namen bei Geburtstagen anzeigen (statt nur den Vornamen).',
		'ConfChatDifferentiate' : 'Fett- und Kursiv-Formatierung zur Unterscheidung zwischen online- und offline-Freunden verwenden.',
		'ConfChatHideIdle' : 'Freunde, die offline sind verstecken.',
		'ConfDelayPopupPics' : '0,5 Sekunden warten, bevor die Popup-Bilder gezeigt werden.',
		'ConfDownloadVideo' : 'Link zum Herunterladen von Videos hinzufügen. (Es wird evtl. ein <a href="http://de.wikipedia.org/wiki/Flash_Video#Abspielen_im_Videoplayer" target="_blank">FLV-Player</a> benötigt)',
		'ConfErrorPageReload' : 'Fehlerseiten von Applikationen automatisch nach 5 Sekunden neu laden.',
		'ConfExternalPopup' : 'Externe Bilder in Originalgröße im Popup anzeigen. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Sprache für HFP',
		'ConfGoogleApps' : 'Google Kalender Links kompatibel zu Google Apps erstellen.',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Links hinzufügen, um Geburtstage und Veranstaltungen zu <a href="http://de.wikipedia.org/wiki/Google_Kalender" target="_blank">Google Kalender</a> hinzuzufügen.',
		'ConfGoogleLanguage' : 'Sprache für <a href="http://translate.google.de/#" target="_blank">Google Übersetzer</a>',
		'ConfHomeFindFriends' : '"Mit Freunden in Verbindung treten" anzeigen.',
		'ConfHomeLeftAlign' : 'Startseiteninhalte linksorientiert ausrichten.',
		'ConfHomePeopleYouMayKnow' : '"Vorschläge" anzeigen.',
		'ConfHomePokes' : '"Anstupser" anzeigen.',
		'ConfHomeRightColumn' : 'Rechte Spalte anzeigen.',
		'ConfiCalendar' : 'Link zum herunterladen einer <a href="http://de.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>-Datei mit allen Geburtstagen hinzufügen.',
		'ConfShortcutList' : '<b>Tastenkürzel</b> (Groß-/Kleinschreibung beachten!):<br /><br /><i>Auf jeder Seite:</i><br />&nbsp;<b>A</b> - Alben/Fotos<br />&nbsp;<b>B</b> - Chatliste ein-/ausblenden<br />&nbsp;<b>C</b> - HFP Einstellungen<br />&nbsp;<b>F</b> - Freunde<br />&nbsp;<b>H</b> - Startseite<br />&nbsp;<b>I</b> - Postfach<br />&nbsp;<b>L</b> - Reagieren von HFP auf Seitenänderung ein-/ausschalten<br />&nbsp;<b>N</b> - Benachrichtigungen<br />&nbsp;<b>P</b> - Mein Profil<br />&nbsp;<b>T</b> - Markierten Text übersetzen<br />&nbsp;<b>&lt;escape&gt;</b> - Von HFP erstellte Popups schließen<br /><br /><i>Auf der Startseite</i>:<br />&nbsp;<b>f</b> oder <b>l</b> - Live-Feed<br />&nbsp;<b>i</b> - Posted items<br />&nbsp;<b>n</b> - News-Feed<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>s</b> oder <b>u</b> - Status-Updates<br /><br /><i>Auf Profilseiten</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Fotos<br />&nbsp;<b>w</b> - Pinnwand<br />&nbsp;<b>x</b> - Felder<br /><br /><i>Auf Seiten mit Seitenzahlen (zurück, vor, etc)</i><br />&nbsp;<b>&lt;Pfeil-nach-Links&gt;</b> - Zurück<br />&nbsp;<b>&lt;Pfeil-nach-Rechts&gt;</b> - Vor<br />&nbsp;<b>&lt;Shift&gt; + &lt;Pfeil-nach-Links&gt;</b> - Erste (wenn verfügbar)<br />&nbsp;<b>&lt;Shift&gt; + &lt;Pfeil-nach-Rechts&gt;</b> - Letzte (wenn verfügbar)<br /><br /><i>Bei der Anzeige von Alben & Fotos:</i><br />&nbsp;<b>a</b> - Alle Vorschaubilder laden (wenn verfügbar)<br />&nbsp;<b>b</b> - Große Bilder anzeigen<br />&nbsp;<b>c</b> - Kommentare anzeigen<br />&nbsp;<b>k</b> - Zurück zum Album<br />&nbsp;<b>m</b> - Fotos der Person und mir<br /><br /><i>Bei neuen Alben und getaggten/hochgeladenen Fotos:</i><br />&nbsp;<b>a</b> oder &nbsp;<b>r</b> - Neue Alben<br />&nbsp;<b>m</b> oder &nbsp;<b>u</b> - Mobile Uploads<br />&nbsp;<b>o</b> - Fotos von mir<br />&nbsp;<b>p</b> - Meine Fotos<br />&nbsp;<b>t</b> oder &nbsp;<b>f</b> - Getaggte Freunde',
		'ConfNewTabSearch' : 'Suchergebnisse in einem neuen Tab/Fenster öffnen, wenn für die Suche STRG + Enter gedrückt wurde.',
		'ConfPageTitle' : '"Facebook |" überall aus dem Seitentitel entfernen.',
		'ConfPhotoPopup' : 'Größere Versionen von Fotos im Popup anzeigen, wenn sie mit der Maus berührt werden.',
		'ConfPopupAutoClose' : 'Bilder-Popup automatisch schließen.',
		'ConfPopupPosition' : 'Position des Bilder-Popups',
		'ConfProfilePicPopup' : 'Größere Profilbilder im Popup anzeigen, wenn sie mit der Maus berührt werden',
		'ConfProtocolLinks' : 'Messenger-IDs der Profile in Links umwandeln, über die eine Kommunikation gestartet werden kann (Google Talk, Windows Live etc).',
		'ConfSecureLinks' : 'HTTPS-Verbindung für alle Facebook-Links verwenden.',
		'ConfShortcuts' : 'Tastenkürzel aktivieren. (<a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">Liste ansehen</a>)',
		'ConfSign' : 'Sternzeichen im Profil anzeigen (wenn das volle Geburtsdatum angegeben wurde).',
		'ConfTopBarFixed' : 'Obere Menüleiste auch beim Scrollen anzeigen.',
		'ConfTopBarHoverOpacity' : 'Bei Mouse-Over',
		'ConfTopBarOpacity' : 'Transparenz der oberen Menüleiste',
		'ConfUpdates' : 'UÜberprüfen Sie Userscripts.org täglich auf Updates für HFP. <a href="#" id="fbfUpdateLink" onclick="return false;">Jetzt überprüfen</a>.',
		'DownloadVideo' : 'Video herunterladen',
		'ExportICalendarFile' : 'iCalendar-Export',
		'ExportICalendarFileWarning' : '(kann bei einer großen Zahl an Freunden eine Weile dauern)',
		'fullAlbumLoaded' : 'Album vollständig geladen',
		'Left' : 'Links',
		'ListeningRestarted' : 'HFP reagiert wieder auf Änderungen.',
		'ListeningStopped' : 'HFP reagiert nicht auf Änderungen.\nL (SHIFT + l) drücken, um die Reaktion wieder zu aktvieren.',
		'LoadingAllPhotos' : 'Lade alle Fotos...',
		'loadingFullAlbum' : 'Lade komplettes Album...',
		'LoadingPic' : 'Lade Bild...',
		'LoadPhotosWarning' : 'Das Laden aller Bilder kann längere Zeit dauern',
		'Months' : new Array('Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'),
		'ProtocolSkype' : '%s per Skype anrufen',
		'ProtocolMSN' : 'Mit %s per Windows Live chatten',
		'ProtocolYahoo' : 'Mit %s per Yahoo Messenger chatten',
		'ProtocolGoogle' : 'Mit %s per Google Talk chatten',
		'ReloadErrorPage' : 'Klicken, um es erneut zu versuchen, oder 5 Sekunden warten',
		'Remove' : 'Entfernen',
		'Right' : 'Rechts',
		'ShowBigPictures' : 'Große Bilder anzeigen',
		'Signs' : new Array('Steinbock','Wassermann','Fische','Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze'),
		'today' : 'heute',
		'UpdateAvailable1' : 'Es gibt ein Update für HFP',
		'UpdateAvailable2' : 'Update jetzt herunterladen?',
		'UpdateHomepage' : 'Zur Webseite',
		'UpdateInstall' : 'Jetzt installieren',
		'UpdateTomorrow' : 'Morgen erinnern',
		'yearsOld' : '%s Jahre alt'
	},

	// Bulgarian - Contributed by Svetlozar Mladenoff (20090830)
	bg : {
		'_language' : 'Bulgarian',
		'AddToCalendar' : 'Добавяне към Календар',
		'AddToGoogleCalendar' : 'Добавяне към Google Calendar',
		'all' : 'всички',
		'All' : 'Всички',
		'AllPhotosLoaded' : 'Всички снимки са заредени',
		'Automatic' : 'Автоматично',
		'Birthday' : 'Рождения ден на %s',
		'CreatingFile' : 'Създаване на файл',
		'Close' : 'Затваряне',
		'ConfigureFacebookFixer' : 'Конфигуриране на HFP',
		'ConfigureInstructions' : 'Всички промени се запаметяват веднага, но някои може да не придобият ефект при вече отворени табове.',
		'ConfAge' : 'Показване на възрастта (ако потребителите са представили пълна рождена дата).',
		'ConfAutoBigAlbumPictures' : 'Автоматично показване на по-големи снимки от албумите, когато страницата се зареди.',
		'ConfAutoLoadFullAlbum' : 'Автоматично зареждане на превюта за всички картини в албум, събиращи се на една страница.',
		'ConfAutoLoadTaggedPhotos' : 'Автоматично зареждане на превюта на всички тагнати снимки, събиращи се на една страница (табът Снимки на профила).',
		'ConfBigAlbumPictures' : 'Добавяне на връзка на страницата с албуми за показване на увеличени версии на всички снимки, съществуващи на тази страница.',
		'ConfBottomBarHoverOpacity' : 'При курсор отгоре',
		'ConfBottomBarOpacity' : 'Прозрачност на долното меню',
		'ConfCalendarBirthDate' : 'Включване на рождената дата на потребителя в детайлите на събитието.',
		'ConfCalendarFullName' : 'Използване на трите имена на човека като заглавие за рождените дни (в замяна на само първото име).',
		'ConfChatDifferentiate' : 'Използване на удебелен и наклонен шрифт за различаване на приятели на линия и офлайн.',
		'ConfChatHideIdle' : 'Скриване на офлайн-приятелите.',
		'ConfDelayPopupPics' : 'Изчакване от половин секунда преди показване на превю на снимка.',
		'ConfDownloadVideo' : 'Добавяне на връзка за теглене от видео страниците. (Може да ви трябва <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV плейър</a>)',
		'ConfErrorPageReload' : 'Автоматично презареждане на страниците с грешки от приложения след 5 секунди.',
		'ConfExternalPopup' : 'Пълен размер на външните картинки при превю. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Език за HFP',
		'ConfGoogleApps' : 'Създаване на Google Calendar връзки, съвместими с Google Apps.',
		'ConfGoogleAppsDomain' : 'Домейн',
		'ConfGoogleCalendar' : 'Добавяне на връзки за прибавяне на рождени дни и събития в <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Език за <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHomeFindFriends' : 'Показване на Свържете се с приятели секцията.',
		'ConfHomeLeftAlign' : 'Ляво подравняване на съдържанието на главната страница.',
		'ConfHomePeopleYouMayKnow' : 'Показване на секция Предложения.',
		'ConfHomePokes' : 'Показване на секцията за Сръчквания.',
		'ConfHomeRightColumn' : 'Показване на дясната колона.',
		'ConfiCalendar' : 'Добавяне на връзки за изтегляне на <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>-файл с всички рождени дни.',
		'ConfShortcutList' : '<b>Бързи бутони</b> (големи/малки чувствителни):<br /><br /><i>От коя да е страница:</i><br />&nbsp;<b>A</b> - Албуми/снимки<br />&nbsp;<b>B</b> - Превключване на списък Приятели на линия<br />&nbsp;<b>C</b> - Конфигуруране на HFP<br />&nbsp;<b>F</b> - Приятели<br />&nbsp;<b>H</b> - Главна страница<br />&nbsp;<b>I</b> - Входяща кутия<br />&nbsp;<b>L</b> - Разрешаване/Забраняване на HFP да проверява за промени по страниците<br />&nbsp;<b>N</b> - Известия<br />&nbsp;<b>P</b> - Профил<br />&nbsp;<b>T</b> - Превод на маркирания текст<br />&nbsp;<b>&lt;escape&gt;</b> - Затваряне на изскачащи прозорци, отворени от HFP<br /><br /><i>На заглавната страница</i>:<br />&nbsp;<b>f</b> or <b>l</b> - Новини на живо<br />&nbsp;<b>i</b> - Публикации<br />&nbsp;<b>n</b> - Новини<br />&nbsp;<b>p</b> - Снимки<br />&nbsp;<b>s</b> или <b>u</b> - Промени в статуса<br /><br /><i>На профилите</i>:<br />&nbsp;<b>i</b> - Инфо<br />&nbsp;<b>p</b> - Снимки<br />&nbsp;<b>w</b> - Стена<br />&nbsp;<b>x</b> - Кутии<br /><br /><i>На страници с навигация (предишна, следваща и т.н.)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Предишна<br />&nbsp;<b>&lt;right arrow&gt;</b> - Следваща<br />&nbsp;<b>&lt;Shift&gt; + &lt;left arrow&gt;</b> - Първа (когато е възможно)<br />&nbsp;<b>&lt;Shift&gt; + &lt;right arrow&gt;</b> - Последна (когато е възможно)<br /><br /><i>При разглеждане на албуми/снимки:</i><br />&nbsp;<b>a</b> - Зареждане на всички превюта (когато е възможно)<br />&nbsp;<b>b</b> - Показване на големи снимки<br />&nbsp;<b>c</b> - Преглед на коментарите<br />&nbsp;<b>k</b> - Назад към албума<br />&nbsp;<b>m</b> - Снимки на (някой) и мен<br /><br /><i>При разглеждане на скорошни албуми и качени/тагнати снимки:</i><br />&nbsp;<b>a</b> или &nbsp;<b>r</b> - Скорошни албуми<br />&nbsp;<b>m</b> или &nbsp;<b>u</b> - Качвания от мобилно устройство<br />&nbsp;<b>o</b> - Снимки с мен<br />&nbsp;<b>p</b> - Мои снимки<br />&nbsp;<b>t</b> или &nbsp;<b>f</b> - Тагнати приятели',
		'ConfNewTabSearch' : 'Резултатите от търсения да се отварят в нов таб/прозорец, когато е натиснат Ctrl + Enter при търсене.',
		'ConfPageTitle' : 'Премахване на "Facebook |" от заглавието на всяка страница.',
		'ConfPhotoPopup' : 'Показване на по-големи превюта на снимките при курсор отгоре.',
		'ConfPopupAutoClose' : 'Автоматично затваряне на изскачащите картинки.',
		'ConfPopupPosition' : 'Позиция на изскачащите картинки',
		'ConfProfilePicPopup' : 'Показване на по-големи превюта на профилните снимки при курсор отгоре',
		'ConfProtocolLinks' : 'Превръщане на ID-тата по профилите във връзки, който започват разговор (Google Talk, Windows Live и т.н.).',
		'ConfSecureLinks' : 'Принуждаване на Facebook връзките да водят до HTTPS страници.',
		'ConfShortcuts' : 'Разрешаване на Бързи бутони. (Вижте <a href="#" id="fbfKeyboardShortcutsLink" onclick="return false;">списъка</a>)',
		'ConfSign' : 'Показване зодията по профилите (ако е въведена рождена дата).',
		'ConfTopBarFixed' : 'Запазване на горното меню на екрана, дори при скролиране.',
		'ConfTopBarHoverOpacity' : 'При курсор отгоре',
		'ConfTopBarOpacity' : 'Прозрачност на горното меню',
		'ConfUpdates' : 'Проверяване на Userscripts.org ежедневно за ъпдейти на HFP. Или <a href="#" id="fbfUpdateLink" onclick="return false;">проверка сега</a>.',
		'DownloadVideo' : 'Смъкване на видеото',
		'ExportICalendarFile' : 'Експортиране в iCalendar-файл',
		'ExportICalendarFileWarning' : '(Това ще отнеме време, ако имате много приятели)',
		'fullAlbumLoaded' : 'целият албум е зареден',
		'Left' : 'Отляво',
		'ListeningRestarted' : 'HFP възстанови проверките за промени.',
		'ListeningStopped' : 'HFP спря проверките за промени.\nНатиснете L (Shift + l) за повторно пускане',
		'LoadingAllPhotos' : 'Зареждане на всички снимки...',
		'loadingFullAlbum' : 'зареждане на целия албум...',
		'LoadingPic' : 'Зареждане на снимката...',
		'LoadPhotosWarning' : 'Зареждането на всички снимки може да отнеме много време',
		'Months' : new Array('Януари','Февруари','Март','Април','Май','Юни','Юли','Август','Септември','Октомври','Ноември','Декември'),
		'ProtocolSkype' : 'Обаждане на %s по Skype',
		'ProtocolMSN' : 'Чат с %s чрез Windows Live',
		'ProtocolYahoo' : 'Чат с %s чрез Yahoo Messenger',
		'ProtocolGoogle' : 'Чат с %s чрез Google Talk',
		'ReloadErrorPage' : 'Кликнете за повторен опит или изчакайте 5 секунди',
		'Remove' : 'Премахване',
		'Right' : 'Отдясно',
		'ShowBigPictures' : 'Показване на големи снимки',
		'Signs' : new Array('Козирог','Водолей','Риби','Овен','Телец','Близнаци','Рак','Лъв','Дева','Везни','Скорпион','Стрелец'),
		'today' : 'днес',
		'UpdateAvailable1' : 'Излязло е обновление на HFP',
		'UpdateAvailable2' : 'Желаете ли да обновите сега?',
		'UpdateHomepage' : 'Към главната страница',
		'UpdateInstall' : 'Инсталиране сега',
		'UpdateTomorrow' : 'Напомняне утре',
		'yearsOld' : 'на %s години'
	},

	// Greek - Contributed by Dimitris DoSMaN Sarlis (20101024)
	el : {
		'_language' : 'Greek',
		'AddToCalendar' : 'Προσθήκη στο Ημερολόγιο',
		'AddToGoogleCalendar' : 'Προσθήκη στο Ημερολόγιο του Google',
		'all' : 'όλα',
		'All' : 'Όλα',
		'AllPhotosLoaded' : 'Όλες οι φωτογραφίες φορτώθηκαν',
		'Automatic' : 'Αυτόματα',
		'Birthday' : 'Γεννέθλια %s',
		'BookmarkAdd' : 'Προσθήκη Νέου Αγαπημένου',
		'BookmarkExists' : 'Υπάρχει ήδη αγαπημένο για αυτήν την σελίδα.\n\nΠηγαίντε στην σελίδα που θέλετε να προσθέσετε και δοκιμάστε ξανά.',
		'BookmarkNamePrompt' : 'Δώστε ένα όνομα για αυτό το αγαπημένο:\n%s',
		'BookmarksConfirmRemoval' : 'Είστε σίγουρος ότι θέλετε να αφαιρέσετε τα παρακάτω αγαπημένα;',
		'BookmarksManage' : 'Διαχείριση Αγαπημένων',
		'BookmarksRemoveSelected' : 'Αφαίρεση Επιλεγμένων Αγαπημένων',
		'Bookmarks' : 'Αγαπημένα',
		'BrowserUnsupported' : 'Ο περιηγητής σας δεν υποστηρίζει αυτήν την δυνατότητα.',
		'CreatingFile' : 'Δημιουργία Αρχείου',
		'Close' : 'Κλείσιμο',
		'ConfigureFacebookFixer' : 'Διαμόρφωση HFP',
		'ConfigureInstructions' : 'Όλες οι αλλαγές αποθηκεύονται άμεσα, αλλά κάποιες αλλαγές μπορεί να μην εφαρμοστούν σε καρτέλες που είναι ήδη ανοιχτές.',
		'ConfAge' : 'Εμφάνιση της ηλικίας ατόμων στο προφίλ τους (μόνο εφόσον έχουν δηλώσει την πλήρης ημερομηνία).',
		'ConfApplicationWhitelist' : 'Λίστα Επιτρεπτών Εφαρμογών - Εισάγετε τα IDs από τις εφαρμογές που θέλετε να εμφανίζονται. Διαχωρίστε τα IDs με κενό.',
		'ConfAutoBigAlbumPictures' : 'Αυτόματη εμφάνιση μεγάλων εικόνων άλμπουμ όταν η σελίδα ανοίξει.',
		'ConfAutoLoadFullAlbum' : 'Αυτόματη φόρτωση μικρογραφιών για όλες τις εικόνες του άλμπουμ σε μία σελίδα.',
		'ConfAutoLoadTaggedPhotos' : 'Αυτόματη φόρτωση μικρογραφιών για όλες τις "σημαδεμένες" φωτογραφίες σε μία σελίδα (στην καρτέλα φωτογραφιών, στο προφίλ των ανθρώπων).',
		'ConfAutoReadMore' : 'Αυτόματο κλικ στο σύνδεσμο "διαβάστε περισσότερα"',
		'ConfBigAlbumPictures' : 'Προσθήκη συνδέσμου στις σελίδες των άλμπουμ, για εμφάνιση μεγαλύτερων εκδοχών όλων των εικόνων στην συγκεκριμένη σελίδα.',
		'ConfBigAlbumPicturesBorder' : 'Προσθήκη ενός πλαισίου γύρω από τις μεγάλες εκδόσεις των εικόνων.',
		'ConfBottomBarHoverOpacity' : 'Κατά το πέρασμα του ποντικιού',
		'ConfBottomBarOpacity' : 'Διαφάνεια της κάτω γραμμής μενού.',
		'ConfCalendarBirthDate' : 'Να συμπεριληφθεί η ημερομηνία γέννησης του ατόμου στης λεπτομέριες γεγονότων.',
		'ConfCalendarFullName' : 'Χρήση του πλήρες ονόματος του ατόμου σαν τίτλο γενεθλίων (αντί για μόνο το όνομα).',
		'ConfChatDifferentiate' : 'Χρήση έντονων και πλαγίων γραμμάτων για διαφοροποίηση μεταξύ διαθέσιμων και αδρανών φίλων.',
		'ConfChatHideIdle' : 'Απόκρυψη αδρανών φίλων.',
		'ConfDelayPopupPics' : 'Αναμονή 0.5 δευτερολέπτων πριν την εμφάνιση αναδυόμενων εικόνων.',
		'ConfDelayPopupPicsTimeout' : 'Χρονοκαθυστέριση πριν την εμφάνιση των αναδυόμενων εικόνων, σε χιλιοστά του δευτερολέπτου (προεπιλογή=500):',
		'ConfDownloadVideo' : 'Προσθήκη συνδέσμου για λήψη βίντεο από τις σελίδες βίντεο. (Μπορεί να χρειαστείτε το <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Αυτόματη επαναφόρτωση σελίδων εφαρμογών με σφάλματα, μετά από 5 δευτερόλεπτα.',
		'ConfExport' : 'Για να εξάγετε τις ρυθμίσεις σας, αντιγράψτε το κείμενο παρακάτω και σώστε το σε αρχείο.',
		'ConfExternalPopup' : 'Ανάδυση πραγματικού μεγέθους για εξωτερικές εικόνες. <sup>Δοκιμαστικό</sup>',
		'ConfFacebookFixerLanguage' : 'Γλώσσα για το HFP',
		'ConfFacebookTimestamps' : 'Εμφάνιση της ώρας του Facebook (πχ. "Πριν 3 ώρες").',
		'ConfFBFTimestamps' : 'Προσθήκη της ώρας του HFP μετά από την ώρα του Facebook (πχ. "11:45").',
		'ConfFBFTimestamps24' : 'Εμφάνιση της ώρας του HFP σε 24-ωρη μορφή.',
		'ConfFriendRequestCountInTitle' : 'Εμφάνιση του αριθμού των προσκλήσεων φίλων στον τίτλο της σελίδας.',
		'ConfGoogleApps' : 'Δημιουργία Ημερολογίου Google, συμβατό με Εφαρμογές Google.',
		'ConfGoogleAppsDomain' : 'Τομέας:',
		'ConfGoogleCalendar' : 'Προσθήκη συνδέσμων για πρόσθεση γεννεθλίων και γεγονότων στο <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Ημερολόγιο Google</a>.',
		'ConfGoogleLanguage' : 'Γλώσσα για <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Μεταφραστή Google</a>',
		'ConfHideApplicationStories' : 'Απόκρυψη ιστοριών εφαρμογών.',
		'ConfHideEgos' : 'Απόκρυψη όλων των τομέων "εγώ" (θα πρέπει να κρύβει τις περισσότερες προτάσεις του Facebook).',
		'ConfHideEventStories' : 'Απόκρυψη ιστοριών εκδηλώσεων.',
		'ConfHideFacebookCountInTitle' : 'Απόκρυψη του μετρητή νέων εισερχομένων μηνυμάτων του Facebook.',
		'ConfHideFriendStories' : 'Απόκρυψη ιστοριών φίλων.',
		'ConfHideGroupStories' : 'Απόκρυψη ιστοριών ομάδων.',
		'ConfHideHovercards' : 'Απόκρυψη αναδυόμενων καρτών (η κάρτα που εμφανίζεται όταν περνάει το ποντίκι πάνω από κάποιο όνομα).',
		'ConfHideLikeStories' : 'Απόκρυψη των ιστοριών "μου αρέσει".',
		'ConfHideLinkStories' : 'Απόκρυψη ιστοριών συνδέσμων.',
		'ConfHideNoteStories' : 'Απόκρυψη των ιστοριών σημειώσεων.',
		'ConfHidePhotoStories' : 'Απόκρυψη ιστοριών φωτογραφιών.',
		'ConfHidePlaceStories' : 'Απόκρυψη ιστοριών τόπου.',
		'ConfHideProfilePicStories' : 'Απόκρυψη ιστοριών εικόνας προφίλ.',
		'ConfHideRead' : 'Απόκρυψη αντικειμένων από την τροφοδοσία νέων που έχουν σημειωθεί σαν διαβασμένα.',
		'ConfHideRelationshipStories' : 'Απόκρυψη ιστοριών φιλίας.',
		'ConfHideStatusStories' : 'Απόκρυψη ιστοριών κατάστασης.',
		'ConfHideVideoStories' : 'Απόκρυψη ιστοριών Βίντεο.',
		'ConfHideWallStories' : 'Απόκρυψη ιστοριών τοίχου.',
		'ConfHomeBeta' : 'Εμφάνιση του τομέα Δοκιμαστικής Έκδοσης του Facebook.',
		'ConfHomeChat' : 'Εμφάνιση του τομέα Συνομιλίας.',
		'ConfHomeChatNames' : 'Εμφάνιση ονομάτων στον τομέα Συνομιλίας.',
		'ConfHomeEvents' : 'Εμφάνιση της κατηγορίας εκδηλώσεων.',
		'ConfHomeFindFriends' : 'Εμφάνιση του τομέα "Συνδεθείτε με φίλους".',
		'ConfHomeLeftAlign' : 'Αριστερή στοίχιση των περιεχομένων της αρχικής σελίδας.',
		'ConfHomeLeftColumn' : 'Εμφάνιση της αριστερής στήλης.',
		'ConfHomeLeftColumnFixed' : 'Πάγωμα αριστερής στήλης, ακόμα και αν μετακινήστε προς τα κάτω.',
		'ConfHomeLink' : 'Εμφάνιση του συνδέσμου της Αρχικής Σελίδας στην πάνω μπάρα.',
		'ConfHomeNavigation' : 'Εμφάνιση του τομέα Πλοήγησης.',
		'ConfHomePokes' : 'Εμφάνιση των σκουντηγμάτων.',
		'ConfHomeProfile' : 'Εμφάνιση του τομέα Προφίλ.',
		'ConfHomeRecommendations' : 'Εμφάνιση προτάσεων (Άτομα που ίσως γνωρίζεις, Προτεινόμενες Σελίδες κλπ).',
		'ConfHomeRequests' : 'Εμφάνιση της κατηγορίας Αιτημάτων.',
		'ConfHomeRightColumn' : 'Εμφάνιση του δεξιού τμήματος.',
		'ConfHomeStretch' : 'Άνοιγμα της αρχικής σελίδας με βάση το πλάτος του παραθύρου του περιηγητή.',
		'ConfHomeStretchComments' : 'Άνοιγμα του πλάτους των σχολίων στην αρχική σελίδα.',
		'ConfiCalendar' : 'Προσθήκη συνδέσμων για λήψη αρχείου <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> με όλα τα γεννέθλια.',
		'ConfImport' : 'Για να εισάγετε τις ρυθμίσεις σας αργότερα, αντικαταστήστε το κείμενο που αποθηκεύσατε προηγουμένως και πατήστε στο κουμπί "Εισαγωγή".',
		'ConfInboxCountInTitle' : 'Εμφάνιση του πλήθους των αδιάβαστων μηνυμάτων στα εισερχόμενα στον τίτλο της σελίδας.',
		'ConfLogoutLink' : 'Προσθήκη ενός συνδέσμου για αποσύνδεση στην πάνω μπάρα.',
		'ConfNotificationCountInTitle' : 'Εμφάνιση των νέων ειδοποιήσεων στον τίτλο της σελίδας.',
		'ConfNewTabSearch' : 'Άνοιγμα αναζήτησης σε καινούργια καρτέλα ή παράθυρο όταν πιέζετε το CTRL + Enter για αναζήτηση.',
		'ConfPageTitle' : 'Αφαίρεση του "Facebook |" από τον τίτλο της κάθε σελίδας.',
		'ConfPhotoPopup' : 'Εμφάνιση αναδυόμενων φωτογραφιών σε πραγματικό μέγεθος κατά το πέρασμα του ποντικιού.',
		'ConfPopupAutoClose' : 'Κλείσιμο αναδυόμενων φωτογραφιών αυτόματα.',
		'ConfPopupSmartAutoClose' : 'Αποτροπή κλεισίματος αναδυόμενων φωτογραφιών εάν το ποντίκι είναι πάνω τους.',
		'ConfPopupPosition' : 'Θέση αναδυόμενων φωτογραφιών',
		'ConfPopupWhileTagging' : 'Εμφάνιση αναδυόμενων εικόνων ακόμα και στην προσθήκη ετικέτας.',
		'ConfProcessInterval' : 'Διάστημα που απαιτείται για να φορτώσει η σελίδα, σε χιλιοστά του δευτερολέπτου. (προεπιλογή=1000):',
		'ConfProfileLink' : 'Εμφάνιση του συνδέσμου Προφίλ στην πάνω μπάρα.',
		'ConfProfilePicPopup' : 'Εμφάνιση αναδυόμενων φωτογραφιών προφίλ σε πραγματικό μέγεθος κατά το πέρασμα του ποντικιού',
		'ConfProtocolLinks' : 'Μετατροπή του Messenger IDs των προφίλ σε συνδέσμους όπου μπορεί να ξεκινήσει συζήτηση με αυτούς (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Σχετικά με το HFP',
		'ConfSectionAdvanced' : 'Για προχωρήμένους',
		'ConfSectionEvents' : 'Γεννέθλια/Εκδηλώσεις',
		'ConfSectionImportExport' : 'Εισαγωγή/Εξαγωγή',
		'ConfSectionFeeds' : 'Τροφοδοσίες',
		'ConfSectionHomePage' : 'Αρχική Σελίδα',
		'ConfSectionLiveFeed' : 'Τελευταία Νέα',
		'ConfSectionMenu' : 'Μενού/Συνομιλία',
		'ConfSectionOther' : 'Άλλες Επιλογές',
		'ConfSectionPageTitle' : 'Τίτλος Σελίδας',
		'ConfSectionPictures' : 'Εικόνες',
		'ConfSectionShortcuts' : 'Συντομεύσεις Πληκτρολογίου',
		'ConfSecureLinks' : 'Εξανάγκασε τους συνδέσμους του Facebook να δείχνουν σε ασφαλείς (HTTPS) σελίδες.',
		'ConfShortcutList' : '<b>Συντομεύσεις Πληκτρολογίου</b> (ευαισθησία χαρακτήρων):<br /><br /><i>Από οποιαδήποτε σελίδα:</i><br /> <b>A</b> - Άλμπουμ/Φωτογραφίες<br /> <b>B</b> - Εμφάνιση/Απόκρυψη λίστα φίλων (διαθέσιμοι φίλοι)<br /> <b>C</b> - Επιλογές HFP<br /> <b>F</b> - Φίλοι<br /> <b>H</b> - Αρχική Σελίδα<br /> <b>I</b> - Εισερχόμενα<br /> <b>K</b> - Προσθήκη Αγαπημένου<br /> <b>L</b> - Επιλογή του συνδέσμου αποσύνδεσης (πατήστε το Enter αμέσως μετά για να αποσυνδεθείτε)<br /> <b>N</b> - Ειδοποιήσεις<br /> <b>P</b> - Το προφίλ σας<br /> <b>T</b> - Μετάφραση επιλεγμένου κειμένου<br /> <b><escape></b> - Κλείσιμο αναδυόμενων δημιουργημένα από το HFP<br /><br /><i>Από την αρχική σελίδα</i>:<br /> <b>f</b> ή <b>l</b> - Ζωντανές τροφοδοτήσεις<br /> <b>i</b> - Δημοσιευμένα στοιχεία<br /> <b>n</b> - Τροφοδότηση Νέων<br /> <b>p</b> - Φωτογραφίες<br /> <b>s</b> ή <b>u</b> - Ανανεώσεις κατάστασης<br /><br /><i>Από προφίλ</i>:<br /> <b>i</b> - Πληροφορίες<br /> <b>p</b> - Φωτογραφίες<br /> <b>w</b> - Τοίχος<br /> <b>x</b> - Πλαίσια<br /><br /><i>Από σελίδες με πλοήγηση (προηγούμενη, επόμενη, κ.ά.)</i><br /> <b><αριστερό βελάκι></b> - Προηγούμενη<br /> <b><δεξί βελάκι></b> - Επόμενη<br /> <b><shift> + <αριστερό βελάκι></b> - Αρχική (όταν είναι διαθέσιμη)<br /> <b><shift> + <δεξί βελάκι></b> - Τελευταία (όταν είναι διαθέσιμη)<br /><br /><i>Κατά την προβολή άλμπουμ/φωτογραφίες:</i><br /> <b>a</b> - Φόρτωση όλων των μικρογραφιών (όταν είναι διαθέσιμο)<br /> <b>b</b> - Εμφάνιση μεγαλύτερων φωτογραφιών<br /> <b>c</b> - Εμφάνιση παρατηρήσεων<br /> <b>k</b> - Επιστροφή στο Άλμπουμ<br /> <b>m</b> - Φωτογραφίες από (άτομο) και εμένα<br /><br /><i>Κατά την διάρκεια πρόσφατων άλμπουμ και ανεβασμένων/σημειωμένων φωτογραφιών:</i><br /> <b>a</b> ή  <b>r</b> - Πρόσφατα Άλμπουμ<br /> <b>m</b> ή  <b>u</b> - Ανεβασμένα από κινητό<br /> <b>o</b> - Φωτογραφίες με μένα<br /> <b>p</b> - Οι φωτογραφίες μου<br /> <b>t</b> ή  <b>f</b> - Σημειωμένοι φίλοι',
		'ConfShortcuts' : 'Ενεργοποίηση συντομεύσεων πληκτρολογίου.',
		'ConfSign' : 'Εμφάνιση του ζωδίου του ατόμου στο προφίλ του (εφόσων έχει δώσει την πλήρης ημερομηνία γέννησης).',
		'ConfTopBarFixed' : 'Πάγωμα μπάρας μενού, ακόμα και αν η σελίδα κυλάει προς τα κάτω.',
		'ConfTopBarHoverOpacity' : 'Κατά το πέρασμα του ποντικιού',
		'ConfTopBarOpacity' : 'Διαφάνεια μπάρας μενού κορυφής',
		'ConfUpdates' : 'Έλεγχος Userscripts.org καθημερινά για καινούργιες ενημερώσεις του HFP ή <a href="#" id="fbfUpdateLink" onclick="return false;">έλεγχος τώρα</a>.',
		'DownloadVideo' : 'Λήψη Βίντεο',
		'ExportICalendarFile' : 'Εξαγωγή αρχείου iCalendar',
		'ExportICalendarFileWarning' : '(Αυτό θα πάρει αρκετή ώρα αν έχετε πολλούς φίλους)',
		'FacebookFixerConflict' : 'Το FacebookFixer είναι πλέον γνωστό σαν HFP. Λόγω της αλλαγής του ονόματος θα πρέπει να απεγκαταστήσετε χειροκίνητα το HFP από τον περιηγητή σας, διαφορετικά τα δύο προγράμματα θα συγκρούονται μεταξύ τους. Εάν δεν είσαστε σίγουροι για το πως να απεγκαταστήσετε ένα πρόγραμμα userscript, <a %s>πατήστε εδώ για οδηγίες</a>.',
		'fullAlbumLoaded' : 'η φόρτωση του άλμπουμ ολοκληρώθηκε',
		'Import' : 'Εισαγωγή',
		'ImportConfirm' : 'Είστε σίγουρος ότι θέλετε να εισάγετε αυτές τις ρυθμίσεις;\nΟι τρέχουσες ρυθμίσεις θα χαθούν.',
		'ImportFailure' : 'Προέκυψε σφάλμα κατά την εισαγωγή των ρυθμίσεων.',
		'ImportSuccess' : 'Η εισαγωγή ολοκληρώθηκε. Θέλετε να ανανεώσετε την σελίδα;',
		'Left' : 'Αριστερά',
		'LoadingAllPhotos' : 'Φόρτωση όλων των φωτογραφιών...',
		'loadingFullAlbum' : 'Φόρτωση όλου του άλμπουμ...',
		'LoadingPic' : 'Φόρτωση εικόνας...',
		'LoadPhotosWarning' : 'Η φόρτωση όλων των φωτογραφιών μπορεί να πάρει αρκετή ώρα',
		'Months' : new Array('Ιανουάριος','Φεβρουάριος','Μάρτιος','Απρίλιος','Μάιος','Ιούνιος','Ιούλιος','Αύγουστος','Σεπτέμβριος','Οκτώβριος','Νοέμβριος','Δεκέμβριος'),
		'ProtocolSkype' : 'Κλήση %s μέσω Skype',
		'ProtocolMSN' : 'Συζήτηση με %s μέσω Windows Live',
		'ProtocolYahoo' : 'Συζήτηση με %s μέσω Yahoo Messenger',
		'ProtocolGoogle' : 'Συζήτηση με %s μέσω Google Talk',
		'ReloadErrorPage' : 'Πατήστε για δοκιμή ξανά ή περιμένετε 5 δευτερόλεπτα',
		'Refresh' : 'Ανανέωση',
		'Remove' : 'Αφαίρεση',
		'Right' : 'Δεξιά',
		'ShowBigPictures' : 'Εμφάνιση μεγαλύτερων εικόνων',
		'Signs' : new Array('Αιγόκερως','Υδροχόος','Ιχθείς','Κριός','Ταύρος','Δίδυμος','Καρκίνος','Λέων','Παρθένος','Ζυγός','Σκορπιός','Τοξότης'),
		'today' : 'σήμερα',
		'Translators' : 'Μεταφραστές',
		'UpdateAvailable1' : 'Υπάρχει καινούργια διαθέσιμη έκδοση του HFP',
		'UpdateAvailable2' : 'Θέλετε να την ενημερώσετε τώρα;',
		'UpdateHomepage' : 'Επιστροφή στην Αρχική Σελίδα',
		'UpdateInstall' : 'Εγκατάσταση τώρα',
		'UpdateTomorrow' : 'Υπενθύμιση αύριο',
		'yearsOld' : '%s χρονών'
	},

	// Slovak - Contributed by Peter Miksik (20101028)
	sk : {
		'_language' : 'Slovak',
		'AddToCalendar' : 'Pridať do Kalendára',
		'AddToGoogleCalendar' : 'Pridať do Kalendára Google',
		'all' : 'všetko',
		'All' : 'Všetko',
		'AllPhotosLoaded' : 'Všetky fotografie načítané',
		'Automatic' : 'Automaticky',
		'Birthday' : 'Narodeniny %s',
		'BookmarkAdd' : 'Pridať novú záložku',
		'BookmarkExists' : 'Táto stránka už je v záložkách.\n\nPrejdite na stránku, ktorú chcete pridať medzi záložky a skúste to znova.',
		'BookmarkNamePrompt' : 'Zadajte názov tejto záložky:\n%s',
		'BookmarksConfirmRemoval' : 'Naozaj chcete odstrániť nasledujúce záložky?',
		'BookmarksManage' : 'Spravovať záložky',
		'BookmarksRemoveSelected' : 'Odstrániť vybrané záložky',
		'Bookmarks' : 'Záložky',
		'BrowserUnsupported' : 'Váš prehliadač túto funkciu nepodporuje.',
		'CreatingFile' : 'Vytvorenie súboru',
		'Close' : 'Zavrieť',
		'ConfigureFacebookFixer' : 'Konfigurovať HFP',
		'ConfigureInstructions' : 'Všetky zmeny sú ukladané okamžite, ale niektoré zmeny sa nemusia prejaviť na kartách, ktoré sú už otvorené.',
		'ConfAge' : 'Zobraziť vek ľudí v ich profiloch (ak poskytli celý dátum narodenia)',
		'ConfApplicationWhitelist' : 'Zoznam povolených aplikácií – zadajte ID aplikácií, ktoré chrániť pred skrytím. ID oddeľte medzerou.',
		'ConfAutoBigAlbumPictures' : 'Automaticky pri otvorení stránky zobraziť väčšie obrázky albumu',
		'ConfAutoLoadFullAlbum' : 'Automaticky načítať miniatúry všetkých obrázkov v albume na jednej stránke',
		'ConfAutoLoadTaggedPhotos' : 'Automaticky načítať miniatúry všetkých fotografií s menovkou na jednej stránke (karta Fotky v profiloch ľudí)',
		'ConfAutoReadMore' : 'Automaticky kliknúť na odkazy "čítať ďalej"',
		'ConfBigAlbumPictures' : 'Pridať odkaz na stránkach albumu na zobrazenie väčších verzií všetkých obrázkov na tejto stránke',
		'ConfBigAlbumPicturesBorder' : 'Pridať rámček okolo väčších verzií obrázkov',
		'ConfBottomBarHoverOpacity' : 'Pri ukázaní myšou',
		'ConfBottomBarOpacity' : 'Priehľadnosť spodného panela s ponukou',
		'ConfCalendarBirthDate' : 'Zahrnúť narodeniny osoby do podrobností udalosti',
		'ConfCalendarFullName' : 'Použiť celé meno osoby ako názov narodenín (namiesto krstného mena)',
		'ConfChatDifferentiate' : 'Použiť tučné písmo a kurzívu na rozlíšenie pripojených a nečinných priateľov',
		'ConfChatHideIdle' : 'Skryť nečinných priateľov',
		'ConfDelayPopupPics' : 'Počkať 0,5 sekundy pred načítaním obrázkov v kontextovom okne',
		'ConfDelayPopupPicsTimeout' : 'Oneskorenie pred zobrazením obrázkov v kontextovom okne, v milisekundách (predvolené=500):',
		'ConfDownloadVideo' : 'Pridať odkaz na prevzatie videí zo stránok s videom (možno budete potrebovať <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">prehrávač FLV</a>)',
		'ConfErrorPageReload' : 'Automaticky po 5 sekundách znova načítať chybové stránky aplikácií',
		'ConfExport' : 'Ak chcete exportovať nastavenia, skopírujte dole uvedený text a uložte ho do súboru.',
		'ConfExternalPopup' : 'Externé obrázky plnej veľkosti v kontextovom okne <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Jazyk pre Facebook Fixer',
		'ConfFacebookTimestamps' : 'Zobraziť časové značky Facebooku (t. j. "pred 3 hodinami")',
		'ConfFBFTimestamps' : 'Pridať časové značky skriptu Facebook Fixer za časové značky Facebooku (t. j. "11:45")',
		'ConfFBFTimestamps24' : 'Zobraziť časové značky skriptu Facebook Fixer v 24-hodinovom formáte',
		'ConfFriendRequestCountInTitle' : 'Zobraziť v názve stránky počet nových žiadostí o priateľstvo',
		'ConfGoogleApps' : 'Vytvoriť odkazy pre Google Calendar kompatibilné s Google Apps',
		'ConfGoogleAppsDomain' : 'Doména',
		'ConfGoogleCalendar' : 'Pridať odkazy na zaradenie narodenín a udalostí do aplikácie <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Jazyk pre <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Skryť príspevky o aplikáciách',
		'ConfHideEgos' : 'Skryť všetky sekcie "ego" (malo by skryť väčšinu odporúčaní Facebooku)',
		'ConfHideEventStories' : 'Skryť príspevky o udalostiach',
		'ConfHideFacebookCountInTitle' : 'Skryť počet nových správ na Facebooku',
		'ConfHideFriendStories' : 'Skryť príspevky o priateľoch',
		'ConfHideGroupStories' : 'Skryť príspevky o skupinách',
		'ConfHideHovercards' : 'Skryť kontextové okná zobrazujúce sa po ukázaní myšou na mená)',
		'ConfHideLikeStories' : 'Skryť príspevky "Páči sa mi to"',
		'ConfHideLinkStories' : 'Skryť príspevky o odkazoch',
		'ConfHideNoteStories' : 'Skryť príspevky o poznámkach',
		'ConfHidePhotoStories' : 'Skryť príspevky o fotkách',
		'ConfHidePlaceStories' : 'Skryť príspevky o miestach',
		'ConfHideProfilePicStories' : 'Skryť príspevky o profilových fotkách',
		'ConfHideRead' : 'Skryť položky, ktoré boli označené ako prečítané',
		'ConfHideRelationshipStories' : 'Skryť príspevky o stave vzťahu',
		'ConfHideStatusStories' : 'Skryť príspevky o statuse',
		'ConfHideVideoStories' : 'Skryť príspevky o videách',
		'ConfHideWallStories' : 'Skryť príspevky o nástenkách',
		'ConfHomeBeta' : 'Zobraziť časť Beta Tester',
		'ConfHomeChat' : 'Zobraziť časť Chat',
		'ConfHomeChatNames' : 'Zobraziť mená v časti Chat',
		'ConfHomeEvents' : 'Zobraziť časť Udalosti',
		'ConfHomeFindFriends' : 'Zobraziť časť Spojte sa s priateľmi',
		'ConfHomeLeftAlign' : 'Zarovnať obsah úvodnej stránky naľavo',
		'ConfHomeLeftColumn' : 'Zobraziť ľavý stĺpec',
		'ConfHomeLeftColumnFixed' : 'Nechať ľavý stĺpec viditeľný aj pri posúvaní nadol',
		'ConfHomeLink' : 'Zobraziť vo vrchnej ponuke odkaz na úvodnú stránku',
		'ConfHomeNavigation' : 'Zobraziť časť Navigácia',
		'ConfHomePokes' : 'Zobraziť časť Štuchnutia',
		'ConfHomeProfile' : 'Zobraziť časť Profil',
		'ConfHomeRecommendations' : 'Zobraziť odporúčania (Ľudia, ktorých poznáte; Odporúčané stránky atď.)',
		'ConfHomeRequests' : 'Zobraziť časť Žiadosti',
		'ConfHomeRightColumn' : 'Zobraziť pravý stĺpec',
		'ConfHomeStretch' : 'Roztiahnuť úvodnú stránku na šírku okna prehľadávača',
		'ConfHomeStretchComments' : 'Roztiahnuť komentáre na hlavnej stránke',
		'ConfiCalendar' : 'Pridať odkazy na prevzatie súboru <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> so všetkými narodeninami',
		'ConfImport' : 'Ak chcete neskôr importovať nastavenia, prepíšte dole uvedený text tým, ktorý ste predtým uložili, a kliknite na "Import".',
		'ConfInboxCountInTitle' : 'Zobraziť v názve stránky počet neprečítaných prijatých správ',
		'ConfLogoutLink' : 'Pridať do vrchnej ponuky odkaz na odhlásenie',
		'ConfNotificationCountInTitle' : 'Zobraziť v názve stránky počet nových upozornení',
		'ConfNewTabSearch' : 'Pri vyhľadávaní otvoriť stlačením Ctrl+Enter výsledky hľadania na novej karte/v novom okne',
		'ConfPageTitle' : 'Odstrániť "Facebook |" z názvu všetkých stránok',
		'ConfPhotoPopup' : 'Väčšie verzie fotiek v kontextovom okne po ukázaní myšou',
		'ConfPopupAutoClose' : 'Automaticky zatvárať kontextové okná s obrázkami',
		'ConfPopupSmartAutoClose' : 'Zabrániť autom. zatvoreniu kontextových okien s obrázkom, ak je na nich kurzor myši',
		'ConfPopupPosition' : 'Umiestnenie kontextového okna s obrázkom',
		'ConfPopupWhileTagging' : 'Zobraziť kontextové okná s obrázkami aj pri označovaní',
		'ConfProcessInterval' : 'Interval spracovania stránky, v milisekundách (predvolené=1000):',
		'ConfProfileLink' : 'Zobraziť na vrchnom paneli s ponukou odkaz na profil',
		'ConfProfilePicPopup' : 'Väčšie verzie profilových fotiek v kontextovom okne po ukázaní myšou',
		'ConfProtocolLinks' : 'Zmeniť ID pre okamžité správy na odkazy spúšťajúce konverzáciu (Google Talk, Windows Live atď.)',
		'ConfSectionAbout' : 'Čo je Facebook Fixer',
		'ConfSectionAdvanced' : 'Spresnenie',
		'ConfSectionEvents' : 'Narodeniny/Udalosti',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Novinky',
		'ConfSectionHomePage' : 'Úvodná stránka',
		'ConfSectionLiveFeed' : 'Aktuality',
		'ConfSectionMenu' : 'Ponuky/Chat',
		'ConfSectionOther' : 'Ďalšie možnosti',
		'ConfSectionPageTitle' : 'Názov stránky',
		'ConfSectionPictures' : 'Obrázky',
		'ConfSectionShortcuts' : 'Klávesové skratky',
		'ConfSecureLinks' : 'Vynútiť zmenu odkazov Facebooku na stránky HTTPS',
		'ConfShortcutList' : '<b>Klávesové skratky</b> (rozlišujú sa malé/veľké písmená):<br /><br /><i>Z ľubovoľnej stránky:</i><br /> <b>A</b> – Albumy/fotky<br /> <b>B</b> – Prepnúť zoznam priateľov (online priatelia)<br /> <b>C</b> – Konfigurácia skriptu Facebook Fixer<br /> <b>D</b> – Narodeniny<br /> <b>E</b> – Udalosti<br /> <b>F</b> – Priatelia<br /> <b>H</b> – Domov<br /> <b>I</b> – Prijaté správy<br /> <b>L</b> – Vybrať odkaz Odhlásiť sa (po odhlásení stlačte Enter)<br /> <b>N</b> – Upozornenia<br /> <b>P</b> – Váš profil<br /> <b>R</b> – Žiadosti<br /> <b>S</b> – Preskočiť na pole Hľadať<br /> <b>T</b> – Preložiť vybraný text<br /> <b>?</b> – Zobraziť informácie o ladení skriptu Facebook Fixer<br /> <b><Esc></b> – Zavrieť kontextové okná vytvorené skriptom Facebook Fixer<br /><br /><i>Zo stránky Domov (filtre)</i>:<br /> <b>a</b> – Stránky<br /> <b>f</b> – Aktuality<br /> <b>g</b> – Skupiny<br /> <b>l</b> – Odkazy<br /> <b>n</b> – Novinky<br /> <b>p</b> – Fotky<br /> <b>s</b> alebo <b>u</b> – Čo robia ostatní<br /> <b>t</b> – Poznámky<br /> <b>v</b> – Videá<br /><br /><i>Z profilov</i>:<br /> <b>i</b> – Informácie<br /> <b>p</b> – Fotky<br /> <b>w</b> – Nástenka<br /> <b>x</b> – Priečinky<br /><br /><i>Zo stránok s navigáciou (dozadu, dopredu atď.)</i><br /> <b><šípka doľava></b> – Dozadu<br /> <b><šípka doprava></b> – Dopredu<br /> <b><shift> + <šípka doľava></b> – Prvá (ak je k dispozícii)<br /> <b><shift> + <šípka doprava></b> – Posledná (ak je k dispozícii)<br /><br /><i>Počas prezerania albumov/fotiek:</i><br /> <b>a</b> – Načítať všetky miniatúry (ak je k dispozícii)<br /> <b>b</b> – Zobraziť veľké obrázky<br /> <b>c</b> – Zobraziť komentáre<br /> <b>k</b> – Späť na album<br /> <b>m</b> – Fotky osoby a mňa<br /><br /><i>Počas prezerania najnovších albumov a nahratých fotiek/fotiek s menovkou:</i><br /> <b>a</b> or  <b>r</b> – Najnovšie albumy<br /> <b>m</b> alebo  <b>u</b> – Nahraté z mobilu<br /> <b>o</b> – Fotky, na ktorých som ja<br /> <b>p</b> – Moje fotky<br /> <b>t</b> alebo  <b>f</b> Menovky priateľov',
		'ConfShortcuts' : 'Povoliť klávesové skratky',
		'ConfSign' : 'Zobraziť znamenie ľudí v ich profiloch (ak poskytli svoj dátum narodenia)',
		'ConfTopBarFixed' : 'Vždy zobraziť vrchný panel s ponukou aj pri posúvaní stránky nadol',
		'ConfTopBarHoverOpacity' : 'Pri ukázaní myšou',
		'ConfTopBarOpacity' : 'Priehľadnosť vrchného panela s ponukou',
		'ConfUpdates' : 'Denne na Userscripts.org overovať aktualizácie pre Facebook Fixer, prípadne <a href="#" id="fbfUpdateLink" onclick="return false;">skontrolovať teraz</a>.',
		'DownloadVideo' : 'Prevziať video',
		'ExportICalendarFile' : 'Exportovať súbor iCalendar',
		'ExportICalendarFileWarning' : '(Ak máte mnoho priateľov, môže to chvíľu trvať.)',
		'FacebookFixerConflict' : 'Facebook Fixer sa odteraz nazýva HFP.<br /><br />Pretože sa zmenil názov, je potrebné ručne odinštalovať Facebook Fixer z prehliadača, inak budú v konflikte dva skripty medzi sebou navzájom.<br /><br />Ak neviete, ako skript odinštalovať, <a %s>kliknutím sem otvorte pokyny</a>.',
		'fullAlbumLoaded' : 'celý album načítaný',
		'Import' : 'Import',
		'ImportConfirm' : 'Naozaj chcete importovať tieto nastavenia?\nVaše súčasné nastavenia budú stratené.',
		'ImportFailure' : 'Počas pokusu o import nastavení došlo k chybe.',
		'ImportSuccess' : 'Import dokončený. Chcete obnoviť stránku?',
		'Left' : 'Vľavo',
		'LoadingAllPhotos' : 'Načítavajú sa všetky fotky...',
		'loadingFullAlbum' : 'Načítava sa celý album...',
		'LoadingPic' : 'Načítava sa obrázok...',
		'LoadPhotosWarning' : 'Načítavanie všetkých fotiek môže chvíľu trvať',
		'Months' : new Array('Január','Február','Marec','Apríl','Máj','Jún','Júl','August','September','Október','November','December'),
		'ProtocolSkype' : 'Volať %s pomocou Skype',
		'ProtocolMSN' : 'Chatovať s %s pomocou Windows Live',
		'ProtocolYahoo' : 'Chatovať s %s pomocou Yahoo Messenger',
		'ProtocolGoogle' : 'Chatovať s %s pomocou Google Talk',
		'ReloadErrorPage' : 'Kliknite na Skúsiť znova alebo počkajte 5 sekúnd',
		'Refresh' : 'Obnoviť',
		'Remove' : 'Odstrániť',
		'Right' : 'Vpravo',
		'ShowBigPictures' : 'Zobraziť veľké obrázky',
		'Signs' : new Array('Kozorožec','Vodnár','Ryba','Baran','Býk','Blíženci','Rak','Lev','Panna','Váhy','Škorpión','Strelec'),
		'today' : 'dnes',
		'Translators' : 'Prekladatelia',
		'UpdateAvailable1' : 'K dispozícii je aktualizácia skriptu Facebook Fixer.',
		'UpdateAvailable2' : 'Chcete aktualizovať teraz?',
		'UpdateHomepage' : 'Prejsť na dom. stránku',
		'UpdateInstall' : 'Nainštalovať',
		'UpdateTomorrow' : 'Pripomenúť zajtra',
		'yearsOld' : '%s rokov'
	},

	// Dutch - Contributed by Larissa van Sunder (20091107)
	nl : {
		'_language' : 'Dutch',
		'AddToCalendar' : 'Toevoegen aan kalender',
		'AddToGoogleCalendar' : 'Toevoegen aan Google Calender',
		'all' : 'allemaal',
		'All' : 'Allemaal',
		'AllPhotosLoaded' : 'Alle fotos geladen',
		'Automatic' : 'Automatisch',
		'Birthday' : '%s\'s verjaardag',
		'CreatingFile' : 'Folder crëeren',
		'Close' : 'Sluit',
		'ConfigureFacebookFixer' : 'Configureer HFP',
		'ConfigureInstructions' : 'Alle veranderingen worden onmiddelijk opgeslagen, maar sommige veranderingen zullen niet kunnen worden toegepast in vensters die al open zijn',
		'ConfAge' : 'Laat mensen hun leeftijd op hun profiel zien (wanneer zij hun volledige geboortedatum aangeven)',
		'ConfAutoBigAlbumPictures' : 'Laat automatisch grotere album foto\'s zien wanneer de pagina opent.',
		'ConfAutoLoadFullAlbum' : 'Laad automatisch miniaturen voor alle illustraties in een album op een enkele pagina.',
		'ConfAutoLoadTaggedPhotos' : 'Laad automatisch miniaturen voor alle getagde illustraties in een album op een enkele pagina (het foto\'s venster op mensen hun profiel.',
		'ConfAutoReadMore' : 'Klik automatisch op "lees meerdere" links.',
		'ConfBigAlbumPictures' : 'Link toevoegen op album pagina\'s om grotere versies van alle foto\'s op die pagina te laten zien.',
		'ConfBottomBarHoverOpacity' : 'Bij het overscrollen',
		'ConfBottomBarOpacity' : 'Transparantie menu bar aan het einde van de pagina',
		'ConfCalendarBirthDate' : 'Includeer de persoon zijn geboortedatum in de evenementen details.',
		'ConfCalendarFullName' : 'Gebruik de persoon zijn volledige naam voor de titel van verjaardagen (in plaats van alleen de voornaam).',
		'ConfChatDifferentiate' : 'Gebruik dikgedrukt en cursief om te differentiëren tussen beschikbaar en niet beschikbaar.',
		'ConfChatHideIdle' : 'Verberg niet beschikbare vrienden.',
		'ConfDelayPopupPics' : 'Een vertraging toevoegen voor het laten zien van popup foto\'s.',
		'ConfDelayPopupPicsTimeout' : 'Vertraging voor het laten zien van popup foto\'s, in milliseconden (standaard=500):',
		'ConfDownloadVideo' : 'Een link toevoegen voor het downloaden van videos van video pagina\'s. (Je hebt misschien een <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV speler</a> nodig)',
		'ConfErrorPageReload' : 'Automatisch toepassingen error pagina\'s reloaden.',
		'ConfExternalPopup' : 'Popup versies in volledige grootte van externe illustraties. <sup>experimenteel</sup>',
		'ConfFacebookFixerLanguage' : 'Taal voor HFP',
		'ConfFacebookTimestamps' : 'Laat Facebook timestamps zien (bijv. "3 uur geleden").',
		'ConfFBFTimestamps' : 'HFP timestamps toevoegen na Facebook timestamps (bijv. "11:45").',
		'ConfFBFTimestamps24' : 'Laat HFP timestamps zien in 24-uurs formaat.',
		'ConfGoogleApps' : 'Crëer Google Calendar links die werken met Google Apps.',
		'ConfGoogleAppsDomain' : 'Domein',
		'ConfGoogleCalendar' : 'Links toevoegen om verjaardagen en evenementen toe te voegen aan <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Taal voor <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideEventStories' : 'Verberg evenement overzichten in het live overzicht.',
		'ConfHideFanStories' : 'Verberg fan overzichten in het live overzicht.',
		'ConfHideFriendStories' : 'Verberg vriend overzichten in het live overzicht.',
		'ConfHideGroupStories' : 'Verberg groep overzichten in het live overzicht.',
		'ConfHideRead' : 'Verberg delen in het nieuws overzicht die rood gemarkeerd zijn.',
		'ConfHideRelationshipStories' : 'Verberg relatie overzichten in het live overzicht.',
		'ConfHomeFindFriends' : 'Laat de \'In contact komen met vrienden\' sectie zien.',
		'ConfHomeLeftAlign' : 'Links uitlijn de inhoud van de startpagina.',
		'ConfHomePeopleYouMayKnow' : 'Laat de Suggesties sectie zien.',
		'ConfHomePokes' : 'Laat de Porren sectie zien.',
		'ConfHomeRightColumn' : 'Laat de rechter kolom zien.',
		'ConfHomeStretch' : 'Stretch de startpagina naar de wijdte van het venster.',
		'ConfiCalendar' : 'Links toevoegen om een <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> folder met alle verjaardagen te downloaden.',
		'ConfInboxCountInTitle' : 'Laat het aantal ongelezen berichten in je inbox in de titelpagina zien.',
		'ConfNotificationCountInTitle' : 'Laat het aantal nieuwe noticicaties in de titelpagina zien.',
		'ConfNewTabSearch' : 'Open zoek resultaten in een nieuw venster/scherm wanneer CTRL + Enter om te zoeken wordt ingetoetst.',
		'ConfPageTitle' : 'Verwijder "Facebook |" van de titel van elke pagina.',
		'ConfPhotoPopup' : 'Grotere popup versies van foto\'s bij overscrollen.',
		'ConfPopupAutoClose' : 'Sluit popup foto\'s automatisch.',
		'ConfPopupPosition' : 'Positie voor popup foto\'s',
		'ConfProcessInterval' : 'Interval waarop de pagina moet worden verwerkt, in milliseconden (default=1000):',
		'ConfProfilePicPopup' : 'Grotere popup versies van profiel foto\'s bij overscrollen',
		'ConfProtocolLinks' : 'Verander messenger ID\'s van profielen in links die beginnen met een conversatie met hen (Google Talk, Windows Live etc).',
		'ConfSectionAdvanced' : 'Geavanceerd',
		'ConfSectionEvents' : 'Verjaardagen/Evenementen',
		'ConfSectionHomePage' : 'Startpagina',
		'ConfSectionLiveFeed' : 'Live Overzicht',
		'ConfSectionMenu' : 'Toepassingen/Chat',
		'ConfSectionOther' : 'Andere opties',
		'ConfSectionPictures' : 'Foto\'s',
		'ConfSectionShortcuts' : 'Keyboard Sneltoets',
		'ConfSecureLinks' : 'Dwing Facebook links te linken naar HTTPS pagina\'s.',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - HFP configuration<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show HFP debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by HFP<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Toestaan van sneltoetsen.',
		'ConfSign' : 'Laat mensen hun sterrenbeeld op hun profiel zien (wanneer zij hun geboortedatum aangeven).',
		'ConfTopBarFixed' : 'Behoud de top meny bar op het scherm, zelfs bij het naar beneden scrollen.',
		'ConfTopBarHoverOpacity' : 'Bij overscrollen',
		'ConfTopBarOpacity' : 'Top menu bar transparentie',
		'ConfUpdates' : 'Check Userscripts.org dagelijks voor updates naar HFP. Of <a href="#" id="fbfUpdateLink" onclick="return false;">check nu</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar folder',
		'ExportICalendarFileWarning' : '(Dit duurt wel even als je veel vrienden hebt)',
		'fullAlbumLoaded' : 'volledige album geladen',
		'Left' : 'Links',
		'LoadingAllPhotos' : 'Laad alle foto\'s...',
		'loadingFullAlbum' : 'Laad hele album...',
		'LoadingPic' : 'Laad foto...',
		'LoadPhotosWarning' : 'Het laden van alle foto\'s kan wel even duren',
		'Months' : new Array('januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'),
		'ProtocolSkype' : 'Bel %s door middel van Skype',
		'ProtocolMSN' : 'Chat met %s door middel van Windows Live',
		'ProtocolYahoo' : 'Chat met %s door middel van Yahoo Messenger',
		'ProtocolGoogle' : 'Chat met %s door middel van Google Talk',
		'Refresh' : 'Vernieuw',
		'ReloadErrorPage' : 'Klik om het nogmaals te proberen, of wacht %s seconden',
		'Remove' : 'Verwijder',
		'Right' : 'Rechts',
		'ShowBigPictures' : 'Laat grote foto\'s zien',
		'Signs' : new Array('Steenbok','Waterman','Vissen','Ram','Stier','Tweelingen','Kreeft','Leeuw','Maagd','Weegschaal','Schorpioen','Boogschutter'),
		'today' : 'vandaag',
		'UpdateAvailable1' : 'Een update is beschikbaar voor HFP',
		'UpdateAvailable2' : 'Will je nu updaten?',
		'UpdateHomepage' : 'Ga naar startpagina',
		'UpdateInstall' : 'Nu installeren',
		'UpdateTomorrow' : 'Herinner me morgen',
		'yearsOld' : '%s jaar oud'
	},

	// Chinese (Taiwan) - Contributed by By Dedicate to Xi Lian Yui (20100422)
	zh_tw : {
		'_language' : 'Chinese (Taiwan)',
		'AddToCalendar' : '加到日曆',
		'AddToGoogleCalendar' : '加到Google日曆',
		'all' : '全部',
		'All' : '全部',
		'AllPhotosLoaded' : '讀取所有相片',
		'Automatic' : '自動',
		'Birthday' : '%s\的生日',
		'BookmarkAdd' : '增加新的書籤',
		'BookmarkConfirmRemoval' : '您確定要移除書籤嗎？ "%s"?',
		'BookmarkDoesNotExist' : '此頁面無法加入書籤。\n\n轉到您要刪除的頁面，然後再試一次。',
		'BookmarkExists' : '此頁已加入書籤。\n\n轉到您要加入書籤的頁面，然後再試一次。',
		'BookmarkNamePrompt' : '輸入新的書籤名稱：\n%s',
		'BookmarkRemove' : '移除書籤',
		'Bookmarks' : '我的最愛',
		'BrowserUnsupported' : '您的瀏覽器尚未支援此功能。',
		'CreatingFile' : '創建文件',
		'Close' : '關閉',
		'ConfigureFacebookFixer' : '設定 HFP',
		'ConfigureInstructions' : ' HFP is a program of Texnolize Software developed by Rui Fujiwara, Website to looking review this application: http://ruifujiwara.co.cc。',
		'ConfAge' : '於個人資料顯示朋友\的年齡（如果他們設定正確無誤的話）。',
		'ConfAutoBigAlbumPictures' : '開啟相簿時自動顯示較大的相簿圖片。',
		'ConfAutoLoadFullAlbum' : '於單一頁面中自動顯示所有相片的縮圖',
		'ConfAutoLoadTaggedPhotos' : '於單一頁面中自動顯示所有標記的相片縮圖 (朋友\的個人資料標籤上)。',
		'ConfAutoReadMore' : '自動點選"繼續閱讀"連結。',
		'ConfBigAlbumPictures' : '新增一個顯示較大圖片版本的連結在相本上。',
		'ConfBottomBarHoverOpacity' : 'On mouse-over',
		'ConfBottomBarOpacity' : '底部選單的透明度。',
		'ConfCalendarBirthDate' : '包括朋友\的生日活動詳情。',
		'ConfCalendarFullName' : '使用朋友\的全名作為生日的標題 (而不是只有first name)。',
		'ConfChatDifferentiate' : '使用粗體和斜體區分在線及閒置的好友。',
		'ConfChatHideIdle' : '隱藏閒置的朋友。',
		'ConfDelayPopupPics' : '顯示彈出的圖片前，增加一個短暫的緩衝時間。',
		'ConfDelayPopupPicsTimeout' : '顯示彈出的圖片前延遲時間，以毫秒計算(預設值=500):',
		'ConfDownloadVideo' : '在有短片的頁面新增一個下載連結 (你也許需要 <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : '應用程式錯誤的後5秒自動重新讀取。',
		'ConfExport' : '匯出您的相關設定，複製下列文字，並另存於一個文件檔案。',
		'ConfExternalPopup' : '彈出全尺寸的外連圖片。 <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'HFP的語言選項',
		'ConfFacebookTimestamps' : '顯示Facebook原來的時間戳記 (eg. "3 hours ago").',
		'ConfFBFTimestamps' : '新增HFP的顯示時間戳記 (eg. "11:45").',
		'ConfFBFTimestamps24' : 'HFP的時間戳記採用24小時制。',
		'ConfFriendRequestCountInTitle' : '在網頁標題顯示新增好友的請求。',
		'ConfGoogleApps' : '創建Google日曆連結使其與Google的應用服務相容。',
		'ConfGoogleAppsDomain' : '域名',
		'ConfGoogleCalendar' : '新增一個生日及活動的連結 <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : '語言 <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : '隱藏應用程式紀錄。',
		'ConfHideEventStories' : '隱藏事件紀錄。',
		'ConfHideFanStories' : '隱藏粉絲紀錄。',
		'ConfHideFriendStories' : '隱藏朋友紀錄。',
		'ConfHideGroupStories' : '隱藏團體紀錄。',
		'ConfHideLinkStories' : '隱藏連結紀錄。',
		'ConfHidePhotoStories' : '隱藏圖片紀錄。',
		'ConfHideProfilePicStories' : '隱藏個人資料的圖片紀錄。',
		'ConfHideRead' : '隱藏標記已讀得即時動態項目。',
		'ConfHideRelationshipStories' : '隱藏關聯紀錄。',
		'ConfHideStatusStories' : '隱藏身份紀錄。',
		'ConfHideVideoStories' : '隱藏短片紀錄。',
		'ConfHideWallStories' : '隱藏塗鴉牆紀錄。',
		'ConfHomeChat' : '顯示聊天部份。',
		'ConfHomeEvents' : '顯示部份活動。',
		'ConfHomeFindFriends' : '顯示朋友連結。',
		'ConfHomeLeftAlign' : '首頁向左對齊。',
		'ConfHomeLeftColumn' : '顯示左側欄位。',
		'ConfHomeLeftColumnFixed' : '向下滾動時，保持左側欄位可見。',
		'ConfHomeLink' : '在頂端的選單中，顯示首頁的連結。',
		'ConfHomePeopleYouMayKnow' : '顯示部份建議。',
		'ConfHomeNavigation' : '顯示導覽部份。',
		'ConfHomePokes' : '顯示戳一下的部份。',
		'ConfHomeProfile' : '顯示個人資料部份。',
		'ConfHomeRequests' : '顯示部份要求。',
		'ConfHomeRightColumn' : '顯示右欄。',
		'ConfHomeStretch' : '在瀏覽器中延伸首頁的寬度。',
		'ConfiCalendar' : '增加一個下載連結 <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> file with all birthdays.',
		'ConfImport' : '如果在將來要匯入舊有設定，直接將之前的保存設定覆蓋底下的文字，然後選擇"Import（匯入）"',
		'ConfInboxCountInTitle' : '在信箱頁面顯示未讀的郵件數量',
		'ConfLogoutLink' : '在頂部的選單中加入『登出』連結。',
		'ConfNotificationCountInTitle' : '在網頁標題顯示新的通知。',
		'ConfNewTabSearch' : '使用 CTRL + Enter 搜索時，在新的頁面顯示搜尋結果。',
		'ConfPageTitle' : '移除每個頁面的 "Facebook |" 字樣。',
		'ConfPhotoPopup' : '滑鼠停於上方，自動彈出較大的圖片。',
		'ConfPopupAutoClose' : '關閉自動彈出圖片。',
		'ConfPopupSmartAutoClose' : '如果滑鼠移動到時，防止彈出圖片自動關閉。',
		'ConfPopupPosition' : '彈出圖片的顯示位置。',
		'ConfProcessInterval' : '頁面連結的間隔時間，以毫秒計算 (預設值=1000):',
		'ConfProfileLink' : '在頂端了選單中，顯示個人資料連結。',
		'ConfProfilePicPopup' : '滑鼠停於個人資料圖片上方時，自動彈出較大的圖片。',
		'ConfProtocolLinks' : '從個人資料的ID上打開聊天視窗，進入連結後即可開始交談對話。 (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : '關於 HFP',
		'ConfSectionAdvanced' : '進階',
		'ConfSectionEvents' : '生日/活動',
		'ConfSectionFeeds' : '即時動態',
		'ConfSectionHomePage' : '首頁',
		'ConfSectionImportExport' : '匯入/匯出',
		'ConfSectionLiveFeed' : '即時動態',
		'ConfSectionMenu' : '選單/聊天',
		'ConfSectionOther' : '其他選項',
		'ConfSectionPageTitle' : '頁面標題',
		'ConfSectionPictures' : '圖片',
		'ConfSectionShortcuts' : '鍵盤快捷鍵',
		'ConfSecureLinks' : '強迫 Facebook 連結到 HTTPS 頁面。',
		'ConfShortcutList' : '<b>鍵盤快捷鍵</b> (大小寫區分):<br /><br /><i>從任何頁面:</i><br />&nbsp;<b>A</b> - 相本/相片<br />&nbsp;<b>B</b> - 切換好友列表 (在線好友)<br />&nbsp;<b>C</b> - HFP 設置<br />&nbsp;<b>D</b> - 生日<br />&nbsp;<b>E</b> - 活動<br />&nbsp;<b>F</b> - 朋友<br />&nbsp;<b>H</b> - 首頁<br />&nbsp;<b>I</b> - 信箱<br />&nbsp;<b>L</b> - 選擇登出連結 (按下確定後登出)<br />&nbsp;<b>N</b> - 通知<br />&nbsp;<b>P</b> - 你的個人資料<br />&nbsp;<b>R</b> - 請求<br />&nbsp;<b>S</b> - 跳到搜索欄位<br />&nbsp;<b>T</b> - 翻譯選擇的內容<br />&nbsp;<b>?</b> - 顯示HFP除錯訊息<br />&nbsp;<b>&lt;escape&gt;</b> - 使用HFP關閉彈出視窗<br /><br /><i>從首頁 (過濾)</i>:<br />&nbsp;<b>a</b> - 頁面<br />&nbsp;<b>f</b> - 即時動態<br />&nbsp;<b>g</b> - 團體<br />&nbsp;<b>l</b> - 連結<br />&nbsp;<b>n</b> - 新的動態<br />&nbsp;<b>p</b> - 相片<br />&nbsp;<b>s</b> or <b>u</b> - 更新狀態<br />&nbsp;<b>t</b> - 筆記<br />&nbsp;<b>v</b> - 影片<br /><br /><i>從個人資料</i>:<br />&nbsp;<b>i</b> - 信息<br />&nbsp;<b>p</b> - 相片<br />&nbsp;<b>w</b> - 牆<br />&nbsp;<b>x</b> - 盒子<br /><br /><i>從網頁的頁碼 (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - 下一個<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - 首先 (當可以使用)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - 最後 (當可以使用)<br /><br /><i>當瀏覽相本/相片:</i><br />&nbsp;<b>a</b> - 讀取所有縮圖 (當可以使用)<br />&nbsp;<b>b</b> - 顯示大張的圖片<br />&nbsp;<b>c</b> - 查看留言<br />&nbsp;<b>k</b> - 返回相本<br />&nbsp;<b>m</b> - 照片 (個人) 和我<br /><br /><i>查看最近上傳/標記的相片:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - 最新的相本<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - 手機上傳<br />&nbsp;<b>o</b> - 我的相片<br />&nbsp;<b>p</b> - 我的相片<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - 標記的朋友',
		'ConfShortcuts' : '啟用鍵盤快捷鍵。',
		'ConfSign' : '在個人資料中顯示該人\的 生日署名 (如果他們提供了生日)。',
		'ConfTopBarFixed' : '即使向下捲動，一樣保持上方選單在螢幕上',
		'ConfTopBarHoverOpacity' : '滑鼠移至上方',
		'ConfTopBarOpacity' : '頂部選單的透明度。',
		'ConfUpdates' : '檢查 Userscripts.org For HFP 的更新。 或是 <a href="#" id="fbfUpdateLink" onclick="return false;">立即確認</a>.',
		'DownloadVideo' : '下載影片',
		'ExportICalendarFile' : '輸出 iCalendar 檔案',
		'ExportICalendarFileWarning' : '(如果你有很多的朋友的話，將要一段時間)',
		'FacebookFixerConflict' : 'Facebook Fixer現在更名為HFP。<br /><br />由於更改名稱，你需要手動從瀏覽器中卸載舊的Facebook Fixer腳本，因為兩個腳本會相互衝突。<br /><br />如果你不確定如何去移除腳本， <a %s>點擊說明部份</a>.',
		'fullAlbumLoaded' : '載入所有相本',
		'Import' : '匯入',
		'ImportConfirm' : '您確定要輸入這些設定嗎？當前的設定將會遺失。',
		'ImportFailure' : '在匯入的過程中發生錯誤。',
		'ImportSuccess' : '匯入成功。您要立即刷新頁面？',
		'Left' : '左邊',
		'LoadingAllPhotos' : '載入所有相片...',
		'loadingFullAlbum' : '載入所有相本...',
		'LoadingPic' : '載入照片中...',
		'LoadPhotosWarning' : '載入所有的照片需要較多的時間。',
		'Months' : new Array('一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'),
		'ProtocolSkype' : '呼叫 %s 使用 Skype',
		'ProtocolMSN' : '聊天 %s 使用 MSN',
		'ProtocolYahoo' : '聊天 %s 使用 Yahoo 即時通',
		'ProtocolGoogle' : '聊天 %s 使用 Google Talk',
		'ReloadErrorPage' : '點擊後重試, 或是等待5秒鐘',
		'Refresh' : '刷新',
		'Remove' : '移除',
		'Right' : '右邊',
		'ShowBigPictures' : '顯示大的圖片',
		'Signs' : new Array('摩羯座','水瓶座','雙魚座','白羊座','金牛座','雙子座','巨蟹座','獅子座','處女座','天秤座','天蠍座','射手座'),
		'today' : 'today',
		'UpdateAvailable1' : 'HFP 有可用的更新。',
		'UpdateAvailable2' : '你要現在更新嗎？',
		'UpdateHomepage' : '到首頁',
		'UpdateInstall' : '馬上安裝',
		'UpdateTomorrow' : '明天提醒我',
		'yearsOld' : '%s 歲'
	},

	// Turkish - Contributed by Gökhan Gurbetoğlu (20100817)
	tr : {
		'_language' : 'Turkish',
		'AddToCalendar' : 'Takvime Ekle',
		'AddToGoogleCalendar' : 'Google Takvim\'e Ekle',
		'all' : 'tümü',
		'All' : 'Tümü',
		'AllPhotosLoaded' : 'Tüm fotoğraflar yüklendi',
		'Automatic' : 'Otomatik',
		'Birthday' : '%s Doğumgünü',
		'BookmarkAdd' : 'Yeni Yer İmi Ekle',
		'BookmarkExists' : 'Bu sayfa için zaten bir yer imi var. \n\nYer imlerine eklemek istediğiniz sayfaya gidin ve tekrar deneyin.',
		'BookmarkNamePrompt' : 'Bu yer imi için bir isim girin:\n%s',
		'BookmarksConfirmRemoval' : 'Bu yer imlerini kaldırmak istediğinize emin misiniz?',
		'BookmarksManage' : 'Yer İmlerini Yönet',
		'BookmarksRemoveSelected' : 'Seçili Yer İmlerini Kaldır',
		'Bookmarks' : 'Yer İmleri',
		'BrowserUnsupported' : 'Tarayıcınız bu özelliği desteklemiyor.',
		'CreatingFile' : 'Dosya Oluşturuluyor',
		'Close' : 'Kapat',
		'ConfigureFacebookFixer' : 'HFP\'ı Yapılandır',
		'ConfigureInstructions' : 'Bütün değişiklikler hemen kaydedilir ancak bazı değişiklikler halen açık olan sekmelerde etkisini göstermeyebilir.',
		'ConfAge' : 'Kişilerin yaşını profillerinde göster (eğer tam doğum tarihlerini belirtmişlerse).',
		'ConfAlbumComments' : 'Albümde yapılmış tüm yorumları görmek için albüm sayfalarına bir bağlantı ekle.',
		'ConfApplicationWhitelist' : 'Uygulama Beyaz Listesi - Gizlenmesini istemediğiniz uygulamaların ID numaralarını girin. Birden fazla ID için aralara boşluk bırakın.',
		'ConfAutoBigAlbumPictures' : 'Büyük albüm resimlerini sayfa açıldığında otomatik olarak göster.',
		'ConfAutoLoadFullAlbum' : 'Bir albümdeki tüm küçük resimleri otomatik olarak tek sayfada yükle.',
		'ConfAutoLoadTaggedPhotos' : 'Tüm etiketlenmiş fotoğraflar için küçük resimleri otomatik olarak tek sayfada yükle (kişilerin profilindeki fotoğraflar sekmesi)',
		'ConfAutoReadMore' : '"Devamını gör" bağlantılarına otomatik olarak tıkla.',
		'ConfBigAlbumPictures' : 'Albüm sayfalarına bütün resimlerin büyük sürümlerini tek sayfada göstermek için bir bağlantı ekle.',
		'ConfBottomBarHoverOpacity' : 'Fare üstüne geldiğinde',
		'ConfBottomBarOpacity' : 'Alt menü çubuğu şeffaflığı',
		'ConfCalendarBirthDate' : 'Etkinlik ayrıntıları kişinin doğumgününü içersin.',
		'ConfCalendarFullName' : 'Doğumgünleri için kişinin tam adını kullan (sadece ilk adını kullanmak yerine).',
		'ConfChatDifferentiate' : 'Çevrimiçi ve boştaki arkadaşları ayırt etmek için kalın ve italik yazıtipi kullan.',
		'ConfChatHideIdle' : 'Boştaki arkadaşları gizle.',
		'ConfDelayPopupPics' : 'Açılır pencerede resimleri göstermeden önce kısa bir gecikme zamanı ekle.',
		'ConfDelayPopupPicsTimeout' : 'Açılır pencerede resimleri göstermeden önceki gecikme, milisaniye olarak (varsayılan=500):',
		'ConfDownloadVideo' : 'Video sayfalarındaki videoları indirmek için bir bağlantı ekle. (Bir <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV oynatıcı</a>\'ya ihtiyacınız olabilir)',
		'ConfErrorPageReload' : 'Uygulama hata sayfalarını 5 saniye sonra otomatik olarak yenile.',
		'ConfExport' : 'Ayarlarınızı dışa aktarmak için aşağıdaki metni kopyalayın ve bir dosyaya kaydedin.',
		'ConfExternalPopup' : 'Harici sitelerdeki fotoğrafların büyük sürümünü göster. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'HFP\'ın Dili',
		'ConfFacebookTimestamps' : 'Facebook\'un zaman etiketlerini göster (örn. "3 saat önce").',
		'ConfFBFTimestamps' : 'Facebook\'un zaman etiketlerinin ardından HFP zaman etiketlerini ekle (örn. "11:45").',
		'ConfFBFTimestamps24' : 'HFP zaman etiketlerini 24-saat biçiminde göster',
		'ConfFriendRequestCountInTitle' : 'Sayfa başlığında yeni arkadaşlık isteklerinin sayısını göster.',
		'ConfGoogleApps' : 'Google Apps ile uyumlu Google Takvim bağlantıları oluştur.',
		'ConfGoogleAppsDomain' : 'Etki Alanı',
		'ConfGoogleCalendar' : '<a href="http://tr.wikipedia.org/wiki/Google_Takvim" target="_blank">Google Takvim</a>\'e doğumgünü ve etkinlikler ekleyebilmek için bağlantıları oluştur.',
		'ConfGoogleLanguage' : '<a href="http://tr.wikipedia.org/wiki/Google_%C3%87eviri" target="_blank">Google Çeviri</a> için dil',
		'ConfHideApplicationStories' : 'Uygulama haberlerini gizle.',
		'ConfHideEventStories' : 'Etkinlik haberlerini gizle.',
		'ConfHideFacebookCountInTitle' : 'Facebook\'un yeni mesaj sayısı gösterimini gizle.',
		'ConfHideFriendStories' : 'Arkadaşlık haberlerini gizle.',
		'ConfHideGroupStories' : 'Grup haberlerini gizle.',
		'ConfHideLikeStories' : 'Beğenme haberlerini gizle.',
		'ConfHideLinkStories' : 'Bağlantı haberlerini gizle.',
		'ConfHideNoteStories' : 'Not haberlerini gizle.',
		'ConfHidePhotoStories' : 'Fotoğraf haberlerini gizle.',
		'ConfHideProfilePicStories' : 'Profil resmi haberlerini gizle.',
		'ConfHideRead' : 'Canlı haberlerdeki okundu olarak işaretlenmiş öğeleri gizle.',
		'ConfHideRelationshipStories' : 'İlişki haberlerini gizle.',
		'ConfHideStatusStories' : 'Durum haberlerini gizle.',
		'ConfHideVideoStories' : 'Video haberlerini gizle.',
		'ConfHideWallStories' : 'Duvar hikayelerini gizle.',
		'ConfHomeBeta' : 'Facebook Ön Gösterim bölmesini göster.',
		'ConfHomeChat' : 'Sohbet bölmesini göster.',
		'ConfHomeEvents' : 'Etkinlik bölmesini göster.',
		'ConfHomeFindFriends' : 'Arkadaşlarınla Bağlantı Kur bölmesini göster.',
		'ConfHomeLeftAlign' : 'Ana sayfa içeriğini sola yasla.',
		'ConfHomeLeftColumn' : 'Sol sütunu göster.',
		'ConfHomeLeftColumnFixed' : 'Sayfa aşağı kaydırılsa bile sol sütunu görünür tut.',
		'ConfHomeLink' : 'Üst menü çubuğunda Ana Sayfa bağlantısını göster.',
		'ConfHomeNavigation' : 'Dolaşma bölmesini göster.',
		'ConfHomePokes' : 'Dürtme bölmesini göster.',
		'ConfHomeProfile' : 'Profil bölmesini göster.',
		'ConfHomeRecommendations' : 'Tavsiyeleri göster (Tanıyor Olabileceğin Kişiler, Tavsiye Edilen Sayfalar, vs.).',
		'ConfHomeRequests' : 'İstekler bölmesini göster.',
		'ConfHomeRightColumn' : 'Sağ sütunu göster.',
		'ConfHomeStretch' : 'Ana sayfayı tarayıcının genişliğine sığacak şekilde uzat.',
		'ConfHomeStretchComments' : 'Ana sayfadaki yorumları uzat.',
		'ConfiCalendar' : 'Bütün doğumgünlerini içeren bir <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> dosyası indirmek için bağlantıları ekle.',
		'ConfImport' : 'İleride ayarlarınızı içe aktarmak için, daha önce kaydettiğiniz metni aşağıdaki metnin yerine yapıştırın ve "İçe Aktar"a tıklayın.',
		'ConfInboxCountInTitle' : 'Sayfa başlığında gelen kutusundaki okunmamış mesaj sayısını göster.',
		'ConfLogoutLink' : 'Üst menü çubuğuna bir çıkış bağlantısı ekle.',
		'ConfNotificationCountInTitle' : 'Sayfa başlığında bildirimlerin sayısını göster.',
		'ConfNewTabSearch' : 'CTRL + Enter basarak arama yapıldığında arama sonuçlarını yeni bir sekmede/pencerede aç.',
		'ConfPageTitle' : 'Bütün sayfaların başlığından "Facebook |" yazısını kaldır.',
		'ConfPhotoPopup' : 'Fareyle üstüne gelindiğinde fotoğrafların büyük sürümlerini göster.',
		'ConfPopupAutoClose' : 'Açılan pencere resimlerini otomatik olarak kapat.',
		'ConfPopupSmartAutoClose' : 'Açılan pencere resimlerinin fare üzerindeyken otomatik olarak kapanmasını engelle.',
		'ConfPopupPosition' : 'Açılan pencere resimlerinin konumu',
		'ConfProcessInterval' : 'Sayfayı işlemek için zaman aralığı, milisaniye olarak (varsayılan=1000):',
		'ConfProfileLink' : 'Üst menü çubuğunda Profil bağlantısını göster.',
		'ConfProfilePicPopup' : 'Fareyle üstüne gelindiğinde profil resimlerinin büyük sürümlerini göster',
		'ConfProtocolLinks' : 'Profillerdeki anlık ileti adreslerini anında iletişim kurulabilecek bağlantılara dönüştür (Google Talk, Windows Live, vb.).',
		'ConfSectionAbout' : 'HFP Hakkında',
		'ConfSectionAdvanced' : 'Gelişmiş',
		'ConfSectionEvents' : 'Doğumgünleri/Etkinlikler',
		'ConfSectionImportExport' : 'İçe/Dışa Aktar',
		'ConfSectionFeeds' : 'Kaynaklar',
		'ConfSectionHomePage' : 'Ana Sayfa',
		'ConfSectionLiveFeed' : 'Canlı Haberler',
		'ConfSectionMenu' : 'Menüler/Sohbet',
		'ConfSectionOther' : 'Diğer Seçenekler',
		'ConfSectionPageTitle' : 'Sayfa Başlığı',
		'ConfSectionPictures' : 'Resimler',
		'ConfSectionShortcuts' : 'Klavye Kısayolları',
		'ConfSecureLinks' : 'Facebook bağlantılarını HTTPS sayfalarını kullanmaya zorla.',
		'ConfShortcutList' : '<b>Klavye Kısayolları</b> (büyük/küçük harf duyarlı):<br /><br /><i>Herhangi bir sayfadan:</i><br /> <b>A</b> - Albümler/fotoğraflar<br /> <b>B</b> - Arkadaş listesini aç/kapa (çevrimiçi arkadaşlar)<br /> <b>C</b> - HFP yapılandırması<br /> <b>D</b> - Doğumgünleri<br /> <b>E</b> - Etkinlikler<br /> <b>F</b> - Arkadaşlar<br /> <b>H</b> - Ana Sayfa<br /> <b>I</b> - Gelen Kutusu<br /> <b>L</b> - Çıkış bağlantısını seç (çıkış yapmak için bundan sonra Enter\'a basın)<br /> <b>N</b> - Bildirimler<br /> <b>P</b> - Profiliniz<br /> <b>R</b> - İstekler<br /> <b>S</b> - Arama alanına git<br /> <b>T</b> - Seçili metni tercüme et<br /> <b>?</b> - HFP hata ayıklama bilgisini göster<br /> <b><escape></b> - HFP tarafından açılmış pencereleri kapat<br /><br /><i>Ana sayfadan (filtreler):</i><br /> <b>a</b> - Sayfalar<br /> <b>f</b> - Canlı Haberler<br /> <b>g</b> - Gruplar<br /> <b>l</b> - Bağlantılar<br /> <b>n</b> - Haber Kaynağı<br /> <b>p</b> - Fotoğraflar<br /> <b>s</b> veya <b>u</b> - Durum güncellemeleri<br /> <b>t</b> - Notlar<br /> <b>v</b> - Videolar<br /><br /><i>Profil sayfalarından:</i><br /> <b>i</b> - Bilgi<br /> <b>p</b> - Fotoğraflar<br /> <b>w</b> - Duvar<br /> <b>x</b> - Kutular<br /><br /><i>Numaralandırılmış sayfalardan (önceki, sonraki, vb.):</i><br /> <b><sol ok></b> - Önceki<br /> <b><sağ ok></b> - Sonraki<br /> <b><shift> + <sol ok></b> - İlk (eğer mevcutsa)<br /> <b><shift> + <sağ ok></b> - Son (eğer mevcutsa)<br /><br /><i>Albümleri/fotoğrafları görüntülerken:</i><br /> <b>a</b> - Tüm küçük resimleri yükle (eğer mevcutsa)<br /> <b>b</b> - Büyük resimleri göster<br /> <b>c</b> - Yorumları göster<br /> <b>k</b> - Albüme geri dön<br /> <b>m</b> - (Kişi) ve benim fotoğraflarım<br /><br /><i>Yakın zamanlardaki albümleri ve yüklenmiş/etiketlenmiş fotoğrafları görüntülerken:</i><br /> <b>a</b> veya  <b>r</b> - Yakın Zamandaki Albümler<br /> <b>m</b> veya  <b>u</b> - Mobil yüklemeler<br /> <b>o</b> - Benim olduğum fotoğraflar<br /> <b>p</b> - Fotoğraflarım<br /> <b>t</b> veya  <b>f</b> - Etiketlenmiş arkadaşlar',
		'ConfShortcuts' : 'Klavye kısayollarını etkinleştir.',
		'ConfSign' : 'Profillerde kişilerin burçlarını göster (eğer doğum tarihlerini belirtmişlerse).',
		'ConfTopBarFixed' : 'Sayfa aşağı kaydırılsa bile üst menü çubuğunu ekranda tut.',
		'ConfTopBarHoverOpacity' : 'Fare üstüne geldiğinde',
		'ConfTopBarOpacity' : 'Üst menü çubuğu şeffaflığı',
		'ConfUpdates' : 'HFP güncellemeleri için her gün Userscripts.org\'u ziyaret et. Ya da <a href="#" id="fbfUpdateLink" onclick="return false;">şimdi kontrol et</a>.',
		'DownloadVideo' : 'Videoyu İndir',
		'ExportICalendarFile' : 'iCalendar dosyası aktar',
		'ExportICalendarFileWarning' : '(Eğer çok arkadaşınız varsa bu biraz uzun sürebilir)',
		'FacebookFixerConflict' : 'HFP\'ın yeni adı artık HFP. İsim değişikliğinden dolayı HFP\'ı tarayıcınızdan kaldırmanız gerekiyor, yoksa bu iki script birbiriyle uyuşmazlık sorunları çıkaracaktır. Eğer bir userscript\'i nasıl kaldıracağınızdan emin değilseniz <a %s>buraya tıklayarak öğrenebilirsiniz</a>.',
		'fullAlbumLoaded' : 'bütün albüm yüklendi',
		'Import' : 'İçe Aktar',
		'ImportConfirm' : 'Bu ayarları içe aktarmak istediğinize emin misiniz?\nMevcut ayarlarınız silinecek.',
		'ImportFailure' : 'Ayarlarınızı içe aktarmaya çalışırken bir hata oluştu.',
		'ImportSuccess' : 'İçe aktarma tamamlandı. Sayfayı yenilemek ister misiniz?',
		'Left' : 'Sol',
		'LoadingAllPhotos' : 'Tüm fotoğraflar yükleniyor...',
		'loadingFullAlbum' : 'tüm albüm yükleniyor...',
		'LoadingPic' : 'Resim Yükleniyor...',
		'LoadPhotosWarning' : 'Tüm fotoğrafları yüklemek uzun zaman alabilir',
		'Months' : new Array('Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'),
		'ProtocolSkype' : '%s kişisini Skype kullanarak ara',
		'ProtocolMSN' : '%s ile Windows Live kullanarak sohbet et',
		'ProtocolYahoo' : '%s ile Yahoo Messenger kullanarak sohbet et',
		'ProtocolGoogle' : '%s ile Google Talk kullanarak sohbet et',
		'ReloadErrorPage' : 'Yeniden denemek için tıklayın, ya da 5 saniye bekleyin',
		'Refresh' : 'Yenile',
		'Remove' : 'Kaldır',
		'Right' : 'Sağ',
		'ShowBigPictures' : 'Büyük Resimleri Göster',
		'Signs' : new Array('Oğlak','Kova','Balık','Koç','Boğa','İkizler','Yengeç','Aslan','Başak','Terazi','Akrep','Yay'),
		'today' : 'bugün',
		'Translators' : 'Çevirenler',
		'UpdateAvailable1' : 'HFP için bir güncelleme mevcut',
		'UpdateAvailable2' : 'Şimdi güncellemek ister misiniz?',
		'UpdateHomepage' : 'Ana sayfaya git',
		'UpdateInstall' : 'Şimdi kur',
		'UpdateTomorrow' : 'Yarın hatırlat',
		'ViewAlbumComments' : 'Albüm Yorumlarını Göster',
		'yearsOld' : '%s yaşında'
	},

	// Serbian (Cyrillic) - Contributed by Горштак (20100817)
	sr_rs : {
		'_language' : 'Serbian (Cyrillic)',
		'AddToCalendar' : 'Додај у календар',
		'AddToGoogleCalendar' : 'Додај у Google календар',
		'all' : 'све',
		'All' : 'Све',
		'AllPhotosLoaded' : 'Све фотографије су учитане',
		'Automatic' : 'Аутоматски',
		'Birthday' : 'Рођендан корисника %s',
		'BookmarkAdd' : 'Додај нову забелешку',
		'BookmarkExists' : 'Ова страница је већ додата у забелешке.\n\nИдите на страницу коју желите да додате и покушајте поново.',
		'BookmarkNamePrompt' : 'Унесите назив ове забелешке:\n%s',
 		'BookmarksConfirmRemoval' : 'Да ли сте сигурни да желите да уклоните ове забелешке?',
 		'BookmarksManage' : 'Уреди забелешке',
 		'BookmarksRemoveSelected' : 'Уклони изабране забелешке',
		'Bookmarks' : 'Забелешке',
		'BrowserUnsupported' : 'Ваш претраживач не подржава ову опцију.',
		'CreatingFile' : 'Датотека се израђује',
		'Close' : 'Затвори',
		'ConfigureFacebookFixer' : 'Подеси HFP',
		'ConfigureInstructions' : 'Све измене се се одмах памте, али понекад је потребно освежити отворене странице да би измене деловале.',
		'ConfAge' : 'Прикажи узраст особе на профилу (уколико је наведен пун датум пођења).',
 		'ConfAlbumComments' : 'Додај везу на страницу албума којом би се приказали сви коментари албума.',
		'ConfApplicationWhitelist' : 'Списак дозвољених апликација - Унесите ознаку апликације како бисте спречили њено сакривање. Раздвојте ознаке размаком.',
		'ConfAutoBigAlbumPictures' : 'Аутоматски прикажи веће фотографије из албума када се страница отвори.',
		'ConfAutoLoadFullAlbum' : 'Аутоматски, на једној страници, учитај сличице свих фотографија из албума.',
		'ConfAutoLoadTaggedPhotos' : 'Аутоматски, на једној страници, учитај сличице свих означених фотографија (на картици "Фотографије" унутар профила).',
		'ConfAutoReadMore' : 'Аутоматски кликни на везу "старије".',
		'ConfBigAlbumPictures' : 'На страници албума додај везу за приказивање већих сличица свих фотографија са те странице.',
		'ConfBottomBarHoverOpacity' : 'Приликом преласка мишем',
		'ConfBottomBarOpacity' : 'Провидност доње траке са менијима',
		'ConfCalendarBirthDate' : 'Укључи датум рођења корисника у детаљима догађаја.',
		'ConfCalendarFullName' : 'Додај и презиме корисника у наслову рођендана.',
		'ConfChatDifferentiate' : 'Означи доступне пријатеље подебљаним словима а неактивне косим словима.',
		'ConfChatHideIdle' : 'Сакриј неактивне пријатеље.',
		'ConfDelayPopupPics' : 'Укључи кратак застој пре приказивања увећаних слика.',
		'ConfDelayPopupPicsTimeout' : 'Застој пре приказивања увећаних слика, у милисекундама (подразумевано=500):',
		'ConfDownloadVideo' : 'Додај везу за преузимање видео снимка са странице за видео. (Можда ће вам требати <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Аутоматско поновно учитавање странице након 5 секунди, у случају грешке.',
		'ConfExport' : 'Да бисте извезли своја подешавања, копирајте текст који следи и сачувајте га у датотеку.',
		'ConfExternalPopup' : 'Прикажи увећане слике фотографија са спољашњих страница. <sup>бета</sup>',
		'ConfFacebookFixerLanguage' : 'Језик HFP-а',
		'ConfFacebookTimestamps' : 'Прикажи Фејсбук време (нпр. "пре 3 сата").',
		'ConfFBFTimestamps' : 'Додај HFP време после Фејсбук времена (нпр. "11:45").',
		'ConfFBFTimestamps24' : 'Прикажи HFP времена у 24-часовном облику.',
		'ConfFriendRequestCountInTitle' : 'Прикажи број захтева за пријатељство у наслову странице.',
		'ConfGoogleApps' : 'Направи везе за Google календар, погодне за Google ове апликације.',
		'ConfGoogleAppsDomain' : 'Домен',
		'ConfGoogleCalendar' : 'Додај везе за додавање рођендана и догађаја у <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google календар</a>.',
		'ConfGoogleLanguage' : 'Језик за <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google преводилац</a>',
		'ConfHideApplicationStories' : 'Сакриј обавештења о апликацијама.',
		'ConfHideEventStories' : 'Сакриј обавештења о догађајима.',
 		'ConfHideFacebookCountInTitle' : 'Сакриј Фејсбуков број нових примљених порука.',
		'ConfHideFriendStories' : 'Сакриј обавештења о пријатељствима.',
		'ConfHideGroupStories' : 'Сакриј обавештења о групама.',
 		'ConfHideLikeStories' : 'Сакриј обавештења о "допада ми се" ставкама.',
		'ConfHideLinkStories' : 'Сакриј обавештења о везама.',
		'ConfHideNoteStories' : 'Сакриј обавештења о записима.',
		'ConfHidePhotoStories' : 'Сакриј обавештења о фотографијама.',
		'ConfHideProfilePicStories' : 'Сакриј обавештења о сликама на профилу.',
		'ConfHideRead' : 'У најновијим дешавањима сакриј ставке које су означене као прочитане.',
		'ConfHideRelationshipStories' : 'Сакриј обавештења о статусима везе.',
		'ConfHideStatusStories' : 'Сакриј промене статуса.',
		'ConfHideVideoStories' : 'Сакриј обавештења о видео записима.',
		'ConfHideWallStories' : 'Сакриј обавештења са зида.',
 		'ConfHomeBeta' : 'Прикажи одељак са Фејсбуковим најавама.',
		'ConfHomeChat' : 'Прикажи одељак са ћаскањем.',
		'ConfHomeEvents' : 'Прикажи одељак са догађајима.',
		'ConfHomeFindFriends' : 'Прикажи "Повежи се са" одељак.',
		'ConfHomeLeftAlign' : 'Поравнај садржај почетне странице по левој страни.',
		'ConfHomeLeftColumn' : 'Прикажи леву колону.',
		'ConfHomeLeftColumnFixed' : 'Нека лева колона буде видљива и приликом померања странице на доле.',
		'ConfHomeLink' : 'Прикажи везу за Почетну страницу на горњој траци са менијима.',
		'ConfHomeNavigation' : 'Прикажи одељак за навигацију.',
		'ConfHomePokes' : 'Прикажи "Боцкање" одељак.',
		'ConfHomeProfile' : 'Прикажи "Профил" одељк.',
 		'ConfHomeRecommendations' : 'Прикажи препоруке (Особе које можда познајеш, Препоручене странице итд.).',
		'ConfHomeRequests' : 'Прикажи "Захтеви" одељак.',
		'ConfHomeRightColumn' : 'Прикажи десну колону.',
		'ConfHomeStretch' : 'Рашири почетну страницу на пуну ширину прозора претраживача.',
 		'ConfHomeStretchComments' : 'Рашири коментаре на почетној страници.',
		'ConfiCalendar' : 'Додај везе за преузимање <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> датотеке са свим рођенданима.',
		'ConfImport' : 'Да бисе касније увезли своја подешавања, замените текст који следи са текстом који сте претходно сачували и кликните "Увоз".',
		'ConfInboxCountInTitle' : 'Прикажи број нових порука у наслову странице.',
		'ConfLogoutLink' : 'Додај везу за одјављивање на горњу траку са менијима.',
		'ConfNotificationCountInTitle' : 'Прикажи број нових обавештења у наслову странице.',
		'ConfNewTabSearch' : 'Када притиснем CTRL + Enter за претрагу, отвори резултате претраге у новој картици/прозору.',
		'ConfPageTitle' : 'Уклони "Facebook |" из наслова свих страница.',
		'ConfPhotoPopup' : 'Прикажи веће верзије фотографија приликом преласка мишем.',
		'ConfPopupAutoClose' : 'Аутоматски затвори увећане слике.',
		'ConfPopupSmartAutoClose' : 'Не затварај увећане слике ако је показивач миша на њима.',
		'ConfPopupPosition' : 'Положај увећаних слика',
		'ConfProcessInterval' : 'Интервал за обраду странице, у милисекундама (подразумевано=1000):',
		'ConfProfileLink' : 'Прикажи везу за Профил на горњу траку са менијима.',
		'ConfProfilePicPopup' : 'Прикажи веће верзије слика на профилу приликом преласка мишем',
		'ConfProtocolLinks' : 'Претвори надимке програма за комуникацију (Google Talk, Windows Live и др.) са профила у везе којима ће се започети ћаскање.',
		'ConfSectionAbout' : 'О додатку HFP',
		'ConfSectionAdvanced' : 'Више опција',
		'ConfSectionEvents' : 'Рођендани/догађаји',
		'ConfSectionImportExport' : 'Увоз/Извоз',
		'ConfSectionFeeds' : 'Новости',
		'ConfSectionHomePage' : 'Почетна страница',
		'ConfSectionLiveFeed' : 'Најновије',
		'ConfSectionMenu' : 'Менији/ћаскање',
		'ConfSectionOther' : 'Остале опције',
		'ConfSectionPageTitle' : 'Наслов странице',
		'ConfSectionPictures' : 'Слике',
		'ConfSectionShortcuts' : 'Пречице са тастатуре',
		'ConfSecureLinks' : 'Присили усмеравање Фејсбук веза на HTTPS странице.',
		'ConfShortcutList' : '<b>Пречице са тастатуре</b> (разликују се мала и велика слова):<br /><br /><i>Са било које странице:</i><br /> <b>A</b> - Албуми/фотографије<br /> <b>B</b> - Списак доступних пријатеља<br /> <b>C</b> - HFP подешавања<br /> <b>D</b> - Рођендани<br /> <b>E</b> - Догађаји<br /> <b>F</b> - Пријатељи<br /> <b>H</b> - Почетна страница<br /> <b>I</b> - Примљене поруке<br /> <b>K</b> - додај забелешку<br /> <b>L</b> - Означи везу за одјаву (притисните Ентер након тога за одјављивање)<br /> <b>N</b> - Обавештења<br /> <b>P</b> - Профил<br /> <b>R</b> - Захтеви<br /> <b>S</b> - Прелазак на поље за претрагу<br /> <b>T</b> - Преведи одабрани текст<br /> <b>?</b> - Прикажи извештај о грешци HFP-а<br /> <b><escape></b> - Затвори искачуће прозоре које је направио HFP<br /><br /><i>Са почетне странице (филтери)</i>:<br /> <b>a</b> - Странице<br /> <b>f</b> - Најновије<br /> <b>g</b> - Групе<br /> <b>l</b> - Везе<br /> <b>n</b> - Новости<br /> <b>p</b> - Фотографије<br /> <b>s</b> или <b>u</b> - Промене статуса<br /> <b>t</b> - Белешке<br /> <b>v</b> - Видео<br /><br /><i>Са профила</i>:<br /> <b>i</b> - Информације<br /> <b>p</b> - Фотографије<br /> <b>w</b> - Зид<br /> <b>x</b> - Оквири<br /><br /><i>Са страница са набрајањем (претходна, следћа, итд.)</i><br /> <b><стрелица лево></b> - Претходна<br /> <b><стрелица десно></b> - Следећа<br /> <b><шифт> + <стрелица лево></b> - Прва (ако је доступно)<br /> <b><шифт> + <стрелица десно></b> - Последња (ако је доступно)<br /><br /><i>Приликом прегледавања албума/фотографија:</i><br /> <b>a</b> - Учитај све сличице (ако је доступно)<br /> <b>b</b> - Прикажи велике слике<br /> <b>c</b> - Прикажи коментаре<br /> <b>k</b> - Назад на албум<br /> <b>m</b> - Фотографије са (корисником) и са мном<br /><br /><i>При прегледавању скорашњих албума и постављених/означених фотографија:</i><br /> <b>a</b> или  <b>r</b> - Скорашњи албуми<br /> <b>m</b> или  <b>u</b> - Постављено преко мобилног телефона<br /> <b>o</b> - Фотографије на којима сам ја<br /> <b>p</b> - Моје фотографије<br /> <b>t</b> или  <b>f</b> - Означени пријатељи',
		'ConfShortcuts' : 'Омогући пречице са тастатуре.',
		'ConfSign' : 'Прикажи корисников хороскопски знак на његовом профилу (уколико је наведен пун датум рођења).',
		'ConfTopBarFixed' : 'Задржи горњу траку са менијима на екрану и приликом померања странице на доле.',
		'ConfTopBarHoverOpacity' : 'Приликом преласка мишем',
		'ConfTopBarOpacity' : 'Провидност Горње траке са менијима',
		'ConfUpdates' : 'Свакодневно проверавај Userscripts.org за надоградње HFP-а. Или <a href="#" id="fbfUpdateLink" onclick="return false;">провери сада</a>.',
		'DownloadVideo' : 'Преузми видео',
		'ExportICalendarFile' : 'Извези iCalendar датотеку',
		'ExportICalendarFileWarning' : '(Ово може да потраје ако имате много пријатеља)',
		'FacebookFixerConflict' : 'HFP се сада зове HFP. Због промене имена мораћете ручно да уклоните HFP из свог прегледача да не би дошло до ометања између ове две скрипте. Ако нисте сигурни како да уклоните скрипту, <a %s>кликните овде за упутство</a>.',
		'fullAlbumLoaded' : 'цео албум је учитан',
		'Import' : 'Увоз',
		'ImportConfirm' : 'Да ли сте сигурни да желите да увезете ова подешавања?\nВаша тренутна подешавања ће бити поништена.',
		'ImportFailure' : 'Дошло је до грешке приликом увоза ваших подешавања.',
		'ImportSuccess' : 'Увоз је завршен. Да ли желите да освежите страницу?',
		'Left' : 'Лево',
		'LoadingAllPhotos' : 'Учитавање свих фотографија...',
		'loadingFullAlbum' : 'учитавање свих албума...',
		'LoadingPic' : 'Учитавање слике...',
		'LoadPhotosWarning' : 'Учитавање свих фотографија може да потраје неко време',
		'Months' : new Array('Јануар','Фебруар','Март','Април','Мај','Јун','Јул','Август','Септембар','Октобар','Новембар','Децембар'),
		'ProtocolSkype' : 'Позови корисника %s путем програма Skype',
		'ProtocolMSN' : 'Ћаскај са корисником %s путем програма Windows Live',
		'ProtocolYahoo' : 'Ћаскај са корисником %s путем програма Yahoo Messenger',
		'ProtocolGoogle' : 'Ћаскај са корисником %s путем програма Google Talk',
		'ReloadErrorPage' : 'Кликните да покушате поново, или сачекајте 5 секунди',
		'Refresh' : 'Освежи',
		'Remove' : 'Уклони',
		'Right' : 'Десно',
		'ShowBigPictures' : 'Прикажи велике слике',
		'Signs' : new Array('Јарац','Водолија','Рибе','Ован','Бик','Близанци','Рак','Лав','Девица','Вага','Шкорпија','Стрелац'),
		'today' : 'данас',
		'Translators' : 'Преводиоци',
		'UpdateAvailable1' : 'Доступне су надоградње за HFP',
		'UpdateAvailable2' : 'Желите ли сада да надоградите?',
		'UpdateHomepage' : 'Иди на почетну страницу',
		'UpdateInstall' : 'Инсталирај одмах',
		'UpdateTomorrow' : 'Подсети ме сутра',
 		'ViewAlbumComments' : 'Прикажи коментаре албума',
		'yearsOld' : '%s година'
	},

	// Serbian (Latin) - Contributed by Gorštak (20100817)
	sr : {
		'_language' : 'Serbian (Latin)',
		'AddToCalendar' : 'Dodaj u kalendar',
		'AddToGoogleCalendar' : 'Dodaj u Google kalendar',
		'all' : 'sve',
		'All' : 'Sve',
		'AllPhotosLoaded' : 'Sve fotografije su učitane',
		'Automatic' : 'Automatski',
		'Birthday' : 'Rođendan korisnika %s',
		'BookmarkAdd' : 'Dodaj novu zabelešku',
		'BookmarkExists' : 'Ova stranica je već dodata u zabeleške.\n\nIdite na stranicu koju želite da dodate i pokušajte ponovo.',
		'BookmarkNamePrompt' : 'Unesite naziv ove zabeleške:\n%s',
 		'BookmarksConfirmRemoval' : 'Da li ste sigurni da želite da uklonite ove zabeleške?',
 		'BookmarksManage' : 'Uredi zabeleške',
 		'BookmarksRemoveSelected' : 'Ukloni izabrane zabeleške',
		'Bookmarks' : 'Zabeleške',
		'BrowserUnsupported' : 'Vaš pretraživač ne podržava ovu opciju.',
		'CreatingFile' : 'Datoteka se izrađuje',
		'Close' : 'Zatvori',
		'ConfigureFacebookFixer' : 'Podesi HFP',
		'ConfigureInstructions' : 'Sve izmene se se odmah pamte, ali ponekad je potrebno osvežiti otvorene stranice da bi izmene delovale.',
		'ConfAge' : 'Prikaži uzrast osobe na profilu (ukoliko je naveden pun datum pođenja).',
 		'ConfAlbumComments' : 'Dodaj vezu na stranici albuma kojom bi se prikazali svi komentari albuma.',
		'ConfApplicationWhitelist' : 'Spisak dozvoljenih aplikacija - Unesite oznaku aplikacije kako biste sprečili njeno sakrivanje. Razdvojte oznake razmakom.',
		'ConfAutoBigAlbumPictures' : 'Automatski prikaži veće fotografije iz albuma kada se stranica otvori.',
		'ConfAutoLoadFullAlbum' : 'Automatski, na jednoj stranici, učitaj sličice svih fotografija iz albuma.',
		'ConfAutoLoadTaggedPhotos' : 'Automatski, na jednoj stranici, učitaj sličice svih označenih fotografija (na kartici "Fotografije" unutar profila).',
		'ConfAutoReadMore' : 'Automatski klikni na vezu "starije".',
		'ConfBigAlbumPictures' : 'Na stranici albuma dodaj vezu za prikazivanje većih sličica svih fotografija sa te stranice.',
		'ConfBottomBarHoverOpacity' : 'Prilikom prelaska mišem',
		'ConfBottomBarOpacity' : 'Providnost donje trake sa menijima',
		'ConfCalendarBirthDate' : 'Uključi datum rođenja korisnika u detaljima događaja.',
		'ConfCalendarFullName' : 'Dodaj i prezime korisnika u naslovu rođendana.',
		'ConfChatDifferentiate' : 'Označi dostupne prijatelje podebljanim slovima a neaktivne kosim slovima.',
		'ConfChatHideIdle' : 'Sakrij neaktivne prijatelje.',
		'ConfDelayPopupPics' : 'Uključi kratak zastoj pre prikazivanja uvećanih slika.',
		'ConfDelayPopupPicsTimeout' : 'Zastoj pre prikazivanja uvećanih slika, u milisekundama (podrazumevano=500):',
		'ConfDownloadVideo' : 'Dodaj vezu za preuzimanje video snimka sa stranice za video. (Možda će vam trebati <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Automatsko ponovno učitavanje stranice nakon 5 sekundi, u slučaju greške.',
		'ConfExport' : 'Da biste izvezli svoja podešavanja, kopirajte tekst koji sledi i sačuvajte ga u datoteku.',
		'ConfExternalPopup' : 'Prikaži uvećane slike fotografija sa spoljašnjih stranica. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Jezik HFP-a',
		'ConfFacebookTimestamps' : 'Prikaži Fejsbuk vreme (npr. "pre 3 sata").',
		'ConfFBFTimestamps' : 'Dodaj HFP vreme posle Fejsbuk vremena (npr. "11:45").',
		'ConfFBFTimestamps24' : 'Prikaži HFP vremena u 24-časovnom obliku.',
		'ConfFriendRequestCountInTitle' : 'Prikaži broj zahteva za prijateljstvo u naslovu stranice.',
		'ConfGoogleApps' : 'Napravi veze za Google kalendar, pogodne za Google ove aplikacije.',
		'ConfGoogleAppsDomain' : 'Domen',
		'ConfGoogleCalendar' : 'Dodaj veze za dodavanje rođendana i događaja u <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google kalendar</a>.',
		'ConfGoogleLanguage' : 'Jezik za <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google prevodilac</a>',
		'ConfHideApplicationStories' : 'Sakrij obaveštenja o aplikacijama.',
		'ConfHideEventStories' : 'Sakrij obaveštenja o događajima.',
 		'ConfHideFacebookCountInTitle' : 'Sakrij Fejsbukov broj novih primljenih poruka.',
		'ConfHideFriendStories' : 'Sakrij obaveštenja o prijateljstvima.',
		'ConfHideGroupStories' : 'Sakrij obaveštenja o grupama.',
 		'ConfHideLikeStories' : 'Sakrij obaveštenja o "dopada mi se" stavkama.',
		'ConfHideLinkStories' : 'Sakrij obaveštenja o vezama.',
		'ConfHideNoteStories' : 'Sakrij obaveštenja o zapisima.',
		'ConfHidePhotoStories' : 'Sakrij obaveštenja o fotografijama.',
		'ConfHideProfilePicStories' : 'Sakrij obaveštenja o slikama na profilu.',
		'ConfHideRead' : 'U najnovijim dešavanjima sakrij stavke koje su označene kao pročitane.',
		'ConfHideRelationshipStories' : 'Sakrij obaveštenja o statusima veze.',
		'ConfHideStatusStories' : 'Sakrij promene statusa.',
		'ConfHideVideoStories' : 'Sakrij obaveštenja o video zapisima.',
		'ConfHideWallStories' : 'Sakrij obaveštenja sa zida.',
 		'ConfHomeBeta' : 'Prikaži odeljak sa Fejsbukovim najavama.',
		'ConfHomeChat' : 'Prikaži odeljak sa ćaskanjem.',
		'ConfHomeEvents' : 'Prikaži odeljak sa događajima.',
		'ConfHomeFindFriends' : 'Prikaži "Poveži se sa" odeljak.',
		'ConfHomeLeftAlign' : 'Poravnaj sadržaj početne stranice po levoj strani.',
		'ConfHomeLeftColumn' : 'Prikaži levu kolonu.',
		'ConfHomeLeftColumnFixed' : 'Neka leva kolona bude vidljiva i prilikom pomeranja stranice na dole.',
		'ConfHomeLink' : 'Prikaži vezu za Početnu stranicu na gornjoj traci sa menijima.',
		'ConfHomeNavigation' : 'Prikaži odeljak za navigaciju.',
		'ConfHomePokes' : 'Prikaži "Bockanje" odeljak.',
		'ConfHomeProfile' : 'Prikaži "Profil" odeljk.',
 		'ConfHomeRecommendations' : 'Prikaži preporuke (Osobe koje možda poznaješ, Preporučene stranice itd.).',
		'ConfHomeRequests' : 'Prikaži "Zahtevi" odeljak.',
		'ConfHomeRightColumn' : 'Prikaži desnu kolonu.',
		'ConfHomeStretch' : 'Raširi početnu stranicu na punu širinu prozora pretraživača.',
 		'ConfHomeStretchComments' : 'Raširi komentare na početnoj stranici.',
		'ConfiCalendar' : 'Dodaj veze za preuzimanje <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> datoteke sa svim rođendanima.',
		'ConfImport' : 'Da bise kasnije uvezli svoja podešavanja, zamenite tekst koji sledi sa tekstom koji ste prethodno sačuvali i kliknite "Uvoz".',
		'ConfInboxCountInTitle' : 'Prikaži broj novih poruka u naslovu stranice.',
		'ConfLogoutLink' : 'Dodaj vezu za odjavljivanje na gornju traku sa menijima.',
		'ConfNotificationCountInTitle' : 'Prikaži broj novih obaveštenja u naslovu stranice.',
		'ConfNewTabSearch' : 'Kada pritisnem CTRL + Enter za pretragu, otvori rezultate pretrage u novoj kartici/prozoru.',
		'ConfPageTitle' : 'Ukloni "Facebook |" iz naslova svih stranica.',
		'ConfPhotoPopup' : 'Prikaži veće verzije fotografija prilikom prelaska mišem.',
		'ConfPopupAutoClose' : 'Automatski zatvori uvećane slike.',
		'ConfPopupSmartAutoClose' : 'Ne zatvaraj uvećane slike ako je pokazivač miša na njima.',
		'ConfPopupPosition' : 'Položaj uvećanih slika',
		'ConfProcessInterval' : 'Interval za obradu stranice, u milisekundama (podrazumevano=1000):',
		'ConfProfileLink' : 'Prikaži vezu za Profil na gornju traku sa menijima.',
		'ConfProfilePicPopup' : 'Prikaži veće verzije slika na profilu prilikom prelaska mišem',
		'ConfProtocolLinks' : 'Pretvori nadimke programa za komunikaciju (Google Talk, Windows Live i dr.) sa profila u veze kojima će se započeti ćaskanje.',
		'ConfSectionAbout' : 'O dodatku HFP',
		'ConfSectionAdvanced' : 'Više opcija',
		'ConfSectionEvents' : 'Rođendani/događaji',
		'ConfSectionImportExport' : 'Uvoz/Izvoz',
		'ConfSectionFeeds' : 'Novosti',
		'ConfSectionHomePage' : 'Početna stranica',
		'ConfSectionLiveFeed' : 'Najnovije',
		'ConfSectionMenu' : 'Meniji/ćaskanje',
		'ConfSectionOther' : 'Ostale opcije',
		'ConfSectionPageTitle' : 'Naslov stranice',
		'ConfSectionPictures' : 'Slike',
		'ConfSectionShortcuts' : 'Prečice sa tastature',
		'ConfSecureLinks' : 'Prisili usmeravanje Fejsbuk veza na HTTPS stranice.',
		'ConfShortcutList' : '<b>Prečice sa tastature</b> (razlikuju se mala i velika slova):<br /><br /><i>Sa bilo koje stranice:</i><br /> <b>A</b> - Albumi/fotografije<br /> <b>B</b> - Spisak dostupnih prijatelja<br /> <b>C</b> - HFP podešavanja<br /> <b>D</b> - Rođendani<br /> <b>E</b> - Događaji<br /> <b>F</b> - Prijatelji<br /> <b>H</b> - Početna stranica<br /> <b>I</b> - Primljene poruke<br /> <b>K</b> - dodaj zabelešku<br /> <b>L</b> - Označi vezu za odjavu (pritisnite Enter nakon toga za odjavljivanje)<br /> <b>N</b> - Obaveštenja<br /> <b>P</b> - Profil<br /> <b>R</b> - Zahtevi<br /> <b>S</b> - Prelazak na polje za pretragu<br /> <b>T</b> - Prevedi odabrani tekst<br /> <b>?</b> - Prikaži izveštaj o grešci HFP-a<br /> <b><escape></b> - Zatvori iskačuće prozore koje je napravio HFP<br /><br /><i>Sa početne stranice (filteri)</i>:<br /> <b>a</b> - Stranice<br /> <b>f</b> - Najnovije<br /> <b>g</b> - Grupe<br /> <b>l</b> - Veze<br /> <b>n</b> - Novosti<br /> <b>p</b> - Fotografije<br /> <b>s</b> ili <b>u</b> - Promene statusa<br /> <b>t</b> - Beleške<br /> <b>v</b> - Video<br /><br /><i>Sa profila</i>:<br /> <b>i</b> - Informacije<br /> <b>p</b> - Fotografije<br /> <b>w</b> - Zid<br /> <b>x</b> - Okviri<br /><br /><i>Sa stranica sa nabrajanjem (prethodna, sledća, itd.)</i><br /> <b><strelica levo></b> - Prethodna<br /> <b><strelica desno></b> - Sledeća<br /> <b><šift> + <strelica levo></b> - Prva (ako je dostupno)<br /> <b><šift> + <strelica desno></b> - Poslednja (ako je dostupno)<br /><br /><i>Prilikom pregledavanja albuma/fotografija:</i><br /> <b>a</b> - Učitaj sve sličice (ako je dostupno)<br /> <b>b</b> - Prikaži velike slike<br /> <b>c</b> - Prikaži komentare<br /> <b>k</b> - Nazad na album<br /> <b>m</b> - Fotografije sa (korisnikom) i sa mnom<br /><br /><i>Pri pregledavanju skorašnjih albuma i postavljenih/označenih fotografija:</i><br /> <b>a</b> ili  <b>r</b> - Skorašnji albumi<br /> <b>m</b> ili  <b>u</b> - Postavljeno preko mobilnog telefona<br /> <b>o</b> - Fotografije na kojima sam ja<br /> <b>p</b> - Moje fotografije<br /> <b>t</b> ili  <b>f</b> - Označeni prijatelji',
		'ConfShortcuts' : 'Omogući prečice sa tastature.',
		'ConfSign' : 'Prikaži korisnikov horoskopski znak na njegovom profilu (ukoliko je naveden pun datum rođenja).',
		'ConfTopBarFixed' : 'Zadrži gornju traku sa menijima na ekranu i prilikom pomeranja stranice na dole.',
		'ConfTopBarHoverOpacity' : 'Prilikom prelaska mišem',
		'ConfTopBarOpacity' : 'Providnost Gornje trake sa menijima',
		'ConfUpdates' : 'Svakodnevno proveravaj Userscripts.org za nadogradnje HFP-a. Ili <a href="#" id="fbfUpdateLink" onclick="return false;">proveri sada</a>.',
		'DownloadVideo' : 'Preuzmi video',
		'ExportICalendarFile' : 'Izvezi iCalendar datoteku',
		'ExportICalendarFileWarning' : '(Ovo može da potraje ako imate mnogo prijatelja)',
		'FacebookFixerConflict' : 'HFP se sada zove HFP. Zbog promene imena moraćete ručno da uklonite HFP iz svog pregledača da ne bi došlo do ometanja između ove dve skripte. Ako niste sigurni kako da uklonite skriptu, <a %s>kliknite ovde za uputstvo</a>.',
		'fullAlbumLoaded' : 'ceo album je učitan',
		'Import' : 'Uvoz',
		'ImportConfirm' : 'Da li ste sigurni da želite da uvezete ova podešavanja?\nVaša trenutna podešavanja će biti poništena.',
		'ImportFailure' : 'Došlo je do greške prilikom uvoza vaših podešavanja.',
		'ImportSuccess' : 'Uvoz je završen. Da li želite da osvežite stranicu?',
		'Left' : 'Levo',
		'LoadingAllPhotos' : 'Učitavanje svih fotografija...',
		'loadingFullAlbum' : 'učitavanje svih albuma...',
		'LoadingPic' : 'Učitavanje slike...',
		'LoadPhotosWarning' : 'Učitavanje svih fotografija može da potraje neko vreme',
		'Months' : new Array('Januar','Februar','Mart','April','Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'),
		'ProtocolSkype' : 'Pozovi korisnika %s putem programa Skype',
		'ProtocolMSN' : 'Ćaskaj sa korisnikom %s putem programa Windows Live',
		'ProtocolYahoo' : 'Ćaskaj sa korisnikom %s putem programa Yahoo Messenger',
		'ProtocolGoogle' : 'Ćaskaj sa korisnikom %s putem programa Google Talk',
		'ReloadErrorPage' : 'Kliknite da pokušate ponovo, ili sačekajte 5 sekundi',
		'Refresh' : 'Osveži',
		'Remove' : 'Ukloni',
		'Right' : 'Desno',
		'ShowBigPictures' : 'Prikaži velike slike',
		'Signs' : new Array('Jarac','Vodolija','Ribe','Ovan','Bik','Blizanci','Rak','Lav','Devica','Vaga','Škorpija','Strelac'),
		'today' : 'danas',
		'Translators' : 'Prevodioci',
		'UpdateAvailable1' : 'Dostupne su nadogradnje za HFP',
		'UpdateAvailable2' : 'Želite li sada da nadogradite?',
		'UpdateHomepage' : 'Idi na početnu stranicu',
		'UpdateInstall' : 'Instaliraj odmah',
		'UpdateTomorrow' : 'Podseti me sutra',
 		'ViewAlbumComments' : 'Prikaži komentare albuma',
		'yearsOld' : '%s godina'
	},

	// Danish - Contributed by Mads Jensen (20100210)
	da : {
		'_language' : 'Danish',
		'AddToCalendar' : 'Tilføj til kalender',
		'AddToGoogleCalendar' : 'Tilføj til Google Calendar',
		'all' : 'alle',
		'All' : 'Alle',
		'AllPhotosLoaded' : 'Alle billeder er hentet',
		'Automatic' : 'Automatisk',
		'Birthday' : '%s\'s fødselsdag',
		'BookmarkAdd' : 'Tilføj nyt bogmærke',
		'BookmarkConfirmRemoval' : 'Er du sikker på du vil fjerne bogmærket "%s"?',
		'BookmarkDoesNotExist' : 'Denne side har intet bogmærke.\n\nGå til siden du vil fjerne og prøv igen.',
		'BookmarkExists' : 'Der er allerede et bogmærke til denne side.\n\nGå til siden du vil tilføje et bogmærke for og prøv igen.',
		'BookmarkNamePrompt' : 'Skriv et navn til dette bogmærke:\n%s',
		'BookmarkRemove' : 'Fjern bogmærke',
		'CreatingFile' : 'Opret fil',
		'Close' : 'Luk',
		'ConfigureFacebookFixer' : 'Konfigurér HFP',
		'ConfigureInstructions' : 'Alle ændringer bliver gemt med det samme, men nogle ændringer vil ikke vises i allerede åbne faneblade.',
		'ConfAge' : 'Vis folks alder på deres profil (hvis de har oplyst fødselsdato).',
		'ConfAutoBigAlbumPictures' : 'Vis automatisk større album billeder, når siden åbnes.',
		'ConfAutoLoadFullAlbum' : 'Hent automatisk miniaturer til alle billeder i et album, på en enkelt side.',
		'ConfAutoLoadTaggedPhotos' : 'Hent automatisk miniaturer til alle taggede billeder i et album, på en enkelt side (Billeder fanebladet på folks profil).',
		'ConfAutoReadMore' : 'Tryk automatisk på  "Vis mere" links.',
		'ConfBigAlbumPictures' : 'Tilføj et link på album sider, til at vise større udgaver af alle billeder på den side.',
		'ConfBottomBarHoverOpacity' : 'Når musen er over',
		'ConfBottomBarOpacity' : 'Gennemsigtighed af menuen nederst på siden',
		'ConfCalendarBirthDate' : 'Inkludér personens fødselsdag i begivenhedens detaljer.',
		'ConfCalendarFullName' : 'Brug personens fulde navn som titlen til fødselsdage (i stedet for kun fornavn).',
		'ConfChatDifferentiate' : 'Brug fed og kursiv for at skelne mellem tilgængelige og optagede venner.',
		'ConfChatHideIdle' : 'Skjul optagede venner.',
		'ConfDelayPopupPics' : 'Tilføj en kort pause før billeder popper op.',
		'ConfDelayPopupPicsTimeout' : 'Pause før billeder popper op, i millisekunder (standard er 500)',
		'ConfDownloadVideo' : 'Tilføj et link til at hente videoer fra "Video" sider. (Du får sikkert brug for en <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV afspiller</a>)',
		'ConfErrorPageReload' : 'Genindlæs applikationsfejl sider efter 5 sekunder.',
		'ConfExternalPopup' : 'Vis eksterne billeder i fuld størrelse. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Sprog i HFP',
		'ConfFacebookTimestamps' : 'Vis Facebook tidsstempler (f.eks. "3 timer sider").',
		'ConfFBFTimestamps' : 'Tilføj HFP tidsstempler efter Facebook tidsstempler (f.eks. "11:45").',
		'ConfFBFTimestamps24' : 'Vis HFP tidsstempler i 24 timers format.',
		'ConfFriendRequestCountInTitle' : 'Vis antallet af anmodninger om venskab i siden titel.',
		'ConfGoogleApps' : 'Lav Google Calendar links kompatible med Google Apps.',
		'ConfGoogleAppsDomain' : 'Domæne',
		'ConfGoogleCalendar' : 'Tilføj links til at tilføje fødselsdage og begivenheder til <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Sprog i <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Skjul applikations beskeder.',
		'ConfHideEventStories' : 'Skjul begivenhed beskeder.',
		'ConfHideFanStories' : 'Skjul fan beskeder.',
		'ConfHideFriendStories' : 'Skjul ven beskeder.',
		'ConfHideGroupStories' : 'Skjul gruppe beskeder.',
		'ConfHideLinkStories' : 'Skjul link beskeder.',
		'ConfHidePhotoStories' : 'Skjul billede beskeder.',
		'ConfHideProfilePicStories' : 'Skjul profilbillede beskeder.',
		'ConfHideRead' : 'Skjul beskeder der er markeret som læst.',
		'ConfHideRelationshipStories' : 'Skjul parforholds beskeder.',
		'ConfHideStatusStories' : 'Skjul status beskeder.',
		'ConfHideVideoStories' : 'Skjul video beskeder.',
		'ConfHideWallStories' : 'Skjul væg beskeder.',
		'ConfHomeChat' : 'Vis Chat sektionen.',
		'ConfHomeEvents' : 'Vis Begivenheder sektionen.',
		'ConfHomeFindFriends' : 'Vis Skab forbindelser til venner sektionen.',
		'ConfHomeLeftAlign' : 'Venstrestil indholdet på forsiden.',
		'ConfHomeLeftColumn' : 'Vis venstre kolonne.',
		'ConfHomeLeftColumnFixed' : 'Hold venstre kolonne synlig, selv efter der er scrollet ned på siden.',
		'ConfHomePeopleYouMayKnow' : 'Vis Forslag sektionen.',
		'ConfHomeNavigation' : 'Vis Navigation sektionen.',
		'ConfHomePokes' : 'Vis Prik sektionen.',
		'ConfHomeProfile' : 'Vis Profil sektionen.',
		'ConfHomeRequests' : 'Vis Anmodninger sektionen.',
		'ConfHomeRightColumn' : 'Vis højre kolonne.',
		'ConfHomeStretch' : 'Stræk forsiden til browser vinduets fulde bredde.',
		'ConfiCalendar' : 'Tilføj links til at hente en <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> fil med alle fødselsdage.',
		'ConfInboxCountInTitle' : 'Vis antallet af nye beskeder i indbakken, i sidens titel.',
		'ConfLogoutLink' : 'Tilføj et "Log ud" link til top menuen.',
		'ConfNotificationCountInTitle' : 'Vis antallet af nye notifikationer i sidens titel.',
		'ConfNewTabSearch' : 'Tving søgeresultater til at åbne i et nyt vindue, når der trykkes CTRL + Enter ved søgning.',
		'ConfPageTitle' : 'Fjern "Facebook |" fra titlen på alle sider.',
		'ConfPhotoPopup' : 'Popop større udgaver af billeder når musen holdes over.',
		'ConfPopupAutoClose' : 'Luk popop billeder automatisk.',
		'ConfPopupSmartAutoClose' : 'Stop popop billeder fra at lukke automatisk hvis musen er over.',
		'ConfPopupPosition' : 'Position for popop billeder',
		'ConfProcessInterval' : 'Interval mellem håndtering af siden, i millisekunder (standard er 1000)',
		'ConfProfilePicPopup' : 'Popop større udgaver af profilbilleder når musen holdes over',
		'ConfProtocolLinks' : 'Lav IMs på profiler til links der starter en samtale (Google Talk, Windows Live o.s.v.).',
		'ConfSectionAbout' : 'Omkring HFP',
		'ConfSectionAdvanced' : 'Avanceret',
		'ConfSectionEvents' : 'Fødselsdage/Begivenheder',
		'ConfSectionFeeds' : 'Beskeder',
		'ConfSectionHomePage' : 'Forside',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menu/Chat',
		'ConfSectionOther' : 'Andre indstillinger',
		'ConfSectionPageTitle' : 'Side titel',
		'ConfSectionPictures' : 'Billeder',
		'ConfSectionShortcuts' : 'Tastatur genveje',
		'ConfSecureLinks' : 'Tving Facebook links til at bruge HTTPS.',
		'ConfShortcutList' : '<b>Tastatur genveje</b> (forskel på store og små bogstaver):<br /><br /><i>Fra enhver side:</i><br />&nbsp;<b>A</b> - Album/billeder<br />&nbsp;<b>B</b> - Skift venne liste (online venner)<br />&nbsp;<b>C</b> - HFP konfiguration<br />&nbsp;<b>D</b> - Fødselsdage<br />&nbsp;<b>E</b> - Begivenheder<br />&nbsp;<b>F</b> - Venner<br />&nbsp;<b>H</b> - Forside<br />&nbsp;<b>I</b> - Indbakke<br />&nbsp;<b>K</b> - Tilføj bogmærke<br />&nbsp;<b>L</b> - Vælg Log ud linket (tryk Enter efterfølgende for at logge ud)<br />&nbsp;<b>N</b> - Notifikationer<br />&nbsp;<b>P</b> - Din profil<br />&nbsp;<b>R</b> - Anmodninger<br />&nbsp;<b>S</b> - Hop til søgefeltet<br />&nbsp;<b>T</b> - Oversæt valgte tekst<br />&nbsp;<b>?</b> - Vis HFP debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Luk popops fra HFP<br /><br /><i>Fra forsiden (filtre)</i>:<br />&nbsp;<b>a</b> - Sider<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Grupper<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - Nyheder<br />&nbsp;<b>p</b> - Billeder<br />&nbsp;<b>s</b> eller <b>u</b> - Status opdateringer<br />&nbsp;<b>t</b> - Noter<br />&nbsp;<b>v</b> - Videoer<br /><br /><i>Fra profiler</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Billeder<br />&nbsp;<b>w</b> - Væg<br />&nbsp;<b>x</b> - Bokse<br /><br /><i>Fra sider med bladrefunktion (frem, tilbage o.s.v.)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Forrige<br />&nbsp;<b>&lt;right arrow&gt;</b> - Næste<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - Første (når muligt)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Sidste (når muligt)<br /><br /><i>Under visning af album/billeder:</i><br />&nbsp;<b>a</b> - Hent alle miniaturer (når muligt)<br />&nbsp;<b>b</b> - Vis store billeder<br />&nbsp;<b>c</b> - Se kommentarer<br />&nbsp;<b>k</b> - Tilbage til album<br />&nbsp;<b>m</b> - Billeder af (person) og mig<br /><br /><i>Under visning af nyeste album og uploadede/taggede billeder:</i><br />&nbsp;<b>a</b> eller <b>r</b> - Nyeste Album<br />&nbsp;<b>m</b> eller <b>u</b> - Telefon uploads<br />&nbsp;<b>o</b> - Billeder af mig<br />&nbsp;<b>p</b> - Mine billeder<br />&nbsp;<b>t</b> eller <b>f</b> - Tagged venner',
		'ConfShortcuts' : 'Slå tastaturgenveje til.',
		'ConfSign' : 'Vis folks stjernetegn på deres profil (hvis de har oplyst en fødsesdato).',
		'ConfTopBarFixed' : 'Hold topmenuen synlig på siden, selv efter der er scrollet ned.',
		'ConfTopBarHoverOpacity' : 'Når musen er over',
		'ConfTopBarOpacity' : 'Gennemsigtighed af topmenu linien',
		'ConfUpdates' : 'Undersøg Userscripts.org dagligt for opdateringer til HFP. Eller <a href="#" id="fbfUpdateLink" onclick="return false;">undersøg nu</a>.',
		'DownloadVideo' : 'Hent video',
		'ExportICalendarFile' : 'Eksportér iCalendar fil',
		'ExportICalendarFileWarning' : '(Dette vil tage lang tid, hvis du har mange venner)',
		'FacebookFixerConflict' : 'HFP vil fremover hedde HFP. På grund af navneskiftet, skal du manuelt afinstallere HFP fra dine browsere, da de to scripts ellers vil komme i konflikt med hinanden. Hvis du er usikker på hvordan man afinstallerer et Userscript, så <a %s>tryk her for instruktioner</a>.',
		'fullAlbumLoaded' : 'Hele albummet hentet',
		'Left' : 'Venstre',
		'ListeningRestarted' : 'HFP lytter efter ændringer igen.',
		'ListeningStopped' : 'HFP er stoppet med at lytte efter ændringer.\nTryk L (SHIFT + l) for at starte igen',
		'LoadingAllPhotos' : 'Henter alla billeder...',
		'loadingFullAlbum' : 'henter helt album...',
		'LoadingPic' : 'Henter billede...',
		'LoadPhotosWarning' : 'Indhentning af alle billeder tager mugligvis lang tid',
		'Months' : new Array('Januar','Februar','Marts','April','Maj','Juni','Juli','August','September','Oktober','November','December'),
		'ProtocolSkype' : 'Ring til %s med Skype',
		'ProtocolMSN' : 'Chat med %s på Windows Live',
		'ProtocolYahoo' : 'Chat med %s på Yahoo Messenger',
		'ProtocolGoogle' : 'Chat med %s på Google Talk',
		'ReloadErrorPage' : 'Tryk for at prøve igen eller vent 5 sekunder',
		'Refresh' : 'Genindlæs',
		'Remove' : 'Fjern',
		'Right' : 'Højre',
		'ShowBigPictures' : 'Vis store billeder',
		'Signs' : new Array('Stenbukken','Vandbæreren','Fiskene','Vædderen','Tyren','Tvillingerne','Krebsen','Løven','Jomfruen','Vægten','Skorpionen','Skytten'),
		'today' : 'i dag',
		'UpdateAvailable1' : 'En opdatering er tilgængelig til HFP',
		'UpdateAvailable2' : 'Vil du opdatere nu?',
		'UpdateHomepage' : 'Gå til hjemmesiden',
		'UpdateInstall' : 'Installér nu',
		'UpdateTomorrow' : 'Påmind mig i morgen',
		'yearsOld' : '%s år gammel'
	},

	// Czech - Contributed by Dedicate to Hormagov (20100823)
	cs : {
		'_language' : 'Czech',
		'AddToCalendar' : 'Přidat do kalendáře',
		'AddToGoogleCalendar' : 'Přidat do Google kalendáře',
		'all' : 'vše',
		'All' : 'Vše',
		'AllPhotosLoaded' : 'Všechny fotografie načtené',
		'Automatic' : 'Automaticky',
		'Birthday' : 'Narozeniny %s',
		'BookmarkAdd' : 'Přidej záložku',
		'BookmarkExists' : 'Tato stránka už je v záložkách.',
		'BookmarkNamePrompt' : 'Vložte jméno této záložky:\n%s',
		'BookmarksConfirmRemoval' : 'Jste si jistí, že chcete odstranit tuto záložku?',
		'BookmarksManage' : 'Spravuj záložky',
		'BookmarksRemoveSelected' : 'Odstraň vybrané záložky',
		'Bookmarks' : 'Záložky',
		'BrowserUnsupported' : 'Váš prohlížeč nepodporuje tento program.',
		'CreatingFile' : 'Vytvoření souboru',
		'Close' : 'Zavřít',
		'ConfigureFacebookFixer' : 'Nastavení - HFP',
		'ConfigureInstructions' : 'Všechny změny jsou ukládány okamžitě, ale některé se nemusí projevit na již otevřených kartách.',
		'ConfAge' : 'Zobrazit věk lidí v jejich profilech (pokud poskytli celý datum narození)',
		'ConfAlbumComments' : 'Přidá odkaz na stránku alba a ukáže všechny komentáře k danému albu.',
		'ConfApplicationWhitelist' : 'Seznam povolených aplikací - Vložte ID aplikace, kterou chcete chránit před skrytím. ID oddělujte mezerami.',
		'ConfAutoBigAlbumPictures' : 'Automaticky při otevření stránky zobrazit větší obrázky albumu',
		'ConfAutoLoadFullAlbum' : 'Automaticky načítat miniatury všech obrázků v albumu na jedné stránce',
		'ConfAutoLoadTaggedPhotos' : 'Automaticky načítat miniatury všech fotograficí s popisem na jedné stránce (karta Fotky v profilech lidí)',
		'ConfAutoReadMore' : 'Automaticky kliknout na odkazy &quot;číst dále&quot;',
		'ConfBigAlbumPictures' : 'Přidat odkaz na stránkách albumu na zobrazení větších verzí všech obrázků na této straně',
		'ConfBottomBarHoverOpacity' : 'Při najetí myší',
		'ConfBottomBarOpacity' : 'Průhlednost spodního panelu s nabídkou',
		'ConfCalendarBirthDate' : 'Zahrnout narozeniny osoby do podrobnosti událostí',
		'ConfCalendarFullName' : 'Použít jméno celé jméno osoby jako název narozenin (namístno křestního jména)',
		'ConfChatDifferentiate' : 'Použít tučné písmo a kurzívu na rozlišení připojených a nečinných přátel',
		'ConfChatHideIdle' : 'Skrýt nečinné přátele',
		'ConfDelayPopupPics' : 'Vyčkat 0,5 sekundy před načtením obrázku v kontextovém okně',
		'ConfDelayPopupPicsTimeout' : 'Zpoždění před zobrazením obrázku v kontextovém okně v milisekundách (defaultně=500):',
		'ConfDownloadVideo' : 'Přidat odkaz na převzetí videí ze stránek s videem (možná potřeba <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV přehrávač</a>)',
		'ConfErrorPageReload' : 'Automaticky po 5 sekundách znova načíst chybové stránky aplikácí',
		'ConfExport' : 'Pro exportování vašeho nastavení, zkopírujte následující text a uložte ho do souboru.',
		'ConfExternalPopup' : 'Externí obrázky plné velikosti v kontextovém okně <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Jazyk pro HFP',
		'ConfFacebookTimestamps' : 'Zobrazit časové značky Facebooku (t. j. "před 3 hodinami")',
		'ConfFBFTimestamps' : 'Přidat časové značky skriptu HFP za časové značky Facebooku (t. j. "11:45")',
		'ConfFBFTimestamps24' : 'Zobrazit časové značny skriptu HFP v 24-hodinovém formátě',
		'ConfFriendRequestCountInTitle' : 'Zobraz počet nových žádostí o přátelství v titulku stránky.',
		'ConfGoogleApps' : 'Vytvořit odkazy pro Google Calendar kompatibilní s Google Apps',
		'ConfGoogleAppsDomain' : 'Doména',
		'ConfGoogleCalendar' : 'Přidat odkazy na zařazení narozenin a událostí do aplikace <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Jazyk pro <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>.',
		'ConfHideApplicationStories' : 'Skrýt v aktualitách příspěvky o aplikacích.',
		'ConfHideEventStories': 'Skrýt v aktualitách příspěvky z událostí.',
		'ConfHideFacebookCountInTitle' : 'Skrýt počet nových zpráv.',
		'ConfHideFriendStories': 'Skrýt v aktualitách příspěvky přátel.',
		'ConfHideGroupStories': 'Skrýt v aktualitách příspěvky o skupinách.',
		'ConfHideLikeStories' : 'Skrýt příspěvky uživateli xxx se líbí.',
		'ConfHideLinkStories' : 'Skrýt příspěvky o odkazech.',
		'ConfHideNoteStories' : 'Skrýt příspěvky o poznámkách.',
		'ConfHidePhotoStories' : 'Skrýt příspěvky o fotkách.',
		'ConfHideProfilePicStories' : 'Skrýt příspěvky o profilových fotkách.',
		'ConfHideRead' : 'Skrýt v aktualitách položky, které byly označené jako přečtené.',
		'ConfHideRelationshipStories' : 'Skrýt v aktualitách příspěvky o vztahu.',
		'ConfHideStatusStories' : 'Skrýt příspěvky se statusy.',
		'ConfHideVideoStories' : 'Skrýt příspěvky o videích.',
		'ConfHideWallStories' : 'Skryj příspěvky na zdi.',
		'ConfHomeBeta' : 'Zobraz Beta Tester sekci.',
		'ConfHomeChat' : 'Zobrazit část chat.',
		'ConfHomeEvents' : 'Zobrazit část Události',
		'ConfHomeFindFriends' : 'Zobrazit část Spojte se s přáteli',
		'ConfHomeLeftAlign' : 'Zarovat obsah stránky Domů doleva',
		'ConfHomeLeftColumn' : 'Zobraz levý sloupec.',
		'ConfHomeLeftColumnFixed' : 'Nech levý sloupec viditelný i při scrolování dolů.',
		'ConfHomeLink' : 'Zobraz ve vrchní nabídce odkaz na úvodní stránku.',
		'ConfHomeNavigation' : 'Zobrazit část navigace.',
		'ConfHomePokes' : 'Zobrazit část Šťouchnutí',
		'ConfHomeProfile' : 'Zobraz část Profil.',
		'ConfHomeRecommendations' : 'Zobraz doporučení (Mohli byste znát, doporučené stránky, atd.).',
		'ConfHomeRequests' : 'Zobrazit část Žádosti',
		'ConfHomeRightColumn' : 'Zobrazit pravý sloupec',
		'ConfHomeStretch' : 'Roztáhnout úvodní stránku na šířku okna prohlížeče',
		'ConfHomeStretchComments' : 'Roztáhnout komentáře na úvodní stránce.',
		'ConfiCalendar' : 'Přidat odkazy na převzetí souboru <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> se všemi narozeninami',
		'ConfImport' : 'Pro importování nastavení přepište následující text předem exportovaným a poté klikněte na "Import".',
		'ConfInboxCountInTitle' : 'Zobrazit v názvu stránky počet nepřečtených zpráv',
		'ConfLogoutLink' : 'Přidej odhlašovací odkaz do vrchní nabídky.',
		'ConfNotificationCountInTitle' : 'Zobraz počet nových upozornění v titulku stránky.',
		'ConfNewTabSearch' : 'Při vyhledávání otevřít stisknutím Ctrl+Enter výsledky hledání na nové kartě/v novém okně',
		'ConfPageTitle' : 'Odstranit "Facebook |" z názvu všech stránek',
		'ConfPhotoPopup' : 'Větší verze fotek v kontextovém menu po najetí myší',
		'ConfPopupAutoClose' : 'Automaticky zavírat kontextová okna s obrázkem',
		'ConfPopupSmartAutoClose' : 'Zabránit automatickému uzavření kontextového okna s obrázkem',
		'ConfPopupPosition' : 'Umístění kontextového okna s obrázkem',
		'ConfProcessInterval' : 'Interval zpracování stránky v milisekundách (defaultně=1000):',
		'ConfProfileLink' : 'Zobraz ve vrchní nabídce odkaz na profil.',
		'ConfProfilePicPopup' : 'Větší verze profilových fotek v kontextovém okně po najetí myší',
		'ConfProtocolLinks' : 'Zmenit ID pro okamžitou správu na odkazy spouštějící konverzaci (Google Talk, Windows Live atd.)',
		'ConfSectionAbout' : 'O HFPu',
		'ConfSectionAdvanced' : 'Upřesnění',
		'ConfSectionEvents' : 'Narozeniny/Události',
		'ConfSectionImportExport' : 'Import/Export',
		'ConfSectionFeeds' : 'Příspěvky',
		'ConfSectionHomePage' : 'Stránka Doma',
		'ConfSectionLiveFeed' : 'Aktuality',
		'ConfSectionMenu' : 'Nabídky/Chat',
		'ConfSectionOther' : 'Další možnosti',
		'ConfSectionPageTitle' : 'Titulek stránky',
		'ConfSectionPictures' : 'Obrázky',
		'ConfSectionShortcuts' : 'Klávesové zkratky',
		'ConfSecureLinks' : 'Přesměrovat odkazy Facebooku na stránky HTTPS',
		'ConfShortcutList' : '<b>Klávesové zkratky</b> (rozlišují se malá/velká písmena):<br /><br /><i>Z libovolné stránky:</i><br />&nbsp;<b>A</b> - Alba/fotky<br />&nbsp;<b>B</b> - Přepnout seznam přátel (online přátel)<br />&nbsp;<b>C</b> - Konfigurace skriptu HFP<br />&nbsp;<b>D</b> - Narozeniny<br />&nbsp;<b>E</b> - Události<br />&nbsp;<b>F</b> - Přátelé<br />&nbsp;<b>H</b> - Domů<br />&nbsp;<b>I</b> - Přijaté zprávy<br />&nbsp;<b>K</b> - Přidej záložku<br />&nbsp;<b>L</b> - Odhlášení (po odhlášení stiskněte Enter)<br />&nbsp;<b>N</b> - Upozornění<br />&nbsp;<b>P</b> - Váš profil<br />&nbsp;<b>R</b> - Žádosti<br />&nbsp;<b>S</b> - Přeskočit na pole Hledat<br />&nbsp;<b>T</b> - Přeložit vybraný text<br />&nbsp;<b>?</b> - Zobrazit informace o ladění skriptu HFP<br />&nbsp;<b>&lt;escape&gt;</b> - Zavřít kontextová okna vytvořené skriptem HFP<br /><br /><i>Ze stránky Domů (filtry)</i>:<br />&nbsp;<b>a</b> - Stránky<br />&nbsp;<b>f</b> - Aktuality<br />&nbsp;<b>g</b> - Skupiny<br />&nbsp;<b>l</b> - Odkazy<br />&nbsp;<b>n</b> - Novinky<br />&nbsp;<b>p</b> - Fotky<br />&nbsp;<b>s</b> nebo <b>u</b> - Co dělají ostatní<br />&nbsp;<b>t</b> - Poznámky<br />&nbsp;<b>v</b> - Videa<br /><br /><i>Z profilů</i>:<br />&nbsp;<b>i</b> - Informace<br />&nbsp;<b>p</b> - Fotky<br />&nbsp;<b>w</b> - Zeď<br />&nbsp;<b>x</b> - Kontejner<br /><br /><i>Ze stránek s navigací (dozadu, dopredu atd.)</i><br />&nbsp;<b>&lt;levá šipka&gt;</b> - Předchozí<br />&nbsp;<b>&lt;pravá šipka&gt;</b> - Následující<br />&nbsp;<b>&lt;shift&gt; + &lt;levá šipka&gt;</b> - První (pokud je dispozici)<br />&nbsp;<b>&lt;shift&gt; + &lt;pravá šipka&gt;</b> - Poslední (pokud je k dispozici)<br /><br /><i>Při prohlížení alb/fotek:</i><br />&nbsp;<b>a</b> - Načítat všechny miniatury (pokud je k dispozici)<br />&nbsp;<b>b</b> - Zobrazit velké obrázky<br />&nbsp;<b>c</b> - Zobrazit komentáře<br />&nbsp;<b>k</b> - Zpět do alba<br />&nbsp;<b>m</b> - Fotky (osoby) a moje<br /><br /><i>Při prohlížení nejnovějších alb a nahraných/označených fotek:</i><br />&nbsp;<b>a</b> nebo &nbsp;<b>r</b> - Nejnovější alba<br />&nbsp;<b>m</b> nebo &nbsp;<b>u</b> - Nahrané z mobilu<br />&nbsp;<b>o</b> - Fotky mé osoby<br />&nbsp;<b>p</b> - Mé fotky<br />&nbsp;<b>t</b> nebo &nbsp;<b>f</b> - Označení přátelé',
		'ConfShortcuts' : 'Povolit klávesové zkratky',
		'ConfSign' : 'Zobrazit znamení lidí v jejich profilu (pokud uvedli svůj datum narození)',
		'ConfTopBarFixed' : 'Vždy zobrazit vrchní panel s nabídkou - i při posouvání stránky',
		'ConfTopBarHoverOpacity' : 'Při najetí myší',
		'ConfTopBarOpacity' : 'Průhlednost vrchního panelu s nabídkou',
		'ConfUpdates' : 'Denně na Userscripts.org ověřovat aktualizace pro HFP, případně <a href="#" id="fbfUpdateLink" onclick="return false;">zkontrolovat nyní</a>.',
		'DownloadVideo' : 'Stáhnout video',
		'ExportICalendarFile' : 'Exportovat soubor iCalendar',
		'ExportICalendarFileWarning' : '(Pokud máte mnoho přátel, může to chvíli trvat.)',
		'FacebookFixerConflict' : 'Facebook Fifex je nyní znám jako HFP.<br /><br />Protože se změnilo jméno, musíte manuálně odinstalovat Facebook Fixer z vašeho prohlížeče.<br /><br />Pokud si nevíte jak na to <a %s>pokračujte zde</a>.',
		'fullAlbumLoaded' : 'celý album je načtený',
		'Import' : 'Import',
		'ImportConfirm' : 'Opravdu chcete importovat toto nastavení?\nStávající nastavení bude ztraceno.',
		'ImportFailure' : 'Při importování nastavení došlo k chybě.',
		'ImportSuccess' : 'Import kompletní. Chcete aktualizovat stránku?',
		'Left' : 'Vlevo',
		'LoadingAllPhotos' : 'Načítají sa všechny fotky...',
		'loadingFullAlbum' : 'Načítá se celý album...',
		'LoadingPic' : 'Načítá se obrázek...',
		'LoadPhotosWarning' : 'Načítání všech fotek může chvíli trvat',
		'Months' : new Array('Leden','Únor','Březen','Duben','Květen','Červen','Červenec','Srpen','Září','Říjen','Listopad','Prosinec'),
		'ProtocolSkype' : 'Volat %s pomocí Skype',
		'ProtocolMSN' : 'Chatovat s %s pomocí Windows Live',
		'ProtocolYahoo' : 'Chatovat s %s pomocí Yahoo Messenger',
		'ProtocolGoogle' : 'Chatovat s %s pomocí Google Talk',
		'ReloadErrorPage' : 'Klikněte na Zkusit znovu nebo vyčkejte 5 sekund',
		'Refresh' : 'Obnovit',
		'Remove' : 'Odstranit',
		'Right' : 'Vpravo',
		'ShowBigPictures' : 'Zobrazit velké obrázky',
		'Signs' : new Array('Kozoroh','Vodnář','Ryba','Beran','Býk','Blíženci','Rak','Lev','Panna','Váhy','Štír','Střelec'),
		'today' : 'dnes',
		'Translators' : 'Překladatelé',
		'UpdateAvailable1' : 'K dispozici je aktualizace skriptu HFP.',
		'UpdateAvailable2' : 'Chcete aktualizovat nyní?',
		'UpdateHomepage' : 'Přejít na domovskou stránku',
		'UpdateInstall' : 'Nainstalovat',
		'UpdateTomorrow' : 'Připomenout zítra',
		'ViewAlbumComments' : 'Ukaž komentáře k albu',
		'yearsOld' : '%s let'
	},
	
	// Macedonian - Contributed by Goce Manevski (20100628)
	mk : {
		'_language' : 'Macedonian',
		'AddToCalendar' : 'Додади во Калентар',
		'AddToGoogleCalendar' : 'Додади во Google Калентар',
		'all' : 'сите',
		'All' : 'Сите',
		'AllPhotosLoaded' : 'Сите фотографии се вчитани',
		'Automatic' : 'Автоматски',
		'Birthday' : '%s\'s Роденден',
		'BookmarkAdd' : 'ДОдади нов обележувач',
		'BookmarkConfirmRemoval' : 'Дали си сигурен дека сакаш да избришеш обележувач "%s"?',
		'BookmarkDoesNotExist' : 'This page has not been bookmarked.\n\nGo to the page you want removed and try again.',
		'BookmarkExists' : 'Веќе има обележувач за оваа страница.\n\nОди до страницата што сакаш да ја обележиш и обиди се повторно.',
		'BookmarkNamePrompt' : 'Внеси име за овој обележувач:\n%s',
		'BookmarkRemove' : 'Избриши обележувач',
		'Bookmarks' : 'Обележувачи',
		'BrowserUnsupported' : 'Твојот пребарувач не ја поддржува опцијата.',
		'CreatingFile' : 'Креирање Датотека',
		'Close' : 'Затвори',
		'ConfigureFacebookFixer' : 'Конфигурирај го HFP',
		'ConfigureInstructions' : 'Сите промени се веднаш зачувани, но некои промени нема да работат во веќе отворените табови.',
		'ConfAge' : 'Покажи ги годините на луѓе\-то на нивните профили (ако го имаат објавено целиот датум на раѓање).',
		'ConfApplicationWhitelist' : 'Апликациска белалиста - Внеси сметки од апликациите за да ги покажеш ако биле скриени. Раздели ги сметките со празно место.',
		'ConfAutoBigAlbumPictures' : 'Автоматски прикажувај големи албум слики кога ќе се отвори страницата.',
		'ConfAutoLoadFullAlbum' : 'Автоматски вчитувај мали сликички за сите слики во албумот на една страница.',
		'ConfAutoLoadTaggedPhotos' : 'Автоматски вчитувај мали сликички за сите обележани слики на една страница (Таб од слики на профилите на луѓе\-то).',
		'ConfAutoReadMore' : 'Автоматски кликни на "прочитај повеќе" линковите.',
		'ConfBigAlbumPictures' : 'Додади линк на албум страниците за да се покаже голема верзија на сите фотографии на таа страница.',
		'ConfBottomBarHoverOpacity' : 'На обележување со глувчето',
		'ConfBottomBarOpacity' : 'Проѕирност на долниот мени бар',
		'ConfCalendarBirthDate' : 'Вклучи го роденден\-от на лицето во детали за настапот.',
		'ConfCalendarFullName' : 'Користи го целото име на човек\-от како наслов за родендени (наместо само име).',
		'ConfChatDifferentiate' : 'Користи здебелено и искосено за разлика повеѓу достапните и отсутните контакти.',
		'ConfChatHideIdle' : 'Сокриј ги отсутните контакти.',
		'ConfDelayPopupPics' : 'Додади кратко задоцнување пред покажување скокачки фотографии.',
		'ConfDelayPopupPicsTimeout' : 'Задоцнување пред покажување скокачки фотографии, во милисекунди (стандард=500):',
		'ConfDownloadVideo' : 'Додади линк за превземања на видеата од видео страниците. (Може ќе ти треба <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
		'ConfErrorPageReload' : 'Автоматски повторно вчитувај ги апликациите на страниците со грешки по 5 секунди.',
		'ConfExport' : 'За да ги изнесеш подесувањата, копирај го текстот предходно и зачувај го во датотека.',
		'ConfExternalPopup' : 'Скокачки целосни верзии на надворешни фотографии. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Јазик за HFP',
		'ConfFacebookTimestamps' : 'Прикажи Facebook маркер за времето (eg. "3 часа старо").',
		'ConfFBFTimestamps' : 'Додади HFP маркер за времето по Facebook маркерот за време (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Прикажи HFP маркер за време во 24-часовен формат.',
		'ConfFriendRequestCountInTitle' : 'Прикажи број од нови барања за пријатели на насловот на страницата.',
		'ConfGoogleApps' : 'Креирај Google Календар линкови компатибилни со Google Апликации.',
		'ConfGoogleAppsDomain' : 'Домен',
		'ConfGoogleCalendar' : 'Дидаду линкови за да додадеш роденден и настани во <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Јазик за <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Сокриј ги приказните за апликациите.',
		'ConfHideEventStories' : 'Сокриј ги приказните за настаните.',
		'ConfHideFriendStories' : 'Сокриј ги приказните за пријателите.',
		'ConfHideGroupStories' : 'Сокриј ги приказните за групите.',
		'ConfHideLikeStories' : 'Сокриј ги приказните за "ми се допаѓа".',
		'ConfHideLinkStories' : 'Сокриј ги приказните за линковите.',
		'ConfHideNoteStories' : 'Сокриј ги приказните за белешките.',
		'ConfHidePhotoStories' : 'Сокриј ги приказните за фотографиите.',
		'ConfHideProfilePicStories' : 'Сокриј ги приказните за профил фотографиите.',
		'ConfHideRead' : 'Сокриј работи во новостите одкако ќе бидат обележани за прочитаните.',
		'ConfHideRelationshipStories' : 'Сокриј ги приказните за статус-от за врска.',
		'ConfHideStatusStories' : 'Сокриј ги приказните за статусите.',
		'ConfHideVideoStories' : 'Сокриј ги приказните за видеата.',
		'ConfHideWallStories' : 'Сокриј ги приказните за ѕидот.',
		'ConfHomeChat' : 'Покажи Разговор секција.',
		'ConfHomeEvents' : 'Покажи Настани секција.',
		'ConfHomeFindFriends' : 'Покажи Поврзан со пријатели секција.',
		'ConfHomeLeftAlign' : 'Left-align the contents of the home page.',
		'ConfHomeLeftColumn' : 'Покажи ја левата колона.',
		'ConfHomeLeftColumnFixed' : 'Задржи ја левата колона видлива, по лизгањето надоле.',
		'ConfHomeLink' : 'Покажи Почетна линк во топ мени барот.',
		'ConfHomePeopleYouMayKnow' : 'Покажи Сугестии секција.',
		'ConfHomeNavigation' : 'Покажи Навигација секција.',
		'ConfHomePokes' : 'Покажи Боцкања секција.',
		'ConfHomeProfile' : 'Покажи Профил секција.',
		'ConfHomeRequests' : 'Покажи Барања секција.',
		'ConfHomeRightColumn' : 'Покажи десна колона.',
		'ConfHomeStretch' : 'Растегни ја Почетната страница на целата ширина на пребарувачот.',
		'ConfiCalendar' : 'Додади линкови за превземање на <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> датотека со сите родендени.',
		'ConfImport' : 'За да ги внесеш твоите прилагодувања подоцна, замени го текстот погоре со текстот кој ти е зачуван предходно и кликни "Внеси".',
		'ConfInboxCountInTitle' : 'Прикажи број на нови пораки во насловот на страницата.',
		'ConfLogoutLink' : 'Додади Одјави се линк во топ мени барот.',
		'ConfNotificationCountInTitle' : 'Прикажи број на нови нотификации во насловот на страницата.',
		'ConfNewTabSearch' : 'Направи ги отворени пребарувањата во нов таб/прозорец кога притискам CTRL + Enter за да барам.',
		'ConfPageTitle' : 'Избриши "Facebook |" од насловот на секоја страница.',
		'ConfPhotoPopup' : 'Скокачки поголеми верзии на фотографии при обележување со глувчето.',
		'ConfPopupAutoClose' : 'Затвори ги скокачките фотографии автоматски.',
		'ConfPopupSmartAutoClose' : 'Спречи автоматски исклучување на скокачките фотографии ако обележувачот на глувчето е над нив',
		'ConfPopupPosition' : 'Позиција за скокачки фотографии',
		'ConfProcessInterval' : 'Интервал за обработување страница, во милисекунди (поставено=1000):',
		'ConfProfileLink' : 'Прикажи Профил линк во топ мени барот.',
		'ConfProfilePicPopup' : 'Скокачки големи верзии на профил фотографии со обележување со глувчето',
		'ConfProtocolLinks' : 'Вклучи месинџер сметки на профилите со линкови за почеток на разговор со нив (Google Talk, Windows Live и тн).',
		'ConfSectionAbout' : 'За HFP',
		'ConfSectionAdvanced' : 'Напредно',
		'ConfSectionEvents' : 'Родендени/Настани',
		'ConfSectionImportExport' : 'Внеси/Изнеси',
		'ConfSectionFeeds' : 'Извори',
		'ConfSectionHomePage' : 'Почетна страница',
		'ConfSectionLiveFeed' : 'Новости',
		'ConfSectionMenu' : 'Мениа/Разговор',
		'ConfSectionOther' : 'Други Опции',
		'ConfSectionPageTitle' : 'Наслов на страница',
		'ConfSectionPictures' : 'Фотографии',
		'ConfSectionShortcuts' : 'Кратенки за тастатура',
		'ConfSecureLinks' : 'Сила на Facebook линковите до точка до HTTPS страници.',
		'ConfShortcutList' : '<b>Кратенки за тастатура</b> (case sensitive):<br /><br /><i>Од секоја страница:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Вклучи корисници (вклучени пријатели)<br />&nbsp;<b>C</b> - HFP Конфигурација<br />&nbsp;<b>D</b> - Родендени<br />&nbsp;<b>E</b> - Настани<br />&nbsp;<b>F</b> - Пријатели<br />&nbsp;<b>H</b> - Почетна страница<br />&nbsp;<b>I</b> - Сандаче<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show HFP debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by HFP<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Вклучи кратенки за тастатура.',
		'ConfSign' : 'Пркажи хороскопски значи на луѓе\-то на нивните профили (Ако ја објавиле таа информација).',
		'ConfTopBarFixed' : 'Зачувај го горниот мени бар на екранот секогаш, и по лизгањето доле.',
		'ConfTopBarHoverOpacity' : 'При обележување со глувчето',
		'ConfTopBarOpacity' : 'Проѕирност на горниот мени бар',
		'ConfUpdates' : 'Провери Userscripts.org дневно за надоградби во HFP. Или <a href="#" id="fbfUpdateLink" onclick="return false;">провери сега</a>.',
		'DownloadVideo' : 'Превземи Видео',
		'ExportICalendarFile' : 'Изнеси iCalendar датотека',
		'ExportICalendarFileWarning' : '(Тоа ќе потрае ако имаш многу пријатели)',
		'FacebookFixerConflict' : 'Facebook Fixer е сега HFP.<br /><br />За промена на име треба сами да го избришете Facebook Fixer од вашиот пребарувач, или двете скрипти ќе создаваат проблем една на друга.<br /><br />Ако не си сигурен како да ја избришеш скриптата, <a %s>кликни тука за инструкции</a>.',
		'fullAlbumLoaded' : 'целиот албум е вчитан',
		'Import' : 'Внеси',
		'ImportConfirm' : 'Дали си сигурен дека сакаш да ги внесеш овие прилагодувања?\nТвоите сегашни прилагодувања ќе бидат изгубени.',
		'ImportFailure' : 'се појави грешка додека ги внесуваше твоите прилагодувања.',
		'ImportSuccess' : 'Внесувањето е завршено. Дали сакаш да ја освежиш страницата?',
		'Left' : 'Лево',
		'LoadingAllPhotos' : 'Се вчитуваат сите фотографии...',
		'loadingFullAlbum' : 'Се вчитува целиот албум...',
		'LoadingPic' : 'Се вчитува фотографијата...',
		'LoadPhotosWarning' : 'Вчитувањето на сите фотографии може да потрае',
		'Months' : Array('Јануари','Фебруари','Март','Април','Мај','Јуни','Јули','Август','Септември','Октомври','Ноември','Декември'),
		'ProtocolSkype' : 'Јави се %s преку Skype',
		'ProtocolMSN' : 'Разговарај со %s преку Windows Live',
		'ProtocolYahoo' : 'Разговарај со %s преку Yahoo Messenger',
		'ProtocolGoogle' : 'Разговарај со %s преку Google Talk',
		'ReloadErrorPage' : 'Пробај повторно, или почекај 5 секунди',
		'Refresh' : 'Освежи',
		'Remove' : 'Избриши',
		'Right' : 'Десно',
		'ShowBigPictures' : 'Покажи големи фотографии',
		'Signs' : Array('Јарец','Водолија','Риби','Овен','Бик','Близнаци','Рак','Лав','Девица','Вага','Скорпија','Стрелец'),
		'today' : 'денес',
		'Translators' : 'Преведувачи',
		'UpdateAvailable1' : 'Достапна е надоградба за HFP',
		'UpdateAvailable2' : 'Дали сакаш да надоградиш сега?',
		'UpdateHomepage' : 'Оди на почетна',
		'UpdateInstall' : 'Инсталирај сега',
		'UpdateTomorrow' : 'Потсетиме утре',
		'yearsOld' : '%s години'
	},
	
	// Norwegian - Contributed by Eilif Nordseth (20100819)
	nb : {	
		'_language' : 'Norwegian',
		'AddToCalendar' : 'Legg til kalender',
		'AddToGoogleCalendar' : 'Legg til Google kalendar',
		'all' : 'alle',
		'All' : 'AllE',
		'AllPhotosLoaded' : 'Alle bilder lastet inn',
		'Automatic' : 'Automatisk',
		'Birthday' : '%s\'s fødselsdag',
		'BookmarkAdd' : 'Legg til nytt bokmerke',
		'BookmarkExists' : 'Det er allerede et bokmerke til denne siden.\n\nGå til siden du ønsker å bokmerke og forsøk igjen.',
		'BookmarkNamePrompt' : 'Legg inn et navn til dette bokmerketet:\n%s',
		'BookmarksConfirmRemoval' : 'Er du sikker på at du vil fjerne disse bokmerkene?',
		'BookmarksManage' : 'Behandle bokmerker',
		'BookmarksRemoveSelected' : 'Fjern valgte bokmerker',
		'Bookmarks' : 'Bokmerker',
		'BrowserUnsupported' : 'Nettleseren din støtter ikke dette valget.',                                 
		'CreatingFile' : 'Lager fil',
		'Close' : 'Lukk',
		'ConfigureFacebookFixer' : 'HFP - Alternativer',
		'ConfigureInstructions' : 'Alle endringer lagres umiddelbart, men noen forandringer virker ikke i faner som allerede er åpne.',
		'ConfAge' : 'Vis en person\'s alder på profilen (om de viser hele fødselsdatoen sin).',
		'ConfAlbumComments' : 'Legg til en lenke på album-sider for å vise alle kommentarene til albumet.',
		'ConfApplicationWhitelist' : 'Applikasjoner\'s Hvit-liste - Legg in ID\'ene til applikasjoner for å hindre at de blir skjult. Adskill ID\'er med mellomrom.',
		'ConfAutoBigAlbumPictures' : 'Automatisk vis større albumbilder når siden åpnes.',
		'ConfAutoLoadFullAlbum' : 'Automatisk last inn fimerkebilder for alle bildene i et album på ei enkel side.',
		'ConfAutoLoadTaggedPhotos' : 'Automatisk last inn fimerkebilder for alle merkede bilder på ei enkel side (bildefaner på personer\'s profiler).',
		'ConfAutoReadMore' : 'Automatisk klikk på "les mer"-lenker.',
		'ConfBigAlbumPictures' : 'Legg til ei lenke på album sider for kunne vise større versjoner av alle bildene på den siden.',
		'ConfBigAlbumPicturesBorder' : 'Add a border around bigger versions of pictures.',
		'ConfBottomBarHoverOpacity' : 'Ved mus-over',
		'ConfBottomBarOpacity' : 'Bunmeny-linjen\'s gjennomsiktighet',
		'ConfCalendarBirthDate' : 'Inkluder personen\'s fødselsdato i hendelsesdetaljer.',
		'ConfCalendarFullName' : 'Bruke personen\'s fulle navn som tittel til fødselsdager (istedenfor bare fornavn).',
		'ConfChatDifferentiate' : 'Bruke fete typer og kursiv til å skille mellom tilgjengelige og fraværende venner.',
		'ConfChatHideIdle' : 'Skjul frværende venner.',
		'ConfDelayPopupPics' : 'Legg inn en kort pause før sprettopp-bilder vises.',
		'ConfDelayPopupPicsTimeout' : 'Pause før sprettopp-bilder vises, i millisekunder (standard=500):',
		'ConfDownloadVideo' : 'Legg til en lenke for å kunne laste ned videoer fra video-sider. (Du kan få behov for en <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV-spiller</a>)',
		'ConfErrorPageReload' : 'Automatisk laste inn igjen en applikasjon\'s feilsider etter 5 sekunder.',
		'ConfExport' : 'For å eksportere oppsettet ditt, kopier teksten nedenfor og lagre den i en fil.',
		'ConfExternalPopup' : 'Sprettopp versjoner i full-størrelse av eksterne bilder. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Språk til HFP',
		'ConfFacebookTimestamps' : 'Vis Facebook tidsangivelse (eg. "3 timer siden").',
		'ConfFBFTimestamps' : 'Legg til HFP tidsangivelser etter Facebook tider (eg. "11:45").',
		'ConfFBFTimestamps24' : 'Vis HFP tidsangivelser i 24-timers format.',
		'ConfFriendRequestCountInTitle' : 'Vis antall nye venneforespørsler i sidetittelen.',
		'ConfGoogleApps' : 'Gjør Google kalender-lenker kompatible med Google Apps.',
		'ConfGoogleAppsDomain' : 'Domene',
		'ConfGoogleCalendar' : 'Legg inn lenker til Legg til Fødselsdager og Hendelser for <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google kalender</a>.',
		'ConfGoogleLanguage' : 'Språk for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Oversettelse</a>',
		'ConfHideApplicationStories' : 'Skjul applikasjonsoversikter.',
		'ConfHideEventStories' : 'Skjul hendelseoversikt.',
		'ConfHideFacebookCountInTitle' : 'Skjul Facebook\'s oppsummering av nye innboks-meldiger.',
		'ConfHideFriendStories' : 'Skjul venContribute by Ellen Rheineversikt.',
		'ConfHideGroupStories' : 'Skjul gruppeoversikt.',
		'ConfHideLikeStories' : 'Skjul liker-oversikt.',
		'ConfHideLinkStories' : 'Skjul lenke-oversikt.',
		'ConfHideNoteStories' : 'Skjul notat-oversikt.',
		'ConfHidePhotoStories' : 'Skjul bilde-oversikt.',
		'ConfHidePlaceStories' : 'Skjul steds-hendelser.',
		'ConfHideProfilePicStories' : 'Skjul profilbilde-oversikt.',
		'ConfHideRead' : 'Skjul objekter i aktiv Notis som er blitt markert som røde.',
		'ConfHideRelationshipStories' : 'Skjul Forhold-oversikt.',
		'ConfHideStatusStories' : 'Skjul Status-oversikt.',
		'ConfHideVideoStories' : 'Skjul Video-oversikt.',
		'ConfHideWallStories' : 'Skjul Vegg-oversikt.',
		'ConfHomeBeta' : 'Vis Beta Tester seksjonen.',
		'ConfHomeChat' : 'Vis  Chat-seksjonen.',
		'ConfHomeEvents' : 'Vis Hendelse-seksjonen.',
		'ConfHomeFindFriends' : 'Vis Koble til Venner-seksjonen.',
		'ConfHomeLeftAlign' : 'Venstrestill innhold på Hjem-siden.',
		'ConfHomeLeftColumn' : 'Vis venstre kolonne.',
		'ConfHomeLeftColumnFixed' : 'Behold den venstre kolonnen synlig, selv etter rulling nedover.',
		'ConfHomeLink' : 'Vis Hjem-lenken i toppmeny-feltet.',
		'ConfHomeNavigation' : 'Vis Navigasjons-seksjonen.',
		'ConfHomePokes' : 'Vis Pokes-seksjonen.',
		'ConfHomeProfile' : 'Vis Profil-seksjonen.',
		'ConfHomeRecommendations' : 'Vis anbefalinger (Personer du kanskje kjenner, anbefalte sider etc).',
		'ConfHomeRequests' : 'Vi Forespørsel-seksjonen.',
		'ConfHomeRightColumn' : 'Vis høyre kolonne.',
		'ConfHomeStretch' : 'Strekk siden Hjem til netteleserens vidde fullt ut.',
		'ConfHomeStretchComments' : 'Strekk kommentarfeltene på Hjem-sida.',
		'ConfiCalendar' : 'Legg lenke til Laste ned en <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> fil med alle fødselsdagene.',
		'ConfImport' : 'For å kunne importere oppsettet ditt senere, skriver du over teksten nedenfor med teksten du lagret idligere og klikk "Import".',
		'ConfInboxCountInTitle' : 'Vis antall nye innboks-meldinger på tittellinjen til siden.',
		'ConfLogoutLink' : 'Legg til en Logg-ut lenke på topp-meny linjen.',
		'ConfNotificationCountInTitle' : 'Vis antall nye Varsler i sidetittelen.',
		'ConfNewTabSearch' : 'La søkeresultatet åpnes i ny fane/vindu ved søk med trykk av CTRL + Enter.',
		'ConfPageTitle' : 'Fjern "Facebook |" fra tittelen på hver side.',
		'ConfPhotoPopup' : 'Sprettopp større versjoner av bilder ved mus-over.',
		'ConfPopupAutoClose' : 'Lukk sprettopp-bilder automatisk.',
		'ConfPopupSmartAutoClose' : 'Hindre sprettopp-bilder i å lukkes automatisk om musen er over det.',
		'ConfPopupPosition' : 'Posisjon for sprettopp-bilder',
		'ConfProcessInterval' : 'Intervall for å lage siden, i millisekund (standard=1000):',
		'ConfProfileLink' : 'Vis Profil-lenken i toppmeny linjen.',
		'ConfProfilePicPopup' : 'Sprettopp større versjoner av profil-bilder ved musover',
		'ConfProtocolLinks' : 'Endre meldings ID\'er på profiler til lenker som starter en dialog med dem (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Om HFP',
		'ConfSectionAdvanced' : 'Avansert',
		'ConfSectionEvents' : 'Fødselsdager/Hendelser',
		'ConfSectionImportExport' : 'Import/Eksport',
		'ConfSectionFeeds' : 'Notiser',
		'ConfSectionHomePage' : 'Hjem side',
		'ConfSectionLiveFeed' : 'Aktive Notiser',
		'ConfSectionMenu' : 'Menyer/Chat',
		'ConfSectionOther' : 'Andre alternativer',
		'ConfSectionPageTitle' : 'Sidetittel',
		'ConfSectionPictures' : 'Bilder',
		'ConfSectionShortcuts' : 'Tastatur-Snarveier',
		'ConfSecureLinks' : 'La Facebook lenker peke til HTTPS sider.',
		'ConfShortcutList' : '<b>Tastatur-Snarveier</b> (små/store sensitive):<br /><br /><i>Fra hvilken som helst side:</i><br /> <b>A</b> - Album/bilder<br /> <b>B</b> - Handtere venneliste (nettvenner)<br /> <b>C</b> - HFP oppsett<br /> <b>D</b> - Fødselsdager<br /> <b>E</b> - Hendelser<br /> <b>F</b> - Venner<br /> <b>H</b> - Hjem side<br /> <b>I</b> - Innboks<br /> <b>K</b> - Legg til Bokmerke<br /> <b>L</b> - Velg Logg ut lenken (trykk Enter etterpå for å logge ut)<br /> <b>N</b> - Varsler<br /> <b>P</b> - Din Profil<br /> <b>R</b> - Forespørsler<br /> <b>S</b> - Hopp til søkefeltet<br /> <b>T</b> - Oversett valgt tekst<br /> <b>?</b> - Vis HFP\'s feilrette-info<br /> <b><escape></b> - Lukk sprettopp\'er laget av HFP<br /><br /><i>Fra Hjem siden (filtere)</i>:<br /> <b>a</b> - Sider<br /> <b>f</b> - Aktiv Notis<br /> <b>g</b> - Grupper<br /> <b>l</b> - Lenker<br /> <b>n</b> - Nyhets Notiser<br /> <b>p</b> - Bilder<br /> <b>s</b> eller <b>u</b> - Status-Oppdateringer<br /> <b>t</b> - Notater<br /> <b>v</b> - Videoer<br /><br /><i>Fra profiler</i>:<br /> <b>i</b> - Info<br /> <b>p</b> - Bilder<br /> <b>w</b> - Vegg<br /> <b>x</b> - Bokser<br /><br /><i>Fra sider med nummerering (forrige, neste, etc)</i><br /> <b><venstre pil></b> - Forrige<br /> <b><høyre pil></b> - Neste<br /> <b><shift> + <venstre pil></b> - Første (når tilgjengelig)<br /> <b><shift> + <høyre pil></b> - Siste (når tilgjengelig)<br /><br /><i>Mens man ser på album/bilder:</i><br /> <b>a</b> - Last alle frimerkebilder (når tilgjengelig)<br /> <b>b</b> - Vis store bilder<br /> <b>c</b> - Se på kommentarer<br /> <b>k</b> - Tilbake til album<br /> <b>m</b> - Bilder av (person) og meg<br /><br /><i>Mens man ser på siste album og opplastede/merkede bilder:</i><br /> <b>a</b> eller  <b>r</b> - Siste Album<br /> <b>m</b> eller  <b>u</b> - Mobile opplastinger<br /> <b>o</b> - Bilder av meg<br /> <b>p</b> - Mine bilder<br /> <b>t</b> eller  <b>f</b> - Merkede venner',
		'ConfShortcuts' : 'Aktiver tastatur-snarveier.',
		'ConfSign' : 'Vis en person\'s stjernetegn på profilen (om de oppgir fødselsdatoen sin).',
		'ConfTopBarFixed' : 'Behold alltid toppmeny-linjen på skjermen, til og med etter rulling nedover.',
		'ConfTopBarHoverOpacity' : 'Ved mus-over',
		'ConfTopBarOpacity' : 'Toppmenyens gjennomsiktighet',
		'ConfUpdates' : 'Sjekk Userscripts.org daglig etter oppdateinger til HFP. Eller <a href="#" id="fbfUpdateLink" onclick="return false;">sjekk nå</a>.',
		'DownloadVideo' : 'Last ned video',
		'ExportICalendarFile' : 'Eksporter iCalendar fil',
		'ExportICalendarFileWarning' : '(Dette vil ta ei stund om du har mange venner)',
		'FacebookFixerConflict' : 'Facebook Fixer er nå kjent som HFP.<br /><br />På grunn av navnebyttet må du manuelt avinstallere Facebook Fixer fra nettleseren din, ellers vil de to scriptene komme i konflikt med hverandre.<br /><br />Dersom du ikke er sikker på hvordan man avinstallerer et brukerscript, <a %s>klikk her for instruksjoner</a>.',
		'fullAlbumLoaded' : 'hele album lastet',
		'Import' : 'Importer',
		'ImportConfirm' : 'Er du sikker på at du vil importere dette oppsettet?\nDine nåværende valg vil bli tapt.',
		'ImportFailure' : 'En feil oppstod mmens oppsettet ditt ble forsøkt importert.',
		'ImportSuccess' : 'Importering fullført. Ønsker du å oppfriske siden?',
		'Left' : 'Venstre',
		'LoadingAllPhotos' : 'Laster alle bilder...',
		'loadingFullAlbum' : 'Laster hele album...',
		'LoadingPic' : 'Laster bilde...',
		'LoadPhotosWarning' : 'Laste alle bilder kan ta lang tid',
		'Months' : new Array('Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'),
		'ProtocolSkype' : 'Ring %s ved å bruke Skype',
		'ProtocolMSN' : 'Chat med %s ved å bruke Windows Live',
		'ProtocolYahoo' : 'Chat med %s ved å bruke Yahoo Messenger',
		'ProtocolGoogle' : 'Chat med %s ved å bruke Google Talk',
		'ReloadErrorPage' : 'Klikk for å forsøke på nytt, eller vent 5 sekunder',
		'Refresh' : 'Oppfrisk',
		'Remove' : 'Fjern',
		'Right' : 'Høyre',
		'ShowBigPictures' : 'Vis store bilder',
		'Signs' : new Array('Steinbukken','Vannmannen','Fiskene','Væren','Tyren','Tvillingene','Krepsen','Løven','Jomfruen','Vekten','Skorpionen','Skytten'),
		'today' : 'i dag',
		'Translators' : 'Oversettere',
		'UpdateAvailable1' : 'En oppdatering til HFP er tilgjengelig',
		'UpdateAvailable2' : 'Vil du oppdatere nå?',
		'UpdateHomepage' : 'Gå til hjem siden',
		'UpdateInstall' : 'Installer nå',
		'UpdateTomorrow' : 'Minn meg på om dette i morgen',
		'ViewAlbumComments' : 'Vis album-kommentarer',
		'yearsOld' : '%s år gammel'
	},

	// Korean - Contributed by 박상빈 (20100823)
	ko : {
		'_language' : 'Korean',
		'AddToCalendar' : '달력에 추가',
		'AddToGoogleCalendar' : '구글 캘린더에 추가',
		'all' : '전체',
		'All' : '모든 사진',
		'AllPhotosLoaded' : '모든 사진을 로드했습니다',
		'Automatic' : '자동',
		'Birthday' : '%s\의 생일',
		'BookmarkAdd' : '즐겨찾기에 추가',
		'BookmarkExists' : '이 페이지는 이미 즐겨찾기 되어 있습니다.\n\n즐겨찾기 하실 페이지로 가서 다시 시도하세요.',
		'BookmarkNamePrompt' : '즐겨찾기 이름:\n%s',
		'BookmarksConfirmRemoval' : '다음의 즐겨찾기를 정말로 지우시겠습니까?',
		'BookmarksManage' : '즐겨찾기 관리',
		'BookmarksRemoveSelected' : '선택한 즐겨찾기 삭제',
		'Bookmarks' : '즐겨찾기',
		'BrowserUnsupported' : '이 기능은 현재 브라우저에서는 작동하지 않습니다.',
		'CreatingFile' : '파일 만드는 중',
		'Close' : '닫기',
		'ConfigureFacebookFixer' : 'HFP 설정',
		'ConfigureInstructions' : ' HFP is a program of Texnolize Software developed by Rui Fujiwara, Website to looking review this application: http://ruifujiwara.co.cc.',
		'ConfAge' : '친구의 프로필에 친구의 나이 표시 (생년월일을 공개한 경우).',
		'ConfAlbumComments' : '사진첩 페이지에 "사진첩에 달린 댓글 모두보기" 링크 더하기.',
		'ConfApplicationWhitelist' : '허용된 어플리케이션 - 숨기지 않을 어플리케이션의 ID를 입력하세요. ID 사이는 스페이스로 나눔.',
		'ConfAutoBigAlbumPictures' : '사진 페이지에 큰 사진첩 사진을 보이기.',
		'ConfAutoLoadFullAlbum' : '사진첩 페이지에 모든 사진을 한번에 보이기.',
		'ConfAutoLoadTaggedPhotos' : '사진 페이지에 태그달린 모든 사진을 보이기.',
		'ConfAutoReadMore' : '"지난 게시물" 링크를 자동으로 누르기.',
		'ConfBigAlbumPictures' : '사진첩 페이지에 "큰 사진 보기" 링크 더하기.',
		'ConfBottomBarHoverOpacity' : '마우스 커서를 올려놨을때',
		'ConfBottomBarOpacity' : '아래 표시줄의 투명도',
		'ConfCalendarBirthDate' : '이벤트의 추가정보에 친구의 생일 보이기.',
		'ConfCalendarFullName' : '생일을 표시할때 성과 이름을 모두 표시하기 (기본은 성을 표시하지 않음).',
		'ConfChatDifferentiate' : '자리비움 상태인 친구와 온라인 상태인 친구를 이탤릭체와 굵은 글씨로 구분하기.',
		'ConfChatHideIdle' : '자리비움 상태의 친구는 숨기기.',
		'ConfDelayPopupPics' : '조금 기다렸다가 팝업 사진 보이기.',
		'ConfDelayPopupPicsTimeout' : '팝업 사진을 보이기 전까지의 대기 시간, 1/1000초 단위 (기본은 500):',
		'ConfDownloadVideo' : '비디오 페이지에 다운로드 링크 더하기. (<a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV 플레이어</a>가 필요할수도 있습니다)',
		'ConfErrorPageReload' : '어플리케이션 오류 페이지를 5초 후에 자동으로 새로고침.',
		'ConfExport' : '설정사항을 내보내고 싶으시면 아래의 텍스트를 복사해서 파일에 저장하십시오.',
		'ConfExternalPopup' : '마우스 커서를 외부 사진에 올리면 을 큰 팝업 사진을 보이기. <sup>베타</sup>',
		'ConfFacebookFixerLanguage' : 'HFP에 사용할 언어',
		'ConfFacebookTimestamps' : 'Facebook 형식의 타임스탬프 보이기 (예. "약 3시간 전").',
		'ConfFBFTimestamps' : 'HFP 형식의 타임스탬프를 Facebook 타임스탬프 뒤에 보이기 (예. "11:45").',
		'ConfFBFTimestamps24' : 'HFP 타임스탬프를 24시간 형식으로 보이기.',
		'ConfFriendRequestCountInTitle' : '페이지 제목에 친구 요청 갯수 보이기.',
		'ConfGoogleApps' : '구글 Apps와 호환되는 구글 캘린더 링크 만들기.',
		'ConfGoogleAppsDomain' : '도메인',
		'ConfGoogleCalendar' : '생일과 이벤트를 <a href="http://www.google.com/support/calendar/bin/topic.py?hl=kr&topic=13732" target="_blank">구글 캘린더</a>에 추가하는 링크 더하기.',
		'ConfGoogleLanguage' : '<a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">구글 번역</a>에 사용할 언어',
		'ConfHideApplicationStories' : '어플리케이션 게시물 숨기기.',
		'ConfHideEventStories' : '이벤트 게시물 숨기기.',
		'ConfHideFacebookCountInTitle' : 'Facebook의 쪽지 갯수 숨기기.',
		'ConfHideFriendStories' : '친구들의 게시물 숨기기.',
		'ConfHideGroupStories' : '그룹 게시물 숨기기.',
		'ConfHideLikeStories' : '"좋아요" 게시물 숨기기.',
		'ConfHideLinkStories' : '링크 게시물 숨기기.',
		'ConfHideNoteStories' : '노트 게시물 숨기기.',
		'ConfHidePhotoStories' : '사진 게시물 숨기기.',
		'ConfHideProfilePicStories' : '프로필 사진 게시물 숨기기.',
		'ConfHideRead' : '최신글 목록에서 읽은 게시물 숨기기.',
		'ConfHideRelationshipStories' : '결혼/연애 게시물 숨기기.',
		'ConfHideStatusStories' : '"내 상태" 게시물 숨기기.',
		'ConfHideVideoStories' : '비디오 게시물 숨기기.',
		'ConfHideWallStories' : '담벼락 게시물 숨기기.',
		'ConfHomeBeta' : 'Facebook Sneak Peek 보이기.',
		'ConfHomeChat' : '채팅 보이기.',
		'ConfHomeEvents' : '이벤트 보이기.',
		'ConfHomeFindFriends' : '연결하기 보이기.',
		'ConfHomeLeftAlign' : '첫 페이지를 왼쪽으로 정렬.',
		'ConfHomeLeftColumn' : '왼쪽 메뉴 보이기.',
		'ConfHomeLeftColumnFixed' : '아래로 스크롤 한 후에도 왼쪽 메뉴 보이기.',
		'ConfHomeLink' : '맨 위 메뉴 표시줄에 "첫 페이지" 링크 보이기.',
		'ConfHomeNavigation' : '네비게이션 메뉴 보이기.',
		'ConfHomePokes' : 'Pokes 보이기.',
		'ConfHomeProfile' : '프로필 보이기.',
		'ConfHomeRecommendations' : '추천 보이기.',
		'ConfHomeRequests' : '요청 보이기.',
		'ConfHomeRightColumn' : '오른쪽 메뉴 보이기.',
		'ConfHomeStretch' : '브라우저의 가로 크게에 맞게 첫 페이지 내용을 늘이기 .',
		'ConfHomeStretchComments' : '브라우저의 가로 크기에 맞게 댓글을 늘이기.',
		'ConfiCalendar' : '모든 생일을 <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> 파일로 받는 링크 더하기.',
		'ConfImport' : '설정사항을 가져오고 싶으시면 저장한 텍스트를 아래에 붙인 후 "가져오기"를 누르십시오.',
		'ConfInboxCountInTitle' : '페이지 제목에 새 쪽지 갯수 보이기.',
		'ConfLogoutLink' : '맨 위 메뉴 표시줄에 로그아웃 링크 더하기.',
		'ConfNotificationCountInTitle' : '페이지 제목에 새 알림 갯수 보이기.',
		'ConfNewTabSearch' : '검색창에서 CTRL+엔터 키를 누르면 새 탭/창에 검색결과를 보이기.',
		'ConfPageTitle' : '"Facebook |"을 페이지 제목에서 없애기.',
		'ConfPhotoPopup' : '마우스 커서를 프로필 사진에 올리면 큰 팝업 사진을 보이기.',
		'ConfPopupAutoClose' : '자동으로 팝업 사진 닫기.',
		'ConfPopupSmartAutoClose' : '마우스 커서를 올리고 있으면 팝업사진을 자동으로 닫지 않기.',
		'ConfPopupPosition' : '팝업 사진 위치',
		'ConfProcessInterval' : '페이지를 처리하는 간격, 1/1000초 단위 (기본은 1000):',
		'ConfProfileLink' : '맨 위 메뉴 표시줄에 프로필 링크 보이기.',
		'ConfProfilePicPopup' : '마우스 커서를 사진에 올리면 큰 팝업 사진을 보이기.',
		'ConfProtocolLinks' : '프로필에 있는 메신저 ID(구글토크, 윈도우 라이브 메신저, 등)를 메신저를 통해 대화를 시작하는 링크로 변환하기.',
		'ConfSectionAbout' : 'HFP는...',
		'ConfSectionAdvanced' : '고급',
		'ConfSectionEvents' : '생일/이벤트',
		'ConfSectionImportExport' : '가져오기/내보내기',
		'ConfSectionFeeds' : '게시물',
		'ConfSectionHomePage' : '첫 페이지',
		'ConfSectionLiveFeed' : '최신글',
		'ConfSectionMenu' : '메뉴/채팅',
		'ConfSectionOther' : '그 외 설정',
		'ConfSectionPageTitle' : '페이지 제목',
		'ConfSectionPictures' : '사진',
		'ConfSectionShortcuts' : '키보드 단축키',
		'ConfSecureLinks' : '항상 HTTPS를 통해 Facebook을 사용하기.',
		'ConfShortcutList' : '<b>키보드 단축키</b> (대소문자 구분):<br /><br /><i>모든 페이지에서 작동</i>:<br />&nbsp;<b>A</b> - 사진첩/사진<br />&nbsp;<b>B</b> - 접속된 친구 보이기/숨기기<br />&nbsp;<b>C</b> - HFP 설정<br />&nbsp;<b>D</b> - 생일<br />&nbsp;<b>E</b> - 이벤트<br />&nbsp;<b>F</b> - 친구<br />&nbsp;<b>H</b> - 첫 페이지<br />&nbsp;<b>I</b> - 쪽지<br />&nbsp;<b>K</b> - 즐겨찾기 더하기<br />&nbsp;<b>L</b> - 로그아웃 링크를 선택 (그다음 엔터키를 누르면 로그아웃)<br />&nbsp;<b>N</b> - 알림<br />&nbsp;<b>P</b> - 내 프로필<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - 검색 필드로 커서 이동<br />&nbsp;<b>T</b> - 선택한 텍스트를 번역<br />&nbsp;<b>?</b> - HFP 디버그 정보 보기<br />&nbsp;<b>&lt;ESC&gt;</b> - HFP 팝업 사진 닫기<br /><br /><i>홈페이지에서 작동(필터)</i>:<br />&nbsp;<b>a</b> - 페이지<br />&nbsp;<b>f</b> - 최신글<br />&nbsp;<b>g</b> - 그룹<br />&nbsp;<b>l</b> -링크<br />&nbsp;<b>n</b> - 뉴스 피드<br />&nbsp;<b>p</b> - 사진<br />&nbsp;<b>s</b> 또는 <b>u</b> - 상태 업데이트<br />&nbsp;<b>t</b> - 노트<br />&nbsp;<b>v</b> - 비디오<br /><br /><i>프로필 페이지에서 작동</i>:<br />&nbsp;<b>i</b> - 정보<br />&nbsp;<b>p</b> - 사진<br />&nbsp;<b>w</b> - 담벼락<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>이동이 가능한 페이지에서 작동(이전, 다음, 등)</i>:<br />&nbsp;<b>&lt;←&gt;</b> - 이전<br />&nbsp;<b>&lt;→&gt;</b> - 다음<br />&nbsp;<b>&lt;Shift&gt; + &lt;←&gt;</b> - 처음 (가능할때만)<br />&nbsp;<b>&lt;Shift&gt; + &lt;→&gt;</b> - 마지막 (가능할때만)<br /><br /><i>사진첩/사진을 볼때 작동</i>:<br />&nbsp;<b>a</b> - 모든 썸네일 보기 (가능할때만)<br />&nbsp;<b>b</b> - 큰 사진 보이기<br />&nbsp;<b>c</b> - 댓글 보기<br />&nbsp;<b>k</b> - 사진첩으로 돌아가기<br />&nbsp;<b>m</b> - 내가(또는 친구가) 나온 사진<br /><br /><i>최근 사진첩이나 업로드/태그된 사진을 볼때 작동:</i><br />&nbsp;<b>a</b> 또는 &nbsp;<b>r</b> - 최근 사진첩<br />&nbsp;<b>m</b> 또는 <b>u</b> - 모바일 업로드<br />&nbsp;<b>o</b> - 내가 나온 사진<br />&nbsp;<b>p</b> -내 사진<br />&nbsp;<b>t</b> 또는 <b>f</b> - 태그 된 친구들',
		'ConfShortcuts' : '키보드 단축키 사용.',
		'ConfSign' : '친구의 프로필에 친구의 별자리 표시 (생년월일을 공개한 경우).',
		'ConfTopBarFixed' : '맨 위 메뉴 표시줄을 아래로 스크롤 한 후에도 보이기.',
		'ConfTopBarHoverOpacity' : '마우스 커서를 올려놨을때',
		'ConfTopBarOpacity' : '맨 위 메뉴 표시줄의 투명도',
		'ConfUpdates' : '매일 Userscripts.org에서 HFP 업데이트를 확인하기. <a href="#" id="fbfUpdateLink" onclick="return false;">지금 확인</a>.',
		'DownloadVideo' : '비디오 다운로드',
		'ExportICalendarFile' : 'iCalender 파일로 가져오기',
		'ExportICalendarFileWarning' : '(친구가 많으면 오래 걸릴 수 있습니다)',
		'FacebookFixerConflict' : 'Facebook Fixer의 이름이 HFP로 바뀌었습니다.<br /><br />Facebook Fixer을 브라우저에서 제거하지 않으면 이름 변경 때문에 충돌이 일어납니다.<br /><br />userscript를 제거하는 방법을 모르겠으면 <a %s>여기를 참조하세요</a>.',
		'fullAlbumLoaded' : '앨범 전체가 로딩됨',
		'Import' : '가져오기',
		'ImportConfirm' : '정말로 설정을 가져오시겠습니까?\n현재 설정은 삭제됩니다.',
		'ImportFailure' : '설정을 가져오는 도중 에러가 났습니다.',
		'ImportSuccess' : '성공적으로 설정을 가져왔습니다. 새로고침 하시겠습니까?',
		'Left' : '왼쪽',
		'LoadingAllPhotos' : '모든 사진을 로딩중...',
		'loadingFullAlbum' : '앨범 전체를 로딩중...',
		'LoadingPic' : '사진 로딩중...',
		'LoadPhotosWarning' : '모든 사진을 로딩하는데 시간이 오래 걸릴 수 있습니다',
		'Months' : new Array('1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'),
		'ProtocolSkype' : 'Skype로 %s와 전화하기',
		'ProtocolMSN' : 'Windows Live로 %s와 채팅하기',
		'ProtocolYahoo' : '야후 메신저로 %s와 채팅하기',
		'ProtocolGoogle' : '구글 토크로  %s와 채팅하기',
		'ReloadErrorPage' : '재시도 하려면 클릭하거나 5초를 기다리세요',
		'Refresh' : '새로고침',
		'Remove' : '제거',
		'Right' : '오른쪽',
		'ShowBigPictures' : '큰 사진 보기',
		'Signs' : new Array('염소자리','물병자리','물고기자리','양자리','황소자리','쌍둥이자리','게자리','사자자리','처녀자리','천칭자리','전갈자리','궁수자리'),
		'today' : '오늘',
		'Translators' : '번역한 사람',
		'UpdateAvailable1' : 'HFP 업데이트가 나왔습니다',
		'UpdateAvailable2' : '지금 업데이트 할까요?',
		'UpdateHomepage' : '홈페이지로 가기',
		'UpdateInstall' : '지금 인스톨 하기',
		'UpdateTomorrow' : '내일 다시 확인',
		'ViewAlbumComments' : '사진첩에 달린 댓글 모두보기',
		'yearsOld' : '%s살'
	},
	
	// Vietnamese - Contributed by Trần Đức Thịnh (20100104)
	// Hi vọng nhận được góp ý của mọi người về bản dịch, email: tranducthinh4102@gmail.com
	vi : {
		'_language' : 'Tiếng Việt',
		'AddToCalendar' : 'Thêm vào lịch',
		'AddToGoogleCalendar' : 'Thêm vào lịch của Google',
		'all' : 'tất cả',
		'All' : 'Tất cả',
		'AllPhotosLoaded' : 'Tải tất cả các bức ảnh',
		'Automatic' : 'Tự động',
		'Birthday' : 'sinh nhật của %s',
		'BookmarkAdd' : 'Thêm Bookmark mới',
		'BookmarkExists' : 'Trang này đã được đánh dấu.\n\nTruy cập vào trang bạn muốn đánh dấu và thử lại.',
		'BookmarkNamePrompt' : 'Đặt tên cho trang đánh dấu này:\n%s',
		'BookmarksConfirmRemoval' : 'Bạn muốn xóa các bookmark đã chọn?',
		'BookmarksManage' : 'Quản lý Bookmarks',
		'BookmarksRemoveSelected' : 'Xóa các Bookmarks đã chọn',
		'Bookmarks' : 'Bookmarks',
		'BrowserUnsupported' : 'Trình duyệt của bạn không hỗ trợ tính năng này.',
		'CreatingFile' : 'Tạo tập tin',
		'Close' : 'Đóng',
		'ConfigureFacebookFixer' : 'Cài đặt HFP',
		'ConfigureInstructions' : 'Mọi thiết lập sẽ được lưu ngay lập tức, nhưng một số thay đổi không có tác dụng trong các thẻ đang mở.',
		'ConfAge' : 'Hiển thị tuổi của một người trong thông tin của họ (nếu họ cung cấp ngày sinh đầy đủ).',
		'ConfAlbumComments' : 'Thêm một liên kết để hiển thị tất cả các bình luận về album ở phía trên album',
		'ConfApplicationWhitelist' : 'Danh sách trắng các ứng dụng - Nhập ID của các ứng dụng để nó không bị ẩn. Các ID cách nhau bởi khoảng trắng (dấu cách).',
		'ConfAutoBigAlbumPictures' : 'Tự động hiển thị hình ảnh lớn hơn khi trang web mở ra.',
		'ConfAutoLoadFullAlbum' : 'Tự động tải thumbnails của tất cả hình ảnh của album trong một trang web.',
		'ConfAutoLoadTaggedPhotos' : 'Tự động tải thumbnnails cho tất cả các hình ảnh được tag trong một trang (the photos tab on people\'s profiles).',
		'ConfAutoReadMore' : 'Tự động click vào liên kết "see more".',
		'ConfBigAlbumPictures' : 'Thêm liên kết trên các album để hiển thị các phiên bản lớn hơn của các hình ảnh trên trang đó',
		'ConfBigAlbumPicturesBorder' : 'Thêm viền xung quanh phiên bản lớn hơn của hình ảnh',
		'ConfBottomBarHoverOpacity' : 'Khi chuột ở trên',
		'ConfBottomBarOpacity' : 'Độ trong suốt của thanh thực đơn phía dưới',
		'ConfCalendarBirthDate' : 'Bao gồm ngày sinh trong những chi tiết sự kiện.',
		'ConfCalendarFullName' : 'Sử dụng tên đầy đủ như tiêu đề cho ngày sinh (thay vì chỉ là tên).',
		'ConfChatDifferentiate' : 'Sử dụng chữ in đậm và in nghiêng để phân biệt bạn bè đang online và đang rỗi.',
		'ConfChatHideIdle' : 'Ẩn những bạn bè đang rỗi.',
		'ConfDelayPopupPics' : 'Thêm một khoảng trễ trước khi hiển thị hình ảnh bung ra.',
		'ConfDelayPopupPicsTimeout' : 'Thời gian trước khi hiển thị hình ảnh bung ra, trong mili giây (mặc định=500):',
		'ConfDownloadVideo' : 'Thêm một liên kết để tải xuống các video thừ các trang video. (Bạn có thể cần một <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">chương trình chơi FLV</a>)',
		'ConfErrorPageReload' : 'Tự động tải lại những trang ứng dụng lỗi sau 5 giây.',
		'ConfExport' : 'Để trích xuất các thiết lập của bạn, sao chép đoạn văn bản dưới đây và lưu nó trong một tập tin.',
		'ConfExternalPopup' : 'Phiên bản đúng kích cỡ của hình ảnh. <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'Ngôn ngữ cho HFP',
		'ConfFacebookTimestamps' : 'Hiện mốc thời gian của facebook (ví dụ: "3 hours ago").',
		'ConfFBFTimestamps' : 'Thêm mốc thời gian của HFP sau mốc thời gian của Facebook (ví dụ: "11:45").',
		'ConfFBFTimestamps24' : 'Hiển thị mốc thời gian của HFP dạng 24 giờ.',
		'ConfFriendRequestCountInTitle' : 'Hiển thị số yêu cầu kết bạn trong tiêu đề của trang.',
		'ConfGoogleApps' : 'Tạo Google Calendar tương thích với Google Apps',
		'ConfGoogleAppsDomain' : 'Domain',
		'ConfGoogleCalendar' : 'Thêm liên kết để thêm ngày sinh và các sự kiện cho <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
		'ConfGoogleLanguage' : 'Language for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
		'ConfHideApplicationStories' : 'Ẩn lịch sử của các ứng dụng.',
		'ConfHideEventStories' : 'Ẩn lịch sử các sự kiện.',
		'ConfHideFacebookCountInTitle' : 'Ẩn số tin nhắn trong hộp thư đến của  Facebook.',
		'ConfHideFriendStories' : 'Ẩn lịch sử của bạn bè.',
		'ConfHideGroupStories' : 'Ẩn lịch sử của nhóm.',
		'ConfHideLikeStories' : 'Ẩn lịch sử "Thích".',
		'ConfHideLinkStories' : 'Ẩn lịch sử của liên kết.',
		'ConfHideNoteStories' : 'Ẩn lịch sử của ghi chú.',
		'ConfHidePhotoStories' : 'Ẩn lịch sử của hình ảnh.',
		'ConfHidePlaceStories' : 'Ẩn lịch sử của địa chỉ.',
		'ConfHideProfilePicStories' : 'Ẩn lịch sử của hình ảnh profile.',
		'ConfHideRead' : 'Ẩn những mục trong feed đã đánh dấu là đã đọc.',
		'ConfHideRelationshipStories' : 'Ẩn lịch sử quan hệ.',
		'ConfHideStatusStories' : 'Ẩn lịch sử trạng thái.',
		'ConfHideVideoStories' : 'Ản lịch sử video.',
		'ConfHideWallStories' : 'Ẩn lịch sử của tường.',
		'ConfHomeBeta' : 'Hiển thị Facebook Sneak Peek.',
		'ConfHomeChat' : 'Hiển thị Chat.',
		'ConfHomeEvents' : 'Hiển thị Events.',
		'ConfHomeFindFriends' : 'Hiển thị Kết Nối.',
		'ConfHomeLeftAlign' : 'Căn trái nội dung của trang chủ.',
		'ConfHomeLeftColumn' : 'Hiển thị cột bên trái.',
		'ConfHomeLeftColumnFixed' : 'Hiển thị cột bên trái, ngay cả khi cuộn xuống.',
		'ConfHomeLink' : 'Hiển thị liên kết "Trang Chủ" trong thanh thực đơn trên cùng.',
		'ConfHomeNavigation' : 'Hiển thị Danh Mục',
		'ConfHomePokes' : 'Hiển thị Pokes',
		'ConfHomeProfile' : 'Hiển thị "Thông tin".',
		'ConfHomeRecommendations' : 'Hiển thị recommendations (People You May Know, Recommended Pages etc).',
		'ConfHomeRequests' : 'Hiển thị Requests.',
		'ConfHomeRightColumn' : 'Hiển thị cột bên phải.',
		'ConfHomeStretch' : 'Hiển thị trang chủ hết chiều rộng của trình duyệt',
		'ConfHomeStretchComments' : 'Kéo căng những bình luận trên trang chủ',
		'ConfiCalendar' : 'Thêm liên kết để tải về một tập tin <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> có tất cả ngày sinh.',
		'ConfImport' : 'Để nhập các thiết lập của bạn, ghi đè lên đoạn văn bản dưới đây bằng các đoạn bạn đã lưu trước đó và kích vào nút "Nhập Vào".',
		'ConfInboxCountInTitle' : 'Hiển thị số tin nhắn trong hộp thư đến trên tiêu đề trang.',
		'ConfLogoutLink' : 'Thêm một liên kết "Đăng xuất" vào thanh trình đơn trên cùng.',
		'ConfNotificationCountInTitle' : 'Hiển thị số thông báo mới trong tiêu đề trang.',
		'ConfNewTabSearch' : 'Để kết quả tìm kiếm mở trong một thẻ/cửa sổ mới khi nhấn Ctrl + Enter khi tìm kiếm',
		'ConfPageTitle' : 'Xóa "Facebook |" khỏi tiêu đề của mọi trang.',
		'ConfPhotoPopup' : 'Bung ra bản lớn hơn của những bức ảnh khi để chuột ở trên hình ảnh.',
		'ConfPopupAutoClose' : 'Tự động đóng hình ảnh bung ra.',
		'ConfPopupSmartAutoClose' : 'Không tự động đóng hình ảnh đã bung ra khi con chuột ở trên nó.',
		'ConfPopupPosition' : 'Vị trí bung hình ảnh',
		'ConfProcessInterval' : 'Khoảng thời gian để xử lý các trang, tính bằng mili giây (mặc định =1000):',
		'ConfProfileLink' : 'Hiển thị liên kết "Trang cá nhân" trên thanh trình đơn trên cùng.',
		'ConfProfilePicPopup' : 'Bung ra hình ảnh của ảnh cá nhân khi để chuột ở trên ảnh',
		'ConfProtocolLinks' : 'Turn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
		'ConfSectionAbout' : 'Thông tin về HFP',
		'ConfSectionAdvanced' : 'Lựa chọn nâng cao',
		'ConfSectionEvents' : 'Sinh nhật/Sự Kiện',
		'ConfSectionImportExport' : 'Nhập Vào/Trích Xuất',
		'ConfSectionFeeds' : 'Feeds',
		'ConfSectionHomePage' : 'Trang Chủ',
		'ConfSectionLiveFeed' : 'Live Feed',
		'ConfSectionMenu' : 'Menus/Chat',
		'ConfSectionOther' : 'Lựa chọn khác',
		'ConfSectionPageTitle' : 'Tiêu đề trang',
		'ConfSectionPictures' : 'Hình ảnh',
		'ConfSectionShortcuts' : 'Phím tắt',
		'ConfSecureLinks' : 'Bắt buộc các link của facebook sử dụng giao thức https:// .',
		'ConfShortcutList' : '<b>Keyboard Shortucts</b> (case sensitive):<br /><br /><i>From any page:</i><br />&nbsp;<b>A</b> - Albums/photos<br />&nbsp;<b>B</b> - Toggle buddy list (online friends)<br />&nbsp;<b>C</b> - Tùy Chỉnh HFP<br />&nbsp;<b>D</b> - Birthdays<br />&nbsp;<b>E</b> - Events<br />&nbsp;<b>F</b> - Friends<br />&nbsp;<b>H</b> - Home page<br />&nbsp;<b>I</b> - Inbox<br />&nbsp;<b>K</b> - Add Bookmark<br />&nbsp;<b>L</b> - Select the logout link (press Enter afterwards to log out)<br />&nbsp;<b>N</b> - Notifications<br />&nbsp;<b>P</b> - Your profile<br />&nbsp;<b>R</b> - Requests<br />&nbsp;<b>S</b> - Jump to the search field<br />&nbsp;<b>T</b> - Translate selected text<br />&nbsp;<b>?</b> - Show HFP debug info<br />&nbsp;<b>&lt;escape&gt;</b> - Close pop-ups created by HFP<br /><br /><i>From the home page (filters)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - Live feed<br />&nbsp;<b>g</b> - Groups<br />&nbsp;<b>l</b> - Links<br />&nbsp;<b>n</b> - News feed<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>s</b> or <b>u</b> - Status updates<br />&nbsp;<b>t</b> - Notes<br />&nbsp;<b>v</b> - Videos<br /><br /><i>From profiles</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Photos<br />&nbsp;<b>w</b> - Wall<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>From pages with pagination (previous, next, etc)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (when available)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (when available)<br /><br /><i>While viewing albums/photos:</i><br />&nbsp;<b>a</b> - Load all thumbnails (when available)<br />&nbsp;<b>b</b> - Show big pictures<br />&nbsp;<b>c</b> - View comments<br />&nbsp;<b>k</b> - Back to album<br />&nbsp;<b>m</b> - Photos of (person) and me<br /><br /><i>While viewing recent albums and uploaded/tagged photos:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Recent Albums<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Mobile uploads<br />&nbsp;<b>o</b> - Photos of me<br />&nbsp;<b>p</b> - My Photos<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Tagged friends',
		'ConfShortcuts' : 'Kích hoạt tính năng phím tắt.',
		'ConfSign' : 'Hiện chòm sao của một người trong thông tin của họ (nếu họ cung cấp đầy đủ ngày sinh).',
		'ConfTopBarFixed' : 'Giữ thanh thực đơn luôn phía trên màn hình, cả khi di chuyển xuống.',
		'ConfTopBarHoverOpacity' : 'Khi chuột ở trên',
		'ConfTopBarOpacity' : 'Độ trong suốt của thanh thực đơn phía trên',
		'ConfUpdates' : 'Hãy truy cập vào Userscripts.org hàng ngày để cập nhật HFP. hoặc <a href="#" id="fbfUpdateLink" onclick="return false;">kiểm tra ngay</a>.',
		'DownloadVideo' : 'Download Video',
		'ExportICalendarFile' : 'Export iCalendar file',
		'ExportICalendarFileWarning' : '(Điều này sẽ mất một khoảng thời gian nếu bạn có rất nhiều bạn bè)',
		'FacebookFixerConflict' : 'Facebook Fixer nay được gọi là HFP.<br /><br />Bởi vì thay đổi tên nên bạn cần phải tự gỡ bỏ Facebook Fixer từ trình duyệt của bạn, hoặc hai kịch bản sẽ xung đột với nhau.<br /><br />Nếu bạn không biết gỡ bỏ một userscript, <a %s>bấm vào đây để được hướng dẫn</a>.',
		'fullAlbumLoaded' : 'tải đầy đủ album',
		'Import' : 'Nhập vào',
		'ImportConfirm' : 'Bạn có chắc chắn muốn nhập các thiết lập này?\nCác cài đặt hiện tại của bạn sẽ bị mất.',
		'ImportFailure' : 'Đã xảy ra lỗi khi nhập các thiết lập của bạn.',
		'ImportSuccess' : 'Quá trình nhập hoàn thành. Bạn có muốn tải lại trang?',
		'Left' : 'Bên trái',
		'LoadingAllPhotos' : 'Đang tải tất cả các ảnh...',
		'loadingFullAlbum' : 'Đang tải tất cả album...',
		'LoadingPic' : 'Đang tải ảnh...',
		'LoadPhotosWarning' : 'Tải tất cả các hình ảnh có thể mất một thời gian dài',
		'Months' : new Array('Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'),
		'ProtocolSkype' : 'Gọi cho %s bằng Skype',
		'ProtocolMSN' : 'Chat với %s bằng Windows Live',
		'ProtocolYahoo' : 'Chat với %s bằng Yahoo Messenger',
		'ProtocolGoogle' : 'Chat với %s bằng Google Talk',
		'ReloadErrorPage' : 'Click để thử lại, hoặc đợi 5 giây',
		'Refresh' : 'Làm Tươi',
		'Remove' : 'Xóa',
		'Right' : 'Bên phải',
		'ShowBigPictures' : 'Hiển thị hình ảnh lớn',
		'Signs' : new Array('Ma Kết','Bảo Bình','Song Ngư','Dương Cưu','Kim Ngưu','Song Tử','Cự Giải','Sư Tử','Xử Nữ','Thiên Bình','Hổ Cáp','Nhân Mã'),
		'today' : 'hôm nay',
		'Translators' : 'Translators',
		'UpdateAvailable1' : 'Đã có bản cập nhật mới cho HFP',
		'UpdateAvailable2' : 'Bạn có muốn cập nhật ngay?',
		'UpdateHomepage' : 'Đi đến trang chủ',
		'UpdateInstall' : 'Cài đặt ngay',
		'UpdateTomorrow' : 'Nhắc lại sau',
		'ViewAlbumComments' : 'Xem bình luận về album',
		'yearsOld' : '%s tuổi'
	},
	
	// Indonesian - Contributed by Ryan Endika Chandra (20110222)
	id : {
	   '_language' : 'Bahasa Indonesia',
	   'AddToCalendar' : 'Tambahkan ke kalender',
	   'AddToGoogleCalendar' : 'Tambahkan ke Kalender Google',
	   'all' : 'semua',
	   'All' : 'Semua',
	   'AllPhotosLoaded' : 'Semua foto telah dimuat',
	   'Automatic' : 'Otomatis',
	   'Birthday' : 'Ulang tahun %s',
	   'BookmarkAdd' : 'Tambahkan Bookmark Baru',
	   'BookmarkExists' : 'Sudah ada bookmark tersedia sebelumnya untuk halaman ini.\n\nPergi ke halaman yang Anda ingin bookmark dan coba lagi.',
	   'BookmarkNamePrompt' : 'Masukan nama untuk bookmark ini:\n%s',
	   'BookmarksManage' : 'Atur Bookmarks',
	   'BookmarksRemoveSelected' : 'Hapus Bookmark yang dipilih',
	   'Bookmarks' : 'Bookmark',
	   'BrowserUnsupported' : 'Browser yang Anda gunakan tidak mendukung fitur ini.',
	   'CreatingFile' : 'Membuat File',
	   'Close' : 'Tutup',
	   'ConfigureFacebookFixer' : 'Atur HFP',
	   'ConfigureInstructions' : ' HFP is a program of Texnolize Software developed by Rui Fujiwara, Website to looking review this application: http://ruifujiwara.co.cc/.',
	   'ConfAge' : 'Tampilkan umur seseorang pada profilnya (apabila mereka menampilkan tanggal ulang tahunnya lengkap).',
	   'ConfApplicationWhitelist' : 'Application Whitelist - Masukan ID applikasi untuk menjaganya dari penyembunyian. Pisahkan dengan spasi.',
	   'ConfAutoBigAlbumPictures' : 'Otomatis tampilkan album gambar lebih besar ketika halaman dibuka.',
	   'ConfAutoLoadFullAlbum' : 'Otomatis memuat penuh semua gambar di dalam album pada satu halaman.',
	   'ConfAutoLoadTaggedPhotos' : 'Otomatis memuat penuh semua foto yang ditandai pada satu halaman. (tab foto pada profil seseorang).',
	   'ConfAutoReadMore' : 'Otomatis klik pada tautan "lihat selengkapnya" .',
	   'ConfBigAlbumPictures' : 'Tambahkan tautan pada halaman album untuk menampilkan versi yang lebih besar dari semua gambar pada halaman tersebut.',
	   'ConfBigAlbumPicturesBorder' : 'Tambahkan border sekitar gambar versi yang lebih besar.',
	   'ConfBottomBarHoverOpacity' : 'Pada mouse-over',
	   'ConfBottomBarOpacity' : 'Menu bar bawah transparan',
	   'ConfCalendarBirthDate' : 'Masukan ulang tahun seseorang pada detail acara.',
	   'ConfCalendarFullName' : 'Gunakan nama lengkap seseorang sebagai judul untuk hari ulang tahun (biasanya hanya nama depan).',
	   'ConfChatDifferentiate' : 'Gunakan huruf tebal dan miring untuk membedakan teman yang tersedia dan diam.',
	   'ConfChatHideIdle' : 'Sembunyikan teman yang diam.',
	   'ConfDelayPopupPics' : 'Tambahkan sebuah penundaan pendek sebelum menampilkan gambar pop-up.',
	   'ConfDelayPopupPicsTimeout' : 'Penundaan sebelum menampilkan gambar popup, dalam millidetik (default=500):',
	   'ConfDownloadVideo' : 'Tambahkan tautan untuk mendownload video dari halaman video. (Anda mungkin membutuhkan <a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV player</a>)',
	   'ConfErrorPageReload' : 'Otomatis memuat ulang halaman aplikasi error setelah 5 detik.',
	   'ConfExport' : 'Untuk mengexport pengaturan Anda, salinlah teks dibawah dan simpan dalam sebuah file.',
	   'ConfExternalPopup' : 'Versi Popup ukuran penuh untuk gambar luar. <sup>beta</sup>',
	   'ConfFacebookFixerLanguage' : 'Bahasa untuk HFP',
	   'ConfFacebookTimestamps' : 'Tampilkan cap waktu Facebook (contoh "3 jam lalu").',
	   'ConfFBFTimestamps' : 'Tambahkan cap waktu HFP setelah cap waktu Facebook (contoh "11:45").',
	   'ConfFBFTimestamps24' : 'Tampilkan cap waktu HFP dalam format 24 jam.',
	   'ConfFriendRequestCountInTitle' : 'Tampilkan jumlah permintaan teman pada halaman judul.',
	   'ConfGoogleApps' : 'Buat tautan Google Calender kompatibel dengan Google Apps.',
	   'ConfGoogleAppsDomain' : 'Domain',
	   'ConfGoogleCalendar' : 'Tambahkan tautan untuk menambahkan ulang tahun dan acara ke <a href="http://en.wikipedia.org/wiki/Google_Calendar" target="_blank">Google Calendar</a>.',
	   'ConfGoogleLanguage' : 'Bahasa untuk for <a href="http://en.wikipedia.org/wiki/Google_Translate" target="_blank">Google Translate</a>',
	   'ConfHideApplicationStories' : 'Sembunyikan jejak aplikasi.',
	   'ConfHideEgos' : 'Sembunyikan semua bagian "ego" (seharusnya menyembunyikan semua bagian dari rekomendasi Facebook).',
	   'ConfHideEventStories' : 'Sembunyikan jejak acara.',
	   'ConfHideFacebookCountInTitle' : 'Sembunyikan jumlah pesan di kotak masuk.',
	   'ConfHideFriendStories' : 'Sembunyikan jejak teman.',
	   'ConfHideGroupStories' : 'Sembunyikan jejak group.',
	   'ConfHideHovercards' : 'Sembunyikan hovercards (popup yang muncul ketika mouse Anda dia).',
	   'ConfHideLikeStories' : 'Sembunyikan jejak suka.',
	   'ConfHideLinkStories' : 'Sembunyikan jejak tautan.',
	   'ConfHideNoteStories' : 'Sembunyikan jejak catatan.',
	   'ConfHidePhotoStories' : 'Sembunyikan jejak foto.',
	   'ConfHidePlaceStories' : 'Sembunyikan jejak tempat.',
	   'ConfHideProfilePicStories' : 'Sembunyikan jejak foto profil.',
	   'ConfHideRead' : 'Sembunyikan item dalam feed hidup yang sudah dibaca.',
	   'ConfHideRelationshipStories' : 'Hide relationship stories.',
	   'ConfHideStatusStories' : 'Sembunyikan jejak status.',
	   'ConfHideVideoStories' : 'Sembunyikan jejak video.',
	   'ConfHideWallStories' : 'Sembunyikan jejak dinding.',
	   'ConfHomeBeta' : 'Tampilkan bagian Facebook Sneak Peek.',
	   'ConfHomeChat' : 'Tampilkan bagian chat.',
	   'ConfHomeChatNames' : 'Tampilkan nama dalam chat section.',
	   'ConfHomeEvents' : 'Tampilkan bagian event.',
	   'ConfHomeFindFriends' : 'Tampilkan bagian Get Connected.',
	   'ConfHomeLeftAlign' : 'Ratakan kiri konten pada halaman beranda.',
	   'ConfHomeLeftColumn' : 'Tampilkan kolom kiri.',
	   'ConfHomeLeftColumnFixed' : 'Pertahankan agar kolom kiri tetap terlihat, bahkan saat menscroll kebawah.',
	   'ConfHomeLink' : 'Tampilkan tautan Beranda pada menu bara atas.',
	   'ConfHomeNavigation' : 'Tampilkan bagian Navigasi.',
	   'ConfHomePokes' : 'Tampilkan bagian colek.',
	   'ConfHomeProfile' : 'Tampilkan bagian profil.',
	   'ConfHomeRecommendations' : 'Tampilkan rekomendasi (Orang yang mungkin Anda ketahui, Rekomendasi Halaman dll).',
	   'ConfHomeRequests' : 'Tampilkan bagian Permintaan.',
	   'ConfHomeRightColumn' : 'Tampilkan kolom kanan.',
	   'ConfHomeStretch' : 'Regangkan halaman beranda ke ukuran penuh dari browser.',
	   'ConfHomeStretchComments' : 'Regangkan komenter pada halaman beranda.',
	   'ConfiCalendar' : 'Tambahkan tautan unduh pada file <a href="http://en.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a> dengan semua ulang tahun.',
	   'ConfImport' : 'Untuk mengimport pengaturan Anda nanti, timpa teks di bawah dengan teks yang sudah Anda simpan sebelumnya dan klik "Import".',
	   'ConfInboxCountInTitle' : 'Tampilkan jumlah pesan di kotak masuk pada judul halaman.',
	   'ConfLogoutLink' : 'Tambahkan tautan keluar/logout ke menu bar atas.',
	   'ConfNewTabSearch' : 'Jadikan hasil pencarian terbuka di tab/jendela baru ketika menekan CTRL + Enter untuk mencari.',
	   'ConfPageTitle' : 'Hapus "Facebook |" pada judul halaman pada setiap halaman.',
	   'ConfPhotoPopup' : 'Popup versi lebih besar dari foto pada saat didekatkan mouse.',
	   'ConfPopupAutoClose' : 'Tutup gambar popup otomatis.',
	   'ConfPopupSmartAutoClose' : 'Pertahankan gambar popup dari penutupan otomatis jika mouse meninggalkan popup.',
	   'ConfPopupPosition' : 'Posisi untuk gambar popup',
	   'ConfPopupWhileTagging' : 'Tampilkan gambar popup bahkan saat menandai.',
	   'ConfProcessInterval' : 'Interval untuk memproses halaman, dalam millidetik (default=1000):',
	   'ConfProfileLink' : 'Tampilkan tautan Profil pada menu bar atas.',
	   'ConfProfilePicPopup' : 'Popup versi lebih besar untuk gambar pada saat didekatkan dengan mouse.',
	   'ConfProtocolLinks' : 'Ubah ID messenger dalam profil ke tautan untuk memulai percakapan dengan merekaTurn messenger IDs on profiles into links that start a conversation with them (Google Talk, Windows Live etc).',
	   'ConfSectionAbout' : 'Tentang HFP',
	   'ConfSectionAdvanced' : 'Lebih Rumit',
	   'ConfSectionEvents' : 'Ulang Tahun/Acara',
	   'ConfSectionImportExport' : 'Import/Export',
	   'ConfSectionFeeds' : 'Feed',
	   'ConfSectionHomePage' : 'Home Page',
	   'ConfSectionLiveFeed' : 'Feed Hidup',
	   'ConfSectionMenu' : 'Menu/Chat',
	   'ConfSectionOther' : 'Pengaturan lain',
	   'ConfSectionPageTitle' : 'Judul halaman',
	   'ConfSectionPictures' : 'Gambar',
	   'ConfSectionShortcuts' : 'Keyboard Shortcuts',
	   'ConfSecureLinks' : 'Perintah tautan Facebook menuju halaman HTTPS.',
	   'ConfShortcutList' : '<b>Keyboard Shortcut</b> (case sensitive):<br /><br /><i>Dari beberapa halaman:</i><br />&nbsp;<b>A</b> - Album/foto<br />&nbsp;<b>B</b> - Daftar teman (teman yang sedang online)<br />&nbsp;<b>C</b> - Pengaturan HFP<br />&nbsp;<b>D</b> - Ulang Tahun<br />&nbsp;<b>E</b> - Acara<br />&nbsp;<b>F</b> - Teman<br />&nbsp;<b>H</b> - Halaman Beranda<br />&nbsp;<b>I</b> - Kotak Masuk<br />&nbsp;<b>K</b> - Tambahkan Bookmark<br />&nbsp;<b>L</b> - Pilih tautan keluar/logout (tekan Enter setelah itu untuk loh out)<br />&nbsp;<b>N</b> - Pemberitahuan<br />&nbsp;<b>P</b> - Profile Anda<br />&nbsp;<b>R</b> - Permintaan<br />&nbsp;<b>S</b> - Pencarian<br />&nbsp;<b>T</b> - Terjemahkan teks terpilih<br />&nbsp;<b>?</b> - Tampilkan info debug HFP<br />&nbsp;<b>&lt;escape&gt;</b> - Tutup popp-up yang dibuat HFP<br /><br /><i>Dari halaman beranda (filter)</i>:<br />&nbsp;<b>a</b> - Pages<br />&nbsp;<b>f</b> - feed hidup<br />&nbsp;<b>g</b> - Group<br />&nbsp;<b>l</b> - Tautan<br />&nbsp;<b>n</b> - feed berita<br />&nbsp;<b>p</b> - Foto<br />&nbsp;<b>s</b> or <b>u</b> - Status<br />&nbsp;<b>t</b> - Catatan<br />&nbsp;<b>v</b> - Video<br /><br /><i>Dari profil</i>:<br />&nbsp;<b>i</b> - Info<br />&nbsp;<b>p</b> - Foto<br />&nbsp;<b>w</b> - Dindinf<br />&nbsp;<b>x</b> - Boxes<br /><br /><i>Dari halaman dengan pagination (previous, next, dll)</i><br />&nbsp;<b>&lt;left arrow&gt;</b> - Previous<br />&nbsp;<b>&lt;right arrow&gt;</b> - Next<br />&nbsp;<b>&lt;shift&gt; + &lt;left arrow&gt;</b> - First (jika tersedia)<br />&nbsp;<b>&lt;shift&gt; + &lt;right arrow&gt;</b> - Last (jika tersedia)<br /><br /><i>Ketika melihat album/foto:</i><br />&nbsp;<b>a</b> - Muat semua penuh (jika tersedia)<br />&nbsp;<b>b</b> - Tmapilkan gambar besar<br />&nbsp;<b>c</b> - Lihat komentar<br />&nbsp;<b>k</b> - Kembali ke album<br />&nbsp;<b>m</b> - Foto dari (seseorang) dan saya<br /><br /><i>Ketika melihat album sekarang dan foto yang dipload/tag:</i><br />&nbsp;<b>a</b> or &nbsp;<b>r</b> - Album sekarang<br />&nbsp;<b>m</b> or &nbsp;<b>u</b> - Upload dari Hp<br />&nbsp;<b>o</b> - Foto dari saya<br />&nbsp;<b>p</b> - Foto saya<br />&nbsp;<b>t</b> or &nbsp;<b>f</b> - Teman yang ditandai',
	   'ConfShortcuts' : 'Aktifkan keyboard shortcut.',
	   'ConfSign' : 'Tampilkan zodiak seseorang pada profilnya (apabila mereka menampilkan tanggal ulang tahunnya lengkap).',
	   'ConfTopBarFixed' : 'Selalu pertahankan menu bar atas pada layar, juga saat menggulung layar browser Anda.',
	   'ConfTopBarHoverOpacity' : 'Pada mouse-over',
	   'ConfTopBarOpacity' : 'Menu bar atas transparan',
	   'ConfUpdates' : 'Cek Userscripts.org setiap hari untuk update HFP. Atau <a href="#" id="fbfUpdateLink" onclick="return false;">cek sekarang</a>.',
	   'DownloadVideo' : 'Unduh Video',
	   'ExportICalendarFile' : 'Export file iCalendar',
	   'ExportICalendarFileWarning' : '(Ini akan memakan waktu lama apabila Anda mempunyai banyak teman)',
	   'FacebookFixerConflict' : 'Facebook Fixer sekarang dikenal dengan nama HFP.<br /><br />Karena pergantian nama Anda harus menguninstal Facebook Fixer dari browser Anda, atau dua script ini akan bertentangan satu sama lain.<br /><br />Jika Anda tidak mengetahui cara untuk menguninstal script ini, <a %s>Klick disini untuk tata caranya</a>.',
	   'fullAlbumLoaded' : 'album telah dimuat',
	   'Import' : 'Import',
	   'ImportConfirm' : 'Apakag Anda yakin ingin mengimport peraturan ini?\nPeraturan Anda sekarang akan hilang.',
	   'ImportFailure' : 'Kesalahan terjadi ketika mencoba untuk mengimport peraturan Anda.',
	   'ImportSuccess' : 'Import berhasil. Apakah Anda ingin untuk memuat ulang halaman?',
	   'Left' : 'Kiri',
	   'LoadingAllPhotos' : 'Memuat semua foto...',
	   'loadingFullAlbum' : 'memuat album lengkap...',
	   'LoadingPic' : 'Memuat Gambar...',
	   'LoadPhotosWarning' : 'Pemuatan semua foto mungkin butuh waktu lama',
	   'Months' : new Array('Januari','Februari','Maret','April','May','Junu','Julu','Agustus','September','Oktober','November','Desember'),
	   'ProtocolSkype' : 'Berbicara dengan %s menggunakan Skype',
	   'ProtocolMSN' : 'Chat dengan %s menggunakan Windows Live',
	   'ProtocolYahoo' : 'Chat dengan %s menggunakan Yahoo Messenger',
	   'ProtocolGoogle' : 'Chat dengan %s menggunakan Google Talk',
	   'ReloadErrorPage' : 'Klik untuk mencoba lagi, atau tunggu 5 detik lagi',
	   'Refresh' : 'Muat Ulang',
	   'Remove' : 'Hapus',
	   'Right' : 'Kanan',
	   'ShowBigPictures' : 'Tampilkan Gambar-gambar Besar',
	   'Signs' : new Array('Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius'),
	   'today' : 'hari ini',
	   'Translators' : 'Penerjemah',
	   'UpdateAvailable1' : 'Update tersedia untuk HFP',
	   'UpdateAvailable2' : 'Apakah Anda ingin mengupdate sekarang?',
	   'UpdateHomepage' : 'Pergi ke halaman beranda',
	   'UpdateInstall' : 'Instal sekarang',
	   'UpdateTomorrow' : 'Peringatkan besok',
	   'yearsOld' : '%s tahun'
	},
	
	// Japanese – Dedicate To Aya Sano – Yuko Shimada – Kanako Kubo  (20110314)
	ja : {
		'_language' : '日本語',
		'AddToCalendar' : 'カレンダーに追加',
		'AddToGoogleCalendar' : 'Googleカレンダーに追加',
		'all' : '全て',
		'All' : '全て',
		'AllPhotosLoaded' : '全ての写真をロード',
		'Automatic' : '自動',
		'Birthday' : '%sさんの誕生日',
		'BookmarkAdd' : '新しいブックマークを追加',
		'BookmarkExists' : 'このページのブックマークは既に存在します．\n\nブックマークしたいページに移動してもう一度実行してください．',
		'BookmarkNamePrompt' : 'このブックマークの名前を入力してください:\n%s',
		'BookmarksConfirmRemoval' : '以下のブックマークを削除してよろしいですか？',
		'BookmarksManage' : 'ブックマークの管理',
		'BookmarksRemoveSelected' : '選択したブックマークを削除',
		'Bookmarks' : 'ブクマ',
		'BrowserUnsupported' : 'この機能をサポートしていないブラウザです．',
		'CreatingFile' : 'ファイルを作成しています',
		'Close' : '閉じる',
		'ConfigureFacebookFixer' : 'HFP設定',
		'ConfigureInstructions' : ' HFP is a program of Texnolize Software developed by Rui Fujiwara, Website to looking review this application: http://ruifujiwara.co.cc.',
		'ConfAge' : 'プロフィールに年齢を表示する（生年月日が完全に提供されている場合）',
		'ConfApplicationWhitelist' : 'アプリケーションホワイトリスト - 記事を隠したくないアプリケーションのIDを入力してください．IDの区切りは半角スペースです．',
		'ConfAutoBigAlbumPictures' : 'ページを開いた時に大きいアルバム写真を自動的に表示する',
		'ConfAutoLoadFullAlbum' : '単独ページでアルバム内の全ての画像のサムネイルを自動的に読み込む',
		'ConfAutoLoadTaggedPhotos' : '単独ページ（プロフィールの写真タブ）で全てのタグ付けされた写真のサムネイルを自動的に読み込む',
		'ConfAutoReadMore' : '「もっと見る」リンクを自動的にクリックする',
		'ConfBigAlbumPictures' : 'アルバムページにページ内の全ての画像の大きいバージョンを表示するリンクを追加する',
		'ConfBigAlbumPicturesBorder' : '大きいバージョンの画像の周りに枠線を追加する',
		'ConfBottomBarHoverOpacity' : 'マウスオーバー時',
		'ConfBottomBarOpacity' : '下部メニューバーの透明度',
		'ConfCalendarBirthDate' : 'イベントの詳細に誕生日を含める',
		'ConfCalendarFullName' : '誕生日のタイトルに（ファーストネームだけではなく）フルネームを使う',
		'ConfChatDifferentiate' : '連絡先のチャット可能と一時退席中を太字と斜体を使って区別する',
		'ConfChatHideIdle' : '一時退席中の連絡先を隠す',
		'ConfDelayPopupPics' : 'ポップアップ画像を表示する前に短いディレイを追加する',
		'ConfDelayPopupPicsTimeout' : 'ポップアップ画像を表示する前のディレイ（ミリ秒単位，デフォルトは500ミリ秒）: ',
		'ConfDownloadVideo' : '動画のページから動画をダウンロードするリンクを追加する（<a href="http://en.wikipedia.org/wiki/Flash_Video#FLV_players" target="_blank">FLV再生ソフト</a>が必要です）',
		'ConfDisableTheater' : '写真シアターを無効にする',
		'ConfErrorPageReload' : 'アプリケーションエラーのページは5秒後に自動更新する',
		'ConfExport' : '設定をエクスポートするには下のテキストをコピーしてファイルに保存してください．',
		'ConfExternalPopup' : '外部画像のフルサイズバージョンをポップアップする <sup>beta</sup>',
		'ConfFacebookFixerLanguage' : 'HFPの言語',
		'ConfFacebookTimestamps' : '時刻をFacebook方式で表示する（例: "3時間前"）',
		'ConfFBFTimestamps' : 'Facebook方式の時刻の後にFFxier方式の時刻を追加する（例: "11:45"）',
		'ConfFBFTimestamps24' : 'HFP方式の時刻を24時間表示にする',
		'ConfFriendRequestCountInTitle' : 'ページタイトルに新着友達リクエストの数を表示する',
		'ConfGoogleApps' : 'Google AppsのGoogleカレンダーへのリンクを作成する',
		'ConfGoogleAppsDomain' : 'ドメイン名',
		'ConfGoogleCalendar' : '<a href="http://ja.wikipedia.org/wiki/Google%E3%82%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%BC" target="_blank">Googleカレンダー</a>に誕生日とイベントを追加するリンクを追加する',
		'ConfGoogleLanguage' : '<a href="http://ja.wikipedia.org/wiki/Google%E7%BF%BB%E8%A8%B3" target="_blank">Google翻訳</a>の言語',
		'ConfHideApplicationStories' : 'アプリケーションの記事を隠す',
		'ConfHideEgos' : 'egoセクションを全て隠す（Facebookのおすすめをできるだけ隠します）',
		'ConfHideEventStories' : 'イベントの記事を隠す',
		'ConfHideFacebookCountInTitle' : 'Facebookの受信箱の新着メッセージ数のカウントを隠す',
		'ConfHideFriendStories' : '友達になりましたの記事を隠す',
		'ConfHideGroupStories' : 'グループの記事を隠す',
		'ConfHideHovercards' : 'Hovercard（名前をマウスオーバーした時に現れるポップアップ）を隠す',
		'ConfHideLikeStories' : 'いいね！の記事を隠す',
		'ConfHideLinkStories' : 'リンクの記事を隠す',
		'ConfHideNoteStories' : 'ノートの記事を隠す',
		'ConfHidePhotoStories' : '写真の記事を隠す',
		'ConfHidePlaceStories' : 'スポットの記事を隠す',
		'ConfHideProfilePicStories' : 'プロフィール写真を更新した友達の記事を隠す',
		'ConfHideRead' : '最新情報で閲覧済みの項目を隠す',
		'ConfHideRelationshipStories' : '交際ステータスの記事を隠す',
		'ConfHideStatusStories' : '近況の記事を隠す',
		'ConfHideVideoStories' : '動画の記事を隠す',
		'ConfHideWallStories' : 'ウォールの記事を隠す',
		'ConfHomeBeta' : 'Facebook Sneak Peekを表示する',
		'ConfHomeChat' : 'チャットを表示する',
		'ConfHomeChatNames' : 'チャットに名前を表示する',
		'ConfHomeEvents' : 'イベントを表示する',
		'ConfHomeFindFriends' : 'Facebookでつながろうを表示する',
		'ConfHomeLeftAlign' : 'ページの内容を左寄せにする',
		'ConfHomeLeftColumn' : '左カラムを表示する',
		'ConfHomeLeftColumnFixed' : '画面をスクロールしても左カラムを表示したままにする',
		'ConfHomeLink' : '上部メニューバーにホームへのリンクを表示する',
		'ConfHomeNavigation' : 'ナビゲートを表示する',
		'ConfHomePokes' : 'あいさつを表示する',
		'ConfHomeProfile' : 'プロフィールを表示する',
		'ConfHomeRecommendations' : 'おすすめを表示する（知り合いかも？，おすすめのファンページ等）',
		'ConfHomeRequests' : 'リクエストを表示する',
		'ConfHomeRightColumn' : '右カラムを表示する',
		'ConfHomeStretch' : 'ページの幅をウィンドウの幅に合わせる',
		'ConfHomeStretchMiddleColumn' : 'ページの中央カラムの幅を自動調整する',
		'ConfiCalendar' : '全ての誕生日に<a href="http://ja.wikipedia.org/wiki/ICalendar" target="_blank">iCalendar</a>ファイルをダウンロードするリンクを追加する',
		'ConfImport' : '後から設定をインポートする際は，下のテキストを以前保存したテキストで上書きしてから「インポート」をクリックしてください．',
		'ConfInboxCountInTitle' : 'ページタイトルに受信箱の新着メッセージ数を表示する',
		'ConfLogoutLink' : '上部メニューバーにログアウトへのリンクを追加する',
		'ConfNotificationCountInTitle' : 'ページタイトルに新しいお知らせの数を表示する',
		'ConfNewTabSearch' : 'CTRL + Enterを押して検索した時に新しいタブ/ウィンドウで検索結果を開く',
		'ConfPageTitle' : '全てのページタイトルから「Facebook |」を削除する',
		'ConfPhotoPopup' : 'マウスオーバー時に写真の大きいバージョンをポップアップする',
		'ConfPopupAutoClose' : 'ポップアップ画像を自動的に閉じる',
		'ConfPopupSmartAutoClose' : 'ポップアップ画像をマウスオーバーしている間は自動的に閉じない',
		'ConfPopupPosition' : 'ポップアップ画像の位置',
		'ConfPopupWhileTagging' : 'タグ付けしている時でもポップアップ画像を表示する',
		'ConfProcessInterval' : 'ページを処理する間隔（ミリ秒単位，デフォルトは1000ミリ秒）: ',
		'ConfProfileLink' : '上部メニューバーにプロフィールへのリンクを表示する',
		'ConfProfilePicPopup' : 'マウスオーバー時にプロフィール画像の大きいバージョンをポップアップする',
		'ConfProtocolLinks' : 'プロフィールのメッセンジャーIDを会話するためのリンクに変える（Googleトーク，Windows Live等）',
		'ConfSectionAbout' : 'HFPについて',
		'ConfSectionAdvanced' : '詳細',
		'ConfSectionEvents' : '誕生日/イベント',
		'ConfSectionImportExport' : 'インポート/エクスポート',
		'ConfSectionFeeds' : 'フィード',
		'ConfSectionHomePage' : 'ホームページ',
		'ConfSectionLiveFeed' : 'ニュースフィード',
		'ConfSectionMenu' : 'メニュー/チャット',
		'ConfSectionOther' : 'その他のオプション',
		'ConfSectionPageTitle' : 'ページタイトル',
		'ConfSectionPictures' : '画像',
		'ConfSectionShortcuts' : 'キーボードショートカット',
		'ConfSecureLinks' : 'FacebookへのリンクでHTTPSのページを強制する',
		'ConfShortcutList' : '<b>キーボード ショートカット</b>（大文字と小文字で異なります）:<br /><br /><i>どのページでも可能:</i><br />&nbsp;<b>A</b> - アルバム/写真<br />&nbsp;<b>B</b> - 連絡先リスト（オンラインの友達）の切替え<br />&nbsp;<b>C</b> - HFP設定<br />&nbsp;<b>D</b> - 誕生日<br />&nbsp;<b>E</b> - イベント<br />&nbsp;<b>F</b> - 友達<br />&nbsp;<b>H</b> - ホーム<br />&nbsp;<b>I</b> - 受信箱<br />&nbsp;<b>K</b> - ブックマークに追加<br />&nbsp;<b>L</b> - ログアウトへのリンクを選択 （その後でEnterを押すとログアウトします）<br />&nbsp;<b>N</b> - お知らせ<br />&nbsp;<b>P</b> - プロフィール<br />&nbsp;<b>R</b> - リクエスト<br />&nbsp;<b>S</b> - 検索ボックスにジャンプ<br />&nbsp;<b>T</b> - 選択されたテキストを翻訳<br />&nbsp;<b>?</b> - HFPのデバッグ情報を表示<br />&nbsp;<b>&lt;escape&gt;</b> - HFPが作成したポップアップを閉じる<br /><br /><i>ホームで可能（フィルタ）</i>:<br />&nbsp;<b>a</b> - ページ<br />&nbsp;<b>f</b> - 最新情報<br />&nbsp;<b>g</b> - グループ<br />&nbsp;<b>l</b> - リンク<br />&nbsp;<b>n</b> - ニュースフィード<br />&nbsp;<b>p</b> - 写真<br />&nbsp;<b>s</b> / <b>u</b> - 近況アップデート<br />&nbsp;<b>t</b> - ノート<br />&nbsp;<b>v</b> - 動画<br /><br /><i>プロフィールで可能</i>:<br />&nbsp;<b>i</b> - 基本データ<br />&nbsp;<b>p</b> - 写真<br />&nbsp;<b>w</b> - ウォール<br />&nbsp;<b>x</b> - ボックス<br /><br /><i>ページ付け（前へ，次へ等）があるページで可能</i><br />&nbsp;<b>←</b> - 前へ<br />&nbsp;<b>→</b> - 次へ<br />&nbsp;<b>&lt;shift&gt; + ←</b> - 最初へ（可能な時のみ）<br />&nbsp;<b>&lt;shift&gt; + →</b> - 最後へ（可能な時のみ）<br /><br /><i>アルバム/写真の閲覧時:</i><br />&nbsp;<b>a</b> - 全てのサムネイルを読み込む（可能な時のみ）<br />&nbsp;<b>b</b> - 大きい画像を表示<br />&nbsp;<b>c</b> - コメントを表示<br />&nbsp;<b>k</b> - アルバムに戻る<br />&nbsp;<b>m</b> - （誰かと）あなたの写真<br /><br /><i>友達の写真やアップロード/タグ付けされた写真の閲覧時:</i><br />&nbsp;<b>a</b> / &nbsp;<b>r</b> - 友達のアルバム<br />&nbsp;<b>m</b> / &nbsp;<b>u</b> - 携帯アップロード<br />&nbsp;<b>o</b> - 私が写っている写真<br />&nbsp;<b>p</b> - マイアルバム<br />&nbsp;<b>t</b> / &nbsp;<b>f</b> - タグ付けされている友達',
		'ConfShortcuts' : 'キーボードショートカットを有効にする．',
		'ConfSign' : 'プロフィールに星座を表示する（誕生日が提供されている場合）',
		'ConfTopBarFixed' : '画面をスクロールしても上部メニューバーを常に表示し続ける',
		'ConfTopBarHoverOpacity' : 'マウスオーバー時',
		'ConfTopBarOpacity' : '上部メニューバーの透明度',
		'ConfUpdates' : 'HFPのアップデートを Userscripts.org で毎日確認する．または<a href="#" id="fbfUpdateLink" onclick="return false;">今すぐ確認</a>する．',
		'DownloadVideo' : '動画をダウンロード',
		'ExportICalendarFile' : 'iCalendarファイルをエクスポートする',
		'ExportICalendarFileWarning' : '（友達がたくさんいる場合は多少時間がかかります）',
		'FacebookFixerConflict' : 'Facebook FixerはHFPに名前が変更されました．<br /><br />名前が変わったために，ブラウザからFacebook Fixerを手動でアンインストールしないと2つのスクリプトが互いにコンフリクトしてしまいます．<br /><br />userscriptをアンインストールするやり方が分からない場合は，<a %s>ここをクリックしてください．（注: 英語）</a>',
		'fullAlbumLoaded' : 'アルバムが全て読み込まれました',
		'Import' : 'インポート',
		'ImportConfirm' : 'これらの設定をインポートしてよろしいですか？\n現在の設定は失われます',
		'ImportFailure' : '設定をインポート中にエラーが発生しました．',
		'ImportSuccess' : 'インポートが完了しました．ページを更新しますか？',
		'Left' : '左',
		'LoadingAllPhotos' : '全ての写真を読み込み中...',
		'loadingFullAlbum' : '全てのアルバムを読み込み中...',
		'LoadingPic' : '画像を読み込み中...',
		'LoadPhotosWarning' : '全ての写真を読み込むには時間がかかるかもしれません',
		'Months' : new Array('1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'),
		'ProtocolSkype' : '%sさんをSkypeで呼び出す',
		'ProtocolMSN' : '%sさんとWindows Liveでチャットする',
		'ProtocolYahoo' : '%sさんとYahoo!メッセンジャーでチャットする',
		'ProtocolGoogle' : '%sさんとGoogleトークでチャットする',
		'ReloadErrorPage' : 'もう一度クリックするか5秒お待ちください',
		'Refresh' : '更新',
		'Remove' : '削除',
		'Right' : '右',
		'ShowBigPictures' : '大きい画像を表示',
		'Signs' : new Array('山羊座','水瓶座','魚座','牡羊座','牡牛座','双子座','蟹座','獅子座','乙女座','天秤座','蠍座','射手座'),
		'today' : '今日',
		'Translators' : '翻訳',
		'UpdateAvailable1' : 'HFPをアップデートできます．',
		'UpdateAvailable2' : '今すぐアップデートしますか？',
		'UpdateHomepage' : 'ホームページへ',
		'UpdateInstall' : '今すぐインストールする',
		'UpdateTomorrow' : 'また今度インストールする',
		'yearsOld' : '%s歳'
	}
	
}

//
// Get Elements
//
function $(q, root, single) {
	if (root && typeof root == 'string') {
		root = $(root, null, true);
		if (!root) { return null; }
	}
	root = root || document;
	if (q[0]=='#') { return root.getElementById(q.substr(1)); }
	else if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
		if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
		return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
	return root.getElementsByTagName(q);
}

//
// Greasemonkey functions / cross-browser stuff
//

// Figure out what type of storage should be used
var storage = 'none';
try {
	if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
		// Make sure greasemonkey's functions work cause some browsers lie. Yes Chrome/Chromium, I'm talking about you...
		GM_setValue('testkey', 'testvalue');
		if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
	}
} catch(x) {}
if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }

//
// Implement JSON functions if they're not already defined - based on http://www.sitepoint.com/blogs/2009/08/19/javascript-json-serialization/
//
if (!this.JSON) {
	JSON = {};
	JSON.stringify = function (obj) {
		var t = typeof (obj);
		if (t != "object" || obj === null) {
			if (t == "string") obj = '"'+obj.replace(/"/g,'\\"')+'"';
			return String(obj);
		} else {
			var n, v, json = [], arr = (obj && obj.constructor == Array);
			for (n in obj) {
				v = obj[n]; t = typeof(v);
				if (t == "string") v = '"'+v.replace(/"/g,'\\"')+'"';
				else if (t == "object" && v !== null) v = JSON.stringify(v);
				json.push((arr ? "" : '"' + n + '":') + String(v));
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	};
	JSON.parse = function (str) {
		if (str === "") str = '""';
		eval("var p=" + str + ";");
		return p;
	};
}

function setValue(key, value) {
	prefs[key] = value;
	switch (storage) {
		case 'greasemonkey':
			GM_setValue(id+'-'+key, value);
			break;

		case 'localstorage':
			localStorage['fbf-'+id+'-'+key] = value;
			break;
	}
}

function getValue(key, value) {
	switch (storage) {
		case 'greasemonkey':
			return GM_getValue(id+'-'+key, value);

		case 'localstorage':
			var val = localStorage['fbf-'+id+'-'+key];
			if (val=='true') { return true; }
			else if (val=='false') { return false; }
			else if (val) { return val; }
			break;
	}
	return value;
}

function log(str) {
	if (typeof debug !== 'undefined') { debug(str); }
	if (typeof GM_log !== 'undefined') { GM_log(str); return true; }
	else if (typeof console !== 'undefined' && console.log) { console.log(str); return true; }
	return false;
}

function addStyle(css) {
	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else if (heads = document.getElementsByTagName('head')) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		heads[0].appendChild(style);
	}
}

function getStyle(elm, prop) {
	return window.getComputedStyle(elm, null).getPropertyValue(prop);
}

function registerMenuCommand(name, func) {
	if (typeof GM_registerMenuCommand !== 'undefined') { return GM_registerMenuCommand(name, func); }
}

function xmlhttpRequest(params, callBack) {
	if (typeof GM_xmlhttpRequest !== 'undefined') {
		params['onload'] = callBack;
		return GM_xmlhttpRequest(params);
	}
	return null;
}

function openInTab(url) {
	if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
	else { window.open(url); }
}

function row(cells) { return '<tr><td>' + cells.join('</td><td>') + '</td></tr>'; }


//
// Enable profile-specific settings
//
try {
	var profileLink = $("//ul[@id='pageNav']//a[@accesskey='2']",null,true);
	if (m = profileLink.href.match(/id=(\d+)\b/)) { id = m[1]; }
	else if (m = profileLink.href.match(/\/([^\/]+)$/)) { id = m[1]; }
} catch(x) {}
//log('id = ' + id); // DEBUG ONLY
var buf  =	'ProfilePicPopup,PhotoPopup,ExternalPopup,!DelayPopupPics,PopupAutoClose,!PopupSmartAutoClose,!PopupWhileTagging,BigAlbumPictures,BigAlbumPicturesBorder,!AutoBigAlbumPictures,!AutoLoadFullAlbum,!AutoLoadTaggedPhotos,!DisableTheater,'+
			'Age,Sign,iCalendar,GoogleCalendar,CalendarFullName,CalendarBirthDate,!GoogleApps,'+
			'!HomeLeftAlign,!HomeStretch,!HomeStretchMiddleColumn,!HomeLeftColumnFixed,HomeLeftColumn,HomeRightColumn,HomeProfile,HomeNavigation,HomeChat,!HomeChatNames,HomePokes,HomeFindFriends,HomeEvents,HomeRequests,HomeBeta,HomeRecommendations,'+
			'Bookmarks,HomeLink,ProfileLink,LogoutLink,ChatDifferentiate,!ChatHideIdle,DownloadVideo,ErrorPageReload,PageTitle,HideFacebookCountInTitle,!FriendRequestCountInTitle,!NotificationCountInTitle,InboxCountInTitle,NewTabSearch,!SecureLinks,Updates,ProtocolLinks,!TopBarFixed,Shortcuts,!FacebookTimestamps,FBFTimestamps,FBFTimestamps24,'+
			'!HideApplicationStories,!HideEventStories,!HideFriendStories,!HideGroupStories,!HideLikeStories,!HideLinkStories,!HideNoteStories,!HidePhotoStories,!HidePlaceStories,!HideProfilePicStories,!HideRelationshipStories,!HideStatusStories,!HideVideoStories,!HideWallStories,!AutoReadMore,!HideEgos,!HideHovercards';
var booleanOptions = buf.split(',');
var prefs = {
	'FacebookFixerLanguage': getValue('FacebookFixerLanguage', 'auto'),
	'PopupPosition': getValue('PopupPosition', 'auto'),
	'GoogleAppsDomain': getValue('GoogleAppsDomain', ''),
	'TopBarOpacity': getValue('TopBarOpacity', '1.0'),
	'TopBarHoverOpacity': getValue('TopBarHoverOpacity', '1.0'),
	'BottomBarOpacity': getValue('BottomBarOpacity', '0.9'),
	'BottomBarHoverOpacity': getValue('BottomBarHoverOpacity', '1.0'),
	'GoogleLanguage': getValue('GoogleLanguage', 'en'),
	'ProcessInterval': getValue('ProcessInterval', '1000'),
	'DelayPopupPicsTimeout' : getValue('DelayPopupPicsTimeout', '500'),
	'BookmarkList' : getValue('BookmarkList', '[]'),
	'ApplicationWhitelist' : getValue('ApplicationWhitelist', '[]'),
	'CustomFeedModification' : getValue('CustomFeedModification', ''),
	'CustomCSS' : getValue('CustomCSS', '')
}
for (var i=0; i<booleanOptions.length; i++) {
	bool = true;
	if (booleanOptions[i].charAt(0)=='!') {
		booleanOptions[i] = booleanOptions[i].replace('!','');
		bool = false;
	}
	prefs[booleanOptions[i]] = getValue(booleanOptions[i], bool)
}
prefs['HideRead'] = false; // This is broken

//
// Adjust legacy prefs
//
prefs['PopupPosition'] = prefs['PopupPosition'].toLowerCase().replace(/^-/, ''); // The replace is to handle a bug in 2.1.4
setValue('PopupPosition', prefs['PopupPosition']);

//
// Figure out what language we should be using
//
buffer = document.body.className.match(/locale_([^ ]+)/i);
if (prefs['FacebookFixerLanguage'] == 'auto' && buffer) {
	language = buffer[1].toLowerCase();
	detectedLanguage = language;
	if (!lang[language]) {
		language = language.split('_')[0];
		if (!lang[language]) { language = 'en'; }
	}
} else {
	language = prefs['FacebookFixerLanguage'];
}
//log(language); // DEBUG ONLY

//
// Add styles used by script
//
addStyle(
	'.fbfPopup { padding:10px; background:#f6f6f6; border:3px double #666666; -moz-border-radius:5px; -webkit-border-radius:5px; -khtml-border-radius:5px; border-radius:5px; }'+
	'.fbfPopupContainer { display:none; top:0; right:0; bottom:0; left:0; }'+
	'#ff-popup-pic-div { display:none; background:white; border:1px solid #333; position:fixed !important; top:3px !important; padding:4px; min-width:130px; z-index:99999 !important; -moz-border-radius:3px; -webkit-border-radius:3px; -khtml-border-radius:3px; border-radius:3px; }'+
	'.ff-popup-pic-div-left { left:3px !important; right:auto !important; -moz-box-shadow:5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:5px 5px 5px rgba(0,0,0,0.6); box-shadow:5px 5px 5px rgba(0,0,0,0.6); }'+
	'.ff-popup-pic-div-right { right:3px !important; left:auto !important; -moz-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); box-shadow:-5px 5px 5px rgba(0,0,0,0.6); }'+
	'#ff-popup-pic-div img { max-height: ' + (window.innerHeight-35) + 'px; }'+
	'#ff-popup-pic-close { display:none; position:absolute; top:4px; right:10px; color:#ff9999; cursor:pointer; font-weight:bold; font-size:14px; }'+
	'#ff-popup-pic-div:hover #ff-popup-pic-close { display:block; }'+
	'#ff-popup-pic-close:hover { color:#aa6666; }'+
	'#ff-popup-pic-image { text-align:center; }'+
	'#ff-popup-pic-image img { color:#999999; display:block; }'+
	'#FBFBigAlbumContainer { padding:0 0 40px; }'+
	'#FBFBigAlbum { padding:15px 3px; margin:10px; text-align:center; position:relative; }'+
	'#FBFBigAlbum a { padding:1px; }'+
	'.FBFBigAlbumClose { color:red; cursor:pointer; font-weight:bold; padding:0 10px; }'+
	'#FBFBigAlbumClose1 { position:absolute; top:0; right:0; }'+
	'#FBFBigAlbumClose2 { position:absolute; bottom:0; right:0; }'+
	'#FBFConfigContainer { z-index:1001; }'+
	'#FBFConfig { width:700px; padding:10px; margin:20px auto 0; }'+
	'#FBFConfig label, #FBFConfig .fbfLabel { color:#666666; font-weight:normal; } '+
	'#FBFConfig .fbfHeader { font-weight:bold; }'+
	'#FBFConfigShadow, #fbfShadow { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:black; opacity:0.8; }'+
	'#fbfUpdatePopup { max-width:450px; margin:100px auto; padding:10px; }'+
	'.fbfImportant { font-weight:bold; }'+
	'.fbfNote { color:#777777; }'+
	'.fbfRight { text-align:right; }'+
	'.ad_story .social_ad_advert { z-index:0; }'+
	'.ff-album-page td { background:#aaa; text-align:center; }'+
	'#ff-debug td { vertical-align:top; }'+
	'.HFP-highlighted-story, .HFP-highlighted-story * { font-weight:bold !important; }'
);
if (prefs['CustomCSS'].length>0) { addStyle(prefs['CustomCSS']); }

//
// Add div for showing big profile pics
//
var popupPicDiv = document.createElement('div');
popupPicDiv.id = 'ff-popup-pic-div';
popupPicDiv.className = 'fbfPopup ff-popup-pic-div-' + (prefs['PopupPosition']=='auto' ? 'left' : prefs['PopupPosition']);
popupPicDiv.innerHTML = '<div id="ff-popup-pic-close" title="' + $l('Close') + '">x</div><div id="ff-popup-pic-image"><span></span></div>';
try {
	document.body.insertBefore(popupPicDiv, document.body.lastChild.nextSibling);
	on('click', '#ff-popup-pic-close', function() { document.getElementById('ff-popup-pic-div').style.display='none'; });
} catch(x) {
	var fbppdivAdder = setInterval(function() {
		try {
			document.body.insertBefore(popupPicDiv, document.body.lastChild.nextSibling);
			on('click', '#ff-popup-pic-close', function() { document.getElementById('ff-popup-pic-div').style.display='none'; });
			if ($('#ff-popup-pic-div')) { clearInterval(fbppdivAdder); }
		} catch(x) {}
	}, 100);
}
// Listeners are added by the code for showing the popups

//
// Add div for popups and shadows
//
var popupDiv = document.createElement('div');
popupDiv.id = 'fbfPopupContainer';
popupDiv.className = 'fbfPopupContainer';
document.body.appendChild(popupDiv);
on('click', popupDiv, function(e) { if (e.target.id=='fbfPopupContainer') { hidePopup() } });
var shadowDiv = document.createElement('div');
shadowDiv.id = 'fbfShadow';
document.body.appendChild(shadowDiv);

//
// Misc. Short Functions
//

// Get a string in the current language, or default to english
function $l(key,text) {
	var string, l;
	if (lang[language][key]) { string = lang[language][key]; l = language; }
	else { string = lang['en'][key]; l = 'en'}
	if (text) { string = string.replace('%s', text); }
	return string;
}

// Pad with a 0
function $0(x) { return x<10 ? '0'+x : ''+x; }

// Add event listeners
function on(type, elm, func) {
	if (type instanceof Array) { for (var i=0; i<type.length; i++) { on(type[i], elm, func); } }
	else {
		if (elm instanceof Array) { for (var j=0; j<elm.length; j++) { on(type, elm[j], func); } }
		else { (typeof elm === 'string' ? $(elm) : elm).addEventListener(type, func, false); }
	}
}

// Add 'click' event listener
function onClick(elm, func) { (typeof elm === 'string' ? $('#'+elm) : elm).addEventListener('click', func, false); }

// Click on an element
function click(elm) {
	var evt = document.createEvent('MouseEvents');
	evt.initEvent('click', true, true);
	elm.dispatchEvent(evt);
}

// Click on an element selected using xpath
function clickX(path) {
	var elm = $(path, null, true);
	if (!elm) { return false; }
	click(elm);
	return true;
}

// Get an elements position
function getPosition(elm) {
	var x=0;
	var y=0;
	while (elm != null) {
		x += elm.offsetLeft;
		y += elm.offsetTop;
		elm = elm.offsetParent;
	}
	return Array(x,y);
}

// Determine if we're on the home page
function isHomePage() {
	return !!(page.match(/^((\?|home\.php).*)?$/));
}

// Log an error
function logError(category, x) {
	msg = "FBF Error (" + category + ") - " +  x.name + ' - ' + x.message + ' in file <' + x.fileName + '> on line ' + x.lineNumber + ' while viewing ' + page;
	log(msg);
}

// Show a popup div with a shadow background
function showPopup(content, onTop, fixedPosition) {
	$('#fbfPopupContainer').innerHTML = content;
	$('#fbfPopupContainer').style.position = fixedPosition ? 'fixed' : 'absolute';
	$('#fbfShadow').style.zIndex = '1000';
	$('#fbfPopupContainer').style.zIndex = '1001';
	$('#fbfShadow').style.display = 'block';
	$('#fbfPopupContainer').style.display = 'block';
	if (!fixedPosition) { window.scroll(0,0); }
}

// Show a popup dialog - similar to showPopup() but more automated
function showDialog(content, controls, opts) {
	if (!opts) { opts=''; }
	if (!controls) { controls=''; }
	if (!opts.match(/\bnocontrols\b/)) { content+= '<div style="border-top:1px solid #ccc; margin-top:10px; padding-top:10px; text-align:right;">' + controls + (opts.match(/\bnoclose\b/) ? '' : '<input type="button" value="' + $l('Close') + '" id="ff-popup-close" />') + '</div>'; }
	showPopup('<div class="fbfPopup" style="' + (opts.match(/\bsmall\b/) ? 'max-width:450px; margin:80px auto;' : 'max-width:700px; margin:30px auto;') + '">' + content + '</div>');
	if (!opts.match(/\b(noclose|nocontrols)\b/)) { onClick($('#ff-popup-close'), hidePopup); }
}

// Hide popups created with showPopup()
function hidePopup() {
	if ($('#fbfPopupContainer')) {
		$('#fbfPopupContainer').style.display = 'none';
		$('#fbfShadow').style.display = 'none';
	}
}

// Figure out the month from a string containing a date
function $m(str) {
	// Supports: English (UK+US), Spanish, French, German, Dutch, Italian, Portuguese (Brazil+Portugal), Swedish, Greek, Serbian, Bulgarian, Slovak, Czech
	str = str.toLowerCase();
	var months = new Array (/^(.*\s)?(jan(uar[iy]?)?|enero|janvier|gennaio|janeiro|ιανουαρίου|јануар|януари|januára|leden)(\s.*)?$/,
							/^(.*\s)?(feb(ruar[iy]?)?|febrero|février|febbraio|fevereiro|φεβρουαρίου|фебруар|февруари|februára|únor)(\s.*)?$/,
							/^(.*\s)?(mar(ch)?|marzo|mars|märz|maart|março|μαρτίου|март|marca|březen)(\s.*)?$/,
							/^(.*\s)?(apr(ile?)?|abril|avril|απριλίου|април|apríla|duben)(\s.*)?$/,
							/^(.*\s)?(ma(yo?|i|j)|mei|maggio|maio|μαΐου|мај|май|mája|květen)(\s.*)?$/,
							/^(.*\s)?(june?|junio?|juin|giugno|junho|ιουνίου|јун|юни|júna|červen)(\s.*)?$/,
							/^(.*\s)?(jul[iy]?|julio|juillet|luglio|julho|ιουλίου|јул|юли|júla|červenec)(\s.*)?$/,
							/^(.*\s)?(aug(ust(i|us)?)?|agosto|août|αυγούστου|август|augusta|srpen)(\s.*)?$/,
							/^(.*\s)?(sep(tember)?|septiembre|se[pt]tembre|setembro|σεπτεμβρίου|септембар|септември|septembra|září)(\s.*)?$/,
							/^(.*\s)?(o[ck]t(ober)?|oct[ou]bre|ottobre|outubro|οκτωβρίου|октобар|октомври|októbra|říjen)(\s.*)?$/,
							/^(.*\s)?(nov(ember)?|noviembre|novembre|novembro|νοεμβρίου|новембар|ноември|novembra|listopad)(\s.*)?$/,
							/^(.*\s)?(de[cz](ember)?|dici?embre|décembre|dezembro|δεκεμβρίου|децембар|декември|decembra|prosinec)(\s.*)?$/);
	for (var i=0; i<months.length; i++) {
		if (str.match(months[i])) { return i; }
	}
	return -1;
}

// Parse a date
function $d(str) {
	str = ' ' + str.toLowerCase() + ' ';
	var m;
	var date = new Date();
	if (str.indexOf('tomorrow')!=-1) { date = date.getNextDay(); }
	else if (str.indexOf('today')==-1) {
		var month = $m(str);
		if (month==-1) return null;
		date.setMonth(month);
		if (m = str.match(/\b(\d{4})\b/)) { date.setYear(m[1]); }
		if (m = str.match(/\s(\d\d?\.?)[\s,]/)) { if (m[1]<32) { date.setDate(m[1]); } }
	}
	if (m = str.match(/\b(\d\d?):(\d\d)( (a|p)m)?/i)) {
		date.setHours(m[4]=='p' ? m[1]-0+12 : m[1]);
		date.setMinutes(m[2]);
		date.setSeconds(0);
	}
	return date;
}


//
// Rotate an object
//
function rotate(elm) {
	degrees=((elm.getAttribute('data-ff-degrees') || 0) - 0 + 90 ) % 360;
	elm.setAttribute('data-ff-degrees', degrees);
	elm.style.margin = '25px 0';
	elm.style.transform = 'rotate(' + degrees + 'deg)';
	elm.style.MozTransform = 'rotate(' + degrees + 'deg)';
	elm.style.OTransform = 'rotate(' + degrees + 'deg)';
	elm.style.WebkitTransform = 'rotate(' + degrees + 'deg)';
}


//
// Google Translate functions
//
function handleTranslateRequest() { showPopup('<div class="fbfPopup" style="width:600px; margin:100px auto; padding:10px; "><b>Translating...</b> (press escape to close this popup)</div>', true, true); }
function handleTranslateResponse(r) {
	//window.alert(r.responseText);
	//window.alert(r.responseText.match(/^\[(\[.*?\]\])/)[1]);
	//t = JSON.parse(r.responseText.replace('],,"', '],"","'));
	t = JSON.parse(r.responseText.match(/^\[(\[.*?\]\])/)[1]);
	translated = Array();
	for (var i=0; i<t.length; i++) { translated.push(t[i][0]); }
	showPopup('<div class="fbfPopup" style="width:600px; margin:100px auto; padding:10px; "><b>Translated Text via Google Translate</b> (automatically translated to ' + prefs['GoogleLanguage'] + '):<br /><br />' + translated.join(' ') + '<div style="text-align:right;"><input id="fbfCloseTranslation" type="button" value="' + $l('Close') + '" /></div></div>', true, true);
	onClick('fbfCloseTranslation', function() { hidePopup(); });
}
function googleTranslate(str) {
	if (typeof GM_xmlhttpRequest !== 'undefined') {
		handleTranslateRequest();
		xmlhttpRequest({method: "GET", url: "http://translate.google.com/translate_a/t?client=t&text=" + window.getSelection() + "&sl=auto&tl=" + prefs['GoogleLanguage']}, handleTranslateResponse);
	} else {
		window.open('http://translate.google.com/?sl=auto&tl=' + prefs['GoogleLanguage'] + '&text=' + window.getSelection());
	}
}


//
// Detect Facebook Fixer
//
if (id!=0) {
	setTimeout(function() {
		if ($('#FBPPdiv') && (true || parseInt(getValue("LastConflictCheck", "0")) + 86400000 <= (new Date().getTime()))) {
			setValue('LastConflictCheck', new Date().getTime() + "");
			showDialog('<div class="fbfImportant">HFP</div><br />' + $l('FacebookFixerConflict', 'href="http://www.code-poet.net/userscripts/HFP/upgrading-from-facebook-fixer.html" target="_blank"'), '', 'small');
		}
	}, 2000);
}


//
// Debug Info
//
function showDebugInfo() {
	try {
		showDialog(
			'HFP Debug Info:<br /><br />'+
			'<table id="ff-debug">'+
			row(['version: ',version])+
			row(['release date: ',release_date])+
			row(['release timestamp: ',version_timestamp])+
			row(['id: ',id])+
			row(['page: ',page])+
			row(['homepage: ',(isHomePage()?'yes':'no')])+
			row(['language: ',language])+
			row(['detected language: ',detectedLanguage])+
			row(['storage: ',storage])+
			row(['date: ',new Date()])+
			row(['user agent: ',navigator.userAgent])+
			'</table>'
		);
	} catch(x) { logError('Debug Info', x); }
}


//
// Keyboard shortcuts
//
if (prefs['Shortcuts']) {
	window.addEventListener('keydown', function(e) {
		//log(String.fromCharCode(e.keyCode) + ' - ' + e.keyCode + ' - ' + e.shiftKey + ' - ' + e.ctrlKey + ' - ' + e.altKey + ' - ' + e.metaKey); // DEBUG ONLY
		if ((e.target.type && e.target.type!='checkbox' && e.target.type!='select') || (e.target.getAttribute('contenteditable')=='true') || e.ctrlKey || e.altKey || e.metaKey) { return; }
		function clickLink(filter, root) {
			var link;
			if (!root) { root = document; }
			if (filter.charAt(0) == ':') { return clickX("//a[contains(@href,'" + filter.replace(/^./,'') + "')]"); }
			return clickX("//a[contains(string(),'"+filter+"')]");
		}
		function gotoPage(url, preventClick) {
			url = url.replace(/^https?:\/\/www\.facebook\.com/, '');
			if (unsafeWindow && unsafeWindow.Quickling) {
				if (location.href.toLowerCase().match(/^https?:\/\/www\.facebook\.com\//)) { location.hash = '!'+url; }
				else if (preventClick || !clickLink(':' + url)) { location.href = location.protocol + '//www.facebook.com' + url; }
			} else { location.href = location.protocol + '//www.facebook.com' + url; }
		}
		function gotoPageX(path) {
			var xElm = $(path,null,true);
			if (xElm) { gotoPage(xElm.href, true); }
			//else { log('"' + path + '" could not be resolved'); } // debug
		}
		if (e.keyCode==27) {
			if (document.getElementById('fbfPopupContainer')) { document.getElementById('fbfPopupContainer').style.display = 'none'; }
			if (document.getElementById('fbfShadow')) { document.getElementById('fbfShadow').style.display = 'none'; }
			if (prefs['PhotoPopup'] || prefs['ProfilePicPopup']) { document.getElementById('ff-popup-pic-div').style.display='none'; }
		}
		else if (e.keyCode==16 || e.keyCode==17 || e.keyCode==18) {}
		else if (e.keyCode==191) { if (e.shiftKey) { showDebugInfo(); } } // ?
		else if (e.shiftKey) {
			switch(e.keyCode) {
				case 37: clickLink('First'); break; // Left Arrow
				case 39: clickLink('Last'); break; // Right Arrow
				case 65: gotoPage('/?sk=media'); break; // A
				case 66: click($("//*[@id='fbDockChatBuddylistNub']/a",null,true)); break; // B
				case 67: if (isHomePage() || !(page=='' || page.match(/^index.php/) || page.match(/^login.php/) || page.match(/^logout.php/))) { showConfig(); } break; // C
				case 68: gotoPage('/?sk=bd'); break; // D
				case 69: gotoPage('/?sk=events'); break; // E
				case 70: gotoPage('/friends/?filter=afp'); break; // F
				case 72: gotoPage('/home.php'); break; // H
				case 73: gotoPage('/?sk=messages'); break; // I
				case 75: click($('#ff-add-bookmark')); break; // K
				case 76: click($('#navAccountLink')); $('//form[@id="logout_form"]//input[@type="submit"]', null, true).focus(); break; // L
				case 78: gotoPage('/notifications.php'); break; // N
				case 80: window.location.href = 'http://www.facebook.com/' + (id.match(/^\d+$/) ? 'profile.php?id='+id+'&ref=profile' : id); break // P
				case 82: gotoPage('/reqs.php'); break; // R
				case 83: e.stopPropagation(); e.preventDefault(); document.getElementById('q').focus(); break; // S
				case 84: if (window.getSelection()!='') { googleTranslate(window.getSelection()); } break; // T
				case 86: gotoPage('/?sk=video'); break; // V
			}
		}
		else {
			if (page.indexOf('photo.php')==0) {
				switch(e.keyCode) {
					case 82: rotate($('#myphoto')); break; // r
				}
			} else if (page.indexOf('/photos/')!=-1) {
				switch(e.keyCode) {
					case 65: // a
					case 82: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=recent'; break; // r
					case 77: // m
					case 85: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=mobile'; break; // u
					case 84: // t
					case 70: window.location.href = 'http://www.facebook.com/photos/?ref=sb&view=tagged'; break; // f
					case 67: clickLink('Photo Comments'); break; // c
					case 79: clickLink('Photos of Me'); break; // o
					case 80: clickLink('My Photos'); break; // p
				}
			}
			else if (isHomePage()) {
				switch(e.keyCode) {
					case 65: gotoPage('/home.php?filter=pp'); break; // a
					case 70: gotoPage('/home.php?filter=nf'); break; // f
					case 71: gotoPage('/home.php?filter=app_2361831622'); break; // g
					case 76: gotoPage('/home.php?filter=app_2309869772'); break; // l
					case 78: gotoPage('/home.php?filter=h'); break; // n
					case 80: gotoPage('/home.php?filter=app_2305272732'); break; // p
					case 83: gotoPage('/home.php?filter=app_2915120374'); break; // s
					case 84: gotoPage('/home.php?filter=app_2347471856'); break; // t
					case 85: gotoPage('/home.php?filter=app_2915120374'); break; // u
					case 86: gotoPage('/home.php?filter=app_2392950137'); break; // v
				}
			}
			else {
				switch(e.keyCode) {
					case 66: clickLink($l('ShowBigPictures')); break; // b
					case 67: if (!clickLink('View Comments')) { if (!clickLink('Photo Comments')) { clickLink('Comments on Photos'); } } break; // c
					case 73: gotoPageX('//a[contains(@href,"v=info")][not(contains(@href,"edit"))]'); break; // i
					case 80: gotoPageX("//a[contains(@href,'v=photos')]"); break; // p
					case 87: gotoPageX("//a[contains(@href,'v=wall')]");  break; // w
					case 88: gotoPageX("//a[contains(@href,'v=box')]");  break; // x
				}
			}
			if (page.match(/^profile\.php\?.*photos/) && e.keyCode==77) { clickLink('and Me ('); }
			switch(e.keyCode) {
				case 37: if (clickLink('Prev')==-1) { clickLink('prev'); }  break; // Left Arrow
				case 39: if (clickLink('Next')==-1) { clickLink('next'); } break; // Right Arrow
				case 75: gotoPageX('//a[contains(@href,"album.php")][not(contains(@href,"page="))]'); break; // k
				case 65: click(document.getElementById('FBFLoadAllPhotos')); break; // a
			}
		}
	}, false);
}


//
// Allow script configuration
//
registerMenuCommand($l('ConfigureFacebookFixer'), showConfig);
if (menu = $('//li[@id="navAccount"]/ul',null,true)) {
	var configLink = document.createElement('li');
	configLink.innerHTML = '<a id="fbfConfigMenuLink" href="#" onclick="return false;">' + $l('ConfigureFacebookFixer') + '</a>';
	menu.insertBefore(configLink, menu.childNodes[2]);
	on('click', '#fbfConfigMenuLink', showConfig);
}
addStyle(
	'#fbfConfigContainer { width:100%; }'+
	'#fbfConfigTabs { width:200px; vertical-align:top; }'+
	'#fbfConfigTabs div { background:white; color:background:#3b5998; padding:10px 0 10px 10px; border:1px solid #cccccc; border-top-width:0; cursor:pointer; }'+
	'#fbfConfigTabs div#fbfConfigTab-0 { border-top-width:1px; }'+
	'#fbfConfigTabs div:hover { font-weight:bold; }'+
	'#fbfConfigTabs div.fbfConfigSelectedTab { background:#3b5998; color:white; font-weight:bold; }'+
	'#fbfConfigControls { background:white; border:1px solid #cccccc; vertical-align:top; }'+
	'#fbfConfigControls div { display:none; padding:5px 5px 5px 23px; }'+
	'#fbfConfigControls div.fbfConfigSelectedControl { display:block; }'+
	'#fbfConfigControls input[type=checkbox] { margin-left:-18px; margin-bottom:8px; }'
);
function showConfig() {
	var opacitySelect = '';
	for (i=100; i>=0; i-=10) { opacitySelect=opacitySelect+'<option value="' + (i==100?'1.0':'0.'+(i/10)) + '">' + (100-i) + '%</option>'; }
	function makeOpacitySelector(id1, id2) { return '<tr><td><span class="fbfLabel">' + $l('Conf'+id1) + '</span></td><td><select id="fbfConf' + id1 + '">' + opacitySelect + '<option value="-1">' + $l('Remove') + '</option></select> &nbsp; &nbsp;<span class="fbfLabel">' + $l('Conf'+id2) + '</span> &nbsp;<select id="fbfConf' + id2 + '">' + opacitySelect + '</select></td></tr>'; }
	function makeCheckBoxes(ids, prefix) {
		if (!prefix) { prefix = ''; }
		ids = ids.split(',');
		for (var i=0, buf=''; i<ids.length; i++) { buf = buf + prefix + '<input type="checkbox" id="fbfConf' + ids[i] + '" /><label for="fbfConf' + ids[i] + '">' + $l('Conf'+ids[i]) + '</label><br />'; }
		return buf;
	}
	function makeNumberInputs(ids) {
		ids = ids.split(',');
		for (var i=0, buf = ''; i<ids.length; i++) { buf = buf + $l('Conf'+ids[i]) + '<br /><input type="text" id="fbfConf' + ids[i] + '" value="' + prefs[ids[i]] + '" /><br />'; }
		return buf;
	}
	showPopup('<div id="FBFConfig" class="fbfPopup">'+
		'<div style="text-align:center;"><span class="fbfImportant">' + $l('ConfigureFacebookFixer') + '</span><br /><span class="fbfNote">(HFP ' + version + ' - ' + release_date + ' - ' + id + ')</span></div><br />'+
		$l('ConfigureInstructions') + '<br />'+
		'<br />'+
		'<table id="fbfConfigContainer">'+
			'<tr><td id="fbfConfigTabs">'+
					'<div id="fbfConfigTab-0" class="fbfConfigSelectedTab">' + $l('ConfSectionHomePage') + '</div>'+
					'<div id="fbfConfigTab-1">' + $l('ConfSectionFeeds') + '</div>'+
					'<div id="fbfConfigTab-2">' + $l('ConfSectionPictures') + '</div>'+
					'<div id="fbfConfigTab-3">' + $l('ConfSectionEvents') + '</div>'+
					'<div id="fbfConfigTab-4">' + $l('ConfSectionMenu') + '</div>'+
					'<div id="fbfConfigTab-5">' + $l('ConfSectionPageTitle') + '</div>'+
					'<div id="fbfConfigTab-6">' + $l('ConfSectionShortcuts') + '</div>'+
					'<div id="fbfConfigTab-7">' + $l('ConfSectionOther') + '</div>'+
					'<div id="fbfConfigTab-8">' + $l('ConfSectionImportExport') + '</div>'+
					'<div id="fbfConfigTab-9">' + $l('ConfSectionAdvanced') + '</div>'+
					'<div id="fbfConfigTab-10">' + $l('ConfSectionAbout') + '</div>'+
			'</td><td id="fbfConfigControls">'+
				'<div id="fbfConfigControl-0" class="fbfConfigSelectedControl">'+
					makeCheckBoxes('HomeStretch,HomeStretchMiddleColumn,HomeLeftAlign,HomeLeftColumnFixed,HomeLeftColumn')+
					makeCheckBoxes('HomeProfile,HomeNavigation,HomeChat', ' &nbsp; &nbsp; ') +
					makeCheckBoxes('HomeChatNames', ' &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;') +
					makeCheckBoxes('HomeRightColumn') +
					makeCheckBoxes('HomeEvents,HomeRecommendations,HomeRequests,HomePokes,HomeFindFriends,HomeBeta', ' &nbsp; &nbsp; ') +
				'</div>'+
				'<div id="fbfConfigControl-1">'+
					makeCheckBoxes('HideApplicationStories,HideEventStories,HideFriendStories,HideGroupStories,HideLikeStories,HideLinkStories,HideNoteStories,HidePhotoStories,HidePlaceStories,HideProfilePicStories,HideRelationshipStories,HideStatusStories,HideVideoStories,HideWallStories') +
					'<br />' + $l('ConfApplicationWhitelist') + '<br /><textarea id="fbfConfApplicationWhitelist" style="width:400px; height:150px;"></textarea>' +
				'</div>'+
				'<div id="fbfConfigControl-2">'+
					makeCheckBoxes('ProfilePicPopup,PhotoPopup,ExternalPopup,DelayPopupPics,PopupAutoClose,PopupSmartAutoClose,PopupWhileTagging,BigAlbumPictures')+
					makeCheckBoxes('BigAlbumPicturesBorder', '&nbsp; &nbsp; ')+
					makeCheckBoxes('AutoBigAlbumPictures,AutoLoadFullAlbum,AutoLoadTaggedPhotos,DisableTheater') +
					'<span class="fbfLabel">' + $l('ConfPopupPosition') + ': </span><input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPosition-auto" value="auto" /><label for="fbfConfPopupPosition-auto">' + $l('Automatic') + '</label> <input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPosition-left" value="left" /><label for="fbfConfPopupPosition-left">' + $l('Left') + '</label> <input type="radio" name="fbfConfPopupPosition" id="fbfConfPopupPosition-right" value="right" /><label for="fbfConfPopupPosition-right">' + $l('Right') + '</label><br />'+
				'</div>'+
				'<div id="fbfConfigControl-3">'+
					makeCheckBoxes('Age,Sign,iCalendar,GoogleCalendar,CalendarFullName,CalendarBirthDate,GoogleApps') +
					$l('ConfGoogleAppsDomain') + ': <input id="fbfConfGoogleAppsDomain"></input><br />'+
				'</div>'+
				'<div id="fbfConfigControl-4">'+
					makeCheckBoxes('ChatHideIdle,ChatDifferentiate,Bookmarks,LogoutLink,HomeLink,ProfileLink,TopBarFixed') +
					'<table style="margin-left:-3px;">' +
					makeOpacitySelector('TopBarOpacity', 'TopBarHoverOpacity') +
					makeOpacitySelector('BottomBarOpacity', 'BottomBarHoverOpacity') +
					'</table>' +
				'</div>'+
				'<div id="fbfConfigControl-5">'+
					makeCheckBoxes('PageTitle,HideFacebookCountInTitle,FriendRequestCountInTitle,InboxCountInTitle,NotificationCountInTitle') +
				'</div>'+
				'<div id="fbfConfigControl-6">'+
					makeCheckBoxes('Shortcuts') + '<br />' + $l('ConfShortcutList')+
				'</div>'+
				'<div id="fbfConfigControl-7">'+
					makeCheckBoxes('DownloadVideo,ProtocolLinks,ErrorPageReload,NewTabSearch,SecureLinks,AutoReadMore,HideHovercards,FacebookTimestamps,FBFTimestamps,FBFTimestamps24,Updates') +
					'<table style="margin-left:-3px;">' +
					'<tr><td><span class="fbfLabel">' + $l('ConfFacebookFixerLanguage') + ':</span></td><td><select id="fbfConfFacebookFixerLanguage" style="padding:0; margin-top:3px;"><option value="auto">' + $l('Automatic') + '</option><option value="cs">Čeština (Czech)</option><option value="sr_rs">Српски (Serbian - Cyrillic)</option><option value="da">Dansk (Danish)</option><option value="el">Ελληνικά (Greek)</option><option value="en">English</option><option value="es">Español (Spanish)</option><option value="fr">Français (French)</option><option value="de">Deutsch (German)</option><option value="it">Italiano (Italian)</option><option value="id">Bahasa Indonesia (Indonesian)</option><option value="mk">македонски јазик (Macedonian)</option><option value="nl">Nederlands (Dutch)</option><option value="nb">Norsk (Norwegian)</option><option value="sk">Slovenčina (Slovak)</option><option value="sr">Srpski (Serbian - Latin)</option><option value="vi">Tiếng Việt (Vietnamese)</option><option value="tr">Türkçe (Turkish)</option><option value="bg">Български (Bulgarian)</option><option value="zh_tw">中文(台灣) (Chinese - Taiwan)</option><option value="ko">한국어 (Korean)</option><option value="ja">日本語 (Japanese)</option></select></td></tr>'+
					'<tr><td><span class="fbfLabel">' + $l('ConfGoogleLanguage') + ':</span></td><td><select id="fbfConfGoogleLanguage" style="padding:0; margin-top:3px;"><option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="ar">Arabic</option><option value="hy">Armenian</option><option value="az">Azerbaijani</option><option value="eu">Basque</option><option value="be">Belarusian</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="zh-CN">Chinese (Simplified)</option><option value="zh-TW">Chinese (Traditional)</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="ht">Hatian Creole</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="ko">Korean</option><option value="la">Latin</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="mk">Macedonian</option><option value="ms">Malay</option><option value="mt">Maltese</option><option value="no">Norwegian</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sr">Serbian</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="es">Spanish</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="yi">Yiddish</option></select></td></tr>'+
					'</table>' +
				'</div>'+
				'<div id="fbfConfigControl-8">'+
					(typeof JSON == 'undefined' ? $l('BrowserUnsupported') : $l('ConfExport') + '<br />' + $l('ConfImport') + '<br /><br /><textarea id="fbfPrefsJSON" style="width:425px; height:200px;" onmouseover="this.focus();this.select()">' + JSON.stringify(prefs, null, "\n") + '</textarea><br /><input type="button" id="fbfImport" value="' + $l('Import') + '" />')+
				'</div>'+
				'<div id="fbfConfigControl-9">'+
					makeNumberInputs('ProcessInterval,DelayPopupPicsTimeout')+
					makeCheckBoxes('HideEgos')+
					'<br /><input type="button" id="fbfAnalyzeLocalization" value="Analyze Localization" />'+
					'<br /><br />Custom Feed Modification (<a href="http://www.code-poet.net/userscripts/HFP/HFP-guide.html#custom-feed-modification" target="_blank">instructions</a>):<br /><textarea id="fbfConfCustomFeedModification" style="width:400px; height:150px;"></textarea><br /><input type="button" value="Save Custom Feed Modification" id="SaveCustomFeedModification" />'+
					'<br /><br />Custom CSS (<a href="http://www.code-poet.net/userscripts/HFP/HFP-guide.html#custom-css" target="_blank">instructions</a>):<br /><textarea id="fbfConfCustomCSS" style="width:400px; height:150px;"></textarea><br /><input type="button" value="Save Custom CSS" id="SaveCustomCSS" />'+
				'</div>'+
				'<div id="fbfConfigControl-10">'+
					'<span xmlns:dc="http://purl.org/dc/elements/1.1/" property="dc:title"><a href="http://www.texnolize-evolution.co.cc" target="_blank">HFP</a></span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">Rui Fujiwara</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Share Alike 3.0 Unported License</a>.<br /><br /> This Program Support to Japanese now, We Concerned and Pray for 日本 – 11-03-2011.<br /> This program I created for my condolences to disasters of earthquake and tsunami in Japan and all my friend in Japan now.<br /><br /><a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0;" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><br /><b>' + $l('Translators') + ':</b><ul><li>Dedicate to Xi Lian Yui for Chinese (Taiwan)</li><li>Dedicate to Hormagov for Czech</li><li>Connum - German</li><li>dnbace - Bulgarian</li><li>DoSMaN - Greek</li><li>Eilif Nordseth for Norwegian</li><li>Glen Farmer - Spanish</li><li>Goce Manevski - Macedonian</li><li>Gökhan Gurbetoğlu - Turkish</li><li>Gorgeous - Italian</li><li>Gorštak - Serbian (Cyrillic and Latin)</li><li>Contribute by Serena - Italian</li><li>Larissa van Sunder - Dutch</li><li>Mads Jensen - Danish</li><li> Rui Fujiwara dedicate to Aya Sano – Yuko Shimada – Kanako Kubo - Japanese</li><li>Contribute by Ellen Rheine - Spanish</li><li>Peter Miksik - Slovak</li><li><li>Dedicate to Eclaire - French</li><li>Ryan Endika Chandra - Indonesian</li><li>Trần Đức Thịnh - Vietnamese</li><li>박상빈 - Korean</li></ul>'+
				'</div>'+
			'</td></tr>'+
		'</table>'+
		'<br /><hr /><div style="float:left; padding-top:8px;"><a href="http://www.texnolize-evolution.co.cc">' + $l('UpdateHomepage') + '</a></div><div style="text-align:right;"><input type="button" value="' + $l('Refresh') + '" onclick="location.reload();" /> <input type="button" id="fbfCloseConfig" value="' + $l('Close') + '" /></div>'+
		'</div>', true
	);
	// Add the listener for the close button - if nothing else we should be able to close the popup
	onClick('fbfCloseConfig', function() { hidePopup(); });

	try {

		// Update fields to match current settings and listen for changes in checkboxes
		for (var i=0; i<booleanOptions.length; i++) {
			if (prefs[booleanOptions[i]]) { $('#fbfConf'+booleanOptions[i]).checked='checked'; }
			on('click', '#fbfConf'+booleanOptions[i], function(e) {
				setValue(e.target.id.replace('fbfConf',''), e.target.checked);
				prefs[e.target.id.replace('fbfConf','')] = e.target.checked;
			});
		}
		$('#fbfConfPopupPosition-' + prefs['PopupPosition']).checked='checked';
		var positions = new Array('auto','left','right');
		var opacities = new Array('BottomBarOpacity','BottomBarHoverOpacity','TopBarOpacity','TopBarHoverOpacity');
		for (var i=0; i<opacities.length; i++) { $('#fbfConf'+opacities[i]).value = prefs[opacities[i]]; }
		$('#fbfConfGoogleAppsDomain').value = prefs['GoogleAppsDomain'];
		$('#fbfConfGoogleLanguage').value = prefs['GoogleLanguage'];
		$('#fbfConfFacebookFixerLanguage').value = prefs['FacebookFixerLanguage'];
		$('#fbfConfApplicationWhitelist').value = JSON.parse(prefs['ApplicationWhitelist']).sort().join(' ');
		$('#fbfConfCustomFeedModification').value = prefs['CustomFeedModification'];
		$('#fbfConfCustomCSS').value = prefs['CustomCSS'];

		// Listen for changes
		
		on('click', '#fbfConfigTabs', function(e) {
			var current = e.target;
			if (current.tagName=='DIV' && current.className != 'fbfConfigSelectedTab') {
				var previous = $('.fbfConfigSelectedTab')[0];
				previous.className='';
				$('#fbfConfigControl-' + previous.id.match(/-(\d+)/)[1]).className = '';
				current.className = 'fbfConfigSelectedTab';
				$('#fbfConfigControl-' + current.id.match(/-(\d+)/)[1]).className = 'fbfConfigSelectedControl';
			}
		});
		
		for (var i=0; i<positions.length; i++) {
			on('click', '#fbfConfPopupPosition-'+positions[i], function(e) {
				setValue('PopupPosition', e.target.id.replace('fbfConfPopupPosition-',''));
				e.target.blur();
			});
		}
		
		on('keyup', '#fbfConfGoogleAppsDomain', function(e) {
				setValue('GoogleAppsDomain', e.target.value);
				prefs['GoogleAppsDomain'] = e.target.value;
		});
		
		on(Array('blur','keyup'), '#fbfConfApplicationWhitelist', function(e) {
				e.target.value = e.target.value.replace(/^\s+/g, '').replace(/\s*[^\d\s]/g, ' ').replace(/(\s)\s+(\S)/, '$1$2');
				var awl = JSON.stringify(e.target.value.replace(/^\s+|\s+$/g, '').split(/\s+/).sort());
				if (awl == '[""]') { awl = '[]'; }
				setValue('ApplicationWhitelist', awl);
				prefs['ApplicationWhitelist'] = awl;
		});
		
		on('click', '#fbfUpdateLink', function() { FBFUpdateCheck(true); });
		
		on('click', '#fbfImport', function() {
			if (window.confirm($l('ImportConfirm'))) {
				try {
					var importing = JSON.parse($('#fbfPrefsJSON').value);
					for (var key in importing) {
						log(key + ' => ' + importing[key]);
						setValue(key, importing[key]);
					}
					if (window.confirm($l('ImportSuccess'))) { location.reload(); }
				} catch(x) {
					logError('Import/Export', x);
					window.alert($l('ImportFailure'));
				}
			}
		});
		
		on('click', '#SaveCustomFeedModification', function() { setValue('CustomFeedModification', $('#fbfConfCustomFeedModification').value); });
		
		on('click', '#SaveCustomCSS', function() { setValue('CustomCSS', $('#fbfConfCustomCSS').value); });
		
		on('click', '#fbfAnalyzeLocalization', function() {
			var analysis = [];
			for (var key in lang.en) {
				var missing = !lang[language][key];
				var string = missing ? $l(key) : lang[language][key];
				if (typeof string == 'string') { string = "'" + string.toString().replace("'", "\\'").replace(/\n/g, "\\n") + "'"; }
				else {
					var buffer = [];
					for (var i=0; i<string.length; i++) { buffer.push("'" + string[i].replace("'", "\\'").replace(/\n/g, "\\n") + "'"); }
					string = "new Array(" + buffer.join(",") + ")";
				}
				analysis.push((missing ? '/**/' : '') + "		'" + key + "' : " + string);
			}
			showDialog(
				'<div style="margin-bottom:9px;">Below are the strings for the ' + $l('_language') + ' localization.' + (language=='en' ? ' You can use them for starting a new localization.' : '<br />Obsolete strings have been removed, and strings requiring translation have /**/ at the start of the line.') + '</div>'+
				'<textarea style="height:600px; width:694px; padding:2px;" onmouseover="this.focus(); this.select();" wrap="off" readonly="yes">' + analysis.join(',\n') + '</textarea>'
			);
		});
		
		var selects = new Array('BottomBarOpacity','BottomBarHoverOpacity','TopBarOpacity','TopBarHoverOpacity','FacebookFixerLanguage','GoogleLanguage');
		for (var i=0; i<selects.length; i++) {
			on('change', '#fbfConf'+selects[i], function(e) {
				setValue(e.target.id.replace(/^fbfConf/,''),e.target.options[e.target.selectedIndex].value);
				e.target.blur();
			});
		}

		var numberInputs = new Array('ProcessInterval','DelayPopupPicsTimeout');
		for (var i=0; i<numberInputs.length; i++) {
			on('keyup', '#fbfConf'+numberInputs[i], function(e) {
				try {
					var val = parseInt(e.target.value);
					setValue(e.target.id.replace(/^fbfConf/,''), val);
				} catch(x){}
			});
		}

	} catch(x) { logError('Config Popup', x); }

	window.scroll(0,0);
}

//
// Check for Updates (very modified, originally based on code by Jarett - http://userscripts.org/users/38602)
//
var updateForced;
function FBFUpdateCheck(forced) {
	if((forced)||(parseInt(getValue("LastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {
		updateForced = forced;
		// new: http://userscripts.org/scripts/source/98967.meta.js old: http://userscripts.org/scripts/review/98967
		try { xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/source/98967.meta.js?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'}}, handleUpdateResponse); }
		catch (err) { if (forced) { alert("An error occurred while checking for updates:\n" + err); } }
	}
}
function handleUpdateResponse(r) {
	setValue('LastUpdate', new Date().getTime() + "");
	if (r.responseText.match(/@timestamp\s+(\d+)/)[1] > version_timestamp) { showUpdatePopup(); }
	else if (updateForced) { alert("No update is available for HFP."); }
}
if (prefs['Updates']) { FBFUpdateCheck(false); }
function showUpdatePopup() {
	showDialog(
		$l('UpdateAvailable1') + '<br /><br /><div class="fbfNote">' + $l('UpdateAvailable2') + '</div>',
		'<input type="button" value="' + $l('UpdateInstall') + '" id="fbfUpdateInstall" /> '+
		'<input type="button" value="' + $l('UpdateHomepage') + '" id="fbfUpdateHomepage" /> '+
		'<input type="button" value="' + $l('UpdateTomorrow') + '" id="fbfUpdateTomorrow" /></div>',
		'small,noclose'
	);
	onClick('fbfUpdateInstall', function() { openInTab('http://userscripts.org/scripts/source/98967.user.js'); hidePopup(); });
	onClick('fbfUpdateHomepage', function() { window.open('http://userscripts.org/scripts/show/98967'); hidePopup(); });
	onClick('fbfUpdateTomorrow', hidePopup);
}


//
// Load thumbnails for entire album
//
function loadFullAlbum() {
	try {
		if (m = $('.summary')[0].textContent.split('|')[0].match(/(\d+)/g)) {
			m = m.sort(function(a,b){return a-b});
			totalImagePages = Math.ceil(m[2]/20);
			if (n=page.match(/page=(\d)/)) { thisPageNumber=n[1]; } else { thisPageNumber=1; }
			albumPagesLoaded = 0;
			totalAlbumPages = totalImagePages-1;
			$('#fbf_photo_pagination').innerHTML = '<span class="caption">' + $l('loadingFullAlbum') + '<span></span></span>';
			for (var i=1; i<totalImagePages+1; i++) {
				if (i!=thisPageNumber) {
					appendPhotos('http://www.facebook.com/' + (page.indexOf('page=')!=-1 ? page.replace(/page=\d+/,'page='+i) : page+'&page='+i) + '&quickling', $l('fullAlbumLoaded'));
				}
			}
		}
	} catch(x) { logError('Load Full Album', x); }
}


//
// Load tagged thumbnails
//
function loadTaggedPhotos() {
	try {
		if (m = $('.caption')[0].textContent.split('|')[0].replace(',','').match(/(\d+)/g)) {
			$('#fbf_photo_pagination').innerHTML = '<span class="caption">' + $l('LoadingAllPhotos') + '<span></span></span>';
			totalImagePages = Math.ceil(m[m.length-1]/15);
			albumPagesLoaded = 0;
			totalAlbumPages = totalImagePages-1;
			var thisPhoto = 0;
			if (m = page.match(/so=(\d+)/)) { thisPhoto = m[1]; }
			for (var i=0; i<totalImagePages; i++) {
				if (i*15!=thisPhoto) {
					appendPhotos('http://www.facebook.com/' + page.replace(/&so=\d+/,'') + '&so=' + (i*15), '<span class="caption">' + $l('AllPhotosLoaded') + '</span>');
				}
			}
		}
	} catch(x) { logError('Load Tagged Photos', x); }
}


//
// Add thumbnails from the specified URL
// (Abilities to show pictures in correct order, with the album page number and link displayed are based heavily on code by MysticMetal)
//
var photoTableRegex = /UIPhotoGrid_Table[^>]+>(.*?)<\\\/table/;
function appendPhotos(url, completeMessage) {
	var pageNum = (m=url.match(/\bso=(\d+)/)) ? m[1]/15+1 : url.match(/\bpage=(\d+)/)[1];
	var albumURL = (url.replace(/&quickling/, '') + '').replace(/&/g,'&amp;');
	var albumPageIdentifier = pageNum + '-' + (new Date().getTime());
	var tbody = $('.UIPhotoGrid_Table')[0]
	tbody.innerHTML = tbody.innerHTML + '<tbody><tr class="ff-album-page"><td colspan="5"><a href="' + albumURL + '"> Album page ' + pageNum + '</a></td></tr></tbody>'+
										'<tbody id="ff-album-page-' + albumPageIdentifier + '"></tbody>';
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.send(null);
	req.onreadystatechange = function() {
		if (req.readyState == 4) {
			if (req.status == 200) {
				albumPagesLoaded++;
				$('#ff-album-page-'+albumPageIdentifier).innerHTML = photoTableRegex.exec(req.responseText)[1].replace(/\\/g,'');
				if (albumPagesLoaded>=totalAlbumPages) { $('#fbf_photo_pagination').innerHTML = completeMessage; }
				if (prefs['AutoBigAlbumPictures']) { clickX("//a[contains(string(),'"+$l('ShowBigPictures')+"')]"); }
			}
		}
	}
}


//
// Add easily accessbile Logout link
//
if (prefs['LogoutLink'] && !$('#ff-logout')) {
	try {
		newLogout = document.createElement('li');
		newLogout.innerHTML = '<a>' + $('//form[@id="logout_form"]//input[@type="submit"]', null, true).value + '</a>';
		onClick(newLogout, function() { $('#logout_form').submit(); });
		$('#pageNav').appendChild(newLogout);
	} catch(x) { logError('Logout Link', x); }
}

//
// Remove the Home link
//
if (!prefs['HomeLink']) {
	try {
		var l = $('.//a[contains(@href,"?ref=home")]', $('#pageNav'), true);
		l.parentNode.removeChild(l);
	} catch(x) { logError('Home Link', x); }
}

//
// Remove the Profile link
//
if (!prefs['ProfileLink']) {
	try {
		var l = $("//ul[@id='pageNav']//a[@accesskey='2']", null, true);
		l.parentNode.removeChild(l);
	} catch(x) { logError('Profile Link', x); }
}

//
// Top Bar Positioning
//
if (prefs['TopBarFixed']) {
	try {
		var div = document.createElement('div');
		div.id = 'fbf-page-head-container';
		$('#pageHead').parentNode.insertBefore(div, $('#pageHead').parentNode.firstChild);
		$('#fbf-page-head-container').insertBefore($('#pageHead'), $('#fbf-page-head-container').firstChild);
		addStyle(
			'#blueBar { position:fixed; z-index:15; }'+
			'#fbf-page-head-container { width:' + $('#pageHead').clientWidth + 'px; margin:0 auto; }'+
			'#pageHead { position:fixed; z-index:16; }'+
			'#headNav { width:' + $('#headNav').clientWidth + 'px; }'+
			'#content { padding-top:' + $('#blueBar').clientHeight + 'px; }'
		);
	} catch(x) { logError('Top Bar Fixed', x); }
}

//
// Top Bar Transparency
//
if ((prefs['TopBarFixed'] || prefs['TopBarOpacity'] < 0) && (prefs['TopBarOpacity']!='1.0' || prefs['TopBarHoverOpacity']!='1.0')) {
	if (prefs['TopBarOpacity'] < 0) { addStyle('#pageHead, #blueBar { display:none; } #content > div { padding-top:10px; }'); }
	else { addStyle('#pageHead, #blueBar { opacity:' + prefs['TopBarOpacity'] + '; } #pageHead #blueBar { opacity:1; } #pageHead:hover, #blueBar:hover { opacity:' + prefs['TopBarHoverOpacity'] + '; } #jewelCase .jewel { border-style:none; }'); }
}

//
// Bottom Bar Transparency
//
if (prefs['BottomBarOpacity']!='1.0' || prefs['BottomBarHoverOpacity']!='1.0') {
	if (prefs['BottomBarOpacity'] < 0) { addStyle(' #pagelet_presence { display:none; }'); }
	else { addStyle(' #pagelet_presence { opacity:' + prefs['BottomBarOpacity'] + '; } #pagelet_presence:hover { opacity:' + prefs['BottomBarHoverOpacity'] + '; }'); }
}

//
// Make CSS changes
//
var style='';
if (prefs['ChatDifferentiate'])			{ style = style + ' .fbChatBuddyList a.friend, #pagelet_friends_online .chatOnline { font-weight:bold; } .fbChatBuddyList a.idle, #pagelet_friends_online .chatIdle { font-weight:normal; font-style:italic; }'; }
if (prefs['ChatHideIdle'])				{ style = style + ' body .fbChatBuddyList a.idle { max-height:0; overflow:hidden; padding-top:0; padding-bottom:0; } #pagelet_friends_online .chatIdle { display:none; }'; }
if (prefs['HideEgos'])					{ style = style + ' .ego_column, .netego_organic, #netego_organic, #pagelet_netego, #pagelet_netego_lower, #pagelet_betabox { display:none; } #pagelet_netego_requests div.ego_column, #pagelet_netego_pokes div.ego_column { display:block; }'; }
if (prefs['HideHovercards'])			{ style = style + ' .HovercardOverlay { display:none; }'; }
if (prefs['AutoReadMore'])				{ style = style + ' .text_exposed_root .text_exposed_hide { display:none; } .text_exposed_root .text_exposed_show { display:inline; }'; }
if (prefs['BigAlbumPicturesBorder'])	{ style = style + ' #FBFBigAlbum a { padding:0 1px 1px 0; } #FBFBigAlbum img { border:1px solid #ccc; background:#fff; min-width:20px; min-height:20px; }'; }
if (prefs['HomeLeftColumnFixed'])		{ style = style + ' .home #leftCol { position:fixed; }'; }
if (prefs['HomeStretchMiddleColumn'])	{ style = style + ' .home li.uiUnifiedStory { padding-right:0; } .home form.commentable_item > ul {width: auto !important;}'; }
if (prefs['HomeStretch'])				{  style = style + ' .home #globalContainer { width:auto; margin:auto 7px; } .home #fbf-page-head-container { width:auto; } .home .hasRightCol { position:relative; } .home #contentCol #contentArea { margin-right:10px; width:auto; } .home #contentCol.hasRightCol #contentArea { margin-right:275px; width:auto; } .home .hasRightCol #rightCol { position:absolute; right:0; } .home .uiStream .hideSelector { margin-right:0; }'; }
else if (prefs['HomeLeftAlign'])		{ style = style + ' .home #globalContainer { margin:0 0 0 5px; ! important; }'; }
if (!prefs['FacebookTimestamps'])		{ style = style + ' abbr.timestamp { display:none; }'; }
if (!prefs['HomeProfile'])				{ style = style + ' #pagelet_welcome_box { display:none; }'; }
if (!prefs['HomeNavigation'])			{ style = style + ' #pagelet_navigation { display:none; }'; }
if (!prefs['HomeChat'])					{ style = style + ' #pagelet_friends_online { display:none; }'; }
if (!prefs['HomePokes'])				{ style = style + ' #pagelet_netego_pokes { display:none; }'; }
if (!prefs['HomeRecommendations'])		{ style = style + ' #pagelet_netego, #pagelet_netego_lower { display:none; }'; }
if (!prefs['HomeFindFriends'])			{ style = style + ' #pagelet_netego_lower { display:none; }'; }
if (!prefs['HomeEvents'])				{ style = style + ' #pagelet_eventbox { display:none; }'; }
if (!prefs['HomeRequests'])				{ style = style + ' #pagelet_netego_requests { display:none; }'; }
if (!prefs['HomeBeta'])					{ style = style + ' #pagelet_betabox { display:none; }'; }
if (!prefs['HomeLeftColumn'])			{ style = style + ' .fbx #mainContainer #leftCol { display:none; } .fbx #mainContainer #contentCol { margin-left:5px; }'; }
if (!prefs['HomeRightColumn'])			{ style = style + ' .fbx #mainContainer #rightCol { display:none; }'; $('#contentCol').className=$('#contentCol').className.replace(/ hasRightCol/,''); }
if (prefs['HomeChatNames']) {
	style = style+' '+
	'.fbx #pagelet_friends_online .uiListHorizontalItem { float:none; }'+
	'.fbx #pagelet_friends_online .uiTooltip .uiTooltipWrap { background:inherit; display:inline; position:relative; visibility:visible; }'+
	'.fbx #pagelet_friends_online .uiTooltipText { background-position:left center; background-color:inherit; color:inherit !important; border-right:none; display:inline-block; line-height:18px; padding:0 0 0 10px; margin-left:3px; width:130px; overflow:hidden; }'+
	'.fbx #pagelet_friends_online .uiProfilePhotoMedium { height:22px; width:22px; }'+
	'.fbx #pagelet_friends_online .chatOverlay { background-image:none !important; }';
}
if (style!='') { addStyle(style); }

try {
	if (prefs['HomeStretch']) { addStyle('.home #headNav { width:' + ($('#contentCol').clientWidth) + 'px; }'); } // must be done after the other "homestretch" css
} catch(x) { logError('Home Stretch CSS', x); }


//
// Listen for image mouseovers/mouseouts to show/hide popups
//
if (prefs['ProfilePicPopup'] || prefs['PhotoPopup']) {
	
	picRegex = /(https?:\/\/((profile\.|s-hprofile-|photos-|s-hphotos-|secure-media-).*?\.fbcdn\.net|fbcdn-(photos|profile)-a.akamaihd.net).*?(\/[aqst]\d[\d_]+|_[aqst])\.jpg)/;
	backgroundRegex = /(https?:\/\/((profile\.|s-hprofile-|photos-|s-hphotos-|secure-media-).*?\.fbcdn\.net|fbcdn-(photos|profile)-a.akamaihd.net).*?(\/[aqst]\d[\d_]+|_[aqnst])\.jpg)/;
	picRegex2 = /(src|url)=([^&]+)/;
	profilePixRegex = /\bfbcdn(.net|-profile-)/;

	function showPopupPic(e) {
		try {
			var t = e.target;
			
			var oldSrc;
			var newSrc;
			var title;

			if (t.tagName == 'IMG' && picRegex.test(t.src)) { oldSrc = t.src + '#1'; }
			else if (t.tagName == 'IMG' && (m=backgroundRegex.exec(t.style.backgroundImage))) { oldSrc = m[1] + '#2'; }
			else if (t.tagName == 'I' && (m=picRegex.exec(t.style.backgroundImage))) { oldSrc = m[1] + '#3'; }
			else if (t.parentNode && t.parentNode.firstChild.tagName == 'IMG' && (m=picRegex.exec(t.parentNode.firstChild.src))) { oldSrc = m[1] + '#4'; }
			else if (t.parentNode && t.parentNode.style && (m=picRegex.exec(t.parentNode.style.backgroundImage))) { oldSrc = m[1] + '#5'; }
			else if (t.src && (t.src.indexOf('app_full_proxy.php')!=-1 || t.src.indexOf('safe_image.php')!=-1) && (m=picRegex2.exec(t.src))) { oldSrc = unescape(m[2]) + '#6'; }
			
			// Facebook's code somtimes triggers the popup incorrectly when tagging (ie, even though the mouse is not actually over the image).
			if (oldSrc && oldSrc.match(/#4$/) && getStyle(t.parentNode.firstChild, 'cursor')=='crosshair') { return; }
			
			// Disable completely when tagging (only on the tagging image itself)
			if (!prefs['PopupWhileTagging'] && t.tagName=='IMG' && getStyle(t, 'cursor')=='crosshair') { return; }
			
			if (oldSrc || newSrc) {

				if (!newSrc) {
					if (m = oldSrc.match(/^["']+(.*)["']+$/)) { oldSrc = m[1]; } // Opera needs this, no idea why...
					newSrc = oldSrc.replace(/\/[aqst]([\d_]+)\.jpg/, "/n$1.jpg").replace(/\/([\d_]+)[aqst]\.jpg/, "/$1n.jpg");
				}

				if (!profilePixRegex.test(newSrc)) { newSrc = newSrc + '-external'; }
				else {
					if (newSrc.indexOf('profile')!=-1) { newSrc = newSrc + '-profile'; }
					else { newSrc = newSrc + '-photo'; }
				}

				if (profilePixRegex.test(newSrc) ? (newSrc.indexOf('profile')!=-1 ? prefs['ProfilePicPopup'] : prefs['PhotoPopup']) : prefs['ExternalPopup']) {

					clearTimeout(hidePopupPicTimeout);
					t.removeEventListener('mouseout', hidePopupPic, false);
					t.addEventListener('mouseout', hidePopupPic, false);
					
					//newSrc = newSrc.replace(/^https:\/\/fbcdn-photos/, 'https://fbcdn-sphotos');
					
					if (m = newSrc.match(/\/n(\d+)_\d+\.jpg/)) { profileLink = 'http://www.facebook.com/profile.php?id=' + m[1]; }
					else if (t.href) { profileLink = t.href; }
					else if (t.parentNode.href) { profileLink = t.parentNode.href; }
					else if (t.parentNode.parentNode.href) { profileLink = t.parentNode.parentNode.href; }

					showPopupPicTimeout = setTimeout(function(){
						$('#ff-popup-pic-image').innerHTML = '<a href="' + profileLink + '"><img src="' + newSrc + '" alt="HFP - ' + $l('LoadingPic') + '" style="max-height:' + (window.innerHeight-35) + 'px;"/></a>';
						$('#ff-popup-pic-div').style.display = 'block';
						$('#ff-popup-pic-div').className = 'fbfPopup ff-popup-pic-div-' + (prefs['PopupPosition'] == 'auto' ? (e.pageX>document.body.clientWidth/2 ? 'left' : 'right') : prefs['PopupPosition']);
					}, prefs['DelayPopupPics'] ? prefs['DelayPopupPicsTimeout'] : 0);

				}

			}

		} catch(x) { logError('Popup Pic', x); }
	}

	$('#ff-popup-pic-div').addEventListener('mouseover', function(e) { clearTimeout(hidePopupPicTimeout); }, false);

	$('#ff-popup-pic-div').addEventListener('mouseout', function(e) {
		var r = e.relatedTarget;
		if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
			while (r.parentNode && r.id!='ff-popup-pic-div') { r = r.parentNode; }
			if (r.id!='ff-popup-pic-div') { document.getElementById('ff-popup-pic-div').style.display = 'none'; }
		}
	}, false);

	window.addEventListener('mouseover', function(e) {
		if (!e.shiftKey && !e.ctrlKey && !e.altKey) { showPopupPic(e); }
	}, false);

	function hidePopupPic(e) {
		if (prefs['DelayPopupPics']) { clearTimeout(showPopupPicTimeout); }
		if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
			hidePopupPicTimeout = setTimeout(function() { document.getElementById('ff-popup-pic-div').style.display = 'none'; }, 30);
		}
	}

}


//
// Modify search form to search results open in a new tab/window
//
if (prefs['NewTabSearch'] && $('#q')) {
	$('#q').addEventListener('keydown', function(e) {
		if (e.keyCode == 13 && e.ctrlKey) { $('#navSearch').target = '_blank'; }
		else { $('#navSearch').target = ''; }
	}, false);
}

//
// Add useful date functions
//
Date.prototype.getNextDay=function(){var nextDay=new Date(); nextDay.setTime(this.getTime()+86400000); return nextDay; }
Date.prototype.before=function(date){if(!date)date=new Date(); return this.getTime()<date.getTime();}
Date.prototype.past=function(date){if(!date)date=new Date(); var thisDate=this; thisDate.setHours(0); thisDate.setMinutes(0); thisDate.setSeconds(0); date.setYear(thisDate.getFullYear()); return thisDate.getTime()<date.getTime();}
Date.prototype.getAge=function(){var now=new Date(); return this.past(new Date())?now.getFullYear()-this.getFullYear():now.getFullYear()-this.getFullYear()-1;}
Date.prototype.toISOString=function(includeTime){return ''+this.getFullYear()+$0(this.getMonth()-0+1)+$0(this.getDate())+(includeTime?'T'+$0(this.getHours())+$0(this.getMinutes())+$0(this.getSeconds()):'');}
Date.prototype.format = function() { var monthNames = $l('Months'); return monthNames[this.getMonth()] + ' ' + this.getDate() + ', ' + this.getFullYear(); }
Date.prototype.getFormattedTime = function(use24Hours) { return (use24Hours ? $0(this.getHours()) : (this.getHours()%12==0 ? '12' : this.getHours()%12)) + ':' + $0(this.getMinutes()) + (use24Hours ? '' : (this.getHours()>11 ? 'pm' : 'am')); }
Date.prototype.getSign=function(){ var signs = $l('Signs'); var endDates=new Array(19,18,20,19,20,21,22,22,22,22,21,21); return signs[this.getDate()>endDates[this.getMonth()]?(this.getMonth()+1)%12:this.getMonth()]; }


//
// Add link for showing full-size album pictures
//
function addBigAlbumPicLinks() {
	
	if (!$('#ff-bap-link')) {
		var a = document.createElement('a');
		a.innerHTML = $l('ShowBigPictures');
		a.id = 'ff-bap-link';
		
		// albums
		if ((container = $('.uiHeaderSubTitle', '#content')) && container[0]) {
			container[0].appendChild(document.createTextNode(' • '));
			container[0].appendChild(a);
		}
		
		// photo tabs on new profiles
		else if ((container = $('.uiHeaderTitle', '#pagelet_photos_of_me')) && container[0]) {
			container[0].appendChild(document.createTextNode(' • '));
			container[0].appendChild(a);
		}
		
		// photo tabs on old profiles
		else if (container = $('//*[@id="photos_of_wrapper"]/preceding-sibling::* //div', null, true)) {
			container.appendChild(document.createTextNode(' • '));
			container.appendChild(a);
		}

		on('click', a, function(e) {
			var tables = $('./following::table[contains(@class,"fbPhotosGrid")]', e.target); // new albums/profiles use this
			if (tables.snapshotLength==0) { tables = $('./following::table[contains(@class,"UIPhotoGrid_Table")]', e.target); } // old albums/profiles use this
			var buf = '';
			for (var t=0; t<tables.snapshotLength; t++) {
				var cells = $('td', tables.snapshotItem(t));
				for (i=0; i<cells.length; i++) {
					var src = (cells[i].getAttribute('data-src',null) || cells[i].innerHTML).match(/(https?:\/\/[^"]+\.jpg)[^&]/);
					if (src) { src=src[1]; }
					else { continue; }
					var link = $('a', cells[i])[0];
					if (link.className.indexOf('uiVideoLink')!=-1) { continue; } // skip video thumbnails
					var title = ($('a', cells[i])[0].getAttribute('title') || '').replace('"', '&quot;');
					buf+=	'<a href="' + link.href + '">'+
							'<img src="' + src.replace(/\/[as]([\d_]+)\.jpg/, '/n$1.jpg').replace(/\/([\d_]+)[as]\.jpg/, '/$1n.jpg') + '" title="' + title + '" />'+
							'</a>';
				}
			}
			hidePopup();
			showPopup('<div id="FBFBigAlbumContainer"><div id="FBFBigAlbum" class="fbfPopup"><div id="FBFBigAlbumClose1" class="FBFBigAlbumClose">' + $l('Close') + '</div>' + buf + '<div id="FBFBigAlbumClose2" class="FBFBigAlbumClose">' + $l('Close') + '</div></div></div>', false);
			on('click', Array('#FBFBigAlbumClose1','#FBFBigAlbumClose2'), hidePopup);
		});
	}
}

//
// Process the page at regular intervals
//
processing = setInterval(processPage, prefs['ProcessInterval']);
processPage();

function processPage() {

	//
	// Figure out what page we're looking at
	//
	loc = window.location.href.toLowerCase();
	page = loc.split('facebook.com/')[1];
	if (page.indexOf('#')!=-1) {
		buf = page.split('#');
		page = buf[1]!='' ? buf[1] : buf[0];
	}
	page = page.replace(/^!?\//,'');
	//if (page!=lastPage) { log('Page => "' + page + '"'); }// DEBUG ONLY

	if (page != lastPage && prefs['PopupAutoClose'] && $('#ff-popup-pic-div')) {
		$('#ff-popup-pic-div').style.display = 'none';
		lastPage = page;
	}

	//
	// Show date/time of comments and feed items
	//
	if (prefs['FBFTimestamps']) {
		var today = new Date()
		var yesterday = new Date();
		yesterday.setTime(today.getTime()-24*60*60*1000);
		var fTimestamp = new Date();
		var timestamps = $('//abbr[@class="timestamp"]');
		for (var i=0; i<timestamps.snapshotLength; i++) {
			var t = timestamps.snapshotItem(i);
			fTimestamp.setTime(Date.parse(t.title));
			fTimestamp.setTime(Date.parse(t.getAttribute('data-date')));
			t.className = t.className + ' timed';
			var fbfTimestamp = document.createElement('span');
			fbfTimestamp.innerHTML = (prefs['FacebookTimestamps']?' (':'') + (fTimestamp.toISOString()==today.toISOString() ? '' : (fTimestamp.toISOString()==yesterday.toISOString() ? 'Yesterday' : fTimestamp.toISOString()) + ' at ') + fTimestamp.getFormattedTime(prefs['FBFTimestamps24']) + (prefs['FacebookTimestamps']?') ':'');
			t.parentNode.insertBefore(fbfTimestamp, t.nextSibling);
		}
	}


	//
	// Customize Home Page
	//
	if (isHomePage()) {
		try {

			homeStream = $('#home_stream');
			if (homeStream && !homeStream.className.match(/\bfbf\b/)) {
			
				homeStream.className = homeStream.className + (' fbf');
			
			}

			// Make today's events bold
			try {
				var eventDays = $('//div[contains(@class,"UIUpcoming_Item")][not(contains(@class,"fbf-handled"))]');
				for (var i=0; i<eventDays.snapshotLength; i++) {
					eventDays.snapshotItem(i).className = eventDays.snapshotItem(i).className + ' fbf-handled';
					if (eventDays.snapshotItem(i).getElementsByTagName('span')[0].innerHTML.toLowerCase().indexOf($l('today'))!=-1) {
						eventDays.snapshotItem(i).style.fontWeight = 'bold';
					}
				}
			} catch(x) { logError('Bold Events', x); }

			// Modify the live feed
			try {
				if (prefs['CustomFeedModification'].length>0 || prefs['HideApplicationStories'] || prefs['HideEventStories'] || prefs['HideFriendStories'] || prefs['HideGroupStories'] || prefs['HideLikeStories'] || prefs['HideLinkStories'] || prefs['HideNoteStories'] || prefs['HidePhotoStories'] || prefs['HidePlaceStories'] || prefs['HideProfilePicStories'] || prefs['HideRelationshipStories'] || prefs['HideStatusStories'] || prefs['HideVideoStories'] || prefs['HideWallStories']) {
					var stream = $('#pagelet_home_stream');
					var whitelist = JSON.parse(prefs['ApplicationWhitelist']);
					whitelistRegex = whitelist.length==0 ? null : new RegExp('/apps/application\\.php\\?id=(' + whitelist.join('|') + ')\\b');
					if (stream) {
						var blockedIDs = Array();
						var blockedStoryXPath = Array();
						var highlightedStoryXPath = Array();
						
						if (prefs['HideApplicationStories'])	{ blockedIDs = blockedIDs.concat(Array('237','313')); }
						if (prefs['HideEventStories'])			{ blockedIDs = blockedIDs.concat(Array('1','38','178')); }
						if (prefs['HideFriendStories']) 		{ blockedIDs = blockedIDs.concat(Array('8','12')); }
						if (prefs['HideGroupStories'])			{ blockedIDs = blockedIDs.concat(Array('4','21', '316')); }
						if (prefs['HideLikeStories'])			{ blockedIDs = blockedIDs.concat(Array('161','283')); }
						if (prefs['HideLinkStories'])			{ blockedIDs = blockedIDs.concat(Array('5','263')); }
						if (prefs['HideNoteStories'])			{ blockedIDs = blockedIDs.concat(Array('66')); }
						if (prefs['HidePhotoStories'])			{ blockedIDs = blockedIDs.concat(Array('6','7','65','247')); }
						if (prefs['HidePlaceStories'])			{ blockedIDs = blockedIDs.concat(Array('278', '285')); }
						if (prefs['HideProfilePicStories'])		{ blockedIDs = blockedIDs.concat(Array('60', '259')); }
						if (prefs['HideRelationshipStories'])	{ blockedIDs = blockedIDs.concat(Array('10')); }
						if (prefs['HideStatusStories'])			{ blockedIDs = blockedIDs.concat(Array('11','46')); }
						if (prefs['HideVideoStories'])			{ blockedIDs = blockedIDs.concat(Array('3','128','130')); }
						if (prefs['HideWallStories'])			{ blockedIDs = blockedIDs.concat(Array('56','273')); }
						if (blockedIDs.length>0) {
							blockedStoryXPath.push("contains(@data-ft,'\"sty\":" + blockedIDs.join(",') or contains(@data-ft,'\"sty\":") + ",')");
						}
						
						if (prefs['CustomFeedModification'].length>0) {
							try {
								var custom = prefs['CustomFeedModification'].split(/\r?\n\r?/);
								for (var i=0; i<custom.length; i++) {
									if (m = custom[i].match(/^[^#]+/)) {
										var rule = m[0].replace(/^\s*|\s*$/g,'');
										if (m = rule.match(/^-\s*(\d+)$/)) { blockedStoryXPath.push("contains(@data-ft,'\"sty\":" + m[1] + ",')"); }
										else if (m = rule.match(/^-\s*(.+)$/)) { blockedStoryXPath.push("contains(string()," + (m[1].indexOf("'")!=-1 ? '"'+m[1]+'"' : "'"+m[1]+"'") + ")"); }
										else if (m = rule.match(/^\+\s*(\d+)$/)) { highlightedStoryXPath.push("contains(@data-ft,'\"sty\":" + m[1] + ",')"); }
										else if (m = rule.match(/^\+\s*(.+)$/)) { highlightedStoryXPath.push("contains(string()," + (m[1].indexOf("'")!=-1 ? '"'+m[1]+'"' : "'"+m[1]+"'") + ")"); }
										else { log('Ignoring ' + rule); }
									}
								}
							} catch(x) { logError('Custom Feed Modification', x); }
						}
						
						if (blockedStoryXPath.length>0) {
							var elms = $(".//*[contains(@class,'uiUnifiedStory') and (" + blockedStoryXPath.join(' or ') + ")]", stream);
							for (var i=0; i<elms.snapshotLength; i++) {
								if (whitelistRegex===null || !whitelistRegex.test(elms.snapshotItem(i).innerHTML)) {
									elms.snapshotItem(i).parentNode.removeChild(elms.snapshotItem(i));
								}
							}
						}
						
						if (highlightedStoryXPath.length>0) {
							var elms = $(".//*[contains(@class,'uiUnifiedStory') and not(contains(@class,'HFP-highlighted-story')) and (" + highlightedStoryXPath.join(' or ') + ")]", stream);
							for (var i=0; i<elms.snapshotLength; i++) { elms.snapshotItem(i).className=elms.snapshotItem(i).className + ' HFP-highlighted-story'; }
						}
					}
				}
			} catch(x) { logError('Live Feed', x); }

		} catch(x0) { logError('Home', x0); }
	}

	//
	// Replace links with HTTPS versions
	//
	if (prefs['SecureLinks']) {
		var links = $("//a[contains(@href,'facebook.com')]");
		for (var i=0; i<links.snapshotLength; i++) { links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/^http:\/\/([^\.]*\.)?facebook\.com\//,'https://$1facebook.com/'); }
	}
	
	//
	// Disable Theater
	//
	if (prefs['DisableTheater']) {
		location.href='javascript:void(window.PhotoTheater=null)';
	}

	//
	// Show big album pictures
	//
	if (prefs['BigAlbumPictures']) {
		try {
			if (page.indexOf('album.php')!=-1 || page.indexOf('photo_search.php')!=-1 || page.indexOf('media/set/')!=-1 || page.indexOf('sk=photos')!=-1 || page.indexOf('v=photos')!=-1) {
				addBigAlbumPicLinks();
			}
		} catch(x) { logError('Big Album Pictures', x); }
	}

	//
	// Add calendar features to Events pages
	//
	if ((prefs['GoogleCalendar'] || prefs['iCalendar']) && page.indexOf('events.php')==0) {
		if (prefs['iCalendar'] && page.indexOf('events.php?bday=1')==0) {
			try {
				var elm = document.evaluate("//div[contains(@class,'summary_bar')][1]/div[@class='summary'][1]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE ,null).singleNodeValue;
				if (elm!=null) {
					if (elm.className.indexOf('fbfcal')!=-1) { return; }
					elm.className = elm.className + ' fbfcal';
					elm.innerHTML = elm.innerHTML + ' | <a href="#" id="fbfical">' + $l('ExportICalendarFile') + '</a><span id="fbfcalwarning"> ' + $l('ExportICalendarFileWarning') + '</span>';
					document.getElementById('fbfical').addEventListener('click', function(e) {
						if (e.target.href.match(/#$/)) {
							e.stopPropagation();
							e.preventDefault();
							document.getElementById('fbfical').innerHTML = $l('CreatingFile');
							setTimeout(function(){
								var now = new Date();
								var day = now.getDate();
								var month = now.getMonth()+1;
								var year = now.getFullYear();
								var divs = document.evaluate("//div[@class='bdaycal_month_section']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE ,null);
								var ical = 'BEGIN:VCALENDAR%0D%0AVERSION:2.0%0D%0APRODID:HFP%0D%0A';
								var eventMonth;
								var date;
								var days;
								var bdays;
								for (i=0; i<divs.snapshotLength; i++) {
									eventMonth = $m(divs.snapshotItem(i).id)+1+'';
									if (eventMonth<10) { eventMonth = '0' + eventMonth; }
									days = divs.snapshotItem(i).innerHTML.replace(/.*<\/table>/,'').split(/<br[^>]*>/g);
									for (j=0; j<days.length; j++) {
										if (m = days[j].match(/^(\d+)/)) {
											bdays = days[j].split(',');
											for (k=0; k<bdays.length; k++) {
												if (n = bdays[k].match(/[^>]+>([^<]+)/)) {
													date = ((eventMonth < month || (eventMonth == month && m[1] < day)) ? year-0+1 : year) + eventMonth + m[1];
													ical = ical + 'BEGIN:VEVENT%0D%0ASUMMARY:' + $l('Birthday',prefs['CalendarFullName'] ? n[1] : n[1].split(' ')[0]) + '%0D%0ADESCRIPTION:' + $l('Birthday',n[1]) + '%0D%0ADTSTART:' + date + '%0D%0ADTEND:' + date + '%0D%0ARRULE:FREQ=YEARLY%0D%0AEND:VEVENT%0D%0A';
												}
											}
										}
									}
								}
								e.target.href = 'data:text/calendar;charset=US-ASCII,' + ical + 'END:VCALENDAR';
								e.target.onclick='';
								location.replace(e.target.href);
								document.getElementById('fbfcalwarning').style.display = 'none';
								document.getElementById('fbfical').innerHTML = $l('ExportICalendarFile');
							},0);
						}
					}, false);
				}
			} catch(x) { logError('iCalendar', x); }
		} else if (prefs['GoogleCalendar'] && page.indexOf('events.php?archive=1')!=0) {
			var divs = $('.partyrow');
			var now = new Date();
			var year = now.getFullYear();
			var div;
			if (divs.length>0) {
				for (var i=0; i<divs.length; i++) {
					div = divs[i];
					var tds = div.getElementsByTagName('td');
					for (var j=0; j<tds.length; j++) {
						if (tds[j].className == 'actions' && tds[j].innerHTML.indexOf('class="calLink"')==-1) {
							h = div.innerHTML;
							title = h.match(/class="etitle">([^<]+)</i)[1];
							where = h.match(/Where:<\/td><td>(.+?)<\/td/i)[1];
							when = h.match(/When:<\/td><td>(.+?)<\/td/i)[1];
							host = h.match(/Hosted by:<\/td><td>(.+?)<\/td/i)[1];
							var startDate, endDate;
							if (m = when.match(/^(.*)<.+?>(.*)$/)) {
								startDate = $d(m[1]);
								endDate = $d(m[2]);
							}
							else if (m = when.match(/(.*)( \d\d?:\d\d ?(am|pm)?).*( \d\d?:\d\d ?(am|pm)?)/)) {
								startDate = $d(m[1]+m[2]);
								endDate = $d(m[1]+m[4]);
								if (endDate!=null && endDate.before(startDate)) { endDate=endDate.getNextDay(); }
							}
							if (startDate==null || endDate==null) return;
							var calLink = document.createElement('a');
							calLink.innerHTML = $l('AddToCalendar');
							calLink.className = 'calLink';
							calLink.href = 'http://www.google.com/calendar/' + (prefs['GoogleApps'] && prefs['GoogleAppsDomain']!='' ? 'hosted/'+prefs['GoogleAppsDomain']+'/' : '') + 'event?action=TEMPLATE&text=' + title + '&dates=' + startDate.toISOString(true) + '/' + endDate.toISOString(true) + '&location=' + where + '&details=Hosted by ' + host;
							tds[j].appendChild(calLink);
							break;
						}
					}
				}
			}
		}
	}

	//
	// Show birthday info and Google Calendar link
	//
	if ((prefs['Age'] || prefs['Sign'] || prefs['GoogleCalendar']) && (page.match(/^profile.php/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1))) {
		try {
			var bdayNode = $("//div[@id='pagelet_byline']//i[contains(@class,'sx_6a76d9')]/parent::span[not(contains(@class,'ffhandled'))]",null,true);
			if (bdayNode != null) {
				bdayNode.className = bdayNode.className + ' ffhandled';
				var info = [];
				var now = new Date();
				var bday = $d(bdayNode.textContent);
				if (bday!=null)  {
					var past = bday.past();
					if (prefs['Age']) { if (now.getFullYear()!=bday.getFullYear()) { info.push($l('yearsOld',bday.getAge())); } }
					if (prefs['Sign']) { info.push(bday.getSign()); }
					if (prefs['GoogleCalendar']) {
						var thisYearBday = new Date();
						thisYearBday.setTime(bday.getTime());
						thisYearBday.setYear(past ? now.getFullYear()-0+1 : now.getFullYear());
						var name = $('.profileName')[0].innerHTML;
						info.push('<a href="http://www.google.com/calendar/' + (prefs['GoogleApps'] && prefs['GoogleAppsDomain']!='' ? 'hosted/'+prefs['GoogleAppsDomain']+'/' : '') + 'event?action=TEMPLATE&text=' + $l('Birthday',prefs['CalendarFullName'] ? name : name.split(' ')[0]) + '&dates=' + thisYearBday.toISOString() + '/' + thisYearBday.getNextDay().toISOString() + '&details=' + $l('Birthday',name) + (prefs['CalendarBirthDate'] && now.getFullYear()!=bday.getFullYear() ? ' - ' + bday.format() : '') + '">' + $l('AddToGoogleCalendar') + '</a>');
					}
					if (info) { bdayNode.innerHTML = bdayNode.innerHTML + ' (' + info.join(', ') + ') '; }
				}
			}
		} catch(x) { logError('Age/Sign/Calendar', x); }
	}

	//
	// Show video download link
	//
	if (prefs['DownloadVideo'] && page.match(/^video\/video.php\?.*v=/)) {
		try {
			var parent = $("//div[@id='video_actions']/ul[@class='actionspro'][1]", null, true);
			if (!$('#fbf-video-link')) {
				var videoSrc;
				var embed = $("//embed[contains(@flashvars,'video_src')][1]", null, true);
				if (embed) { videoSrc = unescape(embed.getAttribute('flashvars')).match(/video_src=([^&]*)/)[1]; }
				else { videoSrc = unescape($("//div[@id='js_buffer']/script", null, true).text.match(/addVariable\(\"video_src\", \"(|([^\"]|\\\")*[^\\])\"/)[1]); }
				var link = document.createElement('li');
				link.id = 'fbf-video-link';
				link.className = 'actionspro_li';
				link.innerHTML = '<a class="actionspro_a" href="' + videoSrc + '" title="' + $l('DownloadVideo') + '" />' + $l('DownloadVideo') + '</a>';
				parent.insertBefore(link, parent.lastChild.nextSibling);
			}
		} catch(x) { logError('Download Video', x); }
	}

	//
	// Change page title
	//
	try {
		if (prefs['HideFacebookCountInTitle']) { document.title = document.title.replace(/Facebook \(\d+\)/, 'Facebook'); }
		if (prefs['PageTitle']) { document.title = document.title.replace(/Facebook.*?\| /, ''); }
		if (prefs['FriendRequestCountInTitle'] || prefs['NotificationCountInTitle'] || prefs['InboxCountInTitle']) {
			var counts = Array();
			if (prefs['FriendRequestCountInTitle']) {
				var count = $('//a[@id="jewelRequest"]/span/span', null, true);
				if (count && count.innerHTML>0 && getStyle(count.parentNode,'display')!='none') { counts.push(count.innerHTML + 'f'); }
			}
			if (prefs['InboxCountInTitle']) {
				var count = $('//a[@id="jewelMail"]/span/span', null, true);
				if (count && count.innerHTML>0 && getStyle(count.parentNode,'display')!='none') { counts.push(count.innerHTML + 'm'); }
			}
			if (prefs['NotificationCountInTitle']) {
				var count = $('//a[@id="jewelNotif"]/span/span', null, true);
				if (count && count.innerHTML>0 && getStyle(count.parentNode,'display')!='none') { counts.push(count.innerHTML + 'n'); }
			}
			if (counts.length>0) {
				if (document.title.charAt(0) == '(') { document.title = document.title.replace(/^\(.*?\)/, '(' + counts.join(' ') + ')'); }
				else { document.title = '(' + counts.join(' ') + ') ' + document.title; }
			} else {
				document.title = document.title.replace(/^\(.*?\)/, '');
			}
		}
	} catch(x) { logError('Page Title', x); }

	//
	// Reload Error Page
	//
	if (prefs['ErrorPageReload'] && $('#content') && $('#content').innerHTML.toLowerCase().indexOf('error while loading page from')!=-1 && $('#try_again_button')) {
		tryAgainButton=$('#try_again_button');
		if (tryAgainButton.className.indexOf('autoreload')==-1) {
			tryAgainButton.className = tryAgainButton.className + ' autoreload';
			tryAgainButton.value = $l('ReloadErrorPage');
			setTimeout("if (document.getElementById('try_again_button')) { window.location.reload(); }", 5000);
		}
	}

	//
	// Add Protocol Links
	//
	if (prefs['ProtocolLinks'] && (page.match(/profile\.php\?id=.*&v=info/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1) && page.indexOf('v=info')!=-1) && $('#info_section_info_contact') && $('#info_section_info_contact').className.indexOf('fbfhandled')==-1) {
		try {
			$('#info_section_info_contact').className = $('#info_section_info_contact').className + ' ' + 'fbfhandled';
			var dds = $('#info_section_info_contact').getElementsByTagName('dd');
			var dts = $('#info_section_info_contact').getElementsByTagName('dt');
			for (var i=0; i<dds.length; i++) {
				if (dts[i].innerHTML == 'Skype:') { dds[i].innerHTML = '<a href="skype:' + dds[i].innerHTML + '?call" title="' + $l('ProtocolSkype', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
				if (dts[i].innerHTML == 'Windows Live:') { dds[i].innerHTML = '<a href="msnim:chat?contact=' + dds[i].innerHTML + '" title="' + $l('ProtocolMSN', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
				if (dts[i].innerHTML == 'Yahoo:') { dds[i].innerHTML = '<a href="ymsgr:sendIM?' + dds[i].innerHTML + '" title="' + $l('ProtocolYahoo', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
				if (dts[i].innerHTML == 'Google Talk:') { dds[i].innerHTML = '<a href="xmpp:' + dds[i].innerHTML + '" title="' + $l('ProtocolGoogle', dds[i].innerHTML) + '">' + dds[i].innerHTML + '</a>'; }
			}
		} catch(x) { logError('Protocol Links', x); }
	}

	//
	// Load thumbnails for entire album
	//
	if (page.match(/^album.php?/)) {
		try {
			var pager = $('.pagerpro')[0];
			if (pager && pager.className.indexOf(' fbfhandled')==-1) {
				pager.id='fbf_photo_pagination';
				pager.className = pager.className + ' fbfhandled';
				if (prefs['AutoLoadFullAlbum']) {
					loadFullAlbum();
				} else {
					var loadAlbumLink = document.createElement('li');
					loadAlbumLink.className = 'pagerpro_li';
					loadAlbumLink.innerHTML = '<a id="FBFLoadAllPhotos" class="pagerpro_a" href="#" onclick="return false;" title="' + $l('LoadPhotosWarning') + '">' + $l('all') + '</a>';
					pager.insertBefore(loadAlbumLink, pager.lastChild.nextSibling);
					onClick('FBFLoadAllPhotos', function(e) {
						setTimeout(function(){ loadFullAlbum(); }, 0);
					});
				}
			}
		} catch(x) { logError('Album Thumbnails', x); }
	}

	//
	// Load thumbnails for tagged photos
	//
	if (page.match(/^profile.php?.*v=photos/) || (page.indexOf('.php')==-1 && page.indexOf('/')==-1 && page.indexOf('v=photos')!=-1)) {
		try {
			var pager = $('.pagerpro')[0];
			if (pager && pager.className.indexOf(' fbfhandled')==-1) {
				pager.id='fbf_photo_pagination';
				pager.className = pager.className + ' fbfhandled';
				if (prefs['AutoLoadTaggedPhotos']) {
					loadTaggedPhotos();
				} else {
					var loadAlbumLink = document.createElement('li');
					loadAlbumLink.className = 'pagerpro_li';
					loadAlbumLink.innerHTML = '<a id="FBFLoadAllPhotos" class="pagerpro_a" href="#" onclick="return false;" title="' + $l('LoadPhotosWarning') + '">' + $l('All') + '</a>';
					pager.insertBefore(loadAlbumLink, pager.lastChild.nextSibling);
					onClick('FBFLoadAllPhotos', function(e) {
						setTimeout(function(){ loadTaggedPhotos(); }, 0);
					});
				}
			}
		} catch(x) { logError('Tagged Photos Thumbnails', x); }
	}

}


}) ();

// There are only 10 types of people in the world - those who understand ternary, those who don't, and those who mistake it for binary :)

})();
