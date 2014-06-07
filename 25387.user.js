// ==UserScript==
// @name           tdwtf random
// @namespace      forums.thedailywtf.com
// @include        http://forums.thedailywtf.com/*
// ==/UserScript==

generate_tag();

show_tag_summary();

function generate_tag() /*{{{*/
{


    var elm = document.getElementById("ctl00_ctl00_bcr_bcr_PostForm_ctl04_TagsSubForm_ctl00_Tags");

    if (elm) {
        var rand_addr = "";

        for (var i = 0; i < 8; i++) {
                rand_addr += Math.floor(Math.random() * 16).toString(16);
        }

        elm.value = ", Uncaught TagException at 0x" + rand_addr + " in (TDWTF.forums.Post:__LINE__)";
    } else if (document.location.href.indexOf("/forums/p/") != -1) { // only do right after a post is submitted
        var anchors = document.getElementsByTagName("a");
        
        for (var i = 0; i < anchors.length; i++) {
            if (anchors[i].innerHTML.indexOf("[Edit Tags]") != -1) {
                update_tags_with_post_number(anchors[i]);
            }
        }
    }

} /*}}}*/
function show_tag_summary() /*{{{*/
{

    var all_tags = document.getElementsByTagName("input");
    var tagex_count = 0;
    var tagex_bytes = 0;
    var curr_idx = 0;
    var end_idx = 0;
    var new_idx = 0;
    var tmp_idx = 0;

    //var patterns = ["TagException+in+0x", "TagException+at+0x", "TagException%3a+Malformed+tag+at+0x"];
    var patterns = ["TagException"];

    for (var i = 0; i < all_tags.length; i++) {
        if (all_tags[i].id.indexOf("AllTags") != -1) {
            all_tags = all_tags[i].value;
            
            while (curr_idx != -1) {
                new_idx = all_tags.length;

                for (var j = 0; j < patterns.length; j++) {
                    tmp_idx = all_tags.indexOf(patterns[j], curr_idx);

                    if ((tmp_idx > 0) && (tmp_idx < new_idx)) {
                        new_idx = tmp_idx;
                    }
                }

                if (new_idx == all_tags.length) {
                    new_idx = -1;
                }

                curr_idx = new_idx;

                if (curr_idx != -1) {
                    end_idx = all_tags.indexOf("&", curr_idx);
                    tagex_count++;
                    tagex_bytes += (end_idx - curr_idx);
                    curr_idx++;
                }
            }

            var report_elm = document.createElement("div");
            document.body.appendChild(report_elm);
            report_elm.innerHTML = "TagExceptions: " + tagex_count + "<br>TagEx Bytes: " + tagex_bytes + "<br>All Tags Bytes: " + all_tags.length;
            report_elm.style.position = "absolute";
            report_elm.style.top = "15px";
            report_elm.style.left = "25px";
            report_elm.style.background = "#FFCC33";
            report_elm.style.border = "1px solid #000000";
            report_elm.style.padding = "6px";

            return;
        }
    }

} /*}}}*/
function update_tags_with_post_number(elm) /*{{{*/
{
   
	var tmp_elm = elm;

	while (tmp_elm.parentNode) { // stop bstorer from fucking with us :-P
		if (tmp_elm.parentNode.className == "ForumPostContentArea") {
			return;
		}
		tmp_elm = tmp_elm.parentNode;
	}

    if (elm.parentNode.innerHTML.indexOf("__LINE__") != -1) {
        var post_url = document.location.href;
        var frag_pos = post_url.indexOf("#");

        if (frag_pos > -1) {
            post_url = post_url.substring(0, frag_pos);
        }

        var post_id = post_url.substring((post_url.lastIndexOf("/") + 1), (post_url.length - 5));

        var tags = "";

        var tags_cont = elm.parentNode.firstChild;

        for (var i = 0; i < tags_cont.childNodes.length; i++) {
            if (tags_cont.childNodes[i].childNodes.length) {
                tags += tags_cont.childNodes[i].childNodes[0].data + "; ";

                if (tags_cont.childNodes[i].childNodes[0].data.indexOf("__LINE__") != -1) {
                    tags_cont.childNodes[i].childNodes[0].data = tags_cont.childNodes[i].childNodes[0].data.replace("__LINE__", post_id);
                }
            }
        }

		if (!tags.length) { // more junk data, just return
			return;
		}

        tags = tags.replace("__LINE__", post_id);

        var vstate = document.getElementById("__VIEWSTATE").value;
        var cb_param = "saveAndFormat:" + post_id + ":" + tags;
        var cb_id = "ctl00$ctl00$bcr$bcr$ctl00$PostList$ctl03$ctl23$ctl00";

        var post_data = "__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=" + encodeURI(vstate) + "&__CALLBACKID=" + encodeURI(cb_id) + "&__CALLBACKPARAM=" + encodeURI(cb_param);

        GM_xmlhttpRequest({
            method: "POST",
            url:    post_url,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:   post_data
        });

    }

} /*}}}*/
