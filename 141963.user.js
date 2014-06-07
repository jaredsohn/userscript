// ==UserScript==
// @name          Viet user
// @namespace     2222.2P.com/userscripts
// @description	  Adds a viet character creator to a page.
// @include 
// ==/UserScript==
// Notes: 'reverse-algebra' to VNI so instead of a1 type 1a. Strict key needs highest number first eg 61a  


function meload(){
	

					
			var area = document.createElement("textarea"); 
			var myattrib = 'onkeyup'; 
             var newVal = "getcode();"
             area.setAttribute(myattrib, newVal); 

             var myattrib2 = 'id'; 
             var newVal2 = "disp";
             area.setAttribute(myattrib2, newVal2); 
             
             var myattrib3 = 'cols'; 
             var newVal3 = "40";
             area.setAttribute(myattrib3, newVal3); 
             
             var myattrib4 = 'rows'; 
             var newVal4 = "5";
             area.setAttribute(myattrib4, newVal4); 
       
			document.body.appendChild(area); 
			var todocss = document.getElementById("disp"); 
			todocss.style.position = "fixed";
			todocss.style.bottom = "1px";
			todocss.style.left = "1px";
//-----append script and function
//------------------------------------------------------

var areb = document.createElement("script"); 
			var myattrib5 = 'type'; 
             var newVal5 = "text/javascript";
             areb.setAttribute(myattrib5, newVal5); 

  areb.innerHTML = "function getcode() {var keyBox = new Array('61a', '62a', '63a', '64a', '65a', '71a', '72a', '73a', '74a', '75a', '61e', '62e', '63e', '64e', '65e', '61o', '62o', '63o', '64o', '65o', '71o', '72o', '73o', '74o', '75o', '71u', '72u', '73u', '74u', '75u'); var keyBox2 = new Array('1a', '2a', '3a', '4a', '5a', '6a', '7a', '9d', '1e', '2e', '3e', '4e', '5e', '6e', '1i', '2i', '3i', '4i', '5i', '1o', '2o', '3o', '4o', '5o', '6o', '7o', '1u', '2u', '3u', '4u', '5u', '7u', '1y', '2y', '3y', '4y', '5y'); var charBox = new Array('ấ', 'ầ', 'ẩ', 'ẫ', 'ậ', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ', 'ế', 'ề', 'ể', 'ễ', 'ệ', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ', 'ứ', 'ừ', 'ử', 'ữ', 'ự');	var charBox2 = new Array('á', 'à', 'ả', 'ã', 'ạ', 'â', 'ă', 'đ', 'é', 'è', 'ẻ', 'ẽ', 'ẹ', 'ê', 'í', 'ì', 'ỉ', 'ĩ', 'ị', 'ó', 'ò', 'ỏ', 'õ', 'ọ', 'ô', 'ơ', 'ú', 'ù', 'ủ', 'ũ', 'ụ', 'ư', 'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ'); var stringText = document.getElementById('disp').value; var pold = stringText.substring(stringText.length - 3); if (keyBox.indexOf(pold) > -1) {var newStr = stringText.substring(0, stringText.length - 3);var indexkey = keyBox.indexOf(pold);var asthat = charBox[indexkey];document.getElementById('disp').value = newStr + asthat;} else {var qold = stringText.substring(stringText.length - 2);if (keyBox2.indexOf(qold) > -1) {var newString = stringText.substring(0, stringText.length - 2);var indexkey2 = keyBox2.indexOf(qold); var althat = charBox2[indexkey2];if(althat != undefined){document.getElementById('disp').value = newString + althat;}}}}";
       
			document.body.appendChild(areb); 
}

meload();









