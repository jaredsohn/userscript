// ==UserScript==
// @name           Flowdock Link Titles
// @namespace      rane
// @author         Raine Virta <raine.virta@gmail.com>
// @description    Gets titles for links in Flowdock chat
// @include        https://*.*.com/flows/*
// ==/UserScript==

/*
 * TODO
 * getting history spams requests
 * timeout
 */

// Chrome compatible method of using the jQuery provided by the site
var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = "(" + linkTitles.toString() + ")(jQuery)";
document.body.appendChild(script);

function linkTitles(jQuery) {
  var $ = jQuery;

  /* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
   * Dual licensed under the MIT (MIT_LICENSE.txt)
   * and GPL Version 2 (GPL_LICENSE.txt) licenses.
   *
   * Version: 1.1.1
   * Requires jQuery 1.3+
   * Docs: http://docs.jquery.com/Plugins/livequery
   */
  (function(a){a.extend(a.fn,{livequery:function(e,d,c){var b=this,f;if(a.isFunction(e)){c=d,d=e,e=undefined}a.each(a.livequery.queries,function(g,h){if(b.selector==h.selector&&b.context==h.context&&e==h.type&&(!d||d.$lqguid==h.fn.$lqguid)&&(!c||c.$lqguid==h.fn2.$lqguid)){return(f=h)&&false}});f=f||new a.livequery(this.selector,this.context,e,d,c);f.stopped=false;f.run();return this},expire:function(e,d,c){var b=this;if(a.isFunction(e)){c=d,d=e,e=undefined}a.each(a.livequery.queries,function(f,g){if(b.selector==g.selector&&b.context==g.context&&(!e||e==g.type)&&(!d||d.$lqguid==g.fn.$lqguid)&&(!c||c.$lqguid==g.fn2.$lqguid)&&!this.stopped){a.livequery.stop(g.id)}});return this}});a.livequery=function(b,d,f,e,c){this.selector=b;this.context=d;this.type=f;this.fn=e;this.fn2=c;this.elements=[];this.stopped=false;this.id=a.livequery.queries.push(this)-1;e.$lqguid=e.$lqguid||a.livequery.guid++;if(c){c.$lqguid=c.$lqguid||a.livequery.guid++}return this};a.livequery.prototype={stop:function(){var b=this;if(this.type){this.elements.unbind(this.type,this.fn)}else{if(this.fn2){this.elements.each(function(c,d){b.fn2.apply(d)})}}this.elements=[];this.stopped=true},run:function(){if(this.stopped){return}var d=this;var e=this.elements,c=a(this.selector,this.context),b=c.not(e);this.elements=c;if(this.type){b.bind(this.type,this.fn);if(e.length>0){a.each(e,function(f,g){if(a.inArray(g,c)<0){a.event.remove(g,d.type,d.fn)}})}}else{b.each(function(){d.fn.apply(this)});if(this.fn2&&e.length>0){a.each(e,function(f,g){if(a.inArray(g,c)<0){d.fn2.apply(g)}})}}}};a.extend(a.livequery,{guid:0,queries:[],queue:[],running:false,timeout:null,checkQueue:function(){if(a.livequery.running&&a.livequery.queue.length){var b=a.livequery.queue.length;while(b--){a.livequery.queries[a.livequery.queue.shift()].run()}}},pause:function(){a.livequery.running=false},play:function(){a.livequery.running=true;a.livequery.run()},registerPlugin:function(){a.each(arguments,function(c,d){if(!a.fn[d]){return}var b=a.fn[d];a.fn[d]=function(){var e=b.apply(this,arguments);a.livequery.run();return e}})},run:function(b){if(b!=undefined){if(a.inArray(b,a.livequery.queue)<0){a.livequery.queue.push(b)}}else{a.each(a.livequery.queries,function(c){if(a.inArray(c,a.livequery.queue)<0){a.livequery.queue.push(c)}})}if(a.livequery.timeout){clearTimeout(a.livequery.timeout)}a.livequery.timeout=setTimeout(a.livequery.checkQueue,20)},stop:function(b){if(b!=undefined){a.livequery.queries[b].stop()}else{a.each(a.livequery.queries,function(c){a.livequery.queries[c].stop()})}}});a.livequery.registerPlugin("append","prepend","after","before","wrap","attr","removeAttr","addClass","removeClass","toggleClass","empty","remove","html");a(function(){a.livequery.play()})})(jQuery);

  /*
   * SimpleYQL
   *
   * Copyright 2010, Raine Virta
   * Released under MIT license
   * Commit: 0fa79e8
   * Date: Wed Jun 16 23:44:42 2010 +0300
   */
  SimpleYQL=function(){var e={toQueryString:function(a){var c=[];for(var d in a)a.hasOwnProperty(d)&&c.push(encodeURIComponent(d)+"="+encodeURIComponent(a[d]));return c.join("&")},toURI:function(a,c){return arguments.length>1?[a,e.toQueryString(c)].join("?"):a}};return{debug:false,helpers:e,get:function(a,c,d){var b={xpath:null,what:"*"},f=typeof c;if(f=="function")d=c;else if(f=="string")b.xpath=c;else f=="object"&&jQuery.extend(b,c);a="select "+b.what+" from html where url='"+a+"'";if(b.xpath)a+=
  " and xpath='"+b.xpath+"'";b={q:a,diagnostics:"false",format:"json"};this.debug&&console.debug(b);b=e.toURI("http://query.yahooapis.com/v1/public/yql",b);jQuery.ajax({url:b,dataType:"jsonp",cache:"true",success:function(g){try{d(g.query.results)}catch(h){d(null)}},error:function(){d(null)}})}}}();

  function showTitle(link) {
    if (link.attr("titled")) {
      return;
    }

    if (!link.attr("href").match(/^https?/)) {
      return;
    }

    link.attr("titled", true);
    var loader = $("<img />", {
      css: {
        verticalAlign: 'middle',
        opacity: '0.5',
        margin: '0 0 2px 4px'
      },
      src: 'http://i.imgur.com/Piqwa.gif'
    }).appendTo(link.parent());

    var hostname = link.attr('href').match(/^https?:\/\/([^/]+)?/i)[1];
    hostname = hostname.split(".").splice(-3);
    if (hostname[0] == 'www') {
      hostname.shift();
    }
    hostname = hostname.join(".");

    var bottom = (($("#chat_app_lines")[0].scrollHeight - $("#chat_app_lines").outerHeight()) - $("#chat_app_lines").scrollTop()) < 100;

    SimpleYQL.get(link.attr('href'), { xpath: '//title[1]/text()' }, function(title) {
      loader.remove();

      if (!title) {
        return;
      }

      link.text(title);

      $("<span />", {
        css: {
          color: '#8396BA',
          fontSize: '8pt',
          marginLeft: '4px'
        },
        text: hostname
      }).insertAfter(link);

      // If the chat scrollbar was in a reasonably small distance from the bottom
      // when the title fetching was initiated, move the scrollbar to the bottom
      if (bottom) {
        $("#chat_app_lines").scrollTo('max');
      }
    });
  }

  $(function() {
    var loaded = false;

    (function() {
      if ($("#chat_app").length) {
        var loadedAt = new Date();

        $("#chat_app .chat_line_content a").livequery(function() {
          var timeSince = (new Date()).getTime() - loadedAt.getTime();
          if (timeSince < 1000) {
            return;
          };

          showTitle($(this));
        });
      } else {
        setTimeout(arguments.callee, 200);
      }
    })();

    $("#chat_app .chat_line_content a:not(.app-tag-link)").live('mouseover', function() {
      var link = $(this);
      var id = setTimeout(function() {
        showTitle(link);
      }, 300);

      $(this).one('mouseleave', function() {
        clearTimeout(id);
      });
    });
  });
}
