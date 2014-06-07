// ==UserScript==
// @name v2ex's collect function
// @auth lzyy <healdream@gmail.com>
// @description add collect function to v2ex
// @version    1.0
// @include    http://v2ex.com/t/*
// @include    http://www.v2ex.com/t/*
// @include    http://v2ex.appspot.com/t/*
// ==/UserScript==

var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
		GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

var css = 
	'#Content .box a.like {'+
	'-moz-border-radius:3px 3px 3px 3px;' +
	'background:url("http://forrst.com/assets/images/icons/stream_icons.png?1279746200") no-repeat scroll 0 5px #F3F3F1;' +
	'color:#858377;' +
	'display:block;' +
	'font-size:16px;' +
	'font-weight:bold;' +
	'margin-bottom:5px;' +
	'padding:19px 15px 6px;' +
	'text-align:center;' +
	'float:right;' +
	'text-decoration:none;' +
	'}' +
	'#Content .box a.like:hover {' +
	'background-color:#e4e3de;' +
	'background-position:0 -55px;' +
	'}' +
	'#Content .box a.liked {' +
	'background-color:#e4e3de;' +
	'background-position:0 -115px;' +
	'}'
;

var post_url = 'http://util.leezhong.com/v2ex/collect/server.php';
var username;
var node_id;

// All your GM code must be inside this function
function letsJQuery() {
	addGlobalStyle(css);
	username = findName();
	extractNid();
	if (username === false) {
		return ;
	}
	// let's start
	addClctBtn();
	checkHasClcted();
	createBox();
	fetchMyNodes();
	$('#Content a.like').click(function(e){
		e.preventDefault();
		tglClct($(this));
	});
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function findName() {
	href = $('#Navigation li a').eq(1).attr('href');
	if (href.search('/member/') != -1) {
		return href.substring(8);
	}
	return false;
}

function addClctBtn(){
	$('#Content .box .content:first').prepend(
		'<a class="like" href="#"></a>'
	);
}

function checkHasClcted() {
	$.getJSON(post_url+'?username='+username+'&node_id='+node_id+'&action=check&callback=?',function(data){
		if (data == 'yes') {
			$('#Content .box .content:first a.like').addClass('liked');
		}
	});
}

function tglClct($target) {
	var action = 'add';
	var node_title = $('head title').text().substring(7);
	if ($target.hasClass('liked')) {
		action = 'remove';
	}
	$.getJSON(post_url+'?username='+username+'&node_title='+node_title+'&node_id='+node_id+'&action='+action+'&callback=?', function(data){
		if (data == 'ok') {
			if ($target.hasClass('liked'))
				$('#Content .box .content:first a.like').removeClass('liked');
			else
				$('#Content .box .content:first a.like').addClass('liked');
		}
	})

}

function extractNid() {
	var loc = location.toString();
	if (loc.indexOf('#') !== -1) {
		node_id = loc.substring(loc.indexOf('/t/')+3, loc.indexOf('#'));
	} else {
		node_id = loc.substring(loc.indexOf('/t/')+3);
	}
}

function createBox() {
	$('#Rightbar').append('<div class="sep20"></div><div id="myCollect" class="box"><div class="cell"><span class="fade">我收藏的文章</span></div><div class="inner"><ul></ul></div></div>');
}

function fetchMyNodes() {
	$.getJSON(post_url+'?username='+username+'&action=get&callback=?', function(data){
		var li = '';
		var loc = window.location.toString();
		var base_url = loc.substr(0, loc.indexOf('/t/'));
		$.each(data, function(i, val){
			li += '<li><a href="'+base_url+'/t/'+val.node_id+'">'+val.node_title+'</a></li>';
		});
		$('#myCollect ul').append(li);
	})
}


