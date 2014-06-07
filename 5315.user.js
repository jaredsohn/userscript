// Flickr Comment Tools
// version 1.2
// 2006-07-04
//
// SEE BELOW FOR INSTALLATION INSTRUCTIONS
//
// This entire script is released under BSD license
// 
// Copyright (c) 2006, Thom Shannon
// All rights reserved.
//
// This is a Greasemonkey user script.
// HOW TO INSTALL
//
// Firefox:
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FlickrCommentTools
// @namespace     http://www.ts0.com/
// @description   HTML editor and quick insert of your own images into comments
// @include       http://flickr.com/*
// @include       http://www.flickr.com/*
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


String.prototype.replaceAll = function(strTarget,strSubString){
	var strText = this;
	var intIndexOfMatch = strText.indexOf( strTarget );
	while (intIndexOfMatch != -1){
		strText = strText.replace( strTarget, strSubString )
		intIndexOfMatch = strText.indexOf( strTarget );
	}
	return( strText );
}


addGlobalStyle(
'.commentToolButton img {border:solid 1px white;} '+
'.commentToolClose,.commentToolCancel {font-size:12px;float:right;margin-right:4px;margin-top:2px;color:blue;} '+
'.commentToolCancel {color:#444;} '+
'.commentToolButton:hover img.commentToolOff {display:none;} '+
'.commentToolButton:hover img.commentToolOn {border-color:white #999999 #999999 white;display:inline;} '+
'.commentToolButton img.commentToolOn {display:none;} \n'+
'.commentChooser {width:400px;height:340px;border:solid 1px #bbb;background:white;position:absolute;text-align:center;padding-top:7px;} '+
'.overlay {\nposition:absolute;\ndisplay:block;\n}\n.tt {\nvisibility:hidden;\nposition:absolute;\ncolor:#333;\nbackground-color:#FDFFB4;\nfont-family:arial,helvetica,verdana,sans-serif;\npadding:2px;\nborder:1px solid #FCC90D;\nfont:100% sans-serif;\nwidth:auto;\n}\n* html body.masked select {\nvisibility:hidden;\n}\n* html div.panel-container select {\nvisibility:inherit;\n}\n* html div.drag select {\nvisibility:hidden;\n}\n* html div.hide-select select {\nvisibility:hidden;\n}\n.mask {\nz-index:0;   \ndisplay:none;\nposition:absolute;\ntop:0;\nleft:0;\nbackground-color:#CCC;\n-moz-opacity: 0.5;\nopacity:.50;\nfilter: alpha(opacity=50);\n}\n.mask[id]{ /* IE6 and below Can\'t See This */\nposition:fixed;\n}\n.hide-scrollbars * {\noverflow:hidden;\n}\n.hide-scrollbars textarea, .hide-scrollbars select {\noverflow:hidden;\ndisplay:none;\n}\n.show-scrollbars textarea, .show-scrollbars select {\noverflow:visible;\n}\n.panel-container {\nposition:absolute;\nbackground-color:transparent;\nz-index:6;\nvisibility:hidden;\noverflow:visible;\nwidth:auto;\n}\n.panel-container.matte {\npadding:3px;\nbackground-color:#FFF;\n}\n.panel-container.matte .underlay {\ndisplay:none;\n}\n.panel-container.shadow {\npadding:0px;\nbackground-color:transparent;\n}\n.panel-container.shadow .underlay {\nvisibility:inherit;\nposition:absolute;\nbackground-color:#CCC;\ntop:3px;left:3px;\nz-index:0;\nwidth:100%;\nheight:100%;\n-moz-opacity: 0.7;\nopacity:.70;\nfilter:alpha(opacity=70);\n}\n.panel {\nvisibility:hidden;\nborder-collapse:separate;\nposition:relative;\nleft:0px;top:0px;\nfont:1em Arial;\nbackground-color:#FFF;\nborder:1px solid #000;\nz-index:1;\noverflow:auto;\n}\n.panel .hd {\nbackground-color:#3d77cb;\ncolor:#FFF;\nfont-size:1em;\nheight:1em;\nborder:1px solid #FFF;\nborder-bottom:1px solid #000;\nfont-weight:bold;\noverflow:hidden;\npadding:4px;\n}\n.panel .bd {\noverflow:hidden;\npadding:4px;\n}\n.panel .bd p {\nmargin:0 0 1em;\n}\n.panel .close {\nposition:absolute;\ntop:5px;\nright:4px;\nz-index:6;\nheight:12px;\nwidth:12px;\nmargin:0px;\npadding:0px;\nbackground-repeat:no-repeat;\ncursor:pointer;\nvisibility:inherit;\n}\n.panel .close.nonsecure {\nbackground-image:url(http://us.i1.yimg.com/us.yimg.com/i/nt/ic/ut/alt3/close12_1.gif);\n}\n.panel .close.secure {\nbackground-image:url(https://a248.e.akamai.net/sec.yimg.com/i/nt/ic/ut/alt3/close12_1.gif);\n}\n.panel .ft {\npadding:4px;\noverflow:hidden;\n}\n.simple-dialog .bd .icon {\nbackground-repeat:no-repeat;\nwidth:16px;\nheight:16px;\nmargin-right:10px;\nfloat:left;\n}\n.dialog .ft, .simple-dialog .ft {\npadding-bottom:5px;\npadding-right:5px;\ntext-align:right;\n}\n.dialog form, .simple-dialog form {\nmargin:0;\n}\n.button-group button {\nfont:100 76% verdana;\ntext-decoration:none;\nbackground-color: #E4E4E4;\ncolor: #333;\ncursor: hand;\nvertical-align: middle;\nborder: 2px solid #797979;\nborder-top-color:#FFF;\nborder-left-color:#FFF;\nmargin:2px;\npadding:2px;\n}\n.button-group button.default {\nfont-weight:bold;\n}\n.button-group button:hover, .button-group button.hover { \nborder:2px solid #90A029;\nbackground-color:#EBF09E;\nborder-top-color:#FFF;\nborder-left-color:#FFF;\n}\n.button-group button:active { \nborder:2px solid #E4E4E4;\nbackground-color:#BBB;\nborder-top-color:#333;\nborder-left-color:#333;\n'
);

var imgLoading = "data:image/gif;base64,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";

var toolBarDescription = {"Buttons":[
	{Label:"Insert Image",
	imgOn:"data:image/gif;base64,R0lGODlhLQATAOYAAAAAAP///3jc23nc23rd3Hvd3IHe3ojg3pXk47zu7Y3h37Tr6Xrc1JDh1oTdzYbdx5rdpYTOjGzDcnXHfI/QjKHdnDimGzinHTyoIECqJF+2RKXdlUSpI0muJUyuKrDcgKjUcMDgkczhd8/dXc7YRdPYPPX0nvf2ouLcMfLvlvb0nufcKOrkg+vlhe3oiu/pje7qjfDskPLulefeeuffeujhf/HbF/DbG9/SZd7SZeDTZ9/TZuHVa+TaceTZctTCStPCStfGUdnKWNrLWsmyMMu1NMq1NM+6Pc66PtPASNTBSi4uLv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEwALAAAAAAtABMAAAflgAGCg4SFhoeIiYqLjI2CS5CRkpCOlYNLOzg6PD00LDApKicnS4IAAaeopgCnrK2sq6mXQpOTpKaoraqDsqm+hks/SwkGBQQPFRAOS7eqr6uxub3ASEsIAwIMHysoG8ylzrmEurjThUtFSwsKBw0jNjci3+XlsNK7v+dESxQSExEgSpAIMc+SoyVGlmSwcAEDhw4eNBQ0yGjJkVqSmoXDJS6aq0NLlCQBEmRIDh81XMgwofEZrF+ydiGqNaNFjEjjwr16Ke5jxU+UCpHbSG5oxRdBhcosCu1exaQUo0qdSrWq1aiBAAA7",
	imgOff:"data:image/gif;base64,R0lGODlhLQATAKIAAAAAAP///4CAgH9/f3h4eHd3d////wAAACH5BAEAAAYALAAAAAAtABMAAAOGGLrc/jDKSasqJOuMif2LN4lCUJqKoJqrerpNwbp0SbLomS7v3ni6RkmWwxlhMB8DCLHtSise6in9TR3OYi6K9AUVzEcWVJF9pSIyxVyjBYiBwfWlQ0ato4W8BaVWIRwEBXCCaXFFUF18Zw8iGQ57Uj2THx6PkHNTdCl3EhpqoKGio6SlowkAOw==",
	//Click:function(){GetImageHTML();return false;}
	Click:function(){GetImageHTML();return false;}
	},
	{Label:"Bold",
	imgOn:"data:image/gif;base64,R0lGODlhEwATAMQAAAAAAP///+/v79/f38/Pz7+/v6+vr5+fn4+Pj4CAgHBwcGBgYFBQUEBAQCAgIBAQEP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABAALAAAAAATABMAAAVUYCCOZGmeqJmsbIIMaQDMNH2ks9PsDU2gswSJEAQChCPBDGFcFJ4GBuAhMNZoBdyV9vidiiPDA9AwIkeJmZkk6D2MOt4YoLBuG9VTq+WN+f+AgQEhADs=",
	imgOff:"data:image/gif;base64,R0lGODlhEwATAMQAAAAAAP////b29u7u7uXl5dzc3NTU1MvLy8LCwrq6urKysqmpqaCgoJiYmIaGhn5+fnV1df///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAATABMAAAVUYCCOZGmeqJmsbIIMaQDNNH2ks9PsDU2gswSJEARChCPBDGFcFJ4GBuQhMNZoBdyV9vidiiPDA9IwIkeJmZkk6D2MOt4YorBuG9VTq+WN+f+AgQEhADs=",
	Click:function(){ifrm.contentDocument.execCommand('bold',false,false);return false;}
	},
	{Label:"Italic",
	imgOn:"data:image/gif;base64,R0lGODlhEwATAMQAAAAAAP///+/v79/f38/Pz7+/v6+vr5+fn4+Pj4CAgHBwcGBgYFBQUEBAQDAwMCAgIBAQEP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAATABMAAAU+YCCOZGmeaKqqSeM2wjoaACKTCBDfIvPwI8gCGBgADsQDgEBUQIgBRwMKSBALgAJPUGhUB7dBYpzQQs9oVQgAOw==",
	imgOff:"data:image/gif;base64,R0lGODlhEwATAMQAAAAAAP////b29u7u7uXl5dzc3NTU1MvLy8LCwrq6urKysqmpqaCgoJiYmI+Pj4aGhn5+fnV1df///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAATABMAAAU+YCCOZGmeaKqqSeM2wjoaESKTSBTfIvPwI8gCGBhEDsRDhEBUQIgBRwMaSRALkQJPUGhUB7dBYpzQQs9oVQgAOw==",
	Click:function(){ifrm.contentDocument.execCommand('italic',false,false);return false;}
	},
	{Label:"Underline",
	imgOn:"data:image/gif;base64,R0lGODlhEwATALMAAAAAAP///+/v79/f38/Pz7+/v6+vr4+Pj4CAgHBwcGBgYFBQUCAgIP///wAAAAAAACH5BAEAAA0ALAAAAAATABMAAARFMMhJq704a4tAqd13haCHkRTKmSm7ipNawpLc0oEduzXfGpWEb1IAKCoMgCZ5EAQGCkBCQ0gCroCFc1NAIA6EjXhMJkcAADs=",
	imgOff:"data:image/gif;base64,R0lGODlhEwATALMAAAAAAP////b29u7u7uXl5dzc3NTU1MLCwrq6urKysqmpqaCgoIaGhnV1df///wAAACH5BAEAAA4ALAAAAAATABMAAARFMMhJq704a4taqd13haCHkRTKmSm7ipNawpLc0oEduzXfGpWEb1JoKCqMhiZ5EAQGikZCQ0g2ro2Fc1NAIA6EjXhMJkcAADs=",
	Click:function(){ifrm.contentDocument.execCommand('underline',false,false);return false;}
	},
	{Label:"Hyperlink",
	imgOn:"data:image/gif;base64,R0lGODlhEwATALMAAAAAAP///wAA/wAAgACAgACAAMDAwICAgE1NTf///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAATABMAAARkMMhJq734ns3z3IQhFoh3BAZarCS2CaggC+tpHYJoDCvd3jlWYUDglYBBoexYwc2EBAGTchg8WYKBzYKYIb6IAXg6CSNSqRKaLDmP3wZ2ya1zB+TxNzh+OaPuf3wYY3dgHocBEQA7",
	imgOff:"data:image/gif;base64,R0lGODlhEwATAKIAAAAAAP///93d3bq6up+fn5iYmP///wAAACH5BAEAAAYALAAAAAATABMAAANWGLrc/vCNSeOaRehC7AgCWIwcVAnUMH7OpAmkWrYDTN4dXd/FlDcpWezHUFFuRgiBQmgSOM7HkxAKdarEBdXJbQqygc72tQ07tl3nV1o1YyPccNRCTwAAOw==",
	Click:function(){ifrm.contentDocument.execCommand('createlink',false,getUrl());return false;}
	},
	{Label:"Indent",
	imgOn:"data:image/gif;base64,R0lGODlhEwATAJEAAAAAgAAAAP///wAAACH5BAAAAAAALAAAAAATABMAAAIplI+pyy3hYgwU1kulBAjfBHCGVx3hqZnigzEr+6XSR2YyQ0P3PvJ+VAAAOw==",
	imgOff:"data:image/gif;base64,R0lGODlhEwATAIAAAMDAwP///yH5BAAAAAAALAAAAAATABMAAAInjI+pyx3gYgQU1kulhAfflBle1X2ayD0Yk6rmOZFjCC8fXedtzjcFADs=",
	Click:function(){ifrm.contentDocument.execCommand('indent',false,'blockquote');return false;}
	},
	{Label:"Outdent",
	imgOn:"data:image/gif;base64,R0lGODlhEwATAJEAAAAAgAAAAP///wAAACH5BAAAAAAALAAAAAATABMAAAIplI+pyy3hYgwU1kulBAhfBHCHVx3hqRlhhzGi4aXaR2YyQ0P3DvN+VAAAOw==",
	imgOff:"data:image/gif;base64,R0lGODlhEwATAIAAAMDAwP///yH5BAAAAAAALAAAAAATABMAAAImjI+pyx3gYgQU1kulhAdflHVe+HxaCWIMZ3in9o3kq8Qsjd/43hQAOw==",
	Click:function(){ifrm.contentDocument.execCommand('outdent',false,'blockquote');return false;}
	}
]}



ToolBar = function()
{
	this.buttons = new Array();
}
with(ToolBar){
	prototype.onSelect = null;
	prototype.Render = function(placeHolder,desc)
	{
		for(i in desc.Buttons){
			a = document.createElement("a");
			imgoff = document.createElement("img");
			imgon = document.createElement("img");
			
			a.className = 'commentToolButton';
			a.href='#';
			a.title = desc.Buttons[i].Label;
			imgoff.src=desc.Buttons[i].imgOff;
			imgoff.className = 'commentToolOff';
			imgon.src=desc.Buttons[i].imgOn;
			imgon.className = 'commentToolOn';
			a.onclick=desc.Buttons[i].Click;
			a.appendChild(imgoff);
			a.appendChild(imgon);
			placeHolder.appendChild(a);
		}
	}
}

function GetImageHTML(){
		
	divFind = document.createElement("div");
	divFind.className = 'commentChooser';
	divFind.id = 'dialogBody';
	divFind.innerHTML = '<img style="margin:138px;" src="'+imgLoading+'" alt="Loading"/>'
	
	 			btn = document.createElement("a");
				btn.innerHTML = 'cancel';
				btn.href="#";
				btn.className = 'commentToolCancel'
				btn.onclick = function(){return false;}
				divFind.appendChild(btn);
			
	lwBox = new LightWeightBox(divFind);
	lwBox.Render();
	
				btn.onclick = function(){lwBox.Close(lwBox);return false;};
		
	GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.flickr.com/services/feeds/photos_public.gne?id='+window.wrappedJSObject.global_nsid+'&format=rss_200',
	headers: {
	'User-agent': 'Mozilla/4.0 (compatible) FlickrCommentTool www.ts0.com',
	'Accept': 'text/plain'
	},
	onload: function(o) {
		  	
		  	divDialog = document.getElementById('dialogBody');
		  	divDialog.innerHTML = '';
	
				var xpe = new XPathEvaluator();
				function fNSResolver(prefix) {
				  if(prefix == 'media') {
				    return 'http://search.yahoo.com/mrss';
				  }
				}
        var parser = new DOMParser();
        var feedXML = parser.parseFromString(o.responseText,"application/xml");
				items = xpe.evaluate("//item",feedXML, fNSResolver, 0, null);
	
				while (xmlItem = items.iterateNext())
				{
					xmlThumb = xpe.evaluate("./media:thumbnail", xmlItem, fNSResolver, 0, null).iterateNext();
					photoThumb = document.createElement("img");
					photoThumb.src = xmlThumb.getAttribute("url");
					photoThumb.width = 75;
					photoThumb.height = 75;
					photoThumb.style.margin="1px";
					photoThumb.url = xpe.evaluate("./link", xmlItem, fNSResolver, 0, null).iterateNext().firstChild.nodeValue;
					photoThumb.img = xmlThumb.getAttribute("url").replace('_s.','_m.');
					photoThumb.onclick = function(){;
						ifrm.contentDocument.execCommand('inserthtml',false,'<a href="notrela123'+this.url+'"><img src="'+this.img+'" border="0"></a>');
						lwBox.Close(lwBox);
						};
		  		divDialog.appendChild(photoThumb);
				}
	 			btn = document.createElement("a");
				btn.innerHTML = 'close';
				btn.href="#";
				btn.className = 'commentToolClose'
				btn.onclick = function(){return false;}
				divDialog.appendChild(btn);
				btn.onclick = function(){lwBox.Close(lwBox);return false;};
		 
		  }
				});
		
	
}

function SetHTML(val)
{
	ifrm.contentDocument.body.innerHTML = val.replaceAll('\n','<br>');
}
function GetHTML()
{
	return ifrm.contentDocument.body.innerHTML.replaceAll('<br>','\n').replaceAll('notrela123','');
}

var editingForm,txtArea;
document = document.wrappedJSObject;

for(i=0;i<document.forms.length;i++)
{
	for(x=0;x<document.forms[i].elements.length;x++)
	{
		if(document.forms[i].elements[x].name=='message')
		{
				editingForm=document.forms[i];
				txtArea=document.forms[i].elements[x]
		}
	}
}


var ifrm = document.createElement("iframe");
dTest = document.createElement("div");

txtArea.parentNode.insertBefore(ifrm,txtArea);
txtArea.parentNode.insertBefore(dTest,txtArea);
txtArea.style.display = 'none';	

ifrm.contentDocument.designMode = 'on';
ifrm.contentDocument.write('<html><style>body{font:normal 10pt arial,verdana;margin:3px;}</style><body></body></html>');
ifrm.contentDocument.close();
SetHTML(txtArea.value);

var previousHTML = GetHTML();
var previousText = txtArea.value;

setInterval(function(){
	if (previousHTML!=GetHTML()+'')
	{
			txtArea.value=GetHTML();
			previousText=txtArea.value;
			previousHTML=GetHTML()+'';
		}
	else if (previousText!=txtArea.value+'')
	{
			SetHTML(txtArea.value);
			previousText=txtArea.value;
		}
	
	},20);

ifrm.style.border = 'solid 1px #404040;'
ifrm.style.width = "350px";
ifrm.style.height = "200px";
ifrm.contentDocument.execCommand('useCSS',false, true);

editingForm.onsubmit = function(){setTextarea();editingForm.onsubmit();};

var toolBar = new ToolBar();

divToolBar = document.createElement("div")
toolBar.Render(divToolBar,toolBarDescription);
ifrm.parentNode.insertBefore(divToolBar,ifrm);


function getUrl()
{
	url = prompt('Web Address');
	if(url.indexOf('://')<1)
	{
		url='http://'+url
	}
	return url;
}


var LightWeightBoxOn=false;
var LightWeightBox = function(ele){
	this.ele = ele;
	this.backgroundColor = '#CCC';
	this.opacity = 0.5;
}
with (LightWeightBox){
	prototype.Render = function(){
		if (!LightWeightBoxOn){
			bgDiv = document.createElement('div');
			bgDiv.innerHTML = ''
			bgDiv.style.backgroundColor = this.backgroundColor;
			bgDiv.style.position='fixed';
			bgDiv.style.height='100%';
			bgDiv.style.width='100%';
			bgDiv.style.top=0;
			bgDiv.style.left='0';
			bgDiv.style.opacity=this.opacity;
			this.ele.style.position='fixed';
			this.bgDiv=bgDiv;
			document.body.appendChild(this.bgDiv);
			document.body.appendChild(this.ele);
			this.CheckSize();
			LightWeightBoxOn = true;
			var oSelf=this;
			//this.sizeCheck = setInterval(function(){oSelf.CheckSize();},20);
		}
	}
	prototype.CheckSize = function(){
		if (this.ele.offsetHeight!=this.currentHeight) {
			this.offsetTop = (document.body.clientHeight/2)-(this.ele.offsetHeight/2);
			this.ele.style.top = this.offsetTop+'px';
			this.currentHeight=this.ele.offsetHeight;
		}
		if (this.ele.offsetWidth!=this.currentWidth) {
			this.offsetLeft = (document.body.clientWidth/2)-(this.ele.offsetWidth/2);
			this.ele.style.left = this.offsetLeft+'px';
			this.currentWidth=this.ele.offsetWidth;
		}
	}

	prototype.Close=function(oSelf){
		document.body.removeChild(oSelf.bgDiv);
		document.body.removeChild(oSelf.ele);
		LightWeightBoxOn = false;
	}
}
