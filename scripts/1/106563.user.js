// ==UserScript==
// @id             jie_ya_ma
// @name           解鸭码
// @namespace      https://www.253874.com
// @include        https://www.253874.com/*
// ==/UserScript==
function find_all_node(node,proc)
{
	var result = [];
	function _helper(n)
	{
		try
		{
			if (proc(n))
			{
				result.push(n);
			}
		}
		catch(e){}
		
		for(var i in n.childNodes)
		{
			_helper(n.childNodes[i]);
		}
	}
	_helper(node);
	return result;
}
/*
	find tag like: <div></div>
				   <div>
						<font></font>
				   </div>
*/
function tryNewGaFontTag(fontNode)
{
	var face = fontNode.face;
	if (['Webdings','Wingdings','Wingdings 2','Wingdings 3','MS Reference Specialty'].indexOf(face)<0) return false;
	
	var div1 = fontNode.parentNode;
	if (div1.tagName != "DIV")
		div1 = div1.parentNode;
	if (!div1 || div1.tagName != "DIV") return false;
	
	div2 = div1.previousSibling;
	if (!div2 || div2.tagName != "DIV") return false;

	var text = fontNode.textContent;
	var btn = document.createElement("button");
	btn.innerHTML = "解勒个码";
	btn.addEventListener("click",function(){
		translateNewGaCode(text,fontNode,btn);
	},false);
	div2.appendChild(btn);
	return true;
}

function translateNewGaCode(text,fontNode,button)
{
	function writeResult(html)
	{
		fontNode.style.width = '';
		fontNode.parentNode.style.width = '';
		fontNode.face = '';
		fontNode.innerHTML = html;
		button.parentNode.removeChild(button);
	}
	function writeError(html)
	{
		button.innerHTML = html;
	}
	button.innerHTML = "解码中。。。。";
	button.disabled = true;
	var obj = {};
	obj.method = "POST";
	obj.url = "http://sunyanzi.tamiaode.com/?mosaic";
	obj.headers = 
	{
		"Content-Type":"application/x-www-form-urlencoded",
		"Cookie":document.cookie
	};
	obj.data = "submit=%CD%E6%C0%DB%C1%CB%A3%AC%BB%D8%BC%D2%A3%A1&text="+escape(text).replace(/\+/g,"%2B").replace(/\@/g,"%40");
	obj.onload = function(resp)
	{
		if (resp.status == 200)
		{
			var html = document.createElement("html");
			var re = new RegExp('<img src="https://www.tamiaode.com/new/face/([0-9]{1,3}).gif" />','g');
			var tx = resp.responseText;
			tx = tx.replace(re,'/$1/');
			html.innerHTML = tx;
			lis = find_all_node(html,function(n){return n.tagName=='LI';});
			if (lis.length >= 2)
			{
				writeResult(lis[1].innerHTML);
			}
			else
			{
				writeError("解码失败");
			}
		}
		else
		{
			writeError("鸭子坏了，请手动解码");
		}
	};
	obj.onerror = function(resp)
	{
		writeError("鸭子挂了，解码失败");
	};
	GM_xmlhttpRequest(obj);
}

var fonts = document.getElementsByTagName("FONT");
for (var i=0;i<fonts.length;++i)
	tryNewGaFontTag(fonts[i]);