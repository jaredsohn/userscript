// ==UserScript==
// @name            Psiphon2_Auto
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
      var proxy = 'https://xx.xx.xx.xx/xxx/'; 
      location.href = proxy + location.href;
    }
  }
  
})();