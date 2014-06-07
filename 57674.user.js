// ==UserScript==
// @name           Adds a link to download video for YouTube
// @namespace      http://userscripts.org/users/76078
// @version        0.13.0
// @author         charmy
// @description    Adds a link to download video and a button to watch video for YouTube.
// @include        http://www.youtube.com/watch?v=*
// @include        http://www.youtube.com/user/*
// @include        http://www.youtube.com/*
// @include        http://youtube.com/*
// @include        http://*.youtube.com/*
// ==/UserScript==

(function() {

// for update check
const THIS_SCRIPT_NO = '57674';
const THIS_URL = 'http://userscripts.org/scripts/show/'+THIS_SCRIPT_NO;
const THIS_META_URL = 'http://userscripts.org/scripts/source/'+THIS_SCRIPT_NO+'.meta.js';
const THIS_VER = '0.13.0';
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
	type: ONCE_A_DAY,
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
const	DEFAULT_PLAYER_WIDTH = 640;	//original value is 640
const	DEFAULT_PLAYER_HEIGHT = 385;	// original value is 385

// for script control
const MANUAL_GET = -2;
const WAITING = -1;
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
const PROCESSING_THRESHOLD = 50;		// up to 50 videos
const PAGE_NUM_LIST = 5;		// 5 pages(12 videos per page)
const PAGE_NUM_GRID = 2;		// 2 pages(30 videos per page)

const MIN_INTERVAL = 3;
const MIN_MAX_SEND = 1;
const MIN_MAX_WAIT = 30;
const MIN_MAX_RETRY = 0;
const MIN_PAGE_NUM_LIST = 0;		// 0 page(all videos aren't processed automatically)
const MIN_PAGE_NUM_GRID = 0;		// 0 page(all videos aren't processed automatically)
const MAX_INTERVAL = 60;
const MAX_MAX_SEND = 25;
const MAX_MAX_WAIT = 300;
const MAX_MAX_RETRY = 10;
const MAX_PAGE_NUM_LIST = 20;		// 20 pages(12 videos per page)
const MAX_PAGE_NUM_GRID = 8;		// 8 pages(30 videos per page)

var current_request_num = 0;
var total_queue_num = 0;
var last_done_num = 0;
var retry_count = 0;
var check_interval = 0;

var queue = new Array();
var pages = new Array();

var video_format = {
	fmt_45: {
		type: 'VIDEO_WEBM_TYPE',
		key: '45',
		text: "WebM HD",
		fmt: "WebM",
		quality: "HD",
		resolution: "720p",
	},
	fmt_44: {
		type: 'VIDEO_WEBM_TYPE',
		key: '44',
		text: "WebM HQ",
		fmt: "WebM",
		quality: "HQ",
		resolution: "480p",
	},
	fmt_43: {
		type: 'VIDEO_WEBM_TYPE',
		key: '43',
		text: "WebM",
		fmt: "WebM",
		quality: "",
		resolution: "360p",
	},
	fmt_38: {
		type: 'VIDEO_MP4_TYPE',
		key: '38',
		text: "MP4 Original 4K",
		fmt: "MP4",
		quality: "Original 4K",
		resolution: "4096p",
	},
	fmt_37: {
		type: 'VIDEO_MP4_TYPE',
		key: '37',
		text: "MP4 Full HD",
		fmt: "MP4",
		quality: "Full HD",
		resolution: "1080p",
	},
	fmt_22: {
		type: 'VIDEO_MP4_TYPE',
		key: '22',
		text: "MP4 HD",
		fmt: "MP4",
		quality: "HD",
		resolution: "720p",
	},
	fmt_35: {
		type: 'VIDEO_FLV_TYPE',
		key: '35',
		text: "FLV HQ",
		fmt: "FLV",
		quality: "HQ",
		resolution: "480p",
	},
	fmt_34: {
		type: 'VIDEO_FLV_TYPE',
		key: '34',
		text: "FLV",
		fmt: "FLV",
		quality: "",
		resolution: "360p",
	},
	fmt_5: {
		type: 'VIDEO_FLV_TYPE',
		key: '5',
		text: "FLV LQ",
		fmt: "FLV",
		quality: "LQ",
		resolution: "240p",
	},
};

// for format_type
const FT_WITH_FMT_NO = 0;	// title(fmt=xx) (xx = 38,37,22,18,35,34,5)
const FT_WITH_FMT_NO_ONLY = 1;	// title(xx)	 (xx = 38,37,22,18,35,34,5)
const FT_WITH_FMT_STR = 2;	// title xxx	 (xxx = MP4 Original HD,MP4 Full HD,MP4 HD,MP4 HQ,FLV HQ,FLV,FLV LQ)
const FT_WITH_FMT_STR_NO = 3;	// title xxx	 (xxx = MP4 HD(38),MP4 HD(37),MP4 HD(22),MP4 HQ(18),FLV HQ(35),FLV(34),FLV LQ(5))
const FT_TITLE_ONLY = 4;	// title only
const FT_WITH_QUALITY = 5;	// title xxx	 (xxx = Original,Full HD,HD,HQ,LQ,nothing)
const FT_WITH_RESOLUTION = 6;	// title xxx	 (xxx = 4096p,1080p,720p,480p,360p,240p)

const SETUP_VERSION = 12;
// for setup
var custom = {
	setup_version: 0,
	player: {
		autoplay: true,	// true or false
		auto_resize: false,	// not supported
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
		build_embed: false,
		download_link: true,
		download_link_text: 'Download video',
	},
	extention: {
		VIDEO_FLV_TYPE: '.flv',
		VIDEO_MP4_TYPE: '.mp4',
		VIDEO_WEBM_TYPE: '.webm',
	},
	format_type: {
		filename: FT_WITH_FMT_NO,
		list: FT_WITH_FMT_STR_NO,
		watch: FT_WITH_FMT_STR_NO,
		video_panel: FT_WITH_FMT_STR_NO,
	},
	list: {
		download_link: true,
		addedDate: true,
		comments: true,
		favorites: false,
		watch_button: true,
		download_link_text: 'Download',
		watch_button_text: 'Watch Video',
	},
	watch: {
		download_link: true,
		autoplay: true,	// not supported
		watch_button: true,
		include_video_type: false,
		download_link_text: 'DOWNLOAD',
		watch_button_text: 'Watch Video',
	},
	others: {
		use_title_as_filename: true,
		remove_ads: false,
	},
	fmt: {
		watch: {
			fmt_5: true,	// FLV 
			fmt_22: true,	// MP4 HD
			fmt_34: true,	// FLV H264
			fmt_35: true,	// FLV HQ
			fmt_37: true,	// MP4 Full HD
			fmt_38: true,	// MP4 Original HD
			fmt_43: true,	// WEBM LQ
			fmt_44: true,	// WEBM HQ
			fmt_45: true,	// WEBM HD
		},
		list: {
			fmt_5: true,	// FLV 
			fmt_22: true,	// MP4 HD
			fmt_34: true,	// FLV H264
			fmt_35: true,	// FLV HQ
			fmt_37: true,	// MP4 Full HD
			fmt_38: true,	// MP4 Original HD
			fmt_43: true,	// WEBM LQ
			fmt_44: true,	// WEBM HQ
			fmt_45: true,	// WEBM HD
		},
	},
	queue: {
		check_interval: QUEUE_CHECK_INTERVAL,
		check_interval_done: QUEUE_CHECK_INTERVAL_DONE,
		max_send_request: MAX_SEND_REQUEST,
		max_wait_limit: MAX_WAIT_LIMIT,
		max_retry: MAX_RETRY,
		threshold: PROCESSING_THRESHOLD,
		page_num_processed: true,
		page_num_list: PAGE_NUM_LIST,
		page_num_grid: PAGE_NUM_GRID,
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
			download_e: {	// embedding enabled
				text_color: "#0054A6;",
				bg_color: "",
				font_size: "",
				font_weight: "",
				others: "",
			},
			download_d: {	// embedding disabled
				text_color: "#777777;",
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
			watch_button: {
				text_color: "#FFFFFF",
				bg_color: "#FF3333",
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
				font_weight: "",
				others: "",
			},
			anchor: {
				text_color: '#FFFFFF',
				bg_color: '#FF3333',
				bg_image: '',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			video_type: {
				text_color: '#0054A6',
				bg_color: '',
				bg_image: '',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			watch_button: {
				text_color: "#FFFFFF",
				bg_color: "#FF3333",
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
				bg_color: '#FF3333',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			anchor: {
				text_color: '#FFFFFF',
				bg_color: '#FF3333',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			lock: {
				text_color: '#FFFFFF',
				bg_color: '#FF3333',
				bg_image: 'none',
				font_size: "",
				font_weight: "bold",
				others: "",
			},
			close: {
				text_color: '#FFFFFF',
				bg_color: '#FF3333',
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

const button_style = 'cursor:pointer;-moz-border-radius:1px;';
const fmt_style = 'width: 200px;margin-left:10px;margin-right:20px;';
const BaseID = 'AddsALink';
const SetupBoxID = BaseID+'SetupBox';
const SetupID = BaseID+'Setup';

// for watch page
//var	disp_type = TEXT_TYPE;
var	video_urls = new Array();
var	watch_page_pid = '';
// added box for download links
var added_box_watch = {
// for the video download button
// for text type
	base: {
		base_id: BaseID+'DownloadBase',
		id: BaseID+'DownloadFormatBase',
		base_style: 'margin-bottom:10px;',
		style: 'margin-bottom:10px;',
	},

	download: {
		div_id: BaseID+'TextDownloadBox',
		div_style: 'padding: 5px 0px 5px 0px;',
		anchor_id: BaseID+'TextDownloadURL',
		anchor_style: 'padding: 4px 10px 4px 10px;-moz-border-radius:3px;',
	},

// for format
	format: {
		id: BaseID+'WatchVideoFormat',
		style: fmt_style + 'color:#0054A6;',
		style_2: fmt_style + 'color:#777777;',
	},

// for watch button
	watch: {
		id: BaseID+'WatchWatchButton',
		style: button_style+'margin-bottom:6px;',
	},

// for the box instead of the player
	player: {
		id: BaseID+'WatchDummyPlayer',
		style: 'background-color:#FFFFFF;',
	},

};

// for list page

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
		id: BaseID+'Base_',
		class: BaseID+'BaseClass',
		style: 'float:left;'
	},
	download: {
		id: BaseID+'DownloadLink_',
		style: '',
	},
	meta: {
		id: BaseID+'MetaBox_',
		wait_id: BaseID+'MetaWait_',
		style: '',
	},
	watch: {
		id: BaseID+'Watch_',
		style: button_style+'float:left;',
	},
	separator: {
		id: BaseID+'PageSeparator_',
		style: 'color:#FFFFFF;background-color:rgba(0,127,127,0.8);',
		close_style: 'color:#FFFFFF;background-color:rgba(127,127,127,0.8);',
	},
	continue: {
		id: BaseID+'ContinueBox',
		style: 'position:fixed;top:0;left:0;height:100px;width:400px;z-index:200001;background-color:yellow;padding:10px;',
		ok_id: BaseID+'ContinueOKButton',
		ok_style: 'position:absolute;bottom:10px;left:70px;cursor:pointer;background-color:buttonface;width:30px;text-align:center;',
		cancel_id: BaseID+'ContinueCancelButton',
		cancel_style: 'position:absolute;bottom:10px;left:200px;cursor:pointer;background-color:buttonface;width:60px;text-align:center;'
	},
};

var	video_panel = {
	box: {
		id: BaseID+'VideoPanel',
		style: 'padding:20px 20px 40px 20px;position:fixed;z-index:20000;display:block;cursor:move;',
		close_style: 'display:none;'
	},
	title: {
		id: BaseID+'WatchTitle',
		style: 'height:14px;margin-top:6px'
	},
	player: {
		id: BaseID+'Embed',
		style: 'margin:10px 0px 0px 0px;z-index'
	},
	sel_box: {
		id: BaseID+'SelectFormat',
		style: 'margin-top:10px;padding:2px 4px 2px 4px;position:absolute;bottom:25px;right:170px;'
	},
	download: {
		type: 'link',		// 'button' or 'link'
		id: BaseID+'DownloadButton',
		style: button_style+'margin-top:10px;padding:2px 4px 2px 4px;float:right;'
	},
	lock: {
		id: BaseID+'LockButton',
		style: button_style+'position:absolute;top:5px;right:30px;'
	},
	close: {
		id: BaseID+'CloseButton',
		style: button_style+'position:absolute;top:5px;right:5px;'
	},
	lock_ratio: {
		id: BaseID+'LockRatioChkbox',
		style: 'height:14px;position:absolute;bottom:30px;left:10px;',
		label_style: 'height:14px;position:absolute;bottom:30px;left:30px;color:#FFFFFF;'
	},
	status_bar: {
		id: BaseID+'StatusBar',
		style: 'height:14px;width:99%;position:absolute;bottom:0px;left:0px;padding:0px 2px 2px 2px;text-align:left;'
	},
	resize: {
		id: BaseID+'ResizeBox',
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
const setup_button_style = 'color:#000000;background-color:buttonface;background-image:none;cursor:pointer;border:2px outset buttonface;font-weight:normal;-moz-border-radius:8px;';
var setup_box = {
	base: {
		id: SetupBoxID,
		style: 'position:fixed;width:500px;color:#000000;background-color:buttonface;border:3px outset buttonface;font-size:14px;padding-top:6px;z-index:200000;text-align:left;',
		title_style: 'text-align:center;margin:0 0 5px 0;font-weight:bold;',
		tabs_style: 'margin:0 0 20px 0;font-weight:bold;height:40px;',
		hr_style: 'border: 0px solid black;border-bottom:1px solid #000000;',
		box_style: setup_box_style,
		box_style_active: setup_box_style_active,
		ul_style: 'list-style:none inside;',
	},
	tabs: {
		list: {
			id: SetupBoxID+'ListTab',
			box_id: SetupBoxID+'ListBox',
			style: tab_style+'left:0px;',
			style_active: tab_style_active+'left:0px;',
		},
		video: {
			id: SetupBoxID+'VideoTab',
			box_id: SetupBoxID+'VideoBox',
			style: tab_style+'left:70px;',
			style_active: tab_style_active+'left:70px;',
		},
		watch: {
			id: SetupBoxID+'WatchTab',
			box_id: SetupBoxID+'WatchBox',
			style: tab_style+'left:140px;',
			style_active: tab_style_active+'left:140px;',
		},
		script: {
			id: SetupBoxID+'ScriptControlTab',
			box_id: SetupBoxID+'ScriptControlBox',
			style: tab_style+'left:210px;',
			style_active: tab_style_active+'left:210px;',
		},
		update: {
			id: SetupBoxID+'UpdateCheckerTab',
			box_id: SetupBoxID+'UpdateCheckerBox',
			style: tab_style+'left:280px;',
			style_active: tab_style_active+'left:280px;',
		},
		others: {
			id: SetupBoxID+'OthersTab',
			box_id: SetupBoxID+'OthersBox',
			style: tab_style+'left:350px;',
			style_active: tab_style_active+'left:350px;',
		},
	},
	watch: {
		text_color_id: SetupID+'WatchTextColor',
		bg_color_id: SetupID+'WatchBGColor',
		bg_image_id: SetupID+'WatchBGImage',
		download_link_id: SetupID+'WatchDownloadLink',
		download_link_text_id: SetupID+'WatchDownloadLinkText',
		include_video_type_id: SetupID+'WatchIncludeVideoType',
//		fmt_anchor_id: SetupID+'WatchFmtWithAnchor',
		autoplay_id: SetupID+'WatchAutoplay',
		watch_button_id: SetupID+'WatchWatchButton',
		watch_button_text_id: SetupID+'WatchWatchButtonText',
		disp_type_style: 'margin:5px 0 0 0;',
		title_style: 'text-align:center;margin:0 0 5px 0;font-weight:bold;',
		ul_style: ul_style,
		text_color_style: indent_3+li_style_base,
		bg_color_style: indent_3+li_style_base,
		bg_image_style: indent_3+li_style_base,
//		fmt_anchor_style: li_style,
		download_link_style: li_style,
		include_video_type_style: li_style,
		download_link_text_style: indent_3+li_style_base,
		fmt_type_style: li_style,
		watch_button_style: li_style,
		watch_button_text_style: indent_3+li_style_base,
	},
	list: {
		download_link_id: SetupID+'ListDownloadLink',
		download_link_text_id: SetupID+'ListDownloadText',
		watch_button_text_id: SetupID+'ListWatchButtonText',
		added_date_id: SetupID+'ListAddedDate',
		comments_id: SetupID+'ListComments',
		favorites_id: SetupID+'ListFavorites',
		watch_button_id: SetupID+'ListWatchButton',
		fmt_id: SetupID+'ListVideoFormat',
		ul_style: ul_style,
		download_link_style: li_style,
		download_link_text_style: indent_3+li_style_base,
		added_date_style: li_style,
		comments_style: li_style,
		favorites_style: li_style,
		watch_button_style: li_style,
		watch_button_text_style: indent_3+li_style_base,
		fmt_type_style: li_style,
	},
	video: {
		autoplay_id: SetupID+'VideoPlayerAutoplay',
		auto_resize_id: SetupID+'VideoPlayerAutoResize',
		lock_ratio_id: SetupID+'VideoPlayerLockRatio',
		fit_aspect_ratio_id: SetupID+'VideoPlayerFitAspectRatio',
		height_id: SetupID+'VideoPlayerHeight',
		width_id: SetupID+'VideoPlayerWidth',
		min_height_id: SetupID+'VideoMinResizeHeight',
		min_width_id: SetupID+'VideoMinResizeWidth',
		max_height_id: SetupID+'VideoMaxResizeHeight',
		max_width_id: SetupID+'VideoMaxResizeWidth',
		build_embed_id: SetupID+'VideoBuildEmbedCode',
		download_link_id: SetupID+'VideoDownload',
		download_link_text_id: SetupID+'VideoDownloadText',
		ul_style: ul_style,
		autoplay_style: li_style,
		auto_resize_style: li_style,
		lock_ratio_style: li_style,
		fit_aspect_ratio_style: li_style,
		height_style: li_style_text,
		width_style: li_style_text,
		min_height_style: li_style_text,
		min_width_style: li_style_text,
		max_height_style: li_style_text,
		max_width_style: li_style_text,
		build_embed_style: li_style,
		download_link_style: li_style,
		download_link_text_style: indent_3+li_style_base,
	},
	script: {
		check_interval_id: SetupID+'ScriptCheckInterval',
		check_interval_done_id: SetupID+'ScriptCheckIntervalDone',
		max_send_request_id: SetupID+'ScriptMaxSendRequest',
		max_wait_limit_id: SetupID+'ScriptMaxWaitLimit',
		max_retry_id: SetupID+'ScriptMaxRetry',
		page_num_processed_id: SetupID+'ScriptPageNumProcessed',
		page_num_list_id: SetupID+'ScriptPageNumList',
		page_num_grid_id: SetupID+'ScriptPageNumGrid',
		ul_style: ul_style,
		check_interval_style: li_style_text,
		check_interval_done_style: li_style_text,
		max_send_request_style: li_style_text,
		max_wait_limit_style: li_style_text,
		max_retry_style: li_style_text,
		page_num_processed_style: li_style,
		page_num_list_style: indent_3+li_style_base,
		page_num_grid_style: indent_3+li_style_base,
	},
	update: {
		check_now_id: SetupID+'CheckNowButton',
		check_now_style: 'position:absolute;left:280px;top:110px;'+setup_button_style,
		type_name: SetupID+'UpdateTypeName',
		day_name: SetupID+'UpdateDayName',
		no_check_id: SetupID+'UpdateNoCheck',
		every_loading_id: SetupID+'UpdateEveryLoading',
		once_a_day_id: SetupID+'UpdateOnceADay',
		once_a_week_id: SetupID+'UpdateOnceAWeek',
		once_a_month_id: SetupID+'UpdateOnceAMonth',
		day_box_id: SetupID+'UpdateDayBox',
		any_day_id: SetupID+'UpdateCheckAnyDay',
		sunday_id: SetupID+'UpdateCheckSunday',
		monday_id: SetupID+'UpdateCheckMonday',
		tuesday_id: SetupID+'UpdateCheckTuesday',
		wednesday_id: SetupID+'UpdateCheckWednesday',
		thursday_id: SetupID+'UpdateCheckThursday',
		friday_id: SetupID+'UpdateCheckFriday',
		saturday_id: SetupID+'UpdateCheckSaturday',
		ul_style: ul_style,
		day_box_style: 'margin-left:10px;padding-bottom:10px;',
		li_style: li_style,
	},
	others: {
		use_title_as_filename_id: SetupID+'OthersUseTitleAsFilename',
		ft_name: SetupID+'FTName',
		ft_id: SetupID+'FTType',
		ft_box_id: SetupID+'FTBox',
//		remove_ads_id: SetupID+'OthersRemoveAds',
		ul_style: ul_style,
		li_style: li_style,
		ft_box_style: li_style,
		use_title_as_filename_style: li_style,
//		remove_ads_style: li_style,
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
		ok_id: SetupID+'OKButton',
		cancel_id: SetupID+'CancelButton',
		ok_style: 'margin:10px 0px 10px 150px;'+setup_button_style,
		cancel_style: 'margin:10px 0px 10px 100px;'+setup_button_style,
	}
};


var	watch_page = false;
var	hide_player = false;

const	UNKNOWN_PAGE = 0;
const	CHANNEL_PAGE = 1;
const	VIDEOS_PAGE = 2;
const	SEARCH_PAGE = 3;
const	PROFILE_PAGE = 4;
const	PLAYLIST_PAGE = 5;
const	WATCH_PAGE = 6;
const	SHOW_PAGE = 7;
const	MOVIES_PAGE = 8;
const	HOME_PAGE = 10;
const	MY_UPLOADED_VIDEOS_PAGE = 11;
const	MY_FAVORITES_PAGE = 12;
const	MY_PLAYLIST_PAGE = 13;
const	MY_SUBSCRIPTIONS_PAGE = 14;
const	MY_QUICKLIST_PAGE = 15;
const	MY_HISTORY_PAGE = 16;
const	MY_PURCHASES_PAGE = 17;
const	RECENT_ACTIVITY_PAGE = 18;
const	MUSIC_PAGE = 19;
const	CATEGORIES_PAGE = 21;


var	page_type = UNKNOWN_PAGE;	// reserved

const	TYPE_INSERTED = 0;
const	TYPE_MODIFIED = 1;

const	CALL_FROM_WATCH = 0;
const	CALL_FROM_LIST = 1;

const	default_anchor_query = '//a[contains(@href,"/watch?") or contains(@href,"/watch_videos?")]';
var	max_height = 0;
var	listener_query = '';
var	listener_type = TYPE_INSERTED;
var	anchor_query = '';
var	anchor_queries = new Array();
var	inserted_proc = false;
var	inserted_procs = new Array();
var	cell_query = '';
var	cell_queries = new Array();
var	listbox_query = '';
var	listbox_queries = new Array();
var	added_query = '';
var	added_queries = new Array();
var	spotlight_query = '';
var	page_query = '//div[contains(@class,"scrollbox-page")]';
var	grid_query = 'ancestor::div[@id="playnav-gridview"]';
var	video_changed_listener_query = '';
var	video_changed_listener_type = TYPE_MODIFIED;
var	video_changed_cnt = 0;
var	need_promoted = false;

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
var video_changed_listener_nodes = new Array();

const WATCH_URL = 0;
const GET_VIDEO_INFO = 1;
const GET_VIDEO = 2;
const STAT_URL = 3;
const EMBED_URL = 4;

const ASV_NUMBER = '2';	// for get_video API

var	insert_now = false;
var	videoInfo = {};


if(window.location.href == 'http://www.youtube.com/') {
	page_type = HOME_PAGE;
} else
if(window.location.href.indexOf('/results?') >= 0) {
	page_type = SEARCH_PAGE;
} else
if(window.location.href.indexOf('/categories?') >= 0) {
	page_type = CATEGORIES_PAGE;
} else
if(window.location.href.indexOf('/videos') >= 0) {
	page_type = VIDEOS_PAGE;
} else
if(window.location.href.indexOf('/music') >= 0) {
	page_type = MUSIC_PAGE;
} else
if(window.location.href.indexOf('/show/') >= 0 ||
   window.location.href.indexOf('/show?') >= 0) {
	page_type = SHOW_PAGE;
} else
if(window.location.href.indexOf('/movie/') >= 0) {
	page_type = MOVIES_PAGE;
} else
if(window.location.href.indexOf('/user/') >= 0 ||
   window.location.href.indexOf('/group/') >= 0 ||
   window.location.href.indexOf('/profile?') >= 0) {
	if(document.getElementById('channel-body')) {
		page_type = CHANNEL_PAGE;
	} else {
		page_type = PROFILE_PAGE;
	}
} else
if(window.location.href.indexOf('/view_play_list?') >= 0) {
	page_type = PLAYLIST_PAGE;
} else
if(window.location.href.indexOf('/watch?') >= 0) {
	page_type = WATCH_PAGE;
} else
if(window.location.href.indexOf('/my_videos') >= 0) {
	page_type = MY_UPLOADED_VIDEOS_PAGE;
} else
if(window.location.href.indexOf('/my_favorites') >= 0) {
	page_type = MY_FAVORITES_PAGE;
} else
if(window.location.href.indexOf('/my_playlists') >= 0) {
	page_type = MY_PLAYLIST_PAGE;
} else
if(window.location.href.indexOf('/my_subscriptions') >= 0) {
	page_type = MY_SUBSCRIPTIONS_PAGE;
} else
if(window.location.href.indexOf('/my_quicklist') >= 0) {
	page_type = MY_QUICKLIST_PAGE;
} else
if(window.location.href.indexOf('/my_history') >= 0) {
	page_type = MY_HISTORY_PAGE;
} else
if(window.location.href.indexOf('/my_purchases') >= 0) {
	page_type = MY_PURCHASES_PAGE;
} else
if(window.location.href.indexOf('/subtivity') >= 0) {
	page_type = RECENT_ACTIVITY_PAGE;
} else {
	page_type = UNKNOWN_PAGE;	// May be Videos page or localized Home page
	var spotlight = document.evaluate('//div[contains(@class,"main-tabs-spotlight")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(spotlight) {
		page_type = VIDEOS_PAGE;
	} else {
		if(document.getElementById('channel-body')) {
			page_type = CHANNEL_PAGE;
		} else 
		if(document.getElementById('videos-main')) {
			page_type = VIDEOS_PAGE;
		} else {
			page_type = HOME_PAGE;
		}
	}
}

switch(page_type) {
case	UNKNOWN_PAGE:
	break;

case	CHANNEL_PAGE:
	listener_query = '//div[@id="playnav-play-content"]|//div[@id="playnav-grid-content"]';
	listener_type = TYPE_MODIFIED;
	video_changed_listener_query = '//div[@id="playnav-panel-info"]';
	video_changed_listener_type = TYPE_MODIFIED;
	cell_calc_type = TYPE_HEIGHT_CALC;
	list_calc_type = TYPE_HEIGHT_AUTO;
	var cnt = 0;
	anchor_queries[cnt] = '//div[contains(@class,"playnav-video-info")]'+default_anchor_query;
	cell_queries[cnt] = 'ancestor::div[contains(@class,"playnav-item")]';
	listbox_queries[cnt] = 'ancestor::div[contains(@class,"scrollbox-page")]';
	added_queries[cnt] = 'ancestor::div[@class="playnav-video-info"]';
	inserted_procs[cnt] = true;
	cnt++;
	anchor_queries[cnt] = '//div[@class="centerpiece"]'+default_anchor_query+'/img/..';
	cell_queries[cnt] =  'ancestor::div[@class="centerpiece"]';
	added_queries[cnt] = 'ancestor::div[@class="centerpiece"]';
	listbox_queries[cnt] = '';
	inserted_procs[cnt] = false;
	cnt++;
	anchor_queries[cnt] = '//div[@id="playnav-panel-info"]//a[@id="playnav-watch-link" and contains(@href,"/watch?")]';
	cell_queries[cnt] =  'ancestor::div[@id="playnav-body"]';
	added_queries[cnt] = 'ancestor::div[contains(@class,"playnav-video-panel")]';
	listbox_queries[cnt] = '';
	inserted_procs[cnt] = false;
	video_changed_cnt = cnt;
	cnt++;
	GM_addStyle("#playnav-body .scrollbox-page,#playnav-body .playnav-grid-column {height: auto !important; visibility: visible !important}");
	break;

case	CATEGORIES_PAGE:
	var cnt = 0;
// Viewed Around the Web
	anchor_queries[cnt] = '//div[@id="aso-slider"]//div[contains(@class,"video-title")]'+default_anchor_query;
	cell_queries[cnt] =  'ancestor::div[contains(@class,"video-aso-cell")]';
	added_queries[cnt] = 'ancestor::div[contains(@class,"video-aso-cell")]';
	cell_calc_types[cnt] = TYPE_HEIGHT_CALC;
	list_calc_types[cnt] = TYPE_HEIGHT_CALC;
	cnt++;
// Most Viewed Today
	anchor_queries[cnt] = '//div[@class="most-viewed-list"]//div[contains(@class,"video-title")]'+default_anchor_query;
	added_queries[cnt] = 'ancestor::div[contains(@class,"video-cell")]';
	cell_queries[cnt] =  'ancestor::div[contains(@class,"video-cell")]';
	cell_calc_types[cnt] = TYPE_HEIGHT_CALC;
	list_calc_types[cnt] = TYPE_HEIGHT_CALC;
	cnt++;
	listener_query = '//div[@id="content"]';
	break;

case	VIDEOS_PAGE:
	var cnt = 0;
// Spotlight content
	anchor_queries[cnt] = '//div[@id="videos-main"]//div[@id="spotlight-list"]//div[contains(@class,"video-cell")]'+default_anchor_query;
	cell_queries[cnt] =  'ancestor::div[contains(@class,"video-cell")]';
	added_queries[cnt] = '..';
	cell_calc_types[cnt] = TYPE_HEIGHT_CALC;
	list_calc_types[cnt] = TYPE_HEIGHT_CALC;
	cnt++;
// Main content
	anchor_queries[cnt] = '//div[@id="videos-main"]//div[contains(@class,"video-cell")]//p'+default_anchor_query;
	cell_queries[cnt] =  'ancestor::div[contains(@class,"video-cell")]';
	added_queries[cnt] = '..';
	cell_calc_types[cnt] = TYPE_HEIGHT_CALC;
	list_calc_types[cnt] = TYPE_HEIGHT_CALC;
	cnt++;
// Side content
	anchor_queries[cnt] = '//div[contains(@class,"sidebar-spotlights-container")]//p'+default_anchor_query;
	cell_queries[cnt] =  '../..';
	added_queries[cnt] = '..';
	cell_calc_types[cnt] = TYPE_HEIGHT_CALC;
	list_calc_types[cnt] = TYPE_HEIGHT_CALC;
	cnt++;

	spotlight_query = '';
	listener_query = '//div[@id="content-container"]';
	inserted_proc = true;
	break;

case	MUSIC_PAGE:
	var cnt = 0;
// Spotlight content
	anchor_queries[cnt] = '//div[contains(@class,"browse-spotlight")]//div[contains(@class,"video-cell")]'+default_anchor_query;
	cell_queries[cnt] =  'ancestor::div[contains(@class,"video-cell")]';
	added_queries[cnt] = '..';
	cell_calc_types[cnt] = TYPE_HEIGHT_CALC;
	list_calc_types[cnt] = TYPE_HEIGHT_CALC;
	cnt++;
// Main content
	anchor_queries[cnt] = '//div[contains(@class,"browse-content")]//div[contains(@class,"browse-item-content")]'+default_anchor_query;
	cell_queries[cnt] =  'ancestor::div[contains(@class,"browse-item-content")]';
	added_queries[cnt] = '..';
	cell_calc_types[cnt] = TYPE_HEIGHT_CALC;
	list_calc_types[cnt] = TYPE_HEIGHT_CALC;
	cnt++;
	spotlight_query = '';
	listener_query = '//div[@id="content-container"]';
	inserted_proc = true;
	cell_calc_type = TYPE_HEIGHT_CALC;
	break;

case	SEARCH_PAGE:
	anchor_query = '//div[contains(@class,"result-item-main-content")]'+default_anchor_query;
	cell_query =  'ancestor::div[contains(@class,"result-item-main-content")]';
	added_query = 'ancestor::div[contains(@class,"result-item-main-content")]';
	listener_query = '//div[@id="results-main-content"]';
	inserted_proc = true;
	break;

case	PROFILE_PAGE:
//	cell_calc_type = TYPE_HEIGHT_CALC;
//	list_calc_type = TYPE_HEIGHT_CALC;
	listener_query = '//div[@id="baseDiv"]';
	var cnt = 0;
// Main content(featured)
	anchor_queries[cnt] = '//div[@id="user_featured"]'+default_anchor_query;
	cell_queries[cnt] =  'ancestor::div[@class="box-body"]';
	added_queries[cnt] = 'ancestor::div[@class="box-fg"]';
	inserted_procs[cnt] = false;
	cnt++;
// Main content(videos/favorites)
	anchor_queries[cnt] = '//div[@id="user_videos" or @id="user_favorites"]//div[contains(@class,"video-main-content")]'+default_anchor_query;
	cell_queries[cnt] =  'ancestor::div[@class="video-cell"]';
	added_queries[cnt] = 'ancestor::div[contains(@class,"video-main-content")]';
	inserted_procs[cnt] = false;
	cnt++;
// Side content
	anchor_queries[cnt] = '//div[@id="profile-side-content"]'+default_anchor_query;
	cell_queries[cnt] =  'ancestor::div[@class="centerpiece"]/..';
	added_queries[cnt] = 'ancestor::div[@class="centerpiece"]';
	cnt++;
// vlog box
	anchor_queries[cnt] = '//div[contains(@class,"profile-vlogbox")]'+default_anchor_query;
	cell_queries[cnt] =  'ancestor::div[@class="vlog-entry"]';
	added_queries[cnt] = 'ancestor::div[@class="vlog-entry"]//div[contains(@class,"vlog-entry-info")]//div[@class="box-fg"]';
	cnt++;
// below the player box
	anchor_queries[cnt] = '//div[@id="playnav-panel-info"]//a[@id="playnav-watch-link" and contains(@href,"/watch?")]';
	cell_queries[cnt] =  'ancestor::div[@id="playnav-body"]';
	added_queries[cnt] = 'ancestor::div[contains(@class,"playnav-video-panel")]';
	cnt++;
	GM_addStyle("#profile-main-content .vlog-entry-info {height: auto !important;}");
	break;

case	PLAYLIST_PAGE:
	anchor_query = '//div[@class="video-cell"]//div[contains(@class,"video-main-content")]'+default_anchor_query;
	cell_query =  'ancestor::div[contains(@class,"video-cell")]';
	added_query = 'ancestor::div[contains(@class,"video-main-content")]';
	break;

case	WATCH_PAGE:
	watch_page = true;
	anchor_query = '//div[@id="watch-sidebar"]'+default_anchor_query;
	cell_query =  '..';
	added_query = '..';
	listener_type = TYPE_MODIFIED;
	listener_query = '//div[@id="watch-main"]';
	inserted_proc = true;
	break;

case	SHOW_PAGE:
	anchor_query = '//div[@id="shows-episodes"]'+default_anchor_query;
	cell_query =  'ancestor::td';
	added_query = 'ancestor::td';
	listener_query = '//div[@class="ytg-box"]';
	inserted_proc = true;
	break;

case	MOVIES_PAGE:
	anchor_query = '//div[@id="movie-container"]//button[contains(@href,"/watch?")]';
	cell_query =  '..';
	added_query = '..';
	listener_query = '//div[@id="movie-container"]';
	inserted_proc = true;
	break;

case	HOME_PAGE:
	var cnt = 0;
	listener_query = '//div[@id="content-container"]';
// Main content
	anchor_queries[cnt] = '//div[@id="homepage-main-content"]//div[contains(@class,"video-main-content")]'+default_anchor_query;
	added_queries[cnt] = 'ancestor::div[contains(@class,"video-main-content")]';
	cell_queries[cnt] =  'ancestor::div[contains(@class,"video-main-content")]/..';
	cell_calc_types[cnt] = TYPE_HEIGHT_AUTO;
	list_calc_types[cnt] = TYPE_HEIGHT_AUTO;
	cnt++;
// Main content(2 col list view)
	anchor_queries[cnt] = '//div[@id="homepage-main-content"]//div[contains(@class,"ytg-2col")]//ul[@class="video-list"]'+default_anchor_query;
	added_queries[cnt] = '..';
	cell_queries[cnt] =  '..';
	cell_calc_types[cnt] = TYPE_HEIGHT_AUTO;
	list_calc_types[cnt] = TYPE_HEIGHT_AUTO;
	cnt++;
// Side content
	anchor_queries[cnt] = '//div[@id="homepage-side-content"]'+default_anchor_query;
	added_queries[cnt] = '..';
	cell_queries[cnt] =  '..';
	cell_calc_types[cnt] = TYPE_HEIGHT_AUTO;
	list_calc_types[cnt] = TYPE_HEIGHT_AUTO;
	cnt++;
	break;

case	MY_UPLOADED_VIDEOS_PAGE:
case	MY_FAVORITES_PAGE:
case	MY_PLAYLIST_PAGE:
case	MY_SUBSCRIPTIONS_PAGE:
case	MY_QUICKLIST_PAGE:
case	MY_HISTORY_PAGE:
case	MY_PURCHASES_PAGE:

	var cnt = 0;
	anchor_queries[cnt] = '//div[@id="vm-video-list-container"]//div[@class="vm-video-title"]/a[contains(@href,"/watch?")]';
	added_queries[cnt] = '../..';
	cell_queries[cnt] =  '..';
	cnt++;
	inserted_proc = true;
	break;

case	RECENT_ACTIVITY_PAGE:
	var cnt = 0;
// Uploaded by or Favorited by XXX
	anchor_queries[cnt] = '//div[contains(@class,"video-title")]'+default_anchor_query;
	added_queries[cnt] = 'ancestor::div[contains(@class,"video-main-content")]';
	cell_queries[cnt] =  'ancestor::div[contains(@class,"video-main-content")]';
	cnt++;

// commented on YYY
	anchor_queries[cnt] = '//div[contains(@class,"feedmodule-cmt-vid")]'+default_anchor_query;
	added_queries[cnt] = 'ancestor::div[@class="video-entry"]/div[@class="feedmodule-cmt"]';
	cell_queries[cnt] =  'ancestor::div[@class="video-entry"]/div[@class="feedmodule-cmt"]';
	cnt++;

	listener_query = '//div[@class="subtivity-view-main-content"]';
	inserted_proc = true;
	break;

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


function buildURL(pid, target, fmt, token) {
	var	url = '';
	switch(target) {
	case WATCH_URL:
		var href = queue[pid].href;
		if(href.substr(0,4) == 'http') {
			url = href;
		} else {
			url = 'http://www.youtube.com/'+href;
		}
		url = url.replace(/\/\/watch/, '/watch');
		if(fmt) {
			if(/&fmt=\d+/.test(url)) {
				url = url.replace(/&fmt=\d+/, '');
			}

			url += '&fmt=' + fmt;
		}
		break;
	case GET_VIDEO_INFO:
		url = 'http://www.youtube.com/get_video_info?video_id='+pid;
		break;
	case GET_VIDEO:
//		url = 'http://www.youtube.com/get_video?video_id='+pid+'&t='+token+'&asv='+ASV_NUMBER;
//		if(fmt) {
//			url += '&fmt=' + fmt;
//		}
		break;
	case STAT_URL:
		url = 'http://www.youtube.com/watch_ajax?v='+pid+'&action_get_statistics_and_data=1&l=EN';
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
	if(listener_query) {

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
	if(video_changed_listener_query) {
		if(video_changed_listener_nodes.length == 0) {
			var xp = document.evaluate(video_changed_listener_query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if(xp.snapshotLength) {
				for(var i = 0; i < xp.snapshotLength; i++) {
					video_changed_listener_nodes.push(xp.snapshotItem(i));
				}
			}
		}
		for(var i = 0; i < video_changed_listener_nodes.length; i++) {
			var node = video_changed_listener_nodes[i];
			if(mode) {
				if(video_changed_listener_type == TYPE_INSERTED)
					node.addEventListener("DOMNodeInserted",VideoChanged,false);
				else if(video_changed_listener_type == TYPE_MODIFIED)
					node.addEventListener("DOMSubtreeModified",VideoChanged,false);
			} else {
				if(video_changed_listener_type == TYPE_INSERTED)
					node.removeEventListener("DOMNodeInserted",VideoChanged,false);
				else if(video_changed_listener_type == TYPE_MODIFIED)
					node.removeEventListener("DOMSubtreeModified",VideoChanged,false);
			}
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
	var done_work;
	var now = (new Date()).getTime();
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
				WaitMessage(pid, -1, "Maybe,this video is no longer available");
				if(queue[pid].clone_num) {
					for(var j in queue[pid].clone_pid) {
						var clone_pid = queue[pid].clone_pid[j];
						if(queue[clone_pid].stat == CLONE_DATA) {
							WaitMessage(clone_pid, 1);
							WaitMessage(clone_pid, -1, "Maybe,this video is no longer available");
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
			break;
		case WAITING:
			wait++;
			break;
		default:
			break;
		}

		switch(queue[pid].stat_detail) {
		case SENT_REQUEST:
			if(now - queue[pid].sent_time_detail < custom.queue.max_wait_limit) {
				sent++;
			} else {
				queue[pid].stat_detail = NOT_RECEIVED;
			}
			break;
		case RECEIVED_RESPONSE:
			received++;
			break;
		case NONE:
			break;
		case STORED_DATA:
			if(queue[pid].clone_num) {
				for(var j in queue[pid].clone_pid) {
					var clone_pid = queue[pid].clone_pid[j];
					if(queue[clone_pid].stat == CLONE_DATA) {
						queue[clone_pid].stat = STORED_DATA;
						queue[clone_pid].stat_detail = STORED_DATA;
						CopyVideoInfo(clone_pid, queue[pid]);
						CopyVideoInfoDetail(clone_pid, queue[pid]);
						queue[clone_pid].video_urls = queue[pid].video_urls;
						queue[clone_pid].watchable = queue[pid].watchable;
						AddMetaData(clone_pid);
					}
				}
			}
			done++;
			break;
		case WAITING:
			wait++;
			break;
		default:
			done++;
			break;
		}
	}
	total_queue_num = count;
	current_request_num = sent;

	if(last_done_num != done) {
		var work = new Array();
		for (var pid in queue) {
			var list_box = queue[pid].list_box;
			if(queue[pid].list_box) {
				var id = list_box.getAttribute("id");
				if(!id || work.indexOf(id) >= 0) {
					continue;
				}
				work.push(id);

				Toggle_Listener(false);
				ModifyListBoxHeight(pid);
				Toggle_Listener(true);
			}
		}
	}
	done_work = last_done_num;
	last_done_num = done;

	if(current_request_num < custom.queue.max_send_request) {
		if(none > 0) {
			return true;
		}
		if(wait > 0) {
			for (var pid in queue) {
				if(queue[pid].stat == WAITING) {
					queue[pid].stat = NONE;
					queue[pid].stat_detail = NONE;
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
				switch(queue[pid].stat_detail) {
				case SENT_REQUEST:
				case RECEIVED_RESPONSE:
				case NOT_RECEIVED:
					queue[pid].stat_detail = NONE;
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
		if(queue[pid].stat == NOT_RECEIVED &&
		   queue[pid].stat_detail == NONE) {
			GetVideoDetailInformation(pid);
			sent++;
		} else
		if(queue[pid].stat == NONE) {
			GetVideoInformation(pid);
			sent++;
		}
	}
}

function ExtractPid(href) {
	var pid = '';
	if(href.indexOf('video_ids=') >= 0) {
		var video_ids = href.match(/video_ids=(.*?)&/)[1].split('%2C');
		var index = 0;
		if(href.indexOf('index=') >= 0) {
			index = href.match(/index=(\d*)/)[1];
		}
		pid = video_ids[index];
	} else 
	if(href.indexOf('video_id=') >= 0) {
		pid = href.match(/video_id=(.*)/)[1];
	} else {
		pid = href.match(/v=(.*)/)[1];
	}
	var p = pid.indexOf('&');
	if(p >= 0) {
		pid = pid.substr(0, p);
	}
	return pid;
}

function NodeInserted() {
	if(insert_now == false) {
		insert_now = true;
		list_page_proc_inserted();
		insert_now = false;
	}
//	Toggle_Listener(false);
//	for (var pid in queue) {
//		ModifyParentHeight(pid);
//	}
//	Toggle_Listener(true);
}

function VideoChanged() {
	
	anchor_query = anchor_queries[video_changed_cnt];
	added_query = added_queries[video_changed_cnt];
	cell_query = cell_queries[video_changed_cnt];
	listbox_query = listbox_queries[video_changed_cnt];
	if(cell_calc_types.length > 0) {
		cell_calc_type = cell_calc_types[video_changed_cnt];
	}
	if(list_calc_types.length > 0) {
		list_calc_type = list_calc_types[video_changed_cnt];
	}
	AddDownloadLink();
}

function list_page_proc() {
	if(anchor_queries.length) {
		for(var i = 0; i < anchor_queries.length; i++) {
			anchor_query = anchor_queries[i];
			added_query = added_queries[i];
			cell_query = cell_queries[i];
			listbox_query = listbox_queries[i];
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

function list_page_proc_inserted() {
	if(anchor_queries.length) {
		for(var i = 0; i < anchor_queries.length; i++) {
			anchor_query = anchor_queries[i];
			added_query = added_queries[i];
			cell_query = cell_queries[i];
			listbox_query = listbox_queries[i];
			if(cell_calc_types.length > 0) {
				cell_calc_type = cell_calc_types[i];
			}
			if(list_calc_types.length > 0) {
				list_calc_type = list_calc_types[i];
			}
			if(inserted_procs.length > 0) {
				inserted_proc = inserted_procs[i];
			}
			if(inserted_proc) {
				AddDownloadLink();
			}
		}
	} else {
		if(inserted_proc) {
			AddDownloadLink();
		}
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

function ChangePageStat(id) {
	if(pages[id].done == true) return;	// already done
	if(pages[id].pids.length == 0) return;	// maybe bug if true

	for(var i in pages[id].pids) {
		var pid = pages[id].pids[i];
		if(queue[pid].stat == MANUAL_GET) {
			queue[pid].stat = WAITING;
		}
	}
	Toggle_Listener(false);
	pages[id].separator_node.setAttribute('style',added_box.separator.close_style);
	pages[id].done = true;
	Toggle_Listener(true);
}

function ChangeGetButtonDisplay() {
	for(var separator_id in pages) {
		if(pages[separator_id].done == true) continue;	// already done
		var grid_view = false;
		var node = document.evaluate(grid_query, pages[separator_id].separator_node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(node) {
			grid_view = true;
		}
		var page_no = pages[separator_id].page_no;
		if(custom.queue.page_num_processed == true &&
		  (grid_view == true && page_no >= custom.queue.page_num_grid ||
		   grid_view == false && page_no >= custom.queue.page_num_list)) {
			pages[separator_id].separator_node.style.display = "";
		} else {
			pages[separator_id].separator_node.style.display = "none";
			pages[separator_id].done = true;
		}
	}
}

function AddGetButton(id) {
	var input = document.getElementById(id);
	if(input) {
		return;	// this page is already added the separator.
	}
	if(pages[id].separator_node) return;
	var page = pages[id].page_node;

	input = document.createElement('input');
	pages[id].separator_node = input;
	input.id = id;
	input.type = 'button';
	input.setAttribute('style',added_box.separator.style);
	input.style.display = "none";
	input.value = 'Page '+(pages[id].page_no+1)+': '+'Get video information';
	Toggle_Listener(false);
	page.parentNode.insertBefore(input, page);
	Toggle_Listener(true);
	input.addEventListener('click', function(e) {
			ChangePageStat(this.id);
		}, false);
}

function AddPageSeparator() {
	if(!page_query) {
		return;
	}
	var xp = document.evaluate(page_query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(xp.snapshotLength) {
		for(var i = 0; i < xp.snapshotLength; i++) {
			var node = xp.snapshotItem(i);
			var page_id = node.id;
			var page_no = parseInt(page_id.match(/page-(.*)/)[1]);
			var separator_id = added_box.separator.id+page_id;
			if(pages[separator_id]) continue;	// already added

			pages[separator_id] = {
				page_node: node,
				page_no: page_no,
				separator_node: null,
				pids: new Array(),
				done: false,
			};
			AddGetButton(separator_id);
		}
	}
}

function AddDownloadLink() {
	AddPageSeparator();

	var q = anchor_query;
	var xp = document.evaluate(q, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(xp.snapshotLength) {

		for (var i=0; i < xp.snapshotLength; i++) {
			var need_clone = false;
			var anchor = xp.snapshotItem(i);
			var href = anchor.getAttribute('href');
//			var title = anchor.getAttribute('title');
			var title = anchor.textContent;
			var pid = ExtractPid(href);
			var parent = document.evaluate(added_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if(!parent) {
				continue;
			}
			if(queue[pid]) {
				need_clone = CheckSamePidNode(pid, parent);
				if(need_clone == false) {
					continue;
				}
			}
			var video_cell = document.evaluate(cell_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var list_box = null;
			var list_box_id = '';
			var stat = WAITING;

			if(listbox_query) {
				var grid_view = false;
				var node = document.evaluate(grid_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if(node) {
					grid_view = true;
				}
				list_box = document.evaluate(listbox_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if(list_box) {
					list_box_id = list_box.id;
					if(list_box_id) {
						var separator_id = added_box.separator.id+list_box_id;
						pages[separator_id].pids.push(pid);
						var page_no = pages[separator_id].page_no;
						if(custom.queue.page_num_processed == true && 
						  (grid_view == true && page_no >= custom.queue.page_num_grid ||
						   grid_view == false && page_no >= custom.queue.page_num_list)) {
							stat = MANUAL_GET;
						}
					}
				}
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
			base.setAttribute('class', added_box.base.class);
			var style = buildStyle(custom.style.list.base, added_box.base.style);
			base.setAttribute('style',style);
			var q = './div[@class="'+added_box.base.class+'"]';
			var old_base = document.evaluate(q, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			Toggle_Listener(false);
			if(old_base) {
				parent.removeChild(old_base);
			}
		        parent.appendChild(base);
			Toggle_Listener(true);

			queue[pid] = {
				stat: stat,
				stat_detail: stat,
				node: base,
				parent: parent,
				clone_num: 0,
				clone_pid: new Array(),
				href: href,
				title: title,
				video_cell: video_cell,
				list_box: list_box,
				list_box_id: list_box_id,
				offsetHeight: parent.offsetHeight,
				offsetTop: video_cell.offsetTop,
				cell_offsetHeight: video_cell.offsetHeight,
				cell_calc_type: cell_calc_type,
				list_calc_type: list_calc_type,
			};
			if(spotlight_query) {
				var spotlight = document.evaluate(spotlight_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if(spotlight) {
					queue[pid].offsetTop = 0;
				}
			}
		}
		if(listbox_query) {
			ChangeGetButtonDisplay();
		}

	} else {
		Toggle_Listener(true);
	}
}

function ModifyFileName(filename, fmt) {
	filename = filename.replace(/&quot;/g,'_');
	filename = filename.replace(/[\\\/:;\*\?\"<>\|]/g,'_');
	if(filename.replace('.', '') == '') {
		filename = filename.replace(/\./g, '_');
	}
	return filename + AddVideoType(fmt, custom.format_type.filename);
}


// watch_page_proc routine
function watch_page_proc() {
	var href = window.location.href;
	var pid = ExtractPid(href);
	watch_page_pid = pid;
	var base = document.createElement('div');
	base.id = added_box_watch.base.base_id;
	var style = buildStyle(custom.style.watch.base, added_box_watch.base.base_style);
	base.setAttribute('style',style);
	var node = document.getElementById('watch-main');
	var parent = node.parentNode;
        parent.insertBefore(base, node);
	queue[pid] = {stat:STORED_DATA, stat_detail:NONE, node:base, href:href};

	queue[pid].offsetTop = -1;

	GetVideoDetailInformation(pid);
}

function AddVideoType(fmt, type) {
	var str = "";
	switch(type) {
	case FT_WITH_FMT_NO:
		str = '(fmt='+video_format[fmt].key+')';
		break;
	case FT_WITH_FMT_NO_ONLY:
		str = '('+video_format[fmt].key+')';
		break;
	case FT_WITH_FMT_STR:
		str = video_format[fmt].text;
		break;
	case FT_WITH_FMT_STR_NO:
		str = video_format[fmt].text+'('+video_format[fmt].key+')';
		break;
	case FT_TITLE_ONLY:
		break;
	case FT_WITH_QUALITY:
		str = video_format[fmt].quality;
		break;
	case FT_WITH_RESOLUTION:
		str = video_format[fmt].resolution;
		break;
	}
	return str;
}

function ParseVideoDetailWatch(pid) {
// Adds the download button below the description box

	var	html = document.getElementsByTagName('html')[0].innerHTML;
	var	VideoInfo = ParseSourceXml(html, pid, false);
	CopyVideoInfo(pid, VideoInfo);

	var	format_style;
	if(queue[pid].status == 'fail' && queue[pid].watchable == false) {
		format_style = added_box_watch.format.style_2;
	} else {
		format_style = added_box_watch.format.style;
		if(queue[pid].watchable == true) {
			AddWatchButton(pid);
		}
	}
//	queue[pid]['cache'] = false;
	video_urls = queue[pid]['video_urls'];
	if(!video_urls) {
		video_urls = queue[pid]['video_urls_cache'];
//		queue[pid]['cache'] = true;
	}
	var title = queue[pid]['title'];
	for(var fmt in video_format) {
		var filename = ModifyFileName(title, fmt);
		var download_url = video_urls[fmt];
		if(download_url && download_url.indexOf('videoplayback?') >= 0) {
			if(custom.others.use_title_as_filename) {
				download_url += '&title='+filename;
			}
		}
		var html = '<div id="' + added_box_watch.download.div_id + fmt + '" style="display:none;'+added_box_watch.download.div_style+'">' +
			'<a id="' + added_box_watch.download.anchor_id + fmt + '" href="' + download_url + '" style="' + added_box_watch.download.anchor_style + '">'+custom.watch.download_link_text+'</a>' +
			'<a id="' + added_box_watch.format.id + fmt + '" href="' + download_url + '" style="' + format_style + '">' +
			AddVideoType(fmt, custom.format_type.watch)+'</a>'+
			'</div>';

		var	p = document.createElement('div');

		p.innerHTML = html;
		p.id = added_box_watch.base.id + fmt;
		p.setAttribute('style', added_box_watch.base.style);
		ModifyAnchor(p, fmt, title);

	        queue[pid].node.appendChild(p);

	}
	ChangeStyle();
}

function ModifyAnchor(p, fmt, title) {
	if(custom.fmt.watch[fmt] == false || !video_urls[fmt]) {
		p.style.display =  'none';
	} else {
		p.style.display =  'block';
	}

	var query = './/a[@id="'+added_box_watch.download.anchor_id + fmt+'"]';
	if(custom.watch.include_video_type == false) {
		query += '|.//a[@id="'+added_box_watch.format.id + fmt+'"]';
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


// for list page
function GetSetupDataListPage(){
	custom.fmt.list = GetGMValue("download_fmt_list", custom.fmt.list, null);
	custom.list = GetGMValue("list_page", custom.list, ['build_embed']);

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
	custom.format_type = GetGMValue("format_type", custom.format_type, null);
	custom.others = GetGMValue("others", custom.others, null);
}

function SetSetupDataOthers(){
	GM_setValue("format_type", uneval(custom.format_type));
	GM_setValue("others", uneval(custom.others));
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

// all setup data except version
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
		custom.list.watch_button = GM_getValue("add_watch_button", custom.list.watch_button);
		custom.list.download_link = GM_getValue("add_download_link", custom.list.download_link);
		custom.list.addedDate = GM_getValue("add_addedDate", custom.list.addedDate);
		custom.list.comments = GM_getValue("add_comments", custom.list.comments);
		custom.list.ratings = GM_getValue("add_ratings", custom.list.ratings);
		custom.list.avg_rating = GM_getValue("add_avg_rating", custom.list.avg_rating);
		custom.list.favorites = GM_getValue("add_favorites", custom.list.favorites);
// for watch page
		custom.watch.disp_type = GM_getValue("disp_type", custom.watch.disp_type);
		custom.watch.image_url = GM_getValue("image_url", custom.watch.image_url);
		custom.watch.text_color = GM_getValue("text_color", custom.watch.text_color);
		custom.watch.bg_color = GM_getValue("bg_color", custom.watch.bg_color);
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
	if(old_version < 7) {
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
	if(old_version < 9) {
		delete custom.list.ratings;
		delete custom.list.avg_rating;
	}
	if(old_version < 11) {
		delete custom.fmt.watch.fmt_18;
		delete custom.fmt.list.fmt_18;
		delete custom.others.use_fmt_url_map;
	}
}

function DeleteOldData(old_version) {
	if(typeof GM_deleteValue != "function") return;
	if(old_version == 0) {	// old format data
// for list page
		GM_deleteValue("add_watch_button");
		GM_deleteValue("add_addedDate");
		GM_deleteValue("add_comments");
		GM_deleteValue("add_ratings");
		GM_deleteValue("add_avg_rating");
// for watch page
		GM_deleteValue("disp_type");
		GM_deleteValue("text_color");
		GM_deleteValue("bg_color");
		GM_deleteValue("image_url");
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
	GM_registerMenuCommand( "#### Set up this script(YouTube) ####", Setup);

// for update check
	UpdateCheck(false);

	WatchOver();
}


function GetErrorBox(div) {
	var xp = document.evaluate('.//div[@id="error-box"]/div/text()', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(xp.singleNodeValue) {
		return xp.singleNodeValue.textContent;
	}
	return '';
}

function GetErrorPageTitle(div) {
	var xp = document.evaluate('.//div[contains(@class,"title-bar")]/text()', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(xp.singleNodeValue) {
		return xp.singleNodeValue.textContent;
	}
	return '';
}

function GetTitle(div) {
	var xp = document.evaluate('.//meta[@name="title"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		return xp.getAttribute("content");
	}
	return '';
}

function GetText(text, str, type) {
	var p;
	if(typeof str == "string") {
		p = text.indexOf(str);
		if(p >= 0) {
			if(type == 0) {
				return text.substr(p);
			} else
			if(type == 1) {
				return text.substr(0, p);
			} else {
				return text.substr(0, p+str.length-1);
			}
		}
		return "";
	}
	for(var i in str) {
		p = text.indexOf(str[i]);
		if(p >= 0) {
			if(type == 0) {
				return text.substr(p);
			} else
			if(type == 1) {
				return text.substr(0, p);
			} else {
				return text.substr(0, p+2);
			}
		}
	}
	return "";
}

function GetEmbedUrl(div) {
	var xp = document.evaluate('.//meta[@property="og:video"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		return xp.getAttribute("content");
	}
	return "";
}

function GetswfHTML(div) {
	text = div.innerHTML;
	text = GetText(text, '<embed ', 0);
	if(!text) {
		return "";
	}
	text = GetText(text, '<noembed>', 1);
	if(!text) {
		return "";
	}
	if(text) {
		text = text.replace(/\\\"/g,'"');
		text = text.replace(/\" \+ \"/g,'');
		text = text.replace(/\\\//g,'/');
	}
	return text;
}

function GetEmbedCode(div) {
	var xp = document.evaluate('.//input[@id="embed_code"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(xp.singleNodeValue) {
		return xp.singleNodeValue.getAttribute('value');
	}
	return '';
}

function GetAddedDate(div) {
	var xp = document.evaluate('.//span[@class="watch-video-date"]/text()', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(xp) {
		var text = xp.textContent;
		return text;
	}
	return '';
}

function GetComments(text) {
	text = GetText(text, 'COMMENTS_COUNT', 0);
	if(!text) {
		return "";
	}
	var work = text.match(/COMMENTS_COUNT':\s*(\d*)/);
	if(work) {
		return work[1];
	}
	return "";
}

function buildEmbedCode(swfUrl, swfArgs) {
	var	flashvars = '';
	for(var i in swfArgs) {
		flashvars += i + '=' + swfArgs[i] + '&amp;';
	}
	var embedCode = '<embed ' +
		'height="" ' +
		'width="" ' +
		'flashvars="'+ flashvars + '" ' +
		'allowscriptaccess="always" ' +
		'allowfullscreen="true" ' +
		'quality="high" ' +
		'bgcolor="#000000" ' +
		'name="movie_player" ' +
		'id="movie_player" ' +
		'src="'+swfUrl+'" ' +
		'type="application/x-shockwave-flash"/>';
	return embedCode;
}


// Parse source xml
function ParseSourceXml(text, pid, error_response)
{
	var videoInfo = new Array();
	var video_urls = new Array();
	var div = document.createElement('div');
	div.innerHTML = text;
	videoInfo['reason'] = '';
	if(error_response > 0) {
		if(error_response == 1) {
			videoInfo['reason'] = "18+ video";
		} else if(error_response == 2) {
			videoInfo['reason'] = GetErrorBox(div);
		} else if(error_response == 3) {
			videoInfo['reason'] = GetErrorPageTitle(div);
		}
		videoInfo['title'] = queue[pid]['title'];
		videoInfo['embedUrl'] = "";
		videoInfo['swfArgs'] = "";
		videoInfo['swfUrl'] = "";
		videoInfo['fmt_map_cache'] = "";
		videoInfo['fmt_url_map_cache'] = "";
		videoInfo['length_seconds'] = "";
		videoInfo['token_cache'] = "";
		videoInfo['comments'] = "";
		for(var fmt in video_format) {
			video_urls['fmt_'+ fmt] = "";
		}
		videoInfo['video_urls_cache'] = video_urls;

		videoInfo['addedDate'] = "";
		if(videoInfo['reason']) {
			videoInfo['embedCode'] = videoInfo['reason'];
		} else {
			videoInfo['embedCode'] = "Can't watch";
		}

		videoInfo['watchable'] = false;
		videoInfo['video_width'] = "";
		videoInfo['video_height'] = "";
		return videoInfo;
	}

	videoInfo['title'] = GetTitle(div);
	videoInfo['embedUrl'] = GetEmbedUrl(div);
	videoInfo['comments'] = GetComments(text);

	videoInfo['addedDate'] = GetAddedDate(div);
	videoInfo['swfUrl'] = "";

	var swfHTML = GetswfHTML(div);
	videoInfo['embedCode'] = swfHTML;
	div.innerHTML = swfHTML;
	var embed = div.firstChild;
	videoInfo['swfArgs_str'] = embed.getAttribute('flashvars');
	if(!videoInfo['swfArgs_str']) {
		videoInfo['watchable'] = false;
		videoInfo['embedCode'] = "Can't watch";
		return videoInfo;
	}
	videoInfo['video_width'] = embed.getAttribute('width');
	videoInfo['video_height'] = embed.getAttribute('height');
	videoInfo['swfUrl'] = embed.getAttribute('src');

	var work = videoInfo['swfArgs_str'].split('&');
	videoInfo['swfArgs'] = {};
	for(var i in work) {
		var keyval = work[i].split('=');
		var key = keyval[0];
		var val = keyval[1];
		videoInfo['swfArgs'][key] = val;
	}
	videoInfo['url_encoded_fmt_stream_map'] = decodeURIComponent(videoInfo['swfArgs']['url_encoded_fmt_stream_map']);
	videoInfo['length_seconds'] = decodeURIComponent(videoInfo['swfArgs']['length_seconds']);

	var pid = videoInfo['swfArgs']['video_id'];
	var fmt_url_map = videoInfo['url_encoded_fmt_stream_map'].split(',');
	var token = videoInfo['swfArgs']['t'];
	videoInfo['token_cache'] = token;
	var num = 0;
	for(var i in fmt_url_map) {
		var params = fmt_url_map[i].split('&');
		var videos = "";
		var fmt = "";
		for(var j in params) {
			var tmpparam = params[j].split('=');
			if(tmpparam.length > 1) {
				var id = tmpparam[0];
				var val = tmpparam[1];
				if(id == 'url') {
					videos = decodeURIComponent(val);
				} else 
				if(id == 'itag') {
					fmt = val;
				}
			}
			num++;
		}
		video_urls['fmt_'+ fmt] = videos;
	}
	videoInfo['video_urls_cache'] = video_urls;

	if(videoInfo['swfArgs']['allow_embed'] == '0' && videoInfo['swfUrl']) {
		videoInfo['embedCode'] = buildEmbedCode(videoInfo['swfUrl'], videoInfo['swfArgs']);
		videoInfo['embedUrl'] = "";
	}
	videoInfo['watchable'] = false;
	if(videoInfo['embedCode'].indexOf('<embed') >= 0 ) {
		videoInfo['watchable'] = true;
	}

	videoInfo['video_width'] = DEFAULT_PLAYER_WIDTH;
	videoInfo['video_height'] = DEFAULT_PLAYER_HEIGHT;
	if(videoInfo['watchable'] && videoInfo['embedCode']) {
		div.innerHTML = videoInfo['embedCode'];
		var embed = div.getElementsByTagName('embed');
		if(embed && embed[0]) {
			if(embed[0].getAttribute('width')) {
				videoInfo['video_width'] = embed[0].getAttribute('width');
			}
			if(embed[0].getAttribute('height')) {
				videoInfo['video_height'] = embed[0].getAttribute('height');
			}
		}
//		if(custom.player.build_embed == true) {
//			videoInfo['embedCode'] = buildEmbedCode(videoInfo['swfUrl'], videoInfo['swfArgs']);
//			videoInfo['embedUrl'] = "";
//		}
	}

	return videoInfo;

}

function CopyVideoInfo(pid, VideoInfo) {
	var infoKeys = [
		'embedUrl',
		'embedCode',
		'swfArgs',
		'swfUrl',
		'video_urls_cache',
		'comments',
		'addedDate',
		'title',
		'fmt_map_cache',
		'fmt_url_map_cache',
		'token_cache',
		'length_seconds',
		'StatsUrl',
		'video_width',
		'video_height',
		'watchable',
		'reason',
		];
	for (var i in infoKeys) {
		queue[pid][infoKeys[i]] = VideoInfo[infoKeys[i]];
	}
}

function GetVideoInformation(pid) {
//	var url = buildURL(pid, WATCH_URL, 22);
//	var url = buildURL(pid, WATCH_URL, 37);
	var url = buildURL(pid, WATCH_URL, 38);

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
				var finalUrl = xhr.finalUrl;
				var error_response = 0;
				var p = finalUrl.indexOf('/verify_age?');
				var p2 = finalUrl.indexOf('ytsession=');
				var p3 = finalUrl.indexOf('accounts/ServiceLogin?');
				if(p >= 0) {
					error_response = 1;
				} else if(p3 >= 0) {
					error_response = 3;
				} else if(p2 >= 0) {
					error_response = 2;
				}
				queue[pid].stat = RECEIVED_RESPONSE;
				if ( xhr.status != 200 ) {	// failed
					GM_log('HTTP pid,status:'+pid+','+xhr.status);
					WaitMessage(pid, xhr.status);
					return;
				}
				var VideoInfo = ParseSourceXml(text, pid, error_response);
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
				GetVideoDetailInformation(pid);
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
			if(parseInt(queue[pid].list_box.style.height) != parseInt(height)) {
				queue[pid].list_box.style.height = height + 'px';
			}
//			queue[pid].list_box.style.visibility = 'visible';
		}
	} else {
		queue[pid].list_box.style.height = 'auto';
//		queue[pid].list_box.style.visibility = 'visible';
	}
}

function ModifyParentHeight(pid) {
	if(watch_page == true && pid == watch_page_pid) return;
	var work = new Array();
	var height = 0;
	var base_height = 0;
	for (var wpid in queue) {
		if(queue[wpid].offsetTop == queue[pid].offsetTop) {
			if(!queue[wpid].node) continue;
			if(!queue[wpid].node.parentNode) continue;
			work.push(wpid);
//			if(queue[wpid].stat != STORED_DATA ||
//			   queue[wpid].stat_detail != STORED_DATA) {
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

	if(!queue[pid].offsetTop) {
		if(queue[pid].cell_calc_type == TYPE_HEIGHT_CALC) {
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
			div.setAttribute('style', buildStyle(custom.style.list.wait,""));
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

// Add download link
	var style;
	queue[pid]['cache'] = false;
	var video_urls = queue[pid]['video_urls'];
	if(!video_urls) {
		video_urls = queue[pid]['video_urls_cache'];
		queue[pid]['cache'] = true;
	}
	for(var fmt in video_format) {
		var id = added_box.download.id + fmt + "_"+ pid;
		var download = document.getElementById(id);
		if(!download) {
			download = document.createElement('a');
			download.id = id;
			if(queue[pid].node) queue[pid].node.appendChild(download);
		}
		download.href = video_urls[fmt];
		var filename = ModifyFileName(queue[pid]['title'], fmt);
		download.setAttribute('title',filename);
		download.setAttribute('fmt',fmt);
		download.setAttribute('filename',filename+custom.extention[video_format[fmt].type]);
		download.innerHTML = custom.list.download_link_text+" "+AddVideoType(fmt, custom.format_type.list)+'<br />';
		if(download.href && download.href.indexOf('videoplayback?') >= 0) {
			if(custom.others.use_title_as_filename) {
				download.href += '&title='+filename;
			}
		}
		if(queue[pid]['cache']) {
			style = buildStyle(custom.style.list.download_d, added_box.download.style);
		} else {
			style = buildStyle(custom.style.list.download_e, added_box.download.style);
		}
		if(custom.fmt.list[fmt] == true) {
			if(!video_urls[fmt]) {
				download.setAttribute('style',style + styles.close);
			} else {
				download.setAttribute('style',style + styles.block_open);
				download.addEventListener("click", function(e) {
					e.preventDefault();
					window.location.href = this.href;
					return false;
				},false); 
			}
		} else {
			download.setAttribute('style',style + styles.close);
		}
	}

	var info = '';
	if(custom.list.addedDate && queue[pid]['addedDate']) {
//		info += "Added : ";
		info += queue[pid]['addedDate'] +"<br />";
	}
	if(custom.list.comments && queue[pid]['comments']) {
		info += "Comments :"+queue[pid]['comments'] +"<br />";
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
	if(custom.list.addedDate || custom.list.comments || custom.list.favorites) {
		div.setAttribute('style',style + styles.block_open);
	} else {
		div.setAttribute('style',style + styles.close);
	}

// Add watch button
	var id = added_box.watch.id + pid;
	var watch_button = document.getElementById(id);
	if(!watch_button) {
		if(queue[pid].status == 'fail' || queue[pid].watchable == false && queue[pid].embedCode.indexOf('<embed') < 0) {
			watch_button = document.createElement('div');
			watch_button.id = id;
			watch_button.innerHTML = queue[pid]['embedCode'];
		} else {
			watch_button = document.createElement('input');
			watch_button.type = 'button';
			watch_button.setAttribute("pid", pid);
			watch_button.id = id;
			watch_button.value = custom.list.watch_button_text;
			watch_button.addEventListener("click",function(e) {
					PopupPlayer(this.id);
				},false);
		}
		if(queue[pid].node) queue[pid].node.appendChild(watch_button);
	} else {
		if(watch_button.tagName.toLowerCase() == 'input') {
			watch_button.value = custom.list.watch_button_text;
		}
	}

	var style = buildStyle(custom.style.list.watch_button, added_box.watch.style);
	if(custom.list.watch_button) {
		if(queue[pid].status == 'fail' || queue[pid].watchable == false && queue[pid].embedCode.indexOf('<embed') < 0) {
			style = buildStyle(custom.style.list.error, "");
			watch_button.setAttribute('style',style + styles.block_open);
//		} else
//		if(queue[pid]['cache']) {
//			watch_button.setAttribute('style',style + styles.close);
		} else {
			watch_button.setAttribute('style',style + styles.block_open);
		}
	} else {
		watch_button.setAttribute('style',style + styles.close);
	}

	ModifyParentHeight(pid);
	Toggle_Listener(true);

}

// Add watch button for watch page
function AddWatchButton(pid) {
	var id = added_box_watch.watch.id;
	var watch_button = document.getElementById(id);
	if(!watch_button) {
		watch_button = document.createElement('input');
		watch_button.type = 'button';
		watch_button.setAttribute("pid", pid);
		watch_button.id = id;
		watch_button.value = custom.watch.watch_button_text;
		watch_button.addEventListener("click",function(e) {
				PopupPlayer(this.id);
			},false);
		if(queue[pid].node) queue[pid].node.appendChild(watch_button);
	} else {
		watch_button.value = custom.watch.watch_button_text;
	}

	var style = buildStyle(custom.style.watch.watch_button, added_box_watch.watch.style);
	watch_button.setAttribute('style',style + styles.block_open);

	if(custom.watch.watch_button) {
		watch_button.style.display = 'block';
	} else {
		watch_button.style.display = 'none';
	}

}

function PopupPlayer(id) {
	if(watch_page == true) {
		var player = document.getElementById('movie_player');
		if(player) {
			var div = document.getElementById(added_box_watch.player.id);
			if(!div) {
				div = document.createElement('div');
				div.id = added_box_watch.player.id;
				div.setAttribute('style', added_box_watch.player.style);
				div.style.width = player.parentNode.offsetWidth +'px';
				div.style.height = player.parentNode.offsetHeight +'px';
				player.parentNode.insertBefore(div, player);
			}
			player.style.display = 'none';
			hide_player = true;
		}
	}
	WatchVideo(id);
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

function Change_Format(e) {
	e.preventDefault();
	var sel_box = document.getElementById(video_panel.sel_box.id);
	var pid = sel_box.getAttribute('pid');
	var fmt = sel_box.options[sel_box.selectedIndex].value;
	var video_urls = queue[pid]['video_urls'];
	if(!video_urls) {
		video_urls = queue[pid]['video_urls_cache'];
	}
	var url = video_urls[fmt];

	var id = video_panel.download.id;
	var download_button = document.getElementById(id);

	download_button.setAttribute('fmt',fmt);
	var filename = ModifyFileName(queue[pid]['title'], fmt);
	if(url && url.indexOf('videoplayback?') >= 0) {
		if(custom.others.use_title_as_filename) {
			url += '&title='+filename;
		}
	}
	var ext = custom.extention[video_format[fmt].type];
	if(video_panel.download.type == 'button') {
		download_button.value = custom.player.download_link_text+'('+ext.substr(1)+')';
		download_button.setAttribute('href',url);
	} else {
		download_button.href = url;
		download_button.innerHTML = custom.player.download_link_text+'('+ext.substr(1)+')';
	}
	download_button.setAttribute('title', filename);
	download_button.setAttribute('filename',filename+ext);
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
	if(custom.player.build_embed == true) {
		div.innerHTML = buildEmbedCode(queue[pid]['swfUrl'], queue[pid]['swfArgs']);
	} else {
		var embedUrl = queue[pid]['embedUrl'];
		if(embedUrl) {
			if(custom.player.autoplay == true) {
				embedUrl += "&autoplay=1";
			}
			div.innerHTML = '<embed src="'+embedUrl+'" allowfullscreen="true" allowScriptAccess="always" height="" width="" type="application/x-shockwave-flash">';
		} else {
			div.innerHTML = queue[pid]['embedCode'];
		}
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

// Add select box for the video format
	id = video_panel.sel_box.id;
	var sel_box = document.getElementById(id);
	var video_urls = queue[pid]['video_urls'];
	if(!video_urls) {
		video_urls = queue[pid]['video_urls_cache'];
	}
	if(!sel_box) {
		sel_box = document.createElement('select');
		sel_box.id = id;
		for(var fmt in video_format) {
			if(!video_urls[fmt]) continue;
			var node = document.createElement('option');
			node.innerHTML = AddVideoType(fmt, custom.format_type.video_panel);
			node.value = fmt;
			sel_box.appendChild(node);
		}
		sel_box.addEventListener("change",Change_Format,false);
		sel_box.addEventListener("keyup",Change_Format,false);
		div.appendChild(sel_box);
	}
	sel_box.setAttribute('pid', pid);
	style = buildStyle(custom.style.video_panel.sel_box, video_panel.sel_box.style);
	sel_box.setAttribute('style', style);

	fmt = sel_box.options[0].value
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
	var filename = ModifyFileName(queue[pid]['title'], fmt);
	var ext = custom.extention[video_format[fmt].type];
	if(video_panel.download.type == 'button') {
		download_button.value = custom.player.download_link_text+'('+ext.substr(1)+')';
		download_button.setAttribute('href',video_urls[fmt]);
		if(video_urls[fmt] && video_urls[fmt].indexOf('videoplayback?') >= 0) {
			if(custom.others.use_title_as_filename) {
				download_button.setAttribute('href',video_urls[fmt]+'&title='+filename);
			}
		}
	} else {
		download_button.href = video_urls[fmt];
		download_button.innerHTML = custom.player.download_link_text+'('+ext.substr(1)+')';
		if(download_button.href && download_button.href.indexOf('videoplayback?') >= 0) {
			if(custom.others.use_title_as_filename) {
				download_button.href += '&title='+filename;
			}
		}
	}
	download_button.setAttribute('fmt',fmt);
	download_button.setAttribute('title',filename);
	download_button.setAttribute('filename',filename+custom.extention[video_format[fmt].type]);
	style = buildStyle(custom.style.video_panel.download, video_panel.download.style);
	download_button.setAttribute('style', style);
	if(append == true) {
		div.appendChild(download_button);
		download_button.addEventListener("click",function(e) {
				e.preventDefault();
				DownloadVideo(download_button.getAttribute('href'));
			},false);
	}
	if(custom.player.download_link) {
		download_button.style.display = 'block';
		sel_box.style.display = 'block';
	} else {
		download_button.style.display = 'none';
		sel_box.style.display = 'none';
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

	id = video_panel.resize.id;
	var resize_box = document.getElementById(id);
	if(!resize_box) {
		resize_box = document.createElement('div');
		resize_box.innerHTML = "";
		resize_box.id = id;
		style = buildStyle(custom.style.video_panel.resize, video_panel.resize.style);
		resize_box.setAttribute('style', style);
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
	}
	if(hide_player == true) {
		var player = document.getElementById('movie_player');
		if(player) {
			var div = document.getElementById(added_box_watch.player.id);
			if(div) {
				div.parentNode.removeChild(div);
			}
			player.style.display = '';
			hide_player = false;
		}
	}

	setDragObject(null);
}

function Update_List_Page() {
	if(custom.list.watch_button || custom.list.download_link || custom.list.addedDate || custom.list.comments || 
	   custom.list.favorites) {
		need_information = true;
	}
	for (var pid in queue) {
		if(watch_page == true && pid == watch_page_pid) continue;
		if(queue[pid].stat == STORED_DATA &&
		   queue[pid].stat_detail && STORED_DATA) {
			WaitMessage(pid, 0);
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

	var fmt = download_button.getAttribute('fmt');
	var ext = custom.extention[video_format[fmt].type];
	var text = custom.player.download_link_text+'('+ext.substr(1)+')';
	if(video_panel.download.type == 'button') {
		download_button.value = text;
	} else {
		download_button.innerHTML = text;
	}
	var sel_box = document.getElementById(video_panel.sel_box.id);
	style = buildStyle(custom.style.video_panel.download, video_panel.download.style);
	download_button.setAttribute('style', style);
	if(custom.player.download_link) {
		download_button.style.display = 'block';
		sel_box.style.display = 'block';
	} else {
		download_button.style.display = 'none';
		sel_box.style.display = 'none';
	}
}

function Update_Watch_Page() {
	ChangeStyle();
}

// Change style for download link
function ChangeStyle() {
	var pid = watch_page_pid;
	if(queue[pid].watchable == true) {
		AddWatchButton(pid);
	}

	var video_urls = queue[pid]['video_urls'];
	if(!video_urls) {
		video_urls = queue[pid]['video_urls_cache'];
	}
	for(var fmt in video_format) {
		var link_text = custom.watch.download_link_text;
		var fmt_link = document.getElementById(added_box_watch.format.id + fmt);
		if(custom.watch.include_video_type) {
			fmt_link.style.display = 'none';
			link_text += " " + AddVideoType(fmt, custom.format_type.watch);
		} else {
			fmt_link.style.display = '';
		}
		SetButtonStyle(added_box_watch.download, link_text, fmt);

		var node = document.getElementById(added_box_watch.base.id + fmt);
		if(node) {
			if(custom.fmt.watch[fmt] == false || !video_urls[fmt]) {
				node.style.display = 'none';
			} else {
				node.style.display = 'block';
			}
		}
	}
}

// Set button style
function SetButtonStyle(box, link_text, fmt) {
	var	base_node = document.getElementById(box.div_id+fmt);
	var	anchorlink = document.getElementById(box.anchor_id+fmt);
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
	var others_html = Make_Html_For_Others();

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
		'<li id="'+setup_box.tabs.others.id+'" style="'+setup_box.tabs.others.style+'">Others</li>' +
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
		'<div id="'+setup_box.tabs.others.box_id+'" style="'+setup_box.base.box_style+'">' +
		others_html +
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
	var others_tab = document.getElementById(setup_box.tabs.others.id);

	list_tab.setAttribute('stat', 'on');
	video_tab.setAttribute('stat', 'off');
	watch_tab.setAttribute('stat', 'off');
	script_tab.setAttribute('stat', 'off');
	update_tab.setAttribute('stat', 'off');
	others_tab.setAttribute('stat', 'off');

	list_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);
	video_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);
	watch_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);
	script_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);
	update_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);
	others_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);


	Setup_List_Page();
	Setup_Video_Panel();
	Setup_Watch_Page();
	Setup_Script_Control();
	Setup_Update_Check();
	Setup_Others();

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

	if(Check_Options_Others() == false) {
		alert("The setting of Others is invalid");
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
		'<li>' +
		'<ul style="'+setup_box.list.ul_style+'">' +
		'<li style="'+setup_box.list.fmt_type_style+'">';

	var count = 0;
	for(var fmt in video_format) {
		html += '<input type="checkbox" id="'+setup_box.list.fmt_id+'_'+fmt+'">'+AddVideoType(fmt, FT_WITH_FMT_STR_NO);
		count++;
		if((count%3) == 0) html += "<br />";
	}
	html += '</li>' +
		'</ul></li>' +
		'<li style="'+setup_box.list.download_link_text_style+'">Text<input type="text" id="'+setup_box.list.download_link_text_id+'" value="'+custom.list.download_link_text+'"></li>'+
		'<li style="'+setup_box.list.watch_button_style+'"><input type="checkbox" id="'+setup_box.list.watch_button_id+'">Watch Video button</li>' +
		'<li style="'+setup_box.list.watch_button_text_style+'">Text<input type="text" id="'+setup_box.list.watch_button_text_id+'" value="'+custom.list.watch_button_text+'"></li>'+
		'</ul>'+
		'<br />'+
		'<ul style="'+setup_box.list.ul_style+'"><b>About video information</b><br />' +
		'<li style="'+setup_box.list.added_date_style+'"><input type="checkbox" id="'+setup_box.list.added_date_id+'">Uploaded</li>' +
		'<li style="'+setup_box.list.comments_style+'"><input type="checkbox" id="'+setup_box.list.comments_id+'">Comments</li>' +
//		'<li style="'+setup_box.list.favorites_style+'"><input type="checkbox" id="'+setup_box.list.favorites_id+'">Favorites</li>' +
		'</ul>'+
		'';

	return html;
}

function Setup_List_Page() {

	var node;
	custom.list.download_link = false;
	for(var fmt in custom.fmt.list) {
		node = Setup_Set_Check_Box(setup_box.list.fmt_id+"_"+fmt, custom.fmt.list[fmt]);
		if(custom.fmt.list[fmt] == true) custom.list.download_link = true;
	}
	node = Setup_Set_Check_Box(setup_box.list.download_link_id, custom.list.download_link);
	node.disabled = true;

	Setup_Set_Text_Box(setup_box.list.download_link_text_id, custom.list.download_link_text);
	Setup_Set_Check_Box(setup_box.list.watch_button_id, custom.list.watch_button);
	Setup_Set_Text_Box(setup_box.list.watch_button_text_id, custom.list.watch_button_text);

	Setup_Set_Check_Box(setup_box.list.added_date_id, custom.list.addedDate);
	Setup_Set_Check_Box(setup_box.list.comments_id, custom.list.comments);
//	Setup_Set_Check_Box(setup_box.list.favorites_id, custom.list.favorites);

}

function Check_Options_List_Page() {
	return true;
}

function Save_Options_List_Page() {
	custom.list.watch_button = document.getElementById(setup_box.list.watch_button_id).checked;
//	custom.list.download_link = document.getElementById(setup_box.list.download_link_id).checked;
	custom.list.download_link_text = document.getElementById(setup_box.list.download_link_text_id).value;
	custom.list.watch_button_text = document.getElementById(setup_box.list.watch_button_text_id).value;

	custom.list.addedDate = document.getElementById(setup_box.list.added_date_id).checked;
	custom.list.comments = document.getElementById(setup_box.list.comments_id).checked;
//	custom.list.favorites = document.getElementById(setup_box.list.favorites_id).checked;
	custom.list.download_link = false;
	for(var fmt in custom.fmt.list) {
		custom.fmt.list[fmt] = document.getElementById(setup_box.list.fmt_id+"_"+fmt).checked;
		if(custom.fmt.list[fmt] == true) custom.list.download_link = true;
	}

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
		'<li style="'+setup_box.video.build_embed_style+'"><input type="checkbox" id="'+setup_box.video.build_embed_id+'">Build up the embed code instead of the embed URL</li>' +
		'</ul>'+
		'<br />'+
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
//	Setup_Set_Check_Box(setup_box.video.lock_ratio_id, custom.player.lock_ratio);
	Setup_Set_Text_Box(setup_box.video.width_id, custom.player.player_width);
	Setup_Set_Text_Box(setup_box.video.height_id, custom.player.player_height);
	Setup_Set_Check_Box(setup_box.video.fit_aspect_ratio_id, custom.player.fit_aspect_ratio);
	Setup_Set_Text_Box(setup_box.video.min_width_id, custom.player.min_width);
	Setup_Set_Text_Box(setup_box.video.min_height_id, custom.player.min_height);
	Setup_Set_Text_Box(setup_box.video.max_width_id, custom.player.max_width);
	Setup_Set_Text_Box(setup_box.video.max_height_id, custom.player.max_height);
	Setup_Set_Check_Box(setup_box.video.build_embed_id, custom.player.build_embed);

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
//	custom.player.lock_ratio = document.getElementById(setup_box.video.lock_ratio_id).checked;
	custom.player.player_width = parseInt(document.getElementById(setup_box.video.width_id).value);
	custom.player.player_height = parseInt(document.getElementById(setup_box.video.height_id).value);
	custom.player.fit_aspect_ratio = document.getElementById(setup_box.video.fit_aspect_ratio_id).checked;
	custom.player.min_width = parseInt(document.getElementById(setup_box.video.min_width_id).value);
	custom.player.min_height = parseInt(document.getElementById(setup_box.video.min_height_id).value);
	custom.player.max_width = parseInt(document.getElementById(setup_box.video.max_width_id).value);
	custom.player.max_height = parseInt(document.getElementById(setup_box.video.max_height_id).value);
	custom.player.build_embed = document.getElementById(setup_box.video.build_embed_id).checked;
	custom.player.download_link = document.getElementById(setup_box.video.download_link_id).checked;
	custom.player.download_link_text = document.getElementById(setup_box.video.download_link_text_id).value;

	SetSetupDataVideoPanel();
}

function Make_Html_For_Watch_Page() {
	var html = ''+
		'<ul style="'+setup_box.watch.ul_style+'"><b>About buttons</b><br />' +
		'<li style="'+setup_box.watch.download_link_style+'">'+
		'<input type="checkbox" id="'+setup_box.watch.download_link_id+'">Download button</li>' +
		'<li>' +
		'<ul style="'+setup_box.list.ul_style+'">' +
		'<li style="'+setup_box.watch.fmt_type_style+'">' +
		'';

	var count = 0;
	for(var fmt in video_format) {
		html += '<input type="checkbox" id="'+setup_box.watch.fmt_id+'_'+fmt+'">'+AddVideoType(fmt, FT_WITH_FMT_STR_NO);
		count++;
		if((count%3) == 0) html += "<br />";
	}
	html += '</li>' +
		'</ul></li>' +
		'<li style="'+setup_box.watch.download_link_text_style+'">Text<input type="text" id="'+setup_box.watch.download_link_text_id+'" value="'+custom.watch.download_link_text+'">' +
		'<input type="checkbox" id="'+setup_box.watch.include_video_type_id+'">include video type' +
		'</li>'+
		'<li style="'+setup_box.watch.text_color_style+'">Text color <input type="text" id="'+setup_box.watch.text_color_id+'" value="'+custom.style.watch.anchor.text_color+'">' +
		'</li>'+
		'<li style="'+setup_box.watch.bg_color_style+'">Background color <input type="text" id="'+setup_box.watch.bg_color_id+'" value="'+custom.style.watch.anchor.bg_color+'">' +
		'</li>'+
		'<li style="'+setup_box.watch.bg_image_style+'">Background image <input type="text" id="'+setup_box.watch.bg_image_id+'" size="50" value="'+custom.style.watch.anchor.bg_image+'">' +
		'</li>'+
		'<li style="'+setup_box.watch.watch_button_style+'"><input type="checkbox" id="'+setup_box.watch.watch_button_id+'">Watch Video button</li>' +
		'<li style="'+setup_box.watch.watch_button_text_style+'">Text<input type="text" id="'+setup_box.watch.watch_button_text_id+'" value="'+custom.watch.watch_button_text+'"></li>'+
		'</ul>'+
		'';

	return html;
}

function Setup_Watch_Page() {

	custom.watch.download_link = false;
	for(var fmt in custom.fmt.watch) {
		Setup_Set_Check_Box(setup_box.watch.fmt_id+"_"+fmt, custom.fmt.watch[fmt]);
		if(custom.fmt.watch[fmt] == true) custom.watch.download_link = true;
	}
	var node = Setup_Set_Check_Box(setup_box.watch.download_link_id, custom.watch.download_link);
	node.disabled = true;
	Setup_Set_Check_Box(setup_box.watch.include_video_type_id, custom.watch.include_video_type);

	Setup_Set_Text_Box(setup_box.watch.download_link_text_id, custom.watch.download_link_text);
	Setup_Set_Text_Box(setup_box.watch.text_color_id, custom.style.watch.anchor.text_color);
	Setup_Set_Text_Box(setup_box.watch.bg_color_id, custom.style.watch.anchor.bg_color);
	Setup_Set_Text_Box(setup_box.watch.bg_image_id, custom.style.watch.anchor.bg_image);
	Setup_Set_Check_Box(setup_box.watch.watch_button_id, custom.watch.watch_button);
	Setup_Set_Text_Box(setup_box.watch.watch_button_text_id, custom.watch.watch_button_text);

}

function Check_Options_Watch_Page() {
	return true;
}

function Save_Options_Watch_Page() {
	custom.watch.download_link = document.getElementById(setup_box.watch.download_link_id).checked;
	custom.watch.download_link_text = document.getElementById(setup_box.watch.download_link_text_id).value;
	custom.watch.include_video_type = document.getElementById(setup_box.watch.include_video_type_id).checked;
	custom.style.watch.anchor.text_color = document.getElementById(setup_box.watch.text_color_id).value;
	custom.style.watch.anchor.bg_color = document.getElementById(setup_box.watch.bg_color_id).value;
	custom.style.watch.anchor.bg_image = document.getElementById(setup_box.watch.bg_image_id).value;

	for(var fmt in custom.fmt.watch) {
		custom.fmt.watch[fmt] = document.getElementById(setup_box.watch.fmt_id+"_"+fmt).checked;
	}
	custom.watch.watch_button = document.getElementById(setup_box.watch.watch_button_id).checked;
	custom.watch.watch_button_text = document.getElementById(setup_box.watch.watch_button_text_id).value;

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
		'<br />'+
		'<ul style="'+setup_box.script.ul_style+'"><b>About scroll box</b><br />' +
		'<li style="'+setup_box.script.page_num_processed_style+'"><input type="checkbox" id="'+setup_box.script.page_num_processed_id+'">Number of pages processed on loading' +
		'<li style="'+setup_box.script.page_num_list_style+'">List view<input type="text" id="'+setup_box.script.page_num_list_id+'" size="2">pages' +
		' (' + MIN_PAGE_NUM_LIST + '-' + MAX_PAGE_NUM_LIST +') 12 videos per page</li>' +
		'<li style="'+setup_box.script.page_num_grid_style+'">Grid view<input type="text" id="'+setup_box.script.page_num_grid_id+'" size="2">pages' +
		' (' + MIN_PAGE_NUM_GRID + '-' + MAX_PAGE_NUM_GRID +') 30 videos per page</li>' +
		'</li>'+
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

	Setup_Set_Check_Box(setup_box.script.page_num_processed_id, custom.queue.page_num_processed);
	Setup_Set_Text_Box(setup_box.script.page_num_list_id, custom.queue.page_num_list);
	Setup_Set_Text_Box(setup_box.script.page_num_grid_id, custom.queue.page_num_grid);

}

function Check_Options_Script_Control() {
	if(/^\d+$/.test(document.getElementById(setup_box.script.check_interval_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.check_interval_done_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.max_send_request_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.max_wait_limit_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.max_retry_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.page_num_list_id).value) == false)  return false;
	if(/^\d+$/.test(document.getElementById(setup_box.script.page_num_grid_id).value) == false)  return false;

	var interval = parseInt(document.getElementById(setup_box.script.check_interval_id).value);
	var interval_done = parseInt(document.getElementById(setup_box.script.check_interval_done_id).value);
	var max_send = parseInt(document.getElementById(setup_box.script.max_send_request_id).value);
	var max_wait = parseInt(document.getElementById(setup_box.script.max_wait_limit_id).value);
	var max_retry = parseInt(document.getElementById(setup_box.script.max_retry_id).value);
	var page_num_list = parseInt(document.getElementById(setup_box.script.page_num_list_id).value);
	var page_num_grid = parseInt(document.getElementById(setup_box.script.page_num_grid_id).value);
	if(interval < MIN_INTERVAL) return false;
	if(interval_done < MIN_INTERVAL) return false;
	if(max_send < MIN_MAX_SEND) return false;
	if(max_wait < MIN_MAX_WAIT) return false;
	if(max_retry < MIN_MAX_RETRY) return false;
	if(page_num_list < MIN_PAGE_NUM_LIST) return false;
	if(page_num_grid < MIN_PAGE_NUM_GRID) return false;
	if(interval > MAX_INTERVAL) return false;
	if(interval_done > MAX_INTERVAL) return false;
	if(max_send > MAX_MAX_SEND) return false;
	if(max_wait > MAX_MAX_WAIT) return false;
	if(max_retry > MAX_MAX_RETRY) return false;
	if(page_num_list > MAX_PAGE_NUM_LIST) return false;
	if(page_num_grid > MAX_PAGE_NUM_GRID) return false;
	return true;
}

function Save_Options_Script_Control() {
	custom.queue.check_interval = document.getElementById(setup_box.script.check_interval_id).value * 1000;
	custom.queue.check_interval_done = document.getElementById(setup_box.script.check_interval_done_id).value * 1000;
	custom.queue.max_send_request = document.getElementById(setup_box.script.max_send_request_id).value;
	custom.queue.max_wait_limit = document.getElementById(setup_box.script.max_wait_limit_id).value * 1000;
	custom.queue.max_retry = document.getElementById(setup_box.script.max_retry_id).value;
	custom.queue.page_num_processed = document.getElementById(setup_box.script.page_num_processed_id).checked;
	custom.queue.page_num_list = document.getElementById(setup_box.script.page_num_list_id).value;
	custom.queue.page_num_grid = document.getElementById(setup_box.script.page_num_grid_id).value;
	SetSetupDataScriptControl();

}

// for Others tab
function Make_Html_For_Others() {
	var html = ''+
		'<ul style="'+setup_box.others.ul_style+'"><b>About fmt_url_map</b><br />' +
		'<li style="'+setup_box.others.use_title_as_filename_style+'"><input type="checkbox" id="'+setup_box.others.use_title_as_filename_id+'">Use title as a file name</li>'+
		'<div id="'+setup_box.others.ft_box_id+'" style="'+setup_box.others.ft_box_style+'">' +
		'<ul style="'+setup_box.others.ul_style+'">' +
		'<li style="'+setup_box.others.li_style+'">Additional information</li>' +
		'<li style="'+setup_box.others.li_style+'">' +
		'<input type="radio" name="'+setup_box.others.ft_name+'" id="'+setup_box.others.ft_id+'0" value="'+FT_WITH_FMT_NO+'">(fmt=xx)' +
		'<input type="radio" name="'+setup_box.others.ft_name+'" id="'+setup_box.others.ft_id+'1" value="'+FT_WITH_FMT_NO_ONLY+'">(xx)' +
		'<input type="radio" name="'+setup_box.others.ft_name+'" id="'+setup_box.others.ft_id+'2" value="'+FT_WITH_FMT_STR+'">Format Quality' +
		'<input type="radio" name="'+setup_box.others.ft_name+'" id="'+setup_box.others.ft_id+'3" value="'+FT_WITH_FMT_STR_NO+'">Format Quality(xx)' +
		'</li>'+
		'<li style="'+setup_box.others.li_style+'">' +
		'<input type="radio" name="'+setup_box.others.ft_name+'" id="'+setup_box.others.ft_id+'4" value="'+FT_TITLE_ONLY+'">Nothing' +
		'<input type="radio" name="'+setup_box.others.ft_name+'" id="'+setup_box.others.ft_id+'5" value="'+FT_WITH_QUALITY+'">Quality' +
		'<input type="radio" name="'+setup_box.others.ft_name+'" id="'+setup_box.others.ft_id+'6" value="'+FT_WITH_RESOLUTION+'">Resolution' +
		'</li>'+
		'</ul>'+
		'</div>'+
		'</ul>'+
//		'<ul style="'+setup_box.others.ul_style+'"><b>About ads</b><br />' +
//		'<li style="'+setup_box.others.remove_ads_style+'"><input type="checkbox" id="'+setup_box.others.remove_ads_id+'">Remove ads</li>' +
//		'</ul>'+
		'';
	return html;
}

function Setup_Others() {
	Setup_Set_Check_Box(setup_box.others.use_title_as_filename_id, custom.others.use_title_as_filename);
	Setup_Set_Radio_Button(setup_box.others.ft_id+'0', (custom.format_type.filename == FT_WITH_FMT_NO));
	Setup_Set_Radio_Button(setup_box.others.ft_id+'1', (custom.format_type.filename == FT_WITH_FMT_NO_ONLY));
	Setup_Set_Radio_Button(setup_box.others.ft_id+'2', (custom.format_type.filename == FT_WITH_FMT_STR));
	Setup_Set_Radio_Button(setup_box.others.ft_id+'3', (custom.format_type.filename == FT_WITH_FMT_STR_NO));
	Setup_Set_Radio_Button(setup_box.others.ft_id+'4', (custom.format_type.filename == FT_TITLE_ONLY));
	Setup_Set_Radio_Button(setup_box.others.ft_id+'5', (custom.format_type.filename == FT_WITH_QUALITY));
	Setup_Set_Radio_Button(setup_box.others.ft_id+'6', (custom.format_type.filename == FT_WITH_RESOLUTION));
//	Setup_Set_Check_Box(setup_box.others.remove_ads_id, custom.others.remove_ads);
}

function Check_Options_Others() {
}

function Save_Options_Others() {
	custom.others.use_title_as_filename = document.getElementById(setup_box.others.use_title_as_filename_id).checked;
	var type;
	if(document.getElementById(setup_box.others.ft_id+'0').checked == true) {
		type = FT_WITH_FMT_NO;
	} else
	if(document.getElementById(setup_box.others.ft_id+'1').checked == true) {
		type = FT_WITH_FMT_NO_ONLY;
	} else
	if(document.getElementById(setup_box.others.ft_id+'2').checked == true) {
		type = FT_WITH_FMT_STR;
	} else
	if(document.getElementById(setup_box.others.ft_id+'3').checked == true) {
		type = FT_WITH_FMT_STR_NO;
	} else
	if(document.getElementById(setup_box.others.ft_id+'4').checked == true) {
		type = FT_TITLE_ONLY;
	} else
	if(document.getElementById(setup_box.others.ft_id+'5').checked == true) {
		type = FT_WITH_QUALITY;
	} else
	if(document.getElementById(setup_box.others.ft_id+'6').checked == true) {
		type = FT_WITH_RESOLUTION;
	}
	custom.format_type.filename = type;
//	custom.others.remove_ads = document.getElementById(setup_box.others.remove_ads_id).checked;
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


function CopyVideoInfoDetail(pid, VideoInfo) {
	var infoKeys = [
		'url_encoded_fmt_stream_map',
		'token',
		'video_id',
		'status',
		'errorcode',
		'reason',
		];
	for (var i in infoKeys) {
		queue[pid][infoKeys[i]] = VideoInfo[infoKeys[i]];
	}
}

// Get Video detail information
function GetVideoDetailInformation(pid)
{
	var infoKeys = [
		'url_encoded_fmt_stream_map',
		'token',
		'video_id',
		'status',
		'errorcode',
		'reason',
		];
	var decodeKeys = [
		'reason',
		'url_encoded_fmt_stream_map',
		];
	var url = buildURL(pid, GET_VIDEO_INFO);

	setTimeout(function(){
		queue[pid].stat_detail = SENT_REQUEST;
		if(watch_page == false || pid != watch_page_pid){
			WaitMessage(pid, 1);
		}
		queue[pid].sent_time_detail = (new Date()).getTime();
		GM_xmlhttpRequest({
			method: "GET",
			url: encodeURI(url),
			headers: {
				"User-Agent":"Mozilla/4.0 (compatible; MSIE 6.0; Win32)",
				"Accept":"*/*"
			},
			onload: function(xhr){
				var text = xhr.responseText;
				var video_id = xhr.finalUrl.match(/video_id=(.+)/)[1];
				var pid = ExtractPid(this.url);
				if(!pid) {
					pid = video_id;
				}
				if(pid) {
					queue[pid].stat_detail = RECEIVED_RESPONSE;
				}
				if ( xhr.status != 200 &&
				     xhr.status != 303) {	// failed
					if(watch_page == false || pid != watch_page_pid){
						WaitMessage(pid, xhr.status);
					}
					GM_log(xhr.status + ': ' + text);
					return;
				}

				var param = text.split('&');
				for(var i = 0; i < param.length; i++) {
					var work = param[i].split('=');
					if(infoKeys.indexOf(work[0]) >= 0) {
						if(decodeKeys.indexOf(work[0]) >= 0) {
							queue[pid][work[0]] = decodeURIComponent(work[1]);
						} else {
							queue[pid][work[0]] = work[1];
						}
					}
				}
				if(queue[pid]['status'] == 'fail') {
					queue[pid].video_urls = null;
					queue[pid].stat_detail = STORED_DATA;
					if(watch_page == false || pid != watch_page_pid){
						WaitMessage(pid, 0);
						AddMetaData(pid);
						if(queue[pid].clone_num) {
							for(var j in queue[pid].clone_pid) {
								var clone_pid = queue[pid].clone_pid[j];
								CopyVideoInfoDetail(clone_pid, queue[pid]);
								queue[clone_pid].stat_detail = STORED_DATA;
								AddMetaData(clone_pid);
							}
						}
					} else {
						ParseVideoDetailWatch(pid);
					}
					return;
				}
				if(queue[pid]['url_encoded_fmt_stream_map']) {
					var fmt_url_map = queue[pid]['url_encoded_fmt_stream_map'].split(',');
					queue[pid].video_urls = new Array();
					for(var i in fmt_url_map) {
						var params = fmt_url_map[i].split('&');
						var videos = "";
						var fmt = "";
						for(var j in params) {
							var tmpparam = params[j].split('=');
							if(tmpparam.length > 1) {
								var id = tmpparam[0];
								var val = tmpparam[1];
								if(id == 'url') {
									videos = decodeURIComponent(val);
								} else 
								if(id == 'itag') {
									fmt = val;
								}
							}
						}
						queue[pid].video_urls['fmt_'+ fmt] = videos;
					}
				}
				queue[pid].stat_detail = STORED_DATA;
				if(watch_page == false || pid != watch_page_pid){
					WaitMessage(pid, 0);
					AddMetaData(pid);
					if(queue[pid].clone_num) {
						for(var j in queue[pid].clone_pid) {
							var clone_pid = queue[pid].clone_pid[j];
							for (var i in infoKeys) {
								queue[clone_pid][infoKeys[i]] = queue[pid][infoKeys[i]];
							}
							queue[clone_pid].video_urls = queue[pid].video_urls;
							queue[clone_pid].stat_detail = STORED_DATA;
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

	var title = text.match(/@name\s+(.*)/)[1];
	if(title) {
		data.title = RegExp.$1;
	}
	var version = text.match(/@version\s+(.*)/);
	if(version) {
		data.version = RegExp.$1;
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
			url: THIS_META_URL,
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
