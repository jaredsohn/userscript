// ==UserScript==
// @name        FluidSmallTwitterClient
// @namespace   http://fluidapp.com
// @description Builds a small twiter client for fluid 
// @include     https://*twitter.com/*
// @include		http://*twitter.com/*

// @version		2.0   
// @author		Tanguy de Courson <tanguy@0x7a69.com>
// ==/UserScript==      



/* === GETELEMENTSBYCLASSNAME ===
   Developed by Robert Nyman, http://www.robertnyman.com
   Code/licensing: http://code.google.com/p/getelementsbyclassname/
   ============================== */


var getElementsByClassName = function(className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function(className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
            nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
            returnElements = [],
            current;
            for (var i = 0, il = elements.length; i < il; i += 1) {
                current = elements[i];
                if (!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = "",
            xhtmlNamespace = "http://www.w3.org/1999/xhtml",
            namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace: null,
            returnElements = [],
            elements,
            node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch(e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function(className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = [],
            elements = (tag === "*" && elm.all) ? elm.all: elm.getElementsByTagName(tag),
            current,
            returnElements = [],
            match;
            for (var k = 0, kl = classes.length; k < kl; k += 1) {
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for (var l = 0, ll = elements.length; l < ll; l += 1) {
                current = elements[l];
                match = false;
                for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
};

/* === //GETELEMENTSBYCLASSNAME === */

   

/* === GETCOOKIE, SETCOOKIE and DELETECOOKIE ===
   Wanted to use GM_setValue and GM_getValue but both didn’t work with
   GreaseKit. So I had to use cookies which fortunately worked.
   Those tree functions were found at dustindiaz.com:
   http://www.dustindiaz.com/top-ten-javascript/
   ============================== */

function getCookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(';', len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}

function setCookie(name, value, expires, path, domain, secure) {
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + '=' + escape(value) +
    ((expires) ? ';expires=' + expires_date.toGMTString() : '') +
    //expires.toGMTString()
    ((path) ? ';path=' + path: '') +
    ((domain) ? ';domain=' + domain: '') +
    ((secure) ? ';secure': '');
}

function deleteCookie(name, path, domain) {
    if (getCookie(name)) document.cookie = name + '=' +
    ((path) ? ';path=' + path: '') +
    ((domain) ? ';domain=' + domain: '') +
    ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}


 (function() {
    if (window.fluid) 
	{
		deleteCookie('unread_str');
		timeline_load_next_page();
		
		var defaultSeconds = 120;
		var unread = new Array();
		var unread_i = 0;
		var hidden_unread = new Array();
        var lastone = getCookie("lastid");
		var badgecount = 0;
		var lastshownid =0;
		var thisuser = '';
//alert("lastone:" + lastone);

		var hide_users = new Array();
		


		var unread_str_l = getCookie('unread_str');
		
	
		if(unread_str_l)
		{
			unread = unread_str_l.split(',');
			alert(unread);
			window.fluid.dockBadge = unread.length;
		}

        if (lastone == null) {
            lastone = 0;
        }

       	thisuser = document.getElementById("side_base").getElementsByTagName('a')[0].getAttribute("href").replace('https://twitter.com/', '');                                                     
		hide_users.push(thisuser);
       
        
		
		 var tmpElm = document.createElement("style");
	        tmpElm.setAttribute("type", "text/css");
		tmpElm.appendChild(document.createTextNode('#header{height: 25px;} #navigation,#footer,#side_base, .bar,.yellow-box,.tabMenu, .top-navigation.round, #timeline_heading{display:none !important;}#container,#contentx{width:100% !important;margin:0 !important;padding:0 !important;}#doingForm,fieldset,.info{width:100% !important;margin:0 !important;padding:0 !important;ovverflow:hidden !important;}#status{width:85% !important;font-size:12px !important;line-height:1.5 !important;}.content{font-size:12px !important;line-height:1.5 !important;}.vcard,.vcard img{width:48px !important;}td{vertical-align:top !important;text-align:left !important;}td.content .entry-content,td.content strong{display:block !important;text-align:left !important;margin-left:.8em !important;}td.content img{float:left !important;margin-top:-1.4em !important;}.bar h3{font-size:14px !important;}#logo img {width:105px !important; height:25px !important;}.section{overflow-y:scroll !important; width: 100% !important; height:300px !important; margin-top:10px !important;}#wrapper{padding:0 !important;}body{overflow:hidden !important;}'));
        document.getElementsByTagName('head')[0].appendChild(tmpElm);

        var logo = document.getElementsByTagName('img');
        logo[1].style.width = '105px';
        logo[1].style.height = '25px';
        logo[1].style.padding = '5px 0 0 20px';

       
		var contents = getElementsByClassName('status-body');

       var firstcontentid = contents[0].parentNode.getAttribute('id').replace('status_', '');
	//alert(lastone + ':' + firstcontentid)
		deleteCookie('lastid');
		setCookie("lastid", firstcontentid, 1);
		
		for (var i = 0; i < contents.length; i++) 
		{
           var thiscontent = contents[i];
            var currentid = thiscontent.parentNode.getAttribute('id').replace('status_', '');

            if (in_array(unread, currentid) || currentid > lastone) 
			{
				thiscontent.style.backgroundColor = '#f3ff5e';
				//thiscontent.onmouseover = function(){this.style.backgroundColor=''; var dockcount=getCookie('badgecount'); dockcount--; setCookie('badgecount', dockcount); window.fluid.dockBadge = (dockcount > 0 ? dockcount : ''); this.onmouseover = ''; remove_from_unread(currentid);}
				
				thiscontent.onmouseover = function(){this.style.backgroundColor='';  this.onmouseover = ''; remove_from_unread_obj(this);}
				if(currentid > lastone && !in_array(unread, currentid))
				{
					add_to_unread(currentid);
				}
			}
		
		}
		
        	//setCookie("lastid", firstcontentid, 1);

		//setCookie("lastshownid", firstcontentid, 1);
        lastshownid = firstcontentid;

        function checkfornew()
		{



			//alert(twttr.form_authenticity_token);
			url = 'https://twitter.com/statuses/friends_timeline.json';
			url += '?since_id=' + (lastshownid == 0 ? getCookie('lastshownid') : lastshownid);
			url += '&authenticity_token=' + twttr.form_authenticity_token;
			http.open('GET', url, true);
			http.onreadystatechange = verify_new;
			http.send(null);
			//var defaultSeconds = 30;   // change this if you want faster or slower reloads


			//scheduling so no unnessary reloads
			var d=new Date();
			var day = d.getDay();
			var hour = d.getHours();
			
			var timeout = defaultSeconds; 
			if(hour <6 && hour >0)
			{
				//less than 7am or later than 7pm
				timeout = 7200; //one hour
			}	
			setTimeout(checkfornew, timeout*1000);
		}
		function verify_new()
		{
			if(http.readyState == 4)
			{
				var results = eval('(' + http.responseText + ')');
				//alert('moreread: ' + results[0]['id']  + ', lastread: ' + getCookie('lastshownid') + "lastid: " + getCookie('lastid'));
				if(results.length > 0)
				{
					//setCookie('lastshownid', results[0]['id'], 1);
					//setCookie("lastid", results[0]['id'], 1);
					lastshownid = results[0]['id'];

					for(i=(results.length-1); i >= 0; i--)
					{
						if(results[i]['user']['screen_name'] != thisuser)
						{
							add_to_unread(results[i]['id']);


							window.fluid.showGrowlNotification({
			                    title: results[i]['user']['name'],
			                    description: results[i]['text'],
			                    priority: 1,
			                    sticky: false,
			                    identifier: "tweet" + results[i]['id'],
			                    icon: results[i]['user']['profile_image_url']
			                });

						
								 //var myli = make_tweet(results[i]);
								var myli = make_tweet_good(results[i]);
								//$('#timeline').prepend(myli);
								//document.getElementById('timeline').appendChild(myli, document.getElementById('timeline').firstChild);
								document.getElementById('timeline').insertBefore(myli, document.getElementById('timeline').firstChild);
								//document.getElementById('timeline').innerHTML = myli + document.getElementById('timeline').innerHTML
									//if you use twitter enhancements retweet this lets add it
								
								
						}	
								setCookie("lastid", results[0]['id'], 1);

							
						

					}


					//var badgecount = getCookie('badgecount') ;
					//badgecount = badgecount/1;
					/*
					if(!badgecount)
						badgecount = 0;
					badgecount += results.length/1;
					window.fluid.dockBadge = (badgecount > 0) ? badgecount : '';
					//setCookie('badgecount', badgecount);
					*/
					setCookie("lastid", results[0]['id'], 1);
					twitpiccheck();
				
				}



			}
		}
		function mark_all_read()
		{
			for(i=0; i<unread.length; i++)
			{
				remove_from_unread(unread[i]);
			}
			
			deleteCookie('unread_str');
			window.fluid.dockBadge = '';
			
			unread = new Array();
			
		}
		function remove_from_unread_obj(id_obj)
		{
			var id = id_obj.parentNode.getAttribute('id').replace('status_', '');
			remove_from_unread(id)
		}
		function remove_from_unread(id)
		{
			
			//alert('removeing id: ' + id);
			var tmpArr = new Array();
			for(i=0; i < unread.length; i++)
			{
				if(unread[i] != id)
				{
					//alert("adding " + unread[i] + " because its not " + id);
					tmpArr.push(unread[i]);
				}
				
			}
			unread = tmpArr;
			deleteCookie('unread_str');
			//alert("resetting string " + unread.length);
			setCookie('unread_str', unread.join(','), 1);
			window.fluid.dockBadge = (unread.length > 0) ? unread.length : '';
		}
		function add_to_unread(id)
		{
			unread.push(id);
			deleteCookie('unread_str');
			setCookie('unread_str', unread.join(','), 1);
			//alert("adding " + id + " unread is now: " + unread.join(','));
			window.fluid.dockBadge = unread.length;
		}
		function in_array(myarray, key)
		{
			for(var i=0; i<myarray.length; i++)
			{
				if(myarray[i] == key)
					return true;
			}
			return false;
		}
		function twitterreload()
		{
			var twitterStatus = document.getElementById('status');  // twitter's text field
	        twitterDirectMessageField = document.getElementById('text');  // twitter's direct message field, nice distinctive id there...
			if ( ( ( twitterStatus && twitterStatus.value != '' ) || 
	             ( twitterDirectMessageField && twitterDirectMessageField.value != '' ) ) )
			{
				unreadStatusDiv = document.getElementById('_fluidUnread');
				unreadStatusDiv.innerHTML = " reload paused, clear status to resume";
			}
			else
			{
				window.location = window.location.href.toString().replace( /\?$/, "" ).replace( /#$/, "?" ); 
			}
		}

		window.fluid.addDockMenuItem("Refresh", function() { twitterreload(); });
		window.fluid.addDockMenuItem("Debug unread", function() { alert(getCookie('unread_str')); });
		window.fluid.addDockMenuItem("Mark all read", mark_all_read);
		setTimeout(checkfornew, 30*1000);


		/** twitpic integration **/
		//$ = window.jQuery;
		twitpiccheck();
		function twitpiccheck() {

			var images = document.getElementsByTagName('a');
			for (var i = 0; i < images.length; i++) 
			{

				if(images[i].href.indexOf('twitpic.com') > 0)
				{
					twitpicresolve(images[i], 'twitpic');
				}
				else if(images[i].href.indexOf('yfrog.com') > 0)
				{
					twitpicresolve(images[i], 'yfrog');
				}
			}
		}

		function twitpicresolve(a, site) 
		{

			a.title = 'resolved';

			var pathArray = a.href.split('/');
			if(site == 'yfrog')
			{
				image = 'http://yfrog.com/' + pathArray[pathArray.length-1] + '.th.jpg';
			}
			else
			{
				image = 'http://twitpic.com/show/thumb/' + pathArray[pathArray.length-1];
			}
			$(a.parentNode).css({position: 'block'});

			var $img = $('<div/>').appendTo(a.parentNode).css({
				position: 'absolute',
				top     : '30px',
				left    : 0,
				display : 'none',
				width  : '150px',
				height : '150px',
				border : '5px #333 solid',
				align : 'right',
				backgroundImage: 'url(' + image + ')',
				zIndex : 6

			});
			if ($.browser.safari) {
				$img.css({
					'border-radius': '8px',
					'-webkit-border-radius': '8px'
				});
			}
			$(a).hover(function() {
				$img.css({
					display : "block",
					position : "absolute"
				});
			},
			function() {

				$img.css({
					display : 'none',

				});
			});
		}

		//end: twitpic

		//test expand window past 20 tweets (thank you troystwitterscript)
		function timeline_load_next_page()
		{
			try
			{
				more_text = $('#more').text();
				$('#more').text('').addClass('loading');
			}
			catch( err ){}
			$.get($('#pagination .section_links:last,#more').attr('href'),function(resp){
				$resp = $(resp);
				if( $resp.find('#timeline').length == 1 )
				{
					$('#timeline').append($resp.find('#timeline').html());
					var $resp_next_page_link = $resp.find('#pagination .section_links[rel~=prev],#more');
					if( $resp_next_page_link.length == 1 )
						$('#pagination .section_links[rel=prev],#more').attr('href',$resp_next_page_link.attr('href'));
					else
						$('#pagination .section_links[rel=prev]').attr('href','');
					//tnt_twitter.tweet_process($('.hentry').not('.processed-tweet'));
				}
				else if( $resp.find('table.doing').length == 1 )
				{
					$('table.doing').append($resp.find('table.doing tr'));
					var $resp_next_page_link = $resp.find('#pagination .section_links[rel~=next]');
					if( $resp_next_page_link.length == 1 )
						$('#pagination .section_links').attr('href',$resp_next_page_link.attr('href'));
					else
						$('#pagination .section_links').attr('href','').text('The End');
					/*
					$('.vcard').not('.processed-friend').each(function(){
						tnt_twitter.process_friend($(this));
					});
					*/
				}

				try
				{
					$('#more').text(more_text).removeClass('loading');
				}
				catch( err ){}
			});
		}
		function make_tweet(tweet)
		{
				var mytext = tweet['text'].replace(/(ftp|http|https|file):\/\/[\S]+(\b|$)/gim,
				'<a href="$&" class="my_link" target="_blank">$&</a>');
				
			var html = '';
			//html += '<li class="hentry u-'+tweet['user']['screen_name']+' status" id="status_'+tweet['id']+'">';
			
			//html += '<span class="thumb vcard author">';
			
			//html += '<a href="https://twitter.com/'+tweet['user']['screen_name']+'" class="tweet-url profile-pic url"><img alt="'+tweet['user']['name']+'" class="photo fn" height="48" src="'+tweet['user']['profile_image_url']+'" width="48"></a></span>';
			
			//html += '<span class="status-body" style="background: #f3ff5e" id="status_body_'+tweet['id']+'">';
			
			html += '<strong><a href="https://twitter.com/'+tweet['user']['screen_name']+'" class="screen-name" title="'+tweet['user']['name']+'">'+tweet['user']['screen_name']+'</a></strong>';
			
			html += '<span class="actions"><div><a class="fav-action non-fav" id="status_star_'+tweet['id']+'" title="favorite this update">&nbsp;&nbsp;</a></div></span>';
			
			html += '<span class="entry-content">'+ mytext +'</span>';
			
			html += '<span class="meta entry-meta">';
			
			html += '<a href="https://twitter.com/'+tweet['user']['screen_name']+'/status/'+tweet['id']+'" class="entry-date" rel="bookmark"><span class="published">'+myparse_date(tweet['created_at'])+'</span></a> <span>from '+tweet['source']+'</span> </span></span>';
			
			
			
		
			
			html += '<ul class="actions-hover">';
			html += '<li>';
			html += '<span class="reply">';
			html += '<span class="reply-icon icon">';
			html += '<a class="reply" href="/home?status=@'+tweet['user']['screen_name']+'%20&amp;in_reply_to_status_id='+tweet['id']+'&amp;in_reply_to='+tweet['user']['screen_name']+'" title="reply to '+tweet['user']['screen_name']+'"></a>';
		html += '</span>';
		html += '</li>';
		html += '<li>';
		html += '<span class="retweet-link">';
		html += '<span class="retweet-icon icon">';
		html += '<a title="retweet" href="#"></a>';
		html += '</span>';
		html += '</li>';
		html += '</ul>';
			
			
			
	//	html += '</span></li>';
			return html;
		}

		function make_tweet_good(tweet)
		{
		
			var mytext = tweet['text'].replace(/(ftp|http|https|file):\/\/[\S]+(\b|$)/gim,
			'<a href="$&" class="my_link" target="_blank">$&</a>');
			
			var li = document.createElement('li');
			li.setAttribute('class',  "hentry status u-"+tweet['user']['screen_name']);
			li.setAttribute('id',  'status_' + tweet['id']);

			var thumbspan = document.createElement('span');
			thumbspan.setAttribute('class', "thumb vcard author");
			thumbspan.innerHTML = '<a href="https://twitter.com/'+tweet['user']['screen_name']+'" class="url"><img alt="'+tweet['user']['name']+'" class="photo fn" height="48" src="'+tweet['user']['profile_image_url']+'" width="48"></a>';

		//	li.appendChild(thumbspan);

			var bodyspan = document.createElement('span');
			bodyspan.setAttribute('class', 'status-body');
			bodyspan.setAttribute('id', 'status-body_'+tweet['id']);
			bodyspan.innerHTML = make_tweet(tweet);
			//bodyspan.innerHTML = '<strong><a href="https://twitter.com/'+tweet['user']['screen_name']+'" class="screen-name" title="'+tweet['user']['name']+'">'+tweet['user']['screen_name']+'</a></strong><span class="entry-content">'+ mytext +'</span><span class="meta entry-meta"><a href="https://twitter.com/'+tweet['user']['screen_name']+'/status/'+tweet['id']+'" class="entry-date" rel="bookmark"><span class="published">'+myparse_date(tweet['created_at'])+'</span></a> <span>from '+tweet['source']+'</span> </span></span><span class="actions"><div><a class="fav-action non-fav" id="status_star_'+tweet['id']+'" title="favorite this update">&nbsp;&nbsp;</a><a class="reply" href="/home?status=@'+tweet['user']['screen_name']+'%20&amp;in_reply_to_status_id='+tweet['id']+'&amp;in_reply_to='+tweet['user']['screen_name']+'" title="reply to '+tweet['user']['screen_name']+'">&nbsp;&nbsp;</a></div></a></span>';
			bodyspan.style.backgroundColor = '#f3ff5e';
			//bodyspan.onmouseover = function(){this.style.backgroundColor=''; var dockcount=getCookie('badgecount'); dockcount--; setCookie('badgecount', dockcount); window.fluid.dockBadge = (dockcount > 0 ? dockcount : ''); this.onmouseover = '';}
			bodyspan.onmouseover = function(){this.style.backgroundColor=''; this.onmouseover = '';remove_from_unread(tweet['id']);}

			li.appendChild(thumbspan);
			li.appendChild(bodyspan);

			return li;



		}
		
    } //end if fluid?

//
	
	//test ajax checking for new for refresh
	function getHTTPObject() {
	  var xmlhttp;
	  /*@cc_on
	  @if (@_jscript_version >= 5)
	    try {
	      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	    } catch (e) {
	      try {
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	      } catch (E) {
	        xmlhttp = false;
	      }
	    }
	  @else
	  xmlhttp = false;
	  @end @*/
	  if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
	    try {
	      xmlhttp = new XMLHttpRequest();
	    } catch (e) {
	      xmlhttp = false;
	    }
	  }
	  return xmlhttp;
	}
	var http = getHTTPObject();
	/*
	b = document.getElementsByTagName('body')[0]
	unreadStatusDiv = document.getElementById('_fluidUnread');
    
	if ( !unreadStatusDiv ) {
	    var unreadStatusDiv = document.createElement('div');
	    unreadStatusDiv.id = '_fluidUnread';
	    unreadStatusDiv.appendChild( document.createTextNode() );
	    unreadStatusDiv.style.backgroundColor = "#fff";
	    unreadStatusDiv.style.color = "#000";
	    unreadStatusDiv.style.opacity = "0.7";
	    b.insertBefore( unreadStatusDiv, b.firstChild );
		unreadStatusDiv.innerHTML = '<a href="javascript:alert(getCookie(unread))">unread</a>';
	}
	*/
	
	
	


	function myparse_date(date_str)
	{
		var time = Date.parse(date_str), //tanguy: seems easier this way
		var newtime = new Date(time);
		var mydatestr = '';
		mydatestr  = ((newtime.getMonth()/1)+1) + '/' + newtime.getDate() + ' ' + newtime.getHours() + ':' + newtime.getMinutes();
		return mydatestr;
	}
	
	
	

})();
