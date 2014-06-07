// ==UserScript==
// @name          Show Node Tree
// @namespace     http://userscripts.org/users/81100
// @author        chemera
// @version       1.0.3
// @description	  Show Node Tree
// @homepage      http://www.veoh.com/users/chemera2008
// @include       http://*
// @include       https://*
// ==/UserScript==
//

(function() {

var	subwin_name = "node_tree_win"
// check the sub window made by my script
var query = '//meta[@name="chemera"]';
var nodes = xpath(query);
if(nodes.length) {
	return;
}

if( !(document.contentType.indexOf('text/html') >= 0 ||
      document.contentType.indexOf('text/xml') >= 0 ) ) {
	return;
}

function $(id) {
	return document.getElementById(id);
}

const ELEMENT_NODE = 1	// Element
const ATTRIBUTE_NODE = 2	// Attribute
const TEXT_NODE = 3	// Text
const COMMENT_NODE = 8	// Comment

const SHOW_SELECTOR = 0	// Selector for CSS
const SHOW_NODE_INFO = 1	// Node Information

// Log output object
var	LOG = {
// logmode: false = no output, true = output log
	logmode: false,
	initialize: function() {
		this.logmode = GM_getValue("logmode", this.logmode);
	},
	setmode: function (mode) {
		this.logmode = mode;
		GM_setValue("logmode", mode);
	},
// Set log output mode
	output: function(log) {
		if(this.logmode == true) {
			GM_log(log);
		}
	},
	ChangeLogMode: function() {
		var	on_off = ["OFF","ON"];
		var	now, next;
		if(LOG.logmode == true) {
			now = 1;
			next = 0;
		} else {
			now = 0;
			next = 1;
		}
		var msg = "Current log mode is "+on_off[now]+". Set log mode "+on_off[next]+". OK?";
		var ret = window.confirm(msg);
		if(ret == true) {
			if(next == 1) {
				LOG.setmode(true);
			} else {
				LOG.setmode(false);
			}
		}
	}
}

// Sub window object
var	Sub_Win = {
	sub_win: '',
	url: '',

	open: function(url) {
LOG.output("Sub_Win: open");
		this.url = url;
		this.sub_win = window.open(url?url:'',subwin_name,"");
		if(!this.url) {
			with(this.sub_win.document) {
				open();
				write('<html><meta name="chemera" content="This window is created by script"><body>');
			}
		}
	},

	write: function(str) {
LOG.output("Sub_Win: write");
		if(this.sub_win == '') {
			return;
		}
		this.sub_win.document.write(str);
	},

	close: function() {
LOG.output("Sub_Win: close");
		if(this.sub_win == '') {
			return;
		}
		if(!this.url) {
			with(this.sub_win.document) {
				write("</body></html>");
				close();
			}
		}
	},

	window_close: function() {
LOG.output("Sub_Win: window_close");
		if(this.sub_win == '') {
			return;
		}
		this.sub_win.close();
	}
}

var Util = {
	// Triming left and right space
	Trim: function(str) {
		return str.replace( /^\s*/, "" ).replace( /\s*$/, "" );
	},

	// Triming right space
	Rtrim: function(str) {
		return str.replace( /\s*$/, "" );
	},

	// Triming left space
	Ltrim: function(str) {
		return str.replace( /^\s*/, "" );
	},

	// no operation
	NoOperation: function() {
	}
}

// Drag and Drop object
var DnD = {
	startX:0,		// Starting mouse X position
	startY:0,		// Starting mouse Y position
	offsetLeft:0,		// Starting drag_obj left position
	offsetTop:0,		// Starting drag_obj top position
	click_obj: null,	// trigger object
	drag_obj: null,		// drag object
	callback: [],		// callback functions
	status: 0,		// drag status

// Initialize DnD object with click_obj and drag_obj.
// click_obj: a trigger object when the mouse button was clicked.
// drag_obj: the object which should be dragged.
// The parameter is allowed string and node object.
// If the parameter is string,it has to be the node ID.
	initialize: function(click_obj, drag_obj) {
		if( typeof click_obj == 'object') {
			this.click_obj = click_obj;
		} else if( typeof click_obj == 'string') {
			this.click_obj = $(click_obj);
		} else {
			return false;
		}
		if( typeof drag_obj == 'object') {
			this.drag_obj = drag_obj;
		} else if( typeof drag_obj == 'string') {
			this.drag_obj = $(drag_obj);
		} else {
			return false;
		}
		this.click_obj.addEventListener('mousedown', 
			function(e){
				DnD.start(e);
			}, 
			true);
		DnD.status = 0;
		document.addEventListener("mousemove", DnD.dragging, true);
		document.addEventListener("mouseup", DnD.stop, true);
	},

// Set a callback function.
// The callback function is called with click_obj and drag_obj parameter before the function phase finished.
	setCallback: function(stat, callback) {
		if( typeof callback == 'function') {
			var phase = ['start','dragging','stop'].indexOf(stat);
			if(phase >= 0) {
				this.callback[phase] = callback;
			}
		}
	},

// Drag start
	start: function(e) {
		DnD.startX = e.clientX;
		DnD.startY = e.clientY;
		DnD.offsetLeft  = DnD.drag_obj.offsetLeft;
		DnD.offsetTop   = DnD.drag_obj.offsetTop;
		e.preventDefault();
		DnD.click_obj.style.cursor = '-moz-grabbing';
		if(DnD.callback[0]) {
			DnD.callback[0](DnD.click_obj, DnD.drag_obj);
		}
		DnD.status = 1;
	},

// Dragging
	dragging: function(e) {
		if(DnD.status != 1) {
			return;
		}
		e.preventDefault();
		var x = DnD.offsetLeft + e.clientX - DnD.startX;
		var y = DnD.offsetTop + e.clientY - DnD.startY;
		DnD.drag_obj.style.left = x + "px";
		DnD.drag_obj.style.top = y + "px";
		if(DnD.callback[1]) {
			DnD.callback[1](DnD.click_obj, DnD.drag_obj);
		}
	},

// Drag stop
	stop: function(e) {
		if(DnD.status != 1) {
			return;
		}
		DnD.status = 0;
		DnD.click_obj.style.cursor = '-moz-grab';
		if(DnD.callback[2]) {
			DnD.callback[2](DnD.click_obj, DnD.drag_obj);
		}
	},

	finalize: function() {
		document.removeEventListener("mousemove", DnD.dragging, true);
		document.removeEventListener("mouseup", DnD.stop, true);
		this.status = 0;
		this.click_obj = null;
		this.drag_obj = null;
		for(var i = 0; i < this.callback.length; i++) this.callback[i] = null;
	}
};

// Balloon(Tooltip)
var	Balloon = {
	parent: null,
	node: null,
	distX: 0,
	distY: 10,
	style: <><![CDATA[
		z-index: 200001;
		width: auto;
		height: auto;
		min-width: 100px;
		color: black;
		position:fixed;
		font-size:12px;
		background-color:#CCFFFF;
		border: 1px solid black;
		padding:4px;
		-moz-border-radius: 10px;
	]]></>+"",
	set_style: function(style) {
		if(!style) {
			this.style = style;
		}
	},
	create: function(e, parent, text, style) {
		if(typeof parent == 'string') {
			parent = $(parent);
		}
		if(typeof parent != 'object') {
			return;
		}
		var node = document.createElement('div');
		node.innerHTML = text;
		if(!style) {
			style = this.style;
		}
		node.setAttribute('style', style);
		parent.appendChild(node);
		var x = e.pageX - window.scrollX - node.offsetWidth/2;
		var y = e.pageY - window.scrollY + this.distY;
		node.style.left = x + "px";
		node.style.top = y + "px";

		this.parent = parent;
		this.node = node;
	},
	destroy: function() {
		if(this.parent) {
			this.parent.removeChild(this.node);
		}
		this.parent = null;
		this.node = null;

	},
}

// Language
var Lang = {
	default_lang: 'en',
	lang: 'en',
	set_lang: function(lang) {
		this.lang = lang;
	},
	initialize: function() {
		this.set_lang(navigator.language);
//		this.set_lang('en');	// for test
//		this.set_lang('fr');	// for test
	}
};

// Message
var Msg = {
	help: {
		en: "click: main site<br/>shift + click: mirror site",
		ja: "クリック: メインサイト<br/>shiftキーを押しながらクリック = ミラーサイト"
	},
	css: {
		en: "set original CSS code into the textarea",
		ja: "元のCSSコードをテキストエリアにセットします"
	},
	msg: function(target) {
		if(Msg[target]) {
			if(Msg[target][Lang.lang]) {
				return Msg[target][Lang.lang];
			} else {
				return Msg[target][Lang.default_lang];
			}
		} else {
			return '';
		}
	}
};

// Help
var Help = {
	site: {
		main: 'http://chemera.coolpage.biz/',
		mirror: 'http://www.chemera.byteact.com/',
	},
	page: {
		en: 'show_node_tree.html#form',
		ja: 'show_node_tree_j.html#form'
	},
	url: function(site) {
		if(this.site[site]) {
			if(this.page[Lang.lang]) {
				return this.site[site]+this.page[Lang.lang];
			} else {
				return this.site[site]+this.page[Lang.default_lang];
			}
		} else {
			return '';
		}
	},
	show: function(site) {
		if(Help.url(site)) {
			window.open(Help.url(site));
		}
	}
};

var	suffix = "_for_ShowNodeTree";
var Form = {
// properties
	margin_x: 20,	// 20 pixel
	margin_y: 20,	// 20 pixel
	x: 0,
	y: 0,
	current_mode: 0,
	select_mode: SHOW_SELECTOR,
	property_nums: 0,
	property_names: [],
// key
	select_mode_key: "select_mode",
	customize_checkbox_key: "customize_checkbox",
	show_ID_selector_key: "show_ID_selector",
	show_class_selector_key: "show_class_selector",
	show_attribute_selector_key: "show_attribute_selector",
	include_script_key: "include_script",
	show_node_value_key: "show_node_value",
	show_comment_node_key: "show_comment_node",
	show_computed_style_key: "show_computed_style",
	output_properties_key: "output_properties",
	subwin_style_key: "subwin_style",

	show_ID_selector: true,
	show_class_selector: true,
	show_attribute_selector: true,
	include_script: false,
	show_node_value: false,
	show_comment_node: false,
	show_computed_style: false,
	customize_checkbox: false,
	output_property_num: 0,
	output_properties: [],
	output_default_properties_str: '\
	background-color,\
	background-image,\
	color,\
	display,\
	height,\
	left,\
	position,\
	top,\
	width',
	output_default_properties: [],

	subwin_style: '',
	subwin_style_default: <><![CDATA[
	body {
	background-color: #FFFFFF;
	color: #000000;
	}
	.name_style {
	color: #000000;
	}
	.id_style {
	color: #FF0000;
	}
	.class_style {
	color: #0000FF;
	}
	.attr_style {
	color: #008800;
	}
	.value_style {
	background-color:#FFFF88;
	}
	.comment_style {
	background-color:#88FFFF;
	}
	.computed_style {
	background-color:#CCFFFF;
	}
	]]></>+"",


// IDs
	base_id: "gm_base" + suffix,
	base_style_id: "gm_base_style" + suffix,
	div_id: "gm_div" + suffix,
	title_id: "gm_title" + suffix,
	command_id: "gm_command" + suffix,
	reset_id: "gm_reset_button" + suffix,
	show_id: "gm_show_button" + suffix,
	save_id: "gm_save_button" + suffix,
	quit_id: "gm_quit_button" + suffix,
	help_id: "gm_help_button" + suffix,
	default_id: "gm_default_button" + suffix,
	default2_id: "gm_default2_button" + suffix,
	select_mode_id: "gm_select_mode" + suffix,
	selector_id: "gm_selector_radio_button" + suffix,
	node_info_id: "gm_node_info_radio_button" + suffix,
	customize_checkbox_id: "gm_customize_checkbox" + suffix,
	div_selector_id: "gm_div_selector" + suffix,
	id_selector_id: "gm_id_selector" + suffix,
	class_selector_id: "gm_class_selector" + suffix,
	attr_selector_id: "gm_attr_selector" + suffix,
	include_script_id: "gm_include_script" + suffix,
	node_value_id: "gm_node_value" + suffix,
	comment_node_id: "gm_comment_node" + suffix,
	span_include_script_id: "gm_span_include_script" + suffix,
	div_style_id: "gm_div_style" + suffix,
	computed_style_id: "gm_computed_style" + suffix,
	div_select_list_id: "gm_div_select_list" + suffix,
	select_property_id: "gm_select_property" + suffix,
	select_all_id: "gm_select_all_button" + suffix,
	clear_all_id: "gm_clear_all_button" + suffix,
	textarea_id: "gm_textarea" + suffix,

// Classes
	label_class: "gm_label" + suffix,
	button_class: "gm_button" + suffix,
	radio_label_class: "gm_radio_label" + suffix,
	radio_button_class: "gm_radio_button" + suffix,
	check_box_class: "gm_check_box" + suffix,
	select_list_class: "gm_select_list" + suffix,
	option_list_class: "gm_option_list" + suffix,

// Names
	radio_select_mode: "$radio_select_mode" + suffix,

// Styles
	div_style_close: 'display:none;',
	div_style_open: 'display:block;',
	span_style_close: 'display:none;',
	span_style_open: 'display:inline;',

	style: <><![CDATA[
	#$base_id div { min-width:100px; }
	#$div_id { width:550px;z-index:200000;border: 6px ridge gray;position:fixed;background-color:#DDDDDD;font-weight: bold;text-align:left;color:#000000;cursor:default; }
	#$title_id { height:48px; font-weight: bold;text-align:center;color:#FFFFFF;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjAAAAABCAYAAADASJROAAADxklEQVRIiWXD51uVdRwH4F6XWmmlmZUZooBMZchGGYosBUU4bEHZe+912Bw2HDaHDSIbQRkiCkJlWmq5yizThuaf8OnF9/k9z3Ouc1/X/c67auEQf29vhMpN6pHYpB6JzfvYKGzeF4Ut+0U1orFFIxrvcz/QjKFa9EOtWHpAuFU7Dlu147CN1YnHNp14fKTLJvA/1qOf6CVSfbrdIAnbDZKwwyBZeJB+eihF6U7DVOw0TMVnRmwaf5cx1yQdu0zS8Tn3i8MZ1FT4pWkmNaO7zbKw2ywLX5lzLbL5e1jLHOyxzMHXVlTNKpda50HNOg97bYTqNvn0CN13tEDpfttCvoYdK4WGnRSa9lyHImg6FEFL9MCxYqXax0uoI9VxLIWOYyl0T4g6lUHXqQx6XH3ncupSAX2XChiIu1bCwLUSB93oITcZPUkNT1WpNHKvhpF7NYxZjxoYe9TA5DRbyz98hpp61ik1O1tPvYTmXg0w92qAhTdX0ggLSSMsJU2wlDTBykfUVw4rXzmsWb9mWPs1w8afHvFvoQHCowGtNJDaBrXBNqgNduy5dr59MNsB++AOOITQY+c7VR6/0EVDqWOoAo6hCpwI66bh1Cm8h+8cwfbCOaIXLpHcqD64RPXBVdQtup/G0JMxAzSWnoob5Luz8UNwjx+CRwI7DI+EYZxOFJ5JuqjUM3kEnskjOJtySalX6qhK77QxeKeNQZLOjkOSPg6fDNHMCfhkTsCX65c1SbOpf/aUMIcG5E4jIHcagWzeDALzZhCUz17mnyugwQWztJCGSOcQIp3DeekVYRG9UHxVaWjJPEJL5hFWKr6AsNIFhJdxyxcRXr6ICG5kxRKtFEZVXqMyGi1bRrRsGTFV3Orr/Fi2ZgWxNSuIq6XxtTdo3U1+Qj1NrF+lDTSpcU1pctMtfoqcXUeKfB2pzdyWDaS2bCBNNL31G6UZbd/SdprZ/h0/q4PbeRtZnbeRzc3p+p4q7iBHcQe54t13kdt9F3k9NL/nB9pLC/p+VFnYfw+F/fcgZQfuQzpwH0WD4g9QNPgAxUO0ZPgnpaUXf6YjwrKRhygbeYjyS9zRRygffYSK0ceoGH2MyjHR8SeoHH8CGTvxFLKJp6iapNWTvwinaM3Ur3Sa1s48Q+3MM9Sxl3/j18+yz1E/+xwNc7Txyu8qm67+QeepfP4F5PMv0LzwJ10Utiy+RMviS7Qusa/QuvQKbde4y3/x27kd1/+mK7Rz5R96g3bd/JevYFdfQ7H6Gt1r7Bt0r71Bzy1h7/p/Svs23qJv4y3+B1kVaAucXspFAAAAAElFTkSuQmCC");cursor:-moz-grab; }
	#$command_id { height:32px; font-weight: bold;text-align:center;color:#FFFFFF;background-color: transparent; }
	#$reset_id { }
	#$show_id { }
	#$save_id { }
	#$quit_id { }
	#$default_id { }
	.$button_class { color:buttontext;background-color:buttonface;height:24px;border:2px outset buttonface;margin:4px 4px 4px 30px; }
	.$button_class:hover { cursor:pointer; }
	.$label_class { font-size:14px;vertical-align:middle;height:40px;margin-left:4px; }
	.$radio_label_class { color: #000000; background-color:#DDDDDD; font-size:14px;}
	.$radio_button_class { margin-top:10px;vertical-align:bottom;background-color:#DDDDDD; }
	.$check_box_class { height:16px;width:16px;margin:4px 0px 0px 10px;vertical-align:bottom; }
	.$select_list_class { }
	.$option_list_class { }
	#$select_mode_id {  }
	#$selector_id {  }
	#$node_info_id {  }
	#$customize_checkbox_id {  }
	#$div_selector_id {  }
	#$id_selector_id {  }
	#$class_selector_id {  }
	#$attr_selector_id {  }
	#$include_script_id {  }
	#$span_include_script_id {  }
	#$node_value_id {  }
	#$comment_node_id {  }
	#$div_style_id {  }
	#$computed_style_id {  }
	#$div_select_list_id {  }
	#$select_property_id {  }
	#$select_all_id { position: absolute; top: 150px; left: 200px; }
	#$clear_all_id { position: absolute; top: 150px; left: 300px; }
	#$default2_id { position: absolute; top: 150px; left: 390px; }
	#$textarea_id { width:98%;height:160px;color:#000000;background-color:#FFFFFF;border:2px inset; }
	]]></>+"",

// Form HTML
	html: <><![CDATA[
	<div id="$div_id" style="display: none;">
	<div id="$title_id">Show Node Tree
	<div id="$command_id">
	<input id="$reset_id" type="button" class="$button_class" value="Reset" />
	<input id="$show_id" type="button" class="$button_class" value="Show" />
	<input id="$save_id" type="button" class="$button_class" value="Save" />
	<input id="$quit_id" type="button" class="$button_class" value="Quit" />
	<input id="$help_id" type="button" class="$button_class" value="Help" />
	</div>
	</div>
	<div id="$select_mode_id">
	<span class="$label_class">Mode:</span>
	<input id="$selector_id" name="$radio_select_mode" type="radio" class="$radio_button_class" value="0" checked />
	<span class="$radio_label_class">Show selector for CSS</span>
	<input id="$node_info_id" name="$radio_select_mode" type="radio" class="$radio_button_class" value="1" />
	<span class="$radio_label_class">Show node information</span>
	<input type="checkbox" class="$check_box_class" id="$customize_checkbox_id" ></input><span class="$label_class">Customize</span>
	</div>
	<hr />
	<div id="$div_selector_id" style="display:none;">
	<span class="$label_class">Show ID selector:</span>
	<input type="checkbox" class="$check_box_class" id="$id_selector_id" ></input>
	<input id="$default_id" type="button" class="$button_class" value="Set Default" /><br />
	<span class="$label_class">Show class selector:</span>
	<input type="checkbox" class="$check_box_class" id="$class_selector_id" ></input><br />
	<span class="$label_class">Show attribute selector:</span>
	<input type="checkbox" class="$check_box_class" id="$attr_selector_id" ></input>
	<span class="$label_class" id="$span_include_script_id">include script
	<input type="checkbox" class="$check_box_class" id="$include_script_id" ></input></span><br />
	<span class="$label_class">Show node value:</span>
	<input type="checkbox" class="$check_box_class" id="$node_value_id" ></input><br />
	<span class="$label_class">Show comment node:</span>
	<input type="checkbox" class="$check_box_class" id="$comment_node_id" ></input><br />
	</div>
	<div id="$div_style_id" style="display:none;">
	<span class="$label_class">Show Computed Style:</span>
	<input type="checkbox" class="$check_box_class" id="$computed_style_id" ></input>
	<div id="$div_select_list_id" style="display:none;">
	<span class="$label_class">Select output properties</span><br />
	<select class="$select_list_class" id="$select_property_id" name="select_property" size="5" multiple>
	$property_option_list
	</select>
	<input id="$select_all_id" type="button" class="$button_class" value="Select all" />
	<input id="$clear_all_id" type="button" class="$button_class" value="Clear all" />
	<input id="$default2_id" type="button" class="$button_class" value="Set Default" /><br />
	</div>
	</div>
	<textarea id="$textarea_id" style="display:none;"></textarea>
	</div>
	]]></>+"",

// functions
	replace: function(word) {
// ID specification(possibility of the plural elements in the style)
		word = word.replace(/\$base_id/g,this.base_id);
		word = word.replace(/\$div_id/g,this.div_id);
		word = word.replace(/\$title_id/g,this.title_id);
		word = word.replace(/\$command_id/g,this.command_id);
		word = word.replace(/\$reset_id/g,this.reset_id);
		word = word.replace(/\$show_id/g,this.show_id);
		word = word.replace(/\$save_id/g,this.save_id);
		word = word.replace(/\$quit_id/g,this.quit_id);
		word = word.replace(/\$help_id/g,this.help_id);
		word = word.replace(/\$default_id/g,this.default_id);
		word = word.replace(/\$default2_id/g,this.default2_id);
		word = word.replace(/\$select_mode_id/g,this.select_mode_id);
		word = word.replace(/\$selector_id/g,this.selector_id);
		word = word.replace(/\$node_info_id/g,this.node_info_id);
		word = word.replace(/\$customize_checkbox_id/g,this.customize_checkbox_id);
		word = word.replace(/\$div_selector_id/g,this.div_selector_id);
		word = word.replace(/\$id_selector_id/g,this.id_selector_id);
		word = word.replace(/\$class_selector_id/g,this.class_selector_id);
		word = word.replace(/\$attr_selector_id/g,this.attr_selector_id);
		word = word.replace(/\$include_script_id/g,this.include_script_id);
		word = word.replace(/\$span_include_script_id/g,this.span_include_script_id);
		word = word.replace(/\$node_value_id/g,this.node_value_id);
		word = word.replace(/\$comment_node_id/g,this.comment_node_id);
		word = word.replace(/\$div_style_id/g,this.div_style_id);
		word = word.replace(/\$div_select_list_id/g,this.div_select_list_id);
		word = word.replace(/\$computed_style_id/g,this.computed_style_id);
		word = word.replace(/\$select_property_id/g,this.select_property_id);
		word = word.replace(/\$select_all_id/g,this.select_all_id);
		word = word.replace(/\$clear_all_id/g,this.clear_all_id);
		word = word.replace(/\$textarea_id/g,this.textarea_id);

// Class specification(possibility of the plural elements)
		word = word.replace(/\$label_class/g,this.label_class);
		word = word.replace(/\$button_class/g,this.button_class);
		word = word.replace(/\$radio_button_class/g,this.radio_button_class);
		word = word.replace(/\$radio_label_class/g,this.radio_label_class);
		word = word.replace(/\$check_box_class/g,this.check_box_class);
		word = word.replace(/\$select_list_class/g,this.select_list_class);
		word = word.replace(/\$option_list_class/g,this.option_list_class);

// Name specification(possibility of the plural elements)
		word = word.replace(/\$radio_select_mode/g,this.radio_select_mode);
		return word;
	},

	initialize: function() {
		var node = document.getElementsByTagName('body');
		var styles = document.defaultView.getComputedStyle(node[0], null);
		this.property_nums = styles.length;
		var option_list = '';
		for (i = 0; i < styles.length; i++) {
			this.property_names[i] = styles.item(i);
			option_list = option_list + '<option class="$option_list_class" value="'+this.property_names[i]+'">'+this.property_names[i]+'</option>';
		}
		this.html = this.html.replace(/(\$property_option_list)/,function(all, str) { return option_list; });
		this.html = this.replace(this.html);
//LOG.output("html:"+this.html);
		this.style = this.replace(this.style);
//LOG.output("style:"+this.style);
		this.lang = navigator.language;
		this.subwin_style_default = this.subwin_style_default.replace(/\t|^\n/g,"");

		this.output_default_properties_str = this.output_default_properties_str.replace(/\t/g,"");
LOG.output("output_default_properties_str:"+this.output_default_properties_str);
		this.output_default_properties = this.output_default_properties_str.split(",");

	},

	addForm: function() {
		// create a new box for adding form
		var	div = document.createElement('div');
		div.id = this.base_id;
		div.innerHTML = this.html;
		var	style = document.createElement('style');
		style.id = this.base_style_id;
		style.innerHTML = this.style;

		// append above code in original page
		var body = document.getElementsByTagName("body");
		body[0].appendChild(style);
		body[0].appendChild(div);
		$(Form.reset_id).addEventListener("click",Form.Reset,true);
		$(Form.quit_id).addEventListener("click",Form.Quit,true);
		$(Form.save_id).addEventListener("click",Form.Save,true);
		$(Form.show_id).addEventListener("click",Show,true);
		$(Form.help_id).addEventListener("click", function(e){ Form.Help(e); },true);
		$(Form.help_id).addEventListener("mouseover",function(e){ Form.Help_Balloon(e, true);},true);
		$(Form.help_id).addEventListener("mouseout",function(e){ Form.Help_Balloon(e, false);},true);
		$(Form.default_id).addEventListener("click",Form.setDefaultValue,true);
		$(Form.default2_id).addEventListener("click",Form.setDefaultValue,true);
		$(Form.selector_id).addEventListener("click",SelectorID,true);
		$(Form.node_info_id).addEventListener("click",NodeInfo,true);
		$(Form.customize_checkbox_id).addEventListener("click",Customize,true);
		$(Form.attr_selector_id).addEventListener("click",ChangeAttrSelector,true);
		$(Form.computed_style_id).addEventListener("click",ComputedStyle,true);
		$(Form.select_all_id).addEventListener("click",SelectAll,true);
		$(Form.clear_all_id).addEventListener("click",ClearAll,true);

		window.addEventListener("resize", Form.adjust_Form_Position,false);

//		this.getValue();

	},

	delForm: function() {
		var node = $(this.base_id);
		if(node) {
			node.parentNode.removeChild(node);
		}
		node = $(this.base_style_id);
		if(node) {
			node.parentNode.removeChild(node);
		}
		window.removeEventListener("resize", Form.adjust_Form_Position,false);
	},

	outputValues: function() {
		LOG.output("select_mode:"+this.select_mode);
		LOG.output("show_ID_selector:"+this.show_ID_selector);
		LOG.output("show_class_selector:"+this.show_class_selector);
		LOG.output("show_attribute_selector:"+this.show_attribute_selector);
		LOG.output("include_script:"+this.include_script);
		LOG.output("show_node_value:"+this.show_node_value);
		LOG.output("show_comment_node:"+this.show_comment_node);
		LOG.output("show_computed_style:"+this.show_computed_style);
		LOG.output("customize_checkbox:"+this.customize_checkbox);
		LOG.output("subwin_style:"+this.subwin_style);
		if(this.output_property_num) {
			LOG.output("output_properties:"+this.output_properties.join(","));
		}
	},

	setDefaultValue: function() {
LOG.output("Form.setDefaultValue");
		SetCurrentConfDefault();
	},

	getValue: function() {
LOG.output("Form.getValue");
		this.select_mode = GM_getValue(this.select_mode_key, this.select_mode);
		this.show_ID_selector = GM_getValue(this.show_ID_selector_key, this.show_ID_selector);
		this.show_class_selector = GM_getValue(this.show_class_selector_key, this.show_class_selector);
		this.show_attribute_selector = GM_getValue(this.show_attribute_selector_key, this.show_attribute_selector);
		this.include_script = GM_getValue(this.include_script_key, this.include_script);
		this.show_node_value = GM_getValue(this.show_node_value_key, this.show_node_value);
		this.show_comment_node = GM_getValue(this.show_comment_node_key, this.show_comment_node);
		this.show_computed_style = GM_getValue(this.show_computed_style_key, this.show_computed_style);
		this.subwin_style = GM_getValue(this.subwin_style_key, this.subwin_style_default);
		this.customize_checkbox = GM_getValue(this.customize_checkbox_key, this.customize_checkbox);
		var output_properties_str = GM_getValue(this.output_properties_key, "");
		if(output_properties_str) {
			this.output_properties = output_properties_str.split(",");
			this.output_property_num = this.output_properties.length;
		} else {
			this.output_properties = null;
			this.output_property_num = 0;
		}
		this.outputValues();
	},

	setValue: function() {
LOG.output("Form.setValue");
		GM_setValue(this.select_mode_key, this.select_mode);
		GM_setValue(this.show_ID_selector_key, this.show_ID_selector);
		GM_setValue(this.show_class_selector_key, this.show_class_selector);
		GM_setValue(this.show_attribute_selector_key, this.show_attribute_selector);
		GM_setValue(this.include_script_key, this.include_script);
		GM_setValue(this.show_node_value_key, this.show_node_value);
		GM_setValue(this.show_comment_node_key, this.show_comment_node);
		GM_setValue(this.show_computed_style_key, this.show_computed_style);
		GM_setValue(this.subwin_style_key, this.subwin_style);
		GM_setValue(this.customize_checkbox_key, this.customize_checkbox);
		var output_properties_str = '';
		if(this.output_property_num) {
			output_properties_str = this.output_properties.join(',');
		}
		GM_setValue(this.output_properties_key, output_properties_str);
		this.outputValues();
	},

	getFormValue: function() {
		if($(this.node_info_id).checked) {
			this.select_mode = SHOW_NODE_INFO;
		} else {
			this.select_mode = SHOW_SELECTOR;
		}
		if($(this.id_selector_id).checked) {
			this.show_ID_selector = true;
		} else {
			this.show_ID_selector = false;
		}
		if($(this.class_selector_id).checked) {
			this.show_class_selector = true;
		} else {
			this.show_class_selector = false;
		}
		if($(this.attr_selector_id).checked) {
			this.show_attribute_selector = true;
		} else {
			this.show_attribute_selector = false;
		}
		if($(this.include_script_id).checked) {
			this.include_script = true;
		} else {
			this.include_script = false;
		}
		if($(this.node_value_id).checked) {
			this.show_node_value = true;
		} else {
			this.show_node_value = false;
		}
		if($(this.comment_node_id).checked) {
			this.show_comment_node = true;
		} else {
			this.show_comment_node = false;
		}
		if($(this.computed_style_id).checked) {
			this.show_computed_style = true;
		} else {
			this.show_computed_style = false;
		}
		if($(this.customize_checkbox_id).checked) {
			this.customize_checkbox = true;
		} else {
			this.customize_checkbox = false;
		}
		var nodes = QueryOptionList();
		var i, j;
		var	work = Array();
		for(i = j = 0; i < nodes.length; i++) {
			if(nodes[i].selected == true) {
				work[j++] = this.property_names[i];
			}
		}
		if(j) {
			var	output_properties_str = work.join(",");
			this.output_properties = output_properties_str.split(",");
			this.output_property_num = this.output_properties.length;
		} else {
			this.output_properties = null;
			this.output_property_num = 0;
		}
		this.subwin_style = Util.Trim($(this.textarea_id).value);
		this.outputValues();
	},

	checkFormValue: function() {
LOG.output("Form.checkFormValue");
		return true;
	},

	// Open form box
	OpenForm: function() {
LOG.output("div_id: "+this.div_id);
		var div = $(this.div_id);
		var x = this.x;
		var y = this.y;
		div.setAttribute("style",Form.div_style_open+"top:"+y+"px;left:"+x+"px;");
		this.current_mode = 1;
		DnD.initialize(Form.title_id, div);
		DnD.setCallback('stop', Form.adjustPosition);
		this.adjust_Form_Position();
	},

	// Close form box
	CloseForm: function(){
LOG.output("div_id: "+this.div_id);
		var div = $(this.div_id);
		div.setAttribute("style",this.div_style_close);
		this.current_mode = 0;
		DnD.finalize();
	},

	// form opened?
	isFormOpened: function() {
LOG.output("div_id: "+this.div_id);
		var div = $(this.div_id);
		if(!div) return false;
		var style = div.getAttribute("style");
		if(style.match(/display:(\s*)none;/)) {
			return false;
		} else {
			return true;
		}
	},

// Check current mode
	checkCurrentMode: function(mode,false_msg) {
LOG.output("checkCurrentMode current_mode: "+this.current_mode);
LOG.output("checkCurrentMode mode: "+mode);
LOG.output("checkCurrentMode false_msg: "+false_msg);
// modify current mode,sometimes current mode is broken
		if(this.isFormOpened() == true) {
			this.current_mode = 1;
		} else {
			this.current_mode = 0;
		}
		if(this.current_mode == mode) {
			return true;
		} else {
			if(false_msg) {
				if(this.current_mode == 0) {
					window.alert("Form is not opened");
				} else {
					window.alert("Form is already opened");
				}
			}
			return false;
		}
	},

// callback function for drop
	adjustPosition: function(click_obj, drag_obj) {
		var	div = drag_obj;
		var	div_x = div.offsetLeft;
		var	div_y = div.offsetTop;
		var	win_height = window.innerHeight;
		var	win_width = window.innerWidth;
		var	div_height = div.offsetHeight;
		var	div_width = div.offsetWidth;
		var	margin_x = Form.margin_x;
		var	margin_y = Form.margin_y;
		var	adjust = 0;

		if(div_x + div_width + margin_x > win_width) {
			div_x = win_width - div_width - margin_x;
			adjust++;
		}
		if(div_x < margin_x) {
			div_x = margin_x;
			adjust++;
		}
		if(div_y + div_height + margin_y > win_height) {
			div_y = win_height - div_height - margin_y;
			adjust++;
		}
		if(div_y < margin_y) {
			div_y = margin_y;
			adjust++;
		}
		if(adjust) {
			div.style.left = div_x +"px";
			div.style.top = div_y +"px";
		}
		Form.x = div_x;
		Form.y = div_y;
		return;
	},

// Adjust Form Position
	adjust_Form_Position: function(){
		Form.moveForm(0, 0);
//		if(this.current_mode == 1) {
//			var	div = $(this.div_id);
//			div.setAttribute("style",this.div_style_open);
//		}
	},

// Move Form
	moveForm: function(dx, dy){
		var	win_height = window.innerHeight;
		var	win_width = window.innerWidth;
		var	x = this.x;
		var	y = this.y;
		var	div = $(this.div_id);
		var	div_height = div.offsetHeight;
		var	div_width = div.offsetWidth;
		var	margin_x = this.margin_x;
		var	margin_y = this.margin_y;

		x += dx;
		if(x + div_width + margin_x > win_width) {
			x = win_width - div_width - margin_x;
		}
		if(x < margin_x) {
			x = margin_x;
		}
		y += dy;
		if(y + div_height + margin_y > win_height) {
			y = win_height - div_height - margin_y;
		}
		if(y < margin_y) {
			y = margin_y;
		}
		this.x = x;
		this.y = y;
		div.style.left = x +"px";
		div.style.top = y +"px";
	},

// Reset Form
	Reset: function(){
		Form.getValue();
		SetCurrentConf();
	},

// Help
	Help: function(e){
		if(Help.url('mirror') && e.shiftKey) {
			Help.show('mirror');
		} else {
			Help.show('main');
		}
	},

// Balloon of Help
	Help_Balloon: function(e, mode) {
		if(Help.url('mirror')) {
			if(mode == true) {
				Balloon.create(e, Form.div_id, Msg.msg('help'));
			} else {
				Balloon.destroy();
			}
		}

	},


// Quit Form
	Quit: function(){
		var ret = window.confirm('Quit. Are you sure?');
		if(ret == true) {
			Form.CloseForm();
			Form.delForm();
		}
	},

// Save Form
	Save: function(){
		var ret = window.confirm('Save. Are you sure?');
		if(ret == true) {
			ret = Form.checkFormValue();
			if(ret) {
				Form.getFormValue();
				Form.setValue();
				Form.CloseForm();
				Form.delForm();
			}
		}
	}

}


// Main part
LOG.initialize();

Lang.initialize();



window.addEventListener("load",Initialize,false);


function Initialize() {
	Form.initialize();
	Form.getValue();

	GM_registerMenuCommand( "====== Show Node Tree ======", Util.NoOperation);
	GM_registerMenuCommand( "Show Node Tree", Show_Node_Tree);
	GM_registerMenuCommand( "Configure Show Node Tree", Config_Show_Node_Tree);
	GM_registerMenuCommand( "Change log output mode for Show Node Tree", LOG.ChangeLogMode);
}


function Show(){
	Form.getFormValue();
	Show_Node_Tree();
//	Form.CloseForm();
}

function SelectorID(){
	var	div_node = $(Form.div_selector_id);
	var	div_node2 = $(Form.div_style_id);
	div_node.setAttribute('style',Form.div_style_open);
	div_node2.setAttribute('style',Form.div_style_close);
}

function NodeInfo(){
	var	div_node = $(Form.div_selector_id);
	var	div_node2 = $(Form.div_style_id);
	div_node.setAttribute('style',Form.div_style_close);
	div_node2.setAttribute('style',Form.div_style_open);

}

function Customize() {
	var	customize_node = $(Form.customize_checkbox_id);
	var	textarea_node = $(Form.textarea_id);

LOG.output("customize_node.checked:"+customize_node.checked);
	if(customize_node.checked == true) {
		textarea_node.setAttribute('style',Form.div_style_open);
		Form.adjust_Form_Position();
	} else {
		textarea_node.setAttribute('style',Form.div_style_close);
	}
}

function ChangeAttrSelector(){
	var	node = $(Form.span_include_script_id);

	if($(Form.attr_selector_id).checked) {
		node.setAttribute('style',Form.span_style_open);
	} else {
		node.setAttribute('style',Form.span_style_close);
	}

}

function ComputedStyle() {
	var	node = $(Form.div_select_list_id);

	if($(Form.computed_style_id).checked) {
		node.setAttribute('style',Form.div_style_open);
	} else {
		node.setAttribute('style',Form.div_style_close);
	}
}

function QueryOptionList() {
	var query = '//option[@class="'+Form.option_list_class+'"]';
	return xpath(query);
}

function SetAll(flag) {
	var nodes = QueryOptionList();
	var i;
	for(i = 0; i < nodes.length; i++) {
		nodes[i].selected = flag;
	}
}

function SelectAll() {
	SetAll(true);
}

function ClearAll() {
	SetAll(false);
}

// Set current configuration with defualt value
function SetCurrentConfDefault() {
	if($(Form.selector_id).checked == true) {
		$(Form.node_info_id).checked = false;
		SelectorID();
		$(Form.id_selector_id).checked = true;
		$(Form.class_selector_id).checked = true;
		$(Form.attr_selector_id).checked = true;
		$(Form.include_script_id).checked = false;
		$(Form.node_value_id).checked = false;
		$(Form.comment_node_id).checked = false;
		ChangeAttrSelector();
	} else {
		ClearAll();
		var nodes = QueryOptionList();
		var i;
		for(i = 0; i < nodes.length; i++) {
			if(Form.output_default_properties.indexOf(nodes[i].value) >= 0) {
				nodes[i].selected = true;
			}
		}
		ComputedStyle();
	}
	$(Form.textarea_id).value = Form.subwin_style_default;
}

function SetCurrentConf() {
	if(Form.select_mode == SHOW_NODE_INFO) {
		$(Form.node_info_id).checked = true;
		$(Form.selector_id).checked = false;
		NodeInfo();
	} else {
		$(Form.selector_id).checked = true;
		$(Form.node_info_id).checked = false;
		SelectorID();
	}
	if(Form.show_ID_selector == true) {
		$(Form.id_selector_id).checked = true;
	} else {
		$(Form.id_selector_id).checked = false;
	}
	if(Form.show_class_selector == true) {
		$(Form.class_selector_id).checked = true;
	} else {
		$(Form.class_selector_id).checked = false;
	}
	if(Form.show_attribute_selector == true) {
		$(Form.attr_selector_id).checked = true;
	} else {
		$(Form.attr_selector_id).checked = false;
	}
	if(Form.include_script == true) {
		$(Form.include_script_id).checked = true;
	} else {
		$(Form.include_script_id).checked = false;
	}
	if(Form.show_node_value == true) {
		$(Form.node_value_id).checked = true;
	} else {
		$(Form.node_value_id).checked = false;
	}
	if(Form.show_comment_node == true) {
		$(Form.comment_node_id).checked = true;
	} else {
		$(Form.comment_node_id).checked = false;
	}
	ChangeAttrSelector();

	if(Form.show_computed_style == true) {
		$(Form.computed_style_id).checked = true;
	} else {
		$(Form.computed_style_id).checked = false;
	}
	ComputedStyle();
	if(Form.customize_checkbox == true) {
		$(Form.customize_checkbox_id).checked = true;
	} else {
		$(Form.customize_checkbox_id).checked = false;
	}
	Customize();
	$(Form.textarea_id).value = Form.subwin_style;
	if(Form.output_property_num == 0) {
		return;
	}
	var nodes = QueryOptionList();
	var i;
	for(i = 0; i < nodes.length; i++) {
		if(Form.output_properties.indexOf(nodes[i].value) >= 0) {
			nodes[i].selected = true;
		}
	}
}

function Config_Show_Node_Tree() {
	if(!Form.checkCurrentMode(0, true)) return;
	Form.addForm();
	SetCurrentConf();
	Form.OpenForm();
}



function Show_Node_Tree() {
	var	level = 0;
	var	node = document.getElementsByTagName('html');
	var	i;
	var	list = '';

	list = '<style>'+Form.subwin_style + '</style><pre>';
	for(i = 0; i < node.length; i++) {
		if(node[i].parentNode.tagName) {
			continue;
		}
		list = list + Make_Tree(level, node[i], ' ');
	}
	list = list+ "</pre>\n";
	Sub_Win.open();
	Sub_Win.write(list+"\n");
	Sub_Win.close();
}

function Make_Item_Type(list, flag) {
	var tmp = Make_Item(list, flag);
	list =  tmp.substr(0,2) + '<span class="name_style">' + tmp.substr(2) + '</span>';
	return list;
}

function Make_Item_ID(list, flag) {
	var tmp = Make_Item(list, flag);
	list =  '<span class="id_style">' + tmp + '</span>';
	return list;
}

function Make_Item_Class(list, flag) {
	var tmp = Make_Item(list, flag);
	list =  '<span class="class_style">' + tmp + '</span>';
	return list;
}

function Make_Item_Attr(list, flag) {
	var tmp = Make_Item(list, flag);
	list =  '<span class="attr_style">' + tmp + '</span>';
	return list;
}

function Make_Item_Value(list, flag) {
	var tmp = Make_Item(list, flag);
	list =  tmp.substr(0,2) + '<span class="value_style">' + tmp.substr(2,tmp.length-3) + '</span>'+tmp.substr(-1,1);
	return list;
}

function Make_Item_Comment(list, flag) {
	var tmp = Make_Item(list, flag);
	list =  tmp.substr(0,2) + '<span class="comment_style">' + tmp.substr(2,tmp.length-3) + '</span>'+tmp.substr(-1,1);
	return list;
}

function Make_Style_Value(name ,val, flag) {
	var list = " "+ name + ": " + val + ";";
	var tmp = Make_Item(list, flag);
	list = tmp.substr(0,1) + '<span class="computed_style">' + tmp.substr(1) + '</span>';
	return list;
}

function Make_Item(list, flag) {
	list = list.replace(/\</g, '&lt;');
	list = list.replace(/\>/g, '&gt;');
	if(flag & 1) {
		list = list.replace(/\r/g, '\\r');
		list = list.replace(/\n/g, '\\n');
	}
	if(flag & 4) {
		list = '|'+ list;
	} else if(flag & 2) {
		list = '+-'+ list;
	} else if(flag & 8) {
//		list = '('+ list+')';
	} else {
		list = ' '+ list;
	}
	return list;
}

function Make_Level_Indent(level, indent, sibling) {
	var found = 0;
	if(level == 0) {	// top node(perhaps <html>)
		return '';
	}
	while(sibling) {
		if(sibling.nodeType == ELEMENT_NODE ||
		   sibling.nodeType == COMMENT_NODE && 
		   Form.show_comment_node == true) {
			found = 1;
			break;
		}
		sibling = sibling.nextSibling;
	}
	if(found) {
		indent = indent + '| ';
	} else {
		indent = indent + '  ';
	}
	return indent;
}

var	javascript_events = [
	'onclick',
	'ondblclick',
	'onkeydown',
	'onkeypress',
	'onkeyup',
	'onmousedown',
	'onmouseup',
	'onmouseover',
	'onmouseout',
	'onmousemove',
	'onload',
	'onunload',
	'onblur',
	'onsubmit',
	'onreset',
	'onchange',
	'onresize',
	'onmove',
	'ondragdrop',
	'onabort',
	'onerror',
	'onselect'
];

function Is_Javascript_Word(word) {
	var	i;
	for(i = 0; i < javascript_events.length; i++) {
		if(word == javascript_events[i]) {
			return true;
		}
	}
	return false;
}

function Make_Tree(level, node, indent) {

	var	list = '';
	var	style_list = '';
	var	i;
	var	name = node.nodeName;
	var	style;

	if(Form.select_mode == SHOW_SELECTOR) {
		if(node.nodeType == ELEMENT_NODE) {
			name = name.toLowerCase();
		}
	}
	list = indent + Make_Item_Type(name, 2);
	if(node.nodeType == TEXT_NODE) {	// Text
		if(Form.select_mode == SHOW_NODE_INFO) {
			list = list + Make_Item_Value('"' + node.nodeValue + '"', 1);
		} else if(Form.show_node_value == true) {
			list = list + Make_Item_Value(node.nodeValue, 8);
		}
	} else
	if(node.nodeType == COMMENT_NODE) {	// Comment
		if(Form.select_mode == SHOW_NODE_INFO) {
			list = list + Make_Item_Comment('"<!--' + node.nodeValue + '-->"', 1);
		} else if(Form.show_comment_node == true) {
			list = list + Make_Item_Comment('"<!--' + node.nodeValue + '-->"', 0);
		}
	} else
	if(node.nodeType == ATTRIBUTE_NODE) {	// Attribute
		if(Form.select_mode == SHOW_NODE_INFO) {
			list = list + Make_Item_Attr(node.nodeName + '="' + node.nodeValue + '"', 0);
		}
	}else
	if(node.nodeType == ELEMENT_NODE) {	// Element
		var	sub_indent;
		sub_indent = Make_Level_Indent(level+1, indent, node.nextSibling);

		if(Form.select_mode == SHOW_SELECTOR) {
			if(Form.show_ID_selector == true) {
				var id = node.getAttribute('id');
				if(id) {
					list = list + '\n' + sub_indent + Make_Item_ID(name+'#'+id, 8);
				}
			}
			if(Form.show_class_selector == true) {
				var class = node.getAttribute('class');
				if(class) {
					class = class.replace(/ /g, '.');
					list = list + '\n' + sub_indent + Make_Item_Class(name+'.'+class, 8);
				}
			}
			if(Form.show_attribute_selector == true) {
				for(j = 0; j < node.attributes.length; j++) {
					var attribute = node.attributes[j];
					if(Form.include_script == false) {
						if(attribute.nodeValue.match(/javascript:/i)) {
							continue;
						}
						if(Is_Javascript_Word(attribute.nodeName.toLowerCase()) == true) {
							continue;
						}
					}
					list = list + '\n' + sub_indent + Make_Item_Attr(name+'['+attribute.nodeName + '="' + attribute.nodeValue + '"]', 8);
				}
			}
		} else {
			if(Form.show_computed_style == true) {
				style = document.defaultView.getComputedStyle(node, null);
				var name;
				for (i = 0; i < Form.output_property_num; i++) {
					var name = Form.output_properties[i];
					var val = style.getPropertyValue(name);
					style_list = style_list + '\n' + sub_indent + Make_Style_Value(name ,val, 8);
				}
			}
			for(j = 0; j < node.attributes.length; j++) {
				var attribute = node.attributes[j];
//				list = list + ' ' + Make_Item_Attr(attribute.nodeName + '="' + attribute.nodeValue + '"', 0);
				list = list + ' ' + Make_Item_Attr(attribute.nodeName + '="' + attribute.nodeValue + '"', 8);
			}
		}
		if(Form.show_node_value == true && 
		   Form.select_mode == SHOW_SELECTOR) {
			for(j = 0; j < node.childNodes.length; j++) {
				var child = node.childNodes[j];
				if(child.nodeType == TEXT_NODE) {
					var	value = child.nodeValue;
					value = value.replace(/\s/g, '');
					if(value) {
						list = list + '\n' + sub_indent + Make_Item('"' + value + '"', 9);
					}
				}
			}
		}
	}
	if(style_list) {
		list = list + style_list;
	}
	list = list + '\n';
	if(Form.select_mode == SHOW_SELECTOR) {
		if(node.nodeType != ELEMENT_NODE) {
			return list;
		}
	}
	level++;
	indent = Make_Level_Indent(level, indent, node.nextSibling);
	for(i = 0; i < node.childNodes.length; i++) {
		var	child = node.childNodes[i];
		if(Form.select_mode == SHOW_SELECTOR) {
			if(child.nodeType != ELEMENT_NODE &&
			   child.nodeType != COMMENT_NODE) {
				continue;
			}
			if(child.nodeType == COMMENT_NODE && Form.show_comment_node == false) {
				continue;
			}
			list = list + indent + '|' + '\n';
		}
		list = list + Make_Tree(level, child, indent);
	}
	level--;
	return list;
}

function xpath(query) {
	var results = document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = new Array();
	for(var i=0; i<results.snapshotLength; i++){
		nodes.push(results.snapshotItem(i));
	}
	return nodes;
}

})();
