// ==UserScript==
// @name	Instapaper Greystyled narrow
// @version	1.06
// @description Applies a modern interface to the Instapaper website. Provides supports for a folders view.
// @include     http://www.instapaper.com/*
// @contributor 2009+, ElasticThreads (http://elasticthreads.tumblr.com/)
// @contributor Idea to create a userstyle for Instapaper: Tim Van Damme
//
// ==/UserScript==
(function(){
	var b="html{padding:0;margin:0;width:120px !important;}\
	body{background-color: #ebebeb; !important;width:120px !important;}\
	a,a:visited,a:hover{color:rgb(68,68,68);text-decoration:none;}\
	#bookmarkListDeckAdPlaceholder{height:0px !important;}\
	#right_column{width:120px;float:left;position:fixed;left:12px;top:163px;}\
	#left_column{display:none;}\
	#folder_container{width:110px;font-size:10px;font-family:'Helvetica Neue', helvetica, sans-serif;}\
	#folders div{margin-bottom:2px !important;padding-top:1px !important;background-color:inherit !important;border-style:none !important;}\
	#folders b{display:none;}\
	#header div,.logos,.logo{display:none;}\
	#userpanel{display:none;}\
	#footer{display:none;}\
	#bookmarkListDeckAd, #download_as,#tools_container,h3.section_header{display: none;}",
	a="html{padding-left:60px;padding-right:60px;}\
	body{background-color:#ebebeb;width:580px !important;margin:0;}\
	a,span a,h2 a,a:visited{color:rgb(68,68,68);text-decoration:none;font-weight:bold;}\
	a:hover{color: #EB282B;text-decoration:none;}\
	div.bar.top{position:relative !important;z-index: 110;top:150px !important;left:100px !important;width:475px !important;border-color: #333;}\
	#readTbarr div{right:50px !important;z-index:-1 !important;}\
	div#story{margin-top:83px;margin-bottom: 81px;width:430px !important; padding-right:75px !important; padding-left:75px !important; padding-top:115px !important; padding-bottom:40px !important; font-family: Verdana,'Helvetica Neue',Helvetica,  Arial, sans-serif;font-size:120%; line-height:123%;color: #333;background: #f3f3f3;border-radius: 22px 22px; -webkit-border-radius: 22px 22px; -moz-border-radius: 22px 22px; border-width: 1px; border-style: solid; border-color: #a4a4a4;-webkit-box-shadow: 3px 2px 7px #666; -moz-box-shadow:3px 2px 7px #666; box-shadow:3px 2px 7px #666;z-index:100 !important; position:relative;}\
	div#story div h1{display:block !important;font-family: 'Verlag-Book', 'Helvetica Neue', Helvetica,Arial, sans-serif;font-size: 1.5em;font-weight:bold;color: #333;line-height:  1.1em;}\
	div.bar.bottom{display:none !important;}\
	footer{position:fixed;left:80px;bottom:15px;font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;color: #333; z-index: -2;}\
	footer a{color:rgb(68,68,68);}",
	q="html{padding-left:60px !important;padding-right:60px !important;}\
	body{margin:0;background-color: #ebebeb !important;width:580px;}\
	a,span a,h2 a,a:visited{color:rgb(68,68,68);text-decoration:none;font-weight:bold;}\
	a:hover{color: #EB282B;text-decoration:none;}\
	.cornerControls{position:relative;top:3px;right:0px;}\
	#left_column{position:relative;top:92px;width:580px;}\
	#bookmark_list{margin-bottom:61px !important;padding-top:30px;clear:none !important;width:inherit !important;border-radius: 22px 22px; -webkit-border-radius: 22px 22px; -moz-border-radius: 22px 22px;-webkit-box-shadow: 3px 2px 7px #666; -moz-box-shadow:3px 2px 7px #666; box-shadow:3px 2px 7px #666;border-color: #a4a4a4;border-width: 1px; border-style: solid; background: #f3f3f3 !important;z-index: 2;}\
	a.tableViewCellTitleLink, a.tableViewCellTitleLink:visited{display:block;font-family:'Verlag-Book', Helvetica, Arial, sans-serif;font-size: 18px;font-weight:normal;color: #333;line-height: 18px;}\
	.summary{position:relative;left:1px;top:-1px;}\
a.tableViewCellTitleLink:hover{color: #EB282B;text-decoration:none;}\
.titleRow{width:350px !important;margin:0 !important}\
.tableViewCell{padding-left:30px;padding-right:30px;padding-top:14px;background:transparent;border-color: #a4a4a4;border-width: 1px; border-style: solid;border-bottom-color: rgb(221, 221, 221); border-top-style: none !important;border-left-style:none !important;border-right-style:none !important;}\
.tableViewCellLast{border-style:none !important;}\
.secondaryControls{right:0px;}\
.actionButton, .actionButton:hover, .actionButton:visited, .actionButton:active{background:#f2f2f2 !important;border-color:rgb(204, 204, 204); color:rgb(85, 85, 85);}\
.delete_button:hover{background-color:rgb(68,68,68);border-color:red;}\
.delete_button:visited{color:rgb(68,68,68);}\
#auto_mark_as_read_container{display:none;}\
#right_column{display:none;}\
#folder_container{display:none;}\
#fohdas,#fohdas a{display:none;}\
#fohdas span{display:none;}\
#folders div b{display:none;}\
#logo{display:none;}\
.logos{font-family:  'Helvetica Neue',Helvetica, Arial, sans-serif !important; font-size:60px; position:fixed; left:114px; top:-6px;z-index: -2 !important;}\
#categoryHeader{height: 15px !important;margin-bottom: 10px !important; font-size:14px; position:fixed;top:64px !important; left:118px !important;width:285px;word-spacing: 7px;z-index: -2 !important;}\
#categoryHeader a{position:relative;z-index: 0 !important;font-weight:normal;}\
#paginationTop{position:fixed;top:49px !important; left:413px !important;z-index:-1 !important;display:block !important;}\
.pagination a span{text-decoration:none !important;z-index:0 !important;font-weight:normal !important;}\
#header div{display:none;}\
#userpanel{display:none;}\
#footer{display:none;}\
#foota{position:fixed;left:79px;bottom:15px;font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;color: #333; z-index: -2;}\
#bookmarkListDeckAd, #download_as,#tools_container,h3.section_header{display: none;}",
	d=String(window.location.href),c="";
	if(d=="http://www.instapaper.com/u/folder"){
		c=b;
		b=document.createElement("div");
		b.setAttribute("style","visibility:visible !important;margin-bottom: 5px;margin-left: -8px;font-weight:normal;padding: 2px 8px;position:fixed !important;top:165px !important;left:12px !important;background-color: none !important;width:100px;");
		a=document.createElement("img");
		a.setAttribute("src","/images/folder-tiny.png");
		a.setAttribute("style","width: 12px; height: 9px; margin-right: 6px;");
		b.appendChild(a);
		a=document.createElement("a");
		a.setAttribute("href","http://www.instapaper.com/u");
		a.appendChild(document.createTextNode("Read Later"));
		b.appendChild(a);
		document.getElementById("folders").appendChild(b)
	}
	else{
		if (d.indexOf('http://www.instapaper.com/text?u=')!=-1){
			c=a;
			g=document.createElement("footer");
			g.innerHTML="&#xab; <a href='/u'>Back to Instapaper</a>.<span style='position:relative;left:261px;'>Greystyled by <a href='http://elasticthreads.tumblr.com'>ElasticThreads</a>.</span>";
			document.body.appendChild(g);
		}
		else if((d.indexOf('http://www.instapaper.com/u')!=-1)||(d.indexOf('http://www.instapaper.com/starred')!=-1)||(d.indexOf('http://www.instapaper.com/archive')!=-1)){
			c=q;
			r=document.createElement("span");
			r.id="foota"
			r.innerHTML="By <a href='http://www.marco.org/'>Marco Arment</a>.<span style='position:relative;left:279px;'>Greystyled by <a href='http://elasticthreads.tumblr.com'>ElasticThreads</a>.</span>";
			p=document.getElementById("left_column");			
			p.appendChild(r);
			k=document.createElement("div");
			k.innerHTML="<a href='/u' class='logos'>Instapaper</a>";
			document.body.insertBefore(k, document.body.firstChild);
		}
	}
	b=document.getElementsByTagName("head");
	if(b.length>0){
		a=document.createElement("style");
		a.type="text/css";
		a.appendChild(document.createTextNode(c));
		b[0].appendChild(a);
	}
	var wh = window.outerHeight;
	var ww = window.outerWidth;
	var sy = screen.availHeight;
	var sx = screen.availWidth;
	if (sx > 780) {sx=780;}
	if (ww > sx){sx=ww};
	if(wh > (sy*.6)){sy=wh;}
	window.resizeTo(sx,sy);
})();
