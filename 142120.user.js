// ==UserScript==
// @name          ECF Blocker
// @namespace     http://www.fanhe.org/
// @description   EVE China Fans BLocker
// @require       http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js
// @match       http://bbs.eve-china.com/*
// ==/UserScript==

function block_this_page() {
    var block_list = GM_getValue("ecf_blocklist", new Array());
    $.each(block_list, function(i, user_id) {
        var verify_id = "#followmod_" + user_id;
        console.log($(verify_id));
        $(verify_id).parents("table").remove();
    });
}

jQuery(".xi2").parents("ul.xl2").append('<li class="blocker"><a href="javascript:;">屏蔽他</a></li>');
jQuery(".blocker").click(function(e) {
    var user_id = jQuery(this).siblings(".addflw").children("a").attr("id").split("_").pop();
    var block_list = GM_getValue("ecf_blocklist", new Array());
    console.log("Add User " + user_id + " into block list.");
    if(jQuery.inArray(user_id, block_list) == -1){
        block_list.push(user_id);
    }
    GM_setValue("ecf_blocklist", block_list);
    console.log(block_list);
    block_this_page();
});
jQuery("#um p").eq(1).append('<span class="pipe">|</span><a href="javascript:;" class="clean_ecf_blocker">清除黑名单</a>');
jQuery(".clean_ecf_blocker").click(function(e) {
    GM_setValue("ecf_blocklist", new Array());
    console.log("Cleaned ECF block list.");
    console.log(GM_getValue("ecf_blocklist", new Array()));
});
for(var i = 0; i < 15; i++) {
    block_this_page();
}