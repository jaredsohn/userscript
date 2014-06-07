// ==UserScript==
// @name                Opacity images
// @namespace	        http://www.oreilly.com/catalog/greasemonkeyhacks/
// @description	        Set to all images in pages opacity 0.1 On mouse over/out switch opacity between 1 and 0.1
// @include		http://*
// ==/UserScript==

function opacityImages(){

this.images = null;
this.minOpacity = '0.1';
this.maxOpacity = '1';

this.init = function(){
	var self = this;
	this.images = document.querySelectorAll('img');
	for (var i in this.images){
		if (this.images[i].style){
			this.images[i].style['opacity'] = this.minOpacity
			this.images[i].addEventListener('mouseover',function(){
				this.style['opacity']=self.maxOpacity;
			}, false);
		
			this.images[i].addEventListener('mouseout',function(){
				this.style['opacity']=self.minOpacity;
			}, false);
		}
	}
	
	this.createControl();
}

this.createControl = function(){
	var self = this;
	var body = document.getElementsByTagName('body')[0];
	var minOpacityField = document.createElement('input');
	minOpacityField.style['position'] = 'fixed';
	minOpacityField.style['bottom'] = '0px';
	minOpacityField.style['left'] = '0px';
	minOpacityField.style['width'] = '32px';
	minOpacityField.setAttribute('maxlength', '4');
	minOpacityField.addEventListener('keyup',function(){
		self.resetOpacity(this.value);
	},false);
	minOpacityField.value = this.minOpacity;
	body.appendChild(minOpacityField);
}

this.resetOpacity = function(opacity)
{
	if (parseFloat(opacity) == NaN || parseFloat(opacity) > 1 || parseFloat(opacity) < 0){
		return
	}
	this.minOpacity = opacity;
	for (var i in this.images){
		if (this.images[i].style){
			this.images[i].style['opacity'] = this.minOpacity;
		}
	}
}

this.init();

}

var opacityApp = new opacityImages();