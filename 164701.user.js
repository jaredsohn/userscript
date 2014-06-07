// ==UserScript==
// @name			kongfree
// @description		Some crap you may find useful.
// @match			http://www.kongregate.com/games/*
// ==/UserScript==

function njct() {
	lightbox.prototype.activate=function() {
		this.onClose({
			success:true
			})
		}
	}

//Leech global variables
inject_script=document.createElement('script')
inject_script.textContent=String(njct)+'njct()'
document.body.appendChild(inject_script)