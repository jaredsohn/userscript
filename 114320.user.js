// ==UserScript==
// @name           tinami_tag_collector
// @namespace      yktmt.com
// @include        http://www.tinami.com/
// @include        http://www.tinami.com/search/list?*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

var maxTags = 15;

function dec_ent(s){
   return s.replace(/&lt\;|&gt\;|&amp\;|&quot\;/g, function(m0){
      return {'&lt;':'<', '&gt;':'>', '&amp;':'&', '&quot;':'\"'}[m0] || m0;
   });
}

function rmv_item(list){
   var item = list.pop();
   if(item.l){
      list.unshift(item);
      arguments.callee(list);
   }
}

function addAnchor(taglist){
   return $.map(taglist, function (r) {
      return $('<span />').append($.map([r.tag], function (item) {
         var dectxt = item;
         if(dectxt.indexOf('&search=or') > -1){
            dectxt = dectxt.replace('&search=or','').replace('+','|');
         }
         dectxt = dec_ent(decodeURIComponent(dectxt));
         return $('<a />', {
            'class': 'fav',
            text: (dectxt.length < 15) ? dectxt : dectxt.slice(0,14)+'...',
            href: '/search/list?keyword=' + item
         })[0];
      }))[0];
   });
}

function lock_bind(event0,taglist){
   var temp = [];
   for(var i=0,l=taglist.length; i<l; i++){
      temp[i] = taglist[i].l;
   }
   $('#lock, #delete').css('display', 'none');
   $('#OK, #cancel').css('display', 'inline');
   $('.fav').css('color', function(i, value) {
      return  temp[i] ? '#FF69B4' : '#0087D0';
   });
   $('#delete').unbind();
   $('.fav').each(function(i){
      $(this).bind('click', function(event1){
         event1.preventDefault();
         temp[i] = temp[i] ? false : true;
         $(this).css('color', temp[i] ? '#FF69B4' : '#0087D0');
      });
   });
   $('#OK').bind('click', function(event1){
      for(var i=0,l=temp.length; i<l; i++){
         taglist[i].l = temp[i];
      }
      GM_setValue("FavTags", JSON.stringify(taglist));
      $('#lock, #delete').css('display', 'inline');
      $('#delete').bind('click', taglist, function(event){ delete_bind(event, taglist); });
      $('#OK, #cancel').css('display', 'none').unbind();
      $('.fav').css('color', '#0087D0').unbind();
   });
   $('#cancel').bind('click', function(event1){
      temp = [];
      $('#lock, #delete').css('display', 'inline');
      $('#delete').bind('click', taglist, function(event){ delete_bind(event, taglist); });
      $('#OK, #cancel').css('display', 'none').unbind();
      $('.fav').css('color', '#0087D0').unbind();
   });
}

function delete_bind(event0,taglist){
   var temp = [];
   for(var i=0,l=taglist.length; i<l; i++){
      temp[i] = false;
   }
   $('#lock, #delete').css('display', 'none');
   $('#OK, #cancel').css('display', 'inline');
   $('#lock').unbind();
   $('.fav').each(function(i){
      $(this).bind('click', function(event1){
         event1.preventDefault();
         temp[i] = temp[i] ? false : true;
         $(this).css('color', temp[i] ? '#7FC3E7' : '#0087D0');
      });
   });
   $('#OK').bind('click', function(event1){
      for(var i=0,l=temp.length; i<l; i++){
         var item = taglist.shift();
         if(!temp[i]){
            taglist.push(item);
         }
      }
      GM_setValue("FavTags", JSON.stringify(taglist));
      $('#lock, #delete').css('display', 'inline');
      $('#lock').bind('click', taglist, function(event){ lock_bind(event, taglist); });
      $('#OK, #cancel').css('display', 'none').unbind();
      $('.fav').remove();
      $('#hotkeyword div:first hr:first').after(addAnchor(taglist));
   });
   $('#cancel').bind('click', function(event1){
      temp = [];
      $('#lock, #delete').css('display', 'inline');
      $('#lock').bind('click', taglist, function(event){ lock_bind(event, taglist); });
      $('#OK, #cancel').css('display', 'none').unbind();
      $('.fav').css('color', '#0087D0').unbind();
   });
}

function initSpace(){
   var taglist = GM_getValue("FavTags") ? JSON.parse( GM_getValue("FavTags") ) : [];
   if(taglist.length == 0){ return; }
   var $hotkey = $('#hotkeyword div:first').append($('<hr />'));
   $hotkey.append(addAnchor(taglist));
   $hotkey.append($('<p />', {css: {'font-weight': 'bold', 'text-align': 'right' }})
   .append($.map(['lock','delete','OK','cancel'], function(item){
      return $('<a />', { id: item, href: "javascript:void(0)", text: item, css: {
         'margin': '2px', 'display': 'inline'
      }})[0];
   })));
   $('#OK, #cancel').css('display', 'none');
   $('#lock').bind('click', taglist, function(event){ lock_bind(event, taglist); });
   $('#delete').bind('click', taglist, function(event){ delete_bind(event, taglist); });
}

function addTag(){
   document.URL.match(/keyword=([^&]+)/i);
   var tag = (document.URL.length < 255) ? RegExp.$1 : RegExp.$1.replace(/\+[^\+]*$/, '');
   if(document.URL.indexOf('search=or') > -1){ tag += '&search=or'; }
   var taglist = GM_getValue("FavTags") ? JSON.parse( GM_getValue("FavTags") ) : [];
   var now = (+new Date());
   var flag = true;
   for(var j=0,m = taglist.length; j<m; j++){
      if(taglist[j].tag == tag){
         taglist[j].cnt++;
         taglist[j].ts = now;
         flag = false;
         break;
      }
   }
   if(flag && tag){
      taglist.push({'tag': tag, 'cnt': 1, 'ts': now, 'l': false});
   }
   var spls = taglist.length - maxTags;
   if(spls > 0){
      taglist.sort(function(a,b){ return b.ts - a.ts; });
      for(var i=0; i<spls; i++){
         rmv_item(taglist);
      }
   }
   taglist.sort(function(a,b){ return b.cnt - a.cnt; });
   GM_setValue("FavTags", JSON.stringify(taglist));
}

if(document.URL.indexOf('search') > -1){
   addTag();
}else if(document.URL == 'http://www.tinami.com/'){
   window.addEventListener('load', setTimeout(initSpace,500), false);
}