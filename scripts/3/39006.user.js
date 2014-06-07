// ==UserScript==

// @name           GLB Forum Thread Preview

// @namespace      http://goallinebliz.com

// @include        http://goallineblitz.com/game/forum_thread_list.pl?*

// ==/UserScript==
window.setTimeout( function() 
{
var popUpMail = document.createElement('div');
   popUpMail.setAttribute("id","preview");
   popUpMail.setAttribute("style","display:none;");
   popUpMail.addEventListener('click', toggle, false);
   document.body.insertBefore(popUpMail, document.body.firstChild);

   var css = '#preview {position:absolute;left:25%;margin-left:-41px;top:20%;padding:30px;' +
      'border:1px solid #000000;background-color:#cccccc;color:blue; width:300px;text-align:left;z-index:9002;}';
      
   addGlobalStyle(css);

//var div = document.createElement('div');
//		div.setAttribute("id","preview");
//		div.setAttribute("class","FPpreview");
//		div.setAttribute("style","visibility:hidden; display:none;");
//		div.setAttribute('onclick', 'hideDiv()'); 
//var footer = document.getElementById('footer');
//footer.appendChild(div);

addPreview();

window.onscroll = setTimeout("placeIt('preview')",500);


}, 100);
unsafeWindow.getFirstPost = function(address) {
	var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
//	req.onreadystatechange = function() {
//		if (target != null) {
//			var d = ["..","...","."];
//			var str = target.innerHTML.split(" ");
//			target.innerHTML = str[0]+" "+d[str[1].length-1];
//    	}
//	};
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
		//	console.log();
		//	var content = this.document.getElementsByClassName("post_content");
            
            
            loadDiv(this.responseText);
		}
	};
	
	req.send(null); 
	return req;
}
unsafeWindow.hideDiv = function()
{
	
    var popup = document.getElementById('preview');
   
    
    popup.setAttribute("style","visibility:hidden; display:none;");
}


unsafeWindow.loadDiv = function(contents)
{
//	unsafeWindow.placeIt('preview');
    var popup = document.getElementById('preview');
    
    popup.innerHTML = contents;
   var content2 = popup.getElementsByClassName("post_content_container");
 //  alert(content2.length);
   popup.innerHTML = content2[0].innerHTML;
    popup.setAttribute("style","visibility:visible; display:inline;");
    
}

unsafeWindow.placeIt = function(obj)
{
    x = 20;
    y = 70;
    console.log(obj);
	obj = document.getElementById(obj);
	if (document.documentElement)
	{
		theLeft = document.documentElement.scrollLeft;
		theTop = document.documentElement.scrollTop;
	}
	else if (document.body)
	{
		theLeft = document.body.scrollLeft;
		theTop = document.body.scrollTop;
	}
	theLeft += x;
	theTop += y;
//	obj.style.left = theLeft + 'px' ;
	obj.style.top = theTop + 'px' ;
	console.log(obj.style.left);
	console.log(obj.style.top);
	setTimeout("placeIt('preview')",500);
}


unsafeWindow.getFirstPost = function(address) {
	var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
//	req.onreadystatechange = function() {
//		if (target != null) {
//			var d = ["..","...","."];
//			var str = target.innerHTML.split(" ");
//			target.innerHTML = str[0]+" "+d[str[1].length-1];
//    	}
//	};
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
		//	console.log();
		//	var content = this.document.getElementsByClassName("post_content");
            
            
            unsafeWindow.loadDiv(this.responseText);
		}
	};
	
	req.send(null); 
	return req;
}


function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};
function addPreview()
{

        var threads = getElementsByClassName("post_count", document);
        for (var i=0; i<threads.length; i++)
        {
        	var thread = threads[i].parentNode;
        	var container_temp = getElementsByClassName("thread_title",thread);
        	var container = container_temp[0];
        
        //	if(i==0)alert(container_temp[1]);
        	
        
        	//loadDiv("asdlfkajsdflkajsdflkjasdflkajdsflkajdsf");
       // window.setTimeout( function() 


        
        			container.innerHTML = container.innerHTML + "<span id='previewSpan' class='previewSpan' onclick='window.setTimeout( function(){getFirstPost(\""+container_temp[1]+"\");},60)' style='color:red;'  > Preview </span>";
        
        }
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function toggle() {   
	var popUpMail = document.getElementById("preview");
	if ( popUpMail.style.display == 'none' ){
      popUpMail.style.display = 'block';
   }else{
      popUpMail.innerHTML = '&nbsp;';
      popUpMail.style.display = 'none';
   }
}
