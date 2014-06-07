// ==UserScript==
// @name UpbitJS
// @description 33regster@gmail.com
// @author 33regster@gmail.com
// @license GNU
// @version 1.0
// @include https://upbit.org/trade/
// ==/UserScript==
    if (document.location != 'https://upbit.org/trade/')
      Exit;
    el = document.createElement('div'); 
    document.body.appendChild(el);
    
    str = '<div style="position:fixed; top:0; width: 100%; color:#FFFFFF; background: #000000">';

    fnc = "el = document.getElementsByClassName('content'); el = el[0]; if (!this.checked) {el.style.height = 0; el.style.visibility = 'hidden';}";
    fnc = fnc + " else {el.style.visibility = ''; el.style.height='100%';}";

    str = str + '&nbsp;&nbsp;&nbsp;<input type="checkbox" checked="checked" onClick="' + fnc + ';"/>Новости&nbsp;&nbsp;&nbsp;';    
     
    fnc = "el = document.getElementsByClassName('right-col'); el = el[0]; if (!this.checked) {el.style.height = 0; el.style.visibility = 'hidden';}";
    fnc = fnc + " else {el.style.visibility = ''; el.style.height='100%';}";
    
    str = str + '&nbsp;&nbsp;&nbsp;<input type="checkbox" checked="checked" onClick="' + fnc + ';"/>Чат&nbsp;&nbsp;&nbsp;';    
    
    str = str + '&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://analist.ru/upbit/book/">Стакан CLR/RUB</a>&nbsp;&nbsp;&nbsp;';    
    
    str = str + '&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://analist.ru/upbit/chat/">История чата</a>&nbsp;&nbsp;&nbsp;';        
    
    str = str + '&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://keccak.ru/">Портал keccak</a>&nbsp;&nbsp;&nbsp;';            
    
    str = str + '&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://vk.com/copperlark007">Группа Платона</a>&nbsp;&nbsp;&nbsp;';                
    
    str = str + '&nbsp;&nbsp;&nbsp;<a target="_blank" href="http://analist.ru/donate/">Donate</a>&nbsp;&nbsp;&nbsp;';                
    
    str = str + '</div>';
    
    el.innerHTML = str;