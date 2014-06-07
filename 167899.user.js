// ==UserScript==
// @name        AntiTroll
// @namespace   antitroll
// @description Ac24AntiTroll
// @version     1
// ==/UserScript==

var isac24=false;
var e=document.getElementsByTagName("meta");
for (var i=0;i<e.length;i++)
  if (e[i].getAttribute("name")=="author")
    if (e[i].getAttribute("content")=="AC24")
      {
      isac24=true;
      break;
      }

if (isac24)
  {

var o=document.getElementById("antitroll");
if (!o)
  {
  o=document.createElement("div");
  document.body.appendChild(o);
  o.id="antitroll";
  }
o.style.positon="fixed";
o.style.left="0px";
o.style.top="0px";
o.innerHTML='<div style="'+
'z-index:20000;position:fixed;left:2px;top:2px;float:left;font-size:9px;opacity:0.5;'+
'background:white;padding:2px;border:1px dotted black" id="atrollinfo">'+
'ANTITROLL ACTIVE</div>';


var oinfo=document.getElementById("atrollinfo");
var xdivs=new Array();


var e=document.getElementsByTagName("div")
for (var i=0;i<e.length;i++)
  {
  var qid=e[i].id;
  try {
  var qc=qid.split("-");
  if ((qc.shift()=="comment") && (qc.shift()=="item"))
    {
    var qcommentid=qc.shift();
    var xv=document.getElementById("comment-vote-holder-"+qcommentid);
    if (xv)
      {
      var eq=xv.childNodes;
      for (var qx=0;qx<eq.length;qx++)
        {
        qw=eq[qx];
        try {
        if ((qw.tagName=="SPAN") && (qw.className.split("-").shift()=="vote"))
          {
          qvst=Math.round(qw.innerHTML);
          if (qvst<=-3) 
            {
            var oc=e[i];
            var ol=document.getElementById("comments-list-"+qcommentid);
            ol.style.display="none";
            oc.style.height="35px";
            oc.style.overflow="hidden";
            var shid="atroll-showhide-"+qcommentid;
            var oqx=document.getElementById(shid);
            if (!oqx)
              {
              oqx=document.createElement("div");
              oqx.id=shid;
              xv.appendChild(oqx);
              oqx.innerHTML="rozbalit";
              oqx.style.position="absolute";
              oqx.style.color="red";
              oqx.style.cursor="pointer";
              oqx.style.marginLeft="-100px";
              oqx.setAttribute("cid",qcommentid);
              oqx.onclick=function () { 
                var cid=this.getAttribute("cid");
                var olx=document.getElementById("comments-list-"+cid);
                var olxc=document.getElementById("comment-item-"+cid);
                if (olx)
                  {
                  if (olx.style.display=="none")
                    {
                    olx.style.display="block";
                    this.innerHTML="sbalit";
                    olxc.style.height="";
                    olxc.style.overflow="";
                    }
                  else
                    {
                    olx.style.display="none";
                    this.innerHTML="rozbalit";
                    olxc.style.height="35px";
                    olxc.style.overflow="hidden";
                    }
                  }               
                }
              }                      
            }
          }
        }
        catch (xx) { }
        }
      
      }
    }
  }
  catch (q) { }
  }

  }