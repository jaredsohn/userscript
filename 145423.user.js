// ==UserScript==
// @name          IMDB Modifier
// @description	  Modifies IMDB
// @include       http://www.imdb.com/title/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @require       http://php2go.googlecode.com/svn/branches/reboot/php2go/library/jquery/jquery.xdomainajax.js
// @author        WMA
// ==/UserScript==
// Style
GM_addStyle('\
.torrent-table {\
	border: 1px solid #DFDFDF;\
	background-color: #F9F9F9;\
	width: 100%;\
	-moz-border-radius: 3px;\
	-webkit-border-radius: 3px;\
	border-radius: 3px;\
	font-family: Arial,"Bitstream Vera Sans",Helvetica,Verdana,sans-serif;\
	color: #333;\
}\
.torrent-table td, .torrent-table th {\
	border-top-color: white;\
	border-bottom: 1px solid #DFDFDF;\
	color: #555;\
}\
.torrent-table th {\
	text-shadow: rgba(255, 255, 255, 0.796875) 0px 1px 0px;\
	font-family: Georgia,"Times New Roman","Bitstream Charter",Times,serif;\
	font-weight: normal;\
	padding: 7px 7px 8px;\
	text-align: left;\
	line-height: 1.3em;\
	font-size: 14px;\
}\
.torrent-table td {\
	font-size: 12px;\
	padding: 4px 7px 2px;\
	vertical-align: top;\
');
// Remove ugly elements
$('#prometer_container').remove();
$('.star-box-rating-widget').remove();
$('#maindetails_sidebar_bottom').remove(); 
$('#root').css('width', '90%');
$('div[id^="maindetails_center"]').css({'margin-right': '20px', 'width': 'auto'});
$('.rec_heading_wrapper').parent().remove();
$('.mediastrip_container').parent().remove();
$('.cast_list').parent().remove();
$('#bottom_ad_wrapper').remove();
$('#content-1').remove();
$('.footer').remove();
$('#rvi-div').remove();
$('.watch-bar').remove();
$('.falltvpreviewdiv').remove();
$('#overview-bottom').parent().remove();
var articles = $('#maindetails_center_bottom > .article');
articles.splice(1,1);
articles.remove();
// Add torrent section
var headerText = $('.header').text();
var year = $('.header > .nobr').text();
var title = headerText.substring(0, headerText.lastIndexOf(year)).trim().replace(/ /g, '%20');
var url = ("http://thepiratebay.se/search/" + title + "/0/7/0").replace(/ /g, '%20');
var elem = $('<div id="torrents">');
$('.title-overview').css({'width': '50%', 'float': 'left'}).parent().append(elem);
var thead = $('<thead><tr><th>Torrent</th><th>Seeders / Leechers</th>');
var table = $('<table class="torrent-table">').append(thead);
elem.append(table);
$('#torrents').css({
		       'position': 'relative',
		       'float': 'left',
		       'border-top-style' : 'solid',
		       'border-right-style' : 'solid',
		       'border-bottom-style' : 'solid',
		       'border-left-style' : 'solid',
		       'border-top-width' : '1px',
		       'border-right-width' : '1px',
		       'border-bottom-width' : '1px',
		       'border-left-width' : '1px',
		       'border-top-color' : '#DDD',
		       'border-right-color' : '#DDD',
		       'border-bottom-color' : '#DDD',
		       'border-top-left-radius': '12px',
		       'border-top-right-radius': '12px',
		       'border-bottom-right-radius': '12px',
		       'border-bottom-left-radius': '12px',
		       'height': $('#title-overview-widget').height(),
		       'overflow-y': 'scroll',
		       'width': '49%',
		       'padding-bottom': '25px',
		       'border-left-color' : '#DDD'});
GM_xmlhttpRequest({
		      method: "GET",
		      url: url,
		      onload: function(response) {
			  var tbody = $('<tbody>');
			  $(response.responseText).find('#searchResult').find('tr:not(".header")').each(function(i, data) {
													    var peers = $(data).find('[align="right"]');
													    var peersData = peers[0].innerText + "/" + peers[1].innerText;
													    var link = $(data).find('.detName').parent()[0].innerHTML;
													    var tr = $('<tr>');
													    tr.append('<td>' + link);
													    tr.append('<td>' + peersData);
													    tbody.append(tr);});
			  table.append(tbody);
			  $('.detName > [href]').each(function(i, data) { data.setAttribute("href", "http://thepiratebay.se" + data.getAttribute("href"));});
		      }});