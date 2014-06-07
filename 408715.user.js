// ==UserScript==
// @name        迅雷云播 magnet
// @namespace   
// @include     http://simplecd.me/entry/*
// @include     http://piratebaymirror.me/*
// @include     http://kickass.to*
// @include     http://bitsnoop.com/search*
// @include     http://www.torrentkitty.com/*
// @include     http://www.ed2000.com/*
// @include     *//torrentz.*/*
// @version			E.1.0
// @copyright		2013, Eric
// ==/UserScript==

(function() {
	var h=location.href;
    if (h.indexOf('simplecd.me') !=-1){//simplecd
		$(".post2 a").each(function() {
		    var mp = $(this);
		    var hrefin = $(this).attr('href');
		    $.get( hrefin, null, function(data,status) {
		            var hrefreal = $(data).find("a").attr("href");
		            //document.write(hrefreal)
		            mp.attr('href','http://vod.xunlei.com/nplay.html?uvs=274996076_5_24907A01C33BB5A9DEF9BF4354BAECF48527E43301A7AB80C2ADCC96B5B6D58524367D8538D61D73724AC06C1D7753A930CBB82BA25C2055C187CF7E3BBE232C3A2C6659A8615E017DC079590899F666&from=vlist&url='+hrefreal);
		            }
		        );
		});

		$(".post a").each(function() {
		    var mp = $(this);
		    var hrefin = $(this).attr('href');
		    $.get( hrefin, null, function(data,status) {
		            var hrefreal = $(data).find("a").attr("href");
		            //document.write(hrefreal)
		            mp.attr('href','http://vod.xunlei.com/nplay.html?uvs=274996076_5_24907A01C33BB5A9DEF9BF4354BAECF48527E43301A7AB80C2ADCC96B5B6D58524367D8538D61D73724AC06C1D7753A930CBB82BA25C2055C187CF7E3BBE232C3A2C6659A8615E017DC079590899F666&from=vlist&url='+hrefreal);
		            }
		        );
		});
	}
	else if (h.indexOf('bitsnoop.com') !=-1){//bitsnoop
		$("#torrents li a").each(function() {
		   	var mp = $(this);
		    var hrefin = $(this).attr('href');
		    $.get( hrefin, null, function(data,status) {
	            var hrefreal = $(data).find("#dload a").attr("href");
	        	var magnet = 'magnet:?xt=urn:btih:'+hrefreal.substring(11,51);
	           	//mp.attr('href',magnet);
	           	mp.attr('href','http://vod.xunlei.com/nplay.html?uvs=274996076_5_24907A01C33BB5A9DEF9BF4354BAECF48527E43301A7AB80C2ADCC96B5B6D58524367D8538D61D73724AC06C1D7753A930CBB82BA25C2055C187CF7E3BBE232C3A2C6659A8615E017DC079590899F666&from=vlist&url='+encodeURIComponent(magnet));
	       	});
		});
	}
	else if (h.indexOf('ed2000.com') !=-1){//ed2000
		GM_addStyle(".CommonListCell td div {margin-left: 10px; white-space: nowrap; !important; }");
		var results = document.querySelectorAll('.CommonListCell>td>div')
		for(var i in results) {
		    var link = results[i].querySelector('a[href^=magnet]');
		    //document.write(results);
		    if(link != undefined) {
		        var a = document.createElement('a');
		        a.class='vod';
		        a.innerHTML = '<img src="http://fc04.deviantart.net/fs70/f/2014/001/8/d/xunleicloud_by_dyinginthesun-d70c6ut.png" style="float: left; margin-top: 0px; margin-left:-13px;margin-right:12px; boarder: 10px;">';
		        a.href='http://vod.xunlei.com/nplay.html?uvs=274996076_5_24907A01C33BB5A9DEF9BF4354BAECF48527E43301A7AB80C2ADCC96B5B6D58524367D8538D61D73724AC06C1D7753A930CBB82BA25C2055C187CF7E3BBE232C3A2C6659A8615E017DC079590899F666&from=vlist&url=' + encodeURIComponent(link);
		        a.target='blank';
		        results[i].appendChild(a);
		    }
		}

	}
	else if (h.indexOf('torrentz.eu') !=-1){//torrentz
		$(".results dl").each(function() {
            var hash = this.childNodes[0].childNodes[0].href.split("/")[3].toUpperCase();
            var link = encodeURIComponent("magnet:?xt=urn:btih:") + hash;
            var adata1 = '<div class="bs2" style="float: left; margin-left:2px; width: 45px;"><a href="http://vod.xunlei.com/nplay.html?uvs=274996076_5_24907A01C33BB5A9DEF9BF4354BAECF48527E43301A7AB80C2ADCC96B5B6D58524367D8538D61D73724AC06C1D7753A930CBB82BA25C2055C187CF7E3BBE232C3A2C6659A8615E017DC079590899F666&from=vlist&url=' + link + '" target="blank" class="vod" style="display: inline-block;width: 16px;height: 16px; margin-left:2px; background-image: url(http://fc04.deviantart.net/fs70/f/2014/001/8/d/xunleicloud_by_dyinginthesun-d70c6ut.png);"></a><a href="http://torcache.net/torrent/'+hash+'.torrent" class="vod" style="display: inline-block;width: 16px;height: 16px; margin-left:4px;  background-image: url(http://fc03.deviantart.net/fs71/f/2014/007/1/4/torrent16_by_dyinginthesun-d71cewa.png);"target="blank"></a></div>';
            var adata2 = '<div class="bs1" style="float: right; margin:-15PX 2px; "><a href="magnet:?xt=urn:btih:'+ hash+'" style="display: inline-block;width: 16px;height: 16px; margin:0px 80px 15px 0; background-image: url(http://fc06.deviantart.net/fs70/f/2014/008/a/1/magnet_by_dyinginthesun-d71cni3.png);"></a></div>'
            $(this).prepend(adata1);
            $(this).append(adata2);
	  	});
		GM_addStyle("div.results>dl>dt {width: 650px; }");
	}
	else{
		var results = document.querySelectorAll('.floatright,.detName,.qt_links,.action,.CommonListCell>td>div,#torrents>li');
		for(var i in results) {
		    var link = results[i].querySelector('a[href^=magnet]');
		    //document.write(link);
		    if(link != undefined) {
		        if(location.href.indexOf('http://kickass.to/') !=-1) {
		            var a = document.createElement('a');
                    a.id='vodplay'
		            a.innerHTML = '<img src="http://fc04.deviantart.net/fs70/f/2014/001/8/d/xunleicloud_by_dyinginthesun-d70c6ut.png" style="border:1px dashed #678905;" class="partner1Button icon16">';
		            a.href='http://vod.xunlei.com/nplay.html?uvs=274996076_5_24907A01C33BB5A9DEF9BF4354BAECF48527E43301A7AB80C2ADCC96B5B6D58524367D8538D61D73724AC06C1D7753A930CBB82BA25C2055C187CF7E3BBE232C3A2C6659A8615E017DC079590899F666&from=vlist&url=' + encodeURIComponent(link);
		            a.target='blank';
		            results[i].appendChild(a);
		    	}
		    	else {
		            var a = document.createElement('a');
		            a.innerHTML = '<img src="http://fc04.deviantart.net/fs70/f/2014/001/8/d/xunleicloud_by_dyinginthesun-d70c6ut.png" style="float: left; margin-left:2px;" class="vodimg">';
		            a.href='http://vod.xunlei.com/nplay.html?uvs=274996076_5_24907A01C33BB5A9DEF9BF4354BAECF48527E43301A7AB80C2ADCC96B5B6D58524367D8538D61D73724AC06C1D7753A930CBB82BA25C2055C187CF7E3BBE232C3A2C6659A8615E017DC079590899F666&from=vlist&url=' + encodeURIComponent(link);
		            a.target='blank';
		            a.class='vod';
		            results[i].appendChild(a);
		        }
		    }
		}    
	}
})()