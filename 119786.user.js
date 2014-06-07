// ==UserScript==
// @name           Audition_Char
// @namespace      http://127.0.0.1/
// @description    Audition_Char
// @include        htt*://*.playpark.com/play/au/*
// ==/UserScript==

var expr =
{
    keypress       : 
    {
        user_name  :   /[a-zA-Z0-9,\/. \[\]@#&()-_]/ ,
        user_pwd    :   /[a-zA-Z0-9,.!@#$%^&*()]/,
        otp               :  /[0-9]/
    },
    
    pattern    :
    {
        user_name  :   /^[*]{6,12}$/ ,
        user_pwd    :   /^([*]{6,12})$/ ,
        email            :   /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/ ,
        otp               :  /^[*]{6}$/
    }
}
        
 function IsValid(e, format)
{    
        var keyCode;
        var keyChar;
        var numcheck;

        keyCode = e.keyCode || e.which; 
        
        if (keyCode==8 || keyCode==9 || keyCode==13) return true; //8:Back button, 9:Tab, 13:Enter
       
        keyChar = String.fromCharCode(keyCode);
        numcheck = format;  
  
        return numcheck.test(keyChar);

}


function IsMatch(RegExp , Val)
{
    return RegExp.test(Val);
}