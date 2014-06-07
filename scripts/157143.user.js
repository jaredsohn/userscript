// ==UserScript==
// @name           SEkillvote
// @version        3.0.0
// @namespace      http://sensibleerection.com/
// @description    Hides comments and all replies to them from unpleasant users.
// @include        http://sensibleerection.com/entry.php/*
// @include        http://*.sensibleerection.com/entry.php/*
// ==/UserScript==

var mods = [
	'no vote',
	'+1 Good',
	'+1 Insightful',
	'+1 WTF',
	'+1 Interesting',
	'+1 Original',
	'+1 Underrated',
	'+1 Funny',
	'+1 Informative',
	'-1 Wrong Category',
	'-1 Old',
	'-1 Bad',
	'-1 WTF',
	'-1 Troll',
	'-1 Repost',
	'-1 Boring',
	'-1 Overrated',
	'-1 Flamebate',
	'-1 Unworthy Self Link',
	'-1 Bad Pr0n',
	'+1 Hot Pr0n',
	'-1 Illegal Pr0n',
	'+1 Classy Pr0n'
];
var mod_vals = [null, 17, 1, 20, 16, 5, 4, 3, 2, 22, 18, 19, 21, 9, 6, 23, 7,
                10, 8, 14, 12, 15, 13];


report_stats = function()
{
	var divs = document.getElementsByTagName('div');
	var left = null
	var i = 0;
	do
	{
		if(divs[i].getAttribute('class') == 'left_col')
			left = divs[i];
	} while(left == null && i++ < divs.length);

	var title = document.createElement('div');
	title.setAttribute('class', 'date_header_text');
	title.appendChild(document.createTextNode('Comments'));
	left.appendChild(title);

  var comments = 'Total Comments: ' + document.sekf_comments.length;
	var hidden = 'Hidden Comments: ' + document.sekf_hidden.length + ' ';
	var stats = document.createElement('div');
	stats.setAttribute('class', 'text_10px');
	stats.appendChild(document.createTextNode(comments));
	stats.appendChild(document.createElement('br'));
	stats.appendChild(document.createTextNode(hidden));
	left.appendChild(stats);

	var link = document.createElement('a');
	link.setAttribute('href', 'javascript:void(0)');
	link.appendChild(document.createTextNode('[show]'));
	var show = false;
	link.onclick = function()
	{
		link.removeChild(link.firstChild);
		var display;
		if(!show)
		{
			display = 'block';
			link.appendChild(document.createTextNode('[hide]'));
			show = true;
		}
		else
		{
			display = 'none';
			link.appendChild(document.createTextNode('[show]'));
			show = false;
		}
		for(var j = 0; j < document.sekf_hidden.length; j++)
			document.sekf_hidden[j].parentNode.parentNode.style.display = display;
	}
	stats.appendChild(link);
};

get_votes = function()
{
	var retval = [];
	var fonts = document.getElementsByTagName('font');
	for(var i = 0; i < fonts.length; i++)
	{
		var color = fonts[i].hasAttribute('color') ?
		  fonts[i].getAttribute('color') : null;
		if(color == 'green' || color == 'red')
		{
			var b = fonts[i].getElementsByTagName('b');
			if(b && b.length > 0)
			{
				var type = b[0].firstChild.data;
				var a =  fonts[i].getElementsByTagName('a');
				if(a && a.length > 0)
				{
					var profile = a.getAttribute('href');
					var user = a.firsChild.data;
					retval.push({type: type, profile: profile, user: user});
				}
			}
		}
	}

	return retval;
};

add_logic = function(header, links)
{
	header.parentNode.onclick = function()
	{
		var ids = links[1].getAttribute('href').match(/comment\.php\/(\d*)\/(\d*)/);
		var comment_id = ids[2]
		var entry_id = ids[1];
		var form = document.createElement('form');
		form.style.display = 'inline';
		form.setAttribute('name', 'form1');
		form.setAttribute('method', 'post');
		form.setAttribute('action', '/entry.php/' + entry_id);
		var hid_id = document.createElement('input');
		hid_id.setAttribute('type', 'hidden');
		hid_id.setAttribute('name', 'parent_id');
		hid_id.setAttribute('value', comment_id);
		form.appendChild(hid_id);
		var select = document.createElement('select');
		select.setAttribute('name', 'comment_mod_type_id');
		select.setAttribute('class', 'text11px');
		select.setAttribute('id', 'mod_type_id');
		for(var i = 0; i < mods.length; i++)
		{
			var option = document.createElement('option');
			option.setAttribute('value', mod_vals[i]);
			option.appendChild(document.createTextNode(mods[i]));
			select.appendChild(option);
		}
		form.appendChild(select);
		var submit = document.createElement('input');
		submit.setAttribute('name', 'submit');
		submit.setAttribute('type', 'submit');
		submit.setAttribute('id', 'submit');
		submit.setAttribute('value', 'submit');
		submit.setAttribute('class', 'text_12px');
		form.appendChild(submit);

		header.appendChild(form);
		header.parentNode.onclick = null;
	};

/*
	var votes = header.getElementsByTagName('font');
	if(votes.length > 0)
	{
		votes[0].onclick = function(event)
		{
			if(!header.popup)
			{
				var body = document.getElementsByTagName('body')[0];
				var ids =
					links[1].getAttribute('href').match(/comment\.php\/(\d*)\/(\d*)/);
				var popup = document.createElement('div');

				popup.appendChild(document.createTextNode('hallo'));
				popup.style.position = 'absolute';
			  popup.style.zIndex = 10;
			  popup.style.background = 'white';
			  popup.style.border = '1px dashed gray';
				popup.style.top = event.pageX + 'px';
				popup.style.left = event.pageY + 'px';
				popup.style.width = "100px";

				var votes = get_votes();
				popup.appendChild(document.createTextNode(votes.length));
				for(var i = 0; i < votes.length; i++)
				{
					var font = document.createElement('font');
					font.setAttribute('color', votes.color);
					var b = document.createElement('b');
					b.appendChild(document.createTextNode(votes.type));
					font.appendChild(b);
					popup.appendChild(font);
					popup.appendChild(document.createTextNode(' by '));
					var profile = document.createElement('a');
					profile.setAttribute('href', votes.profile);
					profile.appendChild(document.createTextNode(votes.user));
					popup.appendChild(profile);
					popup.appendChild(document.createElement('br'));
				}

				body.appendChild(popup);
			}
			else
			{
				header.popup.style.display = 'block';
			}
		};
	}*/
};

(function()
{
	document.sekf_comments = [];
	document.sekf_hidden = [];
  var debug = true;
  var trolls = 
  [
    19167, //valen85
    34865, //valen86
    12016, //Naruki
    0
  ];
  spans = document.getElementsByTagName('span');
	var lastindent = 0;
	var lasthidden = false;
	var hidden = 0;
	for(var i=0; i < spans.length; i++)
	{
		if(spans[i].hasAttribute('class') &&
			 spans[i].getAttribute('class') == 'entry_details_text')
		{
			var spacer = spans[i].parentNode.parentNode.getElementsByTagName('td')[0];
			var indent =
			  parseInt(spacer.getElementsByTagName('img')[0].getAttribute('width'));
			if(!isNaN(indent))
			{
				document.sekf_comments.push(spans[i]);
				var link = spans[i].getElementsByTagName('a');
				add_logic(spans[i], link);
				var hide = false;
				if(indent <= lastindent)
				{
					lastindent = 0;
					lasthidden = false;
				}
				if((lasthidden == true && indent > lastindent))
					hide = true;

				var istroll = false;
				for(var j=0; j < trolls.length; j++)
					if(link[0].getAttribute('href') == '/profile.php/' + trolls[j])
						istroll = true;
				if(istroll)
				{
					if(!hide)
						lastindent = indent;
					hide = true;
				}
				if(hide)
				{
					spans[i].parentNode.parentNode.style.display = 'none';
					spans[i].parentNode.style.background = 'pink';
					document.sekf_hidden.push(spans[i]);
					lasthidden = true;
					hidden++;
				}
			}
		}
	}
	report_stats();
}());
