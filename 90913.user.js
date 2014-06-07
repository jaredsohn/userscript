// ==UserScript==
// @name           8tracks helper
// @namespace      Yamamaya
// @description    8tracks helper
// @include        http://8tracks.com/selection*
// @include        https://8tracks.com/selection*
// @include        http://8tracks.com/mixes/new*
// @include        https://8tracks.com/mixes/new*
// @include        http://8tracks.com/all/mixes*
// @include        https://8tracks.com/all/mixes*
// @version        1.3.2
// ==/UserScript==

(function(){
	var executeBrowserContext = function(funcOrString){
		var code = 'javascript:('+ encodeURIComponent(funcOrString.toString()) +')();';
		location.href = code;
	};

	executeBrowserContext(function(){
		var Utils = {
			xpath: function(exp, context, resolver){
				context || (context = document);
				var doc = context.ownerDocument || context;
				var result = doc.evaluate(exp, context, resolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				for(var i = 0, len = result.snapshotLength, res = []; i < len; i++){
					res.push(result.snapshotItem(i));
				};
				return res;
			},
			createMessageEvent: function(name,obj){
				var data = '';
				if(typeof obj === 'string'){
					data = obj;
				}
				else
				if(typeof obj === 'object'){
					try{
						var data = JSON.stringify(obj);
					}
					catch(ex){
					}
				}
				var event = document.createEvent('MessageEvent');
				event.initMessageEvent(name,
								true,false,
								data,
								location.protocol + '//' + location.host,
								'', window);
				window.dispatchEvent(event);
			}
		};
	
		var LastFMAPI = {
			key    : '9a5f3525bc17ab919d3b684adf14d9eb',
			baseUrl: 'http://ws.audioscrobbler.com/2.0/',
			tagWeeklyChartList: [],
			currentSimilarArtists: [],
			getTopTags: function(){
				var url = [
					this.baseUrl + '?method=chart.gettoptags',
					'api_key='+ this.key,
					'format=json',
					'callback=EightTracksHelper.tagsSearchCompleted'
				].join('&');
				
				var s = document.createElement('script');
					s.className = 'eightTracks_helper_script';
					s.src = url;
					s.type = 'text/javascript';
				document.body.appendChild(s);
			},
			getArtistTags: function(name){
				var url = [
					this.baseUrl + '?method=artist.gettoptags',
					'artist=' + encodeURIComponent(name),
					'api_key='+ this.key,
					'format=json',
					'callback=EightTracksHelper.tagsSearchCompleted'
				].join('&');
				
				var s = document.createElement('script');
					s.className = 'eightTracks_helper_script';
					s.src = url;
					s.type = 'text/javascript';
				document.body.appendChild(s);
			},
			getWeeklyArtistChartTags: function(name,dateObj){
				var date = dateObj && [
					'from=' + dateObj.from,
					'to='   + dateObj.to
				].join('&') || '';
				var url = [
					this.baseUrl + '?method=tag.getweeklyartistchart',
					'tag=' + encodeURIComponent(name),
					'api_key='+ this.key,
					'limit='+ 300,
					date,
					'format=json',
					'callback=EightTracksHelper.artistsSearchCompleted'
				].join('&');
				
				var s = document.createElement('script');
					s.className = 'eightTracks_helper_script';
					s.src = url;
					s.type = 'text/javascript';
				document.body.appendChild(s);
			},
			getTagWeeklyChartList: function(name){
				var url = [
					this.baseUrl + '?method=tag.getweeklychartlist',
					'tag=' + encodeURIComponent(name),
					'api_key='+ this.key,
					'format=json',
					'callback=EightTracksHelper.tagChartListCompleted'
				].join('&');
				
				var s = document.createElement('script');
					s.className = 'eightTracks_helper_script';
					s.src = url;
					s.type = 'text/javascript';
				document.body.appendChild(s);
			},
			getSimilarArtists: function(name){		
				var url = [
					this.baseUrl + '?method=artist.getsimilar',
					'artist=' + encodeURIComponent(name),
					'api_key='+ this.key,
					'limit='  + 10,
					'format=json',
					'callback=EightTracksHelper.artistsSearchCompleted'
				].join('&');
			
				var s = document.createElement('script');
					s.className = 'eightTracks_helper_script';
					s.src = url;
					s.type = 'text/javascript';
				document.body.appendChild(s);
			},
			getTopArtists: function(){
				var url = [
					this.baseUrl + '?method=chart.gettopartists',
					'api_key='+ this.key,
					'format=json',
					'callback=EightTracksHelper.artistsSearchCompleted'
				].join('&');
			
				var s = document.createElement('script');
					s.className = 'eightTracks_helper_script';
					s.src = url;
					s.type = 'text/javascript';
				document.body.appendChild(s);
			},
			getHypedArtists: function(){
				var url = [
					this.baseUrl + '?method=chart.gethypedartists',
					'api_key='+ this.key,
					'format=json',
					'callback=EightTracksHelper.artistsSearchCompleted'
				].join('&');
			
				var s = document.createElement('script');
					s.className = 'eightTracks_helper_script';
					s.src = url;
					s.type = 'text/javascript';
				document.body.appendChild(s);
			}
		};

		var GoogleAPI = {
			baseUrl: 'https://ajax.googleapis.com/ajax/services/search/',
			imageSearch: function(query,start){
				start = /^\d+$/.test(start) && start || 0;
				var url = this.baseUrl + [
					'images?v=1.0',
					'q=' + encodeURIComponent(query),
					'safe=moderate',//active,off,moderate
					'rsz=8',//1-8
					'start=' + start,
					'callback=EightTracksHelper.imageSearchCompleted' 
				].join('&');
				
				var s = document.createElement('script');
					s.className = 'eightTracks_helper_script';
					s.src = url;
					s.type = 'text/javascript';
				document.body.appendChild(s);
			}
		};

		var BingAPI = {
			key: 'B72AF4F756B437F7F6FCE75EB719BB4160F13C31',
			baseUrl: 'http://api.bing.net/json.aspx?',
			imageSearch: function(query,offset){
				offset = /^\d+$/.test(offset) && offset || 0;
				var url = this.baseUrl + [
					'AppId=' + this.key,
					'Query=' + query,
					'Sources=Image',
					'Version=2.0',
					'Adult=Moderate',//Off,Moderate,Strict
					'Image.Count=10',
					'Image.Offset=' + offset,
					'JsonType=callback',
					'JsonCallback=EightTracksHelper.imageSearchCompleted'
				].join('&');
			
				var s = document.createElement('script');
					s.className = 'eightTracks_helper_script';
					s.src = url;
					s.type = 'text/javascript';
				document.body.appendChild(s);
			}
		};
	
		var MixSelectionHelper = {
			init: function(){
				this.setPageVar();
				this.addStyle();
				this.setEvent();
				this.setSelectButton();
				this.createMixHelperEle();
			},
			setPageVar: function(){
				var self = this;
				if(!window.EightTracksHelper){
					window.EightTracksHelper = {
						artistsSearchCompleted: function(json){
							self.onArtistsSearchCompleted(json);
						},
						tagChartListCompleted: function(json){
							self.onTagChartListCompleted(json);
						}
					};
				}	
			},
			setEvent: function(){
				//window.addEventListener('input',this,false);
				window.addEventListener('keypress',this,true);
				document.body.addEventListener('change',this,false);
				document.addEventListener('click',this,true);
			},
			handleEvent: function(evt){
				var target = evt.target;
				switch(evt.type){
					case 'change':
						if(target.id === 'eightTracks_helper_search_tracks_dropdown'){
							this.onSearchTypeChange(target);
						}
					break;
					/*
					case 'input':
						if(target.id === 'eightTracks_helper_mix_create_input'){
							var v = target.value.replace(/^\s+|\s+$/g,'');
							var button = document.getElementById('eightTracks_helper_mix_create_button');
							if(v.length){
								button.removeAttribute('disabled');
							}
							else{
								button.setAttribute('disabled','true');
							}
						}
					break;
					*/
					case 'keypress':
						switch(evt.keyCode){
							case 13:
								if(target.id === 'eightTracks_helper_mix_create_input' || target.id === 'eightTracks_helper_mix_create_button'){
									this.createMix();
									evt.preventDefault();
									evt.stopPropagation();
								}
							break;
						}
					break;
				
					case 'click':
						if(evt.button)
							return;
						if(target.id === 'eightTracks_helper_mix_create_button'){
							this.createMix();
						}
					break;
				}
			},
			onSearchTypeChange: function(target){
				var index = target.selectedIndex;
				var option = target.options[index];
				this.valuePage.value  = '0';
				this.valueInput.value = option.value;
				search_tracks();
			},
			setSelectButton: function(){
				var contents = ''; 
				var r  = [
					{
						type: 'all',
						name: 'Network'
					},
					{
						type: 'my',
						name: 'Your tracks'
					},
					{
						type: 'fav',
						name: 'Favorites'
					}
				];
				r.forEach(function(dic){
					var type = dic.type + '_tracks';
					contents += [
						'<option value="'+ type +'">',
							dic.name,
						'</option>'
					].join('');
				});
				var select = document.createElement('select');
					select.id = 'eightTracks_helper_search_tracks_dropdown';
					select.innerHTML = contents;
					select.selectedIndex = 1;
				var target = document.getElementsByClassName('yourtracks')[0];
				if(target)
					target.parentNode.replaceChild(select,target);
			},
			clearMix: function(){
				while(this.addTracksArea.firstChild){
					this.addTracksArea.removeChild(this.addTracksArea.firstChild);
				};
			},
			createMix: function(){
				$('spinner2').show();	
				this.similarArtists = [];
				this.clearMix();
				this.initCreateMix();
				var sSelect = document.getElementById('eightTracks_helper_mix_create_search_select');
				switch(sSelect.selectedIndex){
					case 0:
					default:
						this.artistSearch();
					break;
					
					case 1:
						this.tagSearch();
					break;
				}
			},
			artistSearch: function(name){
				name = name || this.inputArea.value.replace(/^\s+|\s+$/g,'');		
				if(name){
					this.searchedArtist = name;
					this.showNotification('Searching similar artists......');	
					LastFMAPI.getSimilarArtists(name);
				}	
				else{
					var search = [
						'getTopArtists',
						'getHypedArtists'
					];
					var ran = parseInt(Math.random() * search.length);
					var mes = search[ran].match(/get\w+/);
						mes = mes[0].replace(/[A-Z]/g,function(a,b,c){
							return ' ' + a.toLowerCase();
						}).replace(/^get\s+/,'');
					this.showNotification('Searching '+ mes +'......');	
					LastFMAPI[search[ran]]();
				}
			},
			tagSearch: function(name){
				name = name || this.inputArea.value.replace(/^\s+|\s+$/g,'');
				if(name){
					var mes = 'Getting weekly chart list......';
					if(LastFMAPI.tagWeeklyChartList.length){
						mes = 'Searching artists......';
						LastFMAPI.getWeeklyArtistChartTags(name,LastFMAPI.tagWeeklyChartList[LastFMAPI.tagWeeklyChartList.length - 1]);
					}
					else{
						LastFMAPI.getTagWeeklyChartList(name);
					}
					this.showNotification(mes);
				}
				else{
					$('spinner2').hide();	
					this.showNotification('Please input a tag name.',true);
				}
			},
			showNotification: function(str,isError){
				var cName = (isError) && 'eightTracks_helper_notification_error' || 'eightTracks_helper_notification';
				var area = this.notificationArea; 
				area.style.display = 'block';
				area.className = cName;
				var span = area.getElementsByTagName('span')[0];
				span.textContent = str;
			},
			createMixHelperEle: function(){
				var point = document.getElementById('tracks_drop_area');
				var div = document.createElement('div');
					div.id = 'eightTracks_helper_mix_create_container';
				var sOptions = [
					'Artist',
					'Tag'
				];
				sOptions = sOptions.map(function(name){
					return '<option value="'+ name +'">'+ name +'</option>';
				});
				var sSelect = [
					'<select id="eightTracks_helper_mix_create_search_select">',
					'</select>'
				].join(sOptions.join(''));
				/*	
				var options = [].map.call(0 + Array(23),function(_,i){
					var n = i + 8;
					return '<option value="'+n+'">'+n+'</option>';
				});
				*/
				var nOptions = [];
				for(var i = 8; i < 31; i++){
					nOptions.push('<option value="'+i+'">'+i+'</option>');
				};
				var nSelect = [
					'<select id="eightTracks_helper_mix_create_max_select">',
					'</select>'
				].join(nOptions.join(''));
				div.innerHTML = '<div id="eightTracks_helper_mix_create_notification_container">' +
									'<span></span>' +
								'</div>' 
							  + '<input type="text" id="eightTracks_helper_mix_create_input"/>'
							  + sSelect
							  + nSelect
							  + '<button type="button" id="eightTracks_helper_mix_create_button">Create</button>';
				point.insertBefore(div,point.firstChild);
			},
			prevent: true,
			mixLength  : 8,
			addedTracks: 0,
			artistNames: [],
			similarArtists: [],
			initCreateMix: function(){
				this.prevent = true;
				this.artistNames = [];
				this.addedTracks = 0;
				this.mixLength = parseInt(document.getElementById('eightTracks_helper_mix_create_max_select').value);
			},
			searchSoundCloud: function(q,page,func){
				if(typeof q !== 'string')
					q = '';
				page = /^\d+$/.test(page) && parseInt(page) || 0;	
				var perPage = 50;
				var order = ['','hotness'];
				
				$j.ajax( {
					url: 'http://api.soundcloud.com/tracks.json',
					data: { 
						client_id       : SOUNDCLOUD_CLIENT_ID,
						limit           : perPage,
						offset          : ((page || 1) - 1) * perPage,
						filter          : 'streamable',
						q       	    : q,
						types           : ['original'].join(','),
						'duration[from]': (1000 * 60),
						'duraiton[to]'  : (1000 * 60 * 11),
						order           : order[parseInt(Math.random() * order.length)] //q === '' ? 'hotness' : '' 
					},
					dataType: 'jsonp',
					success: function(json){
						var tracks = { 
							tracks   : json, 
							prev_page: page < 2 ? false : page - 1, 
							next_page: json.length == perPage ? page + 1 : false 
						};
						var htmlStr = JST['selection/_soundcloud_track_results'](tracks);
						func(htmlStr,json);
					}
				});			
			},
			onAddedArtists: function(artists){
				if(this.prevent)
					return;
				this.showNotification('Getting tracks.....');
				var self = this;
				if(this.addedTracks >= this.mixLength){
					this.showNotification('Complete!!');
					return;
				}
				else
				if(!artists.length){
					this.showNotification('Similar artists is 0.');
					this.searchSoundCloud('',0,function(str,json){
						var artists = json.map(function(obj){
							return obj.user.username;
						});
						if(artists.length){
							self.onAddedArtists(artists);
						}
					});
					return;
				}
				this.artistNames = artists;
				var n = parseInt(Math.random() * this.artistNames.length);
				this.searchSoundCloud(artists[n],0,function(str,json){
					if(self.prevent){
						self.clearMix();
						return;
					}
					var dummy = document.createElement('div');
					dummy.innerHTML = str;
					var tracks = dummy.querySelectorAll('#track_results > li');
					var trackNumber = parseInt(Math.random() * tracks.length);
					var track  = tracks[trackNumber];
					var trackObj = json[trackNumber] || {};
					var isDuration = trackObj.duration > (1000 * 60) && trackObj.duration < (1000 * 60 * 10);
					if(track && isDuration){
						self.addedTracks++;
						$j('#track_scroller').removeClass('empty');
						self.addTracksArea.appendChild(track);
						registerSortables();
						updateMixFromList();
					}
					self.artistNames.splice(n,1);
					self.onAddedArtists(self.artistNames);
					//alert(tracks.length);
					//$j('#track_search_results').html(json.html);
					//registerSortables();				
				});
			},
			onArtistsSearchCompleted: function(json){
				var self = this;
				$('spinner2').hide();
				this.removeScript();
				var error = json.error;
				if(error){
					this.onSimilarArtistsError(json);
					return;
				}
				var artists = json.similarartists || json.artists || json.weeklyartistchart;
				if(json.artists){
					artists.artist.sort(function(){
						return parseInt(Math.random() * 10) > parseInt(Math.random() * 10);
					});
					artists.artist.splice(10);
				}
				artists = artists.artist;
				if(!$j.isArray(artists) || !artists.length){
					this.showNotification('No results.',true);
					return;
				}
				var artistNames = artists.map(function(obj){
					return obj.name;
				});
				if(artistNames.length && this.searchedArtist){
					artistNames.unshift(this.searchedArtist);
				}
				artistNames = artistNames.filter(function(name){
					return self.similarArtists.indexOf(name) > -1 ? false: true;
				});
				this.similarArtists = this.similarArtists.concat(artistNames);
				if(this.similarArtists.length < this.mixLength + 10){
					$('spinner2').show();
					var name = artistNames[parseInt(Math.random() * artistNames.length)] || 
							   this.similarArtists[parseInt(Math.random() * this.similarArtists.length)];
					if(name){		   
						LastFMAPI.getSimilarArtists(name);
					}	
					else{
						var search = [
							'getTopArtists',
							'getHypedArtists'
						];
						LastFMAPI[search[parseInt(Math.random() * search.length)]]();
					}	
					return;
				}
				this.prevent = false;
				artistNames = this.similarArtists;
				this.onAddedArtists(artistNames);
			},
			onSimilarArtistsError: function(json){
				this.showNotification(json.message,true);
			},
			onTagChartListCompleted: function(json){	
				$('spinner2').hide();
				this.removeScript();
				var error = json.error;
				if(error){
					this.showNotification(json.message,true);
					return;
				}
				$('spinner2').show();	
				var list  = json.weeklychartlist;
				var chart = list.chart;
				if(!chart || !chart.length){
					this.showNotification('Invalid tag name - no tag with that name.',true);
					return;
				}
				LastFMAPI.tagWeeklyChartList = chart;
				var attr = list['@attr'];
				var tagName = attr.tag;
				LastFMAPI.getWeeklyArtistChartTags(tagName,chart[chart.length - 1]);
			},
			removeScript: function(){
				var script = document.querySelectorAll('body > script.eightTracks_helper_script[src^="http://ws.audioscrobbler.com/2.0/?method="]')[0];
				if(script)
					script.parentNode.removeChild(script);
			},
			addStyle: function(str){
				str = str && str || this.css;
				jQuery('<style />',{
					type: 'text/css',
					text: str
				}).appendTo('head');
			},
			get css(){
				var code = '';
				var dic = {
					'#eightTracks_helper_search_tracks_dropdown': {
						'font-weight': 'bold',
						'position': 'relative',
						'top': '6px',
						'padding-left': '10px'
					},
					'#eightTracks_helper_search_tracks_dropdown option': {
						'padding': '0px 10px'
					},
					'#eightTracks_helper_mix_create_container': {
						'margin-bottom': '10px'
					},
					'#eightTracks_helper_mix_create_container > *': {
						'margin-right': '5px'
					},
					'#eightTracks_helper_mix_create_input': {
						'border-radius': '3px',
						'-moz-border-radius': '3px',
						'-webkit-border-radius': '3px',
						'background': 'url("http://a2.8tracks.com/assets/../images/bg/bg.searchbox.png") no-repeat scroll 3px 2px #284864',
						'border': '1px solid #011B31',
						'color': '#999999',
						'height': '22px',
						'width': '85px',
						'padding-left': '25px',
						'-moz-transition-duration': '500ms',
						'-webkit-transition-duration': '500ms'
					},
					'#eightTracks_helper_mix_create_input:hover, #eightTracks_helper_mix_create_input:focus': {
						'color': '#FFFFFF',
						'background-color': '#30506B'
					},		
					'#eightTracks_helper_mix_create_notification_container': {
						'display': 'none',
						'margin-bottom': '5px',
						'padding': '3px 5px',
						'color': '#FFFFFF',
						'background-color': '#142B47',
						'border-radius': '3px',
						'-moz-border-radius': '3px',
						'-webkit-border-radius': '3px',
						'border': '1px solid #CCCCCC'
					},
					'.eightTracks_helper_notification_error': {
						'background-color': 'yellow !important'
					},
					'.eightTracks_helper_notification_error > span': {
						'color': 'black'
					},
					'#eightTracks_helper_mix_create_notification_container > span': {
						'margin-left': '5px'
					}
				};
				for(var i in dic){
					code += i + '\n{\n';
					var c = dic[i];
					for(var p in c){
						code += '	' + p + ': ' + c[p] + ';';
					};
					code += '\n}\n';
				};
				return code;
			},
			get valueInput(){
				delete this.valueInput;
				return this.valueInput = document.getElementById('v');
			},
			get valuePage(){
				delete this.valuePage;
				return this.valuePage = document.getElementById('page');
			},
			get addTracksArea(){
				delete this.addTracksArea;
				return this.addTracksArea = document.getElementById('selected_tracks');
			},
			get inputArea(){
				delete this.inputArea;
				return this.inputArea = document.getElementById('eightTracks_helper_mix_create_input');
			},
			get notificationArea(){
				delete this.notificationArea;
				return this.notificationArea = document.getElementById('eightTracks_helper_mix_create_notification_container');
			}
		};
		
		var MixDetailsHelper = {
			init: function(){
				this.setPageVar();
				this.addStyle();
				this.setEvent();
				this.createImageHelperEle();	
				//this.createTagsHelperEle();
			},
			setPageVar: function(){
				var self = this;
				if(!window.EightTracksHelper){
					window.EightTracksHelper = {
						imageSearchCompleted: function(json){
							self.onImageSearchCompleted(json);
						},
						tagsSearchCompleted: function(json){
							self.onTagsSearchCompleted(json);
						}
					};
				}	
			},
			setEvent: function(){
				var self = this;
				jQuery('#upload_from_file a').click(function(){
					self.showImageSearch();
				});
				jQuery('#upload_from_url a').click(function(){
					self.hideImageSearch();
				});
				window.addEventListener('input',this,false);
				window.addEventListener('keypress',this,false);
				document.addEventListener('click',this,true);
				document.addEventListener('DOMAttrModified',this,false);
				document.addEventListener('change',this,false);
			},
			handleEvent: function(evt){
				var target = evt.target;
				switch(evt.type){
					case 'DOMAttrModified':
						if(target.id === 'upload_from_url' && evt.attrName === 'style'){
							if(!/none/i.test(evt.newValue)){
								this.showImageSearch();
							}
							else{
								this.hideImageSearch();
							}
						}
					break;
					
					case 'input':
						if(target.id === 'eightTracks_helper_mix_image_search_input'){
							this.setSearchButtonState();
						}
						else
						if(target.id === 'mix_tag_list'){
							//this.setTagsList();
						}
					break;
					
					case 'keypress':
						switch(evt.keyCode){
							case 13:
								if(target.id === 'eightTracks_helper_mix_image_search_input' || target.id === 'eightTracks_helper_mix_image_search_button'){
									this.searchImages();
									evt.preventDefault();
									evt.stopPropagation();
								}	
							break;
						}
					break;
				
					case 'click':
						if(evt.button)
							return;
						if(target.id === 'eightTracks_helper_mix_image_search_button'){
							this.searchImages();
							evt.preventDefault();
							evt.stopPropagation();
						}
						else
						if(target.id === 'eightTracks_helper_mix_tags_search'){
							//this.searchTags();
							evt.preventDefault();
							evt.stopPropagation();
						}
						else{
							var tag = Utils.xpath('ancestor-or-self::*[contains(concat(" ",@class," ")," eightTracks_helper_mix_tag ")][1]',target)[0];
							if(tag){
								//this.setTagsList(tag.textContent);
								evt.preventDefault();
								evt.stopPropagation();
							}
							var thumbnail = Utils.xpath('ancestor-or-self::*[@class="eightTracks_helper_mix_image_thumbnail"][1]',target)[0];
							if(thumbnail){
								this.setImageUrl(thumbnail);
								evt.preventDefault();
								evt.stopPropagation();
							}
							var searchNavi = Utils.xpath('ancestor-or-self::*[@class="eightTracks_helper_mix_image_search_navi"][1]',target)[0];
							if(searchNavi){
								this.searchImages(searchNavi.getAttribute('query'),searchNavi.getAttribute('offset'));
								document.documentElement.scrollTop = 0;
								evt.preventDefault();
								evt.stopPropagation();
							}
						}
					break;
					
					case 'change':
						if(target.id === 'eightTracks_helper_mix_image_search_option_select'){
							this.searchImages();
							this.setSearchFavicon();
						}
					break;
				}
			},
			searchTags: function(){
				this.tagsSearchButton.parentNode.removeChild(this.tagsSearchButton);
				this.showTagsLoading();
				var des = this.mixDescriptionArea;
				var v = des.value.split('and');
					v = v[v.length - 1];
				if(v){	
					v = v.replace(/^\s+|\s+$|\.|,/g,'');
					LastFMAPI.getArtistTags(v);
				}	
				else{
					LastFMAPI.getTopTags();
				}	
			},
			searchImages: function(v,offset){
				var mode  = this.imageOptionSelecter.selectedIndex;
				var input = this.imageSearchArea;
				v = (typeof v === 'string') && v || input.value.replace(/^\s+|\s+$/g,'');
				if(!v.length)
					return;
				this.setSearchFavicon();	
				this.showImageLoading();	
				switch(mode){
					case 0:
					default:
						GoogleAPI.imageSearch(v,offset);
					break;
					
					case 1:
						BingAPI.imageSearch(v,offset);
					break;
				}
			},
			setSearchFavicon: function(){
				var img = this.imageSearchFavicon;
				var a = img.parentNode;
				var select = this.imageOptionSelecter;
				var option = select.options[select.selectedIndex];
				var name = option.text.toLowerCase();
				var domain = 'www.' + name + '.com';
				var url = 'http://'+ domain +'/favicon.ico';
				img.src = url;
				var v = this.imageSearchArea.value.replace(/^\s+|\s+$/g,'');
				var link;
				if(name === 'google'){
					if(v.length){
						link = 'http://'+ domain +'/images?q=' + encodeURIComponent(v);
					}
					else{
						link = 'http://'+ domain +'/imghp';
					}
				}
				else
				if(name === 'bing'){
					if(v.length){
						link = 'http://'+ domain +'/images/search?q=' + encodeURIComponent(v);
					}
					else{
						link = 'http://'+ domain +'/?scope=images';
					}
				}
				a.href = link;
			},
			setSearchButtonState: function(){
				var v = this.imageSearchArea.value.replace(/^\s+|\s+$/g,'');
				var button = this.imageSearchButton;
				button.disabled = (v.length) ? false: true;
			},
			setImageUrl: function(target){
				var img   = document.getElementById('mix_art_preview');
				img.src   = target.href;
				var point = document.getElementById('mix_new_cover_url');
				point.value = target.href;
			},
			showImageSearch: function(){
				this.imageSearchContainer.style.display = '';	
			},
			hideImageSearch: function(){
				this.imageSearchContainer.style.display = 'none';
			},
			showImageLoading: function(){
				this.imageSearchLoading.style.display = 'inline';
			},
			hideImageLoading: function(){
				this.imageSearchLoading.style.display = 'none';
			},
			showTagsLoading: function(){
				this.tagsSearchLoading.style.display = 'inline';
			},
			hideTagsLoading: function(){
				this.tagsSearchLoading.style.display = 'none';
			},
			showTagsNotification: function(){
				this.tagsSearchNotification.style.display = 'block';
			},
			hideTagsNotification: function(){
				this.tagsSearchNotification.style.display = 'none';
			},
			setTagsList: function(name){
				var target = this.tagsListArea;
				var tags = target.value.split(',').filter(function(str){
					str = str.replace(/\s+/g,'');
					return str.length;
				});
				if(name){
					var isPush = true;
					tags.some(function(tag,i,self){
						tag = tag.replace(/^\s+|\s+$/g,'').toLowerCase();
						if(tag === name.toLowerCase()){
							isPush = false;
							self.splice(i,1);
							return true;
						}
					});
					if(isPush)
						tags.push(name); 
				}
				if(tags.length > 5){
					this.showTagsNotification();
				}
				else{
					this.hideTagsNotification();
				}
				if(!name){
					this.updateTagCloud();
					return;
				}	
				target.value = tags.map(function(str){
					return str.replace(/^\s+|\s+$/g,'');
				}).join(', ');
				this.updateTagCloud();
			},
			createTags: function(tags){
				var point = Utils.xpath('.//div[child::div[child::input[@id="mix_tag_list"]]]')[0];
				var div = document.createElement('div');
					div.className = 'tags';
					div.style.cssFloat = 'left';
				var str = '';	
				var target = this.tagsListArea;
				var _tags = target.value.split(',');
					_tags = _tags.map(function(tag){
						return tag.replace(/^\s+|\s+$/g,'');
					});
				tags.forEach(function(obj){
					var name = obj.name;
					var url = obj.url;
					var cName = ['eightTracks_helper_mix_tag'];
					if(_tags.indexOf(name) > -1){
						cName.push('active');
					}
					cName = cName.join(' ');
					str += '<a href="'+url+'" target="_blank" class="'+cName+'">'+
								'<span class="tagname">'+ name +'</span>'+
							'</a>';
				});
				div.innerHTML = str;
				point.appendChild(div);
			},
			updateTagCloud: function(){
				var target = this.tagsListArea;
				var _tags = target.value.split(',');
					_tags = _tags.map(function(tag){
						return tag.replace(/^\s+|\s+$/g,'');
					});
				var tags = $j('.tags > .eightTracks_helper_mix_tag');
				tags.each(function(i,node){
					var tag = node.textContent;
					node = $j(node);
					if(_tags.indexOf(tag) < 0){
						node.removeClass('active');
					}
					else{
						node.addClass('active');
					}
				});
			},
			createTagsHelperEle: function(){
				var time = new Date().getTime();
				var point = Utils.xpath('.//div[child::div[child::input[@id="mix_tag_list"]]]')[0];
				var div = document.createElement('div');
					div.style.cssFloat = 'left';
					div.innerHTML = '<div id="eightTracks_helper_mix_tags_search_notification">'+
										'<strong>You can enter no more than 5 tags.</strong>'+
									'</div>'+
									'<a id="eightTracks_helper_mix_tags_search" href="">Tags</a>'+
									'<img id="eightTracks_helper_mix_tags_search_loading" src="http://a2.8tracks.com/images/icon/icon.spinner.gif?'+ time +'" />';
				point.appendChild(div);
			},
			createImageHelperEle: function(){
				var options = '';
				var searchOptions = [
					'Google',
					'Bing'
				];
				searchOptions.forEach(function(str,i){
					options += '<option value="'+ i +'">'+
								str +
							   '</option>';
				});
				var favicon = 'http://' + 'www.google.com' + '/favicon.ico';
				var point = document.getElementById('publish_content');
				var time = new Date().getTime();	
				var container = this.imageSearchContainer = document.createElement('div');
					container.id = 'eightTracks_helper_mix_image_search_container';
					container.style.display = 'none';
					container.innerHTML = '<div id="eightTracks_helper_mix_image_search_header">'+
											'<input id="eightTracks_helper_mix_image_search_input" type="text" />' +
											'<a href="http://www.google.com/imghp" target="_blank">'+
												'<img id="eightTracks_helper_mix_image_search_favicon" src="'+ favicon +'" />'+
											'</a>'+
											'<select id="eightTracks_helper_mix_image_search_option_select">' +
												options +
											'</select>'+
											'<button id="eightTracks_helper_mix_image_search_button" disabled="true">'+
												'Search'+
											'</button>'+
											'<img id="eightTracks_helper_mix_image_search_loading" src="http://a2.8tracks.com/images/icon/icon.spinner.gif?'+ time +'" />' +
										  '</div>'+
										  '<div id="eightTracks_helper_mix_image_search_results">' +
										  '</div>';
				point.insertBefore(container,point.firstChild);
			},
			onTagsSearchCompleted: function(json){
				MixSelectionHelper.removeScript();
				var error = json.error;
				switch(error){
					case 6:
						LastFMAPI.getTopTags();
					return;
				}
				var tags = json.toptags || json.tags;
				tags = tags.tag;
				if(!tags || !tags.length){
					LastFMAPI.getTopTags();
					return;
				}
				this.createTags(tags);
				this.hideTagsLoading();
			},
			onImageSearchCompleted: function(json){
				this.removeScript();
				var results = '';
				if(json.hasOwnProperty('responseStatus')){
					results = this.googleResults(json);
				}
				else{
					results = this.bingResults(json);
				}
				var point = this.imageSearchResultsContainer;
					point.innerHTML = results;
				this.hideImageLoading();
			},
			googleResults: function(json){
				var data = json.responseData;
				var status = json.responseStatus;
				if(data && status === 200){
					var results = '';
					var images = data.results;
					images.forEach(function(obj){
						var title  = decodeURIComponent(obj.title);
						var url    = obj.unescapedUrl;
						var width  = obj.width;
						var height = obj.height;
						var tUrl   = decodeURIComponent(obj.tbUrl);
						var tWidth = obj.tbWidth;
						var tHeight= obj.tbHeight;
						results += '<div class="eightTracks_helper_mix_image_search_results_item">'+
										'<div>'+
											'<a href="'+url+'" target="_blank" title="'+title+'" class="eightTracks_helper_mix_image_thumbnail">'+
												'<img src="'+tUrl+'" />'+
											'</a>'+
										'</div>'+	
										'<div>'+
											'<a href="'+url+'" target="_blank" title="'+url+'">'+
												'<span>'+
													[width,height].join('×')+
												'</span>'+
											'</a>'+
										'</div>'+
									'</div>';
					});
					var cursor = data.cursor;
					var currentPageIndex = cursor.currentPageIndex;
					var moreResultsUrl   = decodeURIComponent(cursor.moreResultsUrl);
					if(results){
						var query = moreResultsUrl.match(/&q=[^&]*/)[0].replace(/^&q=/,'');
						var pages = cursor.pages;
						results += '<div class="tags" style="margin-top: 10px;">';
						var prevPage = pages[currentPageIndex - 1];
						if(prevPage){
							results += '<a href="" query="'+query+'" offset="'+ prevPage.start +'" class="eightTracks_helper_mix_image_search_navi">Prev</a>';
						}
						var nextPage = pages[currentPageIndex + 1];
						if(nextPage){
							results += '<a href="" query="'+query+'" offset="'+ nextPage.start +'" class="eightTracks_helper_mix_image_search_navi">Next</a>';
						}
						else{
							results += '<a href="'+moreResultsUrl+'" target="_blank" class="eightTracks_helper_mix_image_search_link">More results</a>'; 
						}
						results += '</div>';
					}
					else{
						results += '<div style="margin: 10px 0;">'+
									'<a href="'+moreResultsUrl+'" target="_blank" class="eightTracks_helper_mix_image_search_link">More results</a>'+
								   '</div>'; 
					}
					return results;
				}
				else{
					var error = json.responseDetails;
					return error;
				}
			},
			bingResults: function(json){
				var response = json.SearchResponse;
				var errors = response.Errors;
				if(errors){
					return this.bingImageSearchError(errors);
				}
				var query = response.Query;
					query = query.SearchTerms;
				var image = response.Image;
				var total = image.Total;
				var offset = image.Offset;
				var images = image.Results || [];
				var results = '';
				images.forEach(function(obj){
					var title  = obj.Title;
					var url    = obj.MediaUrl;
					var width  = obj.Width;
					var height = obj.Height;
					var thumbnail = obj.Thumbnail;
					var tUrl      = thumbnail.Url;
					var tWidth    = thumbnail.Width;
					var tHeight   = thumbnail.Height;
					var tType     = thumbnail.ContentType;
					results += '<div class="eightTracks_helper_mix_image_search_results_item">'+
									'<div>'+
										'<a href="'+url+'" target="_blank" title="'+title+'" class="eightTracks_helper_mix_image_thumbnail">'+
											'<img src="'+tUrl+'" />'+
										'</a>'+
									'</div>'+	
									'<div>'+
										'<a href="'+url+'" target="_blank" title="'+url+'">'+
											'<span>'+
												[width,height].join('×')+
											'</span>'+
										'</a>'+
									'</div>'+
								'</div>';
				});
				if(results){
					results += '<div class="tags" style="margin-top: 10px;">';
					if(offset){
						results += '<a href="" query="'+query+'" offset="'+(Math.max((offset - images.length),0))+'" class="eightTracks_helper_mix_image_search_navi">Prev</a>';
					}
					var nextOffset = images.length + offset;
					if(total > nextOffset){
						results += '<a href="" query="'+query+'" offset="'+nextOffset+'" class="eightTracks_helper_mix_image_search_navi">Next</a>';
					}
					results += '</div>';
				}
				else{
					results = '<div style="margin: 10px 0;">'+
								'Your search - '+
								'<strong>'+
									query +
								'</strong>'+
								' - did not match any documents.'+
							   '</div>';
				}
				return results;
			},
			bingImageSearchError: function(errors){
				var r = [];
				errors.forEach(function(obj){
					for(var i in obj){
						r.push(i + ': ' + obj[i]);
					};
				});
				return r.join('\n');
			},
			removeScript: function(){
				var script = Utils.xpath('.//body/script[@class="eightTracks_helper_script" and starts-with(@src,"http://api.bing.net/json.aspx") or @class="eightTracks_helper_script" and starts-with(@src,"https://ajax.googleapis.com/ajax/services/search/")]')[0];
				if(script)
					script.parentNode.removeChild(script);
			},
			addStyle: function(str){
				str = str && str || this.css;
				jQuery('<style />',{
					type: 'text/css',
					text: str
				}).appendTo('head');
			},
			get css(){
				var code = '';
				var dic = {
					'#mix_art_preview': {
						'width': '200px',
						'height': '200px'
					},
					'#eightTracks_helper_mix_image_search_container': {
						'margin-bottom': '10px',
						'padding': '10px',
						'background-color': '#ECECEC'
					},
					'#eightTracks_helper_mix_image_search_header': {
						'margin-bottom': '10px'
					},
					'#eightTracks_helper_mix_image_search_header > *:not(#eightTracks_helper_mix_image_search_loading)': {
						'margin-right': '10px'
					},
					'#eightTracks_helper_mix_image_search_favicon': {
						'width': '16px',
						'height': '16px',
						'vertical-align': 'middle'
					},
					'#eightTracks_helper_mix_image_search_input': {
						'border-radius': '3px',
						'-moz-border-radius': '3px',
						'-webkit-border-radius': '3px',
						'background': 'url("http://a2.8tracks.com/assets/../images/bg/bg.searchbox.png") no-repeat scroll 3px 2px #284864',
						'border': '1px solid #011B31',
						'color': '#999999',
						'height': '22px',
						'width': '165px',
						'padding-left': '25px',
						'-moz-transition-duration': '500ms',
						'-webkit-transition-duration': '500ms'
					},
					'#eightTracks_helper_mix_image_search_input:hover, #eightTracks_helper_mix_image_search_input:focus': {
						'color': '#FFFFFF',
						'background-color': '#30506B'
					},
					'#eightTracks_helper_mix_image_search_loading, #eightTracks_helper_mix_tags_search_loading': {
						'width': '20px',
						'vertical-align': 'middle',
						'display': 'none'
					},
					'.eightTracks_helper_mix_image_search_results_item': {
						'text-align': 'center',
						'display': 'inline-block',
						'margin': '5px 10px 5px 0',
						'padding-bottom': '5px',
						'box-shadow': '2px 2px 5px #333333',
						'-moz-box-shadow': '2px 2px 5px #333333',
						'-webkit-box-shadow': '2px 2px 5px #333333'
					},
					'.eightTracks_helper_mix_image_search_results_item a': {
						'text-decoration': 'none !important'
					},
					'.eightTracks_helper_mix_image_search_results_item span': {
						'background-color': '#E5E5E5',
						'padding': '1px 3px',
						'border-radius': '3px',
						'-moz-border-radius': '3px',
						'-webkit-border-radius': '3px'
					},
					'.eightTracks_helper_mix_image_search_results_item img:hover': {
						'opacity': '0.9',
						'box-shadow': '2px 2px 5px #333333',
						'-moz-box-shadow': '2px 2px 5px #333333',
						'-webkit-box-shadow': '2px 2px 5px #333333'
					},
					'.eightTracks_helper_mix_image_search_navi': {
						'margin': '3px 10px 3px 0 !important',
						'padding': '3px 5px',
						'color': '#333333',
						'background-color': '#FCFCFC',
						'text-decoration': 'none !important',
						'border-radius': '3px',
						'-moz-border-radius': '3px',
						'-webkit-border-radius': '3px',
						'float': 'none !important',
						'display': 'inline-block !important'
					},
					'.eightTracks_helper_mix_image_search_link': {
						'margin': '3px 10px 3px 0 !important',
						'border': 'none !important',
						'text-decoration': 'underline !important'
					},
					'#eightTracks_helper_mix_tags_search_notification': {
						'background-color': '#FFFD64',
						'padding': '10px',
						'margin-bottom': '10px',
						'display': 'none'
					}
				};
				for(var i in dic){
					code += i + '\n{\n';
					var c = dic[i];
					for(var p in c){
						code += '	' + p + ': ' + c[p] + ';';
					};
					code += '\n}\n';
				};
				return code;
			},
			get imageSearchArea(){
				delete this.imageSearchArea;
				return this.imageSearchArea = document.getElementById('eightTracks_helper_mix_image_search_input');
			},
			get imageSearchFavicon(){
				delete this.imageSearchFavicon;
				return this.imageSearchFavicon = document.getElementById('eightTracks_helper_mix_image_search_favicon');
			},
			get imageOptionSelecter(){
				delete this.imageOptionSelecter;
				return this.imageOptionSelecter = document.getElementById('eightTracks_helper_mix_image_search_option_select');
			},
			get imageSearchButton(){
				delete this.imageSearchButton;
				return this.imageSearchButton = document.getElementById('eightTracks_helper_mix_image_search_button');
			},
			get imageSearchLoading(){
				delete this.imageSearchLoading;
				return this.imageSearchLoading = document.getElementById('eightTracks_helper_mix_image_search_loading');
			},
			get imageSearchResultsContainer(){
				delete this.imageSearchResultsContainer;
				return this.imageSearchResultsContainer = document.getElementById('eightTracks_helper_mix_image_search_results');
			},
			get tagsSearchButton(){
				delete this.tagsSearchButton;
				return this.tagsSearchButton = document.getElementById('eightTracks_helper_mix_tags_search');
			},
			get tagsSearchLoading(){
				delete this.tagsSearchLoading;
				return this.tagsSearchLoading = document.getElementById('eightTracks_helper_mix_tags_search_loading');
			},
			get tagsSearchNotification(){
				delete this.tagsSearchNotification;
				return this.tagsSearchNotification = document.getElementById('eightTracks_helper_mix_tags_search_notification');
			},
			get mixDescriptionArea(){
				delete this.mixDescriptionArea;
				return this.mixDescriptionArea = document.getElementById('mix_description');
			},
			get tagsListArea(){
				delete this.tagsListArea;
				return this.tagsListArea = document.getElementById('mix_tag_list');
			}
		}; 
	
		var EightTracksHelper = {
			init: function(){
				var pathName = location.pathname;
				if(/\/selection/.test(pathName)){
					MixSelectionHelper.init();
				}
				else
				if(/\/all\/mixes|mixes\/new/.test(pathName)){
					MixDetailsHelper.init();
				}	
			}
		};
		
		EightTracksHelper.init();
	});
})();	