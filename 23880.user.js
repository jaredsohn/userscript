// ==UserScript==
// @name		BitSoup.org - QuickThanks!
// @namespace	http://www.bitsoup.org
// @version 	1.2
// @description Provides a quick "Thank the uploader" button."
// @include		http://*bitsoup.org/details.php*
// ==/UserScript==


// !! FIREFOX + GREASEMONKEY USERS 
//When the script is first accessed, it will prompt you for what you want the default message to be for your thank you message,
//if you want to change it, go to about:config in your firefox location bar, search for "thanks" and you'll be able to alter the messae there. 
//You can also call up the prompt again by holding shift+cntl+alt and pressing the letter "T" on your keyboard. 


// !! SAFARI + GREASEKIT USERS
//Greasekit does not save prefs like greasemonkey does, so you have to
//hardcode your message into the script.


//If you have any issues, please PM me (bdelcamp) on bitsoup.org.


//<!------- BEGIN USER CONFIG ---------->//

/*Edit your message here. (Make sure not to use quotation marks)*/
var safariThanksMessage = "Thanks Uploader!";

//<!------- DO NOT EDIT BELOW THIS LINE ----------->//





//<!------- GREASEKIT COMPATABILITY FUNCTIONS --------->//

if(typeof GM_xmlhttpRequest === "undefined") {
	GM_xmlhttpRequest = function(/* object */ details) {
		details.method = details.method.toUpperCase() || "GET";
		
		if(!details.url) {
			throw("GM_xmlhttpRequest requires an URL.");
			return;
		}
		
		// build XMLHttpRequest object
		var oXhr, aAjaxes = [];
		if(typeof ActiveXObject !== "undefined") {
			var oCls = ActiveXObject;
			aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Microsoft.XMLHTTP"};
			aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP"};
			aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP.3.0"};
		}
		if(typeof XMLHttpRequest !== "undefined")
			 aAjaxes[aAjaxes.length] = {cls:XMLHttpRequest, arg:undefined};
	
		for(var i=aAjaxes.length; i--; )
			try{
				oXhr = new aAjaxes[i].cls(aAjaxes[i].arg);
				if(oXhr) break;
			} catch(e) {}
		
		// run it
		if(oXhr) {
			if("onreadystatechange" in details)
				oXhr.onreadystatechange = function() { details.onreadystatechange(oXhr) };
			if("onload" in details)
				oXhr.onload = function() { details.onload(oXhr) };
			if("onerror" in details)
				oXhr.onerror = function() { details.onerror(oXhr) };
			
			oXhr.open(details.method, details.url, true);
			
			if("headers" in details)
				for(var header in details.headers)
					oXhr.setRequestHeader(header, details.headers[header]);
			
			if("data" in details)
				oXhr.send(details.data);
			else
				oXhr.send();
		} else
			throw ("This Browser is not supported, please upgrade.")
	}
}

if(typeof GM_addStyle === "undefined") {
	function GM_addStyle(/* String */ styles) {
		var oStyle = document.createElement("style");
		oStyle.setAttribute("type", "text\/css");
		oStyle.appendChild(document.createTextNode(styles));
		document.getElementsByTagName("head")[0].appendChild(oStyle);
	}
}

if(typeof GM_log === "undefined") {
	function GM_log(log) {
		if(console)
			console.log(log);
		else
			alert(log);
	}
}
//<!------- END GREASEKIT FUNCTIONS --------->//

//usage getElementsByClassName(class name, tag name, parent)
function getElementsByClassName(strClass, strTag, objContElm) {
  strTag = strTag || "*";
  objContElm = objContElm || document;    
  var objColl = objContElm.getElementsByTagName(strTag);
  if (!objColl.length &&  strTag == "*" &&  objContElm.all) objColl = objContElm.all;
  var arr = new Array();                              
  var delim = strClass.indexOf('|') != -1  ? '|' : ' ';   
  var arrClass = strClass.split(delim);    
  for (var i = 0, j = objColl.length; i < j; i++) {                         
    var arrObjClass = objColl[i].className.split(' ');   
    if (delim == ' ' && arrClass.length > arrObjClass.length) continue;
    var c = 0;
    comparisonLoop:
    for (var k = 0, l = arrObjClass.length; k < l; k++) {
      for (var m = 0, n = arrClass.length; m < n; m++) {
        if (arrClass[m] == arrObjClass[k]) c++;
        if ((delim == '|' && c == 1) || (delim == ' ' && c == arrClass.length)) {
          arr.push(objColl[i]); 
          break comparisonLoop;
        }
      }
    }
  }
  return arr; 
}


var BSQuickThanks =
{
	
	
	
	thanksButton :	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAbCAYAAAA3d3w1AAAAGXRFWHRTb2Z0d2Fy' +
	'ZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAzNJREFUeNrsWEtrE1EUnjtNmmi0qSsr' +
	'ptiFC/MTIgiConYliovErKIkIjQoCEJLIYXgQkIWbrrpooILi0YQkbrUjQRf2wgK' +
	'EqVu3IQmbWImL78zvRPujDPJVItOQg98nMecc+/95j7mwTqdjjSMIktDKmw7M5bL' +
	'5Zgsy1Kr1XLeDMkyGxkZYcSJ7L7EVlZWmJNnxuVyqbxAilYfszNjHkVRPLjug33b' +
	'7XZP404chr3HYdyIQBtocb1F2Gx5UnK9XidS1zwezwxjrIzYW6AAfBmELWY2Y57l' +
	'5WUlGo3ewyydAanniL0atMPDOGOupaUlxefzHQCp0yB1B7Hvg3gq6ogtLi626ESJ' +
	'RCIfQOo+Qp+32V4eCP3hWHa0VvccazabUiwWuwtSP+A+BWoWyJuA4lI8Hj/Zo64X' +
	'7NTm7dbqiCUSif1YgudgvgR+9sCxcDh8i2pIc5wiv1KpKH1qrWCnVuL99K3tLsVM' +
	'JsOSySQ96CbhvtYKejzfnkBly+VyY3V19RkPZxHPkgamhPQi11MGX4xJ1Bbvt8jj' +
	'v+UJOToxxrvE6G2Cn5B7gY/9iGlSKpV0DYZCoevqos/naVATPDyB+AUxZpbH2yoK' +
	'+d08yDT5xv6sxqGSIaTTaVatVsdg14FJYNwGOsFg8KqFr7M14TGzPE3GjW326M8y' +
	'LoszxqUKHAEUG6Al0LLwNbsE+AKBQEyImeVJPKdUKBQeCm36eBuqbejPahxKdymm' +
	'UqlOrVYjgt/w3nUcoTd2liI2bROqYeZze5Q6WltbE6+b5enyBa2K3++/uL6+/gDt' +
	'jNoZh+5UpCXZaDRewDzLkyyBRwKB0Z3ittHX2ZDLBB7rXqPXH363Na3GIJe47tYJ' +
	'ceN4JKF2C9oeI8zOzrKNjY1DmLVP8KPiNSOMe/Q/gwYU0Y3PmLS5uTkG3Gy32+/g' +
	'H+1H7K9fzXeInJGY6WcLnY6Y8gWv13sCOoPQo6H5giZyUFdAbgYP7a+wHwPvORz/' +
	'y6PnFzTtufn5+QmckjfwXXYes3cQ4X0O/NDUTsS27X8ec3NzzMl/snCz6eWd4Uxg' +
	'dn8NmJKkhtCI4wjyMakELQ+P3f+Ku8T+vfwSYACfgJP3gYRm+gAAAABJRU5ErkJg' +
	'gg==',

	commentButton :	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAbCAYAAAA3d3w1AAAAGXRFWHRTb2Z0d2Fy' +
	'ZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuhJREFUeNrsWD2IE0EU3kk2G8zBpfUw' +
	'kMbiSKVgYaxECwl3WgUveDYpUlxAFAOSlIGQQMBOEJtcEcMFixRBoghiYZHWKh5W' +
	'IhFSiflZk7hJxvd0ViZzm03iwbkbbuBj3rw3M/u+fTNvZ5ZQSqVVLA5pRYtcrVZd' +
	'k8kEw0bH4zFlsqWK0+mUwC8pHA4v7BupVCoK10ZyE6gno9HI0hGJRCKmJAnssZ6w' +
	'NJ2sJhbigSQGELWvmqa9AjlPCFEVRekwP6kRsds22DJnABuAAOAi+Lw+HA6fALln' +
	'brfbkBwS27ZhbriKfkP03pRKpfvRaNQwYtdsmvjOge8piFyhWCw+jsViRyJ22cZZ' +
	'/Tr4HwNywUKh0IrH43/JyYA+1/EDJ1+wAbGXsM9uAR5CFn809R3DbMPkQ8AmpNEt' +
	'bJTLZSS5+Z8dP1zAh3cul2tLJCZBKP30T/GHQqF7rO0X2nrxC236j/ZFxswaJ+Im' +
	'4Hs+nycIPCIiHHrEgsFgqFarvWDt32Dtz4CzYN9jst5/j9Mta19kDK8L8X4J+Ajw' +
	'QIaU4HAx9UEeotButzUmi5ACgcB2vV4v67Len9cta4fSAt1TszGCbmgCPDFJ/GkJ' +
	'99hPwFqj0VChPuBWKbbXUOh0OmPWT5eNdEvZfT5fVNws8+aZUfyAH0jK4XBMEdOY' +
	'rAgTKF6vdwfemNJsNlG/j7put7uDRqhH+lgDeZ5dn1Pinr1v0q9kQuwKROsLRiyd' +
	'TlN+KWocIHOSOwxhIPVc0Os6wt6kNkOeZz/yrDn9woKfPG7g+ZHfX3pWPBEc+xRs' +
	'PO8uEPrU6/U2UqkU4W3Exjfo8+D7Qb/fx2Va8Hg8nVW4Qe8iqcFg8N6I1IkuxWNi' +
	'HXAJkAC8xeWnquqDZDJJZo3BrPhNiKCLZUurXTRVzH6QKF5DfTeTybRyuRydedFM' +
	'JBIyPwF8C6gsy9TKew+ypJTNZk0dRFIUOyIhRkyyGindp3lkxPvY6X/FU2IWKL8E' +
	'GACaFL/vAy8B9AAAAABJRU5ErkJggg==',

	thanksMessage : '',


	isGreaseMonkey:function(){
		GM_log("Checking for webKit");
			if(typeof GM_setValue === "undefined") {
		GM_log("Running on GreaseKit");
			return false;
		}else{
			GM_log("Running on GreaseMonkey");
			return true;
		}
	},
	

	
	run: function(){
			if(this.loadSettings()){
				this.addForms();
				this.attachEvents();
			}
	},
	
	
	loadSettings: function(){
		if(this.isGreaseMonkey()){
	    	this.thanksMessage = GM_getValue('thanksMessage', '');
		    if (!this.thanksMessage) this.setMessage();
		    
		}else{
			this.thanksMessage = safariThanksMessage;
		}
		return !!this.thanksMessage;
	  },

	setMessage: function()
	  {
	    var text =
	      "Please enter your personal message for thanking the uploader.\n\n" +
	      "This message will be entered automatically when you click the Thanks button.";
	    BSQuickThanks.thanksMessage = prompt(text);
	    if (BSQuickThanks.thanksMessage) GM_setValue('thanksMessage', BSQuickThanks.thanksMessage);
	  },

	attachEvents: function()
	  {
	    window.addEventListener('keypress', this.keyPress, false);
	  },

	keyPress: function(event)
	  {
	    if (event.ctrlKey && event.altKey && event.shiftKey && (event.which == 84)) {
	      BSQuickThanks.setMessage();
	    }
	  },
	
	addForms: function()
	{
		var url_vars = window.location.href.split("?")[1];
		var torrent_id = url_vars.match(/id=([^(\&|$)]*)/)[1];


		var thanksForm = 
		'<form name="addThanksForm" action="http://bitsoup.org/comment.php?action=add" method="post">\n' +
			'<input type="hidden" value="' + torrent_id + '" name="tid"></input>\n' +
			'<input type="hidden" name="text" value="'+this.thanksMessage+'"></input>\n' +
			'<input type="image" name="Thanks" src=' + this.thanksButton + ' value="Send Thanks" /><a href="http://bitsoup.org/comment.php?action=add&tid=' + torrent_id + '"><img src="'+ this.commentButton +'" border="0"></a>\n' +
		'</form>'; 

		var commentForm = 
		'<div id="commentBox"> <span class="title">Leave a comment for this torrent...</span>\n' +
		'<form name="addCommentForm" action="http://bitsoup.org/comment.php?action=add" method="post">\n' +
			'<input type="hidden" value="' + torrent_id + '" name="tid"></input>\n' +
			'<input type="text" name="text" />'

		'</div>';
		 
		var addCommentLink = getElementsByClassName('index', 'a')[1].parentNode;
		addCommentLink.innerHTML = addCommentLink.innerHTML.replace(addCommentLink.innerHTML, thanksForm);
		var addCommentLink = getElementsByClassName('index', 'a')[1].parentNode;
		addCommentLink.innerHTML = addCommentLink.innerHTML.replace(addCommentLink.innerHTML, thanksForm);
		
	},
	
	
}

BSQuickThanks.run();

