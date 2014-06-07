// ==UserScript==
// @name              First and Last Posts
// @description     	It shows first and last posts of the topics without needing to enter in them
// @include        http://www.orkut.com/CommTopics.aspx*
// @include        http://www.orkut.com/Community.aspx*
// ==/UserScript==

var sc = function sc(){//////////////* AQUI � O COME�O *//////////////

link=document.links;
tamanho=link.length;
var imgLoading = 'http://img393.imageshack.us/img393/8894/orkutcarregando1zx5.gif';

for(x=0;x<tamanho;x++)
{
	if(link[x].href.match(/&tid\=/gi) && !link[x].href.match(/&na\=/gi))
	{
		Tcmm=link[x].href.match(/cmm\=(\d+)/i)[1];
		Ttid=link[x].href.match(/tid\=(\d+)/i)[1];
		link[x].parentNode.innerHTML=''
		+'<a class="mais" style="text-decoration: none;" id="A'+Ttid+'" href="javascript:void(0)" onclick="javascript:firstPost(\''+Tcmm+'\',\''+Ttid+'\')">'
		+'<font color="black">[+]</font>'
		+'<div id="NONE'+Ttid+'" class="Tdiv"><b>Post Not Loaded</b><br>Click the [+] to Load the post</div></a>'
		+'<a class="div"><div class="Tdiv" id="DIV'+Ttid+'"></div></a>&#160 &#160 &#160'
		+link[x].parentNode.innerHTML;
		x++;
		tamanho++;
	};
};

function closeDiv(tid)
{
	if(document.getElementById('DIV'+tid).style.display=="none")
	{
		document.getElementById('DIV'+tid).style.display="inline";
	}
	else
	{
		document.getElementById('DIV'+tid).style.display="none";
	};
};

function mostraPost(tid,type,item)
{
	document.getElementById(item+'Post'+tid).style.display=type;
	document.getElementById('2'+item+'Post'+tid).style.display=type;
};

function firstPost(cmm,tid)
{
	lastPost(cmm,tid);
	document.getElementById('DIV'+tid).style.display="inline";
	layout='<table width="100%"><tr><td align="center" width="100%"></td>'
	+'<td align="right"><a href="javascript:closeDiv(\''+tid+'\')" style="text-decoration: none;" ><font color="black">[X]</font></a></div></td></tr></table>'
	+'</a><b>First Post of the Topic:</b> '
	+'<<a id="showFirst'+tid+'" href="javascript:void(mostraPost(\''+tid+'\',\'inline\',\'first\'))">Show</a>> '
	+'- <<a id="hideFirst'+tid+'" href="javascript:void(mostraPost(\''+tid+'\',\'none\',\'first\'))">Hide</a>>'
	+'<br><p><label id="firstPost'+tid+'"><img width="16" height="16" src="'+imgLoading+'">Loading First Post�</label></p>'
	+'<table width="100%" class="btn" border="0" cellpadding="0" cellspacing="0" onmouseover="this.className=\'btnHover\'" onmouseout="this.className=\'btn\'">'
  +'<tr style="cursor: pointer;" onclick="window.location=\'/CommMsgPost.aspx?cmm='+cmm+'&tid='+tid+'\';" id="b1">'
  +'<td width="45%"><hr></td>'
  +'<td><img src="http://images3.orkut.com/img/bl.gif" alt="" /></td>'
  +'<td nowrap style="background: url(\'http://images3.orkut.com/img/bm.gif\'); ">'
  +'Reply In Topic'
  +'</td>'
  +'<td><img src="http://images3.orkut.com/img/br.gif" alt="" width="10" height="20" /></td>'
  +'<td width="45%"><hr></td>'
  +'</tr>'
  +'</table>'
	+'<b>Last Post of the Topic:</b> '
	+'<<a id="showFirst'+tid+'" href="javascript:void(mostraPost(\''+tid+'\',\'inline\',\'last\'))">Show</a>> '
	+'- <<a id="hideFirst'+tid+'" href="javascript:void(mostraPost(\''+tid+'\',\'none\',\'last\'))">Hide</a>>'
	+'<br><p><label id="lastPost'+tid+'"><img width="16" height="16" src="'+imgLoading+'">Loading Last Post...</label></p>';
	document.getElementById('NONE'+tid).innerHTML=layout;
	document.getElementById('DIV'+tid).innerHTML=layout.replace(/firstPost/gi,'2firstPost').replace(/lastPost/gi,'2lastPost').replace(/showFirst/gi,'2showFirst').replace(/hideFirst/gi,'hideFirst');
	var xml=new XMLHttpRequest();
	xml.open("GET","CommMsgs.aspx?cmm="+cmm+"&tid="+tid,true);
	xml.onreadystatechange=function()
	{
		if(xml.readyState==4)
		{
			var xmlr=xml.responseText;
			if(!xmlr.match(/\=\"textPanel/gi))
			{
				/*
				Descomentar se n�o quiser um recarregamento dos posts a cada click
				document.getElementById("A"+tid).onclick="void(0)";
				document.getElementById("A"+tid).href="javascript:closeDiv('"+tid+"')";
				*/
				
				var body=xmlr;
				var row1=body.indexOf('<tr class="row1">');
				row0=body.indexOf('<tr class="row0">') > -1 ? body.indexOf('<tr class="row0">') : body.indexOf('</table>\n  </td></tr>\n  <tr>');
				var post=body.substring(row1,row0).replace(/.class\=\"\w+\d\"/gi,'');
				document.getElementById('firstPost'+tid).innerHTML=post;
				document.getElementById('2firstPost'+tid).innerHTML=post;
				document.getElementById('DIV'+tid).style.width="600";
				document.getElementById('NONE'+tid).style.width="600";
			}
			else
			{
				firstPost(cmm,tid);
			}
		};
	};
	xml.send(null);
};

function lastPost(cmm,tid)
{
	var xml=new XMLHttpRequest();
	xml.open("GET","CommMsgs.aspx?cmm="+cmm+"&tid="+tid+"&na=2",true);
	xml.onreadystatechange=function()
	{
		if(xml.readyState==4)
		{
			var xmlr=xml.responseText;
			if(!xmlr.match(/\=\"textPanel/gi))
			{
				var body=xmlr;
				var row1=body.lastIndexOf('<tr class="row');
				var row0=body.lastIndexOf('</table>\n  </td></tr>\n  <tr>');
				var post=body.substring(row1,row0).replace(/.class\=\"\w+\d\"/gi,'');
				document.getElementById('lastPost'+tid).innerHTML=post;
				document.getElementById('2lastPost'+tid).innerHTML=post;
				document.getElementById('DIV'+tid).style.width="600";
				document.getElementById('NONE'+tid).style.width="600";
			}
			else
			{
				firstPost(cmm,tid,page);
			}
		};
	};
	xml.send(null);
};

}//////////////* AQUI � O FIM *//////////////

style=document.createElement('style');
style.innerHTML=''
+'a.mais'
+'{'
+'	position:absolute; '
+'	font:12px arial, verdana, helvetica, sans-serif; '
+'	text-decoration:none;'
+'	z-index:24;'
+'}'
+'a.div'
+'{'
+'	position:absolute; '
+'	font:12px arial, verdana, helvetica, sans-serif; '
+'	text-decoration:none;'
+'	z-index:24;'
+'}'
+'a.mais:hover'
+'{'
+'	background:transparent;'
+'	z-index:25; '
+'}'
+'a.div:hover'
+'{'
+'	background:transparent;'
+'	z-index:25; '
+'}'
+'a.mais:hover div.Tdiv'
+'{'
+'	display: inline'
+'}'
+'a.div:hover div.Tdiv'
+'{'
+'	display: inline'
+'}'
+'div.Tdiv'
+'{ '
+'	display:none;'
+'	left:17px;'
+'	top:15px;'
+'	position:absolute;'
+'	width:300px; '
+'	font: 12px arial, verdana, helvetica, sans-serif; '
+'	padding:5px 10px;'
+'	border:1px solid #999;'
+'	color:#000;'
+'	background:#D4DDED; '
/* 	Outras cores de fundo
+'	background:#F0E8F5; '
+'	background:#E0ECFF; '
+'	background:#90ABD6; '
+'	background:#E5ECF4; '
+'	background:#FCF0D8; '*/
+'}';

//--------------------------------------------
// Insere Script na P�gina
//--------------------------------------------
sc=String(sc);
sc=sc.substring(16,sc.length-2);
script=document.createElement('script');
script.textContent=sc;
document.getElementsByTagName('head')[0].appendChild(style);
document.getElementsByTagName('head')[0].appendChild(script);