// ==UserScript==
// @name          Культура людям
// @namespace     http://userscripts.org
// @description   Добавляет на страницы с видео кнопку «Скачать»
// @author        sainaen
// @version       0.1.0
// @include       http://tvkultura.ru/video/show/brand_id/*/video_id/*
// @match         http://tvkultura.ru/video/show/brand_id/*/video_id/*
// @run-at        document-end
// ==/UserScript==
//

function grab_url () {
	// should not search for 'iframe' itself, because it's causing
	// error in console: "Blocked a frame with origin..."
	var player = document.querySelector(".p-pvideo-player");
	return player.children[0].src;
}

function parse_url (url) {
	var sid_pattern = /^.*\/sid\/(\w+)(?:\/.*)$/;
	var video_id_pattern = /^.*\/video_id\/(\d+)(?:\/.*)$/;

	var params = {};
	// it seems sid should be always "vh" to download it properly
	// with the right one file has zero size
	// params.sid = sid_pattern.test(url) ? url.match(sid_pattern)[1] : "vh";
	params.sid = "vh";
	params.vid = url.match(video_id_pattern)[1];
	params.vid_1 = params.vid.substr(0,3);
	params.vid_2 = params.vid.substr(3);

	return params;
}

function make_dl_url (params) {
	var name_pattern = /\{\{(\w+)\}\}/;

	var dl_url = "http://cdn.v.rtr-vesti.ru/_cdn_auth/secure/v/{{sid}}/mp4/high/{{vid_1}}/{{vid_2}}.mp4?auth=vh&vid={{vid}}";
	return dl_url.replace(/\{\{\w+\}\}/g, function (val) {
		var name = val.match(name_pattern)[1];
		return params[name];
	});
}

function grab_title () {
	var title = document.querySelector("head title");
	return title.innerText;
}

function make_file_name (title) {
	var fname = title;

	// remove slashes
	fname = fname.replace(/\//g, "-");
	// remove double quotes
	fname = fname.replace(/\"/g, "'");
	// remove question marks
	fname = fname.replace(/\?/g, " ");

	return fname + ".mp4";
}

function add_style () {
	var styles =
		".video-dl {"
		+ "    float: right;"
		+ "    margin-left: 5px;"
		+ "    padding: 9px 11px;"
		+ "    width: 133px;"
		+ "    height: 32px;"
		+ "    background: url(../i/el/lined_bg-light.png) left top repeat;"
		+ "    text-transform: uppercase;"
		+ "}"
		+ ".video-dl-btn {"
		+ "    display: table-cell;"
		+ "    width: 133px;"
		+ "    height: 32px;"
		+ "    border-radius: 4px;"
		+ "    background: linear-gradient(to bottom, #ebebeb 1%, #c4c4c4 100%);"
		+ "    vertical-align: middle;"
		+ "    text-align: center;"
		+ "    text-shadow: 0px 1px 0 #eeeeee;"
		+ "    font-size: 1.3em;"
		+ "    font-family: 'RussiaBold';"
		+ "}"
		+ ".video-dl-btn:hover {"
		+ "    color: #a81c1a;"
		+ "}"
		+ "body.theme_light h4.h-block {"
		+ "    width: initial;"
		+ "}";

	var style_el = document.createElement("style");
	style_el.innerHTML = styles;

	var head_el = document.querySelector("head");
	head_el.appendChild(style_el);
}

function create_dl_btn (href, filename) {
	var wrapper_div = document.createElement("div");
	wrapper_div.className = "video-dl";

	var dl_link = document.createElement("a");
	dl_link.innerText = "Скачать";
	dl_link.className = "video-dl-btn";
	dl_link.href = href;
	dl_link.download = filename;

	wrapper_div.appendChild(dl_link);

	return wrapper_div;
}

function put_btn (btn) {
	var target_el = document.querySelector("h4.theme");
	target_el.parentNode.insertBefore(btn, target_el.nextElementSibling);
}

(function do_work () {
	add_style();

	// url (part 1/3)
	var url = grab_url();
	var params = parse_url(url);
	var dl_url = make_dl_url(params);

	// filename (part 2/3)
	var title = grab_title();
	var filename = make_file_name(title);

	// button (part 3/3)
	var dl_btn = create_dl_btn(dl_url, filename);
	put_btn(dl_btn);
})();
