// ==UserScript==
// @name       “随手记”功能增强
// @description  对随手记的网站进行了多项的增强。
// @copyright  2013+, AsionTang
// @namespace  http://AsionTang.CN
// @version    0.6
// @match      http://money.feidee.com/u06/tally/new.do*
// @match      http://money.feidee.com/u06/account/account.do*
// @match      http://money.feidee.com/u06/report.shtml*
// @match      http://money.feidee.com/u06/category/budgetCategory.do*
// @run-at			document-end
// @grant none
// ==/UserScript==
var YeScript = YeScript || {};
YeScript.exShowIconName = function ()
{
    /*--------------------------------------------------------------------------------*/
    // 9.显示分类图标名称
    var items = document.getElementsByClassName('cat32');
    for (var i = 0; i < items.length; i++)
    {
        items[i].innerText = items[i].title;
        items[i].style.paddingTop = '32px';
    }
    var items = $('.popup_model ul.u3 .l2 a span');
    //var items = document.getElementsByClassName('.popup_model ul.u3 .l2 a span')
    for (var i = 0; i < items.length; i++)
        items[i].style.height = '64px';
    console.info('9:ok');
};
YeScript.exReport = function ()
{
    /*--------------------------------------------------------------------------------*/
    // 8.“日常收支表”点击内容在新窗口查看
    document.onclick = function ()
    {
        var uls = document.getElementsByTagName('ul');
        for (var i = 0; i < uls.length; i++)
        {
            var ul = uls.item(i);
            if (ul.onclick == null || ul.onclick.toString().indexOf('go(') == -1)
                continue;
            var funcGo = ul.onclick.toString();
            var id = funcGo.slice(funcGo.lastIndexOf('(') + 1, funcGo
                    .lastIndexOf(')'));
            var url = 'var url=\'tally/new.do?cid='
                        + id
                        + '&amp;beginDate=\'+tData.startTime+\'&amp;endDate=\'+tData.endTime;';
            // event.stopImmediatePropagation();可以马上阻止事件传播！
            ul.innerHTML = '<div onclick="event.stopImmediatePropagation();'
                            + url
                            + 'window.open(url);">'
                            + ul.innerHTML
                            + '</div>';
        }
        console.info('8:ok');
    };
};
YeScript.exAccount = function ()
{
    /*--------------------------------------------------------------------------------*/
    // 7.添加“可动产”
    var jzcEle = document.getElementById('jingzichan');
    var jinzichan = jzcEle.innerText.replace(',', '');
    var xianjinliu = jinzichan
                        - document.getElementById('ll-money-15').innerText
                                .replace(',', '');
    jzcEle.parentElement.outerHTML += '<dd class=".l-list"><span class="lt-name" title="【现在可动的资产 = 净资产 - 债权】">可动产：</span><span class="lt-money" id="xianjinliu">'
                                        + xianjinliu
                                                .toFixed(2)
                                                .replace(/(\\d)(?=(\\d{3})+(?!\\d))/g,
                                                            '$1,')
                                        + '</span></dd>';
    document.getElementsByClassName('l-top')[0].style.background = 'url(../images/account/l_shadow_top.gif?1346920760000) right bottom no-repeat';
    console.info('7:ok');
};
YeScript.exNew = function ()
{
    /*--------------------------------------------------------------------------------*/
    // 6.修改已添加项的备注时，Enter自动保存！折叠！
    window.oldClearDefaultMemo = window.clearDefaultMemo;
    window.clearDefaultMemo = function (obj)
    {
        console.info('6.0:ok');
        window.oldClearDefaultMemo(obj);
        $(obj).keydown(function (e)
        {
            console.info('6.1:ok');
            if (e.keyCode != 13)
                return;
            var id = window.tList.box.currentOpen;
            console.log(id);
            if (!tList.box.data[id])
                return;
            var type = window.tList.box.data[id][1].tranType;
            window.billManager.data.save(id, type);
        });
    };
    /*--------------------------------------------------------------------------------*/
    // 5.展开折叠时，焦点自动定位到备注输入框！并全选文本！
    window.data = window.tList.box.data;
    window.oldLoadBox = window.tList.box.loadBox;
    window.tList.box.loadBox = function (id)
    {
        console.info('5:ok');
        window.oldLoadBox(id);
        var memo = $("#list-box-" + id + " input[name='list-memo']");
        memo.focus();
        memo.select();
    };
    /*--------------------------------------------------------------------------------*/
    // 4.金额输入框，清空 0.00
    $(".input.money").focus(function (e)
    {
        console.info('4:ok');
        if (e.currentTarget.value == "0.00")
            e.currentTarget.value = null;
    });
    /*--------------------------------------------------------------------------------*/
    // 3.备注输入框，Enter变Tab键。
    $("#tb-memo").keydown(function (e)
    {
        console.info('3:ok');
        if (e.keyCode != 13)
            return;
        var evt = document.createEvent("KeyboardEvent");
        evt.initKeyboardEvent("keydown",
                                true,
                                true,
                                window,
                                "U+0009",
                                0,
                                false,
                                false,
                                true,
                                false,
                                false);
        e.currentTarget.dispatchEvent(evt);
        window.billManager.data.add();
    });
    /*--------------------------------------------------------------------------------*/
    // 2.金额输入框，Enter变Tab键。
    $(".input.money").keydown(function (e)
    {
        console.info('2:ok');
        if (e.keyCode != 13)
            return;
        e.stopPropagation(); // 取消冒泡
        e.preventDefault(); // 取消浏览器默认行为
        var evt = document.createEvent("KeyboardEvent");
        evt.initKeyboardEvent("keydown",
                                true,
                                true,
                                window,
                                "U+0009",
                                0,
                                false,
                                false,
                                false,
                                false,
                                false);
        e.currentTarget.dispatchEvent(evt);
    });
    /*--------------------------------------------------------------------------------*/
    // 1.设置Tab顺序，金额的下一个就跳到备注
    $(".input.money").attr("tabindex", 1);
    $("#tb-memo").attr("tabindex", 2);
    console.info('1:ok');
};

switch (window.location.pathname)
{
    case "/u06/tally/new.do":
        inject(YeScript.exNew);
        break;
    case "/u06/account/account.do":
        inject(YeScript.exAccount);
        break;
    case "/u06/report.shtml":
        inject(YeScript.exReport);
        break;
    case "/u06/category/budgetCategory.do":
        inject(YeScript.exShowIconName);
        break;
}
function injecter(js)
{
    YEJS = "//================== [YEJS START] =======================\n";
    YEJS += js;
    YEJS += "\nYeDoIt();";
    YEJS += "\n//================== [YEJS ENDED] =======================";
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'YEJS';
    script.innerHTML = YEJS;
    var scriptTag = document.getElementById('YEJS');
    if (scriptTag) document.body.removeChild(scriptTag);
    document.body.appendChild(script);
}