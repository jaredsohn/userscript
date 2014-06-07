// ==UserScript==
// @name          Plain text AACS keys
// @author        Max Lazarov - http://www.insightrepair.com/max/
// @description   Replace AACS Keys images with text without registering
// @include       http://*aacskeys.com/
// ==/UserScript==

var images = document.getElementsByTagName('img');

// ROT13 taken from http://netzreport.googlepages.com/online_converter_for_rot_5_13_18_47.html
function convert_char (rot_algo, range_start, range_end, input_char) 
{
  return String.fromCharCode(range_start + (((input_char.charCodeAt(0) - range_start) + rot_algo) % (rot_algo * 2)));
}

function rot13 (src) {
  var input = src;
  var output = "";
  
  for (var i = 0; i < input.length; i++ ) 
  {
    // Letters A-Z (code 65-90):
    if (input.charCodeAt(i) >= 65 && input.charCodeAt(i) <= 90) 
    {
      output = output + convert_char(13, 65, 90, input.charAt(i));
    } 
    else 
    {
      // Letters a-z (code 97-122):
      if (input.charCodeAt(i) >= 97 && input.charCodeAt(i) <= 122) 
      {
        output = output + convert_char(13, 97, 122, input.charAt(i));
      } 
      else 
      {
        output = output + input.charAt(i);
      }
    }
  }

  return output;
}

for( var i = 0; i < images.length; i++ )
{
	var replaceKey;
	var imgUrl = images[i].getAttribute('src');
	var n = 'img.php?enckey=';
	var t = imgUrl.indexOf(n);

	if( t != -1 )
	{
		images[i].style.display = 'none';
		replaceKey = document.createElement('span');
		replaceKey.setAttribute('style', 'font: 12px courier');
		replaceKey.textContent = rot13(imgUrl.substr(t + n.length, imgUrl.length));
		void(images[i].parentNode.replaceChild(replaceKey, images[i]));
	}
}