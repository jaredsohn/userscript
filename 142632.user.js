// ==UserScript==
// @name        vk_Nick
// @namespace   vk_Nick
// @description Добавляет поле ввода отчества (никнейма) на странице редактирования vk.com
// @include     http://vk.com/edit
// @author	xandros & sashok
// @license	BSD
// @version     0.3
// @grant       none
// ==/UserScript==

function main(callback) {
    
    script = document.createElement('script');
    script.textContent = '(' + callback.toString() + ')();';
    document.body.appendChild(script);
}

function script() {
    
    var jquery = function(callback) 
    {
        var wrapper = function() 
        {
          callback();
        }
    
        if(typeof jQuery == 'undefined') 
        { 
          jQs = document.createElement('script');
          jQs.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
          jQs.addEventListener('load', wrapper);
          document.body.appendChild(jQs);
        } 
        else 
        {
          wrapper();
        }
    }
    var listen = function() 
    {
        var myscript = function() 
        {
            var $ = window.jQuery;
             midname = '<div class="pedit_general_row clear_fix"><div class="pedit_general_label fl_l ta_r">Отчество:</div><div class="pedit_general_labeled fl_l"><input type="text" value="" id="pedit_middle_name" class="dark" autocomplete="off"/></div></div>';
    if(!$("input").is("#pedit_middle_name"))
    {
        $('.pedit_general_row:eq(1)').after(midname);
    }
        }
        jQuery(document).ready(myscript);
    }
    jquery(listen);
}
main(script);
