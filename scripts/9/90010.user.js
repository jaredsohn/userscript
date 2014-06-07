// ==UserScript==
// @name           Weather Forecast
// @namespace      dangoakachan@gmail.com
// @author         tuanutan <dangoakachan@foxmail.com> 
// @description    Get weather forecast from webxml.com.cn (Firefox ONLY!)
// @include        http://*
// @include        https://*
// @version        0.8.4
// @require        http://userscripts.org/scripts/source/99374.user.js
// @updateURL      http://userscripts.org/scripts/source/90010.meta.js 
// ==/UserScript==

/******************************************************************************
 *
 * |使用说明|
 *
 * 1. 按下面一节"全局设置"说明配置该脚本。
 * 2. 如果快捷键功能开启，按q查询天气(默认)，再按一次关闭；如果点击空白功能开启，
 *    点击页面任意空白处(不包括查询结果内)，关闭查询结果。
 * 3. GM或者Scriptish图标右键，"User Script Command"。
 * 4. v0.8.0增加自定义城市列表功能，可以手动在这些城市之间切换。方法是：
 *    a. 关闭autoDetect。
 *    b. 在天气结果界面上，双击城市名。
 *    c. 在下拉列表中选择你想要切换的城市。
 *    d. 成功后，会重新加载天气。
 *
 * |错误反馈|
 * 如果脚本不能正常运行，请考虑以下几点：
 * (1) 版本更新之后，脚本有可能会出现数据错误，原因是不同的版本中配置选项的
 *     格式可能有区别，解决方法为：
 *  a. 打开about:config，并在过滤行中输入“weather"
 *  b. 找到"extensions.scriptish.scriptvals.WeatherForecast@dangoakachan@gmail.com.wfJSONObj"
 *     这一项(名字可能会有所不同, 搜索"weather")，右键reset（重置）。
 *  c. 重新查询天气
 *
 * (2) 在脚本中将debug设置成true，然后打开错误控制台（按Ctrl+shift+j），将出错或者
 *     其它消息记录下来发送给我或者留言
 *
 *      mailto: dangoakachan@foxmail.com
 *     或者http://g.mozest.com/thread-36354-1-1
 *
 * |声明|
 * 根据web服务提供网站的接口文档说明：http://www.webxml.com.cn/files/WeatherWsHelp.pdf
 *    "免费用户24小时内查询不超过50次并且获取二次数据大于间隔 600ms"。
 * 官方数据2.5小时更新一次，本脚本也是按照2.5小时的间隔作缓存处理，因此在该间隔时间内，
 * 若再次查询则返回缓存的信息。因此以上规定对我们使用该服务不会造成影响。
 *
 * |全局设置说明|
 *
 * 1. citys
 * 可供切换的城市列表，默认采用上次使用保存的城市或者列表第一个城市。例如：
 *      citys: ['杭州', '上海', '北京', '深圳'],
 * 查询支持的城市名，访问以下链接：
 * http://www.webxml.com.cn/WebServices/WeatherWS.asmx?op=getSupportCityString
 * 在 theRegionCode中输入所在省的名称，按调用查看返回结果中所列出的城市列表。
 * 默认值：['杭州', '上海', '北京', '深圳']。
 * 注意：当autoDetect选项开启时，此选项无效。
 *
 * 2. autoDetect
 * 根据当前的IP地址自动检测天气信息。默认值：true。
 *
 * 3. day
 * 表示需要显示的天数，最多5天。默认值：3。
 *
 * 4. position
 * 设置天气信息在窗口的显示位置，只要设置两个方向的值, 就可以确定显示位置，例如:
 *    var position = { right: '1px', top: '3px'};
 * 表示位于窗口右上角, 距离窗口上方3px和右方1px。
 * 默认值：{ right: '1px', top: '3px'}。
 *
 * 5. interval
 * 如果查询时间间隔小于interval(单位为小时)，则不向服务器发送请求，而是使用本地
 * 缓存数据。
 * 默认值：2.5 (官方数据2.5小时更新一次)。
 *
 * 7. debug
 * 在控制台显示调试信息。默认值: false。
 *
 * 8. transparent
 * 设置天气显示界面透明度，范围0~1，数值越低表示透明度越高。默认值：0.95。
 *
 * 9. accessKey
 * 设置查询天气的快捷键(同时切换显示/隐藏)，可以自由设置组合键或者单键。例如：
 *    accessKey: {ctrl:true, shift: true, key: "DOM_VK_W"};
 * 表示快捷键设置成ctrl+shift+w(覆盖了FF默认的快捷键设置)。
 * 关于key的可选值请参考：
 * https://developer.mozilla.org/en/DOM/Event/UIEvent/KeyEvent
 * 默认值：{ ctrl: false, shift: false, key: "DOM_VK_Q" }。(按Q键查询天气)
 *
 * 10. clickToHide
 * 点击页面空白处隐藏天气预报视图，如果为false则关闭这功能。默认值为false。
 *
 * 11. shortcut
 * 是否开启快捷键支持，默认为true。
 *
 *****************************************************************************/

(function() {
/* Global configuration */
var conf = {
    "user": {
        // City list
        citys: ['杭州', '上海', '北京'],
        // The number of day to display
        day: 5,
        // Update interval
        interval: 2.5,
        // Enable/disable debug mode
        autoDetect: true,
        // Enable shortcut key
        shortcut: true,
        // Enable/disable click anywhere to hide the weather information
        clickToHide: true,
        // Enable/disable auto detect city
        debug: true,
        // Shortcut key to query weather
        accessKey: { ctrl: false, shift: false, key: "DOM_VK_Q" }, 
    },
    "ui": {
        // Transparent degree
        transparent: 0.9,
        // The display position of weather result
        position: { right: '1px', top: '0px', /* left: '1px', bottom: '0px' */ }
    }
};

/******************************************************************************/

// DON'T run this script in any frames, otherwise 
// the script will run more than once.
if (window.self != window.top)
    return; 

// An alias of getElementById
function $(id) { return document.getElementById(id); }
// Log message printer
function log(msg) { if (conf.user.debug) GM_log(msg); }
// Encode string
function enc(str) { return encodeURIComponent(str); }
// Decode string
function dec(str) { return decodeURIComponent(str); }

// Format time like "xxxx/xx/xx xx:xx:xx" to standard
function timeFormat(ti) 
{ 
    var regexOfTime = 
        /(\d{4})\/(\d{1,2})\/(\d{1,2})\s*(\d{1,2}):(\d{1,2}):(\d{1,2})/;
    
    var m = ti.match(regexOfTime);
    var date = (new Date(m[1], m[2]-1, m[3], m[4], m[5], m[6])).toLocaleString();

    //return date.slice(0, -9);
    return date;
}

// Returns true if node is a escendant of ancestor
function isDescendant(elem, ancestor)
{
    while (elem) {
        if (elem == ancestor)
            return true;

        elem = elem.parentNode;
    }

    return false;
}

function wfUIHtml()
{
    var temp = [];

    // Optimize performance with array join instead of string concatenation
    temp.push("<div id='wf_caption'><p id='wf_location'>%location%</p><select id='wf_city_list'>");

    for (var i = 0, o = conf.user.citys.length; i < o; i++)
        temp.push("<option value="+i+">"+conf.user.citys[i]+"</option>");
    
    temp.push("</select><p id='wf_update_time'>上次更新: %update%</p><a id='wf_quit'\
        title='Click here to quit' href='javascript:document.getElementById(\"wf_info\").style.display\
        =\"none\";void(0);'></a></div>");

    for (var i = 0, d = conf.user.day; i < d; i++) {
        temp.push("<div class='wf_day'><div class='wf_img'><img src='%img");
        temp.push(i);
        temp.push("%'></img></div><div class='wf_text'><p class='wf_desc'>天气: %desc");
        temp.push(i);
        temp.push("%</p><p class='wf_temp'>温度: %temp");
        temp.push(i);
        temp.push("%</p><p class='wf_wind'>风向: %wind");
        temp.push(i);
        temp.push("%</p></div></div>");
    }

    temp.push("<div id='wf_current'><p class='wf_title'>今日天气实况</p>\
        <p>%current%</p></div>");

    if (conf.user.autoDetect)
        temp.push("<div id='wf_ip_addr'><p>IP地址：%ip%</p><p>位置：%addr%</p></div>");

    return temp.join("");
}

function wfUICss()
{ 
    var wfCss = "\
        #wf_info {\
            position: fixed;\
            width: 275px;\
            display: none;\
            z-index: 10000;\
            font-size: 12px;\
            font-family: sans-serif;\
            color: #ffffff;\
            background: #464646;\
            padding:5px;\
        }\
        #wf_info #wf_caption {\
            margin-bottom: 3px;\
            border-bottom: 1px solid #fefefe;\
            text-align: left;\
            display: block;\
        }\
        #wf_info #wf_location, #wf_info #wf_city_list {\
            font-size: 16px;\
        }\
        #wf_info #wf_city_list {\
            display: none;\
            padding: 2px;\
        }\
        #wf_info #wf_update_time {\
            font-style: italic;\
        }\
        #wf_info #wf_quit {\
            position: absolute;\
            right: 0;\
            top: -2px;\
            width: 24px;\
            height: 24px;\
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACmAAAApgBNtNH3wAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIcSURBVEiJ7ZTPbhJRFMbPucM4I+nCPwQ6DFSkRJ7AhenKJ9DUdKBQZhgWXfgSk/sQJsYNaUkbS40v4WsUhmkLU0RqhcbCjHOvG5u4cCba2MSYfslZndzfl++eey5yzuE6Ra6VfmPw7xvUarWiaeqrYX3T1FcNo/woioFhz7Rer6/cT97bW1iIJ4fusK0sZnTLshgAAKWUuCfH2+m0ok0mk9H407jcbLY+/IoTC3OezWansnTrbvx2XMw9zFUcxyGU0g0AgMGwv7NcyGsECfF9/858fjH64wQAAJsvN7fyuQc1SZKQMca73e5bACCFwvKaIMSI53n8oNNpvX71xghjhCYAAFBTqtlzDklhOV+VZRmLxWKZIOFCTCDz+Zx3bXtHSapmFCNyyJZlMSWZNuyevRsEjEuShJIsEcYYP+h0d1MJxbicy5USXIpzLkynUzg/nwIiAuccGAt+62xkAkopcT/2t9W0WorFBEQkHBGZKIqYzWS0k9GgRSmNZIQ2ERH7w34zm8lURFFEAOBHR4f7Ts95HwSciaKIS9mldXd4vHUlA71Rfq4qqXVCCPq+z23b3huPziqn4y9lu2e/8zyPIQImEok1w6g8CeOE3qP/DUcXs9lXAIgPXHf/83iit9vtAABA07SKzWyuLCrPfN8/AxDl0Aic89CqGtUVo7HxAn7sy88FAFiqlh7rDf1pFCNy0f6G/vPv+sYAAOA7kmcSD+k0/0kAAAAASUVORK5CYII%3D');\
        }\
        #wf_info .wf_day {\
            display: block;\
            width: auto;\
            background: transparent;\
        }\
        #wf_info .wf_img {\
            float:left;\
            border: 1px solid #fefefe;\
            border-radius: 2px;\
            margin-top: 6px;\
            margin-right: 15px;\
            display: block;\
            height:48px;\
            width:48px;\
        }\
        #wf_info #wf_current, #wf_info #wf_ip_addr {\
            position: relative;\
            margin-top: 3px;\
            border-top: 1px solid #fefefe;\
            display: block;\
        }\
        #wf_info p {\
            line-height: 1.6em;\
            margin: 1px;\
            color: white;\
            font-family: inherit;\
            text-align: left;\
        }\
        #wf_info #wf_current .wf_title {\
            position: absolute;\
            font-size: 16px;\
            right: 3px;\
            top:0;\
            bottom: 20px;\
        }";

    GM_addStyle(wfCss);
}

// Store weather forecast information.
var _wfJSONObj = {};

// Create a DOM parser
var _parser = new DOMParser();

// Returns the text content of specified node
function text(idx, data) {return data[idx].firstChild.nodeValue;}

// Smart query weather information
function smartQueryWf()
{  
    log("Smart query weather information.");

    var lastQueryTime, currTime, wfJSONObj;

    lastQueryTime = GM_getValue("lastQueryTime", 0);
    currTime = (new Date()).getTime() / 1000;

    var deltaTime = currTime - lastQueryTime;

    _wfJSONObj = JSON.parse(GM_getValue("wfJSONObj", "{}"));

    var cityIndex = _wfJSONObj.cityIndex;

    if (typeof cityIndex == "undefined" || cityIndex == -1)
        cityIndex = 0;

    var city = conf.user.citys[cityIndex];

    /*
     * In order to avoid frequent queries, we set an interval to update weather
     * information.
     *
     * If the delta time is less than the interval, we consider to fetch the
     * weather information from cache(local storage) first, except for the following 
     * special cases:
     *    a. local storage is empty or incomplete.
     *    b. the city is changed from last time.
     *    c. switch to auto detect mode without update.
     */
    if (deltaTime < conf.user.interval * 3600) {
        log("Delta time " + deltaTime + " is less than 3600 * 2.5.");

        if (typeof _wfJSONObj.city != "undefined") {
            log("Found last city " + _wfJSONObj.city + ", check...");
            /* Check the found information */
            if (conf.user.autoDetect ? _wfJSONObj.ip : (city == _wfJSONObj.city)) {
                log("The weather information is up to date.");
                display();
                return;
            } else
                log("The weather information is outdated.");
        } else 
            log("You maybe run this script first time.");
    }

    /* Otherwise, query weather by one method */
    if (conf.user.autoDetect)
        queryWfByIP();
    else
        queryWfByCityForce(city);
}

// Querys weather information by current ip address.
function queryWfByIP()
{
    var url = "http://www.hujuntao.com/api/ip/ip.php?format=json";

    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        header: {
            "User-Agent": navigator.userAgent, 
            "Accept": "text/html",
            "Host": "int.dpool.sina.com.cn",
        },
        onreadystatechange: function(responseDetails) {
            var ipJSON;

            if (responseDetails.readyState != 4 ||
                responseDetails.status != 200)
                return;

            // responseText is a JSON Object
            ipJSON = JSON.parse(responseDetails.responseText);
            console.dir(responseDetails);

            _wfJSONObj.ip = ipJSON['ip'];
            _wfJSONObj.addr = dec(ipJSON['province'] + ipJSON['city']);

            log("Get ip address sucessfully.");

            // Query weather information based on the city returned
            queryWfByCity(dec(ipJSON['city']));
        }
    });
}

function queryWfByCityForce(city)
{
    log("Clean old weather information.");
    _wfJSONObj = {};
    queryWfByCity(city);
}

// Querys weather information by specified city.
function queryWfByCity(city)
{
    var url = "http://www.webxml.com.cn/WebServices/WeatherWS.asmx/getWeather" +
        "?theUserID=&theCityCode=" + enc(city);

    log("Your city is (" + city + ").");

    /* Make sure city is not empty */
    if (!city) return;

    // Do cross-domain xmlhttprequest.
    // It's the major restriction of cross-browser implementation.
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        header: {
            "User-Agent": navigator.userAgent, 
            "Accept": "application/xml",
            "Host": "webservice.webxml.com.cn"
        },
        onreadystatechange: function(responseDetails) {
            if (responseDetails.readyState != 4 || 
                responseDetails.status != 200)
                return;

            var doc = _parser.parseFromString(
                responseDetails.responseText,
                "application/xml");

            var wfData = doc.getElementsByTagName("string");

            if (wfData.length == 1) {
                log(text(0, wfData));
                return;
            }

            log("Query weather information sucessfully.");

            /* 
             * According to the specification about xml data returned:
             * http://www.webxml.com.cn/webservices/weatherwebservice.asmx
             */

            // City information
            _wfJSONObj.location = text(0, wfData);
            _wfJSONObj.city = text(1, wfData);

            // Add county into location
            if (_wfJSONObj.location.indexOf(_wfJSONObj.city) == -1)
                _wfJSONObj.location += " " + _wfJSONObj.city;

            _wfJSONObj.cityIndex = conf.user.citys.indexOf(city);
            //_wfJSONObj.code = text(2, wfData);

            // Update time
            _wfJSONObj.update = timeFormat(text(3, wfData));

            // Weather information
            for (var i = 0, idx = 4, d = conf.user.day; i < d; i++) {
                if (i == 0) {
                    var temp = text(idx++, wfData).substring(7).split("；");
                    _wfJSONObj.current = temp.concat(text(idx++, wfData).split("；"));
                    delete temp;
                    idx++; // Skip
                }

                // Weather, day i
                _wfJSONObj["desc"+i] = text(idx++, wfData);
                _wfJSONObj["temp"+i] = text(idx++, wfData);
                _wfJSONObj["wind"+i] = text(idx++, wfData);
                _wfJSONObj["img"+i] = text(idx++, wfData);

                idx++; // Skip another img
            }

            // Display in page
            display();

            // Store setting
            GM_setValue("wfJSONObj", JSON.stringify(_wfJSONObj));
            GM_setValue("lastQueryTime", String((new Date()).getTime() / 1000));

            log("Update weather information sucessfully!");
        }
    });
}
// Show or hide the weather information
function wfInfoToggle()
{
    var wfInfo = initialize();
    var display = window.getComputedStyle(wfInfo, null).getPropertyValue("display");

    if (display == "none")
        smartQueryWf();
    else {
        log("Hide weather information.");
        wfInfo.style.display = "none";
    }
}

// Displays the weather forecast information in current page.
function display()
{
    var wfInfo = initialize();

    // Replace %tagname% with real data
    wfInfo.innerHTML = wfUIHtml().replace(/%.*?%/g, function(w) {
        var data = _wfJSONObj[w.slice(1, -1)];

        if (w.indexOf("%img") != -1)
            return wfIconSets[data];

        if (w.indexOf("%current") != -1)
            return data.join("</p><p>");

        return data;
    });

    // Show -->
    wfInfo.style.display = "block";
    $("wf_city_list").options[_wfJSONObj.cityIndex].selected = true;

    log("Display in page now.");
}

// Initialize when reloading pages
function initialize()
{
    var wfInfo = $("wf_info");

    if (wfInfo != null) {
        return wfInfo;
    }

    wfInfo = document.createElement("div");
    document.body.appendChild(wfInfo);

    wfInfo.id = "wf_info";
    wfInfo.style.opacity = conf.ui.transparent;

    wfUICss();

    for (var dir in conf.ui.position)
        wfInfo.style[dir] = conf.ui.position[dir];

    return wfInfo;
}

// Event Listener
if (conf.user.shortcut) {
    log("Enable short cut key function.");
    window.addEventListener("keydown", function(evt) {
        var tg = evt.target;

        if (tg.tagName == "INPUT" || tg.tagName == "TEXTAREA")
            return;

        var KE = KeyEvent.wrappedJSObject;
        var accessKey = conf.user.accessKey;

        if (accessKey.ctrl == evt.ctrlKey && accessKey.shift == evt.shiftKey
            && KE[accessKey.key] == evt.keyCode) {
            wfInfoToggle();   // Toggle weather information
            evt.preventDefault();
        }
    }, true);
}

if (!conf.user.autoDetect) {
    log("Enable city switch function.");
    window.addEventListener("dblclick", function(evt) {
        if (evt.target.id == "wf_location") {
            evt.target.style.display = "none";
            $("wf_city_list").style.display = "inline";
            evt.stopPropagation();
        }
    }, false);

    window.addEventListener("change", function(evt) {
        var select = evt.target;
        if (select.id == "wf_city_list") {
            queryWfByCityForce(conf.user.citys[evt.target.value]);
            evt.stopPropagation();
        }
    }, false);
} else
    log("Auto detect is enabled, then city switch is disabled.");

if (conf.user.clickToHide) {
    log("Enable click blank to hide function.");
    window.addEventListener("click", function(evt) {
        var tg = evt.target;
        var wfInfo = $("wf_info");

        if (wfInfo == null || wfInfo.style.display == "none"
            || isDescendant(tg, wfInfo))
            return;
        else  
            wfInfo.style.display = "none";
    }, false);
}

// Greasemonkey user command menu
GM_registerMenuCommand("Weather Forecast", smartQueryWf, '', '', 'w');

})();