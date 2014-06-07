// ==UserScript==
// @name           deviantART Usernames
// @author         Onofrei Iulian http://revolt666.deviantart.com
// @namespace      http://userscripts.org/users/revolt
// @description    Adds the username below the deviation's thumb
// @version        9
// @require        http://sizzlemctwizzle.com/updater.php?id=100006&days=1
// @include        http://my.deviantart.com/messages/*
// @include        http://*.deviantart.com/journal/*
// @include        http://*.deviantart.com/blog/*
// @include        http://news.deviantart.com/article/*
// @include        http://browse.deviantart.com/*
// @include        http://www.deviantart.com/*
// @include        http://*.deviantart.com/favourites/*
// @exclude        http://my.deviantart.com/messages/#/*
// @exclude        http://my.deviantart.com/messages/#view=feedback
// ==/UserScript==

// @include        http://*.deviantart.com/art/*

var i,j,k=0;

add_once();

document.body.addEventListener("mousemove", shadow , false);
shadow([1]);

function shadow([nr])
{
	++k;

	if(k/10 == Math.round(k/10)||nr == 1)
	{
		var shadows = document.getElementsByTagName('span');

		//if(window.location.hostname == 'browse.deviantart.com'||window.location.hostname == 'www.deviantart.com')
		//{
			for(i=0;i<=shadows.length-1;i++)
			{
				if(shadows[i].className == 'shadow')
				{
					shadows[i].style.removeProperty('background-image');
				}
			}
		//}

		add();
	}
}

function add()
{
	var tags    = document.getElementsByTagName('a');
	var prints  = document.getElementsByTagName('div');

	if(window.location.href.search('http://my.deviantart.com/messages/#view=deviations') == -1)
	{
		for(i=0;i<=tags.length-1;i++)
		{
			if(tags[i].getAttribute('id') != 'devusernames')
			{
				if(tags[i].className == 'thumb'||tags[i].className == 'thumb ismature'||tags[i].className == 'thumb ismature antisocial'||tags[i].className == 'thumb admature'||tags[i].className == 'thumb antisocial')
				{
					var user = tags[i].host.split('.')[0];
					var div = document.createElement('div');
					var ahref = document.createElement('a');
					var span = document.createElement('span');
					var wrapper = document.createElement('div');
					var element = tags[i].lastChild;
					var width = element.getAttribute('width');
					element.setAttribute('style','border-top-left-radius:4px;border-top-right-radius:4px;');

					tags[i].setAttribute('id','devusernames');

					wrapper.className = 'ch-ctrl mc-ctrl';
					wrapper.setAttribute('style','margin-left:auto;margin-right:auto;width:' + width + 'px;');
					wrapper.appendChild(element.cloneNode(true));
					element.parentNode.replaceChild(wrapper,element);

					div.className = 'mcb-tab';
					div.setAttribute('style','padding-top:31px;');
					ahref.href = 'http://' + user + '.deviantart.com';
					ahref.className = 'print';
					span.className = 'tabtext';
					span.setAttribute('style','color:red !important;text-transform:lowercase !important;');
					span.textContent = user;

					wrapper.appendChild(div).appendChild(ahref).appendChild(span);
				}
				else if(tags[i].className == 'lit'||tags[i].className == 'thumb lit'||tags[i].className == 'thumb ismature lit')
				{
					var user = tags[i].host.split('.')[0];
					var div = document.createElement('div');
					var ahref = document.createElement('a');
					var span = document.createElement('span');
					var wrapper = document.createElement('div');
					var element = tags[i].parentNode;
					var width = tags[i].firstChild.nextSibling.getAttribute('width');
					var height = tags[i].firstChild.nextSibling.getAttribute('height');
					element.setAttribute('style','border-top-left-radius:4px;border-top-right-radius:4px;');

					tags[i].setAttribute('style','margin-top:-3px;margin-bottom:-5px;border-top-left-radius:4px;border-top-right-radius:4px;');
					tags[i].setAttribute('id','devusernames');

					wrapper.className = 'ch-ctrl mc-ctrl';
					wrapper.setAttribute('style','margin-left:auto;margin-right:auto;width:' + width + 'px;');
					wrapper.appendChild(element.cloneNode(true));
					element.parentNode.replaceChild(wrapper,element);
					wrapper.firstChild.setAttribute('style',wrapper.firstChild.getAttribute('style') + 'height:' + height + 'px;');
					//alert(height);

					div.className = 'mcb-tab';
					div.setAttribute('style','padding-top:31px;');
					ahref.href = 'http://' + user + '.deviantart.com';
					ahref.className = 'print';
					span.className = 'tabtext';
					span.setAttribute('style','color:red !important;text-transform:lowercase !important;');
					span.textContent = user;

					wrapper.appendChild(div).appendChild(ahref).appendChild(span);
				}
			}
		}
	}
	else
	{
		for(j=0;j<=prints.length-1;j++)
		{
			if(prints[j].className == 'mcbox-inner mcbox-inner-thumb mcbox-inner-thumb-deviation'&&prints[j].id != 'print')
			{
				prints[j].id = 'print';

				if(prints[j].lastChild.className == 'mcb-tab')
				{
					var user = prints[j].lastChild.previousSibling.firstChild.firstChild.host.split('.')[0];

					prints[j].lastChild.firstChild.removeAttribute('title');
					prints[j].lastChild.firstChild.href = 'http://' + user + '.deviantart.com';
					prints[j].lastChild.firstChild.className = 'print';
					prints[j].lastChild.firstChild.firstChild.setAttribute('style','color:red !important;text-transform:lowercase !important;');
					prints[j].lastChild.firstChild.firstChild.textContent = user;
				}
				else
				{
					var user = prints[j].lastChild.firstChild.firstChild.host.split('.')[0];
					var div = document.createElement('div');
					var ahref = document.createElement('a');
					var span = document.createElement('span');

					div.className = 'mcb-tab';
					ahref.href = 'http://' + user + '.deviantart.com';
					ahref.className = 'print';
					span.className = 'tabtext';
					span.setAttribute('style','color:red !important;text-transform:lowercase !important;');
					span.textContent = user;

					prints[j].appendChild(div).appendChild(ahref).appendChild(span);
				}
			}
		}
	}
}

function add_once()
{
	var css = document.createElement("link");
	css.setAttribute('rel',"stylesheet");
	css.setAttribute('type',"text/css");
	css.setAttribute('media',"Screen,Projection,TV");
	css.href = "http://st.deviantart.net/css/messages.css?7292362836";
	document.head.appendChild(css);

}