// ==UserScript==
// @name           MySpace - Comments on Homepage
// @namespace      RunningBlind
// @description    Displays last few comments on your MySpace homepage.
// @include        http://home.myspace.com/*fuseaction=user*
// @exclude        *fuseaction=user.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version        1.0.1
// ==/UserScript==

/* User-defined variables */
var prefs = {
	position: 'after bulletins',
	amount: 3,
	refreshRate: 60
};

/* End user-defined variables */

function GM_log(arg) {
	unsafeWindow.console.log(arg);
}

function getComments(fn) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://comment.myspace.com/index.cfm?fuseaction=user.viewComments&friendID=' + userId,
		headers: {'User-agent': navigator.userAgent},
		onload: function(responseDetails) {
                        
			var table = responseDetails.responseText.match(/<table.*?class="comments[\s\S]*?<\/table>/m)[0];
			
			$('#gm_comments_dump').empty();
			$('#gm_comments_dump').append(table);
			
			var comments = [];
			$('#gm_comments_dump .comments tbody tr:even').each(function() {
				comments.push({
					user: {
						img: $(this).find('.name a img').attr('src'),
						name: $(this).find('.name .pilDisplayName').text(),
						url: $(this).find('.name span a').attr('href').match(/\/([^\/]*?)$/)[1]
					},
					time: new Date($(this).find('.comment h4').text()),
					content: $(this).find('.comment').html().replace(/\s+<h4>.*?<\/h4>/, '')
				});
			});
			//GM_log(comments);
			fn(comments);
		}
	});
}

// images
iComment = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAPCAYAAAAGRPQs' +
	'AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcG' +
	'AAAAZlJREFUOMudkz1rVEEYhc87d40RY3BXBdGwgilEF%2FwVamOnVVqLgGJpo3%2FAwsZKtD' +
	'AgYkhpSBcwCoKFWMkqKZKsMQp%2BLGtEvHdzvTOPxd27mhCyuzkwMAwvD%2BfMmZEkAREwz2D' +
	'KgA3gF3BDkkrKdU%2FS%2Bef1b5p5taZeMpOcWVRyFl29MD50emz0DpBax5l%2FvdRyfwKqVS' +
	'saRO8%2BtnR4ZEinjh344YrDqYWGatWKUi%2F9bNPXSr1Uq1Z0f35Z%2F8eUmZR6KW5nfbuKv' +
	'RRLcs42wYIzc5KUZEGDynKWL2J650zeDw6SJJfTfOHMW2ezkdlunYXCWYg6ufeW2LWz4mm0Pr' +
	'eS8odmrOOHRrtDSRa0nuwcPaSxxsrDOnFk%2F2oBuyhpdq0ZR7efLsqH3N3Ny2c3FXJ3tp63F' +
	'pmG90QqOdPkuZMaPzoSJE10B4FLne8BwIv6VyYfvKHRTGk0Ux4%2BW9n6nRLgO%2FAJuLKtba' +
	'AMzAHcmn7L%2By9tpha6oMfAQcD1faHAPmB5%2FXfKk5erBehRz1Z3AJ6RdP1f%2FXatF%2Bw' +
	'vfuo5nSuflJkAAAAASUVORK5CYII%3D';

Date.prototype.getTwelveHourFormat = function() {
	var half = (this.getHours() >= 12) ? 'PM' : 'AM';
	return ((half=='AM') ? this.getHours() : this.getHours() + 12) + ':' + this.getMinutes() + ' ' + half;
}

Date.prototype.relative = function(now) {
	var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
	
	var relMinutes = (this-now) / (1000*60);
	var relDays = (this-midnight) / (1000*60*60*24);
	
	if (relMinutes > -60) return Math.floor(relMinutes*-1)+' minute'+((Math.floor(relMinutes*-1) > 1)?'s':'')+' ago';

	else if (relMinutes > -720) return Math.floor(relMinutes/-60)+' hour'+((Math.floor(relMinutes*-1/60) > 1)?'s':'')+' ago';
	
	else {
		if (relDays >= -1) {
			if (relMinutes > -1440) return 'today at '+this.getTwelveHourFormat();
			else return 'yesterday';
		}
		else if (relDays > -7) {
			return Math.floor(relDays*-1)+' day'+((Math.floor(relDays*-1) > 0)?'s':'')+' ago';
		}
		else if (relDays > -42) {
			return Math.floor(relDays/-7)+' week'+((Math.floor(relDays/-7) > 0)?'s':'')+' ago';
		}
		else if (relDays > -182) {
			return months[this.getMonth()]+' '+this.getDate();
		} else return months[this.getMonth()]+' '+this.getDate()+', '+this.getFullYear();
		
	}
	
	return this.toString();
}
	
function refreshComments() {
	getComments(function(comments) {
		//GM_log(comments);
		
		if ($('#preloader').length) {
			$('#preloader').remove();
			$('#comments .middle').append('<ul />');
			//$('#comments .middle').append('<a href="#">View More</a>');
		} else {$('#comments .middle ul').empty()}

		var now = new Date();
		comments.forEach(function(comment, key) {
			$('#comments .middle ul').append('<li class="clearfix">\
			<a class="display-image" href="http://www.myspace.com/'+comment.user.url+'">\
				<img src="'+comment.user.img+'" title="'+comment.user.name+'" alt="'+comment.user.name+'" />\
			</a>\
			<div class="comment-info"><a href="http://www.myspace.com/'+comment.user.url+'">'+comment.user.name+'</a><span>'+comment.time.relative(now)+'</span></div>\
			<p>'+comment.content+'</p>\
			<a href="http://comment.myspace.com/index.cfm?fuseaction=user.viewProfile_commentForm&friendID='+comment.user.id+'">Reply</a>\
			</li>');
		});
		
		$('#comments .middle li:gt('+(prefs.amount-1)+')').hide();
	});
}

$(document).ready(function() {

        userId = unsafeWindow.MySpaceClientContext.UserId;
	cultureInfo = eval("(" + unsafeWindow.__cultureInfo + ")");
	months = cultureInfo.dateTimeFormat.MonthNames;
        
	$(document.body).append('<div id="gm_comments_dump"></div>');
        
	GM_addStyle('\
	#comments-icon {display: block; float: left; height: 21px;\
	margin: 0pt; padding: 0pt; vertical-align: middle; width: 24px;\
	background: transparent url(' + iComment + ') no-repeat scroll left top;}\
	#comments ul {overflow: auto; padding: 3px; max-height: 450px}\
	#comments li {margin: 0 0 1em 70px;}\
	.display-image {margin-left: -70px; float: left;}\
	.display-image img {width: 60px;}\
	.comment-info {text-align: right}\
	.comment-info a {float: left}\
	.comment-info span {color: #999}\
	#comments li > a:last-child {float: right}\
	#gm_comments_dump {display: none;}\
	#preloader {text-align: center; padding: 5px;}\
	');
	
	container = '<div id="comments" class="module"><h4 class=\"top\"><div><div>\
		<span class=\"title\"><span id=\"comments-icon\"></span>Comments</span></span>\
		<div style=\"padding: 0pt; clear: both;\"></div>\
		</div></div></h4>\
		<div class=\"middle\"><div id="preloader">\
		<img src=\"http://x.myspace.com/modules/common/static/img/loadercircles.gif\" /><br /><br />:: Loading Comments ::</div></div>\
		<div class=\"bottom\"><div><div>&nbsp;</div></div></div></div>';
		
	position = prefs.position.split(' ');
	if (position[0] == 'before') {
		$('#' + position[1]).before(container);
	}
	else {
		$('#' + position[1]).after(container);
	}
	
	refreshComments();
	
	window.setInterval(function() {refreshComments();}, prefs.refreshRate*1000);
});