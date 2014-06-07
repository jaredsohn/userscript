// ==UserScript==
// @name          Flickr: Inline text editor - for photo comments, groups + help forum
// @description	  Lets you easily re-edit your flickr group, help forum and photo comments without leaving the current page you are on
// @version       3.1 - 8th Mar 2009
// @namespace     http://steeev.freehostia.com/flickr/
// @author        Stephen Fernandez aka Steeev http://steeev.freehostia.com/flickr/  +  http://flickr.com/steeev
// @include       http://flickr.com/groups/*
// @include       http://www*.flickr.com/groups/*
// @include       http://www*.flickr.com/groups_topic.gne?*
// @include       http://flickr.com/groups_topic.gne?*
// @include       http://www*.flickr.com/help/forum/*
// @include       http://flickr.com/help/forum/*
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// @exclude       http://www.flickr.com/groups/*/edit/
// @exclude       http://flickr.com/groups/*/edit/
// ==/UserScript==

/*

 (C) 2008 Stephen Fernandez
 
 DONATE
 ------------
 If you wish to thank me for all the work i have put into writing/testing/supporting this script,  
 and would like to support further updates and bug fixes, you can thank me by sending me a few pounds/dollars/euros etc
 via PayPal, my paypal donation link is http://steeev.freehostia.com/donate/ 
 or else perhaps you would like to buy me something from my amazon wishlist http://www.amazon.co.uk/gp/registry/1LAD1VZGDF3XS :)

 Disclaimer
 ------------
 Please note that this software is provided free of charge and comes with no warranty whatsoever, any usage of this script is at your own risk, 
 i cannot be held responsible for anything bad that happens regarding usage of this script.

 Installation
 ------------
 This is a Greasemonkey user script.

 To install, you need FireFox  http://www.mozilla.org/firefox and the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
 Install the Greasemonkey extension then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Flickr: Inline text editor - for photo comments, groups + help forum" 
 and then click Uninstall.
 
 Releases
 -----------
 2.0  2007-05-25 added search and replace function, and also fixed bug with blockquotes
 2.5  2007-05-25 merged my forum easy delete script into this one, so the delete function is also now available without leaving the page
 2.6  2008-03-19 fixed script for latest GM extension update
 2.7  2008-05-23 fixed script to work with international versions of the site
 2.8  2008-06-04 fixed minor bug with textareas, tested compatibility with flickr rich edit script
 3.0  2008-06-05 added inline delete and edit functionality to comments in your photostream
 3.1  2009-03-08 fixed line wrapping issue when editing photostream comments
*/

(function () {
  var ipeVer="3.0";
  if( !document.getElementById('GoodStuff') && !document.getElementById('DiscussPhoto') )
    return;

  var postidpos; 
  magic_cookie=unsafeWindow.global_auth_hash;
  
  if (document.location.href.match(/\/groups\//) || document.location.href.match(/\/help\/forum\//) )
    postidpos=5;
  else if (document.location.href.match(/\/photos\//)) 
    postidpos=4;

  unsafeWindow.TrimString = function (str) {
    str = str.replace(/^[\s]+/, ''); // Trims leading spaces
    str = str.replace(/[\s]+$/, ''); // Trims trailing spaces
    return str;
  }

  function $x( xpath, root ) {
    var doc = root ? root.evaluate?root:root.ownerDocument : document;
    var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
    var result = [];
    while( next = got.iterateNext() )
      result.push( next );
    return result;
  }

  unsafeWindow.searchrep = function(node) {
    var inp=node.getElementsByTagName('input')[0];
    var ta=node.getElementsByTagName('textarea')[0];
    var seltext=ta.value.substring( ta.selectionStart, ta.selectionEnd )
    var searchtext=prompt('Enter the text you wish to search for',seltext);
    if (!searchtext)
      return false;
    var replacetext=prompt('Enter the text you wish to replace it with','');
    if (!replacetext)
      return false;
    if(typeof(inp)!='undefined')
      inp.value=inp.value.replace(searchtext,replacetext,'g');
    if(ta)
      ta.value=ta.value.replace(searchtext,replacetext,'g');
  }

  // add edit and delete functions to onclick property of all edit and delete links

  allDivs=$x('//small/a');
  for (var i = 0; i < allDivs.length; i++) {
    thisDiv = allDivs[i];
    if(thisDiv.getAttribute('href').match(/\/edit\/$/) || thisDiv.getAttribute('href').match(/\/editcomment/))      
      thisDiv.setAttribute('onClick',"inlineedit(this);return false;");
    if(thisDiv.getAttribute('href').match(/\/delete\/$/) || thisDiv.getAttribute('href').match(/\/deletecomment/))
      thisDiv.setAttribute('onClick',"propadelete(this);return false;");
  }

unsafeWindow.inlineedit=function(edlink) {
  
  postlink=edlink.getAttribute('href');
  
  if (postlink.match('http:'))
    postlink=postlink.split('flickr.com\/')[1]; 
  
  // check if we already have an edit session going for that post
  if(document.getElementById('ined_' + postlink.split('/')[postidpos])) {
    return false;
  }

  if(edlink.parentNode.parentNode.innerHTML.match('<h4>'))
    blockquote=1; //post contains a blockquote, which means the innerHTML is screwed up
  else
    blockquote=0; 
  
   postid=postlink.split('/')[postidpos];
   
  if(postid=='edit') {
    postid='';
    mode='firstpost';
  }
  else
    mode='anypost';
  
  eddiv=document.createElement('div');
  eddiv.setAttribute('id','ined_' + postid);
  eddiv.style.display='block !important';

  searchreplink=document.createElement('a');
  searchreplink.setAttribute('href','javascript:;');
  searchreplink.textContent='Search + Replace';
  searchreplink.setAttribute('onclick','searchrep(this.parentNode)');
  searchreplink.setAttribute('style','float: right; margin-right:60px');  
  
  eddiv.appendChild(searchreplink);

  stvad=document.createElement('div');
  stvad.innerHTML="Flickr Inline Post Editor v" + ipeVer + " by <a target='_blank' href='http://steeev.freehostia.com/flickr/'>Steeev</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  stvad.style.fontSize=11;
  stvad.style.color='red !important';
  stvad.style.cssFloat='right';
  
  subbut=document.createElement('button');
  subbut.setAttribute('class','Butt');
  subbut.textContent='SAVE';
  subbut.setAttribute('onclick','postitbaby(this.parentNode,"' + postlink + '")');

  cancelbut=document.createElement('button');
  cancelbut.setAttribute('class','DeleteButt');
  cancelbut.textContent='Cancel';
  cancelbut.setAttribute('onclick','deltarea(this.parentNode)');

  tarea=document.createElement('textarea');
  tarea.setAttribute('id','tarea');
  tarea.setAttribute('name','textarea');
  //tarea.setAttribute('wrap','soft');  
  tarea.setAttribute('rows','10');
  tarea.style.width='400px';

  // store the old html in here
  tarea2=document.createElement('textarea');
  tarea2.setAttribute('id','tmptarea');
  tarea2.style.display='none';
  //tarea2.setAttribute('wrap','soft');
  

  if (mode=='firstpost') {
    topic_title=$x("//td[@id='GoodStuff']/h2[1]")[0].textContent;
    subjbox=document.createElement('input');
    subjbox.setAttribute('type','text');
    subjbox.setAttribute('id','tbox');    
    subjbox.style.width='400px';
    subjbox.value=topic_title
    eddiv.appendChild(subjbox);
    eddiv.appendChild(document.createElement('<br>'));
  }

  eddiv.appendChild(tarea);
  eddiv.appendChild(tarea2);
  eddiv.appendChild(document.createElement('<br>'));
  
  eddiv.appendChild(stvad); // link to steeev.freehostia.com
  
  eddiv.appendChild(subbut);
  eddiv.appendChild(document.createTextNode(' OR '));
  eddiv.appendChild(cancelbut);
  
  
  if(blockquote) {
    edlink.parentNode.parentNode.setAttribute('id', 'td_' + postid );
    aitch4='<h4>' + unsafeWindow.TrimString(edlink.parentNode.parentNode.innerHTML.split('<h4>')[1].split('</h4>')[0]) + '</h4>';
    small='<small>'+ unsafeWindow.TrimString(edlink.parentNode.innerHTML) +'</small>';
    content=edlink.parentNode.parentNode.innerHTML.split('</h4>')[1].split('<small>')[0];
    //alert(aitch4); //alert(small); //alert(content);
  }
  else {
    edlink.parentNode.parentNode.parentNode.setAttribute('id', 'td_' + postid );
    aitch4='<h4>' + unsafeWindow.TrimString(edlink.parentNode.parentNode.parentNode.innerHTML.split('<h4>')[1].split('</h4>')[0]) + '</h4>';
    small='<small>' + unsafeWindow.TrimString(edlink.parentNode.innerHTML) +'</small>';
    content=edlink.parentNode.parentNode.parentNode.innerHTML.split('</h4>')[1].split('<small>')[0];
    //alert(aitch4); //alert(small); //alert(content);
  }

  content=content.replace(/<span[^>]*/g,"<span",'g').replace(/<span>|<\/span>/g,"",'g');
  content=content.replace('<p>','','g');
  content=content.replace('</p>','','g');
  content=content.replace('<p/>','','g');
  
  
  //content=unsafeWindow.TrimString(content);
  //alert(content);
  //deal with inconsistent html text on photo pages/discussion pages
  if (location.href.match(/\/photos\//)) {
    content=content.replace(/[\r\n]+/g, '');
    content=content.replace(/<br>/g, '\n');
    tarea.innerHTML=unsafeWindow.TrimString(content);
    }
  else
    tarea.innerHTML=unsafeWindow.TrimString(content.replace('<br>','','g').replace('<br\/>','','g').replace('<br \/>','','g'));

  tdcontents = aitch4 + content + small;
  tarea2.innerHTML=tdcontents;
  thetd=document.getElementById('td_' + postid);
  thetd.innerHTML= aitch4 + small;
  theh4=thetd.getElementsByTagName('h4')[0];
  theh4.parentNode.insertBefore(eddiv, theh4.nextSibling);  
  
  tarea.focus();
	
  return false;

} // end inlineedit function

unsafeWindow.propadelete=function(dlink) {
  if( !confirm('Are you sure you want to delete it?'))
    return false;
  dlink.innerHTML='<b>deleting ...</b>';
  data='magic_cookie=' + unsafeWindow.global_auth_hash+ '&done=1';
  detextlink=dlink.getAttribute('href');
  hostname=location.href.split('/')[2];
  apiurl="http://" + hostname + detextlink ;

  ////////////////////////////////////////////////////////////////
  // BEGIN new xmlhttprequest to replace gm_xmlhttprequest 19/3/08
  ////////////////////////////////////////////////////////////////

  checkresponse = function(evt) {
    if((evt.target.status==200) && !evt.target.responseText.match('<p class="Problem">') && !evt.target.responseText.match('<div class="Four04Case">'))
      dlink.parentNode.innerHTML='<font color=red>----- This post has been DELETED! -----</font>';
    else {
      alert('Error deleting item');
    }
  }

  req = false;
  try {
    req = new XMLHttpRequest();
  } 
  catch(e) {
    req = false;
  }

  req.onload=checkresponse; // response handler function (defined above)
  if(req) {
    req.open("POST", apiurl, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.send(data);
  }
  ////////////////////////////////////////////////////////////////
  // END xmlhttprequest to replace gm_xmlhttprequest 19/3/08
  ////////////////////////////////////////////////////////////////

return false;

} // end propadelete function


unsafeWindow.deltarea = function (theeditor) {
  tas=theeditor.parentNode.getElementsByTagName('textarea');
  if(!location.href.match(/\/photos\//))
    theeditor.parentNode.innerHTML=tas[1].value;
  else
    theeditor.parentNode.innerHTML=tas[1].value.replace('\n','<br>','g');
  //theeditor.parentNode.removeChild(theeditor);
}

unsafeWindow.postitbaby=function(node, editlink){
  
  if(node.innerHTML.match(/<input/)) {
    subject = encodeURIComponent(node.getElementsByTagName('input')[0].value);
    if(document.location.href.match(/\/groups\//)) 
      fullsubject='&subject=' + subject;
    else
      fullsubject='&title=' + subject;
  }
  else {
    subject = '';
    fullsubject='';
  }
  //alert(node);
  message= encodeURIComponent(node.getElementsByTagName('textarea')[0].value)

  if(document.location.href.match(/\/groups\//) || document.location.href.match(/\/photos\//)) 
    fullmessage='&message=' + message;
  else 
    fullmessage='&body=' + message;

  data='magic_cookie=' + unsafeWindow.global_auth_hash + "&done=1" + fullmessage  + fullsubject;
  hostname=unsafeWindow.document.location.href.split('/')[2];

  // examples
  // editlink for photo comment
  // URL=http://flickr.com/photos/steeev/2548139316/editcomment72157605438272512/
  // done=1 message= magiccookie=
  
  // delete link for photo comment
  // URL=http://flickr.com/photos/steeev/2548139316/deletecomment72157605438266058/
  // data done=1 magiccookie
  
  apiurl="http://" + hostname + editlink;

  p = new XMLHttpRequest();
  p.open("POST", apiurl, false);
  p.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  p.setRequestHeader("Referer", apiurl);
  p.setRequestHeader("User-agent","Mozilla/4.0 (compatible) Greasemonkey - Flickr Inline Forum Post Editor");
  p.send(data);

  if(p.status!=200 || p.responseText.match('<p class="Problem">')) {
    if(p.responseText.match('<p class="Problem">')) {
      alert(p.responseText.split('<p class="Problem">')[1].split('</p>')[0]);
      return false;
    }
    else {
      alert('Error saving changes!');
      return false;
    }
  }
  
  //delete textarea + substitute old text with new;
  
  if(editlink.match('http:'))
    editlink=editlink.split('flickr\.com')[1];
  
  if(editlink.split('/')[postidpos]=='edit') 
    postid = '';
  else
    postid = editlink.split('/')[postidpos];
    
  tatas=node.getElementsByTagName('textarea');
  tashite=tatas[1].value;
  
  aitch4='<h4>' + unsafeWindow.TrimString(tashite.split('<h4>')[1].split('</h4>')[0]) + '</h4>';
  small='<small>'+ unsafeWindow.TrimString(tashite.split('<small>')[1].split('</small>')[0]) +'</small>';
  
  editedtext=node.getElementsByTagName('textarea')[0].value;
  
  //smallago=small.split('ago')[1];
  //small=small.split('edited this ')[0] + " edited this post 1 nano second ago " + smallago;

  thetd=document.getElementById('td_' + postid);
  thetd.innerHTML = aitch4 + editedtext.replace('\n','\n<br\>','g') + "<br/>" +  small;

  if(!postid) // must be first post in a group discussion so replace subject
    $x("//td[@id='GoodStuff']/h2[1]")[0].innerHTML=decodeURIComponent(subject);
  
  return false;

}// end postitbaby function

})() ; // end anonymous function