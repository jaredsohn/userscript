// ==UserScript==
// @name        Mynet Email Sweep
// @namespace   MynetEmailSweep
// @author      Alper Ebicoglu
// @description Mynet Toplu Email Silme
// @include     http://*.email.mynet.com*
// @version     2
// ==/UserScript==

$(function() 
{
	 
 
	if($('#foldersHeader').length > 0)
	{
		$('#foldersHeader').append('<BR/><BR/><div class="MenuBox3" style="height:33px;"><a href="#" id="deleteButton" style="text-decoration: none;float:left; color:NAVY; font-weight:bold; font-size:12px"><span style="background-image:url(http://dd.email.mynet.com/j/images/ui-icons_3d80b3_256x240.png); background-position: -32px -192px; margin-left: 110px; margin-top: 10px;position: absolute; height: 16px; width: 16px;"></span>Posta Kutusunu Temizle</a></div>');
	}
	
	 
 
	$('#deleteButton').bind("click", function DeleteMails()
	{
		var totalMailCount  = getEmailCount();
		if(totalMailCount==0)
		{
			alert('Gelen kutunuzda hiç e-posta yok.');
		}
		else
		{
			if( window.confirm("Gelen kutusundaki "+totalMailCount+" e-posta silinecektir.\n\rDevam etmek istiyor musunuz?") )
			{
				$('#MySplitter').css('visibility','hidden');
				$('#folderTabContent').prepend('<div id="overlayDiv"><br><br><br><p align="center"><font size="5" color="#000099">E-postalar siliniyor...<center><p id="emailsLeft" align="center"></p></center></font></p></div>');		
				DeleteCurrentMails();
			}
		}
	});
	
	
	function getEmailCount()
	{
		var totalMail = 0;
		try
		{
		   var val = $('#folderTab').children().eq(1).text().trim();
		   if(val != '')
		   {
				totalMail = parseInt( val.replace('(','').replace(')','').toString() );
		   }
		}
		catch(err)
		{}
		
		return totalMail;
	}
	
	function DeleteCurrentMails()
	{
		var totalMail = getEmailCount();

		if(totalMail == 0)
		{
			try
			{
				if($('#MySplitter').length>0)  $('#MySplitter').css('visibility','visible');
				if($('#overlayDiv').length>0)  $('#overlayDiv').remove();
				alert('Gelen kutusu temizlendi.');
			}
			catch(err){}
			return;
		}
		 
		$('#emailsLeft').html('<font size="3" color="#000099">Kalan E-posta: <b>'+totalMail+'</b></font>');
		gridFunctions.toggleCheck(true);
		operations.deleteMsgs();
		setTimeout(DeleteCurrentMails, 100);	
		 
	}
	
	 
});
 
