// ==UserScript==
// @name           restyleOG
// @namespace      Ogame
// @include        *.ogame.*
// @source         http://userscripts.org/scripts/show/41911
// @description    Réduction des images, reclassement des planetes dans la page d'accueil, ...
// ==/UserScript==

function checkPageBuilding() {
	var url = window.location.href;
	if(url.indexOf('page=b_building')!=-1) return true;
	if(url.indexOf('page=buildings')!=-1) return true;
	return false;
}


function checkPageOverview() {
	var url = window.location.href;
	if(url.indexOf('page=overview')!=-1) return true;
	return false;
}


if(typeof J == "undefined")
	J={};

J.getElementsByClassNameFrom = function(classe, elements)
{
	var elts=(elements && elements!= "undefined"?elements:document.getElementsByTagName("*"));
	var resultat=[];
	for(var i in elts)
		if(J.estDeClasse(elts[i], classe))resultat.push(elts[i]);
	return resultat;
}

J.getChildsByType=function(parent, type, rec)
{
  var elts=new Array();
  var fils=parent.childNodes;
  for(var i=0; i<fils.length; i++)
  {
	  if(fils[i].nodeType != 1) continue;
	  if(J.estDeType(fils[i],type)) elts[elts.length]=fils[i];
	  if(rec) elts=elts.concat(J.getChildsByType(fils[i],type, true));
  }
  return elts;
}

J.estDeType = function(elt, type)
{
  return (elt && elt.tagName && elt.tagName.toLowerCase() == type.toLowerCase());
}


J.estDeClasse = function(elt, classe)
{
	if(!elt.className ) return false;
	var classes=elt.className.split(" ");
	for(var i=0; i<classes.length; i++)
		if(classes[i] == classe) return true;
	return false;
}


function doRestyleOG() {
	if(checkPageBuilding())
	{
		var imgs=document.getElementsByTagName('img');
		var img, imgI;
		for(var i=0;i<imgs.length;i++)
		{
			img=imgs[i];
			if(parseInt(img.offsetHeight)==120)
			{
				if(imgI==null)imgI=img;
				img.setAttribute("width","35");
				img.setAttribute("height","35");
				var tr=img.parentNode.parentNode.nextSibling;
				while(tr.nodeType!=1)tr=tr.nextSibling;
				try {
					var brs=J.getChildsByType(tr, "br", true);
					if(brs.length>0)
					{
						brs[0].parentNode.removeChild(brs[0].nextSibling);
						brs[0].parentNode.removeChild(brs[0]);
					}else alert("no br : \n"+img.parentNode.parentNode.nextSibling.nodeName)
				} catch(e){}
			}
		}
		imgI.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("width", 700);
	}


	if(checkPageOverview())
	{
		var div=document.getElementById("combox_container");
		div.style.display="none";
		var div=document.getElementById("content");
		var center=div.firstChild;
		while(typeof(center.nodeName)=="undefined"||center.nodeName.toLowerCase()!="center")
			center=center.nextSibling;
		var table=center.firstChild;
		while(typeof(table.nodeName)=="undefined"||table.nodeName.toLowerCase()!="table")
			table=table.nextSibling;
		
		table.setAttribute("width","100%");

		var imgs=document.getElementsByTagName('img');
		var img;
		var mainImg=null;
		for(var i=0;i<imgs.length;i++)
		{
			img=imgs[i];
			if(parseInt(img.offsetHeight)==200)
			{
				img.setAttribute("width","80");
				img.setAttribute("height","80");
				mainImg=img;
			}
		}
		if(mainImg!=null)
		{
			var tr=mainImg.parentNode.parentNode;
			if(tr.nodeName.toLowerCase()!="tr") return;
			var th=J.getElementsByClassNameFrom("s",tr.childNodes);
			if(th.length==0)return;
			th=th[0];
			
			var imgs=J.getChildsByType(th, "img", true);
			for(var i=0;i<imgs.length;i++)
			{
				var img=imgs[i];
					img.style.width="20px";
					img.style.height="20px";
				img.parentNode.parentNode.insertBefore(img.parentNode,img.parentNode.parentNode.firstChild);
			}
			
			var centers=J.getChildsByType(th, "center", true);
			for(var i=centers.length-1; i>=0;i--)
			{
				var center=centers[i];
				while(center.childNodes.length>0) 
					center.parentNode.insertBefore(center.childNodes[0], center);
				center.parentNode.removeChild(center);
			}
			
			var ths=J.getChildsByType(th, "th", true);
			
			for(var i=0;i<ths.length;i++)
			{
				var brs=J.getChildsByType(ths[i], "br", false);
				for(var j=brs.length-1; j>=0;j--)
					ths[i].removeChild(brs[j]);
			}
			
			var table=J.getChildsByType(th, "table", false)[0];
			var tbody=J.getChildsByType(table, "tbody", false)[0];
			while(tbody.childNodes.length>0)tbody.removeChild(tbody.childNodes[0]);
			for(var i=0;i<ths.length;i++) tbody.appendChild(ths[i]);
		}
	}
			var div=document.getElementById("content");
		div.style.width='80px';
		div.style.width='';

//	alert(window.sss)
}

doRestyleOG();
