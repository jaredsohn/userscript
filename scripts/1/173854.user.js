// ==UserScript==
// @name        DobrochanAngelForestScript
// @namespace   dafs
// @description soon
// @include     http://dobrochan.*
// @require     //cdnjs.cloudflare.com/ajax/libs/jquery/1.10.1/jquery.js
// ==/UserScript==

$.noConflict();
jQuery(document).ready(function($) {
	$('div.adminbar').append('[<a onclick="$(\'#afssettingspanel\').show();">afs</a>]');
	
	var settings = {
		refLinks: true,
		updateThread: true,
		threadPostCount: true,
		sidePanel: false,
		sidePanelSettings: null //defined later
	};
		
	
	var localText = {
		postAnswerButton: 'Ответ',
		postDeleteButton: 'Удалить'
	};
	
	var pageInfo = {};
	var sidePanel;
	
////////////////////////////////////////////////////////////////////////////////

	unsafeWindow.saveAfsSettings = function() {
		var afsSettings = {
			refLinks: $('#checkboxreflinks').prop('checked'),
			updateThread: $('#checkboxupdatethread').prop('checked'),
			threadPostCount: $('#checkboxthreadpostcount').prop('checked'),
			sidePanel: $('#checkboxsidepanel').prop('checked')
		};
		localStorage.afsSettings = JSON.stringify(afsSettings);
	}

	afsSettingsHtml = '<div id="afssettingspanel" class="reply" style="position:fixed; left:33%; right:33%; top:10%; min-width:300px;">' +
					  '<table style="width:100%;"><tr><td class="replytitle" style="text-align:center; width:100%;">Settings</td>' +
					  '<td style="text-align:right;"><a onclick="$(\'#afssettingspanel\').hide();">close</a></td></tr></table>' +
					  '<br />' +
					  '<table>' +
					  '<tr><td><input id="checkboxreflinks" type="checkbox" ' + (settings.refLinks ? 'checked="checked" ' : '') + '/></td>' +
					  '<td><label for="checkboxreflinks">Show reply links</label></td></tr>' +
					  '<tr><td><input id="checkboxupdatethread" type="checkbox" ' + (settings.updateThread ? 'checked="checked" ' : '') + '/></td>' +
					  '<td><label for="checkboxupdatethread">Add button to load new posts in thread</label></td></tr>' +
					  '<tr><td><input id="checkboxthreadpostcount" type="checkbox" ' + (settings.threadPostCount ? 'checked="checked" ' : '') + '/></td>' +
					  '<td><label for="checkboxthreadpostcount">Show posts count in op-post</label></td></tr>' +
					  '<tr><td><input id="checkboxsidepanel" type="checkbox" ' + (settings.sidePanel ? 'checked="checked" ' : '') + '/></td>' +
					  '<td><label for="checkboxsidepanel">Add advanced panel</label></td></tr>' +
					  '</table>' +
					  '<br />' +
					  '<div style="text-align:center; width:100%;"><a id="afsbuttonsave" onclick="saveAfsSettings();">Save</a></div>' +
					  '<br />' +
					  '</div>';

	$('body').append(afsSettingsHtml);
	$('#afssettingspanel').hide();

	
////////////////////////////////////////////////////////////////////////////////

	var regexpPostReference = /\/(\w+)\/res\/(\d+).xhtml#i(\d+)/; //1 - board, 2 - thread, 3 - post
	function createRefLink(href) {
		var result = regexpPostReference.exec(href);
		if(!result)
			return null;
		var code = '<a href="' + href + '" ' +
		           'onmouseover="ShowRefPost(event,\'' + result[1] + '\',' + result[2] + ',' + result[3] + ')" ' +
				   'onclick="Highlight(event,\'' + result[3] + '\')">' +
				   '>>' + result[3] + '</a>';
		return code;
	}
	
	function jsonDateToDobrochanStyle(jsonDate) {
		//2013-07-27 05:40:27 -> 27 July 2013 (Sat) 05:40
		var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var year = jsonDate.substr(0, 4);
		var month = parseInt(jsonDate.substr(5, 2)) - 1;
		var day  = jsonDate.substr(8, 2);
		var time = jsonDate.substr(11, 5);
		var dayName = dayNames[new Date(year, month, day).getDay()];
		var dcDate = day + ' ' + monthNames[month] + ' ' + year + ' (' + dayName + ') ' + time;
		
		return dcDate;
	}

	function fileSize(size) {
		const KB = 1024;
		const MB = 1024*1024;
		const GB = 1024*1024*1024;
		if(size > GB)
			return (size/GB).toFixed(2) + ' GB';
		if(size > MB)
			return (size/MB).toFixed(2) + ' MB';
		if(size > KB)
			return (size/KB).toFixed(2) + ' KB';
		return size + ' B';
	}
	
	function toUpperCaseFirstSymbol(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
	function clamp(value, a, b) {
		return value < a ? a : value > b ? b : value;
	}
	
	function fileTypeDescription(type) {
		if(type == 'rar' || type == '7z' || type == 'zip')
			return 'Archive';
		if(type == 'txt')
			return 'Text';
		if(type == 'js')
			return 'Javascript';
		if(type == 'pdf')
			return 'PDF';
		if(type == 'pl')
			return 'Prolog';
		if(type == 'py')
			return 'Python';
			
		return toUpperCaseFirstSymbol(type);
	}
	
	
////////////////////////////////////////////////////////////////////////////////

	function createFilesHtml(jsonFiles, postId, isRealNamesAllowed) {
		var filesHtml = '';
		var isOnlyOneFile = (jsonFiles.length == 1);
		var divFileinfoHtml = (isOnlyOneFile ? '<div class="fileinfo">' : '<div class="fileinfo limited">');
		for(var i = 0; i < jsonFiles.length; i++) {
			var file = jsonFiles[i];
			var fileinfo = /src\/(.+)\/\d+\/(.+)/.exec(file.src);
			var filename;
			if(isRealNamesAllowed)
				filename = fileinfo[2];
			else
				filename = /.*\/(\d+s\..+)/.exec(file.thumb)[1].replace('s', '');
			var fileformat = fileinfo[1];
			var isPicture = fileformat == 'jpg' || fileformat == 'png' || fileformat == 'gif' || fileformat == 'bmp';
			//todo: запилить дектор форматов
			var divFileHtml = '<div id="file_' + file.display_id + '_' + file.file_id + '" class="file">';
			if(isPicture) {
				if(!isOnlyOneFile)
					filesHtml += divFileHtml;
				filesHtml += divFileinfoHtml +
				             'Файл: <a href="' + file.src + '" target="blank">' + filename + '</a>' +
				             '</br>' +
				             '<em>' + fileTypeDescription(fileformat) + ', ' + fileSize(file.size) + ' ' + file.metadata.width + 'x' + file.metadata.height + '</em>';
				if(isOnlyOneFile)
					filesHtml += ' - Нажмите на картинку для увеличения';
				filesHtml += '</br>' +
				             '<a class="edit_ icon" href="/utils/image/edit/' + file.file_id + '/' + postId + '"><img src="/images/blank.png" title="edit" alt="edit" /></a> ' +
				             '<a class="search_google icon" onclick="window.open(this.href,\'_blank\');return false;" href="http://www.google.com/searchbyimage?image_url=http://' + location.host + '/' + file.src + '"><img src="/images/blank.png" title="Find source with google" alt="Find source with google" /></a> ' +
				             '<a class="search_iqdb icon" onclick="window.open(this.href,\'_blank\');return false;"  href="http://iqdb.org/?url=http://' + location.host + '/' + file.src + '"><img src="/images/blank.png" title="Find source with iqdb" alt="Find source with iqdb" /></a>' +
				             '</div>';
				if(isOnlyOneFile)
					filesHtml += divFileHtml;
				filesHtml += '<a href="/' + file.src + '" target="_blank"><img src="/' + file.thumb + '" width="' + file.thimb_width + '" height="' + file.thumb_height + '" class="thumb" alt="' + fileinfo[2] + '" onclick="expand_image(event, ' + file.metadata.width + ', ' + file.metadata.height + ')" /></a>' +
				             '</div>';
			}
			else {
				if(!isOnlyOneFile)
					filesHtml += divFileHtml;
				filesHtml += divFileinfoHtml +
				             'Файл: <a href="' + file.src + '" target="blank">' + filename + '</a>' +
				             '</br>' +
				             '<em>' + fileformat + ', ' + file.size + ' B' + '</em>' +
				             ' - Нажмите на картинку, чтобы скачать файл' +
				             '</br>' +
				             '</div>';
				if(isOnlyOneFile)
					filesHtml += divFileHtml;
				filesHtml += '<a href="/' + file.src + '" target="_blank"><img src="/' + file.thumb + '" width="' + file.thimb_width + '" height="' + file.thumb_height + '" class="thumb" alt="' + fileinfo[2] + '" onclick="open_url(\'/utils/' + fileformat + '/' + file.file_id + '/' + postId + '\', \'_blank\')"' + ' /></a>' +
				             '</div>';
			}
			
		}
		
		if(jsonFiles.length > 1)
			filesHtml += '<br style="clear: both">';
		
		return filesHtml;
	}
	function createPostHtml(postJson, board, threadId) {
		var postId = postJson.display_id;
		postHtml = '<table id="post_' + postId + '" class="replypost post"><tbody><tr>' +
		           '<td class="doubledash">&gt;&gt;</td>' +
				   '<td class="reply" id="reply' + postId + '">' +
				   '<a name="i' + postId + '"></a>' +
				   '<label>' +
				   '<a class="delete icon"><input type="checkbox" name="' + postId + '" value="' + postJson.post_id + '" class="delete_checkbox" id="delbox_' + postId + '" /><img src="/images/blank.png" title="Mark to delete" alt="' + localText.postDeleteButton + '" /></a>' +
				   (postJson.subject ? '<span class="replytitle">' + postJson.subject + ' </span>' : '') +
				   (postJson.name ? '<span class="postername">' + postJson.name + ' </span>' : '') +
				   jsonDateToDobrochanStyle(postJson.date) +
				   ' </label>' +
				   '<span class="reflink">' +
				   '<a href="/' + board + '/res/' + threadId + '.xhtml#i' + postId + '" onclick="Highlight(0, ' + postId + ')">' +
				   'No.' + postId + ' </a></span>' +
				   '<span class="cpanel">' +
				   '<a class="reply_ icon" onclick="GetReplyForm(event, \'' + board + '\', ' + threadId + ', ' + postId + ')"><img src="/images/blank-double.png" style="vertical-align:sub" title="' + localText.postAnswerButton + '" alt="' + localText.postAnswerButton + '" /></a>' +
				   '</span>' +
				   '<br />';
		if(postJson.files)
			postHtml += createFilesHtml(postJson.files, postId, (board == 'b' ? false : true));
		
		postHtml += '<div class="postbody">' +
				    postJson.message_html +
				    '</div>' +
				    '<div class="abbrev">' +
				    '</div>' +
				    '</td></tr></tbody></table>';
					
		return postHtml;
	}
	function loadPost(href, onLoad) {
		//href = "/<boardname>/res/<threadId>.xhtml#i<postId>"
		var result = reqexpPostReference.exec(href);
		loadPost(result[1], result[2], result[3], onLoad);
	}
	function loadPost(board, threadId, postId, onLoad) {
		var url = '/api/post/' + board + '/' + postId + '.json?new_format&message_html';
		var postHtml;
		$.getJSON(url, function(json) {
			if(json.result) {
				var postJson = json.result;
				postHtml = createPostHtml(postJson, board, threadId);
			}
		}).done(function() {
			onLoad(postHtml);
		});
	}
	
	function loadNewPosts(board, threadId) {
		var lastPostId = $('div.thread > .post').last().attr('id').substr(5); //post_xxxxxx
		var url = '/api/thread/' + board + '/' + threadId + '/new.json?last_post=' + lastPostId + '&new_format&message_html';
		$('#afsbuttonupdatethread').html('Updating...');
		$.getJSON(url, function(json) {
			if(json.result) {
				var threadJson = json.result;
				var thread = $('div.thread');
				if(threadJson.posts) {
					for(var i = 0; i < threadJson.posts.length; i++) {
						var postHtml = createPostHtml(threadJson.posts[i], board, threadId);
						thread.append(postHtml);
					}
					
					if(settings.threadPostCount)
						$('.afsthreadpostcount').html(json.result.posts_count);
					if(settings.refLinks)
						updateRefLinks();
				}
			}
			else {
				alert('ERROR: ' + json.error.code + ': ' + json.error.message);
			}
			$('#afsbuttonupdatethread').html('Update thread');
		});
	};
	
////////////////////////////////////////////////////////////////////////////////

	/* refLinks = {
	*    postid1 : [ref1, ref2, ...],
	*    ...
	*  };
	*/
	var refLinks = new Object();
	
	function searchRefLinksInPost(post) {
		var refLinkOnThis = createRefLink($(post).find('span.reflink > a').prop('href'));
		$(post).find('div.message > a').each(function() {
			var result = regexpPostReference.exec(this.href);
			if(result) {
				var postId = result[3];
				if(refLinks[postId] == undefined)
					refLinks[postId] = new Array();
				if(refLinks[postId].indexOf(refLinkOnThis) == -1)
					refLinks[postId].push(refLinkOnThis);
			};
		});
	}
	
	function searchRefLinks() {
		$('.post').each(function() {
			searchRefLinksInPost(this);
		});
	}
	
	function createRefLinksString(refLinksArray) {
		var str = 'Ответы: ';
		for(var i in refLinksArray)
			str += refLinksArray[i] + ' ';
		return str;
	}
	
	function addRefLinks() {
		$('.post').each(function() {
			var postId = this.id.substr(5); //id==post_1234
			var postRefLinks = refLinks[postId];
			if(postRefLinks) {
				var postBody = $(this).find('div.postbody');
				var postBodyRefLinks = $(postBody).children('div.reflinks')[0];
				if(!postBodyRefLinks) {
					postBodyRefLinks = document.createElement('div');
					postBodyRefLinks.className = 'reflinks';
					postBody.append(postBodyRefLinks);
				}
				$(postBodyRefLinks).html('<br><small>' + createRefLinksString(postRefLinks) + '</small>');
			}
		});
	}
	
	function updateRefLinks() {
		searchRefLinks();
		addRefLinks();
	}

////////////////////////////////////////////////////////////////////////////////

	var boards = ['b', 'u', 'rf', 'dt', 'vg', 'r', 'cr', 'lor', 'mu', 'oe', 's', 'w', 'hr',
				  'a', 'ma', 'sw', 'hau', 'azu',
				  'tv', 'cp', 'gf', 'bo', 'di', 'vn', 've', 'wh', 'fur', 'to', 'bg', 'wn', 'slow', 'mad',
				  'd', 'news'];

	function sidePanelDefaultSettings() {
		var defSettings = {'boards': {}, 'advanced': {}};
		
		defSettings.advanced['bookmarks'] = {'bookmark': '/bookmarks', 'top': true};
		$.each(boards, function(index, value) {
			defSettings.boards[value] = {'show': true, 'bold': false};
		});
		
		defSettings.side = 'right';
		
		return defSettings;
	}
	
	function createSidePanelHtml() {
		var boardList = '';
		var advListTop = '';
		var advListDown = '';
		$.each(settings.sidePanelSettings.advanced, function(name, value) {
			if(value.bookmark) {
				var bmHtml = '<tr><td colspan="2"><a href="' + value.bookmark + '">' + name + '</a></td></tr>';
				if(value.top)
					advListTop += bmHtml;
				else
					advListDown += bmHtml;
			}
			else if(value.thread) {
				//soon
			}
		});
		$.each(settings.sidePanelSettings.boards, function(name, value) {
			if(value.show) {
				style = value.bold ? 'style="font-weight: bold;" ' : '';
				boardList += '<tr><td><a href="/' + name + '/index.xhtml" ' + style + '>' + '/' + name + '/' + '</a></td>' +
				             '<td><a href="/' + name + '/index.xhtml" ' + style + '>[' + '<span id="postcount_' + name + '"></span>' + ']</a></td></tr>';
			}
		});
		
		var html = '<div id="sidepanel" class="replypost" style="position:fixed; top:0;">' +
		           '<table>';
		html += advListTop + boardList + advListDown;
		html += '</table></div>';
		
		return html;	
	}

////////////////////////////////////////////////////////////////////////////////

	if(localStorage.afsSettings) {
		settings = JSON.parse(localStorage.afsSettings);
	}
	
	function updatePageInfo() {
		var reBoard = /\/(\w+)\/index\.xhtml/;
		var reThread = /\/(\w+)\/res\/(\d+)\.xhtml/;
		
		var result = reBoard.exec(location.pathname);
		if(result) {
			pageInfo.board = result[1];
			return;
		}
		
		result = reThread.exec(location.pathname);
		if(result) {
			pageInfo.board = result[1];
			pageInfo.thread = result[2];
			return;
		}
	}
	updatePageInfo();

	
	if(settings.refLinks) {
		updateRefLinks();
	}
	
	if(settings.threadPostCount && pageInfo.thread) {
		
		var threadInfoHtml = '<div id="afsthreadinfo"><table><tr>' +
							 '<td class="abbrev"><span class="afsthreadpostcount"></span> posts are ommited</td>' +
							 '</tr></table></div>';
		$('.oppost .message').append(threadInfoHtml);
	}
	
	if(settings.updateThread && pageInfo.thread) {
		unsafeWindow.loadNewPosts = loadNewPosts;
		var updateButtonHtml = '';
		if(settings.threadPostCount)
			updateButtonHtml += '<span class="abbrev"><span class="afsthreadpostcount"></span> posts are ommited</span><br />';
		updateButtonHtml += '<div id="afsupdatethread">' +
							'<table>' +
							'<tr><td class="doubledash" style="visibility:hidden;">&gt;&gt;</td>' +
							'<td>';
		updateButtonHtml += '<a id="afsbuttonupdatethread" href="" ' + 
							'onclick="loadNewPosts(\'' + pageInfo.board + '\', \'' + pageInfo.thread + '\'); return false;">' + 'Update thread' +
							'</a></td></tr>' +
							'</table></div>';
		$('hr').last().after(updateButtonHtml);
	}
	
	if(settings.threadPostCount && pageInfo.thread) {
		$.getJSON('/api/thread/' + pageInfo.board + '/' + pageInfo.thread + '.json?new_format', function(json) {
			if(json.result) {
				$('.afsthreadpostcount').html(json.result.posts_count);
			}
		});
	}
	
	if(settings.sidePanel) {
		if(!settings.sidePanelSettings)
			settings.sidePanelSettings = sidePanelDefaultSettings();
		$(document.body).append(createSidePanelHtml());
		sidePanel = $('#sidepanel');
		if(settings.sidePanelSettings.side == 'right')
			sidePanel.css('right', '0');
		else if(settings.sidePanelSettings.side == 'left')
			sidePanel.css('left', '0');
		else
			alert('Side panel incorrect settings: side=' + settings.sidePanelSettings.side);
	}
	
});

















//