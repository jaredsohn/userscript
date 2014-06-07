// ==UserScript==
// @name			YouTube Rate Everything
// @namespace		smk
// @description		Shows ratings & Favourite count of all videos. Weed out videos not worth your time.
// @require			https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js
// @require			https://raw.github.com/jashkenas/underscore/master/underscore.js
// @require			https://cdnjs.cloudflare.com/ajax/libs/q.js/0.9.6/q.min.js
// @require			https://cdn.jsdelivr.net/uri.js/1.9.1/URI.min.js
// @require			https://raw.github.com/kapetan/jquery-observe/master/jquery-observe.js
// @include			http://*.youtube.tld/*
// @include			https://*.youtube.tld/*
// ==/UserScript==

$.fn.appendText = function(text) {
    this.each(function() {
        var textNode = document.createTextNode(text);
        $(this).append(textNode);
    });
    return this;
};

//

function SearchError(){};
SearchError.prototype = Object.create(Error.prototype);

function IOError(){};
SearchError.prototype = Object.create(Error.prototype);

//

function GData(id){
	this.id=id;
}
GData.prototype={
	'retrieve': function(){
		/**
		retrieve rating info using the youtube api
		*/
		let self = this;
		let deferred = Q.defer();
		let apiHref = new URI('https://gdata.youtube.com/feeds/api/videos/').filename(self.id).addSearch({'v': '2', 'alt': 'json'}).href();

		GM_xmlhttpRequest({
			method: 'GET',
			url: apiHref,

			onload: function(response){
				if(response.status == 200){
					deferred.resolve(JSON.parse(response.responseText));
				}else{
					deferred.reject(new IOError(response));
				}
			},

			onerror: function(response){
				deferred.reject(new IOError(response));
			}
		});
		return deferred.promise;
	},
}

//

function VideoData(id){
	this.id = id;
	this.gdata = null;
}
VideoData.prototype={
	'gdata_update': function(){
		let self = this;
		return new GData(this.id).retrieve().then(function(gdata){
			self.gdata = gdata;
			return gdata;
		})
	},

	'gdata_retrieve': function(){
		return this.gdata? Q(this.gdata) : this.gdata_update();
	},
}

//

function VideoUrlData(url){
	let params = new URI(url).search(true);
	this.params = params;
	if('v' in params){
		ids = [params['v']];
	}else if('video_ids' in params){
		ids = params['video_ids'].split(',');
	}else{
		throw new SearchError('Could not find any video ids');
	}
	this.ids = ids;
}

//

function VideoNodeData(video){
	let link = $(video).find('a.video-list-item-link, a.related-video, a.yt-pl-thumb-link, a.yt-uix-contextlink, a.ux-thumb-wrap, a.thumb-container').first();
	if(!link.length)
		throw new SearchError('Could not find any video links');
	this.url_data = new VideoUrlData(link.attr('href'));
	//order matters here, as it defines the video list's viewing order
	let videos_data = [];
	for(let id of this.url_data.ids){
		videos_data.push(new VideoData(id));
	}
	this.videos_data = videos_data;
	this.video = video;
}

//

function RatingDrawer(){}
RatingDrawer.prototype={
	'add_loading': function(video){
		$('<li></li>').addClass('yt_gm_loading').text('Loading rating...').appendTo(video);
	},

	'add_error': function(video){
		$('<li></li>').addClass('yt_gm_error').text('Could not fetch video rating...').appendTo(video);
	},

	'add_rating': function(video, gdata){
		let ratings_box = $('<li></li>').addClass('yt_gm_rating');
		try{
			//Draw sparkbar.
			//The gd$rating is the 1-5 rating service, which is now deprecated, use yt$rating instead.
			let num_likes = parseInt(gdata['entry']['yt$rating']['numLikes']);
			let num_dislikes = parseInt(gdata['entry']['yt$rating']['numDislikes']);
			if(num_likes === undefined || num_dislikes === undefined)
				throw new TypeError();
			let average = num_likes/(num_likes+num_dislikes);

			let sparkbar = $('<div></div>').addClass('video-extras-sparkbars');
			let sparkbar_likes = $('<div></div>').addClass('video-extras-sparkbar-likes').css('width', average*100+'%');
			let sparkbar_dislikes = $('<div></div>').addClass('video-extras-sparkbar-dislikes').css('width', (1-average)*100+'%');
			sparkbar.append(sparkbar_likes).append(sparkbar_dislikes).appendTo(ratings_box);

			//Draw times liked/disliked.
			let likes_dislikes = $('<span></span>').addClass('watch-likes-dislikes');
			let likes = $('<span></span>').addClass('likes').text(num_likes);
			let dislikes = $('<span></span>').addClass('dislikes').text(num_dislikes);
			likes_dislikes.append(likes).appendText(' likes, ').append(dislikes).appendText(' dislikes. ').appendTo(ratings_box);
		}catch(e if e instanceof TypeError){
			$('<span></span>').text('Ratings don\'t exist. ').appendTo(ratings_box);
		}
		//Draw times favorited.
		let favorited = $('<span></span>').addClass('watch-likes-dislikes');
		try{
			let favorites = gdata['entry']['yt$statistics']['favoriteCount'];
			if(favorites === undefined || favorites == 0)
				throw new TypeError();
			favorited.appendText(' Favourited ').appendText().appendText(' times. ').appendTo(ratings_box);
		}catch(e if e instanceof TypeError){
			favorited.text('Never favourited. ').appendTo(ratings_box);
		}
		favorited.appendTo(ratings_box);
		ratings_box.appendTo(video);
	},

	'clear_loading': function(video){
		$(video).find('.yt_gm_loading').remove();
	},

	'clear_error': function(video){
		$(video).find('.yt_gm_error').remove();
	},

	'clear_rating': function(video){
		$(video).find('.yt_gm_rating').remove();
	},

	'draw_rating': function(video, video_node_data = null, redraw = false){
		/**
		draws & appends the rating to video
		display ratings similar to existing to YT ratings box i.e at bottom of video, with colored bar & number of likes/dislikes
		*/
		let self = this;
		let video = $(video);
		if(!video_node_data){
			try{
				video_node_data = new VideoNodeData(video);
			}catch(e if e instanceof SearchError){
				return Q(e);
			}
		}

		//Check if the rating is already drawn.
		if(!redraw && video.find('.yt_gm_loading, .yt_gm_rating').length)
			return Q();

		self.clear_error(video);
		self.add_loading(video);

		return video_node_data.videos_data[0].gdata_retrieve().then(function(gdata){
			//Clear loading status.
			self.clear_loading(video);
			//Draw ratings.
			self.add_rating(video, gdata);
		}, function(){
			self.clear_loading(video);
			self.add_error(video);
		});
	},

	'draw_ratings': function(videos, redraw = false){
		/**
		draws ratings on a video node list
		*/
		let self = this;
		$(videos).each(function(i, video) self.draw_rating(video, redraw = redraw));
	},
}

function add_styles(){
	let style_str=
		'.yt_gm_rating, .yt_gm_error, .yt_gm_loading {'+
		'	display: block;'+
		'	bottom: 0px;'+
		'	padding: 5px 0 0;'+
		'	font-size: 13px;'+
		'}'+
		''+
		'/*show ratings*/'+
		'.video-aso-cell{'+
		'	height: 220px !important;'+
		'}'+
		''+
		'/*show ratings*/'+
		'.most-viewed-list .video-cell {'+
		'	height: 180px !important;'+
		'}'+
		''+
		'/*show ratings in spotlight box*/'+
		'.main-tabs-spotlight-inner {'+
		'	height: 180px !important;'+
		'}'+
		''+
		'/*fix display issue in slider (default width is 20%)*/'+
		'.video-bar-item .video-cell {'+
		'	width: 100% !important;'+
		'}'+
		''+
		'/*show in same colour as YT original*/'+
		'.watch-likes-dislikes {'+
		'	color: #666666;'+
		'}'+
		''+
		'/*retain "featured" text on feature videos*/'+
		'#ppv-container .featured-label {'+
		'	position: relative !important;'+
		'	left: 0px;'+
		'}'+
		''+
		'/*use a similar style in sidebar*/'+
		'.video-list-item:hover {'+
		'	background: none repeat scroll 0 0 #D1E1FA;'+
		'   text-decoration:none;'+
		'}'+
		''+
		'.result-item-main-content {'+
		'	margin-bottom:25px;'+
		'}'+
		''+
		'.result-item:hover {'+
		'	border:1px dotted #666666 !important;'+
		'}'+
		'';
	GM_addStyle(style_str);
}

function hook_load_more(cb){
	/**
	calls cb when the 'load more suggestions' button loads videos
	*/
	let settings = 'childlist characterdata';
	$('#watch-more-related-button').click(function(){
		$('#watch-more-related').observe(settings, function observer(records){
			//the videos are loaded all-together at once, so can disconnect after the first event
			$(this).disconnect(settings, observer);
			cb();
		});
	});
}

function hook_load_ajax(cb){
	/**
	calls cb on page ajax load
	*/
	let settings = 'childlist subtree';
	$('#page').observe(settings, function observer(records){
		//disconnect to avoid infinite loop if cb adds some nodes
		GM_log('test')
		$(this).disconnect(settings, observer);
		cb();
		$(this).observe(settings, observer);
	});
}

function main(){
	//add styles
	add_styles();

	//draw ratings
	let rating_drawer = new RatingDrawer();

	function draw_page_ratings(){
		//search results
		rating_drawer.draw_ratings($('#search-results > li'));
		//"onebox" search result
		rating_drawer.draw_ratings($('.show-snippet-video'));
		//feeds
		rating_drawer.draw_ratings($('.context-data-container * .feed-item-main'));
		//charts
		rating_drawer.draw_ratings($('#charts-top-videos > li'));
		//sidebar & black playlist on right video
		rating_drawer.draw_ratings($('.video-list-item'));
		//channels
		rating_drawer.draw_ratings($('.channels-content-item'));
	}

	//load more suggestions button
	hook_load_more(function(){
		rating_drawer.draw_ratings($('#watch-more-related .video-list-item'));
	});

	hook_load_ajax(function(){
		draw_page_ratings();
	});

	draw_page_ratings();
}

main();
