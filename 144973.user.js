// ==UserScript==
// @name			Facebook Chat İfade Sistemi ByFabs
// @description	                Facebook Chat İfade Sistemi ByFabs&&HasanGry
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			ByFabs&&Hasangry
// @version			 3
// @versionnumber	         3
// ==/UserScript==
//

var s_input,s_input_class,yeni,eski,suan,kelimeler;

var ifade=[':R',':gun:',':E',':Ğ',':I',':K',':L',':T',':W',':byfabs:',':hasan:',':HASAN:'];
var foto_id=['[[425413494160600]] ','[[425413580827258]] ','[[425054180863198]] ','[[425054187529864]] ','[[425054210863195]] ','[[425054217529861]] ','[[425054224196527]] ','[[425054227529860]] ','[[425054230863193]] ','[[425408824161067]][[463422667030980]][[463422487030998]][[463422450364335]][[463422457031001]][[463422613697652]][[ByFabs]] ','[[425411927494090]] ','[[425420984159851]] [[425421227493160]] [[425421004159849]] [[425421227493160]] [[425420987493184]] '];

Array.prototype.inArray=function(value)
{
	for (var i=0;i<this.length;i++)
	{
		if (this[i]==value)
		{
			return true;
		}
	}
	return false;
};

setInterval(function(){
	s_input=document.activeElement;
	s_input_class=s_input.getAttribute('class');

	if(s_input_class=='uiTextareaAutogrow _552m' || s_input_class=='uiTextareaAutogrow _1rv')
	{
		eski='';
		suan=s_input.value;
		

			suan=s_input.value;
			
			if(eski!=suan)
			{
				yeni='';
				kelimeler=suan.split(' ');
				for(var k=0;k<kelimeler.length;k++)
				{
					if(ifade.inArray(kelimeler[k]))
					{
						for(var i=0;i<ifade.length;i++)
						{
							kelimeler[k]=kelimeler[k].replace(ifade[i],foto_id[i]);
						}
					}
				
				if(yeni=='')
				{
					yeni=kelimeler[k];
				}else
				{
					yeni=yeni+' '+kelimeler[k];
				}
				suan=yeni;
				}

				s_input.value=yeni;
				eski=yeni;
			}
	}
},0);