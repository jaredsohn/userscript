// ==UserScript==
// @name           Meepers
// @namespace      http://www.facebook.com/*
// @description    Text on fb
// @include        http://www.facebook.com/*
// @exclude        http://s*.ikariam.*/messages
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==



<script type="text/javascript">
<!-- Begin
/* This script and many more are available free online at
The JavaScript Source!! http://javascript.internet.com
Created by: HaganeNoKokoro :: http://tinyurl.com/buvp9 */

/*
 * Notes on hue
 *
 * This script uses hue rotation in the following manner:
 * hue=0   is red (#FF0000)
 * hue=60  is yellow (#FFFF00)
 * hue=120 is green (#00FF00)
 * hue=180 is cyan (#00FFFF)
 * hue=240 is blue (#0000FF)
 * hue=300 is magenta (#FF00FF)
 * hue=360 is hue=0 (#FF0000)
 *
 * Notes on the script
 *
 * This script should function in any browser that supports document.getElementById
 * It has been tested in Netscape7, Mozilla Firefox 1.0, and Internet Explorer 6
 *
 * Accessibility
 *
 * The script does not write the string out, but rather takes it from an existing
 * HTML element. Therefore, users with javascript disabled will not be adverely affected.
 * They just won't get the pretty colors.
 */

/*
 * splits par.firstChild.data into 1 span for each letter
 * ARGUMENTS
 *   span - HTML element containing a text node as the only element
 */
function toSpans(span) {
  var str=span.firstChild.data;
  var a=str.length;
  span.removeChild(span.firstChild);
  for(var i=0; i<a; i++) {
    var theSpan=document.createElement("SPAN");
    theSpan.appendChild(document.createTextNode(str.charAt(i)));
    span.appendChild(theSpan);
  }
}

/*
 * creates a rainbowspan object
 * whose letters will be colored [deg] degrees of hue
 * ARGUMENTS
 *   span - HTML element to apply the effect to (text only, no HTML)
 *   hue - what degree of hue to start at (0-359)
 *   deg - how many hue degrees should be traversed from beginning to end of the string (360 => once around, 720 => twice, etc)
 *   brt - brightness (0-255, 0 => black, 255 => full color)
 *   spd - how many ms between moveRainbow calls (less => faster)
 *   hspd - how many hue degrees to move every time moveRainbow is called (0-359, closer to 180 => faster)
 */
function RainbowSpan(span, hue, deg, brt, spd, hspd) {
    this.deg=(deg==null?360:Math.abs(deg));
    this.hue=(hue==null?0:Math.abs(hue)%360);
    this.hspd=(hspd==null?3:Math.abs(hspd)%360);
    this.length=span.firstChild.data.length;
    this.span=span;
    this.speed=(spd==null?50:Math.abs(spd));
    this.hInc=this.deg/this.length;
    this.brt=(brt==null?255:Math.abs(brt)%256);
    this.timer=null;
    toSpans(span);
    this.moveRainbow();
}

/*
 * sets the colors of the children of [this] as a hue-rotating rainbow starting at this.hue;
 * requires something to manage ch externally
 * I had to make the RainbowSpan class because M$IE wouldn't let me attach this prototype to [Object]
 */
RainbowSpan.prototype.moveRainbow = function() {
  if(this.hue>359) this.hue-=360;
  var color;
  var b=this.brt;
  var a=this.length;
  var h=this.hue;

  for(var i=0; i<a; i++) {

    if(h>359) h-=360;

    if(h<60) { color=Math.floor(((h)/60)*b); red=b;grn=color;blu=0; }
    else if(h<120) { color=Math.floor(((h-60)/60)*b); red=b-color;grn=b;blu=0; }
    else if(h<180) { color=Math.floor(((h-120)/60)*b); red=0;grn=b;blu=color; }
    else if(h<240) { color=Math.floor(((h-180)/60)*b); red=0;grn=b-color;blu=b; }
    else if(h<300) { color=Math.floor(((h-240)/60)*b); red=color;grn=0;blu=b; }
    else { color=Math.floor(((h-300)/60)*b); red=b;grn=0;blu=b-color; }

    h+=this.hInc;

    this.span.childNodes[i].style.color="rgb("+red+", "+grn+", "+blu+")";
  }
  this.hue+=this.hspd;
}
// End -->
</script>
</HEAD>

<!-- STEP TWO: Copy this code into the BODY of your HTML document  -->

<BODY>

<div align="center">
<h3 id="r1">This is a test of the RainbowSpan system</h3>
</div>
<script type="text/javascript">
var r1=document.getElementById("r1"); //get span to apply rainbow
var myRainbowSpan=new RainbowSpan(r1, 0, 360, 255, 50, 18); //apply static rainbow effect
myRainbowSpan.timer=window.setInterval("myRainbowSpan.moveRainbow()", myRainbowSpan.speed);
</script>

<div align="center">
<p id="r2">If you don't see a nifty moving rainbow above, then your browser doesn't understand my JavaScript.</p>
</div>
<script type="text/javascript">
var r2=document.getElementById("r2"); //get span to apply rainbow
var myRainbowSpan2=new RainbowSpan(r2, 0, 360, 255, 50, 348); //apply static rainbow effect
myRainbowSpan2.timer=window.setInterval("myRainbowSpan2.moveRainbow()", myRainbowSpan2.speed);
</script>

<p><center>
<font face="arial, helvetica" size"-2">Free JavaScripts provided<br>
by <a href="http://javascriptsource.com">The JavaScript Source</a></font>
</center><p>

<!-- Script Size:  4.85 KB -->