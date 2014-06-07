// <![CDATA[

// ==UserScript==
// @name           Twitter Followers Counter
// @namespace      http://html-apps.com/gm/twitter
// @description    Shows how many followers each person has, their ratio of followers to following, and if they are reflexive (do they follow everyone who follows them), their bio, and action buttons.
// @include        http://twitter.*
// @include        http://*.twitter.*
// @include        https://twitter.*
// @include        https://*.twitter.*
// @license        http://creativecommons.org/licenses/by-sa/3.0/us/
// @version        9
// ==/UserScript==

function createFollowerButtonBar()
{
	el = document.createElement('div');
	el.setAttribute('id','friend_counter_bar');
	el.style.position="fixed";
	el.style.height="auto";
	el.style.width="300px";
	el.style.right="0px";
	el.style.top="50px";
	el.style.backgroundColor="#663366";
	el.style.color="#ffffff";
	el.style.borderLeft="1px solid #FFFF66";
	el.style.paddingLeft="12px";
	el.style.zIndex="100";
	
	txt = "<div style=\"height:auto;margin:0px 6px;color:#ffffff;text-align:left\">";
		txt += '<span id="friend_counter_message">';
			txt += "<a onClick=\"getFollowers()\" href=\"javascript:void(0);\">[Count Followers]</a>";
		txt += "</span>";
		txt += '<a href=\"javascript:void(0);\" onClick="document.getElementById(\'friend_counter_status\').innerHTML=\'\';return false;">[clear]</a>';
		txt += '<span onClick="this.parentNode.parentNode.innerHTML=\'\';" style="float:right;">[close]</span>';
		txt += '<span id="friend_counter_status">';
		txt += "</span>";
		txt += "<p>";
			txt += "<strong>Twitter Ajax Follower Counter</strong> by <a href=\"http://twitter.com/htmlapps\" style=\"color:#FFCCFF\">@htmlapps</a>";
		txt += "</p>";
	txt += "</div>";
	
	el.innerHTML = txt;
	
	document.body.style.paddingBottom=("50px");
	document.body.appendChild(el);
}
if(location.href.indexOf('follow')>-1) createFollowerButtonBar();

function getFollowers()
{
	try
	{
		counter=0;
		trs = document.getElementsByTagName('tr');
		for(var a in trs)
		{
			tr = trs[a];
			user_id = null;
			try
			{
				user_id = tr.getAttribute('id');
			}
			catch(e3)
			{
				//we don't care
			}
			
			if(user_id){
				if(user_id.substring(0,4) == "user")
				{
					id = user_id.substring(5);
					if(document.getElementById('followers_'+id))
					{
						continue;
					}

					if(!(isNaN(parseInt(id))))
					{
						tds = tr.getElementsByTagName('td');
						for(var b in tds)
						{
							td = tds[b];
							cls = null;
							try
							{
								cls = td.getAttribute('class');
							}
							catch(e2)
							{
								//we don't care
							}
							if(cls && -1<cls.indexOf('vcard'))
							{
								as = td.getElementsByTagName('a');
								for(var c in as)
								{
									anchor = as[c];
									if(anchor.href)
									{
										try
										{
											xmlhttp=new XMLHttpRequest();
											xmlhttp.open("GET",anchor.href,true);
											xmlhttp.send();
											xmlhttp.onreadystatechange = function()
												{
												if(this.readyState == 4 && this.status == 200)
													parseHTML(this);
												}
											counter++;
										}
										catch(errHTTP)
										{
											window.status='errHTTP:'+errHTTP.message;
										}
									}
								}
							}
						}
					}
				}
			}
		}
		document.getElementById('friend_counter_status').innerHTML='<li>Scan complete. '+counter+' requests issued.</li>';
	}
	catch(e)
	{
	}
}
slipstreamJS(getFollowers);

function parseHTML(resp)
{
	idpattern = 'id="user_(.*?)"';
	id = null;
	try
	{
		id = resp.responseText.match(idpattern , 'i')[1];
	}
	catch(e)
	{
		window.status=e.message;
	}

	if(id)
	{
		td = document.createElement('td');
		td.id='followers_'+id;
		td.style.verticalAlign='bottom';
		document.getElementById('user_'+id).appendChild(td);
		folrpattern = 'id="follower_count".*?>(.*?)\s*</';
		folgpattern = 'id="following_count".*?>(.*?)\s*</';
		folrcount = null;
		folgcount = null;
		biopattern = 'id="bio".*?class="bio".*?>(.*?)\s*</';
		biotext = '';
		try
		{
			folrcount = resp.responseText.match(folrpattern, 'i')[1];
			folrcount = folrcount.replace(/,/g,'');
			folgcount = resp.responseText.match(folgpattern, 'i')[1];
			folgcount = folgcount.replace(/,/g,'');
			folrcount = parseInt(folrcount);
			folgcount = parseInt(folgcount);

			biotext = resp.responseText.match(biopattern, 'i')[1];
			var intLineLength = 30;
			if(biotext.indexOf(' ') == -1 && biotext.length > intLineLength)
			{
				var intMarker = 0;
				var intSets = biotext.length - (biotext.length % intLineLength);
				newText = '';
				for (var intLines = 0; intLines < (intSets / intLineLength + 1); intLines++)
				{
					newText += biotext.substring(intMarker,intMarker+20) + '&lt;br&gt; ';
					intMarker = intMarker + intLineLength;
				}
				biotext = newText;
			}
		}
		catch(e)
		{
			window.status=e.message;
		}
		if(folrcount)
		{
			newHTML = '';
			newHTML += '<div title="'+biotext+'">';
			if(location.href.indexOf('following')>-1&&document.getElementById('content').innerHTML.indexOf('You follow')>-1)
			{
				newHTML+='<button onClick="jQuery.post(\'/friendships/destroy/'+id+'\');this.innerHTML=\'\';">Unfollow</button>';
			}
			else if(location.href.indexOf('follow')>-1)
				newHTML+='<button onClick="jQuery.post(\'/friendships/create/'+id+'\');this.innerHTML=\'\';">Follow</button>';
			if(folrcount>100000)
				newHTML += '<span style="background-color:#66FF66;">' + folrcount + ' followers (++++)</span>';
			else if(folrcount>10000) newHTML += '<span style="background-color:#FFFF66;">' + folrcount + ' followers (+++)</span>';
				else if(folrcount>1000) newHTML += '<span style="background-color:#99FFFF;">' + folrcount + ' followers (++)</span>';
					else newHTML += '<span>' + folrcount + ' followers (+)</span>';
			if(folgcount>0)
			{
				newHTML += '<span>'+(Math.round(folrcount/folgcount*10)/10==1?'<em>Reflex</em> ':'');
				newHTML += 'Ratio'+(folrcount<folgcount?'-':'+');
				newHTML += ' '+(Math.round(folrcount/folgcount*10)/10)+'</span>';
			}
			else newHTML += '<span>Ratio+ inf.</span>';

			newHTML += '<div style="border:1px solid silver;">'+biotext+'</div>';
			newHTML += '</div>';
			td.innerHTML += newHTML;
			document.getElementById('friend_counter_status').innerHTML+='<li>'+(document.getElementById('friend_counter_status').childElementCount)+': '+id+' retrieved.</li>';
		}
		else td.innerHTML = 'Unknown followers';
	}
}
slipstreamJS(parseHTML);

/**
	@desc		Inserts a JavaScript function into a page to call later
	@usage	slipstreamJS(ptrFunction);
*/
function slipstreamJS(ptrFunction)
{
	var elmHead,elmScript;
	elmHead=document.getElementsByTagName('head')[0];
	if (!elmHead) return;
	elmScript=document.createElement('script');
	elmScript.type='text/javascript';
	elmScript.title='slipstreamJS';
	elmScript.innerHTML=ptrFunction.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
	elmHead.appendChild(elmScript);
}

// ]]>