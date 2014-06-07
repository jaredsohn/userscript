// ==UserScript==
// @name           better mellbimbo.eu
// @namespace      mellbimbo.eu/view-*
// @include        http://*mellbimbo.eu/view-*

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; waitForPicToLoad(); }
}
GM_wait();

function waitForPicToLoad() {
	if($("#thabpic-box > a > img").width() == 0 || $("#thabpic-box > a > img").height() == 0) setTimeout(waitForPicToLoad, 100);
	else letsJQuery();
}

function letsJQuery() {
	$(document).ready( function() {
		// header shrink
		$("#header").css("height", "30px");
		$("#menu").css("top", "4px");
		
		// auto resize
		if (0 < $("#thumb").length) {
			var picWidthOriginal = $("#thumb").text().match(/[0-9]+/g)[0];
			var picHeightOriginal = $("#thumb").text().match(/[0-9]+/g)[1];
			var lapozoOffset = $("#lapozo").offset();
			var wh = $(window).height() - 150;
			var x = wh / picHeightOriginal;
			var y = Math.floor(x * picWidthOriginal);
			$("#thabpic-box > a > img").css({ "maxWidth" : y, "maxHeight" : wh });
		}

		// removed pic revival
		if ($("#thabpic-box > a[rel=external] > img").attr("src") == "/files/removed.jpg" && $("img[alt=Forrás] + a").html() == "") {
			GM_log("initializing revival..")
			var date = $("td > img[alt=Feltöltve]").parent().next("td").html();
			var time = $("td > img[alt=Idő]").parent().next("td").html();
			var nick = $("td > img[alt=Nick]").parent().next("td").children("a").html();
			setTimeout( function() {
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://urllog.kazsaa.hu/index.php?date=" + date,
					onload: function(response) {
						var html = response.responseText;
						var src, tPos;
						var rg = new RegExp("([0-9:])+[\\]a-z<>/\"= (\n]+" + nick, "g");
						var finds = html.match(rg);
						for ( i = 0; i <= finds.length-1; i++ ) {
							var linkTime = finds[i].substring(0, 8);
							if ( new Date (new Date().toDateString() + ' ' + linkTime).getTime() <= new Date (new Date().toDateString() + ' ' + time).getTime())
								tPos = html.search(linkTime)
						}
						var src = html.substring(html.indexOf('href="', tPos) + 6, html.indexOf('" target=', tPos));
						src = src.substr(src.lastIndexOf("/") + 1);
						$.ajax({ 
							type : "GET",
							url : "/files/" + src, 
							error : function(a, b) {
								if (a.status == 404) {
									$.ajax({
										type : "GET",
										url : "/files/" + src + ".jpg",
										success : function() {
											revived(src);
										},
										error : function() {
											$("#navigation-top").append("<span style='width: 40%; margin-left: 2%' ><b>Az újraélesztés sajnos nem sikerült :(</b></span>");
											$("#thabpic-box > a[rel=external]").html( details.status  + "-" + details.statusText );
										}
									});
								}
								
							},
							success : function() {
								revived(src);
							}
						})
					},
					onerror: function(details) {
						$("#navigation-top").append("<span style='width: 40%; margin-left: 2%' ><b>Az újraélesztés sajnos nem sikerült :(</b></span>");
						$("#thabpic-box > a[rel=external]").html( details.status  + "-" + details.statusText );
					}
				});
			}, 0);
			var revived = function(src) {
				$("#thabpic-box > a[rel=external] > img").attr("src", '/files/' + src)
				$("#thabpic-box > a[rel=external]").attr("href", '/files/' + src)
				$("#thabpic-box > a[rel=external] > img").css("border", "2px red solid");
				$("#navigation-top").append("<span style='width: 40%; margin-left: 2%' ><b>újraélesztve :)</b></span>");
			}
		}
		else if ($("#thabpic-box > a[rel=external] > img").attr("src") == "/files/removed.jpg") {
			var src = $("img[alt=Forrás] + a").attr("href");
			src = src.substr( src.lastIndexOf("/")+1 );
			if ( $("a[href=section-iwiw.html]").length == 2 )
				src += ".jpg";
			$("#thabpic-box > a[rel=external] > img").attr("src", '/files/' + src)
			$("#thabpic-box > a[rel=external]").attr("href", '/files/' + src)
			$("#thabpic-box > a[rel=external] > img").css("border", "2px red solid");
			$("#navigation-top").append("<span style='width: 40%; margin-left: 2%' ><b>újraélesztve :)</b></span>");
		}
	});
}



// ==/UserScript==