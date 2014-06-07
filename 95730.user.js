// ==UserScript==
// @name           GT full comments
// @namespace      Psi
// @description    Loads full comment list. 
// @include        http://www.gametrailers.com/video/*
// @include        http://gametrailers.com/video/*
// ==/UserScript==

var uw = (this.unsafeWindow) ? this.unsafeWindow : window;

function mainFunc() {

	window.show_all_comments = function(type, id, count) {
		document.getElementById('comment_block').innerHTML = '';
		document.getElementById('comments_pages').innerHTML = '';
		document.getElementById('comments_pages_bar').innerHTML = '';
		document.getElementById('comment_head_text').innerHTML = 'Loading all comments...';
		
		randNum=parseInt(Math.random()*99999999);  // cache buster
		
		$j.ajax({
			type: "GET",
			url: '/ajax/player_comments_ajaxfuncs_read.php',
			data: 'do=show_all_comments&type='+type+'&id='+id+'&count='+count,// + logged + thumbRatingNocache,
			//dataType: "html",
			error: function(){
				update_comments('');
				processCommentsFromAllPages();	
			},
			success: function(xml){
				var searchStr = "\'";
				var replaceStr = "'";
				xml = xml.replace(/\\\'/g, replaceStr);			
				update_comments(xml, type);
			}
		});
		
		//ajaxGetCallback('/ajax/player_comments_ajaxfuncs_read.php', 'update_comments(\'', '\', \''+type+'\');', 'do=show_all_comments&type='+type+'&id='+id+'&count='+count, 'GET');
		if (!document.getElementById('affected_comment')) {
			document.getElementById('new_comment_container').innerHTML = '';
		}
	}

	window.comments_post_load_page = function(new_body, type, page, isEscape) {
		//alert('post load bleh');
		var curr_page = comments_current_page;
		if (isEscape) {
			new_body = unescape(new_body);
		}
		if (!document.getElementById(type)) {
			setTimeout('comments_post_load_page(\''+escape(new_body)+'\', \''+type+'\', '+page+', 1);', 100);
			return;
		}
		if (type != comments_current_type) {
			curr_page = eval(type+'_page');
		}
		if (page == curr_page) {
			document.getElementById(type).innerHTML = new_body;
		} else if (page == curr_page - 1) {
			document.getElementById(type+'_prev').innerHTML = new_body;
		} else if (page == curr_page + 1) {
			document.getElementById(type+'_next').innerHTML = new_body;
		}
		
		showAllCommentBarElements();
	}
	
	window.update_comments = function(new_text, type) {
		document.getElementById('comment_block').innerHTML = new_text;
		document.getElementById('comment_head_text').innerHTML = '<a href="javascript: comments_current_page = 1;comments_load_page(\''+type+'\', 1);">Show pages</a>';
		document.getElementById('comments_pages').innerHTML = '';
		document.getElementById('comments_pages_bar').innerHTML = '';
		
		sortOrderReverse = false;
		sortByRating = false;
		commonCommentBarElements();
	}

	show_all_comments('movies', uw.mov_id , 1);
}

function processCommentsFromAllPages(){
	for (var i = 1; i < 100; i++){
		customCommentsLoadPage(i);
	}
}

/** Loading comments from a given page **/
function customCommentsLoadPage(page) {
	$j.ajax({
		type: "GET",
		url: '/ajax/player_comments_ajaxfuncs_read.php',
		data: 'do=get_list_page&type=movies&id=' + uw.mov_id + '&page=' + page + '&count=10',// + logged + thumbRatingNocache,
		dataType: "html",
		success: function(xml){
			var searchStr = "\'";
			var replaceStr = "'";
			xml = xml.replace(/\\\'/g, replaceStr);
			var commentBlock = $j('#comment_block', xml);
			var commentContainers = $j('.comment_container.clearfix', commentBlock);
			$j.each(commentContainers, function(indx, item){
				$j('#comment_block').append(item);
			});
		}
	});
}

/**	Process recieved comments **/
function customCommentsLoadPageRecieve(newBody, type, page, isEscape){
	//window.alert(newBody);
	
	$j('#comment_block').append( $j('.comment_container', newBody) );
}

/** Loading comments from old server function **/
function showAllCommentBarElements(){
	$j('.comment_head_text_left a').replaceWith('<a href="javascript: show_all_comments(\'movies\', ' + uw.mov_id + ',' + 1 + ');">Show all</a>');
}

function commonCommentBarElements(){
	var commentHeadText = $j('.comment_head_text_left');
	
	var filterStr = '';
	if (filterUsername){
		filterStr = 'Show all';
	}
	
	var headStr = '<span id="sortingCommentsBar"></span>';
	
	commentHeadText.append(headStr);
	commonCommentBarElementsUpdate();
}

function commonCommentBarElementsUpdate(){
	var sortingCommentsBar = $j('#sortingCommentsBar');
	sortingCommentsBar[0].innerHTML = '';

	var ratingLabel = 'Rating';
	var timeLabel = 'Time';
	
	if (sortByRating){
		ratingLabel = '<u>' + ratingLabel + '</u>';
	} else {
		timeLabel = '<u>' + timeLabel + '</u>';
	}	
	
	var ratingStr = '<a href="javascript: sortComments(true);">' + ratingLabel + '</a>';
	var timeStr =  '<a href="javascript: sortComments(false);">' + timeLabel + '</a>';

	var arrowURL = '<img src="http://www.google.com/help/hc/images/sites_icon_arrow_down_small.gif"/>';
	if (sortOrderReverse){
		arrowURL = '<img src="http://www.google.com/help/hc/images/sites_icon_arrow_up_small.gif"/>';
	}
	
	var filterStr = ' || Filter by: ';
	
	if (filterUsername){
		filterStr += ' <a href="javascript: revealAllComments();">Show all</a>';
	} else {
		filterStr += ' <a href="javascript: showUserRelatedComments();">My username</a>';
	}	
	
	var resultStr = ' || Sort by: ' + ratingStr + ' ' + arrowURL + ' ' + timeStr + filterStr;
	sortingCommentsBar.append(resultStr);
}

var sortOrderReverse = false;
var sortByRating = false;

function sortComments( rating){

	if (rating && rating != sortByRating){
		sortOrderReverse = false;
	}

	var mylist = $j('#comment_block');
	var listitems = mylist.children('.comment_container').get();
	
	listitems.sort(function(a, b) {
		if (rating){
			var compA = parseInt($j('.comment_thumbs_container', a).text().split('[')[1].split(']')[0]);
			var compB = parseInt($j('.comment_thumbs_container', b).text().split('[')[1].split(']')[0]);
		} else {
			var compA = parseInt(a.id.split('comment_')[1]);
			var compB = parseInt(b.id.split('comment_')[1]);
		}
		
		return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
	});

	
	if (sortOrderReverse){
		listitems.reverse();
	}
	sortOrderReverse = !sortOrderReverse;
	
	mylist.empty();
	mylist.append(listitems);

	sortByRating = rating;
	commonCommentBarElementsUpdate();
}

var filterUsername = false;

function revealAllComments(){
	var mylist = $j('#comment_block');
	var listitems = mylist.children('.comment_container').get();

	$j.each(listitems, function(idx, itm) {
		itm.style.display = '';
	});
	
	filterUsername = false;
	commonCommentBarElementsUpdate();
}

/** Filter comments by logged user **/
function showUserRelatedComments(){
	var userName = $j('.userinfo_text_title a')[0].innerHTML.split(' ')[1];
	
	var mylist = $j('#comment_block');
	var listitems = mylist.children('.comment_container').get();
	
	$j.each(listitems, function(idx, itm) {
		var commentName = $j('.comment_username a', itm)[0].innerHTML.split('	')[9];
		var commentText = $j('.comment_text', itm)[0].innerHTML;
	
		var indexof = commentText.indexOf(userName);
	
		if ( commentName != userName && indexof < 0){
			itm.style.display = 'none';
		}
	});
	
	filterUsername = true;
	commonCommentBarElementsUpdate();
}

/** Entry point **/
window.addEventListener("load", mainFunc, false);