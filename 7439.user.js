// kotolingr
// version 0.212
// 2007-02-09 (last updated 2007-02-13)
// by ento (http://kotonoha.cc/user/ento)
//
// This script resides at http://userscripts.org/scripts/source/7439
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
//
// To uninstall, go to Tools/Manage User Scripts,
// select "kotolingr", and click Uninstall.
//
// --------------------------------------------------------------------
//
// What I can do:
//   * insert a o/x button to the kotonoha x lingr room chat interface
//   * keep track of the koto posted by the kotonoha bot
//
// -----------------------------------------------------------------
// changelog
//
//   2007-02-13 script cleanup. no longer gpl, no functional changes
//   2007-02-12 added koto tracking
//   2007-02-09 first release
// -----------------------------------------------------------------
//
// ==UserScript==
// @name            kotolingr
// @namespace       http://kotonoha.cc/user/ento
// @description     kotonoha x lingr o/x button
// @include         http://www.lingr.com/room/kotonoha
// ==/UserScript==

/*
  kotolingr
*/

//GM_log('globals');
// globals
var maru_string = "%E2%97%8B"; // encodeURI('○');
var batsu_string = "%C3%97";  // encodeURI('×');

//GM_log('controllers');
/*
  controller functions
*/

function kl_button_action(answer){
    // when answer == true
    // case old_value  action
    // 1    'o'        send 'o'
    // 2    'ocomment' send 'ocomment'
    // 3    ''         set value 'o'
    // 4    'comment'  send 'ocomment'
    // 5    'x'        set value 'o'
    // 6    'xcomment' send 'ocomment'

    var field = document.getElementById('speakField');
    var new_mode = answer ? maru_string : batsu_string;
    var old_value = field.value;

    if(kl_is_kotomode(field)){
        // remove the old mode string
        var old_mode = kl_pop_character(field);
    }

    // this is for case 4, 6
    // we must evaluate with the mode string removed
    var immediate = '' != field.value;

    // set to new mode
    kl_push_character(field, new_mode);

    // check for case 1, 2, 4, 6 and send
    if(old_value == field.value || immediate){
        document.getElementById('speakForm').wrappedJSObject.onsubmit();
    }

    // move focus
    field.focus();
}

// looks whether the given element's inner html begins with maru/batsu
function kl_is_kotomode(element){
    var mode_string = kl_mode_string(element);
    if (maru_string == mode_string || batsu_string == mode_string){
        return true;
    }
    return false;
}

// simply encode and return the first character of the element value
function kl_mode_string(element){
    return encodeURI(element.value.substr(0,1));
}

// push aChar
function kl_push_character(element, aChar){
    element.value = decodeURI(aChar) + element.value;
}

// pop a character
function kl_pop_character(element){
    var first = element.value.substr(0, 1);
    element.value = element.value.slice(1);
    return first;
}

//GM_log('event handlers');
/*
  event handlers
*/
// function names below should be descriptive enough

function kl_batsu_onclick(event){
    kl_button_action(false);
    return false;
}

function kl_batsu_onkeypress(event){
    if(kl_should_handle_keypress(event)){
        return kl_batsu_onclick(event);
    }
    return true;
}

function kl_maru_onclick(event){
    kl_button_action(true);
    return false;
}

function kl_maru_onkeypress(event){
    if(kl_should_handle_keypress(event)){
        return kl_maru_onclick(event);
    }
    return true;
}

function kl_should_handle_keypress(event){
    var key = event.keyCode || event.charCode;
    return 13 == key; // return
}

//GM_log('message handlers');
/*
  message handlers: extracting koto
*/

// replacement for the normal notifyMessage function
function kl_notify_message(msg, render, realtime){
    // get the chatroom
    var chatroom = unsafeWindow.chatroom;

    // let it do the normal operation
    chatroom.notifyMessage(msg, render, realtime);

    // if it's from the bot
    if(kl_is_koto(msg)){
        // extract the koto from the txt (automatons seem to pass it along in h)
        var match = msg.h.match(/[\n.]*<li[^>]*class="[^"]*messageText[^"]*"[^>]*>([\n.]*.*[\n.]*)<\/li>/m);
        if(!match){ return; }
        kl_update_koto(match[1]);
    }
}

// is the message a koto posted by the bot?
function kl_is_koto(msg){
    return 'user' == msg.type && 'kotonoha bot' == msg.hdl && /automaton/.test(msg.h) && /kotonoha\.cc\/no\//.test(msg.h);
}

// update the kotp placeholder with the argument string
function kl_update_koto(txt){
    // get the place holder
    var koto = document.getElementById('kl_koto');
    if(!koto){ return; }

    // dump the txt into the koto element
    koto.innerHTML = txt;
}

// replace the handler with our own
function kl_update_chatroom_chatsystem(property, oldvalue, newvalue){
    if(newvalue.options){
        newvalue.options.notifyMessage = kl_notify_message;
    }
}

// initialization
function kl_setup_koto_handling(){
    // make a placeholder for the koto
    var koto = document.createElement('span');
    koto.setAttribute('id', 'kl_koto');
    var header = document.getElementById('pageHeader');
    var h1s = header.getElementsByTagName('h1');
    if(h1s){
        h1s[0].appendChild(koto);
    }
    // style it
    addGlobalStyle("#kl_koto { color: #777777; font-size: 0.55em; } #kl_koto a { color: #0F5887; } #kl_koto a:hover, #kl_koto a:focus { color: #DE8000} #kl_koto, #kl_koto a { font-family: 'Gill Sans','Verdana','Helvetica',sans-serif; }");

    // hook to the chatsystem
    var room = unsafeWindow.chatroom;
    if(room && room.chatSystem){
        kl_update_chatroom_chatsystem('chatSystem', null, room.chatSystem);
    }
    // watch for future changes (fixme: not sure if this is needed)
    unsafeWindow.watch('chatroom',
                       function(property, oldvalue, newvalue){
                           if(newvalue){
                               if(newvalue.chatSystem){
                                   kl_update_chatroom_chatsystem('chatSystem', null, newvalue.chatSytem)
                               }
                               newvalue.watch('chatSystem', kl_update_chatroom_chatsystem);
                           }
                       },
                        true);

}


/*
  making buttons
*/

// generic image button maker with click and keypress callback
function kl_make_image_button(img_src, onclick, onkeypress, before){
    // an image
    var img_node = document.createElement('img');
    img_node.src = img_src;
    img_node.className = 'kl_button_image';
    // make it look buttonnish
    img_node.style.border = '1px outset #f0f0f0';
    img_node.addEventListener('mousedown', kl_button_inset, false);
    img_node.addEventListener('mouseup', kl_button_outset, false);
    img_node.addEventListener('mouseout', kl_button_outset, false);

    // in an a
    var a_node = document.createElement('a');
    a_node.appendChild(img_node);
    a_node.addEventListener('click', onclick, false);

    // in a div
    var div_node = document.createElement('div');
    div_node.appendChild(a_node);
    div_node.addEventListener('keypress', onkeypress, false);

    // styling and positioning
    div_node.className = 'kl_button';
    div_node.style.left = '70%';
    div_node.style.marginLeft = '42px';
    div_node.style.position = 'absolute';
    div_node.style.top = '0pt';

    before.parentNode.insertBefore(div_node, before);
    return div_node;
}

// glue code for maru button
function kl_make_maru_button(before){
    var img_src = kl_image_source_maru();
    return kl_make_image_button(img_src,
                                kl_maru_onclick, kl_maru_onkeypress,
                                before);
}

// glue code for batsu button
function kl_make_batsu_button(before){
    var img_src = kl_image_source_batsu();
    return kl_make_image_button(img_src,
                                kl_batsu_onclick, kl_batsu_onkeypress,
                                before);
}

// base64 encoded maru image (c) purprin
function kl_image_source_maru(){
    return 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABIAAAASEAIAAACJPMVDAAAACXBIWXMAAABI' +
		'AAAASABGyWs+AAAACXZwQWcAAAASAAAAEgAjOG5KAAAD4UlEQVQ4y62Ve0zV' +
		'ZRjHP78fh7uHNwIquZgFBAwZclUuZlwaRnHzgouwZLGK0twoqc2WYDVXKSVU' +
		'y1QYhVZI4SwIhFJhExAqU0AhIjMQAoTzOxw6IodDfxBNxDUcfv97t++ez/s8' +
		'z97vK2k0Go1GwyyJhWKNEOcvXBqC+lUtNdD+dvdjMLxwJAmMjcZUsFsk1oDn' +
		'apcnIfxxn6Xg7uPcAcozSoKizK4pzYYZC2WVEIWHKu3hzFednwL+pIPNmNUW' +
		'sPnQun/aqQ34uxS0paNJIC2QGiH4iOe98FRGzBaYiL0WNBOpuv6gyxpPFiK3' +
		'vuQN6K/SdMOS2Ps2QNyR0Ghwq3UqBn386M/TJazes84S4vc9vVr4JqReA42X' +
		'ztdBj8tgK2z1Xd8nhPyLMW7a/29nEqY7hNgRV+QO/eOaPFhbv/J5iCsJSQdt' +
		'jHbsZmOZMfatYr8QVZFN43AwtsYPHO3tamBbYmoCGPeN+yiKPGX94uMfzsFf' +
		'm4cfgITIsAiIrwgNnBtmSsq7SrqixNwfFA/JSQ+1QM/gYA4Ue1YHT3tk/dGJ' +
		'JiEa3mw7CYsP31MBCSVhvaCEKV5zw8xAeihOivJI1jIDuG10eg0aMy54gbZq' +
		'TBZC/jG8YwjGEw3b4eGQwOMw2qwrvHXMjN0vH3lOUWL8g1bARNbE09C0r30J' +
		'yJ1ePe+DiZe8Abx1i/3mA5kpzxOL6sB0QHUYfq3tVoM8XDByACyrzT8AqxPm' +
		'T9w+mFWcRTVYO1kkwnDVyFlQSRVSHtCHATBjXuO7QRpGgEE0IB2UskFl66ru' +
		'hK4Xe9WgO6MPAjOk28IazdVvAt2remdwXuZwN8iuGY6bwJhvDITW7Rczb19j' +
		'bUv/KAND20QXuO903ghyUJlnDpiaqmqhKqTpLrA0t35LiPlgFnirXYQ4JjUV' +
		'gMk7Jgcg2NJzLcjmKdJxRQlf4aOHbp+BACjLqQNEkai5daRoFz1ClOc3REPX' +
		'7t5JCHb1qAT1Z2av/5cg6+sjbMHxJfsaKN/fsBe+vlaXB+ohm8y5IW1OCwch' +
		'KrNPfwulUSefBYeP7kiBlJpoedozI/XH9kw6CLGr4EsJenOvVINHrcsExAWG' +
		'HgP3U875ML7zas/0kzcbtPQToovL26Dcvz4SWkYuuoH9cmELmVnrSkAdYRZw' +
		'QxBff0cpSnVViKLLVT9B88sdr4AxzPg5WB+y0IH6nFU+UEw26I7qm0G3Th8L' +
		'cqpkBr6KmwOkJa/qAznNaPifL2ZKk98bLBRl8yerB4TolHp2wym71u+gw/bP' +
		'B+GK0LrD5G8EwJ1n1b4QvNJrL4S+4P0oeKS5RIGSphhuFnj/AHN0lmOdi73X' +
		'AAAAAElFTkSuQmCC';
}

// base64 encoded batsu image (c) purprin
function kl_image_source_batsu(){
    return 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABIAAAASEAIAAACJPMVDAAAACXBIWXMAAABI' +
		'AAAASABGyWs+AAAACXZwQWcAAAASAAAAEgAjOG5KAAADb0lEQVQ4y72Uf0zU' +
		'ZRzHX9877hAin4LNEowfRUBwuDYhofhDa23qqK1Wa1Zom226Az2YHGHLWa4N' +
		'uB+CeCo0xWrRopuXGs2S1lx/lI6x3aKDuKA8sxOna/csPLn74l1/3M5BIR6r' +
		'9fnn2Z4f79ee5/N+P0ogEAgEAvwvpYkNQizx6FOEODn53noh1KngxL8RFSK4' +
		'O5AlRP9MT6YQd1WkqHNg0P/U+3oYeLcvDNbjO6qEiGwN/bF4TGj5n6+BxbY9' +
		'Cl86e80wcMS59W+wdS2vfAUPZ63cA/7BX4uhLVArhIj2q+2JYcId18ug9S2j' +
		'Ea5t8T8Chk0V+2Dtque6YnuU2T0TIqlYKQeb2WSE8aHhj+CB7/OXQpPmwDEp' +
		'lUH9PfNinpg6D2131+bBlfxLG6HE8ZgD6l22z6UMPa82zQOLH9aWRTVgTd9x' +
		'HH4pGHFATn6hFsyHOn+SEm/SxfhO9cVgCVgK6t6GyzrfKSjdW6mH7Rdai6QM' +
		'Z8+YZysrt3OjENplUTe07218Eryj7nLIXVpUBE2pjj5QN4bXQNtm4zrwr75w' +
		'Alb6KrvBpFoHpbzhClX/U1NZ2PpC6Aa0mWC/VK8B75C7EHL2FbZCuGs6Ape9' +
		'vjeh9IPK9WDyWZ1STqeHzt9OTUkkZ0JoBRqwbTLlwET0xwfjK8Wbyw3Q0G0f' +
		'lzJ0RP1iYR0NCdXMiDoO6kBo29z5cN60HWac6ulEVO74jMrpSAFYkutqwOca' +
		'OzvfMxasenQMdq7oiEipPn3Tv+ibCaHZErkJloy6ujgm994iA7xhP/gMND97' +
		'uB0yh3NrwOt2l4A9o75KCP1a7beLgMWtb/vNdAp8H46djFu/sW//Z1JGdimT' +
		'Umpzkz8B87IDVlielvM6eHvdQWhfvfOKEPqLSdY7wOKhttc2HI0nLBbqxt6O' +
		'T2cnLFZS6pypHjCf7cyG+zwremB0aqgL9mebq4VIduks8/RMiKRjyjmwT9aH' +
		'4efff3gHsq7mnYHmmsOdUirVuoaFmx//rlp02w7B1VH/LjB0V3jBpLFMSBkK' +
		'qfpbsK/v/1jAiReOlkFmed4INH930COlpjs5PRGnxZGxj7glYDwD13r8Zni5' +
		'tGFYyscN1T23YEs8+hToy3CsgQ1przqk1KWlPpQ4Zi4yuDuQBd/scUXhpapa' +
		'n5TXz93QJRTq/6r+AtOKlAVIIHkkAAAAAElFTkSuQmCC';
}

/*
  niceties
*/

function kl_button_outset(event){
    var target = event.target.wrappedJSObject;
    if('kl_button_image' == target.className){
        target.style.borderStyle = 'outset';
        event.preventDefault();
    }
}

function kl_button_inset(event){
    var target = event.target.wrappedJSObject;
    if('kl_button_image' == target.className){
        target.style.borderStyle = 'inset';
        event.preventDefault();
    }
}

// taken from http://diveintogreasemonkey.org/patterns/add-css.html
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

/*
  debugging
*/
function GM_inspect(object){
    var s = '';
    for(p in object){
        s += p + ":" + object[p] + "\n";
    }
    GM_log(s);
    return true;
}


/*
  main
*/

//GM_log('field');
// get the speak field
var field = document.getElementById('speakField');

//GM_log('sayit');
// adjust the say it button
var sayit = document.getElementById('speakFormSubmit');
sayit.style.marginLeft = '63px'; // 42(original) + 18(button width) + 3
sayit.style.marginTop = '5px';

//GM_log('maru');
// make the maru button
var maru = kl_make_maru_button(sayit);
maru.setAttribute('id', 'kl_maru');
maru.style.marginTop = '-5px';

//GM_log('batsu');
// make the batsu button
var batsu = kl_make_batsu_button(sayit);
batsu.setAttribute('id', 'kl_batsu');
batsu.style.marginTop = '16px';

//GM_log('navigation');
// navigation
field.setAttribute('tabIndex', '1');
maru.setAttribute('tabIndex', '2');
batsu.setAttribute('tabIndex', '3');
sayit.setAttribute('tabIndex', '4'); // fixme: doesn't seem to work

//GM_log('message handler');
// message handler
kl_setup_koto_handling();
kl_update_koto('with kotolingr');

// fin.
