// ==UserScript==
// @name           REFRESH
// @namespace      http://www.fluid.com
// @include        http://www.google.com/voice
// ==/UserScript==

<script language="JavaScript">

//configure refresh interval (in seconds)
var countDownInterval=5;
//configure width of displayed text, in px (applicable only in NS4)
var c_reloadwidth=200

</script>


<ilayer id="c_reload" width=&{c_reloadwidth}; ><layer id="c_reload2" width=&{c_reloadwidth}; left=0 top=0></layer></ilayer>

<script>

var countDownTime=countDownInterval+1;
function countDown(){
countDownTime--;
if (countDownTime <=0){
countDownTime=countDownInterval;
clearTimeout(counter)
window.location.reload()
return
}
if (document.all) //if IE 4+
document.all.countDownText.innerText = countDownTime+" ";
else if (document.getElementById) //else if NS6+
document.getElementById("countDownText").innerHTML=countDownTime+" "
else if (document.layers){ //CHANGE TEXT BELOW TO YOUR OWN
document.c_reload.document.c_reload2.document.write('Next <a href="javascript:window.location.reload()">refresh</a> in <b id="countDownText">'+countDownTime+' </b> seconds')
document.c_reload.document.c_reload2.document.close()
}
counter=setTimeout("countDown()", 1000);
}

function startit(){
if (document.all||document.getElementById) //CHANGE TEXT BELOW TO YOUR OWN
document.write('Next <a href="javascript:window.location.reload()">refresh</a> in <b id="countDownText">'+countDownTime+' </b> seconds')
countDown()
}

if (document.all||document.getElementById)
startit()
else
window.onload=startit

</script>