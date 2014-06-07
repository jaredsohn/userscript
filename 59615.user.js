// ==UserScript==
// @name           Pooflinger's MessHuntizer
// @namespace      Pooflinger
// @description    Bring a mess to MouseHunt
// @include        http://apps.facebook.com/mousehunt/*
// ==/UserScript==

/*
<div id="app10337532241_publishButton_4" class="journalPublishForm" fbcontext="261c1cd6ba81" title="Publish to wall" style="float: right;">
<form id="feed_form_4ad2c0014cde72d99314231" onsubmit="return false;" action="http://98.129.188.217/mousehunt/platform/managers/feeds/publishjournal.php" fbtype="feedStory">
<input id="publish" class="inputsubmit publish_form_submit" type="submit" fb_protected="true" value=" " name="publish"/>
<input type="hidden" value="4" name="publishButton"/>
<input type="hidden" value="1 oz." name="tokens[weight]"/>
<input type="hidden" value="13" name="tokens[mid]"/>
<input type="hidden" value="Zombie" name="tokens[mouse]"/>
<input type="hidden" value="Laboratory" name="tokens[env]"/>
<input type="hidden" value="2700" name="tokens[points]"/>
<input type="hidden" value="2701" name="tokens[gold]"/>
<input type="hidden" value="" name="tokens[loot]"/>
</form>
</div>*/





mess_poo();
show_id();
	
function $(id) {
return document.getElementById(id);
}
function dprompt(msg, df)
{
	var rt;
	do
		{
		rt=prompt(msg, df);
		}
	while (!rt || rt==null || rt=='');
	
	return rt;
}
function show_id()
{
if (window.location.href.indexOf('facebook.com/mousehunt/adversaries.php?all')==-1)
	return;
if (!$('app10337532241_contentcontainer'))
	return;
	
var ent = $('app10337532241_contentcontainer').getElementsByTagName('a');
for (var i=0; i<ent.length; i++)
	{
	if (ent[i].href.indexOf('adversaries.php?mid=')==-1)
		continue;
	
	ent[i].childNodes[1].childNodes[3].innerHTML+=' (PhotoID='+
		ent[i].href.match(/mid=(.+)/)[1]+')';
	}
}
function mess_poo()
{

if (!$('app10337532241_contentcontainer'))
	return;

var ent = $('app10337532241_contentcontainer').getElementsByTagName('form');
var obj;

for (var i=0; i<ent.length; i++)
	{
	if (ent[i].id.substr(0,9)!='feed_form')
		continue;
	
	ent[i].addEventListener("click", function ()
		{
		//$("poo"+this.id).parentNode.removeChild($("poo"+this.id));
		$("poo"+this.id).style.display='none';
		}
		, false);
	
	ent[i].addEventListener("mouseover", function ()
		{

		if ($("poo"+this.id))
			{
			$("poo"+this.id).style.display='block';
			return;
			}
				
		var obj = document.createElement("div");
		obj.id = "poo"+this.id;
		//obj.style.textAlign = 'right';
		obj.style.width = '100%';
		obj.style.background = '#EEEECC';
		//obj.setAttribute('style','float: right;');
		//obj.setAttribute('onmouseout', 'this.parentNode.removeChild(this);');
		
		var x=5;
		var marray = [
		//prompt, display HTML,	value prefix, value suffix
		['Weight', 			'Weight: ',			'',			''],
		['MousePhotoID', 	'MousePhotoID: ',	'',			''],
		['Mouse',			'Mouse: ',			'',			''],
		['Location', 		'Location: ',		'',			''],
		['Points', 			'Total Points: ',	'',			''],
		['Gold',			'Total Gold: ',		'',			''],
		['Loot',			'', 				'Loot: ',	'<br/>']
		];
		
		obj.innerHTML = 
			'<a style=float:right;color:red;font-size:12pt;font-weight:bold; title=Close id=cpoo'+this.id+'>X</a>' +
			'<B>MessHuntizer</B>'+
			'<br/><a id=mess6__'+this.id+' href=javascript:;>'+marray[6-x][1]+this.childNodes[6].value+'</a>' +	// mid
			' [<a href=\'javascript:'+
				'if (confirm("Click OK to see a list of mouse photos and their IDs.\\n'+
				'Note that you cannot use a photo of a mouse that you have not yet caught.")) '+
				'window.location.href="http://apps.facebook.com/mousehunt/adversaries.php?all";\'>Help</a>]'+
			'<br/><a id=mess7__'+this.id+' href=javascript:;>'+marray[7-x][1]+this.childNodes[7].value+'</a>' +	// mouse
			'<br/><a id=mess5__'+this.id+' href=javascript:;>'+marray[5-x][1]+this.childNodes[5].value+'</a>' + // weight
			'<br/><a id=mess8__'+this.id+' href=javascript:;>'+marray[8-x][1]+this.childNodes[8].value+'</a>' +	// loc
			'<br/><a id=mess11__'+this.id+' href=javascript:;>'+marray[11-x][1]+this.childNodes[11].value.replace('<br />','')+
				((this.childNodes[11].value.length==0)?'Loot: none':'') + '</a>' + // loot
			'<br/><a id=mess10__'+this.id+' href=javascript:;>'+marray[10-x][1]+this.childNodes[10].value+'</a>' + // gold
			'<br/><a id=mess9__'+this.id+' href=javascript:;>'+marray[9-x][1]+this.childNodes[9].value+'</a>'+	// point
			'';
		
		this.parentNode.parentNode.childNodes[3].insertBefore(obj, this.parentNode.parentNode.childNodes[3].childNodes[0]); 
		//this.parentNode.parentNode.childNodes[3].
		
		$('cpoo'+this.id).addEventListener("click", function () {
			this.parentNode.parentNode.removeChild(this.parentNode);
			}
			, false);
		
		
		for (var j=x; j<=11; j++)
			{
			$('mess'+j+'__'+this.id).addEventListener("click", function () {
				var j = parseInt(this.id.split('__')[0].replace('mess',''));
				var obj = $(this.id.split('__')[1]);
				var p = dprompt('New value for '+marray[j-5][0].replace(': ',''),
					this.innerHTML.substr(this.innerHTML.indexOf(': ')+2,100));
				this.innerHTML = marray[j-5][1]+marray[j-5][2]+p;
				
				//alert(obj.parentNode.parentNode.childNodes[1].innerHTML);
				
				// CHECK LOOT
				if(j==11 && p=='none')
					obj.childNodes[j].setAttribute('value','');
				
				else obj.childNodes[j].setAttribute('value',marray[j-5][2]+p+marray[j-5][3]);
				
				// ADD TEXT behind points
				if(obj.childNodes[9].getAttribute('value').indexOf('MessHuntizer')==-1)
					obj.childNodes[9].setAttribute('value',obj.childNodes[9].getAttribute('value')+
					'<br/>'+
					'Created with <A href=http://www.facebook.com/pooflinger>Pooflinger</A>\'s '+
					'<A href=http://furoma.com/messhuntizer/>MessHuntizer</A>');
				}
				, false);
			}
		
		}
		, false);
	
	/*ent[i].addEventListener("mouseout", function () {
		$("poo"+this.id).parentNode.removeChild($("poo"+this.id));
		}
		, false);*/
		
		}

/*	obj = document.createElement("style");
	obj.innerHTML = '.app_content_10337532241 .journalPublishForm .publish_form_submit_poo { border: medium none #ffffff; background: transparent url("http://98.129.188.217/mousehunt/images/buttons/addtowall_icon2.gif") no-repeat scroll right top; width: 21px; height: 19px; }'
		+'.app_content_10337532241 .journalPublishForm .publish_form_submit_poo:hover { cursor: pointer; }';
	document.body.appendChild(obj); */
}