// ==UserScript==
// @name           scnsrc link filter
// @namespace      jix
// @include        http://www.scnsrc.me/*
// ==/UserScript==

window.onload = function(event) {
	
	try {
		
		var $, w = (typeof unsafeWindow === "undefined" ? window : unsafeWindow);
		
		w.jix = {
			
			links: {
				
				config: {
					isDebug: false,
					isEnabled: false,
					hideEmpty: true,
					copyOnClick: false,
					postUrl: "http://127.0.0.1:8080/link_adder.tmpl"
				},
				
				hosts: {},
				
				css: {
					"a.jixSkip": "opacity: .2;",
					"a.jixHighlight": "border-left: 3px solid #CD7400; background-color: #58371B; padding: 2px 2px 2px 5px;",
					"a.jixSpecial": "border-left: 3px solid #CD7400; background-color: #58371B; padding: 2px 2px 2px 5px; font-weight: bold; color: white; display: block",
					"#jixFilter": "margin-right: 1px;",
					"#jixFilter.active": "top: 0 !important; border-color: #454545 !important; outline-color: #1F1F1F !important",
					"#jixFilterMenu": "margin-right: 25px;",
					".jixMenu": "position: absolute; padding: 2px; font-size: 0.8em; color: #8DA7B4; background-color: #333333; box-shadow: 2px 2px 4px #1F1F1F; border: 1px solid #454545; border-radius: 5px; width: 200px; display: none;",
					".jixMenu .header": "font-weight: bold; background-color: rgb(31, 31, 31); padding: 3px 6px; border-radius: 4px 4px 4px 4px;",
					".jixMenu .close": "float: right; cursor: pointer;",
					".jixMenu .section": "margin-top: 5px; padding: 0 3px; font-size: .8em; line-height: .8em; color: #666;",
					".jixMenu ul.list": "margin: 3px 0; border: 1px solid #1f1f1f; border-radius: 3px; background-color: #444;",
					".jixMenu ul.list li": "border-bottom: 1px solid #333333; display: block; padding: 1px 4px;",
					".jixMenu ul.list li:last-child": "border: 0;",
					".jixMenu ul.list a": "color: #999999; cursor: pointer;",
					".jixMenu ul.list a.active": "color: #8DA7B4; font-weight: bold;",
					".jixMenu input.add": "width: 100%; padding: 2px 4px; font-size: 0.9em; font-style: italic; color: #888888; background-color: #555555; border: 1px solid #1F1F1F; border-radius: 3px 3px 3px 3px; display: block;",
					".jixMenu input.add:focus": "color:#ccc",
					".jixOffscreen": "position: absolute; top: -1000px; left: -1000px; width: 1px; height: 1px;"
				},
				
				
				e: {
					links: null,
					button: null,
					buttonMenu: null,
					menu: null,
					configList: null,
					hostList: null,
					add: null,
					form: null
				},
				
				init: function() {
					
					var self = this;
					
					this.load();
					this.e.links = $("#comment_list ol.all a:not(.comm_number)");
					
					var i, css = "";
					for (i in this.css) {
						css += i + "{" + this.css[i] + "}\n";
					}
					$("head").append("<style type='text/css'>" + css + "</style>");
					
					$('<div class="jixOffscreen"><iframe name="jixTarget" width="600"></iframe><form id="jixForm" action="'+this.config.postUrl+'" method="post"><input type="hidden" name="do" value="Add"><input id="jixFormLinks" type="hidden" name="addlinks" value=""></form></div>').appendTo("body");
					this.e.form = $("#jixForm");
					this.e.formLinks = $("#jixFormLinks");
					
					$("#comment_list").click(function(e) {
						if (self.config.copyOnClick === true) {
							if (e.target.tagName === "A") {
								self.e.formLinks.val(e.target.href);
								self.e.form.attr("target", (self.config.isDebug === true ? "_blank" : "jixTarget") );
								self.e.form.submit();
							}
							e.preventDefault();
						}
					});
					
				},
				
				initGui: function() {
					
					var
						i,
						self = this,
						filter = $("#filter"),
						body = $("body"),
						txt = "Add your host here...";
					
					this.e.menu = $("<div id='jixLinksMenu' class='jixMenu'><div class='header'><div class='close'>x</div>jix' Link Filter</div><div class='section'>config</div><ul class='list config'></ul><div class='section'>hosts</div><ul class='list hosts'></ul><input class='add' type='text' /></div>");
					this.e.menu.click(function(e) { e.stopPropagation(); });
					
					
					body.append(this.e.menu);
					filter.prepend('<li><button id="jixFilter">Filter Links</button><button id="jixFilterMenu">v</button></li>');
					
					body.click(function() { self.e.menu.fadeOut("fast"); });
					this.e.menu.find(".header .close").click(function() { self.e.menu.fadeOut("fast");	});
					
					this.e.add = this.e.menu.find("input.add");
					this.e.add.val(txt)
					.focus(function() {
						if (self.e.add.val() === txt) self.e.add.val("");
					})
					.blur(function() {
						if (self.e.add.val() === "") self.e.add.val(txt);
					})
					.keypress(function(e) {
						var v, key = e.which || e.keyCode;
						if (key === 13) {
							v = self.e.add.val();
							v = v.replace(/\s/, "").replace(/^www\./, "");
							if (v.indexOf(".") < 2 && self.hosts[v] === undefined) return false;
							self.hosts[v] = true;
							self.e.add.val("");
							self.addHost(v);
							self.update();
						}
					});
					
					this.e.configList = this.e.menu.find("ul.config");
					this.addSetting("hideEmpty", "Hide empty Posts");
					this.addSetting("copyOnClick", "Add Links to jD");
					this.addSetting("isDebug", "Debug Mode");
					this.e.configList.delegate("a", "click", function() {
						var t = $(this);
						t.toggleClass("active");
						self.config[t.attr("data-key")] = t.hasClass("active");
						self.update();
					});
					
					this.e.hostList = this.e.menu.find("ul.hosts");
					this.e.hostList.delegate(".close", "click", function() {
						var t = $(this);
						delete self.hosts[t.siblings("a").text()];
						t.parent().remove();
						self.update();
					});
					
					this.e.hostList.delegate("a", "click", function() {
						var t = $(this);
						t.toggleClass("active");
						self.hosts[t.text()] = t.hasClass("active");
						self.update();
					});
					
					this.e.button = $("#jixFilter");
					this.e.button.click(function() {
						self.config.isEnabled = !self.config.isEnabled;
						self.update();
					});
					this.e.buttonMenu = $("#jixFilterMenu");
					this.e.buttonMenu.click(function(e){
						var p = $(this).position();
						self.e.menu.css({ "top": p.top + 25, "left": p.left });
						self.e.menu.fadeIn("fast");
						e.stopPropagation();
					});
					
					for (i in this.hosts) {
						this.addHost(i);
					}
				},
				
				addSetting: function(i, s) {
					if (typeof i === "string" && i.length > 0) {
						this.e.configList.append("<li><a class='"+(this.config[i] === true ? "active" : "")+"' data-key='"+i+"'>"+s+"</a></li>");
					}
				},
				
				addHost: function(i) {
					if (typeof i === "string" && i.length > 0) {
						this.e.hostList.append("<li><a class='"+(this.hosts[i] === true ? "active" : "")+"'>"+i+"</a><span class='close'>x</span></li>");
					}
				},
				
				save: function() {
					this.sort();
					localStorage["links-hosts"] = JSON.stringify(this.hosts);
					localStorage["links-config"] = JSON.stringify(this.config);
				},
				
				load: function() {
					var o;
					try {
						o = JSON.parse(localStorage["links-hosts"]);
						if (o !== null && typeof o === "object") this.hosts = o;
					} catch (ex) {}
					
					try {
						o = JSON.parse(localStorage["links-config"]);
						if (o !== null && typeof o === "object") {
							this.config = $.extend({}, this.config, o);
						}
					} catch (ex) {}
				},
				
				reset: function() {
					delete localStorage["links-hosts"];
					delete localStorage["links-config"];
				},
				
				sort: function() {
					var a = [], o = {};
					for (var i in this.hosts) {
						a.push(i);
					}
					a.sort();
					for (var i = 0; i < a.length; i++) {
						o[a[i]] = this.hosts[a[i]];
					}
					this.hosts = o;
				},
				
				update: function() {
					if (this.config.isEnabled) {
						this.highlightShow();
						if (this.config.hideEmpty) this.emptyHide();
						else this.emptyShow();
						this.e.button.addClass("active");
					} else {
						this.highlightHide();
						this.emptyShow();
						this.e.button.removeClass("active");
					}
					this.save();
				},
				
				highlightShow: function() {
					var self = this;
					
					this.e.links.each(function(k,v){
						var
							s = v.href,
							i = s.indexOf("http://www.") === 0 ? 11 : 7,
							j = s.indexOf("/", i),
							h = v.href.substring(i, j);
						
						if (h in self.hosts && self.hosts[h] === true) {
							
							$(v).removeClass("jixSkip").addClass(s.indexOf(".mkv") === -1 ? "jixHighlight" : "jixSpecial");
							//$(v).css(s.indexOf(".mkv") === -1 ? self.css.normal : self.css.special);
						} else {
							$(v).removeClass("jixHighlight jixSpecial").addClass("jixSkip");//v.style.opacity = .2;
						}
					});
				},
				
				highlightHide: function() {
					this.e.links.removeClass("jixSkip jixHighlight jixSpecial");
					//this.e.links.css(this.css.reset);
				},
				
				emptyHide: function() {
					
					$("ol.all li").each(function() {
						var t = $(this);
						if (t.find(".jixHighlight,.jixSpecial").length === 0) {
							t.hide();
						} else {
							t.show();
						}
					});
				},
				
				emptyShow: function() {
					$("ol.all li").show();
				}
				
			}
		};
		
		if (w.jQuery !== undefined) {
			$ = w.jQuery;
			w.jix.links.init();
			w.jix.links.initGui();
			w.jix.links.update();
		}
	} catch (ex) {
		if (typeof console !== "undefined") console.log(ex);
	}
	
};
