// ==UserScript==
// @name         What.cd Track Previews
// @version      1.1.5
// @description  Adds a tracklist to album pages. When a track name is clicked, a YouTube video of the song will play.
// @match        http://what.cd/torrents.php*
// @match        https://what.cd/torrents.php*
// @match        https://ssl.what.cd/torrents.php*
// @grant        GM_getValue
// @grant        GM_setValue
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

/* Tooltipster v3.0.5 */
;(function(e,t,n){function o(t,n){this.bodyOverflowX;this.checkInterval=null;this.content;this.$el=e(t);this.elProxyPosition;this.$elProxy;this.enabled=true;this.options=e.extend({},s,n);this.mouseIsOverProxy=false;this.namespace="tooltipster-"+Math.round(Math.random()*1e5);this.status="hidden";this.timerHide=null;this.timerShow=null;this.$tooltip;this.options.iconTheme=this.options.iconTheme.replace(".","");this.options.theme=this.options.theme.replace(".","");this.init()}function u(t,n){var r=true;e.each(t,function(e,i){if(typeof n[e]==="undefined"||t[e]!==n[e]){r=false;return false}});return r}function l(){return!f&&a}function c(){var e=n.body||n.documentElement,t=e.style,r="transition";if(typeof t[r]=="string"){return true}v=["Moz","Webkit","Khtml","O","ms"],r=r.charAt(0).toUpperCase()+r.substr(1);for(var i=0;i<v.length;i++){if(typeof t[v[i]+r]=="string"){return true}}return false}var r="tooltipster",s={animation:"fade",arrow:true,arrowColor:"",autoClose:true,content:null,contentAsHTML:false,contentCloning:true,delay:200,fixedWidth:0,maxWidth:0,functionInit:function(e,t){},functionBefore:function(e,t){t()},functionReady:function(e,t){},functionAfter:function(e){},icon:"(?)",iconCloning:true,iconDesktop:false,iconTouch:false,iconTheme:"tooltipster-icon",interactive:false,interactiveTolerance:350,offsetX:0,offsetY:0,onlyOne:false,position:"top",positionTracker:false,speed:350,timer:0,theme:"tooltipster-default",touchDevices:true,trigger:"hover",updateAnimation:true};o.prototype={init:function(){var t=this;if(n.querySelector){if(t.options.content!==null){t.setContent(t.options.content)}else{var r=t.$el.attr("title");if(typeof r==="undefined")r=null;t.setContent(r)}var i=t.options.functionInit(t.$el,t.content);if(typeof i!=="undefined")t.setContent(i);t.$el.removeAttr("title").addClass("tooltipstered");if(!a&&t.options.iconDesktop||a&&t.options.iconTouch){if(typeof t.options.icon==="string"){t.$elProxy=e('<span class="'+t.options.iconTheme+'"></span>');t.$elProxy.text(t.options.icon)}else{if(t.options.iconCloning)t.$elProxy=t.options.icon.clone(true);else t.$elProxy=t.options.icon}t.$elProxy.insertAfter(t.$el)}else{t.$elProxy=t.$el}if(t.options.trigger=="hover"){t.$elProxy.on("mouseenter."+t.namespace,function(){if(!l()||t.options.touchDevices){t.mouseIsOverProxy=true;t.showTooltip()}}).on("mouseleave."+t.namespace,function(){if(!l()||t.options.touchDevices){t.mouseIsOverProxy=false}});if(a&&t.options.touchDevices){t.$elProxy.on("touchstart."+t.namespace,function(){t.showTooltipNow()})}}else if(t.options.trigger=="click"){t.$elProxy.on("click."+t.namespace,function(){if(!l()||t.options.touchDevices){t.showTooltip()}})}}},showTooltip:function(){var e=this;if(e.status!="shown"&&e.status!="appearing"){if(e.options.delay){e.timerShow=setTimeout(function(){if(e.options.trigger=="click"||e.options.trigger=="hover"&&e.mouseIsOverProxy){e.showTooltipNow()}},e.options.delay)}else e.showTooltipNow()}},showTooltipNow:function(){var n=this;clearTimeout(n.timerShow);n.timerShow=null;clearTimeout(n.timerHide);n.timerHide=null;if(n.enabled&&n.content!==null){if(n.options.onlyOne){e(".tooltipstered").not(n.$el).each(function(t,n){var i=e(n),s=i[r]("status"),o=i[r]("option","autoClose");if(s!=="hidden"&&s!=="disappearing"&&o){i[r]("hide")}})}n.options.functionBefore(n.$elProxy,function(){if(n.status!=="hidden"){var r=0;if(n.status==="disappearing"){n.status="appearing";if(c()){n.$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-"+n.options.animation+"-show");if(n.options.speed>0)n.$tooltip.delay(n.options.speed);n.$tooltip.queue(function(){n.status="shown"})}else{n.$tooltip.stop().fadeIn(function(){n.status="shown"})}}}else{n.status="appearing";var r=n.options.speed;n.bodyOverflowX=e("body").css("overflow-x");e("body").css("overflow-x","hidden");var i="tooltipster-"+n.options.animation,s="-webkit-transition-duration: "+n.options.speed+"ms; -webkit-animation-duration: "+n.options.speed+"ms; -moz-transition-duration: "+n.options.speed+"ms; -moz-animation-duration: "+n.options.speed+"ms; -o-transition-duration: "+n.options.speed+"ms; -o-animation-duration: "+n.options.speed+"ms; -ms-transition-duration: "+n.options.speed+"ms; -ms-animation-duration: "+n.options.speed+"ms; transition-duration: "+n.options.speed+"ms; animation-duration: "+n.options.speed+"ms;",o=n.options.fixedWidth>0?"width:"+Math.round(n.options.fixedWidth)+"px;":"",u=n.options.maxWidth>0?"max-width:"+Math.round(n.options.maxWidth)+"px;":"",f=n.options.interactive?"pointer-events: auto;":"";n.$tooltip=e('<div class="tooltipster-base '+n.options.theme+'" style="'+o+" "+u+" "+f+" "+s+'"><div class="tooltipster-content"></div></div>');if(c())n.$tooltip.addClass(i);n.insertContent();n.$tooltip.appendTo("body");n.positionTooltip();n.options.functionReady(n.$el,n.$tooltip);if(c()){n.$tooltip.addClass(i+"-show");if(n.options.speed>0)n.$tooltip.delay(n.options.speed);n.$tooltip.queue(function(){n.status="shown"})}else{n.$tooltip.css("display","none").fadeIn(n.options.speed,function(){n.status="shown"})}n.setCheckInterval();e(t).on("scroll."+n.namespace+" resize."+n.namespace,function(){n.positionTooltip()});if(n.options.autoClose){e("body").off("."+n.namespace);if(n.options.trigger=="hover"){if(a){setTimeout(function(){e("body").on("touchstart."+n.namespace,function(){n.hideTooltip()})},0)}if(n.options.interactive){if(a){n.$tooltip.on("touchstart."+n.namespace,function(e){e.stopPropagation()})}var l=null;n.$elProxy.add(n.$tooltip).on("mouseleave."+n.namespace+"-autoClose",function(){clearTimeout(l);l=setTimeout(function(){n.hideTooltip()},n.options.interactiveTolerance)}).on("mouseenter."+n.namespace+"-autoClose",function(){clearTimeout(l)})}else{n.$elProxy.on("mouseleave."+n.namespace+"-autoClose",function(){n.hideTooltip()})}}else if(n.options.trigger=="click"){setTimeout(function(){e("body").on("click."+n.namespace+" touchstart."+n.namespace,function(){n.hideTooltip()})},0);if(n.options.interactive){n.$tooltip.on("click."+n.namespace+" touchstart."+n.namespace,function(e){e.stopPropagation()})}}}}if(n.options.timer>0){n.timerHide=setTimeout(function(){n.timerHide=null;n.hideTooltip()},n.options.timer+r)}})}},setCheckInterval:function(){var t=this;t.checkInterval=setInterval(function(){if(e("body").find(t.$el).length===0||e("body").find(t.$elProxy).length===0||t.status=="hidden"||e("body").find(t.$tooltip).length===0){if(t.status=="shown"||t.status=="appearing")t.hideTooltip();t.cancelCheckInterval()}else{if(t.options.positionTracker){var n=t.positionInfo(t.$elProxy),r=false;if(u(n.dimension,t.elProxyPosition.dimension)){if(t.$elProxy.css("position")==="fixed"){if(u(n.position,t.elProxyPosition.position))r=true}else{if(u(n.offset,t.elProxyPosition.offset))r=true}}if(!r){t.positionTooltip()}}}},200)},cancelCheckInterval:function(){clearInterval(this.checkInterval);this.checkInterval=null},hideTooltip:function(){var n=this;clearTimeout(n.timerShow);n.timerShow=null;clearTimeout(n.timerHide);n.timerHide=null;if(n.status=="shown"||n.status=="appearing"){n.status="disappearing";var r=function(){n.status="hidden";n.$tooltip.remove();n.$tooltip=null;e(t).off("."+n.namespace);e("body").off("."+n.namespace).css("overflow-x",n.bodyOverflowX);n.$elProxy.off("."+n.namespace+"-autoClose");n.options.functionAfter(n.$elProxy)};if(c()){n.$tooltip.clearQueue().removeClass("tooltipster-"+n.options.animation+"-show").addClass("tooltipster-dying");if(n.options.speed>0)n.$tooltip.delay(n.options.speed);n.$tooltip.queue(r)}else{n.$tooltip.stop().fadeOut(n.options.speed,r)}}},setContent:function(e){if(typeof e==="object"&&e!==null&&this.options.contentCloning){e=e.clone(true)}this.content=e},insertContent:function(){var e=this,t=this.$tooltip.find(".tooltipster-content");if(typeof e.content==="string"&&!e.options.contentAsHTML){t.text(e.content)}else{t.empty().append(e.content)}},updateTooltip:function(e){var t=this;t.setContent(e);if(t.content!==null){if(t.status!=="hidden"){t.insertContent();t.positionTooltip();if(t.options.updateAnimation){if(c()){t.$tooltip.css({width:"","-webkit-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-moz-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-o-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms","-ms-transition":"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms",transition:"all "+t.options.speed+"ms, width 0ms, height 0ms, left 0ms, top 0ms"}).addClass("tooltipster-content-changing");setTimeout(function(){if(t.status!="hidden"){t.$tooltip.removeClass("tooltipster-content-changing");setTimeout(function(){if(t.status!=="hidden"){t.$tooltip.css({"-webkit-transition":t.options.speed+"ms","-moz-transition":t.options.speed+"ms","-o-transition":t.options.speed+"ms","-ms-transition":t.options.speed+"ms",transition:t.options.speed+"ms"})}},t.options.speed)}},t.options.speed)}else{t.$tooltip.fadeTo(t.options.speed,.5,function(){if(t.status!="hidden"){t.$tooltip.fadeTo(t.options.speed,1)}})}}}}else{t.hideTooltip()}},positionInfo:function(e){return{dimension:{height:e.outerHeight(false),width:e.outerWidth(false)},offset:e.offset(),position:{left:parseInt(e.css("left")),top:parseInt(e.css("top"))}}},positionTooltip:function(){var n=this;if(e("body").find(n.$tooltip).length!==0){n.$tooltip.css("width","");n.elProxyPosition=n.positionInfo(n.$elProxy);var r=null,s=e(t).width(),o=n.elProxyPosition,u=n.$tooltip.outerWidth(false),a=n.$tooltip.innerWidth()+1,f=n.$tooltip.outerHeight(false),l=null;if(n.$elProxy.is("area")){var c=n.$elProxy.attr("shape"),h=n.$elProxy.parent().attr("name"),p=e('img[usemap="#'+h+'"]'),d=p.offset().left,v=p.offset().top,m=n.$elProxy.attr("coords")!==undefined?n.$elProxy.attr("coords").split(","):undefined;if(c=="circle"){var g=parseInt(m[0]),y=parseInt(m[1]),b=parseInt(m[2]);o.dimension.height=b*2;o.dimension.width=b*2;o.offset.top=v+y-b;o.offset.left=d+g-b}else if(c=="rect"){var g=parseInt(m[0]),y=parseInt(m[1]),w=parseInt(m[2]),E=parseInt(m[3]);o.dimension.height=E-y;o.dimension.width=w-g;o.offset.top=v+y;o.offset.left=d+g}else if(c=="poly"){var S=[],x=[],T=0,N=0,C=0,k=0,L="even";for(i=0;i<m.length;i++){var A=parseInt(m[i]);if(L=="even"){if(A>C){C=A;if(i===0){T=C}}if(A<T){T=A}L="odd"}else{if(A>k){k=A;if(i==1){N=k}}if(A<N){N=A}L="even"}}o.dimension.height=k-N;o.dimension.width=C-T;o.offset.top=v+N;o.offset.left=d+T}else{o.dimension.height=p.outerHeight(false);o.dimension.width=p.outerWidth(false);o.offset.top=v;o.offset.left=d}}if(n.options.fixedWidth===0){n.$tooltip.css({width:Math.round(a)+"px","padding-left":"0px","padding-right":"0px"})}var O=0,M=0,_=0,D=parseInt(n.options.offsetY),P=parseInt(n.options.offsetX),H=n.options.position;function B(){var n=e(t).scrollLeft();if(O-n<0){r=O-n;O=n}if(O+u-n>s){r=O-(s+n-u);O=s+n-u}}function j(n,r){if(o.offset.top-e(t).scrollTop()-f-D-12<0&&r.indexOf("top")>-1){H=n}if(o.offset.top+o.dimension.height+f+12+D>e(t).scrollTop()+e(t).height()&&r.indexOf("bottom")>-1){H=n;_=o.offset.top-f-D-12}}if(H=="top"){var F=o.offset.left+u-(o.offset.left+o.dimension.width);O=o.offset.left+P-F/2;_=o.offset.top-f-D-12;B();j("bottom","top")}if(H=="top-left"){O=o.offset.left+P;_=o.offset.top-f-D-12;B();j("bottom-left","top-left")}if(H=="top-right"){O=o.offset.left+o.dimension.width+P-u;_=o.offset.top-f-D-12;B();j("bottom-right","top-right")}if(H=="bottom"){var F=o.offset.left+u-(o.offset.left+o.dimension.width);O=o.offset.left-F/2+P;_=o.offset.top+o.dimension.height+D+12;B();j("top","bottom")}if(H=="bottom-left"){O=o.offset.left+P;_=o.offset.top+o.dimension.height+D+12;B();j("top-left","bottom-left")}if(H=="bottom-right"){O=o.offset.left+o.dimension.width+P-u;_=o.offset.top+o.dimension.height+D+12;B();j("top-right","bottom-right")}if(H=="left"){O=o.offset.left-P-u-12;M=o.offset.left+P+o.dimension.width+12;var I=o.offset.top+f-(o.offset.top+n.$elProxy.outerHeight(false));_=o.offset.top-I/2-D;if(O<0&&M+u>s){var q=parseFloat(n.$tooltip.css("border-width"))*2,R=u+O-q;n.$tooltip.css("width",R+"px");f=n.$tooltip.outerHeight(false);O=o.offset.left-P-R-12-q;I=o.offset.top+f-(o.offset.top+n.$elProxy.outerHeight(false));_=o.offset.top-I/2-D}else if(O<0){O=o.offset.left+P+o.dimension.width+12;r="left"}}if(H=="right"){O=o.offset.left+P+o.dimension.width+12;M=o.offset.left-P-u-12;var I=o.offset.top+f-(o.offset.top+n.$elProxy.outerHeight(false));_=o.offset.top-I/2-D;if(O+u>s&&M<0){var q=parseFloat(n.$tooltip.css("border-width"))*2,R=s-O-q;n.$tooltip.css("width",R+"px");f=n.$tooltip.outerHeight(false);I=o.offset.top+f-(o.offset.top+n.$elProxy.outerHeight(false));_=o.offset.top-I/2-D}else if(O+u>s){O=o.offset.left-P-u-12;r="right"}}if(n.options.arrow){var U="tooltipster-arrow-"+H;if(n.options.arrowColor.length<1){var z=n.$tooltip.css("background-color")}else{var z=n.options.arrowColor}if(!r){r=""}else if(r=="left"){U="tooltipster-arrow-right";r=""}else if(r=="right"){U="tooltipster-arrow-left";r=""}else{r="left:"+Math.round(r)+"px;"}if(H=="top"||H=="top-left"||H=="top-right"){var W=parseFloat(n.$tooltip.css("border-bottom-width")),X=n.$tooltip.css("border-bottom-color")}else if(H=="bottom"||H=="bottom-left"||H=="bottom-right"){var W=parseFloat(n.$tooltip.css("border-top-width")),X=n.$tooltip.css("border-top-color")}else if(H=="left"){var W=parseFloat(n.$tooltip.css("border-right-width")),X=n.$tooltip.css("border-right-color")}else if(H=="right"){var W=parseFloat(n.$tooltip.css("border-left-width")),X=n.$tooltip.css("border-left-color")}else{var W=parseFloat(n.$tooltip.css("border-bottom-width")),X=n.$tooltip.css("border-bottom-color")}if(W>1){W++}var V="";if(W!==0){var J="",K="border-color: "+X+";";if(U.indexOf("bottom")!==-1){J="margin-top: -"+Math.round(W)+"px;"}else if(U.indexOf("top")!==-1){J="margin-bottom: -"+Math.round(W)+"px;"}else if(U.indexOf("left")!==-1){J="margin-right: -"+Math.round(W)+"px;"}else if(U.indexOf("right")!==-1){J="margin-left: -"+Math.round(W)+"px;"}V='<span class="tooltipster-arrow-border" style="'+J+" "+K+';"></span>'}n.$tooltip.find(".tooltipster-arrow").remove();var Q='<div class="'+U+' tooltipster-arrow" style="'+r+'">'+V+'<span style="border-color:'+z+';"></span></div>';n.$tooltip.append(Q)}n.$tooltip.css({top:Math.round(_)+"px",left:Math.round(O)+"px"})}}};e.fn[r]=function(){var t=arguments;if(this.length===0){if(typeof t[0]==="string"){var n=true;switch(t[0]){case"setDefaults":e.extend(s,t[1]);break;default:n=false;break}if(n)return true;else return this}else{return this}}else{if(typeof t[0]==="string"){var r="#*$~&";this.each(function(){var n=e(this).data("tooltipster");if(n){switch(t[0]){case"content":case"update":if(typeof t[1]==="undefined"){r=n.content;return false}else{n.updateTooltip(t[1]);break};case"destroy":n.hideTooltip();if(n.$el[0]!==n.$elProxy[0])n.$elProxy.remove();var i=typeof n.content==="string"?n.content:e("<div></div>").append(n.content).html();n.$el.removeClass("tooltipstered").attr("title",i).removeData("tooltipster").off("."+n.namespace);break;case"disable":n.hideTooltip();n.enabled=false;break;case"elementIcon":r=n.$el[0]!==n.$elProxy[0]?n.$elProxy[0]:undefined;return false;case"elementTooltip":r=n.$tooltip?n.$tooltip[0]:undefined;return false;case"enable":n.enabled=true;break;case"hide":n.hideTooltip();break;case"option":r=n.options[t[1]];break;case"reposition":n.positionTooltip();break;case"show":n.showTooltipNow();break;case"status":r=n.status;return false;default:throw new Error('Unknown method .tooltipster("'+t[0]+'")');break}}else{throw new Error("You called Tooltipster's \""+t[0]+'" method on an uninitialized element')}});return r!=="#*$~&"?r:this}else{return this.each(function(){if(!e(this).data("tooltipster")){e(this).data("tooltipster",new o(this,t[0]))}})}}};var a=!!("ontouchstart"in t);var f=false;e("body").one("mousemove",function(){f=true})})(jQuery,window,document);

;(function($){
  
  var plugin = {
    
    protocol: window.location.protocol
    
  , artist_name: $('h2 a').text()
  , album_name: $('h2 span').text()
  , song_list: []
  , video_number: 0
    
  , $options: $('<div/>').css('float', 'right')
  , $videos_table: $('<table/>', { 'id': 'videos_table' }).css('width', '100%')
  , $videos_container: $('<tbody/>', { 'id': 'videos_container' })
    
  , tooltipster_elements: []
    
  , options: null
    
  , injectVideoTable: function(){
      
      var $video_table_header = $('<thead/>')
        , $video_table_header_row = $('<tr/>', { 'class': 'colhead' })
        , $video_table_header_cell = $('<td/>', { 'width': '85%' }).html('<a href="#">↑</a>&nbsp;Preview Tracks&nbsp;')
          
        , $toggle_link = $('<a/>').attr('href', '#')
        , setToggleState = function(open) {
            if (open) {
              $toggle_link.text('(Hide)')
              plugin.$videos_container.show()
              plugin.$options.show()
            } else {
              $toggle_link.text('(Show)')
              plugin.$videos_container.hide()
              plugin.$options.hide()
            }
            setTimeout(function(){ GM_setValue('is_open', open) })
          }
          
        , $theme_swatch = $('<div/>').css({ 'width': '14px', 'height': '14px', 'margin-left': '5px', 'border': '1px solid #fff' })
        , $no_theme_link = $('<a/>').attr({'href': '#', 'title': 'No Theme'}).css('float', 'right').addClass('tooltip')
        , $light_theme_link = $('<a/>').attr({'href': '#', 'title': 'Light Theme'}).css('float', 'right').addClass('tooltip')
        , $dark_theme_link = $('<a/>').attr({'href': '#', 'title': 'Dark Theme'}).css('float', 'right').addClass('tooltip')
        , setTheme = function(theme) {
            $no_theme_link.css('opacity', '0.5')
            $light_theme_link.css('opacity', '0.5')
            $dark_theme_link.css('opacity', '0.5')
            switch (theme) {
              case 'none':
                $no_theme_link.css('opacity', '1')
                break
              
              case 'light':
                $light_theme_link.css('opacity', '1')
                break
              
              case 'dark':
                $dark_theme_link.css('opacity', '1')
                break
            }
            setTimeout(function(){ GM_setValue('theme', theme) })
          }
          
        , $mode_link = $('<a/>').attr({'href': '#', 'title': 'Switch between video and audio-only modes.'}).css('float', 'right').addClass('tooltip')
        , setMode = function(mode) {
            if (mode == 'video') {
              $mode_link.text('(Video On)')
              $('.preview_video').css('height', '326px')
            } else {
              $mode_link.text('(Video Off)')
              $('.preview_video').css('height', '35px')
            }
            setTimeout(function(){ GM_setValue('mode', mode) })
          }
      
      plugin.tooltipster_elements.push($no_theme_link)
      plugin.tooltipster_elements.push($light_theme_link)
      plugin.tooltipster_elements.push($dark_theme_link)
      plugin.tooltipster_elements.push($mode_link)
      
      $no_theme_link.html($theme_swatch.clone().css('background-color', '#c00014'))
      $light_theme_link.html($theme_swatch.clone().css('background-color', '#ddd'))
      $dark_theme_link.html($theme_swatch.clone().css('background-color', '#444'))
      
      setToggleState((GM_getValue('is_open') == undefined) ? true : GM_getValue('is_open'))
      setTheme(GM_getValue('theme') || 'none')
      setMode(GM_getValue('mode') || 'video')
      
      $toggle_link.on('click', function(e){
        var new_state = !GM_getValue('is_open')
        e.preventDefault()
        setToggleState(new_state)
      })
      
      $no_theme_link.on('click', function(e){
        e.preventDefault()
        setTheme('none')
      })
      
      $light_theme_link.on('click', function(e){
        e.preventDefault()
        setTheme('light')
      })
      
      $dark_theme_link.on('click', function(e){
        e.preventDefault()
        setTheme('dark')
      })
      
      $mode_link.on('click', function(e){
        var new_state = GM_getValue('mode') == 'video' ? 'audio' : 'video'
        e.preventDefault()
        setMode(new_state)
      })
      
      plugin.$options.append($dark_theme_link)
      plugin.$options.append($light_theme_link)
      plugin.$options.append($no_theme_link)
      plugin.$options.append($mode_link)
      
      $video_table_header_cell.append($toggle_link)
      $video_table_header_cell.append(plugin.$options)
      $video_table_header_row.html($video_table_header_cell)
      $video_table_header.html($video_table_header_row)
      
      plugin.$videos_table.html($video_table_header)
      plugin.$videos_table.append(plugin.$videos_container)
      
      $('#torrent_details').after(plugin.$videos_table)
      
    }
    
  , getSongList: function(){
      
      $('.filelist_table:first tr:gt(0)').each(function(){
        
        var song = $(this).find('td:first').text()
          , song_name = (/\(?\d*[\.-:]?\)? *-?(.+)\.(?:mp3|m4a|mp4|flac|ac3|dts)$/i).exec(song)
        
        if (song_name) {
          song_name = song_name[1].replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '').replace(/_/g, ' ')
          plugin.song_list.push(song_name)
          plugin.video_number++
          
          var $song_row = $('<tr/>')
            , $song_cell = $('<td/>').html(plugin.video_number + ' - ')
            , $song_link = $('<a/>', { href: '#' }).html(song_name)
          
          $song_link.on('click', function(e){
            
            var $preview_videos = null
            
            e.preventDefault()
            
            if ($song_link.data('video_id')) {
              $('#preview_video_' + $song_link.data('video_id')).slideUp(function(){
                $(this).remove()
              })
              $song_link.data('video_id', null)
              return
            }
            
            $preview_videos = $('.preview_video')
            
            if ($preview_videos.length) {
              $preview_videos.slideUp(function(){
                $(this).remove()
                plugin.getSong($song_link)
              })
            } else {
              plugin.getSong($song_link)
            }
            
          })
          
          plugin.$videos_container.append($song_row.html($song_cell.append($song_link)))
        }
        
      })
      
    }
    
  , getSong: function($song_link){
      
      var search_query = $song_link.text().toLowerCase()
        , theme_string = ''
        , getIframe = null
      
      switch (GM_getValue('theme')) {
        case 'light':
          theme_string = '&color=white&theme=light'
          break
        
        case 'dark':
          theme_string = '&color=white&theme=dark'
          break
      }
      
      if (GM_getValue('mode') == 'video') {
        
        getIframe = function(video_id){
          return '<iframe id="preview_video_' + video_id + '" class="preview_video" style="display: block; margin-top: 5px; width: 580px; height: 326px; border: none;" src="' + plugin.protocol + '//www.youtube.com/embed/' + video_id + '?rel=0&autoplay=1&autohide=0&iv_load_policy=3' + theme_string +'" allowfullscreen></iframe>'
        }
        
      } else {
        
        getIframe = function(video_id){
          return '<iframe id="preview_video_' + video_id + '" class="preview_video" style="display: block; margin-top: 5px; width: 580px; height: 35px; border: none;" src="' + plugin.protocol + '//www.youtube.com/embed/' + video_id + '?rel=0&autoplay=1&autohide=0&iv_load_policy=3' + theme_string +'" allowfullscreen></iframe>'
        }
        
      }
      
      if (plugin.artist_name != '') {
        if (search_query.search(plugin.artist_name.toLowerCase()) == -1)
          search_query += ' by ' + plugin.artist_name
      } else if (plugin.album_name != '') {
        if (search_query.search(plugin.album_name.toLowerCase()) == -1)
          search_query += ' ' + plugin.album_name
      }
      
      $.getJSON(plugin.protocol + '//gdata.youtube.com/feeds/api/videos?v=2&alt=json&orderby=relevance&q=' + search_query, function(data){
        
        var video_id = null
        
        if (!data.feed.entry) {
          $song_link.css({'color': '#ccc', 'text-decoration': 'line-through'}).off('click').on('click', function(e){
            e.preventDefault()
            alert('No YouTube videos were found for "' + search_query + '"')
          })
          return
        }
        
        video_id = data.feed.entry[0].media$group.yt$videoid.$t
        
        $song_link.data('video_id', video_id)
        $song_link.after(getIframe(video_id))
        
      })
      
    }
    
  }
  
  plugin.injectVideoTable()
  plugin.getSongList()
  
  for (var i=0; i<plugin.tooltipster_elements.length; i++)
    plugin.tooltipster_elements[i].tooltipster({delay: 0})
  
})(jQuery)
