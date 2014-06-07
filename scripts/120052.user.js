// ==UserScript==
// @name eRepublik hrvatski prijevod
// @namespace inchy
// @description eRepublik hrvatski prijevod
// @include http://www.erepublik.com/*
// ==/UserScript==

//Rescue Text and TEXTAREA values script- by JavaScript Kit (www.javascriptkit.com)
//Last modified: Nov 9th, 2010

function rescuefieldvalues(idarray){
	for (var i=0; i<idarray.length; i++){
		var el=document.getElementById(idarray[i])
		if (!/(text)/.test(el.type)) //skip to next element if it isn't a input type="text" or textarea element
			continue
		if (el.addBehavior && !window.sessionStorage){ //use IE behaviors to store info?
			el.style.behavior='url(#default#userData)'
			el.load("userentereddata")
		}
		var persisteddata=(window.sessionStorage)? sessionStorage[idarray[i]+'data'] : (el.addBehavior)? el.getAttribute('dataattr') : null
		if (persisteddata) //if rescued data found for this element
			el.value=persisteddata
		el.onkeyup=function(){
			if (window.sessionStorage)
				sessionStorage[this.id+'data']=this.value
			else if (this.addBehavior){
				this.setAttribute("dataattr", this.value)
				this.save("userentereddata")
			}
		} //onkeyup
	} //for loop
}