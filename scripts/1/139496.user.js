// ==UserScript==
// @name           TVP.pl no-silverlight
// @description	   Adds embed tags to video content
// @author         Informatic
// @version        1.1
// @email          admin[@]tastycode.pl
// @namespace      userscripts@tastycode.pl
// @include        http://tvp.pl/*
// @include        http://*.tvp.pl/*
// ==/UserScript==

// Changelog:
// 1.0 → first release
// 1.1 → fixed obvious ~bug~ typo causing embedding value of last param instead of media param = not loading videos *facepalms*

function init_tvp() {
	var slo = document.getElementById('silverlightObject')
	
	if(slo != null)
	{
		for(var x in slo.childNodes)
		{
			if(slo.childNodes[x].name == 'initParams')
			{
				parms = slo.childNodes[x].value.split(',')
				params = {}
				for(var x in parms)
				{
					p = parms[x].split('=')
					params[p[0].toLowerCase()] = p[1]
				}
				if(params['media'] != '') // if media param is already provided we embed video as-is
				{
					slo.parentNode.innerHTML+='<embed src="'+params['media']+'" enabled="1" showstatusbar="1" showdisplay="1" showcontrols="1" style="width:100%; height:100%"></embed>'; // no <video> tag cause it's WMV :)
					document.getElementById('silverlightObject').style.display = 'none';
					return;

				}
				else if(params['media'] == '' && params['video_id'] != '') // if media param is not provided we will use XHR
				{
						GM_xmlhttpRequest({
							method: "GET",
							url: 'http://www.tvp.pl/shared/cdn/tokenizer_v2.php?object_id='+params['video_id']+'&sdt_version=2',
							onload: function(o) {
								url = (JSON.parse(o.responseText).url);
								slo.parentNode.innerHTML+='<embed src="'+url+'" enabled="1" showstatusbar="1" showdisplay="1" showcontrols="1" style="width:100%; height:100%"></embed>';
								document.getElementById('silverlightObject').style.display = 'none';
							}
						});
					return

				}
			}
		}
	}
	
	setTimeout(init_tvp, 1000)
}

init_tvp()
