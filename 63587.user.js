// ==UserScript==
// @name           Adds a link to download video for PornoTube
// @namespace      http://userscripts.org/users/76078
// @version        0.1.3
// @author         charmy
// @description    Adds a link to download video and a button to watch video for PornoTube.com.
// @include        http://pornotube.com/*
// ==/UserScript==

(function() {

// for update check
const THIS_SCRIPT_NO = '63587';
const THIS_URL = 'http://userscripts.org/scripts/show/'+THIS_SCRIPT_NO;
const THIS_VER = '0.1.3';
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
	type: NO_CHECK,
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
const	DEFAULT_PLAYER_WIDTH = 480;
const	DEFAULT_PLAYER_HEIGHT = 400;

// for script control
const NONE = 0;
const SENT_REQUEST = 1;
const RECEIVED_RESPONSE = 2;
const STORED_DATA = 3;
const NOT_RECEIVED = 4;
const CLONE_DATA = 9;
var queue = new Array(0);

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

const MIN_BIRTH_MONTH = 1;
const MAX_BIRTH_MONTH = 12;
const MIN_BIRTH_DAY = 1;
const MAX_BIRTH_DAY = 31;
const MIN_BIRTH_YEAR = 1909;
var MAX_BIRTH_YEAR = 1991;
var now = new Date();
var now_yy = now.getYear() + 1900;
MAX_BIRTH_YEAR = now_yy - 18;

var current_request_num = 0;
var total_queue_num = 0;
var retry_count = 0;
var check_interval = 0;
var need_information = false;

// You can customize initial value.
const SETUP_VERSION = 2;
var custom = {
	setup_version: 0,
	player: {	// video panel
		autoplay: true,	// not supported
		auto_resize: true,	// not supported
		player_height: DEFAULT_PLAYER_HEIGHT,	// pixel value
		player_width: DEFAULT_PLAYER_WIDTH,	// pixel value
		min_height: MIN_HEIGHT,	// not supported
		min_width: MIN_WIDTH,	// not supported
		max_height: 768,	// not supported
		max_width: 1024,	// not supported
		lock_ratio: true,	// not supported
		fit_aspect_ratio: true,	// not supported
		top: 'center',	// pixel value or 'center'
		left: 'center',	// pixel value or 'center'
		download_link: true,
		download_link_text: 'Download video',
	},
	extention: '.flv',
	list: {
		download_link: true,
		username: true,
		added: true,
		duration: true,
		filesize: true,
		views: true,
		ratings: true,
		avg_rating: true,
		favorites: true,
		comments: false,
		watch_button: true,
		download_link_text: 'Download',
		watch_button_text: 'Watch Video',
	},
	watch: {
		download_link: true,
		autoplay: true,	// not supported
		download_link_text: "DOWNLOAD",
		watch_button_text: 'Watch Video',
	},
	queue: {
		check_interval: QUEUE_CHECK_INTERVAL,
		check_interval_done: QUEUE_CHECK_INTERVAL_DONE,
		max_send_request: MAX_SEND_REQUEST,
		max_wait_limit: MAX_WAIT_LIMIT,
		max_retry: MAX_RETRY,
	},
	form: {
		age_verify: false,
		birth_year: MAX_BIRTH_YEAR,
		birth_month: MIN_BIRTH_MONTH,
		birth_day: MIN_BIRTH_DAY,
		submit_type: 0,
	},
	style: {
		list: {
			base: {
				text_color: "",
				bg_color: "transparent",
				bg_image: "",
				font_size: "1.0em",
				font_weight: "",
				others: "",
			},
			download: {
				text_color: "#99FFFF",
				bg_color: "",
				bg_image: "",
				font_size: "",
				font_weight: "",
				others: "",
			},
			username: {
				text_color: "#0099FF",
				bg_color: "",
				bg_image: "",
				font_size: "1em",
				font_weight: "",
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
				bg_color: "#E97300",
				bg_image: "none",
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
				bg_color: "",
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
				font_size: "1.0em",
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
				bg_color: '#E97300',
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
				font_weight: "",
				others: "",
			},
			download: {
				text_color: '#FFFFFF',
				bg_color: '#E97300',
				bg_image: 'none',
				font_size: "",
				font_weight: "",
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
			status_bar: {
				text_color: '#FFFF00',
				bg_color: '#404040',
				bg_image: 'none',
				font_size: "",
				font_weight: "",
				others: "",
			},
		},
	},
};

const button_style = 'font-weight:bold;cursor:pointer;-moz-border-radius:1px;';

// for watch page
var	watch_page_pid = '';
// added box for download links
var added_box_watch = {
// for the video download button
	base: {
		id: 'AddsALinkDownloadBase',
		style: 'margin:6px 0px 10px 0px;',
	},
	download: {
		div_id: 'AddsALinkTextDownloadBox',
		div_style: 'margin-left:14px;',
		anchor_id: 'AddsALinkTextDownloadURL',
		anchor_style: 'padding: 4px 10px 4px 10px;font-weight: bold;-moz-border-radius:3px;',
	},
// for watch button
	watch: {
		id: 'AddsALinkWatchWatchButton',
		style: button_style+'margin-bottom:6px;',
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
		style: 'float:left;'
	},
	download: {
		id: 'AddsALinkDownloadLink_',
		style: '',
	},
	username: {
		id: 'AddsALinkMetaUsername_',
		style: '',
	},
	meta: {
		id: 'AddsALinkMetaBox_',
		wait_id: 'AddsALinkMetaWait_',
		style: '',
		wait_style: ''
	},
	watch: {
		id: 'AddsALinkWatch_',
		style: button_style+'float:left;',
		error_style: '',
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
		style: 'height:28px;margin-top:6px'
	},
	player: {
		id: 'AddsALinkEmbed',
		style: 'margin:10px 0px 0px 0px;z-index'
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
	status_bar: {
		id: 'AddsALinkStatusBar',
		style: 'height:14px;width:99%;position:absolute;bottom:0px;left:0px;padding:0px 2px 2px 2px;text-align:left;'
	},
//	resize: {
//		id: 'AddsALinkResizeBox',
//		style: 'height:16px;width:16px;position:absolute;bottom:0px;right:0px;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB9SURBVHjaYrxy4QQDcQAggJiIUaStbw4kAQKIiRh1jY2NQAZAADERqQ4IAAKIiRh1IQEeQBIggJiIUQdxK0AAMRGjDsIGCCAmItUBAUAAMRGjDuJWgABiIkYdxK0AAcREjDoIGyCAmIhUBwQAAcREjDqIWwECiJH45AIQYACQSUAeiz1vwgAAAABJRU5ErkJggg==");'
//	}
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
		},
	},
	watch: {
		text_color_id: 'AddsALinkSetupWatchTextColor',
		bg_color_id: 'AddsALinkSetupWatchBGColor',
		bg_image_id: 'AddsALinkSetupWatchBGImage',
		download_link_id: 'AddsALinkSetupWatchDownloadLink',
		download_link_text_id: 'AddsALinkSetupWatchDownloadLinkText',
//		autoplay_id: 'AddsALinkSetupWatchAutoplay',
		title_style: 'text-align:center;margin:0 0 5px 0;font-weight:bold;',
		ul_style: ul_style,
		text_color_style: li_style_text,
		bg_color_style: li_style_text,
		bg_image_style: li_style_text,
		download_link_style: li_style,
		download_link_text_style: indent_3+li_style_base,
	},
	list: {
		download_link_id: 'AddsALinkSetupListDownloadLink',
		download_link_text_id: 'AddsALinkSetupListDownloadText',
		addedDate_id: 'AddsALinkSetupListAddedDate',
		username_id: 'AddsALinkSetupListUserName',
		duration_id: 'AddsALinkSetupListDuration',
		filesize_id: 'AddsALinkSetupListFilesize',
		comments_id: 'AddsALinkSetupListComments',
		favorites_id: 'AddsALinkSetupListFavorites',
		views_id: 'AddsALinkSetupListViews',
		ratings_id: 'AddsALinkSetupListRatings',
		avg_rating_id: 'AddsALinkSetupListAvgRating',
		watch_button_id: 'AddsALinkSetupListWatchButton',
		watch_button_text_id: 'AddsALinkSetupListWatchButtonText',
		ul_style: ul_style,
		download_link_style: li_style,
		added_date_style: li_style,
		username_style: li_style,
		duration_style: li_style,
		filesize_style: li_style,
		comments_style: li_style,
		favorites_style: li_style,
		views_style: li_style,
		ratings_style: li_style,
		avg_rating_style: li_style,
		watch_button_style: li_style,
		download_link_text_style: indent_3+li_style_base,
		watch_button_text_style: indent_3+li_style_base,
	},
	video: {
//		autoplay_id: 'AddsALinkSetupVideoPlayerAutoplay',
//		auto_resize_id: 'AddsALinkSetupVideoPlayerAutoResize',
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
		ul_style: ul_style,
//		autoplay_style: li_style,
//		auto_resize_style: li_style,
		lock_ratio_style: li_style,
		fit_aspect_ratio_style: li_style,
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
		setup_button_id: 'AddsALinkSetupScriptSetupButton',
		check_interval_id: 'AddsALinkSetupScriptCheckInterval',
		check_interval_done_id: 'AddsALinkSetupScriptCheckIntervalDone',
		max_send_request_id: 'AddsALinkSetupScriptMaxSendRequest',
		max_wait_limit_id: 'AddsALinkSetupScriptMaxWaitLimit',
		max_retry_id: 'AddsALinkSetupScriptMaxRetry',
		age_verify_id: 'AddsALinkSetupScriptAgeVerify',
		birth_month_id: 'AddsALinkSetupScriptBirthMonth',
		birth_day_id: 'AddsALinkSetupScriptBirthDay',
		birth_year_id: 'AddsALinkSetupScriptBirthYear',
		submit_type_id: 'AddsALinkSetupScriptSubmitType',
		ul_style: ul_style,
		check_interval_style: li_style_text,
		check_interval_done_style: li_style_text,
		max_send_request_style: li_style_text,
		max_wait_limit_style: li_style_text,
		max_retry_style: li_style_text,
		age_verify_style: li_style,
		birth_month_style: indent_3+li_style_base,
		birth_day_style: indent_3+li_style_base,
		birth_year_style: indent_3+li_style_base,
		submit_type_style: indent_3+li_style_base,
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
		ul_style: ul_style,
		day_box_style: 'margin-left:10px;padding-bottom:10px;',
		li_style: li_style,
	},
	radio: {
		style: 'cursor:pointer;margin-right:6px;margin-left:10px;',
	},
	checkbox: {
		style: 'cursor:pointer;margin-right:10px;margin-left:15px;',
	},
	textbox: {
		style: 'margin-left:10px;color:#000000;background-color:#FFFFFF;background-image:none;font-weight:normal;border:2px inset buttonface;',
	},
	select: {
		style: 'margin-left:10px;color:#000000;background-color:#FFFFFF;background-image:none;font-weight:normal;',
	},
	button: {
		ok_id: 'AddsALinkSetupOKButton',
		cancel_id: 'AddsALinkSetupCancelButton',
		ok_style: 'margin:10px 0px 10px 100px;'+setup_button_style,
		cancel_style: 'margin:10px 0px 10px 100px;'+setup_button_style,
	}
};


var	watch_page = false;

const	UNKNOWN_PAGE = 0;
const	HOME_PAGE = 1;
const	VIDEOS_PAGE = 2;
const	CHANNEL_PAGE = 3;
const	MEMBER_PAGE = 4;
const	WATCH_PAGE = 9;
var	page_type = HOME_PAGE;

const	TYPE_INSERTED = 0;
const	TYPE_MODIFIED = 1;

var	max_height = 0;
var	listener_query = '//div[@class="leftcol"]';
var	listener_type = TYPE_INSERTED;
var	anchor_query = '//div[@class="mediaThumb"]/following-sibling::p/a';
var	anchor_queries = new Array();
var	cell_query = '../..';
var	cell_queries = new Array();
var	listbox_query = '';
var	listbox_queries = new Array();
var	added_query = '..';
var	added_queries = new Array();

var	need_username = true;
var	need_duration = true;
var	need_views = true;

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

var	need_update_check = true;

var	listener_nodes = new Array();

const WATCH_URL = 0;
const GET_VIDEO = 1;
const GET_VIDEO_INFO = 2;
const CHANNEL_URL = 3;

var	videoInfo = {};

var	submit_types = [
	"View Straight Content",
	"View Gay Content",
	"View All Content",
];

if(window.location.href.indexOf('/media.php') >= 0) {
	page_type = VIDEOS_PAGE;
	if(window.location.href.indexOf('?m=') >= 0) {
		page_type = WATCH_PAGE;
		watch_page = true;
		need_username = false;
		need_duration = false;
		need_views = false;
	}
} else
if(window.location.href.indexOf('/member.php?') >= 0) {
	page_type = MEMBER_PAGE;
	need_username = false;
} else
if(window.location.href.indexOf('/channels.php?') >= 0) {
	page_type = CHANNEL_PAGE;
	need_username = false;
	if(window.location.href.indexOf('&m=') >= 0) {
		watch_page = true;
	}
} else
if(window.location.href == 'http://pornotube.com/') {
	page_type = HOME_PAGE;
}

switch(page_type) {
case WATCH_PAGE:
	anchor_query = '//div[@class="userMedia"]//p/a';
	added_query = '../..';
	cell_query =  '../../../..';
	break;

case VIDEOS_PAGE:
case MEMBER_PAGE:
case CHANNEL_PAGE:
case HOME_PAGE:
	break;
default:
	break;
}

Init();

if(custom.form.age_verify) {
	var ageverify = document.evaluate('//form[@name="ageverify"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(ageverify) {
		SubmitAgeVerify();
	}
}

window.addEventListener(
    "load",
    function() {
	if(watch_page == true) {
		watch_page_proc();
	}
	list_page_proc();
    },
false);


function SubmitAgeVerify() {
	var month = custom.form.birth_month;
	if(month < 10) {
		month = "0"+month.toString();
	} else {
		month = month.toString();
	}
	var opt = document.evaluate('//select[@name="bYear"]/option[@value="'+custom.form.birth_year+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	opt.selected = true;
	opt = document.evaluate('//select[@name="bMonth"]/option[@value="'+month+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	opt.selected = true;
	opt = document.evaluate('//select[@name="bDay"]/option[@value="'+custom.form.birth_day+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	opt.selected = true;
	unsafeWindow.document.forms['ageverify'].submit[custom.form.submit_type].click();
}

function SetNeedInformation() {
	if(custom.list.username || custom.list.added || custom.list.duration || custom.list.filesize || 
	   custom.list.views || custom.list.favorites || custom.list.comments || 
	   custom.list.ratings || custom.list.avg_rating) {
		need_information = true;
	} else {
		need_information = false;
	}
}

function buildURL(pid, target) {
	var	url = '';
	switch(target) {
	case WATCH_URL:
		var href = queue[pid].href;
		if(href.substr(0,4) == 'http') {
			url = href;
		} else {
			url = 'http://pornotube.com/'+href;
		}
		break;
	case GET_VIDEO_INFO:
		url = 'http://pornotube.com/player/player.php?'+queue[pid]['videohash'];
		break;
	case GET_VIDEO:
		url = 'http://'+queue[pid]['mediaDomain']+'.pornotube.com/'+
			queue[pid]['userId'] + '/' + 
			queue[pid]['mediaId'] + '.flv';
		break;
	case CHANNEL_URL:
		var channelId = queue[pid].href.match(/channelId=\d+/);
		url = 'http://pornotube.com/channels.php?'+channelId;
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
	for (var pid in queue) {
		count++;
		switch(queue[pid].stat) {
		case SENT_REQUEST:
			if(now - queue[pid].sent_time < custom.queue.max_wait_limit) {
				sent++;
			} else {
				WaitMessage(pid, -1, "Can't get informations");
				queue[pid].stat = NOT_RECEIVED;
				if(queue[pid].clone_num) {
					for(var j in queue[pid].clone_pid) {
						var clone_pid = queue[pid].clone_pid[j];
						if(queue[clone_pid].stat == CLONE_DATA) {
							WaitMessage(clone_pid, -1, "Can't get informations");
						}
					}
				}
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
		default:
			done++;
		}
	}
	total_queue_num = count;
	current_request_num = sent;
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
	var now = (new Date()).getTime();
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

function ExtractPid(href) {
	var pid = href.match(/m=(.*)/)[1];
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
	if(anchor_queries.length) {
		for(var i = 0; i < anchor_queries.length; i++) {
			anchor_query = anchor_queries[i];
			added_query = added_queries[i];
			cell_query = cell_queries[i];
			listbox_query = listbox_queries[i];
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

function AddDownloadLink() {
	var q = anchor_query;
	var xp = document.evaluate(q, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(xp.snapshotLength) {

		for (var i=0; i < xp.snapshotLength; i++) {
			var need_clone = false;
			var anchor = xp.snapshotItem(i);
			var href = anchor.getAttribute('href');
			var pid = ExtractPid(href);
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
				watch_page: false,
				stat: NONE,
				node: base,
				href: href,
				parent: parent,
				clone_num: 0,
				clone_pid: new Array(),
				video_cell: video_cell,
				list_box: list_box,
				offsetHeight: parent.offsetHeight,
				offsetTop: video_cell.offsetTop,
				cell_query: cell_query,
				cell_offsetHeight: video_cell.offsetHeight,
			};
		}

	} else {
		Toggle_Listener(true);
	}
}

function ModifyFileName(filename) {
	filename = filename.replace(/[\\\/:;\*\?\"<>\|]/g,'_');
	if(filename.replace('.', '') == '') {
		filename = filename.replace(/\./g, '_');
	}
	return filename;
}


// watch_page_proc routine
function watch_page_proc() {
	var href = window.location.href;
	var pid = ExtractPid(href);
	watch_page_pid = pid;
	var base = document.createElement('div');
	base.id = added_box_watch.base.id;
	var style = buildStyle(custom.style.watch.base, added_box_watch.base.style);
	base.setAttribute('style', style);
	var node = document.evaluate('//div[@class="videoDetails"]/div[@class="halfPadding"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var parent = node.parentNode;
        parent.insertBefore(base, node);
	queue[pid] = {
		watch_page: true,
		stat: STORED_DATA,
		node: base,
		href: href,
		parent: parent,
		clone_num: 0,
		clone_pid: new Array(),
		offsetTop: -1,
	};

// parse watch page
	var	html = document.getElementsByTagName('html')[0].innerHTML;
	var	VideoInfo = ParseSourceXml(html, pid, false);
	CopyVideoInfo(pid, VideoInfo);

	GetVideoDetailInformation(pid);

}

function ParseVideoDetailWatch(pid) {
	var download_url = queue[pid]['video_url'];

// Adds the download button below the player
	var style = buildStyle(custom.style.watch.download, added_box_watch.download.div_style);
	html =
		'<a id="' + added_box_watch.download.anchor_id +
		'" href="' + download_url + '" style="' + style + '">' +
		custom.watch.download_link_text + '</a>' +
		'';

	style = buildStyle(custom.style.watch.download, added_box_watch.download.div_style+"display:none;");
	var div = document.createElement('div');
	div.id = added_box_watch.download.div_id;
	div.setAttribute('style', style);
	div.innerHTML = html;

	var filename = ModifyFileName(queue[pid]['title']);
	div.firstChild.setAttribute('title',filename);
	div.firstChild.setAttribute('filename',filename+custom.extention);
        queue[pid].node.appendChild(div);
	ChangeStyle();
}

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
	custom.form = GetGMValue("form", custom.form, null);
}

function SetSetupDataOthers(){
	GM_setValue("extention", custom.extention);
	GM_setValue("form", uneval(custom.form));
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
	GetSetupDataAll();
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
	if(old_version < 2) {
		var old_data = eval(GM_getValue("style", null));
		custom.style.watch.anchor = old_data.watch.anchor;
	}
}

function DeleteOldData(old_version) {
	if(typeof GM_deleteValue != "function") return;
	if(old_version == 0) {	// old format data
		// nothing
	} else
	if(old_version == 1) {
		GM_deleteValue('style');
	}
}

// initialize
function	Init() {
// get setup data
	GetSetupDataVersion();
	GetSetupDataAll();

// Add menu
	GM_registerMenuCommand( "##### Set up this script(PornoTube) #####", Setup);

	if(need_update_check == true) {
		UpdateCheck(false);
	}

	SetNeedInformation();
	WatchOver();
}

function GetTitle(div) {
	var node = document.evaluate('.//span[@class="blue"]/text()', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node) {
		return node.textContent;
	}
	return "";
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

function GetEmbedCode(div) {
	var xp = document.evaluate('.//object[@id="pornoPlayer"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		return GetEmbed(xp.parentNode.innerHTML);
	}
	return '';
}

function GetEmbedPlayer(div) {
	var xp = document.evaluate('.//input[@id="embedPlayer"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		return decodeURIComponent(xp.getAttribute('value'));
	}
	return '';
}

function GetAdded(div) {
	var xp = document.evaluate('.//p[contains(@class,"halfPadding") and contains(.,"Added")]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		var work = xp.textContent.match(/Added\s(.+)\sby/);
		if(work) {
			return work[1];
		}
	}
	return '';
}

function GetUsername(div) {
	var xp = document.evaluate('.//p[contains(@class,"halfPadding") and contains(.,"Added")]/a', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		return xp.textContent;
	}
	return '';
}

function GetChannelName(div) {
	xp = document.evaluate('.//div[contains(@class,"content")]/div[@class="floatLeft"]/a/span', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		return xp.textContent;
	}
	return '';
}

function GetFavorites(div) {
	var xp = document.evaluate('.//div[@id="mediaMoreInfo"]//span[@class="label" and contains(.,"Favorited:")]/..', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		var work = xp.textContent.match(/Favorited:\s(\d+)\sTimes/);
		if(work) {
			return work[1];
		}
		work = xp.textContent.match(/Favorited:\s(.+)$/);
		if(work == "This media has not been favorited.") {
			return "0";
		}
	}
	return '';
}

function GetDuration(div) {
	var xp = document.evaluate('.//div[@id="mediaMoreInfo"]//span[@class="label" and contains(.,"Duration:")]/..', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		var work = xp.textContent.match(/Duration:\s(.+)$/);
		if(work) {
			return work[1];
		}
	}
	return '';
}

function GetFilesize(div) {
	var xp = document.evaluate('.//div[@id="mediaMoreInfo"]//span[@class="label" and contains(.,"Filesize:")]/..', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		var work = xp.textContent.match(/Filesize:(.+)$/);
		if(work) {
			return work[1];
		}
	}
	return '';
}

function GetViews(div) {
	var xp = document.evaluate('.//div[@id="mediaMoreInfo"]//span[@class="label" and contains(.,"Views:")]/..', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		var work = xp.textContent.match(/Views:\s(\d+)/);
		if(work) {
			return work[1];
		}
	}
	return '';
}

function GetComments(div) {
	var xp = document.evaluate('.//div[@class="contentheader"]/span[contains(.,"Comments")]/../following-sibling::p[contains(@class,"halfPadding")]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		var work = xp.textContent.match(/no comments/);
		if(work) {
			return "0";
		} else {
			return xp.textContent;
		}
	}
//	xp = document.evaluate('.//div[@id="mediaMoreInfo"]//span[@class="label" and contains(.,"Favorited:")]/..', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
//	if(xp.singleNodeValue) {
//		return xp.singleNodeValue.textContent.match(/Favorited:\s(\d+)/)[1];
//	}
	return '';
}

function GetAverage(div) {
	var xp = document.evaluate('.//span[@id="ratingContainer"]/span/text()', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		var work = xp.textContent.match(/([0-9\.]+)\swith/);
		if(work) {
			return work[1];
		}
	}
	return '';
}

function GetRating(div) {
	var xp = document.evaluate('.//span[@id="ratingContainer"]/span/text()', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		var work = xp.textContent.match(/with\s(\d+)\svotes/);
		if(work) {
			return work[1];
		}
	}
	return '';
}

// Parse source xml
function ParseSourceXml(text, pid)
{
	var videoInfo = new Array();
	var div = document.createElement('div');
	div.innerHTML = text;

	videoInfo['title'] = GetTitle(div);

	videoInfo['embedCode'] = GetEmbedCode(div);
	videoInfo['embedPlayer'] = GetEmbedPlayer(div);
	videoInfo['ratings'] = GetRating(div);
	videoInfo['avg_rating'] = GetAverage(div);
	videoInfo['added'] = GetAdded(div);
	videoInfo['username'] = GetUsername(div);
	videoInfo['channel'] = "";
	if(!queue[pid].href.indexOf('channels.php?') >= 0) {
		videoInfo['channel'] = GetChannelName(div);
	}
	videoInfo['favorites'] = GetFavorites(div);
	videoInfo['duration'] = GetDuration(div);
	videoInfo['filesize'] = GetFilesize(div);
	videoInfo['views'] = GetViews(div);
	videoInfo['video_width'] = DEFAULT_PLAYER_WIDTH;
	videoInfo['video_height'] = DEFAULT_PLAYER_HEIGHT;
	if(videoInfo['embedCode']) {
		div.innerHTML = videoInfo['embedCode'];
		var embed = div.firstChild;
		videoInfo['videohash'] = embed.getAttribute('src').match(/v=(.*)/)[1];
		videoInfo['video_width'] = embed.getAttribute('width');
		videoInfo['video_height'] = embed.getAttribute('height');
	} else 
	if(videoInfo['embedPlayer']) {
		div.innerHTML = videoInfo['embedPlayer'];
		var embed = div.firstChild;
		videoInfo['videohash'] = "";
		videoInfo['video_width'] = embed.getAttribute('width');
		videoInfo['video_height'] = embed.getAttribute('height');
	}

	return videoInfo;

}

function CopyVideoInfo(pid, VideoInfo) {
	var infoKeys = [
		'embedCode',
		'embedPlayer',
		'videohash',
		'title',
		'added',
		'channel',
		'username',
		'favorites',
		'duration',
		'filesize',
		'views',
		'comments',
		'ratings',
		'avg_rating',
		'video_width',
		'video_height',
		];
	for (var i in infoKeys) {
		if(VideoInfo[infoKeys[i]]) {
			queue[pid][infoKeys[i]] = VideoInfo[infoKeys[i]];
		} else {
			queue[pid][infoKeys[i]] = "";
		}
	}
}

function GetVideoInformation(pid) {
	var url = buildURL(pid, WATCH_URL);


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
				var xml = xhr.responseXml;
				var finalUrl = xhr.finalUrl;
				var pid = this.pid;
				queue[pid].stat = RECEIVED_RESPONSE;
				if ( xhr.status != 200 ) {	// failed
					GM_log('HTTP status:'+xhr.status);
					WaitMessage(pid, xhr.status);
					return;
				}
				var VideoInfo = ParseSourceXml(text, pid);
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
				if(queue[pid]['videohash']) {
					GetVideoDetailInformation(pid);
				}
			}
		});
	},0);
}

function ModifyParentHeight(pid) {
	var work = new Array();
	var height = 0;
	for (var wpid in queue) {
		if(queue[wpid].offsetTop == queue[pid].offsetTop) {
			if(!queue[wpid].node) continue;
			if(!queue[wpid].node.parentNode) continue;
			work.push(wpid);
			if(queue[wpid].stat != STORED_DATA) {
				continue;
			}
			if(queue[wpid].offsetHeight + queue[wpid].node.offsetHeight > height) {
				height = queue[wpid].offsetHeight + queue[wpid].node.offsetHeight;
			}
		}
	}
	if(height) {
		for (var wpid in work) {
			if(!queue[work[wpid]].node) continue;
			if(cell_calc_type == TYPE_HEIGHT_CALC) {
				queue[work[wpid]].node.parentNode.style.height = height+'px';
				queue[work[wpid]].video_cell.style.height = height+'px';
			} else {
				queue[work[wpid]].node.parentNode.style.height = 'auto';
			}
		}
	}

	if(!queue[pid].offsetTop) {
		if(cell_calc_type == TYPE_HEIGHT_CALC) {
			if(queue[pid].node) {
				height = queue[pid].cell_offsetHeight + queue[pid].node.offsetHeight;
			}
			if(queue[pid].video_cell) {
				queue[pid].video_cell.style.height = height + 'px';
			}
		} else {
			if(queue[pid].video_cell) {
				queue[pid].video_cell.style.height = 'auto';
			}
		}
	}

	if(queue[pid].list_box) {
		if(cell_calc_type == TYPE_HEIGHT_CALC) {
			heihgt = 0;
			for(var i = 0; i < queue[pid].list_box.childNodes.length; i++) {
				height += queue[pid].list_box.childNodes[i].offsetHeight;
			}
			if(height) {
				queue[pid].list_box.style.height = height + 'px';
			}
		} else {
			queue[pid].list_box.style.height = 'auto';
		}
	}
}

function WaitMessage(pid, mode, msg) {
	var id = added_box.meta.wait_id + pid;
	var div = document.getElementById(id);

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
		if(div) {
			div.parentNode.removeChild(div);
		}
	} else {
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
	Toggle_Listener(false);

	var	style;
// Add download link
	var id = added_box.download.id + "_"+ pid;
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
	if(custom.list.download_link && download.href) {
		download.setAttribute('style',style + styles.block_open);
	} else {
		download.setAttribute('style',style + styles.close);
	}

// Add user name(publisher name)
	var id = added_box.username.id + pid;
	var name = document.getElementById(id);
	if(!name) {
		name = document.createElement('a');
		name.id = id;
		var href;
		if(queue[pid]['channel']) {
			href = buildURL(pid, CHANNEL_URL);
			name.innerHTML = queue[pid]['channel']+'<br />';
		} else {
			href = 'http://pornotube.com/member.php?u='+queue[pid]['username'];
			name.innerHTML = queue[pid]['username']+'<br />';
		}
		name.href = href;
		queue[pid].node.appendChild(name);
	}
	style = buildStyle(custom.style.list.username, added_box.username.style);
	if(need_username == true && custom.list.username && (queue[pid]['username'] || queue[pid]['channel'])) {
		name.setAttribute('style',style + styles.block_open);
	} else {
		name.setAttribute('style',style + styles.close);
	}

// Meta data
	var info = '';
	if(custom.list.added && queue[pid]['added']) {
		info += "Added :"+queue[pid]['added'] +"<br />";
	}
	if(need_duration == true && custom.list.duration && queue[pid]['duration']) {
		info += "Duration :"+queue[pid]['duration'] +"<br />";
	}
	if(custom.list.filesize && queue[pid]['filesize']) {
		info += "Filesize :"+queue[pid]['filesize'] +"<br />";
	}
	if(need_views == true && custom.list.views && queue[pid]['views']) {
		info += "Views :"+queue[pid]['views'] +"<br />";
	}
	if(custom.list.favorites && queue[pid]['favorites']) {
		info += "Favorites :"+queue[pid]['favorites'] +"<br />";
	}
	if(custom.list.comments && queue[pid]['comments']) {
		info += "Comments :"+queue[pid]['comments'] +"<br />";
	}
	if(custom.list.ratings && queue[pid]['ratings']) {
		info += "Ratings :"+queue[pid]['ratings'];
		if(custom.list.avg_rating && queue[pid]['avg_rating']) {
			var avg = Math.round(queue[pid]['avg_rating'] * 100)/100;
			info += " ("+ avg + ")";
		}
		info += "<br />";
	}
	id = added_box.meta.id + pid;
	div = document.getElementById(id);
	if(!div) {
		div = document.createElement('div');
		div.id = id;
		if(queue[pid].node) queue[pid].node.appendChild(div);
	}
	div.innerHTML = info;

	style = buildStyle(custom.style.list.meta, added_box.meta.style);
	if(info) {
		div.setAttribute('style',style + styles.block_open);
	} else {
		div.setAttribute('style',style + styles.close);
	}

// Add watch button
	var id = added_box.watch.id + pid;
	var watch_button = document.getElementById(id);
	if(!watch_button) {
		watch_button = document.createElement('input');
		watch_button.type = 'button';
		watch_button.setAttribute("pid", pid);
		watch_button.id = id;
		watch_button.addEventListener("click",function(e) {
				WatchVideo(this.id);
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
//	last_width = _resizeObj.offsetWidth - _padding[1] - _padding[3];
	last_width = _resizeObj.offsetWidth;
//	last_height = _resizeObj.offsetHeight - _padding[0] - _padding[2];
	last_height = _resizeObj.offsetHeight;
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
			width += player_width;
//			width += embed.offsetLeft;
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

	aspect_ratio = embed.width / embed.height;

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
	var embedCode = queue[pid]['embedCode'];
	div.innerHTML = embedCode;
//	if(custom.player.autoplay == true) {
//		div.firstChild.src = div.firstChild.src+"&autoPlay=1";
//	}
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
		title = document.createElement('div');
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
	var ext = custom.extention;
	var text = custom.player.download_link_text;
	if(video_panel.download.type == 'button') {
		download_button.value = text + '('+ext.substr(1)+')';
		download_button.setAttribute('href',queue[pid]['video_url']);
	} else {
		download_button.href = queue[pid]['video_url'];
		download_button.innerHTML = text + '('+ext.substr(1)+')';
	}
	var filename = ModifyFileName(queue[pid]['title']);
	download_button.setAttribute('title',filename);
	download_button.setAttribute('filename',filename+custom.extention);
	style = buildStyle(custom.style.video_panel.download, video_panel.download.style);
	download_button.setAttribute('style', style);
	if(custom.player.download_link) {
		download_button.style.display = 'block';
	} else {
		download_button.style.display = 'none';
	}
	if(append == true) {
		div.appendChild(download_button);
		download_button.addEventListener("click",function(e) {
				e.preventDefault();
				DownloadVideo(download_button.getAttribute('href'));
			},false);
	}

	aspect_ratio_locked = custom.player.lock_ratio;

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

//	id = video_panel.resize.id;
//	var resize_box = document.getElementById(id);
//	if(!resize_box) {
//		resize_box = document.createElement('div');
//		resize_box.innerHTML = "";
//		resize_box.id = id;
//		style = buildStyle(custom.style.video_panel.status_bar, video_panel.resize.style);
//		resize_box.setAttribute('style', style);
//		resize_box.style.cursor = 'se-resize';
//		div.appendChild(resize_box);
//	}

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

	setEmbedSize(div);

//	setResizeObject(div, resize_box);

	if(!player_locked) {
		setDragObject(div);
	} else {
		setDragObject(null);
	}

	if(document.getElementById(setup_box.base.id)) {
		Player_Visible(false);
		window.alert("The watch panel is hidden. Close the setup panel to show it.");
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

function DownloadVideo(url) {
	window.location.href = url;
}

function CloseVideoPanel() {
	var	id = video_panel.box.id;
	var	div = document.getElementById(id);

	if(div) {
		div.setAttribute('style', video_panel.box.close_style);
	}
	setDragObject(null);
}

function Update_Watch_Page() {
	ChangeStyle();
}

function Update_List_Page() {
	SetNeedInformation();
	for (var pid in queue) {
		if(watch_page == false || pid != watch_page_pid){
			if(queue[pid].stat == STORED_DATA) {
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
	var text = custom.player.download_link_text+'('+custom.extention.substr(1)+')'
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
	}
	Update_List_Page();
	Update_Video_Panel();
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

function Setup_Set_List_Box(id, val) {
	var node = document.getElementById(id);
	node.setAttribute('style',setup_box.select.style);
	node.selectedIndex = val;
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

// for list page tab
function Make_Html_For_List_Page() {
	var html = ''+
		'<ul style="'+setup_box.list.ul_style+'"><b>About link and button</b><br />' +
		'<li style="'+setup_box.list.download_link_style+'"><input type="checkbox" id="'+setup_box.list.download_link_id+'">Download link</li>' +
		'<li style="'+setup_box.list.download_link_text_style+'">Text<input type="text" id="'+setup_box.list.download_link_text_id+'" value="'+custom.list.download_link_text+'"></li>'+
		'<li style="'+setup_box.list.watch_button_style+'"><input type="checkbox" id="'+setup_box.list.watch_button_id+'">Watch button</li>' +
		'<li style="'+setup_box.list.watch_button_text_style+'">Text<input type="text" id="'+setup_box.list.watch_button_text_id+'" value="'+custom.list.watch_button_text+'"></li>'+
		'</ul>'+
		'<ul style="'+setup_box.list.ul_style+'"><b>About video informations</b><br />' +
		'<li style="'+setup_box.list.username_style+'"><input type="checkbox" id="'+setup_box.list.username_id+'">Channel name or user name with link</li>' +
		'<li style="'+setup_box.list.added_date_style+'"><input type="checkbox" id="'+setup_box.list.addedDate_id+'">Added</li>' +
		'<li style="'+setup_box.list.duration_style+'"><input type="checkbox" id="'+setup_box.list.duration_id+'">Duration</li>' +
		'<li style="'+setup_box.list.filesize_style+'"><input type="checkbox" id="'+setup_box.list.filesize_id+'">File size</li>' +
		'<li style="'+setup_box.list.views_style+'"><input type="checkbox" id="'+setup_box.list.views_id+'">Views</li>' +
		'<li style="'+setup_box.list.favorites_style+'"><input type="checkbox" id="'+setup_box.list.favorites_id+'">Favorites</li>' +
//		'<li style="'+setup_box.list.comments_style+'"><input type="checkbox" id="'+setup_box.list.comments_id+'">Comments</li>' +
		'<li style="'+setup_box.list.ratings_style+'"><input type="checkbox" id="'+setup_box.list.ratings_id+'">Ratings' +
		'<input type="checkbox" id="'+setup_box.list.avg_rating_id+'">Average</li>' +
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
	Setup_Set_Check_Box(setup_box.list.addedDate_id, custom.list.added);
	Setup_Set_Check_Box(setup_box.list.duration_id, custom.list.duration);
	Setup_Set_Check_Box(setup_box.list.filesize_id, custom.list.filesize);
	Setup_Set_Check_Box(setup_box.list.views_id, custom.list.views);
	Setup_Set_Check_Box(setup_box.list.favorites_id, custom.list.favorites);
//	Setup_Set_Check_Box(setup_box.list.comments_id, custom.list.comments);
	Setup_Set_Check_Box(setup_box.list.ratings_id, custom.list.ratings);
	Setup_Set_Check_Box(setup_box.list.avg_rating_id, custom.list.avg_rating);

}

function Check_Options_List_Page() {
	return true;
}

function Save_Options_List_Page() {
	custom.list.download_link = document.getElementById(setup_box.list.download_link_id).checked;
	custom.list.download_link_text = document.getElementById(setup_box.list.download_link_text_id).value;
	custom.list.watch_button = document.getElementById(setup_box.list.watch_button_id).checked;
	custom.list.watch_button_text = document.getElementById(setup_box.list.watch_button_text_id).value;
	custom.list.username = document.getElementById(setup_box.list.username_id).checked;
	custom.list.added = document.getElementById(setup_box.list.addedDate_id).checked;
	custom.list.duration = document.getElementById(setup_box.list.duration_id).checked;
	custom.list.filesize = document.getElementById(setup_box.list.filesize_id).checked;
	custom.list.views = document.getElementById(setup_box.list.views_id).checked;
	custom.list.favorites = document.getElementById(setup_box.list.favorites_id).checked;
//	custom.list.comments = document.getElementById(setup_box.list.comments_id).checked;
	custom.list.ratings = document.getElementById(setup_box.list.ratings_id).checked;
	custom.list.avg_rating = document.getElementById(setup_box.list.avg_rating_id).checked;
	SetSetupDataListPage();

}

// for video panel tab
function Make_Html_For_Video_Panel() {
	var html = ''+
		'<ul style="'+setup_box.video.ul_style+'"><b>About items on the panel</b><br />' +
		'<li style="'+setup_box.video.download_link_style+'"><input type="checkbox" id="'+setup_box.video.download_link_id+'">Download link</li>' +
		'<li style="'+setup_box.video.download_link_text_style+'">Text<input type="text" id="'+setup_box.video.download_link_text_id+'" value="'+custom.player.download_link_text+'"></li>'+
		'</ul>'+
		'';

	return html;
}

function Setup_Video_Panel() {

	Setup_Set_Check_Box(setup_box.video.download_link_id, custom.player.download_link);
	Setup_Set_Text_Box(setup_box.video.download_link_text_id, custom.player.download_link_text);

}

function Check_Options_Video_Panel() {
	return true;
}

function Save_Options_Video_Panel() {
	custom.player.download_link = document.getElementById(setup_box.video.download_link_id).checked;
	custom.player.download_link_text = document.getElementById(setup_box.video.download_link_text_id).value;

	SetSetupDataVideoPanel();
}

// for watch page tab
function Make_Html_For_Watch_Page() {
	var html = ''+
		'<ul style="'+setup_box.watch.ul_style+'"><b>About button</b><br />' +
		'<li style="'+setup_box.watch.download_link_style+'">'+
		'<input type="checkbox" id="'+setup_box.watch.download_link_id+'">Download button</li>' +
		'<li style="'+setup_box.watch.download_link_text_style+'">Text<input type="text" id="'+setup_box.watch.download_link_text_id+'" value="'+custom.watch.download_link_text+'">' +
		'</li>'+
		'<li style="'+setup_box.watch.text_color_style+'">Text color <input type="text" id="'+setup_box.watch.text_color_id+'" value="'+custom.style.watch.anchor.text_color+'">' +
		'</li>'+
		'<li style="'+setup_box.watch.bg_color_style+'">Background color <input type="text" id="'+setup_box.watch.bg_color_id+'" value="'+custom.style.watch.anchor.bg_color+'">' +
		'</li>'+
		'<li style="'+setup_box.watch.bg_image_style+'">Background image <input type="text" id="'+setup_box.watch.bg_image_id+'" size="50" value="'+custom.style.watch.anchor.bg_image+'">' +
		'</li>'+
		'</ul>';

	return html;
}

function Setup_Watch_Page() {

	Setup_Set_Check_Box(setup_box.watch.download_link_id, custom.watch.download_link);
	Setup_Set_Text_Box(setup_box.watch.download_link_text_id, custom.watch.download_link_text);
	Setup_Set_Text_Box(setup_box.watch.text_color_id, custom.style.watch.anchor.text_color);
	Setup_Set_Text_Box(setup_box.watch.bg_color_id, custom.style.watch.anchor.bg_color);
	Setup_Set_Text_Box(setup_box.watch.bg_image_id, custom.style.watch.anchor.bg_image);

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
		'</ul>' +
		'<ul style="'+setup_box.script.ul_style+'"><b>About age verification</b><br />' +
		'<li style="'+setup_box.script.age_verify_style+'"><input type="checkbox" id="'+setup_box.script.age_verify_id+'">Submit automatically</li>' +
		'<li style="'+setup_box.script.birth_month_style+'">Month<input type="text" id="'+setup_box.script.birth_month_id+'" size="2">' +
		' (' + MIN_BIRTH_MONTH + '-' + MAX_BIRTH_MONTH +')</li>' +
		'<li style="'+setup_box.script.birth_day_style+'">Day<input type="text" id="'+setup_box.script.birth_day_id+'" size="2">' +
		' (' + MIN_BIRTH_DAY + '-' + MAX_BIRTH_DAY +')</li>' +
		'<li style="'+setup_box.script.birth_year_style+'">Year<input type="text" id="'+setup_box.script.birth_year_id+'" size="4">' +
		' (' + MIN_BIRTH_YEAR + '-' + MAX_BIRTH_YEAR +')</li>' +
		'<li style="'+setup_box.script.submit_type_style+'">Submit type '+
		'<select id="'+setup_box.script.submit_type_id+'">';

	for(var i = 0; i < submit_types.length; i++) {
		html += '<option value="'+i+'">'+submit_types[i]+'</option>';
	}

		html += '</select>' +
		'</li>' +
		'</ul>' +
		'';
	return html;
}

function Setup_Script_Control() {

	Setup_Set_Text_Box(setup_box.script.check_interval_id, parseInt(custom.queue.check_interval / 1000));
	Setup_Set_Text_Box(setup_box.script.check_interval_done_id, parseInt(custom.queue.check_interval_done / 1000));
	Setup_Set_Text_Box(setup_box.script.max_send_request_id, custom.queue.max_send_request);
	Setup_Set_Text_Box(setup_box.script.max_wait_limit_id, parseInt(custom.queue.max_wait_limit / 1000));
	Setup_Set_Text_Box(setup_box.script.max_retry_id, custom.queue.max_retry);
	Setup_Set_Check_Box(setup_box.script.age_verify_id, custom.form.age_verify);
	Setup_Set_Text_Box(setup_box.script.birth_year_id, parseInt(custom.form.birth_year));
	Setup_Set_Text_Box(setup_box.script.birth_month_id, parseInt(custom.form.birth_month));
	Setup_Set_Text_Box(setup_box.script.birth_day_id, parseInt(custom.form.birth_day));
	Setup_Set_List_Box(setup_box.script.submit_type_id, parseInt(custom.form.submit_type));

}

function Check_Options_Script_Control() {
	if(/^\d+$/.test(document.getElementById(setup_box.script.check_interval_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.check_interval_done_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.max_send_request_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.max_wait_limit_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.max_retry_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.birth_year_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.birth_month_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.birth_day_id).value) == false)  return false;

	var interval = parseInt(document.getElementById(setup_box.script.check_interval_id).value);
	var interval_done = parseInt(document.getElementById(setup_box.script.check_interval_done_id).value);
	var max_send = parseInt(document.getElementById(setup_box.script.max_send_request_id).value);
	var max_wait = parseInt(document.getElementById(setup_box.script.max_wait_limit_id).value);
	var max_retry = parseInt(document.getElementById(setup_box.script.max_retry_id).value);
	var birth_year = parseInt(document.getElementById(setup_box.script.birth_year_id).value);
	var birth_month = parseInt(document.getElementById(setup_box.script.birth_month_id).value);
	var birth_day = parseInt(document.getElementById(setup_box.script.birth_day_id).value);
	if(interval < MIN_INTERVAL) return false;
	if(interval_done < MIN_INTERVAL) return false;
	if(max_send < MIN_MAX_SEND) return false;
	if(max_wait < MIN_MAX_WAIT) return false;
	if(max_retry < MIN_MAX_RETRY) return false;
	if(birth_year < MIN_BIRTH_YEAR) return false;
	if(birth_month < MIN_BIRTH_MONTH) return false;
	if(birth_day < MIN_BIRTH_DAY) return false;
	if(interval > MAX_INTERVAL) return false;
	if(interval_done > MAX_INTERVAL) return false;
	if(max_send > MAX_MAX_SEND) return false;
	if(max_wait > MAX_MAX_WAIT) return false;
	if(max_retry > MAX_MAX_RETRY) return false;
	if(birth_year > MAX_BIRTH_YEAR) return false;
	if(birth_month > MAX_BIRTH_MONTH) return false;
	if(birth_day > MAX_BIRTH_DAY) return false;
	return true;
}

function Save_Options_Script_Control() {
	custom.queue.check_interval = document.getElementById(setup_box.script.check_interval_id).value * 1000;
	custom.queue.check_interval_done = document.getElementById(setup_box.script.check_interval_done_id).value * 1000;
	custom.queue.max_send_request = document.getElementById(setup_box.script.max_send_request_id).value;
	custom.queue.max_wait_limit = document.getElementById(setup_box.script.max_wait_limit_id).value * 1000;
	custom.queue.max_retry = document.getElementById(setup_box.script.max_retry_id).value;
	custom.form.age_verify = document.getElementById(setup_box.script.age_verify_id).checked;
	custom.form.birth_year = document.getElementById(setup_box.script.birth_year_id).value;
	custom.form.birth_month = document.getElementById(setup_box.script.birth_month_id).value;
	custom.form.birth_day = document.getElementById(setup_box.script.birth_day_id).value;
	custom.form.submit_type = document.getElementById(setup_box.script.submit_type_id).selectedIndex;
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
	document.body.removeChild(base);
	setDragObject(null);
	Player_Visible(true);
}


// Get Video detail information
function GetVideoDetailInformation(pid)
{
	var infoKeys = [
		'mediaId',
		'userId',
		'mediaDomain',
		];
	var url = buildURL(pid, GET_VIDEO_INFO);

	setTimeout(function(){
		if(watch_page == false || pid != watch_page_pid){
			WaitMessage(pid, 1);
		}
		GM_xmlhttpRequest({
			pid: pid,
			method: "GET",
			url: encodeURI(url),
			headers: {
				"User-Agent": window.navigator.userAgent,
				"Accept":"*/*"
			},
			onload: function(xhr){
				var text = xhr.responseText;
				var pid = this.pid;
				queue[pid].stat_detail = RECEIVED_RESPONSE;
				if ( xhr.status != 200) {
					if(watch_page == false || pid != watch_page_pid){
						WaitMessage(pid, xhr.status);
					}
					GM_log(xhr.status + ': ' + text);
					return;
				}

				var param = text.split('&');
				for(var i = 0; i < param.length; i++) {
					if(!param[i]) continue;
					var work = param[i].split('=');
					if(infoKeys.indexOf(work[0]) >= 0) {
						queue[pid][work[0]] = work[1];
					}
				}
				queue[pid].stat_detail = STORED_DATA;
				if(queue[pid]['mediaDomain'] && queue[pid]['userId'] && queue[pid]['mediaId']) {
					queue[pid]['video_url'] = buildURL(pid, GET_VIDEO);
				}
				if(watch_page == false || pid != watch_page_pid){
					WaitMessage(pid, 0);
					AddMetaData(pid);
					if(queue[pid].clone_num) {
						for(var j in queue[pid].clone_pid) {
							var clone_pid = queue[pid].clone_pid[j];
							for (var i in infoKeys) {
								queue[clone_pid][infoKeys[i]] = queue[pid][infoKeys[i]];
							}
							AddMetaData(clone_pid);
						}
					}
				} else {
					ParseVideoDetailWatch(pid);
				}
			}
		});
	},0);
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
	setup.setAttribute('style', 'position:absolute; right:60px; bottom:5px; height:24px;width:60px;margin-left:20px;border:3px outset buttonface;background-color:buttonface;color:#000000;background-image:none;font-weight:bold;cursor:pointer;');
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
	close.setAttribute('style', 'position:absolute; right:5px; top:5px; height:28px;width:28px;margin-left:20px;border:3px outset buttonface;background-color:buttonface;background-image:none;color:#000000;font-weight:bold;font-size:12px;cursor:pointer;');
	base.appendChild(close);

	document.body.appendChild(base);
}

function DispUpdateCheckError(data) {
	var html = "Can't get script information from USO";
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
				update_check.last_check_date = (new Date()).getTime();
				if ( xhr.status != 200 ) {	// failed
					var data = {title: "HTTP Error "+xhr.status, version:""};
					DispUpdateCheckError(data);
					GM_log(xhr.status + ': ' + text);
					return;
				}
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

// for update checker tab
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
