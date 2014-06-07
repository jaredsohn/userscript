// ==UserScript==
// @name        Mafia Demon
// @namespace   mafiademon
// @description Mafia Demon is a script for Zynga's Mafia Wars game. This script may not be sold, copied, or used without permission!
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @version     1.9.9
// @icon        http://mafiademon.com/img/favicon.png
// ==/UserScript==


 
function injectScript(source) {
    // Utilities
    var isFunction = function (arg) {
            return (Object.prototype.toString.call(arg) == "[object Function]");
        };
    var jsEscape = function (str) {
            // Replaces quotes with numerical escape sequences to
            // avoid single-quote-double-quote-hell, also helps by escaping HTML special chars.
            if (!str || !str.length) return str;
            // use \W in the square brackets if you have trouble with any values.
            var r = /['"<>\/]/g,
                result = "",
                l = 0,
                c;
            do {
                c = r.exec(str);
                result += (c ? (str.substring(l, r.lastIndex - 1) + "\\x" + c[0].charCodeAt(0).toString(16)) : (str.substring(l)));
            } while (c && ((l = r.lastIndex) > 0))
            return (result.length ? result : str);
        };
    var bFunction = isFunction(source);
    var elem = document.createElement("script"); // create the new script element.
    var script, ret, id = "";
    if (bFunction) {
        // We're dealing with a function, prepare the arguments.
        var args = [];
        for (var i = 1; i < arguments.length; i++) {
            var raw = arguments[i];
            var arg;
            if (isFunction(raw)) // argument is a function.
            arg = "eval(\"" + jsEscape("(" + raw.toString() + ")") + "\")";
            else if (Object.prototype.toString.call(raw) == '[object Date]') // Date
            arg = "(new Date(" + raw.getTime().toString() + "))";
            else if (Object.prototype.toString.call(raw) == '[object RegExp]') // RegExp
            arg = "(new RegExp(" + raw.toString() + "))";
            else if (typeof raw === 'string' || typeof raw === 'object') // String or another object
            arg = "JSON.parse(\"" + jsEscape(JSON.stringify(raw)) + "\")";
            else arg = raw.toString(); // Anything else number/boolean
            args.push(arg); // push the new argument on the list
        }
        // generate a random id string for the script block
        while (id.length < 16) id += String.fromCharCode(((!id.length || Math.random() > 0.5) ? 0x61 + Math.floor(Math.random() * 0x19) : 0x30 + Math.floor(Math.random() * 0x9)));
        // build the final script string, wrapping the original in a boot-strapper/proxy:
        script = "(function(){var value={callResult: null, throwValue: false};try{value.callResult=((" + source.toString() + ")(" + args.join() + "));}catch(e){value.throwValue=true;value.callResult=e;};" + "document.getElementById('" + id + "').innerText=JSON.stringify(value);})();";
        elem.id = id;
    } else // plain string, just copy it over.
    {
        script = source;
    }
    elem.type = "text/javascript";
    elem.innerHTML = script;
    // insert the element into the DOM (it starts to execute instantly)
    document.head.appendChild(elem);
    if (bFunction) {
        // get the return value from our function:
        ret = JSON.parse(elem.innerText);
        // remove the now-useless clutter.
        elem.parentNode.removeChild(elem);
        // make sure the garbage collector picks it instantly. (and hope it does)
        delete(elem);
        // see if our returned value was thrown or not
        if (ret.throwValue) throw (ret.callResult);
        else return (ret.callResult);
    } else // plain text insertion, return the new script element.
    return (elem);
}
var myscript = function () {
	var aa = void 0,
	e = !0,
	h = null,
	q = !1;
	function Ta() {
		function Ja(c, d) {
			this.id = d;
			this.H = c;
			this.pg = "function runScript(url)\n{\n\tvar a = document.createElement('script');\n\ta.type = 'text/javascript';\n\ta.src = url+'?'+Math.random();\n\tdocument.getElementsByTagName('head')[0].appendChild(a);\n\tvar timer = setTimeout( function(){ if (window.top != window){ if (FB.CanvasClient._timer == -1){ FB.CanvasClient.startTimerToSizeToContent(); } } }, 3000);\n\treturn false;\n}\n";
			this.a = h;
			Ja.prototype.s = function () {
				$("body").append($("<script/>", {
						html : this.pg
					}));
				Y(this, '<div class="tabframe"><div style="padding:10px;"><table><tr><td valign="top"><b>Useful Links</b><br/><a href="#0" onclick="do_ajax(\'\',\'remote/html_server.php?xw_controller=index&xw_action=view&playslots=1&fromminifeed=1&wins=10&user_id=p|82686779\',1,0,0,0); return false;">Lucky Stash - 3 Free Spins</a><br/><a href="#0" onclick="do_ajax(\'\',\'remote/html_server.php?xw_controller=levelUpBonus&xw_action=addBonusItem&no_load=1\',1,1,0,0); return false;">Level Up Bonus</a> (<a href="remote/html_server.php?xw_controller=levelUpBonus&xw_action=levelUpW2WBrag" class="mw_new_ajax" selector="#popup_fodder">Share</a>)<br/><a href="remote/html_server.php?xw_controller=LimitedTimeProperty&xw_action=upgradeProp&prop_id=27" class="mw_new_ajax" selector="#popup_fodder">Share Property Upgrade</a> (Wine Cellar)<br/></td><td valign="top"><b>Useful Scripts</b><br/><a href="#0" onclick="return runScript(\'http://spocklet.com/bookmarklet/giftblaster.js\');">Gift Blaster</a><br/><a href="#0" onclick="return runScript(\'http://spocklet.com/bookmarklet/giftcollector.js\');">Gift Collector</a><br/><a href="#0" onclick="return runScript(\'http://spocklet.com/bookmarklet/mafia_history.js\');">Mafia Manager</a><br/><a href="#0" onclick="return runScript(\'http://spocklet.com/bookmarklet/war-o-matic.js\');">War-o-matic</a><br/><a href="#0" onclick="return runScript(\'http://spocklet.com/bookmarklet/switch.js\');">Switch</a><br/><a href="#0" onclick="return runScript(\'http://simony.dk/gs/Chucker.js\');">Chucker</a><br/><a href="#0" onclick="var s=prompt(\'Enter a script/bookmarklet link\',\'\'); if (s) document.location=s; return false;">Run a Script\u2026</a><br/></td></tr></table></div></div>', V + W)
			};
			this.s()
		}
		function pa(c) {
			this.id = c;
			this.mc = this.Ya = U = j = h;
			this.wc = {};
			this.n = [];
			this.ob = 0;
			this.Gc = this.o = e;
			this.t = h;
			pa.prototype.kf = function () {
				this.Gc = this.o = q;
				$("#" + this.id).remove();
				return q
			};
			pa.prototype.s = function () {
				var c = this,
				b = '<li id="%ID%_quest_icon"><div style="width:50px;" title="Mafia Demon Version ' + va + '"><a class="quest_icon" style="background-image: url(&quot;' + la + '/img/demon_icon_36.png&quot;); background-repeat:no-repeat; !important;"><span></span></a></div></li>';
				Ua(this.id, '<style type="text/css">\n.tornado table { width: 100%; }\n.tornado img { margin: 0px 3px; vertical-align: top; }\n.tornado input { vertical-align: baseline; border: 1px solid #888; margin 1px; padding: 2px; background: #000; color: #FFF; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; }\n.tornado select { border: 1px solid #888; margin 1px; padding: 1px; background: #000; color: #FFF; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; }\n.tornado textarea { border: 1px solid #888; margin 1px; padding: 2px; background: #000; color: #FFF; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; }\n.tornado fieldset { border: 1px solid #3B3B3B; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; }\n.tornado .ip { color: #8080ff; font-weight: normal; }\n.tornado .good { color: #52e259; font-weight: normal; }\n.tornado .bad { color: #ec2d2d; font-weight: normal; }\n.tornado .yellow { color: #ecec2d; font-weight: normal; }\n.tornado .tab_middle { font-weight: bold; padding-right: 5px; }\n.tornado .divider { clear: both; background: url("https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/black_friday/divider_dotted_horizontal.gif") repeat-x scroll 1px 50% transparent; height: 7px; margin: 0px; }\n.tornado .inv table { border-collapse:collapse; border:0px; margin:0px; padding:0px; }\n.tornado .inv td.inv_count, th.inv_count { width:50px; text-align:left; }\n.tornado .inv td.inv_atk, th.inv_atk { width:60px; text-align:left; }\n.tornado .inv td.inv_def, th.inv_def { width:60px; text-align:left; }\n.tornado .inv td.inv_name, th.inv_name { text-align:left; }\n.tornado .op table { border-collapse:collapse; border:0px; margin:0px; padding:0px; }\n.tornado .op td, .tornado .op th, .tornado .op tr { border:0px; margin:0px; padding:0px 5px; height:22px; }\n.tornado .op td.op_active { background-color:#040; }\n.tornado .op td.op_name { width:250px; text-align:left; }\n.tornado .op td.op_health { width:50px; text-align:left; }\n.tornado .op td.op_level { width:40px; text-align:right; }\n.tornado .op td.op_defense { width:60px; text-align:right; }\n.tornado .op td.op_buttons { text-align:left; }\n.tornado .tabframe { background-color: #0E0E0E; border: 1px solid #3B3B3B; padding:0px; }\n.tornado .stamina { color: orange; }\n.tornado .tab_subtitle { cursor: pointer; }\n.tornado abbr { cursor: help; border: 0px; }\n.tornado a.shorter { vertical-align:inherit; }\n.tornado a.iced { color: #0099ff; }\n.tornado a.killed { color: red; }\n.tornado textarea.textlinks { width:660px; height:32px; min-height:32px; resize:vertical; }\n.tornado textarea.skipnames { width:312px; height:48px; min-height:48px; resize:none; }\n</style>\n<div class="empire_main_module" style="padding-bottom: 5px;"><div class="clearfix" style="width: 745px;"><table style="border:0px;padding:0px;border-collapse:collapse;"><tr><td style="border:0px;padding:0px;border-collapse:collapse;"><div id="TornadoModule" style="float:left;width:735px;" class="empire_module_header"><div class="empire_module_title" id="%ID%_head" style="border-bottom:0px;"><div style="float:left;margin-top:-4px;"><span><span id="%ID%_toggle" style="cursor:pointer;vertical-align:5px;"><span class="gold_star"></span> Mafia Demon</span></span>&nbsp;&nbsp;<iframe src="https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fmafiademonscript&amp;layout=button_count&amp;show_faces=false&amp;width=90&amp;action=like&amp;colorscheme=dark&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:80px; height:21px; margin-top:4px;" allowTransparency="true"></iframe></div><div style="float:right;margin-right:5px;margin-top:-2px;"><span style="font-size:0.6em;color:#FFF;">Version ' + va + ' - <a href="' + Ka + '" target="_blank">Homepage</a>&nbsp;&nbsp;&nbsp;</span><a href="#0" id="%ID%_close" class="close" style="margin:5px 3px;vertical-align:top;"></a></div></div><div class="clearfix" style="clear: both; border-top: 1px solid gray;" id="%ID%_body"><table class="tornado" style="padding:5px;border:0px;width:733px;"><tbody><tr><td><span id="%ID%_stats">Updating Stats\u2026</span><a href="remote/html_server.php?xw_controller=fight&xw_action=fight_show_items_used_pop&o=' + wa + '&gs=501" class="mw_new_ajax" selector="#popup_fodder_hospital"><img src="https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/icon-help.gif" style="margin:2px 3px 0px 3px;vertical-align:top;"></a>&nbsp;&nbsp;<span class="more_in" id="%ID%_stats_heal"></span><br/></td></tr><tr><td><div id="tab_names_top_left" align="left" class="tab_box_header" style="height: 32px; border: 0px; margin: 0px;"></div><div id="tab_area_top" style="border: 1px solid rgb(51,51,51);position:relative;width:100%;"></div></td></tr><tr><td><div id="tab_names_bottom_left" align="left" class="tab_box_header" style="height: 32px; border: 0px; margin: 0px;"></div><div id="tab_area_bottom" style="border: 1px solid rgb(51,51,51);position:relative;width:100%;"></div></td></tr></tbody></table></div></div></td><td style="border:0px;padding:0px;border-collapse:collapse;vertical-align:top;height:100%;"><table style="border:0px;padding:0px;border-collapse:collapse;height:100%;"><tr><td style="border:0px;padding:0px;border-collapse:collapse;"><div style="float: left; background: url(&quot;https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/empire/shadow_upper_right.png&quot;) no-repeat scroll 0% 0% transparent; height: 8px; width: 8px;"></div></td></tr><tr style="height:100%;"><td style="border:0px;padding:0px;border-collapse:collapse;height:100%;"><div style="float: left; background: url(&quot;https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/empire/shadow_right_side.png&quot;) repeat-y scroll 0% 0% transparent; height: 100%; width: 8px;"></div></td></tr></table></td></tr><tr><td colspan="2" style="border:0px;padding:0px;border-collapse:collapse;"><div style="float: left; background: url(&quot;https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/empire/shadow_lower_left.png&quot;) repeat scroll 0% 0% transparent; height: 8px; width: 8px;"></div><div style="float: left; background: url(&quot;https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/empire/shadow_bottom.png&quot;) repeat scroll 0% 0% transparent; height: 8px; width: 727px;"></div><div style="float: left; background: url(&quot;https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/empire/shadow_lower_right.png&quot;) repeat scroll 0% 0% transparent; height: 8px; width: 8px;"></div></td></tr></table></div></div>');
				$("#" + this.id + "_close").click(function () {
					return c.kf()
				});
				$("#" + this.id + "_toggle").click(function () {
					c.o = ba(c.id + "_body", c.id + "_toggle");
					c.nc();
					La();
					return q
				});
				$("#clan_xp_icon").before(b.replace(/%ID%/g, this.id));
				$("#" + this.id + "_quest_icon").click(function () {
					c.Gc = ba("minitornado_div");
					c.nc();
					La();
					return q
				});
				D$.isVisible = L = function () {
					return c.o && c.Gc
				}
			};
			pa.prototype.Pb = function (c, b) {
				j = Fa(c.user_fields);
				U = Ma(c.fightbar);
				b && (this.wc = Na(b));
				user_fields_update(c.user_fields);
				user_info_update(c.user_fields, c.user_info);
				this.nc()
			};
			pa.prototype.ja = function (c, b) {
				var a,
				f,
				E;
				f = c.responseText.search(/var user_info = \[\];/);
				E = c.responseText.search(/user_fields_update\(user_fields\);/);
				if (-1 !== f && -1 !== E)
					try {
						a = c.responseText.slice(f + 19, E),
						a = a.replace(/user_fields/g, "this['temp1']"),
						a = a.replace(/user_info/g, "this['temp2']"),
						this.temp1 = {},
						this.temp2 = {},
						eval(a),
						j = Fa(this.temp1),
						user_fields_update(this.temp1),
						user_info_update(this.temp1, this.temp2),
						this.temp1 = {},
						this.temp2 = {},
						this.nc()
					} catch (d) {
						D$(m("Update Status", d))
					}
				else
					t(m("Update Status", "Problem Finding User Info"));
				b && (c.responseText && (a = /local_xw_sig = '([a-f0-9]+)'/.exec(c.responseText)) ? local_xw_sig = a[1] : t(m("Update Status", "Problem Finding Signature")))
			};
			pa.prototype.nc = function () {
				if (L() && (this.t || (this.t = $("#" + this.id + "_stats")), this.t)) {
					var c = p(j.ac) / p(j.$c),
					b = p(j.ac) / p(j.ba),
					a = p(j.ac) / (p(j.$c) + p(j.ba)),
					f = 10 > Math.abs(c) ? 2 : 0,
					E = 10 > Math.abs(b) ? 2 : 0,
					d = 10 > Math.abs(a) ? 2 : 0;
					"Infinity" == c && (f = c = 0);
					"Infinity" == b && (E = b = 0);
					"Infinity" == a && (d = a = 0);
					c = '<span class="health">' + u(j.ab) + "/" + u(j.ad) + '</span>&nbsp;&nbsp;<span class="energy">' + u(j.$c) + "/" + u(j.xg) + '</span> <span class="more_in">(' + c.toFixed(f) + ')</span>&nbsp;&nbsp;<span class="stamina">' + u(j.ba) + "/" + u(j.yg) + '</span> <span class="more_in">(' + b.toFixed(E) + ')</span>&nbsp;&nbsp;<span class="experience">' + u(j.ac) + '</span> <span class="more_in">(' + a.toFixed(d) + ")</span>";
					c += "&nbsp;&nbsp;" + qa[j.wa];
					c += "<br/>";
					U && this.Ya && (c += '<span class="attack">' + u(U.Fb) + '</span> <span class="more_in">(' + u(U.Fb - this.Ya.Fb) + ')</span>&nbsp;&nbsp;<span class="defense">' + u(U.Qc) + '</span> <span class="more_in">(' + u(U.Qc - this.Ya.Qc) + ')</span>&nbsp;&nbsp;<span class="sexy_mafia_attack">' + u(U.Bc) + '</span> <span class="more_in">(' + u(U.Bc - this.Ya.Bc) + ')</span>&nbsp;&nbsp;<span class="sexy_mafia_defense">' + u(U.Cc) + '</span> <span class="more_in">(' + u(U.Cc - this.Ya.Cc) + ")</span>");
					this.t.html(c)
				}
				X.Ga()
			};
			Va();
			this.s()
		}
		function M(c, d) {
			this.id = d;
			this.H = c;
			this.a = h;
			M.prototype.v = ["Ices", "Thieves", "Bounties"];
			this.T = this.clip = h;
			M.prototype.rg = function () {
				var b = $("#" + this.id + "_msg");
				b && (b.stop(e, e), b.text("Copied"), b.show(), b.fadeOut(1600))
			};
			M.prototype.Ga = function () {
				this.clip && (this.clip.hide(), L() && this.o && this.clip.show())
			};
			M.prototype.F = function () {
				0 === this.a.c ? ca(this, this.v[this.a.c] + " (" + this.a.l.length + ")") : 1 === this.a.c ? ca(this, this.v[this.a.c] + " (" + this.a.N.length + ")") : 2 === this.a.c && ca(this, this.v[this.a.c] + " (" + this.a.J.length + ")");
				if (L() && this.o) {
					if (!this.clip) {
						var b = this;
						ZeroClipboard.setMoviePath(xa + "/js/lib/ZeroClipboard.swf");
						this.clip = new ZeroClipboard.Client;
						this.clip.glue(this.id + "_copy_button");
						this.clip.addEventListener("onComplete", function () {
							b.rg()
						})
					}
					this.clip && (0 === this.a.c ? this.clip.setText(ra(this.a.l.join("\n"))) : 1 === this.a.c ? this.clip.setText(ra(this.a.N.join("\n"))) : 2 === this.a.c && this.clip.setText(ra(this.a.J.join("\n"))), this.clip.hide(), this.clip.show());
					this.T || (this.T = $("#" + this.id + "_log"));
					this.T && (0 === this.a.c ? this.T.html(this.a.l.join("<br/>")) : 1 === this.a.c ? this.T.html(this.a.N.join("<br/>")) : 2 === this.a.c && this.T.html(this.a.J.join("<br/>")))
				} else
					this.clip && this.clip.hide()
			};
			M.prototype.log = function (b) {
				b && (this.a.A ? this.a.l.push(b) : this.a.l.unshift(b));
				if (0 < this.a.size)
					for (; this.a.l.length > this.a.size; )
						this.a.A ? this.a.l.shift() : this.a.l.pop();
				this.F();
				this.d()
			};
			M.prototype.af = function (b) {
				b && (this.a.A ? this.a.N.push(b) : this.a.N.unshift(b));
				if (0 < this.a.size)
					for (; this.a.N.length > this.a.size; )
						this.a.A ? this.a.N.shift() : this.a.N.pop();
				this.F();
				this.d()
			};
			M.prototype.$e = function (b) {
				b && (this.a.A ? this.a.J.push(b) : this.a.J.unshift(b));
				if (0 < this.a.size)
					for (; this.a.J.length > this.a.size; )
						this.a.A ? this.a.J.shift() : this.a.J.pop();
				this.F();
				this.d()
			};
			M.prototype.Kc = function (b) {
				this.a.size = p($(b).val());
				this.log();
				return e
			};
			M.prototype.vb = function () {
				0 === this.a.c ? this.a.l = [] : 1 === this.a.c ? this.a.N = [] : 2 === this.a.c && (this.a.J = []);
				this.F();
				this.d();
				return q
			};
			M.prototype.Jc = function () {
				this.a.A = !this.a.A;
				this.a.l.reverse();
				this.a.N.reverse();
				this.a.J.reverse();
				this.F();
				return q
			};
			M.prototype.wb = function (b) {
				this.a.c = p($(b).val());
				this.F();
				this.d();
				return e
			};
			M.prototype.L = function () {
				this.a = {
					c : 0,
					l : [],
					N : [],
					J : [],
					size : 50,
					A : q
				}
			};
			M.prototype.d = function () {
				var b = {};
				b.mode = this.a.c;
				b.size = this.a.size;
				b.invert = this.a.A;
				b.logs = [];
				N(b.logs, this.a.l);
				b.thieves = [];
				N(b.thieves, this.a.N);
				b.bounties = [];
				N(b.bounties, this.a.J);
				ma(this.id, b)
			};
			M.prototype.M = function () {
				this.L();
				try {
					var b = {},
					a = na(this.id);
					b.c = a.mode;
					b.size = a.size;
					b.A = a.invert;
					b.l = [];
					N(b.l, a.logs);
					b.N = [];
					N(b.N, a.thieves);
					b.J = [];
					N(b.J, a.bounties);
					N(this.a, b)
				} catch (f) {}
				
				B("#" + this.id + "_size", this.a.size);
				B("#" + this.id + "_mode", this.a.c);
				this.F()
			};
			M.prototype.s = function () {
				var b = this;
				Y(this, '<table class="tornado tabframe"><tbody><tr><td valign="top"><div>Show <select id="%ID%_mode"></select> | <input type="text" id="%ID%_size" style="width:30px;"/> Log Size <span class="more_in">(0 for unlimited)</span> | ' + O("Clear", h, h, "clear") + ' <span id="%ID%_copy_container">' + O("Copy", h, h, "copy_button") + "</span> " + O("Invert", h, h, "invert") + ' <span id="%ID%_msg"></span></div><div class="divider"></div><div id="%ID%_log"></div></td></tr></tbody></table>', 2 + W, function () {
					b.F()
				});
				str = "";
				for (i = 0; i < this.v.length; i++)
					str += '<option value="' + i + '">' + this.v[i] + "</option>";
				$("#" + this.id + "_mode").html(str);
				$("#" + this.id + "_mode").change(function () {
					return b.wb(this)
				});
				$("#" + this.id + "_size").change(function () {
					return b.Kc(this)
				});
				$("#" + this.id + "_clear").click(function () {
					return b.vb(this)
				});
				$("#" + this.id + "_invert").click(function () {
					return b.Jc(this)
				})
			};
			this.s();
			this.M()
		}
		function P(c, d) {
			this.id = d;
			this.H = c;
			this.a = h;
			this.l = [];
			this.T = h;
			P.prototype.F = function () {
				ca(this, "Log (" + this.l.length + ")");
				L() && this.o && (this.T || (this.T = $("#" + this.id + "_log")), this.T && this.T.html(this.l.join("<br/>")))
			};
			P.prototype.log = function (b) {
				if (b) {
					if (this.a.Ob)
						var a = new Date, f = a.getHours(), a = a.getMinutes(), b = S("[" + (10 > f ? "0" + f : f) + ":" + (10 > a ? "0" + a : a) + "] ") + " " + b;
					this.a.A ? this.l.push(b) : this.l.unshift(b)
				}
				if (0 < this.a.size)
					for (; this.l.length > this.a.size; )
						this.a.A ? this.l.shift() : this.l.pop();
				this.F()
			};
			P.prototype.error = function (b) {
				this.a.rb && this.log(b)
			};
			P.prototype.debug = function (b) {
				this.a.qb && this.log(b)
			};
			P.prototype.Kc = function (b) {
				this.a.size = p($(b).val());
				this.log();
				this.d();
				return e
			};
			P.prototype.lf = function (b) {
				this.a.qb = z(b);
				this.d();
				return e
			};
			P.prototype.rf = function (b) {
				this.a.rb = z(b);
				this.d();
				return e
			};
			P.prototype.eg = function (b) {
				this.a.Ob = z(b);
				this.d();
				return e
			};
			P.prototype.vb = function () {
				this.l = [];
				this.F();
				return q
			};
			P.prototype.Jc = function () {
				this.a.A = !this.a.A;
				this.l.reverse();
				this.F();
				return q
			};
			P.prototype.L = function () {
				this.a = {
					rb : q,
					qb : q,
					Ob : e,
					A : q,
					size : 50
				}
			};
			P.prototype.d = function () {
				var b = {};
				b.log_errors = this.a.rb;
				b.log_debug = this.a.qb;
				b.timestamps = this.a.Ob;
				b.invert = this.a.A;
				b.size = this.a.size;
				ma(this.id, b)
			};
			P.prototype.M = function () {
				this.L();
				try {
					var b = {},
					a = na(this.id);
					b.rb = a.log_errors;
					b.qb = a.log_debug;
					b.Ob = a.timestamps;
					b.A = a.invert;
					b.size = a.size;
					N(this.a, b)
				} catch (f) {}
				
				B("#" + this.id + "_size", this.a.size);
				y("#" + this.id + "_debug", this.a.qb);
				y("#" + this.id + "_errors", this.a.rb);
				y("#" + this.id + "_timestamps", this.a.Ob);
				this.F()
			};
			P.prototype.s = function () {
				var b = this;
				Y(this, '<table class="tornado tabframe"><tbody><tr><td valign="top"><div><input type="text" id="%ID%_size" style="width:30px;"/> Log Size ' + S("(0 for unlimited)") + " | " + da("Log Debug", "debug") + " | " + da("Log Errors", "errors") + " | " + da("Timestamps", "timestamps") + " | " + O("Clear", h, h, "clear") + " " + O("Invert", h, h, "invert") + '</div><div class="divider"></div><div id="%ID%_log"></div></td></tr></tbody></table>', 2 + W, function () {
					b.F()
				});
				$("#" + this.id + "_size").change(function () {
					return b.Kc(this)
				});
				$("#" + this.id + "_debug").click(function () {
					return b.lf(this)
				});
				$("#" + this.id + "_errors").click(function () {
					return b.rf(this)
				});
				$("#" + this.id + "_clear").click(function () {
					return b.vb(this)
				});
				$("#" + this.id + "_invert").click(function () {
					return b.Jc(this)
				});
				$("#" + this.id + "_timestamps").click(function () {
					return b.eg(this)
				});
				D$.log = r = function (a) {
					b.log(a)
				};
				D$.logError = t = function (a) {
					b.error(a)
				};
				D$.logDebug = ja = function (a) {
					b.debug(a)
				}
			};
			this.s();
			this.M()
		}
		function s(c, l) {
			this.id = l;
			this.H = c;
			this.B = this.a = h;
			d = [];
			this.C = this.Lc = this.Va = 0;
			this.Fa = 120;
			this.z = [];
			this.Ia = this.Rb = 0;
			this.ca = 20;
			this.I = [];
			this.K = [];
			this.Xc = [];
			s.prototype.v = ["Active", "Opponents", "Ignored", "Favourites"];
			s.prototype.Gd = function (b) {
				var a,
				f;
				f = d[b].da && !d[b].ec ? d[b].W ? "op_active" : "" : "opacity_50";
				a = '<td class="op_name ' + f + '">' + d[b].g + "</td>";
				a += '<td class="op_level ' + f + '">' + u(d[b].fc) + "</td>";
				a += '<td class="op_defense ' + f + '">' + u(d[b].la) + "</td>";
				d[b].ec ? a += '<td class="">Ignored</td>' : (a = d[b].da ? a + ('<td class="op_buttons">' + O("Disable", "disable_opponent", d[b].e)) : a + ('<td class="op_buttons">' + O("Enable", "enable_opponent", d[b].e)), a += " " + O("Ignore", "ignore_opponent", d[b].e), a += " " + O("Favourite", "fav_opponent", d[b].e), a += "</td>");
				return a
			};
			s.prototype.Wd = function (b) {
				var a;
				a = d[b].la ? '<td class="zzop_name" style="height:61px;"><div style="float:left;height:36px;margin-top:3px;"><span style="background-image:url(&quot;https://zyngapv.hs.llnwd.net/e6/mwfb' + d[b].dd + '&quot;);background-repeat:no-repeat;padding-left:40px;padding-bottom:18px;"></span></div><div style="float:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:200px;">' + d[b].g + "<br/>Level " + u(d[b].fc) + " " + d[b].Ed + '<br/><span class="defense ' + (d[b].kd ? "good" : "bad") + '">???</span><span class="group_defense ' + (d[b].le ? "good" : "bad") + '" style="margin-left:10px;">' + u(d[b].la) + '</span></div><div style="clear:both;"></div></td>' : '<td class="zzop_name" style="height:61px;"><div style="float:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:240px;">' + d[b].g + '<br/><br/></div><div style="clear:both;"></div></td>';
				a = -1 !== d[b].Aa ? a + ('<td class="zzop_health" style="width:215px;height:61px;"><div style="float:left;margin-left:5px;margin-top:10px;">Health <span class="health">' + d[b].Aa + '%</span></div><div class="divFightAttack" style="font-size:30px;float:right;margin-right:5px;">' + -d[b].Cd + '</div><div style="clear:both;"></div><div class="divHPBar" style="margin:0px;"><div id="defender_hp" class="' + (33 > d[b].Aa ? "hpbg_low" : 66 > d[b].Aa ? "hpbg_mid" : "hpbg_high") + '" style="width: ' + Math.min(p(215 * d[b].Aa / 100), 215) + 'px;"></div></div></td>') : a + '<td class="zzop_health" style="width:215px;height:61px;"></td>';
				d[b].ec ? a += '<td class="">Ignored</td>' : (a += '<td class="">' + O("Skip", "skip_opponent", d[b].e), a = d[b].da ? a + (" " + O("Disable", "disable_opponent", d[b].e)) : a + (" " + O("Enable", "enable_opponent", d[b].e)), a += " " + O("Ignore", "ignore_opponent", d[b].e), a += "</td>");
				return a
			};
			s.prototype.sa = function (b) {
				var a;
				1 === this.a.c ? L() && this.o && this.B && d.length && 0 < this.C && d[b].e && (a = $("#" + this.id + "_" + d[b].e)) && a.html(this.Gd(b)) : 0 === this.a.c && this.m()
			};
			s.prototype.m = function () {
				var b,
				a;
				if (0 === this.a.c) {
					if (ca(this, this.v[this.a.c] + " (" + this.Ia + ")"), L() && this.o && this.B) {
						a = "";
						if (this.z.length && 0 < this.Ia) {
							a += '<table class="op"><tr><th class="zzop_name">Name</th><th class="zzop_health">Health</th><th class="op_buttons">Options</th></tr>';
							for (b in this.z)
								if (this.z.hasOwnProperty(b)) {
									var f = this.z[b];
									-1 !== f && (d[f].D || (a += '<tr id="' + this.id + "_" + d[f].e + '">' + this.Wd(f) + "</tr>"))
								}
							a += "</table>"
						}
						this.B.html(a)
					}
				} else if (1 === this.a.c) {
					if (ca(this, this.v[this.a.c] + " (" + this.C + ")"), L() && this.o && this.B) {
						a = "";
						if (d.length && 0 < this.C) {
							a += '<table class="op"><tr><th class="op_name">Name</th><th class="op_level">Level</th><th class="op_defense">Defense</th><th class="op_buttons">Options</th></tr>';
							for (b in d)
								d.hasOwnProperty(b) && d[b].e && (a += '<tr id="' + this.id + "_" + d[b].e + '">' + this.Gd(b) + "</tr>");
							a += "</table>"
						}
						this.B.html(a)
					}
				} else if (2 === this.a.c) {
					if (ca(this, this.v[this.a.c] + " (" + this.a.q.length + ")"), L() && this.o && this.B) {
						a = "";
						if (this.a.q.length) {
							a += '<table class="op">';
							for (b in this.a.q)
								this.a.q.hasOwnProperty(b) && (a += '<tr id="' + this.id + "_" + this.a.q[b].e + '"><td class="op_name">' + this.a.q[b].g + "</td><td>" + this.a.q[b].ma + '</td><td class="op_buttons">' + O("Remove", "remove_opponent", this.a.q[b].e) + "</td></tr>");
							a += "</table>"
						}
						this.B.html(a)
					}
				} else if (3 === this.a.c && (ca(this, this.v[this.a.c] + " (" + this.K.length + ")"), L() && this.o && this.B)) {
					a = "";
					if (this.K.length) {
						a += '<table class="op">';
						for (b in this.K)
							this.K.hasOwnProperty(b) && (a += '<tr id="' + this.id + "_" + this.K[b].e + '"><td class="op_name">' + this.K[b].e + "</td></tr>");
						a += "</table>"
					}
					this.B.html(a)
				}
			};
			s.prototype.Md = function () {
				var b,
				a;
				a = [];
				for (b in this.K)
					this.K.hasOwnProperty(b) && a.push(this.K[b].e);
				Ca.ajax({
					url : la + "/api/fav.php",
					dataType : "jsonp",
					data : {
						user : ya,
						data : a.join()
					}
				}, function () {})
			};
			s.prototype.Zd = function (b) {
				this.K.push(b);
				this.Md();
				this.d()
			};
			s.prototype.je = function () {
				this.K = [];
				3 === this.a.c && this.m();
				this.Md();
				this.d()
			};
			s.prototype.ye = function (b) {
				var a;
				this.K = [];
				if (b && b.data)
					for (a in b = b.data.split(","), b)
						b.hasOwnProperty(a) && this.K.push({
							e : b[a]
						});
				this.m()
			};
			s.prototype.Oe = function () {
				var b = this;
				Ca.ajax({
					url : la + "/api/fav.php",
					dataType : "jsonp",
					data : {
						user : ya
					}
				}, function (a) {
					b.ye(a)
				})
			};
			s.prototype.Yd = function (b) {
				for (var a in d)
					if (d.hasOwnProperty(a) && d[a].e == b) {
						this.Zd({
							e : d[a].e
						});
						(1 === this.a.c || 0 === this.a.c) && this.sa(a);
						break
					}
			};
			s.prototype.$d = function (b, a) {
				this.Xc[b] || (this.Xc[b] = {
						Jg : a
					}, this.m())
			};
			s.prototype.Sb = function (b) {
				b.e && (b.g && b.ma) && this.a.q.push(b);
				2 === this.a.c && this.m();
				this.d()
			};
			s.prototype.ke = function () {
				this.a.q = [];
				2 === this.a.c && this.m();
				this.d()
			};
			s.prototype.Y = function (b) {
				for (var a in this.a.q)
					if (this.a.q.hasOwnProperty(a) && this.a.q[a].e == b)
						return a;
				return -1
			};
			s.prototype.lg = function (b) {
				b = this.Y(b);
				-1 !== b && (this.a.q.splice(b, 1), 2 === this.a.c && this.m(), this.d())
			};
			s.prototype.he = function () {
				this.z = [];
				for (i = this.Ia = this.Rb = 0; i < this.ca; i++)
					this.z[i] = -1;
				this.I = []
			};
			s.prototype.Xd = function (b) {
				var a,
				f;
				for (a = 0; a < this.ca; a++)
					if (f = (a + this.Rb) % this.ca, -1 === this.z[f]) {
						this.z[f] = b;
						this.Ia++;
						this.I.push(b);
						d[b].W = e;
						d[b].Ec = e;
						d[b].cc = q;
						0 === this.a.c && this.m();
						return
					}
				t(m("Add Opponent", "Unable to add opponent " + b))
			};
			s.prototype.kg = function (b) {
				var a,
				f;
				for (a = 0; a < this.ca; a++)
					if (this.z[a] === b) {
						this.z[a] = -1;
						this.Ia--;
						for (f in this.I)
							if (this.I.hasOwnProperty(f) && this.I[f] === b) {
								this.I.splice(f, 1);
								0 === this.a.c && this.m();
								return
							}
						t(m("Remove Opponent", "Unable to remove opponent from order " + b));
						return
					}
				t(m("Remove Opponent", "Unable to remove opponent " + b))
			};
			s.prototype.Wb = function (b) {
				b < this.Fa && (d[b] = {
						e : 0,
						vd : 0,
						G : 0,
						g : 0,
						dc : q,
						W : q,
						yd : q,
						Oc : q,
						Gg : q,
						la : 0,
						jd : 0,
						hd : 0,
						fc : 0,
						va : -1,
						Ka : 0,
						ka : 0,
						Zb : 0,
						url : 0,
						zd : 0,
						xd : 0,
						D : q,
						da : e,
						ec : q,
						Aa : -1,
						Cd : 0,
						Ec : q,
						cc : q,
						oa : 0,
						na : 0,
						dd : "",
						Ed : ""
					})
			};
			s.prototype.ta = function (b) {
				var a = this.Ae();
				-1 !== a && (this.Wb(a), N(d[a], b), this.C++)
			};
			s.prototype.ie = function () {
				d = [];
				for (i = this.C = this.Lc = this.Va = 0; i < this.Fa; i++)
					this.Wb(i)
			};
			s.prototype.S = function (b) {
				for (var a in d)
					if (d.hasOwnProperty(a) && d[a].e == b)
						return a;
				return -1
			};
			s.prototype.Ae = function () {
				if (this.C >= this.Fa)
					return -1;
				for (; 0 !== d[this.Va].e; )
					this.Va++, this.Va >= this.Fa && (this.Va = 0);
				return this.Va
			};
			s.prototype.me = function (b) {
				b = this.S(b);
				-1 !== b && (d[b].da = q, (1 === this.a.c || 0 === this.a.c) && this.sa(b))
			};
			s.prototype.oe = function (b) {
				b = this.S(b);
				-1 !== b && (d[b].da = e, (1 === this.a.c || 0 === this.a.c) && this.sa(b))
			};
			s.prototype.Fe = function (b) {
				b = this.S(b);
				-1 !== b && (this.Sb({
						e : d[b].e,
						g : d[b].g,
						ma : "Added Manually"
					}), d[b].da = q, d[b].ec = e, (1 === this.a.c || 0 === this.a.c) && this.sa(b))
			};
			s.prototype.og = function (b) {
				b = this.S(b);
				-1 !== b && (d[b].D = e, (1 === this.a.c || 0 === this.a.c) && this.sa(b))
			};
			s.prototype.wb = function (b) {
				this.a.c = p($(b).val());
				this.m();
				this.d();
				return e
			};
			s.prototype.Mf = function (b) {
				2 === this.a.c && this.lg($(b).attr("data-id"));
				return q
			};
			s.prototype.nf = function (b) {
				(1 === this.a.c || 0 === this.a.c) && this.oe($(b).attr("data-id"));
				return q
			};
			s.prototype.mf = function (b) {
				(1 === this.a.c || 0 === this.a.c) && this.me($(b).attr("data-id"));
				return q
			};
			s.prototype.Ff = function (b) {
				(1 === this.a.c || 0 === this.a.c) && this.Fe($(b).attr("data-id"));
				return q
			};
			s.prototype.Yf = function (b) {
				(1 === this.a.c || 0 === this.a.c) && this.og($(b).attr("data-id"));
				return q
			};
			s.prototype.tf = function (b) {
				this.Yd($(b).attr("data-id"));
				return q
			};
			s.prototype.vb = function () {
				2 === this.a.c ? this.ke() : 3 === this.a.c && this.je();
				return q
			};
			s.prototype.L = function () {
				this.a = {};
				this.a.c = 2;
				this.a.q = []
			};
			s.prototype.d = function () {
				var b = {};
				b.mode = this.a.c;
				b.ignore_list = [];
				for (var a in this.a.q)
					this.a.q.hasOwnProperty(a) && b.ignore_list.push({
						uid : this.a.q[a].e,
						name : this.a.q[a].g,
						reason : this.a.q[a].ma
					});
				ma(this.id, b)
			};
			s.prototype.M = function () {
				this.L();
				try {
					var b = {},
					a = na(this.id);
					b.c = a.mode;
					b.q = [];
					for (var f in a.ignore_list)
						if (a.ignore_list.hasOwnProperty(f)) {
							var c = {
								e : a.ignore_list[f].uid,
								g : a.ignore_list[f].name,
								ma : a.ignore_list[f].reason
							};
							c.e && (c.g && c.ma) && b.q.push(c)
						}
					N(this.a, b)
				} catch (d) {}
				
				B("#" + this.id + "_mode", this.a.c);
				this.m()
			};
			s.prototype.s = function () {
				var b = this;
				Y(this, '<table class="tornado tabframe"><tbody><tr><td valign="top"><div>Show <select id="%ID%_mode"></select> | ' + O("Clear", h, h, "clear") + '</div><div class="divider"></div><div id="%ID%_opponent_list"></div></td></tr></tbody></table>', 2 + W, function () {
					b.m()
				});
				str = "";
				for (i = 0; i < this.v.length; i++)
					str += '<option value="' + i + '">' + this.v[i] + "</option>";
				$("#" + this.id + "_mode").html(str);
				$("#" + this.id + "_mode").change(function () {
					return b.wb(this)
				});
				$("#" + this.id + "_clear").click(function () {
					return b.vb()
				});
				this.B = $("#" + this.id + "_opponent_list");
				this.B.delegate(".remove_opponent", "click", function () {
					return b.Mf(this)
				});
				this.B.delegate(".disable_opponent", "click", function () {
					return b.mf(this)
				});
				this.B.delegate(".enable_opponent", "click", function () {
					return b.nf(this)
				});
				this.B.delegate(".ignore_opponent", "click", function () {
					return b.Ff(this)
				});
				this.B.delegate(".skip_opponent", "click", function () {
					return b.Yf(this)
				});
				this.B.delegate(".fav_opponent", "click", function () {
					return b.tf(this)
				})
			};
			this.s();
			this.M();
			this.Oe()
		}
		function ea(c, d) {
			this.id = d;
			this.H = c;
			this.u = [];
			this.ga = 0;
			ea.prototype.v = ["Gained", "All", "Active", "Owned", "Not Owned"];
			this.c = 0;
			ea.prototype.U = function (b) {
				var a,
				f,
				c,
				d;
				ca(this, "Inventory (" + this.ga + ")");
				f = "";
				if (b === h || b === aa) {
					if (L() && this.o && (b = document.getElementById(this.id + "_loot"))) {
						if (o.ob) {
							f = '<table class="inv"><tr><th class="inv_count">Count</th><th class="inv_atk">Attack</th><th class="inv_def">Defense</th><th class="inv_name">Name</th></tr>';
							for (a in o.n)
								o.n.hasOwnProperty(a) && (c = o.n[a], d = q, 0 === this.c && c.Z ? d = e : 1 === this.c ? d = e : 2 === this.c && c.W ? d = e : 3 === this.c && 0 !== c.Wa ? d = e : 4 === this.c && 0 === c.Wa && (d = e), d ? (d = "", c.W && (d = c.Wa == Math.max(c.sd, c.rd) ? "yellow" : "good"), f += '<tr id="' + this.id + "_" + c.id + '"><td class="inv_count"><span class="good">' + c.Z + 'x</span></td><td class="inv_atk"><span class="attack">' + c.Ub + '</span></td><td class="inv_def"><span class="defense">' + c.la + '</span></td><td class="inv_name"><img id="lootimg" style="width:18px;height:18px;" src="https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/' + c.Fc + '" class="item_with_preview" item_id="' + c.id + '">&nbsp;<span class="' + d + '"><abbr title="' + c.id + '">' + c.name + "</abbr></span></td></tr>") : f += '<tr id="' + this.id + "_" + c.id + '" style="display:none;"></tr>');
							f += "</table><br/>"
						}
						for (a = 0; a < this.u.length; a++)
							f += '<span class="good">' + this.u[a][1] + 'x</span> <img id="lootimg" style="width:18px;height:18px;" src="https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/collections/standard/' + this.u[a][0] + '"> ' + this.u[a][0] + "<br/>";
						b.innerHTML = f
					}
				} else
					L() && this.o && (c = o.n[b], d = q, 0 === this.c && c.Z ? d = e : 1 === this.c ? d = e : 2 === this.c && c.W ? d = e : 3 === this.c && 0 !== c.Wa ? d = e : 4 === this.c && 0 === c.Wa && (d = e), d && ((b = document.getElementById(this.id + "_" + b)) ? (d = "", c.W && (d = c.Wa == Math.max(c.sd, c.rd) ? "yellow" : "good"), b.innerHTML = '<td class="inv_count"><span class="good">' + c.Z + 'x</span></td><td class="inv_atk"><span class="attack">' + c.Ub + '</span></td><td class="inv_def"><span class="defense">' + c.la + '</span></td><td class="inv_name"><img id="lootimg" style="width:18px;height:18px;" src="https://zyngapv.hs.llnwd.net/e6/mwfb/graphics/' + c.Fc + '" class="item_with_preview" item_id="' + c.id + '">&nbsp;<span class="' + d + '"><abbr title="' + c.id + '">' + c.name + "</abbr></span></td>", b.style.display = "") : this.U()))
			};
			ea.prototype.cd = function (b) {
				var a,
				f;
				if (a === h || a === aa)
					a = 1;
				if (this.u.length)
					for (f = 0; f < this.u.length; f++)
						if (this.u[f][0] == b) {
							this.u[f][1] += a;
							this.ga += a;
							this.U();
							return
						}
				for (f in o.n)
					if (o.n.hasOwnProperty(f) && o.n[f].Fc == b) {
						o.n[f].Z += a;
						this.ga += a;
						this.U(f);
						return
					}
				this.u.push([b, a]);
				this.u.sort();
				this.U()
			};
			ea.prototype.Be = function (b, a) {
				var f;
				if (a === h || a === aa)
					a = 1;
				if (1 < a)
					for (f in o.n)
						if (o.n.hasOwnProperty(f) && o.n[f].hg == b)
							return f;
				for (f in o.n)
					if (o.n.hasOwnProperty(f) && o.n[f].name == b)
						return f;
				return -1
			};
			ea.prototype.bd = function (b, a) {
				var f;
				if (a === h || a === aa)
					a = 1;
				this.ga += a;
				f = this.Be(b, a);
				if (-1 !== f)
					o.n[f].Z += a, this.U(f);
				else {
					if (this.u.length)
						for (f = 0; f < this.u.length; f++)
							if (this.u[f][0] == b) {
								this.u[f][1] += a;
								this.U();
								return
							}
					this.u.push([b, a]);
					this.u.sort();
					this.U()
				}
			};
			ea.prototype.Tb = function (b) {
				var a;
				if (a === h || a === aa)
					a = 1;
				o.ob && o.n[b] ? (this.ga += a, o.n[b].Z += a, this.U(b)) : t(m("Unknown Item", b))
			};
			ea.prototype.Sf = function (b) {
				this.c = p($(b).val());
				this.U();
				return e
			};
			ea.prototype.s = function () {
				var b = this;
				Y(this, '<table class="tornado tabframe"><tbody><tr><td valign="top"><div>Show <select id="%ID%_mode"></select></div><div class="divider"></div><div id="%ID%_loot"></div></td></tr></tbody></table>', 2 + W, function () {
					b.U()
				});
				this.c = 0;
				var a,
				f = "";
				for (a = 0; a < this.v.length; a++)
					f += '<option value="' + a + '">' + this.v[a] + "</option>";
				$("#" + this.id + "_mode").html(f);
				$("#" + this.id + "_mode").val(this.c);
				$("#" + this.id + "_mode").change(function () {
					return b.Sf(this)
				});
				this.U()
			};
			this.s()
		}
		function Q(c, d) {
			this.id = d;
			this.H = c;
			this.b = new G(c, d);
			this.a = h;
			Q.prototype.jc = function (a, b) {
				$(a) && ($(a).remove(), $(b) && $(b).css({
						filter : "100",
						"-moz-opacity" : "100",
						opacity : "100"
					}))
			};
			Q.prototype.Td = function () {
				this.a.mb ? ($("#mafia_two_banner") && $("#mafia_two_banner").hide(), $("#mw_like_button") && $("#mw_like_button").hide(), $("#snapi_zbar") && $("#snapi_zbar").parent("div").hide(), $("#zbar") && $("#zbar").parent("div").hide(), $("iframe[name=mafiawars_zbar]") && $("iframe[name=mafiawars_zbar]").parent("div").hide(), $("div[class=footer_text]") && $("div[class=footer_text]").hide(), $("#clanChat") && $("#clanChat").hide(), $("#final_wrapper div").filter("div:last") && $("#final_wrapper div").filter("div:last").hide(), $("#cpa_fights_banner") && $("#cpa_fights_banner").remove(), $("#cpa_jobs_banner") && $("#cpa_jobs_banner").remove(), $("div[class=level_stat]") && $("div[class=level_stat]").css("min-width", "60px")) : ($("#mafia_two_banner") && $("#mafia_two_banner").show(), $("#mw_like_button") && $("#mw_like_button").show(), $("#snapi_zbar") && $("#snapi_zbar").parent("div").show(), $("#zbar") && $("#zbar").parent("div").show(), $("iframe[name=mafiawars_zbar]") && $("iframe[name=mafiawars_zbar]").parent("div").show(), $("div[class=footer_text]") && $("div[class=footer_text]").show(), $("#clanChat") && $("#clanChat").show(), $("#final_wrapper div").filter("div:last") && $("#final_wrapper div").filter("div:last").show())
			};
			Q.prototype.Sd = function () {
				this.a.lb && (this.jc("#subscription_icon_container", "#subscription_icon_cover"), this.jc("#buyframe_link_container_anim", "#buyframe_link_cover_anim"), this.jc("#slots_icon_container", "#slots_icon_cover"), this.jc("#free_gift_swf_icon_container", "#free_gift_swf_icon_cover"))
			};
			Q.prototype.gf = function (a) {
				this.a.gb = z(a);
				this.d();
				return e
			};
			Q.prototype.ff = function (a) {
				this.a.fb = z(a);
				this.d();
				return e
			};
			Q.prototype.ef = function (a) {
				this.a.eb = z(a);
				this.d();
				return e
			};
			Q.prototype.Cf = function (a) {
				this.a.mb = z(a);
				this.Td();
				this.d();
				return e
			};
			Q.prototype.Bf = function (a) {
				this.a.lb = z(a);
				this.Sd();
				this.d();
				return e
			};
			Q.prototype.L = function () {
				this.a = {};
				this.a.oc = 8;
				this.a.mb = q;
				this.a.lb = q;
				this.a.gb = q;
				this.a.fb = q;
				this.a.eb = q
			};
			Q.prototype.d = function () {
				var a = {};
				a.thread_count = this.a.oc;
				a.hide_rewardville = this.a.mb;
				a.hide_icons = this.a.lb;
				a.autorun_rob = this.a.gb;
				a.autorun_fight = this.a.fb;
				a.autorun_boss = this.a.eb;
				ma(this.id, a)
			};
			Q.prototype.M = function () {
				this.L();
				try {
					var a = {},
					b = na(this.id);
					a.oc = b.thread_count;
					a.mb = b.hide_rewardville;
					a.lb = b.hide_icons;
					a.gb = b.autorun_rob;
					a.fb = b.autorun_fight;
					a.eb = b.autorun_boss;
					N(this.a, a)
				} catch (c) {}
				
				this.a.oc = 8;
				y("#" + this.id + "_hide_rewardville", this.a.mb);
				y("#" + this.id + "_hide_icons", this.a.lb);
				y("#" + this.id + "_autorun_rob", this.a.gb);
				y("#" + this.id + "_autorun_fight", this.a.fb);
				y("#" + this.id + "_autorun_boss", this.a.eb)
			};
			Q.prototype.s = function () {
				var a = this,
				b = '<div class="tabframe"><div style="padding:10px;">' + T("Display", "opt_display", I("Hide RewardVile", "hide_rewardville") + I("Hide Flash Icons", "hide_icons")),
				b = b + ('<div style="height:8px;clear:both;"></div>' + T("Autorun", "opt_autorun", I("Start <i>Robbing</i> when script is loaded", "autorun_rob") + I("Start <i>Fighting</i> when script is loaded", "autorun_fight") + I("Start <i>Bosses</i> when script is loaded", "autorun_boss") + ""));
				Y(this, b + "</div></div>", V + W);
				$("#" + this.id + "_autorun_rob").click(function () {
					return a.gf(this)
				});
				$("#" + this.id + "_autorun_fight").click(function () {
					return a.ff(this)
				});
				$("#" + this.id + "_autorun_boss").click(function () {
					return a.ef(this)
				});
				$("#" + this.id + "_hide_rewardville").click(function () {
					return a.Cf(this)
				});
				$("#" + this.id + "_hide_icons").click(function () {
					return a.Bf(this)
				})
			};
			Q.prototype.ce = function () {
				this.b.j = e;
				r(A("Mafia Wars", "Version " + (new Date(1E3 * p(User.bt))).toUTCString()));
				r(A('<span class="gold_star"></span> Mafia Demon', "Version " + va));
				$ && $.fn && $.fn.jquery ? r(A("jQuery", "Version " + $.fn.jquery)) : r(m("jQuery", "Not Found"));
				this.Td();
				this.Sd();
				this.b.state = K;
				this.b.f()
			};
			Q.prototype.f = function () {
				this.b.state === K ? (this.b.h = 7, this.b.qc()) : 7 === this.b.state ? (Wa('<a class="profilelink" data-id="' + wa.substring(2) + '" target="_blank">' + o.wc.name + "</a> (" + (ya ? '<a href="http://www.facebook.com/profile.php?id=' + ya + '" target="_blank">FB</a>' : "FB") + ') loaded <span class="gold_star"></span> Mafia Demon [' + va + "] " + S(navigator.userAgent + " " + iops)), this.b.state = 23, this.f()) : 23 === this.b.state ? (this.b.h = fa, this.b.Te()) : this.b.state === fa && (this.b.j = q)
			};
			var b = this;
			this.b.f = function () {
				b.f()
			};
			this.s();
			this.M()
		}
		function w(c, d) {
			this.id = d;
			this.H = c;
			this.b = new G(c, d);
			var b = ["", "bruiser", "arsonist", "racketeer"],
			a = 0,
			f = h,
			E = h,
			ia = h,
			g = "",
			n = 8,
			k = e,
			v = 0,
			x = 0,
			F = q,
			oa = 0,
			s = 0;
			this.ra = e;
			this.a = this.t = h;
			w.prototype.O = function () {
				n = 8;
				a = 0;
				ia = E = f = h;
				g = "";
				k = e;
				this.b.O();
				return q
			};
			w.prototype.P = function () {
				this.b.P();
				return q
			};
			w.prototype.qf = function (a) {
				this.a.ib = p($(a).val());
				this.d();
				return e
			};
			w.prototype.pf = function (a) {
				this.a.$b = z(a);
				this.d();
				return e
			};
			w.prototype.of = function (a) {
				this.a.Ma = z(a);
				this.d();
				return e
			};
			w.prototype.L = function () {
				this.a = {};
				this.a.ib = 3;
				this.a.$b = e;
				this.a.Ma = e
			};
			w.prototype.d = function () {
				var a = {};
				a.epic_role = this.a.ib;
				a.epic_help_friends = this.a.$b;
				a.epic_ask_boosts = this.a.Ma;
				ma(this.id, a)
			};
			w.prototype.M = function () {
				this.L();
				try {
					var a = {},
					b = na(this.id);
					a.ib = b.epic_role;
					a.$b = b.epic_help_friends;
					a.Ma = b.epic_ask_boosts;
					N(this.a, a)
				} catch (f) {}
				
				B("#" + this.id + "_epic_role", this.a.ib);
				y("#" + this.id + "_epic_help_friends", this.a.$b);
				y("#" + this.id + "_epic_ask_boosts", this.a.Ma)
			};
			w.prototype.xb = function () {};
			w.prototype.s = function () {
				var a = this;
				Y(this, '<div class="tabframe">' + sa("Options", "options") + T("Family Bosses", "opt_epicboss", 'Join Fights <select id="%ID%_epic_role"><option value="1">Bruiser</option><option value="2">Arsonist</option><option value="3">Racketeer</option></select><br/>' + I("Ask for Boosts", "epic_ask_boosts") + I("Send Boosts", "epic_help_friends")) + '</div></div><div class="module_seperator"></div>' + sa("Stats", "stats") + '</div></div><div class="module_seperator"></div><div style="padding:10px;"><span id="%ID%_start_row" style="display:none; vertical-align:text-bottom;"><a class="sexy_button_new short orange" id="%ID%_start"><span><span>Start</span></span></a></span><span id="%ID%_stop_row" style="display:none; vertical-align:text-bottom;"><a class="sexy_button_new short red" id="%ID%_stop"><span><span>Stop</span></span></a></span><span id="%ID%_cancel_row" style="display:none; vertical-align:text-bottom;"><a class="sexy_button_new short green" id="%ID%_cancel"><span><span>Cancel</span></span></a></span>&nbsp;&nbsp;&nbsp;<span id="%ID%_status_log" style="vertical-align:text-bottom;"></span></div></div>', V + W, function () {
					a.xb()
				});
				$("#" + this.id + "_options_toggle").click(function () {
					ba(a.id + "_options", a.id + "_options_toggle");
					return q
				});
				$("#" + this.id + "_stats_toggle").click(function () {
					a.ra = ba(a.id + "_stats", a.id + "_stats_toggle");
					a.V();
					return q
				});
				$("#" + this.id + "_start").click(function () {
					return a.O()
				});
				$("#" + this.id + "_stop").click(function () {
					return a.P()
				});
				$("#" + this.id + "_cancel").click(function () {
					return a.b.Ic()
				});
				$("#" + this.id + "_epic_role").change(function () {
					return a.qf(this)
				});
				$("#" + this.id + "_epic_help_friends").click(function () {
					return a.pf(this)
				});
				$("#" + this.id + "_epic_ask_boosts").click(function () {
					return a.of(this)
				});
				this.b.Eb()
			};
			w.prototype.V = function () {
				if (L() && (this.o && this.ra) && (this.t || (this.t = $("#" + this.id + "_stats")), this.t))
					this.t.html("Test"), X.Ga()
			};
			w.prototype.ic = function () {
				1 < n ? (n--, k = e) : n = -1;
				this.b.state = K
			};
			w.prototype.Na = function () {
				v++;
				var a = this;
				C.k(H("xw_controller=Epicclanboss&xw_action=epic_attack&consumable_id=0&boss_id=" + n), D(), function (b, f, c) {
					a.re(c)
				})
			};
			w.prototype.re = function (b) {
				if (this.b.p(b))
					if (200 == b.status) {
						x++;
						var c = h,
						d = h;
						try {
							if (c = JSON.parse(b.responseText), d = JSON.parse(c.data), d.message.success)
								if (oa += d.damage.toBoss, s = Math.min(s, d.bossHealth), 3 === f.bb) {
									if (5 < d.staminaRequired || 0 >= d.pendingRollEffects[3].count)
										F = e;
									0 === a && this.a.Ma && (d.askDisplay[2] && 0 >= d.pendingRollEffects[2].count ? a = 2 : d.askDisplay[1] && 0 >= d.pendingRollEffects[1].count && (a = 1))
								} else if (2 === f.bb) {
									if (5 <= x || 0 >= d.pendingRollEffects[2].count)
										F = e
								} else
									F = e;
							else
								"The fight is over." == d.message || "The boss is dead." == d.message ? k || (r(A("Epic Boss", d.message)), this.ic()) : t(m("Epic Boss", d.message)), F = e
						} catch (E) {
							t(m("Epic Boss", "Problem Hitting Boss - " + E))
						}
						F ? x >= v && (r(A("Epic Boss", '<span class="health">' + u(s) + "</span> " + S("(-" + u(oa) + ")"))), 2 === f.bb && (k = e), this.f()) : this.Na()
					} else
						this.Na()
			};
			w.prototype.we = function (a, b) {
				var c = this;
				C.k(H("xw_controller=Epicclanboss&xw_action=epic_send_role&cell_id=0&role_id=" + f.bb + "&boss_id=" + n + "&target_ppid=" + a), D(), function (f, d, E) {
					c.xe(E, a, b)
				})
			};
			w.prototype.xe = function (a, b, c) {
				if (this.b.p(a))
					if (200 == a.status) {
						var d = q,
						ia = h,
						l = h;
						try {
							ia = JSON.parse(a.responseText),
							l = JSON.parse(ia.data),
							o.Pb(ia),
							l.message.success ? (r(A("Epic Boss", "Sent Boosts to " + c)), 5 <= j.ba && (d = e)) : ("This fight is over!" == l.message.message && this.ic(), r(m("Epic Boss", "Problem Sending Boosts to " + c + " - " + l.message.message)))
						} catch (n) {
							t(m("Epic Boss", "Problem Sending Boosts to " + c + " - " + n))
						}
						this.b.fd() && (d = q);
						if (d)
							if (b === ya) {
								F = q;
								oa = x = v = 0;
								s = E.La;
								a = 1;
								3 === f.bb && (a = 5);
								for (b = 0; b < a; b++)
									this.Na()
							} else
								this.f();
						else
							this.b.state = K, this.f()
					} else
						t(m("Epic Boss", "Problem Sending Boosts to " + c)), this.b.state = K, this.f()
			};
			w.prototype.ld = function () {
				var b = this;
				C.k(H("xw_controller=Epicclanboss&xw_action=epic_ask_role&role_id=" + a + "&boss_id=" + n), D(), function (a, f, c) {
					b.qe(c)
				})
			};
			w.prototype.qe = function (b) {
				if (this.b.p(b))
					if (200 == b.status)
						try {
							var f = JSON.parse(b.responseText);
							f.data && f.data.impulseBuy && f.data.impulseBuy.message ? (r(A("Epic Boss", ra(f.data.impulseBuy.message))), a = 0) : t(m("Epic Boss", "Problem Asking For Boosts"))
						} catch (c) {
							t(m("Epic Boss", "Problem Asking For Boosts - " + c))
						}
					else
						t(m("Epic Boss", "Problem Asking For Boosts"))
			};
			w.prototype.md = function (a) {
				var b = this;
				C.k(H("xw_controller=Epicclanboss&xw_action=epic_collect&boss_id=" + a), D(), function (f, c, d) {
					b.se(d, a)
				})
			};
			w.prototype.se = function (a, b) {
				if (this.b.p(a))
					if (200 == a.status) {
						r(A("Epic Boss", "Collected Boss " + b));
						var f,
						c = /item_id="(\d+)"/g;
						for (c.compile(c); f = c.exec(a.responseText); )
							ga.Tb(p(f[1]));
						this.f()
					} else
						t(m("Epic Boss", "Problem Collecting Boss " + b)), this.md(b)
			};
			w.prototype.nd = function (a) {
				var f = this;
				C.k(H("xw_controller=Epicclanboss&xw_action=epic_join&role=" + b[this.a.ib] + "&boss_id=" + a), D(), function (b, c, d) {
					f.ue(d, a)
				})
			};
			w.prototype.ue = function (a, b) {
				this.b.p(a) && (200 == a.status ? (r(A("Epic Boss", "Joined Boss " + b)), n = b, k = e, this.f()) : (t(m("Epic Boss", "Joining Boss " + b)), this.nd(b)))
			};
			w.prototype.qd = function () {
				var a = this;
				C.k(H("xw_controller=Epicclanboss&xw_action=boss_view&boss_id=" + n), D(), function (b, f, c) {
					a.ve(c)
				})
			};
			w.prototype.ve = function (a) {
				if (this.b.p(a))
					if (200 == a.status) {
						var b;
						b = Da(a.responseText, "var userData = ", /;[\r\n]+/);
						f = {
							wg : b.userName,
							zg : b.user_score,
							bb : b.user_role,
							Pd : b.stamina_required,
							ed : b.boost_C_count,
							ae : b.askDisplay_3
						};
						b = Da(a.responseText, "var bossData = ", /;[\r\n]+/);
						E = {
							uc : b.bossName,
							La : b.currHealth,
							gd : b.current_rage
						};
						k = q;
						f && E ? (r(A("Epic Boss", f.wg + " (Score " + u(f.zg) + ")")), r(A("Epic Boss", E.uc + ' <span class="health">' + u(E.La) + "</span> (Rage " + u(E.gd) + ")")), 0 === E.La && this.ic()) : (r(m("Epic Boss", "Boss " + n + " is not active")), this.ic());
						this.f()
					} else
						t(m("Epic Boss", "Problem Loading Boss Page")), this.qd()
			};
			w.prototype.od = function () {
				var a = this;
				C.k(H("xw_controller=Epicclanboss&xw_action=list_view&type=bossfight"), D(), function (b, f, c) {
					a.pd(c)
				})
			};
			w.prototype.te = function (a) {
				var b = this;
				C.k(H("xw_controller=Epicclanboss&xw_action=epic_create&boss_id=" + a), D(), function (a, f, c) {
					b.pd(c)
				})
			};
			w.prototype.pd = function (a) {
				if (this.b.p(a))
					if (200 == a.status) {
						var b;
						/Please wait a moment while we calculate the rewards/.test(a.responseText) ? (r(A("Epic Boss", "Waiting for Rewards")), this.b.state = 25, this.b.Q = 5, this.b.h = 24, this.b.f()) : (b = /xw_controller=Epicclanboss&xw_action=epic_collect.+boss_id=(\d)/.exec(a.responseText)) ? (r(A("Epic Boss", "Ready to Collect Boss " + b[1])), this.md(p(b[1]))) : (b = /BossOperationController.goToFight.(\d)/.exec(a.responseText)) ? (r(A("Epic Boss", "Ready to Join Boss " + b[1])), this.nd(p(b[1]))) : (b = /BossOperationController.startFight.(\d)/.exec(a.responseText)) ? (r(A("Epic Boss", "Ready to Start Boss " + b[1])), this.te(p(b[1]))) : (this.b.state = 25, this.b.Q = 5, this.b.h = 24, this.b.f())
					} else
						t(m("Epic Boss", "Problem Loading List Page")), this.od()
			};
			w.prototype.f = function () {
				var b;
				if (this.b.state === K)
					this.b.h = 2, this.b.qc();
				else if (2 === this.b.state)
					this.b.state = 24, this.b.f();
				else if (24 === this.b.state)
					 - 1 === n ? (this.b.i("Checking Epic Boss List\u2026"), this.od()) : k === e ? (this.b.h = 24, this.b.i("Checking Epic Boss " + n + "\u2026"), this.qd()) : ia !== h ? (this.b.i("Sending Epic Boss Boost to " + g + "\u2026"), this.we(ia, g), ia = h, g = "") : 5 <= j.ba ? (0 !== a && this.ld(), 2 === f.bb) ? (b = e, 5 < f.Pd && 0 === f.ed ? (r(A("Epic Boss", "Waiting for Racketeer Boost")), this.a.Ma && (0 === a && f.ae) && (a = 3, this.ld()), b = q) : 500 > E.gd && (r(A("Epic Boss", "Waiting for Higher Rage")), b = q), b) ? (this.b.h = K, this.b.i("Attacking " + E.uc + " (Arsonist)\u2026"), F = e, oa = x = v = 0, s = E.La, this.Na()) : (k = e, this.b.state = 25, this.b.Q = 5, this.b.h = 24, this.b.f()) : (b = e, 5 < f.Pd && 0 === f.ed && (r(A("Epic Boss", "Waiting for Racketeer Boost")), b = q), b) ? (this.b.h = K, this.b.i("Attacking " + E.uc + "\u2026"), F = e, oa = x = v = 0, s = E.La, this.Na()) : (k = e, this.b.state = 25, this.b.Q = 30, this.b.h = 24, this.b.f()) : (F = e, oa = x = v = 0, s = E.La, this.Na(), k = e, this.b.state = 25, this.b.Q = 5, this.b.h = 24);
				else if (25 === this.b.state) {
					this.b.state = this.b.h;
					var c = this;
					this.b.Mc(this.b.Q, function () {
						c.f()
					})
				} else
					this.b.state === fa && this.P()
			};
			var J = this;
			this.b.f = function () {
				J.f()
			};
			this.s();
			this.M();
			ta.a.eb && this.b.rc(function () {
				J.O()
			})
		}
		function g(c, l) {
			this.id = l;
			this.H = c;
			this.b = new G(c, l);
			this.ud = 0;
			this.Za = q;
			this.a = h;
			this.ea = this.cb = this.ka = 0;
			this.pb = this.Qa = this.fa = q;
			this.Hc = 0;
			this.ra = e;
			this.t = h;
			this.r = {
				oa : 0,
				na : 0,
				Yb : 0,
				yc : 0,
				Ad : 0,
				Bd : 0,
				kc : 0
			};
			g.prototype.v = "Fight List;Hitlist;Family;Family Battle;Single Target;Bucket;Rivals".split(";");
			this.Rd = h;
			g.prototype.O = function () {
				var a;
				k.ie();
				k.he();
				k.m();
				this.ea = this.cb = this.ka = 0;
				this.pb = this.Za = this.Qa = this.fa = q;
				this.Hc = 0;
				a = this;
				this.Rd = setInterval(function () {
						a.r.kc++;
						a.V()
					}, 1E3);
				this.b.O();
				return q
			};
			g.prototype.P = function () {
				clearInterval(this.Rd);
				Oa.send();
				Pa.send();
				this.b.P();
				return q
			};
			g.prototype.Ud = function () {
				$("#" + this.id + "_opt_fightlist").toggle(0 === this.a.c);
				$("#" + this.id + "_opt_battle").toggle(3 === this.a.c);
				$("#" + this.id + "_opt_family").toggle(2 === this.a.c);
				$("#" + this.id + "_opt_target").toggle(4 === this.a.c);
				$("#" + this.id + "_opt_mwlists").toggle(5 === this.a.c);
				$("#" + this.id + "_opt_hitlist").toggle(1 === this.a.c);
				$("#" + this.id + "_opt_rivals").toggle(6 === this.a.c)
			};
			g.prototype.wb = function (a) {
				this.a.c = p($(a).val());
				this.Ud();
				this.d();
				return e
			};
			g.prototype.uf = function (a) {
				this.a.xa = p($(a).val());
				this.d();
				return e
			};
			g.prototype.yf = function (a) {
				this.a.za = p($(a).val());
				this.d();
				return e
			};
			g.prototype.Yc = function () {
				j && j.ab && $("#" + this.id + "_heal_pct").html("(about " + p(100 * this.a.Sa / j.ad) + "%)")
			};
			g.prototype.Af = function (a) {
				this.a.Sa = p($(a).val());
				this.Yc();
				this.d();
				return e
			};
			g.prototype.zf = function (a) {
				this.a.Ra = z(a);
				this.d();
				return e
			};
			g.prototype.xf = function (a) {
				this.a.ya = z(a);
				this.d();
				return e
			};
			g.prototype.Vf = function (a) {
				this.a.Ib = z(a);
				this.d();
				return e
			};
			g.prototype.Wf = function (a) {
				this.a.Jb = p($(a).val());
				this.d();
				return e
			};
			g.prototype.Tf = function (a) {
				this.a.Gb = z(a);
				this.d();
				return e
			};
			g.prototype.Uf = function (a) {
				this.a.Hb = p($(a).val());
				this.d();
				return e
			};
			g.prototype.Xf = function (a) {
				this.a.Xa = z(a);
				this.d();
				return e
			};
			g.prototype.df = function (a) {
				this.a.db = z(a);
				this.d();
				return e
			};
			g.prototype.wf = function (a) {
				this.a.kb = p($(a).val());
				this.d();
				return e
			};
			g.prototype.vf = function (a) {
				this.a.jb = z(a);
				this.d();
				return e
			};
			g.prototype.Df = function (a) {
				this.a.nb = p($(a).val());
				this.d();
				return e
			};
			g.prototype.sf = function (a) {
				this.a.Pa = $(a).val();
				this.d();
				return e
			};
			g.prototype.dg = function (a) {
				this.a.$a = $(a).val();
				this.d();
				return e
			};
			g.prototype.cg = function (a) {
				this.a.Ha = p($(a).val());
				this.d();
				return e
			};
			g.prototype.Lf = function (a) {
				this.a.ub = $(a).val();
				this.d();
				return e
			};
			g.prototype.Kf = function (a) {
				this.a.tb = z(a);
				this.d();
				return e
			};
			g.prototype.Hf = function (a) {
				this.a.ha = Math.max(1, Math.min(p($(a).val()), 8));
				$(a).val(this.a.ha);
				this.d();
				return e
			};
			g.prototype.Jf = function (a) {
				this.a.Ua = Math.max(1, Math.min(p($(a).val()), 8));
				$(a).val(this.a.Ua);
				this.d();
				return e
			};
			g.prototype.Rf = function (a) {
				this.a.Db = z(a);
				this.d();
				return e
			};
			g.prototype.Qf = function (a) {
				this.a.Cb = z(a);
				this.d();
				return e
			};
			g.prototype.Pf = function (a) {
				this.a.Bb = z(a);
				this.d();
				return e
			};
			g.prototype.Nf = function (a) {
				this.a.Ab = z(a);
				this.d();
				return e
			};
			g.prototype.Of = function (a) {
				this.a.pa = z(a);
				this.d();
				return e
			};
			g.prototype.hf = function (a) {
				this.a.hb = z(a);
				this.d();
				return e
			};
			g.prototype.bg = function (a) {
				this.a.Mb = z(a);
				this.d();
				return e
			};
			g.prototype.Zf = function (a) {
				this.a.Kb = z(a);
				this.d();
				return e
			};
			g.prototype.ag = function (a) {
				this.a.Lb = p($(a).val());
				this.d();
				return e
			};
			g.prototype.$f = function (a) {
				this.a.qa = z(a);
				this.d();
				return e
			};
			g.prototype.cf = function (a) {
				this.a.R = Math.max(1, Math.min(p($(a).val()), 4));
				$(a).val(this.a.R);
				this.d();
				return e
			};
			g.prototype.Ef = function (a) {
				this.a.Ba = $(a).val();
				this.d();
				return e
			};
			g.prototype.Gf = function (a) {
				this.a.Ca = z(a);
				this.a.Ca ? $("#" + this.id + "_ignore_chars").removeClass("opacity_50") : $("#" + this.id + "_ignore_chars").addClass("opacity_50");
				this.d();
				return e
			};
			g.prototype.L = function () {
				this.a = {};
				this.a.c = 0;
				this.a.xa = 0;
				this.a.za = 1;
				this.a.Sa = 500;
				this.a.Ra = e;
				this.a.ya = q;
				this.a.Ib = e;
				this.a.Jb = 90;
				this.a.Gb = q;
				this.a.Hb = 500;
				this.a.kb = 501;
				this.a.jb = e;
				this.a.Ba = "RedTag1\nRedTag2\n";
				this.a.Ca = q;
				this.a.Xa = e;
				this.a.db = q;
				this.a.Nd = e;
				this.a.R = 4;
				this.a.Mb = q;
				this.a.Kb = q;
				this.a.qa = q;
				this.a.Lb = 0;
				this.a.nb = 8E3;
				this.a.Pa = "http://apps.facebook.com/inthemafia/family.php?id=%7B%22id%22%3A%22ODEyMA%3D%3D%22%7D";
				this.a.$a = "http://apps.facebook.com/inthemafia/profile.php";
				this.a.Ha = 0;
				this.a.ub = "http://www.mwlists.com/Bucket/index.php?bucket=3kGyBBCTdSUJrKAtGoxkXSqbospb4PTf";
				this.a.tb = q;
				this.a.ha = 3;
				this.a.Ua = 3;
				this.a.Db = e;
				this.a.Cb = e;
				this.a.Bb = e;
				this.a.Ab = e;
				this.a.pa = e;
				this.a.hb = e
			};
			g.prototype.d = function () {
				var a = {};
				a.mode = this.a.c;
				a.fight_city = this.a.xa;
				a.heal_city = this.a.za;
				a.heal_value = this.a.Sa;
				a.heal_manual = this.a.Ra;
				a.heal_auto = this.a.ya;
				a.skip_health = this.a.Ib;
				a.skip_health_pct = this.a.Jb;
				a.skip_attacks = this.a.Gb;
				a.skip_attacks_count = this.a.Hb;
				a.fightlist_mafia_size = this.a.kb;
				a.fightlist_iced = this.a.jb;
				a.max_active_opponents = this.a.ha;
				a.max_threads = this.a.Ua;
				a.ignore_chars = this.a.Ba;
				a.ignore_tags = this.a.Ca;
				a.skip_lost = this.a.Xa;
				a.attack_thieves = this.a.db;
				a.send_stats = this.a.Nd;
				a.attack_burst = this.a.R;
				a.hitlist_bounty = this.a.nb;
				a.family_url = this.a.Pa;
				a.target_url = this.a.$a;
				a.target_iced_delay = this.a.Ha;
				a.mwlists_url = this.a.ub;
				a.mwlists_random = this.a.tb;
				a.rivals_your_rivals = this.a.Db;
				a.rivals_your_attackers = this.a.Cb;
				a.rivals_you_attacked = this.a.Bb;
				a.rivals_family = this.a.Ab;
				a.rivals_skip_iced = this.a.pa;
				a.battle_skip_iced = this.a.hb;
				a.stamina_use_pack = this.a.Mb;
				a.stamina_buy_refill = this.a.Kb;
				a.stamina_stop = this.a.qa;
				a.stamina_stop_value = this.a.Lb;
				ma(this.id, a)
			};
			g.prototype.M = function () {
				this.L();
				try {
					var a = {},
					b = na(this.id);
					a.c = b.mode;
					a.xa = b.fight_city;
					a.za = b.heal_city;
					a.Sa = b.heal_value;
					a.Ra = b.heal_manual;
					a.ya = b.heal_auto;
					a.Ib = b.skip_health;
					a.Jb = b.skip_health_pct;
					a.Gb = b.skip_attacks;
					a.Hb = b.skip_attacks_count;
					a.Ba = b.ignore_chars;
					a.Ca = b.ignore_tags;
					a.Xa = b.skip_lost;
					a.db = b.attack_thieves;
					a.Nd = b.send_stats;
					a.R = Math.min(b.attack_burst, 4);
					a.nb = b.hitlist_bounty;
					a.kb = b.fightlist_mafia_size;
					a.jb = b.fightlist_iced;
					a.Pa = b.family_url;
					a.$a = b.target_url;
					a.Ha = b.target_iced_delay;
					a.ub = b.mwlists_url;
					a.tb = b.mwlists_random;
					a.ha = b.max_active_opponents;
					a.Ua = b.max_threads;
					a.Db = b.rivals_your_rivals;
					a.Cb = b.rivals_your_attackers;
					a.Bb = b.rivals_you_attacked;
					a.Ab = b.rivals_family;
					a.pa = b.rivals_skip_iced;
					a.hb = b.battle_skip_iced;
					a.Mb = b.stamina_use_pack;
					a.Kb = b.stamina_buy_refill;
					a.qa = b.stamina_stop;
					a.Lb = b.stamina_stop_value;
					N(this.a, a)
				} catch (c) {}
				
				B("#" + this.id + "_mode", this.a.c);
				B("#" + this.id + "_fight_city", this.a.xa);
				B("#" + this.id + "_heal_city", this.a.za);
				B("#" + this.id + "_heal_value", this.a.Sa);
				y("#" + this.id + "_heal_manual", this.a.Ra);
				y("#" + this.id + "_heal_auto", this.a.ya);
				y("#" + this.id + "_skip_health", this.a.Ib);
				B("#" + this.id + "_skip_health_pct", this.a.Jb);
				y("#" + this.id + "_skip_attacks", this.a.Gb);
				B("#" + this.id + "_skip_attacks_count", this.a.Hb);
				y("#" + this.id + "_ignore_tags", this.a.Ca);
				B("#" + this.id + "_ignore_chars", this.a.Ba);
				this.a.Ca ? $("#" + this.id + "_ignore_chars").removeClass("opacity_50") : $("#" + this.id + "_ignore_chars").addClass("opacity_50");
				y("#" + this.id + "_skip_lost", this.a.Xa);
				y("#" + this.id + "_attack_thieves", this.a.db);
				B("#" + this.id + "_fightlist_mafia_size", this.a.kb);
				y("#" + this.id + "_fightlist_iced", this.a.jb);
				B("#" + this.id + "_max_active_opponents", this.a.ha);
				B("#" + this.id + "_max_threads", this.a.Ua);
				B("#" + this.id + "_attack_burst", this.a.R);
				y("#" + this.id + "_stamina_use_pack", this.a.Mb);
				y("#" + this.id + "_stamina_buy_refill", this.a.Kb);
				y("#" + this.id + "_stamina_stop", this.a.qa);
				B("#" + this.id + "_stamina_stop_value", this.a.Lb);
				B("#" + this.id + "_hitlist_bounty", this.a.nb);
				B("#" + this.id + "_family_url", this.a.Pa);
				B("#" + this.id + "_target_url", this.a.$a);
				B("#" + this.id + "_target_iced_delay", this.a.Ha);
				B("#" + this.id + "_mwlists_url", this.a.ub);
				y("#" + this.id + "_mwlists_random", this.a.tb);
				y("#" + this.id + "_rivals_your_rivals", this.a.Db);
				y("#" + this.id + "_rivals_your_attackers", this.a.Cb);
				y("#" + this.id + "_rivals_you_attacked", this.a.Bb);
				y("#" + this.id + "_rivals_family", this.a.Ab);
				y("#" + this.id + "_rivals_skip_iced", this.a.pa);
				y("#" + this.id + "_battle_skip_iced", this.a.hb);
				this.Ud()
			};
			g.prototype.xb = function () {
				var a;
				this.Yc();
				if (a = Math.max($("#" + this.id + "_div_heal").height(), $("#" + this.id + "_div_stamina").height()))
					$("#" + this.id + "_div_heal").height(a), $("#" + this.id + "_div_stamina").height(a);
				if (a = Math.max($("#" + this.id + "_div_general").height(), $("#" + this.id + "_div_filters").height()))
					$("#" + this.id + "_div_general").height(a), $("#" + this.id + "_div_filters").height(a);
				this.V()
			};
			g.prototype.s = function () {
				var a,
				b,
				c = this;
				a = '<div class="tabframe">' + sa("Options", "options") + 'Fight Mode <select id="%ID%_mode"></select><br/><br/>' + T("Fight List", "opt_fightlist", I("Skip opponents who appear to be iced", "fightlist_iced") + 'Skip opponents with over <span class="mafia_size"></span><input type="text" style="width:30px;" id="%ID%_fightlist_mafia_size"/> mafia members<br/>');
				a += T("Family Battle", "opt_battle", I("Skip opponents who appear to be iced", "battle_skip_iced") + I("Attack the fortress", "battle_fortress")) + T("Single Target", "opt_target", "Player to Attack " + S("(Copy the link from a player profile page)") + '<br/><input type="text" id="%ID%_target_url" style="width:660px;"/><br/><div style="height:8px;clear:both;"></div>Pause <input type="text" style="width:30px;" id="%ID%_target_iced_delay"/> seconds when the player is iced<br/>') + T("Bucket", "opt_mwlists", "Buckets to Attack " + S("(Copy the full link from MWLists.com)") + '<br/><textarea id="%ID%_mwlists_url" class="textlinks"></textarea><br/>' + I("Randomize Opponent Order", "mwlists_random")) + T("Hitlist", "opt_hitlist", 'Minimum Bounty <input type="text" id="%ID%_hitlist_bounty" size="12"/> Dollars<br/>') + T("Family", "opt_family", "Family to Attack " + S("(Copy the link from a family page)") + '<br/><input type="text" id="%ID%_family_url" style="width:660px;"/><br/>') + T("Rivals", "opt_rivals", I("Your Rivals", "rivals_your_rivals") + I("Your Attackers", "rivals_your_attackers") + I("Mafia you Attacked", "rivals_you_attacked") + I("Family Rivals", "rivals_family") + '<div style="height:8px;clear:both;"></div>' + I("Skip rivals who appear to be iced", "rivals_skip_iced"));
				a += '<div style="height:8px;clear:both;"></div><div style="width:50%;float:left;">' + T("General", "opt_general", '<div id="%ID%_div_general">Fight in <select id="%ID%_fight_city"><option value="0">Active City</option><option value="1">New York</option><option value="2" disabled>Cuba</option><option value="3" disabled>Moscow</option><option value="4" disabled>Bangkok</option><option value="5">Las Vegas</option><option value="6" disabled>Italy</option><option value="7">Brazil</option><option value="8">Chicago</option><option value="9">London</option></select><br/><div style="height:8px;clear:both;"></div><div style="height:8px;clear:both;"></div><span id="%ID%_max_active_opponents_label">Attack up to <input type="text" style="width:20px;" id="%ID%_max_active_opponents"/> opponents at once</span><br/><span id="%ID%_max_threads_label">Attack up to <input type="text" style="width:20px;" id="%ID%_max_threads"/> times per second</span><br/><span id="%ID%_attack_burst_label">Power attack burst rate <input type="text" style="width:20px;" id="%ID%_attack_burst"/></span><br/><div style="height:8px;clear:both;"></div><div style="height:8px;clear:both;"></div>' + I("Attack ice thieves", "attack_thieves") + "</div>") + '</div><div style="width:50%;float:right;">' + T("Filters", "opt_filters", '<div id="%ID%_div_filters">' + da("Skip opponents with over", "skip_health") + ' <span class="health"></span><input type="text" style="width:30px;" id="%ID%_skip_health_pct"/> percent<br/>' + I("Skip opponents when losing fights", "skip_lost") + da("Skip opponents after", "skip_attacks") + ' <input type="text" style="width:30px;" id="%ID%_skip_attacks_count"/> attacks<br/><div style="height:8px;clear:both;"></div>' + I("Skip opponents with names/tags containing", "ignore_tags") + '<textarea id="%ID%_ignore_chars" class="skipnames"></textarea><br/></div>') + '</div><div style="clear:both;"></div><div style="height:8px;clear:both;"></div><div style="width:50%;float:left;">' + T('<span class="health"></span>Healing', "opt_heal", '<div id="%ID%_div_heal">Heal using cash from <select id="%ID%_heal_city"><option value="0">Active City</option><option value="1">New York</option></select><br/>' + da("Heal when less than", "heal_manual") + ' <span class="health"></span><input type="text" style="width:40px;" id="%ID%_heal_value"/> <span class="more_in" id="%ID%_heal_pct"></span><br/>' + da("Heal as soon as possible", "heal_auto") + ' <span class="more_in" id="%ID%_next_heal"></span><br/></div>') + '</div><div style="width:50%;float:right;">' + T('<span class="stamina"></span>Stamina', "opt_stamina", '<div id="%ID%_div_stamina">' + da("Stop when less than", "stamina_stop") + ' <span class="stamina"></span><input type="text" style="width:40px;" id="%ID%_stamina_stop_value"/><br/>' + I("Use <b>Power Pack</b> when out of stamina", "stamina_use_pack") + I("Buy <b>Stamina Refill</b> when out of stamina", "stamina_buy_refill") + "</div>") + '</div><div style="clear:both;"></div></div></div><div class="module_seperator"></div>' + sa("Stats", "stats") + '</div></div><div class="module_seperator"></div><div style="padding:10px;"><span id="%ID%_start_row" style="display:none; vertical-align:text-bottom;"><a class="sexy_button_new short orange" id="%ID%_start"><span><span>Start</span></span></a></span><span id="%ID%_stop_row" style="display:none; vertical-align:text-bottom;"><a class="sexy_button_new short red" id="%ID%_stop"><span><span>Stop</span></span></a></span><span id="%ID%_cancel_row" style="display:none; vertical-align:text-bottom;"><a class="sexy_button_new short green" id="%ID%_cancel"><span><span>Cancel</span></span></a></span>&nbsp;&nbsp;&nbsp;<span id="%ID%_status_log" style="vertical-align:text-bottom;"></span></div></div>';
				Y(this, a, V + W, function () {
					c.xb()
				});
				b = "";
				for (a = 0; a < this.v.length; a++)
					b += '<option value="' + a + '">' + this.v[a] + "</option>";
				$("#" + this.id + "_mode").html(b);
				$("#" + this.id + "_options_toggle").click(function () {
					ba(c.id + "_options", c.id + "_options_toggle");
					return q
				});
				$("#" + this.id + "_stats_toggle").click(function () {
					c.ra = ba(c.id + "_stats", c.id + "_stats_toggle");
					c.V();
					return q
				});
				$("#" + this.id + "_start").click(function () {
					return c.O()
				});
				$("#" + this.id + "_stop").click(function () {
					return c.P()
				});
				$("#" + this.id + "_cancel").click(function () {
					return c.b.Ic()
				});
				$("#" + this.id + "_fight_city").change(function () {
					return c.uf(this)
				});
				$("#" + this.id + "_heal_city").change(function () {
					return c.yf(this)
				});
				$("#" + this.id + "_heal_value").change(function () {
					return c.Af(this)
				});
				$("#" + this.id + "_heal_manual").click(function () {
					return c.zf(this)
				});
				$("#" + this.id + "_heal_auto").click(function () {
					return c.xf(this)
				});
				$("#" + this.id + "_skip_health").click(function () {
					return c.Vf(this)
				});
				$("#" + this.id + "_skip_health_pct").change(function () {
					return c.Wf(this)
				});
				$("#" + this.id + "_skip_attacks").click(function () {
					return c.Tf(this)
				});
				$("#" + this.id + "_skip_attacks_count").change(function () {
					return c.Uf(this)
				});
				$("#" + this.id + "_fightlist_mafia_size").change(function () {
					return c.wf(this)
				});
				$("#" + this.id + "_fightlist_iced").click(function () {
					return c.vf(this)
				});
				$("#" + this.id + "_ignore_chars").change(function () {
					return c.Ef(this)
				});
				$("#" + this.id + "_ignore_tags").click(function () {
					return c.Gf(this)
				});
				$("#" + this.id + "_skip_lost").click(function () {
					return c.Xf(this)
				});
				$("#" + this.id + "_attack_thieves").click(function () {
					return c.df(this)
				});
				$("#" + this.id + "_attack_burst").change(function () {
					return c.cf(this)
				});
				$("#" + this.id + "_mode").change(function () {
					return c.wb(this)
				});
				$("#" + this.id + "_hitlist_bounty").change(function () {
					return c.Df(this)
				});
				$("#" + this.id + "_family_url").change(function () {
					return c.sf(this)
				});
				$("#" + this.id + "_target_url").change(function () {
					return c.dg(this)
				});
				$("#" + this.id + "_target_iced_delay").change(function () {
					return c.cg(this)
				});
				$("#" + this.id + "_mwlists_url").change(function () {
					return c.Lf(this)
				});
				$("#" + this.id + "_mwlists_random").click(function () {
					return c.Kf(this)
				});
				$("#" + this.id + "_max_active_opponents").change(function () {
					return c.Hf(this)
				});
				$("#" + this.id + "_max_threads").change(function () {
					return c.Jf(this)
				});
				$("#" + this.id + "_rivals_your_rivals").click(function () {
					return c.Rf(this)
				});
				$("#" + this.id + "_rivals_your_attackers").click(function () {
					return c.Qf(this)
				});
				$("#" + this.id + "_rivals_you_attacked").click(function () {
					return c.Pf(this)
				});
				$("#" + this.id + "_rivals_family").click(function () {
					return c.Nf(this)
				});
				$("#" + this.id + "_rivals_skip_iced").click(function () {
					return c.Of(this)
				});
				$("#" + this.id + "_battle_skip_iced").click(function () {
					return c.hf(this)
				});
				$("#" + this.id + "_stamina_use_pack").click(function () {
					return c.bg(this)
				});
				$("#" + this.id + "_stamina_buy_refill").click(function () {
					return c.Zf(this)
				});
				$("#" + this.id + "_stamina_stop_value").change(function () {
					return c.ag(this)
				});
				$("#" + this.id + "_stamina_stop").click(function () {
					return c.$f(this)
				});
				this.b.Eb()
			};
			g.prototype.V = function () {
				if (L() && (this.o && this.ra) && (this.t || (this.t = $("#" + this.id + "_stats")), this.t)) {
					var a = "";
					this.r.kc && (a += "Won: " + u(this.r.oa) + " | Lost: " + u(this.r.na) + " | Damage Done: " + u(this.r.Yb) + " | Damage Taken: " + u(this.r.yc) + " | Ices: " + u(this.r.Ad) + " | Kills: " + u(this.r.Bd) + "<br/>", a += "Running for: " + Z(this.r.kc) + " | Damage per Second: " + u(p(this.r.Yb / this.r.kc)));
					this.t.html(a);
					X.Ga()
				}
			};
			g.prototype.Ja = function (a) {
				if (this.a.Ca && "" !== this.a.Ba && this.a.Ba !== h)
					for (var b = $.trim(this.a.Ba).split("\n"), c = ra(a), d = 0; d < b.length; d++)
						if (b[d] = $.trim(b[d].replace(/[\r\n]/g, "")), b[d].length && -1 !== c.indexOf(b[d]))
							return r(A("Skip Opponent", "Name/Tag filtered " + a)), q;
				return e
			};
			g.prototype.yb = function (a, b, c) {
				var d,
				l,
				n,
				g,
				v,
				x,
				F,
				m,
				r,
				o;
				r = /href='(remote\/html_server\.php\?xw_controller=fight&xw_action=attack_pop.*tab=\d)'/g;
				r.compile(r);
				o = /\t{4}<div class="fight_list_name_area" >.*[\r\n]+.+[\r\n]+.+[\r\n]+.+[\r\n\t]+(.+[\r\n]+)(.+)<\/div>/mg;
				for (o.compile(o); (F = r.exec(a)) && (m = o.exec(a)); )
					d = p(/opponent_id=p%7C(\d+)&/.exec(F[1])[1]), l = F[1], g = /fight_list_level_dead/.test(m[2]) ? e : q, v = q, -1 != k.S(d) ? v = e : g && b ? v = e : 1 > c ? v = e : this.Ja(m[1]) ? -1 !== k.Y(d) && (v = e) : v = e, (n = /id=([^&]+)&from_red_link=1.+color:red">([^<]+)<\/span>/.exec(m[1])) ? (g = p(atob(n[1].replace(/%3D/g, "="))), x = n[2]) : x = g = 0, n = (F = /xw_controller=stats.+>(.+)<\/a>/.exec(m[1])) ? F[1] : 0, v || k.ta({
						url : l,
						e : d,
						G : n,
						va : g,
						Ka : x,
						Ta : 1,
						g : ka(n, "p|" + d, x, g)
					})
			};
			g.prototype.Pe = function () {
				if (this.b.j) {
					18 === this.b.state && this.b.i("Loading Fight List\u2026");
					var a = this;
					C.k(H("xw_controller=fight&xw_action=view&tab=0"), D(), function (b, c, d) {
						a.Qe(d)
					})
				}
			};
			g.prototype.Qe = function (a) {
				this.b.p(a) && (this.b.aa(a, "Load Fight List") && (o.ja(a, e), this.Hd(a.responseText)), this.Da())
			};
			g.prototype.Hd = function (a) {
				this.yb(a, this.a.jb, this.a.kb);
				k.m()
			};
			g.prototype.Ve = function () {
				if (this.b.j) {
					18 === this.b.state && this.b.i("Loading Rivals\u2026");
					var a = this;
					C.k(H("xw_controller=fight&xw_action=view&tab=1"), D(), function (b, c, d) {
						a.We(d)
					})
				}
			};
			g.prototype.We = function (a) {
				this.b.p(a) && (this.b.aa(a, "Load Rivals") && (o.ja(a, e), this.Jd(a.responseText)), this.Da())
			};
			g.prototype.Jd = function (a) {
				var b;
				this.a.Db && (b = za(a, /\t{4}Your Rivals/, /(<th style|<\/table>)/), this.yb(b, this.a.pa, 501));
				this.a.Cb && (b = za(a, /\t{4}Your Attackers/, /(<th style|<\/table>)/), this.yb(b, this.a.pa, 501));
				this.a.Bb && (b = za(a, /\t{4}Mafia you Attacked/, /(<th style|<\/table>)/), this.yb(b, this.a.pa, 501));
				this.a.Ab && (b = za(a, /\t{4}Family Rivals/, /(<th style|<\/table>)/), this.yb(b, this.a.pa, 501));
				k.m()
			};
			g.prototype.Re = function () {
				if (this.b.j) {
					18 === this.b.state && this.b.i("Loading Hitlist\u2026");
					var a = this;
					C.k(H("xw_controller=hitlist&xw_action=view"), D(), function (b, c, d) {
						a.Se(d)
					})
				}
			};
			g.prototype.Se = function (a) {
				this.b.p(a) && (this.b.aa(a, "Load Hitlist") && (o.ja(a, e), this.Id(a.responseText)), this.Da())
			};
			g.prototype.Id = function (a) {
				var b,
				c,
				d,
				l,
				n,
				g,
				v,
				x,
				m;
				x = /href='(remote\/html_server\.php\?xw_controller=hitlist&xw_action=attack[^']+)'/g;
				x.compile(x);
				m = /\t{12}<tr>[\r\n\t]+<td>[\r\n\t]+(.*)<\/td>[\r\n\t]+<td>[\r\n\t]+(.*)<\/td>[\r\n\t]+<td>[\r\n\t]+(.*)<\/td>[\r\n\t]+<td>[\r\n\t]+\$([\d,]+)\t+<\/td>/mg;
				for (m.compile(m); (d = x.exec(a)) && (v = m.exec(a)); )
					c = p(/target_pid=(\d+)/.exec(d[1])[1]), d = d[1], b = ha(v[4]), n = q, this.Ja(v[2]) ? -1 !== k.Y(c) ? n = e : b < this.a.nb ? n = e : (b = k.S(c), -1 !== b && (n = e)) : n = e, (l = /id=([^&]+)&from_red_link=1.+color:red">(.+)<\/span>/.exec(v[2])) ? (b = p(atob(l[1].replace(/%3D/g, "="))), g = l[2]) : g = b = 0, l = (l = /xw_controller=stats.+>(.+)<\/a>/.exec(v[2])) ? l[1] : 0, n || k.ta({
						zd : d,
						url : ua(c),
						e : c,
						G : l,
						va : b,
						Ka : g,
						Ta : 1,
						g : ka(l, "p|" + c, g, b)
					});
				k.m()
			};
			g.prototype.Me = function () {
				if (this.b.j) {
					var a = /"id":"(.+)"/.exec(Ea(this.a.Pa));
					a || (a = /xw_controller=clan&xw_action=view.+&id=([A-Za-z0-9+\/=%]+)/.exec(Ea(this.a.Pa)));
					if (a) {
						18 === this.b.state && this.b.i("Loading Family Page\u2026");
						this.ud = p(atob(a[1].replace(/%3D/g, "=")));
						var b = this;
						C.k(H("xw_controller=clan&xw_action=view&from_red_link=1&id=" + a[1]), D(), function (a, c, d) {
							b.Ne(d)
						})
					} else
						r(m("Problem With Family Link", "Copy the link from a family page"))
				}
			};
			g.prototype.Ne = function (a) {
				if (this.b.p(a)) {
					if (this.b.aa(a, "Load Family")) {
						var b,
						c,
						d,
						l;
						o.ja(a, e);
						var g = a.responseText,
						m = this.ud,
						v,
						x,
						F,
						j,
						s,
						t,
						u,
						w,
						z = 0,
						y = 0,
						C = 0,
						a = [];
						if ((v = /family\.php\?id=%7B%22id%22%3A%22(.+)%22%7D/.exec(g)) && v[1].replace(/%3D/g, "=") == btoa(m)) {
							j = /\t{9}<span>(\d+)<\/span>/g;
							j.compile(j);
							j.exec(g);
							j.exec(g);
							j.exec(g);
							j.exec(g);
							if (x = j.exec(g))
								C = p(x[1]);
							if (v = /<h3>(.+)<\/h3>/.exec(g))
								z = v[1];
							v = g.search(/<div id="motd_message"/);
							-1 !== v && (j = g.slice(v), y = $.trim(ra(j.slice(0, j.search(/<\/p>/)))));
							j = /' member[Ii]d='(\d+)'/g;
							j.compile(j);
							s = /\t{6}<a href="https*:\/\/facebook.mafiawars.zynga.com\/mwfb\/remote\/html_server.php\?xw_controller=stats.+return false; " >(.+)<\/a>/g;
							s.compile(s);
							t = /<td class="member_level">[\r\n\t]+(\d+)/mg;
							t.compile(t);
							u = /<img src="(.*)" class="clan_member_pic">/g;
							u.compile(u);
							w = /<div class="name_n_rank" id="rank_text.+[\r\n\t]+<span>(.*)<\/span>/mg;
							for (w.compile(w); (x = j.exec(g)) && (b = s.exec(g)) && (c = t.exec(g)) && (d = u.exec(g)) && (F = w.exec(g)); ) {
								var B = p(x[1]);
								v = b[1];
								var D = p(c[1]);
								x = {
									e : B,
									G : v,
									Fg : F[1],
									va : m,
									fc : D
								};
								B = {
									id : encodeURIComponent(B),
									name : encodeURIComponent(Xa.pe($("<textarea/>").html(v).val())),
									clan : encodeURIComponent(m),
									level : encodeURIComponent(D)
								};
								if (v = /\d+_(\d+)_\d+/.exec(d[1]))
									v = p(v[1]), x.vd = v, B.fbid = encodeURIComponent(v);
								a.push(x)
							}
							r(A("Family " + m, '<a href="remote/html_server.php?xw_controller=clan&xw_action=view&from_red_link=1&id=' + btoa(m).replace(/\=/g, "%3D") + '" class="mw_new_ajax" selector="#inner_page">' + z + "</a> contains " + C + " members"));
							y && ja(S(y))
						}
						for (l in a)
							a.hasOwnProperty(l) && (b = a[l].e, c = a[l].G, d = q, this.Ja(c) ? -1 !== k.Y(b) ? d = e : -1 !== k.S(b) && (d = e) : d = e, d || k.ta({
									url : ua(b),
									e : b,
									G : c,
									Ta : 1,
									g : ka(c, "p|" + b)
								}));
						k.m()
					}
					this.Da()
				}
			};
			g.prototype.He = function () {
				if (this.b.j) {
					18 === this.b.state && this.b.i("Loading Family Battle Page\u2026");
					var a = this;
					C.k(H("xw_controller=EpicBattle&xw_action=view"), D(), function (b, c, d) {
						a.Ie(d)
					})
				}
			};
			g.prototype.Ie = function (a) {
				if (this.b.p(a)) {
					if (this.b.aa(a, "Load Battle")) {
						var b,
						c,
						d,
						l;
						o.ja(a, e);
						var g = a.responseText;
						l = /<div class="fight_entry">.*[\r\n]+(.+)[\r\n]+(.+)\t{3}<br>[\r\n]+(.+)[\r\n]+(.+)[\r\n]+(.+)[\r\n]+(.+)/mg;
						for (l.compile(l); d = l.exec(g); )
							if (c = /&user=([^"]+).+selector="#inner_page">(.+)<\/a>/.exec(d[2]))
								a = p(atob(c[1].replace(/%3D/g, "=")).substring(2)), c = c[2], b = q, this.a.hb && !/btn_attack_p/.test(d[6]) && (b = e), d = q, b ? d = e : this.Ja(c) ? -1 !== k.Y(a) ? d = e : (b = k.S(a), -1 !== b && (d = e)) : d = e, d || k.ta({
									url : ua(a),
									e : a,
									G : c,
									Ta : 1,
									g : ka(c, "p|" + a)
								});
						k.m()
					}
					this.Da()
				}
			};
			g.prototype.Ye = function () {
				if (this.b.j) {
					var a = /":"(.+)"/.exec(Ea(this.a.$a));
					a || (a = /xw_controller=stats&xw_action=view&user=(p\|\d+)/.exec(Ea(this.a.$a)));
					if (a) {
						18 === this.b.state && this.b.i("Loading Player Profile Page\u2026");
						var b = this;
						C.k(H("xw_controller=stats&xw_action=view&user=" + a[1]), D(), function (a, c, d) {
							b.Ze(d)
						})
					} else
						r(m("Problem With Profile Link", "Copy the link from a player profile page"))
				}
			};
			g.prototype.Ze = function (a) {
				if (this.b.p(a)) {
					if (this.b.aa(a, "Load Player Profile")) {
						var b,
						c,
						d,
						l,
						g;
						o.ja(a, e);
						b = a.responseText;
						a = /<div class="stats_title_text">.*[\r\n]+[^"]+"(.+)" level/m.exec(b);
						b = /stats&xw_action=view.+&user=p\|(\d+)/.exec(b);
						a && b && (b = p(b[1]), c = q, -1 != k.S(b) ? c = e : this.Ja(a[1]) ? -1 !== k.Y(b) && (c = e) : c = e, (g = /id=([^&]+)&from_red_link=1.+color:red">([^<]+)<\/span> <\/a> (.+)$/.exec(a[1])) ? (d = p(atob(g[1].replace(/%3D/g, "="))), l = g[2], a = g[3]) : (l = d = 0, a = a[1]), c || k.ta({
								url : ua(b),
								e : b,
								G : a,
								va : d,
								Ka : l,
								Ta : 1,
								g : ka(a, "p|" + b, l, d)
							}));
						k.m()
					}
					this.Da()
				}
			};
			this.vc = this.Vb = 0;
			this.X = [];
			g.prototype.Le = function () {
				if (this.b.j) {
					this.vc = this.Vb = 0;
					this.X = [];
					var a,
					b = /bucket=([0-9a-zA-Z]+)/g;
					for (b.compile(b); a = b.exec(this.a.ub); )
						18 === this.b.state && this.b.i('Loading <a href="http://mwlists.com" target="_blank">mwlists.com</a> Buckets\u2026'), this.Je(a[1]);
					0 === this.Vb && r(m("Problem With Bucket Links", 'Copy the full links from <a href="http://mwlists.com" target="_blank">mwlists.com</a>'))
				}
			};
			g.prototype.Je = function (a) {
				if (this.b.j) {
					this.Vb++;
					var b = this;
					$.getJSON("http://mwlists.com/BookMarklets/getlive_unlockedmw.php?&callback=?", {
						bucket : a
					}, function (a) {
						b.Ke(a)
					})
				}
			};
			g.prototype.Ke = function (a) {
				if (this.b.j) {
					var b;
					if (a)
						for (b in a)
							a.hasOwnProperty(b) && this.X.push({
								e : ha(a[b].mwid),
								G : a[b].mwname
							});
					this.vc++;
					if (this.vc >= this.Vb) {
						if (this.X.length) {
							r("Found " + this.X.length + " Opponents");
							if (this.a.tb) {
								for (var a = this.X, c = a.length; c; )
									a.push(a.splice(p(Math.random() * c), 1)[0]), c--;
								r("Randomized " + this.X.length + " Opponents")
							}
							for (b in this.X)
								if (this.X.hasOwnProperty(b)) {
									var a = this.X[b].e,
									c = this.X[b].G,
									d = q;
									-1 != k.S(a) ? d = e : -1 !== k.Y(a) && (d = e);
									d || k.ta({
										url : ua(a),
										e : a,
										G : c,
										Ta : 501,
										g : ka(c, "p|" + a)
									})
								}
						}
						k.m();
						this.Da()
					}
				}
			};
			g.prototype.Dd = function () {
				if (!this.pb && (this.Hc + 10 <= Math.floor((new Date).getTime() / 1E3) || 18 === this.b.state))
					this.Hc = Math.floor((new Date).getTime() / 1E3), this.pb = e, ja(A("Load Opponents")), 0 === this.a.c ? this.Pe() : 6 === this.a.c ? this.Ve() : 1 === this.a.c ? this.Re() : 2 === this.a.c ? this.Me() : 3 === this.a.c ? this.He() : 4 === this.a.c ? this.Ye() : 5 === this.a.c && this.Le()
			};
			g.prototype.Da = function () {
				this.pb && (this.pb = q, 18 === this.b.state ? (ja(A("Load Opponents Done", S("Process State Called"))), this.b.state = this.b.h, this.f()) : ja(A("Load Opponents Done", S("Process State Skipped"))))
			};
			g.prototype.Ub = function (a) {
				var b = this,
				c,
				l = d[a].yd;
				c = l ? decodeURIComponent(xa + "/" + d[a].zd) : decodeURIComponent(xa + "/" + d[a].url.replace(/&use_boost=1/, "")) + "&use_boost=0";
				var g = -1 != c.search("view_style=json") ? e : q;
				this.ka++;
				d[a].ka++;
				d[a].Ec && (d[a].cc = e);
				C.k(c, D(), function (c, d, v) {
					b.be(v, a, g, l)
				})
			};
			g.prototype.ze = function () {
				this.b.j && this.wd()
			};
			g.prototype.Ce = function () {
				var a,
				b,
				c,
				l;
				for (a = 0; a < k.Fa; a++)
					if (b = (a + k.Lc) % k.Fa, d[b].e && !d[b].W && d[b].da) {
						l = q;
						for (c = 0; c < k.ca; c++)
							if (k.z[c] === b) {
								l = e;
								break
							}
						if (l)
							r(m("Find Opponent", "Opponent is already active"));
						else
							return k.Lc = (b + 1) % k.Fa, b
					}
				t(m("Find Opponent", "Unable to find new opponent"));
				return -1
			};
			g.prototype.De = function () {
				var a,
				b;
				for (a = 0; a < k.ca; a++)
					if (b = (a + k.Rb) % k.ca, -1 !== k.z[b] && !d[k.z[b]].D && !d[k.z[b]].cc)
						return k.Rb = (b + 1) % k.ca, k.z[b];
				t(m("Get Opponent", "Unable to get opponent"));
				return -1
			};
			g.prototype.sg = function () {
				var a;
				if (k.I.length)
					for (a in k.I)
						if (k.I.hasOwnProperty(a)) {
							a = k.I[a];
							1 === k.I.length ? this.b.i(k.C + " Opponents - Attacking " + d[a].g + "\u2026") : 2 === k.I.length ? this.b.i(k.C + " Opponents - Attacking " + d[a].g + " and 1 other\u2026") : this.b.i(k.C + " Opponents - Attacking " + d[a].g + " and " + (k.I.length - 1) + " others\u2026");
							break
						}
			};
			g.prototype.zc = function (a) {
				k.kg(a);
				-1 !== k.Y(d[a].e) ? (k.Wb(a), k.C--, k.m()) : 3 === this.a.c || 2 === this.a.c ? (d[a].D = q, d[a].W = q, d[a].dc = q, k.sa(a)) : 4 === this.a.c ? (d[a].D = q, d[a].W = q, d[a].dc = q, k.sa(a), this.Za = e) : (k.Wb(a), k.C--, k.m())
			};
			g.prototype.wd = function () {
				var a,
				b;
				if (this.b.j && !this.Za) {
					for (b = 0; b < k.ca; b++)
						 - 1 !== k.z[b] && (a = k.z[b], d[a].D && d[a].Zb === d[a].ka && this.zc(a));
					for (; k.Ia < this.a.ha; )
						if (b = this.Ce(), -1 !== b)
							k.Xd(b);
						else
							break;
					if (!this.Fd() && !this.hc())
						for (; this.ka - this.cb < Math.min(this.a.Ua, 5); )
							if (b = this.De(), -1 !== b)
								this.Ub(b);
							else
								break;
					this.sg()
				}
			};
			g.prototype.fg = function (a, b, c) {
				if (!a)
					return 4 === this.a.c || 1 === this.a.c || 6 === this.a.c || 2 === this.a.c || 3 === this.a.c || 5 === this.a.c ? e : d[b].Oc ? e : q;
				if (a.socialMessageCards)
					for (var l in a.socialMessageCards)
						if (a.socialMessageCards.hasOwnProperty(l)) {
							var g = /item_id="(\d+)"/.exec(a.socialMessageCards[l]);
							g && ga.Tb(p(g[1]))
						}
				l = a.isWin ? A("Won") : m("Lost");
				l += " " + d[b].g + ' <span class="health">-' + a.defender.damage_dealt + "</span> " + S("(" + a.defender.current_health_pct + "% remaining)") + " ";
				d[b].Aa = a.defender.current_health_pct;
				d[b].Cd = a.defender.damage_dealt;
				l += '<span class="experience">' + a.experience + "</span> ";
				var n,
				j,
				v,
				x,
				F;
				a.ice_was_just_stolen && (j = a.thief_name.replace(/<span style="color:red">.+<\/span> /, ""), n = p(a.thief_id.substring(2)), (x = /id=([^&]+)&from_red_link=1.+color:red">([^<]+)<\/span> <\/a> (.+)$/.exec(a.thief_profile)) ? (v = p(atob(x[1].replace(/%3D/g, "="))), x = x[2]) : x = v = 0, F = ka(j, "p|" + n, x, v));
				a.you_just_killed ? l += "You Killed! " + S("(" + u(a.total_ice_count) + ")") : a.you_just_iced ? l += "You Iced! " + S("(" + u(a.total_ice_count) + ")") : a.ice_was_just_stolen ? l += "Ice Stolen! " + F : a.defender.iced_self ? l += "Iced Themself" : a.defender.is_iced && (l += "Already Iced");
				if (a.defender.you_iced || a.defender.is_iced)
					d[b].dc = e;
				if (a.attacker.boost_used_tag || a.defender.boost_used_tag)
					d[b].la = 0, d[b].jd = 0, d[b].hd = 0;
				a.isWin ? (this.r.oa += c ? 5 * this.a.R : 1, d[b].oa += c ? 5 * this.a.R : 1) : (this.r.na += c ? 5 * this.a.R : 1, d[b].na += c ? 5 * this.a.R : 1);
				d[b].xd += c ? 5 * this.a.R : 1;
				this.r.Yb += a.defender.damage_dealt;
				this.r.yc += a.attacker.damage_dealt;
				this.V();
				r(l);
				a.isWin || this.a.Xa && -1 === k.Y(d[b].e) && k.Sb({
					e : d[b].e,
					g : d[b].g,
					ma : "Lost"
				});
				a.feed_js && (l = /description:'(.+)', userMessage/.exec(a.feed_js), a.you_just_killed ? (this.r.Bd++, c = "killed") : (this.r.Ad++, c = "iced"), l && X.log('<a href="#0" class="' + c + '" onclick="' + a.feed_js + '">' + l[1].replace(/ (Need to whack|Think you can|Need help icing|Test your mettle|Get a free fight boost to ice opposing) [^\.]+\./g, "").replace(/\\\'/g, "'") + "</a>"), this.V());
				a.ice_was_just_stolen && (X.af(o.wc.name + " attacked " + d[b].g + ", but the ice was stolen by " + F + "."), this.a.db && (b = q, -1 != k.S(n) ? b = e : this.Ja(F) ? -1 !== k.Y(n) && (b = e) : b = e, b || (k.ta({
								url : ua(n),
								e : n,
								G : j,
								va : v,
								Ka : x,
								Ta : 1,
								g : F
							}), k.m())));
				return !a.isWin && this.a.Xa || a.defender.is_iced || a.defender.you_iced || a.defender.current_health_pct > this.a.Jb && this.a.Ib ? q : e
			};
			g.prototype.be = function (a, b, c, l) {
				if (this.b.p(a)) {
					if (200 == a.status) {
						var g = e,
						n,
						j;
						this.cb++;
						d[b].Zb++;
						d[b].Ec = q;
						d[b].cc = q;
						var v = d[b].Zb === d[b].ka ? e : q;
						if (l) {
							if (/This player is currently part of your mafia/.test(a.responseText))
								r(d[b].g + " is in your mafia"), k.Sb({
									e : d[b].e,
									g : d[b].g,
									ma : "In Mafia"
								});
							else {
								(n = /You <strong>(WON|LOST)<\/strong> the fight, taking <strong>(\d+) damage<\/strong> and dealing <strong> (\d+) damage<\/strong> to your enemy\. {2}You gained (.+) and (.+) experience/.exec(a.responseText)) && ("WON" == n[1] ? r(A("Hitlist Won", d[b].g + ' <span class="health">' + n[3] + "</span> " + n[4] + ' <span class="experience">' + n[5] + "</span>")) : r(m("Hitlist Lost", d[b].g + ' <span class="health">' + n[3] + "</span> " + n[4] + ' <span class="experience">' + n[5] + "</span>")));
								if (n = /(You knocked out .+ and earned [^!]+!)/.exec(a.responseText))
									r(n[1]), X.$e(n[1]);
								(n = /(Sorry, someone else took out .+ before you got the chance!)/.exec(a.responseText)) && r(n[1])
							}
							q || (d[b].D = e);
							d[b].da || (d[b].D = e);
							v && d[b].D && this.zc(b);
							k.C <= this.a.ha && this.Id(a.responseText)
						} else {
							l = h;
							if (c)
								try {
									n = JSON.parse(a.responseText),
									o.Pb(n),
									l = n.fight_result
								} catch (x) {
									t(m("Problem Parsing JSON Fight", x))
								}
							else if (o.ja(a, q), /This player is currently part of your mafia/.test(a.responseText))
								r(d[b].g + " is in your mafia"), k.Sb({
									e : d[b].e,
									g : d[b].g,
									ma : "In Mafia"
								}), g = q;
							else {
								l = Da(a.responseText, "msg.fight_result = ", ";FightV2.attack");
								if (n = /(<a href=.+)[\r\n]+\t+<div>Level (\d+) ([^<]*).+[\r\n]+.+[\r\n]+.+"defense (good|bad)".+[\r\n]+.+<span class="group_defense (good|bad)[^>]+>([^<]+)</m.exec(a.responseText)) {
									d[b].fc = ha(n[2]);
									n[3] && n[3].length && (d[b].Ed = n[3]);
									d[b].kd = "good" == n[4] ? e : q;
									d[b].le = "good" == n[5] ? e : q;
									d[b].la = ha(n[6]);
									d[b].kd ? d[b].jd = U.Fb : d[b].hd = U.Fb;
									if (j = /id=([^&]+)&from_red_link=1.+color:red">([^<]+)<\/span>/.exec(n[1]))
										d[b].va = p(atob(j[1].replace(/%3D/g, "="))), d[b].Ka = j[2];
									if ((j = /&user=([^"]+).+selector="#inner_page">(.+)<\/a>/.exec(n[1])) && (!d[b].G || !/\.\.\./.test(j[2])))
										d[b].G = j[2];
									if (j = /<div id="defender_pic" .+[\r\n\t]+<img src=".+\d+_(\d+)_\d+/.exec(a.responseText))
										d[b].vd = p(j[1]);
									d[b].g = ka(d[b].G, "p|" + d[b].e, d[b].Ka, d[b].va)
								} else
									t(m("Unable to find defense/level", d[b].g));
								if (!d[b].Oc && (n = /'(remote\/html_server\.php\?xw_controller=fight&xw_action=power_js_attack[^']+)'/g.exec(a.responseText)))
									d[b].url = n[1].replace(/click_amt=1/, "click_amt=" + (100 + this.a.R)), d[b].Oc = e;
								if (n = za(a.responseText, /<div id="defender_fight_status">.*<\/div>/, /^\t\t<\/div>/m))
									if (j = /(\/graphics\/fight\/badges\/[^"]+)/.exec(n))
										d[b].dd = j[1].replace(/huge_/g, "");
								if (n = /<div id="defender_hp" class="[^"]+" style="width: (\d+)px;">/.exec(a.responseText))
									d[b].Aa = p(100 * p(n[1]) / 215)
							}
							g && !d[b].D && (g = this.fg(l, b, c));
							k.sa(b);
							g || (d[b].dc && 1 === this.a.c ? d[b].yd = e : d[b].D = e);
							d[b].da || (d[b].D = e);
							!d[b].D && (this.a.Gb && this.a.Hb <= d[b].oa + d[b].na) && (d[b].D = e, r("Skipping " + d[b].g + " after " + u(d[b].oa + d[b].na) + " attacks"));
							v && d[b].D && this.zc(b);
							k.C <= this.a.ha && (0 === this.a.c && !c ? this.Hd(a.responseText) : 6 === this.a.c && !c && this.Jd(a.responseText), k.C <= this.a.ha && this.Dd())
						}
					} else
						this.cb++, d[b].Zb++, t(m("Problem Fighting Opponent", a.status));
					this.wd();
					this.cb >= this.ka && (this.b.state = 2, this.f())
				}
			};
			g.prototype.ge = function () {
				return !this.a.Mb ? q : 0 < j.Nc ? (r(m("Power Pack Not Available", "Available in " + p(j.Nc / 3600) + ":" + p(j.Nc / 60 % 60))), q) : 0 >= j.ig ? (r(m("Power Pack Not Available", "You don't have any Power Packs")), q) : e
			};
			g.prototype.ug = function () {
				if (this.b.j) {
					this.b.i("Using Power Pack\u2026");
					var a = this;
					C.k(H("xw_controller=module&xw_action=usePowerPack&responseType=hospital&packType=0"), D(), function (b, c, d) {
						a.vg(d)
					})
				}
			};
			g.prototype.vg = function (a) {
				this.b.p(a) && (200 != a.status && t(m("Use Power Pack", a.status)), this.b.state = K, this.f())
			};
			g.prototype.fe = function () {
				return !this.a.Kb ? q : j.Vd < j.Od ? (r(m("Stamina Refill", "You don't have enough reward points (have " + j.Vd + " need " + j.Od + ")")), q) : e
			};
			g.prototype.de = function () {
				if (this.b.j) {
					this.b.i("Buying Stamina Refill\u2026");
					var a = this;
					C.k(H("xw_controller=marketplace&xw_action=impulseBuy&favor_type=1&favor_id=2&page=impulse_buy_fight"), D(), function (b, c, d) {
						a.ee(d)
					})
				}
			};
			g.prototype.ee = function (a) {
				this.b.p(a) && (200 != a.status && t(m("Buy Stamina Refill", a.status)), this.b.state = K, this.f())
			};
			g.prototype.Dc = function (a) {
				if (this.b.j) {
					this.Qa = e;
					20 === this.b.state && this.b.i("Healing\u2026");
					var b = this;
					C.k(H("xw_controller=hospital&xw_action=heal" + (a ? "&xcity=" + a : ""), a), D(), function (a, c, d) {
						b.Ee(d)
					})
				}
			};
			g.prototype.Ee = function (a) {
				if (this.b.p(a)) {
					if (this.b.aa(a, "Heal"))
						try {
							var b = JSON.parse(a.responseText);
							o.Pb(b);
							var c = Math.max(b.waitHealTimer, 0);
							b.hospital_message && r(b.hospital_message + " " + S("Heal available in " + Z(c) + "."));
							c && (this.ea = p(c));
							this.fa || this.Zc()
						} catch (d) {
							t(m("Heal", d))
						}
					this.Qa = q;
					20 === this.b.state ? this.f() : ja("State is " + this.b.state)
				}
			};
			g.prototype.Zc = function () {
				if (this.b.j) {
					var a = this;
					0 < this.ea ? ($("#" + this.id + "_next_heal").html("(Ready in " + Z(this.ea) + ")"), $("#" + o.id + "_stats_heal").html("(Heal ready in " + Z(this.ea) + ")"), 20 === this.b.state && this.b.i("Healing in " + Z(this.ea) + "\u2026")) : ($("#" + this.id + "_next_heal").html("(Ready)"), $("#" + o.id + "_stats_heal").html("(Heal ready)"));
					if (0 < this.ea)
						setTimeout(function () {
							a.fa = q;
							a.ea--;
							a.Zc()
						}, 1E3), this.fa = e;
					else if (this.a.ya || this.hc())
						j.ab < j.ad && !this.Qa ? (this.Dc(this.a.za), this.fa = q) : (setTimeout(function () {
								a.fa = q;
								a.ea--;
								a.Zc()
							}, 1E3), this.fa = e)
				} else
					$("#" + this.id + "_next_heal").html(""), $("#" + o.id + "_stats_heal").html("")
			};
			g.prototype.hc = function () {
				return this.a.Ra && j.ab < this.a.Sa || 20 > j.ab
			};
			g.prototype.Fd = function () {
				return this.a.qa && j.ba < this.a.Lb || 5 > j.ba
			};
			g.prototype.f = function () {
				if (this.b.state === K)
					this.b.h = 2, this.b.qc();
				else if (2 === this.b.state)
					this.Yc(), this.a.ya && (!this.fa && !this.Qa) && this.Dc(this.a.za), this.hc() ? (this.a.Ra || this.a.ya ? (r(m("Need more Health")), this.b.state = 20) : (r(m('Waiting for <span class="health">20</span> Health')), this.b.state = 25, this.b.Q = 19 > j.ab ? 30 : 10, this.b.h = K), this.b.f()) : this.Fd() ? (r(m("Need More Stamina")), !this.a.qa && this.ge() ? this.ug() : !this.a.qa && this.fe() ? this.de() : (this.a.qa ? this.b.state = fa : (r(m("Waiting For More Stamina")), this.b.state = 25, this.b.Q = 30, this.b.h = K), this.b.f())) : 0 !== this.a.xa && this.a.xa != j.wa ? (this.b.h = 2, this.b.pc(this.a.xa, q)) : 0 >= k.C ? (r(m("Need more Opponents")), this.b.state = 18, this.b.f()) : this.Za && this.a.Ha ? (r("Pausing " + Z(this.a.Ha)), this.Za = q, this.b.state = 25, this.b.Q = this.a.Ha, this.b.h = K, this.b.f()) : (this.Za = q, this.b.state = 19, this.f());
				else if (18 === this.b.state)
					this.b.h = 2, this.Dd();
				else if (19 === this.b.state)
					this.b.h = 2, this.ze();
				else if (20 === this.b.state)
					this.hc() ? !this.fa && !this.Qa && this.Dc(this.a.za) : (this.b.state = 2, this.b.f());
				else if (25 === this.b.state) {
					this.b.state = this.b.h;
					var a = this;
					this.b.Mc(this.b.Q, function () {
						a.f()
					})
				} else
					this.b.state === fa && this.P()
			};
			var b = this;
			this.b.f = function () {
				b.f()
			};
			this.s();
			this.M();
			ta.a.fb && this.b.rc(function () {
				b.O()
			})
		}
		function J(c, d) {
			this.id = d;
			this.H = c;
			this.b = new G(c, d);
			var b = [],
			a = [],
			f = [],
			g = 0,
			k = 0,
			s = 0,
			n = 0;
			this.w = [];
			this.ra = e;
			this.t = h;
			this.Oa = this.lc = this.Tc = this.Vc = this.Uc = this.Sc = this.Nb = 0;
			this.Ea = [];
			this.a = h;
			J.prototype.O = function () {
				s = q;
				n = 0;
				this.b.O();
				return q
			};
			J.prototype.P = function () {
				this.b.P();
				return q
			};
			J.prototype.jf = function (a) {
				this.a.ua = p($(a).val());
				this.d();
				return e
			};
			J.prototype.If = function (a) {
				this.a.sb = p($(a).val());
				this.d();
				return e
			};
			J.prototype.L = function () {
				this.a = {
					ua : 1,
					sb : 5
				}
			};
			J.prototype.d = function () {
				var a = {};
				a.city = this.a.ua;
				a.max_properties = this.a.sb;
				ma(this.id, a)
			};
			J.prototype.M = function () {
				this.L();
				try {
					var a = {},
					b = na(this.id);
					a.ua = b.city;
					a.sb = b.max_properties;
					N(this.a, a)
				} catch (c) {}
				
				B("#" + this.id + "_rob_city", this.a.ua);
				B("#" + this.id + "_max_properties", this.a.sb)
			};
			J.prototype.xb = function () {
				this.V()
			};
			J.prototype.s = function () {
				var a = this;
				Y(this, '<div class="tabframe">' + sa("Options", "options") + 'Rob properties in <select id="%ID%_rob_city"><option value="0">Active City</option><option value="1">New York</option><option value="2" disabled>Cuba</option><option value="3" disabled>Moscow</option><option value="4" disabled>Bangkok</option><option value="5">Las Vegas</option><option value="6" disabled>Italy</option><option value="7">Brazil</option><option value="8">Chicago</option><option value="9">London</option></select><br/>Rob up to <input type="text" style="width:20px;" id="%ID%_max_properties"/> properties at once<br/></div></div><div class="module_seperator"></div>' + sa("Stats", "stats") + '</div></div><div class="module_seperator"></div><div style="padding:10px;"><span id="%ID%_start_row" style="display:none; vertical-align:text-bottom;"><a class="sexy_button_new short orange" id="%ID%_start"><span><span>Start</span></span></a></span><span id="%ID%_stop_row" style="display:none; vertical-align:text-bottom;"><a class="sexy_button_new short red" id="%ID%_stop"><span><span>Stop</span></span></a></span><span id="%ID%_cancel_row" style="display:none; vertical-align:text-bottom;"><a class="sexy_button_new short green" id="%ID%_cancel"><span><span>Cancel</span></span></a></span>&nbsp;&nbsp;&nbsp;<span id="%ID%_status_log" style="vertical-align:text-bottom;"></span></div></div>', V + W, function () {
					a.xb()
				});
				$("#" + this.id + "_options_toggle").click(function () {
					ba(a.id + "_options", a.id + "_options_toggle");
					return q
				});
				$("#" + this.id + "_stats_toggle").click(function () {
					a.ra = ba(a.id + "_stats", a.id + "_stats_toggle");
					a.V();
					return q
				});
				$("#" + this.id + "_start").click(function () {
					return a.O()
				});
				$("#" + this.id + "_stop").click(function () {
					return a.P()
				});
				$("#" + this.id + "_cancel").click(function () {
					return a.b.Ic()
				});
				$("#" + this.id + "_rob_city").change(function () {
					return a.jf(this)
				});
				$("#" + this.id + "_max_properties").change(function () {
					return a.If(this)
				});
				this.b.Eb()
			};
			J.prototype.V = function () {
				if (L() && (this.o && this.ra) && (this.t || (this.t = $("#" + this.id + "_stats")), this.t && this.Nb)) {
					var a,
					b;
					a = "" + ('<span class="stamina">' + this.lc + '</span> <span class="experience">' + this.Oa + '</span> <span class="more_in">(' + parseFloat(this.Oa / this.lc).toFixed(2) + "/sta)</span><br/>");
					for (b in this.Ea)
						this.Ea.hasOwnProperty(b) && 0 < this.Ea[b] && (a += '<span class="cash">' + b + u(this.Ea[b]) + "</span><br/>");
					a += 'Robberies <span class="good">' + this.Nb + '</span> Won <span class="good">' + this.Vc + '</span> <span class="more_in">(' + p(100 * this.Vc / this.Nb) + '%)</span> Lost <span class="bad">' + this.Uc + '</span> <span class="more_in">(' + p(100 * this.Uc / this.Nb) + "%)</span><br/>";
					a += 'Boards <span class="good">' + this.Sc + "</span> Perfect " + this.Tc + ' <span class="more_in">(' + p(100 * this.Tc / this.Sc) + "%)</span><br/>";
					for (b in this.w)
						this.w.hasOwnProperty(b) && (a += '<span class="stamina">' + this.w[b].Rc + "</span> " + this.w[b].name + '&nbsp;<span class="good">Won ' + this.w[b].bc + '</span> <span class="experience">' + this.w[b].Ac + '</span> <span class="more_in">(' + parseFloat(this.w[b].Ac / this.w[b].Rc).toFixed(2) + '/sta)</span> <span class="bad">Lost ' + this.w[b].sc + '</span> <span class="experience">' + this.w[b].tc + '</span> <span class="more_in">(' + parseFloat(this.w[b].tc / this.w[b].Rc).toFixed(2) + '/sta)</span> <span class="more_in">(' + p(100 * this.w[b].bc / p(this.w[b].bc + this.w[b].sc)) + "% won)</span><br/>");
					this.t.html(a);
					X.Ga()
				}
			};
			J.prototype.gg = function (b, c, d) {
				var l = q,
				g = q,
				k = q,
				j = 0,
				o = 0,
				o = 0;
				if (b) {
					o = this.w[f[d]];
					if (o === h || o === aa)
						this.w[f[d]] = {
							bc : 0,
							sc : 0,
							name : f[d],
							Rc : a[d],
							Ac : 0,
							tc : 0
						},
					o = this.w[f[d]];
					/rob_res_success/.test(b) ? (this.Vc++, o.bc++, k = g = e) : /rob_res_fail/.test(b) && (this.Uc++, o.sc++, g = q, k = e);
					if (k) {
						if (j = /(\d+) Experience/.exec(b))
							j = p(j[1].replace(/[^0-9]/g, "")), this.Oa += j, g ? o.Ac = j : o.tc = j;
						if (j = /($|C$|R$|B$|V$|L$|BRL$|\u00a2|\u00a3)([\d,]+)/.exec(b))
							g = /($|C$|R$|B$|V$|L$|BRL$|\u00a2|\u00a3)/.exec(j[1]), o = ha(j[2]), this.Ea[g[1]] = this.Ea[g[1]] ? this.Ea[g[1]] + o : o;
						(j = /item_id="(\d+)"/.exec(b)) ? ga.Tb(p(j[1])) : (j = /rob_res_expanded_details_item">(\d+) ([^<]+)</.exec(b)) ? ga.bd(j[2], p(j[1])) : (j = /(\/mwfb\/graphics\/collections\/[^"]+)/.exec(b)) && ga.cd(j[1].substring(j[1].lastIndexOf("/") + 1))
					}
				}
				c && ((j = /(\d+) Bonus Experience/.exec(c)) ? (this.Sc++, o = j[1].replace(/[^0-9]/g, ""), this.Oa += p(o), s = e, n = 0, /Your record on this board was 9-0/.test(c) && this.Tc++, (j = /item_id="(\d+)"/.exec(c)) ? ga.Tb(p(j[1])) : (j = /rob_res_expanded_details_item">(\d+) ([^<]+)</.exec(c)) ? ga.bd(j[2], p(j[1])) : (j = /(\/mwfb\/graphics\/collections\/[^"]+)/.exec(c)) && ga.cd(j[1].substring(j[1].lastIndexOf("/") + 1))) : /do not have enough stamina to rob/.test(c) && (l = e));
				k ? (this.Nb++, this.lc += p(a[d]), c && this.V()) : l ? r(m("Problem Robbing " + f[d], "Out of stamina")) : t(m("Problem Robbing " + f[d], "Error robbing property"))
			};
			J.prototype.Pc = function (a) {
				if (this.b.j) {
					var c = this;
					C.k(decodeURIComponent(xa + "/" + b[a]), D(), function (b, d, f) {
						c.jg(f, a)
					})
				}
			};
			J.prototype.jg = function (a, c) {
				if (this.b.p(a))
					if (200 == a.status) {
						var d = h;
						try {
							d = JSON.parse(a.responseText)
						} catch (l) {
							t(m("Problem Robbing " + f[c], l))
						}
						d && this.gg(d.slot, d.popup, c);
						k++;
						k >= b.length ? (d && o.Pb(d), this.b.state = this.b.h, this.f()) : g < b.length && (this.Pc(g), g++)
					} else
						t(m("Problem Robbing " + f[c], a.status)), this.Pc(c)
			};
			J.prototype.Xe = function () {
				if (this.b.j) {
					this.b.i("Loading Robbing Page\u2026");
					var a = this;
					C.k(H("xw_controller=robbing&xw_action=view"), D(), function (b, c, d) {
						a.Ld(d)
					})
				}
			};
			J.prototype.Kd = function () {
				if (this.b.j) {
					this.b.i("Refreshing Robbing Page\u2026");
					var a = this;
					C.k(H("xw_controller=robbing&xw_action=refresh"), D(), function (b, c, d) {
						a.Ld(d)
					})
				}
			};
			J.prototype.Ld = function (c) {
				if (this.b.p(c)) {
					k = g = 0;
					s = q;
					n = 0;
					b = [];
					f = [];
					a = [];
					if (200 == c.status)
						if (o.ja(c, e), c = /(<div class="rob_slot".*)/.exec(c.responseText)) {
							var d = document.createElement("div");
							d.innerHTML = c[1];
							var l = d.getElementsByClassName("rob_slot");
							if (l.length) {
								for (c = d = 0; c < l.length; c++) {
									var u = l[c].getElementsByClassName("sexy_button_new short red");
									if (u.length) {
										b[d] = u[0].href.substring(u[0].href.indexOf("remote/html_server.php"));
										a[d] = p(l[c].getElementsByClassName("rob_prop_stamina")[0].innerHTML);
										try {
											f[d] = l[c].getElementsByClassName("rob_prop_name_short")[0].innerHTML
										} catch (w) {
											f[d] = l[c].getElementsByClassName("rob_prop_name")[0].innerHTML
										}
										f[d] = f[d].replace(/(<([^>]+)>)/ig, "");
										d++
									}
								}
								d = 0;
								for (l = e; l; ) {
									l = q;
									d++;
									for (c = 0; c < b.length - d; c++)
										a[c] > a[c + 1] && (l = a[c], a[c] = a[c + 1], a[c + 1] = l, l = f[c], f[c] = f[c + 1], f[c + 1] = l, l = b[c], b[c] = b[c + 1], b[c + 1] = l, l = e)
								}
							}
						} else
							r(m("Problem Finding Properties"));
					else
						t(m("Problem Loading Properties", c.status));
					if (b.length) {
						n = a[0];
						d = j.ba;
						for (c = 0; c < b.length; c++)
							d -= a[c], 0 > d && (b.length = c, a.length = c, f.length = c);
						if (b.length) {
							this.b.i("Robbing " + b.length + " Properties\u2026");
							for (c = 0; c < this.a.sb; c++)
								g < b.length && (this.Pc(g), g++)
						} else
							r(m("Not enough stamina to rob next property", "Have " + j.ba + " need " + n)), this.b.state = K, this.f()
					} else
						this.Kd()
				}
			};
			J.prototype.f = function () {
				if (this.b.state === K)
					this.b.h = 2, this.b.qc();
				else if (2 === this.b.state)
					j.ba >= n ? this.b.state = 9 : (r("Need more Stamina"), this.b.state = 25, this.b.Q = 30, this.b.h = K), this.b.f();
				else if (9 === this.b.state)
					this.b.h = 10, s = q, n = 0, this.b.pc(this.a.ua, q);
				else if (10 === this.b.state)
					this.b.h = 11, s ? (s = q, n = 0, this.Kd()) : this.Xe();
				else if (11 === this.b.state)
					this.b.state = this.b.fd() ? K : 0 != this.a.ua && this.a.ua != j.wa ? 9 : 10, this.b.f();
				else if (25 === this.b.state) {
					this.b.state = this.b.h;
					var a = this;
					this.b.Mc(this.b.Q, function () {
						a.b.f()
					})
				} else
					this.b.state === fa && this.P()
			};
			var w = this;
			this.b.f = function () {
				w.f()
			};
			this.s();
			this.M();
			ta.a.gb && this.b.rc(function () {
				w.O()
			})
		}
		function Wa(c) {
			Ca.ajax({
				url : la + "/api/log.php",
				dataType : "jsonp",
				data : {
					message : c
				}
			}, function () {})
		}
		function ua(c) {
			return "remote/html_server.php?xw_controller=fight&xw_action=attack_pop&view_style=html&opponent_id=p|" + c + "&origin=fight_page&clkdiv=btn_attack_p" + c + "&tab=0&use_boost=0"
		}
		function ka(c, d, b, a) {
			var f = "";
			0 < a ? (b && !k.Xc[a] && k.$d(a, b), f += '<a href="remote/html_server.php?xw_controller=clan&xw_action=view&from_red_link=1&id=' + btoa(a).replace(/\=/g, "%3D") + '" class="mw_new_ajax" selector="#inner_page"><span style="color:red;">' + (b ? b : a) + "</span></a> ") : b && (f += b + " ");
			d ? f += '<a href="remote/html_server.php?xw_controller=stats&xw_action=view&user=' + d + '&ref=fight_list" class="mw_new_ajax" selector="#inner_page"><span>' + (c ? c : d) + "</span></a>" : c && (f += c);
			return f
		}
		var V,
		W,
		Qa,
		K,
		fa;
		function sa(c, d) {
			return '<div style="padding:10px;"><div class="module_subtitle"><span id="%ID%_' + d + '_toggle" class="tab_subtitle">' + c + '</span></div><div id="%ID%_' + d + '">'
		}
		function T(c, d, b) {
			return '<fieldset id="%ID%_' + d + '"><legend>' + c + "</legend>" + b + "</fieldset>"
		}
		function da(c, d) {
			return '<input type="checkbox" id="%ID%_' + d + '"/> <label for="%ID%_' + d + '" id="%ID%_' + d + '_label">' + c + "</label>"
		}
		function I(c, d) {
			return da(c, d) + "<br/>"
		}
		function Z(c) {
			return 3600 <= c ? (c = Math.floor(c / 3600), c + " hour" + (1 == c ? "" : "s")) : 60 <= c ? (c = Math.floor(c / 60), c + " minute" + (1 == c ? "" : "s")) : c + " second" + (1 == c ? "" : "s")
		}
		function A(c, d) {
			return '<span class="good">' + c + "</span>" + (d ? " " + d : "")
		}
		function m(c, d) {
			return '<span class="bad">' + c + "</span>" + (d ? " " + d : "")
		}
		function S(c) {
			return '<span class="more_in">' + c + "</span>"
		}
		function O(c, d, b, a) {
			return '<a href="#0" ' + (a ? 'id="%ID%_' + a + '" ' : "") + (b ? 'data-id="' + b + '" ' : "") + 'class="' + (d ? d : "") + ' sexy_button_new shorter black narrow_sexy_button"><span><span>' + c + "</span></span></a>"
		}
		function Fa(c) {
			return {
				ab : c.user_health,
				ad : c.user_max_health,
				$c : c.user_energy,
				xg : c.user_max_energy,
				ba : c.user_stamina,
				yg : c.user_max_stamina,
				Kg : c.user_skill,
				Vd : c.user_favor,
				Qb : c.user_level,
				wa : c.current_city_id,
				ac : c.exp_to_next_level,
				ig : c.powerPackCount,
				Nc : c.powerPackStaminaUse,
				Od : c.staminaRefillCost
			}
		}
		function Ma(c) {
			return {
				Fb : ha(c.skill_atk),
				Qc : ha(c.skill_def),
				Bc : ha(c.group_atk),
				Cc : ha(c.group_def)
			}
		}
		function Na(c) {
			return {
				name : c.name,
				Dg : c.group_size
			}
		}
		function p(c) {
			return parseInt(c, 10)
		}
		function ra(c) {
			return c.replace(/<\/?[^>]+(>|$)/g, "")
		}
		function z(c) {
			return $(c).prop("checked")
		}
		function y(c, d) {
			$(c).prop("checked", d)
		}
		function B(c, d) {
			$(c).val(d)
		}
		function Va() {
			var c = document.getElementById("minitornado_div");
			if (c)
				c.innerHTML = "";
			else {
				var d = document.getElementById("content_row");
				d && (c = document.createElement("div"), c.id = "minitornado_div", c.style.Ag = "relative", d.parentNode.insertBefore(c, d))
			}
		}
		function Ua(c, d) {
			var b = $("<div/>");
			b.attr("id", c);
			b.html(d.replace(/%ID%/g, c));
			$("#minitornado_div").append(b)
		}
		function Ga(c, d, b) {
			for (var a = 0; a < R.length; a++)
				if ((d & V) == (Ra[a] & V))
					if (c == R[a].id)
						if (!R[a].o || b) {
							if ($("#" + R[a].id + "_show").attr("class", "tab tab_active_op"), $("#" + R[a].id).show(), R[a].o = e, Aa[a])
								Aa[a]()
						} else
							$("#" + R[a].id).hide(), $("#" + R[a].id + "_show").attr("class", "tab tab_inactive_op"), R[a].o = q;
					else
						$("#" + R[a].id).hide(), $("#" + R[a].id + "_show").attr("class", "tab tab_inactive_op"), R[a].o = q;
			X.Ga();
			return q
		}
		function La() {
			if (L())
				for (var c = 0; c < R.length; c++)
					if (R[c].o && Aa[c])
						Aa[c]()
		}
		function Y(c, d, b, a) {
			var f = c.id;
			c.o = q;
			var g = b & V ? "#tab_area_top" : "#tab_area_bottom",
			j = (b & V ? "#tab_names_top" : "#tab_names_bottom") + (b & W ? "_left" : "_right");
			R.push(c);
			Ra.push(b);
			Aa.push(a);
			a = $("<div/>");
			a.attr("id", f);
			a.html(d.replace(/%ID%/g, f));
			a.css("display", "none");
			$(g).append(a);
			a = $("<span/>");
			a.attr("id", f + "_name");
			a.html('<div class="tab tab_inactive_op" id="' + f + '_show" style="margin-right: 3px; cursor: pointer; padding-top: 5px;"><div class="tab_start">&nbsp;</div><div class="tab_middle" id="' + c.id + '_tab_name">' + c.H + '</div><div class="tab_end">&nbsp;</div></div>');
			$(j).append(a);
			$("#" + f + "_show").click(function () {
				return Ga(f, b)
			})
		}
		function ca(c, d) {
			c.H = d;
			c.Wc || (c.Wc = document.getElementById(c.id + "_tab_name"));
			c.Wc && (c.Wc.innerHTML = d)
		}
		function ba(c, d) {
			var b = document.getElementById(c),
			a = h;
			d && (a = document.getElementById(d));
			if ("none" !== b.style.display)
				return b.style.display = "none", a !== h && (a.innerHTML = a.innerHTML.replace("", "")), X.Ga(), q;
			b.style.display = "";
			a !== h && (a.innerHTML = a.innerHTML.replace("", ""));
			X.Ga();
			return e
		}
		function u(c) {
			for (var d; d = /(\d+)(\d{3}.*)/.exec(c); )
				c = d[1] + "," + d[2];
			return c
		}
		function ha(c) {
			return c ? p(c.replace(/[^\d]/g, "")) : 0
		}
		function N(c, d) {
			"undefined" != typeof d && $.extend(e, c, d)
		}
		function ma(c, d) {
			window.localStorage.setItem(c, JSON.stringify(d))
		}
		function na(c) {
			return JSON.parse(window.localStorage.getItem(c))
		}
		function Ba(c) {
			this.ia = [];
			this.zb = 0;
			this.bf = c;
			Ba.prototype.xc = function () {
				var c;
				if (this.ia.length)
					for (c = this.bf ? ta.a.oc : 3; this.ia.length && (this.zb < c || this.ia[0].Ge) && !(this.ia[0].ne && 0 < this.zb); ) {
						this.zb++;
						var b = this.ia.shift();
						$.ajax(b)
					}
			};
			Ba.prototype.k = function (c, b, a) {
				this.ajax({
					url : c,
					data : b
				}, a, aa, aa, aa)
			};
			Ba.prototype.ajax = function (c, b, a, d, g) {
				var j = this,
				b = {
					type : "POST",
					url : h,
					data : h,
					dataType : "html",
					beforeSend : h,
					cache : q,
					complete : h,
					dataFilter : h,
					global : q,
					timeout : 15E3,
					Qd : b,
					td : a,
					ne : d,
					Ge : g
				};
				N(b, c);
				b.success = function (a, b, c) {
					j.zb--;
					"function" != typeof this.Qd ? t(m("Error", "Success is not a function")) : this.Qd(a, b, c);
					0 < j.ia.length && j.xc()
				};
				b.error = function (a, b, c) {
					j.zb--;
					"function" != typeof this.td ? (this.data = h, j.ia.push(this)) : this.td(a, b, c);
					0 < j.ia.length && j.xc()
				};
				this.ia.push(b);
				this.xc()
			}
		}
		function H(c, d) {
			Sa++;
			var b = xa + "/remote/html_server.php?" + c + "&xw_city=" + (d ? d : j ? j.wa : 0) + "&cb=",
			a;
			a = [];
			for (var f = 0; 32 > f; f++)
				a[f] = "0123456789abcdef".substr(Math.floor(16 * Math.random()), 1);
			a = a.join("");
			b = b + a + "&js=1&isajax=1&xw_person=" + wa.substring(2) + "&xw_client_id=8&clicks=" + Sa;
			(a = decodeURIComponent(b)) || r(m("Build URL Failure", b));
			return a
		}
		function D() {
			var c;
			Ha != local_xw_sig && (Ha = local_xw_sig, ja(A("Updated Signature", local_xw_sig)));
			return (c ? c + "&" : "") + "ajax=1&liteload=1&skip_req_frame=1&sf_xw_user_id=" + wa + "&sf_xw_sig=" + local_xw_sig
		}
		function za(c, d, b) {
			try {
				var a,
				f;
				a = c.search(d);
				if (-1 === a)
					return t(m("Find Data", "Unable to find start pattern")), h;
				c = c.slice(a);
				if (b) {
					f = c.search(b);
					if (-1 === f)
						return t(m("Find Data", "Unable to find end pattern")), h;
					c = c.slice(0, f)
				}
				return c
			} catch (g) {
				return t(m("Find Data", g)),
				h
			}
		}
		function Da(c, d, b, a) {
			try {
				var f,
				g;
				f = c.search(d);
				if (-1 === f)
					return t(m("Find JSON", "Unable to find start pattern")), h;
				c = c.slice(f);
				f = c.search("{");
				if (-1 === f)
					return t(m("Find JSON", "Unable to find first brace")), h;
				g = c.search(b);
				if (-1 === g)
					return t(m("Find JSON", "Unable to find end pattern")), h;
				c = c.slice(f, g);
				return a ? eval("result = " + c + ";") : JSON.parse(c)
			} catch (j) {
				return t(m("Find JSON", j)),
				h
			}
		}
		function Ea(c) {
			var d = /\?next_params=(.+)/.exec(c);
			d && (c = atob(decodeURIComponent(d[1])));
			c = c.replace(/&amp;/g, "&");
			c = c.replace(/&quot;/g, '"');
			c = c.replace(/\+/g, " ");
			c = c.replace(/%22/g, '"');
			c = c.replace(/%2C/g, ",");
			c = c.replace(/%3A/g, ":");
			c = c.replace(/%7B/g, "{");
			c = c.replace(/%7C/g, "|");
			return c = c.replace(/%7D/g, "}")
		}
		function Ia() {
			Ia.prototype.send = function () {}
			
		}
		function G(c, d) {
			this.id = d;
			this.H = c;
			this.Xb = this.j = q;
			this.gc = h;
			this.h = this.state = Qa;
			this.f = h;
			this.Q = 60;
			G.prototype.Eb = function () {
				$("#" + this.id + "_start_row").show();
				$("#" + this.id + "_stop_row").hide();
				$("#" + this.id + "_cancel_row").hide()
			};
			G.prototype.ng = function () {
				$("#" + this.id + "_start_row").hide();
				$("#" + this.id + "_stop_row").show();
				$("#" + this.id + "_cancel_row").hide()
			};
			G.prototype.mg = function () {
				$("#" + this.id + "_start_row").hide();
				$("#" + this.id + "_stop_row").hide();
				$("#" + this.id + "_cancel_row").show()
			};
			G.prototype.O = function () {
				this.j || (this.j = e, this.ng(), r(this.H + " Started"), this.i(""), this.state = K, this.f())
			};
			G.prototype.P = function () {
				this.j && (this.j = q, this.Eb(), r(this.H + " Stopped"), this.i(""), this.state = fa)
			};
			G.prototype.Ic = function () {
				this.Xb && (this.Xb = q, this.Eb(), r(this.H + " Cancelled"), this.i(""), this.state = fa)
			};
			G.prototype.fd = function () {
				return j.Qb > o.mc.Qb ? (r(A("Level Up", "Reached level " + u(j.Qb))), o.mc.Qb = j.Qb, e) : q
			};
			G.prototype.p = function (b) {
				return this.j && 4 === b.readyState
			};
			G.prototype.aa = function (b, a) {
				if (200 === b.status)
					return e;
				a && t(m(a, b.status));
				return q
			};
			G.prototype.pc = function (b, a) {
				if (this.j)
					if (b && (j.wa != b || a)) {
						this.i("Travelling to " + qa[b] + "\u2026");
						var c = this;
						C.k(H("xw_controller=travel&xw_action=travel&destination=" + b + "&from=job&zone=1"), D(), function (a, d, g) {
							c.qg(g, b)
						})
					} else
						this.state = this.h, this.f()
			};
			G.prototype.qg = function (b, a) {
				this.p(b) && (this.aa(b) ? (o.ja(b, e), j.wa == a ? (r(A("Travelled to " + qa[a])), this.state = this.h, this.f()) : (r(m("Problem Travelling to " + qa[a], "Arrived in " + qa[j.wa])), this.pc(a))) : (t(m("Problem Travelling to " + qa[a], b.status)), this.pc(a)))
			};
			G.prototype.qc = function () {
				if (this.j) {
					this.i("Updating Status\u2026");
					var b = this;
					C.k(H("xw_controller=propertyV2&xw_action=collect&building_type=6", 5), D(), function (a, c, d) {
						b.tg(d)
					})
				}
			};
			G.prototype.tg = function (b) {
				if (this.p(b)) {
					if (this.aa(b, "Problem Updating Status"))
						try {
							var a = JSON.parse(b.responseText);
							if (a && a.data) {
								var c = JSON.parse(a.data);
								o.mc === h && (o.mc = Fa(a.user_fields), o.Ig = {}, o.Ya = Ma(a.fightbar), o.Hg = Na(c.status.active_character));
								o.Pb(a, c.status.active_character);
								ja(A("Status Updated"));
								this.state = this.h
							}
						} catch (d) {
							t(m("Problem Updating Status", d))
						}
					this.f()
				}
			};
			G.prototype.Te = function () {
				var b = this;
				C.k(H("xw_controller=inventory&xw_action=view"), D(), function (a, c, d) {
					b.Ue(d)
				})
			};
			G.prototype.Ue = function (b) {
				if (this.p(b)) {
					if (this.aa(b, "Problem Loading Inventory"))
						if (b = Da(b.responseText, "var Items = ", /;[\r\n]+/, e), o.n = [], o.ob = 0, b.data) {
							for (var a in b.data)
								b.data.hasOwnProperty(a) && (o.n[a] = {
										Ub : b.data[a].attack,
										la : b.data[a].defense,
										W : b.data[a].active,
										Wa : b.data[a].quantity,
										sd : b.data[a].equipped_offense,
										rd : b.data[a].equipped_defense,
										Fc : b.data[a].imagesrc,
										id : b.data[a].id,
										name : b.data[a].name,
										hg : b.data[a].plural_name,
										Z : 0
									}, o.ob++);
							r(A("Inventory Loaded", "Found " + u(o.ob) + " unique items"));
							this.state = this.h
						} else
							t(m("Problem Loading Inventory"));
					this.f()
				}
			};
			G.prototype.i = function (b) {
				this.gc || (this.gc = $("#" + this.id + "_status_log"));
				this.gc && this.gc.html(b)
			};
			G.prototype.Mc = function (b, a) {
				var c;
				"function" == typeof a && (c = a, a = h);
				if (0 >= b)
					"function" == typeof c && c();
				else {
					a || (a = "Pausing");
					this.i(a + ' <span id="' + this.id + '_seconds">' + Z(b) + "</span>\u2026");
					var d = 1E3 * b,
					g = this,
					l = setInterval(function () {
							b--;
							d = d - 1E3;
							if (document.getElementById(g.id + "_seconds") && g.j) {
								document.getElementById(g.id + "_seconds").innerHTML = Z(Math.max(b, 0));
								if (b <= 0) {
									clearInterval(l);
									typeof c == "function" && c()
								}
							} else
								clearInterval(l)
						}, Math.min(d, 1E3))
				}
			};
			G.prototype.rc = function (b) {
				var a = 10,
				c = this,
				d = 1E3 * a;
				this.Xb = e;
				this.mg();
				this.i("Starting in " + Z(a) + "\u2026");
				var g = setInterval(function () {
						a--;
						d -= 1E3;
						c.Xb && !c.j ? (c.i("Starting in " + Z(a) + "\u2026"), 0 >= a && (clearInterval(g), b())) : clearInterval(g)
					}, Math.min(d, 1E3))
			}
		}
		var va,
		la,
		Ka,
		L,
		r,
		t,
		ja,
		d,
		j,
		U;
		va = /.Revision: (\d+) ./.exec("$Revision: 846 $")[1];
		la = "http://mafiademon.com";
		Ka = la + "/scripts/";
		var C,
		Ca,
		o,
		ta,
		ga,
		k,
		X,
		R = [],
		Ra = [],
		Aa = [],
		Pa,
		Oa,
		xa = MW_BASE_URL,
		Ha = "",
		wa = User.id,
		ya = User.trackId,
		Sa = 1;
		Qa = 0;
		K = 1;
		fa = 26;
		V = 1;
		W = 4;
		var qa = "Unknown;New York;Cuba;Moscow;Bangkok;Las Vegas;Italy;Brazil;Chicago;London".split(";"),
		Xa = {
			pe : function (c) {
				for (var c = c.replace(/\r\n/g, "\n"), d = "", b = 0; b < c.length; b++) {
					var a = c.charCodeAt(b);
					128 > a ? d += String.fromCharCode(a) : (127 < a && 2048 > a ? d += String.fromCharCode(a >> 6 | 192) : (d += String.fromCharCode(a >> 12 | 224), d += String.fromCharCode(a >> 6 & 63 | 128)), d += String.fromCharCode(a & 63 | 128))
				}
				return d
			},
			Bg : function (c) {
				var d = "",
				b,
				a,
				f;
				b = 0;
				if (!c)
					return d;
				for (; b < c.length; )
					a = c.charCodeAt(b), 128 > a ? (d += String.fromCharCode(a), b++) : 191 < a && 224 > a ? (f = c.charCodeAt(b + 1), d += String.fromCharCode((a & 31) << 6 | f & 63), b += 2) : (f = c.charCodeAt(b + 1), c3 = c.charCodeAt(b + 2), d += String.fromCharCode((a & 15) << 12 | (f & 63) << 6 | c3 & 63), b += 3);
				return d
			},
			Cg : function (c) {
				var d = "",
				b = 0,
				a = 0;
				if (!c)
					return d;
				for (; b < c.length; )
					a = c.charCodeAt(b), d += "%" + a.toString(), b++;
				return d
			}
		};
		(function () {
			if (!document.getElementById("minitornado_div")) {
				D$ = this;
				D$.addTab = Y;
				D$.merge = N;
				D$.Eg = ba;
				Ha = local_xw_sig;
				la = atob("aHR0cDovL21hZmlhZGVtb24uY29t");
				C = new Ba(e);
				Ca = new Ba(q);
				Pa = new Ia;
				Oa = new Ia;
				o = new pa("outer_frame");
				ga = new ea("Inventory", "minitornado_loot");
				new P("Log", "minitornado_log");
				k = new s("Opponents", "minitornado_opponents");
				X = new M("Ices", "minitornado_ices");
				ta = new Q("Options", "minitornado_options");
				new J("Robbing", "minitornado_rob");
				new g("Fighting", "minitornado_fight");
				new w("Bosses", "minitornado_boss");
				new Ja("Links", "minitornado_links");
				Ga("minitornado_options", V, e);
				Ga("minitornado_log", 2, e);
				ta.ce();
				try {
					var c = 1E9 + Math.floor(8999999999 * Math.random()),
					d = 1E7 + Math.floor(89999999 * Math.random()),
					b = 1E9 + Math.floor(1147483647 * Math.random()),
					a = (new Date).getTime(),
					f = window.location;
					(new Image).src = "http://www.google-analytics.com/__utm.gif?utmwv=1.3&utmn=" + c + "&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn=mafiademon.com&utmr=" + f + "&utmp=" + ("/scripts/mafia_demon_gold.js?1230478738=" + wa) + "&utmac=UA-19923611-4&utmcc=__utma%3D" + d + "." + b + "." + a + "." + a + "." + a + ".2%3B%2B__utmb%3D" + d + "%3B%2B__utmc%3D" + d + "%3B%2B__utmz%3D" + d + "." + a + ".2.2.utmccn%3D(referral)%7Cutmcsr%3D" + f.host + "%7Cutmcct%3D" + f.pathname + "%7Cutmcmd%3Dreferral%3B%2B__utmv%3D" + d + ".-%3B"
				} catch (j) {}
				
			}
		})()
	}
	setTimeout(function () {
		"undefined" === typeof D$ && new Ta
	}, 3E3)
};

injectScript(myscript);