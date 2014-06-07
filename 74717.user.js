// ==UserScript==
// @name           Super Hacker News
// @namespace      http://news.ycombinator.com
// @description    Hacker News
// @include        http://news.ycombinator.com/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
function GM_wait(){
	if(typeof unsafeWindow.jQuery == 'undefined'){
		window.setTimeout(GM_wait,100);
	}
	else {
		$ = unsafeWindow.jQuery;
		url = util.arrayGet(location.href.split('#'), 0).replace('http://', '');
		var applyTo = [ '/newest', '/news', '/ask', '/x?fnid='];
		if(url == 'news.ycombinator.com/'){
			hnu.setup()
		}
		else{
			for(i in applyTo){
				if(url.indexOf('news.ycombinator.com'+applyTo[i]) > -1){
					hnu.setup();
					break;
				}
			}
		}
	}
}
GM_wait();

hnu = {
	setup : function(){
		var trs = $('tr');
		var next = false;
		$(trs[2]).attr('id', 'cont');
		$(trs[3]).attr('id', 'main');
		$('table', '#main').first().css('width', '100%');

		//Apply our styles & base html
		$('head').append('<style type="text/css">'+hnu.styles+'</style>');
		$('#cont')
		.prepend('<div id="hnu_loading"><img src="http://nicetranslator.com/hnu/ajax-loader.gif"/></div>')
		.prepend('<iframe class="hnu_frame" id="hnu_comms" src="#" style="display:none; height:'+($(window).height() - 100)+'px"></iframe>')
		.prepend('<iframe class="hnu_frame" id="hnu_art" src="#" style="display:none; height:'+($(window).height() - 100)+'px"></iframe>')
		.prepend('<iframe class="hnu_frame" id="hnu_user" src="#" style="display:none; height:'+($(window).height() - 100)+'px"></iframe>')
		.prepend(''+
		'<div id="hnu_artnav">'+
		'<ul><li><a href="#" id="hnu_showArts" class="hnu_navLink">News</a></li>'+
		'<li><a href="#" id="hnu_showArt" class="hnu_navLink">Article</a></li>'+
		'<li><a href="#" id="hnu_showComms" class="hnu_navLink">Comments</a></li>'+
		'<li><a href="#" id="hnu_showUser" class="hnu_navLink"></a></li>'+
		'<li class="hnu_vote"><a href="#" id="hnu_voteDn" class="hnu_navLink hnu_vote">&#x25BC;</a></li>'+
		'<li class="hnu_vote"><a href="#" id="hnu_voteUp" class="hnu_navLink hnu_vote">&#x25B2;</a></li>'+
		'<li id="hnu_voteCt">161</li>'+
		'</ul></div><div style="clear:both; display:none;"><img src="http://news.ycombinator.com/favicon.ico"/></div>');

		//Make sea of trs useful
		var artid = 0; var artnum = 0;
		$('tr', $(trs[3])).each(function(i){
			if(!next){
				$(this).attr('id', 'waiting');
				if($(this).children().length == 2){
					if($('span', $(this)).length > 0){
						artid = $('span', $(this)).attr('id').split('_');
						artid = artid[1];
						$(this)
							.attr('class', 'hnu_artData')
							.attr('id', 'hnu_artData-'+artid);
						$(util.arrayGet($('a', '#hnu_artData-'+artid), 0))
							.attr('id', 'hnu_artUser-'+artid)
							.attr('class', 'hnu_artUser');
						$(util.arrayGet($('a', '#hnu_artData-'+artid), 1))
							.attr('id', 'hnu_artComms-'+artid)
							.attr('class', 'hnu_artComms');
						$('a', '#waiting').each(function(){
							if(!$(this).attr('id')){
								$(this)
									.attr('class', 'hnu_artLink')
									.attr('id', 'hnu_artLink-'+artid)
							}
						});
						$('td', '#waiting').each(function(i){
							if(i != 2){
								$(this).hide();
							}
						});
						$('#waiting')
							.attr('class', 'hnu_artHead')
							.attr('id', 'hnu_artHead-'+artid);
						next = true;
					}
					else{
						$(this).attr('id','hnu_'+Math.floor(Math.random()*1000));
						$('#waiting').attr('id', 'hnu_'+Math.floor(Math.random()*1000));
					}
				}
			}
			else{
				next = false;
				//Add to article list
				var art = {};
				art.id = artid;
				var artData = $('a', '#hnu_artData-'+art.id);
				art.headline = $('#hnu_artLink-'+art.id).text();
				art.url = $('#hnu_artLink-'+art.id).attr('href');
				art.score = util.arrayGet($('#score_'+art.id).text().split(' '), 0);
				art.user = $(artData[0]).text();
				art.numComments = util.arrayGet($(artData[1]).text().split(' '), 0);
				art.commentStr = util.ucfirst(util.arrayGet($(artData[1]).text().split(' '), 1));
				art.voteUp = $('a#up_'+art.id).length > 0 ? $('a#up_'+art.id).attr('href') : false;
				art.voteDn = $('a#down_'+art.id).length > 0 ? $('a#up_'+art.id).attr('href') : false;
				if(art.numComments == 'discuss'){
					art.commentStr = 'Comments';
					art.numComments = 0;
				}
				hnu.arts.push(art);
				hnu.artById[art.id] = artnum;
				artnum++;
			}
		});
		hnu.selectArt(0);

		//Events
		$(document).keydown(hnu.keyDown).keyup(hnu.keyUp);
		$('.hnu_artLink').click(function(){hnu.showPanel('art', $(this)); return false;});
		$('.hnu_artComms').click(function(){hnu.showPanel('comms', $(this)); return false;});
		$('.hnu_artUser').click(function(){hnu.showPanel('user', $(this)); return false;});
		$('#hnu_showArts').click(function(){hnu.showPanel('arts'); return false;}).addClass('hnu_navLink_on');
		$('#hnu_showArt').click(function(){hnu.showPanel('art'); return false;});
		$('#hnu_showComms').click(function(){hnu.showPanel('comms'); return false;});
		$('#hnu_showUser').click(function(){hnu.showPanel('user'); return false;});
		$('#hnu_voteUp').click(hnu.vote);
		$('#hnu_voteDn').click(hnu.vote);

		//Sites like NYTimes try to take us to a new page, stop them
		$(window).bind('beforeunload',
			function(){
			if(hnu.noUnload){
				hnu.noUnload = false;
				return "---\n\nThis content provider wants you to go to their page.\n\nCancel keeps you here.\n\n----";
			}
			else{
				return;
			}
		});
	},
	selectArt : function(num){
		hnu.onArt = num;
		var art = hnu.arts[num];
		$('.hnu_artHead').removeClass('artSelected');
		$('.hnu_artData').removeClass('artSelected');
		$('#hnu_artHead-'+art.id).addClass('artSelected');
		$('#hnu_artData-'+art.id).addClass('artSelected');
		$('#hnu_showArt').text((art.headline.length > 40 ? art.headline.substr(0, 40) + '...' : art.headline));
		$('#hnu_voteCt').text(art.score);
		$('#hnu_showComms').text(art.numComments+' '+art.commentStr);
		$('#hnu_showUser').text(art.user);
		$('#hnu_voteUp').attr('href', art.voteUp).parent().css('display', art.voteUp ? 'block' : 'none');
		$('#hnu_voteDn').attr('href', art.voteDn).parent().css('display', art.voteDn ? 'block' : 'none');
		if(hnu.viewing){
			hnu.loadArt();
		}
	},
	loadArt : function(){
		if(hnu.loaded === hnu.onArt){
			return false;
		}
		var art = hnu.arts[hnu.onArt];
		hnu.noUnload = true;
		$('#hnu_loading').show();

		document.title = art.headline;

		//Load Article
		$('#hnu_art')
			.attr('src', art.url)
			.load(function(){
				hnu.noUnload = false;
				$('#hnu_loading').hide();
				if(art.url.indexOf('http://') < 0){
					hnu.frameScript('hnu_art');
				}
			});

		//Load Article Comments
		$('#hnu_comms')
			.attr('src', 'http://news.ycombinator.com/item?id='+art.id)
			.load(function(){
				hnu.frameScript('hnu_comms');
			});

		//Load Article User
		$('#hnu_user')
			.attr('src', 'http://news.ycombinator.com/user?id='+art.user)
			.load(function(){
				hnu.frameScript('hnu_user');
			});
		hnu.loaded = hnu.onArt;
	},
	showArts : function(){
		hnu.resetFrames();
		$('#hnu_loading').hide();
		$('.hnu_frame').hide();
		$('#main').show();
		$('.hnu_navLink').removeClass('hnu_navLink_on');
		$('#hnu_showArts').addClass('hnu_navLink_on');
		document.title = "Hacker News";
		hnu.viewing = false;
	},
	showArt : function(){
		$('#main').hide();
		$('.hnu_frame').hide();
		$('#hnu_artnav').show();
		$('.hnu_navLink').removeClass('hnu_navLink_on');
		$('#hnu_showArt').addClass('hnu_navLink_on');
		$('#hnu_art').show();
		hnu.viewing = true;
		return false;
	},
	showComms : function(){
		$('#main').hide();
		$('.hnu_frame').hide();
		$('#hnu_comms').show();
		$('.hnu_navLink').removeClass('hnu_navLink_on');
		$('#hnu_showComms').addClass('hnu_navLink_on');
		hnu.viewing = true;
	},
	showUser : function(){
		$('#main').hide();
		$('.hnu_frame').hide();
		$('#hnu_user').show();
		$('.hnu_navLink').removeClass('hnu_navLink_on');
		$('#hnu_showUser').addClass('hnu_navLink_on');
		hnu.viewing = true;
	},
	showPanel : function(num, elm){
		var panels = {'arts' : 0, 'art' : 1, 'comms' : 2, 'user': 3};
		var panelFncs = [hnu.showArts, hnu.showArt, hnu.showComms, hnu.showUser];
		if(elm != undefined){
			var artid = util.idData(elm);
			hnu.selectArt(hnu.artById[artid]);
		}
		if(typeof num != "number"){
			num = panels[num];
		}
		num = (num < 0) ? 3 : num;
		num = (num > 3) ? 0 : num;
		hnu.loadArt();
		panelFncs[num]();
		hnu.onPanel = num;
	},
	vote : function(){
		var ping = new Image();
		ping.src = $(this).attr('href');
		if($(this).attr('id') == 'hnu_voteUp'){
			$('#hnu_voteCt').text((+$('#hnu_voteCt').text())+1);
		}
		else{
			$('#hnu_voteCt').text((+$('#hnu_voteCt').text())-1);
		}
		$('#score_'+hnu.arts[hnu.onArt].id).text($('#hnu_voteCt').text() + ' points');
		$('li.hnu_vote').hide().children().blur();
		return false;
	},
	keyDown : function(e){
		switch(e.keyCode){
			case 16:
				hnu.shiftDn = true;
				break;
			case 17:
				hnu.ctrlDn = true;
				break;
			case 37: // <
			case 65: // a
				if(hnu.keyShortsOn){
					util.keyStop(e);
					hnu.showPanel(hnu.onPanel-1);
				}
				break;
			case 38: // ^
			case 87: // w
				if(hnu.keyShortsOn && hnu.onArt > 0){
					util.keyStop(e);
					hnu.selectArt(hnu.onArt-1);
				}
				break;
			case 39: // >
			case 68: // d
				if(hnu.keyShortsOn){
					util.keyStop(e);
					hnu.showPanel(hnu.onPanel+1);
				}
				break
			case 40: // v
			case 83: //
				if(hnu.keyShortsOn && hnu.onArt < hnu.arts.length){
					util.keyStop(e);
					hnu.selectArt(hnu.onArt+1);
				}
				break;
		}
		if(hnu.shiftDn && hnu.ctrlDn){
			hnu.keyShortsOn = !hnu.keyShortsOn;
		}
	},
	keyUp : function(e){
		switch(e.keyCode){
			case 16:
				hnu.shiftDn = false;
				break;
			case 17:
				hnu.ctrlDn = false;
				break;
		}
	},
	resetFrames : function(){
		hnu.loaded = false;
		$('.hnu_frame').each(function(){
			var elm = $(this);
			if(elm.attr('id') == 'hnu_art'){
				elm.attr('src', '').load(function(){
					hnu.resetFrame(elm);
				});
			}
			else{
				hnu.resetFrame(elm);
			}
		});
	},
	resetFrame : function(elm){
		if(elm.attr('src').indexOf('news.ycombinator') > -1){
			iframe = document.getElementById(elm.attr('id'));
			iframe.contentDocument.write('');
		}
	},
	frameScript : function(frame){
		var iframe = document.getElementById(frame);
		var doc = iframe.contentDocument;
		var ijq = doc.createElement('script');
		ijq.setAttribute('type', 'text/javascript');
		ijq.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js');
		var scrpt = doc.createElement('script');
		scrpt.setAttribute('type', 'text/javascript');
		scrpt.innerHTML = "var trs = $('tr'); if($('table', trs[0]).length == 1){ $(trs[0]).remove(); } $('table').css('width', '100%')";
		doc.body.appendChild(scrpt);
	},
	arts : [], artById : [], onPanel : 0, keyShortsOn : true,
	styles : ''+
		' #cont{ height:56px !important; } '+
		' #main > td{ border-top: 0px solid rgb(239, 238, 224); padding-top: 10px; width: 100px ! important; } '+
		' .hnu_frame{ position:relative; z-index:10; }' +
		' #hnu_art{ display:none; border:0; border-top:0px solid #EFEEE0; width:100%; margin-top:15px; } '+
		' #hnu_comms{ display:none; border:0; border-top:0px solid #EFEEE0; width:100%; margin-top:15px; } '+
		' #hnu_user{ display:none; border:0; border-top:0px solid #EFEEE0; width:100%; margin-top:15px; } '+
		' #hnu_artnav{ width:98%; margin-left:-28px; margin-top:8px; border:0; } '+
		' #hnu_artnav ul{ list-style-type:none; width:100%; } '+
		' #hnu_artnav li{ float:left;	margin-right:10px; padding:1px;	background:#ddd; -moz-border-radius:5px; } '+
		' #hnu_artnav li a{ display:block; padding:6px 12px; background:url(http://nicetranslator.com/hnu/button_bg_off.png); border:1px solid #fff; -moz-border-radius:4px; font-size:.9em; color:#444; text-shadow:1px 1px 0px #fff; } '+
		' #hnu_artnav li a:hover{ color:#999; } '+
		' .hnu_navLink_on{ background:url(http://nicetranslator.com/hnu/button_bg_on.png) !important; } '+
		' .hnu_artHead{ display:block; padding:8px 14px 3px; }'+
		' .hnu_artData{ display:block; padding:8px; padding-top:0; padding-left:14px; }'+
		' .artSelected{ width:100%; margin-left:-2px; padding-right:38px; margin-right:-49px; background:#fefefe; border-left:2px solid #FF6A00; }'+
		' #hnu_loading{ display:none; width:100%; text-align:center; position:absolute; left:0; top:300px; z-index:1; } '+
		' .hnu_vote{ float:right !important; display:none; }'+
		' #hnu_voteCt{ float:right !important; background:none !important; font-size:1.2em; margin-top:5px; color:#444; text-shadow:1px 1px 0 #fff; }'
};

util = {
	arrayGet : function(ar, i){
		return ar[i];
	},
	idData : function(elm){
		if($(elm).attr('id') != undefined){
			var idData = $(elm).attr('id').split('-');
			return idData[1];
		}
		else{
			return false;
		}
	},
	keyStop : function(e){
		e.stopPropagation();
		e.preventDefault();
	},
	ucfirst : function(str){
		str += '';
		var f = str.charAt(0).toUpperCase();
		return f + str.substr(1);
	}
}