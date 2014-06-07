// ==UserScript==
// @name           Travian Gestione Risorse by M93
// @namespace      travian_help
// @include        http://*.travian.*/*
// @exclude        http://*.travian.*/manual.php*
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

function w(html){
	document.getElementById('sright').innerHTML+=html;
}

function wbox(title,html,m){
	if(typeof(m)=='undefined'){
		w('<div class="th-box"><h1>'+title+'</h1>'+html+'</div>');
	}else{
		m.innerHTML+='<div class="th-box"><h1>'+title+'</h1>'+html+'</div>';
	}
}

/* MATH FUNCTIONS */
function percentualedi(cif,tot){
	return Math.floor(cif/tot*100);
}

function getTimeToOverflow(res){
	var rem=res[2]-res[1];
	var time=rem/res[0]*3600;
	return Math.floor(time);
}

function getTimeToTarget(res,targ){
	var rem=targ-res[1];
	var time=rem/res[0]*3600;
	return Math.floor(time);
}

function time2date(time){
	var td=new Date(time*1000);
	var h=td.getHours();
	var m=td.getMinutes();
	var s=td.getSeconds();
	if(h<10){
		h="0"+h;
	}
	if(m<10){
		m="0"+m;
	}
	if(s<10){
		s="0"+s;
	}
	return h+':'+m+':'+s;
}

/* INNER TRAVIAN */
function getResourceInfo(){
	var resource=new Array();
	for(var i=1;i<=4;i++) {
		var rtd  = document.getElementById("l"+i);
		if(!rtd) return;
		resource.push( [parseInt(rtd.title),parseInt(rtd.textContent.match(/\-?(\d+)\//)),parseInt(rtd.textContent.replace(/(\d+)\//,""))] );
	}
	return resource.reverse();
}

function getResourcePerBuild(i){
	if(typeof(i)=='undefined'){ var i=0;}
	var txt=document.getElementsByClassName('required')[i].textContent;
	txt=txt.split('|');
	var arr=[];
	for(i=0;i<txt.length;i++){
		// OLD MATHOD
		// arr.push(txt[i].split('	')[15]);
		var match0=txt[i].match(/(.*?)([0-9]{1,15})(.*?)/i);
		arr.push(match0[2]);
	}
	return arr;
}

function time2string(time){
	var h,m,rm,rs;
	h=Math.floor(time/3600);
	rm=time-(h*3600);
	m=Math.floor(rm/60);
	rs=rm-(m*60);
	if(h<10){
		h="0"+h;
	}
	if(m<10){
		m="0"+m;
	}
	if(rs<10){
		rs="0"+rs;
	}
	return h+':'+m+':'+rs;
}
	
/* Boxes */
function ResOverFlowBOX(){
	var html;
	var t1=time2string(getTimeToOverflow(getResourceInfo()[0]));
	var t2=time2string(getTimeToOverflow(getResourceInfo()[1]));
	var t3=time2string(getTimeToOverflow(getResourceInfo()[2]));
	var t4=time2string(getTimeToOverflow(getResourceInfo()[3]));
	var p1=percentualedi(getResourceInfo()[0][1],getResourceInfo()[0][2]);
	var p2=percentualedi(getResourceInfo()[1][1],getResourceInfo()[1][2]);
	var p3=percentualedi(getResourceInfo()[2][1],getResourceInfo()[2][2]);
	var p4=percentualedi(getResourceInfo()[3][1],getResourceInfo()[3][2]);
	
	if(p1>=90){
		var class1="th-bar th-bar-full";
	}else{
		var class1="th-bar";
	}
	if(p2>=90){
		var class2="th-bar th-bar-full";
	}else{
		var class2="th-bar";
	}
	if(p3>=90){
		var class3="th-bar th-bar-full";
	}else{
		var class3="th-bar";
	}
	if(p4>=90){
		var class4="th-bar th-bar-full";
	}else{
		var class4="th-bar";
	}
	
	html='<table width="100%" border="0" cellspacing="0" cellpadding="1">'+
		  '<tr>'+
			'<td width="50%"><img class="r1" title="Legno" alt="Legno" src="img/x.gif"/> '+t1+'</td>'+
			'<td><div class="'+class1+'" style="width:'+p1+'%"><span>'+p1+'%</span></div></td>'+
		  '</tr>'+
		  '<tr>'+
			'<td><img class="r2" title="Argilla" alt="Argilla" src="img/x.gif"/> '+t2+'</td>'+
			'<td><div class="'+class2+'" style="width:'+p2+'%"><span>'+p2+'%</span></div></td>'+
		  '</tr>'+
		  '<tr>'+
			'<td><img class="r3" title="Ferro" alt="Ferro" src="img/x.gif"/> '+t3+'</td>'+
			'<td><div class="'+class3+'" style="width:'+p3+'%"><span>'+p3+'%</span></div></td>'+
		  '</tr>'+
		  '<tr>'+
			'<td><img class="r4" title="Grano" alt="Grano" src="img/x.gif"/> '+t4+'</td>'+
			'<td><div class="'+class4+'" style="width:'+p4+'%"><span>'+p4+'%</span></div></td>'+
		  '</tr>'+
		'</table>';
	wbox('Gestione Risorse',html);
}

function ResToBuildBOX(){
	var reqs=document.getElementsByClassName('required');
	for(i=0;i<reqs.length;i++){
		var rs=getResourcePerBuild(i);
		var html='<div class="box"><table width="100%" border="0" cellspacing="0" cellpadding="1">';
		var mxtim=0;
		for(r=0;r<4;r++){
			var p1=percentualedi(getResourceInfo()[r][1],rs[r]);
			if(p1<100){
				var tim=getTimeToTarget(getResourceInfo()[r],rs[r]);
				if(tim>mxtim){
					mxtim=tim;
				}
				var t1=time2string(tim);
			}else{
				var t1='---';
				var p1=100;
			}
		  html+='<tr>'+
			'<td width="25%"><img class="r'+(r+1)+'" src="img/x.gif"/> '+t1+'</td>'+
			'<td><div class="th-bar" style="width:'+p1+'%"><span>'+p1+'%</span></div></td>'+
		  '</tr>';
		}
		if(mxtim>0){
			var now=new Date();
			now=now.getTime();
			now=now/1000;
			var d=time2date(now+mxtim);
		}else{
			var d='---';
		}
		html+='<tr><td><img class="clock" title="durata" alt="durata" src="img/x.gif"/> '+d+'</td><td></td></tr>';
		html+='</table></div>';
		if(reqs.length>1){
			var tit=document.getElementsByTagName('h2')[i].innerHTML;
		}
		if(reqs.length==1){
			var tit='l\' edificio';
		}
		wbox('Risorse per '+tit,html,document.getElementsByClassName('required')[i]);
	}
}

function RewriteResBar(){
	var r=getResourceInfo();
	var d=document.getElementById('res');
	d.getElementsByTagName('TABLE')[0].style.display='none';
	d.innerHTML+='<table id="myresbar" width="100%" border="0" cellspacing="0" cellpadding="1">'+
					'<tr>'+
						'<td><img src="img/x.gif" class="r1" alt="" border="0" /></td>'+
						'<td align="right"><span id="myl1">'+r[0][1]+'</span><br/><span class="th-sr">'+r[0][2]+'</span></td>'+
						'<td><img src="img/x.gif" class="r2" alt="" border="0" /></td>'+
						'<td align="right"><span id="myl2">'+r[1][1]+'</span><br/><span class="th-sr">'+r[1][2]+'</span></td>'+
						'<td><img src="img/x.gif" class="r3" alt="" border="0" /></td>'+
						'<td align="right"><span id="myl3">'+r[2][1]+'</span><br/><span class="th-sr">'+r[2][2]+'</span></td>'+
						'<td><img src="img/x.gif" class="r4" alt="" border="0" /></td>'+
						'<td align="right"><span id="myl4">'+r[3][1]+'</span><br/><span class="th-sr">'+r[3][2]+'</span></td>'+
					'</tr>'+
				'</table>';
}

function UpdateResBar(){
	var r=getResourceInfo();
	document.getElementById('myl1').innerHTML=r[0][1];
	document.getElementById('myl2').innerHTML=r[1][1];
	document.getElementById('myl3').innerHTML=r[2][1];
	document.getElementById('myl4').innerHTML=r[3][1];
}
/* INIT ALL */
function addCSS(){
	addGlobalStyle('.th-box{background-color:rgba(0,0,150,0.7);width:100%; color:#FFFFFF;-moz-border-radius:4px;padding:2px;margin-bottom:2px;}.th-box h1{font-size:16px;border-bottom:1px dashed #FFFFFF;width:90%;margin-bottom:2px;padding-bottom:0px;}.th-bar{font-size:10px;background-color:#FFFFFF;color:rgb(120,120,250);-moz-border-radius-topright:1px;-moz-border-radius-bottomright:1px;text-align:center;}.th-bar-full{background-image:url(data:image/gif;base64,R0lGODlhCAAIAJEAAKqqqv%2F%2F%2FwAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQJCgAAACwAAAAACAAIAAACDZQFCadrzVRMB9FZ5SwAIfkECQoAAAAsAAAAAAgACAAAAg%2BELqCYaudeW9ChyOyltQAAIfkECQoAAAAsAAAAAAgACAAAAg8EhGKXm%2BrQYtC0WGl9oAAAIfkECQoAAAAsAAAAAAgACAAAAg%2BEhWKQernaYmjCWLF7qAAAIfkECQoAAAAsAAAAAAgACAAAAg2EISmna81UTAfRWeUsACH5BAkKAAAALAAAAAAIAAgAAAIPFA6imGrnXlvQocjspbUAACH5BAkKAAAALAAAAAAIAAgAAAIPlIBgl5vq0GLQtFhpfaIAACH5BAUKAAAALAAAAAAIAAgAAAIPlIFgknq52mJowlixe6gAADs%3D);font-weight:bold; color: #000000;}.th-bar-full span{background-color:#FFFFFF;}.th-sr{color:#C0C0C0;font-size:10px;padding:0px;margin:0px;}');
}

function InitAll(){
	addCSS();
	RewriteResBar();
	setInterval(function(){UpdateResBar();},200);
	ResOverFlowBOX();
	if(document.getElementsByClassName('required').length>0){
		ResToBuildBOX();
	}
}

InitAll();