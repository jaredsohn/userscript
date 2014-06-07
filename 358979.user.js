// ==UserScript==
// @name          Torrentz : Modified bobcat
// @namespace     http://rajwanur
// @homepage        http://www.youtube.com/watch?v=1QyuIDw0CIw&feature=youtu.be
// @description   Add IMDB ratings, magnet and direct torrent download links, movie plot/actors, and other goodies. Also features an awesome built-in serie tracker. Upgrade your experience of torrentz to a whole new level! Watch this video for a quick demo : http://www.youtube.com/watch?v=1QyuIDw0CIw&feature=youtu.be
// @author        rajwanur
// @version        0.0.2
// @grant none
// @include       *://torrentz.*
// @match         *://torrentz.com/*
// @match         *://torrentz.eu/*

// ==/UserScript==
// @date    19 Jun 2013
// @license    GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html


var Torrentz = {};
var host = document.location.hostname || document.location.host;
var host = "http://" + host;
//var apihost = 'http://' + 'deanclatworthy.com/imdb/';
var apihost = "http://" + "www.omdbapi.com/";
var defaultTrackers = [
				"udp://tracker.openbittorrent.com:80/"
				,"http://tracker.openbittorrent.com:80/"
				,"udp://tracker.publicbt.com:80/"
				,"http://tracker.publicbt.com:80/"
				,"udp://tracker.istole.it:6969/"
				,"udp://tracker.ccc.de:80/"
				,"http://tracker.ccc.de:80/"
				,"udp://fr33dom.h33t.com:3310/announce"
				,"http://inferno.demonoid.com:3407/announce"
				,"http://tracker.ilibr.org:6969/announce"
				,"udp://tracker.prq.to/announce"
				,"http://tracker.torrent.to:2710/announce"
				,"udp://11.rarbg.com/announce"
				,"http://9.rarbg.com:2710/announce"
				,"http://bt1.the9.com:6969/announce"
				,"http://exodus.desync.com:6969/announce"
				,"http://tracker.xpear.de:6969/announce"
				,"udp://open.demonii.com:1337/announce"
				,"http://tracker.yify-torrents.com/announce"
			];
var trackerencode = "udp%3A%2F%2Ftracker.ccc.de%3A80%2F&tr=http%3A%2F%2Ftracker.ccc.de%3A80%2F&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce&tr=http%3A%2F%2Finferno.demonoid.com%3A3407%2Fannounce&tr=http%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ffr33dom.h33t.com%3A3310%2Fannounce&tr=http%3A%2F%2Ftracker.ilibr.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.istole.it%3A6969%2F&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2F&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2F&tr=udp%3A%2F%2Ftracker.prq.to%2Fannounce&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80%2F&tr=http%3A%2F%2Ftracker.publicbt.com%3A80%2F&tr=udp%3A%2F%2F11.rarbg.com%2Fannounce&tr=http%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=http%3A%2F%2Fbt1.the9.com%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.torrent.to%3A2710%2Fannounce&tr=http%3A%2F%2Ftracker.xpear.de%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.yify-torrents.com%2Fannounce";
var twoPartDomainPatt = new RegExp("(?:\\.com|\\.co|\\.info|\\.mobi|\\.net|\\.ar|\\.as|\\.at|"
			+ "\\.bb|\\.bg|\\.br|\\.ca|\\.ch|\\.cn|\\.cs|\\.dk|\\.ee|\\.es|\\.fi|\\.fr|\\.gr|\\.in|"
			+ "\\.is|\\.it|\\.jp|\\.lu|\\.no|\\.se|\\.pl|\\.ru|\\.tv|\\.tw|\\.tk|\\.ua|\\.uk|\\.us){2}","")	;		
Torrentz.GM = {};
Torrentz.GM.BobCatTorrentz = {};
Torrentz.GM.BobCatTorrentz = {
	PageCache_movieInfo : {},
	PageCache_lk_id_info : {},
	start : function () {
		initCss();
		this.addPluginZone();
		$("div.cloud").hide();
		var loginStore = Enbalaba.GetLocalStore("moviesInfo"),
		loginData = loginStore.get();
		var cacheSize,
		k,
		that = this;
		try {
			cacheSize = Object.keys(loginData).length
		} catch (err) {
			cacheSize = 0;
			for (k in loginData) {
				if (loginData.hasOwnProperty(k)) {
					cacheSize++
				}
			}
		}
		console.info("Cache size:" + Object.keys(loginData).length);
		if (cacheSize > 150) {
			that.clearCache()
		}
		var results = $(".results");
		results.find("h3:first").append("<span>|&nbsp</span><b title='IMDB Rating. Brought to you by the Torrentz Dominion Plugin'>Rating</b>");
		results.children("dl").each(function (index) {
			that.processRow($(this), loginData, false)
		});
		results.find("span.downloadLink").click(function () {
			$(this).removeClass('downloadLink').addClass('downloadActive');
			downloadTorrent($(this).attr("data-torrentid"))
		});
		results.find("dt").click(function () {
			var dt = $(this),
			text,
			divDesc = dt.find(".movieDesc"),
			div,
			lk,
			aElement;
			if (divDesc.length == 0) {
				aElement = dt.children("a:first");
				if (aElement.length == 0) {
					return
				}
				var id = aElement.attr("href").substr(1).toUpperCase(),
				info = null;
				if (!id) {
					return
				}
				if (that.PageCache_lk_id_info[id]) {
					info = that.PageCache_movieInfo[that.PageCache_lk_id_info[id]]
				}
				if (info) {
					text = "<div class='plot'><b>Plot</b>: " + info.Plot + "</div><div class='actorsInfo'> <b>Actors</b>: " + info.Actors + "</div>"
				} else {
					text = aElement.attr("title")
				}
				divDesc = $("<div class='movieDesc'>" + text + "</div>");
				div = $("<div class='divQuality'></div>");
				lk = $("<div class='hyperlink fleft'>See user comments</div>");
				lk.hover(function (e) {
					if ($(this).data("processed")) {
						return
					}
					that.getQuality($(this.parentNode), aElement.attr("href"));
					e.stopPropagation();
					$(this).hide();
					$(this).data("processed", true)
				});
				div.append(lk).append($("<img class='spinner fleft'></div><div class='qualityComments'><div/>").hide());
				divDesc.append(div).hide();
				dt.append(divDesc)
			}
			if (divDesc.is(":hidden")) {
				divDesc.children().hide();
				divDesc.slideDown(200, function () {
					divDesc.children().show()
				});
				dt.children(".expand").addClass("collapse")
			} else {
				divDesc.slideUp();
				dt.children(".expand").removeClass("collapse")
			}
		});
		var serieTrakerLastCheckedStore = Enbalaba.GetLocalStore("serieTrackerLastCheck"),
		serieTrakerLastChecked = serieTrakerLastCheckedStore.get(),
		today = encodeDate(new Date());
		if (!serieTrakerLastChecked || serieTrakerLastChecked.LastChecked != today) {
			serieTrakerLastCheckedStore.set({
				FoundNewEpisodes : false,
				LastChecked : today
			});
			this.searchForNewEpisodes(this.episodeFoundCallback_2)
		} else {
			if (serieTrakerLastChecked.FoundNewEpisodes) {
				$("#btSerieTracker").css("color", "Blue").removeClass("bobcatStamp").addClass("bobcatStamp2")
			}
		}
	},
	
	extractLeveledArray : function ( arr, level ) {
		var returnArr = []
			,i
			,errMsg;
		for ( i = 0; i < arr.length; i++ ) {
			if ( arr[i] && arr[i][level] ) {
				returnArr.push( arr[i][level] );
			} else {
				errMsg = "[extractLeveledArray] couldn't extract that level!";
				sendLog(errMsg);
				throw new Error(errMsg);
			}
		}
		return returnArr;
	},

	sortTrByProtocol    : function (_arr) {
		// finalTrackerSorting
		var newArr     = []
			,udpPopped = null  // udpPopped is now the http backup
			,prev      = null
			,i;
		for ( i = 0; i < _arr.length; i++ ) {
			udpPopped = null;
			prev = i >= 1 ? _arr[(i-1)] : "";
			if ( prev.replace(/^https?/,"") == _arr[i].replace(/^udp/,"") ) {
				udpPopped = newArr.pop();
				newArr.push(_arr[i]);
				newArr.push(udpPopped);
			} else {
				newArr.push(_arr[i]);
			}
		}
		return newArr;
	},

	sortTrackers        : function (a, b) {
		var i = 0;
		if ( a[0] > b[0] ) {
			i = 1;
		} else if ( a[0] < b[0] ) {
			i = -1;
		}
		return i;
	},

	cleanUrlCompare     : function (url, type) {
		var cleanUrl;
		if ( type === "http" ) {
			cleanUrl = url.replace(/^https?/,"");
		} else if ( type === "udp" ) {
			cleanUrl = url.replace(/^udp/,"");
		}
		cleanUrl = cleanUrl.replace(/\/$/,"").replace(/:80\/?/,"");
		return cleanUrl || url;
	},

	getDividedTrackers  : function (arr) {
		var newString = ""
			,next     = null
			,i;
		for (i = 0; i < arr.length; i++) {
			next = (i+1) < arr.length ? arr[(i+1)] : "";
			if ( this.cleanUrlCompare(next, "http") == this.cleanUrlCompare(arr[i], "udp") ) {
				newString += arr[i] + "\n";
			} else {
				newString += arr[i] + "\n\n";
			}
		}
		newString = newString.replace(/\n+$/,"");
		return newString;
	},
	
	makeTrackersObject  : function (trackersArray, userTrackers) {
		var slashMatch
			,cleanHostPatt    = /^[^\/]*\/+/i
			,cleanHostPattTwo = /(?::[0-9]+|\/).*$/i
			,ipMatch          = /[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/
			,sortingArray     = []
			,cleanHost
			,domainSplit
			,domainSplitLen
			,sortedString
			,newArray
			,i;
		for ( i = 0; i < trackersArray.length; i++ ) {
			// count slashes
			slashMatch = trackersArray[i].split("/").length - 1;
			if ( slashMatch >= 2 && trackersArray[i].indexOf("://") !== -1 ) {
				// safe to delete beginning
				cleanHost = trackersArray[i].replace(cleanHostPatt,"");
			} else {
				cleanHost = trackersArray[i];
			}
			cleanHost = cleanHost.replace(cleanHostPattTwo,"");
			domainSplit = cleanHost.split(".");
			domainSplitLen = domainSplit.length;
			// !example.com
			if ( domainSplitLen > 2 ) {
				// example.co.uk
				if ( cleanHost.match(this.twoPartDomainPatt) ) {
					cleanHost = domainSplit[(domainSplitLen-3)] + "." + domainSplit[(domainSplitLen-2)]
						+ "." + domainSplit[(domainSplitLen-1)];
				// !127.0.0.1
				} else if ( !cleanHost.match(ipMatch) ) {
					cleanHost = domainSplit[(domainSplitLen-2)] + "." + domainSplit[(domainSplitLen-1)];
				}
			}
			sortingArray.push( [ cleanHost.toLowerCase(), trackersArray[i] ] );
		}
		newArray = this.extractLeveledArray( sortingArray.sort(this.sortTrackers), 1 );
		newArray = this.sortTrByProtocol( newArray );
		sortedString = this.getDividedTrackers( newArray );
		if ( !userTrackers ) {
			//this.cache.userString = sortedString;
			//this.cache.userArray = newArray;
			return {
				userString : sortedString,
				userArray  : newArray
			};
		} else if ( userTrackers ) {
			return {
				allString  : sortedString,
				allArray   : newArray,
				userString : userTrackers.userString,
				userArray  : userTrackers.userArray
			};
		}
	},
	zipString           : function (s) {
		var returnStr = s ? String(s).replace(/^\s+/,"").replace(/\s+$/,"") : s;
		return String(returnStr);
	},
	getMagnetUrl        : function (hash, title, trackers, htmlEnc) {
		console.info(" Hash:>"+hash +" <br/Title:>"+ title+" <br/>Tracker:"+ trackers+" <br/>"+ htmlEnc);
		var returnStr = "magnet:?xt=urn:btih:" + hash + "&dn="
				+ encodeURIComponent(title) + "&tr="
				+ trackers;
			// ,trackerStr = encodeURIComponent(this.zipString(trackers).replace(/\n+/g,"&tr="))
				// .replace(/\%26tr\%3D/g, "&tr=");
		// returnStr += trackerStr;
		// if ( htmlEnc ) {
			//returnStr = __.escape(returnStr);
		// }
		return returnStr;
	},
	processRow : function (row, loginData, isIFrameDownload) {
		if (!row) {
			return
		}
		var tags = null,
		name;
		var lk = row.find("dt>a");
		if (lk.length > 0) {
			var id = lk.attr("href").substr(1).toUpperCase();
			var info = lk.parent().text();
			var index = info.indexOf("»");
			var rightCol = row.find("dd");
			rightCol.css("width", "374px");
			row.find("dt").css("width", "566px");
			if (index > -1) {
				tags = info.substr(index + 1);
				name = info.substr(0, index)
			}
			var type = this.getType(name, tags);
			if (type == 'movie') {
				var yindx = name.search(/\s[0-9]{4}\s/);
				if (yindx != -1) {
					var encoder = name.substr(yindx + 5);
					var tags = tags + encoder;
				}
			}
			lk.attr("title", tags ? "Tags: " + tags : info).parent().html(lk);
			if (this.isTVSerie(name)) {
				type = "tv"
			}
			if (type == "movie") {
				if (!loginData) {
					return
				}
				lk.css("color", "#3F14FF");
				var yearIndex = name.search(/\s[0-9]{4}\s/);
				if (yearIndex != -1) {
					var year = name.substr(yearIndex + 1, 4);

					name = name.substr(0, yearIndex);
					info = loginData[(name + year).toLowerCase()];
					if (info) {
						this.PageCache_movieInfo[(name + year).toLowerCase()] = info;
						this.PageCache_lk_id_info[id] = (name + year).toLowerCase();

						lk.text(name + " " + year);					
						if(info.imdbRating == "N/A") {
							var imgr = 255;
							var imrd = 0;
						} else {
							var imgr = 255-Math.round(info.imdbRating*20);
							var imrd = Math.round(info.imdbRating*25);
						}
						rightCol.append($("<a class='rateBox' style='color: rgb(" + imgr + "," +imrd+", 20);'" + (info.ImdbID && info.ImdbID != "" ? "target='_blank' href='http://www.imdb.com/title/" + info.ImdbID + "'" : "") + " >" + info.imdbRating + "</a>"))
					} else {
						this.searchIMDBinfo(name, year, lk, rightCol)
					}
				}
			} else {
				if (type == "tv") {
					lk.css("color", "Black")
				} else {
					lk.css("color", "#555")
				}
			}
			var trackers = this.makeTrackersObject(defaultTrackers,false);
			rightCol.prepend("<span class='downloadLink hyperlink' data-torrentid='" + id + "'></span>");
			rightCol.prepend("<span class='magnetLink hyperlink'><a href='"
							+(this.getMagnetUrl(id, name, trackerencode, true))
							+"'></span>");
			lk.parent().prepend("<div class='expand fleft'></div>")
		}
	},
	getType : function (name, tags) {
		if (tags.indexOf("movies") > -1) {
			return "movie"
		} else {
			if (tags.indexOf("tv") > -1) {
				return "tv"
			} else {
				if (tags.indexOf("games") > -1) {
					return "game"
				}
			}
		}
	},
	isTVSerie : function (fullName) {
		return (new RegExp(/[sS][0-9]+[eE][0-9]+/).test(fullName) || new RegExp(/[0-9]+[x][0-9]+/).test(fullName) || new RegExp(/season[\s]?[0-9]{1,2}[\s]/i).test(fullName))
	},
	searchIMDBinfo : function (name, year, link, rightCol, isRetry) {
	
		if (link.length > 10) {
			var url = link,
			that = this;
		} else {
			if (year > 1900) {
				var url = encodeURI(apihost + '?t=' + name + '&y=' + year),
				that = this;
			} else {
				var url = encodeURI(apihost + '?t=' + name),
				that = this;
			}
		};
		console.info(name + " :#: " + year + " :#: " + url + " :#: " + isRetry + ":#:");
				
		$("<span></span>").css("display", "none").load(url, function (data) {
			var obj = $.parseJSON(data);
			if (obj) {
				if (obj.imdbRating) {
 					if(obj.imdbRating == "N/A" && url.search(/t=/i) > 1){
						var url2 = encodeURI(apihost + "?s=" + name + "&y=" + year);
						var imdbid = " ";							
						$.getJSON(url2, function (data) {
							var items = [];
							$.each(data.Search, function (key, val) {
								//console.log(val);
								if (key == 0) {
									var imdbid = val.imdbID;
									var url3 = encodeURI(apihost + "?i=" + imdbid);
									console.info(name + ": url3=" + url3 + "::" + imdbid);
									that.searchIMDBinfo(name, year, url3, rightCol, false);
									return;
								};
							});
						});
					} else {
						var loginStore = Enbalaba.GetLocalStore("moviesInfo"),
						loginData = loginStore.get();
						if (loginData) {
							var refName = (name + year).toLowerCase();
							that.PageCache_movieInfo[refName] = {
								imdbRating : obj.imdbRating,
								Plot : obj.Plot,
								Actors : obj.Actors,
								ImdbID : obj.imdbID
							};
							that.PageCache_lk_id_info[link.attr("href").substr(1).toUpperCase()] = refName;
							loginData[refName] = {
								imdbRating : obj.imdbRating,
								Plot : obj.Plot,
								Actors : obj.Actors,
								ImdbID : obj.imdbID
							};
							loginStore.set(loginData)
						}
						if(obj.imdbRating == "N/A") {
							var imgr = 255;
							var imrd = 0;
						} else {
							var imgr = 255-Math.round(obj.imdbRating*20);
							var imrd = Math.round(obj.imdbRating*25);
						}
						rightCol.append($("<a class='rateBox' style='color: rgb(" + imgr + "," +imrd+", 20);'" + (obj.imdbID && obj.imdbID != "" ? "target='_blank' href='http://www.imdb.com/title/" + obj.imdbID + "'" : "") + " >" + obj.imdbRating + "</a>"));
					}
				} else {
					if (obj.Response == "False") {
						var newurl = encodeURI(apihost + "?s=" + name + "&y=" + year);
						var imdbid = " ";
						
						if(!(url.search(/i=/i) > 2)){								
							$.getJSON(newurl, function (data) {
								var items = [];
								$.each(data.Search, function (key, val) {
									if (key == 0) {
										var imdbid = val.imdbID;
										var newurlt = encodeURI(apihost + "?i=" + imdbid);
										console.info(name + ": newurlt" + newurlt + "::" + imdbid);
										that.searchIMDBinfo(name, year, newurlt, rightCol, false);
										return;
									};
								});
							});
						} else {						
							if (isRetry != true) {
								var name2 = name.replace(/thats/gi, "that's").replace(/it's/gi, "its").replace(/spiderman/i, "spider man").replace(/extended$/i, "");
								if (name2 != name) {
									that.searchIMDBinfo(name2, year, link, rightCol, true);
									return
								}
							}
							console.info(name + ": " + obj.Error)
						}


					}

				}
			}
		});
		return
	},
	tempID : 0,
	getQuality : function ($qualityDiv, url) {
		url = host + url;

		$qualityDiv.find(".spinner").show();
		var id = "divComment" + (this.tempID++);
		$("<div style='display:none' id='" + id + "'></div>").load(url, function (data) {
			var comments = $(data).find("div.comment .com");
			var qualityComments = [];
			for (var i = 0, comment; i < comments.length; i++) {
				comment = $(comments[i]).text();
				if (comment.length > 400) {
					comment = comment.substr(0, 400) + " (...)"
				}
				qualityComments.push(comment)
			}
			$qualityDiv.find(".spinner").hide();
			$qualityDiv.find(".qualityComments").show().html("<b>User comment:</b><br/>" + qualityComments.join("<br/>"));
			$(id).empty()
		})
	},
	clearCache : function () {
		var loginStore = Enbalaba.GetLocalStore("moviesInfo");
		loginStore.set({});
		console.info("Movie cache cleared")
	},
	addPluginZone : function () {
		$("div.top").append("<div id='bobcatLogoContainer' class='bobcatLogo'><a href='http://www.youtube.com/watch?v=1QyuIDw0CIw&feature=youtu.be'>with (modified2) Bobcat add-on</a></div>");
		var btST = $("<button type='button' id='btSerieTracker' class='bcButton bobcatStamp'>Serie Tracker</button>"),
		that = this;
		btST.click(function () {
			that.onclick_btSerieTracker()
		});
		$("div.results h2").append(btST)
	},
	_ddSeasonHTML : "",
	_ddEpisodeHTML : "",
	onclick_btSerieTracker : function () {
		if (!this.SerieTrackerMode) {
			$("div.results h3").nextAll().hide();
			$("div.recent").hide();
			$("#serieContainer").show();
			$("#btSerieTracker").text("Return to List");
			if (this.SerieTrackerMode == null) {
				var serieTrakerLastCheckedStore = Enbalaba.GetLocalStore("serieTrackerLastCheck"),
				serieTrakerLastChecked = serieTrakerLastCheckedStore.get();
				serieTrakerLastCheckedStore.set({
					FoundNewEpisodes : false,
					LastChecked : encodeDate(new Date())
				});
				delete serieTrakerLastCheckedStore;
				var serieStore = Enbalaba.GetLocalStore("trackedSeriesInfo"),
				serieInfo = serieStore.get();
				if (!serieInfo.Ids) {
					serieStore.set({
						Ids : [],
						CurrentId : 1
					})
				}
				$("div.results").after("<div class='results' id='serieContainer'><dl></dl><div id='addSerieContainer' style='float:left;position:relative;'> <h2>Track a new Serie</h2>" + "<div class='row'><div class='col1'><label>Name</label></div><div  class='col2'><input type='text' id='st_tbNameNew' class='bcTextbox'/></div> <div class='col3'><span id='st_lblSuggestion'></span></div></div>" + "<div class='row'><div class='col1'><label>Season</label></div><div  class='col2'><select id='st_ddSeasonNew' class='bcSelect'><option></option></select></div></div>" + "<div class='row'><div class='col1'><label>Episode</label></div><div  class='col2'><select id='st_ddEpisodeNew' class='bcSelect'><option></option></select></div></div>" + "<button type='button' id='btAddSerie' class='bcButton'>Add This Serie</button><span id='st_lblOutput' style='color:red'></span><br/>" + "<input type='checkbox' id='cbIsFinishedSeason'/><label for='cbIsFinishedSeason'>I know this season is finished and has </label><input type='input' id='tbSeasonNbEpisodes' style='width:20px' maxlength=2 value='20'/> episodes</div>" + "</div>" + "<div style='clear:both;cursor:pointer' id='st_btDeleteAll' >Delete All Tracked Series<div/>" + "<div style='width:500px;border-radius:6px; border-size:1px;margin-top:25px'>The Bobcat addon will check once a day your tracked series for new episodes.<br/><img src='http://i.imgur.com/n7tvk8I.png'/>: New episode(s)<br/><img src='http://i.imgur.com/tDWKswF.png'/>: No new episodes</div>");
				var i,
				htmlddSeasons = "",
				htmlddEpisodes = "";
				for (i = 1; i < 30; i++) {
					htmlddSeasons += "<option value='" + i + "'>" + i + "</option>"
				}
				for (i = 1; i < 40; i++) {
					htmlddEpisodes += "<option value='" + i + "'>" + i + "</option>"
				}
				$("#st_ddSeasonNew").html(htmlddSeasons);
				$("#st_ddEpisodeNew").html(htmlddEpisodes);
				htmlddSeasons = "";
				htmlddEpisodes = "";
				this.displayTrackedSeries();
				this.searchForNewEpisodes(this.episodeFoundCallback);
				var that = this;
				$("#btAddSerie").click(function () {
					var name = $("#st_tbNameNew").val();
					if ($.trim(name) == "") {
						$("#st_lblOutput").text("Enter a Name")
					} else {
						var store = Enbalaba.GetLocalStore("trackedSeriesInfo"),
						serieInfo = store.get(),
						id = serieInfo.CurrentId;
						serieInfo.CurrentId = id + 1;
						serieInfo.Ids.push(id);
						store.set(serieInfo);
						var store = Enbalaba.GetLocalStore("ts_" + id),
						isFinished = $("#cbIsFinishedSeason").is(":checked"),
						serie = {
							Name : name,
							Season : parseInt($("#st_ddSeasonNew").val(), 10),
							Current : {
								e : parseInt($("#st_ddEpisodeNew").val(), 10)
							},
							History : [],
							id : id
						};
						if (isFinished) {
							serie.isFinished = true;
							serie.NbTotEpisodes = parseInt($("#tbSeasonNbEpisodes").val(), 10);
							if (isNaN(serie.NbTotEpisodes)) {
								alert("Enter a valid number of episodes");
								return
							}
						}
						store.set(serie);
						that.displayTrackedSeries();
						that.searchForNewEpisodes(that.episodeFoundCallback);
						$("#st_lblOutput").text("")
					}
				});
				$("#st_lblSuggestion").click(function () {
					$("#st_tbNameNew").val($(this).text())
				});
				$("#st_tbNameNew").keypress(function (e) {
					if (e.keyCode >= 20 && e.keyCode <= 40 && e.keyCode != 32) {
						return true
					}
					var txt = $(this).val();
					if (txt.length >= 3) {
						var url = encodeURI(host + "/suggestions.php?q=" + $.trim(txt));
						$("<span></span>").css("display", "none").load(url, function (data) {
							var res = $.parseJSON(data);
							if (res && res.length == 2 && res[1] != null && res[1].length > 0) {
								console.log(res[1][0]);
								$("#st_lblSuggestion").text(res[1][0])
							} else {
								$("#st_lblSuggestion").val("-")
							}
						})
					}
				});
				$("#st_btDeleteAll").click(function () {
					if (confirm("Do you want to delete all the currently tracked series ?")) {
						Enbalaba.GetLocalStore("trackedSeriesInfo").set({
							Ids : [],
							CurrentId : 1
						});
						that.displayTrackedSeries()
					}
				})
			}
			this.SerieTrackerMode = true
		} else {
			this.SerieTrackerMode = false;
			$("div.results h3,div.recent").nextAll().show();
			$("#serieContainer").hide();
			$("#btSerieTracker").text("Serie Tracker")
		}
	},
	displayTrackedSeries : function () {
		var serieIds = Enbalaba.GetLocalStore("trackedSeriesInfo").get().Ids;
		var dl = $("#serieContainer dl");
		dl.empty();
		for (var i = 0, serie, id; i < serieIds.length; i++) {
			this.displaySerie(serieIds[i])
		}
	},
	displaySerie : function (serieId) {
		var serie = Enbalaba.GetLocalStore("ts_" + serieId).get(),
		time,
		hasNew = false;
		if (!serie.History) {
			serie.History = []
		}
		var html = "<div class='trackedSerieContainer'  data-id='" + serie.id + "'>" + "<div class='trackedSerieHeader'>" + "<div class='st_name st-col1'>" + "<div class='deleteIcon fleft' data-id='" + serie.id + "' title='delete' style='margin-right:2px'></div>" + serie.Name + "</div>" + "<div class='st-col2'><b>Season " + serie.Season + "</b></div>" + "<div class='episode st-col3'><b>" + (serie.History.length > 0 ? "Episode " + serie.History[0].e : " - ") + "</b></div>" + "<div class='st-col4'>" + (serie.isFinished ? "" : "Tracking: On") + "</div>" + "</div>" + "<div class='trackerSerieBody' style='display:none'>";
		if (serie.History.length == 0) {
			html += "<div style='margin-left:50px'>No results found</div>"
		} else {
			for (var j = 0, h, d, l = serie.History.length; j < l; j++) {
				h = serie.History[j];
				d = (h.d ? new Date(new Date() - getDateFromDateString(h.d)) : null);
				if (d) {
					if (d.getMonth() > 0) {
						dif = d.getMonth() + " month" + (d.getMonth() == 1 ? "" : "s") + " ago"
					} else {
						time = d.getDate() - 1;
						if (time == 0) {
							time = "today";
							hasNew = true
						} else {
							time += " days ago"
						}
					}
				}
				html += "<div class='st-row' data-serieData='" + (serie.id + "_" + h.e) + "'><div class='st-col1'>&nbsp</div> <div class='st-col2'>Episode " + h.e + "</div><div class='st-col3'>" + (h.f ? "<span class='st-btShowLk hyperlink'>Show Links<span>" : "<span>Not found</span>") + "</div>" + "<div class='st-col4'>" + time + "</div>" + "</div> "
			}
		}
		html += "</div></div>";
		var el = $("#serieContainer .trackedSerieContainer").filter(function () {
				return $(this).data("id") == serieId
			}),
		newEl = $(html);
		delete html;
		if (el.length > 0) {
			el.empty().replaceWith(newEl)
		} else {
			$("#serieContainer dl").append(newEl)
		}
		var that = this;
		newEl.find("div.deleteIcon").click(function (e) {
			e.stopImmediatePropagation();
			that.onclick_deleteTrackedSerie(this)
		});
		newEl.find("span.st-btShowLk").click(function (e) {
			that.onclick_showLinks(this)
		});
		newEl.find("div.trackedSerieHeader").addClass(hasNew ? "hasNew" : "").click(function (e) {
			that.onclick_serieHeader(this)
		})
	},
	searchForNewEpisodes : function (callback) {
		var serieInfo = Enbalaba.GetLocalStore("trackedSeriesInfo").get(),
		that = this,
		today = encodeDate(new Date());
		for (var i = 0, store, serie, search, ids = serieInfo.Ids; i < ids.length; i++) {
			store = Enbalaba.GetLocalStore("ts_" + ids[i]);
			serie = store.get();
			if (!serie.isFinished || serie.History.length == 0) {
				this.lookForEpisode(serie, serie.Current.e, callback, store)
			}
		}
	},
	lookForEpisode : function (serie, episode, callback, store) {
		var search = serie.Name + " S" + (serie.Season < 10 ? "0" : "") + serie.Season + "E" + (episode < 10 ? "0" : "") + episode,
		url = encodeURI(host + "/search?f=" + search),
		that = this;
		search = search.toLowerCase();
		$("<span></span>").css("display", "none").load(url, function (data) {
			var rows = $(this).find("div.results dl"),
			results = [];
			for (var i = 0, $row, txt; i < rows.length; i++) {
				$row = $(rows[i]);
				txt = $row.find("dt").text().toLowerCase();
				if (txt.indexOf(search) > -1) {
					results.push($row)
				}
			}
			if (callback) {
				callback(serie, episode, results, store, that)
			}
			$(this).empty()
		})
	},
	episodeFoundCallback : function (s, e, results, store, context) {
		if (results.length < 1) {
			if (s.isFinished && e < s.NbTotEpisodes) {
				s.History.splice(0, 0, {
					e : e,
					f : false,
					d : encodeDate(new Date())
				});
				s.Current.e = parseInt(s.Current.e, 10) + 1;
				store.set(s);
				context.displaySerie(s.id);
				context.lookForEpisode(s, e + 1, context.episodeFoundCallback, store)
			}
		} else {
			s.History.splice(0, 0, {
				e : e,
				f : true,
				d : encodeDate(new Date())
			});
			s.Current.e = parseInt(s.Current.e, 10) + 1;
			store.set(s);
			context.displaySerie(s.id);
			var el = $("#serieContainer .trackedSerieContainer").filter(function () {
					return $(this).data("id") == s.id
				});
			el.find(".trackedSerieHeader").css("color", "Blue");
			context.lookForEpisode(s, s.Current.e, context.episodeFoundCallback, store)
		}
	},
	episodeFoundCallback_2 : function (s, e, results) {
		if (results.length < 1) {
			return
		}
		$("#btSerieTracker").css("color", "Blue");
		var serieTrakerLastCheckedStore = Enbalaba.GetLocalStore("serieTrackerLastCheck"),
		serieTrakerLastChecked = serieTrakerLastCheckedStore.get();
		serieTrakerLastCheckedStore.set({
			FoundNewEpisodes : true,
			LastChecked : encodeDate(new Date())
		})
	},
	onclick_serieHeader : function (headerEl) {
		headerEl = $(headerEl);
		var body = headerEl.parent().children(".trackerSerieBody");
		if (body.is(":visible")) {
			body.slideUp(200, function () {})
		} else {
			body.slideDown(200, function () {})
		}
	},
	onclick_showLinks : function (lk) {
		lk = $(lk);
		var row = lk.parent().parent(),
		that = this,
		data = row.data("seriedata"),
		dataParts;
		var existingBox = row.parent().children(".st-link-container").filter(function () {
				return $(this).data("seriedata") == data
			});
		if (existingBox.length != 0) {
			existingBox.remove()
		} else {
			if (data) {
				dataParts = data.split("_");
				var serie = this.getSerieFromStore(dataParts[0]);
				this.lookForEpisode(serie, dataParts[1], function (s, e, results) {
					var html = "<div class='st-link-container' data-seriedata='" + data + "'>",
					max = (results.length < 3 ? results.length : 3);
					for (var i = 0; i < max; i++) {
						r = results[i];
						that.processRow(r, null, true);
						html += "<div class='st-row'><div class='st-link-col1'>" + r.find("dt").html() + "</div>";
						html += "<div class='st-link-col2'>" + r.find("dd").html() + "</div> ";
						html += "</div>"
					}
					var linkContainer = $(html);
					linkContainer.find("span.downloadLink").click(function () {
						downloadTorrent($(this).attr("data-torrentid"))
					});
					row.after(linkContainer)
				})
			}
		}
	},
	onclick_deleteTrackedSerie : function (element) {
		var name = $(element).parent().text(),
		id = $(element).data("id");
		if (confirm("Are you sure you want to delete the entry for '" + name + "'")) {
			var store = Enbalaba.GetLocalStore("trackedSeriesInfo"),
			serieInfo = store.get();
			serieInfo.Ids = $.grep(serieInfo.Ids, function (value) {
					return value != id
				});
			store.set(serieInfo);
			store = Enbalaba.GetLocalStore("ts_" + id);
			store.set({});
			this.displayTrackedSeries()
		}
	},
	getSerieFromStore : function (id) {
		var serieStore = Enbalaba.GetLocalStore("ts_" + id),
		serie = serieStore.get();
		return serie
	}
};
Enbalaba = {};
function initCss() {
	var css = [
		' .rateBox{ margin-left:10px;position:relative;bottom:1px; cursor: pointer; padding:1px; background-color:#EEE; border:#DDD solid 1px; border-radius:3px; font-weight: bold;}',
		'.bobcatLogo{background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAZCAYAAAChBHccAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAABFRJREFUWEftVltPVFcUhjdeaq0pSa2XpCrYabDWaE1IeDDhL4gJ0AYERZuSOKS+9YIJsbGJJsXaUAJeo2/VhuEHDA590SGxIONAUC5J24cOUwxkCAnMrK5vnb2O+8wMwwzUJo1+4WPO2Ze1vrXW3vvsolcSB1u6jzDPGVIBDDJlnjH134AdqmBquRig7r6wMJVMUWolKb+UYjL+isUoHo/zK9q4gX/xPDT2B3UHhmQe7Bi+vEDSBYvQHAQSiwlqOnGClpeX5R2QQPCrwTKHohxM/5BdlSPG7cYAQ47ofsmY7VSomUZW+TmZ5DYjENn2+/3U2toqr9oHuuOEGOs8IzFIEIIwEtYHGBDR43+KcwE7sMWLUwMVJqIYS0tLNPF0gkpKSqj+009o7vlzt98OBLBtgtaSKrwKjvCAa1yAZ3WIP1TBvIMQpASGR0aora2Njjc1UXFxMW3fsZ2u/HiFZmZmPOJB/ufMM88gKl1wAI7wficLxgngvK8u2BaEdT43N0cXL12SzEO8Eu/v+3xUV19P33d20mgkkjFfEY7+nn8AGISMs4UXZYRRy7A6UYdgIpGgBw8fUE9vDzU0NtDuPbtFZHt7O924eYM+3L/fE0A6q6uraXp62mMfgH8TwNp7AIMw2BVuB2DE24ToyJMI/Xz3Ln359VdUvndvhrDS0lLy8/Lp6OjI6APf2bqVTn92mj46cIBifLyqbRUPmk2cO/s8wM2mK9KIt9sj0Sci9r1du7IKsokKfHH2LF27fp0OHjqU0f/Wli30MBymd7dto4qKCgoNDjrC2Y/6/CkgG3j1bwEig3iFV3yKVlZWJMs3b92illOnqLKykt7YtClDjM2ysjIK/TpIVVVVWfuV9r7Ac+/Vq6JBxee1dGzxOhGcmp6iH/ikQIltp7mI02V4ZJh8H/iy9iuR+Y8PH/a0XfjugiQMvpHANTMPQLxmXIXjeXJqkhqON3oytBb7An10ps2ftU+JykXHolLdnt5eacPSmZ+flzbVkK/4cxgoojlynMkNjY5o8G3efDt27pS1XrFvnxx5eH9z82aPqKM1NTQx4Xyg7PZ0lpWXix/sqfjfcQkAHzfH/wvxSKqRmBsYiDW2uLhIt+/coeBAkM/iUYrNxtx7ilTHOvORqdn4LIVCIerq6qLHo4+p8/LlrILTOXD/vgiEfUAFK81Jk9/FjQfKxg3zFw6TZcNaJVyN2NC6uREQjsdsYn1cLXvvYM1/w9+Dky0n3WQo8LFkLYXdczQAz70mX7BzBFNbWyviPueL2aPfHonguvo66UdVg8EB+crqiXX0WI1H/LqEK0wAclUoCHDObG5upvPfnqckqsaMRqN075d73Iduc5JwlRYWFujZ5KS71q07zcbv+DACYxk3zFxggWPj47yUlkVQPsCdXrPN/Hfu9AoNAoSjdS2pNFiCX47odMABE4HAmRtMIdR5TNjZ+PJYL9i5BpM3zdTX+J+iqOgfo6b3ILrSkfUAAAAASUVORK5CYII%3D) no-repeat scroll 0 0}',
		'#bobcatLogoContainer a{color:White}',
		'#bobcatLogoContainer a:hover{color:White}',
		'.bobcatStamp{background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAARCAYAAAC8XK78AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAACJUlEQVRIS72VTU9TURCG2103IhKbiHwkgi1eU0QikjTprn+BmrTVtLR8GZt4G9mBdtHgShKLmC5a5COyEwz+gZZbN8ACcdsf8zpzm4v39A4tNyYunvTMO+fMTObMufUA+Ccyc3P0I/uugyi6Qdd15HI5Wsr+boiiW3w+H5IvntNS9ndCFN2Qz+cxm8nA6/VicGgQm583SZb3SoiiGz6sr4M7wAVYsP1A05BIJvGxVKJt8llGFK/i5PQElWoFqXQKo/dHzUSFQgE7uzt4NDGhFNFONBqlEM6YDuEqvh0cYOXtKoJjY47gfr8fOl1FsVh0+Jg7/f1YermEx5OTFEqNqxjtcMJ7IyNiUDvciTfLy/iyvY0nU1MO/62+PpyeneHuwABCoRCMRoPCt3I4kjK7e3tYWFxEOBzGjZ4eR0A7gUAAxs8GIpGI6Lewzwmvq1tblKqtgE80wdwu+8FO8NRf/L6A9lAT/RbcgafT0w7dUUBqNq1U2o2jH0d4nddFnwV30IpfqVZNja/B0lqJ063EzG0aqKHhYfPuQ+Pj5nNi+2ZvrxJ4JhZDs9nsWnAgGLxMxnARdtvzdX8ftXpNETthGAbK5TIt4SltbIhJ26kfH5v7JUTxuvDTkxJq1DX7LPEMvKPvxfzCPB1TYyiGW+LxuJngFf0Znf86N5Mmkglytfy1Wt38GlovaeZZ7NJnoRhuyWazWHu/Rsu/2uH3Q8Xuhij+P+D5AzJND2iCN/OCAAAAAElFTkSuQmCC) no-repeat scroll 0 0}',
		'.bobcatStamp2{background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAARCAYAAAC8XK78AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAB40lEQVRIS2OgFBxq9P8PZQ4MON4W/P9oS9DAOmJ+rPb//XU+A+OI420h/w82+P2fE6Xxf1mq8f+rUxLp65BLE+P/g0IA5AAYBvFXZ1n831fr/f/ypATqOejVirL/N6an/D9Q7/t/ZYYp2KKz3ZH/b81M+782xwrFEeh4W4kTZQ65Nzf7/+nuiP+rMs0xDF+SZPAfFBXneqMx5EB4aYrR/yPNAf/X5VqT5giQhSvSTbEaioxBIXGiPfT/zRlp/9fn2WDIL0rU//9qZTkwjRj9X5tt+f/5shL8Drk1M/3/4aaA/5sK7P4vjNfFMBAZr8owAxu4udAeqzwMI6cTEPvG9FRMR4BSMCi4kDXiw6BU/3ZNJTjBYZOHYVAIbMi3xRCHWosABxp8UVxKCD+YnwuM+2CscjAMCkGo8QygBAwSA0UDVAgCQKkaZDEILwYmqOVpJuC4X5tjCfYdiL8wQQ/F4D3Vnv8/rq8l6GBQooVaAwYgR0CZEHB7Vsb/Z0uLMIMDB3i+tPj/tanJYPVXJiditRQdPwPqAWumNgBlPWwWgkINOS2B0sAZYHlxuInKFde+Wi+wBaDK6M3qCrCloNIPKs3wbEkRmA/LSaBog0pRBxwC1gHn+2JQDL0/L5s2wU0bwMAAAHfJ/9zB+g00AAAAAElFTkSuQmCC) no-repeat scroll 0 0}',
		'#bobcatLogoContainer{color:White;height:30px;width:150px;float:left;padding-left:50px;padding-top:5px; margin-top:10px}',
		'.downloadLink {;margin-right:20px;z-index: 5; width: 16px;height: 16px;top: 0;left: 680px;overflow: visible;text-align: center;background-size:16px 16px; background: no-repeat transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAActJREFUOE+Vk8svA1EUxmenJdqEIHZiYemxnNtazIKGkJk2FkUo0doQSSNhaUFFsBWxJOnGQmxUUolHkdj0jyCspKFVUX2N78zc0WkzkbjJL3Pn3PN9986dcwRJEm2cOnoOuY6bZZYJKiwf9bLSrcKKCcwPEZv2uPec5lx6GgZaQBYzs15WfvUyVbWm9Cyz9zGzhgy0icK+dnhiGcTABOgBfSAAroC2rrDPFW6iGdDOQb6YBbJgMRAnpsA3KMss5aPNhWHXWQuOnaIgGBXWHB0gDOxcK2DuAMugDTkzgD7nccC94RAUll3QA+opT44AFcSBHTSBBx4LI49Ockca3IcfBvkTbuDjBiRIcsGNaX4NGigFufOkgfYAL6UkN+jSDGhUm1SJaSBX1A0KF9YGNHSTBDg3i2lUDIpxq09wgkkQqMEP6rlB5RNwiYvcwLjETWAcvZYl5JEBv8Q3P35jrNX0G0eQ1AnIZKuGddCOHCoqOv7TYP9uo15I7CNEQfCPQkpTIZlLObeNBTIhqJTHQTfoBbTrJaA1lHJulTSGQaWZWHru72YqvqArjWbSdL8nMAK8nUP4x1FwDxFaunCEqgt43PtGO2u5kiTafgADBHQKpvte9wAAAABJRU5ErkJggg==);}',
		'.downloadActive{;margin-right:20px;z-index: 5; width: 16px;height: 16px;top: 0;left: 680px;overflow: visible;text-align: center;background-size:16px 16px; background: no-repeat transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAdlJREFUOE+Nk8tLVGEYxr8zI3jpXMIrIpkGJRGYLWc5eyWQFmrUFDltEmEI9A+QpHLlUloZuBVXXsFKC9z4Ryi1CiXN7tMcf8/hO+NxGKgPfpyP93ve57uc9zXZbKbOUqvvYndb01c/Pfrbcxb+uma76DpbzOePg/T9uZ5LQVKrb2wQBY799MOSaz6HrgmrgeHHoyB9J5kjg2jyw0/NWGEJlmEEbsItyMEbiNa/+6kJaxIZaOdRu3gCt02VQVzcg19QOrxYM6jNzWpncwvHPlAQBtpN2AUFqLe5hrkPT6ENzQPQdfZe3Oj2zYmfeqIALFnxMwhhHeqhEXZsrIBOJ3mvnKOgZsjwwovWYNAaKGHXJrxLzN/CBWnQPlYOuXOGo+xag2ta1ECYNDmXrIE2o5w/nrNR1UCDBJlswUoyWSM2KHrOusGl8goB3IVcBUPQYA3OrvDNT41Zg/gRpyE+eiXj6MqP+EWPuNbZ3Jr4jf2IroBMnlcwBe1oVFRh0TX7s9cve1EhUft5BeG/C4mSViGdlfJPz3nJgkyESnkYeqEPtOsmaK2EdlI5sUG5MXB99I9m+kRXxs0U5ZVPEAfUzojy/J0FftMH7rrN/DXmuVdXO+J2jrTZbKbuFPzdU5kgrkhOAAAAAElFTkSuQmCC);}',
		'.magnetLink {;z-index: 5; width: 16px;height: 16px;top: 0;left: 697px;overflow: visible;text-align: center;z-index: 5;margin-right:5px; background-size:16px 16px; background: no-repeat transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAHsIAAB7CAW7QdT4AAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAulJREFUOE9tkUlMU1EUhq8acWtcuDDEGBGQoUyCDAULZSpFKNIIVFqQtIwSoQhsaJRgRAMkLmhfISwMmhiVGDHByFBFJiHMEAGhLaW0DMFA1DgsNP7ePp+r8iV/Xt55/zn/efcSByq94YpYO94h1M62XdUZqtniPqh1ncnpzNijVP1Eq6Jl8BJbZBjmiI9u/RNpBYgW8GbsdvbDPoQxyx1khvqeAa663Z/Nzc3HyC39kySX3t8ga/8G+DD2Ps7vRIJ+jiGT1Gem0gGF+t4MImJm64mRFkD1AAjSr93l/E7IWkeL2E1XqOgzWr90n/jpLC/IQ1pwDHkMJLbMyzi/E7VtzwUH6JaOdKKnYYylm3SlKyb6xDIYUhUwpOehXV0l4PxOtN/UeL0tqMQ7FZWyAt1F6mkyFR66vBISAlNEBEwCATpTEmM5vxNPMyUeq7IsWLOoMjIxJ720TGYC/ReNYWEwRUbBHCPEcIh/Ied3ov9CmHA9JxessuVYuCj+SGb9fQeM4REw03RzbBymzwV0c34n5sQJ92yqfNiUKtjy8rAoFg2TSV+vZhOfD1N0DFbjEzHO46Hb9Xhlr1RyiOtjGQwNiP+QkvzdXlIKe3EJ7PkFmBPFtZB+j5MpRj7dQCjEaqIIZrEYA25u6HM9sTPE834zEuj3sv+s+8JIUCDWi4uxUa7GxvUy2AuLMBTkKyE9oujD8+eDVy3iZFhESbBIJLBezsASfZ+KjMRkVBSWpFJsqCuwVV3NarPiBlayZbZX/FAXdr0Bz1OSdYX8j5Ua19LS6AlnwCZXwK5U0nVpalk5NquqsFVTg22NBjuaGoxGhGSzzf8Z8fHQbJdewzZtcFyRY4DjsBz/yw6gybt36vGlqQnTotiWsfJ9LmvQxz3XkiPf+9bQgM91ddilaXu1tfja2IgfWi22qyt/jcfwb3elxB/kWpx5zTtz9H0wT72cKe1dK1BarYWqTaNcNj4dJ2jq8T7tydk4CPkL0LmhqFXo5eQAAAAASUVORK5CYII=);}',
		'.magnetLink a{;display:block;width: 16px;height: 16px; color: white; text-align: center; text-decoration: none; font-size: 6px;}',
		'.magnetLink a:hover{;display:block;width: 24px;height: 24px; color: white; text-align: center; text-decoration: none; font-size: 6px;}',
		'.moreLk{padding-left:30px;cursor:pointer}',
		'.movieDesc{width:530px;margin:10px 0px 40px 0px;color:Black;white-space:normal}',
		'.fleft{ float:left}',
		'dt:hover{ background-color:#EEE}',
		'.qualityComments{float:clear}',
		'.spinner{ background:url(http://www.andrewdavidson.com/articles/spinning-wait-icons/wait16trans.gif) no-repeat left center;width: 16px;height: 16px}',
		'.actorsInfo,.qualityComments,.divQuality,.plot{ margin-top:11px;margin-bottom:5px; font-size:12px;font-family:Verdana,Tahoma,sans-serif}',
		'#pluginZoneContainer{ position:absolute; left: 210px; top:10px; width: 200px; height: 200px;background-color:Gray}',
		'.expand{  background:transparent  url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB2ZXJzaW9uPSIxLjEiCiAgIHdpZHRoPSIxNiIKICAgaGVpZ2h0PSIxNiIKICAgaWQ9InN2ZzIiPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0IiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzNi4wMjg4KSIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxwYXRoCiAgICAgICBkPSJNIDEwLjAyODYyNCwzLjc3Mjk5MzIgOC4xOTc2NDQyLDYuOTQ0MzQyNCA2LjM2NjY2NDksMy43NzI5OTMyIHoiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLC0yLjczMDc3OTEsMS41NzY2MTYsMCwwLjA1MTQzODU1LDEwNjYuNDE0OCkiCiAgICAgICBpZD0icGF0aDI5ODUiCiAgICAgICBzdHlsZT0iZmlsbDojNzk3OTc5O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAvPgogIDwvZz4KPC9zdmc+Cg==) no-repeat scroll 0 0; width:15px; height: 15px; position: relative; top:1px}',
		'.deleteIcon{  background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAANVJREFUOE+lUjsKhDAU9Iq2dgGxERH8FaKmsRIRCzsL7RXsLT2AFxC8yrhPWNiQKOIWKTLM5M1MngZAe3teC2mgJF6W5YPLbtZ1lXBBPM8zTNNEWZYCsaoqMMYwjqOAC+Jt29B1HRzHQdM0JzFJEvi+D875/eSv3SzLEMcxbNuG53nI81wZ5bIwErmue8a4+g2luG1bWJaFKIoQBIHSstT2vu/o+x66roNKIgJlpQhpmt5nnqYJhmGgKAqBSPcwDM+HfyNItodhUGas6/pZ20/X9a/1PAAeTzY+OukRPQAAAABJRU5ErkJggg%3D%3D) no-repeat scroll 0 0; width:15px; height: 13px; position: relative; top:3px}',
		'.downloadIcon{  background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAASCAYAAAC9+TVUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAANISURBVDhPrdLrT5N3GMbx/hl7vyVbZrYlbmg51Aq2EwYWRnFiKTFkqGObHAQBRXGDyqKAchYFpU6UcRRYHceNZUy2hOwgrIIRkTJKCa2u5dAyeLrvntZmz5u9267kfve7P7nzyyX739L31Tq++bJ3lTtdLlq/eEbzTTvXGpe4XGelsmKestJZzhlmOFs4zcl8MznZE2Rm3CdAyGS+5eEhL40NG1gsAmtrAqurAisr4ri2cInjdG7y9OmfjIwuodV/gz7JRJLOJCFdnU4/Ul21is0m8G8RBC9r7k1GxhbZrelAqTzLe/vbJcR3vg8pK3WwaN0MrEnxAeueTZafubk7YkEZbyI5uZsE7W0Jufm53Y+cM1hZWNgIrD6P4H0O2P9wM7fooq1/hrD4frIyJ3k37oaENDbYGBr0cub0Y+bnPYF1H/AX7o2tfwDzYzvG7im2x/SSljaORnNNQupqF/xIXu4Ulrl1P+ANAA6nG4vNxYNZB+NmG3Wtk7zydgcpKd8RE1MvIZUVFgYHBApOTTMx4WTZ7uH3xTUezjr52Wxn9Ccrfd/P0Tn8iKL6cV5Wt5F4cJCoqGoJKb3whP4+QewKZGVPknjoHhrdt+xJGCQ49i6vv9PNi6o2XlDe4iVVK7qkEeITTOzde0lCDMWP6OkWxKJB03UP5eVOioqWKDg9T07uDMcyzBxJ+wV9yhjaxGG0+weIju1EpTovIYVnpsWWCmJLBa5e8fBxTge6IxUcTL3IgffLSUwtR3/0EvrUJj8QE9uLOuo24eEGCcnPM2NsEqi/vMFF8Qr90Wq2BUXwhlxFRkEZTR1fc762Bd3hKiI1PSLQjnKP0V+4ACGTZR+fEC/YEoEVsSvL4uNKXt2uIDh8HzVNXTx44qCrfwz9BzUo1C3sUjUTrLyKIuyUhKQf+1WsvIfPShwcTv8NlbaQhEPpnPikgnbTKPenLLTcGUCbXEKQ0ohceZ23QmsJCTkhIcVFZgzFVvLzHrIrrofXFFlknrxCXeMADcZBbjQPUfhpPbvVxwlS1LAjtIo35ReQy7Mk5Mcflvjow3skHuhEG3+LuFgjmn0NREfXERlZiVpdRkREif8PwkLzCQ3J9QM7d6RLyH+LTPY3+Yq4gSrGTPAAAAAASUVORK5CYII%3D) no-repeat scroll 0 0; width:17px; height: 18px; position: relative; top:3px}',
		'.deleteIcon:hover{ background-color:#CCC}',
		'.collapse{  background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB2ZXJzaW9uPSIxLjEiCiAgIHdpZHRoPSIxNiIKICAgaGVpZ2h0PSIxNiIKICAgaWQ9InN2ZzIiPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM0IiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzNi4zNjIyKSIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxwYXRoCiAgICAgICBkPSJNIDEwLjAyODYyNCwzLjc3Mjk5MzIgOC4xOTc2NDQyLDYuOTQ0MzQyNCA2LjM2NjY2NDksMy43NzI5OTMyIHoiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgyLjczMDc3OTEsMCwwLDEuNTc2NjE2LC0xNC4zODU5NTYsMTAzNi40MTM2KSIKICAgICAgIGlkPSJwYXRoMjk4NSIKICAgICAgIHN0eWxlPSJmaWxsOiM3OTc5Nzk7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmUiIC8+CiAgPC9nPgo8L3N2Zz4K)}',
		'.btSerieTrackerHighlight{color:Yellow !important}',
		'#btSerieTracker{ padding-left:40px;margin-left:20px; background-color:White;background-position:3px 3px}',
		'#addSerieContainer{ width:50%;   border: 1px solid #B5B8C8; margin: 30px 0px; padding:20px; border-radius: 15px}',
		'#st_tbNameNew{ width : 150px}',
		'#btAddSerie{ margin: 10px 0px}',
		'#cbIsFinishedSeason{margin-right:7px}',
		'#st_lblSuggestion{ color:Grey; font-size:11px;cursor:pointer}',
		'.trackedSerieHeader{ margin: 15px 0px}',
		'.trackedSerieHeader,.st-row{clear:both;width:100%;font-size:12px;height:15px}',
		'.trackedSerieHeader>div,.st-row>div{ margin-right:30px;float:left}',
		'.st-col1{ width:200px}',
		'.st-col2,.st-col3{ width:100px}',
		'.st-link-col1{width:500px}',
		'.st_name{font-weight:bold}',
		' .st-link-container{margin:10px; border:1px solid #AAA;padding:20px}',
		'.st-link-col2 span{ margin-right:10px}',
		'.st-link-col2 .u{ font-weight:bold}',
		'div.trackedSerieHeader{cursor:pointer}',
		'div.trackedSerieHeader:hover{ background-color:#EEE}',
		'.hasNew{color:Blue}',
		'.hyperlink{color:#0066EE;text-decoration:none;cursor:pointer}',
		'.bcButton{color:#6B3F2E; border-radius: 6px; border: 1px solid #6B3F2E; height:25px; padding-bottom:1px; min-width:80px; font-weight:bold;cursor:pointer}',
		'.bcButton:hover{color:#AA3F2E; }',
		'.bcTextbox{background-color:#FFF;border: 1px solid #B5B8C8; font-size: 14px; height: 16px;  line-height: 14px; padding: 2px; vertical-align: middle;border-radius: 5px; color:#6B3F2E}',
		'.bcSelect{ background-color:#FFFFFF;height:26px;line-height:26px;border:1px solid #CCCCCC;color:Black;font-size:16px;    padding:4px;border-radius:5px}',
		' .col1{ float:left; width:100px; }',
		'.col2{ float:left; width:200px}',
		'.col3{ float:left; width:200px}',
		'.row{ clear:both; width : 500px; margin:10px 0px; padding-bottom:20px}'
	];
	css = css.join("\n");
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css)
	} else {
		if (typeof PRO_addStyle != "undefined") {
			PRO_addStyle(css)
		} else {
			if (typeof addStyle != "undefined") {
				addStyle(css)
			} else {
				var heads = document.getElementsByTagName("head");
				if (heads.length > 0) {
					var node = document.createElement("style");
					node.type = "text/css";
					node.appendChild(document.createTextNode(css));
					heads[0].appendChild(node)
				}
			}
		}
	}
}
function getDateFromDateString(dateString, isUTCDate) {
	try {
		var year = dateString.substring(0, 4),
		month = dateString.substring(4, 6),
		day = dateString.substring(6, 8),
		hours = dateString.substring(9, 11),
		minutes = dateString.substring(11, 13),
		seconds = dateString.substring(13, 15);
		var date = new Date(year, month - 1, day, hours, minutes, seconds, "00");
		if (isUTCDate == true) {
			var n = date.getTimezoneOffset();
			date.setMinutes(date.getMinutes() - n)
		}
		return date
	} catch (err) {
		return new Date(dateString)
	}
}
function encodeDate(d) {
	var twoDigit = function (val) {
		if (val < 10) {
			return "0" + val
		} else {
			return val
		}
	};
	if (d && d.getMonth) {
		return d.getFullYear().toString() + twoDigit((d.getMonth() + 1)) + twoDigit(d.getDate())
	} else {
		return null
	}
}
function downloadTorrent(id) {
	if (!id) {
		return
	}
	var hiddenIFrameID = "hiddenDownloader",
	url = "http://zoink.it/torrent/" + id;
	iframe = document.getElementById(hiddenIFrameID);
	if (iframe === null) {
		iframe = document.createElement("iframe");
		iframe.id = hiddenIFrameID;
		iframe.style.display = "none";
		document.body.appendChild(iframe);
		console.log("SRC : " + url)
	}
	iframe.src = url
}
Enbalaba.GetLocalStore = (function () {
	var _stores = [];
	return function (name) {
		if (!_stores[name]) {
			var config = {};
			switch (name) {
			case "moviesInfo":
				config = {
					MaxProperties : 100
				};
				break;
			case "trackedSeries":
				config = {
					IsArray : true
				};
				break
			}
			_stores[name] = new Enbalaba.LocalStore(name, config)
		}
		return _stores[name]
	}
})();

Enbalaba.LocalStore = function (name, config) {
	this.Name = name;
	var defaultConfig = {
		EmptyValue : {},
		MaxTotalSize : 250000
	};
	if (!config) {
		config = {}

	} else {
		if (config.IsArray == true) {
			defaultConfig = {
				EmptyValue : [],
				MaxItems : 100,
				MaxTotalSize : 250000
			}
		}
	}
	this.Config = $.extend(defaultConfig, config)
};
Enbalaba.LocalStore.prototype = {
	_isSupported : !(typeof localStorage == "undefined" || typeof JSON == "undefined"),
	set : function (val) {
		if (this._isSupported) {
			if ($.isArray(val) && val.length > this.Config.MaxItems) {
				for (var i = 0, dif = val.length - this.Config.MaxItems; i < dif; i++) {
					val.shift()
				}
			}
			var s = JSON.stringify(val);
			if (s.length > this.Config.MaxTotalSize) {
				return false
			}
			localStorage.setItem(this.Name, s);
			return true
		}
	},
	get : function () {
		if (this._isSupported) {
			var s = localStorage.getItem(this.Name);
			if (s != null && s != "") {
				return JSON.parse(s)
			} else {
				if (this.Config.EmptyValue) {
					return this.Config.EmptyValue
				}
			}
		}
		if (this.Config.EmptyValue) {
			return this.Config.EmptyValue
		}
		return null
	}
};
Torrentz.GM.BobCatTorrentz.start();
