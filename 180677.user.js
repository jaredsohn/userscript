// ==UserScript==
// @id             tiebaRecentImages
// @name           Tieba Recent Images
// @version        1.0
// @namespace      simon
// @author         Simon Chan
// @description    Show recent used images when hover on Emoji button.
// @include        http://tieba.baidu.com/*
// @run-at         document-end
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// ==/UserScript==

var maxCount = 24;
var maxHeight = 500;
var maxWidth = 500;

var $ = unsafeWindow.$;
var config = GM_getValue("config") ?
    JSON.parse(GM_getValue("config")) :
    [
        'http://hiphotos.baidu.com/%B0%AE%C7%E9%B7%C6%C8%BBi/pic/item/8ad031d87cd98d108060fd91213fb80e7aec90f8.jpg',
        'http://imgsrc.baidu.com/forum/pic/item/38e8574e9258d1098df51e45d158ccbf6d814d6b.jpg',
        'http://imgsrc.baidu.com/forum/pic/item/8989a544ebf81a4c82fc0a3ad72a6059272da6b6.jpg',
        'http://imgsrc.baidu.com/forum/pic/item/5f0e68ed2e738bd42bb054c2a18b87d6257ff9ef.jpg',
        'http://imgsrc.baidu.com/forum/pic/item/16a9927eca806538e37b42e097dda144af3482ef.jpg',
        'http://imgsrc.baidu.com/forum/w%3D580/sign=aaa546e0533d26972ed3085565fbb24f/c7ed19385343fbf2b858dd09b27eca8064388fd0.jpg',
        'http://imgsrc.baidu.com/forum/pic/item/472309f790529822cc298c28d7ca7bcb0b46d4c7.jpg',
        'http://imgsrc.baidu.com/forum/pic/item/a637c0177f3e6709b35e4a103bc79f3df9dc5537.jpg',
        'http://imgsrc.baidu.com/forum/pic/item/dcc451da81cb39dbe027d6f6d0160924aa1830ae.jpg',
        'http://imgsrc.baidu.com/forum/pic/item/8ad4b31c8701a18b75bb05ce9e2f07082938fedb.jpg',
        'http://imgsrc.baidu.com/forum/pic/item/76447859252dd42af5a18948033b5bb5c8eab81c.jpg',
        'http://imgsrc.baidu.com/forum/pic/item/a5be42fbfbedab64aa7b3a14f736afc378311e0d.jpg',
        'http://imgsrc.baidu.com/forum/pic/item/13986a600c3387445ec8aaaf510fd9f9d62aa015.jpg',
        'http://hiphotos.baidu.com/%B0%D7%B7%A2%C9%D9%C4%EAxo/pic/item/8a6b7fc37f485594d0006003.jpg',
        'http://imgsrc.baidu.com/forum/pic/item/8c00c21349540923162f9ba29258d109b1de49dd.jpg',
        'http://imgsrc.baidu.com/forum/w%3D580/sign=503721aea1ec08fa260013af69ee3d4d/023b5bb5c9ea15ce91e76518b7003af33a87b292.jpg',
        'http://hiphotos.baidu.com/1543735090/pic/item/cee1ea0f4ae99b68eb248864.jpg',
        'http://imgsrc.baidu.com/forum/w%3D580/sign=c1baac0eadaf2eddd4f149e1bd110102/35a85edf8db1cb13fee7ee1bdc54564e92584b28.jpg',
        'http://imgsrc.baidu.com/forum/w%3D580/sign=3d5b5dd4aa64034f0fcdc20e9fc27980/1e30e924b899a9013aa8c83f1c950a7b0208f51e.jpg',
        'http://imgsrc.baidu.com/forum/w%3D580/sign=73df9b0643a7d933bfa8e47b9d4ad194/dbb44aed2e738bd4cf701323a08b87d6277ff94b.jpg',
        'http://imgsrc.baidu.com/forum/w%3D580/sign=74a8defe9e3df8dca63d8f99fd1072bf/0e2442a7d933c895d5244872d01373f082020064.jpg',
        'http://imgsrc.baidu.com/forum/w%3D580/sign=ffbb3439bba1cd1105b672288913c8b0/c995d143ad4bd1137497673b5bafa40f4bfb0564.jpg',
        'http://imgsrc.baidu.com/forum/w%3D580/sign=fe7a9a0e5882b2b7a79f39cc01adcb0a/95eef01f3a292df5bfc0ae1fbd315c6034a873bc.jpg',
        'http://imgsrc.baidu.com/forum/w%3D580/sign=bb9d4f98472309f7e76fad1a420f0c39/11385343fbf2b21167c4df42cb8065380dd78ed0.jpg'
    ];

function saveConfig() {
    GM_setValue("config", JSON.stringify(config));
}
saveConfig();

new NodeInsertListener('.edui-btn-emotion', function () {
    var panel = $.eduipopup().clone().appendTo(".edui-dialog-container")
        .attr("style", "z-index: 1; display: none; top: 44px; left: -3px; position: absolute;")
    panel.find(".edui-popup-caret").addClass("up").attr("style", "top: -8px; left: 247px; position: absolute;");

    unsafeWindow._.Module.use("common/component/UeditorEmotion", [{
        container: $('<div class="j_emotion_container emotion_container"></div>')
    }], function (h) {
        var content = h.$container.appendTo(panel.find(".edui-popup-body"));
        content.find(".s_layer_tab.j_tab.ueditor_emotion_tab").remove();

        NodeInsertListener("table", function () {
            var table = content.find("table tbody");
            var cell = table.find(".j_emotion").eq(0).clone().removeClass("face").empty().css("cursor", "pointer")
                .click(function () {
                    unsafeWindow.test_editor.execCommand("inserthtml",
                        '<img class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" src="' + $(this).data("surl") + '">');
                    panel.hide();
                }).append($("<img>").css("max-height", "54px").css("max-width", "54px"));
            GM_addStyle(".review { max-height: 60px; max-width: 60px; }")

            pushImages = function () {
                table.empty();
                for (var i = 0; i < config.length / 10; i++)
                    table.append($("<tr>").append($(config.slice(10 * i, 10 * (i + 1)).map(function (img) {
                        var newCell = cell.clone(true).data("surl", img);
                        newCell.find("img").attr("src", img);
                        return newCell.get(0);
                    }))));
            }
            pushImages();
        }, true);
    });
    var pushImages = function () { };

    var mousein = false;
    $('.edui-btn-emotion').click(function () { panel.hide(); mousein = false; }).add(panel).mouseenter(function () {
        panel.show(); mousein = true;
    }).mouseleave(function () { mousein = false; setTimeout(function () { if (!mousein) panel.hide(); }, 300); });

    NodeInsertListener("#ueditor_replace img", function (node) {
        if (node.width <= maxWidth && node.height <= maxHeight) {
            var img = node.src;
            var i = config.indexOf(img);
            if (i != -1)
                config.splice(i, 1);
            else if (config.length == maxCount)
                config.pop();
            config.unshift(img);
            saveConfig();
            pushImages();
        }
    });
}, true);

function NodeInsertListener(selector, callback, once) {
    var cssString = " {\
    animation-name: listener{id};\
    animation-duration: 0.001s;\
}\
@keyframes listener{id} {\
    from { opacity: 0.99; }\
    to {opacity: 1; }\
}";

    var id = new Date().getTime();
    GM_addStyle(selector + cssString.replace(/\{id\}/g, id));

    var handler = (function (e) {
        if (e.animationName == "listener" + id) {
            if (once)
                this.stop();
            callback(e.target);
        }
    }).bind(this);
    this.stop = function () { removeEventListener("animationend", handler); }
    addEventListener("animationend", handler);
}