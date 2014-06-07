// ==UserScript==
// @name                RiddleLimiter Plus +
// @namespace      hentaiverse.RiddleLimiter
// @description     修改小马图为点击选择
// @match               http://hentaiverse.org/?s=Battle*
// @version             1.0
// @author              ggxxsol,houson
// ==/UserScript==
if (document.getElementById('riddlemaster')!=undefined)
{
array = ['A', 'B', 'C'];
for (var i = 0; i < 3 ; i++ )
{
	ccc = document.createElement('div');
	ccc.style.cssText = "z-index:1000;border:red solid thin;width: 230px;height: 30px;position:relative;left:"+(350+i%3*240)+"px;top:"+(-675-i*32)+"px"
	ccc.onclick=function(){document.getElementById('riddlemaster').value=this.value; document.getElementById('riddleform').submit()}
	ccc.value=array[i]
	ccc.style.cursor='pointer'
	ccc.onmouseover=function(){this.style.background='rgba(63,207,208,0.20)'}
	ccc.onmouseout=function(){this.style.background=''}
	document.body.appendChild(ccc);
}
}