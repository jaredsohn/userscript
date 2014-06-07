// ==UserScript==
// @name           Show Me The Resources!
// @description    Lists all domains from which content is loaded on a particular website
// @version        Release 2
// @author         Brian Hartvigsen
// @namespace      smtr-no-an-email@brianandjenny.com
// ==/UserScript==

// jQuery For Chrome -- https://gist.github.com/437513
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	if (typeof jQuery === "undefined") {
 		var script = document.createElement("script");
		script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	} else {
		(callback)();
	}
}

// load jQuery and execute the main function
addJQuery(main);

function main() {
	/* prototypes for extra functionality */
	jQuery.url=function(){var segments={};var parsed={};var options={url:window.location,strictMode:false,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var parseUri=function(){str=decodeURI(options.url);var m=options.parser[options.strictMode?"strict":"loose"].exec(str);var uri={};var i=14;while(i--){uri[options.key[i]]=m[i]||""}uri[options.q.name]={};uri[options.key[12]].replace(options.q.parser,function($0,$1,$2){if($1){uri[options.q.name][$1]=$2}});return uri};var key=function(key){if(!parsed.length){setUp()}if(key=="base"){if(parsed.port!==null&&parsed.port!==""){return parsed.protocol+"://"+parsed.host+":"+parsed.port+"/"}else{return parsed.protocol+"://"+parsed.host+"/"}}return(parsed[key]==="")?null:parsed[key]};var param=function(item){if(!parsed.length){setUp()}return(parsed.queryKey[item]===null)?null:parsed.queryKey[item]};var setUp=function(){parsed=parseUri();getSegments()};var getSegments=function(){var p=parsed.path;segments=[];segments=parsed.path.length==1?{}:(p.charAt(p.length-1)=="/"?p.substring(1,p.length-1):path=p.substring(1)).split("/")};return{setMode:function(mode){strictMode=mode=="strict"?true:false;return this},setUrl:function(newUri){options.url=newUri===undefined?window.location:newUri;setUp();return this},segment:function(pos){if(!parsed.length){setUp()}if(pos===undefined){return segments.length}return(segments[pos]===""||segments[pos]===undefined)?null:segments[pos]},attr:key,param:param}}();

	Array.prototype.find=function(searchStr){var returnArray=false;for(i=0;i<this.length;i++){if(typeof(searchStr)=='function'){if(searchStr.test(this[i])){if(!returnArray){returnArray=[]}
	returnArray.push(i);}}else{if(this[i]===searchStr){if(!returnArray){returnArray=[]}
	returnArray.push(i);}}}
	return returnArray;}

	/* all the magic happens down here */
	var css = {background: 'white', position:'absolute', zIndex: 999, padding: ".1em", border: '1px solid black'};
	var domains = [];

	// all elements not loaded from this server
	$("[src^='http://']").each(function(idx, el) {
	    var host = $.url.setUrl(el.src).attr("host");
	    $('body').append($('<div>' + host + '</div>').css(css).offset($(el).offset()));
    
	    if (domains.find(host) === false) {
	        domains.push(host);
	    }
	});

	var div = $('<div></div>').css($.extend({}, css, {zIndex: 1000})).html(domains.join("<br>"));
	$('body').prepend(div);
	div.offset({top: 0, left: $('body').innerWidth() - div.width() - 10});
}
