// ==UserScript==
// @name           Adds a link to download original file for Veoh
// @namespace      http://userscripts.org/users/76078
// @version        2.11.3
// @author         charmy
// @description    Adds a link to download original videos and preview videos.
// @include        http://www.veoh.com/*
// @exclude        http://www.veoh.com/ad/*
// ==/UserScript==

(function() {

// for update check
const THIS_SCRIPT_NO = '41901';
const THIS_URL = 'http://userscripts.org/scripts/show/'+THIS_SCRIPT_NO;
const THIS_VER = '2.11.3';
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
const	DEFAULT_PLAYER_WIDTH = 480;	//original value is 410
const	DEFAULT_PLAYER_HEIGHT = 385;	// original value is 341

// for script control
const	NONE = 0;
const	SENT_REQUEST = 1;
const	RECEIVED_RESPONSE = 2;
const	STORED_DATA = 3;
const	NOT_RECEIVED = 4;
const	CLONE_DATA = 9;
var queue = new Array(0);

const MAX_SEND_REQUEST = 20;		// up to 20 http request at the same time
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
var retry_count = 0;
var check_interval = 0;

// for watch page
var	permalink = '';
var	openVideoInformation = false;

// for list page
var	need_information = false;

// for auto pager
// If you want to load thumbnails automatically at the page inserted by auto pager add-on, set true.
// If you want to stop this function,set false.
var	load_thumbnails = true;

// You can customize initial value.
const SETUP_VERSION = 4;
var custom = {
	setup_version: 0,
	player: {
		autoplay: false,	// true or false
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
		download_preview: true,
		download_preview_text: 'Download preview video',
	},
	list: {
		check_box_option: false,
		username: false,
		filesize: false,
		filesize_byte: true,
		dateAdded: false,
		downloads: false,
		views: false,
		numofcomments: false,
		rating: false,
		preview_button: false,
		download_preview: false,
		download_link_text: 'Download',
		preview_button_text: 'Preview',
		download_preview_text: 'Download preview',
	},
	watch: {
		autoplay: true,	// not supported
		download_original: true,
		download_preview: true,
		iPhone: true,
		detail_information: false,
		meta_data_option: false,
		convert_utf8: false,
		download_link_text: 'Download original video',
		preview_button_text: 'Preview',
		download_preview_text: 'Download preview video',
		iPhone_text: 'Go to iPhone page',
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
				bg_image: "",
				font_size: "0.9em",
				font_weight: "",
				others: "",
			},
			download_buttons: {
				text_color: "#FFFFFF",
				bg_color: "#3FC651",
				bg_image: "",
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			download_link: {
				text_color: '#0054A6',
				bg_color: '',
				bg_image: 'none',
				font_size: "",
				font_weight: "",
				others: "",
			},
			name: {
				text_color: '#0000FF',
				bg_color: '',
				bg_image: 'none',
				font_size: "",
				font_weight: "",
				others: "",
			},
			meta: {
				text_color: "#008800",
				bg_color: "",
				bg_image: "",
				font_size: "1em",
				font_weight: "",
				others: "",
			},
			preview_button: {
				text_color: "#FFFFFF",
				bg_color: "#3FC651",
				bg_image: "",
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			preview_download: {
				text_color: '#0054A6',
				bg_color: '',
				bg_image: 'none',
				font_size: "",
				font_weight: "",
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
			},
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
				text_color: '#2F73AF',
				bg_color: 'transparent',
				bg_image: '',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			title: {
				text_color: '',
				bg_color: 'transparent',
				bg_image: '',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			meta: {
				text_color: "",
				bg_color: "",
				bg_image: "",
				font_size: "",
				font_weight: "",
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
				bg_color: '#3FC651',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			anchor: {
				text_color: '#FFFFFF',
				bg_color: '#3FC651',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			lock: {
				text_color: '#FFFFFF',
				bg_color: '#3FC651',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			close: {
				text_color: '#FFFFFF',
				bg_color: '#3FC651',
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

var green_button_style = 'margin-right:10px;cursor:pointer;padding:2px;border:0px;-moz-border-radius:1px;';
var link_button_style = 'display:inline;font-size:12px;font-weight:bold;height:22px;width:192px;padding:8px 30px 8px 30px;';
var button_style = 'cursor:pointer;-moz-border-radius:1px;';
var tooltip_style = 'position:fixed;z-index:20000;margin-right:10px;background-color:#FFFFAA;color:#000000;font-weight:bold;padding:2px;border:0px;-moz-border-radius:1px;';

// for watch pages
var added_box_watch = {
	base: {
		id: 'AddsALinkDownloadBase',
		style: 'margin:6px 0px 10px 0px;',
	},
	//// id and style for 'Get URL' button
	geturl: {
		show: false,
		id: 'AddsALinkGetURLButton',
		style: 'display:inline;position:relative;left:10px;margin-right:20px;margin-bottom:20px;'
	},

	// for original video download button
	original: {
		download_url: '',
		div_id: 'AddsALinkDownloadBaseForOriginalFile',
		div_style: '',
		span_id: 'AddsALinkDownloadBoxForOriginalFile',
		anchor_id: 'AddsALinkDownloadURLForOriginalFile',
		anchor_style: link_button_style,
		title_id: 'AddsALinkTitleBoxForOriginalFile',
		title_style: 'display:block;margin-top:20px;margin-right:20px;margin-bottom:10px;'
	},

	// for preview video download button
	preview: {
		download_url: '',
		div_id: 'AddsALinkDownloadBaseForPreviewFile',
		div_style: '',
		span_id: 'AddsALinkDownloadBoxForPreviewFile',
		anchor_id: 'AddsALinkDownloadURLForPreviewFile',
		anchor_style: link_button_style,
		title_id: 'AddsALinkTitleBoxForPreviewFile',
		title_style: 'display:block;margin-top:10px;margin-right:20px;margin-bottom:10px;'
	},

	// for Go to iPhone button
	mp4: {
		download_url: '',
		div_id: 'AddsALinkDownloadBaseForMp4',
		div_style: '',
		span_id: 'AddsALinkDownloadBoxForMp4',
		anchor_id: 'AddsALinkDownloadURLForMp4',
		anchor_style: link_button_style,
		title_id: 'AddsALinkTitleBoxForMp4',
		title_style: 'display:block;margin-top:10px;margin-right:20px;margin-bottom:10px;'
	},

	// information box and button in watch pages
	info: {
		btn_id: 'AddsALinkVideoInformationButton',
		btn_style: 'display:inline;position:relative;left:10px;margin-right:20px;margin-bottom:20px;',
		box_id: 'AddsALinkVideoDetailInformation',
		caption_id: 'AddsALinkVideoInfomationCaption',
		parent_id: 'AddsALinkVideoInfomationParentBox'
	},

	meta: {
		rating_dt_id: 'AddsALinkWatchRatingDT',
		rating_dd_id: 'AddsALinkWatchRatingDD',
		downloads_dt_id: 'AddsALinkWatchDwonloadsDT',
		downloads_dd_id: 'AddsALinkWatchDwonloadsDD',
		rating_dt_style: '',
		rating_dd_style: '',
		downloads_dt_style: '',
		downloads_dd_style: ''
	},

// for watch button
	watch: {
		id: 'AddsALinkWatchWatchButton',
		style: button_style+'margin-bottom:6px;',
	},

// for the box instead of the player
	player: {
		id: 'AddsALinkWatchDummyPlayer',
		style: 'background-color:#FFFFFF;',
	},

}

// for open/close a box
var styles = {
	block_open: 'display:block;',
	inline_open: 'display:inline;margin-top:10px;',
	close: 'display:none;'
};


//// for video list
// added box for the checkbox and the download link
var added_box = {
	chkbox: {
		id: 'AddsALinkCheckBox_',
		style: 'display:inline;margin-right:5px;'
	},
	base: {
		id: 'AddsALinkBase_',
		style: ''
	},
	download: {
		id: 'AddsALinkDownloadLink_',
		style: ''
	},
	meta: {
		id: 'AddsALinkMetaBox_',
		name_id: 'AddsALinkMetaUsername_',
		wait_id: 'AddsALinkMetaWait_',
		style: '',
		name_style: '',
		wait_style: ''
	},
	tooltip: {
		id: 'AddsALinkTooltip',
		style: tooltip_style,
		distanceX: 0,
		distanceY: 12
	},
	preview_download: {
		id: 'AddsALinkPreviewDownload_',
		style: 'cursor:pointer;'
	},
	preview: {
		id: 'AddsALinkPreview_',
		style: green_button_style
	}
};

var video_panel = {
	box: {
		id: 'AddsALinkVideoPanel',
		style: 'padding:20px 20px 50px 20px;position:fixed;z-index:20000;display:block;cursor:move;',
		close_style: 'display:none;'
	},
	title: {
		id: 'AddsALinkWatchTitle',
		style: 'position:absolute;margin-top:6px;text-align:center;top:0px;left:0px;width:100%;'
	},
	player: {
		id: 'AddsALinkPlayer',
		style: 'margin:20px 0px 0px 0px;'
	},
	preview_download: {
		type: 'link',		// 'button' or 'link'
		id: 'AddsALinkPreviewDownloadButton',
		style: green_button_style+'float:right;'
	},
	lock: {
		id: 'AddsALinkLockButton',
		style: button_style+'position:absolute;top:0px;right:25px;'
	},
	close: {
		id: 'AddsALinkCloseButton',
		style: button_style+'position:absolute;top:0px;right:5px;'
	},
//	lock_ratio: {
//		id: 'AddsALinkLockRatioChkbox',
//		style: 'height:14px;position:absolute;bottom:30px;left:10px;',
//		label_style: 'height:14px;position:absolute;bottom:30px;left:30px;color:#FFFFFF;'
//	},
	status_bar: {
		id: 'AddsALinkStatusBar',
		style: 'height:14px;width:99%;position:absolute;bottom:0px;left:0px;padding:0px 2px 2px 2px;text-align:left;'
	},
	resize: {
		id: 'AddsALinkResizeBox',
		style: 'height:16px;width:16px;position:absolute;bottom:0px;right:0px;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB9SURBVHjaYrxy4QQDcQAggJiIUaStbw4kAQKIiRh1jY2NQAZAADERqQ4IAAKIiRh1IQEeQBIggJiIUQdxK0AAMRGjDsIGCCAmItUBAUAAMRGjDuJWgABiIkYdxK0AAcREjDoIGyCAmIhUBwQAAcREjDqIWwECiJH45AIQYACQSUAeiz1vwgAAAABJRU5ErkJggg==");'
	}
};

// added buttons
var added_buttons = {
	top: {	// parent box(top box)
		id: 'AddsALinkButtonsTopBox',
		style: 'margin-top:10px;'
	},
	bottom: {	// parent box(bottom box)
		id: 'AddsALinkButtonsBottomBox',
		style: 'margin-top:10px;'
	},
	select: {	// Select All
//		id: 'AddsALinkSelectAllButton',
		style: green_button_style
	},
	clear: {	// Clear All
//		id: 'AddsALinkClearAllButton',
		style: green_button_style
	},
	download: {	// Download selected videos
//		id: 'AddsALinkDownloadButton',
		style: green_button_style
	},
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
		download_original_id: 'AddsALinkSetupWatchDownloadOriginalVideo',
		download_link_text_id: 'AddsALinkSetupWatchDownloadLinkText',
		download_preview_id: 'AddsALinkSetupWatchDownloadPreviewVideo',
		download_preview_text_id: 'AddsALinkSetupWatchDownloadPreviewText',
		iPhone_id: 'AddsALinkSetupWatchGoToIPhone',
		iPhone_text_id: 'AddsALinkSetupWatchGoToIPhoneText',
		information_id: 'AddsALinkSetupWatchVideoInformations',
		meta_data_id: 'AddsALinkSetupWatchMetaData',
		convert_utf8_id: 'AddsALinkSetupWatchConvertUTF8',
		disp_type_style: 'margin:5px 0 0 0;',
		title_style: 'text-align:center;margin:0 0 5px 0;font-weight:bold;',
		ul_style: ul_style,
		ul_style_off: 'display:none;',
		text_color_style: li_style_text,
		bg_color_style: li_style_text,
		bg_image_style: li_style_text,
		download_original_style: li_style,
		download_link_text_style: indent_3+li_style_base,
		download_preview_style: li_style,
		download_preview_text_style: indent_3+li_style_base,
		iPhone_style: li_style,
		iPhone_text_style: indent_3+li_style_base,
		information_style: li_style,
		meta_data_style: li_style,
		convert_utf8_style: li_style,
	},
	list: {
		checkbox_id: 'AddsALinkSetupListCheckBox',
		download_link_text_id: 'AddsALinkSetupListDownloadText',
		preview_button_id: 'AddsALinkSetupListWatchButton',
		preview_button_text_id: 'AddsALinkSetupListWatchButtonText',
		download_preview_id: 'AddsALinkSetupListDownloadPreview',
		download_preview_text_id: 'AddsALinkSetupListDownloadPreviewText',
		publisher_id: 'AddsALinkSetupListPublisher',
		filesize_id: 'AddsALinkSetupListFileSize',
		filesize_byte_id: 'AddsALinkSetupListFileSizeByte',
		added_date_id: 'AddsALinkSetupListAddedDate',
		views_id: 'AddsALinkSetupListViews',
		downloads_id: 'AddsALinkSetupListDownloads',
		comments_id: 'AddsALinkSetupListComments',
		rating_id: 'AddsALinkSetupListRating',
		title_style: 'text-align:center;margin:0 0 5px 0;font-weight:bold;',
		ul_style: ul_style,
		chkeckbox_style: li_style,
		download_link_text_style: indent_3+li_style_base,
		preview_button_style: li_style,
		preview_button_text_style: indent_3+li_style_base,
		download_preview_style: li_style,
		download_preview_text_style: indent_3+li_style_base,
		publisher_style: li_style,
		filesize_style: li_style,
		added_date_style: li_style,
		views_style: li_style,
		downloads_style: li_style,
		comments_style: li_style,
		rating_style: li_style,
	},
	video: {
		autoplay_id: 'AddsALinkSetupVideoPlayerAutoplay',
		auto_resize_id: 'AddsALinkSetupVideoPlayerAutoResize',
//		lock_ratio_id: 'AddsALinkSetupVideoPlayerLockRatio',
		fit_aspect_ratio_id: 'AddsALinkSetupVideoPlayerFitAspectRatio',
		height_id: 'AddsALinkSetupVideoPlayerHeight',
		width_id: 'AddsALinkSetupVideoPlayerWidth',
		min_height_id: 'AddsALinkSetupVideoMinResizeHeight',
		min_width_id: 'AddsALinkSetupVideoMinResizeWidth',
		max_height_id: 'AddsALinkSetupVideoMaxResizeHeight',
		max_width_id: 'AddsALinkSetupVideoMaxResizeWidth',
		download_preview_id: 'AddsALinkSetupVideoDownloadPreview',
		download_preview_text_id: 'AddsALinkSetupVideoDownloadPreviewText',
		title_style: 'text-align:center;margin:0 0 5px 0;font-weight:bold;',
		ul_style: ul_style,
		autoplay_style: li_style,
		auto_resize_style: li_style,
//		lock_ratio_style: li_style,
		fit_aspect_ratio_style: "margin-left: 10px;",
		height_style: li_style_text,
		width_style: li_style_text,
		min_height_style: li_style_text,
		min_width_style: li_style_text,
		max_height_style: li_style_text,
		max_width_style: li_style_text,
		download_preview_style: li_style,
		download_preview_text_style: indent_3+li_style_base,
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
		check_now_style: 'position:absolute;right:40px;top:100px;cursor:pointer;background-color:buttonface;',
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
		ok_style: 'margin:20px 20px 10px 100px;cursor:pointer;',
		cancel_style: 'margin:20px 0px 10px 100px;cursor:pointer;',
	}
};

var	old_href = '';
var	watch_page = false;
var	hide_player = false;
var	add_download_button = false;
var	watch_page_menu_added = false;
var	need_username = true;
var	player_locked = false;
var	last_top = 0;
var	last_left = 0;
var	last_width = 0;
var	last_height = 0;
var	last_player_width = 0;
var	last_player_height = 0;
var	aspect_ratio_locked = false;
var	aspect_ratio;
var	listener_query = '//div[@id="contentInner"]|//div[@id="contentHolder"]';
var	anchor_query = '//div[@id="contentInner"]//a[@class="thumbTitle maxLines2"]|//ul[@class="thumbList"]//a[@class="thumbTitle maxLines2"]';
var	cell_query = '../..';
var	listbox_query = 'ancestor::div[@id="browseList"]';
var	added_query = '..';

const	TYPE_HEIGHT_AUTO = 0;
const	TYPE_HEIGHT_CALC = 1;
var	cell_calc_type = TYPE_HEIGHT_CALC;
var	list_calc_type = TYPE_HEIGHT_AUTO;

if(window.location.href.indexOf('http://www.veoh.com/videos/') >= 0 ||
   window.location.href.indexOf('http://www.veoh.com/group/') >= 0 ||
   window.location.href.indexOf('http://www.veoh.com/collection/') >= 0 ||
   window.location.href.indexOf('http://www.veoh.com/users/') >= 0 ||
   window.location.href.indexOf('http://www.veoh.com/myprofile/videos') >= 0 ||
   window.location.href.indexOf('http://www.veoh.com/browse/') >= 0 ||
   window.location.href.indexOf('http://www.veoh.com/search/videos') >= 0 ||
   window.location.href.indexOf('/watch/') >= 0 ||
   window.location.href.indexOf('#watch%3D') >= 0) {
	add_download_button = true;
}
if(window.location.href.indexOf('/watch/') >= 0 ||
   window.location.href.indexOf('#watch%3D') >= 0) {
	watch_page = true;
}

if(window.location.href.indexOf('http://www.veoh.com/myprofile/videos') >= 0) {
	need_username = false;
}

Init();

window.addEventListener(
    "load",
    function() {
	if(window.location.href.indexOf('/watch/') >= 0 ||
	   window.location.href.indexOf('#watch%3D') >= 0) {
		watch_page = true;
	}
	if(watch_page == true) {
		watch_page_proc();
		if(add_download_button == true) {
			AddDownloadButton();
		}
	}
	if(add_download_button == true) {
		list_page_proc();

// Watch over the player displayed
		var node = document.getElementById("watch");
		if(node) {
			node.addEventListener(
			    "DOMAttrModified",
			    AttrModified,
			    false);
		}
	}
    },
false);

function SetNeedInformation() {
	if(custom.list.check_box_option || custom.list.preview_button || custom.list.download_preview ||
	   custom.list.username || custom.list.filesize || custom.list.dateAdded || custom.list.views ||
	   custom.list.downloads || custom.list.numofcomments || custom.list.rating) {
		need_information = true;
	} else {
		need_information = false;
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

function MakeHtmlForButton(btn_var, link_text) {
	var base_style = buildStyle(custom.style.watch.download, btn_var.div_style);
	var title_style = buildStyle(custom.style.watch.title, btn_var.title_style);
	var anchor_style = buildStyle(custom.style.watch.anchor, btn_var.anchor_style);

	var html = 
		'<div id="' + btn_var.div_id + '" style="' + base_style + '">' +
		'<span id="' + btn_var.title_id + '" style="' + title_style + '"> </span>' +
		'<span id="' + btn_var.span_id + '" style="' + styles.close + '">' +
		'<a id="' + btn_var.anchor_id + '" href="' + btn_var.download_url + '" style="' + anchor_style + '">'+link_text+'</a>' +
		'</span>';
	if(btn_var.div_id == added_box_watch.original.div_id) {
		html += '<input type="button" id="' + added_box_watch.geturl.id + '" style="display:none;" value="Get URL"></input>';
	}
	html += '</div>';
	return html;
}

function AddDownloadButton() {

	var btn_html = MakeHtmlForButton(added_box_watch.original, custom.watch.download_link_text) +
		       MakeHtmlForButton(added_box_watch.preview, custom.watch.download_preview_text) +
		       MakeHtmlForButton(added_box_watch.mp4, custom.watch.iPhone_text) +
		       '<br />';

// Add detail information box
	// get playerInfo and embedlinkOuter object
	var	p = document.getElementById(added_box_watch.base.id);
	if(!p) {
		p = document.createElement('div');
		p.id = added_box_watch.base.id;
	}

	p.innerHTML = btn_html;

	var	node1, node2;
	node1 = document.getElementById("playerMetaWrapper");
	node2 = document.getElementById("footer");
	if(!node1 && !node2) {
		return;	// maybe BUG
	} else {
		var	node;
	        node1.parentNode.insertBefore(p, node1);
		node = document.getElementById(added_box_watch.geturl.id);
		if(node) {
			node.addEventListener("click",Change,false);
			if(added_box_watch.geturl.show == true) {
				node.setAttribute('style',added_box_watch.geturl.style);
			}
		}
		node = document.getElementById("playerBottom");
		if(node) {
			node.addEventListener(
			    "DOMSubtreeModified",
			    Video_Changed,
			    false);
		}
		Change();
	}
}

const VIDEO_INFO_URL = 0;
const ORIGINAL_URL = 1;
const IPHONE_URL = 2;

function buildURL(pid, target) {
	var	url = '';
	switch(target) {
	case VIDEO_INFO_URL:
		url = 'http://www.veoh.com/rest/v2/execute.xml?method=veoh.video.findByPermalink&apiKey=4D3E42EC-F10C-4172-A176-D30B468A6972&permalink=' + pid;
		break;
	case ORIGINAL_URL:
		url = 'veoh2://downloadVideo?permalinkId='+pid+'&command=49347A0A-C783-4e92-ADCE-ED7C93207E58';
		break;
	case IPHONE_URL:
		url = 'http://www.veoh.com/iphone/#_Watch/' + pid;
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
	var node = document.getElementById('contentInner');
	if(!node) {
		node = document.getElementById('contentHolder');
		if(!node) {
			return;
		}
	}
	if(mode) {
		node.addEventListener("DOMNodeInserted",NodeInserted,false);
	} else {
		node.removeEventListener("DOMNodeInserted",NodeInserted,false);
	}
}

function NodeInserted() {
	list_page_proc();
	if(load_thumbnails) {
		var images = document.getElementsByClassName('lazyLoad');
		for(var i = 0; i < images.length; i++) {
			images[i].src = images[i].getAttribute('_src');
		}
	}
}

function list_page_proc() {
	SetNeedInformation();
	AddDownloadCheckBox();

}

function AddDownloadCheckBox() {
	var q = anchor_query;
	var xp = document.evaluate(q, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(xp.snapshotLength) {

		for (var i=0; i < xp.snapshotLength; i++) {
			var anchor = xp.snapshotItem(i);
			if(/\/watch\/.*/.test(anchor.href) == false) {
				continue;
			}
			var pid = anchor.href.match(/\/watch\/(.*)/)[1];
			var parent = document.evaluate(added_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if(queue[pid]) {
				if(document.getElementById(added_box.base.id + pid)) {
					continue;
				}
				queue[pid] = {};
			}
			var video_cell = document.evaluate(cell_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var list_box = null;
			if(listbox_query) {
				list_box = document.evaluate(listbox_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			}

			var base = document.createElement('div');
			base.id = added_box.base.id + pid;
			var style = buildStyle(custom.style.list.base, added_box.base.style);
			base.setAttribute('style', style);
			if(need_username == false) {
				base.innerHTML = '<br />';
			}

			Toggle_Listener(false);
		        parent.appendChild(base);
			Toggle_Listener(true);

			queue[pid] = {
				stat: NONE,
				node: base,
				parent: parent,
				offsetHeight: base.parentNode.parentNode.offsetHeight,
				video_cell: video_cell,
				list_box: list_box,
				offsetTop: video_cell.offsetTop,
				offsetHeight: parent.offsetHeight,
				offsetTop: video_cell.offsetTop,
				cell_offsetHeight: video_cell.offsetHeight,
				cell_calc_type: cell_calc_type,
				list_calc_type: list_calc_type,
			};
//			AddCheckBox(pid);
		}

		AddButtonBox();
		ChangeButtonBoxMode(added_buttons.top.id, custom.list.check_box_option)
		ChangeButtonBoxMode(added_buttons.bottom.id, custom.list.check_box_option)
	} else {
		Toggle_Listener(true);
	}
}

function ChangeButtonBoxMode(id, mode) {
	var div = document.getElementById(id);
	if(!div) return;	// perhaps bug

	Toggle_Listener(false);

	if(id == added_buttons.top.id) {
		if(mode == true) {
			div.setAttribute('style', added_buttons.top.style);
		} else {
			div.setAttribute('style', added_buttons.top.style+styles.close);
		}
	} else
	if(id == added_buttons.bottom.id) {
		if(mode == true) {
			div.setAttribute('style', added_buttons.bottom.style);
		} else {
			div.setAttribute('style', added_buttons.bottom.style+styles.close);
		}
	}

	Toggle_Listener(true);
}

function AddButtonBox() {
	var id = added_buttons.top.id;
	var div = document.getElementById(id);
	if(div) {	// Already exists
		return;
	}

	Toggle_Listener(false);

	var q = '//ul[@id="browseList"]|//ul[@id="groupVideoThumbList"]|//ul[@class="thumbList"]';
	xp = document.evaluate(q, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var parent = xp.snapshotItem(0);

	var div = document.createElement('div');
	div.id = added_buttons.top.id;
	div.setAttribute('style', added_buttons.top.style);

	var div2 = document.createElement('div');
	div2.id = added_buttons.bottom.id;
	div2.setAttribute('style', added_buttons.bottom.style);
// buttons
// Select All
	var btn1 = document.createElement('input');
	btn1.type = 'button';
//	btn1.id = added_buttons.select.id;
	btn1.value = 'Select All';
	var style = buildStyle(custom.style.list.download_buttons, added_buttons.select.style);
	btn1.setAttribute('style', style);
	btn1.addEventListener("click",function(){SetAllCheckbox(true);},false);
	var btn1_2 = btn1.cloneNode(false);
	btn1_2.addEventListener("click",function(){SetAllCheckbox(true);},false);
	div.appendChild(btn1);
	div2.appendChild(btn1_2);

// Clear All
	var btn2 = document.createElement('input');
	btn2.type = 'button';
//	btn2.id = added_buttons.clear.id;
	btn2.value = 'Clear All';
	style = buildStyle(custom.style.list.download_buttons, added_buttons.clear.style);
	btn2.setAttribute('style', style);
	btn2.addEventListener("click",function(){SetAllCheckbox(false);},false);
	var btn2_2 = btn2.cloneNode(false);
	btn2_2.addEventListener("click",function(){SetAllCheckbox(false);},false);
	div.appendChild(btn2);
	div2.appendChild(btn2_2);

// Download Original videos
	var btn3 = document.createElement('input');
	btn3.type = 'button';
//	btn3.id = added_buttons.download.id;
	btn3.value = 'Download selected videos';
	var style = buildStyle(custom.style.list.download_buttons, added_buttons.download.style);
	btn3.setAttribute('style', style);
	btn3.addEventListener("click",DownloadOriginal,false);
	var btn3_2 = btn3.cloneNode(false);
	btn3_2.addEventListener("click",DownloadOriginal,false);
	div.appendChild(btn3);
	div2.appendChild(btn3_2);


	parent.parentNode.insertBefore(div, parent);
	parent.parentNode.appendChild(div2);

	Toggle_Listener(true);
}

function SetAllCheckbox(check) {
	var nodes = document.getElementsByClassName('original_download');
	for(var i = 0; i < nodes.length; i++) {
		nodes[i].checked = check;
	}
}

function DownloadOriginal() {
	var nodes = document.getElementsByClassName('original_download');
	for(var i = 0; i < nodes.length; i++) {
		if(nodes[i].checked == true) {
			var pid = nodes[i].value;
			window.location.href = buildURL(pid, ORIGINAL_URL);
		}
	}
}

function ModifyFileName(filename) {
	filename = filename.replace(/[\\\/:;\*\?\"<>\|]/g,'_');
	if(filename.replace('.', '') == '') {
		filename = filename.replace(/\./g, '_');
	}
	return filename;
}


function watch_page_proc() {
	if(document.getElementById(added_box_watch.info.parent_id)) return;

	var info_html = 
		'<div id="'+added_box_watch.info.caption_id+'" style="'+styles.close+'">Original Video Information ' +
		'<input type="button" id="' + added_box_watch.info.btn_id + '" style="' + added_box_watch.info.btn_style + 
		'" value="Open Video Information"></input>'+
		'</div>'+
		'<div id="'+added_box_watch.info.box_id+'" style="'+styles.close+'"></div>';


// Add detail information box
	// get playerInfo and embedlinkOuter object
	var	p = document.createElement('div');

	p.innerHTML = info_html;
	p.setAttribute('id', added_box_watch.info.parent_id);
	p.setAttribute('style', styles.close);

	var	node1, node2;
	node1 = document.getElementById("playerMetaWrapper");
	node2 = document.getElementById("footer");
	if(!node1 && !node2) {
		return;	// maybe BUG
	} else {
		var	node;
        	node2.parentNode.insertBefore(p, node2);
		node = document.getElementById(added_box_watch.info.btn_id);
		if(node) {
			node.addEventListener("click",VideoInfoBox,false);
		}
	}
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
}

function SetSetupDataOthers(){
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
// for watch page
		custom.watch.image_url = GM_getValue("image_url", custom.watch.image_url);
		if(custom.watch.image_url) {	// for old version user
			custom.watch.disp_type = IMAGE_TYPE;
		} else {
			custom.watch.disp_type = TEXT_TYPE;
		}
		custom.watch.disp_type = GM_getValue('disp_type',custom.watch.disp_type);

		custom.watch.image_text = GM_getValue("image_text", custom.watch.image_text);
		if(!custom.watch.image_text) {	// for old version user
			custom.watch.image_text = custom.watch.text_color;
		}
		custom.watch.bg_color = GM_getValue("bg_color", custom.watch.bg_color);
		custom.watch.text_color = GM_getValue("text_color", custom.watch.text_color);
		custom.watch.detail_information = GM_getValue("show_video_detail_information", custom.watch.detail_information);
		custom.watch.meta_data_option = GM_getValue("add_meta_data_option", custom.watch.meta_data_option);
		custom.list.check_box_option = GM_getValue("add_check_box_option", custom.list.check_box_option);
		custom.watch.convert_utf8 = GM_getValue("convert_utf8", custom.watch.convert_utf8);
// for list page
		custom.list.username = GM_getValue("add_username", custom.list.username);
		custom.list.filesize = GM_getValue("add_filesize", custom.list.filesize);
		custom.list.dateAdded = GM_getValue("add_dateAdded", custom.list.dateAdded);
		custom.list.views = GM_getValue("add_views", custom.list.views);
		custom.list.downloads = GM_getValue("add_downloads", custom.list.downloads);
		custom.list.numofcomments = GM_getValue("add_numofcomments", custom.list.numofcomments);
		custom.list.rating = GM_getValue("add_rating", custom.list.rating);
		custom.list.preview_button = GM_getValue("add_preview_button", custom.list.preview_button);
		custom.list.download_preview = GM_getValue("add_download_preview", custom.list.download_preview);
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
	if(old_version < 4) {	// from 1 to 3
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
	if(typeof GM_deleteValue != "function") return;
	if(old_version == 0) {	// old format data
// for list page
		GM_deleteValue("add_check_box_option");
		GM_deleteValue("add_preview_button");
		GM_deleteValue("add_download_preview");
		GM_deleteValue("add_username");
		GM_deleteValue("add_filesize");
		GM_deleteValue("add_dateAdded");
		GM_deleteValue("add_views");
		GM_deleteValue("add_downloads");
		GM_deleteValue("add_numofcomments");
		GM_deleteValue("add_rating");
// for watch page
		GM_deleteValue("disp_type");
		GM_deleteValue("text_color");
		GM_deleteValue("bg_color");
		GM_deleteValue("image_url");
		GM_deleteValue("image_text");
		GM_deleteValue("show_video_detail_information");
		GM_deleteValue("add_meta_data_option");
		GM_deleteValue("convert_utf8");
// for video panel
		GM_deleteValue("autoplay_list");
		GM_deleteValue("auto_resize");
		GM_deleteValue("player_width_list");
		GM_deleteValue("player_height_list");
		GM_deleteValue("min_width_list");
		GM_deleteValue("min_height_list");
		GM_deleteValue("max_width_list");
		GM_deleteValue("max_height_list");
// for others
		GM_deleteValue("Interval");
	}
}

// initialize
function	Init() {
// get setup data
	GetSetupDataVersion();
	GetSetupDataAll();

// Add menu
	if(add_download_button == true) {
		GM_registerMenuCommand( "#### Set up this script(Veoh) ####", Setup);
	}

// for update check
	UpdateCheck(false);

	WatchOver();

}

var old_display = '';

function AttrModified() {
	var node = document.getElementById("watch");
	if(node) {
		if(node.style.display == 'block') {
			watch_page = true;
			if(old_display == '') {
				old_display = 'block';
				watch_page_proc();
				AddDownloadButton();
			}
		} else {
			watch_page = false;
			old_display = '';
		}
	}
}

function Video_Changed() {

	var	old_permalink = permalink;
	if(Get_Permalink()) {
		if(old_permalink != permalink) {
			setTimeout(Change, 1);
//			Change();
			old_href = window.location.href;
		}
	}
}

function Get_Permalink() {

	var	dl_link = document.getElementById("watchDownload");
	if(dl_link) {
		var href = dl_link.getAttribute("href");
		if(href.match(/permalinkId\/(.*)/)) {
			permalink = RegExp.$1;
			return true;
		}
	}
	var	inputtags = document.getElementsByTagName("input");
	if(!inputtags) {
		permalink = "";
		return false;
	}
	var	i;
	var	embedurl = '';
	for(i = 0; i < inputtags.length; i++) {
		var	class = inputtags[i].getAttribute("class");
		if(class != 'embedinputlarge' && class != 'embedinput') {
			continue;
		}
		embedurl = inputtags[i].getAttribute("value");
		break;
	}
	if(!embedurl) return false;
	var	p = embedurl.match(/\/watch\/(.*)/);
	if(p) {
		permalink = RegExp.$1;
		if(permalink.match(/#watch%3D(.*)/) ){
			permalink = RegExp.$1;
		}
	} else if(window.location.href.match(/#watch%3D(.*)/) ) {
		permalink = RegExp.$1;
	}

	return true;
}

var	utf8conv = new Array("tags","title","description","embedCode");
var	max_loop = 5;
var	videoInfo = {};

// Parse source xml
function ParseSourceXml(text)
{
	var parser = new DOMParser();
	var xml = parser.parseFromString( text, "text/xml" );

	var video_node = xml.getElementsByTagName('video');
	if(!video_node.length) {
		return null;
	}

	var attributes = video_node[0].attributes;
	for(var i = 0; i < attributes.length; i++) {
		key = attributes[i].name;
		videoInfo[key] = attributes[i].value;

		if(custom.watch.convert_utf8) {
// Change character code to utf8
			if(utf8conv.indexOf(key) >= 0 && _is_utf8(videoInfo[key]) == true) {
				var str = _from_utf8(videoInfo[key]);
// re-convert up to max_loop while the string code is UTF-8
				for(var loop = 0; loop < max_loop; loop++) {
					if(_is_utf8(str) == true) str = _from_utf8(str);
					else break;
				}
				videoInfo[key] = str;
			}
		}

	}
	videoInfo['video_width'] = DEFAULT_PLAYER_WIDTH;
	videoInfo['video_height'] = DEFAULT_PLAYER_HEIGHT;
	if(videoInfo['embedCode']) {
		videoInfo['embedCode'] = decodeURI(videoInfo['embedCode'].replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
	} else if(videoInfo['aowEmbedCode']) {
		videoInfo['embedCode'] = decodeURI(videoInfo['aowEmbedCode'].replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
	}
	if(videoInfo['embedCode']) {
		var div = document.createElement('div');
		div.innerHTML = videoInfo['embedCode'];
		var embed = div.firstChild;
		if(embed) {
			var width = embed.getAttribute('width');
			var height = embed.getAttribute('height');
			if(width) {
				videoInfo['video_width'] = width;
			}
			if(height) {
				videoInfo['video_height'] = height;
			}
		}
	}
	return videoInfo;

}

function addMetaInfo() {
	var brother = document.getElementById('ratingStars');
	var id1;
	var id2;
	var node1;
	var node2;
	var style;
	if(custom.watch.meta_data_option == true) {
		if(videoInfo['rating'] && videoInfo['numRatingVotes']) {
			id1 = added_box_watch.meta.rating_dt_id;
			id2 = added_box_watch.meta.rating_dd_id;
			node1 = document.getElementById(id1);
			node2 = document.getElementById(id2);
			if(!node1 && !node2) {
				var dt = document.createElement('dt');
				var dd = document.createElement('dd');
				dt.id = id1;
				dd.id = id2;
				dt.innerHTML = '';
				dd.innerHTML = videoInfo['rating']+' ('+videoInfo['numRatingVotes']+')';
				dt.setAttribute('class', 'numRatingVotes');
				dd.setAttribute('class', 'numRatingVotes');
				style = buildStyle(custom.style.watch.meta, added_box_watch.meta.rating_dt_style);
				dt.setAttribute('style', style);
				style = buildStyle(custom.style.watch.meta, added_box_watch.meta.rating_dd_style);
				dd.setAttribute('style', style);
				brother.parentNode.appendChild(dt);
				brother.parentNode.appendChild(dd);
			} else {
				node2.innerHTML = videoInfo['rating']+' ('+videoInfo['numRatingVotes']+')';
			}
		}
		if(videoInfo['numDownloads']) {
			id1 = added_box_watch.meta.downloads_dt_id;
			id2 = added_box_watch.meta.downloads_dd_id;
			node1 = document.getElementById(id1);
			node2 = document.getElementById(id2);
			if(!node1 && !node2) {
				var dt = document.createElement('dt');
				var dd = document.createElement('dd');
				dt.id = id1;
				dd.id = id2;
				dt.innerHTML = 'downloads:';
				dd.innerHTML = videoInfo['numDownloads'];
				dt.setAttribute('class', 'numDownloads');
				dd.setAttribute('class', 'numDownloads');
				style = buildStyle(custom.style.watch.meta, added_box_watch.meta.downloads_dt_style);
				dt.setAttribute('style', style);
				style = buildStyle(custom.style.watch.meta, added_box_watch.meta.downloads_dd_style);
				dd.setAttribute('style', style);
				brother.parentNode.appendChild(dt);
				brother.parentNode.appendChild(dd);
			} else {
				node1.innerHTML = 'downloads:';
				node2.innerHTML = videoInfo['numDownloads'];
			}
		}
	} else {
		id1 = added_box_watch.meta.rating_dt_id;
		id2 = added_box_watch.meta.rating_dd_id;
		node1 = document.getElementById(id1);
		node2 = document.getElementById(id2);
		if(node1) {
			brother.parentNode.removeChild(node1);
		}
		if(node2) {
			brother.parentNode.removeChild(node2);
		}
		id1 = added_box_watch.meta.downloads_dt_id;
		id2 = added_box_watch.meta.downloads_dd_id;
		node1 = document.getElementById(id1);
		node2 = document.getElementById(id2);
		if(node1) {
			brother.parentNode.removeChild(node1);
		}
		if(node2) {
			brother.parentNode.removeChild(node2);
		}
	}
}

function AddInfomation() {
	var	originalVideoInfo = {};
	var	makeAnchors = [
		'fullPreviewHashPath',
		'fullPreviewHashLowPath',
		'previewUrl',
//		'ipodUrl',
		'highResImage',
		'medResImage',
		'fullMedResImagePath',
		'fullHighResImagePath'
		];

	var info_html = '<table border="1" cellpadding="2">';
	for(var key in videoInfo) {
		info_html = info_html + '<tr>';
		info_html = info_html + '<td align="left">'+key+'</td>';
// Add anchor
		if(makeAnchors.indexOf(key) >= 0) {
			originalVideoInfo[key] = videoInfo[key];
			videoInfo[key] = '<a href="' + videoInfo[key] + '">'+videoInfo[key]+'</a>';
		}
// Disable embed
		if(key == 'embedCode' || key == 'aowEmbedCode') {
			videoInfo[key] = videoInfo[key].replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
		}
		info_html = info_html + '<td align="left">'+videoInfo[key]+'</td>';
		info_html = info_html + '</tr>';
	}
	info_html = info_html + '</table>';

	var info_node = document.getElementById(added_box_watch.info.box_id);
	if(info_node) {
		info_node.innerHTML = info_html;
	}

	addMetaInfo();

	if(videoInfo['isExternalMedia'] == 'true') {
		GM_log("ExternalMedia text:"+text);
		ExternalMedia();
		return;
	}

	added_box_watch.original.download_url = buildURL(videoInfo['permalinkId'], ORIGINAL_URL);
	if(originalVideoInfo['previewUrl']) {
		added_box_watch.preview.download_url = originalVideoInfo['previewUrl'];
	} else 
	if(originalVideoInfo['fullPreviewHashPath']) {
		added_box_watch.preview.download_url = originalVideoInfo['fullPreviewHashPath'];
	} else 
	if(originalVideoInfo['fullPreviewHashLowPath']) {
		added_box_watch.preview.download_url = originalVideoInfo['fullPreviewHashLowPath'];
	}
//	if(originalVideoInfo['ipodUrl']) {
//		added_box_watch.mp4.download_url = originalVideoInfo['ipodUrl'];
//	}
	added_box_watch.mp4.download_url = buildURL(permalink, IPHONE_URL);

	var title_span;
	var dl_span;
	var dl_node;
	var base_node;
	if(added_box_watch.original.download_url) {
		title_span = document.getElementById(added_box_watch.original.title_id);
		if(title_span) {
			if(videoInfo['primaryCollectionTitle']) {
				title_span.innerHTML = videoInfo['primaryCollectionTitle']+' '+videoInfo['title']+videoInfo['origExtension'];
			} else {
				title_span.innerHTML = videoInfo['title']+videoInfo['origExtension'];
			}
		}
		dl_span = document.getElementById(added_box_watch.original.span_id);
		if(dl_span) {
			dl_span.setAttribute('style', styles.inline_open);
		}
		dl_node = document.getElementById(added_box_watch.original.anchor_id);
		if(dl_node) {
			if(!dl_node.getAttribute("href")) {
				dl_node.addEventListener("click", function(e) {
						e.preventDefault();
						window.location.href = this.href;
						return false;
					},false); 
			}
			dl_node.setAttribute("href", added_box_watch.original.download_url);
		}
//		base_node = document.getElementById(added_box_watch.original.div_id);
//		if(custom.watch.download_original) {
//			base_node.style.display = "block";
//		} else {
//			base_node.style.display = "none";
//		}
	}
	if(added_box_watch.preview.download_url) {
		title_span = document.getElementById(added_box_watch.preview.title_id);
		if(title_span) {
			title_span.innerHTML = videoInfo['title']+videoInfo['previewExtension'];
		}
		dl_span = document.getElementById(added_box_watch.preview.span_id);
		if(dl_span) {
			dl_span.setAttribute('style', styles.inline_open);
		}
		dl_node = document.getElementById(added_box_watch.preview.anchor_id);
		if(dl_node) {
			dl_node.setAttribute("href", added_box_watch.preview.download_url);
		}
//		base_node = document.getElementById(added_box_watch.preivew.div_id);
//		if(custom.watch.download_preview) {
//			base_node.style.display = "block";
//		} else {
//			base_node.style.display = "none";
//		}
	}
	if(added_box_watch.mp4.download_url) {
		title_span = document.getElementById(added_box_watch.mp4.title_id);
		if(title_span) {
			title_span.innerHTML = '<br />';
		}
		dl_span = document.getElementById(added_box_watch.mp4.span_id);
		if(dl_span) {
			dl_span.setAttribute('style', styles.inline_open);
		}
		dl_node = document.getElementById(added_box_watch.mp4.anchor_id);
		if(dl_node) {
			dl_node.setAttribute("href", added_box_watch.mp4.download_url);
		}
//		base_node = document.getElementById(added_box_watch.mp4.div_id);
//		if(custom.watch.iPhone) {
//			base_node.style.display = "block";
//		} else {
//			base_node.style.display = "none";
//		}
	}

}

function CannotGetVideoInfo() {
	var info_html = 
		'<table border="1" cellpadding="2">' +
		'<tr><td>Can'+"'"+'t get the video information</td></tr>' +
		'</table>';

	OutputErrorMessage(info_html);
}

function ExternalMedia() {
	var info_html = 
		'<table border="1" cellpadding="2">' +
		'<tr><td>This video is an external media</td></tr>' +
		'</table>';

	OutputErrorMessage(info_html);
}

function OutputErrorMessage(info_html) {
	var info_node = document.getElementById(added_box_watch.info.box_id);
	if(info_node) {
		added_box_watch.info_node.innerHTML = info_html;
	}
	var title_span = document.getElementById(added_box_watch.original.title_id);
	if(title_span) {
		title_span.innerHTML = info_html;
	}
	var dl_span = document.getElementById(added_box_watch.original.span_id);
	if(dl_span) {
		dl_span.setAttribute('style', styles.close);
	}
}

function Change() {
	if(window.location.href.indexOf('http://www.veoh.com/group/') >= 0 &&
	   window.location.href.indexOf('#watch%3D') < 0 &&
	   window.location.href.indexOf('/watch/') < 0) {
		return;
	}
	var node = document.getElementById(added_box_watch.info.caption_id);
	var node2 = document.getElementById(added_box_watch.info.parent_id);
	if(node2) {
		if(window.location.href.indexOf('/watch/') >= 0 ||
		   window.location.href.indexOf('#watch%3D') >= 0) {
			node2.setAttribute('style', styles.inline_open);
		}
	}
	if(node) {
		node.setAttribute('style', styles.inline_open);
		if(custom.watch.detail_information == true) {
			openVideoInformation = false;
		} else {
			openVideoInformation = true;
		}
		VideoInfoBox();
	}
	if(Get_Permalink()) {
		GetSourceXml();
		ChangeStyle();
	} else {
		GM_log("Change CannotGetVideoInfo window.location.href:"+window.location.href);
		CannotGetVideoInfo();
	}
}

function VideoInfoBox() {
	if(openVideoInformation == true) {
		Change_Information_Box(styles.close);
	} else {
		Change_Information_Box(styles.block_open);
	}
}

// Get source xml
function GetSourceXml()
{
	var url = buildURL(permalink, VIDEO_INFO_URL);

	setTimeout(function(){
		GM_xmlhttpRequest({
			method:"GET",
			url: url,
			headers:{
				"User-Agent":"veohplugin-1.1.2 service (NT 5.0; IE 7.0; en-US Windows)",
				"Accept":"*/*",
				"Accept-Language":"en-us"
			},
			onload: function(xhr){
				var text = xhr.responseText;
				if ( xhr.status != 200 ) {	// failed
					GM_log(xhr.status + ': ' + text);
					CannotGetVideoInfo();
					return;
				}
				var VideoInfo = ParseSourceXml(text);
				if(VideoInfo) {
					AddInfomation();
				} else {
					GM_log("CannotGetVideoInfo text:"+text);
					CannotGetVideoInfo();
				}
			}
		});
	},0);
}


function GetVideoInformation(pid) {
	if(!need_information) {
		return;
	}

	var url = buildURL(pid, VIDEO_INFO_URL);
	var infoKeys = [
//		'videoId',
		'username',
		'size',
//		'tags',
//		'fileHash',
		'originalHash',
		'origExtension',
		'previewHash',
		'previewExtension',
		'previewUrl',
		'embedCode',
		'title',
//		'description',
		'numDownloads',
		'views',
		'rating',
		'numRatingVotes',
//		'compressor',
//		'age',
		'dateAdded',
//		'country',
//		'language',
		'numOfComments',
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
				"User-Agent":"veohplugin-1.1.2 service (NT 5.0; IE 7.0; en-US Windows)",
				"Accept":"*/*",
				"Accept-Language":"en-us"
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
				var VideoInfo = ParseSourceXml(text);
				if(VideoInfo) {
					for (var i in infoKeys) {
						if(VideoInfo[infoKeys[i]]) {
							queue[pid][infoKeys[i]] = VideoInfo[infoKeys[i]];
						} else {
							queue[pid][infoKeys[i]] = "";
						}
					}
					queue[pid].stat = STORED_DATA;
					WaitMessage(pid, 0);
					AddMetaData(pid);
				}
			}
		});
	},0);
}

function AddCheckBox(pid) {
//	Toggle_Listener(false);
	var id = added_box.chkbox.id+pid;
	var node = document.getElementById(id);
	if(!node) {
		node = document.createElement('input');
		node.id = id;
		node.setAttribute('class', 'original_download');
		node.type = 'checkbox';
		node.value = pid;
		queue[pid].node.appendChild(node);
	}
	node.checked = false;
	if(custom.list.check_box_option) {
		node.setAttribute('style', added_box.chkbox.style);
	} else {
		node.setAttribute('style', added_box.chkbox.style + styles.close);
	}

	id = added_box.download.id+pid;
	var download = document.getElementById(id);
	if(!download) {
		download = document.createElement('a');
		download.id = id;
		download.addEventListener("click", function(e) {
				e.preventDefault();
				window.location.href = this.href;
				return false;
			},false); 
		download.href = buildURL(pid, ORIGINAL_URL);
		queue[pid].node.appendChild(download);
	}
	if(queue[pid].stat == STORED_DATA) {
		if(queue[pid]['origExtension']) {
			download.innerHTML = custom.list.download_link_text + '('+queue[pid]['origExtension'].substr(1)+')<br />';
		}
//	} else {
//		download.innerHTML = custom.list.download_link_text+'<br />';
	}
	var style = buildStyle(custom.style.list.download_link, added_box.download.style);
	if(custom.list.check_box_option) {
		download.setAttribute('style', style);
	} else {
		download.setAttribute('style', style + styles.close);
	}
//	Toggle_Listener(true);

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
	Toggle_Listener(true);
}

function OpenTooltip(x, y, msg) {
	var tooltip = document.getElementById(added_box.tooltip.id);
	if(!tooltip) {
		tooltip = document.createElement('div');
		tooltip.id = added_box.tooltip.id;
	}
	tooltip.setAttribute('style', added_box.tooltip.style);
	tooltip.innerHTML = msg;
	x = x - window.scrollX + added_box.tooltip.distanceX;
	y = y - window.scrollY + added_box.tooltip.distanceY;
	tooltip.style.left = x + "px";
	tooltip.style.top = y + "px";
	document.body.appendChild(tooltip);
}

function CloseTooltip() {
	var tooltip = document.getElementById(added_box.tooltip.id);
	if(tooltip) {
		tooltip.parentNode.removeChild(tooltip);
	}
}

function AddMetaData(pid) {
	if(queue[pid].stat != STORED_DATA) return;

	Toggle_Listener(false);

	if(queue[pid]['originalHash']) {
		AddCheckBox(pid);

		var download = document.getElementById(added_box.download.id+pid);
		if(download && download.textContent.indexOf('(') < 0) {
			download.innerHTML = custom.list.download_link_text + '('+queue[pid]['origExtension'].substr(1)+')<br />';
		}
	}

	var height = queue[pid].offsetHeight;

// Add user name(publisher name)
	var id = added_box.meta.name_id + pid;
	var name = document.getElementById(id);
	if(!name) {
		name = document.createElement('a');
		name.id = id;
		var href = 'http://www.veoh.com/users/'+queue[pid]['username'];
		name.innerHTML = queue[pid]['username']+'<br />';
		name.href = href;
		queue[pid].node.appendChild(name);
	}
	var style = buildStyle(custom.style.list.name, added_box.meta.name_style);
	if(custom.list.username && need_username == true) {
		name.setAttribute('style',style + styles.block_open);
	} else {
		name.setAttribute('style',style + styles.close);
	}

	var info = '';
	if(custom.list.filesize) {
		info += SizeToString(queue[pid]['size']) +"<br />";
	}
	if(custom.list.dateAdded) {
		info += queue[pid]['dateAdded'] +"<br />";
	}
	if(custom.list.views) {
		info += "Views("+queue[pid]['views'] +")<br />";
	}
	if(custom.list.downloads) {
		info += "Downloads("+queue[pid]['numDownloads'] +")<br />";
	}
	if(custom.list.numofcomments) {
		info += "Comments("+queue[pid]['numOfComments'] +")<br />";
	}
	if(custom.list.rating) {
		info += "Rating("+queue[pid]['rating'];
		info += "/"+queue[pid]['numRatingVotes'] +")<br />";
	}

	id = added_box.meta.id + pid;
	var div = document.getElementById(id);
	if(!div) {
		div = document.createElement('div');
		div.id = id;
		queue[pid].node.appendChild(div);
	}
	div.innerHTML = info;

	style = buildStyle(custom.style.list.meta, added_box.meta.style);
	if(custom.list.filesize || custom.list.dateAdded || custom.list.numofcomments || custom.list.views || custom.list.downloads || custom.list.rating) {
		div.setAttribute('style',style + styles.block_open);
	} else {
		div.setAttribute('style',style + styles.close);
	}

// Add preview button
	id = added_box.preview.id + pid;
	var preview_button = document.getElementById(id);
	if(!preview_button) {
		preview_button = document.createElement('input');
		preview_button.type = 'button';
		preview_button.id = id;
		preview_button.setAttribute("pid", pid);
		preview_button.addEventListener("click",function(e) {
				if(e.shiftKey) {
					var	pid = document.getElementById(this.id).getAttribute('pid');
					DownloadPreviewVideo(pid);
				} else {
					PreviewVideo(this.id);
				}
			},false);
		if(queue[pid]['previewUrl']) {
			preview_button.addEventListener("mouseover",function(e) {
					OpenTooltip(e.pageX, e.pageY, "Shift + Click : Download preview file");
				},false);
			preview_button.addEventListener("mouseout",function(e) {
					CloseTooltip();
				},false);
		}

		queue[pid].node.appendChild(preview_button);
	}
	preview_button.value = custom.list.preview_button_text;
	if(queue[pid]['previewExtension']) {
		preview_button.value += '('+queue[pid]['previewExtension'].substr(1)+')';
	}
	style = buildStyle(custom.style.list.preview_button, added_box.preview.style);
	if(custom.list.preview_button) {
		preview_button.setAttribute('style',style + styles.block_open);
	} else {
		preview_button.setAttribute('style',style + styles.close);
	}

	id = added_box.preview_download.id+pid;
	var preview_download = document.getElementById(id);
	if(!preview_download) {
		preview_download = document.createElement('a');
		preview_download.id = id;
		preview_download.setAttribute("pid", pid);
		preview_download.href = queue[pid]['previewUrl'];
		preview_download.setAttribute('filename',ModifyFileName(queue[pid]['title'])+queue[pid]['previewExtension']);
		preview_download.addEventListener("click",function(e) {
				e.preventDefault();
				var	pid = document.getElementById(this.id).getAttribute('pid');
				DownloadPreviewVideo(pid);
			},false);
		queue[pid].node.appendChild(preview_download);
	}
	preview_download.innerHTML = custom.list.download_preview_text+'('+queue[pid]['previewExtension'].substr(1)+')';
	style = buildStyle(custom.style.list.preview_download, added_box.preview_download.style);
	if(custom.list.download_preview && queue[pid]['previewUrl']) {
		preview_download.setAttribute('style',style + styles.block_open);
	} else {
		preview_download.setAttribute('style',style + styles.close);
	}


	height += queue[pid].node.offsetHeight;
	if(queue[pid].node.parentNode && queue[pid].node.parentNode.parentNode) {
		queue[pid].node.parentNode.parentNode.setAttribute('style', 'height:'+height+'px');
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
	last_width = _resizeObj.offsetWidth - _padding[1] - _padding[3];
	last_height = _resizeObj.offsetHeight - _padding[0] - _padding[2];
	last_player_width = parseInt(_playerNode.width);
	last_player_height = parseInt(_playerNode.height);
	_dragDisabled = false;

	MakeStatus(_playerNode);
}


function GetWatchBoxPosition() {
	last_top = _resizeObj.offsetTop;
	last_left = _resizeObj.offsetLeft;
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
		height += embed.offsetTop;
		height += parseInt(embed.height);
		width += parseInt(embed.width);
	} else {
		if(player_width) {
			embed.width = player_width;
			width += parseInt(embed.width);
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
		width = last_width;
		height = last_height;
		embed.width = last_player_width;
		embed.height = last_player_height;
		div.style.cursor = 'auto';
	}
	div.style.height = height + 'px';
	div.style.width = width + 'px';
	div.style.top = top + 'px';
	div.style.left = left + 'px';

	MakeStatus(embed);

}

function PreviewVideo(id) {

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
	var embedCode = queue[pid]['embedCode']
	if(custom.player.autoplay) {
		embedCode = embedCode.replace('&player','&playAuto=1&player');
	}

	div.innerHTML = embedCode;
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
		title.id = id;
		append = true;
	}
	title.innerHTML = queue[pid]['title'];
	style = buildStyle(custom.style.video_panel.title, video_panel.title.style);
	title.setAttribute('style', style);
	if(append == true) {
		div.insertBefore(title, div.firstChild);
	}

	if(queue[pid]['previewUrl']) {
		append = false;
		id = video_panel.preview_download.id;
		var download_button = document.getElementById(id);
		if(!download_button) {
			if(video_panel.preview_download.type == 'button') {
				download_button = document.createElement('input');
				download_button.type = 'button';
			} else {
				download_button = document.createElement('a');
			}
			download_button.id = id;
			append = true;
		}


		var text = custom.player.download_link_text+'('+queue[pid]['previewExtension'].substr(1)+')'
		if(video_panel.preview_download.type == 'button') {
			download_button.value = text;
		} else {
			download_button.href = queue[pid]['previewUrl'];
			download_button.innerHTML = text;
		}
		download_button.setAttribute('title',queue[pid]['title']);
		download_button.setAttribute('filename',ModifyFileName(queue[pid]['title'])+queue[pid]['previewExtension']);
		style = buildStyle(custom.style.video_panel.download, video_panel.preview_download.style);
		download_button.setAttribute('style', style);
		if(custom.player.download_preview) {
			download_button.style.display = 'block';
		} else {
			download_button.style.display = 'none';
		}
		if(append == true) {
			div.appendChild(download_button);
			download_button.addEventListener("click",function(e) {
					e.preventDefault();
					DownloadPreviewVideo(pid);
				},false);
		}
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
//		div.appendChild(close_button);
		title.appendChild(close_button);
		close_button.addEventListener("click",ClosePreviewVideo,false);
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
//		div.appendChild(lock_button);
		title.appendChild(lock_button);
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

function DownloadPreviewVideo(pid) {
	if(queue[pid]['previewUrl']) {
		window.location.href = queue[pid]['previewUrl'];
	}
}

function ClosePreviewVideo() {
	var	id = video_panel.box.id;
	var	div = document.getElementById(id);
	if(div) {
		div.setAttribute('style', video_panel.box.close_style);
	}
	setDragObject(null);
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

function Update_List_Page() {
	SetNeedInformation();
	for (var pid in queue) {
		AddCheckBox(pid);
		if(queue[pid].stat == STORED_DATA) {
			AddMetaData(pid);
		}
	}
	var	div = document.getElementById(video_panel.box.id);
	if(div) {
		setEmbedSize(div);
	}
	ChangeButtonBoxMode(added_buttons.top.id, custom.list.check_box_option)
	ChangeButtonBoxMode(added_buttons.bottom.id, custom.list.check_box_option)
}

function Update_Watch_Page() {
	ChangeStyle();

	if(custom.watch.detail_information == true) {
		Change_Information_Box(styles.block_open);
	} else {
		Change_Information_Box(styles.close);
	}
	addMetaInfo();
}

function Update_Video_Panel() {
	var download_button = document.getElementById(video_panel.preview_download.id);
	if(!download_button) {
		return;
	}
	var filename = download_button.getAttribute('filename');
	if(!filename) return;
	var ext = filename.match(/.*\.(.+)/)[1];
	var text = custom.player.download_preview_text+'('+ext+')';
	if(video_panel.preview_download.type == 'button') {
		download_button.value = text;
	} else {
		download_button.innerHTML = text;
	}
	style = buildStyle(custom.style.video_panel.download, video_panel.preview_download.style);
	download_button.setAttribute('style', style);
	if(custom.player.download_preview) {
		download_button.style.display = 'block';
	} else {
		download_button.style.display = 'none';
	}
}

// Change style for download link
function ChangeStyle() {

	SetButtonStyle(added_box_watch.original, custom.watch.download_link_text);
	SetButtonStyle(added_box_watch.preview, custom.watch.download_preview_text);
	SetButtonStyle(added_box_watch.mp4, custom.watch.iPhone_text);

	base_node = document.getElementById(added_box_watch.original.div_id);
	if(custom.watch.download_original) {
		base_node.style.display = "block";
	} else {
		base_node.style.display = "none";
	}
	base_node = document.getElementById(added_box_watch.preview.div_id);
	if(custom.watch.download_preview) {
		base_node.style.display = "block";
	} else {
		base_node.style.display = "none";
	}
	base_node = document.getElementById(added_box_watch.mp4.div_id);
	if(custom.watch.iPhone) {
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

function Change_Information_Box(box_style) {
	var div = document.getElementById(added_box_watch.info.box_id);
	div.setAttribute('style', box_style);
	var node = document.getElementById(added_box_watch.info.btn_id);
	if(box_style == styles.block_open) {
		openVideoInformation = true;
		node.setAttribute('value', 'Close Video Information');
	} else {
		openVideoInformation = false;
		node.setAttribute('value', 'Open Video Information');
	}
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
		'<ul style="'+setup_box.list.ul_style+'"><b>About check box, link and button</b><br />' +
		'<li style="'+setup_box.list.chkeckbox_style+'"><input type="checkbox" id="'+setup_box.list.checkbox_id+'">Check box and download link</li>' +
		'<li style="'+setup_box.list.download_link_text_style+'">Text<input type="text" id="'+setup_box.list.download_link_text_id+'" value="'+custom.list.download_link_text+'"></li>'+
		'<li style="'+setup_box.list.preview_button_style+'"><input type="checkbox" id="'+setup_box.list.preview_button_id+'">Preview button</li>' +
		'<li style="'+setup_box.list.preview_button_text_style+'">Text<input type="text" id="'+setup_box.list.preview_button_text_id+'" value="'+custom.list.preview_button_text+'"></li>'+
		'<li style="'+setup_box.list.download_preview_style+'"><input type="checkbox" id="'+setup_box.list.download_preview_id+'">Download preview link</li>' +
		'<li style="'+setup_box.list.download_preview_text_style+'">Text<input type="text" id="'+setup_box.list.download_preview_text_id+'" value="'+custom.list.download_preview_text+'"></li>'+
		'</ul>'+
		'<br />'+
		'<ul style="'+setup_box.list.ul_style+'"><b>About video informations</b><br />' +
		'<li style="'+setup_box.list.publisher_style+'"><input type="checkbox" id="'+setup_box.list.publisher_id+'">Publisher name with link</li>' +
		'<li style="'+setup_box.list.filesize_style+'"><input type="checkbox" id="'+setup_box.list.filesize_id+'">File size ' +
		'<input type="checkbox" id="'+setup_box.list.filesize_byte_id+'">with byte size</li>' +
		'<li style="'+setup_box.list.added_date_style+'"><input type="checkbox" id="'+setup_box.list.added_date_id+'">Added date</li>' +
		'<li style="'+setup_box.list.views_style+'"><input type="checkbox" id="'+setup_box.list.views_id+'">Number of views</li>' +
		'<li style="'+setup_box.list.downloads_style+'"><input type="checkbox" id="'+setup_box.list.downloads_id+'">Number of downloads</li>' +
		'<li style="'+setup_box.list.comments_style+'"><input type="checkbox" id="'+setup_box.list.comments_id+'">Number of comments</li>' +
		'<li style="'+setup_box.list.rating_style+'"><input type="checkbox" id="'+setup_box.list.rating_id+'">Rating and number of votes</li>' +
		'</ul>'+
		'';

	return html;
}

function Setup_List_Page() {

	Setup_Set_Check_Box(setup_box.list.checkbox_id, custom.list.check_box_option);
	Setup_Set_Text_Box(setup_box.list.download_link_text_id, custom.list.download_link_text);
	Setup_Set_Check_Box(setup_box.list.preview_button_id, custom.list.preview_button);
	Setup_Set_Text_Box(setup_box.list.preview_button_text_id, custom.list.preview_button_text);
	Setup_Set_Check_Box(setup_box.list.download_preview_id, custom.list.download_preview);
	Setup_Set_Text_Box(setup_box.list.download_preview_text_id, custom.list.download_preview_text);
	Setup_Set_Check_Box(setup_box.list.publisher_id, custom.list.username);
	Setup_Set_Check_Box(setup_box.list.filesize_id, custom.list.filesize);
	Setup_Set_Check_Box(setup_box.list.filesize_byte_id, custom.list.filesize_byte);
	Setup_Set_Check_Box(setup_box.list.added_date_id, custom.list.dateAdded);
	Setup_Set_Check_Box(setup_box.list.views_id, custom.list.views);
	Setup_Set_Check_Box(setup_box.list.downloads_id, custom.list.downloads);
	Setup_Set_Check_Box(setup_box.list.comments_id, custom.list.numofcomments);
	Setup_Set_Check_Box(setup_box.list.rating_id, custom.list.rating);

}

function Check_Options_List_Page() {
	return true;
}

function Save_Options_List_Page() {
	custom.list.check_box_option = document.getElementById(setup_box.list.checkbox_id).checked;
	custom.list.download_link_text = document.getElementById(setup_box.list.download_link_text_id).value;
	custom.list.preview_button = document.getElementById(setup_box.list.preview_button_id).checked;
	custom.list.preview_button_text = document.getElementById(setup_box.list.preview_button_text_id).value;
	custom.list.download_preview = document.getElementById(setup_box.list.download_preview_id).checked;
	custom.list.download_preview_text = document.getElementById(setup_box.list.download_preview_text_id).value;
	custom.list.username = document.getElementById(setup_box.list.publisher_id).checked;
	custom.list.filesize = document.getElementById(setup_box.list.filesize_id).checked;
	custom.list.filesize_byte = document.getElementById(setup_box.list.filesize_byte_id).checked;
	custom.list.dateAdded = document.getElementById(setup_box.list.added_date_id).checked;
	custom.list.views = document.getElementById(setup_box.list.views_id).checked;
	custom.list.downloads = document.getElementById(setup_box.list.downloads_id).checked;
	custom.list.numofcomments = document.getElementById(setup_box.list.comments_id).checked;
	custom.list.rating = document.getElementById(setup_box.list.rating_id).checked;

	SetSetupDataListPage();
}

function Make_Html_For_Video_Panel() {
	var html = ''+
		'<ul style="'+setup_box.video.ul_style+'"><b>About player</b><br />' +
		'<li style="'+setup_box.video.autoplay_style+'"><input type="checkbox" id="'+setup_box.video.autoplay_id+'">Autoplay</li>' +
		'<li style="'+setup_box.video.auto_resize_style+'"><input type="checkbox" id="'+setup_box.video.auto_resize_id+'">Auto Resize</li>' +
//		'<li style="'+setup_box.video.lock_ratio_style+'"><input type="checkbox" id="'+setup_box.video.lock_ratio_id+'">Lock aspect ratio</li>'+
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
		'<br />'+
		'<ul style="'+setup_box.video.ul_style+'"><b>About items on the panel</b><br />' +
		'<li style="'+setup_box.video.download_preview_style+'"><input type="checkbox" id="'+setup_box.video.download_preview_id+'">Download preview link</li>' +
		'<li style="'+setup_box.video.download_preview_text_style+'">Text<input type="text" id="'+setup_box.video.download_preview_text_id+'" value="'+custom.player.download_preview_text+'" size="30"></li>'+
		'</ul>'+
		'';

	return html;
}

function Setup_Video_Panel() {

	Setup_Set_Check_Box(setup_box.video.autoplay_id, custom.player.autoplay);
	Setup_Set_Check_Box(setup_box.video.auto_resize_id, custom.player.auto_resize);
//	Setup_Set_Check_Box(setup_box.video.lock_ratio_id, custom.player.lock_ratio);
	Setup_Set_Text_Box(setup_box.video.width_id, custom.player.player_width);
	Setup_Set_Text_Box(setup_box.video.height_id, custom.player.player_height);
	Setup_Set_Check_Box(setup_box.video.fit_aspect_ratio_id, custom.player.fit_aspect_ratio, setup_box.video.fit_aspect_ratio_style);
	Setup_Set_Text_Box(setup_box.video.min_width_id, custom.player.min_width);
	Setup_Set_Text_Box(setup_box.video.min_height_id, custom.player.min_height);
	Setup_Set_Text_Box(setup_box.video.max_width_id, custom.player.max_width);
	Setup_Set_Text_Box(setup_box.video.max_height_id, custom.player.max_height);
	Setup_Set_Check_Box(setup_box.video.download_preview_id, custom.player.download_preview);
	Setup_Set_Text_Box(setup_box.video.download_preview_text_id, custom.player.download_preview_text);

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
//	custom.player.lock_ratio = document.getElementById(setup_box.video.lock_ratio_id).checked;
	custom.player.player_width = parseInt(document.getElementById(setup_box.video.width_id).value);
	custom.player.player_height = parseInt(document.getElementById(setup_box.video.height_id).value);
	custom.player.fit_aspect_ratio = document.getElementById(setup_box.video.fit_aspect_ratio_id).checked;
	custom.player.min_width = parseInt(document.getElementById(setup_box.video.min_width_id).value);
	custom.player.min_height = parseInt(document.getElementById(setup_box.video.min_height_id).value);
	custom.player.max_width = parseInt(document.getElementById(setup_box.video.max_width_id).value);
	custom.player.max_height = parseInt(document.getElementById(setup_box.video.max_height_id).value);
	custom.player.download_preview = document.getElementById(setup_box.video.download_preview_id).checked;
	custom.player.download_preview_text = document.getElementById(setup_box.video.download_preview_text_id).value;

	SetSetupDataVideoPanel();
}

function Make_Html_For_Watch_Page() {
	var html = ''+
		'<ul style="'+setup_box.watch.ul_style+'"><b>About buttons</b><br />' +
		'<li style="'+setup_box.watch.download_original_style+'">'+
		'<input type="checkbox" id="'+setup_box.watch.download_original_id+'">Download original video</li>' +
		'<li style="'+setup_box.watch.download_link_text_style+'">Text<input type="text" id="'+setup_box.watch.download_link_text_id+'" value="'+custom.watch.download_link_text+'" size="30">' +
		'</li>'+
		'<li style="'+setup_box.watch.download_preview_style+'">'+
		'<input type="checkbox" id="'+setup_box.watch.download_preview_id+'">Download preview video</li>' +
		'<li style="'+setup_box.watch.download_preview_text_style+'">Text<input type="text" id="'+setup_box.watch.download_preview_text_id+'" value="'+custom.watch.download_preview_text+'" size="30">' +
		'</li>'+
		'<li style="'+setup_box.watch.iPhone_style+'">'+
		'<input type="checkbox" id="'+setup_box.watch.iPhone_id+'">Go to iPhone page</li>' +
		'<li style="'+setup_box.watch.iPhone_text_style+'">Text<input type="text" id="'+setup_box.watch.iPhone_text_id+'" value="'+custom.watch.iPhone_text+'" size="30">' +
		'</li>'+
//		'</ul>' +
//		'<ul style="'+setup_box.watch.ul_style+'"><br />' +
		'<li style="'+setup_box.watch.text_color_style+'">Text color <input type="text" id="'+setup_box.watch.text_color_id+'" value="'+custom.style.watch.anchor.text_color+'">' +
		'</li>'+
		'<li style="'+setup_box.watch.bg_color_style+'">Background color <input type="text" id="'+setup_box.watch.bg_color_id+'" value="'+custom.style.watch.anchor.bg_color+'">' +
		'</li>'+
		'<li style="'+setup_box.watch.bg_image_style+'">Background image <input type="text" id="'+setup_box.watch.bg_image_id+'" size="50" value="'+custom.style.watch.anchor.bg_image+'">' +
		'</li>'+
		'</ul>'+
		'<br />'+
		'<ul style="'+setup_box.watch.ul_style+'"><b>About video informations</b><br />' +
		'<li style="'+setup_box.watch.information_style+'">'+
		'<input type="checkbox" id="'+setup_box.watch.information_id+'">Shows video informations box</li>' +
		'<li style="'+setup_box.watch.meta_data_style+'">'+
		'<input type="checkbox" id="'+setup_box.watch.meta_data_id+'">Adds meta data</li>' +
		'<li style="'+setup_box.watch.convert_utf8_style+'">'+
		'<input type="checkbox" id="'+setup_box.watch.convert_utf8_id+'">Converts text to UTF8</li>' +
		'</ul>'+
		'';

	return html;
}


function Setup_Watch_Page() {

	Setup_Set_Text_Box(setup_box.watch.text_color_id, custom.style.watch.anchor.text_color);
	Setup_Set_Text_Box(setup_box.watch.bg_color_id, custom.style.watch.anchor.bg_color);
	Setup_Set_Text_Box(setup_box.watch.bg_image_id, custom.style.watch.anchor.bg_image);
	Setup_Set_Check_Box(setup_box.watch.download_original_id, custom.watch.download_original);
	Setup_Set_Text_Box(setup_box.watch.download_link_text_id, custom.watch.download_link_text);
	Setup_Set_Check_Box(setup_box.watch.download_preview_id, custom.watch.download_preview);
	Setup_Set_Text_Box(setup_box.watch.download_preview_text_id, custom.watch.download_preview_text);
	Setup_Set_Check_Box(setup_box.watch.iPhone_id, custom.watch.iPhone);
	Setup_Set_Text_Box(setup_box.watch.iPhone_text_id, custom.watch.iPhone_text);
	Setup_Set_Check_Box(setup_box.watch.information_id, custom.watch.detail_information);
	Setup_Set_Check_Box(setup_box.watch.meta_data_id, custom.watch.meta_data_option);
	Setup_Set_Check_Box(setup_box.watch.convert_utf8_id, custom.watch.convert_utf8);

}

function Check_Options_Watch_Page() {
	return true;
}

function Save_Options_Watch_Page() {
	custom.style.watch.anchor.text_color = document.getElementById(setup_box.watch.text_color_id).value;
	custom.style.watch.anchor.bg_color = document.getElementById(setup_box.watch.bg_color_id).value;
	custom.style.watch.anchor.bg_image = document.getElementById(setup_box.watch.bg_image_id).value;
	custom.watch.download_original = document.getElementById(setup_box.watch.download_original_id).checked;
	custom.watch.download_link_text = document.getElementById(setup_box.watch.download_link_text_id).value;
	custom.watch.download_preview = document.getElementById(setup_box.watch.download_preview_id).checked;
	custom.watch.download_preview_text = document.getElementById(setup_box.watch.download_preview_text_id).value;
	custom.watch.iPhone = document.getElementById(setup_box.watch.iPhone_id).checked;
	custom.watch.iPhone_text = document.getElementById(setup_box.watch.iPhone_text_id).value;
	custom.watch.detail_information = document.getElementById(setup_box.watch.information_id).checked;
	custom.watch.meta_data_option = document.getElementById(setup_box.watch.meta_data_id).checked;
	custom.watch.convert_utf8 = document.getElementById(setup_box.watch.convert_utf8_id).checked;

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


// Execute download
function Video_Download(){
	Change();
	if(!added_box_watch.original.download_url) {
		return;
	}
	window.location.href=added_box_watch.original.download_url;
}

// Copy from AOK's JavaScript Library. Thanks AOK.
function _from_utf8(s) {
	var c, d = "", flag = 0, tmp;
	for (var i = 0; i < s.length; i++) {
		c = s.charCodeAt(i);
		if (flag == 0) {
			if ((c & 0xe0) == 0xe0) {
				flag = 2;
				tmp = (c & 0x0f) << 12;
			} else if ((c & 0xc0) == 0xc0) {
				flag = 1;
				tmp = (c & 0x1f) << 6;
			} else if ((c & 0x80) == 0) {
				d += s.charAt(i);
			} else {
				flag = 0;
			}
		} else if (flag == 1) {
			flag = 0;
			d += String.fromCharCode(tmp | (c & 0x3f));
		} else if (flag == 2) {
			flag = 3;
			tmp |= (c & 0x3f) << 6;
		} else if (flag == 3) {
			flag = 0;
			d += String.fromCharCode(tmp | (c & 0x3f));
		} else {
			flag = 0;
		}
	}
	return d;
}

// I created this check routine from _from_utf8
function _is_utf8(s) {
	var c, flag = 0;
	var	utf8 = false;
	for (var i = 0; i < s.length; i++) {
		c = s.charCodeAt(i);
		if (flag == 0) {
			if ((c & 0xe0) == 0xe0) {
				flag = 2;
			} else if(c >= 0xc2 && c <= 0xdf) {
				flag = 1;
			} else {
				flag = 0;
			}
		} else if (flag == 1) {
			if(c >= 0x80 && c <= 0xBF) {
				utf8 = true;
			}
			flag = 0;
		} else if (flag == 2) {
			flag = 3;
		} else if (flag == 3) {
			if(c >= 0x80 && c <= 0xBF) {
				utf8 = true;
			}
			flag = 0;
		} else {
			flag = 0;
		}
	}
	return utf8;
}

function SizeToString(bytesize) {
	var size_kb = Math.round(bytesize / 1024 * 100)/100;
	var size_mb = Math.round(bytesize / (1024*1024) * 100)/100;
	var size_gb = Math.round(bytesize / (1024*1024*1024) * 100)/100;
	var size = '';
	if(size_gb >= 1) {
		size = size + size_gb + ' GB';
	} else if(size_mb >= 1) {
		size = size + size_mb + ' MB';
	} else {
		size = size + size_kb + ' KB';
	}
	if(custom.list.filesize_byte) {
		size = size + '(' + bytesize + ' B)';
	}
	return size;
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
