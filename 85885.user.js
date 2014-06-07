// ==UserScript==
// @name            Warez-BB Filehost Filter
// @description     Filters displayed threads in the Listings, based on selected filehost(s)
// @include         http://www.warez-bb.org/viewforum.php?f=3
// @include         http://www.warez-bb.org/viewforum.php?f=47
// @include         http://www.warez-bb.org/viewforum.php?f=9
// @include         http://www.warez-bb.org/viewforum.php?f=5
// @include         http://www.warez-bb.org/viewforum.php?f=28
// @include         http://www.warez-bb.org/viewforum.php?f=4
// @include         http://www.warez-bb.org/viewforum.php?f=57
// @include         http://www.warez-bb.org/viewforum.php?f=88
// @include         http://www.warez-bb.org/viewforum.php?f=6
// @include         http://www.warez-bb.org/viewforum.php?f=38
// @include         http://www.warez-bb.org/viewforum.php?f=3&*
// @include         http://www.warez-bb.org/viewforum.php?f=47&*
// @include         http://www.warez-bb.org/viewforum.php?f=9&*
// @include         http://www.warez-bb.org/viewforum.php?f=5&*
// @include         http://www.warez-bb.org/viewforum.php?f=28&*
// @include         http://www.warez-bb.org/viewforum.php?f=4&*
// @include         http://www.warez-bb.org/viewforum.php?f=57&*
// @include         http://www.warez-bb.org/viewforum.php?f=88&*
// @include         http://www.warez-bb.org/viewforum.php?f=6&*
// @include         http://www.warez-bb.org/viewforum.php?f=38&*
// @copyright       xKernel, based on the idea and script of ajcis55.
// ==/UserScript==


(function()
{

function FilterWebpage() {
	var flhost = GM_getValue("filehost");
	if(typeof(flhost)!="undefined"){
		var regexn = new RegExp("\\[[^\\]]*" + flhost +"[^\\]]*\\]","i");
		var rows = document.getElementsByClassName("bodyline")[0].getElementsByTagName('tr');
		for ( var i = 0; i < rows.length; i++ ){
			if(rows[i].getElementsByTagName('tr').length==0 && rows[i].getElementsByClassName('topictitle').length==2){

				if((!rows[i].getElementsByClassName('topictitle')[1].innerHTML.match(regexn)) && (rows[i].getElementsByClassName('topictitle')[1].innerHTML.indexOf(']') > 0) )
				{
					rows[i].style.display='none';
				}
			}
		}
	}
};

function SetFilterValue() {
	var elem = document.getElementById("filtertext");  
	GM_setValue("filehost",elem.value);
	window.location.reload();
};

function ResetFilterValue() {
	GM_setValue("filehost",'');
	window.location.reload();
};


function onBlur(){
	var elem = document.getElementById("filtertext");  
 	if (elem.value == '') {
	elem.value = 'Enter Filter'
	}
};

function onFocus(){
	var elem = document.getElementById("filtertext");  
	if (elem.value == 'Enter Filter') {
		elem.value =''
	}
};

var myCounter = 0;
var nodes = document.getElementsByTagName('input');

while(true){
	temp = nodes[myCounter];
	if(temp.value.toString() == 'Search This Forum')
	{
		break;
	}
	myCounter++;
}


var selected = document.getElementsByTagName('input')[myCounter];

var filterBtn = document.createElement('BUTTON');
filterBtn.appendChild(document.createTextNode("Filter"));
filterBtn.href = '#';
filterBtn.style.cssText = 'border:1px solid #000000;background:#fafafa;font-size:11px;width: 67px;margin-right:5px';
filterBtn.addEventListener('click', SetFilterValue, true);

var filterResetBtn = document.createElement('BUTTON');
filterResetBtn.appendChild(document.createTextNode("Reset"));
filterResetBtn.href = '#';
filterResetBtn.style.cssText = 'border:1px solid #000000;background:#fafafa;font-size:11px;width: 68px';
filterResetBtn.addEventListener('click', ResetFilterValue, true);

var filterText = document.createElement("input");
filterText.id = "filtertext";
filterText.type="text";
filterText.value="Enter Filter"
filterText.style.cssText = 'border:1px solid #000000;background:#fafafa;font-size:11px;margin-right:5px';
filterText.addEventListener('blur', onBlur, false); 
filterText.addEventListener('focus', onFocus, false);

var filterCell = document.createElement('td');

filterCell.className = 'cat';
filterCell.colSpan = 6;
filterCell.align = 'right';

filterCell.appendChild(filterText);
filterCell.appendChild(filterBtn);
filterCell.appendChild(filterResetBtn);

selected.parentNode.parentNode.parentNode.parentNode.appendChild(filterCell);

FilterWebpage();

})();