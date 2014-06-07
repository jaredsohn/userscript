// ==UserScript==
// @name		拖放上传正式版
// @namespace		http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul
// @include		http://tieba.baidu.com/*
// @grant		GM_xmlhttpRequest
// @grant		unsafeWindow
// @updateURL		https://userscripts.org/scripts/source/155925.meta.js
// @downloadURL		https://userscripts.org/scripts/source/155925.user.js
// @icon		http://tb.himg.baidu.com/sys/portrait/item/b772d3eab5ced4dad0c4cdb70e0d
// @author		527836355、雨滴在心头
// @version		1.02
// ==/UserScript==
if(!unsafewindow.FlashImageLoader)
{
var sc=document.createElement('script');
sc.setAttribute('src','http://static.tieba.baidu.com/tb/static-frs/component/sign_shai/flash_image_loader.js');
document.body.appendChild(sc);
};



var cnt = document.getElementsByClassName('tb-editor-editarea')[0];

		// 判断是否图片
		function isImage(type) 
		{
			switch (type) 
			{
			case 'image/jpeg':
			case 'image/png':
			case 'image/gif':
			case 'image/bmp':
			case 'image/jpg':
				return true;
			default:
				return false;
			}
		}

		// 处理拖放文件列表
		function handleFileSelect(evt) 
		{
			evt.stopPropagation();
			evt.preventDefault();

			var files = evt.dataTransfer.files;

			for (var i = 0, fi; fi = files[i];i++) 
			{
				var t = fi.type ? fi.type : 'n/a',
					reader = new FileReader(),
					
					isImg = isImage(t),
					img;

				// 处理得到的图片
				if (isImg)
				{
					reader.onload = (function (theFile) {
						return function (e) {
						src= e.target.result; 
						
						upload(src);
						};
					})(fi)
					reader.readAsDataURL(fi);
				}
				else if(fi.type.match('video'))
				{
					reader.onload = (function (theFile) 
					{
						return function (e)
						{
						src= e.target.result; 
						var imgs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAACnYSURBVHhe1d0H3Lb/WMfxW/YISfYuJJlJRvbKDKWJECozIyNbKKOMouxsZZYoszKzM1KkbIUoWxlnvc987o7/6b7v5/H/e8j1ev2e83qu+xrneXx/3+N7HMdvnDvL/zw+97nPOSxf+cpX1tbjX//1X5fPf/7z63///d//fXnUox61XPKSl1xOcpKTLMc61rGW7/iO71h2dnaOaPM7B7Uj8fvz9/b6/vn34xznOLvXf4ITnGD3+dnPfvbl+te//vLnf/7nq/2++MUvLp/5zGfW5x/72Md2n2fvjjsZPFD+5V/+ZfnCF76wC9KnPvWp5Xd/93eX85///Mvxj3/85XjHO95y3OMed/eHj33sYy8HNaAd1I6EQed3OldG05znthP1t/7eezJ61+ZzvTa/nz32uwYAfc/3fM9ynetcZ/nrv/7r5T//8z93OzhgPvGJT6wEABabe+wweI9/+7d/233uDX/8x3+8fN/3fd8KhB894QlPuMxeMJ9/Iw17qB7qt/Yyzl7nUGfY7/2H+z2He30A+s7v/M7VVj6T7Ty/5S1vubzvfe9bgdg+vvSlL62g7PQHLqnHe97znuWOd7zjbs9y0p2QHneiE51obQCZPWyv595/UDumDDsmDJzXtTX4XkDlpv1m5+2aT3ziE+8CsP0e7/MaN++og//Zn/3Z6oF4pykR/r8CAhl/4OM+/vGPL1e72tVWQ/sCx5Od7GRri+57Uf9we9A3+32H6iSHAvRQf+96tuD6XZ12gvFd3/Vdux37N3/zN9f+/1//9V8LL/XlL3/5f13WZz/72dW3pSFXuMIVlu/+7u9eP3jKU57yKP5RTz/NaU6zXOISl1h+9Vd/dXnkIx+5PPrRjz6wPe5xj1sOak9+8pOXJz3pScsTn/jE5QlPeMLyh3/4h8vjH//43c885jGPWTS/I6jwm3/wB3+w/P7v//5R2sMf/vDl937v95aHPexhy0Me8pDlwQ9+8PI7v/M7y73uda/lnve853L3u999uetd77rc+c53Xtn/a7/2a8vtb3/75ba3ve1ym9vcZrn1rW+93OIWt1h+5Vd+ZbnpTW+63PjGN15+8Rd/cbnhDW+43OAGN1gF+ud//ueXn/mZn1k14Sd+4ieWa1/72stP/dRPLVe96lUXdtMudrGLLWc961mP4tonWLkytnzsYx+7EoG7gsEKiH8g5EWohfhJT3rS9bkjv3iWs5xlPeGXvexlK4t8AXQP1b7GWW5e0CG0T3/60+t5/Md//MfqY/0GTRPpCTQ+/OEPLx/84AeX97///asf5la1d73rXcs73/nO5e///u+Xv/u7v1ve+ta3Lm9+85uXN73pTcsb3vCG5Y1vfOPy+te/fvmbv/mb5VWvetUqri996UuXF73oRctf/MVfLM9//vOX5z3vectzn/vc5ZnPfObytKc9be0gOoaOBPxHPOIRa2AD5Ac+8IHL/e53v+U3fuM3VrCBDNzb3e52y53udKf1OSCBdPGLX3z1LHka2pJ9sYenecELXrBaBENgsOPiPXFyvbkPBoqe8Fd/9Ve7pmS4T37yk+uXiBAOaoA7qAWE73MuQPjoRz+6CwTjB8A//dM/rQD8wz/8w/KOd7xjbW9/+9uXt73tbctb3vKWFYTXve51y2te85rV+K985SvXDhQAQlD++0/+5E+WZz/72cuznvWs5RnPeMbyR3/0R7tAYCc2xkKMe+hDH7qy7QEPeMAKxr3vfe9d1mEbIByxjXD/8i//8sqqn/3Zn12ucY1rLKc//emPojHpCZac97znXTuhB1vs0A9icoYznGEFhEDFDEd0ZhAPvRYjPBi5vOWgI9BmA77v8Hm/7SguF1Q4sQ996EPr/wGEEe9973vX33d897vffRRGBEaAYAZGTFBe/epXrwwAEiCAA0hAaE996lNXMLSnPOUpq9vkSnKPucHYwYtgBzd4j3vcY5cV7HSrW91q1+3d5CY3WW50oxutLo4mM3y2LUp0FBhxox5kY3VZv/3bv726pcLYjr5Uj8yIDJbxuZmotjX6FgCfj0XF4n48d4UVwAYEEDDF37mrXBN2/OM//uNRGBIg3BSGAISbeu1rX7sAAksw+yUvecnqorgl7s33AglLnv70p68NIPSMq4ohuaoYMt1VupSb2g+Q613veqvOXPrSlz6KtggWyueA5bx5np2PfOQjK3ozGhA7n+Mc51j9sgcQ0IlRe2yz+0Bg/NnSmBjhc6K59ALIAAEGdnzgAx9Y/+47sAYgkxnpBTAC4m//9m9XMLbseMUrXrG6LMAw/gtf+MKVlc7J36bLwhTaQTewIzAKEnTa+9///st973vfVTuw4253u9uBDKElXBdQBAE05bSnPe2aQ5XXsTUt8TvsvKM3JDz+gCmOTsgbuA4XERiFZyUyAea9CdPUlIDgFoEB2IQbEDoEMAg34wOliAODAIQZ3IwOQj8S74AIjCneDE7A//Iv/3J5+ctfvjznOc9ZWdQD8zFD8uuIHbkrkZyobUZsD3rQg5bf+q3fWu5zn/us7goYd7nLXXYjtv0Y8gu/8AvLda973VVPCP25znWu1cYAmV7pMpe5zGq/HagViiXq2MFAemqlFRcChIKAgOgCAwQYacTWPQVG7gkYXJQjw//zP//zCk6g+y5/467oBFYAxnMgBESRVK5qgoEhIiluC+Nyn8AGEkFPO7BDiD0ZQjuwYwq6EBoYv/7rv77c4Q53WCMsaQBBv9nNbraKurBZyIwddOSnf/qn1zD5Ihe5yHKKU5ziKOlEeR2b78zUPtERnwPCSTMOA2ekyZZAiBneV5CQRswoikFihR/HBmLtiB3Ee2pTrtLruSdgYAYQAgIzgEG4RVYxg4BzU1yTz3jMTiYUBgh2iK7KdyZDgEE7prvCDmDQj3IZgn7zm998N48h6Nghf6EhP/mTP7m2y172smsKMWtgpzrVqVaAnPtOGTmUAoT4OfGKXp6nGTGD4fPHe+kDV8c1YUM5ReFsWsHQWCG3wAK5RqWEim16tPcn2o5pBSEUUQGDcQk5dhByYGCFcF64i4keAI/1vlekhSFpB3YIecs7uCrsEF1xV7RjJpixo6Tyl37pl1Z2pB0AwRBgYMjlL3/51W0V+gKiCojv3gmEmCLC4ner+HbyDAOUCQLA0oaSu21ix+VoIpuZ3GEGMDTP6QTAelSq9n+fLc/gpmJER2CUe9AL5w+QF7/4xWvzt4qozjmNcu7YQ9ADBDvop8gKGNgRIMJdRuOusIO7KsvHDq5Klk/M0w76UXZ/zWtec7nc5S63/MAP/MCacAOjnI/dL3rRiy47KX4UOvOZz7z2QIZn5FzQNLzXGUwDAFdUUkcDAoAh9cIYgQkBIXLSsMTvYQjQ55hMEZrXaQw2AMERvTFDMsjo3BTGYAc3NRNCHSFmA2S6WuJOvAGiHFPeQdS5qQlGoW5iPt0V7ajkkrsChnILl4UdV7/61dfxJGMlgJhjSkLgtWS1BeSMZzzjSn89iqEdy8xzQ16vFbLq3YCozAGEWeqYQGCD8LXGv3svLdoCUm8GOHYIYQGieQ4UYGjcFXYEhrKE91XJDojqR37PeXNZwCgZVAvTCnVndp5+yMwBUnQ1a2DEnKsquuKurnWta61R1o/+6I8u3/u937srD9mfdKxin/+KIac73enWMDF/r8dr/p/R9fxZY8r4enEsmAkdJgRCZQ+hq6gJO4SzDF4pJh2Z7gVbAMjwOozPYYNz5ZImM3quTIKBVRcm2L67fAmwXFQFzLJy5RKhbrnHLFCqWSmViK7oB3dVdp5+/NzP/dwuO378x398ufKVr7y6JaK+jWxp+FoN3jJE4sL/6rEMnMvx/15j9Jqez/i0gNvJ+FxBdScGF64CQZQ0EzrG8PlKMYwXIAxWwpmWVCDEjLQCIJ4TcEcuCxjAE+X18H09/E7/d41cFe1wxA6uisuqkJiYi66wIzEvuiLmVYerDMs9VIaxg7u64hWvuFz4whdeeKHt4B5inPzkJ/9aQJTXXRAjMfZsGT7jV+zL9ej90/gBMEGoElvYKjLCtsow9eb+70i/AOPou3QYLGBwkVTlEa9zV6JE7sr5ZPTC97Qk4HtdchgQ2ELMFRFFVjLzGepiR65K7sFdYQdXRczlHtgh9wAIMeeuhLwXuMAF1mx9phtFWisgJYO5rFOf+tRr72LkbW/3movM8Iw/C3z1fBERXdCIrgYAopso6+Ga99AmD26kfCc98broLqD0Zm5Kp6mU7rlalf87ipzoCe2Y7m+6rp5XgdAxiDsAuCwMwQqgbCMr7Gj8pOiqMskcNyn/4K6udKUrrfohwjLOVB0rD8Vl7ckQb1b3YdRp7NnLtwavtzN4Rmf4wtLyBK7FhVf4436wLOHuGDjT1dTTRXZALJIqEweE54qG2KHzFLXtBfYEx99FYpJD+UZJYGX2rZDTjlyV6Iq7KrLaskMNS7UXO374h394OdvZzrZGWGl3R6K+akgvhBill70yZu6lHj57+ban1+MJbnlBuQHDNz6h5+rhmh7NEOnELNMEzvT7RUeYWwV3AhI76IiIbz7m9/i9CX4jdpJEkVWDT/SjupUSubyjyKoySdEVQGZkFTvoBzEX7pq5Y5hjCnpj7ruAzNq859J4JejifEatzZ7t71rG3e/IYD5XogaYhBdwgbEdU8mY1camQYXawlm1KGwoI+eqMASDp5gfBZnNf3SCvlvgUWZOJwBT3aowFzu4q8ok2yHehFzewVXRDtk5dgh3saACbmBEiq8Onf9f6g4Q84jUdBhy25v1aAJaK+b33v1aoqv3lsCJhrxOiw4FyNaYgKMpQnABh3C5RBUrMK7RzDmjYz9QShSBAmhuS+In1HWsTDLD3IRcIogZwlw5R0LOTRFykdWP/diPrew43/nOt0ZXKusAaZ7XLJ3sAjIH4b0oSVL/qfTgyKCz8eGH03zGd6m4eu4zejZGlXvMhHDmCtOIuSu+f47LbKMyrqj85XBZUuDgqLPJLeQg3FOuKmbkqqpZpR0zqiorv8pVrrJqh1BXds77qGEBZNr8axiyBURhzXAnd8CQBzUR2UENG4Shvg8wjnw18Z95xn4ui4FzKYEy3Vc93N9K9vbKOw5yW/5WMVOuxU0RdJqxzchzVSWBs8QuxC0rJ+TYYXjjPOc5z6odoii1QzlI7mpPhsy5RaIscTh//Kd/+qerAQ9qjH1QA6bZHCI332dAqKHUco2DGDLD370Y02sAmcneoQDo74XZ/h/blOPlGVxW4x10Y8uOSiTYERi5K0JOOy54wQvuskN0hSFmnMzpuF/DkACBGkBEGsaYGbLJAJ7PBrCGQHvPXscGgfyt0Tluocru4WjIrD1NQ89h48Q/lvT/QwHTWI735eIEBTRDVj7rVXuNdygeSgCbpyWqKsw1R+v7v//7lzOd6UxrnQogGpZMt3UUQKa7AggNUb8hbnpKTQFOU6quAW3+f6/nvUcmbDKcowy+OtKhAKkgOCu/073tx6BDATH/nrsqFAYMt40VM6raq7w+yyOiKkJuwtyP/MiPLD/4gz+4Crlkm7uaDNkXkDkb3HNhmWzVuICSNGBqwmHjzhrjHk7zXqACS/Qmx1Ej86gkcjiifrgGboj26wFKlFag0EAcNy37zlVtq7klgA0+FVUR8ktd6lJrVCUJBIZOLrrirpoHzGVFhn1dljf4oPhbpAWUpnJ2NGepBrDt/7fTRpW0Mct3KdyJtDwaqj1cQx+p9xUgpB/pEJeqREJLRFQy8sbJAYUZwl0inn5gh6jqQhe60OqqVHWlEQDR0dm2mfFzXcnXuKxmevuDkSy1G5Q1SDPn0BranI2RGXyv1pxf78Ewn/M+7qqC3uHkCUcKiG0klrtK5HUY5yzXEFFhCkAwowlw2CHETTeIuEkM5z73uVcwDGV83YDQjUauPEcr0QVhV/0Ucc2mADebXq8Br6aMXQtQANMPLqFS+4xwjrTh9/v+GJKOzPepBjC+aCpARFSYQci5qQkGETfHTUYeGF83ILPI1UQHoZ4imxK0UkINSLNJnlRGa420BSDgAKH5Dpl94eU279jv/0caqLRjzqzpN1WLRVtYgSUYIiNXs+KmiLi5uyq5VgQIcbkqs9/N56UfXzcgc71GaxpEFhIj0Zam+jmb0vS2AS8AgQasWlMxDVhl+JnsHQTOkQYk7ZgDYU30c140MUbQDmDQD8zQDDopjdANrkpGzl2Jro6Wy9oCohIpAVLDEW1tmxrPbP7u/yqjGmYFYqNugDJNU41p66szxH7HYwrIoZhYpu93isyaX+Y1FW72YHzAyDsqqcs3uKkf+qEf2gVDZAUQmbmBqKPNEDoiFDOSJd7mtpQQjAU4zkb0t02Z2shao2wBBSyvqfh60JC0Y5ZOvlWATGbMkDmguC3nT8C5qzkcawI1N6U0YrYn7ZiAHC2XNWNhyYrGX3Jbzc5TYKt5bbYqogEHqAmOi/H+ljS0BGGbh3yrAHEe6cicVDGZSQsJO1elPqUsYn4VN2WMg6sCiPWDGlAw5GgBsh0PESv7YVGFOBwwmufKCESuopvCWwtWTBxj+C1APidXEUbqbbkseQ1dAqSj+lbzp5qUl6EkkDObboHLQVFarqrv8J0tspyzMA0p6DREWTJn/EK5x4OL9TmDcSKqOXOEboioNICc85zn3AXD3Daibn6CCq88RKYupRDFtlg2uTiw2utD6MlvKkMDRvNckjTBAdAWpAkMcDBLRt/DEKzwuNkYopQmAfDPRDSDA2/OYJwrhRlrvzxm6saMmHoOJEVPWjDHJfIWjOY8CjxMYXJu2KEsItegHSYsHHFAZJKGH5UKzDeSoSqqaf4PKOPJBwE1GeR9Kr1zVE4yRRBbXYSRLrjRNb8po59JWqLryOATqOle9irjt/6+iX9CcFrZRggB4f9fnfmxnlsRGPBdh5KITBwgxji4rAmICIu7wpBE/RgzRO/Qc+iILFVTOtCIPaAmSAAKpL1YBBzThppZYohV3I4hgJdg8cmY4rl1EkRSAoZZsaDxdv9vnu4cFwmoAEmTuEqvcXkm/OkIcyyiBZnb2TdyCSOQVYOVkwBBO4qsgAIQRUT5B0AI+4yyjjEgil98pRBPE3trkqJAmgAFzmRPwHBxwAJGBjViqMSg7sP4DGR6jItzsRXp/M0sPyFzhg+IBqO2M/K3YBTGAoXbYcgML0foeZshxBTjFXp4w8XAVo1wjlwW/RBd+T/dOaKAyEMYiwvRS0380oAj0lBKmCAdChwMM5eqaEZyKFx0YZjiuQppGS+XoHEPAGFEmjNnifguLmuvKvE2WgMmQBiuZXvNGpQIzxkgAaJT6vlY1RiJelyAOGfuSgsQSwwKfbGrxPAYM8TJMhD3waUARQOQOFwZQbYaUBOc3Nt0bSKvRNoFGkf3vZIphmdwF2r8AFP6v+cA8ze9UQk/TWlJxH5uKjcDDGtTMJI+MH4aMRPinvt7oHC15U2Oft+5OGcM8dw1CHu52AAR9n7DAeHT260AMBqRI74THABtmcO1Td3h0oqOGEpPV1JxMYwu3NQAYaqM5mIdXSyW6K3AMZXIAyAYsh2omiOIDYCJ9JqVOdditGoJGG2B4TnAuDBR2EwUjec4J2A4b3pyxACZY+pOnrvg20VDLcWaIhw4RUcxB2u4NaxJb/ytrTvSESV40QjNEDo6iuPF8y7Wa1gBCKBwDaZgYm46UpBQtOW752LRQtu2Xdpro5lea61GAs8l5RaBrkMp/QQIfXN+hwOI5NCwuPGQmYcc9iQHgOgFLp7AVmIGjuirAZkipMDh0rizQElrvGbm43Qv/LJkzMm6KKIIFIBoeh9RxRTRS8Ohohd64hED5rCr1323vzGiz+8HSGNA7esCjBZjmjtQ4FBiKbjQUbg/rI3Nh3JZxxgQdM1/Y4lG5Imu6AtAgQOgyZwYM3UGUCWGcz6VOb3Vgfhd4uj/LgB7XLTJAf6GKXw0fWPkhoDbb4XxYh/N8JBtM/LckGzqxnb7pdb8YbRHI5pFcoIXTJUrOR6uyzrGgOhRjKHHKi1Xu8GYwAmYCQ7mYA3G0BkXptEfpRGPuc6PDhjaVRE1dwkjiGHzX0uyAKIMASSlCD1aFt1ygjlxrlqUo+/c7g4XCPMIJILvNQzRUSbTgC5kdv1cFUAwFiDO9YgxpJN0EXoht+UEhKeAIarE3gkBBmMqewTMBKUAAEjKLepUjRS2fpHh5CmYQEMwgeGBAShhJJCA4D3cF3+s4pqGFHnFEv83rTWBrla3Fxhe872Fw2bIpEW+L3doogZdde2OPIhOe0Q1pGFctR2UFPXoZUAR6mFMuUPAOMHpzhhq68YwBDhNbpiz2hNMbo/oNWUGI4Di/4DRMIjxAsfiIY/KG62ppx+GAbZh7by+7f6JvEIslp3nrprbpUDKBjoi7RAVBsoRY8jcOY0vR0vNj2OLngEcohZjpjsLHO4sYDAGII6KjlZKTR2pl6s1+U6uA0uEpKrOTaOpcuo1DBEVmazdMoIM1xwurrLtQmYE2dZ8ExC6ZKwnprXauMBBR9LJ8hR11HKRIw6IniSaKIroBPSI3Bi2AGYvd4YxaQxg9H6JJEAtX/BIeBk0XQEWQzIgZtAOhm8YFIP6v6PZLD5fnaowlTsEru+Z6/jmRI65MaboKeGeNTIg+y4JYh0RS7hunqPy+xEBZMbELpa7KEEjXpUwnEjAMHDVz1iDMVoBAGCARuQZScXUsukiIu4LS5pgIKOXyDmHprVyV3p7Q6GEnbGF0n1PCWF7q8iDvMf3lPQBYe4x4rqMyXj4/FwslB5JDukk9gNCRwQOr8EmtHYCUnFxjoccrSHcCYjyAV8tEZMTKAtwI8JSzCFkgVW0gUVOEkCSKj0pvUlTcml65Jx/W4hZzchRHiC0ZlR5EVdWWOroNxrMKjFsepHvM494u51eiywd5UrlRrHCsWFbHQNjAbsFxG8HSNWESiffMEDmdFICRziJaEIKcdEONyLykRMAS0I3s2k9Rs+L0noTtggC8sNYY+VUY+uMoIdux9qJtuyYaxDLl0UzkFVYbY5TiCoR9F3tViSBbJe89v9SxrH0rgejY5Xfb6ZJJRlTmzBiP0Bc5xEDZJYVPFftRG8NOISUUfhz/h046v4AAg5gKnEABZ31onoTlzazfoYpSpqzUJpQvWuxrz6Ze51UOU7ACwwS4cQZwCImC1eVatqHy++1Y12/U3m/c7GED6PlVADRqbhcALmmallHDJBtBksMUV7thf9WcAOM6AcoXBpQREFyA2zh0rizAJl5DF3hg7EDU1yUpLB5tIw4Zw6WpzAQV1IvzoBAmHODt7MP24/L+8vmtyuvAFqonI54DViF6gARpARIwwIB0iSHb7jL2gLCb2MJMIByECC5MCdFYyorOGmGx46EXtSFKaIpftxgVcZsBjqj0JHteDkXlc7MoV2uJj1pR6KAA8wU66rNJX9NQ5oDXSb5AUH5p+UFAKGJAcIl089vCiD5atEJICZDuC05wWTIXoA0tkHkuS4Xg/pCYL1PJdhFmiCRMQszp7tKaHsNc9Ibr2XsafSezy06PJ+ukU6035fvad9ic3mdl0QQKNjsSAO/aYDsVZYm8txWW4zvxRCVVy5LyUNERtwllPwqwYshCTuWAAU79LQWS5oRX6TDcJ7PhZzT8AEzi4mm8fh9yafoqC2lvNf7YsGWcZVGiqyE4+YLOK9W1DYZI0Bci072TWVI25cChNvisiRlhJ2GyANELwAh6lsNAcgUdT0LGMoOaQjfzCUYO5GjiHy2M0xm8XBugzFzGBm+8yik1bPTgyn2c4JEz9vvPjdoQjgghLqYzKVWTJ0uizYCpBFDHZG71il4C52UB+FJ6O3RGsKdGvL1AtLAUuXzvQAh6PsBYkqRyXdtQJOGFDXNIp/X5rxbkykaDZSAGTqw3HoCOEs128Ch99Ey5wEEI546SflTop7L+rYARO/YDxCiDhBhZAyhIzFE9u7iy5qblFBPL0/J/ZTV23ul7QklZM0iYcBAoxtpR+vXfe/UDywDLHbQNmUew9LNG/u2BWQ/DdkCwi8DpPF4BgDKzJ4Lg6fQNx+rcgtf33i4CQizoGjuV9qTdsxIqg0LgK+0bhDNRECDUM7NdzdS+m0HCL+ZqG/DXgLYQFdTfbrFQ4BgivlbkkVLILoN0MzeE+ZcjnGL2OH76IJBpCq8wlEsKc/wXbNM33MZPxCAgSX0o5DcOM5cyPlt47IOFfZuAZGLuFi9EivMUGEEJXAuw0rftGKOl5eviKSIaoNKyvA9DHa1mFLpI5YEwJwrbFGnid5AMDTQJgAAEnQ4R+3bkiHKJzMxlIcw2l4M2QsQbgtLiDuAbIQ2o6SYwbAWAeWqCHEuSS1LqUTITejlTLZxKncBDrdVyd8mBjoAZojO0jS/3zyBmal/2zJE+SRARCSTIXrbFhAsYVg9k5YAxohfPn9OqjZHWA0NIMLxIrM5K95E6ratMHRcMIAdscziIWyylMLvNZncObStK3YA5lvCkO0MDD1Mpq4Uf6g8ZJsYztLJZMg2yspXi2gAwkCM0+47dKJHtSxi2/hG00u3kx28V6doy7wqy0VXwOuuBu2bCJC2WsLW9i6Zu/ooLjZrcZuHKK42c3HOfpeLCMcVaVujTvu6I0Lpxp7rQ2bG/vUAcriivh8gjNymLoCp1xo3UcrIkOpSElEXgYHd0iJXNMv39lJpMMq0Vg8JILCsn29lWLP2DweQ6bKa7gp4rnoLiMRQ8txo5zcdEL1D2LtXlKVX6V0BUtibqBPV9r1lIAzhatS5rN4VKXXfP8OpSjJWNM1qb1NK6UXDw/RBHa3VUEAxhGyCHpfoNzBFJ2hX6u3uPq0nLFNXOuGGA6R5ZQHS1KWZqX9LGHKQqDd6uA17AcI9MIIaksY4Qt924TGcu11ephg551+1/mO7VqRMPwYJElqUCuztLSba5pW4myXTvlezuDgBUZEIEMMPbAAQwxLfUkCcRIAYpNqK+qEAoSHcil4KEAxp9W+bFxvMmhXbWDDLIt3NATAmu5WHNAIonLZkG8tEVsRfmSR3uR8gMvb2vtoO3/II2AGQFuw0851+tCz6m+qyAOJkGjVskGoO4/K/rZJqJgrhjCGMwY8XZckLrOTlXjR6wv9jQyWQ7SzI3Qjgq0/m0gUjhsDlArEE84COKe2fOG8xMXf4aWc4FYcJiOAlQCTGbLBdivD/ChB+tlFDFwOQwl7hJECK/bktDOkuNe3mxoiWkkny5A09ylGKsKbxC5ObAwY4y5p9D6Ctn8dCnQFbuu9HgHR7iXaGo32q1YcLyNzF4f8FIC31aiZKc5r2A6SN62kIv96CUsajJzHESJ6xbo8y+FxWyeG80XLZuf25AGpmIlYAg5gDAyMPF5DtePqWIS2LnoAYqjhaoi4Onvs3iZPFzfIQY+sGqPaa6LDfeEgDVM12zGVhiPoQwSSceqOwVw6AIS3F5koAwrXo0Ta1sSOEY0afYxxzv5Ke0xLbYtAKYHR3nPZRbP3j3Jm6bcLbsk91Og1xDYn6Ng9pnfpc9Lnfkrb2y5pTr9qR6auLiP7vBvVtrwEICYw5UI0WNutEfG1akIy5OtZWP+YAVWFvUdbUEC5L2AsQGoIdlVD0ZAxhQINHAKEBdkrdzhKZIXC397NkwSz57tDZLSdKCtu/fe7d3l1x9tolrsSwydZ7jaljyXZpdLs5EPY2D5DcTgKUmK/3Ht4uEe7W3I7eEDMaS0dJYJShE7TqWEJBJ8pdNauxEcPJjvYNYQCCLsriOqorcScJL3HvTjcYosfb172wds6p8hr3JQpTdIxVPtMdOttY3290q1QsKcoqU++uOLGkTQPK1l2ja+WiRZc6ZeI+QZEcbnd00NknIGXs6+Ihf5i3TpgzTgrdYoWyADcVGM1qbC7wnCRXuNvwba6KO5CDtOQaGEVYeq0CY34eGHo4pnRPQSUTZRVrzqeezLF0d22wG9y8j+32LmvdYa1AYnuruza3TNyLtsrYWxfZUK4BOvaYIXDDudxXE8YZnedpz8XWppANgP4POP97z/SYgj78HH/mS3xZrOCihHeNf5R3OKk5nZQAGiXkpmKGyCrdAIaoprEIrgoYem1gCE/5fb3btk/WiXNdBpQcDdUql7T0rJW5EkcbWHbHnHmX58mSbszSNrCJ+8xHRIKHcl8xRbivY+61TLpdgtiSyLPv3AQzhgB9BUSbwq6g2NYQUyua67sdrm2GSWtIiqhayLMNc110W3e0yY0aFiPx8cDgbuy7xcUY3uWubBeo50vyTDM1jOvRsmvaYvds7wOc93bHznm357nJvg7QDVpKEmna9j5S7c3SBvs6nFC4qU5Nvi6Db4cHSXOurFVgAMlltREN1jjvHf4uUKqkopGMEzOaKtpk6znVZ+YaaYW43XQfNavGFTCDbxZRBUYRVcwAhrA0ZnAx2CHstWhfT7ePo5O2RNkOQ5jQHawxxeb+hnMtVbCuUSGx2+BxX0CRZE6m6AATlGpb263EXQNd4cIChTueU0y5MRFYi0JbSZw742FoSrP7t4uKsH6H0dKQebNDWhEjck1zicJcL9LsxMAokkL3BHzrphJwvZM/Zxiaofe23yMD5nLM32LU9v/tdqmtXacpbdTsPXIP4GBXd+7c3he9+xLSqHlfqYqd3Gp3zpn3I5xl+Zk40s2y+VxZS7zZkLsnAxMQDGF/rkwovyMaiTazTi9EC+nm66JnTEDZnqcVjZdXFmmJtAsrkiq0TS+mm6IZwDAqCAwGbKtavR1TuCoG78bCWGJjfzefseeWUJfoSwiBiEkxxXf5zu5tW35y0D2m2hGpG0bmygQmOhu3zCPw/830x5pylvbgcuR1Wt8yVxxIM3Riie6Of0Q+M9LyZu6LljT617qPrU60WgqV24qjGlVbrE43tc0zclM0o9sNcSt6OEYwql4ODAyYYFgH4jV70APD32hHN60HHnbQkm7H7Xu7aUt3f+YWuyXeVuzL5rs9RXdDyIXlxgJGEBNrmkILDHbkddrdusWorfJyDUL4HUJoOqY3NKjTZDmRFnFCP/6y4UyiDQgn02rbRgDTibnfCVaI+XNPcoxuuBUj9FrGIt6AYMA2X9bD9fy5bXk3pgcENvi/fbn8H1D+7+gzggCfnzeu746egSOSw9Bud9SddbqRy343H54Acf+8REsYeJG24mDDNDppiAQ8ULPzd1qjx8dPUIS/PiDTJOz8Y9rQbg7pQzs4TDDa8MyF0AvhZRublYV3nw6G0Fu5KuzIXTFaoHA9RVcxgNFjBjYARhESa3q/Y7fk7taq3Bbw/c68V+G8cf2WKa6D+5p3SKgg2b2nCpPnJG12k580eX3uWifS0vnnPLKdhkiVGkRVLZacGyyb20uQRBFtudFuDm2xUfW2hK8NaMrEXYjIqhI7gAhpWkJYsYZREva5zSzj7cUculD05dju2uUtGOez1bTaJbX72sYEgQU2bAeu5j1DXMv25pFY0az+pg9xXzxKd9dZSyJfXZ5XZKUS7Dmd9WiJxE5jDMrWbrgSjSAamo7+70uwBcVaU9jS6NYQOpm9ttzAognWzEPSFQBhT2WTxDb3Vm4yN2z2vLt0Ftbm+vyNK/I5IHfHtcbU/V4uKa2Yd9Bp66nuMbUNfRPyKea0ln3kHvKOdgtvDvIUc+81k6bHqiFzYIeeuDjItbHXdteaalzVtpRRNAwqCWr9YTWuBq3mIlFhc7NSWiC63caDL849tqpp7tsFZNrFj2uFpgzXLbPnjVZmRKQDMWTRot4sMtIYavp+JSHldnnFzMYZfTvBgV2UR9hvWyeUnRdlyf/kTbP8cxRA5npvvrnJaL54rzS/KGG7ZcU22Znrw/dai9L7t1OR+tz2+/b6/lltaH+Tzm9uErDfWpiDfmP7me157nU+8zNl5FXQvR/Y7jDn0f0W81QrQxrw8bwRNwmXXlFY5kfmdniTeocy2kF/n4v499sc5ph8/36fPVzAD+e3s0VAZKds11HHFvi04LV5zM2acdxBkzk7sIUswDEMyr83W7BCJNRDvud65my9vt+mL72+7cGHev/83NwO5KDn+/Xyw/38fN9eHqFoKWDSYa8X4nJ3wvKGCJqZOcFYAfGG1lwUcW33xDXXllAqkQREN0c8nB50JN9zOAAeyd8PrPkblddVd+VugqUec8leO20fhSGt9yboc22fDN60y7kiFqoqrCqqIh8uTfZZeVlUUWsdu2PPCZkC2wwCBAKzEcrZiGZNkNAYTNt8t2fVfkdZcsvOBBu+e/6eYOSg5pxrXWvXVPW28SLRlfBfVcFdUuvYLfOeAVQbFWwZ8t8bhUYOkg6UzQAAAABJRU5ErkJggg==';
							upload(imgs+src.replace(/^.*?base64,/, ''));
						
						};
					})(fi)
					reader.readAsDataURL(fi);
				}
				else if(fi.type.match(/compressed|zip|7z|rar|application/g))
				{
					reader.onload = (function (theFile) 
					{
						return function (e)
						{
						src= e.target.result; 
						var rar='data:image/png;base64,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';
							upload(rar+src.replace(/^.*?base64,/, ''));
						
						};
					})(fi)
					reader.readAsDataURL(fi);
				}
				
				else alert(fi.type+'你传进来的是什么啊');
					
				

			}

		}
		
		// 处理插入拖出效果
		function handleDragEnter(evt){ this.style.boxShadow='0 0 2px green'; }
		function handleDragLeave(evt){ this.style.boxShadow='0 0 2px blue'; }

		// 处理文件拖入事件，防止浏览器默认事件带来的重定向
		function handleDragOver(evt) 
		{
			evt.stopPropagation();
			evt.preventDefault();
		}
		
		cnt.addEventListener('dragenter', handleDragEnter, false);
		cnt.addEventListener('dragover', handleDragOver, false);
		cnt.addEventListener('drop', handleFileSelect, false);
		cnt.addEventListener('dragleave', handleDragLeave, false);
function upload(f) {//f是base64数据
 
			function uploadedHandler(a, d)
				{try{
                        var c =JSON.parse(d);//d是返回的text c是json对象
                        if (c.error_code != 0) {
                                alert("图片化失败")
                        } else {
                                var b = c.info.pic_id_encode;//c是json数据;b是地址信息；
                                var e ='http://imgsrc.baidu.com/forum/pic/item/' + b + '.png';//e是img完整地址;
								document.querySelector('#editor .tb-editor-editarea').focus();
                                window.rich_postor._editor.execCommand("insertimage", e);
                               unsafewindow.FlashImageLoader.unbind('uploadComplete', arguments.callee)
								
						
						}
					}catch(err){alert(err);}
                }
                function callback(a) 
				{try{
                       unsafewindow.FlashImageLoader.bind('uploadComplete', uploadedHandler);
                      unsafewindow.FlashImageLoader.uploadBase64('http://upload.tieba.baidu.com/upload/pic', f.replace(/^.*?base64,/, ''), {
                                tbs: a
                        })
					}catch(err){alert(err);};
                }//事先返回一个图片ID再返回
             var xmlhttp=new XMLHttpRequest();
                xmlhttp.open('GET','http://tieba.baidu.com/dc/common/imgtbs',false);
                xmlhttp.onreadystatechange=function()
                {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                    {	try{
                        callback(JSON.parse(xmlhttp.responseText).data.tbs);
							}catch(err){alert(err);}
                    }
                }
                xmlhttp.send();

        }
		
	
		

		
