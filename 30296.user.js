// ==UserScript==
// @name          bash.org wipe
// @namespace     http://userscripts.org
// @description   wipe wipe wipe wipe!
// @include       http://bash.org.ru/add
// ==/UserScript==
var email2 = document.getElementsByName('recaptcha_response_field');
email2[0].value = 'a challenger appears twice!';

var counter = 0;
for(;;)
{
    location.reload(true);
    counter++;
if(counter == 10)
break;

}

