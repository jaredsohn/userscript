// ==UserScript==
// @name		Fix BanniNation
// @description	fixes up various parts of the bn ui
// @version		20
// @downloadURL	https://userscripts.org/scripts/source/36110.user.js
// @updateURL	https://userscripts.org/scripts/source/36110.meta.js
// @namespace	http://www.bannination.com/fixbn
// @include		http://www.bannination.com/*
// @include		http://bannination.com/*
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_log
// @grant		GM_addStyle
// @grant		GM_getResourceText

// @require		https://ajax.aspnetcdn.com/ajax/jquery/jquery-1.11.0.min.js
// @require		https://ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.2.1.min.js
// @require		https://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.3/jquery-ui.min.js
// @require		https://raw.github.com/markitup/1.x/master/markitup/jquery.markitup.js
// @require		https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @require		https://raw.github.com/medialize/URI.js/gh-pages/src/URI.min.js
// @require		https://raw.github.com/accursoft/caret/master/jquery.caret.js
// @require		https://raw.github.com/dimsemenov/Magnific-Popup/master/dist/jquery.magnific-popup.js
// @require		https://raw.github.com/needim/noty/master/js/noty/packaged/jquery.noty.packaged.min.js
// @require		https://raw.github.com/bgrins/spectrum/master/spectrum.js
// @require		https://raw.github.com/ksylvest/jquery-age/master/javascripts/jquery.age.js
// @require		https://raw.github.com/artificeren/jqSmartTag/master/site/script/jquery.smartTag.js
// @require		https://raw.github.com/silvestreh/onScreen/master/jquery.onscreen.min.js

// @resource	juipepper	https://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.10/themes/pepper-grinder/jquery-ui.css
// @resource	magnificcss https://raw.github.com/dimsemenov/Magnific-Popup/master/dist/magnific-popup.css
// @resource	spectrumcss	https://raw.github.com/bgrins/spectrum/master/spectrum.css
// ==/UserScript==
/* jshint  browser: true*/
/* global $, jQuery, URI, GM_config, GM_addStyle, GM_getResourceText, GM_configStruct, GM_getValue, GM_setValue, noty */

// main code
var __fixbn = null;
try {
	(function ($) {
		"use strict";

		var FixbN;
		var $bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; };
		var $root = null;

		FixbN = (function () {
			// ctor
			function FixbN() {
				this.fix = $bind(this.fix, this);
				this.fixAllPages = $bind(this.fixAllPages, this);
				this.fixHeadlinesPages = $bind(this.fixHeadlinesPages, this);
				this.fixCommentsPage = $bind(this.fixCommentsPage, this);
				this.fixQueuePage = $bind(this.fixQueuePage, this);
				this.fixTaggers = $bind(this.fixTaggers, this);
				this.createDateUrl = $bind(this.createDateUrl, this);

				var mainConfigFrame = $("<div style='display:none;' />")[0];
				document.body.appendChild(mainConfigFrame);
				GM_config.init({
					'id': 'FixbNconfig',
					'title': 'Fix bN Global Settings',
					'fields': {
						'switchColumns': {
							'label': 'Switch Headline and Comment Columns',
							'type': 'checkbox',
							'default': true
						},
						'fixedHeader': {
							'label': "Keep Header at Top of Window",
							'type': 'checkbox',
							'default': true
						},
						'scrollArrow': {
							'label': 'Show a Floating Arrow for Scrolling',
							'type': 'checkbox',
							'default': true
						},
						'stickyTagger': {
							'label': "Show a Floating Tagger in Comment Threads",
							'type': 'checkbox',
							'default': true
						},
						'tagNotyDuration': {
							'label': 'Tag Notification Duration',
							'type': 'int',
							'min': 3,
							'max': 30,
							'default': 6
						},
						'repliesOveride': {
							'label': "Override the masterbn replies notification",
							'type': 'checkbox',
							'default': true
						},
						'ignoreReplies': {
							'label': "Ignoring a User Also Ignores All Replies To That User",
							'type': 'checkbox',
							'default': true
						},
						'showRepliesToMe': {
							'label': "Show a List of Comments That Are Replies To Me",
							'type': 'checkbox',
							'default': true
						},
						'nabbitVisibility': {
							'label': "Enable Nabbit User Images (Can Be Overridden Per-User)",
							'type': 'checkbox',
							'default': true
						},
						'highScoreThreshold': {
							'label': "Mark Posts With Scores Over:",
							'type': 'int',
							'default': '4'
						},
						'autoLinkComments': {
							'label': "Auto-linkify pasted URLs",
							'type': 'checkbox',
							'default': false
						}
					},
					'frame': mainConfigFrame
				});
				GM_config.onSave = function () { if (GM_config.isOpen) { GM_config.close(); window.location.reload(); } };
				GM_config.onOpen = function (doc, win, frame) {
					var notyDuration = $(frame).find("input[id$='tagNotyDuration']");
					notyDuration.css("width", "3em");

					$(frame).find("input[id$='highScoreThreshold']").css("width", "3em");

					var wrapper = $(frame).find("div#FixbNconfig_wrapper");
					var extras = $("<div style='float:right; text-align:right; font-weight: bold; margin-top:40px; margin-right:10px;'></div>");
					wrapper.prepend(extras);

					
					$("<p><a style='font-size:14px; color:black;' href='http://www.bannination.com/comments/5182401/'>Bannination.com Feedback Thread</a></p>").appendTo(extras);
					$("<p><a style='font-size:14px; color:black;' href='https://github.com/artificeren/FixbN/issues?state=open'>Fix bN GitHub Project Feedback</a></p>").appendTo(extras);

					var bitCoinDonate = $('<div style="font-size:14px;margin:0 auto;width:300px" class="blockchain-btn" data-address="1Fe2d6giUvTMJniufMyivybg6v6HQGpeXG" data-shared="false"> <div class="blockchain stage-begin"><p style="text-decoration:underline;cursor:pointer;"> Donate Bitcoin to Fix bN </p></div> <div class="blockchain stage-loading" style="text-align:center"> <img src="data:image/gif;base64,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"/> </div> <div class="blockchain stage-ready"> <p>Bitcoin Address: <span style="font-size:12px;">[[address]]</span></p> <p class="qr-code"></p> </div> <div class="blockchain stage-paid"> <p>Donation of <b>[[value]] BTC</b> Received. Thank You.</p> </div> <div class="blockchain stage-error"> <font color="red">[[error]]</font> </div> </div>');
					bitCoinDonate.appendTo(extras).bitcoin();

					$(frame).find("#FixbNconfig_saveBtn").text(" OK ");
					$(frame).find("#FixbNconfig_closeBtn").text("Cancel");
				};
				
			}

			FixbN.prototype.fix = function () {

				this.$root = $("html, body");

				try {
					var firstMenuItem = $("div#menu ul:first li:first");
					$("<li><span title='Fix bN Version {0}' style='text-decoration:underline;cursor:pointer;'>fix bN</span></li>".fex(GM_info.script.version))
						.insertAfter(firstMenuItem)
						.click(function () { GM_config.open(); })
						.attr("title", "Settings for the Fix bN addon");
					firstMenuItem.after("\r\n\r\n");

				} catch (ex) {
					console.error("FixbN failed adding options menu item", ex);
				}

				try {
					this.fixAllPages();
				} catch (ex) {
					console.error("FixbN failed the allPages fixup", ex);
				}

				try {
					this.fixHeadlinesPages();
				} catch (ex) {
					console.error("FixbN failed the Headlines page fixup", ex);
				}

				try {
					this.fixCommentsPage();
				} catch (ex) {
					console.error("FixbN failed the Comments page fixup", ex);
				}

				try {
					this.fixQueuePage();
				} catch (ex) {
					console.error("FixbN failed the Queue page fixup", ex);
				}

				try {
					this.fixTaggers();
				} catch (ex) {
					console.error("FixbN failed the Tagging fixup", ex);
				}

			};

			FixbN.prototype.fixAllPages = function () {
				// there was a bug where jsessionid caused problems, not sure if still needed
				if ($("#banner a").first().attr("href").indexOf("jsessionid") > 0) {
					document.location.reload();
				}

				// optionally keep the header fixed to the top of the window
				if (GM_config.get("fixedHeader")) {
					var header = $("div#header");
					header.addClass("fixedHeader");
					$("div#main").addClass("fixedHeader");
					var $style = $("<style type='text/css'>").appendTo('head'); 

					var bindTopMargin = function() {
						$("body").css("margin-top", $("div#header").height());
						var $style = $("<style type='text/css'>").appendTo('head');
						var adjustment = $("div#header").height() + 10;
						$style.html("div#main.fixedHeader a:target { padding-top: " + adjustment + "px; margin-top: -" + adjustment + "px; }");
					};
					$(window).resize(bindTopMargin);
					bindTopMargin();
					window.setTimeout(bindTopMargin, 200);

				} else {
					$("<style type='text/css'> div#main a:target { padding-top: 50px; margin-top: -50px; } </style>").appendTo('head');
				}

				// scroll To Bottom/Top buttons
				if (GM_config.get("scrollArrow")) {
					var scrollToBottom = $("<div class='fbnScrollToBottom' style='width:64px; height:64px;'><img title='Scroll To Bottom' alt='Scroll To Bottom' src='data:image/png;base64,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' /></div>");
					scrollToBottom
						.prependTo($("div#main"))
						.click((function () { this.$root.animate({ scrollTop: $(document).height() - $(window).height() }); }).bind(this));

					var scrollToTop = $("<div class='fbnScrollToTop' style='display: none; width:64px; height:64px;'><img title='Scroll To Top' alt='Scroll To Top' src='data:image/png;base64,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' /></div>");
					scrollToTop
						.prependTo($("div#main"))
						.click((function () { this.$root.animate({ scrollTop: 0 }); }).bind(this));

					$("div#footer").onScreen({
						doIn: function () {
							$("div.fbnScrollToBottom").hide();
							$("div.fbnScrollToTop").show();
						},
						doOut: function () {
							$("div.fbnScrollToTop").hide();
							$("div.fbnScrollToBottom").show();
						}
					});
				}

				// split the menu
				var leftMenu = $("<ul class='leftMenu'></ul>");
				leftMenu
				.append($("div#menu a[href$='/queue']").closest("li"))
				.append("<li><a href='{0}'>today</a></li>".fex(this.createDateUrl(0)))
				.append("<li><a href='{0}'>yesterday</a></li>".fex(this.createDateUrl(-1)))
				.append("<li><a href='{0}' title='Damn You, Dictionary! This Is A Great Word!'>ereyesterday</a>".fex(this.createDateUrl(-2)))
				.append($("div#menu a[href^='http://wiki']").closest("li"))
				.append("<li><a href='/comments/1000' class='fbnBgLink " + $("div#welcome a[href='/comments/1000']").attr("class") + "'>beer garden</a></li>")
				.prependTo("div#menu");

				if ((new Date()).getHours() < 8 && $("div#menu a:contains('dangerous mode')").length > 0) {
					leftMenu.append("<li class='nsfw'><a href='/comments/901' class='nsfw'>strip club</a></li>");
				}

				// consolidate the profile links
				try {
					var profilePopup = $("<div class='profilePopup' style='min-width:200px;margin:0px;padding:10px;color:white;position:absolute;display:none;right:0px;background:#373737;z-index:1001;' />");
					if (GM_config.get("fixedHeader")) {
						profilePopup.css("position", "fixed");
					}
					profilePopup.appendTo("body");
					var selfItem = $("div#menu li:contains('logged in as')");
					if (selfItem.length !== 0) {
						var selfLink = selfItem.find("a");
						selfLink.remove();
						selfItem.empty().append(selfLink).append(" ");

						var originalLogoutLink = selfLink.closest("li").next("li").find("a");
						originalLogoutLink.closest("li").hide();
						var list = selfLink.closest("ul");

						originalLogoutLink.appendTo(profilePopup);
						var profileLink = selfLink.clone();
						profileLink.text("profile");
						profilePopup.prepend(profileLink);

						profileLink.css("float", "right").addClass("topLink");
						originalLogoutLink.css("float", "left").addClass("topLink");

						var recentCommentWrapper = $("<div class='recentCommentWrapper' style='clear:both;margin-top:5px;' />");
						recentCommentWrapper.appendTo(profilePopup);
						var loadComments = function () {
							var userPageUrl = profileLink.attr("href");
							$.ajax({
								url: userPageUrl,
								dataType: "text",
								success: function (data, textStatus, jqXHR) {
									var comments = data.substring(data.indexOf("<h2>Recent Comments</h2>"));
									comments = comments.substring(0, comments.indexOf("<h2>Account Settings</h2>") - 1);
									recentCommentWrapper.css("overflow-y", "scroll").css("height", $(window).height() - 200);
									recentCommentWrapper.html(comments);
									profilePopup.css("width", $("div#menu").width() / 1.5).position({
										my: "right top",
										at: "right bottom",
										of: $("div#menu"),
										collision: "none"
									});
									recentCommentWrapper.find("h2").css({ "cursor": "pointer" }).click(loadComments);
								},
								error: function () {
									window.location.href = userPageUrl;
								}
							});

						};
						selfLink.click(function (event) {
							event.preventDefault();
							try {
								profilePopup.toggle();
								if (profilePopup.is(":visible")) {
									profilePopup.position({
										my: "right top",
										at: "right bottom",
										of: $("div#menu"),
										collision: "fit"
									});
									loadComments();
								}
							} catch (ex) {
								console.error(ex);
							}
						});

					}
				} catch (ex) {
					console.error("FixbN Failed consolidating profile links", ex);
				}

				// fix the masterbn replies box
				if (GM_config.get("repliesOveride")) {
					$("div#replies").hide().data("replies", $("div#replies").html());
					var replyNoty = null;
					window.setInterval(function () {
						var mbnReplies = null;
						try {
							var replies = $("div#replies");
							if (replies.html() === replies.data("replies")) {
								return;
							}
							replies.data("replies", replies.html());
							mbnReplies = [];
							var mbnRepliesConfigsPromises = [];
							replies.contents().filter(function () {
								return this.nodeType === 3; //Node.TEXT_NODE
							}).each(function () {
								try {
									var words = this;
									var rplyUsername = words.nodeValue.trim();

									if (rplyUsername.indexOf("has replied to your comment in thread") > 0) {
										rplyUsername = rplyUsername.substring(0, rplyUsername.indexOf("has replied to your comment in thread")).trim();

										var link = $(words.nextSibling);

										mbnReplies.push(
											{
												username: rplyUsername,
												url: link.attr("href"),
												threadTitle: link.text()
											});
										mbnRepliesConfigsPromises.push(__userConfig.getConfigPromise(rplyUsername, null));
									}
								} catch (ex) {
									console.error("FixbN Failed creating masterbn reply info", ex);
								}

							});

							$.when.apply(this, mbnRepliesConfigsPromises).then(function () {
								try {
									var mbnConfigs = {};
									for (var x = 0; x < arguments.length; x++) {
										var replierConfig = arguments[x];
										mbnConfigs[replierConfig.bnUsername] = replierConfig;
										replierConfig.onSave.callbacks.add(function () {
											$("div#replies").data("replies", "force refresh");
										});
									}

									var mbnRepliesHtml = [];
									for (var i = 0; i < mbnReplies.length; i++) {
										var replyInfo = mbnReplies[i];
										if (mbnConfigs[replyInfo.username].get("visibility") !== "Ignore") {
											mbnRepliesHtml.push("<span class='notyReply'><a href='{url}' title='{threadTitle}'>{username}</a></span>".fex(replyInfo));
										}
									}

									if (mbnRepliesHtml.length > 0) {
										if (replyNoty === null) {
											replyNoty = new noty({
												layout: 'topCenter',
												text: mbnRepliesHtml.join(" <span class='notyReplyDivider'> | </span> "),
												type: "information",
												timeout: false,
												force: true,
												callback: {
													onClose: function (theNoty) {
														replyNoty = null;
														$.ajax("/post?action=clear_notifcations", { dataType: "text", global: false });
													}
												}
											});
										} else {
											replyNoty.text = mbnRepliesHtml.join(" <span class='notyReplyDivider'> | </span> ");
										}
									}

								} catch (ex) {
									console.error("FixbN Failed creating noty for masterbn replies", ex);
								}

							});

						} catch (ex) {
							console.error("FixbN Failed masterbn reply override", ex);
						}

					}, 500);
				}
				
			};

			FixbN.prototype.fixHeadlinesPages = function () {
				if (!bnurl.isHeadlinesPage()) {
					return;
				}

				// fuck the welcome
				$("div#welcome").css("display", "none");

				// fix bydate stories
				if (bnurl.isHeadlinesByDate()) {
					var stories = $("table#stories tr");
					if (stories.length) {
						// the bydate table has an incorrect number of columns in the header
						stories[0].removeChild(stories[0].cells[1]);

						// move headline after the discuss link
						if (GM_config.get("switchColumns")) {
							stories.each(function () {
								$(this).append(this.cells[0]);
							});
						}
					}

					// stories should show nsfw tags
					$("table#stories tr.nsfw a.storylink").css({
						"padding-right": "85px",
						"background": "url('http://www.bannination.com/img/nsfw.jpg') no-repeat scroll right center transparent"
					});

				}

				// fix by-score headlines
				if (bnurl.isHeadlinesByScore()) { 

					// fix up the tag cloud
					$("div#tag_cloud").css("width", "90%");

					
					if (GM_config.get("fixedHeader")) {
						$("div#tag_cloud span").click((function (evt) {
							var c = "tag_" + $(evt.target).text().replace(/[^a-z]/g, "");
							window.setTimeout(function () {
								try { 
									this.$root.animate({
										scrollTop: $("." + c + ":first").offset().top - $("div#header").height() - 10
									}, 50);
								} catch (ex) {
									console.error("Fix bN Failed correcting tag scroll", ex);
								}
							}.bind(this), 600);
						}).bind(this));
					}
					

					// move the welcome title to the top of the tag cloud
					var bnTitleTagline = $("div#welcome p").first().text();
					$("div#tag_cloud center").first().text(bnTitleTagline);
					if ($("div#tag_cloud center").last().text() === "[tag cloud hidden]") {
						$("div#tag_cloud").html("<center>" + bnTitleTagline + "</center>");
					}

					// queue link can get extra info from the main page welcome
					var queueEntries = $("div#welcome a[href='/queue']").text().replace(/[^\d\.]/g, '');
					if (queueEntries && queueEntries !== "") {
						$("div#menu a[href$='/queue']").append(" (" + queueEntries + ")");
					}

					// move headline after the discuss link
					if (GM_config.get("switchColumns")) {
						$("div.storytable_row").each(function () {
							var storyRow = $(this);
							storyRow.append(storyRow.children("div.headline_cell"));
						});
					}

				}
			};

			FixbN.prototype.fixCommentsPage = function () {
				if (!bnurl.isCommentsPage()) {
					return;
				}

				var threadId = $("h1").first().attr("id").substring(1);
				if (!threadId) {
					return;
				}

				// add calendar to beer garden
				var beerGardenHeader = $("h1#s1000");
				if (beerGardenHeader.length > 0) {
					var bgDatePicker = $("<input type='hidden' id='bgDatePicker' />");
					bgDatePicker.prependTo("h1#s1000").datepicker({
						showOn: "button",
						buttonImage: "https://cdn1.iconfinder.com/data/icons/Pretty_office_icon_part_2/16/event.png",
						buttonImageOnly: true,
						changeMonth: true,
						changeYear: true,
						showAnim: 'fold',
						onSelect: function (dateText, cal) {
							var selectedDate = new Date(dateText);
							window.location.href = "/date/{year}/{month}/{day}/1000".fex({ year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1, day: selectedDate.getDate() });
						}
					});
				}

				// store the userid and username and score in each header data
				$("div.ch").each(function () {
					var header = $(this);
					header.data("uname", header.find("span.ui").text());
					var uidSpan = header.find("span.uid");
					if (uidSpan.length === 0) {
						header.data("uid", 0);
					} else {
						header.data("uid", uidSpan.text());
					}
					var score = header.find("span.score span").text();
					header.data("score", score);
				});

				// clear out tag instructions
				var tagCloud = $("td.current_tags");
				if (tagCloud.text().indexOf("add relevant short tags using the box to the left") > 0) {
					tagCloud.empty();
				}
				if (tagCloud.text().indexOf("[tag cloud hidden]") > 0) {
					$("div#tag_story").css("display", "none");
				}

				// more clickable refresh link
				$("a.commentslink")
					.last()
					.clone()
					.empty()
					.removeClass("commentslink")
					.addClass("commentsLinkButton")
					.append("<img title='check for more comments' src='data:image/png;base64,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' />")
					.prependTo("div#comment_form form");

				// score/sunlight
				$.fn.sunlight.defaults.handler = function (sunlight) {
					this.attr("title", sunlight.blame).text("score (" + sunlight.cool + "|" + sunlight.uncool + ")");
					this.closest("div.ch").data("score", parseInt(sunlight.cool) - parseInt(sunlight.uncool));
					this.closest("div.ch").find("span.uid").userDecoration("update");
				};
				$.fn.sunlight.defaults.threadId = threadId;

				// auto-load my own comment sunlight
				$("div.uc span.score").css("cursor", "pointer").sunlight();
				// click to load/refresh all comment sunlight
				$("div.ch span.score").css("cursor", "pointer").sunlight({ event: 'click' });

				// nabbit and pretty dates
				$.fn.nabbit.defaults.userId = function () { return this.closest("div.ch").data("uid"); };
				$.fn.nabbit.defaults.username = function () { return this.closest("div.ch").data("uname"); };

				$("div.ch span.uid").nabbit({
					imgSize: 'small',
					imgClass: 'nabbitSmall',
					imgTitle: $.fn.nabbit.defaults.userId
				});

				// pretty dates
				var timeSpans = $("div.ch span.time");
				timeSpans.each(function () {
					var bigSpot = $(this);

					var postTime = bigSpot.text();
					var cleanTime = (postTime || "").replace(/-/g, "/").replace(/\.0/g, " PST"); // HACK!
					bigSpot.attr("datetime", cleanTime);
					bigSpot.attr("title", postTime);
					bigSpot.age({ suffixes: { past: "ago", future: "from now" } });

				});

				// nabbit big images
				timeSpans.nabbit({ 
					imgSize: 'large',
					imgClass: 'nabbitBig',
					imgTitle: function () { return this.text(); },
					loaded: function (img) {
						this.next("span.time").remove();
						this.after($("<span class='time'></span>").append(img));
					}
				});

				// anon
				$("div.ch.u0").find("span.ui").html(function (index, text) {
					return "~ " + text.substring(30);
				}).after("<span class='uid'><img title='settings' src='https://cdn1.iconfinder.com/data/icons/hamburg/32/settings.png' style='height:1em; width:1em;' /></span>");

				// add out-of-page quotes to the style
				/* jshint -W064 */
				GM_addStyle("div.cb a[href^='/comments/{0}'] { color:black; }".fex(threadId));
				/* jshint +W064 */

				// add user decoration to userid span
				$("div.ch span.uid").userDecoration({
					'threadId': threadId,
					onImageReplaced: function () {
						$(this).magnificPopup({ type: 'image', verticalFit: true, closeOnContentClick: true, showCloseBtn: false });
					}
				});

				// html comment editor
				$('textarea').markItUp({
					/* jshint ignore:start */
					resizeHandle: false,
					markupSet: [
						{ name: 'Bold', key: 'B', openWith: '<b>', closeWith: '</b>', className: 'miuBold' },
						{ name: 'Italic', key: 'I', openWith: '<i>', closeWith: '</i>', className: 'miuItalic' },
						{ name: 'Stroke through', key: 'S', openWith: '<strike>', closeWith: '</strike>', className: 'miuStrike' },
						{
							name: 'Colors', className: 'palette', dropMenu: [
								{ name: 'Yellow', openWith: '<font color="#FCE94F">', closeWith: '</font>', className: "col1-1" },
								{ name: 'Yellow', openWith: '<font color="#EDD400">', closeWith: '</font>', className: "col1-2" },
								{ name: 'Yellow', openWith: '<font color="#C4A000">', closeWith: '</font>', className: "col1-3" },

								{ name: 'Orange', openWith: '<font color="#FCAF3E">', closeWith: '</font>', className: "col2-1" },
								{ name: 'Orange', openWith: '<font color="#F57900">', closeWith: '</font>', className: "col2-2" },
								{ name: 'Orange', openWith: '<font color="#CE5C00">', closeWith: '</font>', className: "col2-3" },

								{ name: 'Brown', openWith: '<font color="#E9B96E">', closeWith: '</font>', className: "col3-1" },
								{ name: 'Brown', openWith: '<font color="#C17D11">', closeWith: '</font>', className: "col3-2" },
								{ name: 'Brown', openWith: '<font color="#8F5902">', closeWith: '</font>', className: "col3-3" },

								{ name: 'Green', openWith: '<font color="#8AE234">', closeWith: '</font>', className: "col4-1" },
								{ name: 'Green', openWith: '<font color="#73D216">', closeWith: '</font>', className: "col4-2" },
								{ name: 'Green', openWith: '<font color="#4E9A06">', closeWith: '</font>', className: "col4-3" },

								{ name: 'Blue', openWith: '<font color="#729FCF">', closeWith: '</font>', className: "col5-1" },
								{ name: 'Blue', openWith: '<font color="#3465A4">', closeWith: '</font>', className: "col5-2" },
								{ name: 'Blue', openWith: '<font color="#204A87">', closeWith: '</font>', className: "col5-3" },

								{ name: 'Purple', openWith: '<font color="#AD7FA8">', closeWith: '</font>', className: "col6-1" },
								{ name: 'Purple', openWith: '<font color="#75507B">', closeWith: '</font>', className: "col6-2" },
								{ name: 'Purple', openWith: '<font color="#5C3566">', closeWith: '</font>', className: "col6-3" },

								{ name: 'Red', openWith: '<font color="#EF2929">', closeWith: '</font>', className: "col7-1" },
								{ name: 'Red', openWith: '<font color="#CC0000">', closeWith: '</font>', className: "col7-2" },
								{ name: 'Red', openWith: '<font color="#A40000">', closeWith: '</font>', className: "col7-3" },

								{ name: 'Gray', openWith: '<font color="#FFFFFF">', closeWith: '</font>', className: "col8-1" },
								{ name: 'Gray', openWith: '<font color="#D3D7CF">', closeWith: '</font>', className: "col8-2" },
								{ name: 'Gray', openWith: '<font color="#BABDB">', closeWith: '</font>6', className: "col8-3" },

								{ name: 'Gray', openWith: '<font color="#888A85">', closeWith: '</font>', className: "col9-1" },
								{ name: 'Gray', openWith: '<font color="#555753">', closeWith: '</font>', className: "col9-2" },
								{ name: 'Gray', openWith: '<font color="#000000">', closeWith: '</font>', className: "col9-3" }
							]
						},
						{ name: 'Pre', className: 'miuPre', openWith: '<pre>', closeWith: '</pre>' },
						{ separator: '---------------' },
						{ name: 'Ul', openWith: '<ul>\n', closeWith: '</ul>\n', className: 'miuUList' },
						{ name: 'Ol', openWith: '<ol>\n', closeWith: '</ol>\n', className: 'miuOList' },
						{ name: 'Li', openWith: '<li>', closeWith: '</li>', className: 'miuListitem' },
						{ separator: '---------------' },
						{ name: 'Picture', key: 'P', replaceWith: '<img src="[![Source:!:http://]!]" />', className: 'miuImage' },
						{ name: 'Link', key: 'L', openWith: '<a href="[![Link:!:http://]!]"(!( title="[![Title]!]")!)>', closeWith: '</a>', placeHolder: 'Your text to link...', className: 'miuLink' },
						{ separator: '---------------' },
						{ name: 'Clean', replaceWith: function (markitup) { return markitup.selection.replace(/<(.*?)>/g, ""); }, className: 'miuClean' },
						{ name: 'Symbols', className: 'miuSymbols', dropMenu: [
								{ name: 'Tags', openWith: '&lt;', closeWith: '&gt;' },
								{ name: '&', openWith: '&amp;' }
							]
						}
					]
					/* jshint ignore:end */
				});

				// intercept comment pastes
				$('textarea').each(function(){
					$(this).data("oldVal", $(this).val()).data("editing", false);
				}).bind('input propertychange', function (evt) {
					if (!GM_config.get("autoLinkComments")) {
						return;
					}
					try {
						var commentBox = $(this);

						var oldVal = commentBox.data("oldVal");
						var newVal = commentBox.val();
						commentBox.data("oldVal", newVal);

						if (commentBox.data("editing")) {
							console.log("leaving: editing");
							return;
						}

						if (newVal.length > oldVal.length) {
							commentBox.data("editing", true);
							try {
								var change = diff(oldVal, newVal);
								if (oldVal.indexOf(change) > 0 || change.length <= 1) {
									return;
								}
								var url = new URI(change);
								if (url.is("url") && url.protocol().indexOf("http") === 0) {
									var tag = "";

									switch (url.suffix()) {
										case "gif":
										case "jpg":
										case "jpeg":
										case "png":
											tag = "<img src='{0}' />".fex(change);
											break;
										default:
											tag = "<a href='{0}'>{0}</a>".fex(change);
											break;
									}

									var parts = newVal.split(change);
									var result = parts[0] + tag + parts[1];
									commentBox.val(result);
								}
							} catch (ex) {
								console.error(ex);
							} finally {
								commentBox.data("editing", false);
							}
						}
					} catch (ex) {
						console.log("FixbN Failed intercepting comment changes", ex);
					}
				});

				// any selective reply child quotes have font tags around them, let's style them
				/* jshint -W014 */
				$("div.cb font").filter(function () {
					var quoteChildren = $(this).contents();
					return (
						(quoteChildren.length === 3 && quoteChildren[0].tagName === "A" && quoteChildren[2].tagName === "I")
						||
						(quoteChildren.length === 2 && quoteChildren[0].tagName === "A" && quoteChildren[1].tagName === "I")
					);
					
				}).addClass("commentquote");
				/* jshint +W014 */

				// any selective reply images have been converted to links, let's style them
				$("div.cb a").filter(function () {
					var text = $(this).text();
					return text === "[quoted image removed]" || text === "image removed";
				}).magnificPopup({ type: 'image', verticalFit: true, closeOnContentClick: true, showCloseBtn: false });

				// comment warning
				var commentForm = $("div#comment_form form");
				var warning = $("div#comment_warning");
				warning.css('display', 'none');
				if (warning.text().length > 0) {
					if (warning.text().indexOf("Not Safe") > 0) {
						commentForm.append("<h2 style='display:inline;color:red;'>Not Safe For Work Allowed</h2>");
					} else {
						commentForm.append("<h2 style='display:inline;color:green;'>Keep Thread Safe For Work</h2>");
					}
					commentForm.css('width:90%;');
				}

				// comment preview
				$("div#comment_form form :submit[value='preview']").click(function (event) {
					event.preventDefault();

					if ($("textarea#comment").val().trim() === "") {
						return;
					}

					var values = $("div#comment_form form").serializeArray();
					values.push({ name: 'button', value: 'preview' });

					$.ajax({
						url: $("div#comment_form form").attr("action"),
						type: "POST",
						dataType: "text",
						data: values,
						success: function (data) {
							var commentHtml = data.substring(data.indexOf('<div class="cb" id="c0">'));
							commentHtml = commentHtml.substring(0, commentHtml.indexOf('<div id="comment_form">'));
							var previewComment = $("<div class='ch uc'><span class='ui'>Comment Preview</span></div>" + $.trim(commentHtml));

							previewComment.find("font").filter(function () {
								var quoteChildren = $(this).contents();
								/* jshint -W014 */
								return (
									(quoteChildren.length === 3 && quoteChildren[0].tagName === "A" && quoteChildren[2].tagName === "I")
									||
									(quoteChildren.length === 2 && quoteChildren[0].tagName === "A" && quoteChildren[1].tagName === "I")
									);
								/* jshint +W014 */
							}).addClass("commentquote");

							$.magnificPopup.open({
								showCloseBtn: false,
								items: {
									src: previewComment,
									type: 'inline'
								}
							});
						}
					});

				});

				// "replies to me" that I can see
				if (GM_config.get("showRepliesToMe")) {
					var myUserName = $("div#comment_form form input#username").val();
					if (myUserName) {
						var repliesToMeList = $("<ul></ul>");
						var repliesToMe = $("<div class='fbnRepliesToMe'><span class='label'>Replies To Me</span><span class='replyToMeListHolder' /></div>");
						repliesToMe.find("span.replyToMeListHolder").append(repliesToMeList);
						var visibleCommentLinks = $("div.cb:visible:not(.fbnIgnored) a[href^='#'], div.cb:visible:not(.fbnIgnored) a[href^='/comments']");
						visibleCommentLinks.filter(function () {
							return $(this).text() === myUserName;
						}).each(function () {
							var replyToMeHeader = $(this).closest("div.cb").prev("div.ch");
							if (replyToMeHeader.data("uname") !== myUserName) {
								repliesToMeList.append("<li><a href='#{0}'>{1}</a></li>".fex(replyToMeHeader.attr("id").substring(1), replyToMeHeader.data("uname")));
							}
						});
						if (repliesToMeList.find("li").length > 0) {
							repliesToMe.insertAfter($("div#main h1").first());
							repliesToMeList.parent().hide();
							repliesToMe.find("span.label").click(function () {
								repliesToMeList.parent().toggle(250);
							});
						}
					}
				}

				// add comment body smarttags/menu
				var contextMenu = $("<div id='selectionMenu' style='display:none;position:absolute;'><div id='selectionMenuQuote'>Quote this</div><hr /><div id='selectionMenuTag'>Tag this</div></div>");
				$("body").append(contextMenu);
				contextMenu.click(function (event) {
					var menu = $(this);
					try {
						var item = $(event.target);
						var text = menu.data("selectionText");
						var commentInfo = __fixbn.findCommentInfo(menu.closest("div.cb").find("div.reply a"));
						var cleanHtml = __fixbn.cleanSelection(text, commentInfo);

						switch (event.target.id) {
							case "selectionMenuQuote":
								var commentBox = $("#comment");
								if (commentBox.length) {
									$("html, body").animate({ scrollTop: $(document).height() - $(window).height() });
									var originalComment = commentBox.val();
									if (originalComment !== "") { originalComment = originalComment + "\n"; }
									try {
										commentBox.data("editing", true);
										commentBox.val(originalComment + cleanHtml + "\n\n").focus().scrollTop(commentBox[0].scrollHeight).caret(-1);
										commentBox.data("oldVal", commentBox.val());
									} catch (ex) {
										console.error(ex);
									} finally {
										commentBox.data("editing", false);
										console.log("set editing to " + commentBox.data("editing"));
									}
								} else {
									alert("You must log in to comment");
								}
								break;
							case "selectionMenuTag":
								if (GM_config.get("stickyTagger")) {
									var stickyTaggerInput = $("div.stickyTagger input");
									stickyTaggerInput.show(250);
									stickyTaggerInput.val(text);
								} else {
									alert("Enable the Floating Tagger in options to use selection tagging.");
								}
								break;
						}
					} catch (ex) {
						console.error(ex);
					}
					menu.fadeOut();
				});
				$("div.cb").smartTag({
					tagWidth: "32px",
					tagHeight: "32px",
					onClick: function (event) {
						try {
							var tag = $(this);
							var container = $(this).closest("div.cb");
							var menu = $("#selectionMenu");
							menu.data("selectionText", event.data);
							container.append(menu);
							menu.css({ top: parseInt(tag.css("top")) + parseInt(tag.css("height")), left: tag.css("left") }).fadeIn();
						} catch (ex) {
							console.error(ex);
						}
					},
					//onShowing		
					onHiding: function () {
						var menu = $("#selectionMenu");
						menu.fadeOut();
						$("body").append(menu);
					}
				});

				// make sure the standard reply scrolls the comment textarea
				if ($("#comment").length) {

					$("div.reply a").click((function () {
						//window.setTimeout(function () {
						try {
							$("html, body").animate({ scrollTop: $(document).height() - $(window).height() });
							$("#comment").focus().scrollTop($("#comment")[0].scrollHeight).caret(-1);
						} catch (ex) {
							console.error("FixbN failed scroll comment box", ex);
						}
						//}, 500);
					}));
				} else {
					$("div.reply").hide();
				}
			};

			FixbN.prototype.fixQueuePage = function () {
				if (!bnurl.isQueuePage()) {
					return;
				}

				$("input.submitform[name='headline']").attr("maxlength", "254");
			};

			FixbN.prototype.fixTaggers = function () {
				var notification = null;

				$.fn.tagn.defaults.beforeSubmit = function (tagSet) {
					var tagInput = $(this);
					tagInput.val("");
				};
				$.fn.tagn.defaults.taggingComplete = function (tagSet) {
					try {
						var accepted = 0;
						var result = $("<ul></ul>");
						for (var i = 0; i < tagSet.tags.length; i++) {
							var tag = tagSet.tags[i];
							var status = tagSet.tags[i].status;
							switch (status) {
								case "accepted":
									accepted = Math.max(accepted, parseInt(tag.message));
									result.append("<li>{0} accepted</li>".fex(tag.value));
									break;
								case "matched":
									result.append("<li>{1} matched</li>".fex(tag.message, tag.value));
									break;
								default:
									result.append("<li>{0} rejected: {1}</li>".fex(tag.value, tag.message));
									break;
							}
						}
						result.prepend("<li>{0} total tags accepted for this thread".fex(accepted.toString()));

						new noty({ 'timeout': GM_config.get("tagNotyDuration") * 1000, 'type': 'information', 'killer': true, 'text': result.html() });
					} catch (ex) {
						console.error("Fix bN Failed to notify of tagging status", ex);
					}
				};

				// heh, i couldn't disable the other submit handlers, so I just hide and copy that fucker
				if (bnurl.isCommentsPage()) {
					var storyId = $("form input[name='storyid']").val();

					var oldForm = $("form input[id^='tag']").closest("form");
					if (oldForm.length > 0) {
						var newForm = oldForm.clone(false);
						newForm.find("label[id^='tagsaccepted']").attr("id", "tagnResult").addClass("tagnResult");
						newForm.addClass("tagnForm").insertAfter(oldForm);
						oldForm.css("display", "none");
						newForm.find("input[id^='tag']").tagn({ "storyId": storyId });

						if (GM_config.get("stickyTagger")) {
							var stickyTagger = $("<div class='stickyTagger'><form><label for='stickyTaggerInput'>Tag</label><input id='stickyTaggerInput' /></form></div>");
							$("div#main").append(stickyTagger);
							stickyTagger.find("label").click(function () {
								var tagger = $("#" + $(this).attr("for"));
								tagger.toggle(250);
							});
							stickyTagger.find("input").tagn({ "storyId": storyId });
						}
					}
				}

				if (bnurl.isQueuePage()) {
					$(".storyentry form input[id^='tag']").each(function () {
						var queueStoryId = this.id.substring(3);
						var that = $(this);
						var oldQueueForm = that.closest("form");
						var newQueueForm = oldQueueForm.clone(false).addClass("tagnForm").insertAfter(oldQueueForm);
						newQueueForm.find("label[id^='tagsaccepted']").addClass("tagnResult");
						newQueueForm.find("input[id^='tag']").tagn({ "storyId": queueStoryId });
						oldQueueForm.css("display", "none");
					});
				}
			};

			FixbN.prototype.createDateUrl = function (relativeDays) {
				var linkDate = new Date();
				linkDate.setDate(linkDate.getDate() + relativeDays);
				return "/date/" + linkDate.getFullYear() + "/" + (linkDate.getMonth() + 1) + "/" + linkDate.getDate();
			};

			FixbN.prototype.findCommentInfo = function (replyLink) {
				return eval($(replyLink).attr("href").replace("javascript:reply", "(function(c,u){return { 'commentId': c, 'username': u };})") + ";"); // jshint ignore:line
			};

			FixbN.prototype.cleanSelection = function (selectionHtml, commentInfo) {
				var quote = $("<quote />").append(selectionHtml);
				quote.find("img").replaceWith(function () {
					return "<a href='" + $(this).attr("src") + "'>[quoted image removed]</a>";
				});
				quote.find("br").remove();

				var quotesToWrap = [];
				var quoteContents = quote.contents();
				/* jshint -W014 */
				quoteContents.each(function (index) {
					if (this.nodeType !== 3
						&& this.tagName === "A"
						&& quoteContents.length > index + 2
						&& quoteContents[index + 1].nodeType === 3
						&& quoteContents[index + 2].tagName === "I"
						) {

						quotesToWrap.push(index);
					}
				});
				/* jshint +W014 */
				var i;
				for (i = 0; i < quotesToWrap.length; i++) {
					var indexOfA = quotesToWrap[i];
					$(quoteContents[indexOfA]).add(quoteContents[indexOfA + 1]).add(quoteContents[indexOfA + 2]).wrapAll("<font class='commentquote' ></font>");
				}

				var result = quote.html();
				result = result.replace("</i></font>\n\n", "</i></font>\n").replace(/^[\n\r\t ]+/, "").replace(/[\n\r\t ]+$/, "");
				// wrap in a quote
				result = '<quote user="' + commentInfo.username + '" cid="' + commentInfo.commentId + '">' + result + "</quote>";

				return result;
			};

			return FixbN;

		})();

		__fixbn = new FixbN();
	})(jQuery);
} catch (ex) {
	console.error("FixbN Failed declaring __fixbn", ex);
}

// user config class
var __userConfig = null;
try {
	__userConfig = (function ($) {
		"use strict";

		var _configPromiseCache = {};
		var _idStore = null;

		function _getConfigPromise(username, userid) {
			username = _cleanUsername(username);

			var result = _configPromiseCache[username];
			if (!result) {
				var dfd = $.Deferred();

				if (typeof userid !== "undefined" && userid !== null && !isNaN(userid)) {
					_saveUserId(username, userid);
					dfd.resolve(_createConfig(username, userid));
				} else {
					var userIdPromise = _getUserIdPromise(username);
					userIdPromise.always(function (result, evt) {

						if (typeof result !== "undefined" && result !== null && typeof result.userId !== "undefined") {
							dfd.resolve(_createConfig(username, result.userId));
						} else {

							// get userid from ajax
							console.log("FixbN Looking up userId on bannination.com/users/{0}".fex(username));
							var userPageUrl = "http://www.bannination.com/users/{0}".fex(username);
							$.ajax({
								url: userPageUrl,
								dataType: "text",
								success: function (data, textStatus, jqXHR) {
									// <h1>The user bleh was not found</h1>
									// <h1> Profile for artificeren (757)</h1>
									if (data.indexOf("Profile for") > 0) {
										//lolregex
										var match = data.match("(?:<h1> Profile for [^\(]* )(.*)(?:</h1>)"); // jshint ignore:line
										var result = match[1].replace(/\(/g, '').replace(/\)/g, '');
										_saveUserId(username, result);
										dfd.resolve(_createConfig(username, result));
									}
								},
								error: function () {
									console.error("FixbN Error retrieving userid for user {0}".fex(username));
									dfd.reject(null);
								}
							});
						}
					});

				}

				_configPromiseCache[username] = dfd.promise();
			}
			return _configPromiseCache[username];
		}

		function _cleanUsername(username) {
			return (username.indexOf("~") !== 0 && username.indexOf("someone who may or may not be") !== 0) ? username : "~Anonymous";
		}

		function _createConfig(username, userId) {
			var configId = 'FixbNUser' + userId;
			var configKey = username;

			var userConfigFrame = $("<div style='display:none;' />")[0];
			document.body.appendChild(userConfigFrame);
			var config = new GM_configStruct();
			config.init({
				'id': configId,
				'title': 'Fix bN Settings for User: {0}'.fex(configKey),
				'fields':
				{
					'visibility':
					{
						'label': 'User Comment Visibility',
						'type': 'radio',
						'options': ['Normal', 'Ignore'],
						'default': 'Normal'
					},
					'ignoreReplies':
					{
						'label': 'User Being Quoted Visibility',
						'type': 'radio',
						'options': ['Shown', 'Default', 'Hidden'],
						'default': 'Default'
					},
					'blockImages':
					{
						'label': 'User Comment Image Visibility',
						'type': 'radio',
						'options': ['Normal', 'Removed'],
						'default': 'Normal'
					},
					'nabbitVisibility':
					{
						'label': 'User Nabbit Image Visibility',
						'type': 'radio',
						'options': ['Shown', 'Default', 'Hidden'],
						'default': 'Default'
					},
					'overrideIgnoreReplies':
					{
						'label': "Show This User's Replies to Ignored Users",
						'type': 'checkbox',
						'default': false
					},
					'headColor':
					{
						'label': 'Comment Header Font Color',
						'type': 'text',
						'size': 25,
						'default': ''
					},
					'headBackColor':
					{
						'label': 'Comment Header Background Color',
						'type': 'text',
						'size': 25,
						'default': ''
					}
				},
				'frame': userConfigFrame
			});
			var openCallbacks = $.Callbacks();
			openCallbacks.fire.callbacks = openCallbacks;
			config.onOpen = openCallbacks.fire;

			var saveCallbacks = $.Callbacks();
			saveCallbacks.fire.callbacks = saveCallbacks;
			config.onSave = saveCallbacks.fire;

			var closeCallbacks = $.Callbacks();
			closeCallbacks.fire.callbacks = closeCallbacks;
			config.onClose = closeCallbacks.fire;

			var resetCallbacks = $.Callbacks();
			resetCallbacks.fire.callbacks = resetCallbacks;
			config.onReset = resetCallbacks.fire;

			config.onSave.callbacks.add((function () {
				if (this.isOpen) {
					this.close();
				}
			}).bind(config));

			config.onOpen.callbacks.add(function (doc, win, frame) {
				$(frame).find("input[id$='_field_headColor'], input[id$='_field_headBackColor']").spectrum({
					clickoutFiresChange: true,
					preferredFormat: "hex6",
					showInput: true,
					showButtons: true,
					allowEmpty: true,
					showPalette: true,
					showSelectionPalette: true,
					palette: [
						"#EEEEEE",
						"#807373",
						"#955050",
						"#373737"
					],
					localStorageKey: "spectrum.fixbn.bannination"
				});
				$(frame).find(".saveclose_buttons[id$='_saveBtn']").text(" OK ");
				$(frame).find(".saveclose_buttons[id$='_closeBtn']").text("Cancel");
			});

			config.bnUsername = username;
			return config;
		}

		function _getUserIdPromise(username) {
			return __fixbndb.idStore().get(username);
		}

		function _saveUserId(username, userId) {
			try {
				$.when(__fixbndb.idStore().get(username)).then(
					function (item, evt) {
						if ( typeof item !== "undefined" && item !== null ) {
							if (item.userId !== userId) {
								__fixbndb.idStore().put({ "username": username, "userId": userId }, username);
							
							}
						} else {
							__fixbndb.idStore().add({ "username": username, "userId": userId }, username);
							
						}
					},
					function (error, evt) {
						__fixbndb.idStore().add({ "username": username, "userId": userId }, username);
					}
				);
				
			} catch (ex) {
				console.error("FixbN Failed saving userId to local storage", ex);
			}

		}

		return {
			getConfigPromise: _getConfigPromise,
			getCleanUsername: _cleanUsername
		};

	})(jQuery);
} catch (ex) {
	console.error("FixbN Failed declaring __userConfig", ex);
}

// local database
var __fixbndb = null;
try {
	__fixbndb = (function ($) {

		function _idStore() {
			return $.indexedDB("FixbN").objectStore("Users", {
				"keypath": "username",
				"autoincrement": false
			});
		}

		return {
			idStore: _idStore
		};

	})(jQuery);
} catch (ex) {
	console.error("FixbN Failed declaring __fixbndb", ex);
}

// bannination.com url tests
var bnurl = (function () {

	var url = new URI();

	function _isHeadlinesPage() {
		result = (url.path() === "/" || url.path() === "/pages/main/index.vm" || (url.segment().length > 0 && url.segment(0).toLowerCase() === "date" && url.segment().length < 5));
		return result;
	}

	function _isHeadlinesByScore() {
		result = _isHeadlinesPage && ( url.path() === "/" || url.path() === "/pages/main/index.vm" );
		return result;
	}

	function _isHeadlinesByDate() {
		result = _isHeadlinesPage() && url.segment().length > 0 && url.segment(0).toLowerCase() === "date";
		return result;
	}

	function _isCommentsPage() {
		result = url.segment().length > 0 && (url.segment(0).toLowerCase() === "comments" || (url.segment(0).toLowerCase() === "date" && url.segment().length >= 5));
		return result;
	}

	function _isCommentsPageTagable() {
		result = _isCommentsPage() && (url.segment(url.segment.length - 1) !== "1000");
		return result;
	}

	function _isQueuePage() {
		result = url.segment.length > 0 && url.segment(0).toLowerCase() === "queue";
		return result;
	}

	return {
		isHeadlinesPage: _isHeadlinesPage,
		isHeadlinesByScore: _isHeadlinesByScore,
		isHeadlinesByDate: _isHeadlinesByDate,
		isCommentsPage: _isCommentsPage,
		isCommentsPageTagable: _isCommentsPageTagable,
		isQueuePage: _isQueuePage
	};

})();

// nabbit jquery plugin
(function ($) {
	"use strict";

	var Nabbit;
	var $bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; };

	Nabbit = (function () {

		// ctor
		function Nabbit($el, settings) {
			if (settings === null) {
				settings = {};
			}

			this.uid = "";
			this.uname = "";
			this.config = null;

			this.attach = $bind(this.attach, this);
			this.update = $bind(this.update, this);

			this.$el = $el;
			this.settings = $.extend({}, $.fn.nabbit.defaults, settings);

			if (this.settings.userId) {
				if (typeof (this.settings.userId) === "function") {
					this.uid = $bind(this.settings.userId, this.$el)();
				} else {
					this.uid = this.settings.userId.toString();
				}
			} else {
				this.uid = this.$el.text();
			}
			if (this.settings.username) {
				if (typeof (this.settings.username) === "function") {
					this.uname = $bind(this.settings.username, this.$el)();
				} else {
					this.uname = this.settings.username.toString();
				}
			}

			$.when(__userConfig.getConfigPromise(this.uname, this.uid)).then(this.attach);
		}

		Nabbit.prototype.attach = function (userConfig) {

			this.config = userConfig;
			this.config.onSave.callbacks.add(this.update);

			this.update();
		};

		Nabbit.prototype.update = function () {
			var img = null;
			var imgsrc = "";
			var title = "";
			if (this.settings.imgTitle) {
				if ($.type(this.settings.imgTitle) === "function") {
					title = $bind(this.settings.imgTitle, this.$el)();
				} else if (this.settings.imgTitle !== null) {
					title = this.settings.imgTitle.toString();
				}
			}

			var imgHtml = "<img alt='{title}' title='{title}' {size} />";
			if (title !== "") {
				imgHtml = imgHtml.fex({ 'title': title });
			} else {
				imgHtml = imgHtml.fex({ 'title': "" });
			}

			switch (this.settings.imgSize) {
				case "small":
					img = $(imgHtml.fex({ 'size': "width='58' height='18'" }));
					imgsrc = "http://webmonkees.com/naBBits/" + this.uid + ".gif";
					break;
				case "large":
					img = $(imgHtml.fex({ 'size': "width='180' height='18' align='top' border='0'" }));
					imgsrc = "http://webmonkees.com/naBBits/m" + this.uid + ".png";
					break;
				default:
			}

			var globalNabbitVisibility = GM_config.get("nabbitVisibility");
			var userNabbitVisibility = this.config.get("nabbitVisibility");
			
			var visClass = "";
			switch (userNabbitVisibility) {
				case "Shown":
					visClass = "nabbitForceOn";
					break;
				case "Hidden":
					visClass = "nabbitOff";
					break;
				case "Default":
					visClass = globalNabbitVisibility ? "nabbitOn" : "nabbitOff";
					break;
			}
			img.addClass(visClass);

			if ($.type(this.settings.imgClass) === "string" && this.settings.imgClass !== "") {
				img.addClass(this.settings.imgClass);
			}

			img.load($bind(function (evt) {
				if ($.type(this.settings.loaded) === 'function') {
					$bind(this.settings.loaded, this.$el)(evt.target);
				} else {
					this.$el.empty().append(evt.target);
				}
			}, this)).attr("src", imgsrc);

		};

		return Nabbit;

	})();

	$.fn.extend({
		nabbit: function (options) {
			if (options === null) {
				options = {};
			}
			return this.each(function () {
				return new Nabbit($(this), options);
			});
		}
	});

	// settings default
	$.fn.nabbit.defaults = {
		userId: null, // string or function that returns the nabbit userId
		username: null, // string or function that returns the username
		imgTitle: null, // string of function that returns the title for the created img
		loaded: null, // function that handles the img loaded event, recieves the loaded image
		imgClass: '', // string which is added to the img css class
		imgSize: 'small' // choices: small, large
	};

})(jQuery);

// bN Sunlight jquery plugin
(function ($) {
	"use strict";

	var Sunlight;
	var $bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; };

	Sunlight = (function () {

		// ctor
		function Sunlight($el, settings) {
			if (settings === null) {
				settings = {};
			}

			this.attach = $bind(this.attach, this);
			this.load = $bind(this.load, this);

			this.$el = $el;
			this.settings = $.extend({}, $.fn.sunlight.defaults, settings);

			this.attach();
		}

		Sunlight.prototype.attach = function () {
			if (this.settings && this.settings.event && this.settings.event !== "") {
				this.$el.on(this.settings.event, this.load);
			} else {
				this.load();
			}
		};

		Sunlight.prototype.load = function () {
			var commentId = this.$el.closest("div.ch").attr("id").substring(1);

			//http://www.bannination.com/comments/5181856/sunlight/5087531
			var sunlightUrl = "http://www.bannination.com/comments/" + this.settings.threadId + "/sunlight/" + commentId;

			this.$el.data("originalcursor", this.$el.css("cursor"));
			this.$el.css("cursor", "progress");
			$.ajax({
				url: sunlightUrl,
				dataType: "text",
				success: $bind(function (data) {

					var sunlight = {
						cool: 0,
						uncool: 0,
						blame: ""
					};

					var cools = data.match(new RegExp(" Cool from (.*)\n", "g"));
					var uncools = data.match(new RegExp(" Uncool from (.*)\n", "g"));

					var i;
					if (cools && cools.length) {
						sunlight.cool = cools.length;
						for (i = 0; i < cools.length; i++) {
							sunlight.blame += "* " + cools[i];
						}
					}
					if (uncools && uncools.length) {
						sunlight.uncool = uncools.length;
						for (i = 0; i < uncools.length; i++) {
							sunlight.blame += "* " + uncools[i];
						}
					}

					if (sunlight.blame.length === 0) { sunlight.blame = "No Votes"; }

					if (this.settings && this.settings.handler) {
						($bind(this.settings.handler, this.$el))(sunlight);
					}
				}, this),
				complete: $bind(function () {
					this.$el.css("cursor", this.$el.data("originalcursor"));
				}, this)
			});
		};

		return Sunlight;

	})();

	$.fn.extend({
		sunlight: function (options) {
			if (options === null) {
				options = {};
			}
			return this.each(function () {
				return new Sunlight($(this), options);
			});
		}
	});

	// settings default
	$.fn.sunlight.defaults = {
		threadId: '0',
		handler: null,
		event: ''
	};

})(jQuery);

// bN User Decoration jquery plugin
try {
	(function ($) {
		"use strict";

		var UserDecoration;
		var $bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; };

		UserDecoration = (function () {
			// ctor
			function UserDecoration($el, settings) {
				if (settings === null) {
					settings = {};
				}

				this.userConfig = null;
				this.childConfigs = {};
				this.userId = "0";
				this.userName = "";

				this.attach = $bind(this.attach, this);
				this.showUI = $bind(this.showUI, this);
				this.updateAll = $bind(this.updateAll, this);
				this.update = $bind(this.update, this);

				this.onImageReplaced = $.Callbacks();

				this.$el = $el;
				this.$el.data("userDecoration", this);
				this.settings = $.extend({}, $.fn.userDecoration.defaults, settings);

				if (typeof this.settings.onImageReplaced === "function") {
					this.onImageReplaced.add(this.settings.onImageReplaced);
				}

				this.attach();
			}

			// attach to element
			UserDecoration.prototype.attach = function () {
				var header = this.$el.closest("div.ch");
				this.userId = header.data("uid");
				this.userName = header.data("uname");
				var body = $("div.cb.u" + this.userId + "[id$='" + header.attr("id").substring(1) + "']");
			
				var peep = $("<span class='peep' >ಠ_ಠ</span>");
				peep.click( $bind(function () {
					this.$el.closest("div.ch").removeClass("fbnIgnored");
					var body = $("div.cb.u" + this.userId + "[id$='" + header.attr("id").substring(1) + "']");
					body.slideDown('fast').removeClass("fbnIgnored");
				}, this));
				header.prepend(peep);

				var me = this;

				// Get the configs for every quoted user and create a promise array from them
				var quotedConfigPromises = [];
				var threadId = $("form input[name='storyid']").val();
				var quoteLinks = body.find("a[href^='#'], a[href^='/comments/{0}']".fex(threadId));
				quoteLinks.each(function () {
					var link = $(this);
					var quotedUsername = link.text().replace("someone who may or may not be", "~");
					var quotePromise = __userConfig.getConfigPromise(quotedUsername);
					quotePromise.done(function (quotedConfig) {
						me.childConfigs[quotedConfig.bnUsername] = quotedConfig;
					});
					quotedConfigPromises.push(quotePromise);
				});

				// when I have the main config and then all child configs, 
				// attach to all of their save events for updating, and then update to current settings
				$.when(__userConfig.getConfigPromise(me.userName, me.userId))
					.then(function (config) {
						$.when.apply(this, quotedConfigPromises).then(function () {
							me.userConfig = config;
							me.userConfig.onSave.callbacks.add(me.update);
							$.each(me.childConfigs, function (index, value) {
								value.onSave.callbacks.add(me.update);
							});
							me.$el.css("cursor", "pointer").click(me.showUI);
							me.update();
						});
					});

			};

			UserDecoration.prototype.update = function () {
				if (this.userConfig === null) {
					return;
				}

				var header = this.$el.closest("div.ch.u" + this.userId);
				var body = $("div.cb.u" + this.userId + "[id$='" + header.attr("id").substring(1) + "']");
				var me = this;

				// score hilighting
				var score = header.data("score");
				if (score && score > parseInt(GM_config.get("highScoreThreshold"))) {
					header.addClass("highScore");
				} else {
					header.removeClass("highScore");
				}

				// image blocking
				var blockImages = this.userConfig.get("blockImages");
				switch (blockImages) {
					case "Normal":
						body.find("a.fbnBlockedImage").replaceWith(function () {
							var blockedImage = $(this);
							var unblockedImage = $("<img src='" + blockedImage.attr("href") + "' />");
							var height = blockedImage.data("height");
							var width = blockedImage.data("width");
							if (height) {
								unblockedImage.attr("height", height).css("height", height);
							}
							if (width) {
								unblockedImage.attr("width", width).css("width", width);
							}
							return unblockedImage;
						});
						break;
					case "Removed":
						body.find("img").replaceWith(function () {
							var unBlockedImage = $(this);
							var blockedImageLink = $("<a class='fbnBlockedImage' href='" + unBlockedImage.attr("src") + "'>[image blocked]</a>");
							blockedImageLink.data("width", unBlockedImage.attr("width"));
							blockedImageLink.data("height", unBlockedImage.attr("height"));
							me.onImageReplaced.fireWith(blockedImageLink, blockedImageLink);
							return blockedImageLink;
						});
						break;
				}

				// header colors
				header
					.css("background-color", this.userConfig.get("headBackColor"))
					.css("color", this.userConfig.get("headColor"))
					.find("a").css("color", this.userConfig.get("headColor"))
				;

				// quote style and ignored reply visibility
				var visibility = this.userConfig.get("visibility");

				var threadId = $("form input[name='storyid']").val();
				var quoteLinks = body.find("a[href^='#'], a[href^='/comments/{0}']".fex(threadId));
				quoteLinks.each(function () {
					try {
						var link = $(this);
						link.text(link.text().replace("someone who may or may not be", "~"));
						var quotedUsername = link.text();

						var quotedConfig = me.childConfigs[ __userConfig.getCleanUsername( quotedUsername )];
						if (typeof quotedConfig === "undefined") {
							console.error("FixbN Failed acquiring config for quoted user {0} on a comment by {1}".fex(quotedUsername, me.userName));
							return;
						}

						// styling quotes
						link.css({ "background-color": quotedConfig.get("headBackColor"), "color": quotedConfig.get("headColor") });

						// ignoring replies as needed
						try {

							var replyVisibile = true;

							// first only bother checking if the quoted user is on ignore at all
							var quoteIgnore = (quotedConfig.get("visibility") === "Ignore");
							if (quoteIgnore) {
								

								// since they are on Ignore, then determine if they have a reply override on them
								var gIgnore = GM_config.get("ignoreReplies");
								var uIgnore = quotedConfig.get("ignoreReplies");

								switch (uIgnore) {
									case "Shown":
										quoteIgnore = false;
										break;
									case "Hidden":
										quoteIgnore = true;
										break;
									default:
										quoteIgnore = gIgnore;
										break;
								}

								if (quoteIgnore) {
									//ok, this person is set to be reply-ignored, but prefered user settings can override that

									if (!(me.userConfig.get("overrideIgnoreReplies"))) {

										// BAM! Ignored Reply!
										replyVisibile = false;

									}

								}

							}
							visibility = ( visibility === "Normal" ) && replyVisibile ? "Normal" : "Ignore";

						} catch (ex) {
							console.error("FixbN Failed determining quoted user's visibility", ex);
						}

					} catch (ex) {
						console.error(ex);
					}
				});

				switch (visibility) {
					case 'Normal':
						body.filter(".fbnIgnored").slideDown('fast').removeClass("fbnIgnored");
						header.removeClass("fbnIgnored");
						break;
					case 'Ignore':
						body.filter(":visible").addClass("fbnIgnored").slideUp('fast');
						header.addClass("fbnIgnored");
						break;
				}

			};

			UserDecoration.prototype.showUI = function (evt) {
				if (evt) {
					evt.preventDefault();
				}

				this.userConfig.open();
			};

			return UserDecoration;
		})();

		$.fn.extend({
			userDecoration: function (options) {
				if (typeof options === "string") {
					switch (options) {
						case "update":
							try {
								$(this).data("userDecoration").update();
							} catch (ex) {
								console.error(ex);
								console.log(this);
								console.error($(this).data("userDecoration"));
							}
							break;
					}
					return $(this);
				} else {
					if (options === null) {
						options = {};
					}
					return this.each(function () {
						return new UserDecoration($(this), options);
					});
				}
			}
		});

		// settings default
		$.fn.userDecoration.defaults = {
			threadId: 0,
			onImageReplaced: function () { }
		};

	})(jQuery);
} catch (ex) {
	console.error("FixbN Failed declaring UserDecoration", ex);
}

// bN taggination replacement
(function ($) {
	"use strict";

	var Tagn;
	var $bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; };

	var TAG_ACCEPTED = "1";
	var INVALID_CHARACTER_IN_TAG = "2";
	var TAG_TOO_LONG = "3";
	var TOO_MANY_REPEATED_WORDS = "4";
	var TAG_MATCH = "5";

	Tagn = (function () {
		
		/*
		 * @constructor
		 */
		function Tagn($el, settings) {
			if (settings === null) {
				settings = {};
			}

			this.attach = $bind(this.attach, this);
			this.formSubmit = $bind(this.formSubmit, this);
			this.submitTags = $bind(this.submitTags, this);
			this.tagSubmitSuccess = $bind(this.tagSubmitSuccess, this);
			this.tagSubmitError = $bind(this.tagSubmitError, this);

			this.$el = $el;
			this.settings = $.extend({}, $.fn.tagn.defaults, settings);

			this.tagSet = {};

			this.attach();
		}

		Tagn.prototype.attach = function () {
			var theForm = this.$el.closest("form");
			theForm.get(0).submit = null;
			theForm
				.unbind("submit")
				.off("submit")
				.on("submit", this.formSubmit);
		};

		Tagn.prototype.formSubmit = function (evt) {
			evt.preventDefault();

			this.createTagSet(this.$el.val());

			if (typeof this.settings.beforeSubmit === "function") {
				this.settings.beforeSubmit.bind(this.$el)(this.tagSet);
			}

			this.submitTags().done(function () {
				this.settings.taggingComplete.bind(this.$el)(this.tagSet);
			}.bind(this));

			return false;
		};

		Tagn.prototype.submitTags = function() {
			var promises = [];

			try {
				var url = "";
				if (bnurl.isQueuePage()) {
					url = this.settings.queueTagUrl;
				} else {
					url = this.settings.articleTagUrl;
				}

				url = url.fex({ "storyId": this.settings.storyId });
				var me = this;

				$.each(this.tagSet.tags, function (index, tag) {
					var def = new $.Deferred();

					if (tag.status === "valid") {

						// call ajax
						$.ajax({
							url: url.fex({ "tag": tag.value }),
							type: "GET",
							dataType: "text",
							context: me,
							beforeSend: function (jqXHR, settings) {
								jqXHR.stamp = me.tagSet.stamp;
								jqXHR.tag = tag;
							},
							success: me.tagSubmitSuccess,
							error: me.tagSubmitError,
							complete: function (jqXHR, textStatus) {
								def.resolve();
							}
						});
					} else {
						$bind(me.settings.tagUpdated, me.$el)(me.tagSet);
						def.resolve();
					}

					promises.push(def);
				});
			} catch (ex) {
				console.error("Fix bN Failed sending tags", ex);
			}

			return $.when.apply(undefined, promises).promise();
		};

		Tagn.prototype.createTagSet = function (text) {
			// Split the tags separated by commas into an array.
			var initialTags = text.split(",");
			var cleaningRegex = /[^A-Za-z0-9$\.&'\s\-_]/g;

			this.tagSet = {
				"stamp": $.now(),
				"tags": [],
			};
			
			// Clean the tags and only attempt to submit valid ones.
			for (var i = 0; i < initialTags.length; ++i) {
				var currentTag = initialTags[i].trim().replace(cleaningRegex, "").trim();
				var tag = {
					'value': currentTag,
					'status': "",
					'message': ""
				};
				if (2 <= currentTag.length && currentTag.length <= 30) {
					tag.status = "valid";
				} else {
					tag.status = "invalid";
					tag.message = (currentTag.length > 5) ? "Tag too long" : "Tag too short";
				}

				this.tagSet.tags.push(tag);
			}
		};

		Tagn.prototype.tagSubmitSuccess = function (data, textStatus, jqXHR) {
			if (jqXHR.stamp !== this.tagSet.stamp) {
				return;
			}

			var tag = jqXHR.tag;
			var responseCode = data.substring(0, 1);
			switch (responseCode) {
				case TAG_ACCEPTED:
					tag.status = "accepted";
					tag.message = data.substring(2, 99).trim();
					break;
				case TAG_MATCH:
					var user = data.substring(2, 99).trim();
					tag.status = "matched";
					tag.message = (user.length === 0) ? "the auto-tagger" : user;
					break;
				case INVALID_CHARACTER_IN_TAG:
					tag.status = "rejected";
					tag.message = "Invalid character in tag";
					break;
				case TAG_TOO_LONG:
					tag.status = "rejected";
					tag.message = "Tag too long";
					break;
				case TOO_MANY_REPEATED_WORDS:
					tag.status = "rejected";
					tag.message = "Too many repeated words";
					break;
				default:
					if (data.indexOf("You must be logged in to do that") > 0) {
						tag.status = "rejected";
						tag.message = "You must be logged in to do that";
					} else {
						tag.status = "unknown";
						tag.message = "unknown response from server";
					}
					break;
			}

			$bind(this.settings.tagUpdated, this.$el)(this.tagSet);
		};

		Tagn.prototype.tagSubmitError = function (jqXHR, textStatus, errorThrown) {
			if (jqXHR.stamp !== this.tagSet.stamp) {
				return;
			}

			var tag = jqXHR.tag;
			tag.status = String(textStatus);
			tag.message = String(errorThrown);

			$bind(this.settings.tagUpdated, this.$el)(this.tagSet);
		};

		return Tagn;

	})();

	$.fn.extend({
		tagn: function (options) {
			if (options === null) {
				options = {};
			}
			return this.each(function () {
				return new Tagn($(this), options);
			});
		}
	});

	$.fn.tagn.defaults = {
		storyId: "",
		articleTagUrl: "/post?action=addtag&storyid={storyId}&tag={tag}",
		queueTagUrl: "/post?action=addqueuetag&channel_id=1&story_queue_id={storyId}&tag={tag}",

		beforeSubmit: function () { },
		tagUpdated: function () { },
		taggingComplete: function () { }
	};

})(jQuery);

// bitcoin donate jquery plugin
try {
	(function ($) {
		"use strict";

		var $bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; };
		var root = "https://blockchain.info/";

		var Bitcoin = (function () {

			// @constructor
			function Bitcoin($el, settings) {
				if (settings === null) {
					settings = {};
				}

				this.attach = $bind(this.attach, this);

				this.$el = $el;
				this.settings = $.extend({}, $.fn.tagn.defaults, settings);

				this.attach();
			}

			Bitcoin.prototype.attach = function () {
				var button = this.$el;

				button.find(".blockchain").hide();
				button.find('.stage-begin').trigger('show').show();

				button.click(function () {
					var receivers_address = $(this).data('address');
					var shared = $(this).data('shared');
					var test = $(this).data('test');

					if (!shared) { shared = false; }

					var callback_url = $(this).data('callback');
					if (!callback_url) { callback_url = ''; }

					button.find('.blockchain').hide();
					button.find('.stage-loading').trigger('show').show();

					$.ajax({
						type: "GET",
						dataType: 'json',
						url: root + 'api/receive',
						data: { method: 'create', address: encodeURIComponent(receivers_address), shared: shared, callback: callback_url },
						success: function (response) {
							button.find('.qr-code').empty();
							button.find('.blockchain').hide();

							if (!response || !response.input_address) {
								button.find('.stage-error').trigger('show').show().html(button.find('.stage-error').html().replace('[[error]]', 'Unknown Error'));
								return;
							}

							function checkBalance() {
								$.ajax({
									type: "GET",
									url: root + 'q/getreceivedbyaddress/' + response.input_address,
									data: { format: 'plain' },
									success: function (response) {
										if (!response) { return; }

										var value = parseInt(response);

										if (value > 0 || test) {
											button.find('.blockchain').hide();
											button.find('.stage-paid').trigger('show').show().html(button.find('.stage-paid').html().replace('[[value]]', value / 100000000));
										} else {
											setTimeout(checkBalance, 5000);
										}
									}
								});
							}

							try {
								var ws = new WebSocket('ws://ws.blockchain.info/inv');
								if (!ws) { return; }

								ws.onmessage = function (msg) {
									try {
										var obj = $.parseJSON(msg.data);
										var result = 0;

										if (obj.op == 'utx') {
											var tx = obj.x;
																				
											for (var i = 0; i < tx.out.length; i++) {
												var output = tx.out[i];

												if (output.addr == response.input_address) {
													result += parseInt(output.value);
												}
											}
										}

										button.find('.blockchain').hide();
										button.find('.stage-paid').trigger('show').show().html(button.find('.stage-paid').html().replace('[[value]]', result / 100000000));

										ws.close();
									} catch (ex) {
										console.error(ex);
										console.error(ex.data);
									}
								};

								ws.onopen = function () {
									ws.send('{"op":"addr_sub", "addr":"' + response.input_address + '"}');
								};
							} catch (ex) {
								console.error(ex);
							}

							button.find('.stage-ready').trigger('show').show().html(button.find('.stage-ready').html().replace('[[address]]', response.input_address));
							button.find('.qr-code').html('<img style="margin:5px" src="' + root + 'qr?data=' + response.input_address + '&size=125">');
							button.unbind();

							///Check for incoming payment
							setTimeout(checkBalance, 5000);
						},
						error: function (ex) {
							button.find('.blockchain').hide();
							button.find('.stage-error').show().trigger('show').html(button.find('.stage-error').html().replace('[[error]]', ex.responseText));
						}
					});

				});
			};

			return Bitcoin;
		})();

		$.fn.extend({
			bitcoin: function (options) {
				if (options === null) {
					options = {};
				}
				return this.each(function () {
					return new Bitcoin($(this), options);
				});
			}
		});

	})(jQuery);
} catch (ex) {
	console.error("FixbN Failed declaring bitcoin", ex);
}

/*
string format function
attached to the string prototype
*/
if ("function" !== typeof "".fex) { // add fex() if one does not exist already
	String.prototype.fex = (function () { // closure to store regex
		"use strict";

		var rxp = /\{\{|\}\}|\{(\w+)\}/g;

		/*
		* String formatting function. Input string can use either indexed or named placeholders {0} or {foo}, use {{ }} to escape placeholders. Parameters can either be a series of strings, an array, or simple object with name/stringvalue pairs
		* @example
		* "foo {0} {1}".fex('bar', 'zap'); // returns "foo bar zap"
		* "foo {0} {1}".fex(['bar', 'zap']); // returns "foo bar zap"
		* "foo {second} {third}".fex({'second':'bar', 'third':'zap'}); // returns "foo bar zap"
		* @param {(...string|string[]|object} replacements - the replacement value(s) to be inserted into the string
		* @this String
		* @returns {string} The formatted string
		*/
		return function () { // the fex function
			var args = arguments;
			if (!args || args.length === 0) {
				return this.toString();
			}
			var col = {};
			if (args.length === 1) {
				var arg = args[0];
				if (arg === null) {
					arg = "null";
				}
				switch ((typeof arg)) {
					case "object":
						col = arg;

						break;
					case "string":
						col[0] = arg;

						break;
					default:
						return this.toString();
				}
			}
			if (args.length > 1) {
				col = Array.prototype.slice.call(args);
			}

			return this.replace(rxp, function (match, property) {
				if (property === null || typeof (property) === "undefined") {
					return match;
				}
				if (match === "{{") { return "{"; }
				if (match === "}}") { return "}"; }
				return (typeof col[property] !== "undefined") ? col[property] : match;
			});
		};
	}());
}
 
/*
 * string trim function
 * attached to the string prototype to support chaining
 */
if ("function" !== typeof "".trim) {
	String.prototype.trim = function () {
		return $.trim(this);
	};
}

// simple diff that assumes one addition to "n"
function diff(o, n) {
	var i = 0;
	for (i = 0; i < o.length; i++) {
		if (o[i] !== n[i]) {
			break;
		}
	}
	o = o.substring(i);
	n = n.substring(i);

	var l = 0;
	for (i = 0; i < n.length; i++) {
		if (n.substring(i) === o) {
			break;
		}
	}

	return n.substring(0, i + 1);
}

/* jshint ignore:start */
try {
	(function ($, undefined) {
		'use strict';
		var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
		var IDBCursor = window.IDBCursor || window.webkitIDBCursor || {};
		if (typeof IDBCursor.PREV === "undefined") {
			IDBCursor.PREV = "prev";
		}
		if (typeof IDBCursor.NEXT === "undefined") {
			IDBCursor.NEXT = "next";
		}

		/**
		 * Best to use the constant IDBTransaction since older version support numeric types while the latest spec
		 * supports strings
		 */
		var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

		function getDefaultTransaction(mode) {
			var result = null;
			switch (mode) {
				case 0:
				case 1:
				case "readwrite":
				case "readonly":
					result = mode;
					break;
				default:
					result = IDBTransaction.READ_WRITE || "readwrite";
			}
			return result;
		}

		$.extend({
			/**
			 * The IndexedDB object used to open databases
			 * @param {Object} dbName - name of the database
			 * @param {Object} config - version, onupgradeneeded, onversionchange, schema
			 */
			"indexedDB": function (dbName, config) {
				if (config) {
					// Parse the config argument
					if (typeof config === "number") config = {
						"version": config
					};

					var version = config.version;
					if (config.schema && !version) {
						var max = -1;
						for (var key in config.schema) {
							max = max > key ? max : key;
						}
						version = config.version || max;
					}
				}


				var wrap = {
					"request": function (req, args) {
						return $.Deferred(function (dfd) {
							try {
								var idbRequest = typeof req === "function" ? req(args) : req;
								idbRequest.onsuccess = function (e) {

									dfd.resolveWith(idbRequest, [idbRequest.result, e]);
								};
								idbRequest.onerror = function (e) {

									dfd.rejectWith(idbRequest, [idbRequest.error, e]);
								};
								if (typeof idbRequest.onblocked !== "undefined" && idbRequest.onblocked === null) {
									idbRequest.onblocked = function (e) {

										var res;
										try {
											res = idbRequest.result;
										} catch (e) {
											res = null; // Required for Older Chrome versions, accessing result causes error 
										}
										dfd.notifyWith(idbRequest, [res, e]);
									};
								}
								if (typeof idbRequest.onupgradeneeded !== "undefined" && idbRequest.onupgradeneeded === null) {
									idbRequest.onupgradeneeded = function (e) {

										dfd.notifyWith(idbRequest, [idbRequest.result, e]);
									};
								}
							} catch (e) {
								e.name = "exception";
								dfd.rejectWith(idbRequest, ["exception", e]);
							}
						});
					},
					// Wraps the IDBTransaction to return promises, and other dependent methods
					"transaction": function (idbTransaction) {
						return {
							"objectStore": function (storeName) {
								try {
									return wrap.objectStore(idbTransaction.objectStore(storeName));
								} catch (e) {
									idbTransaction.readyState !== idbTransaction.DONE && idbTransaction.abort();
									return wrap.objectStore(null);
								}
							},
							"createObjectStore": function (storeName, storeParams) {
								try {
									return wrap.objectStore(idbTransaction.db.createObjectStore(storeName, storeParams));
								} catch (e) {
									idbTransaction.readyState !== idbTransaction.DONE && idbTransaction.abort();
								}
							},
							"deleteObjectStore": function (storeName) {
								try {
									idbTransaction.db.deleteObjectStore(storeName);
								} catch (e) {
									idbTransaction.readyState !== idbTransaction.DONE && idbTransaction.abort();
								}
							},
							"abort": function () {
								idbTransaction.abort();
							}
						};
					},
					"objectStore": function (idbObjectStore) {
						var result = {};
						// Define CRUD operations
						var crudOps = ["add", "put", "get", "delete", "clear", "count"];
						for (var i = 0; i < crudOps.length; i++) {
							result[crudOps[i]] = (function (op) {
								return function () {
									return wrap.request(function (args) {
										return idbObjectStore[op].apply(idbObjectStore, args);
									}, arguments);
								};
							})(crudOps[i]);
						}

						result.each = function (callback, range, direction) {
							return wrap.cursor(function () {
								if (direction) {
									return idbObjectStore.openCursor(wrap.range(range), direction);
								} else {
									return idbObjectStore.openCursor(wrap.range(range));
								}
							}, callback);
						};

						result.index = function (name) {
							return wrap.index(function () {
								return idbObjectStore.index(name);
							});
						};

						result.createIndex = function (prop, options, indexName) {
							if (arguments.length === 2 && typeof options === "string") {
								indexName = arguments[1];
								options = null;
							}
							if (!indexName) {
								indexName = prop;
							}
							return wrap.index(function () {
								return idbObjectStore.createIndex(indexName, prop, options);
							});
						};

						result.deleteIndex = function (indexName) {
							return idbObjectStore.deleteIndex(indexName);
						};

						return result;
					},

					"range": function (r) {
						if ($.isArray(r)) {
							if (r.length === 1) {
								return IDBKeyRange.only(r[0]);
							} else {
								return IDBKeyRange.bound(r[0], r[1], (typeof r[2] === 'undefined') ? false : r[2], (typeof r[3] === 'undefined') ? false : r[3]);
							}
						} else if (typeof r === "undefined") {
							return null;
						} else {
							return r;
						}
					},

					"cursor": function (idbCursor, callback) {
						return $.Deferred(function (dfd) {
							try {

								var cursorReq = typeof idbCursor === "function" ? idbCursor() : idbCursor;
								cursorReq.onsuccess = function (e) {

									if (!cursorReq.result) {
										dfd.resolveWith(cursorReq, [null, e]);
										return;
									}
									var elem = {
										// Delete, update do not move 
										"delete": function () {
											return wrap.request(function () {
												return cursorReq.result["delete"]();
											});
										},
										"update": function (data) {
											return wrap.request(function () {
												return cursorReq.result["update"](data);
											});
										},
										"next": function (key) {
											this.data = key;
										},
										"key": cursorReq.result.key,
										"value": cursorReq.result.value
									};

									dfd.notifyWith(cursorReq, [elem, e]);
									var result = callback.apply(cursorReq, [elem]);

									try {
										if (result === false) {
											dfd.resolveWith(cursorReq, [null, e]);
										} else if (typeof result === "number") {
											cursorReq.result["advance"].apply(cursorReq.result, [result]);
										} else {
											if (elem.data) cursorReq.result["continue"].apply(cursorReq.result, [elem.data]);
											else cursorReq.result["continue"]();
										}
									} catch (e) {

										dfd.rejectWith(cursorReq, [cursorReq.result, e]);
									}
								};
								cursorReq.onerror = function (e) {

									dfd.rejectWith(cursorReq, [cursorReq.result, e]);
								};
							} catch (e) {

								e.type = "exception";
								dfd.rejectWith(cursorReq, [null, e]);
							}
						});
					},

					"index": function (index) {
						try {
							var idbIndex = (typeof index === "function" ? index() : index);
						} catch (e) {
							idbIndex = null;
						}

						return {
							"each": function (callback, range, direction) {
								return wrap.cursor(function () {
									if (direction) {
										return idbIndex.openCursor(wrap.range(range), direction);
									} else {
										return idbIndex.openCursor(wrap.range(range));
									}

								}, callback);
							},
							"eachKey": function (callback, range, direction) {
								return wrap.cursor(function () {
									if (direction) {
										return idbIndex.openKeyCursor(wrap.range(range), direction);
									} else {
										return idbIndex.openKeyCursor(wrap.range(range));
									}
								}, callback);
							},
							"get": function (key) {
								if (typeof idbIndex.get === "function") {
									return wrap.request(idbIndex.get(key));
								} else {
									return idbIndex.openCursor(wrap.range(key));
								}
							},
							"count": function () {
								if (typeof idbIndex.count === "function") {
									return wrap.request(idbIndex.count());
								} else {
									throw "Count not implemented for cursors";
								}
							},
							"getKey": function (key) {
								if (typeof idbIndex.getKey === "function") {
									return wrap.request(idbIndex.getKey(key));
								} else {
									return idbIndex.openKeyCursor(wrap.range(key));
								}
							}
						};
					}
				};


				// Start with opening the database
				var dbPromise = wrap.request(function () {

					return version ? indexedDB.open(dbName, parseInt(version)) : indexedDB.open(dbName);
				});
				dbPromise.then(function (db, e) {

					db.onversionchange = function () {
						// Try to automatically close the database if there is a version change request
						if (!(config && config.onversionchange && config.onversionchange() !== false)) {
							db.close();
						}
					};
				}, function (error, e) {

					// Nothing much to do if an error occurs
				}, function (db, e) {
					if (e && e.type === "upgradeneeded") {
						if (config && config.schema) {
							// Assuming that version is always an integer 

							for (var i = e.oldVersion + 1; i <= e.newVersion; i++) {
								typeof config.schema[i] === "function" && config.schema[i].call(this, wrap.transaction(this.transaction));
							}
						}
						if (config && typeof config.upgrade === "function") {
							config.upgrade.call(this, wrap.transaction(this.transaction));
						}
					}
				});

				return $.extend(dbPromise, {
					"cmp": function (key1, key2) {
						return indexedDB.cmp(key1, key2);
					},
					"deleteDatabase": function () {
						// Kinda looks ugly coz DB is opened before it needs to be deleted. 
						// Blame it on the API 
						return $.Deferred(function (dfd) {
							dbPromise.then(function (db, e) {
								db.close();
								wrap.request(function () {
									return indexedDB.deleteDatabase(dbName);
								}).then(function (result, e) {
									dfd.resolveWith(this, [result, e]);
								}, function (error, e) {
									dfd.rejectWith(this, [error, e]);
								}, function (db, e) {
									dfd.notifyWith(this, [db, e]);
								});
							}, function (error, e) {
								dfd.rejectWith(this, [error, e]);
							}, function (db, e) {
								dfd.notifyWith(this, [db, e]);
							});
						});
					},
					"transaction": function (storeNames, mode) {
						!$.isArray(storeNames) && (storeNames = [storeNames]);
						mode = getDefaultTransaction(mode);
						return $.Deferred(function (dfd) {
							dbPromise.then(function (db, e) {
								var idbTransaction;
								try {

									idbTransaction = db.transaction(storeNames, mode);

									idbTransaction.onabort = idbTransaction.onerror = function (e) {
										dfd.rejectWith(idbTransaction, [e]);
									};
									idbTransaction.oncomplete = function (e) {
										dfd.resolveWith(idbTransaction, [e]);
									};
								} catch (e) {

									e.type = "exception";
									dfd.rejectWith(this, [e]);
									return;
								}
								try {
									dfd.notifyWith(idbTransaction, [wrap.transaction(idbTransaction)]);
								} catch (e) {
									e.type = "exception";
									dfd.rejectWith(this, [e]);
								}
							}, function (err, e) {
								dfd.rejectWith(this, [e, err]);
							}, function (res, e) {

								//dfd.notifyWith(this, ["", e]);
							});

						});
					},
					"objectStore": function (storeName, mode) {
						var me = this,
							result = {};

						function op(callback) {
							return $.Deferred(function (dfd) {
								function onTransactionProgress(trans, callback) {
									try {

										callback(trans.objectStore(storeName)).then(function (result, e) {
											dfd.resolveWith(this, [result, e]);
										}, function (err, e) {
											dfd.rejectWith(this, [err, e]);
										});
									} catch (e) {

										e.name = "exception";
										dfd.rejectWith(trans, [e, e]);
									}
								}
								me.transaction(storeName, getDefaultTransaction(mode)).then(function () {

									// Nothing to do when transaction is complete
								}, function (err, e) {
									// If transaction fails, CrudOp fails
									if (err.code === err.NOT_FOUND_ERR && (mode === true || typeof mode === "object")) {

										var db = this.result;
										db.close();
										dbPromise = wrap.request(function () {

											return indexedDB.open(dbName, (parseInt(db.version, 10) || 1) + 1);
										});
										dbPromise.then(function (db, e) {

											db.onversionchange = function () {
												// Try to automatically close the database if there is a version change request
												if (!(config && config.onversionchange && config.onversionchange() !== false)) {
													db.close();
												}
											};
											me.transaction(storeName, getDefaultTransaction(mode)).then(function () {

												// Nothing much to do
											}, function (err, e) {
												dfd.rejectWith(this, [err, e]);
											}, function (trans, e) {

												onTransactionProgress(trans, callback);
											});
										}, function (err, e) {
											dfd.rejectWith(this, [err, e]);
										}, function (db, e) {
											if (e.type === "upgradeneeded") {
												try {

													db.createObjectStore(storeName, mode === true ? {
														"autoIncrement": true
													} : mode);

												} catch (ex) {

													dfd.rejectWith(this, [ex, e]);
												}
											}
										});
									} else {
										dfd.rejectWith(this, [err, e]);
									}
								}, function (trans) {

									onTransactionProgress(trans, callback);
								});
							});
						}

						function crudOp(opName, args) {
							return op(function (wrappedObjectStore) {
								return wrappedObjectStore[opName].apply(wrappedObjectStore, args);
							});
						}

						function indexOp(opName, indexName, args) {
							return op(function (wrappedObjectStore) {
								var index = wrappedObjectStore.index(indexName);
								return index[opName].apply(index[opName], args);
							});
						}

						var crud = ["add", "delete", "get", "put", "clear", "count", "each"];
						for (var i = 0; i < crud.length; i++) {
							result[crud[i]] = (function (op) {
								return function () {
									return crudOp(op, arguments);
								};
							})(crud[i]);
						}

						result.index = function (indexName) {
							return {
								"each": function (callback, range, direction) {
									return indexOp("each", indexName, [callback, range, direction]);
								},
								"eachKey": function (callback, range, direction) {
									return indexOp("eachKey", indexName, [callback, range, direction]);
								},
								"get": function (key) {
									return indexOp("get", indexName, [key]);
								},
								"count": function () {
									return indexOp("count", indexName, []);
								},
								"getKey": function (key) {
									return indexOp("getKey", indexName, [key]);
								}
							};
						};

						return result;
					}
				});
			}
		});

		$.indexedDB.IDBCursor = IDBCursor;
		$.indexedDB.IDBTransaction = IDBTransaction;
		$.idb = $.indexedDB;
	})(jQuery);
} catch (ex) {
	console.error("FixbN Failed Declaring indexedDB", ex);
}
/* jshint ignore:end */

// The kickoff function
$(document).ready(function () {
	"use strict";

	// general style changes
	/* jshint -W064 */
	GM_addStyle((function () {
		return [
			"div#selectionMenu { box-shadow:0px 0px 5px black; background:#eeeeee; border:4px solid black; border-radius:5px; padding:5px; padding-left:8px; }",
			"div#selectionMenu div { cursor:pointer; }",
			"div#selectionMenu  hr { margin:3px; padding:0px; }",
			"div#menu { vertical-align:middle; }",
			"div#menu ul { font-size: 0.8em; white-space: nowrap; clear:both; padding:0px; margin-bottom:5px; }",
			"div#menu ul li img.fbnIcon { display:inline;float:none;margin:0px;padding:0px; height:20px;}",
			"div#menu ul.leftMenu { float:left; padding:0px; }",
			"div#menu ul.leftMenu li { margin:0px; padding:0px 0.5em; border:none; border-right:1px solid white; }",
			"div#menu ul.leftMenu li:last-child { border:none; }",
			"div.profilePopup a { color: white; }",
			"div.profilePopup a.topLink { padding-bottom:5px; }",
			"div.recentCommentWrapper { font-size:12px; padding-top:5px; }",
			"div.recentCommentWrapper a:visited { color:#aaa; }",
			"div.fbnRepliesToMe { float:left; background:#807373; border: 1px solid black; margin-left:10px; margin-right:10px; margin-bottom:10px; font-size:0.75em; }",
			"div.fbnRepliesToMe span { color:white; cursor:pointer; padding-left:0.5em; padding-right:0.5em; }",
			"div.fbnRepliesToMe ul { display: inline; }",
			"div.fbnRepliesToMe ul li { display: inline-block; white-space:nowrap; border-left: 1px solid white; padding-left: 0.5em; padding-right:0.5em; margin:0em; }",
			"div.fbnRepliesToMe ul a { color:white; }",
			"div.fbnRepliesToMe ul a:visited { color:#bbb; }",
			".notyReply a { color: white; }",
			"div.fbnScrollToBottom { margin:0px; padding:0px; border:none; position:fixed; top:-5px; left:auto; right:-3px; z-index:1001; }",
			"div.fbnScrollToBottom img { margin:0px; padding:0px; border:none; cursor:pointer; }",
			"div.fbnScrollToTop { margin:0px; padding:0px; border:none; position:fixed; top:-5px; left:auto; right:-3px; z-index:1001; }",
			"div.fbnScrollToTop img { margin:0px; padding:0px; border:none; cursor:pointer; }",
			"div.mfp-content div.ch { margin-left: 5em; margin-right:5em; border:10px solid white; border-bottom-width:0px; }",
			"div.mfp-content div.cb { margin-left: 5em; margin-right:5em; border:10px solid white; border-top-width:0px;}",
			"div.stickyTagger {margin:0.25em; padding:0em; background:#807373; position: fixed; left: auto; right: 0; bottom: 0; text-align: right; border:1px solid black; box-shadow: 0px 0px 5px black;}",
			"div.stickyTagger label { color:white; cursor:pointer; padding:2em 1em 2em 1em; font-size:1.5em; }",
			"div.stickyTagger input { margin-right:1em; display:none; font-size:1.25em; margin-bottom:3px; width: 30em; }",
			"div#header.fixedHeader { position:fixed; top:0px; box-shadow: 0px 0px 10px black; z-index:1000; }",
			"div.form { width:98%; min-width:511px; }",
			"div#tag_cloud span { cursor:pointer; }",
			"div#footer { color: #CCCCCC; font-size: 0.5em; }",
			"div#footer a { font-size: 1.5em; }",
			"a.commentsLinkButton { float:right; margin-top:-15px; margin-right:-10px; }",
			"div.ch.fbnIgnored img { opacity: 0; }",
			"div.ch.highScore { padding-left: 25px; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADBElEQVRYhb1XTUhUURT+MAxd1MaNlAgthELNpSi4kMqioNzM0n5AQRjn3ceIBAqmCaUJibgQkVYSirgTiWhICBlBcGW4iUQyzUBU3sxznOk5XwvzzvsZmXnPxgN3c9895/ve+c497zzgDMYASqig7CwxvAI3UGCVKjSq0CiwRgWPzo+AGdxE4nzAVdRI0N7SKF/fiJqI1JwHgR4JONd5yLnOQxOBntwTEFiSgGsLBtcWDJMMK7kFD6BEgnUVRXhkkEcG+eJqRO77UZ47AgqaJdBEU4wnNuOPmWQI5o6Aii8SaHkyIQmsfvhjkmEpN+ABXJYgHQUa49GkJGDEya6ilAwBlLgHUNFIgVkK7DjuuH2NPzyg3SaaYhn9BHYoMEsVjVZwgf6MzuYVHks4CCxPJlzFUDF4DK6gzKWjxr2NIweBxAHZUeAuThuugwKP5cZUS4xG3BH7v5kRJ6dbU1IpeObMwFC1zv3NZOZoLk3bTnK4VndkIG0NdBdHuLZg/Dfw9UWD3cURmwSD1kJU0GQ50J6vcXHcWWxuLTyWYHu+Xf+n6a+ignoKbFgOT7d6qwsjTk612K/mFhXUZ2o4VRSYtzgO1+rUtrOvi/3NJIeqrXoLzDOAKjeNadASYKAimjWBgYqoDbw/a2CbJOk/PpnM3BUVNHsCBwAKhNJ+fDKZuSsKhLyB+3BBBgnmadR3nTVwMg/YTd9NMpiXksCHi17e/q4MMFKnO0D2N5McqdM5VK1zd93Zmkfv6KYs+LwQeCsDhAas9/DbZ2tjeX4p4pAoPJYw1cE7LwRSo/evr6k3/NgXt6TXvN4/ick5YW/jyPTspztwP8qlc29pVOo69uDABvqdAmHLXt+1KH8sHRfGm5veRnbL9Zvxx7i+aLC31H63Q2xDJQBQxUvLs2Cexk+v4raRPftZkQrqpePovQNHLxdQ0vjcp4rflnPmadlVBnwoPGWI2GIADaf6taHS0jtShN3/L1CB32svZwC3KbByAk4Ft1wTAP5lQkE9fSj05N+GK5nO/AVe5nuxyXFg6QAAAABJRU5ErkJggg==); background-repeat: no-repeat; background-attachment: scroll; background-position:left center;  }",
			"div.ch img.nabbitOff { opacity: 0; }",
			"div.ch img.nabbitForceOn { opacity: 1; }",
			"div.ch span.peep { display: none; float: left; }",
			"div.ch.fbnIgnored span.peep { display: inline; float: left; cursor:pointer; font-weight:bold; padding: 0px 0.5em 0px 0.5em; margin: 0.25em 0px 0.5em 0px; }",
			"div.cb ul, div.cb pre { padding:0px; margin:0px; } div.cb li { padding:0px; margin:0px 0px 0px 1em; }",
			"div.cb .commentquote { display: block; padding:0px 0px 0px 0.5em; margin:1em 0px 0px 0.5em; border-left: 2px solid #807373; font-size: 0.75em; }",
			"div.cb a[href^='#'] { color:black; }",
			"div#menu a.a1{padding-right:25px;background:url(../img/bncombined.png) no-repeat top;background-position:right -360px;}",
			"div#menu a.a1{padding-right:25px;background:url(../img/bncombined.png) no-repeat top;background-position:right -360px;}",
			"div#menu a.a2{padding-right:25px;background:url(../img/bncombined.png) no-repeat top;background-position:right -432px;}",
			"div#menu a.a3{padding-right:25px;background:url(../img/bncombined.png) no-repeat center;background-position:right -504px;}",
			"div#menu a.a4{padding-right:25px;background:url(../img/bncombined.png) no-repeat center;background-position:right -576px;}",
			"div#menu a.a5{padding-right:25px;background:url(../img/bncombined.png) no-repeat center;background-position:right -648px;}",
			"div#menu a.a1{padding-right:25px;background:url(../img/bncombined.png) no-repeat top;background-position:right -360px;}"
		].join('\n') + '\n';
	})()); 

	// gm_config styling
	GM_addStyle((function () {
		return [
			"div[id$='_wrapper'] * { font-family: calibri,arial,tahoma,myriad pro,sans-serif; }",
			"div[id$='_wrapper'] { background: #FFF; padding: 0px; height: 99%; background-repeat: no-repeat; background-position: top right; background-size: contain; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADwCAYAAABFcSteAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozOTUzNDM0RjA0OTRFMzExQUM2N0E0RUQwRjZEQzYyMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NzYzOTM0Qjk0MDYxMUUzODZFN0NDNzY2NjNGOTcyMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NzYzOTM0QTk0MDYxMUUzODZFN0NDNzY2NjNGOTcyMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNBNTM0MzRGMDQ5NEUzMTFBQzY3QTRFRDBGNkRDNjIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM5NTM0MzRGMDQ5NEUzMTFBQzY3QTRFRDBGNkRDNjIxIi8+IDwvcmRmOkRlc2NyaXB0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); }",

			"div[id$='_wrapper'] .block { display: block; }",
			"div[id$='_wrapper'] .center { text-align: center; }",
			"div[id$='_wrapper'] .indent40 { margin-left: 40%; }",

			"div[id$='_wrapper'] .config_header { font-size: 2em; margin: -5px -5px 0px -5px; background-color: #807373; color:white; white-space: nowrap;}",
			"div[id$='_wrapper'] .config_desc, div[id$='_wrapper'] .section_desc, div[id$='_wrapper'] .reset { font-size: 0.75em; }",

			"div[id$='_wrapper'] .config_var { margin: 0.5em; padding: 0.5em; }",
			"div[id$='_wrapper'] .config_var input[type='checkbox'] { float:left; position:relative; top:2px; margin-right:5px; }",
			"div[id$='_wrapper'] input[type='radio'] { margin-left: 0.5em; margin-top: 0.5em; }",
			"div[id$='_wrapper'] .field_label { font-size: 1em; font-weight: bold; margin-right: 1em; }",
			"div[id$='_wrapper'] .radio_label { font-size: 1em; margin-right: 1em; }",

			"div[id$='_wrapper'] .section_header_holder { margin-top: 1em; }",
			"div[id$='_wrapper'] .section_header { background: #414141; border: 1px solid #000; color: #FFF; font-size: 13pt; margin: 0; }",
			"div[id$='_wrapper'] .section_desc { background: #EFEFEF; border: 1px solid #CCC; color: #575757; font-size: 9pt; margin: 0 0 6px; }",

			"div[id$='_wrapper'] div[id$='_buttons_holder'] { position:absolute; bottom:0px; right:0px; left:0px; color: #000; text-align: right; padding-right:0.5em; padding-bottom:0.5em; }",
			"div[id$='_wrapper'] div.saveclose_buttons { margin:0em 2em 2em 0em; }",
			"div[id$='_wrapper'] button[id$='_saveBtn'] { font-weight:bold; }",
			"div[id$='_wrapper'] button[id$='_closeBtn'] { font-weight:bold; }"
		].join('\n') + '\n';
	})()); 
	/* jshint +W064 */

	// add markItUp! style information (including base64 images).
	// converted by Stephen Cronin
	/* jshint ignore:start */
	GM_addStyle((function () {
		return "\
.markItUp .miuBold   a { background-image:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADCSURBVCjPY/jPgB8yUEtBeUL5+ZL/Be+z61PXJ7yPnB8sgGFCcX3m/6z9IFbE/JD/XucxFOTWp/5PBivwr/f77/gfQ0F6ffz/aKACXwG3+27/LeZjKEioj/wffN+n3vW8y3+z/Vh8EVEf/N8LLGEy3+K/2nl5ATQF/vW+/x3BCrQF1P7r/hcvQFPgVg+0GWq0zH/N/wL1aAps6x3+64M9J12g8p//PZcCigKbBJP1uvvV9sv3S/YL7+ft51SgelzghgBKWvx6E5D1XwAAAABJRU5ErkJggg==); } \
.markItUp .miuItalic a { background-image:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABxSURBVCjPY/jPgB8yUFtBdkPqh4T/kR+CD+A0Ie5B5P/ABJwmxBiE//f/gMeKkAlB/90W4FHg88Dzv20ATgVeBq7/bT7g8YXjBJf/RgvwKLB4YPFfKwCnAjMH0/8a/3EGlEmD7gG1A/IHJDfQOC4wIQALYP87Y6unEgAAAABJRU5ErkJggg==); } \
.markItUp .miuItalic a { background-image:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABxSURBVCjPY/jPgB8yUFtBdkPqh4T/kR+CD+A0Ie5B5P/ABJwmxBiE//f/gMeKkAlB/90W4FHg88Dzv20ATgVeBq7/bT7g8YXjBJf/RgvwKLB4YPFfKwCnAjMH0/8a/3EGlEmD7gG1A/IHJDfQOC4wIQALYP87Y6unEgAAAABJRU5ErkJggg==); } \
.markItUp .miuStrike a { background-image:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACfSURBVCjPY/jPgB8yUFNBiWDBzOy01PKEmZG7sSrIe5dVDqIjygP/Y1GQm5b2P7kDwvbAZkK6S8L/6P8hM32N/zPYu2C1InJ36P/A/x7/bc+YoSooLy3/D4Px/23+SyC5G8kEf0EIbZSmfdfov9wZDCvc0uzLYWyZ/2J3MRTYppn/14eaIvKOvxxDgUma7ju1M/LlkmnC5bwdNIoL7BAAWzr8P9A5d4gAAAAASUVORK5CYII=); } \
.markItUp .miuPara a { background-image:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD7SURBVDjLY/z//z8DJYCJgULAgi6gUvvEWEOVY6aqJJsxw79/DAxIDrxw+9ee/blirnhdYKjHtcpKmd1YiZ+JQZKbmeHivV97+j0EGEGaGf4T4QIZPiYlXhZGsM2g4Pn/FyL+/x+I/Ec4DEA2vv32jwEetjAa6B2YYXgNeHD/Z9iOM19XP3j3h+Hbz/9ATRBbwbH19z9hL9zrkn0PpMIUCh4Jaqpz7IZF8/8/DAwMWKIcZzQ+mCD3/tu3v+8Z/sC88h8aDgRcgAzAfoa54C9WB+A3AORnmCYw/ZdEA/4hO/kvAwMDyS74j4j6//+w6ifkBYQmXAmJccBzIwCU7Hm5Y0odkQAAAABJRU5ErkJggg==); } \
.markItUp .miuQuote a { background-image:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAE6wAABOsB2CpbDQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMi8xNy8xMDDu1gEAAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAACpSURBVDiN3ZNBEcIwEEXfxwCRgIRIqIRIqIRKqIRKqIRKQAISKgEULJfALFvCDNPhQmb2kDe7L38PkZmx5xx2Tf9EIClLGiV1jiVJg6R+YzCzZwEnwFyVylfHppeZIBiDYAG6wK5+Jq5wDvcEXICbY8fmCjVFcZGnynKVG7A2V3CSR+wcuAHjR0GNvQB94AMwb/pDU67DJQjn+HJLkBorveVmhv7wL3x77lt07yU8O9VYAAAAAElFTkSuQmCC); } \
.markItUp .miuUList a { background-image:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADqSURBVDjLY/j//z8DJZiBKgbkzH9cMHXX6wcgmiwDQJq3nv/4H0SD+OXl5dlA/L+kpOR/QUHB/+zs7P+pqan/ExIS/kdGRv4PDg7+T10XDHwgpsx8VNC56eWDkJ675Hmhbf3zB0uPvP1fuvQpOBDj4uKyIyIi/gcGBv738vL67+zs/N/Gxua/iYnJf11d3f9qamqogRjQcaugZPHjB66V14ZqINrmXyqIn3bvgXXeJfK8ANLcv+3lfxAN4hsZGWVra2v/V1FR+S8nJ/dfXFz8v5CQ0H8eHp7/7Ozs/5mZmVEDEWQzRS6gBAMAYBDQP57x26IAAAAASUVORK5CYII=); } \
.markItUp .miuOList a { background-image:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD3SURBVDjLY/j//z8DJRhM5Mx/rLLo8Lv/ZBsA0kyRATBDYOzy8vJsIP5fUlLyv6Cg4H92dvb/1NTU/wkJCf8jIyP/BwcH/8fqgkUHSXcFA1UCce7+t/9n7Xn9P2LiPRWyXRDae0+ld8tL8rwQ1HVHpXPTc7jmuLi47IiIiP+BgYH/vby8/js7O/+3sbH5b2Ji8l9XV/e/mpoaaiC2rX/+v3HN0/81q54OUCCWL3v8v3Tp4//Fix+T7wKQZuu8S+THAkgzzAVGRkbZ2tra/1VUVP7Lycn9FxcX/y8kJPSfh4fnPzs7+39mZmbUQARpBGG7oisddA9EAPd/1bRtLxctAAAAAElFTkSuQmCC); } \
.markItUp .miuListitem a { background-image:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAAHZJREFUOI1j/P//PwMlgIki3aMGUNGAlJmPCzo3vXoQ0nOvgFQDWBgYGBiUxFgLZIRY5N9IchQwMDBMiIuLy/7169eUnz9/MiDjHz9+wNm3bt1iZGBgYGD4//8/g3/7rYLiRY8fuFRcK/j//z8DKZhxNCUOAgMAzxFaerduvZMAAAAASUVORK5CYII=); } \
.markItUp .miuImage a { background-image:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHwSURBVDjLpZM9a1RBFIafM/fevfcmC7uQjWEjUZKAYBHEVEb/gIWFjVVSWEj6gI0/wt8gprPQykIsTP5BQLAIhBVBzRf52Gw22bk7c8YiZslugggZppuZ55z3nfdICIHrrBhg+ePaa1WZPyk0s+6KWwM1khiyhDcvns4uxQAaZOHJo4nRLMtEJPpnxY6Cd10+fNl4DpwBTqymaZrJ8uoBHfZoyTqTYzvkSRMXlP2jnG8bFYbCXWJGePlsEq8iPQmFA2MijEBhtpis7ZCWftC0LZx3xGnK1ESd741hqqUaqgMeAChgjGDDLqXkgMPTJtZ3KJzDhTZpmtK2OSO5IRB6xvQDRAhOsb5Lx1lOu5ZCHV4B6RLUExvh4s+ZntHhDJAxSqs9TCDBqsc6j0iJdqtMuTROFBkIcllCCGcSytFNfm1tU8k2GRo2pOI43h9ie6tOvTJFbORyDsJFQHKD8fw+P9dWqJZ/I96TdEa5Nb1AOavjVfti0dfB+t4iXhWvyh27y9zEbRRobG7z6fgVeqSoKvB5oIMQEODx7FLvIJo55KS9R7b5ldrDReajpC+Z5z7GAHJFXn1exedVbG36ijwOmJgl0kS7lXtjD0DkLyqc70uPnSuIIwk9QCmWd+9XGnOFDzP/M5xxBInhLYBcd5z/AAZv2pOvFcS/AAAAAElFTkSuQmCC); } \
.markItUp .miuLink a { background-image:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADpSURBVCjPY/jPgB8y0EmBHXdWaeu7ef9rHuaY50jU3J33v/VdVqkdN1SBEZtP18T/L/7f/X/wf+O96kM3f9z9f+T/xP8+XUZsYAWGfsUfrr6L2Ob9J/X/pP+V/1P/e/+J2LbiYfEHQz+ICV1N3yen+3PZf977/9z/Q//X/rf/7M81Ob3pu1EXWIFuZvr7aSVBOx1/uf0PBEK3/46/gnZOK0l/r5sJVqCp6Xu99/2qt+v+T/9f+L8CSK77v+pt73vf65qaYAVqzPYGXvdTvmR/z/4ZHhfunP0p+3vKF6/79gZqzPQLSYoUAABKPQ+kpVV/igAAAABJRU5ErkJggg==); } \
.markItUp .miuPre a { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAVklEQVQ4jd2RMRKAMAgE99e2lvwaG3AmQUik0yu55bhM4Jc6mh4AJ6CFr8ak6QpIESDGhCZ++Sl9Dg5stZx5wzyr9aZVgDutyqVtxp+TafVLd0jH+6ouv8Qn9i0hc5QAAAAASUVORK5CYII=); } \
.markItUp .miuClean a { background-image:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAAhlJREFUOI2lk0toE1EYhc9kZmoeauyAMrZ5NFNsOo1tKm7MooIgKnTlqlkVF0LAlaWLuBG7kGJAV4qu7EYQtSvREkwVxKRWwVhLqKR5OK04Tu0jjQnNY5zJuBptbVqK/Zbnv+e73B8uoWkadoNhV+2tBMdufrX+t6A7NG9lGSrsf7KQ17P+Z8v53gcLb7tD85vEGwTeYYFhGTrMsw2+crGW0/NSuZbzsLSPZeiw52qWqSvoui74jx6xiHwT7ct8k4Vkotijz1KptZ6UJAt8E+3rbLeI7suzfn1GaJqGzqEvDR1u8xLXSO8XVmQlPpk/kb7Dx9ffxAfTx71de9/Z95FURpILU+9/Hpwb8cgGAEgMcfKnD4VARqpWGNpAtXLmUWd/olkvuwdTzZzDOMrQBiorVSsfJ1YDcyMeGQAo/dDsrbZHroszEZvN+Ly91eRT2yxRABwAXDA8THijjxvpxSwUEisB1FoA5e8T1mPzT1vtTlOYYeiOsaDrQKzPEbTYHTf4U+exh/OgPB3B5+i4mksmB868+nV7k+BfXpymsicHQpwp+xoQJwCrFcuUE/FITDj7UuGobdsAyBrhMh52Ab2DfzLqGguyRrRs2MFWqKQmlqbGbJanl1At/0AJQLFAQiXxHdjBXzAzh+7PTL5RpIoJBZLGao5AWiRUDbgL1FliPWJ99itrOSlAqoRTJTVRA+6dG1eGdyzYjt/h2M+sdF20TgAAAABJRU5ErkJggg==); } \
.markItUp .miuSymbols a { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQCAYAAADESFVDAAABWklEQVQokV2RoUsEURDGxxMUBQ2CQdFgMIkeiO2Clttzd2e+mV15GMRmESxmy/ofeEVQi8UsIljMFqOCKBpF8ECvCIJwruEt53IfvPCY35v55ntEhZh5HbAnEXyL2FUQBDNUFoBVwPLyEdFn59xQFxKxS1+QrTAMRwG9BixX1aQM3QKWB0Ew7Ttb5jtiuwsxS1PEWsxrs8xcZbYPwDoAFrqQc26MmatRFM2LWKvwdUC9ajQac4C9e292mmVZJQzdeMlTuiiinwVwSER9ZrYiol8itkn1en1SJHkFLGfWM+dcv++q7WLDXQJw7D0kF865fiKiWq02AugdYHkcxw0C7E1Ef9M0negJuF6MPyLAfgBt9y6SpulUMe6cAH0sglsoQ8zY8D6lSarJnr/YQxRFS865AWaO/uNIlikMw0FAb3o/2D9MTko5yXAcyz5gL4B1VO0ewE6WZRUioj/Jxqav3Wo6lAAAAABJRU5ErkJggg==); } \
.markItUp * { margin:0px; padding:0px; outline:none; } \
.markItUp a:link, .markItUp a:visited { color:#000; text-decoration:none; } \
.markItUp  { width:100% !important; margin:5px 0 5px 0; } \
.markItUpContainer  { border: 2px solid #807373; padding:5px 10px 0px 0px; font:1em Calibri, Verdana, Arial, Helvetica, sans-serif; color:white; } \
.markItUpEditor { font:1em Calibri, Verdana, Arial, Helvetica, sans-serif; background-color: #eeeeee; padding:5px !important; width:100% !important; border:none; margin:0px; height:320px; clear:both; display:block; line-height:18px; overflow:auto; } \
.markItUpPreviewFrame	{ overflow:auto; background-color:#FFFFFF; border:1px solid #3C769D; width:99.9%; height:300px; margin:5px 0; } \
.markItUpFooter { width:100%; cursor:n-resize; } \
.markItUpResizeHandle { overflow:hidden; width:22px; height:5px; margin-left:auto; margin-right:auto; cursor:n-resize; background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAGAgMAAABROz0wAAAAA3NCSVQICAjb4U/gAAAADFBMVEWwuL/////39/eyub9nsXv9AAAABHRSTlP/AP//07BylAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNy8yMS8wN4dieEgAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAAMElEQVQImWNwDBF1DGFgaIwQbYxgYFgaFbo0yoEhlDUglNWBIYw1IQxETc0Mm+oAANc3CrOvsJfnAAAAAElFTkSuQmCC); } \
.markItUpHeader ul { padding-left:3px; } \
.markItUpHeader ul li	{ list-style:none; float:left; position:relative; } \
.markItUpHeader ul li ul{ display:none; } \
.markItUpHeader ul li:hover > ul{ display:block; } \
.markItUpHeader ul .markItUpDropMenu { margin-right:5px; background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAAG9JREFUGJW10DEKwlAURNETUbEWEUGwtv/7X8KswA1YayCCxbeJ8BXBNJlqHlwuj+lqraZmMZmcFV6+SyllhQtOX8wdhyRDa37ijNt4d3jgmGSArl2jlAIbXLHGPkn/8+ckRtsOW/SN5NP8L/NN9wKnXh+mOmZQKgAAAABJRU5ErkJggg==) no-repeat 115% 50%; } \
.markItUpHeader ul .markItUpDropMenu li { margin-right:0px; } \
.markItUpHeader ul .markItUpSeparator { margin:0 10px; width:1px; height:16px; overflow:hidden; background-color:#CCC; } \
.markItUpHeader ul ul .markItUpSeparator { width:auto; height:1px; margin:0px; } \
.markItUpHeader ul ul { display:none; position:absolute; top:18px; left:0px; background:#F5F5F5; border:1px solid #3C769D; height:inherit; } \
.markItUpHeader ul ul li { float:none; border-bottom:1px solid #3C769D; } \
.markItUpHeader ul ul .markItUpDropMenu { background:#F5F5F5 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACCSURBVHjaYvz//z8DsQAggJjQBUxMTLhwKQYIICYsYi+AGniwKQYIIGyKeYH4FTYNAAHEhMNGTqgGdmRBgADCpRjk6x9A/AdZECCAcCn+AMQSZ86c+YssCBBA2BQ/gCr8hS4BEEAMoHBGxsbGxizoYjAMEECMpEQKQAAxMZAAAAIMAGsVNanzZRR/AAAAAElFTkSuQmCC) no-repeat 100% 50%; } \
.markItUpHeader ul ul ul { position:absolute; top:-1px; left:150px; } \
.markItUpHeader ul ul ul li { float:none; } \
.markItUpHeader ul a { display:block; width:16px; height:16px; text-indent:-10000px; background-repeat:no-repeat; padding:3px; margin:0px; } \
.markItUpHeader ul ul a { display:block; padding-left:0px; text-indent:0; width:120px; padding:5px 5px 5px 25px; background-position:2px 50%; } \
.markItUpHeader ul ul a:hover  { color:#FFF; background-color:#3C769D; } \
.markItUp .palette a { background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABjSURBVDjLY/j//z8DJZiBagb8y8/+D8NgsVXF/+EYyP9wNf0/DA9SAygOgwuvN/2HYRA/4EzufxgG8RM2vP4Pw4PUAIrDIKJqw38YBvFvzr77H4bBaso3/ofjwWnAwGcmcjEAc0v+JGPFQvwAAAAASUVORK5CYII=); } \
.markItUp .palette ul { width:81px; padding:1px; } \
.markItUp .palette li { border:1px solid white; width:25px;	height:25px; overflow:hidden; padding:0px; margin:0px; float:left; } \
.markItUp .palette ul a { width:25px;	height:25px; } \
.markItUp .palette ul a:hover { background-color:transparent; } \
.markItUp .palette .col1-1 a { background:#FCE94F; } \
.markItUp .palette .col1-2 a { background:#EDD400; } \
.markItUp .palette .col1-3 a { background:#C4A000; } \
.markItUp .palette .col2-1 a { background:#FCAF3E; } \
.markItUp .palette .col2-2 a { background:#F57900; } \
.markItUp .palette .col2-3 a { background:#CE5C00; } \
.markItUp .palette .col3-1 a { background:#E9B96E; } \
.markItUp .palette .col3-2 a { background:#C17D11; } \
.markItUp .palette .col3-3 a { background:#8F5902; } \
.markItUp .palette .col4-1 a { background:#8AE234; } \
.markItUp .palette .col4-2 a { background:#73D216; } \
.markItUp .palette .col4-3 a { background:#4E9A06; } \
.markItUp .palette .col5-1 a { background:#729FCF; } \
.markItUp .palette .col5-2 a { background:#3465A4; } \
.markItUp .palette .col5-3 a { background:#204A87; } \
.markItUp .palette .col6-1 a { background:#AD7FA8; } \
.markItUp .palette .col6-2 a { background:#75507B; } \
.markItUp .palette .col6-3 a { background:#5C3566; } \
.markItUp .palette .col7-1 a { background:#EF2929; } \
.markItUp .palette .col7-2 a { background:#CC0000; } \
.markItUp .palette .col7-3 a { background:#A40000; } \
.markItUp .palette .col8-1 a { background:#FFFFFF; } \
.markItUp .palette .col8-2 a { background:#D3D7CF; } \
.markItUp .palette .col8-3 a { background:#BABDB6; } \
.markItUp .palette .col9-1 a { background:#888A85; } \
.markItUp .palette .col9-2 a { background:#555753; } \
.markItUp .palette .col9-3 a { background:#000000; } \
";
	})());
	/* jshint ignore:end */

	/* jshint -W064 */
	try {
		GM_addStyle(GM_getResourceText('magnificcss')); 
		GM_addStyle(GM_getResourceText('juipepper'));
		GM_addStyle(GM_getResourceText('spectrumcss'));
	} catch (ex) {
		console.error("Fix bN Failed applying css resources", ex);
	}
	/* jshint +W064 */

	__fixbn.fix();

});
console.info("Fix bN v" + GM_info.script.version);