// ==UserScript==
// @name           DeleteCommand
// @namespace      http://d.hatena.ne.jp/Constellation/
// @description    delete tumblr on Minibuffer
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/show*
// @version        0.0.4
// ==/UserScript==

function boot(ev){
  if(ev) window.removeEventListener('GM_MinibufferLoaded', boot, false);

  window.Minibuffer.addCommand({
    name : 'Tumblr::Delete',
    command : function(stdin){
    stdin.forEach(function(obj){
      if (obj.className.indexOf('is_mine') != -1){
        var params = [];
        var id = obj.id.match(/post(\d*)/)[1];
        var form = document.getElementById('delete_post_'+id);
        Array.forEach(form.getElementsByTagName('input'),function({name:n,value:v}){
          if (n!='redirect_to') params.push(n+'='+v);
        });
        params = params.join('&');
        window.Minibuffer.status('DeleteCommand'+id, 'Delete...');

        var opt = {
          method: 'POST',
          url: 'http://www.tumblr.com/delete',
          headers : {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Referer' : 'http://www.tumblr.com'
            },
          data: params,
          onload: function(res){
          window.Minibuffer.status('DeleteCommand'+id, 'Delete... done.', 100);
          },
          onerror: function(e){
          window.Minibuffer.status('DeleteCommand'+id, 'Delete... error.', 150);
          }
        }
        GM_xmlhttpRequest(opt);
      }
    });
    return stdin;
    },
  });

  window.Minibuffer.addShortcutkey({
    key: 'D',
    description: 'Tumblr::Delete',
    command: function(){
      var stdin = [];
      try{
      stdin = window.Minibuffer.execute('pinned-or-current-node');
      } catch (e){}
      window.Minibuffer.execute('Tumblr::Delete', stdin);
      window.Minibuffer.execute('clear-pin');
    }
  });
}
function log() {if(console) console.log.apply(console, Array.slice(arguments));}

if(window.Minibuffer){
  boot();
} else {
  window.addEventListener('GM_MinibufferLoaded', boot, false);
}
