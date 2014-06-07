// ==UserScript==
// @name           t66y
// @namespace      t66y
// @description    t66y
// @include        http://www.t66y.com/*
// @include        http://t66y.com/*
// @include        http://cl.eye.rs/*
// @include        http://cl.yo.fi/*
// @include        http://cl.orc.st/*
// @include        http://cl.babi.info/*
// @include        http://cl.tedx.ee/*
// @include        http://cl.cn.mu/*
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
	var css = "img, input{max-width:1000px;height:auto !important}#text1, .tips{display:none}.bd{position:relative;}.bd-link{position:absolute;bottom:6px;right:12px;background-color:yellow}";
	var heads = document.getElementsByTagName("head");
	if(heads.length > 0) {
		var node = document.createElement("style");
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node);
	}

	function resetImages() {
		$('.tpc_content a').each(function() {
			str = $(this).attr('href');
			str = str.replace(/http:\/\/www.viidii.com\/\?/g, "");
			str = str.replace(/______/ig, ".");
			str = str.replace('&z"', '"');
			str = str.replace('&amp;z"', '"');
			$(this).attr("href", str);
		})

		$('.tpc_content input:image').each(function() {
			var imgUrl = $(this).attr("onclick");
			imgUrl = imgUrl.replace("window.open('http://www.viidii.com/?", "");
			imgUrl = imgUrl.replace("&z');return false;", "");
			imgUrl = imgUrl.replace(/______/ig, ".");
			//alert(imgUrl);
			$(this).replaceWith("<img src=" + imgUrl + ">");
		})
	}

	resetImages();

	var listSelector = '#ajaxtable';
	if($(listSelector).length > 0) {
		var bdIndex = 0;
		var bdSelector = '.t2:eq(0)';
		var linkSelector = $(listSelector + ' h3 a');
		var pageNow = $('.pages b');
		var linkCount = linkSelector.length;
		$(listSelector).before('<div id="bd-1"></div>');

		var nextPage = pageNow.next().attr('href');
		var prevPage = pageNow.prev().attr('href');

		function loadBd() {
			if($(listSelector)) {

				var link = document.location.href;
				var links = link.split('#');
				if(links.length > 1) {
					var num = parseInt(links[links.length - 1].replace('bd', ''));
					bdIndex = num + 1;
					$('.bd').hide();
					$('#bd' + bdIndex).show();
					link = links[0] + '#bd' + bdIndex.toString();
					if(bdIndex + 1 > linkCount)
						link = nextPage;

					for(var i = bdIndex; i < bdIndex + 5; i++) {
						if($('#bd' + i).length < 1) {
							$('#bd-1').append('<div id="bd' + i + '" class="bd" style="display:none"><div id="bd-inner' + i + '"></div></div>');
							$('#bd' + bdIndex).show();
							var bdLink = linkSelector.get(i);
							$('#bd-inner' + i).load(bdLink + ' ' + bdSelector, resetImages());
							$('#bd' + i).append('<a class="bd-link" target="_blank" href=' + bdLink + '>' + bdLink + '</a>');
						}
					}
				} else
					link += '#bd-1';
				window.location.href = link;
			};

		}

		loadBd();
		//J 或 Q
		$(document).keydown(function(e) {
			if(e.keyCode == 74 || e.keyCode == 81) {
				loadBd();
			}
		})
		//K 或 W
		$(document).keydown(function(e) {
			if(e.keyCode == 75 || e.keyCode == 87) {
				var link = document.location.href;
				var links = link.split('#');
				if(links.length > 1) {
					var num = parseInt(links[links.length - 1].replace('bd', ''));
					if(num < 0)
						window.location.href = prevPage;
					else {
						bdIndex = num - 1;
						$('.bd').hide();
						for(var i = bdIndex; i < bdIndex + 1; i++) {
							if($('#bd' + i).length < 1) {
								$('#bd-1').append('<div id="bd' + i + '" class="bd" style="display:none"><div id="bd-inner' + i + '"></div></div>');
								var bdLink = linkSelector.get(i);
								$('#bd-inner' + i).load(bdLink + ' ' + bdSelector, resetImages());
								$('#bd' + i).append('<a class="bd-link" target="_blank" href=' + bdLink + '>' + bdLink + '</a>');
							}
						}
						link = links[0] + '#bd' + bdIndex.toString();
						window.location.href = link;
						$('#bd' + bdIndex).show();
					}
				}
			}
		})
	}
}

addJQuery(main);