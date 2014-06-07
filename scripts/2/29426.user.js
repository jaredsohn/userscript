// ==UserScript==
// @name           Image Attachment Quick View (Bugzilla)
// @namespace      www.ibm.com/developerworks/cn/
// @description    This script is used for Bugzilla. It can display 'Quick View' links for all image attachments so that you can see the images in the current page instead of opening a new page.
// @include        https://landfill.bugzilla.org/bugzilla-tip/show_bug.cgi*
// ==/UserScript==
var attachment_table=document.getElementById("attachment_table");
		var tbody1=attachment_table.getElementsByTagName("TBODY")[0];
		var tr_count=tbody1.rows.length-1

		for(var k=1;k<tr_count;k++){		
			var attachment_tr=tbody1.rows[k];
			var tds=attachment_tr.getElementsByTagName("TD");
			var td1=tds[0];
			//var td2=tds[1];
			var td3=tds[tds.length-1];
			var ahref=td1.getElementsByTagName("A")[0]
			var span1=td1.getElementsByTagName("SPAN")[0]
			
			var re=/Image/i;
			if(re.test(span1.innerHTML)){
				image_url=ahref.href;
				var bug_num=image_url.substr(image_url.lastIndexOf("=")+1);
				image_div_id="image"+bug_num;
				var image_div=document.createElement("div");
				image_div.setAttribute("style","display:none;align:right;");
				image_div.setAttribute("id",image_div_id)
				var close_btn_id="close"+image_div_id
				image_div.innerHTML="<table border='0'><tr><td align='right' style='background-color:lightgray'>	<a href=\"javascript:var container=document.getElementById('"+image_div_id+"'); var content=container.getElementsByTagName('iframe')[0];content.src='';container.style.display='none';void(false);\">close</a><br></td></tr>	<tr><td><iframe  id='content' style='border:1px dotted grey' width='800px' height='600px'></iframe></td></tr></table>"
				td1.appendChild(image_div)
				
				var show_href=document.createElement("a")
				show_href.setAttribute("href","javascript:var container=document.getElementById(\""+image_div_id+"\");var content=container.getElementsByTagName(\"iframe\")[0];content.src=\""+image_url+"\";container.style.display=\"block\";content.onload=function(){ var img=content.contentDocument.getElementsByTagName('img')[0];if(img){var real_width=img.naturalWidth+40;var real_height=img.naturalHeight+40;container.width=real_width;content.width=real_width;container.height=real_height;content.height=real_height;}};void(false);");
				show_href.innerHTML="QuickView"
				td3.appendChild(show_href)
			}
		}