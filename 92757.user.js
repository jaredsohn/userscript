// ==UserScript==
// @name Ajax Loader for Google
// @description Ajax Loader for Google™  is an extension that adds an ajax loader to the Google™ pages (Gmail, Google Calendar, Google Docs, Google Maps, Google Reader, Google Sites, Orkut and Google Plus). 
// @include http://google.*/*
// @include https://google.*/*
// @include http://*.google.*/*
// @include https://*.google.*/*
// @include http://*.orkut.*/*
// @include https://*.orkut.*/*
// ==/UserScript==
var cssNode = document.createElement("style");
var selector = '#ID-loading,.jfk-butterBar-info ,#viewer-details-toggle.details-loading, #loading-area .message-area-text-container, #loadingStatus, .vZ, .L4XNt,#lo,#sites-notice,#loadmessagehtml';
var declaration;
var ajax_image = "";
var cssStr = "";
	if( /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) ||  /Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent) ){
		ajax_image = "data:image/png;base64,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";	
	}else{
		ajax_image = "data:image/gif;base64,R0lGODlhEgASAKIFAKav0iA4j3mIvE1gpb3E3u7u7gAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAFACwAAAAAEgASAAADQli63N4hvBnjXGOUKgl5WbZ13teE2lKaZ8p4jiBcBazI8rTeuF4uuYuNAQA4hsSiUfVrKI2wnaNY+yEfUhpTy10kAAAh+QQFAAAFACwBAAEADgAOAAADLFi6NcNQOReLEG2WENa92cZ11seMZBlxCgBUjOvCrUzXN0MQ+b7fPh5QWEkAACH5BAUAAAUALAEAAQAQAAoAAAMmWLolwpA5FxchbZYx4L3ZxnXWx4xkGXEMWClBUHxYFcf0e8uuLicAIfkEBQAABQAsBwABAAoADgAAAyJYANWuiz24ihCv3jvt7h7oDANIkt1ZpusTBOD7djJM20UCACH5BAUAAAUALAcAAQAKABAAAAMqWETVros9uAoAr9477e4e6AgCSJLdWabrMwzg+zpBUMhwUdd3ru8gXicBACH5BAUAAAUALAMAAwAOAA4AAAMtWLpLxFA5F9l8teHMAOCK54HiR5pBEAnCkqYMyyqvOgyF3NL2jc8RHw50qyQAACH5BAUAAAUALAEABwAQAAoAAAMrWBHV/oSoxZ6LkVZbsFwcJDnDwAGAVZYPij6rKQiFm8LyTL9hodO9xyyUAAAh+QQFAAAFACwBAAMADgAOAAADLVgaof6LNfjkpI5hN8bmnfeF4lh+iiBQBOGo6tO2KVwAQDG79Y3nNMovh8JBEgA7";	
	}
	// Images
	declaration = "background-image:url("+ajax_image+") ;background-repeat:no-repeat;";
	if (cssNode.addRule) {
		cssNode.addRule (selector, declaration, 0);
	} else {
		if (cssNode.insertRule) {
			cssNode.insertRule (selector+" {"+declaration+"}", 0);
		}
	}  	 
	// ALL
	cssStr += selector+" {"+declaration+";background-position:2px 0px;}";
	cssStr += ".L4XNt{padding-left:25px;padding-right:3px;} ";
	// Google Reader
	cssStr += ".jfk-butterBar-info{background-position: 12px 6px!important;}";
	cssStr += "#loading-area{padding-left: 34px;}";	// Google Reader
	cssStr += "#message-area{padding-left: 34px;}";	// Google Reader - Mark All as Read		
	// Google Docs
	cssStr +="#loadingStatus{background-position:5px 2px;padding-left:25px;auto !important} .message-area-text-container{ height:15px;} ";				
	// Gmail		
	cssStr += "#viewer-details-toggle.details-loading, #loadingStatus, .vZ, .L4XNt, .J-J5-Ji,#sites-notice{ height:17px !important;} ";
	// Google Calendar 
	cssStr +=" #lo{padding-left:17px !important;background-color:#fff1a8 !important; color: black !important;background-size: 12px;background-position:2px 1px;} ";			
	// Google Maps
	if(document.getElementById("loadmessagehtml")){	
		cssStr  +=" #loadmessagehtml{padding-left:17px !important;background-position:12px 6px!important;} ";			
	}	
	// Google Sites
	if(document.getElementById("sites-status")){
		 cssStr +=" #sites-notice{padding-left:21px !important;background-position:3px 2px;} ";
		 document.getElementById("sites-notice").style.backgroundImage = "url("+ajax_image+") !important";
		 document.getElementById("sites-notice").style.backgroundRepeat = "no-repeat";
	}
	// 
	cssStr += '#loading-area .message-area-text-container {height: 17px;}';
	cssStr += '#loading-area-text{ margin-left: 4px;}  #loading-area .message-area-text-container{ padding-left: 23px; }';
	// Orkut
	cssStr  +=".CRB .GRB{background-image:url('"+ajax_image+"')!important;background-position: 12px 1px;background-repeat: no-repeat;padding: 2px 15px 2px 32px;}";
	// Google Plus
	if(document.getElementById("notify-widget-pane")){
		var obj=document.getElementById('notify-widget-pane').childNodes;
		obj = obj[0];
		obj = obj.childNodes;
		obj[0].className;
		obj = obj[0];
		obj = obj.childNodes;
		cssStr += "."+obj[1].className+"{background-image:url('"+ajax_image+"')!important;padding-left: 31px!important;padding: 2px 15px 2px 32px;background-repeat:no-repeat!important;background-position: 10px 0px!important;}";		
	} 
	// Google Analytics
	cssStr +="#ID-loading{padding-left:27px;background-position: 6px 2px;}";
	// InnerHTML
	cssNode.innerHTML = cssStr;
	// Add CSS Node
	document.body.appendChild(cssNode);