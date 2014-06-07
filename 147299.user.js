// ==UserScript==
// @name 12306RemainTicketQueryEnhance
// @namespace www.douban.com/people/ufologist/12306
// @description 增强12306余票查询的便捷性
// @include *://dynamic.12306.cn/otsquery/query/queryRemanentTicketAction.do?method=init
// @match *://dynamic.12306.cn/otsquery/query/queryRemanentTicketAction.do?method=init
// @author www.douban.com/people/ufologist/
// @version 2.0
// ==/UserScript==
/**
 * v2.0 2013-1-15
 * 12306<a href="http://dynamic.12306.cn/otsquery/query/queryRemanentTicketAction.do?method=init">余票查询</a>更新了
 * 查询时不再需要输入验证码, 但会限制查询"出发日期"不能大于20天, 提示"您选择的日期不在预售期范围内！".
 * 因此更新脚本, 突破限制, 通过此脚本可以查询任意预售期范围的数据
 * 
 * v1.0.1 2012-9-20
 * 为保证兼容其他版本的firefox和greasemonkey, 改用插入script的方式来运行脚本
 * 
 * v1.0 2012-9-20
 * 增强余票查询的便捷性
 * 1. 打开<a href="http://dynamic.12306.cn/TrainQuery/leftTicketByStation.jsp">铁路客户服务中心-余票查询</a>
 * 2. 输入验证码后直接回车开始查询(发站/到站数据加载较慢时直接输入完整站名即可)
 * 3. 加载验证码异常时自动重新加载
 * 4. 通过xhr来异步查询
 * 5. 查询失败时给予提示
 */
(function() {
    function main() {
        // onload时去掉12306原来的click事件处理器, 直接调用加载数据的逻辑
        window.onload = function() {
            $('#submitQuery').unbind('click');
            $('#submitQuery').click(loadData);
        };
    }

    /**
     * 老版本的Greasemonkey不能在其作用域中调用页面中的方法(如调用脚本作用页面中的jQuery)
     * 因此采用插入script标签和内容的方式来运行整个脚本
     * 
     * PS: 经测试Greasemonkey 1.1@Firefox 15.0.1完全不需要这么蹩脚的方式
     */
    function injectScript(fn) {
        var script =document.createElement("script");
        script.textContent = "(" + fn + ")();";
        document.body.appendChild(script);
    }

    injectScript(main);
})();
