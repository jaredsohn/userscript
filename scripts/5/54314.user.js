// ==UserScript==
// @name           Set Google Back
// @namespace      SGB
// @include        http://www.google.com/
// ==/UserScript==

document.getElementById("ghead").style.display = 'none';
document.getElementById("footer").style.display = 'none';
document.getElementById("logo").style.display = 'none';


var optOnOff = document.createTextNode('Switch');

var thebody = document.getElementsByTagName('body')[0];

//thebody.setAttribute('style', 'background-color:');

var container = document.createElement('ul');
container.setAttribute('style', 'border: 2px dotted #e78af0; padding: 5px; text-align: center; width: 90px; font-size: 10px; background-color:#aaf08a');

////////////////////////////////////////////////////////
var tnc = document.createElement('div');

tnc.setAttribute('id', 'bLogo');
tnc.setAttribute('style', 'font-size: x-large; text-align: center');

var tn = document.createTextNode("GOOGLE BASIC");

tnc.appendChild(tn);

//document.getElementsByTagName('form')[0].parentNode.parentNode.appendChild(tnc);

document.body.insertBefore(tnc, document.body.firstChild);

////////////////////////////////////////////////////////

container.addEventListener(
	    'click',
	    function () {
	      if (document.getElementById("ghead").style.display == 'none')
		  {
				document.getElementById("ghead").style.display = 'block';
				document.getElementById("footer").style.display = 'block';
				document.getElementById("logo").style.display = '';
				document.getElementById("bLogo").style.display = 'none';
				//thebody.setAttribute('style', 'background-color:white');
		  }
		  else
		  {
		  		document.getElementById("ghead").style.display = 'none';
				document.getElementById("footer").style.display = 'none';
				document.getElementById("bLogo").style.display = 'block';
				document.getElementById("logo").style.display = 'none';
				//thebody.setAttribute('style', 'background-color:#D5E5FF');
		  }
	    },
	    false
	  );

container.addEventListener(
	    'mouseover',
	    function () {
	      document.body.style.cursor = 'pointer';
	    },
	    false
	  );	

container.addEventListener(
	    'mouseout',
	    function () {
	      document.body.style.cursor = 'default';
	    },
	    false
	  );	  
	  
	  

container.appendChild(optOnOff);
	  
document.getElementById('body').appendChild(container);