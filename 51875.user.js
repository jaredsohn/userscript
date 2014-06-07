// ==UserScript==
// @name        Wakaba post preview
// @namespace   wakaba-post-preview-namespace
// @version 	1.3.22
// @description Wakaba post preview generator.
// @license 	WTFPLv2
// @encoding    utf-8
// @include     http://iichan.hk/*
// @include     http://*.iichan.hk/*
// @include     http://iichan.ru/*
// @include     http://*.iichan.ru/*
// @include     http://iichan.net/*
// @include     http://*.iichan.net/*
// @include     http://desuchan.net/*
// @include     http://*.desuchan.net/*
// @include     https://desuchan.net/*
// @include     https://*.desuchan.net/*
// @include     http://*.420chan.org/*
// @include     http://420chan.org/*
// @include     http://*.not420chan.org/*
// @include     http://wakachan.org/*
// @include     http://*.wakachan.org/*
// @include     http://1chan.net/*
// @include     http://*.1chan.net/*
// @include     http://raki-suta.com/*
// @include     http://*.raki-suta.com/*
// @include     http://voile.gensokyo.org/*
// @include	http://nowere.net/*
// @include	http://*.nowere.net/*
// ==/UserScript==


/* globals */
var previewslot=null;
var config=new Array();
//values

config['recursive_post_preview']=true;
// set to false to disable recursive postspreview-in-postpreview

config['display_link_to_previewing_post']=true;
// set to false to disable addition postlink to top of preview and stop 
// covering original link

config['abort_http_connections']=false;
// *do not touch if you not sure *
// true is a bit faster, but may result in partial downloaded pages, 
// so you need manualy reload thread, loading of which was aborted.

config['limit_preview_by_board']=false;
// set to true to disable preview from other /b/o/a/r/d/s/

config['limit_op_post_preview_by_thread']=false;
// set to true to preview op-post link only inside thread

config['limit_preview_by_replies']=false;
// set to true to preview only >>number links

config['no_post_content_error_msg']='Error 000';
// set to any string you like. valid html alowed.

config['limit_preview_size']=0;
// set to maximum height of preview you like (in pixels). 0 or false to disable.

/* end of globals */

function print_r(arr,type) {
  var result='';
  var msg_type=alert;
  if (!arr)
    return;
  switch (type) {
    case 0:
      msg_type=alert;
      break;
    case 1:
      msg_type=opera.postError;
      break;
    case 2:
      msg_type=console.info;
      break;
    default:
      if (typeof(opera)!='undefined') {
        msg_type=opera.postError;
      } else if (typeof(console)!='undefined') {
        msg_type=console.info;
      } else {
        msg_type=alert;
      }
      break;
  }
  result+=arr+'\n';
  for (var prop in arr) {
    result+=prop+': '+arr[prop]+"\n";
  }
  msg_type(result);
}

function setCookie(c_name,value,expiredays) {
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie=c_name+'='+escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
function getCookie(c_name) {
  if (document.cookie.length>0) {
    c_start=document.cookie.indexOf(c_name+'=');
    if (c_start!=-1) {
      c_start=c_start + c_name.length+1;
      c_end=document.cookie.indexOf(";",c_start);
      if (c_end==-1)
        c_end=document.cookie.length;
      return unescape(document.cookie.substring(c_start,c_end));
    }
  }
  return null
}

function  node_req_walk(arr,fn,req) {
  if (!arr)
    return;
  if (!req)
    fn(arr);
  for (var i=0;i<arr.length;i++) {
    fn(arr[i]);
    if (arr[i].hasChildNodes)
      node_req_walk(arr[i].childNodes,fn,true);
  }
  if (arr.hasChildNodes)
    node_req_walk(arr.childNodes,fn,true);
}

function ajax_query() {
  var handle,complete=false;
  var delay=500;
  var last_call=0;
  var delayed=null;
  var aborted=false;
  var lastreqid=null;
  handle=new XMLHttpRequest();
  if (!handle)
    return;
  this.abort=function() {
    clearTimeout(delayed);
    lastreqid=null;
    aborted=true;
    handle.abort();
    return true;
  }
  this.connect=function(method,url,fn) {
    if (url==lastreqid)
      return false;
    var curtime=new Date().getTime();
    var waittime=((curtime-last_call)<delay) ? (delay-(curtime-last_call)) : 0;
    clearTimeout(delayed);
    lastreqid=url;
    delayed=setTimeout(function(){make_connection(method,url,fn);},waittime);
  };
  function make_connection(method,url,fn) {
    if (!handle)
      return;
    last_call=new Date().getTime();
    aborted=false;
    complete=false;
    try {
      if (config['abort_http_connections']==true)
        handle.abort();
      handle.open(method,url,false);
      handle.onload=function() {
        if (handle.readyState==4&&!complete) {
          complete=true;
          lastreqid=null;
          fn(handle,complete,aborted);
        }
      }
      handle.send(null);
    }
    catch(z) { return false; };
    return true;
  }
  return this;
}

function int_counter() {
  var data=0;
  this.inc=function() {
    data+=1;
    return data;
  }
  this.dec=function() {
    if (data<=0)
      return false;
    data-=1;
    return data;
  }
  this.get=function() {
    return data;
  }
  this.flush=function() { 
    data=0;
    return true;
  }
  return this;
}

function getPos(obj) {
  var left=0;
  var top=0;
  if (obj.offsetParent) {
    do {
      left+=obj.offsetLeft;
      top+=obj.offsetTop;
    } while (obj=obj.offsetParent)
  }
  return Array(left,top);
}

/* -------------- init -------------- */
window.addEventListener("load",init,false);
var http=new ajax_query();
var counter=new int_counter();
function init(e) {
  checkConfigValues();
//  if (RegExp('#post_preview_config$').test(document.URL))
//    configEnable();
  config['system']=new Array();
  config['system']['engine_type']=getBoardEngineType(document);
  setPreviewListener(document);
}

function checkConfigValues() {
  var boolvars=new Array(
config['recursive_post_preview'],"config['recursive_post_preview']",
config['display_link_to_previewing_post'],"config['display_link_to_previewing_post']",
config['abort_http_connections'],"config['abort_http_connections']",
config['limit_preview_by_board'],"config['limit_preview_by_board']",
config['limit_op_post_preview_by_thread'],"config['limit_op_post_preview_by_thread']",
config['limit_preview_by_replies'],"config['limit_preview_by_replies']"
                        );
  for (var v=0;v<boolvars.length;v+=2) {
    if(typeof(boolvars[v])!='boolean') {
      if(typeof(boolvars[v])=='string') {
        alert(boolvars[v+1]+' value must not be enquoted with \'\' or ""');
      } else {
        alert(boolvars[v+1]+' value must be true or false (without quotations)');
      }
    }
  }
  var stringvars=new Array(
config['no_post_content_error_msg'],"config['no_post_content_error_msg']"
                          );
  for (var v=0;v<stringvars.length;v+=2) {
    if(typeof(stringvars[v])!='string') {
      alert(stringvars[v+1]+' value must be string enquoted with \'\' or ""');
    }
  }
  if (config['limit_preview_size']) {
    if (typeof(config['limit_preview_size']) != 'number') {
      alert("config['limit_preview_size'] value must be a number not lesser then 0");
    } else if (config['limit_preview_size']<0) {
      alert("config['limit_preview_size'] value must be not lesser then 0");
    }
  }
}


function getBoardEngineType(obj) {
  var scripts=obj.getElementsByTagName('script');
  var type=null;
  for (var i=0;i<scripts.length;i++) {
    if (RegExp('wakaba3\.js$').test(scripts[i].src)) {
      type='wakaba3';
      break;
    } else if (RegExp('wakaba\.js$').test(scripts[i].src)) {
      type='wakaba';
      break;
    } else if (RegExp('kusaba\.js$').test(scripts[i].src)) {
      type='kusaba';
      break;
    } else {
      type='wakaba3';
    }
  }
  if (RegExp('^http://(|[^/]*\.)dobrochan.ru').test(document.URL)) {
    type='hanabira';
  }
  return type;
}


function setPreviewListener(obj) {
  var links=obj.getElementsByTagName('a');
  var regexp=null;
  switch (config['system']['engine_type']) {
    case 'wakaba':
    case 'wakaba3':
    case 'hanabira':
      regexp='(res/[0-9]*\.[xs]{0,1}html|)(|#[i]{0,1}[0-9]*)$';
      break;
  }
  for (var i=0;i<links.length;i++) {
    if (RegExp(regexp).test(links[i].href)) {
      links[i].addEventListener('mouseover',initPostPreview,false);
    }
  }
}

function initPostPreview(e) {
  var post=new Array();
  var regexp=new Array();
  if (this.event) {
    post['link']=this.event.currentTarget;
  } else {
    post['link']=this;
  }
  post['href']=post['link'].href;
  post['text']=post['link'].innerHTML;
  post['host']=document.domain;
  post['url']=document.URL;
  post['isnormallink']=RegExp('^&gt;&gt;[0-9]*$').test(post['text']);
  post['isregularlink']=RegExp('http://'+post['host']).test(post['href']);
  post['isabbrev']=(post['link'].parentNode) ? (post['link'].parentNode.className=='abbrev') : false;
  post['iserr']=RegExp('http://'+post['host']+'/cgi-bin/').test(post['url']);
  post['isindomain']=RegExp('^http://(|[^/]*[.])'+post['host']).test(post['text']);
  switch (config['system']['engine_type']) {
    case 'wakaba':
    case 'wakaba3':
    case 'hanabira':
      regexp['href']='(^|'+post['host']+')/((.*)/|)(([0-9]*)\.[xs]{0,1}html|)(|[?#i]{0,3}([0-9]*))$';
      regexp['url']='http://'+post['host']+'/((.*)/res/[0-9]*\.[xs]{0,1}html[?i#]{0,3}[0-9]*|(.*)[/]+[^/]*|[^/]*|)$';
      break;
  }
  var args=RegExp(regexp['href']).exec(post['href']);
  if(!args)
    return false;
  post['board']=args[3];
  post['thread']=args[5];
  if(args[7]) {
    post['num']=args[7];
  } else if (args[5]) {
    post['num']=args[5];
  } else {
    return false;
  }
  if (!RegExp('/res$').test(args[3]))
    post['isexpand']=true;
  var args=RegExp(regexp['url']).exec(post['url']);
  if (args[3]) {
    post['this_board']=args[3];
  } else if (args[2]) {
    post['this_board']=args[2];
  }
  post['isthread']=(post['num']==post['thread']);
  switch (config['system']['engine_type']) {
    case 'wakaba':
    case 'wakaba3':
      post['isparentthread']=(post['link'].parentNode.id=='thread-'+post['thread']);
      break;
    case 'hanabira':
      post['isparentthread']=(post['link'].parentNode.parentNode.parentNode.id=='thread_'+post['thread']);
      break;
  }
  if (!post['isnormallink'] && !post['isabbrev'] && !post['iserr'] && !( !post['isthread'] && post['isnormallink'] ) && ! post['isindomain'])
    return false;
  if (config['limit_preview_by_board']==true)
    if (post['this_board']!=post['board'])
      return false;
  if (config['limit_op_post_preview_by_thread']==true)
    if (post['isthread']==false)
      if (post['thread']==post['num'])
        return false;
  if (config['limit_preview_by_replies']==true)
    if (!post['isnormallink'])
      return false;
  if (config['abort_http_connections']==true)
    http.abort();
  post['link'].addEventListener('mouseout',clearPreviewSlot,false);
  previewslot=setTimeout(function(){rollPostPreview(post);},100);
}

function clearPreviewSlot() {
  clearTimeout(previewslot);
}

function rollPostPreview(post) {
  clearTimeout(previewslot);
  var preview=new Array();
  var parentelem;
  preview['leftpos'] = getPos(post['link'])[0];
  preview['toppos'] = getPos(post['link'])[1];
  if (document.getElementById('preview_div'+counter.get())!=null) {
    var prevelem=document.getElementById('preview_div'+(counter.get()));
    var elements=prevelem.getElementsByTagName('a');
    var elem=false;
    for (var i=0;i<elements.length;i++) {
      if (elements[i]==post['link']) {
        elem=true;
        break;
      }
    }
    if (elem) {
      parentelem=document.getElementById('preview_div'+counter.get());
      preview['toppos']=post['link'].offsetTop+post['link'].offsetParent.offsetTop+post['link'].offsetParent.offsetParent.offsetTop;
      counter.inc();
    } else {
      purgePostPreview();
      parentelem=document.body;
    }
      if (document.getElementById('preview_div'+counter.get())!=null)
      delPostPreview('preview_div'+counter.get());
  } else {
    parentelem=document.body;
    purgePostPreview();
  }
  preview['url']=RegExp('^http://[^/]*((.*)[#?]|(.*))').exec(post['href']);
  preview['url']=(preview['url'][2]) ? preview['url'][2] : preview['url'][1];
  preview['url']='http://'+post['host']+preview['url'];
  preview['container']=parentelem.appendChild(document.createElement('div'));
  preview['container'].style.zIndex=9000+counter.get();
  preview['container'].style.position='absolute';
  preview['container'].style.padding='10px';
  preview['container'].style.left=(preview['leftpos']+post['link'].offsetWidth*1.5) + 'px';
  preview['container'].style.top=preview['toppos']+'px';
  preview['container'].style.border='2px dashed';
  preview['container'].style.background=window.getComputedStyle(document.body,null).getPropertyValue('background-color');
  preview['container'].id='preview_div'+counter.get();
  if ((!post['isabbrev'] && !post['isthread'])||post['url']==preview['url']&&!post['isabbrev']||post['isexpand'])
    preview['content']=getStaticContent(document,post);
  if (preview['content']) {
    var divs=preview['content'].getElementsByTagName('div');
    for (var i=0;i<divs.length;i++) {
      if (divs[i].className=='abbrev') {
        preview['content']=null;
        break;
      }
    }
  }
  if (preview['content']) {
    post['status']=200;
    bakePostPreview(post,preview);
    return true;
  } else {
    if (post['isexpand']) {
      post['isthread']=true;
      preview['url']=post['href'].replace(/[^/]*$/,'res/'+post['num']+'.html');
    }
    preview['content']=getAjaxContent(post,preview);
    return true;
  }
}


function getStaticContent(obj,post) {
  post['content']=null;
  if (post['isthread']) {
    switch (config['system']['engine_type']) {
      case 'wakaba':
      case 'wakaba3':
        post['content']=obj.getElementById('delform');
        if (post['content']) {
          post['content']=post['content'].cloneNode(true);
          var nextelem=post['content'].getElementsByTagName('blockquote')[0].nextElementSibling;
          if (nextelem)
            if (nextelem.className=='omittedposts')
              nextelem.parentNode.removeChild(nextelem);
          post['content'].removeChild(post['content'].getElementsByTagName('hr')[0]);
        }
        break;
      case 'hanabira':
        post['content']=obj.getElementById('post_'+post['num']);
        if (post['content']) {
          post['content']=post['content'].cloneNode(true);
        }
        break;
    }
    if (post['content']) {
      var posts=post['content'].getElementsByTagName('table');
      while (posts.length)
        for(var n=0;n<posts.length;n++)
          posts[n].parentNode.removeChild(posts[n])
    }
  } else {
    switch (config['system']['engine_type']) {
      case 'wakaba':
      case 'wakaba3':
        post['content']=obj.getElementById('reply'+post['num']);
        if (post['content'])
          post['content']=post['content'].parentNode.parentNode.parentNode.cloneNode(true);
        break;
      case 'hanabira':
        post['content']=obj.getElementById('reply'+post['num']);
        if (post['content'])
          post['content']=post['content'].parentNode.parentNode.parentNode.cloneNode(true);
        break;
    }
    if (post['content']) {
      post['content'].getElementsByTagName('td')[0].parentNode.removeChild(post['content'].getElementsByTagName('td')[0]);
      post['content'].getElementsByTagName('td')[0].className="reply";
    }
  }
  if (post['content'])
    post['content'].getElementsByTagName('a')[0].parentNode.removeChild(post['content'].getElementsByTagName('a')[0]);
  return post['content'];
}

function getAjaxContent(post,preview) {
  http.connect('GET',preview['url'],
    function(handle,complete,aborted) {
      if (aborted==true)
        return delPostPreview(true);
      var posts;
      switch (handle.status) {
        case 200:
          post['status']='200';
          var ajaxdoc;
          switch (config['system']['engine_type']) {
            case 'wakaba':
            case 'wakaba3':
            case 'hanabira':
              ajaxdoc=document.body.childNodes[0].parentNode.insertBefore(document.createElement('div'),document.body.childNodes[0]);
              ajaxdoc.id='parsecont';
              ajaxdoc.style.width='0px';
              ajaxdoc.style.position='absolute';
              ajaxdoc.style.zIndex='-100';
              ajaxdoc.innerHTML=handle.responseText;
              preview['content']=getStaticContent(document,post);
              ajaxdoc.parentNode.removeChild(ajaxdoc);
              break;
          }
          if (preview['content'])
            break;
        default:
          post['status']='000';
          if (handle.status!=200&&!post['isexpand'])
            post['status']=handle.status;
          preview['content']=document.createElement('div');
          if (post['status']=='000') {
            preview['content'].innerHTML=config['no_post_content_error_msg'];
          } else {
            preview['content'].innerHTML='Error '+post['status'];
          }
          break;          
      }
      bakePostPreview(post,preview);
    }
  );
}

function bakePostPreview(post,preview) {
  if (!preview['content']) {
    delPostPreview();
    if (config['abort_http_connections']==true)
      http.abort();
    rollPostPreview(post);
    return false;
  }
  if (config['display_link_to_previewing_post']) {
    var postlink=document.createElement('a');
    postlink.href=post['href'];
    postlink.onclick='highlight('+post['num']+')';
    postlink.innerHTML='<div>&gt;&gt;'+post['num']+'</div>';
    preview['container'].appendChild(postlink);
  } else {
    preview['container'].style.top=preview['toppos']+post['link'].offsetHeight-2+'px';
    post['link'].addEventListener('mouseout',hoverPostPreview,false);
  }
  var links=preview['content'].getElementsByTagName('a');
  for(var i=0;i<links.length;i++)
    if (RegExp('(^/'+post['board']+'/|^/)').test(links[i].href)) 
      links[i].href='http://'+post['host']+links[i].href;
  if(config['recursive_post_preview'])
    setPreviewListener(preview['content']);
  preview['container'].appendChild(preview['content']);
  if (config['limit_preview_size']) {
    if (preview['container'].offsetHeight>config['limit_preview_size'])
      preview['container'].style.height=config['limit_preview_size']+'px';
      preview['container'].style.overflow='auto';
  }
  node_req_walk(preview['container'].childNodes,function(elem){elem.id='postpreview'+counter.get()});
  if (!post['isthread']&&preview['content'].getElementsByTagName('td')[0]) {
    preview['container'].style.background=window.getComputedStyle(preview['content'].getElementsByTagName('td')[0],null).getPropertyValue('background-color');
  }
  preview['container'].style.left=2+'%';
  preview['container'].style.right=1+'%';

  post['link'].removeEventListener('mouseout',delPostPreview,false);
  preview['container'].addEventListener('mouseout',hoverPostPreview,false);
}


function delPostPreview(donotabort) {
  if ((!donotabort||typeof(donotabort)=='object')&&config['abort_http_connections']==true)
    http.abort();
  var id='preview_div'+counter.get();
  if (id=='preview_div0')
    return purgePostPreview();
  var preview=document.getElementById(id);
  if (preview) {
    preview.parentNode.removeChild(preview);
    counter.dec();
    return true;
  }
  return false;
}

function purgePostPreview() {
  counter.flush();
  var elements=document.getElementsByTagName('div');
  for(var i=0;i<elements.length;i++)
    if (RegExp('preview_div[0-9]*$').test(elements[i].id)) 
      elements[i].parentNode.removeChild(elements[i]);
  return true;
}

function hoverPostPreview(e) {
  if (!e.relatedTarget)
    return;
  if (e.relatedTarget.id=='preview_div'+counter.get()||e.relatedTarget.id=='postpreview'+counter.get())
    return;
  if (!RegExp('^(preview_div|postpreview)[0-9]*$').test(e.relatedTarget.id))
    counter.flush();
  delPostPreview();
}