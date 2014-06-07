// ==UserScript==
// @name		Image Fap Gallery Download
// @namespace		timmart.in
// @description		Generate a curl script to download all the full-size images from an imagefap.com gallery
// @require		http://code.jquery.com/jquery-latest.min.js
// @require		http://web.archive.org/web/20131119235233/http://www.myersdaily.org/joseph/javascript/md5.js
// @include		http://*imagefap.com/gallery/*
// @include		http://*imagefap.com/gallery.php?*gid=*
// @include		http://*imagefap.com/ajax_gallery_display.php?*
// @include		http://*imagefap.com/pictures/*
// @include		http://*imagefap.com/showfavorites.php?*
// ==/UserScript==

function log10(val) {
	return Math.log(val) / Math.LN10;
}

function lpad(i, n, pad_char) {
	var max_digits = Math.ceil(log10(n));
	var pad_string = "";
	var j;
	for (j = 0; j < max_digits; j++) {
		pad_string = pad_string + pad_char;
	}
	pad_string = String(pad_string + i).slice(-max_digits);
	return pad_string
}

function image_extension(url) {
	return url.split('.').pop();
}

function gallery_hash() {
	return md5(document.URL).substring(0,4);
}

function get_thumb_array() {
	var thumbs = $("#gallery img[src*='x.fap.to/images/thumb']");
	var tosrc = function (n, i) {
		return n.src;
	};

	return $.map(thumbs, tosrc);
}

function thumbs_to_full(arr) {
	var full_url = function (n, i) {
		var url = n;
		url = url.replace(/x\.fap\.to/, "fap.to");
		url = url.replace(/thumb/, "full");
		return url;
	}
	return $.map(arr, full_url);
}

function images_to_curl_cmds(arr) {
	var n = arr.length;
	var curl_line = function (url, local_file_name) {
		return "curl \"" + url + "\" -o \"" + local_file_name + "." + image_extension(url) + "\"";
	}
	var i, name;
	var gh = gallery_hash();
	for (i = 0; i < n; i++) {
		name = gh + '-' + lpad(i, n, '0');
		arr[i] = curl_line(arr[i], name);
	}
	return arr;
}

function script_text() {
    return images_to_curl_cmds(thumbs_to_full(get_thumb_array())).join("\n")
}

function insert_script_text() {
    $("#cnt_tags").after(
        $('<div/>', {
		    id: 'script_text',
	        html: $('<textarea/>', {
           		 rows: 4,
           		 cols: 80,
           		 id: 'script_textarea',
          		 text: script_text()
        	}).css('font-family', 'monospace')
        }).css('text-align', 'center'));
}

$(function () {
	'use strict';
	insert_script_text();
});