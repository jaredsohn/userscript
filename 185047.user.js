// ==UserScript==
// @name        Dobrochan Reply Links
// @namespace   dc_replies
// @description Show replies at the bottom of every post.
// @include     *dobrochan.*
// @homepage    https://github.com/Unknowny/dobroscript
// @updateURL   https://github.com/Unknowny/dobroscript/raw/master/Dobrochan Reply Links.user.js
// @downloadURL https://github.com/Unknowny/dobroscript/raw/master/Dobrochan Reply Links.user.js
// @version     1.0.2
// ==/UserScript==

function l(a) { console.log(a) }
function $text(node) { return $(node).text(); }

function parseUrl(url) {//Hanabira ParseUrl() is broken
    m = (url || document.location.href).match( /https?:\/\/([^\/]+)\/([^\/]+)\/((\d+)|res\/(\d+)|\w+)(\.x?html)?(#i?(\d+))?/)
    return m ? {host:m[1], board:m[2], page:m[4], thread:m[5], pointer:m[8]} : {} ;
}

function showRevertRefl(a_to, a_from, rt) {
	if (a_to) setTimeout(function(){
		var a = $(rt).find('a').filterRef(a_from);
		a.removeAttr('onmouseover');
		if ( !$(a).parents('.spoiler')[0] ) a.css({'cursor':'default', 'color':'#445', 'font-weight':'bold'});
	}, 90);
}

$.fn.extend({
	appendRefToTarget:function() {
		return this.each(function() {
			var $a = $(this),
				a_to = !/[a-z]/.test( $a.text() ) && $a.text().match(/\d+/)[0], //ref id itself
				a_from = $a.parents('.post').attr('id').substr(5), //id of post that contain ref
				href = $a.attr('href');

			if (a_to)
				$('#post_' + a_to).find('.abbrev').append('<a ' +
					'onclick="Highlight(event, \''+a_from+'\')" ' +
					'onmouseover="ShowRefPost(event, \''+Hanabira.URL.board+'\', '+(Hanabira.URL.thread || a_to/*hack*/)+', ' +a_from+')" ' +
					'href="'+href+'" '+
					'style="font-size:70%;text-decoration:none;opacity:.8;font-style:italic;"'+
					'>&gt;&gt;'+a_from+'</a> ');
		});
	},
	filterRef:function(id) {
		return this.filter(function (){
			return id ? (new RegExp('\>\>'+id)).test( $text(this) ) : /\>\>\d\d/.test( $text(this) );
		});
	}
});

//work through default Hanabira functions
var oldBindRemoveRef = BindRemoveRef;
window.BindRemoveRef = function($a, rt) { //args: jquery a element, ref popup table element
	if ( !Hanabira.URL.board || /[a-z]/.test( $a.text() ) )
		{oldBindRemoveRef($a, rt); return;}

	function isRelPopup(node, a_to, op){
		var id = 'ref'+Hanabira.URL.board+(op?'-post':'-reply')+a_to;
		return node.id == id || $(node).parents('#'+id)[0];
	}
	function isOutsidePopups(e){ return !$(e.target).parents('.popup')[0] && !(e.target.className == 'popup'); }

	var to,
		a = $a[0],
		a_to = a.innerHTML.match(/\d+/)[0], 
		a_from = $(a).parents('.post, .popup').attr('id').match(/\d+/)[0],
		op = a_to == Hanabira.URL.thread;

	//begin AAAAAH!MONSTROSITY!
	$a.on('mouseleave', function(){
		clearTimeout(to);
		to = setTimeout(function(){ 

			$(document).one('mousemove', function tmp(e){
				if ( !isRelPopup(e.target, a_to, op) ) $(rt).remove();
			});

		}, 300);
	});
	$a.on('mouseenter', function(){
		clearTimeout(to);
	});

	$(rt).on('mouseleave', function(){
		to = setTimeout(function(){ 

			$(document).one('mousemove', function tmp(e){
				if ( isOutsidePopups(e) ) $('.popup').remove();
				else if ( isRelPopup(e.target, a_from, op) ) $(rt).remove();
			});

		}, 300);
	});
	$(rt).on('mouseenter', function(){
		clearTimeout(to);
	});
	//end AAAAAH!MONSTROSITY!

	showRevertRefl(a_to, a_from, rt);
}

/*--Main---------------------------------*/

Hanabira.URL = parseUrl(); //fix Hanabira
var refls = $('.message').find('a').filterRef().appendRefToTarget();