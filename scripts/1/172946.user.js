//
//	Facebook RSS
//	Copyright © 2013    Anton Chugunov
//	
//	This program is free software: you can redistribute it and/or modify
//	it under the terms of the GNU General Public License as published by
//	the Free Software Foundation, either version 3 of the License, or
//	(at your option) any later version.
//	
//	This program is distributed in the hope that it will be useful,
//	but WITHOUT ANY WARRANTY; without even the implied warranty of
//	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//	GNU General Public License for more details.
//	
//	You should have received a copy of the GNU General Public License
//	along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// ==UserScript==
// @name            Facebook RSS
// @namespace       http://userscripts.org/scripts/show/172946
// @description     Add RSS link to Facebook pages.
// @version         0.02
// @updateURL       http://userscripts.org/scripts/source/172946.meta.js
// @downloadURL     http://userscripts.org/scripts/source/172946.user.js
// @include         http://www.facebook.com/*
// @include         https://www.facebook.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant           
// @copyright       2013, Anton Chugunov (http://userscripts.org/users/346172)
// @license         GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

$(document).ready(function()
{
    var isPage = $('body.pagesTimelineLayout');
    if (isPage)
    {
        var match = $("body").html().match(/"profile_id":(\d+)/mi);
        if (match)
        {
            var pageId = match[1];
            var rssIcon = 'data:image/gif;base64,R0lGODlhFAAUAPf/AO5hFfiufuJWJthEJttFHOenkt9lOe9oJNQ2GfeaVveaU/R2IfR3HfmxeuZaIvRxDvJpFf728elhJP7z7eKGYvV/I/d7IvR6H/J3JO9kFvNxIeJpOPBpHexmJexkJNxfOelcHfeBJON5SfR7KfR7IuF1TeRtOPFsJPNxGuFpOO1mI9xhOf////V9I/WCKPWCJ/R4IeNrONdCKPZ8IvVzIvWAJvZ5IviDJuBmOeBnOP3o2PR8I+VxN91NJuVvN/Z+I//7+ORsN+tjJPNwI/JuIuVZJudeJeVwN91iOd9RJuRuN/Z2IuNqONdAJvR2G+qxnPBjE/aWTt1KIPm2hvnJsPWDK9xIHelfI/WAMv37+vvz8f3z8Pvy7+RwNttMJ/7w5fnFqfKUY+t9Uv36+ehrOP717vvIoPeTRuu1o/vezvmteuJTHt9vSexhHfe0j/R4HfV7HveoeOZZJOJTJPN1FfCih+ZcJe9fDfJnCP3p2f3p3PiyiNxdN+yUePaNP/NzFf/38/m3hPimdONsOPR8IfF4JvV+IfefW+FnOe9pHfWEL/eEJueqluitmfWDLeliJueQf/XJu/N3KvOrivWAJdpJKfGMWveDJttIJuVeK95FE/iiafaVV/vQreBkNuZnOvBrIvaNRfa9pPO8rf35+PKcdPrEm/F1Ivq9kdlLMPV0IvR6GvCgfuRsNd9+WuN7Tf359/rJp9g/HfOITO5lHfRxGOVxOOV6TPvWwfnZz+95PtY+JPzdx/NzIepWC/v18+ZzTuNQGOVVGuhmL/NqCu1iGP3y7P3y7vNuGPrHn+JNGPR5Ht9xS+u4p/aoffBsIuqZh/vi1v3l1eRbJPz29OVaJuplKd9nOPSBOdhCJO1kIOVdJeZTFeKIZ+ddJvSDPexwOf7x6eFnOPFkDPfZ0f3o2d9IGNZDLPecVPzo3viyi+qxn/3t4vJnE+2XefNzDvN4LfWKPuBPIeJqOPvHodM6JdxNJPJvIN1OJvNxHvRzFuV9YeVuN/R6K/Gkhv///yH5BAEAAP8ALAAAAAAUABQAAAj/AP9Ra1TiWo4UG5jECKLExxFbPF4x+vUvS7dtchxc8XDgxBAaS2zM+BHiRiEKpJpNm5NpmLU2ADjc67UABokWlF5cOrWuRLVgrIxFo+LsGzIUNlvUcPFihw0Rnrxxm8SiKosIseLpI7TURYsFqlrlkADCEhhc4axOaACngtcFGogESdGhQ7E7EPpt4mU1WYULcEEdiDHvAK1ZcTiNIOakQYSqplBoeKZCyIYYJ6DsqcoOlaMHCr5UFZRBhQQjiAYNaRfAKgsd6N4pAMRigi4QdorgMEEjH5YEU/JULRMFT2sWooQJEGBAyZIFDP48qGKmajlJidKwOPZJXhIDPmzAt3ij6IyhVfSquvFVqmofAj2QHJnBwI8OIJ2WjdDDIt0jMo+NQgAmK/DwAx2BWBXKOOpUJcYaubBATiXZfNBFCHAcAgQL0sADQBhVuaNJJCxskcoufIhwwwsVJKAGNhxoA44/dQBjxT7QQHJOE2yggcEiO9QCAQemOaCMOVJ4IQsCCNRjzxNjUICBBaoQcYAQRhQhQBI9YDKADDLg4wos/2hRwC38BMHEBuLgYIABSHwgJzMFcPFPQAA7';
            var img = $('<img width="20" height="20" title="" alt="" src="' + rssIcon + '"></img>');        
            var rssUrl = 'http://www.facebook.com/feeds/page.php?format=rss20&id=' + pageId;    
            var rssLink = $('<a href=' + rssUrl + '></a>').append(img);        
            $('#pagelet_timeline_page_actions > div').before(rssLink);
        }
    }
}); 
