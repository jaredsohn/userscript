// ==UserScript==
// @name       allstatus
// @namespace  allstatus 
// @version    v1.0
/* @reason
 * 在不是好友的人的页面加个全部状态的链接
 * @end
 */
// @match     http://www.renren.com/profile.do*
// @author    wonderfuly@gmail.com
//
// ==/UserScript==

function getParameter(key){
    var tmp = location.search.substring(1),
        pairs = tmp.split("&");
    for(var i = pairs.length; i--;){
        var pair = pairs[i].split("=");
        if(pair[0] === key){
            return pair[1] || "";
        }
    }
    return "";
}

if(document.getElementsByClassName("pipe").length === 0){
    // 没有所有状态链接，那就给他加个
    var uid = getParameter("id");

    var html = [];

    html.push('<span class="pipe">|</span>');
    html.push('<span class="more">');
    html.push('<a stats="pf_tab_status" href="http://status.renren.com/status/' + uid + '" class="edit">所有状态</a>');
    html.push('</span>');

    document.getElementById("status-show").innerHTML += html.join("");
}
