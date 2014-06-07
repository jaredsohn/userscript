// ==UserScript==
// @name           GodVille_posts_counter
// @namespace      http://userscripts.org/users/zeptor
// @description    Used to count posts from different people
// @include        http://godville.net/forums/show_topic/*
// ==/UserScript==

var url_cur = location.href ;
var curTopic = url_cur.substring(url_cur.lastIndexOf('/')+1, url_cur.lastIndexOf('?'));

// each entry withing is GM_setValue("GV_current_topic", "author|count+")

// store already processed posts to prevent multiple counting. Clear for new topic opened
newTopicCheck()

process();

paintTable();

function process() {
	
	var input_all = document.getElementsByTagName( 'div' ) ;
	for (var i=0; i < input_all.length; i++){
		var el = input_all[i];
		if (el.className == 'post_info') {
			var postNum = el.childNodes[1].childNodes[3].id;
			if (!isProcessed(postNum)) {
				setProcessed(postNum);
				var godHref = el.childNodes[1].childNodes[1].childNodes[1].href;
//alert(godHref);
				var authors = GM_getValue("GV_current_topic_count").split("+");
//alert(authors);
				var newValue = '';
				var inc = -1;
				for (var j=0; j < authors.length && authors[j] != ''; j++) {
					var curAuthor = authors[j].split("|");
//alert(curAuthor);
					if (curAuthor[0] == godHref) {
						inc = new Number(curAuthor[1]).valueOf() + 1;
						curAuthor[1] = inc;
//alert(inc);
					}
					newValue = newValue + curAuthor[0] + "|" + curAuthor[1] + "+";
//alert(newValue);
				}
				if (inc == -1) { // new Author
					newValue = newValue + godHref + "|" + 1 + "+";
//alert("New! " + newValue);
				}
				GM_setValue("GV_current_topic_count", newValue);
			}
		}
	}

//alert(GM_getValue("GV_current_topic_count"));
}

function paintTable() {
	var footer = document.getElementById( 'footer' ) ;
	var authors = GM_getValue("GV_current_topic_count").split("+");
	table = document.createElement( 'table' );
	for (var i=0; i < authors.length && authors[i] != ''; i++) {
		var curAuthor = authors[i].split("|");
		var row = table.insertRow(i);
		var decoded = decodeURIComponent(curAuthor[0]);
		row.insertCell(0).innerHTML= '<a href="' + decoded + '">' + decoded + '</a>';
		row.insertCell(1).innerHTML=curAuthor[1];
	}
	footer.appendChild(table);
}


function isProcessed(postNum) {
	var proc = GM_getValue("GV_processed_posts").split("|");
	for (var i=0; i < proc.length; i++) {
		if (proc[i] == postNum) { 
			return true;
		}
	}
	return false;
}

function setProcessed(postNum) {
	var procStr = GM_getValue("GV_processed_posts");
	GM_setValue("GV_processed_posts", procStr + "|" + postNum);
}

function clear() {
	GM_setValue("GV_processed_posts", '');
	GM_setValue("GV_current_topic", '');
	GM_setValue("GV_current_topic_count", '');
}

function newTopicCheck() {
	if (curTopic != GM_getValue("GV_current_topic")) {
		clear();
		GM_setValue("GV_current_topic", curTopic);
	}
}

