// ==UserScript==
// @name Repaint Checker
// @namespace Kaima
// @description 源自Repaint Tracer，网页重绘的演示, 需要firefox 3.5+
// @include http://user.qzone.qq.com/*
// @include http://www.google.cn/
// @include http://www.google.com/
// @include http://www.1616.net/
// @version 1.0
// ==/UserScript==

var PaintTracer = (function() {
    var store = [];
    var recorded = false;
    var _replyKey = 0;

    /**
    * 可视化信息存活时间
    * 
    * @type number
    */
    var liveTimer = 1000;

    /**
    * 开始跟踪repaint
    */
    function _paintTester() {
        if (recorded) {
            return
        }
        store = [];
        window.addEventListener("MozAfterPaint", tracer, false);

        recorded = true;
    }

    /**
    * 停止跟踪repaint
    */
    function _stopTrace() {
        window.removeEventListener("MozAfterPaint", tracer, false);
        recorded = false;
    }

    /**
    * 记录跟踪数据
    * 
    * @param {event} e
    */
    function tracer(e) {
        store.push([
					(new Date).getTime(),
					e.clientRects,
					Math.max(document.body.scrollTop, document.documentElement.scrollTop)]);
    }

    /**
    * 回放跟踪的信息
    * 
    * @param {number} timeout 回放延时
    */
    function replayTrace(timeout) {
        _stopTrace();
        var _t = 0;
        var _to = parseInt(timeout, 10) || 200;
        _replyKey = Math.random();
        for (var i = 0; i < store.length; i++) {
            var rects = store[i][1];
            var _st = store[i][2];
            for (var j = 0; j < rects.length; j++) {
                var rect = rects[j];
                _t++;
                (function(r, s, t, k) {
                    setTimeout(function() {
                        _showGhost(r, s, k)
                    }, t);
                })(rect, _st, _t * _to, _replyKey);

            }
        }
    }

    /**
    * 把跟踪到的信息可视化
    */
    function _showGhost(rect, scrollTop, key) {
        if (recorded || key != _replyKey) {
            return
        }
        var div = document.createElement("div");
        div.style.cssText = "background-color:rgba(255,0,0,0.1);border:1px solid red;position:absolute;z-index:20000;top:" + (rect.top + scrollTop) + "px;left:" + rect.left + "px;width:" + (rect.right - rect.left - 2) + "px;height:" + (rect.bottom - rect.top - 2) + "px";
        document.body.appendChild(div);

        setTimeout(function() {
            div.parentNode.removeChild(div);
            div = null;
        }, liveTimer);
    }
    /**
    * 清空记录
    */
    function _clear() {
        store.length = 0;
    }
    return {
        trace: _paintTester,
        stop: _stopTrace,
        clear: _clear,
        replay: replayTrace,
        traceData: store,
        getRecordStatus: function() { return recorded }
    };
})();

(function() {
    /**
    * 调试区域的按钮
    * 
    * @type String
    */
    var _buttonHtml = '<h1 style="font-size:16px;background-color:#ff6600;color:#fff;padding:2px 10px;">Repaint Checker</h1>回放速度 <input id="sp" value="20" style="width:30px"/> ms  | <a href="http://kaima.cnblogs.com" target="_blank">homepage</a><br/><button id="_recordButton" style="cursor:pointer;">记录</button><button id="_replyButton" style="cursor:pointer;">回放重绘区域</button><button id="_clearButton" style="cursor:pointer;">清除</button>';

    /**
    * 初始化调试按钮
    */
    var _initRepainter = function() {
        var div = document.createElement("div");
        div.style.cssText = "font-size:12px;color:#000;position:fixed;left:0;top:0;margin:34px 0 0 8px;background:rgba(255,255,255,0.8);padding:4px;border:1px solid #999;z-index:100000;;"
        div.innerHTML = _buttonHtml;
        document.body.insertBefore(div, document.body.firstChild);

        document.getElementById("_clearButton").addEventListener("click", _clear, false);

        document.getElementById("_recordButton").addEventListener("click", _startRecord, false);

        document.getElementById("_replyButton").addEventListener("click", _stopRecord, false);
    };

    /**
    * 开始记录
    */
    var _startRecord = function() {
        document.getElementById("_clearButton").disabled = true;
        document.getElementById("_recordButton").disabled = true;
        document.getElementById("_recordButton").style.color = "#ccc";
        document.getElementById("sp").disabled = true;
        document.getElementById("sp").style.color = "#ccc";
        PaintTracer.trace();
    };

    var _clear = function() {
        PaintTracer.clear()
        return false;
    };
    /**
    * 定制记录并且回放
    */
    var _stopRecord = function() {
        PaintTracer.replay(document.getElementById("sp").value);
        document.getElementById("_clearButton").disabled = false;
        document.getElementById("_recordButton").disabled = false;
        document.getElementById("_recordButton").style.color = "#000";
        document.getElementById("sp").disabled = false;
        document.getElementById("sp").style.color = "#000";
    };

    /**
    * 监听快捷键
    */
    var _listenKey = function(e) {
        if (e.ctrlKey && e.charCode == 115) {
            if (PaintTracer.getRecordStatus()) {
                _stopRecord();
            } else {
                _startRecord();
            }
        }
    };

    document.addEventListener("keypress", _listenKey, false);


    _initRepainter();
})();
