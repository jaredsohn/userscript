// ==UserScript==
// @name           Blip.pl - Count online
// @namespace      http://userscripts.org/users/20935
// @description    Counts and displays online Followers / Following users
// @author         Wojciech 'KosciaK' Pietrzok
// @version        0.4
// @include        http://blip.pl/dashboard
// @include        http://blip.pl/users/*/dashboard
// @include        http://blip.pl/tags/*
// @include        http://www.blip.pl/dashboard
// @include        http://www.blip.pl/users/*/dashboard
// @include        http://blip.pl/tags/*
// ==/UserScript==

function $$(xpath,root) { 
  xpath = xpath
    .replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3')
    .replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]')
    .replace(/#([\w-]+)/g, '[@id="$1"]')
    .replace(/\/\[/g,'/*[');
  str = '(@\\w+|"[^"]*"|\'[^\']*\')';
  xpath = xpath
    .replace(new RegExp(str+'\\s*~=\\s*'+str,'g'), 'contains($1,$2)')
    .replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'), 'starts-with($1,$2)')
    .replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
  var got = document.evaluate(xpath, root||document, null, 5, null), result=[];
  while (next = got.iterateNext())
    result.push(next);
  return result;
 }

function createElement(type, attributes){
 var node = document.createElement(type);
 for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
  node.setAttribute(attr, attributes[attr]);
 }
 return node;
}



function count_online() {

    active = $$('a.active')[0]
    if (active && active.href.indexOf('#recommended') >= 0) {
        active = $$('a.active')[1]
    }
    if (!active || active.href.indexOf('#observing-tab') >= 0) {
        $$('#online_counter')[0].innerHTML = 'Online: ' + $$('.tracking-user-avatar-active').length// + ' z ' + $$('.tracking-user-avatar').length
    } else if (active.href.indexOf('#observed-tab') >= 0) {
        $$('#online_counter')[0].innerHTML = 'Online: ' + $$('.tracked-user-avatar-active').length// + ' z ' + $$('.tracked-user-avatar').length
    }
    else {
        $$('#online_counter')[0].innerHTML = ''
    }
    
    setTimeout(count_online, 50)
}

(function() {
    element = document.createElement('center')
    header = createElement('h4', {id: 'online_counter'})
    element.appendChild(header)

    tab = $$('#observed-tab')[0]
    if (!tab) {
        tab = $$('#observing-tab')[0]    
    }
    tab.parentNode.insertBefore(element, tab)

    count_online()

})();
