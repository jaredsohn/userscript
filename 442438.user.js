// ==UserScript==
// @name        beeminder tweaks
// @namespace   alice0meta.beeminder
// @version     0.1
// @description a collection of miscellaneous beeminder-related tweaks
// @match       http*://*.beeminder.com/*
// @match       https://www.hipchat.com/*
// ==/UserScript==

// todo‽: consider writing an svg graph generator

// experimental
function s(v,s) {return eval('(function(v){'+s.replace(/\./g,'v.')+';return v})')(v)}
/////  THE FOLLOWING IS COPIED FROM ELSEWHERE  ///// lang-alpha
// time
Date.now_s = function(){return Date.now() / 1000}
var run = {
	in:   function(s,f){return {id:setTimeout( f,s*1000), cancel:function(){cancelTimeout( this.id)}}},
	every:function(s,f){return {id:setInterval(f,s*1000), cancel:function(){cancelInterval(this.id)}}},
	tomorrow:function(f){
		var start = new Date()
		var cancel = false
		var r = run.in(new Date(start).setHours(24,0,0,0)/1000 - start/1000,
			function t(){if (new Date().getDate() === start.getDate()) run.in(1,t); else {if (!cancel) f()}})
		return {cancel:function(){cancel = true; r.cancel();}}}
}

//function import_jquery(){var t = document.createElement('script'); t.src = '//code.jquery.com/jquery-latest.min.js'; document.getElementsByTagName('head')[0].appendChild(t)}
//import_jquery(); $('head').append('<style media="screen" type="text/css"> body { -webkit-filter: invert(100%) hue-rotate(180deg) }</style>')

if (location.hostname.match(/hipchat\.com$/)) {
	// dark theme
	$('head').append('<style media="screen" type="text/css">'+
		'body > div.logo,'+
		'#tabs,'+
		'#status_ui,'+
		'.preview,'+
		'body { -webkit-filter: invert(100%) hue-rotate(180deg) }</style>')
} else if (location.hostname.match(/beeminder\.com$/)) {
	function this_goal(){var r = location.pathname.match(/^(\/[^\/]+)(?:\/goals)?(\/[^\/]+).*/); if (r && r[1]!=='settings' && r[1]!=='email') return r[1]+'/goals'+r[2]}

	if (this_goal()) {
		// remove misc elements
		$('#header').remove()
		$('#footer').remove()
		$('.content').css({'padding-top':'0px', 'padding-bottom':'0px'})
		$('#goal-stats').remove()
		$('#goal-legend').remove()

		// dark theme
		$('head').append('<style media="screen" type="text/css">'+
			'body > div.content { min-height:100% }'+
			'div.header,'+
			'#goal-user > div.content-container > div.user-profile > a > img,'+
			'.dark-theme, body > div.content { -webkit-filter: invert(100%) hue-rotate(180deg) }</style>')
		;[0.3,0.4,1,2,3,4,5,6,7,8,9,10].map(function(time){run.in(time,function(){$('#uvTab').css({'border-color':'inherit'})})})

		// provide convenient link to datapoints in sane order
		$('#goal-box > div.header > div.control').append($('<div class="settings"><a href="'+this_goal()+'/datapoints?dir=desc&sort=measured_at"><div style="background: url(https://raw.githubusercontent.com/alice0meta/userscripts/master/userscripts/datapoints_icon.png); background-repeat: no-repeat; height: 36px; width: 36px; background-size:32px 32px; background-position: 2px;"></div></a></div>'))

		// if on a graph page, add a graph tooltipthingy
		if ($('#graph-image').length>0) {
			var graph = $('#graph-image')
			var zoom_div; $('body').append(zoom_div = $('<div class="dark-theme" style="position:fixed; display:none; height:100px; width:100px; overflow:hidden; background:url('+graph[0].src+'); background-size:'+696*3+'px; border: 1px solid black; border-radius:100%">'))
			var zoom_on = false
			$(document).on('mousemove',function(e){
				var t = graph.offset()
				var x = e.pageX - t.left
				var y = e.pageY - t.top
				if ((0 <= x && x < graph.width() && 0 <= y && y < graph.height()) !== zoom_on)
					zoom_div.css({display:(zoom_on = !zoom_on)?'inline':'none'})
				if (zoom_on) {
					var w = zoom_div.width()
					var h = zoom_div.height()
					zoom_div.css({left:e.clientX - w/2, top:e.clientY - h/2, 'background-position':(-x*3+w/2)+'px '+(-y*3+h/2+10)+'px'})
				}
			})
		}

		// on this specific goal, display most recent datapoint
		if (this_goal()==='/alice0meta/goals/team') {
			//'< no request :c >'
			var t = $.map($('.recent-data > ol > li > span'),function(v){var t = $(v).attr('data-comment').match(/\| (.*)/); return [t?[t[1],parseInt($(v).text().match(/^(\d+)/)[1])]:undefined]}).filter(function(v){return v}).slice(-1)[0]; var data = t[0]; var day = t[1]
			var msg; $('body').append(msg = $('<div style="top:20px; left:20px; position:fixed; max-width:400px; font-family:monospace; text-align:left; padding:0px 3px; border: 1px solid #000; background-color:rgba(255,255,255,.7); white-space:pre-wrap">'))
			;(function t(){
				msg.text('alice-'+(s(new Date(),'.setDate(.getDate()-1)').getDate() === day? 'yesterday' : day)+' asks:\n'+data)
				run.tomorrow(t)})()
		}

		// datapoint deletion buttons: restyle, remove confirmation
		$('.delete_datapoint').css({padding:'0px 1em'}).removeAttr('data-confirm')

		// add another submit button in admin box
		$('.edit_goal.admin').last().find('fieldset:nth-child(2)').append($('<input class="btn" id="goal_submit_2" name="commit" type="submit" value="Submit">'))

		// remove dogfood mandate box
		if ($('#admin-links > div.content-container > h3').text()==='Dogfood Mandate')
			$('#admin-links').remove()
	}

	// make feedback button actually link to the feedback forums, although middle-click still doesn't work
	$('#uvTabLabel').attr('href','https://beeminder.uservoice.com/forums/3011-general')
}