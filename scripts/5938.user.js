// ==UserScript==
// @name          Expando
// @namespace     asdasdasd
// @description   Expando
// @include       *viewtopic.php*
// ==/UserScript==

function DoExpando(h)
{
 //alert(h);
 text=document.getElementById(h).innerHTML;
 text=text.substr(text.indexOf('<!--EXSTART-->')+14);
 document.getElementById("expando").style.display="";
 document.getElementById("expandotext").innerHTML="<h1>Expando</h1><hr />"+text;
 event.stopPropagation();
 event.preventDefault();
 return false;
}

function MergedExpando()
{
 text="";
 for(i=0;i<unsafeWindow.expandos.length;i++)
 {
 	dtext=document.getElementById(unsafeWindow.expandos[i]).innerHTML;
 	dtext=dtext.substr(dtext.indexOf('<!--EXSTART-->')+14);
 	text+=dtext+"<hr />";
 }
 document.getElementById("expando").style.display="";
 document.getElementById("expandotext").innerHTML="<h1>Merged Expando</h1>This is a merged Expando output. There are <b>"+unsafeWindow.expandos.length+"</b> expandable spans combined into one in this output.<hr />"+text;
 event.stopPropagation();
 event.preventDefault();
 return false;
}

function ExpandoStyle(s)
{
 document.getElementById("expando").className="st"+s;
}


function Expando()
{
  var tds=document.getElementsByTagName('span');
  var d=0;
  unsafeWindow.expandos=new Array();
  for(i=0;i<tds.length;i++)
  {
    if(tds[i].innerHTML.length>1500&&tds[i].className.indexOf('postbody')>-1)
    {
    	id=tds[i].id;

    	if(id=='' || !id)
    	{
    		id='expando-'+i;//Math.floor(100000+Math.random()*850000);
    		tds[i].id=id;
    	}
    	d=1;
    	unsafeWindow.expandos.push(id);
    	tds[i].innerHTML='<a href=\'javascript:OpenExpando("'+id+'")\' class=\'expandolink\'>Expando! Click here to expand this topic</a><!--EXSTART-->'+tds[i].innerHTML;
    	//tds[i].insertBefore(lnk, tds[i].firstChild);
    }
  }
  if(d)
  {
    styles=new Object();
    styles['Default']='${}';
    styles['Arial']='${font:10pt arial}';
    styles['Georgia']='${font:9pt georgia;line-height:130%}';
    styleString="";
    for(k in styles)
    {
     styleString+=styles[k].replace("$",".st"+k)+"\n";
    }
    //alert(styleString);
    cnen = document.createElement("div");
    cnen.id="expando";
    opts="<div id='expandopts'><b>Expando</b><ul>";
    opts+="<li><a href='#' onclick='document.getElementById(\"expando\").style.display=\"none\";return false'>Close</a></li>";
    opts+="<li><a href='#' id='expandomerge' onclick='MergeExpando()'>Merged</a></li>";
    opts+="<li>Spans:<br/>";
    for(i=0;i<unsafeWindow.expandos.length;i++)
    {
    	opts+='<a href=\'#\' onclick=\'OpenExpando("'+unsafeWindow.expandos[i]+'")\'>'+(i+1)+'</a>';
    	if(i%7==6) opts+='<br/>';
    }
    opts+="</li>";
    opts+="<li>Styles<ul>";
    opts+="<ul>";
    for(k in styles)
      opts+='<li><a href=\'#\' onclick=\'ExpandoStyle("'+k+'")\'>'+k+'</a></li>';
    opts+="</ul></li>";
    opts+="</ul></div>";
    opts+="<div id='expandotext'></div>";
    cnen.innerHTML=opts;
    cnen.style.display="none";
    GM_addStyle("#expando{left:150px;right:150px;top:10px;bottom:10px;padding:15px;position:fixed;background:#000;color:#eee;overflow:auto;border:1px solid #fff}")
    GM_addStyle("#expandopts{display:block;left:10px;top:10px;padding:5px;position:fixed;background:#006;color:#eee;font-family:arial;font-size:9pt;line-height:11pt;border:1px solid #fff}")
    GM_addStyle("#expandopts ul{padding:0;padding-left:5px;list-style:none;margin:0}");
    GM_addStyle(".expandolink{display:block;margin:5px;padding:5px;border:1px solid #ccc;color:#ccc;background:#000}")
    GM_addStyle(styleString);

    document.body.insertBefore(cnen, document.body.firstChild);
    ExpandoStyle("Default");
    unsafeWindow.OpenExpando=DoExpando;
    unsafeWindow.MergeExpando=MergedExpando;
    unsafeWindow.ExpandoStyle=ExpandoStyle;
  }
}

Expando();