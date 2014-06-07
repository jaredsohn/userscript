// ==UserScript==
// @name        Youtube Forced HTML5 Player
// @namespace   Youtube Forced HTML5 Player
// @description Plays Youtube videos in <video> container.
// @include     http://*.youtube.com/*
// @include     https://*.youtube.com/*
// @version     0.1.11
// ==/UserScript==

//Released under the GNU AFFERO GENERAL PUBLIC LICENSE VERSION 3 (or at your option, any later version)
new (function(){
	if(self.$$ytch5p != undefined) return; self.$$ytch5p = ''; //Only run once in this frame, please. (script execution seems to be a sporatic event)

	if(true){ //Neuter Existing Videos
		var videos = unsafeWindow.document.getElementsByTagName('video');
		for(var i=0;i<videos.length;i++){
			videos[i].pause();
			videos[i].addEventListener('play', function(){this.pause();this.src = '';}, true);
		}
	}

	this.ytch5p = function(){
		this.createElement = document.createElement;

		this.observer = new MutationObserver(function(mutations){
			mutations.forEach(function(mutation){
				var el = mutation.target;
				if(el.tagName == 'VIDEO') if(el.$$marked == undefined) el.addEventListener('play', function(){this.pause();this.src = '';}, true);
			});    
		});
		this.observer.observe(unsafeWindow.document, { attributes: true, childList: true, characterData: true, subtree:true });

		this.setOption = GM_setValue;
		this.getOption = GM_getValue;
		this.ajaxreq = function(url, callback, options){ //Standard Ajax Request
			$options = (options != undefined? options : {});
			if($options.method  == undefined) $options.method = 'GET'
			if($options.url     == undefined) $options.url    = url;
			if($options.headers == undefined) $options.headers = {"Content-Type": "text/plain"};
			if($options.onload  == undefined) $options.onload = callback;

			GM_xmlhttpRequest($options);
		}
		this.dims = (function(){
			var o = function(x,y){
				this.x = x;
				this.y = y;
			}
			o.widthratio = function(ratio, width){
				return new o(width, width/ratio);
			}
			return o;
		})()

		this.yti = new (function($yh5p){ //YouTube Interface
			this.$yt = unsafeWindow.yt;
			if(this.$yt == undefined) return;

			this.pageType = (function(){ //Get type of Page
				if((self.location+"").match(/\/\/([^\/]+)\/watch\?/)) return function(){return 'watch'}; //Known Watch Page
				if((self.location+"").match(/\/\/([^\/]+)\/embed/))   return function(){return 'embed'}; //Known Embed Page
				return function(){}; //Not known Youtube
			})();

			this.getQueryVariable = function(query, variable){ //Parse Query String (google'd)
				var vars = query.split('&');
				for(var i=0;i<vars.length;i++){
					var pair = vars[i].split('=');
					if(decodeURIComponent(pair[0]) == variable){
						return decodeURIComponent(pair[1]);
					}
				}
			}.bind(this);

			this.config = function(){
				/*for($$x in this.$yt){
					if(this.$yt[$$x] != null) alert($$x + ": \r\n" + this.$yt[$$x].toSource());
				}*/
				/*for($$x in this.$yt.config_){
					if(this.$yt.config_[$$x] != null) alert($$x + ": \r\n" + this.$yt.config_[$$x].toSource());
				}*/
				//alert(this.$yt.playerConfig);
				if(this.pageType() == 'embed') return this.$yt.config_;
				//if(this.pageType() == 'watch') return this.$yt.playerConfig;
				if(this.pageType() == 'watch') return this.$yt.config_;
				return null;
			}.bind(this);

			this.streamMap = function(){
				return this.config().url_encoded_fmt_stream_map;
			}.bind(this);

			this.getStreams = function(){
				var map = this.streamMap();
				var streams = map.split(',');
				var $streams = [];
				for(var i=0;i<streams.length;i++){
					var stream = streams[i];
					var $stream = {
						itag:    this.getQueryVariable(stream, 'itag')-0,
						url:     this.getQueryVariable(stream, 'url'),
						sig:     this.getQueryVariable(stream, 'sig'),
						quality: this.getQueryVariable(stream, 'quality')
					};
					$stream.fullurl = $stream.url + '&signature=' + $stream.sig;
					$streams.push($stream);
				}
				$streams.sort(function(a,b){return b.itag-a.itag;});
				return $streams;
			}.bind(this);

			this.infourl = function(){
				if(this.pageType() == 'embed') return '/get_video_info?video_id=' + (self.location+"").split('/').pop();
				if(this.pageType() == 'watch') return '/get_video_info?video_id=' + this.config().VIDEO_ID;
			}.bind(this);
		})(this);

		this.getBestStream = function(streams){
			streams.sort(function(a,b){return b.itag-a.itag;}); //Sort High-Quality First
			for(var i=0;i<streams.length;i++) if(streams[i].itag == this.getOption('pref_fmt', 44)) return streams[i]; //Attempt to use Preferred.
			for(var i=0;i<streams.length;i++) if(streams[i].itag > 40 && streams[i].itag < 45)      return streams[i]; //Attempt to use best WebM that isn't >= 720p
			for(var i=0;i<streams.length;i++) if(true)                                              return streams[i]; //Attempt to use best Codec (will load unsupported codec)
		}.bind(this);

		this.createVideo = function($stream){ //Apply Default Video Properties, can override on a per-process basis later.
			var type = this.getOption('videotype');
			var $video = this.createElement('video');
			if(type == 'embed') $video = this.createElement('embed');
			$video.src = $stream.fullurl;
			$video.$$marked = true;
			return $video;
		}.bind(this);

		this.setVideo = function($stream){
			var dims = this.dims.widthratio(16/9, 640);
			if(this.yti.pageType() == 'watch'){ //Replace the Video Frame
				//$pldiv = document.getElementById('watch-video');
				$pldiv = document.getElementById('player');

				var children = $pldiv.childNodes; for(var i=0;i<children.length;i++) if(children[i].style != undefined) children[i].style.display = 'none'; //Avoid Pre-Empting You-Tube so i can catch him when he adds his video to the DOM. (since i can't seem to grab it when he creates the damn thing)
		
				
				var $video = this.createVideo($stream);
				$video.style.width  = "100%";
				$video.style.height = "100%";

				$video.controls = 'controls';
				$video.autoplay = 'autoplay';
				$video.loop = 'loop';
				$video.style.background = 'black';

				$holderdiv = document.createElement('div');
				$holderdiv.style.display="block";
				$holderdiv.style.width  = dims.x+"px";
				$holderdiv.style.height = dims.y+"px";

				$holderdiv.appendChild($video);
				$pldiv.appendChild($holderdiv);
			}

			if(this.yti.pageType() == 'embed'){ //Replace the Entire Body
				$pldiv = self.document.body;
				while ($pldiv.hasChildNodes()) $pldiv.removeChild($pldiv.lastChild);
				$pldiv.innerHTML = '';

				var oldcode = $pldiv.innerHTML;var $video = this.createVideo($stream);
				//if(!this.yti.config().args.autoplay) $video.autoplay = undefined;

				$video.style.width = '100%';
				$video.style.height = '100%';

				$video.controls = 'controls';
				//$video.autoplay = 'autoplay';
				//$video.loop = 'loop';
				$video.style.background = 'black';

				$pldiv.appendChild($video);
			}
		}.bind(this);
		this.appendOptions = function($streams){
			//$adiv = document.getElementById('watch-actions');
			$adiv = document.getElementById('watch7-action-buttons');
			$div = this.createElement('div');
			$div.style.clear='both';
			$adiv.appendChild($div);
			for(var i=0;i<$streams.length;i++){
				$stream = $streams[i];
				$$div = this.createElement('div');
				$$div.style.textAlign = 'center';
				$$div.style.cursor = 'pointer';
				$$div.style.color = 'white';
				$$div.style.background = 'black';
				$$div.style.width = '50px';
				$$div.style.height = '25px';
				$$div.style.padding = '5px 5px 5px 5px';
				$$div.style.margin = '1px 1px 1px 1px';
				$$div.style.display = 'inline-block';
				$$div.innerHTML = $stream.quality + "<br />("+$stream.itag+")";
				$$div.$$stream = $stream;
				$$div.$$h5p = this;
				$$div.onclick = function(){
					this.$$h5p.setOption('pref_fmt', this.$$stream.itag);
					this.$$h5p.setVideo(this.$$stream);
				}.bind($$div);
				$div.appendChild($$div);
			}

			var $$select = this.createElement('select');
			var $$option = this.createElement('option');
			$$option.innerHTML = 'HTML5';$$option.value     = 'video';if($$option.value == this.getOption('videotype')) $$option.selected = 'selected';
			$$select.appendChild($$option);

			var $$option = this.createElement('option');
			$$option.innerHTML = 'LEGACY';$$option.value    = 'embed';if($$option.value == this.getOption('videotype')) $$option.selected = 'selected';
			$$select.appendChild($$option);

			$$select.addEventListener('change', function(){
				var newval = this.options[this.selectedIndex].value
				//alert('change: '+ newval);
				this.setOption('videotype', newval);
				self.location.reload(true);
			}, true)
			$$select.setOption = this.setOption;

			//$div = this.createElement('div');
			//$div.style.clear='both';
			$div.appendChild($$select);
			//$adiv.appendChild($div);
		}.bind(this);
		//return;
		if(this.yti.pageType() == 'watch'){
			this.$init = function(){ //Define Embed Process
				this.$streams = this.yti.getStreams();
				this.appendOptions(this.$streams);

				var $stream = this.getBestStream(this.$streams);
				this.setVideo($stream);
			}.bind(this);

			this.ajaxreq(this.yti.infourl() + '&eurl=' + encodeURIComponent('http://www.youtube.com/'), function(res){ //Very unfortunate since the fmap is not available... (to my knowledge)
				$q = res.responseText;

				$map = this.yti.getQueryVariable($q, 'url_encoded_fmt_stream_map');
				this.yti.config().url_encoded_fmt_stream_map = $map;

				this.$init();
				//setTimeout(this.$init, 2000);
			}.bind(this));
		}

		if(this.yti.pageType() == 'embed'){
			this.$init = function(){ //Define Embed Process
				this.$streams = this.yti.getStreams();
				var $stream = this.getBestStream(this.$streams);

				this.setVideo($stream);
			}.bind(this);

			this.ajaxreq(this.yti.infourl() + '&eurl=' + encodeURIComponent('http://www.youtube.com/'), function(res){ //Very unfortunate since the fmap is not available... (to my knowledge)
				$q = res.responseText;

				$map = this.yti.getQueryVariable($q, 'url_encoded_fmt_stream_map');
				this.yti.config().url_encoded_fmt_stream_map = $map;

				this.$init();
				//setTimeout(this.$init, 2000);
			}.bind(this));
		}

		return;
	}

	new this.ytch5p();
})()