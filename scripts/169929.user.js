// ==UserScript==
// @name           redmine designer 
// @namespace      redmine
// @author 	   knight, soa_project@mail.ru
// @version 	   0.0.0.3
// @description    redmine designer
// @license 	   GNU General Public License
// @resource    	picDone   http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Actions-dialog-ok-apply-icon.png
// @resource    	picClose  http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Actions-dialog-cancel-icon.png
// @resource    	picAnswer http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Actions-dialog-ok-icon.png
// @resource    	picNew     http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Actions-rating-icon.png
// @require     	http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include        http://redmine.com
// ==/UserScript==




jQuery(document).ready(function()
{

	strLocation = window.location;

	var re = new RegExp("projects", "gi");

	if (re.exec(strLocation)){
	
    $('td[class=status]').each(function() 
        {
			if ($(this).text()=="Выполнен" || $(this).text()=="Resolved")  	{$(this).html( addImage("picDone", $(this).text()) );}
			if ($(this).text()=="Закрыт" || $(this).text()=="Closed")	{$(this).html( addImage("picClose", $(this).text()) );}
			if ($(this).text()=="Новый" || $(this).text()=="New")	{$(this).html( addImage("picNew", $(this).text()) );}			
			if ($(this).text()=="Назначен" || $(this).text()=="Confirmed")	{$(this).html( addImage("picNew", $(this).text()) );}						
			if ($(this).text()=="Обратная связь" || $(this).text()=="Needs feedback")	{$(this).html( addImage("picAnswer", $(this).text()) );}			
        }
    );

	}
	else
	{
		$('h4').each(function() 
			{
				var h = $(this).html();
				$(this).html("<div style='background-color:yellow;' >" + h + "</div>");
			}
	);
	
	}

	
});



function addImage(imgName, Comment)
{
	return "<image alt='" + Comment + "' style='width:20px;height:20px;' src='" + GM_getResourceURL( imgName ) + "'>";
}