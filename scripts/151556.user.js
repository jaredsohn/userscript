// ==UserScript==
// @name           Fetlife infinite scroll (User Filters)
// @version        0.2
// @description    allows for "infinite" scrolling and user filters in the user search area of the site.
// @include        http*://fetlife.com/search/kinksters*
// ==/UserScript==
// Programmed by Ovron (https://fetlife.com/users/113836) (http://userscripts.org/users/491413)
//		leave questions or comments on either my userscripts page or my fetlife account (i check my fetlife account more often)
var scrollWatch = 
{
	LOCK:false,
	Filter : function()
	{

		//alert('filter');
		var SexFilter = $('#user_sex').val()[0] + ' ';
		var userRoleFilter = ' ' + $('#user_role').val();
		var User_Age_Min = parseInt($('#User_Age_Min').val());
		var User_Age_Max = parseInt($('#User_Age_Max').val());
		var Pictures = $('#Pictures').attr('checked');

		var isMatch = true;
		$('.user_in_list span.quiet').each(function(index, element)
		{
			$(element).parent().parent().show();
			//age filter
			if(User_Age_Min > 0 && User_Age_Max > User_Age_Min)
			{
				var age = parseInt($(element).html().substring(0,2));
				if(age < User_Age_Min || age > User_Age_Max)
					$(element).parent().parent().hide();
			}
			//role filter
			if(userRoleFilter.indexOf('undefined') == -1)
			{
				if($(element).html().indexOf(userRoleFilter) == -1)
					$(element).parent().parent().hide();
			}
			//sex filter
			if(SexFilter.indexOf('undefined') == -1)
			{
				if($(element).html().indexOf(SexFilter) == -1)
					$(element).parent().parent().hide();
			}
		});
		//no image filter
		if(Pictures == 'checked')
		{
			$('.user_in_list img').each(function(index, element)
			{
				if($(element).attr('src').indexOf('/images/avatar_missing') > 0)
					$(element).parent().parent().parent().hide();
			});
		}
		$('.user_in_list span.large a').each(function(index, element){
			$(element).attr('target', '_blank');
		});
		
	},
	InitFilters : function()
	{
		var filters = '<div class="Filters">';
		
		filters +='<div class="Sex" >';
		filters +='<select name="user[sex]" id="user_sex"> onchang="scrollTo(0,0)">';
		filters +='<option value="">Any Sex</option>';
		filters +='<option value="M">Male</option>';
		filters +='<option value="F">Female</option>';
		filters +='<option value="CD/TV">Crossdresser/Transvestite</option>';
		filters +='<option value="MtF">Trans - Male to Female</option>';
		filters +='<option value="FtM">Trans - Female to Male</option>';
		filters +='<option value="TG">Transgender</option>';
		filters +='<option value="GF">Gender Fluid</option>';
		filters +='<option value="GQ">Genderqueer</option>';
		filters +='<option value="IS">Intersex</option>';
		filters +='<option value="B">Butch</option>';
		filters +='<option value="FEM">Femme</option>';
		filters +='<option value="">Not Applicable</option></select>';
		filters +='</div>';
			
		filters +='<div class="Role">';
		filters +='<select name="user[role]" id="user_role">';
		filters +='<option value="">Any Role</option>';
		filters +='<option value="Dominant">Dominant</option>';
		filters +='<option value="Domme">Domme</option>';
		filters +='<option value="Switch">Switch</option>';
		filters +='<option value="submissive">submissive</option>';
		filters +='<option value="Master">Master</option>';
		filters +='<option value="Mistress">Mistress</option>';
		filters +='<option value="slave">slave</option>';
		filters +='<option value="pet">pet</option>';
		filters +='<option value="kajira">kajira</option>';
		filters +='<option value="kajirus">kajirus</option>';
		filters +='<option value="Top">Top</option>';
		filters +='<option value="Bottom">Bottom</option>';
		filters +='<option value="Sadist">Sadist</option>';
		filters +='<option value="Masochist">Masochist</option>';
		filters +='<option value="Sadomasochist">Sadomasochist</option>';
		filters +='<option value="Ageplayer">Ageplayer</option>';
		filters +='<option value="Daddy">Daddy</option>';
		filters +='<option value="babygirl">babygirl</option>';
		filters +='<option value="brat">brat</option>';
		filters +='<option value="Primal">Primal</option>';
		filters +='<option value="Fetishist">Fetishist</option>';
		filters +='<option value="Kinkster">Kinkster</option>';
		filters +='<option value="Hedonist">Hedonist</option>';
		filters +='<option value="Vanilla">Vanilla</option>';
		filters +='<option value="Unsure">Unsure</option>';
		filters +='<option value="Not Applicable">Not Applicable</option>';
		filters +='</select>';
		filters +='</div>';
		
		filters +='<div class="AgeFilter">AGE: <input id="User_Age_Min" type="text" style="width:20px;" value="18"/> - TO - <input id="User_Age_Max" type="text" style="width:20px;" value="99"/></div>';
		filters +='<div class="PhotoFilter">Has Pictures: <input id="Pictures" type="checkbox" checked="checked"/></div>';
		filters +='<div class="FilterGo"><input id="FilterGoBtn" type="button" onclick="scrollTo(0,300);setTimeout(\'scrollTo(0,0);\', 500);" value="Filter"/></div>';
		
		filters +='</div>';
		$('body').children().first().before(filters);
		$('.Filters').css({
			'display': 'block',
			'height': '100%',
			'position': 'fixed',
			'z-index': '100'
		});
	},
	isScrolledIntoView : function(elem)
	{	
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();

		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();

		return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
		  && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
	},
	LookAndLoad : function()
	{
		if($('.next_page').length > 0)
		{
			if(scrollWatch.isScrolledIntoView($('.next_page')) && scrollWatch.LOCK == false){
				scrollWatch.LOCK = true;
				$.ajax({
					url:'https://fetlife.com' + $('.next_page').first().attr('href'),
					dataType:'html',
					useCache:false,
					success:function(data)
					{
						$('.pagination').before($('div.clearfix', $(data)).first());
						$('.pagination').html($('.pagination', $(data)).html());
						scrollWatch.Filter();
						scrollWatch.LOCK = false;
						scrollWatch.LookAndLoad();
					}
				});
			}
			else
			{
				scrollWatch.Filter();
			}
		}
	}
}
window.onscroll = function()
{
	scrollWatch.LookAndLoad();
}
$(document).ready(function(){

    var script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);
	scrollWatch.InitFilters();
});