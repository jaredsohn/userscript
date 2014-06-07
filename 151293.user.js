// ==UserScript==
// @name        plette
// @namespace   about_bg_plette
// @include     http://localhost:8000
// @include	http://*
// @exclude	http://tieba.baidu.com/*
// @version     1.0
// ==/UserScript==

function getElementPosition(element, xPosition) { 
    var position = 0;
    if(element)
    {
        var elementOffsetParent = element.offsetParent;
        if(elementOffsetParent)
        {
            while((elementOffsetParent = element.offsetParent) != null)
            {
                if(xPosition)
                {
                    position += element.offsetLeft;
                }
                else
                {
                    position += element.offsetTop;
                }

                element = elementOffsetParent;
            }
        }
        else
        {
            // If getting the x position
            if(xPosition)
            {
                position = element.offsetLeft;
            }
            else
            {
                position = element.offsetTop;
            }
        }
    }

    return position;
}

var getXY=function(el){
        if (document.documentElement.getBoundingClientRect) { // IE,FF3.0+,Opera9.5+
           var box = el.getBoundingClientRect();
            return {x:box.left+document.body.scrollLeft,
                y:box.top+document.body.scrollTop }
        } else {
	
            var pos = [el.offsetLeft, el.offsetTop];
            var op = el.offsetParent;
            if (op != el) {
                while (op) {
                    pos[0] += op.offsetLeft + parseInt(op.style.borderLeftWidth) || 0;
                    pos[1] += op.offsetTop + parseInt(op.style.borderTopWidth) || 0;
                    op = op.offsetParent;
                }
            }
            return {x:pos[0],y:pos[1]}
	}
}

function $$(a){
		var c=/^\.{1}/
		var d=/^#{1}/
		if(c.test(a)){
			a=a.replace('.','');
			return document.getElementsByClassName(a);
		}
		else if(d.test(a)){
			a=a.replace('#','');
			return document.getElementById(a);
		}
		else{
			return document.getElementsByTagName(a);
		}			
}

function addStyle(str){
	var element=document.createElement('style');
	element.setAttribute('type','text/css');
	$$('body')[0].appendChild(element);
	element.innerHTML=str;
}

function getCssPath(event){
	var el=event.target;
	if(el.id){
		return '#'+el.id;
	}
	else{
		var csspath=[];
		var parentnode=el.parentNode;
		var parentid=false;
		csspath.push(el.className?'.'+el.className:el.tagName);
		while(parentnode!=null&&parentid==false){
			if(parentnode.id){
				csspath.unshift('#'+parentnode.id);
				parentid=true;
			}
			else{
				csspath.unshift(parentnode.className?'.'+parentnode.className:parentnode.tagName);
				parentnode=parentnode.parentNode;
			}
		}
		return csspath.join(' ');
	}
	event.preventDefault();
        event.stopPropagation();
}
			

var setData=function(imageData,x,y,value){
        imageData.data[((y*(imageData.width*4)) + (x*4)) + 0]=value[0]
        imageData.data[((y*(imageData.width*4)) + (x*4)) + 1]=value[1]
        imageData.data[((y*(imageData.width*4)) + (x*4)) + 2]=value[2]
        imageData.data[((y*(imageData.width*4)) + (x*4)) + 3]=value[3]
}
function HSVToRGB(h,s,v){
        var i;
        var f, p, q, t;
        var r,g,b;
        if( s == 0 ) {
            v = Math.floor(v*255);
            return {
                r:v,
                g:v,
                b:v
            };
        }
        h /= 60;
        i = Math.floor( h );
        f = h - i;
        p = v * ( 1 - s );
        q = v * ( 1 - s * f );
        t = v * ( 1 - s * ( 1 - f ) );
        switch( i ) {
            case 0:r = v;g = t;b = p;break;
            case 1:r = q;g = v;b = p; break;
            case 2: r = p;g = v;b = t;break;
            case 3:r = p;g = q;b = v;break;
            case 4:r = t;g = p;b = v;break;
            default:r = v;g = p;b = q;break;
        }
        return {
            r:r*255,
            g:g*255,
            b:b*255
        };
}
function changePlette(){};

var _csspath;
var selected_el=document.body;
var isSelected=false;

function innitDraw(){
	var canvasDiv=document.createElement('div');
	canvasDiv.setAttribute('id','canvasDiv');
	$$('body')[0].appendChild(canvasDiv);
	canvasDiv.innerHTML+="<div id='pletteheader'><div id='selectelement'>select</div><div id='csspath'>css path</div><a id='closeplette'>close</a></div>";
	$$('#canvasDiv').style.zIndex=10001;
	$$('#canvasDiv').style.width=380+'px';
	$$('#canvasDiv').style.height=260+'px';

	var can = document.createElement("canvas");
	var ctx=can.getContext('2d');
	var imageData=ctx.createImageData(360,160);
	can.setAttribute('id','plettecanvas');
	for(var i=0;i<160;i++){
      	for(var i2=0;i2<360;i2++){
            	pixel=HSVToRGB(i2,i/160,0.8)
            	setData(imageData,i2,i,[
                	pixel.r,
                	pixel.g,
                	pixel.b,
                	255
            	]);
            }
    	}

	ctx.putImageData(imageData, 0, 0);
	can.style.width=300+'px';
	can.style.height=160+'px';
	$$('#canvasDiv').appendChild(can);

	var changelight=document.createElement('div');
	changelight.setAttribute('id','changelight');
	$$("#canvasDiv").appendChild(changelight);
	$$('#changelight').innerHTML="<div id='addvalue'></div><input type='text' value='8' id='changeWidget'></a><div id='subvalue'></div>";
	$$("#canvasDiv").style.boxShadow=0+' '+0+' '+6+'px'+' '+'#000';
	//$$("#canvasDiv").style.top=screen.height/2-170+'px';
	//$$("#canvasDiv").style.left=screen.width/2-150+'px';
	
	$$('#selectelement').addEventListener('click',function(event){
		
		document.body.addEventListener('click',function(event){
			if(flag==1){
				if(isSelected==false){
					_csspath=getCssPath(event);
					selected_el=event.target;
					//alert(_csspath);
					isSelected=true;
					event.preventDefault();
					event.stopPropagation();
				}
				if(event.target.id=='selectelement'){
					isSelected=false;
				}
				
			}
		},true);
		event.preventDefault();
            	event.stopPropagation();
         },true);
	
	$$('#closeplette').onclick=function(){
		$$("#canvasDiv").style.display='none';
		flag=0;
	}
	
	$$("#changeWidget").onchange=changePlette;
	changePlette.prototype.light=parseInt($$('#changeWidget').value)/10;
        changePlette.prototype.putimgdata=function(light){
        	var _light=light?light:this.light;
        	ctx.clearRect(0,0,360,160);
        	for(var i=0;i<160;i++){
            		for(var i2=0;i2<360;i2++){
                		pixel=HSVToRGB(i2,i/160,_light);
                		setData(imageData,i2,i,[
                    			pixel.r,
                    			pixel.g,
                    			pixel.b,
                    			255
                		]);
            		}
        	}
        	ctx.putImageData(imageData, 0, 0);
        };
     	//}
     	var codearea=document.createElement('textarea');
     	codearea.setAttribute('id','codearea');
     	codearea.setAttribute('placeholder','css rgb code');
     	$$('#canvasDiv').appendChild(codearea);
     
     	addStyle("#pletteheader{height:35px;background:#aaa;cursor:move;}#canvasDiv{height:260px;width:390px;background:#eee;top:170px;left:440px;position:fixed;}#selectelement{width:30px;float:left;background-image:url('./1.gif');cursor:default;}#csspath{width:105px;float:left;text-align:center;cursor:pointer;}#closeplette{width:40px;float:right;cursor:pointer;}#changelight{width:50px;float:right;margin-right:0px;height:160px;}#changeWidget{background:#def;width:36px;height:30px;display:block;text-align:center;}#addvalue{width:0px;height:0px;cursor:pointer;border-left:18px solid transparent;border-right:18px solid transparent;border-bottom:36px solid rgba(50,200,80,0.3);}#subvalue{width:0px;height:0px;cursor:pointer;border-left:18px solid transparent;border-right:18px solid transparent;border-top:36px solid rgba(50,200,80,0.3);}#rgbstr{display:block;background:#def;margin-bottom:0;}#codearea{width:370px;height:50px;background:#efe;}");
    
    	$$("#plettecanvas").onclick=function(e){
    		var canvasPos=getXY($$("#plettecanvas"));
        	var x=e.pageX-canvasPos.x;
        	var y=e.clientY-canvasPos.y;
        	var rgb=HSVToRGB(x,y/160,parseInt($$("#changeWidget").value)/10);
        	var color="RGB("+Math.round(rgb.r)+","+Math.round(rgb.g)+","+Math.round(rgb.b)+")";
        	selected_el.style.setProperty('background-color',color,'important');
        	$$('#codearea').value=_csspath+'{\nbackground:'+color+';\n}';
    	}
    
    	/* move function */
	var dialog_selected=false;
	var offsetx=0;
	var offsety=0;
	$$("#pletteheader").addEventListener('mousedown', function(event) {
        	dialog_selected = true;
        	//offsetx = event.clientX-getElementPosition(event.target, true);
        	//offsety = event.clientY-getElementPosition(event.target, false);
        	var offsetxy=getXY(event.target);
        	offsetx=event.clientX-offsetxy.x;
        	offsety=event.clientY-offsetxy.y;
        	event.preventDefault();
        	event.stopPropagation();
    	}, true);
    
    	$$('#pletteheader').addEventListener('mouseup', function(event) {
        	dialog_selected = false;
        	event.preventDefault();
        	event.stopPropagation();
    	}, true);
    
	$$('#canvasDiv').addEventListener("mousemove", handle_move, false);
	function handle_move(event) {
		if (dialog_selected) {
			this.style.left = (event.clientX-offsetx)+'px';
            		this.style.top = (event.clientY-offsety)+'px';
        	}
	}
	
	
	$$("#addvalue").onclick=function(){
		
		var light=($$('#changeWidget').value=parseInt($$('#changeWidget').value)+1);
		__PROTO__:changePlette.prototype.putimgdata(light/10);
	}
	$$("#subvalue").onclick=function(){
		
		var light=($$('#changeWidget').value=parseInt($$('#changeWidget').value)-1);
		__PROTO__:changePlette.prototype.putimgdata(light/10);
	}
        
	

}


var openDiv=document.createElement('div');
openDiv.setAttribute('id','opendiv');
$$('body')[0].appendChild(openDiv);

$$('#opendiv').style.top=screen.height/2-90+'px';
addStyle("#opendiv{width:35px;height:30px;background:rgba(20,150,250,0.3);position:fixed;right:0}");
var flag=0;
var inited=0;
$$("#opendiv").onclick=function(){
	if(inited==0){
		innitDraw();
		inited=1;
		flag=1;
	}
	else{
		$$("#canvasDiv").style.display='block';
		flag=1;
	}
}
