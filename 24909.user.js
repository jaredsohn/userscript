// ==UserScript==
// @name           My Threads
// @namespace      OG
// @description    Bring back "My Threads" functionality to the OG.
// @include        http://www.mixedmartialarts.com/*
// @include        http://mixedmartialarts.com/*
// ==/UserScript==

var $$   = unsafeWindow.$$;
if (!$$) { return; }

function run(f) {
  location.href = ("javascript:(" + f + ")()");
}

run(function(){
  var threadTemplate = '<li><h4>{forumName}</h4><a target="main" href="{href}"><strong>{title}</strong></a><br/><span class="SmallText" style="font-size: 11px; color: rgb(27, 52, 83);">(?) [??] by {author}</span><hr style="height: 3px;"/></li>'

  var actions = $$('div.Actions')[0];
  if (!actions) { return; }
  var actionList2 = $$('div.Actions ul.SecondCol')[0]
  actionList2.insert('<li id="MyThreads"><a href="#">My Threads</a></li>');
  actions.insert('<div id="Subs" style="display: none"></div>');
  $$('#MyThreads a')[0].observe('click', function(ev){
    $('threadListWrapper').innerHTML = '<p style="text-align: center;"><br /><img alt="Loading..." src="/images/icon/indicator.gif" /></p>';
    new Ajax.Request(
      '/?go=subscriptions.threads&view=all',
      {
        method    : 'GET',
        onSuccess : function(r){
          var myThreads = [];
          myThreads.toHTML = function(){
            return this.map(function(thread){
              return threadTemplate.replace(/{\w+}/g, function(match){
                var v = match.replace(/^{/, '').replace(/}$/, '');
                return thread[v];
              });
            }).join("\n");
          };
          $('Subs').innerHTML = r.responseText;
          var trs = $$('#Subs table.data_table tr.data_row')
          var i;

          var dig = function(el) {
            return el.childElements()[0].childElements()[0];
          };

          for (i = 0; i < trs.length; i++) {
            tr = trs[i];
            var thread = {};
            var tds    = tr.childElements();
            var a      = dig(tds[3]);
            thread.forumName = tds[2].childElements()[0].innerHTML;
            thread.id        = a.href.match(/thread=(\d+)/)[1];
            thread.forumId   = a.href.match(/forum=(\d+)/)[1];
            thread.title     = a.innerHTML;
            thread.author    = dig(tds[4]).innerHTML;
            thread.href      = '/?go=forum_framed.posts&forum=' + thread.forumId + '&thread=' + thread.id + '&page=1&pc=69';
            myThreads.push(thread);
          }
          $('threadListWrapper').innerHTML = '<ul class="ForumThreadList" style="margin: 10px 3px 3px; padding: 0pt;">' + myThreads.toHTML() + '</ul>';
        }
      }
    );
    return false;
  });
});
