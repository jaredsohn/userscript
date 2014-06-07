// ==UserScript==
// @name           JavaScript Expression Tracker
// @description    Constantly track JS exprssions
// @author         ftbhrygvn
// @namespace      ftbhrygvn
// @include        *
// @exclude        about:*
// @version        1.2
// @license        Creative Commons Attribution-Share Alike 3.0 Hong Kong
// ==/UserScript==

//-- Preference functions --------------------------------
function getV(name,def){
	temp = GM_getValue(name)
	if(temp==null){
		GM_setValue(name,def)
		temp = def
	}
	eval(name+'='+(typeof(temp)=='string'?'"':'')+temp+(typeof(temp)=='string'?'"':''))
	return temp
}

function setV(name,val){
	GM_setValue(name,val)
	eval(name+'='+(typeof(val)=='string'?'"':'')+val+(typeof(val)=='string'?'"':''))
}

//-- Show/hide ---------------------------------------------
function hide(){
	setV('min',true)
	div.style.height = '16px'
	div.style.width = '66px'
	div.style.padding = '0px'
	bar.style.top = '0px'
	bar.style.left = '-716px'
	pic.src = 'data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00%60%00%60%00%00%FF%DB%00C%00%08%06%06%07%06%05%08%07%07%07%09%09%08%0A%0C%14%0D%0C%0B%0B%0C%19%12%13%0F%14%1D%1A%1F%1E%1D%1A%1C%1C%20%24.\'%20%22%2C%23%1C%1C(7)%2C01444%1F\'9%3D82%3C.342%FF%DB%00C%01%09%09%09%0C%0B%0C%18%0D%0D%182!%1C!22222222222222222222222222222222222222222222222222%FF%C0%00%11%08%00%0F%00%0F%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1F%00%00%01%05%01%01%01%01%01%01%00%00%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%10%00%02%01%03%03%02%04%03%05%05%04%04%00%00%01%7D%01%02%03%00%04%11%05%12!1A%06%13Qa%07%22q%142%81%91%A1%08%23B%B1%C1%15R%D1%F0%243br%82%09%0A%16%17%18%19%1A%25%26\'()*456789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%C4%00%1F%01%00%03%01%01%01%01%01%01%01%01%01%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%11%00%02%01%02%04%04%03%04%07%05%04%04%00%01%02w%00%01%02%03%11%04%05!1%06%12AQ%07aq%13%222%81%08%14B%91%A1%B1%C1%09%233R%F0%15br%D1%0A%16%244%E1%25%F1%17%18%19%1A%26\'()*56789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%82%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E2%E3%E4%E5%E6%E7%E8%E9%EA%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%EB%F4m%1B%C2%96%3E%03%F0%8C%F3%F8.%C7T%BE%D4%AD-%E2U%86%C6%D8%C9%24%86%D8%CA%CC%CD)Q%D26%24%93%92~%B5%8F%F1%17I%F0%C5%C7%C1%ADcY%D3%3C-c%A5%DDG(%87%FE%3C%A1%8Eh%9E%3B%B5%89%C6%E8%F2%3A%AB%0E%18%E4%1Fz4%9F%88%BF%0D%EE%3C%11%E1%BD3Y%D6%E7%8E%EBM%B4%B7%E2%05%BB%85%E2%99a%F2%DB%0F%10%07%A38%E0%E0%E6%B2%FC%7D%E3%EF%01%5D%7C)%D4%FC9%E1%CDZI%A7%95%D1%E2%8AH%EEY%9D%8D%C2%CB!2J%B9%24%9D%ED%92h%03%FF%D9'
}

function show(){
	setV('min',false)
	div.style.height = 'auto'
	div.style.width = '750px'
	div.style.padding = '16px'
	bar.style.top = '-16px'
	bar.style.left = '-16px'
	pic.src = 'data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00%60%00%60%00%00%FF%DB%00C%00%08%06%06%07%06%05%08%07%07%07%09%09%08%0A%0C%14%0D%0C%0B%0B%0C%19%12%13%0F%14%1D%1A%1F%1E%1D%1A%1C%1C%20%24.\'%20%22%2C%23%1C%1C(7)%2C01444%1F\'9%3D82%3C.342%FF%DB%00C%01%09%09%09%0C%0B%0C%18%0D%0D%182!%1C!22222222222222222222222222222222222222222222222222%FF%C0%00%11%08%00%0F%00%0F%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1F%00%00%01%05%01%01%01%01%01%01%00%00%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%10%00%02%01%03%03%02%04%03%05%05%04%04%00%00%01%7D%01%02%03%00%04%11%05%12!1A%06%13Qa%07%22q%142%81%91%A1%08%23B%B1%C1%15R%D1%F0%243br%82%09%0A%16%17%18%19%1A%25%26\'()*456789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%C4%00%1F%01%00%03%01%01%01%01%01%01%01%01%01%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%11%00%02%01%02%04%04%03%04%07%05%04%04%00%01%02w%00%01%02%03%11%04%05!1%06%12AQ%07aq%13%222%81%08%14B%91%A1%B1%C1%09%233R%F0%15br%D1%0A%16%244%E1%25%F1%17%18%19%1A%26\'()*56789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%82%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E2%E3%E4%E5%E6%E7%E8%E9%EA%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%ED%FC%3B%A0%F8%12%C3%E1%EF%87u%1DsK%F0%ED%BF%DA4%FBm%D77%B6%F0\'%99%23D%18%E5%9Cr%C7%93%D7\'%06%B1%FE(%E8%3E%10%FF%00%85E%AA%EB%1A%06%97%A1%FF%00%CB%1F%26%F6%C6%DE%2F%F9%EE%8A%DB%5D%07%FB%C0%E0%FA%8A%9F%C2_%17%FC%0D%A6%F8CC%D3%EE%F5%CD%976%DA%7D%BC2%C7%F6I%CE%D7X%D40%C8L%1EA%1C%1CVO%C5%0F%8A%5E%0F%F1%17%C3%ADWJ%D2%B5%8F%B4%5E%CF%E4%F9q%7D%9Ad%DD%89Q%8F%2C%80%0E%01%3Dh%03%FF%D9'
}

//-- Track function -----------------------------
function track(){
	Array.forEach(arguments,function(expr){
		try{
			bigdiv = document.createElement('div')
			temp = document.createElement('div')
			temp.setAttribute('style','text-align:left;font-weight:bold;')
			temp.innerHTML = expr
			if(temp.innerHTML=='') temp.innerHTML='&nbsp;'
			bigdiv.appendChild(temp)
			temp = document.createElement('div')
			temp.setAttribute('style','text-align:right')
			bigdiv.appendChild(temp)
			result = eval(expr)
			temp.innerHTML = '<span style="color:#F00;">'+(typeof result)[0].toUpperCase()+(typeof result).substring(1)+'</span>:&nbsp;&nbsp;&nbsp;&nbsp;'+result
			bigdiv.addEventListener('mousedown',remove,true)
			bigdiv.addEventListener('mouseover',hl,true)
			bigdiv.addEventListener('mouseout',ll,true)
			disp.appendChild(bigdiv)
		}catch(err){alert('ERROR : '+err)}
		exprs.push(inp.value)
	})
}

function ref(){
	Array.forEach(disp.childNodes,function(e){
		expr = e.firstChild.innerHTML
		result = eval(expr)
		e.lastChild.innerHTML = '<span style="color:#F00;">'+(typeof result)[0].toUpperCase()+(typeof result).substring(1)+'</span>:&nbsp;&nbsp;&nbsp;&nbsp;'+result
	})
}

function remove(e){
	if(e.target) e = this
	e.parentNode.removeChild(e)
	e.removeEventListener('mousedown',remove,true)
	e.removeEventListener('mouseover',hl,true)
	e.removeEventListener('mouseout',ll,true)
}

function hl(){this.style.backgroundColor='#F0FFFF'}
function ll(){this.style.backgroundColor='#FFF'}

//-- Initializations ----------------------------------------
exprs = []
getV('min',false)
getV('vis',true)
getV('top',Math.round((window.innerHeight/2)-50))
getV('left',Math.round((window.innerWidth/2)-375))
getV('bg','#000000')
getV('int',2000)
getV('ent',false)

//-- Tracker content ----------------------------------------
content = document.createElement('div')
disp = document.createElement('div')
disp.setAttribute('style','border:1px solid silver;width:750px;min-height:10px')
content.appendChild(disp)
content.appendChild(document.createElement('br'))
content.appendChild(document.createTextNode('Enter expression: '))
inp = document.createElement('input')
inp.type = 'text'
inp.size = '80'
inp.addEventListener('keydown',function(e){if(e.keyCode==13) track(inp.value)},true)
content.appendChild(inp)
but = document.createElement('input')
but.type = 'button'
but.value='Track!!!'
content.appendChild(but)
but.addEventListener('click',function(e){track(inp.value)},true)
bar = document.createElement('div')
bar.setAttribute('style','background-color:'+bg+';height:16px;width:782px;position:relative;left:-16px;top:-16px;cursor:move;')
pic = document.createElement('img')
pic.src = 'data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00%60%00%60%00%00%FF%DB%00C%00%08%06%06%07%06%05%08%07%07%07%09%09%08%0A%0C%14%0D%0C%0B%0B%0C%19%12%13%0F%14%1D%1A%1F%1E%1D%1A%1C%1C%20%24.\'%20%22%2C%23%1C%1C(7)%2C01444%1F\'9%3D82%3C.342%FF%DB%00C%01%09%09%09%0C%0B%0C%18%0D%0D%182!%1C!22222222222222222222222222222222222222222222222222%FF%C0%00%11%08%00%0F%00%0F%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1F%00%00%01%05%01%01%01%01%01%01%00%00%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%10%00%02%01%03%03%02%04%03%05%05%04%04%00%00%01%7D%01%02%03%00%04%11%05%12!1A%06%13Qa%07%22q%142%81%91%A1%08%23B%B1%C1%15R%D1%F0%243br%82%09%0A%16%17%18%19%1A%25%26\'()*456789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%C4%00%1F%01%00%03%01%01%01%01%01%01%01%01%01%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%11%00%02%01%02%04%04%03%04%07%05%04%04%00%01%02w%00%01%02%03%11%04%05!1%06%12AQ%07aq%13%222%81%08%14B%91%A1%B1%C1%09%233R%F0%15br%D1%0A%16%244%E1%25%F1%17%18%19%1A%26\'()*56789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%82%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E2%E3%E4%E5%E6%E7%E8%E9%EA%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%ED%FC%3B%E1%DF%07%DA%7C%3C%F0%E6%A3%A8%F8_J%95e%D3%ED%9A%EA%ED%AC!%7F%2Ft%40%99e%24gn~%F3s%8C%EEl(f%18%FF%00%14%BC%3B%E1%B8%BE%10%EA%DA%AE%9F%E1%7B%1D6%E3%F7%26\'%FB%04p%CC%AAn%11s%C0%DC%BB%97%9C%1C0%0D%86%00%E4%03%C3%BF%14%BE%1EE%E0%DF%0Ei%FA%AE%B3%FE%91%A7%DA%5Bo%84%DA%DC%15Y%A3%8C%0Ep%9B%5Bkr3%90%19U%87%20%11%8F%F1%13%E2\'%815%1F%85%BA%97%87%BC%3D%AA%F9%93%3F%94-%ED%85%BC%EA%00%13%A3%95R%EA%02%A8%00%E1r%00%00(%00%00(%03%FF%D9'
pic.setAttribute('style','float:right;cursor:pointer')
pic.addEventListener('click',function(e){div.style.visibility='hidden';setV('vis',false);clearInterval(t)},true)
bar.appendChild(pic)
pic = document.createElement('img')
pic.src = 'data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00%60%00%60%00%00%FF%DB%00C%00%08%06%06%07%06%05%08%07%07%07%09%09%08%0A%0C%14%0D%0C%0B%0B%0C%19%12%13%0F%14%1D%1A%1F%1E%1D%1A%1C%1C%20%24.\'%20%22%2C%23%1C%1C(7)%2C01444%1F\'9%3D82%3C.342%FF%DB%00C%01%09%09%09%0C%0B%0C%18%0D%0D%182!%1C!22222222222222222222222222222222222222222222222222%FF%C0%00%11%08%00%0F%00%0F%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1F%00%00%01%05%01%01%01%01%01%01%00%00%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%10%00%02%01%03%03%02%04%03%05%05%04%04%00%00%01%7D%01%02%03%00%04%11%05%12!1A%06%13Qa%07%22q%142%81%91%A1%08%23B%B1%C1%15R%D1%F0%243br%82%09%0A%16%17%18%19%1A%25%26\'()*456789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%C4%00%1F%01%00%03%01%01%01%01%01%01%01%01%01%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%11%00%02%01%02%04%04%03%04%07%05%04%04%00%01%02w%00%01%02%03%11%04%05!1%06%12AQ%07aq%13%222%81%08%14B%91%A1%B1%C1%09%233R%F0%15br%D1%0A%16%244%E1%25%F1%17%18%19%1A%26\'()*56789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%82%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E2%E3%E4%E5%E6%E7%E8%E9%EA%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%ED%FC%3B%A0%F8%12%C3%E1%EF%87u%1DsK%F0%ED%BF%DA4%FBm%D77%B6%F0\'%99%23D%18%E5%9Cr%C7%93%D7\'%06%B1%FE(%E8%3E%10%FF%00%85E%AA%EB%1A%06%97%A1%FF%00%CB%1F%26%F6%C6%DE%2F%F9%EE%8A%DB%5D%07%FB%C0%E0%FA%8A%9F%C2_%17%FC%0D%A6%F8CC%D3%EE%F5%CD%976%DA%7D%BC2%C7%F6I%CE%D7X%D40%C8L%1EA%1C%1CVO%C5%0F%8A%5E%0F%F1%17%C3%ADWJ%D2%B5%8F%B4%5E%CF%E4%F9q%7D%9Ad%DD%89Q%8F%2C%80%0E%01%3Dh%03%FF%D9'
pic.setAttribute('style','float:right;cursor:pointer')
pic.addEventListener('click',function(e){
	if(min) show()
	else hide()
},true)
bar.appendChild(pic)

//-- Options menu content --------------------------------
ocontent = document.createElement('div')
temp = document.createElement('table')
temp.id = 'options_table'
row = temp.insertRow(0)
row.insertCell(0).appendChild(document.createTextNode('Border color:'))
bc = document.createElement('input')
bc.type = 'text'
bc.size = '6'
bc.maxLength = '6'
bc.value = bg.match(/[\dA-F]+/)
bc.addEventListener('keyup',function(e){c.style.backgroundColor='#'+bc.value},true)
c = document.createElement('div')
c.setAttribute('style','height:19px;width:19px;position:relative;left:10px;float:right;background-color:'+bg)
cell = row.insertCell(1)
cell.appendChild(document.createTextNode('#'))
cell.appendChild(bc)
cell.appendChild(c)
row = temp.insertRow(1)
et = document.createElement('input')
et.type = 'checkbox'
et.checked = ent
et.addEventListener('change',function(e){ti.disabled=!et.checked},true)
row.insertCell(0).appendChild(document.createTextNode('Track:'))
row.insertCell(1).appendChild(et)
row = temp.insertRow(2)
row.insertCell(0)
ti = document.createElement('input')
ti.type = 'text'
ti.size = '5'
ti.maxLength = '5'
ti.value = int
ti.disabled = !et.checked
cell = row.insertCell(1)
cell.appendChild(ti)
cell.appendChild(document.createTextNode('ms'))
row = temp.insertRow(3)
but = document.createElement('input')
but.type = 'button'
but.value='Save Options'
but.addEventListener('click',function(e){
	if(!bc.value.match(/^[\dA-F]{3}([\dA-F]{3})?$/)||ti.value.match(/[^\d]/)){
		alert('Invalid value')
		bc.value=bg.match(/[\dA-F]+/)
		et.checked = ent
		ti.value=int
		ti.disabled = !ent
		return
	}
	setV('bg','#'+bc.value)
	setV('int',ti.value*1)
	setV('ent',et.checked)
	option.style.visibility='hidden'
	div.style.borderColor = option.style.borderColor = bar.style.backgroundColor = obar.style.backgroundColor = bg
	if(t) clearInterval(t)
	if(ent) t = setInterval(function(){ref()},int)
},true)
row.insertCell(0).appendChild(but)
but = document.createElement('input')
but.type = 'button'
but.value='Cancel'
but.addEventListener('click',function(e){
	bc.value=bg.match(/[\dA-F]+/)
	et.checked = ent
	ti.value=int
	ti.disabled = !ent
	option.style.visibility='hidden'
},true)
row.insertCell(1).appendChild(but)
ocontent.appendChild(temp)
obar = document.createElement('div')
obar.setAttribute('style','background-color:'+bg+';height:16px;width:250px;position:relative;left:-16px;top:-16px;cursor:move;')

//-- Draggable box by JoeSimmons -------------------------
function dragStart(e) {
dragObj.elNode = e.target.parentNode
dragObj.cursorStartX = e.clientX + window.scrollX;
dragObj.cursorStartY = e.clientY + window.scrollY;
dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
dragObj.elNode.style.zIndex = ++dragObj.zIndex;
document.addEventListener("mousemove", dragGo,   true);
document.addEventListener("mouseup",   dragStop, true);
e.preventDefault();
}

function dragGo(e) {
e.preventDefault();
var x = e.clientX + window.scrollX,
	y = e.clientY + window.scrollY;
dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
dragObj.elNode.style.top = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";
if(dragObj.elNode==div){
	setV('top',parseInt(dragObj.elNode.style.top))
	setV('left',parseInt(dragObj.elNode.style.left))
}
}

function dragStop(e) {
document.removeEventListener("mousemove", dragGo,   true);
document.removeEventListener("mouseup",   dragStop, true);
}

var dragObj = new Object(), x, y;
dragObj.zIndex = 999;
div = document.createElement('div');
div.setAttribute('id', 'tracker');
div.setAttribute('style', 'z-index:999;position:fixed;top:'+top+'px;left:'+left+'px;-moz-border-radius:6px;border:3px solid '+bg+';color:#000;width:750px;padding:16px;text-align:center;background-color:#FFF;overflow:hidden;'+(!vis?'visibility:hidden':''));
document.body.appendChild(div);
div.appendChild(bar)
div.appendChild(content);

option = document.createElement('div');
option.setAttribute('id', 'options');
option.setAttribute('style', 'z-index:999;position:fixed;-moz-border-radius:6px;border:3px solid '+bg+';color:#000;padding:16px;text-align:center;background-color:#FFF;overflow:hidden;visibility:hidden');
option.style.top = Math.round((window.innerHeight-option.clientHeight)/2)+'px'
option.style.left = Math.round((window.innerHeight-option.clientWidth)/2)+'px'
document.body.appendChild(option);
option.appendChild(obar)
option.appendChild(ocontent)
option.style.width = Math.max(temp.clientWidth,c.offsetLeft+40)+'px'
obar.style.width = parseInt(option.style.width)+32+'px'
//-- End Draggable Box ------------------------------------

if(min) hide()
bar.addEventListener('mousedown',function(e){dragStart(e)},true)
obar.addEventListener('mousedown',function(e){dragStart(e)},true)
GM_registerMenuCommand('Open tracker window',function(){div.style.visibility='visible';setV('vis',true);t = setInterval(function(){ref()},int)})
GM_registerMenuCommand('Set options',function(){option.style.visibility='visible';option.style.zIndex=++dragObj.zIndex})
GM_registerMenuCommand('Clear all',function(){while(e=disp.firstChild) remove(e)})
GM_addStyle('table#options_table,table#options_table tbody,tr {border:0px!important;padding:0px!important;margin:0px!important;}table#options_table td{border:0px!important;padding:2px!important;margin:0px!important;text-align:left}')
if(ent&&vis) t = setInterval(function(){ref()},int)
else t = null