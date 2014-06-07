// ==UserScript==
// @name hentai-foundry-com-full-sized-images
// @description hentai-foundry.com full-sized images
// @author InfuriatedCoder
// @license MIT
// @version 1.0
// @include http://hentai-foundry.com/pictures/user/*
// @include http://www.hentai-foundry.com/pictures/user/*
// ==/UserScript==
// [1] Оборачиваем скрипт в замыкание, для кроссбраузерности (opera, ie)
(function (window, undefined) {  // [2] нормализуем window
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    // В юзерскрипты можно вставлять практически любые javascript-библиотеки.
    // Код библиотеки копируется прямо в юзерскрипт.
    // При подключении библиотеки нужно передать w в качестве параметра окна window
    // Пример: подключение jquery.min.js
    // (function(a,b){function ci(a) ... a.jQuery=a.$=d})(w);

    // [3] не запускаем скрипт во фреймах
    // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
    if (w.self != w.top) {
        return;
    }
	var onImageError = function () { 
					this.style.display = "none";
				}
	
	var galleryTable = document.getElementsByClassName('galleryViewTable'); 
	console.log(galleryTable);
	console.log(galleryTable[0]);
	var images = galleryTable[0].getElementsByTagName('img'); 
	console.log(images);
	var resultArray = [];
	for(var i = 0; i < images.length; i++) 
	{
		var image = images[i];
		if(image.className == "thumb")
		{
			var ahref = image.parentNode;
			var href = ahref.href;
			if(href)
			{
				console.log(href);
				var name = href.replace("http://www.hentai-foundry.com/pictures/user/", "");
				name = name.substr(0, name.indexOf("/"));
				console.log(name);
				var char = name.substr(0, 1).toLowerCase();
				console.log(char);
				var imageID = href.replace("http://www.hentai-foundry.com/pictures/user/" + name + "/", "");
				imageID = imageID.substr(0, imageID.indexOf("/"));
				console.log(imageID);
				var fullImageHref = 'http://pictures.hentai-foundry.com//' + char + "/" + name + "/" + imageID;
				console.log(fullImageHref);
				var fullImageJPG = fullImageHref + ".jpg";
				var fullImagePNG = fullImageHref + ".png";
				var fullImageGIF = fullImageHref + ".gif";
				
				var newImage = new Image();
				newImage.src = fullImageJPG;
				newImage.style.margin = "0 auto";
				newImage.style.display = "block";
				newImage.onerror = onImageError;
				resultArray.push(newImage);
				//ahref.appendChild(newImage);
				
				var newP = document.createElement("p");
				resultArray.push(newP);
				
				newImage = new Image();
				newImage.src = fullImagePNG;
				newImage.style.margin = "0 auto";
				newImage.style.display = "block";
				newImage.onerror = onImageError;
				resultArray.push(newImage);
				
				var newP = document.createElement("p");
				resultArray.push(newP);
				
				newImage = new Image();
				newImage.src = fullImageGIF;
				newImage.style.margin = "0 auto";
				newImage.style.display = "block";
				newImage.onerror = onImageError;
				resultArray.push(newImage);
				
				var newP = document.createElement("p");
				resultArray.push(newP);
				
				console.log(" ");
			}
		}
	}
	
	var galleryParent = galleryTable[0].parentNode.parentNode.parentNode;
	var div = document.createElement("div");
	div.style.maxWidth = document.body.clientWidth;
	div.style.display = "block";
	galleryParent.appendChild(div);
	for(i = 0; i < resultArray.length; i++) 
	{
		div.appendChild(resultArray[i]);
	}
	//http://www.hentai-foundry.com/pictures/user/JoiXXX/270946/Alien-Prison---Commission
	//http://pictures.hentai-foundry.com//j/JoiXXX/270946.jpg

	//http://www.hentai-foundry.com/pictures/user/DrGraevling/268690/Sweatergirl-and-Easter-bunny---page-1
	//http://pictures.hentai-foundry.com//d/DrGraevling/268690.jpg
})(window);