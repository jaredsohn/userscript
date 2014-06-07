// ==UserScript==
// @name		NinjaManager Auto Accept All
// @description		let the team to auto accept all received challenge
// @include		http://www.ninjamanager.com/*
// @include		http://*.ninjamanager.com/*
// @version		1.0.15
// @date		01-01-2012
// ==/UserScript==

var secondd=0
document.d.d2.value='0'

function countt()
  {
  if (secondd>=5)
    {
    secondd-=5
    open("http://http://www.ninjamanager.com/#chresp(1,0)")
    }
  else
    secondd+=1
    document.d.d2.value=secondd
    setTimeout("countt()",1000)
  }
countt()