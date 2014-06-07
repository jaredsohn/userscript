// ==UserScript==
// @name           get full links
// @namespace      lu.scio.us.albums.getFullLinks
// @include        http://lu.scio.us/hentai/albums/*/page/*
// @description    For a given album, fetch each preview and extract the "full size" image url in a convenient way. You can then use a download manager (like down them all) to fetch each pictures in 1 step
// ==/UserScript==


var aryFullSize=new Array()
var aryPages= new Array()

function dashboard(){
	dv=document.createElement('div')
	dv.style.position='fixed'
	dv.style.zIndex=99
	dv.style.right='50px'
	dv.style.top='20px'
	dv.style.width='400px'
	dv.style.backgroundColor='grey'
	dv.style.MozOpacity='0.9'
	dv.id='gm_dashboard'
	
	document.getElementsByTagName('body')[0].appendChild(dv)
}

function _dashboardPopulate(){
	dv=document.getElementById('gm_dashboard')
	bt=document.createElement('input')
	bt.type='button'
	bt.value='Get full size links'
	bt.addEventListener('click',process,false)
	
	dv.appendChild(bt)
}

function _dashboardClear(){
	dv=document.getElementById('gm_dashboard')
	dv.innerHTML=''
}

function _dasboardProcess(){
	dv=document.getElementById('gm_dashboard')
	sz=aryFullSize.length+1
	dv.innerHTML='Fetching page '+sz+' of '+aryPages.length
}

function process(){
	_dashboardClear()
	getFullLinks()
	showFullLinks()
}

function showFullLinks(){
	dv=document.getElementById('gm_dashboard')
	_dashboardClear()
	for(cpt=0;cpt<aryFullSize.length;cpt++){
		a=document.createElement('a')
		a.href=aryFullSize[cpt]
		a.appendChild(document.createTextNode('page '+(cpt+1)))
		dv.appendChild(a)
		dv.appendChild(document.createElement('br'))
	}
}

function getFullLinks(){
	var aryRoot=document.getElementsByTagName("ul")
	for(cptRoot=0;cptRoot<aryRoot.length;cptRoot++){
		elm=aryRoot[cptRoot]
		if(elm.className=="thumbs"){
			aryPges=elm.getElementsByTagName('img')
			console.log('found '+aryPges.length+' images')
			for(cptPage=0;cptPage<aryPges.length;cptPage++){
				if(aryPges[cptPage].className=="reflect img_tb"){
					pge=aryPges[cptPage]
					aryPages.push(pge.src)
				}
			}
		}
	}

	for(cptPage=0;cptPage<aryPages.length;cptPage++){
		_dasboardProcess()
		aryFullSize.push(aryPages[cptPage].replace('thumb_100_',''))
	}
}

dashboard()
_dashboardPopulate()