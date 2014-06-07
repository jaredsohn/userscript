// ==UserScript==
// @name           foursquare on Google Maps
// @namespace      http://twitter.com/towtter
// @description    Show foursquare tips & venues information on Google Maps.
// @author         Touta Okui
// @include        http://maps.google.*/*
// @include        http://twitter.com/*
// ==/UserScript==
(function(){
  var version = "v1.0";
  // utility functions
  function $(id) {
    return document.getElementById(id);
  }
  function $tag(tagName, option, styles){
    var tag = document.createElement(tagName);
    if(option){
      for(a in option){
        if(option.hasOwnProperty(a)){
          tag[a] = option[a];
        }
      }
    }
    if(styles){
      for(a in styles){
        if(styles.hasOwnProperty(a)){
          tag.style[a] = styles[a];
        }
      }
    }
    return tag;
  }

  "div span a img".split(" ").forEach(function(tagName){
    var func = function(option, styles){
      return $tag(tagName, option, styles);
    };
    eval("$" + tagName + "= func;" );
  });

  function $text(text){
    return document.createTextNode(text);
  }

  function $add(parent, children){
    for(var i=1, child; child=arguments[i];i++){
      if(typeof child != "object"){
        child = $text(child+"");
      }
      parent.appendChild(child);
    }
    return parent;
  }
  
  function params_to_str(params) {
    if (typeof(params) == 'string') return params;
    var a = [];
    for (k in params) {
      a.push(k.toString() + '=' + params[k]);
    }
    var result = a.join("&");
    return result;
  }
  // XMLHttpRequest GET
  function get(obj, aUrl, params, cbLoad, cbReadyStateChange) {
    var fullUrl = aUrl;
    if (params) fullUrl += '?' + params_to_str(params);
    deblog(fullUrl);
    GM_xmlhttpRequest({
      method: 'GET',
      url: fullUrl,
      onload: function(response){ if(cbLoad) cbLoad.call(obj, response);},
      onreadystatechange: function(){if(cbReadyStateChange) cbReadyStateChange.call(obj);}
    });
  }
  //var debug = true;
  function deblog(log) {
    if (debug == true) console.log(log);
  }
  // Foursquare class
  var Foursquare = {
    data : {},
    vids :[],
    nDisplay : 20,
    no_more_tips : false,
    no_more_venues : false,
    html: '',
    latlng: '',
    reservedLatLng: '',
    isLoading : false,
    id: '',
    mapUrl: '',
    utc2local : function (dt) {
      var aTime = dt.split(" ");
      aTime = aTime.slice(1, aTime.length-1);
      aTime.unshift(aTime.splice(1, 1));
      aTime[2] = "20" + aTime[2];
      var d = Date.parse(aTime.join(" "));
      var local = new Date();
      var localtime = d - local.getTimezoneOffset() * 60 * 1000;
      local.setTime(localtime);
      return local;
    },
    formatDate : function(date) {
      var dt = date.toString().split(/[\s:]/);
      dt.splice(6);
      var result = dt.splice(0, 4).join(' ') + ', ' + dt.join(':');
      return result; 
    },
    createPinLink : function(venue) {
      // get zoom level
      var l = $('link');
      if (l && l.href) {
        l = l.href;
        if (l.match(/z=(\d+)/)) {
          var z = RegExp.$1;
        }
      }
      if (!z) z = "15";
      var name = venue.name;
      name = name.replace(/[\(\)]/g, "").replace(/\'/g, "%27");
      var href = "javascript:(function(){location.href='" + this.mapUrl + "/maps?";
      var params = {"q": venue.geolat + "," + venue.geolong + "(" + encodeURIComponent(name) + ")",
        "z":z,
        "sensor":"false"};
      href += params_to_str(params) + "'})();" ;
      return href;
    },
    renderEachVenue : function(venue) {
      var html = '';
      html += '<div class="venueimg">';
      html += '<a href="http://foursquare.com/venue/' + venue.id + '" target="_blank">';
      if (venue.primarycategory) {
        html += '<img class = "venueimg" src=' + venue.primarycategory.iconurl + ' title="' + venue.primarycategory.fullpathname + '">';
      } else {
        html += '<img class = "venueimg" src="http://foursquare.com/img/categories/none.png" title="no category">';
      }
      html += '</a></div><div class="venueinfo">';
      html += '<a href="http://foursquare.com/venue/' + venue.id + '" target="_blank">';
      html += venue.name + '</a>';
      html += '<a class="venuepin" href="' + this.createPinLink(venue) + '">Pin</a><br>';
      html += '<div class="venuedetail">';
      if (venue.primarycategory) {
        html += venue.primarycategory.nodename;
      }
      //html += venue.distance + '</div></div>';
      html += '</div></div>';
      return html;
    },
    renderVenues : function(response) {
      eval("var obj=" + response);
      for (name in obj) {
        this.data[name] = obj[name];
      }
      // foursquare down!
      if (this.data.error) {
        this.html = this.data.error;
        return -1;
      }
      var i;
      var groups = this.data['groups'][0];
      var venues = groups['venues'];
      // check empty venues data
      if (!venues) {
        return 0;      
      }
      var venue;
      // sort by distance
      venues.sort(function(a, b) {
        return a.distance > b.distance ? 1 : -1;
      });
      for (i=0; i < venues.length; i++) {
        venue = venues[i];
        if (this.vids.indexOf(venue.id) < 0) {
          this.vids.push(venue.id);
          this.html += this.renderEachVenue(venue);
        }
      }
      return venues.length;
    },
    renderTips : function(response) {
      eval("var obj=" + response);
      for (name in obj) {
        this.data[name] = obj[name];
      }
      // foursquare down!
      if (this.data.error) {
        this.html = this.data.error;
        return 0;
      }
      var i, vid;
      var groups = this.data['groups'][0];
      var tips = groups['tips'];
      // check empty tips data
      if (!tips) {
        return 0;
      }
      var tip;
      // sort by distance
      tips.sort(function(a, b) {
        return a.distance > b.distance ? 1 : -1;
      });
      // convert string to Date object
      for (i=0; i < tips.length; i++) tips[i].created = this.utc2local(tips[i].created);
      // together in the same venue
      var venue_tips = {};
      for (i=0; i < tips.length; i++) {
        tip = tips[i];
        if (!tip.venue) continue;
        if (!venue_tips[tip.venue.id]) {
          venue_tips[tip.venue.id] = [];
        }
        venue_tips[tip.venue.id].push(tip);
      }
      // sort by created
      for (vid in venue_tips) {
        venue_tips[vid].sort(function (a, b) {
          return a.created < b.created ? 1 : -1;
        });
      }
      for (vid in venue_tips) {
        for (i=0; i<venue_tips[vid].length; i++) {
          tip = venue_tips[vid][i];
          if (i == 0) {
            this.vids.push(tip.venue.id);
            this.html += this.renderEachVenue(tip.venue);
          }
          this.html += '<div class="venuetips"><div class="userthumb">';
          this.html += '<a href="http://foursquare.com/user/-' + tip.user.id + '" target="_blank">';
          this.html += '<img class="userthumb" src=' + tip.user.photo + '></a></div>';
          this.html += '<div class="usertips"><a href="http://foursquare.com/user/-' + tip.user.id + '" target="_blank">';
          this.html += tip.user.firstname + '</a><span style="margin-left:4px">' + tip.text + '</span>';
          this.html += '<br><span class="tips_date"><a href="http://foursquare.com/item/' + tip.id + '" target="_blank">' + this.formatDate(tip.created) + '</a></span></div></div>';
        }
      }
      return tips.length;
    },
    show : function() {
      var fsqpanel = $(this.id);
      if (fsqpanel) {
        fsqpanel.innerHTML = this.html;
      }
      this.isLoading = false;
      if (this.onComplete) {this.onComplete.call(this);};
    },
    onComplete : null,
    onLoading : null,
    processVenues : function(response) {
      var n = this.renderVenues(response.responseText);
      if (n == 0) this.html = 'no venues found.';
      this.show();
    },
    getVenues : function(latlng) {
      var geocode = latlng.split(",");
      get(this, 'http://api.foursquare.com/v1/venues.json', 
          {"geolat":geocode[0],"geolong":geocode[1]}, this.processVenues, this.onLoading);
      this.isLoading = true;
    },
    processTips : function(response) {
      if ((this.reservedLatLng != "") && (this.reservedLatLng != this.latlng)) {
        this.getTips(this.reservedLatLng);
        this.reservedLatLng = "";
        return;
      }
      var n = this.renderTips(response.responseText);
      if (n == 0) {
        this.getVenues(this.latlng);
      } else {
        this.show();
      }
    },
    getTips : function(latlng) {
      if (latlng.match(/\(([\d\.,\- ]+)\)/)) {
        latlng = RegExp.$1;
      }
      if (this.latlng == latlng) {
        //deblog('same coordinates!');
        this.show();
        return;
      }
      this.latlng = latlng;
      this.html = '';
      this.vids = [];
      var geocode = this.latlng.replace(/\s*/g, '').split(",");
      get(this, 'http://api.foursquare.com/v1/tips.json', 
          {"geolat":geocode[0],"geolong":geocode[1]}, this.processTips, this.onLoading);
      this.isLoading = true;
    }
  };
  //css custom style
  function setStyle() {
    var css = "div.venueimg {"
      + "float: left;"
      + "padding-top: 12px;"
      + "font-weight: bold;"
      + "overflow: hidden;"
      + "clear:both;"
      + "}"
      + "img.venueimg {"
      + "height: 32px;"
      + "vertical-align:middle;"
      + "width: 32px;"
      + "margin-right: 6px;"
      + "}"
      + "div.venueinfo {"
      + "float: left;"
      + "padding-top: 12px;"
      + "}"
      + "div.venueinfo a {"
      + "text-decoration: none;"
      + "}"
      + "div.venueinfo a:hover{"
      + "text-decoration: underline;"
      + "}"
      + "a.venuepin {"
      + "font-size: xx-small;"
      + "position: absolute;"
      + "right: 0;"
      + "margin-right: 6px;"
      + "}"
      + "a.venuepin:hover {"
      + "color:red"
      + "}"
      + "div.venuedetail {"
      + "font-size: 11px;"
      + "}"
      + "div.venuetips {"
      + "float: left;"
      + "margin-top: 6px;"
      + "margin-left: 40px;"
      + "width: 100%;"
      + "}"
      + "div.venuetips a {"
      + "text-decoration: none;"
      + "}"
      + "div.venuetips a:hover{"
      + "text-decoration: underline;"
      + "}"
      + "div.userthumb {"
      + "float: left;"
      + "margin-right: 6px;"
      + "}"
      + "img.userthumb {"
      + "height: 32px;"
      + "vertical-align:middle;"
      + "width: 32px;"
      + "}"
      + "div.usertips {"
      + "overflow: hidden;"
      + "width: 70%;"
      + "font-size: 13px;"
      + "}"
      + ".tips_date a {"
      + "text-decoration: none;"
      + "font-size: x-small;"
      + "color: #5A5858;"
      + "}";
    GM_addStyle(css);
  };
  // loading gif animation data
  var loading_image = 'data:image/gif;base64,'+
    'R0lGODlhEAAQAPMKALCvr7W0tLq5ucC/v87OztTT09nY2OTj4/Ly8v39/f///wAAAAAAAAAAAAAA'+
    'AAAAACH5BAAKAAAAIf4aQ3JlYXRlZCB3aXRoIGFqYXhsb2FkLmluZm8AIf8LTkVUU0NBUEUyLjAD'+
    'AQAAACwAAAAAEAAQAAAETFDJSau9doANZDGYtkkBICCWwEmHKlSGqVIqOKmH8k5HsJOdy2gyrCSK'+
    'OkBuQlAcTJSYIEEk1CgJ15LzmyBUAQn3kjAUxJvAAMNuXyIAIfkEAAoAAAAsAAAAABAAEACDsK+v'+
    'tbS0urm5wL+/zs7O2djY397e5OPj7u3t8vLy9/f3/f39////AAAAAAAAAAAABFqQSZmCmThLAQTS'+
    'WREAYwIyCQeshKRonGCQryCE3VZswD4NgINEOAzcJqtTEglQBjAcIoN4yE0KnQWjcOT4JAtBSxGw'+
    'xDQvBmG1EphACXagoD0xEGc7xhB4TyIAIfkEAAoAAAAsAAAAABAAEACDsK+vtbS0urm5wL+/xcTE'+
    'zs7O2djY397e5OPj7u3t8vLy9/f3/f39////AAAAAAAABFawyTkXoRgfgPI0AgAEI5MpISmKRhYK'+
    'XSIGHWUAwgcUJjZwH0WDgWhNRJ4G8gjwMJYSQ01hbCBwGUYBYGSEqhKEKkF8ZW6rEU6IYZBUAjDm'+
    'ekhmCAt7BAAh+QQACgAAACwAAAAAEAAQAIOwr6+1tLS6ubnAv7/KycnOzs7U09PZ2Njk4+Pu7e3y'+
    '8vL9/f3///8AAAAAAAAAAAAESZDJSau9mB0BgDiSkFAKF3SdMADjxAmIhHBdq3nVWk9GELsoVmaY'+
    'KBaHjGCBgggYKKglhQOaoGCy1wJKoHVOAkVFukkdtsh0OgIAIfkEAAoAAAAsAAAAABAAEACDsK+v'+
    'tbS0urm5wL+/zs7O2djY397e5OPj7u3t8vLy9/f3/f39////AAAAAAAAAAAABFSQyUmrvZgVAYAo'+
    'mMIFXSckFyEcC3MIgVCh1sKBKAIQimUAsQBj0AmAJK8SwPArDQ6TAsnDCC5rBACCgSpQKS1uhbNi'+
    'LF4yS4JTIgl6l43pmKnbKxEAIfkEAAoAAAAsAAAAABAAEACDsK+vtbS0urm5wL+/xcTEzs7O2djY'+
    '397e5OPj7u3t8vLy9/f3/f39////AAAAAAAABFmwyUmrvVgaAITBxtEgHBAICoUEZsNIiNC9DVEC'+
    'RSV/zXKwnNSEJKBwEgbehGME0DSGBHMiQ1AUpcBhoZlRCjeChCETWMeswFmikJWsCMNzwjAIWMqM'+
    'fl+JAAA7';
  function getFoursquare() {
    var e = document.createEvent('MouseEvents');
		e.initEvent(
			'click', // type
			false, // bubbles
			true // cancelable
    );
    var a = $("coordlink");
    if (a.dispatchEvent) {
      a.dispatchEvent(e);
      var coord = $("coordinates").innerHTML;
      Foursquare.getTips(coord);
    }
  };
  function onLoading(){
    var fsq = $("foursquare_panel");
    fsq.style.display = "";
    var img = $("foursquare_loading");
    if ((img) && (img.style.display == "none")) img.style.display = "";
    var fsqInfo = $("foursquareInfo");
    if (fsqInfo) fsqInfo.style.display = "none";
  };
  function onComplete(){
    var img = $("foursquare_loading");
    if (img) img.style.display = "none";
    var fsq = $("foursquare_panel");
    fsq.style.display = "";
    var fsqInfo = $("foursquareInfo");
    fsqInfo.style.display = "";
    deblog('complete!');
  };
  function closePanel() {
    var fsqpanel = $("foursquare_panel");
    fsqpanel.style.display = "none";
  };
  function init() {
    // set custom style
    setStyle();
    // create elements
    var hideCoord = $div({id:"hidecoord"});
    var aLink = $a({id:"coordlink"}, {fontSize:"x-small",textDecoration:"none",color:"#000"});
    aLink.setAttribute("href", "javascript:void(0)");
    aLink.setAttribute("onclick", "var latlng = gApplication.getMap().getCenter(); document.getElementById('coordinates').innerHTML=latlng;");
    //aLink.style.display = "none";
    var aSpan = $span({id:"coordinates"});
    aSpan.innerHTML = "()";
    var sizer = $("spsizer");
    var launcher = $("iLauncher");
    var fpanel = $div({id:"foursquare_panel", className:"opanel"}, {margin:"6px",padding:"4px",overflow:"hidden",borderBottom:"1px solid gray"});
    fpanel.innerHTML = '<span style="font-weight: bold"><span style="font-style: italic; color: #2398CB">foursquare</span> on Google Maps</span>';
    var closeBtn = $span({className:"lnchr_cls_btn"}, {position:"absolute",right:"0",marginRight:"6px"});
    closeBtn.innerHTML = "<a id=\"fsq_close\" href=\"javascript:void(0)\"><img src=\"intl/ja_jp/mapfiles/transparent.png\" class=\"launch_close\"></a>";
    closeBtn.addEventListener('click', closePanel, false);
    $add(fpanel, closeBtn);
    $add(fpanel,
         $add(hideCoord,
              $add(aLink, 
                   aSpan)));
    // load loading image
    var loading = $img({id:"foursquare_loading"});
    loading.setAttribute("src", loading_image);
    loading.style.display = "none";
    $add(fpanel, loading);

    $add(fpanel, $div({id:'foursquareInfo'}));

    fpanel.style.display = "none";
    sizer.insertBefore(fpanel, launcher);
    // add foursquare menu to topbar
    var targets = document.evaluate("//div[@id='topbar-startcol']/div[@class='start-edge-links']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (targets.snapshotLength == 1) {
      targets.snapshotItem(0).innerHTML += "&nbsp;";
      var bar = $img({className:"bar-icon-divider bar-divider"});
      bar.src = "intl/ja_jp/mapfiles/transparent.png";
      targets.snapshotItem(0).appendChild(bar);
      targets.snapshotItem(0).innerHTML += "&nbsp;";
      var favicon = $img({src:"http://foursquare.com/favicon.ico", className:"bar-icon bar-icon-link2"});
      var fsqLink = $a({id:"foursquare_link"}, {fontStyle:"italic"});
      $add(fsqLink, favicon);
      fsqLink.setAttribute("href", "javascript:void(0)");
      fsqLink.addEventListener('click', getFoursquare, false);
      //fsqLink.innerHTML = "<span class=\"link-text\">foursquare</span>";
      targets.snapshotItem(0).appendChild(fsqLink);
    }
    Foursquare.id = 'foursquareInfo';
    Foursquare.onLoading = onLoading;
    Foursquare.onComplete = onComplete;
    var mapUrl = window.location.toString();
    if (mapUrl.match(/^(http:\/\/[^\/]+)/)) {
      Foursquare.mapUrl = RegExp.$1;
    }
    // referrer check
    var ref  = document.referrer;
    if (ref.match(/^http:\/\/foursquare.com\/venue\//) ||
       ref.match(/^http:\/\/twitter.com/)) {
      var loc = window.location.toString();
      if (loc.match(/ll=([0-9\.,\-]+)&/)) {
        var latlng = RegExp.$1;
        $("coordinates").innerHTML = '(' + latlng + ')';
        Foursquare.getTips(latlng);
      }
    }
  };
  function mapMoved() {
    deblog('move');
    var fsqInfo = $("foursquareInfo");
    if (fsqInfo) fsqInfo.style.display = "none";
  };
  function mapClicked(latlng) {
    deblog('click' + latlng.toString());
    var fsqpanel = $("foursquare_panel");
    if (fsqpanel.style.display != "none") {
      var coord = latlng.toString();
      $("coordinates").innerHTML = coord;
      if (Foursquare.isLoading) {
        if (coord.match(/\(([\d\.,\- ]+)\)/)) {
          coord = RegExp.$1;
        }
        Foursquare.reservedLatLng = coord;
        return;
      }
      // use setTimeout to prevent access violation
      setTimeout(function(){
        Foursquare.getTips(coord);}, 0);
    }
  };
  // overwrite a '4sq.com' link on each tweet to link to Google Maps
  function initTwitter() {
    var statuses = [];
    function Fsq2GMaps(linkObj, status_id) {
      this.link4sq = linkObj;
      this.status_id = status_id;
    }
    Fsq2GMaps.prototype.getRedirectURL = function(link) {
      get(this, link, null, this.getLatLngFromVenueURL, null);
    };
    Fsq2GMaps.prototype.getLatLngFromVenueURL = function (response) {
      var url = response.finalUrl;
      deblog(url);
      var latlng = '';
      if (url.match(/^http:\/\/foursquare.com\/venue\/(\d+)$/)) {
        this.getLatLngFromVenueId(RegExp.$1);
      } else {
        //in case link is not venue's link
        var original_link = this.link4sq.innerHTML.replace(/<\/?[^<>]+>/g,"");
        this.link4sq.href = original_link;
        this.link4sq.target = "_blank";
        var img = $("loadingimage_" + this.status_id);
        if (img) this.link4sq.removeChild(img);
      }
    };
    Fsq2GMaps.prototype.getLatLngFromVenueId = function (vid) {
      deblog(vid);
      get(this, 'http://api.foursquare.com/v1/venue.json', {"vid":vid},
          this.processVenueData, null);
    };
    Fsq2GMaps.prototype.processVenueData = function(response)  {
      eval("var obj=" + response.responseText);
      var venue = obj.venue;
      deblog(venue.name);
      var latlng = venue.geolat + ',' + venue.geolong;
      deblog(latlng);
      var href = 'http://maps.google.com/maps?ll=' + latlng + '&z=15&sensor=false';
      if (this.link4sq) {
        this.link4sq.href = href;
        this.link4sq.target = "_blank";
        this.link4sq.innerHTML = href;
      }
    };
    function overwritelink(){
      var link = this.innerHTML;
      link = link.replace(/<\/?[^<>]+>/g,"");
      if (link.match(/4sq\.com/)) {
        var status_id = this.parentNode.parentNode.parentNode.parentNode.id;
        var img = $img({id:"loadingimage_" + status_id});
        img.src = loading_image;
        //img.style.display = "none";
        this.appendChild(img);
        var fsq2GMaps = new Fsq2GMaps(this, status_id);
        fsq2GMaps.getRedirectURL(link);
      }
    }
    function allocEvent() {
      var spanTags = document.getElementsByTagName("span");
      var span, aTags, aTag;
      for (var i = 0; i < spanTags.length; i++) {
        span = spanTags[i];
        if (span.className == "entry-content") {
          var status_id = span.parentNode.parentNode.parentNode.id;
          if (statuses.indexOf(status_id) == -1) {
            aTags = span.getElementsByTagName("a");
            for (var j = 0; j < aTags.length; j++) {
              aTag = aTags[j];
              var link = aTag.innerHTML;
              link = link.replace(/<\/?[^<>]+>/g,"");
              if (link.match(/4sq\.com/)) {
                aTag.setAttribute("href", "javascript:void(0)");
                aTag.setAttribute("target", "");
                aTag.addEventListener('click', overwritelink, false);
              }
            }
            statuses.push(status_id);
          }
        }
      }
    }
    function monitor(){
      if (document.getElementsByClassName ('meta entry-meta').length != statuses.length){
        allocEvent();
      }
      setTimeout (monitor, 200);     
    }
    setTimeout(monitor, 200);
  }
  window.addEventListener('load', function() {
    function readyWait() {
      var gApp = unsafeWindow.gApplication;
      if (gApp == null) {
        window.setTimeout(readyWait, 100);
      } else {
        init();
        unsafeWindow.GEvent.addListener(gApp.getMap(), 'moveend', function(){
          mapMoved();
        });
        unsafeWindow.GEvent.addListener(gApp.getMap(), 'click', function(ovarlay, latlng){
          mapClicked(latlng);
        });
      }
    }
    var loc = window.location.toString();
    if (loc.match(/^http:\/\/twitter\.com\/.*/)) {
      initTwitter();
    } else {
      if (!(typeof unsafeWindow.gApplication == 'undefined')) {
        readyWait();
      }
    }
  }, false);

})();