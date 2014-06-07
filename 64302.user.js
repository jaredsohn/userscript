// ==UserScript==
// @name           Reddit Comment Bookmarks
// @namespace      http://redditbookmarks.appspot.com
// @description    Adds the ability to bookmark comments.  
//			Disclaimer: Use at your own risk. Pwetty please don't come after me if one fine day you find your bookmarks have vanished. 
// @include        http://www.reddit.com/*
// @exclude        http://www.reddit.com/user/*
// @exclude        http://www.reddit.com/ads/*
// ==/UserScript==

(function() {
	var $ = unsafeWindow.$;
	if(!unsafeWindow.reddit || !unsafeWindow.reddit.logged){ //Because the ads turn up with this page.
		return;
	}
	var AppRoot = 'http://redditbookmarks.appspot.com';

	var getUserID = function(){
		return unsafeWindow.reddit.logged;
	};
	
	var getPassword = function(userID){
	var pwd = GM_getValue(userID+'_password');
		if(!pwd){
			pwd = window.prompt('A password to protect your bookmarks?\r\nNote: This would be stored without encryption on your browser. Please use a throwaway.');
			GM_setValue(userID+'_password', pwd);
		}    
	return pwd;
	}
	
	if(location.href.indexOf("/comments/") != -1){
	   createBookmarks();
	}else if(location.href.match(/\/savedcomments\/?$/)){
		showBookmarks();
	}else{
		$('ul.tabmenu').append('<li><a href="savedcomments">saved comments</a></li>');
	}
	
	function createBookmarks(){
		 //Append bookmarks
		var match = location.pathname.match(new RegExp("^/r/[^/]+/comments/([a-z0-9]+)/"));
		var pageName = (match && (match.length == 2)) ? match[1] : '';
		var pageBookmarks;
		var linksConstructed = false;
		GM_xmlhttpRequest({
			method: 'GET',
			url: AppRoot + '/?' + encodeURI('u=' + getUserID() + '&p=' + getPassword(getUserID()) + '&pg=' + pageName),
			headers: {'Content-type':'application/x-www-form-urlencoded'},
			onload: function(r){
				pageBookmarks = eval('(' + r.responseText + ')');
				console.log("Bookmarks arrived", linksConstructed);
				if(pageBookmarks.length == 0)
					pageBookmarks = null;
				else if(linksConstructed == true){
					markUnsaved(pageBookmarks);
				}
			}
		});

		var comments = document.getElementsByClassName('commentarea')[0].getElementsByClassName('comment');
		var numComments = comments.length;
		
		for(var i = 0; i < numComments; i++){
			var button = comments[i].getElementsByClassName('buttons')[0];
			var listItem = document.createElement('li');
			var linkButton = document.createElement('a');
			linkButton.setAttribute('href', 'javascript:void(0);');
			listItem.setAttribute('x', 'y');
			
			var href = button.firstChild.firstChild.getAttribute('href');
			var idx;
			var action = 'save';
			if(pageBookmarks && ((idx = $.inArray(href, pageBookmarks) != -1))){
				action = 'unsave';
				if(pageBookmarks.length == 1)
					pageBookmarks = null;
				else
					pageBookmarks = pageBookmarks.slice(0, idx).concat(pageBookmarks.slice(idx + 1));
			}
			linkButton.setAttribute('action', action);
			linkButton.addEventListener('click', function(e){
				var action = e.target.getAttribute('action');
				var link = e.target.parentNode.parentNode.firstChild.firstChild.getAttribute('href');
				e.target.childNodes[0].nodeValue = action.substr(0, action.length - 1) + "ing....";
				GM_xmlhttpRequest({
					method: 'POST',
					url:  AppRoot + '/' + action,
					headers: {'Content-type':'application/x-www-form-urlencoded'},
					data: encodeURI('u=' + getUserID() + '&p=' + getPassword(getUserID()) + '&l=' + link),
					onload: function(r) { 
						if(r.responseText.replace(/^\s+/).replace(/\s+$/) == 'OK'){
							var p = e.target.parentNode;
						    p.removeChild(e.target);
							p.appendChild(document.createTextNode(action + 'd'));
						}
					}    
				});
				return false;
			}, false);
			linkButton.appendChild(document.createTextNode(action));
			listItem.appendChild(linkButton);
			
			button.insertBefore(listItem, button.lastChild);
		}
		linksConstructed = true;
		
		var markUnsaved = function(pageBookmarks){
			var len = pageBookmarks ? pageBookmarks.length : -1;
			while(--len >= 0){
				var lnk = pageBookmarks.pop();
				$('ul.buttons > li.first > a[href="' + lnk + '"]').parent().siblings('li[x="y"]').children().attr('action', 'unsave').html('unsave');
			}
		}
	}
	
	function showBookmarks(offset){
		document.title = 'Saved Comments';
		$('span.pagename').html('Saved Comments');
		$('div.content').css('margin-left', '10px').attr('id', 'pnlContent');
		getBookmarks(0);
	}
	
	function getBookmarks(offset){
		offset = offset || 0;
		$('#pnlContent').html('Please wait while fetching...');    
	
		GM_xmlhttpRequest({
			method: 'GET',
			url: AppRoot + '/?' + encodeURI('u=' + getUserID() + '&p=' + getPassword(getUserID()) + '&o=' + offset),
			headers: {'Content-type':'application/x-www-form-urlencoded'},
			onload: function(r){
			var txt = r.responseText;
			var c = eval('(' + txt + ')');
			
			r = null;
			var len = c.length;
			var contentPanel = $('#pnlContent')
			if(len == 0){
				contentPanel.html('Nothing here');
				
			}else{
				contentPanel.html('');
				for(var i = 0; i < len; i++){
					var entry = $('<div class="comment thing"><a href="' + c[i] + '">' + c[i] + '</a></div>').appendTo(contentPanel);
					$.getJSON(c[i] + '.json', function(e, link){
						return function(data){
							if(!data[0].data){
								console.log(data[0]);
								return;
							}
							var post = data[0].data.children[0].data;
							var comment = data[1].data.children.length ? data[1].data.children[0].data : {'author': '', 'body_html' : 'deleted'};
							e.html('');
							var commentDiv = e.append(
								'<div class="entry">'
								+ '<p class="tagline"><a class="author" href="/user/' + comment.author + '">' + comment.author + '</a> on ' + 
									'<a class="title" href="' + '/comments/' + post.name.substring(3) + '">' + post.title + '</a></p>'
								+ '<div class="usertext-body">' + comment.body_html + '</div>' 
								+ '<ul class="flat-list buttons"><li class="first"><a href="' + link + '">permalink</a></li>'
								+ '<li><a href="javascript:void(0);" class="unsave">unsave</a></li>'
								+'</ul>'
								+ '</div><div class="child"><br /></div>'
							).children().children('div.usertext-body');
							commentDiv.html(commentDiv.text());
							e.find('ul.buttons li:last a')[0].addEventListener('click', function(event){
								GM_xmlhttpRequest({
									method: 'GET',
									url: AppRoot + '/unsave?' + encodeURI('u=' + getUserID() + '&p=' + getPassword(getUserID()) 
										+ '&l=' + $(event.target).parent().prev('li:first').children().attr('href')),
									headers: {'Content-type':'application/x-www-form-urlencoded'},
									onload: function(r){
										$(event.target.parentNode).html('unsaved')
									}
								});
									
							}, false);
						}
					}(entry, c[i]));
				}
			}
			
			var contentPanel = document.getElementById('pnlContent');
			if((offset > 0) || (len == 10)){
				var nextPrev = document.createElement('p');
				nextPrev.appendChild(document.createTextNode('view more: '));
				nextPrev.className = 'nextprev';
				if(offset > 0){
					var lnk = document.createElement('a');
					lnk.setAttribute('href', 'javascript:void();');
					lnk.addEventListener('click', function(e){ getBookmarks(offset - 10); }, false);
					lnk.appendChild(document.createTextNode('prev'));
					nextPrev.appendChild(lnk);
					nextPrev.appendChild(document.createTextNode(' ' + ((len == 0) ? '| ' : '')));
				}
				if(len == 10){
					var lnk = document.createElement('a');
					lnk.setAttribute('href', 'javascript:void();');
					lnk.addEventListener('click', function(e){ getBookmarks(offset + 10); }, false);
					lnk.appendChild(document.createTextNode('next'));
					nextPrev.appendChild(lnk);
				}
				contentPanel.appendChild(nextPrev);
			}
			}
		});
	}
})();