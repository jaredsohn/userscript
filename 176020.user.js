// ==UserScript==
// @name           FaCeBooK VideO DownLoadeR [fb.com/iDMFree]
// @namespace      FaCeBooK VideO DownLoadeR [fb.com/iDMFree]
// @include        *facebook.com/*
// @version	       0.1.4
// @date           2013-08-18
// @update         2013-10-20
// @author         MHK
// ==/UserScript==

function vid_dwn()
{
	if(document.getElementById('fbPhotoPageMediaInfo'))
	{
		var place_11=document.getElementById('fbPhotoPageMediaInfo').childNodes[0];
		var place_12=document.getElementsByClassName('hasCaption')[0];
		if(!document.getElementById('mhk_vid_down'))
		{
			try
				{
					vid_name="";
					var flashvars=document.getElementsByClassName('videoStage')[0].childNodes[0].getElementsByTagName('embed')[0].getAttribute('flashvars');
					var flashvars_decoded=decodeURIComponent(flashvars);
					var i1=flashvars_decoded.indexOf("sd_src")+9;
					var link1=flashvars_decoded.slice(i1);
					var i2=link1.indexOf(",")-1;
					var link1=link1.slice(0,i2);
					var i1nm=flashvars_decoded.indexOf("video_title=")+12;
					vid_name=place_11.innerHTML.slice(place_11.innerHTML.indexOf("span>")+5);
					if(vid_name=="")
						if(place_12.getElementsByClassName('text_exposed_root')[0])
						{
							vid_name=place_12.getElementsByClassName('text_exposed_root')[0].innerHTML.split('<br>')[0].replace('<span dir="rtl">','');
						}
						else
						try{vid_name=place_12.innerHTML.split('<br>')[1].replace('<span dir="rtl">','');}catch(ex){}
					vid_name=vid_name.replace(/'/g,"_");
					place_11.innerHTML+=" <b><a id='mhk_vid_down' href='"+link1+"' download='"+vid_name+".mp4' title='Ctrl + click \n==&gt; by MHK (c) 2013 &lt;=='>SD</a></b>";;
					console.log("SD M1 Added...");
					if(flashvars_decoded.indexOf("hd_src") != -1)
					{
						try
							{
								var i1hq=flashvars_decoded.indexOf("hd_src")+9;
								var link2=flashvars_decoded.slice(i1hq);
								var i2hq=link2.indexOf(",")-1;
								var link2=link2.slice(0,i2hq);
								if(link2.indexOf(".mp4") != -1)
								{
									place_11.innerHTML+=" <b><a id='mhk_vid_down' href='"+link2+"' download='"+vid_name+" [HD].mp4' title='Ctrl + click \n==&gt; by MHK (c) 2013 &lt;=='>HD</a></b>";
									console.log("HD M1 Added...");
								}
							}
						catch(ex)
							{
								console.log("Error HD M1 : "+ex.message);
							}
					}
				}
			catch(ex)
				{}
		}
	}
	else
		vid_dwn_indx();
}
/***********************************************************************************************************************************************************/
function vid_dwn_indx()
{
	if(!document.getElementById('mhk_vid_down'))
	{
		if( (document.getElementsByClassName('videoStage')[0]) && (document.getElementsByClassName('fbPhotoSnowliftVideoTitle')[0]) )
		{
			if(document.getElementsByClassName('videoStage')[0].getElementsByTagName('embed')[0])
			{
				var place_21=document.getElementsByClassName('fbPhotoSnowliftVideoTitle')[0];
				var place_22=document.getElementsByClassName('hasCaption')[0];
				vid_name=document.getElementsByClassName('fbPhotoSnowliftVideoTitle')[0].innerHTML;
				if(vid_name=="")
					if(place_22.getElementsByClassName('text_exposed_root')[0])
						{
							vid_name=place_22.getElementsByClassName('text_exposed_root')[0].innerHTML.split('<br>')[0].replace('<span dir="rtl">','');
						}
						else
						try{vid_name=place_22.innerHTML.split('<br>')[1].replace('<span dir="rtl">','');}catch(ex){}
				vid_name=vid_name.replace(/'/g,"_");
				var flashvars=document.getElementsByClassName('videoStage')[0].getElementsByTagName('embed')[0].getAttribute('flashvars');
				var flashvars_decoded=decodeURIComponent(flashvars);
				var i1=flashvars_decoded.indexOf("sd_src")+9;
				var link1=flashvars_decoded.slice(i1);
				var i2=link1.indexOf(",")-1;
				var link1=link1.slice(0,i2);
				place_21.innerHTML+=" <b><a id='mhk_vid_down' href='"+link1+"' download='"+vid_name+".mp4' title='Ctrl + click \n==&gt; by MHK (c) 2013 &lt;=='>SD</a></b>";;
				console.log("SD M2 Added...");
				if(flashvars_decoded.indexOf("hd_src") != -1)
					{
						try
							{
								var i1hq=flashvars_decoded.indexOf("hd_src")+9;
								var link2=flashvars_decoded.slice(i1hq);
								var i2hq=link2.indexOf(",")-1;
								var link2=link2.slice(0,i2hq);
								if(link2.indexOf(".mp4") != -1)
								{
									place_21.innerHTML+=" <b><a id='mhk_vid_down' href='"+link2+"' download='"+vid_name+" [HD].mp4' title='Ctrl + click \n==&gt; by MHK (c) 2013 &lt;=='>HD</a></b>";
									console.log("HD M2 Added...");
								}
							}
						catch(ex)
							{
								console.log("Error HD M2 : "+ex.message);
							}
					}
			}
		}
	}
}

// Attach method
var obj = document.createElement("script");
obj.type = "application/javascript";
obj.innerHTML = vid_dwn+'vid_dwn();';
obj.innerHTML = vid_dwn_indx+'vid_dwn_indx();';

document.body.appendChild(obj);
var intrvl=self.setInterval(function(){vid_dwn()},3000);