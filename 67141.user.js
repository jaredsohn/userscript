// ==UserScript==
// @name           Google Search Keyboard Shortcuts For AutoPagerize
// @version        v0.2.3 (2010/05/16)
// @namespace      http://d.hatena.ne.jp/tomo_snowbug
// @description    googleの検索結果をショートカットで閲覧。AutoPagerizeと一緒にどうぞ。
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include        http://www.google.co.jp/*
// @include        http://images.google.co.jp/*
// @include        http://video.google.co.jp/*
// @include        http://www.google.com/*
// @include        http://images.google.com/*
// @include        http://video.google.com/*
// ==/UserScript==

var chevronData = "data:image/gif;base64,R0lGODlhCQALAIABAAAAAP///yH5BAEAAAEALAAAAAAJAAsAAAIUhBGph5rs3okBOtakuXN1nVVfUgAAOw==";

var GoogleShortCut = {

    KeyBind: {
        j: "nextLink",
        k: "previousLink",
        c_j: "suggestDown",
        c_k: "suggestUp",
        c_h: "moveCursorLeft",
        c_l: "moveCursorRight",
        c_g: "moveCursorStart",
        c_s_g: "moveCursorEnd",
        o: "openSelectedLink",
        slash: "focusSearchBox",
        esc: "blurSearchBox",
        t: "toggleLeftNav"
    },
    
    isFocused: function() {
		var nowFocused = (document.activeElement 
			|| window.getSelection().focusNode);
		if (nowFocused == GoogleShortCut.getQueryInput().get(0)) {
			return true;
		}
		return false;
	},
    
    nowPointedIndex: -1, //選択中のリンクを指し示す通し番号

    linkAnchors: [], //検索結果リンクを保持する

    selectedLinkClassName: "__now_selected_anchor",

    arrow: null,

    init: function() {
        GoogleShortCut._init.call(GoogleShortCut);
    },
    
    _init: function() {
        window.addEventListener("keydown", GoogleShortCut.fire, false);
		this.addStyles();
        this.initQueryInput();
        this.initArrow();
        this.initLinkAnchor();
		this.initLeftNav();
    },
    
    fire: function(event) {
        GoogleShortCut._fire.call(GoogleShortCut, event);
    },
    
    _fire: function(event) {
        var _keycode = event.keyCode;
		//debug.p(_keycode);
        var isFired = false;
        switch (_keycode) {
            case 74:
            case 40: // arrow down
				if (event.ctrlKey) {
	                isFired = eval("GoogleShortCut." + this.KeyBind.c_j + ".call(GoogleShortCut)");
				} else {
	                isFired = eval("GoogleShortCut." + this.KeyBind.j + ".call(GoogleShortCut)");
				}
                break;
            case 75:
			case 38: // arrow up
				if (event.ctrlKey) {
	                isFired = eval("GoogleShortCut." + this.KeyBind.c_k + ".call(GoogleShortCut)");
				} else {
	                isFired = eval("GoogleShortCut." + this.KeyBind.k + ".call(GoogleShortCut)");
				}
                break;
			case 71: //g
				if (event.shiftKey && event.ctrlKey) {
	                isFired = eval("GoogleShortCut." + this.KeyBind.c_s_g + ".call(GoogleShortCut)");
				} else if (event.ctrlKey) {
	                isFired = eval("GoogleShortCut." + this.KeyBind.c_g + ".call(GoogleShortCut)");
				}
				break;
			case 72: //h
				if (event.ctrlKey) {
	                isFired = eval("GoogleShortCut." + this.KeyBind.c_h + ".call(GoogleShortCut)");
				}
				break;
			case 76: //l
				if (event.ctrlKey) {
	                isFired = eval("GoogleShortCut." + this.KeyBind.c_l + ".call(GoogleShortCut)");
				}
				break;
            case 79:
                isFired = eval("GoogleShortCut." + this.KeyBind.o + ".call(GoogleShortCut)");
                break;
            case 191:
                isFired = eval("GoogleShortCut." + this.KeyBind.slash + ".call(GoogleShortCut)");
                break;
            case 27:
                isFired = eval("GoogleShortCut." + this.KeyBind.esc + ".call(GoogleShortCut)");
                break;
			case 84: //t
				if (event.ctrlKey || event.shiftKey) {
					//ctrl + t はFirefoxのタブを開くショートカットなので、邪魔をしないように
					break;
				}
				isFired = eval("GoogleShortCut." + this.KeyBind.t + ".call(GoogleShortCut)");
        }
        if (isFired) {
            //デフォルトイベントを抑制
            event.preventDefault();
            event.stopPropagation();
        }
    },
    
    nextLink: function() {
        if (this.isFocused()) {
            return false;
        }
        var oldPointer = this.nowPointedIndex;
        if (oldPointer >= this.linkAnchors.length) {
            debug.p("no more anchors.");
            return true;
        }
        this.nowPointedIndex++;
        return this.selectLink();
    },
    previousLink: function() {
        if (this.isFocused()) {
            return false;
        }
        var oldPointer = this.nowPointedIndex;
        if (oldPointer == 0) {
            debug.p("no more anchors.");
            return true;
        }
        this.nowPointedIndex--;
        return this.selectLink();
    },
    suggestDown: function() {
		if (!this.isFocused()) {
			return false;
		}
		this.fireKeypressEvent(40, this.getQueryInput().get(0));
		return true;
	},
    suggestUp: function() {
		if (!this.isFocused()) {
			return false;
		}
		this.fireKeypressEvent(38, this.getQueryInput().get(0));
		return true;
	},
	
    openSelectedLink: function() {
        if (this.isFocused()) {
            return false;
        }
        var target = this.linkAnchors[this.nowPointedIndex];
        if (target) {
            window.open(target.href);
        }
        return false;
    },
    focusSearchBox: function() {
        if (this.isFocused()) {
            return false;
        }
        this.getQueryInput().get(0).focus();
        window.scrollTo(0, 0);
        return true;
    },
    blurSearchBox: function() {
        this.getQueryInput().get(0).blur();
		//サジェストを確実に消すため、ESCキーイベント発火
		this.fireKeypressEvent(27, this.getQueryInput().get(0))
        return this.selectLink();
    },
    selectLink: function() {
        var selectAnchor = this.linkAnchors[this.nowPointedIndex];
        if (!selectAnchor) {
            return false;
        }
		var previouseAnchor = this.linkAnchors[this.nowPointedIndex - 1];
		var nextAnchor = this.linkAnchors[this.nowPointedIndex + 1];
		if (previouseAnchor) {
			$(previouseAnchor).removeClass(this.selectedLinkClassName);
		}
		if (nextAnchor) {
			$(nextAnchor).removeClass(this.selectedLinkClassName);
		}
		$(selectAnchor).addClass(this.selectedLinkClassName);
        selectAnchor.focus();
        if (this.nowPointedIndex == 0) {
			this.scrollToAnchor(selectAnchor, 0);
            return true;
        }
        this.scrollToAnchor(selectAnchor);
		return true;
    },
    
    getQueryInput: function() {
        return $("input[name='q']");
    },
    initQueryInput: function() {
        debug.p("call init query input");
        this.getQueryInput().focus(function() {
            debug.p("isFocused=" + GoogleShortCut.isFocused());
        }).blur(function() {
            debug.p("isFocused=" + GoogleShortCut.isFocused());
        });
    },

    initLinkAnchor: function() {
		this.linkAnchors = this.getAnchors();
        if (this.linkAnchors.length > 0) {
            this.nowPointedIndex = 0;
            this.selectLink();
        }
    },
	getAnchors: function(context) {
		var url = location.href
		var anchors = null;
		if (url.indexOf("http://www.google.co.jp/im") != -1
			|| url.indexOf("http://www.google.com/im") != -1) {
			anchors = this.getImageLinkAnchor(context);
		} else {
	        anchors = this.getLinkAnchor(context);
		}
		anchors.attr("target", "_blank");
		return anchors.get();
	},
    getLinkAnchor: function(context) {
		var targetExpression = "a.l, a.fl, a.mblink, a.spell";
		if (context) {
			return $(targetExpression, context);
		}
		//Web検索、動画検索
		//スポンサーリンクが選択されるのを防ぐため、#res以下のリンクにマッチするように
        return $(targetExpression, $("#res"));
    },
    getImageLinkAnchor: function(context) {
		var targetExpression = "a:first";
		if (context) {
			//AutoPagerizeから継ぎ足されたとき。Tableを含んだDIVがわたってくるので
			//そのDIV以下にある、"td[id*='tDataImage']"からリンクを抽出する
			return $(targetExpression, $("td[id*='tDataImage']", context));
		}
		return $(targetExpression, $("td[id*='tDataImage']"));
    },
	jWindow: $("html"), //一応キャッシュ
    scrollToAnchor: function(anc, offset_y) {
        var _scrollOffset = 120;
		var anchorOffset = this.getOffsetHeightFromBody(anc);
		if (offset_y == undefined) {
	        offset_y = anchorOffset;
		}
		var scroll_y = offset_y - _scrollOffset;
		this.jWindow.animate({scrollTop: scroll_y}, 60, 'swing');
		
		//arrow
		var arrow = $(this.arrow);
		arrow
			.css("left", "-3px")
			.insertBefore($(anc));
    },
    getOffsetHeightFromBody: function(ele) {
        var offset_y = ele.offsetTop;
        while (ele = ele.offsetParent) {
            offset_y += ele.offsetTop;
        }
        return offset_y;
    },
    initArrow: function() {
        var img = $(document.createElement("img"));
		img
      	    .attr("src", chevronData)
        	.css("position", "relative")
        this.arrow = img.get(0);
    },
	fireKeypressEvent: function(keyCode, elem) {
		window.setTimeout(function() {
			var evt = document.createEvent("KeyboardEvent");
			evt.initKeyEvent("keypress", true, true, window, false, false, false, false, keyCode, 0);
			elem.dispatchEvent(evt);
		}, 0, keyCode, elem);
	},
	addStyles: function() {
		var css =
			<style>
			<![CDATA[
				a.__now_selected_anchor {
					color: white !important;
					background-color: #2200CC !important;
					border: 2px solid #2200CC !important;
					-moz-border-radius: 3px;
					padding: 2px;
					text-decoration: none;
				}
				#leftnav {
					position: fixed !important;
					top: 110px !important;
				}
			]]>
			</style>
		$(css.toSource()).appendTo("head");
	},
	centerColDefaultMarginLeft: 0,
	leftnavStatus_key: "isShownLeftnav",
	toggleLeftNav: function() {
		if (this.isFocused()) {
			return false;
		}
		var nav = $("#leftnav");
		if (nav.css("display") == "none") {
			GoogleShortCut.showLeftNav();
			return true;
		}
		GoogleShortCut.hideLeftNav();
		return true;
	},
	initLeftNav: function() {
		this.centerColDefaultMarginLeft = $("#center_col").css("margin-left");
		if (GM_getValue(this.leftnavStatus_key)) {
			return;	
		}
		this.hideLeftNav();
	},
	hideLeftNav: function() {
		var dulation = 600
		$("#leftnav").hide(dulation);
		$("#center_col")
			.css("border-left-width", "0")
			.animate({marginLeft: "20px"}, dulation, 'swing')
		$("#foot").css("margin-left", "0px");
		setTimeout(function() {
	    	GM_setValue(GoogleShortCut.leftnavStatus_key, false);
		}, 0);
	},
	showLeftNav: function() {
		var dulation = 100
		$("#leftnav").show(dulation);
		var defalutMarginLeft = GoogleShortCut.centerColDefaultMarginLeft;
		$("#center_col")
			.animate({marginLeft: defalutMarginLeft}, dulation, 'swing')
			.css("border-left-width", "1px");
		$("#foot").css("margin-left", defalutMarginLeft);
		setTimeout(function() {
	    	GM_setValue(GoogleShortCut.leftnavStatus_key, true);
		}, 0);
	},
	moveCursorLeft: function() {
		if (!this.isFocused()) {
			return false;
		}
		this.moveCursor(this.getQueryInput().get(0), -1);
		return true;
	},
	moveCursorRight: function() {
		if (!this.isFocused()) {
			return false;
		}
		this.moveCursor(this.getQueryInput().get(0), 1);
		return true;
	},
	moveCursor: function(target, amount) {
		target.selectionStart = target.selectionStart + amount;
		target.selectionEnd = target.selectionStart;
	},
	moveCursorStart: function() {
		if (!this.isFocused()) {
			return false;
		}
		var target = this.getQueryInput().get(0);
		target.selectionStart = 0;
		target.selectionEnd = 0;
		return true;
	},
	moveCursorEnd: function() {
		if (!this.isFocused()) {
			return false;
		}
		var target = this.getQueryInput().get(0);
		var end = target.value.length;
		target.selectionStart = end;
		target.selectionEnd = end;
		return true;
	},
	
};

var debug = {
    _enabled: false,
    p: function(str) {
        if (!debug._enabled) 
            return;
        console.log(str);
    }
};

//support AutoPagerize
function addingFromAutoPager(event) {
	var addElement = event.target;
	debug.p("call back!" + addElement);
	var oldLinks = GoogleShortCut.linkAnchors;
    GoogleShortCut.linkAnchors = oldLinks.concat(
			GoogleShortCut.getAnchors(addElement));	
			
}

//main.
$(document).ready(function(){
    GoogleShortCut.init();
	document.body.addEventListener('AutoPagerize_DOMNodeInserted',
		addingFromAutoPager,false);
});
