// ==UserScript==
// @name           Facebook Like-Everything
// @namespace      Kuzmin
// @include        http://www.facebook.com/*
// ==/UserScript==

/* ==========================================================
							Settings	
========================================================== */
var Settings = {
	onlyUser: true,
	likeComments: true,
	modulo: 10, // Log liking every tenth post.
	forbiddenTypeIDs: [21, 38, 63, 100, 285],
	alwaysLikeTypeIDs: [9, 10, 12, 118, 313]
};
/* ==========================================================

	The different type IDs that I've bothered to identify:

	7: 		Uploaded photo
	9: 		Updated info
	10:		Attending event
	12:		Joined group
	21:		xxx and xxx are now friends.
	22:		Status update
	38:		Friend posts vidya
	63: 	Friend makes wall post
	100:	Friend writes (again?) 
	105:	Added relative (sister?) 
	118:	Joined school 
	285:	Tagged in facebook places 
	313:	Started using app

========================================================== */

/* ==========================================================
			Don't touch the code below this point	
========================================================== */

/* Array prototypes */
Array.prototype.clean = function() { // Clean empty elements from array. Returns cleaned array.
	var tempArr = [], i;
	for(i=0; i < this.length; ++i) {
		if(this[i] !== undefined) {
			tempArr[tempArr.length] = this[i];
		}
	}
	
	return tempArr;
};
Array.prototype.find = function(searchStr) { // Find the indexes of the item searched for, if there's no matches it returns an empty array.
	var returnArray = [], i;
	for (i=0; i < this.length; i++) {
		if (this[i] === searchStr) {
			returnArray.push(i);
		}
	}
	return returnArray;
}
Array.prototype.inArray = function(searchStr) { // Checks if the needle exists in the array.
	return (this.find(searchStr)).length > 0;
}

/* Event functions, to make the clicks on the buttons */
function fireEvent(obj, evt) {
	var fireOnThis = obj, evObj;
	if (document.createEvent) {
		evObj = document.createEvent('MouseEvents');
		evObj.initEvent(evt, true, false);
		fireOnThis.dispatchEvent(evObj);
	} else if (document.createEventObject) {
		fireOnThis.fireEvent('on' + evt);
	}
}
function clickElement(e) {
	fireEvent(e, 'click');
}

/* Class definition */
function LikeClass (Settings) {
	this.profileID = undefined;
	this.LikeButtons = [];
	this.CmntLikeButtons = [];
	this.Interval = undefined;
	
	this.Settings = Settings;
	
	
	this.getProfileID = function() {
		var j, likeBtns =  Array.prototype.slice.call( document.getElementsByClassName('like_link') ), ID, btnData;
		for(j=0; isNaN(ID) || ID === undefined; ++j) {
			btnData = this.fetchBtnData(likeBtns[j]);
			ID = parseInt(btnData.target_profile_id, 10);
		}

		GM_log('Profile ID = ' + ID);
		this.profileID = ID;
		return this.profileID;
	};	
	this.fetchCmntsToLike = function() {
		GM_log('Fetching them comments');
		var j, CmntLikeButtons = Array.prototype.slice.call( document.getElementsByClassName('cmnt_like_link') ); // make it into an array and not NodeList
	
		/* Filter */
		for(j=0; j < CmntLikeButtons.length; ++j) {
			/* Filter dislike buttons 
				like_comment_id[99999]
				unlike_comment_id[999999]
			*/
			if((CmntLikeButtons[j].name).split('_')[0] === 'unlike') {
				delete CmntLikeButtons[j];
				continue;
			}
			
			var ajaxHovercard = CmntLikeButtons[j].parentNode.parentNode.parentNode.getElementsByClassName('actorName')[0].getAttribute('data-hovercard');
			var ID = parseInt((ajaxHovercard.split('id=')[1]).split('&')[0], 10);
			if(ID !== this.profileID) {
				delete CmntLikeButtons[j];
				continue;
			}
		}
		this.CmntLikeButtons = CmntLikeButtons.clean();
		return this.CmntLikeButtons;
	};
	this.removeItem = function (likeBtn) {
		while(!(likeBtn.className).split(' ').inArray('uiListItem') && likeBtn.parentNode !== null) {
			likeBtn = likeBtn.parentNode;
		}
		if(likeBtn.parentNode !== null) {
			likeBtn.parentNode.removeChild(likeBtn);
			return true;
		} else {
			return false;
		}
	};
	this.fetchLikeBtns = function () {
		GM_log('Fetching them like buttons');
		var j, LikeButtons = Array.prototype.slice.call( document.getElementsByClassName('like_link') );
		
		/* Filter */
		for (j=0; j<LikeButtons.length; ++j) {
			/* Get data for the post */
			var Data = this.fetchBtnData(LikeButtons[j]);
			
			/* Remove dislike-buttons */
			if (LikeButtons[j].name !== 'like') {
				delete LikeButtons[j];
			} else if(this.Settings.alwaysLikeTypeIDs.inArray(Data.type_id)) { /* There are stuff you always want to like */
				/* Do nothing (To make sure this item is kept */
			} else if (this.Settings.forbiddenTypeIDs.inArray(Data.type_id)) { /* Stuff you never want to like (i.e new friends) */
				delete LikeButtons[j];
			} else if(this.Settings.onlyUser && Data.actor !== Data.target_profile_id) { /* Stuff from other users, (they will receive notifications == not wanted */
				delete LikeButtons[j];
			}
		}
		LikeButtons = LikeButtons.clean();
				
		if(this.Settings.likeComments) {
			LikeButtons = LikeButtons.concat(this.fetchCmntsToLike());
		}
		
		this.LikeButtons = LikeButtons;
		return this.LikeButtons;
	};	
	this.fetchBtnData = function (likeBtn) {
		var i, Data, Form = likeBtn;
		while (Form.nodeName !== 'FORM') {
			Form = Form.parentNode;
		}
		var Inputs = Form.getElementsByTagName('input');
		for(i = 0; i < Inputs.length; ++i) {
			if(Inputs[i].name === 'feedback_params') {
				Data = eval('(' + Inputs[i].value + ')');
			}
		}
		
		for(var Key in Data) { // Fix numbers.
			if(!isNaN(Data[Key])) {
				Data[Key] = parseInt(Data[Key], 10);
			}
		}
		
		return Data;
	};	
	this.openComment = function () {
		var moreComments = document.getElementsByClassName('uiUfiViewAll'), i;
		if(moreComments.length > 0) {
			var Inputs = [];
			/* If the list of comments is long, the button turns into an anchor that links you to another page, not really what we want */
			for(i=0; i < moreComments.length && Inputs.length <= 0; ++i) { 
				Inputs = moreComments[i].getElementsByTagName('input');	
			}
			if(Inputs.length > 0) {
				clickElement(Inputs[0]);
				return true;
			}
		} 
		return false;
	};
	this.openHistory = function() {
		var profilePager = document.getElementById('profile_pager');
		var Loading = profilePager.getElementsByClassName('async_saving').length !== 0;
	
		if (!Loading) {
			var LoadBtn = profilePager.getElementsByClassName('uiMorePagerPrimary')[0];
			if (LoadBtn === undefined) {
				return false; // Done opening history.
			} else {
				clickElement(LoadBtn); // Open history
			}
		}
		
		return true;
	};
	this.openShowSimilar = function () {
		var btns = document.getElementsByClassName('showSimiliar'), i;
		for(i=0; i < btns.length; ++i) {
			clickElement(btns[i]);
		}
	};
	this.Start = function () {
		var Scope = this;
		var IntervalFunc = function() {
			var CommentsOpened = (Scope.Settings.likeComments ? Scope.openComment() : false), HistoryOpened = Scope.openHistory();
			
			if(!HistoryOpened && !CommentsOpened) {
				clearInterval(Scope.Interval);
				Scope.StartTwo();
			}
		}
		
		GM_log('Opening the wounds, readying to pour some salt.');
		this.Interval = setInterval(IntervalFunc, 200);
	};
	this.StartTwo = function() {
		this.openShowSimilar();
		this.fetchLikeBtns();
		
		var Scope = this;
		var IntervalFunc = function() {
			var LikeBtn = Scope.LikeButtons.shift();
			if(LikeBtn !== undefined) {
				clickElement(LikeBtn);
				if(Scope.LikeButtons.length % Scope.Settings.modulo === 0) {
					GM_log(Scope.LikeButtons.length + ' elements left to like');
				}
			} else {
				clearInterval(Scope.Interval);
				GM_log('Poking finished');
			}
		}
		
		GM_log('Dropping the LIKE-bomb, liking ' + this.LikeButtons.length + ' things');
		this.Interval = setInterval(IntervalFunc, 4000);
	}
	this.Stop = function() {
		clearInterval(this.Interval);
	}
	this.getProfileID();
}

var LC;
GM_registerMenuCommand('Like it all', 	function() {
	LC = new LikeClass(Settings);
	LC.Start();
});
GM_registerMenuCommand('Stop the like machine', function() {
	LC.Stop();
});