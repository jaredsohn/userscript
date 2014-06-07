// ==UserScript==
// @name           Stumbleupon Recent Shares Extension
// @namespace      SURSE
// @include        http://*.stumbleupon.com/shares/*
// @include        http://*.stumbleupon.com/shares/*/*
// ==/UserScript==


// listmsgs[i].childNodes[1].childNodes[1].innerHTML.toString() == username of share sender

function remDu(a)
{
   var r = new Array();
   o:for(var i = 0, n = a.length; i < n; i++)
   {
      for(var x = 0, y = r.length; x < y; x++)
      {
         if(r[x]==a[i]) continue o;
      }
      r[r.length] = a[i];
   }
   return r;
}

var listmsgs = document.getElementsByClassName('dlPM'); // gets all messages

var theform = document.createElement('form');
var theselect = document.createElement('select');

var senders = new Array();

theform.setAttribute("name", "frmRC");

var i = 0;

for (i; i < 10; i++)
{
	
	senders[i] = listmsgs[i].childNodes[1].childNodes[1].innerHTML;
}

var newsenders = new Array();

newsenders = remDu(senders);

var j = 0;

for (j; j < 10; j++)
{
	try {
		var opt = document.createElement('OPTION');
		opt.setAttribute("value", newsenders[j].toString());
		theText = document.createTextNode(newsenders[j].toString());
		opt.appendChild(theText);
		theselect.appendChild(opt);
	}
	catch (err) {
	
	}
}



theselect.setAttribute('id', 'ddUsers');

theselect.addEventListener ('change', function () {
var z = 0;
var p = 0;

	for (p; p < 10; p++)
	{
		document.getElementsByClassName('dlPM')[p].style.display = 'block'; //.removeChild(document.getElementsByClassName('dlPM')[z]);
	}

var tselect = document.getElementById('ddUsers');
var uname = tselect.options[tselect.selectedIndex].value.toString();

	for (z; z < 10; z++)
	{
		if (uname != document.getElementsByClassName('dlPM')[z].childNodes[1].childNodes[1].innerHTML.toString())
		{
			document.getElementsByClassName('dlPM')[z].style.display = 'none'; //.removeChild(document.getElementsByClassName('dlPM')[z]);
		}
	}
}, false);


theform.appendChild(theselect);
var thetxt = document.createTextNode("View Messages From:");

document.getElementsByClassName('sidebar')[0].appendChild(thetxt);
document.getElementsByClassName('sidebar')[0].appendChild(theform);
