// ==UserScript==
// @name           Omegle User Vs. Cleverbot
// @namespace      Chathurga
// @include        http://cardassia.omegle.com/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

$.post = function(url, param, callback) {
	GM_log($.param(param));
	GM_xmlhttpRequest({
		method: "POST",
		url: url,
		data: $.param(param),
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			callback(response.responseText);
		}
	});
}

$.get = function(url, callback) {
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(response) {
			callback(response.responseText);
		}
	});
}

// load the functions from cleverbot.com
var encrypt, parse, ty;
$.get('http://www.cleverbot.com/playscript.js?play=&emojs=1&emo1=', function(resp) {
	var script = document.createElement('script'); // create a script element
	script.innerHTML = resp; // attach the ripped javascript
	document.body.appendChild(script); // load the script into the page
	
	encrypt = unsafeWindow.HH; // hashing function
});

$.get('http://www.cleverbot.com', function(resp) {
	var text = resp.slice(resp.indexOf('<!--') + 4, resp.indexOf('//--></SCRIPT>')); // get the embedded Javascript
	var script = document.createElement('script'); // create a script element
	script.innerHTML = text; // attach the ripped javascript
	document.body.appendChild(script); // load the script into the page
	
	unsafeWindow.oD = 'www.cleverbot.com'; // pretend the requests are coming from cleverbot's domain
    //encrypt = unsafeWindow.HH; // hashing function
	parse = unsafeWindow.ex; // function to parse out information from Cleverbot's response
	ty = unsafeWindow.ty;
});

var base, extra, history, thinking, read;
function start() {
	// options that will be used to generate the hash
	base = {
		stimulus: '', start: 'y', sessionid: '',
		vText8: '', vText7: '', vText6: '', vText5: '', vText4: '', vText3: '', vText2: ''
	}

	// other options
	extra = {
		icognoid: 'wsf', icognocheck: '',
		prevref: '', lineref: '',
		typing: '',	sub: 'Say', islearning: '1', cleanslate: 'false',
		emotionaloutput: '', emotionalhistory: '', asbotname: '', ttsvoice: ''
	}

	history = []; // array to store chat history
	thinking = false; // bool to mark if the bot is loading answer
	
	read = 0; // the amount of Stranger messages which have been read
	
	$('#botLog').parent().remove(); // remove the old log
}

// list of words to replace with dumbed down versions
var replace = {
	'your': 'ur',
	'youre': 'ur',
	'you': 'u',
	'are': 'r',
	'because': 'coz'
}

var timer, time = 0;

function botReply(reply) {
	// calculate the amount of time to wait before posting the message
	var wait = (reply.length * 100) + 4000 - time;
	wait = wait < 0 ? 0 : wait;
	
	time = 0; // reset the timer;
	
	botLog('Delaying for ' + (wait / 1000) + ' second(s)...');
	// delay the message then post it
	setTimeout(function() {
		thinking = false; // start reading lines again
		
		$('#botLoad').remove();
		$('.chatmsg').val(reply);
		// use the page's JS to fire the click event on the send button
		//unsafeWindow.document.getElementsByClassName('sendbtn')[0].dispatchEvent('click');
        $('.sendbtn:first').click();
		//unsafeWindow.document.getElementsByClassName('sendbtn')[0].click();
	}, wait);
}

function botAsk(question) {
	thinking = true; // mark the bot as loading
	botLog('Loading...');
	
	base.stimulus = escape(question); // store the question being asked
	extra.icognocheck = encrypt($.param(base)); // generate the hash
	all = $.extend(base, extra); // join the two param objects
	
	// start a timer to measure how long cleverbot has been thinking
	// this is to stop it from posting long messages way too fast
	timer = setInterval(function() {
		time += 100;
	}, 100);
	
	// send the question to cleverbot
	$.post('http://www.cleverbot.com/webservicefrm', all, function(resp) {
		GM_log(resp)
		clearInterval(timer); // stop the timer
		
		// if the cleverbot servers are busy...
		if (resp.indexOf('our servers are currently too busy') != -1) {
			botLog('Trying again...', 'Cleverbot (Server Busy)'); // log a busy message
			botAsk(question); // ask the question again
			return; // exit
		}
		
		// store the needed information
		base.sessionid = parse(resp, 'sessionid' + ty, '"');
		extra.prevref = parse(resp, 'prevref' + ty, '"');
		extra.lineref = parse(resp, 'lineRef' + ty, '"');
		
		// parse the reply
		reply = resp.substr(4 - (resp.length - resp.indexOf("!-->")));
		reply = reply.substr(0, reply.indexOf("<!--"));
		reply = unescape($.trim(reply));
		
		botLog(reply, 'Cleverbot'); // log Cleverbot's reply
		
		history.unshift(escape(question)); // add the question to the history
		history.unshift(escape(reply)); // also add the response
		
		// send the recent messages to the options
		for (var i = 0; i <= 6 && history[i]; i++)
			base['vText' + (i + 2)] = history[i];
		
		// dumb down the reply before posting it
		reply = reply.toLowerCase(); // make all letter lower case
		reply = reply.replace(/'/g, ''); // remove apostrophes
		reply = reply.replace(/cleverbot/g, 'maria'); // don't allow cleverbot to say its name
		
		// replace certain words with dumbed down versions
		var words = reply.split(' ');
		for (var i in words)
			for (var j in replace)
				if (words[i] == j)
					words[i] = replace[j];
		
		reply = words.join(' '); // join the words back together again
		
		// if there's a full stop at the end of the sentence, remove it
		if (reply.substr(-1) == '.' && reply.substr(-2) != '.')
			reply = reply.substr(0, reply.length - 1);
		
		botReply(reply); // post the response
	});
}

setInterval(function() {	
	var messages = $('.strangermsg'); // get all the Stranger's responses
	
	// if a new chat has started, clear the log and amount of read messages
	if (read > messages.length)
		start(); // reset the options
		
	// don't process a question if the bot is loading an answer
	if (thinking == true)
		return;
	
	// if the Stranger has said something new, process the question
	if (read < messages.length) {
		// create the log box
		if (read == 0) {
			createLog();
        }
		
		read = messages.length; // store the new amount of messages
		
		// parse the question
		var question = $.trim(messages.eq(read - 1).text().replace('Stranger:', ''));
		
		botLog(question, 'Stranger'); // log what Cleverbot read
		
		// wait 2 seconds before sending the typing event
		setTimeout(function() {
            $('.chatmsg:first').trigger('keydown');
            /*
            unsafeWindow.document.getElementsByClassName('chatmsg')[0].focus();
            var evt = unsafeWindow.document.createEvent('HTMLEvent');
            evt.initKeyEvent('keydown', false, true);
            unsafeWindow.document.getElementsByClassName('chatmsg')[0].dispatchEvent(evt);
            */
		}, 2000);
		
		botAsk(question); // send the question to Cleverbot
	}
}, 500);

function fire(el,evttype) {
   }


function createLog() {
	var logWrap = $('<div>')
		.css({
			height: '100px',
			width: '300px',
			cssFloat: 'right',
			padding: '5px',
			marginRight: '30px',
			marginTop: '10px',
			border: '1px solid #ccc',
			MozBorderRadius: '5px',
			background: 'white'
		});
	
	var log = $('<div>')
		.attr('id', 'botLog')
		.css({
			height: '100px',
			width: '300px',
			position: 'absolute',
			zIndex: 5,
			overflow: 'auto',
			fontSize: '75%',
			fontFamily: 'Tahoma'
		});
		
	$('.logbox').css('float', 'left');
		
	logWrap.append(log);
	$('.logwrapper').append(logWrap);
}

function botLog(text, name) {
	var bot = document.getElementById('botLog');
	if (!bot)
		return;
	
	$('#botLoad').remove();
	
	var log = $('<div>')
		.html(
			(name ? '<span style="font-weight: bold; color: ' + ((name == 'Stranger') ? 'red' : 'blue') + '">' + name + ':</span> ' : '') + text
		)
		.attr('id', (name ? '' : 'botLoad'));
		
	$(bot).append(log);
	bot.scrollTop = bot.scrollHeight;
}

start(); // set the initial options
