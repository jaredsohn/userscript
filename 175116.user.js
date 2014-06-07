// ==UserScript==
// @name            Hummingbird: AutoPager
// @description     Loads the next page of the replies/threads on the Hummingbird forums.
// @author          Chris H (Zren / Shade)
// @icon            http://hummingbird.me/favicon.ico
// @namespace       http://xshade.ca
// @version         1.4
// @include         http://hummingbird.me/community/*
// @include         http://hummingbird.me/community/forums/*
// ==/UserScript==

window.jQuery = unsafeWindow.jQuery;

// https://github.com/Zren/purl/blob/editable-attributes/purl.js
(function(factory){if(typeof define==="function"&&define.amd)define(factory);else window.purl=factory()})(function(){var tag2attr={a:"href",img:"src",form:"action",base:"href",script:"src",iframe:"src",link:"href"},key=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","fragment"],aliases={"anchor":"fragment"},parser={strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/},isint=/^[0-9]+$/;function parseUri(url,strictMode){var str=decodeURI(url),res=parser[strictMode||false?"strict":"loose"].exec(str),uri={attr:{},param:{},seg:{}},i=14;while(i--)uri.attr[key[i]]=res[i]||"";uri.param["query"]=parseString(uri.attr["query"]);uri.param["fragment"]=parseString(uri.attr["fragment"]);
uri.seg["path"]=uri.attr.path.replace(/^\/+|\/+$/g,"").split("/");uri.seg["fragment"]=uri.attr.fragment.replace(/^\/+|\/+$/g,"").split("/");uri.attr["base"]=uri.attr.host?(uri.attr.protocol?uri.attr.protocol+"://"+uri.attr.host:uri.attr.host)+(uri.attr.port?":"+uri.attr.port:""):"";return uri}function getAttrName(elm){var tn=elm.tagName;if(!isUndefined(tn))return tag2attr[tn.toLowerCase()];return tn}function promote(parent,key){if(parent[key].length===0)return parent[key]={};var t={};for(var i in parent[key])t[i]=
parent[key][i];parent[key]=t;return t}function parse(parts,parent,key,val){var part=parts.shift();if(!part)if(isArray(parent[key]))parent[key].push(val);else if("object"==typeof parent[key])parent[key]=val;else if("undefined"==typeof parent[key])parent[key]=val;else parent[key]=[parent[key],val];else{var obj=parent[key]=parent[key]||[];if("]"==part)if(isArray(obj)){if(""!==val)obj.push(val)}else if("object"==typeof obj)obj[keys(obj).length]=val;else obj=parent[key]=[parent[key],val];else if(~part.indexOf("]")){part=
part.substr(0,part.length-1);if(!isint.test(part)&&isArray(obj))obj=promote(parent,key);parse(parts,obj,part,val)}else{if(!isint.test(part)&&isArray(obj))obj=promote(parent,key);parse(parts,obj,part,val)}}}function merge(parent,key,val){if(~key.indexOf("]")){var parts=key.split("[");parse(parts,parent,"base",val)}else{if(!isint.test(key)&&isArray(parent.base)){var t={};for(var k in parent.base)t[k]=parent.base[k];parent.base=t}if(key!=="")set(parent.base,key,val)}return parent}function parseString(str){return reduce(String(str).split(/&|;/),
function(ret,pair){try{pair=decodeURIComponent(pair.replace(/\+/g," "))}catch(e){}var eql=pair.indexOf("="),brace=lastBraceInKey(pair),key=pair.substr(0,brace||eql),val=pair.substr(brace||eql,pair.length);val=val.substr(val.indexOf("=")+1,val.length);if(key===""){key=pair;val=""}return merge(ret,key,val)},{base:{}}).base}function set(obj,key,val){var v=obj[key];if(isUndefined(v))obj[key]=val;else if(isArray(v))v.push(val);else obj[key]=[v,val]}function lastBraceInKey(str){var len=str.length,brace,
c;for(var i=0;i<len;++i){c=str[i];if("]"==c)brace=false;if("["==c)brace=true;if("="==c&&!brace)return i}}function reduce(obj,accumulator){var i=0,l=obj.length>>0,curr=arguments[2];while(i<l){if(i in obj)curr=accumulator.call(undefined,curr,obj[i],i,obj);++i}return curr}function isArray(vArg){return Object.prototype.toString.call(vArg)==="[object Array]"}function isPlainObject(o){return Object(o)===o&&Object.getPrototypeOf(o)===Object.prototype}function isUndefined(o){return typeof o==="undefined"}
function isPlainObject(o){return Object(o)===o&&Object.getPrototypeOf(o)===Object.prototype}function keys(obj){var key_array=[];for(var prop in obj)if(obj.hasOwnProperty(prop))key_array.push(prop);return key_array}function purl(url,strictMode){if(arguments.length===1&&url===true){strictMode=true;url=undefined}strictMode=strictMode||false;url=url||window.location.toString();return{data:parseUri(url,strictMode),attr:function(attr){attr=aliases[attr]||attr;return!isUndefined(attr)?this.data.attr[attr]:
this.data.attr},param:function(param,value){if(arguments.length>=2&&!isUndefined(param)&&!isUndefined(value))return this.data.param.query[param]=value;else if(arguments.length==1&&!isUndefined(param))if(isPlainObject(param))this.data.param.query=param;else return this.data.param.query[param];else return this.data.param.query},removeParam:function(param){delete this.data.param.query[param]},fparam:function(param,value){if(arguments.length>=2&&!isUndefined(param)&&!isUndefined(value))return this.data.param.fragment[param]=
value;else if(arguments.length==1&&!isUndefined(param))if(isPlainObject(param))this.data.param.fragment=param;else return this.data.param.fragment[param];else return this.data.param.fragment},removeFParam:function(param){delete this.data.param.fragment[param]},segment:function(seg){if(isUndefined(seg))return this.data.seg.path;else{seg=seg<0?this.data.seg.path.length+seg:seg-1;return this.data.seg.path[seg]}},fsegment:function(seg){if(isUndefined(seg))return this.data.seg.fragment;else{seg=seg<0?
this.data.seg.fragment.length+seg:seg-1;return this.data.seg.fragment[seg]}},generate:function(){if(isUndefined(jQuery))return;var buffer=this.data.attr.protocol+"://"+this.data.attr.host;buffer+=this.data.attr.path;if(Object.keys(this.data.param.query).length>0)buffer+="?"+jQuery.param(this.data.param.query);if(Object.keys(this.data.param.fragment).length>0)buffer+="#"+jQuery.param(this.data.param.fragment);return buffer}}}purl.jQuery=function($){if($!=null){$.fn.url=function(strictMode){var url=
"";if(this.length)url=$(this).attr(getAttrName(this[0]))||"";return purl(url,strictMode)};$.url=purl}};purl.jQuery(window.jQuery);return purl});

// 
(function(window){
  var HBAP = {
    //--- Types
    State: { // Enum
      RUNNING: 0,
      PAUSED: 1
    },

    //--- Variables
    currentPage: 1,
    forumPage: false,
    fetchingNextPage: false,
    reachedEnd: false,
    preloadRatio: 1, // Fetch the next page 1 screen height early.
    hudClass: 'HBAP-hud',
    hudStateButtonClass: 'HBAP-fetch',
    hud: null,
    currentState: 0,
    configKey: 'state',
  
    //--- Funcs
    //-- Utils
    log: function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift('[' + GM_info.script.name + ']'); // Prepend the script name.
      console.log.apply(console, args);
    },
    getConfig: function(key, defaultValue) {
      var value = GM_getValue(key, defaultValue);
      this.log('Get', key, '=', value);
      return value;
    },
    setConfig: function(key, value) {
      GM_setValue(key, value);
      this.log('Set', key, 'to', value);
    },
  
    //--
    isPaused: function() {
      return !this.isForumPage
        || this.reachedEnd
        || this.fetchingNextPage
        || this.currentState == this.State.PAUSED;
    },
    onGetNextPage: function(data, textStatus, jqXHR) {
      //console.log(data, textStatus, jqXHR);
      var html = $.parseHTML(data);//console.log(html);
      var $elements = HBAP.getElements(html);//console.log('$elements', $elements);
      if ($elements.length == 0) {
        HBAP.reachedEnd = true;
        return;
      }

      // Add a page break.
      var lastElement = HBAP.getLastElement();
      var pageBreak = $('<div class="reply-header large-12 columns" />').append(
        $('<h3 />').append(
          $('<span />')
            .text('Page ' + HBAP.currentPage)
        )
      ).css({
        'margin-bottom': '10px'
      });
      pageBreak.insertAfter(lastElement);

      // Add the elements.
      $elements.insertAfter(pageBreak);

      // Update the pagination bar.
      var $pagination = $('div.pagination').last();
      $pagination.children().remove();
      $pagination.append($('div.pagination', html).last().children());

      // Update the url in the address bar.
      window.history.pushState(null, $('head title', html).text().trim(), this.url);
    },
    loadNextPage: function() {
      if (this.isPaused())
        return;

      var currentPage = ++this.currentPage;//console.log('currentPage', HBAP.currentPage);

      var url = $.url();
      url.param('page', currentPage);
      var nextUrl = url.generate();//console.log('nextUrl', nextUrl);

      this.log('Loading page ' + currentPage, nextUrl);

      this.fetchingNextPage = true;

      // Add loading spinner
      $('ul.pagination').last().append(
        $('<li />').addClass('pagination-spinner')
        .css({
          'position': 'absolute',
          'left': '50%'
        })
        .append(
          $('<i />').addClass('icon-spinner icon-spin')
          .css({
            'margin-left': '-50%'
          })
        )
      );

      $.get(nextUrl)
        .done(this.onGetNextPage)
        .always(function(){
          HBAP.fetchingNextPage = false;
          $('ul.pagination li.pagination-spinner').last().remove();
        });
    },
    isTopicsPage: function() {
      // Can't use && $('.forum-container.topic').size() > 0 as a forum may be empty.
      // There are 2 .forum-container in the topic replies page. One for the OP, and another
      // classed as .forum-container.replies
      return $('.forum-container').size() == 1; 
    },
    isTopicRepliesPage: function() {
      return $('.forum-container.replies').size() == 1;
    },
    getElements: function(parent) {
      if (this.isTopicRepliesPage())
        return $('.forum-container.replies .topic-reply', parent);
      else if (this.isTopicsPage())
        return $('.forum-container .topic', parent);
    },
    getLastElement: function(parent) {
      return this.getElements(parent).last();
    },
    onWindowScroll: function() {
      if (HBAP.isPaused())
        return;

      var lastElement = HBAP.getLastElement();
      var bottom = lastElement.offset().top + lastElement.height();
      var windowHeight = $(window).height();
      var scrollCurrent = $(window).scrollTop();

      if (scrollCurrent + windowHeight * (1 + HBAP.preloadRatio) >= bottom) {
        HBAP.loadNextPage();
      }
    },
    toggleAutoPagerState: function() {
      this.setCurrentState((this.currentState + 1) % Object.keys(this.State).length);
    },
    setCurrentState: function(state) {
      this.log('setCurrentState', state);
      this.currentState = state;

      // Update state icon
      $('.' + this.hudStateButtonClass + ' i').removeClass().addClass(this.getStateIconClass());
    },
    getStateIconClass: function() {
      switch(HBAP.currentState) {
        case HBAP.State.RUNNING: return 'icon-play';
        case HBAP.State.PAUSED: return 'icon-pause';
      }
    },
    createHud: function() {
      this.hud = $('<div />').addClass(this.hudClass)
      .append(
        $('<label />').append(
          $('<span />').addClass('label-text')
          .css({
            'margin': '0 .5em 0 0',
            'display': 'none'
          }).text('AutoPager')
        ).append(
          $('<span />').addClass(this.hudStateButtonClass)
          .append(
            $('<i />') // Icon
          )
          .click(function(e){
            HBAP.toggleAutoPagerState();

            // Update in case we're at the bottom of the page.
            HBAP.onWindowScroll();
          })
          .css({
            'display': 'inline-block',
            'margin': '0'
          })
        ).css({
          'margin': '0'
        })
      ).css({
        'position': 'fixed', 
        'bottom': '4px',
        'right': '4px',
        'background': 'white',
        'border-radius': '4px',
        'padding': '.5em'
      }).hover(function(){
        $('label span.label-text', this).show();
      }, function(){
        $('label span.label-text', this).hide();
      });
      $(document.body).append(this.hud);
    },
    init: function() {
      this.isForumPage = $('.forum-container').size() > 0;

      if (!this.isForumPage)
        return;

      this.log('Initialized');

      if (this.isTopicRepliesPage())
        this.log('isTopicRepliesPage');
      else if (this.isTopicsPage())
        this.log('isTopicsPage');

      this.currentPage = $.url().param('page') || 1;
      this.createHud();
      this.setCurrentState(HBAP.State.RUNNING);

      $(window).scroll(this.onWindowScroll);     
    }
  };

  window.HBAP = HBAP;
  HBAP.init();
})(unsafeWindow);
