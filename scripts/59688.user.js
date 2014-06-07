// ==UserScript==
// @name           Agrega un hipervínculo para descargar un vídeo de Youtube
// @namespace      http://userscripts.org/users/76078
// @version        0.6.0
// @author         charmy (traducido al español por Omar Botta)
// @description    Agrega un hipervínculo para descargar un vídeo de Youtube
// @include        http://www.youtube.com/*
// @include        http://youtube.com/*
// @include        http://*.youtube.com/*
// @exclude        http://*.youtube.com/members*
// ==/UserScript==

(function() {

// for update check
const THIS_SCRIPT_NO = '57674';
const THIS_URL = 'http://userscripts.org/scripts/show/'+THIS_SCRIPT_NO;
const THIS_VER = '0.6.0';

const NO_CHECK = 0;
const EVERY_LOADING = 1;
const ONCE_A_DAY = 2;
const ONCE_A_WEEK = 3;
const ONCE_A_MONTH = 4;

// option of 'Once a week' mode
const ANY_DAY = -1;		// En la primera carga de la semana
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
const	DEFAULT_PLAYER_WIDTH = 640;	//original value is 640
const	DEFAULT_PLAYER_HEIGHT = 385;	// original value is 385

const NONE = 0;
const SENT_REQUEST = 1;
const RECEIVED_RESPONSE = 2;
const STORED_DATA = 3;
const NOT_RECEIVED = 4;
var queue = new Array(0);
var pidmap = new Array(0);

const MAX_HTTP_REQUEST = 10;		// up to 10 http request at the same time
const QUEUE_CHECK_INTERVAL = 20*1000;	// 20 sec.
const MAX_WAIT_LIMIT = 120*1000;	// 120 sec

var video_format = {
	fmt_22: {
		type: 'VIDEO_MP4_TYPE',
		key: '22',
		text: "MP4 HD"
	},
	fmt_18: {
		type: 'VIDEO_MP4_TYPE',
		key: '18',
		text: "MP4 HQ"
	},
	fmt_35: {
		type: 'VIDEO_FLV_TYPE',
		key: '35',
		text: "FLV HQ"
	},
	fmt_34: {
		type: 'VIDEO_FLV_TYPE',
		key: '34',
		text: "FLV"
	},
	fmt_5: {
		type: 'VIDEO_FLV_TYPE',
		key: '5',
		text: "FLV LQ"
	},
};

// for format_type
const FT_WITH_FMT_NO = 0;	// title(fmt=xx) (xx = 22,18,35,34,5)
const FT_WITH_FMT_NO_ONLY = 1;	// title(xx)	 (xx = 22,18,35,34,5)
const FT_WITH_FMT_STR = 2;	// title xxx	 (xxx = MP4 HD,MP4 HQ,FLV HQ,FLV,FLV LQ)
const FT_WITH_FMT_STR_NO = 3;	// title xxx	 (xxx = MP4 HD(22),MP4 HQ(18),FLV HQ(35),FLV(34),FLV LQ(5))
const FT_TITLE_ONLY = 4;	// title only

const SETUP_VERSION = 1;
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
		top: 'center',	// pixel value or 'center'
		left: 'center',	// pixel value or 'center'
	},
	extention: {
		VIDEO_FLV_TYPE: '.flv',
		VIDEO_MP4_TYPE: '.mp4',
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
		ratings: true,
		avg_rating: true,
		favorites: false,
		watch_button: true,
	},
	watch: {
		autoplay: true,	// not supported
		disp_type: TEXT_TYPE,
		text_color: '#FFFFFF',
		bg_color: '#FF3333',
		image_url: '',
	},
	check_interval: 0,	// msec. no checking if the value is 0
	max_retry: 1,
	fmt: {
		watch: {
			fmt_5: true,	// FLV 
			fmt_18: true,	// MP4 HQ
			fmt_22: true,	// MP4 HD
			fmt_34: true,	// FLV H264
			fmt_35: true,	// FLV HQ
		},
		list: {
			fmt_5: true,	// FLV 
			fmt_18: true,	// MP4 HQ
			fmt_22: true,	// MP4 HD
			fmt_34: true,	// FLV H264
			fmt_35: true,	// FLV HQ
		}
	},
	queue: {
		check_interval: QUEUE_CHECK_INTERVAL,
		max_send_request: MAX_HTTP_REQUEST,
		max_wait_limit: MAX_WAIT_LIMIT,
	},
};

var button_style = 'color:#FFFFFF;background-color:#FF3333;font-weight:bold;cursor:pointer;-moz-border-radius:1px;';
var fmt_style = 'width: 200px;margin-left:10px;margin-right:20px;';

// for watch page
//var	disp_type = TEXT_TYPE;
var	video_urls = new Array();
var	watch_page_pid = '';
// added box for download links
var added_box_watch = {
// for the video download button
// for text type
	base: {
		base_id: 'AddsALinkDownloadBase',
		id: 'AddsALinkDownloadFormatBase',
		base_style: 'margin-bottom:10px;',
		style: 'margin-bottom:10px;',
	},
	texttype: {
		div_id: 'AddsALinkTextDownloadBox',
		div_style: 'border:2px solid #FF3333;',
		anchor_id: 'AddsALinkTextDownloadURL',
		anchor_style: 'padding: 4px 10px 4px 10px;font-weight: bold;-moz-border-radius:3px;',
	},

// for image type
	imagetype: {
		div_id: 'AddsALinkImageDownloadBox',
		div_style: '',
		anchor_id: 'AddsALinkImageDownloadURLAnchor',
		anchor_style: '',
		image_id: 'AddsALinkImageDownloadURLImage',
		image_style: '',
	},

// for format
	format: {
		id: 'AddsALinkWatchVideoFormat',
		style: fmt_style + 'color:#0054A6;',
		style_2: fmt_style + 'color:#777777;',
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
		style: 'font-size:0.9em;float:left;'
	},
	download: {
		id: 'AddsALinkDownloadLink_',
		style: 'color:#0054A6;',
		style_2: 'color:#777777;',
	},
	meta: {
		id: 'AddsALinkMetaBox_',
		wait_id: 'AddsALinkMetaWait_',
		style: 'color:#008800;font-size:1em;',
		wait_style: 'color:#FF0000;'
	},
	watch: {
		id: 'AddsALinkWatch_',
		style: button_style+'float:left;',
		error_style: 'color:#FF0000;',
	}
};

var	video_panel = {
	box: {
		id: 'AddsALinkVideoPanel',
		style: 'padding:20px 20px 40px 20px;position:fixed;background-color:rgba(0,0,0,0.9);z-index:20000;display:block;cursor:move;',
		close_style: 'display:none;'
	},
	title: {
		id: 'AddsALinkWatchTitle',
		style: 'color:#FFFFFF;font-size:14px;height:14px;margin-top:6px'
	},
	player: {
		id: 'AddsALinkEmbed',
		style: 'margin:10px 0px 0px 0px;z-index'
	},
	sel_box: {
		id: 'AddsALinkSelectFormat',
		style: 'margin-top:10px;padding:2px 4px 2px 4px;position:absolute;bottom:25px;right:170px;'
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
		style: 'height:14px;width:99%;position:absolute;bottom:0px;left:0px;padding:0px 2px 2px 2px;color:#FFFF00;background-color:#404040;text-align:left;'
	},
	resize: {
		id: 'AddsALinkResizeBox',
		style: 'height:16px;width:16px;position:absolute;bottom:0px;right:0px;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAIAAACQKrqGAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB9SURBVHjaYrxy4QQDcQAggJiIUaStbw4kAQKIiRh1jY2NQAZAADERqQ4IAAKIiRh1IQEeQBIggJiIUQdxK0AAMRGjDsIGCCAmItUBAUAAMRGjDuJWgABiIkYdxK0AAcREjDoIGyCAmIhUBwQAAcREjDqIWwECiJH45AIQYACQSUAeiz1vwgAAAABJRU5ErkJggg==");'
	}
};

// for setup
var li_style = "padding-left:10px;padding-top:6px;font-size:12px;";
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
		update: {
			id: 'AddsALinkSetupBoxUpdateCheckerTab',
			box_id: 'AddsALinkSetupBoxUpdateCheckerBox',
			style: tab_style+'left:210px;',
			style_active: tab_style_active+'left:210px;',
		}
	},
	watch: {
		disp_type_name: 'AddsALinkSetupWatchDispType',
		text_type_id: 'AddsALinkSetupWatchDispTypeText',
		image_type_id: 'AddsALinkSetupWatchDispTypeImage',
		text_color_id: 'AddsALinkSetupWatchTextColor',
		bg_color_id: 'AddsALinkSetupWatchBGColor',
		image_url_id: 'AddsALinkSetupWatchImageURL',
//		fmt_anchor_id: 'AddsALinkSetupWatchFmtWithAnchor',
		autoplay_id: 'AddsALinkSetupWatchAutoplay',
		disp_type_style: 'margin:5px 0 0 0;',
		title_style: 'text-align:center;margin:0 0 5px 0;font-weight:bold;',
		ul_style: 'padding-left:20px;padding-top:6px;list-style:none inside;',
		text_type_style: li_style+'margin:0 5px 0 10px;cursor:pointer;',
		image_type_style: li_style+'margin:0 5px 0 10px;cursor:pointer;',
		image_url_style: li_style,
		text_color_style: li_style,
//		fmt_anchor_style: li_style,
		bg_color_style: li_style,
		fmt_type_style: li_style
	},
	list: {
		download_link_id: 'AddsALinkSetupListDownloadLink',
		addedDate_id: 'AddsALinkSetupListAddedDate',
		comments_id: 'AddsALinkSetupListComments',
		favorites_id: 'AddsALinkSetupListFavorites',
		ratings_id: 'AddsALinkSetupListRatings',
		avg_rating_id: 'AddsALinkSetupListAvgRating',
		watch_button_id: 'AddsALinkSetupListWatchButton',
		fmt_id: 'AddsALinkSetupListVideoFormat',
		ul_style: 'padding-left:20px;padding-top:6px;list-style:none inside;',
		download_link_style: li_style,
		addedDate_style: li_style,
		comments_style: li_style,
		favorites_style: li_style,
		ratings_style: li_style,
		avg_rating_style: li_style,
		watch_button_style: li_style,
		fmt_type_style: li_style,
	},
	video: {
		autoplay_id: 'AddsALinkSetupVideoPlayerAutoplay',
		auto_resize_id: 'AddsALinkSetupVideoPlayerAutoResize',
		lock_ratio_id: 'AddsALinkSetupVideoPlayerLockRatio',
		height_id: 'AddsALinkSetupVideoPlayerHeight',
		width_id: 'AddsALinkSetupVideoPlayerWidth',
		min_height_id: 'AddsALinkSetupVideoMinResizeHeight',
		min_width_id: 'AddsALinkSetupVideoMinResizeWidth',
		max_height_id: 'AddsALinkSetupVideoMaxResizeHeight',
		max_width_id: 'AddsALinkSetupVideoMaxResizeWidth',
		ul_style: 'padding-left:10px;padding-top:6px;list-style:none inside;',
		autoplay_style: li_style,
		auto_resize_style: li_style,
		lock_ratio_style: li_style,
		height_style: li_style,
		width_style: li_style,
		min_height_style: li_style,
		min_width_style: li_style,
		max_height_style: li_style,
		max_width_style: li_style,
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
		ul_style: 'padding-left:10px;padding-top:6px;list-style:none inside;',
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
		ok_style: 'margin:10px 0px 10px 100px;cursor:pointer;background-color:buttonface;',
		cancel_style: 'margin:10px 0px 10px 100px;cursor:pointer;background-color:buttonface;'
	}
};


var	watch_page = false;

const	UNKNOWN_PAGE = 0;
const	CHANNEL_PAGE = 1;
const	VIDEOS_PAGE = 2;
const	SEARCH_PAGE = 3;
const	PROFILE_PAGE = 4;
const	PLAYLIST_PAGE = 5;
const	WATCH_PAGE = 6;
const	HOME_PAGE = 7;
var	page_type = UNKNOWN_PAGE;	// reserved

const	TYPE_INSERTED = 0;
const	TYPE_MODIFIED = 1;

const	CALL_FROM_WATCH = 0;
const	CALL_FROM_LIST = 1;

var	max_height = 0;
var	listener_query = '';
var	listener_type = TYPE_INSERTED;
var	anchor_query = '';
var	anchor_querys = new Array();
var	cell_query = '';
var	cell_querys = new Array();
var	listbox_query = '';
var	listbox_querys = new Array();
var	added_query = '';
var	added_querys = new Array();
var	spotlight_query = '';
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

const	CELL_HEIGHT_AUTO = 0;
const	CELL_HEIGHT_CALC = 1;
var	cell_calc_type = CELL_HEIGHT_AUTO;


if(window.location.href == 'http://www.youtube.com/') {
	page_type = HOME_PAGE;
// Featured
	anchor_querys[0] = '//div[@id="feedmodule-FEA"]//div[contains(@class,"video-title")]//a[contains(@href,"/watch?")]';
	added_querys[0] = 'ancestor::div[@class="video-main-content"]';
	cell_querys[0] =  'ancestor::div[@class="video-main-content"]/..';
// Videos Being Watched Now
	anchor_querys[1] = '//div[@id="feedmodule-POP"]//div[contains(@class,"video-title")]//a[contains(@href,"/watch?")]';
	added_querys[1] = 'ancestor::div[@class="video-main-content"]|ancestor::div[@class="feedmodule-singleform-info"]';
	cell_querys[1] =  'ancestor::div[@class="video-main-content"]/..|ancestor::div[@class="feedmodule-singleform-info"]/..';
// Most Popular
	anchor_querys[2] = '//div[@id="feedmodule-TOP"]//div[contains(@class,"video-title")]//a[contains(@href,"/watch?")]';
	added_querys[2] = 'ancestor::div[@class="feedmodule-singleform-info"]';
	cell_querys[2] =  'ancestor::div[@class="feedmodule-singleform-info"]/..';
// Recommended for You
	anchor_querys[3] = '//div[@id="feedmodule-REC"]//div[contains(@class,"video-title")]//a[contains(@href,"/watch?")]';
	added_querys[3] = 'ancestor::div[@class="video-main-content"]';
	cell_querys[3] =  'ancestor::div[@class="video-main-content"]/..';
// ALL
	anchor_querys[4] = '//div[@id="feedmodule-ALL"]//div[contains(@class,"video-title")]//a[contains(@href,"/watch?")]';
	added_querys[4] = 'ancestor::div[@class="video-main-content"]';
	cell_querys[4] =  'ancestor::div[@class="video-main-content"]/..';
// Promoted
	if(need_promoted) {
		var last = anchor_querys.length;
		anchor_querys[last] = '//div[@id="feedmodule-PRO"]//div[contains(@class,"video-title")]//a[contains(@href,"/watch?")]';
		added_querys[last] = 'ancestor::div[@class="video-main-content"]|ancestor::div[@class="feedmodule-singleform-info"]';
		cell_querys[last] =  'ancestor::div[@class="video-main-content"]/..|ancestor::div[@class="feedmodule-singleform-info"]/..';
	}

} else
if(window.location.href.indexOf('/results?') >= 0) {
	page_type = SEARCH_PAGE;
	anchor_query = '//div[contains(@class,"video-title")]//a[contains(@href,"/watch?")]';
	cell_query =  'ancestor::div[@class="video-main-content"]';
	added_query = 'ancestor::div[@class="video-main-content"]';
	listener_query = '//div[@id="results-main-content"]';
} else
if(window.location.href.indexOf('/browse') >= 0 ||
   window.location.href.indexOf('/videos') >= 0) {
	page_type = VIDEOS_PAGE;
	anchor_query = '//div[contains(@class,"video-title")]//a[contains(@href,"/watch?")]';
	cell_query =  'ancestor::div[@class="video-main-content"]|ancestor::div[contains(@class,"main-tabs-spotlight-inner")]';
	added_query = 'ancestor::div[@class="video-main-content"]';
	spotlight_query = 'ancestor::div[contains(@class,"main-tabs-spotlight")]';
	listener_query = '//div[@id="body-column"]';
} else
if(window.location.href.indexOf('/user/') >= 0) {
	if(document.getElementById('channel-body')) {
		listener_query = '//div[@id="playnav-play-content"]';
		listener_type = TYPE_MODIFIED;
		page_type = CHANNEL_PAGE;
		cell_calc_type = CELL_HEIGHT_CALC;
		anchor_querys[0] = '//div[contains(@class,"playnav-video-info")]//a[contains(@href,"/watch?")]';
		cell_querys[0] = 'ancestor::div[contains(@class,"playnav-item")]';
		listbox_querys[0] = 'ancestor::div[contains(@class,"scrollbox-page")]';
		added_querys[0] = 'ancestor::div[@class="playnav-video-info"]';
		anchor_querys[1] = '//div[@class="centerpiece"]//a[contains(@href,"/watch?")]';
		cell_querys[1] =  'ancestor::div[@class="centerpiece"]';
		added_querys[1] = 'ancestor::div[@class="centerpiece"]';
		listbox_querys[1] = '';
		GM_addStyle("#playnav-play-uploads-items .scrollbox-page {height: auto !important;}");
	} else {
		page_type = PROFILE_PAGE;
// Main content(featured)
		anchor_querys[0] = '//div[@id="user_featured"]//a[contains(@href,"/watch?")]';
		cell_querys[0] =  'ancestor::div[@class="box-body"]';
		added_querys[0] = 'ancestor::div[@class="box-fg"]';
// Main content(videos/favorites)
		anchor_querys[1] = '//div[@id="user_videos" or @id="user_favorites"]//div[@class="video-main-content"]//a[contains(@href,"/watch?")]';
		cell_querys[1] =  'ancestor::div[@class="video-cell"]';
		added_querys[1] = 'ancestor::div[@class="video-main-content"]';
// Side content
		anchor_querys[2] = '//div[@id="profile-side-content"]//a[contains(@href,"/watch?")]';
		cell_querys[2] =  'ancestor::div[@class="centerpiece"]/..';
		added_querys[2] = 'ancestor::div[@class="centerpiece"]';
	}
} else
if(window.location.href.indexOf('/profile?') >= 0) {
	page_type = PROFILE_PAGE;
// Main content(featured)
	anchor_querys[0] = '//div[@id="user_featured"]//a[contains(@href,"/watch?")]';
	cell_querys[0] =  'ancestor::div[@class="box-body"]';
	added_querys[0] = 'ancestor::div[@class="box-fg"]';
// Main content(videos/favorites)
	anchor_querys[1] = '//div[@id="user_videos" or @id="user_favorites"]//div[@class="video-main-content"]//a[contains(@href,"/watch?")]';
	cell_querys[1] =  'ancestor::div[@class="video-cell"]';
	added_querys[1] = 'ancestor::div[@class="video-main-content"]';
// Side content
	anchor_querys[2] = '//div[@id="profile-side-content"]//a[contains(@href,"/watch?")]';
	cell_querys[2] =  'ancestor::div[@class="centerpiece"]/..';
	added_querys[2] = 'ancestor::div[@class="centerpiece"]';
	listener_query = '//div[@id="baseDiv"]';
} else
if(window.location.href.indexOf('/view_play_list?') >= 0) {
	page_type = PLAYLIST_PAGE;
	anchor_query = '//div[@class="video-cell"]//div[@class="video-main-content"]//a[contains(@href,"/watch?")]';
	cell_query =  'ancestor::div[@class="video-cell"]';
	added_query = 'ancestor::div[@class="video-main-content"]';
} else
if(window.location.href.indexOf('/watch?') >= 0) {
	watch_page = true;
	page_type = WATCH_PAGE;
	anchor_query = '//div[contains(@class,"video-main-content")]//a[contains(@href,"/watch?")]';
	cell_query =  'ancestor::div[@class="video-main-content"]/..';
	added_query = 'ancestor::div[@class="video-main-content"]';
	listener_type = TYPE_MODIFIED;
	listener_query = '//div[@id="watch-channel-videos-panel"]';
} else {
	page_type = UNKNOWN_PAGE;	// May be Videos page or localized Home page
	var spotlight = document.evaluate('//div[contains(@class,"main-tabs-spotlight")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(spotlight) {
		page_type = VIDEOS_PAGE;
	} else {
		page_type = HOME_PAGE;
	}
	if(page_type == VIDEOS_PAGE) {
		anchor_query = '//div[contains(@class,"video-title")]//a[contains(@href,"/watch?")]';
		cell_query =  'ancestor::div[@class="video-main-content"]|ancestor::div[contains(@class,"main-tabs-spotlight-inner")]';
		added_query = 'ancestor::div[@class="video-main-content"]';
		spotlight_query = 'ancestor::div[contains(@class,"main-tabs-spotlight")]';
		listener_query = '//div[@id="body-column"]';
	} else {
// Featured
		anchor_querys[0] = '//div[@id="feedmodule-FEA"]//div[contains(@class,"video-title")]//a[contains(@href,"/watch?")]';
		added_querys[0] = 'ancestor::div[@class="video-main-content"]';
		cell_querys[0] =  'ancestor::div[@class="video-main-content"]/..';
// Videos Being Watched Now
		anchor_querys[1] = '//div[@id="feedmodule-POP"]//div[contains(@class,"video-title")]//a[contains(@href,"/watch?")]';
		added_querys[1] = 'ancestor::div[@class="feedmodule-singleform-info"]';
		cell_querys[1] =  'ancestor::div[@class="feedmodule-singleform-info"]/..';
// Most Popular
		anchor_querys[2] = '//div[@id="feedmodule-TOP"]//div[contains(@class,"video-title")]//a[contains(@href,"/watch?")]';
		added_querys[2] = 'ancestor::div[@class="feedmodule-singleform-info"]';
		cell_querys[2] =  'ancestor::div[@class="feedmodule-singleform-info"]/..';

// Promoted
		if(need_promoted) {
			anchor_querys[3] = '//div[@id="feedmodule-PRO"]//div[contains(@class,"video-title")]//a[contains(@href,"/watch?")]';
			added_querys[3] = 'ancestor::div[@class="video-main-content"]|ancestor::div[@class="feedmodule-singleform-info"]';
			cell_querys[3] =  'ancestor::div[@class="video-main-content"]/..|ancestor::div[@class="feedmodule-singleform-info"]/..';
		}
	}
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


function Nop(){}


const WATCH_URL = 0;
const GET_VIDEO_INFO = 1;
const GET_VIDEO = 2;
const STAT_URL = 3;
const EMBED_URL = 4;

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
		if(fmt) {
			if(/&fmt=\d+/.test(url)) {
				url = url.replace(/&fmt=\d+/, '');
			}

			url += '&fmt=' + fmt;
		}
		break;
	case GET_VIDEO_INFO:
		url = 'http://www.youtube.com/get_video_info?&video_id='+pid;
		break;
	case GET_VIDEO:
		url = 'http://www.youtube.com/get_video?video_id='+pid+'&t='+token;
		if(fmt) {
			url += '&fmt=' + fmt;
		}
		break;
	case STAT_URL:
		url = 'http://www.youtube.com/watch_ajax?v='+pid+'&action_get_statistics_and_data=1&l=EN';
		break;
	}
	return url;
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

var retry_count = 0;
function WatchOver() {
	var	retry = new Array(0);
	for (var pid in queue) {
		if(queue[pid].stat != STORED_DATA ||
		   queue[pid].stat_detail != STORED_DATA) {
			retry.push(pid);
		}
	}
	if(retry.length > 0) {
		for (var i in retry) {
			var pid = retry[i];
			if(queue[pid].stat != STORED_DATA) {
				queue[pid].stat = NONE;
				QueueControl();
			}
			if(queue[pid].stat_detail != STORED_DATA) {
				queue[pid].stat_detail = NONE;
				QueueControl();
			}
		}
		if(retry_count < custom.max_retry) {
			retry_count++;
			setTimeout(WatchOver, custom.check_interval);
		}
	}
}

var timer_id = 0;

function QueueControl() {
	if(timer_id) clearTimeout(timer_id);
	timer_id = 0;

	var sent = 0;
	var now = (new Date()).getTime();
	for (var pid in queue) {
		if(queue[pid].stat == SENT_REQUEST) {
			if(now - queue[pid].sent_time < custom.queue.max_wait_limit) {
				sent++;
			} else {
				WaitMessage(pid, 0);
				queue[pid].stat = NOT_RECEIVED;
			}
		}
		if(queue[pid].stat_detail == SENT_REQUEST) {
			if(now - queue[pid].sent_time_detail < custom.queue.max_wait_limit) {
				sent++;
			} else {
				queue[pid].stat_detail = NOT_RECEIVED;
			}
		}
	}
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
	if(sent) {
		timer_id = setTimeout(QueueControl, custom.queue.check_interval);
	}

}

function ExtractPid(href) {
	var pid = href.match(/v=(.*)/)[1];
	var p = pid.indexOf('&');
	if(p >= 0) {
		pid = pid.substr(0, p);
	}
	return pid;
}

function NodeInserted() {
	list_page_proc();
}

function list_page_proc() {
	if(anchor_querys.length) {
		for(var i = 0; i < anchor_querys.length; i++) {
			anchor_query = anchor_querys[i];
			added_query = added_querys[i];
			cell_query = cell_querys[i];
			listbox_query = listbox_querys[i];
			AddDownloadLink();
		}
	} else {
		AddDownloadLink();
	}
}

function AddDownloadLink() {
	var q = anchor_query;
	var xp = document.evaluate(q, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(xp.snapshotLength) {

		for (var i=0; i < xp.snapshotLength; i++) {
			var anchor = xp.snapshotItem(i);
			var href = anchor.getAttribute('href');
			var title = anchor.getAttribute('title');
			var pid = ExtractPid(href);
			if(queue[pid]) {
				continue;
			}
			var parent = document.evaluate(added_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var video_cell = document.evaluate(cell_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var list_box = null;
			if(listbox_query) {
				list_box = document.evaluate(listbox_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			}

			var base = document.createElement('div');
			base.setAttribute('style',added_box.base.style);
			Toggle_Listener(false);
		        parent.appendChild(base);
			Toggle_Listener(true);
			queue[pid] = {stat:NONE, stat_detail:NONE, node:base, href: href, title: title};
			queue[pid].parent = parent;
			queue[pid].video_cell = video_cell;
			queue[pid].list_box = list_box;
			queue[pid].offsetHeight = parent.offsetHeight;
			queue[pid].offsetTop = video_cell.offsetTop;
			queue[pid].cell_query = cell_query;
			queue[pid].cell_offsetHeight = video_cell.offsetHeight;
			if(spotlight_query) {
				var spotlight = document.evaluate(spotlight_query, anchor, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if(spotlight) {
					queue[pid].offsetTop = 0;
				}
			}
		}
		QueueControl();

	} else {
		Toggle_Listener(true);
	}
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
	var href = window.location.href;
	var pid = ExtractPid(href);
	watch_page_pid = pid;
	var base = document.createElement('div');
	base.id = added_box_watch.base.base_id;
	base.setAttribute('style',added_box_watch.base.base_style);
	var node = document.getElementById('watch-main-area');
        node.parentNode.insertBefore(base, node);
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
	}
	return str;
}

function ParseVideoDetailWatch(pid) {
	var infoKeys = [
		'embedUrl',
		'embedCode',
		'swfArgs',
		'video_urls_cache',
		'comments',
		'ratings',
		'addedDate',
		'avg_rating',
		'title',
		'fmt_map_cache',
		'fmt_url_map_cache',
		'length_seconds',
		'StatsUrl',
		'video_width',
		'video_height'
		];

	var xp = document.evaluate('//h1/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var title = '';
	if(xp.singleNodeValue) {
		title = xp.singleNodeValue.textContent;
	}

// Adds the download button below the description box
	var	color ="color: "+custom.watch.text_color+";";
	var	bgc ="background-color: "+custom.watch.bg_color+";";

	var	format_style;
	if(queue[pid].status == 'fail') {
		var html = document.getElementsByTagName('html')[0].innerHTML;
		var VideoInfo = ParseSourceXml(html, pid, false);
		for (var i in infoKeys) {
			queue[pid][infoKeys[i]] = VideoInfo[infoKeys[i]];
		}
		format_style = added_box_watch.format.style_2;
	} else {
		format_style = added_box_watch.format.style;
	}
//	queue[pid]['cache'] = false;
	video_urls = queue[pid]['video_urls'];
	if(!video_urls) {
		video_urls = queue[pid]['video_urls_cache'];
//		queue[pid]['cache'] = true;
	}
	for(var fmt in video_format) {
		var download_url = video_urls[fmt];
		var html = '<div id="' + added_box_watch.texttype.div_id + fmt + '" style="display:none;'+added_box_watch.texttype.div_style+'">' +
			'<a id="' + added_box_watch.texttype.anchor_id + fmt + '" href="' + download_url + '" style="' + added_box_watch.texttype.anchor_style + color+bgc+'">DOWNLOAD</a>' +
			'</div>' +
			'<div id="' + added_box_watch.imagetype.div_id + fmt + '" style="display:none;'+added_box_watch.imagetype.div_style+'">' +
			'<a id="' + added_box_watch.imagetype.anchor_id + fmt + '" href="' + download_url + '" style="' + added_box_watch.imagetype.anchor_style + '">' +
			'<img id="' + added_box_watch.imagetype.image_id + fmt + '" border="0" src="' + custom.watch.image_url + '" style="' + added_box_watch.imagetype.image_style + '" />' +
			'</a></div>' +
			'<a id="' + added_box_watch.format.id + fmt + '" href="' + download_url + '" style="' + format_style + '">' +
			AddVideoType(fmt, custom.format_type.watch)+'</a>';

		var	p = document.createElement('div');

		p.innerHTML = html;
		p.id = added_box_watch.base.id + fmt;
		p.setAttribute('style', 'margin-bottom:10px;');
		if(custom.fmt.watch[fmt] == false || !video_urls[fmt]) {
			p.style.display =  'none';
		} else {
			p.style.display =  'block';
		}

		xp = document.evaluate('.//a[@id="'+added_box_watch.texttype.anchor_id + fmt+'"]|.//a[@id="'+added_box_watch.imagetype.anchor_id + fmt+'"]|.//a[@id="'+added_box_watch.format.id + fmt+'"]', p, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		l=xp.snapshotLength;
		for(i = 0; i < l; i++) {
			var node = xp.snapshotItem(i);
			node.setAttribute('fmt',fmt);
			if(title) {
				var filename = ModifyFileName(title, fmt);
				node.setAttribute('title',filename);
				node.setAttribute('filename',filename+custom.extention[video_format[fmt].type]);
			}
		}

	        queue[pid].node.appendChild(p);

	}
	ChangeTypes();
}


// for list page
function GetSetupDataListPage(){
	custom.fmt.list = eval(GM_getValue("download_fmt_list", custom.fmt.list));
	custom.list = eval(GM_getValue("list_page", custom.list));

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
	custom.player = eval(GM_getValue("player", custom.player));
}

function SetSetupDataVideoPanel(){
	GM_setValue("player", uneval(custom.player));
}

// for watch page
function GetSetupDataWatchPage(){
	custom.fmt.watch = eval(GM_getValue("download_fmt_watch", custom.fmt.watch));
	custom.watch = eval(GM_getValue("watch_page", custom.watch));
}

function SetSetupDataWatchPage(){
	GM_setValue("download_fmt_watch", uneval(custom.fmt.watch));
	GM_setValue("watch_page", uneval(custom.watch));
}

// for update check
function GetSetupDataUpdateCheck(){
	update_check = eval(GM_getValue("update_check", update_check));
}

function SetSetupDataUpdateCheck(){
	GM_setValue("update_check", uneval(update_check));
}

// others setup date
function GetSetupDataOthers(){
	custom.queue = eval(GM_getValue("queue", custom.queue));
	custom.format_type = eval(GM_getValue("format_type", custom.format_type));
}

function SetSetupDataOthers(){
	GM_setValue("queue", uneval(custom.queue));
	GM_setValue("format_type", uneval(custom.format_type));
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

		SetSetupDataVersion()
		SetSetupDataListPage();
		SetSetupDataWatchPage();
		SetSetupDataVideoPanel();
		SetSetupDataOthers();
		DeleteOldData(0);
	}
}

function DeleteOldData(old_version) {
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
	GetSetupDataListPage();
	GetSetupDataVideoPanel();
	GetSetupDataWatchPage();
	GetSetupDataUpdateCheck();
	GetSetupDataOthers();

// Add menu
	GM_registerMenuCommand( "----Descargar vídeo from YouTube----", Nop);
	GM_registerMenuCommand( "Set up this script(YouTube)", Setup);
	GM_registerMenuCommand( "Update video informations(YouTube)", Update_List_Page);

// for update check
	UpdateCheck(false);
}

var	videoInfo = {};

function GetTitle(div) {
	var xp = document.evaluate('.//h1/text()', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(xp) {
		return xp.singleNodeValue.textContent;
	}
	return '';
}

function GetEmbedUrl(text) {
	var p = text.indexOf('embedUrl');
	if(p > 0) {
		text = text.substr(p);
	} else {
		return "";
	}
	p = text.indexOf("http:");
	if(p > 0) {
		text = text.substr(p);
	} else {
		return "";
	}
	p = text.indexOf("';");
	if(p > 0) {
		text = text.substr(0,p);
	} else {
		return "";
	}
	return decodeURIComponent(text);
}

function GetFlashArgs(text) {
	var p = text.indexOf('swfArgs');
	if(p > 0) {
		text = text.substr(p);
	} else {
		return "";
	}
	p = text.indexOf('{"');
	if(p > 0) {
		text = text.substr(p);
	} else {
		return "";
	}
	p = text.indexOf('"};');
	if(p > 0) {
		text = text.substr(0,p+2);
	} else {
		return "";
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
	var xp = document.evaluate('.//span[@class="watch-video-added post-date"]/text()', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(xp.singleNodeValue) {
		var text = xp.singleNodeValue.textContent;
		return text;
	}
	return '';
}

function GetComments(div) {
	var xp = document.evaluate('.//div[@id="watch-comment-panel"]//span[@class="expander-head-stat"]/text()', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(xp.singleNodeValue) {
		var work = xp.singleNodeValue.textContent.match(/\(([\d|,]*)\)/);
		if(work) {
			return work[1];
		}
	}
	return '';
}

function GetRating(div) {
	var xp = document.evaluate('.//div[@id="defaultRatingMessage"]/span[@class="smallText"]/text()', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(xp.singleNodeValue) {
		var work = xp.singleNodeValue.textContent.match(/([\d|,]*)\s.+/);
		if(work) {
			return work[1];
		}
	}
	return '';
}

function GetAverage(div) {
	var xp = document.evaluate('.//td[@class=watch-stats-sparkline-title" and contains(text(), "Average")', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if(xp.singleNodeValue) {
		var work = xp.singleNodeValue.textContent.match(/Average Rating:\s([0-9\.]+)/);
		if(work) {
			return work[1];
		}
	}
	return '';
}

// Parse source xml
function ParseSourceXml(text, pid, error_response)
{
	var videoInfo = new Array();
	var video_urls = new Array();
	if(error_response == true) {
		videoInfo['title'] = queue[pid]['title'];
		videoInfo['embedUrl'] = "";
		videoInfo['swfArgs'] = "";
		videoInfo['fmt_map_cache'] = "";
		videoInfo['fmt_url_map_cache'] = "";
		videoInfo['length_seconds'] = "";
		videoInfo['token_cache'] = "";
		videoInfo['comments'] = "";
		videoInfo['ratings'] = "";
		for(var fmt in video_format) {
			video_urls['fmt_'+ fmt] = "";
		}
		videoInfo['video_urls_cache'] = video_urls;

		videoInfo['addedDate'] = "";
		videoInfo['embedCode'] = "18+ video";
		videoInfo['watchable'] = false;
		videoInfo['video_width'] = "";
		videoInfo['video_height'] = "";
		return videoInfo;
	}
	var div = document.createElement('div');
	div.innerHTML = text;

	videoInfo['title'] = GetTitle(div);
	videoInfo['embedUrl'] = GetEmbedUrl(text);
	var swfArgs = GetFlashArgs(text);
	videoInfo['swfArgs'] = eval( '('+swfArgs+')');
	videoInfo['fmt_map_cache'] = decodeURIComponent(videoInfo['swfArgs']['fmt_map']);
	videoInfo['fmt_url_map_cache'] = decodeURIComponent(videoInfo['swfArgs']['fmt_url_map']);
	videoInfo['length_seconds'] = decodeURIComponent(videoInfo['swfArgs']['length_seconds']);


	var pid = videoInfo['swfArgs']['video_id'];
	var fmt_url_map = videoInfo['fmt_url_map_cache'].split(',');
	var token = videoInfo['swfArgs']['t'];
	videoInfo['token_cache'] = token;
	for(var i in fmt_url_map) {
		var videos = fmt_url_map[i];
		var fmt = videos.match(/(\d+)\|/)[1];
		video_urls['fmt_'+ fmt] = buildURL(pid, GET_VIDEO, fmt, token);
	}
	video_urls['fmt_18'] = buildURL(pid, GET_VIDEO, 18, token);

	videoInfo['video_urls_cache'] = video_urls;
	videoInfo['comments'] = GetComments(div);
	videoInfo['ratings'] = GetRating(div);

	videoInfo['addedDate'] = GetAddedDate(div);
	videoInfo['embedCode'] = GetEmbedCode(div);
	videoInfo['watchable'] = true;
	if(videoInfo['embedCode'] == 'Embedding disabled by request') {
		videoInfo['watchable'] = false;

	}
	videoInfo['video_width'] = DEFAULT_PLAYER_WIDTH;
	videoInfo['video_height'] = DEFAULT_PLAYER_HEIGHT;
//	if(videoInfo['embedCode']) {
//		div.innerHTML = videoInfo['embedCode'];
//		var embed = div.firstChild;
//		videoInfo['video_width'] = embed.getAttribute('width');
//		videoInfo['video_height'] = embed.getAttribute('height');
//	}

	return videoInfo;

}

function GetVideoInformation(pid) {
	var url = buildURL(pid, WATCH_URL, 22);
	pidmap[url] = pid;

	var infoKeys = [
		'embedUrl',
		'embedCode',
		'swfArgs',
		'video_urls_cache',
		'comments',
		'ratings',
		'addedDate',
		'avg_rating',
		'title',
		'fmt_map_cache',
		'fmt_url_map_cache',
		'token_cache',
		'length_seconds',
		'StatsUrl',
		'video_width',
		'video_height',
		'watchable',
		];

	setTimeout(function(){
		queue[pid].stat = SENT_REQUEST;
		queue[pid].sent_time = (new Date()).getTime();
		WaitMessage(pid, 1);
		GM_xmlhttpRequest({
			method:"GET",
			url: url,
			headers:{
				"User-Agent": window.navigator.userAgent,
				"Accept":"*/*",
				"Accept-Language":"en-us"
			},
			onload: function(xhr){
				var text = xhr.responseText;
				var pid = '';
				var finalUrl = xhr.finalUrl;
				var error_response = false;
				var p = finalUrl.indexOf('/verify_age?');
				if(p >= 0) {
					error_response = true;
					finalUrl = decodeURIComponent(finalUrl);
				}
				var work = finalUrl.match(/v=(.*)/);
				if(work) {
					pid = work[1];
				}
				if(!pid) {
					pid = pidmap[xhr.finalUrl];
				}
				if(pid) {
					var p = pid.indexOf('&');
					if(p >= 0) {
						pid = pid.substr(0, p);
					}
				}
				if(!pid) {
					GM_log('HTTP response data error:'+finalUrl);
					QueueControl();
					return;
				}
				queue[pid].stat = RECEIVED_RESPONSE;
				if ( xhr.status != 200 ) {	// failed
					GM_log('HTTP status:'+xhr.status);
					WaitMessage(pid, xhr.status);
					QueueControl();
					return;
				}
				var VideoInfo = ParseSourceXml(text, pid, error_response);
				for (var i in infoKeys) {
					queue[pid][infoKeys[i]] = VideoInfo[infoKeys[i]];
				}
				queue[pid].stat = STORED_DATA;
				WaitMessage(pid, 0);
				AddMetaData(pid);
				GetVideoDetailInformation(pid);
				QueueControl();
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
			if(queue[wpid].stat != STORED_DATA ||
			   queue[wpid].stat_detail != STORED_DATA) {
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
			if(cell_calc_type == CELL_HEIGHT_CALC) {
				queue[work[wpid]].node.parentNode.style.height = height+'px';
				queue[work[wpid]].video_cell.style.height = height+'px';
			} else {
				queue[work[wpid]].node.parentNode.style.height = 'auto';
			}
		}
	}

	if(!queue[pid].offsetTop) {
		if(cell_calc_type == CELL_HEIGHT_CALC) {
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
		if(cell_calc_type == CELL_HEIGHT_CALC) {
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
			div.innerHTML = 'Espere!';
			div.setAttribute('style', added_box.meta.wait_style);
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
		download.innerHTML = 'Descargar '+AddVideoType(fmt, custom.format_type.list)+'<br />';
		var style = added_box.download.style;
		if(queue[pid]['cache']) {
			style = added_box.download.style_2;
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
		info += "Comentarios :"+queue[pid]['comments'] +"<br />";
	}
	if(custom.list.ratings && queue[pid]['ratings']) {
		info += "Puntuaciones :"+queue[pid]['ratings'];
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

	if(custom.list.addedDate || custom.list.comments || custom.list.ratings || custom.list.avg_rating || custom.list.favorites) {
		div.setAttribute('style',added_box.meta.style + styles.block_open);
	} else {
		div.setAttribute('style',added_box.meta.style + styles.close);
	}

// Add watch button
	var id = added_box.watch.id + pid;
	var watch_button = document.getElementById(id);
	if(!watch_button) {
		if(queue[pid].status == 'fail' || queue[pid].watchable == false) {
			watch_button = document.createElement('div');
			watch_button.id = id;
			watch_button.innerHTML = queue[pid]['embedCode'];
		} else {
			watch_button = document.createElement('input');
			watch_button.type = 'button';
			watch_button.setAttribute("pid", pid);
			watch_button.id = id;
			watch_button.value = 'Ver vídeo';
			watch_button.addEventListener("click",function(e) {
					WatchVideo(this.id);
				},false);
		}
		if(queue[pid].node) queue[pid].node.appendChild(watch_button);
	}

	if(custom.list.watch_button) {
		if(queue[pid].status == 'fail' || queue[pid].watchable == false) {
			watch_button.setAttribute('style',added_box.watch.error_style + styles.block_open);
		} else
		if(queue[pid]['cache']) {
			watch_button.setAttribute('style',added_box.watch.style + styles.close);
		} else {
			watch_button.setAttribute('style',added_box.watch.style + styles.block_open);
		}
	} else {
		watch_button.setAttribute('style',added_box.watch.style + styles.close);
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

	if(custom.player.auto_resize == true &&
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
		height += embed.offsetTop;
		width += parseInt(embed.width);
//		width += embed.offsetLeft;
	} else {
		if(custom.player.player_height) {
			embed.height = custom.player.player_height;
			height += custom.player.player_height;
			height += embed.offsetTop;
		}
		if(custom.player.player_width) {
			embed.width = custom.player.player_width;
			width += custom.player.player_width;
//			width += embed.offsetLeft;
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
	var ext = custom.extention[video_format[fmt].type];
	if(video_panel.download.type == 'button') {
		download_button.value = 'Descargar vídeo('+ext.substr(1)+')';
	} else {
		download_button.href = url;
		download_button.innerHTML = 'Descargar vídeo('+ext.substr(1)+')';
	}
	var filename = ModifyFileName(queue[pid]['title'], fmt);
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
	var embedUrl = queue[pid]['embedUrl'];
	if(custom.player.autoplay == true) {
		embedUrl += "&autoplay=1";
	}
	div.innerHTML = '<embed src="'+embedUrl+'" allowfullscreen="true" allowScriptAccess="always" height="" width="" type="application/x-shockwave-flash">';
	div.firstChild.setAttribute('pid',pid);
	div.firstChild.setAttribute('id',video_panel.player.id);
	div.firstChild.setAttribute('style',video_panel.player.style);
	div.setAttribute('style', video_panel.box.style);

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
	title.setAttribute('style', video_panel.title.style);
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
	sel_box.setAttribute('style', video_panel.sel_box.style);

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
	var ext = custom.extention[video_format[fmt].type];
	if(video_panel.download.type == 'button') {
		download_button.value = 'Descargar vídeo('+ext.substr(1)+')';
		download_button.setAttribute('href',video_urls[fmt]);
	} else {
		download_button.href = video_urls[fmt];
		download_button.innerHTML = 'Descargar vídeo('+ext.substr(1)+')';
	}
	download_button.setAttribute('fmt',fmt);
	var filename = ModifyFileName(queue[pid]['title'], fmt);
	download_button.setAttribute('title',filename);
	download_button.setAttribute('filename',filename+custom.extention[video_format[fmt].type]);
	download_button.setAttribute('style', video_panel.download.style);
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
		close_button.setAttribute('style', video_panel.close.style);
		div.appendChild(close_button);
		close_button.addEventListener("click",CloseVideoPanel,false);
	}

	id = video_panel.status_bar.id;
	var status_bar = document.getElementById(id);
	if(!status_bar) {
		status_bar = document.createElement('div');
		status_bar.innerHTML = '';
		status_bar.id = id;
		status_bar.setAttribute('style', video_panel.status_bar.style);
		div.appendChild(status_bar);
	}

	id = video_panel.resize.id;
	var resize_box = document.getElementById(id);
	if(!resize_box) {
		resize_box = document.createElement('div');
		resize_box.innerHTML = "";
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
			lock_button.value = 'Bloquear';
		} else {
			lock_button.value = 'Desbloquear';
		}
		lock_button.id = id;
		lock_button.setAttribute('style', video_panel.lock.style);
		div.appendChild(lock_button);
		lock_button.addEventListener("click",function(e) {
			var div = document.getElementById(video_panel.box.id);
			var btn = document.getElementById(video_panel.lock.id);
			if(!player_locked) {
				player_locked = true;
				setDragObject(null);
				btn.value = 'Desbloquear';
				GetWatchBoxPosition();
				div.style.cursor = 'auto';
			} else {
				player_locked = false;
				setDragObject(div);
				btn.value = 'Bloquear';
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
	var status = "Resolución: "+queue[pid].video_width+"x"+queue[pid].video_height;
	var ratio = Math.round(queue[pid].video_width/queue[pid].video_height * 1000)/1000;
	status += " Ratio: "+ratio;
	status += " Tamaño del reproductor: "+embed.width+"x"+embed.height;
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
	setDragObject(null);
}

function Update_List_Page() {
	if(custom.list.watch_button || custom.list.download_link || custom.list.addedDate || custom.list.comments || 
	   custom.list.ratings || custom.list.avg_rating || custom.list.favorites) {
		need_information = true;
	}
	for (var pid in queue) {
		if(queue[pid].stat != STORED_DATA ||
		   queue[pid].stat_detail != STORED_DATA) {
			if(need_information) {
				QueueControl();
			}
		} else {
			WaitMessage(pid, 0);
			AddMetaData(pid);
		}
	}
	var	div = document.getElementById(video_panel.box.id);
	if(div) {
		setEmbedSize(div);
	}
}

function Update_Watch_Page() {
	ChangeTypes();
}

// Enable or disable download link
function ChangeTypes() {
	var pid = watch_page_pid;
	for(var fmt in video_format) {
		ChangeType(pid, fmt);
	}
}

function ChangeType(pid, fmt) {
	var	textlink = document.getElementById(added_box_watch.texttype.div_id+fmt);
	var	anchorlink = document.getElementById(added_box_watch.texttype.anchor_id+fmt);
	var	imagelink = document.getElementById(added_box_watch.imagetype.div_id+fmt);
	var	image_url_link = document.getElementById(added_box_watch.imagetype.image_id);
	var	color = '';
	if(custom.watch.text_color) {
		color ="color: "+custom.watch.text_color+";";
	}
	var	bgc = '';
	if(custom.watch.bg_color) {
		bgc ="background-color: "+custom.watch.bg_color+";";
	}
	if(custom.watch.disp_type == TEXT_TYPE) {	// Text type
		imagelink.style.display = "none";	// disable image link
		textlink.style.display = "inline";	// enable text link
		anchorlink.setAttribute('style',added_box_watch.texttype.anchor_style + color + bgc);
	} else {	// Image type
		textlink.style.display = "none";	// disable text link
		imagelink.style.display = "block";	// enable image link
		image_url_link.src = custom.watch.image_url;
	}
	var node = document.getElementById(added_box_watch.base.id + fmt);
	if(node) {
		var video_urls = queue[pid]['video_urls'];
		if(!video_urls) {
			video_urls = queue[pid]['video_urls_cache'];
		}
		if(custom.fmt.watch[fmt] == false || !video_urls[fmt]) {
			node.style.display = 'none';
		} else {
			node.style.display = 'block';
		}
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
	var update_html = Make_Html_For_Update_Checker();

	var html = ''+
		'<div style="'+setup_box.base.title_style+'">Set up</div>' +
		'<hr style="'+setup_box.base.hr_style+'" />'+
		'<div style="'+setup_box.base.tabs_style+'">' +
		'<ul style="'+setup_box.base.ul_style+'">' +
		'<li id="'+setup_box.tabs.list.id+'" style="'+setup_box.tabs.list.style_active+'">List<br />page</li>' +
		'<li id="'+setup_box.tabs.video.id+'" style="'+setup_box.tabs.video.style+'">Video<br />panel</li>' +
		'<li id="'+setup_box.tabs.watch.id+'" style="'+setup_box.tabs.watch.style+'">Watch<br />page</li>' +
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
	var update_tab = document.getElementById(setup_box.tabs.update.id);

	list_tab.setAttribute('stat', 'on');
	video_tab.setAttribute('stat', 'off');
	watch_tab.setAttribute('stat', 'off');
	update_tab.setAttribute('stat', 'off');

	list_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);
	video_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);
	watch_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);
	update_tab.addEventListener("click", function(e) {TabClicked(this.id);}, false);


	Setup_List_Page();
	Setup_Video_Panel();
	Setup_Watch_Page();
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
		return false;
	}
	if(Check_Options_Video_Panel() == false) {
		alert("The setting of Video panel is invalid");
		return false;
	}
	if(Check_Options_Watch_Page() == false) {
		alert("The setting of Watch page is invalid");
		return false;
	}

	if(Check_Options_Update_Checker() == false) {
		alert("The setting of Update checker is invalid");
		return false;
	}

	SetSetupDataVersion();
	Save_Options_List_Page();
	Save_Options_Video_Panel();
	Save_Options_Watch_Page();
	Save_Options_Update_Checker();
	Save_Options_Others();

	Close_Box();

	if(watch_page == true) {
		Update_Watch_Page();
	}
	Update_List_Page();

}

function Make_Html_For_List_Page() {
	var html = ''+
		'<ul style="'+setup_box.list.ul_style+'"><b>About adding link and button</b><br />' +
		'<li style="'+setup_box.list.download_link_style+'"><input type="checkbox" id="'+setup_box.list.download_link_id+'">Download link</li>' +
		'<ul style="'+setup_box.list.ul_style+'">' +
		'<li style="'+setup_box.list.fmt_type_style+'">';

	var count = 0;
	for(var fmt in video_format) {
		html += '<input type="checkbox" id="'+setup_box.list.fmt_id+'_'+fmt+'">'+AddVideoType(fmt, FT_WITH_FMT_STR_NO);
		count++;
		if((count%3) == 0) html += "<br />";
	}
	html += '</li></ul></li>' +
		'<li style="'+setup_box.list.watch_button_style+'"><input type="checkbox" id="'+setup_box.list.watch_button_id+'">Watch button</li>' +
		'</ul>'+
		'<br />'+
		'<ul style="'+setup_box.list.ul_style+'"><b>About adding video informations</b><br />' +
		'<li style="'+setup_box.list.addedDate_style+'"><input type="checkbox" id="'+setup_box.list.addedDate_id+'">Uploaded</li>' +
		'<li style="'+setup_box.list.comments_style+'"><input type="checkbox" id="'+setup_box.list.comments_id+'">Comments</li>' +
		'<li style="'+setup_box.list.ratings_style+'"><input type="checkbox" id="'+setup_box.list.ratings_id+'">Ratings' +
		'<input type="checkbox" id="'+setup_box.list.avg_rating_id+'">Average</li>' +
//		'<li style="'+setup_box.list.favorites_style+'"><input type="checkbox" id="'+setup_box.list.favorites_id+'">Favorites</li>' +
		'</ul>'+
		'';

	return html;
}

function Setup_List_Page() {

	var node;
	custom.list.download_link = false;
	for(var fmt in custom.fmt.list) {
		node = document.getElementById(setup_box.list.fmt_id+"_"+fmt);
		node.setAttribute('style',setup_box.checkbox.style);
		node.checked = custom.fmt.list[fmt];
		if(node.checked == true) custom.list.download_link = true;
	}
	node = document.getElementById(setup_box.list.download_link_id);
	node.setAttribute('style',setup_box.checkbox.style);
	node.checked = custom.list.download_link;
	node.disabled = true;


	node = document.getElementById(setup_box.list.addedDate_id);
	node.setAttribute('style',setup_box.checkbox.style);
	node.checked = custom.list.addedDate;

	node = document.getElementById(setup_box.list.comments_id);
	node.setAttribute('style',setup_box.checkbox.style);
	node.checked = custom.list.comments;

//	node = document.getElementById(setup_box.list.favorites_id);
//	node.setAttribute('style',setup_box.checkbox.style);
//	node.checked = custom.list.favorites;

	node = document.getElementById(setup_box.list.ratings_id);
	node.setAttribute('style',setup_box.checkbox.style);
	node.checked = custom.list.ratings;
	node.addEventListener("click", function(e) {
		var checked = this.checked;
		var node = document.getElementById(setup_box.list.avg_rating_id);
		if(checked) node.disabled = false;
		else node.disabled = true;
		}, false);

	node = document.getElementById(setup_box.list.avg_rating_id);
	node.setAttribute('style',setup_box.checkbox.style);
	node.checked = custom.list.avg_rating;
	if(custom.list.ratings) {
		node.disabled = false;
	} else {
		node.disabled = true;
	}

	node = document.getElementById(setup_box.list.watch_button_id);
	node.setAttribute('style',setup_box.checkbox.style);
	node.checked = custom.list.watch_button;

}

function Check_Options_List_Page() {
	return true;
}

function Save_Options_List_Page() {
	custom.list.watch_button = document.getElementById(setup_box.list.watch_button_id).checked;
//	custom.list.download_link = document.getElementById(setup_box.list.download_link_id).checked;
	custom.list.addedDate = document.getElementById(setup_box.list.addedDate_id).checked;
	custom.list.comments = document.getElementById(setup_box.list.comments_id).checked;
//	custom.list.favorites = document.getElementById(setup_box.list.favorites_id).checked;
	custom.list.ratings = document.getElementById(setup_box.list.ratings_id).checked;
	custom.list.avg_rating = document.getElementById(setup_box.list.avg_rating_id).checked;
	custom.list.download_link = false;
	for(var fmt in custom.fmt.list) {
		custom.fmt.list[fmt] = document.getElementById(setup_box.list.fmt_id+"_"+fmt).checked;
		if(custom.fmt.list[fmt] == true) custom.list.download_link = true;
	}

	SetSetupDataListPage();
}

function Make_Html_For_Video_Panel() {
	var html = ''+
		'<ul style="'+setup_box.video.ul_style+'"><b>About watching video</b><br />' +
		'<li style="'+setup_box.video.autoplay_style+'"><input type="checkbox" id="'+setup_box.video.autoplay_id+'">Autoplay</li>' +
		'<li style="'+setup_box.video.auto_resize_style+'"><input type="checkbox" id="'+setup_box.video.auto_resize_id+'">Auto Resize</li>' +
//		'<li style="'+setup_box.video.lock_ratio_style+'"><input type="checkbox" id="'+setup_box.video.lock_ratio_id+'">Lock aspect ratio</li>'+
		'<li style="'+setup_box.video.width_style+'">Player width <input type="text" id="'+setup_box.video.width_id+'" size="4" value="'+custom.player.player_width+'"> px' +
		'</li>'+
		'<li style="'+setup_box.video.height_style+'">Player height<input type="text" id="'+setup_box.video.height_id+'" size="4" value="'+custom.player.player_height+'"> px' +
		'</li>'+
		'<li style="'+setup_box.video.min_width_style+'">Useful range (width) <input type="text" id="'+setup_box.video.min_width_id+'" size="4" value="'+custom.player.min_width+'"> - '+
		'<input type="text" id="'+setup_box.video.max_width_id+'" size="4" value="'+custom.player.max_width+'"> px</li>'+
		'<li style="'+setup_box.video.min_height_style+'">Useful range (height) <input type="text" id="'+setup_box.video.min_height_id+'" size="4" value="'+custom.player.min_height+'"> - '+
		'<input type="text" id="'+setup_box.video.max_height_id+'" size="4" value="'+custom.player.max_height+'"> px</li>'+
		'</ul>'+
		'';

	return html;
}

function Setup_Video_Panel() {

	var node;
	node = document.getElementById(setup_box.video.autoplay_id);
	node.setAttribute('style',setup_box.checkbox.style);
	node.checked = custom.player.autoplay;

	node = document.getElementById(setup_box.video.auto_resize_id);
	node.setAttribute('style',setup_box.checkbox.style);
	node.checked = custom.player.auto_resize;

//	node = document.getElementById(setup_box.video.lock_ratio_id);
//	node.setAttribute('style',setup_box.checkbox.style);
//	node.checked = custom.player.lock_ratio;

	node = document.getElementById(setup_box.video.width_id);
	node.setAttribute('style',setup_box.textbox.style);
	node.value = custom.player.player_width;

	node = document.getElementById(setup_box.video.height_id);
	node.setAttribute('style',setup_box.textbox.style);
	node.value = custom.player.player_height;

	node = document.getElementById(setup_box.video.min_width_id);
	node.setAttribute('style',setup_box.textbox.style);
	node.value = custom.player.min_width;

	node = document.getElementById(setup_box.video.min_height_id);
	node.setAttribute('style',setup_box.textbox.style);
	node.value = custom.player.min_height;

	node = document.getElementById(setup_box.video.max_width_id);
	node.setAttribute('style',setup_box.textbox.style);
	node.value = custom.player.max_width;

	node = document.getElementById(setup_box.video.max_height_id);
	node.setAttribute('style',setup_box.textbox.style);
	node.value = custom.player.max_height;

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
	custom.player.min_width = parseInt(document.getElementById(setup_box.video.min_width_id).value);
	custom.player.min_height = parseInt(document.getElementById(setup_box.video.min_height_id).value);
	custom.player.max_width = parseInt(document.getElementById(setup_box.video.max_width_id).value);
	custom.player.max_height = parseInt(document.getElementById(setup_box.video.max_height_id).value);

	SetSetupDataVideoPanel();
}

function Make_Html_For_Watch_Page() {
	var html = ''+
		'<ul style="'+setup_box.watch.ul_style+'"><b>About DOWNLOAD button</b><br />' +
		'<li style="'+setup_box.watch.disp_type_style+'"><input type="radio" name="'+setup_box.watch.disp_type_name+'" id="'+setup_box.watch.text_type_id+'" value="0">Text type' +
		'</li>'+
		'<ul style="'+setup_box.watch.ul_style+'">' +
		'<li style="'+setup_box.watch.text_color_style+'">Text color <input type="text" id="'+setup_box.watch.text_color_id+'" value="'+custom.watch.text_color+'">' +
		'</li>'+
		'<li style="'+setup_box.watch.bg_color_style+'">Backgroud color <input type="text" id="'+setup_box.watch.bg_color_id+'" value="'+custom.watch.bg_color+'">' +
		'</li>'+
		'</ul>'+
		'<li style="'+setup_box.watch.disp_type_style+'">'+
		'<input type="radio" name="'+setup_box.watch.disp_type_name+'" id="'+setup_box.watch.image_type_id+'" value="1">Image type' +
		'</li>'+
		'<ul style="'+setup_box.watch.ul_style+'">' +
		'<li style="'+setup_box.watch.image_url_style+'">URL <input type="text" id="'+setup_box.watch.image_url_id+'" size="50" value="'+custom.watch.image_url+'">' +
		'<br />'+
		'</li>'+
		'</ul>'+
		'</ul>'+
		'<br />'+
		'<ul style="'+setup_box.watch.ul_style+'"><b>About video type for downloading</b><br />' +
		'<li style="'+setup_box.watch.fmt_type_style+'">' +
		'';

	var count = 0;
	for(var fmt in video_format) {
		html += '<input type="checkbox" id="'+setup_box.watch.fmt_id+'_'+fmt+'">'+AddVideoType(fmt, FT_WITH_FMT_STR_NO);
		count++;
		if((count%3) == 0) html += "<br />";
	}
	html += '</li></ul>' +
		'';

	return html;
}

function Setup_Watch_Page() {

	var node;
	if(custom.watch.disp_type == TEXT_TYPE) {
		node = document.getElementById(setup_box.watch.text_type_id);
		node.setAttribute('style',setup_box.watch.text_type_style);
		node.checked = true;
		node = document.getElementById(setup_box.watch.image_type_id);
		node.setAttribute('style',setup_box.watch.image_type_style);
	} else {
		node = document.getElementById(setup_box.watch.image_type_id);
		node.setAttribute('style',setup_box.watch.image_type_style);
		node.checked = true;
		node = document.getElementById(setup_box.watch.text_type_id);
		node.setAttribute('style',setup_box.watch.text_type_style);
	}

	node = document.getElementById(setup_box.watch.text_color_id);
	node.setAttribute('style',setup_box.textbox.style);

	node = document.getElementById(setup_box.watch.bg_color_id);
	node.setAttribute('style',setup_box.textbox.style);

	node = document.getElementById(setup_box.watch.image_url_id);
	node.setAttribute('style',setup_box.textbox.style);

	for(var fmt in custom.fmt.watch) {
		node = document.getElementById(setup_box.watch.fmt_id+"_"+fmt);
		node.setAttribute('style',setup_box.checkbox.style);
		node.checked = custom.fmt.watch[fmt];
	}

}

function Check_Options_Watch_Page() {
	var image_url = document.getElementById(setup_box.watch.image_url_id).value;
	var node = document.getElementById(setup_box.watch.image_type_id);
	if(node.checked && !image_url) {
		return false;
	}
	return true;
}

function Save_Options_Watch_Page() {
	var node = document.getElementById(setup_box.watch.image_type_id);
	if(node.checked) {
		custom.watch.disp_type = IMAGE_TYPE;
	} else {
		custom.watch.disp_type = TEXT_TYPE;
	}
	custom.watch.text_color = document.getElementById(setup_box.watch.text_color_id).value;
	custom.watch.bg_color = document.getElementById(setup_box.watch.bg_color_id).value;
	custom.watch.image_url = document.getElementById(setup_box.watch.image_url_id).value;

	for(var fmt in custom.fmt.watch) {
		custom.fmt.watch[fmt] = document.getElementById(setup_box.watch.fmt_id+"_"+fmt).checked;
	}

	SetSetupDataWatchPage();
}

function Save_Options_Others() {
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
		'fmt_map',
		'fmt_url_map',
		'token',
		'avg_rating',
		'video_id',
		'status',
		'errorcode',
		'reason',
		];
	var decodeKeys = [
		'reason',
		'fmt_map',
		'fmt_url_map',
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
				var pid = video_id;
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
					} else {
						ParseVideoDetailWatch(pid);
					}
					return;
				}
				if(queue[pid]['fmt_url_map']) {
					var fmt_url_map = queue[pid]['fmt_url_map'].split(',');
					queue[pid].video_urls = new Array();
					var token = queue[pid].token;
					for(var i in fmt_url_map) {
						var videos = fmt_url_map[i];
						var fmt = videos.match(/(\d+)\|/)[1];
						queue[pid].video_urls['fmt_'+ fmt] = buildURL(pid, GET_VIDEO, fmt, token);
					}
					queue[pid].video_urls['fmt_18'] = buildURL(pid, GET_VIDEO, 18, token);
				}
				queue[pid].stat_detail = STORED_DATA;
				if(watch_page == false || pid != watch_page_pid){
					WaitMessage(pid, 0);
					AddMetaData(pid);
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

	var node = document.evaluate('//h1[@class="title"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(node) {
		data.title = node.textContent;
	}

	var node = document.evaluate('//td[@id="summary"]', div, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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
	base.id = "USO_USER_SCRIPT_UPDATE_CHECK_"+THIS_SCRIPT_NO;
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
			var id = "USO_USER_SCRIPT_UPDATE_CHECK_"+THIS_SCRIPT_NO;
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

	var node;
	node = document.getElementById(setup_box.update.no_check_id);
	node.setAttribute('style',setup_box.radio.style);
	if(update_check.type == NO_CHECK) {
		node.checked = true;
	}
	node = document.getElementById(setup_box.update.every_loading_id);
	node.setAttribute('style',setup_box.radio.style);
	if(update_check.type == EVERY_LOADING) {
		node.checked = true;
	}
	node = document.getElementById(setup_box.update.once_a_day_id);
	node.setAttribute('style',setup_box.radio.style);
	if(update_check.type == ONCE_A_DAY) {
		node.checked = true;
	}
	node = document.getElementById(setup_box.update.once_a_week_id);
	node.setAttribute('style',setup_box.radio.style);
	if(update_check.type == ONCE_A_WEEK) {
		node.checked = true;
	}
	node = document.getElementById(setup_box.update.once_a_month_id);
	node.setAttribute('style',setup_box.radio.style);
	if(update_check.type == ONCE_A_MONTH) {
		node.checked = true;
	}

	node = document.getElementById(setup_box.update.any_day_id);
	node.setAttribute('style',setup_box.radio.style);
	if(update_check.specified_day == ANY_DAY) {
		node.checked = true;
	}
	node = document.getElementById(setup_box.update.sunday_id);
	node.setAttribute('style',setup_box.radio.style);
	if(update_check.specified_day == SUNDAY) {
		node.checked = true;
	}
	node = document.getElementById(setup_box.update.monday_id);
	node.setAttribute('style',setup_box.radio.style);
	if(update_check.specified_day == MONDAY) {
		node.checked = true;
	}
	node = document.getElementById(setup_box.update.tuesday_id);
	node.setAttribute('style',setup_box.radio.style);
	if(update_check.specified_day == TUESDAY) {
		node.checked = true;
	}
	node = document.getElementById(setup_box.update.wednesday_id);
	node.setAttribute('style',setup_box.radio.style);
	if(update_check.specified_day == WEDNESDAY) {
		node.checked = true;
	}
	node = document.getElementById(setup_box.update.thursday_id);
	node.setAttribute('style',setup_box.radio.style);
	if(update_check.specified_day == THURSDAY) {
		node.checked = true;
	}
	node = document.getElementById(setup_box.update.friday_id);
	node.setAttribute('style',setup_box.radio.style);
	if(update_check.specified_day == FRIDAY) {
		node.checked = true;
	}
	node = document.getElementById(setup_box.update.saturday_id);
	node.setAttribute('style',setup_box.radio.style);
	if(update_check.specified_day == SATURDAY) {
		node.checked = true;
	}

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
