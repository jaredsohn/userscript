// ==UserScript==
// @name Download Unify
// @namespace http://userscripts.org/users/ZZZZZZZ/scripts
// @description	Common interface and minimum interaction on all those pesky filehostings.
// @author  Dither
// @version 2013.06.21-alpha1
// @include http://ryushare.com/*
// @include http://rapidgator.net/*
// @include http://uploaded.net/file*
// ==/UserScript==

/*
!!!Elements can be found by their selector or xpath!!!
!!!If page was reloaded pattern position perserved until page closed!!!
////
Pattern command list:
STOP: stop pattern execution until page reload.
RELOAD: same as STOP but will be ignored if it's a first command on a page.
CLICK: click element.
GO: goto url of element or direct adress using any window scope variable substituted in address as %%variablename%%.
Can have parameters: 1)URL with variables; 2) xpath/sel to hyperlink;
SOUND: play sound defined in SOUND_DATA.
WAIT[S]: pause execution for a number of seconds or search it automatically. With [] or without [S] title modification. 
Can have parameters: 1)number of seconds; 2) xpath/sel to timer; 3) no parameters (auto-search);
RECAPTCHA: show recaptcha dialog.
CAPTCHA: show custom captcha.
SCRIPT: run provided script.
*/

var DownloadUnify = (function() {
var fileservers = {
	org : { // TLD
		example : { //2LD ...
            // => if 3LD: {pattern:'..'}; www is unneded even if used
			pattern: 'CLICK input[role="test"] CAPTCHA WAIT 20 SOUND SCRIPT GO //span/a[contains(.,"Download me")]', 
			filename: 'span#file_name',
			filesize: 'li.file_size',
            script: 'document.addEventListener("load", fucntion(){alert("test")}, false);'
		}
	},
	net : {
		rapidgator: { pattern: 'WAITS 1 CLICK a.btn-free WAIT #table_header RELOAD SOUND RELOAD WAITS 1 CLICK .box-download a' },
        uploaded:  { pattern: 'CLICK button.free WAIT 30 SOUND' },
	},
	com : {
		ryushare: { pattern: 'CLICK input[name="method_free"] RELOAD SOUND WAIT CLICK #btn_download RELOAD WAITS 1 GO //span/a[contains(text(),"Click here to download")]' },
	},
};

// constructor
function DownloadUnify() {
	this.fileservers = fileservers;
	this.hostdata = null;
	this.timer_in_title = true;
	this.captcha_id = 'new_captcha';
    this.timer_on = false;
};

var page = window.location,
	proto = page.protocol,
	host = page.host;
	
//service
/** 
 * Logging function.
 * @param {Array|String} arguments Data to put to debug output.
 * */
var log = function log() {
    console.log('[DownloadUnify] ' + Array.prototype.slice.call(arguments));
}

var is_xpath = function(test) {
	if (test.indexOf('http') === 0) return false;
	return (~test.indexOf('/') || ~test.replace(/\s+\(/g,'(').indexOf('id(') || test[0] === '(');
};

var def = function(test) {
	return (typeof test !== 'undefined');
};

var success = function() {
	sessionStorage.setItem("last_succes", 1);
};

var failure = function() {
	sessionStorage.setItem("last_succes", 0);
};

var e = function(path) {
	var result;
	try {
		if (is_xpath(path))
			result = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		else
			result = document.querySelector(path);
		return !!result ? result : { textContent : '' };
	} catch (bug) {
		return { textContent : '' }
	}

};

var add_css = function(cssText) {
	var css = document.createElement('style');
	css.setAttribute('id', 'duCSS');
	css.setAttribute('type', 'text/css');
	css.appendChild(document.createTextNode(cssText));
	(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(css);
};

var add_script = function(url, onload, id){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (id) script.id = id;
    script.text = url;
    script.addEventListener('load', onload.bind(self) , false);
    return document.body.appendChild(script);
};

var NUMBER_XPATH = '//span[(@id or @class) and number(normalize-space(.)) = number(normalize-space(.)) and number(normalize-space(.)) < 130 ]',
	SECONDS_REGEXP = /([\d]+)(?:\.[\d]+)?\s*second/i,
	MINUTES_REGEXP = /([\d]+)(?:\.[\d]+)?\s*minute/i,
	HOURS_REGEXP = /([\d]+)(?:\.[\d]+)?\s*hour/i;

var delay = function(element) {
	var res = 0, sec = 0, min = 0, hour = 0; 
	if (typeof element !== 'object') element = e(NUMBER_XPATH);
	if (element.textContent === '') element = document.body;
	if (element && element.children.length === 0) {
		res = parseInt(element.textContent.replace(/\.\d+/, ''), 10);
		if (isNaN(res)) {
			//log('Timer evaluation failure');
			res = 0;
		} else return res;
	}
	try {
		sec = element.textContent.match(SECONDS_REGEXP);
		sec = sec ? sec[1] : '0';
	} catch (bug) {}
	try {
		min = element.textContent.match(MINUTES_REGEXP);
		min = min ? min[1] : '0';
	} catch (bug) {}
	try {
		hour = element.textContent.match(HOURS_REGEXP);
		hour = hour ? hour[1] : '0';
	} catch (bug) {} 
	res = parseInt(sec,10) + parseInt(min,10) * 60 + parseInt(hour,10) * 3600;
	if (res === 0) {
		element = e(NUMBER_XPATH)
		res = parseInt(element.textContent.replace(/\.\d+/, ''), 10);
		if (isNaN(res)) {
			//log('Timer evaluation failure');
			res = 0;
		}
	}
	return res;
};

//public
DownloadUnify.prototype.wait = function() {
	var self = this, silent = arguments[0].silent,
                    timeout = arguments[0].timeout,
                    callback = arguments[0].callback,
                    element = arguments[0].element;

	if ( typeof timeout === 'undefined' || timeout <= 0) {
		timeout = delay(element);
	}

	if (!timeout) {
		log('Timeout nowhere to be found');
		failure();
        return;
	} else {
		log('Waiting '+timeout+'sec');
        self.timer_on = true;
	}

	if (timeout > 200) {
		callback = function() { sessionStorage.clear(); page.reload(); }
	}

	if (timeout > 10) timeout++;

	var timer_id, original_title = document.title,
		time = Date.now() + timeout * 1000,
		timer_in_title = this.timer_in_title;

	function timer() {
		var now = Date.now();
		if (now < time) {
			var left = new Date();
			if (timer_in_title && !silent) document.title = "[" + Math.floor((time - now)/1000) + "] " + original_title;
		} else {
            success();
			clearInterval(timer_id);
            self.timer_on = false;
			if (timer_in_title && !silent) document.title = "[DL] " + original_title;
			if (typeof callback === 'function') {
				log('Callback is executed...');
				callback();
			} else {
				log('Download is ready...');
			}
		}
	}

	return timer_id = setInterval(timer, 1000);

};

DownloadUnify.prototype.interceptReloads = function(url) {
	//window.open = function(){};
};

DownloadUnify.prototype.initURL = function(url) {
	var urldata = url.split('.').reverse(),
        domain = urldata[0],
        host = urldata[1],
        subdomain = urldata[2];

	if (def(domain) && def(host)) {
		if (def(subdomain) && subdomain.indexOf('www') === 0 && def(this.fileservers[domain][host][subdomain])) { // ignore www subdomain
			this.hostdata = this.fileservers[domain][host][subdomain];
		} else if (def(this.fileservers[domain][host])) {
			this.hostdata = this.fileservers[domain][host];
		}
	}
};

DownloadUnify.prototype.interceptListeners = function() {
	var add = HTMLElement.prototype.addEventListener;
	HTMLElement.prototype.addEventListener = function(event, handler, bubbling) {
		if (event === 'click') {
		}
		add.apply(this, arguments);
	}
};

DownloadUnify.prototype.interceptRequests = function(url, callback, get) {
	var open = window.XMLHttpRequest.prototype.open, send = window.XMLHttpRequest.prototype.send, onReadyStateChange;

	function openAugmented(method, url, async, user, password) {
		var syncMode = async !== false ? 'async' : 'sync';
		/* place your function call here */
		console.log('Mode = ' + syncMode + ' HTTP method = ' + method + ' URL = ' + url);
		return open.apply(this, arguments);
	}

	function sendAugmented(data) {
		/* place your function call here */
		console.log('Sent HTTP-data => ', data);

		if (this.onreadystatechange) 
            this._onreadystatechange = this.onreadystatechange;
		this.onreadystatechange = onReadyStateChangeAugmented;

		return send.apply(this, arguments);
	}

	function onReadyStateChangeAugmented() {
		/* place your function call here */
		console.log('HTTP-state = ' + this.readyState);
		if (this._onreadystatechange) {
			return this._onreadystatechange.apply(this, arguments);
		}
	}

	window.XMLHttpRequest.prototype.open = openAugmented;
	window.XMLHttpRequest.prototype.send = sendAugmented;
};

DownloadUnify.prototype.getPage = function(url, callback, get) {
	if (!get)
		get = 'GET';
	var http_request = false;
	if (window.XMLHttpRequest) {
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
			http_request.overrideMimeType('text/xml');
		}
	}
	if (!http_request) {
		console.warn('XMLHTTP instance creation failed');
		return false;
	}
	http_request.onreadystatechange = function() {
		callback(http_request);
	};
	http_request.open(get, url, true);
	http_request.send(null);
};

DownloadUnify.prototype.generateHTML = function() {
	var doc = document.implementation.createHTMLDocument('HTMLParser');
	doc.documentElement.innerHTML = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>auto</title></head><body></body>' + PAGE_TEMPLATE + '</html>';
	return doc;
};

DownloadUnify.prototype.createInterface = function() {
var du_css = '.new_centerpoint {\
    top: 50%;\
    left: 50%;\
    position: absolute;\
}\
.new_dialog {\
    position: relative;\
    background: #555;\
    border-radius:5px;\
    width: 400px;\
    margin-left: -50%;\
    height: 320px;\
    margin-top: -50%;\
    z-index:10000001;\
}\
.new_captcha {\
    position: absolute;\
    background: #fff;\
    border-radius:5px;\
    margin: 20px 20px 0px;\
    width: 90%;\
    height: 210px;\
}\
.new_download_button {\
    position: absolute;\
    bottom: 0;\
    border-radius:5px;\
    margin:20px;\
    width: 90%;\
    text-align: center;\
    left: auto;\
}\
.new_download_button > a {\
    background: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.149)) #7EBB1B;\
    border: medium none currentColor;\
    border-radius: 4px;\
    box-shadow: inset 0px 0px 0px 1px rgba(255, 255, 255, 0.149), 0px 0px 0px 1px rgba(38, 60, 1, 0.600), 0px 2px 0px 0px rgba(0, 0, 0, 0.149), 0px 1px 0px 0px rgba(0, 0, 0, 0.196);\
    color: #FFFFFF;\
    display: block;\
    font: 700 14px/49px"Arial", sans-serif;\
    height: 49px;\
    padding: 0 30px;\
    text-decoration: none;\
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.298);\
    text-transform: uppercase;\
    overflow: hidden;\
    text-overflow: ellipsis;\
    white-space: nowrap;\
}\
.new_download_button > span {\
    font-size: 14px;\
    font-weight: 400;\
}\
.download_dark_screen {\
    z-index:10000000;\
    background:black;\
    position:fixed;\
    top:0px;\
    left:0;\
    width:100%;\
    height:100%;\
    opacity:0.9;\
}';

	add_css(du_css);
	var append = function(parent, type, classn) {
		var node = document.createElement(type);
		if (classn) node.className = classn;
		return parent.appendChild(node);
	}
	append(document.body, 'div', 'download_dark_screen');
	var div = document.createElement('div');
	div.className = 'new_centerpoint';
	var inner = append(div, 'div', 'new_dialog');
	append(inner, 'div', this.captcha_id);
	var button = append(inner, 'div', 'new_download_button');
	var a = document.createElement('a');
	a.id = 'new_download_start';
	a.href = '"javascript:void(0)';
	a.textContent = e(this.hostdata.filename).textContent;
	var span = document.createElement('span');
    span.id = 'new_download_parameter';
	span.textContent = ' (' + e(this.hostdata.filesize).textContent + ')';
	a.appendChild(span);
	button.appendChild(a);
	div.appendChild(inner);
	document.body.appendChild(div);
};

DownloadUnify.prototype.go = function(data) {
	var url;
	if (typeof data === 'undefined') return;
	else if (typeof data === 'string'){
		var arr = data.match(/\%%([\w-\._\d]+)\%%/gi);
		url = data;
		for (var i = 0; i < arr.length; i++) {
			// replace URL variables with real variables text
			url = url.replace(arr[i], window[arr[i].replace(/%%/g, '')])
		}
	} else {		
		url = data.href || data.src || null;
        if (url && url.indexOf("://") == -1) {
            if (url[0] !== '/') url = proto + '//' + host + '/' + url;
            else if (url[1] !== '/') url = proto + '//' + host + url;
			else url = proto + url;
        }
	}

	if (url)  {
		success();
		window.location.href = url;
	} else failure();
};

DownloadUnify.prototype.click = function(element) {
	try {
		if (typeof jQuery !== 'undefined') $(e(element)).trigger('click');
		else e(element).click();
		success();
	} catch (bug) {
		log('Nothing to click here');
		failure();
	}
};

var SOUND_DATA = "data:audio/ogg;base64,T2dnUwACAAAAAAAAAAB8mpoRAAAAAFLKt9gBHgF2b3JiaXMAAAAAARErAAAAAAAAkGUAAAAAAACZAU9nZ1MAAAAAAAAAAAAAfJqaEQEAAACHYsq6Cy3///////////+1A3ZvcmJpcx0AAABYaXBoLk9yZyBsaWJWb3JiaXMgSSAyMDA1MDMwNAAAAAABBXZvcmJpcxJCQ1YBAAABAAxSFCElGVNKYwiVUlIpBR1jUFtHHWPUOUYhZBBTiEkZpXtPKpVYSsgRUlgpRR1TTFNJlVKWKUUdYxRTSCFT1jFloXMUS4ZJCSVsTa50FkvomWOWMUYdY85aSp1j1jFFHWNSUkmhcxg6ZiVkFDpGxehifDA6laJCKL7H3lLpLYWKW4q91xpT6y2EGEtpwQhhc+211dxKasUYY4wxxsXiUyiC0JBVAAABAABABAFCQ1YBAAoAAMJQDEVRgNCQVQBABgCAABRFcRTHcRxHkiTLAkJDVgEAQAAAAgAAKI7hKJIjSZJkWZZlWZameZaouaov+64u667t6roOhIasBADIAAAYhiGH3knMkFOQSSYpVcw5CKH1DjnlFGTSUsaYYoxRzpBTDDEFMYbQKYUQ1E45pQwiCENInWTOIEs96OBi5zgQGrIiAIgCAACMQYwhxpBzDEoGIXKOScggRM45KZ2UTEoorbSWSQktldYi55yUTkompbQWUsuklNZCKwUAAAQ4AAAEWAiFhqwIAKIAABCDkFJIKcSUYk4xh5RSjinHkFLMOcWYcowx6CBUzDHIHIRIKcUYc0455iBkDCrmHIQMMgEAAAEOAAABFkKhISsCgDgBAIMkaZqlaaJoaZooeqaoqqIoqqrleabpmaaqeqKpqqaquq6pqq5seZ5peqaoqp4pqqqpqq5rqqrriqpqy6ar2rbpqrbsyrJuu7Ks256qyrapurJuqq5tu7Js664s27rkearqmabreqbpuqrr2rLqurLtmabriqor26bryrLryratyrKua6bpuqKr2q6purLtyq5tu7Ks+6br6rbqyrquyrLu27au+7KtC7vourauyq6uq7Ks67It67Zs20LJ81TVM03X9UzTdVXXtW3VdW1bM03XNV1XlkXVdWXVlXVddWVb90zTdU1XlWXTVWVZlWXddmVXl0XXtW1Vln1ddWVfl23d92VZ133TdXVblWXbV2VZ92Vd94VZt33dU1VbN11X103X1X1b131htm3fF11X11XZ1oVVlnXf1n1lmHWdMLqurqu27OuqLOu+ruvGMOu6MKy6bfyurQvDq+vGseu+rty+j2rbvvDqtjG8um4cu7Abv+37xrGpqm2brqvrpivrumzrvm/runGMrqvrqiz7uurKvm/ruvDrvi8Mo+vquirLurDasq/Lui4Mu64bw2rbwu7aunDMsi4Mt+8rx68LQ9W2heHVdaOr28ZvC8PSN3a+AACAAQcAgAATykChISsCgDgBAAYhCBVjECrGIIQQUgohpFQxBiFjDkrGHJQQSkkhlNIqxiBkjknIHJMQSmiplNBKKKWlUEpLoZTWUmotptRaDKG0FEpprZTSWmopttRSbBVjEDLnpGSOSSiltFZKaSlzTErGoKQOQiqlpNJKSa1lzknJoKPSOUippNJSSam1UEproZTWSkqxpdJKba3FGkppLaTSWkmptdRSba21WiPGIGSMQcmck1JKSamU0lrmnJQOOiqZg5JKKamVklKsmJPSQSglg4xKSaW1kkoroZTWSkqxhVJaa63VmFJLNZSSWkmpxVBKa621GlMrNYVQUgultBZKaa21VmtqLbZQQmuhpBZLKjG1FmNtrcUYSmmtpBJbKanFFluNrbVYU0s1lpJibK3V2EotOdZaa0ot1tJSjK21mFtMucVYaw0ltBZKaa2U0lpKrcXWWq2hlNZKKrGVklpsrdXYWow1lNJiKSm1kEpsrbVYW2w1ppZibLHVWFKLMcZYc0u11ZRai621WEsrNcYYa2415VIAAMCAAwBAgAlloNCQlQBAFAAAYAxjjEFoFHLMOSmNUs45JyVzDkIIKWXOQQghpc45CKW01DkHoZSUQikppRRbKCWl1losAACgwAEAIMAGTYnFAQoNWQkARAEAIMYoxRiExiClGIPQGKMUYxAqpRhzDkKlFGPOQcgYc85BKRljzkEnJYQQQimlhBBCKKWUAgAAChwAAAJs0JRYHKDQkBUBQBQAAGAMYgwxhiB0UjopEYRMSielkRJaCylllkqKJcbMWomtxNhICa2F1jJrJcbSYkatxFhiKgAA7MABAOzAQig0ZCUAkAcAQBijFGPOOWcQYsw5CCE0CDHmHIQQKsaccw5CCBVjzjkHIYTOOecghBBC55xzEEIIoYMQQgillNJBCCGEUkrpIIQQQimldBBCCKGUUgoAACpwAAAIsFFkc4KRoEJDVgIAeQAAgDFKOSclpUYpxiCkFFujFGMQUmqtYgxCSq3FWDEGIaXWYuwgpNRajLV2EFJqLcZaQ0qtxVhrziGl1mKsNdfUWoy15tx7ai3GWnPOuQAA3AUHALADG0U2JxgJKjRkJQCQBwBAIKQUY4w5h5RijDHnnENKMcaYc84pxhhzzjnnFGOMOeecc4wx55xzzjnGmHPOOeecc84556CDkDnnnHPQQeicc845CCF0zjnnHIQQCgAAKnAAAAiwUWRzgpGgQkNWAgDhAACAMZRSSimllFJKqKOUUkoppZRSAiGllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimVUkoppZRSSimllFJKKaUAIN8KBwD/BxtnWEk6KxwNLjRkJQAQDgAAGMMYhIw5JyWlhjEIpXROSkklNYxBKKVzElJKKYPQWmqlpNJSShmElGILIZWUWgqltFZrKam1lFIoKcUaS0qppdYy5ySkklpLrbaYOQelpNZaaq3FEEJKsbXWUmuxdVJSSa211lptLaSUWmstxtZibCWlllprqcXWWkyptRZbSy3G1mJLrcXYYosxxhoLAOBucACASLBxhpWks8LR4EJDVgIAIQEABDJKOeecgxBCCCFSijHnoIMQQgghREox5pyDEEIIIYSMMecghBBCCKGUkDHmHIQQQgghhFI65yCEUEoJpZRSSucchBBCCKWUUkoJIYQQQiillFJKKSGEEEoppZRSSiklhBBCKKWUUkoppYQQQiillFJKKaWUEEIopZRSSimllBJCCKGUUkoppZRSQgillFJKKaWUUkooIYRSSimllFJKCSWUUkoppZRSSikhlFJKKaWUUkoppQAAgAMHAIAAI+gko8oibDThwgMQAAAAAgACTACBAYKCUQgChBEIAAAAAAAIAPgAAEgKgIiIaOYMDhASFBYYGhweICIkAAAAAAAAAAAAAAAABE9nZ1MABAgkAAAAAAAAfJqaEQIAAAB89IOyJjhEQUNNRE5TRENHS0xTRllHSEpISUdORk1GSEdISUNHP0ZHS1IhquPYHv5OAgC/7wFATp2pUBdX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";

DownloadUnify.prototype.playSound = function() {
	var sound = document.getElementById('new_download_player');
	if (!sound) {
		sound = document.createElement('audio');
		sound.id = "new_download_player";
		sound.src = SOUND_DATA;
		document.body.appendChild(sound);
	}
	success();
	sound.play();
};

DownloadUnify.prototype.showCaptcha = function(type, onload) {
    var self = this;
	switch (type) {
		case 'KEYCAPTCHA':
			break;
		case 'RECAPTCHA':
		default:
            add_script('http://www.google.com/recaptcha/api/js/recaptcha_ajax.js',
                function(){
	                //(Function("Recaptcha.create('"+this.captcha_id+"', '"+capt+"', { callback: Recaptcha.focus_response_field } ); "))();
	            }, 'captcha-script');
           
	}
	success();
};

DownloadUnify.prototype.parseCommand = function() {
	var cmdre = ['RELOAD', 'STOP', 'CLICK', 'GO', 'SOUND', 'WAITS', 'WAIT', 'RECAPTCHA', 'CAPTCHA', 'SCRIPT'].join('|');
	var MAX_COMMANDS = 100;
	var newcmd, timeout, element, pos, self = this, c = 0, param = {},
		i = 0, n = parseInt(sessionStorage.getItem("new_step") || 0, 10),
		continued = !!parseInt(sessionStorage.getItem("last_succes") || 1, 2),
        commands = this.hostdata.pattern.split(new RegExp('(' + cmdre + '.+)','g'))
										.filter(function(s){return !!s.match(/\b/)})
										.map(function(s){return s.trim()});
										
	if (!continued) { log('Previous step failed!'); return; }
    //alert('[DownloadUnify] step['+n+']='+commands[n]+'(next: '+commands[n+1]+'); continued='+continued);

    end:
	while (n < MAX_COMMANDS && typeof commands[n] !== 'undefined') {
		log('step['+n+']='+commands[n]+' (next: '+commands[n+1]+'); continued='+continued+'; page step='+(i+1));
		sessionStorage.setItem("new_step", n+1);
		switch (commands[n]) {
			case 'RELOAD':
				if (i === 0) { 
				    success();
                    break;
				}
			case 'STOP':
                success();
				break end;
			case 'CLICK':
				n++;
				sessionStorage.setItem("new_step", n+1);
				this.click(commands[n]);
				setTimeout(this.parseCommand.bind(self), 500); // how fast will it work?
				break end;
			case 'GO':
				n++;
				sessionStorage.setItem("new_step", n+1);
				this.go((~commands[n].indexOf('http') || ~commands[n].indexOf('%%')) ? commands[n] : e(commands[n]));
				break end;
			case 'SOUND':
				this.playSound();
				break;
            case 'WAITS':
                param.silent = true;
			case 'WAIT':
				param.callback = this.parseCommand.bind(self);
				if (typeof commands[n+1] !== 'undefined') {
					if (!commands[n+1].match(new RegExp(cmdre))) {
						n++;
						timeout = parseInt(commands[n], 10);
						if (!isNaN(timeout)) {
							param.timeout = timeout;
						} else {
							element = e(commands[n]);
							if (element.textContent !== '') param.element = element;
						}
					}
				}
				sessionStorage.setItem("new_step", n+1);
				this.wait(param);
				delete param.timeout;
				delete param.element;
				delete param.callback;
				delete param.silent;
				break end;
			case 'SCRIPT':
                add_script(this.hostdata.script, this.parseCommand.bind(self), 'download-script');
                success();
				break end;
			case 'RECAPTCHA':
			case 'CAPTCHA':
				this.createInterface();
				this.showCaptcha(commands[n], commands[n+1]);
				sessionStorage.setItem("new_step", n+1);
				break;
			default:
				break end;
		}
		n++;
		i++;
	}
};

return DownloadUnify;
})(); //DownloadUnify end

///// MAIN /////
document.addEventListener('DOMContentLoaded', function () {
	var mydlhandler = new DownloadUnify(); 
	mydlhandler.initURL(window.location.host);
	mydlhandler.parseCommand();
}, false);