var myMeta=<><![CDATA[
// ==UserScript==
// @name           HungYeah
// @namespace      HungYeah
// @description    更方便地瀏覽洪爺 科科。More convenient to browse Hung-ya.com.
// @include        http://bbs.hung-ya.com/cgi-bin/bbs/*.pl?board=*
// @include        http://bbs.bbs-tw.com/cgi-bin/bbs/*.pl?board=*
// @include        http://userscripts.org/scripts/show/64582
// @include        http://*.g00le.net/v2.htm?*
// @include        http://174.120.243.237/v2.htm?*
// @updateURL      http://userscripts.org/scripts/source/64582.meta.js
// @version        0.34
// ==/UserScript==
]]></>.toString();

/*
	功能
		sort:		文章排序
		sortBy:		排序依據 1時間 2瀏覽數 3回應數 4發表者。正數為由新至舊、由大到小，反之設負數，例如時間由舊到新設-1
		fixLink:	還原文章超連結，方便開分頁
		fixMenu:	將選單改成固定式
		easySearchBtn:	在文章列表放置日期或自訂常用字按鈕，方便搜尋
		dateBtnLen:	日期按鈕的數量，由"今天"往前排
		mySearchBtn:	自訂你的搜尋常用字，格式請參考設定後面的註解
		noSaveSearch:	不紀錄搜尋資料 true為不紀錄  false為維持預設(依你的瀏覽器設定而定，俗稱瀏覽器的"自動完成"功能)
		showAllResult:	搜尋時，將多頁搜尋結果全部顯示在同一頁
		hideEmbed:	隱藏嵌入的swf或音樂等，可再點選開啟，線上影片區不隱藏
		fixMarquee:	改固定文字加虛線框取代跑馬燈
		simplifyCSS:	移除發文者自訂CSS(因發文者格式皆不同，應該會繼續調整簡化方式)
		timeoutRefresh:	若網路連線逾時沒有回應時，自動重新整理
		hideAnno:	隱藏文章列表的公告，此設定和fixLink、sort綁在一起，若fixLink和sort皆設false，則無法隱藏公告
		showHide:	顯示文章內容中，部分隱藏的區塊
				其他隱藏的圖片先清空，改為顯示時才載入圖片，避免預讀圖片增加網路流量負擔
		hideReply:	隱藏文章內容第一頁的所有回應，可再點選開啟回應內容

	外觀
		bgColor:	背景底色，不修改設'-1'，或可用顏色的英文名字如gray或色碼#223344。
		title:		瀏覽器上方的標題，有點多餘但是又好像有用的設定，不改設'-1'
		floatRight:	文章列表靠右邊 (適合畫面解析度較小的人使用)

	======以上為各項設定說明
*/

(function(){
var defu=
{
	sort:		true,
	sortBy:		1,
	fixLink:	true,
	fixMenu:	true,
	easySearchBtn:	true,
	dateBtnLen:	3,
	mySearchBtn:	[],
	noSaveSearch:	true,
	showAllResult:	true,
	hideEmbed:	true,
	fixMarquee:	true,
	simplifyCSS:	true,
	timeoutRefresh:	true,
	hideAnno:	true,
	showHide:	true,
	autoReloadImg:	false,
	hideReply:	true,
	checkUpdate:	true,

	bgColor:	'black',
	title:		'洪爺',
	floatRight:	false
}


var u=new Object();
var setList=['b_sort','i_sortBy','b_fixLink','b_fixMenu','b_showAllResult','b_easySearchBtn','i_dateBtnLen','a_mySearchBtn','b_hideAnno','b_noSaveSearch','b_hideEmbed','b_showHide','b_autoReloadImg','b_hideReply','b_simplifyCSS','b_fixMarquee','b_timeoutRefresh','s_title','s_bgColor','b_floatRight'];
var sus;
var UW=unsafeWindow;
var doc=document;
var isLoad=false;
var getURL;
var open=unsafeWindow.open;
var myScriptId='64582';
var ctr;
var sw;
var isLoading=false;
var isb=(doc.getElementById('basessm')?true:false);
var URLcheck=doc.location.href.match(/http:\/\/[^\?]+bbs\/(.*\.pl)(.*)/i);

UW.doc=document;

if(doc.getElementById('PlugIn')==null && /\/post(show|list)\.pl\?/.test(document.location.href))
{
	var intervalID=setInterval('0',10);
	while(--intervalID>0)
	clearInterval(intervalID);
}

var iu;
for(iu in defu)	
u[iu]=defu[iu];

sus=GM_getValue('sus');
if(sus!=undefined)
{
	sus=sus.split('|');
	for(iu=0;iu<sus.length;iu++)
	{
		t=decodeURI(sus[iu]).match(/([abis])_([\w]+)=(.*)/);
		if(t)
		{
			switch(t[1])
			{
				case 'a':
				u[t[2]]=eval(t[3]);
				break;

				case 'b':
				u[t[2]]=(t[3]=='true'?true:false);
				break;

				case 'i':
				u[t[2]]=parseInt(t[3]);
				break;

				case 's':
				u[t[2]]=t[3];
				break;
			}
			
		}
	}
}

var yeah=function()
{
	var i,o,o1,t;

if(window.location=='http://userscripts.org/scripts/show/64582')
{
	var ver=myMeta.match(/\/\/ @version\s+([\d.]+)\s/)[1];
	o=doc.getElementById('summary');
	o1=doc.createElement('span');
	o.appendChild(o1);
	if(ver<o.innerHTML.match(/<b>version:<\/b>\s*([\d.]+)\s*/i)[1])
	{
		o1.innerHTML='<font style="font-weight:bold; color:#0066BB;">您使用中的版本: v'+ver+'</font>';
		doc.getElementsByClassName('userjs')[0].innerHTML='Update!';
	}
	else
	o1.innerHTML='<font style="font-weight:bold; color:#0066BB;">您正在使用最新版本</font>';

	return false;
}

if(/^http:\/\/(.*\.g00le\.net|174\.120\.243\.237)\/v2\.htm\?/.test(window.location))
{
	var url=document.baseURI;
	document.body.innerHTML='<center style="padding:30px"><img src="'+url.replace(/v2\.htm\?(?:[^&]+&)*u=([^&]+)&n=/,'users/$1/')+'"></center>';
	return false;
}

if(isb)
{
	o=doc.getElementsByTagName('body')[0];
	o1=doc.createElement('div');
	o.appendChild(o1);
	o1.setAttribute('style','position: absolute; top: 10pt; float:left; margin-left:5px; margin-top:10px;');
	o1.innerHTML='<a href="#" onclick="return false;" style="font-size:12px; color:#454545; text-decoration:none; background-color:white; border:1px solid gray; display:block; padding:2px 16px; line-height:1.5; -moz-border-radius:10px;">腳本設定</a>';
	o1.firstChild.addEventListener('click',showScriptSetting,false);

	changeLayout();

	if(u.noSaveSearch)
	doc.getElementById('kws').setAttribute('autocomplete','off');

	doc.getElementsByTagName('tbody')[1].parentNode.width='0px';
	GM_addStyle('table{white-space:nowrap;}');

	o1=doc.createElement('div');
	doc.getElementsByTagName('body')[0].appendChild(o1);
	o1.id='addSH';
	o1.innerHTML='&nbsp;'
	o1.setAttribute('style','position: absolute; left: 0px; top: 0px; height: 900px;');

	if(u.fixMenu)
	{
		o=doc.getElementById('thessm').childNodes[0].childNodes[0].childNodes[0];
		o.innerHTML=o.innerHTML.replace(/<th[^>]*>.*<\/th>/i,'');
		
		doc.getElementById('basessm').removeAttribute('style');
		o=doc.getElementById('thessm');
		o.removeAttribute('style');
		o.removeAttribute('onmouseover');
		o.removeAttribute('onmouseout');

		UW.moveBack=null;
		UW.moveOut=null;
		UW.moving=null;
		UW.moveBack1=null;
		UW.slideMenu=null;

		o=doc.getElementsByTagName('tbody')[1].parentNode;
		o.setAttribute('style','position:relative; z-index:1;');
		o.addEventListener('mouseover',function(){document.getElementById('basessm').style.zIndex='0'},false);
		o=doc.getElementById('basessm');
		o.setAttribute('style','position:absolute; left:3px; top:80px; z-index:0;');
		o.addEventListener('mouseover',function(){this.style.zIndex='2'},false);
		o.addEventListener('mouseout',function(){this.style.zIndex='0'},false);
	}

	if(u.easySearchBtn && u.dateBtnLen+u.mySearchBtn.length>0)
	{
		var newo,date;

		o=doc.getElementById('kws').parentNode.parentNode.parentNode;
		o1=doc.createElement('tr');
		o.appendChild(o1);
		o1.innerHTML='<td colspan="10" id="mybutton"></td>';
		o1=doc.getElementById('mybutton');
		o1.setAttribute('style','position:relative;');

		for(i=0;i<u.dateBtnLen+u.mySearchBtn.length;i++)
		{
			newo=doc.createElement('th');
			o1.appendChild(newo);
			newo.setAttribute('class','ST');
			newo.addEventListener('mouseover',function(){this.className='ST_IN';},false);
			newo.addEventListener('mouseout',function(){this.className='ST';},false);
			if(i<u.dateBtnLen)
			{
				date=getDateAdd((i-u.dateBtnLen+1));
				newo.innerHTML=date[0]+'-'+date[1];
				newo.setAttribute('style','width:45px;');
			}
			else
			newo.innerHTML=u.mySearchBtn[i-u.dateBtnLen];
			newo.addEventListener('click',function(){setSearchWord(this.innerHTML)},false);
		}
	}

	if(u.sort || u.fixLink)
	{
		var ttr=new Array(0);
		var count,olen;

		o=doc.getElementsByTagName('tbody')[6];

		count=0;
		olen=o.childNodes.length;

		for(i=1;i<olen;i++)
		{
			if(/TableRowElement/.test(o.childNodes[1]))
			{
				if(u.hideAnno && /\[公告\]/.test(o.childNodes[1].innerHTML))
				{
					o.removeChild(o.childNodes[1]);
					continue;
				}
				ttr[count++]=o.childNodes[1].innerHTML;
			}
			o.removeChild(o.childNodes[1]);
		}

		if(u.showAllResult && !/\[native code\]/.test(UW.back.toString()))
		{
			var pn;
			var url=UW.jp.toString().match(/["'](.*)&kws=/)[1]+'&kws='+doc.getElementById('kws').value+'&page=';
			var req=new window.XMLHttpRequest();
			var da;

			pn=doc.getElementsByTagName('select')[1].options;

			o1=doc.createElement('tr');
			o1.id='waitbox';
			o.appendChild(o1);
			o1.innerHTML='<td>所有搜尋結果下載中，請稍候...</td>';

			for(i=0;i<pn.length;i++)
			{
				if(pn[i].selected)
				continue;

				req.open('GET',url+pn[i].value,false);
				req.overrideMimeType('text/html; charset=big5');
				req.send(null);
				if(req.status==200)
				{
					da=req.responseText;
					t=da.match(/<tr>\s*<td class=B[\d][^>]*>[^]+?<\/tr>/g);
					if(t)
					{
						t=t.join('€§◎※●').replace(/<\/?tr>/g,'').split('€§◎※●');
						ttr=ttr.concat(t);
					}
				}
			}
			o.removeChild(o1);
		}

		if(u.sort)
		ttr=ttr.sort(mySorting)

		o1=doc.createElement('td');
		o1.setAttribute('class','AT');
		o1.setAttribute('width','30');
		o1.innerHTML='<b>No</b>';
		o.childNodes[0].insertBefore(o1,o.childNodes[0].childNodes[0]);

		window.setInterval(function(){UW.ChkAd1=999;},1000);
		if(!(ttr.length==1 && /<a><\/a>/.test(ttr[0])))
		{
			for(i=0,t=ttr.length;i<t;i++)
			{
				if(u.fixLink)
				ttr[i]=getTrueLink(ttr[i]);

				o1=doc.createElement('tr');
				o1.className='ttr';
				o.appendChild(o1);
				o1.innerHTML='<td class=B1 align=center>'+(i+1)+'</td>'+ttr[i];
			}
		}
		ctr=ttr;

		if(u.hideAnno)
		{
			o=doc.getElementById('thessm').getElementsByClassName('bbs_m_4')[6];
			o.innerHTML=o.innerHTML.replace('　　　　','<a href="./bs/postlist.pl?board=9_bbs" target="_top">站方公告</a>');
		}
	}

	if(u.floatRight)
	doc.getElementsByTagName('tbody')[1].parentNode.style.cssFloat='right';
}
else
{
	if(doc.body.innerHTML.indexOf('搜尋失敗')>=0 || doc.body.innerHTML.indexOf('瀏覽失敗')>=0)
	return false;

	var regex;

	changeLayout();

	if(u.hideReply && !doc.getElementById('oa'))
	{
		UW.hits=document.body.innerHTML.match(/(<table[^>]*><!--\/\/1 F\/\/-->(?:.*[\n])*)\s*[^"]*"to_msg/);
		if(UW.hits)
		{
			o=doc.getElementsByTagName('table');
			for(i=o.length-2;i>=3;i--)
			if(/<!--\/\/[\d]+ F\/\/-->/.test(o[i].innerHTML))
			{
				o1=o[i].getElementsByTagName('img');
				for(t=0;t<o1.length;t++)
				o1[t].src='http://';
				o[i].parentNode.removeChild(o[i]);
			}

			o=document.getElementsByName('to_msg')[0];
			o1=doc.createElement('div');
			o.parentNode.insertBefore(o1,o);
			o1.id='ob';
			o1.innerHTML='<table width="700" cellspacing="0" cellpadding="2" class="PG"><th onClick="document.getElementById(\'ob\').innerHTML=hits[1];" class="ST" onmouseover="this.className=\'ST_IN\'" onmouseout="this.className=\'ST\'">▼ 回應已被隱藏，顯示回應內容 ▼</th></tr></table>';
		}
	}

	if(u.hideEmbed)
	{
		o=doc.getElementsByTagName('embed');
		for(i=o.length-1;i>=0;i--)
		{
			if(/\.wmv$/i.test(o[i].src))
			continue;
			t=o[i].src.replace(/\?/g,'\\?').replace(/&/g,'&amp;').replace(/\./g,'\\.').replace(/\*/g,'\\*');
			regex=new RegExp('<embed[^>]*src=["\']?'+t+'["\']?[^>]*>','ig');
			hideEmbed(o[i],o[i].src.match(/http:\/\/([^\/]+)/)[1],o[i].parentNode.innerHTML.match(regex));
		}

		o=doc.getElementsByTagName('a');
		for(i=o.length-1;i>=0;i--)
		{
			if(/Adblock Plus/.test(o[i].title))
			o[i].parentNode.removeChild(o[i]);
		}
	}

	if(u.fixMarquee)
	{
		o=doc.getElementsByTagName('marquee');
		for(i=o.length-1;i>=0;i--)	
		{
			o1=doc.createElement('div');
			o1.innerHTML=o[i].innerHTML;
			o1.style.border='3px dotted gray';
			o1.style.overflow='auto';
			o[i].parentNode.insertBefore(o1,o[i]);
			o[i].parentNode.removeChild(o[i]);
		}
	}

	if(u.simplifyCSS)
	{
		doc.getElementsByTagName('tbody')[2].parentNode.style.removeProperty('opacity');
		doc.body.style.removeProperty('background-image');

		o=doc.getElementsByTagName('bgsound');
		for(i=o.length-1;i>=0;i--)
		o[i].parentNode.removeChild(o[i]);

		o=doc.getElementsByTagName('link');
		for(i=o.length-1;i>=3;i--)
		o[i].parentNode.removeChild(o[i]);

		o=doc.getElementsByTagName('style');
		for(i=o.length-1;i>=0;i--)
		o[i].parentNode.removeChild(o[i]);

		o=doc.getElementsByTagName('span');
		for(i=0;i<o.length;i++)
		{
			o[i].style.fontSize='12px';
			o[i].style.color='#454545';
			o[i].parentNode.style.width='';
		}

		o=doc.getElementsByTagName('tbody')[2].getElementsByTagName('font');
		for(i=1;i<o.length;i++)
		{
			o[i].color=o[i].color.replace(/#ffffff|white/i,'#555555');
			o[i].style.color=o[i].style.color.replace(/#ffffff|white/i,'#555555');
			if(/http:\/\//.test(o[i].innerHTML))
			{
				o[i].style.fontSize='16px';
				o[i].style.color='#333333';
				o[i].removeAttribute('color');
			}
		}

		o=doc.getElementsByTagName('tbody')[2].getElementsByTagName('div');
		for(i=2;i<o.length-1;i++)
		{
			o[i].style.width='';
			o[i].style.height='';
			o[i].style.background='';
		}

		o=doc.getElementsByTagName('tbody')[2].getElementsByTagName('img');
		for(i=o.length-1;i>=0;i--)
		{
			if(/^http:\/\/(www\.badongo\.com\/t\/|(bbs\.)?(bbs-tw|hung-ya)\.com\/(cgi-bin\/bbs|page)\/width=0)/.test(o[i].src))
			continue;
			
			o[i].style.width='';
			o[i].style.height='';
			o[i].removeAttribute('width');
			o[i].removeAttribute('height');
		}

		o=doc.getElementsByTagName('tbody')[2].getElementsByTagName('a');
		for(i=4;i<o.length-2;i++)
		if(o[i].getAttribute('href'))
		o[i].href=o[i].href.replace(/^http:\/\/(ad|blog)\.(porn104|g5ad)\.com\/(fdgo|d)\.php\?(url|dl)=http:\/\//,'http://');
	}

	if(u.autoReloadImg)
	{
		o=doc.getElementsByTagName('tbody')[2].getElementsByTagName('img');
		for(i=o.length-1;i>=0;i--)
		{
			o[i].setAttribute('ref','0');
			o[i].addEventListener('error',reloadImg,false);
		}
	}

	if(u.showHide)
	{
		var html=doc.getElementsByTagName('tbody')[2].innerHTML;

		if(/<div[^>]* style=['"]?[^>'"]*display:\s*none/gi.test(html))
		{
			var tid;
			var pst=doc.getElementsByTagName('tbody')[2].getElementsByTagName('font')[0].textContent;
			var objId=
			{
				'name_000':'奕醬|一招就夠了'
			};

			doc.getElementsByTagName('tbody')[2].addEventListener('click',function(evt)
			{
				if(evt.target.getAttribute('onclick'))
				{
					var evtId=evt.target.getAttribute('onclick').toString().match(/(?:\(['"])?([\w]+)(?:['"]\))?\.style\.display=/);
					if(evtId && UW.Copyright[evtId[1]])
					{
						var k,src,ottt;
						ottt=document.getElementById(evtId[1]).getElementsByTagName('img');
						if(document.getElementById(evtId[1]).style.display=='')
						{
							src=UW.Copyright[evtId[1]].split('◎');
							for(k=0;k<ottt.length;k++)
							ottt[k].src=src[k];
						}
						else
						{
							for(k=0;k<ottt.length;k++)
							ottt[k].src='http://';
						}
					}
				}
				
			},false);

			UW.Copyright=new Object();

			o=doc.getElementsByTagName('tbody')[2].getElementsByTagName('div');
			for(i=o.length-2;i>=2;i--)
			{
				if(o[i].id=='')
				continue;

				if(objId[o[i].id]!=undefined && (objId[o[i].id]=='' || !new RegExp(objId[o[i].id]).test(pst)))
				o[i].style.display='';
				else
				{
					t='';
					var j;
					o1=o[i].getElementsByTagName('img');
					for(j=0;j<o1.length;j++)
					{
						t+='◎'+o1[j].src;
						o1[j].src='http://';
					}
					if(t!='')
					UW.Copyright[o[i].id]=t.replace('◎','');
				}
			}
		}
	}
}

}	//end of yeah()

function setSearchWord(shw)
{
	doc.getElementById('kws').value=shw;
	UW.sch('0');
}

function mySorting(a,b)
{
	var regex,aa,bb,toInt=true;

	switch(Math.abs(u.sortBy))
	{
		case 1:
			regex=/([\d]{12,})\)?['"]/;
		break;
		case 2:
			regex=/<td[^>]*>(?:<font[^>]*>)?([\d]+)(?:<\/font>)?<\/td>/;
		break;
		case 3:
			regex=/<td[^>]*>(?:<font[^>]*>)?([\d]+)(?:<\/font>)?<\/td>\s*<td[^>]*center/;
		break;
		case 4:
			regex=/a><\/td>\s*<td[^>]*><font[^>]*>(.+)<\/font><\/td>/;
			toInt=false;
		break;
		default:
			regex=/onclick=['"]?[\w]+\(([\d]+)\)/i;
		break;
	}
	try
	{
		aa=a.match(regex)[1];
		bb=b.match(regex)[1];
	}
	catch(e)
	{
		return 0;
	}
	if(toInt)
	{
		aa=parseInt(aa,10);
		bb=parseInt(bb,10);
	}

	if(u.sortBy>=0)
	return aa>bb?-1:1;
	else
	return aa>bb?1:-1;
}

function hideEmbed(obj,domain,html)
{
	var tip;
	tip=doc.createElement('span');
	obj.parentNode.insertBefore(tip,obj);
	obj.parentNode.removeChild(obj);
	tip.innerHTML='<font title="點我顯示" style="color:gray; font-size:12px; cursor:pointer;">‧來自 '+domain+' 的嵌入物件已被隱藏，點我還原</font><textarea style="width:0px; height:0px; font-size:0px; visibility:hidden;">'+html[html.length-1]+'</textarea><font><br></font>';

	if(tip.firstChild.tagName=='FONT')
	tip=tip.firstChild;
	else
	tip=tip.firstChild.firstChild;

	tip.addEventListener('click',
	function()
	{
		if(this.title=='點我顯示')
		{
			this.title='點我隱藏';
			this.parentNode.lastChild.innerHTML='<br>'+this.nextSibling.value;
		}
		else
		{
			this.title='點我顯示';
			this.parentNode.lastChild.innerHTML='<br>';
		}
		this.innerHTML=this.innerHTML.replace(/(..)(...)(..)$/,'$3$2$1');
	},false);
}

function checkScriptUpdate()
{
	var ver=myMeta.match(/\/\/ @version\s+([\d.]+)\s/)[1];
	GM_xmlhttpRequest(
	{
		method:'GET',
		url:'http://userscripts.org/scripts/source/'+myScriptId+'.meta.js',
		onload:function(response)
		{
			if(response.status==200)
			{
				var gver=response.responseText.match(/\/\/ @version\s+([\d.]+)\s/)[1];
				if(ver==gver)
				alert('目前已是最新版本。');
				else if(ver>gver)
				alert('驚! 你的版本比 userscripts.org 的還新!');
				else
				if(confirm('有新版本: v'+gver+'\n您目前為: v'+ver+'\n\n要前往瀏覽新版本嗎? (以分頁開啟)'))
				GM_openInTab('http://userscripts.org/scripts/show/'+myScriptId);
			}
			else
			alert('無法確認更新，請稍後再試。');
		}
	});
}

function getDateAdd(add)
{
	var now=new Date(),setDay=new Date();
	var mon,day;

	setDay.setTime(now.getTime()+add*86400000);
	mon=setDay.getMonth()+1;
	day=setDay.getDate();
	mon=mon>9?mon:'0'+mon;
	day=day>9?day:'0'+day;

	return [mon,day];
}

function getTrueLink(data)
{
	try{return data.replace(/(\/postshow\.pl\?.+bnum=\d+)/,'$1&page=1');}
	catch(e){ return data; }
}

function reloadImg(evt)
{
	var img=evt.target;

	if(img.src=='http:///')
	return false;

	var errCnt=parseInt(img.getAttribute('ref'))+1;

	if(errCnt>3)
	{
		img.removeEventListener('error',reloadImg,false);
		img.setAttribute('alt','GM腳本:重新載入仍失敗');
		img.setAttribute('title','GM腳本:重新載入仍失敗');
	}

	img.setAttribute('ref',errCnt);
	evt.target.src=evt.target.src;
}

function changeLayout()
{
	if(u.title!='-1')
	doc.title=u.title;
	if(u.bgColor!='-1')
	doc.getElementsByTagName('body')[0].style.backgroundColor=u.bgColor;
}

function getSettingForm()
{
	return UW.document.gm || doc.forms.namedItem('gm').elements;
}

function showScriptSetting()
{
	var fo,html;

	html=	'<form name="gm"><div style="position:absolute; top:0px; left:0px; z-index:150; border: 2px solid #880000;"><table cellspacing="0" cellpadding="3" width="450">'+
		'<tr><td colspan="2" align="center" style="font-size:16px; color:navy; font-weight:bold;">HungYeah 腳本設定 (v'+myMeta.match(/\/\/ @version\s+([\d.]+)\s/)[1]+')</td></tr>'+
		'<tr><td width="55" valign="top"><b>文章列表</b></td><td>'+
		bi('checkbox','b_sort','文章排序')+
		'<br>'+bi('text','i_sortBy','排序依據','(1時間 2瀏覽 3回應 4作者，正數降冪負數升冪)',5)+
		'<br>'+bi('checkbox','b_fixLink','復原連結','(beta kerker)')+
		'<br>'+bi('checkbox','b_fixMenu','固定選單')+
		'<br>'+bi('checkbox','b_showAllResult','所有搜尋結果','(所有搜尋結果列在同一頁)')+
		'<br>'+bi('checkbox','b_easySearchBtn','日期搜尋按鈕','(即日期與自訂按鈕)')+
		'<br>'+bi('text','i_dateBtnLen','日期按鈕個數','(0~10個)',5)+
		'<br>'+bi('text','a_mySearchBtn','自訂搜尋按鈕','(以逗號隔開；空白則不設)',20)+
		'<br>'+bi('checkbox','b_hideAnno','隱藏公告','(選單的交易區會取代為公告區)')+
		'<br>'+bi('checkbox','b_noSaveSearch','不儲存搜尋字','(即不使用"自動完成功能"紀錄搜尋過的字)')+
		'<br></td></tr>'+
		'<tr><td valign="top"><b>文章內容</b></td><td>'+
		bi('checkbox','b_hideEmbed','隱藏嵌入物件')+
		'<br>'+bi('checkbox','b_showHide','顯示隱藏內容','(不顯示的將圖片取消預讀)')+
		'<br>'+bi('checkbox','b_autoReloadImg','自動重新讀取載入失敗的圖片','(重讀上限為3次)')+
		'<br>'+bi('checkbox','b_hideReply','隱藏回應')+
		'<br>'+bi('checkbox','b_simplifyCSS','簡化樣式','(將畫面盡量簡約)')+
		'<br>'+bi('checkbox','b_fixMarquee','固定跑馬燈')+
		'<br>'+bi('checkbox','b_timeoutRefresh','無回應重新整理')+
		'<br></td></tr>'+
		'<tr><td valign="top"><b>版面配置</b></td><td>'+
		bi('text','s_title','標題:','(設-1則不修改)')+
		'<br>'+bi('text','s_bgColor','背景顏色','空白則不改變背景顏色',10)+
		'<br>'+bi('checkbox','b_floatRight','文章列表靠右','(預設false，適合較小的顯示器使用)')+
		'<br></td></tr>'+
		'<tr><td colspan="2" align="center">'+(u.checkUpdate?'<input type="button" value="檢查更新" name="chkUpdate">　':'')+'<input type="button" value="預設" name="def">　<input type="button" value="儲存" name="ok">　<input type="button" value="取消" name="cancel"></td></tr>'+
		'</table></div></form>';
	doc.getElementById('FloatPAGE').innerHTML=html;
	fo=getSettingForm();
	if(u.checkUpdate)
	fo.chkUpdate.addEventListener('click',checkScriptUpdate,false);
	fo.ok.addEventListener('click',setScriptSetting,false);
	fo.def.addEventListener('click',function(){setSettingValue(defu)},false);
	fo.cancel.addEventListener('click',function(){document.getElementById('FloatPAGE').innerHTML='';},false);
	setSettingValue(u);
	doc.getElementById('FloatPAGE').style.display='';
}

function bi(type,name,w1,w2,size)
{
	return w1+'：<input type="'+type+'" name="'+name+'"'+(size==undefined?'':' size="'+size+'"')+'> '+(w2==undefined?'':'<font color="gray">'+w2+'</font>');
}

function setSettingValue(gu)
{
	var fo,fot,k;

	fo=getSettingForm();
	for(k=0;k<setList.length;k++)
	{
		if(fo[setList[k]]==undefined)
		continue;

		fot=setList[k].split('_');
		switch(fot[0])
		{
			case 'a':
			if(gu[fot[1]]!='[]')
			fo[setList[k]].value=gu[fot[1]];
			break;

			case 'b':
			fo[setList[k]].checked=gu[fot[1]];
			break;

			case 'i':
			fo[setList[k]].value=gu[fot[1]];
			break;

			case 's':
			fo[setList[k]].value=gu[fot[1]];
			break;
		}
	}
}

function setScriptSetting()
{
	var fo,fot,k,setVal,count;

	fo=getSettingForm();
	setVal=new Array();
	count=0;
	for(k=0;k<setList.length;k++)
	{
		fot=setList[k].split('_');
		switch(fot[0])
		{
			case 'a':
			if(fo[setList[k]].value!='')
			setVal[count++]=encodeURI(setList[k]+'='+('[\''+fo[setList[k]].value.replace(/'/g,'\\\'').replace(/,/g,'\',\'')+'\']'));
			break;

			case 'b':
			if(fo[setList[k]].checked!=defu[fot[1]])
			setVal[count++]=encodeURI(setList[k]+'='+(fo[setList[k]].checked?'true':'false'));
			break;

			case 'i':
			if(fot[1]=='dateBtnLen' && !/^(10|\d)$/.test(fo[setList[k]].value))
			{
				alert('按鈕數量為0~10個');
				fo[setList[k]].focus();
				return false;
			}
			else if(fot[1]=='sortBy' && !/^-?[1234]$/.test(fo[setList[k]].value))
			{
				alert('請輸入正負1~4\n\n排序依據為: 1時間 2瀏覽 3回應 4作者，正數降冪負數升冪\n例如要以回應數少到多排序，設-3');
				fo[setList[k]].focus();
				return false;
			}
			if(parseInt(fo[setList[k]].value)!=defu[fot[1]])
			setVal[count++]=encodeURI(setList[k]+'='+fo[setList[k]].value);
			break;

			case 's':
			if(fo[setList[k]].value!=defu[fot[1]])
			setVal[count++]=encodeURI(setList[k]+'='+fo[setList[k]].value);
			break;
		}
	}
	GM_setValue('sus',setVal.join('|'));
	document.getElementById('FloatPAGE').innerHTML='';
	self.location=self.location;
}

function run()
{
	if(URLcheck && (/^(add|chat|member|reg|replay)\.pl$/i.test(URLcheck[1]) || /[\?&]board=(8_vip|9_bbs)(&|$)/i.test(URLcheck[2])))
	return false;

	if(doc.getElementById('PlugIn') && UW.CheckPostNameSatus==undefined)
	{
		window.setTimeout(run,100);
		return false;
	}

	if(doc.getElementById('PlugIn'))
	{
		var intervalID=setInterval('0',10);
		while(--intervalID>0)
		clearInterval(intervalID);

		UW.alert=UW.alert_Old;
		UW.GoodView=function(s){void(0);};

		var k,tania;
		if(doc.getElementById('ShowImage'))
		{
			
			tania=doc.getElementById('ShowImage').parentNode;
			tania.removeChild(doc.getElementById('ShowImage'));
			for(k=0;k<UW.ImagePlayArray.length;k++)
			{
				tania.appendChild(doc.createElement('br'));
				tania.appendChild(UW.ImagePlayArray[k]);
				tania.appendChild(doc.createElement('br'));
			}
		}

		tania=doc.getElementsByClassName('PG');
		for(k=0;k<tania.length;k++)
		if(tania[k].tagName=='TABLE')
		tania[k].removeAttribute('style');

		tania=doc.getElementsByClassName('PM');
		for(k=0;k<tania.length;k++)
		tania[k].removeAttribute('style');

		doc.getElementById('PlugIn').innerHTML='<font style="color:gray; font-weight:bold;">Tania plug-in</font>';
		doc.getElementById('PlugIn').removeAttribute('style');
	}

	if((doc.getElementById('FloatPAGE')) || isLoad)
	yeah();
	else if(u.timeoutRefresh && UW.initPage && UW.getErrorCode()=='netTimeout')
	self.location=self.location;
	else
	window.setTimeout(run,100);
}

if(doc.getElementById('PlugIn') && doc.getElementById('PlugIn').getAttribute('fixed')==null)
{
	var tania;
	if(doc.getElementById('CSS'))
	doc.getElementById('CSS').removeAttribute('id');

	if((tania=doc.getElementById('ImgPlay')))
	{
		tania.parentNode.insertBefore(doc.createElement('span'),tania);
		tania.previousSibling.innerHTML='<br><font style="color:gray; font-size:16px;">‧下方<b>Tania幻燈片特效</b>已被替換為直接貼圖</font><br><br>';
		tania.className='ImageUrl';
		tania.title='300';
		tania.tabIndex=2;
		tania.removeAttribute('id');
	}

	doc.getElementById('PlugIn').setAttribute('fixed','1');
}

run();

window.addEventListener('load',function(){isLoad=true;},false);

})();