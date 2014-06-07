// ==UserScript==
// @name         Tieba black Skin
// @namespace    http://jixun.org/
// @version      1.0.1.8
// @description  Just Another Tieba Skin
// @include      http://tieba.baidu.com/*
// @copyright    2012+, Jixun
// @run-at       document-end
// ==/UserScript==

var cssCode = '\
.hdtag *, .region_3 .region_title, .zyq_mod_title span.j_mod_tit, .tl span.zyq_mod_title {color: white;}\
.sign_succ2 {margin-top: -55px;}\
.sign_succ2 *, #tipscontent { color: black; } \
body[class^="skin_"], .frs_nav_3 .icon_tab, .frs_nav_3 .icon_tab_hover, .frs_nav_3 .icon_tab_focus, \
.frs_nav_3 .small_tab_hover, .frs_nav_3 .small_tab_focus, .frs_nav_3 .small_tab_hover a, \
.frs_nav_3 .small_tab_focus a, .frs_nav_3 .divide, .frs_nav_3 .nav_forum_name, .tbsug_expand ul, \
.frs_nav_3 .icon_tab_discuss, .frs_nav_3 .icon_tab_picture, .frs_nav_3 .focus, \
.frs_nav_3 .focus a, .frs_nav_3 .nav_icon, .frs_nav_3 .nav_wrap, .frs_nav_3 li.divide_line,\
.p_postlist, div.wrap1 div.wrap2, #com_userbar .u_ddl_con li a, div[class*="core_title"],\
div[class*="core_title"] *, .p_thread, #editor .editor_title_txt, #editor td, .lzl_simple_wrapper,\
.j_lzl_p a, .lzl_link_fold, .u_ddl_con_top ul, .s_tab hdtag *, .lzl_content_main, .tb-editor-toolbar,\
.tb-editor-editarea-wrapper, input, #tb_header_search_form input, #refresh, #container, .frs_content,\
.l_pager a, .pager a, .nav_forum_menu .n_menu_wrap, .nav_forum_menu .btn_inherit, .fleft, .sub_nav ul,\
#feed_sub_tab a, #newTopPanel, html, .text_point, .feat_time, .feat_replynum, .feat_refreshlink,\
.frs_nav_3 .nav_right a.often_forum, .frs_nav_3 .nav_right a.often_forum:hover, .file_item .file_btn, \
.sub_nav li a, #featureList thead, #featureList .oneRow, #featureList .twoRow, .child_sub_nav, \
#eval_panel a.white, #eval_panel a, #evaluate_list .twoRow, #evaluate_list .oneRow, .tb_nav_sub_divide,\
.tab_picture_2, .tab_picture_1, .tab_picture, .tab_forumname, .v2_tab_tab, .v2_tab_tab_text,\
#editor .edit_title_field {\
  background: black;\
  color: white;\
}\
#featureList .oneRow, #featureList .twoRow { border: white 1px dashed;  }\
.feat_refreshlink { width: auto; margin-top: 1px; }\
.sub_nav li.current, .sub_tab_cur a, .tab_content .tab_cur, \
.child_sub_nav li.current { background: none; border-color: #5C9DFF; }\
.tab_content .tab_cur { border-bottom: none; }\
input[type="input"] { background: white; }\
#com_userbar a:link, #com_userbar a:active, #com_userbar a:visited, #com_userbar a:hover,\
a, a> font, a[href], a[href]:link { color: white !important; }\
.threadlist_li_gray a:link, .threadlist_li_gray a:visited, .threadlist_li_gray .threadlist_abs { color: black !important; }\
#com_userbar .u_ddl_con li a:hover, #main_aside, .threadlist .threadlist_li_gray[data-field], \
#eval_panel a.back { background: grey; }\
.threadlist_files li { color: purple; }\
.tb-editor-editarea, #editor .tb-editor-editarea { background: black; color: white; }\
a[href]:visited { color: gray; }\
#quick_reply, #j_favthread .p_favthr_main { width: auto; padding: 0 5px; }\
#feat, .sub_tab_content { margin-top: -1px; }\
.frs_nav_3 .nav_wrap, .core_reply_content, .search .s_btn, .core_title_btns li, div#contet_wrap.contet_wrap,\
#aside.aside, td input, .vpic_small, #feat, #content_aside, .content_aside, .feat_refreshlink, \
.feed, .sub_tab_content {\
  border: 1px white solid;\
}\
.louzhubiaoshi { right: -125px; top: -20px; }\
#footer, [id*="promote"], li.u_mobile, .p_share_ding, .wapapp_adv, #balv_mod, .sign_title_text2, .l_post.noborder .louzhubiaoshi_wrap,\
.share_thread, .dir_rank, #frs_old_version, li.icon div.badge, #search_mod, .sign_rights, div[class*="banner"], \
div[class*="aside_ad"], .pc2client, .main_header, div[class^="forum_ba_"], div[class$="item_list_tip"], .hot10item, \
#tieba_logo, .aside_new, .common_source_top, .common_source_bottom {\
  display: none !important;\
}\
.search .s_btn_wr, .left_section, .core_reply_wrapper, .lzl_panel_wrapper *, div[class^="core_reply_border_"], \
.threadlist li.threadlist_li_gray, .enter_pb_wrapper, .media_disp, .vpic_small, .threadlist_li_gray .enter_pb_wrapper,\
#frs_nav .li_often_forum a.btn_select, #frs_nav .li_often_forum a.btn_select:hover, .nav_icon.often_forum, \
#main_wrapper .ibody { background: none; }\
.j_user_sign { max-height: 75px; }\
.d_sign_split {\
  background: none;\
  margin-top: -20px;\
}\
.core_title_btns {margin-right: 200px;}\
#container, #main_wrapper .ibody {\
  margin: auto 30px;\
  width: auto;\
}\
.d_post_content_main { float: none; margin-right: 110px; }\
.core, .l_post, .d_post_content_main, .refer_url a { width: auto; white-space:normal; }\
.pager .cur, .l_pager span.tP, .red {\
  color: greenyellow;\
  padding: 0px 5px;\
}\
.core_reply_content li { border-top: 1px white dashed; }\
.d_author, .d_author_anonym, .lzl_panel_wrapper { float: right; } \
.editor_for_container {margin-bottom: 7px;}\
.lzl_panel_btn span { border: 1px white solid; background: black; margin-top: -10px; }\
.insertsmiley_holder:before { content:"表情"; padding-left: 3px; }\
#refresh:before { content:"刷"; padding: 3px; border: 1px white solid; }\
.tb-editor-overlay span.arrow { top: 2px; border: none; margin-left: 4px; display: none; }\
.region_2 {background: none; border-style: none; padding-top: 0; }\
.tb-editor-toolbar span[data-cmd] { width: 7px !important; margin-right: 10px; }\
#editor span.subTip {margin-left: 20px;}\
#goTop { right: 15px; left: auto; }\
th_footer_2 {width: auto;}\
.threadlist_abs {color: lightgray;}\
div#contet_wrap.contet_wrap {width: 100%;}\
.right_section, #aside.aside { margin-top: -10px; background: none; right: 12px; position: absolute; }\
#aside.aside { right: 26px; background: black; margin: 0; }\
.aside .sign_mod2 { background: black; border-style: none;}\
#convertLinks, .ui_btn, .subbtn_bg { border: 2px black solid; border-radius: 3px;}\
.threadlist_li_gray .ui_btn { border-color: grey; } \
.threadlist_li_right { width: 70%; margin-left: 20px; min-width: 663px; }\
.th_footer_2, .th_footer_1 {width: auto;}\
.threadlist_reply_date {color: lightgrey;}\
#editor .subbtn_bg#convertLinks, .ui_btn { height: 27px; }\
.l_badge {opacity: 0}\
.frs_nav_3 .nav_center { float: right; color: black !important }\
.tb-editor-wrapper, #title1, .lzl_simple_wrapper, #editor {width: 100% !important;}\
#add_post_btn { color: black !important; }\
.ui_bubble_wrap .ui_bubble_content, .ui_bubble_wrap .ui_bubble_content a { color: black !important; }\
.ui_bubble_wrap .ui_bubble_content a { padding: 0 3px; }\
.summary, .refer_url { background: grey; color: white; }\
.summary { border-top-left-radius: 20px; border-top-right-radius: 20px; }\
.refer_url { border-top: lightgray 1px dashed;\
border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; }\
img[src*="//tb1.bdstatic.com/tb/static-frs/img/icon/"], .frs_nav_3 .icon_add_post,\
#goTop {\
border-radius: 4px;\
}\
/* 贴吧助手修正用 */\
#tbhp_opition_div { background: gray !important; }\
#tbhp_opition_div dt { background: rgb(132, 132, 255) !important; }\
#tbhp_magic_books_list { background: black; }\
#tbhp_magic_books_list .contet_wrap { border-style: none !important; }\
/* i贴吧样式支持 */\
.w750 { width: auto; margin-right: 130px; }\
.feat_right {float: none; margin-left: 100px; width: auto; }\
.feat_right p { width: auto; margin-right: 80px; }\
.content_aside { overflow: hidden; position: absolute; right: 31px; width: 130px; }\
.text_point:after { content: "..."; }\
.feat_time:before, .feat_replynum:before { content: "时"; margin-right: 10px; color: grey; } \
.feat_replynum:before { content: "回"; }\
.forum_sign { width: 50px; background: none; }\
.forum_sign:before, .feat_tieba, .tbIcon { background: #81A4DE; border: 1px solid white; \
border-radius: 3px; content: "已签"; padding: 0 5px; }\
.feat_tieba { padding: 0; color: black }\
#TipParentDiv { left: -300px !important; }\
.feed_hover { background-color: gray; }\
.tab_content .tab, .sub_tab_content { background: none; }\
.feed { border-top-style: none; width: 100%;  }\
.sub_tab_content { border-bottom-style: dashed;  }\
.w750.fleft, #featureList, #evaluate_list { width: 100%; }\
#featureList tbody .listBar, #featureList thead .listBar { float: left; }\
.feed_item1 { margin-right: 130px; }\
#content { margin: 0 20px 0 7px; }\
.common_source_main { background: black; border: white 1px dashed; }\
a.for_reply_context:before { content: "『" ; margin-right: 15px; }\
a.for_reply_context:after  { content: "』" ; margin-left:  15px; }\
img[src*="static-itieba3/img/yh_"] { display: none; }\
/* tiebaAllSign */\
#readyDiv, #massWindow2 { background: black !important; }\
';

var eStyle = document.createElement ('style');
eStyle.innerHTML = cssCode;
document.querySelector ('body').appendChild (eStyle);

try {
    // 贴吧页面发帖框防出框
    var $c = document.querySelector ('#container');
    $c.appendChild (document.querySelector('.th_footer_2'));
    $c.appendChild (document.querySelector('.frs_rich_editor'));
} catch (e) {}

try {
    /*
    // 贴吧页面按钮重绘，因为图片不是透明的..
    var key = {/*顶*-/'zding': ['\u9876', '#558BF6'], /*精*-/'jing': ['\u7CBE', '#F03131'], /*票*-/'tpiao': ['\u7968', '#77D00E']};
    for (var i in key) {
        unsafeWindow.$('img[src*="//tb1.bdstatic.com/tb/static-frs/img/icon/' + i + '.gif"]').hide()
        .before ( unsafeWindow.$ ('<span />').addClass('tbIcon').text(key[i][0]).css ({
            'background': key[i][1],
            'margin-left': '5px',
            'padding': '2px 3px'
        })[0]);
    }
    */
} catch (e) { }