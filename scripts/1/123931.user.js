// ==UserScript==
// @name           EZTV Transmission Web
// @namespace      lalakis
// @description    Embed EZTV into Transmission's web interface
// @include        http://127.0.0.1:9091/transmission/web/
// ==/UserScript==
$ = unsafeWindow.jQuery;

function initUI()
{
	(function() {
		var menu = $("#toolbar");
		
		var btn = $('<div id="toolbar-eztv" title="EZTV"></div>')
			.click(openEZTV)
			.appendTo(menu);
	})();
	
	(function() {

	var css = 
	""
+	"#toolbar-eztv { background: url(\"http://eztv.it/favicon.ico\") no-repeat; background-size: 32px 32px; float: right !important; }"
+	"#eztv_container .dialog_window > a { width: auto; min-width: 50px; }"
+	"#eztv_container .dialog_window { border: 1px solid rgb(119, 119, 119); width: 80%; max-width: 600px; min-width: 420px; }"
+	"#eztv_container .dialog_window > h2 { float: none; width: auto; margin: 16px 16px 0; }"
+	"#eztv_data { width: 100%; max-height: 400px; overflow: auto; clear: both; float: none; padding: 8px 16px; -moz-box-sizing: padding-box; -webkit-box-sizing: padding-box; box-sizing: padding-box; }"
+	"#eztv_data > table { width: 100%; height: 100%; }"
+	"#eztv_data > table td { white-space: nowrap; text-overflow: ellipsis; text-align: right;}"
+	"#eztv_data > table tr.watched td { opacity: 0.25; }"
+	"#eztv_data > table tr.watched td.watched { visibility: hidden; }"
+	"#eztv_data > table td.name { width: 100%; text-align: left; }"
+	"#eztv_data > table a.torrent {"
+		'background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAB3RJTUUH2AwZFjg6E2B7fQAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAIYSURBVHjajVNNaxNRFD1vMjOZSW2mKumqWQjB/AjBTTEoRRDduKl2IyV+pba7RhBcBBoqKAgRF4KIYKUgLsWFO3FrsDRiIpWkfkQTyHQy35nnmwdFGvLhZS5zmffOuWfuO49gSBQKhae/f9UvqaoCv9cDiLJTLBaP9e8ThxEIAk0u3noAwxYRUwk2nxVU3/cEUZSC/yKgLDpmBH90As0HgoDSgY2GEfQYgmPCh6XXC9DffSSB69qiwzrbDhC+HdchnmNNjiW4t76eW7y5Qi0aO+H6EXRtwLDYgnx4ejl/V1/N51+MJMhms68kCZ3Mhby4/RXUZAp2GsDJuRXiERG5G9c3MC4s00heWVree/KW0tx9Sh++pnRh6Q798f3b2ZFA27Ynm83mcV3XtS+ft+bOXFygj95QmplfpR/ev7ttGEY0XHccR93HkP2iUqlcq9Vqa6qqTrAThCzLvmN1hccvN4XL589Bi095rutKXKFltdPp9NVUKrXBCUqlUl3TtBn2kRno31gIIeju6VAnDvGaD43I8H0X25VPME2rzncnEomZ2dlZKIpyIKPRKI4mpsFU8ZQlBYazBdvbRebU6ZA0yZ3I5KLRaIS/weuBjmPKOm0TUnoe7Z8MQz5yUk7ABoN4PH5Afn8EQYD4lAp79zmO9Cgst8NxnKBarTLnuYjFYuFJDCSg/CoQRJgXiEBQLpfRarXGWmJs/AXy/e/h5a63kgAAAABJRU5ErkJggg==");'
+		"display: inline-block;"
+		"width: 16px; height: 16px;"
+		"margin: 0 3px 0 0;"
+		"border: none; padding: 0; float: none; cursor: pointer;"
+	"}"
	;
	GM_addStyle(css);

		var s = 
		'<div class="dialog_container" id="eztv_container" style="display:none;">'
		+	'<div class="dialog_top_bar"></div>'
		+	'<div class="dialog_window">'
		+		'<h2 class="dialog_heading">EZTV My Page</h2>'
		+		'<div id="eztv_data" class="dialog_message">'
		+		'</div>'
		+		'<a href="#close" id="eztv_close_button">Close</a>'
		+		'<a href="#reload" id="eztv_reload_button">Reload</a>'
		+		'<a href="#watched" id="eztv_watched_button">Watched All</a>'
		+	'</div>'
		+'</div>';
		
		var d = $(s);
		d.find("#eztv_watched_button").click(function(e) {
			e.preventDefault();
			setTimeout(function() {
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://eztv.it/myshows/watched/all/",
					onload: function(response) {
						eztvUpdate(response.responseText);
					},
					onerror: function() {
						alert("Error loading from eztv.it");
					}
				})
			}, 1);
		});
		d.find("#eztv_reload_button").click(function(e) {
			e.preventDefault();
			eztvLoad();
		});
		d.find("#eztv_close_button").click(function(e) {
			e.preventDefault();
			d.hide();
		});
		
		
		d.appendTo("#transmission_body");
		
	})();
	
}

function eztvUpdate(text)
{
	var doc = $(text);
	var shows = [];
	doc.find('table tr[name="hover"]').each(function() {

		var cells = $(this).find("> td");

		var show = {
			watched: cells.eq(0).find("> a").attr("href"),
			name: cells.eq(1).find("> a").text(),
			torrents: [],
			date: cells.eq(2).text()
		};
		
		cells.eq(2).find("> a").each(function() {
			show.torrents.push($(this).attr("href"));
		});
		
		shows.push(show);
	});
	
	var table = $("<table></table>");
	for (var i=0; i<shows.length; i++)
	{
		var show = shows[i], tr, td;

		tr = $("<tr></tr>").appendTo(table);
		
		// Name
		td = $("<td></td>").addClass("name").appendTo(tr).text(show.name);
		
		// Torrents
		td = $("<td></td>").addClass("torrents").appendTo(tr);
		for(var t=0; t<show.torrents.length; t++)
		{
			$("<a></a>").addClass("torrent").attr("href", show.torrents[t]).appendTo(td).click(
				function(e) {
					e.preventDefault();
					unsafeWindow.transmission.remote.addTorrentByUrl(
						$(this).attr("href"), {
							paused: false
						});
				});
		}
		
		// Watched
		td = $("<td></td>").addClass("watched").appendTo(tr);
		$("<button></button>").text("Watched").data("url", show.watched).appendTo(td).click(
			function(e) {
				
				$(this).attr("disabled", true);
				var _this = this;
				setTimeout(function() {
					GM_xmlhttpRequest({
						method: "GET",
						url: "http://eztv.it" + $(_this).data("url"),
						onload: function(response) {
							$(_this).closest("tr").addClass("watched");
							//eztvUpdate(response.responseText);
						},
						onerror: function() {
							$(_this).removeAttr("disabled");
							alert("Error loading from eztv.it");
						}
					})
				}, 1);
				
			});
	}
	
	$("#eztv_data").empty().append(table);
}

function eztvLoad()
{
	
	$("#eztv_container h2.dialog_heading").text("Loading...");
	setTimeout(function() {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://eztv.it/myshows/",
			onload: function(response) {
				$("#eztv_container h2.dialog_heading").text("EZTV My Page");
				eztvUpdate(response.responseText);
			},
			onerror: function() {
				alert("Error loading from eztv.it");
			}
		})
	}, 1);
}

function openEZTV()
{
	if ($("#eztv_container").is(":visible"))
	{
		$("#eztv_container").hide();
	}
	else
	{
		$("#eztv_container").show();
		eztvLoad();
	}
}

$(function() {
	
	setTimeout(function() {
		initUI();
	}, 1);

});
