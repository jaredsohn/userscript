// ==UserScript==
// @name        9Lives.be Dark
// @namespace   kra
// @include     *9lives.be/forum/*
// @version     2
// ==/UserScript==

//========================[ Settings ]========================\\


    var hideRatings = 'yes';    //==['yes' or 'no']
    var customIcons = 'yes';    //==['yes' or 'no']
    var hideRssSub = 'yes';    //==['yes' or 'no']
    var hideTagIcon = 'yes';    //==['yes' or 'no']
    
    
//========================[ Settings ]========================\\


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head').item(0);
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.body_wrapper { margin-top: -15px !important; background: #2d2d2d !important; }');
addGlobalStyle('#sidebar_container { background-image: none !important; background: #2d2d2d !important; border: 1px solid #444 !important; border-radius: 0px !important; }');
addGlobalStyle('.moduleinactive_bg { background-image: none !important; background: #2d2d2d !important; border: none !important; }');
addGlobalStyle('#member_content, #sidebar_container, #sidebar_container .textcontrol { font-family: Tahoma !important; font-size: 11px !important; }');
addGlobalStyle('.userprof_module { background: #b94a48 !important; border: 1px solid #b94a48 !important; }');
addGlobalStyle('.userprof_content.userprof_content_border { background: #2b2b2b !important; border: 1px solid #444 !important; }');
addGlobalStyle('.userprof_content.userprof_content_border p { color: #444 !important; }');
addGlobalStyle('#activity_tab_container div, .as-tabs dd, .memberprofiletabunder, #profile_swap_button, #moreactivity_container, .userprof_headers_border { background: #b94a48 !important; border: none !important; font-family: Tahoma !important; font-size: 11px !important; }');
addGlobalStyle('.userprof_moduleinactive { background: #222 !important; border: 1px solid #2b2b2b !important; }');
addGlobalStyle('.userprof_module a, .userprof_moduleinactive a { color: #fff !important; font-family: Tahoma !important; font-size: 11px !important; }');
addGlobalStyle('.activitybit.forum_post.userprof_content.userprof_content_border { background: #2b2b2b !important; border: 1px solid #444 !important; font-family: Tahoma !important; font-size: 11px !important; }');
addGlobalStyle('#view-aboutme dt, #view-aboutme dl, #view-aboutme dd, #view-aboutme h5, #view-aboutme p, #view-aboutme span { color: #fff !important; font-color: #fff !important; }');
addGlobalStyle('.forumlastpost img { position: absolute !important; margin-left: 3px; }');
addGlobalStyle('.activitybit .content { background: #2d2d2d !important; }');
addGlobalStyle('#activitylist a { color: #b94a48 !important; }');
addGlobalStyle('.header, .above_body, #navtabs .floatcontainer { background: #b94a48 !important; }');
addGlobalStyle('#navtabs, .menu { background: #2d2d2d !important; }');
addGlobalStyle('#navtabs li, #navbar_search span { border: none !important; }');
addGlobalStyle('.textbox { border: 1px solid #b94a48 !important; }');
addGlobalStyle('#navtabs .selected a { color: #fff !important; background: none !important; }');
addGlobalStyle('#navtabs a:hover { color: #fff !important; text-decoration: underline; }');
addGlobalStyle('.navtab { background: #2d2d2d !important; border: none !important; margin-left: 10px !important; }');
addGlobalStyle('#toplinks { padding-top: 3px !important; }');
addGlobalStyle('select option { background-color: #2d2d2d !important; }');
addGlobalStyle('#searchtypeswitcher { border-bottom: 5px solid #b94a48 !important; }');
addGlobalStyle('.blockbody.formcontrols h3 { background: #b94a48 !important; color: #fff !important; }');
addGlobalStyle('#searchtypeswitcher a { background: #222 !important; }');
addGlobalStyle('#searchtypeswitcher .selected a { background: #b94a48 !important; }');
addGlobalStyle('.pagination.popupmenu.nohovermenu img, .navbithome img { filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale"); filter: gray; -webkit-filter: grayscale(100%); }');
addGlobalStyle('.postbit.blockrow .header { background: #b94a48 !important; height: 15px !important; padding: 10px !important; color: #fff !important; }');
addGlobalStyle('.postbit.blockrow .content { background: #2d2d2d !important; padding: 10px !important; }');
addGlobalStyle('.postbit.blockrow .content .quote_container { background: #222 !important; }');
addGlobalStyle('#thread_controls, .textcontrols, #footer, #above_threadlist_controls, .subforumdescription { background: #222 !important; border: none !important; }');
addGlobalStyle('#thread_controls a, .content, .userinfo { color: #ccc !important; }');
addGlobalStyle('.lastposttitle .prefix, .threadtitle .prefix, .threadtitle img { color: #666 !important; }');
addGlobalStyle('.lastposttitle .postimg, #wgo_legend, .view_button.light.active { display: none !important; }');
addGlobalStyle('#breadcrumb a, .threadtitle a, .userinfo_extra a, .forumtitle a { color: #b94a48 !important; }');
addGlobalStyle('span.forumtitle a { color: #fff !important; }');
addGlobalStyle('#breadcrumb a:hover { text-decoration: underline !important; }');
addGlobalStyle('.newcontent_textcontrol, #quickreply_title, .forumoptiontitle, .blockhead, .forumhead { background: #b94a48 !important; border-radius: 0px !important; border: none !important; }');
addGlobalStyle('.threadlisthead { background: #b94a48 !important; border-radius: 0px !important; }');
addGlobalStyle('.searchlisthead { background: #b94a48 !important; border: none !important; }');
addGlobalStyle('span.threadinfo a { color: #fff !important; }');
addGlobalStyle('.newcontent_textcontrol:hover { text-decoration: underline !important; }');
addGlobalStyle('.threadbit { box-shadow: none !important; }');
addGlobalStyle('.forumdescription a { color: #b94a48 !important; }');
addGlobalStyle('.blockbody, .blockrow, .blockfoot { background: #222 !important; border: none !important; }');
addGlobalStyle('.button { background: #b94a48 !important; border: none !important; color: #eee !important; }');
addGlobalStyle('.button:hover { text-decoration: underline !important; }');
addGlobalStyle('#cke_vB_Editor_QR_editor { background: #222 !important; border: none !important; }');
addGlobalStyle('.posthead, .threadinfohead { background: #b94a48 !important; border: none !important; }');
addGlobalStyle('.postbitlegacy { border: 1px solid #222 !important; }');
addGlobalStyle('.postbody { border-left: 1px solid #222 !important; padding-top:10px !important; }');
addGlobalStyle('.signature { border-top: 1px solid #222 !important; }');
addGlobalStyle('h2.title { border-bottom: 1px solid #222 !important; color: #999 !important; margin-top:-10px; }');
addGlobalStyle('.bbcode_quote, .bbcode_quote_container { background: #222 !important; border: none !important; }');
addGlobalStyle('.bbcode_postedby, .message, .quote_container { color: #ccc !important; }');
addGlobalStyle('.newreply { background-color: #222 !important; border: none !important; }');
addGlobalStyle('.seperator { border-right: 1px solid #333 !important; }');
addGlobalStyle('.pagination span a { color: #ccc !important; background: #222 !important; border: 1px solid #333 !important; }');
addGlobalStyle('.pagination span a:hover { color: #b94a48 !important; }');
addGlobalStyle('.pagination span.selected a { color: #b94a48 !important; }');
addGlobalStyle('#showthread_navpopup .popupctrl, #showthread_navpopup .textcontrol, #forumdisplay_navpopup .popupctrl { background: #b94a48 !important; }');
addGlobalStyle('#forumdisplay_navpopup .textcontrol { background: #b94a48 !important; border: none !important; color: #ccc !important; }');
addGlobalStyle('.popupbody { background-color: #2d2d2d !important; border: 2px solid #b94a48 !important; }');
addGlobalStyle('.popupbody .formsubmit { background-color: #2d2d2d !important; }');
addGlobalStyle('.popupbody li { border: none !important; }');
addGlobalStyle('.popupbody li label { background: #2d2d2d !important; color: #fff !important; border-bottom: 1px solid #222 !important; }');
addGlobalStyle('.navpopupbody.popupbody li { background-color: #b94a48 !important; color: #fff !important; border: none !important; }');
addGlobalStyle('.popupbody li a { background: #2d2d2d !important; color: #fff !important; border-bottom: 1px solid #222 !important; }');
addGlobalStyle('.threadinfohead, .collapse.blockhead { background: #b94a48 !important; border: none !important; box-shadow: none !important; border-radius: 0px !important; }');
addGlobalStyle('.threadstats.td { width: 120px !important; font-size: 11px !important; }');
addGlobalStyle('.threadlastpost { font-size: 12px !important; }');
addGlobalStyle('.threadlastpost strong { color: #b94a48 !important; }');
addGlobalStyle('.forumlastpost strong { color: #b94a48 !important; }');
addGlobalStyle('.forumhead h2 { width: 87% !important; }');
addGlobalStyle('.forumhead .forumthreadpost { width: 170px !important; }');
addGlobalStyle('.forumhead .forumlastpost { width: 100px !important; }');
addGlobalStyle('.thread_info_block { color: #ccc !important; background: #222 !important; border: 1px solid #222 !important; box-shadow: none !important; }');
addGlobalStyle('.thread_info_block a:link, .thread_info_block a:visited { color: #b94a48 !important; }');
addGlobalStyle('#tag_edit_link { color: #eee !important; background: #b94a48 !important; border: none !important; }');
addGlobalStyle('#tag_edit_link:hover { text-decoration: underline !important; }');
addGlobalStyle('.popupctrl, #showthread_navpopup .textcontrol { color: #ccc !important; border: none !important; }');
addGlobalStyle('.forumrow, .nonsticky, .sticky { background-image: none !important; border-bottom: 1px solid #222 !important; border-top: 1px solid #444 !important; padding-top: 5px; padding-bottom: 5px; color: #ccc !important; }');
addGlobalStyle('.threadstats { background-image: none !important; }');
addGlobalStyle('.activitystream .popupmenu a.popupctrl { background: none !important; }');
addGlobalStyle('.popupbody.filter td, .popupbody.filter .unselected { background: #2b2b2b !important; border: none !important; }');
addGlobalStyle('.popupbody.filter .unselected { color: #ccc !important; }');
addGlobalStyle('.popupbody.filter .selected { color: #b94a48 !important; }');

if (hideRatings == 'yes'){
var tdu = document.getElementsByTagName("div");
var j = 0;
for(var i=0;i<tdu.length;i++) {
if(tdu[i].className == "rating1 nonsticky" || tdu[i].className == "rating2 nonsticky" || tdu[i].className == "rating3 nonsticky" || tdu[i].className == "rating4 nonsticky" || tdu[i].className == "rating5 nonsticky") {
tdu[i].className = "rating0 nonsticky";
}
}
}

if (hideRssSub == 'yes'){
addGlobalStyle('.forumactionlinks.td { display: none !important; }');
addGlobalStyle('.forumstats.td { width: 140px !important; margin-top: 10px !important; }');
addGlobalStyle('.forumstats li { font-size: 11px !important; }');
}

if (hideTagIcon == 'yes'){
addGlobalStyle('.threaddetails.td { display: none !important; }');
}

if (customIcons == 'yes'){
addGlobalStyle('.threadbit .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_old-30.png) !important; }');
addGlobalStyle('.threadbit.hot .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_old-30.png) !important; }');
addGlobalStyle('.threadbit.hot.new .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_new-30.png) !important; }');
addGlobalStyle('.new .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_new-30.png) !important; }');
addGlobalStyle('.threadbit.dot .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_dot_old-30.png) !important; }');
addGlobalStyle('.threadbit.dot.hot .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_dot_old-30.png) !important; }');
addGlobalStyle('.threadbit.dot.new .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_dot_new-30.png) !important; }');
addGlobalStyle('.threadbit.dot.hot.new .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_dot_new-30.png) !important; }');
addGlobalStyle('.threadbit.dot.hot.lock .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_dot_lock_old-30.png) !important; }');
addGlobalStyle('.threadbit.dot.hot.lock.new .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_dot_lock_new-30.png) !important; }');
addGlobalStyle('.threadbit.dot.lock .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_dot_lock_old-30.png) !important; }');
addGlobalStyle('.threadbit.dot.lock.new .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_dot_lock_new-30.png) !important; }');
addGlobalStyle('.threadbit.hot.lock .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_lock_old-30.png) !important; }');
addGlobalStyle('.threadbit.hot.lock.new .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_lock_new-30.png) !important; }');
addGlobalStyle('.threadbit.lock .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_lock_old-30.png) !important; }');
addGlobalStyle('.threadbit.lock.new .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_lock_new-30.png) !important; }');
addGlobalStyle('.threadbit.moved .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_moved-30.png) !important; }');
addGlobalStyle('.threadbit.moved.new .threadstatus{background-image:url(https://dl.dropbox.com/u/4224739/9l/thread_moved_new-30.png) !important; }');
addGlobalStyle('.threadbit .deleted .threadstatus{background:url(https://dl.dropbox.com/u/4224739/9l/thread_deleted_30.png) !important; }');
    
	        var imgs = document.getElementsByTagName("img");
            var imgSrcs = [];
            
            for (var i = 0; i < imgs.length; i++) {
            imgSrcs.push(imgs[i].src);
		    if (imgs[i].src.indexOf("/forum_new-48") != -1) { imgs[i].src = "https://dl.dropbox.com/u/4224739/9l/new48.png"; }
		    if (imgs[i].src.indexOf("/forum_old-48") != -1) { imgs[i].src = "https://dl.dropbox.com/u/4224739/9l/old48.png"; }
		    if (imgs[i].src.indexOf("/forum_old_lock-48") != -1) { imgs[i].src = "https://dl.dropbox.com/u/4224739/9l/oldlock.png"; }
		    if (imgs[i].src.indexOf("/forum_new_lock-48") != -1) { imgs[i].src = "https://dl.dropbox.com/u/4224739/9l/newlock.png"; }            
            if (imgs[i].src.indexOf("/subforum_new-48") != -1) { imgs[i].src = "https://dl.dropbox.com/u/4224739/9l/subforum_new-48.png"; }
            if (imgs[i].src.indexOf("/lastpost-right") != -1) { imgs[i].src = "https://dl.dropbox.com/u/4224739/9l/lastpost-right.png"; }
            }
}