// ==UserScript==
// @name           E-Hentai 1024-Compatibility
// @namespace      HV_1024_blahblah
// @description    Makes e-hentai galleries work with 1024-width resolutions.
// @include        http://g.e-hentai.org/*
// ==/UserScript==

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

function format_gallery_list()
{
  // Change/add styles
  var css = "";
  css += "div.ido{ width:980px;}";
  css += ".itg{ width:955px;}";
  css += "div#dm{ left:760px; top:0px;}";
  
  css += "div.itd1{ margin: 0px; width: 204px;}";
  css += "div.itd2{ width: 204px;}";
  css += "div.itd4{ width: 204px;}";
  
  css += "div.ie{ padding-left: 0px;}";
  css += "tc.ictd{ padding: 0px;}";
  
  addGlobalStyle( css);
  
  // Fix List entries so they don't go double-height
  var to_parse = document.getElementsByClassName('it3');
  for( var i = 0; i < to_parse.length; i++)
    to_parse[i].style.width = "460px";
    
  // Fix "Popular Right Now"
  to_parse = document.getElementsByTagName('div');
  for( var i = 0; i < to_parse.length; i++)
    if( to_parse[i].style.width == "1175px")
      to_parse[i].style.width = "1020px";
      
  // Fix Ads
  to_parse = document.getElementsByClassName('ie');
  document.getElementsByTagName('body')[0].insertBefore(to_parse[1],null);  // Sorry
  
  // Fix thumbnail view (change it to 4 per instead of 5)
  var table_root = document.getElementsByClassName('itg')[0];
  while( table_root.getElementsByClassName('c').length > 0)
    table_root.removeChild(table_root.getElementsByClassName('c')[0]);
    
  var imgs = table_root.getElementsByClassName('itd1');
  for( var i = 4; i < imgs.length; i+=4)
  {
    var newElement = document.createElement('div');
    newElement.setAttribute('class','c');
    table_root.insertBefore(newElement, imgs[i]);
  }
  
  var newElement = document.createElement('div');
  newElement.setAttribute('class','c');
  table_root.insertBefore(newElement, null);
}

function format_gallery_view()
{
  // Change/add styles
  var css = "";
  
  css += "div.gm{width:980px;padding:0px;}";
  css += "div#gd1{position:absolute; top:450px;}";
  css += "div#ebo{left:100px;}";
  css += "div#gdt{width:980px;}";
  
  addGlobalStyle( css);
  
  // Reorder tables
  var table_root = document.getElementById('gtt');
  var node_count = table_root.getElementsByTagName('td').length;
  var nodes_per_row = (table_root.getElementsByTagName('td')[0].style.width == "235px")?4:8;
  
  // Insert necessary extra rows
  while( table_root.getElementsByTagName('tr').length * nodes_per_row  < node_count)
  {
    var newElement = document.createElement('tr');
    table_root.firstChild.insertBefore(newElement,null);
  }
  
  // Arrange data nodes so that there are 8-per row instead of 10-per-row (4 per for large thumbnails)
  var table_rows = table_root.getElementsByTagName('tr');
  for( var i = 0; i < table_rows.length; i++)
  {
    var table_nodes = table_rows[i].getElementsByTagName('td');

    while( table_nodes.length > nodes_per_row)
    {
      table_rows[i+1].insertBefore( table_nodes[table_nodes.length-1], table_rows[i+1].firstChild);
      table_nodes = table_rows[i].getElementsByTagName('td');
    }
  }
}

// Root Procedure
{
  // Determine what type of page it is
  if( document.getElementsByClassName('ido').length >= 1)
    format_gallery_list();
  if( document.getElementsByClassName('gm').length >= 1)
    format_gallery_view();
}
  
