// ==UserScript==
// @name		(dm) Hentai Foundry Link Swapper
// @namespace	hfdllinkswap
// @description	Changes Hentai Foundry gallery HTML links to direct image links
// @version        1.0.2
// @include	http://www.hentai-foundry.com/user*
// @match   http://www.hentai-foundry.com/user*
// @include	http://www.hentai-foundry.com/pictures*
// @match   http://www.hentai-foundry.com/pictures*
// @include	http://www.hentai-foundry.com/cat-*
// @match   http://www.hentai-foundry.com/cat-*
// @include http://www.hentai-foundry.com/search.php*
// @match   http://www.hentai-foundry.com/search.php*
// @include http://www.hentai-foundry.com//search.php*
// @match   http://www.hentai-foundry.com//search.php*
// ==/UserScript==

//
//
//
// Known issue(s):
// Script will check url's twice because there are 2 links for each file on the
// thumbnail pages. The only work around i know of is to not use asynchronous
// requests to parse for the filename but that causes script to hang window with
// large thumbnail lists.
//
// Some files on HF do not have extensions and will be tricky to auto d/l using
// preset filters for i.e. jpg, png, gif, etc.
//
// The double //search.php entry is required since the HF search function has a
// bug that if you search by entering data in the filter area it goes to a
// buggy url with 2 /'s but if you enter in the top right search box or from the
// advanced search page it goes properly.
//

//****************************************************
// Global Var's
var link_counter = 0;
var hfdlbtn;
var link_list_btn;
var link_list = '';
var total_to_check_counter = 0;
var num_checked_counter = 0;

//END Global Var's

//****************************************************
//setup swap button
hfdlbtn = document.createElement("input");
hfdlbtn.type = "button";
hfdlbtn.value = "Swap links to DDL links.";
document.getElementById("filtersButton").parentNode.appendChild(hfdlbtn);
hfdlbtn.addEventListener("click", link_swap, false);

link_list_btn = document.createElement("input");
link_list_btn.type = "button";
link_list_btn.value = "Create link list";
document.getElementById("filtersButton").parentNode.appendChild(link_list_btn);
link_list_btn.addEventListener("click", build_link_list, false);

//****************************************************
// function called when button is clicked to start swapping.
function link_swap() {
	hfdlbtn.removeEventListener("click", link_swap, false);
	for (link_counter = 0; link_counter < document.links.length; link_counter += 1) {
		if (document.links[link_counter].pathname.indexOf("/pictures") > -1) {
			// document.links[link_counter].pathname = document.links[link_counter].pathname.replace("pic-", "pic_fullsize-");
			// document.links[link_counter].pathname = document.links[link_counter].pathname.replace(".html", ".php");
			total_to_check_counter += 1;
			get_url_html_cb(document.links[link_counter], link_counter, function (new_link, link_count) {
				if (link_list.indexOf(new_link) < 1) {
					link_list = link_list + '<br><a href="' + new_link + '">' + new_link + '</a>';
				}
				document.links[link_count].href = new_link;
			});
		}
	}
}

//****************************************************
//html grab function, downloads html page with img reference
//and returns the picture url only back to caller
function get_url_html_cb(url, link_counter, callback) {
	var http_req = new XMLHttpRequest();
	http_req.onreadystatechange = function () {
		var fake_div = document.createElement('div');
		
		if (http_req.readyState === 4 && http_req.status === 200) {
			num_checked_counter += 1;
			hfdlbtn.value = 'Checking link ' + num_checked_counter + '/' + total_to_check_counter + ' ' + url;
			fake_div.innerHTML = http_req.responseText;

			if (total_to_check_counter === num_checked_counter) {
				hfdlbtn.value = 'Link swap complete.';
			}
			//var newurl = http_req.responseText.match(/(<img[^>]+please_stop=\'*\'[^>]*>)/g);
			var newurl, base_container;
			
			// look for image or flash
			base_container = fake_div.querySelector('div#yw0 > div.boxbody > center');
			newurl = base_container.getElementsByTagName('img')[0] || base_container.getElementsByTagName('embed')[0];
			
			if (newurl) {
				newurl = newurl.src;
				callback(newurl, link_counter);
			} else {
				// still not sure what it is so return the original url and ignore it
				callback(url, link_counter);
			}
			return;
		}
	};
	http_req.open("GET", url, true);
	http_req.send("");
}

function build_link_list() {
	if (total_to_check_counter !== num_checked_counter) {
		alert("The url counters don't match. Make sure script is not still swapping urls.");
		return;
	}
	link_list_btn.removeEventListener("click", build_link_list, false);
	/* experimenting with different link display options
	var url_data = document.createElement("textarea");
	url_data.rows = '40';
	url_data.cols = '140';
	document.getElementById("filters").parentNode.appendChild(url_data);
	url_data.innerHTML = link_list;
	 */
	document.body.innerHTML = link_list;
}
