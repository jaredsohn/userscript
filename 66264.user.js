// ==UserScript==
// @name          CS Profile Informer
// @author        Daniele Binaghi / Dan°
// @version       3.6
// @releasedate   14/04/2012
// @copyright     Released under the GPL license (http://www.gnu.org/copyleft/gpl.html)
// @description   Fixes neutral references and provides statistics on CouchSurfing members' profile
// @namespace     http://userscripts.org/users/126144
// @include       http://www.couchsurfing.org/profile.*
// @include       http://www.couchsurfing.org/people*
// @include       http://www.couchsurfing.org/mapsurf*
// @include       http://www.couchsurfing.org/greetings.html?
// @include       https://www.couchsurfing.com/profile.*
// @include       https://www.couchsurfing.com/people*
// @include       https://www.couchsurfing.com/mapsurf*
// @include       https://www.couchsurfing.com/greetings.html?
// ==/UserScript==
// --------------------------------------------------------------------
//
// This is a user script for different web-browsers!
//
// To install on Firefox, you'll need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// To uninstall, go to Tools/Manage User Scripts,
// select "CS Profile Informer", and click Uninstall.
//
// To install on Chrome, Opera, Safari or other webbrowser please check the script website for instructions
//
// --------------------------------------------------------------------
// Ideas, hints and help for this script (and hence, many thanks to):
// * Reference Stats (http://userscripts.org/scripts/show/38652), by Carlos Martin
// * Neutral References (http://userscripts.org/scripts/show/38618), by Carlos Martin
// * Enhanced CouchSurfing (http://userscripts.org/scripts/show/64779), by starstuffharvestingstarlight
// * Various coding and ideas, by Daniele Ferro (http://www.couchsurfing.org/people/magikozio)
// * Spanish language localization, by Damian Maseda (http://www.couchsurfing.org/people/sandman76/)
// * German language localization, by Matthias Haldimann (http://www.couchsurfing.org/profile.html?id=2CF4CQP)
// * French language localization, by Boris Morel (http://www.couchsurfing.org/profile.html?id=3QGOYUF)
// * Version checker, by Arxleol (http://www.axino.net/tutorial/2009/11/how-to-write-script-updater-for-greasemonkey-scripts)
// * gm_functions.js, by Mislav (http://github.com/mislav/user-scripts/blob/master/toolkit/gm_functions.js)
//
// See http://userscripts.org/scripts/show/66264 for instructions.
// Please help me improve this tool, reporting any comment/bug/suggestion 
// through the forementioned webpage!
// Thanks.

(function() // this row increases compatibility with Opera;do not remove
{		// this row increases compatibility with Opera;do not remove
if (!document.getElementById('statbox') && document.getElementById('couchinfo')) { // used to avoid stats duplicates or stats for pages with no info
	// VARIABLES section
	var script_version = 3.6;
	var ref_tot = 0;
	var ref_wholetot = 0;
	var hosted = 0;
	var surfed_with = 0;
	var hosted_surfed_with = 0;
	var traveled_with = 0;
	var met_in_person = 0;
	var not_met_in_person = 0;
	var refmutual = 0;
	var refpos = 0;
	var refpos_received = 0;
	var refpos_left = 0;
	var refneg = 0;
	var refneg_received = 0;
	var refneg_left = 0;
	var refneg_percent = 0;
	var refinap = 0;
	var refinap_received = 0;
	var refinap_left = 0;
	var refneu = 0;
	var refneu_received = 0;
	var refneu_left = 0;
	var days_surfed = 0;
	var days_hosted = 0;
	var days_traveled = 0;
	var header;
	var iconbox;
	var language;
	var div_classname;
	var div_html;
	var hospitalityPercentage = 0;
	var friends_tot = 0;
	var friends_reftot = 0;
	var mutualcheck_matchingtot = 0;
	var d_ref;
	var d_ref_c;
	var d_ref_ps;
	var refIsLastSection = false;
	var s_ScriptTitle = 'CS Profile Informer';
	var visitedcountries = [];
	var visitedcountries_num = 0;
	var lds = 1.1;
	lds = lds.toLocaleString().substring(1, 2);// Extracts Local Decimal Separator
	var s_RE_Hosted = /<img src=['"]\/images\/icon_hosted.gif['"] alt=['"].+?(&nbsp;|\s)([0-9]+)(&nbsp;|\s).+?['"] [^>]+>/i;
	var s_RE_Surfed = /<img src=['"]\/images\/icon_surfed_with.gif['"] alt=['"].+?(&nbsp;|\s)([0-9]+)(&nbsp;|\s).+?['"] [^>]+>/i;
	var s_RE_Traveled = /<img src=['\"]\/images\/icon_traveled_with.gif['"] alt=['"].+?(&nbsp;|\s)([0-9]+)(&nbsp;|\s).+?['"] [^>]+>/i;
	var s_RE_FriendLink = /<img src=['"]\/images\/links\/[0-9].gif['"]/i;
	var references_section;
	var col_Reference;
	var col_Positive = '#DFFFDF';
	var col_Negative = '#FFDDDD';
	var col_Neutral = '#F0F0F0';
	var col_Inappropriate = '#F9DFFF';
	var col_bdr_Reference;
	var col_bdr_Positive = '#A7DFA7';
	var col_bdr_Negative = '#CF8E8E';
	var col_bdr_Neutral = '#DDDDDD';
	var col_bdr_Inappropriate = '#C38ECF';
	var ref_hidden = 0;
	// end of VARIABLES section
	

	// BROWSER COMPATIBILITY section
	if (typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined') {
		var getValue = GM_getValue;
		var setValue = GM_setValue;
	} else {
		var Cookie = {
			PREFIX: '_greasekit_',
			prefixedName: function(name){
				return Cookie.PREFIX + name;
			},
	
			get: function(name) {
				var name = escape(Cookie.prefixedName(name)) + '='
				if (document.cookie.indexOf(name) >= 0) {
					var cookies = document.cookie.split(/\s*;\s*/)
					for (var i = 0;i < cookies.length;i++) {
						if (cookies[i].indexOf(name) == 0)
						return unescape(cookies[i].substring(name.length, cookies[i].length))
					}
				}
				return null
			},
			set: function(name, value, options) {
				newcookie = [escape(Cookie.prefixedName(name)) + "=" + escape(value)]
				if (options) {
					if (options.expires) newcookie.push("expires=" + options.expires.toGMTString())
					if (options.path)    newcookie.push("path=" + options.path)
					if (options.domain)  newcookie.push("domain=" + options.domain)
					if (options.secure)  newcookie.push("secure")
				}
				document.cookie = newcookie.join(';')
			}
		}
	
		var getValue = function(name, defaultValue) {
			var value = Cookie.get(name)
			if (value) {
				if (value == 'true') return true
				if (value == 'false') return false
				return value
			}
			else return defaultValue
			}
			
		var setValue = function(name, value) {
			var expiration = new Date()
			expiration.setFullYear(expiration.getFullYear() + 1)
			Cookie.set(name, value, { expires: expiration })
		}
	}
	
	//if (typeof GM_xmlhttpRequest == "function" && GM_xmlhttpRequest != 'undefined') {
	if (typeof GM_xmlhttpRequest == "function") {
		var xhr = GM_xmlhttpRequest
	} else {
		var xhr = function(params) {
			var request = new XMLHttpRequest()
			request.onreadystatechange = function() {
				if (params.onreadystatechange) params.onreadystatechange(request)
				if (request.readyState == 4) {
					if (request.status >= 200 && request.status < 400) if (params.onload) params.onload(request)
					else if (params.onerror) params.onerror(request)
				}
			}
	
			request.open(params.method, params.url, true)
			if (params.headers) for (name in params.headers)
				request.setRequestHeader(name, params.headers[name])
				request.send(params.data)
				return request
		}
	}
	// end of BROWSER COMPATIBILITY section
	
	
	// PARAMETERS used for FF extension section
	try {
		scriptCompiler = getValue("script-compiler_attivo",false);
	   onlyGraph = getValue("onlyGraph",false);
	   onMouseOverShow = getValue("onMouseOverShow",true);
	   showIcons = getValue("showIcons",true);
	   colorReferences = getValue("colorReferences",true);
	   hideCSStats = getValue("hideCSStats",false);
	} catch (e) {
		scriptCompiler = false;
		onlyGraph = false;
	   onMouseOverShow = true;
	   showIcons = true;
	   colorReferences = true;
	   hideCSStats = false;
	}
	// end of PARAMETERS section

	
	// PICTURES section
	var pic_infoBlue = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAADB0lEQVQ4y02TzW9VVRTFf/uc8+59fbaQtg9oLWoqtMWKgCltGOFAiUGnnRD8Awwjw4hEnRjj2DgyccLAxJnRGGNrjI50UBulxBZBKLVK8KWhtq/v497z6eBF0j3d2St7rayfzF/9FgBRGhFh9adPwdSmD41NXxweGZ9KSXi4uXr33tL1hSNPTd88fPINfHBABMCwb7wP2cj47LWTL5596/ixpwcH+jOUEtqdGdbm5t6+8cvyR9ba97WRMqXejcxfXQQgJqkPDw8tnJ05NlMf7CMREQStBVPRVDPD1qMOX36zvLL5d+PVSkU1AJQ2OaIqZnBo8Ou5mfGZaiY0WwVl4Tn/XIXzJyqUhWO32WWgP+Py/LnTY6P1BWtTHqNCIQptsmtTE6NzISS6hcfZQIyBAzXFQE1IMWBtoNOxpAivXzhzRhvzjnUBkxIv1IcHruSZoSgdWitEhHYR+OyHHbQWbIDMKGJKhBgZGuxnevLJN3++cf8Lo5R6pb+/OlqWARFwPlE/WOGl0wdwPoHA0u0OhQ1UjKCUoigc488crt9c23xZaa1OKFGU1mNdwPvAv3uW39bbTB7NmRzLISWs7dmwLtAtPLW+nGo1P25iSuJ8b6Gkl7p1kY1/ClKi95ULWBdJSaFDggTeRWKMGOf87W7XYoxBCYQoCEKM+nE/nI9YFyAlghJEhEc7LTrdct14H75rtrqNajU/IgI6KmKCdsc9Fmh3PWUZIGmUEozW3NtobJfWfq9iDCvNvdbH7U6J85Gi8NQy4dzzBxHpCcxO9VPLFEXpiSHR2Nrl7sbDT4wxSyqRCMF/0Nja/rUXUiSvCBNH+7iz2ebOXx3GR6vkFfAuUZSeH5d/X1WS3qtmCnntylcAJBip5E8sHhoaPJVnGT4mlBK0Vhit6KsairJkZW39VrvVvJBn+kEC9MTspR4UolrWx+u7zT1K606JUCUlQgh0ul02HzSat/7488NOt3s5z/T2//b20ZhQIoVP8d2dZvPznd3mRZQ8G2PCOnffOrcowrLWej/A/Ac7i5AxxmjfFgAAACJ6VFh0U29mdHdhcmUAAHjac0zJT0pV8MxNTE8NSk1MqQQAL5wF1K4MqU0AAAAASUVORK5CYII%3D";
	var pic_infoRed = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAADCklEQVQ4y02Tz29UdRTFP/f7/c686dhpUzq0gIZ0tPxIxYKUVla4UGPArQsUN/wHLknUjTGuDSsTNyxcm6gxaY1h50LSpJa0YElbpYWQgdgy0755733f94eL1oaTnN3NPefmniO/fngdAC2CiPD98gJ11MTE4dHLreGRUxIjy08er95aW5qdGD1295ORMUrnCezB8AK8c9XpI6/cuHDm7KfHx8eHqo0BRCmm0pSZe0ufzf+5cNNa+5VoUxAjADK370BCaB4abs6+dmF6qq85TIggAqIN2lQwtYTes2fM//jTYntj831VqbQBVKI1FREzNHTol9bMzJTUauTdHVyRU7k0ReXSm5RFTtbpUG00uHjt47PNl4/NRmsTFQJKIVS1uXH01OmZ6D0uy/ClxYeAGuhHGv34GPC2wPZSiIFzH1w5Z7T53FuLvv76+TcGms2bA6MjDe8cxEgMgbDbw64+pLi3SuhlIEKMEJyjPjhIur09sbX56LZRSr1b628c9UWxN1Q6Ks0hBt5+i1g6QOjdWcTnBVKpoJSizDNGWq3mxt2ld5TS+rRS4IoCby3eldjtDunSCsnJFsnJMSIRb4t9WlyWkdTrJLXauIkhii8d3lpEKURrgi3J/3kEce8VviwJtkTFSNQaiARnCSFgXGlXbJZhjAEliNeICDqEg3yEfYFIRLxHRNj9d5ui11s33vnfsu5OO6nVRhFB6QAhUqbpwQKXpviiQAOiFNpo2mvrW7awt5UPfnG32/22SFNCWeLyDKknDF48v5ckoH96ElVPcHlODJ5O+ylPVte/M8bcUTEKzoevt9pPF7y1BFsiSZW+E2OkD9boPVin1joOSUJ0Fpfn/PX7H8tRqS9VLUF+vnJ1z2fkyEuV6tzQ4eHJalIluoAoQWmDMhrT10eRF6wvLt3vprvv6SR5TIzoj06cAUCJ7Abrbu10OpRFMYlILQLee7JeRntjs/vw/so3Wa93TSfVrf/PO2hjBERJHlz8ovu8+0P3eeeyoF6NwVPa8u/SlnOIzGutXyww/wEKhJgV58KKGgAAACJ6VFh0U29mdHdhcmUAAHjac0zJT0pV8MxNTE8NSk1MqQQAL5wF1K4MqU0AAAAASUVORK5CYII%3D";
	var pic_hosted = "data:image/gif;base64,R0lGODlhFAAUALMPAIsrLBcXQOVPIPfn4vJmVco9Je6vntNQPf10aIZQWLI2KbmLiN5xV+WQfOVbR////yH5BAEAAA8ALAAAAAAUABQAAAS/8Mn5WlvvMEO7NExRAMUhJg4zeI+jHIRCzKV4eAxREIiD/AeE7rWSNA6OgsMBIxyCOl3ikeuRFIWXqaTwCQAZ5wgAUJSzopc5QcZ2Z8ly+wRIHNq+H+JJYNxlAiMMZkoOM116QgpmZoMkIgKLhjwIbGQBASGPIiQCSwQOj5goI1ickAKBCoGYC5qLZgGmnKsFrQ9pbWRnjKwBGAZHuWVuZb4YFA6qu4S+RR0ggVmrrMgsEwypqQpT1x4GygccDxEAOw%3D%3D";
	var pic_surfed = "data:image/gif;base64,R0lGODlhFAAUALMPAPLb49FppqNjcbYXb92WuuKvyKJEdol6eqmKicZBiY+fjsaUq8LDsa6/nbqzqP///yH5BAEAAA8ALAAAAAAUABQAAARp8MlJq70XgMZw3gzgVQDhNOIoAcVyFqlKLIpTFOoDBDRB4LlAQLFYEGKYQiChQAQIOULCgHAGgB6p4YBIBHKP6WGZwHoSg4MBDUar0WZMIG0YDMCAgUAwKIMDBnwGYBKBAwuEEgiJjBcRADs%3D";
	var pic_traveledwith = "data:image/gif;base64,R0lGODlhFAAUALMPAAAAAO7u7pmZmWZmZjMzM4iIiMzMzBERESIiIru7u3d3d93d3URERKqqqlVVVf///yH5BAEAAA8ALAAAAAAUABQAAART8MlJq714DMwJANVHXIH3hR9wVCZYJUgqCi2nyDg3HbirT7mfhIEb/QY9Xyb1uH02y5MkJpUgeyjlw9ECQCeFqkU8IQISF/JudfFgBByk0FKYPyIAOw%3D%3D";
	var pic_metinperson = "data:image/gif;base64,R0lGODlhFAAUALMPAOa+MvHbjujFR/TjqOrJVPz35/jtxe/Wfv378vrz2f/+++zNYefBPea/Ne7ScP///yH5BAEAAA8ALAAAAAAUABQAAAR58El5npt44Gka+NVTWEJJbMv3TQOjrtgLCJMgL7Fc6/vbGBLbiyUDMCYymsRxwwhBE5eqEdgIPIDq41A8YQxC76MI2DyenIP0I34EZBpJajghNOUycfGI542LE3N0a3QPgmwSWH5MLxUJZGUUMiGQE1wvWgQlmwwNEQA7";
	var pic_metonline = "data:image/gif;base64,R0lGODlhFAAUALMPAAAAADYy5f//zP39ytbWrf//2u3twP//zvPzyv//0/Dwwv//0P//1eXlvd7etP///yH5BAEAAA8ALAAAAAAUABQAAARu8MlJq30g680BBYkwjGQpFN4Edh36JUAgzzTgqjCtB3Yqrbva7ZcLynqvmJE3xBSNSJwS2gQwWJxqYVHqDhJVLOu3QRjOaIUC0VGk1XCFg0CnNzKMxeLA7x8WHWwACwKFhod+fDCDh42OAotikhEAOw%3D%3D";
	var pic_friends_s = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAOAAAADgCxW/H3AAACXklEQVQoz2WSS0hUYRiGn/8/58ylHEfHUcspM3XSNGmyoswuQxSYlKsgN1m0idx0kYg21SoK2kVJrmxTULuEqBYpQUiFkIIaWIjRVazx1KTOnHP+v8WIBL375/0e+F5xf6JLtFff0A8+XOgElKe8bsdbwJAWprQQQvBP6jV8PlJ13RY9QyertNY3hRBbHTcbXRZcTrxgOz8yU3yancAUFkJIALTWCCHeuZ7bZtq2nQ8c8JRLKK+AlngnKwLr0biMz/bzdKQXx3GRMgcLQa3jeBvNVCp1DyDjzbErfngRUghMIv5y0uk0P+0ZpDTwGQGklDiO89C07dlapTSOXiBo5edakYzNDHDn6UV21h2iIZHkgz3Ek9f3cF0P5bkYZQnjihIus79SBHxBtla2AHDrcRcVpes51nSVaGg164q34Yp5Xg4/4ctkCnO4/yP+sEXxmgA1sUZAA4Lp6WmSte0AKFwkJhWRBKODX/kxqZDBiGDecTjRdp69tUdRKACcBUH/0KMldYBXY89IzyvyYyD9EU19Yykd+88BIDHoe3ub0akhdm9uXQRzv0zEm6nbWII/AkY8Gbzi9/vJC4coKizBZ1lc6u3geOtZ2racWlTP4bHCalauKmbg7SNMQ5qk/6S5dvc0pdFrRMNl/P6Toqm+ZQn4N5sq91BUGEYku0IHgT6tQSkXV7lYhkV5bC3bG/axIbaDvGCEuYVfjH8bZHDkOePvR7pFsitUArwBylm6Icg6GbJeBikFlmXhOC5KKSzDh/J0jdBa03zGVwa6Cnjxv55Ga8htXVxGi55MJvv9L80F6x/aUvRRAAAAInpUWHRTb2Z0d2FyZQAAeNpzTMlPSlXwzE1MTw1KTUypBAAvnAXUrgypTQAAAABJRU5ErkJggg%3D%3D";
	var pic_languages = "data:image/png;base64,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%3D%3D";
	var pic_countries = "data:image/png;base64,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%3D";
	var pic_couch_def_b = "data:image/gif;base64,R0lGODlhIwAjANU1AGSm4yI8Hk58o06e31J0VmeEnKecnkdqfoCOq7afrubKyObJxixUVkN5vJ2YrefLyXSCl4GMnoeKl2J6m4iCgOjMyunNy3CGpL2yrufLyldwhOXIw7esrFFvf+XJyaSYpq2Yqh82I5qQoKWMeoKDomd0qJ6hqnZ4fK6io1FhZoCv6z86AVbB9EOr6B5iYWjQ+xuD5Duj2f78/CmAnCWRzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADUALAAAAAAjACMAAAb/wJpwSByqjjUVYBAbqIrQKHRAo80I1Wz1Ke0mVVRajOYSm6vXagzgHTKt4lbMFYu15OOZlsb2AlovMTN2LC0zLSyJiVZ1WTN9UgMvLGMxL5OWl5csM4otFwIHNAVdgJRim5maAzOXCSAPMihVpFAFh6eWlDGJk4GWCRgywxx5tUIDiC96Y2J1h3d3gwgVwwsmDi1VLkl1LKllcGh15AcRsTILF5fN3HabeDN6emhaAhrDMg8HvC/aMQFu0UjUyIqLgy7kJawiQEI+AwIGaZNHI8CMgzS0oRlkJ89FFwdOPBSgxkUAkysIyJsRwBENTTBZwGCAb9gGUfTuoCmQx6I8/1UwJ5nLl0EAwoEsHM0IY3IGDETfYBoSkc9CgkuGeDVTCACNCxhPEUGlNAOBhXxXNQmiuDJAVyv0BDRogOAODBcIMuTDkDaQT5byArjdSEOAgWEKStwV8CFfBQcwVyZEmPItGRqH8ykweiCfDAeKCp3M42KFaQJhyMxo6NkAAwX5SNSNNgcsjBmmV7hNnXB15mEU8nloYLvFbadgcZ8GkyXc6gWe803Yc9m28sqWF1b5PZJ6Geu5CRzRclGPgOgypu+5SAP88hoaHblgEDzfCAbhtHxPHp4LgGZadOAZBBt9ZFJ7/L1nxBsMwbZACiHQA4N8CN5mWgDiRaGCRhBAtEDNQfRsY5uFph2j4R/UkQHiQSMqFwAXbdSAYhZgwTUiiSbGmMSMN7aYko5SKNFMj7jBCOSJQ7Y3Q45HBslgjkEAADs=";
	var pic_couch_def_p = "data:image/gif;base64,R0lGODlhIwAjANU1AO7Bt0AvS92dnOu6s4JnhaaQjOm5r7J9gv+/vfOvqu/Y1vHZ13pSX/22svHa1/GxpOSro+eqo/Lb2OCenPLa2OKknvTFu8+alaF9hPPc2eakojkrSfDAsvLb1+y8ssigmf+6uINibcuSjumzp+zW0/Kto+20pr6Fh/G3r/PDufPMugETP/zDxfS7vH9YZv/Mz/K4sOmxs/79/beIj+CoqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADUALAAAAAAjACMAAAb/wJpwSByqjjUVYBAbqIrQKHRAo80I1Wz1Ke0mVVRajOYSm6vXagzgHTKt4lbMFYu15OOZlsb2AlovMTN2LC0zLSyJiVZ1WTN9UgMvLGMxL5OWl5csM4otGgIHNAVdgJRim5maAzOXCCAOMh5VpFAFh6eWlDGJk4GWCBYywyl5tUIDiC96Y2J1h3d3gwkUwwooDS1VLkl1LKllcGh15AcRsTIKGpfN3HabeDN6emhaAhjDMg4HvC/aMQFu0UjUyIqLgy7kJawiAEI+AwIGaZNHI8CMgzS0oRlkJ89FFwdEPBSgxkUAkysIyJsRwBENTTBZwGCAbxgJUfTuoCmQx6I8/1UwJ5nLJ0EAwoEsHM0IY3IGDETfYBoakS8DgkuGeDVTCACNCxhPEUGlNCNBhnxXNQmiuDJAVyv0BDx4kOAODBcJJOSzkDaQT5byArjdSEOAgWELStwVwCEfhQYwVyZEmPItGRqH8y0weiCfjAaKCp3M42KFaQJhyMxo6NkAgwX5TNSNNgcsjBmmV7hNnXB15mEX8nV4YLvFbadgcZ8GkyXcagWe803Yc9m28sqWF1b5PZJ6Geu5CRzRclGPgOgypu+5SAP88hoaHblgEDzfBwbhtHxPHp4LgGZanOBZBRt9ZFJ7/L1nxBsMwaZACBvQA4N8CN5mWgDiRaGCRhVAtEDNQfRsY5uFph2j4R/UkQHiQSMqFwAXbdSAYhZgwTUiiSbGmMSMN7aYko5SKNFMj7jBCOSJQ7Y3Q45HBslgjkEAADs=";
	var pic_couch_yes_b = "data:image/gif;base64,R0lGODlhIwAjALMPACI8HmSm406e31J0VmeEnICv6z86AVbB9EOr6B5iYRuD5Duj2WjQ+ymAnCWRzAAAACH5BAEAAA8ALAAAAAAjACMAAAT/8MlJZ7mvBLFEqWAICo7TDGVafmKbFaSzOIlsl2e5BO7EmTLEIrFYIISzhsrBcwUQjEXDeEA0EIds1lRMNZoiAeMwWzDG5vP50NAKgYQWlCxbp9WChpo8LcVBBFd0ZmQLWWNRdwxTdA1/EgJYizdFUkeXU1h8WQglCRlFB3Y1QDiVRVOVU2czNA9Ga0gNSko4S7UyjAydCwCBDlldJgnECbPGKrhcnbMOAA3EDp04qW/HxrPKMgkA3AYD2QBeDmrlBwrI3Mi1RzgESc+ziuarY53FwAdeDTHcDQqayu3iJ/CMFUOtjgXAkUABQCya+EApyCqbiVkAFl5M4fASuiNawQT2CocxI7UlDhzWeBhSTTZjxb5ppIHS0xWWWqp0S5LAgM8BMWho85TS4cNLQ4w28GkgY1BsKHEZ7ahgllKmA2CkIEWLYc2tRatiDTAT2VYATb8SvfrzQjKzOJoOHRZ2adsH07wQU4ZvyUqHdr+xCNDqbbR90IiJYyuYAozCep+VUKC3rk8AWUMUyKuiGN+pgR9pflLTMzHQl1n0eECaI2WrqA2IXp2h9dTbSwfQFqGh1W2xqneP9p3SkXDaj/1UiAAAOw==";
	var pic_couch_yes_p = "data:image/gif;base64,R0lGODlhIwAjALMPAEAvS+7Bt+u6s4JnhaaQjPPMugETP/zDxfS7vH9YZvK4sOmxs//Mz7eIj+CoqwAAACH5BAEAAA8ALAAAAAAjACMAAAT/8MlJZ7mvBLFEqWAICo7TDGVafmKbFaSzOIlsl2e5BO7EmTLEIrFYIISzhsrBcwUQjEXDeEA0EIds1lRMNZoiAeMwWzDG5vP50NAKgYQWlCxbp9WChpo8LcVBBFd0ZmQLWWNRdwxTdA1/EgJYizdFUkeXU1h8WQglCRlFB3Y1QDiVRVOVU2czNA9Ga0gNSko4S7UyjAydCwCBDlldJgnECbPGKrhcnbMOAA3EDp04qW/HxrPKMgkA3AYD2QBeDmrlBwrI3Mi1RzgESc+ziuarY53FwAdeDTHcDQqayu3iJ/CMFUOtjgXAkUABQCya+EApyCqbiVkAFl5M4fASuiNawQT2CocxI7UlDhzWeBhSTTZjxb5ppIHS0xWWWqp0S5LAgM8BMWho85TS4cNLQ4w28GkgY1BsKHEZ7ahgllKmA2CkIEWLYc2tRatiDTAT2VYATb8SvfrzQjKzOJoOHRZ2adsH07wQU4ZvyUqHdr+xCNDqbbR90IiJYyuYAozCep+VUKC3rk8AWUMUyKuiGN+pgR9pflLTMzHQl1n0eECaI2WrqA2IXp2h9dTbSwfQFqGh1W2xqneP9p3SkXDaj/1UiAAAOw==";
	var pic_couch_maybe_b = "data:image/gif;base64,R0lGODlhIwAjANU9ACI8HmSm406e31J0VmeEnJuZo7WytqCwup2qvvDU0/HV0zmHuJyTkEWGsZeUrO7T0jNeWpKgubu0viNdXcW9xXd4g4KOqUh4iVeVvO/T0imIwEyUwaekru7Rzj14jnSDobqtrr63v2fC65iHeT9fWL+4wvDT0kZ8q+7QzDNcWV6s2O/U0y14kzmEtnmLoHuChG56r6OhqICv6z86AUOr6FbB9GjQ+x5iYTuj2RuD5CmAnCWRzP///wAAAAAAAAAAACH5BAEAAD0ALAAAAAAjACMAAAb/wJ5wSBzKjj1ZQIATyIrQKFSw2+kG1Wz1Ke0mZdQdbncTm6vXKi7gHTKtYhruhsPR5GOddsf2Bmg2ODp2NTQ6NDWJiVZ1WTp9UgI2NWM4NpOWl5c1OopycARdgJRilxEbCKmXAjqalINVoVAEh6QYBgkZPLsKCQYWmZeDpDqyQgKINno4CxK7z9AvGIiviTRVN0l1NZtzDQXQ4bsxwIKZY2Q9dpt4Ohfi8A1iwzbXOAC0O4mNViPhHQwehHOBxo4VPQB03ChzDY0OXdBY3IAQrkCWOQBuAJgxQIdHAI522FAAjYKKHBPCMYCz4w4aAnkSesx0oKaBmzUuhAgHYaG+/xqOdITRqCMHNU2XaFQwEY6CCEM4SB28EQDNjRxGEVGjVGFFOAUHLgnyeFAHgKoHs2C9QyMHiRJfwwaSafbjWYd7dmC9cSJcAgSaPCpUuJAjWjJ5sTGAliCCp4x5bsyYPCAMGT15b4B7xoGtnKtYdUyecdbyDbJ7dHwoUMCBAxhrc3jEKnv0ADBZysDBrLDFgt8N5OXWG9p2gMOntWgkLfCZxeG0RVM+omVw9RkooD23Uia67ScNHS3EvMOZc+XEa08XEgBd9YU3mu9iQFhjeukcuQgB494RCGgOiHffZADcFoUM4VWhgQYTpACBB8rRpt4Mxhz4R2LwESahdADo1yjGhWrlcJCE6lXYxn4gkrghRyd2oQQ6KormYYsWwqhXMTTSyF8sRQQBADs=";
	var pic_couch_maybe_p = "data:image/gif;base64,R0lGODlhIwAjANU2AEAvS+vDuui8toJnhaWSjuW5svbj4uWvrvLGv9ymp/fCvHpXY/Xi4fzBv+y/tfi8utWsp/Ti4PS4te21rOy1rdG+wNfDxPbk4tijpPXj4b+xtLCEia6Ei9jExeq1r+esqsm4uvDEvd+rrPLh37iKjt6npui8teSvqe62r35ZakIuSfDNvfG+vwETP/nGyP7Mz31ZZua0tu+7tLWLkt2rrv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAjACMAAAb/QJtwSByujrZVQBATrIrQKFRAo80G1Wz1Ke0mV1RajAYTm6vXaizgHTKtYlYMFoux5OOZlsb2BlgvMTN2LiwzLC6JiVZ1WTN9UgIvLmMxLy8PIg2bly4zinJwBF2AlDQHCAYXNawGBggoM5eTgmM0o1AEh5QJHay/wB4Hsy+DpjO4QgKIxacFwNCsJhKJgoksVTBJdS6dcyXR4Qd1g5e22nadeDMQ0BEFDNAnYsYv2DEAujTVtjMj0AtmJIBWAI0dK3oAzIBRBhuaGRmAVdgAYwHBLHMAwADQYsCMjwAc0XihoCSCky4mgIBGAg6NO2gI5FH40RKxWQ8iQLOwgOE+/xeOZoTZOEMGom7EJOgEZkCBPWP9FgZAA0OGUURHXRyoAK3pLEEfEc4AMBVhFqt3WMhI0bXBV5pjQZJ9uIeGVRjPfl14QOzjwoUMO5YlUzdbu18hFBXSmAdGi8cDwpDRUxfGBweYHUhIK6eq1RmPW5CVDCPsnhkYEiSgMGECWhkfrcIOPQBMljJwKC+M96vgbbufaQcYXFrLRtG8WfnOBnw25CNa/kZvoQHY8oXNQT+34dARQ8o0ktdYTli29o5cAtiKzhCGBWAQAG/MTpuLEDDrHS1QwSE1Be/0iVZbFCt0Z9x3xsnmXAvJEPhHYe0BpqB2ANjXxoNnyYCQgs412B7GfRhyOGFHH3ahhC0igmZhiQ6iaBcyLLKIXxUeBgEAOw==";
	var pic_friends = "data:image/png;base64,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";
	var pic_groups = "data:image/png;base64,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";
	var pic_striper = "data:image/gif;base64,R0lGODlhAQACAIABAN7e3v///yH5BAEKAAEALAAAAAABAAIAAAICRAoAOw==";
	var pic_fake = "data:image/gif;base64,R0lGODlhEAAQANU/AMemV/3lm7x3F3JUPt+WAEkjDOiaBP2kAf3iif/GAP+1AN+pAMqzi+SjBP+tAFw6JP/KC3hSJf/MGR8WAP/gdP/XR3FUQPiZA/+eAD8ZAv+/AAAAAP/VQP/RMP/igGtOOf/YT//bYf/PJv/cZ/OhCcaYFLiSN//aXvm2B//novjOP//XTnhdSnBNL+21AH5QHvjAA/fFGP/LEN+6OPnYZ/PXeW1CCHNGCHZNFMSGIndbSL2RIsabJcyVGs62hf///yH5BAEAAD8ALAAAAAAQABAAAAahwJ9QaClkCpahUvho+RAUGiDyWP4KjIBnBOJ0RLyC8pH1hCodCQSSKFWFg5SZI5IlEpr8jchAjCobbAkbeRo9SQUBFCAdG3eDCpEoYhkIJxwSjwoOnJwZVzUrM4KbnAQHJGIsABUTC3eRDgQTBwI6QhEqEq4LBL4TGBc2Qx8mMQkTycnBAh9jOy4wsQcGAm9KFjg7DQ0GOS9JVkRGSOLm4kEAOw==";
	// end of PICTURES section
	
	
	// FUNCTIONS section
	// Gets DOM previous sibling, ignoring texts and blanks
	// Hints on http://v3.thewatchmakerproject.com/journal/329/finding-html-elements-using-javascript-nextsibling-and-previoussibling
	function getPreviousSibling(n) {
		do n = n.previousSibling;
		while (n && n.nodeType != 1);
		return n;
	}
	
	// Gets DOM next sibling, ignoring texts and blanks
	// Hints on http://v3.thewatchmakerproject.com/journal/329/finding-html-elements-using-javascript-nextsibling-and-previoussibling
	function getNextSibling(n) {
		do n = n.nextSibling;
		while (n && n.nodeType != 1);
		return n;
	}
	
	// Filters out duplicates from array
	// Copied from http://www.martienus.com/code/javascript-remove-duplicates-from-array.html
	function unique_array(a) {
		if (a.length > 1) {
			a.sort();
			for (var i = 1;i < a.length;) {
				if (a[i-1] == a[i]){
					a.splice(i, 1);
				} else{
					i++;
				}
			}
		}
		return a;
	}
	
	// Checks whether a newer version of the script is available 
	function checkScriptVersion(version, msg) {
		var tmp = new Date().getTime();// Obtains time in milliseconds 
		var tm = getValue('tcv', 0);// Obtains value when last check was performed, default value is 0
		if (tm == 0) { // Checks whether check was performed before
			setValue('tcv', parseInt(tmp/1000));// If check was not performed this means that user just installed latest version of script, and we therefore save time in seconds when check was performed
			setValue('icon', 'actual');
		} else {
			if (tmp/1000 - parseInt(tm) >= 14400) { // This part checks whether check was performed in last 4 hours. Value is in seconds.
				setValue('tcv', parseInt(tmp/1000));// Now we save time so that it was checked for new version.
				// This part connects to userscripts meta site and checks values for your script
				xhr({
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/66264.meta.js', // Here you will change number 51469 to number of your script
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'application/html,application/xml,text/xml',
					},
					onload: function(responseDetails) {
						var text = responseDetails.responseText;// We obtain contents of the site
						if (text.match("version[ \t]+([0-9\.]*)")) {
							vers = RegExp.$1;
							if (version != vers) { // Check whether a new version is available
								alert(msg);
								setValue('icon', 'new');
							} else {
								setValue('icon', 'actual');
							}
						}
					}
				});		
			}
		}
	}
	
	function cleanPercentage(number) {
		number = number.toFixed(1);
		if (parseInt(number) == number) {
			// Deletes useless .00 in percentages
			number = parseInt(number);
		} else {
			if (lds != '.') {
				// Changes decimal separator
				number = number.replace(/\./g, lds);
			}
		}
		return number;
	}
	// end of FUNCTIONS section
	
	
	// HANDLERS section
	// Retrieving header handler
	d_ref = document.getElementsByTagName('h1');
	for (var i = 0;i < d_ref.length;i++) {
		if (d_ref[i].getAttribute('class') == 'profile') {
			header = d_ref[i].parentNode;
			break;
		} 
	}
	
	// Retrieving ICONBOX handler
	d_ref = document.getElementsByTagName('div');
	for (var i = 0;i < d_ref.length;i++) {
		if (d_ref[i].getAttribute('class') == 'iconbox') {
			iconbox = d_ref[i];
			break;
		} 
	}
	// end of HANDLERS section
	
	
	// LANGUAGES section
	// Determining language
	d_ref = document.getElementById('fire_lang_menu');
	if (d_ref != '') {
		if (d_ref.innerHTML.match(/Lingua Italiano/g)) {
			language = 'it-IT';
		} else if (d_ref.innerHTML.match(/Language English/g) || d_ref.innerHTML.match(/Language: Language/g)) {
			language = 'en-GB';
		} else if (d_ref.innerHTML.match(/Idioma Español/g)) {
			language = 'es-ES';
		} else if (d_ref.innerHTML.match(/Sprache Deutsch/g)) {
			language = 'de-DE';
		} else if (d_ref.innerHTML.match(/Langue Français/g)) {
			language = 'fr-FR';
		}
	}
	// Checks in case there's any problem with the language cookie
	// and page language is back default English
	if (document.getElementById('couchinfo').innerHTML == 'Couch Information') {
		language = 'en-GB';
	}
	
	// Setting locale
	switch (language) {
		case 'it-IT':
			s_DivTitle = "Referenze";
			s_RE_From = '</div><strong>Da ';// reg exp to be searched for
			s_RE_To = '</div><strong>A ';// reg exp to be searched for
			s_RE_Inappropriate = 'Questa referenza non è appropriata.<br';// reg exp to be searched for
			s_RE_Positive = '>Positiva<';// reg exp to be searched for
			s_RE_Negative = '>Negativa<';// reg exp to be searched for
			s_RE_LivedIn = 'HO VISSUTO:';// reg exp to be searched for
			s_RE_WantsToGo = 'VORREI VISITARE:';// reg exp to be searched for
			s_RE_IsGoingTo = 'IN PARTENZA PER:';// reg exp to be searched for
			s_DivTitle1 = 'Statistiche su ';	
			s_DivTitle2 = ' referenze';	
			s_Hosted = 'Ospitato';
			s_Surfed = 'Visitato';
			s_Total = 'Totale';
			s_Positives = 'Referenze positive';
			s_Neutral = 'Neutrale';
			s_Neutrals = 'Referenze neutrali';
			s_Negatives = 'Referenze negative';
			s_Inappropriates = 'Referenze inappropriate';			
			s_Left = 'Lasciate';
			s_Received = 'Ricevute';
			s_Days = 'giorni';
			s_ShortLeft = 'L';
			s_ShortReceived = 'R';
			s_ShortDays = 'g';
			s_RefMutual = 'Contraccambiate';
			s_RefLeft = 'Solo lasciate';
			s_RefReceived = 'Solo ricevute';
			s_Traveled = 'Viaggiato assieme';
			s_MetInPerson = 'Incontrate';
			s_NotMetInPerson = 'Conosciute online';
			s_Fake = "Farlocche (?)";
			s_GraphLTitle = 'Grafico referenze lasciate';
			s_GraphRTitle = 'Grafico referenze ricevute';
			s_LinkTitle = 'Come modificare il rapporto personalizzato';
			s_Languages = 'Lingue conosciute';
			s_Countries = 'Paesi visitati';
			s_NewerVersion = 'Una nuova versione dello script CS Profile Informer è disponibile!';
			s_Short_NewerVersion = 'Nuova versione disponibile';
			s_HospitalityPercentage = "<span title='Percentuale delle persone incontrate come ospite o ospitante'>Esperienze d'ospitalità</span>";
			s_RefReliability = "<span title='Basata sulla corrispondenza delle referenze contraccambiate'>Affidabilità referenze</span>";
			s_RE_GenderPreference = "Preferenza di sesso:";
			s_RE_SharedSurface = "Superficie per dormire condivisa:";
			s_RE_GenderMale = "Maschio";
			s_RE_GenderFemale = "Femmina";
			s_GroupsLabel = "Gruppi";
			s_ModifiedBy = "Modificato da Profile Informer";
			s_ShowAll = "mostra tutte";
			s_ShowAllTip = "Al momento, la pagina mostra solo le ultime referenze;clicca per vedere le statistiche su tutte le referenze";
			s_StatsError = "Attenzione: probabile errore nell'elaborazione delle statistiche!";
			break;
		case 'en-GB':
			s_DivTitle = "References";
			s_RE_From = '</div><strong>From ';// reg exp to be searched for
			s_RE_To = '</div><strong>For ';// reg exp to be searched for
			s_RE_Inappropriate = 'This reference is not appropriate.<br';// reg exp to be searched for
			s_RE_Positive = '>Positive<';// reg exp to be searched for
			s_RE_Negative = '>Negative<';// reg exp to be searched for
			s_RE_LivedIn = 'LIVED:';// reg exp to be searched for
			s_RE_WantsToGo = 'WANTS TO GO:';// reg exp to be searched for
			s_RE_IsGoingTo = 'IS GOING TO:';// reg exp to be searched for
			s_DivTitle1 = 'Statistics on ';	
			s_DivTitle2 = ' references';	
			s_Hosted = 'Hosted';
			s_Surfed = 'Surfed';
			s_Total = 'Total';
			s_Positives = 'Positive references';
			s_Neutral = 'Neutral';
			s_Neutrals = 'Neutral references';
			s_Negatives = 'Negative references';
			s_Inappropriates = 'Inappropriate references';			
			s_Left = 'Left';
			s_Received = 'Received';
			s_Days = 'days';
			s_ShortLeft = 'L';
			s_ShortReceived = 'R';
			s_ShortDays = 'd';
			s_RefMutual = 'Mutual';
			s_RefLeft = 'Left only';
			s_RefReceived = 'Received only';
			s_Traveled = 'Traveled with';
			s_MetInPerson = 'Met in person';
			s_NotMetInPerson = 'Met online';
			s_Fake = "Fake (?)";
			s_GraphLTitle = 'Left references graph';
			s_GraphRTitle = 'Received references graph';
			s_LinkTitle = 'How to edit custom ratio';
			s_Languages = 'Known languages';
			s_Countries = 'Visited countries';
			s_NewerVersion = 'A newer version of the CS Profile Informer script is available!';
			s_Short_NewerVersion = 'Newer version available';
			s_HospitalityPercentage = "<span title='Percentage of people met because of hosting or surfing'>Hospitality experiences</span>";
			s_RefReliability = "<span title='Based on matching of mutual references' hosting, surfing and travelling experiences'>References reliability</span>";
			s_RE_GenderPreference = "Preferred Gender:";
			s_RE_SharedSurface = "Shared Sleeping Surface:";
			s_RE_GenderMale = "Male";
			s_RE_GenderFemale = "Female";
			s_GroupsLabel = "Groups";
			s_ModifiedBy = "Modified by Profile Informer";
			s_ShowAll = "show all";
			s_ShowAllTip = "At the moment, the page shows only the latest references, click to see the statistics on all the references";
			s_StatsError = "Warning: probable error during statistics elaboration!";
			break;
		case 'es-ES':
			s_DivTitle = "Referencias";
			s_RE_From = '</div><strong>De ';// reg exp to be searched for
			s_RE_To = '</div><strong>Para ';// reg exp to be searched for
			s_RE_Inappropriate = 'Esta referencia no es apropiada.<br';// reg exp to be searched for
			s_RE_Positive = '>Positivo/a<';// reg exp to be searched for
			s_RE_Negative = '>Negativo/a<';// reg exp to be searched for
			s_RE_LivedIn = 'HA VIVIDO EN:';// reg exp to be searched for
			s_RE_WantsToGo = 'QUIERE IR A:';// reg exp to be searched for
			s_RE_IsGoingTo = 'VA A VIAJAR A:';// reg exp to be searched for
			s_DivTitle1 = 'Estadísticas sobre ';	
			s_DivTitle2 = ' referencias';	
			s_Hosted = 'Hospedado';
			s_Surfed = 'Surfeado';
			s_Total = 'Total';
			s_Positives = 'Referencias positivas';
			s_Neutral = 'Neutral';
			s_Neutrals = 'Referencias neutrales';
			s_Negatives = 'Referencias negativas';
			s_Inappropriates = 'Referencias inapropiadas';			
			s_Left = 'Dejadas';
			s_Received = 'Recibidas';
			s_Days = 'dias';
			s_ShortLeft = 'D';
			s_ShortReceived = 'R';
			s_ShortDays = 'd';
			s_RefMutual = 'Reciprocadas';
			s_RefLeft = 'Solamente dejadas';
			s_RefReceived = 'Solamente recibidas';
			s_Traveled = 'Viajado con';
			s_MetInPerson = 'Encontradas';
			s_NotMetInPerson = 'Conocidas online';
			s_Fake = "Falsas (?)";
			s_GraphLTitle = 'Gráfico de referencias dejadas';
			s_GraphRTitle = 'Gráfico de referencias recibidas';
			s_LinkTitle = 'Como editar el reporte personalizado';
			s_Languages = 'Lenguajes conocidos';
			s_Countries = 'Paises visitados';
			s_NewerVersion = '¡Una nueva versión de lo script CS Profile Informer está disponible!';
			s_Short_NewerVersion = 'Nueva versión disponible';
			s_HospitalityPercentage = "<span title='Porcentaje de personas encontradas a través de hospedaje o surfeo'>Experiencias de hospitalidad</span>";
			s_RefReliability = "<span title='Basado en referencias mutuas coincidentes de hospedaje, surfeo y experiencias de viaje'>Fiabilidad referencias</span>";
			s_RE_GenderPreference = "Género preferido:";
			s_RE_SharedSurface = "Superficie Para Dormir Compartida:";
			s_RE_GenderMale = "Hombre/Varón";
			s_RE_GenderFemale = "Mujer";
			s_GroupsLabel = "Grupos";
			s_ModifiedBy = "Modificado por Profile Informer";
			s_ShowAll = "muestra todas";
			s_ShowAllTip = "Por el momento, la página sólo muestra las últimas referencias;haga clic para ver las estadísticas de todas las referencias";
			s_StatsError = "Advertencia: error probable durante la elaboración de estadísticas!";
			break;
		case 'de-DE':
			s_DivTitle = "Referenzen";
			s_RE_From = '</div><strong>Von ';// reg exp to be searched for
			s_RE_To = '</div><strong>Für ';// reg exp to be searched for
			s_RE_Inappropriate = 'Diese Referenz ist nicht angemessen.';// reg exp to be searched for
			s_RE_Positive = '>Positiv<';// reg exp to be searched for
			s_RE_Negative = '>Negativ<';// reg exp to be searched for
			s_RE_LivedIn = 'LEBTE IN:';// reg exp to be searched for
			s_RE_WantsToGo = 'MÖCHTE REISEN NACH:';// reg exp to be searched for
			s_RE_IsGoingTo = 'REIST BALD NACH:';// reg exp to be searched for
			s_DivTitle1 = 'Statistik der ';	
			s_DivTitle2 = '-Referenzen';	
			s_Hosted = 'Beherbergt';
			s_Surfed = 'Übernachtet';
			s_Total = 'Summe';
			s_Positives = 'Positive Referenzen';
			s_Neutral = 'Neutral';
			s_Neutrals = 'Neutrale Referenzen';
			s_Negatives = 'Negative Referenzen';
			s_Inappropriates = 'Unangemessene Referenzen';
			s_Left = 'Geschrieben';
			s_Received = 'Erhalten';
			s_Days = 'tag';
			s_ShortLeft = 'g';
			s_ShortReceived = 'e';
			s_ShortDays = 't';
			s_RefMutual = 'Erwidert';
			s_RefLeft = "Nur geschrieben";
			s_RefReceived = "Nur erhalten";
			s_Traveled = 'Gereist';
			s_MetInPerson = 'Persl. getroffen';
			s_NotMetInPerson = 'Online getroffen';
			s_Fake = "Falsch (?)";
			s_GraphLTitle = 'Grafik geschriebene Referenzen';
			s_GraphRTitle = 'Grafik erhaltene Referenzen';
			s_LinkTitle = 'Benutzerdefinierte Statistik bearbeiten';
			s_Languages = 'Spricht folgende Sprachen';
			s_Countries = 'Bereiste Länder';
			s_NewerVersion = 'Eine neue Version von CS Profile Informer ist verfügbar!';
			s_Short_NewerVersion = 'Neue version verfügbar';
			s_HospitalityPercentage = "<span title='Prozentsatz der beim Hosten oder Surfen kennengelernten Menschen'>Erfahrungen v. Gastfreundschaft</span>";
			s_RefReliability = "<span title='Auf Übereinstimmung der Host-, Surf- und Reiseerfahrung auf gegenseitigen Referenzen basierend'>Reliabilität Referenzen</span>";
			s_RE_GenderPreference = "Geschlecht:";
			s_RE_SharedSurface = "Schlafgelegenheit muss mit anderen geteilt werden:";
			s_RE_GenderMale = "Männlich";
			s_RE_GenderFemale = "Weiblich";
			s_GroupsLabel = "Groups";
			s_ModifiedBy = "Geändert durch Profile Informer";
			s_ShowAll = "alle zeigen";
			s_ShowAllTip = "Im Moment zeigt die Seite nur die neuesten Referenzen, klicken Sie auf die Statistiken über alle Referenzen zu sehen";
			s_StatsError = "Warnung: wahrscheinlich Fehler bei der Ausarbeitung Statistiken!";
			break;
		case 'fr-FR':
			s_DivTitle = "Références";
			s_RE_From = '</div><strong>De ';// reg exp to be searched for
			s_RE_To = '</div><strong>Au sujet de ';// reg exp to be searched for
			s_RE_Inappropriate = 'Cette eCSpérience n\'est pas appropriée.' // reg exp to be searched for
			s_RE_Positive = '>Positive<';// reg exp to be searched for
			s_RE_Negative = '>Négative<';// reg exp to be searched for
			s_RE_LivedIn = 'Pays où j\'ai vécu :';// reg exp to be searched for
			s_RE_WantsToGo = 'Pays que je souhaite explorer :';// reg exp to be searched for
			s_RE_IsGoingTo = 'Pays où je vais prochainement :';// reg exp to be searched for
			s_DivTitle1 = 'Statistiques sur ';	
			s_DivTitle2 = ' références';	
			s_Hosted = 'Hébergé';
			s_Surfed = 'Surfé';
			s_Total = 'Total';
			s_Positives = 'ECSpériences positives';
			s_Neutral = 'Neutre';
			s_Neutrals = 'ECSpériences neutres';
			s_Negatives = 'ECSpériences négatives';
			s_Inappropriates = 'ECSpériences inappropriées';
			s_Left = 'Laissées';
			s_Received = 'Reçues';
			s_Days = 'jours';
			s_ShortLeft = 'L';
			s_ShortReceived = 'R';
			s_ShortDays = 'j';
			s_RefMutual = "Réciproques";
			s_RefLeft = "Laissées uniquement";
			s_RefReceived = "Reçues uniquement";
			s_Traveled = 'Voyagé avec';
			s_MetInPerson = 'Rencontrées en personne';
			s_NotMetInPerson = 'Rencontrées sur internet';
			s_Fake = "Faux (?)";
			s_GraphLTitle = 'Graphe des eCSpériences laissées';
			s_GraphRTitle = 'Graphe des eCSpériences reçues';
			s_LinkTitle = 'Comment modifier le ratio personnalisé';
			s_Languages = "Nombre de langues parlées";
			s_Countries = "Nombre de pays visités";
			s_NewerVersion = 'Une nouvelle version du script CS Profile Informer est disponible!';
			s_Short_NewerVersion = 'Nouvelle version disponible';
			s_HospitalityPercentage = "<span title='Pourcentage de personnes rencontrées en les hébergeant ou en surfant chez elles'>Expérience de l'hospitalité</span>";
			s_RefReliability = "<span title='Basé sur le recoupement d’expériences d’hébergement, de surf ou de voyage dans des références mutuelles'>Fiabilité des références</span>";
			s_RE_GenderPreference = "Sexe des surfeurs que vous préféreriez recevoir:";
			s_RE_SharedSurface = "La surface où dormir est partagée:";
			s_RE_GenderMale = "Homme";
			s_RE_GenderFemale = "Femme";
			s_GroupsLabel = "Groupes";
			s_ModifiedBy = "Modifié par Profile Informer";
			s_ShowAll = "montre tous";
			s_ShowAllTip = "À l&#39;heure actuelle, la page ne montre que les dernières références;cliquez ici pour voir les statistiques sur toutes les références";
			s_StatsError = "Attention: erreur probable lors de l'élaboration des statistiques!";
			break;
		default: // using English, but harder to search with regular expressions 
			s_DivTitle = "References";
			s_RE_From = ' class="userlink"';
			s_RE_To = '';
			s_RE_Inappropriate = '<p style="color: red;">';
			s_RE_Positive = '<div style="color: green;font-weight: bold;">';
			s_RE_Negative = '<div style="color: red;font-weight: bold;">';
			s_RE_LivedIn = '';// reg exp to be searched for
			s_RE_WantsToGo = '';// reg exp to be searched for
			s_RE_IsGoingTo = '';// reg exp to be searched for
			s_DivTitle1 = 'Statistics on ';	
			s_DivTitle2 = ' references';	
			s_Hosted = 'Hosted';
			s_Surfed = 'Surfed';
			s_Total = 'Total';
			s_Positives = 'Positive references';
			s_Neutral = 'Neutral';
			s_Neutrals = 'Neutral references';
			s_Negatives = 'Negative references';
			s_Inappropriates = 'Inappropriate references';			
			s_Left = 'Left';
			s_Received = 'Received';
			s_Days = 'days';
			s_ShortLeft = 'L';
			s_ShortReceived = 'R';
			s_ShortDays = 'd';
			s_RefMutual = 'Mutual';
			s_RefLeft = 'Left only';
			s_RefReceived = 'Received only';
			s_Traveled = 'Traveled with';
			s_MetInPerson = 'Met in person';
			s_NotMetInPerson = 'Met online';
			s_Fake = "Fake (?)";
			s_GraphLTitle = 'Left references graph';
			s_GraphRTitle = 'Received references graph';
			s_LinkTitle = 'How to edit custom ratio';
			s_Languages = 'Known languages';
			s_Countries = 'Visited countries';
			s_NewerVersion = 'A newer version of the CS Profile Informer script is available!';
			s_Short_NewerVersion = 'Newer version available';
			s_HospitalityPercentage = "<span title='Percentage of people met because of hosting or surfing'>Hospitality experiences</span>";
			s_RefReliability = "<span title='Based on matching of mutual references'>References reliability</span>";
			s_RE_GenderPreference = "Preferred Gender:";
			s_RE_SharedSurface = "Shared Sleeping Surface:";
			s_RE_GenderMale = "Male";
			s_RE_GenderFemale = "Female";
			s_GroupsLabel = "Groups";
			s_ModifiedBy = "Modified by Profile Informer";
			s_ShowAll = "show all";
			s_ShowAllTip = "At the moment, the page shows only the latest references, click to see the statistics on all the references";
			s_StatsError = "Warning: probable error during statistics elaboration!";
			break;
	}
	// end of LANGUAGES section
	
	
	// NEWER SCRIPT VERSION section
	// Compares current script version to check for updates
	if (!scriptCompiler) {
		checkScriptVersion(script_version,s_NewerVersion);
		if (getValue('icon') == 'actual') {
			s_Colophon = "<a href='http://userscripts.org/scripts/show/66264' title='info' target='_blank'><img src=" + pic_infoBlue + " alt='info' border='0' width='16px' height='16px' style='position: absolute;bottom:5px;right:5px;z-index:1'></a>";
		} else {
			s_Colophon = "<a href='http://userscripts.org/scripts/show/66264' title='" + s_NewerVersion + "' target='_blank'><img src=" + pic_infoRed + " alt='" + s_NewerVersion + "' border='0' width='16px' height='16px' style='position: absolute;bottom:5px;right:5px;z-index:1'></a>";
		}
	} else {
		s_Colophon = '';
	}
	
	
	// PATCH all_references section
	d_ref = document.getElementById('show_all_references');
	if (d_ref) {
		strTMP = d_ref.innerHTML;
		strTMP = strTMP.replace("?all_references=1","&all_references=1");
		strTMP = strTMP.replace("/&","?");
		strTMP = strTMP.replace("><strong"," title='" + s_ModifiedBy + "'><strong");
		d_ref.innerHTML = strTMP;
		if (strTMP.match(/<strong>.*?([0-9]+)/g)) {
			ref_hidden = RegExp.$1*1;
		}
		d_ref.setAttribute('onclick',"");
		if (window.location.href.match(/\?/g)) {
			s_ShowAll = " (<a href='" + window.location.href + "&all_references=1' target='_self' title='" + s_ShowAllTip + "'>" + s_ShowAll + "</a>)";
		} else {
			s_ShowAll = " (<a href='" + window.location.href + "?all_references=1' target='_self' title='" + s_ShowAllTip + "'>" + s_ShowAll + "</a>)";
		}
	} else {
		s_ShowAll = "";
	}
	// end of PATCH all_references section
	
	
	// STATISTICS section
	// Counting languages
	d_ref = document.getElementsByTagName('UL');
	for (var i = 0;i < d_ref.length;i++) {
		if (d_ref[i].getAttribute('class') == 'languages') {
			var languages = d_ref[i].innerHTML.toLowerCase().split('<li>');
			var languages_num = languages.length - 1;
		}
	}
	
	// Counting visited countries
	// Considering just TRAVELED and LIVED IN, and assuming that their total
	// is the right number + 1 (since for stats sake we don't want to consider
	// country you've been born as a foreign visited country)
	if (s_RE_WantsToGo != '') {
		var str = document.getElementsByTagName('STRONG');
		var node_comparison;
		var docmp = false;
		var doexist_livedin = false;
		var s_RE_Country = "/statistics.html\?country_name=(.+?)";
		for (var j = 0;j < str.length;j++) {
			if (!doexist_livedin && str[j].innerHTML.indexOf(s_RE_LivedIn) > -1) {
				doexist_livedin = true;
			} else if (str[j].innerHTML.indexOf(s_RE_IsGoingTo) > -1) {
				node_comparison = str[j];
				docmp = true;
				break;
			}
			if (str[j].innerHTML.indexOf(s_RE_WantsToGo) > -1) {
				node_comparison = str[j];
				docmp = true;
				break;
			}
		}
		d_ref = document.getElementsByTagName('A');
		for (var i = 0;i < d_ref.length;i++) {
			if (d_ref[i].href.match(/statistics.html\?country_name=(.+)/g)) {
				if (docmp) {
					if (d_ref[i].compareDocumentPosition(node_comparison) & node_comparison.DOCUMENT_POSITION_PRECEDING) break;
				}
				visitedcountries.push(RegExp.$1);
			}
		}
		if (visitedcountries.length > 0) {
			visitedcountries = unique_array(visitedcountries);
			visitedcountries_num = visitedcountries.length;
			if (visitedcountries_num > 0 && doexist_livedin) {visitedcountries_num--;}
		}
	}
	
	// Counting groups
	var node_comparison = document.getElementById("groups");
	var node_comparison2 = document.getElementById("couchinfo");
	var groups_tot = 0;
	str = getNextSibling(node_comparison);
	while (str != node_comparison2) {
		if (str != null) {
			if (str.innerHTML.match(/group\.html\?gid=/g)) {
				groups_tot = str.innerHTML.match(/group\.html\?gid=/g).length;
				if (str.innerHTML.match(/<td class=['"]blackborder['"].*?valign=['"]middle['"].*>.*?([0-9]+).*?<br/g)) {
					groups_tot = groups_tot + parseInt(RegExp.$1);
				}
				break;
			}
			node_comparison = str;
			str = getNextSibling(node_comparison);
		} else {
			break;
		}
	}	
	
	// Checking couch preferred gender and looking for possible dangers
	// detects couch availability
	iconbox.innerHTML.match(/icon_couch_([a-z]+)\.gif/);
	var s_CouchType = RegExp.$1;
	// detects couch info section and friends section
	var node_comparison = document.getElementById("couchinfo");
	var node_comparison2 = document.getElementById("friends");
	var s_CouchGender = '';
	var s_CouchShared = '';
	if (s_CouchType == 'def' || s_CouchType == 'yes' || s_CouchType == 'maybe') {
		// searches strings for gender preference and shared surface
		str = getNextSibling(node_comparison);
		while (str != node_comparison2) {
			if (str != null) {
				if (str.innerHTML.match(s_RE_GenderPreference)) {
					s_CouchGender = str.nextSibling.nodeValue;
				} else if (str.innerHTML.match(s_RE_SharedSurface)) {
					s_CouchShared = str.nextSibling.nodeValue;
					break;
				}
				node_comparison = str;
				str = getNextSibling(node_comparison);
			} else {
				break;
			}
		}
	
		// prepares string for warning section
		var s_NewCouchIcon = '';
		var s_RE_GenderMaleEng = "Male";
		var s_RE_GenderFemaleEng = "Female";
		
		switch(s_CouchType) {
			case 'def':
				if (s_CouchGender.match(s_RE_GenderMale) || s_CouchGender.match(s_RE_GenderMaleEng)) {
					s_NewCouchIcon = pic_couch_def_b;
				} else if (s_CouchGender.match(s_RE_GenderFemale) || s_CouchGender.match(s_RE_GenderFemaleEng)) {
					s_NewCouchIcon = pic_couch_def_p;
				}
				break;
			case 'yes':
				if (s_CouchGender.match(s_RE_GenderMale) || s_CouchGender.match(s_RE_GenderMaleEng)) {
					s_NewCouchIcon = pic_couch_yes_b;
				} else if (s_CouchGender.match(s_RE_GenderFemale) || s_CouchGender.match(s_RE_GenderFemaleEng)) {
					s_NewCouchIcon = pic_couch_yes_p;
				}
				break;
			case 'maybe':
				if (s_CouchGender.match(s_RE_GenderMale) || s_CouchGender.match(s_RE_GenderMaleEng)) {
					s_NewCouchIcon = pic_couch_maybe_b;
				} else if (s_CouchGender.match(s_RE_GenderFemale) || s_CouchGender.match(s_RE_GenderFemaleEng)) {
					s_NewCouchIcon = pic_couch_maybe_p;
				}
				break;
		}
		if (s_NewCouchIcon != '') {
			iconbox.innerHTML = iconbox.innerHTML.replace(/\/images\/icon_couch_[a-z]+\.gif/,s_NewCouchIcon);
		}			
	}
	
	// Retrieving friends total
	if (node_comparison2.innerHTML.match(/(.+) \(([0-9]+)\)/)) {
		var s_FriendsLabel = RegExp.$1;
		friends_tot = RegExp.$2*1;
	}
	
	// Browsing references
	var references_left_others_firstDiv_HTML = '';
	if (document.getElementById('references_left_others_title')) {
		references_left_others_firstDiv_HTML = String(document.getElementById('references_left_others_title').nextSibling.innerHTML);
	}
	d_ref = document.getElementsByTagName('DIV');
	
	for (var i = 0;i < d_ref.length;i++) {
		d_ref_c = d_ref[i];
		div_classname = String(d_ref_c.className);
		var div_id = d_ref_c.getAttribute('id');
	
		if (!references_section && div_id == 'total_ref') {  
	   	// Found references section - to avoid fake references  
	   	references_section = true;
	   	div_referencessection = d_ref_c;
		}
		
		if (references_section) {
			div_html = d_ref_c.innerHTML;
			if (div_classname.match(/reference_from_to_box/gi)) {
				if (d_ref_c.childNodes.length == 4) {
					// Increase the mutual references counter
					refmutual++;
				}
			} else if ((div_classname == "reference_from" || div_classname == "reference_to" || div_classname == "refnotIRL") && d_ref_c.childNodes.length > 1) {
				// Searches for references without description and add 'neutral' tag
				if (div_html.match(/(&nbsp;|\s)<p>/i)) { 
					d_ref_c.innerHTML = div_html.replace (/(&nbsp;|\s)<p>/gi,"<div style='color:black;font-weight:bold;'>" + s_Neutral + "</div><p>");
					if (colorReferences) {
						col_Reference = col_Neutral;
						col_bdr_Reference = col_bdr_Neutral;
					}
				}
						
				// Increases the references total counter
				ref_tot++;
				ref_wholetot++;
		
				// Checks if node is in the last references section, where CS bug gives wrong answers
				if (!refIsLastSection && (div_classname == "reference_from" || div_classname == "refnotIRL")) {
					if (references_left_others_firstDiv_HTML.indexOf(d_ref_c.innerHTML) > -1) {
						refIsLastSection = true;
					}
				}
				
				// Relevance
				var refLeft = false;
				if (div_html.indexOf(s_RE_Positive) > -1) {
					col_Reference = col_Positive;
					col_bdr_Reference = col_bdr_Positive;
					if (div_classname == "reference_from") {
						if (refIsLastSection) {
							refpos_left++;
							refLeft = true;
						} else {
							refpos_received++;
						}
					} else if (div_classname == "reference_to") {
						refpos_left++;
						refLeft = true;
					} else if (div_classname == "refnotIRL") {
						if (div_html.indexOf(s_RE_From) > -1) {
							if (refIsLastSection) {
								refpos_left++;
								refLeft = true;
							} else {
								refpos_received++;
							}
						} else if (div_html.indexOf(s_RE_To) > -1) {
							refpos_left++;
							refLeft = true;
						}
					}
					refpos++;
				} else if (div_html.indexOf(s_RE_Negative) > -1) {
					col_Reference = col_Negative;
					col_bdr_Reference = col_bdr_Negative;
					if (div_classname == "reference_from") {
						if (refIsLastSection) {
							refneg_left++;
							refLeft = true;
						} else {
							refneg_received++;
						}
					} else if (div_classname == "reference_to") {
						refneg_left++;
						refLeft = true;
					} else if (div_classname == "refnotIRL") {
						if (div_html.indexOf(s_RE_From) > -1) {
							if (refIsLastSection) {
								refneg_left++;
								refLeft = true;
							} else {
								refneg_received++;
							}
						} else if (div_html.indexOf(s_RE_To) > -1) {
							refneg_left++;
							refLeft = true;
						}
					}
					refneg++;
				} else if (div_html.indexOf(s_RE_Inappropriate) > -1) {
					col_Reference = col_Inappropriate;
					col_bdr_Reference = col_bdr_Inappropriate;
					if (div_classname == "reference_from") {
						if (refIsLastSection) {
							refinap_left++;
							refLeft = true;
						} else {
							refinap_received++;
						}
					} else if (div_classname == "reference_to") {
						refinap_left++;
						refLeft = true;
					} else if (div_classname == "refnotIRL") {
						if (div_html.indexOf(s_RE_From) > -1) {
							if (refIsLastSection) {
								refinap_left++;
								refLeft = true;
							} else {
								refinap_received++;
							}
						} else if (div_html.indexOf(s_RE_To) > -1) {
							refinap_left++;
							refLeft = true;
						}
					}			
					refinap++;
				} else {
					if (div_classname == "reference_from") {
						if (refIsLastSection) {
							refneu_left++;
							refLeft = true;
						} else {
							refneu_received++;
						}
					} else if (div_classname == "reference_to") {
						refneu_left++;
						refLeft = true;
					} else if (div_classname == "refnotIRL") {
						if (div_html.indexOf(s_RE_From) > -1) {
							if (refIsLastSection) {
								refneu_left++;
								refLeft = true;
							} else {
								refneu_received++;
							}
						} else if (div_html.indexOf(s_RE_To) > -1) {
							refneu_left++;
							refLeft = true;
						}
					}
					refneu++;
				}
				if (colorReferences) {
					d_ref_c.style.backgroundColor = col_Reference;
					if (div_classname == "refnotIRL") {
						d_ref_c.style.backgroundImage = "url(" + pic_striper + ")";
					}
				}
	
				// As for days stats, only references left by the profile's owner count,
				// except for "received only" references, where we trust the author;
				// besides, in these last, surfed and hosted are swapped, to be correctly accounted for
				var parentdiv_class = String(d_ref_c.parentNode.className);
				var blnFromToBox = false;
				if (parentdiv_class.match(/reference_from_to_box/gi)) {
					blnFromToBox = true;
				}
				var already_counted = false;
				var mutualcheck_matchingref = false;
				if ((blnFromToBox && refLeft) || !blnFromToBox) {
				   if (blnFromToBox && refLeft) {
						mutualcheck_matchingref = true;
						if (colorReferences) {
							if (d_ref_c.parentNode.childNodes.length == 4) {
								d_ref_c.style.border = '1px solid ' + col_bdr_Reference;
								d_ref_c.style.margin = '0 10px 10px 20px';
							} else {
								d_ref_c.parentNode.style.backgroundColor = col_Reference;
							}
						}
					}
					// surfed with icon
					if (div_html.match(s_RE_Surfed)) {
						if (refLeft) {
							surfed_with++;
							days_surfed = days_surfed + RegExp.$2*1;
							if (blnFromToBox && mutualcheck_surfeddays != RegExp.$2*1) {
								mutualcheck_matchingref = false;
							}
						} else {
							hosted++;
							days_hosted = days_hosted + RegExp.$2*1;
						}
						already_counted = true;
						hosted_surfed_with++;
					} else if (mutualcheck_surfeddays > 0 && refLeft) {
						mutualcheck_matchingref = false;
					}
					// hosted icon
					if (div_html.match(s_RE_Hosted)) {
						if (refLeft) {
							hosted++;
							days_hosted = days_hosted + RegExp.$2*1;
							if (blnFromToBox && mutualcheck_hosteddays != RegExp.$2*1) {
								mutualcheck_matchingref = false;
							}
						} else {
							surfed_with++;
							days_surfed = days_surfed + RegExp.$2*1;
						}
						if (!already_counted) {
							hosted_surfed_with++;
						}
					} else if (mutualcheck_hosteddays > 0 && refLeft) {
						mutualcheck_matchingref = false;
					}
					// traveled with icon
					if (div_html.match(s_RE_Traveled)) {
						traveled_with++;
						days_traveled = days_traveled + RegExp.$2*1;
						if (blnFromToBox && mutualcheck_traveleddays != RegExp.$2*1) {
							mutualcheck_matchingref = false;
						}
					} else if (mutualcheck_traveleddays > 0 && refLeft) {
						mutualcheck_matchingref = false;
					}
					if (mutualcheck_matchingref == true && !refIsLastSection) {
						mutualcheck_matchingtot++;
					}
					// met in person/online icon
					if (div_classname != "refnotIRL") {
						met_in_person++;
					} else {
						not_met_in_person++;
					}
					if (div_html.match(s_RE_FriendLink)) {
						friends_reftot++;
					}
				} else if (blnFromToBox) {
					if (colorReferences) {
						d_ref_c.parentNode.style.backgroundColor = col_Reference;
						if (div_classname == "refnotIRL") {
							d_ref_c.parentNode.style.backgroundImage = "url(" + pic_striper + ")";
						}
					}
					// ref received in reciprocated references couple
					var mutualcheck_hosteddays = 0;
					var mutualcheck_surfeddays = 0;
					var mutualcheck_traveleddays = 0;
					if (div_html.match(s_RE_Surfed)) {
						mutualcheck_hosteddays = RegExp.$2*1;
					}
					if (div_html.match(s_RE_Hosted)) {
						mutualcheck_surfeddays = RegExp.$2*1;
					}
					if (div_html.match(s_RE_Traveled)) {
						mutualcheck_traveleddays = RegExp.$2*1;
					}
				}
			}
		} else if (div_classname == "reference_from" || div_classname == "reference_to" || div_classname == "refnotIRL") {
			// probable fake reference, we increase the grandtotalcounter
			ref_wholetot++;
		}
	}
	
	var ref_mutualandonly_tot = ref_tot - refmutual;
	if (ref_mutualandonly_tot > 0) {
		hospitalityPercentage = hosted_surfed_with * 100 / ref_mutualandonly_tot;
	}
	var ref_left_tot = refpos_left + refneu_left + refneg_left + refinap_left;
	var ref_received_tot = refpos_received + refneu_received + refneg_received + refinap_received;
	if (ref_received_tot > 0) {
		refneg_percent = refneg_received * 100 / ref_received_tot;
	}
	// end of STATISTICS section
	
	
	// some final CLEANINGUP section
	if (hideCSStats) {
		d_ref = document.getElementById('ref');
		d_ref.innerHTML = s_DivTitle;
		d_ref.setAttribute('class','profile');
	}
	// end of final CLEANINGUP section
	
	
	// OUTPUT section
	// Preparing additional text
	if (onlyGraph && onMouseOverShow) {
		var txt = "<div id='statbox' onmouseover='document.getElementById(\"morestats\").style.display=\"block\";' onmouseout='document.getElementById(\"morestats\").style.display=\"none\";' style='border: 1px solid #AAAAAA;background-color:rgb(255,255,179);padding: 5px;font-size: smaller;width: 630px;margin-bottom: 10px;position: relative'>";
	} else {
		var txt = "<div id='statbox' style='border: 1px solid #AAAAAA;background-color:rgb(255,255,179);padding: 5px;font-size: smaller;width: 630px;margin-bottom: 10px;position: relative'>";
		if (!onlyGraph && !scriptCompiler) {txt = txt + s_Colophon;}
	}
	if (ref_tot > 0) {
		txt = txt + "<font style='font-weight:bold;font-size:larger'>" + s_DivTitle1 + ref_tot + s_DivTitle2 + s_ShowAll + "</font><br>";
		txt = txt + "<div style='float:left;margin:2px 0 0 0'><div style='float:left;margin-top:-10px;left:7px;position:absolute'>" + ref_received_tot + " " + s_Received.toLowerCase() + "</div>";
		txt = txt + "<div id='ref_graphcontainer_received' style='float:right;border: 1px solid #ccc;width: 304px;height: 12px;padding:1px;background: white;margin-top:3px' title='" + s_GraphRTitle + "'>";
		var sqrt_receivedtot = Math.round(Math.sqrt(refpos_received)) + Math.round(Math.sqrt(refinap_received)) + Math.round(Math.sqrt(refneg_received)) + Math.round(Math.sqrt(refneu_received));
		var percentage = Math.round(Math.sqrt(refpos_received)) * 100 / sqrt_receivedtot;
		txt = txt + "<div style='float:left;width: " + percentage + "%;background-color: #008000;height: 12px;text-align:center;color:white' title='" + refpos_received + " " + s_Positives.toLowerCase() + "'>" + ((percentage > 2) ? refpos_received : "") + "</div>";
		percentage = Math.round(Math.sqrt(refinap_received)) * 100 / sqrt_receivedtot;
		txt = txt + "<div style='float:right;width: " + percentage + "%;background-color: purple;height: 12px;text-align:center;color:white' title='" + refinap_received + " " + s_Inappropriates.toLowerCase() + "'>" + ((percentage > 2) ? refinap_received : "") + "</div>";
		percentage = Math.round(Math.sqrt(refneg_received)) * 100 / sqrt_receivedtot;
		txt = txt + "<div style='float:right;width: " + percentage + "%;background-color: red;height: 12px;text-align:center;color:black' title='" + refneg_received + " " + s_Negatives.toLowerCase() + "'>" + ((percentage > 2) ? refneg_received : "") + "</div>";
		percentage = Math.round(Math.sqrt(refneu_received)) * 100 / sqrt_receivedtot;
		txt = txt + "<div style='float:right;width: " + percentage + "%;background-color: #cccccc;height: 12px;text-align:center;color:black' title='" + refneu_received + " " + s_Neutrals.toLowerCase() + "'>" + ((percentage > 2) ? refneu_received : "") + "</div>";
		txt = txt + "</div></div>";
		txt = txt + "<div style='float:right;margin:2px 0 0 0'><div id='ref_graphcontainer_left' style='float:left;border: 1px solid #ccc;width: 305px;height: 12px;padding: 1px;background: white;margin-top:3px' title='" + s_GraphLTitle + "'>";
		var sqrt_lefttot = Math.round(Math.sqrt(refpos_left)) + Math.round(Math.sqrt(refinap_left)) + Math.round(Math.sqrt(refneg_left)) + Math.round(Math.sqrt(refneu_left));
		percentage = Math.round(Math.sqrt(refpos_left)) * 100 / sqrt_lefttot;
		txt = txt + "<div style='float:left;width: " + percentage + "%;background-color: #008000;height: 12px;text-align:center;color:white' title='" + refpos_left + " " + s_Positives.toLowerCase() + "'>" + ((percentage > 2) ? refpos_left : "") + "</div>";
		percentage = Math.round(Math.sqrt(refinap_left)) * 100 / sqrt_lefttot;
		txt = txt + "<div style='float:right;width: " + percentage + "%;background-color: purple;height: 12px;text-align:center;color:white' title='" + refinap_left + " " + s_Inappropriates.toLowerCase() + "'>" + ((percentage > 2) ? refinap_left : "") + "</div>";
		percentage = Math.round(Math.sqrt(refneg_left)) * 100 / sqrt_lefttot;
		txt = txt + "<div style='float:right;width: " + percentage + "%;background-color: red;height: 12px;text-align:center;color:black' title='" + refneg_left + " " + s_Negatives.toLowerCase() + "'>" + ((percentage > 2) ? refneg_left : "") + "</div>";
		percentage = Math.round(Math.sqrt(refneu_left)) * 100 / sqrt_lefttot;
		txt = txt + "<div style='float:right;width: " + percentage + "%;background-color: #cccccc;height: 12px;text-align:center;color:black' title='" + refneu_left + " " + s_Neutrals.toLowerCase() + "'>" + ((percentage > 2) ? refneu_left : "") + "</div>";
		txt = txt + "</div><div style='float:right;margin-top:-10px;right:7px;position:absolute'>" + + ref_left_tot + " " + s_Left.toLowerCase() + "</div></div><br style='clear:both'>";
	
		if (!onlyGraph || (onlyGraph && onMouseOverShow)) {
			var refleft_percentage = (ref_left_tot - refmutual) * 100 / ref_mutualandonly_tot;
			if (refleft_percentage == 0) {refleft_percentage = '';} else {refleft_percentage =  " (" + cleanPercentage(refleft_percentage) + "%)";}
			var refmutual_percentage = refmutual * 100 / ref_mutualandonly_tot;
			if (refmutual_percentage == 0) {refmutual_percentage = '';} else {refmutual_percentage =  " (" + cleanPercentage(refmutual_percentage) + "%)";}
			var refreceived_percentage = (ref_received_tot - refmutual) * 100 / ref_mutualandonly_tot;
			if (refreceived_percentage == 0) {refreceived_percentage = '';} else {refreceived_percentage =  " (" + cleanPercentage(refreceived_percentage) + "%)";}
			if (onlyGraph && onMouseOverShow) {txt = txt + "<div id='morestats' style='display:none'>";}
			txt = txt + "<div style='margin:4px 0 0 0'>" + s_RefReceived + " = <b>" + (ref_received_tot - refmutual) + "</b>" + refreceived_percentage + " | ";
			txt = txt + s_RefMutual + " = <b>" + refmutual + "</b>" + refmutual_percentage + " | ";
			txt = txt + s_RefLeft + " = <b>" + (ref_left_tot - refmutual) + "</b>" + refleft_percentage + "</div>";
		
			txt = txt + "<div style='margin:2px 0 0 0'><img src='" + pic_hosted + "' alt='" + s_Hosted + "' title='" + s_Hosted + "' style='width:14px;height:14px;margin:0 1px -2px 0'> = <b>" + hosted + "</b>";
			if (days_hosted > 0) {txt = txt + " (" + days_hosted + "<sup><span title='" + s_Days + "'>" + s_ShortDays + "</span></sup>)"};
			txt = txt + " | <img src='" + pic_surfed + "' alt='" + s_Surfed + "' title='" + s_Surfed + "' style='width:14px;height:14px;margin:0 0 -2px 0'> = <b>" + surfed_with + "</b>";
			if (days_surfed > 0) {txt = txt + " (" + days_surfed + "<sup><span title='" + s_Days + "'>" + s_ShortDays + "</span></sup>)"};
			txt = txt + " | <img src='" + pic_traveledwith + "' alt='" + s_Traveled + "' title='" + s_Traveled + "' style='width:14px;height:14px;margin:0 0 -2px 0'> = <b>" + traveled_with + "</b>";
			if (days_traveled > 0) {txt = txt + " (" + days_traveled + "<sup><span title='" + s_Days + "'>" + s_ShortDays + "</span></sup>)"};
			txt = txt + " | <img src='" + pic_metinperson + "' alt='" + s_MetInPerson + "' title='" + s_MetInPerson + "' style='width:14px;height:14px;margin:0 1px -2px 0'> = <b>" + met_in_person + "</b> | ";
			txt = txt + "<img src='" + pic_metonline + "' alt='" + s_NotMetInPerson + "' title='" + s_NotMetInPerson + "' style='width:14px;height:14px;margin:0 1px -2px 0'> = <b>" + not_met_in_person + "</b> | ";
			var friends_percentage = friends_reftot * 100 / ref_mutualandonly_tot;
			if (friends_percentage > 0) {friends_percentage = " (" + cleanPercentage(friends_percentage) + "%)";} else {friends_percentage = "";}
			txt = txt + "<img src='" + pic_friends_s + "' alt='" + s_FriendsLabel + "' title='" + s_FriendsLabel + "' style='width:14px;height:14px;margin:0 1px -2px 0'> = <b>" + friends_reftot + "</b>" + friends_percentage;
			if (ref_wholetot > ref_tot) {
			 	txt = txt + " | <img src='" + pic_fake + "' alt='" + s_Fake + "' title='" + s_Fake + "' style='width:14px;height:14px;margin:0 1px -2px 0'> = <b>" + (ref_wholetot - ref_tot) + "</b>";
			}	 
			txt = txt + "</div>";
			if (refmutual > 0) {
				var percentage = mutualcheck_matchingtot * 100 / refmutual;
				percentage = ((percentage == 0) ? "<span style='background-color:red;padding:1px 3px 1px 3px;border:1px solid #ccc;height:12px' title='&gt;5%'>" : "<span>") + "<b>" + cleanPercentage(percentage) + "</b>%</span>";
			} else {
				var percentage = '<b>?</b>';
			}
			txt = txt + "<div style='margin:2px 0 0 0'>" + s_HospitalityPercentage + " = " + ((hospitalityPercentage == 0) ? "<span style='background-color:red;padding:1px 3px 1px 3px;border:1px solid #ccc;height:12px' title='&gt;5%'>" : "<span>") + "<b>" + cleanPercentage(hospitalityPercentage) + "</b>%</span> | ";
			txt = txt + "<span style='color:darkred'>" + s_Negatives + "</span><sup><span title='" + s_Received + "'>" + s_ShortReceived + "</span></sup> = " + ((refneg_percent > 5) ? "<span style='background-color:red;padding:1px 3px 1px 3px;border:1px solid #ccc;height:12px' title='&gt;5%'>" : "<span>") + "<b>" + cleanPercentage(refneg_percent) + "</b>%</span> | ";
			txt = txt + s_RefReliability + " = " + percentage + "</div>";
			if (onlyGraph && onMouseOverShow) {txt = txt + "</div>";}
		}
	} else {
		// check: is there a problem with the script?
		if (ref_wholetot > 0) {
			txt = txt + "<b>" + s_StatsError + "</b>";
		} else {
			txt = txt + "<b>0 " + s_DivTitle2 + "</b>";
		}
	}
	txt = txt + "</div>";
	
	// Adds additional text to the page
	header.innerHTML = txt + header.innerHTML;
	
	// Adds icons and info
	txt = " <img src='" + pic_languages + "' alt='" + s_Languages + "' title='" + s_Languages + "' width='32' height='32' hspace='1' border='0'><sub>" + languages_num + "</sub>";
	if (visitedcountries_num > 0) {
		txt = txt + " <img src='" + pic_countries + "' alt='" + s_Countries + "' title='" + s_Countries + "' width='32' height='32' hspace='1' border='0'><sub>" + visitedcountries_num + "</sub>";
	}
	if (showIcons) {
		if (groups_tot > 0) {
			txt = txt + " <img src='" + pic_groups + "' alt='" + s_GroupsLabel + "' title='" + s_GroupsLabel + "' width='32' height='32' hspace='1' border='0'><sub>" + groups_tot + "</sub>";
		}
		if (friends_tot > 0) {
			txt = txt + " <img src='" + pic_friends + "' alt='" + s_FriendsLabel + "' title='" + s_FriendsLabel + "' width='32' height='32' hspace='1' border='0'><sub>" + friends_tot + "</sub>";
		}
	}
	iconbox.innerHTML = iconbox.innerHTML + txt;
	// end of OUTPUT section
	}
})();	// this row increases compatibility with Opera;do not remove