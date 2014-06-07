// ==UserScript==
// @name            super-rich
// @namespace       http://userscripts.org/scripts/show/68518
// @description     Enhance super-rich
// @include         http://www.kaixin001.com/!rich/market.php
// @require         http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==
var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask) {
		var dF = dateFormat;
		var	_ = "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			flags = {
				d:    d,
				dd:   pad(d),
				m:    m + 1,
				mm:   pad(m + 1),
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s)
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();
$(function(){
	GM_addStyle("#ka_msgbox {border: 2px solid #0090DF;background-color: #68BFEF;width: 250px; height: 150px;margin: 10px; }");
	GM_addStyle("table.grid {border-collapse:collapse; border:solid #999; border-width:1px 0 0 1px; }");
	GM_addStyle("table.grid caption {font-size:14px;font-weight:bolder;}");
	GM_addStyle("table.grid th,table.grid td {border:solid #999;border-width:0 1px 1px 0;padding:2px;text-align:left}");
	GM_addStyle("table.grid .highlight {background: #E6EAE9;}");
	GM_addStyle("table.grid td span.current {color: #0099CC;font-weight: bold;}");

	var $market = unsafeWindow.$market = {};		
	function showMarket() {
		var goods;
		GM_xmlhttpRequest({
			method : "GET",
			url : "http://jailu.cn/javascript/GoodsData.js",
			onload : function(xhr) {
				if (xhr.status != 200) {
					return;
				}
				xhr = xhr.responseText;
				xhr = xhr.split(/\r?\n\r?/);
				xhr = xhr.length > 3 ? xhr[3] : null;
				if ( xhr != null && xhr.match(/^goods\s/) ) {
					eval(xhr);
					$market.market = goods;
					GM_xmlhttpRequest({
						method : "GET",
						url : "http://www.kaixin001.com/!rich/index.php",
						onload : function(xhr) {
							if (xhr.status != 200) {
								return;
							}
							var config = {"亿":100000000,"万":10000,"千":1000,"百":100,"拾":10};
							function toCurrency(str) {
								var result = "";
								str = $.trim(str.substring(3,str.length -1));
								str = str.replace(/\D+/g,function(str){
									var t = 1;
									for ( var i = 0; i < str.length; i++ ) {
										t *= config[str.charAt(i)];
									}
									return "*" + t + "+"; 
								});
								eval("result = " + str + "0;");
								return result;
							}
							var result = 0;
							try {
								xhr = $(xhr.responseText).find("#zcsum li b").each(function(){
									result += toCurrency($(this).text());
								});
								$market.min = result / 40;
								if ( $market.min > 1000000000) {
									$market.min = 1000000000;
								}
								$market.maxThen = $market.min / 4;
								$market.current = result;
							}
							catch(e){
								$market.maxThen = 0;
								$market.current = 0;
								$market.min = 0;
								GM_log(e);
							}
							GM_log($market.maxThen +"/"+$market.current +"/" +$market.min );
							if ( result != 0 ) {
								for ( var i = 0; i < $market.market.length; i++ ) {
									var t = $market.market[i];
									t.skip = true;
									for ( var j = 0; j < t.goods.length; j++ ) {
										var g = t.goods[j];
										var ps = g.prices.split(",");
										var cur = parseInt(ps[0]);
										ps = parseInt(ps[ps.length-1]) - parseInt(ps[0]);
										g.skip = ps < $market.min || cur > $market.current;
										t.skip = t.skip && g.skip;
									}
								}
							}
							market();
						}
					});
				}
			}
		});
	}
	function market() {
		unsafeWindow.refreshtime = function(){
		};
		function formatPrice(val,showunit) {
			val = parseInt(val);
			var negate = false;
			if ( val < 0 ) {
				negate = true;
				val = val * -1;
			}
			var r;
			if(val < 1000) {
					r = val.toString() + (showunit === false ? "" : '元');
			}
			else if ( val < 10000 ) {
					r = (val  / 1000 ).toFixed(1) + (showunit === false ? "" : '千元');
			}
			else if(val >= 100000000) {
					r = (val / 100000000).toFixed(1) + (showunit === false ? "" : '亿元');
			}
			else {
					r = (val / 10000).toFixed(1) + (showunit === false ? "" : '万元');
			}
			if ( negate ) r = "-" + r;
			return r;
		}
		function _t(gid,seq,price) {
			return '<span' + (seq > 0 ? ' style="margin-left:5px"' : "") + ' id="showprice-'+gid+'-'+price+'" title="'+price+'">' + formatPrice(parseInt(price)) + '</span>';
		}
		var table = $(document.createElement("table"));
		var th = "<tr><th>种类</th><th>价格</th><th>购买</th><th>估算盈利</th></tr>";
		for ( var i = 0; i < $market.market.length; i++ ) {
			var t = $market.market[i];
			if ( t.skip !== true ) {
				for ( var j = 0; j < t.goods.length; j++ ) {
					var g = t.goods[j];
					if ( g.skip !== true ) {
						th += '<tr id="goods-'+g.gid+'">'
							+ '<td>' + g.name + '</td><td>';
						var ps = g.prices.split(",");
						for ( var z = 0; z < ps.length; z++ ) {
							th+=_t(g.gid,z,ps[z]);
						}
						th += '</td><td><a href="javascript:purchase('+g.gid+');">购买</a></td><td></td></tr>';
					}
				}
			}
		}
		th += '</tbody>';
		table.html(th);
		table.addClass("grid");
		$("#r2_2a .list_zc").html("");
		$("#r2_2a .mt30").remove();
		$("#r2_2a .list_zc").append(table)
		$("#r2_2a .nav_bg a").remove();
		$("#r2_2a .nav_bg")
			.append('<a href="#all" style="margin-left:50px" class="curr" title="显示所有物品">所有</a>')
			.append('<a href="#buy" title="显示所有推荐购买的物品">推荐购买</a>')
			.append('<a href="#sell" title="显示所有推荐卖出的物品">推荐卖出</a>');
		var marketList = $("#r2_2a .nav_bg a"),
			typeTest = {
				all : function(row){return true},
				buy : function(row){
					var show = row.find("span").filter(":first").hasClass("current");
					if ( !show ) {
						var profit = row.find("label").attr("title");
						show = profit && profit.length > 0 && parseInt(profit) > $market.maxThen;
					}
					return show;
				},
				sell : function(row){
					var show = row.find("span").filter(":first").hasClass("current");
					if ( !show ) {
						var profit = row.find("label").attr("title");
						show = profit && profit.length > 0 && (parseInt(profit) * -1) > $market.maxThen;
					}
					return show;
				}
		},currentType="all";
		$market.setMarket = function(type,a){
			var tr = table.find("tr:not(:first)");
			currentType = type;
			tr.each(function(){
				var row = $(this);
				if ( typeTest[type](row) ) {
					row.show();
				} else {
					row.hide();
				}
			}); 
		}
		marketList.each(function(){
			var a = $(this);
			var id = a.attr("href").match(/\#(\w+)$/);
			id = id && id.length > 1 ? id[1] : "all";
			a.attr("href","javascript:$market.setMarket('"+id+"',this)");
		});
		
		var flashTitle = (function(){
			document = document.ownerDocument || document;
			var title = document.title,cur = 0,run = false;
			return function(first){
				if ( first === true && run === true ) {
					return;
				}
				run = true;
				if ( cur > 50 ) {
					document.title = title;
					cur = 0;
					run = false;
					return ;
				}
				if ( cur++ % 2 == 0 ) {
					document.title = "【有好东西啦】" + title;
				} else {
					document.title = title;
				}
				setTimeout(flashTitle,500);
			}
		})();
		var refreshPrice = $market.refreshPrice = (function() {
			function parse(data) {
					var d = $(data);
					d.find("#r2_2a .list_zc ul a.butt1").each(function(){
					var href = $(this).attr("href");
					var img = $(this).parent().parent().find(".mb10").find("img");
					var gid = href.match(/purchase\((\d+)\,/)[1];
					var price = href.match(/\'(\d+)\'/)[1];
					var row = table.find("#goods-"+gid);
					if ( row.length > 0 ) {
						row.find("a").attr("href","javascript:purchase("+gid+",'"+price+"');");
						var span = row.find("span");
						span.filter("#showprice-"+gid+"-"+price).addClass("current");
						span.hide().filter(":first,:last,.current").show();
						var l = span.length / 2;
						l = l.toFixed(0);
						l = parseInt($(span.get(l)).attr("title"));
						price = parseInt(price);
						price = l - price;
						row.find("td:last").html('<label title="'+ price +'" class="profit">'+ formatPrice(price)+'</label>');
						row.find("img").remove();
						row.find("td:first").append(img);
						typeTest[currentType](row) ? row.show() : row.hide();
						if ( (price < 0 ? price * -1 : price) > $market.maxThen * 3 ) {
							flashTitle(true);
						}
					}
				});
				$(".h50").text("最后更新:" + dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss"));
			}
			return function() {
				table.find(".current").removeClass("current");
				table.find(".profit").remove();
				for ( var i = 0; i < $market.market.length; i++ ) {
					GM_log($market.market[i].skip + "                   " + $market.market[i].isUpdate);
					if ( $market.market[i].skip !== true && $market.market[i].isUpdate !== true ) {
						(function(){
							var t = $market.market[i];
							t.isUpdate = true;
							if ( t.goods.length > 20  ) {
								setTimeout(function() {
									$.get("/!rich/market.php?cateid="+t.cid+"&start=20"
										,{}
										,function(data){parse(data);t.isUpdate = false;}
										,"html"
										);
									},1000 * i);
							}
							setTimeout(function() {
								$.get("/!rich/market.php?cateid="+t.cid
									,{}
									,function(data){parse(data);t.isUpdate = false;}
									,"html"
									);
							},1000 * i);
						})();
					}
				}
			}
		})();
		refreshPrice();
		setInterval(refreshPrice,1000*120);
		table.addClass("grid").find("tbody tr").hover(function(){$(this).addClass("highlight")},function(){$(this).removeClass("highlight")})
	}
	showMarket();
});