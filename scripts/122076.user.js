// ==UserScript==
// @name           AppShopperSmarter
// @description    Extends AppShopper to display images from browse pages, plus automatically filter out apps based on minimum number ratings and minimum average ratings. Also loads five pages at a time, supports hiding apps indefinitely.
// @version        1.5.2
// @match http://appshopper.com/*
// @exclude http://appshopper.com/search/*
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

function thescript() {
    /* jQuery extensions */
    (function( $ ) {
      $.fn.trimFat = function() {
          var minrating = localStorage.getItem("minrating") ? localStorage.getItem("minrating") : 4;
          var minreviews = localStorage.getItem("minreviews") ? localStorage.getItem("minreviews") : 8;
          for(var i=0; i<this.length; i++) {
              var item = $(this[i]);
              var ratingInfo = $(item.children('dl').children('dt')[1]).next().text();
              var score=ratingInfo.substring(0,4);
              var ratingCount = ratingInfo.substring(6, ratingInfo.length-1);
              if (  localStorage.getItem('mute' + item.attr('id')) || (parseFloat(score) < minrating)  || (!parseFloat(score)) || (ratingCount<parseFloat(minreviews)) ) {
                item.hide();
              }
          }
      }
      $.fn.makeMuters = function() {
          this.find('h3.hovertip').after('<button class="muter" title="Don\'t show this app again"></button>');
          $(this).append('<div class="imageexpander"><a href="">Show/Hide Images</a></div>');
      }
    })( jQuery );
    
    // Recursively get pages and add them to the list of apps until reaching the desired number
    function getNextPage(currpage, end) {
        $.ajax({
          url: currpage,
          success: function(data){
            var page = $(data);
            var apps = page.find('ul.appdetails li');
            apps.trimFat();
            apps.makeMuters(); 
            $('ul.appdetails').append(apps);
            if ( currpage < end ) getNextPage(currpage +1, end);
          }
        });
    }

    function addStyle() {
        $('head').append('<style type="text/css">body{background: url(http://noisepng.com/50-90-4.png) #eee;} .wrapper{width: 1000px; background: #fff; border: 1px solid#BBB;} #enhanced_filter h3{font-size:.9em; color:#fff; margin: 0 0 0 10px} #enhanced_filter{background:url("http://appshopper.com/images/style/toolbar.png") left 378px; padding:2px;} #enhanced_filter label{margin:0 10px 0 20px; font-size:.8em; font-weight:bold; color:#fff;text-shadow:1px 1px 1px #888 } #enhanced_filter input, label, select, h3 {display:inline-block} #enhanced_filter input {width:2em} .muter{ position: absolute; top: -8px; right: -2px; background: url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/images/ui-icons_222222_256x240.png) NO-REPEAT -80px -128px #fff; border-radius: 9px; -moz-border-radius: 9px; -webkit-box-shadow: 1px 1px 0px 1px #ccc; -moz-box-shadow: 1px 1px 0px 1px #ccc; cursor: pointer; width: 18px; height: 18px; border: 1px solid #666;} .muter:hover{background-color:#ccc} .content ul.appdetails li{overflow:visible} .imagebox {display:none; margin:0 0 15px 10px; border:1px solid #b3dcfe;} .content ul.appdetails li .imagebox img{width:100px; display:inline-block; position:relative; margin:10px 10px 10px 0; cursor:pointer} .imagebox h4 {margin:5px 10px} #lightbox {-webkit-user-select: none; -moz-user-select: none; position:absolute; width:100%; display:none; z-index:110;} #blind {background-color:#fff; opacity:.9; width:100%; height:100%;} #pictureholder {position:relative; overflow:hidden; display:inline-block;} #lightboxdismisser{ position:absolute;right:53px; cursor:pointer; background-color: #CCC; padding: 2px 4px 0px 5px;} #lightbox img {position:relative; margin-top:28px; border:15px solid white; outline:2px solid #888; cursor:pointer;} #visiblebox {text-align:center;} #thumbs { margin-top:20px;} #thumbs img { border-width:5px; margin:10px;} .imageexpander {font-size:80%; margin:-10px 0 0 10px; cursor:pointer; background:url("http://appshopper.com/images/style/toolbar.png")  left 240px; padding:2px 10px} .imageexpander a {text-decoration: none; color: #1E455E;} .imageexpander a:hover{text-decoration:underline} .spinner{height: 16px; width: 16px !important; display: block !important; margin: 10px auto !important;} .gradient{cursor:pointer; background: -webkit-gradient(linear, left top, left bottom, from(#ddd), to(#aaa)); background: -moz-linear-gradient(top,  #ddd,  #aaa); border:1px solid #aaa; border-radius:4px;-moz-border-radius:4px;} .gradient:hover {background: -webkit-gradient(linear, left top, left bottom, from(#999), to(#bbb));background: -moz-linear-gradient(top,  #999,  #bbb);} .cycler{margin: 10px; padding: 2px; position: relative; top: -5px; font-size: 80%; display: inline-block; width: 55px; cursor: pointer;}  .active{box-shadow: 0px 0px 10px 3px #49a8f3; -moz-box-shadow:0px 0px 10px 3px #49a8f3; } </style>'); 
    }
    
    function makeControls() {
        $('.toolbar').after('<div id="enhanced_filter"><h3>AppShopperSmarter Settings: </h3><label for="min_reviews">Minimum # Reviews:</label><input type="text" id="min_reviews" value="'+localStorage.getItem('minreviews')+'" /><label for="min_rating">Minimum Rating:</label><select id="min_rating"><option value="5">5 Stars</option><option value="4.5">4.5 Stars</option><option value="4">4 Stars</option><option value="3.5">3.5 Stars</option><option value="3">3 Stars</option><option value="2.5">2.5 Stars</option><option value="2">2 Stars</option><option value="1.5">1.5 Stars</option><option value="1">1 Stars</option><option value="0">None</option></select><button type="submit" id="changefilter">Filter</button></div>');
        $('#enhanced_filter option[value="'+localStorage.getItem('minrating')+'"]').attr("selected", "selected");
        $('#changefilter').click(function(){
            localStorage.setItem("minrating", $('#min_rating').attr('value'));
            localStorage.setItem("minreviews", $('#min_reviews').attr('value'));
            window.location.reload();
        });
        $('body').prepend('<div id="lightbox"><div id="blind"></div><div id="visiblebox"><div id="pictureholder"><span id="lightboxdismisser" class="gradient">X</span><span id="prev" class="gradient cycler">Previous</span><img id="focalimg" src="" /><span id="next" class="gradient cycler">Next</span></div><div id="thumbs"></div></div></div>');
        $('#prev').click(function(){
            var p = $('.active').prev();
            p.length ? p.click() : $('.active').siblings().last().click();
        });
        $('#next').click(function(){
            var n = $('.active').next();
            n.length ? n.click() : $('.active').siblings().first().click();
        });
        $('#lightbox').delegate('#thumbs img', 'click', function(){
           setImg($(this)); 
        });
    }
    
    function buildImages(imgurls, extension, el) {
        for (var i=0; i<imgurls.length; i++) {
            var s = imgurls[i];
			var url = s.replace(/[0-9]+x[0-9]+-[0-9]+\.jpg/, extension)
            el.append('<img src="'+url+'" />');
        }
        return el;
    }
    
    function toggleImages(toggle) {
        el = toggle.parent();
        if( !el.children('.imagebox').length ) {
            var imgbox = $('<div class="imagebox"><img class="spinner" alt="" src="data:image/gif;base64,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" /></div>');
            el.append(imgbox);
            var l = $('<div></div>');
            var id = el.attr('id').substring(4);
            $.getJSON('http://itunes.apple.com/lookup?id='+id+'&callback=?', function(data){
                var ssurls = (data['results'][0]['screenshotUrls']);
                var ipadurls = (data['results'][0]['iPadScreenshotUrls']);
                var ipadonlyurls = (data['results'][0]['ipadScreenshotUrls']);
                if(ssurls && ssurls.length){
                     l.append('<h4>iPhone Screenshots</h4>');
                     l = buildImages(ssurls, '320x480-75.jpg', l);
                }
                if(ipadurls && ipadurls.length) {
                    l.append('<h4>iPad Screenshots</h4>');  
                    l = buildImages(ipadurls, '320x480-75.jpg', l); 
                } 
                if(ipadonlyurls && ipadonlyurls.length) {
                    l.append('<h4>iPad Screenshots</h4>')
                    l = buildImages(ipadonlyurls, '480x480-75.jpg', l)
                }              
                imgbox.html(l.html());
            });
        }
        el.children('.imagebox').slideToggle('fast');
    }
    
    function setImg(t) {
        isrc = t.attr('src');
        function slideLeft(f) {
            f.animate({"left": "-500px"}, "fast", function(){f.attr("src",isrc); f.css('left', '500px'); f.animate({"left": "0px"}, "fast");});
        }
        function slideRight(f) {
           f.animate({"left": "500px"}, "fast", function(){f.attr("src",isrc); f.css('left', '-500px'); f.animate({"left": "0px"}, "fast");}); 
        }
        var oldp = t.siblings('.active').index();
        var newp = t.index();
        var dist = 0;
        var f = $('#focalimg');
        
        if (oldp > newp) {
            dist = oldp - newp;
            dist > t.siblings().length/2.0 ? slideLeft(f) : slideRight(f)
        }
        else {
            dist = newp - oldp;
            dist > t.siblings().length/2.0 ? slideRight(f) : slideLeft(f);                
        }
        t.siblings('.active').removeClass('active');
        t.addClass('active');
    }
    
    function lightbox(img) {
        $('#focalimg').click(function(){closeLightbox()});
        var thumbimgs = img.parent().children('img').clone();
        thumbimgs.css('width', '50px');
        thumbimgs.filter('[src='+img.attr('src')+']').addClass('active');
        var thumbs = $('#thumbs').append(thumbimgs);
        var w = $(window);
        setImg(thumbimgs.filter('.active'));
        $('#lightbox').height($(document).height());
        $('#lightbox').fadeIn();
        $('#focalimg').load(function(){
            var imgheight = $('#focalimg').outerHeight();
            var leftoffset = (w.width() - $('#focalimg').width())/2;
            var topoffset = w.height() > imgheight + 20 ? (w.height() - imgheight)/2 : 30;
            $('#visiblebox').offset({top: topoffset + w.scrollTop()});
        });
        $(document).bind('keyup.lightControls', function(e){
            e.preventDefault();
            if (e.which == 27 ) $('#lightboxdismisser').click();
            if (e.which == 37) $('#prev').click();
            if (e.which == 39) $('#next').click();
        });
    }
    
    function closeLightbox(){
        $('#lightbox').fadeOut('fast');
        $('#thumbs').html('');
        $(document).unbind('.lightControls');
    }
    
    function setWatchers() {
        $('ul.appdetails').delegate('.muter','click',function(e){
            var app = $(this).closest('li');
            localStorage.setItem('mute' + app.attr('id'), 'true');
            app.fadeOut();
        });
        $('ul.appdetails').delegate('.imageexpander','click', function(e){e.preventDefault(); toggleImages($(this));})
        $('ul.appdetails').delegate('.imagebox img', 'click', function(){ lightbox($(this));});
        $('body').delegate('#lightboxdismisser','click', function(){ closeLightbox();});
    }
    
    
    function main() {
        setWatchers();
        addStyle();
        makeControls();
        var pagelength = window.location.href.split("").reverse().join("").indexOf('/');
        var pagenum = pagelength ? parseFloat(window.location.href.substring(window.location.href.length-pagelength)) : 1;
        $('ul.appdetails li').trimFat();
        $('ul.appdetails li').makeMuters();
        getNextPage(pagenum+1,pagenum+4);
        var navs = $('div.pages a');
        if (navs.length > 1) {
            var prev = $(navs[0]);
            var next = $(navs[1]);
        }
        else var next = $(navs[0]);
        next.attr('href', pagenum+5);
        if (pagenum > 5) prev.attr('href', pagenum-5);
    }  
    main();
}

(function(){
    exec(thescript);
})();