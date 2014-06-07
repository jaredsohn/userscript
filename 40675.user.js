// ==UserScript==
// @name           Adds a link to download video for VReel
// @namespace      http://userscripts.org/users/76078
// @version        1.11.2
// @description    Adds a link to download video for VReel User
// @include        http://beta.vreel.net/*
// ==/UserScript==
(function() {

// for update check
const THIS_SCRIPT_NO = '40675';
const THIS_URL = 'http://userscripts.org/scripts/show/'+THIS_SCRIPT_NO;
const THIS_VER = '1.11.2';
const MSGBOX_ID = "USO_USER_SCRIPT_UPDATE_CHECK_"+THIS_SCRIPT_NO

const NO_CHECK = 0;
const EVERY_LOADING = 1;
const ONCE_A_DAY = 2;
const ONCE_A_WEEK = 3;
const ONCE_A_MONTH = 4;

// option of 'Once a week' mode
const ANY_DAY = -1;		// on the first loading of a week
const SUNDAY = 0;
const MONDAY = 1;
const TUESDAY = 2;
const WEDNESDAY = 3;
const THURSDAY = 4;
const FRIDAY = 5;
const SATURDAY = 6;


var update_check = {
	type: ONCE_A_WEEK,
	last_check_date: 0,
	specified_day: ANY_DAY,
};


const	TEXT_TYPE = 0;
const	IMAGE_TYPE = 1;

// for player size
const	MIN_WIDTH = 128;	// 640/5
const	MIN_HEIGHT = 96;	// 480/5
const	MAX_WIDTH = 2560;	// 640*4
const	MAX_HEIGHT = 1920;	// 480*4
const	DEFAULT_PLAYER_WIDTH = 710;	//original value is 710
const	DEFAULT_PLAYER_HEIGHT = 405;	// original value is 405

// for script control
const WAITING = -1;
const NONE = 0;
const SENT_REQUEST = 1;
const RECEIVED_RESPONSE = 2;
const STORED_DATA = 3;
const NOT_RECEIVED = 4;

const MAX_SEND_REQUEST = 10;		// up to 10 http request at the same time
const QUEUE_CHECK_INTERVAL = 5*1000;	// 5 sec.
const QUEUE_CHECK_INTERVAL_DONE = 10*1000;	// 10 sec.
const MAX_WAIT_LIMIT = 120*1000;	// 120 sec
const MAX_RETRY = 3;			// 3 times
const PROCESSING_THRESHOLD = 20;	// up to 20 videos

const MIN_INTERVAL = 3;
const MIN_MAX_SEND = 1;
const MIN_MAX_WAIT = 30;
const MIN_MAX_RETRY = 0;
const MAX_INTERVAL = 60;
const MAX_MAX_SEND = 25;
const MAX_MAX_WAIT = 300;
const MAX_MAX_RETRY = 10;

var current_request_num = 0;
var total_queue_num = 0;
var last_done_num = 0;
var retry_count = 0;
var check_interval = 0;

var queue = new Array(0);
var pidmap = new Array(0);

var button_style = 'color:#FFFFFF;background-color:#008888;font-weight:bold;cursor:pointer;';

// for watch page
var download_url;
var download_url_prev;
var preview_image_url;
var preview_image_url_prev;

// for list page
var need_information = false;
var need_name = false;
var need_length = false;
var need_views = false;
var need_addedDate = false;
var cols_per_row = 0;

// You can customize initial value.
const SETUP_VERSION = 3;
var custom = {
	setup_version: 0,
	player: {	// video panel
		autoplay: true,	// true or false
		auto_resize: false,	// true or false
		player_height: DEFAULT_PLAYER_HEIGHT,	// pixel value
		player_width: DEFAULT_PLAYER_WIDTH,	// pixel value
		min_height: MIN_HEIGHT,	// pixel value, minimum height of resizing
		min_width: MIN_WIDTH,	// pixel value, minimum width of resizing
		max_height: 768,	// pixel value, maximum height of resizing
		max_width: 1024,	// pixel value, maximum width of resizing
		lock_ratio: true,	// true only
		fit_aspect_ratio: false,	// true or false
		top: 'center',	// pixel value or 'center'
		left: 'center',	// pixel value or 'center'
		download_link: true,
		download_link_text: "Download Video",
	},
	extention: '.avi',		// '.avi' or '.divx'
	list: {
		download_link: true,
		watch_button: true,
		username: true,
		duration: true,
		resolution: true,
		views: true,
		added_date: false,	// if ne.edgecastcdn.net,it will be needed RefControl etc.
		video_size: false,	// if ne.edgecastcdn.net,it will be needed RefControl etc. not supported now.
		download_link_text: "Download",
		watch_button_text: 'Watch Video',
	},
	watch: {
		autoplay: true,	// true or false
		video_size: false,	// if ne.edgecastcdn.net,it will be needed RefControl etc.
		added_date: false,	// if ne.edgecastcdn.net,it will be needed RefControl etc.
		download_link: true,
		download_link_text: "DOWNLOAD VIDEO",
	},
	queue: {
		check_interval: QUEUE_CHECK_INTERVAL,
		check_interval_done: QUEUE_CHECK_INTERVAL_DONE,
		max_send_request: MAX_SEND_REQUEST,
		max_wait_limit: MAX_WAIT_LIMIT,
		max_retry: MAX_RETRY,
		threshold: PROCESSING_THRESHOLD,
	},
	style: {
		list: {
			base: {
				text_color: "",
				bg_color: "transparent",
				bg_image: "",
				font_size: "1em",
				font_weight: "",
				others: "",
			},
			download: {
				text_color: "#02B4F9",
				bg_color: "",
				bg_image: "",
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			name: {
				text_color: '#FFFF00',
				bg_color: '',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			meta: {
				text_color: "#00FF00",
				bg_color: "",
				bg_image: "",
				font_size: "1em",
				font_weight: "",
				others: "",
			},
			watch_button: {
				text_color: "#FFFFFF",
				bg_color: "#008888",
				bg_image: "",
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			wait: {
				text_color: "#FF0000",
				bg_color: "",
				bg_image: "",
				font_size: "1em",
				font_weight: "",
				others: "",
			},
			error: {
				text_color: "#FF0000",
				bg_color: "#FFFFFF",
				bg_image: "",
				font_size: "1em",
				font_weight: "bold",
				others: "",
			}
		},
		watch: {
			base: {
				text_color: "",
				bg_color: "transparent",
				bg_image: "",
				font_size: "1em",
				font_weight: "",
				others: "",
			},
			download: {
				text_color: '',
				bg_color: 'transparent',
				bg_image: 'none',
				font_size: "",
				font_weight: "",
				others: "",
			},
			anchor: {
				text_color: '#FFFFFF',
				bg_color: '#02B4F9',
				bg_image: '',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
		},
		video_panel: {
			base: {
				text_color: "",
				bg_color: "rgba(0,0,0,0.9)",
				bg_image: "",
				font_size: "1.0em",
				font_weight: "",
				others: "",
			},
			title: {
				text_color: '#FFFFFF',
				bg_color: 'transparent',
				bg_image: 'none',
				font_size: "14px",
				font_weight: "bold",
				others: "",
			},
			download: {
				text_color: '#FFFFFF',
				bg_color: '#008888',
				bg_image: 'none',
				font_size: "",
				font_weight: "",
				others: "",
			},
			anchor: {
				text_color: '#FFFFFF',
				bg_color: '#008888',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			lock: {
				text_color: '#FFFFFF',
				bg_color: '#008888',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			close: {
				text_color: '#FFFFFF',
				bg_color: '#008888',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			lock_ratio: {
				text_color: '',
				bg_color: '',
				bg_image: 'none',
				font_size: "",
				font_weight: "",
				others: "",
			},
			lock_ratio_label: {
				text_color: '#FFFFFF',
				bg_color: '',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			status_bar: {
				text_color: '#FFFF00',
				bg_color: '#202020',
				bg_image: 'none',
				font_size: "",
				font_weight: "",
				others: "",
			},
			resize: {
				text_color: '',
				bg_color: '',
				bg_image: '',
				font_size: "",
				font_weight: "",
				others: "",
			},
		},
	},
};

// for watch pages
var added_box_watch = {
	base: {
		id: 'AddsALinkDownloadBase',
		style: 'margin:6px 0px 10px 0px;',
	},
	// meta data in watch pages
	meta: {
		size_id: 'AddsALinkVideoSize',
		added_id: 'AddsALinkAddedDate'
	},


	// for the video download button
	download: {
		div_id: 'AddsALinkDownloadBox',
		div_styled: '',
		anchor_id: 'AddsALinkDownloadURL',
		anchor_style: 'margin-left: 10px;'
	},

};

// for open/close a box
var styles = {
	open: 'display:inline;',
	block_open: 'display:block;',
	close: 'display:none;'
};

//// for video list
// added box for the checkbox and the download link
var added_box = {
	base: {
		id: 'AddsALinkBase_',
		style: 'float:left;'
	},
	download: {
		id: 'AddsALinkDownload_',
		style: ''
	},
	meta: {
		id: 'AddsALinkMetaBox_',
		name_id: 'AddsALinkUsername_',
		wait_id: 'AddsALinkMetaWait_',
		style: '',
		name_style: '',
		wait_style: ''
	},
	watch: {
		id: 'AddsALinkWatch_',
		style: button_style
	}
};

var	video_panel = {
	box: {
		id: 'VideoMovie',
		style: 'padding:20px 20px 40px 20px;position:fixed;z-index:200000;display:block;cursor:move;',
		close_style: 'display:none;'
	},
	title: {
		id: 'AddsALinkWatchTitle',
		style: 'display:block;padding:0px 40px 4px 0px;text-align:center;height:1em;overflow:hidden;'
	},
	player: {
		id: 'AddsALinkPlayer',
		style: 'margin:10px 0px 0px 0px;'
	},
	download: {
		type: 'link',		// 'button' or 'link'
		id: 'AddsALinkDownloadButton',
		style: button_style+'margin-top:10px;padding:2px 4px 2px 4px;float:right;'
	},
	lock: {
		id: 'AddsALinkLockButton',
		style: button_style+'position:absolute;top:5px;right:25px;'
	},
	close: {
		id: 'AddsALinkCloseButton',
		style: button_style+'position:absolute;top:5px;right:5px;'
	},
	lock_ratio: {
		id: 'AddsALinkLockRatioChkbox',
		style: 'height:14px;position:absolute;bottom:30px;left:10px;',
		label_style: 'height:14px;position:absolute;bottom:30px;left:30px;',
	},
	status_bar: {
		id: 'AddsALinkStatusBar',
		style: 'height:14px;width:99%;position:absolute;bottom:0px;left:0px;padding:2px;',
	},
	resize: {
		id: 'AddsALinkResizeBox',
		style: 'height:16px;width:16px;position:absolute;bottom:0px;right:0px;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB9SURBVHjaYrxy4QQDcQAggJiIUaStbw4kAQKIiRh1jY2NQAZAADERqQ4IAAKIiRh1IQEeQBIggJiIUQdxK0AAMRGjDsIGCCAmItUBAUAAMRGjDuJWgABiIkYdxK0AAcREjDoIGyCAmIhUBwQAAcREjDqIWwECiJH45AIQYACQSUAeiz1vwgAAAABJRU5ErkJggg==");'
	}
};

// for setup
const li_style_base = "padding-top:6px;font-size:12px;";
const indent_1 = "padding-left:10px;";
const indent_2 = "padding-left:24px;";
const indent_3 = "padding-left:48px;";
const ul_style = 'padding-left:20px;padding-top:6px;list-style:none inside;';
const li_style = indent_1+li_style_base;
const li_style_text = indent_2+li_style_base;
const tab_base_style = "position:absolute;top:40px;text-align:center;height:40px;width:64px;cursor:pointer;z-index:2;-moz-border-radius:3px;";
const tab_style = tab_base_style+"font-weight:normal;border:3px inset buttonface;";
const tab_style_active = tab_base_style+"font-weight:bold;border:3px outset buttonface;border-bottom:3px solid buttonface;";
const setup_box_style = "z-index:1;display:none;";
const setup_box_style_active = "z-index:1;display:block;";
const setup_button_style = 'color:#000000;background-color:buttonface;background-image:none;cursor:pointer;border:2px outset buttonface;font-weight:normal;';

var setup_box = {
	base: {
		id: 'AddsALinkSetupBox',
		style: 'position:fixed;width:450px;color:#000000;background-color:buttonface;border:3px outset buttonface;font-size:14px;padding-top:6px;z-index:200000;',
		title_style: 'text-align:center;margin:0 0 5px 0;font-weight:bold;',
		tabs_style: 'margin:0 0 20px 0;font-weight:bold;height:40px;',
		hr_style: 'border: 0px solid black;border-bottom:1px solid #000000;',
		box_style: setup_box_style,
		box_style_active: setup_box_style_active,
		ul_style: 'list-style:none inside;',
	},
	tabs: {
		list: {
			id: 'AddsALinkSetupBoxListTab',
			box_id: 'AddsALinkSetupBoxListBox',
			style: tab_style+'left:0px;',
			style_active: tab_style_active+'left:0px;',
		},
		video: {
			id: 'AddsALinkSetupBoxVideoTab',
			box_id: 'AddsALinkSetupBoxVideoBox',
			style: tab_style+'left:70px;',
			style_active: tab_style_active+'left:70px;',
		},
		watch: {
			id: 'AddsALinkSetupBoxWatchTab',
			box_id: 'AddsALinkSetupBoxWatchBox',
			style: tab_style+'left:140px;',
			style_active: tab_style_active+'left:140px;',
		},
		script: {
			id: 'AddsALinkSetupBoxScriptControlTab',
			box_id: 'AddsALinkSetupBoxScriptControlBox',
			style: tab_style+'left:210px;',
			style_active: tab_style_active+'left:210px;',
		},
		update: {
			id: 'AddsALinkSetupBoxUpdateCheckerTab',
			box_id: 'AddsALinkSetupBoxUpdateCheckerBox',
			style: tab_style+'left:280px;',
			style_active: tab_style_active+'left:280px;',
		}
	},
	watch: {
		text_color_id: 'AddsALinkSetupWatchTextColor',
		bg_color_id: 'AddsALinkSetupWatchBGColor',
		bg_image_id: 'AddsALinkSetupWatchBGImage',
		download_link_id: 'AddsALinkSetupWatchDownloadLink',
		download_link_text_id: 'AddsALinkSetupWatchDownloadLinkText',
		video_size_id: 'AddsALinkSetupWatchVideoSize',
		added_date_id: 'AddsALinkSetupWatchAddedDate',
		autoplay_id: 'AddsALinkSetupWatchAutoplay',
		title_style: 'text-align:center;margin:0 0 5px 0;font-weight:bold;',
		ul_style: ul_style,
		text_color_style: li_style_text,
		bg_color_style: li_style_text,
		bg_image_style: li_style_text,
		video_size_style: li_style,
		added_date_style: li_style,
		autoplay_style: li_style,
		download_link_style: li_style,
		download_link_text_style: indent_3+li_style_base,
	},
	list: {
		download_link_id: 'AddsALinkSetupListDownloadLink',
		download_link_text_id: 'AddsALinkSetupListDownloadText',
		username_id: 'AddsALinkSetupListUserName',
		duration_id: 'AddsALinkSetupListDuration',
		resolution_id: 'AddsALinkSetupListResolution',
		views_id: 'AddsALinkSetupListViews',
		added_date_id: 'AddsALinkSetupListAddedDate',
		watch_button_id: 'AddsALinkSetupListWatchButton',
		watch_button_text_id: 'AddsALinkSetupListWatchButtonText',
		title_style: 'text-align:center;margin:0 0 5px 0;font-weight:bold;',
		ul_style: ul_style,
		download_link_style: li_style,
		username_style: li_style,
		duration_style: li_style,
		resolution_style: li_style,
		views_style: li_style,
		added_date_style: li_style,
		watch_button_style: li_style,
		download_link_text_style: indent_3+li_style_base,
		watch_button_text_style: indent_3+li_style_base,
	},
	video: {
		autoplay_id: 'AddsALinkSetupVideoPlayerAutoplay',
		auto_resize_id: 'AddsALinkSetupVideoPlayerAutoResize',
		lock_ratio_id: 'AddsALinkSetupVideoPlayerLockRatio',
		fit_aspect_ratio_id: 'AddsALinkSetupVideoPlayerFitAspectRatio',
		height_id: 'AddsALinkSetupVideoPlayerHeight',
		width_id: 'AddsALinkSetupVideoPlayerWidth',
		min_height_id: 'AddsALinkSetupVideoMinResizeHeight',
		min_width_id: 'AddsALinkSetupVideoMinResizeWidth',
		max_height_id: 'AddsALinkSetupVideoMaxResizeHeight',
		max_width_id: 'AddsALinkSetupVideoMaxResizeWidth',
		download_link_id: 'AddsALinkSetupVideoDownloadLink',
		download_link_text_id: 'AddsALinkSetupVideoDownloadText',
		title_style: 'text-align:center;margin:0 0 5px 0;font-weight:bold;',
		ul_style: ul_style,
		autoplay_style: li_style,
		auto_resize_style: li_style,
		lock_ratio_style: li_style,
		fit_aspect_ratio_style: "margin-left: 10px;",
		height_style: li_style_text,
		width_style: li_style_text,
		min_height_style: li_style_text,
		min_width_style: li_style_text,
		max_height_style: li_style_text,
		max_width_style: li_style_text,
		download_link_style: li_style,
		download_link_text_style: indent_3+li_style_base,
	},
	script: {
		check_interval_id: 'AddsALinkSetupScriptCheckInterval',
		check_interval_done_id: 'AddsALinkSetupScriptCheckIntervalDone',
		max_send_request_id: 'AddsALinkSetupScriptMaxSendRequest',
		max_wait_limit_id: 'AddsALinkSetupScriptMaxWaitLimit',
		max_retry_id: 'AddsALinkSetupScriptMaxRetry',
		ul_style: ul_style,
		check_interval_style: li_style,
		check_interval_done_style: li_style,
		max_send_request_style: li_style,
		max_wait_limit_style: li_style,
		max_retry_style: li_style,
	},
	update: {
		check_now_id: 'AddsALinkSetupCheckNowButton',
		check_now_style: 'position:absolute;right:40px;top:100px;margin:10px 0px 10px 100px;'+setup_button_style,
		type_name: 'AddsALinkSetupUpdateTypeName',
		day_name: 'AddsALinkSetupUpdateDayName',
		no_check_id: 'AddsALinkSetupUpdateNoCheck',
		every_loading_id: 'AddsALinkSetupUpdateEveryLoading',
		once_a_day_id: 'AddsALinkSetupUpdateOnceADay',
		once_a_week_id: 'AddsALinkSetupUpdateOnceAWeek',
		once_a_month_id: 'AddsALinkSetupUpdateOnceAMonth',
		day_box_id: 'AddsALinkSetupUpdateDayBox',
		any_day_id: 'AddsALinkSetupUpdateCheckAnyDay',
		sunday_id: 'AddsALinkSetupUpdateCheckSunday',
		monday_id: 'AddsALinkSetupUpdateCheckMonday',
		tuesday_id: 'AddsALinkSetupUpdateCheckTuesday',
		wednesday_id: 'AddsALinkSetupUpdateCheckWednesday',
		thursday_id: 'AddsALinkSetupUpdateCheckThursday',
		friday_id: 'AddsALinkSetupUpdateCheckFriday',
		saturday_id: 'AddsALinkSetupUpdateCheckSaturday',
		title_style: 'text-align:center;margin:0 0 5px 0;font-weight:bold;',
		ul_style: ul_style,
		hr_style: 'border: 0px solid black;border-top:1px solid #000000;',
		day_box_style: 'margin-left:10px;padding-bottom:10px;',
		li_style: li_style,
	},
	radio: {
		style: 'cursor:pointer;margin-right:6px;margin-left:10px;'
	},
	checkbox: {
		style: 'cursor:pointer;margin-right:10px;margin-left:15px;'
	},
	textbox: {
		style: 'margin-left:10px;margin-right:10px;'
	},
	button: {
		ok_id: 'AddsALinkSetupOKButton',
		cancel_id: 'AddsALinkSetupCancelButton',
		ok_style: 'margin:10px 0px 10px 100px;'+setup_button_style,
		cancel_style: 'margin:10px 0px 10px 100px;'+setup_button_style,
	}
};


var	watch_page = false;
var	add_download_button = false;

const	UNKNOWN_PAGE = 0;
const	CHANNEL_PAGE = 1;
const	PROFILE_PAGE = 2;
const	COMMUNITY_PAGE = 3;
const	SEARCH_PAGE = 4;
const	MANAGE_PAGE = 5;
const	TOP_PAGE = 6;
var	page_type = UNKNOWN_PAGE;

const	TYPE_INSERTED = 0;
const	TYPE_MODIFIED = 1;

var	listener_query = '';
var	listener_type = TYPE_INSERTED;

var	anchor_query = '//a[contains(@href,"watch_")]';
var	added_query = '..';
var	cell_query = '';
var	listbox_query = '';
var	tab_query = '';
var	tab_query_2 = '';
var	tabs = new Array();
var	listener_box = null;
var	listen_disabled = false;

var	player_locked = false;
var	last_top = 0;
var	last_left = 0;
var	last_width = 0;
var	last_height = 0;
var	last_player_width = 0;
var	last_player_height = 0;
var	aspect_ratio_locked = false;
var	aspect_ratio;

const	TYPE_HEIGHT_AUTO = 0;
const	TYPE_HEIGHT_CALC = 1;
var	cell_calc_type = TYPE_HEIGHT_AUTO;

if(window.location.href == 'http://beta.vreel.net/index.php' ||
   window.location.href == 'http://beta.vreel.net/') {
	if(document.getElementById("search")) {
		page_type = SEARCH_PAGE;
	} else {
		page_type = TOP_PAGE;
	}
}

if(window.location.href.indexOf('q=channels') >= 0) {
	page_type = CHANNEL_PAGE;
	add_download_button = true;
	need_name = true;
	need_length = true;
	need_views = true;
	need_addedDate = true;
	cols_per_row = 3;
	anchor_query = '//div[@id="block"]/a[contains(@href,"watch_")]';
	added_query = '..';
	listbox_query = '../..';
	listener_query = '//div[@id="left-wide"]';
	cell_calc_type = TYPE_HEIGHT_CALC;
} else
if(window.location.href.indexOf('q=mye') >= 0) {
	add_download_button = true;
	page_type = MANAGE_PAGE;
	need_length = true;
	need_addedDate = true;
	anchor_query = '//td/a[contains(@href,"watch_")]';
	added_query = '../../td[4]';
	listbox_query = '';
	listener_query = '//div[@id="left-wide"]';
} else
if(window.location.href.indexOf('/profile_') >= 0 ||
   window.location.href.indexOf('q=profile') >= 0 ||
   window.location.href.indexOf('q=my') >= 0) {
	add_download_button = true;
	need_length = true;
	need_views = true;
	need_addedDate = true;
	page_type = PROFILE_PAGE;
	cols_per_row = 3;
	cell_calc_type = TYPE_HEIGHT_CALC;
	anchor_query = '//div[@id="vid"]/a[contains(@href,"watch_")]';
	added_query = '..';
	listbox_query = '../..';
	tab_query = 'ancestor::div[contains(@class,"ui-tabs-panel")]';
	tab_query_2 = '//div[@id="tabs"]/ul[contains(@class,"ui-tabs-nav")]/li/a|//div[@id="tabs"]/div[contains(@class,"ui-tabs-panel")]/a[contains(@class,"mover")]';
	listener_query = '//div[@id="left"]';
} else
if(window.location.href.indexOf('q=community&a=show') >= 0) {
	add_download_button = true;
	page_type = COMMUNITY_PAGE;
	need_name = true;
	need_views = true;
	need_addedDate = true;
	anchor_query = '//div[@class="vidzz"]/h2/a[contains(@href,"watch_")]';
	added_query = '../..';
	listbox_query = '../../..';
	listener_query = '//div[@class="left"]';
} else
if(page_type == SEARCH_PAGE ||
   window.location.href.indexOf('q=search') >= 0) {
	add_download_button = true;
	page_type = SEARCH_PAGE;
	need_length = true;
	anchor_query = '//div[@id="search"]/a[contains(@href,"watch_")]';
	added_query = '../div[@id="more"]';
	listbox_query = 'ancestor::div[@id="content"]';
	listener_query = '//div[@id="left-wide"]';
} else
if(page_type == TOP_PAGE) {
	add_download_button = true;
	need_name = true;
	need_views = true;
	need_length = true;
	need_addedDate = true;
	cell_calc_type = TYPE_HEIGHT_CALC;
	anchor_query = '//div[@id="block"]/h2/a[contains(@href,"watch_")]';
	added_query = '../..';
	listbox_query = 'ancestor::div[@id="content"]';
	tab_query = 'ancestor::div[contains(@class,"ui-tabs-panel")]';
	tab_query_2 = '//div[@id="tabs"]/ul[contains(@class,"ui-tabs-nav")]/li/a|//div[@id="tabs"]/div[contains(@class,"ui-tabs-panel")]/a[contains(@class,"mover")]';
	listener_query = '//div[@id="left"]';
} else
if(window.location.href.indexOf('http://beta.vreel.net/watch_') >= 0) {
	watch_page = true;
} else {
	return;
}

Init();

window.addEventListener(
    "load",
    function() {
	if(tab_query_2) {
		var xp = document.evaluate(tab_query_2, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if(xp.snapshotLength) {
			for (var i=0; i < xp.snapshotLength; i++) {
				tabs.push(xp.snapshotItem(i));
			}
			for (var i in tabs) {
				tabs[i].addEventListener("click",ChangedTab,false);
			}
		}
	}

	if(watch_page == true) {
		watch_page_proc();
	}
	if(add_download_button == true) {
		if(custom.list.download_link || custom.list.username || custom.list.resolution || custom.list.duration ||
		   custom.list.video_size || custom.list.added_date) {
			need_information = true;
		}
		list_page_proc();
	}
    },
false);


// for list page
function GetSetupDataListPage(){
	custom.list = GetGMValue("list_page", custom.list, null);
}

function SetSetupDataListPage(){
	GM_setValue("list_page", uneval(custom.list));

}

// for video panel
function GetSetupDataVideoPanel(){
	custom.player = GetGMValue("player", custom.player, null);
}

function SetSetupDataVideoPanel(){
	GM_setValue("player", uneval(custom.player));
}

// for watch page
function GetSetupDataWatchPage(){
	custom.watch = GetGMValue("watch_page", custom.watch, null);
}

function SetSetupDataWatchPage(){
	GM_setValue("watch_page", uneval(custom.watch));
}

// for update check
function GetSetupDataUpdateCheck(){
	update_check = GetGMValue("update_check", update_check, null);
}

function SetSetupDataUpdateCheck(){
	GM_setValue("update_check", uneval(update_check));
}

// for script control
function GetSetupDataScriptControl(){
	custom.queue = GetGMValue("queue", custom.queue, null);
}

function SetSetupDataScriptControl(){
	GM_setValue("queue", uneval(custom.queue));
}

// style setup data
function GetSetupDataStyle(){
	custom.style.list = GetGMValueStyle("style_list", custom.style.list);
	custom.style.watch = GetGMValueStyle("style_watch", custom.style.watch);
	custom.style.video_panel = GetGMValueStyle("style_video_panel", custom.style.video_panel);
}

function SetSetupDataStyle(){
	GM_setValue("style_list", uneval(custom.style.list));
	GM_setValue("style_watch", uneval(custom.style.watch));
	GM_setValue("style_video_panel", uneval(custom.style.video_panel));
}

// others setup data
function GetSetupDataOthers(){
	custom.extention = GetGMValue("extention", custom.extention, null);
}

function SetSetupDataOthers(){
	GM_setValue("extention", custom.extention);
}

// setup data version
function GetSetupDataVersion(){
	custom.setup_version = GM_getValue("setup_version", custom.setup_version);
	if(custom.setup_version < SETUP_VERSION) {
		ConvertSetupData();
	}
}

function SetSetupDataVersion(){
	GM_setValue("setup_version", SETUP_VERSION);
}

// all set up data except version
function GetSetupDataAll() {
	GetSetupDataListPage();
	GetSetupDataVideoPanel();
	GetSetupDataWatchPage();
	GetSetupDataUpdateCheck();
	GetSetupDataScriptControl();
	GetSetupDataStyle();
	GetSetupDataOthers();
}

function SetSetupDataAll() {
	SetSetupDataVersion()
	SetSetupDataListPage();
	SetSetupDataVideoPanel();
	SetSetupDataWatchPage();
	SetSetupDataUpdateCheck();
	SetSetupDataScriptControl();
	SetSetupDataStyle();
	SetSetupDataOthers();
}

// for setup data conversion
function ConvertSetupData(){
	if(custom.setup_version == 0) {	// old format data
// for list page
		custom.list.download_link = GM_getValue("add_download_link", custom.list.download_link);
		custom.list.username = GM_getValue("add_username", custom.list.username);
		custom.list.resolution = GM_getValue("add_resolution", custom.list.resolution);
		custom.list.duration = GM_getValue("add_duration", custom.list.duration);
		custom.list.views = GM_getValue("add_views", custom.list.views);
		custom.list.video_size = GM_getValue("add_video_size_list", custom.list.video_size);
		custom.list.added_date = GM_getValue("add_added_date_list", custom.list.added_date);
		custom.list.watch_button = GM_getValue("add_watch_button", custom.list.watch_button);
// for watch page
		custom.watch.disp_type = GM_getValue("disp_type", custom.watch.disp_type);
		custom.watch.image_url = GM_getValue("image_url", custom.watch.image_url);
		custom.watch.text_color = GM_getValue("text_color", custom.watch.text_color);
		custom.watch.bg_color = GM_getValue("bg_color", custom.watch.bg_color);
		custom.watch.video_size = GM_getValue("add_video_size", custom.watch.video_size);
		custom.watch.added_date = GM_getValue("add_added_date", custom.watch.added_date);
		custom.watch.autoplay = GM_getValue("autoplay_watch", custom.watch.autoplay);
// for video panel
		custom.player.autoplay = GM_getValue("autoplay_list", custom.player.autoplay);
		custom.player.auto_resize = GM_getValue("auto_resize", custom.player.auto_resize);
		custom.player.min_width = GM_getValue("min_width_list", custom.player.min_width);
		custom.player.min_height = GM_getValue("min_height_list", custom.player.min_height);
		custom.player.max_width = GM_getValue("max_width_list", custom.player.max_width);
		custom.player.max_height = GM_getValue("max_height_list", custom.player.max_height);
		custom.player.player_height = GM_getValue("player_height_list", custom.player.player_height);
		custom.player.player_width = GM_getValue("player_width_list", custom.player.player_width);
		custom.player.lock_ratio = GM_getValue("lock_ratio", custom.player.lock_ratio);

	} else {
		GetSetupDataAll();
	}
	ConvOldDataToNewData(custom.setup_version);
	DeleteOldData(custom.setup_version);
	SetSetupDataAll();
}

function GetGMValueStyle(key, val){
	var old_data = GetGMValue(key, val, null);
	for(var i in val) {
		if(old_data[i]) {
			for(var j in old_data[i]) {
				if(old_data[i][j]) {
					val[i][j] = old_data[i][j];
				}
			}
		}
	}
	return val;
}

function GetGMValue(key, val, ignores) {
	if(typeof val == "object") {
		var old_data = eval(GM_getValue(key, val));
		for(var i in old_data) {
			if(ignores) {
				if(ignores.indexOf(i) >= 0) {
					continue;
				}
			}
			val[i] = old_data[i];
		}
	} else {
		val = GM_getValue(key, val);
	}
	return val;
}

function ConvOldDataToNewData(old_version) {
	if(old_version < 3) {
		custom.style.watch.anchor.text_color = custom.watch.text_color;
		custom.style.watch.anchor.bg_color = custom.watch.bg_color;
		if(custom.watch.disp_type == TEXT_TYPE) {
			custom.style.watch.anchor.bg_image = "";
		} else {
			custom.style.watch.anchor.bg_image = custom.watch.image_url;
		}

		delete custom.watch.disp_type;
		delete custom.watch.text_color;
		delete custom.watch.bg_color;
		delete custom.watch.image_url;
		delete custom.watch.image_text;
	}
}

function DeleteOldData(old_version) {
	if(old_version == 0) {	// old format data
// for list page
		GM_deleteValue("add_download_link");
		GM_deleteValue("add_username");
		GM_deleteValue("add_duration");
		GM_deleteValue("add_resolution");
		GM_deleteValue("add_views");
		GM_deleteValue("add_added_date_list");
		GM_deleteValue("add_video_size_list");
		GM_deleteValue("add_watch_button");
// for watch page
		GM_deleteValue("disp_type");
		GM_deleteValue("text_color");
		GM_deleteValue("bg_color");
		GM_deleteValue("image_url");
		GM_deleteValue("add_video_size");
		GM_deleteValue("add_added_date");
		GM_deleteValue("autoplay_watch");
// for video panel
		GM_deleteValue("autoplay_list");
		GM_deleteValue("auto_resize");
		GM_deleteValue("lock_ratio");
		GM_deleteValue("player_width_list");
		GM_deleteValue("player_height_list");
		GM_deleteValue("min_width_list");
		GM_deleteValue("min_height_list");
		GM_deleteValue("max_width_list");
		GM_deleteValue("max_height_list");
	}
}

// initialize
function	Init() {
// get setup data
	GetSetupDataVersion();
	GetSetupDataAll();

// Add menu
	GM_registerMenuCommand( "#### Set up this script(VReel) ####", Setup);

// for update check
	UpdateCheck(false);

	WatchOver();
}

var listener_nodes = new Array();
function Toggle_Listener(mode) {
	if(!listener_query) return;

	if(listener_nodes.length == 0) {
		var xp = document.evaluate(listener_query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if(xp.snapshotLength) {
			for(var i = 0; i < xp.snapshotLength; i++) {
				listener_nodes.push(xp.snapshotItem(i));
			}
		}
	}
	for(var i = 0; i < listener_nodes.length; i++) {
		var node = listener_nodes[i];
		if(mode) {
			if(listener_type == TYPE_INSERTED)
				node.addEventListener("DOMNodeInserted",NodeInserted,false);
			else if(listener_type == TYPE_MODIFIED)
				node.addEventListener("DOMSubtreeModified",NodeInserted,false);
		} else {
			if(listener_type == TYPE_INSERTED)
				node.removeEventListener("DOMNodeInserted",NodeInserted,false);
			else if(listener_type == TYPE_MODIFIED)
				node.removeEventListener("DOMSubtreeModified",NodeInserted,false);
		}
	}
}

function WatchOver() {
	check_interval = custom.queue.check_interval;
	if(QueueCheck()) {
		QueueControl();
	}
	setTimeout(WatchOver, check_interval);
}

function QueueCheck() {
	var sent = 0;
	var received = 0;
	var count = 0;
	var none = 0;
	var done = 0;
	var wait = 0;
	var now = (new Date()).getTime();
	for (var pid in queue) {
		count++;
		switch(queue[pid].stat) {
		case SENT_REQUEST:
			if(now - queue[pid].sent_time < custom.queue.max_wait_limit) {
				sent++;
			} else {
				WaitMessage(pid, -1, "Can't get informations");
				queue[pid].stat = NOT_RECEIVED;
				done++;
			}
			break;
		case RECEIVED_RESPONSE:
			received++;
			break;
		case NONE:
			none++;
			break;
		case STORED_DATA:
			done++;
			break;
		case WAITING:
			wait++;
			break;
		default:
			done++;
		}
	}
	total_queue_num = count;
	current_request_num = sent;

	if(last_done_num != done) {
		var work = new Array();
		for (var pid in queue) {
			var list_box = queue[pid].list_box;
			if(queue[pid].list_box) {
				if(!queue[pid].list_box_id || work.indexOf(queue[pid].list_box_id) >= 0) {
					continue;
				}
				work.push(queue[pid].list_box_id);

				Toggle_Listener(false);
				ModifyListBoxHeight(pid);
				Toggle_Listener(true);
			}
		}
	}
	last_done_num = done;

	if(current_request_num < custom.queue.max_send_request) {
		if(none > 0) {
			return true;
		}
		if(wait > 0) {
			for (var pid in queue) {
				if(queue[pid].stat == WAITING) {
					queue[pid].stat = NONE;
					none++;
					wait--;
					if(wait > 0 && none >= custom.queue.threshold) {
						break;
					}
				}
			}
			if(none > 0) {
				return true;
			}
		}
		if(total_queue_num > done &&
		   retry_count < custom.queue.max_retry) {
			retry_count++;
			for (var pid in queue) {
				switch(queue[pid].stat) {
				case SENT_REQUEST:
				case RECEIVED_RESPONSE:
				case NOT_RECEIVED:
					queue[pid].stat = NONE;
					break;
				}
			}
			return true;
		}
	}
	if(total_queue_num == done && done > 0) {
		check_interval = custom.queue.check_interval_done;
		retry_count = 0;
	} else {
		check_interval = custom.queue.check_interval;
	}
	return false;
}

function QueueControl() {
	var sent = current_request_num;
	var now = (new Date()).getTime();
	var work = new Array();
	for (var pid in queue) {
		if(sent >= custom.queue.max_send_request) {
			break;
		}
		if(queue[pid].stat == NONE) {
			GetVideoInformation(pid);
			sent++;
		}
	}
}

// autoplay for watch page
function auto_play() {
	var embed = document.getElementsByTagName("embed");
	if(embed) {
		var newEmbed = embed[0].cloneNode(true);
		newEmbed.setAttribute('autoplay', 'true');
		var object = embed[0].parentNode;
		object.removeChild(embed[0]);
		object.appendChild(newEmbed);
	}
}

function ModifyFileName(filename) {
	filename = filename.replace(/[\\\/:;\*\?\"<>\|]/g,'_');
	if(filename.replace('.', '') == '') {
		filename = filename.replace(/\./g, '_');
	}
	return filename;
}

var header_info = { size: '', added: '' };

// watch_page_proc routine
function watch_page_proc() {
	var embed = document.getElementsByTagName("embed");

	if(!embed || !embed[0]) {
		var parent = document.getElementById("VideoMovie");
		if(!parent) {
			return;	// Probably it is a bug.
		}
		// Get download URL from anchor tag by NoScript
		var i;
		var childs = parent.childNodes;
		for(i = 0; i < childs.length; i++) {
			if(childs[i].nodeName.toLowerCase() == 'a') break;
		}
		if(i >= childs.length) {
			return;	// Probably it is a bug.
		}
		download_url = childs[i].getAttribute('href');
		if(download_url.indexOf('/player/') >= 0) {
			// URL of the DivX player installer
			download_url = '';
		}
	} else {
		// Get download URL from embed tag
		download_url = embed[0].getAttribute("src");
		preview_image_url = embed[0].getAttribute("previewimage");
		var node = document.getElementById("content");
		if(node) {
			node.addEventListener(
			    "DOMSubtreeModified",
			    content_modified,
			    false);
		}
	}

	if(!download_url) {
		return;
	}

	var xp = document.evaluate('//div[@id="content"]/h1', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var l=xp.snapshotLength;
	var title = '';
	if(l) {
		var node = xp.snapshotItem(0);
		title = node.textContent;
	}
	// get nav bar object
	var nav = document.getElementById("nav");

	var style = buildStyle(custom.style.watch.download, added_box_watch.download.div_style);
	html =
		'<a id="' + added_box_watch.download.anchor_id +
		'" href="' + download_url + '" style="' + style + '">' +
		custom.watch.download_link_text + '</a>' +
		'';

// Add DOWNLOAD link after the UPLOAD image in the nav bar
	style = buildStyle(custom.style.watch.download, added_box_watch.download.div_style+"display:none;");
	var p = document.createElement('li');
	p.id = added_box_watch.download.div_id;
	p.setAttribute('style', style);
	p.innerHTML = html;

	var filename = ModifyFileName(title);
	p.firstChild.setAttribute('title',filename);
	p.firstChild.setAttribute('filename',filename+custom.extention);

//	if(nav) {
		nav.appendChild(p);
		ChangeStyle();
//	} else {
//		window.addEventListener(
//		    "load",
//		    function() {
//			nav.appendChild(p);
//			ChangeStyle();
//		    },
//		    true);
//	}
	GetHeaderInformation();
	if(custom.watch.autoplay) {
		auto_play();
	}
}

function content_modified() {
	var embed = document.getElementsByTagName("embed");
	if(embed) {
		download_url = embed[0].getAttribute("src");
		preview_image_url = embed[0].getAttribute("previewimage");
		var node = document.getElementById(added_box_watch.download.anchor_id);
		if(node) {
			node.href = download_url;
		}
		GetHeaderInformation();
	}
}

const WATCH_URL = 0;

function buildURL(pid, target, site) {
	var	url = '';
	switch(target) {
	case WATCH_URL:
		url = 'http://beta.vreel.net/'+pid+'.html';
		break;
	}
	return url;
}

function buildStyle(val, base) {
	var style = '';
	if(base) {
		style += base;
		if(style.substr(base.length-1) != ';') {
			style += ';';
		}
	}
	if(val.text_color) {
		style += "color:"+val.text_color+";";
	}
	if(val.bg_color) {
		style += "background-color:"+val.bg_color+";";
	}
	if(val.bg_image) {
		if(val.bg_image.substr(0, 4) == 'http') {
			style += "background-image:url("+val.bg_image+");";
		} else {
			style += "background-image:"+val.bg_image+";";
		}
	}
	if(val.font_size) {
		style += "font-size:"+val.font_size+";";
	}
	if(val.font_weight) {
		style += "font-weight:"+val.font_weight+";";
	}
	if(val.others) {
		style += val.others;
	}
	return style;
}

function ChangedTab() {
	var href = this.getAttribute('href');
	var id = href.match(/#(.*)/)[1];
	if(!id) {	// Maybe "Prev Page" or "Next Page"
		var rel = this.getAttribute('rel');
		id = 'fragment-'+rel;
	}
	var tab = document.getElementById(id);
	if(tab) {
		Toggle_Listener(false);
		for (var pid in queue) {
			if(queue[pid].tab_id == id &&
			   queue[pid].stat == STORED_DATA) {
				ModifyParentHeight(pid);
				ModifyListBoxHeight(pid);
			}
		}
		Toggle_Listener(true);
	}
}

function ExtractPid(href) {
	var pid = href.match(/\/(watch_\d+)\.html/)[1];
	return pid;
}

function NodeInserted() {
	list_page_proc();
	Toggle_Listener(false);
	for (var pid in queue) {
		ModifyParentHeight(pid);
	}
	Toggle_Listener(true);
}

function list_page_proc() {
	AddVideoInformationInList();
}


function AddVideoInformationInList() {
	var xp = document.evaluate(anchor_query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(xp.snapshotLength) {

		for (var i=0; i < xp.snapshotLength; i++) {
			var anchor = xp.snapshotItem(i);
			var pid = ExtractPid(anchor.href);
			if(queue[pid]) {
				continue;
			}
			var base = document.createElement('div');
			base.id = added_box.base.id + pid;
			var style = buildStyle(custom.style.list.base, added_box.base.style);
			base.setAttribute('style',style);
			var parent = document.evaluate(added_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var list_box = null;
			var list_box_id = null;
			if(listbox_query) {
				list_box = document.evaluate(listbox_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if(list_box) list_box_id = list_box.id;
			}
			var tab = null;
			var tab_id = null;
			if(tab_query) {
				tab = document.evaluate(tab_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if(tab) tab_id = tab.id;
			}
			Toggle_Listener(false);
		        parent.appendChild(base);
			Toggle_Listener(true);
			queue[pid] = {
				stat: WAITING,
				node: base,
				list_box: list_box,
				list_box_id: list_box_id,
				tab: tab,
				tab_id: tab_id,
				offsetTop: base.parentNode.offsetTop,
			};
		}
	} else {
		Toggle_Listener(true);
		if(page_type == SEARCH_PAGE) {
			page_type == UNKNOWN_PAGE;
		}
	}

}

function GetVideoInformation(pid) {
	if(!need_information) {
		return;
	}

	var url = buildURL(pid, WATCH_URL);
	var infoKeys = [
		'video_url',
		'user_url',
		'username',
		'resolution',
		'duration',
		'views',
		'embedCode',
		'previewimage_url',
		'VideoMovie',
		'title',
		'video_width',
		'video_height'
		];

	setTimeout(function(){
		queue[pid].stat = SENT_REQUEST;
		queue[pid].sent_time = (new Date()).getTime();
		WaitMessage(pid, 1);
		GM_xmlhttpRequest({
			pid: pid,
			method:"GET",
			url: url,
			headers:{
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 6.0; Win32)",
				"Accept":"*/*"
			},
			onerror: function(xhr){
				var text = xhr.responseText;
				GM_log("Error: "+xhr.status + ': ' + text);
			},
			onload: function(xhr){
				var text = xhr.responseText;
				var pid = this.pid;
				queue[pid].stat = RECEIVED_RESPONSE;
				if ( xhr.status != 200 ) {	// failed
					GM_log(xhr.status + ': ' + text);
					WaitMessage(pid, xhr.status);
					return;
				}
				if(text.indexOf('<embed') < 0) {
					var msg = GetMessageFromHtml(text);
					WaitMessage(pid, -1, msg);
					return;
				}
				var VideoInfo = ParseSourceXml(text);
				for (var i in infoKeys) {
					queue[pid][infoKeys[i]] = VideoInfo[infoKeys[i]];
				}
				queue[pid].stat = STORED_DATA;
				WaitMessage(pid, 0);
				AddMetaData(pid);
				GetHeaderInformationList(pid);
			}
		});
	},0);
}

function GetMessageFromHtml(text) {
	var	div = document.createElement('div');
	div.innerHTML = text;
	var node = document.evaluate('.//h1', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node) {
		return node.textContent;
	}
	if(text.indexOf("document.location.href='http://beta.vreel.net/?q=closed2'") >= 0) {
		return "Maintenance";
	}
	return "Can't get embed code";

}

// Parse source xml
function ParseSourceXml(text) {

	var	videoInfo = {};
	var	div = document.createElement('div');
	div.innerHTML = text;

	var node = document.evaluate('.//embed', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node) {
		var video_url = node.getAttribute('src');
		if(!video_url) {
			return null;
		}
		videoInfo['video_url'] = video_url;
		var previewimage_url = node.getAttribute("previewimage");
		if(previewimage_url) {
			videoInfo['previewimage_url'] = previewimage_url;
		}
	}

	node = document.evaluate('.//object', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node) {
		videoInfo['embedCode'] = node.innerHTML.match(/\<embed.*?\>/);
	} else {
		xp = document.evaluate('.//div[@id="VideoMovie"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(xp) {
			videoInfo['VideoMovie'] = xp.textContent.replace(/\n\s*/g,'');
		}
	}

	var xp = document.evaluate('.//div[@id="right-small"]/p/strong', div, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var l = xp.snapshotLength;
	for(var i = 0; i < l;i++) {
		var p = xp.snapshotItem(i);
		var key = p.textContent.match(/(.*)\s:/)[1].toLowerCase();
		var val = p.nextSibling.textContent.replace(/^\s/,'');
		videoInfo[key] = val;
	}
	if(/(\d*)x(\d*)/.test(videoInfo['resolution'])) {
		videoInfo['video_width'] = RegExp.$1;
		videoInfo['video_height'] = RegExp.$2;
	} else {
		videoInfo['video_width'] = '';
		videoInfo['video_height'] = '';
	}

	node = document.evaluate('.//div[@id="right-small"]/table/tbody/tr[1]/td/a', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node) {
		var user_url = node.getAttribute('href');
		if(user_url) {
			videoInfo['user_url'] = user_url;
		}
		var username = node.textContent;
		if(username) {
			videoInfo['username'] = username;
		}
	}

	node = document.evaluate('.//div[@id="content"]/h1', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node) {
		var title = node.textContent;
		if(title) {
			videoInfo['title'] = title;
		}
	}

	node = document.evaluate('.//div[@class="bookmark"]/div[1]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node) {
		var views = node.textContent.match(/Views : (\d*)/)[1];
		if(views) {
			videoInfo['views'] = views;
		}
	}

	return videoInfo;

}

function CalcHeightChildNodes(parent) {
	var height = 0;
	var old_height = 0;
	var offset = -1;
	var childNodes = parent.childNodes;
	var ignore_box = [ 'sky' ];
	for (var i = 0; i < childNodes.length; i++) {
		var child = childNodes[i];
		if(child.nodeType != 1) continue;
		if(child.tagName.toUpperCase() == 'DIV') {
			if(ignore_box.indexOf(child.id) >= 0) {
				continue;
			}
		}
		if(child.tagName.toUpperCase() == 'A') {
			if(!child.firstChild) continue;
			if(child.firstChild.nodeType == 1 &&
				page_type != TOP_PAGE &&
				child.firstChild.tagName.toUpperCase() == 'IMG') {
				child = child.firstChild;
			}
		}
		var padding = 0;
		if(document.defaultView) {
			var style = document.defaultView.getComputedStyle(child, null);
			padding = parseInt(style.getPropertyValue('padding-top')) +
				parseInt(style.getPropertyValue('padding-bottom'));
			padding += parseInt(style.getPropertyValue('margin-top')) +
				parseInt(style.getPropertyValue('margin-bottom'));
		}
		if(offset == child.offsetTop) {
			if(old_height < child.offsetHeight + padding) {
				height += child.offsetHeight + padding - old_height;
				old_height = child.offsetHeight + padding;
			}
			continue;
		}
		offset = child.offsetTop;
		height += child.offsetHeight + padding;
		old_height = child.offsetHeight + padding;
	}
	return height;
}

function ModifyListBoxHeight(pid) {
	height = CalcHeightChildNodes(queue[pid].list_box);
	queue[pid].list_box.style.height = height+'px';
}

function ModifyParentHeight(pid) {
	var work = new Array();
	var height = 0;
	for (var wpid in queue) {
		if(queue[wpid].offsetTop == queue[pid].offsetTop) {
			if(!queue[wpid].node) continue;
			if(!queue[wpid].node.parentNode) continue;
			if(queue[pid].list_box_id && queue[wpid].list_box_id) {
				if(queue[pid].list_box_id != queue[wpid].list_box_id) continue;
			}
			work.push(wpid);
//			if(queue[wpid].stat != STORED_DATA) {
//				continue;
//			}
			var box = queue[wpid].node.parentNode;
			var padding = 0;
			if(document.defaultView) {
				var style = document.defaultView.getComputedStyle(box, null);
				padding = parseInt(style.getPropertyValue('padding-top')) +
					parseInt(style.getPropertyValue('padding-bottom'));
				padding += parseInt(style.getPropertyValue('margin-top')) +
					parseInt(style.getPropertyValue('margin-bottom'));
			}
			var work_height = CalcHeightChildNodes(box);
			if(work_height > height) {
				height = work_height;
			}
		}
	}
	if(height) {
		for (var wpid in work) {
			if(cell_calc_type == TYPE_HEIGHT_CALC) {
				queue[work[wpid]].node.parentNode.style.height = height+'px';
			} else {
				queue[work[wpid]].node.parentNode.style.height = 'auto';
			}
		}
	}
}

function WaitMessage(pid, mode, msg) {
	var id = added_box.meta.wait_id + pid;
	var div = document.getElementById(id);
//	var xp = document.evaluate('//div[@id="'+id+'"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//	var l=xp.snapshotLength;
//	if(l > 0) {
//		div = xp.snapshotItem(0);
//	}

	Toggle_Listener(false);
	if(mode == 1) {
		if(!div) {
			div = document.createElement('div');
			div.id = id;
			div.innerHTML = 'Wait!';
			div.setAttribute('style', buildStyle(custom.style.list.wait,added_box.meta.wait_style));
			if(queue[pid].node) queue[pid].node.appendChild(div);
		}
	} else if(mode == 0) {
		div = document.getElementById(id);
		if(div) {
//			queue[pid].node.removeChild(div);
			div.parentNode.removeChild(div);
		}
	} else {
		div = document.getElementById(id);
		if(div) {
			if(msg) {
				div.innerHTML = msg;
			} else {
				div.innerHTML = 'Error status:'+mode;
			}
		}
	}
	if(mode != 0) {
		if(queue[pid].node && queue[pid].node.parentNode) {
			var height = div.offsetTop - queue[pid].node.parentNode.offsetTop + queue[pid].node.offsetHeight;
			queue[pid].node.parentNode.style.height = height+'px';
		}

		ModifyParentHeight(pid);
	}
	Toggle_Listener(true);
}

function AddMetaData(pid) {
	if(queue[pid].stat != STORED_DATA) return;

	Toggle_Listener(false);

	var	style;
// Add download link
	var id = added_box.download.id + pid;
	var download = document.getElementById(id);
	if(!download) {
		download = document.createElement('a');
		download.id = id;
		download.addEventListener("click", function(e) {
			e.preventDefault();
			window.location.href = this.href;
			return false;
		},false); 
		queue[pid].node.appendChild(download);
	}
	download.innerHTML = custom.list.download_link_text + '<br />';
	download.href = queue[pid]['video_url'];
	var filename = ModifyFileName(queue[pid]['title']);
	download.setAttribute('title',filename);
	download.setAttribute('filename',filename+custom.extention);
	style = buildStyle(custom.style.list.download, added_box.download.style);
	if(custom.list.download_link) {
		download.setAttribute('style',style + styles.open);
	} else {
		download.setAttribute('style',style + styles.close);
	}

// Add user name(publisher name)
	id = added_box.meta.name_id + pid;
	var name = document.getElementById(id);
	if(!name) {
		name = document.createElement('a');
		var href = '/'+queue[pid]['user_url'];
		name.innerHTML = queue[pid]['username']+'<br />';
		name.id = id;
		name.href = href;
		queue[pid].node.appendChild(name);
	}
	style = buildStyle(custom.style.list.name, added_box.meta.name_style);
	if(custom.list.username && need_name == true) {
		name.setAttribute('style',style + styles.open);
	} else {
		name.setAttribute('style',style + styles.close);
	}

	var info = '';
	if(custom.list.duration && need_length) {
		info += "Length : "+queue[pid]['duration'] +"<br />";
	}
	if(custom.list.resolution) {
		info += "Resolution : "+queue[pid]['resolution'] +"<br />";
	}
	if(custom.list.views && need_views) {
		info += "Views : "+queue[pid]['views'] +"<br />";
	}
	if(custom.list.video_size && queue[pid]['size']) {
		info += "Size : "+queue[pid]['size'] +"<br />";
	}
	if(custom.list.added_date && need_addedDate && queue[pid]['addedDate']) {
		info += "Added : "+queue[pid]['addedDate'] +"<br />";
	}
	id = added_box.meta.id + pid;
	div = document.getElementById(id);
	if(!div) {
		div = document.createElement('div');
		div.id = id;
		queue[pid].node.appendChild(div);
	}
	div.innerHTML = info;

	style = buildStyle(custom.style.list.meta, added_box.meta.style);
	if(custom.list.duration || custom.list.resolution || custom.list.views || custom.list.video_size || custom.list.added_date) {
		div.setAttribute('style',style + styles.open);
	} else {
		div.setAttribute('style',style + styles.close);
	}

// Add 'Watch video' button
	id = added_box.watch.id + pid;
	var watch_button = document.getElementById(id);
	if(!watch_button) {
		watch_button = document.createElement('input');
		watch_button.type = 'button';
		watch_button.id = id;
		watch_button.setAttribute("pid", pid);
		watch_button.addEventListener("click",function(e) {
				GetEmbedCode(this.id);
			},false);
		queue[pid].node.appendChild(watch_button);
	}
	watch_button.value = custom.list.watch_button_text;
	style = buildStyle(custom.style.list.watch_button, added_box.watch.style);
	if(custom.list.watch_button) {
		watch_button.setAttribute('style',style + styles.block_open);
	} else {
		watch_button.setAttribute('style',style + styles.close);
	}


	if(queue[pid].node.parentNode) {
		var height = queue[pid].node.offsetTop - queue[pid].node.parentNode.offsetTop + queue[pid].node.offsetHeight + 16; // 16 is adjust
		queue[pid].node.parentNode.style.height = height+'px';
	}

	ModifyParentHeight(pid);
	Toggle_Listener(true);
}


// Drag&Drop and Resize for Video Panel
var _startX = 0;
var _startY = 0;
var _offsetLeft = 0;
var _offsetTop = 0;
var _dragObj = null;
var _dragObjStack = new Array();
var _dragDisabled = false;
var _resizeObj = null;
var _resizeBox = null;
var _playerNode = null;
var _playerWidth = 0;
var _playerHeight = 0;
var _padding = new Array(4);

function setDragObject(obj) {
	if(obj) {
		_dragObjStack.push(_dragObj);
		_dragObj = obj;
		_dragObj.addEventListener('mousedown', dragStart, false);
	} else {
		document.removeEventListener("mousedown", dragStart, false);
		_dragObj = _dragObjStack.pop();
	}
}

function dragStart(e) {
	if(_dragDisabled == true) return;
	if(!e.rangeParent) return;
	if(e.rangeParent.nodeType == 1 && e.rangeParent.tagName == 'INPUT') return;
	_startX = e.clientX;
	_startY = e.clientY;
	_offsetLeft  = _dragObj.offsetLeft;
	_offsetTop   = _dragObj.offsetTop;
	document.addEventListener("mousemove", dragGo,   true);
	document.addEventListener("mouseup",   dragStop, true);
	e.preventDefault();
}

function dragGo(e) {
	e.preventDefault();
	_dragObj.style.left = (_offsetLeft + e.clientX - _startX) + "px";
	_dragObj.style.top = (_offsetTop + e.clientY - _startY) + "px";
}

function dragStop(e) {
	document.removeEventListener("mousemove", dragGo,   true);
	document.removeEventListener("mouseup",   dragStop, true);
}

function setResizeObject(obj, box) {
	_resizeObj = obj;
	_resizeBox = box;
	_padding[0] = parseInt(obj.style.paddingTop);
	_padding[1] = parseInt(obj.style.paddingRight);
	_padding[2] = parseInt(obj.style.paddingBottom);
	_padding[3] = parseInt(obj.style.paddingLeft);
	if(_resizeObj && _resizeBox) {
		_resizeBox.addEventListener('mousedown', resizeStart, false);
	} else {
		document.removeEventListener("mousedown", resizeStart, false);
	}
}

function resizeStart(e) {
	_dragDisabled = true;
	_startX = e.clientX;
	_startY = e.clientY;
	_offsetWidth  = _resizeObj.offsetWidth;
	_offsetHeight = _resizeObj.offsetHeight;
	_playerNode = document.getElementById(video_panel.player.id);
	_playerWidth = parseInt(_playerNode.width);
	_playerHeight = parseInt(_playerNode.height);
	document.addEventListener("mousemove", resizeGo,   false);
	document.addEventListener("mouseup",   resizeStop, false);
	e.preventDefault();
}

function resizeGo(e) {
	var need_adjust = false;
	e.preventDefault();
	var dist_width = e.clientX - _startX;
	var dist_height = e.clientY - _startY;

	if(_playerWidth + dist_width > custom.player.max_width) {
		dist_width = custom.player.max_width - _playerWidth;
	}
	if(_playerWidth + dist_width < custom.player.min_width) {
		dist_width = custom.player.min_width - _playerWidth;
	}
	if(aspect_ratio_locked) {
		dist_height = (_playerWidth + dist_width) / aspect_ratio - _playerHeight;
	}
	if(_playerHeight + dist_height > custom.player.max_height) {
		dist_height = custom.player.max_height - _playerHeight;
		if(aspect_ratio_locked) {
			dist_width = (_playerheight + dist_height) * aspect_ratio - _playerWidth;
		}
	}
	if(_playerHeight + dist_height < custom.player.min_height) {
		dist_height = custom.player.min_height - _playerHeight;
		if(aspect_ratio_locked) {
			dist_width = (_playerheight + dist_height) * aspect_ratio - _playerWidth;
		}
	}

	_playerNode.width = _playerWidth + dist_width;
	_playerNode.height = _playerHeight + dist_height;
	_resizeObj.style.width = (_offsetWidth + dist_width - _padding[1] - _padding[3]) + "px";
	_resizeObj.style.height = (_offsetHeight + dist_height - _padding[0] - _padding[2]) + "px";

	MakeStatus(_playerNode);
}

function resizeStop(e) {
	document.removeEventListener("mousemove", resizeGo,   false);
	document.removeEventListener("mouseup",   resizeStop, false);
	last_width = _resizeObj.offsetWidth - _padding[1] - _padding[3];
	last_height = _resizeObj.offsetHeight - _padding[0] - _padding[2];
	last_player_width = parseInt(_playerNode.width);
	last_player_height = parseInt(_playerNode.height);
	_dragDisabled = false;

	MakeStatus(_playerNode);
}


function GetWatchBoxPosition() {
	var	div = document.getElementById(video_panel.box.id);
	last_top = div.offsetTop;
	last_left = div.offsetLeft;
}

function setEmbedSize(div) {
	var	embed = document.getElementById(video_panel.player.id);
	var	pid = embed.getAttribute('pid');

	var	height = 0;
	var	width = 0;
	var	top, left;
	var	auto_resize = custom.player.auto_resize;
	var	player_height = parseInt(custom.player.player_height);
	var	player_width = parseInt(custom.player.player_width);
	var	ratio = parseInt(queue[pid].video_width) / parseInt(queue[pid].video_height);

	if(auto_resize == true &&
	   queue[pid].video_width && queue[pid].video_height) {
		embed.height = queue[pid].video_height;
		embed.width = queue[pid].video_width;
		if(embed.width > custom.player.max_width) {
			embed.width = custom.player.max_width;
		}
		if(embed.height > custom.player.max_height) {
			embed.height = custom.player.max_height;
		}
		height += parseInt(embed.height);
		height += parseInt(embed.offsetTop);
		width += parseInt(embed.width);
//		width += parseInt(embed.offsetLeft);
	} else {
		if(player_width) {
			embed.width = player_width;
			width += parseInt(embed.width);
//			width += parseInt(embed.offsetLeft);
		}
		if(player_height) {
			if(custom.player.fit_aspect_ratio && ratio) {
				embed.height = embed.width / ratio;
			} else {
				embed.height = player_height;
			}
			height += parseInt(embed.height);
			height += parseInt(embed.offsetTop);
		}
	}

	aspect_ratio = parseInt(embed.width) / parseInt(embed.height);

	if(!player_locked) {
		var padding_height = parseInt(div.style.paddingTop)+parseInt(div.style.paddingBottom);
		var padding_width = parseInt(div.style.paddingLeft)+parseInt(div.style.paddingRight);
		top = custom.player.top;
		left = custom.player.left;
		if(top == 'center') {
			top = (window.innerHeight - height - padding_height) / 2;
			if(top < 0) {
				top = 0;
			}
		}
		if(left == 'center') {
			left = (window.innerWidth - width - padding_width) / 2;
			if(left < 0) {
				left = 0;
			}
		}
		last_top = top;
		last_left = left;
		div.style.cursor = 'move';
	} else {
		top = last_top;
		left = last_left;
		div.style.cursor = 'auto';
	}
	div.style.height = height + 'px';
	div.style.width = width + 'px';
	div.style.top = top + 'px';
	div.style.left = left + 'px';

	MakeStatus(embed);

}

function WatchVideo(id) {
	var	pid = document.getElementById(id).getAttribute('pid');
	var	id = video_panel.box.id;
	var	div = document.getElementById(id);
	var	append = false;
	var	top;
	var	left;

	if(!div) {
		div = document.createElement('div');
		div.id = id;
		append = true;
	}
	div.innerHTML = queue[pid]['embedCode'];
	if(custom.player.autoplay) {
		div.firstChild.setAttribute('autoplay','true');
	}
	div.firstChild.setAttribute('pid',pid);
	div.firstChild.setAttribute('id',video_panel.player.id);
	div.firstChild.setAttribute('style',video_panel.player.style);
	var style = buildStyle(custom.style.video_panel.base, video_panel.box.style);
	div.setAttribute('style', style);

	if(append == true) {
		document.body.appendChild(div);
	}

	append = false;
	id = video_panel.title.id;
	var title = document.getElementById(id);
	if(!title) {
		title = document.createElement('span');
		append = true;
	}
	title.id = id;
	title.innerHTML = queue[pid]['title'];
	style = buildStyle(custom.style.video_panel.title, video_panel.title.style);
	title.setAttribute('style', style);
	if(append == true) {
		div.insertBefore(title, div.firstChild);
	}

	append = false;
	id = video_panel.download.id;
	var download_button = document.getElementById(id);
	if(!download_button) {
		if(video_panel.download.type == 'button') {
			download_button = document.createElement('input');
			download_button.type = 'button';
		} else {
			download_button = document.createElement('a');
		}
		download_button.id = id;
		append = true;
	}
	if(video_panel.download.type == 'button') {
		download_button.value = custom.player.download_link_text;
	} else {
		download_button.href = queue[pid]['video_url'];
		download_button.innerHTML = custom.player.download_link_text;
	}
	download_button.setAttribute('title',queue[pid]['title']);
	download_button.setAttribute('filename',ModifyFileName(queue[pid]['title'])+custom.extention);
	style = buildStyle(custom.style.video_panel.download, video_panel.download.style);
	download_button.setAttribute('style', style);
	if(append == true) {
		div.appendChild(download_button);
		download_button.addEventListener("click",function(e) {
				e.preventDefault();
				DownloadVideo(pid);
			},false);
	}
	if(custom.player.download_link) {
		download_button.style.display = 'block';
	} else {
		download_button.style.display = 'none';
	}

	aspect_ratio_locked = custom.player.lock_ratio;
	id = video_panel.lock_ratio.id;
	var lock_ratio_chkbox = document.getElementById(id);
	if(!lock_ratio_chkbox) {
		var label = document.createElement('span');
		label.innerHTML = 'Lock aspect ratio';
		style = buildStyle(custom.style.video_panel.lock_ratio, video_panel.lock_ratio.label_style);
		label.setAttribute('style', style);
		div.appendChild(label);
		lock_ratio_chkbox = document.createElement('input');
		lock_ratio_chkbox.type = 'checkbox';
		lock_ratio_chkbox.checked = aspect_ratio_locked;
		lock_ratio_chkbox.id = id;
		style = buildStyle(custom.style.video_panel.lock_ratio, video_panel.lock_ratio.style);
		lock_ratio_chkbox.setAttribute('style', style);
		div.appendChild(lock_ratio_chkbox);
		lock_ratio_chkbox.addEventListener("click",ChangeLockRatio,false);
	}

	id = video_panel.close.id;
	var close_button = document.getElementById(id);
	if(!close_button) {
		close_button = document.createElement('input');
		close_button.type = 'button';
		close_button.value = 'X';
		close_button.id = id;
		style = buildStyle(custom.style.video_panel.close, video_panel.close.style);
		close_button.setAttribute('style', style);
		div.appendChild(close_button);
		close_button.addEventListener("click",CloseVideoPanel,false);
	}

	id = video_panel.status_bar.id;
	var status_bar = document.getElementById(id);
	if(!status_bar) {
		status_bar = document.createElement('div');
		status_bar.innerHTML = '';
		status_bar.id = id;
		style = buildStyle(custom.style.video_panel.status_bar, video_panel.status_bar.style);
		status_bar.setAttribute('style', style);
		div.appendChild(status_bar);
	}

	id = video_panel.resize.id;
	var resize_box = document.getElementById(id);
	if(!resize_box) {
		resize_box = document.createElement('div');
		resize_box.innerHTML = '';
		resize_box.id = id;
		resize_box.setAttribute('style', video_panel.resize.style);
		resize_box.style.cursor = 'se-resize';
		div.appendChild(resize_box);
	}

	setEmbedSize(div);

	setResizeObject(div, resize_box);

	id = video_panel.lock.id;
	var lock_button = document.getElementById(id);
	if(!lock_button) {
		lock_button = document.createElement('input');
		lock_button.type = 'button';
		if(!player_locked) {
			lock_button.value = 'Lock';
		} else {
			lock_button.value = 'Unlock';
		}
		lock_button.id = id;
		style = buildStyle(custom.style.video_panel.lock, video_panel.lock.style);
		lock_button.setAttribute('style', style);
		div.appendChild(lock_button);
		lock_button.addEventListener("click",function(e) {
			var div = document.getElementById(video_panel.box.id);
			var btn = document.getElementById(video_panel.lock.id);
			if(!player_locked) {
				player_locked = true;
				setDragObject(null);
				btn.value = 'Unlock';
				GetWatchBoxPosition();
				div.style.cursor = 'auto';
			} else {
				player_locked = false;
				setDragObject(div);
				btn.value = 'Lock';
				div.style.cursor = 'move';
			}
		},false);
	}

	if(!player_locked) {
		setDragObject(div);
	}

	if(document.getElementById(setup_box.base.id)) {
		Player_Visible(false);
		window.alert("The video panel is hidden. Close the setup panel to show it.");
	}
}

function MakeStatus(embed) {
	var pid = embed.getAttribute('pid');
	var status = "Resolution: "+queue[pid].video_width+"x"+queue[pid].video_height;
	var ratio = Math.round(queue[pid].video_width/queue[pid].video_height * 1000)/1000;
	status += " Ratio: "+ratio;
	status += " Player size: "+embed.width+"x"+embed.height;
	ratio = Math.round(embed.width/embed.height*1000)/1000;
	status += " Ratio: "+ratio;
	WriteStatusBar(status);
}

function WriteStatusBar(status) {
	var status_bar = document.getElementById(video_panel.status_bar.id);
	if(!status_bar) return;
	status_bar.innerHTML = status;
}

function DownloadVideo(pid) {
	window.location.href = queue[pid]['video_url'];
}

function ChangeLockRatio() {
	var	node = document.getElementById(video_panel.lock_ratio.id);
	if(node) {
		aspect_ratio_locked = node.checked;
		var embed = document.getElementById(video_panel.player.id);
		if(embed) {
			aspect_ratio = embed.width / embed.height;
		}
	}
}

function CloseVideoPanel() {
	var	id = video_panel.box.id;
	var	div = document.getElementById(id);
	if(div) {
		div.setAttribute('style', video_panel.box.close_style);
		div.parentNode.removeChild(div);	// needs this for autoplay
	}
	setDragObject(null);
}

function Update_List_Page() {
	if(custom.list.download_link || custom.list.username || custom.list.resolution || custom.list.duration || 
	   custom.list.video_size || custom.list.added_date) {
		need_information = true;
	}
	for (var pid in queue) {
		if(queue[pid].stat == STORED_DATA) {
			AddMetaData(pid);
		}
	}
	var	div = document.getElementById(video_panel.box.id);
	if(div) {
		setEmbedSize(div);
	}
}

function Update_Video_Panel() {
	var download_button = document.getElementById(video_panel.download.id);
	if(!download_button) {
		return;
	}

	var text = custom.player.download_link_text;
	if(video_panel.download.type == 'button') {
		download_button.value = text;
	} else {
		download_button.innerHTML = text;
	}
	style = buildStyle(custom.style.video_panel.download, video_panel.download.style);
	download_button.setAttribute('style', style);
	if(custom.player.download_link) {
		download_button.style.display = 'block';
	} else {
		download_button.style.display = 'none';
	}
}

function Update_Watch_Page() {

	ChangeStyle();

	var node = document.getElementById(added_box_watch.meta.size_id);
	if(custom.watch.video_size == true) {
		node.setAttribute('style', styles.block_open);
	} else {
		node.setAttribute('style', styles.close);
	}
	node = document.getElementById(added_box_watch.meta.added_id);
	if(custom.watch.added_date == true) {
		node.setAttribute('style', styles.block_open);
	} else {
		node.setAttribute('style', styles.close);
	}
}

// Change style for download link
function ChangeStyle() {

	SetButtonStyle(added_box_watch.download, custom.watch.download_link_text);
	var base_node = document.getElementById(added_box_watch.download.div_id);
	if(custom.watch.download_link) {
		base_node.style.display = "block";
	} else {
		base_node.style.display = "none";
	}
}

// Set button style
function SetButtonStyle(box, link_text) {
	var	base_node = document.getElementById(box.div_id);
	var	anchorlink = document.getElementById(box.anchor_id);
	var	style = buildStyle(custom.style.watch.download,box.div_style);
	var	anchor_style = buildStyle(custom.style.watch.anchor,box.anchor_style);

	base_node.setAttribute('style',style);
	anchorlink.innerHTML = link_text;
	anchorlink.setAttribute('style',anchor_style);
}

// Execute download
function Download() {
	if(!download_url) {
		return;
	}

	window.location.href=download_url;
}

function Center_Position(div) {
	var	height = div.offsetHeight;
	var	width = div.offsetWidth;
	var	top = 0;
	var	left = 0;
	top = (window.innerHeight - height) / 2;
	if(top < 0) {
		top = 0;
	}
	left = (window.innerWidth - width) / 2;
	if(left < 0) {
		left = 0;
	}
	div.style.top = top + 'px';
	div.style.left = left + 'px';
}

function Setup() {
	if(document.getElementById(setup_box.base.id)) return;

	var list_html = Make_Html_For_List_Page();
	var video_html = Make_Html_For_Video_Panel();
	var watch_html = Make_Html_For_Watch_Page();
	var script_html = Make_Html_For_Script_Control();
	var update_html = Make_Html_For_Update_Checker();

	var html = ''+
		'<div style="'+setup_box.base.title_style+'">Set up</div>' +
		'<hr style="'+setup_box.base.hr_style+'" />'+
		'<div style="'+setup_box.base.tabs_style+'">' +
		'<ul style="'+setup_box.base.ul_style+'">' +
		'<li id="'+setup_box.tabs.list.id+'" style="'+setup_box.tabs.list.style_active+'">List<br />page</li>' +
		'<li id="'+setup_box.tabs.video.id+'" style="'+setup_box.tabs.video.style+'">Video<br />panel</li>' +
		'<li id="'+setup_box.tabs.watch.id+'" style="'+setup_box.tabs.watch.style+'">Watch<br />page</li>' +
		'<li id="'+setup_box.tabs.script.id+'" style="'+setup_box.tabs.script.style+'">Script<br />control</li>' +
		'<li id="'+setup_box.tabs.update.id+'" style="'+setup_box.tabs.update.style+'">Update<br />checker</li>' +
		'</ul>'+
		'</div>'+
		'<div id="'+setup_box.tabs.list.box_id+'" style="'+setup_box.base.box_style_active+'">' +
		list_html +
		'</div>'+
		'<div id="'+setup_box.tabs.video.box_id+'" style="'+setup_box.base.box_style+'">' +
		video_html +
		'</div>'+
		'<div id="'+setup_box.tabs.watch.box_id+'" style="'+setup_box.base.box_style+'">' +
		watch_html +
		'</div>'+
		'<div id="'+setup_box.tabs.script.box_id+'" style="'+setup_box.base.box_style+'">' +
		script_html +
		'</div>'+
		'<div id="'+setup_box.tabs.update.box_id+'" style="'+setup_box.base.box_style+'">' +
		update_html +
		'</div>'+
		'</div>'+
		'';

	var base = document.createElement('div');
	base.innerHTML = html;
	base.id = setup_box.base.id;
	base.setAttribute('style', setup_box.base.style);

	var ok = document.createElement('input');
	ok.type = 'button';
	ok.id = setup_box.button.ok_id;
	ok.setAttribute('style',setup_box.button.ok_style);
	ok.value = 'OK';

	var cancel = document.createElement('input');
	cancel.type = 'button';
	cancel.id = setup_box.button.cancel_id;
	cancel.setAttribute('style',setup_box.button.cancel_style);
	cancel.value = 'Cancel';

	var check_now = document.createElement('input');
	check_now.type = 'button';
	check_now.id = setup_box.update.check_now_id;
	check_now.setAttribute('style',setup_box.update.check_now_style);
	check_now.value = 'Check now';

	ok.addEventListener("click",Save_Setup_Information,false);
	cancel.addEventListener("click",Close_Box,false);
	check_now.addEventListener("click",Update_Check_Force,false);

	base.appendChild(ok);
	base.appendChild(cancel);

	document.body.appendChild(base);

	var update_box = document.getElementById(setup_box.tabs.update.box_id);
	update_box.appendChild(check_now);

	var list_tab = document.getElementById(setup_box.tabs.list.id);
	var video_tab = document.getElementById(setup_box.tabs.video.id);
	var watch_tab = document.getElementById(setup_box.tabs.watch.id);
	var script_tab = document.getElementById(setup_box.tabs.script.id);
	var update_tab = document.getElementById(setup_box.tabs.update.id);

	list_tab.setAttribute('stat', 'on');
	video_tab.setAttribute('stat', 'off');
	watch_tab.setAttribute('stat', 'off');
	script_tab.setAttribute('stat', 'off');
	update_tab.setAttribute('stat', 'off');

	list_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);
	video_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);
	watch_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);
	script_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);
	update_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);

	Setup_List_Page();
	Setup_Video_Panel();
	Setup_Watch_Page();
	Setup_Script_Control();
	Setup_Update_Check();

	Center_Position(base);

	Player_Visible(false);

	base.style.cursor = 'move';
	setDragObject(base);
}

function TabClicked(id) {
	var node = document.getElementById(id);
	if(node.getAttribute('stat') == 'on') {
		return;
	}
	var on_tab;
	var clicked_tab;
	for (var i in setup_box.tabs) {
		var tab = document.getElementById(setup_box.tabs[i].id);
		if(tab.getAttribute('stat') == 'on') {
			on_tab = setup_box.tabs[i];
		}
		if(id == setup_box.tabs[i].id) {
			clicked_tab = setup_box.tabs[i];
		}
	}
	ToggleTab(clicked_tab);
	ToggleTab(on_tab);
}

function ToggleTab(param) {
	var node = document.getElementById(param.id);
	var box_node = document.getElementById(param.box_id);
	if(node.getAttribute('stat') == 'on') {
		node.setAttribute('stat','off');
		node.setAttribute('style',param.style);
		box_node.style.display = 'none';
	} else {
		node.setAttribute('stat','on');
		node.setAttribute('style',param.style_active);
		box_node.style.display = 'block';
	}
}


function Save_Setup_Information() {
	if(Check_Options_List_Page() == false) {
		alert("The setting of List page is invalid");
		return ;
	}
	if(Check_Options_Video_Panel() == false) {
		alert("The setting of Video panel is invalid");
		return ;
	}
	if(Check_Options_Watch_Page() == false) {
		alert("The setting of Watch page is invalid");
		return ;
	}

	if(Check_Options_Script_Control() == false) {
		alert("The setting of Script control is invalid");
		return ;
	}

	if(Check_Options_Update_Checker() == false) {
		alert("The setting of Update checker is invalid");
		return ;
	}

	SetSetupDataVersion();
	Save_Options_List_Page();
	Save_Options_Video_Panel();
	Save_Options_Watch_Page();
	Save_Options_Script_Control();
	Save_Options_Update_Checker();
	Save_Options_Others();

	Close_Box();

	if(watch_page == true) {
		Update_Watch_Page();
	} else {
		Update_List_Page();
		Update_Video_Panel();
	}
}

function Setup_Set_Check_Box(id, val, style) {
	var node = document.getElementById(id);
	if(style) {
		node.setAttribute('style',setup_box.checkbox.style + style);
	} else {
		node.setAttribute('style',setup_box.checkbox.style);
	}
	node.checked = val;

	return node;
}

function Setup_Set_Text_Box(id, val) {
	var node = document.getElementById(id);
	node.setAttribute('style',setup_box.textbox.style);
	node.value = val;
}

function Setup_Set_Radio_Button(id, checked) {
	var node = document.getElementById(id);
	node.setAttribute('style',setup_box.radio.style);
	if(checked) {
		node.checked = true;
	} else {
		node.checked = false;
	}
}

function Make_Html_For_List_Page() {
	var html = ''+
		'<ul style="'+setup_box.list.ul_style+'"><b>About link and button</b><br />' +
		'<li style="'+setup_box.list.download_link_style+'"><input type="checkbox" id="'+setup_box.list.download_link_id+'">Download link</li>' +
		'<li style="'+setup_box.list.download_link_text_style+'">Text<input type="text" id="'+setup_box.list.download_link_text_id+'" value="'+custom.list.download_link_text+'"></li>'+
		'<li style="'+setup_box.list.watch_button_style+'"><input type="checkbox" id="'+setup_box.list.watch_button_id+'">Watch video button</li>' +
		'<li style="'+setup_box.list.watch_button_text_style+'">Text<input type="text" id="'+setup_box.list.watch_button_text_id+'" value="'+custom.list.watch_button_text+'"></li>'+
		'</ul>'+
		'<br />'+
		'<ul style="'+setup_box.list.ul_style+'"><b>About video informations</b><br />' +
		'<li style="'+setup_box.list.username_style+'"><input type="checkbox" id="'+setup_box.list.username_id+'">User name</li>' +
		'<li style="'+setup_box.list.duration_style+'"><input type="checkbox" id="'+setup_box.list.duration_id+'">Length</li>' +
		'<li style="'+setup_box.list.resolution_style+'"><input type="checkbox" id="'+setup_box.list.resolution_id+'">Resolution</li>' +
		'<li style="'+setup_box.list.views_style+'"><input type="checkbox" id="'+setup_box.list.views_id+'">Views</li>' +
		'<li style="'+setup_box.list.added_date_style+'"><input type="checkbox" id="'+setup_box.list.added_date_id+'">Added date</li>' +
		'</ul>'+
		'';

	return html;
}

function Setup_List_Page() {

	Setup_Set_Check_Box(setup_box.list.download_link_id, custom.list.download_link);
	Setup_Set_Text_Box(setup_box.list.download_link_text_id, custom.list.download_link_text);
	Setup_Set_Check_Box(setup_box.list.watch_button_id, custom.list.watch_button);
	Setup_Set_Text_Box(setup_box.list.watch_button_text_id, custom.list.watch_button_text);
	Setup_Set_Check_Box(setup_box.list.username_id, custom.list.username);
	Setup_Set_Check_Box(setup_box.list.added_date_id, custom.list.added_date);
	Setup_Set_Check_Box(setup_box.list.duration_id, custom.list.duration);
	Setup_Set_Check_Box(setup_box.list.resolution_id, custom.list.resolution);
	Setup_Set_Check_Box(setup_box.list.views_id, custom.list.views);

}

function Check_Options_List_Page() {
	return true;
}

function Save_Options_List_Page() {
	custom.list.download_link = document.getElementById(setup_box.list.download_link_id).checked;
	custom.list.download_link_text = document.getElementById(setup_box.list.download_link_text_id).value;
	custom.list.username = document.getElementById(setup_box.list.username_id).checked;
	custom.list.duration = document.getElementById(setup_box.list.duration_id).checked;
	custom.list.resolution = document.getElementById(setup_box.list.resolution_id).checked;
	custom.list.views = document.getElementById(setup_box.list.views_id).checked;
	custom.list.added_date = document.getElementById(setup_box.list.added_date_id).checked;
	custom.list.video_size = document.getElementById(setup_box.list.added_date_id).checked;
	custom.list.watch_button = document.getElementById(setup_box.list.watch_button_id).checked;
	custom.list.watch_button_text = document.getElementById(setup_box.list.watch_button_text_id).value;

	SetSetupDataListPage();
}

function Make_Html_For_Video_Panel() {
	var html = ''+
		'<ul style="'+setup_box.video.ul_style+'"><b>About player</b><br />' +
		'<li style="'+setup_box.video.autoplay_style+'"><input type="checkbox" id="'+setup_box.video.autoplay_id+'">Autoplay</li>' +
		'<li style="'+setup_box.video.auto_resize_style+'"><input type="checkbox" id="'+setup_box.video.auto_resize_id+'">Auto Resize</li>' +
		'<li style="'+setup_box.video.lock_ratio_style+'"><input type="checkbox" id="'+setup_box.video.lock_ratio_id+'">Lock aspect ratio</li>'+
		'<li style="'+setup_box.video.width_style+'">Player width <input type="text" id="'+setup_box.video.width_id+'" size="4" value="'+custom.player.player_width+'"> px' +
		'</li>'+
		'<li style="'+setup_box.video.height_style+'">Player height<input type="text" id="'+setup_box.video.height_id+'" size="4" value="'+custom.player.player_height+'"> px ' +
		'<input type="checkbox" id="'+setup_box.video.fit_aspect_ratio_id+'">Fit aspect ratio'+
		'</li>'+
		'<li style="'+setup_box.video.min_width_style+'">Useful range (width) <input type="text" id="'+setup_box.video.min_width_id+'" size="4" value="'+custom.player.min_width+'"> - '+
		'<input type="text" id="'+setup_box.video.max_width_id+'" size="4" value="'+custom.player.max_width+'"> px</li>'+
		'<li style="'+setup_box.video.min_height_style+'">Useful range (height) <input type="text" id="'+setup_box.video.min_height_id+'" size="4" value="'+custom.player.min_height+'"> - '+
		'<input type="text" id="'+setup_box.video.max_height_id+'" size="4" value="'+custom.player.max_height+'"> px</li>'+
		'</ul>'+
		'<ul style="'+setup_box.video.ul_style+'"><b>About items on the panel</b><br />' +
		'<li style="'+setup_box.video.download_link_style+'"><input type="checkbox" id="'+setup_box.video.download_link_id+'">Download link</li>' +
		'<li style="'+setup_box.video.download_link_text_style+'">Text<input type="text" id="'+setup_box.video.download_link_text_id+'" value="'+custom.player.download_link_text+'"></li>'+
		'</ul>'+
		'';

	return html;
}

function Setup_Video_Panel() {

	Setup_Set_Check_Box(setup_box.video.autoplay_id, custom.player.autoplay);
	Setup_Set_Check_Box(setup_box.video.auto_resize_id, custom.player.auto_resize);
	Setup_Set_Check_Box(setup_box.video.lock_ratio_id, custom.player.lock_ratio);
	Setup_Set_Text_Box(setup_box.video.width_id, custom.player.player_width);
	Setup_Set_Text_Box(setup_box.video.height_id, custom.player.player_height);
	Setup_Set_Check_Box(setup_box.video.fit_aspect_ratio_id, custom.player.fit_aspect_ratio);
	Setup_Set_Text_Box(setup_box.video.min_width_id, custom.player.min_width);
	Setup_Set_Text_Box(setup_box.video.min_height_id, custom.player.min_height);
	Setup_Set_Text_Box(setup_box.video.max_width_id, custom.player.max_width);
	Setup_Set_Text_Box(setup_box.video.max_height_id, custom.player.max_height);
	Setup_Set_Check_Box(setup_box.video.download_link_id, custom.player.download_link);
	Setup_Set_Text_Box(setup_box.video.download_link_text_id, custom.player.download_link_text);

}

function Check_Options_Video_Panel() {
	var player_width = parseInt(document.getElementById(setup_box.video.width_id).value);
	var player_height = parseInt(document.getElementById(setup_box.video.height_id).value);
	var min_width = parseInt(document.getElementById(setup_box.video.min_width_id).value);
	var min_height = parseInt(document.getElementById(setup_box.video.min_height_id).value);
	var max_width = parseInt(document.getElementById(setup_box.video.max_width_id).value);
	var max_height = parseInt(document.getElementById(setup_box.video.max_height_id).value);
	if(player_width < MIN_WIDTH) return false;
	if(player_height < MIN_HEIGHT) return false;
	if(player_width > MAX_WIDTH) return false;
	if(player_height > MAX_HEIGHT) return false;
	if(max_width < MIN_WIDTH) return false;
	if(max_height < MIN_HEIGHT) return false;
	if(max_width > MAX_WIDTH) return false;
	if(max_height > MAX_HEIGHT) return false;
	if(min_width < MIN_WIDTH) return false;
	if(min_height < MIN_HEIGHT) return false;
	if(min_width > MAX_WIDTH) return false;
	if(min_height > MAX_HEIGHT) return false;
	if(min_width > max_width) return false;
	if(min_height > max_height) return false;
	if(player_width < min_width) return false;
	if(player_height < min_height) return false;
	if(player_width > max_width) return false;
	if(player_height > max_height) return false;
	return true;
}

function Save_Options_Video_Panel() {
	custom.player.autoplay = document.getElementById(setup_box.video.autoplay_id).checked;
	custom.player.auto_resize = document.getElementById(setup_box.video.auto_resize_id).checked;
	custom.player.lock_ratio = document.getElementById(setup_box.video.lock_ratio_id).checked;
	custom.player.player_width = parseInt(document.getElementById(setup_box.video.width_id).value);
	custom.player.player_height = parseInt(document.getElementById(setup_box.video.height_id).value);
	custom.player.fit_aspect_ratio = document.getElementById(setup_box.video.fit_aspect_ratio_id).checked;
	custom.player.min_width = parseInt(document.getElementById(setup_box.video.min_width_id).value);
	custom.player.min_height = parseInt(document.getElementById(setup_box.video.min_height_id).value);
	custom.player.max_width = parseInt(document.getElementById(setup_box.video.max_width_id).value);
	custom.player.max_height = parseInt(document.getElementById(setup_box.video.max_height_id).value);
	custom.player.download_link = document.getElementById(setup_box.video.download_link_id).checked;
	custom.player.download_link_text = document.getElementById(setup_box.video.download_link_text_id).value;

	SetSetupDataVideoPanel();
}

function Make_Html_For_Watch_Page() {
	var html = ''+
		'<ul style="'+setup_box.watch.ul_style+'"><b>About button</b><br />' +
		'<li style="'+setup_box.watch.download_link_style+'">'+
		'<input type="checkbox" id="'+setup_box.watch.download_link_id+'">Download button</li>' +
		'<li style="'+setup_box.watch.download_link_text_style+'">Text<input type="text" id="'+setup_box.watch.download_link_text_id+'" size="60" value="'+custom.watch.download_link_text+'">' +
		'</li>'+
		'<li style="'+setup_box.watch.text_color_style+'">Text color <input type="text" id="'+setup_box.watch.text_color_id+'" value="'+custom.style.watch.anchor.text_color+'">' +
		'</li>'+
		'<li style="'+setup_box.watch.bg_color_style+'">Backgroud color <input type="text" id="'+setup_box.watch.bg_color_id+'" value="'+custom.style.watch.anchor.bg_color+'">' +
		'</li>'+
		'<li style="'+setup_box.watch.bg_image_style+'">Backgroud image <input type="text" id="'+setup_box.watch.bg_image_id+'" size="45" value="'+custom.style.watch.anchor.bg_image+'">' +
		'</li>'+
		'</ul>'+
		'<br />'+
		'<ul style="'+setup_box.watch.ul_style+'"><b>About video informations</b><br />' +
		'<li style="'+setup_box.watch.video_size_style+'">'+
		'<input type="checkbox" id="'+setup_box.watch.video_size_id+'">Video file size</li>' +
		'<li style="'+setup_box.watch.added_date_style+'">'+
		'<input type="checkbox" id="'+setup_box.watch.added_date_id+'">Added date</li>' +
		'</ul>'+
		'<br />'+
		'<ul style="'+setup_box.watch.ul_style+'"><b>About player</b><br />' +
		'<li style="'+setup_box.watch.autoplay_style+'">'+
		'<input type="checkbox" id="'+setup_box.watch.autoplay_id+'">Autoplay</li>' +
		'</ul>'+
		'';

	return html;
}

function Setup_Watch_Page() {

	Setup_Set_Check_Box(setup_box.watch.download_link_id, custom.watch.download_link);
	Setup_Set_Text_Box(setup_box.watch.download_link_text_id, custom.watch.download_link_text);
	Setup_Set_Text_Box(setup_box.watch.text_color_id, custom.style.watch.anchor.text_color);
	Setup_Set_Text_Box(setup_box.watch.bg_color_id, custom.style.watch.anchor.bg_color);
	Setup_Set_Text_Box(setup_box.watch.bg_image_id, custom.style.watch.anchor.bg_image);
	Setup_Set_Check_Box(setup_box.watch.video_size_id, custom.watch.video_size);
	Setup_Set_Check_Box(setup_box.watch.added_date_id, custom.watch.added_date);
	Setup_Set_Check_Box(setup_box.watch.autoplay_id, custom.watch.autoplay);

}

function Check_Options_Watch_Page() {
	return true;
}

function Save_Options_Watch_Page() {
	custom.watch.download_link = document.getElementById(setup_box.watch.download_link_id).checked;
	custom.watch.download_link_text = document.getElementById(setup_box.watch.download_link_text_id).value;
	custom.style.watch.anchor.text_color = document.getElementById(setup_box.watch.text_color_id).value;
	custom.style.watch.anchor.bg_color = document.getElementById(setup_box.watch.bg_color_id).value;
	custom.style.watch.anchor.bg_image = document.getElementById(setup_box.watch.bg_image_id).value;
	custom.watch.video_size = document.getElementById(setup_box.watch.video_size_id).checked;
	custom.watch.added_date = document.getElementById(setup_box.watch.added_date_id).checked;
	custom.watch.autoplay = document.getElementById(setup_box.watch.autoplay_id).checked;

	SetSetupDataWatchPage();
}

// for script control tab
function Make_Html_For_Script_Control() {
	var html = ''+
		'<ul style="'+setup_box.script.ul_style+'"><b>About queue control</b><br />' +
		'<li style="'+setup_box.script.check_interval_style+'">Check interval<input type="text" id="'+setup_box.script.check_interval_id+'" size="2">sec' +
		' (' + MIN_INTERVAL + '-' + MAX_INTERVAL +')</li>' +
		'<li style="'+setup_box.script.check_interval_done_style+'">Check interval after finished the process of all videos<input type="text" id="'+setup_box.script.check_interval_done_id+'" size="2">sec' +
		' (' + MIN_INTERVAL + '-' + MAX_INTERVAL +')</li>' +
		'<li style="'+setup_box.script.max_send_request_style+'">Upper limit of sending HTTP request<input type="text" id="'+setup_box.script.max_send_request_id+'" size="2">' +
		' (' + MIN_MAX_SEND + '-' + MAX_MAX_SEND +')</li>' +
		'<li style="'+setup_box.script.max_wait_limit_style+'">Upper limit of waiting HTTP response<input type="text" id="'+setup_box.script.max_wait_limit_id+'" size="3">sec' +
		' (' + MIN_MAX_WAIT + '-' + MAX_MAX_WAIT +')</li>' +
		'<li style="'+setup_box.script.max_retry_style+'">Upper limit of retrying<input type="text" id="'+setup_box.script.max_retry_id+'" size="2">times' +
		' (' + MIN_MAX_RETRY + '-' + MAX_MAX_RETRY +')</li>' +
		'</ul>'+
		'';
	return html;
}

function Setup_Script_Control() {

	Setup_Set_Text_Box(setup_box.script.check_interval_id, parseInt(custom.queue.check_interval / 1000));
	Setup_Set_Text_Box(setup_box.script.check_interval_done_id, parseInt(custom.queue.check_interval_done / 1000));
	Setup_Set_Text_Box(setup_box.script.max_send_request_id, custom.queue.max_send_request);
	Setup_Set_Text_Box(setup_box.script.max_wait_limit_id, parseInt(custom.queue.max_wait_limit / 1000));
	Setup_Set_Text_Box(setup_box.script.max_retry_id, custom.queue.max_retry);

}

function Check_Options_Script_Control() {
	if(/^\d+$/.test(document.getElementById(setup_box.script.check_interval_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.check_interval_done_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.max_send_request_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.max_wait_limit_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.max_retry_id).value) == false)  return false;

	var interval = parseInt(document.getElementById(setup_box.script.check_interval_id).value);
	var interval_done = parseInt(document.getElementById(setup_box.script.check_interval_done_id).value);
	var max_send = parseInt(document.getElementById(setup_box.script.max_send_request_id).value);
	var max_wait = parseInt(document.getElementById(setup_box.script.max_wait_limit_id).value);
	var max_retry = parseInt(document.getElementById(setup_box.script.max_retry_id).value);
	if(interval < MIN_INTERVAL) return false;
	if(interval_done < MIN_INTERVAL) return false;
	if(max_send < MIN_MAX_SEND) return false;
	if(max_wait < MIN_MAX_WAIT) return false;
	if(max_retry < MIN_MAX_RETRY) return false;
	if(interval > MAX_INTERVAL) return false;
	if(interval_done > MAX_INTERVAL) return false;
	if(max_send > MAX_MAX_SEND) return false;
	if(max_wait > MAX_MAX_WAIT) return false;
	if(max_retry > MAX_MAX_RETRY) return false;
	return true;
}

function Save_Options_Script_Control() {
	custom.queue.check_interval = document.getElementById(setup_box.script.check_interval_id).value * 1000;
	custom.queue.check_interval_done = document.getElementById(setup_box.script.check_interval_done_id).value * 1000;
	custom.queue.max_send_request = document.getElementById(setup_box.script.max_send_request_id).value;
	custom.queue.max_wait_limit = document.getElementById(setup_box.script.max_wait_limit_id).value * 1000;
	custom.queue.max_retry = document.getElementById(setup_box.script.max_retry_id).value;
	SetSetupDataScriptControl();

}

function Save_Options_Others() {
	SetSetupDataStyle();
	SetSetupDataOthers();
}

function Player_Visible(mode) {
	var node = document.getElementById(video_panel.box.id);
	if(node) {
		if(mode == true) {
			node.style.visibility = '';
		} else {
			node.style.visibility = 'hidden';
		}
	}
}


function Close_Box() {
	var base = document.getElementById(setup_box.base.id);
	setDragObject(null);
	document.body.removeChild(base);
	Player_Visible(true);
}


function GetEmbedCode(id)
{
	var pid = document.getElementById(id).getAttribute('pid');
	var url = buildURL(pid, WATCH_URL);
	setTimeout(function(){
		GM_xmlhttpRequest({
			pid: pid,
			method:"GET",
			url: encodeURI(url),
			headers:{
				"User-Agent":"Mozilla/4.0 (compatible; MSIE 6.0; Win32)",
				"Accept":"*/*"
			},
			onload: function(xhr){
				var text = xhr.responseText;
				var pid = this.pid;
				if ( xhr.status != 200 ) {	// failed
					GM_log(xhr.status + ': ' + text);
					return;
				}
				var VideoInfo = ParseSourceXml(text);
				queue[pid]['embedCode'] = VideoInfo['embedCode'];
				if(!queue[pid]['embedCode']) {
					alert("Can't get embed code\nError message:"+VideoInfo['VideoMovie']);
					GM_log("Can't get embed code\nError message:"+VideoInfo['VideoMovie']);
					return;
				}
	//			queue[pid]['title'] = VideoInfo['title'];
				CloseVideoPanel();
				WatchVideo(id);
			}
		});
	},0);
}

// Get Header information
function GetHeaderInformation()
{
	if(custom.watch.video_size == false && custom.watch.added_date == false) return;
	if(!download_url) {
		return;
	}

	if(download_url_prev == download_url &&
	   (document.getElementById(added_box_watch.meta.size_id) || document.getElementById(added_box_watch.meta.added_id))) {
		return;
	}
	download_url_prev = download_url;
//	var	referer = window.location.href;	// I cannot send referer.
	pidmap[download_url] = '';
	RequestHeaderInformation(download_url);
	GetHeaderInformationPreviewImage();
}

// Get Header information of the preview image
function GetHeaderInformationPreviewImage()
{
//	if(custom.watch.video_size == false && custom.watch.added_date == false) return;
	if(!preview_image_url) {
		return;
	}

	if(preview_image_url_prev == preview_image_url &&
	   document.getElementById(added_box_watch.meta.added_id)) {
		return;
	}
	preview_image_url_prev = preview_image_url;
	pidmap[preview_image_url] = '';
	RequestHeaderInformation(preview_image_url);
}

function RequestHeaderInformation(url)
{
	if(!url) return;

//	var	ext = /\.jpg$/.test(url);
	var	method;
	var	headers = {};
//	if(ext) {
		method = "HEAD";
		headers = {
			"User-Agent":"Mozilla/4.0 (compatible; MSIE 6.0; Win32)",
			"Accept":"*/*"
		};
//	} else {
//		method ="GET";
//		headers = {
//			"User-Agent":"Mozilla/4.0 (compatible; MSIE 6.0; Win32)",
//			"Range":"bytes=0-1",
//			"Accept":"*/*"
//		};
//	}

	setTimeout(function(){
		GM_xmlhttpRequest({
			method: method,
			url: encodeURI(url),
			headers: headers,
			onload: function(xhr){
				var headers = xhr.responseHeaders;
				if ( xhr.status != 200 &&
				     xhr.status != 206) {	// failed
					GM_log(xhr.status + ': ' + headers);
					return;
				}
				var mode;
				var ext = /\.jpg$/.test(xhr.finalUrl);

				if(ext) {
					mode = 1;
					pid = pidmap[xhr.finalUrl];
				} else {
					mode = 0;
					var permalinkid = xhr.finalUrl.match(/\/([^\/]+)$/)[1];
					pid = pidmap[permalinkid];
				}
				ParseResponseHeaders(headers, mode, pid);
				if(watch_page == true) {
					AddMetaData_Watch(mode);
				} else {
					WaitMessage(pid, 0);
					AddMetaData(pid);
				}
			}
		});
	},0);
}


// Get Header information for list page
function GetHeaderInformationList(pid)
{
	if(custom.list.video_size == false && custom.list.added_date == false) return;

//	var	referer = window.location.href;	// I cannot send referer.
	if(queue[pid]['video_url']) {
		var permalinkid = queue[pid]['video_url'].match(/\/\d+?\/(.*?)\?/)[1];
		pidmap[permalinkid] = pid;
	}
	pidmap[queue[pid]['previewimage_url']] = pid;

	if(custom.list.added_date) {
		RequestHeaderInformation(queue[pid]['previewimage_url']);
	}
	if(custom.list.video_size) {
		RequestHeaderInformation(queue[pid]['video_url']);
	}
}

function ParseResponseHeaders(headers, target, pid) {
	if(target == 0) {	// video only
		if(!document.getElementById(added_box_watch.meta.size_id)) {
			var size = GetContentLength(headers);
			if(pid) {
				queue[pid]['size'] = size;
			} else {
				header_info.size = size;
			}
		}
	}
	if(!document.getElementById(added_box_watch.meta.added_id)) {
		var added = GetAddedDate(headers);
		if(pid) {
			queue[pid]['addedDate'] = added.replace(' GMT','');
		} else {
			header_info.added = added;
		}
	}
}

function AddMetaData_Watch(target) {
	var xp = document.evaluate('//div[@id="right-small"]/div[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var l=xp.snapshotLength;
	if(l == 0) {
		return;
	}
	var div = xp.snapshotItem(0);
	if(target == 0) {	// video only
		if(!document.getElementById(added_box_watch.meta.size_id)) {
			AddContentLength(div, header_info.size);
		}
	}
	if(!document.getElementById(added_box_watch.meta.added_id)) {
		AddAddedDate(div, header_info.added);
	}
}

function GetContentLength(headers) {
	var size = '';
	p = headers.match(/Content-Length: (\d+)/);
	if(p) {
		var cont_len = RegExp.$1;
		var cont_len_kb = parseInt(cont_len / 1024);
		var cont_len_mb = Math.round(cont_len / (1024*1024));
		if(cont_len_mb >= 10) {
			size = size + cont_len_mb + ' MB';
		} else {
			size = size + cont_len_kb + ' KB';
		}
		size = size + '(' + cont_len + ' B)';
	}
	return size;
}

function GetAddedDate(headers) {
	var added = '';
	var p = headers.match(/Last-Modified: (.*)/);
	if(p) {
		var datestr = RegExp.$1;
		var disp_str = datestr.substr(5);
//		var monthstr = ["Jan","Feb","Mar","Apl","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
//		var da = datestr.split(/[ ,]/);
//		p = ("0"+(monthstr.indexOf(da[3])+1)).substr(-2);
//		da[3] = da[2];
//		da[2] = p;
//		var disp_str = da.slice(2,5).join('/')+" "+da.slice(5,7).join(' ');
		added = disp_str;
	}
	return added;
}

function AddContentLength(div, size) {
	if(size) {
		p = document.createElement('p');
		p.id = added_box_watch.meta.size_id;
		p.innerHTML = '<strong>Size:</strong> '+size;
		div.parentNode.insertBefore(p, div);
		if(custom.watch.video_size == false) {
			p.setAttribute('style', styles.close);
		}
	}
}

function AddAddedDate(div, disp_str) {
	if(disp_str) {
		var p = document.createElement('p');
		p.id = added_box_watch.meta.added_id;
		p.innerHTML = '<strong>Added:</strong> '+disp_str;
		div.parentNode.insertBefore(p, div);
		if(custom.watch.added_date == false) {
			p.setAttribute('style', styles.close);
		}
	}
}



////// for update checker
var	force_check = false;

function IsNecessaryUpdateCheck() {
	var now = new Date();
	var now_yy = now.getYear();
	var now_mm = now.getMonth();
	var now_dd = now.getDate();
	var now_day = now.getDay();
	var dist = now.getTime()/(1000 * 60 * 60 * 24) - update_check.last_check_date/(1000 * 60 * 60 * 24);
	dist =  Math.floor(dist);

	var prev = new Date();
	prev.setTime(update_check.last_check_date);
	var yy = prev.getYear();
	var mm = prev.getMonth();
	var dd = prev.getDate();
	var day = prev.getDay();

	switch(update_check.type) {
	case ONCE_A_DAY:
		if(yy != now_yy ||
		   mm != now_mm ||
		   dd != now_dd) return true;
		break;
	case ONCE_A_WEEK:
		if(update_check.specified_day == ANY_DAY) {
			if(day > now_day) {
				return true;
			} else if(day == now_day) {
				if(yy != now_yy ||
				   mm != now_mm ||
				   dd != now_dd) return true;
			} else {
				if(now_day < dist) return true;
			}
		} else 
		if(update_check.specified_day == now_day) {
			if(yy != now_yy ||
			   mm != now_mm ||
			   dd != now_dd) return true;
		}
		break;
	case ONCE_A_MONTH:
		if(yy != now_yy) return true;
		if(mm != now_mm) return true;
		break;
	}
	return false;
}

function ParseScriptPage(text)
{
	var data = {version:'', title:"Unknown" };
	var div = document.createElement('div');
	div.innerHTML = text;

	var node = document.evaluate('.//h1[@class="title"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node) {
		data.title = node.textContent;
	}

	var node = document.evaluate('.//*[@id="summary"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node) {
		var ver = node.textContent.match(/Version:[\n|\s]*(.*?)\n/)[1];
		if(ver) {
			data.version = ver;
		}
	}

	return data;

}

function CheckScriptVersion(version) {
	var work = THIS_VER.split('.');
	var major_ver = parseInt(work[0]);
	var minor_ver = parseInt(work[1]);
	var sub_ver = 0;
	if(work[2]) sub_ver = parseInt(work[2]);
	work = version.split('.');
	var major_ver_uso = parseInt(work[0]);
	var minor_ver_uso = parseInt(work[1]);
	var sub_ver_uso = 0;
	if(work[2]) sub_ver_uso = parseInt(work[2]);
	if(major_ver < major_ver_uso) {
		return true;
	}
	if(major_ver == major_ver_uso &&
	   minor_ver < minor_ver_uso) {
		return true;
	}
	if(major_ver == major_ver_uso &&
	   minor_ver == minor_ver_uso &&
	   sub_ver < sub_ver_uso) {
		return true;
	}
	return false;
}

function DispMessage(title, html, base_style) {
	var base = document.createElement('div');
	base.id = MSGBOX_ID;
	base.setAttribute('style', 'position:fixed;top:0px;left:0px;height:60px;padding-right:140px;z-index:200000;'+base_style);
	var node = document.createElement('div');
	node.innerHTML = title + " (V"+THIS_VER+")";
	node.setAttribute('style', 'color:#000000;font-size:20px;margin-left:10px;height:30px;');
	base.appendChild(node);
	node = document.createElement('div');
	node.innerHTML = html;
	node.setAttribute('style', 'color:#000000;font-size:20px;margin-left:10px;height:30px;');
	base.appendChild(node);

	var setup = document.createElement('input');
	setup.type = "button";
	setup.value = "Set up";
	setup.addEventListener('click', Setup, false);
	setup.setAttribute('style', 'position:absolute; right:60px; bottom:5px; height:24px;width:60px;margin-left:20px;border:3px outset buttonface;background-color:buttonface;color:#000000;font-weight:bold;cursor:pointer;');
	base.appendChild(setup);

	var close = document.createElement('input');
	close.type = "button";
	close.value = "X";
	close.addEventListener('click', function(e) {
			var id = MSGBOX_ID;
			var node = document.getElementById(id);
			if(node) {
				node.parentNode.removeChild(node);
			}
			update_check.last
		}, false);
	close.setAttribute('style', 'position:absolute; right:5px; top:5px; height:28px;width:28px;margin-left:20px;border:3px outset buttonface;background-color:buttonface;color:#000000;font-weight:bold;font-size:12px;cursor:pointer;');
	base.appendChild(close);

	document.body.appendChild(base);
}

function DispUpdateCheckError(data) {
	var html = "Can't get script information from USO."+'Visit <a href="'+THIS_URL+'" style="text-decoration:underline;color:#0044FF;">the script page</a>.</span>';
	DispMessage(data.title, html, "background-color:#FF00FF;");
}

function DispUpdateMessage(data) {
	var html = 'V'+data.version+' has been released. Visit <a href="'+THIS_URL+'" style="text-decoration:underline;color:#0044FF;">the script page</a>.</span>';
	DispMessage(data.title, html, "background-color:#FFFF00;");
}

function DispNoUpdateMessage(data) {
	var html = 'A new version has not been released.';
	DispMessage(data.title, html, "background-color:#00FFFF;");
}

function ExecuteUpdateCheck() {
	setTimeout(function(){
		GM_xmlhttpRequest({
			method:"GET",
			url: THIS_URL,
			headers:{
				"User-Agent": "Mozilla/4.0 (compatible; MSIE 6.0; Win32)",
				"Accept":"*/*",
				"Accept-Language":"en-us"
			},
			onload: function(xhr){
				var text = xhr.responseText;
				if ( xhr.status != 200 ) {	// failed
					var data = {title: "HTTP Error "+xhr.status, version:""};
					DispUpdateCheckError(data);
					GM_log(xhr.status + ': ' + text);
					return;
				}
				update_check.last_check_date = (new Date()).getTime();
				SetSetupDataUpdateCheck();
				var data = ParseScriptPage(text);
				if(data.version) {
					if(CheckScriptVersion(data.version)) {
						DispUpdateMessage(data);
					} else if(force_check == true){
						DispNoUpdateMessage(data);
						force_check = false;
					}
				} else {
					DispUpdateCheckError(data);
				}
			}
		});
	},0);
}

function UpdateCheck(mode) {
	if(mode == true) {
		ExecuteUpdateCheck();
	} else {
		switch(update_check.type) {
		case NO_CHECK:
			break;
		case EVERY_LOADING:
			ExecuteUpdateCheck();
			break;
		case ONCE_A_DAY:
		case ONCE_A_WEEK:
		case ONCE_A_MONTH:
			if(IsNecessaryUpdateCheck()) {
				ExecuteUpdateCheck();
			}
			break;
		}
	}
}

function Update_Check_Force() {
	force_check = true;
	UpdateCheck(true);
}

function Make_Html_For_Update_Checker() {
	var html = ''+
		'<ul style="'+setup_box.update.ul_style+'"><b>About check pattern</b><br />' +
		'<li style="'+setup_box.update.li_style+'"><input type="radio" name="'+setup_box.update.type_name+'" id="'+setup_box.update.no_check_id+'">No check</li>' +
		'<li style="'+setup_box.update.li_style+'"><input type="radio" name="'+setup_box.update.type_name+'" id="'+setup_box.update.every_loading_id+'">Every loading</li>' +
		'<li style="'+setup_box.update.li_style+'"><input type="radio" name="'+setup_box.update.type_name+'" id="'+setup_box.update.once_a_day_id+'">Once a day</li>' +
		'<li style="'+setup_box.update.li_style+'"><input type="radio" name="'+setup_box.update.type_name+'" id="'+setup_box.update.once_a_week_id+'">Once a week</li>' +
		'<div id="'+setup_box.update.day_box_id+'" style="'+setup_box.update.day_box_style+'">' +
		'<ul style="'+setup_box.update.ul_style+'">' +
		'<li style="'+setup_box.update.li_style+'">' +
		'<input type="radio" name="'+setup_box.update.day_name+'" id="'+setup_box.update.any_day_id+'">Any day' +
		'<input type="radio" name="'+setup_box.update.day_name+'" id="'+setup_box.update.sunday_id+'">Sunday' +
		'<input type="radio" name="'+setup_box.update.day_name+'" id="'+setup_box.update.monday_id+'">Monday' +
		'<input type="radio" name="'+setup_box.update.day_name+'" id="'+setup_box.update.tuesday_id+'">Tuesday' +
		'</li>'+
		'<li style="'+setup_box.update.li_style+'">'+
		'<input type="radio" name="'+setup_box.update.day_name+'" id="'+setup_box.update.wednesday_id+'">Wednesday' +
		'<input type="radio" name="'+setup_box.update.day_name+'" id="'+setup_box.update.thursday_id+'">Thursday' +
		'<input type="radio" name="'+setup_box.update.day_name+'" id="'+setup_box.update.friday_id+'">Friday' +
		'<input type="radio" name="'+setup_box.update.day_name+'" id="'+setup_box.update.saturday_id+'">Saturday' +
		'</li>'+
		'</ul>'+
		'</div>'+
		'<li style="'+setup_box.update.li_style+'"><input type="radio" name="'+setup_box.update.type_name+'" id="'+setup_box.update.once_a_month_id+'">Once a month</li>' +
		'</ul>'+
		'';
	return html;
}

function Setup_Update_Check() {

	Setup_Set_Radio_Button(setup_box.update.no_check_id, (update_check.type == NO_CHECK));
	Setup_Set_Radio_Button(setup_box.update.every_loading_id, (update_check.type == EVERY_LOADING));
	Setup_Set_Radio_Button(setup_box.update.once_a_day_id, (update_check.type == ONCE_A_DAY));
	Setup_Set_Radio_Button(setup_box.update.once_a_week_id, (update_check.type == ONCE_A_WEEK));
	Setup_Set_Radio_Button(setup_box.update.once_a_month_id, (update_check.type == ONCE_A_MONTH));
	Setup_Set_Radio_Button(setup_box.update.any_day_id, (update_check.specified_day == ANY_DAY));
	Setup_Set_Radio_Button(setup_box.update.sunday_id, (update_check.specified_day == SUNDAY));
	Setup_Set_Radio_Button(setup_box.update.monday_id, (update_check.specified_day == MONDAY));
	Setup_Set_Radio_Button(setup_box.update.tuesday_id, (update_check.specified_day == TUESDAY));
	Setup_Set_Radio_Button(setup_box.update.wednesday_id, (update_check.specified_day == WEDNESDAY));
	Setup_Set_Radio_Button(setup_box.update.thursday_id, (update_check.specified_day == THURSDAY));
	Setup_Set_Radio_Button(setup_box.update.friday_id, (update_check.specified_day == FRIDAY));
	Setup_Set_Radio_Button(setup_box.update.saturday_id, (update_check.specified_day == SATURDAY));

}

function Check_Options_Update_Checker() {
	return true;
}

function Save_Options_Update_Checker() {

	var type;
	if(document.getElementById(setup_box.update.no_check_id).checked == true) {
		type = NO_CHECK;
	} else
	if(document.getElementById(setup_box.update.every_loading_id).checked == true) {
		type = EVERY_LOADING;
	} else
	if(document.getElementById(setup_box.update.once_a_day_id).checked == true) {
		type = ONCE_A_DAY;
	} else
	if(document.getElementById(setup_box.update.once_a_week_id).checked == true) {
		type = ONCE_A_WEEK;
	} else
	if(document.getElementById(setup_box.update.once_a_month_id).checked == true) {
		type = ONCE_A_MONTH;
	}
	update_check.type = type;

	var day;
	if(document.getElementById(setup_box.update.any_day_id).checked == true) {
		day = ANY_DAY;
	} else
	if(document.getElementById(setup_box.update.sunday_id).checked == true) {
		day = SUNDAY;
	} else
	if(document.getElementById(setup_box.update.monday_id).checked == true) {
		day = MONDAY;
	} else
	if(document.getElementById(setup_box.update.tuesday_id).checked == true) {
		day = TUESDAY;
	} else
	if(document.getElementById(setup_box.update.wednesday_id).checked == true) {
		day = WEDNESDAY;
	} else
	if(document.getElementById(setup_box.update.thursday_id).checked == true) {
		day = THURSDAY;
	} else
	if(document.getElementById(setup_box.update.friday_id).checked == true) {
		day = FRIDAY;
	} else
	if(document.getElementById(setup_box.update.saturday_id).checked == true) {
		day = SATURDAY;
	} else {
		return;	// bug
	}
	update_check.specified_day = day;

	SetSetupDataUpdateCheck();

}

})();
