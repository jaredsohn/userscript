// ==UserScript==
// @name           TabColorFix
// @description	 TabColorFix as by Rebel2206, with support for whiteflash on /me highlight
// @namespace      Rebel2206_realillusions
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

TCF = document.createElement('script');
TCF.appendChild(document.createTextNode((<r><![CDATA[


// dAmn TabColorFix
// Attempts to make the new dAmn tab colors flash more conveniently.

// Recovering old flashTab function
dAmnChatTabs_flashTab_PRE = dAmnChatTabs_flashTab; 

// Creating needed CSS styles
hs      = document.createElement('style')
hs.type = "text/css"
hsi     = document.createTextNode(".damntcf-preload, .damnc-tabbar strong.damntcf-highlighted, .damnc-tabbar a.damntcf-highlighted, .damnc-tabbar strong.damntcf-highlighted i, .damnc-tabbar a.damntcf-highlighted i { background-image: url(http://i180.photobucket.com/albums/x316/Rebel2206/tabhigh.gif) !important; } .damntcf-preload { position: absolute; top: 0; right: 0; width: 1px; font-size: 1px; height: 1px; overflow: hidden; visibility: hidden; }")
hs.appendChild(hsi)
document.getElementsByTagName('head')[0].appendChild(hs)

// Creating image preloader to remove loading lag
pl      = document.createElement('div')
pl.className = "damntcf-preload"
pl.innerHTML = "_"
document.getElementsByTagName('body')[0].appendChild(pl)

dAmnChanChat.prototype.onAction = function (C, A) {
    var B = "action";
    var D = 1
    if (-1 != A.search(RegExp(dAmn_Client_Username, "im"))) {
        B += " alt0";
        D = 2
    }
    this.makeText(B, "* " + C, A, D);
}


// The function below is the default dAmnChatTabs_flashTab function provided in dAmn 0.9, altered by me slightly.
dAmnChatTabs_flashTab = function (tab)
{
    if (dAmnChatTab_active != tab.id && tab.tab_el.tagName == 'A') {
        var c;
        switch (tab.data) {
            case 1:
		// People are talking
                c = '#d10000';
                break;i
            case 2:
		// People are talking to you
                c = '#fffed3';
		if(tab.tab_el.className.indexOf('damntcf-highlighted') == -1) tab.tab_el.className += ' damntcf-highlighted'
                break;
        }

        if (tab.tab_el.style.color != c) {
            tab.tab_el.style.color=c;
            tab.tab_el.style.fontWeight='bold';
        }
        if (tab.tab_el.firstChild) {
            tab.tab_el.firstChild.style.visibility= (tab.flash_count&1)?'hidden':'visible';
        }
        if (tab.flash_count--) {
            tab.timer = window.setTimeout( function(){ dAmnChatTabs_flashTab(tab); }, 500 );
        }
    }
}

]]></r>).toString()));
document.getElementsByTagName('head')[0].appendChild(TCF)