// ==UserScript==
// @name           Flickr "Lights Out"
// @description    Turn the lights out for a better look at your Flickr photos!
// @include        http://*flickr.com/photos/*/*
// @include        http://*flickr.com/photo_zoom*
// ==/UserScript==


function addButtonToMenu()
{
	var offButton = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%001%00%00%00%18%08%06%00%00%00S%3F%15%E2%00%00%00%06bKGD%00%85%00%85%00%85%FAi*Y%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D7%05%1F%07%00%2B%AA%86%A1K%00%00%00%1DtEXtComment%00Created%20with%20The%20GIMP%EFd%25n%00%00%02%E9IDATx%DA%ED%97%CFN%E2P%14%C6%7F-mAP%88%D1%84%60p%A1%2B%5D%B9%D3%18u%A7%09%C6%9D%BE%80%EE%7C%017%3C%00K%1F%C3%B5%7B7%BC%80qA%BA%A9%86hM%C0X%B0%A4%C5%96%DB%22%9D%C5%8C%C6A%FC%C3%CC%86%99%F8%25Mz%9Bsn%EEw%FA%7D%A7%A7R%14E%11%FF8d%FE%03%7C%93%18%15(%FD%0Fl%DB%A6%D9l%E2%BA.%AE%EB%E2%FB%3EOOO%A8%AA%CA%EC%EC%2C%0B%0B%0B%23GBz6v%18%86%DC%DE%DE%22%84%20%95J%91H%24%D04%0DI%92%10B%D0l6%A9T*%00%14%0A%05%D2%E9%F4h%C9%A9%D7%EBa%18%06%92%24%91%CB%E5%18%1F%1F%07%C0%F3%3C%1C%C7%A1%D3%E9055%C5%CE%CE%0E%D9l%96%93%93%13%3A%9D%CE%C0%0DK%A5%D2%BB%EBR%A9%F4f%DD%7F%FF%1C3(%AF%7F%EF%DF%E4d%9A%26%B2%2C3%3D%3DM%10%04h%9AF2%99D%D34%00%84%10%B4Z-L%D3dyy%99%BB%BB%3B%CA%E52%85B%E1%CB%D5*%95J%14%8B%C5O%E3%8A%C5%E2o%B1_%C9%93%9FId2%19%82%20%40%92%24%14E!%8A%22%84%10%08!%E8%F5z%8C%8D%8D%11%8B%C50%0C%83%D5%D5%D5%17i%0D%8B%F7%AA%FC%19%A9%8Fbd%00%C7qH%24%12x%9E%87%EF%FB%B8%AEK%AB%D5%C2%B6m%1A%8D%06%8DF%03%CB%B2h4%1A%98%A6I%3A%9D%C6%F7%FD%3F%22%D1_%D5b%B1%F8i%A5%9Fc%3E%94%93%24I%B4%DBm%E2%F18%17%17%17%C4%E3qTUE%96e%A2(%C2%F7%7D%A2(%C2%B2%2C%F2%F9%3C%8E%E3%A0(%CA%87%D5%EE%3F%F0%EBC%7CEV%83%7C%F3%5E%9E%14EQ%A4%EB%3A%F5z%9D%B5%B55%CA%E52A%10%10%8B%C5%5E%FC%A0i%1A%B6m%23%84%60oo%8F%B3%B33TUewwwt%BA%D3%E2%E2%22B%08t%5Dgee%E5%85%40%18%86%84a%08%80%A6ilnnr%7D%7D%8D%AE%EBlmm%8DV%8B%95e%99%F5%F5u%0C%C3%A0Z%AD%F2%F8%F8%F8Sk%8AB*%95%02%C0u%5Dj%B5%1A%A7%A7%A7%EC%EF%EF311%F1%D7%86%FEJ%7B%1Dj%EC%C8d2loosyy%89eYX%96%C5%C3%C3%03%96e%E18%0EWWW%94%CBe%0E%0F%0F%99%9F%9F%1F%9A%C0g%E6%7C%AD%F9a%3C%F3fv%9A%9C%9Cdcc%03EQ%E8v%BB%D4j5%AA%D5*%E7%E7%E7%DC%DC%DCppp%C0%CC%CC%CC%E8%CFN%F9%7C%9Ev%BBM6%9B%25%9F%CF%E3y%1E%AE%EBb%DB%F6H%12%18H%02%20%99L%92%CB%E5XZZ%C24M*%95%CA%D0%1E%18%F4%C1%EA%97%CC%9F%B4%DC%0F%07%C0%D7%A8%D7%EB%1C%1D%1Dq%7F%7FO%B7%DB%25%93%C9p%7C%7C%CC%DC%DC%DCH%BE%09%E9%FB%F7%F4%9B%C47%897%24%A2_%D7%3F%8B%1F%225%8D5N%A6%A5%E8%00%00%00%00IEND%AEB%60%82";
	var overButton = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%001%00%00%00%18%08%06%00%00%00S%3F%15%E2%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D7%05%1F%07%03%0C%24%A1G%E3%00%00%00%1DtEXtComment%00Created%20with%20The%20GIMP%EFd%25n%00%00%03%2BIDATx%DA%ED%97MhTW%14%C7%7F%F7%BD%3B%99%8F%CC%D7%8B%9AIL%AA%89%8A%09%26%9A4%09%22%82uW%A4%14%0A%5D%14%B3%10%E2Bq%A3%2Bq%A1%0B%0D%E8%187%82%AD%0B7n%5CY(%A4%9B%16%8C%85%96%96%D2V%A4%08%12kK%9A%D4%C1%AF%7C0%CFL2%DF%EF%BD%EBB%06%E2df%92%8C%9B%B1%E4l%EE%C7%B9%E7%9E%F3%3F%F7%9C%7B%CF%15J)%C5%7BL%D1h%14%8D%FF%01%AD%83%A8%15%92%C5%13%F33%8F%B1%13S%E8%D6%1C*%FB%0A%95%9B%C7%CA%A4%C9Z%A0%82%DD%7C%D0%3FX%BB%20r%99%05%92%CF%7F%C7%E7%B6%D1%0D%03%E1nGH%1FB%08%9CL%0A%CB%9C%249%F1%1D%FF%8D%8Ea%EC%3FG(%B2%A3%B6%C2%C9%B6r%2C%C6%C6%F0%07%BD%B86u%A1%05%9A%11%D2%01%15%C7%B1%5E%804qmn%C38x%81%0D%AD%BD%C4%EF%9C%24%95%98%2B%B9%A1a%18e%C7%86a%2C%1B%17%F7%0BkJ%C9%15%EF%FD%16%88%F8%D4%8F%D4%FB%3C%C8%D06PY%84%90%08W%0B%9Ag%17%BA%AF%17%CD%D3%09%B6%85%9D%FE%83%40%FF%11%FC%0D%DB%89%FD0%B2%26o%19%86%81i%9A%98%A6Yq%5D%81_h%97%CA%95%93%D5%00%C4%FC%23t%FF%16P)%10%12%84%07pPN%0A%E5%A4%40Y%08%3D%08H%AC%C5%BB%04%FB%86%D0%9E%FEV%D5%D1%97%F3r%25P%2B%AD%91%00%22%1BGs%07p%ACi%10.p%D2(%DB%06%C7B%A9%3CB%E5PZ%0A%3B%3B%89%CAOP%17%DA%8F%93NW%05%A2%60T%B1%E7W%02%B2%F4TJ%82%C8frX%0B3%C8%B0%9F%DC%CCm%84%E6%23%7D%FF%1F%90%1EPy%EC%C44%F5%1F%ED%C5%C9%FC%85%2B%F4!%B9%F84J%93%15%BD%BDTy%B1%F1%2B%85T%B9%9C*''%01%F2%81nRS%3F%13%1A8%0AN%9E%C4%F7_%E3%3F%F41%A0P%F6%22B%EF%C0%BCu%99%C0g%07%90%1B%3Eg%F6%9B%AF%C8o%EC%A9%E8%B5R%E3%D5%F2*%C9%94%CD%89%D6%FEA%E6%E7%5E%92%7C%7C%07w%F31%84%C7%0B(%D0S%20%93%A0%14Z%7D%00_%DBY%16%1E%3C%20%3E%3E%C6%96O%CE%D6%D6%3B%A1%EB%92P%DFq%E2%BF%8E%80%12%B8%02%BB%DFpm%2FBy%00%85l%D8K%E2%CF%09%9E%DD%BDJ%FD%A7W%08G%DA%D7%9C%D0%E5%E2%BB%D0_M%E8T%7C%EC%C2%CD%3Bq%F6%9D%E6%D9%2F_%12L%3F%C1%FD%AF%8B%BAN%0BT%0Eg2L%E2%EF%7B%98S%B3D%BE%B8AK%D7%81%AA%AE%D7J%C9%B94o%D6%02%60Y%D9%D1%D0%BA%8B%D9%AE!F%BF%BDI0%D3H%F2%FEO%2C%26%F3%CC%98%5By2%1E%E1%E2%B5%EB%B4t%0D%D4~%01%D8%B1g%1F%D3%197*%DC%8D%AF%E9%14%FE%CD'%D8%D4%3E%80%EDmbG%0D%02(Y%00%02(%1B%9A%23%8D%F4%EC%E9!%16%8B%F1p%FC%11RV%AF%A4%D4%F5Z%ED%95%BBj%10%83%83%879%3F%7C%89WI%0B%CB%CA%E3%AD%83%E1sg%DEIQ)CW%3B%B7%12%89%F5%EF%E9%FA%CFn%1D%C4%DB%89%1D%8DF%DF%7B%10%AF%01%2B%EDy%BB%7C%B4f%CD%00%00%00%00IEND%AEB%60%82";
	
	if(document.getElementById('button_bar'))
	{
		var buttonBar = document.getElementById('button_bar');
		var divbut = buttonBar.appendChild(document.createElement('span'));
		divbut.setAttribute('style','height:24px;');
		var lightsButton = divbut.appendChild(document.createElement('img'));
		lightsButton.setAttribute('style','height:24px;');
		lightsButton.alt = 'turn the lights out';
		lightsButton.addEventListener('mouseover', function() {
				lightsButton.src = overButton;
			},false);
		lightsButton.addEventListener('mouseout', function() {
			lightsButton.src = offButton;
			},false);
		lightsButton.addEventListener('click', function() {
				lightsOut();
			},false);
		lightsButton.src = offButton;
	}
	else
	{
		var paras = document.getElementsByTagName('p');
		for(i = 0; i < paras.length; i++)
		{
			if(paras[i].innerHTML.indexOf("Download the") != -1)
				buttonBar = paras[i];
		}
		
		if(buttonBar)
		{
			var lightsLink = document.createElement('a');
			lightsLink.href = "#";
			lightsLink.appendChild(document.createTextNode("turn the lights out"));
			lightsLink.addEventListener('click', function() {
				lightsOut();
			},false);
			
			var tempDiv = document.createElement('span');
			
			
			tempDiv.appendChild(document.createTextNode(" ("));
			tempDiv.appendChild(lightsLink);
			tempDiv.appendChild(document.createTextNode(")"));
			
			buttonBar.appendChild(tempDiv);
		}
	}
}

function lightsOut()
{
        var lightImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%002%00%00%002%01%03%00%00%00%24%F1%1A%F2%00%00%00%03PLTE%00%00%00%A7z%3D%DA%00%00%00%01tRNS%B3%12%8E%3AP%00%00%00%0EIDAT%18%95c%60%18%05%83%09%00%00%01%90%00%01%D8%F3%95%3F%00%00%00%00IEND%AEB%60%82";
	var darkImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%002%00%00%002%01%03%00%00%00%24%F1%1A%F2%00%00%00%03PLTE%00%00%00%A7z%3D%DA%00%00%00%01tRNS%CD%A53fk%00%00%00%0EIDAT%18%95c%60%18%05%83%09%00%00%01%90%00%01%D8%F3%95%3F%00%00%00%00IEND%AEB%60%82";
	var darkerImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%002%00%00%002%01%03%00%00%00%24%F1%1A%F2%00%00%00%03PLTE%02%02%02x%C6%EA%1A%00%00%00%01tRNS%E7~%88%AF%BD%00%00%00%0EIDAT%18%95c%60%18%05%83%09%00%00%01%90%00%01%D8%F3%95%3F%00%00%00%00IEND%AEB%60%82";
	var outImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%002%00%00%002%01%03%00%00%00%24%F1%1A%F2%00%00%00%03PLTE%02%02%02x%C6%EA%1A%00%00%00%0EIDAT%18%95c%60%18%05%83%09%00%00%01%90%00%01%D8%F3%95%3F%00%00%00%00IEND%AEB%60%82";
	
	if(!document.getElementById('lightsOut'))
	{
	var newDiv = document.createElement('img');
	newDiv.src = lightImg;
	newDiv.setAttribute('id','lightsOut');
    newDiv.setAttribute('style',"position:fixed;top:0;left:0;width:100%;height:100%;z-index:100;");
	newDiv.addEventListener('click', function () {
		if(document.getElementById('lightsOut').src == outImg)
		{
			document.body.removeChild(document.getElementById('lightsOut'));
			for(i=0;i<imgs.length;i++){
				if(imgs[i].parentNode.className.indexOf('photoImgDiv')!=-1||imgs[i].parentNode.parentNode.className.indexOf('DownloadThis')!=-1){
					imgs[i].style.position="static";
					imgs[i].style.zIndex="1";
					imgs[i].style.border='none';
					break;
				}
			}
		}
		else {
			lightsOut();
		}
	},false);
	
	document.body.appendChild(newDiv);
    imgs=document.getElementsByTagName('img');
    for(i=0;i<imgs.length;i++){
      if(imgs[i].parentNode.className.indexOf('photoImgDiv')!=-1||imgs[i].parentNode.parentNode.className.indexOf('DownloadThis')!=-1){
        imgs[i].style.position="relative";
        imgs[i].style.zIndex="2003";
        
		// modify the line below for border settings
		imgs[i].style.border='none';
        break;
      }
    }
	}
	else
	{
		document.getElementById('lightsOut').src = outImg;
	}
  }

addButtonToMenu();