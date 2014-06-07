var headers = parseHeaders(<><![CDATA[ 
// ==UserScript==
// @name TwitterLikker
// @namespace http://thehyperrealists.com/works/twitterlikker
// @description A basic 'like' functionality for Twitter
// @include http://www.twitter.com/
// @include http://twitter.com/
// @include http://twitter.com/home
// @include http://www.twitter.com/home
// @include http://twitter.com/#replies
// @include http://www.twitter.com/#replies
// @author  The Hyperrealists (Contact: manuel@simplelogica.net)
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version 0.63
// ==/UserScript==
]]></>.toXMLString().split(/[\r\n]+/).filter(/\/\/ @/)); 
 

var base_url = 'http://twitterlikker.heroku.com/api';

var likings_endpoint = base_url+'/likings';
var user_likings_endpoint = base_url+'/user_likings'
var styles_url = base_url+'/gm_external.css'
var me = $.trim($('meta[name=session-user-screen_name]').attr('content'));
var me_likings = [];


function parseHeaders(all) {
  var headers = {}, name, value;
  for each (var line in all) {
    [line, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);
    headers[name] = value;
  }
  return headers;

}

$(function() {
	twitterlikker();
	
	if (typeof unsafeWindow.onPageChange === 'function') {
  	var _onPageChange = unsafeWindow.onPageChange;
    unsafeWindow.onPageChange = function(){
    	_onPageChange();
 		  window.setTimeout(twitterlikker);
    };
  } 
  else {
  	unsafeWindow.onPageChange = function() {
	  	window.setTimeout(twitterlikker);
		};
  }
  
	
});

function twitterlikker(){
	checkForUpdates();
  var permalinks = [];
	latest_access = GM_getValue('twitterlikker_latest_access',0);
	
	// Collect tweet's permalinks
  $("li.status a.entry-date").each(function(i){
		var container = $(this).parent();		 
   	var status_id = _getStatusIdFromPermalink(this.href);     
		
		// Use this loop to create the wrapper
  	if ($('#twitterlikker_wrapper_'+status_id).length == 0) {
			var wrapper = $('<div></div>').attr('id','twitterlikker_wrapper_'+status_id).attr('class','twitterlikker_wrapper');
		 	wrapper.appendTo(container);
			permalinks.push(escape(this.href));
		}		
	});
	
	// Ask the mothership about current likings
	findLikings(permalinks.join(','));
	
	 // Attach like links
	 $("li.status a.entry-date").each(function(i){
			 attachLikeLink(this); 
	 });
	
	// Get recent activity
	
	getRecentActivityForUser(me);
	
	attachStyles();
	
	var date = new Date();
	console.log(date.getTime());
	GM_setValue('twitterlikker_latest_access', date.getTime());
	
}

function attachLikeLink(t) {
	var permalink = t.href;
 	var status_id = _getStatusIdFromPermalink(permalink);
	var wrapper = $('#twitterlikker_wrapper_'+status_id);
	
	if ($('a#liking_'+status_id).length == 0) {
		$('<a>Like</a>').attr('class','liking like').attr('id','liking_'+status_id).attr('href','#').bind("click", function(e){
			createLike(permalink);
			return false;
	  }).appendTo(wrapper);
	}
}

function attachUnlikeLink(t){
	var permalink = t.href;
	var status_id = _getStatusIdFromPermalink(permalink);
	var wrapper = $('#twitterlikker_wrapper_'+status_id);
		
	$('<a>Unlike</a>').attr('class','liking unlike').attr('id','liking_'+status_id).attr('href','#').bind("click", function(e){
		removeLike(permalink);
		return false;
   }).appendTo(wrapper);
}


function createLike(permalink){
	GM_xmlhttpRequest({
	  method:"POST",
	  url:likings_endpoint,
	  data: 'who='+me+'&permalink='+escape(permalink),
	  headers:{
	    "Content-Type": 'application/x-www-form-urlencoded'
	  },
	  onload:function(response) {
		  if (response.status == 201) {
				var permalink = eval('('+response.responseText+')');
				var status_id = _getStatusIdFromPermalink(permalink);
				$('a#liking_'+status_id).replaceWith("<span>You like this</span>");
			}
	    
	  }
	});
	
}

function removeLike(permalink){
	
	GM_xmlhttpRequest({
	  method:"DELETE",
	  url:likings_endpoint,
	  data: 'who='+me+'&permalink='+escape(permalink),
	  headers:{
	    "Content-Type": 'application/x-www-form-urlencoded'
	  },
	  onload:function(response) {
		  var status_id = _getStatusIdFromPermalink(permalink);
      $('a#liking_'+status_id).replaceWith("<span>Don't you like this anymore? You volatile thing!</span>");
	    attachLikeLink( $('a#liking_'+status_id).parent());
	  }
	});
	
}

function findLikings(permalinks) {
	GM_xmlhttpRequest({
    method:"GET",
	  url:likings_endpoint+'?p='+permalinks,
		onload:function(response) {
			var l = '';
			if (response.responseText != '') {
				l = eval("("+response.responseText+")");
				$("li.status a.entry-date").each(function(i){
					var me_likes_this = false;
					var s = '';
					var current = this.href;
					var users_array = l[current];

					if ((typeof(users_array) != 'undefined')) {	
						var indexofme = $.inArray(me,users_array)
						if (indexofme != -1) {
							users_array[indexofme] = 'you';
							me_likes_this = true;
						}

						var total = users_array.length;
						s += users_array.join(', ');
						j = ((total == 1 && users_array[0] != 'you')) ? 'likes' : 'like';
						s += ' '+j+' this';

						var p = $('<p class="likings_count">'+s+'</p>');

						p.appendTo($(this).parent());

						var statusId = _getStatusIdFromPermalink(this.href);
						if (me_likes_this == true) {
							$('a#liking_'+statusId).hide();
						}

					} // Cierre if

					}); // Cierre each
			}
		} // Cierre onload
				
	}); // Cierre xmlhttprequest
	
} // Cierre función


function getRecentActivityForUser(user) {
	GM_xmlhttpRequest({
    method:"GET",
	  url:user_likings_endpoint+'?user='+me,
		onload:function(response) {
			var l = '';
			if (response.responseText != '') {
				l = eval("("+response.responseText+")");
				console.log(response.responseText);
				
				if (response.responseText != '') {
					l = eval("("+response.responseText+")");
					buildRecentActivityBox(l);
				}
				
				
			}
		} // Cierre onload
				
	}); // Cierre xmlhttprequest
	
}

function buildRecentActivityBox(activities) {
	
	var box = $('<div id="twitterlikker_recent_activity" class="collapsible" style="margin-bottom:1em;"></div>');
	var box_header = $('<h2 id="twitterlikker_header" class="sidebar-title">Recent likings</h2>');
	var list = $('<ul class="sidebar-title"></ul>');
	
	for (var ac in activities) {
		var link = '<a href="http://twitter.com/'+ac+'">'+ac+'</a> likes your <a href="'+activities[ac]+'">tweet</a>';
		var li = $('<li class="link-title"></li>');
		li.append(link);
		list.append(li);
	}
	
	box.append(box_header);
	box.append(list);
  $('div#trends').before(box);
	
}


function attachStyles() {
	var link = window.document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = styles_url;
	$("HEAD")[0].appendChild(link);
}


function _getStatusIdFromPermalink(permalink) {
	return permalink.split('/').pop();
}

function checkForUpdates(){
	GM_xmlhttpRequest({
    method:"GET",
	  url:base_url+'/gm_client_version',
		onload:function(response) {
			if (response.responseText > headers['version']) {
				var msg = "<div id=\"update_msg\"><p>You're using version "+headers['version']+" of the Twitterlikker script. <a href=\"http://twitterlikker.heroku.com/gm/download\">There's a new version available ("+response.responseText+")</a>. Please upgrade for unexpected delights. Contact manuel@simplelogica.net (@mort) for any further info.</p></div";
				$('div#status_update_box').append(msg);
			}
		}
	});
}