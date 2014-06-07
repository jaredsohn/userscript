// ==UserScript==
// @name           anonnews.org show/hide comments
// @description    Allows you to show/hide comments on anonnews.org
// @namespace      http://anonnews.org_script_showhide_script
// @include        http://*anonnews.org/*
// @originalAuthor MiJyn
// @version        0.1.2
// @license        http://opensource.org/licenses/BSD-2-Clause
// ==/UserScript==

var $ = unsafeWindow.jQuery;

cus_comments={};

function cus_showhide(id) {
    var jq_a = $("[name='c-" + id + "']");
    var jq = jq_a.parent();
    if (cus_comments[id] && cus_comments[id][0]) {
        cus_comments[id][0] = false;
        jq.find(".c-small-inner").html(cus_comments[id][1]);
    } else {
        var commentcontents = jq.find(".c-small-inner").html();
        cus_comments[id]=[true, commentcontents];
        jq.find(".c-small-inner").html("Comment hidden");
    }
}

window.onload = function(){
    $('.body-main div:not([class])').each(function() {
        var jq=$(this);
        var actions = jq.find(".c-small .c-small-actions");
        var id = jq.find(".c-reply").html();
        id = $.trim(id);
        var ourelement = actions.append("<a id='cus-showhide-" + id + "' href='javascript:void(0)' class='c-actions-button'>Show/Hide</a>");
        ourelement.click(function(){cus_showhide(id);});
    });
};