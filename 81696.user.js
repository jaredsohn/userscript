//
//
// ==UserScript==
// @name          Dirty Gold Tag
// @namespace   http://dirty.ru/
// @description   Helps to tag the gold posts on the dirty.ru
// @author	crea7or
// @include       http://dirty.ru/comments/*
// @include       http://www.dirty.ru/comments/*
// @version        1.0.1
// ==/UserScript==
//


document.onLoad = checkGoldTag();

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
