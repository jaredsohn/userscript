// ==UserScript==
// @name			Google Music
// @namespace		http://userscripts.org/scripts/source/68511.user.js

// @author			Ron Troyer
// @authorWeb		http://www.ronaldtroyer.com

// @description		When searching google for a song, this will pull up results from playlist.com to stream or download
// @version			1.2.6

// @include			http://*google.com/search*
// @include			https://*google.com/search*
// ==/UserScript==

script = function () {
	var links = document.evaluate('//a[@target="music_popup"]', document, null, 6, null), link;
	for (var i = 0, len = links.snapshotLength; i < len; ++i) {
		link = links.snapshotItem(i);
		
		{//Functions
		{/*script portion borrowed from swizzlemctwizzle*/
			decrypt = function(src) {
				sbox = new Array(255);
				mykey = new Array(255);
				var plaintxt = hexToChars(src);
				var psw = strToChars('sdf883jsdf22');
				var chars = calculate(plaintxt, psw);
				return charsToStr(chars);
			}
			
			hexToChars = function(hex) {
				var a = new Array();
				var b = (hex.substr(0, 2) == '0x') ? 2 : 0;
				while (b < hex.length) {
					a.push(parseInt(hex.substr(b, 2), 16));
					b += 2;
				}
				return a;
			}
			
			charsToStr = function (chars) {
				var a = '';
				var b = 0;
				while (b < chars.length) {
					a += String.fromCharCode(chars[b]);
					++b;
				}
				return a;
			}

			strToChars = function (str) {
				var a = new Array();
				var b = 0;
				while (b < str.length) {
					a.push(str.charCodeAt(b));
					++b;
				}
				return a;
			}
			
			initialize = function(pwd) {
				var a = 0;
				var b;
				var c = pwd.length;
				var d = 0;
				while (d <= 255) {
					mykey[d] = pwd[d % c];
					sbox[d] = d;
					++d;
				}
				d = 0;
				while (d <= 255) {
					a = (a + sbox[d] + mykey[d]) % 256;
					b = sbox[d];
					sbox[d] = sbox[a];
					sbox[a] = b;
					++d;
				}
			}

			calculate = function (plaintxt, psw) {
				initialize(psw);
				var a = 0;
				var b = 0;
				var c = new Array();
				var d;
				var e;
				var f;
				var g = 0;
				while (g < plaintxt.length) {
					a = (a + 1) % 256;
					b = (b + sbox[a]) % 256;
					e = sbox[a];
					sbox[a] = this.sbox[b];
					sbox[b] = e;
					var h = (sbox[a] + sbox[b]) % 256;
					d = sbox[h];
					f = plaintxt[g] ^ d;
					c.push(f);
					++g;
				}
				return c;
			}
		}
		
		//Document functions
		window.$ = function(id)  {if(document.getElementById(id)) {return(document.getElementById(id));} else {return false;}}
		window.$t = function(id) {if(document.getElementsByTagName(id)) {return(document.getElementsByTagName(id));} else {return false;}}
		
		//Add CSS to the stylesheet
		function addCSS(css) {
			var head, style;
			head = $t('head')[0];
			if (!head) { return; }
			style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = css;
			head.appendChild(style);
		}
		
		//Converts a time from MM:SS to total seconds, eg: seconds('1:25') would return 85
		seconds = function (time) {
			digits = time.match(/[\d]+/g);
			minutes = digits[0];
			seconds = digits[1];
			return((parseFloat(minutes)*60) + parseFloat(seconds));
		}
		
		//This will load the playlist search
		window.findSong = function(songName,songAbs,bandName,time,target,page,avoid) {
			
			//Set the loading icon
			myString = '';
			if (!($('loading'+songAbs))) 	myString += '<img id="loading'+songAbs+'" title="Loading Results..." style="background-image:url(http://www.facebook.com/rsrc.php/zBS5C/hash/7hwy7at6.gif); background-repeat:no-repeat; display:inline-block; height:11px; width:16px; margin-left: 11px; margin-right: 14px; float: left;">';
			if ((!($(songAbs)))&&(len>2))	{myString += '<span id="'+songAbs+'">'+songName+'</span>';} else {myString += '<span id="'+songAbs+'" style="display:none;"></span>';}
			target.innerHTML = myString + target.innerHTML;
			
			//If the page is not defined set it to page 1
			if ((!(page))||(page=='')) {page = 1;}
			
			//If avoid isn't set, define it, so we don't get an undefined
			if (!(avoid)) {avoid = '';}
			
			GM_xmlhttpRequest({
				method: 'GET', 
				url: 'http://www.playlist.com/async/searchbeta/tracks?searchfor=' + songName + ' ' + bandName + '&page=' + page,
				headers: {
					'User-agent': window.navigator.userAgent,
					'Accept': 'application/atom+xml,application/xml,text/xml',
					'Content-type': 'application/x-www-form-urlencoded'
				},
				onload: function(res) {
					if (res.status == 200) {
						data = res.responseText.match(/trackdata(.|\n)*];/)[0];
						
						//Check if we received any results from the playlist.com search
						if ((itemIds = res.responseText.match(/"linkid":[\d]+/g))&&(urls = res.responseText.match(/"song_url":".*?",/g))&&(times = res.responseText.match(/"duration":.*?,/g))) {
							
							/*
							  NOTE:
								I needed better selection of the song. Originally I just pulled the first result. Meh.
								Now it looks at the time google lists, and then looks at the duration of the returned 
								results from playlist.com, and finds the one with the closest time. It then chooses
								that song, more likely resulting in the real song instead of a remix/bad rip/30 second clip					
							*/
												
							if ((times.length > 1)&&(time!='error')) {
								for (i=0, bestTime = 5000, curSelection = 0; i<times.length; i++) {
									if (dur = times[i].match(/[\d]+/)) {
										dur = dur[0]; 									//The match above makes sure no null values are sent.
										testDiff = Math.abs((parseFloat(dur)-time));	//get the absolute difference
										if (testDiff <= bestTime) {						//if this is a closer absolute value
											testId = itemIds[i].match(/[\d]+/)[0];
											if (!(avoid.match(testId))) {
												bestTime = testDiff;
												curSelection = i;
											}
										}
									}
								}
								
								/*	Ocassionally there is a bunch of crap at the beginning of the playlist search. (ex: 50 Cent - In Da Club)
									If there is more than one page of results, and we haven't found something 
									within 8 seconds of our song,(very unscientific), load the next page */
								if ((bestTime >= 8) && (res.responseText.match('title="Go to the next page">Next'))) {
									findSong(songName,songAbs,bandName,time,target,page+1);
									return(false);
								}
							} else {
								curSelection = 0;
							}
							
							itemId = itemIds[curSelection].match(/[\d]+/)[0];
							url = urls[curSelection].match(/:".+"/)[0].replace(/(:|")/g,'');
							
							if (!(avoid.match(itemId))) {
								senditem(target,songName,songAbs,bandName,itemId,url,time,avoid);
							} else {
								alert('No more results were found for '+songName+'\r\n\r\nClick the next result button again to start over');
								senditem(target,songName,songAbs,bandName,'error','error',time);
							}
							
						} else {
							songtarget = $(songAbs);
							err = false;
							if (songName.match(/\(.+/)) {
							
		// special rule for certain remix labels like Paparazzi (Dave Aude Remix)
								if (songName.match(/\(.+?\)/)) {
									songName = songName.replace(/\(.+?\)/g,'');
								} else {
		// special rule for certain remix labels that begin the parenthesis but Google cuts off the ending
									songName = songName.replace(/\(.+/g,'');
								}
								if (songtarget) {songtarget.innerHTML = songName;}
								findSong(songName,songAbs,bandName,time,target,page,avoid);
							
							} else if (songName.match(/'.*?'/)) {
							
		// special rule for certain remix labels
								if (songName.match(/'.*?remix.*?'/i)) {
									songName = songName.replace(/'.*?remix.*?'/i,'');
							
		// special rule for certain remix labels like 'Crawl' Mike Snow Remix
								} else {
									songName = songName.match(/'.*?'/)[0].replace(/'/g,'');
								}
								if (songtarget) {songtarget.innerHTML = songName;}
								findSong(songName,songAbs,bandName,time,target,page,avoid);
							
		// special rule for songs with an apostrophe in the title like Hot 'N Cold
							} else if (songName.match(/'/)) {
								songName = songName.replace(/'/g,'');
								findSong(songName,songAbs,bandName,time,target,page,avoid);
								
		// special rule for bands like The All American Rejects, The Who, etc.
							} else if (bandName.match(/the/i)) {
								bandName = bandName.replace(/the/i,'');
								findSong(songName,songAbs,bandName,time,target,page,avoid);
							
		// special rule for band names like ke$ha
							} else if (bandName.match(/\$/)) {	
								bandName = bandName.replace(/\$/g,'s');
								findSong(songName,songAbs,bandName,time,target,page,avoid);
								
							} else {
								err = true;
								senditem(target,songName,songAbs,bandName,'error','error',time);
							}
							
							if (!(err)) {
								if (loading = $('loading'+songAbs)) {loading.parentNode.removeChild(loading);}
								if (loading = $(songAbs)) {loading.parentNode.removeChild(loading);}
							}
						}
					}
				}
			});
		}
		
		senditem = function(target,songName,songAbs,bandName,itemId,url,time,avoid) {
			if (loading = $('loading'+songAbs)) {
				loading.parentNode.removeChild(loading);
			}
			while ($('greasePlayer'+songAbs)) {
				songAbs += ' ';
			}
			if(itemId != 'error') {
				myString  = '<object id="greasePlayer'+songAbs+'" style="float:left; margin-right: 5px; height: 20px; width: 36px; display: inline-block;" type="application/x-shockwave-flash" id="singletrack_1" name="singletrack_1" data="http://static.pplaylist.com/players/singleButton_playadd.swf" style="visibility: visible;"><param name="wmode" value="transparent"><param name="bgcolor" value="#ffffff"><param name="allowscriptaccess" value="always"><param name="allowfullscreen" value="false"><param name="flashvars" value="movie=http://static.pplaylist.com/players/singleButton_playadd.swf&amp;song_url='+ url + '&amp;promo=490613957fd52678&amp;wid=&amp;loc=&amp;link=http://www.playlist.com/playlist/additem/'+itemId+'"></object>';
				target.innerHTML = myString + target.innerHTML;
				if (len <= 2) {
					secondary = target.childNodes[3];
					secondary.innerHTML = secondary.innerHTML.replace(/<br.*?>/,'');
					//secondary.parentNode.parentNode.innerHTML = secondary.parentNode.parentNode.innerHTML.match(/<div.*<\/div>/i)[0];
				} else {
					secondary = target;
				}
				if (!($('greaseSearch'+songAbs))) {
					secondary.innerHTML += '<a id="greaseSearch'+songAbs+'" target="_blank" title="Search for ' + songName + ' by ' + bandName + ' on Playlist.com"href="http://www.playlist.com/searchbeta/tracks#'+songName+ ' ' + bandName+'"><span style=" background: #FFF url(http://www.facebook.com/rsrc.php/z8S5R/hash/ez3x5cuc.png) no-repeat scroll -1px 0pt; display: inline-block; height: 16px; width: 16px; margin-left: 9px;"></span></a><a id="greaseDownload'+songAbs+'" title="Download ' + songName + ' by ' + bandName + '" href="'+decrypt(url)+'"><img border=0 style="height: 13px; margin-left: 5px;" src="http://fc03.deviantart.net/fs70/f/2010/041/7/b/Download_by_user002.png"></a><a title="Choose next result" href="javascript:" id="greaseReload'+songAbs+'" class="'+songName+','+songAbs+','+bandName+','+time+', , ,'+avoid+':'+itemId+'"><img border=0 style="height: 13px; margin-left: 5px;" src="http://fc07.deviantart.net/fs71/f/2010/042/3/e/reload_by_user002.png"></a>';
				} else {
					$('greaseDownload'+songAbs).style.display = 'inline-block';
					$('greaseDownload'+songAbs).href = decrypt(url);
					$('greaseReload'+songAbs).className = songName+','+songAbs+','+bandName+','+time+', , ,'+avoid+':'+itemId;
				}

			} else {
				//If we didn't load any results for this song
				myString = '<img id="Error'+songAbs+'" title="Error" style="background-image:url(http://fc09.deviantart.net/fs71/f/2010/042/0/e/error_by_user002.png); background-repeat:no-repeat; display:inline-block; height:20px; width:19px; margin-left: 9px; margin-right: 13px; float: left;">';
				target.innerHTML = myString + target.innerHTML;
				if (!($('greaseSearch'+songAbs))) {
					target.innerHTML += '<a id="greaseSearch'+songAbs+'" target="_blank" title="Search for ' + songName + ' by ' + bandName + ' on Playlist.com"href="http://www.playlist.com/searchbeta/tracks#'+songName+' '+bandName+'"><span style=" background: #FFF url(http://www.facebook.com/rsrc.php/z8S5R/hash/ez3x5cuc.png) no-repeat scroll -1px 0pt; display: inline-block; height: 16px; width: 16px; margin-left: 9px;"></span></a>';
				} else {
					$('greaseReload'+songAbs).className = songName+','+songAbs+','+bandName+','+time+', , ,';
					$('greaseDownload'+songAbs).style.display = 'none';
				}
			}
			//MUST BE AFTER BOTH POSSIBILITIES
			$('greaseReload'+songAbs).addEventListener('click',function () {
				if (player = $('greasePlayer'+songAbs))
					player.parentNode.removeChild(player);
				if (err = $('Error'+songAbs))
					err.parentNode.removeChild(err);
				if (len <= 2) {
					target = this.parentNode.parentNode;
				} else {
					target = this.parentNode;
				}
				
				//target is not set through class name
				myArray = this.className.split(',');
				window.findSong(myArray[0],myArray[1],myArray[2],myArray[3],target,'',myArray[6]);
			},false);
		}
		}
		
		
		addCSS('a[target="music_popup"] {display:none;}');
		if (len <= 2) {
			//SINGLE SONG SEARCH			
			if (!(window.myTarget)) {
				window.myTarget = link;
						
				songstring = link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].innerHTML;
				songName = songstring.match(/<em>.*?<\/em>/)[0].replace(/<.*?em>/g,'');
				songName = songName.replace(/\.\.\./g,'');
				songName = songName.replace(/&amp;/g,'and');
				bandName = songstring.substring(songName.length+13);
				
				if(link.parentNode.parentNode.innerHTML.match(/[\d]+:\d{2}/)) {
					myTime = link.parentNode.parentNode.innerHTML.match(/[\d]+:\d{2}/)[0];
					myTime = seconds(myTime);
				} else {
					myTime = 'error';
				}
				
				findSong(songName,songName,bandName,myTime,link.parentNode.parentNode);
			}
		} else {
			//BAND SEARCH
			bandName = link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[0].innerHTML;
			bandName = bandName.replace(/<.*?em>/g,'');
			
			//Run this less (oc)
			if (i == 0)
				link.parentNode.parentNode.childNodes[link.parentNode.parentNode.childNodes.length-1].style.display = 'none';				
			
			if (link.innerHTML.substring(0,1) != '<') {
				songName = link.innerHTML;
				songName = songName.replace(/\.\.\./g,'');
				songName = songName.replace(/&amp;/g,'and');
				
				if(link.parentNode.innerHTML.match(/[\d]+:\d{2}/)) {
					time = link.parentNode.innerHTML.match(/[\d]+:\d{2}/)[0];
					time = seconds(time);
				} else {
					time = 'error';
				}
				
				link.parentNode.style.height = '20px';
				link.style.display = 'none';
				findSong(songName,songName,bandName,time,link.parentNode);
			}
		}
	}
}

addEventListener('DOMNodeInserted', function () {
	//script();
},true);

script();