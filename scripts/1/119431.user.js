// ==UserScript==
// @name           PHPWind-aisex PLUS!
// @version 1.0.1.8
// @description 用於重組具有空格的網址，並且直接在頁面中提供下載的按鈕，強化頁面部分排板(版面最大化、超連結色彩、浮動回覆框) 
// @author SoIN
// @create 2011-8-24
// @lastmodified 2011-12-25
// @include        http://aisex.*/bt/thread.php?fid=*
// @include        http://bt.aisex.*/bt/thread.php?fid=*
// @include        http://aisex.*/bt/htm_data/*
// @include        http://bt.aisex.*/bt/htm_data/*
// @include        http://*.*.*.*/bt/thread.php?fid=*
// @include        http://*.*.*.*/bt/htm_data/*
// @include        http://*/link.php?ref=*
// @run-at document-end
// ==/UserScript==

var XPFirst=XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList =XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter =XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
function find(xpath, xpres){
	var ret=document.evaluate(xpath, document, null, xpres, null);
	return xpres == XPFirst ? ret.singleNodeValue : ret;
}
function funcionPrincipal_Load1(e){
	if(location.href.search(/jandown/i)!=-1 || location.href.search(/mimima/i)!=-1){
		if (top.location != self.location) {
			fun_addCSS();

			var f1=find('//form[contains(@action,"fetch.php")]', XPList);
			for(var i=0;i<f1.snapshotLength;i++){
				var node1=f1.snapshotItem(i);
				var obj1=document.createElement('form');
					obj1.setAttribute('method', node1.method);
					obj1.setAttribute('action', node1.action);
					obj1.setAttribute('enctype', node1.enctype);

				var f2=find('//input[@name="code" or @name="ref"]', XPList);
				for(var j=0;j<f2.snapshotLength;j++){
					var node2=f2.snapshotItem(j);
					var obj2=document.createElement('input');
						obj2.setAttribute('type', 'hidden');
						obj2.setAttribute('name', node2.name);
						obj2.setAttribute('value', node2.value);
					obj1.appendChild(obj2); 
				}
				obj1.innerHTML+='<input type="submit" class="btn_down" value="下載">';

				var f3=find('//body', XPFirst);
					f3.parentNode.replaceChild(obj1, f3);
			}
		}
	}

	if(location.href.search(/bt\/thread\.php\?fid=.*/i)!=-1){}

	if(location.href.search(/bt\/htm_data\/.*\.html/i)!=-1){
	//	function createForm(src) {return img;}
		fun_MoveEditor();

		var f1=find("//html", XPFirst);
			f1.innerHTML=f1.innerHTML.replace(/h[\s]*t[\s]*t[\s]*p[\s]*:[\s]*\/[\s]*\/[\s]*/g, 'http://');
/*			f1.innerHTML=f1.innerHTML.replace(/w[\s]*w[\s]*w[\s]*\./g, 'w\.');
			f1.innerHTML=f1.innerHTML.replace(/w[\s]*w[\s]*\./g, 'w\.');
			f1.innerHTML=f1.innerHTML.replace(/w[\s]*\./g, 'http://www.');*/
			f1.innerHTML=f1.innerHTML.replace(/w[\s]*w[\s]*w[\s]*\./g, 'ww.');
			f1.innerHTML=f1.innerHTML.replace(/w[\s]*w[\s]*\./g, 'http://www.');
			f1.innerHTML=f1.innerHTML.replace(/http:\/\/http:\/\/www/g, 'http://www');

			f1.innerHTML=f1.innerHTML.replace(/[\s]*j[\s]*a[\s]*n[\s]*d[\s]*o[\s]*w[\s]*n[\s]*/g, 'jandown');
			f1.innerHTML=f1.innerHTML.replace(/[\s]*h[\s]*s[\s]*e[\s]*e[\s]*d[\s]*/g, 'hseed');
			f1.innerHTML=f1.innerHTML.replace(/[\s]*h[\s]*a[\s]*o[\s]*s[\s]*e[\s]*e[\s]*d[\s]*/g, 'haoseed');
			f1.innerHTML=f1.innerHTML.replace(/[\s]*m[\s]*a[\s]*x[\s]*s[\s]*u[\s]*r[\s]*l[\s]*/g, 'maxsurl');
			f1.innerHTML=f1.innerHTML.replace(/[\s]*s[\s]*e[\s]*e[\s]*d[\s]*u[\s]*r[\s]*l[\s]*/g, 'seedurl');
			f1.innerHTML=f1.innerHTML.replace(/[\s]*i[\s]*q[\s]*h[\s]*o[\s]*/g, 'iqho');
			f1.innerHTML=f1.innerHTML.replace(/[\s]*m[\s]*y[\s]*b[\s]*t[\s]*f[\s]*i[\s]*l[\s]*e[\s]*s[\s]*/g, 'mybtfiles');

			f1.innerHTML=f1.innerHTML.replace(/i[\s]*n[\s]*f[\s]*o/g, 'info');
			f1.innerHTML=f1.innerHTML.replace(/c[\s]*o[\s]*m/g, 'com');

			f1.innerHTML=f1.innerHTML.replace(/http:\/\/www2\.lookpipe\.com\/get\.php\?filepath=/g, '');


		var f1=find("//h1[@id='subject_tpc']", XPList);
		for(var i=0;i<f1.snapshotLength;i++){
			var a1=f1.snapshotItem(i).parentNode.innerHTML.split('<br>');
			for(var k=0;k<a1.length;k++){
				var f1s=find("//h1[@id='subject_tpc']", XPList).snapshotItem(i).parentNode;
				function fun_downButton(ss1,regular_name,dURL,code_name,regular_code){
					var down_name=String(regular_name);down_name.search(/\/(.*)\/i/i);down_name=RegExp.$1;		//down_name.replace(/<[^>]*>/g, "");alert(down_name);
					if(a1[k].split(regular_name)[1].search(/target/i)>-1)	{var linkURL=dURL.split(regular_name)[0]+down_name+a1[k].split(regular_name)[2].split(/<\/a>/i)[0];}
					else												{var linkURL=dURL.split(regular_name)[0]+down_name+a1[k].split(regular_name)[1];}
					linkURL.search(regular_code);
					var code=RegExp.$1;
					if(dURL.search(/mybtfiles/i)!=-1){code=code+".torrent";}
					if(ss1=="b"){
//						var code_name=String(regular_code);code_name.search(/\/(.*)\=/i);code_name=RegExp.$1;		//code_name.replace(/<[^>]*>/g, "");alert(code_name);
						if(dURL.search(/magnet/i)>-1){
							btn_down='<form method=post encType=multipart/form-data action="'+linkURL+'"><input type="submit" class="btn_downMagnet" value="磁力下載"></form>';
						}
						else{
							btn_down='<form method=post encType=multipart/form-data action="'+dURL+'"><input type=hidden name="'+code_name+'" value='+code+' /><input type="submit" class="btn_down" value="下載"></form>';
						}
					}
					if(ss1=="f"){
						btn_down='<iframe src='+linkURL+' marginwidth="0" marginheight="0" scrolling="no" frameborder="0" width="50" height="24"></iframe>';
					}
					btn_URL='<table><tr><td align="right" style="width:75px;height:24px;">'+btn_down+'</td><td>'+linkURL+'</td></tr></table>';

					var obj1=document.createElement('span');
						obj1.setAttribute('class', "tpc_content");
						if(a1[k].split(regular_name)[1].search(/target/i)>-1){
							linkURL="<a href=\""+dURL.split(".")[0]+"."+down_name+a1[k].split(regular_name)[1]+down_name+a1[k].split(regular_name)[2].split(/<\/a>/i)[0]+"</a>";
							obj1.innerHTML=f1s.innerHTML.replace(linkURL, btn_URL);
						}
						else{obj1.innerHTML=f1s.innerHTML.replace(linkURL, btn_URL);}
					f1s.parentNode.replaceChild(obj1, f1s);

				}

				if(a1[k].search(/magnet:/i)>-1){
					fun_downButton("b", /magnet/i, "magnet:?xt=urn:btih:", "", /xt=urn:btih:(.*)/i);
				}
				if(a1[k].search(/.jandown./i)>-1){
					fun_downButton("f", /jandown/i, "http://www.jandown.com/fetch.php", "code", /ref=(.*)/i);
				}
				if(a1[k].search(/.mimima./i)>-1){
					fun_downButton("f", /mimima/i, "http://www6.mimima.com/fetch.php", "code", /ref=(.*)/i);
				}
				if(a1[k].search(/.zichenju./i)>-1){
					fun_downButton("b", /zichenju/i, "http://www6.zichenju.com/download.php", "ref", /ref=(.*)/i);
				}
				if(a1[k].search(/.hop3r./i)>-1){
					fun_downButton("b", /hop3r/i, "http://www3.hop3r.com/download.php", "ref", /ref=(.*)/i);
				}
				if(a1[k].search(/.hseed./i)>-1){
					fun_downButton("b", /hseed/i, "http://www.hseed.info/download.php", "code", /code=(.*)/i);
				}
				if(a1[k].search(/.haoseed./i)>-1){
					fun_downButton("b", /haoseed/i, "http://www.haoseed.com/download.php", "ref", /ref=(.*)/i);
				}
				if(a1[k].search(/.maxsurl./i)>-1){
					fun_downButton("b", /maxsurl/i, "http://www.maxsurl.com/download.php", "ref", /ref=(.*)/i);
				}
				if(a1[k].search(/.seedurl./i)>-1){
					fun_downButton("b", /seedurl/i, "http://www.seedurl.com/download.php", "ref", /ref=(.*)/i);
				}
				if(a1[k].search(/.urlshare./i)>-1){
					fun_downButton("b", /urlshare/i, "http://urlshare.info/download.php", "ref", /ref=(.*)/i);
				}
				if(a1[k].search(/.zhizhib./i)>-1){
					fun_downButton("b", /zhizhib/i, "http://www1.zhizhib.com/download.php", "ref", /ref=(.*)/i);
				}
				if(a1[k].search(/.heeyou./i)>-1){
					fun_downButton("b", /heeyou/i, "http://xz.heeyou.com/download.php", "ref", /ref=(.*)/i);
				}
				if(a1[k].search(/.mybtfiles./i)>-1){
					fun_downButton("b", /mybtfiles/i, "http://www.mybtfiles.com/www-download.php", "id", /\/(\d+)\/$/i);
				}
				if(a1[k].search(/.iqho./i)>-1){
					fun_downButton("b", /iqho/i, "http://www.iqho.com/download.php", "inc", /\/\/.*\/(.*).html/i);
				}
			}
		}
	}
};
function funcionPrincipal_Load2(e){
	if(location.href.search(/bt\/thread\.php\?fid=.*/i)!=-1 || location.href.search(/bt\/htm_data\/.*\.html/i)!=-1){
		fun_addCSS();

		var f1=find("//form[@name='FORM']", XPFirst);
			if(f1){find("//div[@id='cLinkContent']", XPFirst).appendChild(f1);}

/*左方的留言會員資訊*/
		var f1=find("//td[@width='20%' and @style='padding: 5px;']", XPList);if(f1){
			for(var i=0;i<f1.snapshotLength;i++){
				f1.snapshotItem(i).setAttribute('width', "150");
			}
		}

/*版面寬度調整至最大尺吋*/
		var f1=find("//td[@width='80%' and not(@style)]", XPList);if(f1){
			for(var i=0;i<f1.snapshotLength;i++){
				f1.snapshotItem(i).removeAttribute("width");
			}
		}

/*圖片調整至若大於視窗，則縮小尺吋*/
		var f1=find("//img", XPList);if(f1){
			for(var i=0;i<f1.snapshotLength;i++){
				if(f1.snapshotItem(i).src.search(/^http:\/\/(.*)%20$/i)!=-1){
					f1.snapshotItem(i).src="http://"+RegExp.$1;
				}
				if(document.documentElement.clientWidth-200<f1.snapshotItem(i).width){
					f1.snapshotItem(i).setAttribute('width', "100%");
				}
			}
		}
	}
};

function fun_addCSS(){
	var css="@namespace url(http://www.w3.org/1999/xhtml);";
		css+="table		{width:99% !important;}";
		css+=".btn_down			{-moz-border-radius:4px;color:#000;background-color:#7ae;width:50px;height:24px;}";
		css+=".btn_downMagnet	{-moz-border-radius:4px;color:#000;background-color:#7ae;width:75px;height:24px;}";

		css+=".t_one a:link		{font-size:14px !important;font-weight:bold !important;color:#000 !important;}";
		css+=".t_one a:visited		{font-size:50% !important;font-weight:normal !important;color:#aaa !important;}";
		css+=".t_one a:visited font	{font-size:50% !important;font-weight:normal !important;color:#aaa !important;}";
	if		(typeof GM_addStyle != "undefined")	{GM_addStyle(css);}
	else if	(typeof addStyle != "undefined")		{addStyle(css);}
	else											{
		var heads=document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node=document.createElement("style");
				node.type="text/css";
				node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
}

function fun_MoveEditor(){
	var mark = "";
		mark+='<div id="Mark" style="position:fixed;bottom:0;right:0;z-index:999;">';
		mark+='	<table id="cLink" border="0" cellpadding="0" cellspacing="0" width="100%" height="100%" style="border:2px solid #FF2F2F;">';
		mark+='		<tr>';
		mark+='			<td valign="top" bgColor="#eee"><table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%" onMouseOver="document.getElementById(\'cLinkContent\').style.display=\'table-cell\';document.getElementById(\'cLinkTitle\').style.display=\'table-cell\';document.getElementById(\'menuSwitch\').innerHTML=\'>>\';">';
		mark+='				<tr><td id="cLinkTitle" height="4" style="display:none"><table border="0" cellpadding="0" cellspacing="0" width="100%">';
		mark+='					<tr>';
		mark+='						<td align="center" style="padding-top:3px;">&nbsp;</td>';
		mark+='						<td align="left" style="padding-top:2px;letter-spacing:1px;"><font size="2" color="#eeeeee"><StrONG>&nbsp;</StrONG></font></td>';
		mark+='					</tr>';
		mark+='				</table></td></tr>';
		mark+='				<tr><td align="center" height="24"><span onClick="document.getElementById(\'cLink\').style.visibility=\'hidden\';document.getElementById(\'cLink\').style.display=\'none\';" style="cursor:default;">✕</span></td></tr>';
		mark+='				<tr><td align="center" id="menuSwitch" onClick="if(document.getElementById(\'cLinkContent\').style.display!=\'none\'){document.getElementById(\'cLinkContent\').style.display=\'none\';document.getElementById(\'cLinkTitle\').style.display=\'none\';document.getElementById(\'menuSwitch\').innerHTML=\'<<\';}else{document.getElementById(\'cLinkContent\').style.display=\'table-cell\';document.getElementById(\'cLinkTitle\').style.display=\'table-cell\';document.getElementById(\'menuSwitch\').innerHTML=\'>>\';}" style="cursor:default;"><<</td></tr>';
		mark+='			</table></td>';
		mark+='			<td bgColor="#fff"><div id="cLinkContent" style="display:none;border:1px solid #000;"></td></td>';
		mark+='		</tr>';
		mark+='	</table>';
		mark+='</div>';
	var bodys = document.getElementsByTagName("body");
	if (bodys.length > 0) {
		var node = document.createElement("div");
			node.innerHTML=mark;
		bodys[0].appendChild(node); 
	}
}

var HiddenObject=0;
function funcionPrincipal_Click(e){
	if(e.button>0){
		function fun_objHidden(xpath, xpres){
			var f1=find(xpath, xpres);
			if(f1){for(var i=0;i<f1.snapshotLength;i++){
				if		(HiddenObject==0){f1.snapshotItem(i).setAttribute("style", "display: none;");}
				else if	(HiddenObject==1){f1.snapshotItem(i).removeAttribute("style");}
			}}
		}
		fun_objHidden("//td[@width='150']", XPList);

		if		(HiddenObject==0){HiddenObject=1;}
		else if	(HiddenObject==1){HiddenObject=0;}
	}
};


window.addEventListener('DOMContentLoaded', funcionPrincipal_Load1, false);
window.addEventListener('DOMContentLoaded', funcionPrincipal_Load2, false);
window.addEventListener('dblclick', funcionPrincipal_Click, false);
