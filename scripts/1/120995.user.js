// ==UserScript==
// @name		  Youdao Bei Dan Ci		   
// @namespace     beidanci
// @version		  0.2
// @author		  mattmonkey
// @date          2011-12-20
// @description   有道单词本页面改造。给所有功能添加快捷键。
// @include       http://dict.youdao.com/wordbook/wordlistp*
// ==/UserScript==
(function() {
	var mtmkbdc = {
		mapping: {
			1: "next",
			2: "pre",
			3: "toggle-description",
			4: "phonetic-voice",
			5: "toggle_listmode"
		},

		mapping2: {
			1: "next_page",
			2: "prev_page",
			3: "last_page",
			5: "toggle_cardmode",
		},

		tid: 0,

		delay: 400,

		autophonetic: true,

		onekeymode: true,

		cachekey: "",

		recordmode: false,

		simulate: function(id) {
			// onekeymode
			if ((id == "next" || id == "pre") && this.onekeymode && this.cachekey == id) {
				id = "toggle-description";
			}

			this.cachekey = id;

			this.$(id).click();

			if (!this.tid) {
				clearTimeout(this.tid);
				this.tid = null;
			}

			// autophonetic
			if ((id == "next" || id == "pre") && this.autophonetic) {
				this.tid = setTimeout(this.$("phonetic-voice").click, this.delay);
			}

			// recordmode
			if (id == "next" || id == "pre") {
				GM_setValue("record", parseInt(this.$("card_id").textContent) + (id == "next" ? 1: - 1))
			}

		},

		$: function(id) {
			return document.getElementById(id);
		},

		$Attr: function(obj, attr, arg) {
			if (typeof obj == "string") {
				obj = document.getElementById(obj);
			}
			if (typeof arg === "undefined") {
				return obj.getAttribute(attr);
			} else {
				obj.setAttribute(attr, arg);
			}
		},

		isCardMode: function() {
			let attr = this.$Attr("cardmode", "style");
			return attr && attr.indexOf("block") != - 1;
		},

		handleEvent: function(evt) {
			if (evt.type == "click") {
				let target = evt.originalTarget.id;
				if (/option\_.*/.test(target)) {
					this.toggleOption(target.split('_')[1]);
				}
			} else {
				this.handleShortcute(evt);
			}
		},

		handleShortcute: function(evt) {
			mapping = this.isCardMode() ? this.mapping: this.mapping2
			let chr = String.fromCharCode(evt.keyCode);
			if (this.mapping[chr] != "undefined") {
				this.simulate(mapping[chr])
			}

		},

		toggleOption: function(p) {
			this[p] = ! this[p];
			GM_setValue(p, this[p]);
		}

	};

	with(mtmkbdc) {
		document.addEventListener("keydown", mtmkbdc)

		var links = document.getElementsByTagName("a");
		for (var i = 0; i < links.length; i++) {
			let link = links[i]
			if (link.textContent == "上一页") {
				$Attr(link, "id", "prev_page")
			}
			if (link.textContent == "下一页") {
				$Attr(link, "id", "next_page")
			}
			if (link.textContent == "最后一页") {
				$Attr(link, "id", "last_page")
			}
		}

		let leftbar = $("leftbar");
		let html = "<div style=\"font-size:140%\">";
		html += "<br/>卡片模式/列表模式 5 <br/><br/> 列表 : 下一页 1 <br/>列表 : 上一页 2<br/>列表 : 最后一页 3<br/><br/>卡片 : 下一个 1<br/>卡片 :  上一个 2<br/>卡片 :  看卡片 3<br/>卡片 : 发声 4<br/><br/>";
		html += "<div>自动发音&nbsp;<input id='option_autophonetic' type='checkbox'/><div/>";
		html += "<div>一键模式&nbsp;<input id='option_onekeymode' type='checkbox'/><div/>";
		html += "<div>记录位置&nbsp;<input id='option_recordmode' type='checkbox'/>";
		html += "<div><input id = 'action_jump' value = 'jump' style='display:none' type='button'/></div>"
		html += "<br/><br/><br/><br/><a href='http://userscripts.org/scripts/show/120995' target='_blank'>脚本帮助</a></div>"

		leftbar.innerHTML += html;

		["autophonetic", "onekeymode", "recordmode"].forEach(function(key) {
			mtmkbdc[key] = GM_getValue(key, true);
			$("option_" + key).checked = mtmkbdc[key];
			$("option_" + key).addEventListener("click", mtmkbdc);
		})

		if (recordmode) {
			$Attr("action_jump", "style", "display:block")
			var pos = GM_getValue("record", "1")
			$Attr("action_jump", "value", "跳到第"+pos+"个")
			$("action_jump").addEventListener("click", function() {
				$("card_id").textContent = pos;
				mtmkbdc.simulate("toggle_cardmode");
			});
		}
	}
})()
