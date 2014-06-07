// ==UserScript==
                    // @name          VkOptions 1.0 beta
                    // @namespace     http://forum.mozilla-russia.org/viewtopic.php?id=28492
                    // @description   Vkontakte Options 1.0 beta for Mozilla Firefox
                    // @include       *
                    // ==/UserScript==
                    
                    
                    (function() {
                    
                    //--- Main Variables ---//
                    
                    //var vVersion    = 12.5;
                    
                    var vQuery    = '';
                    var vHost    = ''; 
                    var vPHP    = '';
                    var vAct    = null;
                    var vId        = null;
                    
                    
                    function prepareRequest2() {
                      var http_request = false;
                    
                      if (window.XMLHttpRequest) { // Mozilla, Safari,...
                          http_request = new XMLHttpRequest();
                          if (http_request.overrideMimeType) {
                              // See note below about this line
                          }
                      } else if (window.ActiveXObject) { // IE
                          try {
                              http_request = new ActiveXObject("Msxml2.XMLHTTP");
                          } catch (e) {
                              try {
                                  http_request = new ActiveXObject("Microsoft.XMLHTTP");
                              } catch (e) {}
                          }
                      }
                      if (!http_request) {
                        alert('Ошибка при создании XMLHTTP'); return false;
                      }
                      return http_request;
                    }
                    
                    
                    function VkoptInvis() {
                      var dc2 = document.cookie;
                      var melocation = '/'+location.href+'';
                    
                      if (dc2.indexOf("remixpass") != -1) 
                      {
                        http_request = prepareRequest2()
                        http_request.onreadystatechange = function() { 
                            if (http_request.readyState == 3 || http_request.readyState == 4) {
                                var aCookie = dc2.split("; ");
                                for (var i=0; i < aCookie.length; i++)
                                {
                                  var aCrumb = aCookie[i].split("=");
                                  cookieName = aCrumb[0];
                                  cookieValue = unescape(aCrumb[1]);
                                  
                                  if (cookieName == 'remixemail' || cookieName == 'remixmid' || cookieName == 'remixmgid' || cookieName == 'remixsid' || cookieName == 'remixpass') {
                                      today = new Date();
                                      expire = new Date();
                                      expire.setTime(today.getTime()+3600000*24*365);
                                      document.cookie= cookieName+ "="+ escape(cookieValue)+";expires="+ expire.toGMTString()+'; path=/; domain=.vkontakte.ru';
                                  }
                    
                                  dc2 = '';
                                }
                            }
                        }
                        http_request.open('GET', 'http://vkontakte.ru/login.php?op=logout');
                        http_request.send(1);
                      }
                    
                    
                    }
                    
                    
                    
                    
                    function VkoptInvisCheckBox() {
                      today = new Date();
                      expire = new Date();
                      expire.setTime(today.getTime()+3600000*24*365);
                      expire = expire.toGMTString();
                    
                      divs = document.getElementById('header').getElementsByTagName('h1')[0];
                      divs.innerHTML = divs.innerHTML.split('это Вы').join(' инвиз <input type="checkbox" name="VkoptInvisProfile" id="VkoptInvisProfile" onchange="if (document.cookie.indexOf(\'VkoptInvis=y\') != -1) { document.cookie=\'VkoptInvis=n;expires='+ expire + '\';window.location.reload();} else {document.cookie=\'VkoptInvis=y;expires='+ expire + '\';window.location.reload();}">');
                      if ((getCookie('VkoptInvis') == 'y')) {
                        document.getElementById('VkoptInvisProfile').checked= true;
                      }
                    }
                    
                    
                    function VkoptMultiRowStatus() {
                      document.getElementById('activity_editor').getElementsByTagName('td')[0].style.display='none';
                      document.getElementById('activity_editor').getElementsByTagName('td')[2].style.display='none';
                    
                      divs = document.getElementById('activity_editor').getElementsByTagName('td')[1].getElementsByTagName('div')[0];
                    
                      divs.innerHTML = '<div style="float: left"><textarea ROWS=4 COLS=40 style="background-position: center center;" class="inputtext" type="text" id="edit_activity_text" name="edit_activity_text" maxlength="160" onkeypress="key_code=event.keyCode||event.which;if(key_code!=13){return activity_editor.handle_key_press(event);}" /></textarea><a id="edit_activity_toggle" style=display:none href="#" onmousedown="return activity_editor.toggle_menu(event);" onclick="return false;">&nbsp;</a><br><nobr>&nbsp;<a href="#" onclick="activity_editor.submit_activity_set(ge(\'edit_activity_text\').value);" onclick="return false;">Сохранить</a> | <a href="#" onmousedown="return activity_editor.submit_activity_clear();" onclick="return false;">Удалить</a><span class="pipe"> | </span><a href="#" onmousedown="return activity_editor.hide();" onclick="return false;">Отмена</a></nobr></div>';
                    }
                    
                    
                    //--- Auxiliary functions ---//
                     
                    function setCookie(cookieName,cookieValue,nDays) 
                    {
                        var today = new Date();
                        var expire = new Date();
                        if (nDays==null || nDays==0) nDays=365;
                        expire.setTime(today.getTime()+ 3600000*24*nDays);
                        document.cookie= cookieName+ "="+ escape(cookieValue)+
                        ";expires="+ expire.toGMTString();
                    }
                     
                    function getCookie(name) 
                    {
                        var dc = document.cookie;
                        var prefix = name + "=";
                        var begin = dc.indexOf("; " + prefix);
                        if (begin == -1) 
                        {
                            begin = dc.indexOf(prefix);
                            if (begin != 0) return null;
                        }
                        else 
                        {
                            begin += 2;
                        }
                        var end = document.cookie.indexOf(";", begin);
                        if (end == -1) 
                        {
                            end = dc.length;
                        }
                        return unescape(dc.substring(begin + prefix.length, end));
                    }
                    
                    
                    
                    //--- Functions. Area: Vkontakte.ru ---//
                    function VkoptAudio() {
                        var bar = document.getElementById("audioBar");
                      var audios = document.getElementById('audios');
                      audiosinnerHTML = audios.innerHTML;
                      splitmp3s = '<img class="playimg" onclick="return operate(';
                      mp3s = audiosinnerHTML.split(splitmp3s);
                    
                      for (var i=0; i < mp3s.length; i++)
                      {
                        source = mp3s[i];
                        mp3 = source.split(")")[0];
                          if (mp3.substring(0,1)*1) {
                            splitmp3 = mp3.split(",");
                            mp3id = splitmp3[3].substring(1, splitmp3[3].length - 1);
                            mp3link = 'http://cs' + splitmp3[1] + '.vkontakte.ru/u' + splitmp3[2] + '/audio/' + mp3id + '.mp3';
                            withlink = source.split('play.gif">').join('play.gif"></td><td style="width: 20px; vertical-align:top"><a href= "'+ mp3link+ '"><img src= "http://vkontakte.ru/images/icons/audio_icon.gif"></a>');
                            //
                            audiosinnerHTML = audiosinnerHTML.split(source).join(withlink);
                            
                          }
                          
                       //source = splitmp3s+source;
                       
                      }
                      audios.innerHTML = audiosinnerHTML;
                    }
                    
                    
                    
                    function VkoptGroupsInCols()
                    /* Sdelat' spisok grupp na glavnoi stranitse v stolbik */
                    {
                        if (document.getElementById('groups'))
                            if (document.getElementById('groups').getElementsByTagName('div')[9])
                            {
                                if (document.getElementById('groups').getElementsByTagName('div')[9].innerHTML.split('</A>')[1]) // Opera-like uppercase tags
                                    document.getElementById('groups').getElementsByTagName('div')[9].innerHTML= 
                                    '&#x25AA; '+ document.getElementById('groups').getElementsByTagName('div')[9].innerHTML.split('</A>').join('</A><BR>');
                    
                                else if (document.getElementById('groups').getElementsByTagName('div')[9].innerHTML.split('</a>')) // FF-like lowercase tags
                                    document.getElementById('groups').getElementsByTagName('div')[9].innerHTML= 
                                    '&#x25AA; '+ document.getElementById('groups').getElementsByTagName('div')[9].innerHTML.split('</a>').join('</a><br>');
                            }
                    }
                    
                    
                    
                    function VkoptVideo()
                    /* knopki dlya:
                       skachivaniya video 
                       skachivaniya FLV-pleera
                       formirovaniya koda proigryvatelya dlya bloga*/
                    {
                        // adres thumbnail'a
                        var vStyle  = document.getElementById("flash_player_container_outer").style.background;
                        var uuThumb = vStyle.split('(')[1].split(')')[0];
                        if (uuThumb.split('"')[1])
                            uuThumb= uuThumb.split('"')[1];
                    
                        var j = 0;
                    
                        var sr = document.body.innerHTML;
                    
                        // vytseplyaem znacheniya peremennyh dovol'no kosym metodom
                        var uuHost = sr.split("addVariable('host'")[1].split("'")[1].split("');")[0];
                        var uuTag  = sr.split("addVariable('vtag'")[1].split("'")[1].split("');")[0];
                        var uuKid  = sr.split("addVariable('vkid'")[1].split("'")[1].split("');")[0];
                    
                        var uuLink = sr.split("addVariable('link'")[1].split("'")[1].split("');")[0];
                        var uuTitle= sr.split("addVariable('md_title'")[1].split("'")[1].split("');")[0];
                        var uuAuth = sr.split("addVariable('md_author'")[1].split("'")[1].split("');")[0];
                    
                        if (sr.split("addVariable('folder_id'")[1]) // адрес папки есть только у видео, загруженных текущим пользователем
                        {
                            var uuFold = sr.split("addVariable('folder_id'")[1].split("'")[1].split("');")[0];
                        }
                        else
                        {
                            var uuFold = '';
                        }
                    
                        var vPath  = 'http://'+ uuHost+ '/assets/videos/';
                        var vVideo = uuTag+ uuKid+ '.vk.flv';
                    
                        var vObject = 
                            '<object id="player" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="460" height="345" >'+
                            '<param name="movie" value="http:/'+ '/1.vkadre.ru/VkontaktePlayer.swf?14" />'+
                            '<param name="allowfullscreen" value="true" />'+
                            '<param name="flashvars" value="overstretch=false&vid='+
                            '&host='+ uuHost+
                            '&vtag='+ uuTag+
                            '&vkid='+ uuKid+
                            '&link='+ uuLink+
                            '&md_title='+ uuTitle+
                            '&md_author='+ uuAuth+
                            '&folder_id='+ uuFold+
                            '" />'+
                            '<embed type="application/x-shockwave-flash" src="http:/'+ '/1.vkadre.ru/VkontaktePlayer.swf?14" width="460" height="345" id="player" name="player" allowfullscreen="true" flashvars='+
                            '"overstretch=false&vid='+
                            '&host='+ uuHost+
                            '&vtag='+ uuTag+
                            '&vkid='+ uuKid+
                            '&link='+ uuLink+
                            '&md_title='+ uuTitle+
                            '&md_author='+ uuAuth+
                            '&folder_id='+ uuFold+
                            '" /></object>';
                    
                        // sobstvenno ob'ekt (vObject) vstavlyaem v krasivuyu tablitsu so ssylkoi na stranitsu s video
                    
                        var vEmbed=
                            '<table border= 0 cellspacing= 0 cellpadding= 0 style= "background-color: black;">'+
                            '<tr><td width="460" height="345" style= "background-image: url('+ uuThumb+
                            ');" id= "cont"><center>'+ vObject+ '</center></td></tr><tr><td><center><b><a href="'+
                            unescape(uuLink).split('+').join(' ')+
                            '" style= "font-family: Arial, Tahoma; color: #EEEEEE; font-size: 10pt;">'+
                            unescape(uuLink).split('+').join(' ')+
                            '</a></b></center></td></tr><tr style= "height: 2px;"><td style= "height: 2px;"></td></tr></table>';
                    
                    
                        // knopka dlya skachivaniya video
                        window.document.getElementById("videoactions").innerHTML+= 
                            '<a href= "'+ vPath+ vVideo+ '">Скачать&nbsp;<img src= "http://vkontakte.ru/images/icons/movie_icon.gif"></a>';
                        
                    
                        // knopka, pod kotoroy skryt input s kodom dlya bloga
                        if (getCookie('VkoptBlCod')!= 'n')
                        {
                            window.document.getElementById("videoactions").innerHTML+= 
                                '<a id= "cfthref" onmouseover= "this.style.display= \'none\'; document.getElementById(\'cft\').style.display= \'block\';" style= "display: block; cursor: pointer;">Код для блогов</a>'+
                                '<input id= "cft" style= "width: 148px; display: none;" type= "text" readonly value= "" onmouseout= "this.style.display= \'none\'; document.getElementById(\'cfthref\').style.display= \'block\';" onClick= "this.focus();this.select()">';
                            document.getElementById('cft').value= vEmbed;
                        }
                    }
                    
                    
                    
                    
                    function VkoptUnwrap()
                    /* razvorachivaet kartinki na stene v shirinu steny */
                    {
                        var j = 0;
                        var m = 0;
                        var iAddress = 0;
                        var iDiv = null;
                        var iNewImg = null;
                        var iNewA = null;
                    
                        var divs = document.getElementsByTagName('div');
                    
                        for (j= 0; j< divs.length; j++)
                        {
                            if (divs[j].getElementsByTagName('img')[0])
                                if (divs[j].getElementsByTagName('img')[0].className== 'iIcon')
                                {
                                    iNewImg= divs[j].getElementsByTagName('img')[1].src;
                                    iNewA= divs[j].getElementsByTagName('a')[1].href;
                    
                                    divs[j].innerHTML=
                                    '<div class="feedPhotos"><a href= "'+ iNewA+ '"><img src= "'+ iNewImg+ '" style= "width: 95%;"></a></div>';
                                }
                        }
                    }
                    
                    
                    function getCheckBox(name) {
                    
                      today = new Date();
                      expire = new Date();
                      expire.setTime(today.getTime()+3600000*24*365);
                      expire = expire.toGMTString();
                    
                      checkboxx = '<input type="checkbox" name="'+name+'" id="'+name+'" onchange="if (document.cookie.indexOf(\''+name+'=y\') != -1) { document.cookie=\''+name+'=n;expires='+ expire + '\';} else {document.cookie=\''+name+'=y;expires='+ expire + '\';}"';
                      if ((getCookie(name) == 'y')) {
                        checkboxx+= ' checked';
                      }
                      return checkboxx +'>';
                    }
                    
                    
                    function VkoptSettings(vkMode)
                    /* Formiruet stranitsu s nastroikami 
                       vkMode = 0 --> pokazat'
                       vkMode = 1 --> sohranit' i pokazat' */
                    {
                      settingDiv = document.getElementById('content').getElementsByTagName('div')[1];
                      //alert(settingDiv.innerHTML);
                      
                      
                      var services = {
                        VkoptInvis : 'Псевдо-невидимость',
                        VkoptInvisCheckBox : 'Иконка смены невидимости',
                        VkoptAudio : "Ссылки на аудио-файлы",
                        VkoptVideo : "Ссылки на видео-файлы",
                        VkoptRowStatus : "Многострочный статус",
                        //VkoptBlCod : "Код видео для блогов",
                        //VkoptDownPlayer : 'Показывать "Cкачать FLV плеер"',
                        //VkoptEG : 'Выделить всех',
                        //VkoptImage : 'Авто-развертка картинок на стене',
                        //VkoptNotify : 'Уведомлять о выходе новой версии',
                        VkoptGroupsInCols : 'Группы в столбик',
                      }
                    
                    
                    
                      dopOPTions = '<div id="password2" class="settingsPanel"><h4>Специальные настройки</h4>'+
                      'Дополнительные возможности вконтакте (настройки сохраняются автоматически)'+
                      '<table class="editor" style="margin-left:0px" border="0" cellspacing="0">'+
                      ' <tr>'+
                      '  <td class="label" style="width:10px"></td>'+
                      '  <td>'+
                      '   <table class="feedMenu" cellpadding=0 cellspacing=0 border=0>';
                      
                      for (var k in services) {
                        dopOPTions+= '<tr><td width="200" style="text-align:right;">'+services[k]+' &nbsp;</td><td id="fcbox">'+getCheckBox(k)+'</td></tr>';
                      }
                      
                    
                      
                      dopOPTions+= '</table></td></tr></table>';
                    
                    
                        settingDiv.innerHTML = dopOPTions + settingDiv.innerHTML;
                    
                    
                    }
                    
                    
                    
                    
                    
                    //--- Functions. Area: Vkadre.ru ---//
                    
                    
                    function VkoptVideoVkadre()
                    /* knopka dlya skachivaniya video */
                    {
                        var sr = document.body.innerHTML;
                    
                        // vytseplyaem znacheniya peremennyh dovol'no kosym metodom
                        var uuHost = sr.split("addVariable('host'")[1].split("'")[1].split("');")[0];
                        var uuTag  = sr.split("addVariable('vtag'")[1].split("'")[1].split("');")[0];
                        var uuKid  = sr.split("addVariable('vkid'")[1].split("'")[1].split("');")[0];
                    
                        var uuLink = sr.split("addVariable('link'")[1].split("'")[1].split("');")[0];
                        var uuTitle= sr.split("addVariable('md_title'")[1].split("'")[1].split("');")[0];
                        var uuAuth = sr.split("addVariable('md_author'")[1].split("'")[1].split("');")[0];
                    
                        if (sr.split("addVariable('folder_id'")[1]) // адрес папки есть только у видео, загруженных текущим пользователем
                        {
                            var uuFold = sr.split("addVariable('folder_id'")[1].split("'")[1].split("');")[0];
                        }
                        else
                        {
                            var uuFold = '';
                        }
                    
                        var vPath  = 'http://'+ uuHost+ '/assets/videos/';
                        var vVideo = uuTag+ uuKid+ '.vk.flv';
                    
                        document.getElementById('first-panel').innerHTML= 
                            document.getElementById('first-panel').innerHTML.split('<br')[0].split('<BR')[0]+
                            '<a href= "'+ vPath+ vVideo+ '" class= "desel" style= "position: relative; top: -2px;">Download <img src= "http://vkopt.nm.ru/vk.gif" border= 0></a>'+
                            '<br clear="both" style="clear:both" />';
                    }
                    
                    
                    
                    
                    function AvkDisplayEnv()
                    {
                        alert
                        (
                            'Env|variables:'+
                            '\nvHost = '+ vHost+
                            '\nvPHP  = '+ vPHP+
                            '\nvAct  = '+ vAct+
                            '\nvId   = '+ vId 
                        );
                    }
                    
                    
                    
                    //--- Start Function ---//
                    
                        var Splinter =    location.href.split('/');
                    
                        // adres Host'a
                        var vHost =    Splinter[2].split('.').reverse()[1]; // s podvyvertom, no zato vozvraschaet "vkontakte" dazhe esli na samom dele eto zerkalo (cs00 i t. d.)
                    
                        // stranitsa (vsyo posle "vkontakte.ru/")
                        var Page =    Splinter.reverse()[0];
                    
                    
                    //--- Area: Vkontakte.ru---//
                    
                        if (vHost== 'vkontakte')
                        {
                            if (Page.split('.')[1]) // pryamoe ukazanie na PHP-fail
                                vPHP= Page.split('.')[0];
                        
                            if (Page.split('?')[1]) // est' query
                            {
                                vQuery= Page.split('?')[1];
                                if (Page.split('?')[2]) vQuery+= Page.split('?')[2]; // po-moemu, eto na sluchai ./idNNN?MMM
                                if (vQuery.split('act=')[1]) 
                                {
                                    vAct= vQuery.split('act=')[1].split('&')[0];
                                }
                                else
                                {
                                    vAct= false; // uzhe ne pomnyu v chem smysl, no tak nado!
                                }
                    
                                if (vQuery.split('id=')[1])
                                {
                                    vId= vQuery.split('id=')[1].split('&')[0];
                                }
                            }
                            else
                            {
                                if (Page.split('club')[1])
                                {
                                    vId= Page.split('club')[1];
                                }
                                if (Page.split('id')[1])
                                {
                                    vId= Page.split('id')[1];
                                }
                            }
                    
                            if (!Page.split('.')[1]) // ne PHP-ssylka ("/club1" vmesto "/groups.php?act=s&id=1")
                            {
                                vPHP= Page.split('')[0]+ Page.split('')[1];
                            
                                if (vPHP== 'id')
                                    vPHP= 'profile';
                                if (vPHP== 'cl')
                                    vPHP= 'groups';
                                if (vPHP== 'vi')
                                    vPHP= 'video';
                                if (vPHP== 'ev')
                                    vPHP= 'events';
                            }
                    
                    
                    //AvkDisplayEnv();
                        
                            if (vHost== 'vkontakte' && (getCookie('VkoptInvis')!= 'n'))
                                VkoptInvis();
                    
                            if ((vPHP== 'settings') && !vAct)
                                VkoptSettings(0);
                    
                        if ((vPHP== 'profile') && (getCookie('VkoptInvisCheckBox')== 'y'))
                          VkoptInvisCheckBox();
                        
                        if ((vPHP== 'profile') && (getCookie('VkoptRowStatus')== 'y'))
                          VkoptMultiRowStatus();
                    
                            if ((vPHP== 'video') && (vAct!= 'really_nothing') && (getCookie('VkoptVideo')!= 'n'))
                                VkoptVideo();
                    
                    
                    
                            if ((vPHP== 'profile') && (getCookie('VkoptGroupsInCols')!= 'n'))
                                VkoptGroupsInCols();
                    
                            if ((vPHP== 'friends') && (location.href.split('noimages=')[1])) // nuzhno dlya togo, chtoby v messendzhere bystree zagruzhalsya kontakt-list
                                {
                                    var k = 0;
                                    while (document.getElementsByTagName('div')[k])
                                    {
                                        if ((document.getElementsByTagName('div')[k].attributes['class']) &&
                                            (document.getElementsByTagName('div')[k].attributes['class'].value== 'image'))
                                        {
                                            document.getElementsByTagName('div')[k].innerHTML= document.getElementsByTagName('div')[k].getElementsByTagName('img')[0].src;
                                        }
                                        k++;
                                    }
                                }
                    
                    
                        }
                    
                    //--- Area: Vkadre.ru---//
                    /*
                        if ((vHost== 'vkadre') && (location.href.split('video')[1]))
                            VkoptVideoVkadre();
                    */
                    
                    })();