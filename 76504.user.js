// ==UserScript==
// @name           Chat tweaks
// @namespace      aragorn.cz
// @include        http://www.aragorn.cz/ajax_room/1/
// ==/UserScript==

var refresh = function(){
    var f = document.createElement('iframe');
    f.src = 'http://www.aragorn.cz/chat/?akce=chat-enter&id=1';
    f.style.display = 'none';
    f.id = 'ifrm';
    with(unsafeWindow){
        document.body.appendChild(f);
        document.id('forma').highlight('#ff9');
        document.id('ifrm').dispose();
    }
    return true;
};

with(unsafeWindow){
    document.body.appendChild(new Element('button', {
        title:'Simulovat aktivitu',
        id:'noKickBtn',
        name:'refreshBtn',
        html:'Aktivita',
        styles:{
            top:0,
            right:70,
            position:'absolute'
        },
        events:{
            click:refresh
        }
    }));

    document.body.appendChild(new Element('input', {
        type:'checkbox',
        checked:Cookie.read('noKickState'),
        title:'Zabránit automatickému vyhození',
        id:'noKickChB',
        styles:{
            top:3,
            right:140,
            position:'absolute'
        },
        events:{
            click:function(){
                Cookie.write('noKickState', this.checked);
            }
        }
    }));
    document.body.appendChild(new Element('input', {
        type:'checkbox',
        checked:Cookie.read('noAutoReply') && false,
        title:'Pou\u017eívat automatickou odpověd',
        id:'noKickAutoReplyChB',
        styles:{
            top:3,
            right:165,
            position:'absolute'
        },
        events:{
            click:function(){
                Cookie.write('noAutoReply', this.checked);
            }
        }
    }));
    Ajaxchat.prototype.ChatRefreshingO = Ajaxchat.prototype.ChatRefreshing;
    Ajaxchat.prototype.bot = new Hash({
        autoReplyPossible:true,
        timeout:1000*60*10,  // 10 minut
        simulateActivity:function(){
            console.log('Aktivita .)');
        }
    });
    Ajaxchat.prototype.simulateActivity = function(){
        var f = document.createElement('iframe');
        f.src = 'http://www.aragorn.cz/chat/?akce=chat-enter&id=1';
        f.style.display = 'none';
        f.id = 'ifrm';
        document.body.appendChild(f);
        document.id('forma').highlight('#ff9');
        document.id('ifrm').dispose();
        return true;
    }
    
    Ajaxchat.prototype.ChatRefreshing = function(oXml, text){
        if (this.firstCheck(text) && document.id('noKickAutoReplyChB').get('checked') && this.bot.autoReplyPossible) {
            var messages = oXml.getElementsByTagName('ms');
            for(var i = 0; i < messages.length; i++){
                var t = messages[i].get('text');
                if(t.toLowerCase().indexOf('buri') !== -1){
                    if($('message').get('value').length < 1){
                        $('message').set('value', '=Automatická odpov\u011b\u010f: Buri tu te\u010f není=');
                        this.bot.autoReplyPossible = false;
                        setTimeout(function(){ Aragchat.bot.autoReplyPossible = true; }, this.bot.timeout);
                        this.cmd(3);
                        break;
                    }
                }
            }
        }
        this.ChatRefreshingO(oXml, text);
    }
}

var timer = setInterval(function(){
    if(unsafeWindow.document.id('noKickChB').get('checked')){
        refresh();
    }
}, 870000);
