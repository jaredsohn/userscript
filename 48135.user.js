// ==UserScript==
// @name Repaint Tracer
// @namespace QZFL
// @description 网页重绘的演示, 需要firefox 3.5。An web repaint tracer. It need Firefox
// 3.5.
// @include http://user.qzone.qq.com/*
// @include http://www.google.cn/
// @include http://www.google.com/
// @version 1.8
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

	return {
		trace : _paintTester,
		stop : _stopTrace,
		replay : replayTrace,
		traceData : store,
		getRecordStatus : function(){return recorded}
	};
})();

(function() {
	/**
	 * 调试区域的按钮
	 * 
	 * @type String
	 */
	var _buttonHtml = '回放速度 <input id="sp" value="20" style="width:30px"/> ms  | <a href="http://userscripts.org/scripts/show/48135" target="_blank">homepage</a><br/><button id="_recordButton" style="border:3px double #ccc;margin:2px;background:#fff;font-size:12px;font-weight:lighter;padding:2px;width:90px;color:#000">记录重绘数据</button><button id="_replyButton" style="border:3px double #ccc;margin:2px;background:#fff;font-size:12px;font-weight:lighter;padding:2px;width:90px;color:#000">回放重绘区域</button>';

	/**
	 * 初始化调试按钮
	 */
	var _initRepainter = function() {
		var div = document.createElement("div");
		div.style.cssText = "font-size:12px;color:#000;position:fixed;left:0;top:0;margin:34px 0 0 8px;background:rgba(255,255,255,0.8);padding:4px;border:1px solid #999;z-index:100000;;"
		div.innerHTML = _buttonHtml;
		document.body.insertBefore(div, document.body.firstChild);

		document.getElementById("_recordButton").addEventListener("click", _startRecord, false);

		document.getElementById("_replyButton").addEventListener("click", _stopRecord, false);
	}

	document.addEventListener("keypress", _shortcut, false);

	function _shortcut(e){
			if (e.keyCode == 119) {
				_startRecord();
			}
			
			if (e.keyCode == 120) {
				_stopRecord();
			}
	}

	/**
	 * 开始记录
	 */
	var _startRecord = function() {
		document.getElementById("_recordButton").disabled = true;
		document.getElementById("_recordButton").style.color = "#ccc";
		document.getElementById("sp").disabled = true;
		document.getElementById("sp").style.color = "#ccc";
		PaintTracer.trace();
	}

	/**
	 * 定制记录并且回放
	 */
	var _stopRecord = function() {
		PaintTracer.replay(document.getElementById("sp").value);
		document.getElementById("_recordButton").disabled = false;
		document.getElementById("_recordButton").style.color = "#000";
		document.getElementById("sp").disabled = false;
		document.getElementById("sp").style.color = "#000";
	}
	
	
	_initRepainter();
})();
