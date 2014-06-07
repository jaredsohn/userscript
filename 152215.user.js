// <![CDATA[
// ==UserScript==
// @name          MYNET HACK
// @fullname      MYNET HACK
// @description   Download Link + Quality Selector + Rollover Preview + Media Controller + Media Resizer + More...
// @homepage      http://userscripts.org/scripts/show/33042
// @icon          http://s3.amazonaws.com/uso_ss/icon/33042/large.PNG?1245499122
// @updateURL     http://userscripts.org/scripts/source/33042.meta.js
// @downloadURL   http://userscripts.org/scripts/source/33042.user.js
// @author        SesELeme
// @version       2012.5.28
// @licence       http://creativecommons.org/licenses/SesELeme
// @license       (CC) byS esELeme
// @namespace     http://userscripts.org/scripts/show/SesELeme
// @run-at        document-start
// @include       http://userscripts.org/scripts/show/33042*
// @include       https://userscripts.org/scripts/show/33042*
// @include       http://mynet.*/*
// @include       http://*s.mynet.*/*
// @include       https://mynet.*/*
// @include       https://*.mynet.*/*
// @exclude       http://*.mynet.*/js/*_watch_request_ad.html
// ==/UserScript==
$(chathazirla);
$(odadanayrilbutton);
$(yenioyunbutton);
$(puanyuklebutton);
$(sikayetbutton);
$(yenilebutton);
$(buttonhover);
$(sohbet);

function sohbet(){
    if((uyebilgi.ayarlar & ayarlar_bw['sohbet']) > 0){
        $('#odachatinput').attr('disabled',false);
        $('#odachatg').attr('disabled',false);
    } else {
        $('#odachatinput').attr('disabled',true);
        $('#odachatg').attr('disabled',true);
    }
}

function sikayetbutton(){
   $('#sikayetet').bind('click',function(){
        var mesajlar=[];
        if($('#table_chat').children().length>10){
            var mdiv = $('#table_chat').children(":gt("+($('#table_chat').children().length-11)+")");
        }
        else{
             var mdiv = $('#table_chat').children();
        }
        mdiv.each(function(y,x){
            var uid = $(x).children(':first').data('pid');
            var hede = $(x).clone();
            hede.children(':first').detach();
            var msj = $(hede ).html();
            mesajlar.push({'uid':uid,'msj':encodeURIComponent(msj)});
        });
        var komut=new Object();
        komut.tip='sikayet';
        komut.mesajlar=mesajlar;
        fl_gonder($.toJSON(komut));
   });
}

function buttonhover(){
    $('#odabutons div').each(function(y,x){
        $(x).bind('mouseenter',function(){
            $(this).addClass('hover');
        });
        $(x).bind('mouseleave',function(){
            $(this).removeClass('hover');
        });
    });
}

function chathazirla(){
    $('#odachatg').bind('click',function(){
        chatgonder();
    });
    $('#odachatinput').bind('keydown',function(event){
        if (event.keyCode == 13){
            chatgonder();
        }
    });
}
var sonodachat=0;
function chatgonder(){
    var mesaj=$('#odachatinput').attr('value');
    if(mesaj.length){
        var suan=(new Date().getTime())/1000;
        if(suan-sonodachat>1){
            sonodachat=(new Date().getTime())/1000;
            var komut=new Object();
            komut.tip='odamesaj';
            komut.mesaj=mesaj;
            fl_gonder($.toJSON(komut));
            $('#odachatinput').attr('value','');
        }
        else{
            mesajkutu("Deneme Kontrol","Uyarı");
        }
    }
}

function odauyelistesi(data){
    updateUserLevel();
    current_room = Object();
    current_room.id = parseInt(data.odaId);
    current_room.name = data.odaisim;
    //wallpost_room(data.odaisim);
    updateBanner(1);
    bekletme();
    if(ayrilirken){
        promote();
    }
    $('#rooms').hide(),
    $('#tables').show();
    $('#table_games').empty();
    $('#table_chat').empty();
    $('#gameArea').empty();
    $('#mainMenu').show();
    $('#inGameMenu').hide();
    $('#players').show();
    $('#playersMain').hide();
    /*if(uyebilgi.kazandi < avatar_kazanma_limit){
        $('#userbilgi_img').attr({'src':avatar_dummy,'rel':'avatar_dummy'});
    } else {
        $('#userbilgi_img').attr('src',userimg(uyebilgi.id));
    }
    if(uyebilgi.priority > 4 && $('.vip_kendi').length < 2){
        $('<div>').addClass('vip_23x23 vip_kendi').appendTo($('#userbilgi'));
    }
    $('#userbilgi_ad').html(uyebilgi.username).unbind().bind('click', function(){profilIste(uyebilgi.id)}).css('color',uyebilgi.renk);
    $('#userbilgi_puan').html(addCommas(uyebilgi.puan));*/
    $('#odalistesi_userbilgi_puan').html(addCommas(uyebilgi.puan));
    $('#table_name').html(data.odaisim);
    $('#table_point').html(addCommas(oda_isimleri[data.odaId].min)+' - '+addCommas(oda_isimleri[data.odaId].max)+' Puan');
    $('#yenioyunpuan').val(data.odapuan);
   
    var odaninustasi = $('#table_owner');
    odaninustasi.empty();
    
    $('.buyRoomPoint').html(addCommas(data.room_master_limit)+' Puan');
    $('#roomOwnerPromoPoint').html(addCommas(data.room_master_limit)+' Puan');
    $('#buyRoomInfo').html(data.odaisim+' odası '+data.price.fb+' Kredi ('+data.price.tl+' TL)');

    var room_master_html = '';
    if(data.room_master && data.room_master != null){
        current_room.room_master = data.room_master;
        if(data.room_master.type == 'owner'){
            room_expires_date = new Date(data.room_master.expires * 1000);
            room_point_rate = Math.ceil(100 * data.room_master.earned / data.room_master_limit);
            $('.buyRoomReady').hide();
            $('.buyRoomSold').show();
            var room_master_image = avatar_dummy;
            if(data.room_master.show_avatar == 1){
                room_master_image = userimg(data.room_master.id);
            }
            room_master_html += '<div class="roomOwned" id="roomOwned">';
            room_master_html += '<div class="playerPic"><span class="owner badge"></span><a href="javascript:;" onclick="profilIsteOffline('+data.room_master.id+');"><img width="50" height="50" src="'+room_master_image+'" alt="'+data.room_master.name+'"></a></div>';
            room_master_html += '<div class="ownerName"><a href="javascript:;" onclick="profilIsteOffline('+data.room_master.id+');">'+data.room_master.name+'</a></div>';
            room_master_html += '<div class="ownerPoints">';
            room_master_html += '<span class="title">Kazandığı Puan:</span>';
            room_master_html += '<div class="levelBar"><span class="barLength" style="width: '+room_point_rate+'%"></span><span class="barText">'+addCommas(data.room_master.earned)+' Puan</span></div>';
            room_master_html += '<a href="javascript:;" onclick="be_owner();"></a>';
            room_master_html += '</div>';
            room_master_html += '<div class="ownerInterval">';
            room_master_html += '<strong>Kalan Süre:</strong> <span id="ownerCountDown"></span>';
            room_master_html += '</div>';
            room_master_html += '<div class="roomOwnActions">';
            room_master_html += '<a id="be_owner" class="fancy blue medium button ownButton leftRadius" href="javascript:;" onclick="be_owner();" style="display:none"><span></span>Odanın Sahibi Ol!</a>';
            room_master_html += '<a id="be_master" class="fancy blue medium button masterButton rightRadius" href="javascript:;" onclick="be_master();" style="display:none"><span></span>Odanın Ustası Ol!</a>';
            room_master_html += '</div>';
            room_master_html += '</div>';
        } else {
            room_master_html += '<div class="roomOwner">';
            room_master_html += '<div class="playerPic">';
            //room_master_html += '<span class="vip badge"></span>';
            room_master_html += '<a href="javascript:;" onclick="profilIsteOffline('+data.room_master.id+');"><img src="'+userimg(data.room_master.id)+'" alt=""></a>';
            room_master_html += '</div>';
            room_master_html += '<div class="ownerName"><b>Odanın Ustası : </b><a href="javascript:;" onclick="profilIsteOffline('+data.room_master.id+');">'+data.room_master.name+'</a></div>';
            room_master_html += '<div class="roomOwnActions">';
            room_master_html += '<a id="be_owner" class="fancy yellowCp medium button ownButton fullRadius" href="javascript:;" onclick="be_owner();"><span class="icon-odanin-sahibi-ol"></span>Odanın Sahibi Ol!</a>';
            room_master_html += '<a id="be_master" class="fancy grayCp medium button masterButton fullRadius" href="javascript:;" onclick="be_master();"><span class="icon-odanin-ustasi-ol"></span>Odanın Ustası Ol!</a>';
            room_master_html += '</div>';
            room_master_html += '</div>';
            roomMasterExpired();
        }
    } else {
        room_master_html += '<div class="roomOwner">';
        room_master_html += '<div class="roomOwnActions">';
        room_master_html += '<a id="be_owner" class="fancy yellowCp medium button ownButton fullRadius" href="javascript:;" onclick="be_owner();"><span class="icon-odanin-sahibi-ol"></span>Odanın Sahibi Ol!</a>';
        room_master_html += '<a id="be_master" class="fancy grayCp medium button masterButton fullRadius" href="javascript:;" onclick="be_master();"><span class="icon-odanin-ustasi-ol"></span>Odanın Ustası Ol!</a>';
        room_master_html += '</div>';
        room_master_html += '</div>';
        roomMasterExpired();
    }
    $(room_master_html).appendTo(odaninustasi);
    if(data.room_master && data.room_master != null && data.room_master.type == 'owner'){
        $('#ownerCountDown').countdown('destroy');
        $('#ownerCountDown').countdown({until: room_expires_date,layout: '{dn} {dl} {hn}:{mn}:{sn}', onExpiry: roomMasterExpired});

        $('#roomCountdown').countdown('destroy');
        $('#roomCountdown').countdown({until: room_expires_date,layout: '{dn} {dl} {hn}:{mn}:{sn}', onExpiry: roomMasterExpired});
        if(room_expires_date.getTime() < new Date().getTime()){
            roomMasterExpired();
        }
    }

    $('#table_users').empty();
    var uyeler=data.uyeler;
    for(x=0;x<uyeler.length;x++){
        var oisim = uyeler[x].username;
        var opuan = addCommas(uyeler[x].puan);
        
        if(uyeler[x].id != uyebilgi.id && uyeler[x].kazandi < avatar_kazanma_limit){
            var uye_image = avatar_dummy;
        } else {
            var uye_image = userimg(uyeler[x].id);
        }

        var uye  = '<div class="item" isim="'+oisim+'" puan="'+opuan+'" id="onlineuyeid_'+uyeler[x].id+'_'+uyeler[x].priority+'">';
        uye += '<div class="playerPic">';
        if(uyeler[x].priority > 4){
            uye += '<span class="vip badge"></span>';
        }
        uye += '<a href="javascript:;" onclick="profilIsteOffline('+uyeler[x].id+')"><img src="'+uye_image+'" alt=""></a>';
        uye += '</div>';
        uye += '<div class="playerInfo">';
        uye += '<div class="pName" style="color:'+uyeler[x].renk+';cursor:pointer;" onclick="profilIsteOffline('+uyeler[x].id+')">'+oisim+'</div>';
        uye += '<div class="pPoints">'+opuan+' Puan</div>';
        uye += '</div>';
        uye += '</div>';

        listeyeKoy($(uye));
    }

    onlineSayisiBas();

    var oyunlar=data.oyunlar;
    for(x=0;x<oyunlar.length;x++){
        odaoyunekle(oyunlar[x]);
    }
    
    if(kaynak == 'hemenoyna'){
        var komut=new Object();
        komut.tip='hemenoyna';
        log("acelemiz var hemen oynayalim");
        fl_gonder($.toJSON(komut));
        beklet();
        kaynak = 'login';
    }
}

function roomMasterExpired(){
    $('#roomOwned').children('*[class!=roomOwnActions]').detach();
    $('#roomOwned').addClass('roomOwner').removeClass('roomOwned');
    $('#be_master').show();
    $('#be_owner').show();
    $('.buyRoomReady').show();
    $('.buyRoomSold').hide();
    if(!$.cookie('fbtavla_buy_room_promote')){
        $.cookie('fbtavla_buy_room_promote', '1', { expires: 1 });
        beklet('none');
        $('#roomOwnerPromo').show();
    }
}

function odaonlinelistesi(data){
    $('#table_users').empty();
    var uyeler=data.uyeler;
    for(x=0;x<uyeler.length;x++){
        var oisim = uyeler[x].username;
        var opuan = addCommas(uyeler[x].puan);
        
        if(uyeler[x].id != uyebilgi.id && uyeler[x].kazandi < avatar_kazanma_limit){
            var uye_image = avatar_dummy;
        } else {
            var uye_image = userimg(uyeler[x].id);
        }

        var uye  = '<div class="item" isim="'+oisim+'" puan="'+opuan+'" id="onlineuyeid_'+uyeler[x].id+'_'+uyeler[x].priority+'">';
        uye += '<div class="playerPic">';
        if(uyeler[x].priority > 4){
            uye += '<span class="vip badge"></span>';
        }
        uye += '<a href="javascript:;" onclick="profilIsteOffline('+uyeler[x].id+')"><img src="'+uye_image+'" alt=""></a>';
        uye += '</div>';
        uye += '<div class="playerInfo">';
        uye += '<div class="pName" style="color:'+uyeler[x].renk+';cursor:pointer" onclick="profilIsteOffline('+uyeler[x].id+')">'+oisim+'</div>';
        uye += '<div class="pPoints">'+opuan+' Puan</div>';
        uye += '</div>';
        uye += '</div>';

        listeyeKoy($(uye));
    }
    onlineSayisiBas();
}

function onlineSayisiBas(){
    $('#toplam_online').html('('+ $('#table_users').children().length +')');
}

function odaUyeKatildi(data){
    var gelenuye= data.uyebilgi;
    var oisim = gelenuye.username;
    var opuan = addCommas(gelenuye.puan);
    var uye = $('<div>').attr({
        'class':'onlineuye',
        'id':'onlineuyeid_'+gelenuye.id+'_'+gelenuye.priority,
        'isim':oisim,
        'puan':opuan
    });
    if(gelenuye.id != uyebilgi.id && gelenuye.kazandi < avatar_kazanma_limit){
        $('<img>').attr({'src':avatar_dummy,'rel':'avatar_dummy','class':'onlineuye_img'}).appendTo(uye);
    } else { 
        $('<img>').attr({'src':userimg(gelenuye.id),'class':'onlineuye_img'}).appendTo(uye);
    }
    $('<div>').attr({'class':'onlineuye_ad'}).html(oisim).css('color',gelenuye.renk).data('pid',gelenuye.id).bind('click', function(){profilIste($(this).data('pid'))}).appendTo(uye);
    $('<div>').attr({'class':'onlineuye_puan'}).html(opuan).appendTo(uye);
    listeyeKoy(uye);
    onlineSayisiBas();
}

function odaUyeAyrildi(data){
    $('#onlineuyeid_'+data.id).detach();
    onlineSayisiBas();
}

function ArkadasEklendi(uyeid){
    var uye = $('#onlineuyeid_'+uyeid).clone(true);
    $('#onlineuyeid_'+uyeid).remove();
    listeyeKoy(uye);
    onlineSayisiBas();
}

function listeyeKoy(suye){
    var uyebilgileri = suye[0].id.split('_');
    var uyeid = uyebilgileri[1];
    var priority = uyebilgileri[2];
    var fc = 'f0';
    var is_friend = false;
    if(typeof arkadaslar[uyeid] != "undefined"){
        fc = 'f1';
        is_friend = true;
    }
    suye.removeClass('f0');
    suye.removeClass('f1');
    suye.addClass(fc);
    var uyeliste = $('#table_users').children('.'+fc);
    var isim=suye.attr('isim').toUpperCase();
    var puan=suye.attr('puan').replace(/\./g,'') * 1;
    if(uyeliste.length){
        var sonraki=false;
        for(z=uyeliste.length-1;z>=0;z--){
            var disim=$(uyeliste[z]).attr('isim').toUpperCase();
            var dpuan=$(uyeliste[z]).attr('puan').replace(/\./g,'') * 1;
            var dpriority = uyeliste[z].id.split('_')[2];
            if(dpriority < priority){
                sonraki=uyeliste[z];
            } else if(dpriority == priority) {
                if(dpuan < puan){
                    sonraki=uyeliste[z]; 
                } else if(dpuan == puan){
                    if(isim.localeCompare(disim)<0){
                        sonraki=uyeliste[z];
                    } else {
                        break;
                    }
                }else {
                    break;
                }
            } else {
                break;
            }
        }
        if(sonraki){
            suye.insertBefore(sonraki);
        }
        else{
            if(is_friend){
                suye.insertBefore($('#table_users .f0').first());
            } else {
                suye.appendTo($('#table_users'));
            }
        }
    }
    else{
        if(is_friend){
            suye.prependTo($('#table_users'));
        } else {
            suye.appendTo($('#table_users'));
        }
    }
}

function odagelenmesaj(mesaj){
    var odam = $('<div>').attr({'class':'odachatmesajs'}).html(swearFilter(mesaj.mesaj));
    $('<b>').css('color',mesaj.uyebilgi.renk).data('pid',mesaj.uyebilgi.id).html(mesaj.uyebilgi.username+': ').prependTo(odam).bind('click',function(x){
        profilIsteOffline($(this).data('pid'));
    });
    odam.appendTo($('#table_chat'));
    $('#table_chat').scrollTop($('#table_chat')[0].scrollHeight);
    if(mesaj.uyebilgi.id!=uyebilgi.id){
        ses('mesaj');
    }
}

function odaoyunekle(oyundata){
      
    var oyun_html = '';
    oyun_html += '<div class="item radialGreyGradient" id="odaoyunid_'+oyundata.id+'">';
    oyun_html += '<div class="playerPic">';
    
    if(oyundata.uyebilgi.priority > 4){
        oyun_html += '<span class="vip badge"></span>';
    }
    
    if(oyundata.uyebilgi.id != uyebilgi.id && oyundata.uyebilgi.kazandi < avatar_kazanma_limit){
        var user_image = avatar_dummy;
    } else {
        var user_image = userimg(oyundata.uyebilgi.id);
    }

    oyun_html += '<a href="javascript:;" onclick="profilIsteOffline('+oyundata.uyebilgi.id+');"><img src="'+user_image+'" alt=""></a>';
    oyun_html += '</div>';
    oyun_html += '<div class="playerInfo">';
    oyun_html += '<div class="pName" style="color:#'+oyundata.uyebilgi.renk+';cursor:pointer;" onclick="profilIsteOffline('+oyundata.uyebilgi.id+');">'+oyundata.uyebilgi.username+'</div>';
    oyun_html += '<div class="pPoints"><span class="icon"></span>'+addCommas(oyundata.puan)+' Puan</div>';
    oyun_html += '<div class="pCount"><span class="icon"></span>Bitiş Sayısı : '+oyundata.sayi+'</div>';
    oyun_html += '<div class="pTime"><span class="icon"></span>'+oyundata.sure+' saniye</div>';
    oyun_html += '</div>';

    if(oyundata.hemen){
        var butonyazi='Hemen Oyna';
        var butonrenk='red';
    }
    else{
        var butonyazi='Katıl';
        var butonrenk='blue';
    }

    oyun_html += '<a class="fancy '+butonrenk+' small button playGame" href="javascript:;" onclick="oyunkatil('+oyundata.id+');$(this).html(\'Bekleniyor\').attr(\'onclick\',function(){});">'+butonyazi+'</a>';
    oyun_html += '</div>';    
    
    oyundiv = $(oyun_html);

    var oyunliste = $('#table_games').children();
    var isim=oyundiv.find('.pName').html().toUpperCase();
    if(oyunliste.length){
        var sonraki=false;
        for(z=oyunliste.length-1;z>=0;z--){
            var disim=$(oyunliste[z]).find('.pName').html().toUpperCase();
            if(isim.localeCompare(disim)<0){
                sonraki=oyunliste[z];
            }
            else{
                break;
            }
        }
        if(sonraki){
            oyundiv.insertBefore(sonraki);    
        }
        else{
            oyundiv.appendTo($('#table_games'));
        }
    }
    else{
        oyundiv.appendTo($('#table_games'));
    }
    
}

function odaoyunbasladi(oyundata){
    $('#odaoyunid_'+oyundata.id).detach();
}

function odaoyuniptal(oyundata){
    $('#odaoyunid_'+oyundata.id).detach();
}

function lobiyedon(){
    
}

function oyunkatil(oyunid){
    var komut=new Object();
    komut.tip='oyunkatil';
    komut.id=oyunid;
    fl_gonder($.toJSON(komut));    
}

function odadanayrilbutton(){
    $('#odauyeler_ayril').bind('click',function(){
        ayril();
    });
}

function puanyuklebutton(){
    $('#puanyukleb').bind('click',function(){
        var komut=new Object();
        komut.tip='puanyukle';
        fl_gonder($.toJSON(komut));        
    });
}

function yenilebutton(){
    $('#onlineyenile').bind('click',function(){
        var komut=new Object();
        komut.tip='oye';
        fl_gonder($.toJSON(komut));        
    });
}

function yenioyunbutton(){
    $('#yenioyunform').submit(function(){
        oyunkur($('#yenioyunpuan').attr('value'),$('#yenioyunsure').attr('value'),$('#yenioyunsayi').attr('value'),this.parentNode);
        return false;
    });
    $('#yenioyunb').bind('click',function(){
        $('#yenioyunmenu').dialog({
            modal: true,
            position: ['center',300],
            resizable: false,
            width: 200,
            buttons: {
                'Kur': function() {
                    oyunkur($('#yenioyunpuan').attr('value'),$('#yenioyunsure').attr('value'),$('#yenioyunsayi').attr('value'),this);
                },
                'Vazgeç': function() {
                        $(this).dialog('close');
                }
            }
        });
    });
}

function oyunkur(puan,sure,sayi,obj){
    var komut=new Object();
    komut.tip='oyunkur';
    komut.puan=puan;
    komut.sure=sure;
    komut.sayi=sayi;
    log(komut.puan + " puanlik oyun kuruyoruz");
    fl_gonder($.toJSON(komut));
    if(obj){
        $(obj).dialog('close');
    }
    beklet();
    og.newGame(puan);
}
