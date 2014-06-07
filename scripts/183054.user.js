// ==UserScript==
// @name        Steam - Overall Enhancement UE
// @description Overall Enhancement for the Steam store.
// @namespace   konakona@gspb
// @grant       none
// @run-at      document-end
// @updateURL   https://greasyfork.org/scripts/391/code.meta.js
// @downloadURL https://greasyfork.org/scripts/391/code.user.js
// @include     http://store.steampowered.com*
// @include     https://store.steampowered.com*
// @icon        http://store.steampowered.com/favicon.ico
// @version     0.1.3.1
// ==/UserScript==
function stmEnhncmntLoader($,$$){
var stmEnhncmnt = {
	fn : [],
	settings : {},
	url : "",
	number : {
		sign : /(R\$|\$|€|£|pуб\.)/,
		price : /\d+([,.]{1}\d+)?/,
		format : function(preis,original){
			return original.replace(this.price,preis.toFixed(2).replace(".",{"€":",","$":".","£":".","pуб.":",","R$":","}[original.match(this.sign)[0]]));
		}
	},
	exec : function(){
		var l = this.fn.length,
			i;
		for (i=0;i<l;i++){
			this[this.fn[i]].init();
		}
	},
	alert : function(title,content){
		var modal = ShowAlertDialog(title,content);
		modal.GetContent().css("min-width",230).find(".newmodal_content").css("text-align","center");
		modal.AdjustSizing();
	},
	getURL : function(cc){
		if (this.empty(this.url)){
			this.url = location.href.replace(/([?&]cc=[a-z]{2}|#.*)/gi,"");
			this.url += this.url.include("?")?"&amp;":"?";
		}
		return this.url + 'cc=' + cc + location.hash;
	},
	load : function(){
		if (localStorage.stmEnhncmnt){
			$.extend(this.settings,JSON.parse(localStorage.stmEnhncmnt));
		}
	},
	save : function(value){
		if (value !== undefined){
			this.settings[value] = !this.settings[value];
		}
		localStorage.stmEnhncmnt = JSON.stringify(this.settings);
	},
	cookie : {
		get : function(name){
			return document.cookie.match(new RegExp(" ?" + name + "=([^;]+)"))?RegExp.$1.toLowerCase():false;
		},
		set : function(name,value){
			document.cookie = name + "=" + value + ";expires=" + (value?new Date(new Date().getTime()+5356800000).toUTCString():"Thu, 01-Jan-1970 00:00:01 GMT") + ";path=/";
		}
	},
	empty : function(v){
		var k;
		if ((v === "")||(v === null)||(v === false)||(v === 0)||(v === "0")||(v === undefined)){
			return true;
		}
		if (typeof v === "object"){
			for (k in v){
				if (v.hasOwnProperty(k)){
					return false;
				}
			}
			return true;
		}
		return false;
	},
	createMenu : function(id,afterId,mouseEvent){
		return $('<div style="display:none;" id="' + id + '" class="popup_block"' + (mouseEvent?' onmouseout="HideFlyoutMenu(event,\'' + afterId + '\',\'' + id + '\');"':'') + '><div class="shadow_ul"></div><div class="shadow_top"></div><div class="shadow_ur"></div><div class="shadow_left"></div><div class="shadow_right"></div><div class="shadow_bl"></div><div class="shadow_bottom"></div><div class="shadow_br"></div><div class="iepopupfix"><img alt="" src="http://cdn.store.steampowered.com/public/images/blank.gif" class="iepopupfix_img"></div><div class="popup_body popup_menu shadow_content"></div></div>').insertAfter("#" + afterId).find("> div.popup_body");
	},
	init : function(){
		this.settings = {
			agecheck : true,
			filter_dlc : true,
			price_check : true,
			region : true
		};
		
		this.load();
		
		if ((this.settings.regions === undefined)&&(location.host === "store.steampowered.com")){
			this.settings.regions = {
				us : "USA",
				gb : "UK",
				ru : "Russia",
				ua : "Ukraine",
				br : "Brazil",
				de : "Germany",
				no : "Norway",
				au : "Australia"
			};
			if (localStorage.stmRegionMenu){
				$.extend(this.settings.regions,JSON.parse(localStorage.stmRegionMenu));
				delete localStorage.stmRegionMenu;
			}
			this.save();
		}
		
		if (location.pathname.include("/checkout")){
			return;
		}
		
		$("head").append('<style type="text/css">' +
		'#stmEnhncmnt-t-dropdown .popup_menu_item > input{cursor:pointer;margin:0;position:static;top:auto;vertical-align:middle;}' +
		'.popup_menu_item{-moz-user-select:none;-webkit-user-select:none;user-select:none;}' +
		'#stmEnhncmnt-t-menu{display:inline-block;line-height:19px;margin:1px;padding-left:4px;}' +
		'#stmEnhncmnt-t-menu.focus{border:1px solid #82807C;color:#FFFFFF;margin:0;}' +
		'#stmEnhncmnt-t-cdrdropdown .popup_body{white-space:nowrap;}' +
		'.popup_body a{text-decoration:inherit;}' +
		'.subIdInfo{color:#FFFFFF;cursor:help;font-size:9px;position:absolute;right:2px;top:21px;}' +
		'.helpCursor{cursor:help;}' +
		'.stmdlc-s-red{color:#df0023;}.stmdlc-s-blue{color:#1c86ee;}' +//Thanks, diabLo-Designz, for picking the colors. :)
		'#price-check{margin:0 auto;}' +
		'#price-check th,td{padding:0 2px;white-space:nowrap;}' +
		'#price-check tr th:nth-last-child(-n+3){text-align:right;}' +
		'#price-check tr td:nth-last-child(-n+3){text-align:right;}' +
		'#price-check tr th:nth-child(2){text-align:left;}' +
		'#price-check tr td:nth-child(2){text-align:left;}' +
		'#price-check .center{text-align:center !important;}' +
		'h1.hover_item_name a{color:inherit;}' +
		'h1.hover_item_name img{vertical-align:middle;}' +
		'</style>');
		
		$("#account_pulldown,#language_pulldown").first().before('<span onclick="ShowMenu(this,\'stmEnhncmnt-t-dropdown\',\'right\',\'bottom\',true);" id="stmEnhncmnt-t-menu" class="pulldown global_action_link">Preferences</span>&nbsp;|&nbsp;');
		
		var actions = [];
		actions.push(["Activate DLC filtering?","Filters out owned DLCs.","filter_dlc"]);
		actions.push(["Activate region dropdown menu?","Implements a region dropdown menu.","region"]);
		actions.push(["Activate ID and price comparison?","Compares the IDs and prices from different regions.","price_check"]);
		actions.push(["Skip age check?","Skips the age check.","agecheck"]);
		
		this.createMenu("stmEnhncmnt-t-dropdown","stmEnhncmnt-t-menu",false).html(
			actions.map(function(value){
				if (typeof value === "string"){
					return '<div class="header_notification_dropdown_seperator"></div>';
				}
				return '<label class="popup_menu_item" title="' + value[1] + '"' + ((value[2]==="filter_games")?' id="stmEnhncmnt-t-filtermenu"':((value[2]==="directlinks")?' id="stmEnhncmnt-t-cregionmenu"':'')) + '><input type="checkbox" id="stmEnhncmnt-i-' + value[2] + '"' + (this.settings[value[2]]?' checked="checked"':'') + ' onclick="stmEnhncmnt.save(\'' + value[2] + '\');">&nbsp;' + value[0] + '</label>';
			},this).join("")
		);
	}
};
stmEnhncmnt.init();


//Config
var target = "_blank";

//Altersüberprüfung überspringen, Teil 1
if (stmEnhncmnt.settings.agecheck){
	stmEnhncmnt.cookie.set("birthtime",441792001);
	stmEnhncmnt.cookie.set("lastagecheckage","1-January-1984");
}

//CC & fakeCC
var cc = stmEnhncmnt.cookie.get("steamCC_[^=]+"),
	fakecc = stmEnhncmnt.cookie.get("fakeCC"),
	currentcc,path;
if (cc === fakecc){
	stmEnhncmnt.cookie.set("fakeCC");
	fakecc = false;
}
currentcc = fakecc || cc;

//Region-Auswahlmenü
if ((stmEnhncmnt.settings.region)&&(!location.pathname.include("/checkout"))){
	stmEnhncmnt.fn.push("regionMenu");
	stmEnhncmnt.regionMenu = {
		add : function(elm,e){
			e.preventDefault();
			
			var cc = prompt("Input the 2-digit country code:").trim().toLowerCase(),
				name;
			
			if (stmEnhncmnt.empty(cc)){
				return;
			}
			if (!/^[a-z]{2}$/i.test(cc)){
				alert("The country code has to be 2-digit and must only contain letters.");
				return;
			}
			if (stmEnhncmnt.empty((name = prompt("Input the name of the country:").trim()))){
				return;
			}
			if (/"/.test(name)){
				alert("Quotation marks are forbidden.");
				return;
			}
			
			$('<a class="popup_menu_item" href="' + stmEnhncmnt.getURL(cc) + '"><img alt="" src="http://cdn.steamcommunity.com/public/images/countryflags/' + cc + '.gif"> ' + name + '<span onclick="stmEnhncmnt.regionMenu.remove(this,event);" title="Delete?">X</span></a>').insertBefore(elm);
			
			stmEnhncmnt.settings.regions[cc] = name;
			stmEnhncmnt.save();
		},
		remove : function(elm,e){
			e.preventDefault();
			
			if (!confirm("Do you really want to delete the entry?")){
				return;
			}
			
			var cc = elm.previousElementSibling.src.substr(-6,2);
			
			stmEnhncmnt.load();
			if (stmEnhncmnt.settings.regions[cc] !== undefined){
				delete stmEnhncmnt.settings.regions[cc];
				stmEnhncmnt.save();
			}
			
			$(elm).parent().remove();
		},
		init : function(){
			var maxLength = $$("store_search").offsetLeft,
				html = "",
				cc;
			
			$("head").append('<style type="text/css">' +
			'#region_flyout{top:55px;}#region_tab{position:relative;z-index:300;}#region_tab,#region_tab .pulldown{cursor:default;}' +
			'#region_flyout img{vertical-align:middle;}' +
			'#region_flyout .popup_menu_item > span{color:#df0023;display:none;float:right;margin-right:-9px;}' +
			'#region_flyout .popup_menu_item:hover > span{display:block;}' +
			'</style>');
			$(".store_nav:first > .tab:last").after('<div onmouseout="HideFlyoutMenu(event,\'region_tab\',\'region_flyout\');" onmouseover="FlyoutMenu(\'region_tab\',\'region_flyout\',\'left\',\'bottom\');" id="region_tab" class="tab"><span class="pulldown">Region <img alt="" src="http://cdn.steamcommunity.com/public/images/countryflags/' + currentcc + '.gif"><span></span></span></div>');
			
			for (cc in stmEnhncmnt.settings.regions){
				html += '<a class="popup_menu_item' + ((currentcc === cc)?' currentcc':'') + '" href="' + stmEnhncmnt.getURL(cc) + '"><img alt="" src="http://cdn.steamcommunity.com/public/images/countryflags/' + cc + '.gif"> ' + stmEnhncmnt.settings.regions[cc] + '<span onclick="stmEnhncmnt.regionMenu.remove(this,event);" title="Delete?">X</span></a>';
			}
			html += '<a class="popup_menu_item" href="#" onclick="stmEnhncmnt.regionMenu.add(this,event);" style="font-size:0.8em;text-align:center;">Add...</a>';
			
			stmEnhncmnt.createMenu("region_flyout","region_tab",true).html(html);
			
			$("#region_flyout .popup_menu_item").on("click","> span",stmEnhncmnt.regionMenu.remove.bind(this));
			
			var region = $$("region_tab"),
				tab = $(".store_nav:first > .tab"),
				tabs = tab.length * 2 - $("> .pulldown",tab).length,
				padding = Math.floor((maxLength - ((region.offsetLeft + 101) - tabs * parseInt(region.firstElementChild.getStyle("padding-left")))) / tabs);
			
			$("head").append('<style type="text/css">.store_nav .tab > span{padding:0 ' + padding + 'px;}</style>');
		}
	};
}

path = location.pathname.match(/\w+/);
path = path?path[0]:"";//#!RegExp?
switch (path){
	case "app":
		//DLCs filtern
		if (stmEnhncmnt.settings.filter_dlc){
			stmEnhncmnt.fn.push("filter_dlc");
			stmEnhncmnt.filter_dlc = {
				settings : [],
				text : "",
				total : 0,
				element : [],
				get : function(){
					if (localStorage.filterDLC){
						this.settings = localStorage.filterDLC.split(",");
					}
				},
				save : function(appID,add){
					this.get();
					var index = this.settings.indexOf(appID);
					if (add){
						if (index === -1){
							this.settings.push(appID);
						}
					}else{
						if (index !== -1){
							this.settings.splice(index,1);
						}
					}
					localStorage.filterDLC = this.settings.join();
				},
				price : function(elm,add){
					if (!$(".game_area_dlc_price,.game_area_dlc_price .discount_final_price",elm).last().text().trim().replace(/-/g,"0").replace(",",".").match(stmEnhncmnt.number.price)){
						return;
					}
					
					this.total += parseFloat(RegExp["$&"]) * (add?1:-1);
					
					this.element.text(stmEnhncmnt.number.format(this.total,this.text));
				},
				click : function(elm,e){
					if (!e.ctrlKey){
						return;
					}
					e.preventDefault();
					
					var appID = elm.id.slice(8),
						$elm = $(elm);
					
						if ($elm.data("state")){
							$elm
								.data("state",false)
								.find(".game_area_dlc_ajax")
								.removeClass("stmdlc-s-blue")
								.addClass("stmdlc-s-red")
								.html("&#x2718;");
							
							if (!$("input",elm).length){
								$elm.append($elm.data("input")).removeData("input");
							}
							this.save(appID,false);
							this.price(elm,true);
						}else{
							if (!this.settings.include(appID)){
								$elm
									.data({
										state : true,
										input : $("input",elm).detach()
									})
									.find(".game_area_dlc_ajax")
									.removeClass("stmdlc-s-red")
									.addClass("stmdlc-s-blue")
									.html("&#x2714;");
								
								this.save(appID,true);
								this.price(elm,false);
							}
						}
				},
				init : function(){
					var form = $("form[name='add_all_dlc_to_cart']");
					
					if (
						!form.length
						||!g_AccountID
						||(!(
							$(".game_area_already_owned").length
							||$$("review_container")
							||($("div.game_purchase_price.price:first").text().trim().toLowerCase() === "free to play")
							||/^steam:/.test($("a.btn_addtocart_content:first").attr("href"))
						))
					){
						return;
					}
					
					$("head").append('<style type="text/css">' +
					'.game_area_dlc_price{right:18px;}' +
					'.game_area_dlc_ajax{position:absolute;right:0;height:16px;width:16px;}' +
					'.stmdlc-s-cursor{cursor:pointer;}' +
					'</style>');
					
					var that = this,
						appIDs = [];
					
					this.element = $("#dlc_purchase_action .game_purchase_price.price");
					this.text = this.element.text().trim();
					this.element.text(stmEnhncmnt.number.format(0,this.text));
					this.get();
					
					$("a[id^='dlc_row_']")
						.prepend('<div class="game_area_dlc_ajax"><img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAB8fH7CurEBAP4qIh7CurHd1dGRjYltaWiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="></div>')
						.attr("onclick","stmEnhncmnt.filter_dlc.click(this,event);")
						.data("state",true)//true:rot false:blau
						.each(function(){
							var elm = $(this),
								id = this.id.slice(8);
							
							if (!that.settings.include(id)){
								appIDs.push(id);
								that.price(elm,true);
							}else{
								elm
									.data("input",$("input",elm).detach())
									.find(".game_area_dlc_ajax")
									.addClass("stmdlc-s-blue")
									.html('&#x2714;');
							}
						});
					
					if (appIDs.length === 0){
						return;
					}
					
					$.ajax({
						type : "GET",
						url : "/api/appuserdetails/?appids=" + appIDs.join(),
						dataType : "json",
						success : function(data){
							$.each(data,function(appID,appData){
								var elm = $("#dlc_row_" + appID);
								
								if (!appData.success){
									elm.data("state",true).find(".game_area_dlc_ajax").html("?");
									return true;
								}
								
								if (appData.data.is_owned){
									elm
										.data({
											state : true,
											input : $("input",elm).detach()
										})
										.find(".game_area_dlc_ajax")
										.addClass("stmdlc-s-blue")
										.html("&#x2714;");
									
									that.save(appID,true);
									that.price(elm,false);
								}else{
									elm.data("state",false).find(".game_area_dlc_ajax").addClass("stmdlc-s-red").html("&#x2718;");
								}
							});
						},
						error : function(){
							appIDs.each(function(appID){
								$("#dlc_row_" + appID).data("state",true).find(".game_area_dlc_ajax").html("?");
							});
						}
					});
				}
			};
		}
		break;
	case "agecheck":
		//Altersüberprüfung überspringen, Teil 2
		if (stmEnhncmnt.settings.agecheck){
			$("[name='ageYear']").val(1984);
			$("form:eq(1)").submit();
		}
		break;
}

if (["","app","cart","dlc","sale","sub"].include(path)){
	//ID- & Preisvergleich
	if (stmEnhncmnt.settings.price_check){
		stmEnhncmnt.fn.push("subIdInfo");
		stmEnhncmnt.subIdInfo = {
			list : {},
			regions : {},
			regex : {
				name : /(.+) - +(.*)/,
				appendix : / *(\([a-z]{2,3}\)|\(?[a-z]{2,3}\s*[+\/]\s*[a-z]{2,3}\)?|RU|CIS|ROW|USD)$/i
			},
			compare : function(str1,str2){
				str1 = str1.replace(/ /g,"").toLowerCase();
				str2 = str2.replace(/ /g,"").toLowerCase();
				var str1_length = str1.length,
					str2_length = str2.length,
					distance,str1_pos,str2_pos,str1_char,str2_char,diagonal1,diagonal2,cost;
				
				if (str1_length === 0){
					return str2_length;
				}
				if (str2_length === 0){
					return str1_length;
				}
				if (str1 === str2){
					return 0;
				}
				distance = $A($R(1,str2_length + 1));
				for (str1_pos=1;str1_pos<=str1_length;++str1_pos){
					diagonal1 = str1_pos - 1;
					str1_char = str1[diagonal1];
					distance[0] = str1_pos;
					for (str2_pos=1;str2_pos<=str2_length;++str2_pos){
						str2_char = str2[str2_pos - 1];
						cost = (str1_char === str2_char)?0:1;
						diagonal2 = distance[str2_pos];
						distance[str2_pos] = [
							distance[str2_pos] + 1,
							distance[str2_pos - 1] + 1,
							diagonal1 + cost
						].min();
						diagonal1 = diagonal2;
					}
				}
				return distance[str2_length];
			},
			display : function(subID,modal){
				if (modal === undefined){
					modal = this.dialog();
				}else{
					if (!modal.m_bVisible){
						return;
					}
				}
				
				var content = modal.GetContent(),
					masterSub = this.list[subID],
					html = '<table id="price-check"><thead><tr><th>&nbsp;</th><th>Region</th><th>subID</th><th>Price</th><th>in ' + masterSub.currency + '</th></tr></thead><tbody>',
					cc;
				
				content.find(".newmodal_header").contents()[0].textContent = masterSub.name;
				
				html += '<tr><td><img alt="" src="http://cdn.steamcommunity.com/public/images/countryflags/' + currentcc + '.gif"></td><td><a href="' + stmEnhncmnt.getURL(currentcc) + '">' + (stmEnhncmnt.settings.regions[currentcc] || "Current") + '</a></td><td><a class="stmdlc-s-blue" href="http://steamdb.info/sub/' + subID + '/" target="_blank">' + subID + '</a></td><td>' + masterSub.price + '</td><td>' + masterSub.price + '</td></tr>';
				
				$.each(masterSub.regions,function(cc){
					html += '<tr><td><img alt="" src="http://cdn.steamcommunity.com/public/images/countryflags/' + cc + '.gif"></td><td><a href="' + stmEnhncmnt.getURL(cc) + '">' + this.name + '</a></td><td';
					switch (this.status){
						case -1:
							html += ' colspan="3" class="center">Loading...';
							break;
						case 0:
							html += '><a class="' + ((this.subID == subID)?'stmdlc-s-blue':'stmdlc-s-red') + '" href="http://steamdb.info/sub/' + this.subID + '/" target="_blank">' + this.subID + '</a></td><td>' + this.price + '</td><td>' + (this.conversion || this.price);
							break;
						case 1:
							html += ' colspan="3" class="center">Not found';
							break;
						case 2:
							html += ' colspan="3" class="center">Not available';
							break;
						case 3:
							html += ' colspan="3" class="center">Not loading';
							break;
					}
					html += '</td></tr>';
				});
				
				html += '</tbody></table>';
				
				content.find(".newmodal_content").html(html);
				modal.AdjustSizing();
			},
			dialog : function(){
				var modal = ShowDialog("Loading comparison...",'<img alt="Loading..." src="http://cdn.steamcommunity.com/public/images/login/throbber.gif">');
				modal.GetContent().css("min-width",230).find(".newmodal_content").css("text-align","center");
				return modal;
			},
			getRegion : function(masterSub,appID,subID,url,modal,cc,region){
				var that = this;
				
				$.getJSON(url + cc,function(data){
					if (data && data[appID].success){
						if (!data[appID].data.package_groups.length){
							region.status = 1;
							that.display(subID,modal);
							return;
						}
						
						var subs = data[appID].data.package_groups[0].subs,
							closest = -1,
							best = {},
							length = subs.length,
							i,distance,info;
						
						for (i=0;i<length;i++){
							info = subs[i].option_text.match(that.regex.name).slice(1).invoke("trim").invoke("replace",that.regex.appendix,"");
							if (stmEnhncmnt.empty(info[1])){
								continue;
							}
							info[1] = info[1].replace(/-/g,"0");
							
							distance = that.compare(info[0],masterSub.name);
								
							if ((subs[i].packageid == subID)||(distance === 0)){
								closest = 0;
								best.price = info[1];
								best.subID = subs[i].packageid;
								break;
							}
							
							if ((distance < closest)||(closest < 0)){
								closest = distance;
								best.price = info[1];
								best.subID = subs[i].packageid;
							}
						}
						
						if ((closest === 0)||(closest === 1)){
							region.status = 0;
							region.price = best.price;
							region.currency = region.price.match(stmEnhncmnt.number.sign)[0];
							region.subID = best.subID;
							
							if (masterSub.currency !== region.currency){
								region.conversion = stmEnhncmnt.number.format(parseFloat(region.price.match(stmEnhncmnt.number.price)[0].replace(",",".")) * that.currency[region.currency][masterSub.currency],masterSub.price);
							}
						}
						else{
							region.status = 1;
						}
					}
					else{
						region.status = 2;
					}
					
					that.display(subID,modal);
				}).fail(function(){
					region.status = 3;
					that.display(subID,modal);
				});
			},
			load : function(appID,subID){
				if (this.list[subID] === undefined){
					this.list[subID] = {
						regions : $.extend(true,{},this.regions)
					};
					
					var that = this,
						modal = this.dialog(),
						content = modal.GetContent(),
						masterSub = this.list[subID],
						deferred = $.Deferred(),
						error = function(){
							delete that.list[subID];
							content.find(".newmodal_header").contents()[0].textContent = "Error!";
							content.find(".newmodal_content").html("Couln’t load the ID and price comparison,<br>the neccesary information from the region '" + currentcc.toUpperCase() + "' couldn’t be loaded.<br><br>Just try again later. :)");
							modal.AdjustSizing();
						};
					
					if (appID === 0){
						$.getJSON("/api/packagedetails/?packageids=" + subID + "&cc=" + currentcc,function(data){
							if (data && data[subID] && data[subID].success){
								appID = +data[subID].data.apps[0].id;
								deferred.resolve();
							}else{
								deferred.reject();
							}
						}).fail(function(){
							deferred.reject();
						});
					}else{
						deferred.resolve();
					}
					
					$.when(deferred.promise()).then(function(){
						var url = "/api/appdetails/?appids=" + appID + "&l=english&filters=packages&cc=";
						
						$.getJSON(url + currentcc,function(data){
							if (data && data[appID].success && data[appID].data.package_groups.length){
								var subs = data[appID].data.package_groups[0].subs,
									length = subs.length,
									i,info;
								
								for (i=0;i<length;i++){
									if (subs[i].packageid == subID){
										info = subs[i].option_text.match(that.regex.name).slice(1).invoke("trim").invoke("replace",that.regex.appendix,"");
										info[1] = info[1].replace(/-/g,"0");
										
										masterSub.name = info[0]; 
										masterSub.price = info[1];
										masterSub.currency = info[1].match(stmEnhncmnt.number.sign)[0];
										
										that.display(subID,modal);
										
										$.each(masterSub.regions,that.getRegion.bind(that,masterSub,appID,subID,url,modal));
										break;
									}
								}
							}else{
								error.call();
							}
						}).fail(error);
					},error);
				}else{
					this.display(subID);
				}
			},
			getJSON : function(){
				var that = this;
				$.getJSON("http://stgsko.perseus.uberspace.de/soe/getRates2.js?callback=?",function(data){
					if (data){
						if (data.ealert){
							if ((data.ealertversion&&(data.ealertversion <= 2))||!data.ealertversion){
								alert(data.ealert);
							}
						}
						that.currency = data;
						that.currency.timestamp = new Date().getTime();
						localStorage.stmCurrency = JSON.stringify(that.currency);
					}
				});
			},
			init : function(){
				var cc;
				
				if (localStorage.stmCurrency){
					this.currency = JSON.parse(localStorage.stmCurrency);
					if ((this.currency.timestamp + 86400000 <= new Date().getTime())||(this.currency.version === undefined)||(this.currency.version < 2)){
						this.getJSON();
					}
				}else{
					this.getJSON();
				}
				
				for (cc in stmEnhncmnt.settings.regions){
					if (cc !== currentcc){
						this.regions[cc] = {
							name : stmEnhncmnt.settings.regions[cc],
							status : -1
						};
					}
				}
				
				$("form[name^='add_to_cart_']").each(function(){
					var subID = $("> input[name='subid']",this).val(),
						appID,html;
					
					switch (path){
						case "app":
							appID = location.pathname;
							break;
						case "sub":
							appID = $(".tab_overlay > a").attr("href");
							break;
						case "dlc":
							appID = $(this).prevAll(".dlc_page_purchase_header").find("a").attr("href");
							break;
						case "sale":
							appID = $(this).closest("[id^='sale_item_row_']").find(".sale_page_purchase_header,.tab_overlay:first").children().last().attr("href");
							break;
						case "":
						case "cart":
							appID = $(".dailydeal a").attr("href");
							break;
					}
					appID = appID.match(/app\/(\d+)/i)?RegExp.$1:0;
					html = '<span class="subIdInfo" onclick="stmEnhncmnt.subIdInfo.load(' + appID +  ',' + subID + ');" title="Click to open the ID and price comparison">subID:' + subID + '</span>';
					if (path === "sub"){
						$(".btn_addtocart_content").after(html);
						$(".game_purchase_discount,.game_purchase_price").addClass("helpCursor").attr({
							onclick : 'stmEnhncmnt.subIdInfo.load(' + appID +  ',' + subID + ');',
							title : 'Click to open the ID and price comparison'
						});
					}else{
						$("~ .game_purchase_action .btn_addtocart_content:not([href^='steam://run/']):last",this).after(html);
						$("~ .game_purchase_action",this).find(".game_purchase_discount,.game_purchase_price").addClass("helpCursor").attr({
							onclick : 'stmEnhncmnt.subIdInfo.load(' + appID +  ',' + subID + ');',
							title : 'Click to open the ID and price comparison'
						});
					}
				});
			}
		};
	}
}
stmEnhncmnt.exec();
window.stmEnhncmnt = stmEnhncmnt;
}

//jQuery loader: http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
var script = document.createElement("script");
if (typeof jQuery !== "function"){
	script.setAttribute("src","http://code.jquery.com/jquery-2.1.0.min.js");
	script.addEventListener("load",function(){
		var script = document.createElement("script");
		script.textContent = "jQuery.noConflict();(" + stmEnhncmntLoader.toString() + ")(jQuery,$);";
		document.body.appendChild(script);
	},false);
}else{
	script.textContent = "(" + stmEnhncmntLoader.toString() + ")(jQuery,$);";
}
document.body.appendChild(script);