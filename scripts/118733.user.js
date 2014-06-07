// ==UserScript==
// @name Put.io User Script
// @include http://put.io/
// @include https://put.io/
// @include http://put.io/*
// @include https://put.io/*
// ==/UserScript==
// (function() {
	function clearDashboardEvents() { $j('.dlt-close a').each(function(x) { this.onclick(); }); }
	function addDownloadLinks() {
		$j('.file-row').each(function(id, obj) {
			_fnameNode = $j(this).find('.file-name');
			if(_fnameNode.filter(':has(.is-folder img)').length == 0) {
				_fnameNode.append('<a href="/download-file/' + cuser_id +'/' + $j(this).attr('id').substring(8) + '" style="float: right; font: bold 14pt Calibri;">Download!</a>');
			}
		});
	}
	function setPageLength() {
		$j('#page').css('width', 'auto');
	}
	var _oldFunction;

	addEventListener('load', function (e) {
		$j('#dashboard .container h1').append('<a href="javascript:;" onclick="clearDashboardEvents();" style="font: bold 8pt Calibri; color: #606060;">Clear all</a>');
		$j('#logo').append('<a href="javascript:;" onclick="setPageLength();" style="font: bold 8pt Calibri; color: #C0C0C0;">wide</a>');
		addDownloadLinks();
		
		_oldFunction = PrettyPager.reload;
		PrettyPager.reload = function(parent_id, once) { _oldFunction(parent_id, once); addDownloadLinks(); }
	}, false);
// })();