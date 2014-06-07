// ==UserScript==
// @name 4chan Get Watcher
// @version 2014.05.08
// @include *//boards.4chan.org/*
// @grant GM_xmlhttpRequest
// @updateURL http://kek.3space.info/getwatcher.user.js
// ==/UserScript==
boards=['3','a','adv','an','asp','b','biz','c','cgl','ck','cm','co','d','diy','e','f','fa','fit','g','gd','gif','h','hc','hm','hr','i','ic','int','jp','k','lgbt','lit','m','mlp','mu','n','o','out','p','po','pol','r','r9k','s','s4s','sci','soc','sp','t','tg','toy','trv','tv','u','v','vg','vp','vr','w','wg','wsg','x','y']

gtl=move=chl=0
bkw=-1
function getstats(maxnum){
	clrget=gsbrd=='b'||gsbrd=='v'||gsbrd=='vg'||document.getElementById('clrch').checked
	if(lastp.length<maxnum){
		nextp=clrget?1+''+(('1E'+(maxnum-1))*1).toString().replace(/./g,0):(('1E'+(maxnum-1))*1).toString().replace(/./g,1)
		prevp=0
	}else{
		if(document.getElementById("palin").checked){
			nextp=nexpal(lastp)
			prevp=nexpal(lastp,1)
		}else{
			nextp=clrget?
				(lastp.slice(0,lastp.length-maxnum)*1+1)+''+lastp.slice(-maxnum).replace(/./g,0)
			:
				lastp.slice(0,lastp.length-maxnum)+''+lastp.slice(-maxnum).replace(/./g,lastp.charAt(lastp.length-maxnum))
			prevp=clrget?
				lastp.slice(0,lastp.length-maxnum)+''+lastp.slice(-maxnum).replace(/./g,0)
			:
				lastp.slice(0,lastp.length-maxnum)+''+lastp.slice(-maxnum).replace(/./g,lastp.charAt(lastp.length-maxnum)-1)
			if(nextp-lastp<0){
				nextp=clrget?
					(lastp.slice(0,lastp.length-maxnum)*1+2)+''+lastp.slice(-maxnum).replace(/./g,0)
				:
					lastp.slice(0,lastp.length-maxnum)+''+lastp.slice(-maxnum).replace(/./g,lastp.charAt(lastp.length-maxnum)*1+1)
				prevp=clrget?
					lastp.slice(0,lastp.length-maxnum)+''+lastp.slice(-maxnum).replace(/./g,0)
				:
					lastp.slice(0,lastp.length-maxnum)+''+lastp.slice(-maxnum).replace(/./g,lastp.charAt(lastp.length-maxnum))
			}
		}
	}
	if(!gtl){
		document.getElementById("uistats").innerHTML="The recent get for "+("s4s"==gsbrd?"[s4s]":"/"+gsbrd+"/")+' was: <a href="https://sys.4chan.org/'+gsbrd+"/imgboard.php?res="+prevp*1+'" style="font-weight:bold">'+prevp*1+'</a><br>Which happened <span style="font-weight:bold">'+(lastp-prevp)+'</span> posts ago<br><br>The next get is: <span style="font-weight:bold">'+nextp+'</span><br>Which will happen in <span style="font-weight:bold">'+(nextp-lastp)+'</span> posts<br><br>The current post is <span style="font-weight:bold">'+lastp+"</span>"
	}
}

function nexpal(inn,prev){
	ins=(inn+'').split('')
	inlen=ins.length
	if(inn==(('1E'+(ins.length-1))*1).toString().replace(/./g,9))
		return ('1'+(('1E'+(ins.length-2))*1).toString().replace(/./g,0)+'1')
	else{
		uu=inlen/2==Math.floor(inlen/2)?1:0
		inl=uu?inlen/2:inlen/2-.5
		for(i=0;i-1<inl;i++)
			ins[inl+i]=ins[inl-i-uu]
		if((!prev&&inn>ins.join(''))||(prev&&inn<ins.join(''))){
			if(ins[inl]==prev?0:9){
				for(hi=0;ins[inl+hi]==(prev?0:9);hi++)
					ins[inl+hi]=ins[inl-hi-uu]=prev?9:0
				ins[inl-hi-uu]=ins[inl+hi]=ins[inl+hi]-(prev?1:-1)
			}else
				ins[inl]=ins[inl-uu]=ins[inl]-(prev?1:-1)
		}
		return ins.join('')
	}
}

function getspeed(brd,maxnum){
	GM_xmlhttpRequest({
	method:'GET',
	url:'https://a.4cdn.org/'+brd+'/1.json',
	onload:function(response){
	if(response.status==200){
		jsonobj=JSON.parse(response.responseText);
		arry=[];
		arrz=[];
		for(iie=0;iie<jsonobj.threads.length;iie++)
			for(iif=0;iif<jsonobj.threads[iie].posts.length;iif++){
				arry.push(jsonobj.threads[iie].posts[iif].no);
				arrz.push(jsonobj.threads[iie].posts[iif].time);
			}
		lastp=Math.max.apply(Math,arry).toString();
		lastt=Math.max.apply(Math,arrz).toString();
		gsbrd=brd;
		getstats(maxnum);
		if(chl&&chd){
			getspeed3()
		}else{
			getspeed2()
		}
	}}})
}

function getspeed2(){
	setTimeout(function(){
		GM_xmlhttpRequest({
		method:'GET',
		url:'https://a.4cdn.org/'+gsbrd+'/threads.json',
		onload:function(response){
		if(response.status==200){
			jsn=JSON.parse(response.responseText);
			getspeed3()
		}}})
	},document.getElementById('uidelay').value*1000)
	if(chl){
		chd=1
	}
}

function getspeed3(){
	lwr=jsn[jsn.length-1].threads[jsn[jsn.length-1].threads.length-1]
	lmd=lwr.last_modified
	lno=lwr.no
	pps=(lastp-lno)/(lastt-lmd);
	ftim=otim=tim=(nextp-lastp)/pps;
	tiug=''
	why=2
	while(why){
		if(tim>31557600){
			unit='year'
			dib=31557600
		}else if(tim>2629800){
			unit='month'
			dib=2629800
		}else if(tim>86400){
			unit='day'
			dib=86400
		}else if(tim>3600){
			unit='hour'
			dib=3600
		}else if(tim>60){
			unit='minute'
			dib=60
		}else{
			unit='second'
			tim=Math.floor(tim)
			tiug+='<span style="font-weight:bold">'+tim+'</span> '+(tim==1?unit:unit+'s')+'<br>'
			break
		}
		tim/=dib
		tim=Math.floor(tim)
		tiug+='<span style="font-weight:bold">'+tim+'</span> '+(tim==1?unit:unit+'s')+'<br>'
		ftim=tim=ftim-tim*dib
		why--
	}
	tist=new Date(lastt*1000+Math.floor(otim*1000))
	tiug+=tist.getFullYear()+'-'+(tist.getMonth()+1)+'-'+tist.getDate()+' at '+tist.toLocaleTimeString()+'<br>'
	if(gtl){
		gum.push([gsbrd,nextp,otim,nextp-lastp])
		allsort(2,1)
	}else{
		ppss=(gsbrd=='b'||gsbrd=='v'||gsbrd=='vg')?pps-pps/901:pps
		document.getElementById("uispeed").innerHTML='Board speed:<br><span style="font-weight:bold">'+Math.floor(ppss*100)/100+'</span> posts per second<br>1 post per <span style="font-weight:bold">'+Math.floor(1/ppss*100)/100+'</span> seconds<br><br>Time until get:<br>'+tiug
	}
	if(gtl&&aln<boards.length){
		setTimeout(function(){getall(gsmaxnum)},document.getElementById('uidelay').value*1000)
	}
}

function getall(maxnum){
	if(gtl){
		aln++
		gsmaxnum=maxnum
		if(boards[aln]){
			getspeed(boards[aln],maxnum)
		}
	}
	if(aln>=boards.length||!boards[aln]||!gtl){
		gtl=0;
		jsn=null;
		document.getElementById('uinumber').disabled=false;
		document.getElementById('uicha').disabled=false;
		document.getElementById('uichd').disabled=false;
		document.getElementById('uichc').style.display='none';
		document.getElementById('uichb').style.display='inline-block';
	}
}

function allsort(byw,nbk){
	gam=bkw!=byw||nbk?gum.sort(function(a,b){
		return a[byw]>b[byw]?1:-1;
	}):gum.sort(function(a,b){
		return a[byw]<b[byw]?1:-1;
	})
	bkw=bkw!=byw||nbk?byw:-1
	gat='<table style="margin:0;border-color:transparent" border="3"><tr><td style="cursor:pointer;font-weight:bold" id="gg0">Board</td><td style="font-weight:bold">Next get</td><td style="cursor:pointer;font-weight:bold" id="gg2">Happens in</td><td style="cursor:pointer;font-weight:bold" id="gg3">Posts left</td></tr>'
	for(gai=0;gai<gam.length;gai++){
		if(gam[gai][2]>31557600){
			unit='year'
			tim=gam[gai][2]/31557600
		}else if(gam[gai][2]>2629800){
			unit='month'
			tim=gam[gai][2]/2629800
		}else if(gam[gai][2]>86400){
			unit='day'
			tim=gam[gai][2]/86400
		}else if(gam[gai][2]>3600){
			unit='hour'
			tim=gam[gai][2]/3600
		}else if(gam[gai][2]>60){
			unit='minute'
			tim=gam[gai][2]/60
		}else{
			unit='second'
		}
		gat+='<tr><td style="font-weight:bold">'+("s4s"==gam[gai][0]?"[s4s]":"/"+gam[gai][0]+"/")+'</td><td style="text-align:right">'+gam[gai][1]+'</td><td style="text-align:right">(in '+Math.floor(tim*2)/2+' '+(Math.floor(tim*2)/2==1?unit:unit+'s')+',</td><td>'+gam[gai][3]+' post'+(gam[gai][3]==1?'':'s')+')</td></tr>'
	}
	document.getElementById("uistats").innerHTML=gat+'</table>'
	document.getElementById("gg0").addEventListener("mousedown",function(){allsort(0)})
	document.getElementById("gg2").addEventListener("mousedown",function(){allsort(2)})
	document.getElementById("gg3").addEventListener("mousedown",function(){allsort(3)})
}

function moveHandler(e){
	move&&(
		startX=parseInt(e.clientX),
		startY=parseInt(e.clientY),
		uiroot.style.left=(startX>250?startX-250:0)+"px",
		uiroot.style.top=(startY>15?startY-15:0)+"px"
	)
}

function chloop(brd,maxnum){
	if(chl){
		getspeed(brd,maxnum)
		setTimeout(function(){chloop(brd,document.getElementById('uinumber').value)},document.getElementById('uidelay').value*1000)
	}else{
		document.getElementById('uicha').disabled=false;
		document.getElementById('uichb').disabled=false;
		document.getElementById('uichd').disabled=false;
		document.getElementById('uiche').style.display='none';
		document.getElementById('uichd').style.display='inline-block';
	}
}

uiopener=document.createElement('a')
uiopener.setAttribute('style','position:absolute;top:100px;left:10px;cursor:pointer')
uiopener.innerHTML='Open Get Watcher'
document.body.appendChild(uiopener)
uiopener.addEventListener('mousedown',function(){uiroot.style.display='block'})
uiroot=document.createElement('div')
uiroot.setAttribute('style','position:fixed;display:none;top:100px;left:100px;width:500px;height:350px;background:#fff;border:1px solid #333;z-index:2;color:#000')
uiroot.innerHTML='<div style="height:25px;background:#bbb;padding:5px 0 0 5px;color:#555;cursor:default" id="uititle">Get Watcher</div><div style="background:#d77;width:20px;height:20px;position:absolute;top:6px;right:6px" id="uiclose"></div><div style="background:#eee;border-bottom:1px solid #999;padding:3px">Select board: <select id="uiselect"></select><br>Digits: <input type="number" id="uinumber" value="5" min="2" max="9" style="width:50px"> Clear get: <input type="checkbox" id="clrch"> | Palindrome get: <input type="checkbox" id="palin"> | Delay (seconds): <input type="number" id="uidelay" value="1" min="1" max="99" style="width:50px"><br><input type="button" value="This board" id="uicha"><input type="button" value="All boards" id="uichb"><input type="button" value="Cancel" id="uichc" style="display:none"><input type="button" value="Loop" id="uichd"><input type="button" value="Cancel" id="uiche" style="display:none"></div><div style="overflow:auto;padding:3px;height:224px"><div id="uispeed" style="float:right"></div><div id="uistats"></div></div>'
document.body.appendChild(uiroot)
document.getElementById('uiclose').addEventListener('mousedown',function(){uiroot.style.display='none'})
document.getElementById('uinumber').addEventListener('change',ocun)
document.getElementById('clrch').addEventListener('change',ocun)
document.getElementById('palin').addEventListener('change',ocun)
function ocun(){
	if(jsn){
		getstats(document.getElementById('uinumber').value);
		getspeed3()
	}
}
document.getElementById('uicha').addEventListener('mousedown',function(){getspeed(document.getElementById('uiselect').value,document.getElementById('uinumber').value)})
document.getElementById('uichb').addEventListener('mousedown',function(){
	document.getElementById('uistats').innerHTML='';
	document.getElementById('uispeed').innerHTML='';
	aln=-1;
	gtl=1;
	gum=[];
	document.getElementById('uinumber').disabled=true;
	document.getElementById('clrch').disabled=true;
	document.getElementById('palin').disabled=true;
	document.getElementById('uicha').disabled=true;
	document.getElementById('uichd').disabled=true;
	document.getElementById('uichb').style.display='none';
	document.getElementById('uichc').style.display='inline-block';
	getall(document.getElementById('uinumber').value)
})
document.getElementById('uichc').addEventListener('mousedown',function(){
	gtl=0;
	jsn=null;
	document.getElementById('uinumber').disabled=false;
	document.getElementById('clrch').disabled=false;
	document.getElementById('uicha').disabled=false;
	document.getElementById('uichd').disabled=false;
	document.getElementById('uichc').style.display='none';
	document.getElementById('uichb').style.display='inline-block';
})
document.getElementById('uichd').addEventListener('mousedown',function(){
	chl=1;
	chd=0;
	document.getElementById('uicha').disabled=true;
	document.getElementById('uichb').disabled=true;
	document.getElementById('uichd').style.display='none';
	document.getElementById('uiche').style.display='inline-block';
	chloop(document.getElementById('uiselect').value,document.getElementById('uinumber').value)
})
document.getElementById('uiche').addEventListener('mousedown',function(){
	chl=0;
	document.getElementById('uicha').disabled=false;
	document.getElementById('uichb').disabled=false;
	document.getElementById('uiche').style.display='none';
	document.getElementById('uichd').style.display='inline-block';
	
})
document.getElementById('uititle').addEventListener('mousedown',function(){move=1;moveHandler(event)})
document.body.addEventListener('mousemove',function(){moveHandler(event)})
document.addEventListener('mouseup',function(){move=0})
for(iid=0;iid<boards.length;iid++)
	uiopt=document.createElement("option"),
	boards[iid]==location.pathname.match(/\/[^\/]+\//)[0].replace(/\//g,"")&&
	uiopt.setAttribute("selected","selected"),
	uiopt.innerHTML="s4s"==boards[iid]?"[s4s]":"/"+boards[iid]+"/",
	uiopt.value=boards[iid],
	document.getElementById("uiselect").appendChild(uiopt)