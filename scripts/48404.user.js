// ==UserScript==
// @name           High Comment Nicouser
// @author         favril
// @namespace      http://script41self.seesaa.net/
// @description    コメント数の多い(10以上)ユーザを表示するスクリプト
// @version        0.1.5
// @include        http://www.nicovideo.jp/watch/*
// @require        http://script41self.up.seesaa.net/user_js/nicoapiresult.js
// ==/UserScript==

(function(){
	var th = 10; // 閾値

	var main_field = document.createElement("div");
	main_field.style.marginBottom = "30px";
	var tbl = document.createElement("table");
	tbl.setAttribute("width", "100%");
	tbl.setAttribute("cellspacing", 4);
	tbl.setAttribute("cellpadding", 0);
	tbl.setAttribute("border", 0);
	main_field.appendChild(tbl);
	var tbody = document.createElement("tbody");
	tbl.appendChild(tbody);
	var row = document.createElement("tr");
	tbody.appendChild(row);
	var cell = document.createElement("td"); // 後でこのcellに子要素追加
	cell.innerHTML = "<strong>コメント解析: </strong>Loding...";
	row.appendChild(cell);

	var footer = document.getElementById("WATCHFOOTER");
	var inpos  = footer.getElementsByTagName("p")[0].nextSibling;
	inpos.parentNode.insertBefore(main_field, inpos);

/*
	// flash からAPI情報をゲット
	var initialize_timer = setInterval(function() {
		var movie_info = unsafeWindow.document.getElementById("flvplayer").GetVariable("o");
		if(typeof movie_info != "undifined") {
			clearInterval(initialize_timer);
			parseInfo(movie_info);
		}
	}, 5000);
*/

	var result = new NicoApiResult();
	result.ready(function () {

/*
		var data = info.split("&");
		var thread_id, vlen, ms;
		for(var i=0; i<data.length; i++) {
			var pair = data[i].split("=");
			var param = decodeURIComponent(pair[0]);
			if(param == "thread_id")
				thread_id = decodeURIComponent(pair[1]);
			else if(param == "l")
				vlen = decodeURIComponent(pair[1]);
			else if(param == "ms")
				ms = decodeURIComponent(pair[1]);
		}
*/
		var result = window.GM_NicoApiResult;
		var thread_id = result.thread_id;
		var vlen = parseInt(result.l);
		var ms = decodeURIComponent(result.ms);

		var vlen_flag = (vlen < 6000) ? true : false; //true:0-99分, false:100分-
		
		// コメント件数で閾値変えるのもいいかもねー
		var comment_num = 1000;
		if(vlen < 60) {
			// 1分未満なら100件
			comment_num = 100;
		} else if(vlen < 300) {
			// 5分未満なら250件
			comment_num = 250;
		} else if(vlen < 600) {
			// 5分以上，10分未満で500件
			comment_num = 500;
		}/* else {
			// 10分以上なら1000件
			comment_num = 1000;
		}*/
		
		GM_xmlhttpRequest({
			method: "POST",
			headers: {
				"User-Agent": "Mozilla/5.0 Greasemonkey (High Comment Nicouser)",
				"Content-type": "text/xml"
			},
			url: ms,
			data: "<thread res_from='-" + comment_num + "' version='20061206' thread='" + thread_id + "' />",
			onload: function(res) {
				var users = {};
				var comments = res.responseText.match(/<chat [^>]+>[^<]+<\/chat>/g);
				for(var i=0; i<comments.length; i++) {
					comments[i].match(/user_id="(.+?)".+?vpos="(\d+)">([^<]+)<\/chat>/);
					var uid = RegExp.$1;
					var vp = RegExp.$2;
					var cm = RegExp.$3;
					//console.log(uid + ", " + vp + ", " + cm + ", " + comments[i]);
					var ml = "";
					if(/mail="(.+?)"/.test(comments[i])) {
						ml = RegExp.$1;
					}
					
					if(typeof users[uid] == "undefined") {
						// 初期化
						users[uid] = new Array();
					}
					users[uid][users[uid].length] = new com_data(vp, ml, cm);
				}
				
				// コメント数でユーザをsort
				var idx = [];
				var i = 0;
				for(var key in users) {
					if(users[key].length >= th) {
						idx[i] = key;
						i++;
					}
				}
				
				idx.sort(function(b1, b2){
					return (users[b1].length < users[b2].length) ? 1 : -1;
				});
				
				
				var add_html = "<form name=\"users_form\"><div style=\"margin-left:30px; margin-top:20px;\"><p class=\"TXT14\">◆ ユーザIDのクリックで，そのユーザのコメントの表示/非表示を切り替えます。</p><br />　　　<strong>ユーザID</strong>　　　　　　　　　　　　　　　　　　　　 　<strong>コメント数（率）</strong><hr align=\"left\" width=\"500\" />";
				for(i=0; i<idx.length; i++) {
					var key = idx[i];
					
					// vposでsort
					for(var j=0; j<users[key].length-1; j++) {
						for(var k=j; k<users[key].length-1; k++) {
							if(users[key][j].vpos > users[key][k+1].vpos) {
								var tmp = users[key][j];
								users[key][j] = users[key][k+1];
								users[key][k+1] = tmp;
							}
						}
					}
					
					add_html += "<input class=\"HCN_input\" type=\"text\" onClick=\"javascript:document.users_form.user_" + i + ".focus(); document.users_form.user_" + i + ".select(); HCN_tgl('HCN_tgl_" + i + "');\" onMouseover=\"document.users_form.user_" + i + ".focus(); document.users_form.user_" + i + ".select();\" value=\"" + key + "\" name=\"user_" + i + "\" readonly=\"true\" /><strong>" + users[key].length + "</strong> / " + comments.length + " (<strong>" + ( (users[key].length * 100) / comments.length ).toFixed(1) + "</strong> %)<br />";
					add_html += "<div id=\"HCN_tgl_" + i + "\" class=\"HCN_div\">";
					for(var j=0; j<users[key].length; j++) {
						// comment time
						var vpos = Math.floor(users[key][j].vpos / 100);
						var sec = "00" + vpos % 60;
						var min = Math.floor(vpos / 60);
						min = (vlen_flag) ? "00"+min : "000"+min;
						var time = (vlen_flag) ? min.substring(min.length - 2)+":" : min.substring(min.length - 3)+":";
						time += sec.substring(sec.length - 2);
						add_html += "（" + time + "）　";
						
						var fontsize = "";
						if(users[key][j].fontsize == "big") fontsize = "size='5' ";
						else if(users[key][j].fontsize == "small") fontsize = "size='2' ";
						add_html += "<font " + fontsize + "color='" + users[key][j].fontcolor + "'><strong>" + users[key][j].comment + "</strong></font><br />";
					}
					add_html += "</div><br />";
				}
				add_html += "</div></form>";
				
				var main_div = document.createElement("div");
				if(idx.length == 0) {
					// コメント数が閾値以上のユーザ無し
					var span = document.createElement("span");
					span.setAttribute("class", "TXT12");
					span.innerHTML = "この動画にコメント数の多いユーザはいません。";
					
					cell.innerHTML = "<strong>コメント解析: </strong>";
					cell.appendChild(span);
					
				} else {
					var toggle = document.createElement("a");
					toggle.setAttribute("title", "open");
					toggle.href = "javascript:void(0);";
					toggle.innerHTML = "[コメント数の多いユーザを見る]";
					toggle.addEventListener("click",
						function(){
							if(main_div.style.display == "none") {
								// open
								main_div.style.display = "block";
								toggle.innerHTML = "[コメント解析を隠す]";
								toggle.setAttribute("title", "close");
							} else {
								// close
								main_div.style.display = "none";
								toggle.innerHTML = "[コメント数の多いユーザを見る]";
								toggle.setAttribute("title", "open");
							}
						}, false);
					cell.innerHTML = "<strong>コメント解析: </strong>";
					cell.appendChild(toggle);
					
					main_div.style.display = "none";
					main_div.innerHTML = add_html;
					
					
					GM_addStyle(<><![CDATA[
						.HCN_div {
							width: 100%;
							height: 200px;
							overflow: auto;
							display: none;
							background-color: #BBB;
							border: solid 2px #888;
							margin-top: 5px;
						}
						
						.HCN_input {
							border:0px;
							width:330px;
							font-size:large;
							font-weight:bold;
						}
					]]></>);
				}
				
				row = document.createElement("tr");
				tbody.appendChild(row);
				cell = document.createElement("td");
				cell.setAttribute("colspan", 2);
				cell.appendChild(main_div);
				row.appendChild(cell);
				
			}, //call_api
			onerror: function(res){ GM_log(res.status + ":" + res.statusText); }
		});
	}); //parseInfo

	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.innerHTML = "function HCN_tgl(elem_id) { var elem = document.getElementById(elem_id); if(elem.style.display == \"block\") elem.style.display = \"none\"; else elem.style.display = \"block\"; }";
	footer.parentNode.insertBefore(script, footer);


	function com_data(vpos, mail, comment) {
		this.vpos = parseInt(vpos);
		this.comment = comment;
		this.fontsize = "medium"; //default
		this.fontcolor = "#FFFFFF"; //default
		
		var commands = mail.split(" ");
		if(!commands) return;
		for(var i=0; i<commands.length; i++) {
			var cmnd = commands[i].toLowerCase(); //一応
		
			// font size
			if(cmnd == "big" || cmnd == "small") this.fontsize = cmnd;
			
			// font color
			if(cmnd == "niconicowhite" || cmnd == "white2") this.fontcolor = "#CCCC99";
			else if(cmnd == "red") this.fontcolor = "#FF0000";
			else if(cmnd == "truered" || cmnd == "red2") this.fontcolor = "#CC0033";
			else if(cmnd == "pink") this.fontcolor = "#FF8080";
			else if(cmnd == "orange") this.fontcolor = "#FFCC00";
			else if(cmnd == "passionorange" || cmnd == "orange2") this.fontcolor = "#FF6600";
			else if(cmnd == "yellow") this.fontcolor = "#FFFF00";
			else if(cmnd == "madyellow" || cmnd == "yellow2") this.fontcolor = "#999900";
			else if(cmnd == "green") this.fontcolor = "#00FF00";
			else if(cmnd == "elementalgreen" || cmnd == "green2") this.fontcolor = "#00CC66";
			else if(cmnd == "cyan") this.fontcolor = "#00FFFF";
			else if(cmnd == "blue") this.fontcolor = "#0000FF";
			else if(cmnd == "marineblue" || cmnd == "blue2") this.fontcolor = "#33FFFC";
			else if(cmnd == "purple") this.fontcolor = "#C000FF";
			else if(cmnd == "nobleviolet" || cmnd == "purple2") this.fontcolor = "#6633CC";
			else if(cmnd == "black") this.fontcolor = "#000000";
		}
	}

})();