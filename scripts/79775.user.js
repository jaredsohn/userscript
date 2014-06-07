// ==UserScript==
// @name           OKC Journal Thread Notification
// @namespace      nomonkeynodeal
// @include        *okcupid.com/profile/*/journal*
// @include        *okcupid.com/journal?tuid=*&pid=*
// @exclude        *okcupid.com/profile/*/journal
// ==/UserScript==

//comment this out to have regular titles
var bettertitles="document.title=document.title.replace('OkCupid | ','');";

//var ignoredstr="ericthe,eric-the,eric_the,"+
    "rasthe,ras-the,ras_the,Ra5,De5troy3r,"+
    "gogo,go-go,go_go,g0g0,g0-g0,g0_g0,vandyke,"+
    "usagiallegra,kristaliis,Rasenstein,sock,"+
    "Go_Don_Quixote,LauraBooviAye,barnaclejerkoff,"+
    "LauraBeaver,thusto,David_Booey,LieLieDeny";

var ignoredstr="++++"; //ignore no one

//rate at which to check threads for updates
var checkrate=20; //seconds

//show update when original post is changed
var opupdate=true;

//place the number of new comments after the tab's title for use with Tab Badge
var numberaftertitle=true;

var commentstr="COMMENT";
var updatedstr="POST UPDATE";

var debug=false;



//-------------------------------------------------------------------------------

if(document.title.length>3){
  checkupdate();
  var sc=document.body.innerHTML.match(/class="comment_text"/gi);
  var startcomments=(sc==null?0:sc.length);
  var me=unsafeWindow.SCREENNAME;
  var startpostlength=0;
  var lastnewnum=0;
  var ignored=ignoredstr.toLowerCase().split(",");
  
  if(debug) me="++++";

  document.body.appendChild(document.createElement("script")).innerHTML=bettertitles+
    "var originaltitle=document.title;"+
    "document.body.setAttribute('onFocus','document.title= originaltitle;');"+
    "document.body.setAttribute('onmouseover','document.title=originaltitle;');";
    
  setInterval("checkpage();",checkrate*1000);

  unsafeWindow.checkpage=function(){        

    xhr=new XMLHttpRequest();
    xhr.onreadystatechange = function(){ 
      if(xhr.readyState == 4 && xhr.status == 200){
        var cm=xhr.responseText.match(/class="comment_text"/gi);
        var numcomments=(cm==null?0:cm.length);
          
        if(numcomments>startcomments){

          var lastcommenter=xhr.responseText.match(/<a href="\/profile\/(.+?)">.+?<ul class="mini_actions">/i)[1].toLowerCase();

          if(debug) GM_log("lastcommenter: "+lastcommenter);
          
          var flagignore=false;
          for each (iuser in ignored){
            if(lastcommenter.indexOf(iuser)!=-1){
            if(debug) GM_log(iuser+"/"+ignored);
            flagignore=true;
            break;
            }
          } 
          
          if(lastcommenter!=me && !flagignore){
            //var titleparts=document.title.match(/.*\((\d+)\).*/);
            //lastnewnum=parseInt((titleparts==null?0:titleparts[1]))+(numcomments-startcomments);
            
            if(document.title.indexOf(commentstr)==-1 && document.title.indexOf(updatedstr)==-1) lastnewnum=0; //set zero if thread has already been checked
            lastnewnum=lastnewnum+(numcomments-startcomments); //add new comments to previous unchecked comments count
            
            if(debug) GM_log("lastnewnum: "+lastnewnum);
            if(numberaftertitle){
              document.title=commentstr+"("+lastnewnum.toString()+")";
            }else{
              document.title="("+lastnewnum.toString()+")"+commentstr;
            }
          } 
          
          startcomments=numcomments;
          var addc=document.body.innerHTML.match(/boards.add_comment\('(\d+)','(\d+)'/);
          if(addc!=null){        
            setTimeout("boards.load_comments('"+addc[1]+"','"+addc[2]+"',0,0,0);",0);
            document.getElementById(addc[1]).innerHTML=
              "<a href=\"#LoadComments\"onclick=\""+addc[1]+
              " return false;\">"+numcomments+" comments";
          }
        }
            
        //check for updates to journal entry
        if(opupdate){
          var post=xhr.responseText.replace(/\n/g," ");
          
          if(post!=null){
            post=post.match(/class="entry_text">(.*?)<\/div>\s*<div class="journal_actions">/);
            
            if(post[1]!=undefined){
              if(startpostlength==0){
                startpostlength=post[1].length;
              }else{
                if(startpostlength!=post[1].length){
                  var es=(lastnewnum==0?"":"("+lastnewnum.toString()+")"); //don't tack the number on if no new comments too
                  //var es="("+lastnewnum.toString()+")";
                  if(numberaftertitle){
                    document.title=updatedstr+es;
                  }else{
                    document.title=es+updatedstr;
                  }
                  startpostlength=post[1].length;
                }
              }
            }
          }
        }
        
        xhr=null;
                
      }
    }; 

    xhr.open("GET", location.href, true); 
    xhr.send(null);
  }
}


function checkupdate(){
GM_registerMenuCommand("-------jthreadnotfy------", function(){});

//auto update
var SUC_script_num = 79775; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script '+script_name+'.\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for '+script_name+'.');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
}
