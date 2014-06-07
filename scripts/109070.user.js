// ==UserScript==
// @name           PasteDocs
// @namespace      download
// @description    Makes a rough backup of a Google Document to Pastebin
// @include        http://docs.google.com/document/*
// @include        https://docs.google.com/document/*
// ==/UserScript==

//get the info from the application data instead
//or just trigger a load of everything by scrolling
function init()
{
  /*
  var lines=[];
  var pages=document.querySelectorAll("#docs-editor .kix-page");
  for(var i=0;i<pages.length;i++)
  {
    var paras=pages[i].getElementsByClassName("kix-paragraphrenderer");
    for(var k=1;k<paras.length;k++)
    {
      var lineviews=paras[k].getElementsByClassName("kix-lineview");
      for(var j=0;j<lineviews.length;j++)
      {
        lines.push(lineviews[j].textContent);
      }
      //get the indents and convert to tabs
      //get the contents of links and bring the link along in () next to the text if the link and text are different
    }
  }
  while(!lines[0]) lines=lines.slice(1); //kill any leading \n's
  var data=lines.join("\n");
  */
  var title=document.getElementById("docs-title").textContent;
  var id=location.href.match(/document\/d\/([0-9a-zA-Z-_]+)\//)[1];
  var data=GM_xmlhttpRequest(
  {
    method:"GET",
    url:"http://docs.google.com/document/d/"+id+"/export?format=txt",
    onload:function(r)
    {
      paste(title,r.responseText);
    }
  });
}

function paste(title,content,cb)
{
  var key="edd2ac5e4c475d8e5f67f08e1c36eda2";
  var dlg=dialog("Pasting '"+title+"'");
  GM_xmlhttpRequest(
  {
    url:"http://pastebin.com/api/api_post.php",
    method:"POST",
    headers:{"Content-Type":"application/x-www-form-urlencoded"},
    data:"api_option=paste&api_dev_key="+key+"&api_paste_code="+encodeURIComponent(content)+"&api_paste_name="+encodeURIComponent(title),
    onload:function(r)
    {
      var d=r.responseText;
      if(d.indexOf("Bad API request")==0)
      {
        //error
        alert("Paste Error: "+d);
      }
      else
      {
        dlg.textContent=d;
      }
    }
  });
}

function dialog(txt)
{
  var d=document.createElement("div");
  d.style.position="fixed";
  d.style.top=(innerHeight/2-100)+"px";
  d.style.left=(innerWidth/2-100)+"px";
  d.style.textAlign="center";
  d.style.backgroundColor="#fff";
  d.style.border="1px #000 solid";
  d.style.padding="10px";
  var s=document.createElement("div");
  s.textContent=txt;
  var b=document.createElement("button");
  b.style.marginTop="10px";
  b.textContent="Close";
  b.addEventListener("click",function()
  {
    d.parentNode.removeChild(d);
  },false);
  d.appendChild(s);
  d.appendChild(b);
  document.body.appendChild(d);
  return s;
}

addEventListener("load",function()
{
  var c=document.getElementsByClassName("goog-menuitem-content");
  for(var i=0;i<c.length;i++)
  {
    if(c[i].textContent.indexOf("Make a copy")!=-1)
    {
      c=c[i].parentNode.nextSibling;
      break;
    }
  }
  var t=document.createElement("div");
  t.className="goog-menuitem";
  t.setAttribute("role","menuitem");
  t.textContent="Backup to Pastebin";
  t.addEventListener("click",init,false);
  t.addEventListener("mouseover",function(){t.classList.add("goog-menuitem-highlight")},false);
  t.addEventListener("mouseout",function(){t.classList.remove("goog-menuitem-highlight")},false);
  c.parentNode.insertBefore(t,c);
},false);