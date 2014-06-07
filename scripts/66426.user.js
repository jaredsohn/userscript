// ==UserScript==
// @name           Adds a link to download video for Dailymotion
// @namespace      http://userscripts.org/users/76078
// @version        0.8.2
// @author         charmy
// @description    Adds a link to download video and a button to watch video for Dailymotion
// @include        http://www.dailymotion.com/*
// ==/UserScript==

(function() {

// for update check
const THIS_SCRIPT_NO = '57093';
const THIS_URL = 'http://userscripts.org/scripts/show/'+THIS_SCRIPT_NO;
const THIS_VER = '0.8.2';
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
const	DEFAULT_PLAYER_WIDTH = 640;	// original value is 640
const	DEFAULT_PLAYER_HEIGHT = 480;	// original value is 480

// for list page
var	need_title = false;
var	need_views = false;

// for script control
const NONE = 0;
const SENT_REQUEST = 1;
const RECEIVED_RESPONSE = 2;
const STORED_DATA = 3;
const NOT_RECEIVED = 4;
const CLONE_DATA = 9;

const MAX_SEND_REQUEST = 10;		// up to 10 http request at the same time
const QUEUE_CHECK_INTERVAL = 5*1000;	// 5 sec.
const QUEUE_CHECK_INTERVAL_DONE = 10*1000;	// 10 sec.
const MAX_WAIT_LIMIT = 120*1000;	// 120 sec
const MAX_RETRY = 3;			// 3 times

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

var queue = new Array();

var video_format = {
	H264_HD: {
		type: 'VIDEO_MP4_TYPE',
		key: "h264-hd",
		text: "MP4 HD"
	},
	H264_HQ: {
		type: 'VIDEO_MP4_TYPE',
		key: "h264-hq",
		text: "MP4 HQ"
	},
	H264: {
		type: 'VIDEO_MP4_TYPE',
		key: "h264",
		text: "MP4"
	},
	FLV: {
		type: 'VIDEO_FLV_TYPE',
		key: "spark",
		text: "FLV"
	},
	FLV_mini: {
		type: 'VIDEO_FLV_TYPE',
		key: "spark-mini",
		text: "FLV mini"
	},
};

// for format_type
const FT_WITH_FMT_STR = 2;	// title (xxx)	 (xxx = H264_HD,H264_HQ,H264,FLV,FLV_mini)
const FT_WITH_FMT_STR_TEXT = 3;	// title (xxx)	 (xxx = MP4 HD,MP4 HQ,MP4,FLV,FLV mini)
const FT_TITLE_ONLY = 4;	// title only

// You can customize initial value.
const SETUP_VERSION = 5;
var custom = {
	setup_version: 0,
	player: {
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
		download_link_text: 'Download video',
	},
	extention: {
		VIDEO_FLV_TYPE: '.flv',
		VIDEO_MP4_TYPE: '.mp4',
	},
	format_type: {
		filename: FT_WITH_FMT_STR,
		list: FT_WITH_FMT_STR_TEXT,
		watch: FT_WITH_FMT_STR,
		video_panel: FT_WITH_FMT_STR_TEXT,
	},
	list: {
		download_link: true,
		uploaded: true,
		comments: true,
		favorites: true,
		watch_button: true,
		title: false,
		views: false,
		remove_veil: false,
		force_button: false,
		download_link_text: 'Download',
		watch_button_text: 'Watch Video',
	},
	watch: {
		download_link: true,
		autoplay: true,	// not supported
		watch_explicit: false,
		include_video_type: false,
		download_link_text: 'DOWNLOAD',
	},
	fmt: {
		watch: {
			FLV_mini: false,	// FLV mini
			FLV: true,		// FLV
			H264: true,		// H264
			H264_HQ: true,		// H264 HQ
			H264_HD: true,		// H264 HD
		},
		list: {
			FLV_mini: false,	// FLV mini
			FLV: true,		// FLV
			H264: true,		// H264
			H264_HQ: true,		// H264 HQ
			H264_HD: true,		// H264 HD
		}
	},
	queue: {
		check_interval: QUEUE_CHECK_INTERVAL,
		check_interval_done: QUEUE_CHECK_INTERVAL_DONE,
		max_send_request: MAX_SEND_REQUEST,
		max_wait_limit: MAX_WAIT_LIMIT,
		max_retry: MAX_RETRY,
	},
	style: {
		list: {
			base: {
				text_color: "",
				bg_color: "rgba(255,255,255,0.7)",
				font_size: "0.9em",
				font_weight: "",
				others: "",
			},
			download: {	// embedding enabled
				text_color: "#0054A6;",
				bg_color: "",
				font_size: "",
				font_weight: "",
				others: "",
			},
			meta: {
				text_color: "#008800",
				bg_color: "",
				font_size: "1em",
				font_weight: "",
				others: "",
			},
			title: {
				text_color: "#1F3A67",
				bg_color: "",
				font_size: "1em",
				font_weight: "",
				others: "",
			},
			watch_button: {
				text_color: "#FFFFFF",
				bg_color: "#E97300",
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			watch_button_na: {
				text_color: "#E97300",
				bg_color: "buttonface",
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			wait: {
				text_color: "#FF0000",
				bg_color: "",
				font_size: "1em",
				font_weight: "",
				others: "",
			},
			error: {
				text_color: "#FF0000",
				bg_color: "",
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
				font_weight: "bold",
				others: "",
			},
			anchor: {
				text_color: '#FFFFFF',
				bg_color: '#E97300',
				bg_image: '',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			format: {
				text_color: "",
				bg_color: "",
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			watch_button: {
				text_color: "#FFFFFF",
				bg_color: "#E97300",
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
				font_weight: "",
				others: "",
			},
			download: {
				text_color: '#FFFFFF',
				bg_color: '#E97300',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			anchor: {
				text_color: '#FFFFFF',
				bg_color: '#E97300',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			lock: {
				text_color: '#FFFFFF',
				bg_color: '#E97300',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			close: {
				text_color: '#FFFFFF',
				bg_color: '#E97300',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			sel_box: {
				text_color: '',
				bg_color: '',
				bg_image: 'none',
				font_size: "",
				font_weight: "",
				others: "",
			},
			status_bar: {
				text_color: '#FFFF00',
				bg_color: '#404040',
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

var button_style = 'cursor:pointer;-moz-border-radius:1px;';
var fmt_style = 'width: 200px;margin-left:10px;margin-right:20px;';

//// for watch page
var video_urls = new Array();
// added box for download links
var added_box_watch = {
// for the video download button
	base: {
		base_id: 'AddsALinkDownloadBase',
		id: 'AddsALinkDownloadFormatBase',
		base_style: 'margin-bottom:10px;',
		style: 'margin-bottom:10px;',
	},
	embed: {
		div_id: 'AddsALinkWatchEmbedBase',
		div_style: 'width:100%;height:100%;',
		id: 'AddsALinkWatchEmbed',
		style: '',
	},
	download: {
		div_id: 'AddsALinkDownloadBox',
		div_style: 'margin-left:20px;margin-bottom:10px;',
		anchor_id: 'AddsALinkDownloadURL',
		anchor_style: 'padding: 4px 10px 4px 10px;font-weight: bold;-moz-border-radius:3px;',
	},

// for format
	format: {
		id: 'AddsALinkWatchVideoFormat',
		style: fmt_style,
	},

};

// for open/close a box
var styles = {
	block_open: 'display:block;',
	inline_open: 'display:inline;margin-top:10px;',
	close: 'display:none;'
};


//// for video list
// added box for the checkbox and the download link
var added_box = {
	base: {
		id: 'AddsALinkBase_',
		style: 'font-size:0.9em;float:left;'
	},
	download: {
		id: 'AddsALinkDownloadLink_',
		style: ''
	},
	meta: {
		id: 'AddsALinkMetaBox_',
		wait_id: 'AddsALinkMetaWait_',
		title_id: 'AddsALinkMetaTitle_',
		style: '',
		wait_style: '',
		title_style: '',
	},
	watch: {
		id: 'AddsALinkWatch_',
		style: button_style,
		error_style: 'color:#FF0000;',
	}
};

var	video_panel = {
	box: {
		id: 'AddsALinkVideoPanel',
		style: 'padding:20px 20px 40px 20px;position:fixed;z-index:20000;display:block;cursor:move;',
		close_style: 'display:none;'
	},
	title: {
		id: 'AddsALinkWatchTitle',
		style: 'height:14px;margin-top:6px;'
	},
	player: {
		id: 'AddsALinkEmbed',
		style: 'margin:10px 0px 0px 0px;'
	},
	sel_box: {
		id: 'AddsALinkSelectFormat',
		style: 'margin-top:10px;padding:2px 4px 2px 4px;position:absolute;bottom:26px;right:170px;'
	},
	download: {
		type: 'link',		// 'button' or 'link'
		id: 'AddsALinkDownloadButton',
		style: button_style+'margin-top:10px;padding:2px 4px 2px 4px;float:right;'
	},
	lock: {
		id: 'AddsALinkLockButton',
		style: button_style+'position:absolute;top:5px;right:30px;'
	},
	close: {
		id: 'AddsALinkCloseButton',
		style: button_style+'position:absolute;top:5px;right:5px;'
	},
	lock_ratio: {
		id: 'AddsALinkLockRatioChkbox',
		style: 'height:14px;position:absolute;bottom:30px;left:10px;',
		label_style: 'height:14px;position:absolute;bottom:30px;left:30px;color:#FFFFFF;'
	},
	status_bar: {
		id: 'AddsALinkStatusBar',
		style: 'height:16px;width:99%;position:absolute;bottom:0px;left:0px;padding:0 2px 0 2px;text-align:left;'
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
		style: 'position:fixed;width:450px;color:#000000;background-color:buttonface;border:3px outset buttonface;font-size:14px;padding-top:6px;z-index:200000;text-align:left;',
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
		include_video_type_id: 'AddsALinkSetupWatchIncludeVideoType',
		autoplay_id: 'AddsALinkSetupWatchAutoplay',
		fmt_id: 'AddsALinkSetupWatchVideoFmt',
		watch_button_id: 'AddsALinkSetupWatchWatchButton',
		watch_button_text_id: 'AddsALinkSetupWatchWatchButtonText',
		watch_explicit_id: 'AddsALinkSetupWatchWatchExplicit',
		ul_style: ul_style,
		text_color_style: indent_3+li_style_base,
		bg_color_style: indent_3+li_style_base,
		bg_image_style: indent_3+li_style_base,
		autoplay_style: li_style,
		download_link_style: li_style,
		include_video_type_style: li_style,
		download_link_text_style: indent_3+li_style_base,
		fmt_type_style: li_style,
		watch_explicit_style: li_style,
	},
	list: {
		download_link_id: 'AddsALinkSetupListDownloadLink',
		download_link_text_id: 'AddsALinkSetupListDownloadText',
		uploaded_id: 'AddsALinkSetupListUploaded',
		comments_id: 'AddsALinkSetupListComments',
		favorites_id: 'AddsALinkSetupListFavorites',
		video_title_id: 'AddsALinkSetupListVideoTitle',
		views_id: 'AddsALinkSetupListViews',
		watch_button_id: 'AddsALinkSetupListWatchButton',
		fmt_id: 'AddsALinkSetupListVideoFmt',
		remove_veil_id: 'AddsALinkSetupListRemoveVeil',
		force_button_id: 'AddsALinkSetupListForceWatchButton',
		ul_style: ul_style,
		download_link_style: li_style,
		download_link_text_style: indent_3+li_style_base,
		uploaded_style: li_style,
		comments_style: li_style,
		favorites_style: li_style,
		video_title_style: li_style,
		views_style: li_style,
		watch_button_style: li_style,
		watch_button_text_style: indent_3+li_style_base,
		fmt_type_style: li_style,
		remove_veil_style: li_style,
		force_button_style: li_style,
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
		download_link_id: 'AddsALinkSetupVideoDownload',
		download_link_text_id: 'AddsALinkSetupVideoDownloadText',
		ul_style: ul_style,
		autoplay_style: li_style,
		auto_resize_style: li_style,
		lock_ratio_style: li_style,
		fit_aspect_ratio_style: li_style,
		height_style: li_style,
		width_style: li_style,
		min_height_style: li_style,
		min_width_style: li_style,
		max_height_style: li_style,
		max_width_style: li_style,
		download_link_style: li_style,
		download_link_text_style: li_style_text,
	},
	script: {
		check_interval_id: 'AddsALinkSetupScriptCheckInterval',
		check_interval_done_id: 'AddsALinkSetupScriptCheckIntervalDone',
		max_send_request_id: 'AddsALinkSetupScriptMaxSendRequest',
		max_wait_limit_id: 'AddsALinkSetupScriptMaxWaitLimit',
		max_retry_id: 'AddsALinkSetupScriptMaxRetry',
		ul_style: ul_style,
		check_interval_style: li_style_text,
		check_interval_done_style: li_style_text,
		max_send_request_style: li_style_text,
		max_wait_limit_style: li_style_text,
		max_retry_style: li_style_text,
	},
	update: {
		check_now_id: 'AddsALinkSetupCheckNowButton',
		check_now_style: 'position:absolute;right:40px;top:100px;margin:10px 0px 10px 100px;cursor:pointer;background-color:buttonface;',
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
		ul_style: ul_style,
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
		style: 'margin-left:10px;'
	},
	button: {
		ok_id: 'AddsALinkSetupOKButton',
		cancel_id: 'AddsALinkSetupCancelButton',
		ok_style: 'margin:10px 0px 10px 100px;'+setup_button_style,
		cancel_style: 'margin:10px 0px 10px 100px;'+setup_button_style,
	}
};


var	watch_page = false;
var	explicit_video = false;

const	UNKNOWN_PAGE = 0;
const	CHANNEL_PAGE = 1;
const	USER_PAGE = 2;
const	COMMUNITY_PAGE = 3;
const	SEARCH_PAGE = 4;
const	MEMBER_LIST_PAGE = 5;
const	GROUP_LIST_PAGE = 6;
var	page_type = UNKNOWN_PAGE;	// reserved

const	TYPE_INSERTED = 0;
const	TYPE_MODIFIED = 1;

var	listener_query = '//div[contains(@class,"video_list")]';
var	listener_type = TYPE_INSERTED;
var	anchor_query = '//a[contains(@class,"preview_link")]';
var	anchor_queries = new Array();
var	cell_query = '../..';
var	cell_queries = new Array();
var	listbox_query = '';
var	listbox_queries = new Array();
var	added_query = '../..';
var	added_queries = new Array();
var	explicit_query = '../div[contains(@class,"explicit")]';
var	explicit_queries = new Array();

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
var	cell_calc_types = new Array();
var	list_calc_type = TYPE_HEIGHT_AUTO;
var	list_calc_types = new Array();

var listener_nodes = new Array();
const WATCH_URL = 0;

if(window.location.href.indexOf('/channel/') >= 0) {
	page_type = CHANNEL_PAGE;
	cell_calc_type = TYPE_HEIGHT_CALC;
} else
if(window.location.href.indexOf('/group/') >= 0) {
	page_type = COMMUNITY_PAGE;
	anchor_queries[0] = '//div[contains(@class,"dmpi_video_featured")]//a[contains(@class,"preview_link")]';
	anchor_queries[1] = '//div[contains(@class,"group_videos") or contains(@class,"video_list")]//a[contains(@class,"preview_link")]';
	added_queries[0] = 'ancestor::div[contains(@class,"dmpi_video_featured")]/div[@id="video_featured_info"]';
	added_queries[1] = '../..';
	cell_queries[0] = '../../..';
	cell_queries[1] = '../..';
	listbox_query = '//div[contains(@class,"dmpi_box") and contains(@class,"dmpi_subbox") and contains(@class,"group_videos")]';
//	listbox_query = '//div[contains(@class,"dmpi_box") and contains(@class,"dmpi_subbox") and contains(@class,"group_videos")] | //div[contains(@class,"dmpi_box") and contains(@class,"dmpi_subbox") and contains(@class,"video_list")]';
	cell_calc_type = TYPE_HEIGHT_CALC;
} else
if(window.location.href.indexOf('/search/') >= 0) {
	page_type = SEARCH_PAGE;
} else
if(window.location.href.indexOf('/user/') >= 0) {
	page_type = USER_PAGE;
} else
if(window.location.href.indexOf('/users/') >= 0) {
	need_title = true;
	need_views = true;
	page_type = MEMBER_LIST_PAGE;
	added_query = '..';
	cell_query = '..';
	listener_query = '//div[@class="content_right"]/div[2]'
	listbox_query = '../../..';
} else
if(window.location.href.indexOf('/groups/') >= 0) {
	need_title = true;
	need_views = true;
	page_type = GROUP_LIST_PAGE;
	cell_calc_type = TYPE_HEIGHT_CALC;
	list_calc_type = TYPE_HEIGHT_CALC;
	added_query = '..';
	cell_query = '..';
	listener_query = '//div[@class="content_right"]/div[2]'
	listbox_query = '../../..';
} else {
	page_type = UNKNOWN_PAGE;	// maybe user profile page or videos page
	anchor_queries[0] = '//div[contains(@class,"dmpi_video_featured")]//a[contains(@class,"preview_link")]';
	anchor_queries[1] = '//div[contains(@class,"user_videos") or contains(@class,"video_list") or contains(@class,"dmpi_list")]//a[contains(@class,"preview_link")]';
	anchor_queries[2] = '//div[contains(@id,"related_list_box")]//a[contains(@class,"preview_link")]';	// for watch page
	added_queries[0] = 'ancestor::div[contains(@class,"dmpi_video_featured")]/div[@id="video_featured_info"]';
	added_queries[1] = '../..';
	added_queries[2] = '../..';
	cell_queries[0] = '../../..';
	cell_queries[1] = '../..';
	cell_queries[2] = '../..';
	listener_query = '//div[@class="content_right"]/div[2]'
	listbox_query = 'ancestor::div[contains(@class,"dmpi_box") and contains(@class,"dmpi_subbox")]';
	cell_calc_type = TYPE_HEIGHT_CALC;
}

if(window.location.href.indexOf('/video/') >= 0) {
	watch_page = true;
}

Init();

window.addEventListener(
    "load",
    function() {
	if(watch_page == true) {
		watch_page_proc();
	}
	list_page_proc();
    },
false);


// for list page
function GetSetupDataListPage(){
// video format
	custom.fmt.list = GetGMValue("download_fmt_list", custom.fmt.list, null);
	custom.list = GetGMValue("list_page", custom.list, null);

	custom.list.download_link = false;
	for(var fmt in custom.fmt.list) {
		if(custom.fmt.list[fmt] == true) {
			custom.list.download_link = true;
		}
	}
}

function SetSetupDataListPage(){
	GM_setValue("download_fmt_list", uneval(custom.fmt.list));
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
	custom.fmt.watch = GetGMValue("download_fmt_watch", custom.fmt.watch, null);
	custom.watch = GetGMValue("watch_page", custom.watch, null);
}

function SetSetupDataWatchPage(){
	GM_setValue("download_fmt_watch", uneval(custom.fmt.watch));
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

// style setup date
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

// others setup date
function GetSetupDataOthers(){
	custom.extention = GetGMValue("extention", custom.extention, null);
}

function SetSetupDataOthers(){
	GM_setValue("extention", uneval(custom.extention));
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

function GetSetupDataAll() {
	GetSetupDataListPage();
	GetSetupDataWatchPage();
	GetSetupDataVideoPanel();
	GetSetupDataScriptControl();
	GetSetupDataUpdateCheck();
	GetSetupDataStyle();
	GetSetupDataOthers();
}

function SetSetupDataAll() {
	SetSetupDataVersion()
	SetSetupDataListPage();
	SetSetupDataWatchPage();
	SetSetupDataVideoPanel();
	SetSetupDataScriptControl();
	SetSetupDataUpdateCheck();
	SetSetupDataStyle();
	SetSetupDataOthers();
}

// for setup data conversion
function ConvertSetupData(){
	if(custom.setup_version == 0) {	// old format data
// for watch page
		custom.watch.disp_type = GM_getValue("disp_type", custom.watch.disp_type);
		custom.watch.image_url = GM_getValue("image_url", custom.watch.image_url);
		custom.watch.text_color = GM_getValue("text_color", custom.watch.text_color);
		custom.watch.bg_color = GM_getValue("bg_color", custom.watch.bg_color);
		custom.fmt.watch = eval(GM_getValue("download_fmt_watch", custom.fmt.watch));

// for list page
		custom.list.watch_button = GM_getValue("add_watch_button", custom.list.watch_button);
//		custom.list.download_link = GM_getValue("add_download_link", custom.list.download_link);
		custom.list.uploaded = GM_getValue("add_uploaded", custom.list.uploaded);
		custom.list.comments = GM_getValue("add_comments", custom.list.comments);
		custom.list.favorites = GM_getValue("add_favorites", custom.list.favorites);
		custom.list.title = GM_getValue("add_title", custom.list.title);
		custom.list.views = GM_getValue("add_views", custom.list.views);
		custom.fmt.list = eval(GM_getValue("download_fmt_list", custom.fmt.list));
		custom.list.download_link = false;
		for(var fmt in custom.fmt.list) {
			if(custom.fmt.list[fmt] == true) {
				custom.list.download_link = true;
			}
		}

// for video panel
		custom.player.autoplay = GM_getValue("autoplay_list", custom.player.autoplay);
		custom.player.auto_resize = GM_getValue("auto_resize", custom.player.auto_resize);
		custom.player.min_width = GM_getValue("min_width_list", custom.player.min_width);
		custom.player.min_height = GM_getValue("min_height_list", custom.player.min_height);
		custom.player.max_width = GM_getValue("max_width_list", custom.player.max_width);
		custom.player.max_height = GM_getValue("max_height_list", custom.player.max_height);
		custom.player.player_height = GM_getValue("player_height_list", custom.player.player_height);
		custom.player.player_width = GM_getValue("player_width_list", custom.player.player_width);
//		custom.player.lock_ratio = GM_getValue("lock_ratio", custom.player.lock_ratio);
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
	var old_data = eval(GM_getValue(key, val));
	for(var i in old_data) {
		if(ignores) {
			if(ignores.indexOf(i) >= 0) {
				continue;
			}
		}
		val[i] = old_data[i];
	}
	return val;
}

function ConvOldDataToNewData(old_version) {
	if(old_version < 5) {
		if(custom.watch.disp_type == TEXT_TYPE) {
			custom.style.watch.anchor.text_color = custom.watch.text_color;
			custom.style.watch.anchor.bg_color = custom.watch.bg_color;
			custom.style.watch.anchor.bg_image = "";
		} else {
			custom.style.watch.anchor.text_color = custom.watch.image_text;
			custom.style.watch.anchor.bg_color = custom.watch.bg_color;
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
		GM_deleteValue("add_watch_button");
//		GM_deleteValue("add_download_link");
		GM_deleteValue("add_uploaded");
		GM_deleteValue("add_comments");
		GM_deleteValue("add_favorites");
		GM_deleteValue("add_title");
		GM_deleteValue("add_views");
// for watch page
		GM_deleteValue("disp_type");
		GM_deleteValue("text_color");
		GM_deleteValue("bg_color");
		GM_deleteValue("image_url");
// for video panel
		GM_deleteValue("autoplay_list");
		GM_deleteValue("auto_resize");
//		GM_deleteValue("lock_ratio");
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
	GM_registerMenuCommand( "#### Set up this script(Dailymotion) ####", Setup);

// for update check
	UpdateCheck(false);

	WatchOver();
}



function buildURL(href, target) {
	var	url = '';
	switch(target) {
	case WATCH_URL:
		if(href.substr(0,4) == 'http') {
			url = href;
		} else {
			url = 'http://www.dailymotion.com/'+href;
		}
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
	var now = (new Date()).getTime();
	var latest_pid = "";
	for (var pid in queue) {
		count++;
		switch(queue[pid].stat) {
		case SENT_REQUEST:
			if(now - queue[pid].sent_time < custom.queue.max_wait_limit) {
				sent++;
			} else {
				WaitMessage(pid, 0);
				queue[pid].stat = NOT_RECEIVED;
				queue[pid].stat_detail = NOT_RECEIVED;
				WaitMessage(pid, 1);
				WaitMessage(pid, -1, "Can't get video information");
				if(queue[pid].clone_num) {
					for(var j in queue[pid].clone_pid) {
						var clone_pid = queue[pid].clone_pid[j];
						if(queue[clone_pid].stat == CLONE_DATA) {
							WaitMessage(clone_pid, 1);
							WaitMessage(clone_pid, -1, "Can't get video information");
						}
					}
				}
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
				if(page_type != MEMBER_LIST_PAGE && page_type != GROUP_LIST_PAGE) {
					var class = list_box.getAttribute("class");
					if(!class || work.indexOf(class) >= 0) {
						continue;
					}
					work.push(class);
				}

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
	}
	return false;
}

function QueueControl() {
	var sent = current_request_num;
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

function ExtractPid(class) {
	var pid = class.match(/id_(\d*)/)[1];
	return pid;
}

function NodeInserted() {
	list_page_proc();
}

function list_page_proc() {
	if(anchor_queries.length) {
		for(var i = 0; i < anchor_queries.length; i++) {
			anchor_query = anchor_queries[i];
			if(added_queries.length) {
				added_query = added_queries[i];
			}
			if(cell_queries.length) {
				cell_query = cell_queries[i];
			}
			if(listbox_queries.length) {
				listbox_query = listbox_queries[i];
			}
			if(explicit_queries.length) {
				explicit_query = explicit_queries[i];
			}
			if(cell_calc_types.length > 0) {
				cell_calc_type = cell_calc_types[i];
			}
			if(list_calc_types.length > 0) {
				list_calc_type = list_calc_types[i];
			}
			AddDownloadLink();
		}
	} else {
		AddDownloadLink();
	}
}

function CheckSamePidNode(pid, parent) {
	if(queue[pid].parent == parent) {
		return false;
	}
	if(queue[pid].clone_num) {
		for(var i in queue[pid].clone_pid) {
			var clone_pid = queue[pid].clone_pid[i];
			if(queue[clone_pid].parent == parent) return false;
		}
	}
	return true;
}

function RemoveVeilExplicitThumbnail(pid) {
	if(!queue[pid].explicit_box) return;
	Toggle_Listener(false);
	if(custom.list.remove_veil == true) {
		queue[pid].explicit_box.style.display = "none";
	} else {
		queue[pid].explicit_box.style.display = "";
	}
	Toggle_Listener(true);
}


function AddDownloadLink() {
	var q = anchor_query;
	var xp = document.evaluate(q, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(xp.snapshotLength) {

		for (var i=0; i < xp.snapshotLength; i++) {
			var need_clone = false;
			var anchor = xp.snapshotItem(i);
			var class = anchor.getAttribute('class');
			if(class.indexOf('id_') < 0) {
				continue;
			}
			var pid = ExtractPid(class);
			var parent = document.evaluate(added_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if(queue[pid]) {
				need_clone = CheckSamePidNode(pid, parent);
				if(need_clone == false) {
					continue;
				}
			}
			var video_cell = document.evaluate(cell_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var list_box = null;
			if(listbox_query) {
				list_box = document.evaluate(listbox_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			}
			var explicit_box = null;
			if(explicit_query) {
				explicit_box = document.evaluate(explicit_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			}

			var stat = NONE;
			var org_pid = pid;
			if(need_clone == true) {
				queue[pid].clone_num++;
				var clone_pid = pid + '_clone_' + queue[pid].clone_num;
				queue[pid].clone_pid.push(clone_pid);
				pid = clone_pid;
				stat = CLONE_DATA;
			}

			var base = document.createElement('div');
			base.id = added_box.base.id + pid;
			var style = buildStyle(custom.style.list.base, added_box.base.style);
			base.setAttribute('style',style);

			Toggle_Listener(false);
		        parent.appendChild(base);
			Toggle_Listener(true);

			queue[pid] = {
				stat: stat,
				node: base,
				parent: parent,
				clone_num: 0,
				clone_pid: new Array(),
				href: anchor.href,
				video_cell: video_cell,
				list_box: list_box,
				offsetHeight: base.parentNode.offsetHeight,
				offsetTop: base.parentNode.offsetTop,
				cell_query: cell_query,
				cell_offsetHeight: video_cell.offsetHeight,
				explicit_box: explicit_box,
				cell_calc_type: cell_calc_type,
				list_calc_type: list_calc_type,
			};

			RemoveVeilExplicitThumbnail(pid);
		}

	} else {
		Toggle_Listener(true);
	}
}

function AddVideoType(fmt, type) {
	var str = "";
	switch(type) {
	case FT_WITH_FMT_STR:
		str = video_format[fmt].text;
		break;
	case FT_WITH_FMT_STR_TEXT:
		str = '('+video_format[fmt].text+')';
		break;
	case FT_TITLE_ONLY:
		break;
	}
	return str;
}

function ModifyFileName(filename, fmt) {
	filename = filename.replace(/[\\\/:;\*\?\"<>\|]/g,'_');
	if(filename.replace('.', '') == '') {
		filename = filename.replace(/\./g, '_');
	}
	return filename + AddVideoType(fmt, custom.format_type.filename);
}


// watch_page_proc routine
function watch_page_proc() {
	var embed = document.getElementsByTagName("embed");

	if(!embed || !embed[0]) {
		return;
	} else {
		// Get download URL from embed tag
		var flashvars = embed[0].getAttribute('flashvars');
		try {	// some data brings about a malformed URI sequence error
			flashvars = decodeURIComponent(flashvars);
		} catch(e) {
			flashvars = unescape(flashvars);
		}
		if(/startError=/.test(flashvars)) {
			explicit_video = true;
			if(custom.watch.watch_explicit) {
				ExchangeEmbedCode();
			}
			return;
		}
		var work = flashvars.match(/video=(.+?)&/)[1];
		var videos = work.split('||');
		for(var i = 0; i < videos.length; i++) {
			var fmt = videos[i].match(/(.+?)@@(.+)/)[2];
			video_urls[fmt] = RegExp.$1;
		}
	}

//	var pid = ExtractPid(class);
//	watch_page_pid = pid;
	var	base = document.createElement('div');

	base.id = added_box_watch.base.base_id;
	var style = buildStyle(custom.style.watch.base, added_box_watch.base.base_style);
	base.setAttribute('style',style);

	var parent = document.evaluate('//div[contains(@class, "dmpi_video_infos")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(!parent) {
		return;	// maybe BUG
	}
//	queue[pid] = {stat:STORED_DATA, stat_detail:NONE, node:base, href:href};
        parent.insertBefore(base, parent.firstChild);

	var xp = document.evaluate('//h1[@class="dmco_title"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var title = '';
	if(xp.singleNodeValue) {
		title = xp.singleNodeValue.textContent;
	}

	var format_style = buildStyle(custom.style.watch.format, added_box_watch.format.style);

	for(var fmt in video_format) {
		var download_url = video_urls[video_format[fmt].key];
		var html = '<div id="' + added_box_watch.download.div_id + fmt + '" style="display:none;'+added_box_watch.download.div_style+'">' +
			'<a id="' + added_box_watch.download.anchor_id + fmt + '" href="' + download_url + '" style="' + added_box_watch.download.anchor_style + '">'+custom.watch.download_link_text+'</a>' +
			'<a id="' + added_box_watch.format.id + fmt + '" href="' + download_url + '" style="' + format_style + '">' +
			AddVideoType(fmt, custom.format_type.watch) + '</a>'+
			'</div>';

		var	p = document.createElement('div');

		p.innerHTML = html;
		p.id = added_box_watch.base.id + fmt;
		p.setAttribute('style', added_box_watch.base.style);
		ModifyAnchor(p, fmt, title);

	        base.appendChild(p);
	}
	ChangeStyle();
}

function ModifyAnchor(p, fmt, title) {
	if(custom.fmt.watch[fmt] == false || !video_urls[video_format[fmt].key]) {
		p.style.display =  'none';
	} else {
		p.style.display =  'block';
	}

	var query = './/a[@id="'+added_box_watch.download.anchor_id + fmt+'"]';
	if(custom.watch.include_video_type == false) {
		query += '|.//a[@id="'+added_box_watch.format_id + fmt+'"]';
	}
	var xp = document.evaluate(query, p, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var l = xp.snapshotLength;
	for(var i = 0; i < l; i++) {
		var node = xp.snapshotItem(i);
		node.setAttribute('fmt',fmt);
		if(title) {
			var filename = ModifyFileName(title, fmt);
			node.setAttribute('title',filename);
			node.setAttribute('filename',filename+custom.extention[video_format[fmt].type]);
		}
	}
}

function ExchangeEmbedCode() {
	var embed = document.getElementsByTagName("embed");
	if(custom.watch.watch_explicit) {
		var video_src = "";
		var node = document.evaluate('//link[@rel="video_src"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(node) {
			 video_src = decodeURIComponent(node.getAttribute('href')).replace(/&autoPlay.*$/,'');
		} else {
			return;	// can't watch this video
		}
		var div = document.getElementById(added_box_watch.embed.div_id);
		if(!div) {
			var embedCode = '<embed width="100%" height="100%" src="'+video_src+'&related=0&autoPlay=1" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always">';
			var div = document.createElement('div');
			div.innerHTML = embedCode;
			div.id = added_box_watch.embed.div_id;
			div.setAttribute('style', added_box_watch.embed.div_style);
			embed[0].parentNode.parentNode.appendChild(div);
		} else {
			div.style.display = '';
		}
		embed[0].parentNode.style.display = 'none';
	} else {
		var div = document.getElementById(added_box_watch.embed.div_id);
		if(div) {
			div.style.display = 'none';
		}
		embed[0].parentNode.style.display = '';
	}
}


var	videoInfo = {};

function GetTitle(div) {
	var node = document.evaluate('.//h1[@class="dmco_title"]/text()', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node) {
		return node.textContent;
	}
	return '';
}

function GetVideoSrc(div) {
	var node = document.evaluate('.//link[@rel="video_src"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node) {
		return decodeURIComponent(node.getAttribute('href')).replace(/&autoPlay.*$/,'');
	}
	return '';
}

function GetVideoHeight(div) {
	var node = document.evaluate('.//meta[@name="video_height"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node) {
		return node.getAttribute('content');
	}
	return '';
}

function GetVideoWidth(div) {
	var node = document.evaluate('.//meta[@name="video_width"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node) {
		return node.getAttribute('content');
	}
	return '';
}

function GetEmbed(text) {
	var p = text.indexOf('<embed');
	if(p > 0) {
		text = text.substr(p);
	} else {
		return "";
	}
	p = text.indexOf('</object>');
	if(p > 0) {
		text = text.substr(0,p);
	} else {
		return "";
	}
	return text;
}

function GetObject(text) {
	var p = text.indexOf('<object');
	if(p > 0) {
		text = text.substr(p);
	} else {
		return "";
	}
	p = text.indexOf('</object>');
	if(p > 0) {
		text = text.substr(0,p+9);
	} else {
		return "";
	}
	return text;
}

function GetUploaded(div) {
	var xp = document.evaluate('.//div[contains(@class,"uploaded_cont")]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(!xp.singleNodeValue) {
		return '';
	}
	var text = xp.singleNodeValue.textContent;
	var p = text.match(/:\s*(.*)/)[1];
	return p;
}

function GetViews(div) {
	var xp = document.evaluate('.//b[@class="video_views_value"]/text()', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(xp.singleNodeValue) {
		return xp.singleNodeValue.textContent;
	}
	return '';
}

function GetComments(div) {
	var xp = document.evaluate('.//b[@class="video_comments_value"]/text()', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(xp.singleNodeValue) {
		return xp.singleNodeValue.textContent;
	}
	return '';
}

function GetFavorites(div) {
	var xp = document.evaluate('.//b[@class="video_bookmarks_value"]/text()', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(xp.singleNodeValue) {
		return xp.singleNodeValue.textContent;
	}
	return '';
}

function GetEmbeddablePlayer(div) {
	var value;
	var xp = document.evaluate('.//input[@id="video_player_embed_code_text"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(!xp.singleNodeValue) {
		value = div.innerHTML;
	} else {
		try {	// some data brings about a malformed URI sequence error
			value = decodeURIComponent(xp.singleNodeValue.getAttribute('value'));
		} catch(e) {
			value = unescape(xp.singleNodeValue.getAttribute('value'));
		}
	}

	var text = GetEmbed(value);
	if(!text) text = GetObject(value);
	return text;
}

// Parse source xml
function ParseSourceXml(text)
{
	var div = document.createElement('div');
	div.innerHTML = text;

	videoInfo['title'] = GetTitle(div);
	videoInfo['video_src'] = GetVideoSrc(div);
	videoInfo['video_height'] = GetVideoHeight(div);
	videoInfo['video_width'] = GetVideoWidth(div);
	videoInfo['embedCode'] = GetEmbed(text);
	videoInfo['uploaded'] = GetUploaded(div);
	videoInfo['views'] = GetViews(div);
	videoInfo['comments'] = GetComments(div);
	videoInfo['favorites'] = GetFavorites(div);
	videoInfo['embeddablePlayer'] = GetEmbeddablePlayer(div);

	videoInfo['video_urls'] = new Array();
	if(videoInfo['embedCode']) {
		div.innerHTML = videoInfo['embedCode'];
		var embed = div.firstChild;
		var flashvars = embed.getAttribute('flashvars');
		try {	// some data brings about a malformed URI sequence error
			flashvars = decodeURIComponent(flashvars);
		} catch(e) {
			flashvars = unescape(flashvars);
		}
		if(/startError=1/.test(flashvars) == false) {
			var work = flashvars.match(/video=(.+?)&/)[1];
			var videos = work.split('||');
			for(var i = 0; i < videos.length; i++) {
				var fmt = videos[i].match(/(.+?)@@(.+)/)[2];
				videoInfo['video_urls'][fmt] = RegExp.$1;
			}
			videoInfo['video_src'] = '';
		} else {
			videoInfo['embeddablePlayer'] = '';
			if(/login\?urlback/.test(flashvars) == true) {
				videoInfo['embedCode'] = '<embed src="'+videoInfo.video_src+'&related=0" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always">';
			} else {
				videoInfo['video_src'] = '';
				videoInfo['embedCode'] = '';
			}
		}
	}
//	videoInfo['video_width'] = custom.player.player_width;
//	videoInfo['video_height'] = custom.player.player_height;
//	videoInfo['video_width'] = "";
//	videoInfo['video_height'] = "";
	if(videoInfo['embeddablePlayer']) {
		div.innerHTML = videoInfo['embeddablePlayer'];
		var embed = div.firstChild;
		videoInfo['video_width'] = embed.getAttribute('width');
		videoInfo['video_height'] = embed.getAttribute('height');
	} else {
	}
	return videoInfo;

}

function CopyVideoInfo(pid, VideoInfo) {
	var infoKeys = [
		'embedCode',
		'video_urls',
		'uploaded',
		'comments',
		'favorites',
		'title',
		'views',
		'embeddablePlayer',
		'video_width',
		'video_height',
		'video_src',
		];

	for (var i in infoKeys) {
		queue[pid][infoKeys[i]] = VideoInfo[infoKeys[i]];
	}
}

function GetVideoInformation(pid) {

	var url = buildURL(queue[pid].href, WATCH_URL);

	setTimeout(function(){
		queue[pid].stat = SENT_REQUEST;
		queue[pid].sent_time = (new Date()).getTime();
		WaitMessage(pid, 1);
		GM_xmlhttpRequest({
			pid: pid,
			method:"GET",
			url: url,
			headers:{
				"User-Agent": window.navigator.userAgent,
				"Accept":"*/*",
				"Accept-Language":"en-us"
			},
			onload: function(xhr){
				var text = xhr.responseText;
				var pid = this.pid;
				queue[pid].stat = RECEIVED_RESPONSE;
				if ( xhr.status != 200 ) {	// failed
					GM_log('HTTP status:'+xhr.status);
					GM_log('finalURL:'+xhr.finalUrl);
					WaitMessage(pid, xhr.status);
					return;
				}
				var VideoInfo = ParseSourceXml(text);
				CopyVideoInfo(pid, VideoInfo);
				queue[pid].stat = STORED_DATA;
				WaitMessage(pid, 0);
				AddMetaData(pid);
				if(queue[pid].clone_num) {
					for(var j in queue[pid].clone_pid) {
						var clone_pid = queue[pid].clone_pid[j];
						CopyVideoInfo(clone_pid, queue[pid]);
						queue[clone_pid].stat = STORED_DATA;
						AddMetaData(clone_pid);
					}
				}
			}
		});
	},0);
}

function SearchLastEffectiveVideo(pid) {
	var last_div = null;
	var offsetTop = 0;
	var height = 0;
	for (var wpid in queue) {
		if(queue[pid].list_box == queue[wpid].list_box) {
			if(offsetTop < queue[wpid].video_cell.offsetTop) {
				offsetTop = queue[wpid].video_cell.offsetTop;
				if(height < queue[wpid].video_cell.offsetHeight) {
					height = queue[wpid].video_cell.offsetHeight;
					pid = wpid;
				}
			}
		}
	}
	return pid;
}

function CalcListHeight(pid) {
	var height = 0;
	var pid = SearchLastEffectiveVideo(pid);
	for (var wpid in queue) {
		if(queue[pid].list_box == queue[wpid].list_box) {
			if(queue[wpid].offsetTop == queue[pid].offsetTop) {
				if(height < queue[wpid].video_cell.offsetHeight) {
					height = queue[wpid].video_cell.offsetHeight;
				}
			}
		}
	}
	height += queue[pid].video_cell.offsetTop;
	height -= queue[pid].list_box.offsetTop;
	return height;
}

function ModifyListBoxHeight(pid) {
	if(queue[pid].list_calc_type == TYPE_HEIGHT_CALC) {
		var height = CalcListHeight(pid);
		if(height) {
			queue[pid].list_box.style.height = height + 'px';
		}
	} else {
		queue[pid].list_box.style.height = 'auto';
	}
}

function ModifyParentHeight(pid) {
	var work = new Array();
	var height = 0;
	var base_height = 0;
	for (var wpid in queue) {
		if(queue[wpid].offsetTop == queue[pid].offsetTop) {
			if(!queue[wpid].node) continue;
			if(!queue[wpid].node.parentNode) continue;
			work.push(wpid);
//			if(queue[wpid].stat != STORED_DATA) {
//				continue;
//			}
			if(queue[wpid].node.offsetHeight > base_height) {
				base_height = queue[wpid].node.offsetHeight;
			}
			if(queue[wpid].offsetHeight + queue[wpid].node.offsetHeight > height) {
				height = queue[wpid].offsetHeight + queue[wpid].node.offsetHeight;
			}
		}
	}
	if(height) {
		for (var wpid in work) {
//			queue[work[wpid]].node.parentNode.style.height = height+'px';
			if(!queue[work[wpid]].node) continue;
			if(queue[work[wpid]].cell_calc_type == TYPE_HEIGHT_CALC) {
				queue[work[wpid]].node.parentNode.style.height = (queue[work[wpid]].offsetHeight + base_height)+'px';
				queue[work[wpid]].video_cell.style.height = (queue[work[wpid]].cell_offsetHeight + base_height)+'px';
			} else {
				queue[work[wpid]].node.parentNode.style.height = 'auto';
				queue[work[wpid]].video_cell.style.height = 'auto';
			}
		}
	}
}


function WaitMessage(pid, mode) {
	var id = added_box.meta.wait_id + pid;
	var div = document.getElementById(id);

	Toggle_Listener(false);
	if(mode == 1) {
		if(!div) {
			div = document.createElement('div');
			div.id = id;
			div.innerHTML = 'Wait!';
			var style = buildStyle(custom.style.list.wait, added_box.meta.wait_style);
			div.setAttribute('style', style);
			queue[pid].node.appendChild(div);
		}
	} else if(mode == 0) {
		if(div) {
			div.parentNode.removeChild(div);
		}
	} else {
		if(div) {
			div.innerHTML = 'Error status:'+mode;
		}
	}
	if(mode != 0) {
		if(queue[pid].node.parentNode) {
			var height = div.offsetTop - queue[pid].node.parentNode.offsetTop + queue[pid].node.offsetHeight;
			queue[pid].node.parentNode.style.height = height+'px';
		}

		ModifyParentHeight(pid);
	}
	Toggle_Listener(true);
}

function AddWatchButton(pid, id, watch_button) {
	if(!watch_button) {
		watch_button = document.createElement('input');
		watch_button.type = 'button';
		watch_button.id = id;
		watch_button.setAttribute("pid", pid);
		watch_button.addEventListener("click",function(e) {
				WatchVideo(this.id);
			},false);
		queue[pid].node.appendChild(watch_button);
	}
	watch_button.value = custom.list.watch_button_text;
	return watch_button;
}

function AddMetaData(pid) {
	if(queue[pid].stat != STORED_DATA) return;

	var style;
	Toggle_Listener(false);

	if(need_title) {
		id = added_box.meta.title_id + pid;
		div = document.getElementById(id);
		if(!div) {
			div = document.createElement('div');
			div.id = id;
			queue[pid].node.appendChild(div);
		}
		var html = '<a href="'+queue[pid].href+'">'+queue[pid]['title']+'</a>';
		div.innerHTML = html;

		style = buildStyle(custom.style.list.title, added_box.meta.title_style);
		if(custom.list.title) {
			div.setAttribute('style',style + styles.block_open);
		} else {
			div.setAttribute('style',style + styles.close);
		}
	}

// Add download link
	var video_urls = queue[pid]['video_urls'];
	var download_link_exists = false;
	for(var fmt in video_format) {
		if(!video_urls[video_format[fmt].key]) continue;
		var id = added_box.download.id + fmt + "_"+ pid;
		var download = document.getElementById(id);
		if(!download) {
			download = document.createElement('a');
			download.id = id;
			download.href = queue[pid]['video_urls'][video_format[fmt].key];
			download.setAttribute('title',queue[pid]['title']);
			download.setAttribute('fmt',fmt);
			download.setAttribute('filename',ModifyFileName(queue[pid]['title'], fmt)+custom.extention[video_format[fmt].type]);
			download.addEventListener("click", function(e) {
				e.preventDefault();
				window.location.href = this.href;
				return false;
			},false); 
			queue[pid].node.appendChild(download);
		}
		download.innerHTML = custom.list.download_link_text+'('+video_format[fmt].text+')<br />';
		style = buildStyle(custom.style.list.download, added_box.download.style);
		if(custom.fmt.list[fmt] == true) {
			download.setAttribute('style',style + styles.block_open);
		} else {
			download.setAttribute('style',style + styles.close);
		}
		if(!queue[pid]['video_urls'][video_format[fmt].key]) {
			download.setAttribute('style',style + styles.close);
		} else {
			download_link_exists = true;
		}
	}

	var info = '';
	if(custom.list.uploaded) {
		info += "Uploaded : "+queue[pid]['uploaded'] +"<br />";
	}
	if(custom.list.views && need_views) {
		info += "Views : "+queue[pid]['views'] +"<br />";
	}
	if(custom.list.comments) {
		info += "Comments : "+queue[pid]['comments'] +"<br />";
	}
	if(custom.list.favorites) {
		info += "Favorites : "+queue[pid]['favorites'] +"<br />";
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
	if(custom.list.uploaded || custom.list.comments || custom.list.favorites) {
		div.setAttribute('style',style + styles.block_open);
	} else {
		div.setAttribute('style',style + styles.close);
	}

// Add watch button
	var id = added_box.watch.id + pid;
	var watch_button = document.getElementById(id);

	if(queue[pid]['embeddablePlayer'].indexOf('<object') >= 0 &&
	   queue[pid]['embedCode'] && download_link_exists == true) {
		watch_button = AddWatchButton(pid, id, watch_button);
		style = buildStyle(custom.style.list.watch_button, added_box.watch.style);
	} else
	if(queue[pid]['embeddablePlayer'] && download_link_exists == true) {
		watch_button = AddWatchButton(pid, id, watch_button);
		style = buildStyle(custom.style.list.watch_button, added_box.watch.style);
	} else 
	if(!queue[pid]['embeddablePlayer'] && queue[pid]['video_src'] && 
	    queue[pid]['embedCode'] && custom.list.force_button == true) {
		if(watch_button && watch_button.tagName == 'DIV') {
			watch_button.parentNode.removeChild(watch_button);
			watch_button = null;
		}
		watch_button = AddWatchButton(pid, id, watch_button);
		style = buildStyle(custom.style.list.watch_button_na, added_box.watch.style);
	} else {
		if(watch_button && watch_button.tagName == 'INPUT') {
			watch_button.parentNode.removeChild(watch_button);
			watch_button = null;
		}
		if(!watch_button) {
			watch_button = document.createElement('div');
			watch_button.id = id;
			if(download_link_exists == true) {
				watch_button.innerHTML = "Embed code not found";
			} else {
				watch_button.innerHTML = "Content not Available";
			}
			queue[pid].node.appendChild(watch_button);
		}
		style = buildStyle(custom.style.list.error, added_box.watch.error_style);
