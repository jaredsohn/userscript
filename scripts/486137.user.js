// ==UserScript==
// @name	GK parent comment (2)
// @namespace	GK
// @description	Adds links to parent commentary to GK comments, and sets parent comment as link tooltip.
// @include	http://govnokod.ru/*
// @include	http://www.govnokod.ru/*
// @version	1.0.0
// @grant	unsafeWindow
// @updateURL	http://userscripts.org/scripts/source/486137.meta.js
// @downloadURL	http://userscripts.org/scripts/source/486137.user.js
// ==/UserScript==

/*
  This script is based on "GK parent comment" by Vindicar:
  http://userscripts.org/scripts/show/172756
*/

(function(){
$ = unsafeWindow.jQuery;

//dirty, DIRTY hack to wait for certain element to appear. -_- 
//But I have no idea how to do it right.
function waitForSelector(selector, context, mustexist, callback) {
	if (($(selector, context).length>0) == mustexist)
		callback();
	else
		setTimeout(function(){waitForSelector(selector, context, mustexist, callback)}, 50);
	}

//short function for adding custom CSS rules. Why use Greasemonkey specific GM_setStyle() just for that?
function addCSS(rule) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	if (typeof styleElement.styleSheet !== 'undefined')
		styleElement.styleSheet.cssText = rule;
	else
		styleElement.appendChild(document.createTextNode(rule));
	document.getElementsByTagName("head")[0].appendChild(styleElement);
	}

addCSS([
	'.comment-parent-link {margin-left:10px;font-size:10pt}',
	'.comment-parent-block {background-color:white;position:absolute;border:1px solid #888;}'
	].join('\n'));

var PARENT = '<a class="comment-link comment-parent-link" href="">↑</a>';
var TIMEOUT = 400;

// родительский комментарий/пост для данного элемента
function parent(element){
	if(!element) return;
	var $element = $(element);
	var parent = $element.parents('li.hcomment:first')
	                     .find('.entry-comment-wrapper:first');
	if(!parent.length) parent = $element.parents('li.hentry:first');
	return parent;
}

var parents = {}, timeouts = {}, id = 0;

function scheduleRemoval(id) {
	if(id in timeouts || !(id in parents) ) return;
	timeouts[id] = setTimeout(function(){
		var element = parents[id];
		element.remove();
		delete parents[id];
		delete timeouts[id];
	}, TIMEOUT);
}

function cancelRemoval(id) {
	if(!(id in timeouts)) return;
	clearTimeout(timeouts[id]);
	delete timeouts[id];
}

function createPreview(event) {
	var $comment = $(event.target).closest('.hcomment');
	var comment = $comment.get(0);
	if(!comment.id) comment.id = 'hcomment-' + (++id);

	var oldComm = parents[comment.id];
	if(oldComm) return void cancelRemoval(oldComm.id);
	
	var par = parent(comment);
	if(!par.length) return;
	
	var offset = $(event.target).offset(),
	    shift = $comment.closest('.hentry').offset();
	
	var comm = par.clone(true)
	  .addClass('comment-parent-block')
	  .css('left', ($comment.offset().left - shift.left) + 'px')
	  .css('top', (offset.top - shift.top + 15) + 'px')
	  .width(par.width()).height(par.height())
	  .mouseover(function(event){ cancelRemoval(comment.id); })
	  .mouseout(function(event){ scheduleRemoval(comment.id); });
	
	$comment.parents('.hcomment:first').append(comm);
	parents[comment.id] = comm;
	
}

function removePreview(event) {
	var comment = $(event.target).closest('.hcomment').get(0);
	scheduleRemoval(comment.id);
}

function hijackComments() {
	var oldLoadComments = unsafeWindow.comments['load'];

	function newLoadComments(aElemTrigger) {
		var $parent = $(aElemTrigger).closest('.entry-comments');
		oldLoadComments.call(this,aElemTrigger);
		waitForSelector('.hcomment', $parent, true, function(){
			setParentLinks($parent);
			});
		}

	unsafeWindow.comments['load'] = newLoadComments;
	}

function highlightComment(e) {
	if (! $(e.target).is('a.comment-parent-link')) return;
	var match = $(e.target).attr('href').match(/\#comment(\d+)$/);
	if (match) {
		$('body').find('.highlight').removeClass('highlight');
		$('#comment-'+match[1]).addClass('highlight');
		}
	}
	
function setParentLinks($context) {
	$context.find('.hcomment').each(function(i,e){
		var $this = $(this);
		var $parent = $this.parents('.hcomment:eq(0)');
		if ($parent.length) {
			var $parentlink = $(PARENT);
			$parentlink.attr('href', '#'+$parent.find('a.comment-link:eq(0)').attr('name'));
			$parentlink.mouseover(createPreview);
			$parentlink.mouseout(removePreview);
			$this.find('a.comment-link:eq(0)').after($parentlink);
		}
	});
}

setParentLinks($('body'));
hijackComments();
$('body').click(highlightComment);
})();