// ==UserScript==
// @name        DobrochanBoardPostCount
// @namespace   hrs
// @description Script for dobrochan imageboard, thats add floating panel with list of boards and post counters
// @include     http://dobrochan.*/*/res/*.xhtml
// @include     http://dobrochan.*/*/index.xhtml
// @include     http://dobrochan.*/bookmarks
// @include     http://dobrochan.*/settings
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.3.1/jquery.cookie.min.js
// @version     0.92
// ==/UserScript==


$(function()
{	
	var boards = ['b', 'u', 'rf', 'dt', 'vg', 'r', 'cr', 'lor', 'mu', 'oe', 's', 'w', 'hr',
				  'a', 'ma', 'sw', 'hau', 'azu',
				  'tv', 'cp', 'gf', 'bo', 'di', 'vn', 've', 'wh', 'fur', 'to', 'bg', 'wn', 'slow', 'mad',
				  'd', 'news'];
	
	function clamp(value, a, b) {
		return value < a ? a : value > b ? b : value;
	};
	var panel;
	var settingsPanel;
	

	//functions to work with boards panel
	var hideoutTimer;
	function showPanel(mousepos) {
		clearTimeout(hideoutTimer);
		
		this.style.left =  (document.body.clientWidth - this.offsetWidth) + 'px';
	};
	function hidePanel() {
		var hidingObj = this;
		hideoutTimer = setTimeout(function(){
			hidingObj.style.left = (document.body.clientWidth - 1) + 'px';
			clearTimeout(hideoutTimer);
		}, 500);
	};
	function mouseWheel(event) {
		var direction = ((event.wheelDelta) ? event.wheelDelta : -event.detail);

		if(this.offsetHeight > window.innerHeight)
			this.style.top = clamp(this.offsetTop + (direction > 0 ? 50 : -50), window.innerHeight - this.offsetHeight, 0) + 'px';
		else
			this.style.top = (window.innerHeight - this.offsetHeight)/2 + 'px';
		
		if (event.preventDefault)
			event.preventDefault();
	};
	function refreshBoardList() {
		var code = '';
		$.getJSON('/api/chan/stats/diff.json', function(boardsPostCount) {
			$.each(boards, function(index, boardId) {
				if(settings[boardId].show)
				{
					var refCode = '<a href="/' + boardId + '/index.xhtml">';
					var advTagsOpen = (settings[boardId].bold ? '<b>' : '');
					var advTagsClose = (settings[boardId].bold ? '</b>' : '');
					code += '<tr><td>' + refCode + advTagsOpen + '/' + boardId + '/' + advTagsClose + '</a></td>' + '<td>' + refCode + advTagsOpen + '[' + boardsPostCount[boardId] + ']' + advTagsClose + '</a></td></tr>';
				}
			});
			document.getElementById('panelboardslist').innerHTML = code;
			
			panel.style.top = ((panel.offsetHeight > window.innerHeight) ? 0 : (window.innerHeight - panel.offsetHeight)/2) + 'px';
		});
	};
	

	//functions for settings
	var settings;
	function generateDefaultBoardSettings() {
		settings = new Object();
		$.each(boards, function(index, boardId) {
			settings[boardId] = {show:true, bold:false};
		});
	};
	function loadBoardSettings() {
		var settingsString = $.cookie('hrsboardsettings');
		if(settingsString == undefined)
			generateDefaultBoardSettings();
		else
			settings = JSON.parse(settingsString);
	};
	function saveBoardSettings()
	{
		$.each(boards, function(index, boardId) {
			settings[boardId].show = document.getElementById('checkboxshow' + boardId).checked;
			settings[boardId].bold = document.getElementById('checkboxbold' + boardId).checked;
		});
		var settingsString = JSON.stringify(settings);
		$.cookie('hrsboardsettings', settingsString, {path: '/', expires: 9000});
		
		refreshBoardList();
	};
	
	function showBoardSettings() {
		$('#settingspanel').show();
	};
	function hideBoardSettings() {
		$('#settingspanel').hide();
	};
	

	
	
	//creating side boards panel

	var panelCode = '<div id="panelboards" class="reply" style="position:fixed;" >' +
					'<table><tbody id="panelboardslist">' +
					'</tbody>' +
					'<tr><td colspan="2"><a id="settingsbutton">Settings</a></td></tr>' +
					'</table></div>';
	$('body').append(panelCode);
	refreshBoardList();
		
	panel = document.getElementById('panelboards');
	
	panel.style.left = (document.body.clientWidth - 1) + 'px';
		
	panel.onmouseover = showPanel;
	panel.onmouseout = hidePanel;
		
	panel.onmousewheel = mouseWheel;
	if (panel.addEventListener)
		panel.addEventListener("DOMMouseScroll", mouseWheel, false);
			
	document.getElementById('settingsbutton').onclick = showBoardSettings;
		
	setInterval(refreshBoardList, 60*1000); //every minute
		
	
	//creating settings panel
	loadBoardSettings();
	var settingsPanelCode = '<div id="settingspanel" class="reply" style="position:fixed; top:0px; left:50%;">' +
							'<table>' +
							'<tr><td colspan="4" class="replytitle">Settings</td>' +
							'<td><a id="settingsclosebutton">close</a></td></tr>';
	$.each(boards, function(index, boardId) {
		settingsPanelCode += '<tr><td><p>/' + boardId + '/</p></td>' +
							 '<td><input id="checkboxshow' + boardId + '" type="checkbox" ' + (settings[boardId].show ? 'checked="checked"' : '') + '></input></td>' +
							 '<td><label for="checkboxshow' + boardId + '">Show</label></td>' +
							 '<td><input id="checkboxbold' + boardId + '" type="checkbox" ' + (settings[boardId].bold ? 'checked="checked"' : '') + '></input></td>' +
							 '<td><label for="checkboxbold' + boardId + '">Bold</label></td>' +
							 '</tr>';
	});

	settingsPanelCode += '<tr><td colspan="5"><a id="settingssavebutton">Save settings</a></td></tr>' +
						 '</table>' +
						 '</div>';
						 
	$('body').append(settingsPanelCode);
	settingsPanel = document.getElementById('settingspanel');
	$(settingsPanel).hide();
	
	settingsPanel.onmousewheel = mouseWheel;
	if (settingsPanel.addEventListener)
			settingsPanel.addEventListener("DOMMouseScroll", mouseWheel, false);
			
	document.getElementById('settingssavebutton').onclick = saveBoardSettings;
	document.getElementById('settingsclosebutton').onclick = hideBoardSettings;
	
});
