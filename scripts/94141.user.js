// ==UserScript==
// @name           TW Forum Tracking
// @namespace      http://userscripts.org/scripts/show/94141
// @description    Add button to highest visited page number for each topic in The West in-game Town forum
// @include        http://*.the-west.*/forum.php*
// @history         1.001 Small Fixing to exclude user list from processing
// @history         1.000 Initial release
// ==/UserScript==
var insertWindow = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;
var sie = insertWindow.document.createElement('script');
sie.type = 'text/javascript';
if(typeof uneval == 'undefined') function uneval(o){return o.toString()};
sie.text = "(" + uneval(function(){
	function getJCookie(n){var c='; '+document.cookie+';',s='; twforum_'+encodeURIComponent(n)+'=',b=c.indexOf(s),e;if(b==-1)return{};b=b+s.length;e=c.indexOf(';',b);return Json.evaluate(decodeURIComponent(c.substring(b,e)),true);}
	function setJCookie(n,o){ var c = 'twforum_'+encodeURIComponent(n)+'='+escape(Json.toString(o))+'; max-age=5184000'; document.cookie = c; }
	var TWForum = {};
	TWForum.twforum_forumCookie = getJCookie('forumCookie');
	var url = document.location.toString();
	if(url.search(/show_members=1/i) == -1){
		var page = url.search(/page=/i) != -1 ? url.match(/page=([a-z]+)/i)[1] : 'forum';
		switch(page){
			case 'thread':
				var thread_id = url.match(/thread_id=([0-9]+)/)[1];
				var page_current = url.search(/page_current=/i) != -1 ? url.match(/page_current=([0-9]+)/)[1] : 0;
				if(page_current>TWForum.twforum_forumCookie[thread_id]){
					TWForum.twforum_forumCookie[thread_id] = page_current;
					setJCookie('forumCookie',TWForum.twforum_forumCookie);
				}
				break;
			case 'forum':
				
				rows = $('forum_listview').getElements('tr');
				for(var no in rows){
					if(!parseInt(no)){ continue; }
					tds = rows[no].getElements('td');
					a = tds[1].getElements('a')
					href = a[0].href.toString();
					if(href.search(/thread_id=/i) == -1){ continue; }
					thread_id = href.match(/thread_id=([0-9]+)/)[1];
					if(typeof TWForum.twforum_forumCookie[thread_id] == 'undefined'){
						TWForum.twforum_forumCookie[thread_id] = 0;
					}
					h = href.match(/h=([0-9a-z]+)/i)[1];
					ins = '<br /><a href="forum.php?page=thread&amp;thread_id='+thread_id+'&amp;h='+h+'&amp;page_current='+TWForum.twforum_forumCookie[thread_id]+'"><span class="pagenav_inactive">'+parseInt(parseInt(TWForum.twforum_forumCookie[thread_id])+1)+'</span></a>';
					tds[4].innerHTML = tds[4].innerHTML + ins;
				}
				setJCookie('forumCookie',TWForum.twforum_forumCookie);
				break;
		}
	}
}) + ")();";
insertWindow.document.body.appendChild(sie);
