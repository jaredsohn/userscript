// ==UserScript==
// @name           Fuckin X's
// @namespace      realillusions
// @description    Removes the x's on the current chat tab
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

with(unsafeWindow){

function noX(){
dAmnChatTabs_activate_noClose = dAmnChatTabs_activate;
dAmnChatTabs_activate = function( id , real )
{
 if (dAmnChatTabs_activate_timer) {
 window.clearTimeout( dAmnChatTabs_activate_timer );
 }
 dAmnChatTabs_activate_timer = null;

  if (real && dAmnChatTabStack[0] != id) {
 dAmnChatTabStack = dAmn_arrayRemValue( dAmnChatTabStack, id );
 dAmnChatTabStack = [id].concat(dAmnChatTabStack);
 }

 if (dAmnChatTab_active != id) {

 if (dAmnChatTab_active) {
 var atab = dAmnChatTabs[dAmnChatTab_active];
 atab.data = 0;
 var a = dAmn_MakeEl( 'A' );
 var s = dAmn_AddSpan( a,null,atab.name );
 var o = dAmnChatTab_active;
 a.onclick=function(){ dAmnChatTabs_activate(o,true) };
 a.appendChild(dAmn_MakeEl('I'));
 dAmnChat_tabbar.insertBefore(a,atab.tab_el);
 dAmn_DeleteSelf( atab.tab_el );
 atab.tab_el = a;
 atab.el.style.visibility='hidden';
 }
 dAmnChatTab_active = id;

 if (dAmnChatTab_active) {
 var j;
 var atab = dAmnChatTabs[dAmnChatTab_active];
 var s = dAmn_MakeEl( 'STRONG', null, atab.name );
 s.appendChild(dAmn_MakeEl('I'));
 dAmnChat_tabbar.insertBefore(s,atab.tab_el);
 dAmn_DeleteSelf( atab.tab_el );
 atab.tab_el = s;
 dAmn_CalculateLayout();
 atab.el.style.visibility='visible';
 dAmnChats[id].channels.main.input.setFocus();
 dAmnChatTabs_activate_timer = window.setTimeout( dAmnChatTabs_activate_active, 5000 );
 }
 dAmn_InvalidateLayout();
 }
}
}

setTimeout(noX,5);

}