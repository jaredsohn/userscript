// ==UserScript==
// @name           FullpageMenu
// @namespace      Fullpagemenu
// @description    Show a navigation menu in page so you can navigate in full screen mode,also give you direct access to images in full size.
// @include        *
// ==/UserScript==
refs=document.getElementsByTagName("a");
var source="";
source="<html><head><style>body {background:#000}</style></head><body>"
	for (var i=0; i < refs.length; i++)
		{
			if (refs.item(i).href.match(".jpg")){ 
				source+="<img src="+refs.item(i).href+">"
			}
				
		}
		source+="</body></html>"



var myDiv= document.createElement("div")
myDiv.innerHTML="<style type='text/css'> a.navther:link {text-decoration: none; font-size:22px;color:#fff} a.navther:hover {text-decoration: underline; color: red; font-size:22px; background-color:#ffffff; } </style>"

myDiv.innerHTML+='<script type="text/javascript"> function directpics(){refs=document.getElementsByTagName("a");var urlref="";var textref=""; var myDiv="<html><head>"+ "<style>body {background:#000;color:#fff}</style>" + "</head><body id='+ "'theros'" + "><div ><a style='color: #fff' href='javascript:history.go(-1)'><strong>Back</strong></a></div>" + '"; var countpics=0; for (var i=0; i < refs.length; i++) { if (refs.item(i).href.match(".jpg")){ countpics++; myDiv+="<img src="+refs.item(i).href+"> " }	} myDiv+="</body></html>"; if (countpics>0){ document.write(myDiv); } }; </script>'
//myDiv.innerHTML += '<script type="text/javascript"> }</script>'

//myDiv.innerHTML+='<div width="100%"><center> <a class="navther" href="javascript:self.close()">X</a> | <a class="navther" href="javascript:history.go(-1)">Back</a> | <a class="navther" href="javascript:history.go(0)">Reload</a> |<a class="navther" href="javascript:history.go(1)"> Forward</a> || <a class="navther" href="javascript:directpics()"> Pics</a> | <a href="'+source+'">Source</a> <textarea style=" display:none" id="sourcecode">#COPYTOCLIPBOARD CODE#</textarea><br> </center></div>'
myDiv.innerHTML+='<div><left><div id="blackbar" style="width:50px;height:10px;background:#000; color:#ffffff;"><span style="width:100%;height:10px;" onmouseover="document.getElementById(\'thermenu\').style.top=\'10px\'"><div style="width:100%;height:10px;"></div> </span></div></left></div>'

myDiv.innerHTML+='<span id="thermenu" style="background:#000;position:absolute;left:0px;top:-100px;z-index:7;color:#fff; font-size:22px" <div ><a title="Move out of X to close this menu." onmouseout="document.getElementById(\'thermenu\').style.top=\'-150px\'" class="navther" href="#"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMOSURBVHjaYvz//z8DIxCkpqbKSUlJNXFycsZ9//590bNnz+pmz579iAEIcMkB9f4HCCBGoDxjTEyMgqSkZIc+I2OYg6srw4Hduxku/v+/6unTp5UgA6SlpdvR5Z4/f16xZMmSBwABxAKU5xAREenQ+fcvzMHDg+HBunUMDkFBDH937Aj7KSLCDDIAKBeMLvdbRAQklQAQQExAQoidnT3MxduL4eGmTQyMLCxg2sXLi8GAhSUYhEFsdDmQHpBegAACuYDrzp07p7b9+mWmw8oG9BAYMTzato3Bw88X5EOgps0MTGysDAz/GUDhxbBtyxaGO48enQLpBQggkBM537x58/c9C4uikIiwiBQnBwMjMzMDEzMLw8d79xg+37nLwAS0GcRnYmFmuPDrN8Pa69dunjhxYv63b98uAgQQyIA/QMbH9+/ff33DwCArKCQsIsvDC3YuMxAzAjUysrKA+ac/f2ZYdfHizXPnzs1/+/btLqDepwABBPLCDyC+D4yii//+/fv4B+hOJqArQM4FA5B/oOw/wCgHqQGpBekB6QUIIJALGE1MTGSAUVXur6fvGh0fx/D16TOIs6EYZDsT0BWWvr4Mv168lH777y+nsLDwMWB6+AAQQOAwUFRUnOJnYBAan5zM8PLkSbAGRhZWIGaGaAZ7hZXh67OnDNZ+fkALnmrdfvVK8vHjx1sAAggcjUAclpiWxvDq7DkGZjYOCGZnZ9h69SoYM7OxMzCxswExB8NroJrE1DSQj8DRCBBAIBdIAP1k/vf9e2lteQVwDIDwutOnGGZv23b/7O3bH7h4eARBckzMTOBAXbxxA8Oxy5dPAQNyM0AAgb0AjIW/N54+VWTn5BTRUVRkWHXkCMPsLVtuApPr2s+fP1+9+eyZKEROCVlu/p8/fy4CBBAojDmBWAWYsryAAZPIw8Oj/uXLl5tA0+f//PlzP8itQDlHLHLbgFJ3AAKIERpRXECsBMQmoLwDil8gPgONKhBQxCJ3D4i/AQQQIyw7gzIVNEBBhn0D4nfQNMKASw6UnQECDABxL0sBi3yg3AAAAABJRU5ErkJggg==" /></a> | <a title="Go to previous site." class="navther" href="javascript:history.go(-1)"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJaSURBVHjaYvz//z8DJQAggJgYKAQAAcSYDiKgnP9QE/9BxUD8v0DMzsDABqR+/YWK/wZiFqDw9P//fwIEENN/qIZ/SBpA9E8g/sPAYOAtyPAfqMHsN1TuKwMDJy8zQ627IMMPkKUAAYThBZBB3xkYRMTZGdsS5RgOM0Bs/PcLIudmK8xwIF+ZoQmmHiCAWJA1g2zlZGaMcZNjbvAQ/a/M++cvw4bPDAzfGBhUtfmZIgIVmHN02P4wfvmGCHiAAGKB2gBytoGBJGurvxqblyIH0LHvfzI8BWr+xcbEEK3DPtNNlomd/dsvhh/v/zN8/Y2wFCCAWIDOUpDjY8pxV+dIt5Rm5WH48Zvhz/vfDFfeMjC8ZmFjsNHnYJDi+s/O8OEnw98vvxmAiOHnX4QBAAEECkRTLWHmTEsRBh6Gz8Bwef+D4dPnvwxnPzIyyAkxM0gxAX3/5jvD30+/GD4DA+cb0IDvSC4ACCDGNIgX5BW5GGr9pBiS1DgZGEGKgOYwXPzEwMDNychgIvCfgQOoDugIsAu+A818CJQPePefESCAwAaAACiUmYGhrM/H0GzBx2DGA4zwr0DBJ0B88DPDVkchBmtVDgaBH8C4/Qw06N0/iAEAAQQ3AJaQfoHimYkhS4eToUyRhUHsGzCi179nMAMa/kmBnaFPm4PBiweo+TsLxACAAEJJB4yQVPf9xz+G3pNfGcz2fGaYywARE2BlYLj54CeD966PDLFnvzE8gekBCCAUF6ADaNL1BNpyA8i8D3Ml0AFSQDGjWf//bwEIIEZKcyNAAFGcGwECDAB6zMHnxwYHAwAAAABJRU5ErkJggg==" /></a> | <a title="Reload current page." class="navther" href="javascript:history.go(0)"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJqSURBVHjaYvz//z8Dp9VcBQYGhvlAnAjEIHY+EBsAsQAQHwDijd+PJS9gwAIAAogRakCBroV6/+UTNz8Iy4gIeHjrMNjpijII8bAyvHn/jSFnwgmGvw9fXACqDwQa9ADZAIAAghmwvrLcM+AfNw+DtBArg6kUG8PKa58Zrr39yfDh+x+Gq/feMPx49pbh75X7H4B6HIGGXIAZABBAjByWcwQ4ONneH1sZw7Dv/m+GX3//MFx/+5vh7ovPDHfP3mF4fe0hw79ff0AaDBglhRn+P3+LYghAADEBcUCwjx4DCyMDw7PP/xnuf/jP8PHDd4aXlx8wvLxwtxGoWRCo2BCIGYGaA4HqQRr7YS4ACCAWIPY31ZdmuPL6PwMH0JQ//5kYHly4z3D31M1qoNwyoMYPMMVA9gYgtQHoZQGYGEAAgbzwnwE3KARqmoBHngEggMCBSAkACCCKDQAIIBZCCoD+BQVYAQ7pCwABxEKEJQeB+PPSCQG1NtrCYAFQbPWuvsWwZvmRCwABxIJk03tQCANxI1pqAyXt3O1PGBnOffnBwM3GwsDJwsRw7cojkNxGgABCdkEhg5z4fMY3HxOAhoHiGhR9BsrGygLp4QYMLBwcDHff/2dg+/uP4d/P3wzXLj/6AIpWgABiQYrjBUCNDOzyYvMnFnkZMAAT1vf/zAxyguwMv/4xMOy795PhPzCN/GJmYrhz+SED1LUMAAGEEQsizouC7UykF3LIiXGLyYsyfPjHwvD001+G3y/fMzwDpk5WJkYGFmZGhltXH4My1gaAAMIajdCUVg9K5tAwYIAm4UYoux6aHz4ABBgAq3b6a94kN/MAAAAASUVORK5CYII=" /></a> |<a title="Go forwards one page" class="navther" href="javascript:history.go(1)"> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJXSURBVHjaYvz//z8DJQAggBgpNQAggBgZEhk8GVgZtsME/s/8z8CYyhjB8JvhEAM7wzNcGkHqQAAggJh4ddm2KSiIzmH4ySAP1AQGvFpsy9399E+yMjLHEHIBQAAxgYisLMdkZy+NU5w8rMWMUYysILGgICOZ5DSbxYoKwlsZ/jAY4DIAIIDABvz5/YvBxkZRLCxCr0dBS2A3SOzt6/cMMrJ8DMEhul6OrkqHublZ24AuFEE3ACCAwAZ8/vKZ4cP7TwxcPMwMZs7S9kqiQgzrt51luH/3FcNvoOHK6gI8Vu6ylRLqPCeYGBljGP4zMMEMAAggMOPLl68Mn799Y3j16QvD+6/fGThEmBmesnxgWLHnHMP5i08ZXn/5xvCT8S+DmC6PspAx52JGdobNjGmMfCC9AAEomGMkgGAggKLfjC4qhdO7UY6hMmMVNhKxiKT53X99y6pKuG6iGedr7BVJ8jCNA58rSMUPy2wS0SX7Ysx0pPb+AghswIuvXxh+/PrD8OPfH4Y3L74xfHn666eSmiA7rzAbw4//fxk+fv7B8Pret1cfH/zo+vfz/zQGFobvsGgECCCwAa9+fGX4/glo870fdz8/+FnGq8229jffP4bnX74wfH758/+7Oz/m/f7wtxmo8SEDC2ogAgQQmPv09ieGr/d/t//7+r/v/9z/b/j62RmevvjE8P3+71M/X/2tBTp3F7pGGAAIILDw5+u/DIGKLiAr+nDuRx0wcfUwMEP8igsABBDL5xu/GIGaUQDQQD6g2GegZoIAIIAozkwAAUSxAQABBgBfueweUY0UwgAAAABJRU5ErkJggg==" /></a> || <a title="Go direct to full screen images." class="navther" href="javascript:directpics()"> Pics</a></div></span>'

var countpics=0;
		for (var i=0; i < refs.length; i++)
		{
			if (refs.item(i).href.match(".jpg")){ 
				countpics++;
				
			}
		}
		
		if (countpics>0){
			myDiv.innerHTML= myDiv.innerHTML.replace("Pics","Pics("+countpics+")")
 			} else 
			{
			myDiv.innerHTML= myDiv.innerHTML.replace("Pics","")
			}
//alert(myDiv.innerHTML.indexOf("Pics"))
myDiv.style.position="relative"
myDiv.style.top="0px"
myDiv.width="100%"


//var t=setInterval("myDiv.style.top='1px'",5000)
//alert(document.getElementsByTagName("body").item(0))
document.body.insertBefore(myDiv,document.getElementsByTagName("body")[0].firstChild)
//alert(document.getElementsByTagName("body")[0].childNodes[0].nodeType)
//document.body.appendChild(myDiv)
//document.getElementById('sourcecode').value=source



function directpics(){

	refs=document.getElementsByTagName("a");
		var urlref="";
		var textref="";
		var myDiv="<html><head>" +
"<style type=\"text/css\"><!--" +
"body {background: #000000}"+
"#www {height:62px; width:62px; background:#345342; }" +
"a { text-decoration: none;" +
	"width: 45px;" + 
	"height: 32px;" +
	"color: #ffffff;" +
	"font-family: \"Courier New\", Courier, monospace;" +
	"font-size: 22px;" +
	"font-align:center;" +
	"background-color: #000011;" +
	"border: solid 0px #FFFF00; }" +
"a:hover { background-color: #FF6600; }" +	
"--></style></head><body>"
		var countpics=0;
		for (var i=0; i < refs.length; i++)
		{
			if (refs.item(i).href.match(".jpg")){ 
				countpics++;
				myDiv+="<img src="+refs.item(i).href+">"
			}
		//if (refs.item(i).innerHTML=="Login"){
//		//urlref=refs.item(i).href+"&lang=en";
////		//alert(urlref);
////		textref=refs.item(i).innerHTML;
//		//alert(textref);
//		}

		//if (refs.item(i).innerHTML=="Register" || refs.item(i).innerHTML=="Lost Password?" ){
		//refs.item(i).innerHTML="thyrffa";
		//}
		
		}
		myDiv+="</body></html>"
		if (countpics>0){
			myDiv.replace("Pics","Pics("+countpics+")")
				document.write(myDiv)
		}
		
} //end of function
