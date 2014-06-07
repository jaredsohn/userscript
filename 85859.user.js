// ==UserScript==
// @name Google Birthday Doodle
// @description change google.com.vn logo
// @namespace http://08th2d.net/doodle
// @include http://*.google.com.vn/
// @match http://*.google.com.vn/
// @source http://08th2d.net/doodle/birthday
// @author Tuzebra
// @version 1.0
// @date 2010-09-11
// @license MIT License
// ==/UserScript==

(function () {
	// Doodle Birthday  - rip by tuzebra@gmail - please don't delete thit line.
	try{
		// DEFINE SOME VALUE
		var maxMove=200,mouseX=-200,mouseY=-200,
			time=35,timer,listBall=[],logoElement,isIE,
			
			// cac bien phuc vu cho viec: drag/resize window -> cac qua bong bi lac lu
			bodyX,bodyY,bodyW,differenceBodyX=0,differenceBodyY=0,differenceBodyW=0,
			
			// css
			styleElement,cssText = "body{overflow:hidden;}.particle{position:absolute;z-index:-1;}.circle{-moz-border-radius:160px;-webkit-border-radius:160px;-khtml-border-radius:160px;border-radius:160px;}";
			
		// CREATE CSS
		styleElement = document.createElement("style");
		styleElement.type = "text/css";
		if(styleElement.styleSheet)
		styleElement.styleSheet.cssText = cssText;
		else
		styleElement.appendChild(document.createTextNode(cssText));
		document.getElementsByTagName("head")[0].appendChild(styleElement);
		
		// DEFINE SOME FUNCTION	
		var init=function(){
			logoElement = document.createElement("div");
			logoElement.style.position = "relative";
			logoElement.style.width = "380px";
			logoElement.style.height = "145px";
			var oldlogo = document.getElementById("logo")||document.getElementById("hplogo");
			oldlogo.style.display = "none";
			oldlogo.parentNode.appendChild(logoElement);
			if(logoElement){
				// đăng ký sự kiện mousemove
				document.addEventListener?
					document.addEventListener('mousemove',updateMousePosition,false):
					document.attachEvent('onmousemove',updateMousePosition);
					
				// bắt đầu tạo ra các quả bóng
				initBall();
			}
		},
		updateMousePosition=function(event){
			// khi di chuyển chuột thì sẽ thiết đặt lại maxMove = 200 ngay lập tức
			// còn khi không di chuyển thì maxmove sẽ tự động giảm dần (--2) để tạo hiệu ứng gia tốc
			maxMove=200;
			
			// set lại giá trị cho mouse X, Y
			mouseX=event.clientX-logoElement.offsetLeft;
			mouseY=event.clientY-logoElement.offsetTop;
		},
		getBodyPosition=function(){
			return [
				isIE?window.screenLeft:window.screenX,
				isIE?window.screenTop:window.screenY,
				document.body.clientWidth];
		},
		initBall=function(){
			isIE = window.navigator.userAgent.indexOf("MSIE")!=-1? true:false;
			
			// ve ra logo Google
			listBall=[
				createBall(202,78,9,"ed9d33"),	createBall(348,83,9,"d44d61"),	createBall(256,69,9,"4f7af2"),
				createBall(214,59,9,"ef9a1e"),	createBall(265,36,9,"4976f3"),	createBall(300,78,9,"269230"),
				createBall(294,59,9,"1f9e2c"),	createBall(45,88,9,"1c48dd"),		createBall(268,52,9,"2a56ea"),
				createBall(73,83,9,"3355d8"),		createBall(294,6,9,"36b641"),		createBall(235,62,9,"2e5def"),
				createBall(353,42,8,"d53747"),	createBall(336,52,8,"eb676f"),	createBall(208,41,8,"f9b125"),
				createBall(321,70,8,"de3646"),	createBall(8,60,8,"2a59f0"),		createBall(180,81,8,"eb9c31"),
				createBall(146,65,8,"c41731"),	createBall(145,49,8,"d82038"),	createBall(246,34,8,"5f8af8"),
				createBall(169,69,8,"efa11e"),	createBall(273,99,8,"2e55e2"),	createBall(248,120,8,"4167e4"),
				createBall(294,41,8,"0b991a"),	createBall(267,114,8,"4869e3"),	createBall(78,67,8,"3059e3"),
				createBall(294,23,8,"10a11d"),	createBall(117,83,8,"cf4055"),	createBall(137,80,8,"cd4359"),
				createBall(14, 71,8,"2855ea"),	createBall(331,80,8,"ca273c"),	createBall(25,82,8,"2650e1"),
				createBall(233,46,8,"4a7bf9"),	createBall(73,13,8,"3d65e7"),		createBall(327,35,6,"f47875"),
				createBall(319,46,6,"f36764"),	createBall(256,81,6,"1d4eeb"),	createBall(244,88,6,"698bf1"),
				createBall(194,32,6,"fac652"),	createBall(97,56,6,"ee5257"),		createBall(105,75,6,"cf2a3f"),
				createBall(42,4,6,"5681f5"),		createBall(10,27,6,"4577f6"),		createBall(166,55,6,"f7b326"),
				createBall(266,88,6,"2b58e8"),	createBall(178,34,6,"facb5e"),	createBall(100,65,6,"e02e3d"),
				createBall(343,32,6,"f16d6f"),	createBall(59,5,6,"507bf2"),		createBall(27,9,6,"5683f7"),
				createBall(233,116,6,"3158e2"),	createBall(123,32,6,"f0696c"),	createBall(6,38,6,"3769f6"),
				createBall(63,62,6,"6084ef"),		createBall(6,49,6,"2a5cf4"),		createBall(108,36,6,"f4716e"),
				createBall(169,43,6,"f8c247"),	createBall(137,37,6,"e74653"),	createBall(318,58,6,"ec4147"),
				createBall(226,100,5,"4876f1"),	createBall(101,46,5,"ef5c5c"),	createBall(226,108,5,"2552ea"),
				createBall(17,17,5,"4779f7"),		createBall(232,93,5,"4b78f1")
			];
			
			// lấy ra vị trí và độ rộng của body (window)
			var temp=getBodyPosition();
			bodyX=temp[0];	bodyY=temp[1];	bodyW=temp[2];
			
			// bắt đầu vẽ
			draw();
		},
		draw=function(){
			// lấy ra tọa độ hiện tại của window
			var temp=getBodyPosition();
			
			//tính toán độ chênh lệch giữa tọa độ cũ và mới
			differenceBodyX = temp[0]-bodyX;
			differenceBodyY = temp[1]-bodyY;
			differenceBodyW = temp[2]-bodyW;
			
			// update lại tọa độ window mới
			bodyX=temp[0];	bodyY=temp[1];	bodyW=temp[2];

			//
			maxMove=Math.max(0,maxMove-2);
			var stop = true,i;
			for(i=0;i<listBall.length;i++){
				listBall[i].update();
				if(stop)
					stop=listBall[i].stop;
			};
			
			// nếu như đang di chuyển các quả bóng thì tăng tốc draw (35), còn không thì không cần (250)
			time = stop?250:35;
			timer=window.setTimeout(draw,time);
		},
		createBall=function(positionX,positionY,width,color){
			return new BALL(positionX,positionY,width,color);
		},
		
		// DEFINE CLASS BALL
		BALL=function(positionX,positionY,width,color){
			this.positionX = this.positionStartX = positionX;
			this.positionY = this.positionStartY = positionY;
			this.width = this.widthStart = width;
			this.moveX = 100*(Math.random()-0.5);
			this.moveY = 100*(Math.random()-0.5);
			
			// 1 vài tham số random cho từng quả bóng
			// độ sợ chuột (vd:100 - bóng sẽ bắt đầu chạy khi cách chuột 100px)
			this.l = 3+Math.random()*98;
			// độ nặng của bóng - ảnh hưởng đến gia tốc và quán tính khi di chuyển bóng
			this.r = 0.1+Math.random()*0.4;
			this.e = 0;	// gia tốc
			this.g = 1;	// quán tính
			
			this.stop = false;
			
			//bắt đầu vẽ hình quả bóng
			this.element = document.createElement("div");
			this.element.className = "particle";
			this.style = this.element.style;
			
			// nếu là IE thì vẽ quả bóng = dấu chấm "." với font monospace
			if(isIE){
				this.element.innerHTML = ".";
				this.style.fontFamily = "Monospace";
				this.style.color = "#"+color;
				this.style.fontSize = "100px";
				this.style.lineHeight = 0;
				this.style.cursor = "default";
				
			// nếu không là IE thì vẽ quả bóng = css3
			}else{
				this.element.className += " circle";
				this.style.backgroundColor = "#"+color;
			}; 
			
			// append div mới tạo vào div#logo
			logoElement.appendChild(this.element);
		};
		// CLASS BALL METHOD
		BALL.prototype.update=function(){
			this.positionX += this.moveX;
			this.positionY += this.moveY;
			this.moveX = Math.min(50,Math.max(-50,(this.moveX+(differenceBodyX+differenceBodyW)/this.widthStart)*0.92));
			this.moveY = Math.min(50,Math.max(-50,(this.moveY+differenceBodyY/this.widthStart)*0.92));
			
			// tính ra chênh lệch giữa mouse và position của bóng
			var differenceMouseX = mouseX-this.positionX, differenceMouseY=mouseY-this.positionY,
			
			// chênh lệch chéo (dùng Pi-Ta-Go)
				differenceMouseZ = Math.sqrt(differenceMouseX*differenceMouseX + differenceMouseY*differenceMouseY);
				
			differenceMouseX /= differenceMouseZ;
			differenceMouseY /= differenceMouseZ;
			if(differenceMouseZ < maxMove){
				this.moveX -= differenceMouseX*this.l;
				this.moveY -= differenceMouseY*this.l;
				this.moveX += (0.005-this.e)*0.4;
				this.g = Math.max(0,this.g*0.9- 0.01);
				this.moveX *= 1-this.g;
				this.moveY *= 1-this.g;
			}else{
				this.e += (this.r-this.e)*0.005;
				this.g = Math.min(1,this.g+0.03);
			};
			
			// tính ra chênh lệch giữa tọa độ cũ và mới
			var differencePositionX = this.positionStartX-this.positionX,
			differencePositionY = this.positionStartY-this.positionY,
			differencePositionZ = Math.sqrt(differencePositionX*differencePositionX + differencePositionY*differencePositionY);
			
			// di chuyển quả bóng tương ướng theo độ to nhỏ
			// quả bóng càng to thì di chuyển càng ít, càng nhỏ thì di chuyển càng nhiều
			this.moveX += differencePositionX*this.e;
			this.moveY += differencePositionY*this.e;
			this.width = this.widthStart + differencePositionZ/8;
			
			// tính toán coi với độ chênh lệch đó thì có cần thực hiện các thay đổi hay không
			this.stop = differencePositionZ < 0.3 && this.moveX < 0.3 && this.moveY< 0.3;
			
			// thực hiện các thay đổi
			if(!this.stop){
				if(isIE){
					//nếu là IE thì sẽ thay đổi font size
					//tuy nhiên vẫn bị lag, nên tạm thời sẽ không cho thay đổi size luôn
					//this.style.fontSize=this.width*2*10+"px";
				}else{
					// nếu không phải là IE thì thay đổi width, height
					this.style.width=this.style.height = this.width*2+"px";
				};
				// thay đổi vị trí cho chính xác
				this.style.left = this.positionX-(isIE?20:0)+"px";
				this.style.top = this.positionY+"px";
			}
		};
		
		// START ANIMATE
		init();
	}catch(e){};
})();