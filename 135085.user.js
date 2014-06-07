// ==UserScript==
// @name           redcrane186.blogspot.com
// @namespace      Wj
// @description    enhanceImg display overdrive img url
// @include        http://redcrane186.blogspot.com/*
// @include        http://redcrane186.blogspot.sg/*
// ==/UserScript==

var TRUE = true, FALSE = false, NULL = null, window = self;

function addJQuery(callback) {
	var removeObj = document.getElementsByTagName("script"),
		i = removeObj.length;
	if(i!==0){
	console.log("removeObj = "+removeObj.length)
	while(i--) removeObj[0].parentNode.removeChild(removeObj[0]);
	}
	var script = document.createElement("script");
	 script.setAttribute("id", "jQueryScript");
	 script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js");
	script.addEventListener("load", function() {
    var script = document.createElement("script"),
		style = document.createElement("style");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
	style.textContent = "#imageid{width:700px;}#col02 a.loadDone{background:#CC0099;border-radius: 6px 6px 6px 6px;box-shadow: 1px 1px 15px #888888;clear: both;float: left;margin: 15px;padding: 10px 10px 5px;}#col02 a.loadDone:hover{background:#ff0067;text-indent:0;}#about-box{clear:both;}#col01,#col02{margin-top:-40px;}span[dir*='ltr']{padding: 5px 7px;background:#ff0067;color:#fff}#col02 li{float:left;border:1px solid #D3D3D3;}#col02 li a{padding:5px 7px;}#col02 li a:hover{text-indent:0;}#sidebar,#Label1{clear:both;}";
	document.head.appendChild(style);
	}, false);
	document.body.appendChild(script);
	
}
function inject(){
/* Disable console.log */
 console.log = function(){}; 
/* */

/* */
var LS = {
	DOM_blog1 : $("<div />",{id:"main"}).append($("#Blog1").clone()),
	DOM_sideBar : $("<div />",{id:"sidebar","class":"sidebar"}).append($("#Label1").clone()),
	mainLoad : function(){
	console.log("script after remove = "+$("script").length);
	LS.workFlow();
	},	
	// Accepts a url and a callback function to run.
	requestCrossDomain: function( site, xpath, callback ) {

		// If no url was passed, exit.
		if ( !site ) {
			alert('No site was passed.');
			return false;
		}
		// Take the provided url, and add it to a YQL query. Make sure you encode it!
		var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + site + '" AND xpath="'+ xpath +'"') + '&format=json&callback=?';
		// Request that YSQL string, and run a callback function.
		// Pass a defined function to prevent cache-busting.
		$.getJSON( yql, function cbFunc(data) {
		// If we have something to work with...
		/* */
				//console.log("sdf = "+data.query.results.img.src)
				callback(data.query.results);
			}
		/* */
		);
	},
	getThumbElement : function(callback){
		var thumbEle = $("img[src*='turboimagehost.com'],img[src*='imagefap.com'],a[href*='turboimagehost.com']",LS.DOM_blog1);
	
		console.log("thumbEle = "+thumbEle.length)
		console.log("thumbEle = "+thumbEle[0])
		// Do turboImage scoure
		if(/turboimagehost/.test(thumbEle[0].src) || /turboimagehost/.test(thumbEle[0].href)){
			thumbEle.each(function(i,e){
				var e
					if($(e).is("img")){ // If img
					console.log("img");
						e.thumbObj = $(this);
					var reg1 = /http\:\/\/\w+./,
						reg2 = /\/\w\//,
						reg3 = /_/;
						e.fullURL =  e.thumbObj.attr("src").replace(reg1,"http://").replace(reg2,"/p/").replace(reg3,"/").concat(".html");
					} else if($(e).is("a")){ // If a
						console.log("a");
						console.log("sdf = "+this.href);
						var fragmentImg = $("<img />",{src:this.href});
						$(this).append(fragmentImg);
						e.thumbObj = fragmentImg;
						e.fullURL = this.href;
					}
			})
			callback(thumbEle,LS.getJpgTrubo);
			
		} else if(/imagefap/.test(thumbEle[0].src)){ // Do Fap scoure
			thumbEle.each(function(i,e){
				var e
					e.thumbObj = $(this);
					e.fullURL =   e.thumbObj.attr("src").replace(/cache\.imagefap\.com/,"fap.to").replace(/thumb/,"full");
			})
			callback(thumbEle,LS.getJpgFap);
		}
	},
	getJpgTrubo : function(ele,callback){
		console.log(ele.length)
		ele.each(function(i,e){
			LS.requestCrossDomain(e.fullURL,"//img[@id='imageid']", function(results) {
				console.log(results.img.src)
				e.jpgURL=results.img.src;
					LS.doRemoveHref(e);
					// Append cover image
					if(i===0){
						$(".post-header-line-1",LS.DOM_blog1).append($("<img />",{id:"imageid",src:e.jpgURL}));
					}else if(i===ele.length-1){
						callback();
					}
				});
			})
	},
	getJpgFap : function(ele,callback){
		console.log(ele.length)
		ele.each(function(i,e){
				e.jpgURL=e.fullURL;
					LS.doRemoveHref(e);
					// Append cover image
					if(i===0){
						$(".post-header-line-1",LS.DOM_blog1).append($("<img />",{id:"imageid",src:e.jpgURL}));
					}else if(i===ele.length-1){
						callback();
					}
			})
	},
	doRemoveHref:function(e){
				e.thumbObj.closest('img').addClass("thumbImg")
				e.thumbObj.closest('a').attr("href",e.jpgURL)
										.addClass("loadDone")
										.prependTo(LS.DOM_sideBar);
				console.log("jpgURL 2 = "+e.jpgURL);
				 return false;
	},
	removeExtra: function(DOM){
		DOM.prevAll().remove();
	},
	appendDOM : function(){
		$("#main").replaceWith(LS.DOM_blog1);
		$("#sidebar").replaceWith(LS.DOM_sideBar);
	},
	workFlow: function(){
		var	reg=/com\/20\d{2}/ig,
			DOM_liSpan = $('li:has("span")',LS.DOM_sideBar);
			
			if(DOM_liSpan.length !== 0 ){
				DOM_liSpan.prevAll().remove();
				LS.appendDOM()
			}

		//Only Get in single post page
		if(reg.test(window.location)){
			LS.getThumbElement(function(thumbEle,func){
				func(thumbEle,LS.appendDOM)
				})
		}
	}
}
	LS.workFlow();
/* */
}

addJQuery(inject);

