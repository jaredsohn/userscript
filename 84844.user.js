// ==UserScript==
// @name          Youtubian
// @namespace     http://www.smallmeans.com/tools/youtubian/
// @author        Small Labs, v1.4, 23 Sep 2010
// @description   Provides a super light and clean interface on top of Youtube (new edition)
// @include       http://*.youtube.com/watch*
// @version       1.4
// ==/UserScript==


var player,
youtube={
  errors:{
    100:'The video requested is not found (removed?)',
    101:'The video requested does not allow playback in the embedded players.',
    150:'Embedding disabled by video author.'
  },
  formats:{
    flv:{
      small: {res:'320x240', type:'FLV', ratio:'4:3', fmt:5, name:'LQ /FLV/H.263/MP3'},
      medium:{res:'640x480', type:'FLV', ratio:'4:3, 16:9', fmt:34, name:'STDQ /FLV/H.264/AAC'},
      large: {res:'854x640', type:'FLV', ratio:'16:9', fmt:35, name:'HQ /FLV/H.264/AAC'}
   },
    mp4:{
      medium:{res:'480x360', type:'MP4', ratio:'4:3', fmt:18, name:'HQ /MP4/H.264/AAC'},  
      hd720: {res:'1280x720', type:'MP4', ratio:'16:9', fmt:22, name:'HD720p /MP4/H.264/AA'},
      hd1080:{res:'1920x1080', type:'MP4', ratio:'16:9', fmt:37, name:'Full HD: 1080p/MP4/H.264/AAC'}
   },
    _3gp:{
      small:{res:'176x144', type:'3GP', ratio:'11:9', fmt:17, name:'Mobile/3GP/MPEG4/AAC'}
   }
  },
  config:{maxFavd:20,maxPagination:25,maxStdFeed:40},pagination:{},
  log:function() {
    typeof console!="undefined" && console.log && console.log([].slice.call(arguments));
  },
  commafy:function(v){
    return String(v).replace(/(^|[^\w.])(\d{4,})/g, function($0,$1,$2){
      return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
    });
  },
  formatDate:function(s){
    var time =  s .replace(/-/g,"/").replace(/T|\..+Z$/g," ");
    var d= new Date(time).toGMTString().split(" ");
    return d[1] + " " + d[2] + " " + d[3];
  },
  secondsToStamp:function(secs){
    var res=[], hours = Math.floor(secs/(60*60)),m = secs%(60*60);
    var minutes = Math.floor(m/60);
    var seconds = Math.ceil(m%60);
    hours && res.push(hours);
    res.push(minutes, seconds>9?seconds:'0'+seconds)
    return res.join(':');
  },
  stampToSeconds:function(stamp){
    var a=stamp.split(':');
    return a.length>2?1*a[0]*60*60+1*a[1]*60+1*a[2]:1*a[0]*60+1*a[1];
  },
  getNeedle:function (needle, hayStack){
    var regex= new RegExp("\\b"+needle+"=([^&#$)]*)",'ig');
    var m=regex.exec(unescape(hayStack));
    return m && m[1];
  },
  getFlashVar:function(name){
    var o=$(player).attr('flashvars');
    return this.getNeedle(name, o);
  },
  getMetaData:function(o){
    var t=o.title.$t;
    var i=this.getNeedle('v', o.link[0].href);
    var d=o.media$group.media$description && o.media$group.media$description.$t.replace(/\r\n/g,'<br/>')||'';
    var p=o.published.$t;
    var u=o.author[0].name.$t;
    var ui=o.author[0].uri.$t;
    var r=o.gd$rating && o.gd$rating.numRaters || 0;
    var a=o.gd$rating && o.gd$rating.average || 0;
    var nay=o.yt$rating && o.yt$rating.numDislikes || 0;
    var yay=o.yt$rating && o.yt$rating.numLikes || 0;
    var c=o.gd$comments && o.gd$comments.gd$feedLink.countHint || 'none';
    var v=o.yt$statistics && o.yt$statistics.viewCount || 0;
    var th=o.media$group.media$thumbnail;
    var du=o.media$group.yt$duration&&o.media$group.yt$duration.seconds;
    return {id:i,title:t,desc:d,pdate:p,user:u,useri:ui,thumbs:th,duration:du,
            comm:this.commafy(c),views:this.commafy(v),rates:r,avgrate:a,nay:nay,yay:yay};

  },
  setVideoData:function(data){
    this.log(data);
    var t= this.getMetaData(data.entry);
    $('#eow-description-short').html(t.desc);
    $('#watch-channel-icon img.photo').attr('src',t.thumbs[0].url||'');
    var avg=t.avgrate,nayp=+(t.nay/t.rates)*100+'%',yayp=+(t.yay/t.rates)*100+'%';
    $('#watch-description a.watch-description-username')
     .attr('href','/user/'+t.user).text(t.user);
    $('#eow-date-short').text(this.formatDate(t.pdate));
    $('#newContent .tabs > a[name=comments] small').text(t.comm);
    $(classes.watchRatingStats).find('.likes-bar').css('width',yayp);
    $(classes.watchRatingStats).attr('title',this.commafy(t.yay)+' likes, '+this.commafy(t.nay)+' dislikes.').find('.dislikes-bar').css('width',nayp);
    $('#_loadingInfo').addClass('info');
  },
  requestVideo:function(id, user){
    $('#grabVideos').attr('class','');
    $('#newContent span a').removeClass('active');
    $('#_loadingInfo').attr('class','visible');
    this.stopMiniVideo();
    this.playNice=false;
    this.playVideo(id);
    this.getVideoData(id);
    this.getVideoComments(id);
    if(!this.config.sticky){
      this.getRelatedVideos(id);
      if(user){
        this.getUserChannel(user);
      }else{
        $('#_loadingInfo').addClass('user');
      }
    }else{
      $('#_loadingInfo').addClass('related user');
    }
    if($.browser.opera){
      $(classes.watchMainContainer).get(0).scrollIntoView()
    }else{
      var rm=$(classes.watchEmbedParent).removeClass('shadow');
      var targetOffset = $(classes.watchMainContainer).offset().top;
      $('html,body').animate({scrollTop: targetOffset}, 1000,function(){rm.addClass('shadow')});
    }
    this.awaitState(1,this.videoReady);
  },
  awaitState:function(state,callback){
    (function(){
      var s=player.getPlayerState&&player.getPlayerState()||NaN;_self.log('state:',s);
      if(state==s){callback.apply(_self);}else{setTimeout(arguments.callee, 200);}
    })();
  },
  OnClick:function(elem,evt){
      if(evt.button!=0){return true;}//Firefox righ click bug
      var id=$(elem).getVideoID(),p=$(elem).parent();
      var views=p.find('.view-count').text().split(' ')[0];
      var user=p.find('.stat:first').text().split(' ').reverse()[0];
      var th=p.find('img').attr('src');
      var title=p.find('img').attr('title'),context='#'+p.parent()[0].id;
      $(classes.watchViewsStats).find('strong').text(views);
      $(classes.watchEmbedParent).removeClass('shadow');
      $(p).activate();
      _self.current=id;_self.user=user;
      _self.setTitle(title);
      _self.addHistory({t:title, i:id, u:user, th:th});
       if(classes.watchChannelVidsBody==context){user=null;};
      _self.requestVideo(id,user);
      delete _self.pagination[context];
  },
  addOnClick:function(context){
    var css=".video-list-item > a";
    var selection=$(css, context);
    this.log(context+':'+selection.length);
    this.addMetaData(context);
    selection.live("click",function(e){
      _self.OnClick(this,e);
      return false;
    });
  },
  addHistory:function(obj){
    $('<a href="/watch?v='+obj.i+'">')
       .attr('u',obj.u).attr('title',obj.t).attr('target','_blank')
       .append('<img src="'+obj.th+'"/></a>')
    .prependTo('.historyContainer div'); 
  },
  setTitle:function(title){
    $(classes.headlineParent+' h1').text(title);
    document.title='Youtube - '+title;
  },
  get:function(url, callback){
    this.log(url, callback)
    GM_xmlhttpRequest({
     method: "GET",
     url: url,
     onload: function(xhr) {
      callback(eval("(" + xhr.responseText + ")"));
    }
   });
  },
  getVideoData:function(id){
    this.get("http://gdata.youtube.com/feeds/api/videos/"+id+"?v=2&alt=json", function(d){_self.setVideoData.apply(_self, [d])});
  },
  getUserChannel:function(username, index){
    var from=index||1,order='viewCount';//relevance,published,rating,viewCount
    this.get("http://gdata.youtube.com/feeds/api/users/"+username+"/uploads?"+
                 "max-results="+this.config.maxChannel+"&start-index="+from+"&orderby="+order+"&alt=json",youtube.listChannelVideos);
  },
  getFavoritedVideos:function(username){
    this.get("http://gdata.youtube.com/feeds/api/users/"+username+"/favorites?"+
                 "max-results="+this.config.maxFavd+"&alt=json",youtube.listFavdVideos);
  },
  getRelatedVideos:function(id,index){
    var from=index||1;
    this.get("http://gdata.youtube.com/feeds/videos/"+id+"/related?"+
                 "max-results="+this.config.maxRelated+"&start-index="+from+"&alt=json",youtube.listRelatedVideos);
  },
  getStandardFeed:function(what, when,index){
    var base='http://gdata.youtube.com/feeds/api/standardfeeds/',from=index||1;
    var time=when.toLowerCase().replace(' ','_'),type=what.toLowerCase().replace(' ','_'),url=base+type+'?';
    if(time.length){url+="time="+time;};this.stdfeed={what:what,when:when};
    this.get(url+"&max-results="+this.config.maxStdFeed+"&start-index="+from+"&alt=json",youtube.listStandardFeed);
  },
  getSearchVideos:function(term,index){
    var from=index||1,order=this.config.searchOrder;this.s=term;
    this.get("http://gdata.youtube.com/feeds/api/videos?max-results="+this.config.maxSearch+"&start-index="+from+
                 "&v=2&q="+term+"&orderby="+order+"&safeSearch=none&alt=json",youtube.listResultVideos);
  },
  listStandardFeed:function(data){
    $('#newContent .tabs > a[name=feed]').removeClass('waiting').find('small').text('');
    _self.listVideos(data, classes.watchFeedContainer);
  },
  listChannelVideos:function(data){
      $('#_loadingInfo').addClass('user');
    _self.listVideos(data, classes.watchChannelVidsBody);
  },
  listResultVideos:function(data){
    _self.listVideos(data, '#watch-result-discoverbox');
    var total=_self.commafy(data.feed.openSearch$totalResults.$t);
    $('#newContent .tabs > a[name=results]').removeClass('waiting').find('small').text(total);
    var l="/results?search_query="+_self.s;
    var s="See all "+total+" videos for: "+_self.s;
    $('.watch-discoverbox-more-link.results a').attr('href',l).text(s);
  },
  listRelatedVideos:function(data){
    $('#_loadingInfo').addClass('related');
    _self.listVideos(data, classes.watchRelatedDiscoverbox);
    var l=data.feed.link[0].href;
    var s="See all "+data.feed.openSearch$totalResults.$t+" related videos";
    $('.watch-discoverbox-more-link.related a').attr('href',l).text(s);
  },
  listVideos:function(data, container){
    _self.log(container,data.feed);
    var entries = data.feed.entry || [];
    var next = data.feed.link[4]&&data.feed.link[4].href || '';
    var total = data.feed.openSearch$totalResults.$t || 0;
    var ppage = data.feed.openSearch$itemsPerPage.$t || 0;
    var html = [], buttons=[],content='';
    for(var i=0, entry; entry = entries[i]; i++){
      content = _self.getVideoEntryDOM.apply(_self, [entry]);
      html.push(content);
    }
    for(var i=1, k= Math.min(_self.config.maxPagination,Math.ceil(total/ppage)); i<=k; i++){
      buttons.push('<button class="yt-uix-button">'+i+'</button>');
    }
    var current=_self.pagination[container]||1;
    $(container).html(html.join(''));
    if(k>1)$("<div class='yt-uix-pager'>").html(buttons.join('')).find('button').eq(current-1).addClass('yt-uix-pager-selected').end().end().appendTo(container);
    _self.addMetaData(container);
  },
  getVideoComments:function(id){
    var url="/watch_ajax";
    var args={v:id, action_get_comments:1, p:1,  commenatthreshold:-5, commentfilter:0, page_size:10};
    GM_xmlhttpRequest({method: "GET",url: url+'?'+$.param(args),onload:function(xhr){
      var xml=new DOMParser().parseFromString(xhr.responseText, "text/xml");
      $(classes.watchCommentPanel).html($(xml).find('html_content').text())
       .find('a').attr('target','_blank').end().find('.video-list').remove();
      $('#_loadingInfo').addClass('comments');
    }
   });
  },
  getVideoStatsData:function(id){
    var url="/watch_ajax";
    var args={v:id||_self.current, action_get_statistics_and_data:1};
    $(classes.watchStatsExtended).show().addClass('expanded').html('<div id="watch-stats-loading">Loading...</div>');
    GM_xmlhttpRequest({method: "GET",url: url+'?'+$.param(args),onload:function(xhr){
      var xml=new DOMParser().parseFromString(xhr.responseText, "text/xml");
      $(classes.watchStatsExtended).html($(xml).find('html_content').text());
    }});
  },
  getVideoEntryDOM:function(entry){
    var t= this.getMetaData(entry);
    if(!t.thumbs) return '';
    var thumb=t.thumbs[0].url;
    var dur=this.secondsToStamp(t.duration);
	return '<li class="video-list-item ">'+
		' <a href="/watch?v='+t.id+'" class="video-list-item-link">'+
		'  <span class="video-thumb ux-thumb-94 ux-thumb-96">'+
		'   <span class="img"><img alt="'+t.title+'" title="'+t.title+'" class="vimg90" src="'+thumb+'"/></span>'+
		'   <span class="video-time" date="'+t.pdate+'">'+dur+'</span></span>'+
		'  <span title="'+t.title+'" class="title video-mini-title">'+t.title+'</span>'+
		'  <span class="stat video-username">'+t.user+'</span>'+
		'  <span class="stat view-count">'+t.views+' views</span>'+
		' </a>'+
		'</li>';
  },
  goPop:function(url){
    _self.w=window.open(url,
    "gogetter..","menubar=1,resizable=1,width=480,height=150"); 
    if(window.focus){try{_self.w.focus()}catch(c){}}
  },
  getDownloadURL:function (vId, t, format) {
    return  "/get_video?video_id=" + vId + "&asv=&t=" + t + ((format == "") ? "" : "&fmt=" + format);
  },
  getVideoToken:function (format,callback) {
    var url="/get_video_info?asv=&noflv=1&video_id="+_self.current;
    GM_xmlhttpRequest({method: "GET",url: url,onload:function(data){
      var token=_self.getNeedle('token', data.responseText);
      _self.log(url,'>>>',token)
      if(!token){_self.yell(_self.getNeedle('reason', data.responseText).replace(/\+/g,' '),true);try{_self.w.close()}catch(c){};return;}
      var uri=_self.getDownloadURL(_self.current, token, format);
      callback && callback(uri);
    }});
  },
  setHD:function() {
    player.setPlaybackQuality('hd720');
  },
  getMB:function(val) {
    return (1*val/1024/1024).toFixed(2);
  },
  getSize:function(){
    return this.getMB(player.getVideoBytesTotal());
  },
  getBytesLoaded:function(){
    return this.getMB(player.getVideoBytesLoaded());
  },
  getCurrentTime:function(){
    return player.getCurrentTime();
  },
  sortByDuration:function(){
    jQuery("#newContent .video-list-item").tsort(".video-time",{order:"desc",attr:"duration"});
  },
  sortByDate:function(){
    jQuery("#newContent .video-list-item").tsort(".video-time",{order:"desc",attr:"date"});
  },
  sortByViews:function(){
    jQuery("#newContent .video-list-item").tsort(".view-count",{order:"desc",attr:"views"});
  },
  videoReady:function(){
    var c=player.getAvailableQualityLevels();
    c.push('small','_3gp');
    $('#grabVideos').attr('class',c.join(' '));
    this.available=c;
    this.log('available:',c);
    setInterval(function(){_self.updatePlayerInfo();}, 500);
  },
  addMetaData:function(context){
    $('.video-list-item .view-count', context).each(function(){
      var views=$(this).text().split(' ')[0].replace(/,/g,'');
      $(this).attr('views',views);
    });
    $('.video-list-item .video-time', context).each(function(){
     var duration=_self.stampToSeconds($(this).text());
      $(this).attr('duration',duration)
    });
  },
  yell:function(msg,longr){
    $('.humanized_msg').html(msg).fadeIn('slow');clearInterval(_self.td);
    _self.td=setTimeout(function(){$('.humanized_msg').fadeOut()}, longr?3200:2300);
  },
  updatePlayerInfo:function(){
    if(!player.getVideoBytesLoaded)return;
    $('#loadvidsize').text(this.getBytesLoaded());
    $('#vidsize').text(this.getSize());
    $('#deepLink').attr('href','/watch?v='+this.current+'#t='+Math.round(this.getCurrentTime()));
  },
  stopMiniVideo:function(el){
    try{_self.p.stopVideo && _self.p.stopVideo();_self.p.mute();_self.p.loadVideoById(1);}catch(c){};
    $('#onHoverPlayer').css('visibility','hidden');
  },
  playVideo:function(id, from, quality) {
   (function(){
     if(!player||!player.loadVideoById){
      if(!_self.playNice){_self.yell('hold on, the tubes are still clogged..');}_self.playNice=true;
      setTimeout(arguments.callee, 500);
     }else{player.loadVideoById(id||_self.current);}
    })();
  },
  init:function(videoID){
    var o={
     t:document.title, u:this.user,
     i:videoID,th:'http://i2.ytimg.com/vi/'+videoID+'/default.jpg'
    };
    this.addHistory(o);  
    _self.getUserChannel(this.user);
    this.current=videoID;
    _onYouTubePlayerReady.apply(this);
  }
},
classes={
  watchMainContainer:'#watch-container',
  embedCodeContainer:'#watch-actions-area',
  embedCodeTextArea:'#watch-embed-code',
  watchEmbedParent:'#watch-player',
  watchCommentPanel:"#watch-discussion",
  watchRelatedDiscoverbox:'#watch-related',
  watchChannelVidsBody:'#watch-channel-discoverbox',
  watchFeedContainer:'#watch-feed-discoverbox',
  watchResultDiscoverbox:'#watch-result-discoverbox',
  watchViewsStats:'#watch-views',
  watchRatingStats:'#watch-actions-left',
  embedCode:'#watch-actions-right',
  watchStatsPanel:'#watch-actions',
  watchStatsExtended:'#watch-info',
  watchThisVid:'#watch-this-vid',
  watchDescription:'#watch-description',
  headlineParent:'#watch-headline',
  Sidebar:'#watch-video-container'
};
function _onYouTubePlayerReady(){
  this.log('API ready..');
  $('#_loadingstuff').hide();
  $(document.body).addClass('ytnEnabled');
  player=(typeof unsafeWindow=='undefined'?window:unsafeWindow).document.getElementsByTagName('embed')[0];
  this.playVideo(this.current);
  this.awaitState(1,this.videoReady);
}

function initDOM($,conf){
  _self=youtube;
  $.extend(_self.config,conf);
  $.fn.extend({
    hasFocus: function (a) {
        return elem.hasFocus
    },
    reverse: function(){
      return this.pushStack(this.get().reverse(), arguments)
    },
    dispatch:function(type){
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(type, true, true );
      this[0].dispatchEvent(evt);
      return this;
    },
    getVideoID: function(){
      return $(this).is('a') &&
       _self.getNeedle('v',$(this).attr('href'));
    },
    activate: function(){
      var c='active been-there';
      if($(this).is('.video-thumb-90')){
        $('.video-list-item .video-thumb-90').removeClass('active');
        $(this).addClass(c);
      }else{
        $(this).siblings().removeClass('active').end().addClass(c);
      }
    }
  });
  var msg,videoID=_self.getNeedle('v',document.location);
  if(!videoID){
    msg="Apparently, you're not on a video page."+
    "<br/>How about clickin' on <a href='/watch?v=P6VUNnC3QdE'>this one</a>, huh?.....";
  }else{
    msg="Loading stuff.. hold on";
    if(/\/watch#!v/.test(document.location)){document.location='http://www.youtube.com/watch?v='+videoID;return;}
  }
   var st="position: absolute;position: fixed;width:99%; color: white;background-color:#8CC63F;"+  
          "font-size: 24pt; text-align: left;bottom:0;padding:10px 4px; z-index:999;";  
   $('<div>').attr('id','_loadingstuff').html(msg).attr('style',st).appendTo('body');  
  if(!videoID){return;}

  $("<style type='text/css'>").text(cssRules).appendTo('head');
  $('<div class="humanized_msg"><p></p></div>').prependTo('body');
  $('#watch-other-vids >div:gt(1)').hide()
  $(classes.watchCommentPanel).wrap("<div id='newContent'>");
  $(classes.watchEmbedParent).before("<div id='rightSideContent'>");
  $(classes.watchDescription).remove().appendTo("#rightSideContent");
  $(classes.watchChannelVidsBody).remove().appendTo("#newContent");
  $(classes.watchRelatedDiscoverbox).remove().appendTo("#newContent");
  $(classes.watchChannelVidsBody).remove().appendTo("#newContent");
  $(classes.watchViewsStats).remove().prependTo(classes.watchStatsPanel);
  $(classes.watchStatsPanel).after($(classes.watchStatsExtended).remove());
  $(classes.watchRatingStats).after($(classes.embedCode).remove())
  _self.user=$('#watch-description a.watch-description-username').eq(0).text();
  $(classes.watchRelatedDiscoverbox).after(
      '<div id="watch-feed-discoverbox" class="watch-discoverbox"></div>'+
      '<div id="watch-result-discoverbox" class="watch-discoverbox">'+
      '<div class="_loadingInfo">....if you\'re reading this, it is a slow day at work..</div></div>');

    $("<div id='_loadingInfo'>Working on "+
      " <span class='related'>related videos</span>, "+
      " <span class='info'>description</span>, "+
      " <span class='comm'>comments</span>, and "+
      " <span class='user'>user channel</span>"+
     "</div>"+
     "<div class='tabs'>"+
       "<span>Order videos by: <a href='#' u='0'>views</a><a href='#' u='1'>duration</a><a href='#' u='2'>date</a></span>"+
       "<a href='#' name='related'>Related videos</a>"+
       "<a href='#' name='user'>More from user</a>"+
       "<a href='#' name='comments' title='View at own peril'>Comments <small></small></a>"+
       "<a href='#' name='results'>Results <small title='Results'></small></a>"+
       "<a href='#' name='feed'>Most viewed</a>"+
     "</div>")
    .prependTo('#newContent');
   $("<a href='#'></a><a href='#' class='l'></a>").addClass('headcoll').click(function(){
      $($(this).hasClass('l')?"#masthead":"#charts-selector").slideToggle();
  }).prependTo("#masthead-container");
  $('<div id="charts-selector">'+
    '<button class=" yt-uix-button" type="button" data-button-listener=""><span class="yt-uix-button-content" id="yt-uix1">Most viewed</span> <img alt="" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="yt-uix-button-arrow"><ul class="yt-uix-button-menu hid" style="min-width: 99px; left: 25px; top: 148px; display: none;" anc="yt-uix1"><li><span class=" yt-uix-button-menu-item">Most viewed</span></li><li><span class=" yt-uix-button-menu-item">Most popular</span></li><li><span class=" yt-uix-button-menu-item">Recently featured</span></li><li><span class=" yt-uix-button-menu-item">Most discussed</span></li><li><span class=" yt-uix-button-menu-item">Most responded</span></li><li><span class=" yt-uix-button-menu-item">Most recent</span></li><li><span class=" yt-uix-button-menu-item">Top favorites</span></li><li><span class=" yt-uix-button-menu-item">Top rated</span></li></ul></button>'+
    '<button class=" yt-uix-button" type="button"><span class="yt-uix-button-content" id="yt-uix2">Today</span> <img alt="" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif" class="yt-uix-button-arrow"><ul class="yt-uix-button-menu" style="display: none;" anc="yt-uix2"><li><span class=" yt-uix-button-menu-item">Today</span></li><li><span class=" yt-uix-button-menu-item">This Week</span></li><li><span class=" yt-uix-button-menu-item">This Month</span></li><li><span class=" yt-uix-button-menu-item">All Time</span></li></ul></button>'+
    '<button class=" yt-uix-button go" type="button">Go</button>'+
   '</div>').appendTo('#masthead-container');
  var timeless=['Most recent','Recently featured'];
  $('#charts-selector').find('span').click(function(){
    var m=$(this),t=m.text(),p=m.parents('ul').attr('anc');
    if(p=='yt-uix1')$('#yt-uix2').css('color',$.inArray(t, timeless)>-1?'#ccc':'#000');
    $('#'+p).text(t);
  }).end().find('button.go').click(function(){
    var what=$('#yt-uix1').text(),when=$('#yt-uix2').text(),and=' ~ ';
    if($.inArray(what, timeless)>-1){and=when='';}
    _self.getStandardFeed(what,when);
    $('#_loadingInfo')[0].scrollIntoView();
    $('#newContent .tabs > a[name=feed]').html(what+and+when+'<small>loading..</small>').addClass('waiting').show().dispatch('click');
  });
  $("<div id='srchOpt'><strong>Sort by:</strong><label><input type='radio' name='searchOrder' value='relevance' checked/>Relevance</label>"+
     "<label><input type='radio' name='searchOrder' value='published'/>Upload date</label>"+
     "<label><input type='radio' name='searchOrder' value='viewCount'/>View count</label>"+
     "<label><input type='radio' name='searchOrder' value='rating'/>Rating</label></div>").prependTo('#watch-headline-container');
  $('#rightSideContent').append(
        "<div><label><input type='checkbox' name='sticky'/><b>Sticky</b>: Keep current user and related videos!</label></div>"+
		"<div> Video: <b id='loadvidsize'>0 byes</b> of <span id='vidsize'>N/A</span> megabytes in cache</div>"+
        "<div> Deep link to this point of the video: <a id='deepLink' href='#'>link</a></div>"+
        "<table id='grabVideos'><caption><span></span>Download video<small>"+
        "in High quality and high definition</small></caption>"+
        "<tr><th colspan='3'>Flash video</th><th class='divider'/>"+
        "<th colspan='3'>MPEG-4</th><th class='divider'/><th colspan='2'>Mobile</th></tr>"+
        "<tr><td class='small flv'>LQ</td><td class='medium flv'>Normal</td><td class='large flv'>HQ</td>"+
        "<td class='divider'/><td class='medium mp4'>HQ</td><td class='hd720 mp4'>HD</td>"+
        "<td class='hd1080 mp4' title='Full HD (hd1080)'>FHD</td>"+
        "<td class='divider'/><td class='small _3gp'>3gp</td></tr></table>"

  ).add('#srchOpt').find('input').change(function(){
    _self.config[$(this).attr('name')]=$(this)[0].type=='radio'?$(this).val():$(this).attr('checked');
  });
  $('#rightSideContent>div,#srchOpt').addClass('ytSettings');
  $('#masthead').prepend('<p class="info">All links in this section work like regular ones, so be warned.</p>');
  $(classes.watchCommentPanel+' .video-list').remove();
  $(classes.watchRatingStats).find('.action-bar-ratings-stats').attr('title','').removeClass('yt-uix-tooltip');
  var hist=$('<a class="yhistory"><span/>Viewing history</a>').attr('title', 'Videos watched in this session').click(function(){$('.historyContainer').slideToggle();});
  $(classes.embedCode).after(hist);
  _self.tab=classes.watchRelatedDiscoverbox;
  $("#grabVideos td:not(.divider)").each(function(){
    var c=$(this).attr('class').split(' '), s=c[0],f=c[1],o=_self.formats[f][s],fmt=o.fmt || '';
    $(this).addClass('yt-uix-tooltip').attr('title',o.name+'<br>Resolution:'+o.res)
    .click(function(){
      if(!fmt){_self.yell('Unknown format or video size');return;}
      if($.inArray(s, _self.available)<0){
        _self.yell('Sorry, video not available in that format.')
      }else{
        _self.yell('Requesting video, please hold..');
        _self.goPop('data:text/html;charset=utf-8;base64,PGgyPldhaXQgd2hpbGUgeW91ciBkb3dubG9hZCBiZWdpbnMuLjwvaDI+');
        _self.getVideoToken(fmt, _self.goPop);
      }
      return false;
    });
  });
  $('#masthead p.info').hide();
  $('#newContent .tabs > a[name=results],#newContent .tabs > a[name=feed]').hide();
  $(classes.watchEmbedParent).addClass('shadow');
  $('#newContent').addClass('related').find('.tabs > a').eq(0).addClass('active');
  $('#newContent .tabs span a').click(function(){
    switch(Number($(this).attr('u'))){
      case 0:_self.sortByViews();break;
      case 1:_self.sortByDuration();break;
      case 2:_self.sortByDate();
    }
    $(this).activate();
    return false;
  });  
  $('#newContent .tabs > a').click(function(){
    var p=$(this).parent().parent();
    p.attr('class', $(this).attr('name'));
    _self.stopMiniVideo();
    $(this).activate();
    return false;
  });
  $(classes.watchViewsStats).click(function(){
    var c='yt-uix-expander-collapsed';
    $(this).toggleClass(c);
    if($(this).hasClass(c)){
      $(classes.watchStatsExtended).hide();
    }else{
     _self.getVideoStatsData();
    }
    return false;
  });
  $('#deepLink').attr('target','_blank');
  $('#_loadingInfo').before('<div class="historyContainer"><div/>'+
    '<a href="#" class="r"/><a href="#" class="l"/></div>');
  $('#newContent .yt-uix-pager button').live('click',function(e){
    var c='yt-uix-pager-selected',n=$(this).text(),id='#'+$(this).parent().parent()[0].id;
    if($(this).hasClass(c))return false;
    switch(id){
      case classes.watchChannelVidsBody:
      _self.getUserChannel(_self.user,n);
      break;
      case classes.watchRelatedDiscoverbox:
      _self.getRelatedVideos(_self.current,n);
      break;
      case classes.watchResultDiscoverbox:
      _self.getSearchVideos(_self.s,n);
      break;
      case classes.watchFeedContainer:
      _self.getStandardFeed(_self.stdfeed.what,_self.stdfeed.when,n);
      break;
    }
    _self.pagination[id]=n;
    $(this).siblings().removeClass(c).end().addClass(c+' loading');
  });
  $('.historyContainer div').click(function(e){
    var m=e.target,p=$(m).parent();
    if(e.button!=0||m.tagName!='IMG'){return true;}
    var id=_self.getNeedle('v',p.attr('href'));
    _self.requestVideo(id,p.attr('u'));
    _self.setTitle(p.attr('title'));
    _self.current=id;
    return false;
  });
  $('#eow-description-short').after($('<a><span class="m">more info</span><span class="l">less info</span></a>').click(function(){
    $('#watch-description').toggleClass('yt-uix-expander-collapsed');
    return false;
   })).html($('#eow-description').html());
  $('.watch-description-username').click(function(){
     $('html,body').animate({scrollTop: $('#newContent').offset().top},1000,
       function(){$('#newContent .tabs > a[name=user]').dispatch('click');}
     );
     return false;
  });
  $("<div id='onHoverPlayer'>").append('<div/><object type="application/x-shockwave-flash" data="/apiplayer?enablejsapi=1&amp;playerapiid=ytplayer"><param name="allowScriptAccess" value="always"><param name="wmode" value="opaque"></object>').appendTo('#newContent');
  $('#rightSideContent').prepend($('form.search-form').clone(true).attr('name','altSrch'));
  $('#rightSideContent .search-form .search-term').each(function() {
    var defValue = this.value="Results will appear below";this.id=this.name='';
    $(this).bind('focus blur',function(e) {
      $('#srchOpt').slideToggle();
      $(this).toggleClass("search-term-focus");
      if(e.type=='focus'){
        if(this.value == defValue)this.value = '';
      }else{
        if(this.value == '')this.value = defValue;
      }
    });
  });
  $('#rightSideContent .search-form').submit(function(){
    var s=$(this).find('input:eq(0)').val();
    if(s&&$.trim(s).length){
      _self.getSearchVideos(s);
      $('#_loadingInfo')[0].scrollIntoView();
      $('#newContent .tabs > a[name=results]').find('small').text('loading..').end().
         addClass('waiting').show().dispatch('click');
    }
    return false;
  }).click(function(e){
    if(e.target.tagName=='BUTTON')$(e.target).parent().dispatch('submit');
    return false;
  });

  _self.p=(typeof unsafeWindow=='undefined'?window:unsafeWindow).document.getElementById('onHoverPlayer').getElementsByTagName('object')[0];
  $('#newContent').mouseover(function(event){
    var t=event.target;
    if(t.tagName=='IMG' && $(t).parent().hasClass('img')){
      var a;_self.hovered=a=$(t).parents('a');
      if(typeof _self.p.mute!=='function') return false;
      _self.p.loadVideoById(_self.getNeedle('v',a.attr('href')));_self.p.unMute();
      $('#onHoverPlayer').css('top',$(t).offset().top).css('left',$(t).offset().left).css('visibility','visible');
      return false;
    }
  }).mouseout(function(event){
    var t=event.target,id=$(t).parent()[0].id;
    if(id=='onHoverPlayer' || t.className=='video-list-item'||t.className=='video-list-item-link'){
      _self.stopMiniVideo();return false;
    }
  }).mouseleave(function(event){_self.stopMiniVideo();});
  $(classes.embedCode).find('button:eq(0)').click(function(){
    $(classes.embedCodeTextArea).attr("disabled", true);
    $(classes.embedCodeContainer).parent().toggleClass('collapsed');
    return false;
  })
  $('#onHoverPlayer div').click(function(e){_self.OnClick(_self.hovered,e);return false;});
  GM_xmlhttpRequest({method: "GET",url: '/watch_ajax?'+$.param({action_customize_embed:1}),onload:function(xhr){
    var xml=new DOMParser().parseFromString(xhr.responseText, "text/xml");
    $(classes.embedCodeContainer).html($(xml).find('html_content').text());
     $('#watch-customize-embed-options').before($('<button class=" yt-uix-button" type="button">Apply changes:<br/><span>Double-click here when ready</span>, then press CTRL + C</button>')
              .addClass('embedCodeReady')
              .click(function(){
                 var t=$(classes.embedCodeTextArea).attr("disabled", false);
                 t.val(t.val().replace(/\/v\/[^?]+/g,'/v/'+_self.current)).dispatch('click');
              }));
    $('#watch-embed-size-medium-box').dispatch('click');
  }});

  $('.video-list-item .video-time', classes.watchRelatedDiscoverbox).each(function(){$(this).attr('date',0);});
  $('#footer .pickers').prepend($('<li>').addClass('appInfo').html('Furnitures gently re-arranged by <a target="_blank" href="http://www.smallmeans.com/tools/youtubian/">Youtubelite '+_self.config.appVer+'</a>'));

  _self.addOnClick(classes.watchRelatedDiscoverbox);
  _self.addOnClick(classes.watchChannelVidsBody);
  _self.addOnClick(classes.watchResultDiscoverbox);
  _self.init(videoID);
};

(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();
(function(b){b.tinysort={id:"TinySort",version:"1.0.4",defaults:{order:"asc",attr:"",place:"start",returns:false}};b.fn.extend({tinysort:function(h,j){if(h&&typeof(h)!="string"){j=h;h=null}var e=b.extend({},b.tinysort.defaults,j);var p={};this.each(function(t){var v=(!h||h=="")?b(this):b(this).find(h);var u=e.order=="rand"?""+Math.random():(e.attr==""?v.text():v.attr(e.attr));var s=b(this).parent();if(!p[s]){p[s]={s:[],n:[]}}if(v.length>0){p[s].s.push({s:u,e:b(this),n:t})}else{p[s].n.push({e:b(this),n:t})}});for(var g in p){var d=p[g];d.s.sort(function k(t,s){var i=t.s.toLowerCase?t.s.toLowerCase():t.s;var u=s.s.toLowerCase?s.s.toLowerCase():s.s;if(c(t.s)&&c(s.s)){i=parseFloat(t.s);u=parseFloat(s.s)}return(e.order=="asc"?1:-1)*(i<u?-1:(i>u?1:0))})}var m=[];for(var g in p){var d=p[g];var n=[];var f=b(this).length;switch(e.place){case"first":b.each(d.s,function(s,t){f=Math.min(f,t.n)});break;case"org":b.each(d.s,function(s,t){n.push(t.n)});break;case"end":f=d.n.length;break;default:f=0}var q=[0,0];for(var l=0;l<b(this).length;l++){var o=l>=f&&l<f+d.s.length;if(a(n,l)){o=true}var r=(o?d.s:d.n)[q[o?0:1]].e;r.parent().append(r);if(o||!e.returns){m.push(r.get(0))}q[o?0:1]++}}return this.pushStack(m)}});function c(e){var d=/^\s*?[\+-]?(\d*\.?\d*?)\s*?$/.exec(e);return d&&d.length>0?d[1]:false}function a(e,f){var d=false;b.each(e,function(h,g){if(!d){d=g==f}});return d}b.fn.TinySort=b.fn.Tinysort=b.fn.tsort=b.fn.tinysort})(jQuery);
var cssRules="body{opacity:0.2}body.ytnEnabled{opacity:1}.watch-headline, #watch-headline, #watch-video, #watch-main, #watch-search {width:100%;}#watch-actions .action-bar-ratings-stats{border-color:#ddd;margin-left:-14px;}#watch-panel #watch-actions-left .likes-bar{border-color:#698a14;background:#aada37;}#watch-panel #watch-actions-left .dislikes-bar{border-color:#881811;background:#cf362f;}#watch-url-embed-wrapper,#watch-channel-brand-cap,#watch-channel-brand-div,#watch-info-shmoovie-sidebar,#watch-info,#charts-selector,#watch-branded-actions,.watch-flagging{ display:none;}#charts-selector{margin:13px 7px 0;}#charts-selector button{margin-left:3px}#charts-selector button.go{border-color:orange;:8pxmargin-left}#watch-main-area{ border:none;}#watch-video-container-info.wide,#watch-rating-div,#footer,#watch-rating-div #ratingWrapper,#watch-channel-discoverbox{ width:auto;}#watch-panel{margin:0 10px;width:auto;float:none;}#masthead-container{text-align:right;border:none;}#masthead-container a.headcoll.l{margin:0px 10px 0px 7px;}#masthead-search{ margin-right:4.5em;}#watch-video-container{}#watch-video-container-info{ width:84%;margin-bottom:30px;}.watch-wide-mode .tabs > a{padding:8px 3px;}#watch-video.wide #rightSideContent{display:none}#watch-video{ width:auto;}#watch-channel-videos-panel,#watch-comments-footer-table,#watch-video-response,#watch-shows-movies-rating,#promos,#footer .search,#masthead,#footer .region-and-language-pickers,#watch-video-container-info .yt-uix-expander,#newContent .video-list-item .video-username,#watch-channel-discoverbox,#newContent.user #watch-related,#watch-related,#watch-result-discoverbox,#watch-feed-discoverbox,#watch-discoverbox-wrapper,#watch-description .watch-extra-info,#watch-discussion,#watch-main-area,#watch-discussion .comments-pagination button,#watch-discussion .comments-pagination .yt-uix-pager-link,#watch-actions-center,#watch-actions-left button,#watch-views .watch-expander-body,.watch-module,#watch-views br,#comments-post,#watch-description button,#watch-sidebar,#watch-headline-user-info,.footer-links,.video-actions button,.watch-discoverbox-more-link,#watch-url-div,#watch-stats-data-wrapper{ display:none;}#watch-headline{padding:0 0 5px;}#rightSideContent{ float:right;padding:0 4px;position:relative;z-index:99;background-color:#fff;}#rightSideContent,#srchOpt{width:32%}#watch-container{ padding:1px 5px 1px 10px;}#watch-related,#watch-result-discoverbox,#watch-feed-discoverbox,#watch-discussion,#watch-channel-discoverbox{ margin:0;height:auto !important;overflow:auto;padding:15px 0 60px 5px;border:1px solid #d3d3d3;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;}#watch-views button{ margin-left:5px;}#watch-actions{width:66%;text-align:center;height:auto;padding-bottom:0;}#watch-views,#watch-actions-left,#watch-actions-right{ margin-top:-4px;}span.l,span.m{float:right;}.yt-uix-expander-collapsed span.l,span.m{ display:none;}.yt-uix-expander-collapsed span.m,span.l{ display:inline;}#eow-description-short{ max-height:inherit;overflow:hidden;}.yt-uix-expander-collapsed #eow-description-short{ max-height:105px;white-space:normal !important;height:auto !important;}#watch-video-details{ padding-bottom:7px;}#newContent{ xmargin-top:-10px;}#newContent.related #watch-related,#newContent.results #watch-result-discoverbox,#newContent.feed #watch-feed-discoverbox,#newContent.comments #watch-discussion,#newContent.user #watch-channel-discoverbox,#newContent.user .watch-discoverbox-more-link.user,#newContent.results .watch-discoverbox-more-link.results,#newContent.related .watch-discoverbox-more-link.related{ display:block;}.mini-list-view .video-main-content{ width:auto;padding-left:0;}#newContent .video-list-item{ float:left;margin:4px 5px;padding:5px 6px;width:135px;height:125px;clear:none;list-style:none;}#watch-related .video-list-item{ height:140px;}#newContent .video-list-item .title{ width:auto;max-height:inherit;overflow:visible;font-weight:bold;}#newContent .video-list-item .video-time{ color:yellow !important;}#newContent .video-list-item.active,#newContent .video-list-item.been-there.active,#newContent .video-list-item.been-there{ border:1px solid red;padding:4px 3px;}#newContent .video-list-item.been-there{ background-color:#DDFF99;border-color:#ddd;}#newContent .video-list-item a img{ border:1px solid #4d4c4c;}#newContent .video-list-item .video-thumb,#newContent .video-list-item img.vimg90{ width:auto;height:auto;}.video-main-content{ padding-top:3px;}.video-mini-title{ max-height:inherit;}.video-view-count{ color:#777;}.tabs{ margin-bottom:-1px;}.tabs a.active{ background-color:#fff;color:#888888;}.tabs > a{ text-decoration:none;background-color:#eee;font-size:16px;font-weight:bold;line-height:34px;margin:0 0 2px;padding:8px;border:1px solid #ccc;border-width:1px 0 0 1px;}.tabs > a small{ color:#999999;font-size:x-small;padding-left:4px;vertical-align:top;}.tabs > a:nth-child(4){ border-width:1px 1px 0;}.tabs > a:last-child{ border-width:1px 1px 0px 0;}.tabs span{ float:right;padding-top:8px;}#newContent.comments .tabs span{ display:none;}.tabs span a{ background-color:#EEEEEE;padding:1px 4px;margin-left:4px;}#newContent.comments .expander-small{ border:none;}#rightSideContent .search-form{ -moz-border-radius:3px;background:#EAEAEA none repeat scroll 0 0;border:1px solid #CCCCCC;line-height:2em;margin:0 0 0.6em;padding:0.15em 0.2em;white-space:nowrap;}#rightSideContent .search-form button{height:auto;padding:5px 3px;}#rightSideContent form p{border:none;}#rightSideContent .search-term{-moz-border-radius:3px;border:1px solid #999999;font-size:100% !important;height:1.5em;padding:3px 1px;vertical-align:top;color:#999;width:98%;}#rightSideContent .search-term-focus{ border:2px solid #BBDAFD !important;margin-top:0;margin-bottom:0;padding-right:1px;padding-left:1px;color:#000;}#rightSideContent .search-form .yt-button{font-size:0.92308em;margin:0.0833em 0;vertical-align:top;}#watch-result-discoverbox ._loadingInfo{ display:none;}.headcoll,.historyContainer > a{ background:url(http://s.ytimg.com/yt/img/master-vfl181572.png) -36px -754px no-repeat;padding:1px 22px 1px 1px;}.historyContainer > a{ padding-right:11px;margin:1px;display:none;}.historyContainer > a.l{ background-position:-2px -637px;margin-right:3px;}.historyContainer > a.r{ background-position:-12px -637px;}.headcoll{ background-position:0px -756px;padding:0 0 0 16px;line-height:20px;}.headcoll.l{ background-position:-18px -683px;}#grabVideos{ margin:15px 0px 5px 0px;border-collapse:separate;width:100%;border-bottom:1px solid #ddd;}#grabVideos th{ background-color:#DDD;padding:4px 0;text-align:center;font-size:122%;}#grabVideos td{border:1px solid #ddd;padding:7px 8px;color:#999;}#grabVideos._3gp td._3gp,#grabVideos.small td.small,#grabVideos.large td.large,#grabVideos.medium td.medium,#grabVideos.hd720 td.hd720,#grabVideos.hd1080 td.hd1080{ color:blue;cursor:pointer;}#grabVideos td.hd1080x{ display:none;}#grabVideos caption{ text-align:left;font-size:16px;border:1px solid #ddd;border-width:1px 1px 0;text-transform:capitalize;padding:7px 5px 8px 5px;}#grabVideos caption span,.yhistory span{ background:transparent url(http://s.ytimg.com/yt/img/master-vfl181572.png) no-repeat -137px -755px;background:transparent url(http://s.ytimg.com/yt/img/master-vfl181572.png) no-repeat -19px -567px;padding:0 9px 0 10px;margin-right:4px;}#grabVideos caption small{ color:#6E6E6E;display:block;font-size:x-small;white-space:pre;text-indent:25px;}#grabVideos .divider{ background-color:#f1f1f1;background-color:#fff;border:none;}#_loadingInfo,._loadingInfo,.tabs a.waiting small{ background:#FFF3B3 url(http://s.ytimg.com/yt/img/icn_loading_animated-vfl24663.gif) center left no-repeat;}.tabs > a.waiting small{ padding:4px 4px 4px 22px;background-color:transparent;}#_loadingInfo,._loadingInfo{ border:1px solid #FED81C;padding:3px 6px 3px 23px;font-size:12px;margin-bottom:5px;}#_loadingInfo.visible{ visibility:visible;}#_loadingInfo.info.related.comments.user,#_loadingInfo{ visibility:hidden;}#_loadingInfo.user .user,#_loadingInfo.related .related,#_loadingInfo.comments .comm,#_loadingInfo.info .info{ text-decoration:line-through;color:#666;}.humanized_msg{ position:fixed;width:100%;color: white;background-color:#8CC63F;font-size:31pt;text-align:center;opacity:0.85;bottom:0;left:-10px;padding:10px 4px;z-index:999;display:none;}.humanized_msg p{ padding:10px 54px;display: inline;background-color:#8CC63F;}.yhistory{ cursor:pointer;padding:5px 7px 8px 8px;background-color:#eee;}.ytSettings{ padding:3px 0;background-color:#eee;margin:2px 0;}.ytSettings label input{ position:relative;top:3px;}p.info{ background-color:#eee;padding:3px 2px;margin-bottom:9px;}#masthead p.info{ float:right;margin:-6px -13px 0px 0;}.yhistory:hover,.headcoll:hover{ text-decoration:none;}.yhistory span{ background-position:-40px -62px;padding:0 7px;}.historyContainer{ border:1px solid #DDD;background-color:#eee;overflow:hidden;margin-bottom:2px;display:none;padding-bottom:4px;text-align:right;padding:4px 3px 4px 0;-moz-border-radius:3px;}.historyContainer{ box-shadow:0 0 8px #aaa;-moz-box-shadow:0 0 8px #aaa;-webkit-box-shadow:0 0 8px #aaa;}.historyContainer,#watch-info{ width:65%;}#_loadingInfo{ width:610px;}#watch-info{ margin-bottom:0;border:none;}.yt-uix-expander-collapsed #watch-info{ border:1px solid #DDD;}#watch-info.expanded{box-shadow:0 0 4px rgba(0,0,0,0.3);margin-top:8px;padding:0;}#watch-player{width:65%;margin:0 0 8px 5px;padding:2px 2px 0 2px;background:black !important;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px}#watch-player.shadow{box-shadow:0 0 18px #333;-moz-box-shadow:0 0 18px #333;-webkit-box-shadow:0 0 18px #333;}.historyContainer div{ width:1000px;height:70px;float:right;overflow:hidden;margin-bottom:2px;}.historyContainer div a{ float:right;}.historyContainer img{ margin:0 2px;height:64px;background-color:#fff;padding:3px;}.historyContainer a:first-child{}.historyContainer a:first-child img{ height:60px;border:3px solid red;padding:1px;}.watch-view-count{ xfont-size:100%;margin-right:3px;}#footer{padding:10px 0 10px 10px;}#footer .appInfo{float:right;font-size:12px;}#footer .appInfo a{font-weight:bold;}#footer-container{ margin-top:30px;}.video-thumb,.video-thumb .img{ width:123px;height:82px;}.video-thumb .img img{width:100%;}#newContent .yt-uix-pager{ padding:20px 20px 0 0;text-align:right;clear:both;}#newContent #watch-result-discoverbox .yt-uix-pager{ padding-top:60px;}#newContent #watch-result-discoverbox .yt-uix-pager:first-child{padding-top:20px;}#newContent .yt-uix-pager button{ margin:1px 3px;}#newContent .yt-uix-pager button.loading{ background:url(http://s.ytimg.com/yt/img/icn_loading_animated-vfl24663.gif) center center no-repeat;}#watch-description .watch-expander-body{height:auto !important;display:none;}#watch-description{background:#fff; margin:6px 0;}#onHoverPlayer{ width:123px;height:83px;margin-top:5px;overflow:hidden;position:absolute;visibility:hidden;}#onHoverPlayer div{ position:absolute;height:100%;width:100%;}#onHoverPlayer object{ width:154px;height:128px;margin-top:-25px;}#srchOpt{float:right;margin:2px 4px 0 0;font-size:86%;display:none;}#srchOpt strong{background-color:#ddd;padding:9px 0 3px 4px;}#watch-actions-area-container{width:66%;}#watch-actions-right{float:left;margin-left:23px;}#masthead{margin:0 12px 12px;width:auto;}#watch-embed-code{width:80%;height:91px;}.embedCodeReady{float:right;font-weight:bold;height:auto;padding:5px 9px;text-align:left;}.embedCodeReady span{color:red;}#rightSideContent .search-form label{border:none;margin:0;}";
  //
 // all systems go!
//
/youtube.com$/.test(document.domain) && initDOM(jQuery,{
  appVer:1.4,
  sticky:false,
  maxSearch:50,
  maxChannel:50,
  maxRelated:40,
  searchOrder:'relevance'
});