// ==UserScript==
// @name        AO3 Helpers
// @namespace   thgrendel
// @description Adds a popup menu with links to each chapter to any entry in a works list and trims the kudolist.
// @include     http://archiveofourown.org
// @include     http://archiveofourown.org/*
// @include     https://archiveofourown.org/*
// @include     http://www.archiveofourown.org/*
// @include     https://*.archiveofourown.org/*
// @require       http://localhost/jquery.js
// @require     https://raw.github.com/timrwood/moment/2.0.0/min/moment.min.js
// @version     1.0
// ==/UserScript==

function addTocfunc() {
	$('.tocimg').bind('click', function (el) {
		url = el.target.attributes[1].value;
		var idarr = url.split('/');
		var id = idarr[4];
		var toc = $('#' + id);
		if ($('#' + id).css('display') == 'block') {
			$('#' + id).hide(200);
		} else {
			$('#' + id).load(url + ' ol.chapter.index', function (html) {
				$('a', 'ol.chapter.index').attr('target', '_blank');
			});
			$('#' + id).show(200);
		}
	});
	$('body').bind('click', function (el) {
		var cltarget = $(el.target);
		if (!(cltarget.hasClass('ajaxtoc') || cltarget.hasClass('tocimg'))) {
			$('.ajaxtoc').hide(200);
		}
	});
}

function addnav() {
	var x, i;
	var tocimg = 'data:image/gif;base64,R0lGODlhEAAQANUAAL+/v7CwsJ6enpycnO7u7vDw8Obm5u3t7ebm5tvb2+zs7NPT0+Pj46KiouXl5e3t7Z2dnaWlpa2trZ6envDw8KSkpPHx8aysrMzMzKCgoK2trZ+fn+7u7uTk5PLy8sjIyMjIyKGhobGxsaCgoM3Nzf///5ubm4KCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgiwAAAAAEAAQAAAGdsCSsNT5iEIh0aczHHpAI5N0OgJ5nICpdgq4lkDbsAlEjJJIg4tEFAhoBKZRUXoWLBgGhMGRkRrFYkd0JIBSSIMVCRwFBRYUUSZJhVtKgyYTAxsNIRBTS2aEGA8HBAQKEXFMYJNjQh5ZhV1OUGFVXk1FR0lLTUEAOw==';

	x = $('h4.heading a').filter(function (index) {
		return this.href.match(/works\/[0-9]+$/);
	}).after(function () {
		var idarr = this.href.split('/');
		var id = idarr[4];
		return ' <img src="' + tocimg + '" url="' + this.href + '/navigate" class="tocimg" style="cursor:pointer;" /> <div id="' + id + '" class="ajaxtoc" style="display:none;width:300px;height:300px;font-size:12pt;"></div>';
	});
}
addnav();
addTocfunc();

function markUpdated() {
	var x;
	x = $('h4.viewed').filter(function (index) {
		return this.textContent.match(/Update available/);
	}).css('background-color', 'orange');
}

markUpdated();

function countkudos() {
	var kudocount = $('.kudos a').length;
	console.log('kudocount', kudocount);
	if (kudocount < 1) {
		return;
	}
	var kudotext = $('.kudos').get(0).textContent;
	var guestsep = kudotext.lastIndexOf('as well as');
	if (guestsep == -1) {
		guestsep = kudotext.lastIndexOf('left kudos');
	}
	var base = kudotext.substring(0, guestsep).trim();
        var kudolinks = $('.kudos').get(0).innerHTML;
	var restpos = kudotext.substring(guestsep, kudotext.length - 1);
	var nothorse = (kudotext.lastIndexOf('nothorse') > 0) ? ' (including you) ' : '';
	$('.kudos').replaceWith('<p class="kudos" title="' + base + '" onclick="jQuery(\'#kudolinks\').toggle(300);">' + kudocount + ' Users ' + nothorse + restpos + '<span id="kudolinks" style="display:none">' + kudolinks +  '</span></p>');

}
countkudos();

function prettyLinks() {
	var dates = document.getElementsByClassName("datetime");
	for (var i = 0; i < dates.length; i++) {
		var pubdate = moment(dates[i].innerHTML, 'D MMM YYYY');  
		var diff = moment().diff(pubdate, 'days');
		var newdate = pubdate.fromNow();
		if (diff == 0) {
			newdate = '<span style="color:red">today</span>';
		}
		if (diff == 1) {
			newdate = '<span style="color:green">yesterday</span>';
		}
		if (diff == 2) {
			newdate = '<span style="color:orange">' + newdate + '</span>';
		}
		if (newdate && diff < 14) dates[i].innerHTML = newdate;
	}
}
prettyLinks();

function insertHider() {
	$('<p style="background-color:#eee;margin-bottom:-5px;padding:2px"><a style="display:block;width:100%;text-align:center;" href="javascript:jQuery(\'.meta\').slideToggle(300);">ToggleInfobox</a></p>').insertBefore('dl.meta');
}

insertHider();

if (document.location != 'http://archiveofourown.org/works/new') $('.meta').slideToggle(300);