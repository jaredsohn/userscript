// ==UserScript==
// @name           Youtube
// @namespace      None
// @description    youtube home page
// @include        http://http://www.youtube.com/*
// ==/UserScript==
<head>
      <script>
var yt = yt || {};yt.timing = yt.timing || {};yt.timing.tick = function(label, opt_time) {var timer = yt.timing['timer'] || {};if(opt_time) {timer[label] = opt_time;}else {timer[label] = new Date().getTime();}yt.timing['timer'] = timer;};yt.timing.info = function(label, value) {var info_args = yt.timing['info_args'] || {};info_args[label] = value;yt.timing['info_args'] = info_args;};yt.timing.info('e', "905702,929303,914081,916615,919108,922401,920704,912806,927201,925003,913546,913556,920201,900816,911112,901451");if (document.webkitVisibilityState == 'prerender') {document.addEventListener('webkitvisibilitychange', function() {yt.timing.tick('start');}, false);}yt.timing.tick('start');yt.timing.info('li','1');try {yt.timing['srt'] = window.gtbExternal && window.gtbExternal.pageT() ||window.external && window.external.pageT;} catch(e) {}if (window.chrome && window.chrome.csi) {yt.timing['srt'] = Math.floor(window.chrome.csi().pageT);}if (window.msPerformance && window.msPerformance.timing) {yt.timing['srt'] = window.msPerformance.timing.responseStart - window.msPerformance.timing.navigationStart;}    </script>

<title>YouTube</title><link rel="search" type="application/opensearchdescription+xml" href="http://www.youtube.com/opensearch?locale=en_US" title="YouTube Video Search"><link rel="icon" href="http://s.ytimg.com/yts/img/favicon-vfldLzJxy.ico" type="image/x-icon"><link rel="shortcut icon" href="http://s.ytimg.com/yts/img/favicon-vfldLzJxy.ico" type="image/x-icon">   <link rel="icon" href="//s.ytimg.com/yts/img/favicon_32-vflWoMFGx.png" sizes="32x32"><link rel="alternate" media="handheld" href="http://m.youtube.com/index?&amp;desktop_uri=%2F"><link rel="alternate" media="only screen and (max-width: 640px)" href="http://m.youtube.com/index?&amp;desktop_uri=%2F">  <meta name="description" content="Share your videos with friends, family, and the world">
  <meta name="keywords" content="video, sharing, camera phone, video phone, free, upload">
  <meta property="fb:app_id" content="87741124305">
  <link rel="publisher" href="https://plus.google.com/115229808208707341778">
  <link id="css-3389638041" rel="stylesheet" href="http://s.ytimg.com/yts/cssbin/www-core-vfleLhVpH.css">
    <link id="css-3881518694" rel="stylesheet" href="http://s.ytimg.com/yts/cssbin/www-guide-vfljovH6N.css">


      <script>
if (window.yt.timing) {yt.timing.tick("ct");}    </script>

</head>
<!-- machid: sNW5tN3Z2SWdXaDVIWFp1ak9RUnU4YXc1SXVkN0d3NS05RG9GZUdXcWtZejlFR2U0ampabGx3 -->



  <body id="" class="date-20121030 en_US ltr   ytg-old-clearfix guide-feed-v2 gecko gecko-16" dir="ltr">

  <form name="logoutForm" method="POST" action="/logout">
    <input type="hidden" name="action_logout" value="1">
  </form>



  <!-- begin page -->
    <div id="page" class="  home  ">
        
      <div id="sb-wrapper">
      <div id="sb-container" class="sb-card sb-off">
        <div class="sb-card-arrow"></div>
        <div class="sb-card-border">
          <div class="sb-card-body-arrow"></div>
          <div class="sb-card-content" id="sb-target"></div>
        </div>
      </div>
      <div id="sb-onepick-target" class="sb-off"></div>
    </div>

      <div id="masthead-expanded-acct-sw-container" class="hid with-sandbar">
    <ul id="masthead-expanded-menu-acct-sw-list">
      <li class="masthead-expanded-menu-item">
        <a href="#" onclick="yt.www.masthead.accountswitch.toggle(); return false;">
&#8249; Back
        </a>
      </li>

          <li class="masthead-expanded-acct-sw-sel">
    <p class="masthead-expanded-acct-sw-id1">
        Tony Kilgore<img class="masthead-expanded-acct-sw-sel-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
    </p>
    <p class="masthead-expanded-acct-sw-id2">
      tonyjk95@gmail.com
    </p>
      <p class="masthead-expanded-acct-sw-id2"><img class="masthead-expanded-acct-sw-img" src="https://lh6.googleusercontent.com/-3bmsce50DMk/AAAAAAAAAAI/AAAAAAAAAAA/3bhpJcut67w/s12-c-k/photo.jpg" width="12" height="12" alt="">Tony Kilgore</p>
  </li>


      <li class="masthead-expanded-menu-item">
        <a class="end" href="https://accounts.google.com/AddSession?passive=false&amp;continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26authuser%3D-1%26nomobiletemp%3D1%26hl%3Den_US%26next%3D%252F&amp;uilel=0&amp;service=youtube&amp;hl=en_US">Sign in to another account...</a>
      </li>
      <li class="masthead-expanded-menu-item">
        <a class="end" href="#" onclick="document.logoutForm.submit(); return false;">Sign out of all accounts</a>
      </li>
    </ul>
  </div>

  <div id="masthead-container">
    <!-- begin masthead -->
          <div id="masthead" class="" dir="ltr">
          <a id="logo-container" href="/" title="YouTube home">
    <img id="logo" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="YouTube home">
  </a>


    <div id="masthead-user-bar-container" >
      <div id="masthead-user-bar">
        <div id="masthead-user">
          <span id="masthead-gaia-user-expander" class="masthead-user-menu-expander masthead-expander" onclick="yt.www.masthead.toggleExpandedMasthead()"><span id="masthead-gaia-user-wrapper" class="yt-rounded" tabindex="0">Tony Kilgore</span></span>
    <button type="button" class="sb-button sb-notif-off yt-uix-button" onclick=";return false;" id="sb-button-notify"  role="button"><span class="yt-uix-button-content">  </span></button>
    <button type="button" class="sb-button yt-uix-button" onclick=";return false;" id="sb-button-share"  role="button"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-share-plus" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><span class="yt-uix-button-content">  </span></button>

<span id="masthead-gaia-photo-expander" class="masthead-user-menu-expander masthead-expander" onclick="yt.www.masthead.toggleExpandedMasthead()"><span id="masthead-gaia-photo-wrapper" class="yt-rounded"><span id="masthead-gaia-user-image"><span class="clip"><span class="clip-center"><img src="https://lh6.googleusercontent.com/-3bmsce50DMk/AAAAAAAAAAI/AAAAAAAAAAA/3bhpJcut67w/s28-c-k/photo.jpg" alt=""><span class="vertical-center"></span></span></span></span><span class="masthead-expander-arrow"></span></span></span>
        </div>
      </div>
    </div>
    <div id="masthead-search-bar-container" class="with-sandbar">
      <div id="masthead-search-bar">
<div id="masthead-nav"><a href="/videos?feature=mh" >Browse</a><span class="masthead-link-separator">|</span><a href="/movies?feature=mh" >Movies</a>                <span class="masthead-link-separator">|</span><a id="masthead-upload-link" class="" data-upsell="upload" href="//www.youtube.com/my_videos_upload" >Upload</a></div>        


  <form id="masthead-search" class="search-form consolidated-form" action="/results" onsubmit="if (_gel(&#39;masthead-search-term&#39;).value == &#39;&#39;) return false;">
<button class="search-btn-compontent search-button yt-uix-button yt-uix-button-default" onclick="if (_gel(&#39;masthead-search-term&#39;).value == &#39;&#39;) return false; _gel(&#39;masthead-search&#39;).submit(); return false;;return true;" type="submit" id="search-btn" dir="ltr" tabindex="2"  role="button"><span class="yt-uix-button-content">Search </span></button><div id="masthead-search-terms" class="masthead-search-terms-border" dir="ltr"><label><input id="masthead-search-term" autocomplete="off" class="search-term" name="search_query" value="" type="text" tabindex="1" onkeyup="goog.i18n.bidi.setDirAttribute(event,this)"  title="Search"></label></div>  </form>

      </div>
    </div>
  </div>
          <div id="masthead-expanded" class="hid">
    <div id="masthead-expanded-container" class="with-sandbar">
      <div id="masthead-expanded-menus-container">
        <span id="masthead-expanded-menu-shade"></span>
          <div id="masthead-expanded-google-menu">
    <span class="masthead-expanded-menu-header">
Google account
    </span>
    <div id="masthead-expanded-menu-google-container">
        <img id="masthead-expanded-menu-gaia-photo" alt="" data-src="https://lh6.googleusercontent.com/-3bmsce50DMk/AAAAAAAAAAI/AAAAAAAAAAA/3bhpJcut67w/s28-c-k/photo.jpg">
        <div id="masthead-expanded-menu-account-info">
          <p>Tony Kilgore</p>
        <p id="masthead-expanded-menu-email">tonyjk95@gmail.com</p>
      </div>
      <div id="masthead-expanded-menu-google-column1">
        <ul>
          <li class="masthead-expanded-menu-item"><a href="https://profiles.google.com?authuser=0">Profile</a></li>
          <li class="masthead-expanded-menu-item"><a href="https://plus.google.com/u/0/stream">Google+</a></li>
          <li class="masthead-expanded-menu-item"><a href="https://plus.google.com/u/0/settings/privacy">Privacy</a></li>
        </ul>
      </div>
      <div id="masthead-expanded-menu-google-column2">
        <ul>
          <li class="masthead-expanded-menu-item">
            <a href="https://plus.google.com/u/0/settings">
Settings
            </a>
          </li>
          <li class="masthead-expanded-menu-item">
            <a class="end" href="#" onclick="document.logoutForm.submit(); return false;">
Sign out
            </a>
          </li>
            <li class="masthead-expanded-menu-item">
              <a href="#" onclick="yt.www.masthead.accountswitch.toggle(); return false;">
Switch account
              </a>
            </li>
        </ul>
      </div>
    </div>
  </div>

          <div id="masthead-expanded-menu">
    <span class="masthead-expanded-menu-header">
YouTube
    </span>
    <ul id="masthead-expanded-menu-list">
      <li class="masthead-expanded-menu-item">
        <a href="/user/tjkilgore95?feature=mhee">
My channel
        </a>
      </li>
      <li class="masthead-expanded-menu-item">
        <a href="/my_videos?feature=mhee">
Video Manager
        </a>
      </li>
      <li class="masthead-expanded-menu-item">
        <a href="/my_subscriptions?feature=mhee">Subscriptions</a>
      </li>
      <li class="masthead-expanded-menu-item">
        <a href="/account?feature=mhee">
YouTube settings
        </a>
      </li>
    </ul>
  </div>

      </div>
      <div id="masthead-expanded-sandbar">
        <div id="masthead-expanded-lists-container">
          <div id="masthead-expanded-loading-message">Loading...</div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>


  



      <div id="alerts" ></div>

    <!-- end masthead -->
  </div>
  <div id="content-container">
    <!-- begin content -->
    <div id="content">
              <div id="masthead_child_div"></div>
      






    <div id="ad_creative_1" class="ad-div mastad" style="z-index: 1;">

<script>(function() {var loaded = function() {return yt && yt.www && yt.www.home && yt.www.home.ads;};window.masthead_ad_creative_iframe_1_workaround = function() {if (loaded()) {yt.www.home.ads.workaroundIE(this);}};window.masthead_ad_creative_iframe_1_onload = function() {if (!loaded()) {setTimeout(masthead_ad_creative_iframe_1_onload, 50);return;}yt.www.home.ads.workaroundLoad();};})();</script>

      <iframe id="ad_creative_iframe_1" src="http://ad-g.doubleclick.net/N4061/adi/com.ythome/_default;sz=970x250;tile=1;plat=pc;dc_dedup=1;kage=17;kar=2;kauth=1;kbsg=HPUS121031;kcr=us;kga=1000;kgender=m;kgg=1;klg=en;kmyd=ad_creative_1;kt=U;"
              height="250" width="970"
              scrolling="no" frameborder="0" style="z-index: 1"
              onload="masthead_ad_creative_iframe_1_onload();"
              onmouseover="masthead_ad_creative_iframe_1_workaround(this)"
              onfocus="masthead_ad_creative_iframe_1_workaround(this)"></iframe>
        <script>
    (function() {
      var ord = Math.floor(Math.random() * 10000000000000000);
      var adIframe = document.getElementById("ad_creative_iframe_1");
      adIframe.src = "http://ad-g.doubleclick.net/N4061/adi/com.ythome/_default;sz=970x250;tile=1;plat=pc;dc_dedup=1;kage=17;kar=2;kauth=1;kbsg=HPUS121031;kcr=us;kga=1000;kgender=m;kgg=1;klg=en;kmyd=ad_creative_1;kt=U;ord=" + ord + "?";
    })();
  </script>

    </div>



  <div class="guide-layout-container enable-fancy-subscribe-button">
    <div class="guide-container">
        <div id="guide-builder-promo">
      <div id="guide-builder-promo-buttons">
        <button href="/channels?feature=promo" type="button" class=" yt-uix-button yt-uix-button-primary" onclick=";window.location.href=this.getAttribute(&#39;href&#39;);return false;"  role="button"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-add" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><span class="yt-uix-button-content">Browse channels </span></button>
      </div>
  </div>
  <div class="guide">
      <div id="channel">
        <span id="channel-thumb">
                  <a href="/user/tjkilgore95" class="yt-user-photo " >
        <span class="video-thumb ux-thumb yt-thumb-square-77 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="https://lh6.googleusercontent.com/-3bmsce50DMk/AAAAAAAAAAI/AAAAAAAAAAA/3bhpJcut67w/s77-c-k/photo.jpg" alt="Tony Kilgore" width="77" ><span class="vertical-align"></span></span></span></span>

    </a>


        </span>
<div id="personal-feeds"><ul><li class="guide-item-container"><a class="guide-item guide-item-action" href="/user/tjkilgore95?feature=guide">My channel<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="see-more-arrow" alt=""></a></li><li class="guide-item-container"><a class="guide-item" data-feed-name="uploads" data-feed-type="personal" title="Videos you have uploaded">Videos</a></li><li class="guide-item-container"><a class="guide-item" data-feed-name="likes" data-feed-type="personal" title="Videos you have liked">Likes</a></li><li class="guide-item-container"><a class="guide-item" data-feed-name="history" data-feed-type="personal" title="Videos you have watched">History</a></li><li class="guide-item-container"><a class="guide-item" data-feed-name="watch_later" data-feed-type="personal" title="Videos you have added to your Watch Later list">Watch Later</a></li></ul></div>
      </div>



      <div class="guide-section yt-uix-expander  first">
        <h3 class="guide-item-container">
          <a  class="guide-item selected" id="all-subscriptions" data-feed-name="all" data-feed-type="main">
            <span class="thumb">
              <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="" class="system-icon category">
            </span>
            <span class="display-name">
Subscriptions
            </span>
          </a>
        </h3>
        <ul>
          <li class="guide-item-container hideable">
            <a id="social-guide-item" class="guide-item"
                  data-feed-name="social_all"
                data-feed-type="social">
              <span class="thumb">
                <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="system-icon social">
              </span>
              <span class="display-name">
Social
              </span>
            </a>
          </li>
              <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="BE-FO9JUOghSysV9gjTeHw"
       data-feed-type="user">
        <span class="thumb">  <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i3.ytimg.com/i/BE-FO9JUOghSysV9gjTeHw/1.jpg?v=4f3c90ff" width="28" ><span class="vertical-align"></span></span></span></span>
</span>
      <span class="display-name">
          nixiedoeslinux
      </span>
    </a>
  </li>

              <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="n_5GhTJXWOTVPbiFzksEDA"
       data-feed-type="user">
        <span class="thumb">  <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i3.ytimg.com/i/n_5GhTJXWOTVPbiFzksEDA/1.jpg?v=508c20bd" width="28" ><span class="vertical-align"></span></span></span></span>
</span>
      <span class="display-name">
          SassiBoB
      </span>
    </a>
  </li>

              <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="MyAVYPgP_179gj9OIJZd4A"
       data-feed-type="user">
        <span class="thumb">  <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i2.ytimg.com/i/MyAVYPgP_179gj9OIJZd4A/1.jpg?v=500fd683" width="28" ><span class="vertical-align"></span></span></span></span>
</span>
      <span class="display-name">
          NixiePixel
      </span>
    </a>
  </li>

        </ul>
        <div class="guide-item-container">
          <span class="guide-item guide-item-fake guide-item-action">
<a href="/subscription_manager?feature=foot">see all<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="see-more-arrow" alt=""></a>          </span>
        </div>
      </div>

    <div class="guide-section yt-uix-expander  yt-uix-expander-collapsed ">
      <h3 class="guide-item-container">
        <a class="guide-item" data-feed-name="youtube" data-feed-type="system">
          <span class="thumb">
            <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="" class="system-icon category">
          </span>
          <span class="display-name">
From YouTube
          </span>
        </a>
      </h3>
      <ul>
            <li class="guide-item-container ">
    <a class="guide-item"
       data-feed-name="trending"
       data-feed-type="system">
        <span class="thumb">
          <img class="system-icon system trending" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          Trending
      </span>
    </a>
  </li>

            <li class="guide-item-container ">
    <a class="guide-item"
       data-feed-name="music"
       data-feed-type="system">
        <span class="thumb">
          <img class="system-icon system music" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          Music
      </span>
    </a>
  </li>

            <li class="guide-item-container ">
    <a class="guide-item"
       data-feed-name="entertainment"
       data-feed-type="chart">
        <span class="thumb">
          <img class="system-icon chart entertainment" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          Entertainment
      </span>
    </a>
  </li>

            <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="sports"
       data-feed-type="chart">
        <span class="thumb">
          <img class="system-icon chart sports" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          Sports
      </span>
    </a>
  </li>

            <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="film"
       data-feed-type="chart">
        <span class="thumb">
          <img class="system-icon chart film" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          Film &amp; Animation
      </span>
    </a>
  </li>

            <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="news"
       data-feed-type="chart">
        <span class="thumb">
          <img class="system-icon chart news" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          News &amp; Politics
      </span>
    </a>
  </li>

            <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="comedy"
       data-feed-type="chart">
        <span class="thumb">
          <img class="system-icon chart comedy" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          Comedy
      </span>
    </a>
  </li>

            <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="people"
       data-feed-type="chart">
        <span class="thumb">
          <img class="system-icon chart people" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          People &amp; Blogs
      </span>
    </a>
  </li>

            <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="science"
       data-feed-type="chart">
        <span class="thumb">
          <img class="system-icon chart science" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          Science &amp; Technology
      </span>
    </a>
  </li>

            <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="gadgets"
       data-feed-type="chart">
        <span class="thumb">
          <img class="system-icon chart gadgets" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          Gaming
      </span>
    </a>
  </li>

            <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="howto"
       data-feed-type="chart">
        <span class="thumb">
          <img class="system-icon chart howto" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          Howto &amp; Style
      </span>
    </a>
  </li>

            <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="education"
       data-feed-type="system">
        <span class="thumb">
          <img class="system-icon system education" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          Education
      </span>
    </a>
  </li>

            <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="animals"
       data-feed-type="chart">
        <span class="thumb">
          <img class="system-icon chart animals" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          Pets &amp; Animals
      </span>
    </a>
  </li>

            <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="vehicles"
       data-feed-type="chart">
        <span class="thumb">
          <img class="system-icon chart vehicles" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          Autos &amp; Vehicles
      </span>
    </a>
  </li>

            <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="travel"
       data-feed-type="chart">
        <span class="thumb">
          <img class="system-icon chart travel" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          Travel &amp; Events
      </span>
    </a>
  </li>

            <li class="guide-item-container hideable">
    <a class="guide-item"
       data-feed-name="nonprofits"
       data-feed-type="chart">
        <span class="thumb">
          <img class="system-icon chart nonprofits" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
        </span>
      <span class="display-name">
          Nonprofits &amp; Activism
      </span>
    </a>
  </li>

      </ul>
      <div class="guide-item-container">
        <span class="guide-item guide-item-action guide-item-fake">
            <a class="yt-uix-expander-head guide-show-more-less">
              <span class="show-more">
more
              </span>
              <span class="show-less">
less
              </span>
            </a>
<a href="/videos?feature=hp">see all<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="see-more-arrow" alt=""></a>        </span>
      </div>
    </div>

      <div class="guide-section">
        <h3 class="guide-item-container ">
          <a class="guide-item" data-feed-name="channels" data-feed-type="system">
            <span class="thumb">
              <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="" class="system-icon category">
            </span>
            <span class="display-name">
Suggested channels
            </span>
          </a>
        </h3>
        <ul>
              <li class="guide-item-container ">
    <a class="guide-item guide-recommendation-item"
         data-external-id="zH3iADRIq1IJlIXjfNgTpA"
       data-feed-name="zH3iADRIq1IJlIXjfNgTpA"
       data-feed-type="user">
        <span class="thumb">  <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i3.ytimg.com/i/zH3iADRIq1IJlIXjfNgTpA/1.jpg?v=d0d7ed" width="28" ><span class="vertical-align"></span></span></span></span>
</span>
      <span class="display-name">
          RoosterTeeth
      </span>
        <span class="guide-subscription-button yt-subscription-button-js-default guide-item-action yt-uix-tooltip"
              title="Subscribe to RoosterTeeth
"
              data-tooltip-show-delay="250"
              data-subscription-feature="guide-recs"
              data-subscription-value="zH3iADRIq1IJlIXjfNgTpA">
          <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"
               alt="Subscribe">
        </span>
        <span class="guide-subscription-dismiss guide-item-action">
          <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"
               title="remove"
               alt="Close">
        </span>
    </a>
  </li>

              <li class="guide-item-container ">
    <a class="guide-item guide-recommendation-item"
         data-external-id="2-aop85lqOalGXV4FgFJaw"
       data-feed-name="2-aop85lqOalGXV4FgFJaw"
       data-feed-type="user">
        <span class="thumb">  <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i3.ytimg.com/i/2-aop85lqOalGXV4FgFJaw/1.jpg?v=672aa5" width="28" ><span class="vertical-align"></span></span></span></span>
</span>
      <span class="display-name">
          DTOID
      </span>
        <span class="guide-subscription-button yt-subscription-button-js-default guide-item-action yt-uix-tooltip"
              title="Subscribe to DTOID
"
              data-tooltip-show-delay="250"
              data-subscription-feature="guide-recs"
              data-subscription-value="2-aop85lqOalGXV4FgFJaw">
          <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"
               alt="Subscribe">
        </span>
        <span class="guide-subscription-dismiss guide-item-action">
          <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"
               title="remove"
               alt="Close">
        </span>
    </a>
  </li>

              <li class="guide-item-container ">
    <a class="guide-item guide-recommendation-item"
         data-external-id="i1GLH9ex4aHiU7KRvl2g2A"
       data-feed-name="i1GLH9ex4aHiU7KRvl2g2A"
       data-feed-type="user">
        <span class="thumb">  <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i2.ytimg.com/i/i1GLH9ex4aHiU7KRvl2g2A/1.jpg?v=4fc532bd" width="28" ><span class="vertical-align"></span></span></span></span>
</span>
      <span class="display-name">
          lexusamanda
      </span>
        <span class="guide-subscription-button yt-subscription-button-js-default guide-item-action yt-uix-tooltip"
              title="Subscribe to lexusamanda
"
              data-tooltip-show-delay="250"
              data-subscription-feature="guide-recs"
              data-subscription-value="i1GLH9ex4aHiU7KRvl2g2A">
          <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"
               alt="Subscribe">
        </span>
        <span class="guide-subscription-dismiss guide-item-action">
          <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"
               title="remove"
               alt="Close">
        </span>
    </a>
  </li>

              <li class="guide-item-container ">
    <a class="guide-item guide-recommendation-item"
         data-external-id="bUspPYIbi3jJ4iNrf-wwaA"
       data-feed-name="bUspPYIbi3jJ4iNrf-wwaA"
       data-feed-type="user">
        <span class="thumb">  <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i3.ytimg.com/i/bUspPYIbi3jJ4iNrf-wwaA/1.jpg?v=aa2bad" width="28" ><span class="vertical-align"></span></span></span></span>
</span>
      <span class="display-name">
          BryanStars
      </span>
        <span class="guide-subscription-button yt-subscription-button-js-default guide-item-action yt-uix-tooltip"
              title="Subscribe to BryanStars
"
              data-tooltip-show-delay="250"
              data-subscription-feature="guide-recs"
              data-subscription-value="bUspPYIbi3jJ4iNrf-wwaA">
          <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"
               alt="Subscribe">
        </span>
        <span class="guide-subscription-dismiss guide-item-action">
          <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"
               title="remove"
               alt="Close">
        </span>
    </a>
  </li>

              <li class="guide-item-container ">
    <a class="guide-item guide-recommendation-item"
         data-external-id="kzRDjtq4ngMADh45j2KsJQ"
       data-feed-name="kzRDjtq4ngMADh45j2KsJQ"
       data-feed-type="user">
        <span class="thumb">  <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i4.ytimg.com/i/kzRDjtq4ngMADh45j2KsJQ/1.jpg?v=4fe376a4" width="28" ><span class="vertical-align"></span></span></span></span>
</span>
      <span class="display-name">
          MachinimaPrime
      </span>
        <span class="guide-subscription-button yt-subscription-button-js-default guide-item-action yt-uix-tooltip"
              title="Subscribe to MachinimaPrime
"
              data-tooltip-show-delay="250"
              data-subscription-feature="guide-recs"
              data-subscription-value="kzRDjtq4ngMADh45j2KsJQ">
          <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"
               alt="Subscribe">
        </span>
        <span class="guide-subscription-dismiss guide-item-action">
          <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"
               title="remove"
               alt="Close">
        </span>
    </a>
  </li>

              <li class="guide-item-container ">
    <a class="guide-item guide-recommendation-item"
         data-external-id="LCmJiSbIoa_ZFiBOBDf6ZA"
       data-feed-name="LCmJiSbIoa_ZFiBOBDf6ZA"
       data-feed-type="user">
        <span class="thumb">  <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i1.ytimg.com/i/LCmJiSbIoa_ZFiBOBDf6ZA/1.jpg?v=d0c2d5" width="28" ><span class="vertical-align"></span></span></span></span>
</span>
      <span class="display-name">
          TobyGames
      </span>
        <span class="guide-subscription-button yt-subscription-button-js-default guide-item-action yt-uix-tooltip"
              title="Subscribe to TobyGames
"
              data-tooltip-show-delay="250"
              data-subscription-feature="guide-recs"
              data-subscription-value="LCmJiSbIoa_ZFiBOBDf6ZA">
          <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"
               alt="Subscribe">
        </span>
        <span class="guide-subscription-dismiss guide-item-action">
          <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"
               title="remove"
               alt="Close">
        </span>
    </a>
  </li>

        </ul>
        <div class="guide-item-container">
          <span class="guide-item guide-item-action guide-item-fake">
<a href="/channels?feature=foot">see all<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="see-more-arrow" alt=""></a>          </span>
        </div>
      </div>
  </div>

    </div>
    <div class="guide-background"></div>


    <div id="video-sidebar">
        
  <div id="ad_creative_expand_btn_1" class="masthead-ad-control open hid">
    <a onclick="masthead.expand_ad(); return false;">
      <span>Show ad</span>
      <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
    </a>
  </div>


          <h3>
      <a href="/recommended" class="recommended-videos-link">
Recommended &#0187;
      </a>
    </h3>
    <ul id="recommended-videos">
            <li class="video-list-item recommended-video-item" data-video-id="XhUC34G04Ts">
        <a href="/watch?v=XhUC34G04Ts&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CAIQ9hsoAA%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G2446744RVAAAAAAAAAA"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Call of Duty: Black Ops Zombie Labs Rezurrection Trailer [HD]" data-thumb="//i1.ytimg.com/vi/XhUC34G04Ts/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">2:20</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="XhUC34G04Ts" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Call of Duty: Black Ops Zombie Labs Rezurrection Trailer [HD]">Call of Duty: Black Ops Zombie Labs Rezurrection Trailer [HD]</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">PGgunMan</span></span><span class="stat view-count">4,555,454 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

            <li class="video-list-item recommended-video-item" data-video-id="rkPCb-uEjaI">
        <a href="/watch?v=rkPCb-uEjaI&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CAMQ9hsoAQ%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G2978c35RVAAAAAAAAAQ"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Rise Against - Behind Closed Doors" data-thumb="//i3.ytimg.com/vi/rkPCb-uEjaI/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">3:14</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="rkPCb-uEjaI" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Rise Against - Behind Closed Doors">Rise Against - Behind Closed Doors</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">RiseAgainstVEVO</span></span><span class="stat view-count">1,749,040 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

            <li class="video-list-item recommended-video-item" data-video-id="aPKiKT-fxnA">
        <a href="/watch?v=aPKiKT-fxnA&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CAQQ9hsoAg%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G201b52cRVAAAAAAAAAg"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Memphis May Fire &quot;Ghost In The Mirror&quot; Saw VI Soundtrack" data-thumb="//i2.ytimg.com/vi/aPKiKT-fxnA/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">3:55</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="aPKiKT-fxnA" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Memphis May Fire &quot;Ghost In The Mirror&quot; Saw VI Soundtrack">Memphis May Fire &quot;Ghost In The Mirror&quot; Saw VI Soundtrack</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">TrustkillRecords</span></span><span class="stat view-count">1,639,370 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

            <li class="video-list-item recommended-video-item" data-video-id="1xruqeU8K_4">
        <a href="/watch?v=1xruqeU8K_4&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CAUQ9hsoAw%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G232e278RVAAAAAAAAAw"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="My Darkest Days - Perfect (Lyric Video)" data-thumb="//i2.ytimg.com/vi/1xruqeU8K_4/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">3:48</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="1xruqeU8K_4" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="My Darkest Days - Perfect (Lyric Video)">My Darkest Days - Perfect (Lyric Video)</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">MyDarkestDaysVEVO</span></span><span class="stat view-count">292,381 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

            <li class="video-list-item recommended-video-item" data-video-id="Vtroqq5J-sQ">
        <a href="/watch?v=Vtroqq5J-sQ&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CAYQ9hsoBA%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G247a8ecRVAAAAAAAABA"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Linux Games : What You Should Know" data-thumb="//i3.ytimg.com/vi/Vtroqq5J-sQ/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">4:44</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="Vtroqq5J-sQ" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Linux Games : What You Should Know">Linux Games : What You Should Know</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">nixiedoeslinux</span></span><span class="stat view-count">54,911 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

            <li class="video-list-item recommended-video-item" data-video-id="3L6IC0yeTFs">
        <a href="/watch?v=3L6IC0yeTFs&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CAcQ9hsoBQ%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G20dc455RVAAAAAAAABQ"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Linkin Park - Living Things FULL ALBUM" data-thumb="//i4.ytimg.com/vi/3L6IC0yeTFs/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">37:25</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="3L6IC0yeTFs" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Linkin Park - Living Things FULL ALBUM">Linkin Park - Living Things FULL ALBUM</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">ImmortalMe12345</span></span><span class="stat view-count">3,463,046 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

            <li class="video-list-item recommended-video-item" data-video-id="NUTGr5t3MoY">
        <a href="/watch?v=NUTGr5t3MoY&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CAgQ9hsoBg%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G23b65baRVAAAAAAAABg"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Green Day - Basket Case [Official Music Video]" data-thumb="//i3.ytimg.com/vi/NUTGr5t3MoY/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">3:13</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="NUTGr5t3MoY" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Green Day - Basket Case [Official Music Video]">Green Day - Basket Case [Official Music Video]</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">greenday</span></span><span class="stat view-count">19,072,473 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

            <li class="video-list-item recommended-video-item" data-video-id="YyOHPdTmva8">
        <a href="/watch?v=YyOHPdTmva8&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CAkQ9hsoBw%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G27fb02dRVAAAAAAAABw"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Breaking Benjamin - Dear Agony [COMPLETE ALBUM]" data-thumb="//i2.ytimg.com/vi/YyOHPdTmva8/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">42:06</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="YyOHPdTmva8" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Breaking Benjamin - Dear Agony [COMPLETE ALBUM]">Breaking Benjamin - Dear Agony [COMPLETE ALBUM]</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">askylitpichu</span></span><span class="stat view-count">827,662 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

            <li class="video-list-item recommended-video-item" data-video-id="ADzxugTcixE">
        <a href="/watch?v=ADzxugTcixE&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CAoQ9hsoCA%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G2e6a296RVAAAAAAAACA"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Gamescom Day 2 Multiplayer Live Stream - Official Call of Duty: Black Ops 2 Video" data-thumb="//i2.ytimg.com/vi/ADzxugTcixE/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">1:19:02</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="ADzxugTcixE" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Gamescom Day 2 Multiplayer Live Stream - Official Call of Duty: Black Ops 2 Video">Gamescom Day 2 Multiplayer Live Stream - Official Call of Duty: Black Ops 2 Video</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">CALLOFDUTY</span></span><span class="stat view-count">539,417 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

            <li class="video-list-item recommended-video-item" data-video-id="Sh-cnaJoGCw">
        <a href="/watch?v=Sh-cnaJoGCw&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CAsQ9hsoCQ%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G2c6894dRVAAAAAAAACQ"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Why Linux Sucks  | LFNW 2012" data-thumb="//i4.ytimg.com/vi/Sh-cnaJoGCw/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">43:07</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="Sh-cnaJoGCw" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Why Linux Sucks  | LFNW 2012">Why Linux Sucks  | LFNW 2012</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">jupiterbroadcasting</span></span><span class="stat view-count">139,221 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

            <li class="video-list-item recommended-video-item" data-video-id="XGFbeQVZrUw">
        <a href="/watch?v=XGFbeQVZrUw&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CAwQ9hsoCg%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G24bdf05RVAAAAAAAACg"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Breaking Benjamin-We Are Not Alone" data-thumb="//i1.ytimg.com/vi/XGFbeQVZrUw/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">39:26</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="XGFbeQVZrUw" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Breaking Benjamin-We Are Not Alone">Breaking Benjamin-We Are Not Alone</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">TheGtaIVFan99</span></span><span class="stat view-count">292,972 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

            <li class="video-list-item recommended-video-item" data-video-id="sOVLhnOCLMM">
        <a href="/watch?v=sOVLhnOCLMM&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CA0Q9hsoCw%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G2831e2bRVAAAAAAAACw"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Ubuntu 12.04 Review - Precise Pangolin" data-thumb="//i4.ytimg.com/vi/sOVLhnOCLMM/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">5:48</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="sOVLhnOCLMM" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Ubuntu 12.04 Review - Precise Pangolin">Ubuntu 12.04 Review - Precise Pangolin</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">nixiedoeslinux</span></span><span class="stat view-count">102,933 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

            <li class="video-list-item recommended-video-item" data-video-id="LfHftJES0pw">
        <a href="/watch?v=LfHftJES0pw&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CA4Q9hsoDA%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G24f99adRVAAAAAAAADA"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Minecraft Xbox 360: Ep: 12- UPDATES and BEDROOM CARPET INSTALLATIONS!" data-thumb="//i1.ytimg.com/vi/LfHftJES0pw/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">18:26</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="LfHftJES0pw" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Minecraft Xbox 360: Ep: 12- UPDATES and BEDROOM CARPET INSTALLATIONS!">Minecraft Xbox 360: Ep: 12- UPDATES and BEDROOM CARPET INSTALLATIONS!</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">1042Harley</span></span><span class="stat view-count">2,370 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

            <li class="video-list-item recommended-video-item" data-video-id="pQmpjFmB9yg">
        <a href="/watch?v=pQmpjFmB9yg&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CA8Q9hsoDQ%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G27f115fRVAAAAAAAADQ"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="A Day To Remember - Mr. Highway&#39;s Thinking About The End" data-thumb="//i1.ytimg.com/vi/pQmpjFmB9yg/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">4:03</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="pQmpjFmB9yg" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="A Day To Remember - Mr. Highway&#39;s Thinking About The End">A Day To Remember - Mr. Highway&#39;s Thinking About The End</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">ADayToRememberVEVO</span></span><span class="stat view-count">1,206,703 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

            <li class="video-list-item recommended-video-item" data-video-id="2ZJHZLFCwjE">
        <a href="/watch?v=2ZJHZLFCwjE&amp;feature=g-vrec" class="related-video yt-uix-contextlink  yt-uix-sessionlink" data-sessionlink="ved=CBAQ9hsoDg%3D%3D&amp;ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-vrec&amp;context=G2271190RVAAAAAAAADg"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="The Cranberries - Zombie (live in Paris 1999)" data-thumb="//i3.ytimg.com/vi/2ZJHZLFCwjE/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">5:31</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="2ZJHZLFCwjE" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="The Cranberries - Zombie (live in Paris 1999)">The Cranberries - Zombie (live in Paris 1999)</span><span class="stat attribution">by <span class="yt-user-name " dir="ltr">Jerzdnice9144</span></span><span class="stat view-count">3,095,897 views</span></a>
        <span class="recommended-video-dismiss">
          <img class="close-small" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="remove">
        </span>
    </li>

    </ul>


    <h3 class="sidebar-module-header">
Spotlight
    </h3>
    <h2>Latest Updates, Images From Sandy</h2>
    <p class="sidebar-module-description">
      As Superstorm Sandy continues to slowly travel along the East Coast, millions of residents clean up, while millions more continue to prepare for the storm to touch down. Watch live coverage from the Weather Channel below, as well as videos from on the ground.
    </p>
    <ul>
        <li class="video-list-item "><a href="/watch?v=yXMU2qwCVag&amp;feature=g-sptl&amp;cid=inp-hs-san" class="video-list-item-link yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-sptl%26cid%3Dinp-hs-san" ><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="LIVE Superstorm Sandy Coverage - The Weather Channel" data-thumb="//i2.ytimg.com/vi/yXMU2qwCVag/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">0:00</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="yXMU2qwCVag" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="LIVE Superstorm Sandy Coverage - The Weather Channel">LIVE Superstorm Sandy Coverage - The Weather Ch...</span><span class="stat">by <span class="yt-user-name " dir="ltr">TheWeatherChannel</span></span><span class="stat view-count">  <span class="viewcount">7,571,287 views</span>
</span></a></li>
        <li class="video-list-item "><a href="/watch?v=sW3a37md0vk&amp;feature=g-sptl&amp;cid=inp-hs-san" class="video-list-item-link yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-sptl%26cid%3Dinp-hs-san" ><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Scenes from East 8th Street and Avenue C before the blackout" data-thumb="//i4.ytimg.com/vi/sW3a37md0vk/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">0:46</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="sW3a37md0vk" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Scenes from East 8th Street and Avenue C before the blackout">Scenes from East 8th Street and Avenue C before...</span><span class="stat">by <span class="yt-user-name " dir="ltr">nydailynews</span></span><span class="stat view-count">  <span class="viewcount">34,941 views</span>
</span></a></li>
        <li class="video-list-item "><a href="/watch?v=bMYE8U9_VA8&amp;feature=g-sptl&amp;cid=inp-hs-san" class="video-list-item-link yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-sptl%26cid%3Dinp-hs-san" ><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Power outage and Flooding in Manhattan due to #Sandy" data-thumb="//i3.ytimg.com/vi/bMYE8U9_VA8/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">1:33</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="bMYE8U9_VA8" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Power outage and Flooding in Manhattan due to #Sandy">Power outage and Flooding in Manhattan due to #...</span><span class="stat">by <span class="yt-user-name " dir="ltr">Tim Pool</span></span><span class="stat view-count">  <span class="viewcount">74,606 views</span>
</span></a></li>
        <li class="video-list-item "><a href="/watch?v=sVl7RMC4RdA&amp;feature=g-sptl&amp;cid=inp-hs-san" class="video-list-item-link yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-sptl%26cid%3Dinp-hs-san" ><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Hurricane Sandy- NYC- FDR Drive Flooded! 10-29-12 @ 10 PM" data-thumb="//i4.ytimg.com/vi/sVl7RMC4RdA/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">0:30</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="sVl7RMC4RdA" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Hurricane Sandy- NYC- FDR Drive Flooded! 10-29-12 @ 10 PM">Hurricane Sandy- NYC- FDR Drive Flooded! 10-29-...</span><span class="stat">by <span class="yt-user-name " dir="ltr">Paul Y.</span></span><span class="stat view-count">  <span class="viewcount">2,964 views</span>
</span></a></li>
    </ul>

    <h3>
Featured
    </h3>
    <ul>
        <li class="video-list-item "><a href="/watch?v=7Pgb3kZIiu8&amp;feature=g-feat" class="video-list-item-link yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-feat&amp;context=G20195d1YFAAAAAAAAAA" ><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Enrique Iglesias pide dinero prestado" data-thumb="//i4.ytimg.com/vi/7Pgb3kZIiu8/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">2:37</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="7Pgb3kZIiu8" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="Enrique Iglesias pide dinero prestado">Enrique Iglesias pide dinero prestado</span><span class="stat">by <span class="yt-user-name " dir="ltr">Gaby Natale</span></span><span class="stat view-count">  <span class="viewcount">6,824 views</span>
</span></a></li>
        <li class="video-list-item "><a href="/watch?v=4Qd6SBjfgkE&amp;feature=g-feat" class="video-list-item-link yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-feat&amp;context=G2a8563eYFAAAAAAAAAQ" ><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="iPhone 5 Beats iPhone 4S, Creates History ||  Must Watch" data-thumb="//i1.ytimg.com/vi/4Qd6SBjfgkE/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">1:07</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="4Qd6SBjfgkE" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="iPhone 5 Beats iPhone 4S, Creates History ||  Must Watch">iPhone 5 Beats iPhone 4S, Creates History ||  M...</span><span class="stat">by <span class="yt-user-name " dir="ltr">clicktechdoll</span></span><span class="stat view-count">  <span class="viewcount">126,610 views</span>
</span></a></li>
        <li class="video-list-item "><a href="/watch?v=e55aN_fCAEQ&amp;feature=g-feat" class="video-list-item-link yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-feat&amp;context=G29878c6YFAAAAAAAAAg" ><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb yt-thumb-default-120 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="La Fusion Nely Galan Interview" data-thumb="//i2.ytimg.com/vi/e55aN_fCAEQ/default.jpg" width="120" ><span class="vertical-align"></span></span></span></span><span class="video-time">3:16</span>


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="e55aN_fCAEQ" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>
</span><span dir="ltr" class="title" title="La Fusion Nely Galan Interview">La Fusion Nely Galan Interview</span><span class="stat">by <span class="yt-user-name " dir="ltr">NGLVidaLatina</span></span><span class="stat view-count">  <span class="viewcount">2,387 views</span>
</span></a></li>
    </ul>

    </div>

    <div id="feed">
        <div id="feed-main-all" class="individual-feed" data-loaded="true" data-feed-name="all" data-feed-type="main">
        <div class="feed-header before-feed-content">
    <div class="feed-header-subscribe thumb">
          <label>
      <span class="yt-uix-form-input-checkbox-container  checked"><input type="checkbox" name="" class="yt-uix-form-input-checkbox feed-filter" checked="checked"><span class="yt-uix-form-input-checkbox-element"></span></span>

Show uploads only
  </label>
  <span class="feed-filter-separator">|</span>
<span class="yt-uix-button-group"><button type="button" class="feed-view-button yt-uix-button yt-uix-button-view-choices yt-uix-button-short" onclick=";return false;" data-view-type="" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-content">View </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-view-choices" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-40220400706"><span class="feed-view-choice checked yt-uix-button-menu-item" onclick=";return false;" data-feed-type="main" data-feed-name="all">Highlights</span></li><li role="menuitem" id="aria-id-63356018928"><span class="feed-view-choice yt-uix-button-menu-item" onclick=";return false;" data-feed-type="main" data-feed-name="all" data-view-type="e">Everything</span></li></ul></button></span>
    </div>
    <div class="feed-header-thumb">
      <img class="feed-header-icon all" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
    </div>
    <div class="feed-header-details context-source-container" data-context-source="Subscriptions">
      <h2>Subscriptions</h2>
      <p class="metadata">
        <a href="/subscription_manager?feature=subhead">3 subscriptions<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="" class="see-more-arrow"></a>
      </p>
    </div>
  </div>

        <div class="feed-container" data-filter-type="u" data-view-type="">

    <div class="feed-page">
          <ul class="context-data-container">
      <li>
          <div class="feed-item-container  first " data-channel-key="UCBE-FO9JUOghSysV9gjTeHw">

          
      <div class="feed-author-bubble-container">
<a href="/user/nixiedoeslinux?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="nixiedoeslinux" data-thumb="//i3.ytimg.com/i/BE-FO9JUOghSysV9gjTeHw/1.jpg?v=4f3c90ff" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
 uploaded a video



                <span class="feed-item-time">
      1 month ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Steam for Linux a Bad Idea? - This Week in Linux Gaming" data-context-item-type="video" data-context-item-time="5:21" data-context-item-user="nixiedoeslinux" data-context-item-id="7LVtbTurdCk" data-context-item-views="25,816 views" data-context-item-actionuser="nixiedoeslinux">
    <div class="feed-item-thumb watched">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G2dd3386FUAAAAAAAAAA" href="/watch?v=7LVtbTurdCk&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i4.ytimg.com/vi/7LVtbTurdCk/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">5:21</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="7LVtbTurdCk" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

        <div class="feed-thumb-watched">
WATCHED
        </div>
    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=7LVtbTurdCk&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G2dd3386FUAAAAAAAAAA"
            
        >
          Steam for Linux a Bad Idea? - This Week in Linux Gaming
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    25,816 views
  </span>



      <div class="description" >
        <p>The Linux gaming scene is continuing to look more promising, and recent news reinforces this. Except for some negative opinions about Steam on Linu...</p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PqyfOmT8QmomqIwGPT4hxRGvXqh6izrXz8s1TlSF8fg0h_MQ8Qjx10A==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-69285446284"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-71783894232"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-62584392243"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-68105254288"><span data-channel-key="UCBE-FO9JUOghSysV9gjTeHw" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from nixiedoeslinux
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div></div>

      </li>
      <li>
          <div class="feed-item-container  " data-channel-key="UCMyAVYPgP_179gj9OIJZd4A">

          
      <div class="feed-author-bubble-container">
<a href="/user/NixiePixel?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="NixiePixel" data-thumb="//i2.ytimg.com/i/MyAVYPgP_179gj9OIJZd4A/1.jpg?v=500fd683" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
 uploaded a video



                <span class="feed-item-time">
      1 month ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Top 7 Most Sexy Video Game Girls" data-context-item-type="video" data-context-item-time="4:08" data-context-item-user="NixiePixel" data-context-item-id="xlDMv0Zo3no" data-context-item-views="40,008 views" data-context-item-actionuser="NixiePixel">
    <div class="feed-item-thumb">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G281e69cFUAAAAAAABAA" href="/watch?v=xlDMv0Zo3no&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i1.ytimg.com/vi/xlDMv0Zo3no/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">4:08</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="xlDMv0Zo3no" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=xlDMv0Zo3no&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G281e69cFUAAAAAAABAA"
            
        >
          Top 7 Most Sexy Video Game Girls
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    40,008 views
  </span>



      <div class="description" >
        <p>Everyone loves hot video game girls, right? This list of sexy women characters in games includes the reasons why they capture our imaginations. || ...</p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PJILSZ0eJFRIENHW7QhOQMDxQyI0samjWhnk7-2V676lKLTD_PbE3Dg==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-47505271878"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-9332090698"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD8P2JI8XRZhNcTz8yl4sIKI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from NixiePixel
</span></li><li role="menuitem" id="aria-id-5521118565"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to NixiePixel
</span></li><li role="menuitem" id="aria-id-89584132985"><span data-channel-key="UCMyAVYPgP_179gj9OIJZd4A" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD8P2JI8XRZhNcTz8yl4sIKI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from NixiePixel
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div></div>

      </li>
      <li>
          <div class="feed-item-container  " data-channel-key="UCBE-FO9JUOghSysV9gjTeHw">

          
      <div class="feed-author-bubble-container">
<a href="/user/nixiedoeslinux?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="nixiedoeslinux" data-thumb="//i3.ytimg.com/i/BE-FO9JUOghSysV9gjTeHw/1.jpg?v=4f3c90ff" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
 uploaded a video



                <span class="feed-item-time">
      1 month ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Top 5 Open Source Firefox Add Ons" data-context-item-type="video" data-context-item-time="5:23" data-context-item-user="nixiedoeslinux" data-context-item-id="U0SZ85nO8Pg" data-context-item-views="16,204 views" data-context-item-actionuser="nixiedoeslinux">
    <div class="feed-item-thumb">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G24be31dFUAAAAAAACAA" href="/watch?v=U0SZ85nO8Pg&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i2.ytimg.com/vi/U0SZ85nO8Pg/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">5:23</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="U0SZ85nO8Pg" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=U0SZ85nO8Pg&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G24be31dFUAAAAAAACAA"
            
        >
          Top 5 Open Source Firefox Add Ons
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    16,204 views
  </span>



      <div class="description" >
        <p>With over 2 billion add ons downloaded by Mozilla Firefox users, using extensions seem to be essential to using an internet browser. Here&#39;s some ve...</p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PqyfOmT8QmomqIwGPT4hxRP5B-4Fo-9ig190dXbqE7wXUGt5a0gt7VA==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-55499542390"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-49683698694"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-50343337376"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-19537626459"><span data-channel-key="UCBE-FO9JUOghSysV9gjTeHw" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from nixiedoeslinux
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div></div>

      </li>
      <li>
          <div class="feed-item-container  " data-channel-key="UCMyAVYPgP_179gj9OIJZd4A">

          
      <div class="feed-author-bubble-container">
<a href="/user/NixiePixel?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="NixiePixel" data-thumb="//i2.ytimg.com/i/MyAVYPgP_179gj9OIJZd4A/1.jpg?v=500fd683" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
 uploaded a video



                <span class="feed-item-time">
      1 month ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="REPLACED! By a Brunette? - Pocket App Review" data-context-item-type="video" data-context-item-time="4:09" data-context-item-user="NixiePixel" data-context-item-id="-2ArETimVu8" data-context-item-views="17,526 views" data-context-item-actionuser="NixiePixel">
    <div class="feed-item-thumb">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G200f375FUAAAAAAADAA" href="/watch?v=-2ArETimVu8&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i2.ytimg.com/vi/-2ArETimVu8/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">4:09</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="-2ArETimVu8" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=-2ArETimVu8&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G200f375FUAAAAAAADAA"
            
        >
          REPLACED! By a Brunette? - Pocket App Review
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    17,526 views
  </span>



      <div class="description" >
        <p>And now for something completely different. I give you SassiBob, she is a great friend of mine, and a fellow geek. Find SassiBob here: <a href="http://bit.l" target="_blank" title="http://bit.l" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">http://bit.l</a>...</p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PJILSZ0eJFRIirjCRa0k7YVLv_XwjSsrOe04jXbITPjQc7GUFyYyiYw==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-66163391502"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-31508349518"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD8P2JI8XRZhNcTz8yl4sIKI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from NixiePixel
</span></li><li role="menuitem" id="aria-id-99032466000"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to NixiePixel
</span></li><li role="menuitem" id="aria-id-88999689542"><span data-channel-key="UCMyAVYPgP_179gj9OIJZd4A" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD8P2JI8XRZhNcTz8yl4sIKI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from NixiePixel
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div></div>

      </li>
      <li>
          <div class="feed-item-container  " data-channel-key="UCBE-FO9JUOghSysV9gjTeHw">

          
      <div class="feed-author-bubble-container">
<a href="/user/nixiedoeslinux?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="nixiedoeslinux" data-thumb="//i3.ytimg.com/i/BE-FO9JUOghSysV9gjTeHw/1.jpg?v=4f3c90ff" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
 uploaded a video



                <span class="feed-item-time">
      1 month ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Linux Gaming News - Steam Greenlight Giving Us Games" data-context-item-type="video" data-context-item-time="6:11" data-context-item-user="nixiedoeslinux" data-context-item-id="zADbyRWgfUk" data-context-item-views="18,169 views" data-context-item-actionuser="nixiedoeslinux">
    <div class="feed-item-thumb">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G2525bf1FUAAAAAAAEAA" href="/watch?v=zADbyRWgfUk&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i3.ytimg.com/vi/zADbyRWgfUk/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">6:11</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="zADbyRWgfUk" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=zADbyRWgfUk&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G2525bf1FUAAAAAAAEAA"
            
        >
          Linux Gaming News - Steam Greenlight Giving Us Games
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    18,169 views
  </span>



      <div class="description" >
        <p>We&#39;ve known for a while that Valve is bringing Steam to Linux. One of the most exciting Steam projects for Linux gamers is... || Join the chat: htt...</p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PS1QXlm4qXKhVwi7EBoM_RJ1zlHIMxWl5bn8adZBVsgvbcDClvRfN5g==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-4284477651"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-5383088467"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-1535801684"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-19556426729"><span data-channel-key="UCBE-FO9JUOghSysV9gjTeHw" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from nixiedoeslinux
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div></div>

      </li>
      <li>
          <div class="feed-item-container  " data-channel-key="UCMyAVYPgP_179gj9OIJZd4A">

          
      <div class="feed-author-bubble-container">
<a href="/user/NixiePixel?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="NixiePixel" data-thumb="//i2.ytimg.com/i/MyAVYPgP_179gj9OIJZd4A/1.jpg?v=500fd683" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
 uploaded a video



                <span class="feed-item-time">
      1 month ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="It&#39;s Been 5 Years!" data-context-item-type="video" data-context-item-time="3:32" data-context-item-user="NixiePixel" data-context-item-id="gxWRNfx23Rc" data-context-item-views="23,054 views" data-context-item-actionuser="NixiePixel">
    <div class="feed-item-thumb">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G25249b2FUAAAAAAAFAA" href="/watch?v=gxWRNfx23Rc&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i4.ytimg.com/vi/gxWRNfx23Rc/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">3:32</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="gxWRNfx23Rc" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=gxWRNfx23Rc&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G25249b2FUAAAAAAAFAA"
            
        >
          It&#39;s Been 5 Years!
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    23,054 views
  </span>



      <div class="description" >
        <p>Thanks for sticking with me for 5 years of videos! It hasn&#39;t been easy, especially with nagging ADHD and procrastination.. so I thought I&#39;d show yo...</p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PJILSZ0eJFRIqVwE6JImu_DgzjvH9sEX5Caz3Khr6d16QduumB61MyA==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-33574103675"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-75436809102"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD8P2JI8XRZhNcTz8yl4sIKI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from NixiePixel
</span></li><li role="menuitem" id="aria-id-74581719741"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to NixiePixel
</span></li><li role="menuitem" id="aria-id-40088088097"><span data-channel-key="UCMyAVYPgP_179gj9OIJZd4A" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD8P2JI8XRZhNcTz8yl4sIKI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from NixiePixel
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div></div>

      </li>
      <li>
          <div class="feed-item-container  " data-channel-key="UCBE-FO9JUOghSysV9gjTeHw">

          
      <div class="feed-author-bubble-container">
<a href="/user/nixiedoeslinux?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="nixiedoeslinux" data-thumb="//i3.ytimg.com/i/BE-FO9JUOghSysV9gjTeHw/1.jpg?v=4f3c90ff" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
 uploaded a video



                <span class="feed-item-time">
      3 days ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Whats New with Ubuntu 12.10 Quantal Quetzal" data-context-item-type="video" data-context-item-time="4:39" data-context-item-user="nixiedoeslinux" data-context-item-id="48J2-akhCxo" data-context-item-views="14,259 views" data-context-item-actionuser="nixiedoeslinux">
    <div class="feed-item-thumb watched">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G2339f85FUAAAAAAAGAA" href="/watch?v=48J2-akhCxo&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i1.ytimg.com/vi/48J2-akhCxo/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">4:39</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="48J2-akhCxo" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

        <div class="feed-thumb-watched">
WATCHED
        </div>
    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=48J2-akhCxo&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G2339f85FUAAAAAAAGAA"
            
        >
          Whats New with Ubuntu 12.10 Quantal Quetzal
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    14,259 views
  </span>



      <div class="description" >
        <p>Is it worth the upgrade? What if you&#39;re new to Ubuntu? Today I&#39;ll be covering some of the best new features of 12.10 in this weeks OS ALT! Join the...</p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PS1QXlm4qXKhVwi7EBoM_RD9bjPCBRAHJYkqedEHq3C9qkeeTBkNQxQ==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-48910125452"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-71463957365"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-46916377416"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-66524586437"><span data-channel-key="UCBE-FO9JUOghSysV9gjTeHw" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from nixiedoeslinux
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div></div>

      </li>
      <li>
          <div class="feed-item-container  " data-channel-key="UCMyAVYPgP_179gj9OIJZd4A">

          
      <div class="feed-author-bubble-container">
<a href="/user/NixiePixel?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="NixiePixel" data-thumb="//i2.ytimg.com/i/MyAVYPgP_179gj9OIJZd4A/1.jpg?v=500fd683" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
 uploaded a video



                <span class="feed-item-time">
      5 days ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Nixie&#39;s Birthday Vlog Jubilee" data-context-item-type="video" data-context-item-time="3:29" data-context-item-user="NixiePixel" data-context-item-id="M3PG83Yoprk" data-context-item-views="9,643 views" data-context-item-actionuser="NixiePixel">
    <div class="feed-item-thumb">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G2b19309FUAAAAAAAHAA" href="/watch?v=M3PG83Yoprk&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i2.ytimg.com/vi/M3PG83Yoprk/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">3:29</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="M3PG83Yoprk" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=M3PG83Yoprk&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G2b19309FUAAAAAAAHAA"
            
        >
          Nixie&#39;s Birthday Vlog Jubilee
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    9,643 views
  </span>



      <div class="description" >
        <p>Zoology is still geeky, right? 8-) Come celebrate my birthday with me here at the San Diego Zoo where there&#39;s waaaay more than just lions, tigers a...</p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PJILSZ0eJFRKPiCTblovCExPc1DJo4SZNC8w2UPdPt4rfSjkbZnP0Jw==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-53349066615"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-97356992043"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD8P2JI8XRZhNcTz8yl4sIKI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from NixiePixel
</span></li><li role="menuitem" id="aria-id-62304622228"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to NixiePixel
</span></li><li role="menuitem" id="aria-id-78985239745"><span data-channel-key="UCMyAVYPgP_179gj9OIJZd4A" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD8P2JI8XRZhNcTz8yl4sIKI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from NixiePixel
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div></div>

      </li>
      <li>
          <div class="feed-item-container  " data-channel-key="UCBE-FO9JUOghSysV9gjTeHw">

          
      <div class="feed-author-bubble-container">
<a href="/user/nixiedoeslinux?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="nixiedoeslinux" data-thumb="//i3.ytimg.com/i/BE-FO9JUOghSysV9gjTeHw/1.jpg?v=4f3c90ff" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
 uploaded a video



                <span class="feed-item-time">
      1 week ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Virtual Machine - Tutorial / Howto" data-context-item-type="video" data-context-item-time="4:13" data-context-item-user="nixiedoeslinux" data-context-item-id="M1eKwlCAJ9I" data-context-item-views="14,147 views" data-context-item-actionuser="nixiedoeslinux">
    <div class="feed-item-thumb">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G246b8dcFUAAAAAAAIAA" href="/watch?v=M1eKwlCAJ9I&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i2.ytimg.com/vi/M1eKwlCAJ9I/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">4:13</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="M1eKwlCAJ9I" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=M1eKwlCAJ9I&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G246b8dcFUAAAAAAAIAA"
            
        >
          Virtual Machine - Tutorial / Howto
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    14,147 views
  </span>



      <div class="description" >
        <p>In this episode of OS ALT, I describe what is a vm and how to install the free virtual machine software virtualbox. || Join the chat: <a href="http://fb.me/" target="_blank" title="http://fb.me/" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">http://fb.me/</a>...</p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PqyfOmT8QmomqIwGPT4hxRP75L4YIe1rAg7231sMEDHQ4ICB8Og1Vew==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-9553043795"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-43939839347"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-89671442910"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-10400720376"><span data-channel-key="UCBE-FO9JUOghSysV9gjTeHw" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from nixiedoeslinux
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div></div>

      </li>
      <li>
          <div class="feed-item-container  " data-channel-key="UCn_5GhTJXWOTVPbiFzksEDA">

          
      <div class="feed-author-bubble-container">
<a href="/user/SassiBoB?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="SassiBoB" data-thumb="//i3.ytimg.com/i/n_5GhTJXWOTVPbiFzksEDA/1.jpg?v=508c20bd" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/SassiBoB?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">SassiBoB</a></span>
 uploaded a video



                <span class="feed-item-time">
      1 week ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Angelica Castro &amp; Mozilla Festival" data-context-item-type="video" data-context-item-time="2:23" data-context-item-user="SassiBoB" data-context-item-id="rC5u6kbMNGY" data-context-item-views="6,039 views" data-context-item-actionuser="SassiBoB">
    <div class="feed-item-thumb">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G2c412acFUAAAAAAAJAA" href="/watch?v=rC5u6kbMNGY&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i3.ytimg.com/vi/rC5u6kbMNGY/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">2:23</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="rC5u6kbMNGY" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=rC5u6kbMNGY&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G2c412acFUAAAAAAAJAA"
            
        >
          Angelica Castro &amp; Mozilla Festival
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    6,039 views
  </span>



      <div class="description" >
        <p>Check out the beautiful Angelica:</p>
<p><a href="http://www.youtube.com/user/angelicacastrotv" target="_blank" title="http://www.youtube.com/user/angelicacastrotv" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">http://www.youtube.com/user...</a></p>
<p></p>
<p>Amy Schmittaur:</p>
<p><a href="http://www.youtube.com/schmittastic" target="_blank" title="http://www.youtube.com/schmittastic" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">http://www.youtube.com/schm...</a></p>
<p></p>
<p>WebMaker:</p>
<p>http...</p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PqyfOmT8Qmokk_DL1hao1mfUCMBANPAHY6i-uGa7syHnDcoT2yz_oAQ==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-70716771110"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-2941535920"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD5Y9RHid91zDwgYdbtWXBEk" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from SassiBoB
</span></li><li role="menuitem" id="aria-id-8593813719"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to SassiBoB
</span></li><li role="menuitem" id="aria-id-53948235760"><span data-channel-key="UCn_5GhTJXWOTVPbiFzksEDA" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD5Y9RHid91zDwgYdbtWXBEk" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from SassiBoB
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/SassiBoB?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">SassiBoB</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/SassiBoB?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">SassiBoB</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/SassiBoB?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">SassiBoB</a></span>
</div></div>

      </li>
      <li>
          <div class="feed-item-container  " data-channel-key="UCMyAVYPgP_179gj9OIJZd4A">

          
      <div class="feed-author-bubble-container">
<a href="/user/NixiePixel?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="NixiePixel" data-thumb="//i2.ytimg.com/i/MyAVYPgP_179gj9OIJZd4A/1.jpg?v=500fd683" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
 uploaded a video



                <span class="feed-item-time">
      1 week ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Tech Review : Elgato Game Capture HD" data-context-item-type="video" data-context-item-time="4:06" data-context-item-user="NixiePixel" data-context-item-id="Hyo4mblMlHE" data-context-item-views="10,226 views" data-context-item-actionuser="NixiePixel">
    <div class="feed-item-thumb">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G2d1a0b6FUAAAAAAAKAA" href="/watch?v=Hyo4mblMlHE&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i1.ytimg.com/vi/Hyo4mblMlHE/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">4:06</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="Hyo4mblMlHE" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=Hyo4mblMlHE&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G2d1a0b6FUAAAAAAAKAA"
            
        >
          Tech Review : Elgato Game Capture HD
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    10,226 views
  </span>



      <div class="description" >
        <p>Back by popular demand - product reviews! What do you think?  Join the chat: <a href="http://bit.ly/nixgoogleplus" target="_blank" title="http://bit.ly/nixgoogleplus" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">http://bit.ly/nixgoogleplus</a> || <a href="http://twitter.com/nixiepixel" target="_blank" title="http://twitter.com/nixiepixel" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">http://twitter.com/nixiepixel</a> </p>
<p></p>
<p>To kick...</p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PJILSZ0eJFRKPVNH9XkoJmHl7g29r2Z7pWUg_hwnexP5gJI6b3HvUMA==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-98884962303"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-73978986473"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD8P2JI8XRZhNcTz8yl4sIKI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from NixiePixel
</span></li><li role="menuitem" id="aria-id-5270539041"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to NixiePixel
</span></li><li role="menuitem" id="aria-id-3066917206"><span data-channel-key="UCMyAVYPgP_179gj9OIJZd4A" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD8P2JI8XRZhNcTz8yl4sIKI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from NixiePixel
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div></div>

      </li>
      <li>
          <div class="feed-item-container  " data-channel-key="UCBE-FO9JUOghSysV9gjTeHw">

          
      <div class="feed-author-bubble-container">
<a href="/user/nixiedoeslinux?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="nixiedoeslinux" data-thumb="//i3.ytimg.com/i/BE-FO9JUOghSysV9gjTeHw/1.jpg?v=4f3c90ff" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
 uploaded a video



                <span class="feed-item-time">
      2 weeks ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Ubuntu Howto : Unity Launcher Fixes" data-context-item-type="video" data-context-item-time="4:17" data-context-item-user="nixiedoeslinux" data-context-item-id="zIznfTAvJgA" data-context-item-views="18,901 views" data-context-item-actionuser="nixiedoeslinux">
    <div class="feed-item-thumb watched">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G2e028d9FUAAAAAAALAA" href="/watch?v=zIznfTAvJgA&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i3.ytimg.com/vi/zIznfTAvJgA/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">4:17</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="zIznfTAvJgA" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

        <div class="feed-thumb-watched">
WATCHED
        </div>
    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=zIznfTAvJgA&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G2e028d9FUAAAAAAALAA"
            
        >
          Ubuntu Howto : Unity Launcher Fixes
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    18,901 views
  </span>



      <div class="description" >
        <p>Though this most recent release of Ubuntu has been good to us, it&#39;s not without faults. The launcher for unity is awesome when it works. And when i...</p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PS1QXlm4qXKhVwi7EBoM_RGFpwdqVnAH-dqC8OhRcPzV0ngx04EJHgQ==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-17017458839"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-27652003452"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-13786163608"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-88805288643"><span data-channel-key="UCBE-FO9JUOghSysV9gjTeHw" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from nixiedoeslinux
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div></div>

      </li>
      <li>
          <div class="feed-item-container  " data-channel-key="UCMyAVYPgP_179gj9OIJZd4A">

          
      <div class="feed-author-bubble-container">
<a href="/user/NixiePixel?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="NixiePixel" data-thumb="//i2.ytimg.com/i/MyAVYPgP_179gj9OIJZd4A/1.jpg?v=500fd683" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
 uploaded a video



                <span class="feed-item-time">
      2 weeks ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Magic the Gathering Tutorial - Drafting!" data-context-item-type="video" data-context-item-time="8:08" data-context-item-user="NixiePixel" data-context-item-id="52VRfcUNIw4" data-context-item-views="14,633 views" data-context-item-actionuser="NixiePixel">
    <div class="feed-item-thumb">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G26e2506FUAAAAAAAMAA" href="/watch?v=52VRfcUNIw4&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i2.ytimg.com/vi/52VRfcUNIw4/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">8:08</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="52VRfcUNIw4" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=52VRfcUNIw4&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G26e2506FUAAAAAAAMAA"
            
        >
          Magic the Gathering Tutorial - Drafting!
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    14,633 views
  </span>



      <div class="description" >
        <p>Whether you know how to play Magic the Gathering or not, you should still learn the best (most balanced) way to start a MTG game. Drafting! This dr...</p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PJILSZ0eJFRLPJNJ2FGEcKgv_PFyNZGpH7PPXQEVQnNLoKMt58vzUVA==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-67664393819"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-36267216527"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD8P2JI8XRZhNcTz8yl4sIKI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from NixiePixel
</span></li><li role="menuitem" id="aria-id-87133655781"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to NixiePixel
</span></li><li role="menuitem" id="aria-id-69148682584"><span data-channel-key="UCMyAVYPgP_179gj9OIJZd4A" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD8P2JI8XRZhNcTz8yl4sIKI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from NixiePixel
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div></div>

      </li>
      <li>
          <div class="feed-item-container  " data-channel-key="UCMyAVYPgP_179gj9OIJZd4A">

          
      <div class="feed-author-bubble-container">
<a href="/user/NixiePixel?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="NixiePixel" data-thumb="//i2.ytimg.com/i/MyAVYPgP_179gj9OIJZd4A/1.jpg?v=500fd683" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
 uploaded a video



                <span class="feed-item-time">
      3 weeks ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Lets Play Slender - Reactions with Facecam" data-context-item-type="video" data-context-item-time="9:47" data-context-item-user="NixiePixel" data-context-item-id="4hhc1tMfUkY" data-context-item-views="13,186 views" data-context-item-actionuser="NixiePixel">
    <div class="feed-item-thumb">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G25b0a7aFUAAAAAAANAA" href="/watch?v=4hhc1tMfUkY&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i1.ytimg.com/vi/4hhc1tMfUkY/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">9:47</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="4hhc1tMfUkY" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=4hhc1tMfUkY&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G25b0a7aFUAAAAAAANAA"
            
        >
          Lets Play Slender - Reactions with Facecam
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    13,186 views
  </span>



      <div class="description" >
        <p>This week in Geekbuzz I play Slender, a free scary game that recently became a Youtube sensation. I&#39;m freaked out by horror games to the point...||...</p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PJILSZ0eJFRLR6nd9j_f_tklkmqPD12Eu2w2bwsALIk7SLCIa6nS1FA==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-57533974563"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-59022211578"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD8P2JI8XRZhNcTz8yl4sIKI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from NixiePixel
</span></li><li role="menuitem" id="aria-id-64439459126"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to NixiePixel
</span></li><li role="menuitem" id="aria-id-60775782552"><span data-channel-key="UCMyAVYPgP_179gj9OIJZd4A" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD8P2JI8XRZhNcTz8yl4sIKI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from NixiePixel
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/NixiePixel?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">NixiePixel</a></span>
</div></div>

      </li>
      <li>
          <div class="feed-item-container  last " data-channel-key="UCn_5GhTJXWOTVPbiFzksEDA">

          
      <div class="feed-author-bubble-container">
<a href="/user/SassiBoB?feature=g-u-u" class="feed-author-bubble   ">  <span class="feed-item-author">
        <span class="video-thumb ux-thumb yt-thumb-square-28 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="SassiBoB" data-thumb="//i3.ytimg.com/i/n_5GhTJXWOTVPbiFzksEDA/1.jpg?v=508c20bd" width="28" ><span class="vertical-align"></span></span></span></span>

  </span>
</a>  </div>





    <div class="feed-item-main">
      <div class="feed-item-header">
        <span class="feed-item-actions-line ">
            
          <span class="feed-item-owner"><a href="/user/SassiBoB?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">SassiBoB</a></span>
 uploaded a video



                <span class="feed-item-time">
      3 weeks ago
    </span>

            
        </span>
      </div>

            <div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="NutJob APP SASSIBOB TOUCHES IPAD!" data-context-item-type="video" data-context-item-time="2:00" data-context-item-user="SassiBoB" data-context-item-id="dMvd86JL02k" data-context-item-views="6,541 views" data-context-item-actionuser="SassiBoB">
    <div class="feed-item-thumb">
          <a class="ux-thumb-wrap contains-addto  yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;context=G2836582FUAAAAAAAOAA" href="/watch?v=dMvd86JL02k&amp;feature=g-u-u">
      <span class="video-thumb ux-thumb yt-thumb-default-185 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Thumbnail" data-thumb="//i1.ytimg.com/vi/dMvd86JL02k/mqdefault.jpg" width="185" ><span class="vertical-align"></span></span></span></span>
    <span class="video-time">2:00</span>
    


  <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="dMvd86JL02k" role="button"><span class="yt-uix-button-content">  <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
 </span></button>

  </a>

    </div>
    <div class="feed-item-content">
      
      <h4>
        <a class="feed-video-title title yt-uix-contextlink  yt-uix-sessionlink "
            href="/watch?v=dMvd86JL02k&amp;feature=g-u-u"
            data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=g-u-u&amp;context=G2836582FUAAAAAAAOAA"
            
        >
          NutJob APP SASSIBOB TOUCHES IPAD!
        </a>
      </h4>
        <div class="metadata">



        <span class="view-count">
    6,541 views
  </span>



      <div class="description" >
        <p>Find out more about if you can download NutJob on iPad:</p>
<p>At least it&#39;s a FREE download: <a href="http://goo.gl/uq6ec" target="_blank" title="http://goo.gl/uq6ec" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">http://goo.gl/uq6ec</a></p>

      </div>

  </div>

    </div>
  </div>


    </div>
      


    <span class="feed-item-action-menu subscribed" data-external-id="PqyfOmT8Qmokk_DL1hao1mdBStIR2ldES5pkgWhSIYEeFKjpJZW9cLQ==">

          
      <button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-36466879603"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;" >Hide this activity</span></li><li role="menuitem" id="aria-id-98478826846"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD5Y9RHid91zDwgYdbtWXBEk" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;" >Only show uploads from SassiBoB
</span></li><li role="menuitem" id="aria-id-2278823067"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;" >Subscribe to SassiBoB
</span></li><li role="menuitem" id="aria-id-45567906597"><span data-channel-key="UCn_5GhTJXWOTVPbiFzksEDA" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD5Y9RHid91zDwgYdbtWXBEk" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item" >Unsubscribe from SassiBoB
</span></li></ul></button>
    </span>

  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/SassiBoB?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">SassiBoB</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/SassiBoB?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">SassiBoB</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/SassiBoB?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">SassiBoB</a></span>
</div></div>

      </li>
  </ul>

    </div>
  </div>

  </div>

      <div id="feed-social-connect" class="individual-feed hid"
      data-feed-type="social"
      data-feed-name="connect"
      data-loaded="true">
      <div class="feed-header before-feed-content">
    <div class="feed-header-thumb">
      <img class="feed-header-icon social-all" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
    </div>
    <div class="feed-header-details context-source-container" data-context-source=Social">
      <h2>Social</h2>
      <p class="metadata">
<a href="/account_sharing?feature=subhead">Sharing and Connected Accounts<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="" class="see-more-arrow"></a>      </p>
    </div>
  </div>

      <div class="feed-container">
    <div class="social-service">
      <h4>
        <img class="social-service-icon google-plus" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Google+">
        Google+
      </h4>
      <div class="social-service-buttons">
          <div class="social-service-status">
            <a href="https://plus.google.com/">
Connected as Tony Kilgore
            </a>
          </div>
      </div>
    </div>
  </div>
  <div class="feed-container">
    <h3>Connect to a third party account below:</h3>
      <div class="social-service">
        <h4>
          <img class="social-service-icon facebook" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Facebook">
          Facebook
        </h4>
        <div class="social-service-buttons">
            <div id="facebook-connected" >
    <button type="button" class=" yt-uix-button yt-uix-button-default" onclick="window.autoshare.disconnectService(&quot;facebook&quot;);return false;"  role="button"><span class="yt-uix-button-content">Disconnect </span></button>
    <div class="social-service-status">
Connected as: <strong id="facebook-display-name">kilgore95</strong>
    </div>
  </div>
  <div id="facebook-not-connected" style="display: none;">
    <button type="button" id="facebook-connect-button" onclick=";return false;" class=" yt-uix-button yt-uix-button-default"  role="button"><span class="yt-uix-button-content">Connect </span></button>
  </div>

        </div>
      </div>
      <div class="social-service">
        <h4>
          <img class="social-service-icon twitter" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Twitter">
          Twitter
        </h4>
        <div class="social-service-buttons">
            <div id="twitter-connected" >
    <button type="button" class=" yt-uix-button yt-uix-button-default" onclick="window.autoshare.disconnectService(&quot;twitter&quot;);return false;"  role="button"><span class="yt-uix-button-content">Disconnect </span></button>
    <div class="social-service-status">
Connected as: <strong id="twitter-display-name">tkilgore95</strong>
    </div>
  </div>
  <div id="twitter-not-connected" style="display: none;">
    <button type="button" id="twitter-connect-button" onclick=";return false;" class=" yt-uix-button yt-uix-button-default"  role="button"><span class="yt-uix-button-content">Connect </span></button>
  </div>

        </div>
      </div>
      <div class="social-service">
        <h4>
          <img class="social-service-icon orkut" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Orkut">
          Orkut
        </h4>
        <div class="social-service-buttons">
            <div id="orkut-connected" style="display: none;">
    <button type="button" class=" yt-uix-button yt-uix-button-default" onclick="window.autoshare.disconnectService(&quot;orkut&quot;);return false;"  role="button"><span class="yt-uix-button-content">Disconnect </span></button>
    <div class="social-service-status">
Connected as: <strong id="orkut-display-name"></strong>
    </div>
  </div>
  <div id="orkut-not-connected" >
    <button type="button" id="orkut-connect-button" onclick=";return false;" class=" yt-uix-button yt-uix-button-default"  role="button"><span class="yt-uix-button-content">Connect </span></button>
  </div>

        </div>
      </div>
  </div>

  </div>


  <div id="feed-error" class="individual-feed hid">
    <p class="feed-message">
We were unable to complete the request, please try again later.
    </p>
  </div>

  <div id="feed-loading-template" class="hid">
    <div class="feed-message">
        <p class="loading-spinner">
    <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
Loading...
  </p>

    </div>
  </div>

    </div>
    <div id="feed-background"></div>

    <div id="footer-ads">
              



  

  <div id="ad_creative_3" class="ad-div " style="z-index: 1">
    <iframe id="ad_creative_iframe_3" height="1" width="1" scrolling="no" frameborder="0" style="z-index: 1"></iframe>
      <script>
    (function() {
      var ord = Math.floor(Math.random() * 10000000000000000);
      var adIframe = document.getElementById("ad_creative_iframe_3");
      adIframe.src = "http://ad-g.doubleclick.net/N6762/adi/mkt.ythome_1x1/;sz=1x1;tile=3;plat=pc;dc_dedup=1;kage=17;kar=2;kauth=1;kcr=us;kga=1000;kgender=m;kgg=1;klg=en;kmyd=ad_creative_3;kt=U;ord=" + ord + "?";
    })();
  </script>

  </div>


    </div>
  </div>



    </div>
    <!-- end content -->
  </div>
  <div id="footer-container">
      <div id="footer">  <div class="yt-horizontal-rule "><span class="first"></span><span class="second"></span><span class="third"></span></div>
<div id="footer-logo"><a href="/" title="YouTube home"><img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="YouTube home"></a><span id="footer-divider"></span></div><div id="footer-main">
    <div id="in-product-help" class="yt-uix-clickcard">
      <button type="button" id="help-button" onclick=";return false;" class="yt-uix-clickcard-target yt-uix-button-reverse yt-uix-button yt-uix-button-default" data-orientation="vertical" data-locale="en_US" data-iph-anchor-text="More Help" data-iph-search-button-text="Search" data-iph-tracking="iph-questionmark" data-iph-js-url="//s.ytimg.com/yts/jsbin/www-help-vflHCwoE6.js" data-iph-search-input-text="Search YouTube&#39;s Help Center" data-iph-title-text="Need Help on this page?" data-iph-topic-id="1699306" data-iph-css-url="//s.ytimg.com/yts/cssbin/www-helpie-vflyr74Zr.css" data-help-center-host="//support.google.com/youtube" role="button"><span class="yt-uix-button-content">  <img class="questionmark" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif">
  <span>Help</span>
  <img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif">
 </span></button>
      <div class="yt-uix-clickcard-content" id="help-target">  <p class="loading-spinner">
    <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
Loading...
  </p>
</div>
    </div>
<ul id="footer-links-primary"><li><a href="/t/about_youtube">About</a></li><li><a href="/t/press">Press &amp; Blogs</a></li><li><a href="/t/copyright_center">Copyright</a></li><li><a href="/creators">Creators &amp; Partners</a></li><li><a href="/t/advertising_overview">Advertising</a></li><li><a href="/dev">Developers</a></li></ul><ul id="footer-links-secondary"><li><a href="/t/terms">Terms</a></li><li><a href="http://www.google.com/intl/en/policies/privacy/">Privacy</a></li><li><a href="//support.google.com/youtube/bin/request.py?contact_type=abuse&amp;hl=en-US">Safety</a></li><li><a href="//www.google.com/tools/feedback/intl/en/error.html" onclick="return yt.www.feedback.start(yt.getConfig('FEEDBACK_LOCALE_LANGUAGE'), yt.getConfig('FEEDBACK_LOCALE_EXTRAS'));" id="reportbug">Send feedback</a></li><li><a href="/testtube">Try something new!</a></li></ul>  <ul class="pickers yt-uix-button-group" data-button-toggle-group="optional">
      <li>
Language:
          
  <button type="button" class=" yt-uix-button yt-uix-button-text" onclick=";return false;" data-button-toggle="true" data-picker-position="footer" data-button-menu-id="arrow-display" data-picker-key="language" data-button-action="yt.www.picker.load" role="button"><span class="yt-uix-button-content">English </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></button>


      </li>
      <li>
Location:
          
  <button type="button" class=" yt-uix-button yt-uix-button-text" onclick=";return false;" data-button-toggle="true" data-picker-position="footer" data-button-menu-id="arrow-display" data-picker-key="country" data-button-action="yt.www.picker.load" role="button"><span class="yt-uix-button-content">Worldwide </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></button>


      </li>
      <li>
Safety:
          
  <button type="button" class=" yt-uix-button yt-uix-button-text" onclick=";return false;" data-button-toggle="true" data-picker-position="footer" data-button-menu-id="arrow-display" data-picker-key="safetymode" data-button-action="yt.www.picker.load" role="button"><span class="yt-uix-button-content">Off
 </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></button>


      </li>
  </ul>
        <div id="yt-picker-language-footer"
      class="yt-picker"
      style="display: none"
>
      <p class="yt-spinner">
    <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-spinner-img" alt="">
Loading...
  </p>

  </div>

      <div id="yt-picker-country-footer"
      class="yt-picker"
      style="display: none"
>
      <p class="yt-spinner">
    <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-spinner-img" alt="">
Loading...
  </p>

  </div>

      <div id="yt-picker-safetymode-footer"
      class="yt-picker"
      style="display: none"
>
      <p class="yt-spinner">
    <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-spinner-img" alt="">
Loading...
  </p>

  </div>


</div>    
</div>

  </div>
    



  <div id="playlist-bar" class="hid passive editable" data-video-url="/watch?v=&amp;feature=BFql&amp;playnext=1&amp;list=QL" data-list-id="" data-list-type="QL">
    <div id="playlist-bar-bar-container">
      <div id="playlist-bar-bar">
        <div class="yt-alert yt-alert-naked yt-alert-success hid " id="playlist-bar-notifications">  <div class="yt-alert-icon">
    <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
  </div>
<div class="yt-alert-content" role="alert"></div></div>
<span id="playlist-bar-info"><span class="playlist-bar-active playlist-bar-group"><button onclick=";return false;" title="Previous video" type="button" id="playlist-bar-prev-button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty"  role="button"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-prev" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Previous video"><span class="yt-valign-trick"></span></span></button><span class="playlist-bar-count"><span class="playing-index">0</span> / <span class="item-count">0</span></span><button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-next-button"  role="button"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-next" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span></button></span><span class="playlist-bar-active playlist-bar-group"><button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-autoplay-button" data-button-toggle="true" role="button"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-autoplay" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span></button><button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-shuffle-button" data-button-toggle="true" role="button"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-shuffle" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span></button></span><span class="playlist-bar-passive playlist-bar-group"><button onclick=";return false;" title="Play videos" type="button" id="playlist-bar-play-button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty"  role="button"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-play" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Play videos"><span class="yt-valign-trick"></span></span></button><span class="playlist-bar-count"><span class="item-count">0</span></span></span><span id="playlist-bar-title" class="yt-uix-button-group"><span class="playlist-title">Unsaved Playlist</span></span></span>
        <a id="playlist-bar-lists-back" href="#">
Return to active list
        </a>

<span id="playlist-bar-controls"><span class="playlist-bar-group"><button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-text yt-uix-button-empty" onclick=";return false;" id="playlist-bar-toggle-button"  role="button"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-toggle" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span></button></span><span class="playlist-bar-group"><button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button-reverse flip yt-uix-button yt-uix-button-text" onclick=";return false;" data-button-menu-id="playlist-bar-options-menu" data-button-has-sibling-menu="true" role="button"><span class="yt-uix-button-content">Options </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></button></span></span>      </div>
    </div>

<div id="playlist-bar-tray-container"><div id="playlist-bar-tray" class="yt-uix-slider yt-uix-slider-fluid"><button class="yt-uix-button playlist-bar-tray-button yt-uix-button-default yt-uix-slider-prev" onclick="return false;"><img class="yt-uix-slider-prev-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Previous video"></button><button class="yt-uix-button playlist-bar-tray-button yt-uix-button-default yt-uix-slider-next" onclick="return false;"><img class="yt-uix-slider-next-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Next video"></button><div class="yt-uix-slider-body"><div id="playlist-bar-tray-content" class="yt-uix-slider-slide"><ol class="video-list"></ol><ol id="playlist-bar-help"><li class="empty playlist-bar-help-message">Your list is empty. Add videos to your list using this button: <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="addto-button-help"><br> or <a href="/view_all_playlists" class="load-lists">load a different list</a>.</li></ol></div><div class="yt-uix-slider-shade-left"></div><div class="yt-uix-slider-shade-right"></div></div></div><div id="playlist-bar-save"></div><div id="playlist-bar-lists" class="dark-lolz"></div><div id="playlist-bar-loading"><img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Loading..."><span id="playlist-bar-loading-message">Loading...</span><span id="playlist-bar-saving-message" class="hid">Saving...</span></div><div id="playlist-bar-template" style="display: none;" data-video-thumb-url="//i4.ytimg.com/vi/__video_encrypted_id__/default.jpg"><!--<li class="playlist-bar-item yt-uix-slider-slide-unit __classes__" data-video-id="__video_encrypted_id__"><a href="__video_url__" title="__video_title__" class="yt-uix-sessionlink" data-sessionlink="ei=COqn_6e1qrMCFQ8JIQodtUg4jQ%3D%3D&amp;feature=BFa"><span class="video-thumb ux-thumb yt-thumb-default-106 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="__video_title__" data-thumb-manual="true" data-thumb="__video_thumb_url__" width="106" ><span class="vertical-align"></span></span></span></span><span class="screen"></span><span class="count"><strong>__list_position__</strong></span><span class="play"><img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"></span><span class="yt-uix-button yt-uix-button-default delete"><img class="yt-uix-button-icon-playlist-bar-delete" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Delete"></span><span class="now-playing">Now playing</span><span dir="ltr" class="title"><span>__video_title__  <span class="uploader">by __video_display_name__</span>
</span></span><span class="dragger"></span></a></li>--></div><div id="playlist-bar-next-up-template" style="display: none;"><!--<div class="playlist-bar-next-thumb"><span class="video-thumb ux-thumb yt-thumb-default-74 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="//i4.ytimg.com/vi/__video_encrypted_id__/default.jpg" alt="Thumbnail" width="74" ><span class="vertical-align"></span></span></span></span></div>--></div></div>      <div id="playlist-bar-options-menu" class="hid">

    <div id="playlist-bar-extras-menu">
        <ul>
      <li><span class="yt-uix-button-menu-item" data-action="save">
Save as a new playlist
      </span></li>
      <li><span class="yt-uix-button-menu-item" data-action="clear">
Clear all videos from this list
      </span></li>
  </ul>

    </div>

    <ul>
      <li><span class="yt-uix-button-menu-item" data-action="load-lists">
Load a different playlist
      </span></li>
      <li><span class="yt-uix-button-menu-item" onclick="window.location.href=&#39;//support.google.com/youtube/bin/answer.py?answer=146749&amp;hl=en-US&#39;">Learn more</span></li>
    </ul>
  </div>

  </div>


  

  <div id="shared-addto-menu" style="display: none;" class="hid">
      <div class="addto-menu">
      <div class="addto-loading loading-content">
        <img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif">
        <span>Loading playlists...</span>
      </div>
  </div>

  </div>


  

    </div>
  <!-- end page -->
    
  
    <script id="js-1682662951" src="//s.ytimg.com/yts/jsbin/www-core-vfloDTB4f.js" data-loaded="true"></script>


  <script>
        yt.setConfig({
      'XSRF_TOKEN': 'bmfSMl88Ode1vxoOwXSwIgZD0ZZ8MTM1MTc0NDA5OEAxMzUxNjU3Njk4',
      'XSRF_FIELD_NAME': 'session_token'
    });

    yt.setConfig('XSRF_REDIRECT_TOKEN', 'H5G-xKaqlJABCV4OTZTKLDqmp2N8MTM1MTc0NDA5OUAxMzUxNjU3Njk5');

    yt.setConfig({
      'EVENT_ID': "COqn_6e1qrMCFQ8JIQodtUg4jQ==",
      'CURRENT_URL': "http:\/\/www.youtube.com\/",
      'LOGGED_IN': true,
      'SESSION_INDEX': 0,

      'WATCH_CONTEXT_CLIENTSIDE': false,

      'FEEDBACK_LOCALE_LANGUAGE': "en",
      'FEEDBACK_LOCALE_EXTRAS': {"logged_in": true, "experiments": "905702,929303,914081,916615,919108,922401,920704,912806,927201,925003,913546,913556,920201,900816,911112,901451", "guide_subs": "NA", "accept_language": "en-US,en;q=0.5"}    });
  </script>


      <script>
if (window.yt.timing) {yt.timing.tick("js_head");}    </script>

    <script>
    _gel('masthead-search-term').focus();
      yt.setConfig('FEED_DEBUG', true);
    yt.setConfig('GUIDE_VERSION', 1);
  </script>

      <script>
      yt.setMsg('FLASH_UPGRADE', "\u003cdiv class=\"yt-alert yt-alert-default yt-alert-error  yt-alert-player\"\u003e  \u003cdiv class=\"yt-alert-icon\"\u003e\n    \u003cimg s\u0072c=\"\/\/s.ytimg.com\/yts\/img\/pixel-vfl3z5WfW.gif\" class=\"icon master-sprite\" alt=\"Alert icon\"\u003e\n  \u003c\/div\u003e\n\u003cdiv class=\"yt-alert-buttons\"\u003e\u003c\/div\u003e\u003cdiv class=\"yt-alert-content\" role=\"alert\"\u003e    \u003cspan class=\"yt-alert-vertical-trick\"\u003e\u003c\/span\u003e\n    \u003cdiv class=\"yt-alert-message\"\u003e\n            You need to upgrade your Adobe Flash Player to watch this video. \u003cbr\u003e \u003ca href=\"http:\/\/get.adobe.com\/flashplayer\/\"\u003eDownload it from Adobe.\u003c\/a\u003e\n    \u003c\/div\u003e\n\u003c\/div\u003e\u003c\/div\u003e");
  yt.setConfig({
    'PLAYER_CONFIG': {"url": "\/\/s.ytimg.com\/yts\/swf\/masthead_child-vflRMMO6_.swf", "min_version": "8.0.0", "args": {"enablejsapi": 1}, "url_v9as2": "", "params": {"bgcolor": "#FFFFFF", "allowfullscreen": "false", "allowscriptaccess": "always"}, "attrs": {"width": "1", "id": "masthead_child", "height": "1"}, "url_v8": "", "html5": false}
  });

    yt.flash.embed("masthead_child_div", yt.getConfig('PLAYER_CONFIG'));
  </script>


  
    <script id="js-2339266057" src="//s.ytimg.com/yts/jsbin/www-guide-vflZEHbGr.js" data-loaded="true"></script>



  <script>
      window.masthead = new yt.www.ads.MastheadAd(
          "yj3Da1hU_QA",
          true);

    yt.www.guide.init();


      yt.setAjaxToken('guide_ajax',
          "qCIZ3mwU21vQGyLqMahUhqM3iP58MTM1MTc0NDA5OUAxMzUxNjU3Njk5");
      yt.setAjaxToken('subscription_ajax',
          "edk7zJZtlAWlR2c-JxU60pV1cfl8MTM1MTc0NDA5OUAxMzUxNjU3Njk5");
      yt.setAjaxToken('autoshare',
          "UpnGdMaxe6JE4riFK1wvh5PjqpB8MTM1MTc0NDA5OUAxMzUxNjU3Njk5");

      yt.pubsub.subscribe('init', yt.www.guide.initAutoshare);


  </script>

      <script>
if (window.yt.timing) {yt.timing.tick("js_page");}    </script>

        <script>
yt.setConfig('TIMING_ACTION', "gli");    </script>





  <script>yt.setConfig('THUMB_DELAY_LOAD_BUFFER', 300);</script>

  <script>
    


  yt.setMsg({
    'LIST_CLEARED': "List cleared",
    'PLAYLIST_VIDEO_DELETED': "Video deleted.",
    'ERROR_OCCURRED': "Sorry, an error occurred.",
    'NEXT_VIDEO_TOOLTIP': "Next video:\u003cbr\u003e \u0026#8220;${next_video_title}\u0026#8221;",
    'NEXT_VIDEO_NOTHUMB_TOOLTIP': "Next video",
    'SHOW_PLAYLIST_TOOLTIP': "Show playlist",
    'HIDE_PLAYLIST_TOOLTIP': "Hide playlist",
    'AUTOPLAY_ON_TOOLTIP': "Turn autoplay off",
    'AUTOPLAY_OFF_TOOLTIP': "Turn autoplay on",
    'SHUFFLE_ON_TOOLTIP': "Turn shuffle off",
    'SHUFFLE_OFF_TOOLTIP': "Turn shuffle on",
    'PLAYLIST_BAR_PLAYLIST_SAVED': "Playlist saved!",
    'PLAYLIST_BAR_ADDED_TO_FAVORITES': "Added to favorites",
    'PLAYLIST_BAR_ADDED_TO_PLAYLIST': "Added to playlist",
    'PLAYLIST_BAR_ADDED_TO_QUEUE': "Added to queue",
    'AUTOPLAY_WARNING1': "Next video starts in 1 second...",
    'AUTOPLAY_WARNING2': "Next video starts in 2 seconds...",
    'AUTOPLAY_WARNING3': "Next video starts in 3 seconds...",
    'AUTOPLAY_WARNING4': "Next video starts in 4 seconds...",
    'AUTOPLAY_WARNING5': "Next video starts in 5 seconds...",
    'UNDO_LINK': "Undo"  });


  yt.setConfig({
    'DRAGDROP_BINARY_URL': "\/\/s.ytimg.com\/yts\/jsbin\/www-dragdrop-vfllufND3.js",
    'PLAYLIST_BAR_PLAYING_INDEX': -1  });

    yt.setAjaxToken('addto_ajax', "bZmaf9SgG2Fw9CRtRB_RiYNhURp8MTM1MTc0NDA5OUAxMzUxNjU3Njk5");
    yt.setAjaxToken('playlist_bar_ajax', "Iq3CTn4-uXbUCmSxn1tO6TwZhmd8MTM1MTc0NDA5OUAxMzUxNjU3Njk5");

    yt.pubsub.subscribe('init', yt.www.lists.init);





      yt.setConfig({
        'GOOGLEPLUS_HOST': "https:\/\/plus.google.com",
        'GAPI_HINT_PARAMS': "m;\/_\/abc-static\/_\/js\/gapi\/__features__\/rt=j\/ver=VO1wk6ea0_A.en.\/sv=1\/am=!OgKRzknZ1ASBPEY3DA\/d=1",
        'SANDBAR_ENABLED': true,
        'SANDBAR_LOCALE': "en-US",
        'SANDBAR_DELEGATED_SESSION_ID': null
      });

      yt.events.listen(_gel('masthead-search-term'), 'focus', yt.www.home.ads.workaroundReset);



    yt.setConfig({'SBOX_JS_URL': "\/\/s.ytimg.com\/yts\/jsbin\/www-searchbox-vflOEotgN.js",'SBOX_SETTINGS': {"CLOSE_ICON_URL": "\/\/s.ytimg.com\/yts\/img\/icons\/close-vflrEJzIW.png", "SHOW_CHIP": false, "PSUGGEST_TOKEN": "3AuHS6UvNfNXvd_gL6d64Q", "REQUEST_DOMAIN": "us", "EXPERIMENT_ID": -1, "SESSION_INDEX": 0, "HAS_ON_SCREEN_KEYBOARD": false, "CHIP_PARAMETERS": {}, "REQUEST_LANGUAGE": "en"},'SBOX_LABELS': {"SUGGESTION_DISMISS_LABEL": "Dismiss", "SUGGESTION_DISMISSED_LABEL": "Suggestion dismissed"}});





  </script>

  <script>
    yt.setMsg({
      'ADDTO_WATCH_LATER_ADDED': "Added",
      'ADDTO_WATCH_LATER_ERROR': "Error"
    });
  </script>

  

      <script>
if (window.yt.timing) {yt.timing.tick("js_foot");}    </script>



    <div id="debug">
    
  </div>


</body>
</html>
