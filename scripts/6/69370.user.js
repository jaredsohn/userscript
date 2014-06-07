// ==UserScript==
// @name           xunlei/sky-fire manga preloader
// @namespace      file://localhost
// @description	    
//		    [Require Firefox BetterCache extension]
//		    To preload manga images aim to reduce waiting time
//
// @include        http://images.anime.xunlei.com/book/*
// @include 	   http://pic.sky-fire.com/AllComic/Browser.html*
// ==/UserScript==


var load_url = function(aUrl){
    req = GM_xmlhttpRequest( 
	{
	    method: 'get',
	    url: aUrl,
	    onload: function(resp){
		if( window.wrappedJSObject.cancelPendingXHR != undefined ){
		    // window.wrappedJSObject.pendingRequests.
		}
	    },
	    onerror: function(resp){
		setTimeout( (function(){ load_url(aUrl); }), 1000);
	    }
	}
    );
    var pendingXhr;
    if( window.wrappedJSObject.cancelPendingXHR == undefined){
	window.wrappedJSObject.cancelPendingXHR = [];
    }
    pendingXhr = window.wrappedJSObject.cancelPendingXHR;
    pendingXhr.push( function(){ req.abort(); } );
}

var xunlei = {
    image_list: [],
    page_list: [],
    lookAheadInPage: 20,
    curPageIndex: function(){
	var loc = location.toString();
	var res = loc.match(/[\?\&]page\=(\d+)/i);
	var seg;
	if (res != null){
	    return parseInt(res[1]);
	} else {
	    return 1;
	}
    },
//pending_request: [],
prepare_preload_image: function(){
    if( window.wrappedJSObject.images_arr == undefined){
	return ;
    } else {
    }
    var img_arr = window.wrappedJSObject.images_arr;
    for(var i=0; i != img_arr.length; i++){
	if ( img_arr[i] != undefined ){
	    this.image_list.push( "http://images.mh.xunlei.com/origin/"+img_arr[i] );
	} else {
	}
    }
    } ,


    prepare_preload_pages : function(){
	var loc = location;
	loc = loc.toString().split('#')[0];
	var len = window.wrappedJSObject.images_arr.length;
	if(len == undefined) return;

	var urlbase = loc.split('?')[0];
	for(var i=0; i!=len; i++){
	    var url = urlbase+'?page='+(i+1);
	    this.page_list.push( url );
	}
    },


    preload: function(){
	this.prepare_preload_image();
	this.prepare_preload_pages();
	var curPgIdx = this.curPageIndex();
	var cachePgStart;
	var cachePgEnd;
	var barrowPgNr = 0;
	var underflowAmout = this.lookAheadInPage/2 - (curPgIdx);

	if( underflowAmout > 0) {
	    cachePgStart = 1;
	} else {
	    cachePgStart = curPgIdx - this.lookAheadInPage/2;
	}
	cachePgEnd = cachePgStart + this.lookAheadInPage;
	if(cachePgEnd > window.wrappedJSObject.images_arr.length){
	    cachePgEnd = window.wrappedJSObject.images_arr.length;
	}
	GM_log('xunlei preload[' + cachePgStart +'..'+cachePgEnd+']');
	for(var i=curPgIdx; i != cachePgEnd; i++){
		if(this.page_list[i])
		    load_url( this.page_list[i] );
		if(this.image_list[i])
		    load_url( this.image_list[i] );
	}
	if( curPgIdx > cachePgStart){
	    for(var i=curPgIdx-1; i!= cachePgStart; i--){
		    if(this.page_list[i])
		    load_url( this.page_list[i] );
		    if(this.image_list[i])
		    load_url( this.image_list[i] );
	    }
	}

	//
	// 'DOMWindowClose'
	//
	    thos = this;
	    window.addEventListener("DOMWindowClose", 
	    function(evt) {
		var cancelPendingXHR = window.cancelPendingXHR;
		for(var i=0;i!=cancelPendingXHR.length;i++){
		    cancelPendingXHR[i]();
		}
	    }, false);
	},
	probe_url: function(){
	    var loc = location.toString();
	    if( loc.match(/images\.anime\.xunlei\.com\/book\/segment\/\d+\/\d+\.html/i) != null){

		return true;
	    } else { return false;}
	}

    };
    var skyfire = {
    image_list: [],
    page_list: [],
    lookAheadInPage: 16,
    curPageIndex: function()
    {
	var loc = location.toString();
	var res = loc.match(/[\?\&]+p\=(\d+)/i);
	var seg;
	if(res!=null){
	    return parseInt(res[1]);
	} else {
	    return 1;
	}
    },
    probe_url:	function(){
	var loc = location.toString();
	if(loc.match(/pic\.sky-fire\.com\/AllComic\/Browser\.html.*/i) != null){
	    return true;
	} else { return false;}
    },
    prepare_preload_pages : function(){
	var loc = location;
	loc = loc.toString().split('#')[0];
	var len = window.wrappedJSObject.picAy.length;
	var urlprefix = loc.replace(/&p=\d+/, '&p=');
	for(var i=0; i!=len; i++){
	    var url = ''+urlprefix+(i+1);
	    this.page_list.push(url);
	}
    },
    prepare_preload_image: function(){
	if( window.wrappedJSObject.picAy == undefined){
	    // GM_log("No image array found");
	    return ;
	} else {
	    // GM_log("image preloader working!");
	}
	var img_arr = window.wrappedJSObject.picAy;
	for(var i=0; i != img_arr.length; i++){
	    if ( img_arr[i] != undefined ){
		//var image = new Image();
		//load_url(img_arr[i]);
		this.image_list.push(img_arr[i]);
	    } else {
		// GM_log(" img_arr  = "+ img_arr);
	    }
	}
    },
    preload: function()
    {

	this.prepare_preload_image();
	this.prepare_preload_pages();
	//
	var curPgIdx = this.curPageIndex();
	var cachePgStart;
	var cachePgEnd;
	var barrowPgNr = 0;
	// sanify the preload range
	var underflowAmout = this.lookAheadInPage/2 - (curPgIdx);
	if( underflowAmout > 0) {
	    cachePgStart = 1;
	} else {
	    cachePgStart = curPgIdx - this.lookAheadInPage/2;
	}
	cachePgEnd = cachePgStart + this.lookAheadInPage;
	if(cachePgEnd > window.wrappedJSObject.picAy.length)
	    cachePgEnd = window.wrappedJSObject.picAy.length;
	GM_log("preload sky-fire ["+ cachePgStart+".."+cachePgEnd+"]");
	for(var i=curPgIdx; i != cachePgEnd; i++){
		if(this.page_list[i])
		load_url( this.page_list[i] );
		if(this.image_list[i])
		load_url( this.image_list[i] );
	}
	if( curPgIdx > cachePgStart){
	    for(var i=curPgIdx-1; i!= cachePgStart; i--){
		    if(this.page_list[i])
		    load_url( this.page_list[i] );
		    if(this.image_list[i])
		    load_url( this.image_list[i] );
	    }
	}
    }
}

if( xunlei.probe_url()){
//    GM_log('preloading xunlei');
    xunlei.preload();
} else if( skyfire.probe_url()){
//    GM_log('preloading skyfire');
    skyfire.preload();
} else if( false ){
    ;;
}
