// ==UserScript==
// @name           habrahabr.ru - my comments
// @namespace      habrahabr.ru
// @include        http://habrahabr.ru/*
// @include        http://*.habrahabr.ru/*
// ==/UserScript==

if (unsafeWindow.tm.sidebar.bar) {

	var $ = unsafeWindow.$;
	var tm = unsafeWindow.tm;

	Function.prototype.bind = function(object) {
		var f = this;
		return function(){f.apply(object,arguments);};
	};
		
	tm.sidebar.buttons.myCommentsButton = {

		div: null,
		buttonLink: null,
		myComments: [],
		index: 0,
		
		initialize: function() {

			this.buttonLink = $(document.createElement('a'));
			this.buttonLink.className = 'button';
			this.buttonLink.href = '#';
			this.buttonLink.title = 'Перейти к моим комментариям';
			this.buttonLink.addEventListener('click', (function(ev){
				unsafeWindow.commentForm.quickGoToComment(this.myComments[this.index]);
				this.index = this.index + 1;
				if (this.index >= this.myComments.length)
					this.index = 0;
				ev.stopPropagation();
				ev.preventDefault(); 
			}).bind(this), false);
			
			var avatarImg = $(document.createElement('img'));
			avatarImg.style.width = "28px";
			avatarImg.style.height = "29px";
			avatarImg.src = $('info-search').getElement('.personal_panel .avatar').src;
			this.buttonLink.appendChild(avatarImg);

			this.div = document.createElement('div');
			this.div.id = 'my-comments-button';

			this.div.appendChild(this.buttonLink);
			
			// TODO: ***
			unsafeWindow.commentForm 
			&& unsafeWindow.commentForm.addEvent 
			&& unsafeWindow.commentForm.addEvent('tm:loading-finished', this.refresh.bind(this));

			if (tm.sidebar.bar.addButtonBefore)
				tm.sidebar.bar.addButtonBefore(this, tm.sidebar.buttons.refreshButton);
			else
				tm.sidebar.bar.addButton(this);
			this.refresh();
		},
		
		refresh: function() {
			var replies = $('comments').getElements('.my-reply');
			if (replies.length > 0) {
				tm.sidebar.bar.showButton(this);
				if (this.myComments.length > 0) {
					var currentComment = this.myComments[this.index];
					for (var i=0;i<replies.length;i++)
						if (replies[i] == currentComment)
							this.index = i;
				} else {
					this.index = 0;
				}
				this.myComments = replies;
			} else
				tm.sidebar.bar.hideButton(this);
		},

		getElement: function() {
			return this.div;
		}
	};
	
	unsafeWindow.addEvent('domready', function(){
		tm.sidebar.buttons.myCommentsButton.initialize();
	});
}