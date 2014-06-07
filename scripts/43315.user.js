// ==UserScript==
// @name           iconset_chooser.js
// @namespace      http://example.org
// @description    lets you choose between icon sets
// @version        1.0
// @include        http://www.norbits.net/*
// @include        http://norbits.net/*
// @include        https://www.norbits.net/*
// @include        https://norbits.net/*
// ==/UserScript==
(function(){ 
   
   if (location.hostname.indexOf('norbits.net') == -1) {
       return false;
   }
   
   var iconsetImages = {};
   
   function setChosenImageSet(name){
        var img = iconsetImages[name];
        
        if (img) {
            createCookie('chosenContribution', name ,1000000);
        } else {
            eraseCookie('chosenContribution'); 
        }
        
        for(var setName in iconsetImages) {
            if (iconsetImages.hasOwnProperty(setName) ) {
                var cur = iconsetImages[setName];
                if(cur == img) {
                    cur.style.border = '3px dotted white';
                } else {
                    cur.style.border = '3px solid black';
                }
            }
        }

   }
   
   function getNodes(expression, startElement) {
         startElement = startElement || document;
         return document.evaluate( expression, startElement, null,
                                   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
   }
   
   function isFaultyDocument() {     
        return !document.body || (document.body.childNodes[0] && 
           document.body.childNodes[0].nodeName.toLowerCase() == 'pre');
   }
   
   function createStyle(/* { title, url} */ hash){
        var cssText='';
        for(var title in hash) {
            if(hash.hasOwnProperty(title)) {
                var url = hash[title];
                cssText += createStyleFragment(title, url);
            }
        }
        
        return cssText;
   }
   
   function createStyleFragment(title, url){
        return 'img.' + title + '{  padding: 0px;  border: 0px;  background-image: url(' + url +') !important;  }\n';
   }
   
   function appendScriptTag(scriptTag) {
        try {
            if (scriptTag.id != '__preview_script') {
                scriptTag.id = '__preview_script';
            }
            if (scriptTag.type != 'text/css') {
                scriptTag.type = 'text/css';
            }
            
            removeScriptTag();
            document.getElementsByTagName('head')[0].appendChild(scriptTag);
        }catch(ex){ 
            return false;
        }
        
        return true;
   }
   
   function removeScriptTag(){
        var scriptTag = document.getElementById('__preview_script');
        
        if(!scriptTag) {
            return false;
        }
        
        scriptTag.parentNode.removeChild(scriptTag);
   }
   
   function createCookie(name, value, days) {
        var expires = '';
        if (days) {
		    var date = new Date();
		    date.setTime(date.getTime()+(days*24*60*60*1000));
		    expires = "; expires="+date.toGMTString();
        }
	    document.cookie = name + '=' + value+expires + '; path=/';
    }
    
    function readCookie(name) {
	    var nameEQ = name + '=';
	    var ca = document.cookie.split(';');
	    
	    for(var i=0;i < ca.length;i++) {
		    var c = ca[i];
		    while (c.charAt(0)==' ') {
		        c = c.substring(1,c.length);
		    }
		    if (c.indexOf(nameEQ) == 0) {
		        return c.substring(nameEQ.length,c.length);
		    }
	    }
	    return null;
    }

    function eraseCookie(name) {
	    createCookie(name,"",-1);
    }
   
    function createChooser(contributions) { 
        var chooser = document.createElement('div');
        chooser.style.padding = '3px';
        
        
        for(var contrib in contributions) {
            if (contributions.hasOwnProperty(contrib)) {
                var img = new Image();

                img.style.width='42px';
                img.style.height='42px';
                img.style.margin='4px';
                img.style.border='3px solid black';
                img.src = contributions[contrib].mp4;
                img.title = 'Bidrag ' + contrib.toUpperCase();
                chooser.appendChild(img);
                
                //hover effects
                (function(img) {
                    img.addEventListener('mouseover', function () {
                        img.style.opacity = 0.7;
                    }, false);
                })(img);
                
                (function(img) {
                    img.addEventListener('mouseout', function () {
                        img.style.opacity = 1;
                    }, false);
                })(img);
                
                //new border style, set which contribution currently showing
                (function(img, contrib) {
                    iconsetImages[contrib] = img;
                    img.addEventListener('click', function () {
                        //remove selected indicator on the rest
                        setChosenImageSet(contrib);
                        document.getElementById('__preview_status').innerHTML = 'Bidrag ' + contrib.toUpperCase();
          
                    }, false);
                
                })(img, contrib);

                
            }
        }    
        
        var previouslySetImageSetName = readCookie('chosenContribution');
        var status = document.createElement('div');
        
        status.style.fontSize = '15px';
            
        status.appendChild(document.createTextNode('Valgt bidrag: '));
        var statusLabel = document.createElement('span');
        statusLabel.id = '__preview_status';
        //only set label and chosen image if any value read from cookie exist
        if (previouslySetImageSetName !== null && contributions.hasOwnProperty(previouslySetImageSetName) ) {
            setChosenImageSet(previouslySetImageSetName);
            statusLabel.appendChild(document.createTextNode('Bidrag ' + previouslySetImageSetName.toUpperCase() )); 
        } else {
            statusLabel.appendChild(document.createTextNode('Ingen'));
        }
        
        status.appendChild(statusLabel);
        status.appendChild(document.createTextNode(' '));
        
        var resetButton = document.createElement('a');
        resetButton.href = '#reset-iconsets :)';
        resetButton.title= 'reset ikonsettet til standard :)';
        
        resetButton.appendChild(document.createTextNode('(trykk her for reset av ikonsett)') );
        resetButton.addEventListener('click', function (event) {
            setChosenImageSet();
            document.getElementById('__preview_status').innerHTML = 'Ingen';
            event.preventDefault();
            
        }, false);
        status.appendChild(resetButton);
        
        chooser.appendChild(status); 
        
        return chooser;
            
   }
   
   function start(e) {
        try {
            //opera might incoke userscripts on images or source code views
            // prevent this from happening
            if(isFaultyDocument()) {
                return;
            }
            
            var contributions = {
	            a: {
	                mp4: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Amp4.gif',
	                movies:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Axvid.gif',
	                movies_xvid:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Axvid.gif',
	                movies_svcd:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Ampeg.gif', 
	                
	                xvid: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Axvid.gif',
	                filmbluray:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Ablu-ray.gif',
	                x264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Ax264.gif',
	                movies_dvdr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Advdr.gif',
	                musicvideos: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Amusikk-video.gif',
	                TVepisodes: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/ATv-xvid.gif',
	                mpeg: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Ampeg.gif',
	                tvx264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Atv-x264.gif',
	                TVDVDr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/ATv-dvdr.gif',
	                musicmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Amusikk.gif',
	                audiobooks: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/ALydbok.gif',
	                books: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Abok.gif',
	                appzmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Aprogram.gif',
	                games: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_A/Aspill.gif'
	            },
	            
	            b: {
	                mp4: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Bfilm_mp4.gif',
	                
	                movies:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Bfilm_xvid.gif',
	                movies_xvid:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Bfilm_xvid.gif',
	                movies_svcd:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Bfilm_mpeg.gif',
	                
	                xvid: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Bfilm_xvid.gif',
	                filmbluray:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Bfilm_blu-ray.gif',
	                x264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Bfilm_x264.gif',
	                movies_dvdr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Bfilm_dvdr.gif',
	                musicvideos: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Bmusikkvideo.gif',
	                TVepisodes: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Btv_xvid.gif',
	                mpeg: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Bfilm_mpeg.gif',
	                tvx264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Btv_x264.gif',
	                TVDVDr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Btv_dvdr.gif',
	                musicmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Bmusikk.gif',
	                audiobooks: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Blydbok.gif',
	                books: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Be-bok.gif',
	                appzmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Bprogram.gif',
	                games: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_B/Bspill.gif'
	            },       
	     
         	    c: {

                    mp4: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/MP4_iconcopy.gif',
                    

                    movies:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/XVID_ICONcopy.gif',

                    movies_xvid:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/XVID_ICONcopy.gif',

                    movies_svcd:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/MPEG_ICONcopy.gif',

       

                    xvid: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/XVID_ICONcopy.gif',

                    filmbluray:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/BlueRay_ICONcopy-1.gif',

                    x264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/x264_ICONcopy.gif',

                    movies_dvdr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/DVD_iconcopy.gif',

                    musicvideos: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/MVID_ICONcopy.gif',

                    TVepisodes: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/TVXVID_iconcopy.gif',

                    mpeg: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/MPEG_ICONcopy.gif',

                    tvx264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/TVx264_ICONcopy.gif',

                    TVDVDr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/TVDVDR_iconcopy.gif',

                    musicmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/MUSIKK_ICONcopy.gif',

                    audiobooks: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/LYDBOK_ICONcopy.gif',

                    books: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/Ebook_iconcopy.gif',

                    appzmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/PROGS_ICONcopy.gif',
                    games: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_C/SPILL_ICONcopy.gif'

    

                },
                 
	            d: {
	                mp4: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dmp4.gif',
	                      
	                movies:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dxvid.gif',
	                movies_xvid:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dxvid.gif',
	                movies_svcd:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dmpeg.gif',
	                
	                xvid: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dxvid.gif',
	                filmbluray:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dblu-ray.gif',
	                x264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dx264.gif',
	                movies_dvdr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Ddvdr.gif',
	                musicvideos: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dm-video.gif',
	                TVepisodes: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dtv-xvid.gif',
	                mpeg: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dmpeg.gif',
	                tvx264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dtv-x264.gif',
	                TVDVDr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dtv-dvdr.gif',
	                musicmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dmusikk.gif',
	                audiobooks: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dlydbok.gif',
	                books: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Debok.gif',
	                appzmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dapps2dp2.gif',
	                games: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_D/Dspill.gif'
	            },
	            
	            e: {
	                mp4: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Emp4cp5.gif',
	                                      
	                movies:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Exvidxs6.gif',
	                movies_xvid:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Exvidxs6.gif',
	                movies_svcd:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Empegab8.gif',
	                
	                xvid: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Exvidxs6.gif',
	                filmbluray:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Eblurayvw6.gif',
	                x264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Ex264fk6.gif',
	                movies_dvdr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Edvdrbj5.gif',
	                musicvideos: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Emvideoyd3.gif',
	                TVepisodes: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Etvxvidxs7.gif',
	                mpeg: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Empegab8.gif',
	                tvx264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Etvx264yv7.gif',
	                TVDVDr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Etvdvdrco1.gif',
	                musicmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Emusikkno4.gif',
	                audiobooks: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Elydboksm7.gif',
	                books: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Eebokkj6.gif',
	                appzmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Eprogramcu8.gif',
	                games: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_E/Espillbo2.gif'
	            },
	            
	            f: {
	                mp4: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Fmp4.gif',
	                
	                movies:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Fxvid.gif',
	                movies_xvid:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Fxvid.gif',
	                movies_svcd:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Fmpeg.gif',
	                
	                xvid: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Fxvid.gif',
	                filmbluray:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Fblu-ray.gif',
	                x264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Fx264.gif',
	                movies_dvdr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/FDvdr.gif',
	                musicvideos: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Fmvideo.gif',
	                TVepisodes: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Ftvxvid.gif',
	                mpeg: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Fmpeg.gif',
	                tvx264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Ftvx264.gif',
	                TVDVDr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Ftvdvdr.gif',
	                musicmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Fmusikk.gif',
	                audiobooks: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/FLydbok.gif',
	                books: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Fbok.gif',
	                appzmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Fprogram.gif',
	                games: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_F/Fspill.gif'
	            },
	            
	            g: {
	                mp4: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GMP4.gif',
	                
	                movies:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GXvid.gif',
	                movies_xvid:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GXvid.gif',
	                movies_svcd:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GMPEG.gif',
	                
	                xvid: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GXvid.gif',
	                filmbluray:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GBlu-Ray.gif',
	                x264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GX264.gif',
	                movies_dvdr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GDVDR.gif',
	                musicvideos: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GMusikkvideo.gif',
	                TVepisodes: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GTVxvid.gif',
	                mpeg: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GMPEG.gif',
	                tvx264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GTVX264.gif',
	                TVDVDr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GTVDVDR.gif',
	                musicmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GMusikk.gif',
	                audiobooks: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GLydbok.gif',
	                books: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GE-bok.gif',
	                appzmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GProgram.gif',
	                games: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_G/GSpill.gif'
	            },
	            
	            h: {
	                mp4: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Hmp4.png',
	               
	                movies:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Hxvid.png',
	                movies_xvid:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Hxvid.png',
	                movies_svcd:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/H.png',
	                
	                xvid: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Hxvid.png',
	                filmbluray:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Hbluray.png',
	                x264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Hx264.png',
	                movies_dvdr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Hdvdr.png',
	                musicvideos: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Hmvideo3.png',
	                TVepisodes: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Htvxvid2.png',
	                mpeg: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/H.png',
	                tvx264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Htvx264.png',
	                TVDVDr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Htvdvdr2.png',
	                musicmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Hmusikk2.png',
	                audiobooks: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Hlydbok2.png',
	                books: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Hebok2.png',
	                appzmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Hprogram.png',
	                games: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_H/Hspill2.png'
	            },
	            
	            i: {
	                mp4: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Ifilm_mp4.gif',
	               
	                movies:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Ifilm_xvid.gif',
	                movies_xvid:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Ifilm_xvid.gif',
	                movies_svcd:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Ifilm_mpeg.gif',
	                
	                xvid: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Ifilm_xvid.gif',
	                filmbluray:'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Ifilm_blu-ray.gif',
	                x264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Ifilm_x264.gif',
	                movies_dvdr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Ifilm_dvdr.gif',
	                musicvideos: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Imusikkvideo.gif',
	                TVepisodes: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Itv_xvid.gif',
	                mpeg: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Ifilm_mpeg.gif',
	                tvx264: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Itv_x264.gif',
	                TVDVDr: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Itv_dvdr.gif',
	                musicmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Imusikk.gif',
	                audiobooks: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Ilydbok.gif',
	                books: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Ie-bok.gif',
	                appzmisc: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Iprogram.gif',
	                games: 'http://i244.photobucket.com/albums/gg16/SmarterChild/Forslag_I/Ispill.gif'
	            },
	            
	            'Broken Stones': {
	                mp4: '/pic/default/categories/mp4.png',
	               
	                movies:'/pic/brokenstones/categories/cat_movies.gif',
	                movies_xvid:'/pic/brokenstones/categories/xvid.png',
	                movies_svcd:'/pic/brokenstones/categories/svcd.png',
	                
	                xvid: '/pic/brokenstones/categories/xvid.png',
	                filmbluray:'/pic/default/categories/bluray.gif',
	                x264: '/pic/default/categories/x264.gif',
	                movies_dvdr: '/pic/brokenstones/categories/dvdr.png',
	                musicvideos: '/pic/brokenstones/categories/mvideo.png',
	                TVepisodes: '/pic/default/categories/tv_xvid.gif',
	                mpeg: '/pic/brokenstones/categories/cat_movies.gif',
	                tvx264: '/pic/default/categories/tv_x264.gif',
	                TVDVDr: '/pic/default/categories/tvdvdr.gif',
	                musicmisc: '/pic/brokenstones/categories/musikk.png',
	                audiobooks: '/pic/brokenstones/categories/lydbok.png',
	                books: '/pic/brokenstones/categories/ebok.png',
	                appzmisc: '/pic/brokenstones/categories/programvare.png',
	                games: '/pic/brokenstones/categories/spill.png'
	            }
            
            };
            
                
            var tableRow = getNodes('//tr//td[@class="rowhead" and' +
            ' contains(text(), "Utseende")]/..').snapshotItem(0);
                
                
                
            // we are located at my.php, add chooser
            if(tableRow) {             
                var chooser = createChooser(contributions);
                
                var arow = document.createElement('tr');
            
                var cell1 = document.createElement('td');
                cell1.className = 'rowhead';
                cell1.appendChild(document.createTextNode('Velg ikonsett'));
                arow.appendChild(cell1);
            
                var cell2 = document.createElement('td');
                cell2.vAlign='top';
                cell2.align = 'left';
                cell2.appendChild(chooser);
                arow.appendChild(cell2);
            
                tableRow.parentNode.insertBefore(arow, tableRow.nextSibling);
                
            // this is a non-faulty page (=contains html)
            // add extra style
            } else {
                var chosenSetName = readCookie('chosenContribution');
                
                // might be deletet or not set at all
                // don't apply any new style then
                
                if (chosenSetName !== null && contributions.hasOwnProperty(chosenSetName) ) {
                    var imageSet = contributions[chosenSetName];
                
                    var styleText = createStyle(imageSet);
                    var newIconStyle = document.createTextNode( styleText);
                    var injectedStyles = document.createElement('style');
                    injectedStyles.type ='text/css';
                    injectedStyles.id = '__preview_script'; 
                    injectedStyles.appendChild(newIconStyle);
                    appendScriptTag(injectedStyles);
                }
                
            }
          
        }catch(ex) {
            alert('feil: ' + ex);
        }
    }
    
    if(window.opera) {
        window.addEventListener('DOMContentLoaded', start, false);    
    } else {
        window.addEventListener('load', start, false);
    }
})();