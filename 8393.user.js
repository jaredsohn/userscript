// ==UserScript==
// @name           Iframe Link
// @author         Hugo, baseado na ideia e codigo de Igor Thiago (uid=5118396355984857941)
// @description    Exibe um iframe quando é postado um link no Orkut
// @include        http://www.orkut.com/CommMsgs.aspx*
// @include        http://www.orkut.com/Scrapbook.aspx*
// @version        0.1
// ==/UserScript==
// Pequenas mudancas feita por Igor Thiago (uid=5118396355984857941)


// Se quizer almentar o tamanho do Frame, mude os dados abaixo.
/* Largura */  var width  = 'width:900px' 
/* Altura  */  var height = 'height:650px'


setTimeout(function() {

//comente a linha acima e descomente a linha abaixo para funcionar no Opera
//opera.addEventListener('AfterScript', function(e) {

if (location.href.toLowerCase().indexOf("orkut.com") != -1) {


        function mostrarFrame(local) {
		link				= local.nextSibling;
		iframe				= document.createElement('iframe');
		iframe.src			= link.href;
		iframe.setAttribute("style","background-color: #FFFFFF; display: block; "+width+"; "+height+"; border: #A1BBE4 1px solid");

   	local.parentNode.replaceChild(iframe, link);
		local.innerHTML		= '<img src="data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT%2F2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT%2FwAARCAAPABUDASIAAhEBAxEB%2F8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL%2F8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4%2BTl5ufo6erx8vP09fb3%2BPn6%2F8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL%2F8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3%2BPn6%2F9oADAMBAAIRAxEAPwD1DwbrPhbXrLw1psfhSy8R%2BJdQhjjdfsVsJZZVt2kkeSW4KKf9WxJLEkkdc112ueEYPDmiahq1%2FwDCS2jsbC3kup3RdGcrGilmIVbkknAPAGTXh9hc%2BHtJg0%2BO58RnSdXsFVWNv9qjlhlCFHAkiX0ZhwcEE1evPFWi6haT2t18Q9TubadGilhlvdTZJEYYZWB4IIJBBr52niWrqtSqN3ey0t96Pua2HpyaeGr0lGy%2BJ63tr9lkPxj8YaXa%2FwBkDwb5WjKfO%2B1f2bb%2FAGXzPubN20Ddj5sdcZPrRWF4n0GHxcLU%2BGrqLVFt9wnZQ8Wwtt2%2F6xVznDdM9KK9PAyqSw8XVTUtd%2FVnz2bqhHGzWGacNLNbbK%2F4n%2F%2FZ">';
	}
	function esconderFrame(local) {
		iframe				= local.nextSibling;
		link				= document.createElement('a');
		link.href			= iframe.src;
		link.innerHTML		        = iframe.src;
		
		local.parentNode.replaceChild(link, iframe);
		local.innerHTML		= '<img src="data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT%2F2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT%2FwAARCAAPABUDASIAAhEBAxEB%2F8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL%2F8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4%2BTl5ufo6erx8vP09fb3%2BPn6%2F8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL%2F8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3%2BPn6%2F9oADAMBAAIRAxEAPwDtPhx4z8HeKb3RdCt%2FDVl4q8VXUYSaE2cKyPIkJeV3luCiH7jZO8kkjGc13uq%2FCK4%2BHnhTSfEWq%2BHbPxIkWj3Nzr9iltoqiymRIJA0exYmcAC6GFZ84XjoT876F4c0fQr9Lt%2FF0fh7XLdmVjD9sWaJiCrAPDGRzkjg8g16D4x%2BJqeOPCnhvQbnxnZ6ZHp1jLa6hdWl7qTvqrOkKZmX7ImRiOUnczf60%2B5Pv1KVNSpqnUjZ767ep8tRx8nCq6tGpeO3uvX%2FAA6HH%2BP%2FAIlaJfNZf8INPHpirv8AtY023a13527N3yruxh8dcZPrRWAfh7Feyuvhq7t9Yijx50sXmRhSeg%2FeqpPQ9BRXm4yNOFeUaTutNV6I9jL6s6%2BFhUqRcW76NWe76M%2F%2F2Q%3D%3D">';
	}
	
	function toggleFrame(local) {
		if (local.innerHTML	== '<img src="data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT%2F2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT%2FwAARCAAPABUDASIAAhEBAxEB%2F8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL%2F8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4%2BTl5ufo6erx8vP09fb3%2BPn6%2F8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL%2F8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3%2BPn6%2F9oADAMBAAIRAxEAPwDtPhx4z8HeKb3RdCt%2FDVl4q8VXUYSaE2cKyPIkJeV3luCiH7jZO8kkjGc13uq%2FCK4%2BHnhTSfEWq%2BHbPxIkWj3Nzr9iltoqiymRIJA0exYmcAC6GFZ84XjoT876F4c0fQr9Lt%2FF0fh7XLdmVjD9sWaJiCrAPDGRzkjg8g16D4x%2BJqeOPCnhvQbnxnZ6ZHp1jLa6hdWl7qTvqrOkKZmX7ImRiOUnczf60%2B5Pv1KVNSpqnUjZ767ep8tRx8nCq6tGpeO3uvX%2FAA6HH%2BP%2FAIlaJfNZf8INPHpirv8AtY023a13527N3yruxh8dcZPrRWAfh7Feyuvhq7t9Yijx50sXmRhSeg%2FeqpPQ9BRXm4yNOFeUaTutNV6I9jL6s6%2BFhUqRcW76NWe76M%2F%2F2Q%3D%3D">')
			mostrarFrame(local);
		else
			esconderFrame(local);
	}
	
	links = document.evaluate("//a[contains(.,'.')]", document, null, 7,null);
	i = links.snapshotLength-1;
	if (i > -1) {
		do {
			obj = links.snapshotItem(i);
			
			linkdiv			= document.createElement('span');
			linkdiv.innerHTML	= '<img src="data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT%2F2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT%2FwAARCAAPABUDASIAAhEBAxEB%2F8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL%2F8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4%2BTl5ufo6erx8vP09fb3%2BPn6%2F8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL%2F8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3%2BPn6%2F9oADAMBAAIRAxEAPwDtPhx4z8HeKb3RdCt%2FDVl4q8VXUYSaE2cKyPIkJeV3luCiH7jZO8kkjGc13uq%2FCK4%2BHnhTSfEWq%2BHbPxIkWj3Nzr9iltoqiymRIJA0exYmcAC6GFZ84XjoT876F4c0fQr9Lt%2FF0fh7XLdmVjD9sWaJiCrAPDGRzkjg8g16D4x%2BJqeOPCnhvQbnxnZ6ZHp1jLa6hdWl7qTvqrOkKZmX7ImRiOUnczf60%2B5Pv1KVNSpqnUjZ767ep8tRx8nCq6tGpeO3uvX%2FAA6HH%2BP%2FAIlaJfNZf8INPHpirv8AtY023a13527N3yruxh8dcZPrRWAfh7Feyuvhq7t9Yijx50sXmRhSeg%2FeqpPQ9BRXm4yNOFeUaTutNV6I9jL6s6%2BFhUqRcW76NWe76M%2F%2F2Q%3D%3D">';
			linkdiv.setAttribute("class","img");
			linkdiv.setAttribute("style","margin-right: 6px; cursor: default;");
			
			linkdiv.addEventListener('click',teste = function () {
				toggleFrame(this);
			}, false);
			
			obj.parentNode.insertBefore(linkdiv, obj);
			
		} while (i--);

	}
}


},600);
//comente a linha acima e descomente a linha abaixo para funcionar no Opera
//},false);

