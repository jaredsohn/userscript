// ==UserScript==
// @id             NUS libproxy auto login
// @name           NUS libproxy auto login
// @version        1.0
// @namespace      NUS libproxy auto login
// @author         loms
// @description    
// @include        https://proxylogin.nus.edu.sg/libproxy1/public/login.asp*
// @include        https://proxylogin.nus.edu.sg/libproxy1/public/aup.asp*
// @run-at         document-end
// ==/UserScript==

login_method=2;   //1 for campus login
                  //2 for usual login

function auto_login(){   
if (document.readyState == "complete") {     
    if (document.URL.search("proxylogin.nus.edu.sg/libproxy1/public/login.asp")>0)
    {
        //alert('login');
        //"https://proxylogin.nus.edu.sg/libproxy1/public/login.asp?logup=false&url="
        if (login_method==1)
        {   document.querySelector('input[value="Campus Login"]').click();    }
        else
        {   document.querySelector('form[name=frmLogin]>input[value=Login]').click();             }
    }
    else if (document.URL.search("proxylogin.nus.edu.sg/libproxy1/public/aup.asp")>0)
    {
        //alert('accept');
        //https://proxylogin.nus.edu.sg/libproxy1/public/aup.asp?d=NUSSTF&u=
        document.querySelector('input[value="I Accept"]').click();
    }
else
{setTimeout(auto_login, 1000);}
}
}

setTimeout(auto_login, 1000);