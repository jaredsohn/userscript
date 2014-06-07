// ==UserScript==
// @name        HKGolden icons in MC-HK
// @namespace   Saren
// @description Add HKGolden icons to Minecraft-HK
// @include     http://forum.minecraft-hk.com/thread* 
// @include     http://forum.minecraft-hk.com/forum.php?mod=viewthread&tid=*
// @include     http://forum.minecraft-hk.com/forum.php?mod=post*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version     0.0.2c
// ==/UserScript==

//避免與MCHK頁面衝突
this.$ = this.jQuery = jQuery.noConflict(true);

//表情符號列表
gIcons = ["angel","dead","smile","clown","frown","cry","wink","angry","devil","biggrin","oh","tongue","kiss","wonder","agree","donno","hehe","love","surprise","chicken","ass","sosad","sosadlm","good","hoho","kill","bye","z","@","adore","wonder2","banghead","bouncer","bouncy","offtopic","censored","flowerface","shocking","photo","fire","yipes","369","bomb","slick","fuck","no","kill2"];
var x = 0;

//插入表情符號容器
function addDiv() {
    $("#nv_forum").append("<div id='icons' style='position: fixed; width: 250px; height: 250px; bottom: 0px; right: 0px; background-image: url(\"http://i.na.cx/cBBun.png\");'><a onClick='iconsClose()' style='color: #fff; cursor:pointer;'>關閉</a><br></div>");
}

//插入表情符號到容器中
function addIcons(icon) {
    $("#icons").append("<img src='https://forum.wtako.net/styles/default/xenforo/"+icon+".gif' style='cursor: pointer;' onClick='insertIcon(\""+icon+"\");seditor_insertunit(\"post\", \"[img]http://forum.wtako.net/styles/default/xenforo/"+icon+".gif[/img]\");'></img> ");
}

function gIconsInit() {
    gIcons.forEach(function(value, index, array) {
        addIcons(value);
    });
}

//如果點擊了「回覆」
function showIconDiv() {
    //顯示表情符號容器
    $("#icons").slideDown("slow");
    if (x === 0) {
        //載入表情符號一次
        gIconsInit();
        x = 1;
    }
}

//插入表情符號圖片到回覆中
unsafeWindow.insertIcon = function (gIcon) {
    var box = $("#e_textarea");
    box.val(box.val() + "[img]https://forum.wtako.net/styles/default/xenforo/"+gIcon+".gif[/img]");
}

//關閉（隱藏）表情符號容器
unsafeWindow.iconsClose = function () {
    $("#icons").slideUp("slow");
}

//指定「回覆」鍵功能
$(".fastre, .area, #post_replytmp, #post_reply").click(function() {
    showIconDiv();
    setTimeout(function() {
        $(".flbc").attr("onClick", "hideWindow('reply');iconsClose()");
        $("#postsubmit").attr("onClick", "iconsClose()");
    }, 800);
});

//頁面加載完畢後
$(document).ready(function() {
    //插入表情符號容器
    addDiv();
    //隱藏表情符號容器
    $("#icons").slideUp(0);
});