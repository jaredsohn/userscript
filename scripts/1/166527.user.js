// ==UserScript==
// @name        Tumblr - Who Blocked Me?
// @namespace   http://userscripts.org/scripts/show/166527
// @description Adds a label to the Tumblr /following page for anyone who blocked you.
// @include     http://www.tumblr.com/following
// @include     http://www.tumblr.com/following/*
// @grant       none
// @version     1.4
// ==/UserScript==
window.fetch_ = function(who, i){
	if(jQuery(who).eq(i).attr('data-post-id')!=null){
		return parseInt(jQuery(who).eq(i).attr('data-post-id'));
	}else if(jQuery(who).eq(i+1).length > 0 && jQuery(who).eq(i).attr('id')=='tumblr_radar'){
		return window.fetch_(who, i+1);
	}else if(jQuery(who).eq(i+1).length > 0){
		return window.fetch_(who, i+1);
	}else{
		return 1;
	}
}
window.check_to_see_if_blocked = function(latest_postID, t_name){
	var blocked = jQuery('<span></span>');
	jQuery(blocked).css({color: '#CCCCCC',
					  fontSize: '11px',
					  fontWeight: 'bold',
					  marginLeft:'25px'});
	jQuery(blocked).html('allowed');
	jQuery(blocked).attr('title','This blog has not blocked you.');
	latest_postID = parseInt(latest_postID);
	var page = latest_postID+1;
	jQuery.ajax({url:"http://www.tumblr.com/dashboard/100/"+page,
			type:'get',
			success: function(x){
				var dashboard = jQuery('<div></div>');
				jQuery(dashboard).append(x.replace(/<script[^>]*?>[\s\S]*?<\/script>/gi,''));
				var v_post_id = window.fetch_(jQuery(dashboard).find('.post'), 0);
				if(v_post_id != latest_postID){
					jQuery(blocked).attr('title','blockered!');
					jQuery(blocked).css({color: '#cc0000',fontSize: '14px'});
					jQuery(blocked).html('BLOCKED YOU');
				}
				jQuery(t_name).append(blocked);
				jQuery(dashboard).remove();
			},
			error: function(){
				jQuery(blocked).html('error');
				jQuery(blocked).attr('title','error checking blocked status');
				jQuery(t_name).append(blocked);
			}
		});
}
window.recurse_wait = function(){
	if(window.tumblr_api_read == false){
		clearTimeout(window.call_wait);
		window.call_wait = setTimeout(window.recurse_wait, 10);
	}else{
		clearTimeout(window.call_wait);
		if(tumblr_api_read["posts"][0]!=undefined){
			window.check_to_see_if_blocked(tumblr_api_read["posts"][0]["id"], jQuery('.name').eq(window.cb_i));
		}else{
			var nopost = jQuery('<span></span>');
			jQuery(nopost).css({color: '#CCCCCC',
				fontSize: '11px',
				fontWeight: 'bold',
				marginLeft:'25px'});
			jQuery(nopost).html('no posts');
			jQuery(nopost).attr('title','This blog has no posts to test block.');
			jQuery('.name').eq(window.cb_i).append(nopost);
		}
		window.tumblr_api_read = false;
		window.cb_i++;
		window.next_callback();
	}
}
window.next_callback = function(){
	if(window.cb_i < jQuery('.name').length){
		var read_frame = jQuery('<script />', {
    		type: 'text/javascript',
    		src: window.callbacks[window.cb_i]
		});
		jQuery('body').eq(0).append(read_frame);
		window.recurse_wait();
	}else{
		return;
	}
}
jQuery(window).load(function(){
	window.callbacks = [];
	for(var i=0; i<jQuery('.name').length; i++){
		var iframe_api = jQuery('.name').eq(i).find('a').eq(0).attr('href')+'api/read?json';
		window.callbacks[i]=iframe_api;
	}
	window.tumblr_api_read = false;
	window.cb_i = 0;
	window.next_callback();
});