// ==UserScript==
// @name           WMC Enhancements
// @require				 http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @author         Jesse Bilsten
// @namespace      level-studios
// @description    Enhances the functionality of LEVEL Studios WMC.  No longer requires the Stylish sheet.
// @include        http://*.wwwa.com/wmc/*
// @version        0.19
// ==/UserScript==

/*
 * Version History
 * 
 * 0.19 - Removed p.formLabels {display:none;} because it's used on the template selection page.  Was using it to remove text on the selection page.
 * 0.18 - Consolidated the Stylish stylesheet into the Greasemonkey script due to inability to increase specificity on the @domain function of Stylish.
 * 0.17 - Added "Preview" button on the Content-Block.do page
 * 0.16 - Prevented the content blocks titles from overlapping the display content TODO: put the content into iframes
 * 0.15 - Changed "Continue" on the information page to read as "Check-in".
 * 0.14 - Copied "Continue" button to the top of the page for easier access
 * 0.13 - Added shortcut menu TODO: add ability to add/remove links and store in GM_setValue/GM_getValue
 * 0.12 - Updated layout to use the whole browser
 * 0.11 - Minified layout by removing header graphic and moving menu to the right
 * 0.10 - AJAX "Apply" button to save content and stay on the edit page.
 * 0.09 - Fixed table layout so the content doesn't wrap and indents properly
 *
 * TODO:
 * - Add link from pages.do directly to the "Edit Content" page
 * - Add link to the published page from the pages.do list
 * - Allow field to paste a URL into and then take the user directly to that page for editing
 * - Floating file management panel accessible at all times
 * - JSLint, CSS and HTML validation
 * - Site selector dropdown in the left corner of the WMC
 */

const imgLoader = "R0lGODlhEAALAPQAAP///wAAANra2tDQ0Orq6gYGBgAAAC4uLoKCgmBgYLq6uiIiIkpKSoqKimRkZL6+viYmJgQEBE5OTubm5tjY2PT09Dg4ONzc3PLy8ra2tqCgoMrKyu7u7gAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAALAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQACwABACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQACwACACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQACwADACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAALAAQALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkEAAsABQAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAALAAYALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkEAAsABwAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA";

GM_addStyle((<><![CDATA[
	td.tree, td.tree-alt {
		white-space: nowrap;
		width: 20% !important;
		padding: 5px 0;
		display: table-cell;
		overflow:hidden;
	}
	.treeon a {
		display: block;
		font-weight:bold;
	}
	.tree .treeL2 {
		white-space: nowrap;
	}
	.tree .treeL2 a {
		display:block;
	}
	.tree .treeL2 a:hover {
		background-color: #eee;
	}
	.tree .treeL3 { padding:0px !important; }
	.tree table { table-layout: fixed; }
	.tree td[width="0"] { width:0px; }
	.tree td[width="13"] {  }
	.tree td[width="26"] {  }

	a.button {
		background-image: -moz-linear-gradient(
			center bottom,
			rgb(247,247,247) 30%,
			rgb(227,227,227) 83%
		);
		/*border-radius:5px;*/
		color:#333 !important;
		border:1px solid #CCC;
		padding:2px 14px 2px 10px !important;
		font-weight:bold;
		text-decoration:none !important;
		text-shadow:1px 1px 4px #FFF;
		position:relative;
		box-shadow:0px 1px 1px #666;
		top:-2px;
	}

	a:hover.button {
		color:#FFF !important;
		text-shadow:1px 1px 4px #333;
		border:1px solid rgb(0,153,31);
		background-image: -moz-linear-gradient(
			center bottom,
			rgb(71,204,82) 30%,
			rgb(0,153,31) 83%
		);
	}

	.arrow {
		position:absolute;
		border-color: transparent transparent transparent #FFF;
		border-style: solid;
		border-width: 5px;
		width:0;
		height:0;
		top:0.4em;
		right:0;
	}

	.shortcuts,
	.shortcuts li {
		text-align:left !important;
		background:#EBEBEB;
		padding-left:2px !important;
	}

	.shortcuts strong {
		text-transform:uppercase;
		color:#000;
	}

	#wrapper > img.header,
	img[src="/wmc/images/top_banner.jpg"] {
		display:none;
	}
	body div#wrapper {
		width:auto !important;
		padding:10px 15px !important;
	}
	p.welcometxt {
		float:left;
	}
	ul#lnav, 
	#content {
		top:40px !important;
	}
	#content {
		/* width:925px !important; */
		width:auto !important;
		padding:0 15px 0 0 !important;
	}
	#rside {
		padding:5px 0 !important;
	}
		#rside a { 
			float:right;
			clear:both;
			padding:0 0 5px !important;
		}
/*
	#blocks {
		width:auto !important;
	}
		.block-functions {
			height:auto !important;
		}
		.block-functions,
		.block-head,
		.block-contents {
			width:auto !important;
		}
		.block-contents {
			width:620px !important;
		}
*/
]]></>).toString());

var urlParams = {};
(function () {
    var e,
        a = /\+/g,  // Regex for replacing addition symbol with a space
        r = /([^&=]+)=?([^&]*)/g,
        d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
        q = window.location.search.substring(1);

    while (e = r.exec(q))
       urlParams[d(e[1])] = d(e[2]);
})();

var Pages = new function() {
	var _pages = GM_getValue('pages') || [];

	this.add = function(page) {
		this._pages.push(page);
		this.save();
	}

	this.remove = function(page) {
		if(this._pages.indexOf(page) > -1) {
			this._pages = this._pages.splice(this._pages.indexOf(page), 1);
		}
		this.save();
	}

	this.save = function() {
		GM_setValue('pages', this._pages);
	}

	this.get = function() {
		return this._pages;
	}

	this.print = function() {
		var output = "";
		if(this._pages.length>0) {
			//output += "<ul>";
			for(var i=0;i<this._pages.length;i++){
				output += "<li><a href=\""+this._pages[i].url+"\">"+this._pages[i].text+"</a><a class=\"delete\" href=\"#\">x</a></li>";
			}
			//output += "</ul>";
		}
		return output;
	}
}

function init() {
	var arrWelcome = $("p.welcometxt");
	arrWelcome.first().removeAttr("style").prepend("Site: "); // "Site: " <site>
	$("#lnav").prepend("<li class=\"shortcuts\"><strong>SHORTCUTS</strong><ul><li><a href=\"/wmc/cms/pages/pages-menu.do\">Add/Edit Pages</a></li><li><a href=\"/wmc/pc/products/products.do\">Add/Edit Products</a></li></ul></li>");
		//.append(Pages.print());
	//$("#lnav a[href=\"/wmc/home.jsp?category=cms\"]").attr("href","/wmc/cms/pages/pages-menu.do");
}

function moveContinueToTop() {
	$("#content .continue a").clone().prependTo("#rside");

// Grab the "Continue" button, "clear.gif", and "dash.gif" and duplicate them up top next to the "Publish Now" button
	var arrBtnPublish = $("#content td a img[src=\"/wmc/images/publish_now.gif\"]"),
			eleTopTD = arrBtnPublish.first().parent().parent();
	arrBtnPublish.last().parent().siblings().clone().prependTo(eleTopTD);
}

function preventTitleOverlap() {
	var arrfunctions = $("#blocks .block-functions");
	arrfunctions.wrapInner("<span class='left'>").each(function(){
			$right = $(this).find('.right');
			$right.detach();
			$(this).prepend($right);
		});
}

function convertButton(img, txt) {
	$("#content img[src=\"/wmc/images/"+img+"\"]").parent().html(""+txt+" <span class='arrow'></span>").addClass("button");
}

function addApplyButton() {
	var $dash = $("<img width=\"14\" height=\"13\" src=\"/wmc/images/dash.gif\" />");
	var $button = $("<a class=\"button\" id=\"apply_changes\" href=\"#\">Apply Changes</a>");
	var $loader = $("<img id=\"loader\" style=\"display:none;\" src=\"data:image/gif;base64,"+imgLoader+"\" />");

	$("#content img[src=\"/wmc/images/back_cancel.gif\"]").parent().after($dash, $button, $loader);

	$("#apply_changes").click(function(e) {
		e.preventDefault();

		var $form = $("form").first();
		unsafeWindow.hiddens();
		
		$.ajax({
			url: $form.attr("action"),
			type: "POST",
			data: $form.serialize(),
			cache: false,
			beforeSend: function() {
				$button.hide();
				$loader.show();
			},
			success: function() {
				$loader.hide();
				$button.show();
			},
			error: function() {
				alert("Error: The cake is a lie.");
			}
		});
	});
}

function addPreviewButton(pageId) {
	var $dash = $("<img width=\"14\" height=\"13\" src=\"/wmc/images/dash.gif\" />");
	var $preview = $("<a target=\"_blank\" href=\"/wmc/cms/pages/preview-page.do?id="+pageId+"&age=1\"><img width=\"84\" height=\"13\" border\"0\" src=\"/wmc/images/preview_page.gif\" /></a>");

	$("#content input[src=\"/wmc/images/continue.gif\"]").after($dash, $preview);
}

function addEditContentButtons(sectionId) {
	var $arrPageIdTd = $('#content table.listing').first().find("td[align=\"center\"]");
	$arrPageIdTd.each(function(){
		var pageId = $(this).text();
		var url = "/wmc/cms/pages/page-content.do?id="+pageId+"&sectionID="+sectionId;
		var link = "<a href=\""+url+"\">Edit</a>";
		var text = $(this).next("a").text();
		
		$(this).prepend("<br />")
			.prepend("<a href=\"#\">Add</a>")
			.click(function(_id, _url, _text) {
				Pages.add({id: _id, url: _url, text: _text});
			})
			.prepend(link+"&nbsp;");
		
	});
}

unsafeWindow.console.log("hi");

(function() {
	var url = window.location.href;
	init();

	if(url.match("block-content.do")) { //Page Content
		addApplyButton();
		addPreviewButton(urlParams["pageID"]);
	} else if (url.match("page-content.do")) { //Page Template
		preventTitleOverlap();
		moveContinueToTop();
	} else if (url.match("page.do")) { //Page Overview
		moveContinueToTop();
		convertButton("continue.gif","Check-in");
		convertButton("publish_now.gif","Publish");
	} else if (url.match("pages.do") || url.match("pages-menu.do")) { //Page List
		//addEditContentButtons(urlParams["id"]);
	}
})();

