// ==UserScript==
// @name          ListBestRef
// @namespace      Darwin29
// @description   Liste les ref les mieux notés (vers 1.0)
// @include        http://www.binnews.in/_bin/*
// testé sur Firefox 3.0.1
// ==/UserScript==

var table_note = new Array();

var nb_note = 0;
var id_thx = 0;

function tri_nombres(a,b)
{ return b-a; }


if(document.getElementsByTagName("span")!=null)
{
  var s = document.getElementsByTagName("span");
  
  for(var i = 0; i < s.length; i++)
  {
    if(s[i].getAttribute("class") != null)
    {
      var cls = s[i].getAttribute("class");
      if(cls == "thanks")
      {
        if(s[i].innerHTML != null)
        {
          var txt = s[i].innerHTML;
		   table_note[nb_note] = txt;
		   nb_note = nb_note + 1;
        }
      }
    }
  }
}


var x,y,z;

var tri_ok = 0;
var buffer;
var txt;

  var it = 0;
  nb_note = 0;

  var table_info = [];
  
if(document.getElementsByTagName("a")!=null)
{
  var s = document.getElementsByTagName("a");
  
  for(var i = 0; i < s.length; i++)
  {
    if(s[i].getAttribute("class") != null)
    {
      var cls = s[i].getAttribute("class");
      if(cls == "c16")
      {
        if(s[i].innerHTML != null)
        {
		
         var txt = s[i].innerHTML;
		 if (!(s[i].hasAttribute('href') && s[i].getAttribute('href').match(/liste/)))
		 {
		 table_info[it] = txt;
		 it = it + 1;
		 GM_log(txt);
		 }

        }
      }
    }
  }
}

while(!tri_ok)
{
tri_ok = 1;
	for (x=0;x<table_note.length - 1;x++)
	{
	if (parseInt(table_note[x]) < parseInt(table_note[x+1]))
			{
			tri_ok = 0;
			buffer = table_note[x+1];
			table_note[x+1] = table_note[x];
			table_note[x] = buffer;
			
			buffer = table_info[x+1];
			table_info[x+1] = table_info[x];
			table_info[x] = buffer;
			
			}
	
	}
}

  for(var i = 4; i >= 0; i=i-1)
  {
   newElement = '<a><tr><th colspan="11" class="border3">' +
   '</th> [' + table_note[i] + '] - ' + table_info[i] + '</tr></a>';
   
   var divElt = document.createElement('tr');
     divElt.innerHTML = newElement;
	 
   var navbar;
	navbar = document.getElementById('tablisteheader');
	if (navbar) {   
    navbar.parentNode.insertBefore(divElt, navbar.nextSibling);
	};
   
  }

  
  
  


