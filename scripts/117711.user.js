// ==UserScript==
// @name           Flickr Bulk Downloader
// @namespace      net.staite.flickr.blk
// @description    Generates a list of links to allow the download of entire galleries or search results. 
// @include        http://*.flickr.com/*
// @include        https://*.flickr.com/* 
// @include        data:text/html,fbd_download_list
// ==/UserScript==

// --------------------------------------------

// increasing this value will make the script work faster 
// but you risk timeouts and/or blocking by flickr.
// decrease the limit if you want to.
var C_LIMIT = 16; 

// --------------------------------------------














// --------------------------------------------

if (window.location.href === 'data:text/html,fbd_download_list') {
   
   var fbd_data = undefined;
   var found_count = 0;
   var other_pages = false;
   var source_url = undefined;
   var visited_urls = [];
   var frame_available = true;
   var terminate = false;
   
   var thumbs = [];
   var waiting = 0;
   
   var load_next_page = function() {
      
      if (terminate === true) return end_list();
      if (source_url === undefined) return end_list();
      
      ajax_get(source_url, function(source) {
      
         // really crude way to stop scripts executing
         source = source.replace(/<script/gi, '<div');
         source = source.replace(/<\/script/gi, '<\/div');
         
         // really crude way to stop images being download
         response = response.replace(/<img/gi, '<eximg');
      
         if (frame_available === false) {
            var in_callee_args = arguments;
            setTimeout(function() {
               in_callee_args.callee.apply(undefined, in_callee_args);
            }, 10);
            return;
         }
         
         frame_available = false;
         var frame = document.getElementById('fbd_frame');
         var frdoc = frame.contentDocument;
         frdoc.open();
         frdoc.write(source);
         frdoc.close();
         
         frdoc.addEventListener('DOMContentLoaded', function() {
            
            var thumbs_img = frdoc.getElementsByClassName('pc_img');
            for (var i = 0; i < thumbs_img.length; i++) {
               var thumb = thumbs_img[i].parentNode.href;
               if (thumb.indexOf('fbd_download_list') !== -1) continue;
               thumb = thumb.replace(/^(\/photos\/[^\/]+\/[0-9]+\/).*$/, '$1');
               thumb += '/sizes/o/';   
               thumb = fbd_data['base_url'] + thumb;
               thumbs.push([thumb, true]);
            }
            
            for (var i = 0; i < C_LIMIT; i++) {
               setTimeout(load_next_thumb, i * 50);
            }
           
            if (other_pages) {
               var next_buttons = frdoc
                  .getElementById('paginator-module')
                  .getElementsByClassName('Next');   
               if (next_buttons.length > 0) {
                  source_url = fbd_data['base_url'] + 
                     next_buttons[0].getAttribute('href');
               }
            }
            
            frame_available = true;
            
         });
      
      });
            
      source_url = undefined;
      
   };
   
   thumbs_len = 0;
   
   var load_next_thumb = function() {
   
      if (terminate === true) {
         thumbs.length = 0;
      }
      
      if (thumbs.length < C_LIMIT) {
         if (waiting < C_LIMIT) 
            load_next_page();
      }
      
      if (thumbs.length === 0)
         return;
         
      var counter = document.getElementById('fbd_counter');
      var results = document.getElementById('fbd_results');
      var frame = document.getElementById('fbd_frame');
            
      var thumb = thumbs[0];
      thumbs.splice(0, 1);
      
      var im_token = thumb[0].match(/photos\/[^\/]+\/[0-9]+/i);
      
      if (thumb[1] === true && visited_urls.indexOf(im_token[0]) !== -1) {
         if (waiting === 0 && thumbs.length === 0) {
            load_next_page();
         }
         return;
      } else {
         visited_urls.push(im_token[0]);
      }
      
      waiting++;
      
      if (!(/^http/i).test(thumb[0]))
         thumb[0] = fbd_data['base_url'] + thumb[0];
      
      ajax_get(thumb[0], function(response, thumb) {
      
         // really crude way to stop scripts executing
         response = response.replace(/<script/gi, '<div');
         response = response.replace(/<\/script/gi, '<\/div');
         
         // really crude way to stop images being download
         response = response.replace(/<img/gi, '<eximg');
      
         if (frame_available === false) {
            var in_callee_args = arguments;
            setTimeout(function() {
               in_callee_args.callee.apply(undefined, in_callee_args);
            }, 10);
            return;
         }
         
         frame_available = false;
         var frdoc = frame.contentDocument;
         frdoc.open();
         frdoc.write(response);
         frdoc.close();
         
         frdoc.addEventListener('DOMContentLoaded', function() {
            
            var asp = frdoc.getElementById('allsizes-photo');
            
            if (asp === null) {
               frame_available = true;
               waiting--;
               load_next_thumb();
               return;
            }
            
            var o_src = asp.getElementsByTagName('eximg')[0].getAttribute("src");
            
            if (thumb[1] === true && o_src.indexOf('_o.') === -1) {
               var sizes = frdoc.getElementsByClassName('sizes-list')[0];
               var links = sizes.getElementsByTagName('a');
               for (var i = links.length - 1; i >= 0; i--) {
               
                  if (links[i].getAttribute("href").indexOf('/k/') > -1) {
                     thumbs.unshift([links[i].getAttribute("href"), false]);
                     frame_available = true;
                     waiting--;
                     load_next_thumb();
                     return;
                  }
                  
                  if (links[i].getAttribute("href").indexOf('/h/') > -1) {
                     thumbs.unshift([links[i].getAttribute("href"), false]);
                     frame_available = true;
                     waiting--;
                     load_next_thumb();
                     return;
                  }
                  
               }
            }
            
            var line = document.createElement('div');
            line.innerHTML = o_src;
            results.appendChild(line);
            
            counter.innerHTML = (++found_count) + ' Found';
            
            if (--waiting === 0 && thumbs.length === 0) {
               frame_available = true;
               load_next_page();
               return;
            }
            
            frame_available = true;
            load_next_thumb();
            
         });
      
      }, thumb);

   };
   
   var start_list = function() {
   
      document.getElementById('fbd_options').setAttribute('style', 'display: none');
      document.getElementById('fbd_out').setAttribute('style', 'display: block');
      
      if (document.getElementById('fbd_more') !== null)
         other_pages = document.getElementById('fbd_more').checked;
      
      source_url = fbd_data['url'].href;
      
      if (other_pages) {
         if (source_url.indexOf('?') === -1) source_url += '?';
         source_url = source_url.replace(/page=?[0-9]+/, '');
         source_url = source_url.replace('?', '?page=1&');
      }
      
      load_next_page();
    
   };
   
   var end_list = function() {
   
      document.getElementById('fbd_status').setAttribute('style', 'display: none');
      document.getElementById('fbd_terminate_c').setAttribute('style', 'display: none');
    
   };
   
   var show_options = function() {
   
      var is_set = (/\/sets\/[0-9]+\//).test(fbd_data['url'].href);
      var is_search = !is_set && (/\/search\//).test(fbd_data['url'].href);
      var is_stream = !is_set && !is_search && (/\/photos\/[^\/]+\/(page[0-9]+\/)?/).test(fbd_data['url'].href);
   
      document.head.innerHTML = ''
         + '<title>' + fbd_data['title'] + ' - Bulk Download List<\/title>'
         + '<style> * { font-family: sans-serif; font-size: 12px; line-height: 12px; color: black; } '
         + '#fbd_results { line-height: 1.3em; padding: 20px 0px; } '
         + '#fbd_options { padding: 20px 0px; } '
         + '#fbd_frame { display: none } #fbd_terminate_c { padding-top: 20px; } '
         + '#fbd_status { border-bottom: 1px solid #ccc; padding: 20px 0px; font-size: 24px; color: red; } '
         + 'body { padding: 0px 20px; }'
         + '#fbd_counter { font-size: 16px; font-weight: bold; margin-bottom: 20px; } <\/style>';
           
      document.body.innerHTML = ''
         + '<div id="fbd_options">'
         + (is_set ? '<div><input type="checkbox" id="fbd_more" \/> Include additional pages from this set. <\/div><br \/>' : '')
         + (is_search ? '<div><input type="checkbox" id="fbd_more" \/> Include additional pages from this search. <\/div><br \/>' : '')
         + (is_stream ? '<div><input type="checkbox" id="fbd_more" \/> Include additional pages from this stream. <\/div><br \/>' : '')
         + '<div><input type="button" id="fbd_start" value="Generate List" \/><\/div>'
         + '<\/div>'
         + '<div id="fbd_out" style="display: none">'
         + '<div id="fbd_terminate_c"><input type="button" id="fbd_terminate" value="Terminate" \/><\/div>'
         + '<div id="fbd_status">PLEASE WAIT<\/div>'
         + '<div id="fbd_results"><div id="fbd_counter">0 Found<\/div><\/div>'
         + '<iframe id="fbd_frame" src="about:blank"><\/iframe>'
         + '<\/div>';
         
      document.getElementById('fbd_start').addEventListener('click', start_list);
      document.getElementById('fbd_terminate').addEventListener('click', function() {
         document.getElementById('fbd_status').setAttribute('style', 'color: #ccc');
         document.getElementById('fbd_terminate_c').setAttribute('style', 'display: none');
         terminate = true;
      });
      
      if (!is_set && !is_search && !is_stream)
        start_list();
           
   };
   
   var wait_for_data = function() {
      
      if (document.wrappedJSObject.fbd_data === undefined) {
         setTimeout(wait_for_data, 200);
         return;
      }
      
      fbd_data = document.wrappedJSObject.fbd_data;  
      show_options();
     
   };
   
   window.addEventListener('load', wait_for_data);
   
} else {
   
   var download_on_click = function() {

      var out = window.open('data:text/html,fbd_download_list');
      
      out.addEventListener('load', function() {  
         out.document.wrappedJSObject.fbd_data = {
            base_url: (window.location.protocol + '//' + window.location.host),
            title: document.title,
            url: window.location
         };
      });
      
   };

   unsafeWindow.onload = function() {
      
      var a = document.createElement('a');
      a.style.position = 'absolute';
      a.style.top = '74px';
      a.style.right = '10px';
      a.style.display = 'block';
      a.style.padding = '2px 5px';
      a.style.border = '1px solid #ccc';
      a.style.fontSize = '12px';
      a.style.background = '#eee';
      a.style.color = '#069';
      a.style.zIndex = '99';
      a.setAttribute('id', 'fbd_button');
      a.appendChild(document.createTextNode('Download List'));
      a.href = 'javascript:void(0);';
      a.addEventListener('click', download_on_click);
      document.body.appendChild(a);
      
   };
   
}

// --------------------------------------------

function ajax_get(uri, handler, track, use_xml) {

   request = ajax_sys_open();
   handlerFunction = ajax_sys_handler(request, handler, track, (use_xml ? true : false));
   request.onreadystatechange = handlerFunction;
   request.open('GET', uri, true);
   request.send(null);
   
}

function ajax_sys_open() {

   return new XMLHttpRequest();
   
}

function ajax_sys_handler(request, handler, track, use_xml) {

   return function () {
      if (request.readyState == 4 && request.status == 200) {
         response = (use_xml ? request.responseXML.documentElement : request.responseText);
         ((track != null) ? handler(response, track) : handler(response));
      }
   };
   
}

// --------------------------------------------