// ==UserScript==
// @name           Downbili_Chrome
// @namespace      http://www.bilibili.tv
// @include        http://www.bilibili.tv/video/*
// @version	0.9.0
// ==/UserScript==
//
//
//Probmatic page:
//Suitable for Chrome & Opera
//6cn 403 error
//http://www.bilibili.tv/video/av80617/
//http://www.bilibili.tv/video/av88060/
var loadScript=function(){
if (typeof(unsafeWindow.jQuery)=='undefined')
{
	window.setTimeout(loadScript,500);
}
else
{
	$=unsafeWindow.jQuery;
	main();
}
}
loadScript();
function main()
{
	$().ready(function(){
	//ykid is request video id sending to Youku.com
	//request form(http://v.youku.com/player/getPlayList/VideoIDS/ ykid /)
	//Vid is the video id of Sina video, which has possibility being cached by bilibili (request format(v.iask.com/v_play.php?vid=59129758&r=0.8661000))
	//UI is the video id of Tudou
	//Request form(http://v2.tudou.com/v?it=78429142&pw=&ui=0&refurl=http%3A%2F%2Fwww%2Etudou%2Ecom%2Fprograms%2Fview%2F UID %2F&si=sp&st=1%2C2%2C3%2C4%2C99&vn=02&hd=1&noCache=8108)

	Array.prototype.remove = function(from, to) {
	   var rest = this.slice((to || from) + 1 || this.length);
	   this.length = from < 0 ? this.length + from : from;
	   return this.push.apply(this, rest);
	};
	function callGM(params){
		setTimeout(function()
		{
			 GM_xmlhttpRequest(params);
		},0);	
	}
	function tudouVideo(controller,uid){
		this.uid=uid;
		this.controller=controller;
		this.infoBase='http://v2.tudou.com/v?it=83000389&pw=&ui=0&refurl=http%3A%2F%2Fwww%2Etudou%2Ecom%2Fprograms%2Fview%2F'+
		this.uid+
		'%2F&si=sp&st=1%2C2%2C3%2C4%2C99&vn=02&hd=1&noCache=1170';
		this.requestInfo();
	}
	tudouVideo.prototype={
	requestInfo:function(){
		var c=this.controller;
		var t=this;
		c.opener({
		url:t.infoBase,
		method:'GET',
		onload:function(r){
			t.info=$($.parseXML(r.responseText));
			c.links=[];
			var tempNodes=t.info.find('f');
			for(var i=0;i<tempNodes.length;i++)
			{
				c.links.push($(tempNodes[i]).text());
			}
			c.refreshDownDiv();
		}
		});
	}
	}
	function sinaVideo(controller,vid){
		this.controller=controller;
		this.vid=vid;
		this.infoBase='http://v.iask.com/v_play.php?vid='+vid;
		this.usLocal='http://';
		this.requestInfo();

		
	}
	sinaVideo.prototype={
	requestInfo:function(){
		var c=this.controller;
		var s=this;
		c.opener({
		url:this.infoBase,
		method:'GET',
		onload:function(r){
			s.info=$($.parseXML(r.responseText));
			c.links=[];
			var tempNodes=s.info.find('url');
			s.nodeCount=tempNodes.length;
			for(var i=0;i<tempNodes.length;i++)
			{
				c.links.push($(tempNodes[i]).text());
			}
				c.refreshDownDiv();

		}
		});
	},
	testBiliUs:function(){
		var c=this.controller;
		var s=this;			
		var serverNum=Math.floor(Math.random()*5)+1;
		var addr='http://v'+serverNum+'.bilibili.tv/'+this.vid+'-0.hlv';		
		c.opener({
		url:addr,
		method:'HEAD',
		onload:function(r)
		{
			var headers=r.responseHeaders;
			var ctype=kk.match(/Content-Type.*?\n/)[0].split(':')[1].trim();
			if (ctype=='video/x-flv')
			{
				c.links=[];
				for(var i=0;i<s.nodeCount;i++)
				{
					c.links.push('http://v'+serverNum+'.bilibili.tv/'+this.vid+'-'+i+'.hlv');
				}
					c.refreshDownDiv();

			}
		}
		})
	}
	}
	function youkuVideo(controller,uid){
	//Controller is the instance of a biliVideo Object
	this.uid=uid;
	this.controller=controller;
	this.infoBase='http://v.youku.com/player/getPlayList/VideoIDS/'+uid;
	this.downBase='http://f.youku.com/player/getFlvPath/';
	this.sid=this.getSid();
	this.requestInfo();
	}
	youkuVideo.prototype={
	getSid:function(){
	var timestamp=Number(new Date());
	var random1=1000+Math.floor(Math.random()*999);
	var random2=1000+Math.floor(Math.random()*9000);
	return String(timestamp)+String(random1)+String(random2);
	},
	getMixedString:function(seed){
		var mixed=[];
		var source="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/\\:._-1234567890".split('');
		var seed=parseFloat(seed);
		var index=0;
		var len=source.length;
	for(var i=0;i<len;i++)
	{
		seed= (seed * 211 + 30031 ) % 65536;
		index = Math.floor((seed / 65536) * source.length )
		mixed.push(source[index]);
		source.remove(index);
	}
	return mixed
	},
	generateFileId:function(seed,fileId){
	var mixed=this.getMixedString(seed);
	var ids=fileId.split('*');
	var realId=[];
	for(var i=0;i<ids.length;i++)
	{
		if(ids[i])
		{
			var ch=parseInt(ids[i])
			realId.push(mixed[ch]);	
		}
	}
	return realId.join('');
	},
	requestInfo:function()
	{
		var c=this.controller;
		var y=this;
		c.opener(
		{
		url:this.infoBase,
		method:'GET',
		onload:function(r){
			//unsafeWindow.info=JSON.parse(r.responseText);
			
			var text=JSON.parse(r.responseText);
			c.links=[];
			y.realId=y.generateFileId(text.data[0].seed,text.data[0].streamfileids.mp4);
			y.segs=text.data[0].segs.mp4;
			/*http://f.youku.com/player/getFlvPath/sid/00_00/st/flv/fileid/03000104034E4F1D4FB22C004861ABF82FD867-A156-BCC6-7B2A-9E53AB92890B?K=1ecd96237e1a52a92410b5dd
			'03000104034E4F1D4FB22C004861ABF82FD867'.indexOf(10) refers to the part of Video
			For instance:Part3(from 0)-'03000104034E4F1D4FB22C004861ABF82FD867',Part2-'03000104024E4F1D4FB22C004861ABF82FD867',Part0-'03000104004E4F1D4FB22C004861ABF82FD867'
			*/
			for(var i=0;i<y.segs.length;i++)
			{
				var realId=y.realId.split('');
				realId[9]=i;
				realId=realId.join('');
				c.links.push(y.downBase+'sid/00_00/st/mp4/fileid/'+realId+'?K='+y.segs[i].k);
			}
				c.refreshDownDiv();

		}
		}
		);
	},
	}
	biliVideo=function()
	{
	
		this.init();
	}
	biliVideo.prototype={
	init:function()
	{
	if ($('embed').length>0)
	{
		var flashid=$('embed').attr('flashvars');
		var flag=flashid.split('=');
		var flagName=flag[0];
		var flagValue=flag[1];
		if (flagName == 'uid')
		{
			this.type='tudou';
				var c=this;
				this.tdVideo=new tudouVideo(c,flagValue);
		}
		else if(flagName=='ykid')
		{
				this.type='youku';
				var c=this;
				this.ykVideo=new youkuVideo(c,flagValue);
		}
		else if(flagName=='vid')
		{
				this.type='sina';
				var c=this;
				this.snVideo=new sinaVideo(c,flagValue);
		}
		else if(flagName=='id')
		{
				this.type='6cn';
				this.addr=flag[flag.length-1];
		}
	}
	else if($('iframe[src*="secure.bilibili"]').length>0)
	{
		var addr=$('iframe[src*="secure.bilibili"]')[0].src;		
		var qid=addr.match(/qid=(.*)/);
		this.type= qid ? 'qq' : '6cn' ;
		if(qid)
		{
			this.addr='https://secure.bilibili.tv/offsite,'+qid[1];
		}
		else
		{
			var rid=addr.match(/rid=(.*)/)[1]
			this.addr='https://secure.bilibili.tv/offsite,'+rid;
		}
	}
	if(this.type)
	{
		var insertPoint=$('.tagcontainer');
		var tempNode=$('<div id="downDiv"></div>');
		if(this.addr)
		{
			tempNode.append('<a href="'+this.addr+'">Download</a><br/>');
			insertPoint.after(tempNode);
		}
		else 
		{
			tempNode.append('<input id="showDownLink" type="button" value="Download"/>');
			insertPoint.after(tempNode);
			$('#showDownLink').click(function(){
				$('.dlink').toggle('slide');
			});
			/*
			for(var i=0;i<this.links.length;i++)
			{
				tempNode.append('<a class="dlink" href="'+this.links[i]+'">'+this.links[i]+'</a>');
			}
			insertPoint.after(tempNode);
			$('.dlink').css('display','none');
			*/
		}
	}
	},
	refreshDownDiv:function(){
			var tempNode=$('#downDiv');
			for(var i=0;i<this.links.length;i++)
			{
				tempNode.append('<br/><a class="dlink" href="'+this.links[i]+'">Part'+i+'</a>');
			}
			$('.dlink').css('display','none');
	},
	opener:function(params){
		callGM(params);
		}
	};

	unsafeWindow.biliVideo=new biliVideo();
	//unsafeWindow.bb=biliVide();
	});
}
