// ==UserScript==
// @name 4chan [s4s] Upboats
// @version 2014.05.08
// @include *//boards.4chan.org/s4s/
// @include *//boards.4chan.org/s4s/thread/*
// @grant GM_xmlhttpRequest
// @updateURL http://kek.3space.info/upboats.user.js
// ==/UserScript==
function to(pl,el){
	return pl.getElementsByClassName(el)
}
function thi(sis,nic,ebo,ard){
	urmum=document.createElement(sis)
	if(ebo)
		for(rekt=0;rekt<Math.floor(ebo.length/2)*2;rekt+=2)
			urmum.setAttribute(ebo[rekt],ebo[rekt+1])
	if(ard)
		urmum.innerHTML=ard
	if(nic)
		nic.appendChild(urmum)
	return urmum
}
function boat(by,post){
	GM_xmlhttpRequest({
	method:'get',
	url:'http://kek.3space.info/boat/?r='+by+'&tid='+post,
	onload:function(response){
		if(response.status==200){
			console.log(response.responseText)
			rn=by==2?1:0
			boata=response.responseText.replace(',','').split(';')
			pc=document.getElementById('pc'+post)
			if(boata[rn]==1){
				to(pc,'upb')[0].setAttribute('class','upb clb')
				to(pc,'dnb')[0].setAttribute('class','dnb')
			}else if(boata[rn]==0){
				to(pc,'upb')[0].setAttribute('class','upb')
				to(pc,'dnb')[0].setAttribute('class','dnb clb')
			}else{
				to(pc,'upb')[0].setAttribute('class','upb')
				to(pc,'dnb')[0].setAttribute('class','dnb')
			}
			to(pc,'nmb')[0].innerHTML=boata[rn+1]!='0'?boata[rn+1]:'\u2022'
			if(boata[rn+2]){
				vtup=(boata[rn+1]*1+boata[rn+2]*1)/2
				to(pc,'nmb')[0].title='Up: '+vtup+', Down: '+(boata[rn+2]-vtup)
			}
		}
	}})
}
function getb(){
	pstc=to(document,'postContainer')
	posts=[]
	for(ps=0;ps<pstc.length;ps++){
		posts[ps]=pstc[ps].id
	}
	posts=posts.join(',').replace(/pc/g,'')
	GM_xmlhttpRequest({
	method:'post',
	headers:{"Content-type":"application/x-www-form-urlencoded"},
	url:'http://kek.3space.info/boat/?r=2',
	data:'tid='+posts,
	onload:function(response){
		if(response.status==200){
			console.log(response.responseText)
			rspa=response.responseText.split(',')
			for(rs=0;rs<rspa.length;rs++){
				rsa=rspa[rs].split(';')
				rse=document.getElementById('pc'+rsa[0])
				if(rsa[1]==1){
					to(rse,'upb')[0].setAttribute('class','upb clb')
					to(rse,'dnb')[0].setAttribute('class','dnb')
				}else if(rsa[1]==0){
					to(rse,'upb')[0].setAttribute('class','upb')
					to(rse,'dnb')[0].setAttribute('class','dnb clb')
				}else{
					to(rse,'upb')[0].setAttribute('class','upb')
					to(rse,'dnb')[0].setAttribute('class','dnb')
				}
				to(rse,'nmb')[0].innerHTML=rsa[2]!='0'?rsa[2]:'\u2022'
				if(rsa[3]){
					vtup=(rsa[2]*1+rsa[3]*1)/2
					to(rse,'nmb')[0].title='Up: '+vtup+', Down: '+(rsa[3]-vtup)
				}
			}
		}
	}})
}
opct=to(document,'opContainer')
for(ot=0;ot<opct.length;ot++){
	cnt=thi('div',0,['class','cnt','data-boat',opct[ot].id.slice(2)])
	upbt=thi('div',cnt,['class','upb'])
	upbt.addEventListener('mousedown',function(event){boat(1,event.target.parentNode.getAttribute('data-boat'))})
	nmbt=thi('div',cnt,['class','nmb'],'\u2022')
	nmbt.addEventListener('mousedown',function(event){boat(2,event.target.parentNode.getAttribute('data-boat'))})
	dnbt=thi('div',cnt,['class','dnb'])
	dnbt.addEventListener('mousedown',function(event){boat(0,event.target.parentNode.getAttribute('data-boat'))})
	to(opct[ot],'postMessage')[0].parentNode.insertBefore(cnt,to(opct[ot],'postMessage')[0])
}
function hanl(er){
	cachr=document.getElementsByClassName('replyContainer').length
	rlct=to(document,'replyContainer')
	for(rt=er;rt<rlct.length;rt++){
		cnt=thi('div',0,['class','cnt','data-boat',rlct[rt].id.slice(2)])
		upbd=thi('div',cnt,['class','upb'])
		upbd.addEventListener('mousedown',function(event){boat(1,event.target.parentNode.getAttribute('data-boat'))})
		nmbd=thi('div',cnt,['class','nmb'],'\u2022')
		nmbd.addEventListener('mousedown',function(event){boat(2,event.target.parentNode.getAttribute('data-boat'))})
		dnbd=thi('div',cnt,['class','dnb'])
		dnbd.addEventListener('mousedown',function(event){boat(0,event.target.parentNode.getAttribute('data-boat'))})
		to(rlct[rt],'sideArrows')[0].parentNode.replaceChild(cnt,to(rlct[rt],'sideArrows')[0])
	}
}
thi('style',document.head,0,'body:not(.is_index) .cnt{display:inline-block;opacity:.5}.replyContainer .cnt{float:left}.nmb{width:30px;height:16px;font-size:13px;color:#c6c6c6;font-weight:bold;text-align:center;cursor:default}.dnb{background-position:-15px 0}.clb.upb{background-position:0 -14px}.clb.dnb{background-position:-15px -14px}.upb,.dnb{cursor:pointer;margin:0 auto;width:15px;height:14px;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAMAAABBJv+bAAAAkFBMVEX///+3t7e9vb2UlP/b29v/s5e0tP+4uLi+vr7/i2C8vLzU1NTOzs7/jGG2trb/k2uamv+np/+urv+hof//rI3/o4H/m3bCwsLc3NzT09P/mXPKysrNzc3/v6f/lW3Y2NjHx8fBwcG7u/+pqf//pob/uqGwsP//rY6bm/+env+Skv/Bwf/AwMDIyMi/v///il5tvt3qAAAAAXRSTlMAQObYZgAAAPtJREFUeF590QeOhTAMRVE79N75vdfp+9/dOAP8PBRpLhIIHWRCoDEmaOm67pIgjgNgN0lWLmgQsmLDh+02PYCemPnT+Op4/ErMZNFc/DU/XSxO6UvDPM/F83DyjYrjzTRZsTaWFBOHSmIOVCiHfT9/GqfZ78K1WCu1vwS/094H3CV7F3GP//8HNC9D/NDNtMiQfd//Rt1He/BzXddn0HUURWvjflVV/lzR703T3GHyX2b+pSzLy0x/RneeOscZr6K6LBuv4o70rk+iQ9eiKK40NDgqPfq+f9DkbxrlTFNe13UeoaPSrW3bGxl/wmRp53nejsBLUWAdQZP+As6xFYUbzgTbAAAAAElFTkSuQmCC")}')

getb()
hanl(0)
setInterval(function(){
	if(cachr<document.getElementsByClassName('replyContainer').length){
		hanl(cachr)
	}
},5000)