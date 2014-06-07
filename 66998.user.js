// ==UserScript==
// @name           CatchUp
// @namespace      http://userscripts.org/people/336
// @description    CatchUp enhances the Twitter homepage to show ALL your friends with ALL their tweets.
// @source         http://userscripts.org/scripts/show/66998
// @identifier     http://userscripts.org/scripts/source/66998.user.js
// @version        0.4.3
// @date           2010-05-12
// @creator        Richard Gibson <@gmail.com>; http://twitter.com/gibson042
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
// 
// **COPYRIGHT NOTICE**
// 
// I, Richard Gibson, hereby establish my original authorship of this
// work, and announce its release into the public domain.  I claim no
// exclusive copyrights to it, and will neither pursue myself (nor
// condone pursuit by others of) punishment, retribution, or forced
// payment for its full or partial reproduction in any form.
// 
// That being said, I would like to receive credit for this work
// whenever it, or any part thereof, is reproduced or incorporated into
// another creation; and would also like compensation whenever revenue
// is derived from such reproduction or inclusion.  At the very least,
// please let me know if you find this work useful or enjoyable, and
// contact me with any comments or criticisms regarding it.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// 
// **END COPYRIGHT NOTICE**
//
//
// Changelog:
// 0.4.3 (2010-05-12)
// 	Improved: Exclude replies to the active user from "Missed Replies"
// 	Improved: Skip the prioritize prompt when no followed users are protected
// 	Improved: Instead of "1 days ago", show "x hours ago" when x <= 36
// 0.4.1 (2010-05-04)
// 	Improved: Exclude replies between followed users from "Missed Replies"
// 	Fixed: Missed Replies recovers from JSON parsing errors
// 0.4 (2010-05-02)
// 	New: #fixreplies from the home page!
// 0.3.1 (2010-03-09)
// 	Improved: @others tab includes @mentions
// 0.3 (2010-03-08)
// 	New: Adds an @others tab to profile pages that shows their replies to others
// 	Improved: Cleaner and more portable auto-update code
// 0.2.2 (2010-02-08)
// 	Improved: Prompt user before trying an authenticated request
// 0.2.1 (2010-02-04)
// 	Fixed: secure/authenticated API requests from HTTP
// 0.2 (2010-02-03)
// 	New: supports all Twitter pages (but only automatic for logged-in user's page)
// 0.1 (2010-01-22)
// 	original release

(function(){

// fundamentals (used to build other constants)
var SCRIPT = {
	 name: "CatchUp"
	,namespace: "http://userscripts.org/people/336"
	,source: "http://userscripts.org"      // script homepage/description URL
			+ "/scripts/show/66998"
	,identifier: "http://userscripts.org"  // script URL
			+ "/scripts/source/66998.user.js"
	,version: "0.4.3"                      // version
	,date: "2010-05-12"                    // update date
};
var UPDATE = {
	 lastCheck: 0
	,script: {}
	,getValue: (typeof(GM_getValue)!='undefined' && GM_getValue) || function(n,d){return d;}
	,setValue: (typeof(GM_setValue)!='undefined' && GM_setValue) || function(n,v){return v;}
	,httpRequest: (typeof(GM_xmlhttpRequest)!='undefined' && GM_xmlhttpRequest) || function(){}
	,init: function(objScript) {
		for (var name in objScript) { if (!(name in this)) {
			this[name] = this.script[name] = this.getValue('_UPDATE_' + name, objScript[name]);
		} }
		this.lastCheck = this.getValue('_UPDATE_' + 'lastCheck', 0);
	}
	,check: function(intCheckDays, strUrl, objScript, fnOnNewer, fnIsNewer, blnForce) {
		this.init(objScript);
		var interval = Math.max(parseFloat(intCheckDays) * 24 * 60 * 60 * 1000, 0) || Infinity;
		var diff = (new Date()) - parseInt(this.lastCheck,10);
		if(!blnForce && !this.isNewer(this, objScript, fnIsNewer) && !(diff > interval)){ return false; }
		if (blnForce || (diff > interval)) {
			var t = this;
			return this.httpRequest({method: 'GET', url: strUrl, onload: function(r){
				t.setValue('_UPDATE_' + 'lastCheck', t.lastCheck = '' + (new Date()).getTime());
				t.parse(r.responseText, [intCheckDays, strUrl, objScript, fnOnNewer, fnIsNewer, false]);
			}});
		}
		try{ fnOnNewer(this, objScript); }catch(x){}
	}
	,parse: function(strResponse, arrCheckArgs) {
		var re = /\/\/\s*(?:@(\S+)\s+(.*?)\s*(?:$|\n)|(==\/UserScript==))/gm, match = true, name;
		while (match && (match = re.exec(strResponse))) {
			if(match[3]){ match = null; continue; }
			name = match[1];
			if(name in this.script){ this.setValue('_UPDATE_' + name, this[name] = match[2]); }
			else if(!(name in this)){ this[name] = match[2]; }
		}
		this.check.apply(this, arrCheckArgs || []);
	}
	,isNewer: function(objUpdate, objScript, fnIsNewer) {
		if(!objUpdate){ objUpdate = this; }
		if(!objScript || (objUpdate.date > objScript.date)){ return true; }
		try {
			return fnIsNewer(objUpdate, objScript);
		}
		catch (x) {
			return (!(objUpdate.date < objScript.date) && (objUpdate.version != objScript.version));
		}
	}
};
var CDATA = function(s){ return '<![CDATA[' + s.replace(/\]\]\>/g, ']]]]><![CDATA[>') + ']]>'; };
var URL_BASE = location.href.replace(/^(.*?:[/]*[^/]*).*$/, '$1');

// constants
var ABORT_TEXT = "Whoops! Something went wrong. Please try again!";	// see twitter.js
var BAD_URL = 'http://example.com:0/';	// should always error
var HTML_AVATAR = '<span class="thumb vcard author"><a href="' + URL_BASE + '/%{screen_name}"'
		+ ' class="tweet-url profile-pic url"><img alt="%{name}" class="photo fn"'
		+ ' height="48" width="48" src="%{profile_image_url}"/></a></span>';
var HTML_MORE = '<a href="%{url}" class="round more" id="more" rel="next">more</a>';
var HTML_SCREEN_NAME = '<strong><a href="' + URL_BASE + '/%{screen_name}"'
		+ ' class="tweet-url screen-name">%{screen_name}</a></strong>';
var INPUT_TIMEOUT = 400;
var KEEP_PROPERTIES = {id:0, name:0, screen_name:0, protected:0, profile_image_url:0, status:0};
var MAX_CATCHUP = 30;
var MAX_RETRIES = 3;
var MAX_SIMULTANEOUS_REQUESTS = 4;
var MISSED_PAGE = 30;
var OTHERS_MINIMUM_LENGTH = 15;
var PREF = {
	 FILTER_HOURS: 'FILTER_HOURS'
	,PROTECTED_OUTLINE: 'PROTECTED_OUTLINE_PIXELS'
	,REPLIES_DAYS: 'REPLIES_DAYS'
	,SEEK_PROTECTED: 'SEEK_PROTECTED'
	,SORT: {toString: function(){return 'SORT';}, FOLLOW_SEQUENCE: 0, ALPHABETIC: 1, LAST_UPDATE: 2}
};
var REQUEST_HEADERS = {	// http://twitter.pbworks.com/API-Docs
	 'X-Twitter-Client': 'CatchUp'
	,'X-Twitter-Client-Version': SCRIPT.version
	,'X-Twitter-Client-URL': 'data:text/xml;charset=utf-8,' + encodeURIComponent([
		 '<?xml version="1.0" encoding="utf-8"?>'
		,'<client>'
			,'<name>' + CDATA(SCRIPT.name) + '</name>'
			,'<version>' + CDATA(SCRIPT.version) + '</version>'
			,'<author>'
					,'<name>Richard Gibson</name>\n<email>richard.gibson+twitter'+'@'+'gmail.com</email>'
					,'<twitter>gibson042</twitter>\n</author>'
			,'<url>' + CDATA(SCRIPT.source) + '</url>'
			//,'<twitter></twitter>'
			,'<description>' + CDATA(
				'CatchUp enhances the Twitter homepage to show ALL your friends with ALL their tweets.'
			) + '</description>'
		,'</client>'
	].join('\n'))
};
var RE_SUFFIXED_URL = /^([^#]*?(?:\/(\w+))?)(?:\/|(#(?:.*[\/#])?))([^\/#]+)(?:##([^?]*))?$/;
var SUFFIXED_URL_PROPERTIES = {url: 0, base: 1, user: 2, suffix: 4, params: 5};	//hashPrefix: 3
var T_SEC = 1000, T_MIN = T_SEC * 60, T_HR = T_MIN * 60, T_DAY = T_HR * 24;
var UPDATE_CHECK_DAYS = 2.5;
	// http://apiwiki.twitter.com/Twitter-REST-API-Method%3A-statuses%C2%A0friends
//var URL_FOLLOWING = 'https://api.twitter.com/1/statuses/friends.json?';
var URL_FOLLOWING = {toString: function(/*objParams, ...*/){
	var base = 'https://twitter.com/statuses/friends.json', params = [];
	for (var a = Array.prototype.slice.call(arguments), i = 0; i < a.length; i++) {
		for(var p in a[i]){ params.push(p + (a[i][p] !== undefined ? '=' + a[i][p] : '')); }
	}
	return base + (params.length > 0 ? '?' + params.join('&') : '');
}};
//var URL_STATUSES = 'https://api.twitter.com/1/statuses/user_timeline.json?';
var URL_STATUSES = {
	toString: function(){
		var base = ['https://twitter.com/', ''], params = ['twttr=true'];
		try{ params.concat(g$.param(g$.ajaxSettings.data) || []); }catch(x){}
		for (var a = Array.prototype.slice.call(arguments), i = 0; i < a.length; i++) {
			for (var p in a[i]) {
				if(p == 'screen_name'){ base[1] = a[i][p] || ''; }
				else{ params.push(a[i][p] === undefined ? p : [p, a[i][p]].join('=')); }
			}
		}
		return base.join('') + (params.length > 0 ? '?' + params.join('&') : '');
	}
	,getParams: function(strUrl){
		var params = {screen_name: strUrl.replace(/^(https?:\/\/twitter\.com)?\/|\?.*$/g, '')};
		var reParam = /([^=]+)=?(.*)/;
		for (var q = strUrl.replace(/.*?\?/,'').split('&'), i = 0, match; i < q.length; i++) {
			match = reParam.exec(q[i]) || {};
			if(match[1] && match[1] != 'twttr'){ params[match[1]] = match[2]; }
		}
		return params;
	}
};

// derived constants and localized text
var FOLLOWING_PROTECTED_PROMPT = 'Would you like ' + SCRIPT.name
		+ ' to try getting status updates from protected users (requires authentication)?';
var MISSED_LIMIT_TEXT = SCRIPT.name + ' is limited to ' + MAX_CATCHUP + ' users.';
var MISSED_LIMIT_PROMPT = MISSED_LIMIT_TEXT + ' Would you like to prioritize protected users?';
var IMG_LOADING = [	// http://ajaxload.info/cache/FF/FF/FF/00/00/00/19-1.gif
	 'data:image/gif;base64,R0lGODlhZABkAPQAAP%2F%2F%2FwAAAI6OjmhoaDY2Njw8PFxcXBwcHBI'
	,'SEiwsLFRUVExMTH5%2BfoaGhiQkJAAAAHZ2dkRERAoKCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
	,'ACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJBwAAACwAAAAAZABkA'
	,'AAF%2FyAgjmRpnmiqrmzrvnAsz3Rt33iu73zfMgoDw0csAgSEh%2FJBEBifucRymYBaaYzpdHjtuhba5cJLXoHDj3HZBykk'
	,'IpDWAP0YrHsDiV5faB3CB3c8EHuFdisNDlMHTi4NEI2CJwWFewQuAwtBMAIKQZGSJAmVelVGEAaeXKEkEaQSpkUNngYNrCW'
	,'EpIdGj6C3IpSFfb%2BCAwkOCbvEy8zNzs%2FQ0dLT1NUrAgOf1kUMBwjfB8rbOQLe3%2BC24wxCNwPn7wrjEAv0qzMK7%2B'
	,'eX2wb0mzXu8iGIty1TPRvlBKazJgBVnBsN8okbRy6VgoUUM2rcyLGjx48gQ4ocSbKkyZMoJf8JMFCAwAJfKU0gOUDzgAOYH'
	,'iE8XDGAJoKaalAoObHERFESU0oMFbF06YikKQQsiKCJBYGaNR2ocPr0AQCuQ8F6Fdt1rNeuLSBQjRDB3qSfPm1uPYvUbN2j'
	,'TO2izQs171e6J9SuxXjCAFaaQYkC9ku2MWCnYR2rkDqV4IoEWG%2FO5fp3ceS7nuk2Db0YBQS3UVm6xBmztevXsGPLnk27t'
	,'u3buHOvQU3bgIPflscJ4C3D92%2FgFNUWgHPj2G%2BbmhkWWL78xvPjDog%2FazCdOmsXzrF%2FdyYgAvUI7Y7bDF5N%2BQ'
	,'LCM4whM7BxvO77%2BPPr38%2B%2F%2Fw4GbhSw0xMQDKCdJAwkcIx2ggMSsQABENLHzALILDhMERAQ0BKE8IUSwYILPjEAh'
	,'CQ2yMoCClaYmA8NQLhhh5I0oOCCB5rAQI0mGEDiRLfMQhWOI3CXgIYwotBAA%2FaN09KQCVw4m4wEMElAkTEhIWUCSaL0IJ'
	,'PsySZVlC%2F5J%2BaYZJZppgghAAAh%2BQQJBwAAACwAAAAAZABkAAAF%2FyAgjmRpnmiqrmzrvnAsz3Rt33iu73zfMhAIw'
	,'0csAgQDhESCGAiM0NzgsawOolgaQ1ldIobZsAvS7ULE6BW5vDynfUiFsyVgL58rwQLxOCzeKwwHCIQHYCsLbH95Dg%2BOjg'
	,'eAKAKDhIUNLA2JVQt4KhGPoYuSJEmWlgYuSBCYLRKhjwikJQqnlgpFsKGzJAa2hLhEuo6yvCKUv549BcOjxgOVhFdFdbAOy'
	,'sYNCgQK2HDMVAXexuTl5ufo6err7O3kAgKs4%2B48AhEH%2BATz9Dj2%2BP8EWvET0YDBPlX%2FEh7i18CAgm42ICT8l2og'
	,'AAYPFSyU0WAiPjcDtSkwIHCGAAITE%2F%2BUpCeg4EqTKPGptEikpQEGL2nq3Mmzp8%2BfQIMKHUq0qNGjSJO6E8DA4Ryle'
	,'Qw4mOqgk1F4LRo4OEDVwTQUjk48MjGWxC6zD0aEBbBWbdlJBhYsAJlC6lSuDiKoaOuWbdq%2BfMMG%2Fus37eCsCuRaVWG3'
	,'q94UfEUIJlz48GHJsND6VaFJ8UEAWrdS%2FSqWMubNgClP1nz67ebIJQTEnduicdWDZ92aXq17N%2BG1kV2nwEqnqYGnUJM'
	,'rX868ufPn0KNLn069Or%2BN0hksSFCArkWmORgkcJCgvHeWCiIYOB9jAfnx3D%2BfE5A%2BwoKKNSLAh4%2BdXYMI9gEonw'
	,'oKlPeeON8ZAOCgfTc0UB5%2FOiERwQA5xaCJff3xM6B1HHbo4YcghigiNXFBhEVLGc5yEgEJEKBPFBBEUEAE7M0yAIs44le'
	,'TjDNGUKEkBrQopDM%2BNFDAjEf%2BCMiNQhJAWpE8zqjkG%2F8JGcGGIjCQIgoMyOhjOkwNMMCWJTTkInJZNYAlPQYU4KKT'
	,'0xnpopsFTKmUPW8ScOV0N7oJ53TxJAbBmiMWauihiIIYAgAh%2BQQJBwAAACwAAAAAZABkAAAF%2FyAgjmRpnmiqrmzrvnA'
	,'sz3Rt33iu73zv%2F8AZo4BAFBjBpI5xKBYPSKWURnA6CdNszGrVeltc5zcoYDReiXDCBSkQCpDxShA52AuCFoQribMKEoGB'
	,'A3IpdQh2B1h6TQgOfisDgpOQhSMNiYkIZy4CnC0Ek4IFliVMmnYGQAmigWull5mJUT6srRGwJESZrz%2BSrZWwAgSJDp8%2'
	,'FgJOkuaYKwUADCQ4JhMzW19jZ2tvc3d7f4NoCCwgPCAs4AwQODqrhIgIOD%2FPzBzYDDgfsDgrvAAX0AqKjIW0fuzzhJASk'
	,'56CGwXwOaH1bGLBGQX0H31Gch6CGgYf93gGkOJCGgYIh3%2F8JUBjQHg6J%2FgSMlBABob%2BbOHPq3Mmzp8%2BfQIMKHUq'
	,'0qNEUAiBAOHZ0RYN10p41PZGg6jQHNk%2FM07q1BD2vX0l0BdB1rIiKKhgoMMD0BANpVqmpMHv2AVm7I7aa1Yu3bl6%2BYv'
	,'uuUEDYXdq40qqhoHu38d%2Bwfvf2pRjYcYq1a0FNg5vVBGPAfy03lhwa8mjBJxqs7Yzi6WapgemaPh0b9diythnjSAqB9dT'
	,'fwIMLH068uPHjyJMrX84cnIABCwz4Hj4uAYEEeHIOMAAbhjrr1lO%2Bg65gQXcX0a5fL%2FnOwIL3imlAUG%2Fd8DsI7xfA'
	,'lEFH%2FSKcEAywHw3b9dbcgQgmqOByggw26KAIDAxwnnAGEGAhe0AIoEAE0mXzlBsWTojDhhFwmE0bFroR3w8RLNAiLtg8Z'
	,'aGFbfVgwIv2WaOOGzn%2BIIABCqx4TRk1pkXYgMQNUUAERyhnwJIFFNAjcTdGaWJydCxZ03INBFjkg2CGKeaYCYYAACH5BA'
	,'kHAAAALAAAAABkAGQAAAX%2FICCOZGmeaKqubOu%2BcCzPdG3feK7vfO%2F%2FwBnDUCAMBMGkTkA4OA8EpHJKMzyfBqo2V'
	,'kBcEYWtuNW8HsJjoIDReC2e3kPEJRgojulVPeFIGKQrEGYOgCoMBwiJBwx5KQMOkJBZLQILkAuFKQ2IiYqZjQANfA4HkAlt'
	,'dKgtBp2tA6AlDJGzjD8KrZ0KsCSipJCltT63uAiTuyIGsw66asQHn6ACCpEKqj8DrQevxyVr0D4NCgTV3OXm5%2Bjp6uvs7'
	,'e7v6gIQEQkFEDgNCxELwfACBRICBtxGQ1QCPgn6uRsgsOE9GgoQ8inwLV2ChgLRzKCHsI9Cdg4wBkxQw9LBPhTh%2FwG4KH'
	,'IODQYnDz6Ex1DkTCEL6t189w%2BjRhsf%2FQ04WACPyqNIkypdyrSp06dQo0qdSrWqVUcL%2BNER0MAa1AYOHoh9kKCiiEo'
	,'E6nl1emDsWAIrcqYlkDKF2BNjTeQl4bbEXRF%2F%2F47oe8KABLdjg4qAOTcBAcWAH%2BiVLBjA3cqXJQ%2FWbDkzX84oFC'
	,'Aey%2BwEg8Zp136e3Pnz3sitN28mDLsyiQWjxRo7EaFxXRS2W2OmDNqz7NrDY5swkPsB5FC91a6gHRm08OKvYWu3nd1EW8R'
	,'w9XA1q1TAd7Flr76wo1W9%2B%2Ffw48ufT7%2B%2B%2Ffv48%2Bs%2FwXUABPLwCWAAAQRiolQD%2F%2BFDIKRdBOz0TjgK'
	,'kGNDAwsSSJBKEESowHOUEFjEY0lJEyGAegyw4G5HNcAAiS0g2ACL%2B8Uo44w01mjjjTi%2BwMCKMs5TQAQO%2BiCPAQme0'
	,'0AEP%2F4IIw0DZLVAkLA0kGQBBajGQ5MLKIDiMUcmGYGVO0CQZXvnCIAkkFOsYQCH0XQVAwP%2BsRlgVvssadU8%2B6Cp3z'
	,'z66JmfNBFE8EeMKrqZ46GIJqrooi6EAAAh%2BQQJBwAAACwAAAAAZABkAAAF%2FyAgjmRpnmiqrmzrvnAsz3Rt33iu73zv%'
	,'2F0Baw2BoBI88g2N5MCCfNgZz6WBArzEl1dHEeluGw9Sh%2BJpTg%2B1y8GpABGdWQxFZWF0L7nLhEhAOgBFwcScNCYcOCX'
	,'ctAwsRbC5%2FgIGEJwuIh3xADJOdg5UjEQmJowlBYZ2AEKAkeZgFQZypB0asIgyYCatBCakEtiQMBQkFu0GGkwSfwGYQBov'
	,'M0dLT1NXW19jZ2ts%2BAgYKA8s0As6Q3AADBwjrB9AzogkEytwN6uvs4jAQ8fxO2wr3ApqTMYAfgQSatBEIeK8MjQEHIzrU'
	,'BpAhgoEyIkSct62BxQP5YAhoZCDktQEB2%2F%2Bd66ZAQZGVMGPKnEmzps2bOHPq3Mmzp88v5Iz9ZLFAgtGLjCIU8IezqFG'
	,'jDzCagCBPntQSDx6cyKoVa1avX0mEBRB2rAiuXU00eMoWwQoF8grIW2H2rFazX%2FHeTUs2Lde%2BYvmegMCWrVATC%2BRW'
	,'pSsYsN6%2FI%2FLyHYtWL%2BATAwo%2FPVyCatWrgU1IDm3Zst2%2Bk%2FeiEKBZgtsVA5SGY1wXcmTVt2v77aq7cSvNoIe'
	,'OcOo6uPARAhhwPs68ufPn0KNLn069uvXrfQpklSAoRwOT1lhXdgC%2BBQSlEZZb0175QcJ3Sgt039Y%2B6%2BsZDQrI119L'
	,'W%2F26MUQQ33zaSFDfATY0kFh2euewV9l748AkwAGVITidAAA9gACE2HXo4YcghijiiN0YEIEC5e3QAAP9RWOiIxMd0xKK0'
	,'zhSRwRPMNCSAepVYoCNTMnoUopxNDLbEysSuVIDLVLXyALGMSfAAgsosICSP01J5ZXWQUBlj89hSeKYZJZpJoghAAAh%2BQ'
	,'QJBwAAACwAAAAAZABkAAAF%2FyAgjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F0Bag8FoBI%2B8RmKZMCKfNQbTkSAIoNgYZEl'
	,'NOBjZcGtLLUPE6JSg601cXQ3IO60SQAzyF9l7bgkMbQNzdCUCC1UJEWAuAgOCLwYOkpIDhCdbBIiVQFIOB5IHVpYlBpmmC0'
	,'EMk6t9oyIDplUGqZ%2Bek06uAAwEpqJBCqsOs7kjDAYLCoM%2FDQa1ycSEEBCL0NXW19jZ2tvc3d7fPwJDAsoz4hC44AIFB'
	,'%2B0R5TGwvAbw2Q0E7fnvNQIEBbwEqHVj0A5BvgPpYtzj9W%2BTNwUHDR4QqBAgr1bdIBzMlzCGgX8EFtTD1sBTPgQFRv%2'
	,'F6YTAgDzgAJfP5eslDAAMFDTrS3Mmzp8%2BfQIMKHUq0qNGjSJMisYNR6YotCBAE9GPAgE6fEKJqnbiiQYQCYCmaePDgBNm'
	,'yJc6mVUuC7Ai3AOC%2BZWuipAStUQusGFDgawQFK%2BTOjYtWhFvBhwsTnlsWseITDfDibVoCAtivgFUINtxY8VnHiwdz%2'
	,'Fty2MwoBkrVSJtEAbNjAjxeDnu25cOLaoU2sSa236wCrKglvpss5t%2FDHcuEO31z57laxTisniErganQSNldf3869u%2Ff'
	,'v4MOLH0%2B%2BvHk%2FA5YQeISjQfBr6yTIl5%2FSxp2%2F76sNmM9fuwsDESyAHzgJ8DdfbzN4JWCkBBFYd40DBsqXgA0D'
	,'MIhMfsQUGGEENjRQIR4v7Rehfy9gWE18%2FDkEnh0RJELieTDGKOOMNAa1DlkS1Bceap894ICJUNjhCJAyFNAjWahAA8ECT'
	,'Krow5FkIVDNMcgMAwSUzFnCAJMLvHiDBFBKWQ1LLgERAZRJBpVTiQ70eMBQDSigAHSnLYCAj2kCJYCcBjwz3h98EnkUM1ad'
	,'J2iNiCaq6KKLhgAAIfkECQcAAAAsAAAAAGQAZAAABf8gII5kaZ5oqq5s675wLM90bd94ru987%2F%2FAoHAYEywShIWAyKw'
	,'tCMjEokmFCaJQwrLKVTWy0UZ3jCqAC%2BSfoCF%2BNQrIQrvFWEQU87RpQOgbYg0MMAwJDoUEeXoiX2Z9iT0LhgmTU4okEH'
	,'0EZgNCk4WFEZYkX5kEEEJwhoaVoiIGmklDEJOSgq0jDAOnRBBwBba3wcLDxMXGx8jJysvMzUJbzgAGn7s2DQsFEdXLCg4HD'
	,'t6cNhHZ2dDJAuDqhtbkBe%2BPxgze4N8ON%2BTu58jp6%2BA3DPJtU9aNnoM%2FOBrs4wYuAcJoPYBBnEixosWLGDNq3Mix'
	,'o8ePIEOKxGHEjIGFKBj%2FDLyY7oDLA1pYKIgQQcmKBw9O4MxZYmdPnyRwjhAKgOhQoCcWvDyA4IC4FAHtaLvJM2hOo0WvV'
	,'s3K9ehRrVZZeFsKc0UDmnZW%2FjQhFOtOt2C9ingLt%2BuJsU1dolmhwI5NFVjnxhVsl2tdwkgNby0RgSyCpyogqGWbOOvi'
	,'tlvfriVc2LKKli9jjkRhRNPJ0ahTq17NurXr17Bjy55NG0UDBQpOvx6AoHdTiTQgGICsrIFv3wdQvoCwoC9xZAqO%2B34Ow'
	,'0DfBQ%2BVEZDeW4GNOgsWTC4WnTv1QQaAJ2vA9Hhy1wPaN42XWoD1Acpr69%2FPv79%2FZgN8ch5qBUhgoIF7BSMAfAT07T'
	,'DAgRCON8ZtuDWYQwIQHpigKAzgpoCEOGCYoQQJKGidARaaYB12LhAwogShKMhAiqMc8JYDNELwIojJ2EjXAS0UCOGAywxA1'
	,'05EjgBBBAlMZdECR%2BLESmpQRjklagxE%2BYB6oyVwZImtCUDAW6K51mF6%2F6Wp5po2hAAAIfkECQcAAAAsAAAAAGQAZA'
	,'AABf8gII5kaZ5oqq5s675wLM90bd94ru987%2F%2FAoHAYE0AWC4iAyKwNCFDCoEmFCSJRQmRZ7aoaBWi40PCaUc%2Fo9Ow'
	,'TNMqvhiE84LYYg4GSnWpEChEQMQ0MVlgJWnZ8I36AgHBAT4iIa4uMjo9CC5MECZWWAI2Oij4GnaefoEcFBYVCAlCIBK6gIw'
	,'wNpEACCgsGubXAwcLDxMXGx8jJysvMZ7%2FKDAsRC5A1DQO9z8YMCQ4J39UzBhHTCtrDAgXf3gkKNg3S0hHhx9zs3hE3BvL'
	,'mzOnd6xbcYDCuXzMI677RenfOGAR1CxY26yFxosWLGDNq3Mixo8ePIEOKHEmyZDEBAwz%2FGGDQcISAlhMFLHBwwIEDXyyO'
	,'ZFvx4MGJnj5LABU6lETPEUcBJEVa9MQAm1Ad0CshE4mCqUaDZlWqlatXpl9FLB26NGyKCFBr3lyxCwk1nl3F%2BiwLlO7cr'
	,'mPr4r17NqpNAzkXKMCpoqxcs0ftItaaWLFhEk9p2jyAlSrMukTjNs5qOO9hzipkRiVsMgXKwSxLq17NurXr17Bjy55Nu7Zt'
	,'IoRWwizZIMGB3wR2f4FQuVjv38gLCD8hR8HVg78RIEdQnAUD5woqHjMgPfpv7S92Oa8ujAHy8%2BTZ3prYgED331tkp0Mef'
	,'7YbJctv69%2FPv7%2F%2FHOlI0JNyQ%2BxCwHPACOCAmV4S5AfDAAhEKF0qfCyg14BANCChhAc4CAQCFz6mgwIbSggYKCGK'
	,'mAOJJSLgDiggXiiBC9cQ5wJ3LVJ4hoUX5rMCPBIEKcFbPx5QYofAHKAXkissIKSQArGgIYfgsaGAki62JMCTT8J0Wh0cQcC'
	,'lkIK8JuaYEpTpGgMIjIlAlSYNMKaOq6HUpgQIgDkbAxBAAOd%2FgAYqKA0hAAAh%2BQQJBwAAACwAAAAAZABkAAAF%2FyAg'
	,'jmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcChrQAYNotImiBQKi%2BRyCjM4nwOqtmV4Og3bcIpRuDLEaBNDoTjDGg1BWmV'
	,'QGORDA2GfnZusCxFgQg17BAUEUn4jEYGNQwOHhhCLJFYREQpDEIZ7ipUCVgqfQAt7BYOVYkduqq6vsLGys7S1tre4ubq7Uw'
	,'IDBn04DAOUuwJ7CQQReDUMC8%2FFuXrJydE0Bs92uwvUBAnBNM7P4LcK3ufkMxDAvMfnBbw9oQsDzPH3%2BPn6%2B%2Fz9%'
	,'2Fv8AAwocSLCgwYO9IECwh9AEBAcJHCRq0aAOqRMPHmDMaCKjRhIeP47gKIIkyZEeU%2F8IgMiSABc2mlacRAlgJkebGnGi'
	,'zCmyZk8UAxIIHdoqRR02LGaW5AkyZFOfT5c6pamURFCWES%2BaCGWgKIqqN3uGfapzqU%2BxTFEIiChUYo%2BpO0uM3fnzp'
	,'Mm6VUs8jDixoVoIDBj6HUy4sOHDiBMrXsy4sWMSTSRkLCD4ltcZK0M%2BQFB5lgIHEFPNWKB5cq7PDg6AFh0DQem8sVaCBn'
	,'0gQY3XsGExSD0bdI0DryXgks0bYg3SpeHhQj07HQzgIR10lmWAr%2FMYC1wjWDD9sffv4MOLR3j1m5J1l%2F0UkMCevXIgD'
	,'RIcQHCAQHctENrrv55D%2FoH%2FB7ynnn7t2fYDAwD%2BR59zVmEkQCB7BvqgQIIAphdGBA9K4JILcbzQAID0%2FcfgFvk9'
	,'aE0KDyFA34kp%2BAdgBK4MQKCAKEqg4o0sniBAAQBS9goEESQQQY4nJHDjjRGy0EBg%2FRx55GFO3ngYAVFuWBiCRx4w4kE'
	,'NFKBiAVuOJ%2BaYZIoZAgAh%2BQQJBwAAACwAAAAAZABkAAAF%2FyAgjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcChrMB'
	,'oNotImUCwiiuRyCoNErhEIdduCPJ9arhgleEYWgrHaxIBAGDFkep1iGBhzobUQkdJLDAtOYUENEXx8fn8iBguOBkMNiImLJ'
	,'F6CA0MCBYh9lSMCEAYQikAMnBFwn2MCRquvsLGys7S1tre4ubq7vDqtpL5HvAIGBMYDeTTECgrJtwwEBcYEzjIMzKO7A9PG'
	,'pUUGzN61EMbSBOIxoei0ZdOQvTuhAw3V8Pb3%2BPn6%2B%2Fz9%2Fv8AAwocSBCQo0wFUwhI8KDhgwPrerUSUK8EAYcOD%2'
	,'FCTRCABGhUMMGJ8d6JhSZMlHP%2BmVEkCJQCULkVgVFggQUcCC1QoEOlQQYqYMh%2B8FDrCZEyjRIMWRdoyaZ2bNhOoOmGA'
	,'Z8OcKIAO3bqUpdKjSXk25XqiQdSb60JaJWlCK9OlZLeChetVrtMSm85iTXFRpMafdYfefRsUqEuYg7WWkGTTk4qFGB1EHEa'
	,'vIpuDCTNr3sy5s%2BfPoEOLHk063YCaCZD1mlpjk4TXrwtYjgWh5gLWMiDA3o3wFoQECRwExw2jwG7YCXDlFS58r4wEx187'
	,'wMUgOHDgEWpEiC4h%2Ba281h34pKE7em9b1YUDn7xiwHHZugKdYc%2FCSoIss0vr38%2B%2Fv%2F%2FRTRAQhRIC4AHLAAc'
	,'goCCkAuf50IACDkTYzCcCJLiggvTRAKEDB0TIFh0GXLjgeD4wwGGEESaQIREKiKggiT2YiOKJxI0xgIsIfKgCPS%2BYFWGH'
	,'wq2oiYULHpCfCFZE%2BFELBszoQIN0NEDkATWaIACHB2TpwJEAEGOdaqsIMIACYLKwQJZoHuDcCkZweUsBaCKQJQGfEZBml'
	,'gV8ZkCCceqYWXVpUgOamNEYIOR%2FiCaq6KIAhAAAIfkECQcAAAAsAAAAAGQAZAAABf8gII5kaZ5oqq5s675wLM90bd94ru'
	,'987%2F%2FAoHBIExCPOMhiAUE6ZYLl0vissqJSqnWLGiwUA64Y1WiMfwKGmSgwgM%2BotsKwFhoWkYgBbmIo%2FgxEeXgLf'
	,'CUNfwp1QQp4eoaHakdRelqQl5iZmpucnZ6foKGioz8LCA8IC5akOAcPr68Oq6CzMguwuAWjEBEFC4syDriwEqICvcg2w7ii'
	,'DQXPBRHAMKfLD8bR0RE2t8u6ogzPEU01AsK4ErWdAtMzxxKvBeqs9PX29%2Fj5%2Bvv8%2Ff7%2FAAMKNAEBwryBJAYgkMC'
	,'wEMIUAxhKlOBQn4AB0cKsWDiRYTsRr07AMjGSBDOT10D%2FpgyJkmUXAjAJkEMBoaPEmSRTogTgkue1niGB6hwptAXMAgR8'
	,'qahpU4JGkTpHBI06bGdRlSdV%2BlQRE6aCjU3n9dRatCzVoT%2FNqjCAFCbOExE7VoQ6tqTUtC2jbtW6967eE2wjPFWhUOL'
	,'chzQNIl7MuLHjx5AjS55MubJlGQ3cKDj4kMEBBKARDKZ1ZwDnFQI%2Bhwb9UZMAAglgb6uhcDXor6EUwN49GoYC26AJiFoQ'
	,'u3jvF7Vt4wZloDjstzBS2z7QWtPuBKpseA594LinAQYU37g45%2FTl8%2BjTq19fmUF4yq8PfE5QPQeEAgkKBLpUQL7%2FB'
	,'EJAkMCADiSwHx8NyIeAfH8IHOgDfgUm4MBhY0Dg34V7ACEhgQnMxocACyoon4M9EBfhhJdEcOEBwrkwQAQLeHcCAwNKSEB9'
	,'VRzjHwHmAbCAA0Ci6AIDeCjiGgQ4jjBAkAcAKSNCCgQZ5HKOGQBkk0Bm%2BBgDUjZJYmMGYOmAlpFlRgd7aKap5poyhAAAI'
	,'fkECQcAAAAsAAAAAGQAZAAABf8gII5kaZ5oqq5s675wLM90bd94ru987%2F%2FAoHBIExCPOIHB0EA6ZUqFwmB8WlkCqbR6'
	,'9S0cD8SCy2JMGd3f4cFmO8irRjPdW7TvEaEAYkDTTwh3bRJCEAoLC35%2FJIJ3QgaICwaLJYGND0IDkRCUJHaNBXoDAxBwl'
	,'Gt3EqadRwIFEmwFq6y0tba3uLm6u7y9viYQEQkFpb8%2FAxLJybLGI7MwEMrSA81KEQNzNK%2FSyQnGWQsREZM1CdzJDsYN'
	,'4RHh2TIR5xLev1nt4zbR59TqCuOcNVxxY1btXcABBBIkGPCsmcOHECNKnEixosWLGDNq3MjxCIRiHV0wIIAAQQKAIVX%2FM'
	,'DhQsqQElBUFNFCAjUWBli0dGGSEyUQbn2xKOOI5IigAo0V%2FpmBQIEIBgigg4MS5MynQoz1FBEWKtatVrVuzel2h4GlTfl'
	,'GntnzGFexYrErdckXaiGjbEv6aEltxc%2BqbFHfD2hUr%2BGvXuIfFmmD6NEJVEg1Y4oQJtC3ixDwtZzWqWfGJBksajmhA0'
	,'iTllCk%2BikbNurXr17Bjy55Nu7bt20HkKGCwOiWDBAeC63S4B1vvFAIIBF%2Be4DEuAQsISCdHI%2FLy5ad1QZBeQLrzMs'
	,'sRLFdgDKF0AgUUybB%2B%2FYB6XiO7Sz9%2BQkAE8cEREPh%2By8B5hjbYtxxU6kDQAH3I7XEgnG4MNujggxBGCAVvt2Xhw'
	,'IUK8JfEIX3YYsCFB2CoRwEJJEQAgkM0ANyFLL7HgwElxphdGhCwCKIDLu4QXYwEUEeJAAnc6EACOeowAI8n1TKAjQ74uIIA'
	,'o9Bnn4kRoDgElEEmQIULNWY54wkMjAKSLQq%2BIMCQQwZp5UVdZpnkbBC4OeSXqCXnJpG1qahQc7c1wAADGkoo6KCEFrpCC'
	,'AA7AAAAAAAAAAAA'
].join('');

// global variables
var g$;
var g_;
var garrAjaxInterceptors = [];
var gblnGotFollowing = false;
var garrFollowing = [];
var gmapFollowing = {};
var gelFollowing;
var gintFilterHours = 0;
var gstrLocationNoHash = location.href.replace(/#.*$/, '');
var garrMissed = [];
var gstrPageUser;
var gblnPageUserInUrl;
var gjqOthersTab;
var gblnReload = false;
var gintPromptForProtected = 1;
var gintProtectedOutline = 2;
var gintRepliesDays = 1;
var gintSequence = 0;
var gstrSessionUser;
var gjqSide;
var gintSort = PREF.SORT.FOLLOW_SEQUENCE;
var gobjUnsafeWindow = (function(){try{return unsafeWindow;}
		catch(x){return (function(){return this;})();}})();
var gblnUser404;

// "real" functions
function init () {
	var then = new Date();
	gintFilterHours = getPersistentValue(PREF.FILTER_HOURS, gintFilterHours);
	gintPromptForProtected = getPersistentValue(PREF.SEEK_PROTECTED, gintPromptForProtected);
	gintProtectedOutline = getPersistentValue(PREF.PROTECTED_OUTLINE, gintProtectedOutline);
	gintRepliesDays = getPersistentValue(PREF.REPLIES_DAYS, gintRepliesDays);
	gintSort = getPersistentValue(PREF.SORT, gintSort);
	gstrSessionUser = getSessionUser();
	gstrPageUser = getPageUser();
	gblnPageUserInUrl = (new RegExp(
		'^\\w+:[/]*.*?[/]' + (gstrPageUser || '$.') + '([/]|$)', 'i'
	)).test(gstrLocationNoHash);
	gblnUser404 = !gstrPageUser && /^\w+:[/]*.*?[/].+?([/]|$)/.test(gstrLocationNoHash);

	// user settings
	registerMenuCommand(SCRIPT.name + ": handle protected users", function(){
		setPersistentValue(PREF.SEEK_PROTECTED, gintPromptForProtected =
				(confirm(FOLLOWING_PROTECTED_PROMPT) ? 0 : 1));
	});
	registerMenuCommand(SCRIPT.name + ": protected user outline width", function(){
		var strInput = prompt('Protected users outline width (pixels):', gintProtectedOutline);
		strInput = (strInput !== null) && parseInt(strInput || 0, 10);
		if (strInput || strInput === 0) {
			setPersistentValue(PREF.PROTECTED_OUTLINE, gintProtectedOutline = strInput);
		}
	});

	// add new tabs (must happen early for potential |replacePage|)
	var _obj = {user: gstrPageUser};
	if (!addTab('@others'
		,{title: defer_('Replies by @%{user}', _obj), heading: defer_('Replies by @%{user}', _obj)}
		,ajaxOthers
		,{
			 htmlLabel: ['@', $E('i',{},'others')]
			,htmlTitle: defer_('Replies to others by @%{user}', _obj)
			,precedingTabSelector: '#replies_tab, #profile_tab'
			,onReload: init
		}
	)){ return; }
	if (((gstrPageUser && gstrSessionUser == gstrPageUser) || gblnUser404) && !addMissedTab()) {
		return;
	}

	// gobjUnsafeWindow.jQuery
	executeOnCondition(
		function(){ return (gobjUnsafeWindow.jQuery || false); }	// satisfied/continue
		,function(){
			g$ = gobjUnsafeWindow.jQuery;
			g_ = gobjUnsafeWindow._ || replaceParams;
			gjqSide = g$('#side_base');
			interceptAjax();
		}
		,null
		,50
	);

	// try to show updates under #following list for 1 minute (2 second intervals)
	executeOnCondition(function(){	// #following_list found
		gelFollowing = gelFollowing || document.getElementById('following_list');
		if(gelFollowing){ return true; }	// satisfied
		if(((new Date()) - then) <= T_MIN){ return false; }	// continue
		return null;	// abort
	}, null, showUpdate, T_SEC * 2);

	if (gstrPageUser) {
		// show all followers for the page user
		executeOnCondition(
			function(){	// found #following_list
				gelFollowing = gelFollowing || document.getElementById('following_list');
				return (gelFollowing || false);	// satisfied/continue
			}
			,function(){
				showUpdate();
				if(gstrSessionUser == gstrPageUser){ return activateFollowing(); }
	
				var elActivate = gelFollowing.parentNode.insertBefore(
						$E('button', {style:'display:block;margin:auto;padding:0;font-size:small;'}, 'CatchUp'),
						gelFollowing);
				elActivate.addEventListener('click', function(){
					activateFollowing();
					elActivate.parentNode.removeChild(elActivate);
				}, true);
			}
			,null
			,T_SEC * 2
		);
	}

	// global styles
	addPageStyle(['body[id="@others"] ol.statuses li { padding-left: 0.5em; }',
			'body[id="@others"] ol.statuses span.status-body { margin-left: 0; }'].join('\n'));
}

function ajaxOthers (objUrlParts, fnAjax, objSettings) {
	var fnSuccess = objSettings.success;
	objSettings.url = objUrlParts.base + (objUrlParts.user == gstrPageUser ? '' : '/' + gstrPageUser);
	objSettings.success = function(objData){
		var processed = processOthers(objData, objUrlParts.suffix);
		arguments[0] = processed.data;
		var r = fnSuccess.apply(this, arguments);
		if(processed.listener){ setTimeout(processed.listener,50); }
		return r;
	};
	fnAjax.call(this, objSettings);
}

function processOthers (objData, strSuffix) {
	var countIn = 0, countOut, fnListener = undefined;

	if (objData['#pagination']) {
		objData['#pagination'] = objData['#pagination'].replace(/href="(.*?)"/g,
				'href="$1#' + strSuffix + '"');
	}

	if (objData['#timeline']) {
		var timeline = g$(objData['#timeline']);
		countIn = timeline.find(".hentry").length;
		timeline = timeline.find(".hentry")	// statuses
			.filter(isNotReply)	// non-replies
				.remove()
			.end()	// back to statuses
		.end();	// back to timeline
		countOut = timeline.find(".hentry").length;
		objData['#timeline'] = g$('<div/>').append(timeline).html();
	}

	fnListener = function(){
		updateLocation(strSuffix, true);
		if (countIn > 0
				&& (countOut == 0 || (g$('#timeline').find(".hentry").length) < OTHERS_MINIMUM_LENGTH)) {
			g$('#pagination #more').click();
		}
	};

	return {data: objData, listener: fnListener};
}

function addMissedTab () {
	// ensure a scope-meaningful $
	var $ = g$ || function(v){
		var o = Array.prototype.slice.call(arguments);
		o.css = o.fadeIn = o.fadeOut = function(){return '';};
		o.hover = function(){return this;};
		return o;
	};
	
	// make a picker for gintRepliesDays
		// selectedIndex analog
	var elSelection = $E('span', {style:'display:inline;font:inherit'}, ['']);
		// <select> analog
	var $side = $('#side_base');
	var border = $side.css('border-left-color') || $side.css('border-right-color') || 'black';
	var background = $side.css('background-color') || 'inherit';
	var elPicker = attachEventListener(
		 $E('ul', {'class': 'CatchUp_tabPicker', style:'display:none;position:absolute;top:2em;right:0;'
		 		+ 'z-index:1;line-height:1.3;text-align:left;white-space:nowrap;'
				+ 'border:1px solid ' + border + ';background-color:' + background + ';'})
		,'click'
		,function(evt){
			var el = evt.srcElement || evt.originalTarget || evt.target;
			var value = parseInt(el.getAttribute('value'), 10);
			if (value) {
				setPersistentValue(PREF.REPLIES_DAYS, gintRepliesDays = value);
				elSelection.firstChild.nodeValue = value + ' days$'.slice(0, value == 1 ? -2 : -1);
			}
			try { evt.stopPropagation(); evt.preventDefault(); }catch(x){}
			try {	// refresh the tab if it is already active
				g$(document.evaluate(
					 "ancestor::*[contains(concat(' ',translate(@class,'\t\n','  '),' '), ' active ')][1]"
					,this, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue).click();
			}catch(x){}
			return evt.returnValue = false;
		}
		,true
	);
		// <option> analogs
	for (var i = 1, t; i <= 4; i++) {
		t = i + ' days$'.slice(0, i == 1 ? -2 : -1);
		elPicker.appendChild($E('li', {style: 'padding:0;'},
				$E('a', {value: i, style: 'margin-right:1px;padding:1px 1.3em 1px 5px;'}, t)));
		if(gintRepliesDays == i){ elSelection.firstChild.nodeValue = t; }
	}
		// global styles
	addPageStyle('ul.CatchUp_tabPicker li a:not(:hover) { background-color:inherit; }');

	// add the tab
	var added = addTab('*missed'
		,{title: '#fixreplies', heading: defer_('Missed replies')}
		,ajaxMissed
		,{
			 htmlLabel: [
				 $($E('span'
						,{title:'Maximum age of reply', class:'stat_count CatchUp_tabPickerParent',
								style:'position:relative;top:-.5em;height:2em;'
								+ 'font-size:80%;line-height:2.5;text-align:right;overflow:visible;'}
						,elSelection, ' \u25BC', elPicker
				)).hover(function(){$(elPicker).fadeIn('fast');}, function(){$(elPicker).fadeOut();})[0]
				,defer_('Missed')
			]
			,htmlTitle: defer_('See tweets dropped by #fixreplies')
			,hideForOthers: true
			,precedingTabSelector: '#home_tab, #profile_tab'
			,onReload: init
			//,dispatchAction: 'profile'
		}
	);
	if (added && $ !== g$) {
		var then = new Date();
		executeOnCondition(
			function(){	// jQuery
				if(g$){ return true; }	// satisfied
				if(((new Date()) - then) <= T_MIN){ return false; }	// try for 1 minute
				return null;	// abort
			}
			,function(){
				$side = g$('#side_base');
				border = $side.css('border-left-color') || $side.css('border-right-color') || 'black';
				background = $side.css('background-color') || 'inherit';
				g$(elPicker).css('border-color', border).css('background-color', background);
				g$(elPicker.parentNode).hover(function(){g$(elPicker).fadeIn('fast');},
						function(){g$(elPicker).fadeOut();});
			}
			,function(){
				addPageStyle('.CatchUp_tabPickerParent:hover .CatchUp_tabPicker) { '
						+ 'display:block !important; }');
			}
		);
	}
	return added;
}

function ajaxMissed (objUrlParts, fnAjax, objSettings, _tsAbort) {
	// run AJAX pre-callback
	fnAjax({async: false, global: false, url: BAD_URL, beforeSend: objSettings.beforeSend});
	
	// define finisher, and jump into it if this is a "more" request
	var finish = function(){
		// fake an AJAX response with a timeline of up to MISSED_PAGE entries
		var timeline = g$(garrMissed.timelineHtml);
		for (var a = garrMissed.splice(0,MISSED_PAGE), i = 0; i < a.length; i++) {
			timeline.append(a[i].entry);
		}
		var argsSuccess = [{
			 users: {}	// just in case
			,'#pagination': (garrMissed.length == 0 ? '' :
					replaceParams(HTML_MORE, {url: objUrlParts.url.replace(/(##.*)?$/, '##more')}))
			,'#timeline': g$('<div/>').append(timeline).html()	// compiled #timeline
		}, 'success'];
		fnAjax({async: false, global: false, url: BAD_URL, complete: objSettings.complete,
			error: function(){
				if(!argsSuccess){ return; }	// avoid double calls
				try{ objSettings.success.apply(this, argsSuccess); }catch(x){}
				argsSuccess = timeline = finish = undefined;	// free memory
			}
		});
	};
	if(objUrlParts.params == 'more' && garrMissed.timelineHtml){ return finish(); }

	// wait for garrFollowing
	var now = new Date();
	if (!gblnGotFollowing) {
		arguments[3] = arguments[3] || (now.getTime() + 15 * T_SEC);	// _tsAbort
		if(now <= arguments[3]){ return setTimeout(getCallback(arguments), T_SEC); }
		return fnAjax({global: ('global' in objSettings ? objSettings.global : true), url: BAD_URL,
			error: objSettings.error || function(){showNotification(g_(ABORT_TEXT));}
		});
	}

	// clear garrMissed, find tab, determine cutoff time, and make the initial URL queue
	garrMissed = [];
	var $tab = g$("ul.sidebar-menu li.loading"), $text = $tab.children("a"), hasProtected = false;
	var tsAfter = new Date(now.getFullYear(),now.getMonth(),now.getDate()) - gintRepliesDays * T_DAY;
	var queue = garrFollowing.filter(function(user){
		hasProtected = hasProtected || user.protected;
		return user.protected || (user._CatchUp_last_update >= tsAfter);
	});
	var sortFunction = sortFollowing_lastUpdate;
	if (queue.length > MAX_CATCHUP && (hasProtected
			? confirm(MISSED_LIMIT_PROMPT) : alert(MISSED_LIMIT_TEXT) && false)) {
		sortFunction = sortFollowing_lastUpdate_protectedFirst;
	}
	queue.sort(sortFunction);
	queue = queue.slice(0, MAX_CATCHUP);
	for (var i = queue.length - 1; i >= 0; i--) {
		queue[i] = URL_STATUSES.toString({screen_name: queue[i].screen_name});
	}

	// define response processor
	var aborted = false, processed = 0, pending = 0, width = $tab.outerWidth();
	var cssTab = $tab.css('cssText'), cssText = $text.css('cssText'), bgUri = getSolidBitmapUri(
		 	gjqSide.css('background-color').replace(/^$/,'127,127,127').replace(/[^0-9,]/g,'').split(','),
			width, $tab.outerHeight());
	$tab.css('background', [$text.css('background-color') || 'transparent', 'url("'+bgUri+'")',
			'no-repeat', Math.round(width * 0.8/queue.length) + 'px', 0].join(' '));
	$text.css('cssText', cssText.replace(/([^;])\s*$/, '$1;')
			+ 'background-color:transparent !important');
	var process = function(objData){
		if(aborted){ return; }
		var urlNext, strTimeline = objData && objData['#timeline'];

		if (strTimeline) {	// successful response
			// loop over and extract reply statuses
			var user = gmapFollowing[URL_STATUSES.getParams(this.url).screen_name];
			var $entries = g$(strTimeline).find("> .hentry");
			var varEarliest = $entries.filter(":last")
					.find(".status-body > .entry-meta > .entry-date > .timestamp").attr('data');
			$entries.filter(isMissedReply).each(function(){
				var $this = g$(this).removeClass('latest-status'), timestamp = now;
					// get timestamp and abort if it predates tsAfter
				try {
					timestamp = Date.parse(eval('('
						+ $this.find(".status-body > .entry-meta > .entry-date > .timestamp").attr('data')
					+ ')').time)
				}catch(x) {}
				if(timestamp < tsAfter){ return; }
					// add a user avatar image and (if necessary) screen name, and reformat retweet images
				$this.prepend(g$(replaceParams(HTML_AVATAR, user)));
				$this.find(".status-body:not(:has(> strong > .screen-name, > strong > .username))"
						+ " .status-content").prepend(g$(replaceParams(HTML_SCREEN_NAME, user)));
				$this.find(".big-retweet-icon").css({position:'relative', top:'1em', left:'-3.1em',
						zIndex:99, marginRight:'-28px', border:'3px solid white', backgroundColor:'white'});
					// capture the entry
				garrMissed.push({time: timestamp, entry: $this});
			});
			$entries = undefined;
				
			// seek more history if the earliest status postdates tsAfter
			try {
				varEarliest = Date.parse( eval('(' + varEarliest + ')').time );
				urlNext = (varEarliest >= tsAfter) && g$(objData['#pagination'] || '<a/>').attr('href');
			}catch(x){}
			if(urlNext){ queue.push(urlNext); }

			// processing finished; update progress and decrement pending count
			processed += 1;
			pending -= 1;
		}
		else if (objData !== null) {	// error response
			if (this.url.retries >= MAX_RETRIES) {	// retry limit exceeded; alert the user and abort
				aborted = (objData.status >= 400 && objData.responseText) || g_(ABORT_TEXT) || ABORT_TEXT;
				showNotification(aborted);
				return;
			}
			// increment retry count, requeue URL, and decrement pending count
			this.url.retries = (this.url.retries || 0) + 1;
			queue.push(this.url);
			pending -= 1;
		}

		// "atomically" get the next URL and increment pending
		pending += (urlNext = queue.splice(0, 1)).length;

		// show progress
		if (processed > 0) {
			$tab.css('background-position',
					Math.round(width * processed/(processed + pending + queue.length)) + 'px 0');
		}

		if (0 == urlNext.length && 0 == pending) { // no more URLs and none pending; time to finish
			$text.css('cssText', cssText);
			$tab.css('cssText', cssTab);
			garrMissed.sort(function(a,b){return b.time - a.time;});	// sort by descending timestamp
			garrMissed.timelineHtml = strTimeline.replace(/>(.|\n)*$/m, '/>');	// <ol id='timeline'...
			finish();
			setTimeout(function(){updateLocation(objUrlParts.suffix);}, 50);
			process = undefined;	// free memory
		}
		else if (urlNext[0]) {	// retrieve and process the next URL
			getJSON(urlNext[0], arguments.callee, arguments.callee, undefined, T_MIN);
		}
	};

	// show more or initiate processor threads, as appropriate
	for(var i = Math.min(queue.length, MAX_SIMULTANEOUS_REQUESTS) || 1; i > 0; i--){ process(null); }
}

function activateFollowing () {
	getFollowing(gstrPageUser, function(){
		gblnGotFollowing = true;
		addFollowingControls();
		sortFollowing();
		showAllFollowing();
		setInterval(function(){try{
			g$(gelFollowing).find('span.vcard a.url').each(function(){
				if(!this.getAttribute('titlePrototype')){ return; }
				this.setAttribute('title', this.getAttribute('titlePrototype')
						.replace(/%\{timestamp\{{0} ([^}]*)\}/, timeAgo));
			});
		}catch(x){} }, T_MIN);
	});
}

function showUpdate (objUpdate, objScript) {
	if(!arguments.length){ return UPDATE.check(UPDATE_CHECK_DAYS, SCRIPT.identifier, SCRIPT, showUpdate); }
	var title = objUpdate.name + ' ' + objUpdate.version + ', released ' + objUpdate.date;
	var elBefore = gelFollowing || document.body.firstChild;
	elBefore.parentNode.insertBefore(
		$E('div', {style: 'font-weight:bold;font-size:small;text-align:center;'}
			,$E('a', {href: objScript.source, title: title}, objScript.name + ' has been ')
			,$E('a', {href: objScript.identifier, title: title, style: 'color:red;background:#ddd;'},
					'updated!')
		)
		,elBefore
	);
//	catch (x) {
//		if (((new Date()) - objUpdate.lastCheck) < T_HR
//				&& confirm('Update ' + objScript.name + ' to ' + title + '?')) {
//			openInTab(objScript.identifier, objScript.name);
//		}
//	}
}

function sortFollowing () {
	var fnSort = sortFollowing_sequence;
	switch (gintSort) {
		case PREF.SORT.ALPHABETIC: fnSort = sortFollowing_alphabetic; break;
		case PREF.SORT.LAST_UPDATE: fnSort = sortFollowing_lastUpdate; break;
		//case PREF.SORT.FOLLOW_SEQUENCE: fnSort = sortFollowing_sequence; break;
	}
	garrFollowing.sort(fnSort);
}
function sortFollowing_sequence (a, b) {
	return (a._CatchUp_sequence - b._CatchUp_sequence);
}
function sortFollowing_alphabetic (a, b) {
	return (a.screen_name.toLowerCase() > b.screen_name.toLowerCase() ? 1 : -1);
}
function sortFollowing_lastUpdate (a, b) {
	return (b._CatchUp_last_update - a._CatchUp_last_update);
}
function sortFollowing_lastUpdate_protectedFirst (a, b) {
	return (a.protected != b.protected ? ((b.protected && 1) || -1) : sortFollowing_lastUpdate(a, b));
}

function showAllFollowing (blnForceRedraw) {
	if(!gelFollowing){ return; }
	for (var a = gelFollowing.childNodes, i = a.length - 1; i >= 0; i--) {
		if (blnForceRedraw || !a[i]._CatchUp_user) {
			gelFollowing.removeChild(a[i]);
			try{ a[i]._CatchUp_user.el = undefined; }catch(x){}
		}
	}
	var tsCutoff = (gintFilterHours ? (new Date()) - T_HR * gintFilterHours : 0);
	for (var i = 0, objUser, el; i < garrFollowing.length; i++) {
		objUser = garrFollowing[i];
		el = objUser.el;
		if (!el || el.parentNode !== gelFollowing) {
			el = objUser.el = createVCard(objUser);
		}
		el.style.display = (objUser._CatchUp_last_update.getTime() < tsCutoff ? 'none' : '');
		gelFollowing.insertBefore(el, null);
	}
}

function addFollowingControls () {
	if(!gelFollowing){ return; }

	// sort
	var elSort = $E('select', {title: 'sort the people you follow', style: 'font-size:inherit;'});
	var options = {
		 'by follow date': PREF.SORT.FOLLOW_SEQUENCE
		,'alphabetically': PREF.SORT.ALPHABETIC
		,'by last tweet': PREF.SORT.LAST_UPDATE
	}
	for (var label in options) {
		elSort.add($E('option', {value: options[label]}, label), null);
		if(gintSort == options[label]){ elSort.lastChild.selected = true; }
	}
	elSort.addEventListener('change', addFollowingControls_sortChange, true);

	// filter
	elFilter = $E('input', {type: 'text', size: 2, value: gintFilterHours || '#',
			title: "hide people who haven't updated within this time frame",
			style: 'width:1.85em;font-size:inherit;text-align:right;'});
	elFilter.addEventListener('change', addFollowingControls_filterChange, true);
	elFilter.addEventListener('keypress', addFollowingControls_filterKey, true);
	elFilter = $E('span', {}, elFilter, ' hours ');

	// add
	gelFollowing.parentNode.insertBefore(
			$E('div', {style: 'font-size:smaller;text-align:center;'}, elFilter, elSort),
			gelFollowing);
}
function addFollowingControls_sortChange () {
	gintSort = parseInt(this.options[this.selectedIndex].value,10) || 0;
	setPersistentValue(PREF.SORT, gintSort);
	sortFollowing();
	showAllFollowing();
}
function addFollowingControls_filterChange () {
	var value = parseInt(this.value || '0', 10);
	if(isNaN(value)){ return; }
	gintFilterHours = value;
	setPersistentValue(PREF.FILTER_HOURS, gintFilterHours);
	showAllFollowing();
}
function addFollowingControls_filterKey (e) {
	if(e.keyCode == 13){ addFollowingControls_filterChange.call(this, e); }
}

function getFollowing (strScreenName, fnDone) {
		// http://apiwiki.twitter.com/Twitter-REST-API-Method%3A-statuses%C2%A0friends
	var seekProtected = undefined, arrProtected = [], strCursor = '-1';
	var strCursoredUrl = URL_FOLLOWING.toString(
			{screen_name: strScreenName || undefined}, {cursor: ''});

	getJSON(strCursoredUrl + strCursor, function(objResponse){
			// check for (and separate) protected users
		for (var a = (objResponse || {}).users || [], i = a.length - 1; i >= 0; i--) {
			if (a[i].protected && a[i].statuses_count) {	// protected user with statuses
				if (!a[i].status && seekProtected === undefined) {	// authentication required for status
					seekProtected = !gintPromptForProtected || confirm(FOLLOWING_PROTECTED_PROMPT);
					if (seekProtected) {
						// trigger authentication request by seeking protected user data; retry when done
						var fnThis = arguments.callee, intMutex = 1, fnRetry = function(){
							if(!((intMutex--) > 0)){ return (++intMutex); }
							getJSON(strCursoredUrl + strCursor, fnThis);
						};
						return getJSON(URL_FOLLOWING.toString({screen_name: a[i].screen_name, cursor: -1}),
								fnRetry, fnRetry, function(r){if(r && r.readyState==4 && r.status>=400)fnRetry();});
					}
				}
				arrProtected.push(objResponse.users.splice(i, 1)[0]);
			}
		}
			// add non-protected users and, if not finished, request more
		addFollowing(objResponse.users);
		strCursor = objResponse.next_cursor_str;
		if (/[^0 ]/.test(strCursor)) {
			return getJSON(strCursoredUrl + strCursor, arguments.callee);
		}
			// handle protected users and finish
		if (false && arrProtected.length > 0 && seekProtected !== false
				&& (seekProtected || !gintPromptForProtected || confirm(FOLLOWING_PROTECTED_PROMPT))) {
			return getFollowing_protected(arrProtected, fnDone);
		}
		else {
			addFollowing(arrProtected);
			try{ fnDone(); }catch(x){}
		}
	});
}
function getFollowing_protected (arrProtected, fnDone) {
	// manually get the latest tweet from everyone in arrProtected before |addFollowing|
	addFollowing(arrProtected);
	try{ fnDone(); }catch(x){}
}

function addFollowing (arrFollowing) {
	for (var L = arrFollowing.length, i = 0, objIn, objOut; i < L; i++) {
		objIn = arrFollowing[i];
		objOut = {};
		for(var p in KEEP_PROPERTIES){ objOut[p] = objIn[p]; }
		objOut._CatchUp_sequence = gintSequence;
		gintSequence += 1;
		objOut._CatchUp_last_update = new Date(Date.parse((objOut.status || {}).created_at) || 0);
		arrFollowing[i] = gmapFollowing[objOut.screen_name] = objOut;
	}
	garrFollowing.push.apply(garrFollowing, arrFollowing);
}

// Twitter-specific helper functions
function addTab (strUrlSuffix, objTitleAndHeading, fnAjaxInterceptor, objOptions) {
	objOptions = objOptions || {};
	var then = new Date(), match;

	// check if we should replace a user 404 page
	match = RE_SUFFIXED_URL.exec(gstrLocationNoHash) || {};
	if (!gblnReload && gblnUser404 && match[4] == strUrlSuffix
			&& !(objOptions.hideForOthers && match[2] && gstrSessionUser && match[2]!=gstrSessionUser)) {
		// this tab was requested but not shown, so let's replace the page!
		gblnReload = true;
			// let the user know we're working
		try {
			var elWrapper = null, title, re = /(^|\s)wrapper(\s|$)/;
			for (var a = document.getElementsByTagName('div'), i = 0; !elWrapper && i < a.length; i++) {
				if(re.test(a[i].className)){ elWrapper = a[i]; }
			}
			var s = {backgroundImage: ["url('",IMG_LOADING,"')"].join(''), backgroundRepeat: 'no-repeat',
					backgroundPosition: '92.5% center'};
			for(var p in s){ try{elWrapper.style[p]=s[p];}catch(x){} }
			elWrapper.getElementsByTagName('h2')[0].firstChild.nodeValue = 'Please wait...';
		}catch(x){}
			// page replacement
		var fnOnReload = objOptions.onReload || function(){ try{
			var evt = document.createEvent('HTMLEvents');
			evt.initEvent('load', false, false);
			window.dispatchEvent(evt);
		}catch(x){} };
		httpRequest({method: 'GET', url: match[1], headers: REQUEST_HEADERS,
			onload: function(objResponse){
				replacePage(objResponse.responseText, function(){
					executeOnCondition(function(){	// jQuery
						if(gobjUnsafeWindow.jQuery){ return true; }	// satisfied
						if(((new Date()) - then) <= T_SEC * 15){ return false; }	// try for 15 seconds
						return null;	// abort
					}, function(){twitterDocumentReady(fnOnReload);}, fnOnReload, T_SEC / 5);
				});
			}
		});
		return false;
	}

	// try to add the tab
	if (!gblnUser404) {
		match = RE_SUFFIXED_URL.exec(location.href) || {};
		if (gstrPageUser && (!objOptions.hideForOthers || gstrPageUser == gstrSessionUser)) {
			var isCurrentTab = (match[4] == strUrlSuffix
					&& (match[2] || match[3] || gstrPageUser != strUrlSuffix));
			executeOnCondition(
				function(){	// jQuery
					if(g$){ return true; }	// satisfied
					if(((new Date()) - then) <= T_MIN){ return false; }	// try for 1 minute
					return null;	// abort
				}
				,function(){
					addJQueryAjaxInterceptor({urlSuffix: strUrlSuffix, interceptor: fnAjaxInterceptor});
					setTimeout(function(){
						addTab_show(strUrlSuffix, objTitleAndHeading, isCurrentTab, objOptions);
					}, 0);
				}
				,null
				,T_SEC / 5
			);
		}
	}

	return true;
}
function addTab_show (strName, objTitleAndHeading, blnActivate, objOptions) {
	var selPrecedingTab = (objOptions.precedingTabSelector || '#x[id!=x]') +', #primary_nav > *:last';
	var $referenceTab = g$(objOptions.referenceTabSelector || selPrecedingTab);
	if(!$referenceTab.length){ return; }
		// build the new tab's href from $referenceTab
	var href = $referenceTab.children('a').attr('href') || '';	//.children('.in-page-link')
	if(!href){ return setTimeout(getCallback(arguments), 50); }
	href = href.replace(/^(.*?:[\/]*.*?(?=\/|$))?.*$/, '$1/' + gstrPageUser + '/' + strName);

	var tabAttributes = {id: '_' + SCRIPT.name + '_' + strName.replace(/\W/g,'') + '_tab'};
	if(objOptions.htmlTitle){ tabAttributes.title = objOptions.htmlTitle; }
	var $tab = g$($E('li', tabAttributes, $E('a', {href: href, class: 'in-page-link',
			data: '{"dispatch_action":"' + (objOptions.dispatchAction || 'profile') + '"}'},
		objOptions.htmlLabel || strName
	))).insertAfter(g$(selPrecedingTab).eq(0)).children();
	try{ $tab = $tab.isInPageLink(); }catch(x){}
	try{ $tab = $tab.isSidebarTab(); }catch(x){}
	try{ gobjUnsafeWindow.twttr.titles_and_headings[strName] = objTitleAndHeading; }catch(x){}
	if(blnActivate){ setTimeout(function(){$tab.click();},0); }
}

function twitterDocumentReady (fnOnComplete) {
	try {	// see twitter.js:$(document).ready
		(function($, twttr){
		  $().Page();
		  if(twttr) twttr.setDefaultBucket();
		  this.initializeTimeline();
		  $("#pagination #more").isMoreButton();
		  if(twttr) $("body").bind("ajaxSuccess", twttr.setupRetweetTips);
		  if(twttr) twttr.setupRetweetTips();
		  $("span.byline a").tipsy({
		    gravity: "n"
		  });
		  this.initializePage();
		  fnOnComplete();
		}).call(gobjUnsafeWindow, gobjUnsafeWindow.jQuery, gobjUnsafeWindow.twttr);
	}
	catch(x){
		try{ $("#pagination #more").isMoreButton(); }catch(x2){}
		try{ this.initializePage(); }catch(x2){}
		fnOnComplete();
		throw x;
	}
}

function updateLocation (strSuffix, blnInsertUserInUrl, idBody) {
	try {
		var objText = gobjUnsafeWindow.twttr.titles_and_headings[strSuffix];
		for(var p in objText){ if((objText[p] || {}).deferred){ objText[p] += ''; } }	// toString
	}catch(x){}
	try {
		gobjUnsafeWindow.twttr.updateLocation(
			(!blnInsertUserInUrl || gblnPageUserInUrl ? '' : gstrPageUser + '/') + strSuffix
		);
		document.getElementsByTagName('body')[0].id = idBody || strSuffix;
		gobjUnsafeWindow.setTitleAndHeading(strSuffix);
	}catch(x){}
}

function showNotification (str) {
	try {
		(new gobjUnsafeWindow.InfoNotification()).setMessage(str).show();
	}
	catch(x) {
		alert(str);
	}
}

function isReply (idx, elEntry) {
	elEntry = elEntry || this;
	var blnReply = (g$(".entry-meta:last:contains('in reply to')", elEntry).length != 0);
	var elUsername = !blnReply && g$('.entry-content > .username', elEntry)[0];
	var txt = (elUsername && elUsername.previousSibling) || {};
	return blnReply || (txt.nodeType == 3 && /^\s*@$/.test(txt.nodeValue) && !txt.previousSibling);
}
function isNotReply (idx, elEntry) {
	return !isReply(idx, elEntry || this);
}
function isMissedReply (idx, elEntry) {
	elEntry = elEntry || this;
	if(!isReply(idx, elEntry)){ return false; }
	var $atUser = g$('.entry-content > .username', elEntry).eq(0);
	var strAtUser = $atUser.text();
	return ($atUser.length != 0 && strAtUser != gstrSessionUser && !gmapFollowing[strAtUser]);
}

function getPageUser () {
	var strUser;
	try {
		strUser = document.evaluate('head/meta[@name="page-user-screen_name"]/@content',
				document.documentElement, null, XPathResult.STRING_TYPE, null).stringValue;
	}
	catch (x) {
		strUser = location.pathname.substring(1).split('/')[0].replace(/^home$/, '');
	}
	return strUser || getSessionUser();
}
function getSessionUser () {
	try {
		return document.evaluate('head/meta[@name="session-user-screen_name"]/@content',
				document.documentElement, null, XPathResult.STRING_TYPE, null).stringValue;
	}
	catch (x) {
		return (document.getElementById('profile_link') || {href: ''}).href.split('/').pop();
	}
}

// Twitter-inspired helper functions
function createVCard (objUser) {
	var status = objUser.status;
	var title = objUser.name;
	if (objUser._CatchUp_last_update.getTime()) {
		title += ' (%{timestamp ' + objUser._CatchUp_last_update.getTime() + '}): ' + status.text;
	}
	var imgStyle = '';
	if (objUser.protected) {
		try {
			imgStyle = gjqSide.css('background-color').replace(/^$/,'0,0,255').replace(/[^0-9,]/g,'')
					.split(',');
			for(var i = imgStyle.length - 1; i >= 0; i--){ imgStyle[i] = 0xFF - imgStyle[i]; }
		}
		catch(x){}
		imgStyle = ['outline:', gintProtectedOutline, 'px outset rgb(', imgStyle.join(','), ');']
				.join('');
	}
	var el = $E('span', {'class': 'vcard'},
		$E('a', {titlePrototype: title, title: title.replace(/%\{timestamp ([^}]*)\}/, timeAgo),
				rel: 'contact', hreflang: 'en', 'class': 'url', href: '/' + objUser.screen_name},
			$E('img', {width: 24, height: 24, 'class': 'photo fn', style: imgStyle, alt: objUser.name,
					src: objUser.profile_image_url.replace(/_normal(\.[^.]{3,4})?$/, '_mini$1')})
		)
	);
	el._CatchUp_user = objUser;
	return el;
}

function timeAgo (strSubstring, strTimestamp) {
	if(!strTimestamp){ return false; }
	var d = (new Date()) - (new Date(parseInt(strTimestamp,10)));
	if(isNaN(d) || d < 0){ return false; }
	if(d < T_SEC * 90){ return "1 minute ago"; }
	if(d < T_MIN * 45){ return "%{time} minutes ago".replace(/%\{time\}/, Math.round(d / T_MIN)); }
	if(d < T_MIN * 90){ return "1 hour ago"; }
	if(d < T_HR * 36.5){ return "%{time} hours ago".replace(/%\{time\}/, Math.round(d / T_HR)); }
	return "%{time} days ago".replace(/%\{time\}/, Math.round(d / T_DAY));
}

// jQuery helper functions
function defer_ () {	// delayed evaluation of calls to |_|
	var args = Array.prototype.slice.call(arguments);
	return {deferred: true, toString: function(){return g_.apply(null, args);}};
}

function replaceParams (str, obj) {
	for(var p in (obj || {})) {
		str = str.replace(new RegExp("\\%\\{" + p + "\\}", "gi"), obj[p]);
	}
	return str;
}

function interceptAjax () {
	var $ajax = g$.ajax;
	g$.ajax = function(objSettings) {
		var match = RE_SUFFIXED_URL.exec((objSettings || {}).url || ''), objInterceptor = null;
		if (match) {
			for (var suffix = match[4], i = 0; !objInterceptor && i < garrAjaxInterceptors.length; i++) {
				objInterceptor = (suffix == garrAjaxInterceptors[i].urlSuffix) && garrAjaxInterceptors[i];
			}
			if (objInterceptor) {
				for(var p in SUFFIXED_URL_PROPERTIES){ match[p] = match[SUFFIXED_URL_PROPERTIES[p]]; }
				return objInterceptor.interceptor.apply(this,
						[match, $ajax].concat(Array.prototype.slice.call(arguments)));
			}
		}
		return $ajax.apply(this, arguments);
	};
	copyProperties($ajax, g$.ajax);
}

function addJQueryAjaxInterceptor (objInterceptor) {
	garrAjaxInterceptors.push(objInterceptor);
}

// user script helper functions
var setPersistentValue, getPersistentValue, registerMenuCommand = function(){};
try {
	setPersistentValue = GM_setValue;
	getPersistentValue = GM_getValue;
	registerMenuCommand = GM_registerMenuCommand;
}
catch (x) {
	(function(){
		var gobjPersistent = {};
		setPersistentValue = function(strName, varValue) {
			gobjPersistent[strName] = varValue;
			return varValue;
		};
		getPersistentValue = function(strName, varDefault) {
			return (gobjPersistent.hasOwnProperty(strName) ? gobjPersistent[strName] : varDefault);
		};
	})();
}

var addPageStyle;
try {
	addPageStyle = GM_addStyle;
}
catch (x) {
	addPageStyle = function(strCss) {
		try {
			document.documentElement.getElementsByTagName('head')[0].appendChild(
				document.createElement('style')
			).appendChild(document.createTextNode(strCss));
		}catch(x){}
	};
}

function alterPageStyle (reSelector, fnAlterCss, _arrRules) {
	if (arguments.length < 3) {
		for (var a = document.styleSheets, i = 0; i < a.length; i++) {
			try{ alterPageStyle(reSelector, fnAlterCss, a[i].cssRules); }catch(x){}
		}
		return;
	}
	for (var i = 0, objRule; i < _arrRules.length; i++) {
		objRule = _arrRules.item(i);
		try{ alterPageStyle(reSelector, fnAlterCss, objRule.styleSheet.cssRules); }catch(x){}	// @import
		try{ alterPageStyle(reSelector, fnAlterCss, objRule.cssRules); }catch(x){}	// @media
		try{ if(reSelector.test(objRule.selectorText)){ fnAlterCss(objRule); } }catch(x){}
	}
}

var httpRequest;
try {
	httpRequest = GM_xmlhttpRequest;
}
catch (x) {	// adapted from http://jibbering.com/2002/4/httprequest.html
	httpRequest = function(objDetails) {
		var request = null;
		/*@cc_on @*/	// JScript (Internet Explorer) conditional compilation
		/*@if (@_jscript_version >= 5)
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (x) {
			try{ request = new ActiveXObject("Microsoft.XMLHTTP"); }catch(x){}
		}
		@end @*/
		try{ request = request || new XMLHttpRequest(); }catch(x){}

		try {
			request.open(objDetails.method, objDetails.url, true);

			try { for (var h in objDetails.headers) {
				try{ request.setRequestHeader(h, objDetails.headers[h]); }catch(x){}
			} }catch(x){}
			request.onreadystatechange = function(){
				var	details = {readyState: request.readyState,
						responseHeaders: request.getAllResponseHeaders(),
						responseText: request.responseText,
						status: request.status,
						statusText: request.statusText};
				try{ objDetails.onreadystatechange.call(request, details); }catch(x){}
				if(request.readyState != 4){ return; }
				try {
					objDetails[request.status >= 200 && request.status < 400
							? "onload" : "onerror"].call(request, details);
				}catch(x){}
			};

			request.send(objDetails.data || null);
		}catch(x){}

		return request;
	};
}

var openInTab;
try {
	openInTab = GM_openInTab;
}
catch (x) {
	openInTab = function(strUrl, strName) {
		if(strName === undefined){ strName = '_blank'; }
		if(!window.open(strUrl, strName)){ gobjUnsafeWindow.location.assign(strUrl); }
	};
}

// generic helper functions
function replacePage (strHtml, fnOnComplete) {
	var head = {content:'', attributes:{}}, body = {content:'', attributes:{}}, ref = {content:''};
	var reContent = /(<head\b)|(<\/head\b)|(<body\b)|(<\/body\b)/gm, match, idxCapture,
			idxContent, attributes;

	while (match = reContent.exec(strHtml)) {
		for(idxCapture = 1; idxCapture in match && !match[idxCapture]; idxCapture++);
		if (1 == (idxCapture % 2)) {	// open tag
			switch (match[idxCapture]) {
				case '<head': ref = head; break;
				case '<body': ref = body; break;
				default: ref = {content:'', attributes:{}};
			}
			idxContent = strHtml.indexOf('>', match.index) + 1;
			attributes = getAttributesFromHtml(strHtml.substring(match.index, idxContent));
			for(var a in attributes){ ref.attributes[a] = attributes[a]; }
		}
		else {	// close tag
			ref.content += strHtml.substring(idxContent, match.index);
			idxContent = match.index;
		}
	}

	var elHead = document.getElementsByTagName('head')[0]
			|| document.documentElement.appendChild(document.createElement('head'));
	for(var a = elHead.childNodes, i = a.length - 1; i >= 0; i--){ elHead.removeChild(a[i]); }
	for(var a in head.attributes){ elHead.setAttribute(a, head.attributes[a]); }
	elHead.innerHTML = head.content;

	var elBody = document.body || document.getElementsByTagName('body')[0]
			|| document.documentElement.appendChild(document.createElement('body'));
	for(var a in body.attributes){ elBody.setAttribute(a, body.attributes[a]); }
	elBody.innerHTML = body.content;

	setTimeout(function(){
		windowEval(gobjUnsafeWindow, document.getElementsByTagName('script'), fnOnComplete);
	}, 50);
}

function windowEval (objWindow, varSource, fnOnComplete, _idx) {
	if ('string' == (typeof varSource) || varSource instanceof String) {
		(function(objThis, idUnique, intMaxAttempts, intAttempt){
			var meta = (fnOnComplete ? [
				 "document.body.appendChild(document.createElement('span')).id='" + idUnique + "';"
				,"document.getElementById('" + idUnique + "').className='success';"
			] : ['','']);
			this.setTimeout(["document.write=function(){};", meta[0], varSource, meta[1]].join('\n'), 0);
			if(!fnOnComplete){ return; }
			this.setTimeout(function(){
				var el = document.getElementById(idUnique);
				if (!(el && el.className) && intAttempt < intMaxAttempts) {	// try again
					intAttempt += 1;
					return objThis.setTimeout(arguments.callee, 50);
				}
				try{ el.parentNode.removeChild(el); }catch(x){}
				fnOnComplete();	// move on
			}, 50);
		}).call(objWindow, objWindow, windowEval_getUniqueElementId(), 20, 0);
	}
	else {
		if(!('length' in varSource)){ varSource = [varSource]; }
		for (var i = _idx || 0, el; i < varSource.length; i++) {
			el = varSource[i];
			if (el.src) {
				var fnContinue = function(){ windowEval(objWindow, varSource, fnOnComplete, i + 1); };
				return httpRequest({method: 'GET', url: el.src, headers: REQUEST_HEADERS,
					 onload: function(response){ windowEval(objWindow, response.responseText, fnContinue); }
					,onerror: fnContinue
				});
			}
			else {
				windowEval(objWindow, el.textContent || el.text);
			}
		}
		(fnOnComplete || function(){})();
	}
}
function windowEval_getUniqueElementId (intMaxAttempts) {
	var id, attempt = 0;
	do {
		attempt += 1;
		id = ['windowEval', attempt, (new Date()).getTime(), Math.random()].join('_').replace('0.','');
	} while(document.getElementById(id) && !(attempt >= intMaxAttempts))
	return (attempt >= intMaxAttempts ? undefined : id);
}

function getJSON (strUrl, fnCallback, fnOnError, fnOnReadyStateChange, msTimeout) {
	var done = false, headers = {}; for(var p in REQUEST_HEADERS){ headers[p] = REQUEST_HEADERS[p]; }
	try{ headers.Accept = g$.ajaxSettings.accepts.json; }catch(x){}
	headers.Accept = (headers.Accept || 'application/json, text/javascript') + ', *' + '/' + '*';
	var objDetails = {method: 'GET', url: strUrl, headers: headers
		,onload: function(obj){
			if(done){ return; }
			done = true;
			var json = obj.responseText, o;
			try {
				if((typeof JSON) != 'undefined'){ o = JSON.parse(json); }
				else{ o = eval(['(', json, ')'].join('')); }
			}
			catch(x) {
				done = false;
				return this.onerror();
			}
			fnCallback.call(objDetails, o);
		}
		,onerror: function(){
			if(done){ return; }
			done = true;
			if(fnOnError){ fnOnError.apply(objDetails, arguments); }
		}
		,onreadystatechange: (fnOnReadyStateChange ? function(){
			if(!done){ fnOnReadyStateChange.apply(objDetails, arguments); }
		} : undefined)
	};
	var objRequest = httpRequest(objDetails);
	var tsAbort = new Date((new Date()).getTime() + msTimeout);
	if ((new Date()) < tsAbort) {
		var checkAbort = setInterval(function(){
			if (done) {
				clearInterval(checkAbort);
			}
			else if ((new Date()) >= tsAbort) {
				try{ objRequest.abort(); }catch(x){}
				try{ objDetails.onerror({}); }catch(x){ done = true; }
			}
		}, 50);
	}
}

function getSolidBitmapUri (rgb, intWidth, intHeight) {
	var len = intHeight * 4 * Math.ceil((intWidth/8)/4), arrBmp = [
		 'BM'	// BMP header: magic number
		,getSolidBitmapUri_N(4, 0x3A + len)	// BMP header: BMP size
		,getSolidBitmapUri_N(4, 0)	// BMP header: reserved
		,getSolidBitmapUri_N(4, 0x3A)	// BMP header: data offset
		,getSolidBitmapUri_N(4, 40)	// DIB header: Windows V3
		,getSolidBitmapUri_N(-4, intWidth)	// DIB header: width
		,getSolidBitmapUri_N(-4, intHeight)	// DIB header: height
		,getSolidBitmapUri_N(2, 1)	// DIB header: color planes
		,getSolidBitmapUri_N(2, 1)	// DIB header: bits per pixel
		,getSolidBitmapUri_N(4, 0)	// DIB header: compression method
		,getSolidBitmapUri_N(4, len)	// DIB header: data size
		,getSolidBitmapUri_N(-4, 0x0B13)	// DIB header: horizontal pixels/meter
		,getSolidBitmapUri_N(-4, 0x0B13)	// DIB header: vertical pixels/meter
		,getSolidBitmapUri_N(4, 1)	// DIB header: palette size
		,getSolidBitmapUri_N(4, 1)	// DIB header: important colors
		,getSolidBitmapUri_N(4,	// palette: 1x RGB
				((rgb[0] << 16) & 0xFF0000) | ((rgb[1] << 8) & 0xFF00) | (rgb[2] & 0xFF))
		,(new Array(1 + len)).join('\u0000')	// data
	];
	return 'data:image/bmp,' + getSolidBitmapUri_encode(arrBmp.join(''));
}
function getSolidBitmapUri_N (intBytes, intN) {	// signed/unsigned little-endian (LSB first) integer
	var a = [], signed = (intBytes < 0);
	for (var i = Math.abs(intBytes) - 1; i >= 0; i--) {
		a.push((intN & 0xFF) || 0);
		intN = (signed ? intN >> 8 : intN >>> 8);
	}
	return String.fromCharCode.apply(String, a);
}
function getSolidBitmapUri_encode (str) {
	var H = '0123456789ABCDEF';	// hexadecimal characters
	// encode and replace two-byte encodings %C2%80-%C2%BF & %C3%80-%C3%BF (110000bb,10bbbbbb)
	return encodeURIComponent(str).replace(/%C2/g,'').replace(/%C3%(.)/g, function(s,h){
		return '%' + H.charAt(H.indexOf(h) | 0x4);
	});
}

var $E = function createElement (strName, objAttributes, varContent /*, varContent, ...*/) {
	var el = document.createElement(strName);
	try{
		for (var attribute in objAttributes) {
			el.setAttribute(attribute, objAttributes[attribute]);
		}
	}catch(x){}
	if (arguments.length > 3 || (!/^(string|undefined)$/.test(typeof(varContent)) && !(varContent instanceof Array))) {
		varContent = Array.prototype.slice.call(arguments, 2);
	}
	if (varContent instanceof Array) {
		for (var L = varContent.length, i = 0, c; i < L; i++) {
			c = varContent[i];
			el.appendChild(c && typeof(c) == 'object' && 'parentNode' in c
					? c : document.createTextNode(c));
		}
	}
	else if (varContent) {
		el.innerHTML = varContent;
	}
	return el;
}

function attachEventListener (el, strEvent, fnListener, blnUseCapture) {
	try {
		el.addEventListener(strEvent, fnListener, blnUseCapture ? true : false);
	}
	catch (x) { try {
		el.attachEvent('on' + strEvent, fnListener);
	}
	catch (x) {} }
	return el;
}

function executeOnCondition (fnIsSatisfied, fnOnSatisfied, fnOnAbort, intInterval, _fnRetry) {
	switch (fnIsSatisfied() && true) {
		case true:
			if(fnOnSatisfied){ fnOnSatisfied(); }
			break;
		case false:
			setTimeout(_fnRetry || executeOnCondition_getCallback(arguments), intInterval || 50);
			break;
		default:
			if(fnOnAbort){ fnOnAbort(); }
	}
}
function executeOnCondition_getCallback (args) {
	var exits = {1: args[1] || function(){}, 2: args[2] || function(){}};
	var done = function() {
		for(var i = args.length - 1; i >= 0; i--){ delete args[i]; }
		args = exits = done = undefined;
	};
	args[1] = function(){ exits[1].apply(this,arguments); done(); };
	args[2] = function(){ exits[2].apply(this,arguments); done(); };
	args[4] = function(){ executeOnCondition.apply(null, args); };
	return args[4];
}

function getCallback (args, objThis, fn) {
	return function(){ (fn || args.callee).apply(objThis, args); };
}

function copyProperties (from, to) {
	try {
		for (var p in from) {
			try {
				if (from.hasOwnProperty(p)) {
					to[p] = from[p];
				}
			}catch(x){}
		}
	}catch(x){}
	for (var a = ['__proto__', 'prototype', 'constructor'], i = 0, p; p = a[i]; i++) {
		try{ to[p] = from[p]; }catch(x){}
	}
}

function getAttributesFromHtml (strTag) {
	var map = {}, match;
	while (match = reAttribute.exec(strTag)) {
		map[match[1]] = (match[3] !== undefined ? match[3] : match[1]);
	}
	return map;
}
var reAttribute = /\s([^\s=\/]+)(?:\s*=\s*(['"'])?(.*?)\2(?=\s|\/|>|$))?/gm;

attachEventListener(window, 'load', init, true);

})();
