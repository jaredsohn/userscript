// ==UserScript==
// @name			Facebook Chat İfade Sistemi 
// @description	                Facebook Chat İfade Sistemi 
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			okmmjyygv
// @version			 3
// @versionnumber	         3
// ==/UserScript==
//

var s_input,s_input_class,yeni,eski,suan,kelimeler;

var ifade=[':E',':evil:',':N',':bandit:','(y)'];
var foto_id=['[[425054180863198]] ','[[152438611563857]] ','[[152439254897126]] ','[[152439671563751]] ','[[4408159882714]] '];

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

	if(s_input_class=='uiTextareaAutogrow input')
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