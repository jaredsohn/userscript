// ==UserScript==
// @name           dAmnFix
// @namespace      realillusions
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

 
with(unsafeWindow){

function $(elid){
return document.getElementById(elid);
}

function setCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

//Reset flashing tabs?
if(!getCookie("oldflash")){
	if(window.confirm("Thanks for installing dAmnFix! If you would like to use the old style flasing tabs (black/red/white), please click OK. If you prefer to use the current red/black system, or are using `electricnet's fix, please click Cancel.")){
		setCookie("oldflash",true)
		}
		else{setCookie("oldflash",false)}
	}

//Old flash tab functions from previous beta
if(getCookie("oldflash")=='true'){
	dAmnChatTabs_flashTab_damnFIX = dAmnChatTabs_flashTab; 
	dAmnChatTabs_newData_damnFIX  = dAmnChatTabs_newData;

	dAmnChatTabs_flashTab = function(tab){
    if (dAmnChatTab_active != tab.id && tab.tab_el.tagName == 'A') {
        var c;
        
        switch (tab.data) {
            case 1:
            	//General talking, can be a #6digit hex
                c = 'maroon';
                break;
            case 2:
            	//HEY, I'M TALKING TO YOU!, can be a #6digit hex
                c = 'white';
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

dAmnChatTabs_newData = function(id,level){
if (dAmnChatTab_active != id) {
        var tab = dAmnChatTabs[id];
        if (tab && (!tab.data || tab.data < level)) {
            if (tab.timer) {
                window.clearTimeout(tab.timer);
            }
            tab.data = level;
            tab.flash_count = 6; // has to be even
            dAmnChatTabs_flashTab(tab);
        }
    }
}
//end if
}
	
//Written the way they are to override dA defaults
//Changes chatspace fontsize, members list fontsize emote vertical align, flyout z-indexes,topic/title size, /whois and error box font sizes
GM_addStyle(".damncr .msg,.damncrc-error, .damncr .userinfo,\
				.damncrc-icon-roomname, .damncrc-iconbar-ctrls a{font-size:8pt;} .damncr-members{font-size:10px!important;}\
				.damncrc-input input, .damncrc-input textarea{z-index:1;font-size:8pt;}\
				.damnc-tabbar strong,.damnc-tabbar a{top:0px;font-size:8pt;}\
				.damnc-tabbar strong img{top:1px;}\
				.damncrc-icon-roomname, .damncrc-iconbar-ctrls a{font-size:8pt!important}\
				.damncrc-chat-window div img{vertical-align:baseline;}\
				.damncr-title{font-size:8pt;padding-top:.5em;}.damncrc-topic{font-size:8pt;padding:.4em .2em")
}