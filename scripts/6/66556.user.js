// ==UserScript==
// @name           PushPush
// @namespace      http://puperchang.myec.tw/wordpress/
// @description    Alt+Ctrl+P 推文到 Plurk,  Alt+Ctrl+f 推文到 Facebook
// @include       http://*.*
// ==/UserScript==




//=======================
var title = (typeof(_bookmarkTitle) == 'string' ? _bookmarkTitle : window.document.title); 
var url = encodeURIComponent((typeof(_bookmarkUrl) == 'string' ? _bookmarkUrl:window.location.href)); 
PlurkUrl = 'http://www.plurk.com/?status=' + url + ' (' + title + ')&qualifier=shares';
FaceBookUrl = 'http://www.facebook.com/share.php?u=' + url;
            


document.addEventListener('keyup', function(event) 
{

		if( !event.shiftKey && event.altKey && event.ctrlKey ) 
		{
			//alert(event.keyCode);
			var url,target;
			if( event.keyCode ==80) //鍵 p Plurk
			{
				target="Plurk";
				url=PlurkUrl;
				
				var answer = confirm("Pust to " + target)
				if (answer){ window.location = url;	}
			
			}
			if( event.keyCode ==70) //鍵 f facebook
			{
				target="Facebook";
				url=FaceBookUrl;
				
				var answer = confirm("Pust to " + target)
				if (answer){ window.location = url;	}				
			}	


			
			
		}
	
}, true);



