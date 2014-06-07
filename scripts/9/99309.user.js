// ==UserScript==
// @name           Color Labels for New Twitter
// @namespace      clft_new
// @description    This user script adds color label for each user in new design Twitter.
// @run-at         document-start
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        2.53
// @author         Vilart
// ==/UserScript==

(function(){
	var isChromeExtension = function() { return (typeof chrome == 'object') && (typeof chrome.extension == 'object') }

	var clfnt = function() {
		// *** Powered by rgbcolor.js ***************************************
		/**
		 * A class to parse color values
		 * @author Stoyan Stefanov <sstoo@gmail.com>
		 * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
		 * @license Use it if you like it
		 */
		function RGBColor(color_string) {
		    this.ok = false;
		    if (color_string.charAt(0) == '#') color_string = color_string.substr(1,6);

		    color_string = color_string.replace(/ /g,'');
		    color_string = color_string.toLowerCase();
		    var color_defs = [
		        {
		            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
		            process: function (bits){ return [ parseInt(bits[1]), parseInt(bits[2]), parseInt(bits[3])]; }
		        },
		        {
		            re: /^(\w{2})(\w{2})(\w{2})$/,
		            process: function (bits){ return [ parseInt(bits[1], 16), parseInt(bits[2], 16), parseInt(bits[3], 16)]; }
		        },
		        {
		            re: /^(\w{1})(\w{1})(\w{1})$/,
		            process: function (bits){ return [ parseInt(bits[1] + bits[1], 16), parseInt(bits[2] + bits[2], 16), parseInt(bits[3] + bits[3], 16)]; }
		        }
		    ];

		    for (var i = 0; i < color_defs.length; i++) {
		        var re = color_defs[i].re;
		        var processor = color_defs[i].process;
		        var bits = re.exec(color_string);
		        if (bits) {
		            channels = processor(bits);
		            this.r = channels[0];
		            this.g = channels[1];
		            this.b = channels[2];
		            this.ok = true;
		        }
		    }

		    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
		    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
		    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);

		    this.toRGB = function () { return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')'; }
		    this.toHex = function () {
		        var r = this.r.toString(16);
		        var g = this.g.toString(16);
		        var b = this.b.toString(16);
		        if (r.length == 1) r = '0' + r;
		        if (g.length == 1) g = '0' + g;
		        if (b.length == 1) b = '0' + b;
		        return '#' + r + g + b;
		    }
		}

		// ----------------------------------------------------------------------

		// *** Chrome判定ロジック ***************************************
		var chromeValuePrefix = "UserJS-CLFTN-";
		var chromeVersion = 0;

		if (isChromeExtension()) {
			chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
			function GM_getValue(dataname, def) {
				var ret = localStorage.getItem(chromeValuePrefix + dataname);
				if (ret == undefined) return def;
				return ret;
			}
			function GM_setValue(dataname, data) {
				localStorage.setItem(chromeValuePrefix + dataname, data);
			}
		}

		// *** カラー ***************************************
		
		function ColorUnits() {
			// === 定数 =================================
			var SaveTo = "NT-ThemeColors";

			// === カラーユニット =================================
			ColorUnit = function(bg, text, vivid, label, id) {
				this.bgColor = bg;
				this.textColor = text;
				this.vividColor = vivid;
				this.label = label;
				this.id = id;

				var top_rgb = new RGBColor(this.bgColor);
				top_rgb.r = parseInt((255 - top_rgb.r) * 0.5 + top_rgb.r);
				top_rgb.g = parseInt((255 - top_rgb.g) * 0.5 + top_rgb.g);
				top_rgb.b = parseInt((255 - top_rgb.b) * 0.5 + top_rgb.b);
				this.bgColorGradient = top_rgb.toHex();

				var bg = "-moz-linear-gradient(top,"+this.bgColorGradient+","+this.bgColor+")";
				if (isChromeExtension()) {
					if (chromeVersion < 10)
						bg = "-webkit-gradient(linear, left top, left bottom, from("+this.bgColorGradient+"), to("+this.bgColor+"))";
					else
						bg = bg.replace("-moz-", "-webkit-");
				}
				this.gradientCSS = bg;
			}
			ColorUnit.prototype.isUse = true;
			ColorUnit.prototype.id = -1;
			
			// === デフォルトカラー定義 =================================
			var lang_ja = document.body.className.match(/( ja|ja )/) ? true : false;
			var defaultColors = new Array(
				new ColorUnit("#FFDDDD", "#CC0000", "#E40011", lang_ja ? "レッド" : "Red", 0),
				new ColorUnit("#FFDD99", "#F06000", "#F07318", lang_ja ? "オレンジ" : "Orange", 1),
				new ColorUnit("#FFEE66", "#AB8B00", "#FBCC10", lang_ja ? "イエロー" : "Yellow", 2),
				new ColorUnit("#D6E7C2", "#64992C", "#009944", lang_ja ? "グリーン" : "Green", 3),
				new ColorUnit("#DEE0FF", "#5A6986", "#1478FD", lang_ja ? "ブルー" : "Blue", 4),
				new ColorUnit("#E0D5F9", "#5229A3", "#9644CC", lang_ja ? "バイオレット" : "Violet", 5),
				new ColorUnit("#FFDDFF", "#854F61", "#F0AAB0", lang_ja ? "ピンク" : "Pink", 6),
				new ColorUnit("#DDDDDD", "#404040", "#666666", lang_ja ? "グレー" : "Gray", 7)
			);

			this.Colors = new Array();
			for(var i=0; i<defaultColors.length; i++) this.Colors.push(defaultColors[i]);

			// === 設定の読み込み =================================
			var TMgetData = GM_getValue(SaveTo, "({})");
			if (TMgetData != "({})") {
				this.Colors = new Array();
				var NewTMC = JSON.parse(TMgetData);

				for (var i = 0; i < NewTMC.length; i++) {
					if (!NewTMC[i].vividColor) {
						NewTMC[i].vividColor = NewTMC[i].textColor;
						for(var j = 0; j < defaultColors.length; j++) {
							if (defaultColors[i].id == NewTMC[i].id) {
								NewTMC[i].vividColor = defaultColors[i].vividColor;
								break;
							}
						}
					}
					this.Colors.push(new ColorUnit(NewTMC[i].bgColor, NewTMC[i].textColor, NewTMC[i].vividColor, NewTMC[i].label, NewTMC[i].id));
				}
			}

			
			// === メソッド =================================
			this.indexFromId = function(id) {
				for (var i=0; i<this.Colors.length; i++) {
					if (this.Colors[i].id == id) return i;
				}
				return -1;
			}
			this.getColorFromId = function(id) {
				var idx = this.indexFromId(id);
				return idx == -1 ? null : this.Colors[idx];
			}
			this.getLabelFromId = function(id) {
				if (id < -1)
					return lang_ja ? "(複数選択中)" : "(Selecting multiple)";
				else if (id == -1)
					return lang_ja ? "(設定なし)" : "(No setting)";
				else
					return this.getColorFromId(id).label;
			}
			this.setLabelFromId = function(id, newLabel) {
				if (id > -1)
					this.getColorFromId(id).label = newLabel;
			}
			this.saveColors = function() {
				GM_setValue(SaveTo, JSON.stringify(this.Colors));
			}
			this.deleteColorAtIndex = function(idx) { this.Colors.splice(idx, 1); }
			this.deleteColorAtId = function(id) { this.deleteColorAtIndex(this.indexFromId(id)); }
			this.addColor = function(bg, text, vivid, label) {
				var bgHex = new RGBColor(bg);
				var textHex = new RGBColor(text);
				var vividHex = new RGBColor(vivid ? vivid : text);
				if (!bgHex.ok || !textHex.ok || !vividHex.ok) return false;
			
				var addId = 100;			// User Custom Label ID Starts from 100.
				while(this.indexFromId(addId) != -1) addId++;
				this.Colors.push(new ColorUnit(bgHex.toHex(), textHex.toHex(), label, addId));
				return true;
			}
			this.generateButtons = function() {
				var ret = '<a href="#" data-id="-1" style="color:#999;">-</a>';
				for (var i=0; i<this.Colors.length; i++) {
					var c = this.Colors[i];
					ret += '<a href="#" data-id="'+c.id+'" data-label="'+c.label+'" data-color="'+c.textColor+'" data-bg="'+c.bgColor+'" style="color:'+c.textColor+'; background:'+c.gradientCSS+';">a</a>'
				}
				return ret;
			}
		}	
		var unit = new ColorUnits();

		// *** ユーザーデータ ***************************************
		
		function UserLabel() {
			// === 定数 =================================
			var SaveTo = "NT-Users";
			var VSSaveTo = "NT-ViewStyle";
			
			var ViewStyles = ["label", "twicca"];
			
			// === ユーザーユニット =================================
			UserUnit = function(id, name, colorid) {
				this.id = id;
				this.userName = name;
				this.colorId = colorid;
			}
			UserUnit.prototype.clone = function() {
				return new UserUnit(this.id, this.userName, this.colorId);
			}
			
			// === 設定の読み込み =================================
			this.Users = new Array();

			var ULgetData = GM_getValue(SaveTo, "({})");
			if (ULgetData != "({})") {
				var NewUL = JSON.parse(ULgetData);
				for (var i = 0; i < NewUL.length; i++)
					this.Users.push(new UserUnit(NewUL[i].id, NewUL[i].userName, NewUL[i].colorId));
			}
			
			var ViewStyle = GM_getValue(VSSaveTo, "");

			// === プロパティ =================================
			this.AutoSave = true;
			
			// === メソッド =================================
			this.saveUsers = function() {
				GM_setValue(SaveTo, JSON.stringify(this.Users));
			}
			
			this.getIndexFromUserId = function(targetUserId) {
				for (var i = 0; i < this.Users.length; i++) {
					var user = this.Users[i];
					if (user.id == targetUserId) return i;
				}
				return -1;
			}
			this.getFromUserId = function(targetUserId) {
				var idx = this.getIndexFromUserId(targetUserId);
				return (idx > -1) ? this.Users[idx] : null;
			}
			this.setUserLabel = function(targetUserId, userName, colorId) {
				targetUserId = parseInt(targetUserId + "");
				colorId = parseInt(colorId + "");

				if (colorId < 0) {
					this.deleteUserLabel(targetUserId);
					return;
				}

				var targetUser = this.getFromUserId(targetUserId);
				if (targetUser) {
					targetUser.userName = userName;
					targetUser.colorId = colorId;
				} else {
					this.Users.push(new UserUnit(targetUserId, userName, colorId));
				}
				if (this.AutoSave) this.saveUsers();
			}
			this.deleteUserLabel = function(targetUserId) {
				var userIdx = this.getIndexFromUserId(targetUserId);
				if (userIdx > -1) {
					this.Users.splice(userIdx, 1);
					if (this.AutoSave) this.saveUsers();
				}
			}
			
			this.pickUpUsersByColorId = function(targetColorId) {
				var picks = new Array();
				for (var i = 0; i < this.Users.length; i++) {
					if (this.Users[i].colorId == targetColorId) picks[picks.length] = this.Users[i].clone();
				}
				return picks;
			}
			this.getViewStyle = function() {
				for (var i = 0;i < ViewStyles.length; i++) {
					if (ViewStyles[i] == ViewStyle) return ViewStyles[i];
				}
				return ViewStyles[0];
			}
			this.setViewStyle = function(name) {
				var oldViewStyle = ViewStyle;
				for (var i = 0;i < ViewStyles.length; i++) {
					if (ViewStyles[i] == name) {
						ViewStyle = name;
						break;
					}
				}
				if (this.AutoSave && (oldViewStyle != ViewStyle)) this.saveViewStyle();
				return ViewStyle;
			}
			this.toggleViewStyle = function() {
				var oldViewStyle = ViewStyle;
				var currentView = this.getViewStyle();
				for (var i = 0;i < ViewStyles.length; i++) {
					if (ViewStyles[i] == currentView) {
						i++;
						if (i >= ViewStyles.length) i = 0;
						ViewStyle = ViewStyles[i];
						break;
					}
				}
				if (this.AutoSave && (oldViewStyle != ViewStyle)) this.saveViewStyle();
				return ViewStyle;
			}
			this.saveViewStyle = function(name) {
				GM_setValue(VSSaveTo, ViewStyle);
			}
			
			this.generateCSS = function(colorUnits, mode) {
				if (!mode) mode = this.getViewStyle();
				var ret = (mode == "twicca") ? ".tweet,.account{border-left:6px solid transparent;}.permalink-inner{padding:0;}" : "";

				for (var i = 0; i < colorUnits.Colors.length; i++) {
					var targetColor = colorUnits.Colors[i];
					var c_users = this.pickUpUsersByColorId(targetColor.id);
					
					if (c_users.length > 0) {
						var userstt = [];
						
						if (mode == "twicca") {
							var userstt_text = [];
							for (var j = 0; j < c_users.length; j++) {
								var u = c_users[j];
								userstt[userstt.length] = '.tweet[data-user-id="'+u.id+'"]';
								userstt[userstt.length] = '.account[data-user-id="'+u.id+'"]';

								userstt_text[userstt_text.length] = '.clfnt-label[data-user-id="' + u.id + '"]';
								userstt_text[userstt_text.length] = '.account-group[data-user-id="' + u.id + '"] .username';
								userstt_text[userstt_text.length] = '.account[data-user-id="' + u.id + '"] .username';
								userstt_text[userstt_text.length] = '.profile-card-inner[data-user-id="' + u.id + '"] .screen-name';
								userstt_text[userstt_text.length] = '.tweet[data-user-id="'+u.id+'"] .js-tweet-text a:not([class~="twitter-atreply"])';
								userstt_text[userstt_text.length] = '.twitter-atreply[data-screen-name="' + u.userName + '"]';
								userstt_text[userstt_text.length] = '.profile-modal-header a.pretty-link.js-screen-name[href$="'+u.userName+'"]';
							}
							ret += userstt.join(",") + "{border-left-color: "+targetColor.vividColor+";}" + userstt_text.join(",") + "{color:"+targetColor.vividColor+" !important;}";
						} else {
						
							for (var j = 0; j < c_users.length; j++) {
								var u = c_users[j];

								userstt[userstt.length] = '.twitter-atreply[data-screen-name="' + u.userName + '"]';					// 文中リンク (in fly: プロフ・リプ)
								userstt[userstt.length] = '.clfnt-label[data-user-id="' + u.id + '"]';									// 設定パネル & カスタム
								userstt[userstt.length] = '.account-group[data-user-id="' + u.id + '"] .username';						// TL
								userstt[userstt.length] = '.account[data-user-id="' + u.id + '"] .username';							// フォロー・フォロワー
								userstt[userstt.length] = '.profile-card-inner[data-user-id="' + u.id + '"] .screen-name';				// プロフィール
								userstt[userstt.length] = '.profile-modal-header a.pretty-link.js-screen-name[href$="'+u.userName+'"]';	// プロフィールダイアログ・ヘッダ
							}
							ret += userstt.join(",") + "{padding:0 0.45em;border-radius:1em;-moz-border-radius:1em;-webkit-border-radius:1em;background:"+targetColor.gradientCSS+";color:"+targetColor.textColor+" !important;}";//border:1px solid "+targetColor.bgColor+";}";
						}
					}
				}

				return ret;
			}
		}
		var users = new UserLabel();

		// 通常スタイルシート
		var colorlabel_icon = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAK'+
		'TWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQ'+
		'WaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec'+
		'5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28A'+
		'AgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0'+
		'ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaO'+
		'WJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHi'+
		'wmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryM'+
		'AgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0l'+
		'YqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHi'+
		'NLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYA'+
		'QH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6c'+
		'wR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBie'+
		'whi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1c'+
		'QPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqO'+
		'Y4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hM'+
		'WEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgoh'+
		'JZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSU'+
		'Eko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/p'+
		'dLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Y'+
		'b1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7O'+
		'UndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsb'+
		'di97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W'+
		'7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83'+
		'MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxr'+
		'PGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW'+
		'2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1'+
		'U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd'+
		'8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H0'+
		'8PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+H'+
		'vqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsG'+
		'Lww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjg'+
		'R2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4'+
		'qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWY'+
		'EpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1Ir'+
		'eZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/Pb'+
		'FWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYj'+
		'i1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVk'+
		'Ve9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0Ibw'+
		'Da0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vz'+
		'DoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+y'+
		'CW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawt'+
		'o22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtd'+
		'UV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3r'+
		'O9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0'+
		'/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv95'+
		'63Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+'+
		'UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAA'+
		'ADqYAAAXb5JfxUYAAADqSURBVHja7JfNCcIwGIaf1NAZhJJl7KkreBK6hKAouofQkyt40h06QxA8'+
		'ZYCC1EuRICmmzaEUEsghP0948yZfPiLatmXKkjBxiQImFyC11ilwADZA5sk9gQo4G2MI4SVwArYD'+
		'hWfADlh07dF8ApTWQA6IPzW35peh/O8dSD3UpyPHnHMkcLEsvA20sgLeIbwEjp2qNbD0BF/AFdhb'+
		'uxrFi9CnuK7r+BBFAfPPBd8wUEqJEWvYYSTiEUQB84sCV6fW+g6sPPhHT7833+dA47mBJpR3OqCU'+
		'KnwtNMa40mkRL2EUMBsBYurv+WcAhrg7CpzCifkAAAAASUVORK5CYII=';

		var ntsrCss = document.createElement("style");
		ntsrCss.type = "text/css";
		ntsrCss.id = "clfnt-css";
		ntsrCss.innerHTML = ".clfnt-dropdown { font-size: 1em; cursor: pointer; color: #bbb; margin: 0 5px 0 2px;} " +
							".stream-tweet .clfnt-dropdown, .details-pane-tweet .tweet-actions .clfnt-dropdown, .permalink-tweet .tweet-actions .clfnt-dropdown { visibility:hidden; } .stream-tweet:hover .clfnt-dropdown, .activity-item-tweet-content .clfnt-dropdown { visibility:visible; }" + 
							".clfnt-dropdown:hover { color: #666; } " +
							"#clfnt-editor {visibility: visible;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;-moz-box-shadow:2px 2px 6px rgba(0,0,0,.3);-webkit-box-shadow:2px 2px 6px rgba(0,0,0,.3);background:#fafafa;border:1px solid #aaa;color:#666;margin:0;padding:0;position:absolute;text-align:left;z-index:99999;cursor:auto;line-height:normal;overflow:hidden;}" +
							"#clfnt-editcontroller {display:none;}"+
							"#clfnt-editor #clfnt-editcontroller {display:block;}"+
							".clfnt-container .clfnt-label { font-size:14px; font-weight:bold !important; color:#333; }" +
							".clfnt-labelbtns {padding:5px 0 0 0;}"+
							".clfnt-labelbtns a { display:block;float:left;width:16px;height:16px;line-height:14px;font-size:14px;text-align:center;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;border:1px solid #e0e0e0;margin:3px 3px 0 0;outline:none;}"+
							".clfnt-labelbtns a:hover {text-decoration:none!important;}"+
							".clfnt-labelbtns a.selected { border: 1px solid #000; } "+
							'.clfnt-labelbtns a.selected[data-id="-1"] { color: #000 !important; } '+
							".clfnt-container {padding:8px;min-width:130px;}"+

							".clfnt-labelName, .clfnt-labelEdit, #clfnt-editinput {border:1px;border-radius-bottomleft:4px;-moz-border-radius-bottomleft:4px;-webkit-border-radius-bottomleft:4px;border-radius-bottomright:4px;-moz-border-radius-bottomright:4px;-webkit-border-radius-bottomright:4px;}" +
							".clfnt-labelName {clear:both;background:#eee;padding:5px 8px;font-size:11px;border-top:1px solid #ddd;}"+
							'.clfnt-labelName[editable="true"]:hover {cursor:pointer;}'+
							'.clfnt-labelName[editable="true"]:hover {background:#e3e3e3;}'+
							'.clfnt-labelName.editting {display:none;}'+
							'.clfnt-labelEdit { display:none; }'+
							'.clfnt-labelEdit.editting { display:block; }'+
							'#clfnt-editinput {clear:both;padding:5px 8px 6px 8px;background:#fff;font-size:11px;border-top:1px solid #ddd;display:block;width:100%;-moz-box-sizing:border-box;}'+
							'#clfnt-togglestyle{display:none;width:16px;height:16px;background:url('+colorlabel_icon+') 0 0 no-repeat;float:right;cursor: pointer;}'+
							'#clfnt-togglestyle:hover{background-position:-16px 0;}'+
							'#clfnt-togglestyle.clfnt-style-twicca{background-position:0 -16px;}#clfnt-togglestyle.clfnt-style-twicca:hover{background-position:-16px -16px;}'+
							".stream-item:not(.animating) .expansion-container {overflow:visible !important;}"+
							"#clfnt-togglestyle{display:block;}";

		document.getElementsByTagName("head")[0].appendChild(ntsrCss);

		// ユーザーラベルスタイルシート

		function RefreshUserLabels() {
			var ntsrUserCss = document.getElementById("clfnt-userlabel");
			if (!ntsrUserCss) {
				ntsrUserCss = document.createElement("style");
				ntsrUserCss.type = "text/css";
				ntsrUserCss.id = "clfnt-userlabel";
				
				var textNode = document.createTextNode(" ");
				ntsrUserCss.appendChild(textNode);

				document.getElementsByTagName("head")[0].appendChild(ntsrUserCss);
			}
			ntsrUserCss.firstChild.nodeValue = users.generateCSS(unit);
		}
		RefreshUserLabels();


		var labelHTML = '<div class="clfnt-labelName"></div><div class="clfnt-labelEdit"><input type="text" id="clfnt-editinput" /></div>';

		var ec = document.createElement("div");
		ec.id = "clfnt-editcontroller";
		ec.addEventListener("CLFNT_Reset", function(e) {
			var _this = this;
			var o = JSON.parse(e.data);

			this.setAttribute("data-user-id", o.id);
			this.setAttribute("data-screen-name", o.name);
			this.innerHTML = '<div class="clfnt-container clearfix"><span id="clfnt-togglestyle"></span><span class="clfnt-label" data-user-id="' + o.id + '">' + o.name + '</span><div class="clfnt-labelbtns">'+unit.generateButtons()+'</div></div>'+labelHTML;

			// カラーID取得
			var setting = -1;
			var user_data = users.getFromUserId(o.id);
			if (user_data) {
				setting = user_data.colorId;
				
				// ユーザーネーム変更時
				if (o.name != user_data.userName) {
					users.setUserLabel(user_data.id, o.name, user_data.colorId);
					RefreshUserLabels();
				}
			}
			
			// セット
			var ResetColorId = function(id) {
				_this.setAttribute("data-colorId", id);
				_this.getElementsByClassName("clfnt-labelName")[0].setAttribute("editable", (id > -1) ? true : false);
			}
			ResetColorId(setting);


			// ラベル取得
			var labelName = this.getElementsByClassName("clfnt-labelName")[0];
			var edit = _this.getElementsByClassName("clfnt-labelEdit")[0]

			labelName.innerHTML = unit.getLabelFromId(setting);
			

			// ボタンイベント登録
			var btns = this.getElementsByClassName("clfnt-labelbtns")[0].getElementsByTagName("a");
			for(var i=0; i < btns.length; i++) {
				btns[i].addEventListener("click", function(e) {
					var colId = e.target.getAttribute("data-id");

					users.setUserLabel(ec.getAttribute("data-user-id"), ec.getAttribute("data-screen-name"), colId);
					RefreshUserLabels();
					ResetColorId(colId);

					for(var i=0; i < btns.length; i++) btns[i].className = "";
					e.target.className = "selected";
				}, true);
				
				btns[i].addEventListener("mouseover", function(e) {
					labelName.innerHTML = unit.getLabelFromId(e.target.getAttribute("data-id"));
				}, true);

				btns[i].addEventListener("mouseout", function(e) {
					labelName.innerHTML = unit.getLabelFromId(_this.getAttribute("data-colorId"));
				}, true);
				
				if (btns[i].getAttribute("data-id") == setting) btns[i].className = "selected";
			}

			// ラベルイベント登録
			var editinput = document.getElementById("clfnt-editinput");
			labelName.addEventListener("click", function(e) {
				var id = parseInt(_this.getAttribute("data-colorId"));
				if (id > -1) {
					labelName.className = labelName.className.replace("clfnt-labelName", "clfnt-labelName editting");
					edit.className = edit.className.replace("clfnt-labelEdit", "clfnt-labelEdit editting");

					editinput.value = unit.getLabelFromId(id);
					editinput.focus();
					editinput.select();
				}
			}, true);
			
			// トグル取得・イベント登録
			var toggle = document.getElementById("clfnt-togglestyle");
			toggle.addEventListener("click", function(e) {
				toggle.className = "clfnt-style-" + users.toggleViewStyle();
				RefreshUserLabels();
			}, true);

			toggle.className = "clfnt-style-" + users.getViewStyle();
			// TODO: ページ切り替え後、この部分を通過していないせいでモードが正しくない、および切り替わらない
			
			var blurAction = function() {
				var id = parseInt(_this.getAttribute("data-colorId"));
				var newLabel = editinput.value;
				labelName.innerHTML = newLabel;
				unit.setLabelFromId(id, newLabel);
				unit.saveColors();
			
				labelName.className = labelName.className.replace(/ ?editting/, "");
				edit.className = edit.className.replace(/ ?editting/, "");
			}
			editinput.addEventListener("blur", blurAction, false);
			editinput.addEventListener("keypress", function(e) {
				if(e.keyCode == 13) blurAction();
				e.stopPropagation();
			}, false);
		}, true);
		document.body.appendChild(ec);

		var twitterReady = function(callback, afterReady) {
			var func = function() {
				var interval;
				var loopTimer = 200;
				var intervalFunc = function() {
					var ok = false;
					if (twttr) {
				 	    if (callback()) {
				 	    	ok = true;
				 	    }
					}
					if (!ok) interval = setTimeout(intervalFunc, loopTimer);
			 	}
				interval = setTimeout(intervalFunc, loopTimer);
			}
			var funcStr = func.toString();

			var callbackStr = callback.toString();
			if (window.opera) callbackStr = callbackStr.replace(/</g, "&lt;").replace(/>/g, "&gt;");

			var script = document.createElement("script");
			script.innerHTML = "(function(){var callback="+callbackStr+";("+funcStr+")();})();";
			document.body.appendChild(script);
		}

		twitterReady(function() {

			// 初期化状態チェック
			if (twttr.templates) {
				var editController = document.getElementById("clfnt-editcontroller");

				if (!twttr.templates.clft_dropdown) {
					if (Mustache.TwitterTemplate) {
						// New Style
						//twttr.templates.clft_dropdown = new Mustache.TwitterTemplate({
						window.clft_dropdown = function(t, c, p, i) {
							var userdrop = function() {
			                	t.rs(c, p, function (c, p, t) {
									t.b('<span class="clfnt-dropdown" onclick="clfnt_openEditor.apply(this, [{e: event, id: ');
			                        t.b(t.v(t.f("id", c, p, 0)));
			                        t.b(", name: '");
			                        t.b(t.v(t.f("screen_name", c, p, 0)));
			                        t.b('\'}]);">▼</span>\n')
			                    });
							}
							// (from tweet_user_block)
	                		if (t.s(t.f("user", c, p, 1), c, p, 0, 0, 0, "{{ }}")) {
	                			// Tweet etc...
	                			userdrop();
			                    c.pop();
			                } else {
				                // User block
			                	userdrop();
			                }
						}

					} else {
						// Old Style
						twttr.templates.clft_dropdown = '<span class="clfnt-dropdown" onclick="clfnt_openEditor.apply(this, [{e: event, id: {{id}}, name: \'{{screen_name}}\'}]);">▼</span>';
					}
				} else {
					return true;			// 二重登録防止
				}

				var edit = document.createElement("div");
				edit.id = "clfnt-editor";
				edit.addEventListener("click", function(e) {
					e.preventDefault();
					e.stopPropagation();
				}, false);

				clfnt_openEditor = function(o) {
					o.e.preventDefault();
					o.e.stopPropagation();
					
					edit.style.left = this.offsetLeft + "px";
					edit.style.display = "";
					
					var evRequest = document.createEvent("MessageEvent");
					evRequest.initMessageEvent("CLFNT_Reset", true, false, JSON.stringify({id: o.id, name: o.name}), "", "", null);
					editController.dispatchEvent(evRequest);

					edit.appendChild(editController);
					this.appendChild(edit);
				}

				clfnt_hideEditor = function() {
					edit.style.display = "none";
				}


				var docOnClick = function(e) {
					var elm = e.target, unshowFlag = true;
					do {
						if (elm == edit) { unshowFlag = false; break; }
						elm = elm.parentNode;
					} while (elm);

					if (unshowFlag) clfnt_hideEditor();
				}
				document.addEventListener('click', docOnClick, true);

				var timerID;
				var settingStates = {};


				// Add dropdowns

				if (typeof twttr.templates.stream_tweet == "object") {
					twttr.templates.stream_tweet.r = eval("("+twttr.templates.stream_tweet.r.toString().replace(/(rp\([\"\']tweet_user_block.+?;)/, function(){ return RegExp.$1 + 'clft_dropdown(t, c, p, 1);'; })+")");
				} else {
					twttr.templates.stream_tweet = twttr.templates.stream_tweet.replace(/{{>tweet_user_block}}/, '{{>tweet_user_block}}\n{{#user}}{{>clft_dropdown}}{{/user}}');
				}
				twttr.views.StreamTweet._template = twttr.templates.stream_tweet;

				timerID = setInterval(function() {
					if (twttr.templates.simple_tweet && !settingStates.simtw) {
						// 各ツイート (Simple ... 返信先など)
						if (typeof twttr.templates.simple_tweet == "object") {
							twttr.templates.simple_tweet.r = eval("("+twttr.templates.simple_tweet.r.toString().replace(/(rp\([\"\']tweet_user_block.+?;)/, function(){ return RegExp.$1 + 'clft_dropdown(t, c, p, 1);'; })+")");
						} else {
							twttr.templates.simple_tweet = twttr.templates.simple_tweet.replace(/{{>tweet_user_block}}/, '{{>tweet_user_block}}\n{{#user}}{{>clft_dropdown}}{{/user}}');
						}
						twttr.views.SimpleTweet._template = twttr.templates.simple_tweet;
						
						settingStates.simtw = true;
					}
					
					if (twttr.templates.permalink_tweet && !settingStates.per) {
						// パーマリンク
						if (typeof twttr.templates.permalink_tweet == "object") {
							twttr.templates.permalink_tweet.r = eval("("+twttr.templates.permalink_tweet.r.toString().replace(/(rp\([\"\']tweet_user_block.+?;)/, function(){ return RegExp.$1 + 'clft_dropdown(t, c, p, 1);'; })+")");
						} else {
							twttr.templates.permalink_tweet = twttr.templates.permalink_tweet.replace(/{{>tweet_user_block}}/, '{{>tweet_user_block}}\n{{#user}}{{>clft_dropdown}}{{/user}}');
						}
						twttr.views.PermalinkTweet._template = twttr.templates.permalink_tweet;
						
						settingStates.per = true;
					}
					
					if (twttr.templates.profile_pane && !settingStates.prof) {
						// プロフィールパネル
						if (typeof twttr.templates.profile_pane == "object") {
							twttr.templates.profile_pane.r = eval("("+twttr.templates.profile_pane.r.toString().replace(/(f\([\"\']screen_name.+?;[\s\S]+?;)/, function(){ return RegExp.$1 + 'clft_dropdown(t, c, p, 1);'; })+")");
						} else {
							twttr.templates.profile_pane = twttr.templates.profile_pane.replace(/{{\^is_current_user}}/, "{{>clft_dropdown}}{{^is_current_user}}");
						}
						twttr.views.ProfilePane._template = twttr.templates.profile_pane;
						settingStates.prof = true;
					}
					if (twttr.templates.profile_follow_card && !settingStates.pfc) {
						// プロフィール個別ページ（フォローカード）
						if (typeof twttr.templates.profile_follow_card == "object") {
							twttr.templates.profile_follow_card.r = eval("("+twttr.templates.profile_follow_card.r.toString().replace(/(t\.b\([\"\'].+?<\/h2>.+?;)/, function(){ return 'clft_dropdown(t, c, p, 1);' + RegExp.$1; })+")");
						} else {
							twttr.templates.profile_follow_card = twttr.templates.profile_follow_card.replace(/<\/h2>/, "{{>clft_dropdown}}</h2>");
						}
						twttr.views.ProfileFollowCard._template = twttr.templates.profile_follow_card;
						settingStates.pfc = true;
					}
					
					if (twttr.templates.stream_user && !settingStates.stu) {
						// フォロー・フォロワー一覧など
						if (typeof twttr.templates.stream_user == "object") {
							twttr.templates.stream_user.r = eval("("+twttr.templates.stream_user.r.toString().replace(/(b\([\"\'].+?username js-action-profile-name.+?;[\s\S]+?;[\s\S]+?;)/, function(){ return RegExp.$1 + 'clft_dropdown(t, c, p, 1);'; })+")");
						} else {
							twttr.templates.stream_user = twttr.templates.stream_user.replace(/{{screen_name}}<\/span>/, "{{screen_name}}</span>{{>clft_dropdown}}");
						}
						twttr.views.StreamUser._template = twttr.templates.stream_user;
						settingStates.stu = true;
					}					

					if (settingStates.simtw && settingStates.per && settingStates.prof && settingStates.pfc && settingStates.stu) {
						clearInterval(timerID);
					}
				}, 200);

				return true;
			}
			return false;
		});

	}

	if (isChromeExtension) {
		document.addEventListener("readystatechange", function(e) {
			if (document.readyState == "interactive") clfnt();
		}, false);
	} else {
		clfnt();
	}
})();
