// ==UserScript==
// @name           Facebook App direct redirection
// @namespace      facebook.app.redirection
// @include        /^https?://www.facebook.com/connect/uiserver.php.*?/
// /^https?://www.facebook.com/connect/uiserver.php.*&method=permissions.request.*?/
// /^https?://www.facebook.com/(connect/uiserver|dialog/(feed|apprequests)).*?/
// ==/UserScript==

function URL(url){
	this.path;
	this.fields;
	this.hash;
	this.parse(url);
}
URL.prototype.parse = function(url){
	var hashIndex = url.indexOf("#");
	var urlWithoutHash;
	if(hashIndex >= 0){
		urlWithoutHash = url.substring(0, hashIndex);
		this.hash = url.substring(hashIndex);
	}else{
		urlWithoutHash = url;
		this.hash = "";
	}
	
	var querySepIndex = urlWithoutHash.indexOf("?");
	var path, queryString;
	if(querySepIndex >= 0){
		this.path = urlWithoutHash.substring(0, querySepIndex); 
		queryString = urlWithoutHash.substring(querySepIndex + 1);
	}else{
		this.path = urlWithoutHash;
	}
	
	this.fields = {};
	if(queryString){
		var fieldsString = queryString.split("&");
		var field, equalIndex;
		for(var i = 0, length = fieldsString.length; i < length; i++){
			field = fieldsString[i];
			equalIndex = field.indexOf("=");
			if(equalIndex >= 0)
				this.fields[field.substring(0, equalIndex)] = field.substring(equalIndex + 1);
			else
				this.fields[field] = "";
		}
	}
}
URL.prototype.toString = function(){
	var fieldsString = [], value;
	for(var field in this.fields){
		value = this.fields[field];
		fieldsString.push(field + (value ? "=" + value : ""));
	}
	var queryString = fieldsString.join("&");
	return this.path + (queryString ? "?" + queryString : "") + (this.hash ? "#" + this.hash : "");
}

var currentURL = new URL(document.location.toString());
var redirectURIString = currentURL.fields.redirect_uri;
if(redirectURIString){
	var redirectURL = new URL(decodeURIComponent(redirectURIString));
	var filteredFields = {};
	for(var field in redirectURL.fields){
		if(field.length <= 3 || field.substr(0, 3) != "fb_")//not start with fb_
			filteredFields[field] = redirectURL.fields[field];
	}
	redirectURL.fields = filteredFields;
	document.location = redirectURL.toString();
}