// ==UserScript==
// @name                irctc Sucess
// @description 		you can change booking type
// @namespace   IRCTC
// @include             http://*irctc.co.in/*
// @include             https://*irctc.co.in/*
// @version     2.0
// @author              Vishal Gupta
// ==/UserScript==
alert("Start");
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);


GM_wait();
var jQ = {};
function GM_wait()
{
  /*      if(typeof unsafeWindow.jQuery == 'undefined')
        {
          alert("if");
                window.setTimeout(GM_wait,100);
        }
        else
        {      */
                jQ = unsafeWindow.jQuery;//.noConflict(true);


alert("start jQ"+JQ);
if ($("input[name='passengers[0].idCardType']").val() == "") {
                        $("input[name='passengers[0].idCardType']").val("Deepu1234");
                }

if (document.location.href.match('bookticket.do')) {

var obj1=document.getElementsByName('quota');
alert(obj1[0]);
alert(obj1[0].value);
obj1[0].value = "CK";
alert(obj1[0].value);



var obj2=document.getElementsByName('passengers[0].idCardType');

obj2[0].options[0].value = "VOTE";
alert(obj2[0].value);




var from1 = document.forms['BookTicketForm'];
var boj3=form1.elements["element_name"];
boj3[0].value='12345';
alert(boj3[0].value);

}

/*var boj3=document.getElementsByName('passengers[0].idCardNo');

obj3[0].elements[0].value= " Deepu1234";
alert(obj3[0].elements[0].value);*/
}

