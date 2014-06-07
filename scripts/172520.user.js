// ==UserScript==
// @name        Chat Gindena - Klient dla Strimsa
// @namespace   strims_ginden_chat
// @include     http://strims.pl/s/Czat*
// @version     0.8
// ==/UserScript==

var x = document.createElement('script');
x.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.js');
document.body.appendChild(x);
function a() {
    $.ajaxSetup({
            timeout: 5000,
            global: true,
            xhrFields: {
                withCredentials: true
            }
        });
    $('li.bookmark_content_comments, li.bookmark_contents_top, .bookmark_contents_new').remove();
    function main(nick, kanaly) {
        var Domain = 'http://chat.ginden.pl/mobile/';
        (function(b){var c;b.faviconNotify=function(k,d,g,l,m){g=g||"br";m=m||"#FFFFFF";l=l||"#000000";
         c=c||b("<canvas />")[0];c.getContext&&b("<img />").load(function(f){c.height=c.width=16;
        f=c.getContext("2d");f.clearRect(0,0,c.width,c.height);f.drawImage(this,0,0);
        if(void 0!==d){d=parseFloat(d,10);var h=[];99<d?h.push(p.LOTS):(d=d.toString().split(""),b.each(d,
        function(a,c){h.push(p[c])}));var e=[],n=h[0].length;b.each(h,function(c,b){for(a=0;a<n;a++)
        if(void 0===e[a])e[a]=b[a];else{var d=e[a].length;e[a]= " "==
        e[a][d-1]?e[a].substring(0,d-1)+b[a]:e[a]+b[a].substring(1)}});
        var q=e[0].length,k=-1!=g.indexOf("l")?0:16-q,a=-1!=g.indexOf("t")?0:16-n;for(dX=0;dX<q;dX++)
        for(dY=0;dY<n;dY++){var r=e[dY][dX];" "!=r&&(f.fillStyle="@"==r?m:l,f.fillRect(k+dX,a+dY,1,1))}}
        b("link[rel$=icon]").remove();
        b("head").append(b('<link rel="shortcut icon" type="image/x-icon"/>')
        .attr("href",c.toDataURL("image/png")))}).attr("src",k)};
         var p={0:" --- ; -@@@- ;-@---@-;-@- -@-;-@- -@-;-@- -@-;-@---@-; -@@@- ; --- ".split(";"),
         1:" - ; -@- ;-@@- ; -@- ; -@- ; -@- ; -@- ;-@@@-; --- ".split(";"),
         2:" --- ; -@@@- ;-@---@-; - --@-; -@@- ; -@-- ;-@---- ;-@@@@@-; ----- ".split(";"),
         3:" --- ; -@@@- ;-@---@-; - --@-; -@@- ; - --@-;-@---@-; -@@@- ; --- ".split(";"),
         4:" -- ; -@@-; -@-@-; -@--@-;-@---@-;-@@@@@-; ----@-; -@-; - ".split(";"),
         5:" ----- ;-@@@@@-;-@---- ;-@--- ;-@@@@- ; ----@-;-@---@-; -@@@- ; --- ".split(";"),
         6:" --- ; -@@@- ;-@---@-;-@---- ;-@@@@- ;-@---@-;-@---@-; -@@@- ; --- ".split(";"),
         7:" ----- ;-@@@@@-; ----@-; -@- ; -@- ; -@- ; -@- ; -@- ; - ".split(";"),
         8:" --- ; -@@@- ;-@---@-;-@---@-; -@@@- ;-@---@-;-@---@-; -@@@- ; --- ".split(";"),
         9:" --- ; -@@@- ;-@---@-;-@---@-; -@@@@-; ----@-;-@---@-; -@@@- ; --- ".split(";"),
         "!":" - ;-@-;-@-;-@-;-@-;-@-; - ;-@-; - ".split(";"),".":" ; ; ; ; ; ; - ;-@-; - ".split(";"),
         LOTS:" - -- --- -- ;-@- -@@-@@@--@@-;-@--@--@-@--@- ;-@--@--@-@--@- ;-@--@--@-@- -@- ;-@--@--@-@- -@-;-@--@--@-@----@-;-@@@-@@--@-@@@- ; --- -- - --- ".split(";")
         }})($);
        if (typeof $ === 'undefined') {
            alert('Nie ma tutaj jQuery, coś jest nie tak.');
        }
        if (typeof unsafeWindow !== 'undefined') {
            var window = unsafeWindow;
        }
        var ChatBox = $('<div />').attr('id', 'chat'),
            UsersList = $('<div />').attr('id', 'users-list'),
            inbox = $('<div />').attr('id', 'inbox'),
            sendmessages = $('<div />').attr('id', 'sendmessages');
        ChatBox.append(UsersList, inbox, sendmessages.css('margin-top', '30px'));
        $('div #content div.template_wrapper').empty().append(ChatBox);
        $.extend({
            alert: function (message, title) {
                $("<div></div>").dialog( {
                    buttons: {
                        "Ok": function () {
                            $(this).dialog("close");
                        }
                    },
                    close: function (event, ui) {
                        $(this).remove();
                    },
                    width: 500,
                    height: 500,
                    resizable: false,
                    title: title,
                    modal: true
                }).append(message);
            },
            CreateImg: function (src, alt, sizeX, sizeY) {
                return $('<img />').attr(
                    {
                        'src': src,
                        'alt': alt,
                        'title': alt,
                        'width': sizeX,
                        'height': sizeY
                    }
                );
            }
        });
        String.prototype.rtrim = function() {
            return this.replace(/\s+$/,"");
        }
        function CreateModPanel(panel) {
            function ShowBans() {
                $.ajax(
                    {
                        type: 'POST',
                        url: Domain+'moderation.php?channel='+Chat['Channel'],
                        data: {
                            'action': 'ShowBans'
                        },
                        dataType: 'json',
                        success: function(data) {
                            var PanelAdmina = $('#mod_show_panel');
                            PanelAdmina.empty();
                            var BansList = $('<table>')
                                .attr('id', 'bans-list')
                                .addClass('ban-list');
                                
                            data.forEach(function(el){
                                var data = new Date(el['banned']*1000);
                                var nick = el['name'];
                                BansList.append(
                                    $('<tr/>').append(
                                        $('<td>').append(
                                            '@<a href="http://www.wykop.pl/ludzie/'+nick+'">'
                                            +nick+'</a> (<span style="font: monospace">'+nick.toUpperCase()+'</span>)'
                                            ),
                                        $('<td>').text(data.toLocaleString())
                                    )
                                );
                                
                            });
                            BansList.appendTo(PanelAdmina);
                        }
                    }
                );
                
            }
            function BanUser() {
                var UserID, TimeOfBan;
                UserID = $(this).parent().parent().attr('data-id');
                TimeOfBan = $('#ban-time').val();
                $.ajax({
                        type: 'POST',
                        url: Domain+'moderation.php?channel='+Chat['Channel'],
                        data: {
                            'action': 'BanUser',
                            'id': UserID,
                            'time': TimeOfBan
                        },
                        dataType: 'json',
                        success: function(data) {
                            
                        }
                    });
            }
            function GiveAccess() {
                var UserID = $(this).parent().parent().attr('data-id');
                var self = this;
                $.ajax({
                        type: 'POST',
                        url: Domain+'moderation.php?channel='+Chat['Channel'],
                        data: {
                            'action': 'GiveAccess',
                            'id': UserID
                        },
                        dataType: 'json',
                        success: function(data) {
                            if (data[0] === true) {
                                $(self).parent().parent().remove();
                            }
                            else {
                                alert('ups!');
                            }
                        }
                });
            }
            function ShowUnregisteredUsers() {
                $.ajax(
                    {
                        type: 'POST',
                        url: Domain+'moderation.php?channel='+Chat['Channel'],
                        data: {
                            'action': 'ShowAllUsers'
                        },
                        dataType: 'json',
                        success: function(data) {
                            var PanelModeratora, temp, ListaUzytkownikow;
                            PanelModeratora = $('#mod_show_panel');
                            PanelModeratora.empty();
                            ListaUzytkownikow = $('<table />').addClass('mod-users-list').appendTo(PanelModeratora);
                            temp = function (element) {
                                var node = $('<tr />');
                                var AddButton = $('<span />').addClass('add-button').click(GiveAccess);
                                node.attr({
                                    'data-id': element['id'],
                                    'data-access-level': element['access'],
                                    'class': 'user-node'
                                    }
                                );
                                node.append($('<td />').text(element['name']));
                                node.append($('<td />').addClass('power_td').append(AddButton));
                                ListaUzytkownikow.append(node);
                            };
                            data.forEach(temp);
                        }
                    });
            }
            function ShowUsers(){
                $.ajax(
                    {
                        type: 'POST',
                        url: Domain+'moderation.php?channel='+Chat['Channel'],
                        data: {
                            'action': 'ShowUsers'
                        },
                        dataType: 'json',
                        success: function(data) {
                            var PanelAdmina, temp, ListaUzytkownikow, BanButton;
                            PanelAdmina = $('#mod_show_panel');
                            PanelAdmina.empty();
                            PanelAdmina.append(
                                'Czas bana: ',
                                $('<select />').attr('id', 'ban-time')
                                    .append('<option value="60">szczękościsk</option>')
                                    .append('<option value="300">5 minut</option>')
                                    .append('<option value="900">kwadrans</option>')
                                    .append('<option value="1800">przerwa na herbatę</option>')
                                    .append('<option value="3600">godzinna drzemka</option>')
                                    .append('<option value="14400">cztery godziny</option>')
                                    .append('<option value="28800">zdrowy sen</option>')
                                    .append('<option value="86400">doba</option>')
                                    .append('<option value="604800">tydzień</option>')
                                    .append('<option value="2419200">miesiąc</option>')
                                    .append('<option value="3456000">Wielki Post</option>')
                                    .append('<option value="7257600">kwartał</option>')
                                    .append('<option value="31536000">rok</option>')
                                    .append('<option value="220752000">siedem chudych lat</option>')
                                );
                            
                            ListaUzytkownikow = $('<table />').addClass('mod-users-list').appendTo(PanelAdmina);
                            temp = function (element) {
                                var wiersz = $('<tr/>');
                                var UserNameCell = $('<td/>');
                                var AccessCell = $('<td />');
                                var LastSeenCell = $('<td />');
                                var BanButton = $('<span />').addClass('ban-button').click(BanUser);
                                var node = $('<td />');
                                wiersz.attr(
                                    {
                                        'data-id': element['userid'],
                                        'data-access-level': element['access'],
                                        'class': 'user-node'
                                    }
                                );
                                UserNameCell.text(element['name']);
                                if (parseInt(element['access'], 10) < 2) {
                                    
                                    AccessCell.append(BanButton);
                                }
                                else {
                                    AccessCell.append('<span class="szycha">moderator</span>');
                                }
                                wiersz.append(UserNameCell, AccessCell, LastSeenCell);
                                ListaUzytkownikow.append(wiersz);
                            };
                            data.forEach(temp);
                        }
                    }
                );
            }
            function LastSeen() {
                $.ajax(
                    {
                        type: 'POST',
                        url: Domain+'moderation.php?channel='+Chat['Channel'],
                        data: {
                            'action': 'LastSeen'
                        },
                        dataType: 'json',
                        success: function(data) {
                            var PanelAdmina, temp, ListaUzytkownikow, BanButton;
                            PanelAdmina = $('#mod_show_panel');
                            PanelAdmina.empty();
                            var table = $('<table/>');
                            temp = function (element) {
                                var wiersz = $('<tr/>'),
                                    UserNameCell = $('<td/>'),
                                    LastSeenCell = $('<td />'),
                                    node = $('<td />'),
                                    data = new Date(element['timestamp']*1000);
                                UserNameCell.text(element['name']);
                                LastSeenCell.text(data.toLocaleString());
                                wiersz.append(UserNameCell, LastSeenCell);
                                table.append(wiersz);
                            };
                            data.forEach(temp);
                            table.appendTo(PanelAdmina);
                        }
                    }
                );
            }
            panel = $(panel);
            panel.append(
                $('<ul />').attr('id', 'belka-moderatora').append(
                    $('<li />').append(
                        $.CreateImg(Domain+'images/skanuj_ludzi.png', 'pokaż użytkowników', 50, 50)).click(ShowUsers),
                    $('<li />').append(
                        $.CreateImg(Domain+'images/add_users.png', 'dodaj użytkowników', 50, 50)).click(ShowUnregisteredUsers),
                    $('<li />').append(
                        $.CreateImg(Domain+'images/bany.png', 'pokaż bany', 50, 50)).click(ShowBans),
                    $('<li />').append(
                        $.CreateImg(Domain+'images/wizyty.png', 'pokaż wizyty', 50, 50)).click(LastSeen)
                ),
                $('<div />').attr('id', 'mod_show_panel')
            );
        }
        function ShowModPanel() {
            $('#mod-panel').dialog( {
                        modal: true,
                        autoOpen: true,
                        resizable: false,
                        height: 400,
                        width: 800,
                        title: 'Panel moderatora'
            });
        }
        function SetTitle() {
             var new_title,
                NewMessages = Chat.NewMessages;
        
            if (NewMessages > 0 && !window['active']) {
                $.faviconNotify('http://strims.pl/media/images/others/favicon.png', NewMessages, 'bl');
            }
            else {
                $.faviconNotify('http://strims.pl/media/images/others/favicon.png');
            }
        }
        function ClickToMsgUser() {
            var what_user = '@' + $(this).text();
            if ($(this)[0].nodeName.toLowerCase() === 'img') {
                what_user = '@'+$('.user-description', $(this).parent()).text();
            }
            var msg_box = $('#wiadomosc');
            var msg = ($(this).parent().hasClass('priv') ? '/msg ' : '') + what_user;
            if (msg_box.val().match(what_user)) {
                return false;
            }
            msg_box.val(($(this).parent().hasClass('priv') ? msg + msg_box.val() + ' ' : msg_box.val()+msg+' '));
            msg_box.focus();
            return false;
        }
        function sort_users(a,b) {
            var a_name = a['user'].toLowerCase();
            var b_name = b['user'].toLowerCase();
            if (a_name < b_name) {
                return -1;
            }
            if (a_name > b_name) {
                return 1;
            }
            return 0;
        }
        function escapeHtml(unsafe) {
          return unsafe
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/\\"/g, "&quot;")
              .replace(/\\'/g, "&#039;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
              
        }
        var Chat = new (function($){
            var events = {};
            var self = this;
            self.Last = 0;
            self.LastError = 0;
            self.ErrorsCount = {};
            self.Channel = 2;
            self.SoundsSettings = {};
            self['users-known'] = {};
            self.NewMessages = 0;
            self.Emoticons = [];
            self.LastOnlineUsers = 0;
            self.BlackList = [];
            self.Settings = {};
            self.Reversed = true;
            self.AvaibleChannels = [];
            self.CurrentUser = 'jakis nick';
            
            self.AddListener = function(name, handler){
                if (!events[name]) {
                    events[name] = [];
                }
                events[name].push(handler);
            };
            self.TriggerEvent = function(name, data) {
                if (events[name]) {
                    var i = 0,
                        handlers = events[name];
                    handlers.push(function(){
                        return false;
                    })
                    while (handlers[i](data) !== false) {
                        i += 1;
                    }
                    return data;
                }
                else {
                    return false;
                }
            };
            self.ClearListeners = function(event_name) {
                events[event_name] = [];
            };
            self.GetChannels = function(){
                $.ajax({
                    url: Domain+'channels.php',
                    async: false,
                    dataType: 'json',
                    success: function(d) {
                        self.Channels = d;
                    }
                });
            };
            self.ChangeChannel = function(kanal) {
                $('div#inbox').empty();
                $('div#users-list .user-field').remove();
                if (self.AvaibleChannels[kanal].access > 1) {
                    $('#mod_button').removeClass('dnone');
                }
                else {
                    $('#mod_button').addClass('dnone');
                }
                self.Last = 0;
                self.Channel = kanal;
            };
            self.GetEmots = function () {
                return $.ajax({
                    url: Domain+'emots.php',
                    dataType: 'json',
                    success: function(d) {
                        function save_emots(el) {
                            self.Emoticons.push(el);
                            
                        }
                        d.forEach(save_emots);
                    }
                });
            };
            self.Settings = function () {
                function GetSetting(name){
                    
                }
                function CreateSetting(type, name, label, select_data) {
                    // select_data
                    // [{'name': 'nazwa', 'value': 'wartość'
                    // }]
                    var input,
                        label_node,
                        t = [];
                    if (type === 'checkbox') {
                        input = $('<input/>')
                            .attr('type', 'checkbox')
                            .attr('data-setting', name)
                            .attr('name', name)
                            .attr('id', name);
                    }
                    else if (type === 'text') {
                        input = $('<input/>')
                            .attr('type', 'text')
                            .attr('data-setting', name)
                            .attr('name', name)
                            .attr('id', name);
                    }
                    var label_node = $('<label />')
                            .attr('for', name)
                            .text(label);
                    t.push(input, label_node, '<br>');
                    return t;
                }
                function LoadSettings(form) {
                    $('input', form).each(function(i, el){
                        var value,
                        element = $(el),
                        name = element.attr('name'),
                        type = element.attr('type');
                        value = localStorage['chat_setting_'+name];
                        if (typeof value === 'undefined'){
                            value = 'false';
                        }
                        if (type === 'checkbox') {
                            value = JSON.parse(value);
                            element.prop('checked', value);
                            self.Settings[name] = value;
                        }
                        else if (type === 'text') {
                            value = JSON.parse(value) || '';
                            element.val(value);
                            self.Settings[name] = value;
                        }
                        else {
                            value = JSON.parse(value);
                            element.val(JSON.parse(value));
                            self.Settings[name] = value;
                        }
                        
                    });
                }
                function SaveSettings(form) {
                    $('input, select', form).each(function(i, el){
                        var value,
                        element = $(el),
                        name = element.attr('name');
                        if (element.attr('type') === 'checkbox') {
                            value = element.prop('checked');
                        }
                        else {
                            value = element.val();
                        }
                        localStorage['chat_setting_'+name] = JSON.stringify(value);
                    });
                }
                var SettingsList =
                    $('<div />')
                        .append(
                            CreateSetting('checkbox', 'ReversedChat', 'kierunek chatu w dół'),
                            CreateSetting('checkbox', 'Emoticons', 'emotikony'),
                            CreateSetting('checkbox', 'FixedWith', 'stała szerokość (1024px)'),
                            CreateSetting('checkbox', 'ClearErrors', 'czyść informacje o błędach po ich rozwiązaniu'),
                            CreateSetting('text', 'BlackList', 'czarna lista (kolejne nicki oddzielaj przecinkiem)')
                        )
                        .addClass('settings settings-panel')
                        .attr('id', 'settings')
                        .css('display', 'none');
                
                $('#chat').append(
                    SettingsList
                );
                LoadSettings(SettingsList);
                $('.menu_bookmarks').append(
                        $('<li />').addClass('setting_button ').append(
                            $('<a />')
                                .attr(
                                    {
                                        'id': 'chat-settings-button',
                                    }
                                )
                                .text (
                                    'ustawienia chatu'
                                )
                                .click(function(){
                                    $('#settings').dialog({
                                        modal: true,
                                        autoOpen: true,
                                        resizable: false,
                                        height: 400,
                                        width: 700,
                                        buttons: {
                                            'odśwież': function(){
                                                SaveSettings(SettingsList);
                                                document.location.reload(true);
                                            }
                                        }
                                    })
                                })
                                
                    )
                );
            };
            self.GetUsersOnline = function () {
                var known_users = self['users-known'];
                var channel = self.Channel;
                var f = [];
                var z = [];
                var klucze_api = ['ct75mX8Z3n', 'nu242TijdR', '2VFEfYlFXT', 'ROg0bm5Lmj', 'dWUAdJlP4w'];
                var key = klucze_api[Math.floor(Math.random() * klucze_api.length)];
                function GetUserInfoFromAPI(user, if_strims) {
                    return (known_users[user] = {
                                    login: user,
                                    about: 'Opis',
                                    color: 0,
                                    avatar: 'http://i.imgur.com/craPEi1.png',
                                    strims: parseInt(if_strims, 10)});
                }
                $.ajax(
                    {
                        dataType: 'json',
                        url: Domain+'users_online.php?channel='+channel,
                        success: function(data) {
                            var user, row;
                            var x = 0;
                            data.sort(sort_users);
                            z = [];
                            while (data[x]) {
                                row = data[x];
                                user = row['user'];
                                f.push(user);
                                if (!known_users[user]) {
                                    z.push(GetUserInfoFromAPI(user, row['strims']));
                                }
                                x += 1;
                            }
                            if (JSON.stringify(self.LastOnlineUsers) !== JSON.stringify(f)
                                ) { // tylko zmieniona lista
                                $.when(z).then(function(){
                                    var x = 0;
                                    var user, url;
                                    var UsersList = $('#users-list');
                                    $('.user-field', UsersList).remove();
                                    while(f[x]) {
                                        user = known_users[f[x]];
                                        url = '<a target="_blank" href="'+(user['strims'] ? 'http://strims.pl/u/' : 'http://wykop.pl/ludzie/')+''
                                                                +user['login']+ '">' +user['login']+'</a>';
                                        UsersList.append(
                                            $('<div />')
                                                .addClass('user-name')
                                                .addClass('user-field')
                                                .append(
                                                    $('<img />')
                                                        .addClass('user-avatar')
                                                        .attr('height', '48')
                                                        .attr('width', '48')
                                                        .attr('src', user['avatar'])
                                                        .click(ClickToMsgUser)
                                                    ,
                                                    $('<div />')
                                                        .addClass('user-description')
                                                        .append(
                                                            url
                                                        )
                                                )
                                                .attr('title', user['about'])
                                                .addClass(user['login'])
                                        );
                                        x += 1;
                                    }
                                }
                                );
                            }
                            self.LastOnlineUsers = f;
                        },
                        complete: function() {
                             setTimeout(self.GetUsersOnline, (self.Active ? 2500 : 10000));
                        } 
                    }
                );
            }
            self.GetNewMessages = function () {
                function ShowEmots(message) {
                    var emotki = self.Emoticons;
                    function temp(krotka) {
                        function escapeRegExp(str) {
                            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                        }
                        var regexp = new RegExp(escapeRegExp(krotka[0]), 'g');
                        message = message.replace(
                                    regexp,
                                    '<img class="emotka" alt="'+krotka[0]+'" title="'+krotka[0]+'" src="'+krotka[1]+'" />',
                                    "g"
                                    );
                    }
                    emotki.forEach(temp);
                    return message;
                }
                var inbox = $('#inbox');
                $.ajax(
                    {
                        dataType: 'json',
                        url: Domain + 'chat_core.php?last='+self.Last+'&channel='+Chat['Channel'],
                        success: function(data) {
                            if (!Array.isArray(data)) {
                                return;
                            }
                            if (self.LastError) {
                                self.ShowInformation('Przywrócono poprawnie połączenie do chatu.', 'error');
                                self.LastError = false;
                                self.ErrorsCount = {};
                                if (self.Settings.ClearErrors) {
                                    $('p.error').remove();
                                }
                            }
                            data.reverse();
                            var x = 0;
                            var date, row, message, nowa_wiadomosc, czy_me;
                            var urls  = new RegExp(
                                "(^|[ \\t\\r\\n])((?:(?:http(s)?://)|(www\\.))((?:[a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@#&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))",
                                "g"
                            );
                            var tag = '$1<a href="http$3://$4$5$6" target="_blank">$2</a>';
                            var urlize = function(msg) {
                                return msg.replace( urls, tag );
                            };
                            var czy_priv, czy_hilight, objDiv;
                            while (data[x]) {
                                row = data[x];
                                date = new Date(row['timestamp']*1000);
                                message = row['message'];
                                message = escapeHtml(message);
                                message = urlize(message);
                                message = message.replace(/\\\\/g, '\\');
                                czy_priv = ((row['to']) ? true : false);
                                czy_hilight = (message.match(self.CurrentUser) ? true : false);
                                if (czy_priv) {
                                    message = '<span class="priv_info">(szept do '+row['to']+') </span>' + message;
                                }
                                czy_me = (('/me ' === message.substring(0, 4)) ? true : false);
                                if (czy_me) {
                                    message = message.substring(4);
                                }
                                if (self.Settings.Emoticons) {
                                    message = ShowEmots(message);
                                }
                                nowa_wiadomosc = $('<p />')
                                    .append(
                                        $('<span class="timestamp" />')
                                            .text(date.toLocaleTimeString()+' ')
                                            .attr('title', date.toLocaleString())
                                        )
                                    .append(
                                        $('<span class="user '+row['user']
                                          +' '
                                          + ((czy_me) ? "" : "n_user")
                                          +'" />')
                                        .text(row['user']+' ')
                                        .click(ClickToMsgUser)
                                        )
                                    .append(
                                        $('<span class="message" />').html(message+' ')
                                        )
                                    .attr('id', 'message-'+row['id'])
                                    .addClass(((czy_me) ? "me" : ""))
                                    .addClass(((czy_priv) ? "priv" : ""))
                                    .addClass(row['user'])
                                    .addClass((row['special']) ? 'special_'+row['special'] : "")
                                    .addClass((czy_hilight) ? 'hilight' : "");
                                if (self.Reversed) {
                                    inbox.append(nowa_wiadomosc);
                                    objDiv = $('#inbox')[0];
                                    objDiv.scrollTop = objDiv.scrollHeight;
                                }
                                else {
                                    inbox.prepend(nowa_wiadomosc);
                                }
                                if (!self.Active) {
                                    if (self.BlackList.indexOf(row['user']) < 0) {
                                        Chat['NewMessages'] += 1;
                                    }
                                }
                                x += 1;
                            }
                            if (data.length > 0) {
                                self.Last = data[x-1]['id'];
                                SetTitle();
                            }
                        },
                        error: function(XHR_request, textStatus, errorThrown) {
                            var numer_bledu = XHR_request.status;
                            var error_id = numer_bledu+','+textStatus;
                            if (!self.ErrorsCount.hasOwnProperty(error_id)) {
                                self.ErrorsCount[error_id] = 0;
                            }
                            self.ErrorsCount[error_id] += 1;
                            if(self.ErrorsCount[error_id] == 5) {
                                self.ShowInformation('Wystąpił błąd. ' +
                                (numer_bledu > 0 ? 'Numer błędu HTTP: ' + numer_bledu : 'Typ błędu: '+textStatus)+
                                '. Czas wystąpienia: ' +(new Date()).toLocaleTimeString()+'.'
                                ,
                                'error'
                                );
                                self.LastError = textStatus;
                            }
                        },
                        complete: function() {
                             setTimeout(self.GetNewMessages, (self.Active ? 750 : 2500));
                            } 
                    }
                    
                    
                );
            
               
            }
            self.ShowInformation = function(msg, klasa) {
                klasa = klasa || '';
                var inbox = $('#inbox')
                var Information = $('<p />').addClass('important_information').addClass(klasa).append(msg);
                if (self.Reversed) {
                    inbox.append(Information);
                }
                else {
                    inbox.prepend(Information);
                }
            };
            self.SendMessage = function () {
                var Commands = {
                    '/help': function() {
                        self.ShowInformation('Następujące komendy są dostępne:<ul><li class="code">/help emots</li>'+
                            '<li class="code">/help mods</li>'+
                            '<li class="code">/msg nick wiadomość</li>'+
                            '<li class="code">/me czynność</li>'+
                            '<li class="code">/roll</li>'+
                            'W przypadku privów, poprawna jest też forma `<span class="code">/msg @nick</span>`</ul>');
                    },
                    '/help emots': function() {
                        $.alert((function(){
                            var Emoticons = Chat['Emoticons'];
                            var s = $('<table/>');
                            var t = function(el){
                                var wiersz = $('<tr />');
                                wiersz.append(
                                    $('<td />')
                                        .append(el[0]),
                                    $('<td />')
                                        .append(
                                            '<img class="emotka" src="'+el[1]+'" />'
                                        )
                                    )
                                s.append(wiersz);
                            };
                            Emoticons.forEach(t);
                            return s;
                            })(), 'Emotikony');
                    },
                    '/help mods': function(){
                        $.ajax(
                            {
                                type: 'POST',
                                url: Domain+'moderation.php?channel='+Chat['Channel'],
                                data: {
                                    'action': 'ShowMods'
                                },
                                dataType: 'json',
                                success: function(data) {
                                    self.ShowInformation(['Moderatorami tego kanału są: @', data.join(', @')])
                                }
                            }
                        );
                    }
                };
                function SpecialCommands(msg) {
                    if (Commands[msg.rtrim()]) {
                        Commands[msg.rtrim()]();
                        return '';
                    }
                    return msg;
                }
                var self = $(this);
                var message = $('#wiadomosc', self);
                var message_text = message.val();
                message_text = SpecialCommands(message_text);
                if (message_text.length > 0) {
                        $.ajax({
                            url: Domain+'chat_core.php?&channel='+Chat['Channel'],
                            type: 'POST',
                            data: {
                                'MESSAGE': message_text
                            }
                        });
                }
                message.focus();
                message.val('');
                return false;
            }
            self.BlackList = (function(){
                var CzarnaLista = localStorage['chat_setting_BlackList'] || 'false';
                CzarnaLista = JSON.parse(CzarnaLista);
                if (!CzarnaLista) {
                    return []; // pusta czarna lista
                }
                CzarnaLista = CzarnaLista.replace(new RegExp(' ', 'g'), '').split(',');
                var css_rule = 'p.' +CzarnaLista.join(', p.')+', div.user-field.'+CzarnaLista.join(', div.user-field.')+ ' {display: none;}';
                $('#black_list').text(
                    css_rule
                );
                return CzarnaLista;
                })();
        })($);
        Chat.CurrentUser = nick;
        Chat.AvaibleChannels = kanaly;
        CreateModPanel();
        UsersList.append(
            $('<div />')
                .attr('id', 'mod_button')
                .addClass('dnone')
                .addClass('user-name')
                .addClass('mod-panel')
                .css('display', 'inline-block')
                .append(
                        $.CreateImg(Domain+'images/moderation.svg', 'moderacja', 48, 48).addClass('user-avatar')
                        )
                .click(ShowModPanel)
        );
        $(document.body).append('<div class="mod-panel" style="display: none;" id="mod-panel"></div>');
        CreateModPanel($('#mod-panel'));
        window['Chat'] = Chat; // referencja, a nie kopia
        $(window).blur(function() {
            window['active'] = false;
        });
        if (Chat.AvaibleChannels[2].access > 1) {
            $('div#mod_button').removeClass('dnone');
        }
        $(window).focusin(function() {
            window['active'] = true;
            Chat['NewMessages'] = 0;
            SetTitle();
        });
        var SendForm =  $('<form />')
            .attr({'id': 'send_messages',
                  'action': '?'
                  })
            .append($('<input id="wiadomosc" type="text" autocomplete="off" style="border: 1px solid black;" />'))
            .append($('<input id="submit" type="submit" value="wyślij"/>'))
            .submit(Chat.SendMessage);
        $('#sendmessages').append(SendForm);
        $('#wiadomosc').focus(function(){this.value = this.value;SetTitle()})
        $.when(Chat.GetEmots()).then(function(){
                Chat.GetNewMessages();
            });

        var NightStyle = ($('head #night_style').length > 0);
        var CSS_url;
        $('head').append(
            $('<link />').attr(
                {'href': (NightStyle ?
                 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/ui-darkness/jquery-ui.css':
                 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/ui-lightness/jquery-ui.css'),
                'rel': 'stylesheet',
                'type': 'text/css'
                }
            ),
            $('<link />').attr(
                {'href': Domain + 'strims.css',
                'rel': 'stylesheet',
                'type': 'text/css'
                }
            )
        );
        $('.menu_bookmarks').append(
            $('<li />').append(
                $('<a />').text('wyloguj się').attr('href', 'http://chat.ginden.pl/login.php?logout=true'))
            );
        Chat.AvaibleChannels.reverse();
        Chat.AvaibleChannels.forEach(function(el){
            var ChID = el['id'],
                ChAccess = parseInt(el['access'], 10),
                ChName = el['name'];
            if (ChAccess > 0) {
                $('.menu_bookmarks').prepend(
                    $('<li />').append(
                        $('<a />').text(ChName).click(function(){
                            $(this).parent().parent().children('.selected').removeClass('selected');
                            $(this).parent().addClass('selected');
                            Chat.ChangeChannel(ChID)
                            }).attr('id', 'channel-'+ChID)
                    ).css('cursor', 'pointer')
                )
            }
            });
        $('#channel-2').parent().addClass('selected');
        Chat.Settings();
        Chat.GetUsersOnline();
    }
    var temp = function(){
        $.ajax({
            url: 'http://chat.ginden.pl/mobile/access.php',
            dataType: 'json',
            success: function(data){
                var Stan = data['status'];
                if (Stan === 0) {
                    // nie jest zalogowany do chatu
                    $('div#content div.template_wrapper').empty().append(
                        '<h2>Zaloguj się | <a href="http://chat.ginden.pl/register1.php">Założ konto</a></h2>',
                        $('<iframe />').attr(
                            {'src': 'http://chat.ginden.pl/login.php',
                            'width': '1024',
                            'height': '350'
                            }),
                        $('<div />').css({
                            width: '400px',
                            height: '100px',
                            'border-radius': '10px',
                            'text-align': 'center',
                            'line-height': '100px',
                            'font-size': '40px',
                            'vertical-align': 'middle',
                            'color': 'white',
                            'cursor': 'pointer',
                            'background-color': 'rgb(127, 127, 127)'
                            }).text('zaloguj się na strimsie').click(temp)
                            );
                }
                else if (Stan === 1) {
                    main(data['nick'], data['channels']);
                }
            }
            })};
    temp();
}
function addJQuery(callback) {
    "use strict";
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
if (typeof $ === typeof undefined) {
    if (unsafeWindow.jQuery) {
        var $ = unsafeWindow.jQuery;
        a();
    } else {
        addJQuery(a);
        }
} else {a();}