// ==UserScript==
// @name           	Wer-Kennt-Wen Friend Tracker
// @description    	Basierend auf dem Skript von Sascha => https://userscripts.org/users/TOASTed
// @description    	Skript, das dir zeigt, wer dich auf WKW aus der Freundesliste entfernt hat
// @namespace      	WKW
// @author         	Sven Eric Neuz
// @version        	0.31
// @include        	http://www.wer-kennt-wen.de/*
// @grant			GM_getValue
// @grant			GM_setValue
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require			http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// ==/UserScript==

// Changelog 0.31
// 		Fixes due to change from WKW
//
// Changelog 0.30
//		The changes are kept minimal - just enough to make it work again
// 		Added @grant statements
// 		Fixed Update URLs
// 		Fixed Date Bug (January was 00 instead of 01 and so on)
//		Fixed Menu Display
//		Fixed Automatic & Manual Update
// 		Removed Ad Removal (use AdBlock)
// 		Removed "Spiele" and "Sparen" Menu to make Room for "Friend Tracker" Menu

function wkwFriendTracker() {
	this.currentPage = 1;
	this.url = window.location;
	
	this.currentFriendCount = 0;
	this.allowUpdate = false;
	this.timeout = 10000;
	
	this.friendLists = {
		changes: 0,
		temp: [],
		total: [],
		added: [],
		removed: []
	};
	
	this.settings = {
		wkw: {
			baseUrl: 'http://www.wer-kennt-wen.de/',
			friendUrl: 'http://www.wer-kennt-wen.de/people/relationship/',
			allowedUpdatePaths: ['^/people/relationship.*']
		}
	};
	
	//get my wkw id
	this.getWkwId = function() {
		var profileLink = $('#navigation li:nth-child(3) a').attr('href');
		var match = new RegExp(/\/person\/(.*)/g).exec(profileLink);
		return match[1];
	}

	//inits the friend tracker for wkw
	this.initFriendlist = function() {
		//check if current path allows update of friend list
		var path = window.location.pathname;
		for (a=0; a < this.settings.wkw.allowedUpdatePaths.length; a++)
		{
			if (!this.allowUpdate)
			{
				var regExpr = new RegExp(this.settings.wkw.allowedUpdatePaths[a]);
				if (regExpr.test(path))
				{
					this.allowUpdate = true;
				}
			}
		}
		
		//load lists from greasemonkey
		this.friendLists.changes = (typeof(GM_getValue('listChanges'))!='undefined') ? parseInt(GM_getValue('listChanges')) : 0;
		this.friendLists.total = (GM_getValue('listTotal')!=null) ? $.parseJSON(GM_getValue('listTotal')) : [];
		this.friendLists.added = (GM_getValue('listAdded')!=null) ? $.parseJSON(GM_getValue('listAdded')) : [];
		this.friendLists.removed = (GM_getValue('listRemoved')!=null) ? $.parseJSON(GM_getValue('listRemoved')) : [];
		
		//get current friend count only on the default friend list
		if (this.allowUpdate)
		{
			var peopleCountElm = $('.jquery-ui-tab');
			this.currentFriendCount = parseInt(peopleCountElm.html().match(/\(\d+\)/).toString().match(/\d+/));
		}
		else
		{
			this.currentFriendCount = this.friendLists.total.length;
		}
		
		//add layout options to menu bar
		this.setLayout();
		
		//check if there is any change
		if (this.allowUpdate && this.friendLists.total.length!=this.currentFriendCount) 
		{
			this.setUpdateLayout();
			this.updateFriendlist();
		}
	};
	
	this.setUpdateLayout = function() {
			//create progress bar and hide wkw content
			$('#peopleBar').hide();
			$('table.photolist').hide();
			$('div[align="center"]').hide();
			
			$('table.photolist').after('<div class="friendTracker-progressContent">' +
				'<p>Aktualisiere Freundesliste... bitte warten!</p>' +
				'<div class="friendTracker-progress"><div class="friendTracker-bar"></div></div>' +
				'<span class="friendTracker-progressText">0%</span>' +
				'</div>');
			
			$('.friendTracker-progress').css({ border: '1px solid #76A3CD', height: '25px', 'margin-bottom': '3px' });
			$('.friendTracker-bar').css({ 'background-color': '#76A3CD', height: '25px', width: '1%' });
			$('.friendTracker-progressText').css({ 'display': 'block', 'text-align': 'center' });
	};
	
	//adds the layout to the menu bar
	this.setLayout = function() {
		var self = this;
	
		//remove "Spiele" and "Sparen" menu
		$('#navigation li:nth-child(9) a').remove();
		//we will reuse the spiele menu space instead of removing it ;)
		//$('#navigation li:nth-child(8) a').remove();
		
		//add menu entry
		var menuEntry = $('<a class="friendTracker" href="javascript:;">Friend Tracker<span class="friendTracker-counter">' + 
			((this.friendLists.changes > 0) ? this.friendLists.changes : '') + '</span></a>').css({ 'float': 'right' });
		
		$('#navigation li:nth-child(8)').replaceWith(menuEntry);
		$('#navigation span.friendTracker-counter')
			.css({ 'background-color': 'red', 'position': 'relative', 'color': '#fff', 
				'font-size': '11px', 'font-weight': 'bold', 'top': '-6px', 'left': '6px' });
			
		$('#navigation a.friendTracker')
			.click(function() {
				//remove submenus
				$('#navigation ul ul').remove();
				$('#rahmen').removeClass('submenuActive');
			
				//set navigation 
				$('#navigation li').removeClass('active');
				$(this).parent().addClass('active');
				
				self.showFriendTracker();
			});
			
		//add manually update link on friend page
		if (this.allowUpdate) 
		{
			$('.uiWkwSortContainer').append(
				'<a class="uiActionBarIcon latestIcon friendTracker-manualUpdate" title="FT aktualisieren" href="javascript:"></a>' +
				'<a class="uiActionBarIconLink friendTracker-manualUpdate" href="javascript:"><strong>FT aktualisieren</strong></a>');
			$('.friendTracker-manualUpdate').click(function() { 
				self.setUpdateLayout();
				self.updateFriendlist();
			});
		}
	};
	
	this.showFriendTracker = function() {
		var self = this;
	
		//remove text from counter
		this.friendLists.changes = 0;
		$('span.friendTracker-counter').empty();
		GM_setValue('listChanges', this.friendLists.changes);
		
		//prepare layout
		$('#rahmen')
			.empty()
			.append($('<h1>Friend Tracker</h1>'))
			.append($('<h2><span>Leute, die du neu kennengelernt hast (' + self.friendLists.added.length + ')</span></h2>'))
			.append(self.renderFriendlist(self.friendLists.added))
			.append($('<h2><span>Leute, die nicht mehr in deiner Freundesliste sind (' + self.friendLists.removed.length + ')</span></h2>'))
			.append(self.renderFriendlist(self.friendLists.removed));
		
		//add events to "hide" links
		$('a.friendTracker-hide').click(function() {
			self.hideFriendFromList($(this).attr('rel'));
		});
	};
	
	//hide friend from added/removed list to keep it clean
	this.hideFriendFromList = function(id) {
		if (!confirm('Soll die gew�hlte Person von der Liste ausgeblendet werden?\nEs geht NUR um die Anzeige im Friend Tracker.')) return; 
	
		//remove id from added list
		this.friendLists.added = $.grep(this.friendLists.added, function(n,i){
			return (this.friendLists.added[i].id != id);
		});
		
		//remove id from removed list
		this.friendLists.removed = $.grep(this.friendLists.added, function(n,i){
			return (this.friendLists.added[i].id != id);
		});
		
		//update lists and save
		GM_setValue('listAdded', $.toJSON(this.friendLists.added));
		GM_setValue('listRemoved', $.toJSON(this.friendLists.removed));
		
		this.showFriendTracker();
	};
	
	//renders the friendlist
	this.renderFriendlist = function(listObj) {
		var tableStr = '<table class="people fixed" cellpadding="5">';
		
		if (listObj.length == 0)
		{
			tableStr += '<tr><td class="normal">Derzeit keine Leute gelistet</td></tr>';
		}
		
		for (var p = 0; p < listObj.length; p++)
		{
			var friend = listObj[p];
			
			rowClass = (p%2==0) ? 'normal' : 'odd';
			tableStr += '<tr class="' + rowClass + '">' + 
				'<td width="80"><a href="/person/' + friend.id + '"><img src="' + friend.picture + '" border="0" /></a></td>' +
				'<td>' + 
					'<table cellspacing="0" cellpadding="0" border="0">' +
						'<colgroup><col width="80"><col width="110"></colgroup>' +
						'<tr><td>Name:</td><td><a href="/person/' + friend.id + '">' + friend.name + '</a></td>' +
						'<tr><td>Gefunden am:</td><td>' + this.formatDate(friend.detectedDate) + '</td></tr>' +
					'</table>' +
				'</td>' + 
				'<td class="noOverflow justnow">&nbsp;</td>' + 
				'<td>' + 
					'<ul class="peopleOptions">' + 
						'<li class="messageTo"><a href="message/toUser/' + friend.id + '">Nachricht schreiben</a>' + 
						'<li class="kenneNicht"><a href="javascript:;" class="friendTracker-hide" rel="' + friend.id + '">Nicht mehr anzeigen</a>' + 
					'</ul>' + 
				'</td>' + 
				'</tr>';
		}
		
		tableStr += '</table>';
		return tableStr;
	};
	
	//reads the friendlist, on finish all data is stored by GM_setValue()
	this.updateFriendlist = function() {
		if (this.currentPage <= this.getFriendPages())
		{
			//var url = this.settings.wkw.friendUrl + (this.currentPage * this.settings.wkw.friendsPerPage);
			var url = this.settings.wkw.friendUrl + this.getWkwId() + '/zoom/medium/show/default/page/' + this.currentPage;
			this.readFromUrl(url);
		}
		else
		{
			this.processFriendlist();
			
			GM_setValue('listChanges', this.friendLists.changes);
			GM_setValue('listTotal', $.toJSON(this.friendLists.temp));
			GM_setValue('listAdded', $.toJSON(this.friendLists.added));
			GM_setValue('listRemoved', $.toJSON(this.friendLists.removed));
			this.friendLists.temp = [];
			
			//remove progress bar
			$('.friendTracker-progressContent').remove();
			
			//reshow friend list
			$('#peopleBar').show();
			$('table.photolist').show();
			$('div[align="center"]').show();
		}
	};
	
	//processes the friendlist and compare it to the locally saved list
	this.processFriendlist = function()	{
		var storedFriends = [];
		var tempFriends = [];
		var newFriends = [];
		var removedFriends = [];
		var changes = 0;
		
		// copy all ids to array to have an easier check
		for (var p = 0; p < this.friendLists.total.length; p++) 
		{
			storedFriends.push(this.friendLists.total[p].id);
		}
		
		for (var p = 0; p < this.friendLists.temp.length; p++) 
		{
			tempFriends.push(this.friendLists.temp[p].id);
		}
		
		//loop current stored list to find friends which are new only if there are some friends stored
		if (storedFriends.length > 0)
		{
			for (var p = 0; p < tempFriends.length; p++)
			{
				if ($.inArray(tempFriends[p], storedFriends)<0)
				{	
					var friend = this.friendLists.temp[p];
					friend.detectedDate = this.getCurrentDate();
					this.friendLists.added.push(friend);
					this.friendLists.changes++;
				}				
			}
			
			//loop newly fetched list to find friends which are gone
			for (var p = 0; p < storedFriends.length; p++)
			{
				if ($.inArray(storedFriends[p], tempFriends)<0)
				{
					var friend = this.friendLists.total[p];
					friend.detectedDate = this.getCurrentDate();
					this.friendLists.removed.push(friend);
					this.friendLists.changes++;
				}				
			}
		}
		
		if (this.friendLists.changes > 0)
		{
			$('span.friendTracker-counter').html(this.friendLists.changes);
		}
	}
	
	//open url to read from to fetch friendlist
	this.readFromUrl = function(pageUrl) {
		var self = this;
	
		$.get(pageUrl, function(data) {	
			self.currentPage++;
			self.parseFriendlist(data);
			self.updateFriendlist();
			
			newWidth = Math.ceil((self.currentPage / self.getFriendPages()) * 100);
			$('.friendTracker-bar').css({ width: newWidth + '%' });
			$('.friendTracker-progressText').html(newWidth + '%');
		});
	};
	
	//reads HTML code and get id/name of the user
	this.parseFriendlist = function(data) {
		//replace whitespaces
		data = data.replace(/[\r\n]+/g, '');
	
		//extract table list from page
		var regExpr = /<table cellspacing=\"0\" class=\"photolist\" width=\"100%\">(.*)<\/table>/g;
		var temp = regExpr.exec(data);
		if (temp) data = temp[1];
		//get friends from table list
		var regExpr = /<a +href=\"\/person\/([^\"]*)\" +title=\"([^\"]*)\" *><img src=\"([^\"]*)\"/g;
		var match = '';
		var i = 0;
		
		while (match = regExpr.exec(data))
		{
			var friend="";
			if (match[3].match(/dummy/)){
				friend = { id: match[1], name: match[2], picture: "" };
			}
			else {
				friend = { id: match[1], name: match[2], picture: match[3] };
			}
			this.friendLists.temp.push(friend);
		}
	};
	
	//return total of pages used for listing friends
	this.getFriendPages = function() {
		return unsafeWindow.wkwPeoplePaginatorConfig.pageCount;
	};
	
	//get current date as formatted string
	this.getCurrentDate = function() {
		var currentDate = new Date();
		return currentDate.getDate() + '.' + (currentDate.getMonth()+1) + '.' + (currentDate.getFullYear()-2000);
	}
	
	this.formatDate = function(dateStr) {
		var temp = dateStr.split('.');
		return $.strPad(temp[0], 2) + '.' + $.strPad(temp[1], 2) + '.' + $.strPad(temp[2], 2);
	}
		
	this.initFriendlist();
	
}

//String Padding
$.strPad = function(i,l,s) {
	var o = i.toString();
	if (!s) { s = '0'; }
	while (o.length < l) {
		o = s + o;
	}
	return o;
};

var friends = wkwFriendTracker();
