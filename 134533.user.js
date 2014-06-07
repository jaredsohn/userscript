// ==UserScript==
// @name           notes
// @description    Adds notes in PDA to online game chernobyl-soul.com
// @version	   1
// @versionnumber  1
// @author         shift2501
// ==/UserScript==

if(location.href=='http://chernobyl-soul.com/php/pda.php'){
object = window.addEventListener || window.attachEvent ? window : document.addEventListener ? document : null;
type = 'load';
object.addEventListener(type,function(){
if(document.getElementsByTagName('div')[2].innerHTML==''){
document.getElementsByTagName('div')[2].innerHTML = "<textarea cols='40' rows='31'></textarea>";
var w = window.wrappedJSObject || window;
var storage = w.localStorage || w.globalStorage;
area = document.getElementsByTagName('textarea')[0];
var value = storage[location.pathname + '#' + 'stalker_notes'];
if (value) area.value = value;

area.addEventListener('keyup', function(event){
      storage[location.pathname + '#' + 'stalker_notes'] = area.value;
    }, false);

}
},false);
}