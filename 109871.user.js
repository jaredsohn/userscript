// ==UserScript==
// @name           Load All Older
// @namespace      facebook.com
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==


var news_item_counts = 0;
var last_loader_id = "";
var was_async_saving = false;
var num_dots = 1;

var load_started = false;

function start_load_all_older(){
	if(!load_started){
		load_started = true;
		load_all_older();
	}
}

function load_all_older(){
	var group_pager = document.getElementById("pagelet_group_pager");
	if(!group_pager) {group_pager = document.getElementById("profile_pager");}
	var stream_pager = false;
	if(!group_pager){ stream_pager = document.getElementById("pagelet_stream_pager"); }
	
	if(!group_pager && !stream_pager){
		document.getElementById("load_older_button").value="Done";
		return;
	}
		
	if(group_pager){
		if(group_pager.firstChild.getAttribute("id") == last_loader_id){
			setTimeout("load_all_older();", 100);
			return;
		}
		last_loader_id = group_pager.firstChild.getAttribute("id");
	}
	
	if(stream_pager){
		if(document.getElementById("pagelet_stream_pager").firstChild.getAttribute("class").indexOf("async_saving") > -1){
			was_async_saving = true;
			setTimeout("load_all_older();", 100);
			return;
		}
	}
		
	if(was_async_saving){
		was_async_saving = false;
		setTimeout("load_all_older();", 700);
		return;
	}
	
	try{
		var r = document.evaluate("//div['storyContent']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		new_news_item_counts = r.snapshotLength;
		if(new_news_item_counts != news_item_counts){
			if(num_dots == 1){
				num_dots = 2;
				document.getElementById("load_older_button").value = "Loading.";
			}else if(num_dots == 2){
				num_dots = 3;
				document.getElementById("load_older_button").value = "Loading..";
			}else if(num_dots == 3){
				num_dots = 1;
				document.getElementById("load_older_button").value = "Loading...";
			}
		
			news_item_counts = new_news_item_counts;

			if(group_pager){
				if(group_pager.firstChild.firstChild.firstChild.innerHTML.indexOf("Options") > -1){
					group_pager.firstChild.firstChild.firstChild.nextSibling.firstChild.click();
				}else{
					group_pager.firstChild.firstChild.firstChild.firstChild.click();
				}
			}
			
			if(stream_pager)
				unsafeWindow.UIIntentionalStream.instance.loadOlderPosts();
			
			setTimeout("load_all_older();", 100);
		}else{
			document.getElementById("load_older_button").value="Done.";
		}

	}catch(ex){
		document.getElementById("load_older_button").value="done";
	}
}

unsafeWindow.load_all_older = load_all_older;
unsafeWindow.start_load_all_older = start_load_all_older;

(function(){
	if(document.getElementById("load_older_button")){
		document.getElementById("load_older_button").value = "Load All Older";
	}else{
		var headNav = document.getElementById("headNav");
		var btn = document.createElement("input");
		btn.setAttribute("type","button");
		btn.value = "Load All Older";
		btn.setAttribute("onclick","start_load_all_older()");
		btn.id = "load_older_button";
		headNav.insertBefore(btn, headNav.firstChild.nextSibling);
	}
})();
