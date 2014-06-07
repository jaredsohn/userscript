// ==UserScript==
// @name         yingzheng.com.auto.bet.user.js
// @description  Auto Bet for yingzheng.com
// @include      http://*yingzheng.com/plugin.php?id=fy_guess:guess
// @include      http://*yingzheng.com/plugin.php?id=fy_guess:guess&action=guess_list*
// @include      http://*yingzheng.com/plugin.php?id=fy_guess:guess&action=my_list*
// ==/UserScript==

/*
 * created date:  20121110
 * modified date: 20140115
 */

(function () {
	var getParentNodeByTagName = function (node, tag) {
		while (node.parentNode) {
			if (node.parentNode.tagName.toLowerCase() == tag.toLowerCase()) {
				return node.parentNode;
			} else {
				node = node.parentNode;
			}
		}

		return null;
	};

	var createElement = function (config) {
		if ("tag" in config) {
			var el = document.createElement(config.tag);

			if ("attrs" in config) {
				for (var attr in config.attrs) {
					el.setAttribute(attr, config.attrs[attr]);
				}
			}

			if ("text" in config) {
				el.innerHTML = config.text;
			}

			return el;
		} else {
			return null;
		}
	};

	var getX = function (obj) {
		var left = 0;

		while (obj) {
			left += obj.offsetLeft;
			obj = obj.offsetParent;
		}

		return left;
	};

	var getY = function (obj) {
		var top = 0;

		while (obj) {
			top += obj.offsetTop;
			obj = obj.offsetParent;
		}

		return top;
	};

	// add style
	document.getElementsByTagName("head")[0].appendChild(createElement({
		tag: "style",
		attrs: {
			type: "text/css"
		},
		text: [
			".snav ul li a {width: 80px !important;}",
			".snav *, th {background-color: #000 !important;}",

			"#profit {margin: 0 4px;}",
			"#money, .money {width: 60px; border: 2px solid #000; margin-left: 5px;}",
			"th, td {white-space: nowrap;}",

			".hot {border: 2px solid #f00;}",
			".cold {border: 2px solid #00f;}",
			".result {color: #f00;}",

			".myChoice.doing {background-color: #ff0;}",
			".myChoice.done {background-color: #0f0;}",
			".myChoice.fail {background-color: #f00;}",

			"th button, td button, #followBet {background-color: #fff; border: 2px solid #000; margin: 0 5px; padding: 0 2px; cursor: pointer;}",
			"th input {border-color: #c0c0c0 !important;}",
			"th button {border-color: #c0c0c0; padding: 0 .5em;}",
			"th label, button[disabled] {cursor: default;}",

			".tab-button {border: 2px solid #000; font-size: 12px; padding: 0 2px;}",
			".tab-button:not(:last-child) {margin-right: 4px;}",
			".name {border: 1px solid #000; margin: 2px; display: inline-block; font-size: 12px;}"
		].join("\n")
	}));

	// add a button to calculate the profit
	var profitButton = createElement({
		tag: "button",
		attrs: {
			title: "点击计算本页面收益",
			style: "color: #f00; cursor: pointer;"
		},
		text: "收益"
	});

	profitButton.onclick = function () {
		var total = 0;
		var nodes = document.querySelectorAll(".gained-money");
		for (var i = nodes.length; i--;) {
			total += parseInt(nodes[i].innerHTML);
		}

		document.querySelector("#profit").innerHTML = [total >= 0? "赢" : "输", Math.abs(total), "金币"].join(" ");
	};

	document.querySelector(".right").appendChild(profitButton);

	document.querySelector(".right").appendChild(createElement({
		tag: "span",
		attrs: {
			id: "profit"
		}
	}));

	var isGuessList = location.href.indexOf("my_list") == -1? true : false;

	// get top 20 list
	var topRanks = {};

	if (isGuessList) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "plugin.php?id=fy_guess:guess&action=rank_page", true);
		xhr.onreadystatechange = (function () {
			return function () {
				if (this.readyState == 4 && this.status == 200) {
					var topUsers = [];

					var trs = this.responseText.split("wy_rank_table")[2].split("</table>")[0].split("<tr>");
					trs.shift();

					for (var i = trs.length; i--;) {
						var temp = [];
						trs[i].replace(/>(.+)</g, function (s, s1) {
							temp.push(s1);
						});

						topRanks[temp[1]] = parseFloat(temp[4].replace(/%$/, ""));
						topUsers.push(temp[1]);
					}

					topUsers.sort(function (a, b) {
						return topRanks[b] - topRanks[a];
					});

					for (var i = 0, len = topUsers.length; i < len; i++) {
						topRanks[topUsers[i]] = i + 1;

						document.querySelector("#followings").appendChild(createElement({
							tag: "option",
							attrs: {
								value: topUsers[i]
							},
							text: (i + 1) + ". " + topUsers[i]
						}));
					}
					document.querySelector("#following").value = topUsers[0];
				}
			};
		})();
		xhr.send();
	}

	// add bet buttons for one-click
	var tr = document.querySelector("tr.tbbg1");
	var th = createElement({
		tag: "th",
		attrs: {
			colspan: 2
		},
		text: isGuessList == true? ["<label>注额 </label><input type='number' min='10' max='500' step='50' id='money' value='500' placeholder='10-500' />", "<input type='checkbox' id='nba' /><label onclick='javascript: this.previousSibling.click();' style='cursor: pointer;'> NBA </label>"].join(" ") : "下注情况"
	});
	tr.appendChild(th);

	var typesConv = {
		"主": "胜",
		"平": "平",
		"客": "负"
	};

	var selectors = {
		"胜": ".win.bet",
		"平": ".draw.bet",
		"负": ".lost.bet",
		"热": ".bet.hot",
		"中": ".bet.middle",
		"冷": ".bet.cold"
	};

	if (isGuessList) {
		// following bet
		document.body.appendChild(createElement({
			tag: "div",
			attrs: {
				style: "position: absolute; top: " + (getY(tr) - 25) + "px; left: " + (getX(tr) + tr.offsetWidth) + "px; margin-left: 8px;"
			},
			text: "<select id='followings' style='width: 120px;' onchange='javascript: document.querySelector(\"#following\").value = this.value;'></select><input id='following' style='margin-left: -116px; width: 100px; border: 0;' /><span style='width: 20px; display: inline-block;'></span><button id='followBet'>跟投</button>"
		}));

		document.querySelector("#followBet").onclick = function () {
			var getFollowingGuess = function (text, following) {
				var trs = text.split("<table")[2].split("</table")[0].split("<tr>");
				trs.shift();

				for (var i = trs.length; i--;) {
					var temp = [];
					trs[i].replace(/>(.+)</g, function (s, s1) {
						temp.push(s1);
					});

					if (temp[0] == following) {
						return typesConv[temp[1][0]];
					}
				}

				return "";
			};

			var following = document.querySelector("#following").value;
			if (!window.confirm("跟投对象：" + following + "\n确认要进行批量下注？")) {
				return;
			}

			var images = document.querySelectorAll("td:nth-child(8) a img[src$='btn3.gif']");
			for (var i = 0, len = images.length; i < len; i++) {
				var tr = getParentNodeByTagName(images[i], "tr");

				if (tr.querySelector(".myChoice") || parseInt(tr.querySelector("td:nth-child(7)").innerHTML) == 0) {
					continue;
				}

				var guesserList = images[i].parentNode.href.replace("show_guess", "guesser_list");

				var followingGuess = getFollowingGuess(tr.getAttribute("guesserList"), following);

				if (followingGuess == "") {
					var pageNum = parseInt(tr.getAttribute("pageNum"));

					for (var j = 2; j <= pageNum && followingGuess == ""; j++) {
						var xhr = new XMLHttpRequest();
						xhr.open("GET", guesserList + "&page=" + j, false);
						xhr.send();

						followingGuess = getFollowingGuess(xhr.responseText, following);
					}
				}

				if (followingGuess != "") {
					var match = tr.querySelector(selectors[followingGuess]);

					if (match.disabled) {
						continue;
					}

					var matchClass = tr.querySelector("td:nth-child(2)");
					if (matchClass.innerHTML.indexOf("NBA") > -1 && document.querySelector("#nba").checked == false) {
						continue;
					}

					match.click();
				}
			}
		}

		// batch bet
		for (var type in selectors) {
			var button = createElement({
				tag: "button",
				attrs: {
					title: "点击下注"
				},
				text: type
			});

			if (selectors[type].indexOf(".bet.") == 0) {
				var hotCold = selectors[type].replace(/.*\./, "");
				button.setAttribute("class", hotCold);
			}

			button.onclick = (function (th, type, selector) {
				return function () {
					if (!window.confirm("下注选择：" + type + "\n确认要进行批量下注？")) {
						return;
					}

					var isDrawOrMid = type.search(/[平中]/) > -1? true : false;
					var buttons = th.querySelectorAll("button");
					for (var i = buttons.length; i--;) {
						if (isDrawOrMid && buttons[i].innerHTML.search(/[平中]/) == -1) {
							continue;
						}

						buttons[i].disabled = true;
						buttons[i].removeAttribute("title");
						buttons[i].style.color = "#c0c0c0";
					}

					var matches = document.querySelectorAll(selector);
					for (var i = matches.length; i--;) {
						if (matches[i].disabled) {
							continue;
						}

						var matchClass = matches[i].parentNode.parentNode.querySelector("td:nth-child(2)");
						if (matchClass.innerHTML.indexOf("NBA") > -1 && document.querySelector("#nba").checked == false) {
							continue;
						}

						matches[i].click();
					}
				};
			})(th, type, selectors[type]);

			th.appendChild(button);
		}
	}

	// add bet buttons for each match
	var links = document.querySelectorAll("td:nth-child(8) a");
	for (var i = 0, len = links.length; i < len; i++) {
		var tr = getParentNodeByTagName(links[i], "tr");

		var td = createElement({
			tag: "td",
			attrs: {
				class: tr.querySelector("td:last-child").getAttribute("class"),
				colspan: 2
			}
		});
		tr.appendChild(td);

		if (links[i].href.indexOf("guess_id=") == -1) {
			continue;
		}

		var xhr = new XMLHttpRequest();
		xhr.open("GET", links[i].href, true);

		xhr.onreadystatechange = (function (url, td, topRanks) {
			return function () {
				if (this.readyState == 4 && this.status == 200) {
					td.style.textAlign = "left";

					this.responseText.replace(/截止时间.*(\d{4}-\d{2}-\d{2}).*(\d{2}:\d{2}:\d{2})/, function (s, s1, s2) {
						td.parentNode.querySelector("td:nth-child(9)").innerHTML = s1 + "<br />" + s2;
					});

					var alreadyPaid = this.responseText.indexOf("结算后我的收益") > -1? true : false;

					var alreadyBet = false;
					var myGuessType;
					this.responseText.replace(/>([^>]+)， 押注了 (\d+)/, function (s, s1, s2) {
						alreadyBet = true;

						myGuessType = typesConv[s1[0]];
						myGuessMoney = parseInt(s2);

						if (!alreadyPaid) {
							td.appendChild(createElement({
								tag: "button",
								attrs: {
									disabled: "",
									title: "点击下注"
								},
								text: "下注 " + myGuessMoney
							}));
						}
					});

					var cannotBet = false;
					if (this.responseText.indexOf("未参与投注") > -1 || (!alreadyBet && this.responseText.indexOf("已结束") > -1)) {
						td.appendChild(createElement({
							tag: "button",
							attrs: {
								disabled: ""
							},
							text: "未参与"
						}));
						cannotBet = true;
					} else {
						td.appendChild(createElement({
							tag: "input",
							attrs: {
								class: "money",
								style: alreadyBet? "display: none;" : "",
								type: "number",
								min: 10,
								max: 500,
								step: 50,
								placeholder: "10-500"
							}
						}));
					}

					var myMoney = 0;
					this.responseText.replace(/var my_money = (\d+);/, function (s, s1) {
						myMoney = parseInt(s1);
					});

					var guesserNum = 0;
					this.responseText.replace(/var choices_arr = (.*);/, function (s, s1) {
						var choices = [];
						var choices2 = JSON.parse(s1); // {}
						var sortedRates = [];
						for (var id in choices2) {
							choices2[id].rate_2 = parseFloat(choices2[id].rate_2);
							choices.push(choices2[id]);
							sortedRates.push(sortedRates.length);
							guesserNum += parseInt(choices2[id].choice_count);
						}
						sortedRates.sort(function (a, b) {
							return choices[a].rate_2 - choices[b].rate_2;
						});

						var types = "胜负";
						var classes = ["win", "lost"];
						if (choices.length == 3) {
							  types = "胜平负";
							  classes.splice(1, 0, "draw");
						}

						for (var i = 0, len = choices.length; i < len; i++) {
							var hotCold = "";
							if (i == sortedRates[0]) {
								hotCold = "hot";
							} else if (i == sortedRates.slice(-1)) {
								hotCold = "cold";
							} else {
								hotCold = "middle";
							}

							var button = createElement({
								tag: "button",
								attrs: {
									class: [classes[i], "bet", hotCold].join(" "),
									title: "点击下注"
								},
								text: types[i] + " (" + choices[i].rate_2 + ")<br />(" + [choices[i].choice_count, choices[i].choice_money].join(": ") + ")"
							});

							var gainedMoney = 0;
							if (alreadyBet || cannotBet) {
								if (choices[i].is_correct == "1") {
									button.setAttribute("class", button.getAttribute("class") + " result");
								}

								if (alreadyBet && types[i] == myGuessType) {
									button.setAttribute("class", button.getAttribute("class") + " myChoice done");
									if (alreadyPaid) {
										if (choices[i].is_correct == "1") {
											gainedMoney = Math.round(myGuessMoney * (choices[i].rate_2 - 1));
										} else {
											gainedMoney = -myGuessMoney;
										}

										var moneyInput = td.querySelector(".money");

										moneyInput.parentNode.insertBefore(createElement({
											tag: "button",
											attrs: {
												disabled: ""
											},
											text: "下注 " + myGuessMoney + "<br />" + (gainedMoney >= 0? "+" : "") + gainedMoney
										}), moneyInput);

										document.body.appendChild(createElement({
											tag: "div",
											attrs: {
												class: "gained-money",
												style: "display: none;"
											},
											text: gainedMoney
										}));
									}
								}

								button.disabled = true;
								button.removeAttribute("title");
							} else {
								button.onclick = (function (url, choiceId, myMoney) {
									return function () {
										var money = this.parentNode.querySelector(".money").value;
										if (!money) {
											money = document.querySelector("#money").value;
										}

										money = parseInt(money || 0);
										if (money < 10 || money > 500) {
											//alert("注额：10 - 500");
											return;
										}

										if (money > myMoney) {
											//alert("金币不足");
											return;
										}

										var moneyInput = this.parentNode.querySelector(".money");
										moneyInput.style.display = "none";

										moneyInput.parentNode.insertBefore(createElement({
											tag: "button",
											attrs: {
												disabled: ""
											},
											text: "下注 " + money
										}), moneyInput);

										var buttons = this.parentNode.querySelectorAll("button");
										for (var i = 0; i < buttons.length; i++) {
											buttons[i].setAttribute("id", "");
											buttons[i].disabled = true;
											buttons[i].removeAttribute("title");
										}
										this.setAttribute("class", this.getAttribute("class") + " myChoice doing");

										var xhr = new XMLHttpRequest();
										xhr.open("POST", url, true);
										xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

										xhr.onreadystatechange = (function (button) {
											return function () {
												if (this.readyState == 4 && this.status == 200) {
													var status = "fail";
													if (this.responseText.indexOf("成功") > -1) {
														status = "done";
													}
													button.setAttribute("class", button.getAttribute("class").replace("doing", status));
												}
											};
										})(this);

										xhr.send("choice_id=" + choiceId + "&money=" + money);
									};
								})(url.replace("show_guess", "start_guess"), choices[i].choice_id, myMoney);
							}

							td.appendChild(button);
						}
					});

					if (guesserNum > 0 && !alreadyBet && !cannotBet) {
						td.style.borderRightWidth = 0;
						td.removeAttribute("colspan");

						td2 = createElement({
							tag: "td",
							attrs: {
								class: td.getAttribute("class"),
								style: "border-left-width: 0;"
							}
						});
						td.parentNode.appendChild(td2);

						var text = this.responseText.split("guesser_dom")[1];
						var pageNum = text.split("<table")[2].split("</table")[1].split("guesser_list_page").length - 1;
						text = text.split("</table")[0];

						td.parentNode.setAttribute("guesserList", text);
						td.parentNode.setAttribute("pageNum", pageNum);

						var button = createElement({
							tag: "button",
							attrs: {
								title: "点击查看"
							},
							text: "明灯"
						});

						button.onclick = (function (url, td, text, pageNum) {
							return function () {
								this.disabled = true;
								this.removeAttribute("title");
								this.style.color = "#c0c0c0";

								var getGuesserList = function (text) {
									var trs = text.split("<table")[2].split("</table")[0].split("<tr>");
									trs.shift();

									for (var i = trs.length; i--;) {
										var temp = [];
										trs[i].replace(/>(.+)</g, function (s, s1) {
											temp.push(s1);
										});

										if (temp[0] in topRanks) {
											var type = typesConv[temp[1][0]];

											if (type in guesserList) {
												guesserList[type].push(topRanks[temp[0]] + ". " + temp[0] + "：" + temp[2]);
											} else {
												guesserList[type] = [topRanks[temp[0]] + ". " + temp[0] + "：" + temp[2]];
											}
										}
									}
								};

								var guesserList = {};
								var hasGuesser = false;

								getGuesserList(text);

								for (var i = 2; i <= pageNum; i++) {
									var xhr = new XMLHttpRequest();
									xhr.open("GET", url + "&page=" + i, false);
									xhr.send();

									getGuesserList(xhr.responseText);
								}

								var sideContainer = createElement({
									tag: "div",
									attrs: {
										style: "max-width: 200px; position: absolute; top: " + (getY(td) + 10) + "px; left: " + (getX(td) + td.offsetWidth) + "px; margin-left: 8px;"
									}
								});

								var types = "胜平负";
								for (var i = 0, len = types.length; i < len; i++) {
									var type = types[i];
									if (!(type in guesserList)) {
										continue;
									}

									hasGuesser = true;

									guesserList[type].sort(function (a, b) {
										return parseInt(a.replace(/\..*/, "")) - parseInt(b.replace(/\..*/, ""));
									});

									var choice = createElement({
										tag: "span",
										attrs: {
											class: "tab-button"
										},
										text: type + " #" + guesserList[type][0].replace(/\..*/, "")
									});

									var btn = createElement({
										tag: "span",
										attrs: {
											style: "display: none; font-size: 12px; font-weight: 900; color: #f00; cursor: pointer; margin-left: 5px;",
											title: "点击下注"
										},
										text: "+"
									});

									btn.onclick = (function (td, button, type) {
										return function () {
											if (td.parentNode.querySelector(selectors[type])) {
												td.parentNode.querySelector(selectors[type]).click();
											}

											this.parentNode.parentNode.style.display = "none";
											button.style.display = "none";
										};
									})(td, this, type);

									choice.appendChild(btn);

									choice.onclick = (function (guesserList) {
										return function () {
											this.style.borderColor = "#ff0";
											this.style.backgroundColor = "#ff0";
											this.querySelector("span").style.display = "";
											this.parentNode.style.zIndex = 10;

											var temp = [];
											guesserList.forEach(function (value, index) {
												temp[index] = "<span class='name'>" + value + "</span>";
											});

											var guesser = this.parentNode.querySelector(".guesser-list");
											guesser.innerHTML = "有 " + temp.length + " 人：<br />" + temp.join("");
											guesser.style.display = "";
										};
									})(guesserList[type]);

									choice.onmouseover = choice.onclick;

									choice.onmouseout = function () {
										this.style.borderColor = "#000";
										this.style.backgroundColor = "";
										this.querySelector("span").style.display = "none";
										this.parentNode.querySelector(".guesser-list").style.display = "none";
										this.parentNode.style.zIndex = 1;
									};

									sideContainer.appendChild(choice);
								}

								if (hasGuesser) {
									sideContainer.appendChild(createElement({
										tag: "div",
										attrs: {
											class: "guesser-list",
											style: "background-color: #ff0; padding: 5px; display: none;"
										}
									}));
								} else {
									sideContainer.appendChild(createElement({
										tag: "span",
										attrs: {
											class: "tab-button"
										},
										text: "暂无"
									}));
								}

								document.body.appendChild(sideContainer);
							}
						})(url.replace("show_guess", "guesser_list"), td2, text, pageNum);

						td2.appendChild(button);
					}
				}
			};
		})(links[i].href, td, topRanks);

		xhr.send();
	}
})();
