// ==UserScript==
// @name sachin
// @description testing
// @include http://www.160by2.com
// ==/UserScript==

     var objcode = document.getElementById('sprite_code');
    var objtype = document.getElementById('sprite_paid');
   
    var code="S1353";
    var paidtype=objtype.value;

    if(code==''){alert('please enter the code under your sprite crown');objcode.focus();return false;}
    //if(code.length < 9){alert('please enter valid code');objcode.focus();return false;}
    if((code.substring(0,1)<"a" || code.substring(0,1)>"z") && (code.substring(0,1)<"A" || code.substring(0,1)>"Z")){alert("please enter valid code");objcode.focus();return false;}
    for (var i = 1; i < code.length; i++)
    {var ch = code.substring(i, i + 1);if(ch < "0" || "9" < ch) {alert("please enter valid code");objmno.focus();return false;}}

    var url="http://www.160by2.com/sprite_codeInsert.aspx"
    var postdata =  postdata + "&txt_code="+escape(code);
    postdata = postdata + "&paid_type="+escape(paidtype);
   
    var myAjax = new Ajax.Request(url, {method:'post', postBody:postdata, TRUE, TRUE});                                        
    document.getElementById('btn_1').style.cursor = 'wait'; 
    objcode.disabled='disabled';
    objtype.disabled='disabled';

