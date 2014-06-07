// ==UserScript==
// @name           Reveal FanPage
// @namespace      reveal_fanpage
// @author         http://www.facebook.com/doudou          
// @description    Révéler les images "cachées" et éviter de devenir fan !
// @include        http://www.facebook.com/pages/*
// @include        http://*.facebook.com/*
// ==/UserScript==

function addStyle($style) {
    var head = document.getElementsByTagName("head")[0];
    if (head) {
        var style = document.createElement("style");
        style.textContent = $style;
        style.type = "text/css";
        head.appendChild(style);
    }
    return style;     
}
function $($id) {
    return document.getElementById($id);
} 
addStyle('a.uiButtonDisabled[id="revealStaticFBML"] i.customimg { opacity:0.5 }')

function checkStaticFBML() {
    if ($('app_content_4949752878')) {
        if (!$('revealStaticFBML')) {
            app_tab_icon = document.getElementsByClassName('app_tab_icon');
            for (a=0,l=app_tab_icon.length;a<l;a++) {
                if (/4949752878/.test(app_tab_icon[a].style.backgroundImage)) {
                    button = document.createElement('span');
                    button.style.marginLeft = '10px';
                    button.innerHTML = ''+
                    '<a href="#" id="revealStaticFBML" class="mas profile_connect_button uiButton uiButtonDefault uiButtonMedium">'+
                    '   <i class="customimg img spritemap_1hfnji sx_2770fd" style="background-image:url(\'http://photos-g.ak.fbcdn.net/photos-ak-sf2p/v43/126/4949752878/app_4_4949752878_8942.gif\'); background-position:-16px 0px"></i>'+
                    '   <span class="uiButtonText">Reveal Static FBML</span>'+
                    '</a>';
                    document.getElementsByClassName('profile_name_and_status')[0].appendChild(button);
                    $('revealStaticFBML').addEventListener('click', function() {
                        a = document.getElementById('app_content_4949752878').getElementsByTagName("*");
                        for (i in a) a[i].style.visibility = 'visible';
                        $('revealStaticFBML').className = 'mas profile_connect_button uiButton uiButtonDefault uiButtonMedium uiButtonDisabled'; 
                    }, false)
                }
            }
        }
    }
    else {
        if ($('revealStaticFBML')) {
            document.getElementsByClassName('profile_name_and_status')[0].removeChild($('revealStaticFBML').parentNode)
        }
    }
    setTimeout(checkStaticFBML, 1000);
}
checkStaticFBML();