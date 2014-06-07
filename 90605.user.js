// ==UserScript==
// @name           Remove All Facebook Ads By DemianGod
// @author         DemianGod
// @version        1.4
// @namespace      http://userscripts.org/scripts/show/13787
// @description    Removes any and all ads from Facebook By DemianGod.
// @include        *facebook.com*
// ==/UserScript==

try{
var ele = document.getElementById('pagelet_eventbox');
ele.style.display = 'none';
}
catch(e){};

try{
var ele = document.getElementById('pagelet_netego_lower');
ele.style.display = 'none';
}
catch(e){};

try{
var ele = document.getElementById('pagelet_home_stream');
ele.style.width = '150%';
}
catch(e){};

try{
var ele = document.getElementById('pagelet_ads');
ele.style.display = 'none';
}
catch(e){};

try{
var ele = document.getElementById('pagelet_adbox');
ele.style.display = 'none';
}
catch(e){};

try{
var ele = document.getElementById('pagelet_chbox');
ele.style.display = 'none';
}
catch(e){};

try{
var ele = document.getElementById('pagelet_netego');
ele.style.display = 'none';
}
catch(e){};

try{
var ele = document.getElementById('adcolumn_advertise');
ele.style.display = 'none';
}
catch(e){};

try{
var ele = document.getElementById('sidebar_ads');
ele.style.display = 'none';
}
catch(e){};

try{
var ele = document.getElementById('q');
ele.style.width = '215px';
}
catch(e){};
try{
var ele = document.getElementById('navSearch');
ele.style.width = '250px';
}
catch(e){};