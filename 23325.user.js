// ==UserScript==
// @name           QuickComment
// @namespace      WindPower
// @description    Allows non-subscribers to comment directly from the deviantART Messages page.
// @include        http://my.deviantart.com/messages/
// ==/UserScript==
var inps=document.getElementsByTagName('input');
for(var i=0;i<inps.length;i++)
{
	if(inps[i].type=='checkbox')
	{
		if(inps[i].id.substr(0,3)=='c-c')
		{
			GM_xmlhttpRequest({'method':'GET',
				'url':inps[i].parentNode.getElementsByTagName('a')[0].href,
				'onload':function(responseDetails)
				{
					var res=/<div[^>]+id="comment">[\S\s]*<div[^>]+id="c(\d+)"[^>]+itemid="(\d+)">\s*(<span class="author">.*?<\/span>)\s*(<span class="time".*?<\/span>)[\s\S]*?(<div class="body">[\s\S]*?<\/div>)/i.exec(responseDetails.responseText);
					if(res!=null)
					{
						var rnd='windquick'+String(Math.random()).replace(/\./,'');
						document.getElementById('c-c'+res[1]).parentNode.innerHTML+='<div class="thought block" style="margin-left:58px;">'+res[3]+res[4]+res[5]+'<span class="links"><a class="replybutton" href="http://comments.deviantart.com/1/'+res[2]+'/'+res[1]+'#reply" id="'+rnd+'" commentid="'+res[2]+','+res[1]+'" onclick="return false;">Reply</a></span></div>';
						document.getElementById(rnd).addEventListener('click',function(e){
							var rnd='windtxt'+String(Math.random()).replace(/\./,'');
							e.target.parentNode.parentNode.parentNode.innerHTML+='<div style="margin-left:72px;" commentid="'+e.target.getAttribute('commentid')+'" align="center"><textarea style="width:100%;height:192px;" id="'+rnd+'"></textarea><br/><input id="'+rnd+'sub" type="button" value="Submit" /></div>';
							document.getElementById(rnd).focus();
							document.getElementById(rnd+'sub').addEventListener('click',function(ev){
								var par=ev.target.parentNode;
								ev.target.setAttribute('disabled',true);
								var img=document.createElement('img');
								img.setAttribute('src','data:image/gif;base64,R0lGODlhEAAQAPYAAP///wAAAPr6+pKSkoiIiO7u7sjIyNjY2J6engAAAI6OjsbGxjIyMlJSUuzs7KamppSUlPLy8oKCghwcHLKysqSkpJqamvT09Pj4+KioqM7OzkRERAwMDGBgYN7e3ujo6Ly8vCoqKjY2NkZGRtTU1MTExDw8PE5OTj4+PkhISNDQ0MrKylpaWrS0tOrq6nBwcKysrLi4uLq6ul5eXlxcXGJiYoaGhuDg4H5+fvz8/KKiohgYGCwsLFZWVgQEBFBQUMzMzDg4OFhYWBoaGvDw8NbW1pycnOLi4ubm5kBAQKqqqiQkJCAgIK6urnJyckpKSjQ0NGpqatLS0sDAwCYmJnx8fEJCQlRUVAoKCggICLCwsOTk5ExMTPb29ra2tmZmZmhoaNzc3KCgoBISEiIiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCAAAACwAAAAAEAAQAAAHaIAAgoMgIiYlg4kACxIaACEJCSiKggYMCRselwkpghGJBJEcFgsjJyoAGBmfggcNEx0flBiKDhQFlIoCCA+5lAORFb4AJIihCRbDxQAFChAXw9HSqb60iREZ1omqrIPdJCTe0SWI09GBACH5BAkIAAAALAAAAAAQABAAAAdrgACCgwc0NTeDiYozCQkvOTo9GTmDKy8aFy+NOBA7CTswgywJDTIuEjYFIY0JNYMtKTEFiRU8Pjwygy4ws4owPyCKwsMAJSTEgiQlgsbIAMrO0dKDGMTViREZ14kYGRGK38nHguHEJcvTyIEAIfkECQgAAAAsAAAAABAAEAAAB2iAAIKDAggPg4iJAAMJCRUAJRIqiRGCBI0WQEEJJkWDERkYAAUKEBc4Po1GiKKJHkJDNEeKig4URLS0ICImJZAkuQAhjSi/wQyNKcGDCyMnk8u5rYrTgqDVghgZlYjcACTA1sslvtHRgQAh+QQJCAAAACwAAAAAEAAQAAAHZ4AAgoOEhYaCJSWHgxGDJCQARAtOUoQRGRiFD0kJUYWZhUhKT1OLhR8wBaaFBzQ1NwAlkIszCQkvsbOHL7Y4q4IuEjaqq0ZQD5+GEEsJTDCMmIUhtgk1lo6QFUwJVDKLiYJNUd6/hoEAIfkECQgAAAAsAAAAABAAEAAAB2iAAIKDhIWGgiUlh4MRgyQkjIURGRiGGBmNhJWHm4uen4ICCA+IkIsDCQkVACWmhwSpFqAABQoQF6ALTkWFnYMrVlhWvIKTlSAiJiVVPqlGhJkhqShHV1lCW4cMqSkAR1ofiwsjJyqGgQAh+QQJCAAAACwAAAAAEAAQAAAHZ4AAgoOEhYaCJSWHgxGDJCSMhREZGIYYGY2ElYebi56fhyWQniSKAKKfpaCLFlAPhl0gXYNGEwkhGYREUywag1wJwSkHNDU3D0kJYIMZQwk8MjPBLx9eXwuETVEyAC/BOKsuEjYFhoEAIfkECQgAAAAsAAAAABAAEAAAB2eAAIKDhIWGgiUlh4MRgyQkjIURGRiGGBmNhJWHm4ueICImip6CIQkJKJ4kigynKaqKCyMnKqSEK05StgAGQRxPYZaENqccFgIID4KXmQBhXFkzDgOnFYLNgltaSAAEpxa7BQoQF4aBACH5BAkIAAAALAAAAAAQABAAAAdogACCg4SFggJiPUqCJSWGgkZjCUwZACQkgxGEXAmdT4UYGZqCGWQ+IjKGGIUwPzGPhAc0NTewhDOdL7Ykji+dOLuOLhI2BbaFETICx4MlQitdqoUsCQ2vhKGjglNfU0SWmILaj43M5oEAOwAAAAAAAAAAAA==');
								par.appendChild(img);
								GM_xmlhttpRequest({'method':'POST',
									'url':'http://backend.deviantart.com/global/difi/?',
									'headers':{
										'Content-type':'application/x-www-form-urlencoded'
									},
									'data':'c%5B%5D=Comments;post;'+encodeURIComponent(par.getElementsByTagName('textarea')[0].value).replace(/%3B/g,'\\%3B').replace(/'/g,'%27').replace(/,|%2C/g,'%5C%2C')+','+par.getAttribute('commentid')+',1,0&t=json',
									'onload':function(response)
									{
										if(!response.responseText.match(/^{"DiFi":{"status":"SUCCESS",/i))
										{
											alert('Could not post comment. This might be due to one or more of the following reasons:\n- deviantArt is down.\n- deviantArt changed its comment system, making this script outdated. In this case, please check for updates at http://deviant.gaiatools.com/\n- You are not connected to the Internet.\n- Something (your firewall, your router, your ISP) is blocking connections to to deviantart.com.\n- deviantArt is in read-only mode.');
										}
										else
										{
											var nod=document.getElementById('msg-'+(/"parentid":(\d+)/i.exec(response.responseText)[1]));
											nod.parentNode.removeChild(nod);
										}
									},
									'onerror':function()
									{
										alert('Could not post comment. This might be due to one or more of the following reasons:\n- deviantArt is down.\n- deviantArt changed its comment system, making this script outdated. In this case, please check for updates at http://deviant.gaiatools.com/\n- You are not connected to the Internet.\n- Something (your firewall, your router, your ISP) is blocking connections to to deviantart.com.\n- deviantArt is in read-only mode.');
									}
								});
							},false);
						},false);
					}
				}
			});
		}
	}
}