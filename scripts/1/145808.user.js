// ==UserScript==
// @name           Rooms++
// @version        0.9
// @namespace      klavogonki
// @author         _XimiquE_ && lottor
// @description    creates rooms in chat
// @include        http://klavogonki.ru/gamelist*
// ==/UserScript==
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function ChatExtention()
{
   var readyStateCheckInterval = setInterval(function ()
   {
      if(document.readyState === "complete" && chat && chat.connected && chat.connection.connected)
      {
         clearInterval(readyStateCheckInterval);
         if(Strophe.getNodeFromJid(chat.connection.jid).length > 6) return true;
//+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
Event.stopObserving($$('#chat-title .mostright').last(), 'click');
Event.stopObserving($$('#chat-title .dummy .hide-bar').last(), 'click');
Event.stopObserving($$('#chat-title .active.c')[0], 'click');
$$('#chat-title .active.l')[0].setAttribute('class', 'general mostleft l active');
$$('#chat-title .active.c')[0].setAttribute('class', 'general c active');
$$('#chat-title .active.c')[0].setAttribute('onclick','chat.changeActiveRoom("general")');
$$('#chat-title .active.r')[0].setAttribute('class', 'general r active');
var t = document.createElement('td');
t.innerText = '[+]';
t.setAttribute('class', 'addroom');
t.style.width = '20px';
t.style.backgroundColor = '#cec6ae';
t.style.textAlign = 'center';
t.style.cursor = 'pointer';
t.setAttribute('onclick','chat.createRoom(); return false;');
$$('#chat-title tr')[0].insertBefore(t, $$('#chat-title tr .dummy')[0]);
var x = document.createElement('td');
x.className = 'roomlist';
x.innerHTML = '<div class="roomlist-content" style="overflow: auto; height: ' + $$("#chat-general td.userlist > div")[0].style.height + ';"></div>';
x.style.width = '130px';
x.style.minWidth = '100px';
x.style.borderWidth = '3px';
x.style.borderStyle = 'solid';
x.style.backgroundColor = 'white';
x.style.borderColor = '#E7E3D7';
x.style.padding = '3px 3px 3px 6px';
$$('#chat-general tr')[0].appendChild(x);
$$('#chat-general td.userlist')[0].style.width = '170px';
$$('#chat-general td.userlist')[0].style.borderWidth = '3px';
$$('#chat-general td.userlist')[0].style.borderStyle = 'solid';
$$('#chat-general td.userlist')[0].style.backgroundColor = 'white';
$$('#chat-general td.userlist')[0].style.borderColor = '#E7E3D7';
$$('#chat-general td.messages')[0].style.borderWidth = '3px';
$$('#chat-general td.messages')[0].style.borderStyle = 'solid';
$$('#chat-general td.messages')[0].style.backgroundColor = 'white';
$$('#chat-general td.messages')[0].style.borderColor = '#E7E3D7';
$('chat-general').select('.messages > div').last().scrollTop = $('chat-general').select('.messages > div').last().scrollHeight;
window.chat.rooms_server = [];
window.chat.created_rooms = [];
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.cookieRooms = function (room,del,pass)
{
   if(!getPrefCookie('chat-hiddenRoom')) setPrefCookie('chat-hiddenRoom','');
   var roomsarray = getPrefCookie('chat-hiddenRoom').split(/\s* /);
   roomsarray.splice(0, 1);
   roomsarray.pop();
   if(room)
   {
      for(var i = 0; i < roomsarray.length; i++)
            if(!roomsarray[i].indexOf(room+'_')) room = roomsarray[i];
      if(del)
      { 
         setPrefCookie('chat-hiddenRoom', getPrefCookie('chat-hiddenRoom').replace(' ' + room + ' ', ''));
      }
      else if(!roomsarray.include(room))
      {
         setPrefCookie('chat-hiddenRoom', getPrefCookie('chat-hiddenRoom') + ' ' + room + ' ');
      }
      else if(pass)
      { 
         return room.split('_')[1];
      }
   }
   else
   {
      return roomsarray;
   }
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.configRoom = function (args)
{
      var pass = args.pass;
      var room = args.room;
      chat.connection.send(
      $iq({to: room + '@conference.jabber.klavogonki.ru', type: 'set'})
      .c('query', {xmlns: 'http://jabber.org/protocol/muc#owner'})
         .c('x', {xmlns: 'jabber:x:data', type: 'submit'})
            .c('field', {var: 'FORM_TYPE'})
               .c('value').t('http://jabber.org/protocol/muc#roomconfig').up().up()
            .c('field', {var: 'muc#roomconfig_persistentroom'})
               .c('value').t('0').up().up()
            .c('field', {var: 'muc#roomconfig_publicroom'})
               .c('value').t('1').up().up()
            .c('field', {var: 'public_list'})
               .c('value').t('1').up().up()
            .c('field', {var: 'muc#roomconfig_passwordprotectedroom'})
               .c('value').t('1').up().up()
            .c('field', {var: 'muc#roomconfig_roomsecret'})
               .c('value').t(pass).up().up()
            .c('field', {var: 'muc#roomconfig_maxusers'})
               .c('value').t('100').up().up()
            .c('field', {var: 'muc#roomconfig_whois'})
               .c('value').t('anyone').up().up()
            .c('field', {var: 'muc#roomconfig_membersonly'})
               .c('value').t('0').up().up()
            .c('field', {var: 'muc#roomconfig_moderatedroom'})
               .c('value').t('1').up().up()
            .c('field', {var: 'members_by_default'})
               .c('value').t('1').up().up()
            .c('field', {var: 'muc#roomconfig_changesubject'})
               .c('value').t('0').up().up()
            .c('field', {var: 'allow_private_messages'})
               .c('value').t('1').up().up()
            .c('field', {var: 'allow_private_messages_from_visitors'})
               .c('value').t('anyone').up().up()
            .c('field', {var: 'allow_query_users'})
               .c('value').t('0').up().up()
            .c('field', {var: 'muc#roomconfig_allowinvites'})
               .c('value').t('1').up().up()
            .c('field', {var: 'muc#roomconfig_allowvisitorstatus'})
               .c('value').t('0').up().up()
            .c('field', {var: 'muc#roomconfig_allowvisitornickchange'})
               .c('value').t('0').up().up()
            .c('field', {var: 'muc#roomconfig_allowvoicerequests'})
               .c('value').t('0').up().up()
            .up().up().tree());
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.show_popup = function (a)
{
   $(a).setStyle({height: $(document.body).getHeight() + 1000 + "px",width: $(document.body).getWidth() + "px"});
   $(a).show();
   $(a).select("input[type=button]")[0].focus()
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.setChatHeight = function (height, withMargin)
{
   var elems = $$('#chat-wrapper .messages-content');
   for(var i = 0; i < elems.length; i++)
   elems[i].setStyle({height: height - 6 + 'px'});
   elems = $$('#chat-wrapper .userlist-content, #chat-wrapper .smile-tab');
   for(var i = 0; i < elems.length; i++)
   elems[i].setStyle({height: height + 26 + 'px'});
   elems = $$('#chat-wrapper .roomlist-content');
   for(var i = 0; i < elems.length; i++)
   elems[i].setStyle({height: height + 26 + 'px'});
   if(withMargin) $('chat-wrapper').setStyle({marginTop: height + 5 + 'px'});
   setPrefCookie(chat.params.game_id ? 'chat-game-height' : 'chat-general-height', height - 6);
   recalcFixedChat();
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.toggleChatVisible = function ()
{
   if($('chat-wrapper').parentNode.id == 'chat-inline-placeholder') return;
   $('chat-wrapper').toggleClassName('hidden');
   setPrefCookie('chat-general-hide', $('chat-wrapper').hasClassName('hidden'));
   recalcFixedChat();
   if($('chat-wrapper').hasClassName('hidden'))
   {
      if(chat.resize) delete chat.resize;
      chat.leaveRoom('general');
      $$('#chat-title .mostright').last().title = 'Открыть';
   }
   else if(!$('chat-wrapper').hasClassName('hidden'))
   {
      chat.enterRoom('general');
      if(chat.active_room != 'general')
      {
         $$('#chat-title .' + chat.active_room + '.c span').last().removeClassName('new');
         if(chat.blink_new_ingame)
         {
            clearInterval(chat.blink_new_ingame);
            chat.blink_new_ingame = null;
         }
      }
      $$('#chat-title .mostright').last().title = 'Закрыть';
   }
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.chat.onPresence = function (msg)
{
   var user_id = Strophe.getResourceFromJid(msg.getAttribute('from'));
   if (!(/^[0-9]{2,7}$/.test(user_id))) return true;
   var room = Strophe.getNodeFromJid(msg.getAttribute('from'));
   this.real_jids[user_id] = '';
   var x = getElementByAttribute(msg, 'x', 'xmlns', 'http://jabber.org/protocol/muc#user');
   if(x)
   {
      var items = x.getElementsByTagName('item');
      if(items.length)
      {
         var jid = items[0].getAttribute('jid');
         if(jid)
         {
            this.real_jids[user_id] = jid;
         }
      }
   }
   if(this.user_list[room] == undefined) this.user_list[room] = [];
   if(msg.getAttribute('type') == 'unavailable')
   {
      if(this.user_list[room].indexOf(user_id) != -1) this.user_list[room].splice(this.user_list[room].indexOf(user_id), 1);
      this.user_list_dirty[room] = true;
      x = getElementByAttribute(msg, 'x', 'xmlns', 'http://jabber.org/protocol/muc#user');
      if(x)
      {
         var status = x.getElementsByTagName('status');
         if(status.length && status[0].getAttribute('code') == 307)
         {
            var item = x.getElementsByTagName('item');
            var reason = item[0].childNodes[0];
            var reason_data = Strophe.getText(reason).split(':');
            var reason_periods = {
               1: '1 минуту',
               5: '5 минут',
               10: '10 минут',
               30: '30 минут',
               60: '1 час',
               180: '3 часа',
               360: '6 часов',
               720: '12 часов',
               1440: 'сутки',
               4320: '3 суток'
            };
            this.addMsgInList(
            {
               room: room,
               text: 'заблокирован на ' + reason_periods[reason_data[1]] + ' модератором ' + reason_data[0] + ' по причине: ' + reason_data[2],
               user_id: user_id,
               time: new Date(),
               type: 'system'
            });
            if(this.params.user && user_id == this.params.user.id)
            {
               $$('#chat-general .messages input.send').each(function (el){el.disabled = true;});
               this.connection.disconnect();
            }
         }
      }
   }
   else if(msg.getAttribute('type') == 'error')
   {
      if(getElementByAttribute(msg, 'not-authorized', 'xmlns', 'urn:ietf:params:xml:ns:xmpp-stanzas'))
      {
         if(getPrefCookie('chat-hiddenRoom').indexOf(room + '_') == -1)
            popalert('Неверный пароль!');
         cookieRooms(room,true);
      }
      else if(getElementByAttribute(msg, 'registration-required', 'xmlns', 'urn:ietf:params:xml:ns:xmpp-stanzas'))
      {
         popalert('Эта комната закрыта для общего доступа!');
      }
   }
   else
   {
      if(this.user_list[room].indexOf(user_id) == -1)
      {
         var x = getElementByAttribute(msg, 'x', 'xmlns', 'klavogonki:userdata');
         if(x)
         {
            var data = xml2array(x);
            if(data.user)
            {
               data.user = this.filterUserData(data.user);
               this.user_data[user_id] = data;
               this.user_list[room].push(user_id);
               this.user_list_dirty[room] = true;
            }
         }
         else
         {
            this.user_data[user_id] = {user: {login: Strophe.getNodeFromJid(this.real_jids[user_id]),background: '#000000'}};
            this.user_list[room].push(user_id);
            this.user_list_dirty[room] = true;
         }
         if(user_id == Strophe.getNodeFromJid(this.connection.jid))
         {
            x = getElementByAttribute(msg, 'x', 'xmlns', 'http://jabber.org/protocol/muc#user');
            var item = x.childNodes[0];
            this.role[room] = item.getAttribute('role');
         }
      }
      if(room != 'general' && !this.rooms.include(room))
      {
          if(user_id == Strophe.getNodeFromJid(this.connection.jid)) this.initRoom(room);
          if(this.created_rooms.include(room) && getPrefCookie('chat-hiddenRoom').indexOf(room + '_') != -1)
          {
             this.created_rooms.splice(this.created_rooms.indexOf(room), 1);
             var roomsarray = cookieRooms();
             for(var i = 0; i < roomsarray.length; i++)
                if(!roomsarray[i].indexOf(room + '_')) room = roomsarray[i];           
             configRoom({room: room.split('_')[0],pass: room.split('_')[1]});
          }
      }
   }
   return true;
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.chat.onIq = function (msg)
{
   var html = '';
   var roomname = '';
   var ownerTools = '';
   var query = undefined;
   var error = undefined;
   var room = Strophe.getNodeFromJid(msg.getAttribute('from'));
   if(query = getElementByAttribute(msg, 'query', 'xmlns', 'http://jabber.org/protocol/disco#items'))
   {
      var items = query.getElementsByTagName('item');
      if(items.length) this.rooms_server = [];
      for(var i = 0; i < items.length; i++)
      {
         var name = items[i].getAttribute('name');
         if(name)
         {
            roomname = name.split(' ')[0];
            this.rooms_server[i] = roomname;    
            if(roomname == 'general') name = 'Общий чат ' + name.split(' ')[1];
            if(roomname.indexOf('game'))
            {
               if(this.rooms.include(roomname))
               {
                  ownerTools = (this.role[roomname] == 'moderator') ? '<a class=name title="Задать пароль" style="cursor: pointer;" onclick="chat.protectRoom(chat.rooms_server[' + i + ']);"> ❖</a>' : '';
                  html += '<ins style="color: green;">'+name+' '+ownerTools+'</ins>';
               }
               else
               {
                  html += '<ins><a class=name title="Войти в комнату" style="cursor: pointer;" onclick="chat.queryRoom(chat.rooms_server[' + i + ']);">' + name + '</a></ins>';
               }
            }
            for(var n = 0; n < chat.rooms.length; n++)
               $('chat-' + this.rooms[n]).select('.roomlist-content').last().update(html);
         }
      }
   }
   else if(query = getElementByAttribute(msg, 'query', 'xmlns', 'http://jabber.org/protocol/disco#info'))
   {
      if(getElementByAttribute(msg, 'item-not-found', 'xmlns', 'urn:ietf:params:xml:ns:xmpp-stanzas'))
      {
         chat.created_rooms.push(room);
         this.enterRoom(room);              
      }
      else
      {
         var features = query.getElementsByTagName('feature');
         for(var i = 0; i < features.length; i++)
         {
            var vaar = features[i].getAttribute('var');
            if(vaar == 'muc_passwordprotected')
            {
               if(getPrefCookie('chat-hiddenRoom').indexOf(room + '_') != -1)
                  this.enterRoom(room+'_'+cookieRooms(room,null,1));
               else if(getPrefCookie('chat-hiddenRoom').indexOf(' '+room+' ') != -1)
                  cookieRooms(room,true);
               else  
               popconfirm('Выбранная комната защищена паролем!</br>Для доступа введите пароль: <input type=text id=pass>',
               function ()
               {
                  var myPass = $('pass').value;
                  room +='_'+myPass;
                  cookieRooms(room);
                  chat.enterRoom(room);
               });
            }
            else if(vaar == 'muc_unsecured')
            {
               this.enterRoom(room);
            }
         }
      }
   }
   return true;
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.chat.addMsgInList = function (args)
{
   try {var user = this.user_data[args.user_id].user;}catch (e) {return;}
   if(args.user_id.length > 7) return;
   var time = args.time.getHours() + ':' + args.time.getMinutes().format() + ':' + args.time.getSeconds().format();
   var room_html = '';
   if(args.type == 'game') room_html = '<span class=room>[заезд]</span>';
   if(args.type == 'private')
   {
      if(args.to) room_html = '<a href="javascript:chat.insertPrivate(' + args.to_id + ');" class="room private">[шепчет ' + args.to + ']</a>';
      else room_html = '<a href="javascript:chat.insertPrivate(' + args.user_id + ');" class="room private">[шепчет вам]</a>';
   }
   var cont_outer = $('chat-' + args.room).select('.messages > div').last();
   var cont = $('chat-' + args.room).select('.messages > div > div').last();
   var needScroll = (cont_outer.scrollTop + cont_outer.getHeight()) >= cont_outer.scrollHeight;
   args.text = args.text.replace(/</g, '&lt;');
   args.text = args.text.replace(/>/g, '&gt;');
   args.text = args.text.replace(/http:\/\/(?:www\.)?klavogonki\.ru\/g\/\?gmid=(\d+)\&?/g, '[<a class="gamelink-not-resolved gamelink-$1" href="/g/?gmid=$1">Заезд #$1</a>]');
   args.text = args.text.replace(/http:\/\/([^ ]*)/g, '<a target=_blank href="http://$1">http://$1</a>');
   if(this.filter)
   {
      var replace_str = '$1<span class=censored>[вырезано]</span>';
      args.text = args.text.replace(/­/g, '');
      args.text = ' ' + args.text + ' ';
      args.text = args.text.replace(/([^а-яА-Я])[а-яА-Я]*[хxΧ]+[уy]+[eеийяё]+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);
      args.text = args.text.replace(/([^а-яА-Я])[хxΧ]+[уy]+ю+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);
      args.text = args.text.replace(/([^а-яА-Я])[а-яА-Я]*м+у+д+[^рс]+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);
      args.text = args.text.replace(/([^а-яА-Я])[а-яА-Я]*[аеeoиоуыьъ]+[eеё]+б+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);
      args.text = args.text.replace(/([^а-яА-Я])[eеё]+б+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);
      args.text = args.text.replace(/([^а-яА-Я])[а-яА-Я]*п+[иeеё]+[cсз]+д+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);
      args.text = args.text.replace(/([^а-яА-Я])[а-яА-Я]*б+л+я+д+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);
      args.text = args.text.replace(/([^а-яА-Я])б+л+я+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);
      args.text = args.text.replace(/([^а-яА-Я])[а-яА-Я]*п+и+д+[оеаeo]+[рp]+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);
      args.text = args.text.replace(/([^а-яА-Я])[а-яА-Я]*г+[aoао]+в+[eеё]*н+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);
      args.text = args.text.replace(/([^а-яА-Я])[cс]+ц*у+[кч]+[eеaoаои]+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);
      args.text = args.text.replace(/^ (.*) $/, '$1');
   }
   while(/([^\/ ­]{40,})([^\/ ­]{40,})/.test(args.text))
   {
      args.text = args.text.replace(/([^\/ ­]{40,})([^\/ ­]{40,})/, '$1­$2');
   }
   args.text = args.text.replace(/­/, '<wbr/>');
   var smilies = {
      smile: /(:-\)|:\)|:smile:)/g,
      biggrin: /(:-D|:D|:biggrin:)/g,
      angry: /(>:\(|:angry:)/g,
      blink: /(oO|Oo|o_O|O_o|оО|Оо|о_О|О_о|:blink:)/g,
      blush: /:blush:/g,
      cool: /(8\)|:cool:)/g,
      dry: /:dry:/g,
      excl: /:excl:/g,
      happy: /(\^\^|\^_\^|:happy:)/g,
      huh: /:huh:/g,
      laugh: /:laugh:/g,
      mellow: /:mellow:/g,
      ohmy: /:ohmy:/g,
      ph34r: /:ph34r:/g,
      rolleyes: /:rolleyes:/g,
      sad: /(:\(|:-\(|:sad:)/g,
      sleep: /:sleep:/g,
      tongue: /(:P|:-P|:Р|:-Р|:tongue:)/g,
      unsure: /:unsure:/g,
      wacko: /(\%\)|:wacko:)/g,
      wink: /(;\)|;-\)|:wink:)/g,
      wub: /:wub:/g,
      first: /:first:/g,
      second: /:second:/g,
      third: /:third:/g,
      power: /:power:/g,
      badcomp: /:badcomp:/g,
      complaugh: /:complaugh:/g,
      girlnotebook: /:girlnotebook:/g,
      crazy: /:crazy:/g,
      boredom: /:boredom:/g,
      cry: /:cry:/g,
      bye: /:bye:/g,
      dance: /:dance:/g,
      gamer: /:gamer:/g,
      rofl: /:rofl:/g,
      beer: /:beer:/g,
      kidtruck: /:kidtruck:/g,
      angry2: /:angry2:/g,
      spiteful: /:spiteful:/g,
      sorry: /:sorry:/g,
      boykiss: /:boykiss:/g,
      girlkiss: /(:girlkiss:|:\*|:-\*)/g,
      kissed: /:kissed:/g,
      yes: /:yes:/g,
      no: /:no:/g,
      hi: /:hi:/g,
      ok: /:ok:/g
   };
   for(var name in smilies)
   {
      args.text = args.text.replace(smilies[name], '<img class=smile src="/img/smilies/' + name + '.gif" alt=":' + name + ':" title=":' + name + ':">');
   }
   args.text = args.text.replace(/script/g, 'sсript');
   if(args.type == 'system') cont.insert('<p><span class=time>[' + time + ']</span><span class=system-message>Пользователь ' + user.login + ' ' + args.text + '</span></p>');
   else if(args.type == 'private') cont.insert('<p><span class=time>[' + time + ']</span><span class=username style="color:' + user.background + '">&lt;<span onclick="chat.insertPrefix(' + args.user_id + ');">' + user.login + '</span>&gt;</span>' + room_html + '<span class=private>' + args.text + '</span></p>');
   else cont.insert('<p><span class=time>[' + time + ']</span><span class=username style="color:' + user.background + '">&lt;<span onclick="chat.insertPrefix(' + args.user_id + ');">' + user.login + '</span>&gt;</span>' + room_html + args.text + '</p>');
   var links = cont.select('.gamelink-not-resolved');
   for(var i = 0; i < links.length; i++)
   {
      var m = links[i].className.match(/gamelink-(\d+)/);
      var els = $$('.gamelink-not-resolved.gamelink-' + m[1]);
      for(var j = 0; j < els.length; j++)
      els[j].removeClassName('gamelink-not-resolved');
      new Ajax.Request('/ajax/fetchgameinfo',
      {
         method: 'get',
         parameters: {
            game: m[1]
         },
         onSuccess: function (transport)
         {
            eval('var json=' + transport.responseText + ';');
            var text = '';
            if(json.type == 'practice') return;
            if(json.type == 'private') text = 'Игра с друзьями ';
            if(json.type == 'normal') text = 'Открытая игра ';
            if(json.competition)
            {
               text = 'Соревнование '
               if(json.regular_competition) text += '(x' + json.regular_competition + ') ';
            }
            text += json.gametype_html;
            var els = $$('.gamelink-' + json.game_id);
            for(var j = 0; j < els.length; j++)
            els[j].update(text);
         }
      });
   }
   if(needScroll) cont_outer.scrollTop = cont_outer.scrollHeight;
   if(args.room != 'general' && (this.active_room != args.room || $('chat-wrapper').hasClassName('hidden')) && this.blink_new_ingame == null)
      this.blink_new_ingame = setInterval(function (){$$('#chat-title .' + args.room + '.c span').last().toggleClassName('new')}, 500);
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.chat.queryRoom = function (myRoom)
{
   if(chat.rooms.length >= 10)
   {
      popalert('Вы уже находитесь в максимально возможном числе комнат,</br>для входа в выбранную комнату выйдите из любой другой.');
      return;
   }
   this.connection.send(
   $iq({from: this.connection.jid, to: myRoom + '@conference.jabber.klavogonki.ru', type: 'get'})
   .c('query', {xmlns: 'http://jabber.org/protocol/disco#info'})
   .up().tree());
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.chat.updateRooms = function ()
{
   this.connection.send(
   $iq({from: this.connection.jid, to: 'conference.jabber.klavogonki.ru', type: 'get'})
   .c('query', {xmlns: 'http://jabber.org/protocol/disco#items'})
   .up().tree());
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.chat.enterRoom = function (room)
{
   if(!this.connected) return;
   myRoom = room.split('_')[0];
   myPass = room.split('_')[1];
   var pres = $pres({from: this.connection.jid, to: myRoom + '@conference.jabber.klavogonki.ru/' + Strophe.getNodeFromJid(this.connection.jid)})
   .c('x', {xmlns: 'http://jabber.org/protocol/muc'});
   myPass ? pres.c('password').t(myPass).up().up() : pres.up();
   if(this.params.user) pres.cnode(this.getXUserdata().tree());
   this.connection.send(pres.tree());
   this.user_list[myRoom] = [];
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.chat.changeActiveRoom = function (room)
{
   if(!this.connected || room == this.active_room) return;
   $('chat-' + this.active_room).hide();
   var elems = $$('#chat-title .' + this.active_room);
   for(var i = 0; i < elems.length; i++)
      elems[i].removeClassName('active');
   this.active_room = room;
   $('chat-' + this.active_room).show();
   var elems = $$('#chat-title .' + this.active_room);
   for(var i = 0; i < elems.length; i++)
      elems[i].addClassName('active');
   if(this.blink_new_ingame)
   {
      clearInterval(this.blink_new_ingame);
      this.blink_new_ingame = null;
   }
   if(this.active_room != 'general') $$('#chat-title .' + this.active_room + '.c span').last().removeClassName('new');
   if(this.resize) delete this.resize;
   this.resize = new Resizeable($$('#chat-wrapper #chat-' + room + ' .messages > div').last(),
   {
      handle: $$('#chat-title .dummy .resize-bar').last(),
      maxHeight: 400,
      resize: function (el){setChatHeight(el.getHeight(), true);},
      update: function (el){setChatHeight(el.getHeight());}
   });
   $('chat-' + chat.active_room).select('input.text').last().focus();
   $('chat-' + chat.active_room).select('.messages > div').last().scrollTop = $('chat-' + chat.active_room).select('.messages > div').last().scrollHeight;
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.chat.resetUserlist = function ()
{
   var _this = this;
   clearInterval(this.userlist_update_interval);
   this.userlist_update_interval = setInterval(function ()
   {
      for(var i in _this.rooms)
      {
         var room = _this.rooms[i];
         if(_this.user_list_dirty[room])
         {
            _this.updateUserList(room);
            _this.user_list_dirty[room] = false;
         }
      }
   }, 3000);
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.chat.createRoom = function ()
{
   if(chat.rooms.length >= 10)
   {
      popalert('Вы уже создали максимально допустимое числе комнат,</br>для создания новой комнаты выйдите из любой другой.');
      return;
   }
   popconfirm('Введите название комнаты: <input type=text maxlength=10 id=roomname></br>(латинские буквы и цифры, не больше 10 знаков,</br>в начале названия запрещено использовать слово "game")',
   function ()
   {
      var myRoom = $('roomname').value;
      if(!myRoom || !(/^[a-z0-9]{3,10}$/.test(myRoom)) || !myRoom.indexOf('game')) popalert('Неправильное название комнаты.');
      else if(myRoom == 'general' || chat.rooms.include(myRoom)) popalert('Вы уже находитесь в этой комнате.');
      else
      {
         chat.queryRoom(myRoom);
      }
   });
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.chat.initRoom = function (myRoom)
{
   if(myRoom == 'general' || chat.rooms.include(myRoom))
   {
      popalert('Вы уже находитесь в этой комнате.');
      return true;
   }
   var myClone = $$('#chat-general')[0].cloneNode(true);
   myClone.id = 'chat-' + myRoom;
   $('chat-content').appendChild(myClone);
   $$('#' + myClone.id + ' .messages > div > div').last().innerHTML = '';
   $$('#' + myClone.id + ' .text')[0].parentNode.setAttribute('onsubmit', 'chat.sendMsg(chat.active_room); return false;');
   $$('#' + myClone.id + ' input.send')[0].setAttribute('onclick', 'chat.sendMsg(chat.active_room)');
   $(myClone.id).hide();
   var roomTab = [];
   var t1 = document.createElement('td');
   t1.className = myRoom + " l";
   roomTab.push(t1);
   var t2 = document.createElement('td');
   t2.className = myRoom + " c";
   t2.innerHTML = '<span class="">' + myRoom + '</span>';
   t2.setAttribute('onclick',"chat.changeActiveRoom('"+myRoom+"');");
   roomTab.push(t2);
   var t3 = document.createElement('td');
   t3.className = myRoom + " r";
   roomTab.push(t3);
   t3.innerText = 'x';
   t3.style.cursor = 'pointer';
   t3.setAttribute('onclick',"chat.deleteRoom('"+myRoom+"');chat.updateRooms();");
   for(var i = 0; i < 3; i++)
      $$('#chat-title tr')[0].insertBefore(roomTab[i], $$('#chat-title tr .addroom')[0]);
   this.rooms.push(myRoom);
   cookieRooms(myRoom);
   if(cookieRooms().length == this.rooms.length-1)
   {
      this.resetUserlist();
      this.changeActiveRoom(myRoom);
   }
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.chat.deleteRoom = function (room)
{
   popconfirm('Выйти из комнаты?</br>',
   function ()
   {
      cookieRooms(room,true);
      chat.changeActiveRoom('general');
      chat.leaveRoom(room);
      chat.rooms.splice(chat.rooms.indexOf(room), 1);
      chat.resetUserlist();
      $$('#chat-title .' + room + '.l')[0].remove();
      $$('#chat-title .' + room + '.c')[0].remove();
      $$('#chat-title .' + room + '.r')[0].remove();
      $$('#chat-content #chat-' + room)[0].remove();
   });
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
window.chat.protectRoom = function (room)
{
   if(getPrefCookie('chat-hiddenRoom').indexOf(room+'_') != -1)
      popalert('Комната уже защищена паролем!');
   else
   popconfirm('<form align=center>Введите пароль для защиты комнаты:</br></br><input type=text id=roompass></form>',
   function ()
   {
      var pass = $('roompass').value;
      configRoom({room: room, pass: pass});
      cookieRooms(room,true);
      cookieRooms(room+'_'+pass);
   });
};
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
chat.connection.addHandler(function (msg){return chat.onIq(msg);}, null, 'iq', null, null, null);
setInterval(function (){chat.updateRooms()}, 5000);
$$('#chat-title .mostright').last().setAttribute('onclick','toggleChatVisible()');
$$('#chat-title .dummy .hide-bar').last().setAttribute('onclick','toggleChatVisible()');

setTimeout(function ()
{
   var roomsarray = cookieRooms();
   var room = '';
   var specInit = setInterval(function ()
   {
      if(!roomsarray.length)
      {
         clearInterval(specInit);
         setTimeout(function (){chat.changeActiveRoom('general')},2000);
      }
      else if(chat.connected && chat.connection.connected)
      {
         room = roomsarray.splice(0, 1)[0];
         chat.queryRoom(room.split('_')[0]);
      }
   }, 500);
}, 500);

//+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
      }
   }, 1000);
}
var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + ChatExtention + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);
//the end