// ==UserScript==
// @name          ImageFap enhancer
// @description	  enlarges thumbs, alternate gallery view, enhanced 'my clubs' page on ImageFap
// @include       *imagefap.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require       http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.1/jquery-ui.min.js
// @require       http://layout.jquery-dev.net/download/jquery.layout.min.js
// ==/UserScript==
// imageFapThumbSize.user.js

    var visits = GM_getObject('visits',{});
    var jqLayout; // jQuery Layout-Object

    var pageTracker;
    var threadTimeout = 3000;
    var numThreads = 6;
    var chunksize=100;
    var piccontainer;
    var preload = new Array();
    var pics = new Array();
    var showtimer;
    var idxOffset = 0;
    var debugging=false;
    var randompage=window.location.href.match(/\/random\.php/);
    var gallerypage=window.location.href.match(/\/random\.php|\/gallery\/(.*)|\/gallery\.php\?p?gid=(.*)/);
	if( gallerypage && gallerypage[0] ) gallerypage = gallerypage[0].match(/[0-9]+/);
	    if( gallerypage && gallerypage[0] ) gallerypage = gallerypage[0];
	    else gallerypage = false;
    var myclubspage=window.location.href.match(/\/clubs\/myclubs\.php/)?true:false;
    var clubspage=window.location.href.match(/\/clubs\/index\.php\?cid=(.*)/);
    if( clubspage )
	clubspage=clubspage[1];

    insertCSS();
    main();


    function main() {
	log('payload started');
        resize_thumbs();
        relative_dates();
        if( gallerypage || randompage )
            create_alternate_gallery();
        if( myclubspage )
            enhance_myclubs();
        if( clubspage )
	    save_clubvisit( clubspage );
    }
    function showimg( pic, replace ) {
	$('img',thumbholder).css({borderColor:'#fff'});
	piccontainer.children().css({position:'absolute'}).attr('showing',0);
	piccontainer.show();
	showpic = $('[src='+pic.url+']');
	showpic.css({position:'static'})
 	       .attr('showing',1)
	       .unbind('click')
               .click(function(){
		   window.open(this.src);
               });
	$('img[src="'+showpic.data('thumb')+'"]').css({borderColor:'#f00'});
    }
    function resize_thumbs() {
	$('img').each(function () {
		var s = this.src.search(/\/images\/mini\//);
		if( s != -1 ) {
			$(this).replaceWith('<img border="0" src="'+this.src.replace(/images\/mini\//, "images/thumb/")+'">');
		}
	});
    }
    function relative_dates() {
	dateTimeReg=/([0-9]{2}:[0-9]{2}:[0-9]{2})|([0-9]{4}-[0-9]{2}-[0-9]{2})/;
	dateELs = $('center,span,td').filter(function(){
	    return $(this).children().length==0 && dateTimeReg.test(this.textContent || this.innerText || $(this).text() || "");
	});

	dateELs.each(function(){
		var $this=$(this);
		var $thisText = $.trim($this.text());
	        var values;	
		var postdate = new Date();
		var has_time = $thisText.indexOf(':') !== -1;
		var has_date = $thisText.indexOf('-') !== -1;
		var date_values = $thisText.split('-');
		var time_values = $thisText.split(':');
		if( has_date && has_time ) {
			values = $thisText.split(" ");
			date_values = values[0].split('-');
			time_values = values[1].split(':');
		}
		if( has_date ) {
			postdate.setFullYear( date_values[0] );
			postdate.setMonth( date_values[1] - 1 );
			postdate.setDate( date_values[2] );
		}
		if ( has_time ){
			postdate.setHours( time_values[0] );
			postdate.setMinutes( time_values[1]);
			postdate.setSeconds( time_values[2] );
		}

		var relative_to = new Date();
		var delta = parseInt((relative_to.getTime() - postdate.getTime() ) / 1000 );
//		delta = delta + (relative_to.getTimezoneOffset() * 60);

		var r = '';
		  if (delta < 60) {
			r = delta + 'seconds ago';
		  } else if(delta < (60 * 60)) {
			r = (parseInt(delta / 60)).toString() + ' minutes ago';
		  } else if(delta < (24*60*60)) {
			r = '' + (parseInt(delta / 3600)).toString() + ' hours ago';
		  } else if(delta < (48*60*60)) {
			r = '1 day ago';
		  } else if(delta < (31 * 86400)) {
			r = (parseInt(delta / 86400)).toString() + ' days ago';
		  } else {
			r = '' + (parseInt(delta / (86400 * 30))).toString() + ' months ago';
		  }
		$this.html( r );
		$this.attr('title',$thisText);
	});
    }
    function save_clubvisit( clubid ) {
	log('club '+clubid+' visited');
	dt=new Date();
	visits['club_'+clubid] = dt.getTime();
	GM_setObject('visits', visits); 
    }
    function create_alternate_gallery() {
	var numfound=0;
	$('<div id="south-pane" class="ui-layout-south"></div>').appendTo('body');
	if( gallerypage ) {
	   favlink = $('#gallery').next('a').eq(0);
	   serverPaging=$('#gallery font').eq(0);
           $(':contains(next)',serverPaging).eq(1)
               .addClass('fg-button ui-state-default ui-priority-primary ui-corner-all ui-icon ui-icon-triangle-1-e')
               .replaceWith('').appendTo(serverPaging);
           $(':contains(prev)',serverPaging).eq(1)
                .addClass('fg-button ui-state-default ui-priority-primary ui-corner-all ui-icon ui-icon-triangle-1-w')
                .replaceWith('').prependTo(serverPaging);

           $('.fg-button').hover(function(){ $(this).addClass("ui-state-hover"); }, function(){ $(this).removeClass("ui-state-hover"); });
           $('span',serverPaging).addClass('fg-left');

	   profileLinks = $('#menubar').appendTo('body').append(favlink);
           profileLinks.addClass('ui-layout-north');
	   serverPaging.appendTo('#south-pane');
           $('<div id="pagingtype">paging:<a href="/gallery.php?gid='+gallerypage+'&view=1">server</a> | <a href="/gallery.php?gid='+gallerypage+'&view=2">client</a></div>').appendTo('#south-pane');
	}
	thumbholder = $('<div class="ui-layout-east" id="east-pane"></div>')
			.appendTo($('body'));

	piccontainer = $('<div class="ui-layout-center" id="center-pane"></div>').appendTo($('body'));
        jqLayout=initLayout();
        setInterval(function() {
	    saveOpts={
		east:{size: jqLayout.state.east.size}
	    };
	    GM_setObject('layout',saveOpts);
	}, 1000);
	piccontainer.bind('DOMMouseScroll',function(e){
		var idx = 0;
                var dir = 0;
		$.each(pics,function(i,item){
			lookfor = $('img[showing=1]',piccontainer).attr('src');
			if( item.url == lookfor ) idx=i;
                });

		if( e.detail > 0)
			dir=1;
                  
		else if( e.detail < 0 )
			dir=-1;

		if( showtimer ) {
			clearTimeout( showtimer );
			idxOffset+=dir;
		}
		idx = idx + dir + idxOffset;
		if( idx > pics.length-1)
			idx=pics.length-1;
		else if( idx < 0 )
			idx=0;

		showtimer=setTimeout(function(){
			idxOffset = 0;
			showimg( pics[idx] );
			showtimer = false;
		},25);
			
	        $('img[src="'+pics[idx].thumb+'"]').get(0).scrollIntoView(false);
        });
	
	$('a[href*=image.php?id=]').each(function(){
	    $(this).appendTo(thumbholder);
            $(this).addClass('thumb thumb_initial');
	    var pic = $(this).find('img').eq(0);
	    if( pic.attr && pic.attr('src') ) {
	        var picurl = pic.attr('src').replace(/thumb/,"full" );
                var picobj = {pic:pic,url:picurl,thumb:pic.attr('src')};
		preload.push(picobj);
		pics.push(picobj);
		$(this).mouseover(function(){ showimg(picobj); return false; });
		numfound++;
	    } 
	});
	$('body > center:first-child').remove();
	if( numfound > 0 ) {
		infodiv=$('<div id="infodiv"></div>')
                         .appendTo('#south-pane')
                         .progressbar({ value:0});

		var prev = false;
		var pos_in_chunk=0;
		loadfunction = function( event, timeout ) {
                    log( timeout );
		    try{
		        if( $(this).data('prev') && !timeout ) {
			    $(this).data('prev').pic.parent().addClass('thumb_done').removeClass('thumb_loading');
			}
			$(infodiv).progressbar('option','value',(numfound-preload.length)/numfound * 100);
			if( pos_in_chunk++ < chunksize ) {
			    if(preload[0]) {
				var next=preload.shift();
				next.pic.parent().addClass('thumb_loading').removeClass('thumb_initial');
				var newthread = $(this).clone(true).appendTo(piccontainer)
                                   .data('prev',next).data('thumb',next.thumb)
                                   .attr('src',next.url);
                                setTimeout( function() {
                                    newthread.trigger('load',[true]);
                                },threadTimeout);
			    } else {
//				infodiv.empty().append('done.');
				setTimeout(function(){infodiv.hide();},500);
			    }
			} else {
			    if( !infodiv.data('waiting') ){
				infodiv.append('<br/>continue').bind('click',startLoads);
				infodiv.data('waiting',true);
			    }
			}
		    } catch(e){};
		}
		startLoads = function() {
		    pos_in_chunk=0;
		    infodiv.data('waiting',false);
		    for( var i=0; i < numThreads; i++ ) {
			setTimeout(function(){
                          var thread=img.clone(true).trigger('load');
                          setTimeout(function(){
                              thread.trigger('load',[true]);
                          },threadTimeout);
                        },i*100);
                    }
		}
		try {
			var img = $('<img>')
				   .css({'position':'absolute','left':'-5000px'})
                                   .css({maxHeight:'100%',maxWidth:'100%',marginRight:'255px'})
			           .appendTo(piccontainer);
                             
					
			img.bind('load', loadfunction );
			startLoads();
		} catch(e){ log(e); }
	}
    }
    
    function enhance_myclubs() {
	log( 'i has myclubs' );
        $( "td[width='100%'][valign='top'] table" ).each( function() {
	    var glink=$( "tr:nth-child(2) ;a[href*='clubs/index.php?cid=']", this ).attr( 'href' );
	    if ( glink ) {
		var gid = glink.match( /cid=(.*)/ )[ 1 ];
		var td = $( "tr:nth-child(2) td:nth-child(2)", this );
		var display = $( "tr:nth-child(2) td:nth-child(3)", this );
		td.append( '<div id="club_'+gid+'">');
		var gdiv = $( '#club_' + gid );
		gdiv.data( 'lastvisit', visits[ 'club_'+gid ] );
		gdiv.hide().load( glink + ' font span', {}, function()
                {
		    $('span',this).each(function(){
			if( gdate=this.innerHTML.match(/([0-9]+)-([0-9]+)-([0-9]+) ([0-9]+):([0-9]+):([0-9]+)/) )
			{
			    var clubid = $(this).parent().attr('id');
                            var lastvisit = $(this).parent().data('lastvisit');
			    var lastmod= new Date(gdate[1], parseInt(gdate[2])-1, gdate[3],gdate[4],gdate[5],gdate[6]);
			    display =$(this).parent().parent().parent().children();
			    log( clubid+' lastmod:'+ lastmod.getTime()+ ' lastvisit:'+ lastvisit );
			    if( lastmod.getTime() > lastvisit || lastvisit == undefined )
				display.css({background:'#FFE2C5'});
			    else
				display.css({background:'#e2FFC5'});
				
			    console.log( clubid+' lastvisit: '+lastvisit);
			    console.log( clubid+' lastmod: '+lastmod);
			    $(this).parent().parent().next().append(lastmod.toLocaleString());
			    return false;
			}
		    });
		});
	    }
        });
    }
function initLayout() {
    layoutSettings = { 
        north: {
	    initClosed: true
        },
        south:{
	    size: "30"
        },
	center:{ },
	east:{
	    size: "150"
        }
    };
    savedLayout=GM_getObject('layout',{});
    $.extend( layoutSettings, savedLayout);

    return $('body').layout( layoutSettings );
}

function log( something ) {
    if( debugging )
	console.log( something );
}
function GM_getObject(key, defaultValue) {
        return (new Function('', 'return (' + GM_getValue(key, 'void 0') + ')'))() || defaultValue;
}

function GM_setObject(key, value) {
        GM_setValue(key, value.toSource());
}

function insertCSS() {
    $('head').append('<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.1/themes/humanity/jquery-ui.css" rel="stylesheet" type="text/css">');
    $('head').append('<style id="GM_fapCSS" type="text/css">'+
                     '.fg-button,.fg-left {float:left;} '+
                     '.fg-left .link3, .fg-left b { margin:0 -1px};'+
                     '.clear { clear: both; height:0; line-height:0}'+
                     '.ui-layout-pane {'+
		     '    background: #FFF;'+
		     '    border: 0px solid #BBB; }'+
		     '.ui-layout-pane-east{ overflow-y: scroll }'+
	             '.ui-layout-resizer { background: #DDD; }'+ 
                     '.ui-layout-toggler { background: #AAA; }'+
                     '#south-pane { padding: 5px; font-family: "Arial narrow"}'+
                     '#infodiv { float: right;color:#aaa;background:#fff;width:300px;height:10px;}'+
                     '#pagingtype { float: right;margin-left: 20px;}'+
                     '.thumb { display: block; float: left; border: 1px solid #eee;}'+
		     '.thumb img { border: 3px solid #fff; display:inline; opacity:0; '+
                     '             maxWidth:120px; maxHeight:120px }'+
                     '.thumb_initial { background: transparent url(data:image/gif;base64,'+
			'R0lGODlhEAAQAPEAAP///wAAADY2NgAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdp'+
			'dGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAACLYSPacLtvkA7U64qGb2C6gtyXmeJ'+
			'HIl+WYeuY7SSLozV6WvK9pfqWv8IKoaIAgAh+QQJCgAAACwAAAAAEAAQAAACLYSPacLtvhY7DYhY'+
			'5bV62xl9XvZJFCiGaReS1Xa5ICyP2jnS+M7drPgIKoaIAgAh+QQJCgAAACwAAAAAEAAQAAACLISP'+
			'acLtvk6TE4jF6L3WZsyFlcd1pEZhKBixYOie8FiJ39nS97f39gNUCBEFACH5BAkKAAAALAAAAAAQ'+
			'ABAAAAIshI9pwu2+xGmTrSqjBZlqfnnc1onmh44RxoIp5JpWN2b1Vdvn/ZbPb1MIAQUAIfkECQoA'+
			'AAAsAAAAABAAEAAAAi2Ej2nC7b7YaVPEamPOgOqtYd3SSeFYmul0rlcpnpyXgu4K0t6mq/wD5CiG'+
			'gAIAIfkECQoAAAAsAAAAABAAEAAAAiyEj2nC7b7akSuKyXDE11ZvdWLmiQB1kiOZdifYailHvzBk'+
			'o5Kpq+HzUAgRBQA7AAAAAAAAAAAA) no-repeat center center; }'+
                     '.thumb_loading { background: transparent url(data:image/gif;base64,'+
'R0lGODlhEAAQAPQAAP///wAAAPj4+Dg4OISEhAYGBiYmJtbW1qioqBYWFnZ2dmZmZuTk5JiYmMbGxkhISFZWVgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05F'+
'VFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla'+
'+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr'+
'6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoL'+
'LoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7'+
'baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYA'+
'qrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0Ua'+
'FBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==) no-repeat center center; }'+
                     '.thumb_loading img { opacity:0.5; }'+
                     '.thumb_done { background: transparent}'+
                     '.thumb_done img { opacity:1; }'+
                     '</style>');
}

