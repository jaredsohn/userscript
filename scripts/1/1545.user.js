// ==UserScript==
// @name           Lunarstorm Lajv
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Shows lunar lajv messages in the banner spaces
// @include        http://www.lunarstorm.se/top/top_inside*
// ==/UserScript==

if( top.seen ) return;
top.seen = {};

top.GM_setValue = function( name, value )
{
  return top[name] = value;
}
top.GM_getValue = function ( name, value )
{
  if( undefined === top[name] ) return value;
  return top[name];
}

function visa( n, namn )
{
  var html = (n == 2 ? '' : ' |') + ' <a id=';
  return html+n+" href='javascript:top.config_gender("+n+")'>"+namn+"</a>";
}

top[0][2].location = "data:text/html;charset=iso-8859-1,<html><head><base target='lunar_main'/><style type='text/css'>a {text-decoration:none;}\na:focus{text-decoration:underline;border:none;margin:0;padding:0;}body{background:#296b84 no-repeat 50% 0;}</style></head><body><div id='msg' style='position:absolute;left:4px;right:4px;top:410px'></div><div style='position:absolute;bottom:4px;left:4px;'>Lajv:"+visa(2,"alla")+visa(1,"flickor")+visa(0,"pojkar")+visa(-1,"inga")+"</div></body>";

top.X = top[0][0].document.getElementsByTagName('iframe')[0].parentNode;
top.X.parentNode.style.background="#4D88A1"; //"#135975" //"#296B84";

//alert( 'after init' );

top.config_gender = function( n )
{
  var gender = n, msg = 'Ett Ã¶gonlock! *springer och hÃ¤mtar lajvsidan*';
  if( n === undefined )
  {
    var boys = confirm( 'Visa lajv frÃ¥n pojkar?' ) ? 1 : 0;
    var girls = confirm( 'Visa lajv frÃ¥n flickor?' )? 2 : 0;
    gender = girls + boys - 1;
  }
  top.GM_setValue( 'gender', gender );
  var a = parseInt( ((new Date()).getTime()-2397096e5) / 315576e5 );
  var me = '%7B6590b5f4-e815-40df-af5f-ed163687a00e}';
  if( n < 0 )
    msg = 'Adios!';
  top.setRightPane( me, 'Ohayou P'+a, msg );
  setTimeout( top.setRightPane, 2e3 );
  // could be split out to an init() method:
  if( top.callBackId )
    clearInterval( top.callBackId );
  if( top.GM_getValue( 'gender', -1 ) >= 0 )
  {
    var x = "try{top.loadURL(top.URLLoaded);}catch(e){}";
    eval( x );
    top.callBackId = setInterval( x, 2e4 );
  }
  else
    top.X.innerHTML = '';
}

top.setRightPane = function( id, name, msg )
{
  with(top[0][2].document)
  {
    getElementById('msg').innerHTML = name ? '<b><a target="lunar_main" style="color:black;" href="http://www.lunarstorm.se/usr/usr_presentation.asp?userid='+id+'">'+name+'</a>:</b> '+msg : '';
    body.style.backgroundImage = name ? 'url('+top.imglink('large',id)+')':'';
  }
}

top.imglink = function(s,i)
{
  return 'http://photo.lunarstorm.se/'+s+'/'+i.replace(/%7B/i,'{').substr(1,3)+'/'+i+'.jpg'
}

top.loadURL = function( c )
{
  top[1].location = '/ljv/ljv_lajvlog.aspx?gender='+ top.GM_getValue( 'gender', 2 ) +'&logmode=0';
  setTimeout( function()
  {
    c(top[1].document.body.innerHTML)
  }, 1e3);
}

top.URLLoaded = function( x )
{
  var i=20, T=(new Date()).getTime(), r='', msg;
  var re=/<a( href=".usr.usr_presentation.asp.userid=([^"]+)">)([^<]+)<\/a> ([^:]+):<br>([^<]*)/g;
  while(i--&&(m=re.exec(x)))
  {
    msg=m[5].replace(/"/g,'&amp;quot;').replace(/'/g,'&amp;apos;').replace(/[\n\r\t]+/g,' ').replace(/\\/g,'\\\\');
    o='top.setRightPane("'+m[2]+'","'+m[3]+' '+m[4]+'","'+msg+'")';
    if((top.seen[m[3]]||0)<T)
      r+='<div style="float:left;margin:1px 0.25ex;"><a target=lunar_main href=/usr/gst_guestbook.asp?userid='+m[2]+'><img onmouseover=\''+o+'\' onclick=\'setTimeout("'+o+'",5e2)\' onerror=this.parentNode.parentNode.style.display="none" border=0 src='+top.imglink('small',m[2])+' height=47 width=35></a><br/><div style="width:35px;text-align:center;"><a target=lunar_main style=text-decoration:none'+m[1]+m[4]+'</a></div></div>';
    else
      i++;
    top.seen[m[3]]=T
  }
  if( i<19 )
    top.X.innerHTML=r
};

setTimeout( "top[0][2].document.getElementById('2').focus();top.config_gender(2)", 50 );
