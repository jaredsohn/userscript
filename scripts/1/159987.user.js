// ==UserScript==
// @name        FacebookAutoPokeBack
// @namespace   ravij
// @include     https://.*.facebook.com/pokes*
// @include     http://.*.facebook.com/pokes*
// @version     1.1
// @author      Ravi Joshi
// ==/UserScript==

//create an element to show that scipt is installed on the machine
body = document.body;
if (body != null) {
    div = document.createElement("div");
    div.style.display = "block";
    div.style.width = "300px";
    div.style.position = "absolute";
    div.style.top = "10%";
    div.style.left = "30%";
    div.style.backgroundColor = "#E7EBF2";
    div.style.border = "1px solid #6B84B4";
    div.style.padding = "3px";
    div.innerHTML = "<center style='font-weight:bold;color:#3B5998'>Facebook Auto Pokeback is successfully installed</center>"
    body.appendChild(div);
}

//String function to check whether the string starts with prefix
startsWith = function (string, prefix) {
    return string.indexOf(prefix) == 0;
};

//String function to check whether the string ends with suffix
endsWith = function (string, suffix) {
    return string.indexOf(suffix, string.length - suffix.length) != -1;
};

//Get all the friends who have poked you and user id of me
elements = document.getElementsByTagName('a');
uIds = [];
for (var j = 0; j < elements.length; j++) {
    var ajaxify = elements[j].getAttribute('ajaxify');

    if (ajaxify) {
        var str = elements[j].innerHTML;
        if (endsWith(str, 'Poke Back')) {
            var myuid = ajaxify.match(/uid=([0-9]+)/)[1];
            uIds.push({
                id: myuid,
                elem: elements[j]
            });
        } else if (startsWith(str, 'Show Older')) {
            var splits = ajaxify.match(/user=([0-9]+)/);
            if (splits) {
                userId = splits[1];
            }
        }
    }
}

//Get the value of fb_dtsg element
param = document.getElementsByTagName('input');
for (var j = 0; j < param.length; j++) {
    if (param[j].hasAttribute('name') && param[j].getAttribute('name') == 'fb_dtsg') {
        fb_dtsg = param[j].getAttribute('value');
    }
}

//Strip HTML from Text 
function strip(html) {
    var tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

i = 0; //  set counter to 0
function poke() { //  create a loop function
    setTimeout(function () { //  call a 5000sec setTimeout when the loop is called

        var uid = uIds[i].id;
        var http = new XMLHttpRequest(); // This will work in firefox no doubt
        var args = 'uid=' + uid + '&pokeback=1&nctr[_mod]=pagelet_pokes&__user=' + userId + '&__a=1&fb_dtsg=' + fb_dtsg;
        http.open('POST', '/ajax/pokes/poke_inline.php', true);

        http.onreadystatechange = function () {
            if (http.readyState != 4) return;
            if (http.status == 200) {
                var tmp = http.responseText;
                var resp = tmp.substring(tmp.indexOf("{"));
                var html = JSON.parse(resp).domops[0][3].__html;
                var text = document.createTextNode(strip(html));
                uIds[i].elem.parentNode.replaceChild(text, uIds[i].elem);
            } else {
                console.log('request error');
            }
        };
        //Set request header before sending it
        http.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
        http.setRequestHeader('Cache-Control', 'no-cache');
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
        http.setRequestHeader('Content-length', args.length);
        http.send(args);

        i++; //  increment the counter
        if (i < uIds.length) {
            poke(); //  ..  again which will trigger another 
        } //  ..  setTimeout()
    }, 5000) // put a delay of 5 seconds in each request
}

poke(); //  start the loop