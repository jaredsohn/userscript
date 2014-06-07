// ==UserScript==
// @name TVGuideRig
// @namespace tvrig
// @include http://www.tv.com/lists/*/widget/poll/*
// @include http://www.tv.com/features/best-of-2013/vote/poll/*
// @version 4.2
// ==/UserScript==

//default speed is .5 seconds between votes
var speed=500,l=window.location.href, box;

function createBox()
{
	box=document.createElement('div');
	box.style.border='1px solid';
	box.style.zIndex='20';
	box.style.backgroundColor='#FFF';
	box.style.position='fixed';
	box.style.padding='10px';
	box.style.borderRadius='8px';
	box.style.marginLeft='60px';
	box.style.right='35px';
	box.style.top='35px';
	document.body.appendChild(box);
}
if(l.indexOf('widget') == -1)
{
	function showVotes(e)
	{
		var v=document.getElementsByClassName('vote_count'), vc=v.length;
		while(vc--)
			v.item(vc).style.display='table-cell';
	}
	var poll=document.getElementsByClassName('_list_widget the-poll');
	if(poll && poll.length)
	{
		poll[0].addEventListener('DOMNodeInserted',showVotes,false);
		poll=poll[0].getAttribute('data-listid');
		
		var a=document.createElement('A');
		a.innerHTML='Open Widget Page';
		a.href='http://www.tv.com/lists/' + poll + '/widget/poll/';
		a.target='_blank';
		createBox();
		box.appendChild(a);
	}
}
else
{
	if(l.indexOf('speed=') == -1) {
		speed=prompt('Confirm this dialog to start script\n\nHow fast should this autism fest run at?\n(Lower is faster)', speed);
		if(speed)
		{
			speed=parseInt(speed);
			window.location.href = l + (l.indexOf('?')==-1 ? '?' : '&') + 'speed=' + speed;
		}
	} else {
		var token=document.getElementById('page_token');
		if(token)
		{

			if(l.indexOf('show=') == -1) {
				var show=prompt('Which show needs to be fairness checked?');
				show=parseInt(show)?show:4;
				window.location.href = l + (l.indexOf('?')==-1 ? '?' : '&') + 'show=' + show;
			}else
			{
				function getFirstChildWithClass(n,cn)
				{
					if(n)
					{
						var i=-1,r=n.childNodes.length;
						while(++i<r)
							if(n.childNodes[i].className==cn)
								return n.childNodes[i];
					}
					return null;
				}
				function getQueryVariable(v)
				{
					var query=window.location.search.substring(1), vars=query.split('&');
					for (var i=0;i<vars.length;i++) {
						var pair = vars[i].split('=');
						if (pair[0] == v)
							return pair[1];
					}
				}
				show=getQueryVariable('show')-1;
				var x=document.getElementsByClassName('list_poll'),id='s:79180',page=l.substring(l.indexOf('lists/')+6,l.indexOf('/widget'));
				if(x&&(x=x[0])&&x.children.length>show)
				{
					x=x.children[show];
					var id=x.getAttribute('data-itemid');
					box=getFirstChildWithClass(getFirstChildWithClass(x,'right_info'),'title');
				}
				id=(id=='s:79149'||id=='s:138801')?'s:79180':id;
				if(!box)createBox();
				token=token.getAttribute('data-value');
				function spamVotes()
				{
					if(attempts == 20)
						window.location.reload();
					if(idleNum && idleNum<idleTotal)
					{
						idleNum++;
						return;
					}else
						idleNum=0;
					var x = new XMLHttpRequest(),
						msg = {	'list_id': page,
								'id': id,
								'a': 'a',
								'v': '+1',
								'vote_rate_limit': '3' },
						string = 'inp=' + encodeURIComponent(JSON.stringify(msg)) + '&csrfmiddlewaretoken=' + (document.cookie.match(/csrftoken=[^;]*/i)[0].split('=')[1] || '') + '&page_token=' + token;
					
					x.open('POST','/lists/update/',true);
					x.setRequestHeader('Content-type','application/json; charset=utf-8');
					x.setRequestHeader('Content-length', string.length);
					x.setRequestHeader('Connection', 'close');
					x.onreadystatechange = function(){
						if(x.readyState == 4) {
							if(x.status != 200 && x.status != 304) {
								count--;
								idleNum++;
							}
						}
					};
					x.send(string);
					box.innerHTML = box.innerHTML.substring(0, box.innerHTML.lastIndexOf('>') + 1) + 'Successful Posts: '+ ++count + ' - Attempts: '+ ++attempts;
				}
				var count=0, attempts=0, idleNum=0, idleTotal=10;
				speed = parseInt(getQueryVariable('speed'));
				speed = !speed ? 1000 : speed < 100 ? 100 : speed > 100000 ? 100000 : speed;
			
				window.setInterval(spamVotes, speed);
			}
		}
		else
		{
			createBox();
			var c=20;
			function re()
			{
				box.innerHTML='page will reload in ' + c-- +' second(s)';
				if(c==0)window.location.reload();
			}
			window.setInterval(re, 1000);
		}
	}
}