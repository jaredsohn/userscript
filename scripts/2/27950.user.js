// ==UserScript==
// @name           Random Content Scripts1
// @author         GuyintheMiddle-Livewares.blogspot.com
// @description    to make appear random contents in different page loads
// UserScript


if (document.getElementById)
document.documentElement.className = 'jsclass'; //hide content for DOM capable browsers


var randomcontentdisplay={
	divholders:new Object(),
	masterclass: "randomcontent",

	init:function(){
		if (!document.getElementById)
			return
		var alldivs=document.getElementsByTagName("div")
		var randomcontentsearch=new RegExp(this.masterclass+"\\s+(group\\d+)", "i") //check for CSS class="randomcontent groupX" (x=integer)
		for (var i=0; i<alldivs.length; i++){
			if (randomcontentsearch.test(alldivs[i].className)){
				if (typeof this.divholders[RegExp.$1]=="undefined") //if array to hold this group of divs doesn't exist yet
					this.divholders[RegExp.$1]=new Array() //create array first
					this.divholders[RegExp.$1].push(alldivs[i]) //add this div to the array
			}
		}
	this.showone()
	},

	showone:function(){
		for (group in this.divholders){ //loop thru each array within object
			var chosenOne=Math.floor(Math.random()*this.divholders[group].length) //randomly pick one entry from array
			this.divholders[group][chosenOne].style.display="block" //display content corresponding to the chosen entry
		}
	}
}
