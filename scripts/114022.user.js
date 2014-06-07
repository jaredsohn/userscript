// ==UserScript==
// @name           mixcloud add downloadlink
// @description    download mixes as mp3
// @namespace      mixcloud
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @include        http://www.mixcloud.com/*
// @exclude        http://www.mixcloud.com/ads/*
// @exclude        http://www.mixcloud.com/media/*
// ==/UserScript==

var forcedownloadurl = "http://gmforcedl.cwsurf.de/forcedown.php";
$(document).ready(function () {
	forcedownloadurl = forcedownloadurl + '?url=\'+ encodeURIComponent( $(this).attr("href") ) + "&filesize="+$(this).attr("filesize")+ "&filename="+ encodeURIComponent( $(this).attr("filename") );';
										
         
var dlbutton_text = "Download";




						window.setTimeout(function () {
																					var GM_JQ = document.createElement('script');
																					GM_JQ.type = 'text/javascript';    
																					GM_JQ.innerHTML = "\n$('.dlbutton').live('click', function() {\n window.location.href='"+ forcedownloadurl + "\n});\n";
																					document.getElementsByTagName('head')[0].appendChild(GM_JQ); 
						}, 1000);
						
						

						var subject = window.location.href;
						var jsonurl = subject.replace(/http:\/\/www\.mixcloud\.com\/(.*?)\/$/ig, "http://www.mixcloud.com/api/1/cloudcast/$1.json");

						$.getJSON(jsonurl, function (json) {
								$.each(json.audio_formats.mp3, function (i, item) {
										var return_var;
										GM_xmlhttpRequest({
												url: item,
												method: "HEAD",
												onload: function (response) {
														
														if (response.status == 200 && $(".dlbutton").size() == 0) {
																var filesize = json.audio_length * 128 *1024;
																$(".cloudcast-titles div.follow-edit-btn").append("<a style='margin-left: 5px; padding: 2px; padding-top: 0px' class='dlbutton mx-btn' target='_blank' onclick='return false;' filename='" + json.name + "' filesize='" + filesize + "' href='" + item + "'><span style='font-size: 80%'>" + dlbutton_text + "</span></a>");
																$(".cloudcast-titles div.follow-edit-btn").append("<a style='padding: 0px;' class='mx-btn dlbutton' href='"+ item.replace(/http:\/\//ig, "jd://") +"'><img src='http://jdownloader.org/_media/de/ico.png?cache=cache&w=16&h=16'></a>");
																return_var = false;
														}
												}
										});
										return return_var;

								});
							});

});