// ==UserScript==
// @name			TvTorernts My Favorits Select Filter
// @version		0.1
// @description	Select files according to file type
// @include		http://tvtorrents.com/loggedin/my/new_fav_tag_torrents.do
// @include		https://tvtorrents.com/loggedin/my/new_fav_tag_torrents.do
// @copyright		2013, TSG
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var settings_vars = new Array(
	'Complete',
	'(BDRip)',
	'(BluRay 720p .mkv)',
	'(720p .mkv)',
	'(Indi)',
	'(.mp4)',
	'NUKED:'
);
var inputs = $('#favForm tr td:nth-child(3) a');

var settings = GM_getValue('settings');
if(settings){
	var settings_array = settings.split(',');
	//console.log(settings_array);
}

$('input[value=" CLEAR ALL "]').remove();

$('<input/>', {
	type : 'button',
	id : 'myTvSettingsDeselect',
	'class' : 'miscbutton2',
	value : ' DESELECT ALL '
}).prependTo('#favForm center:first');

$('<input/>', {
	type : 'button',
	id : 'myTvSettingsSelectAll',
	'class' : 'miscbutton2',
	value : ' SELECT ALL '
}).prependTo('#favForm center:first');

$('<br/>').prependTo('#favForm center:first');

$('<input/>', {
	type : 'button',
	id : 'myTvSettingsApply',
	'class' : 'miscbutton2',
	value : ' APPLY FILTER '
}).prependTo('#favForm center:first');

$('<input/>', {
	type : 'button',
	id : 'myTvSettingsButton',
	'class' : 'miscbutton2',
	value : ' SETTINGS '
}).prependTo('#favForm center:first');

$('<div/>', {
	id : 'myTvSettings'
}).css({
	'display' : 'none',
	'position' : 'absolute',
	'width' : '609px',
	'top' : '0px',
	'left' : '10px',
	'z-index' : '9999',
	'border' : '1px solid rgb(100, 100, 100)',
	'border-radius' : '8px 8px 0px 0px'
}).prependTo('#favForm center:first');

$('<div/>', {
	'class' : 'head',
	'text' : 'My Fav Filter Settings'
}).css({
	'border-radius' : '8px 8px 0px 0px',
	'height' : '19px'
}).appendTo('#favForm #myTvSettings');

$('<div/>', {
	'class' : 'body',
	'text' : ''
}).css({
	'min-height' : '115px'
}).appendTo('#favForm #myTvSettings');

$('<div/>', {
	id : 'myTvSettingsClose',
	text : 'X'
}).css({
	'position' : 'absolute',
	'top' : '0px',
	'right' : '5px',
	'background' : '#fff',
	'padding' : '6px',
	'border' : '1px solid #fff',
	'border-radius' : '30px',
	'font-size' : '18px',
	'font-weight' : 'bolder'
}).appendTo('#favForm #myTvSettings');

$.each(settings_vars, function(index, value){
	if(settings_array && $.inArray(value, settings_array) !== -1){ var checked = ' checked="checked"';}
	else { var checked = ''; }
	$('<lable>'+value+'</lable><input type="checkbox" value="'+value+'"'+checked+' /><br />').appendTo('#favForm #myTvSettings .body');
})

$('<input/>', {
	type : 'button',
	id : 'myTvSettingsSave',
	'class' : 'miscbutton2',
	value : ' SAVE '
}).appendTo('#favForm #myTvSettings .body');

document.getElementById('myTvSettingsButton').addEventListener('click', function(){
	$('#myTvSettings').show();
});

document.getElementById('myTvSettingsClose').addEventListener('click', function(){
	$('#myTvSettings').hide();
});
document.getElementById('myTvSettingsSelectAll').addEventListener('click', function(){
	$('#favForm tr td:nth-child(5) input').attr('checked','checked');
});

document.getElementById('myTvSettingsSave').addEventListener('click', function(){
	var mytvsettingssave = $('#myTvSettings input[type="checkbox"]:checked');
	var final = '';
	mytvsettingssave.each(function(){
		var values = $(this).val();
		final += values+',';
	});
	final = final.substring(0, final.length - 1)
	// alert(final);
	GM_setValue('settings', final);
	settings_array = final.split(',');
	//alert('Saved');
	console.log(settings_array);
	$('#myTvSettings').hide();
});

document.getElementById('myTvSettingsApply').addEventListener('click', function(){
	if(settings_array) {
		$.each(settings_array, function(index, value){
			$('#favForm tr td:nth-child(3) a:contains("'+value+'")').parent().parent().find('td:nth-child(5) input').attr('checked','checked');
		});
	}
});
document.getElementById('myTvSettingsDeselect').addEventListener('click', function(){
	$('#favForm tr td:nth-child(5) input:checked').removeAttr('checked');
});