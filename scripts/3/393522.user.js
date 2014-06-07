// ==UserScript==
// @id          RenrenmoneyInvest@scriptish
// @name        RenrenMoneyHelper
// @version     20140428
// @namespace      
// @author      RoBlues
// @description it help you to invest in renrenmoney
// @require		http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js
// @require		http://malsup.github.com/min/jquery.form.min.js
// @include     /^https?:\/\/(www\.|secure\.)?renrenmoney\.com\//
// @updateURL	http://userscripts.org/scripts/source/393522.meta.js
// @downloadURL	http://userscripts.org/scripts/source/393522.user.js
//only for test
// @include     file:///*
// @run-at      document-end
// ==/UserScript==

//全局变量定义
var utility_embedded = false;
const notifyInterval = 500;//查询消息时间为0.5秒
const cDebugStatus = false;//debug状态
const cRefreshPageInterval = 2000;//默认刷新页面的时间
const cLoginURL = "https://secure.renrenmoney.com/login.do";//登录页
const cMonitorLoginStatusInterval = 5000;//多长时间查询一次登录状态（单位毫秒）

//下面定义正则表达式 (正则表达式直接量中$需要用转义的)
var regRenrenWebsite = /renrenmoney.com\//; //人人聚财的网站
var regLoginHelp = /https:\/\/secure\.renrenmoney\.com\/login\.do/; //辅助登录页的正则表达式
var regMonitorTender = /renrenmoney\.com\/finance\.do/; //监视投标页的正则表达式

//执行环境对象，全部以本身文本形式植入网页中
var utility = {
    timerRefresh: {  //自动刷新页面的计时器
        holder: null, //计时器的把柄.当用setInterval时，返回值是个holder，clearIntervalclear的返回值是undefined
        interval: cRefreshPageInterval //默认刷新页面的间隔,单位毫秒 即(1/1000)秒
    },
    debug: cDebugStatus,
    refreshCount: 1, //刷新计数
    monitorLoginStatusInterval: cMonitorLoginStatusInterval,//查询登录状态间隔
    loginURL: cLoginURL,//登录页
    showTab: function (tabName) {
        $("div", $("#RoDiv")).hide();//先隐藏所有标签
        $("#" + tabName).show();
    },
    notify: function (msg) {
        utility.setPref("NotifyMsg", msg);
    },
    setPref: function (name, value) {
        window.localStorage.setItem(name, value);
    },
    getPref: function (name) {
        return window.localStorage.getItem(name);
    },

    init: function () {
        $.extend({
            first: function (array, callback) {
                var result = null;
                $.each(array, function (index, element) {
                    result = callback.call(this, index, element);
                    if (result) return false;
                });
                return result;
            }
        });
    },

    setTipMessage: function (msg) {
        $("#tipMessage").html(msg);
    } //设置提示消息
};

//#region -----------------UI界面--------------------------
function initUIDisplay() {
    injectStyle();//注入CSS样式
    injectScriptAfter(injectDOM, "head");//注入网页脚本对象
}
//注入风格CSS代码
function injectStyle() {
    var s = document.createElement("style");
    s.id = "ro_RenrenInvest";
    s.type = "text/css";
    s.textContent = "\
    .RoCSS #tipMessage{ font-size:14px;color:#F00;} \
    .RoCSS { width: 980px; font-size: 14px; boder: 1px; margin-top:2px; margin-right: auto; margin-bottom: 2px; margin-left:auto; }\
    .RoCSS  div { width: auto; height: auto; border: 2px solid #D4D0C8;margin:auto; }\
    .RoCSS .RoCSS-AutoLogin,.RoCSS-FreshPage,.RoCSS-Order { }\
    .RoCSS input[type=text],input[type=password]{ border-width: 1px; border-style: solid;border-color:#DDDDDD; height:20px }\
    .RoCSS input[type=button]{font-family: '微软雅黑'; font-size: 14px;text-align: center;border-width: 1px; border-style: solid;}\
    .RoCSS h1 { height: 25px; font-size: 24px; text-align: center; position: relative; }\
    .RoCSS h2 { height: 20px; font-size: 16px;position: relative; }\
    ";
    document.head.appendChild(s);
}

//注入文本
function injectDOM() {
    //对所有页面都要植入的代码
    var html = [];
    html.push("<div id='RoDiv' class = 'RoCSS' >");
    html.push("  <h1 >人人聚财助手 </h1>");
    html.push("  <span>重要提示信息：</span> <span id='tipMessage'>不干活,真是棒极了！</span>");
    html.push("  <div id='roTabLoginHelper' class='RoCSS-AutoLogin' >");
    html.push("     <h2>人人聚财助手-登录助手 </h2>");
    html.push("     <hr>");
    html.push("     <label>");
    html.push("        <input id='autoLogin' type='checkbox'  value='自动登录'>");
    html.push("        自动登录,这样会自动记录上次登录的用户名和密码  </label>");
    html.push("        <button type='button' id='deleteUserAndPassword'>删除已保存用户名和密码</button>");
    html.push("  </div>");
    html.push("  <div id='roTabMonitorTender' class='RoCSS-FreshPage'>");
    html.push("    <hr>");
    html.push("    <h2 >人人聚财助手-自动投标 </h2>");
    html.push('    <label><input id="autoFreshPage" type="checkbox" value="自动刷新">自动刷新页面</label>');
    html.push("    <label>");
    html.push("     <input id='checkAutoInvest'  type='checkbox'  value='自动投标'>启动投标</label><br> ");
    html.push("      <label>利率不少于<input id='minIntrestRate' type='text' style='width:38px;height:16px'></label>%<br>");
    html.push("      <label>还款期限：最短 </label>");
    html.push("      <select id='minMonth'>");
    for (var i = 1; i < 18; i++) {
        html.push(" <option value='" + i + "'>" + i + "个月</option>");
    }
    html.push("      </select>");
    html.push("      <label>最长 </label>");
    html.push("      <select id='maxMonth'>");
    for (i = 1; i < 18; i++) {
        html.push(" <option value='" + i + "'>" + i + "个月</option>");
    }
    html.push("      </select>");
    html.push("      <br>");
    html.push("  </div>");
    html.push("</div>");
    $("div.head_bg").after(html.join("\r\n"));
    utility.showTab("");  //输入空字符，则隐藏所有自定义的Div
}

//注入当前页面
function injectScriptAfter(callback, afterPos) {
    /// <summary>非沙箱模式下的回调</summary>
    var cb = document.createElement("script");
    cb.type = "text/javascript";
    cb.textContent = buildCallback(callback);
    var lowAfterPos = afterPos.toLowerCase();
    if (lowAfterPos == "head") {
        document.head.appendChild(cb);
    } else {
        document.body.appendChild(cb);
    }
}

//将函数转换成代码，以便嵌入网页文件中
function buildCallback(callback) {
    var content = "";
    if (!utility_embedded) {
        content += "if(typeof(window.utility)!='undefined'){ alert('两次两次运行本脚本，有问题啊');}; \r\nwindow.utility=" + buildObjectJavascriptCode(utility) + "; window.utility.init();\r\n";
        utility_embedded = true;
    }
    content += "(" + buildObjectJavascriptCode(callback) + ")();";
    return content;
}

//将对象（含函数）转包成脚本代码，以嵌入网页文件
function buildObjectJavascriptCode(object) {
    /// <summary>将指定的Javascript对象编译为脚本</summary>
    if (!object) return null;
    var t = typeof (object);
    if (t == "string") {
        return "\"" + object.replace(/(\r|\n|\\)/gi, function (match, p1) {
            switch (p1) {
                case "\r":
                    return "\\r";
                case "\n":
                    return "\\n";
                case "\\":
                    return "\\\\";
                default :
                    return "";
            }
        }) + "\"";
    }
    if (t != "object") return object;
    var code = [];
    for (var i in object) {
        var obj = object[i];
        var objType = typeof (obj);
        if ((objType == "object" || objType == "string") && obj) {
            code.push(i + ":" + buildObjectJavascriptCode(obj));
        } else {
            code.push(i + ":" + obj);
        }
    }
    return "{\r\n" + code.join(",\r\n") + "}";
}

//主页
function loginHelpPage() {
    utility.showTab("roTabLoginHelper");  //切换到这个tab
    utility.setTipMessage("协助登录");
    $("document").ready(function () { //在文档准备好之后，就将是否自动登录的预先保存信息取出来。
        var isAutoLogin = utility.getPref("optAutoLogin") == "true";//是否自动登录
        var $autoLogin = $("#autoLogin");
        $autoLogin[0].checked = isAutoLogin;
        //如果是自动登录，则在1000毫秒后触发登录
        if (isAutoLogin) {
            $("#email").val(utility.getPref("optAutoLoginUsername"));//用户名
            $("#password").val(utility.getPref("optAutoLoginPassword"));//密码
        }
        $("#Image14").click(function () {
            utility.setPref("optAutoLoginUsername", $("#email").val());
            utility.setPref("optAutoLoginPassword", $("#password").val());
        });
        $autoLogin.change(function () {
            utility.setPref("optAutoLogin", this.checked);
        });
        $("#deleteUserAndPassword").click(function () {
            utility.setPref("optAutoLoginUsername", "");
            utility.setPref("optAutoLoginPassword", "");
        });
        $("#code").keyup(function () {
            if ($(this).val().length == 4) $("#Image14").click();
        })
    });
}

//监控标的发布
function monitorTender() {
    utility.showTab("roTabLoginHelper");  //切换到这个tab
    //在monitorTender里面的刷新函数
    //下单函数，不是通过植入页面，而是直接用函数
    function newPlaceAnOrder(bidingID) {
        $.ajax({
            url: "financeDetail.do",
            type: "post",
            data: "id=" + bidingID,
            dataType: "html",
            success: function (data) {
                //用新数据替换旧数据
                var newDoc = document.implementation.createHTMLDocument("tempDoc");
                newDoc.documentElement.innerHTML = data;

                var theMoneyCanBeInvest = Number($(newDoc).find("div>.exp:contains('项目剩余可投金额：¥')>em").html().replace(/,/g, ""));//项目剩余可投资金额
                var theMoneyYouHave = Number($(newDoc).find("div>.exp:contains('您的账户可用余额：¥')>em").html().replace(/,/g, ""));//账户余额
                var lastPlaceAnOrderMoney = (theMoneyCanBeInvest < theMoneyYouHave ) ? theMoneyCanBeInvest : theMoneyYouHave;   //最终决定投多少
                var annualRate = $(newDoc).find("#annualRate").val();     //年化利率
                var borrowAmount = Number($(newDoc).find("#wrapper>div.invest-top>div.model-box>div.profit>dl.f>dd>span").html()); //借款总额
                //给投标金额框里面赋值
                if ((utility.getPref("optAutoInvest") == "true") && (Number(utility.getPref("optMinInterestRate")) <= annualRate)) {
                    utility.notify('马上投标了!');

                    var param = {};
                    param['paramMap.id'] = bidingID;// id;   //投资标的ID，每笔标一个ID
                    param["paramMap.code"] = $(newDoc).find("#code").val();
                    param['paramMap.annualRate'] = annualRate;
                    param["paramMap.deadline"] = $(newDoc).find("#deadline").val();
                    param['paramMap.amount'] = lastPlaceAnOrderMoney;//$('#amount').val();
                    param['paramMap.investPWD'] = $(newDoc).find('#investPWD').val();
                    param['paramMap.borrowAmount'] = borrowAmount;
                    param['paramMap.hasInvestAmount'] = '';
                    param['paramMap.randomNum'] = '';
                    param['paramMap.ticketList'] = $(newDoc).find('#ticketList').val();

                    var url = 'financeInvest.do' + "?shoveDate" + (new Date().getTime());
                    if (utility.debug) console.log(new Date(), "post with url=" + url + param);
                    $.post(url, param, function (data) {
                        var callBack = data.msg;
                        if (callBack == 1) {
                            var moneyMsg = "";
                            if (data.tip != undefined) {
                                moneyMsg = data.tip;
                            }
                            //成功购买了moneyMsg的份额
                            var winBidMsg = "在编号" + bidingID + "的标中成功中标:" + moneyMsg + "元!庆祝吧!";
                            console.log(new Date(), winBidMsg);
                            utility.notify(winBidMsg);
                            $("#checkAutoInvest")[0].checked = false;    //暂时不要投标了。
                            utility.setPref("optAutoInvest",false);//同时把后台的值也给变了

                            //return false;
                        }
                    });
                }
                newDoc = null;//释放newDoc对象。
            }
        })

    }

    function RepeatCheck(stop) {

        if (!(typeof arguments[0] == 'boolean')) {//如果不是是Boolean值，或者没有，则为ture，即停止
            stop = false;
        }

        function checkPage() {
            //下面是刷新的关键代码
            var url = location.protocol + '//' + location.hostname + '/finance.do';
            $.ajax(url, {
                    dataType: 'html',
                    success: function (data) {
                        var msg = "我去服务器咨询了" + utility.refreshCount + "次，很累的，你怎么感谢我！";
                        utility.setTipMessage(msg);
                        console.log(new Date, msg);
                        utility.refreshCount++;
                        //用新数据替换旧数据
                        var newDoc = document.implementation.createHTMLDocument("tempDoc");
                        newDoc.documentElement.innerHTML = data;
                        var $newBidingList = $("ul.yahao_div_left", $(newDoc));
                        if ($newBidingList.size() > 0) {
                            console.log(new Date(), "获取到了新数据,提取投标信息,如与网页基本一致，则说明提取成功！");
                            //从网页中查找贷款清单
                            var listOfInvest = [];
                            var firstDisplay = true;
                            $("li", $newBidingList).each(function (index, element) {
                                var oneInvest = {};
                                oneInvest.bidingID = $("#id", $(element)).attr("value");//标的的ID
                                oneInvest.annualRate = Number($("div.ts-1-2>span", $(element)).html());//年化利率
                                oneInvest.totalMoney = Number($("div.ts-1-3>span", $(element)).html().replace(/,/g, "")); //总金额
                                oneInvest.loanTerm = Number($("div.ts-1-4>span", $(element)).html()); //还款期限，一般多少个月
                                oneInvest.refundMode = $("div.ts-1-5>span", $(element)).html().trim(); //还款方式
                                oneInvest.inverstProgress = Number($("div.ts-1-6>div>strong", $(element)).html().replace("%", ""));//投标进度
                                if (firstDisplay) {
                                    console.log(new Date(), oneInvest);//以后都留着，每次可以查看是否出问题了。
                                    firstDisplay = false;
                                }
                                if (utility.debug)  newPlaceAnOrder(oneInvest.bidingID);
                                var minMonth = Number(utility.getPref("minMonth"));
                                var maxMonth = Number(utility.getPref("maxMonth"));
                                if ((oneInvest.inverstProgress < 100) && ((oneInvest.loanTerm <= maxMonth) && (oneInvest.loanTerm >= minMonth))) {
                                    listOfInvest.push(oneInvest);
                                }
                            });
                            if (utility.getPref("optAutoInvest") == "true") {
                                //如果发现了有可投标信息
                                if (listOfInvest.length > 0) {
                                    function listSort(a, b) {         //自定义排序函数，首先是金额，其次是余额
                                        var tempSortResult = b.annualRate - a.annualRate;
                                        if (tempSortResult == 0) {
                                            tempSortResult = (100 - b.inverstProgress) * b.totalMoney - (100 - a.inverstProgress) * a.totalMoney;
                                        }
                                        return  tempSortResult;
                                    }

                                    listOfInvest.sort(listSort); //排序
                                    if (!(Number(listOfInvest[0].annualRate) < Number(utility.getPref("optMinInterestRate")))) {
                                        // utility.notify("利率是" + listOfInvest[0].annualRate + "%的标，赶紧投吧！");
                                        newPlaceAnOrder(listOfInvest[0].bidingID);
                                    }
                                }
                            }
                            console.log(new Date(), "抽空更新投标数据清单！");
                            $(document).find("ul.yahao_div_left").replaceWith($newBidingList); //更新投标数据
                        }

                        newDoc = null;//释放newDoc对象。
                    }
                }
            );
        }

        //要求停止.if(holder)为真，则表示运行，为假表示没有运行
        if (stop)  utility.timerRefresh.holder = window.clearInterval(utility.timerRefresh.holder);
        //要求运行.if(holder)为真，则表示运行，为假表示没有运行
        if (!stop && !utility.timerRefresh.holder) utility.timerRefresh.holder = window.setInterval(checkPage, utility.timerRefresh.interval);
    }

    $("document").ready(function () {
        utility.showTab("roTabMonitorTender");  //切换到这个tab

        //在文档的准备好事件中恢复预先保存的值,并且处理是有合适的标书出现
        var $loanTerm = $("select#borrow_period");//借款时长
        $loanTerm.change(function () {
            utility.setPref("optLoan_Period", this.value);
        });
        $loanTerm.val(utility.getPref("optLoan_Period") || "");

        var $refundMode = $("select#style");//还款方式
        $refundMode.change(function () {
            utility.setPref("optRefundMode", this.value);
        });
        $refundMode.val(utility.getPref("optRefundMode") || "");//还款方式
        var $minRate = $("input#minIntrestRate");  //最小要求利润
        $minRate.blur(function () {
            utility.setPref("optMinInterestRate", String(this.value));
        });
        $minRate.val(utility.getPref("optMinInterestRate") || "");

        var $autoInvest = $("input#checkAutoInvest");//自动投标按钮
        $autoInvest.change(function () {
            utility.setPref("optAutoInvest", this.checked);
        });
        $autoInvest[0].checked = utility.getPref("optAutoInvest") == "true"; //自动投标

        var $autoFreshPage = $("input#autoFreshPage");//自动刷新
        $autoFreshPage.change(function () {
            utility.setPref("optAutoFreshPage", this.checked);
            RepeatCheck(!this.checked);
        });
        $autoFreshPage[0].checked = utility.getPref("optAutoFreshPage") == "true";//自动刷新

        var $minMonth = $("#minMonth");//最短投资月数
        $minMonth.change(function () {
            var oldMinVal = utility.getPref("minMonth"); //旧值
            var newMinVal = $(this).val();//新值
            var maxVal = utility.getPref("maxMonth");
            if (Number(newMinVal) > Number(maxVal)) {
                $minMonth.val(oldMinVal);
            } else {
                utility.setPref("minMonth", $(this).val());
            }
        });
        $minMonth.val(utility.getPref("minMonth"));

        var $maxMonth = $("#maxMonth");//最长投资月数
        $maxMonth.change(function () {
            var oldMaxVal = utility.getPref("maxMonth"); //旧值
            var newMaxVal = $(this).val();//新值
            var minVal = utility.getPref("minMonth");
            if (Number(newMaxVal) < Number(minVal)) {
                $maxMonth.val(oldMaxVal);
            } else {
                utility.setPref("maxMonth", $(this).val());
            }
        });
        $maxMonth.val(utility.getPref("maxMonth"));

        RepeatCheck(!(utility.getPref("optAutoFreshPage") == "true"));//开始定时启动
    });
}

//监视登录状态函数,在网页环境内执行，每个页面都插入
function monitorLoginStatus() {
    //判断是否登录，是中间有段代码，(if ""!="")则视为没有登录。服务端可能是用if后面的第一个字符对象，作为登录用户名
    function monitorCode() {
        if ($("#loginInfo:contains('登录')").size() > 0) {
            console.log(new Date(), "我已经被服务器踢出来了，需要重新登录!");
            utility.notify("没登录，亲，赶紧登录后再监视吧!");
            window.location.assign(utility.loginURL);//转向登录页面
        }
    }

    monitorCode();//先检查一遍
    window.setInterval(monitorCode, utility.monitorLoginStatusInterval);
}

//分页面处理处理过程入口
function entryPoint() {
    //针对不同的页面植入不同的代码
    var lURL = decodeURI(window.location.href);
    if (regLoginHelp.test(lURL)) {
        injectScriptAfter(loginHelpPage, "body");
    } else if (regMonitorTender.test(lURL)) {
        injectScriptAfter(monitorTender, "body");
    }
}

//回调通知函数，只有Scripish提供了。
function scriptishNotify() {
    var msg = utility.getPref("NotifyMsg");
    if (msg != "") {
        GM_notification(msg);
        utility.setPref("NotifyMsg", "");
    }
}

//以函数形式将所有代码放在这里//!!!!!必须放在最末//不能放在utility的前面。因为在下文中要用到这个对象。//JavaScript是一边解析执行一边执行
(function init() {
    //全局变量赋值区域，确保这里没有重新定义与全局变量相同的变量名
    // 初始化变量
    var regPlugins = /plugins/;//插件页
    if (regPlugins.test(decodeURI(window.location.href))) return;//如果是plugins的插件，则直接退出
    var href = decodeURI(location.href);
    console.log(regLoginHelp.test(href));
    if (!regRenrenWebsite.test(href) && !regLoginHelp.test(href) && !regMonitorTender.test(href)) return;//如果不在允许的地址清单里面，则退出
    window.setInterval(scriptishNotify, notifyInterval);//轮番查询获取是否有通知消息
    if (!window.localStorage) {
        alert("警告! localStorage 为 null,Firefox请设置 about:config 中的 dom.storage.enabled 为 true .");
    } else {
        initUIDisplay();//注入页面的CSS样式以及操作页面
        entryPoint();//针对不同的页面针对性地注入执行函数或者代码
        if (!regLoginHelp.test(href)) injectScriptAfter(monitorLoginStatus, "body");   //植入监视登录状态代码
    }
})();//这里才是进入网页的第一个执行语句。其实就是调用上方的Init函数
