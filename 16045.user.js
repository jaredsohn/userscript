// ==UserScript==
// @name           GoogleShortcut(and hatebu)
// @namespace      http://d.hatena.ne.jp/authorNari/
// @description    Demo at http://www.narihiro.info/resource/googleshortcut.htm     Add keybind(j,k,shift, enter) to Google search result. link open is "enter" key. focus to serch word input area is "shift" key. Add keybind(j,k,shift, enter) to hatena bookmark. link open is "enter" key. edit to comment is "shift" key.
// @include        http://www.google.*/search*
// @include        http://b.hatena.ne.jp/*
// ==/UserScript==

//I'm write english nonsence...

// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ver 0.1 @ 2007-12-09
// experimental release

(function() {
    var HIGHLIGHT_COLOR = "#88FFFF";

    var gh2ldr = {
	now_choice : null,

	choice_plan : { tbl : {}, max_cnt : 0},

	key_actions : [],

	push_key : function(e) {
	    if(!e) e=event;
	    var keyname = gh2ldr.key_code2name(e.keyCode);
	    if(!gh2ldr.is_now_input){
		for(var i=0, len=gh2ldr.key_actions.length; i < len; i++) {
		    gh2ldr.key_actions[i](keyname);
		}
	    }
	},

	choice : function(elm, is_not_scroll) {
	    if(!elm) return;
	    if(gh2ldr.now_choice) {
		gh2ldr.now_choice.style.backgroundColor = "";
		gh2ldr.now_choice.style.color = "";
	    }
	    gh2ldr.now_choice = elm;
	    if(!is_not_scroll) {
		if("0" == elm.getAttribute("l_id")) {
		    window.scroll(0, 0);
		} else {
		    window.scroll(0, elm.offsetTop-10);
		}
	    }
	    elm.style.backgroundColor = HIGHLIGHT_COLOR;
//	    console.log("offsetHeight" + elm.offsetTop + ":" + elm.getAttribute("l_data"));
	},

	search_choice_list : null,

	numbering_choice_list : function() {
	    var lst = gh2ldr.search_choice_list();
	    var len = lst.length;
	    if(gh2ldr.choice_plan.max_cnt >= len && gh2ldr.choice_plan.max_cnt) return;
	    for(var i=0; i<len; i++) {
		if(!gh2ldr.choice_plan.tbl[lst[i].getAttribute("l_id")]) {
		    lst[i].setAttribute("l_id", gh2ldr.choice_plan.max_cnt);
		    gh2ldr.choice_plan.tbl[new String(gh2ldr.choice_plan.max_cnt)] = lst[i];
		    gh2ldr.choice_plan.max_cnt++;
		    observe(lst[i], 'click', function(e){ gh2ldr.choice(this, true);});
		}
	    }
	},

	is_now_input : false,

	key_code2name : function(keycode) {
	    var code2name = {13:"enter", 16:"shift", 17:"ctrl"};
	    return (code2name[keycode] || String.fromCharCode(keycode)).toLowerCase();
	}
    };

    var watch_list = [];

    function watch_choice_list() {
	gh2ldr.numbering_choice_list();
    };

    var comment_delete = false;
    function watch_comment() {
	var comments = document.getElementsByName("editinsitu-comment");
	if(comments.length) {
	    gh2ldr.is_now_input = true;
	    comment_delete = true;
	} else {
	    if(comment_delete) {
		gh2ldr.is_now_input = false;
		comment_delete = false;
	    }
	}
    };

    function watch_init() {
	if(!init_ok) {
	    init();
	}
    };

    function watch() {
	for(var i=0,len=watch_list.length; i<len; i++) {
	    watch_list[i]();
	}
	var self = arguments.callee;
	setTimeout(self,100);
    };

    function observe(target, type, listener) {
	if (target.addEventListener) target.addEventListener(type, listener, true);
	else target.attachEvent('on' + type, function() { listener(window.event); });
    };

    //init functions
    var initG2LDR; //google2ldr
    var initH2LDR; //hatebu2ldr
    var init_ok = false;

    //private
    (function(){

	//key_actions
	function j_key(){
	    var id = parseInt(gh2ldr.now_choice.getAttribute("l_id"), 10);
	    if(++id > (gh2ldr.choice_plan.max_cnt-1)) {
		id = 0;
	    }
	    gh2ldr.choice(gh2ldr.choice_plan.tbl[new String(id)]);
	};

	function k_key(){
	    var id = parseInt(gh2ldr.now_choice.getAttribute("l_id"), 10);
	    if((--id) < 0) {
		id = 0;
	    }
	    gh2ldr.choice(gh2ldr.choice_plan.tbl[new String(id)]);
	};

	function shift_key_google(){
	    var text_tag = document.getElementsByName("q")[0];
	    if(text_tag) {
		text_tag.focus();
		window.scroll(0,0);
	    }
	    return true;
	};

	function shift_key_hatebu(){
	    var img_tag = search_class_name(gh2ldr.now_choice.getElementsByTagName("img"), "comment_img");
	    if(img_tag) location.href = "javascript:void(toggleCommentEdit('" + gh2ldr.now_choice.id + "'));";
	    return true;
	};

	function enter_key_google(){
	    var a_tag = search_class_name(gh2ldr.now_choice.getElementsByTagName("a"), "l");
	    a_tag_click(a_tag)
	};

	function enter_key_hatebu(){
	    var a_tag = search_class_name(gh2ldr.now_choice.getElementsByTagName("a"), "bookmark");
	    a_tag_click(a_tag)
	};

	function search_class_name(lst, name) {
	    for(var i=0,len=lst.length; i<len; i++) {
		if(lst[i].className == name) {
		    return lst[i];
		}
	    } 
	};

	//todo window.open() is not open ... why? (maybe my env only)
	function a_tag_click(a_tag) {
	    if(!a_tag) return;
	    if(a_tag.target == "_blank") {
		if(window.open(a_tag.href)) return;
	    }
	    location.href = a_tag.href;
	};

	function do_key_action(target_key, action, keyname) {
	    if(keyname == target_key) {
//		console.log(keyname + ":" + target_key);
		if(gh2ldr.now_choice) {
		    return action();
		} else {
		    choice_first(keyname);
		}
	    }
	};

	function choice_first(keyname) {
	    if(keyname == "j" || keyname == "k") {
		gh2ldr.choice(gh2ldr.choice_plan.tbl["0"]);
	    }
	};


	//search choice list to hatebu
	function search_choice_hatebu() {
	    var res= [];
	    var dls = document.getElementsByTagName("dl");
	    for(var i=0,len=dls.length; i<len; i++){
		if(dls[i].className == "bookmarklist") res.push(dls[i]);
	    }
	    return res;
	};

	//search choice list to google
	function search_choice_google() {
	    var res = [];
	    var divs = document.getElementsByTagName("div");
	    for(var i=0,len=divs.length; i<len; i++){
		if(divs[i].className == "g") res.push(divs[i]);
	    }
	    return res;
	};

	initG2LDR = function() {
	    gh2ldr.search_choice_list = search_choice_google;
	    gh2ldr.key_actions.push(function(k){ do_key_action("j", j_key, k) });
	    gh2ldr.key_actions.push(function(k){ do_key_action("k", k_key, k) });
	    gh2ldr.key_actions.push(function(k){ do_key_action("shift", shift_key_google, k) });
	    gh2ldr.key_actions.push(function(k){ do_key_action("enter", enter_key_google, k) });
	    watch_list.push(watch_choice_list);
	    watch_list.push(watch_init);
	};

	initH2LDR = function() {
	    gh2ldr.search_choice_list = search_choice_hatebu;
	    gh2ldr.key_actions.push(function(k){ do_key_action("j", j_key, k) });
	    gh2ldr.key_actions.push(function(k){ do_key_action("k", k_key, k) });
	    gh2ldr.key_actions.push(function(k){ do_key_action("shift", shift_key_hatebu, k) });
	    gh2ldr.key_actions.push(function(k){ do_key_action("enter", enter_key_hatebu, k) });
	    watch_list.push(watch_choice_list);
	    watch_list.push(watch_comment);
	    watch_list.push(watch_init);
	};
    })();

    function init() {
	if(location.href.match(/^http:\/\/b\.hatena/)) {
	    init_ok = true;
	    initH2LDR();
	    //console.log("init_ok hatena");
	}
	if(location.href.match(/^http:\/\/www\.google.+\/search/)) {
	    init_ok = true;
	    initG2LDR();
	    //console.log("init_ok google");
	}

	observe(window, 'keydown', function(e){ gh2ldr.push_key(e) });
	var text_addEvent = function(lst, type) {
	    for(var i=0,len=lst.length; i<len; i++) {
		if(lst[i].type == type) {
		    observe(lst[i], 'focus', function(e){ gh2ldr.is_now_input = true });
		    observe(lst[i], 'blur', function(e){ gh2ldr.is_now_input = false });
		}
	    }
	}
	text_addEvent(document.getElementsByTagName("input"), "text");
	text_addEvent(document.getElementsByTagName("textarea"), null);
	watch();
    };

    init();
})();
