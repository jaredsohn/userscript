// pubmed2connotea
// version 0.2 BETA!
// 2006-05-12
// Copyright (c) 2006, Pierre Lindenbaum PhD
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// http://www.integragen.com
// http://plindenbaum.blogspot.com
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6.4 or later: http://greasemonkey.mozdev.org/
// and Firefox 1.5 : http://www.mozilla.com/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "connoteatreemap", and click Uninstall.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name          connoteatreemap
// @namespace     http://www.integragen.com
// @description   showtreemap of tags in SVG when browsing connotea
// @include       http://www.connotea.org/recent
// @include       http://www.connotea.org/recent?*
// @include       http://www.connotea.org/user/*
// @include       http://www.connotea.org/tag/*
// @include       http://www.connotea.org/date/*
// @include       http://www.connotea.org/uri/*
// ==/UserScript==

var Namespaces= new Object();
Namespaces.RDF="http://www.w3.org/1999/02/22-rdf-syntax-ns#";
Namespaces.RDFS ="http://www.w3.org/2000/01/rdf-schema#";
Namespaces.DC="http://purl.org/dc/elements/1.1/";
Namespaces.DCTERMS="http://purl.org/dc/terms/";
Namespaces.PRISM="http://prismstandard.org/namespaces/1.2/basic/";
Namespaces.FOAF="http://xmlns.com/foaf/0.1/";
Namespaces.CONNOTEA="http://www.connotea.org/2005/01/schema#";
Namespaces.XHTML="http://www.w3.org/1999/xhtml";
Namespaces.SVG="http://www.w3.org/2000/svg";
Namespaces.XLINK="http://www.w3.org/1999/xlink";


/**
 *
 * Color
 * eq of java.awt.Color
 *
 */
function Color(r,g,b)
	{
	this.r=r;
	this.g=g;
	this.b=b;
		
	/* return "rgb(r,b,b)" */
	Color.prototype.toSVG=function()
		{
		return "rgb("+this.r+","+
				this.g+","+
				this.b+")";
		}
	}

/**
 *
 * A Dimension
 *
 */ 
function Dimension(w,h)
	{
	this.width=w;
	this.height=h;
		
	Dimension.prototype.setSize=function(width, height)
		{
		this.width=width;
		this.height=height;
		}
	
	Dimension.prototype.setWidth=function(width)
		{
		this.width=width;
		}
			
	Dimension.prototype.setHeight=function(height)
		{
		this.height=height;
		}			
		
	Dimension.prototype.getWidth=function()
		{
		return this.width;
		}	
	
	Dimension.prototype.getHeight=function()
		{
		return this.height;
		}		
	}
/**
 *
 * A Rectangle
 *
 */ 

Rectangle.prototype= new Dimension(0,0);  
 
function Rectangle(x,y,w,h)
	{
	//
	this.x=x;
	this.y=y;
	this.setSize(w,h);
	
	
	Rectangle.prototype.setLocation=function(x, y)
		{
		this.x=x;
		this.y=y;
		}	
	
	Rectangle.prototype.setX=function(x)
		{
		this.x=x;
		}		
	
	Rectangle.prototype.setY=function(y)
		{
		this.y=y;
		}		

	
			
	Rectangle.prototype.getX=function()
		{
		return this.x;
		}	
	
	Rectangle.prototype.getY=function()
		{
		return this.y;
		}

		
	Rectangle.prototype.setRectangle=function(rect)
		{
		this.setBounds(
			rect.getX(),
			rect.getY(),
			rect.getWidth(),
			rect.getHeight()
			);
		}
		
	Rectangle.prototype.setBounds=function(x,y,width, height)
		{
		this.setSize(width, height);
		this.setLocation(x,y);
		}
	


	Rectangle.prototype.getCenterX=function()
		{
		return this.getX()+this.getWidth()/2.0;
		}
	
	Rectangle.prototype.getCenterY=function()
		{
		return this.getY()+this.getHeight()/2.0;
		}	
		
	Rectangle.prototype.toString=function()
	 	{
        	return "Rectangle("+
			this.getX()+","+
			this.getY()+","+
			this.getWidth()+","+
			this.getHeight()+
			")";
    		}		
	}

	

/**
 *
 * A TreeMapItem is a "square" in the TreeMap
 * it is initialized with a positive number used as
 * the weight of this square
 *
 */ 

TreeMapItem.prototype= new Rectangle(0.0,0.0,0.0,0.0); 
 
function TreeMapItem(weight)
	{
	//
	this.weight=weight;
	this.url=null;/* url for hyperlink xml escaped */
	this.label=weight;/* label for this item default is weight */
	this.fill=null;/* a Color for filling */
	this.stroke=new Color(255,255,255);/* a color for stroking */
	this.id=null;/* optional id for xml dom */
	this.title=null;
	//
	TreeMapItem.prototype.setFill=function(color)
		{
		this.fill=color;
		}	

	TreeMapItem.prototype.setID=function(id)
		{
		this.id=id;
		}	
			

			
	TreeMapItem.prototype.getRGBFill=function()
		{
		if(this.fill==null) return "none";
		return this.fill.toSVG();
		}	
	
	TreeMapItem.prototype.getRGBStroke=function()
		{
		if(this.stroke==null) return "none";
		return this.stroke.toSVG();
		}	
		
	TreeMapItem.prototype.getWeight=function()
		{
		return this.weight;
		}
	
	TreeMapItem.prototype.setURL=function(url)
		{
		this.url=url;
		}
		
	TreeMapItem.prototype.setTitle=function(title)
		{
		this.title=title;
		}
	
		
	
	TreeMapItem.prototype.setLabel=function(label)
		{
		this.label=label;
		}	
	
	/* print this item as SVG using stream out and using parameters from its owner treemap */
	TreeMapItem.prototype.toSVG=function(treemap,doc)
		{
		var fontsize= treemap.getFontSize();
		
		
		
		var g=  doc.createElementNS(Namespaces.SVG,"svg:g");
		if(this.id!=null) g.setAttribute("id",this.id);
		
		var node=g;
		
		if(this.url!=null)
			{
			node= doc.createElementNS(Namespaces.SVG,"svg:a");
			var t= this.title;
			if(t==null) t=this.url;
			g.appendChild(node);
				node.setAttributeNS(Namespaces.XLINK,"xlink:title",t);
				node.setAttributeNS(Namespaces.XLINK,"xlink:href",this.url);
			}
			
		var rect= doc.createElementNS(Namespaces.SVG,"svg:rect");
		node.appendChild(rect);
			rect.setAttribute("x",this.getX());
			rect.setAttribute("y",this.getY());
			rect.setAttribute("width",this.getWidth());
			rect.setAttribute("height",this.getHeight());
			rect.setAttribute("fill",this.getRGBFill());
			rect.setAttribute("stroke",this.getRGBStroke());
			rect.setAttribute("stroke","black");
			
		
		if(this.label!=null)
			{
			while(!( this.getHeight()> fontsize && this.getWidth() > this.label.length*fontsize))
				{
				--fontsize;
				if(fontsize<=4) break;
				}
			var text= doc.createElementNS(Namespaces.SVG,"svg:text");
				text.setAttribute("x",this.getCenterX());
				text.setAttribute("y",this.getCenterY());
				text.setAttribute("stroke",this.getRGBStroke());
				text.setAttribute("font-size",fontsize);
			text.appendChild(doc.createTextNode(this.label));
			node.appendChild(text);
			}
		return g;
		}		
	
	TreeMapItem.prototype.setStroke= function(color)
		{
		this.stroke=color;
		}	
		
	}



/* used to sort treeMap Item */
function treemap_item_compare(a,b)
	{
	if(a.getWeight()== b.getWeight())
		{
		return 0;
		}
	else if(a.getWeight()< b.getWeight())
		{
		return 1;
		}
	return -1;
	}	
	
	
/**
 * The Treemap : a container of TreeMapItem(s)
 * contains the treemap algorithm
 * original java code from http://www.cs.umd.edu/hcil/treemap-history/Treemaps-Java-Algorithms.zip
 * by  
 * - Martin Wattenberg, w(at)bewitched.com
 * - Ben Bederson, bederson(at)cs.umd.edu
 *   University of Maryland, Human-Computer Interaction Lab
 *   http://www.cs.umd.edu/hcil
 *
 */
TreeMap.prototype= new Dimension(0.0,0.0);  
function TreeMap(w,h)
	{
	this.treemapitems=new Array();
	this.fontsize=24;
	this.setSize(w,h);
	
	
	/* add a new TreeMapItem */
	TreeMap.prototype.addItem=function(item)
		{
		if(item.getWeight()<=0) return;
		this.treemapitems[this.treemapitems.length]=item;
		}	
	
	TreeMap.prototype.getFontSize=function()
		{
		return this.fontsize;
		}
		
	TreeMap.prototype.setFontSize=function(fontsize)
		{
		this.fontsize=fontsize;
		}	
	
	/* creates the treemap as SVG using doc */
	TreeMap.prototype.toSVG=function(doc)
		{
		
		var svg = doc.createElementNS(Namespaces.SVG,"svg:svg");
			svg.setAttribute("xmlns:svg",Namespaces.SVG);
			svg.setAttribute("xmlns:xlink",Namespaces.XLINK);
			svg.setAttribute("width",this.getWidth());
			svg.setAttribute("height",this.getHeight());
			svg.setAttribute("text-anchor","middle");
			svg.setAttribute("font-family","monospace");
			svg.setAttribute("font-size",this.getFontSize());
			
		var  tt= doc.createElementNS(Namespaces.SVG,"svg:title");
		svg.appendChild(tt);
		tt.appendChild(doc.createTextNode("ConnoteaTreeMap.svg"));

		var  desc= doc.createElementNS(Namespaces.SVG,"svg:desc");
		svg.appendChild(desc);
		desc.appendChild(doc.createTextNode("generated by Pierre Lindenbaum PhD 2006 Integragen plindenbaum (at) yahoo (dot) fr http://www.connotea.org/wiki/User:lindenb . Original java code from Martin Wattenberg, w(at)bewitched.com and Ben Bederson, bederson(at)cs.umd.edu University of Maryland, Human-Computer Interaction Lab http://www.cs.umd.edu/hcil"));
			
		
		var rect= doc.createElementNS(Namespaces.SVG,"svg:rect");
		svg.appendChild(rect);
			rect.setAttribute("x","0");
			rect.setAttribute("y","0");
			rect.setAttribute("width",this.getWidth());
			rect.setAttribute("height",this.getHeight());
			rect.setAttribute("stroke","blue");
			rect.setAttribute("fill","none");
		
		if(this.treemapitems.length>0)
			{
			this.layout(this.treemapitems,new Rectangle(0,0,this.getWidth(),this.getHeight()));
		 	}
		
		for(i=0;i< this.treemapitems.length;i++ )
		       {
		       svg.appendChild(this.treemapitems[i].toSVG(this,doc));
		       }
		
		return svg;
		}	
		
	/* private */
	TreeMap.prototype.layout=function(items, rect)
		{
		items.sort(treemap_item_compare);
		this.layout2(items,0,items.length,rect);
		}
	
	/* private */
	TreeMap.prototype.getWeight=function(items, start,end)
		{
		var sum=0.0;
		while(start<end)
			{
			sum +=items[start].getWeight();
			start++;
			}
		return sum;
		}

	/* private */
	TreeMap.prototype.sliceLayout=function(comps,start,end,bounds)
		{
		var end=(comps.length<end?comps.length:end);
		var total = this.getWeight(comps,start,end);
		var a=0.0;
		var vertical=(bounds.getWidth()<bounds.getHeight() );
		var pos= (vertical==true?bounds.getY():bounds.getX());
		var i;
		for (i=start;i<end; i++)
			{
			var r=new Rectangle(0,0,0,0);
			var b=  comps[i].getWeight()/total;
			if (vertical==true)
				{
				r.setX(bounds.getX());
				r.setWidth(bounds.getWidth());
				r.setY(pos);
				var len = bounds.getHeight()*b;
				r.setHeight(len);
				pos+=len;
				}
			else
				{
				r.setX(pos);
				var len = bounds.getWidth()*b;
				r.setWidth(len);
				r.setY(bounds.getY());
				r.setHeight(bounds.getHeight());
				pos+=len;
				}
			comps[i].setRectangle(r);
			a+=b;
			}
		}

	/* private */		
	TreeMap.prototype.layout2=function(comps,start,end,bounds)
		{
		if (start>=end) return;
		
		if (end-start<2)
			{
			this.sliceLayout(comps,start,end,bounds);
			return;
			}
		
		var x=bounds.getX();
		var y=bounds.getY();
		var w=bounds.getWidth();
		var h=bounds.getHeight();
		
		var total=this.getWeight(comps,start, end);
		var mid=start;
		var a= comps[start].getWeight()/total;
		var b=a;
		
		if (w<h)
			{
			// height/width
			while (mid<end)
				{
				var aspect=this.normAspect(h,w,a,b);
				var q= comps[mid].getWeight()/total;
				if (this.normAspect(h,w,a,b+q)>aspect) break;
				mid++;
				b+=q;
				}
			this.sliceLayout(comps,start,mid+1,new Rectangle(x,y,w,(h*b)));
			this.layout2(comps,mid+1,end,new  Rectangle(x,(y+h*b),w,(h*(1-b))));
			}
		else
			{
			// width/height
			while (mid<end)
				{
				var aspect=this.normAspect(w,h,a,b);
				var q= comps[mid].getWeight()/total;
				if (this.normAspect(w,h,a,b+q)>aspect) break;
				mid++;
				b+=q;
				}
			this.sliceLayout(comps,start,mid+1,new Rectangle(x,y,(w*b),h));
			this.layout2(comps,mid+1,end,new  Rectangle((x+w*b),y,(w*(1-b)),h));
			}
		
		}
	/* private */
	TreeMap.prototype.aspect=function(big,small,a,b)
		{
		return (big*b)/(small*a/b);
		}
	/* private */
	TreeMap.prototype.normAspect=function(big, small,a,b)
		{	
		x=this.aspect(big,small,a,b);
		if (x<1) return 1.0/x;
		return x;
		}
	

	}

	
	

function gm_xpath(expression,contextNode)
	{
	return document.evaluate(expression,contextNode,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	}

function getParameter(url,parameter)
	{
	if(url==null) return null;
	var a= url.indexOf("?");
	if(a==-1) return null;
	if(url.indexOf(parameter+"=")==-1) return null;
	var params= url.substring(a+1).split("&");
	var i=0;
	for(i=0;i<params.length;i++)
		{
		b= params[i].indexOf("=");
		if(b==-1) continue;
		var key = params[i].substring(0,b);
		if(key!=parameter) continue;
		return params[i].substring(b+1);
		}
	return null;
	}

function escapeURL(url)
{
var s="";
var i=0;

for(i=0;i< url.length;++i)
{
var c=url.charAt(i)
switch( c )
 {
 case ':': s+= '%3A'; break;
 case '/': s+= '%2F'; break;
 case '?': s+= '%3F'; break;
 case '=': s+= '%3D'; break;
 case '&': s+= '%26'; break;
 default : s+= c; break;
 }
}
return s;
}

function Agent(name)
	{
	this.name=name;
	this.count=1;
	}


function insertToggle()
{

if(document.getElementsByTagName)
	{
	//hack found at http://erik.eae.net/archives/2005/06/10/22.21.42/#comment-5337
	var inputElements = document.getElementsByTagName("input");
	var i=0;
	for (i=0; inputElements[i]!=null; i++)
		{
		inputElements[i].setAttribute("autocomplete","off");
		}
	}

var wrapper = document.getElementById("outer-wrapper");
if(wrapper==null)
	{
	GM_log('cannot find connotea div id="outer-wrapper"');
	return;
	}

var div1 = document.createElement("div");
div1.setAttribute("id","treemap-div");
div1.setAttribute("align","center");
div1.setAttribute("style","border:5px; margin: 5px; border: 1px solid #f00; font-family: Verdana, Arial, Helvetica, sans-serif; font-size:12pt;");
wrapper.parentNode.insertBefore(div1,wrapper);


var newanchor = document.createElement("a");
newanchor.setAttribute("title","show/hide treemap");
newanchor.setAttribute("href","javascript:void%200");
newanchor.appendChild( document.createTextNode("Treemap on/off"));
div1.appendChild(newanchor);

var div2 = document.createElement("div");
div2.setAttribute("id","treemap");
div2.setAttribute("align","center");
div1.appendChild(div2);


newanchor.addEventListener('click', function(event)
{

var treemapdiv = document.getElementById("treemap");
if(treemapdiv==null)
	{
	GM_log('cannot find connotea div id="treemap"');
	return;
	}
if(treemapdiv.hasChildNodes())
	{
	while(treemapdiv.hasChildNodes())
		{
		treemapdiv.removeChild(treemapdiv.firstChild);
		}
	}	
else
	{
	var slashtagslash="/tag/";
	var prefix="http://www.connotea.org"+slashtagslash;
	var locationhref = window.location.href;
	var ignoretag=null;
	var num=getParameter(locationhref,"num");
	
	
	var  i=0;
	var  j=0;
	
	i= locationhref.indexOf(slashtagslash);
	if(i!=-1)
		{
		ignoretag = locationhref.substring(i+slashtagslash.length);
		i= ignoretag.indexOf("?");
		if(i!=-1) ignoretag= ignoretag.substring(0,i);
		i= ignoretag.indexOf("/");
		if(i!=-1) ignoretag= ignoretag.substring(0,i);
		}
	
	
	var main  = document.getElementById("main");
	var tags= new Array();
	
	var wheight=window.outerHeight;
        if(window.outerWidth< wheight) wheight=window.outerWidth;
        wheight=wheight*0.6;
        if(wheight<50) wheight=50;
        var tm= new TreeMap(wheight,wheight);

	
	if(main==null)
		{
		GM_log('cannot find connotea div id="main"');
		return;
		}
	var divs= gm_xpath(".//div[@id]",main);
	for(j=0; j<divs.snapshotLength; j++)
		{
		var d = divs.snapshotItem(j);
		if(d.parentNode==null) continue;
		var divid=d.id;
		if(divid.indexOf("user_bookmark_")!=0) continue;
		
		var allAnchors = gm_xpath(".//a[@href]",d);
		for(i=0; i<allAnchors.snapshotLength; i++)
			{
			a = allAnchors.snapshotItem(i);
			if(a.parentNode==null) continue;
			var href=a.href;
			if(href.indexOf(prefix)!=0) continue;
			var tag=href.substring(prefix.length);
			if(	tag.length==0 ||
				tag=="uploaded" ||
				tag.indexOf("geo:")==0 ||
				tag==ignoretag
				) continue;
			
			
			var k=0;
			for(k=0;k< tags.length;++k)
				{
				if(tags[k].name==tag)
					{
					tags[k].count++;
					break;
					}
				}
			if(k==tags.length)
				{
				var newtag= new Agent(tag);
				newtag.count=1;
				tags.push(newtag);
				}
			}
		}
	for(i=0;i< tags.length;++i)
		{
		/** create a new item with weight=14 */
		var item= new TreeMapItem(tags[i].count);
		/* set stroke color */
		item.setStroke(new Color(255,0,0));
		/* set background color */
		var gray= 220+ Math.floor(Math.random()*30.0);
		item.setFill(new Color(gray,gray,gray));
		/* set Label */
		item.setLabel(tags[i].name);
		//GM_log(tags[i].name+" "+tags[i].count);
		/* set URL anchor */
		item.setURL(prefix+tags[i].name+"?tool=gmtreemap"+(num==null?"":"&num="+num));
		/* set title */
		item.setTitle(tags[i].name+" ("+tags[i].count+")");
		/* add the new item into the treemap */
		tm.addItem(item);	
		}
	//GM_log(tags.length);
	var svg= tm.toSVG(document);
	//GM_log(svg);
	treemapdiv.appendChild(svg);
	//GM_log("done");
	}
},true);
}
window.addEventListener("load", insertToggle, false);






