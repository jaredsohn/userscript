// ==UserScript==
// @name           OKC Attention Whore
// @namespace      nomonkeynodeal
// @description    Automatically reuploads an OkC profile picture.
// @include        *okcupid.com*
// ==/UserScript==

GM_registerMenuCommand("-------okcattwhore-------", function(){});

GM_registerMenuCommand("Enable/disable Attention Whore", function(){
  GM_setValue("autoupload",!GM_getValue("autoupload", false));
  var msg=GM_getValue("autoupload")?"Auto picture reupload enabled":"Auto picture reupload disabled";
  alert(msg);
});

GM_registerMenuCommand("Attention Whore configuration", function(){
  var numberpic=prompt("Counting from the top of the photo page (first album), what number picture are we reuploading?",
    parseInt(GM_getValue("numberpic", 0))+1);
  
  if(numberpic!=-1 && numberpic!=""){
    GM_setValue("numberpic", parseInt(numberpic)-1);
    savepictureurl();
  }  
  
  var reuploadrate=prompt("Reupload this every how many hours? (The default is 12 hours for a reason. Your profile will be deleted if you do this too often.)",GM_getValue("reuploadrate", 12));
  if(reuploadrate!=-1 && reuploadrate!="") GM_setValue("reuploadrate", reuploadrate);
  
  var picturecaption=prompt("Enter the picture caption.", GM_getValue("picturecaption",""));
  if(picturecaption!=-1) GM_setValue("picturecaption", picturecaption);
 
});

var reset=false;
GM_registerMenuCommand("Reupload picture now", function() {
  GM_setValue("reuploadlast", "0");
  reset=true;
  check();
});

if(document.title.length>5){
  var screenname=unsafeWindow.SCREENNAME;
  setInterval(check,20000);
}

function check(){
  if(GM_getValue("autoupload") || reset){
    reset=false;
    var reuploadrate=parseInt(GM_getValue("reuploadrate", 12));    
    var lastcheck=parseFloat(GM_getValue("reuploadlast", 0));
    var d=new Date();
    var datestr=d.getTime();
   
    if(datestr-lastcheck>=reuploadrate*3600000){
      GM_setValue("reuploadlast", datestr.toString());
        deleteoldpic();
        wait(200);
        uploadpic();
    }
  }  
}

function uploadpic(){

  var url=GM_getValue("pictureurl");
  url=url.replace(/\/\d{1,5}x\d{1,5}/g,"").replace(/\d{1,2}\//g,""); //get full size version
  SB_log("Uploading source pic: "+url);
  url=url.replace(/:/g,"%3A").replace(/\//g,"%2F");
  
  //http://ak0.okccdn.com/php/load_okc_image.php/images/16/150x150/558x800/196x19/904x727/0/12483468089176038358.jpeg
  var coords=GM_getValue("pictureurl").match(/\/images\/\d+\/\d{1,5}x\d{1,5}\/\d{1,5}x\d{1,5}\/(\d{1,5})x(\d{1,5})\/(\d{1,5})x(\d{1,5})\/0\/\d*?\.(jpg|gif|png|jpeg)/i);
  
  //GM_log("crop: "+coords);
  
  GM_xmlhttpRequest({method:"POST",
    url:"http://www.okcupid.com/ajaxuploader?temp_id=1"+
      "&style_template=new/photoupload.css&rand=9723127"+Math.floor((800)*Math.random())+100+
      "&img_template=pictureupload&url="+url,
    onload: function(responseDetails){
      
      var newpicid=responseDetails.responseText.match(/'id' : '(\d+)',/)[1];
      GM_xmlhttpRequest({method:"GET",
        url:"http://www.okcupid.com/photoupload?usenewupload=1"+
          "&picture.add=1&upfile="+url+"&picid="+newpicid+
          "&imgtype=1&caption="+GM_getValue("picturecaption").replace("%timestamp%",gettimestamp())+"&tn_upper_left_x="+coords[1]+
          "&tn_upper_left_y="+coords[2]+"&tn_lower_right_x="+coords[3]+"&tn_lower_right_y="+coords[4],
        onload: function(responseDetails){

          GM_xmlhttpRequest({method:"GET",url:"http://www.okcupid.com/photoupload?position="+GM_getValue("numberpic")+"&picid="+newpicid+"&albumid=0&picture.move_to_ajax=1"});
          SB_log("Picture upload complete.");
        }
        
     });
   }
 });
}

function savepictureurl(){
  SB_log("Searching for picture...");
  GM_xmlhttpRequest({method:"GET",url:"http://www.okcupid.com/profile/"+screenname+"/album/0",
    onload: function(responseDetails) {
      var oldprofilepictures=responseDetails.responseText.match(/http:\/\/.+?\/images\/\d+\/\d{1,5}x\d{1,5}\/\d{1,5}x\d{1,5}\/\d{1,5}x\d{1,5}\/\d{1,5}x\d{1,5}\/0\/\d*?\.(jpg|gif|png|jpeg)/gi); 
      var pic=oldprofilepictures[parseInt(GM_getValue("numberpic"))]; //also remove watermark here
      GM_setValue("pictureurl",pic);
      SB_log(pic.match(/\/(\d*?\.(jpg|gif|png|jpeg))$/i)[1]+" found.");
    }
  });
}

function deleteoldpic(){
  SB_log("Deleting picture from profile...");
  GM_xmlhttpRequest({method:"GET",url:"http://www.okcupid.com/profile/"+screenname+"/album/0",
    onload: function(responseDetails) {
      var oldprofilepictures=responseDetails.responseText.match(/\/images\/\d+\/\d{1,5}x\d{1,5}\/\d{1,5}x\d{1,5}\/\d{1,5}x\d{1,5}\/\d{1,5}x\d{1,5}\/0\/\d*?\.(jpg|gif|png|jpeg)/gi); 
var pic=oldprofilepictures[parseInt(GM_getValue("numberpic"))];
      var picid=pic.match(/\/(\d*?)\.(jpg|gif|png|jpeg)$/i)[1];
      GM_xmlhttpRequest({method:"GET",url:"http://www.okcupid.com/photoupload?picid="+picid+"&albumid=0&picture.delete_ajax=1"});
      SB_log(picid+" deleted.");
    }
  });
}

function gettimestamp(){
  var now = new Date();
  var hour        = now.getHours();
  var minute      = now.getMinutes();
  var second      = now.getSeconds();
  var monthnumber = now.getMonth();
  var monthday    = now.getDate();
  var year        = now.getYear();
  return hour+":"+minute+":"+second;
}

function wait(millis){
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
} 

function SB_log(str){
  GM_log(str);
  setTimeout("window.status='"+str+"'",0);
}

//auto update
var SUC_script_num = 112299; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script '+script_name+'.\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for '+script_name+'.');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}