// ==UserScript==
// @name           Sainsburys - stop auto log out
// @namespace      http://userscripts.org/users/lorriman
// @description    Stops the Sainsburys' site logging you out after what seems like 15 seconds.
// @include        https://www.sainsburys.co.uk/*
// @include        https://sainsburys.co.uk/*
// @include      http://www.sainsburys.co.uk/*
// @include      http://sainsburys.co.uk/*
// @match        https://www.sainsburys.co.uk/*
// @match        https://sainsburys.co.uk/*
// @match      http://www.sainsburys.co.uk/*
// @match      http://sainsburys.co.uk/*
// @version .4
// ==/UserScript==

function setup(){
window.setTimeout(fetchpage,60000);
}


href='https://www.sainsburys.co.uk/sol/my_account/accounts_home.jsp'
href2='http://www.sainsburys.co.uk/sol/my_account/accounts_home.jsp';

window.fetchpage = function(){
 
GM_xmlhttpRequest({
method: 'get',
url: href,
onload:function(){ setup();}
});

GM_xmlhttpRequest({
method: 'get',
url: href2,
onload:function(){ setup();}
});


}
setup();