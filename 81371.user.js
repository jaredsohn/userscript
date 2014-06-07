//
// ==UserScript==
// @name          Dirty Tags
// @namespace   http://dirty.ru/
// @description   Dirty Feature Pack
// @author	crea7or
// @include       http://dirty.ru/*
// @include       http://www.dirty.ru/*
// @include       http://music.dirty.ru/*
// @require http://crea7or.spb.ru/scripts/user.js.updater.php?id=81371&days=7
// @version        1.2.1
// ==/UserScript==
//


function vTagsGetCursor(input)
{
    var result = {start: 0, end: 0};
    if (input.setSelectionRange)
    {
        result.start= input.selectionStart;
        result.end = input.selectionEnd;
    } else if (!document.selection) 
    {
        return false;
    } else if (document.selection && document.selection.createRange) 
    {
        var range = document.selection.createRange();
        var stored_range = range.duplicate();
        stored_range.moveToElementText(input);
        stored_range.setEndPoint('EndToEnd', range);
        result.start = stored_range.text.length - range.text.length;
        result.end = result.start + range.text.length;
    }
    return result;
}

function vTagsSetCursor(txtarea, start, end)
{
    if(txtarea.createTextRange) 
    {
        var range = txtarea.createTextRange();
        range.move("character", start);
        range.select();
    } 
    else if (txtarea.selectionStart) 
    {
        txtarea.setSelectionRange(start, end);
    }
}

function vTIns_tag(startTag, endTag, elementId)
{
    var txtarea = document.getElementById( elementId );
    txtarea.focus();
    var scrtop = txtarea.scrollTop;
    var cursorPos = vTagsGetCursor(txtarea);
    var txt_pre = txtarea.value.substring(0, cursorPos.start);
    var txt_sel = txtarea.value.substring(cursorPos.start, cursorPos.end);
    var txt_aft = txtarea.value.substring(cursorPos.end);
    if (cursorPos.start == cursorPos.end)
    {
        var nuCursorPos = cursorPos.start + startTag.length;
    }
    else
    {
        var nuCursorPos=String(txt_pre + startTag + txt_sel + endTag).length;
    }
    txtarea.value = txt_pre + startTag + txt_sel + endTag + txt_aft;
    vTagsSetCursor(txtarea,nuCursorPos,nuCursorPos);
    if (scrtop) txtarea.scrollTop=scrtop;
}

function vTIns_text(tagName, elementId)
{
    var startTag = '<' + tagName + '>';
    var endTag = '</' + tagName + '>';
    vTIns_tag(startTag, endTag, elementId);
    return false;
}

function vTIns_image( elementId)
{
    var src = prompt('enter image src', 'http://');
    if(src)
    {
        vTIns_tag('<img src="' + src + '" alt="image">', '', elementId);
    }
}


function vTIns_link( elementId)
{
    var href = prompt('enter a href', 'http://');
    if(href)
    {
        vTIns_tag('<a href="' + href + '">', '</a>', elementId);
    }
}

function vTagsManage( vTagAnchor )
{
	vTagsNoPnt1 = vTagAnchor.title.replace( /(,\s)/ig, ' ');
	vTagsNoPnt = vTagsNoPnt1.replace( /,/ig, ' ');
	if (vTagAnchor.innerHTML == 'x' )
	{ 
		vTagAnchor.innerHTML = '-'; 
		$('js-new_tag_input').value = vTagsNoPnt; 
		tagsHandler.submitTag(); 
	} 
	else 
	{ 	
		vTagAnchor.innerHTML = 'x' ; 
		tagsHandler.deleteTag( $('js-tags_private'), vTagsNoPnt );
	}
	return false;
}

function vTagsLoadTagsFromLS( vTagsArrLocalStore )
{
	// load values
	if ( ! vTagsArrLocalStore )
	{
		vTagsArrLocalStore = localStorage.getItem('vTagsStore' );
	}
	var vTagsLocalStoreArray = vTagsArrLocalStore.split("\n");
	
	//workaround for opera with 0x10 code at the end of stings
	if ( vTagsLocalStoreArray.length > 0 )
	{		
		if ( vTagsLocalStoreArray[0].charAt( vTagsLocalStoreArray[0].length -1 ) == "\r" )
		{
			for ( i = 0; i < vTagsLocalStoreArray.length; i++ )
			{	
				if ( vTagsLocalStoreArray[i].charAt( vTagsLocalStoreArray[i].length -1 ) == "\r" )
				{
					var r = vTagsLocalStoreArray[i].replace(/\r/g,'');
					vTagsLocalStoreArray[i] = r;
				}	
			}
		}
	}

	//load settings
	var vTagsFloatCloud = localStorage.getItem('vTagsFloatCloud' );

	// fastjoin tags part
	// get my user name
	var vTagsMyName;
	var vTagsDivHTI = document.getElementsByClassName('header_tagline_inner');
	if ( vTagsDivHTI )
	{
		vTagsDivHTI = document.getElementsByTagName('a');
		vTagsMyName = vTagsDivHTI[0].text;
	}
	// get list of public tags
	var vTagsJoinDiv = document.getElementById('js-tags_public');
	var vTagsListString = vTagsLocalStoreArray.toString();
	if ( vTagsJoinDiv )
	{
		var vTagsPubLi = vTagsJoinDiv.getElementsByTagName('li');
		if ( vTagsJoinDiv )
		{
			var vTagsPubA;
			for ( i = 0; i < vTagsPubLi.length; i++ )
			{				
				vTagsPubA = vTagsPubLi[i].getElementsByTagName('a');
				if ( vTagsPubA )
				{
					if ( vTagsPubA[0].title.indexOf( vTagsMyName ) < 0 )
					{	
						if ( vTagsListString.search( new RegExp( vTagsPubA[0].text,'i') ) < 0 )
						{
							vTagsLocalStoreArray.unshift( vTagsPubA[0].text );
						}
					}
				}
			}					
		}
	}
	//


	//
	var vTagsDiv = document.querySelector('div.b-i-tags_comments_page');
	var vTagsMyDiv;
	if ( vTagsDiv )
	{
		vTagsMyDiv = document.getElementById('js-tags-script-predefines');
		if ( vTagsMyDiv )
		{
			vTagsDiv.removeChild( vTagsMyDiv );
		}
		vTagsMyDiv = document.getElementById('js-tags-script-floatlink');
		if ( vTagsMyDiv )
		{
			vTagsDiv.removeChild( vTagsMyDiv );
		}
	}



	vTagsMyDiv = document.createElement('div');
	vTagsMyDiv.setAttribute('id','js-tags-script-floatlink');
	vTagsMyDiv.setAttribute('style', 'font-size: 12px; display: block;');
	if ( vTagsFloatCloud == 1 )
	{
		vTagsMyDiv.setAttribute('style', 'font-size: 12px; display: block;');
	}
	else
	{
		vTagsMyDiv.setAttribute('style', 'font-size: 12px; display: none;');
	}
	vTagsDiv.appendChild( vTagsMyDiv );
	vTagsMyDiv.innerHTML += "<a href=\"#\" onclick=\"var e = document.getElementById('js-tags-script-predefines');  if(e.style.display == 'block') e.style.display = 'none'; else e.style.display = 'block'; return false;\" class=\"dashed\">список тегов</a><br><br>";


	vTagsMyDiv = document.createElement('div');
	vTagsMyDiv.setAttribute('id','js-tags-script-predefines');
	if ( vTagsFloatCloud == 1 )
	{
		vTagsMyDiv.setAttribute('style', 'font-size: 12px; display: none;');
	}
	else
	{
		vTagsMyDiv.setAttribute('style', 'font-size: 12px; display: block;');
	}
	vTagsDiv.appendChild( vTagsMyDiv );

	if ( vTagsLocalStoreArray.length > 0 )
	{
		var vTagsUserName;
		var vTagsDd = document.querySelector('div.dd');
		if ( vTagsDd )
		{ 
			var vTagsListA = vTagsDd.querySelectorAll('a');
			for ( n =0; n < vTagsListA.length; n++ )
			{
				if ( vTagsListA[n].href.search('user') >= 0 )
				{
					vTagsUserName = vTagsListA[n].text + " молодец!";
				}
			} 
		}
		if ( vTagsUserName.length > 0 ) 
		{
			vTagsLocalStoreArray.push( vTagsUserName );
		}

		for ( i = 0; i < vTagsLocalStoreArray.length; i++ )
		{
			vTagsMyDiv.innerHTML += "<a href=\"#\" onclick=\"$('js-new_tag_input').value = '" + vTagsLocalStoreArray[i] + "'; tagsHandler.submitTag(); return false;\" title=\"" + vTagsLocalStoreArray[i] + "\">" + vTagsLocalStoreArray[i] +   "</a>";
			if (( vTagsLocalStoreArray.length - 1 ) != i )
			{
				vTagsMyDiv.innerHTML += " . ";
			}			
		}
		vTagsMyDiv.innerHTML += "<br><br>";
	}
}

function vHtfGetItemLocalStore( vHtfName, vHtfDefault )
{
    vHtfTemp = localStorage.getItem( vHtfName );
    if ( vHtfTemp == null )
    {
        vHtfTemp = vHtfDefault;
    }
    return vHtfTemp;    
}

// script start
// Jovan premium and write buttons
if(( document.location.href.indexOf("music") > 0 || document.location.href.indexOf("comments") == -1 ) && document.location.href.indexOf("inbox") == -1 )
{
	if( document.location.href.indexOf("music.dirty.ru/comments") > 0 || document.location.href.indexOf("write") > 0 )  
	{ //write buttons

		// add script to the page
		var vTagsScr=document.createElement("script");
		vTagsScr.type="application/javascript";
		vTagsScr.textContent = vTagsGetCursor + "\n" + vTagsSetCursor + "\n" + vTIns_tag + "\n" + vTIns_text + "\n" + vTIns_image + "\n" + vTIns_link;
		document.body.appendChild( vTagsScr );

		
		var vTagsInputs =  document.getElementsByTagName('form');

		var vTagID;
		if ( vTagsInputs )
		{
			for ( i =0; i < vTagsInputs.length; i++ )
			{
				vTagID = 'cmnt_' + vTagsInputs[i].getAttribute('id');
				vTagsTextAreaDiv = vTagsInputs[i].querySelector('textarea');
				if ( vTagsTextAreaDiv )
				{
					vTagsTextAreaDiv.setAttribute('id',vTagID);

					if ( document.location.href.indexOf("music") >= 0 )
					{ 
						vTagTab1 = vTagsInputs[i].querySelector('table');
						vTagTab2 = vTagTab1.querySelector('table');
						vTagsTextAreaWriteHdr = vTagTab2.querySelector('td');
					}
					else
					{
						vTagsTextAreaWriteHdr = vTagsInputs[i].querySelector('div.write_page_header_right');
					}

					if (vTagsTextAreaWriteHdr )
					{
						var newdiv = document.createElement('div');
						newdiv.setAttribute('class', 'textarea_editor');
						newdiv.setAttribute('style', 'textarea_editor');
						newdiv.innerHTML = "<br><a onclick=\"return vTIns_text('b', '" + vTagID + "');\" href=\"#\"><b>Bold</b></a>&nbsp;<a onclick=\"return vTIns_text('i', '" + vTagID + "');\" href=\"#\"><i>Italic</i></a>&nbsp;<a onclick=\"return vTIns_text('u', '" + vTagID + "');\" href=\"#\"><u>Underline</u></a>&nbsp;<a onclick=\"return vTIns_text('sup', '" + vTagID + "');\" href=\"#\">x<sup>2</sup></a>&nbsp;<a onclick=\"return vTIns_text('sub', '" + vTagID + "');\" href=\"#\">x<sub>2</sub></a>&nbsp;<a onclick=\"return vTIns_text('irony', '" + vTagID + "');\" href=\"#\"><span class=\"irony\">Irony</span></a><span class=\"textarea_editor_divider\">&nbsp;</span><a onclick=\"vTIns_link('" + vTagID + "'); return false;\" href=\"#\"><b>Link</b></a>&nbsp;<a onclick=\"vTIns_image('" + vTagID + "'); return false;\" href=\"#\"><b>Image</b></a>";
						vTagsTextAreaWriteHdr.appendChild( newdiv );
					}
				}
			}
		}

	} //write buttons
	else
	{ // Jovan premium
		vTagsJovanPremium = localStorage.getItem('vTagsJovanPremium' );
		if ( vTagsJovanPremium == 1 )
		{
		 	var vTagsPosts = document.getElementsByClassName('dt');
			if ( vTagsPosts )
			{
				var vTagsH3;
				var vTagsIMG;	
				for(var i=0; i < vTagsPosts.length; i++)
				{	
					vTagsH3 = vTagsPosts[i].getElementsByTagName('h3');
					vTagsIMG = vTagsPosts[i].getElementsByTagName('img');
					if (( vTagsH3.length > 0 ) && ( vTagsIMG.length > 0 )) 
					{	
						vTagsIMG[0].setAttribute('style', 'display: none;');
					}
				}
			}
		}
	} // Jovan premium
} // Jovan premium and write buttons
else
{  // Everything else

	// add script to the page
	var vTagsScr=document.createElement("script");
	vTagsScr.type="application/javascript";
	vTagsScr.textContent = vTagsLoadTagsFromLS + "\n" + vTagsManage;
	document.body.appendChild( vTagsScr );
		
	//predefined tags
	var vTagsPredefinedArray =["Тупая фигня", "Это же реклама" , "Это неправда", "Об этом уже писали", "Ctrl-C Ctrl-V", "Свежак", "КДПВ", "Скандалы интриги расследования", "Все правильно сделал", "Фишкинет", "Господи какая красота111", "британские учёные", "Чиновники", "Милиция","Оборотни","Беспредел","Наука","Космос","Искусство","История","Авто","Авиация","Армия","РПЦ","Маразм","Кругом враги","Животные","fapfapfap","боже он умер","Вавилонская библиотека","вирусняк","Гурусик нямка","Думаем о России","пост проклят","еще один все понял","и снова о Главном","Зачем моё измождённое тело","слава богу родился","лепрозорий на выезде","нафталин","ожируй клюв","он же упоротый","политический кружок при сельском клубе","слава России","Творчество душевнобольных","понаехали","Я маленькая лошадка","Я открыл для себя википедию" ];


	var vTagsFloatCloud;
	var vTagsAutoSetGold;
	var vTagsJovanPremium;

	//build divs
	var vTagsDiv = document.querySelector('div.b-i-tags_comments_page');
	if ( vTagsDiv )
	{
		vTagsDiv.setAttribute('style', 'padding-top: 10px' );

		var vTagsArrRestor = localStorage.getItem('vTagsStore' );		

		if ( ! vTagsArrRestor )
		{	
			var vTagsArrToStr = vTagsPredefinedArray.toString();
			vTagsArrRestor = vTagsArrToStr.replace(/,/gi,'\n');
			localStorage.setItem('vTagsStore', vTagsArrRestor );
		}
		
		// load options
		vTagsFloatCloud = vHtfGetItemLocalStore('vTagsFloatCloud', 1 );
		vTagsAutoSetGold = vHtfGetItemLocalStore('vTagsAutoSetGold', 1 );
		vTagsJovanPremium = vHtfGetItemLocalStore('vTagsJovanPremium', 0 );

		// create options to edit
		newdiv = document.createElement('div');
		newdiv.setAttribute('style', 'font-size: 12px; display: none;');
		newdiv.setAttribute('id','js-vtags-settings');
		var vTagsSettings = "<form><input type=\"checkbox\" id=\"vtags-float-cloud\" name=\"vtags-float-cloud\" onchange=\" var e = document.getElementById('vtags-float-cloud'); if ( e.checked == true ) { localStorage.setItem('vTagsFloatCloud', 1 ); } else {  localStorage.setItem('vTagsFloatCloud', 0 ); return false; } \"";
		if ( vTagsFloatCloud == 1 )
		{
			vTagsSettings += " checked";
		}
		vTagsSettings += ">скрывать теги под ссылкой</form>";
		
		vTagsSettings += "<input type=\"checkbox\" id=\"vtags-autoset-gold\" name=\"vtags-autoset-gold\" onchange=\" var e = document.getElementById('vtags-autoset-gold'); if ( e.checked == true ) { localStorage.setItem('vTagsAutoSetGold', 1 ); } else {  localStorage.setItem('vTagsAutoSetGold', 0 ); return false; } \"";
		if ( vTagsAutoSetGold == 1 )
		{
			vTagsSettings += " checked";
		}
		vTagsSettings += ">автоматически ставить 'Золотой пост'</form><br>";

		vTagsSettings += "<input type=\"checkbox\" id=\"vtags-jovan-premium\" name=\"vtags-jovan-premium\" onchange=\" var e = document.getElementById('vtags-jovan-premium'); if ( e.checked == true ) { localStorage.setItem('vTagsJovanPremium', 1 ); } else {  localStorage.setItem('vTagsJovanPremium', 0 ); return false; } \"";
		if ( vTagsJovanPremium == 1 )
		{
			vTagsSettings += " checked";
		}
		vTagsSettings += ">опция 'Йован-Премиум'</form><br><br>";


		newdiv.innerHTML = vTagsSettings;
		vTagsDiv.appendChild(newdiv);


		// create list of tags to edit
		newdiv = document.createElement('div');
		newdiv.setAttribute('style', 'font-size: 12px; display: none;');
		newdiv.setAttribute('id','js-vtags-textarea');
		newdiv.innerHTML = "<textarea rows=\"32\" cols=\"40\" id=\"vtags-own-tags\" style=\"font-size: 12px;\"></textarea><br><br>";
		newdiv.innerHTML += "<a href=\"#\" onclick=\"var a = document.getElementById('vtags-own-tags'); localStorage.setItem('vTagsStore', a.value ); var e = document.getElementById('js-vtags-textarea'); e.style.display = 'none'; vTagsLoadTagsFromLS(); return false;\" class=\"dashed\"><img src=\"http://pit.dirty.ru/dirty/1/2010/07/18/28284-165319-dab6dbe746b938b30cc807225bee1e65.png\" width=\"16\" height=\"16\" hspace=\"5\" vspace=\"3\" border=\"0\" align=\"top\">сохранить мой список</a><br><br>";
		vTagsDiv.appendChild(newdiv);

		var vTagsTextArea = document.getElementById('vtags-own-tags');
		if ( vTagsTextArea )
		{	
			if ( vTagsArrRestor )
			{				
				vTagsTextArea.value = vTagsArrRestor;				
			}
		}

		// create link to edit tags
		vTagsTextArea = document.querySelector('div.b-tag_add_form');
		vTagsDiv = vTagsTextArea.getElementsByTagName('form');
		if ( vTagsDiv )
		{
			newdiv = document.createElement('a');
			newdiv.setAttribute('style', 'margin-left: 10px;');
			newdiv.setAttribute('class', 'dashed');
			newdiv.setAttribute('href', '#');
			newdiv.innerHTML = "<img src=\"http://pit.dirty.ru/dirty/1/2010/07/18/28284-162705-21ac0118341f8bfd711a91b3a893af67.png\" width=\"16\" height=\"16\" border=\"0\">";
			newdiv.setAttribute('onclick', "var e = document.getElementById('js-vtags-textarea');  if(e.style.display == 'block') e.style.display = 'none'; else e.style.display = 'block'; return false;");
			vTagsDiv[0].appendChild(newdiv);

			newdiv = document.createElement('a');
			newdiv.setAttribute('style', 'margin-left: 10px;');
			newdiv.setAttribute('class', 'dashed');
			newdiv.setAttribute('href', '#');
			newdiv.innerHTML = "<img src=\"http://pit.dirty.ru/dirty/1/2010/07/18/28284-165149-fb96462198f99265989370ce36a58246.png\" width=\"16\" height=\"16\" border=\"0\">";
			newdiv.setAttribute('onclick', "var e = document.getElementById('js-vtags-settings');  if(e.style.display == 'block') e.style.display = 'none'; else e.style.display = 'block'; return false;");
			vTagsDiv[0].appendChild(newdiv);
		}

		// build my own tags
		vTagsLoadTagsFromLS( vTagsArrRestor );
	}




	// fast tags part
	// regexp based on http://leprosorium.ru/users/antyrat script
	var vTagPattern = /([^:\s\.\>\<][\wа-яёЁ\-\–\—\s\!\?,]+)(\[x\]|\s\[x\]|\s\[х\]|\[х\])+/gi;
//	var vTagReplacement = "$1 [<a href=\"#\" onclick=\"if ( this.innerHTML == 'x' ) { this.innerHTML = '-'; $('js-new_tag_input').value = '$1'; tagsHandler.submitTag(); } else { this.innerHTML = 'x' ; tagsHandler.deleteTag( $('js-tags_private'), '$1'); }  return false;\" title=\"$1\" style=\"color: red;\">x</a>]";
	var vTagReplacement = "$1 [<a href=\"#\" onclick=\"return vTagsManage(this);\" title=\"$1\" style=\"color: red;\">x</a>]";

	var vTagStr;
	var vTagComments = document.getElementsByClassName('c_body');
	var vTagsXPos;
	var vTagStr;
	for(var i=0; i < vTagComments.length; i++)
	{
			vTagStr = vTagComments[i].innerHTML;
			vTagsXPos = vTagStr.indexOf('[x]');
			if ( vTagsXPos < 0 ) 
			{
				vTagsXPos = vTagStr.indexOf('[X]');
			}
			if ( vTagsXPos < 0 ) 
			{
				vTagsXPos = vTagStr.indexOf('[х]');
			}
			if ( vTagsXPos < 0 ) 
			{
				vTagsXPos = vTagStr.indexOf('[Х]');
			}	
			if ( vTagsXPos > 0 ) 
			{	
				vTagComments[i].innerHTML = vTagStr.replace(vTagPattern, vTagReplacement);
			}
	}

	






	if ( vTagsAutoSetGold == 1 )
	{
		document.onLoad = checkGoldTag();
	}

}


function checkGoldTag()
{

	var vTagsSpan = document.querySelector('span.stars');
	var vTagsStarFound = false;
	if ( vTagsSpan )
	{
		vTagsStarFound = true; //gold	
	}
	else
	{
		vTagsSpan = document.querySelector('span.wasstars');
		if ( vTagsSpan )
		{
			vTagsStarFound = true; //silver
		}
	}

	var vTagsStarTagAdded = false;
	var vTagsDiv = document.querySelector('div#js-tags_private');
	if ( vTagsDiv )
	{
		var vTagsPersonal = vTagsDiv.getElementsByClassName('tag');
		if ( vTagsPersonal )
		{
			for ( i =0; i < vTagsPersonal.length; i++ )
			{
				if ( vTagsPersonal[i].text.search(/Золотой пост/i) >= 0 )
				{
					vTagsStarTagAdded = true;
				}
			}
		}
	}
	if ( vTagsStarFound  == true && vTagsStarTagAdded  == false )
	{
		// add  gold
		var vTagBox = document.getElementById('js-new_tag_input');
		vTagBox.value = 'Золотой пост';
		location.href="javascript:void( tagsHandler.submitTag());"				
	}
}
	