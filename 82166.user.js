// ==UserScript==
// @name           Twitter lists
// @namespace      http://www.drvar.com
// @description    Twitter lists on top of timeline
// @include        http://twitter.com/*
// @include        http://www.twitter.com/*
// @exclude         
// ==/UserScript==

String.prototype.between = function(prefix, suffix) {
  s = this;
  var i = s.indexOf(prefix);
  if (i >= 0) {
    s = s.substring(i + prefix.length);
  }
  else {
    return '';
  }
  if (suffix) {
    i = s.indexOf(suffix);
    if (i >= 0) {
      s = s.substring(0, i);
    }
    else {
      return '';
    }
  }
  return s;
}
 

var allElements, thisElement,thisElementTXT, twitterUsername,tU;
allElements = document.evaluate(
    '//*[@id]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allElements.snapshotLength; i++) {
    twitterUsername = allElements.snapshotItem(i);
    if(twitterUsername.id == "me_name"){
           tU=twitterUsername;
            }
}    
    

   
for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
    thisElementTXT = thisElement.innerHTML;
    if(thisElement.id == "side_lists"){
           // alert(thisElement.id);
          //  alert(thisElement.innerHTML);
          var liNR;
					liNR = thisElement.getElementsByTagName('li');
          for (var listtNR = 0; listtNR < liNR.length; listtNR++) {
            var navbar, newElement; 
						navbar = document.getElementById('heading');
						
						if (navbar) {
								var listID = thisElementTXT.between('list-link','" data');
								var replaceme= "list-link"+listID;
								var listID = listID.replace(" ","");
								thisElementTXT=thisElementTXT.replace(replaceme, "A                  A")
								//alert(listID);
							   var copy = document.createElement("span");
							 newElement ="<a style=\"color:#666666;font-size:18px;font-weight:normal;padding-left:25px;\"  class=\"in-page-list-link "+listID+"\"  data=\"{&quot;mode&quot;:&quot;public&quot;,&quot;description&quot;:&quot;opis&quot;,&quot;dispatch_action&quot;:&quot;list&quot;,&quot;uri&quot;:&quot;/pcelamed/"+thisElementTXT.between('</em><span>','<')+"&quot;,&quot;member_count&quot;:1,&quot;slug&quot;:&quot;"+thisElementTXT.between('</em><span>','<')+"&quot;,&quot;following&quot;:false,&quot;full_name&quot;:&quot;@pcelamed/"+thisElementTXT.between('</em><span>','<')+"&quot;,&quot;user&quot;:&quot;pcelamed&quot;,&quot;subscriber_count&quot;:0,&quot;name&quot;:&quot;"+thisElementTXT.between('</em><span>','<')+"&quot;,}\"  href=\"/"; 
							   newElement += tU.innerHTML;
							   newElement += "/";
							   newElement += thisElementTXT.between('</em><span>','<'); //ime liste
							   newElement +="\"><em></em><span>";
							  newElement += thisElementTXT.between('</em><span>','<'); //ime liste
							  newElement +="</span></a>";
							  copy.innerHTML=newElement;
							  //alert(newElement);
						     navbar.parentNode.insertBefore(copy, navbar.nextSibling);
						     
								}
								 var replacemetoo = "</em><span>"+thisElementTXT.between('</em><span>','<')+"<";
		             thisElementTXT=thisElementTXT.replace(replacemetoo, "")
            }
           
            }
}

var navbar1, newElement1; 
	navbar1 = document.getElementById('heading');   
	
	var copy1 = document.createElement("span");
	newElement1 ="<a style=\"color:#666666;font-size:18px;font-weight:normal;padding-left:15px;\"    href=\"/replies"; 
	newElement1 +="\"><em></em><span>@";
	newElement1 += tU.innerHTML;
	newElement1 +="</span></a>";
	copy1.innerHTML=newElement1;
	//alert(tU.innerHTML);
	navbar1.parentNode.insertBefore(copy1, navbar1.nextSibling);
	
 var navbar2, newElement2; 
	navbar2 = document.getElementById('heading');   
	
	var copy2 = document.createElement("span");
	newElement2 ="<br><a style=\"color:#666666;font-size:18px;font-weight:normal;padding-left:10px;\"    href=\"/home"; 
	newElement2 +="\"><em></em><span>";
	newElement2 +="Home</span></a>";
	copy2.innerHTML=newElement2;
	//alert(tU.innerHTML);
	navbar2.parentNode.insertBefore(copy2, navbar2.nextSibling);
	
var IntervalId = 0;
var original_title;
	   original_title=document.title;
	
	function checkTitle()
{
var new_title=document.title; 
if (original_title != new_title)
	{	
		 var beep="data:audio/x-wav,RIFFV%06%00%00WAVEfmt%20%1E%00%00%00U%00%01%00%11%2B%00%00%C4%09%00%00%01%00%00%00%0C%00%01%00%02%00%00%00%04%01%02%00q%05fact%04%00%00%00%0C%11%00%00data%18%06%00%00%FF%E30%C4%00%00%00%02%5B!%40%00%00%FF%D6%26%94%88%06T%FF%CE%DBO%3A%91%DF%FC%3C%D1%8B%0C4G%E8%01%A3%3A%06T%88%01%23%F6%E0%DD0%B1%20%0A0%06%C0%C7%FE%18PY%00%D8%82pY%1F%BF%C0%08%98l%C00%10%9C%19%F1%1F%FF%FE'%01C%863%0D%8C%03%03%00%C0%80%B9%CF%FF%FCR%8C%3AF%18%B2%08%B0c%40%E9%0A%3F%FF%FF%E1%7F%C2%FB%8ALN%E4%F8%A4%01%B4%02%D3%064%3E%E1%AA%05g%FF%FF%FF%F0%B0%F1%ECl%1F%20%84%B0%5D0%C6a%89%C3%23%88%06(%00%C4%01%CA%FF%E3%20%C4%8F.%04f4%01%9B%A0%00%05%BC%7F%FF%FF%FF%FF%8C%D9%14%0CfhE%C3%18%0DqK%88%08'%02.1%81%AB%07%60bA%A0%99%B0%FE%23%FF%FF%FC%88%1E6%B0(%18%0E%05%03%8D0%C3%0C%2CY%A4%B7%8C%A2%B3A%F8%EC%B1%AD%9Ez%B3%A3%D6%E4%D0%D0)%E0%9B%02%88%C6%E9%8Fr%40%D4*%E2LH%8F5%B2%09%FF%E30%C42%23%03%0A%E6U%98i%00%12%07%90%3AH%87%3C%C5%D0MW%5B%AC%EA%96J%18%1A5%96%92%DD%AAY%81%81%9A%A9%BAJd7%FB%A0%F4%EC%DAj%A6%87%FD%FD%17c%CBt%DD%D9%3BS_%FF%A4%82%0E%C8-6N%CA%A7%D6%EE%85%06M%1F%FF%E6%ECjoY%F3B%F3F%CApB%B3%EF%FF%CA%1841%C9N%AF%A0)%02%5C'%ADs%A8%ED%93%1D%15mL%0Ac%05%A4%D5%A6X%122%ACL3-%ED%DF%CC%C2%0Fk%E3%FB%D2%AE%BD%97%E9o%FF%EB%F7%94%F9%8F%BFD%DF%FBS%ED%FF%E3%20%C45%20%03%E2%EC%01%8C%40%00%E5%E5%FEa%B9%95%FE%BF%9E)%1Fy%C4Ns%CB%E8y%06X%A9tX%EB%BA%A8%F8%A9%97%ED*%ACs%8D%DB%BEb%D2%B3%83%A5%18%D3j%E3%A2%B5%A9%EEx%FB%FF%FF%FE*%A2%B7t%89n%A7%EDx%ABH%83%02%87%CD%0D(%3B%EE%E5%3FA%3E%C0%D4%0C%0DAn%98%F8k%DB%C3%CA%7F%E7%FF%E30%C4%10%1A%BA%AE%E4)%C3%18%01%B7o%F7)%A9%DB%3F9%B6yM%8Bz%5E%5CiK%88~%A5%E7%CA%7D%CF%3AfR%C5%2C%B8%B7n%FF%0DL%D9%188%C4%C5JR%95%DD%2CR%7C%AD0x%EFA46%A0T%84%CC%92%00%7F%95%A7%F2k)%9C%17A%D6%15v_%25x%AFmz%15%FDd%BD%F9%B4%FE%D4%E7%FF%3F%FF~%80E%BAt%0E~tp%FA%9B%92%D8%23%04%C1%0BE%B3n%C8sE%BAs-%E3%E7%89%3C%BEU%FD%A9%D6%2F%93l%FF%FE_%25%87%AC%05%EB%FF%A6J%B0%F42%FB%FF%E3%20%C44%19%C2%9E%E5%92HF%5C%9A%AE%A4~DR%D7N%9E%26%19%11%A6l%B5%B1%AE%90%D1%81%B4%1E%09%09%80K%3C%40%1A%5B%C7%0B%1DZ%D1%E9uT%C89%04%8BI%86%91%05%8D%0C(%3E%8F%26%13*%05NBO%09%3As%A5P%CE%DALy%C6%8AD%D1%B6%FC%CE%B5(yde%C3%A0%25%9C%963%5E2%FF%D5%E7%CF%FF%E30%C4(%1Ar%3A%D4r%09%86%05%FA%BD%23%2B%0DV7%14%A5%FF%5Da%99~f%B2%7B%3A%0Ac%E2%B0Z%25%5C%A0PI%01IM%E0'%00L%0A(%88*%EFY%BFB%0F%FF%E2%BF%DC%F7%05%1F~%BCS%BB%FAo%9D8%2B%1F%CB%FE%DA%FBh%07gJ%106%A0%20q%9C%83%1D%C9a%C2%B0%FDj%B6%B3R%F4%F2%94%2B%EC%DCmT)y3Q*V%ECx%F5%1F%3C%E37%93%5D%8DZ%1D%26%F2%3C%FE%2F%0E%0A%3C%D8%FE37%F5%1E3d%C6YQ3%5C%E9L%FEF%26%A4%B0%D6.%DC%FF%E3%20%C4M%1A%C2%E2%BC%F8%18%87%05%14%C5%F3%D5B%93%F6O%89y%91%A0%B9l%1A%DD%C6k%A5%ED%99W%D4%FB%F3'%FEI%5D%FD%2Cv%98%02%08%C4%08A~%1E%AA9%E1W%AFk%5E%EF%D8%C833-%C9%3Fn3G%D9%8B%B5v%CA%89%B0%E1%EC%ABD%F5K%B9%96%CD2%B5UT%8FU*%BE%7Be%E7%ED%F9O%E9d%EA%FF%E30%C4%3D%1BB%9E%9C%F3H%18%00T%8C%F6mJ)%5DW%FA%BBl*%85%3B%85Ph4%1D%92uQ%10%E0%9B%88%9Dp%BA*%0D)%03h%22%BE%D55a8%08%0E%A4XT%E9%DAQ%014%01d%AE%19x%BA%AEd%2C%EF.%92!Q%FC%9A%15%10%3DN%FF%85D%13%97%13%D0%9E%FF%E6C%B4LI%22Xb%FF%F8%93%078%3A%84%D8.A%D49_%FF%89%90%8D%06%D0%14bL%91%26%04%F89%3F%FF%F8%E0%03%D8v%97%0F%89(%C0%A8%C4p%85%D4%91%FF%FF%FF%12%D0ID%94%0FP%B8%FF%E3%20%C4_%23%C4%1EH%01%92h%00%82z%05%04%3F%04%D4NB%DCH%98%11W%FF%FF%FF%F8%C2%9A%17%9DFF%C5%D2D%A2%24%C7%0C%C3%92'%A3%24%E9%24%7C-%BF%FF%FF%FF%FF%E3%B8%B7%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%E30%C4%2B%00%00%02%5B!%80%00%00%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%E3%20%C4%BA%05%80%02%5B!%C0%00%00%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF";
	
  var soundEmbed = document.createElement("embed");
  soundEmbed.setAttribute("src", beep);
  soundEmbed.setAttribute("hidden", true);
  soundEmbed.setAttribute("id", 'beep-player');
  soundEmbed.setAttribute("autostart", true);
  soundEmbed.setAttribute("width", 0);
  soundEmbed.setAttribute("height", 0);
  soundEmbed.setAttribute("enablejavascript", true);
  document.body.appendChild((soundEmbed));
  clearInterval(IntervalId);
 //setTimeout ( "window.location.href=window.location.href", 30000 );
 
		
		}
	}



IntervalId = setInterval ( checkTitle, 5000 );