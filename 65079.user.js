// ==UserScript==
// @name           BT Host Previews
// @namespace      c1b1.de
// @include        *bthost.de/index.php*site=user*
// ==/UserScript==


var table = document.getElementsByClassName('statistik')[0].getElementsByTagName('tbody')[0];

var tr = table.children;

for(var i = 1; i < tr.length; i++)
  {
  if(! tr[i].id)
    {
    var src = tr[i].getElementsByTagName('a')[0].href.replace('files','thumb');
    var img = document.createElement('img');
    img.setAttribute('alt','No Preview');
    img.setAttribute('src',src);
    tr[i].getElementsByTagName('td')[0].replaceChild(img,tr[i].getElementsByTagName('td')[0].firstChild);
    };
  };


var a = document.createElement('a');
a.setAttribute('href','#');
a.addEventListener('click',ensize,false);
a.appendChild(document.createTextNode('Ensize'));
tr[0].getElementsByTagName('th')[0].appendChild(a);


function ensize()
  {
  for(var i = 1; i < tr.length; i++)
    {
    if(! tr[i].id)
      {
      var img = tr[i].getElementsByTagName('img')[0];
      img.src = img.src.replace('thumb','files');
      img.alt = 'Not displayable';
      img.setAttribute('style','max-width:200px;max-height:200px;');
      };
    };
  };