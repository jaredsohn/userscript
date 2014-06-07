// ==UserScript==
// @name           Valentines Day Mouse Hearts
// @description    Hearts Will Follow Your Mouse
// @include        http://www.google.com/*
// @include        https://www.facebook.com/*
// @version        1.0
// ==/UserScript==

// Manually included UserScript
// name           AK_HEARTS
// description    GreaseMonkey Script Configurator
// copyright      Akimbo Kittenz
// version        1.2.4
// /UserScript

<!-- this script got from www.javascriptfreecode.com-->
     
<div id="dot0" style="position: absolute; visibility: hidden; height: 11; width: 11;">
	<img src="http://www.javascriptfreecode.com/images/heart.gif" height=11 width=11>
</div>
<div id="dot1" style="position: absolute; height: 11; width: 11;">
	<img src="http://www.javascriptfreecode.com/images/heart.gif" height=11 width=11>
</div>
<div id="dot2" style="position: absolute; height: 11; width: 11;">
	<img src="http://www.javascriptfreecode.com/images/heart.gif" height=11 width=11>
</div>
<div id="dot3" style="position: absolute; height: 11; width: 11;">
	<img src="http://www.javascriptfreecode.com/images/heart.gif" height=11 width=11>
</div>
<div id="dot4" style="position: absolute; height: 11; width: 11;">
	<img src="http://www.javascriptfreecode.com/images/heart.gif" height=11 width=11>
</div>
<div id="dot5" style="position: absolute; height: 11; width: 11;">
	<img src="http://www.javascriptfreecode.com/images/heart.gif" height=11 width=11>
</div>
<div id="dot6" style="position: absolute; height: 11; width: 11;">
	<img src="http://www.javascriptfreecode.com/images/heart.gif" height=11 width=11>
</div>

<script LANGUAGE="JavaScript">
<!-- hide code

var nDots = 7;

var Xpos = 0;
var Ypos = 0;

  // fixed time step, no relation to real time
var DELTAT = .01;
  // size of one spring in pixels
var SEGLEN = 10;
  // spring constant, stiffness of springs
var SPRINGK = 10;
  // all the physics is bogus, just picked stuff to
  // make it look okay
var MASS = 1;
// Positive XGRAVITY pulls right, negative pulls left
// Positive YGRAVITY pulls down, negative up
var XGRAVITY = 0;
var YGRAVITY = 50;
// RESISTANCE determines a slowing force proportional to velocity
var RESISTANCE = 10;
  // stopping criterea to prevent endless jittering
  // doesn't work when sitting on bottom since floor
  // doesn't push back so acceleration always as big
  // as gravity
var STOPVEL = 0.1;
var STOPACC = 0.1;
var DOTSIZE = 11;
  // BOUNCE is percent of velocity retained when 
  // bouncing off a wall
var BOUNCE = 0.75;

var isNetscape = navigator.appName=="Netscape";

  // always on for now, could be played with to
  // let dots fall to botton, get thrown, etc.
var followmouse = true;

var dots = new Array();
init();

function init()
{
    var i = 0;
    for (i = 0; i < nDots; i++) {
        dots[i] = new dot(i);
    }
    
    if (!isNetscape) {
        // I only know how to read the locations of the 
        // <LI> items in IE
        //skip this for now
        // setInitPositions(dots)
    }
    
    // set their positions
    for (i = 0; i < nDots; i++) {
        dots[i].obj.left = dots[i].X;
        dots[i].obj.top = dots[i].Y;
    }
    
    
    if (isNetscape) {
        // start right away since they are positioned
        // at 0, 0
        startanimate();
    } else {
        // let dots sit there for a few seconds
        // since they're hiding on the real bullets
        setTimeout("startanimate()", 1000);
    }
}



function dot(i) 
{
    this.X = Xpos;
    this.Y = Ypos;
    this.dx = 0;
    this.dy = 0;
    if (isNetscape) {	
        this.obj = eval("document.dot" + i);
    } else {
        this.obj = eval("dot" + i + ".style");
    }
}


function startanimate() {	
    setInterval("animate()", 20);
}


// This is to line up the bullets with actual LI tags on the page
// Had to add -DOTSIZE to X and 2*DOTSIZE to Y for IE 5, not sure why
// Still doesn't work great
function setInitPositions(dots)
{
    // initialize dot positions to be on top 
    // of the bullets in the <ul>
    var startloc = document.all.tags("LI");
    var i = 0;
    for (i = 0; i < startloc.length && i < (nDots - 1); i++) {
        dots[i+1].X = startloc[i].offsetLeft
            startloc[i].offsetParent.offsetLeft - DOTSIZE;
        dots[i+1].Y = startloc[i].offsetTop +
            startloc[i].offsetParent.offsetTop + 2*DOTSIZE;
    }
    // put 0th dot above 1st (it is hidden)
    dots[0].X = dots[1].X;
    dots[0].Y = dots[1].Y - SEGLEN;
}

// just save mouse position for animate() to use
function MoveHandler(e)
{
    Xpos = e.pageX;
    Ypos = e.pageY;	  
    return true;
}

// just save mouse position for animate() to use
function MoveHandlerIE() {
    Xpos = window.event.x + document.body.scrollLeft;
    Ypos = window.event.y + document.body.scrollTop;	  
}

if (isNetscape) {
    document.captureEvents(Event.MOUSEMOVE);
    document.onMouseMove = MoveHandler;
} else {
    document.onmousemove = MoveHandlerIE;
}


function vec(X, Y)
{
    this.X = X;
    this.Y = Y;
}

// adds force in X and Y to spring for dot[i] on dot[j]
function springForce(i, j, spring)
{
    var dx = (dots[i].X - dots[j].X);
    var dy = (dots[i].Y - dots[j].Y);
    var len = Math.sqrt(dx*dx + dy*dy);
    if (len > SEGLEN) {
        var springF = SPRINGK * (len - SEGLEN);
        spring.X += (dx / len) * springF;
        spring.Y += (dy / len) * springF;
    }
}


function animate() {	
    // dots[0] follows the mouse,
    // though no dot is drawn there
    var start = 0;
    if (followmouse) {
        dots[0].X = Xpos;
        dots[0].Y = Ypos;	
        start = 1;
    }
    
    for (i = start ; i < nDots; i++ ) {
        
        var spring = new vec(0, 0);
        if (i > 0) {
            springForce(i-1, i, spring);
        }
        if (i < (nDots - 1)) {
            springForce(i+1, i, spring);
        }
        
        // air resisitance/friction
        var resist = new vec(-dots[i].dx * RESISTANCE,
            -dots[i].dy * RESISTANCE);
        
        // compute new accel, including gravity
        var accel = new vec((spring.X + resist.X)/MASS + XGRAVITY,
            (spring.Y + resist.Y)/ MASS + YGRAVITY);
        
        // compute new velocity
        dots[i].dx += (DELTAT * accel.X);
        dots[i].dy += (DELTAT * accel.Y);
        
        // stop dead so it doesn't jitter when nearly still
        if (Math.abs(dots[i].dx) < STOPVEL &&
            Math.abs(dots[i].dy) < STOPVEL &&
            Math.abs(accel.X) < STOPACC &&
            Math.abs(accel.Y) < STOPACC) {
            dots[i].dx = 0;
            dots[i].dy = 0;
        }
        
        // move to new position
        dots[i].X += dots[i].dx;
        dots[i].Y += dots[i].dy;
        
        // get size of window
        var height, width;
        if (isNetscape) {
            height = window.innerHeight + window.pageYOffset;
            width = window.innerWidth + window.pageXOffset;
        } else {	
            height = document.body.clientHeight + document.body.scrollTop;
            width = document.body.clientWidth + document.body.scrollLeft;
        }
        
        // bounce off 3 walls (leave ceiling open)
        if (dots[i].Y >=  height - DOTSIZE - 1) {
            if (dots[i].dy > 0) {
                dots[i].dy = BOUNCE * -dots[i].dy;
            }
            dots[i].Y = height - DOTSIZE - 1;
        }
        if (dots[i].X >= width - DOTSIZE) {
            if (dots[i].dx > 0) {
                dots[i].dx = BOUNCE * -dots[i].dx;
            }
            dots[i].X = width - DOTSIZE - 1;
        }
        if (dots[i].X < 0) {
            if (dots[i].dx < 0) {
                dots[i].dx = BOUNCE * -dots[i].dx;
            }
            dots[i].X = 0;
        }
        
        // move img to new position
        dots[i].obj.left = dots[i].X;			
        dots[i].obj.top =  dots[i].Y;		
    }
}

// end code hiding -->
</script>

<font face="Tahoma"><a target="_blank" href="http://www.javascriptfreecode.com/"><span style="font-size: 8pt; text-decoration: none">JavaScript Free Code</span></a></font>
