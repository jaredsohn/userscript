// ==UserScript==
// @name            Psiphon2_Manual
// @author		      Cye3s
// @include         *
// ==/UserScript==

(function () {
  if(document.documentURI.substr(0,14)=="about:neterror")
  {
    var error_div = document.getElementById("errorLongDesc");
    var error_btn = document.getElementById("errorTryAgain");
    var securityOverride_Div = document.getElementById("securityOverrideDiv");
    if (error_div && error_btn && !securityOverride_Div)
    {
      a=document.createElement("a"); 
      a.name='Psiphon2'; 
      a.href='https://xx.xx.xx.xx/xxx/'+location.href; 
      a.innerHTML="用Psiphon2代理访问";
      a.setAttribute("style","margin-left:20px;");
      error_btn.parentNode.appendChild(a);
    }
  }
  
})();