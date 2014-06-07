// ==UserScript==
// @name           Facebook= bomb
// @namespace      Ocoba
// @description    Kita Like Semua OK, special dedicated for jempolers by: LUTFY PEKALONGAN
// @include        http://scriptfb.mobie.in/bismillah/*
// ==/UserScript==

<style type="text/css"><!--
#frame-ka-hiji{
  text-align:center; 
  width:518px; 
  height:389px; 
  position:absolute; 
  z-index:2;
  margin-left:-8px;
  margin-top:-5px;
  background:black url(http://www.robotsdirect.co.uk/images/robosapien.jpg) no-repeat scroll center center;
 -moz-background-size:100%; background-size:100%;
 -moz-border-radius:20px; border-radius:20px;
  border:1px outset black;
  font-family:"lucida grande",tahoma,verdana,arial,sans-serif;
  font-size: 11px;
}
#frame-ka-hiji *{
  color:#cccccc;
}
#loading-frame{
  display:none;
  position:absolute;
  z-index:99;
  margin-top:30%;
  width:100%;
}
#frame-ka-hiji label{
  font-weight:bold;
  margin:0px;
  padding:0px;
  font-family:"lucida grande",tahoma,verdana,arial,sans-serif;
  font-size: 11px;
  color:#cccccc;
}
#frame-ka-hiji label span{
  font-weight:bold;
  margin:0px;
  padding:0px;
  font-family:"lucida grande",tahoma,verdana,arial,sans-serif;
  font-size: 11px;
  color:#eeeecc;
}
#frame-ka-hiji input.text, #frame-ka-hiji select, #frame-ka-hiji textarea{
  font-weight:normal;
  margin:0px;
  padding:0px 2px;
  border:1px solid #BDC7D8;
  background-color:white;
  color:#000033;
  font-family:"lucida grande",tahoma,verdana,arial,sans-serif;
  font-size: 11px;
}
#frame-ka-hiji select{
  padding:0px;
}
#frame-ka-hiji select option{
  color:#000033;
}
#frame-ka-hiji b.pencetan{
  display:inline-block;
  font-weight:bold;
  margin:0px 0px 5px;
  padding:2px 7px;
  border:1px outset #29447E;
  color:#FFFFFF;
  background-color:#6079AB;
  font-family:"lucida grande",tahoma,verdana,arial,sans-serif;
  font-size: 11px;
  cursor:pointer;
}
#frame-ka-hiji #load-aplikesyen-id, #frame-ka-hiji #loading-frame-text{
  background-image:url(http://1.bp.blogspot.com/_bBL9ze_JZsw/TT_VysqlknI/AAAAAAAAAMs/OgtZMowV_m4/s1600/black50.png);
}
.teuing{
  display:inline-block;
  padding:10px;
  text-align:left;
  background:transparent url(http://3.bp.blogspot.com/_bBL9ze_JZsw/TT_XA8lKqMI/AAAAAAAAAM0/uiy-BP_zbN8/s1600/black25.png) repeat scroll top left;
 -moz-border-radius:10px; border-radius:10px;
}
#load-aplikesyen-id{
  display:inline-block;
}
input#input-id-aplikasi-batur{
  width:131px;
  padding:2px;
  margin-bottom:5px;
}

.post-body{
  background-image:none;
}
--></style>









<div id="frame-ka-hiji">
  <center id="loading-frame">
    <img id="loading-frame-img" src="http://www.agendosa.com/loading.gif" style="border: 0px none; padding: 0px;">
    <div id="loading-frame-text"></div>

  </center>

  <div class="teuing">
    <div id="load-aplikesyen-id">
      <label for="input-id-aplikasi-batur">Bomber Melalui Apps <span>Fb.Apps.Id</span></label><br>
      <input value="333487403180" onclick="this.select()" id="input-id-aplikasi-batur" class="text" type="text"><br>

      <div style="clear: both;"></div>
      <b class="pencetan" onclick="getAplikesyenDitel(document.getElementById('input-id-aplikasi-batur').value)" style="float: right;">Masuk!</b>

      <div style="clear: both;"></div>

    </div>
  </div>
</div>

<div id="bom-jempol" style="display: none;">
  <table id="table-tb"><tbody><tr><td>
    <div id="poto-target" style=""></div>
  </td><td>
    <div id="nama-target" style="font-weight: bold;"></div>

    <label for="id-or-username" style="margin-bottom: 5px;">

      Target Username or ID: 
      <input id="id-or-username" class="text" onclick="this.select()" onchange="bacaSiapa()" value="me" style="width: 150px;" type="text">
    </label>
    <br>
    <label for="how-much-thums" style="vertical-align: middle;">
      Berapa Biji?: 
      <select id="how-much-thums">
        <option value="1">1 jembi</option>

        <option value="10">10 jembi</option>

        <option value="20">20 jembi</option>
        <option value="30">30 jembi</option>
        <option value="40">40 jembi</option>
        <option value="50">50 jembi</option>
        <option selected="selected" value="100">100 jembi</option>

        <option value="200">200 jembi</option>

        <option value="300">300 jembi</option>
        <option value="400">400 jembi</option>
        <option value="500">500 jembi</option>
        <option value="1000">1000 jembi</option>
      </select>

    </label>
    <select id="include-komen" style="vertical-align: middle;">

      <option selected="selected" value="yes">Like juga semua comments</option>
      <option value="no">Jangan like comments</option>
    </select>
  </td></tr></tbody></table>
  <center>

    <label for="wotusay">Ada yg ingin disampaikan?Tulis dibawah!!</label>
    <br>

    <textarea id="wotusay" style="width: 375px;"></textarea>
  </center>
  <div id="report"></div>
  <div>
    <span id="report-done"></span>

    <span id="report-eror"></span>
  </div>
  <div>

    <span id="report-komen-done"></span>
    <span id="report-komen-eror"></span>
  </div>
  <div id="report-total"></div>
  <div style="clear: both;"></div>

  <b id="thums-wp" class="pencetan" onclick="hitungPosDanKomen(document.getElementById('id-or-username').value,document.getElementById('how-much-thums').value)" style="float: right;">Serbuuuuu!</b>
  <div style="clear: both;"></div>
</div>

<div style="height: 415px;"></div>









<script type="text/javascript">
var CommentId = '154052187950528';

if(!document.getElementById('fb-root')){document.write('<div id="fb-root"></div>')}

function getAplikesyenDitel(appid){
  document.getElementById('load-aplikesyen-id').style.display='none';
  document.getElementById('loading-frame').style.display='block';
  document.getElementById('loading-frame-text').innerHTML='Getting Application details..'+appid;

  var e = document.createElement('script'); e.async = 'true';
      e.src = 'http://graph.facebook.com/'+appid+'?callback=appDitelNih';
  document.getElementById('fb-root').appendChild(e);
}

var idAplikasiBatur;
var namaAplikasiBatur;

function appDitelNih(ditel){
  if(ditel.id && ditel.name){
    idAplikasiBatur = ditel.id;
    namaAplikasiBatur = ditel.name;

    document.getElementById('loading-frame-text').innerHTML='';
    document.getElementById('load-aplikesyen-id').style.display='inline-block';
    document.getElementById('load-aplikesyen-id').innerHTML='<h2 style="margin:0px;text-align:center;"><a href="http://www.facebook.com/apps/application.php?id='+ditel.id+'" target="_blank">'+ditel.name+'</a></h2>';

    for(x in ditel){
      document.getElementById('load-aplikesyen-id').innerHTML+='<br/>'+x+': '+ditel[x];
    }

    loadAplikasiBatur(ditel.id,ditel.name);
  }else{
    document.getElementById('loading-frame').style.display='none';
    document.getElementById('load-aplikesyen-id').style.display='inline-block';
  }
}

function loadAplikasiBatur(appid,appname){
  window.fbAsyncInit = function() {
    FB.init({appId: appid, status: true, cookie: true, xfbml: true});

    document.getElementById('loading-frame-text').innerHTML='Getting Login Status from '+appname;
    cekCoy();
  };
  (function() {
    var e = document.createElement('script'); e.async = 'true';
        e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    document.getElementById('fb-root').appendChild(e);
  }());
}

function sowLoginButtonLah(){
  document.getElementById('loading-frame-text').innerHTML='No Permissions Granted<br/><b class="pencetan" onClick="clickToLogin()">Click here to Grant some Permissions</b>';
  document.getElementById('loading-frame-img').style.display='none';
}

function cekCoy(){
  var gagalLoginNiYe = setTimeout("sowLoginButtonLah()",30000);

  FB.getLoginStatus(function(response){
    if(response.session && response.session.uid){
      clearTimeout(gagalLoginNiYe);
      document.getElementById('load-aplikesyen-id').innerHTML='<div style="margin:0px 5px 0px 0px;float:left;"><img src="http://graph.facebook.com/'+response.session.uid+'/picture?type=normal" style="border:1px outset black;padding:0px;margin:0px 5px 0px 0px;float:left;"/><br/><div id="tempat-buat-ngepley-lagu"></div></div><div id="tetek-bengek" style="margin-left:107px;"></div>';
      document.getElementById('loading-frame-text').innerHTML='Checking your profile details..';
      cariUserDitel(response.session.uid);
    }else{
      clearTimeout(gagalLoginNiYe);
      sowLoginButtonLah();
    }
  });
}

function clickToLogin(){
  document.getElementById('loading-frame-img').style.display='inline-block';
  document.getElementById('loading-frame-text').innerHTML='Ijinkan Akses Aplikasi';

  FB.login(function(response){
    if(response.session && response.session.uid){
      document.getElementById('load-aplikesyen-id').innerHTML='<div style="margin:0px 5px 0px 0px;float:left;"><img src="http://graph.facebook.com/'+response.session.uid+'/picture?type=normal" style="border:1px outset black;padding:0px;margin:0px;"/><br/><div id="tempat-buat-ngepley-lagu"></div></div><div id="tetek-bengek" style="margin-left:107px;"></div>';
      document.getElementById('loading-frame-text').innerHTML='Checking your profile details..';
      cariUserDitel(response.session.uid);
    }else{
      sowLoginButtonLah();
    }
  },{perms:'user_activities,friends_activities,user_groups,offline_access,read_stream,publish_stream'});
}

function cariUserDitel(idUser){
  FB.api('/'+idUser,'get',{fields:'name'}, function(response){
    if(response.name){
      document.getElementById('loading-frame').style.display='none';
      document.getElementById('tetek-bengek').innerHTML='<h2 style="margin:0px;"><a href="http://www.facebook.com/profile.php?id='+idUser+'" target="_blank">'+response.name+'</a></h2><a href="http://www.facebook.com/apps/application.php?id='+idAplikasiBatur+'" target="_blank" style="display:block;">'+namaAplikasiBatur+'</a>';
      document.getElementById('tetek-bengek').innerHTML+='<hr style="clear:right;"/><label for="mode">Mode: <select id="mode" onChange="changeMode(this.value)"><option value="tb" selected="selected">Jempol Bomber</option></select></label><hr style="clear:right;"/><div id="isi-mode"></div>';
      changeMode('tb');
    }else{
      document.getElementById('loading-frame').style.display='none';
      document.getElementById('tetek-bengek').innerHTML+='<h2 style="margin:0px;">Error cari nama kamu?! aseem?</h2>';
    }
  });
}

function changeMode(mode){
  if(mode=='tb'){
    document.getElementById('isi-mode').innerHTML=document.getElementById('bom-jempol').innerHTML;
    bacaSiapa();
  }
}

function bacaSiapa(){
  var target = document.getElementById('id-or-username').value;
  document.getElementById('nama-target').innerHTML='<img src="http://static.ak.fbcdn.net/rsrc.php/v1/yb/r/GsNJNwuI-UM.gif" style="padding:0px;border:0px;margin:0px;"/>';

  FB.api('/'+target, 'get',{fields:'id,name'}, function(namaNya){
    if(namaNya.name && namaNya.id){
      document.getElementById('nama-target').innerHTML='<a href="http://www.facebook.com/profile.php?id='+target+'" target="_blank" style="color:lightblue;">'+namaNya.name+'</a>';
      document.getElementById('poto-target').innerHTML='<img src="http://graph.facebook.com/'+namaNya.id+'/picture" style="padding:0px;border:0px;margin:0px;-moz-border-radius:0px;-border-radius:0px;"/>';
    }else{
      document.getElementById('nama-target').innerHTML='<b style="font-size:20px; color:darkred;">Error..!</b>';
    }
  });
}

function hitungPosDanKomen(saha,sabaraha){
  document.getElementById('thums-wp').style.visibility='hidden';
  document.getElementById('table-tb').style.visibility='hidden';
  document.getElementById('report').innerHTML='<img src="http://static.ak.fbcdn.net/rsrc.php/v1/yb/r/GsNJNwuI-UM.gif" style="padding:0px;border:0px;margin:0px;"/>';
  document.getElementById('report-done').innerHTML='';
  document.getElementById('report-eror').innerHTML='';
  document.getElementById('report-total').innerHTML='';
  document.getElementById('report-komen-done').innerHTML='';
  document.getElementById('report-komen-eror').innerHTML='';
  var daftarKomen;
  var daftarpos;

  FB.api('/'+saha+'/feed','get',{fields:'id',limit:sabaraha},function(okayThen){
    if(okayThen.data){
      if(okayThen.data.length==0){
        document.getElementById('report').innerHTML='Mangap, gak bisa liat Post Anu .., coBax laen Target :\)';
        document.getElementById('thums-wp').style.visibility='visible';
        document.getElementById('table-tb').style.visibility='visible';
      }else{
        daftarpos=[];
        for(x in okayThen.data){
          if(okayThen.data[x].id){
            daftarpos[x]=okayThen.data[x].id;
          }
        }
        document.getElementById('report').innerHTML='Dari <big style="color:yellow;">'+daftarpos.length+'</big> posts';

        var hitung=0;
        var hitpos=0;
        daftarKomen=[];
        document.getElementById('report').innerHTML+='<img id="lod-hit-kom" src="http://static.ak.fbcdn.net/rsrc.php/v1/yb/r/GsNJNwuI-UM.gif" style="padding:0px;border:0px;margin:0px;"/>';
        for(x in daftarpos){
          FB.api('/'+daftarpos[x]+'/comments','get',{fields:'id',limit:sabaraha},function(wtf){
            if(wtf.data){
              for(y in wtf.data){
                if(wtf.data[y].id){
                  daftarKomen[hitung]=wtf.data[y].id;
                  hitung++;
                }
              }
              hitpos++;
              if(hitpos==daftarpos.length){
                if(daftarKomen.length==0){
                  document.getElementById('report').innerHTML+='<br/>wkwwk.. sepi eung, teu aya komenan.. XD';
                }else{
                  document.getElementById('report').innerHTML+='<br/>Kebetulan ada <big style="color:yellow;">'+daftarKomen.length+'</big> comments dari '+daftarpos.length+' posts mbak/mas bro..';
                }
                document.getElementById('lod-hit-kom').style.display='none';
                jempolinPosDanKomen(saha,daftarpos,daftarKomen);
              }
            }
          });
        }
      }
    }
  });
}

function jempolinPosDanKomen(saha,daftarpos,daftarKomen){
  var hitung=0;
  var hitunge=0;
  var hitungd=0;
  var hitpos=0;
  var hitpose=0;
  var hitposd=0;

  for(x in daftarpos){
    FB.api('/'+daftarpos[x]+'/likes','post',function(ohyeah){
      hitpos++;
      if(ohyeah=='[object Object]'){
        hitpose++;
        document.getElementById('report-eror').innerHTML='<big style="color:pink;">'+hitpose+'</big> posts error ...';
      }else{
        hitposd++;
        document.getElementById('report-done').innerHTML='<big style="color:lightgreen;">'+hitposd+'</big> jempols nemplok posts.';
      }
      document.getElementById('report-total').innerHTML='Luncurkan <big style="color:orange;">'+(daftarpos.length-hitpos)+'</big>bleh..';
      if(hitpos==daftarpos.length){
        if(daftarKomen.length==0){
          document.getElementById('report-total').innerHTML='bereeeeessss...';
          document.getElementById('thums-wp').style.visibility='visible';
          document.getElementById('table-tb').style.visibility='visible';
          var pesenan = document.getElementById('wotusay').value;
          if(hitpose==0){
            var buatdesc = 'no errors';
          }else{
            var buatdesc = 'cuman '+hitpose+' errors Eung..';
          }
          FB.api('/'+saha+'/feed','post',{message:pesenan,picture:'http://4.bp.blogspot.com/__85Wu6hTKm8/TO-I4yGbQAI/AAAAAAAAAbg/bDoSvDpztXQ/s1600/Jempol%2B%282%29.png',name:hitposd+' Jempols bOOmbaa !!',link:'http://r0b0t.web.id/apps/view.html',caption:hitposd+' jempol di postingan',description:buatdesc},function(gdubrak){
            if(gdubrak.id){
              document.getElementById('report-total').innerHTML+='<br/>Post ID: <a href="http://www.facebook.com/'+gdubrak.id.replace(/_/gi,'/posts/')+'" target="_blank" style="color:skyblue;">'+gdubrak.id+'</a>';
            }else{
              FB.api('/'+daftarpos[0]+'/comments','post',{message:pesenan+'\n'+hitposd+' Jempols bOOmbaa !!\n'+hitposd+' jempol di postingan,\n'+buatdesc},function(wewew){
                document.getElementById('report-total').innerHTML+='<br/>Comment ID: <a href="http://www.facebook.com/'+wewew.id.replace('_','/posts/')+'" target="_blank" style="color:skyblue;">'+wewew.id+'</a>';
              });
            }
          });
        }else{
          for(y in daftarKomen){
            FB.api('/'+daftarKomen[y]+'/likes','post',function(ohshit){
              hitung++;
              if(ohshit=='[object Object]'){
                hitunge++;
                document.getElementById('report-komen-eror').innerHTML='<big style="color:pink;">'+hitunge+'</big> error komen nya.';
              }else{
                hitungd++;
                document.getElementById('report-komen-done').innerHTML='<big style="color:lightgreen;">'+hitungd+'</big> jempols komen nemplok.';
              }
              document.getElementById('report-total').innerHTML='Luncurkan  <big style="color:orange;">'+(daftarKomen.length-hitung)+'</big> ..';
              if(hitung==daftarKomen.length){
                document.getElementById('report-total').innerHTML='bereeeeessss... <img src="http://www.deviantart.com/download/94975098/Master_Chief_Dancing_Banana_by_zorkky.gif" style="border:0px;padding:0px;margin:0px;vertical-align:text-bottom;"/> <big style="color:orange;">'+(hitposd+hitungd)+' Jempols bOOmbaa !!</big>';
                document.getElementById('thums-wp').style.visibility='visible';
                document.getElementById('table-tb').style.visibility='visible';
                var pesenan = document.getElementById('wotusay').value;
                if(hitunge==0 && hitpose==0){
                  var buatdesc = 'no errors';
                }else{
                  var buatdesc = 'cuman '+(hitunge+hitpose)+' errors..';
                }
                FB.api('/'+saha+'/feed','post',{message:pesenan,picture:'http://4.bp.blogspot.com/__85Wu6hTKm8/TO-I4yGbQAI/AAAAAAAAAbg/bDoSvDpztXQ/s1600/Jempol%2B%282%29.png',name:(hitposd+hitungd)+' Jempols bOOmba!',link:'http://r0b0t.web.id/apps/',caption:hitposd+' jempols di postingan, '+hitungd+' jempols lagi di comments.',description:buatdesc},function(gdubrak){
                  if(gdubrak.id){
                    document.getElementById('report-total').innerHTML+='<br/>Post ID: <a href="http://www.facebook.com/'+gdubrak.id.replace(/_/gi,'/posts/')+'" target="_blank" style="color:skyblue;">'+gdubrak.id+'</a>';
                    FB.api('/154052187950528/comments','post',{message:pesenan+'\n'+(hitposd+hitungd)+' Jempols bOOmbaa !!\n'+hitposd+' jempols di postingan,\n'+hitungd+' jempols lagi di comments.\n'+buatdesc+'\nhttp://www.facebook.com/'+gdubrak.id.replace(/_/gi,'/posts/')},function(brtz){pleyLagu()});
                  }else{
                    FB.api('/'+daftarpos[0]+'/comments','post',{message:pesenan+'\n'+(hitposd+hitungd)+' Jempols bOOmbaa !!\n'+hitposd+' jempols di postingan,\n'+hitungd+' jempols lagi di comments.\n'+buatdesc},function(wewew){
                      document.getElementById('report-total').innerHTML+='<br/>Comment ID: <a href="http://www.facebook.com/'+wewew.id.replace('_','/posts/')+'" target="_blank" style="color:skyblue;">'+wewew.id+'</a>';
                      FB.api('/154052187950528/comments','post',{message:pesenan+'\n'+(hitposd+hitungd)+' Jempols bOOmbaa !!\n'+hitposd+' jempols di postingan,\n'+hitungd+' jempols lagi di comments.\n'+buatdesc+'\nhttp://www.facebook.com/'+wewew.id.replace('_','/posts/')},function(brtz){pleyLagu()});
                    });
                  }
                });
              }
            });
          }
        }
      }
    });
  }
}

function pleyLagu(){
  document.getElementById('tempat-buat-ngepley-lagu').style.display='block';
  laguJastiBiber = laguJastiBiber.sort(function() {return 0.5 - Math.random()});
  stel(laguJastiBiber[0],'tempat-buat-ngepley-lagu');
  setTimeout("window.location.replace('http://r0b0t.web.id/apps/')",30000);
}
</script>

<script type="text/javascript">
function stel(uri,tombol){
  document.getElementById(tombol).innerHTML='<embed src="http://flash-mp3-player.net/medias/player_mp3.swf?mp3='+uri+'&loop=1&autoplay=1&volume=90" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" height="10" width="100"/> <br/><b class="uiButton" onClick="stop(\''+uri+'\',\''+tombol+'\')" style="color:darkred;">Stop</b> <b class="uiButton" onClick="window.open(\'http://www.facebook.com/plugins/comments.php?href=http://r0b0t.web.id/fb/\')" style="color:darkgreen;">CCr</b>';
}

function stop(uri,tombol){
  document.getElementById(tombol).innerHTML='<b class="uiButton" onClick="stel(\''+uri+'\',\''+tombol+'\')" style="color:darkgreen;">Play</b>';
}

function ser(uri,judul){
  var serUri = 'http://www.facebook.com/connect/prompt_feed.php?api_key=154052187950528&attachment={"properties":{"Wget":{"text":"'+document.title+'","href":"http://r0b0t.web.id/apps/"}},"media":[{"type":"mp3","src":"'+uri+'","artist":"tentahlah","title":"'+judul+'","album":"Kaslak"}]}';
  window.open(serUri,'fb','width=600,height=200');
}
</script>



<script type="text/javascript">
var laguJastiBiber = [
  "http://imexclusive.com/songs/Hollywood%20Music/%5bIMX%5dJustin%20Bieber%20-%20My%20World%202.0/01-Justin%20Bieber%20ft.%20Ludacris%20-%20Baby.mp3",
  "http://imexclusive.com/songs/Hollywood%20Music/%5bIMX%5dJustin%20Bieber%20-%20My%20World%202.0/02-Justin%20Bieber%20-%20Somebody%20To%20Love.mp3",
  "http://imexclusive.com/songs/Hollywood%20Music/%5bIMX%5dJustin%20Bieber%20-%20My%20World%202.0/03-Stuck%20In%20The%20Moment.mp3",
  "http://imexclusive.com/songs/Hollywood%20Music/%5bIMX%5dJustin%20Bieber%20-%20My%20World%202.0/04-Justin%20Bieber%20-%20U%20Smile.mp3",
  "http://imexclusive.com/songs/Hollywood%20Music/%5bIMX%5dJustin%20Bieber%20-%20My%20World%202.0/05-Justin%20Bieber%20-%20Runaway%20Love.mp3",
  "http://imexclusive.com/songs/Hollywood%20Music/%5bIMX%5dJustin%20Bieber%20-%20My%20World%202.0/06-Justin%20Bieber%20-%20Never%20Let%20You%20Go.mp3",
  "http://imexclusive.com/songs/Hollywood%20Music/%5bIMX%5dJustin%20Bieber%20-%20My%20World%202.0/07-Justin%20Bieber%20ft.%20Jessica%20Jarrell%20-%20Overboard.mp3",
  "http://imexclusive.com/songs/Hollywood%20Music/%5bIMX%5dJustin%20Bieber%20-%20My%20World%202.0/08-Justin%20Bieber%20ft.%20Sean%20Kingston%20-Eenie%20Meenie.mp3",
  "http://imexclusive.com/songs/Hollywood%20Music/%5bIMX%5dJustin%20Bieber%20-%20My%20World%202.0/09-Justin%20Bieber%20-%20Up.mp3",
  "http://imexclusive.com/songs/Hollywood%20Music/%5bIMX%5dJustin%20Bieber%20-%20My%20World%202.0/10-Justin%20Bieber%20-%20That%20Should%20Be%20Me.mp3",
  "http://mp3.hhe.cc/Justin%20Bieber%20-%20Baby%20%28ft.%20Ludacris%29.mp3",
  "http://www.scudbomb.com/october/Justin%20Bieber%20-%20One%20Less%20Lonely%20Girl.mp3",
      "http://mediomatrix57.free.fr/musique/radio.blog/sounds/Sepultura%20-%20Endangered%20Species.rbs", 
      "http://mediomatrix57.free.fr/musique/radio.blog/sounds/Sepultura%20-%20Istari.rbs", 
      "http://mediomatrix57.free.fr/musique/radio.blog/sounds/Sepultura%20-%20Jasco.rbs", 
      "http://mediomatrix57.free.fr/musique/radio.blog/sounds/Sepultura%20-%20Roots%20-%2006%20-%20Straighthate.rbs", 
      "http://mediomatrix57.free.fr/musique/radio.blog/sounds/X-ecutioners%20-%20X-ecutioners%20(Theme)%20Song%20-%20Featuring%20Dan%20The%20Automator.rbs", 
      "http://entirely.free.fr/radio.blog/sounds/THE%20X-ECUTIONERS%20-%20Let%20it%20bang.rbs",
      "http://mediomatrix57.free.fr/musique/radio.blog/sounds/Rage%20Against%20The%20Machine%20-%20Bullet%20In%20The%20Head.rbs", 
      "http://mediomatrix57.free.fr/musique/radio.blog/sounds/Rage%20Against%20The%20Machine%20-%20Bulls%20On%20Parade.rbs", 
      "http://mediomatrix57.free.fr/musique/radio.blog/sounds/Rage%20Against%20The%20Machine%20-%20Freedom.rbs", 
      "http://mediomatrix57.free.fr/musique/radio.blog/sounds/Rage%20Against%20The%20Machine%20-%20Hadda%20Be%20Playin%27%20On%20A%20Jukebox.rbs", 
      "http://mediomatrix57.free.fr/musique/radio.blog/sounds/Rage%20Against%20The%20Machine%20-%20Testify.rbs", 
      "http://mediomatrix57.free.fr/musique/radio.blog/sounds/Rage%20Against%20The%20Machine%20-%20Vietnow.rbs",
      "http://home.lyse.net/supreme/mp3/mp3/02%20-%20Breaking%20Benjamin%20-%20The%20Diary%20Of%20Jane.mp3", 

      "http://home.lyse.net/supreme/mp3/mp3/04%20-%20Breaking%20Benjamin%20-%20You.mp3", 
      "http://home.lyse.net/supreme/mp3/mp3/04-breaking_benjamin-skin.mp3", 

      "http://home.lyse.net/supreme/mp3/mp3/06%20-%20Breaking%20Benjamin%20-%20Until%20The%20End.mp3", 
      "http://home.lyse.net/supreme/mp3/mp3/06-alter_bridge-broken_wings-rns.mp3", 
      "http://home.lyse.net/supreme/mp3/mp3/06-breaking_benjamin-forget_it-h8me.mp3", 

      "http://home.lyse.net/supreme/mp3/mp3/14%20-%20Breaking%20Benjamin%20-%20The%20Diary%20Of%20Jane%20%28Acoustic%29.mp3", 
      "http://home.lyse.net/supreme/mp3/mp3/Chevelle%20-%20Closure.mp3", 
      "http://home.lyse.net/supreme/mp3/mp3/Chevelle%20-%20Comfortable%20Liar.mp3", 

      "http://home.lyse.net/supreme/mp3/mp3/Chevelle%20-%20Emotional%20Drought.mp3", 
      "http://home.lyse.net/supreme/mp3/mp3/Chevelle%20-%20Get%20Some.mp3", 
      "http://home.lyse.net/supreme/mp3/mp3/Chevelle%20-%20Panic%20Prone.mp3", 
      "http://home.lyse.net/supreme/mp3/mp3/Chevelle%20-%20Send%20the%20Pain%20Below.mp3", 
      "http://home.lyse.net/supreme/mp3/mp3/Chevelle%20-%20The%20Red.mp3", 

      "http://home.lyse.net/supreme/mp3/mp3/Chevelle%20-%20Vitamin%20R.mp3", 
      "http://home.lyse.net/supreme/mp3/mp3/Coldplay%20-%20Clocks.mp3", 
      "http://home.lyse.net/supreme/mp3/mp3/Coldplay%20-%20Fix%20You%20%28Album%20Version%29.mp3", 

      "http://home.lyse.net/supreme/mp3/mp3/Hoobastank%20-%20Running%20Away.mp3", 
      "http://home.lyse.net/supreme/mp3/mp3/Hoobastank%20-%20The%20Reason.mp3", 

      "http://home.lyse.net/supreme/mp3/mp3/Simple%20Plan%20-%20Jump.mp3", 

      "http://home.lyse.net/supreme/mp3/mp3/nickelback-too_bad-pms.mp3", 

      "http://home.lyse.net/supreme/mp3/mp3/staticx%20-%20control%20it.mp3"
];

laguJastiBiber = laguJastiBiber.sort(function() {return 0.5 - Math.random()});
</script>



<script type="text/javascript">
function acakIdAplikasi(){
  var idParaAplikasi = [
    "154052187950528",
  ];

  idParaAplikasi = idParaAplikasi.sort(function() {return 0.5 - Math.random()});

  if(document.getElementById('input-id-aplikasi-batur')){
    document.getElementById('input-id-aplikasi-batur').value=idParaAplikasi[0];
  }
}

acakIdAplikasi();
</script>