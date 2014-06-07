// ==UserScript==
// @name           Blipthr
// @namespace      http://userscripts.org/scripts/rubytree
// @description    Pozwala śledzić wątki na blipie
// @include        http://blip.pl/s/*
// @include        http://blip.pl/dm/*
// @include        http://blip.pl/pm/*
// @include        http://www.blip.pl/s/*
// @include        http://www.blip.pl/dm/*
// @include        http://www.blip.pl/pm/*
// ==/UserScript==
//
var $;
var thread_ids = [];
var threads = [];
var images = [];
var calls = 0;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {

      $("#dashboard-updates a").each(function(){
          if($(this).html() == '[blip]'){
              getBlip($(this).attr('href').match(/\d+/), showreq);
          }
      });

}

      function showreq(data){
        if(data){
        var reg = /http:\/\/blip\.pl\/s\/\d+/gi
        var thread = data.body.match(reg);
        var up = true;
        if(thread_ids.length>0){
          if(thread_ids.join(' ').search(data.id) != -1) up = false;
        }
        thread_ids.push(data.id);
        if(thread){
          for(var i = 0;  i<thread.length; i++){
            var id = thread[i].match(/\d+/);
              calls++;
              getBlip(id, showreq);
              data.body = data.body.replace(thread[i], '<a href="'+thread[i]+'" title="id: '+id+'" rel="'+id+'">[blip]</a>');
          }
        }
        
        if(up){
          threads.push(data);
          /*if(data.pictures_path) {
            getImg(data.pictures_path, updateImgs);
            calls++;
          }
          */
        }

        if(calls>0)calls--;
        if(calls<=0) showThreads();
           
        }
      }


      function updateImgs (data) {
        calls--;
         images[data[0].update_path.match(/\d+/)]  = data[0].url
      }


      function cmpThreads(a,b){
        a = new Date(a.created_at.replace('-','/'));
        b = new Date(b.created_at.replace('-','/'));
        return a.getTime() < b.getTime();
      }

      function showThreads() {
        while(threads.length > 0){
            i = threads.pop();
            showThread(i);
        }

          $("#dashboard-updates a").each(function(){
            if($(this).html() == '[blip]'){
              $(this).parents('li').attr('rel', $(this).parents('li').attr('rel')+','+$(this).attr('href').match(/\d+/));
              $(this).mouseenter( function(){
                $("#update-"+$(this).attr('href').match(/\d+/)+' .container').css('background-color', '#ff0000');
              }).mouseleave(function(){
                $("#update-"+$(this).attr('href').match(/\d+/)+' .container').css('background-color', 'transparent');
              });
            }
          });

          $("#dashboard-updates li").each(function(){
            $(this).mouseenter(function(){
              rel = $(this).attr('rel')+' '+$(this).attr('id').match(/\d+/);
              $("#dashboard-updates li").each(function(){
                if(rel.search($(this).attr('id').match(/\d+/)) != -1){
                  $(this).css('opacity','1.0');
                } else {
                  $(this).css('opacity','0.5');
                }
              });
            }).mouseleave(function(){
              $("#dashboard-updates li").each(function(){
                  $(this).css('opacity','1.0');
              });
            });
          });
      }

      function showThread(data){
        var bid = data.id;
        var body = data.body;
        var username = data.user_path.replace("/users/",'');
        var created_at = data.created_at;
        var transport = data.transport.name;
        var before_id = $("#dashboard-updates li")[0];
        var change = false;
        $("#dashboard-updates li .created-ago").each(function(){
          create = $(this).html().replace(/-/gi, '/');
          create = new Date(create);
          curr = new Date(created_at.replace(/-/gi, '/'));
          if((curr.getTime() < create.getTime()) && !change) {
            before_id = $(this).parents('li');
            change = true;
          }
        });
       /* var img = new Image();
        img.src = images[bid];
        width = img.naturalWidth;
        console.log(width);
        */
        var img = '<img width="445" src="'+images[bid]+'" />';

        $(before_id).before(
        '<li id="update-'+bid+'" class="update status"><div class="background-top">&nbsp;</div><div class="container clearfix">'+
          '<a href="http://blip.pl/users/'+username+'/dashboard" class="author"><img alt="'+username+' - avatar" src="http://blip.pl/users/'+username+'/avatar/pico.jpg" /></a>'+
          '<div class="content"><span class="nick"><a href="http://blip.pl/users/'+username+'/dashboard">'+username+'</a>: </span>'
          + body + img +
          '</div><div class="toolbar clearfix clearer">'+
          '<span class="clock"><span class="created-ago">'+created_at+'</span></span>'+
          '<span class="transport">, przez '+transport+'</span><span class="divider">&nbsp;&nbsp;</span>'+
          '<a href="/dashboard/respond/'+username+'/0" class="respond">odpowiedz</a>'+
          '<span class="divider">&nbsp;|&nbsp;</span>'+
          '<a href="/dashboard/quote/'+bid+'" class="quote">cytuj</a>'+
          '<span class="divider">&nbsp;|&nbsp;</span>'+
          '<a href="http://blip.pl/s/'+bid+'" class="permalink">link</a>'+
          '<span class="divider">&nbsp;|&nbsp;</span>'+
          '<span class="">id:'+bid+' </span>'+
          '</div> </div> <div class="background-bottom">&nbsp;</div> </li>'
        );
      }

function getBlip(id,callback) {
    try{
      window.setTimeout(GM_xmlhttpRequest, 0, { 
    method: "GET", 
    url:"http://api.blip.pl/statuses/"+id+".json",
    onload: function(req){
      if(req.status == 200) {
        var data = JSON.parse(req.responseText);
        callback(data);
      } else {
        callback(null);
      }
    }
  });
  }catch (err){
    console.log('zesrało sie');
  }
}

function getImg(id,callback) {
      window.setTimeout(GM_xmlhttpRequest, 0, { 
    method: 'GET', 
    url:'http://api.blip.pl'+id,
    onload: function(req){
      if(req.status == 200) {
        var data = JSON.parse(req.responseText);
        callback(data);
      } else {
        callback(null);
      }
    }
  });

};

