// ==UserScript==
// @name           Uploader link Collect
// @author         ionbladez
// @version        2011-05-23
// @description    Grabs urls from multiple upload/filesharing sites and displays them in a neat box in the corner of your browser.
// @include        htt*://*
// ==/UserScript==

	var promptMe = false;
	var ppd = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" style="max-height: 16px;>';
	ppd+='<input type="hidden" name="cmd" value="_s-xclick">';
  ppd+='<input type="hidden" name="hosted_button_id" value="QSBEX7UAU83B4">';
  ppd+='<input type="image" src="http://www.burn2u.com/images/donatepng.png" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">';
  ppd+='<img alt="" border="0" src="https://www.paypalobjects.com/WEBSCR-640-20110429-1/en_US/i/scr/pixel.gif" width="1" height="1"></form>';
  
	var boxFont = "font-family: Arial; font-size: 11px;";	 // css only, please
	var titleFont = "font-family: Tahoma; font-size: 13px;"; 	// same as above.
	var buttonStyle = 'border: solid 1px black; color: black; background-color: white; cursor: crosshair;';
	var boxStyle = 'border: solid 1px black; padding: 1px; font-family: Arial; font-size: 11px;';
	var titleText = "Found download links on current page";
	var doWhat;
	var inp1 = '<input type="text" size="50" value="';
	var inp2 = '" style="'+boxStyle+'">';
	var linkList = "";
	var linkList2 = "";
	var boxstyle = 'position:fixed;bottom:0px;left:0px;border-top:solid 1px black;border-right:solid 1px black;background-image:url(http://i.imgur.com/akFyG.png);color:black;cursor:crosshair;width:850px!important;z-index:1000;padding:0px;';
	var divBox = document.createElement("div");
	var boxHeight = 175;
  var closeButton = '<img border="0" width="16" height="16" style="position:absolute; top:-2px; right:-2px;" src="http://burn2u.com/images/action_stop.gif" title="Close" alt="[x]">';
	var slidF = document.createElement('div');
	slidF.innerHTML = unescape('%09%3Cscript%20type%3D%22text/javascript%22%3E%0A%09function%20slideDown%28%29%20%7B%0A%09var%20dlt%20%3D%20document.getElementById%28%22dllist%22%29%3B%0A%09dlt.setAttribute%28%22style%22%2C%20%22display%3Anone%3B%22%29%3B%0A%09%7D%0A%0A%09function%20tB%28%29%20%7B%0A%09var%20tl%20%3D%20document.getElementById%28%22linkbox%22%29%3B%0A%09var%20dl%20%3D%20document.getElementById%28%22dltext%22%29%3B%0A%09if%20%28tl.style.display%3D%3D%22none%22%29%20%7B%0A%09dl.style.display%20%3D%20%22none%22%3B%0A%09tl.style.display%20%3D%20%22%22%3B%0A%09%7D%20else%20%7B%0A%09tl.style.display%3D%22none%22%3B%0A%09dl.style.display%3D%22%22%3B%0A%09%7D%0A%09%7D%0A%0A%09function%20openDl%28link%29%20%7B%0A%09/*%20old%20%27framed%20method%27%2C%20not%20working.%0A%09var%20mh%20%3D%20document.getElementById%28%22dlframewin%22%29%3B%0A%09mh.style.display%3D%22%22%3B%0A%09document.frames%5B%27dlframe1%27%5D.src%3Dlink%3B%0A%09*/%0A%09var%20t%3Dwindow.open%28link%2C%20false%2C%20%27width%3D800%2Cheight%3D600%27%29%3B%0A%09%7D%0A%0A%09/*function%20closeDl%28%29%20%7B%0A%09var%20mh%20%3D%20document.getElementById%28%22dlframewin%22%29%3B%0A%09mh.style.display%3D%22none%22%3B%0A%09%7D*/%0A%09%3C/script%3E');

  var dlframe = document.createElement('div');
  dlframe.setAttribute("id", "dlframewin");
  dlframe.setAttribute("name", "defaultframe");
  var styleAtt = "width:800px; height:600px; border:solid 2px #ff0000;";
  //styleAtt += " vertical-align:top; padding:0px; margin-top:auto;";
  //styleAtt += " margin-bottom:auto; margin-left:auto; margin-right:auto;";
  styleAtt += " z-index: 1001; position: fixed; bottom:20px; left: 20px;";
  styleAtt += " background-color: #000000; display:none;";
  dlframe.setAttribute("style", styleAtt);
  
  dlframe.innerHTML = '<table border="0" cellspacing="0" cellpadding="0">'+"\r\n";
  dlframe.innerHTML += '  <tr>';
  dlframe.innerHTML += '    <td style="height: 16px; border-bottom: solid 1px black; background-color: blue; color: #ffffff; font-family: arial; font-weight: bold;" width="800" height="16">';
  dlframe.innerHTML += '      <div width="800" height="16" style="padding: 2px; font-size: 13px;">';
  dlframe.innerHTML += '        <span style="float: left; color: white; font-weight: bold;" align="left">Download frame</span>';
  dlframe.innerHTML += '        <span style="float: right; color: white; font-weight: bold;" align="right"><a href="javascript:closeDl();" style="color: #ffffff;"><u>[x]</u></a>&nbsp;</span>';
  dlframe.innerHTML += '    </td>';
  dlframe.innerHTML += '    </tr>';
  dlframe.innerHTML += '    <tr>';
  dlframe.innerHTML += '    <td style="width:800px; height: 784px;" width="800" height="784">';
  dlframe.innerHTML += '      <iframe width="800" height="784" src="" id="dlframe1" name="dlframe1" frameborder="0" allowtransparency="true"></iframe>';
  dlframe.innerHTML += '    </td>';
  dlframe.innerHTML += '  </tr>';
  dlframe.innerHTML += '</table>';
  

	var howMany = collectLinks();
   if (howMany>0||linkList.length>0) { 
    document.body.appendChild(dlframe);
   	document.body.appendChild(slidF); 	
    if (promptMe==true) doWhat = prompter();
    if (doWhat == true) {
      showBox();
    }
    if (promptMe==false) {
    // continue to grab links if prompting is disabled.
      showBox();
    }
	}

	function collectLinks() {
	var foundLinks = 0;
	var sp = "^https?://[^/]*(rapidshare|hotfile|[2|4]shared|mediafire|megaupload|depositfiles|multiupload|ifolder|turbobit|letitbit|shareflare|fileshare\.in|upload\.com)\.(com|net|ru|ua)/";
	for (var i2=0; i2 < document.getElementsByTagName("a").length; i2++) {
    var innertext = document.getElementsByTagName("a")[i2].href;
    var innerHTML = document.getElementsByTagName("a")[i2].innerHTML;
    if (innertext.search(sp)>-1 && document.location.href.search(sp)<0) {
    foundLinks++;
    innerHTML = innerHTML.replace('/s/<[a-zA-Z\/][^>]*>//g','');
    linkList += '<tr><td>'+foundLinks+'</td><td>'+inp1+innertext+inp2+'</td><td>';
    linkList += inp1+innerHTML+inp2+"</td><td>"+'<a style="font-family: arial; color: blue; cursor: crosshair;" href="javascript:void(0);" ';
    linkList += 'onclick="openDl(\''+innertext+'\'); return false;">'+innerHTML+'</a>'+"</td></tr>\r\n\n";
    linkList2 += '['+foundLinks+']. '+innertext+"\r\n\n"; 
    }
	}
	return foundLinks;
	}

	function prompter() {
	var x = window.confirm("I have found some upload links, would you like to view them?");
    if (x) {
    return true;
    } else {
    return false;
    }
	}

	function showBox() {
	divBox.setAttribute("id", "dllist");
	divBox.setAttribute("name", "dllist");
	divBox.setAttribute("style", boxstyle);
	var innerHTML2 = '    <div style="background-image: url(http://www.burn2u.com/images/bar_nice.png);"><span style="'+titleFont+'" align="left">&nbsp;<blink><font color="#ff0000"><strong>'+titleText+'</strong></font></blink></span><span style="align: right; position: absolute; ';
	innerHTML2 += 'right: 2px; top: 2px; font-size: 11px; font-family: tahoma; max-height: 17px;"';
	innerHTML2 += 'align="right">upload link collect0r v1.2:by <strong>ionbladez</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div>'+ppd+'</div><strong>';
	innerHTML2 += '<a href="javascript:slideDown()">'+closeButton+'</strong></a></span></div>'+"\r\n";
	innerHTML2 += '    <div style="overflow: auto; height: '+boxHeight+'px; width: 100% !important;">'+"\r\n";
	innerHTML2 += '	   <p><span onclick="tB();">&nbsp;[<strong>Toggle plain-text</strong></span>]<br>&nbsp;<textarea style="display:none; height: 100%;" id="linkbox" rows="6" cols="100">'+linkList2+'</textarea></p>'+"\r\n";
	innerHTML2 += '	   <table width="100%" border=0 cellpadding=1 cellspacing=3 id="dltext" name="dltext" style="'+boxFont+' text-align: left; padding-left: 3px;">'+"\r\n";
	innerHTML2 += '      <tr><td>#</td><td>Link URL</td><td>Title</td><td>Download [opens in new window]</td></tr>'+"\r\n";
	innerHTML2 += linkList;
	innerHTML2 += '    </table></div>'+"\r\n";
	divBox.innerHTML=innerHTML2;
	document.body.appendChild(divBox);
	}

