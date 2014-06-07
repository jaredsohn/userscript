// ==UserScript==
// @name          embed YouTube
// @namespace     http://userscripts.org/users/33515;scripts
// @description   If there is a YouTube link in a page, this script will embed the video via mouseclick
// @include       *
// @exclude       http://*youtube.*
// @exclude       http://*google.*
// ==/UserScript==


//=======
var autoplay=true; // Start video automatically? true=yes; false=no
//=======


// icons, pictures, etc
var text="function toggle(id) {var elem=document.getElementById(id);if(elem.style.display=='none'){var obj=document.getElementsByTagName('object');for (var k=0;k<obj.length;k++) {if(obj[k].className=='embedded') {obj[k].style.display='none';}}elem.style.display='block';}else{elem.style.display='none';}}";
var youtube="data:image/gif,GIF89a%10%00%10%00%E6%00%00%FF%0A%0A%FF%1F%1E%FF%12%13%FF%FF%FF%00%00%00%FF33%22%22%22%CC%CC%CC%11%11%11%EE%EE%EE%FF%B9%B9%FFZZ%FF..%BB%BB%BB%FF44%DD%DD%DD%88%88%88%FFJJ%FF%0F%0F%FF''%FF88%FF%AC%AC%FFcc%FF%00%00%FF%02%02%FF%A5%A5%FF%26%26%FFWW%FF%88%86%FF%1D%1D%FF%05%05%FF77%FF%DF%DF%FF%9E%9E%FF%20%1E%FF%5B%5B%FF%D8%D8%FF%AA%AA%FF%E0%E0%FF%B7%B7%FF%FB%FB%FF%AE%AE%FF%10%10%FF%C9%C9UUU%FF%B3%B3%FF%A0%A0%FF%83%83%FF%3D%3D%FF66%FFQQ%FF%2C%2C%FFMM%FF%F2%F2%FF%EF%EF%FFvv%FF%F6%F6%FFDD%FF%22%22%FF%C2%C2%FF%19%19%FF%B0%B0%FFii%FFnn%FF%D1%D1%FF%D4%D4www%FF%16%16%FF%DD%DD%FFYY%FF11%FF%E6%E6%FFyy%FF%7C%7C%FF%E2%E2%FF%A2%A2%FF%DA%DA%FF%CB%CB%FFaa%FFAA%FFpp%FFrr%FF%2B%2B%FF%85%85333%FF%A6%A6%FF%DE%DE%FF((%FF%B2%B2%FF%AF%AF%FF%A9%A9%FF%C6%C6%FF%A1%A1%FFVV%FFdd%FF%2F%2F%FF%82%82%FF55%FFee%FF%5D%5D%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%10%00%00%07%C2%80%03%03%04%83%82%86%87%86%0F%04%10%04%0F%88%8F%03B%04%2C%09%06%04%06%83%07%08%88%09%04%07%03%06%09%08%0D%9E%9B%88%9E%A0%A2%A4%10%A6%87%9E%95%97%03T%04%84%90%B6%87Y%1A%02%22%051%14%01%0C%1B%1C%3B%40%25%82%3C%24%82%13*%175_%17%1A%01Z7%82%05%1E%03%11%114aVX%1F%02UR0%82%0E%188%13G!%0A%5C6%0A.J%20%18%D5%00(%05%5BSK%15%23%15'LD%12%F3%068h%12%25C%0F%0B-Vl%40%A2C%10%0C%00%03%0A%04%19%90A%C1%80%14I%06%98%18%22h%CC%8C'W(%E4%60%60D%06%03%09b%3A%2C0%F4%C2%C7%0F'E%16%2C%E8%E2%05%8A%050%82%02%01%00%3B";
var loader="data:image/gif;base64,R0lGODlhEgASAMQaAHl5d66urMXFw3l5dpSUk5WVlKOjoq%2BvrsbGw6Sko7u7uaWlpbm5t3h4doiIhtLSz4aGhJaWlsbGxNHRzrCwr5SUkqKiobq6uNHRz4eHhf%2F%2F%2FwAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFAAAaACwAAAAAEgASAAAFaaAmjmRplstyrkmbrCNFaUZtaFF0HvyhWRZNYVgwBY4BEmFJOB1NlYpJoYBpHI7RZXtZZb4ZEbd7AodFDIYVAjFJJCYA4ISoI0hyuUnAF2geDxoDgwMnfBoYiRgaDQ1WiIqPJBMTkpYaIQAh%2BQQFAAAaACwBAAEAEAAQAAAFY6AmjhpFkSh5rEc6KooWzIG2LOilX3Kd%2FAnSjjcyGA0oBiNlsZAkEtcoEtEgrghpYVsQeAVSgpig8UpFlQrp8Ug5HCiMHEPK2DOkOR0A0NzxJBMTGnx8GhAQZwOLA2ckDQ0uIQAh%2BQQFAAAaACwBAAEAEAAQAAAFZKAmjpqikCh5rVc6SpLGthSFIjiiMYx2%2FAeSYCggBY4B1DB1JD0ertFiocFYMdGENnHFugxgg2YyiYosFhIAkIpEUOs1qUAvkAb4gcbh0BD%2BBCgNDRoZhhkaFRVmh4hmIxAQLiEAIfkEBQAAGgAsAQABABAAEAAABWOgJo6aJJEoiaxIOj6PJsyCpigopmNyff0X0o43AgZJk0mKwSABAK4RhaJ5PqOH7GHAHUQD4ICm0YiKwCSHI7VYoDLwDClBT5Di8khEY%2BgbUBAQGgWEBRoWFmYEiwRmJBUVLiEAIfkEBQAAGgAsAQABABAAEAAABWSgJo7a85Aoia1YOgKAxraShMKwNk0a4iOkgXBAEhgFqEYjZSQ5HK6RQqHJWDPRi%2FZyxbq2Fw0EEhUxGKRIJEWhoArwAulAP5AIeIJmsdAE%2FgEoFRUaCYYJfoFRBowGZSQWFi4hACH5BAUAABoALAEAAQAQABAAAAVloCaOGgCQKGma6eg42iAP2vOgWZ5pTaNhQAxJtxsFhSQIJDWZkCKR1kgi0RSuBSliiyB4CVKBWKCpVKQiMWmxSCkUqIQ8QbrYLySD3qChUDR3eCQWFhoHhwcaDAxoAY4BaCSOLSEAIfkEBQAAGgAsAQABABAAEAAABWOgJo6a45Aoma1ZOkaRxrYAgBZ4oUGQVtckgpBAGhgHqEol1WiQFgvX6PHQJK4JKWaLMXgNWq7GYpGKJhMShZKSSFCH%2BIGEqCNIgXxAo1BoBIACKHkaF4YXf4JSh4hmIwwMLiEAIfkEBQAAGgAsAQABABAAEAAABWSgJo5aFJEoWaxFOi6LRsyE5jhooidaVWmZYIZkKBpIwiHJYklBICQKxTUCADSH7IFqtQa%2BAepgPNB8qaJGg6RQpB4P1GV%2BIWHuGBK9LpFo8HkkDAwaCIYIGhMTaAKNAmgkjS4hADs%3D";
var script=document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.appendChild(document.createTextNode(text));
document.body.appendChild(script);


//


var links=document.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
  if (links[i].href.match(/youtube\.com\/watch\?v=.*/gi)) {
    links[i].href.replace(/\?v=(.*)/gi, "$1");
    var autoplay=(autoplay)?"&autoplay=1":"";
    var icon=document.createElement("img");
        icon.src=youtube;
        icon.setAttribute("onclick", "toggle('i"+i+"');");
        icon.style.cursor="pointer";
        icon.style.marginLeft="5px";
        icon.style.verticalAlign="middle";
    links[i].parentNode.insertBefore(icon, links[i].nextSibling);
    var br=document.createElement("br");
        links[i].parentNode.insertBefore(br, icon.nextSibling);
    var object=document.createElement("object");
        object.style.width="425px";
        object.style.height="355px";
        object.style.display="none";
        object.style.border="2px dashed red";
        object.style.background="url("+loader+") center center no-repeat";
        object.style.backgroundColor="#000";
        object.className="embedded";
        object.innerHTML='<param name="movie" value="http://www.youtube.com/v/'+RegExp.$1+autoplay+'"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/'+RegExp.$1+autoplay+'" type="application/x-shockwave-flash" wmode="transparent" width="425" height="355"></embed>';
        object.id="i"+i;
    links[i].parentNode.insertBefore(object, br.nextSibling);
  }
}