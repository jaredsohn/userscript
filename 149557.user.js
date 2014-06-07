// ==UserScript==
// @name       Drawception Profile enhancement
// @author     Talon
// @namespace  http://drawception.com/player/204803/talon/
// @version    0.15
// @description  Various additions to the profile page that makes life easier for the average Drawceptionist!
// @include    http://drawception.com/player/*
// @include    http://drawception.com/viewgame/*
// @include    https://drawception.com/player/*
// @include    https://drawception.com/viewgame/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
	/**
	 * nyan nyan nyan nyan nyan nyan nyan nyan
	 * .,__,.........,__,...... ______
	 *  `·.,¸,.·*¯`·.,¸,.·*¯..|:::::::/\_/\
	 *   `·.,¸,.·*¯`·.,¸,.·*¯<|::::::( o wo)
	 * -........--""-.......--"u"'''''u''u
	 * nyan nyan nyan nyan nyan nyan nyan nyan */
// use the available jQuery
$ = unsafeWindow.jQuery;
// dragable script
(function(e){e.fn.drags=function(t){t=e.extend({handle:"",cursor:"default"},t);if(t.handle===""){var n=this}else{var n=this.find(t.handle)}return n.css("cursor",t.cursor).on("mousedown",function(n){if(t.handle===""){var r=e(this).addClass("draggable")}else{var r=e(this).addClass("active-handle").parent().addClass("draggable")}var i=r.css("z-index"),s=r.outerHeight(),o=r.outerWidth(),u=r.offset().top+s-n.pageY,a=r.offset().left+o-n.pageX;r.css("z-index",1e3).parents().on("mousemove",function(t){e(".draggable").offset({top:t.pageY+u-s,left:t.pageX+a-o}).on("mouseup",function(){e(this).removeClass("draggable").css("z-index",i)})});n.preventDefault()}).on("mouseup",function(){if(t.handle===""){e(this).removeClass("draggable")}else{e(this).removeClass("active-handle").parent().removeClass("draggable")}})}})(unsafeWindow.jQuery);
    
// arrays which will be filled with the localStorage info
var playedgames = [],playedgameslikes = [],open_urls = [],open_captions = [],open_images = [],_open_urls = [],_open_captions = [],_open_images = [];
// will contain the deattached header
var header;
var captionIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2QjgzQTc1RTI5MjA2ODExODhDNkYyQTA0QjlCOEUyMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMTExQTE1MDYzRDUxMUUxOTAzQ0YyNzQzMTJCNDhDMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMTExQTE0RjYzRDUxMUUxOTAzQ0YyNzQzMTJCNDhDMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNDN0E1NjFGNEQyMDY4MTE4OEM2RjJBMDRCOUI4RTIyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZCODNBNzVFMjkyMDY4MTE4OEM2RjJBMDRCOUI4RTIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YaR31wAAAgdJREFUeNpi/P//P8NQBkwMQxyMemDUAyPdAyzkaEpc+hRdKAqIk4HYGIj5qezGO0B8BIg7gPgmSGB+tDRlHkAD04A4k4aBrALFIUDsDMSnqJmEomjseGTAA8SLgJiTmh7IpHOSV4fGBNU8YDYA+daMWh4AZVa2AfCA0Gg9MOoBWlRkBx7+JVXvRyBmJKBGGprpAqFFLvNQiwFQlb0eiOOA2AGIX9OjKeENxEXQkOPBpineRoJY80FV/zIg7l545AWoOeAPxIepGRPIMQAydDUQbwFiJ1yOJ6PiaQTiM0BPg4q/40C8klZJqBS9lqMi0ALiaih7Ga08kEbj/BAOpc/SygOKNPYALOO8G6r1ACzj/hrpFdnHoe6BI0PZA5eBeM1Q9cBTaI3+a6h54D4QTwdibSC+QJVRCSoAbI1AUOdoHbQpAwNbgdhnqJRCoKQRBMQ7yC1G/9LYgX+J9IQ/KZ5A9sAjGnvgEYkxsZtUD6ynsQd2k6D2OzQm9pHigQ5oUUWr9N1Noh6QJ/oIlgawGRpolxI0hAca/bKkouNBDomGxbCDPHV7leilEGgg1QqIlaDpkBIAMmsu1DyaJU8WPJXHfSziC4A4ndotSnq1RiuBOHEwOZ7Ymvg7tA2yZjC2Mwh54BG0OLswWBtKhDxgDsQvBnNLj3F0onvUA6MeGPXAqAcoAQABBgB+IGDbMVuFCQAAAABJRU5ErkJggg==';
// get the location of the page (needed later for identification of on what page we are.
var loc = location.href.split('/');
// if local storage is set, fill the arrays with it
getLocalStorage();
console.log('--- played games arrays ---');
console.log(playedgames);
console.log(playedgameslikes);
console.log('--- open games arrays ---');
console.log(open_urls);
console.log(open_captions);
console.log(open_images);
/*- SETTINGS PER PAGE -*
* ---------------------*
* There are some functions  here below. 
* outline or delete the functions you don't need or like. */
/* --- PLAYER PROFILE PAGES --- */
if(loc[3]=='player'){
    
    var myProfile = (loc[4] == $('#main-nav.container .pull-right .btn-primary').attr('href').split('/')[2]) ? true:false;
    
    if(!myProfile){
        addLikeButtons();
    }
    
    setCustomCss();           // uh.. yeah.. needed..
    prettyHeader();           // Does some tricks to the header
    prettyCover();            // Puts the cover in pretty polaroids, spread out on the wooden background
    prettyAchievements();     // Sorts out double achievements and Iconifies them
    detachHeader();           // Puts the profile information in a seperated header
    prettyXP();               // Changes the layout of the XP bar
	//prettyProgress();         // Games in Progress display more info and a thumbnail
	addLikeReminders();       // Like reminders added to each panel
    
}
/* --- COMPLETED GAME PAGES --- */
if(loc[3]=='viewgame'){
    
	prettyMultipliers();      // Changes the multiplied likes back to their original number of likes
    countLikes();             // Counts the likes, needed for addLikeReminders();
}
/*- PRETTY FUNCTIONS -*
* --------------------*/
/* LIKE BUTTONS ON PROFILES */
function addLikeButtons(){
    $('.thumbnails .thumbpanel-holder').each(function(){
        var holder = this;
        var panelid;
        var action;
        var captionCheck = false;
        var fakeLikeBtn = $(('<a href="#" class="likebutton btn btn-mini pull-right" style="margin-left:5px" rel="tooltip" title="Like"><img src="/img/thumb_up_off.png" width="16" height="16" alt=""></a>')).appendTo($('.pull-right',this));
		var url = $('a.thumbnail',this).attr('href');
        
        if($('a.thumbnail>img',this).length > 0) // it's an image
        { 
            var imgurl = $('a.thumbnail>img',this).attr('src');
            var panelNr = parseFloat(imgurl.charAt( imgurl.length-5 ));
            url = url + ' .span4.panelspan:eq('+(panelNr-1)+')';
		
        } else // it's a caption
        {
            url = url + ' .span4.panelspan';
            captionCheck = true;
            var caption = $('a.thumbnail').html();
        }
        
        $('.likebutton', this).click(function(){
			$(this).append('<div class="loaded" style="display:none"></div>');
			$('.loaded', this).load(url, function(){
                
                if(captionCheck){
                    $('li.span4',this).each(function(){
                        
                        var a = $('.panel-details>a',this).attr('href').split('/')[2];
                        
                        if( a == loc[4]) {
                            $(fakeLikeBtn).attr('id',$('.likebutton',this)[0].id); 
                            panelid = $('.likebutton',this)[0].id.substr(5);
                            action = $('.likebutton',this)[0].title;
                            
                            unsafeWindow.DrawceptionPlay.likePanel(panelid, action);
                        }
                    });
                    
                } else {
				
                    $(fakeLikeBtn).attr('id',$('.likebutton',this)[0].id); 
                    panelid = $('.likebutton',this)[0].id.substr(5);
                    action = $('.likebutton',this)[0].title;
                    unsafeWindow.DrawceptionPlay.likePanel(panelid, action);
                }
				
			});
            // ajax the page, find this panel, init like function.
            console.log('like clicked!');
        });
    });
}
/* PRETTY HEADER */
function prettyHeader(){
    //console.log($('.profile-header'));
    header = $('.profile-header').detach();
    
    var c = 0;
    // give those buttons a new home in the canvas
    var coverBtns = $('.profile-username a').css('position','absolute').each(function(){
        $(this).css(
            {'top': '5px',
             'right': (100 * (c))+5 + 'px'
            }).detach().prependTo('.wrapper');
        c++;
    });
    $('.profile-username').html($('.profile-username').html().replace(/[\n\r\t]/g,''));
    $('.wrapper').css({'overflow':'hidden', 'position': 'relative'});
    $('body>footer').css({'position': 'relative'});
}
/* PRETTY COVER */
function prettyCover(){
    // if someone doesn't want to show their header, stop here
    if($(header).css('display') == 'block'){
        
        var headerurl = $('img', header).attr('src');
        
        $('<div class="header-holder" style="position:absolute; width:20px; height:20px; left:50%; z-index:0;"></div>').prependTo('.wrapper');
        
        for(var i=0; i<12; i++){
            
            var row = i<6 ? i : i - 6;
            var col = i<6 ? 0 : 1;
            var r = Math.floor(Math.random()*(15- -15+1)+ -15);
            
            var wwid = $(unsafeWindow).width()+100;
            var posx = ((wwid/12)*i) - (wwid/2);
            if(i>2 && i<6) posx -= (wwid/4);
            if(i>5 && i<9) posx += (wwid/4);
            
            var posy = Math.floor(Math.random()*600)+40;
            
            var pola = $('<div class="pola"></div>').css({'position': 'absolute',
                                                          'left': posx+'px',
                                                          'top': posy+'px',
                                                          '-webkit-transform':'rotate('+r+'deg)',
                                                          '-moz-transform':'rotate('+r+'deg)',
                                                          '-o-transform':'rotate('+r+'deg)',
                                                          '-webkit-box-shadow': '2px 2px 15px rgba(0, 0, 0, 0.5)',
                                                          '-moz-box-shadow':    '2px 2px 15px rgba(0, 0, 0, 0.5)',
                                                          'box-shadow':         '2px 2px 15px rgba(0, 0, 0, 0.5)',
                                                          'padding':'10px',
                                                          'padding-bottom': '30px',
                                                          'background-color': 'white'
                                                         });
            var roid =  $('<div class="roid"></div>').css({'width':'156px',
                                                          'height':'130px',
                                                          'background-image':'url('+headerurl+')',
                                                          'background-position': (row * 156)+'px '+(col*130)+'px'
                                                         }).appendTo(pola);
            $(pola).drags();
            $('.header-holder').append(pola);
        }
    }
}
/* PRETTY ACHIEVEMENTS */
function prettyAchievements(){
    var achievement;
    
    // icons in Base64
    var playicon =   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOBJREFUeNpiYKAV+P//vwA1zGFCYidQw0AWJPYHoCvnA+mFUL4CFIPAAkZGxgfEGMiI5u0EJEMugCwBYgcg9gcaaEitsDUA4vVA7ADC5LgwHknoIBDLI7kaBDaCXAx1+QUofwLQBx/QXTL/P/ngPkoqAbkMTUEBEYYUQA2Cgf3IBu5HU+xApKvQgQDMQBgAebsBiBWgdAMOl51H4gcgOwRm4HlquBA5p2wkkBoOgGISTWwiECMn9g3osbweh0veg4IAR1jDwHmsZQE0tvcjKepHV4ik5j2UbqBWwYIVAAQYAJHt8dUV5oWvAAAAAElFTkSuQmCC';
    var createicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAQCAYAAAArij59AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIVJREFUeNpiYCAF/P//vx+IA5DFmNDUCACxPy7dCUC8/z8EKGBTcB9JwX5suv9D3XAeynZAVvAeJAJlO0AVrAfxWaBqLgCxA9RomP0XsVmBDAyQFQigSd5HCQdGRsYPQOoBkrsfoCjA4m8F9JAUQBaE8jECChnAA4oFSY0jEvsD0TEMEGAAJCuTp59wf80AAAAASUVORK5CYII=';
    var veticon =    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANxJREFUeNq0kuENgjAQhcH4XzZgBDsCTOAK3UBG0AnQEdhAJ6gbiBPgBuAE9VUf5kKuJJp4yZeH9D2uPZsk/yrv/e7XYOHfVcQ86UzYfUxpWn7btQOGqnZfioCBZCAYN+AIHLXG+hl6AQN20r52xK8G0wBa8gArUIETuLOHIaFJOXa1oOc2nder53GC2uk5rTBclaBVg+IDlTDKqvm+kv7FJD+eec0ZHKhGrEXDhsO5gT1/B2343qh/FSvnJLfUhs8Dw/nc5XC8FFYZZidvnRYOpiyylkUn/Us9BRgAGpXmQJqHfG0AAAAASUVORK5CYII=';
    var supicon =    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALxJREFUeNpiZEAD////dwBSDlDuAkZGxgcMpAKgIQ3/EcCBGD1MDFQAZBkCdGE/1KXzsUkWAPF9JO+cB+IALOr2Q+Xfg/iMUEGQwnyoGgUoBoEDOBwjAKUbgQG/Ad1kGNiP5iJswAGXH4kG2AL2IIlhuwGbIQdINOQghiHAwPlAokEHcMV9AJHBcZ5QIjKAxsx+WPoA0gJAvB4qVkBMSlyPZON7LHkJBBTISfYfSM0TBkhOx+adBGz6AAIMACACO6djOIgSAAAAAElFTkSuQmCC';
    $('<br/>').appendTo('.profile-details .profile-username');
    
    
    // remove all locked achievements
    $('.profile-badges .label').each(function(){
        if($(this).attr('data-original-title').indexOf("LOCKED") != -1){
            $(this).remove();
        }
        else $(this).addClass('badge');
        //console.log($(this).attr('data-original-title'));
      });
    
    var archtypes = ['Play', 'Create', 'Vet Games', 'Supporter'];
    var archicons = [playicon, createicon, veticon, supicon];
    
    // this could be done better...
        for(var i=0; i<archtypes.length;i++){
            var arch = $('.profile-badges .label:contains("'+archtypes[i]+'")');
            if($(arch).length > 0){
                achievement  = $(arch).last().detach();
                $(achievement).html($(achievement).html().replace(/[\n\r\t]/g,'').replace(archtypes[i], '<img style="margin-top:-4px;" src="'+archicons[i]+'" />'));
                $('<sup></sup>').append($(achievement)).appendTo('.profile-details .profile-username');
            }
        }
        $('.profile-badges .label').remove();
        
        $('.profile-details .profile-username i').remove();
    
    $('.profile-details .profile-username sup').css('margin-right', '2px');
    // user info at user info
    $('.profile-badges').css({'margin-top': '-5px', 'font-size': '12px'}).removeClass('profile-badges').addClass('userinfo').appendTo('.profile-player .profile-details');
}
/* DETACH HEADER */
function detachHeader(){
    
    $('<div id="profileHeader" class="container"><div class="row"><div class="span12"></div></div></div>').insertBefore("#main");
    $('.profile-player').css({'margin':'1px', 'box-shadow': 'none'}).appendTo('#profileHeader>.row>.span12');
    
    $("#profileHeader").addClass('header-detached');
}
/* PRETTY XP */
function prettyXP(){
    var lvlstr = $('.profile-details  .user-level-info').html().split(' XP (');
    lvlstr[1] = parseFloat(lvlstr[1].split('to')[0]);
    
    var xp_lvl_percent = parseFloat($('.profile-details .progress .bar').attr('style').split('width: ')[1].split('%;')[0]);
    
    var xp_grand_total = parseFloat(lvlstr[0]);
    
    var xp_lvl_total = Math.round((lvlstr[1]/((100-xp_lvl_percent)/100)));
    var xp_lvl = xp_lvl_total - lvlstr[1];
    
    $('.profile-details  .user-level-info').html(xp_lvl + ' / ' + xp_lvl_total + ' XP ('+ lvlstr[1] + ' XP left)').css('width','233px');
    $('.profile-details .progress').css({'width': '959px',
                                         'height': '21px',
                                         'margin': '0',
                                         'margin-bottom': '-1px',
                                         'padding': '0',
                                         'border-bottom-right-radius': '5px',
                                         'border-bottom-left-radius': '5px'
                                        }).insertAfter('.profile-player');
    var dateStr = $('.profile-player .profile-details .userinfo').html().split('<i class="icon-calendar"></i>')[1].split('<i class="icon-map-marker"></i>')[0];
    var dateSpl = dateStr.split(', ');
    var dateYear = parseFloat(dateSpl[1].substr(0,4));
    var dateMonth = findMonth(dateStr);
    var dateDay = parseFloat(dateSpl[0].match(/\d+/g));
    var joinedDate = new Date(dateYear, dateMonth, dateDay);
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var today = new Date();
    var diffDays = Math.round(Math.abs((joinedDate.getTime() - today.getTime())/(oneDay)));
    var total_games = parseFloat($('.nav.nav-tabs li a:contains("Public Games")').html().match(/\d+/g));
    
    var xp_p_day = xp_grand_total / diffDays;
    var xp_p_panel = xp_grand_total / total_games;
    
    //$('.profile-stats').css('text-align','left').html('');
    $('.profile-username>sup:first').after('<sup style="margin-right: 2px;"><span class="badge" title="Level" style="line-height: 2em;">'+xp_p_panel.toFixed(1)+'XPP</span></sup>');
    $('.profile-username>sup:first').after('<sup style="margin-right: 2px;"><span class="badge" title="Level" style="line-height: 2em;">'+xp_p_day.toFixed(1)+'XPD</span></sup>');
    $('.profile-username>sup:first').after('<sup style="margin-right: 2px;"><span class="badge" title="Level" style="line-height: 2em;">'+xp_grand_total+'XP</span></sup>');
    //$('.profile-stats').append('<span class="label label-info">'+xp_p_day.toFixed(1)+'XPD</span><br/>');
    //$('.profile-stats').append('<span class="label label-info">'+xp_grand_total+'XP</span>');
}
/* PRETTY PROGRESS */
function prettyProgress(){
    
    sortOpenGame();
    
    var friendgameslist = $('#main .span4 ul:not(.games-in-progress) li').detach();
    $('#main .span4 p').first().remove();
    
    // loop through all games
    $('ul.games-in-progress li').each(function(){
		
        //
        var ref = this;
        var playPhrase = '';
        var imgUrl = '';
        var openUrl = $('a',this).attr('href');
        var friendgame = ($(this).attr('data-original-title').indexOf('friend game') > -1) ? true:false;
        var textgame = ($(this).attr('data-original-title').substring(0,10).indexOf('text') > -1) ? true:false;
        
        console.log(textgame);
        // Search in the current array
        var i = $.inArray(openUrl, open_urls);
        // case it doesn't exists
        //if(i == -1 || open_captions[i] == ""){
        if(i == -1){
            
            // add hidden div for the preloading
            var preloaded = $('<div class="preloaded" style="display:none;"></div>').appendTo(this);
            
            // load the content of linking page, but only return everything in .panel-holder class
            $(preloaded).load(openUrl + ' .panel-holder', function(){
                playPhrase = $('.play-phrase', this).html() ? $('.play-phrase', this).html() : $('.panel>div', this).html();
                playPhrase = playPhrase.replace(/[\n\r\t]/g,'');
                imgUrl = $('img', preloaded).attr('src');
                
                if(!textgame){
                    getImageDataURL(imgUrl, function(imgdata){
                    imgUrl = imgdata
                    setOpenGame(ref, playPhrase, imgUrl, openUrl);
                    });
                } else {
                    setOpenGame(ref, playPhrase, '', openUrl);
                }
                
                
                
                /*
                $(this).parent().mouseover(function(){
                    if(!imgUrl) return;
                    
                    var ihtml = '<img src="'+imgUrl+'" width="300" height="250">';
                    
                    if($('div.tooltip.fade.top').html() != ihtml)
                            $('div.tooltip.fade.top').html(ihtml);
                });
//*/
            });
        }else {
            playPhrase = open_captions[i];
            imgUrl = open_images[i];
            setOpenGame(ref, playPhrase, imgUrl, openUrl);
        }
        
        if(friendgame){
            var detached = $(this).detach();
            
            $(friendgameslist).each(function(){
                if($(detached).attr('data-original-title').indexOf($('a', this).html().replace('&lt;','<')) > -1){
                    $('a', this).last().css({'float': 'right', 'font-size':'10px'}).detach().appendTo($('span',detached));
                    console.log($('a', this).last());
                }
            });
            $('#main .span4 ul:not(.games-in-progress)').append(detached);
        }
		
		// add mouseover action to replace the content of the tooltip
        //if(!imgUrl) return;
        /*
        $(this).mouseover(function(){
            var ihtml = '<img src="'+imgUrl+'" width="300" height="250">';
                    
            if($('div.tooltip.fade.top').html() != ihtml)
                 $('div.tooltip.fade.top').html(ihtml);
            });
        //*/
    });
    
    $('#main .span4 ul:not(.games-in-progress)').addClass('games-in-progress').addClass('but-with-friends');
    
    //$('#main .span4 .box-inner').css('max-height', '680px');
    
    setLocalStorage();
}
/* ADD LIKE REMINDERS */
function addLikeReminders(){
// loop though all thumbpanel holders
    $('.thumbnails>li .thumbpanel-holder').each(function(){
		
		// make a new span which carries the number of likes you've given the game
        var liker = $(this).parent().append('<span class="given-likes"></span>').find('.given-likes');
        
		// Filtering out the game hash
        var ur = $('a', this).attr('href').split('/');
		
		// check the position in the array
        var i = $.inArray(ur[2],playedgames);
        
		// if it does exist in the array, add the number
		if(i != -1){
            $(liker).css('display', 'block').html( playedgameslikes[i]);
        } else { // if it doesn't exist, make a tiny yellow block
			$(liker).addClass('no-likes').attr('title', 'Open game to count likes');
		}
    });
}
/* PRETTY MULTIPLIERS */
function prettyMultipliers(){
	// reverse the multipliers
    $('.panel-details>p>span').each(function(){
            var multiplier = parseFloat($('.bonusModifier', this).html());
            var score = parseFloat($('.numlikes', this).html());
            var color = '';
            if(multiplier == 1) return;
            if(multiplier == 2) color = '#03C912';
            if(multiplier == 3) color = '#1190C2';
            if(multiplier == 4) color = '#96009C';
            
            $('.numlikes', this).css('text-shadow', '1px 1px 1px '+ color).html(score/multiplier);
            $(this).attr('data-original-title', score + ' XP');
        console.log($(this));
            $('.bonusModifier', this).remove();
            $('img', this).remove();
    });
}
/* COUNT LIKES */
function countLikes(){
//count likes
    var likes = $('img[src="/img/thumb_up_on.png"]').length;
    
	// Get the id of the game with the game hash
    var gameId = $.inArray(loc[4],playedgames);
	
	// if the game id isn't in the array, push the game hash to the array
    if(gameId == -1){
        playedgames.push(loc[4]);
        playedgameslikes.push(likes);
        gameId = playedgames.length-1;
        setLocalStorage();
    }
    
	// check on mouse movement if there are changes within the number of likes
    $('body').mousemove(function(){
		
		// if there is any change, update the count and the localStorage
        if(likes != $('img[src="/img/thumb_up_on.png"]').length || playedgameslikes[gameId] != $('img[src="/img/thumb_up_on.png"]').length){
            likes = playedgameslikes[gameId] = $('img[src="/img/thumb_up_on.png"]').length;
            setLocalStorage();
        }
    });
    
    // Make game panels clickable
    $('li.span4').each(function(){
        var num = $('.panel-details>p', this).attr('id').split('-')[0];
        var link = 'http://drawception.com/play/panel/'+ num;
        $('.panel', this).css('cursor','pointer').click(function(){
            location.href = link;
        });
    });
}
/*-SUPPORT FUNCTIONS-*
* -------------------*/
/* Finds a 3 character month in a string and returns it's value */
function findMonth(_str){
    var mystr = _str.toLowerCase();
    var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    var month = 0;
    for(var i=0; i<months.length; i++){
        if(mystr.indexOf(months[i]) > -1){
            month = i;
            break;
        }
    }
    return month;
}
/* Creates the Progress formatting */
function setOpenGame(ref, caption, image, ourl){
    $(ref).find('.progress').css('height','4px').before('<span class="caption">' + caption + '</span>');
    if(image !="") {
        $(ref).find('a>div>img').attr('src', image);
    } else {
        $(ref).find('a>div>img').attr('src', captionIcon).addClass('capIcon');
    }
    
    
    _open_urls.push(ourl);
    _open_captions.push(caption);
    _open_images.push(image);
    
    setLocalStorage();
}
function sortOpenGame(){
    var num = $('.games-in-progress>li').length;
    
    $('.games-in-progress>li').each(function(){
        
        $(this).addClass('wide-progress');
        var x_of_y = $(this).find('.progress-bar-info').html().split(' of ');
    
    var percent = (parseFloat(x_of_y[0].match(/\d+/g)) / parseFloat(x_of_y[1].match(/\d+/g)))*100;
    $(this).find('.progress-bar-info').attr('title', percent.toFixed(1));
        
    
    });
    
    var mylist = $('.games-in-progress');
    var listitems = $('.games-in-progress').children('li').get();
    listitems.sort(function(a, b) {
        var compA = $('.progress-bar-info', a).attr('title');
        var compB = $('.progress-bar-info', b).attr('title');
        return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
    });
    listitems.reverse();
    $.each(listitems, function(idx, itm) { mylist.append(itm); });
}
function getLocalStorage(){
    var refresh = false;
    if(window.localStorage.getItem("dc_games") && window.localStorage.getItem("dc_game_likes"))
    {
        playedgames = window.localStorage.getItem("dc_games").split(",");
        playedgameslikes = window.localStorage.getItem("dc_game_likes").split(",");
        if(playedgames.length > 300){
            var sli = playedgames.length - 300;
            playedgames = playedgames.slice(sli);
            playedgameslikes = playedgameslikes.slice(sli);
        }
    }
    else { // if this is the first time ever using this script, make the localStorage variables exist
        refresh = true;
    }
	
	if(window.localStorage.getItem("dc_open_urls") && window.localStorage.getItem("dc_open_captions") && window.localStorage.getItem("dc_open_images")){
       open_urls = window.localStorage.getItem("dc_open_urls").split(','); 
       open_captions = window.localStorage.getItem("dc_open_captions").split('#@#');
       open_images = window.localStorage.getItem("dc_open_images").split('#@#');
    }else{
        refresh = true;
    }
    if(refresh){
        setLocalStorage();
    }
}
function setLocalStorage(){
    window.localStorage.setItem("dc_games", playedgames);
    window.localStorage.setItem("dc_game_likes", playedgameslikes);
    window.localStorage.setItem("dc_open_urls", _open_urls);
    window.localStorage.setItem("dc_open_captions", _open_captions.join('#@#'));
    window.localStorage.setItem("dc_open_images", _open_images.join('#@#'));
}
function getImageDataURL(url, success) {
    var data, canvas, ctx;
    var img = new Image();
    img.onload = function(){
        // Create the canvas element.
        canvas = document.createElement('canvas');
        canvas.width = 60;
        canvas.height = 50;
        // Get '2d' context and draw the image.
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 60, 50);
        // Get canvas data URL
        try{
            data = canvas.toDataURL();
            success(data);
        }catch(e){
            console.log(e);
        }
    }
    // Load image URL.
    try{
        img.src = url;
    }catch(e){
        error(e);
    }
}
function setCustomCss(){
    $("<style type='text/css'>"+
      
      " #main.container {\
            position: relative;\
        }"+
      
      " #profileHeader.header-detached{\
            position: relative;\
            z-index: 2;\
            margin-bottom: 20px;\
            padding-bottom: 0px;\
            background: #FDFDFD;\
            text-shadow: 1px 1px 0px white;\
            border: 1px solid silver;\
            -webkit-border-radius: 5px;\
            -moz-border-radius: 5px;\
            border-radius: 5px;\
            -webkit-box-shadow: 2px 2px rgba(0, 0, 0, 0.8);\
            -moz-box-shadow: 2px 2px rgba(0, 0, 0, 0.8);\
            box-shadow: 2px 2px rgba(0, 0, 0, 0.8);\
        }"+
      
      " .games-in-progress li.wide-progress {\
            width: 90%;\
            padding: 9px 9px 9px 0px;\
            border: 1px solid lightSteelBlue;\
            margin-bottom: 10px\
        }"+
      
      " .wide-progress .progress-bar-info{\
            margin: 0;\
            color: #000;\
            font-size: 7px;\
            text-shadow: none;\
        }"+
      
      " .wide-progress a>div>img{\
            width:60px;\
            height:50px\
        }"+
      
      " .wide-progress a>div>img.capIcon{\
            width:48px;\
            height: 48px;\
            margin: 2px 11px 2px 6px;\
        }"+
      
      " .wide-progress span.caption{\
            display:inline-block;\
            width:72%;\
            height:40px;\
            overflow:hidden;\
        }"+
      
      " .given-likes{\
            font-size: 8pt;\
            text-shadow: 0px 0px 3px #000;\
            text-align: center;\
            color: white;\
            margin-left: 3px;\
            display: none;\
            width: 18px;\
            height: 18px;\
            position: relative;\
            bottom: 150px;\
            left: 130px;\
            background-color: #0E90D2;\
            background-image: -moz-linear-gradient(top, #149BDF, #0480BE);\
            background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#149BDF), to(#0480BE));\
            background-image: -webkit-linear-gradient(top, #149BDF, #0480BE);\
            background-image: -o-linear-gradient(top, #149BDF, #0480BE);\
            background-image: linear-gradient(to bottom, #149BDF, #0480BE);\
            background-repeat: repeat-x;\
            border: 1px solid grey;\
            border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\
            -webkit-border-radius: 10px;\
            -moz-border-radius : 10px;\
            border-radius: 10px;\
        }"+
      
      " .given-likes.no-likes{\
            display: inline-block;\
            background-color: #FAA732;\
            background-image: -moz-linear-gradient(top, #FBB450, #F89406);\
            background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#FBB450), to(#F89406));\
            background-image: -webkit-linear-gradient(top, #FBB450, #F89406);\
            background-image: -o-linear-gradient(top, #FBB450, #F89406);\
            background-image: linear-gradient(to bottom, #FBB450, #F89406);\
            background-repeat: repeat-x;\
            width: 6px;\
            height: 6px;\
            bottom: 145px;\
            left: 132px;\
        }"+
      
      "</style>")
        .appendTo("head");
}