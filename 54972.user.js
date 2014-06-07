// ==UserScript==
// @name           GLB Copy Forum Access 
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_private_access.pl?forum_id=*
// ==/UserScript==
// 
// 

window.setTimeout(function(){

// functions
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


function getElementsByClassNameMulti(classname, classname2, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    var re2 = new RegExp('\\b' + classname2 + '\\b');	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
        if(re2.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};


function getElementsByName(typename,par){
    var a=[];   
	var re = new RegExp('\\b' + typename + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].name)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;

}

function getElementsByType(typename,par){
    var a=[];   
	var re = new RegExp('\\b' + typename + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].type)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;

}


function AddAgents(forumid){
    var buttonslist = getElementsByClassName('JButton',document);
    for (var t=0;t<buttonslist.length;t++) {
        buttonslist[t].setAttribute("disabled", true);
        buttonslist[t].setAttribute("value", "Working...")
    };
    GM_xmlhttpRequest({
       method: 'GET',
       url: 'http://goallineblitz.com/game/forum_private_access.pl?forum_id=' + forumid,
       headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
       },
       onload: function(agntname) {
          var response1=agntname.responseText;
          // add roster innerhtml to holder div
          if (response1.indexOf('<td><a href="') > 0) {
              var agentlistpre = response1.split('<td><a href="');
              var agentlist = new Array;
              var agentcookie = '';
              for (var q=1;q<agentlistpre.length;q++) {
                  var pushme = true;
                  for (var again=0;again<existingagents.length;again++) {
                      if (agentlistpre[q].substring(agentlistpre[q].indexOf('>')+1,agentlistpre[q].indexOf('</a>')) == existingagents[again]) {
                          pushme = false;
                      }
                  }
                  if (pushme) {
                      agentlist.push(agentlistpre[q].substring(agentlistpre[q].indexOf('>')+1,agentlistpre[q].indexOf('</a>')));
                  }
              };
              for (var t=1;t<agentlist.length;t++) {
                  agentcookie+=agentlist[t] + ',';
              }
              
              if (agentcookie.length >1) {
                  if (agentcookie.length > 2000) {
                      alert('There are more agents than available to transfer in one batch. Once this completes run the copy again to complete the transfer.');
                      agentcookie = agentcookie.substring(0,agentcookie.indexOf(',',2000)+1);
                  }
                  agentcookie = agentcookie.substring(0, agentcookie.length -1);
                  document.cookie="agentadds=" + escape(agentcookie) + "; expires=15/02/2012 00:00:00";
              };

              var inputbox = getElementsByName('user_name',document);
              inputbox[0].value = agentlist[0];
              var clickimage = getElementsByType('image', document);
              clickimage[clickimage.length -1].click();
          }else{
              alert('No Agents Have Access to the selected forum!! Please select a different forum.');
              window.location.reload();
          };
    }});
    
}


function individualforum(forumtitle, forumlink){
    GM_xmlhttpRequest({
       method: 'GET',
       url: 'http://goallineblitz.com' + forumlink,
       headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
       },
       onload: function(agntname) {
          var response1=agntname.responseText;
          // add roster innerhtml to holder div
          if (response1.indexOf('forum_private_access') > 0) {
              buildtable += '<tr><td width="90%">'+ forumtitle + '</td><td width="10%"><input type="button" class="JButton" name="' +forumlink.substring(forumlink.indexOf('forum_id=')+9, forumlink.length)+'" value="Add Agent Access"></td></tr>';
          };
          countdown = countdown -1;
          if (countdown ==0) {
              docelements[docelements.length-1].innerHTML += buildtable + '</table>';
              var forumidlink ='';
              var buttonslist = getElementsByClassName('JButton',document);
              for (var t=0;t<buttonslist.length;t++) {
                  buttonslist[t].addEventListener("click", function(){ AddAgents(this.name); },true)
              }
          }

       }});


}
// code body

var javcookie ='';
var currentid = '';
var javcookie2 ='';

if (document.cookie.length>0){
    var c_start=document.cookie.indexOf("agentadds=");
    var c_name='agentadds';
    if (c_start!=-1){ 
        c_start=c_start + c_name.length+1; 
        var c_end=document.cookie.indexOf(";",c_start);
        if (c_end==-1) c_end=document.cookie.length;
        javcookie = unescape(document.cookie.substring(c_start,c_end));
        //delete cookie
        document.cookie='agentadds=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    } 
    if (javcookie.length > 0) {
        var agentscookie = javcookie.split(',');
        var newcookie = '';
        for (var w=1;w<agentscookie.length;w++) {
            newcookie+=agentscookie[w] +',';
        }
        if (newcookie.length>1) {
            newcookie = newcookie.substring(0, newcookie.length -1);
            document.cookie="agentadds=" + escape(newcookie) + "; expires=15/02/2012 00:00:00";
        }
        //alert(document.cookie.length);
        if (agentscookie.length>0) {
              var formobjs = getElementsByType('image', document);
              var txtbox = document.getElementsByName("user_name");
              txtbox[0].value = agentscookie[0];
              formobjs[formobjs.length -1].click();
        }
        
    }
}




//look for javascript cookie





// build tempdiv
var newDiv = getElementsByClassName('content_container',document);
var buildtable ='';
//create a place to store temp data
tempDiv = document.createElement('div');
tempDiv.id = 'tempDiv';
tempDiv.innerHTML = "";
tempDiv.setAttribute("style","visibility: hidden; display:none;");
newDiv[0].appendChild(tempDiv);
var existingagents = new Array;
var existobjs = getElementsByClassNameMulti('alternating_color1','alternating_color2',document);
for (var st=0;st<existobjs.length;st++) {
    existingagents.push(existobjs[st].innerHTML.substring(existobjs[st].innerHTML.indexOf('">')+2,existobjs[st].innerHTML.indexOf('</a>')));
}
var docelements = getElementsByClassName('content_container',document);
var countdown = 0;
currentid = window.location.href.substring(window.location.href.indexOf('forum_id=')+9,window.location.href.length);

// get private forum lists and insert into tempdiv
GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://goallineblitz.com/game/forum_main.pl',
   headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
   },
   onload: function(agntname) {
      var response1=agntname.responseText
      // add privateforums innerhtml to holder div
      tempDiv.innerHTML = response1.substring(response1.indexOf('<div class="medium_head">Private Forums</div>'),response1.indexOf('</table>',response1.indexOf('<div class="medium_head">Private Forums</div>'))) ;
      // goto each private forum and check if forum_private_access link exists
    var forumslist = getElementsByClassName('title', tempDiv);
    var forumslistlink = new Array;
    var forumslistname = new Array;
    var forumslistshow = new Array;
    // build links table and add to page 
    
    buildtable += '<br><br><table cellpadding="10" cellspacing="20" width="100%">';
    countdown = forumslist.length;
    for (var q=0;q<forumslist.length;q++) {
        forumslistlink.push(forumslist[q].innerHTML.substring(forumslist[q].innerHTML.indexOf('href="')+6,forumslist[q].innerHTML.indexOf('"',forumslist[q].innerHTML.indexOf('href="')+9)));
        forumslistname.push(forumslist[q].innerHTML.substring(forumslist[q].innerHTML.indexOf('>')+1,forumslist[q].innerHTML.indexOf('</a>')));
        if (forumslistlink[q].indexOf('forum_id=' + currentid)>-1) {
            countdown = countdown -1;
        }else{
            individualforum(forumslistname[q], forumslistlink[q]);
        }
    };
}});

},1000);
