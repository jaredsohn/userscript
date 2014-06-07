// ==UserScript==
// @name        GSPB - Ignore
// @description Erlaubt es User im GameStar.de-PinBoard zu ignorieren.
// @namespace   konakona@gspb
// @grant       none
// @run-at      document-end
// @updateURL   https://userscripts.org/scripts/source/182733.meta.js
// @downloadURL https://userscripts.org/scripts/source/182733.user.js
// @include     http://www.gamestar.de/community/gspinboard/showthread.php?*
// @include     http://www.gamestar.de/index.cfm?pid=832&op=240
// @icon        http://www.gamestar.de/favicon.ico
// @version     1.1.0
// ==/UserScript==
function gspbIgnoreLoader($){
if (location.pathname === "/index.cfm"){
	window.gspbIgnore = {
		list : [],
		load : function(){
			if (localStorage.gspbIgnore){
				this.list = localStorage.gspbIgnore.split(",");
			}
		},
		save : function(){
			var that = this;
			
			this.load();
			
			$("#ignorelist > li > input").each(function(){
				var parent = $(this).parent(),
					name = parent.text(),
					index = that.list.indexOf(name);
				
				if ($(this).is(":checked")){
					if (index === -1){
						that.list.push(name);
					}
				}else{
					if (index !== -1){
						that.list.splice(index,1);
					}
					parent.remove();
				}
			});
			localStorage.gspbIgnore = this.list.join();
		},
		toggle : function(elm){
			$("#ignorelist > li > input").prop("checked",$(elm).is(":checked"));
		},
		init : function(){
			this.load();
			
			if (this.list.length > 0){
				var ignorelist = '<ul id="ignorelist">',
					i;
				
				for (i=0;i<this.list.length;i++){
					ignorelist += '<li><input checked="checked" type="checkbox">' + this.list[i] + '</li>';
				}
				ignorelist += '</ul>'
				
				$("head").append('<style type="text/css">' +
				'#ignorelist{list-style:none outside none;margin:0;padding:0;}' +
				'#ignorelist:after{clear:both;content:".";display:block;height:0;visibility:hidden;}' +
				'#ignorelist li{float:left;margin-bottom:6px;margin-right:6px;width:150px;}' +
				'.com_body{padding:6px;width:482px;}' +
				'.com_body input{vertical-align:middle;}' +
				'.com_body .line{margin-bottom:10px;margin-top:10px;}' +
				'.submitrow{text-align:right;}' +
				'.submitrow label{color:#777777;font-size:10px;}' +
				'</style>');
				
				$("div.com_body").html(ignorelist).append('<div class="submitrow"><input type="button" value="Änderungen speichern" onclick="gspbIgnore.save();"><label><input type="checkbox" checked="checked" onclick="gspbIgnore.toggle(this);">Alle auswählen / Auswahl aufheben</label></div><div class="line"></div>Wenn du einen Benutzer von der Ignorier-Liste nehmen möchtest, entferne den Haken bei seinem Namen und klicke auf "Änderungen speichern".');
			}
		}
	}
}else{
	window.gspbIgnore = {
		array : {},
		list : [],
		load : function(){
			if (localStorage.gspbIgnore){
				this.list = localStorage.gspbIgnore.split(",");
			}
		},
		add : function(name){
			this.load();
			
			if (this.list.indexOf(name) === -1){
				this.list.push(name);
				localStorage.gspbIgnore = this.list.join();
			}
			
			this.hide(name);
		},
		remove : function(name){
			var that = this;
			
			this.load();
			
			var index = this.list.indexOf(name);
			
			if (index != -1){
				this.list.splice(index,1);
				localStorage.gspbIgnore = this.list.join();
			}
			
			if (typeof this.array[name] === "object"){
				this.array[name].each(function(){
					$(this).filter(that.filter).removeClass("gspbIgnore").show().prev().remove();
				});
			}
		},
		filter : function(){
			return $(this).is(".gspbIgnore");
		},
		display : function(post){
			$("#post" + post).next().filter(this.filter).removeClass("gspbIgnore").show().prev().remove();
		},
		hide : function(name){
			if (typeof this.array[name] !== "object"){
				return;
			}
			
			this.array[name].each(function(){
				if ($(this).is(".gspbIgnore")){
					return true;
				}
				
				var $clone = $(this).clone(),
					$trs = $("> tbody > tr",$clone),
					post = $clone.attr("id").substr(4),
					$tds,
					url;
				
				$(this).addClass("gspbIgnore").before($clone).hide();
				
				$clone.find("[id]").removeAttr("id");
				
				url = $("#postmenu_" + post + " > a").attr("href");
				
				$tds = $trs.eq(0).attr("title","Beitrag " + post).find("> td");
				$tds.eq(1).remove();
				$tds.eq(0).prepend('<a onclick="gspbIgnore.display(' + post + ');return false;" target="_blank" href="http://www.gamestar.de/community/gspinboard/showpost.php?p=' + post + '" style="float:right">Beitrag anzeigen</a>');
				
				$trs.eq(1).removeAttr("valign style").html('<td class="alt2" style="padding:6px;border:1px solid #ededed;"><div style="float:right" class="smallfont"><a href="javascript:gspbIgnore.remove(\'' + name + '\');">Benutzer von Ignorier-Liste entfernen</a></div><a href="http://www.gamestar.de/community/gspinboard/' + url + '">' + name + '</a></td>');
				$trs.eq(2).html('<td class="alt1" style="padding:6px;border:1px solid #ededed;"><div class="smallfont">Diese Nachricht wird nicht angezeigt, da sich <strong>' + name + '</strong> auf deiner <a target="_blank" href="http://www.gamestar.de/index.cfm?pid=832&amp;op=240">Ignorier-Liste</a> befindet.</div></td>');
			});
		},
		init : function(){
			var that = this;
			
			$("div[id^='postmenu_']").each(function(){
				var name = $(this).text().trim();
				
				if (typeof that.array[name] == "undefined"){
					that.array[name] = $();
				}
				that.array[name].push($(this).closest("table").get(0));
				$(this).parent().children("span.pCardMgn:last,div.smallfont:last").first().before('<a style="display:block;font-size:11px;font-weight:normal;margin:5px 0;" title="Ignorieren" href="javascript:gspbIgnore.add(\'' + name + '\');">&#187; Ignorieren</a>');
			});
			
			this.load();
			$.each(this.list,function(i,name){
				that.hide(name);
			});
		}
	};
}
window.gspbIgnore.init();
}

if (typeof jQuery !== "function"){
	//jQuery loader: http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
	var script = document.createElement("script");
	script.setAttribute("src","http://code.jquery.com/jquery-2.0.3.min.js");
	script.addEventListener("load",function(){
		var script = document.createElement("script");
		script.textContent = "(" + gspbIgnoreLoader.toString() + ")(jQuery);";
		document.body.appendChild(script);
	},false);
	document.body.appendChild(script);
}else{
	gspbIgnoreLoader(jQuery);
}