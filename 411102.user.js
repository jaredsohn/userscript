// ==UserScript==
// @name        vkNickName
// @namespace   vkNickName
// @include     /^https?://vk\.com/.*$/
// @version     1
// @grant       none
// ==/UserScript==


if ('state' in window.history && window.history.state !== null)  
{
    function onPushState(callback) 
    {
        (function(pushState) 
        {
            history.pushState = function() 
            {
                pushState.apply(this, arguments);
                callback.apply(window, arguments);
            };
        })(history.pushState);
    };

    function domFucker() 
    {
        var currentUrl = window.location.href.replace(window.location.hash,'').substr(window.location.href.indexOf('://')+3);
        console.log(currentUrl);

        // Its not necessary page, so fuck off
        if (currentUrl !== 'vk.com/edit') 
        {
            return;
        }

        // Check if field already exists, if so fuck off
        var element = document.getElementById('pedit_middle_name');
        if (typeof(element) != 'undefined' && element != null) 
        {
            return;
        }

        // console.log('cur.lang.profileEdit_main_sel_bday=' + cur.lang.profileEdit_main_sel_bday);
        var fieldTitle = cur.lang.profileEdit_main_sel_bday == 'День' ? 'Отчество' : 'Middle name';

        var middleNamediv = document.createElement('div');
        middleNamediv.className = 'pedit_general_row clear_fix';
        middleNamediv.innerHTML = '<div class="pedit_general_label fl_l ta_r"><b>' + fieldTitle + ':</b></div>'+
                                  '<div class="pedit_general_labeled fl_l">'+
                                    '<input id="pedit_middle_name" class="dark" type="text" autocomplete="off" value="">'+
                                   '</div>';

        var container = document.getElementById('pedit_general');

        container.insertBefore(middleNamediv, container.childNodes[4]);
    };

    onPushState(domFucker);

    window.onload = function() { domFucker() };
}
