// ==UserScript==
// @name           For Iframing
// @namespace      http://mra.tzo.net
// @include        *
// @require        http://iis.mra.tzo.net/js/jquery-1.7.1.min.js
// @version 1.100
// ==/UserScript==

//________________________________________________
// utils
//________________________________________________
   //________________________________________________
   // consts
   //________________________________________________
     var Us='und'+'efined';
     var L='length';
     var This_File='CloudBrain.user.js';
     var Stuff_Root='http://iis.mra.tzo.net/webbrain-com/';
   //________________________________________________e consts
   //________________________________________________
   // utils base log
   //________________________________________________
     function url(s){
       return "url('"+s+"')";
     }
     function pad(s,n,c){
       s=''+s;
       if (typeof c==Us) {
         c='0';
       }
       while (s.length<n) {
         s=c+''+s;
       }
       return s;
       }
     function logx(t,str){
       //http://getfirebug.com/logging
       //console.debug, console.info, console.warn, and console.error.
       if (location.href.indexOf('plugins/servlet/gadgets/ifr')!=-1) {
         return;
       }
       var _t='';
       var tt={'i':'INFO','d':'DEBUG','w':'WARN','e':'ERROR'};
       if (t!='') {_t=tt[t];}
       if (_t!='') {_t=_t+':';}
       var n='';
       if (arguments.callee.caller.caller){
         n=arguments.callee.caller.caller.name;
         if (typeof arguments.callee.caller.caller!=Us&&arguments.callee.caller.caller.log==false) {
           return;
         }
       };//toString();
       var loc=location.href;
       loc=loc.substr(0,150);
       loc=loc+':';
       if (window==top) {
         loc='';
       }
       logx.ct=(typeof logx.ct==Us)?1:logx.ct+1;
       if (jQuery) {
         if (typeof logx.box==Us) {
           if (jQuery('#debuglogtext').length==0) {
             if (typeof debugbox=='function') {
               if (typeof debugbox.lines==Us){
                 debugbox.lines=new Array();
               }
               debugbox.lines[debugbox.lines.length]=pad(logx.ct,4)+':'+_t+loc+n+':'+str;
             }
           }else{
             logx.box=jQuery('#debuglogtext');
           }
         }
         if (typeof logx.box!=Us) {
           //prompt('','"'+(typeof logx.box)+'"=="'+Us+'"');
           //alert(typeof logx.box);
            var str2=pad(logx.ct,4)+':'+_t+loc+n+':'+str;
            logx.box.each(function(){
              var o=jQuery(this);
              var ht=o.val();
              ht=str2+"\n"+ht;
              o.val(ht);
            });
         }
       }
       //setTimeout(function(){throw new Error("DEBUG:"+pad(log.ct,4)+':'+loc+n+":"+str)}, 1)
       if (t=='') {
         console.log(pad(logx.ct,4)+':'+loc+n+":"+str);
       }else if (t=='i'){console.info(pad(logx.ct,4)+':'+loc+n+":"+str);
       }else if (t=='w'){console.warn(pad(logx.ct,4)+':'+loc+n+":"+str);
       }else if (t=='e'){console.error(pad(logx.ct,4)+':'+loc+n+":"+str);
       }else if (t=='d'){console.debug(pad(logx.ct,4)+':'+loc+n+":"+str);
       }
       }
     function log(s){logx('',s);}
     function logi(s){logx('i',s);}
     function logw(s){logx('w',s);}
     function loge(s){logx('e',s);}
     function logd(s){logx('d',s);}
     function log_clear(){
       if (1) {
         if (jQuery) {
           if (typeof logx.box==Us) {
             logx.box=jQuery('#debuglogtext');
           }
           logx.box.each(function(){
             var o=jQuery(this);
             o.val('');
           });
         }
       }
       };window.log_clear=log_clear;
     function log_input_focus(){
       jQuery('#debugloginput').get(0).focus();
       }
     function log_input_clear(){
       if (jQuery) {
         jQuery('#debugloginput').val('');
         log_input_focus();
       }
       }
   //________________________________________________e utils base log
//________________________________________________
// exec publish height
//________________________________________________
window.Ifh={
  ct:0,
  _brnurl1:'http://webbrain.com/brainpage/brain/',
  _brnurl:'http://webbrain.com/brainpage/brain/753525E3-E419-E2C6-0496-028F1E10BC95',
  _brn:null,
  _winname:'webbrain',
  _wname:window.name,
  _last_h:null,
  // YOUR CUSTOM DATA HERE
  hosts:{
    'conf.mra.tzo.net':{
      add:190,
      qs:'#rw_main'
    },
    'jira.mra.tzo.net':{
      add:0,
      qs:'#jira,#gh-content-inner',
      mn:{'http://jira.mra.tzo.net/secure/ManageRapidViews.jspa':1000
      }
    },
    'bam.mra.tzo.net':{
      add:60,
      qs:'body'
    }
  },
  _wname_item:function _wname_item__Ifh(bpi){
     var me=window.Ifh;
     //        id                                   pn-id
     //webbrain753525E3-E419-E2C6-0496-028F1E10BC95-1-Port1
     var bid=me._wname.substr(8,36);
     var rst=me._wname.substr(45);
     var a=rst.split('-');
     var p=a[0];
     var i=a[1];
     if (bpi=='b') {
       return bid;
     }else if (bpi=='p'){
       return p;
     }else if (bpi=='i'){
       return i;
     }
  },
  _brn_url:function _brn_url(){
    var me=window.Ifh;
    return me._brnurl1+me._wname_item('b')+'#-'+me._wname_item('p');
  },
  _ret_url:function _ret_url(h){
     var me=window.Ifh;
     return me._brn_url()+'?'+me._wname_item('i')+'='+h;
  },
  _host:function _host__Ifh(){
     var me=window.Ifh;
    return location.hostname;
  },
  _calc:function (){
     var me=window.Ifh;
     var o=me.hosts[me._host()];
     if (typeof o.mn!=Us) {
       if (typeof o.mn[location.href]!=Us) {
         return o.mn[location.href];
       }
     }
     if (typeof o==Us) {
       o={
         add:0,
         qs:'body'
       };
     }
     var hh=0;
     var a=o.qs.split(',');
     for (var x=0;x<a.length;x++) {
       var oo=$(a[x]);
       if (oo.length==1) {
         var el=oo[0];
         hh+=el.scrollHeight;
         //logi('HH:'+(a[x])+' h:'+el.scrollHeight);
       }
     }
     if (hh==0) {
       hh=2000;
     }else{
       hh=hh+o.add;
     }
     return hh;
  },
  publish:function publish__Ifh(){
    var me=window.Ifh;
    if (me._wname==''||typeof me._wname==Us) {
      return;
    }
    var hh=me._calc();
    //el=document;
    var nn=me._wname.substring(9);
    if (me._last_h!=hh||me._last_h==null) {
      logi('HHHHHHHHHHHHHHHHH:'+(hh));
      window.parent.location.href=me._ret_url(hh);
      me._last_h=hh;
    }
  },
  Start:function Start__Ifh(){
    //logi('window.name:'+window.name);
    var me=window.Ifh;
    if (me._wname.substr(0,me._winname.length)==me._winname){
      me.publish();
      var o=$('html body h1');
      if (o.length==1) {
        // Z_DOT 503 handler z.7346246500178277.2012.08.07.11.40.26|tag
        if (o.html()=='Service Temporarily Unavailable') {
          $('html body').css('color','#cccccc');
          $('html body').css('background-color','#330000');
          $('html body h1').css('color','#cc0000');
          return;
        }
      }
      //setInterval(publish_height,15000);
      me.pi=setInterval(me.publish,1500);
    }
  }
}
$(function(){
  Ifh.Start();
});
log('Ifr OK');
