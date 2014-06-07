// ==UserScript==
// @name                    AO-Updater
// @namespace               wyvern
// @version                 0.7.8
// @author                  Azathoth
// @description             Updates AO stuff (IPBoard)
// @copyright               more like copyleft miright
// @license                 WTFPL <http://sam.zoy.org/wtfpl/COPYING>
// @include                 http://forums.atlusonline.com/*
// @include                 https://forums.atlusonline.com/*
// @updateURL               https://userscripts.org/scripts/source/145068.user.js
// @run-at                  document-end
// ==/UserScript==


/*
* KNOWN BUGS
*
* Spoiler tags do not quote properly
* List tags do not quote properly
*/

/*
* TODO
*
* Send Quick Reply without leaving page (not working so well. Find out how posts are submitted)
*/

console.log("Begin");

var new_dom;
var num_posts;
var main_ticker;
var prefs;

function init() {
	console.log("init()");
	
	checkGM();
	
	prefs = getPrefs();

	var type = getType(document.URL);

	if (type == "thread") {
		main_ticker = new ticker();
		modifyReplyButton(document);
		//modifyQRPostButton();
		var ticker_timer_interval = setInterval(function () { main_ticker.incTimer(); }, 1000);
		var update_interval = setInterval(function () { update(); }, prefs["interval"] * 1000);
	}
	else if (type == "home") {
		var update_interval = setInterval(function () { update(); }, 30000);
	}

}

function update() {
	console.log("update()");

  var type = getType(document.URL);
    
  if (type == "thread") {
  	num_posts = document.getElementsByClassName("post_block").length;
  	updateThreadStart();
  }
  else if (type == "home") {
      getHTML(document.URL, updateHome);
  }
  else {
    
  }

}

function updateThreadStart() {
	console.log("updateThreadStart()");

	var url = document.URL;
	var page_num = Math.floor(num_posts / 20);
	console.log("Page number: ", page_num);

	url = url.replace(/st=(\d*)/, function (m) { return m.substring(0, 3) + (parseInt(m.substring(3), 10) + (page_num * 20)).toString(); });
	console.log("URL: ", url);

	getHTML(url, updateThreadEnd);

}

function updateThreadEnd() {
	console.log("updateThreadEnd()");

	var has_new;
	var id_curr = document.getElementsByClassName("hfeed")[0].getElementsByClassName("post_id")[document.getElementsByClassName("post_id").length - 1].childNodes[0].innerHTML;
	var id_new =  new_dom.getElementsByClassName("post_id")[new_dom.getElementsByClassName("post_id").length - 1].childNodes[0].innerHTML;
	console.log("id_curr = ", id_curr);
	console.log("id_new = ", id_new);
	has_new = (id_curr != id_new);

	if (has_new) {
		var num_new = new_dom.getElementsByClassName("post_block").length;
		modifyReplyButton(new_dom);
		addPosts(num_posts % 20);
		num_posts += num_new - (num_posts % 20);
		updateViewers();
		updateThreadStart();
	}
	else {
		updateViewers();
	}

}

function updateHome() {
    console.log("updateHome()");
    
    updateViewers();
    updateSidebar();

}

function updateViewers() {
	console.log("updateViewers()");

	var old_viewers = document.getElementsByClassName("statistics")[0];
	var new_viewers = new_dom.getElementsByClassName("statistics")[0];
	var parent = old_viewers.parentNode;
	var neighbor = old_viewers.nextSibling;

	parent.removeChild(old_viewers);
	parent.insertBefore(new_viewers, neighbor);

}

function addPosts(curr_num) {
	console.log("addPosts()");

	var hfeed = document.getElementsByClassName("hfeed")[0]; // hfeed is the container that holds posts and other footer junk
	var updated_posts = new_dom.getElementsByClassName("post_block");
	var num_posts = updated_posts.length;
	var insnode = document.getElementById("topic_search_jump"); // Insert position, just above footer stuff
	console.log("Posts found on updated page: ", num_posts);

	main_ticker.incPosts(num_posts - curr_num);

	for (var i = curr_num; i < num_posts; i++) {
		hfeed.insertBefore(updated_posts[curr_num], insnode);
	}

}

function getHTML(url, callback) {
	console.log("getHTML()");

	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				if (main_ticker) {
				    main_ticker.incTimer(true);
				   }
				updateDOM(request.responseText);
				callback();
			}
		};
	request.open("GET", url, true);
  request.send();

}

function updateDOM(responseText) {
	console.log("updateDOM()");

	var html = responseText;
	var dom = document.createElement("div");

	html = html.replace(/<!DOCTYPE.*?body id.*?>/, "");
	html = html.replace(/\/body>.*?<\/html>/, "");
	console.log("Strip HTML");
	dom.innerHTML = html;

	new_dom = dom;

}

function updateSidebar() {
    console.log("updateSidebar()");

    var old_side = document.getElementById("index_stats");
    var new_side = new_dom.getElementsByClassName("right clearfix")[0];
    var neighbor = old_side.nextSibling;
    var parent = old_side.parentNode;
    
    parent.removeChild(old_side);
    parent.insertBefore(new_side, neighbor);

}

function getType(url) {
    console.log("getType()");

    var retval;

    if (url.search("showtopic") != -1) {
        retval = "thread";
    }
    else if (url.search("act=idx") != -1 || url.search(/index\.php\??$/) != -1) {
        retval = "home";
    }

    return retval;

}

function modifyReplyButton(dom) {
    console.log("modifyReplyButton()");
    
    var posts = dom.getElementsByClassName("post_block");

    for (i = 0; i < posts.length; i++) {
    
        var button;
        try {
            button = posts[i].getElementsByClassName("post_controls")[0].getElementsByTagName("li")[3].getElementsByTagName("a")[0];
            button.setAttribute("href", "javascript:void(0)");
            button.onclick = moveQuote;
        }
        catch(e) {
        }
    
    }

}

function modifyQRPostButton() {
    console.log("modifyQRPostButton()");
    
    var button = document.getElementById("submit_post");
    button.setAttribute("type", "button");
    button.onclick = submitQRPost;
    
}

function sumbitQRPost() {
    console.log("submitQRPost()");

    var post = document.getElementById("fast-reply_textarea").value;

}

function moveQuote() {
    console.log("moveQuote()");

    // a -> li -> ul.post_controls -> div.post_wrap //-> div.post_body -> div.entry-content -> innerHTML
    var post = this.parentNode.parentNode.parentNode //.getElementsByClassName("post_body")[0].getElementsByClassName("entry-content")[0];
    var qr = document.getElementById("fast-reply_textarea");
    
    if (qr.value !== "") {
        qr.value = qr.value + "\n";
    }
    
    if (!qr.hasFocus) {
        qr.focus();
    }
    
    qr.value = qr.value + quotify(post);


}

function htmlToBb(html) {
    console.log("htmlToBb()");
    
    // Remove quotes
    html = html.replace(/<p class="citation">(.|\n)*?<\/p><div class="blockquote">(.|\n)*?<\/div><\/div><br>/g, "");
    
    // Replace emoticon imgs
    html = html.replace(/<img src=".*?" class="bbc_emoticon" alt="(.*?)">/g, "$1");
    html = html.replace(/&lt;/g, "<");
    html = html.replace(/&gt;/g, ">");
    
    // Remove edits
    html = html.replace(/<p class="edit">(.|\n)*?<\/p>/g, "");
    
    // Replace formatting
    html = html.replace(/<strong class="bbc">((.|\n)*?)<\/strong>/g, "[b]$1[/b]"); // bold
    html = html.replace(/<em class="bbc">((.|\n)*?)<\/em>/g, "[i]$1[/i]"); // italics
    html = html.replace(/<span class="bbc_underline">((.|\n)*?)<\/span>/g, "[u]$1[/u]"); // underline
    html = html.replace(/<del class="bbc">((.|\n)*?)<\/del>/g, "[s]$1[/s]"); // strikethrough
    html = html.replace(/<span style="color: (#[0-9A-Za-z]{6})">((.|\n)*?)<\/span>/g, "[color=\"$1\"]$2[/color]"); // color
    html = html.replace(/<span style="font-size: (\d*)px;">(.*)<\/span>/g, function(m, c1, c2) {
        var size;
        switch(parseInt(c1, 10)) {
            case 9:
                size = 1;
                break;
            case 13:
                size = 2;
                break;
            case 15:
                size = 3;
                break;
            case 17:
                size = 4;
                break;
            case 21:
                size = 5;
                break;
            case 26:
                size = 6;
                break;
            case 36:
                size = 7;
                break;
            default:
                size = 2;
        }
        return "[size=" + size + "]" + c2 + "[/size]";
    }); // size
    html = html.replace(/<span style="font-family: ([0-9A-Za-z\s\-]*)">(.*)<\/span>/g, "[font=\"$1\"]$2[/font]"); // font
    html = html.replace(/<a href="(.*?)" class="bbc_url" title="External link" rel="nofollow">((.|\n)*?)<\/a>/g, "[url=\"$1\"]$2[/url]"); // url
    html = html.replace(/<img src="(.*?)" alt="Posted Image" class="bbc_img">/g, "[img]$1[/img]"); // img
    html = html.replace(/<div class="bbc_spoiler">\n\t(.|\n)*?class="bbc_spoiler_content" style="display:none;">((.|\n)*?)<\/div><\/div>\n<\/div>/g, "[spoiler]$2[/spoiler]" ); // spoiler
    
    // Remove linebreaks
    html = html.replace(/<br>/g, "");
    
    // Clean top and bottom of post
    html = html.replace(/\s*<!--.*?>/, "");
    html = html.replace(/\s*$/, "");
    
    return html

}

function quotify(post) {
    console.log("quotify()");

    var post_html = post.getElementsByClassName("entry-content")[0].innerHTML;
    var author = post.getElementsByClassName("author")[0].getElementsByTagName("a")[0].innerHTML;
    var post_id = post.parentNode.getAttribute("id").substring(8); //.getElementsByClassName("post_id")[0].getElementsByTagName("a")[0].innerHTML.substring(1);
    var post_utc = post.getElementsByClassName("posted_info")[0].getElementsByTagName("abbr")[0].getAttribute("title");
    var post_bb = htmlToBb(post_html);
    
    var date = new Date();
    date.setFullYear(parseInt(post_utc.substring(0,4)), parseInt(post_utc.substring(5,7)), parseInt(post_utc.substring(8,10)), 
        parseInt(post_utc.substring(11,13)), parseInt(post_utc.substring(14,16)), parseInt(post_utc.substring(17,19)));
    var unixtime = Math.floor(date.getTime() / 1000);
    console.log("unixtime: ", unixtime);
    
    var tpos = post_utc.search(/T/);
    var tzpos = post_utc.search(/\+/);
    post_utc = post_utc.substring(0, tpos) + " " + post_utc.substring(tpos+1, tzpos) + " " + post_utc.substring(tzpos) + "UTC";

    post_bb = "[quote name=\"" + author + "\" date=\"" + post_utc + "\" timestamp=\"" + unixtime + "\" post=\"" + post_id + "\"]" + post_bb;
    post_bb = post_bb + "[/quote]\n\n";

    return post_bb;

}

function getPrefs() {
    console.log("getPrefs()");
    
    var prefs = new Array();
    //var values = GM_listValues();
    
    //for (var i = 0; i < values.length; i++) {
        //prefs[values[i]] = GM_getValue(values[i]);
    //}
    
    prefs["interval"] = GM_getValue("interval");
    
    if (!prefs["interval"]) {
        prefs["interval"] = 30;
    }
    
    return prefs;

}

function setUserInterval() {
    console.log("setUserInterval()");

    _interval = parseInt(this.value, 10);

    if (_interval < 15) {
        _interval = 15;
    }
    
    GM_setValue("interval", _interval);
    main_ticker.interval = _interval;

}

function checkGM() {
    console.log("checkGM()");
    
    if (typeof GM_deleteValue == 'undefined') {

    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }

    GM_log = function(message) {
        console.log(message);
    }

    GM_openInTab = function(url) {
        return window.open(url, "_blank");
    }

     GM_registerMenuCommand = function(name, funk) {
    //todo
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}

}

function ticker() {
	console.log("create ticker");

	this.incTimer = incTimer;
	this.incPosts = incPosts;
	this.drawTicker = drawTicker;

	this.container;
	this.leftcont;
	this.rightcont;
	this.timer;
	this.divider;
	this.posts;
	this.settingsform;
	this.intsettings;
	
	this.interval = prefs["interval"];

	this.drawTicker();

	function incTimer(reset) {
		console.log("ticker.incTimer()");

		var tval = this.timer.innerHTML;

		if (reset) {
			this.timer.innerHTML = this.interval;
		}
		else {
			this.timer.innerHTML = tval - 1;
		}


	}
	
	function incPosts(val) {
		console.log("ticker.incPosts()");

		this.posts.innerHTML = "+" + (parseInt(val, 10) + parseInt(this.posts.innerHTML.substring(1), 10));

	}

	function drawTicker() {
		console.log("ticker.drawTicker()");

		this.container = document.createElement("div");
		this.leftcont = this.container.appendChild(document.createElement("div"));
		this.rightcont = this.container.appendChild(document.createElement("div"));
		this.timer = this.leftcont.appendChild(document.createElement("span"));
		this.divider = this.leftcont.appendChild(document.createElement("span"));
		this.posts = this.leftcont.appendChild(document.createElement("span"));
		this.settingsform = this.rightcont.appendChild(document.createElement("form"));
        this.intsetting = this.settingsform.appendChild(document.createElement("input"));
        this.intsetting.setAttribute("type", "text");
        this.intsetting.setAttribute("size", "1");
        this.intsetting.setAttribute("maxlength", "3");

		this.timer.setAttribute("id", "ticker_timer");
		this.divider.setAttribute("id", "ticker_divider");
		this.posts.setAttribute("id", "ticker_posts");

		this.timer.innerHTML = this.interval;
		this.divider.innerHTML = " / ";
		this.posts.innerHTML = "+0";
		
		this.container.style.position = "fixed";
		this.container.style.color = "#F5F5F5";
		this.container.style.left = "0px";
		this.container.style.bottom = "0px";
		this.container.style.backgroundColor = "#000000";
		this.container.style.borderWidth = "1px";
		this.container.style.borderColor = "#666666";
		this.container.style.borderStyle = "solid";
		
		this.rightcont.style.display = "inline";
		this.settingsform.style.display = "inline";
		this.intsetting.style.display = "inline";

		this.leftcont.style.paddingLeft = "4px";
		this.leftcont.style.paddingRight = "4px";
		this.leftcont.style.borderWidth = "0px";
		this.leftcont.style.borderRightWidth = "1px";
		this.leftcont.style.borderColor = "#232323";
		this.leftcont.style.borderStyle = "solid";
		this.leftcont.style.display = "inline";

        this.settingsform.setAttribute("onSubmit", "window.location.reload(); return false;");

        this.intsetting.style.backgroundColor = "#FFFFFF";
        this.intsetting.style.borderStyle = "inset";
        this.intsetting.style.borderColor = "#000000";
        this.intsetting.style.borderWidth = "0px";
        this.intsetting.style.fontSize = "1em";
        this.intsetting.style.color = "#000000";
        this.intsetting.style.textAlign = "center";
		this.intsetting.value = this.interval;
		this.intsetting.onkeyup = setUserInterval;

		document.body.appendChild(this.container);

	}

}

init();