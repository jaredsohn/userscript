// ==UserScript==
// @name        ct10000
// @namespace   ct10000
// @include     http://jf.ct10000.com/Auction/ImmDetail.aspx*
// @version     1
// ==/UserScript==
var validate = document.getElementById('imgRand');
var imgsrc = validate.getAttribute('origin');
console.log(imgsrc);

var ajaxUrl = imgsrc.replace('ValidateImage', 'getAuctionInfo');
console.log(ajaxUrl);

var header = document.getElementById('header');

var img = document.createElement('img');
//avoid being detected
//img.src = imgsrc;

img.addEventListener("click", ct10000_img, true);
header.parentNode.insertBefore(img, header);

var input = document.createElement('input');
input.type = 'text';
input.id = 'ct10000_input';
input.addEventListener("keydown", ct10000_key, true);
header.parentNode.insertBefore(input, header);

var submit = document.createElement('input');
submit.type = 'button';
submit.value = 'submit';
submit.addEventListener("click", ct10000_submit, true);
header.parentNode.insertBefore(submit, header);
document.activeElement = submit;

var timeDiv = document.createElement('div');
header.parentNode.insertBefore(timeDiv, header);

var txtDiv = document.createElement('div');
header.parentNode.insertBefore(txtDiv, header);

var imgPay = document.getElementById('imgPay');

var unit = 10; //unit as 100ms
var timer;

//timer = setInterval( ct10000_timer, unit );

function ct10000_key(e) {
    if(e.keyCode === 13) {
        ct10000_submit();
    }
    if(e.keyCode === 120) { //F9
        ct10000_img();
    }
}

function ct10000_timer() {
    var state = imgPay.getAttribute("class");
    timeDiv.innerHTML = state;
    console.log(state.length);
    if( state.length == 23 ) {
        ct10000_img();
        clearInterval(timer);
    }
}
 
function ct10000_img() {
    console.log("image refresh");
    img.src = imgsrc + '&_=' + (new Date()).getTime();
    // GM_xmlhttpRequest({method: 'GET',
    //                    url: img.src,
    //                    overrideMimeType: 'text/plain; charset=x-user-defined',
    //                    onload: function(response) { load_image(response.responseText); }
    //                   });
}
 
function ct10000_submit() {
    var validateTxt = input.value;
    var url = ajaxUrl + '&t=1&code=' + validateTxt + '&_=' + (new Date()).getTime();
    console.log(url);
 
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send();
    if (req.status === 200) {
        console.log(req.responseText);
        var json = JSON.parse(req.responseText);
        if( json.error ) {
            console.log(json.error);
        } else {
            location.href = 'ImmOrder.aspx?orderid=' + json.orderid;
            console.log(json.orderid);
        }
    } else {
        console.log("GET Error:" + req.status);
    }
}
