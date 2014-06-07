scr_meta=<><![CDATA[
// ==UserScript==
// @name		@hideto's 1day1shot loader
// @namespace	http://www.hide10.com
// @description	1day1shot URL Expansion and Embed
// @version		1.0
// @include		http://twitter.com*
// @include		http://www.twitter.com*
// @include		https://twitter.com*
// @include		https://www.twitter.com*
// 
// ==/UserScript==
// based on     @troynt's Twitter Script (http://userscripts.org/scripts/show/40617)
]]></>;

hdt = {
	ajax_queue: [],
	ajax_tmp: {},
	init:function(){
		if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(hdt.init,100); return; }
				
		$ = unsafeWindow.jQuery;
		jQuery = $;

		hdt.url_cache = eval(GM_getValue('hdt.url_cache')) || {};

		GM_addStyle(".hdt-image { float:right; clear:both; max-height:240px; margin-left:10px; }");
		
		window.setInterval(function(){
			hdt.tweet_process($('#timeline .hentry').not('.hdt-processed-tweet').slice(0,2));
		},2000);

		window.setInterval(function(){
			if( hdt.ajax_queue.length > 0 )
			{
				var threads = 4;
				//console.log('before')
				//console.log(hdt.ajax_queue);
				while( ajax_obj = hdt.ajax_queue.shift())
				{
					//console.log(ajax_obj)
					ajax_obj['User-agent'] = 'Mozilla/4.0 (Compatible) @hideto Greasemonkey Script';
					ajax_obj['method'] = ajax_obj['method'] || 'GET';
					
					if( hdt.ajax_tmp[ajax_obj.url] )
					{
						//console.log('found '+ ajax_obj.url+' in tmp cache')
						ajax_obj.callback(hdt.ajax_tmp[ajax_obj.url])
					}
					else GM_xmlhttpRequest(ajax_obj);
					
					if( --threads == 0 || hdt.ajax_queue.length == 0 ) break;
				};
				//console.log('after')
				//console.log(hdt.ajax_queue);
			}
		},500);
		
		hdt.tweet_process($('#permalink .hentry'));	
	},
	ajax:function(ajax_obj)
	{
		if( hdt.ajax_tmp[ajax_obj.url] )
		{
			//console.log('found '+ ajax_obj.url+' in tmp cache')
			ajax_obj.callback(hdt.ajax_tmp[ajax_obj.url])
		}
		else
		{
			ajax_obj['onload'] = function(resp){ hdt.ajax_tmp[ajax_obj.url] = resp; ajax_obj.callback(resp); }
			hdt.ajax_queue.push(ajax_obj);
		}
		
	},
	tweet_process:function( $tweets )
	{
		$tweets = $tweets.not('.hdt-processed-tweet');
		$tweets.addClass('hdt-processed-tweet');
		$tweets.each(function(){
			var $tweet = $(this);
			hdt.expand_urls($tweet);
		});
	},
	expand_urls:function( $tweet )
	{
		$tweet.find('a.web').not('.hdt-expanded').each(function(){
			var $t = $(this);
			if( !$t.attr('href').match('https?://') )
			{
				$t.addClass('hdt-expanded');
				return;
			}
			
			var url = $t.attr('href').replace('http://','');
			var url_parts = url.split('/');
			var domain = url_parts.length > 1 ? url_parts[0] : url;

			if( hdt.url_cache[url] )
			{
				var long_url = hdt.url_cache[url].long_url;
				var title = hdt.url_cache[url].title;

				$t.html(title);
				if( !long_url.match(/https?/) ) long_url = 'http://'+long_url;
				$t.attr('href',long_url);
				$t.attr('title',long_url);
				$t.text(long_url)
				$t.addClass('hdt-expanded');
			}
			
			url = $t.attr('href').replace('http://','');
			url_parts = url.split('/');
			domain = url_parts.length > 1 ? url_parts[0] : url;
			
			if( domain == '1day1shot.jp' && !( url_parts[1] == 'albums' ) )
			{
				hdt.ajax({
					url:  'http://api.longurl.org/v1/expand?format=json&url=' + encodeURIComponent(url),
					callback: function(resp) {
						if( resp.status != 200 || typeof(resp.responseText) === 'undefined' ) return resp;
						var link = eval('(' + resp.responseText + ')');
						if (typeof(link.messages) !== 'undefined') { return resp; }

						hdt.save('url_cache',url,link,function(){
							hdt.expand_urls($tweet);
						});
						
					}
				});
				return;
			}
			else if( url.match('1day1shot\.jp/albums/[0-9]+/[0-9]+/[0-9]+/[0-9]+/[0-9]+') )
			{
				hdt.ajax({
						url: $t.attr('href'),
						callback: function(resp){
							if (resp.status != 200) 
								return;
							resp = resp.responseText;
							var photo_div = resp.between('class="image"', '</div>');
							var src = photo_div.between('src="', '"');
							if (src.length > 0 && src.match('\.(jpg|jpeg|gif|png)')) {
								console.log(src);
								$t.addClass('hdt-expanded');
								$t.html('<img class="hdt-image" src="http://1day1shot.jp' + src + '" />');
							}
						}
				});
			}

			$t.addClass('hdt-expanded');
		});
	},
	save:function(store,key,value,callback){
		hdt[store][key] = value;
		window.setTimeout(function(){
			GM_setValue('hdt.'+store,uneval(hdt[store]));
			if( typeof callback == "function" ) callback();
		},100);
	},
}
String.prototype.between = function(prefix, suffix) {
  s = this;
  var i = s.indexOf(prefix);
  if (i >= 0) {
    s = s.substring(i + prefix.length);
  }
  else {
    return '';
  }
  if (suffix) {
    i = s.indexOf(suffix);
    if (i >= 0) {
      s = s.substring(0, i);
    }
    else {
      return '';
    }
  }
  return s;
}
hdt.init();
unsafeWindow.hdt = hdt;
