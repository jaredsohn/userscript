// ==UserScript==
// @name          LPIP-Videoeinbinder
// @namespace     Abgewandelt von http://userscripts.org/users/33515;scripts
// @description   Bindet LPIP-Videos per Mausklick ein
// @include       http://forum.mods.de/bb/thread.php*
// ==/UserScript==
//=======
var autoplay=true; // Video automatisch abspielen? true=ja, false=nein
//=======


// icons, bilder, etc
var text="function toggle(id) {var elem=document.getElementById(id);if(elem.style.display=='none'){var obj=document.getElementsByTagName('object');for (var k=0;k<obj.length;k++) {if(obj[k].className=='embedded') {obj[k].style.display='none';}}elem.style.display='block';}else{elem.style.display='none';}}";
var lpipicon = "http://letsplayimpot.de/favicon.ico";
var loader="data:image/gif;base64,R0lGODlhEgASAMQaAHl5d66urMXFw3l5dpSUk5WVlKOjoq%2BvrsbGw6Sko7u7uaWlpbm5t3h4doiIhtLSz4aGhJaWlsbGxNHRzrCwr5SUkqKiobq6uNHRz4eHhf%2F%2F%2FwAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFAAAaACwAAAAAEgASAAAFaaAmjmRplstyrkmbrCNFaUZtaFF0HvyhWRZNYVgwBY4BEmFJOB1NlYpJoYBpHI7RZXtZZb4ZEbd7AodFDIYVAjFJJCYA4ISoI0hyuUnAF2geDxoDgwMnfBoYiRgaDQ1WiIqPJBMTkpYaIQAh%2BQQFAAAaACwBAAEAEAAQAAAFY6AmjhpFkSh5rEc6KooWzIG2LOilX3Kd%2FAnSjjcyGA0oBiNlsZAkEtcoEtEgrghpYVsQeAVSgpig8UpFlQrp8Ug5HCiMHEPK2DOkOR0A0NzxJBMTGnx8GhAQZwOLA2ckDQ0uIQAh%2BQQFAAAaACwBAAEAEAAQAAAFZKAmjpqikCh5rVc6SpLGthSFIjiiMYx2%2FAeSYCggBY4B1DB1JD0ertFiocFYMdGENnHFugxgg2YyiYosFhIAkIpEUOs1qUAvkAb4gcbh0BD%2BBCgNDRoZhhkaFRVmh4hmIxAQLiEAIfkEBQAAGgAsAQABABAAEAAABWOgJo6aJJEoiaxIOj6PJsyCpigopmNyff0X0o43AgZJk0mKwSABAK4RhaJ5PqOH7GHAHUQD4ICm0YiKwCSHI7VYoDLwDClBT5Di8khEY%2BgbUBAQGgWEBRoWFmYEiwRmJBUVLiEAIfkEBQAAGgAsAQABABAAEAAABWSgJo7a85Aoia1YOgKAxraShMKwNk0a4iOkgXBAEhgFqEYjZSQ5HK6RQqHJWDPRi%2FZyxbq2Fw0EEhUxGKRIJEWhoArwAulAP5AIeIJmsdAE%2FgEoFRUaCYYJfoFRBowGZSQWFi4hACH5BAUAABoALAEAAQAQABAAAAVloCaOGgCQKGma6eg42iAP2vOgWZ5pTaNhQAxJtxsFhSQIJDWZkCKR1kgi0RSuBSliiyB4CVKBWKCpVKQiMWmxSCkUqIQ8QbrYLySD3qChUDR3eCQWFhoHhwcaDAxoAY4BaCSOLSEAIfkEBQAAGgAsAQABABAAEAAABWOgJo6a45Aoma1ZOkaRxrYAgBZ4oUGQVtckgpBAGhgHqEol1WiQFgvX6PHQJK4JKWaLMXgNWq7GYpGKJhMShZKSSFCH%2BIGEqCNIgXxAo1BoBIACKHkaF4YXf4JSh4hmIwwMLiEAIfkEBQAAGgAsAQABABAAEAAABWSgJo5aFJEoWaxFOi6LRsyE5jhooidaVWmZYIZkKBpIwiHJYklBICQKxTUCADSH7IFqtQa%2BAepgPNB8qaJGg6RQpB4P1GV%2BIWHuGBK9LpFo8HkkDAwaCIYIGhMTaAKNAmgkjS4hADs%3D";
var script=document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.appendChild(document.createTextNode(text));
document.body.appendChild(script);


var links=document.getElementsByTagName("a");
   
for (var i=0; i<links.length; i++) {
  if (links[i].href.match(/letsplayimpot\.de\/\?v=.*/gi)) {
  
    var br=document.createElement("br");
    var autoplay=(autoplay)?"&autoplay=1":"";
    var icon=document.createElement("img");
        icon.src=lpipicon;
        icon.param=links[i];
        icon.param2=i;
        icon.param3=br;
        icon.status=0;
        icon.border = 0;
        icon.addEventListener("click", eventHandler, false);
        icon.style.cursor="pointer";
        icon.style.marginLeft="5px";
        icon.style.verticalAlign="middle";
        icon.id = "icon" + i;
    links[i].parentNode.insertBefore(icon, links[i].nextSibling);
        links[i].parentNode.insertBefore(br, icon.nextSibling);
        }
  }

        
   function eventHandler(e){
	var e=e? e : window.event;
	var el=e.target? e.target : e.srcElement;
        if(el.status == 1) {
                el.status = 0;
                el.border = 0;
                links[el.param2].parentNode.lastChild.style.display='none';
                links[el.param2].parentNode.removeChild(lastChild);
        }
        else {
        el.status = 1;
        el.border = 1;
        
        var link = el.param + " ";
      el.responseDetails = GM_xmlhttpRequest({
        method: 'POST',
        url: link,
    synchronous: true
    });
    
    var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

    html.innerHTML = el.responseDetails.responseText;
    var embeditem = html.getElementsByTagName("embed")[0];
    var outerHTML = new XMLSerializer().serializeToString(embeditem)
    var start = 0;
    var end = 0;
    for (var j=0; j<outerHTML.length; j++) {
        if(outerHTML.substr(j).match(/file=/gi))
                start = j;
        else if(outerHTML.substr(j).match(/.mp4/gi))
                end = j;
    }
    outerHTML = outerHTML.substring(start, end);
    outerHTML += ".mp4";
    
        var str= "";
        str += "<embed id=\"myplayer\" name=\"myplayer\" src=\"http://letsplayimpot.de/js/player.swf\" allowfullscreen=\"true\" style=\"border: 2px solid #091827; width: 730px; height: 520px\" flashvars=\"fullscreen=true&amp;allowfullscreen=true&amp;wmode=gpu&amp;width=730&amp;height=520&amp;displayclick=play&amp;autostart=true&amp;plugins=js/lpipplaylist.swf&amp;skin=js/five.swf&amp;lpipplaylist.videoid=23945&amp;" + outerHTML + "&amp;controlbar=bottom&amp;quality=true&amp;mute=false&amp;backcolor=000000&amp;frontcolor=DB4914&amp;lightcolor=DB4914&amp;screencolor=000000&amp;start=&amp;provider=http&amp;videoid=23945\"><\/embed>";
        var object=document.createElement("object");
        object.style.width="0px";
        object.style.height="0px";
        object.style.display="none";
        object.style.background="url("+loader+") center center no-repeat";
        object.style.backgroundColor="#000";
        object.className="embedded";
        object.innerHTML=str;
        object.id="object"+el.param2;
        object.style.display='block';
        links[el.param2].parentNode.appendChild(object);//  insertBefore(object, lastChild);
        el.object = object;
        }
}
