// ==UserScript==
// @name           cpanel
// @namespace      cpanel
// @include        https://theconsole.netregistry.com.au/admin/execute/cpanel/getCpanel*
// @include        http://theconsole.netregistry.com.au/admin/execute/cpanel/getCpanel*
// ==/UserScript==
var servers = new Array('srv01.websiteactive.com', 'srv02.websiteactive.com', 'srv03.websiteactive.com', 'srv04.websiteactive.com', 'srv05.websiteactive.com', 'srv06.websiteactive.com', 'srv07.websiteactive.com', 'srv16.ezyreg.com', 'srv19.ezyreg.com', 'syd-srv01.ezyreg.com', 'syd-srv02.ezyreg.com', 'syd-srv03.ezyreg.com', 'syd-srv04.ezyreg.com', 'syd-srv05.ezyreg.com', 'syd-srv06.ezyreg.com', 'syd-srv07.ezyreg.com', 'syd-srv08.ezyreg.com', 'syd-srv09.ezyreg.com', 'syd-srv10.ezyreg.com', 'syd-srv11.ezyreg.com', 'syd-srv12.ezyreg.com', 'syd-srv13.ezyreg.com', 'syd-srv14.ezyreg.com', 'syd-srv17.ezyreg.com', 'syd-srv18.ezyreg.com', 'syd-srv20.ezyreg.com', 'syd-srv21.ezyreg.com');
var move = document.getElementsByName('hostname')[0];

for(i=0; i<servers.length; i++) {
        var option=document.createElement("option");
        option.text=servers[i];
        option.value=servers[i];
		move.add(option, 0);
}
