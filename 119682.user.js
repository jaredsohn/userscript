// ==UserScript==
// @id 			  Path2.0-Menu
// @name          Path2.0 Menu
// @description   Path2.0 Menu
// @include       *
// @version       1.2.1
// @run-at        document-end
// ==/UserScript==

  

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
  var script = document.createElement("script");
  script.setAttribute("src", "http://jqueryrotate.googlecode.com/files/jQueryRotateCompressed.2.1.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var css='.PathMenu *{padding:0;margin:0}.PathMenu{position:absolute;}.PathInner{position:relative;}.PathInner a {position:absolute;display:block;overflow:hidden;background-position:center;background-repeat:no-repeat;z-index:999;}.PathInner a span{width:100%;height:100%;background-position:center;background-repeat:no-repeat;display:block;}.PathInner a.PathMain{z-index:1000}';
addGlobalStyle(css);

// the guts of this userscript
function main() {
  alert("There are " + $('a').length + " links on this page.");
}

// load jQuery and execute the main function
addJQuery(PathShow);




function PathShow(){
	//位置,长宽,CSS
	var PathPosition = {position:'fixed',right:100,top:100,width:104,height:104};
	
	//方向 右上，右下，左下，左上
	var Path = 3;
	
	//半径
	var Radius = 300;
	
	//弹出初始速度
	var OutSpeed = 80;
	
	//弹出递增速度
	var OutIncr = 80;
	
	//收回初始速度
	var InSpeed = 480;
	
	//收回递增速度
	var InIncr = -80;
	
	//回弹偏移像素
	var Offset = 20;
	
	//回弹速度
	var OffsetSpeed = 100;
	
	//子按钮个数
	var ICount = 5;
	
	//按钮默认格式，格式：{'bg':'(option)','css':'(option)','cover':'(option)'};
	var Button = {'bg':'https://github.com/ben304/Path2.0-Menu/raw/master/Path/bg-item-2x.png','css':{width:104,height:104},'cover':'https://github.com/ben304/Path2.0-Menu/raw/master/Path/star-2x.png'};	
		
	//主按钮数据，格式参考上面
	var mainButton = [
		//正常时
		{'bg':'https://github.com/ben304/Path2.0-Menu/raw/master/Path/bg-2x.png','css':'','cover':'https://github.com/ben304/Path2.0-Menu/raw/master/Path/icon-2x.png'},
		//弹出时
		{'bg':'','css':'','cover':'','angle':-135,'speed':200},
	];

	//子按钮数据，格式参考上面
	var itemButtons = [
		{'bg':'','css':'','cover':'https://github.com/ben304/Path2.0-Menu/raw/master/Path/Icon/moment_icn_home.png','href':'http://www.google.com'},
		{'bg':'','css':'','cover':'https://github.com/ben304/Path2.0-Menu/raw/master/Path/Icon/moment_icn_thought.png','href':'http://www.google.com/reader'},
		{'bg':'','css':'','cover':'https://github.com/ben304/Path2.0-Menu/raw/master/Path/Icon/moment_icn_person.png','href':'http://www.google.com/mail'},
		{'bg':'','css':'','cover':'https://github.com/ben304/Path2.0-Menu/raw/master/Path/Icon/moment_icn_awake.png','href':'http://www.google.com/images'},
		{'bg':'','css':'','cover':'https://github.com/ben304/Path2.0-Menu/raw/master/Path/Icon/moment_icn_place.png','href':'http://www.google.com/news'},
		{'bg':'','css':'','cover':'https://github.com/ben304/Path2.0-Menu/raw/master/Path/Icon/moment_icn_music.png','href':'http://www.google.com/music'}
		//......
	];	
	
	
	//生成按钮<a class="PathMain"><span></span></a>		<a class="PathItem"><span></span></a>
	var str='<a class="PathMain"><span></span></a>';
	for(i=0;i<ICount;i++){
		str	+= '<a class="PathItem"><span></span></a>';
	}
	var PathMenu = $(str);
	var PathStatus = 0;
		
	PathMenu.each(function(ID){
		//alert(i);
		//赋予默认数据
		if(Button['bg']!='') $(this).css('background',"url("+Button['bg']+") center no-repeat")
		if(Button['css']!='')  $(this).css(Button['css']);
		if(Button['cover']!='') $(this).children().css('background','url('+Button['cover']+') center no-repeat');
		
		//主按钮
		if($(this).hasClass('PathMain')){
			if(mainButton[0]['bg']!='') $(this).css('background','url('+mainButton[0]['bg']+') center no-repeat')
			if(mainButton[0]['css']!='') $(this).css(mainButton[0]['css']);
			if(mainButton[0]['cover']!='') $(this).children().css('background','url('+mainButton[0]['cover']+') center no-repeat');	
			$(this).click(function(){PathRun(PathMenu)});		
		}
		//子按钮
		else if ($(this).hasClass('PathItem')){
			var ItemID = $(PathMenu).filter('.PathItem').index($(this));
			if(itemButtons[ItemID]['bg']!='') $(this).css('background','url('+itemButtons[ItemID]['bg']+') center no-repeat');
			if(itemButtons[ItemID]['css']!='') $(this).css(itemButtons[ItemID]['css']);
			if(itemButtons[ItemID]['cover']!='') $(this).children().css('background','url('+itemButtons[ItemID]['cover']+') center no-repeat');	
			if(itemButtons[ItemID]['href']!='') $(this).attr({'href':itemButtons[ItemID]['href'],'target':'_blank'});
		}
	});
	
	
	
	//整理数据
	var angle = Math.PI/((ICount-1)*2);	
		
	function PathRun(PathMenu){
		var PathItems = PathMenu.filter('.PathItem').slice(0,ICount);
		if(PathStatus == 0){
			//var PathItems = PathMenu.filter('.PathItem');
			var Count = PathItems.size();
			PathItems.each(function(SP){
				var ID = $(this).index(); //由1开始
				if (ID == 1) {
					var X = Radius;
					var Y = 0; 
					var X1 = X + Offset;
					var Y1 = Y;
				
				}
				else if (ID == Count){
					var X = 0;
					var Y = Radius;
					var X1 = X;
					var Y1 = Y + Offset;				
					
				}
				else {
					var X = Math.cos(angle * (ID - 1)) * Radius;
					var Y = Math.sin(angle * (ID - 1)) * Radius;
					var X1 = X + Offset;
					var Y1 = Y + Offset;
				}
				
				if(Path==2){Y=-Y;Y1=-Y1}
				else if(Path==3){X=-X;Y=-Y;X1=-X1;Y1=-Y1}
				else if(Path==4){X=-X;X1=-X1}				
	
				$(this).animate({left:X1,bottom:Y1},OutSpeed+SP*OutIncr,function(){
						$(this).animate({left:X,bottom:Y},OffsetSpeed);
				});	
				
				if(mainButton[1]['angle']){
					PathMenu.filter('.PathMain').children().rotate({
						duration:mainButton[1]['speed'],
						//angle: mainButton[1]['angle'], 
						animateTo:mainButton[1]['angle']
					});
				}
			
			});
			PathStatus = 1;
		}
		else if(PathStatus == 1){
			PathItems.each(function(SP){
				if(parseInt($(this).css('left'))==0) {X1 = 0;}
				else {
					if(Path <=2)
						X1 = parseInt($(this).css('left')) + Offset;
					else if(Path >=3)
						X1 = parseInt($(this).css('left')) - Offset;
				}
				
				if(parseInt($(this).css('bottom'))==0) {Y1 = 0}
				else {
					if(Path==3 || Path==2)
						Y1 = parseInt($(this).css('bottom')) - Offset;
					else if(Path ==1 || Path == 4)
						Y1 = parseInt($(this).css('bottom')) + Offset;					
				}

				$(this).animate({left:X1,bottom:Y1},OffsetSpeed,function(){
					$(this).animate({left:0,bottom:0},InSpeed+SP*InIncr);
					
				});
				
				if(mainButton[1]['angle']){
					PathMenu.filter('.PathMain').children().rotate({
						duration:mainButton[1]['speed'],
						//angle: mainButton[1]['angle'], 
						animateTo:0
					});
				}
			});
			
			PathStatus = 0;
		}
		
	}
	
	var PathMenuA = $('<div class="PathMenu"><div class="PathInner"></div></div>');
	PathMenuA.filter('.PathMenu').css(PathPosition);
	PathMenuA.children().css({'width':PathPosition['width'],'height':PathPosition['height']});
	PathMenu.appendTo(PathMenuA.children());	
	PathMenuA.appendTo($('body'));

}
