// ==UserScript==
// @id             19b6186a-beb3-4659-a924-e706cc068717@inoyakaigor.ru
// @name           View my pass
// @version        0.1.2
// @namespace      inoyakaigor.ru
// @author         Игорь InoY Звягинцев
// @description    Делает все поля для ввода пароля обычными, чтобы можно было видеть какой пароль вводишь
// @include        *
// @run-at         document-end
// @icon data:image/png;base64,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
// ==/UserScript==

var pwds = document.getElementsByTagName("input");
for(i=0;i<pwds.length;i++){
    if(pwds[i].type == "password"){
        pwds[i].type = "text";
        pwds[i].style.border = "1px solid red";
        pwds[i].style.boxShadow = "0px 0px 4px -1px red";
    }
}
