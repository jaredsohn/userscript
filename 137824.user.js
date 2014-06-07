// ==UserScript==
// @name           RU_CHP
// @author         Alexey Shumkin aka Zapped
// @license        GPL
// @version        0.0.5
// @history        0.0.5 - Added support for Opera, removed alk.lv (invalid backup site long time ago)
// @history        0.0.4 - Added redirect to rucrash video player
// @namespace      http://ru_chp.livejournal.com/
// @description    improve video view in ru_chp (inspired with http://www.alk.lv/RU_CHP.user.js)
// @include        http://ru-chp.livejournal.com/*
// @exclude        http://ru-chp.livejournal.com/ru_chp/*
// ==/UserScript==
!function(win) {

	if (window != window.top) return;
	var doc = win.document;


	function append_form(element, url, form_content) {
		var form = doc.createElement("form");
		form.setAttribute("action", url);
		form.setAttribute("target", "_blank");
		form.innerHTML=form_content;

		element.appendChild(form);
	}

	function append_forms_by_id(element, id) {
		var ruchp_suffix = '/ruchp';
		var ruchp_suffix_ = ruchp_suffix  + '/';
		
		var rucrash_site = 'rucrash.com';
		var rucrash_video_url = 'http://video.' + rucrash_site + ruchp_suffix_ + id + ".mp4";
		text =
	'<input type="text" size="40" readonly="readonly" class="text" value="' + rucrash_video_url + '">' +
	'<input type="submit" class="submit" value="download from ' + rucrash_site + '" alt="Ok"> ';
		append_form(element, rucrash_video_url, text);

		var rucrash_player_url = 'http://www.' + rucrash_site + ruchp_suffix_;
		var text =
	'<input type="text" size="40" readonly="readonly" class="text" value="' + rucrash_player_url + '?v=' + id + '">' +
	'<input type="hidden" name="v" value="' + id + '">' +
	'<input type="submit" class="submit" value="play on ' + rucrash_site + '" alt="Ok"> ';
		append_form(element, rucrash_player_url, text);
	}

	function inlined_videos_count(element) {
		var videos = element.getElementsByTagName("iframe");
		if (videos && videos.length != 0)
			return videos.length;
		else {
			var hrefs = element.getElementsByTagName("a");
			var vcount = 0;
			for (var i = 0; i < hrefs.length; i++) {
				if (hrefs[i].getAttribute("class") && hrefs[i].getAttribute("class").indexOf("b-mediaplaceholder-video") > 0)
					vcount += 1;
			}
			return vcount;
		}
	}

	function find_id(element, entry) {
		// if there are no videos
		// there is no reason to search id
		if (inlined_videos_count(entry) == 0)
			return false;
		var ruchp = "http://ru-chp.livejournal.com/";
		if (element.getElementById === undefined) {
			var as = element.getElementsByTagName("a")[0];
			as = as.getAttribute("href");
			// ensure that current post is in ru-chp
			if (as && as.indexOf(ruchp) == 0)
				return as.replace(ruchp, "").replace(".html", "");
		} else {
			// find in current open post
			var	postform = element.getElementById("postform");
			if (!postform)
				return false;
			// ensure that current post is in ru-chp
			if (element.location.toString().indexOf(ruchp) != 0)
				return false;
			var inputs = postform.getElementsByTagName("input");
			for (var i = 0; i < inputs.length; i++) {
				if (inputs[i].getAttribute("name") == "itemid")
					return inputs[i].getAttribute("value");
			}
		}
		return false;
	}

	function append_in_mine_style() {
		var entries = doc.getElementsByTagName("div");
		for (var i = 0; i < entries.length; i++ ) {
			// find post
			var entry = entries[i];
			var id = false;
			if (entry.getAttribute("class")== "b-singlepost-body") {
				// if single post view
				id = find_id(doc, entry);
				entry = entry.parentNode;
			} else if (entry.getAttribute("style") == "text-align:left") {
				// if community feed
				id = find_id(entry, entry);
			}
			if (id)
				append_forms_by_id(entry, id);
		}
	}

	function append_in_own_style() {
		var entries = doc.getElementsByTagName('dl');
		// enumerate all <dl> tags
		for (var i = 0; i < entries.length; i++ ) {
			// find every post
			if (entries[i].getAttribute("class") == "entry hentry") {
				id = entries[i].id;

				var dds = entries[i].getElementsByTagName('dd');
				for (var j = 0; j < dds.length; j++ ) {
					if (dds[j].getAttribute("class") == "entry-text") {
						if (inlined_videos_count(dds[j]) == 0)
							// if no videos, do not add any forms
							continue;
						// find post text
						id = id.replace("post-ru_chp-", "");
						append_forms_by_id(dds[j], id);
					}
				}
			}
		}
	}

	win.addEventListener("load", function() {
		// determine own/mine style
		// own community style has <html xmlns=""...
		mine_style = doc.getElementsByTagName("html")[0].getAttribute("xmlns") == null;
		// for own community view-style
		if (mine_style) {
			append_in_mine_style();
		} else {
			append_in_own_style();
		}
	}, false);

}(typeof unsafeWindow == 'undefined' ? window : unsafeWindow)