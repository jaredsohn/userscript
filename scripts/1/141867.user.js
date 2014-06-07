// ==UserScript==
// @name          Turn to Retina!
// @include       *
// ==/UserScript==


function ConvolutionMatrix(input,effect){
	var  m = matrix = effect.matrix, 
		divisor = effect.divisor, 
		offset = effect.offset;
    // 创建一个输出的 imageData 对象
    var output = document.createElement("canvas")
                         .getContext('2d').createImageData(input);
 
    var w = input.width, h = input.height;
    var iD = input.data, oD = output.data;
 
    // 对除了边缘的点之外的内部点的 RGB 进行操作，透明度在最后都设为 255
    for (var y = 0; y < h; y += 1) {
        for (var x = 0; x < w; x += 1) {
            for (var c = 0; c < 3; c += 1) {
                var i = ( y * w + x) * 4 + c;
                if(y>0 && (y < h-1) && x>0 && (x < w-1)){					

	                oD[i] = offset
	                    +(m[0]*iD[i-w*4-4] + m[1]*iD[i-w*4] + m[2]*iD[i-w*4+4]
	                    + m[3]*iD[i-4]     + m[4]*iD[i]     + m[5]*iD[i+4]
	                    + m[6]*iD[i+w*4-4] + m[7]*iD[i+w*4] + m[8]*iD[i+w*4+4])
	                    / divisor;/**/
                 }else{
					oD[i] = iD[i];
				}
            }
            var n = (y*w + x)*4 + 3;
            oD[n] = iD[n]; // 设置透明度
        }
    }
    return output;
}


var imgs = []; [].slice.call(document.querySelectorAll('*')).forEach(function(item){if(item.tagName == 'IMG' || window.getComputedStyle(item).getPropertyValue('background-image') != 'none') imgs.push(item)});

var sharpening = {
	// matrix : [ 
		 // 0, -1,  0,
		// -1,  5, -1,
		 // 0, -1,  0 
	// ],
	matrix : [ 
		-1, -1, -1,
		-1,  9, -1,
		-1, -1, -1 
	],	
	divisor: 1,
	offset : 0
};


function runimg(){
imgs.forEach(function(item){
	var tmpCanvas = document.createElement('canvas'),
		tmpCtx = tmpCanvas.getContext('2d'),
		zoom = 2;
	//console.log('Deal with ' + item.outerHTML.substr(0,30) + '\n');
	var img, width, height;
	if(item.tagName == 'IMG') {
		img = item;
		width = parseInt( item.width * zoom );
		height = parseInt( item.height * zoom );
	}
	else if(window.getComputedStyle(item).getPropertyValue('background-image').match(/url\(/i)) {
		//img = window.getComputedStyle(item).getPropertyValue('background-image').replace(/url\(/i, '').replace(/\)/i, '').replace(/"|'/i, '');
		img = new Image();
		img.src = window.getComputedStyle(item).getPropertyValue('background-image').replace(/url\(/i, '').replace(/\)/i, '').replace(/"|'/ig, '');
		var hiddenEl = document.createElement('div');
		hiddenEl.style.display = 'none';
		document.body.appendChild(hiddenEl);
		hiddenEl.appendChild(img);
		width = img.width * zoom;
		height = img.height * zoom;
	}
	
	var simg = img.src;

	if(width && height) {
		var imgPixels;
		tmpCanvas.width = width;
		tmpCanvas.height= height;
		try{tmpCtx.drawImage(img,0,0,width,height);
		imgPixels = tmpCtx.getImageData(0, 0, width, height);} catch(err){};
		if(imgPixels) {
			imgPixels = ConvolutionMatrix(imgPixels, sharpening);
			tmpCtx.putImageData(imgPixels, 0, 0);
			
			if(item.tagName == 'IMG') {
				img.width = width/2;
				img.height = height/2;
				img.src= tmpCanvas.toDataURL();	
			}
			else {
				item.style.cssText +=';background-image: url(' + tmpCanvas.toDataURL() + '); background-size:' + width/2 + "px " + height/2 + 'px';
			}
			console.log('Deal with: ' + simg + '\n');
		}
		
		
	}
	

});
}

window.addEventListener('load', function(){
	var button = document.createElement('button');
	button.style.cssText = "position:fixed; top:20px; right:20px; background:#eee; color:#333; border: 2px solid #999; cursor: pointer";
	button.textContent = "TURN TO RETINA!";
	button.onclick = function(){runimg();}
	document.body.appendChild(button);
	
});

//@ sourceURL=hello.js