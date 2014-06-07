// update url: http://userscripts.org/scripts/show/442466
// ==UserScript==
// @name       UstreamFilter
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.ustream.tv/channel/*
// @copyright  2012+, You
// ==/UserScript==
// id filter list

filter_list = [ 'noidodaseooich' , 'xijingping', 'xiaomihu'];
int = -1;
initialize_interval = -1;
initialize = false;
records = undefined;

function start(tpe, timer, counter_bt) {
	if (tpe === 'block') {
		var counter = 0;
		html = counter_bt.html();
		var inter = setInterval(function () {
			console.log('counter ', counter);
			counter += 1;
			counter_bt.html(html + counter);
			if (counter >= timer) {
				clearInterval(inter);
				counter = 0;
				start('block_start', timer, counter_bt)
			}
		}, 1000);
		counter_bt.data('interval_id', inter)
	} else if (tpe == 'block_start') {
		console.log('block start');
		s = '';
		for (var n in filter_list) {
			if (filter_list[n]) {
				s += ' img[alt*="' + filter_list[n].trim() + '"],'
			}
		}
		id_sections = $($('iframe#SocialStream').contents().find('div.msgWrapper'));

		if ( int < 0) {
			int = setInterval(function () {
				elements = id_sections.find(s).parent().parent().parent();
				elements.hide()
			}, 500);
		} else {
			clearInterval(int);
			int = setInterval(function () {
				elements = id_sections.find(s).parent().parent().parent();
				elements.hide()
			}, 500);
		}
	} else if (tpe == 'unblock') {
		clearInterval(int);
	}
}

function appendBtByRange(lst, from, to){
	r = []
	for (var i in lst){
		if ( i >= from){
			if (i < to){
				tar = $(lst[i]).parent()
				if ( tar.data('added') === undefined){
					addButtons( tar)
					records += 1
				}
			}else{
				return
			}
		}
	}
}
function addButtons(tar) {
	bt = '<a name="block" state="true">[block]</a>   <a name="unblock" state="false" style="display:none">[cancel]</a>';
	tar.prepend(bt);
	tar.data('added', true)
}
function appendBtByInterval(){
	user_selector = 'li span.username';
	target = $('iframe#SocialStream').contents().find(user_selector);
	d = target.length - records;
	appendBtByRange(target, 0, d);
};

function getReady() {
	user_selector = 'li span.username';
	target = $('iframe[src*="ustream.tv/socialstream"]').contents().find(user_selector);
	tmp = undefined;
	console.log('9999999999999999999 target = ', target);
	if (target.length == 0) {
		console.log('target == []');
		setTimeout(getReady, 1000);
		return
	}
	console.log('start ########################################');
	function addButtons(tar) {
		bt = '<a name="block" state="true">[block]</a>   <a name="unblock" state="false" style="display:none">[cancel]</a>';
		tar.prepend(bt)
	}

	records = target.parent().length;
	addButtons(target.parent());
	block_bt = target.parent().find('a[name=block]');
	unblock_bt = target.parent().find('a[name=unblock]');


	unblock_bt.click(function () {
		start('unblock');
		this.setAttribute('state', 'false');
		this.setAttribute('style', 'display:none');
		$(this).prev().attr('style', 'display:normal');
		$(this).prev().attr('state', 'true');
		id = $(this).parent().find('span.username>a').text();

		filter_list.pop(id);

		clearInterval($(this).data('interval_id'));
		console.log('id = ', id);
		console.log('interval = ', $(this).data('interval_id'))
	})

	block_bt.click(function () {
		state = this.getAttribute('state');
		if (state == 'false') {
		} else if (state == 'true') {
			this.setAttribute('state', 'false');
			this.setAttribute('style', 'display:none');
			tmp = this;
			$(this).next().attr('style', 'display:normal');
			id = $(this).parent().find('span.username>a').text();

			start('unblock', 3,3);
			filter_list.push(id.trim());
			console.log('push id = ', id);
			//target_id = $(this).parent().parent().parent().parent().find('div.msgContent a[href*=' + id + ']')
			//target_id.data( 'orig_content' ,target_id.parent().contents()[5])
			start('block', 3, $(this).next())
		}
	})

	setInterval(appendBtByInterval, 800)
}

function jQueryReady(){
	//setTimeout(jQueryReady,3500)
	try{
		jQuery(document).ready(function(){
			clearInterval(initialize_interval);
			console.log('in window');
			setTimeout(getReady, 1000);
		})
	}catch(e){
		if (initialize == false){
			console.log('not in window')
			var script = document.createElement('script');
			script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
			script.type = 'text/javascript';
			document.getElementsByTagName('head')[0].appendChild(script);
			initialize = true
		}
		setTimeout(eval('jQueryReady'),1000)
	}
}

setTimeout(eval('jQueryReady'),1500);
