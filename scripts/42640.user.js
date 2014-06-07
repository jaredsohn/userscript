// ==UserScript==
// @name          Show User CSS for Veoh User
// @namespace     http://userscripts.org/users/81100
// @version       1.0
// @description	  Show User Profile CSS and Group CSS code for Veoh User
// @author        chemera
// @homepage      http://www.veoh.com/users/chemera2008
// @include       http://www.veoh.com/users/*
// @include       http://www.veoh.com/myprofile*
// @include       http://jigsaw.w3.org/css-validator/*
// @include       http://www.veoh.com/group/*
// ==/UserScript==

(function() {

var	subwin_name = "user_css_win";
// check the sub window made by my script
var query = '//meta[@name="chemera"]';
var nodes = xpath(query);
if(nodes.length) {
	return;
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

// Help
var Help = {
	site: {
		main: 'http://chemera.coolpage.biz/',
		mirror: 'http://www.chemera.byteact.com/'
	},
	page: {
		en: 'show_user_profile_css.html#form',
		ja: 'show_user_profile_css_j.html#form'
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
}


LOG.initialize();

Lang.initialize();

var	USER_PROFILE = 0;
var	GROUP_PAGE = 1;

if(Href.indexOf('http://jigsaw.w3.org/css-validator/') >=0) {
	if(window.name == 'cssvalidator') {
		CSS_Validator_Task();
	}
} else {
	if(Href.indexOf('http://www.veoh.com/group/') >= 0) {
		page_type = GROUP_PAGE;
	} else {
		page_type = USER_PROFILE;
	}
	Veoh_Profile_Task();
}


function CSS_Validator_Task() {
	var css = GM_getValue("user_css",'');
LOG.output("CSS_Validator_Task");
LOG.output("css:"+css);
	if(!css) {
		return;
	}
	var textarea = document.getElementsByTagName("textarea");
	textarea[0].value = css;

	GM_setValue("user_css",'');
}


function Veoh_Profile_Task() {
	GM_registerMenuCommand( "====== Show User Profile CSS ======", Util.NoOperation);
	GM_registerMenuCommand( "Show formatted User/Group CSS", ShowFormattedCSS);
	GM_registerMenuCommand( "Show unformatted User/Group CSS", ShowUnformattedCSS);
	GM_registerMenuCommand( "Visit W3C CSS Validation Service", Visit_CSS_Varidation_Service);
	GM_registerMenuCommand( "Check CSS Validation", CSS_Varidation);
	if(Help.url('main')) {
		GM_registerMenuCommand( "Show Help Page(main site)", function() {Help.show('main');});
	}
	if(Help.url('mirror')) {
		GM_registerMenuCommand( "Show Help Page(mirror site)", function() {Help.show('mirror');});
	}
	GM_registerMenuCommand( "Change log output mode for Show User CSS", LOG.ChangeLogMode);

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

function GetUserCSS(format) {

	var nodes = xpath('//style[@media="screen"]');
	if(nodes.length == 0) return '';
LOG.output("nodes[0].textContent:"+nodes[0].textContent);
	var val = nodes[0].textContent.split('\n');

LOG.output("val.length:"+val.length);
	var found = true;
	var css = '';
	for(var i = 0; i < val.length; i++) {
		if(val[i] == '<!--') {
			found = 1;
			continue;
		}
		if(val[i] == '-->') {
			found = 0;
			continue;
		}
		if(found) {
			css = css + val[i] + '\n';
		}
	}
	if(css == '') return '';
LOG.output("css:"+css);
	if(format == true) {
		css = css.replace(/\*\//mg, '\*\/\n');	// Comment
		css = css.replace(/{/mg, '{\n');	// Left curly brace
		css = css.replace(/}/mg, '}\n\n');	// Right curly brace
		css = css.replace(/,/mg, ',\n');	// Comma
		css = css.replace(/;/mg, ';\n');	// Semi-colon
		css = css.replace(/&amp;\n/mg, '&amp;');	// &
		css = css.replace(/&gt;\n/mg, '&gt;');	// >
		css = css.replace(/&lt;\n/mg, '&lt;');	// <
		css = css.replace(/^ */mg, '');	// Space of the line top
		css = css.replace(/\n\n/mg, '\n');	// double CRLF to single
		css = css.replace(/}/mg, '}\n');	// Add CRLF after right curly brace
	}
LOG.output("css:"+css);
	return (css);

}

function ShowCSS(css) {
	css = '<pre>'+css+'</pre>';
LOG.output("css:"+css);
	Sub_Win.open();
	Sub_Win.write(css);
	Sub_Win.close();
}

function ShowUserCSS(format) {
	var	css;
	css = GetUserCSS(format);
	if(!css) {
		window.alert("User CSS is not found");
		return;
	}
	if(page_type == USER_PROFILE) {
		css = css.replace(/#veohPage/mg, '<b>#veohPage</b>');
	}
	ShowCSS(css);
}

function ShowUnformattedCSS() {
	ShowUserCSS(false);
}

function ShowFormattedCSS() {
	ShowUserCSS(true);
}

function Visit_CSS_Varidation_Service() {
	var win = window.open("http://jigsaw.w3.org/css-validator/#validate_by_input","cssvalidator","");
}

function CSS_Varidation() {
	var css = GetUserCSS();
	if(!css) {
		window.alert("User CSS is not found");
		return;
	}
	GM_setValue("user_css",css);
	Visit_CSS_Varidation_Service();
}


})();
