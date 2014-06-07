// ==UserScript==
// @name TianyaFilter
// @namespace http://bbs.tianya.cn/post-stocks-216255-1.shtml
// @version    1.2.0
// @author     Master Rhino from TianYa BlackSmith's Shop
// @author     Citizen Luther from TianYa BlackSmith's Shop
// @description 天涯社区楼层计数、过滤指定用户的回贴。
// @include http://bbs.tianya.cn/*
// @exclude
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_getResourceText
// @grant GM_addStyle
// @updateURL   https://userscripts.org/scripts/source/169619.meta.js
// @downloadURL https://userscripts.org/scripts/source/169619.user.js
// @require http://code.jquery.com/jquery-1.9.1.js
// @require http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @resource    jqCSS http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @copyright   2013+, Citizen Luther
// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html
// Appreciate to
//  Tianya Helper (http://userscripts.org/scripts/show/127574)
// script link: http://userscripts.org/scripts/show/169619
// ver 0.1 @ 2013-6-4
//  Initialize release
// ver 0.2 @ 2013-6-4
//  + 增加选项，可设置过滤模式
//  * 做了一些优化
// ver 1.0 @ 2013-6-6
//  + 增加关注某人功能，关注ID的回贴，设置背景色为环保绿色
//  + 增加数楼层、黑名单屏蔽效果的设置项
//  * 修正因大小写不符导致屏蔽失败的问题
// ver 1.0.1 @ 2013-6-9
//  * 修正用户名中含有特殊字符或英文字符在前导致无法过滤的问题
// ver 1.1.0 @ 2013-6-16
//  + 增加鼠标跟随的快捷链接：拉黑、洗白、关注、取关，用于快捷维护黑白名单
// ver 1.1.1 @ 2013-6-19
//  + 增加“高亮提到我的”选项，默认关闭
// ver 1.2.0 @ 2013-8-14
//  * 修复因天涯升级导致的举报及回复功能失效问题
// ==/UserScript==

/*-----------------------------------------------------------------------------
 * Declaration
 *-------------------------------------------------------------------------- */
HIGHLIGHT_COLOR = "#CCE8CF"; //环保背景色 

var TianyaConfig = function () {
    this.blackList = ','; //黑名单
    this.whiteList = ','; //白名单
    this.filterMode = 1; //过滤模式：0-过滤回帖和用户信息；1-过滤回帖，不过滤用户信息
    this.floorNum = 1;  //数楼层开关：0-关，1-开
    this.focusReplyMe = 0; //是否高亮提到我的回帖：0-否，1-是
    this.init();
}

/* config format: key:writer0,writer1..:status ... */
TianyaConfig.prototype = {
    saveBlackIDs: function () {
        GM_setValue('TianYaBlackIDs', this.blackList);
    },
    __getBlackIDs: function () {
        var escBlackIds = GM_getValue('TianYaBlackIDs');
        if (typeof escBlackIds != "undefined" && escBlackIds != '') {
            this.blackList = escBlackIds;
        }
    },
    saveWhiteIDs: function () {
        GM_setValue('TianYaWhiteIDs', this.whiteList);
    },
    __getWhiteIDs: function () {
        var escWhiteIds = GM_getValue('TianYaWhiteIDs');
        if (typeof escWhiteIds != "undefined" && escWhiteIds != '') {
            this.whiteList = escWhiteIds;
        }
    },
    saveOptions: function () {
        GM_setValue('TianYaFilterMode', this.filterMode);
        GM_setValue('TianYaFloorNum', this.floorNum);
        GM_setValue('TianYaFocusReplyMe', this.focusReplyMe);
    },
    __getOptions: function () {
        var escFilterMode = GM_getValue('TianYaFilterMode');
        var escFloorNum = GM_getValue('TianYaFloorNum');
        var escFocusReplyMe = GM_getValue('TianYaFocusReplyMe');
        
        if (typeof escFilterMode != "undefined")   this.filterMode = escFilterMode;
        if (typeof escFloorNum != "undefined")     this.floorNum = escFloorNum;
        if (typeof escFocusReplyMe != "undefined") this.focusReplyMe = escFocusReplyMe;
    },
    init: function () {
        this.__getBlackIDs();
        this.__getWhiteIDs();
        this.__getOptions();
        
    }
}

/*-----------------------------------------------------------------------------
 * Initialization
 *-------------------------------------------------------------------------- */
if (typeof Tyconfig == 'undefined') {
    Tyconfig = new TianyaConfig();
}

var eleHeader = document.getElementsByClassName("read-menu")[0];
if (typeof eleHeader != 'undefined') {
    var btnBlack = document.createElement("a");
    btnBlack.id = "btn_filter";
    btnBlack.className = "ty_filter";
    btnBlack.href = 'javascript:void(0)';
    btnBlack.textContent = "设置天涯过滤器";
    eleHeader.appendChild(btnBlack);

    var jqCSS = GM_getResourceText("jqCSS");
    GM_addStyle(jqCSS);
    
    var helpbar = document.createElement('div');
    helpbar.id = "tianya_helpbar";
    helpbar.align = "center";
    helpbar.style.display = "none";
    helpbar.innerHTML = 
     '<div id="tabs" style="width:40%" align="left">\
        <ul>\
            <li><a href="#tabs-1">黑名单</a></li>\
            <li><a href="#tabs-2">白名单</a></li>\
            <li><a href="#tabs-3">设置</a></li>\
        </ul>\
        <div id="tabs-1">\
            <span>输入需要屏蔽的天涯ID，用逗号分隔，不要有空格：</span><br/>\
            <textarea title="提交后，新增ID会被屏蔽，但从黑名单删除的ID的回贴不会出现，需要F5。" id="txt_black_list" \
            class="tyblackid" rows="5" cols="40" wrap="virtual">\
            </textarea><br/>\
            <button id="btn_submit_black" class="btn_submit">提交</button>\
            <button class="btn_cancel">关闭</button>\
        </div>\
        <div id="tabs-2">\
            <span>输入需要关注的天涯ID，用逗号分隔：</span><br/>\
            <textarea title="白名单ID的回贴，将以环保绿色背景标记。" id="txt_white_list" \
            class="tywhiteid" rows="5" cols="40" wrap="virtual">\
            </textarea><br/>\
            <button id="btn_submit_white" class="btn_submit">提交</button>\
            <button class="btn_cancel">关闭</button>\
        </div>\
        <div id="tabs-3">\
            <span>修改选项保存后，需要刷新页面才在当前页生效。</span><br/><br/>\
            <input id="chk_floor" type="checkbox" title="打勾后将显示天涯楼层"> 页内数楼层</input><br/> \
            <input id="chk_filter_mode" type="checkbox" title="黑名单过滤模式，未选则连ID信息一起过滤"> 只过滤回贴内容，保留用户信息</input><br/>\
            <input id="chk_focus_me" type="checkbox" title="以粗体标记提到我的回帖"> 高亮提到我的回复（登录后生效）</input><br/>\
            <br/><br/>\
            <button id="btn_submit_option" class="btn_submit">保存</button>\
            <button class="btn_cancel">关闭</button>\
        </div>\
      </div>';
    eleHeader.appendChild(helpbar);
    
    GM_addStyle(".btn_submit { padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:10px; }");
    GM_addStyle(".btn_cancel { padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:10px; }");
    
    // Tab switch
    $(function() {
        $("#tabs").tabs();
    });
    
    // Show and initialize Tianya Filter configuration view
    $("#btn_filter").click(function(){
        document.getElementById("tianya_helpbar").style.display = "block";
        $("#tabs").tabs("option", "active", 0);
        
        document.getElementById("txt_black_list").value = Tyconfig.blackList.substring(1,Tyconfig.blackList.length-1);
        document.getElementById("txt_white_list").value = Tyconfig.whiteList.substring(1,Tyconfig.whiteList.length-1);
        document.getElementById("chk_filter_mode").checked = Tyconfig.filterMode==1?true:false;
        document.getElementById("chk_floor").checked = Tyconfig.floorNum==1?true:false;
        document.getElementById("chk_focus_me").checked = Tyconfig.focusReplyMe==1?true:false;
    });
    
    $("#btn_submit_option").click(function(){
        var opt_mode = document.getElementById("chk_filter_mode").checked?1:0;
        var opt_floor = document.getElementById("chk_floor").checked?1:0;
        var opt_focus = document.getElementById("chk_focus_me").checked?1:0;
        
        if (Tyconfig.filterMode != opt_mode || Tyconfig.floorNum != opt_floor || Tyconfig.focusReplyMe != opt_focus) {
            Tyconfig.filterMode = opt_mode;
            Tyconfig.floorNum = opt_floor;
            Tyconfig.focusReplyMe = opt_focus;
            Tyconfig.saveOptions();
        }
        document.getElementById("tianya_helpbar").style.display = "none";
    });
    
    document.getElementById("btn_submit_black").onclick=function(event){
        submitList(event);
    }

    document.getElementById("btn_submit_white").onclick=function(event){
        submitList(event);
    }
    
    // Submit the change of black list or white list.
    function submitList(event) {
        var target = event.currentTarget;
        var idList = "";
        
        if (target.id == "btn_submit_black")
            idList = document.getElementById("txt_black_list").value;
        else if (target.id == "btn_submit_white")
            idList = document.getElementById("txt_white_list").value;
        
        while (idList.length > 0 && idList.indexOf("，") > -1) {
            idList = idList.replace("，",",");
        }
        if (idList.indexOf(",") > 0 || idList.indexOf(",") == -1) idList = "," + idList;
        if (idList.substring(idList.length - 1, idList.length) != ",") idList = idList + ",";
        idList = idList.toLowerCase();
        
        if (target.id == "btn_submit_black") {
            Tyconfig.blackList = idList;
            Tyconfig.saveBlackIDs();
        } else if (target.id == "btn_submit_white") {
            Tyconfig.whiteList = idList;
            Tyconfig.saveWhiteIDs();
        }

        document.getElementById("tianya_helpbar").style.display = "none";
        // Filter again after list updated.
        filterPosts();
    }
    
    $(".btn_cancel").click(function(){
        document.getElementById("tianya_helpbar").style.display = "none";
    });
}


/*-----------------------------------------------------------------------------
 * Main Program
 *-------------------------------------------------------------------------- */
// 此结构中的function，在页面加载完毕才会执行，确保不出错。
$(document).ready(function(){
    
    addMenuAndCountFloor();
    
    filterPosts();
    
    // 高亮提到自己的回复，需要登录后才能使用
    if (Tyconfig.focusReplyMe == 1) {
        var myid = $("a[appstr='mypage']").text();
        if (typeof myid != "undefined" && myid != "")
            $(".bbs-content:contains('" + myid + "')").css("font-weight", "bold");
    };    

    $(".tyf_link").click(function() {
        var ftype = $(this).attr("tyf_type");
        //var author = $(this).parent().find(".reportme").attr("author").toLowerCase();
        var author = $(this).parent().parent().find(".atl-head-reply").find(".reportme").attr("author").toLowerCase();
        
        switch (ftype) {
            case "1": //拉黑，加入黑名单
                if (Tyconfig.blackList.indexOf(","+author+",") < 0) {
                    Tyconfig.blackList += author + ","
                    Tyconfig.saveBlackIDs();
                    
                    $(this).hide();
                    $(this).parent().find(".tyf_link[tyf_type=2]").show();
                    $(this).parent().find(".tyf_link[tyf_type=3]").hide();
                }
                break;
            case "2": //洗白，从黑名单中删除
                var pos = Tyconfig.blackList.indexOf(","+author+",");
                if ( pos >= 0) {
                    Tyconfig.blackList = Tyconfig.blackList.substr(0,pos) + Tyconfig.blackList.substr(pos + author.length + 1);
                    Tyconfig.saveBlackIDs();
                    
                    $(this).hide();
                    $(this).parent().find(".tyf_link[tyf_type=1]").show();
                    $(this).parent().find(".tyf_link[tyf_type=3]").show();
                }
                break;
            case "3": //关注，加入白名单
                if (Tyconfig.whiteList.indexOf(","+author+",") < 0) {
                    Tyconfig.whiteList += author + ","
                    Tyconfig.saveWhiteIDs();
                    
                    $(this).hide();
                    $(this).parent().find(".tyf_link[tyf_type=1]").hide();
                    $(this).parent().find(".tyf_link[tyf_type=4]").show();
                }
                break;
            case "4": //取关，从白名单中删除
                var pos = Tyconfig.whiteList.indexOf(","+author+",");
                if ( pos >= 0) {
                    Tyconfig.whiteList = Tyconfig.whiteList.substr(0,pos) + Tyconfig.whiteList.substr(pos + author.length + 1);
                    Tyconfig.saveWhiteIDs();
                    
                    $(this).hide();
                    $(this).parent().find(".tyf_link[tyf_type=1]").show();
                    $(this).parent().find(".tyf_link[tyf_type=3]").show();
                }
                break;
        }
        filterPosts(ftype, $(this).parent().parent().parent().attr("js_username"));
    });
});

/*-----------------------------------------------------------------------------
 * Functions
 *-------------------------------------------------------------------------- */

// For every user header, add menu for TianyaFilter, and count the floor number
function addMenuAndCountFloor() {
    //var eHeads = document.getElementsByClassName("atl-head-reply");
    var eHeads = document.getElementsByClassName("atl-info");
    if ($("a.bbs-layer").size() > 0) Tyconfig.floorNum = 0;
    
    for (i=0; i<eHeads.length; i++){
        var ele = eHeads[i];

        ele.innerHTML = ele.innerHTML + 
            "<a class='tyf_link' tyf_type='1' href='javascript:void(0)'>拉黑</a> " +
            "<a class='tyf_link' tyf_type='2' href='javascript:void(0)'>洗白</a> " +
            "<a class='tyf_link' tyf_type='3' href='javascript:void(0)'>关注</a> " +
            "<a class='tyf_link' tyf_type='4' href='javascript:void(0)'>取关</a>"
            ;
        if (Tyconfig.floorNum == 1 && i>0)
            ele.innerHTML = "<span class='floornum'>" + i + "楼</span>" + ele.innerHTML;
    }

    GM_addStyle(".tyf_link { color:blue } ");
    $(".tyf_link").hide();
};

// 鼠标跟随效果，黑名单ID显示“洗白”，白名单ID显示“取关”，其他ID显示“拉黑、关注”
$(".atl-item").hover(
    function () {
        var author = Utf8ToGb2312($(this).attr("js_username")).toLowerCase();
        if (Tyconfig.blackList.indexOf(","+author+",") >= 0)
            $(this).find(".tyf_link[tyf_type=2]").show();
        else if (Tyconfig.whiteList.indexOf(","+author+",") >= 0)
            $(this).find(".tyf_link[tyf_type=4]").show();
        else {
            $(this).find(".tyf_link[tyf_type=1]").show();
            $(this).find(".tyf_link[tyf_type=3]").show();
        }
    },
    function () {
        $(this).find(".tyf_link").hide();
    }
);


// Filter posts of black IDs, and highlight posts of focused IDs.
function filterPosts(ftype, fauthor) {
    if (typeof ftype != "undefined" && typeof fauthor != "undefined") {
        switch (ftype) {
            case "1":
                if (Tyconfig.filterMode == 1)
                    $(".atl-item[js_username='" + fauthor + "']").find(".atl-content").hide();
                else
                    $(".atl-item[js_username='" + fauthor + "']").hide();
                break;
            case "2":
                if (Tyconfig.filterMode == 1)
                    $(".atl-item[js_username='" + fauthor + "']").find(".atl-content").show();
                else
                    $(".atl-item[js_username='" + fauthor + "']").show();
                break;
            case "3":
                $(".atl-item[js_username='" + fauthor + "']").find(".atl-con-bd").css("background", HIGHLIGHT_COLOR);
                break;
            case "4":
                $(".atl-item[js_username='" + fauthor + "']").find(".atl-con-bd").css("background", "#EEE");
                break;
        }
    } else {
        var eItems = document.getElementsByClassName("atl-item");
        for (i=0; i<eItems.length; i++){
            var ele = eItems[i];
            var username = ele.getAttribute("js_username");
            if (username == null) continue;
    
            var authorId = Utf8ToGb2312(username);
            authorId = authorId.toLowerCase();

            if (Tyconfig.blackList.indexOf(","+authorId+",")>=0){
                //屏蔽回贴模式，只隐藏回贴，否则将包含用户信息的整个div隐藏
                if (Tyconfig.filterMode == 1) {
                	var post = ele.getElementsByClassName("atl-content")[0];
                	post.style.display = "none";
                } else {
                    ele.style.display = "none";
                }
            } else if (Tyconfig.whiteList.indexOf(","+authorId+",") >= 0){ //关注ID的回贴，设置背景色为环保绿色
                var cell = ele.getElementsByClassName("atl-con-bd clearfix")[0];
                cell.style.backgroundColor = HIGHLIGHT_COLOR;
            }
    	}
    }
}

// Decode chinese charactor from UTF8 to GB2312
function Utf8ToGb2312(str1){
    var substr = "";
    var a = "";
    var b = "";
    var c = "";
    var i = -1;
    i = str1.indexOf("%");
    if(i==-1){
        return str1;
    }
    while(i!= -1){
        if(i<3){
            substr = substr + str1.substr(0,i);
            str1 = str1.substr(i+1,str1.length-i);
            a = str1.substr(0,2);
            str1 = str1.substr(2,str1.length - 2);
            if(parseInt("0x" + a) & 0x80 == 0){
                substr = substr + String.fromCharCode(parseInt("0x" + a));
            }
            else if(parseInt("0x" + a) & 0xE0 == 0xC0){ //two byte
                b = str1.substr(1,2);
                str1 = str1.substr(3,str1.length - 3);
                var widechar = (parseInt("0x" + a) & 0x1F) << 6;
                widechar = widechar | (parseInt("0x" + b) & 0x3F);
                substr = substr + String.fromCharCode(widechar);
            }
                else{
                    b = str1.substr(1,2);
                    str1 = str1.substr(3,str1.length - 3);
                    c = str1.substr(1,2);
                    str1 = str1.substr(3,str1.length - 3);
                    var widechar = (parseInt("0x" + a) & 0x0F) << 12;
                    widechar = widechar | ((parseInt("0x" + b) & 0x3F) << 6);
                    widechar = widechar | (parseInt("0x" + c) & 0x3F);
                    substr = substr + String.fromCharCode(widechar);
                }
        }
        else {
            substr = substr + str1.substring(0,i);
            str1= str1.substring(i);
        }
        i = str1.indexOf("%");
    }
    
    return substr+str1;
}
