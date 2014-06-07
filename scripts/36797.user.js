// ==UserScript==
// @name          	IMDb Movie Collection Manager - by Futuros
// @namespace    	http://userscripts.org/
// @description   	Improvements for IMDB My Movies. Now you can REALLY use Imdb to manage your Must-See lists and collections 
// @copyright		2008+, Futuros
// @license 		Creative Commons Attribution-Share Alike 3.0 Netherlands License; http://creativecommons.org/licenses/by-nc-sa/3.0/nl/
// @version       	3.0
// @match			http://*.imdb.com/*
// @match			http://*.imdb.de/*
// @exclude       	http://i.imdb.com/*
// @exclude       	http://*imdb.com/images/*
// @exclude       	http://*imdb.de/images/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant			none
// @updateURL       https://github.com/futuros/imdb-mcm/raw/master/36797.meta.js
// @downloadURL     https://github.com/futuros/imdb-mcm/raw/master/36797.user.js
// ==/UserScript==

/** @constant */
var Script = {
	name: 'IMDb Movie Collection Manager',
	version: '3.0',
};

/**
 * @name 	IMDB Movie Collection Manager
 * @author	Futuros
 * @version	3.0
 */

/*
	Go to: http://userscripts.org/scripts/show/36797
	   or: http://github.com/futuros/imdb-mcm
	
	Got some ideas? Found a bug?
	Leave a comment or submit on issue!!

	Changelog: http://github.com/futuros/imdb-mcm/blob/master/changelog.txt
	Roadmap:   http://github.com/futuros/imdb-mcm/blob/master/roadmap.txt

*/

/** @constant */
var Config = {
	header: {				// Configuration options for the title name on the movie title page
		highlight: {
			show: true,			// Highlight the title name if in menu or voted for
			color: {
				background: 'silver',	// Background color of the highlight
				text: '',				// not implemented
		},	},
		vote: true,			// Show what you have voted for the movie
		labels: {
			color: {
				background: '', // not implemented
				text: '#606060',// text color of the labels
			},
			show: true,			// show labels on top of the page
			redirect: true,			// use links to go to the mymovies lists instead of deleting from that list
			confirmation: true,	// ask for confirmation when deleting a list with a link; NB: only used when goto:false
	},	},
	links: {				// Configuration options for the links
		highlightOnLists: true, // hightlight links on lists
		pulldown: true, 		// append a pulldown menu with lists to every movie link
		highlight: {
			show: true,			// Highlight the title name if in menu or voted for
			color: {
				background: '#ddddbf',	// Background color of the highlight
				text: '',				// not implemented
		}	},
		vote: true,			// Show what you have voted for the movie
		labels: {
			color: {
				background: '', // not implemented
				text: '#606060',// text color of the labels
			},
			show: true,			// show labels after the links
			redirect: false,		// use links to go to the mymovies lists instead of deleting from that list
			confirmation: true	// ask for confirmation when deleting a list with a link; NB: only used when goto:false
	}	},
	vote: {
			high: {text: 'white', bg: 'green'},
			medium: {text: 'black', bg: '#FFCC00'},
			low: {text: 'white', bg: 'red'},
	},
	debug:{
		all: false,		// disables all debug.types if set to false 
		types: {
			init: true,		// show script initialization statuses
			timing: true,   // show timings of the script
			xhr: true,		// show each xhr verbosely
			stats: true,	// show statistics about the amount of lists found, links parsed etc.
		},
		notifications: true,	// show debug notifications. Other notifications will always appear
}	};

/** @private */
var Images = {
	checked: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGrSURBVDjLvZPZLkNhFIV75zjvYm7VGFNCqoZUJ+roKUUpjRuqp61Wq0NKDMelGGqOxBSUIBKXWtWGZxAvobr8lWjChRgSF//dv9be+9trCwAI/vIE/26gXmviW5bqnb8yUK028qZjPfoPWEj4Ku5HBspgAz941IXZeze8N1bottSo8BTZviVWrEh546EO03EXpuJOdG63otJbjBKHkEp/Ml6yNYYzpuezWL4s5VMtT8acCMQcb5XL3eJE8VgBlR7BeMGW9Z4yT9y1CeyucuhdTGDxfftaBO7G4L+zg91UocxVmCiy51NpiP3n2treUPujL8xhOjYOzZYsQWANyRYlU4Y9Br6oHd5bDh0bCpSOixJiWx71YY09J5pM/WEbzFcDmHvwwBu2wnikg+lEj4mwBe5bC5h1OUqcwpdC60dxegRmR06TyjCF9G9z+qM2uCJmuMJmaNZaUrCSIi6X+jJIBBYtW5Cge7cd7sgoHDfDaAvKQGAlRZYc6ltJlMxX03UzlaRlBdQrzSCwksLRbOpHUSb7pcsnxCCwngvM2Rm/ugUCi84fycr4l2t8Bb6iqTxSCgNIAAAAAElFTkSuQmCC',
	unchecked: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg==',
	loading: 'data:image/gif;base64,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%3D%3D',
};

/** @private Add Jquery */
this.$ = this.jQuery = jQuery.noConflict(true);

// Add styles
$('head').append('<style type="text/css">/* Inserted By Greasemonkey userscript ('+Script.name+'): */\
	h1.imcm_highlight {font-weight: bold; color: black !important; background-color:'+Config.header.highlight.color.background+';} \
	a.imcm_highlight {font-weight: bold; color: black !important; background-color:'+Config.links.highlight.color.background+';} \
	.imcm_catlist { width: auto; color: black; text-align:left;} \
	.imcm_hide {display:none; height: 0px;} \
	.imcm_failed {border-color: red!important; background-color:pink!important;} \
	.imcm_notification {background-color:#BCC4F5; color:black; font-family: verdana,sans-serif; display:none; z-index:99999; position:fixed; top:0px; left: 5%; height: auto; width: 90%; border-radius: 0 0 5px 5px;border-right:2px solid #eee; border-left: 2px solid #eee; border-bottom:2px solid #eee; transparency:80%; box-shadow:0 2px 4px rgba(0,0,0,0.1);} \
	.imcm_notification h1 {font-size:.9em;padding:3px 10px 3px 10px;margin:0 auto;color:white;background-color:rgba(0,0,0,0.5);} \
	.imcm_notification p {font-size:0.8em;padding:4px 10px 6px;} \
	.error {background-color: #F5A4AC; color: #DE1024; font-weight:bolder;} \
	a.label_node .imcm_label {padding: 5px; color: '+Config.links.labels.color.text+' !important;} \
	h1.label_node .imcm_label {padding: 5px; color: '+Config.header.labels.color.text+' !important;} \
	.imcm_vote {margin:2px; padding-left:2px; padding-right:2px;} \
	#tn15title .imcm_vote {font-size:1.5em;font-weight:bold;padding-right:5px;padding-left:5px; margin-left:0px;} \
	.imcm_10,.imcm_9,.imcm_8 {background-color: '+Config.vote.high.bg+'; color: '+Config.vote.high.text+';} \
	.imcm_5,.imcm_6,.imcm_7 {background-color: '+Config.vote.medium.bg+'; color: '+Config.vote.medium.text+';} \
	.imcm_4,.imcm_3,.imcm_2,.imcm_1 {background-color: '+Config.vote.low.bg+'; color: '+Config.vote.high.text+';} \
	.imcm_pulldown_wrapper {position: relative;} \
	.imcm_pulldown_link {position: relative;padding:0 5px 0 5px; font-size:.8em;cursor:pointer;} \
	.imcm_pulldown {z-index: 1000;position:absolute; top:.9em; right:0px; background-color: white; border: 1px solid black;} \
	.imcm_pulldown a { position:absolute; top:2px; right:2px; font-size:12px; line-height:12px; font-weight:bolder; background-color: white;cursor:pointer;border:1px solid black; border-radius: 10px 10px 10px 10px;padding:0 3px 1px;} \
	.imcm_menu { min-width:130px;margin: 0; padding:0px; list-style: none;} \
	.imcm_menu li{font-weight:bolder;background-image:url('+Images.unchecked+');padding: 2px 21px;background-repeat:no-repeat;background-position:2px center;height:16px;display:block;cursor:pointer;cursor:hand;margin:auto;} \
	.imcm_menu li:hover{background-color:#ddd!important;} \
	.imcm_menu li.checked{background-color:#eee;background-image:url('+Images.checked+');} \
	.imcm_menu li.busy{background-color:#fff !important;color:gray;cursor:wait!important;background-image:url('+Images.loading+')!important;} \
</style>');

/** @private  */
var activePulldown,
	_c = console.log, _d = console.debug;

/**
 * Create a menu element with all the movielists as list items.
 * @param 	{Movie}		movie	a MovieObj which the form field will add/remove to the items
 * @returns	{jQuery}			returns a html menu element or false if a menu with the id already exists.
 */
function createListsMenu (movie){
	var menu = $('<ul />', {
		'class': 'imcm_menu movie'+movie.getId(), //id needed to updateMovies
	});	
	for(var i in Lists._items){
		var item = Lists._items[i];
		$('<li></li>', {
			title:  'Add/Remove: '+item.name,
			'catid': item.id,
			html: item.name,
		})
		.click(function(){
			var node = $(this);
			if(node.hasClass('busy')){return false;}
			node.addClass('busy');
			Imdb.reqMovieAction(movie,node.attr('catid'))
				.success(function(){node.toggleClass('checked',this.movie.inList(this.data.list_id));})
				.complete(function(){node.removeClass('busy');});
			return false;
		})		
		.toggleClass('checked', movie.inList(item.id))
		.appendTo(menu);
	}
	return menu;
}

/**
 * Appends labels for all the movielists the movie belongs to, to the node
 * Also add a pulldown menu with movielists if Config requires so
 *
 * @param 	{jQuery}	$node	A jquery object where all the Labels need to be appended to
 * @param	{Movie} 	movie 	The movie for which the labels should be applied
 * @returns	{Boolean}			Whether or not the $node got highlighted as a result of this method
 */
function appendListLinks ($node, movie){
	var highlighted = updateListLinks($node, movie);
	appendPulldown($node,movie);
	return highlighted;
}

function appendPulldown(node, movie){
	if(Config.links.pulldown){
		$('<span />').addClass('imcm_pulldown_wrapper')
		.append(
			$('<div />', {
				'class':'imcm_pulldown imcm_catlist',
				mouseover: function(ev){activePulldown=null;}, 
				mouseout: function(ev){activePulldown=this;},
			}).hide()
			.append(createListsMenu(movie))
			.append($('<a>x</a>').click(function(){$(this).parent().hide('slow');activePulldown=null;return false;}))
		).append(
			$('<a class="imcm_pulldown_link">&#9660;</a>')
			.click(function(){var ap=$(this).parent().find('.imcm_pulldown');if(activePulldown){$(activePulldown).hide();} activePulldown=ap;ap.show('slow');return false;})
		).insertAfter(node);
	}
}
/*
 * Remove all labels and/or vote currently on the node. Reapply the labels and/or vote according to the new movie object
 * Add the highlight class to the node if it has movielists or votes
 *
 * @param {HtmlElement} node The node where the movielists need to be appended to
 * @param {MovieObj} movie The movie corresponding with the node
 * @return Whether or not the node got highlighted as a result of this function
 * @type boolean
 */

function updateListLinks(node,movie){
	var CFG = (!node.is('A')) ? Config.header : Config.links;
	//mark the node as a label_node
	node.addClass('label_node movie'+movie.getId());
	// Remove nodes currently added to the nodes parentnode
	node.parent().find('.imcm_label').remove();
	if(!movie.isActive()){
		node.removeClass('imcm_highlight');
		return false;
	}
	// if the movie contains a vote or is added to a movielist
	node.addClass('imcm_highlight');
	if(CFG.labels.show && movie.listLength()>0){ // show the movieList labels
		var listItems = movie.getListItems();
		for(var i=0, j=listItems.length;i<j;i++){
			// append the movieList label
			var list = listItems[i];
			var settings = {
					'class':'imcm_label', 
					html: list.name,
					href: '#'+list.id
				};
			if(CFG.labels.redirect){ // onclick redirect to movielist
				settings.title = 'Go to the movielist: '+list.name;
				settings.click = function(){
					Notification.error('This is not yet working. Movielist id:'+list.id);	
					//window.location='http://www.imdb.com/mymovies/list?l='+catid;
				};
			} else { // onclick, ask to remove from movielist
				settings.title = 'Delete movie from list: '+list.name;
				settings.click = function(){
					if(!CFG.labels.confirmation || confirm('Delete movie from '+list.name+'?')){
						Imdb.reqMovieAction(movie,list.id); 
					}
					return false;
				};
			}
			$('<a />', settings).insertAfter(node);
		}
	} //end: add movieList label
	// Add a vote to the node
	if(CFG.vote && movie.hasVote()){
		$('<span />').addClass('imcm_vote imcm_label imcm_'+movie.getVote())
			.html(movie.getVote())
			.insertAfter(node);
	}
	return true; // movie should be highlighted
}

/*
 * Update the status of the movie for all links referring to the specified movie.
 */
function updateStatus(movie){
	Log.f('init')('Updating all links and headers for movie: '+movie.getId());
	$('.movie'+movie.getId()+'.label_node').each(function(){updateListLinks($(this),movie);});
	$('.movie'+movie.getId()+'.imcm_menu').find('li').each(function(){
		$(this).toggleClass('checked', movie.inList($(this).attr('catid')));
	});
}

/**
 * Imdb API object
 * This object is used for interaction with the Imdb website through AJAX
 * Every getMethodName should call the xhr function which sends the response to parseMethodName.
 * 		getMethodName: function getMethodName(){} // only use this format.
 * actionMethodName does not have a callback
 * @class Provides interaction with the Imdb website
 * @lends Imdb
 */
var Imdb = {
	/** @constant @private */
	_const: 'tt0278090', // random valid const.
	/** @constant @private */
	prefix: 'http://www.imdb.com/',
	/** @private */
	authorId:null,
	/** @private */
	watchlistId:null,
	/** @private */
	check:null,
	/** @private */
	onInit: false,
	
	/**
	 * Requests the votes in a csv format
	 * @returns {Promise} a jQuery promise object for the xhr call
	 */
	reqVotes: function(){
		return Imdb.xhr({
			url: 'list/export',
			data: {'list_id':'ratings', 'author_id':Imdb.authorId},
			dataFilter: Imdb.csvFilter,
		});
	},
	/**
	 * Parse the response from the reqVotes call
	 * @param {Object} response The response object from the (succesfull) Ajax call
	 */
	parseVotes: function(response){
		for(var i=0,j=response.length;i<j;i++){
			Movies.get(parseInt(response[i].const.replace('tt',''),10)).setVote(response[i].you_rated);
		}
		Log.f('stats')(response.length+' votes found');
		Movies.save();
	},
	reqLists: function(){
		return Imdb.xhr({
				url: 'list/_ajax/lists',
				data: {'list_type':'Titles'}
		});
	},
	parseLists: function(response){
		var cats = [];
		if(response.status!='200')return;
		for(var i=0, j=response.lists.length; i<j; i++){
			var item = response.lists[i];
			if(item.state=='OK'){
				cats.push({id: item.list_id, name: item.name.replace("MyMovies: ","")});
			}
		}
		// watchlist is ommited
		cats.push({id:Imdb.watchlistId, name:'Watchlist'});
		Log.f('stats')(cats.length+' movielists found');
		// save the movielists
		Lists.set(cats);
	},
	reqHLists: function(){
		return Imdb.xhr({url: 'user/'+Imdb.authorId+'/lists?tab=all&filter=titles',});
	},
	parseHLists: function(response){
		var cats = [];
		var $response = $(response);
		$response.find('.your_lists .lists tr.row').each(function(){
			var $row = $(this),
				id = $row.attr('id'),
				name = $row.find('.name a').html().replace("MyMovies: ",""),
				count = parseInt($row.find('.name span').html().match(/\((\d+)/)[1]);
			cats.push({id:id,name:name,count:count});
		});
		// watchlist is ommited
		var watchlistCount = $response.find('div.watchlist b a').html().match(/\((\d+)\)/);
		watchlistCount = (watchlistCount)?parseInt(watchlistCount[1]):50;
		cats.push({id:Imdb.watchlistId, name:'Watchlist', count:watchlistCount});
		// save the movielists
		Lists.set(cats);
	},
	/*
	 * For loop over the different movielists
	 * Calls reqMovieList for each
	 */
	reqMovieLists: function(){
		var calls = [];
		Lists._items.forEach(function(elm,index, arr){
			Log.f('xhr')('req Movielist['+elm.id+']: '+elm.name);
			//calls.push(Imdb.reqMovieList(elm[0]));
			var start=1;
			while(start<elm.count){
				calls.push(Imdb.reqHtmlList(elm.id,start));
				start+=250;
			}
		});
		return $.when.apply($,calls);
	},
	reqMovieList: function(listId){
		return Imdb.xhr({
					url: 'list/export',
					data: {'list_id':listId, 'author_id':Imdb.authorId},
					dataFilter: Imdb.csvFilter,
		});
	},
	/*
	 * 
	 */
	parseMovieList: function(response){
		var list_id = this.data.list_id;
		for(var i=0,j=response.length;i<j;i++){
			Movies.get(parseInt(response[i].const.replace('tt','')),10).addListItem(list_id, 1);
		}
	},
	reqHtmlList: function(listId,start){
		var _start = start || 1;
		return Imdb.xhr({
			url: 'list/'+listId+'/?view=compact',
			data: {'start':_start, list_id:listId},
		});
	},
	parseHtmlList: function(response){
		var listId = this.data.list_id;
		var $response = $(response);
		$response.find('.list.compact table tr').each(function(index){
			if(index==0)return;
			$row = $(this);
			var rate = $row.find('.rating-list');
			if(rate && rate.attr('id')){
				var tt=rate.attr('id').split('|')[0];
				Movies.get(parseInt(tt.replace('tt',''),10)).addListItem(listId,$row.attr('data-item-id'));
			}
		});
	},
	/*
	 * 
	 */
	reqMovieAction: function(movie,list_id){
		var request = {url:'list/_ajax/edit', type:'POST'};
		request.data = {
				'const':'tt'+movie.getId(),
				'list_id':list_id,
				'ref_tag':'title',
		};
		if(movie.inList(list_id)){
			request.data.action='delete';
			request.data.list_item_id=movie.getListItemId(list_id);
		}
		request.data[Imdb.check.name]=Imdb.check.value;
		request.movie = movie;
		return Imdb.xhr(request);
	},
	parseMovieAction: function(response){
		if(response.status=='200'){
			if(this.data.action=='delete'){ //succesfully deleted
				this.movie.removeListItem(this.data.list_id);
			} else { //succesfully added
				this.movie.addListItem(this.data.list_id,response.list_item_id);
			}
			Movies.save();
			updateStatus(this.movie);
		}
	},
	reqAuthorId: function(){
		return Imdb.xhr({
			url: 'widget/recommendations/_ajax/get_title_info',
			data: {'tconst':Imdb._const},
			type: 'POST',
		});
	},
	parseAuthorId: function(response){
		if(response.status=='200'){
			Storage.set('authorId', Imdb.authorId = response.rating_info.uconst);
		}
	},

	reqSecurityCheck: function(){
		return Imdb.xhr({
			url: 'list/_ajax/watchlist_has',
			data: {'consts':[Imdb._const]},
			type: 'POST',
		});
	},
	parseSecurityCheck: function(response){
		if(response.status=='200'){
			Storage.set('watchlistId', Imdb.watchlistId = response.list_id);
			Storage.set('securityCheck', Imdb.check = response.extra);
		}
	},
	
	/*
	 * Ajax call to Imdb website
	 * 
	 */
	xhr: function(request){
		request.type = request.type||'GET';
		request.url = Imdb.prefix+request.url;
		if(!request.callback){ // if callback is not supplied 
			var callbackName = Imdb.findProp(function(p){return Imdb[p]===Imdb.xhr.caller;}).substr(3); // create a callback fuction based on the property name of the function calling imdb.xhr 
			request.callback = Imdb['parse'+callbackName];
		}
		if(typeof request.callback != 'function') throw "invalidCallbackException";
		
		request.success = request.callback;
		request.headers = {'Cookie': document.cookie};
		request.error = function(r){Log.error(r.responseText);};
		let settings = request;
		settings.context=request;
		Log.f('xhr')('XHR: '+request.url+' '+request.data);
		return $.ajax(settings);
	},
	/*
	 * Rebuild all caches.
	 * @param {boolean} onInit: whether or not the call came from the Page.initCache
	 */
	rebuild: function(onInit){
		if(onInit){ // Automatic request on script init
			Imdb.onInit=true;
			Log.f('init')('Building cache on first script run');
			Notification.write('Because it\'s the first time this script is run the movie list needs to be updated.');
		} else { // Manuel request
			Log.f()('Rebuilding cache - manual request');
			Notification.write('Updating the movie list.');
		}
		Movies.clear(); // clear the current cache.
		$.when(Imdb.reqAuthorId(),Imdb.reqSecurityCheck()).done(function(){
			$.when(Imdb.reqHLists()).done(function(){
				$.when(Imdb.reqMovieLists(),Imdb.reqVotes())
					.done(Imdb.finished)
					.fail(Imdb.failed);
			}).fail(Imdb.failed);
		}).fail(Imdb.failed);
	},
	/*
	 * This function is called if all the movies are loaded from the Imdb pages
	 */
	finished: function(){
		Log.f('init')('All callbacks for the rebuild script have finished');
		let onInit = Imdb.onInit;
		Imdb.onInit=null; // reset onInit boolean
		if(Movies.length() && Lists.length() && Imdb.authorId && Imdb.check && Imdb.watchlistId){
			Movies.save();
			Notification.write('<b>Cache rebuild</b><br />Lists: '+Lists.length()+'<br />Movies: '+Movies.length(), 8000,true);
			Log.f('stats')(Movies.length()+' movies found in movielists (including vote history)');
			if(onInit){ // if the rebuild script was started on page init
				Page.initCaches(); // reinitialize the page
			} else {
				Notification.write('<a href="javascript:document.reload()">Reload the page</a>', 0, true);
				window.setTimeout(window.location.reload,3000); //reload the page
			}
		} else {
			Log.error('Something whent wrong while getting movies information from Imdb.',this);
			Notification.error('Something went wrong trying to rebuild the cache. Please try again.');
		}
	},
	/*
	 * If any request from Imdb.rebuild fails this function is called
	 */
	failed: function(){
		Imdb.onInit=null; // reset onInit boolean
		Notification.write('<b>Cache rebuild</b><br />Lists: '+Lists.length()+'<br />Movies: '+Movies.length(), 8000,true);
		Log.error('Some request failed',this);
	},
	/*
	 * Transform CSV data in Array with Objects{name:value,...}
	 */
	csvFilter: function(data,dataType){
		var lines = data.split(/\r\n|\n/);
		var result = [];
		var headers = lines.shift().replace(/\s/g,'_').toLowerCase().split('","');
	    while(lines.length){
	    	line = lines.shift().split('","');
	    	if (line.length == headers.length) {
                var resultLine = {};
                for (var j=0; j<headers.length; j++) {
                	resultLine[headers[j]] = line[j].replace(/\"/g,'');
                }
    	    	result.push(resultLine);
	        }
	    }
	    return result;
	},
	setWatchlist: function(value){
		return Imdb.watchlistId = value; 
	},
	setSecurity: function(value){
		return Imdb.check = value; 
	},
	setAuthorId: function(value){
		return Imdb.authorId = value; 
	},

	/*
	 * Loops over all the properties if callback returns true return the property
	 * @return property name
	 */
    findProp: function(callback){
        for(var p in Imdb){
            if (Imdb.hasOwnProperty(p) && callback(p)){
               return(p);
            }
        }
        return false;
    }
};

/**
 * Create a notification object
 * @class Notification helper
 */
var Notification = {
	/** @private */
	_timer: null,
	/** @private _node */
	_node: null,
	/**
	 * @constructs
	 * @private
	 */
	_init: function(){
		this._node = $('<div class="imcm_notification"><h1>'+Script.name+'</h1><p></p></div>')
			.appendTo('body')
			.click(this._hide);
	},
	/** 
	 * @private 
	 * @param {String} text Text message
	 * @param {Int} maxtime Time in ms the notification window should be shown
	 * @param {Boolean} append If true, the message gets appended to the notification window. If false the current message gets overriden.
	 */
	_write:function(text, maxtime, append){
		if(this._timer)clearTimeout(this._timer);
		if(append)
			this._node.find('p').append('<br />'+text);
		else
			this._node.find('p').html(text);
		this._show();
		if(maxtime>0){
			this._timer=setTimeout(this._hide,maxtime);
		}
	},
	/**
	 * Show a text message in the notification window
	 * Is only shown if Config.debug.notifications is set to true
	 * @param {String} text Text message
	 * @param {Int} maxtime Time in ms the notification window should be shown
	 * @param {Boolean} append If true, the message gets appended to the notification window. If false the current message gets overriden.
	 */
	write:function(text, maxtime, append){
		if(!this._node)this._init();
		this._node.removeClass('error');
		this._write(text,maxtime,append);
	},
	/**
	 * Show a debug message in the notification window
	 * Is only shown if Config.debug.notifications is set to true
	 * @param {String} text Debug message
	 * @param {Int} maxtime Time in ms the notification window should be shown
	 */
	debug: function(text, maxtime){
		if(Config.debug.notifications)this.write(text, maxtime);
	},
	/**
	 * Show an error message in the notification window
	 * @param {String} text Error message
	 */
	error: function(text){
		if(!this._node)this._init();
		this._node.addClass('error');
		this._write('<h4>ERROR:</h4>'+text);
	},
	/** @private */
	_show: function(){
		this._node.show('slow');
	},
	/** @private */
	_hide: function(){
		Notification._node.hide('slow');
	}
};
/**
 * An array that handles storage and retrieval
 * @class A list that handles storage
 * @lends StoredList
 */
var StoredList = {
	/** @private */
	_items: [],
	/** @private */
	_name: null,
	save: function(){
		return Storage.set(this._name,this._items,true);
	},

	load: function(){
		return this._items = Storage.get(this._name,[],true);
	},
	clear: function(){
		this._items = [];
	},
    /**
     * @returns {Movie} Returns a Movie object or null
     */
    find: function(id){
        for(var i=0,j=this._items.length;i<j;i++){
            if(this._items[i].id===id){
                return this._items[i];
            }
        }
        return null;
    },
    /**
     * @returns {Int} Number of items in the list
     */
    length: function(){
        return this._items.length;
    },
};
/**
 * This object acts as a movie array
 * @class A list with all movies
 * @static
 * @augments StoredList
 */
var Movies = $.extend(true, {}, StoredList, 
	/** @lends Movies */
	{
		/** @private */
		_class: Movie,
		/** @private */
		_name: 'Movies',
	    /**
		 * @param {String} id
		 * @returns {Movie} Always returns a {Movie} if none exists creates a new one
		 */
	    get: function(id){
	        var obj = this.find(id) || this._push({id: id});
	        return new this._class(obj);
	    },
	    getByAddress: function(address){
	    	var id = this.getIdByAddress(address);
	    	return (id) ? this.get(id) : false; 
	    },
		getIdByAddress: function(address) {
			//var id = address.match(/(?:(?:www|us|italian|uk)\.)?imdb.(?:com|de)(?:(?:\/title\/tt)|(?:\/Title\?))(\d+)\/(?:\w+\/?)?$/);
			var id = address.match(/\/title\/tt(\d{6,7})\/$/i);
			return (id)?parseInt(id[1],10):false;
		},
	
	    /**
	     * Pushes an object to the _items and returns it.
	     * @param {object} object 
	     * @returns {object}
	     * @private
	     */
	    _push: function(object){
	        this._items.push(object);
	        return object;
	    },
	}
);

/**
 * @static
 * @class All the movielists
 * @augments StoredList
 */
var Lists = $.extend(true, {}, StoredList, 
	/** @lends Lists */
	{
		/** 
		 * @private
		 * @constant
		 */
		_name: 'Lists',
		set: function(items){
			this._items = items;
			this.save();
		},
		getByName: function(name){
	        for(var i=0,j=this._items.length;i<j;i++){
	            if(this._items[i].name==name){
	                return this._items[i];
	            }
	        }
	        return null;
		},
	}
);

/**
 * Creates a new Movie object
 * @class Represents a Movie
 * @param 	{Object}	object
 * @returns {Movie}
 * @constructs
 */
function Movie(object){
    object.lists = object.lists || [];
	/** @private */
    this._object = object;
}
$.extend(Movie.prototype, 
	/** @lends Movie.prototype */
	{
		getId: function(){
			return this._object.id;
		},
		setVote: function(vote){
			this._object.vote = vote;
	        return this;
	    },
	    getVote: function(){
	    	return this._object.vote;
	    },
	    hasVote: function(){
	    	return this._object.vote && true;
	    },
	    equals: function(object){
	    	return (!object)?false:(this.getId() == object.getId());
		},
	    addListItem: function(listId, listItemId){
	        this._object.lists.push([listId,listItemId]);
	        return this;
	    },
	    removeListItem: function(listId){
			for(var i=0,j=this._object.lists.length;i<j;i++){
				if(this._object.lists[i][0]==listId){
					this._object.lists.splice(i,1);
					return this;
				}
			}
			return this;
	    },
		getListItem: function(listId){
			for(var i=0,j=this._object.lists.length;i<j;i++){
				if(this._object.lists[i][0]==listId){
					return this._object.lists[i];
				}
			}
			return false;
		},
		getListItemId: function(listId){
			return (listItem = this.getListItem(listId)) ? listItem[1] : false;
		},
		/**
		 * Check if the movie is in a specific list
		 * @param {String} listId The id of the movie list
		 * @returns {Boolean} Whether or not the movie is in the specified list
		 */
	    inList: function(listId){
	    	return this.getListItem(listId) && true;
	    },
	    /**
	     * @returns {Int} Number of lists the movie is added to
	     */
	    listLength: function(){
	    	return this._object.lists.length;
	    },
	    /**
	     * @returns {Boolean} Active means that it is in either a list or has been voted for
	     */
	    isActive: function(){
	    	return this.listLength()>0 || this.hasVote();
	    },
	    /**
	     * @returns {Array} An array of list item object with {listId, listName, listItemId}
	     */
	    getListItems: function(){
	        var items = [];
			for(var i=0,j=this._object.lists.length;i<j;i++){
				var item = this._object.lists[i];
				items.push({id: item[0], itemId: item[1], name: Lists.find(item[0]).name});
			}
	    	items.sort(function(a,b){return (a.name<b.name)?-1:(a.name>b.name)?1:0;});
	    	return items;
	        return this._object.lists || [];
	    },
	}
);

/**
 * Object to handle information about the page if it is a title page
 * There are different types of pages
 * title:		Movie title page /title/tt* || /Title?
 * mymovies:	Movie list page /mymovies/list*
 * imdb:		Imdb Page with movie links
 * external:	External page; not implemented yet
 * @static
 * @property	{Object}	TYPE		Contains the different types a page can be
 */
var Page = {
	/** @constant */
	TYPE: {title: 'title', mymovies: 'mymovies', list: 'list', imdb: 'imdb', external: 'external'},
	/** @private */
	startTime: 0,
	
	init: function(){
		this.startTime = $.now();
		if(window.location != window.parent.location)return false; //page not in iframe
		Log.f('init')('Initialize script: '+document.location.href);
		this.initType();
	},
	/*
	 * Determines the type of page based on the document.location
	 * There are 4 different types:
	 * 		External: Not in www.imdb.com/ not used at the moment.
	 * 		Title page: /title/tt0011222/*
	 * 		List page: /list/*
	 * 		MyMovies page: /user/*
	 * 		IMDB page: http://www.imdb.com/ but not one of the above 
	 */
	initType: function(){
		this.loc = document.location.href;
		if(this.loc.search(/^http(s)?:\/\/.*\.imdb\.(com|de)\//)==-1){
			this.type = this.TYPE.external;
			Notification.error('You have activated this userscript on a page outside of imdb.com. This is not yet supported.');
			return;
		} else	if(this.loc.search(/\/user/i)!=-1){
			this.type = this.TYPE.mymovies;
		} else	if(this.loc.search(/\/list/i)!=-1){
			this.type = this.TYPE.list;
		} else if(this.loc.search(/\/title\/tt\d+/i)!=-1){
			this.type = this.TYPE.title;
		} else {
			this.type = this.TYPE.imdb;
		}
		Log.f('init')('Page type: '+this.type);
		this.initUser();
	},
	/**
	 * Get the Username
	 * @TODO Rewrite with jquery
	 */
	initUser: function(){
		Log.f('init')('Initialize username');
		if(!this.user){
			var account = document.getElementById('nb15personal') || document.getElementById('nb_personal');
			if (account) {
				var result = account.innerHTML.match(/\s*([^>]+)'s account/i);
				if (result && result[1]) {
					this.user = result[1];
				} else {
					if(this.isType(this.TYPE.external)){
						Log.f('init')('External page. Send them to Imdb',2);
						Notification.write('You need to visit an Imdb page first before you can use this script on external sites. <a href="http://www.imdb.com/">Imdb.com</a>');
					} else {
						Log.error('(line:1160) No user is logged in');
						Notification.write('You need to <a href="http://www.imdb.com/register/login">log in</a> to IMDb for this script to work ');
					}
					return;
				}
			}
		}
		Log.f('init')('Username initialized: '+this.user);
		this.initMenus();
	},
	initMenus: function(){
		Log.f('init')('Init menus');
		//if(!this.isType(this.TYPE.external)){ //not an external page
			
			 /** @TODO Add button/menu for cache reload */ 
			 //We should reload the cache on every page view.
			 //We can add a button in the top corner. And if we push it the cache gets reloaded.
			 //
		//}
		this.initCaches();
	},
	initCaches: function(){
		if(Imdb.setAuthorId(Storage.get('authorId')) && Imdb.setWatchlist(Storage.get('watchlistId')) && Imdb.setSecurity(Storage.get('securityCheck'))){
			Log.f('init')('Load movies and lists from cache');
			Lists.load();
			Movies.load();
			Log.f('stats')('Movies loaded from cache: '+Movies.length());
			Log.f('stats')('Lists loaded from cache: '+Lists.length());
			if(Movies.length()!=0 && Lists.length()!=0){
				Log.f('timing')('Caches initialized in: '+(($.now())-this.startTime)+' ms.');
				return this.start();
			}
		}
		Imdb.rebuild(true);
		return false;
	},
	initLinks: function(){
		Log.f('init')('init links on page');
		linkCount=0;
		activeLinks=0;
		var mov = Movies.getIdByAddress(this.loc);
		$('A[href^="/title/tt"]:not(:has(img))').each(function(){
			var id,movie,
				$this = $(this);			
			if((id = Movies.getIdByAddress($this.attr('href'))) && id!=mov){
				linkCount++;			
				movie = Movies.get(id);
				if(appendListLinks($this, movie)){activeLinks++;}
				linkCount++;			
			}
		});
		if(linkCount){
			Log.f('stats')(linkCount+' imdb links found');
			Log.f('stats')(activeLinks+' links highlighted');
		}
		if(Config.links.pulldown){
			$('body').click(function(){$(activePulldown).hide('fast');activePulldown=null;});
		}
		Log.f('timing')('Links initialized in: '+($.now()-this.startTime)+' ms.');
	},
	start: function(){
		Log.f('init')('start switcher');
		switch(this.type){
			case this.TYPE.mymovies:
				//this.startMymovies();
				break;
			case this.TYPE.lists:
				if(!CONFIG.links.highlightOnLists)break;
			case this.TYPE.title:
				this.startTitle();
			case this.TYPE.external:
				//this.startExternal();
			default:
				this.initLinks();
		}
	},
	startTitle: function(){
		Log.f('init')('start title page');
		if(movie = this.getMovie()){ //Title page
			// when the user votes the page should be updated
			var submitted = false;
			var deleting = false;
			$('.rating-cancel').on('click', function(){deleting =true;});
			$('.rating-cancel').on('DOMSubtreeModified', function(){
				if($(this).hasClass('rating-pending')){ // a vote has been submitted, waiting for result
					submitted=true;
				} else if(submitted){ // node no longer marked as pending, but something was submitted
					vote = (deleting)?0:$(this).prev().children().first().html();
					submitted=deleting=false;
					if(movie.getVote()!=vote){
						movie.setVote(vote);
						Movies.save();
						Log.f('init')('Vote changed to '+movie.getVote());
						updateStatus(movie);
					}
				} // else {do nothing, just a hover over the votes}
			});
			// --end of vote code
			// Listen for wlb menu changes
			$('#overview-bottom div.wlb_classic_wrapper div.wlb_alert:not(.wlb_failed)').on('DOMAttrModified', function(){
				var $this = $(this);
				if($this.css('display')!='block')return;
				var list = Lists.getByName($this.find('.wlb_list_name').first().html().replace('MyMovies: ',''));
				if(!list){Notification.error('Failed to handle list modification. The cache is no longer in sync with the real IMDB data. Add movies to lists via the script menu\'s');return;}
				if($this.hasClass('wlb_add_ok')){
					/** @TODO listItemId should be obtained on wlb change */
					var listItemId = 1;
					Notification.error('You should use the list menu provided by the script to add movies. Items add via native Imdb UI can\'t be removed until the cache is rebuild.');
					movie.addListItem(list.id, listItemId);
				} else if($this.hasClass('wlb_remove_ok')){
					movie.removeListItem(list.id);
				}
				Movies.save();
				updateStatus(movie);
			});
			//End of Wlb listener
			updateListLinks($('h1').first(), movie);
			Log.f('init')('Adding list menu to the title page');

			$('<div />').addClass('imcm_catlist aux-content-widget-2')
				.append(createListsMenu(movie))
				.prependTo('#maindetails_sidebar_bottom');

			Log.f('timing')('Title page scripts finished in: '+($.now()-this.startTime)+' ms.')
		}
	},
	isType: function(type){
		return this.type==type;
	},
	getMovie: function(){
		return this.movie = this.movie || Movies.getByAddress(this.loc);
	}
};
/**
 * Object that handles the Storage in localStorage
 * @static
 */
var Storage = {
		prefix: function(key){
			return [Script.name, Script.version, Page.user, key].join('***');
		},
		
		remove:function(key) {
			localStorage.removeItem(this.prefix(key));
		},
		
		get:function(key, def, parse) {
			var val = localStorage.getItem(this.prefix(key));
			return (null === val && 'undefined' != typeof def) ? def:(parse)?JSON.parse(val):val;
		},
		
		list:function() {
		  var prefixLen = this.prefix('').length;
		  var values = [];
		  for (var i = 0; i < localStorage.length; i++) {
		    var k = localStorage.key(i);
		    if (k.substr(0, prefixLen) === this.prefix('')) {
		      values.push(k.substr(prefixLen));
		    }
		  }
		  return values;
		},
		
		set: function(key, val, stringify) {
			var strVal = (stringify)?JSON.stringify(val):val;
			localStorage.setItem(this.prefix(key), strVal);
		},
};
/**
 * Logging helper object
 * @static
 */
var Log = {
	array: [],
	show: function(singleLine){
		if(singleLine){
			return Log.array;
		}
		Log.array.forEach(function(msg){console.log(msg);});
		return false;
	},
	add: function(msg){
		Log.array.push(msg);
		return msg;
	},
	error: console.error,
	/**
	 * Returns a logging function based on the Config settings.
	 * @returns {Function} logging function, either Log.add or console.info
	 */
	f: function(type){
		return (Config.debug.all && Config.debug.types[type]) ? console.info: Log.add;
	}
};

window.imdbmcm = {
		p: Page,
		i: Imdb,
		m: Movies,
		l: Lists,
		n: Notification,
		s: Storage,
		log: Log.show,
};

Page.init();
