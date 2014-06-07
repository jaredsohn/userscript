// ==UserScript==

// @name           cz_adv_browse
// @namespace      http://userscripts.org/users/93551
// @include        *lolthai*/browse.php*
// @include        *madoomee*/browse.php*

// ==/UserScript==

var APP_NAME = "ADV_BROWSE"
var VERSION = "0.5.8";
var ID_PREFIX = APP_NAME + "_" + VERSION + "_";
var waitTime = 1000;
var service_server = 'http://lolthai-ext.appspot.com/browse/';
var default_thx_text = 'Thank you';
var thx_icon = '<img style="border:none" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGkSURBVDjLrZJPKINhHMd3UsrJTcpBDi6UC+3ookQ5OOBAaCh2cFQ40GqTzURTihI54DRp8dqBg3BQw5BtNmxe/4flT9re5+v3vJvF2l6Kp749Pe/7fj7P7/09jwqA6i9R/ZugVr+cSZmlvFOgEIGSl0xgnVt3IRyRoDSWtn1c4qakxQW0yKBEJMbw+MpwHWIQnxgCDwxnQQbvHYP7RoLnJirvntrkkuKvghytZU1+eUWg+MjgJ/j0nuEkBh9dSTgQo4KB+R0uqEgquCD4PBiDbxlc11HYSfBuILUg/gu8fB/t6rmVcEzw4aWEfYIdAS6IyILe6S0uUCdtIpd8Hbwah1+SxQlNTE91jJHPI5tcPoiLrBsL6BxrQOtQFep0pc/lXYU9P14kkngugy/onxlF30ITlpwWOEQB5tV21JgLUNKRZVSCTeM2J6/kuV5fFrbuD8N6OCJXY7S3wGxv44K3VHAuxUvR8HVldxFszolvvVncs3DB7+67Wpv9Nig0Qy80yrB+pVG5gsTQh7pqYz5Mgkbemc98rdiDJBIDJcTLjs0G/vwDCw/6dFwBuzsAAAAASUVORK5CYII="/>';
var book_icon = '<img style="border:none" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAIPSURBVDhPjZPbTxNBFIf792k0NlZFMTSBtBGrXOyDVaqlTalQ6IXS4tIWeqFbXLCkalAxYBHsXrrdhRiTvmiMRsITMT75QvLzdAtNipPIJiezs5nvO2dn5phMx8%2F1rpyDAmeN8%2BeiOGFNBEWaYDxex68%2F%2BG9Udr7gtACp5F4r5nbBcToSJJuJ1RAOSQhO7CDg%2FwDv6CbcI%2BtGon8EznvbGB6qYLmsQ1jVUVzRUHimIcfXsbCoIp2pg0urcN1%2FzRYMD21hcGADQknDEsGLx3AmryKVUcGlVCSe1uB0vmILBgc2ccexDn5Fb8Nv33%2FtgGMJhZKU2YK7BN%2B%2BtYbCkoYslT2fq%2BPg9xGNtB9cDdNx2o9pBY7%2BElvQT7DN9hLZAv0zwaJ2gEM6kb3GIZWvIRyVMRmSYbcvswV22wv09Zawrfw0wNNRqe5TJbu0psgW9PWuwmoVkJxXkS9%2B6hDwQgPj4xLGAhKsPQW2wNoj4GY3j9mkiuflhiHYEveN8c3GD%2FgJ9vpEWpNnC7pv8Oi6lsXMrIK1d99oLz4jOCXT0ek0%2Fw6fT8KoR6SrnmULmrDFkkI0pmAqIiM4KeMJle33U2avCA%2FBj9xVXL2ywBZYLqdhNnMIhRVMEBxowmMSZW7BboIfPqiiuY55lc2XOFy8EDfgdmYq2%2FOY4BGR4I9wuVqCZh909AJNIicfzzK225he%2FgIkcGZiH8rG9gAAAABJRU5ErkJggg%3D%3D"/>';
var down_icon = '<img style="border:none" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAK2SURBVDhPlZNLTBNRFIbHGBeEGBcmLiRN1OATY1yZuHDnFiNKdOFKjSEslKQtnbZR6BtbA6UgIJWXBYtQalMhUN4VoQFEQCZQEvqC0rForIiovMzv3CFUTWDhTf65k%2FP4zrn35FLUDutMzW6cMCTimHIfkqX7ee0Uu639tHkPsrxpcR3OOrAzICMjQ24qMsNoqoOp2AprfTO2AGnuFBARAPE%2Fyq%2BBSl0ILkcRr%2FwgR%2BeanYvC3f8RQ%2B%2B%2BYWMD2wJGJ1bQ4gqg8eUYZHK1m4PsorhPQkmpJRiLLYOsU8YEHNfuxcn8BL79rQ6Srh7BwdRkXjYHA73BHOZyEwngaKPNtfJ1aR1ra8BTxoALFkH87ARwsTUJ5%2B2JOHRbAHFZHuzOKTwua1rlclMIILW9YwifvwAzAeD7D6DsrR7nigVI7zv7J%2FmWACKzGs1tfrxomkBFVRu5h2sEQHsGpxBbBAJzwBizCl8QUNny%2BIpblSXlerR2hLjqXjTYGTyrcxOAnBKJZdXdr0N4P7mODwvA7DzgnQEY7y9IKnU8JPuJHr1vFtDWOcsDKmo8qLUOQCiSWSmVpmCkzxPF8Ogy2OgmIBQG%2FCFg2gfIKwt4OPG%2FHvgEV9ccPwm7k0FOroGh1JqigM0xgfbuMN8iCejomUeXm0VP3%2BZoyd7ZG%2BE7eNXq4%2FW8YQRKtSlIKZSF%2FhaXD9dvKHEn0wit3gFr4zg8w4sIs%2BBtf4sAbY5JGAqcUGmK%2FFSu0hh1dQZx6YoUl9PlkN63oLp2CP2DMf5ImXeL%2FxG54MGRJaSlS6HVlUQpmlaM19V7oM93QigxQyKvQml5N9dukJvIT4ilFXHlquu547CospD4JtBSxTgZ4817WfS0UKxixRItm03rIhJpXoSWPdwU909snC8iytZEhGI1y%2B0sySG5%2F%2FVCtwv%2BDfaQQ4CqDmBaAAAAAElFTkSuQmCC"/>';
var wait_icon = '<img width=16 height=16 style="border:none" src="data:image/gif;base64,R0lGODlhFAAUAOMIAAAAABoaGjMzM0xMTGZmZoCAgJmZmbKysv///////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQBCgAIACwAAAAAFAAUAAAEUxDJSau9CADMteZTEEjehhzHJYqkiaLWOlZvGs8WDO6UIPAGw8TnAwWDEuKPcxQml0YnjzcYYAqFS7VqwWItWyuCQJB4s2AxmWxGg9bl6YQtl0cAACH5BAEKAA8ALAAAAAAUABQAAART8MlJq70vBMy15pMgSN72AMAliqSJotY6Vm8azxYM7tQw8IfDxOcDBYMS4o9zFCaXRiePRyBgDIZLtWrBYi1b66NQkHizYDGZbEaD1uXphC2XRwAAIfkEAQoADwAsAAAAABQAFAAABFPwyUmrvU8IzLXm0zBI3vYEwSWKpImi1jpWbxrPFgzuFEHwAMDE5wMFgxLij3MUJpdGJ49XKGAOh0u1asFiLVvrw2CQeLNgMZlsRoPW5emELZdHAAAh+QQBCgAPACwAAAAAFAAUAAAEU/DJSau9bwzMteYTQUje9gjCJYqkiaLWOlZvGs8WDO5UUfCBwMTnAwWDEuKPcxQml0Ynj2cwYACAS7VqwWItW+vjcJB4s2AxmWxGg9bl6YQtl0cAACH5BAEKAA8ALAAAAAAUABQAAART8MlJq72PEMy15lNRSN72DMMliqSJotY6Vm8azxYM7pRh8ALBxOcDBYMS4o9zFCaXRiePdzhgAoFLtWrBYi1b6wMAkHizYDGZbEaD1uXphC2XRwAAIfkEAQoADwAsAAAAABQAFAAABFPwyUmrva8UzLXmk2FI3vYQxCWKpImi1jpWbxrPFgzu1HHwg8HE5wMFgxLij3MUJpdGJ48HAGAEgku1asFiLVvrIxCQeLNgMZlsRoPW5emELZdHAAAh+QQBCgAPACwAAAAAFAAUAAAEU/DJSau9zxjMtebTcUje9hTFJYqkiaLWOlZvGs8WDO4UAPAEwsTnAwWDEuKPcxQml0YnjxcIYAaDS7VqwWItW+tDIJB4s2AxmWxGg9bl6YQtl0cAACH5BAEKAA8ALAAAAAAUABQAAART8MlJq73vHMy15hMASN72GMYliqSJotY6Vm8azxYM7lQQ8IXCxOcDBYMS4o9zFCaXRiePJxBgCIRLtWrBYi1b62MwkHizYDGZbEaD1uXphC2XRwAAOw=="/>';

// Greasemonkey value
var thx_val_name = 'thankyou_val'

//global variable
var timer_array = {};

function xpathFirst(p, c) {
  var doc = document;
  if( c && c.ownerDocument ){
    doc = c.ownerDocument;
  }
  return doc.evaluate( p, c||doc, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null ).singleNodeValue;
}

function $x(p,c) {
  var i, r = [], x=document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  while (i=x.iterateNext()) r.push(i);
  return r;
}

/* warper for get value */
function get_value(id, default_value){
	if(window.localStorage){
		var value = window.localStorage.getItem(ID_PREFIX+id);
		if(value){
			return value;
		}
	}else if(GM_getValue){
		return GM_getValue(ID_PREFIX+id, default_value);
	}else{
		return default_value;
	}
}

/* warper for save value */
function set_value(id, value){
	if(window.localStorage){
		window.localStorage.setItem(ID_PREFIX+id, value);
	}else if(GM_setValue){
		GM_setValue(ID_PREFIX+id, value);
	}
}

/* warper for http request */
function httpRequest(method, url, loadFunction, data, readyFunction){
	GM_xmlhttpRequest({
		method:method,
		url:url,
		headers:{
			"User-Agent":APP_NAME + "_" + VERSION,
			"Content-type":"application/x-www-form-urlencoded;",
			"Accept":"text/plain,text/xml",
		},
		data:data,
		onload:loadFunction,
		onreadystatechange:readyFunction,
	});
}

function thaiUrlEncode(input){	
	if (input == null || input == "")
		return '';
	
	input = input.replace(/\r\n/g,"\n");
	var output = '';
	for (var i = 0; i < input.length; i++ ){
		var chr = input.charCodeAt(i);
		var tempText = "";
		if (chr < 128)output += escape(String.fromCharCode(chr));
		else if((chr > 127) && (chr < 2048)) {
			tempText += String.fromCharCode((chr >> 6) | 192);
			tempText += String.fromCharCode((chr & 63) | 128);
			output += escape(tempText);
		} else {
			//convert utf-8 to tis-620
			tempText += String.fromCharCode(chr-3584 + 160);
			output += escape(tempText);
		}
	}
	return output;
}

function a(id, href, text, eventFunction){
	var atag = document.createElement("a");
	if(id!=null)atag.id = id
	if(href!=null)atag.href = href
	if(text!=null)atag.innerHTML = text;
	if(eventFunction!=null)for (var i in eventFunction)atag.addEventListener(i, eventFunction[i], false);	
	atag.setAttribute("onmouseover","this.style.cursor='pointer'");	
	return atag;
}

/* retrieve download url from CZ server*/
function getDownloadUrl(td, post){
	httpRequest("GET",td.getElementsByTagName('a')[0].href, 
		function(result) {
			if (result.status != 200) {
				return;
			}
			
			//use regex to search for chrome support
			var myRegexp = /<a class=\"index\" href=\"([^>]*\.torrent)\">/g;
			var match = myRegexp.exec(result.responseText);
			var torrent = match[1];
			td.appendChild(document.createTextNode(' '));
			td.appendChild(a('DL'+td.id, torrent, down_icon));
			
			//after load url from cz server send it to our server
			if(post)httpRequest("POST", service_server+"insert",'',"i="+td.id+"&u="+unescape(torrent));
		}
	);
}

function postComment(atag, id, popup){
	var comment_text = thaiUrlEncode(get_value(thx_val_name, default_thx_text));
	if(popup){
		//clear timer since it pops up
		delete timer_array[id];
		var temp = prompt("Please Enter Comment");
		while(temp  == null || temp  == ''){
			if(temp ==null)return;
				temp = prompt("Please Enter Anything");
		}
		comment_text = thaiUrlEncode(temp);
	}
	
	//	start post process
	httpRequest("POST", location.href.match(/(.*)\//g)[0]+"comment.php?action=add",
		function(result){
			atag.innerHTML = thx_icon;
			if (result.status != 200) {
				alert("Error posting comment");
				return;
			}
			alert("Comment Added");
		}
	,"tid="+id+"&text="+comment_text,
		function(result){
			if (result.readyState == 1) {
				atag.innerHTML = wait_icon;
			}
		}
	);
}

function main(){
	//find all link
	var allLink = $x('//form/table/tbody/tr/td[2]/a[1]')
	var submitStr = '';
	for (var i in allLink){
		
		var td = allLink[i].parentNode;
		var id = allLink[i].href.match("id=([0-9]*)")[1];
		td.setAttribute("id", id);		
		
		//add bookmark
		if(!xpathFirst('//a[@BM'+id+']')){
			td.appendChild(document.createTextNode(' '));
			td.appendChild(a('BM'+id, "bookmark.php?op=add&id="+id, book_icon));
		}
		
		//add Thank you
		if(!xpathFirst('//a[@THX'+id+']')){
			td.appendChild(document.createTextNode(' '));
			td.appendChild(a('THX'+id, null, thx_icon, 
			{ "click": function(ev){
				var id = this.parentNode.id;
				
				//already wait to run
				if(timer_array[id])return;
				
				//set timeout to popup
				timer_array[id] = setTimeout(postComment, 500, this, id, true);
				
			}, "dblclick": function(ev){
				//clear click timer
				var id = this.parentNode.id;
				if (timer_array[id]){
					clearTimeout(timer_array[id]);
					delete timer_array[id];
				}
				//set Greasemonkey value for the first time
				while(!get_value(thx_val_name)){
					var x = prompt("Please insert default comment value", default_thx_text);
					if(x==null)return;
					if(x!='')set_value(thx_val_name, x);
				}
				postComment(this,id);
			},}
			));
		}
		
		// gather id to ask server
		if(!xpathFirst('//a[@DL'+id+']')){
			submitStr = submitStr + id + ',';
		}
	}
	//remove last charactor
	submitStr = submitStr.slice(0, -1)

	
	//query data from server
	httpRequest("POST", service_server+"query",
		function(result) {
			// can't get server, get data from cz server
			if (result.status != 200) {
				ids = submitStr.split(",");
				for(var i in ids){
					window.setTimeout(getDownloadUrl, i*waitTime, document.getElementById(ids[i]));
				}
				return;
			}
			
			//	central server online, get JSON from server and change to javascript object
			var response = result.responseText;
			var myObj = eval('(' + response + ')');
			var notFound = 0;
			for (var i in myObj.t){
				var td = xpathFirst('//td[@id='+myObj.t[i].i+']');
				if(myObj.t[i].u){
					var front = myObj.t[i].u.match("(.*)\/[0-9]+\/")[0];
					var last = escape(myObj.t[i].u.match("\/[0-9]+\/(.*)")[1]);
					td.appendChild(document.createTextNode(' '));
					td.appendChild(a('DL'+id, front+last, down_icon));
				}else{
					notFound = notFound + 1;

					//not found this url in central server, request url from cz server
					window.setTimeout(getDownloadUrl, notFound*waitTime, td, true);
				}
			}
		},
		"t="+submitStr
	);	
}

main();