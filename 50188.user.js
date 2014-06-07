// ==UserScript==
// @name           Change style of video infomation boxes for VReel
// @namespace      http://userscripts.org/users/81100
// @version        0.9
// @description    Change style of video information boxes including thumbnail,title and description for VReel
// @homepage       http://beta.vreel.net/profile_2705.html
// @include        http://beta.vreel.net/*
// ==/UserScript==
(function() {

const overflow_hidden = 'hidden';
const overflow_auto = 'auto';
const overflow_scroll = 'scroll';
const overflow_visible = '';

const ELEMENT_NODE = 1	// Element
const ATTRIBUTE_NODE = 2	// Attribute
const TEXT_NODE = 3	// Text
const COMMENT_NODE = 8	// Comment

function $(id) {
	return document.getElementById(id);
}

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

// window.location.href utility
var	Href = {
	indexOf: function(url) {
		return window.location.href.indexOf(url);
	},

	match: function(regexp) {
		return window.location.href.match(regexp);
	},

	equal: function(url) {
		return (window.location.href == url);
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
		en: 'vreel_change_video_information_box.html#form',
		ja: 'vreel_change_video_information_box_j.html#form'
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

var	suffix = "_for_ChangeStyleVideoInfoBoxesVReel";
var Form = {
// properties
	margin_x: 20,	// 20 pixel
	margin_y: 20,	// 20 pixel
	x: 0,
	y: 0,
	current_mode: 0,
	title_str: '',
	box_id: '',
	default_height: 200,	// 200px
	default_width: 160,	// 160px
	default_overflow: '',	// i.e. visible
	height: 200,
	width: 160,
	overflow: '',
	mypage: 0,
	channel: 0,
	height_key: 'height',
	width_key: 'width',
	overflow_key: 'overflow',
	auto_key: 'auto',
	query: '',
	auto: true,

// IDs
	base_id: "gm_base" + suffix,
	base_style_id: "gm_base_style" + suffix,
	div_id: "gm_div" + suffix,
	title_id: "gm_title" + suffix,
	command_id: "gm_command" + suffix,
	overflow_id: "gm_overflow" + suffix,
	config_id: "gm_config" + suffix,
	reset_id: "gm_reset_button" + suffix,
	save_id: "gm_save_button" + suffix,
	quit_id: "gm_quit_button" + suffix,
	help_id: "gm_help_button" + suffix,
	preview_id: "gm_preview_button" + suffix,
	default_height_id: "gm_default_height_button" + suffix,
	default_width_id: "gm_default_width_button" + suffix,
	height_id: "gm_height" + suffix,
	width_id: "gm_width" + suffix,
	visible_id: "gm_overflow_visible" + suffix,
	hidden_id: "gm_overflow_hidden" + suffix,
	scroll_id: "gm_overflow_scroll" + suffix,
	auto_id: "gm_overflow_auto" + suffix,
	auto_height_id: "gm_auto_height" + suffix,
	default_height_val_id: "gm_default_height_val" + suffix,
	default_width_val_id: "gm_default_width_val" + suffix,

// Classes
	label_class: "gm_label" + suffix,
	button_class: "gm_button" + suffix,
	radio_button_class: "gm_radio_button" + suffix,
	radio_label_class: "gm_radio_label" + suffix,
	check_box_class: "gm_check_box" + suffix,
	text_box_class: "gm_text_box" + suffix,

// Names
	radio_customize_type: "$radio_customize_type" + suffix,


// Styles
	div_style_close: 'display:none;',
	div_style_open: 'display:block;',

	style: <><![CDATA[
	#$base_id div { min-width:100px; }
	#$div_id { width:400px;z-index:200000;border: 6px ridge gray;position:fixed;top:20px;left:20px;background-color:#DDDDDD;font-weight: bold;text-align:left;color:#000000; }
	#$title_id { height:48px;font-weight:bold;text-align:center;padding-top:6px;color:#FFFFFF;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAABCAYAAAAo/lyUAAAD5UlEQVQ4jVXD51vVZRwH4F6XmqmlqZWaMkSmAkc2CqjIkiHCYQvKhsPe+7DPgcPecNggspcyBASB0rTUcpVSppaWf8KnF9/n8ep3X9f90ccHQ/H/nxwKE9ykEo5NKuHYrMpHYLNqBLaoseqR2KIeiU/ZrYejsFWDfqYRTY/QbZoSbNOUYDuvFYPtWjHYoc3HYod2LD7XoV/oxFFdulMvHjv14rFLL4EepV8eSxTcrZ+E3fpJ2GPAJ2OPQTL2GrKiFOwVpeArUQq+Pp5Kjeg3RmnUmO4zTsc+43TsN2FNM7DfNAMHeLNMHDDLxLfm9KB5FrXIxkGLbByypCqWOfQEVT2ZK6hmlQc1qzyoW/NSqFtLcdiGPZUPDfbI6QJBzTOF1JZq2RZBy7YI2mdZu2Jo2xVDh9W1L6EOpdB1KIUe7yiDnqMMR53oMSc5PUf1ncsEDVzKYeBSDkPeVQFDVwVEbgqI3CogcqvA8fPUyL1S0PhCFfWgJh7VMPGohqknK66BqbgGZuJamIlrYe7FetfB3LsOFrxPPSx86mHpS0/4NlA/etKvkfpTq4AmWAU0wZq/2AybQL4FNoEtOBVET19qFTxzuY0GU9tgJWyDlTgb0k5DqV1oB+xCO2AfxnfCPqwTDuFsRBccIrrgyDpFdtMoei6qh0ZTZ0kvnCW9cJH0wiWmDy4xfXCN5fvhGtsPtzh6Pv6KoHvCANwTBnAh8aqgR9KgoGfyEDyThyBO4YchThmGVyqbNgKvtBF4sz7pozSD+maM0cwx+GWNwy9rHP589gT8sycQkMNPIiBnEhdzaWDuFM2jQdJpBEmncUl6jebTywXXBYMLZxBcOIOQIn4WIUWzCC1mS+YQWjKHMDa8dJ7KaITsBiLkNFK+gEj5AqLK2PJFRJUvIppXLCFasQRJBY2puEkrlxFTuYzYKhpXtUKraXzNLcGE2lUk1K4isY5fQ2LdGpLq2YZ1JDWsI5lNafzuw9Sm72kzTWu+jbTm20hvYVvvIL31DjLYzLYfqPIuMpV3kcW330NW+z1kd9Ccjh9pJ83t+kkwr/s+8rrvQ8r3PIC05wHye/mHyO99iII+Wtj/84dFV36hA7R44BGKBx6h5Co7+Bglg49ROvgEpYNPIBtih59CNvwUcn7kGeQjz1A2SstHf6VjVDH2Gx2nFRPPUTHxHJX85AtUTr5A1RS/gaqpDVRPb6Dm2u+Ctdf/oDO0buYl6mZeon72TzpHG+ZeoWHuFRrn+ddonH+Nphvswhs0LbxBM9uy+Bddoq1Lf9ObtG35LdqW30LJr7yDcuUd2m/x/6BjlXau/SvYtf4eXevv8R9oSdOXWPZTjQAAAABJRU5ErkJggg==");cursor:-moz-grab; }
	#$command_id { height:32px; font-weight: bold;text-align:center;color:#FFFFFF;background-color: transparent; }
	#$overflow_id { height:24px; text-align:left;}
	#$config_id { height:82px; text-align:left;}
	#$reset_id { }
	#$save_id { }
	#$quit_id { }
	#$help_id { }
	#$preview_id{width:60px;}
	.$button_class { color:buttontext;background-color:buttonface;height:24px;border:2px outset buttonface;margin:4px 4px 4px 20px;background-image:none;width:48px;}
	.$button_class:hover { cursor:pointer; }
	.$label_class { vertical-align:middle;height:32px;padding-left:10px; padding-bottom: 6px;}
	.$radio_label_class { color: #000000; }
	.$radio_button_class { height:14px;width:14px;margin:4px 0px 0px 10px;vertical-align:bottom; }
	.$text_box_class { width:40px;padding-left:4px;margin-left:16px;height:16px;margin-top:4px;margin-bottom:4px;background-color:#FFFFFF;border:2px inset; }
	#$visible_id { }
	#$auto_id { }
	#$scroll_id { }
	#$auto_height_id { margin: 4px 0 0 10px; }
	#$height_id { position: relative; top: 0px; left: 0px; }
	#$width_id { position: relative; top: 0px; left: 4px; }
	#$default_height_id { position: relative; top: 0px; left: 0px; margin-left: 10px;}
	#$default_width_id { position: relative; top: 0px; left: 4px; margin-left: 10px;}
	#$default_height_val_id { position: relative; top: 0px; left: 0px; padding-left: 4px;}
	#$default_width_val_id { position: relative; top: 0px; left: 4px; padding-left: 4px;}
	]]></>+"",

// Form HTML
	html: <><![CDATA[
	<div id="$div_id" style="display: none;"> 
	<div id="$title_id">Change Style of Video Infomation boxes
	<div id="$command_id"> 
	<input id="$reset_id" type="button" class="$button_class" value="Reset" /> 
	<input id="$save_id" type="button" class="$button_class" value="Save" /> 
	<input id="$quit_id" type="button" class="$button_class" value="Quit" /> 
	<input id="$preview_id" type="button" class="$button_class" value="Preview" />
	<input id="$help_id" type="button" class="$button_class" value="Help" />
	</div>
	</div>
	<div id="$overflow_id">
	<span class="$label_class">Overflow:</span>
	<input id="$visible_id" name="$radio_customize_type" type="radio" class="$radio_button_class" checked /> 
	<span class="$radio_label_class">Visible(default)</span> 
	<input id="$auto_id" name="$radio_customize_type" type="radio" class="$radio_button_class" /> 
	<span class="$radio_label_class">Auto</span> 
	<input id="$scroll_id" name="$radio_customize_type" type="radio" class="$radio_button_class" />
	<span class="$radio_label_class">Scroll</span> 
	<input id="$hidden_id" name="$radio_customize_type" type="radio" class="$radio_button_class" /> 
	<span class="$radio_label_class">Hidden</span> 
	</div>
	<hr /> 
	<div id="$config_id">
	<span class="$label_class">Height:</span> 
	<input id="$height_id" type="text" class="$text_box_class" value="" /> 
	<input id="$default_height_id" type="button" class="$button_class" value="Default" />
	<span id="$default_height_val_id" class="$label_class"></span> 
	<br /> 
	<span class="$label_class">Width:</span> 
	<input id="$width_id" type="text" class="$text_box_class" value="" /> 
	<input id="$default_width_id" type="button" class="$button_class" value="Default" /> 
	<span id="$default_width_val_id" class="$label_class"></span> 
	</div>
	</div> 
	]]></>+"",

// functions
//// replace function replaces reserved word real value.
	replace: function(word) {
// ID specification(possibility of the plural elements in the style)
		word = word.replace(/\$base_id/g,this.base_id);
		word = word.replace(/\$div_id/g,this.div_id);
		word = word.replace(/\$title_id/g,this.title_id);
		word = word.replace(/\$command_id/g,this.command_id);
		word = word.replace(/\$overflow_id/g,this.overflow_id);
		word = word.replace(/\$config_id/g,this.config_id);
		word = word.replace(/\$reset_id/g,this.reset_id);
		word = word.replace(/\$save_id/g,this.save_id);
		word = word.replace(/\$quit_id/g,this.quit_id);
		word = word.replace(/\$help_id/g,this.help_id);
		word = word.replace(/\$preview_id/g,this.preview_id);
//		word = word.replace(/\$auto_height_id/g,this.auto_height_id);
		word = word.replace(/\$height_id/g,this.height_id);
		word = word.replace(/\$width_id/g,this.width_id);
		word = word.replace(/\$default_height_id/g,this.default_height_id);
		word = word.replace(/\$default_width_id/g,this.default_width_id);
		word = word.replace(/\$default_height_val_id/g,this.default_height_val_id);
		word = word.replace(/\$default_width_val_id/g,this.default_width_val_id);
		word = word.replace(/\$visible_id/g,this.visible_id);
		word = word.replace(/\$hidden_id/g,this.hidden_id);
		word = word.replace(/\$scroll_id/g,this.scroll_id);
		word = word.replace(/\$auto_id/g,this.auto_id);

// Class specification(possibility of the plural elements)
		word = word.replace(/\$label_class/g,this.label_class);
		word = word.replace(/\$button_class/g,this.button_class);
		word = word.replace(/\$radio_button_class/g,this.radio_button_class);
		word = word.replace(/\$radio_label_class/g,this.radio_label_class);
		word = word.replace(/\$check_box_class/g,this.check_box_class);
		word = word.replace(/\$text_box_class/g,this.text_box_class);

// Name specification(possibility of the plural elements)
		word = word.replace(/\$radio_customize_type/g,this.radio_customize_type);
		return word;
	},

	initialize: function(height,width,mypage, channel, title_str, query) {
LOG.output("Form.initialize");
		this.default_height = height;
		this.default_width = width;
		this.height = height;
		this.width = width;
		this.mypage = mypage;
		this.channel = channel;
		this.title_str = title_str;
		this.query = query;

LOG.output("this.height:"+this.height);
LOG.output("this.width:"+this.width);
LOG.output("this.mypage:"+this.mypage);
LOG.output("this.channel:"+this.channel);
LOG.output("this.title_str:"+this.title_str);
LOG.output("this.query:"+this.query);

		this.height_key = this.getKey("height");
		this.width_key = this.getKey("width");
		this.overflow_key = this.getKey("overflow");
		this.auto_key = this.getKey("auto");


		this.html = this.replace(this.html);
//LOG.output(this.html);
		this.style = this.replace(this.style);
//LOG.output(this.style);
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
		$(Form.help_id).addEventListener("click", function(e){ Form.Help(e); },true);
		$(Form.help_id).addEventListener("mouseover",function(e){ Form.Help_Balloon(e, true);},true);
		$(Form.help_id).addEventListener("mouseout",function(e){ Form.Help_Balloon(e, false);},true);
		$(Form.preview_id).addEventListener("click",Preview,true);
		$(Form.save_id).addEventListener("click",Form.Save,true);
		$(Form.default_height_id).addEventListener("click",DefaultHeight,true);
		$(Form.default_width_id).addEventListener("click",DefaultWidth,true);

		window.addEventListener("resize", Form.adjust_Form_Position,false);

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
		LOG.output("height:"+this.height);
		LOG.output("width:"+this.width);
		LOG.output("overflow:"+this.overflow);
	},

	outputKey: function() {
		LOG.output("height_key:"+this.height_key);
		LOG.output("width_key:"+this.width_key);
		LOG.output("overflow_key:"+this.overflow_key);
	},

	getKey: function(key) {
LOG.output("getKey key:"+key);
LOG.output("this.mypage:"+this.mypage);
LOG.output("this.channel:"+this.channel);
		if(this.mypage == 1) {
			key = "my_"+key;
		} else if(this.mypage == 2) {
			key = "mye_"+key;
		} else if(this.channel) {
			key = "ch_"+key;
		}
LOG.output("getKey return key:"+key);
		return key;
	},

	getValue: function() {
LOG.output("Form.getValue");
		this.outputKey();
		this.height = GM_getValue(this.height_key, this.height);
		this.width = GM_getValue(this.width_key, this.width);
		this.overflow = GM_getValue(this.overflow_key,this.overflow);
		this.auto = GM_getValue(this.auto_key,this.auto);
		this.outputValues();
	},

	setValue: function() {
LOG.output("Form.setValue");
		this.outputKey();
		GM_setValue(this.height_key, this.height);
		GM_setValue(this.width_key, this.width);
		GM_setValue(this.overflow_key, this.overflow);
		GM_setValue(this.auto_key, this.auto);
		this.outputValues();
	},

	getFormValue: function() {
LOG.output("Form.getFormValue");
		if($(this.hidden_id).checked) {
			this.overflow = overflow_hidden;
		} else 
		if($(this.auto_id).checked) {
			this.overflow = overflow_auto;
		} else 
		if($(this.scroll_id).checked) {
			this.overflow = overflow_scroll;
		} else {
			this.overflow = overflow_visible;
		}
//		this.auto = $(this.auto_height_id).checked;
		this.height = Util.Trim($(this.height_id).value);
		this.width = Util.Trim($(this.width_id).value);
		this.outputValues();
	},

	checkFormValue: function() {
LOG.output("Form.checkFormValue");
		if(!$(this.visible_id).checked &&
		   !$(this.hidden_id).checked &&
		   !$(this.scroll_id).checked &&
		   !$(this.auto_id).checked) {
			window.alert("Overflow selection error");
			return false;
		}
		if(Util.Trim($(this.height_id).value) == '') {
			window.alert("Height is empty");
			return false;
		}
		if(Util.Trim($(this.width_id).value) == '') {
			window.alert("Width is empty");
			return false;
		}
		return true;
	},

	// Open form box
	openForm: function() {
		var div = $(this.div_id);
		var x = this.x;
		var y = this.y;
		div.setAttribute("style",Form.div_style_open+"top:"+y+"px;left:"+x+"px;");
		DnD.initialize(Form.title_id, div);
//		DnD.setCallback('dragging', Form.setPosition);
		DnD.setCallback('stop', Form.adjustPosition);
		this.current_mode = 1;
		this.adjust_Form_Position();
	},

	// Close form box
	closeForm: function(){
		var div = $(this.div_id);
		div.setAttribute("style",this.div_style_close);
		this.current_mode = 0;
		DnD.finalize();
	},

	// form opened?
	isFormOpened: function() {
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

// callback function for dragging
	setPosition: function(click_obj, drag_obj) {
		Form.x = drag_obj.offsetLeft;
		Form.y = drag_obj.offsetTop;
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
		if(this.current_mode == 1) {
			div.setAttribute("style",this.div_style_open+"top:"+y+"px;left:"+x+"px;");
		}
	},

// Reset Form
	Reset: function(){
		Form.getValue();
		SetCurrentConf();
	},

// Save configration and CSS
	Save: function(){
		var ret = window.confirm('Save. Are you sure?');
		if(ret) {
			ret = Form.checkFormValue();
			if(ret) {
				Form.getFormValue();
				Form.setValue();
				ChangeThumbnailStyle();
				Form.closeForm();
				Form.delForm();
			}
		}
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

// Quit configration and CSS without saving
	Quit: function(){
		var ret = window.confirm('Quit. Are you sure?');
		if(ret == true) {
			Form.getValue();
			ChangeThumbnailStyle();
			Form.closeForm();
			Form.delForm();
		}
	}

}


// Main routine
LOG.initialize();

Lang.initialize();

var	xpq;
if(Href.indexOf('http://beta.vreel.net/index.php?q=mye') >=0 ||
   Href.equal('http://beta.vreel.net/?q=mye')) {
	xpq = '//tr/td[2]/div';
	Form.initialize(58, 313, 2, 0, "My Videos", xpq);
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=my') >=0) {
	xpq = '//div[@id="vid"]';
	Form.initialize(200, 160, 1, 0, "My Profile", xpq);
} else if(Href.indexOf('http://beta.vreel.net/profile_') >=0 ||
	  Href.indexOf('http://beta.vreel.net/index.php?q=profile') >=0) {
	xpq = '//div[@id="vid"]';
	Form.initialize(280, 160, 0, 0, "profile", xpq);
} else if(Href.indexOf('http://beta.vreel.net/index.php?q=channels') >=0) {
	xpq = '//div[@id="block"]';
	Form.initialize(200, 167, 0, 1, "channels", xpq);
} else {
	return;
}


Initialize();


function	Initialize() {
	Form.getValue();

	ChangeThumbnailStyle();

	GM_registerMenuCommand( "======  Change style of video information boxes for VReel ======", Util.NoOperation);
	GM_registerMenuCommand( "Configure style of video information boxes", Configuration);
	GM_registerMenuCommand( "Change log output mode for Change style of video information boxes for VReel", LOG.ChangeLogMode);
}

// Preview Page
function Preview(){
	Form.getFormValue();
	ChangeThumbnailStyle();
}

function HeightSumOfChilds(parent) {
	var	childs = parent.childNodes;
	var	height = 0;
	for(var i = 0; i < childs.length; i++) {
		if(childs[i].nodeType == ELEMENT_NODE) {
			if(childs[i].tagName.toUpperCase() == 'A') {
				height += childs[i].firstChild.offsetHeight;
			} else {
				height += childs[i].offsetHeight;
			}
		}
	}
	if(height < Form.default_height) {
		height = Form.default_height;
	}
	return height;
}

function ChangeThumbnailStyle() {

	var	work, i, j;
	var	maxheight = 0;

	work = xpath(Form.query);

	if(Form.auto == true) {
		for(i = 0; i < work.length; i+=3) {
			maxheight = 0;
			for(j = 0; j < 3 && i+j < work.length; j++) {
				var height = HeightSumOfChilds(work[i+j]);
				if(height > maxheight) maxheight = height;
			}
			for(j = 0; j < 3 && i+j < work.length; j++) {
				work[i+j].style.height = maxheight+"px";
			}
		}
	} else {
		for(i = 0; i < work.length; i++) {
			work[i].style.overflow = Form.overflow;
			if(Form.height == '') {
				work[i].style.height = "";
			} else {
				work[i].style.height = Form.height+"px";
			}
			work[i].style.width = Form.width+"px";
		}
	}

}

function DefaultHeight() {
	$(Form.height_id).value = Form.default_height;
}

function DefaultWidth() {
	$(Form.width_id).value = Form.default_width;
}

// Set current configuration
function SetCurrentConf() {
	$(Form.title_id).firstChild.nodeValue = 'Change Style of Video Infomation boxes('+Form.title_str+' page)';
	if(Form.overflow == overflow_hidden) {
		$(Form.hidden_id).checked = true;
	} else
	if(Form.overflow == overflow_auto) {
		$(Form.auto_id).checked = true;
	} else
	if(Form.overflow == overflow_scroll) {
		$(Form.scroll_id).checked = true;
	} else {
		$(Form.visible_id).checked = true;
	}
//	$(Form.auto_height_id).checked = Form.auto;
	$(Form.height_id).value = Form.height;
	$(Form.width_id).value = Form.width;
	$(Form.default_height_val_id).textContent = '('+Form.default_height+')';
	$(Form.default_width_val_id).textContent = '('+Form.default_width+')';
}

// Configuration styles
function Configuration() {
	if(!Form.checkCurrentMode(0, true)) return;
	Form.addForm();
	SetCurrentConf();
	Form.openForm();
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

