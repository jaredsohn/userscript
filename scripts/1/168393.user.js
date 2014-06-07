// ==UserScript==
// @name                RiddleLimiter Plus
// @namespace           hentaiverse.RiddleLimiter
// @description         修改小马图为点击选择
// @match               http://hentaiverse.org/?s=Battle*
// @version             1.52
// @author              ggxxsol
// ==/UserScript==
if (document.getElementById('riddlemaster')!=undefined)
{
array = ['A', 'B', 'C'];
for (var i = 0; i < 3 ; i++ )
{
	ccc = document.createElement('div');
	ccc.style.cssText = "font-size:50pt;line-height:2.5;color:rgba(223,137,208,0.7);z-index:100;width: 300px;height: 130px;position:absolute;left:"+(280+i*280)+"px;top:20px"
	ccc.onclick=function(){document.getElementById('riddlemaster').value=this.value; document.getElementById('riddleform').submit()}
	ccc.value=array[i]
		ccc.innerHTML=array[i]
	ccc.style.cursor='pointer'
	ccc.onmouseover=function(){this.style.background='rgba(63,237,208,0.50)'}
	ccc.onmouseout=function(){this.style.background=''}
	document.body.appendChild(ccc);
}
}