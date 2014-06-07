// ==UserScript==
// @name LLinkify
// @description Prefetches LL Links and titles them accordingly.
// @include http://endoftheinter.net/*
// @include http://boards.endoftheinter.net/*
// @exclude http://links.endoftheinter.net/links.php?*
// ==/UserScript==

alive_link_png = 'data:image/png;base64,'+       // http://i28.tinypic.com/dq5emx.png http://hosts1.atspace.com/accept.png
'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+
'EwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hY'+
'FAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vy'+
'IKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSs'+
'L2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13Zp'+
'dyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaY'+
'ehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQ'+
'Rj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk1'+
'46BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noH'+
'XccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc'+
'04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';

adead_link_png = 'data:image/png;base64,'+       //http://i27.tinypic.com/t96wq8.png http://hosts1.atspace.com/dead.png
'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL'+
'EwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQC'+
'Y6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVk'+
'sDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE'+
'+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29'+
'pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM'+
'8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2N'+
'sLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmR'+
'QHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';

aLoader = 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh'+
'/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklr'+
'E2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAA'+
'EAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUk'+
'KhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9'+
'HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYum'+
'CYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzII'+
'unInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAA'+
'ACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJ'+
'ibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFG'+
'xTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdce'+
'CAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';

GM_addStyle("#alive_link {background:transparent url("+alive_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
GM_addStyle("#adead_link {background:transparent url("+adead_link_png+") no-repeat scroll 100% 50%;padding-right:17px;}");

function llinkify(link)
{

GM_xmlhttpRequest({
    method:"GET",
    url:link.href,
    headers:{"User-Agent":"monkeyagent"},
    onload:function(content){
      var ltitle = content.responseText.match(/<title>End of the Internet - ([^<]+)<\/title>/);
      
      if(content.responseText.search("<h2><em>This link has been deleted, and is no longer available</em></h2>") > -1)
      {
        link.innerHTML = "[Deleted]"+ltitle[1];
        link.id='adead_link';
        link.style.textDecoration = 'line-through';
      }
      
      else if(content.responseText.search("<h2><em>Invalid link!</em></h2>") > -1)
      {
        link.innerHTML = "Invalid Link";
        link.id='adead_link';
        link.style.textDecoration = 'line-through';
      }
      
      else
      {
        link.innerHTML = ltitle[1];
        link.id='alive_link';
      }
    }
  })
}

const urlRegex = /\b(?:http\:\/\/(?:links\.|.?)endoftheinter\.net\/linkme\.php\?l\=[\d]*)$/i;
const locRegex = /\b(?:http\:\/\/(?:links\.|.?)endoftheinter\.net\/linkme\.php*)/ig;
var links=document.getElementsByTagName("a");
var loc = document.location;
var counter = 0;
for (var i=0; i<links.length; i++)
{
  if (urlRegex.test(links[i].href))
  {
    counter++;
    if(counter == 1 && locRegex.test(document.location))
      continue;
    
    else
    {
      links[i].title = links[i].innerHTML;
      links[i].innerHTML = "Loading <img style=\"vertical-align:middle;\" src='"+aLoader+"'/>"
      llinkify(links[i]);
    }
  }
}