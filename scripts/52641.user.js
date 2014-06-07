// ==UserScript==
// @name           SWHScrobbler
// @namespace      swhscrobbler
// @description    Scrobble your Radio SWH plays to last.fm
// @include http://www.radioswh.lv/bilboard/swh_live_new/augsha2.php*
// ==/UserScript==

function MD5(){this.digest=calcMD5;var k="0123456789abcdef";function rhex(a){var b="";for(var j=0;j<=3;j++)b+=k.charAt((a>>(j*8+4))&0x0F)+k.charAt((a>>(j*8))&0x0F);return b}function str2blks_MD5(a){var b=((a.length+8)>>6)+1;var c=new Array(b*16);for(var i=0;i<b*16;i++)c[i]=0;for(var i=0;i<a.length;i++)c[i>>2]|=a.charCodeAt(i)<<((i%4)*8);c[i>>2]|=0x80<<((i%4)*8);c[b*16-2]=a.length*8;return c}function add(x,y){return((x&0x7FFFFFFF)+(y&0x7FFFFFFF))^(x&0x80000000)^(y&0x80000000)}function rol(a,b){return(a<<b)|(a>>>(32-b))}function cmn(q,a,b,x,s,t){return add(rol(add(add(a,q),add(x,t)),s),b)}function ff(a,b,c,d,x,s,t){return cmn((b&c)|((~b)&d),a,b,x,s,t)}function gg(a,b,c,d,x,s,t){return cmn((b&d)|(c&(~d)),a,b,x,s,t)}function hh(a,b,c,d,x,s,t){return cmn(b^c^d,a,b,x,s,t)}function ii(a,b,c,d,x,s,t){return cmn(c^(b|(~d)),a,b,x,s,t)}function calcMD5(e){var x=str2blks_MD5(e);var a=0x67452301;var b=0xEFCDAB89;var c=0x98BADCFE;var d=0x10325476;for(var i=0;i<x.length;i+=16){var f=a;var g=b;var h=c;var j=d;a=ff(a,b,c,d,x[i+0],7,0xD76AA478);d=ff(d,a,b,c,x[i+1],12,0xE8C7B756);c=ff(c,d,a,b,x[i+2],17,0x242070DB);b=ff(b,c,d,a,x[i+3],22,0xC1BDCEEE);a=ff(a,b,c,d,x[i+4],7,0xF57C0FAF);d=ff(d,a,b,c,x[i+5],12,0x4787C62A);c=ff(c,d,a,b,x[i+6],17,0xA8304613);b=ff(b,c,d,a,x[i+7],22,0xFD469501);a=ff(a,b,c,d,x[i+8],7,0x698098D8);d=ff(d,a,b,c,x[i+9],12,0x8B44F7AF);c=ff(c,d,a,b,x[i+10],17,0xFFFF5BB1);b=ff(b,c,d,a,x[i+11],22,0x895CD7BE);a=ff(a,b,c,d,x[i+12],7,0x6B901122);d=ff(d,a,b,c,x[i+13],12,0xFD987193);c=ff(c,d,a,b,x[i+14],17,0xA679438E);b=ff(b,c,d,a,x[i+15],22,0x49B40821);a=gg(a,b,c,d,x[i+1],5,0xF61E2562);d=gg(d,a,b,c,x[i+6],9,0xC040B340);c=gg(c,d,a,b,x[i+11],14,0x265E5A51);b=gg(b,c,d,a,x[i+0],20,0xE9B6C7AA);a=gg(a,b,c,d,x[i+5],5,0xD62F105D);d=gg(d,a,b,c,x[i+10],9,0x02441453);c=gg(c,d,a,b,x[i+15],14,0xD8A1E681);b=gg(b,c,d,a,x[i+4],20,0xE7D3FBC8);a=gg(a,b,c,d,x[i+9],5,0x21E1CDE6);d=gg(d,a,b,c,x[i+14],9,0xC33707D6);c=gg(c,d,a,b,x[i+3],14,0xF4D50D87);b=gg(b,c,d,a,x[i+8],20,0x455A14ED);a=gg(a,b,c,d,x[i+13],5,0xA9E3E905);d=gg(d,a,b,c,x[i+2],9,0xFCEFA3F8);c=gg(c,d,a,b,x[i+7],14,0x676F02D9);b=gg(b,c,d,a,x[i+12],20,0x8D2A4C8A);a=hh(a,b,c,d,x[i+5],4,0xFFFA3942);d=hh(d,a,b,c,x[i+8],11,0x8771F681);c=hh(c,d,a,b,x[i+11],16,0x6D9D6122);b=hh(b,c,d,a,x[i+14],23,0xFDE5380C);a=hh(a,b,c,d,x[i+1],4,0xA4BEEA44);d=hh(d,a,b,c,x[i+4],11,0x4BDECFA9);c=hh(c,d,a,b,x[i+7],16,0xF6BB4B60);b=hh(b,c,d,a,x[i+10],23,0xBEBFBC70);a=hh(a,b,c,d,x[i+13],4,0x289B7EC6);d=hh(d,a,b,c,x[i+0],11,0xEAA127FA);c=hh(c,d,a,b,x[i+3],16,0xD4EF3085);b=hh(b,c,d,a,x[i+6],23,0x04881D05);a=hh(a,b,c,d,x[i+9],4,0xD9D4D039);d=hh(d,a,b,c,x[i+12],11,0xE6DB99E5);c=hh(c,d,a,b,x[i+15],16,0x1FA27CF8);b=hh(b,c,d,a,x[i+2],23,0xC4AC5665);a=ii(a,b,c,d,x[i+0],6,0xF4292244);d=ii(d,a,b,c,x[i+7],10,0x432AFF97);c=ii(c,d,a,b,x[i+14],15,0xAB9423A7);b=ii(b,c,d,a,x[i+5],21,0xFC93A039);a=ii(a,b,c,d,x[i+12],6,0x655B59C3);d=ii(d,a,b,c,x[i+3],10,0x8F0CCC92);c=ii(c,d,a,b,x[i+10],15,0xFFEFF47D);b=ii(b,c,d,a,x[i+1],21,0x85845DD1);a=ii(a,b,c,d,x[i+8],6,0x6FA87E4F);d=ii(d,a,b,c,x[i+15],10,0xFE2CE6E0);c=ii(c,d,a,b,x[i+6],15,0xA3014314);b=ii(b,c,d,a,x[i+13],21,0x4E0811A1);a=ii(a,b,c,d,x[i+4],6,0xF7537E82);d=ii(d,a,b,c,x[i+11],10,0xBD3AF235);c=ii(c,d,a,b,x[i+2],15,0x2AD7D2BB);b=ii(b,c,d,a,x[i+9],21,0xEB86D391);a=add(a,f);b=add(b,g);c=add(c,h);d=add(d,j)}return rhex(a)+rhex(b)+rhex(c)+rhex(d)}}

var hash = new MD5();

window.swhscrobbler = window.swhscrobbler || {};

swhscrobbler.swh = {
  'digest' : function(string){return hash.digest(string)},
  'options': {
	'username': null,
	'password': null,
	'minLength': 30,
	'submissionMin': 240
  },
  'songStart': 0,
  'lastfm': {
	'clientID' : 'tst',
	'clientVersion' : '1.0',
	'authURL': 'http://post.audioscrobbler.com/',
	'generateTimestamp': function(){
		return parseInt(new Date().getTime().toString().substring(0, 10));
	},
	'generateToken': function(password, timestamp){
		var self = this;
		return swhscrobbler.swh.digest(swhscrobbler.swh.digest(password) + timestamp);
	}
  },
  'resetUser' : function() {
  	  swhscrobbler.swh.options.username = '';
  	  swhscrobbler.swh.options.password = '';
  	  GM_setValue('swhas_user', swhscrobbler.swh.options.username);
  	  GM_setValue('swhas_pass', swhscrobbler.swh.options.password);
  },
  'init' : function(){
  	if (!GM_getValue('swhas_user') || !GM_getValue('swhas_pass')) {
  	  swhscrobbler.swh.options.username = prompt("What is your Last.fm username?");
  	  GM_setValue('swhas_user', swhscrobbler.swh.options.username);
  	  swhscrobbler.swh.options.password = prompt("What is your Last.fm password?");
  	  GM_setValue('swhas_pass', swhscrobbler.swh.options.password);
	} else {
  	  swhscrobbler.swh.options.username = GM_getValue('swhas_user');
  	  swhscrobbler.swh.options.password = GM_getValue('swhas_pass');
	}

    // If handshake succeeds, it will call main()
	swhscrobbler.swh.handshake();
  },
  'handshake': function(){
  
	var location = swhscrobbler.swh.lastfm.authURL;
	var timestamp = swhscrobbler.swh.lastfm.generateTimestamp();
	var token = swhscrobbler.swh.lastfm.generateToken(swhscrobbler.swh.options.password, timestamp);
	var data = [
		'hs=true&p=1.2.1',
		'&c=',
		swhscrobbler.swh.lastfm.clientID,
		'&v=',
		swhscrobbler.swh.lastfm.clientVersion,
		'&u=',
		swhscrobbler.swh.options.username,
		'&t=',
		timestamp,
		'&a=',
		token].join('');
    GM_xmlhttpRequest({
		method: 'POST',
		url: location,
		data: data,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Content-type': 'application/x-www-form-urlencoded'
        },
		onload: function(responseDetails){
			swhscrobbler.swh.lastfm.authResponse = responseDetails.responseText.split('\n');
			if (swhscrobbler.swh.lastfm.authResponse[0] == 'OK') {
				swhscrobbler.swh.lastfm.sessionID = swhscrobbler.swh.lastfm.authResponse[1];
				swhscrobbler.swh.lastfm.submitURL = swhscrobbler.swh.lastfm.authResponse[3];
                swhscrobbler.swh.main();
			}
			else if (swhscrobbler.swh.lastfm.authResponse[0] == 'BADAUTH') {
                swhscrobbler.swh.resetUser();
				throw Error('Unable to connect to Audio Scrobbler to authorise. Please check your username and password.');
			} else {
				throw Error('Unable to connect to Audio Scrobbler to authorise.' + swhscrobbler.swh.lastfm.authResponse[0] + ' - Please try again later.');
            }
		}
	});
  },

  'getArtistSong' : function() {
        var node = $j("img[src=images/swh_skan_lv.gif] + font")[0];
        if (!node) {
            return false;
        }

        var parts = ($j.trim(node.textContent)).split("- - ");
        if (!parts[0] || !parts[1]) {
            return false;
        }
        
        
        if (parts[0].length > 26 || parts[1].length > 26) {
            // Probably cropped, don't scrobble it.
            return false;
        }
        
        var track = {
            artist : parts[0],
            title : parts[1]
        };

        // Check if it's already scrobbled.
        var lastSong = GM_getValue('swhas_lastsong');
        if (track.artist + track.title == lastSong) {
            swhscrobbler.swh.showStatus("Dziesma nosūtīta uz Last.fm");
            return false;
        }

        return track;
  }, 
  
  'scrobble' : function(track) {
    var data = [
        's=',
        swhscrobbler.swh.lastfm.sessionID,
        '&a[0]=',
        track.artist,
        '&t[0]=',
        track.title,
        '&i[0]=',
        swhscrobbler.swh.lastfm.generateTimestamp() - 30, // we are 30 secs into song
        '&o[0]=R',
        '&l[0]=180',
        '&r[0]=',
        '&b[0]=',
        '&n[0]=&m[0]='
    ].join('');

    GM_xmlhttpRequest({
        method: 'POST',
        url: swhscrobbler.swh.lastfm.submitURL,
        data: data,
        headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
        'Content-type' : 'application/x-www-form-urlencoded',
        },
        onload: function(responseDetails) {
            swhscrobbler.swh.lastfm.sendResponse = responseDetails.responseText.split('\n');
            if (swhscrobbler.swh.lastfm.sendResponse[0] == 'OK') {
                GM_setValue('swhas_lastsong', track.artist + track.title);
                swhscrobbler.swh.songStart = 0;
                swhscrobbler.swh.showStatus("Dziesma nosūtīta uz Last.fm");
            } else {
                throw Error('Scrobbling failed: ' + swhscrobbler.swh.lastfm.sendResponse[0]);
            }
        }
    });  
  
  },
  
  'showStatus' : function(msg) {
    var statusNode = $j("#scrobbler_status");
    if (statusNode[0]) {
        statusNode.html(msg);
    } else {
        var parent = $j("img[src=images/swh_skan_lv.gif] + font");
        parent.append("<div id='scrobbler_status'>" + msg + "</div>");
    }
  },
  
  'main' : function() {
        var track = swhscrobbler.swh.getArtistSong();
        if (!track) {
            return;
        }
        
        swhscrobbler.swh.showStatus("Dziesma tiek nosūtīta uz Last.fm...");    
        swhscrobbler.swh.scrobble(track);

	}
}

// load jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

$j = false;
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { 
	    $j = unsafeWindow.jQuery; 
	    $j.noConflict(); 
	    // When jQuery is ready, run our code.
	    swhscrobbler.swh.init(); 
	}
}

GM_wait();
