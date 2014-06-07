// ==UserScript==
// @name           We7Scrobbler
// @namespace      beadza
// @description    Scrobble your we7 plays to last.fm
// @include http://www.we7.com/player/*
// ==/UserScript==

//nab jQuery from the player frame
var $j = unsafeWindow.jQuery;

var okimg = 'data:image/png;base64,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';
var offimg = 'data:image/png;base64,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';
var errimg = 'data:image/png;base64,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';
var scrobimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABAFJREFUOE+llH1MU1cYxqch/rOYLCbG/bVkG5lbFkKWJcuGzhA/2GZkYibqwC+gIoJlUMpXQWvHgLUIQhkgUGwRASlMHbCxOLM496HFrrdf9FLb3ra3H7f0AsJQWEzms4NxNWQSl+wmb85z3/fc33vuvc85K55b5rJWNa5+cMsSvfrFNS9FrXnhowczcyPzoSn2+bhY52tFx+aWe+5feSo5N8UlPUNzbb2Y7PkGvHYYfO8ggqqLcFUoaSpVnPJMmDW9bB1TWjNAAA8n+4cR7vwa/Ll+ElqE1Vrw5H5a+y34nssPmRP1A3S+fN1ToVZp81qmvFbPn78EvuMieBUBqPqIJrGoyThBYjEX6iBg9QCYk3X6kOL82iXA8fLGFXZBmSxUpwKn7ERIqSHR+VgvjppH+p9auKETwUYy53Q76KOloiUwm6z+dVdBJfzVzQhWN4GVtyLQ0oUgAfiqmhF4nA982QS/ohXBM+fgJ/kgyXtFlRy9KzcqAjTtzCpmJTVgy2ox0TeIBW4CC4Ew/pyYxNy4A36yAl+5Alx7H+b9HBbYAKZ1RrDltWAlCtC7sgURmHVfNsXmVSDQ1o17Pg5sXQfcBRVwl8gRvnIV84wXXnElZo02+M92w020v14NT/7n8IgqMP6paCgCs8QnU67MMszdYeCtaYMnvRhMhgSMoBROQTFmbhoQJB9/+mcdwv0jcB0/CeeRYnhI3Z1ZAvP2NCoCu/3KRsq6YTfuMx7YPhbA/skxOFLzwKQVwJFZShq0YJY0ckgbcNdgxX23D/zIDbIiISzvJsGwfusTmP7NBMoUk4B7dgbGt7aDenUTqOhNMEXHw/jGFhhJbXrUCDpFCGr9Zpji9yDYfQWh3mHoX46D4e0dT2CGDw8OmWO2gOsfgqdRjUWwOTYBpthtMG/eB3uGGK4yOSYGr4KK2QoLibEkAWZGzY+04f09ishr3hIWCcbikjCWeAizVju4S9/DmS8DU9WEP2x2+IhN6B2HMWOh4W3uhDNPhslf9WCb1LC8lwjjwYINEdjNoooo494sjk5MwXjyEQRUPbj7221M/fgLvIqv4Ez/DK7DQjiOS8Bd/g5TP1yHp7YFdOJ+WHemXf/9QMHKJcYdzZF8YNuf/ZfzQBb5g7nw5BTCLZLAVyQFWyKDt1AKT14pmCwRHGk5cKZmYXxvRkh/KC/2qftztFBWfkcohrfoBFgp8VJlDfw1DQjUNiAor4PvCzkxKvGWWALHUWHYvDstZtnT40Zj+0qd+NQ2m7SSDyhbiLfUCHZdQKi7FyEN2V7tKrANStik1bw+u+SdZx5DixN+kjev0p06nW5Rnr3m0VzQ+Xu1OoemS2dStl7Ty+rSSdNV/wn0fyb9DQqJ3o/69JMlAAAAAElFTkSuQmCC';
var serrimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAA8pJREFUOE+NlFtMm2UYxx3OXSwh3jB345guMzOiXi8uxuBYlk3dvNDU1hV6gEnbrQwYK7UHTl2hgBA5lnMoUA4t41COoUDDjYlWGwG3lA0CzHIa3ZxkIGz07/N+ukacZH7Jk+/9nu99fs/xffe8sMtTW1sb6vV6j4aFhYWHhoaeWVtb6/f7/fMRERF3hELh2m52z+i1Wq2gurr6Vnd3N5xOJ0ZGRri3w+FAXV3drfT0dMFzYUaj8WBFRYWdDAOjo6MYGBhAX19fUNg30w8NDQXImb2oqOjgf0KrqqoOkLgHBwfR29vLSU9PT3D9Tx3T9/f3g4DulpaWAzuAlZWVe0wmU0ZbWxva29v/t7S2tiI3NzdpB4w8vFlSUoLGxkY0NTVx0tHRAbvdjoaGhh16q9UK5pTp2b7S0tJFqvHeIDA1NVVFKYLJ8PAwVldXsbKyAuoeZmdnQamwlLgGLC8vY2lpCZOTk5yOsoJGo4kNwtLS0jwssq6uLm4jMyaPMJvNGBsbg8/nQ1lZGaamptDZ2cn9Y9Exm/Jvi5CRkeEIwpRKpScvLw9zc3NgaVAdgpJnMmGWmjJprsDPbjfXzcLCQuSTvl2nhycxCdVy+Z3fPzn/Egfk8XgehULBRaBWq6HT6ZCVlYWcnBzYDdexrs9AQKPHj9eN8E5MYGFhATetzfDHy/EkRYWf+F8+/O302XAOFh0d7RGJRFxkUqkUfD4fAoGAk1JpHLavqREwmvAk+RosIjEMcjk2JKQn0EaMGN+d+/TB/cioEA6WlJTkYDBWfJvNBraWSCQQi8W4okyA82sNtpSJ2FZr8Vh5BZsXZfROxLpQBNe581DKZPnBmtGMxcrJm0qlwvT0NFwuF2i6YbFYMDMzg44bN9CYQBDZJeBSAiC9iK2vZJhIToE8Ph6ZmZkngjAq6F6q0yKDsXqxMzk+Pg43FZzNUnZ2Nsx6PTYJApEU+IyHLUks7DEi0Fi56Kz+leLTh6I7TR62DQYDaM11rLi4GGYag94sA9YvxOBxvIKAcdgQxmCLarV29mPcjDyZ7zv21v5nzigBtAUFBdxM1dTUcGmOfFOAB6wJist4xBPge7kC3VdTcP/DKGzy+HgYeRJLEe8Y7r52ZCewvr4+hGCn6Oa4xxrBJv4XGoc/KJL1z7+ANzYOrc3NYP9/iDql8x9/L/DozEdYfvtd1/yhw6/sdoPsKy8vl9AAO/ttNvftqymLty9E+60WyzCdCgk53ed741jIr0eOJv8NOvTc++3pBv/7H7x87/iJF/9tcPfw6yHzr4YHI/oTHPTniKrkatoAAAAASUVORK5CYII%3D';

function MD5(){this.digest=calcMD5;var k="0123456789abcdef";function rhex(a){var b="";for(var j=0;j<=3;j++)b+=k.charAt((a>>(j*8+4))&0x0F)+k.charAt((a>>(j*8))&0x0F);return b}function str2blks_MD5(a){var b=((a.length+8)>>6)+1;var c=new Array(b*16);for(var i=0;i<b*16;i++)c[i]=0;for(var i=0;i<a.length;i++)c[i>>2]|=a.charCodeAt(i)<<((i%4)*8);c[i>>2]|=0x80<<((i%4)*8);c[b*16-2]=a.length*8;return c}function add(x,y){return((x&0x7FFFFFFF)+(y&0x7FFFFFFF))^(x&0x80000000)^(y&0x80000000)}function rol(a,b){return(a<<b)|(a>>>(32-b))}function cmn(q,a,b,x,s,t){return add(rol(add(add(a,q),add(x,t)),s),b)}function ff(a,b,c,d,x,s,t){return cmn((b&c)|((~b)&d),a,b,x,s,t)}function gg(a,b,c,d,x,s,t){return cmn((b&d)|(c&(~d)),a,b,x,s,t)}function hh(a,b,c,d,x,s,t){return cmn(b^c^d,a,b,x,s,t)}function ii(a,b,c,d,x,s,t){return cmn(c^(b|(~d)),a,b,x,s,t)}function calcMD5(e){var x=str2blks_MD5(e);var a=0x67452301;var b=0xEFCDAB89;var c=0x98BADCFE;var d=0x10325476;for(var i=0;i<x.length;i+=16){var f=a;var g=b;var h=c;var j=d;a=ff(a,b,c,d,x[i+0],7,0xD76AA478);d=ff(d,a,b,c,x[i+1],12,0xE8C7B756);c=ff(c,d,a,b,x[i+2],17,0x242070DB);b=ff(b,c,d,a,x[i+3],22,0xC1BDCEEE);a=ff(a,b,c,d,x[i+4],7,0xF57C0FAF);d=ff(d,a,b,c,x[i+5],12,0x4787C62A);c=ff(c,d,a,b,x[i+6],17,0xA8304613);b=ff(b,c,d,a,x[i+7],22,0xFD469501);a=ff(a,b,c,d,x[i+8],7,0x698098D8);d=ff(d,a,b,c,x[i+9],12,0x8B44F7AF);c=ff(c,d,a,b,x[i+10],17,0xFFFF5BB1);b=ff(b,c,d,a,x[i+11],22,0x895CD7BE);a=ff(a,b,c,d,x[i+12],7,0x6B901122);d=ff(d,a,b,c,x[i+13],12,0xFD987193);c=ff(c,d,a,b,x[i+14],17,0xA679438E);b=ff(b,c,d,a,x[i+15],22,0x49B40821);a=gg(a,b,c,d,x[i+1],5,0xF61E2562);d=gg(d,a,b,c,x[i+6],9,0xC040B340);c=gg(c,d,a,b,x[i+11],14,0x265E5A51);b=gg(b,c,d,a,x[i+0],20,0xE9B6C7AA);a=gg(a,b,c,d,x[i+5],5,0xD62F105D);d=gg(d,a,b,c,x[i+10],9,0x02441453);c=gg(c,d,a,b,x[i+15],14,0xD8A1E681);b=gg(b,c,d,a,x[i+4],20,0xE7D3FBC8);a=gg(a,b,c,d,x[i+9],5,0x21E1CDE6);d=gg(d,a,b,c,x[i+14],9,0xC33707D6);c=gg(c,d,a,b,x[i+3],14,0xF4D50D87);b=gg(b,c,d,a,x[i+8],20,0x455A14ED);a=gg(a,b,c,d,x[i+13],5,0xA9E3E905);d=gg(d,a,b,c,x[i+2],9,0xFCEFA3F8);c=gg(c,d,a,b,x[i+7],14,0x676F02D9);b=gg(b,c,d,a,x[i+12],20,0x8D2A4C8A);a=hh(a,b,c,d,x[i+5],4,0xFFFA3942);d=hh(d,a,b,c,x[i+8],11,0x8771F681);c=hh(c,d,a,b,x[i+11],16,0x6D9D6122);b=hh(b,c,d,a,x[i+14],23,0xFDE5380C);a=hh(a,b,c,d,x[i+1],4,0xA4BEEA44);d=hh(d,a,b,c,x[i+4],11,0x4BDECFA9);c=hh(c,d,a,b,x[i+7],16,0xF6BB4B60);b=hh(b,c,d,a,x[i+10],23,0xBEBFBC70);a=hh(a,b,c,d,x[i+13],4,0x289B7EC6);d=hh(d,a,b,c,x[i+0],11,0xEAA127FA);c=hh(c,d,a,b,x[i+3],16,0xD4EF3085);b=hh(b,c,d,a,x[i+6],23,0x04881D05);a=hh(a,b,c,d,x[i+9],4,0xD9D4D039);d=hh(d,a,b,c,x[i+12],11,0xE6DB99E5);c=hh(c,d,a,b,x[i+15],16,0x1FA27CF8);b=hh(b,c,d,a,x[i+2],23,0xC4AC5665);a=ii(a,b,c,d,x[i+0],6,0xF4292244);d=ii(d,a,b,c,x[i+7],10,0x432AFF97);c=ii(c,d,a,b,x[i+14],15,0xAB9423A7);b=ii(b,c,d,a,x[i+5],21,0xFC93A039);a=ii(a,b,c,d,x[i+12],6,0x655B59C3);d=ii(d,a,b,c,x[i+3],10,0x8F0CCC92);c=ii(c,d,a,b,x[i+10],15,0xFFEFF47D);b=ii(b,c,d,a,x[i+1],21,0x85845DD1);a=ii(a,b,c,d,x[i+8],6,0x6FA87E4F);d=ii(d,a,b,c,x[i+15],10,0xFE2CE6E0);c=ii(c,d,a,b,x[i+6],15,0xA3014314);b=ii(b,c,d,a,x[i+13],21,0x4E0811A1);a=ii(a,b,c,d,x[i+4],6,0xF7537E82);d=ii(d,a,b,c,x[i+11],10,0xBD3AF235);c=ii(c,d,a,b,x[i+2],15,0x2AD7D2BB);b=ii(b,c,d,a,x[i+9],21,0xEB86D391);a=add(a,f);b=add(b,g);c=add(c,h);d=add(d,j)}return rhex(a)+rhex(b)+rhex(c)+rhex(d)}}

var hash = new MD5();

window.beadza = window.beadza || {};

beadza.we7 = {
  'digest' : function(string){return hash.digest(string)},
  'options': {
	'username': null,
	'password': null,
	'minLength': 30,
	'submissionMin': 240
  },
  'songStart': 0,
  'lastfm': {
    'hardFails' : 0,
    'loggedIn' : false,
	'clientID' : 'we7',
	'clientVersion' : '1.0',
	'authURL': 'http://post.audioscrobbler.com/',
	'generateTimestamp': function(){
		return parseInt(new Date().getTime().toString().substring(0, 10));
	},
	'generateToken': function(password, timestamp){
		var self = this;
		return beadza.we7.digest(beadza.we7.digest(password) + timestamp);
	}
  },
  'resetUser' : function() {
  	  beadza.we7.options.username = '';
  	  beadza.we7.options.password = '';
  	  GM_setValue('we7as_user', beadza.we7.options.username);
  	  GM_setValue('we7as_pass', beadza.we7.options.password);
  },
  'init' : function(){
  	if (!GM_getValue('we7as_user') || !GM_getValue('we7as_pass')) {
  	  beadza.we7.options.username = prompt("What is your Last.fm username?");
  	  GM_setValue('we7as_user', beadza.we7.options.username);
  	  beadza.we7.options.password = prompt("What is your Last.fm password?");
  	  GM_setValue('we7as_pass', beadza.we7.options.password);
	} else {
  	  beadza.we7.options.username = GM_getValue('we7as_user');
  	  beadza.we7.options.password = GM_getValue('we7as_pass');
	}

	beadza.we7.handshake();
    beadza.we7.mainLoop();
  },
  'handshake': function(){
    beadza.we7.lastfm.loggedIn = false;
  
	var location = beadza.we7.lastfm.authURL;
	var timestamp = beadza.we7.lastfm.generateTimestamp();
	var token = beadza.we7.lastfm.generateToken(beadza.we7.options.password, timestamp);
	var data = [
		'hs=true&p=1.2.1',
		'&c=',
		beadza.we7.lastfm.clientID,
		'&v=',
		beadza.we7.lastfm.clientVersion,
		'&u=',
		beadza.we7.options.username,
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
			beadza.we7.lastfm.authResponse = responseDetails.responseText.split('\n');
			if (beadza.we7.lastfm.authResponse[0] == 'OK') {
				beadza.we7.lastfm.sessionID = beadza.we7.lastfm.authResponse[1];
				beadza.we7.lastfm.submitURL = beadza.we7.lastfm.authResponse[3];
                $j("#player").append("<div style='position: absolute; left: 428px; top: 33px;'><img id='as' src='"+okimg+"'></div>");
                $j("#as").toggle(
                  function() {
                    $j(this).attr("src",offimg);
                    beadza.we7.lastfm.loggedIn = false;
                  },
                  function() {
                    $j(this).attr("src",okimg);
                    beadza.we7.lastfm.loggedIn = true;
                  });
                beadza.we7.lastfm.loggedIn = true;
                beadza.we7.lastfm.hardFails = 0;
			}
			else if (beadza.we7.lastfm.authResponse[0] == 'BADAUTH') {
                beadza.we7.resetUser();
                $j("#player").append("<div id='as' style='position: absolute; left: 428px; top: 33px;'><img id='as' src='"+errimg+"'></div>");
				throw Error('Unable to connect to Audio Scrobbler to authorise. Please check your username and password.');
			} else {
                $j("#player").append("<div id='as' style='position: absolute; left: 428px; top: 33px;'><img id='as' src='"+errimg+"'></div>");
				throw Error('Unable to connect to Audio Scrobbler to authorise.' + beadza.we7.lastfm.authResponse[0] + ' - Please try again later.');
            }
		}
	});
  },
  'mainLoop' : function() {
    setInterval(function(){
    
            if (beadza.we7.lastfm.loggedIn && unsafeWindow.Player && unsafeWindow.Player.track) {
            
                var track = unsafeWindow.Player.track;
            
                // Get  the current time
                var currentTime = track.duration * unsafeWindow.Player.position;

                if (currentTime < 3.0) {
                    beadza.we7.lastSong = -1;
                    beadza.we7.songStart = 0;
                }
                
                if (track.trackId !== beadza.we7.lastSong) {
      			    $j('#as-notify').animate({opacity: 0.0}, function(){
                        $j(this).remove();
                    });
                    
                    if (!beadza.we7.songStart) {
                        //store now as the time the track started playing
                        beadza.we7.songStart = beadza.we7.lastfm.generateTimestamp();
                    }
                    
                    if (currentTime < beadza.we7.options.minLength) {
                      return;
                    }
                                            
                    var do_submission = false;
                    //past 30secs
                    if (currentTime >= beadza.we7.options.submissionMin || unsafeWindow.Player.position >= 0.5) {
                        //after 240secs or over half way
                        do_submission = true;
                    }
                        
                    if (do_submission & !beadza.we7.lastfm.submitting) {
                        beadza.we7.lastfm.submitting = true;
                        var data = [
                            's=',
                            beadza.we7.lastfm.sessionID,
                            '&a[0]=',
                            track.artist.name,
                            '&t[0]=',
                            track.title,
                            '&i[0]=',
                            beadza.we7.songStart,
                            '&o[0]=P',
                            '&l[0]=',
                            track.duration,
                            '&r[0]=',
                            '&b[0]=',
                            track.album.name,
                            '&n[0]=&m[0]='
                        ].join('');
                        
                        GM_xmlhttpRequest({
                            method: 'POST',
                            url: beadza.we7.lastfm.submitURL,
                            data: data,
                            headers: {
                            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                            'Accept': 'application/atom+xml,application/xml,text/xml',
                            'Content-type' : 'application/x-www-form-urlencoded',
                            },
                            onload: function(responseDetails) {
                                beadza.we7.lastfm.sendResponse = responseDetails.responseText.split('\n');
                                if (beadza.we7.lastfm.sendResponse[0] == 'OK') {
                                    beadza.we7.lastfm.hardFails = 0;
                                    beadza.we7.lastSong = track.trackId;
                                    beadza.we7.songStart = 0;
                                    $j("#player").append("<div id='as-notify' style='position: absolute; left: 191px; top: 2px;'><img src='"+scrobimg+"'></div>");
                                    unsafeWindow.Stats.event("trackscrobble");
                                } else if (beadza.we7.lastfm.sendResponse[0] == 'BADSESSION') {
                                    console.log('Bad Session - rehandshaking');
                                    beadza.we7.handshake();
                                } else {
                                    beadza.we7.lastfm.hardFails = beadza.we7.lastfm.hardFails + 1;
                                    if (beadza.we7.lastfm.hardFails >= 3) {
                                      console.log('Hard fail #' + beadza.we7.lastfm.hardFails + ' - rehandshaking');
                                      beadza.we7.handshake();
                                    } else {
                                      console.log('Hard fail #' + beadza.we7.lastfm.hardFails);
                                      $j("#player").append("<div id='as-notify' style='position: absolute; left: 191px; top: 2px;'><img src='"+serrimg+"'></div>");
                                    }
                                }
                                beadza.we7.lastfm.submitting = false;
                            }
                        });
                    }
                }            
            }
        }, 2000);
	}
}

beadza.we7.init();

//===============================================================================
//			- Weekly Auto-Update Check -
// Originally from http://userscripts.org/scripts/show/22372
//===============================================================================
// CheckForUpdate() will verify if the time has come to look if an update is available.
// CheckVersion() will verify if this script version is the latest available.
//===============================================================================
var script_title = "We7 Scrobbler";
var source_location = "http://userscripts.org/scripts/source/45683.user.js";
var current_version = "1.6.1";
var latest_version = " ";
var gm_updateparam = "we7scrobbler_lastupdatecheck";

var version_holder = "http://peet.me.uk/we7scrobbler.txt";

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("We7 Scrobbler->Force Update", CheckVersion);

//Initiate the download of the new script version.
function GetNewVersion() {
        var today = new Date();
        GM_setValue(gm_updateparam, String(today));
        GM_openInTab(source_location);
}

//Verify if it's time to update
function CheckForUpdate()
{	
	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

	if(GM_getValue(gm_updateparam, "never") != "never")
	{
		today = today.getTime(); //Get today's date
		var lastupdatecheck = new Date(GM_getValue(gm_updateparam, "never")).getTime();
		var interval = (today - lastupdatecheck) / one_day; //Find out how much days have passed		

		//If a week has passed since the last update check, check if a new version is available
		if(interval >= 7)			
			CheckVersion();
	}
	else
    {
		CheckVersion();
    }
}

//Make sure we don't have the latest version
function CheckVersion()
{
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: version_holder,
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var line = String(responseDetails.responseText.match(/version=[0-9]\.[0-9]?[0-9]\.[0-9]?[0-9]/));				
				
				if(line != null)
				{
					var strSplit = new Array();
					strSplit = line.split('=');					
					latest_version = strSplit[1];

					if(current_version != latest_version && latest_version != "undefined")
					{
						if(confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nWould you like to get it now?"))
							GetNewVersion();
						else
							AskForReminder();
					} 
					else if(current_version == latest_version)
						console.log("You have the latest version of " + script_title + ".");
				}
				else
				{
					alert("Could not locate the version holder file.\r\nThis should be reported to the script author.\r\nThank you!");
					SkipWeeklyUpdateCheck();
				}
					
		    }
		});
}

//Ask the user to be reminded in 24 hours or only next week.
function AskForReminder()
{
	if(confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded next week only)"))
	{
		var today = new Date();
		today = today.getTime();		
		var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
		var sda_ms = today - sixdays_ms;		
		var sixdaysago = new Date(sda_ms)

		//Since we check for updates after 7 days, just make it seem like the last check was 6 days ago.
		GM_setValue(gm_updateparam, String(sixdaysago));
	}
	else
		SkipWeeklyUpdateCheck();
}

//Set the next update check in seven days
function SkipWeeklyUpdateCheck()
{
	var today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(gm_updateparam, String(today));
}

CheckForUpdate();
//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================