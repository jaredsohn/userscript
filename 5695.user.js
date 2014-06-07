// ==UserScript==
// @name          QuickView
// @namespace     http://simile.wordpress.com
// @description	  Shows QuickView of any link (and more)
// @include       *
// @exclude       
// ==/UserScript==

(function () {
  
var mnote = document.createElement("script");
mnote.setAttribute('src','http://gmodules.com/ig/ifr?url=http://www.google.com/ig/modules/notebook.xml&synd=open&w=320&h=200&title=Google+Notebook&border=%23ffffff%7C0px%2C1px+solid+%23004488%7C0px%2C1px+solid+%23005599%7C0px%2C1px+solid+%230077BB%7C0px%2C1px+solid+%230088CC&output=js');
 
var mousetrail = document.createElement("p");
mousetrail.setAttribute("id","mtrail");
mousetrail.style.color = "gray";
//mousetrail.style.FontSize = "1";
mousetrail.setAttribute("src","http://pmadhu.pbwiki.com/f/paste.png");
mousetrail.style.top = "95%";
mousetrail.style.left = "90%";
mousetrail.style.position = "fixed";
mousetrail.style.visibility="hidden";
mousetrail.style.BackgroundColor = "yellow";
mousetrail.style.opacity = "1.0";
mousetrail.innerHTML = "<div style=\"Background-Color:orange;opacity:0.5;\" ><font id=\"textclick\"  size=\"2\" weight=\"bold\" color=\"black\">QUICKVIEW</font></div>";

 var filmstrip = document.createElement("div");
	  filmstrip.setAttribute("id", "mainarea");
	  //filmstrip.setAttribute("onmouseout", "javascript:this.style.visibility=\'hidden\';");
	  filmstrip.style.position = "fixed";
	  filmstrip.style.top   = "1%";
	  filmstrip.style.left  = "10%";
	  filmstrip.style.height= "0%";
	  filmstrip.style.width = "0%";
	  filmstrip.style.zIndex = "0";
	  filmstrip.style.visibility='hidden';
	  filmstrip.style.borderStyle= "none";	  
	  filmstrip.style.borderTopStyle= "solid";
	  filmstrip.style.borderBottomStyle= "solid";
	  filmstrip.style.borderBottomWidth= "2px";
	  
	  filmstrip.style.borderTopWidth= "10px";
	  filmstrip.style.borderColor="#990000";
    
	  var  ht=(window.innerHeight)*80/100;
	  var bht = (window.innerHeight)*1/5;
	  var mtop,mleft,mpreview,xmlfile,m_keyword,showtimer;
	  var mhtml='';
	  var linktext='';
	  var refreshcounter=0;
	  var showlink=0;
	  var cntrlpressed=0;
	  var adfilename="http://pagead2.googlesyndication.com/pagead/ads?client=ca-pub-8058946168194198&format=fp_al_lp&output=html&url=http%3A%2F%2Fwww.google.com%2Fsearch%3Fhl%3Den%26q%3Dm_keyword%26btnG%3DGoogle%2BSearch&loc=http%3A%2F%2Fsimile.wordpress.com%2F&u_h=200&u_w=200&u_ah=200&u_aw=200&u_cd=32&u_tz=-240&u_his=36&u_java=true&u_nplug=31&u_nmime=105&kw_type=radimg&hl=en";

	  var googlepage ="http://www.google.com/custom?q=m_keyword&sa=Google+Search&client=pub-8058946168194198&forid=1&ie=ISO-8859-1&oe=ISO-8859-1&cof=GALT%3A%23008000%3BGL%3A1%3BDIV%3A%23336699%3BVLC%3A663399%3BAH%3Acenter%3BBGC%3AFFFFFF%3BLBGC%3A336699%3BALC%3A0000FF%3BLC%3A0000FF%3BT%3A000000%3BGFNT%3A0000FF%3BGIMP%3A0000FF%3BFORID%3A1%3B&hl=en"

function helloq() 
{
	alert('got it');
}




document.addEventListener('keydown', function(event) {
     if(event.ctrlKey)
     {cntrlpressed=1;
      var mmainarea = document.getElementById('storyboard');  
           mmainarea.insertBefore(mnote, mainarea.firstChild);
      }
      k=event.keyCode;
    if(k==27)
    {
    window.top.document.getElementById('adframe').style.width="20%";
    	window.top.document.getElementById('storyboard').style.width="79%";
    	
    document.getElementById('storyboard').src='';
    //document.getElementById('mainarea').style.zIndex = "0";
    document.getElementById('mainarea').style.height = "0%";
    			document.getElementById('mainarea').style.width = "0%";
    document.getElementById('mainarea').style.visibility='hidden';
    document.getElementById('storyedit').value='0';
    txt='';
cntrlpressed=0;
    }
    if(k==120&&(document.getElementById('textclick').style.visibility='visible'))
    {
    document.getElementById('storyedit').value='1';
    txt =document.getElementById('searchstring').value;
	m_keyword = googlepage.replace(/m_keyword/g,txt);	
	document.getElementById('storyboard').src=m_keyword;

	window.top.document.getElementById('adframe').src="http://www.technorati.com/mini/index.html?s=" + txt;
	showlink=0;

	document.getElementById('mainarea').style.visibility='visible';
	document.getElementById('mainarea').style.zIndex = "99999";
	document.getElementById('mainarea').style.height = "80%";
	document.getElementById('mainarea').style.width = "80%";

	 refreshcounter=0;
	document.getElementById('ptitle').value = '"'+ txt + '"';
  						document.getElementById('mtrail').style.visibility='hidden';	
  						document.getElementById('textclick').style.visibility='hidden';	
        window.top.document.selection.empty;
        
    }
    
    
},true);

document.addEventListener('keyup', function(event) {
     if(event.ctrlKey)
     {cntrlpressed=0;
      }
},true);	  
	  
document.addEventListener('mouseup', function(event) {
    //alert(event.button);

    
     
 showlink=0;
 document.getElementById('mtrail').style.visibility='hidden';
   txt=window.getSelection();
        if(txt!='')
        {cntrlpressed=0;
        document.getElementById('searchstring').value =txt;
         document.getElementById('mtrail').style.visibility='visible';
         document.getElementById('textclick').style.visibility='visible';	
	  // document.getElementById('mtrail').style.left=(((event.pageX/window.innerWidth)*100 - 4)+'%');
   //document.getElementById('mtrail').style.top=(((event.pageY/window.innerHeight)*100 - 4)+'%');
        		
        }
 
},true); 
  
  
document.addEventListener('mousedown', function(event) {
        if(event.button=='1')
        {
        event.stopPropagation();
    				event.preventDefault();
    				 txt=window.getSelection();
        if(event.target.href&& (document.getElementById('mainarea').style.visibility=='hidden') )
        
        			{
        			 mpreview = event.target.href;
        			document.getElementById('searchstring').value =event.target.innerHTML;
        			 linktext=event.target.innerHTML;
        		//alert(cntrlpressed);		 
        			//if(showlink){
        	
        				document.getElementById('storyedit').value='1';
        				//alert(document.getElementById('storyedit').value);
        				document.getElementById('storyboard').src=event.target.href;
        				m_keyword = googlepage.replace(/m_keyword/g,document.getElementById('searchstring').value);
        				window.top.document.getElementById('adframe').src=m_keyword;
        				showlink=0;
        				document.getElementById('mainarea').style.visibility='visible';
        				document.getElementById('mainarea').style.zIndex = "99999";
        				document.getElementById('mainarea').style.height = "80%";
        				document.getElementById('mainarea').style.width = "80%";
        				
        				 refreshcounter=0;
        				document.getElementById('ptitle').value = '"'+ document.getElementById('searchstring').value + '"';
        				document.getElementById('tech_chart').src = "";
        			//	}
        			cntrlpressed=0;
        			}
        else  if(txt!='')
        {document.getElementById('storyedit').value='1';
				txt =document.getElementById('searchstring').value;
							m_keyword = googlepage.replace(/m_keyword/g,txt);	
							document.getElementById('storyboard').src=m_keyword;
							
							window.top.document.getElementById('adframe').src="http://www.technorati.com/mini/index.html?s=\"" +  txt + "\"";
							showlink=0;
							
							document.getElementById('mainarea').style.visibility='visible';
							document.getElementById('mainarea').style.zIndex = "99999";
							document.getElementById('mainarea').style.height = "80%";
							document.getElementById('mainarea').style.width = "80%";
							
							 refreshcounter=0;
							document.getElementById('ptitle').value = '"'+ txt + '"';
							document.getElementById('mtrail').style.visibility='hidden';	
  						document.getElementById('textclick').style.visibility='hidden';	
							document.getElementById('tech_chart').src = "http://technorati.com/chartimg/%28" + txt +"%29?&days=30"
        window.top.document.selection.empty;	
        }			
        
        				
	}
    /*
    showlink=1;
    cntrlpressed=0;
    //document.style.cursor="crosshair";
    document.getElementById('mtrail').style.visibility='visible';
   document.getElementById('mtrail').style.left=(((event.pageX/window.innerWidth)*100)+ 2) + '%';
   document.getElementById('mtrail').style.top=(((event.pageY/window.innerHeight)*100) - 1) +'%';
   setTimeout(function(){resetlink();},1000);
    */ 
},true); 

/*
document.addEventListener('mousemove', function(event)
{
	document.getElementById('mtrail').style.left=(((event.pageX/window.innerWidth)*100)+ 2) + '%';
   document.getElementById('mtrail').style.top=(((event.pageY/window.innerHeight)*100) - 1) +'%';
   		
	if(event.target.href&& (document.getElementById('mainarea').style.visibility=='hidden') )
		{
		 mpreview = event.target.href;
		document.getElementById('searchstring').value =event.target.innerHTML;
		 linktext=event.target.innerHTML;
	//alert(cntrlpressed);		 
	if(showlink&&(cntrlpressed==0)){

			document.getElementById('storyedit').value='1';
			//alert(document.getElementById('storyedit').value);
			document.getElementById('storyboard').src=event.target.href;
			m_keyword = googlepage.replace(/m_keyword/g,document.getElementById('searchstring').value);
			window.top.document.getElementById('adframe').src=m_keyword;
			showlink=0;
			document.getElementById('mainarea').style.visibility='visible';
			document.getElementById('mainarea').style.zIndex = "99999";
			document.getElementById('mainarea').style.height = "80%";
			document.getElementById('mainarea').style.width = "80%";
			
			 refreshcounter=0;
			document.getElementById('ptitle').value = '"'+ document.getElementById('searchstring').value + '"';
			
		}
		
		}
	
	
	},true);
*/

document.addEventListener('click', function(event)
{
	if(event.target.id=='mainarea')
{		//alert(mpreview);
		event.target.style.visibility='hidden';
		document.getElementById('storyedit').value='0';
		mpreview=document.getElementById('storyboard').document.location.href;
		alert(mpreview);
		window.open(mpreview);
}
	if(event.target.id=='Technorati')
	{
	window.top.document.getElementById('adframe').src="http://www.technorati.com/mini/index.html?s=" + mpreview;
	//document.getElementById('searchstring').value;
	window.top.document.getElementById('adframe').style.width="50%";
	window.top.document.getElementById('storyboard').style.width="50%";
	
	//alert(event.target.value);
	}
	if(event.target.id=='GoogleRel')
		{
window.top.document.getElementById('adframe').src="http://blogsearch.google.com/blogsearch?hl=en&q=" + document.getElementById('searchstring').value +"&btnG=Search+Blogs";
		window.top.document.getElementById('adframe').style.width="50%";
	window.top.document.getElementById('storyboard').style.width="50%";
		//alert(event.target.value);
	}
	if(event.target.id=='Google')
			{m_keyword = googlepage.replace(/m_keyword/g,document.getElementById('searchstring').value);
			//mpreview = "http://www.google.com/search?hl=en&lr=&q=related:" + mpreview;
			window.top.document.getElementById('adframe').src=m_keyword;
			window.top.document.getElementById('adframe').style.width="50%";
	window.top.document.getElementById('storyboard').style.width="50%";
			//alert(event.target.value);
	}
	
	if(event.target.id=='quickview')
				{
				window.top.document.getElementById('adframe').style.width="20%";
		window.top.document.getElementById('storyboard').style.width="79%";
				
	}
	if(event.target.id=='textclick')
				{
				document.getElementById('storyedit').value='1';
				txt =document.getElementById('searchstring').value;
							m_keyword = googlepage.replace(/m_keyword/g,txt);	
							document.getElementById('storyboard').src=m_keyword;
							
							window.top.document.getElementById('adframe').src="http://www.technorati.com/mini/index.html?s=" + txt;
							showlink=0;
							
							document.getElementById('mainarea').style.visibility='visible';
							document.getElementById('mainarea').style.zIndex = "99999";
							document.getElementById('mainarea').style.height = "80%";
							document.getElementById('mainarea').style.width = "80%";
							
							 refreshcounter=0;
							document.getElementById('ptitle').value = '"'+ txt + '"';
							document.getElementById('mtrail').style.visibility='hidden';	
  						document.getElementById('textclick').style.visibility='hidden';	
							
        window.top.document.selection.empty;
				}
	if(event.target.id=='closep')
				{
	window.top.document.getElementById('adframe').style.width="20%";
	window.top.document.getElementById('storyboard').style.width="79%";
		document.getElementById('storyboard').src='';
		//document.getElementById('mainarea').style.zIndex = "0";
		document.getElementById('mainarea').style.height = "0%";
					document.getElementById('mainarea').style.width = "0%";
		document.getElementById('mainarea').style.visibility='hidden';
		document.getElementById('storyedit').value='0';
	}
	
	if(cntrlpressed==1){ 
	           if(event.target.href&& (document.getElementById('mainarea').style.visibility=='hidden') )

			{
			 mpreview = event.target.href;
			document.getElementById('searchstring').value =event.target.innerHTML;
			 linktext=event.target.innerHTML;
		//alert(cntrlpressed);		 
			//if(showlink){
	
				document.getElementById('storyedit').value='1';
				//alert(document.getElementById('storyedit').value);
				document.getElementById('storyboard').src=event.target.href;
				m_keyword = googlepage.replace(/m_keyword/g,document.getElementById('searchstring').value);
				window.top.document.getElementById('adframe').src=m_keyword;
				showlink=0;
				document.getElementById('mainarea').style.visibility='visible';
				document.getElementById('mainarea').style.zIndex = "99999";
				document.getElementById('mainarea').style.height = "80%";
				document.getElementById('mainarea').style.width = "80%";
				
				 refreshcounter=0;
				document.getElementById('ptitle').value = '"'+ document.getElementById('searchstring').value + '"';
				
			//	}
			cntrlpressed=0;
			}

				event.stopPropagation();
				event.preventDefault();
				
			}
	},true);


document.addEventListener('mouseout', function(event) {
   

if(event.target.id=='mainarea')
{
window.top.document.getElementById('adframe').style.width="20%";
	window.top.document.getElementById('storyboard').style.width="79%";
	
document.getElementById('storyboard').src='';
//document.getElementById('mainarea').style.zIndex = "0";
document.getElementById('mainarea').style.height = "0%";
			document.getElementById('mainarea').style.width = "0%";
event.target.style.visibility='hidden';
document.getElementById('storyedit').value='0';
txt='';
cntrlpressed=0;
}
   
},true);

//


/////////////////////////////////////////addOverlay/////////////////////////////////
function addOverlay() {
        
	  
	  var fstrip = document.createElement("Div");
     
     ht1= ht*60/80;
  
	    frame= '<Div style=\"width:100%;background-color:black;align:center;text-align:center;\"><font align="right" size="4" id=\"quickview\" weight="bold" color="orange">QUICKVIEW</font><input style=\"padding:2mm;border-style:none;width:40%;color:white;background-color:black;font-size:14px;font-weight:bold;\" id=\"ptitle\" type=\"text\" value=\"\"><input type="button" id=\"Technorati\" style=\"font-style:system;font-size:10px;font-weight:bold;color:#663333;border-style:none;background-color:#ffcc66;border-style:outset;\" title=\"Click to find what others are saying\"  value=\"Conversations @\">&nbsp;&nbsp;<input type="button" id=\"GoogleRel\" style=\"font-style:system;font-size:10px;font-weight:bold;color:#663333;border-style:none;background-color:#ffcc66;border-style:outset;\"  title=\"Look for related sites\"  value=\"Blog search \">&nbsp;&nbsp;<input type="button" id=\"Google\" style=\"font-style:system;font-size:10px;font-weight:bold;color:#663333;border-style:none;background-color:#ffcc66;border-style:outset;\" title=\"Click to search on web\" value=\"Web Search\">&nbsp;&nbsp;<input type="button" id=\"closep\" title=\"Click to close\"  style=\"font-style:system;font-size:10px;font-weight:bold;color:white;border-style:none;background-color:#cc0000;border-style:outset;\" value=\"Close\"><img style=\"float:middle;height:13%;width:15%;\" id=\'tech_chart\' src=\"http://technorati.com/chartimg/%28simile%29?totalHits=4761215&size=s&days=30\"></div><NOBR><div><iframe style=\"width:79%;height:' + ht + 'px;border-style:solid;border-width:1;border-color:orange;background-color:white;\" id=\"storyboard\" ></iframe><iframe style=\"float:top;width:20%;height:' + ht +'px;background-color:gray;\" id=\"adframe\"></iframe></div></NOBR><input type=\"text\" id=\"storyedit\" value=\'0\' style=\"visibility:hidden\"><input type=\"text\" id=\"searchstring\" value=\'\' style=\"visibility:hidden\">';
	
	    
	    fstrip.innerHTML = frame;
	    fstrip.title = "Panaroma";
	    
	    filmstrip.appendChild(fstrip);
  }

//////////////////////////////////////end///overlay////////////////////////////////

  
  addOverlay();
  var body = document.getElementsByTagName("body")[0];
setTimeout(function() {
           body.insertBefore(filmstrip, body.firstChild);
    }, 433);

  setTimeout(function() {
           body.insertBefore(mousetrail, body.firstChild);
    }, 300);  
    //document.getElementById('mainarea').style.zIndex = "-1";
    // document.getElementById('mainarea').style.visibility='hidden';
    

     
      body.setAttribute('onbeforeunload',"javascript:if(document.getElementById(\'storyedit\').value=='1'){event.returnValue = \'Select Cancel!!\';}");
  })();
