// ==UserScript==
// @name           Image2Text
// @namespace      http://www.neobux.com/
// @include        http://www.neobux.com/?u=c&s=r*
// @include        https://www.neobux.com/?u=c&s=r*
// ==/UserScript==

//options

var img = document.getElementsByTagName('img');

for(var i=0;i<img.length;i++)
	{
		if(img[i].src.indexOf('flag')>0)
			{
			var td = img[i].parentNode;

			if(td.id.indexOf('fgi')>=0)
				{
                if(img[i].src.indexOf('flag0')>0){var txt_FLAG = "W";}
                if(img[i].src.indexOf('flag1')>0){var txt_FLAG = "R";}
                if(img[i].src.indexOf('flag2')>0){var txt_FLAG = "O";}
                if(img[i].src.indexOf('flag3')>0){var txt_FLAG = "Y";}
                if(img[i].src.indexOf('flag4')>0){var txt_FLAG = "G";}

				var txt = document.createElement('span');
					txt.innerHTML = txt_FLAG;
					txt.setAttribute('style','display:none');
					td.appendChild(txt);

				}

			}

		if(img[i].src.indexOf('envelope')>0)
			{
   			function insertAfter(parent, node, referenceNode) {
 			 parent.insertBefore(node, referenceNode.nextSibling);
			}
            if(img[i].src.indexOf('envelope0')>0){var txt_PM="N";}
            if(img[i].src.indexOf('envelope1')>0){var txt_PM="Y";}
			var eee= document.createElement('span');
				eee.innerHTML=txt_PM;
eee.setAttribute('style','display:none');
			insertAfter(img[i],eee,eee);
			}



		if(img[i].src.indexOf('cadeado')>0)
			{
   			function insertAfter(parent, node, referenceNode) {
 			 parent.insertBefore(node, referenceNode.nextSibling);
			}
            if(img[i].src.indexOf('cadeado0')>0){var txt_LOCK="U";}
            if(img[i].src.indexOf('cadeado1')>0){var txt_LOCK="L";}
			var eee= document.createElement('span');
				eee.innerHTML=txt_LOCK;
eee.setAttribute('style','display:none');
			insertAfter(img[i],eee,eee);
			}

	}