// --------------------------------------------------------------------
//
// ==UserScript==
// @name          jjwxc-point-per-word
// @namespace     http://abbypan.github.com/
// @description   将作者专栏、排行榜单、作品库中的文章积分除以字数，另加一列显示之
// @include       http://www.jjwxc.com/bookbase.php*
// @include       http://www.jjwxc.com/bookbase_slave.php*
// @include       http://www.jjwxc.com/oneauthor.php*
// @include       http://www.jjwxc.com/topten.php*
// @include       http://www.jjwxc.net/bookbase.php*
// @include       http://www.jjwxc.net/bookbase_slave.php*
// @include       http://www.jjwxc.net/oneauthor.php*
// @include       http://www.jjwxc.net/topten.php*
// @copyright     2009+, Abby Pan (http://abbypan.github.com/)
// @version       0.9
// @author        Abby Pan (abbypan@gmail.com)
// @homepage      http://abbypan.github.com/
//
// ==/UserScript==

var path = getTdXPath();
if (path) addPointColumn(path);

function getTdXPath() {
    var href = window.location + "";
    var urlPath = {
        //key : url匹配的关键字
        //value : 要进行计算的“字数”所在 td 的XPath
        
        //作者专栏
        "oneauthor.php": '//table/tbody/tr/td[5]',

        //排行榜
        "topten.php": '//table/tbody/tr/td[7]',

        //查询后的排行榜
        "bookbase.php": "//table/tbody/tr/td[6]",

        //作品库、vip作品库
        "bookbase_slave.php": "//table/tbody/tr/td[6]" 
    };

    for (var key in urlPath) {
        if (href.match(key)) return urlPath[key];
    }
    return Undefined;
}

function addPointColumn(path) { //处理表格，添加一列 积分/字
    //小说列表
    var wordNumTds = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (!wordNumTds) return;

    //表头
    var headTd = wordNumTds.snapshotItem(0);
    addTdNode(headTd, '积分/字');

    for (var i = 1; i < wordNumTds.snapshotLength; i++) {
        var wordNumTd = wordNumTds.snapshotItem(i);
        var avgPoint = calcAvgPoint(wordNumTd);
        addTdNode(wordNumTd, avgPoint);
    }
}

function calcAvgPoint(wordNumTd) {
    //字数
    var wordNum = getTdValue(wordNumTd);

    //积分
    var pointTd = wordNumTd.nextSibling.nextSibling;
    var point = getTdValue(pointTd);

    //计算平均积分
    newPoint = calcPoint(wordNum, point);
    return newPoint;
}

function getTdValue(td) {
    //将td单元中的数值取出来
    var s = td.textContent || td.innerText || "";
    return s.replace(/[^0-9]+/g, "");
}

function calcPoint(wordNum, point) {
    //计算平均积分
    if (wordNum == 0) return "0";
    var newPoint = (point / wordNum + 0.5) + "";
    return newPoint.replace(/\.[0-9]+/, "");
}

function addTdNode(node, str) {
    //添加一个td单元
    var td = document.createElement('td');
    td.setAttribute('style', 'text-align:center;width:50px;');

    var text = document.createTextNode(str);
    td.appendChild(text);

    var addNodeLocation = node.nextSibling.nextSibling.nextSibling;
    node.parentNode.insertBefore(td, addNodeLocation);
}
