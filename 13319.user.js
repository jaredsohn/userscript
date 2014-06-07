// ==UserScript==
// @name			4chan Tripcode Colorizer
// @author			Jb55!Jb55REllic ( jackbox55./a/.t/gmail[.]/com )
// @date			10-25-2007
// @namespace		http://www.jb55.com/
// @version			v0.1
// @description		Gives tripfags custom name colors based on their tripcode, useful for differentiating between fakes.
// @include			http://*4chan.org/*
// ==/UserScript==

(function() 
{

	// There is probably an easier way to do this but I'm a javascript newfag
	var charArray = new Array(
	' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-',
	'.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';',
	'<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
	'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
	'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e',
	'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
	't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', '', 'Ç', 'ü',
	'é', 'â', 'ä', 'à', 'å', 'ç', 'ê', 'ë', 'è', 'ï', 'î', 'ì', 'Ä', 'Å',
	'É', 'æ', 'Æ', 'ô', 'ö', 'ò', 'û', 'ù', 'ÿ', 'Ö', 'Ü', 'ø', '£', 'Ø',
	'×', 'ƒ', 'á', 'í', 'ó', 'ú', 'ñ', 'Ñ', 'ª', 'º', '¿', '®', '¬', '½',
	'¼', '¡', '«', '»', '_', '_', '_', '¦', '¦', 'Á', 'Â', 'À', '©', '¦',
	'¦', '+', '+', '¢', '¥', '+', '+', '-', '-', '+', '-', '+', 'ã', 'Ã',
	'+', '+', '-', '-', '¦', '-', '+', '¤', 'ð', 'Ð', 'Ê', 'Ë', 'È', 'i',
	'Í', 'Î', 'Ï', '+', '+', '_', '_', '¦', 'Ì', '_', 'Ó', 'ß', 'Ô', 'Ò',
	'õ', 'Õ', 'µ', 'þ', 'Þ', 'Ú', 'Û', 'Ù', 'ý', 'Ý', '¯', '´', '­', '±',
	'_', '¾', '¶', '§', '÷', '¸', '°', '¨', '·', '¹', '³', '²', '_', ' ');

	
	function charToByte(c)
	{
		var i;
		for(i=0; i < charArray.length; i++) {
			if(c == charArray[i]) return i+32;
		}
		return 0;
	}
	
	function decToHex(d) {
		var hexChars = "0123456789ABCDEF";
		var a = d % 16;
		var b = (d - a)/16;
		var hex = "" + hexChars.charAt(b) + hexChars.charAt(a);
		return hex;
	}
		
	function selectNodes(xpath, context) 
	{
	   var nodes = document.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	   var result = new Array( nodes.snapshotLength );
	   
	   for (var x=0; x<result.length; x++) 
	   {
	      result[x] = nodes.snapshotItem(x);
	   }
	   
	   return result;
	}

	function is_all_ws( nod )
	{
	  return !(/[^\t\n\r ]/.test(nod.data));
	}
	
	function is_ignorable( nod )
	{
	  return ( nod.nodeType == 8) || // A comment node
			 ( (nod.nodeType == 3) && is_all_ws(nod) ); // a text node, all ws
	}
	
	function node_before( sib )
	{
	  while ((sib = sib.previousSibling)) {
		if (!is_ignorable(sib)) return sib;
	  }
	  return null;
	}
	
	function node_after( sib )
	{
	  while ((sib = sib.nextSibling)) {
		if (!is_ignorable(sib)) return sib;
	  }
	  return null;
	}
		
	function doNodes(tripFags, src)
	{
		var tripcode = [];
		tripcode = selectNodes("//span[@class='postertrip']/text()",src);

		for( i=0; i < tripcode.length; i++ )
		{
			var tf = new Object();
			
			tf.isAdmin = 0;

			var nextSib;
			var prevSib;

			prevSib = node_before(tripcode[i].parentNode);
			nextSib = node_after(tripcode[i].parentNode);
			
			if( !prevSib )
			{
				if( tripcode[i].parentNode.parentNode )
				{
					if( tripcode[i].parentNode.parentNode.className == "linkmail" )
					{
						prevSib = node_before( tripcode[i].parentNode.parentNode );
						prevSib = prevSib.firstChild;
					}
				}
			}
	
			
			// Don't colorize moot or other admins
			if( nextSib )
			{
				if( nextSib.className == "commentpostername" )
				{
					if( nextSib.nodeValue == "## Admin" )
						tf.isAdmin = 1;
					else
						tf.isAdmin = 0;
				}
			}
			
			tf.nameNode = prevSib;
			tf.tripcodeNode = tripcode[i];
			//alert(i + " " + tf.nameNode.nodeValue + " " + tf.tripcodeNode.nodeValue );
			tripFags.push(tf);
	  
		}
	}
	
	function tripToRGB(trip)
	{
		var tripcode = trip.substring(1,trip.length-1);
		var t1,t2,t3;
		
		// so that it doesn't get too dark
		var brightness = 20;
		
		t1 = charToByte( tripcode.charAt(0) ) + charToByte( tripcode.charAt(1) ) + charToByte( tripcode.charAt(2) ) ;
		t2 = charToByte( tripcode.charAt(3) ) + charToByte( tripcode.charAt(4) ) + charToByte( tripcode.charAt(5) ) ;
		t3 = charToByte( tripcode.charAt(6) ) + charToByte( tripcode.charAt(7) ) + charToByte( tripcode.charAt(8) ) +
				charToByte( tripcode.charAt(9) );
				
		t1 = (t1%210)+brightness;
		t2 = (t2%210)+brightness;
		t3 = (t3%210)+brightness;
					
		return decToHex(t1) + decToHex(t2) + decToHex(t3);
	}

	function scanDocument()
	{
		tripFags = [];
		
		doNodes(tripFags,document);

		for( j=0; j<tripFags.length; j++)
		{
			// TODO(probablywontbothertodo): Parse secure trips properly
			if( tripFags[j].isAdmin == 1 )
				continue;
			var nodeColor = tripToRGB(tripFags[j].tripcodeNode.nodeValue);
			
			if( tripFags[j].nameNode )
				tripFags[j].nameNode.style.color = nodeColor;
				
			
			tripFags[j].tripcodeNode.parentNode.style.setProperty("color",nodeColor,"important");
			
		}
	}
	
window.addEventListener("load", function() { scanDocument(); }, false);
	
})();