// ==UserScript==
// @name      SBM Comments Viewer
// @namespace   http://white.s151.xrea.com/wiki/index.php?script/SBMCommentsViewer
// @description   Show social bookmark's comments at the bottom of your browser.
// @include     *
// @exclude     http://mm-video.net/*
// @exclude     http://reader.livedoor.com/*
// ==/UserScript==

/*

Last Modified: 2007.11.01

Copyright (C) 2006-2007 shiro

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in
   the documentation and/or other materials provided with the
   distribution.

3. The name of the author may not be used to endorse or promote
   products derived from this software without specific prior
   written permission.

THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
*/

var SBMCommentsViewer = function() {
  
  // --------------------------------------------------------------
  // Shortcut key
  // --------------------------------------------------------------
  // C -- control
  // S -- shift
  // A -- alt
  var BIND_KEY = '-b';
  
  // --------------------------------------------------------------
  // max count (each sbm)
  // --------------------------------------------------------------
  var MAX_GET_COUNT = 100;
  
  // --------------------------------------------------------------
  // ignore user
  // --------------------------------------------------------------
  var ignore_hatena = [];
  var ignore_delicious = [];
  var ignore_livedoor = [];
  var ignore_buzzurl = [];
  var ignore_pookmark = [];

  // --------------------------------------------------------------
  // mouse
  // --------------------------------------------------------------
  // mouseover,click,dblclick etc
  var mouse_event_show = 'click';
  
  // --------------------------------------------------------------
  // JSONP
  // --------------------------------------------------------------
  // true  : JSONP
  // false : RSS
  var hatena_use_jsonp = false; // NoScriptを使う場合はfalseに
  var buzzurl_use_jsonp = true;

  // --------------------------------------------------------------
  // CSS
  // --------------------------------------------------------------
  var font_css = "font-size:16px; color:#333333;";
  var back_css = [
    "background-image:none;",
    "background-color:LemonChiffon; ",
    "opacity:1.00;"
    ].join('');
  var comment_height = 250;
  var option_height = 80;
  // for comment area
  var comment_area_css = [
    "left:20px; ",
    "right:0px; ",
    "bottom:0px; ",
    "text-align:left; ",
    "position:fixed; ",
    "z-index:100; ",
    "height:80%; ",
    "margin:0px; ",
    "padding:0px;",
    "line-height:1.5",
    back_css,
    font_css
    ].join('');

  // for comment
  var comment_css = [
    "position:relative; ",
    "bottom:0px; ",
    "border: 1px solid #999999; ",
    "overflow:auto; ",
    "margin:0px; ",
    "height:100%; ",
    back_css,
    font_css
    ].join('');

  // for count
  var count_css = [
    "position:absolute; ",
    "text-align:right; ",
    "right:0px; ",
    "position:absolute; ",
    "border:1px solid #999999; ",
    "top:-" + (option_height-2) + "px; ",
    back_css,
    font_css,
    "opacity:0.2; "
    ].join('');

  // for count(number)
  var number_css = "font-weight:bold;";

  // for options
  var option_css = [
    "left:0px; ",
    "right:0px; ",
    "position:absolute; ",
    "border:1px solid #999999; ",
    "marginargin:0px; ",
    "border-bottom:0; ",
    "line-height:110%; ",
    "height:" + option_height + "px; ",
    "top:-" + option_height + "px; ",
    back_css,
    font_css
    ].join('');
  
  // for stress text of option
  var option_text_css = "font-weight:bold; text-decoration:underline;";

  // for anchor
  var anchor_css = [
    "font-size:12px;",
    "color:blue;",
    "text-decoration:none;",
    back_css
    ].join('');

  // for mini mode
  var mini_css = [
    "right:0px;",
    "bottom:0px; ",
    "text-align:right; ",
    "position:fixed; ",
    "overflow:auto; ",
    "z-index:100; ",
    back_css,
    font_css,
    "padding-left:10px; ",
    "padding-right:10px; ",
    "border-top: 1px solid #666666; ",
    "border-left: 1px solid #666666; "
    ].join('');

  // tag cloud
  var tag_cloud_min_size = 15;
  var tag_cloud_max_size = 50;

  try{
    if (self.location.href!=top.location.href || !document.body) return;
  }catch(e){
    return;
  }
  var uri = top.location.href.replace(/#/g, '%23');
  var firefox;
  var w;
  if(typeof unsafeWindow != 'undefined'){
    // firefox
    firefox = true;
    w = unsafeWindow;
  }else {
    // not firefox
    firefox = false;
    w = window;
  }
  var option = new Option();
  var comment_area = new CommentArea();
  var is_load = false;

  // --------------------------------------------------------------
  // Comment Area
  // --------------------------------------------------------------
  function CommentArea (show) {
    this.comments = [];
    this.comments_no_dup = false;
    var counts = [];
    
    CommentArea.prototype.setup = function () {
      if(this.id) return;
      this.id = 'SBMCommentsViewerArea';
      this.div = document.createElement('div');
      this.div.setAttribute('id', this.id);
      this.div.setAttribute('style', comment_area_css + 'display:none;');
      this.div.addEventListener("click", function(e){if(e.detail == 3) comment_area.hide()}, false);
      document.body.appendChild(this.div);

      this.id_option = 'SBMoptionsViewerOptionArea';
      this.option = document.createElement('div');
      this.option.setAttribute('id', this.id_option);
      this.option.setAttribute('style', option_css);
      this.div.appendChild(this.option);

      this.id_panel = 'SBMCommentsViewerCommentArea';
      this.comment = document.createElement('ol');
      this.panel = document.createElement('div');
      this.panel.setAttribute('style', comment_css);
      this.panel.setAttribute('id', this.id_panel);
      this.div.appendChild(this.panel);

      this.id_count = 'SBMCommentsViewerCountArea';
      this.count = document.createElement('div');
      this.count.setAttribute('id', this.id_count);
      this.count.setAttribute('style', count_css);
      this.count_opacity = this.count.style.opacity;
      this.count.addEventListener("mouseover", function(){
        this.style.opacity = '1.0';
      }, false);
      this.count.addEventListener("mouseout", function(){
        this.style.opacity = comment_area.count_opacity;
      }, false);
      this.div.appendChild(this.count);

      // close button(自分で追加したもの)
      var a_close = document.createElement('a');
      a_close.setAttribute('href', "javascript:void(0)");
      a_close.setAttribute('style', "position:absolute; right:0px; bottom:0px;");
      a_close.innerHTML = "Close";
      a_close.addEventListener("click", function(){comment_area.hide()}, false);
      this.div.appendChild(a_close);
      // reload button
      var a_reload = document.createElement('a');
      a_reload.setAttribute('href', "javascript:void(0)");
      a_reload.setAttribute('style', "position:absolute; right:70px; bottom:0px;");
      a_reload.innerHTML = "Reload";
      a_reload.addEventListener("click", function(){
        comment_area.hide();
        SBMCommentsViewer();
      }, false);
      this.div.appendChild(a_reload);

      this.id_mini = 'SBMCommentsViewerMini';
      this.mini = document.createElement('div');
      this.mini.setAttribute('id', this.id_mini);
      this.mini.setAttribute('style', mini_css + 'display:none');
      this.mini.addEventListener(mouse_event_show, function(){comment_area.show()}, false);
      document.body.appendChild(this.mini);
    }
    
    CommentArea.prototype.show = function (reset) {
      this.setup();
      loadSBM();
      this.getOption();
      if(reset) this.init(false);
      if(this.mini.style.display != 'none')
        this.mini.style.display = 'none';
      if(this.div.style.display != 'block')
        this.div.style.display = 'block';
    }
    CommentArea.prototype.hide = function () {
      if(this.mini.style.display != 'block')
        this.mini.style.display = 'block';
      if(this.div.style.display != 'none')
        this.div.style.display = 'none';
    }
    CommentArea.prototype.toggle = function () {
      if(!this.div || this.div.style.display == 'none'){
        this.show();
        document.getElementById('SBMCommentsViewerCommentArea').focus();
      }else{
        this.hide();
        document.getElementById('SBMCommentsViewerCommentArea').blur();
      }
    }
    CommentArea.prototype.init = function (_type) {
      var types = [];
      for(var property in this.comments) {
        types.push(property);
      }
      if(option.show_type == "Comment"){
        this.initComment(_type, types);
      }else{
        this.initTagCloud(_type, types);
      }
    }
    CommentArea.prototype.initTagCloud = function (_type, types) {
      var tagcloud;
      if(!_type && this.tagcloud){
        tagcloud = this.tagcloud;
      }else{
        var tags = [];
        var min;
        var max;
        var cmts = this.getUniqueUser(_type, types);
        for(var i=0; i<cmts.length; i++){
          var comment = cmts[i];
          if(comment){
            for(var k=0; k<comment.tags.length; k++){
              if(tags[comment.tags[k].toLowerCase()]){
                tags[comment.tags[k].toLowerCase()]++;
              }else{
                tags[comment.tags[k].toLowerCase()] = 1;
              }
            }
          }
        }
        for(var tag in tags){
          var count = tags[tag];
          if(!min && !max){
            min = count;
            max = count;
          }
          if(count != 0 && min>count){
            min = count;
          }
          if(count !=0 && max<count){
            max = count;
          }
        }
        tagcloud = new TagCloud(tags, min, max);
        if(!_type){
          this.tagcloud = tagcloud;
        }
      }
      this.panel.innerHTML = '';
      this.panel.appendChild(tagcloud.getHTML());
    }
    CommentArea.prototype.initComment = function (_type, types) {
      this.panel.innerHTML = '';
      this.comment.innerHTML = '';
      var text = "";
      var cmts = [];
      if(option.remove_multipost) {
        cmts = this.getUniqueUser(_type, types);
      }else{
        for(var i=0; i<types.length; i++){
          cmts = cmts.concat(this.comments[types[i]].filter(function(c){
            return c.isNotIgnore();
          }));
        }
      }
      switch(option.sort_type) {
        case "SBMAsc":
        cmts.sort(function(a,b){return (a.href > b.href) ? 1 : -1;});
        break;
        case "SBMDesc":
        cmts.sort(function(a,b){return (a.href > b.href) ? -1 : 1;});
        break;
        case "DateAsc":
        cmts.sort(function(a,b){return a.date-b.date;});
        break;
        case "DateDesc":
        cmts.sort(function(a,b){return b.date-a.date;});
        break;
        case "UserAsc":
        cmts.sort(function(a,b){return (a.user > b.user) ? 1 : -1;});
        break;
        case "UserDesc":
        cmts.sort(function(a,b){return (a.user > b.user) ? -1 : 1;});
        break;
      }
      for(var a=0; a<cmts.length; a++){
        text += cmts[a].getHTML();
      }
      this.comment.innerHTML += text;
      this.panel.appendChild(this.comment);
    }
    CommentArea.prototype.getUniqueUser = function(_type, types){
      var cmts = [];
      if(!_type && this.comments_no_dup){
        cmts = this.comments_no_dup;
      }else{
        while(types.length > 0) {
          var type = types.shift();
          for(var i=0; i<this.comments[type].length; i++) {
            var flag = true;
            var comment1 = this.comments[type][i];
            if(comment1 && comment1.isNotIgnore()) {
              var user = comment1.user.toLowerCase();
              var cmnt = comment1.comment;
              var y = comment1.date.getFullYear();
              var m = comment1.date.getMonth();
              var d = comment1.date.getDate();
              for(var j=0; j<types.length; j++) {
                for(var k=0; k<this.comments[types[j]].length; k++){
                  var comment2 = this.comments[types[j]][k];
                  if(comment2){
                    var date = comment2.date;
                    if(user == comment2.user.toLowerCase() && cmnt == comment2.comment){
                      if(y == date.getFullYear() && m == date.getMonth() && d == date.getDate()) {
                        flag = false;
                        k = this.comments[types[j]].length;
                        j = types.length;
                        break;
                      }
                    }
                  }
                }
              }
              if(flag){
                cmts.push(comment1);
              }
            }
          }
        }
        if(!_type){
          this.comments_no_dup = cmts;
        }
      }
      return cmts;
    }
    CommentArea.prototype.getOption = function() {
      this.option.innerHTML = ''
        this.option.appendChild(option.getHTML());
    }
    CommentArea.prototype.addCount = function (count, image, link) {
      var c = new Count(count, image, link);
      counts.push(c);
      this.count.innerHTML += c.getHTML();
      this.mini.innerHTML += c.getMiniHTML();
    }
    CommentArea.prototype.addComments = function (type ,comments) {
      this.comments[type] = comments;
    }
    return this;
  }
  // --------------------------------------------------------------
  // Option
  // --------------------------------------------------------------
  function Option() {
    // "Comment" or "TagCloud"
    this.show_type = (typeof GM_getValue("show_type") != 'undefined') ? GM_getValue("show_type"): "Comment";
    this.show_types = ["Comment", "TagCloud"];
    this.remove_multipost = (typeof GM_getValue("remove_multipost") != 'undefined' || typeof GM_getValue("remove_multipost") != 'string') ? GM_getValue("remove_multipost"): true;
    this.sort_type = (typeof GM_getValue("sort_type") != 'undefined') ? GM_getValue("sort_type"): 'SBMAsc';
    this.sort_types = ['SBMAsc', 'SBMDesc', 'DateAsc', 'DateDesc', 'UserAsc', 'UserDesc'];
    this.tag_sort_type = (typeof GM_getValue("tag_sort_type") != 'undefined') ? GM_getValue("tag_sort_type"): 'NumberDesc';
    this.tag_sort_types = ['NumberAsc', 'NumberDesc', 'NameAsc', 'NameDesc'];
    this.show_tag = (typeof GM_getValue("show_tag") != 'undefined') ? GM_getValue("show_tag"): true;
    this.show_nocomment = (typeof GM_getValue("show_nocomment") != 'undefined') ? GM_getValue("show_nocomment"): true;
    this.auto_start = (typeof GM_getValue("auto_start") != 'undefined') ? GM_getValue("auto_start"): true;
    this.auto_start_open = (typeof GM_getValue("auto_start_open") != 'undefined') ? GM_getValue("auto_start_open"): false;

    Option.prototype.setShowType = function(arg){
      this.show_type = arg;
      GM_setValue("show_type", this.show_type);
      comment_area.show(true);
    }
    Option.prototype.setShowTag = function(arg){
      this.show_tag = arg;
      GM_setValue("show_tag", this.show_tag);
      comment_area.show(true);
    }
    Option.prototype.setShowNoComment = function(arg){
      this.show_nocomment = arg;
      GM_setValue("show_nocomment", this.show_nocomment);
      comment_area.show(true);
    }
    Option.prototype.setSort = function(arg){
      this.sort_type = arg;
      GM_setValue("sort_type", this.sort_type);
      comment_area.show(true);
    }
    Option.prototype.setRemoveMultipost = function(arg){
      this.remove_multipost = arg;
      GM_setValue("remove_multipost", this.remove_multipost);
      comment_area.show(true);
    }
    Option.prototype.setAutoStart = function(arg){
      this.auto_start = arg;
      GM_setValue("auto_start", this.auto_start);
      comment_area.show(true);
    }
    Option.prototype.setAutoStartOpen = function(arg){
      this.auto_start_open = arg;
      GM_setValue("auto_start_open", this.auto_start_open);
      comment_area.show(true);
    }
    Option.prototype.setTagSort = function(arg){
      this.tag_sort_type = arg;
      GM_setValue("tag_sort_type", this.tag_sort_type);
      comment_area.show(true);
    }
    Option.prototype.getHTML = function() {
      var ul = document.createElement('ul');
      ul.setAttribute('style', 'list-style: none; margin: 10px;');

      var li_option = document.createElement('li');
      ul.appendChild(li_option);
      // Comment or TagCloud
      var a_type = document.createElement('a');
      for(var i=0; i<this.show_types.length; i++){
        if(this.show_types[i] == this.show_type) {
          var span_type = document.createElement('span');
          span_type.innerHTML = this.show_types[i];
          span_type.setAttribute('style', option_text_css);
          li_option.appendChild(span_type);
        }else{
          var a_type = document.createElement('a');
          a_type.setAttribute('href', "javascript:void(0)");
          a_type.setAttribute('style', anchor_css);
          a_type.innerHTML = this.show_types[i];
          a_type.addEventListener("click", function(){option.setShowType(this.innerHTML)}, false);
          li_option.appendChild(a_type);
        }
        li_option.appendChild(document.createTextNode(" / "));
      }
      // auto start
      var a_as = document.createElement('a');
      a_as.setAttribute('href', "javascript:void(0)");
      a_as.setAttribute('style', anchor_css + ((this.auto_start) ? option_text_css : ''));
      a_as.innerHTML = "Auto start";
      if(this.auto_start){
        a_as.addEventListener("click", function(){option.setAutoStart(false)}, false);
      }else{
        a_as.addEventListener("click", function(){option.setAutoStart(true)}, false);
      }
      li_option.appendChild(a_as);
      li_option.appendChild(document.createTextNode(" "));
      if(this.auto_start){
        // auto start open
        var a_aso = document.createElement('a');
        a_aso.setAttribute('href', "javascript:void(0)");
        a_aso.setAttribute('style', anchor_css + ((this.auto_start_open) ? option_text_css : ''));
        a_aso.innerHTML = "(Open)";
        if(this.auto_start_open){
          a_aso.addEventListener("click", function(){option.setAutoStartOpen(false)}, false);
        }else{
          a_aso.addEventListener("click", function(){option.setAutoStartOpen(true)}, false);
        }
        li_option.appendChild(a_aso);
        li_option.appendChild(document.createTextNode(" "));
      }
      li_option.appendChild(document.createTextNode("/ "));
      if(this.show_type == "Comment") {
        // sort
        var li_sort = document.createElement('li');
        for(var i=0; i<this.sort_types.length; i++){
          if(this.sort_types[i] == this.sort_type) {
            var span_sort = document.createElement('span');
            span_sort.innerHTML = this.sort_types[i];
            span_sort.setAttribute('style', option_text_css);
            li_sort.appendChild(span_sort);
          }else{
            var a_sort = document.createElement('a');
            a_sort.setAttribute('href', "javascript:void(0)");
            a_sort.setAttribute('style', anchor_css);
            a_sort.innerHTML = this.sort_types[i];
            a_sort.addEventListener("click", function(){option.setSort(this.innerHTML)}, false);
            li_sort.appendChild(a_sort);
          }
          if(i+1<this.sort_types.length) {
            li_sort.appendChild(document.createTextNode(" / "));
          }
        }
        ul.appendChild(li_sort);
        var li_comment_option = document.createElement('li');
        ul.appendChild(li_comment_option);
        // multiposter
        var a_multi = document.createElement('a');
        a_multi.setAttribute('href', "javascript:void(0)");
        a_multi.setAttribute('style', anchor_css + ((!this.remove_multipost) ? option_text_css : ''));
        a_multi.innerHTML = "Multi poster" ;
        if(this.remove_multipost){
          a_multi.addEventListener("click", function(){option.setRemoveMultipost(false)}, false);
        }else{
          a_multi.addEventListener("click", function(){option.setRemoveMultipost(true)}, false);
        }
        li_comment_option.appendChild(a_multi);
        li_comment_option.appendChild(document.createTextNode(" / "));
        // tag
        var a_tag = document.createElement('a');
        a_tag.setAttribute('href', "javascript:void(0)");
        a_tag.setAttribute('style', anchor_css + ((this.show_tag) ? option_text_css : ''));
        a_tag.innerHTML = "Tag";
        if(this.show_tag){
          a_tag.addEventListener("click", function(){option.setShowTag(false)}, false);
        }else{
          a_tag.addEventListener("click", function(){option.setShowTag(true)}, false);
        }
        li_comment_option.appendChild(a_tag);
        li_comment_option.appendChild(document.createTextNode(" / "));
        // no commenter
        var a_com = document.createElement('a');
        a_com.setAttribute('href', "javascript:void(0)");
        a_com.setAttribute('style', anchor_css + ((this.show_nocomment) ? option_text_css : ''));
        a_com.innerHTML = "No commenter";
        if(this.show_nocomment){
          a_com.addEventListener("click", function(){option.setShowNoComment(false)}, false);
        }else{
          a_com.addEventListener("click", function(){option.setShowNoComment(true)}, false);
        }
        li_comment_option.appendChild(a_com);
      }else{
        // sort
        var li_tag_sort = document.createElement('li');
        for(var i=0; i<this.tag_sort_types.length; i++){
          if(this.tag_sort_types[i] == this.tag_sort_type) {
            var span_tag_sort = document.createElement('span');
            span_tag_sort.innerHTML = this.tag_sort_types[i];
            span_tag_sort.setAttribute('style', option_text_css);
            li_tag_sort.appendChild(span_tag_sort);
          }else{
            var a_tag_sort = document.createElement('a');
            a_tag_sort.setAttribute('href', "javascript:void(0)");
            a_tag_sort.setAttribute('style', anchor_css);
            a_tag_sort.innerHTML = this.tag_sort_types[i];
            a_tag_sort.addEventListener("click", function(){option.setTagSort(this.innerHTML)}, false);
            li_tag_sort.appendChild(a_tag_sort);
          }
          if(i+1<this.tag_sort_types.length){
            li_tag_sort.appendChild(document.createTextNode(" / "));
          }
        }
        ul.appendChild(li_tag_sort);
      }
      return ul;
    }
    return this;
  }
  // --------------------------------------------------------------
  // Count
  // --------------------------------------------------------------
  function Count(count, image, link) {
    this.count = count;
    this.image = image;
    this.link  = link;
    Count.prototype.getHTML = function(){
      var s = (this.count>1) ? "s" : " ";
      return '<a href="' + this.link + '" style="' + anchor_css + '"><span style="'
        + number_css + '">' + this.count + '</span> user' + s +'</a> <img src="' + this.image + '"/><br/>';
    }
    Count.prototype.getMiniHTML = function(){
      return '<img src="' + this.image + '"/>:<span style="' + number_css + '">' + this.count + '</span> ';
    }
    return this;
  }

  // --------------------------------------------------------------
  // Tag Cloud
  // --------------------------------------------------------------
  function TagCloud(_tags, _min, _max){
    this.tags = _tags;
    this.count_min = _min;
    this.count_max = _max;
    this.size_min = tag_cloud_min_size;
    this.size_max = tag_cloud_max_size;
    this.keys = [];
    for(var tag in this.tags){
      this.keys.push(tag);
    }
    TagCloud.prototype.calc = function(count) {
      return (this.size_max - this.size_min) * (count - this.count_min) /
        (this.count_max - this.count_min) + this.size_min;
    }
    TagCloud.prototype.getHTML = function(){
      var div = document.createElement('div');
      var tags = this.tags;
      switch(option.tag_sort_type) {
        case "NumberAsc":
        this.keys.sort(function(a,b){return tags[a]-tags[b]});
        break;
        case "NumberDesc":
        this.keys.sort(function(a,b){return tags[b]-tags[a]});
        break;
        case "NameAsc":
        this.keys.sort(function(a,b){return (a > b) ? 1 : -1;});
        break;
        case "NameDesc":
        this.keys.sort(function(a,b){return (a > b) ? -1 : 1;});
        break;
      }
      for(var i=0; i<this.keys.length; i++){
        tag = this.keys[i];
        var span = document.createElement('span');
        span.setAttribute('style', "font-size:" + this.calc(this.tags[tag]) + "px;");
        span.innerHTML = tag;
        div.appendChild(span);
        div.appendChild(document.createTextNode("(" + this.tags[tag] + ") "));
      }
      return div;
    }
  }

  // --------------------------------------------------------------
  // MD5
  // http://www.onicos.com/staff/iz/amuse/javascript/expert/md5.txt
  // --------------------------------------------------------------
  /* md5.js - MD5 Message-Digest
   * Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
   * Version: 2.0.0
   * LastModified: May 13 2002
   *
   * This program is free software.  You can redistribute it and/or modify
   * it without any warranty.  This library calculates the MD5 based on RFC1321.
   * See RFC1321 for more information and algorism.
   */
  var MD5_T = new Array(0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391);
  var MD5_round1 = new Array(new Array( 0, 7, 1), new Array( 1,12, 2), new Array( 2,17, 3), new Array( 3,22, 4), new Array( 4, 7, 5), new Array( 5,12, 6), new Array( 6,17, 7), new Array( 7,22, 8), new Array( 8, 7, 9), new Array( 9,12,10), new Array(10,17,11), new Array(11,22,12), new Array(12, 7,13), new Array(13,12,14), new Array(14,17,15), new Array(15,22,16));
  var MD5_round2 = new Array(new Array( 1, 5,17), new Array( 6, 9,18), new Array(11,14,19), new Array( 0,20,20), new Array( 5, 5,21), new Array(10, 9,22), new Array(15,14,23), new Array( 4,20,24), new Array( 9, 5,25), new Array(14, 9,26), new Array( 3,14,27), new Array( 8,20,28), new Array(13, 5,29), new Array( 2, 9,30), new Array( 7,14,31), new Array(12,20,32));
  var MD5_round3 = new Array(new Array( 5, 4,33), new Array( 8,11,34), new Array(11,16,35), new Array(14,23,36), new Array( 1, 4,37), new Array( 4,11,38), new Array( 7,16,39), new Array(10,23,40), new Array(13, 4,41), new Array( 0,11,42), new Array( 3,16,43), new Array( 6,23,44), new Array( 9, 4,45), new Array(12,11,46), new Array(15,16,47), new Array( 2,23,48));
  var MD5_round4 = new Array(new Array( 0, 6,49), new Array( 7,10,50), new Array(14,15,51), new Array( 5,21,52), new Array(12, 6,53), new Array( 3,10,54), new Array(10,15,55), new Array( 1,21,56), new Array( 8, 6,57), new Array(15,10,58), new Array( 6,15,59), new Array(13,21,60), new Array( 4, 6,61), new Array(11,10,62), new Array( 2,15,63), new Array( 9,21,64));
  function MD5_F(x,y,z){return (x&y)|(~x&z);}
  function MD5_G(x,y,z){return (x&z)|(y&~z);}
  function MD5_H(x,y,z){return x^y^z;}
  function MD5_I(x,y,z){return y^(x|~z);}
  var MD5_round=new Array(new Array(MD5_F, MD5_round1), new Array(MD5_G, MD5_round2), new Array(MD5_H, MD5_round3), new Array(MD5_I, MD5_round4));
  function MD5_pack(n32){return String.fromCharCode(n32 & 0xff)+String.fromCharCode((n32>>>8)&0xff)+String.fromCharCode((n32>>>16)&0xff)+String.fromCharCode((n32>>>24)&0xff);}
  function MD5_unpack(s4){return s4.charCodeAt(0)|(s4.charCodeAt(1)<<8)|(s4.charCodeAt(2)<<16)|(s4.charCodeAt(3)<<24);}
  function MD5_number(n){while(n<0)n+=4294967296;while(n>4294967295)n-=4294967296;return n;}
  function MD5_apply_round(x,s,f,abcd,r){var a,b,c,d;var kk,ss,ii;var t,u;a=abcd[0];b=abcd[1];c=abcd[2];d=abcd[3];kk=r[0];ss=r[1];ii=r[2];u=f(s[b],s[c],s[d]);t=s[a]+u+x[kk]+MD5_T[ii];t=MD5_number(t);t=((t<<ss)|(t>>>(32-ss)));t+=s[b];s[a]=MD5_number(t);}
  function MD5_hash(data){var abcd,x,state,s;var len,index,padLen,f,r;var i,j,k;var tmp;state = new Array(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476);len=data.length;index=len&0x3f;padLen=(index<56)?(56-index):(120-index);if(padLen>0){data+="\x80";for(i=0;i<padLen-1;i++)data+="\x00";}data+=MD5_pack(len*8);data+=MD5_pack(0);len+=padLen+8;abcd=new Array(0,1,2,3);x=new Array(16);s=new Array(4);for(k=0;k<len;k+=64){for(i=0,j=k;i<16;i++,j+=4){x[i] = data.charCodeAt(j)|(data.charCodeAt(j+1)<<8)|(data.charCodeAt(j+2)<<16)|(data.charCodeAt(j+3)<<24);}for(i=0;i<4;i++)s[i]=state[i];for(i=0;i<4;i++){f=MD5_round[i][0];r=MD5_round[i][1];for(j=0;j<16;j++){MD5_apply_round(x,s,f,abcd,r[j]);tmp=abcd[0];abcd[0]=abcd[3];abcd[3]=abcd[2];abcd[2]=abcd[1];abcd[1]=tmp;}}for(i=0;i<4;i++){state[i]+=s[i];state[i]=MD5_number(state[i]);}}return MD5_pack(state[0])+MD5_pack(state[1])+MD5_pack(state[2])+MD5_pack(state[3]);}
  function MD5_hexhash(data){var i,out,c;var bit128;bit128=MD5_hash(data);out="";for(i=0;i<16;i++){c=bit128.charCodeAt(i);out+="0123456789abcdef".charAt((c>>4) & 0xf);out+="0123456789abcdef".charAt(c & 0xf);}return out;}

  // --------------------------------------------------------------
  // Comment
  // 
  // user  | string | user name
  // image   | string | url of icon
  // href  | string | url
  // tags  | list   |
  // comment | string |
  // date  | date   |
  // sbm   | string | hatena, delicious, livedoor, buzzurl, pookmark
  // --------------------------------------------------------------
  function Comment (user, image, href, tags, comment, date, tag_base, sbm) {
    this.user   = user;
    this.image  = image;
    this.href   = href;
    this.tags   = tags;
    this.comment  = comment;
    this.date   = date;
    this.tag_base = tag_base;
    this.sbm    = sbm;
    this.ignore   = [];
    this.ignore["hatena"] = ignore_hatena;
    this.ignore["delicious"] = ignore_delicious;
    this.ignore["livedoor"] = ignore_livedoor;
    this.ignore["buzzurl"] = ignore_buzzurl;
    this.ignore["pookmark"] = ignore_pookmark;
    Comment.prototype.isNotIgnore = function(){
      var res = true;
      for(var i=0; i<this.ignore[this.sbm].length; i++){
        if(this.ignore[this.sbm][i].toLowerCase() == this.user.toLowerCase()){
          res = false;
          break;
        }
      }
      return res;
    }
    Comment.prototype.getHTML = function() {
      this.HTML = '';
      if(option.show_nocomment || this.comment != '') {
        var m = String(this.date.getMonth()+1);
        if(m.length == 1){
          m = "0" + m;
        }
        var d = String(this.date.getDate());
        if(d.length == 1){
          d = "0" + d;
        }
        this.HTML = '<li>' + this.date.getFullYear() + "/" + m + "/" + d
          + ' <a href="'+ this.href + '" style="' + anchor_css + '"><img src="'
          + this.image +'" width="12px" heigth="12px" border="0"/> ' + this.user +'</a>: ';
        if(option.show_tag) {
          for(var i=0; i<this.tags.length; i++) {
            this.HTML+='<a href="' + this.tag_base + encodeURIComponent(this.tags[i]) + '" style="' + anchor_css + '">' + this.tags[i] + '</a>';
            if(i+1<this.tags.length){
              this.HTML+=', ';
            }else{
              this.HTML+=' ';
            }
          }
        }
        this.HTML+= this.comment + "</li>";
      }
      return this.HTML;
    }
    return this;
  }

  // --------------------------------------------------------------
  // hatena (jsonp)
  // --------------------------------------------------------------
  var hb_jsonp = "http://b.hatena.ne.jp/entry/json/";
  var hb_favicon = "http://b.hatena.ne.jp/favicon.ico";
  var hb_page = "http://b.hatena.ne.jp/entry/" + uri;
  function hbLoadJSONP() {
    w.hbCallback = function(json) {
      var comments = [];
      if(json){
        comment_area.addCount(json.count, hb_favicon, hb_page);
        var comment = "";
        var count = (json.bookmarks.length < MAX_GET_COUNT) ? json.bookmarks.length: MAX_GET_COUNT;
        for(var i=0; i<count; i++) {
          var bm = json.bookmarks[i];
          var user = bm.user;
          var date = new Date(bm.timestamp.slice(0,4), Number(bm.timestamp.slice(5,7))-1,
                    bm.timestamp.slice(8,10), bm.timestamp.slice(11,13),
                    bm.timestamp.slice(14,16), bm.timestamp.slice(17,19));
          var tag_base = 'http://b.hatena.ne.jp/' + user + '/';
          var href = tag_base + bm.timestamp.slice(0,4) + bm.timestamp.slice(5,7) + bm.timestamp.slice(8,10) + '#bookmark-' + json.eid;
          var image = 'http://www.hatena.ne.jp/users/' + user.substring(0, 2) + '/' + user + '/profile_s.gif';
          var tags = bm.tags;
          var comment = bm.comment.replace(/^\s+|\s+$/g, "");
          comments.push(new Comment(user, image, href, tags, comment, date, tag_base, "hatena"));
        }
        comment_area.addComments('hatena', comments);
        comment_area.init('hatena');
      }else{
        comment_area.addCount(0, hb_favicon, hb_page);
      }
    }
    var json = document.createElement('script');
    json.src = hb_jsonp + "?url=" + encodeURIComponent(uri.replace(/%23/g, '#')) + "&callback=hbCallback";
    json.type = 'text/javascript';
    json.charset = 'utf-8';
    comment_area.div.appendChild(json);
  }

  // --------------------------------------------------------------
  // hatena (rss)
  // --------------------------------------------------------------
  var hatena_rss = "http://b.hatena.ne.jp/entry/rss/";
  function hbLoadRSS(){
    GM_xmlhttpRequest({
      method:"GET",
      url: hatena_rss + uri,
      onload:function(response) {
        var r;
        var comments = [];
        if (r=response.responseText.match(/<item rdf:about(\s|.)+?<\/item>/mg)){
          var r1;
          comment_area.addCount(r.length, hb_favicon, hb_page);
          var len = (r.length < MAX_GET_COUNT) ? r.length: MAX_GET_COUNT;
          for (i=0; i<len; i++) {
            r[i].match(/<title>([^<]+)<\/title>/);
            var user = RegExp.$1;
            r[i].match(/<link>([^<]+)<\/link>/);
            var href = RegExp.$1;
            var comment = '';
            if(r[i].match(/<description>([^<]*[^\s<]+[^<]*)<\/description>/))
            comment = RegExp.$1;
            r[i].match(/<dc:date>([^<]+)<\/dc:date>/);
            var date = RegExp.$1;
            date = new Date(date.slice(0,4), Number(date.slice(5,7))-1,
                    date.slice(8,10), date.slice(11,13),
                    date.slice(14,16), date.slice(17,19) );
            var tags = [];
            if(r1 = r[i].match(/<dc:subject>([^<]+)<\/dc:subject>/mg)) {
              for(var j=0; j<r1.length; j++) {
                r1[j].match(/<dc:subject>([^<]+)<\/dc:subject>/);
                tags.push(RegExp.$1);
              }
            }
            var tag_base = 'http://b.hatena.ne.jp/' + user + '/';
            var image = 'http://www.hatena.ne.jp/users/' + user.slice(0, 2) + '/' + user + '/profile_s.gif';
            comments.push(new Comment(user, image, href, tags, comment, date, tag_base, "hatena"));
          }
          comment_area.addComments('hatena', comments);
          comment_area.init('hatena');
        }else{
          comment_area.addCount(0, hb_favicon, hb_page);
        }
      }
    });
  }
  function hbLoad(){
    if(hatena_use_jsonp){
      hbLoadJSONP();
    }else{
      hbLoadRSS();
    }
  }

  // --------------------------------------------------------------
  // del.icio.us (rss)
  // --------------------------------------------------------------
  var delicious_rss = "http://del.icio.us/rss/url/";
  var delicious_url = "http://del.icio.us/";
  var delicious_favicon = "http://del.icio.us/favicon.ico";
  var delicious_page = "http://del.icio.us/url/" + MD5_hexhash(uri.replace(/%23/g, '#'));
  function dlLoadRSS() {
    GM_xmlhttpRequest({
      method: "GET",
      url: delicious_rss + MD5_hexhash(uri.replace(/%23/g, '#')),
      onload: function(response) {
        var r;
        var comments = [];
        var tags = [];
        if (r=response.responseText.match(/<item rdf:about(\s|.)+?<\/item>/mg)) {
          comment_area.addCount(r.length, delicious_favicon, delicious_page);
          var len = (r.length < MAX_GET_COUNT) ? r.length : MAX_GET_COUNT;
          for (var i=0; i<len; i++){
            r[i].match(/<item rdf:about=".*">\s*<title>[^<]+<\/title>\s*<link>[^<]+<\/link>\s*(?:<description>([^<]*)<\/description>\s*)?<dc:creator>([^<]+)<\/dc:creator>\s*<dc:date>([^<]*)<\/dc:date>(?:\s*<dc:subject>([^<]*)<\/dc:subject>)?/);
            var user = RegExp.$2;
            if(RegExp.$4){
              tags = RegExp.$4.split(" ");
            }
            var date = RegExp.$3;
            var comment = RegExp.$1;
            if(comment.match(/&lt;p class="description">([^<]+)&lt;\/p>/)){
              comment = RegExp.$1.replace(/^\s+|\s+$/g, "");
            }
            var date = new Date(date.slice(0,4), Number(date.slice(5,7))-1, date.slice(8,10), Number(date.slice(11,13))+9, date.slice(14,16), date.slice(17,19) );
            comments.push(new Comment(user, delicious_favicon, delicious_url+user, tags, comment, date ,"http://del.icio.us/" + user + "/", "delicious"));
          }
          comment_area.addComments('del.icio.us', comments);
          comment_area.init('del.icio.us');
        }else if(response.responseText.match(/<title>Yahoo! - 503 Service Temporarily Unavailable<\/title>/)){
          comment_area.addCount("503error", delicious_favicon, delicious_page);
        }else{
          comment_area.addCount(0, delicious_favicon, delicious_page);
        }
      }
    });
  }

  // --------------------------------------------------------------
  // del.icio.us (html)
  // --------------------------------------------------------------
  var delicious_html = "http://del.icio.us/url/";
  function dlLoadHTML(){
    GM_xmlhttpRequest({
      method: "GET",
      url: delicious_html + MD5_hexhash(uri.replace(/%23/g, '#')),
      onload: function(response) {
        var num = 0;
        var r1,r2,r3;
        var comment_hash = [];
        var comments = [];
        if(r1 = response.responseText.match(/<ul class="notelist">(\s|.)+?<\/ul>/mg)) {
          for(var h=0; h<r1.length; h++){
            if(r2 = r1[h].match(/<li>(\s|.)+?<\/li>/mg)) {
              for(var i=0; i<r2.length; i++){
                r2[i].match(/<p>([^<]+)<\/p>/);
                var c = RegExp.$1;
                r2[i].match(/<a href=".*">([^<]+)<\/a>/);
                var u = RegExp.$1;
                comment_hash[u] = c;
              }
            }
          }
        }
        var r4,r5,r6,r7;
        if(r4 = response.responseText.match(/<ul class="historylist">(\s|.)+?<\/ul>/mg)){
          for(var h=0; h<r4.length; h++) {
            if(r5 = r4[h].match(/<p>.+<\/p>/mg)) {
              var len = (r5.length < MAX_GET_COUNT) ? r5.length: MAX_GET_COUNT;
              for(var i=0; i<len; i++) {
                if(r6 = r5[i].match(/<a.+?<\/a>/mg)) {
                  var user;
                  var tags = [];
                  for(var j=0; j<r6.length; j++) {
                    r6[j].match(/<a.+?>(.+?)<\/a>/);
                    if(j==0){
                      user = RegExp.$1;
                    }else{
                      tags.push(RegExp.$1);
                    }
                  }
                  var comment = "";
                  if(comment_hash[user]){
                    comment = comment_hash[user];
                  }
                  comments.push(new Comment(user, delicious_favicon, delicious_url+user, tags, comment, new Date(0,0,0,0,0,0) ,"http://del.icio.us/" + user + "/", "delicious"));
                  num++;
                }
              }
            }
          }
        }
        comment_area.addCount(num, delicious_favicon, delicious_page);
        comment_area.addComments('del.icio.us', comments);
        comment_area.init('del.icio.us');
      }
    });
  }
  function dlLoad(){
    if(firefox){
      dlLoadRSS();
    }else{
      dlLoadHTML();
    }
  }
  // --------------------------------------------------------------
  // Livedoor Clip(html)
  // --------------------------------------------------------------
	var livedoor_url = "http://clip.livedoor.com/page/";
	var livedoor = "http://clip.livedoor.com/clips/";
	var livedoor_favicon = "http://clip.livedoor.com/favicon.ico";
	var livedoor_page = livedoor_url + uri;
	function ldLoad() {
		GM_xmlhttpRequest({
		  method: "GET",
		  url: livedoor_url + uri ,
		  onload: function(xhr) {
			  parse(xhr.responseText);
		  }
		});

		function parse(s){
			var doc = document.createElement("div");
			doc.innerHTML = s;
			var comments = [];
			var commentsDIV = elementById(doc, "div", "clip-user-comment");
			if(!commentsDIV){
				noComment();
				return;
			}
			var bookmarkULs = elementsByClassName(commentsDIV, "ul", "user-comments-box");
			if(!bookmarkULs.length){
				noComment();
				return;
			}
			var commentDIVs = elementsByClassName(commentsDIV, "div", "user-comment-container");
			bookmarkULs.forEach(function(bookmarkUL){
				var userLI = elementByClassName(bookmarkUL, "li", "user-name");
				if(!userLI) return;
				var userA = element(userLI, "a");
				var userName = userA.textContent;
				var userURL = userA.href;
				var dateLI = elementByClassName(bookmarkUL, "li", "user-post-date");
				var dateS = dateLI.textContent;
				var date = new Date(dateS.slice(0,4), Number(dateS.slice(5,7))-1, dateS.slice(8,10), 0, 0 ,0);
				new Date(dateLI.textContent);
				var tags = [];
				var tagLI = elementByClassName(bookmarkUL, "li", "user-tag-box");
				if(tagLI){
					var tagSPAN = elementByClassName(tagLI, "span", "tkcliptags");
					if(tagSPAN){
						elements(tagSPAN, "a").forEach(function(a){
							tags.push(a.textContent);
						});
					}
				}
				var comment = "";
				if(!bookmarkUL.className.match(/no-comment/)){
					var commentDIV = commentDIVs.shift();
					comment = commentDIV.textContent;
				}
				comments.push(new Comment(userName, "http://clip.livedoor.com/favicon.ico", livedoor + userName, tags, comment, date, livedoor + userName + "/tag/", "livedoor"));
			});
			if(!comments.length){
				noComment();
				return;
			}
			comment_area.addCount(comments.length, livedoor_favicon, livedoor_page);
			comment_area.addComments('livedoor', comments);
			comment_area.init('livedoor');

			function noComment(){
				comment_area.addCount(0, livedoor_favicon, livedoor_page);
			}
			function element(element, tagName){
				var result = elements(element, tagName);
				return result.length ? result[0] : null;
			}
			function elements(element, tagName){
				return elementsByAttr(element, tagName);
			}
			function elementByClassName(element, tagName, className){
				var result = elementsByClassName(element, tagName, className);
				return result.length ? result[0] : null;
			}
			function elementsByClassName(element, tagName, className){
				return elementsByAttr(element, tagName, "className", className);
			}
			function elementById(element, tagName, id){
				var result = elementsById(element, tagName, id);
				return result.length ? result[0] : null;
			}
			function elementsById(element, tagName, id){
				return elementsByAttr(element, tagName, "id", id);
			}
			function elementsByAttr(element, tagName, attrName, attrValue){
				var result = [];
				var reg = null;
				if(attrName){
					reg = new RegExp(attrValue, "i");
				}
				Array.prototype.forEach.call(element.getElementsByTagName(tagName),
											 function(tag){
												 if(!reg || reg && tag[attrName].match(reg)){
													 result.push(tag);
												 }
											 });
				return result;
			}
		}
	}
  // --------------------------------------------------------------
  // buzzurl (html)
  // --------------------------------------------------------------
  var buzzurl_rss  = 'http://buzzurl.jp/entry/comment/rss/';
  var buzzurl = 'http://buzzurl.jp/user/';
  var buzzurl_favicon = "http://buzzurl.jp/favicon.ico";
  var buzzurl_page = "http://buzzurl.jp/entry/" + uri;
  var buzzurl_html  = 'http://buzzurl.jp/entry/';
  function bzLoadHTML() {
    GM_xmlhttpRequest({
      method: "GET",
      url: buzzurl_html + uri,
      onload: function(response) {
        var r1,r2,r3;
        var comments = [];
        if (r1 = response.responseText.match(/<div class="bzl_comment">(\s|.)+?<div class="hatena_comment">/)) {
          if(r2 = r1[0].match(/<li class="lv_1">(\s|.)+?<\/li>/g)) {
            comment_area.addCount(r2.length, buzzurl_favicon, buzzurl_page);
            var len = (r2.length < MAX_GET_COUNT) ? r2.length: MAX_GET_COUNT;
            for(var i=0; i<len; i++) {
              r2[i].match(/\/all\">([^<]*?)<\/a>/);
              var user = RegExp.$1;
              var image = 'http://buzzurl.jp/user/' + user + '/photo';
              var tag_base = buzzurl + user + '/keyword/';
              var tags = [];
              var comment = "";
              r2[i].match(/<p class="name"><a href="\/user\/(.+?)">/);
              var href = buzzurl + RegExp.$1;
              if(r3 = r2[i].match(/<a class="keyword" href=[^>]*>([^<]*?)<\/a>/g)) {
                for(var j=0; j<r3.length; j++) {
                  r3[j].match(/<a class="keyword" href=[^>]*>([^<]*?)<\/a>/);
                  tags.push(RegExp.$1);
                }
              }
              r2[i].match(/(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)/);
              var date = new Date(RegExp.$1, Number(RegExp.$2)-1, RegExp.$3,
                        RegExp.$4, RegExp.$5, RegExp.$6);
              if(r2[i].match(/<p class="txt bm_comment">((\s|.)*?)<p class="name">/)) {
                comment = RegExp.$1.replace(/<\/?p>/g, "").replace(/^\s+|\s+$/g, "");
              }
              comments.push(new Comment(user, image, href, tags, comment, date, tag_base, "buzzurl"));
            }
            comment_area.addComments('buzzurl', comments);
            comment_area.init('buzzurl');
          }
        }else{
          comment_area.addCount(0, buzzurl_favicon, buzzurl_page);
        }
      }
    });
  }
  // --------------------------------------------------------------
  // buzzurl (jsonp)
  // --------------------------------------------------------------
  var bz_jsonp = "http://api.buzzurl.jp/api/posts/get/v1/json/";
  function bzLoadJsonp() {
    w.bzCallback = function(json) {
      var comments = [];
      if(json && json[0] && json[0].user_num){
        comment_area.addCount(json[0].user_num, buzzurl_favicon, buzzurl_page);
        var count = (json[0].posts.length < MAX_GET_COUNT) ? json[0].posts.length : MAX_GET_COUNT;
        for(var i =0; i<count; i++) {
          var bm = json[0].posts[i];
          var user = bm.user_name;
          var href = buzzurl + user;
          var image = href + '/photo';
          var tags = bm.keywords ? bm.keywords.split(",") : [];
          var comment = bm.comment ? bm.comment: "";
          var date = new Date(bm.date.slice(0,4), Number(bm.date.slice(5,7))-1,
                    bm.date.slice(8,10), bm.date.slice(11,13),
                    bm.date.slice(14,16), bm.date.slice(17,19));
          var tag_base = buzzurl + user + '/keyword/';
          if(user){
            comments.push(new Comment(user, image, href, tags, comment, date, tag_base, "buzzurl"));
          }
        }
        comment_area.addComments('buzzurl', comments);
        comment_area.init('buzzurl');
      }else{
        comment_area.addCount(0, buzzurl_favicon, buzzurl_page);
      }
    }
    var json = document.createElement('script');
    json.src = bz_jsonp + "?url=" + encodeURIComponent(uri.replace(/%23/g, '#')) + "&cb=bzCallback";
    json.type = 'text/javascript';
    json.charset = 'utf-8';
    comment_area.div.appendChild(json);
  }

  function bzLoad(){
    if(buzzurl_use_jsonp){
      bzLoadJsonp();
    }else{
      bzLoadHTML();
    }
  }

  // --------------------------------------------------------------
  // Pookmark (html)
  // --------------------------------------------------------------
  var pookmark_base  = 'http://pookmark.jp/';
  var pookmark_html  = pookmark_base + 'url';
  var pookmark_favicon = pookmark_base + 'favicon.ico';
  var pookmark_page = pookmark_html + '/'+ MD5_hexhash(uri.replace(/%23/g, '#'));
  function pmLoadHTML(){
    GM_xmlhttpRequest({
      method: "GET",
      url: pookmark_page,
      onload: function(response){
        var r1,r2,r3;
        var comments=[];
        if(r1 = response.responseText.match(/<div class="subsection" id="passenger-list">(\s|.)+?<\/div>/)){
          r2 = r1[0].match(/<li class="pt pt_s">(\s|.)+?<\/li>/mg);
          comment_area.addCount(r2.length, pookmark_favicon, pookmark_page);
          var len = (r2.length < MAX_GET_COUNT) ? r2.length: MAX_GET_COUNT;
          for(var i=0; i<len; i++){
            r2[i].match(/<span class="datetime">(\d\d\d\d)\/(\d\d)\/(\d\d)<\/span>/);
            var date = new Date(RegExp.$1, Number(RegExp.$2)-1, RegExp.$3,0,0,0);
            var comment ='';
            if(r2[i].match(/<span>(.+?)<\/span>/)){
              comment = RegExp.$1;
            }
            r2[i].match(/<a href="\/user\/(.+?)">/);
            var user = RegExp.$1;
            var image = "http://image.jugemkey.jp/user/" + user + "/16";
            var href = pookmark_base + "user/" + user + "/";
            var tags = [];
            if(r3 = r2[i].match(/<a href="\/user\/.+?" class="tag">.+?<\/a>/mg)){
              for(var j=0; j<r3.length; j++){
                r3[j].match(/<a href="\/user\/.+?" class="tag">(.+?)<\/a>/);
                tags.push(RegExp.$1);
              }
            }
            comments.push(new Comment(user, image, href, tags, comment, date, href, "pookmark"));
          }
          comment_area.addComments('pookmark', comments);
          comment_area.init('pookmark');
        }else{
          comment_area.addCount(0, pookmark_favicon, pookmark_page);
        }
      }
    });
  }
  function pmLoad(){
    pmLoadHTML();
  }

  function loadSBM() {
    if(is_load == false){
      //dlLoad();
      //ldLoad();
      hbLoad();
      //pmLoad();
      //bzLoad();
      is_load = true;
    }
  }
  var skipEl = {'input': true, 'button': true, 'select': true, 'textarea': true, 'password': true};
  window.addEventListener('keypress', function(e) {
    if (skipEl[e.target.tagName.toLowerCase()]) {return;}
    var key = ''
      + ((e.ctrlKey)  ? 'C' : '')
      + ((e.shiftKey) ? 'S' : '')
        + ((e.altKey || e.metaKey)   ? 'A' : '')
        + '-';
    if(firefox){
      key += String.fromCharCode(e.charCode).toLowerCase();
    }else{
      key += String.fromCharCode(e.keyCode).toLowerCase();
    }
    if (key == BIND_KEY){
      comment_area.toggle();
    } else if (key == 'CA-b') {
      comment_area.hide();
      SBMCommentsViewer();
    // コメントありのみ表示の切替
    } else if (key == '-c') {
      if(!comment_area.div || comment_area.div.style.display == 'none'){
        return;
      } else if (option.show_nocomment) {
        option.setShowNoComment(false);
      } else {
        option.setShowNoComment(true);
      }
    }
  }, false);

  if(option.auto_start){
    comment_area.show();
    if(option.auto_start_open == false){
      comment_area.hide();
    }
  }
}

if(document.body) SBMCommentsViewer();
