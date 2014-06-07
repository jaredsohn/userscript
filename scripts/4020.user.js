                                                                     
                                                                     
                                                                     
                                             
/*
// ==UserScript==
// @author	      Gustavo Marin
// @name          Flickr Groups Pool Watch
// @version       0.1 (05/AGO/2005)
// @description	  Watch the last photos on each group
// @namespace     http://www.flickr.com/groups/
// @include       http://www.flickr.com/groups/
// @include       http://www.flickr.com/groups
// @include       http://flickr.com/groups/
// @include       http://flickr.com/groups
// @include       http://flickr.com/people/*
// @include       http://www.flickr.com/people/*

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox  http://www.mozilla.org/firefox and the 
// firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "flickrGroupPool", and click Uninstall.
//
// 06/12/2005 fixed for Firefox 1.5 + GM 0.6.4 (by .CK)
// 17/05/2006 fixed for Flickr Gamma (by Steeev)
// --------------------------------------------------------------------
 */

// ==/UserScript==

/*
*/

(function() {

 if(unsafeWindow) w = unsafeWindow;
 else w = window;
  
 if (document.location.href.match(/\/people\//))
 {
   var insertpoint=document.getElementsByTagName('ul')[0].parentNode;
 }
 else
   var insertpoint=document.getElementById('Main').getElementsByTagName('td')[1];
 var thegroups=document.getElementsByTagName('li');//insertpoint.getElementsByTagName('li')
 var lastmod = new Array();
 var groups = new Array();
 fetch_all = document.createElement('span');
 html = "";
 html+= "<strong>Pools</strong>: ";
 html+="<a href='javascript:;' onclick='fetch_all_photo_pools()'>Fetch All</a>";
 html+=" | <a href='javascript:;' onclick='open_all_photo_pools()'>Open All</a>";
 html+=" | <a href='javascript:;' onclick='close_all_photo_pools()'>Close All</a>&nbsp;&nbsp;";

 fetch_all.innerHTML = html;
// main = insertpoint.childNodes.item(0);
// if (main) main.parentNode.insertBefore(fetch_all, main); 
 insertpoint.appendChild(fetch_all);

 var img_link = "<img class='photo_pool_icon' src=\"data:image/gif;base64,R0lGODlhDQAPAKIAAACAAIAAgP8AAAAA%2F%2F%2F%2F%2FwAAAAAAAAAAACH5BAAAAAAALAAAAAANAA8AAAMsSLrc7mOQEIgQJCpNLdbPc2USAHjKqJlo6HTsek5VXM4uw1VjR9IoX27ISAAAOw%3D%3D\" style=\"border: 0px none  ! important; vertical-align: middle; \" height='15' width='16'>";


 for( x=0;x<thegroups.length;x++)
 {
    link = thegroups[x].getElementsByTagName('A')[0];
    groupName = link.textContent;
    var tmp = new String(link.href).split('/');
    var groupNameID = tmp.pop();
    if( groupNameID == "" ) groupNameID = tmp.pop();

    html  = '<span id="span_'+groupNameID+'" class="spanClose">';
html += '<span id="close_'+groupNameID+'" class="closeOff" onclick="close_photo_pool_feed(\''+groupNameID+'\')" >X</span>';    
html += '<span onclick="show_photo_pool_feed(\''+groupNameID+'\')" title="Group photo pool">'+img_link + '</span>'+thegroups[x].innerHTML;
    
    html += '</span>';
    html +=  '<div id="group_'+groupNameID+'" class="divClose" ></div>';
    thegroups[x].innerHTML = html;
    groups[groups.length] = groupNameID;
 }


w.fetch_all_photo_pools = function()
{
    for(var x=0;x<groups.length;x++)
    {
        w.show_photo_pool_feed( groups[x] );
    }

}

w.open_all_photo_pools = function()
{
    for(var x=0;x<groups.length;x++)
    {
        if( lastmod[groups[x]] != "" ) w.show_photo_pool_feed(groups[x]);
        w.open_photo_pool_feed( groups[x] );
    }

}

w.close_all_photo_pools = function()
{
    for(var x=0;x<groups.length;x++)
    {
        w.close_photo_pool_feed( groups[x] );
    }

}
w.show_photo_pool_feed =function ( groupNameID )
{
    
    if( lastmod[groupNameID] != "" ) w.open_photo_pool_feed(groupNameID);

    url = 'http://www.flickr.com/groups/'+groupNameID+'/pool/feed/?format=atom0.3';
    GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'application/atom+xml,application/xml,text/xml'
                },
                onload: function(response) 
                {
                 //   GM_log('Request for Atom feed returned ' + response.status + ' ' + response.statusText + '\n\n' + 'Feed data:\n' + response.responseText);
                    w.parse_photo_pool( groupNameID, response.responseText );
                }
    });
    
}

w.parse_photo_pool = function( groupNameID, response )
{
    var parser = new w.DOMParser();
    var xml = parser.parseFromString(response, "application/xml");
    var modified = xml.getElementsByTagName('updated')[0].textContent;
    w.open_photo_pool_feed( groupNameID );
    if ( modified == lastmod[groupNameID] ) return;
    lastmod[groupNameID] = modified;
    clean_photo_pool_feed( groupNameID );


    var entries = xml.getElementsByTagName('entry');
    for(var p=0;p<entries.length;p++)
    {
        var title = entries.item(p).getElementsByTagName('title')[0].textContent;
        var c = entries.item(p).getElementsByTagName('content')[0].textContent;
        var href = entries.item(p).getElementsByTagName('link')[0].getAttribute('href');
        var author = entries.item(p).getElementsByTagName('author')[0].getElementsByTagName('name')[0].textContent;
        var re =  /src="([^"])*"/g;
        var img = unescape(c).match( re ).toString();
        //var img =
        var re = /_[a-z]\.jpg/;
        img_src =  img.replace(re ,"_s.jpg" ).toString();
        title = '\"'+ title +'\"' +' by '+ author;
        var html = "<a href='"+href+"' title='"+title+"' target='_new'><img "+img_src +" alt='"+title+"' border='0'/></a>";
        document.getElementById('group_'+groupNameID).innerHTML += html;
    }
}

clean_photo_pool_feed = function( groupNameID )
{

    var d = document.getElementById('group_'+groupNameID);
    d.innerHTML = '';
}

w.open_photo_pool_feed = function ( groupNameID )
{

    var d = document.getElementById('group_'+groupNameID);
    var s = document.getElementById('span_'+groupNameID);
    var x = document.getElementById('close_'+groupNameID);
    s.className = 'spanOpen';
    d.className = 'divOpen';
    x.className = 'closeOn';
    return;

}


w.close_photo_pool_feed = function ( groupNameID )
{

    var d = document.getElementById('group_'+groupNameID);
    var s = document.getElementById('span_'+groupNameID);
    var x = document.getElementById('close_'+groupNameID);
    s.className = 'spanClose';
    d.className = 'divClose';
    x.className = 'closeOff';
    return;

}

addGlobalStyle = function ( css )
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle(
'.spanClose { padding: 2px 5px; }'+
'.spanOpen { padding: 2px 5px; border: 1px solid #666; border-bottom: none; z-index: 10; background-color: #DDD; -moz-border-radius:  5px 5px 0 0 ;}'+
'.divOpen { padding: 5px; width: 390px; background-color: #DDD;border: 1px solid #666; z-index: 20; text-align: center; margin-bottom: 5px; -moz-border-radius: 0 5px 5px 5px; margin-bottom: 8px; }'+
'.divClose { display: none; } '+
'.closeOff { display: none; } '+
'.closeOn { font-weight: bold; cursor: pointer; display: inline; } '+
'.photo_pool_icon { cursor: pointer; } '
);

})();
