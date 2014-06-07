// ==UserScript==
// @name           PlurkLock
// @namespace      http://www.plurk.com/
// @description    PlurkLock
// @include        http://www.plurk.com/*
// ==/UserScript==

	try {
		FRIENDS;
	} catch (e) {
		FRIENDS = null;
	}
	if(FRIENDS!=null){

	getAllFriends = loadJSON("/Friends/getMyFriendsCompletion", "POST");
	getAllFriends.addCallback(function(d){MY_ALL_FRIENDS = d;});
	getAllFriends.sendReq({ });

		MoreOptions.renderPlurkVisibility=
		function () {
			var e = createListHolder("auto_ta_holder", "auto_ta_input");
			var e2 = createListHolder("auto_ta_holder2", "auto_ta_input2");
			var c = e[0];
			var b = e[1];
			var c2 = e2[0];
			var b2 = e2[1];

			var g, f, a;
			var g2, f2, a2;
			var d = DIV({c: "holder"}, 
				DIV({c: "caption"}, _("Who can see this plurk?")), 
				DIV({c: "item"}, f = MoreOptions._createRadio("to", "everybody", "input_everybody"), " ", 
					SPAN({id: "span_everybody"}, MoreOptions._getStrPrivacy())), 
				DIV({c: "item",id: "self_holder"}, a = MoreOptions._createRadio("to", "self", "input_friends"), " " + _("only my friends")), 
				DIV({c: "item",id: "only_holder"}, 
					TABLE(
						TBODY(
							TR(
								TD({c: "td_radio"}, g = MoreOptions._createRadio("to", "only", "input_only"), LABEL(" " + _("only") + ":")), 
								TD({c: "td_ta"}, c, SPAN({c: "small"}, _("Type the name of the friend or clique")))
							)
						)
					)
				),
				DIV({c: "item",id: "except_holder"}, 
					TABLE(
						TBODY(
							TR(
								TD({c: "td_radio"}, g2 = MoreOptions._createRadio("to", "except", "input_except"), LABEL(" " + _("除了") + ":")), 
								TD({c: "td_ta"}, c2, SPAN({c: "small"}, _("請輸入不允許收看這則 Plurk 的朋友或群組名稱"))),
								TD(_("以外的所有朋友"))
							)
						)
					)
				)
			);
			AEV(c, "mouseup", function (h) {
				$("auto_ta_input").focus();
				return false
			});
			AEV(c2, "mouseup", function (h) {
				$("auto_ta_input2").focus();
				return false
			});
			onEvent(f, ["change", "click"], function () {
				if ($("input_everybody").checked) {
					MoreOptions.setPlurkTo()
				}
			});
			onEvent(a, ["change", "click"], function () {
				if ($("input_friends").checked) {
					MoreOptions.setPlurkTo(2)
				}
			});
			onEvent(g, ["change"], function () {
				if ($("input_only").checked) {
					MoreOptions.setPlurkTo(4)
				}
			});
			onEvent(g2, ["change"], function () {
				if ($("input_except").checked) {
					MoreOptions.setPlurkTo()
				}
			});
			b.onadd = function () {
				MoreOptions._handleRadios(null, false)
			};
			AEV(b, "blur", function (h) {
				MoreOptions._handleRadios(h, false)
			});
			b2.onadd = function () {
				MoreOptions._handleRadios2(null, false)
			};
			AEV(b2, "blur", function (h) {
				MoreOptions._handleRadios2(h, false)
			});
			attachKeyDown(b, MoreOptions._handleRadios);
			attachKeyDown(b2, MoreOptions._handleRadios2);
			AEV(c, "click", function () {
				if (!$("input_only").checked) {
					MoreOptions._handleRadios(true)
				}
			});
			AEV(c2, "click", function () {
				if (!$("input_except").checked) {
					MoreOptions._handleRadios2(true)
				}
			});
			return d
		};
		/*handleRadios2 is a ugly implementation*/
		MoreOptions._handleRadios2 = 
		function (c, b) {
			if (b == undefined) {
				b = true
			}
			var d;
			if (c) {
				d = getEventElm(c)
			}
			var a = $bytc("li", "person", $("auto_ta_holder2"));
			MoreOptions._resetRadios();
			if (d && d.id == "auto_ta_input2" && d.value != "") {
				$("input_except").checked = true;
				$("input_except").onchange()
			} else {
				if (a.length == 0) {
					$("input_everybody").checked = true;
					$("input_everybody").onchange()
				} else {
					$("input_except").checked = true;
					$("input_except").onchange()
				}
			}
			if ($("input_except").checked) {
				MoreOptions.setPlurkTo(8)
			} else {
				if ($("input_everybody").checked) {
					MoreOptions.setPlurkTo()
				} else {
					MoreOptions.setPlurkTo(2)
				}
			}
			if (b) {
				$("auto_ta_input2").focus()
			}
		};
		MoreOptions.setPlurkTo = 
		function (b) {
			var g = $("plurk_to");
			b = b || SETTINGS.view_plurks;
			if (b == 4) {
				showElement(g);
				var f = _("this plurk will be viewable to");
				var d = $bytc("li", "person", $("auto_ta_holder"));
				var a = {};
				map(d, function (j) {
					if (j.nick_name == "CLIQUE") {
						var l = PlurkAdder._getCliqueByName(j.full_name);
						if (l) {
							var h = PlurkAdder._getCliqueFriends(l);
							map(h, function (o) {
								var m = SiteState.getUserById(o) || COMPLETION[o];
								if (m) {
									a[m.nick_name] = m.full_name || m.display_name || m.nick_name
								}
							})
						}
					} else {
						a[j.nick_name] = j.full_name
					}
				});
				var c = values(a);
				var e = [];
				map(c, function (h) {
					if (h.length > 20) {
						h = h.substring(0, 20) + "..."
					}
					e.push(h)
				});
				f += " <b>" + e.join(", ") + "</b>";
				setHTML(g, f);
				addClass(g, "private_to")
			} else if (b == 8) {
				showElement(g);
				var f = _("無法看到這則 Plurk 的朋友是");
				var d = $bytc("li", "person", $("auto_ta_holder2"));
				var a = {};
				map(d, function (j) {
					if (j.nick_name == "CLIQUE") {
						var l = PlurkAdder._getCliqueByName(j.full_name);
						if (l) {
							var h = PlurkAdder._getCliqueFriends(l);
							map(h, function (o) {
								var m = SiteState.getUserById(o) || COMPLETION[o];
								if (m) {
									a[m.nick_name] = m.full_name || m.display_name || m.nick_name
								}
							})
						}
					} else {
						a[j.nick_name] = j.full_name
					}
				});
				var c = values(a);
				var e = [];
				map(c, function (h) {
					if (h.length > 20) {
						h = h.substring(0, 20) + "..."
					}
					e.push(h)
				});
				f += " <b>" + e.join(", ") + "</b>";
				setHTML(g, f);
				addClass(g, "private_to")
			} else {
				var f = _("this plurk will be viewable to") + " <b>" + MoreOptions._getStrPrivacy(b) + "</b>";
				setHTML(g, f);
				if (b == MoreOptions.PR_WHOLE_WORLD) {
					hideElement(g)
				} else {
					showElement(g);
					addClass(g, "private_to")
				}
			}
		};
		PlurkAdder._getLimitedTo = 
		function () {
			var d = $("input_everybody");
			var e = $("input_only");
			var b = $("input_friends");
			var g = $("input_except");
			if (!d || d.checked) {
				return null
			}
			var a = [];
			a.push(SiteState.getSessionUser().uid);
			if (e.checked) {
				var c = PlurkAdder.getAutoCompleteIds("auto_ta_holder");
				if (!c) {
					return null
				} else {
					map(c, function (f) {
						if (SiteState.getUserById(f) || COMPLETION[f]) {
							a.push(f)
						}
					})
				}
			} else if (g.checked) {
				var c = PlurkAdder.getAutoCompleteIds("auto_ta_holder2");
				if (!c) {
					//alert("only_friends");
					a = "only-friends";				
				} else {				
					var t = "";
					for(k in MY_ALL_FRIENDS){
						if(k=="18757"){continue;/*plurk buddy*/}
						t+=("|"+k);
					}
					t+="|";
					for(k in c){
						t = t.replace(("|"+c[k]+"|"), "|");
					}
					a = t.split("|"); a.pop();
					a[0] = SiteState.getSessionUser().uid;
				}        	
			} else {
				if (b.checked) {
 					//alert("onlyFriends");
					a = "only-friends"
				}
			}
			return a
		}	
	}