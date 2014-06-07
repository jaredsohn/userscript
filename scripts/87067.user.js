// ==UserScript==
// @name           habrahabr.ru - collapse comments
// @namespace      habrahabr.ru
// @include        http://habrahabr.ru/*
// @include        http://*.habrahabr.ru/*
// ==/UserScript==

if (unsafeWindow.tm.sidebar.bar) {

	var buttonImage = 'data:image/gif;base64,R0lGODlhHAB0AOYAAIWFhfT5/eLu+dzr+P3xvNfo9/z9/vP4/ejy+u71+/777Z+fn////v/++P3ywv3zxP31zP731f743/30yv766P/++/743P720/765P799Pj7/v788fj4+Pj7/f3+//788vX5/fH09/777v7+///99Pv8/vn8/vb6/f788PX29/fvzv/++eju9Pfz3uLs8//99oyMi////fDt4fj39Pf16//994yMjOrt8O3x9vfx1/f27ff05//++v/+/FxcXP///5mZmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAcAHQAAAf/gECCg4SFhoeIiYqLjI2Oj5CRkpOMCz6XmJmZC4w+AZ+goaE+nSAFp6ipqKSLPicDsLGysayKPh0Cubq7urWJPiYIwsPEw76IPiUJy8zNzMeHPgYH1NXW1dCGPh4aGjYA4OEAId3ZhT4jBurr7OvmhD4/8vP09O+D8fX68veC+fv1+gH5B3CeQIIFfwi0pKnhJU6UIkqcSLGixYsYM2rcyLEjIYYONUG0paCkyZMnD4ogwLKly5YHUTyYSbMmzYMfIOjcyXPnQRIRggodKvRgDQlIkypNenAFhadQo0I9WGHDBhjiwtGwejBGg69gw4I9+IOB2bNoz5JNaLAT27at4t7ycyt3YciGIz3q3cu3r9+/gANvBHn3YSdRiEEdNKWqcYGDr2ZJHnAQF6/LAg4GI+YCQDEEB5U1YwHAWYKD06zhAHDtwEFuGm5kBUdOw8F07FIAaGdgLT0OAPT5ngdcON23wxMmL2i3MKa8gqNLn069uvXrhAtDjyZX4XG2ywGG37e8eMBODCqoVz8DwPr1B3tkmD9fBwD69A/yKCljNoAdJR3UAAYEEtgCAAUWeNALFjTYYA4AOOjgTxdUWKEKAFhoIU4TdOjhhx7G5MCIJJZIokovpchSc875sN11MMb4SCAAOw==';
	var expandImage = 'data:image/gif;base64,R0lGODlhDQA0ANUAAPT5/f787/3yvtTm9s/Pzv788fX6/c7Pz4yMjP/++//++KanqKmopf7+/////fv7+/j7/v787v/99fb6/Z+hofr8/qGhnvj4+Pz+/rq6uouMjK2zt+Ls84yMi/T294uLjN3q9ffx17m2pvL4/Onv9YyMivj38vnxzffz4P777OHh4f310ODu+f765vv9/v/++ejy+v743O/2/IWFhdnp9/30xs/Pz8zMzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAANADQAAAb+QNVtSCzeVAeAcskE3JK0qHR6s01Y2Ky2CoF5v+BqRUYum6sYw2LGZlMMhmrDRa/bq7i8fo/D8/l+f3qBgn1CRkYqh4hEKgQBkJGSATcEETWYmZqVBSuen6CVEjGkpaZVCi2qq6xVCQUMbWwWBQVVDi+5uruEgr1/v4A2hYOLjEfGjCrDxH3MxIQPGcJ7FwjCc3QeCHYuaGqyM29xNmNkJBpmMlxfHB9gMFVXWCAbWixPAFP7NE8jAwADCjxyrFEyRMuaOVMYbdoeQtaE4cplAsGuF65ghaNly0YqVSg6sGohqlSIEqZicPp0QgSoFZUuaZpZKYWAmzhzEix4JAgAOw==';
	var style = document.createElement('style');
	style.innerHTML = 
		'#collapse-comments-button a.button {\
			display: block;\
			height: 29px;\
			width: 28px;\
			background: url(' + buttonImage + ') no-repeat;\
			background-position: left top;\
		}\
		#collapse-comments-button a.button:hover {\
			background-position: left -29px;\
		}\
		#collapse-comments-button a.button.on {\
			background-position: left -58px;\
		}\
		#collapse-comments-button a.button.on:hover {\
			background-position: left -87px;\
		}\
		a.collapse-comments-expander {\
			background: url(' + expandImage + ') no-repeat;\
			float:left;\
			height:13px;\
			margin-left:-20px;\
			margin-top: 7px;\
			text-align:center;\
			width:13px;\
		}\
		a.collapse-comments-expander:hover {\
			background-position: left -13px;\
		}\
		a.collapse-comments-expander.on {\
			background-position: left -26px;\
		}\
		a.collapse-comments-expander.on:hover {\
			background-position: left -39px;\
		}';
	document.body.appendChild(style);
	
	
	var $ = unsafeWindow.$;
	var tm = unsafeWindow.tm;
	
	Function.prototype.bind = function(object) {
		var f = this;
		return function(){f.apply(object,arguments);};
	};
		
	tm.sidebar.buttons.collapseCommentsButton = {

		div: null,
		buttonLink: null,
		state: 'expanded',
		
		initialize: function() {

			this.buttonLink = $(document.createElement('a'));
			this.buttonLink.className = 'button';
			this.buttonLink.href = '#';
			this.buttonLink.title = 'Свернуть корневые комментарии';
			this.buttonLink.addEventListener('click', (function(ev){
				if (this.state == 'expanded')
					this.collapse();
				else
					this.expand();
				ev.stopPropagation();
				ev.preventDefault(); 
			}).bind(this), false);

			this.div = document.createElement('div');
			this.div.id = 'collapse-comments-button';


			this.div.appendChild(this.buttonLink);
			
			this.getRootComments().forEach(this.ensureExpander.bind(this));
			
			// TODO: ***
			unsafeWindow.commentForm && unsafeWindow.commentForm.addEvent && unsafeWindow.commentForm.addEvent('tm:loading-finished', (function(){
				this.getRootComments().forEach(this.ensureExpander.bind(this));
			}).bind(this));

			// TODO: ***
			unsafeWindow.commentForm && unsafeWindow.commentForm.addEvent && unsafeWindow.commentForm.addEvent('tm:go-to-comment', (function(comment){
				var thread = $(this.getRootCommentOf(comment));
				if (thread.hasClass('collapsed'))
					this.expandThread(thread);
			}).bind(this));

			if (tm.sidebar.bar.addButtonBefore)
				tm.sidebar.bar.addButtonBefore(this, tm.sidebar.buttons.refreshButton);
			else
				tm.sidebar.bar.addButton(this);
		},

		getElement: function() {
			return this.div;
		},
		
		getRootComments: function() {
			var hentry = $('comments').getElement('.hentry');
			if (hentry)
				return hentry.getChildren('li');
			else
				return [];
		},
		
		getRootCommentOf: function(comment) {
			var comments = $('comments');
			while (comment.parentNode.parentNode != comments)
				comment = comment.parentNode.parentNode;
			return comment;
		},
		
		collapse: function() {
			this.getRootComments().forEach(this.collapseThread);
			this.buttonLink.addClass('on');
			this.state = 'collapsed';
		},
		
		collapseThread: function(thread) {
			thread.addClass('collapsed');
			var expander = thread.getElement('.collapse-comments-expander');
			expander && expander.addClass("on");
			var container = thread.getElement('.hentry');
			container && container.addClass('hidden');
		},

		expand: function() {
			this.getRootComments().forEach(this.expandThread);
			this.buttonLink.removeClass('on');
			this.state = 'expanded';
		},

		expandThread: function(thread) {
			thread.removeClass('collapsed');
			var expander = thread.getElement('.collapse-comments-expander');
			expander && expander.removeClass("on");
			var container = thread.getElement('.hentry');
			container && container.removeClass('hidden');
		},
		
		ensureExpander: function(thread) {
			if (thread.getElement('.collapse-comments-expander')) return;
			if (thread.getElements('li.comment_holder').length==0) return;
			var expander = $(document.createElement('a'));
			expander.addClass('collapse-comments-expander');
			expander.href = "#";
			expander.addEventListener('click', (function(ev){
				if (thread.hasClass('collapsed'))
					this.expandThread(thread);
				else
					this.collapseThread(thread);
				ev.stopPropagation();
				ev.preventDefault(); 
			}).bind(this), false);
			thread.insertBefore(expander, thread.childNodes[0]);
		}

	};
	
	unsafeWindow.addEvent('domready', function(){
		tm.sidebar.buttons.collapseCommentsButton.initialize();
	});
}