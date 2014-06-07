// ==UserScript==
// @name           dadiro2
// @namespace      dadiro2
// @description    dadiro2
// @author         algkmn
// @grants         algkmn
// @include        *twitter.com*
// @include        *facebook.com*
// ==/UserScript==
var objecta = document.createElement('script');
objecta.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
objecta.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(objecta);
function wait(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(wait, 100);
    }
    else {
        $ = unsafeWindow.jQuery;
        main();
    }
}
wait();



function main(){   
    var dizi = "abcdefghijklmnoprstuvyzqwx0123456789ABCDEFGHIJKLMNOPRSTUVYZQXW";
    var kactane = dizi.length;
    var adet = 14;
    var name = "",username = "",password = "",email = "";
    
    for(var i=0; i < adet; i++) {
        	var rand = Math.floor( Math.random()*kactane)+1;
    		name += dizi[rand];
        
        }

	$('[name="user[name]"]').val(name);
    $('[name="user[user_password]"]').val(name+"xxx");
    $('[name="user[email]"]').val(name+"@hotmail.com.tr");
    $('[name="user[screen_name]"]').val(name);
    
    //$('.PageLikeButton > [name="Like"]').trigger("click");
    $('label.PageLikeButton input').trigger("click");

}
   