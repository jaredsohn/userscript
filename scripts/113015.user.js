// ==UserScript==
// @name           Texags User Tools
// @namespace      bmc13texagscustomavatars
// @description    Version 2.2.1
// @icon		   data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAiCAYAAAD23jEpAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIGAEZEeGCkSAAAA7mSURBVFjDnZl5jJ1XecZ/7znfdre5ntVjO7aHxDbBdtqECdlYg5qiEAIN1KZKqNKEhLTQqoLSlkotMbSiW6pSKJTQQqAoBBw1iULLlko2UGyyKSQE48SOPfE+4xnPcrdvOUv/uHcmNk6sqq90dHV1v3vPed7lOc/7XvHeAyAiAgwCKV3zvQUgvQWgeAU7n375JBv8APv4Dqd4bB08X0dmR+uK0XnpW4DXb8JcPoXLt1Nb24YPtMdmoRXApgAuyeDBuPtrVwkcFBhT8IKHtQbmzSf4vmzcTmfrlnHFd+aVv3Z/Id57RKQKXA68Dhjm3KZf6YMAJXVCsTjfxDpTQhGHGq0ElxOm1pUt5aqhUXKsCtAjZfS8p/CgSgF6zqOVgNUoHyA6SuKkmXaKDFekuOKt5B///DYOAe6WnUT37CBfBLEC2Hr99dd/euXKlfx/TTzo3IMSMg0m8BQaRDyBcyQGglbG2v5Bjj6/n+eefhqtNWhFs90k0CFFJydQIYHSiPMYYzDicYGi5Wy2ab79jq/S+gFvwTNGwM2YoLd/FUj6+/u7edRLsdNSbenVWnsOEAqFwnmwdJfBofAETlDOUtMBQZqTpAVJ7rC2ICpHGKUwRcZAXCZCoRDQ4LTGiJCLpxTq+OT8wmZY9xiN/R0mgB9AICI1YPy22277G+ccQRDgvV9ai4dfXEqpc4KIg6DrOQ1WW5SyiLMo7wkcSFpw/OBx5iaOkGQOHwgaUGGEVRqVG8QKynX31UoQoBCLswVNzKZn2V/ffBE5V6IYRwJgCLhgZmaGNWvWMDs7e04QcRyfE4QpChzQUpZcDJm3KJNjcgOZY7QywMTkJPOTUyRKgRfyVhsbCtZ7EiK0t+AF5QWlNEopcm/BWQpk9ZMRfZsnmGUTnnEIgNFrrrnmPQ8++OC/AEeA40AOZL0ijoFJ4M033XTTn8VxjLUWay29enopOk4gAGsd921/4E8ZLB8EN8D8NGs6xeyGPKnkGzd9ef7QEWqiKMUJ1husM5SCiNwaMAYERCkE8HT3cjicd4y/9eq3NR595I+5BMtHcW/8INUASB555JFvAru99z/seT7qUanz3ue9lHtVtVo9I0KLtlRDwKnZWR544FufJKz9kBePPM4dlyr/xeMWNgZX88Knjh85zFC5TOKF3BhEgTGGvFFQ7atiTdH7VYcXQdAgDjyIgjRNOeYos7r70LPL8YH3foeIPApYEdGA6x0sPe2cvwpsmJubY3Bw8IyDnwnGUh+o42h31hXJnk+JRPsY6YM/mLuBr9wcr1z5R8XcAnFfQtpqY0xGEoeoIMC0W2gnOAGLRyNLN5NIty5EhIWFBXLHwOKec+CC3oHaskhBkPTSKBeRUu/9r9xyyy0fjqLorEgsfs17j8PTyproEhP7OqeaMK7hpoX7+efXVS+68O6FiQmWjwyx0GzRyVoM1peRdjokSYkqiiLLcVrw+C5dL3lHdRlONI35BRqZHuF+Cx/G01xulYj099JFfNc63vvmaQ4uAX1BEKC1PqvgT08p7y2zzTnqwzzzbzAMuu/rfP5NP3rdmh/NHjpGIhoVaCYXZqmtGOHCy19LWwsda6lU+7rlIIJHcAjeCaBQIgSiCFFkrRRDMsru5QrBcddkrrz3s977Rk95VEVEiYjuRUYDm4H1zWaTNE1fNo0WQVg839v9yJ3v/DDHboNTDzKx4eg7L/vunsefYLhUYbBW58TUFFG9yhXXXM2LDz10uyrHzHc6iGhCpcGrM5wjHlTv/lFoXGZxqCF4UwxeebxXIhIvPd+NQMl7b3tRaQLn3XjjjbcuW7aMer3+soV9RoFr5R/9JuezDvUw7V979iePsW5oJZ1T86SNFrmxXPaGN7Dv61+49vp++2hlaACnFO00Q6ngpYvVnwYCIUAIRYFxlCvVETAB7NcAynufLUmf7knaAiIXDtdEpA4MRVGE1prp6emXmEjOXLbnvKrOf7Hnfn7x8P5w48hVV3wynZnHNjuEogniiNrwMLv+8z8+8vdv5omLL2O60l8nqVYweQ7Oo7w6TWMq/OnF7UGLZ+Nl41eCaNir6ZLWkhfTLh9sVbxz1SB7r25HA5yHVhviUoJzjnq9jqiAdifDOJAwInceozW6VMIYw3iDSa5D3UvwkX2P/ZRlUQnlFYX3tJ3lHTe+F7WcH08+TOPhDZinfrzjn9rtNkkQEKGwhcNbBRJ2mco7CgzGWxBLuRSy/+BzI//KrvPg3w1skpfXEL+9tgWQSzD6/ltvfb8xBuMsnaxbE9V6H0opiqIgDEPa7TZ5WrD93ns/vvN3eOLmZ7glG+h/X2FSklIJHwX4OGbsok38/K//cvOtX+OZ9cANn6FZTnhOlSJyZym86yr+nvs9CieL/YADHNZawjisH6JZg6eEbXvcGSA8eNju2LIr5+1PBSz4NSoIQClEaxyQ25xyOUF5cFlBogJUZoi9Z8TofZ/+BmPTF2747EynSWV0mONFk6PtOepjK5ncufv3bxvj6FfHgLuofwl0f5mDDZszT4GJNUadWylba0nTlFMwAEZevsERCT1YHj06gvfrRQSUoAINSjDGUGQZ9ASdzi3LwhLDSY1RVPK1af7kub3Ps2ZsDSqJmEkXWLZmOfzsFx+7jwu/fHETu2MM/8RHad4J/o0Jx3SgcAG4SPDil+rglcjDGMMsbhmMwc7FYj7NtjAcIRTQWYNWK42zGO9wRU7hLDoMaLValHSIDgJcu8OypEQfiq13/N49339gO+VWA5emTJ6YotJXo3nw0ANbCXfBAcU0MR/BjLeAo0QjMyTDo3V0K6eTZoScOxSh0mAdbfwyzmCkpSgg27khAyRCr3rv+266WWuNc90CU0oRByG2090s0h7TygmloDEzxYt7f46aa/HqFaM0FtpEAn3VCkMb1r/7nt2PT32O9s0x8Sn5R58KRgIIY4jLgyBasZBmhGHp3CDCkNQYMtxymEvYSSs4+7G73b1cUdX4lXEYoZRCC1iTEcURGEspiSAzYCz1MCKdneP4C4dpHT3BiET0ZWAzT9/ACI1Oxt6nf0YWhb+b5Q4XJhRFTn+pDw9IEiGnWoSRpiRq6X54OVMeojBkvrWAQ847ysnqKkjPit0zvC15gONDDlY658jzHGstRVEgHrIsIwkDbJbisoK+JCGbW+Dk4cMkaIYrfTQmp2k059C+qzorlQq1coULVo+xYtkgA7rEaLlOnZD27AwJGjGOJIqWphFOzgYAoLUmyzIqI8MbdpFVAAlERHnvnYjocVbET3AsfYrBC979m++5QUQIwpBW2iGJYryxlKOQopMi1jFQq/Pivv3s/elPGSzXiU2ByXNKtSoqDJhP27goIKlXqYQxrdl5AmNZtWoVjelphgYGKGcJmTW08pS4VAHnkF4ncZbU92ALQ7VcYXRs7WvzqX0RjJsA0CLivff2ftmaXcWrR2fovKZaq60TrQmUppKUyPMU7yzGOPoqVYIE5memmZ0+iS0K0maDuBzTxNHqNJlrZthSTJGEHJ06TlF06TgqhHaRkbYXmMs7BKEmLscsmILRvjLpXBPlu3LDCWjPGZCCIEAZRZ7n7KOoAQTe+2KJmfx2+7ey0Rn8kBeNs56s0aBSqWCcpxTFZGmTShBhfMFze5+nMzNHvValM9/Ap5Zyf43Ri85neSkiDxRSLdPMcvI8Z7BWh44hEcG3MzAFWgvWGvbs+h9oLlAWvZQ6Z7H/4kRFhHazxQR2BdR00NMlqqdYLQwJmHKUxBhr6TRaqEoZZRxRKIRRTNpqcur4cV6cOEB/UmF0aJj2wjw2VDQOvfBXV83te/hdr+H4n5+kfyoim9SkC4rg4lna+mckwynybla4YzTKIbn+dpyP1UdHPxuVamNurr3UJb7cdWGMwXtPs9kkx66Ek0HQAxACXXna138pWbDa4CmVSjhbUAojctska3UYqtY4sHcvUxOHUUpRKpU41ZjHB4rOqelvL6+5xz/4XZ5lNWz9Egtr7yT9ELgnJwj2jWHgLWzfs1NdMnXcXXIfwmFUeRft7x07sb9RaoytLfefk2KNMehAk+Y5BjcM2i8CKLz3ebev02NbfmvLVuMseZ7jjMXkBXEQUtKaEMXs5EnmZqYZHh4kjAOmZk7SP9i/cBH2m197Ez/iStzkDpRuYjeC2wGOzy3XsA3YobZG14pMjAW7ZwmYwr0hYqrmgz3VUvX/NKSL4xjnHCl+EGpKAcZ77wB47fohvO9f1j+IxZOmKcYYsnaHJIyIdYjLC4b6B6hVqogIaZGzcvV5JIcOfeYfEvsDbiblK8jE59C/fhcFcrcgXvm7TqRe7rRAwbpvG75oZPh+HE+eX+bkR/1Glh2qEPWk+Cubc45QB5i8wMEwTCbKe297dTHI3ol15MU6a3IoLFEU0VetLjUr7SwjNQVr16+nPrqcqYV5ZrIOh1944b73kD/EEFPTf0HAGObya2nDFgv/HcOTArCNO0ps+kQIuG271xXr8AZeo+BVMkjcbLfSXyrjrpL19HoMr3DO4b2QZR36lg+d/xStsvQaIyciq4HfuP322z+z2IB478E5cJ5AFEqBVgpbGMpxwsPfeogkSeDAgXc8BTv/C6LrtjHPnUsM73rHOX2i7hCJPT7/IpcOfIA3Gnhf/i7e/qHZevB3KypVAmMR5/HOnNFFWgGrFHOdFi4OaBWdibWNzscW2WkAuAK4MtQBujcQ8973kPcGA0qRFQW5s8RJxMp16+m0288dOHDkRcja10GbbcCd+N7Bdc+lammYdJpy/gBPzAH6Hq644ADZVX06pm0LQmuht7c4v3SDeyAuxQzWR2janJnp1tjzKn990ItCHzACBHd/4e5vLM2Cu5vKL/1fkQFVgRMe+gSOVIhad3Bp8BOORE9zoo0gvquoXQ+I++Xc3snVUY0gHud8vsrBcV9LLq4NDeDzHO9cd3mPd/6MDJtut4g1+CSk6SxRX9/mxdF+HbgEGKkRP63AaFSuUUW3zxIv4DXiYgIzQ3uwRNjIsXGIzk/QOPny4h8vL0Vj0RHOg+9qi/tD2MIE1w38IU+PvwrV2M/85gSURikPEtKdkS42eAU2nSKvZJi5GYq4iFj4X9V+k4QKH+8rAAAAAElFTkSuQmCC
// @include        http://www.texags.com/main/*
// @include        http://texags.com/main/*
// @include        http://*.texags.com/main/*
// @include        https://www.texags.com/main/*
// @include        https://texags.com/main/*
// @include        https://*.texags.com/main/*
// ==/UserScript==

/*      the code is largely based on GigEmAggies06 and/or Brad Lambeth's TexAgs Enchancements        */ 
/*      extensions, and much credit should be given to them                                          */
/*      https://github.com/bradlambeth/TexAgsEnhancements                                            */
/*      http://userscripts.org/scripts/show/11285                                                    */


/*********  FUNCTIONS AND VARIABLES  ***********/


var scriptOptionsImgSRC = 'data:image/gif;base64,R0lGODlhWgAPAPcAAAAAAJmZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAABaAA8AAAirAP8JHEiwoMGDCBMqXMhwYYCGECNKnAjxIcWLGDMqtKixo0eKHD+KHIkw5EABKE+m/IdyZUuWL2HGVClAYMuaMlPG3HnS5kqDJlkWxCmUKM6jPW0aNCpUqVOnTF02TRhU5tOnSKcyHdpz69SmUYv6JFqwateuM4/O/Io1J0GyWcXC5Ap0aVqpSl+STToUL12rgKOuJWiWpGGPhQ8rvph4seOKjyNjbCy5ctmAADs=';


function getElementsByClass(searchClass,node,tag) 
{
	var classElements = new Array();
	if ( node == null )
	node = document;
	if ( tag == null )
	tag = '*';
	var els = node.getElementsByTagName(tag);
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < els.length; i++) 
	{
		if ( pattern.test(els[i].className) ) 
		{
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function getImgElementsPartialSrc(searchString,node) 
{
	var classElements = new Array();
	var foundElement = null;
	if ( node == null )
	{
		node = document;
	}
	
	var els = node.getElementsByTagName('img');
	
	var pattern = new RegExp(searchString);
	for (i = 0; i < els.length; i++) {
		if ( pattern.test(els[i].src) ) 
		{
			foundElement = els[i];
			i = els.length;
		}
	}
	
	return foundElement;
}

var url = window.location.href;

var testReply = /postreply/;
var testPost = /posttopic/;
var testPM = /privatemessage.postmessage/;
var testEdit = /replyedit/;
var testTopic = /forum.topic/;
var testThread = /forum.reply/;
var testBCSTopic = /Topics/;
var testBCSThread = /Replies/;
var testForumLinks = /forum.main/;

/************************************************************************************************************************************************************************************************/




/*******************get the logged in user's name*******************/
var theFooter = getElementsByClass("footer2");
//console.log(theFooter[0]);
try
{	
	var currentUser = theFooter[0].childNodes[1].innerHTML.toUpperCase();
}
catch(err)
{
	console.log('no user name');
	currentUser = '';
}
/*******************************************************************/
//localStorage.clear();

//var optionsPage = '\'<div align="center" style="font-color:#ffffff;"><table><tbody><tr><td><img src="/images/spacer.gif" width="10" height="20"></td><td></td></tr><tr><td>check box</td><td>option listed here</td></tr></tbody></table></div>\'';

var hideThreadsByIgnoredUsers = localStorage.getItem('HIDE_THREADS_IGNORED_USERS');
if(hideThreadsByIgnoredUsers == null || hideThreadsByIgnoredUsers == 'none')
{
	localStorage.setItem('HIDE_THREADS_IGNORED_USERS','true');
	hideThreadsByIgnoredUsers = 'true';
}
console.log('hiding threads by ignored users? ' + hideThreadsByIgnoredUsers);

var hidePostsByIgnoredUsers = localStorage.getItem('HIDE_POSTS_IGNORED_USERS');
if(hidePostsByIgnoredUsers == null || hidePostsByIgnoredUsers == 'none')
{
	localStorage.setItem('HIDE_POSTS_IGNORED_USERS','false');
	hidePostsByIgnoredUsers = 'false';
}
console.log('hiding posts by ignored users? ' + hidePostsByIgnoredUsers);
// do always
var optionsExist = document.getElementById("optionsdiv");

if(optionsExist != null) //add to options page already in page
{
	console.log('options section already added!');
	var tableBody = document.getElementById('optionstablebody');
	var table2row1 = document.createElement('tr');
	var table2row1cell1 = document.createElement('td');
	var table2row1cell2 = document.createElement('td');
	var table2row2 = document.createElement('tr');
	var table2row2cell1 = document.createElement('td');
	var table2row2cell2 = document.createElement('td');
	
	var hideThreadsIgnoredUsersCB = document.createElement('input');
	hideThreadsIgnoredUsersCB.setAttribute('type','checkbox');
	hideThreadsIgnoredUsersCB.setAttribute('id','hideThreadsIgnoredUsersCB');
	if(hideThreadsByIgnoredUsers == 'true')
	{
		hideThreadsIgnoredUsersCB.setAttribute('checked','yes');
	}
	table2row1cell1.appendChild(hideThreadsIgnoredUsersCB);
	table2row1cell2.innerHTML = 'Hide threads by ignored users?';
	table2row1.appendChild(table2row1cell1);
	table2row1.appendChild(table2row1cell2);
	tableBody.appendChild(table2row1);
	
	var hidePostsIgnoredUsersCB = document.createElement('input');
	hidePostsIgnoredUsersCB.setAttribute('type','checkbox');
	hidePostsIgnoredUsersCB.setAttribute('id','hidePostsIgnoredUsersCB');
	if(hidePostsByIgnoredUsers == 'true')
	{
		hidePostsIgnoredUsersCB.setAttribute('checked','yes');
	}
	table2row2cell1.appendChild(hidePostsIgnoredUsersCB);
	table2row2cell2.innerHTML = 'Completely hide posts by ignored users?';
	table2row2.appendChild(table2row2cell1);
	table2row2.appendChild(table2row2cell2);
	tableBody.appendChild(table2row2);
	
	var saveButton = document.getElementById('optionssavebutton');
	console.log(saveButton);
	saveButton.addEventListener('click', function(event) { var oHTIU = document.getElementById('hideThreadsIgnoredUsersCB');if(oHTIU.checked == 'yes' || oHTIU.checked == true){console.log('saving yes');localStorage.setItem('HIDE_THREADS_IGNORED_USERS','true');}else{console.log(oHTIU.checked);console.log('saving no');localStorage.setItem('HIDE_THREADS_IGNORED_USERS','false');}var oDiv1 = document.getElementById('optionsdiv');oDiv1.style.visibility = 'hidden'; }, false);
	saveButton.addEventListener('click', function(event) { var oHPIU = document.getElementById('hidePostsIgnoredUsersCB');if(oHPIU.checked == 'yes' || oHPIU.checked == true){console.log('saving yes');localStorage.setItem('HIDE_POSTS_IGNORED_USERS','true');}else{console.log(oHPIU.checked);console.log('saving no');localStorage.setItem('HIDE_POSTS_IGNORED_USERS','false');}var oDiv1 = document.getElementById('optionsdiv');oDiv1.style.visibility = 'hidden'; }, false);
	//savebutton.setAttribute('onclick',savebutton.onclick + "var oHTIU = document.getElementById('hideThreadsIgnoredUsersCB');if(oHTIU.checked == 'yes' || oHTIU.checked == true){console.log('saving yes');localStorage.setItem('HIDE_THREADS_IGNORED_USERS','true');}else{console.log(oHTIU.checked);console.log('saving no');localStorage.setItem('HIDE_THREADS_IGNORED_USERS','false');}var oDiv1 = document.getElementById('optionsdiv');oDiv.style.visibility = 'hidden';");
}
else
{
	var headMenuImg = getImgElementsPartialSrc('menu.header.gif',null);
	console.log(headMenuImg);
	if(headMenuImg != null)
	{
		var headerNode = headMenuImg.parentNode;
		
		var overDiv = document.createElement("div");
		overDiv.setAttribute("id","optionsdiv");
		overDiv.setAttribute("style","position:relative;overflow:hidden;float:left;width:1;visibility:hidden;");
		var transparentDiv = document.createElement("div");
		transparentDiv.setAttribute("style","z-index:100;position:absolute;top:0;left:0;width:100%;height:100%;background:#000;opacity:0.75;-moz-opacity:0.75;filter:alpha(opacity=75);position:fixed;");	
		overDiv.appendChild(transparentDiv);
		
		var secondDiv = document.createElement('div');
		secondDiv.setAttribute('style','z-index:2000;top:0;left:0;background:#ffffff;opacity:1.0;-moz-opacity:1.0;filter:alpha(opacity=100);position:fixed;float:left;');
		secondDiv.setAttribute('id','optionsarea');
		
		//secondDiv.innerHTML = "<table><tbody><tr><td><input type='checkbox'></td><td>Show highlight options on topic pages and watchlist?</td></tr></tbody></table>";
		
		var table1 = document.createElement('table');
		var table2 = document.createElement('tbody');
		table2.setAttribute('id','optionstablebody');
		var table2row1 = document.createElement('tr');
		var table2row1cell1 = document.createElement('td');
		var table2row1cell2 = document.createElement('td');
		var table2row2 = document.createElement('tr');
		var table2row2cell1 = document.createElement('td');
		var table2row2cell2 = document.createElement('td');
		
		var hideThreadsIgnoredUsersCB = document.createElement('input');
		hideThreadsIgnoredUsersCB.setAttribute('type','checkbox');
		hideThreadsIgnoredUsersCB.setAttribute('id','hideThreadsIgnoredUsersCB');
		if(hideThreadsByIgnoredUsers == 'true')
		{
			hideThreadsIgnoredUsersCB.setAttribute('checked','yes');
		}
		table2row1cell1.appendChild(hideThreadsIgnoredUsersCB);
		table2row1cell2.innerHTML = 'Hide threads by ignored users?';
		table2row1.appendChild(table2row1cell1);
		table2row1.appendChild(table2row1cell2);
		table2.appendChild(table2row1);
		
		var hidePostsIgnoredUsersCB = document.createElement('input');
		hidePostsIgnoredUsersCB.setAttribute('type','checkbox');
		hidePostsIgnoredUsersCB.setAttribute('id','hidePostsIgnoredUsersCB');
		if(hidePostsByIgnoredUsers == 'true')
		{
			hidePostsIgnoredUsersCB.setAttribute('checked','yes');
		}
		table2row2cell1.appendChild(hidePostsIgnoredUsersCB);
		table2row2cell2.innerHTML = 'Completely hide posts by ignored users?';
		table2row2.appendChild(table2row2cell1);
		table2row2.appendChild(table2row2cell2);
		table2.appendChild(table2row2);

		table1.appendChild(table2);		
		secondDiv.appendChild(table1);
		
		var savebutton = document.createElement('input');
		savebutton.setAttribute('id','optionssavebutton');
		savebutton.setAttribute('type','button');
		savebutton.setAttribute('height','30');
		savebutton.setAttribute('value','Save settings');
		//savebutton.setAttribute('onclick',"var o = document.getElementById('hideThreadsIgnoredUsersCB');if(o.checked == 'yes' || o.checked == true){console.log('saving yes');localStorage.setItem('HIDE_THREADS_IGNORED_USERS','true');}else{console.log(o.checked);console.log('saving no');localStorage.setItem('HIDE_THREADS_IGNORED_USERS','false');}o = document.getElementById('optionsdiv');o.style.visibility = 'hidden';");
		
		var cancelbutton = document.createElement('input');
		cancelbutton.setAttribute('type','button');
		cancelbutton.setAttribute('height','30');
		cancelbutton.setAttribute('value','Cancel');
		cancelbutton.setAttribute('onclick',"var o = document.getElementById('optionsdiv');o.style.visibility = 'hidden';");
		
		var clearButton = document.createElement('input');
		clearButton.setAttribute('id','optionsclearbutton');
		clearButton.setAttribute('type','button');
		clearButton.setAttribute('height','30');
		clearButton.setAttribute('value','Clear all script data');
		clearButton.addEventListener('click', function(event) { var deleteConfirm = confirm ("Are you sure you want to clear all stored data and settings?"); if(deleteConfirm){ localStorage.clear(); window.location.reload(); } } );
		
		
		secondDiv.appendChild(savebutton);
		secondDiv.appendChild(cancelbutton);
		secondDiv.appendChild(clearButton);

		overDiv.appendChild(secondDiv);
		document.body.appendChild(overDiv);
		
		var saveButton2 = document.getElementById('optionssavebutton');
		saveButton2.addEventListener('click', function(event) { window.location.reload(); });
		saveButton2.addEventListener('click', function(event) { var oHTIU = document.getElementById('hideThreadsIgnoredUsersCB');if(oHTIU.checked == 'yes' || oHTIU.checked == true){console.log('saving yes');localStorage.setItem('HIDE_THREADS_IGNORED_USERS','true');}else{console.log(oHTIU.checked);console.log('saving no');localStorage.setItem('HIDE_THREADS_IGNORED_USERS','false');}var oDiv1 = document.getElementById('optionsdiv');oDiv1.style.visibility = 'hidden'; }, false);
		saveButton2.addEventListener('click', function(event) { var oHPIU = document.getElementById('hidePostsIgnoredUsersCB');if(oHPIU.checked == 'yes' || oHPIU.checked == true){console.log('saving yes');localStorage.setItem('HIDE_POSTS_IGNORED_USERS','true');}else{console.log(oHPIU.checked);console.log('saving no');localStorage.setItem('HIDE_POSTS_IGNORED_USERS','false');}var oDiv1 = document.getElementById('optionsdiv');oDiv1.style.visibility = 'hidden'; }, false);		
		
		
		// build options button
		//--------------------------------------------------------------
		var optionsSpan = document.createElement('span');
		optionsSpan.setAttribute('id','bmc13scriptsettings');
		optionsSpan.setAttribute('onmouseover','this.style.backgroundColor=\'#000000\';');
		optionsSpan.setAttribute('onmouseout','this.style.backgroundColor=\'\';');
		//optionsSpan.setAttribute('onclick','document.body.innerHTML=' + optionsPage + ';');
		optionsSpan.setAttribute('onclick','var o = document.getElementById("optionsdiv");o.style.visibility = "visible";');	
		
		var optionsImg = document.createElement('img');
		optionsImg.setAttribute('src',scriptOptionsImgSRC);
		
		optionsSpan.appendChild(optionsImg);
		
		headerNode.appendChild(optionsSpan);
		//--------------------------------------------------------------
	}
}

if (	testThread.test(url) 
		&& !testReply.test(url) 
		&& !testPost.test(url) 
		&& !testPM.test(url)
		&& !testEdit.test(url)
		&& !testTopic.test(url)
		&& !testBCSTopic.test(url)
		&& !testBCSThread.test(url)
		&& !testForumLinks.test(url))
{
	var thisAnchor, userLevelImg, userName, agTagImgNode;
	var allAnchors = document.evaluate('//a[@name]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	console.log("num names: " + allAnchors.snapshotLength);
	
	
	console.log(currentUser);
	console.log('--------------------------------------------------------');
	for (var i = 0; i < allAnchors.snapshotLength; i++) 
	{
		try
		{
			thisAnchor = allAnchors.snapshotItem(i);
			
			// make sure the anchor we're dealing with is a user name and not something else //
			if(thisAnchor.name[0] == 'r')
			{
				userName = thisAnchor.childNodes[0].innerHTML;
				userNameUpper = thisAnchor.childNodes[0].innerHTML.toUpperCase();
				var postElement;
				var staff;
				var ignoreResult = localStorage.getItem('IGNORE_' + userNameUpper);
				if(ignoreResult != null && ignoreResult == "true")
				{
					staff = thisAnchor.parentNode.nextSibling.innerHTML.indexOf('btn_gray_s.gif');
					if(staff == -1)
					{
						userLevelImg = thisAnchor.parentNode.nextSibling.childNodes[1].childNodes[0];
						postElement = userLevelImg.parentNode.parentNode.parentNode.parentNode.lastChild;
					}
					else
					{
						userLevelImg = thisAnchor.parentNode.nextSibling.childNodes[1];
						postElement = userLevelImg.parentNode.parentNode.parentNode.lastChild;
						
						console.log('--------------------------------------found staff');
					}
					console.log('attempting to remove ' + userName + '\'s post');
					var postRow = postElement.parentNode;
					if(hidePostsByIgnoredUsers == 'true')
					{
						postRow.parentNode.removeChild(postRow);
					}
					else
					{
						postRow.setAttribute('name',userName+"_POST");
						var numCells = postRow.childNodes.length;
						console.log('number of cells: ' + numCells);
						for(var j=0;j<numCells;j++)
						{
							var numChildren = postRow.childNodes[j].childNodes.length;
							//console.log(postRow.childNodes[j]);
							console.log('number of items: ' + numChildren);
							for(var k=0;k<numChildren;k++)
							{
								try
								{
									//.setAttribute('style','visibility:"collapse";');
									postRow.childNodes[j].removeChild(postRow.childNodes[j].firstChild);
								}
								catch(err3)
								{
									console.log('*******************************************************************');
									console.log(err3);
									console.log('*******************************************************************');
								}
							}
							//postElement.removeChild(postElement.firstChild);
						}
						console.log(postRow.firstChild);
						var cellColor = postRow.firstChild.bgColor;
						console.log(cellColor);
						if(cellColor != null)
						{
							var hexcolor = parseInt(cellColor.substr(1),16);
							console.log(hexcolor);
							hexcolor = hexcolor - parseInt("222222",16);
							console.log(hexcolor);
							console.log(hexcolor.toString(16));
							cellColor = "#" + hexcolor.toString(16);
						}
						else
						{
							cellColor = '#dddddd';
						}
						var nameDiv = document.createElement('div');
						var nameFont = document.createElement('font');
						nameFont.setAttribute('face','Arial, Verdana');
						nameFont.setAttribute('size','2');
						nameFont.setAttribute('color',cellColor);
						nameFont.innerHTML = '<b><i>' + userName + '</b></i>';
						nameDiv.appendChild(nameFont);
						postRow.firstChild.appendChild(nameDiv);
						
						
						var restoreUserImg = document.createElement('img');
						restoreUserImg.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAcCAYAAABoMT8aAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAB1MAAAdTAB3TNyzQAAAAd0SU1FB9sIGBUCB6dP5EcAAAMXSURBVDjL7VTPa1xVFP7OvXcymWSSFFNj05mYdMb8clE1QUpNCAZsdjVV0E2hm0LBbrIyaxe6DkKhCioumq1Wd66smsZBKHSsoTRuplJrJ8kkk5m8ee/dd+85LkbaIv0T8sHhwOGcb3HO9x3gEPT/wosrI6OnRk6dH+rNLx7JHJkwZMy+3a/sBLUf1ivr1+5e3ig9k2Dw4xwV8y+tvPvqO0tnRt4SL54gTxoVKak0KnS19Pla+f7t+YfLD9xjguOf5GlyZPL28vyHJ7OprGjSpEmD/uMXCLx4sLA4dvTt3es7q7+tDm4tP3IKAAq54srl2Q9OEkist2TZ4iA5QJAEiDmGZYuEE1i2FPsYC6Nnjs6MzpQBQI99OjG68MrCaq43JwAIAli2GO8bh0AQuABOHBy3I+EEEUdSHCgMVKe2y6Y4WDw/NjAmLdci1gxHDm/nz0KRwla4hYZrQJMGBGBwm8BHZDmRwvOFJdOT6Vlsxk3qNJ3IdeXx5sAciAgigun+KUzJa7Bs8d2D7yFgeGaEHKHlWtSd6Z5TpGmi6ZvYtbso9hRA1F7c0zmt03h/+D049mj5EKELceAOYNJG6dy5/EfZbI/qNt24VbsFBYXh7DAAYLOxib/DhzBk0GW6cCzzAm5UfwILo273UNm+D33s7PELNdSea8oBMroT1aiK0k4J0/3T+LF6A3fqf2Bt+ya0Mpjsm8DPW2vYbP6Je/VNNHYboocWh8ZVh35dGUUOCUIfInABvvnrOmpxDc2kidCFKO+VkaIUFAi/799BFEZwQbKhxMk1bnmKXCSRi2B9++Y9qewTDUgCFsbVe58hq7IIXQgfOoiXKwQAp7+a+SXdl55N93WiN9WLjOlESqWgSLWVKALHDqFEqO/WYWFh9+LAx77fAAAY87Zh/wHh6H5WxLKltO6AJg0igmcPywlCF7aH63HMjk+ULq3Hj810+osZQ4rKpsu8bLpTojoUaa0BAtgzvPXwoYNruYAdn/j14s3tZ9r5jS9nz5GmJWXUHDQpAiAswo43xMsVdvx16dJ6fPgJD/E0/gUyOKYLM0EGtAAAAABJRU5ErkJggg==');
						restoreUserImg.setAttribute('title','Click to restore ' + userName + '\'s posts...');
						restoreUserImg.setAttribute('onClick','localStorage.setItem("IGNORE_' + userNameUpper + '","false");window.location.reload();');
						//restoreUserImg.setAttribute('align','right');
						
						var spacerimg = null;
						spacerimg = document.createElement('img');
						spacerimg.setAttribute('src','/images/spacer.gif');
						spacerimg.setAttribute('width','10');
						spacerimg.setAttribute('height','10');
						spacerimg.setAttribute('border','0');
						
						var rightDiv = document.createElement('div');
						rightDiv.setAttribute('align','right');
						rightDiv.setAttribute('style','float:right;');
						rightDiv.appendChild(restoreUserImg);
						rightDiv.appendChild(spacerimg);
						
						postElement.appendChild(rightDiv);
					}
				}
				else
				{
					var postElement;
					var staff = thisAnchor.parentNode.nextSibling.innerHTML.indexOf('btn_gray_s.gif');
					if(staff == -1)
					{
						userLevelImg = thisAnchor.parentNode.nextSibling.childNodes[1].childNodes[0];
						postElement = userLevelImg.parentNode.parentNode.parentNode.parentNode.lastChild;
					}
					else
					{
						userLevelImg = thisAnchor.parentNode.nextSibling.childNodes[1];
						postElement = userLevelImg.parentNode.parentNode.parentNode.lastChild;
						
						console.log('--------------------------------------found staff');
					}
					var postRow = postElement.parentNode;
					postRow.setAttribute('name',userName+"_POST");
					
					var userAvatarSRC = localStorage.getItem(userNameUpper + 'UserAvatar');
					
					console.log(userName);				

					// show button to add avatar
					var insertBeforeThis = postElement.childNodes[10];
					var ignoreUserImg;
					var breakline = document.createElement('br');
					var userAvatar = document.createElement('img');
					userAvatar.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIFw4rGsgfS7IAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAFNJREFUOMtjYBjsYCYDA0MHPgUsBAwwptQF/6EYJ2Ci1AaqGjCbgYFhP5Kz/2Pxyn8GBobrDAwMndgM+MnAwMBLpMXCwygQCSWkB5QasGHQZzYGAOQyEMY43IEbAAAAAElFTkSuQmCC');
					userAvatar.setAttribute('title','Click to set or change the custom avatar for ' + userName + '...');
					userAvatar.setAttribute('onmouseover','this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIFw4rIuAd8ywAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAlFJREFUOMuNk7tuXGUUhb+1z388novvduEEKCh4gigVNbxJlAIJKYpS8ARcBAKJnoLHQKKgonNLjZREFvLYnpvPeM6/F0UyyCWrWs3SXhdt8QAv+TDO+WfSU0fCu1FqGz0yroJ1P+CONYtXsN5qtCXfwqDA0QYOSmgv8W6TalMo7QqsA62SZjai3HxBdwPQAHwzHA0G2pzZzZnwaZrTMCc/wIsLePIU/hYxAu9EZLmnj8/Av0FXfoW4uuuOqpqTdD0NOGngMGE8h0/mgNEfIlfAOK1BkaOa/JHJplzCWORBtQ4DThLOgGOh/Rl+/C6nH1vMw+xiNxuTRdxbi7vStM2kbuok8L7gEDgGzoSPH/R7jjVOXAQ1oAMtN+lZqbUOIEYiR4nGyPuyjhOfbdUJ54FbQ29YAXNbo9J4WDZJacnyPTzv8EdT8zH44bq8gk+3fAJX53DxjPw5KyUGJUKggL6HAf8DHYwDBFKpmVVS/dL+JeCDhEeCR8D5y/eXv4MLwSXoLfi14bVRlZwls70PNmuJdVor8NJwK7GzTSK4NFyDZ3rXwZ1wV4N1cVNXymaVrvMGjw1DoLHpt5YNbwQLxLWsW/DCaNnWZlVqzUULs1YMezMQBNAL7oZw+97BG8NS5jbxNBTXtmcr+nnzO9TPgUpEYAwp6E10f+HTPXj7BP4UXIOmgqnFVYanYzP975m+hiOFTkpyUOW9MEMRO0lKRLWyC2vZN541yXUccPXihk4P5/mpZbKBffqYNPZuNm5rFQ1UEfdr6nK4w2IVzL7q2AD8Cx1dMpC0fya6AAAAAElFTkSuQmCC\'');
					userAvatar.setAttribute('onmouseout','this.src=\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIFw4rGsgfS7IAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAFNJREFUOMtjYBjsYCYDA0MHPgUsBAwwptQF/6EYJ2Ci1AaqGjCbgYFhP5Kz/2Pxyn8GBobrDAwMndgM+MnAwMBLpMXCwygQCSWkB5QasGHQZzYGAOQyEMY43IEbAAAAAElFTkSuQmCC\'');
					userAvatar.setAttribute('onClick','var customAvatar = prompt("Enter your avatar URL into the box below (leave it empty to remove the avatar):","");if(customAvatar != null && customAvatar.length > 0){localStorage.setItem("' + userNameUpper + 'UserAvatar",customAvatar);window.location.reload();}else if(customAvatar == null){}else{localStorage.setItem("' + userNameUpper + 'UserAvatar","");window.location.reload();}');
					var spacerimg = document.createElement('img');
					spacerimg.setAttribute('src','/images/spacer.gif');
					spacerimg.setAttribute('width','10');
					spacerimg.setAttribute('height','1');
					spacerimg.setAttribute('border','0');
					postElement.insertBefore(spacerimg, insertBeforeThis);
					postElement.insertBefore(userAvatar, insertBeforeThis);

					var deletePost = 'function getElementsByName(searchName,node,tag) {var classElements = new Array();if ( node == null ){node = document;}if ( tag == null ){tag = "*";}var els = node.getElementsByTagName(tag);var pattern = new RegExp("(^|\\s)"+searchName+"(\\s|$)");for (i = 0, j = 0; i < els.length; i++) {	if ( pattern.test(els[i].className) ) {classElements[j] = els[i];j++;}}return classElements;}console.log("attempting to remove ' + userName + '\'s posts");var namedElements;namedElements = getElementsByName("' + userName + '_POST",null,"tr");if(namedElements != null && namedElements.length > 0){for(var i = 0;i<namedElements.length;i++){var postRow = namedElements[i];var numCells = postRow.childNodes.length;for(var j=0;j<numCells;j++){var numChildren = postRow.childNodes[j].childNodes.length;for(var k=0;k<numChildren;k++){try{postRow.childNodes[j].removeChild(postRow.childNodes[j].firstChild);}catch(err3){console.log("****");console.log(err3);console.log("****");}}}var cellColor = postRow.firstChild.bgColor;if(cellColor != null){var hexcolor = parseInt(cellColor.substr(1),16);hexcolor = hexcolor - parseInt("222222",16);console.log(hexcolor);console.log(hexcolor.toString(16));cellColor = "#" + hexcolor.toString(16);}else{cellColor = "#dddddd";}var nameDiv = document.createElement("div");var nameFont = document.createElement("font");nameFont.setAttribute("face","Arial, Verdana");nameFont.setAttribute("size","2");nameFont.setAttribute("color",cellColor);nameFont.innerHTML = "<b><i>' + userName + '</b></i>";nameDiv.appendChild(nameFont);postRow.firstChild.appendChild(nameDiv);var restoreUserImg = document.createElement("img");restoreUserImg.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAcCAYAAABoMT8aAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAB1MAAAdTAB3TNyzQAAAAd0SU1FB9sIGBUCB6dP5EcAAAMXSURBVDjL7VTPa1xVFP7OvXcymWSSFFNj05mYdMb8clE1QUpNCAZsdjVV0E2hm0LBbrIyaxe6DkKhCioumq1Wd66smsZBKHSsoTRuplJrJ8kkk5m8ee/dd+85LkbaIv0T8sHhwOGcb3HO9x3gEPT/wosrI6OnRk6dH+rNLx7JHJkwZMy+3a/sBLUf1ivr1+5e3ig9k2Dw4xwV8y+tvPvqO0tnRt4SL54gTxoVKak0KnS19Pla+f7t+YfLD9xjguOf5GlyZPL28vyHJ7OprGjSpEmD/uMXCLx4sLA4dvTt3es7q7+tDm4tP3IKAAq54srl2Q9OEkist2TZ4iA5QJAEiDmGZYuEE1i2FPsYC6Nnjs6MzpQBQI99OjG68MrCaq43JwAIAli2GO8bh0AQuABOHBy3I+EEEUdSHCgMVKe2y6Y4WDw/NjAmLdci1gxHDm/nz0KRwla4hYZrQJMGBGBwm8BHZDmRwvOFJdOT6Vlsxk3qNJ3IdeXx5sAciAgigun+KUzJa7Bs8d2D7yFgeGaEHKHlWtSd6Z5TpGmi6ZvYtbso9hRA1F7c0zmt03h/+D049mj5EKELceAOYNJG6dy5/EfZbI/qNt24VbsFBYXh7DAAYLOxib/DhzBk0GW6cCzzAm5UfwILo273UNm+D33s7PELNdSea8oBMroT1aiK0k4J0/3T+LF6A3fqf2Bt+ya0Mpjsm8DPW2vYbP6Je/VNNHYboocWh8ZVh35dGUUOCUIfInABvvnrOmpxDc2kidCFKO+VkaIUFAi/799BFEZwQbKhxMk1bnmKXCSRi2B9++Y9qewTDUgCFsbVe58hq7IIXQgfOoiXKwQAp7+a+SXdl55N93WiN9WLjOlESqWgSLWVKALHDqFEqO/WYWFh9+LAx77fAAAY87Zh/wHh6H5WxLKltO6AJg0igmcPywlCF7aH63HMjk+ULq3Hj810+osZQ4rKpsu8bLpTojoUaa0BAtgzvPXwoYNruYAdn/j14s3tZ9r5jS9nz5GmJWXUHDQpAiAswo43xMsVdvx16dJ6fPgJD/E0/gUyOKYLM0EGtAAAAABJRU5ErkJggg==");restoreUserImg.setAttribute("title","Click to restore ' + userName + '\'s posts...");restoreUserImg.setAttribute("onClick","localStorage.setItem(\"IGNORE_' + userNameUpper + '\",\"false\");window.location.reload();");var spacerimg = null;spacerimg = document.createElement("img");spacerimg.setAttribute("src","/images/spacer.gif");spacerimg.setAttribute("width","10");spacerimg.setAttribute("height","10");spacerimg.setAttribute("border","0");var rightDiv = document.createElement("div");rightDiv.setAttribute("align","right");rightDiv.setAttribute("style","float:right;");rightDiv.appendChild(restoreUserImg);rightDiv.appendChild(spacerimg);postRow.lastChild.appendChild(rightDiv);}}';

					ignoreUserImg = document.createElement('img');
					ignoreUserImg.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmtJREFUeNqMU0toE2EQ/naTqDSPkoc2pbSlWpAG9ODrkosoLfV1EEUwJ0GwpAQtSEpBvAlCCxIfmKsnb6KCj5ioCKJotVDRSsVqqTUmJtkNyea9u1n//7eJq+nBgW9nmfnm25llhtM0DXqLuq0O4k4R7CLYTmAgmFlBeCgppfV8Ti8QcVsvmixtE517vLBt6oWlrwccz0FaXEaBIP74OeR8YWo4KY23CDxwW686tg4EPCM+cOIS6rk06vkMy/FWJ3ibC1jfh/kbt5Ceng3vT0qjNGekj3sdtguubVsCHt8Qaq/uIHrzIwaP9f/pU8ojFoph8PgANh/ZTSX9pKZw8Gd+nL/bYevizW3n+g95UZp+hLcfTPDFU5iZN0OVVQb6zmJza1B6E8XGfTthtLcHWa2qwd+114vq3EsoVRnDD2Pso9TPfrEx6GNKTUXl/Qt0eneA1vIquAMWCyAXikRAQSp0ptk5LWgUU6M5ypGLZVjtRpDaw7yiwcOVMkRZYci/foLEVAD/Go3RXIOHXAKktp92UCun0pCp8grePf3UIkBjek5FFGkHIAJYKOarUCoyw1K5+6+29ePQXINXzlWJAL7REe5nJTRb0xd/PX+SQS/S4GUljY4QoSOEk4kiamWF/aDPEycYmXrhWYRBH2M/saLg+48iHSHMNjHstE/abcZg7wYD/seW0yqEnHLZL2THmqt8zWm/bjdz/m6nAWT9V7U6ocbFOoRCPRwQsqMtx3TF6Zg0Gbigy6yhfR2w1vg7TnYHuTKQKXGoKdql04J4dtVrpBZyOHqI8xMcJWgcxCLBbXrOY6K4oOf/EmAAfyhg+goYmG4AAAAASUVORK5CYII=');
					ignoreUserImg.setAttribute('title','Click to ignore ' + userName + '\'s posts...');
					ignoreUserImg.setAttribute('onClick','var ignoreUserResult = confirm("Are you sure you want to ignore ' + userName + '\'s posts?");if(ignoreUserResult != null && ignoreUserResult == true){localStorage.setItem("IGNORE_' + userNameUpper + '","true");window.location.reload();}');
					//ignoreUserImg.setAttribute('onClick','var ignoreUserResult = confirm("Are you sure you want to ignore ' + userName + '\'s posts?");if(ignoreUserResult != null && ignoreUserResult == true){localStorage.setItem("IGNORE_' + userNameUpper + '","true");/*window.location.reload();*/' + deletePost + '}');
					//ignoreUserImg.setAttribute('align','right');
					//postElement.insertBefore(ignoreUserImg, insertBeforeThis);
					
					spacerimg = null;
					spacerimg = document.createElement('img');
					spacerimg.setAttribute('src','/images/spacer.gif');
					spacerimg.setAttribute('width','10');
					spacerimg.setAttribute('height','10');
					spacerimg.setAttribute('border','0');
					//spacerimg.setAttribute('align','right');
					//postElement.insertBefore(spacerimg, insertBeforeThis);
					
					var rightDiv = document.createElement('div');
					rightDiv.setAttribute('align','right');
					rightDiv.setAttribute('style','float:right;');
					rightDiv.appendChild(ignoreUserImg);
					rightDiv.appendChild(spacerimg);
					
					postElement.insertBefore(rightDiv, insertBeforeThis);

					if(userAvatarSRC != null && userAvatarSRC.length > 0)
					{
						var breakline = document.createElement('br');
						userLevelImg.parentNode.parentNode.insertBefore(breakline, null);
						breakline = document.createElement('br');
						userLevelImg.parentNode.parentNode.insertBefore(breakline, null);
						var userAvatar = document.createElement('img');
						userAvatar.setAttribute('src',userAvatarSRC);
						userAvatar.setAttribute('title','custom user avatar');
						userLevelImg.parentNode.parentNode.insertBefore(userAvatar, null);
						breakline = document.createElement('br');
						userLevelImg.parentNode.parentNode.insertBefore(breakline, null);
						breakline = document.createElement('br');
						userLevelImg.parentNode.parentNode.insertBefore(breakline, null);
					}
				}
				userNameUpper = '';
				userName = '';
			} /* end if check for username anchor */
			
			
		}
		catch(err)
		{
			console.log("name # " + i + " username: " + userName);
			console.log(err);
		}
	}
}
else if (testTopic.test(url) && hideThreadsByIgnoredUsers == 'true') /* look for a topics page and see if we should hide ignored user's threads */
{
	var thisTopic, topicID, lastReplyCount, currentReplyCount, theFooter, myUserName;
	var findTopicID = /topic_id=(\d+)/; /* regular expression to extract the topic id */
	var i;
	
	/*******************get the logged in user's name*******************/
	theFooter = getElementsByClass("footer2");
	myUserName = theFooter[0].childNodes[1].innerHTML;
	/*******************************************************************/
	
	try
	{
		// get the list of topics
		var topics = getElementsByClass("topics", null, "a");
		
		// go through the list of topics, and color them
		for (i=0; i<topics.length; i++) 
		{
			thisTopic = topics[i];
			thisTopic.href.match(findTopicID);
			topicID = RegExp.$1;
			lastReplyCount = localStorage.getItem(topicID);
			var thisThreadPoster = thisTopic.parentNode.parentNode.childNodes[3].innerHTML;
			//localStorage.setItem("IGNORE_' + userNameUpper + '","true");
			/* add code here to handle checking to see if threads should be hidden or not */
			if( localStorage.getItem('IGNORE_' + thisThreadPoster.toUpperCase()) == 'true' ) /* if this user is ignored, hide thread */
			{
				var rowHead = thisTopic.parentNode.parentNode;
				var rowParent = rowHead.parentNode;
				rowParent.removeChild(rowHead);
				console.log('thread by ' + thisThreadPoster + ' hidden');
			}
		}
	}
	catch(err)
	{
		console.log(err);
	}
}