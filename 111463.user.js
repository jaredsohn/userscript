// ==UserScript==
// @name           taobao_class_editor
// @namespace      taobao
// @author         leo
// @version        1.0.20110827
// @include        http://ishop.taobao.com/shop_category_product_list_new.htm*
// ==/UserScript==
// 重写GM函数
var trace = function(msg){
    var debug = 0
    if (debug == 1) {
        GM_log(msg)
    }
}

trace(window.location.href)

//添加到分类 标题处 <div class="dropmenu">
var dropmenuList = document.evaluate(".//div[@class=\"dropmenu\"]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)

for (var i = 0; i < dropmenuList.snapshotLength; i++) {
    var curStyle=dropmenuList.snapshotItem(i).getAttribute("style");
    //trace("curStyle:"+curStyle)
    dropmenuList.snapshotItem(i).setAttribute("style",curStyle+";width:190px;");  
     
}

//<th class="th-4">添加所属分类</th>
var Th4List = document.evaluate(".//th[@class=\"th-4\"]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)

for (var i = 0; i < Th4List.snapshotLength; i++) {
    var curStyle=Th4List.snapshotItem(i).getAttribute("style");
    Th4List.snapshotItem(i).setAttribute("style",curStyle+";width:190px;");  
     
}

//<a href="#" class="add-cat J_AddCat">添加所属分类</a>
var AList = document.evaluate(".//a[@class=\"add-cat J_AddCat\"]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)

for (var i = 0; i < AList.snapshotLength; i++) {
    var curStyle=AList.snapshotItem(i).getAttribute("style");
    AList.snapshotItem(i).setAttribute("style",curStyle+";width:190px;");  
     
}

//<div class="cat-select" id="J_CatPanel" style="display: block; position: absolute; top: 277px; left: 649px;">
var divList = document.evaluate(".//div[@class=\"cat-select\"]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)

for (var i = 0; i < divList.snapshotLength; i++) {
    var curStyle=divList.snapshotItem(i).getAttribute("style");
    divList.snapshotItem(i).setAttribute("style",curStyle+";width:203px;");

    //设置 ul 高度 
    var ulList = divList.snapshotItem(i).getElementsByTagName("ul")[0];
    var curStyle=ulList.getAttribute("style");
    ulList.setAttribute("style","height:400px;");
    
    //设置 li 宽度  
    var liList = document.evaluate(".//li",divList.snapshotItem(i),null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
    for (var i = 0; i < liList.snapshotLength; i++) {
        var curStyle=liList.snapshotItem(i).getAttribute("style");
        liList.snapshotItem(i).setAttribute("style",curStyle+";width:203px;");
    }
}

//<ul class="dmenu-content">
//<ul class="dmenu-content">
var ulList = document.evaluate(".//ul",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
//trace("ulList:"+ulList+ulList.snapshotLength)
for (var i = 0; i < ulList.snapshotLength; i++) {
    
    //trace(ulList.snapshotItem(i));
    var curStyle=ulList.snapshotItem(i).getAttribute("style");
    ulList.snapshotItem(i).setAttribute("style",curStyle+";max-height:450px;");  
     
}
