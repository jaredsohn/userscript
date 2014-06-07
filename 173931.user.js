// ==UserScript==
// @name        parano YOUpropa
// @namespace   YOUpropa.be
// @description Affiche les vidéos youtube dans les propas, sur les murs et les profils
// @grant       none
// @include     http://www.parano.be/*
// @include     http://www.com.euroot.net/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version     1.5
// ==/UserScript==

var urlActuelle = document.URL;

$(document).ready(function(){
    // I added the video size here in case you wanted to modify it more easily
    var vidWidth = 425;
    var vidHeight = 344;
    var alreadyDisplayed = new Array();
    var obj = '';
    obj = obj + '<object width="' + vidWidth + '" height="' + vidHeight + '">' +
     '<param name="movie" value="http://www.youtube.com/v/[vid]&hl=en&fs=1">' +
     '</param><param name="allowFullScreen" value="true"></param><param ' +
     'name="allowscriptaccess" value="always"></param><em' +
     'bed src="http://www.youtube.com/v/[vid]&hl=en&fs=1" ' +
     'type="application/x-shockwave-flash" allowscriptaccess="always" ' +
     'allowfullscreen="true" width="' + vidWidth + '" ' + 'height="' +
     vidHeight + '"></embed></object> ';
    if(urlActuelle.match(/wall/gi)){
           $laFiche = $('.box_fiche').find('div[class^=background-]:contains("youtube.com/watch?v=")');
            $laFiche.each(function(){
                var firstVid = true;
                var that = $(this);
                var vid = that.html().match(/(?:v=)([\w\-]+)/g); // end up with v=oHg5SJYRHA0
                if (vid.length) {
                    $.each(vid, function(){
                        var idVid = this.replace('v=','');
                        var found = $.inArray(idVid, alreadyDisplayed);
                        if(found == -1){
                            alreadyDisplayed.push(idVid);
                            if(idVid != 'nice_propa'){
                                if(firstVid){
                                    that.append('<br />');
                                    firstVid = false;
                                }
                                that.append( obj.replace(/\[vid\]/g, idVid) );
                            }
                        }
                   });
                }
            });
    }else{
		if(urlActuelle.match(/propaganda/gi)){
		    if(!urlActuelle.match(/index/gi) && !urlActuelle.match(/local/gi) && !urlActuelle.match(/listing/gi)){
		           $laFiche = $('.box_fiche').find('blockquote:contains("youtube.com/watch?v="),p:contains("youtube.com/watch?v=")');
                    $laFiche.each(function(){
                        var firstVid = true;
                        var that = $(this);
                        var vid = that.html().match(/(?:v=)([\w\-]+)/g); // end up with v=oHg5SJYRHA0
                        if (vid.length) {
                            $.each(vid, function(){
                                var idVid = this.replace('v=','');
                                var found = $.inArray(idVid, alreadyDisplayed);
                                if(found == -1){
                                    alreadyDisplayed.push(idVid);
                                    if(idVid != 'nice_propa'){
                                        if(firstVid){
                                            that.append('<br />');
                                            firstVid = false;
                                        }
                                        that.append( obj.replace(/\[vid\]/g, idVid) );
                                    }
                                }
                           });
                        }
                    });
		    }else{
		          $laFiche = $('div[class^=message-] > table > tbody > tr > td:nth-child(3)');
		          $laFiche.prepend('<input type="button" class="aParser" value="Afficher vidéos" />'); 
		    }
		}else{
		    if(urlActuelle.match(/message/gi) || urlActuelle.match(/desktop/gi)){
		        $laFiche = $('.box_fiche').find('.message:contains("youtube.com/watch?v=")');
                $laFiche.each(function(){
                    var firstVid = true;
                    var that = $(this);
                    var vid = that.html().match(/(?:v=)([\w\-]+)/g); // end up with v=oHg5SJYRHA0
                    if (vid.length) {
                        $.each(vid, function(){
                            var idVid = this.replace('v=','');
                            var found = $.inArray(idVid, alreadyDisplayed);
                            if(found == -1){
                                alreadyDisplayed.push(idVid);
                                if(idVid != 'nice_propa'){
                                    if(firstVid){
                                        that.append('<br />');
                                        firstVid = false;
                                    }
                                    that.append( obj.replace(/\[vid\]/g, idVid) );
                                }
                            }
                       });
                    }
                });
		    }else{
		      if(urlActuelle.match(/view/gi)){
		            $laFiche = $('.box_profil').find('blockquote:contains("youtube.com/watch?v="),p:contains("youtube.com/watch?v="),b:contains("youtube.com/watch?v=")');
                    $laFiche.each(function(){
                        var firstVid = true;
                        var that = $(this);
                        var vid = that.html().match(/(?:v=)([\w\-]+)/g); // end up with v=oHg5SJYRHA0
                        if (vid.length) {
                            $.each(vid, function(){
                                var idVid = this.replace('v=','');
                                var found = $.inArray(idVid, alreadyDisplayed);
                                if(found == -1){
                                    alreadyDisplayed.push(idVid);
                                    if(idVid != 'nice_propa'){
                                        if(firstVid){
                                            that.append('<br />');
                                            firstVid = false;
                                        }
                                        that.append( obj.replace(/\[vid\]/g, idVid) );
                                    }
                                }
                           });
                        }
                    });
		      }else{
		            $laFiche = $('.box_fiche').find('blockquote:contains("youtube.com/watch?v="),p:contains("youtube.com/watch?v=")');
                    $laFiche.each(function(){
                        var firstVid = true;
                        var that = $(this);
                        var vid = that.html().match(/(?:v=)([\w\-]+)/g); // end up with v=oHg5SJYRHA0
                        if (vid.length) {
                            $.each(vid, function(){
                                var idVid = this.replace('v=','');
                                var found = $.inArray(idVid, alreadyDisplayed);
                                if(found == -1){
                                    alreadyDisplayed.push(idVid);
                                    if(idVid != 'nice_propa'){
                                        if(firstVid){
                                            that.append('<br />');
                                            firstVid = false;
                                        }
                                        that.append( obj.replace(/\[vid\]/g, idVid) );
                                    }
                                }
                           });
                        }
                    });
		      }
			}
		}
    }
    
    $(document).on("click", "input.aParser", function(){ 
        $laFiche = $(this).parent();
        $laFiche.each(function(){
            var firstVid = true;
            var that = $(this);
            var vid = that.html().match(/(?:v=)([\w\-]+)/g); // end up with v=oHg5SJYRHA0
            if (vid.length) {
                $.each(vid, function(){
                    var idVid = this.replace('v=','');
                    var found = $.inArray(idVid, alreadyDisplayed);
                    if(found == -1){
                        alreadyDisplayed.push(idVid);
                        if(idVid != 'nice_propa'){
                            if(firstVid){
                                that.append('<br />');
                                firstVid = false;
                            }
                            that.append( obj.replace(/\[vid\]/g, idVid) );
                        }
                    }
               });
            }
        });
    });  
    
    
    
    
});