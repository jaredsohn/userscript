// ==UserScript==
// @name          Wikipedia Zodiac Signs
// @namespace     http://www.ponweiser.net
// @description   Adds zodiac signs to Wikipedia's persons' infoboxes
// @match http://en.wikipedia.org/wiki/*
// ==/UserScript==

var getElementsByClassName = function (className, tag, elm){
/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};


var myArray = getElementsByClassName("bday", "span",document);
for ( var i=0, len=myArray.length; i<len; ++i ){

  //var strDate = "1889-04-26";
  var strDate = myArray[i].innerHTML;
  var dateParts = strDate.split("-");
  var month = dateParts[1];
  var day = dateParts[2];

  var td_element = myArray[i].parentNode.parentNode;

  var symbol_name_eng = "";
  var symbol_unicode_codepoint = 0X0020;

  // aries
  if ((month==3 && day>=21) || (month==4 && day<21)) {
    symbol_name_eng = "Aries";
    symbol_unicode_codepoint = 0X2648;
    }
  else if ((month==4 && day>=21) || (month==5 && day<21)) {
    symbol_name_eng = "Taurus";
    symbol_unicode_codepoint = 0X2649;
    }
  else if ((month==5 && day>=21) || (month==6 && day<22)) {
    symbol_name_eng = "Gemini";
    symbol_unicode_codepoint = 0X264A;
    }
  else if ((month==6 && day>=22) || (month==7 && day<23)) {
    symbol_name_eng = "Cancer";
    symbol_unicode_codepoint = 0X264B;
    }
  else if ((month==7 && day>=23) || (month==8 && day<24)) {
    symbol_name_eng = "Leo";
    symbol_unicode_codepoint = 0X264C;
    }
  else if ((month==8 && day>=24) || (month==9 && day<24)) {
    symbol_name_eng = "Virgo";
    symbol_unicode_codepoint = 0X264D;
    }
  else if ((month==9 && day>=24) || (month==10 && day<24)) {
    symbol_name_eng = "Libra";
    symbol_unicode_codepoint = 0X264E;
    }
  else if ((month==10 && day>=24) || (month==11 && day<24)) {
    symbol_name_eng = "Scorpio";
    symbol_unicode_codepoint = 0X264F;
    }
  else if ((month==11 && day>=24) || (month==12 && day<22)) {
    symbol_name_eng = "Saggitarius";
    symbol_unicode_codepoint = 0X2650;
    }
  else if ((month==12 && day>=22) || (month==1 && day<21)) {
    symbol_name_eng = "Capricorn";
    symbol_unicode_codepoint = 0X2651;
    }
  else if ((month==1 && day>=21) || (month==2 && day<20)) {
    symbol_name_eng = "Aquarius";
    symbol_unicode_codepoint = 0X2652;
    }
  else if ((month==2 && day>=20) || (month==3 && day<21)) {
    symbol_name_eng = "Pisces";
    symbol_unicode_codepoint = 0X2653;
    }

  var span_symbol = document.createElement("span");
  var span_symbol_text = document.createTextNode(" " +String.fromCharCode(symbol_unicode_codepoint) + " ");
  span_symbol.appendChild(span_symbol_text);
  span_symbol.setAttribute("title", symbol_name_eng);
  td_element.insertBefore(span_symbol, myArray[i].parentNode);
}
