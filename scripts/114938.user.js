// ==UserScript==
// @name           fotki-slideshow
// @namespace      FotkiSlideshow
// @include        *fotki.yandex.ru/*
// @version		   0.2	
// ==/UserScript==

if (location.href.indexOf('view') > -1) { 
	
	//console.log('try to load jQuerry and proceed');
		
	// load jQuery and execute the main function
	addJQuery(main);   
}

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main(){

	//console.log('entering main function');
	
    $('#js-darkBackground').bind('click', function(evnt){
		if(!($.yash)){
			//console.log('try to initialize and bind events');
			
			$.yash = new YaSlideshow();
			$.yash.bindEvents();
			
			//console.log('done initialize and event binding');
		}
	});

	function YaSlideshow() {
		
		//console.log('enter YaSlideshow constructor');
	
		this.next = null;
		this.prev = null;
		 
		//console.log('try to parse carousel data: ');
		
		var c = null;
		var onclick = $($('#foto-listing')[0]).attr('onclick');
		if(typeof onclick == 'function'){
			c = onclick();
		}else{
			var dataText = onclick.toString();
			dataText = dataText.replace('return', '');
			c = eval('(' + dataText + ')');
		}
		
		c = c['carousel'];
		
		//console.log('end paarse carousel data');
		//console.log(c);

		this.server = c.server;
	   
		//album
		this.album = c.query_params.album;
	   
		//author
		this.author = c.query_params.author;
		//page
		this.page = c.page;
	 
		this.pages = c.total_pages;
		//size
		var imgSRC = $('#fotka-view img')[0].src;
		var curentSize = '';
		for(var i = imgSRC.length - 1; i >= 0; i--){
			if(imgSRC[i] == '_'){
				break;
			}
			curentSize = imgSRC[i] + curentSize;
		}
	   
		this.size = curentSize;
	   
		this.curentImage = c.image;

		var data = {
			'album' : this.album,
			'author' : this.author,
			'page' : this.page,
			//яндекс хоть и принимает этот параметр, возвращает всеравно XXS (см. handleCarouselPageLoaded)
			'size' : this.size
		}

		//console.log('try to send ajax request with parametsrs');
		//console.log(data);
		
		$.ajax({
			url: this.server,
			context: this,
			success: this.handleCarouselPageLoaded,
			'data': data,
			dataType : 'json'
		});
	   
		this.initialized = true;
	}

	YaSlideshow.prototype.handleCarouselPageLoaded = function(data){
		
		//console.log('handleCarouselPageLoaded (ajax done successfuly) with answer data: ');
		//console.log(data);
		
		this.curentPageImages = data.images;
	   
		if(this.curentIndex != -1){
			for(var i = 0; i < data.images.length; i++){
				if(data.images[i].id == this.curentImage){
					this.curentIndex = i;
					break;
				}     
			}
		}

		//console.log('curent page images is');
		//console.log(this.curentPageImages);
		
		for(var i = 0; i < this.curentPageImages.length; i++ ){
			//Хоть и просили фото текущего размера яндекс возвращает ссылку на XXS версию
			this.curentPageImages[i].url = this.curentPageImages[i].url.toString().replace('_XXS', '_' + this.size);
		}
	   
		if(undefined !== this.curentIndex && this.curentPageImages[this.curentIndex + 1]){
			this.next = this.curentPageImages[this.curentIndex + 1];
		}

		//лениво придумывать более изящное решение
		if(this.curentIndex != -1){
			if(undefined !== this.curentIndex && this.curentPageImages[this.curentIndex - 1]){
				this.prev = this.curentPageImages[this.curentIndex - 1];
			}
		}
		
		//console.log('done initializing references to next and prev image');
	},

	YaSlideshow.prototype.bindEvents = function(){
		var thisClosure = this;
		$(document).bind('keydown', function(evnt){
			thisClosure.keyDownHandler.apply(thisClosure, [evnt]);
		});
	};

	YaSlideshow.prototype.keyDownHandler = function(evnt){
		//enter
		if(evnt.which == 13){
			if(evnt.ctrlKey){
				this.play();
			}
			else{
				this.stop();
			}
		  
			this.goNext();
		}
	};

	YaSlideshow.prototype.play = function(){
		thisClosure = this;
		this.playTimer = window.setTimeout(function(){
			thisClosure.goNext();
			thisClosure.play();
		}, 3000);
	};

	YaSlideshow.prototype.stop = function(){
		if(this.playTimer){
			window.clearTimeout(this.playTimer);
		}
	};

	YaSlideshow.prototype.goNext = function(){
		if(this.next){
			this.getImgSize(this.next, this.switchImage);

			this.curentIndex++;
			this.prev = this.curentPageImages[this.curentIndex - 1];
		  
			if(this.curentPageImages.length > this.curentIndex + 1){
				this.next = this.curentPageImages[this.curentIndex + 1];
			}
		  
			if(this.curentPageImages.length - 1 == this.curentIndex){
			 
				//если мы не на последней странице
				if(this.page < this.pages - 1){
				
					this.curentIndex = -1;
					this.page++;
				
					$.ajax({
						url: this.server,
						context: this,
						success: this.handleCarouselPageLoaded,
						data: {
							'album' : this.album,
							'author' : this.author,
							'page' : this.page,
							//яндекс хоть и принимает этот параметр, возвращает всеравно XXS (см. handleCarouselPageLoaded)
							'size' : this.size
						},
						dataType : 'json'
					});
				}
				else{
					this.stop();
				}
			}
		}
		else{
			this.stop();	
		}
	};

	YaSlideshow.prototype.getImgSize = function(imgObj, callback){
		
		var tmp = document.createElement('img');
		
		tmp.style.position = 'absolute';
		tmp.style.zIndex = -1;
		tmp.style.left = '-1000px';
		tmp.style.top = '-1000px';
		tmp.style.opacity = '0.00001';
		document.body.appendChild(tmp);
		
		var tmpClosure = tmp;
		var imgObjClosure = imgObj;
		var callbackClosure = callback;
		
		$(tmp).bind('load', function(){
			imgObjClosure.h = tmpClosure.clientHeight;
			imgObjClosure.w = tmpClosure.clientWidth;
			
			callbackClosure(imgObjClosure);
			
			document.body.removeChild(tmpClosure);
		});
		
		tmp.src = imgObj.url;
	}

	YaSlideshow.prototype.switchImage = function(newOne){
		var oldImg = $(".dark-image img")[0];

		var width = parseInt(newOne.w);
		var height = parseInt(newOne.h);
		
		var x = Math.floor(($(window).width() - width) / 2);
		var y = Math.floor(($(window).height() - height) / 2);
		
		oldImg.style.width = width + 'px';
		oldImg.style.height = height + 'px';
		
		oldImg.parentNode.style.left = x + 'px';
		oldImg.parentNode.style.top = y + 'px';
		
		oldImg.src = newOne.url;
	};

}