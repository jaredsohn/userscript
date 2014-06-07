// ==UserScript==
// @name        Geenstijl: bare naked
// @namespace   http://twitter.com/depositado
// @description Strip all unnecessary crap from geenstijl, make it bare naked.
// @include     http://www.geenstijl.nl
// @include     http://www.geenstijl.nl/*
// @version     1.4.3.1
// @require     http://update.sizzlemctwizzle.com/176442.js
// @updateURL   http://userscripts.org/scripts/source/176442.meta.js
// @grant       none
// ==/UserScript==

if (typeof console == "undefined") {
    window.console = {
        log: function () {}
    };
}


// script details/updates
var us_176442_Name      = GM_info.script.name;
var us_176442_Version   = GM_info.script.version;

// first run?
function firstRun(){
    if( $.cookie('us_176442_name') == null){
        //set cookies
        $.cookie('us_176442_name',    us_176442_Name, {expires: 365, path: '/'});
        $.cookie('us_176442_version', us_176442_Version, {expires: 365, path: '/'});    
        console.info('Hi, thanks for using userscript: '+us_176442_Name+' v'+us_176442_Version);
    }
}
function checkIfUpdated(){
    if( $.cookie('us_176442_version') != us_176442_Version){
        //re-set cookies
        $.cookie('us_176442_name',    us_176442_Name, {expires: 365, path: '/'});
        $.cookie('us_176442_version', us_176442_Version, {expires: 365, path: '/'});
        console.info('Userscript updated to version: '+us_176442_Version);
        
        alert('Userscript '+us_176442_Name+' is updated. \n\n You can now use your keyboard to toggle the stylesheets with the T-key.');
        
    }
}

function setActiveCookie(){
    console.info('setActiveCookie()');
    if( $.cookie('us_176442_active') == null){
        console.log('cookie us_176442_active not set');
        //set cookie
        $.cookie('us_176442_active', 'true', {path: '/'}); // session
        console.log('cookie us_176442_active set to true');
    }
}


function responsiveEmbeds(){
    
    console.info('responsiveEmbeds()');
    
    if($.fn.fitVids == undefined) {
        $.getScript('//cdnjs.cloudflare.com/ajax/libs/fitvids/1.0.1/jquery.fitvids.min.js', function(data, textStatus, jqxhr) {
            console.log('Loaded: "fitvids"');
            $('div.embed').fitVids();
        });
    }
}

function convertCommentLinks(){
    
    console.info('convertCommentLinks()');
    
    $('.commentlist a[rel=nofollow]').each(function(e) {
        $(this).html($(this).attr('href'));
    });
}

function linkPreviews(){
    
    console.info('linkPreviews()');
    
    var thumbPrefix,
        previewURL,
        thumbSrc;
    
    if ($('#linkPreviewThumb').length === 0) {
        $('body').append('<div id="linkPreviewThumb"></div>');
    }
    
    $('.artikel a:not(footer a)').hover(
        function () {
            thumbPrefix = 'http://search-geenstijl.thruhere.net/ajax.aspx?q=urlthumb/';
            previewURL = $(this).attr('href');
            thumbSrc = thumbPrefix + encodeURIComponent(previewURL);
            $('#linkPreviewThumb').html('<img class="previewThumb" src="'+thumbSrc+'" />');
        },
        function () {
            $('#linkPreviewThumb img').remove();
        }
    );
}

function loadFullArticle(){
    
    console.info('loadFullArticle()');
    
    var moreLink,
        currArticle;

    $('.artikel a.more').click(function(e) {
            
        e.preventDefault();
        currArticle = $(this).closest('.artikel').attr('id');
        moreLink = $(this).attr('href');
        $(this).before('<p class="loadingArticle" id="more-'+currArticle+'">bezig met laden volledig artikel...</p>');
        
        $('#'+currArticle).load(moreLink+' #content .artikel > *', function() {
            console.log('article loaded');
            linkPreviews();
            responsiveEmbeds();
        });
        
    });

}

function loadComments(){
    
    console.info('loadComments()');
    
    var commentsLink,
        currArticle,
        closeCommentsLink;
      
    $('.artikel a.comments').click(function(e) {
            
        e.preventDefault();
        currArticle = $(this).closest('.artikel').attr('id');
        commentsLink = $(this).attr('href');
        
        console.log('load comments from: '+commentsLink);
        
        closeCommentsLink = '<a href="javascript:;" data-article="'+currArticle+'" data-target="comments-'+currArticle+'" class="close-comments">&#10008; sluit comments</a>';
        
        $(this).closest('.artikel').append('<div class="loadedComments" id="comments-'+currArticle+'"></div>');
        
        $('#comments-'+currArticle).load(commentsLink+' #comments', function() {
            console.log('comments loaded');
            convertCommentLinks();
            linkPreviews();
            $(this).closest('.loadedComments').prepend(closeCommentsLink).append(closeCommentsLink); 
        });
        
    });
}


function toggleScript(){
    
    console.info('toggleScript()');

    if( $.cookie('us_176442_active') == 'true'){
        console.log('active = true, set to false');
        $.cookie('us_176442_active', 'false', {path: '/'}); // session
        
        $('link[rel=stylesheet]').removeAttr('disabled');
        $('link[id=us_176442_css]').attr('disabled', 'disabled');
    } else {
        console.log('active = false, set to true');
        $.cookie('us_176442_active', 'true', {path: '/'}); // session
        
        $('link[rel=stylesheet]').attr('disabled', 'disabled');
        $('link[id=us_176442_css]').removeAttr('disabled');
    }
}


$(function() {  
    
    console.log('userscript loaded: "Geenstijl: bare naked"');
    
    firstRun();
    checkIfUpdated();
    setActiveCookie();
    
    console.info('jQuery: '+jQuery.fn.jquery);
    
    // homepage
    if ($('body.home').length > 0) {
        
        console.log('body.home');
        
        $('link[rel=stylesheet]').attr('disabled', 'disabled');
        //$('link[rel=stylesheet]').remove();
        $('head').append("<link href='//dl.dropboxusercontent.com/u/3899/userscripts/geenstijl-bare-naked/v1.4.min.css' id='us_176442_css' rel='stylesheet' type='text/css'>");
        
        loadFullArticle();
        loadComments();
        
        $('.artikel').delegate('a.close-comments', 'click', function() {
            console.info('close comments:'+ $(this).data('target'));
            $('#'+$(this).data('target')).remove();            
            $('html, body').animate({
                scrollTop: $('#'+$(this).data('article')).offset().top
            }, 500);            
        });
        
        
        if( $.cookie('us_176442_active') == 'false'){
            console.log('us_176442_active = false, disable us styles');
            $('link[rel=stylesheet]').removeAttr('disabled');
            $('link[id=us_176442_css]').attr('disabled', 'disabled');
        }
        
        // hotkey support
    	$(document).keydown(function(e){
    		if (e.keyCode == 84) {  // keyCode: 84 (T)
    			console.debug('keydown (T): '+e.keyCode);
    			toggleScript();
    		}    		
    	});
        
    }
    
    // artikel
    /*
    if ($('body.artikel').length > 0) {        
        console.log('body.artikel');        
        $('link[rel=stylesheet]').attr('disabled', 'disabled');
        $('link[rel=stylesheet]').remove();        
        $('head').append("<link href='//dl.dropboxusercontent.com/u/3899/userscripts/geenstijl-bare-naked/v1.4.min.css' rel='stylesheet' type='text/css'>");       

    }
    */
    
    // onload, maar wél op 't laatst om de boel niet op te houden
    linkPreviews();
    //responsiveEmbeds();
    
    // je klikt maar gewoon
    //setTimeout(function(){ loadMeerrrr(); }, 5000);

});