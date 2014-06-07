// ==UserScript==
// @name       OCR Bootstrap Responsive
// @namespace  http://dougarley.com/
// @version    1.0
// @description  Bootstrap responsive restyle for OCReMix
// @match      http://ocremix.org/*
// @copyright  2012+, You
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
$(document).ready(function(){
    //0.0 - Add Bootstrap
    $('head').append('<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">');

    //1.0 - Remove old CSS, give elements logical classes and IDs
    var mainContent = $('#main-content').removeClass('main-content');
    //var newMiddleColumn = $('.middle-column-full').removeClass('middle-column-full').addClass('new-middle-column span9');
    if ( document.location.href.indexOf('/remix/') > -1 || document.location.href.indexOf('/forums/') > -1 ) {
            var newMiddleColumn = $('.middle-column-full').removeClass('middle-column-full').addClass('new-middle-column span12');
    } else {
            var newMiddleColumn = $('.middle-column-full').removeClass('middle-column-full').addClass('new-middle-column span8');
    };
    $('div[style="float:right;width:320px;"]').addClass('center-content').css({ 'float' : '', 'width' : ''});
    var rightColumn = $('div[style="margin-right:180px;"]').addClass('right-column span3').css('margin-right', '');
    var previousMixes = $('.right-column .panel-2-white:nth-of-type(4)').addClass('previous-mixes').remove();
    $('.right-column .panel-2-white').addClass('side-box');
    var announcements = $('.right-column .panel-2-white:nth-of-type(1)').addClass('announcements');
    var headlinesTitle = $('.announcements > h2');
    var headlinesContent = $('.announcements > ul');
    $('.announcements').prepend('<div class="row-fluid">');
    var videoContent = $('.announcements div:nth-of-type(2)').addClass('video-content span6').attr('align','');
    $('.video-content iframe').addClass('span11');
    $('.announcements .row-fluid').after('<div class="headlines span6>');
    var socialMedia = $('div[style="text-align:left;margin-left:7px;"]').addClass('social-media span1 hidden-phone').css({'text-align' : '', 'margin-left' : '' });
    $('.social-media a').after('<br />');
    var latestAlbums = $('div.center-content div.panel-2-white:first').removeClass('panel-2-white').attr('id','latest-albums');
    $('div.center-content div.panel-2-white:nth-of-type(2)').attr('id','latest-remixes');
    var missionStatement = $('div[style="margin-right:320px;"] div.panel-2-white:first').attr('id', 'mission-statement');
    $('div[style="margin-right:320px;"]').css('margin-right', '');
    var events = $('div[style="float:right;width:180px;"] div.panel-2-white:first').attr('id', 'events').addClass('side-box').remove();
    $('div[style="float:right;width:180px;"] div.panel-2-white:last').remove();
    $('div[style="float:right;width:180px;"]').css({'float':'','width':''});
    $('div[style="float:left;width:330px;margin:0px;padding:0px;"]').css({'float':'', 'width':'', 'margin':'', 'padding':''});
    // $('#latest-remixes h2').after('<ul>');
    $('div[style="font-size:85%;margin:8px;"]').css({'font-size':'','margin':''});
    var menu = $('.menu').addClass('span2').remove();

    console.log('test');

    //1.5 Make some objects for some custom elements
    var navLinks = [
        {   
            url : 'http://ocremix.org/info/About_Us', 
            title : '', 
            text : 'about' 
        },
        { 
            url : 'http://ocremix.org/forums/',
            title : '', 
            text : 'forums' 
        },
        {
            url : 'http://ocremix.org/games/',         
            title : '', 
            text : 'games' 
        },
        { 
            url : 'http://ocremix.org/remixes/',       
            title : '', 
            text : 'music' 
        },
        { 
            url : 'http://ocremix.org/artists/',
            title : '',
            text : 'people'
        },
        {   
            url : 'http://ocremix.org/workshop',       
            title : '', 
            text : 'workshop'
        }
    ];

    var mainNav = function(links) {
        var navList = $('<ul id="navlinks" class="nav">');
        var out = '';
        
        for (var i = 0; i < links.length; i++) {
            out += '<li><a href="' + links[i].url + '" title="' + links[i].title + '">' + links[i].text + '</a>';
        }
        
        navList.html(out);
        return navList;
    };

    //2.0 Remove some extra things, add some new things
    $('div[style="height:400px;"]').remove();
    $('div[style="width:800px;"]').remove();
    socialMedia.remove();
    announcements.remove();
    rightColumn.remove();

    var mainRow = $('<div id="main-row" class="row">');
    var container = $('<div class="container">');
    var headlines = $('<div class="headlines span6">');

    container.html('<br />');
    mainRow.html('<br />');

    //3.0 Move stuff around
    announcements.prependTo(newMiddleColumn);               //Add announcements to top main column
    headlinesTitle.appendTo(headlines);                     //Add headlines title to headlines 
    headlinesContent.appendTo(headlines);                   //Add headlines content to headlines
    latestAlbums.prependTo(headlines);                      //Add latest albums to headlines
    headlines.prependTo('.announcements .row-fluid');       //Add headlines to announcements row
    videoContent.prependTo('.announcements .row-fluid');    //Add video cta announcements row
    missionStatement.prependTo(newMiddleColumn);            //Add mission statement to top of main column
    previousMixes.appendTo(newMiddleColumn);                //Add "Previously on OCReMix..." too bottom of main column
    events.prependTo(rightColumn);                          //Add events to top of right column

    mainRow.append(socialMedia);                            //Add social media to main row
    mainRow.append(newMiddleColumn);                        //Add main column to main row
    mainRow.append(rightColumn);                            //Add right column to main row

    container.prepend('<div style="height: 100px;"></div>'); //Add spacer for desktop

    container.append(mainRow);                              //Add main row to main container
    container.appendTo(mainContent);                        //Add main container to page
    console.log('test2');
});