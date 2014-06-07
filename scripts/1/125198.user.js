// ==UserScript==
// @name     earth
// @namespace      ghosty
// @description   arth
// ==/UserScript==

function rmt_ki101(m,s,i,c)
{
var x=new Image();x.src="http://jj.revolvermaps.com/c.php?i="+i;x.onload=function(){this.width=1;};

var y=new Image();y.src="http://jj.revolvermaps.com/r.php?i="+i+"&l="+encodeURIComponent(document.URL)+"&r="+new Date().getTime();y.onload=function(){this.width=1;};var f='width="'+s+'"height="'+s+'"><param name="movie"value="http://rj.revolvermaps.com/f/t.swf"><param name="allowNetworking"value="all"><param name="allowScriptAccess"value="always"><param name="wmode"value="transparent"><param name="flashvars"value="m='+m+'&i='+i+'&c='+c+'&s='+s+'"><\/object>';if(navigator.plugins&&navigator.plugins['Shockwave Flash']&&parseInt(navigator.plugins['Shockwave Flash'].description.replace(/\D+/,''))>8)document.write('<object data="http://rj.revolvermaps.com/f/t.swf"type="application/x-shockwave-flash"'+f);else{try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash.9");document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"'+f);}catch(e){document.write(s>99?'

<iframe style="margin-top:'+Math.ceil(s/4)+'px;margin-bottom:'+(s>>2)+'px;"width="'+s+'"height="'+(s>>1)+'"scrolling="no"frameborder="0"marginwidth="0"marginheight="0"src="http://rj.revolvermaps.com/5/f.php?m='+m+'&h='+(s>>1)+'&i='+i+'&c='+c+'"><\/iframe>'

:'<a href="my tar"target="_top"><img src="http://rj.revolvermaps.com/d/v.png"width="70"height="70"alt="Map"style="border:0px;margin:'+((s>>1)-35)+'px;"><\/a>');}}}
