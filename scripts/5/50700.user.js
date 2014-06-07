// ==UserScript==
// @name		ur community link in home page
// @author		SUNNY143
// @description		puts ur community link in ur homepage..edit script source with ur community
// @include	 	http://www.workingtrickz.blogspot.com.com/*
// ==/UserScript==


          window.onerror=function(desc,page,line,chr){
          /* alert('JavaScript error occurred! \n'
            +'\nError description: \t'+desc
            +'\nPage address:      \t'+page
            +'\nLine number:       \t'+line
           );*/
          }
          
          $(function(){
           $('a').focus(function(){this.blur();});
           SI.Files.stylizeAll();
           slider.init();
           mc.init();
          
           $('input.text-default').each(function(){
            $(this).attr('default',$(this).val());
           }).focus(function(){
            if($(this).val()==$(this).attr('default'))
             $(this).val('');
           }).blur(function(){
            if($(this).val()=='')
             $(this).val($(this).attr('default'));
           });
          
           $('input.text,textarea.text').focus(function(){
            $(this).addClass('textfocus');
           }).blur(function(){
            $(this).removeClass('textfocus');
           });
          
           var popopenobj=0,popopenaobj=null;
           $('a.popup').click(function(){
            var pid=$(this).attr('rel').split('|')[0],_os=parseInt($(this).attr('rel').split('|')[1]);
            var pobj=$('#'+pid);
            if(!pobj.length)
             return false;
            if(typeof popopenobj=='object' && popopenobj.attr('id')!=pid){
             popopenobj.hide(50);
             $(popopenaobj).parent().removeClass(popopenobj.attr('id').split('-')[1]+'-open');
             popopenobj=null;
            }
          
            if(pobj.is(':hidden')){
             var _o=$(this).offset();
             //var _l=parseInt(_o.left)-parseInt(_os)+parseInt($(this).width())/2;
             var _l=($('.wrap','#top').offset().left+$('.wrap','#top').width())-pobj.width();
             var _t=parseInt(_o.top)+parseInt($(this).height())+5;
             pobj.css({left:_l,top:_t}).slideDown(function(){
              $('div.close a',pobj).click(function(){
               pobj.slideUp();
               $(popopenaobj).parent().removeClass(pobj.attr('id').split('-')[1]+'-open');
               popopenobj=0;
              });
              var fobj=$('form input.text:first',pobj);
              if(fobj.length)
               fobj.get(0).focus();
             });
             $(this).parent().addClass(pid.split('-')[1]+'-open');
             popopenobj=pobj;
             popopenaobj=this;
            }else{
             pobj.slideUp();
             $(this).parent().removeClass(pid.split('-')[1]+'-open');
             popopenobj=0;
            }
            return false;
           });
           
           $('p.images img').click(function(){
            var newbg=$(this).attr('src').split('bg/bg')[1].split('-thumb')[0];
            $(document.body).css('backgroundImage','url('+_siteRoot+'images/bg/bg'+newbg+'.jpg)');
           
            $(this).parent().find('img').removeClass('on');
            $(this).addClass('on');
            return false;
           });
          
           $(window).load(function(){
            var css_ims=['bar-brand-bg.jpg','bar-brand.html','bar-cms-bg.html','bar-cms.html','bar-crm-bg.html','bar-crm.html',
             'bar-ecommerce-bg.html','bar-ecommerce.html','bar-email-bg.html','bar-email.html','bar-real-estate-bg.html',
             'bar-real-estate.html','bar-seo-bg.html','bar-seo.html','bar-video-bg.html','bar-video.html','bar-web-design-bg.html',
             'bar-web-design.html','blog-large-img-bg.html','blog-tiny-img-bg.html','bookmark.html','bookmarks.html','cal-arrl.html',
             'cal-arrr.html','cal-bg.html','cal-bl.html','cal-br.html','cal-tl.html','cal-tr.html','cal-year.html','close-map.html',
             'close-tabs.html','colours.html','column-third-bg.html','contact-reset.html','content-bg.html','down.html','error.html',
             'feedback-bg.html','feedback.html','file.html','find-out-more.html','footer-bg.html','google.html','h2-award-info.html',
             'h2-awards-and-features.html','h2-careers-form.html','h2-careers.html','h2-cms.html','h2-comment-on-this-video.html',
             'h2-current-positions.html','h2-enquiry-form.html','h2-latest-news.html','h2-london-office-map.html','h2-london-office.html',
             'h2-perth-office.html','h2-post-a-comment.html','h2-recent-posts.html','h4-blog-archive.html','h4-blog-categories.html',
             'h4-recent-posts.html','h4b-blog-archive.html','h4b-blog-categories.html','h4b-calendar.html','h4b-latest-comments.html',
             'h4b-recent-posts.html','header-bg.html','hr.html','li-arrow.html','media-centre-bg.html','media-centre-pulse.html',
             'media-centre-video-bg.html','media-centre-video-hover.html','media-centre.html','nav-bg.html','newsletter-text.html',
             'ontwerp-tag.html','ontwerp.html','popup-client-bg.html','popup-cms-bg.html','popup-toolbox-bg.html','post-your-comments.html',
             'sc-img-bg.html','search-bg.html','text-bg.html','text-small-bg.html','textarea-bg.html','textarea-blog-bg.html',
             'textarea-small-bg.html','toolbox-arrow.html','toolbox-arrow-2.html','toolbox-reset.html','toolbox-save.html','top-bg.html',
             'top.html','view-brand.html','view-cms.html','view-crm.html','view-ecommerce.html','view-email.html','view-real-estate.html',
             'view-seo.html','view-video.html','view-web-design.png'];
            $.each(css_ims,function(){(new Image()).src=_siteRoot+'css/images/'+this;});
            var css_cims=['a2006.png','a2007.html','a2008.html','a2009.html','add-a-comment.html','all-services.html',
             'application-development.html','apps.html','archive.html','calendar.html','comment.html','comments-bg.html',
             'e-com.html','featured.html','feeback-submit.html','get-directions.html','go.html','h4-cms.html','h4-crm.html',
             'h4-otp.html','li-arrow.html','login.html','logo.html','misc.html','nav.html','noresult.html','online.html',
             'pagination-on.html','pagination.html','perma-bg.html','sign-up-now.html','sign-up.html','silde-nav.html',
             'submit-form.html','submit.html','tab-cms.html','tab-crm.html','tab-featured.html','tab-news.html','colour.html',
             'tab-otp.html','tab-video.html','testimonial-bg.html','testimonial.html','user-login.html','web-services.png'];
            $.each(css_cims,function(){
             var css_im=this;
             $.each(['blue','purple','pink','red','grey','green','yellow','orange'],function(){
              (new Image()).src=_siteRoot+'css/'+this+'/'+css_im;
             });
            });
           });
          
           $('p.colours a').click(function(){
            var sheet=document.createElement('link');
            sheet.setAttribute('rel','stylesheet');
            sheet.setAttribute('type','text/css');
            sheet.setAttribute('media','all');
            sheet.setAttribute('href',_siteRoot+'css/'+this.id+'/colour.css');
          
            if($.browser.safari)
             $('head').append(sheet);
            else
             $(document.body).append(sheet);
          
            $(this).parent().find('a').removeClass('on');
            $(this).addClass('on');
            return false;
           });
          
           $('div.bar').slice(1).each(function(){
            $('h2',this).addClass('closed');
            $('div',this).hide();
           });
           $('div.bar h2').click(function(){
            scroll(this,-120);
            $(this).toggleClass('closed').parent().find('div').slideToggle();
           });
           $('#close-tabs').click(function(){
            $('div.bar div:visible').slideUp().parent().find('h2').addClass('closed');
            return false;
           });
           
           function h42h4(obj,t){
            var aobjs=$('div.column-right>*'),sel=false;
            var len=aobjs.length;
            for(var i=0;i<len;i++){
             if(aobjs[i].tagName.toLowerCase()=='h4') sel=false;
             if(sel) switch(t){
              case 's' : $(aobjs[i]).show();break;
              case 'h' : $(aobjs[i]).hide();break;
              case 't' : $(aobjs[i]).toggle();break;
              default : $(aobjs[i]).slideToggle(500);break;
             }
             if(aobjs[i]==obj) sel=true;
            }
            switch(t){
             case 's' : $(obj).removeClass('closed');break;
             case 'h' : $(obj).addClass('closed');break;
             default : $(obj).toggleClass('closed');break;
            }
           }
           var h4rp=unescape(get_cookie('id_blog_pref')||'').split(' ');
           
           $('div.column-right h4').css({cursor:'pointer'}).each(function(){
            if($(this).is('.blog-archive'))
             h42h4(this,'h');
          
           }).click(function(){
            var rel=$(this).attr('class').replace(/\s?closed\s?/,'');
          
            if(!h4rp.in_array(rel))
             h4rp[h4rp.length]=rel;
            else if(h4rp.in_array(rel))
             h4rp.remove(rel);
          
            set_cookie('id_blog_pref',h4rp.join(' '),365,'index.html');
            
            h42h4(this);
           });
           for(var h=0;h<h4rp.length;h42h4($('div.column-right h4.'+h4rp[h++]).get(0),'t'));
           
           var bopen=false,bobj=null;
           var bdhtml='<div id="bkm-d">%links%</div>';
           var blhtml='<a href="%link%" id="bkm-l-%n%">&nbsp;</a>';
           var burl=[
            'http://www.stumbleupon.com/submit?url=%url%&title=%title%&newcomment=&tagnames=',
            'http://del.icio.us/post/?url=%url%&amp;title=%title%&amp;notes=&amp;tags=,',
            'http://www.furl.net/savedialog.jsp?p=1&amp;t=%title%&amp;u=%url%&amp;r=&amp;v=1&amp;c=&amp;topics=&amp;description=&amp;keywords=,',
            'http://digg.com/submit?phase=2&amp;url=%url%&amp;title=%title%&amp;bodytext=&amp;topic=',
            'http://reddit.com/submit?url=%url%&amp;title=%title%',
            'http://www.facebook.com/share.php?src=bm&amp;u=%url%&amp;t=%title%&amp;sharer_popup_message=&amp;v=3',
            'http://technorati.com/faves/?add=%url%'
           ];
           $('p.bookmark a').click(function(){
            if(bopen) 
             bclose();
            if(bobj && bobj==this){
             bobj=null;
             return false;
            }
            bopen=true;
            bobj=this;
            $(this).addClass('on');
            tmp=$(this).attr('rel').split('|');
            var url=tmp[0],title=tmp[1],html='';
          
            for(var n=0;n<burl.length;n++)
            html+=blhtml.replace(/%link%/g,burl[n].replace(/%url%/g,url).replace(/%title%/g,escape(title))).replace(/%n%/g,n);
            html=bdhtml.replace(/%links%/g,html);
          
            $(document.body).append(html);
            var _o=$(this).offset();
            var _l=parseInt(_o.left),_t=_o.top-182;
            $('#bkm-d').css({left:_l,top:_t});
           
            $(document).click(function(e){
             var _obj=e.target,_id=[],close=true;
             while(_obj.parentNode){
              _id[_id.length]=_obj.id;
              _obj=_obj.parentNode;
             }
             for(var q=0;q<_id.length;q++)
              if(_id[q].indexOf('bkm')>-1)
               close=false;
             if(close){
              bclose();
              bobj=null;
             }
            });
           });
           function bclose(){
            if($(bobj).length)
             $(bobj).removeClass('on');
            $('#bkm-d').remove();
            bopen=false;
           }
           
           $('div.sc-large div.img:has(div.tml)').each(function(){
            $('div.tml',this).hide();
            $(this).append('<a href="#" class="tml_open">&nbsp;</a>').find('a').css({
             left:parseInt($(this).offset().left)+864,top:parseInt($(this).offset().top)+1
            }).click(function(){
             $(this).siblings('div.tml').slideToggle();
             return false;
            }).focus(function(){this.blur();}); 
           });
          });
          
          // Other functions -->
          function scroll(obj,offset){
           if(typeof obj.pathname=='undefined'){
            var $target=$(obj);
           }else if(location.pathname.replace(/^\//,'')==obj.pathname.replace(/^\//,'') && location.hostname==obj.hostname){
            var $target=$(obj.hash);
            $target=$target.length&&$target||$('[name='+obj.hash.slice(1)+']');
           }
           if($target.length){
            var targetOffset=$target.offset().top+offset;
            $('html,body').stop().animate({scrollTop:targetOffset},500,'swing');
            return false;
           }
          }
          
          var slider={
           num:-1,
           cur:0,
           cr:[],
           al:null,
           at:10*1000,
           ar:true,
           init:function(){
            if(!slider.data || !slider.data.length)
             return false;
          
            var d=slider.data;
            slider.num=d.length;
            var pos=Math.floor(Math.random()*1);//slider.num);
            for(var i=0;i<slider.num;i++){
             $('#'+d[i].id).css({left:((i-pos)*1000)});
             $('#slide-nav').append('<a id="slide-link-'+i+'" href="#" onclick="slider.slide('+i+');return false;" onfocus="this.blur();">'+(i+1)+'</a>');
            }
          
            $('img,div#slide-controls',$('div#slide-holder')).fadeIn();
            slider.text(d[pos]);
            slider.on(pos);
            slider.cur=pos;
            window.setTimeout('slider.auto();',slider.at);
           },
           auto:function(){
            if(!slider.ar)
             return false;
          
            var next=slider.cur+1;
            if(next>=slider.num) next=0;
            slider.slide(next);
           },
           slide:function(pos){
            if(pos<0 || pos>=slider.num || pos==slider.cur)
             return;
          
            window.clearTimeout(slider.al);
            slider.al=window.setTimeout('slider.auto();',slider.at);
          
            var d=slider.data;
            for(var i=0;i<slider.num;i++)
             $('#'+d[i].id).stop().animate({left:((i-pos)*1000)},1000,'swing');
            
            slider.on(pos);
            slider.text(d[pos]);
            slider.cur=pos;
           },
           on:function(pos){
            $('#slide-nav a').removeClass('on');
            $('#slide-nav a#slide-link-'+pos).addClass('on');
           },
           text:function(di){
            slider.cr['a']=di.client;
            slider.cr['b']=di.desc;
            slider.ticker('#slide-client span',di.client,0,'a');
            slider.ticker('#slide-desc',di.desc,0,'b');
           },
           ticker:function(el,text,pos,unique){
            if(slider.cr[unique]!=text)
             return false;
          
            ctext=text.substring(0,pos)+(pos%2?'-':'_');
            $(el).html(ctext);
          
            if(pos==text.length)
             $(el).html(text);
            else
             window.setTimeout('slider.ticker("'+el+'","'+text+'",'+(pos+1)+',"'+unique+'");',30);
           }
          };
          
          var mc={
           flag:0,
           auto_open:true,
           auto_play:true,
           pulse_go:false,
           hov_html:'<div id="mcdivhover"></div>',
           init:function(){
            if(!$('#media-centre').length)
             return;
          
            if(mc.auto_open && !get_cookie('id_visited')){
             $(window).load(function(){
               setTimeout(function(){mc.toggle(0);},500);
             });
            }
            set_cookie('id_visited','true',365,'index.html');
            if(!get_cookie('id_pclicked')){
             mc.pulse_go=true;
             mc.pulse(1);
            }
            $('#media-centre').css({top:-419});
            $('#media-centre-holder').css({height:0}).show();
            $('#media-centre-tabs a:first').addClass('on');
            $('#'+$('#media-centre-tabs a:first').attr('rel')).show();
          
            $('#media-centre-tabs a').click(function(){
             $('#media-centre-tabs a').removeClass('on');
             $(this).addClass('on');
          
             $('div#media-centre-videos div').hide();
             $('#'+$(this).attr('rel')).show();
            });
          
            $('div#media-centre-videos div p.video').hover(function(){
             $(this).append(mc.hov_html);
             var o=$(this).find('img').offset();
             $('#mcdivhover').show();
            },function(){
             $('#mcdivhover').remove();
            }).click(function(){
             $('div#media-centre-videos div p.video').removeClass('playing');
             $(this).addClass('playing');
             mc.play($(this).find('span.file').html());
             if($(this).is('.ontwerp'))
              $('#ontwerp-tag').fadeIn();
             else
              $('#ontwerp-tag').fadeOut();
            });
          
            $('div#media-centre-videos div p.news').hover(function(){
             $(this).addClass('hover');
            },function(){
             $(this).removeClass('hover');
            }).click(function(){
             location.href=$(this).find('span.url').html();
            });
           },
           toggle:function(pulse_set){
            if(mc.flag) mc.pause();
            if(pulse_set && !get_cookie('id_pclicked')){
             mc.pulse_go=false;
             set_cookie('id_pclicked','true',365,'index.html');
            }
            $('.mca').toggleClass('t');
          
            $('#media-centre-holder').stop().animate({height:mc.flag?0:419},1000,'swing');
            $('#media-centre').stop().animate({top:mc.flag?-419:0},1000,'swing',function(){try{
             if(mc.flag && mc.auto_play){
              var f=$('div#media-centre-videos div p.video:first');
              $('div#media-centre-videos div p.video').removeClass('playing');
              f.addClass('playing');
              mc.play($(this).find('span.file').html());
              if(f.is('.ontwerp')) $('#ontwerp-tag').fadeIn();
              else $('#ontwerp-tag').fadeOut();
              mc.auto_play=false;
             }
            }catch(e){}});
            if($('#pusher').length){
             $('.tml_open').hide();
             $('#pusher div').stop().animate({height:mc.flag?0:419},1000,'swing',function(){
              $('.tml_open').each(function(){
               $(this).show().css({top:$(this).offset().top+((mc.flag?1:-1)*120)});
              });
             });
            }
            set_cookie('id_mc',mc.flag?'closed':'open',30,'index.html');
            mc.flag=!mc.flag;
           },
           play:function(src){
            if(!document.getElementById || !document.getElementById('objectmc'))
             return false;
            document.getElementById('objectmc').playVideo(_siteRoot+src);
           },
           pause:function(){
            if(!document.getElementById || !document.getElementById('objectmc'))
             return false;
            document.getElementById('objectmc').pauseVideo();
           },
           pulse:function(s){
            if(!mc.pulse_go)
             $('#mc-pulse').fadeOut(750);
            else if(s)
             $('#mc-pulse').fadeIn(750,function(){mc.pulse(0);});
            else
             $('#mc-pulse').fadeOut(750,function(){mc.pulse(1);});
           },
           checkHash:function(){
            if(!document.getElementById || !document.getElementById('objectvp'))
             return false;
            var id=location.hash.replace(/[^0-9]/,'');
            if(id!=''){
             setTimeout(function(){
              document.getElementById('objectvp').moveId(id);
              load_comments(id);
             },750);
            }
           },
           live:function(){
            mc.toggle(0);
            if(mc.flag){
             window.setTimeout(function(){mc.play($('p.video:first').attr('rel'));},1100);
             window.setTimeout('mc.live();',42*1000);
            }else
             window.setTimeout('mc.live();',2.5*60*1000);
           }
          };
          
          var cmap={
           is_open:false,
           gmap:false,
           form_id:'contact-form',
           map_id:'contact-map',
           time:750,
           open:function(){
            if(cmap.is_open) return false;
            $('#'+cmap.form_id).fadeOut(cmap.time,function(){
             $('#'+cmap.map_id).fadeIn(cmap.time,function(){
              if(GBrowserIsCompatible() && !cmap.gmap){
               cmap.gmap=true;
               var map=new GMap2(document.getElementById('gmap'));
               var ll=new GLatLng(51.465772,-0.298347);
               map.setCenter(ll,13);
               map.addOverlay(new GMarker(ll));
               map.addControl(new GSmallMapControl());
               map.addControl(new GMapTypeControl());
               cmap.gdir=new GDirections(map,document.getElementById('cmap_dir'));
               GEvent.addListener(cmap.gdir,'error',cmap.handleErrors);
              }
             });
            });
            cmap.is_open=true;
           },
           close:function(){
            if(!cmap.is_open) return false;
            $('#'+cmap.map_id).fadeOut(cmap.time,function(){$('#'+cmap.form_id).fadeIn(cmap.time);});
            cmap.is_open=false;
           },
           directions:function(to){
            cmap.gdir.load('from: Kew Road, Richmond, UK to: '+to,{'locale':'en_UK'});
           },
           handleErrors:function(){
            if(cmap.gdir.getStatus().code==G_GEO_UNKNOWN_ADDRESS)
             alert("No corresponding geographic location could be found for one of the specified addresses. This may be due to the fact that the address is relatively new, or it may be incorrect.\nError code: " + cmap.gdir.getStatus().code);
            else if (cmap.gdir.getStatus().code==G_GEO_SERVER_ERROR)
             alert("A geocoding or directions request could not be successfully processed, yet the exact reason for the failure is not known.\n Error code: " + cmap.gdir.getStatus().code);
            else if (cmap.gdir.getStatus().code==G_GEO_MISSING_QUERY)
             alert("The HTTP q parameter was either missing or had no value. For geocoder requests, this means that an empty address was specified as input. For directions requests, this means that no query was specified in the input.\n Error code: " + cmap.gdir.getStatus().code);
            else if (cmap.gdir.getStatus().code==G_GEO_BAD_KEY)
             alert("The given key is either invalid or does not match the domain for which it was given. \n Error code: " + cmap.gdir.getStatus().code);
            else if (cmap.gdir.getStatus().code==G_GEO_BAD_REQUEST)
             alert("A directions request could not be successfully parsed.\n Error code: " + cmap.gdir.getStatus().code);
            else alert("An unknown error occurred.");
           }
          };
          
          function toolbox_save(){
           if($('#popup-toolbox').length){
            var bg=$('#popup-toolbox img.on').attr('src').split('bg/bg')[1].split('-thumb')[0];
            var colour=$('#popup-toolbox a.on').attr('id');
          
            if($('#toolbox-remember').is(':checked')){
             $.get(_root,{set_bg:bg,set_colour:colour},function(){});
            }
            $('#popup-toolbox').fadeOut();
            $('li.toolbox').removeClass('toolbox-open');
           }
          }
          
          var client_root=_root+'client/';
          function client_login(form){
           $.post(client_root,{user:form.client_user.value,pass:form.client_pass.value},
            function(data){
             if(data=='0') $('#popup-client p.error').fadeIn();
             else location.href=client_root;
            }
           );
          }
          function cms_login(form){
           $.post(_siteRoot+'ajax-login.php',{user:form.cms_user.value,pass:form.cms_pass.value},
            function(data){
             if(data=='0') $('#popup-cms p.error').fadeIn();
             else location.href=_root+'wp-admin/';
            }
           );
          }
          
          Array.prototype.in_array=function(v){
           for(var i in this)
            if(this[i]==v)
             return true;
           return false;
          }
          Array.prototype.remove=function(s){
           for(i=0;i<this.length;i++)
            if(s==this[i])
             this.splice(i,1);
          }
          
          var star_off=_siteRoot+'images/star-off.png',star_on=_siteRoot+'images/star-on.png',star_html='<p class="stars" rel="%s%">';
          for(var i=1;i<6;i++)star_html+='<img src="'+star_off+'" alt="" id="star_%s%_'+i+'" onmouseover="feedback_stars(this,\'over\',\'%s%\','+i+');" onmouseout="feedback_stars(this,\'out\',\'%s%\','+i+');" onclick="feedback_stars(this,\'click\',\'%s%\','+i+');" width="15" height="15" />';star_html+='<input type="hidden" id="rating_%s%" name="rating_%s%" value="-1" /></p>';
          
          var fb_html='<div id="feedback_div"><form action="'+_siteRoot+'feedback.php" method="post"><a href="#" id="fb_close" onclick="feedback_close();return false;" onfocus="blur();">Close</a>'+
          '<div class="rate"><p>This page</p><p class="indent">Design:</p>'+star_html.replace(/%s%/gi,'page_design')+'<p class="indent">Content:</p>'+star_html.replace(/%s%/gi,'page_content')+'<p class="indent">Ease of use:</p>'+star_html.replace(/%s%/gi,'page_ease')+'<p class="indent">Overall:</p>'+star_html.replace(/%s%/gi,'page_overall')+'</div>'+
          '<div class="rate"><p>Whole site</p><p class="indent">Design:</p>'+star_html.replace(/%s%/gi,'site_design')+'<p class="indent">Content:</p>'+star_html.replace(/%s%/gi,'site_content')+'<p class="indent">Ease of use:</p>'+star_html.replace(/%s%/gi,'site_ease')+'<p class="indent">Overall:</p>'+star_html.replace(/%s%/gi,'site_overall')+'</div>'+
          '<div class="form"><label>Name: <input type="text" name="name" value="" class="text" /></label><label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email: <input type="text" name="email" value="" class="text" /></label><label class="ta">Comments:<br /><textarea name="comments" cols="10" rows="5"></textarea></label><br style="clear:both;" /><input type="submit" name="submit" class="button" value="" /></div>'+
          '</form></div>';
          
          function feedback(obj){
           if(fb_html!=''){
            jQuery(document.body).append(fb_html);
            fb_html='';
            _offset=jQuery(obj).offset();
            jQuery('#feedback_div').css({'left':_offset.left-jQuery('#feedback_div').width()+jQuery(obj).width()-30,'top':_offset.top-240});
           }
           if(jQuery('#feedback_div').is(':visible')) jQuery('#feedback_div').fadeOut(250);
           else jQuery('#feedback_div').fadeIn(250);
          }
          function feedback_close(){
           if(jQuery('#feedback_div').is(':visible'))
            jQuery('#feedback_div').fadeOut(250);
          }
          jQuery(document).click(function(e){
           if(jQuery('#feedback_div').is(':visible')){
            var obj=e.target,ids=[];
            while(obj.parentNode){
             ids[ids.length]=obj.id;
             obj=obj.parentNode;
            }
            if(!ids.in_array('feedback_div') && !ids.in_array('feedback_a'))
             jQuery('#feedback_div').fadeOut(250);
           }
          });
          var fb_r=[];
          function feedback_stars(obj,b,s,r){
           switch(b){
            case 'over' :
             for(var i=1;i<6;i++){
              if(i<=r) jQuery('#star_'+s+'_'+i).attr('src',star_on);
              else jQuery('#star_'+s+'_'+i).attr('src',star_off);
             }
             break;
            case 'out' :
             for(var i=1;i<6;i++){
              if(typeof fb_r[s]!='undefined' && i<=fb_r[s]) jQuery('#star_'+s+'_'+i).attr('src',star_on);
              else jQuery('#star_'+s+'_'+i).attr('src',star_off);
             }
             break;
            case 'click' :
             fb_r[s]=r;
             jQuery('#rating_'+s).val(r);
             break;
           }
          }
          
          function load_comments(id){
           $('#comment_post_ID').val(id);
           $('#video-comments').html('<p>Loading comments&hellip;</p>');
          
           $.getJSON(_siteRoot+'json-comments.php?id='+id,function(data){
            var html='';
            $('#video-comments').html('<p>There are no comments for this video.</p>');
            $.each(data,function(){
             html+='<div class="comment"><p class="author colour">'+this.comment_author+' says:</p><p class="date">'+this.date+'</p><p class="message">'+this.comment_content+'</p></div>';
             html+='<div class="hr"></div>';
          	});
            if(html!='')
             $('#video-comments').html(html);
           });
          }
          
          // STYLING FILE INPUTS 1.0 | Shaun Inman <http://www.shauninman.com/> | 2007-09-07
          if(!window.SI){var SI={};};
          SI.Files={
           htmlClass:'SI-FILES-STYLIZED',
           fileClass:'file',
           wrapClass:'cabinet',
           
           fini:false,
           able:false,
           init:function(){
            this.fini=true;
            
            var ie=0 //@cc_on+@_jscript_version
            if(window.opera || (ie && ie<5.5) || !document.getElementsByTagName){return;}
            this.able=true;
            
            var html=document.getElementsByTagName('html')[0];
            html.className+=(html.className!=''?' ':'')+this.htmlClass;
           },
           stylize:function(elem){
            if(!this.fini){this.init();};
            if(!this.able){return;};
            
            elem.parentNode.file=elem;
            elem.parentNode.onmousemove=function(e){
             if(typeof e=='undefined') e=window.event;
             if(typeof e.pageY=='undefined' &&  typeof e.clientX=='number' && document.documentElement){
              e.pageX=e.clientX+document.documentElement.scrollLeft;
              e.pageY=e.clientY+document.documentElement.scrollTop;
             };
             var ox=oy=0;
             var elem=this;
             if(elem.offsetParent){
              ox=elem.offsetLeft;
              oy=elem.offsetTop;
              while(elem=elem.offsetParent){
               ox+=elem.offsetLeft;
               oy+=elem.offsetTop;
              };
             };
             var x=e.pageX-ox;
             var y=e.pageY-oy;
             var w=this.file.offsetWidth;
             var h=this.file.offsetHeight;
             this.file.style.top=y-(h/2) +'px';
             this.file.style.left=x-(w-30)+'px';
            };
           },
           stylizeById:function(id){
            this.stylize(document.getElementById(id));
           },
           stylizeAll:function(){
            if(!this.fini){this.init();};
            if(!this.able){return;};
            
            var inputs=document.getElementsByTagName('input');
            for(var i=0;i<inputs.length;i++){
             var input=inputs[i];
             if(input.type=='file' && input.className.indexOf(this.fileClass)!=-1 && input.parentNode.className.indexOf(this.wrapClass)!=-1)
              this.stylize(input);
            };
           }
          };
          
          function set_cookie(name,value,expires,path,domain,secure){
           var today=new Date();
           today.setTime(today.getTime());
           if(expires) expires*=(1000*60*60*24);
           var expires_date=new Date(today.getTime()+expires);
          
           document.cookie=name+'='+escape(value)+
            ((expires)?';expires='+expires_date.toGMTString():'')+
            ((path)?';path='+path:'')+
            ((domain)?';domain='+domain:'')+
            ((secure)?';secure':'');
          }
          
          function get_cookie(check_name){
           var a_all_cookies=document.cookie.split(';');
           var a_temp_cookie='';
           var cookie_name='';
           var cookie_value='';
           var b_cookie_found=false;
          
           for(i=0;i<a_all_cookies.length;i++){
            a_temp_cookie=a_all_cookies[i].split('=');
            cookie_name=a_temp_cookie[0].replace(/^\s+|\s+$/g,'');
          
            if(cookie_name==check_name){
             b_cookie_found=true;
             if(a_temp_cookie.length>1)
              cookie_value=unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g,''));
             return cookie_value;
             break;
            }
            a_temp_cookie=null;
            cookie_name='';
           }
           if(!b_cookie_found)
            return null;
          }
          
          function delete_cookie(name,path,domain){
           if(get_cookie(name))
            document.cookie=name+'='+((path)?';path='+path:'')+
            ((domain)?';domain='+domain:'')+';expires=Thu,01-Jan-1970 00:00:01 GMT';
          }
          
          
          
          
          
          
          
          
          /**
           * --------------------------------------------------------------------
           * jQuery-Plugin "pngFix"
           * Version: 1.1, 11.09.2007
           * by Andreas Eberhard, andreas.eberhard@gmail.com
           *                      http://jquery.andreaseberhard.de/
           *
           * Copyright (c) 2007 Andreas Eberhard
           * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
           *
           * Changelog:
           *    11.09.2007 Version 1.1
           *    - removed noConflict
           *    - added png-support for input type=image
           *    - 01.08.2007 CSS background-image support extension added by Scott Jehl, scott@filamentgroup.com, http://www.filamentgroup.com
           *    31.05.2007 initial Version 1.0
           * --------------------------------------------------------------------
           * @example $(function(){$(document).pngFix();});
           * @desc Fixes all PNG's in the document on document.ready
           *
           * jQuery(function(){jQuery(document).pngFix();});
           * @desc Fixes all PNG's in the document on document.ready when using noConflict
           *
           * @example $(function(){$('div.examples').pngFix();});
           * @desc Fixes all PNG's within div with class examples
           *
           * @example $(function(){$('div.examples').pngFix( { blankgif:'ext.gif' } );});
           * @desc Fixes all PNG's within div with class examples, provides blank gif for input with png
           * --------------------------------------------------------------------
           */
          (function($) {
          jQuery.fn.pngFix=function(settings) {
           settings=jQuery.extend({blankgif:'blank.gif'},settings);
           var ie55=(navigator.appName=='Microsoft Internet Explorer' && parseInt(navigator.appVersion)==4 && navigator.appVersion.indexOf('MSIE 5.5')!=-1);
           var ie6=(navigator.appName=='Microsoft Internet Explorer' && parseInt(navigator.appVersion)==4 && navigator.appVersion.indexOf('MSIE 6.0')!=-1);
          
           if(jQuery.browser.msie&&(ie55||ie6)){
            //fix images with png-source
            /*jQuery(this).find("img[@src$=.png]").each(function() {
             jQuery(this).attr('width',jQuery(this).width());
             jQuery(this).attr('height',jQuery(this).height());
             var prevStyle='';
             var strNewHTML='';
             var imgId=(jQuery(this).attr('id'))?'id="'+jQuery(this).attr('id')+'" ' : '';
             var imgClass=(jQuery(this).attr('class'))?'class="'+jQuery(this).attr('class')+'" ' : '';
             var imgTitle=(jQuery(this).attr('title'))?'title="'+jQuery(this).attr('title')+'" ' : '';
             var imgAlt=(jQuery(this).attr('alt'))?'alt="'+jQuery(this).attr('alt')+'" ' : '';
             var imgAlign=(jQuery(this).attr('align'))?'float:'+jQuery(this).attr('align')+';' : '';
             var imgHand=(jQuery(this).parent().attr('href'))?'cursor:hand;' : '';
             if (this.style.border) {
              prevStyle += 'border:'+this.style.border+';';
              this.style.border='';
             }
             if (this.style.padding) {
              prevStyle += 'padding:'+this.style.padding+';';
              this.style.padding='';
             }
             if (this.style.margin) {
              prevStyle += 'margin:'+this.style.margin+';';
              this.style.margin='';
             }
             var imgStyle=(this.style.cssText);
             strNewHTML += '<span '+imgId+imgClass+imgTitle+imgAlt;
             strNewHTML += 'style="position:relative;white-space:pre-line;display:inline-block;background:transparent;'+imgAlign+imgHand;
             strNewHTML += 'width:'+jQuery(this).width()+'px;'+'height:'+jQuery(this).height()+'px;';
             strNewHTML += 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader'+'(src=\''+jQuery(this).attr('src')+'\', sizingMethod=\'scale\');';
             strNewHTML += imgStyle+'"></span>';
             if (prevStyle != ''){
              strNewHTML='<span style="position:relative;display:inline-block;'+prevStyle+imgHand+'width:'+jQuery(this).width()+'px;'+'height:'+jQuery(this).height()+'px;'+'">'+strNewHTML+'</span>';
             }
             jQuery(this).hide();
             jQuery(this).after(strNewHTML);
            });*/
            // fix css background pngs
            //jQuery(this).find("*").each(function(){
            jQuery(this).each(function(){
             var bgIMG=jQuery(this).css('background-image');
             if(bgIMG.indexOf(".png")!=-1){
              var iebg=bgIMG.split('url("')[1].split('")')[0];
              jQuery(this).css('background-image','none');
              jQuery(this).get(0).runtimeStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+iebg+"',sizingMethod='"+settings.sizingMethod+"')";
             }
            });
            //fix input with png-source
            /*jQuery(this).find("input[@src$=.png]").each(function() {
             var bgIMG=jQuery(this).attr('src');
             jQuery(this).get(0).runtimeStyle.filter='progid:DXImageTransform.Microsoft.AlphaImageLoader'+'(src=\''+bgIMG+'\', sizingMethod=\'scale\');';
               jQuery(this).attr('src', settings.blankgif)
            });*/
           }
           return jQuery;
          };
          })(jQuery);
          $(function(){if(jQuery.browser.msie && jQuery.browser.version<7){
          // $('div#top h1 a,div#content h2,div.column-third h4,p.date,div#media-centre-tabs a,div.popup').pngFix({sizingMethod:'crop'});
          // $('div#top,div#content div.wrap').pngFix({sizingMethod:'scale'});
          }});
          