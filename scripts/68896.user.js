// ==UserScript==
// @name	Instapaper Greystyled
// @version	1.0.9
// @description Applies a modern interface to the Instapaper website. Provides supports for a folders view.
// @include     http://www.instapaper.com/*
// @contributor 2010+, ElasticThreads (http://elasticthreads.tumblr.com/)
// @contributor Idea to create a userstyle for Instapaper: Tim Van Damme
//
// ==/UserScript==
(function(){
	var b="*{}",
	a="html{padding-left:90px;padding-right:90px;}\
	body{background-color:#ebebeb;width:610px !important;margin:auto;}\
	a,span a,h2 a,a:visited{color:rgb(68,68,68);text-decoration:none;font-weight:bold;}\
	a:hover{color: #EB282B;text-decoration:none;}\
	div.bar.top{position:relative !important;z-index: 110;top:150px !important;left:100px !important;width:475px !important;border-color: #333;}\
	#readTbarr div{right:80px !important;z-index:-1 !important;}\
	div#story{margin-top:64px;margin-bottom: 42px;width:430px !important; padding-right:90px !important; padding-left:90px !important; padding-top:115px !important; padding-bottom:40px !important; font-family: Verdana,'Helvetica Neue',Helvetica,  Arial, sans-serif;font-size:120%; line-height:123%;color: #333;background: #f3f3f3;border-radius: 22px 22px; -webkit-border-radius: 22px 22px; -moz-border-radius: 22px 22px; border-width: 1px; border-style: solid; border-color: #a4a4a4;-webkit-box-shadow: 3px 2px 7px #666; -moz-box-shadow:3px 2px 7px #666; box-shadow:3px 2px 7px #666;z-index:60 !important; position:relative;}\
	div#story div h1{display:block !important;font-family: 'Verlag-Book',  Verdana,  Verdana,'Helvetica Neue', Arial, sans-serif;font-size: 1.5em;font-weight:bold;color: #333;line-height:  1.1em;}\
	div.bar.bottom{display:none !important;}\
	footer{position:relative;left:17px;top:15px;margin-bottom: 25px;font-size: 12px; font-family:   Helvetica, Arial, sans-serif;color:black;z-index:-2;}\
	footer a{color:rgb(68,68,68);}",
	q="html{padding-left:60px !important;padding-right:60px !important;}\
	body{margin:0;background-color: #ebebeb !important;width:200px;}\
	a,span a,h2 a,a:visited{color:rgb(68,68,68) !important;text-decoration:none !important;font-weight:bold !important;}\
	a:hover{color: #EB282B !important;text-decoration:none !important;}\
	.cornerControls{position:relative;top:3px;right:0px;}\
	#left_column{margin-left:165px !important; position:relative;top:73px;width:610px;z-index: 2;}\
	#bookmark_list{margin-bottom:61px !important;padding-top:30px;clear:none !important;width:inherit !important;border-radius: 22px 22px; -webkit-border-radius: 22px 22px; -moz-border-radius: 22px 22px;-webkit-box-shadow: 3px 2px 7px #666; -moz-box-shadow:3px 2px 7px #666; box-shadow:3px 2px 7px #666;border-color: #a4a4a4;border-width: 1px; border-style: solid; background: #f3f3f3 !important;}\
	a.tableViewCellTitleLink, a.tableViewCellTitleLink:visited{display:block;font-family:'Verlag-Book', Helvetica, Arial, sans-serif;font-size: 18px;font-weight:normal;color: #333;line-height: 18px;}\
	.summary{position:relative;left:1px;top:-1px;}\
a.tableViewCellTitleLink:hover{color: #EB282B;text-decoration:none;}\
.titleRow{padding-top:8px;position:relative;left:10px;}\
.tableViewCell{padding-left:30px;padding-right:30px;padding-top:14px;background:transparent;border-color: #a4a4a4;border-width: 1px; border-style: solid;border-bottom-color: rgb(221, 221, 221); border-top-style: none !important;border-left-style:none !important;border-right-style:none !important;}\
.tableViewCellLast{border-style:none !important;}\
.secondaryControls{right:0px;}\
.actionButton, .actionButton:hover, .actionButton:visited, .actionButton:active{background:#f2f2f2 !important;border-color:rgb(204, 204, 204); color:rgb(85, 85, 85);}\
.delete_button:hover{background-color:rgb(68,68,68);border-color:red;}\
.delete_button:visited{color:rgb(68,68,68);}\
#auto_mark_as_read_container{display:none;}\
#right_column{width:190px;float:left;position:fixed;left:5px;top:100px;}\
#folder_container{margin-left:10px;margin-top:0px;float:left;width:120px;line-height:16px; font-family:   Helvetica, Arial, sans-serif;font-size:11px !important; border-width: 1px; border-style: solid; border-color: #a4a4a4; border-radius: 22px 22px; -webkit-border-radius: 22px 22px; -moz-border-radius: 22px 22px;  padding:20px;padding-top:25px;background: #f3f3f3;-webkit-box-shadow: 2px 2px 5px #666; -moz-box-shadow:2px 2px 5px #666; box-shadow:2px 2px 5px #666;position:relative;}\
#fohdas,#fohdas a{height: 30px;margin-bottom: 20px;position:relative !important;top:-14px;left:-29px;font-size:14px !important;font-family:   Helvetica, Arial, sans-serif !important;font-weight:normal !important;color:rgb(68, 68, 68) !important;display:none;}\
#fohdas span{display:none;height: 30px;margin-bottom: 20px;position:relative !important;top:-14px;left:-24px;}\
#folders div{margin-bottom:2px !important;padding-top:1px !important;}\
#folders div b{;}\
#folders div a{font-size:10px !important;z-index:4 !important;}\
#logo{display:none;}\
.logos{font-family:  Helvetica, Arial, sans-serif !important; font-size:60px; position:fixed; left:289px; top:-1px;z-index: -2 !important;}\
#categoryHeader{height: 15px !important;margin-bottom: 10px !important; font-size:14px; position:fixed;top:64px !important; left:293px !important;width:300px;word-spacing: 7px;z-index: -2 !important;}\
#categoryHeader a{position:relative;z-index: 0 !important;font-weight:normal !important;}\
#paginationTop{position:fixed;top:49px !important; left:586px !important;z-index:-1 !important;display:block !important;}\
.pagination a span{text-decoration:none !important;z-index:0 !important;font-weight:normal;}\
#header div{display:none;}\
#userpanel{display:none;}\
#footer{display:none;}\
#foota{position:fixed;left:250px;bottom:10px;font-size: 12px; font-family:   Helvetica, Arial, sans-serif;color:black;z-index:-2;}\
#bookmarkListDeckAdPlaceholder{height:0px !important;}\
#download_as,#tools_container,h3.section_header{display: none;}\
#deckad,#bookmarkListDeckAd,#ad,p.ads{display:block !important;top:110px !important;left:865px !important;}",
	d=String(window.location.href),c="";
		if (d.indexOf('http://www.instapaper.com/text?u=')!=-1){
			c=a;
			g=document.createElement("footer");
			g.innerHTML="&#xab; <a href='/u'>Back to Instapaper</a>.<span style='position:relative;left:291px;'>Greystyled by <a href='http://elasticthreads.tumblr.com'>ElasticThreads</a>.</span>";
			document.body.appendChild(g);
		}
		else if((d.indexOf('http://www.instapaper.com/u')!=-1)||(d.indexOf('http://www.instapaper.com/starred')!=-1)||(d.indexOf('http://www.instapaper.com/archive')!=-1)){
			c=q;
			r=document.createElement("span");
			r.id="foota"
			r.innerHTML="By <a href='http://www.marco.org/'>Marco Arment</a>.<span style='position:relative;left:300px;'>Greystyled by <a href='http://elasticthreads.tumblr.com'>ElasticThreads</a>.</span>";
			p=document.getElementById("left_column");			
			p.appendChild(r);
			i=document.createElement("h2");
			i.id="fohdas";
			i.innerHTML="<a href=''>Foldas</a><span style='color: #ccc;'>&bull;</span>";
			j=document.getElementById("categoryHeader");
			j.appendChild(i)
			k=document.createElement("div");
			k.innerHTML="<a href='/u' class='logos'>Instapaper</a>";
			document.body.insertBefore(k, document.body.firstChild);
		}	
	b=document.getElementsByTagName("head");
	if(b.length>0){
		a=document.createElement("style");
		a.type="text/css";
		a.appendChild(document.createTextNode(c));
		b[0].appendChild(a);
	}
})();
