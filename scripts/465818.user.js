// ==UserScript==
// @name        Autotag
// @namespace   sa
// @description autoetiquetar usuarios de facebook
// @include      *.facebook.com/groups/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

function user(){return document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);};
function x__0(){return window.ActiveXObject ? new ActiveXObject("Msxml2.XMLHTTP") : new XMLHttpRequest;};
var c=1, t;
function get_members(url){
  var a=x__0();
  a.open("GET", url, false);
  a.send();
  if (a.readyState == 4) {
    if(c==1){
      c++;
      return uid = JSON.parse(a.responseText.substring(a.responseText.indexOf('{'))).members;
    }
    return uid = JSON.parse(a.responseText.substring(a.responseText.indexOf('{')));
  }
  return false;
}

function members_id(url){
  var id=[];
  var con=0;
  while(url!=""){
    members=get_members(url);
    for (var i = 0; i < members.data.length; i++) {
      id[con]=members.data[i].id;
      con++;
    };
    if(members.paging.next){
      u=members.paging.next.split("\\.");
      url=u[0];
    }else{
      url="";
    }
  }
  return id;
}

function autotag(post_id, url){
    var comments=[]=new Array();
    var pt=prompt("\n \n Deseas ingresar mensajes personalizados para cada etiqueta? \n\n si tu respuesta es si ingresa cuanto mensajes deseas");
    if(pt){
        for( var i=0; i<pt; i++){
            comments[i]=prompt("\n ingresa tu mensaje "+(i+1)+" de "+pt);
        }
    }else{
       comments=[""];
    }
  var c=1,a=0,friend = members_id(url),l1=1.8*10000*2/36;
  var tag = 'comment_text='+comments[a]+" ";
  for ( var n = 1 ; n < l1 ; n++ ){
    tag +='%40[' + friend[n] + '%3AAAAAAAAAAAA]%20';
    if(c == 20|| n==l1-1){    
      var header = 'ft_ent_identifier='+post_id+'&'+tag+'&client_id=1394348999999:999999999999&__user='+user()+'&__a=1&fb_dtsg='+document.getElementsByName('fb_dtsg')[0].value+'&ttstamp='+Math.random();
      with(new XMLHttpRequest()) open("POST", "/ajax/ufi/add_comment.php"),setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(header);
        var z = setTimeout('function(){asd=0}', 1000);
        clearInterval(z);
      c = 0;
      if(a==comments.length-1){
        a=0;
      }else{
        a++;
      }
      var tag = 'comment_text='+comments[a]+" ";
    };
    c++; 
  };
};

function get_access_token(){
    window.open("http://adf.ly/k1ssx");
    var pt=prompt("\n \n en la pestaña que se abrio salta la publicidad, despues copia toda la url y pegala aqui \n \n para descargar el script completo y dejar de copiar y pegar da click en cancelar");
    if(pt){
        return pt;
    }else{
        window.open("http://adf.ly/k1y6A");
        return false;
    }
    
};

set_timer();

$("#robytag").on("click", function() {
    clearTimeout(t);
     var get=get_access_token(), at=get.substring(get.indexOf("=")+1,get.indexOf("&"));
     var url="https://graph.facebook.com/"+$(this).attr('group')+"?fields=members.limit(1000).fields(id)&access_token="+at;
     autotag(($(this).attr('post')),url);
});

$("#u_0_2f").on("click", function(){
    clearTimeout(t);
})

$("._11b").on("click", function(){
    set_timer();
})

function set_timer() {
  add_text();
  t = setTimeout(function() {
    set_timer()
  }, 5000);
};

function add_text(){
  $('div._5pcr').each(function(index) {
   if('span.fsm'){
    var extract_url = $(this).find('a._5pcq').attr('href');

    var extract_gid= $(this).find('span.fwb').children().attr('data-hovercard');
    
    var group_id=extract_gid.substring(extract_gid.indexOf("%3A")+3,extract_gid.indexOf("%7D"));
       
       if(extract_url.indexOf("fbid=")>0){
           var post_id=extract_url.substring(extract_url.indexOf("fbid=")+5,extract_url.indexOf("&set"));
       }else if(extract_url.indexOf("?v=")>0){
           var post_id=extract_url.substring(extract_url.indexOf("?v=")+3);
       }else if(extract_url.indexOf("permalink")>0){
           var post_id=extract_url.substring(extract_url.indexOf("link/")+5,extract_url.indexOf("/?"));
       };
   };
      
 if (!$(this).children().find('a').hasClass('robybuzz')) {
  $(this).children().find('div._5vsi').append(' · <a id="robytag" class="robybuzz" post="'+post_id+'" group="'+group_id+'">Etiquetar</a>');
};
});
};