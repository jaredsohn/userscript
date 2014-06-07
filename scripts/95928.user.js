// ==UserScript==
// @name          Facebook - Rotate Images
// @version       1.0
// @author        Samuel Essig (http://c1b1.de)
// @description   Rotate any photo in a profile or album (in 90 degrees steps). Adds a "Rotate" link above the photo. A click on "Rot" will rotate anti-clockwise - "ate" clockwise
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2011, Samuel Essig (http://c1b1.de)
// @license       GNU General Public License (GPL)
// @include       *facebook.com*
// @icon          http://66mb.de/files/facebook_rotate_48px.png
// ==/UserScript==

function $(x) {
    var y = this.alert?this.document:this;
    var add = function(l) {
        for(var i = 0; i < l.length; i++){
            l[i].$ = $;
            li[i].addEvent = function(wh,fc) {
                this.addEventListener(wh,fc,false);
            };        
        }
        return l;
};
if(x[0] == '#') {
    var r = y.getElementById(x.substring(1));
    if(r) {
        r.$ = $;
        r.addEvent = function(wh,fc) {
            this.addEventListener(wh,fc,false);
        };
    }
    return r;
}
else if(x[0] == '.') {
    var r = y.getElementsByClassName(x.substring(1));
    return add(r);
}
else if(x[0] == '-') {
    var r = y.getElementsByName(x.substring(1));
    return add(r);
}
else if(x[0] == '+') {
    var tag = x.substring(1);
    var r = document.createElement(tag);
    r.$ = $;
    r.addEvent = function(wh,fc) {
        this.addEventListener(wh,fc,false);
    };
    return r;
}
else if(x[0] == '!') {
    var tag = x.substring(1);
    var r = $(tag);
    if(r) {
        r.parentNode.removeChild(r);
        return r;
    }
    return false;
}	
else if(x[0] == '"') {
    var text = x.substring(1,x.length-1);
    var r = document.createTextNode(text);
    return r;
}
else {
    var r = y.getElementsByTagName(x);
    return add(r);
}
}
var onURIchange_url = document.location.hash;
function onURIchange(fct) {
    var check = function(fct0) { 
        return function() {
            if(onURIchange_url.indexOf('l.php') == -1 && onURIchange_url  != document.location.hash) {
                window.setTimeout(fct0,1000);  
            }
            onURIchange_url = document.location.hash;
        };
    }(fct);
    window.setInterval(check,300);  
}


var deg = 90;
function rotImageReverse(ev) {
    deg += 180;
    rotImage();
}
function rotImage(ev) {
    $('!#myphoto_canvas');
    var canvas = $('+canvas');
    canvas.setAttribute('id','myphoto_canvas')
    var context = canvas.getContext('2d');
	
    var image = $('#myphoto');
		
    while(deg < 0) {
        deg = 360 - deg;
    }
    while(deg > 360) {
        deg = deg - 360;
    }		
		
    if(deg%180==0) {	
        canvas.setAttribute('width', image.width);
        canvas.setAttribute('height', image.height);
    } else {
        canvas.setAttribute('width', image.height);
        canvas.setAttribute('height', image.width);		
    }
		
    context.rotate(deg * Math.PI / 180);
			
		
    if(deg%360==0) {	
        context.drawImage(image, 0,0); 		  		
    } else if(deg%270==0) {
        context.drawImage(image, -image.width,0); 			
    } else if(deg%180==0) {	
        context.drawImage(image, -image.width,-image.height); 		
    } else {
        context.drawImage(image, 0, -image.height);         
    }		
		
    context.drawImage(image, deg%180==0?-image.width:0, deg%180==0?0:-image.height);
		
    image.style.display = 'none';
    image.parentNode.appendChild(canvas);
    deg += 90;
}
function addRotateLink() {
    if($('#myphoto')) {
        $('!#myphoto_canvas');	
        $('!#rot_link');	
	
        var span = $('+span')
        span.id = 'rot_link';
	
        var a0 = $('+a');
        a0.href = '#';
        a0.addEvent('click',rotImageReverse);
        a0.appendChild(document.createTextNode('Rot'));
        var a1 = $('+a');
        a1.href = '#';
        a1.id = 'rot_link1';
        a1.addEvent('click',rotImage);
        a1.appendChild(document.createTextNode('ate'));	
	
        span.appendChild($('" · "'));	
        span.appendChild(a0);
        span.appendChild(a1);	
        $('#photo_count').parentNode.appendChild(span);	
    }
}


addRotateLink();
onURIchange(addRotateLink);
