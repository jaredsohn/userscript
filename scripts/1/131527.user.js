// ==UserScript==
// @name           eRepublik Captchta Skipper
// @version        1.0.0
// @author         Xristos
// @namespace      Xristos
// @description    Skip the battles Captchtas using eRepublik skipper
// @include        http://www.erepublik.com/*/citizen/profile/*
// ==/UserScript==
(function() {
if(!document.cookie.match(/AreYouHuman=(\d+)/)) return;
var a=document.evaluate(".//input[@class='codebox']", document.body, null, 9, null).singleNodeValue;
if(!a) return;
a.value = RegExp.$1;
a = a.parentNode;
a.style.display = "none";
a = a.previousSibling;
a.style.display = "none";
a = a.previousSibling.previousSibling;
a.parentNode.removeChild(a);
})();   
				}           
			}       
		}       
		if($found > -1)
		{         
			$ocr .= $letters[$found];           
			$x1  += 10;     
		}       
		unset($score);  
	}
}
imagedestroy($lettersimg);unset($pixels);
// last of all output 
header('Content-Type: image/png');
imagestring($captcha, 2, 0, 0, $ocr, 0);
imagepng($captcha);
imagedestroy($captcha);
?>