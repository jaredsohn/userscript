// ==UserScript==
// @name           Teamliquid - BanHAMMER
// @namespace      TL
// @description    lets you ban people client site
// @include        http://www.teamliquid.net/*
// ==/UserScript==


//skeldark aka Skeletor
//http://www.teamliquid.net/forum/viewmessage.php?topic_id=255507
 //-------MAIN SHIT------------------------------------
 
	
//-------------------------------- Add jQuery
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js	

var $main ;
(function($main){
    // include this fix to make jQuery work in Firefox 4 + Greasemonkey or Scriptish
    // mozMatchesSelector fix by Kambfhase
    if( !$main('<div>').is('div') && $main('<div>')[0].mozMatchesSelector){
        $.find.matchesSelector = function( node, expr ) {
            try {
                return node.mozMatchesSelector( expr);
            } catch(e){}
            return $main.find(expr, null, null, [node]).length > 0;
        };
    }
})( unsafeWindow.jQuery); var jQuery = unsafeWindow.jQuery, $main = jQuery;



//-------------------------------- VARS


var VERSION = "1.8";
//GLOBAL VARS
var BANICON= "http://localhostr.com/file/R0zl7ma/epzhh8pg5fcp.png";
var UNBANICON=  "http://localhostr.com/file/R0zl7ma/epzhh8pg5fcp.png"; 
var BANICONSIZE = "16px"; 
var FRIENDICON =  "http://localhostr.com/file/yw6zh3K/add.png"; 
var UNFRIENDICON =  "http://localhostr.com/file/KdLUPEP/remove.png";
var FRIENDICONSIZE = "16px";
var FRIENDCOLOR = '#007700' // BORRDER COLOR OF FRIENDS
var BANCOLOR = '#777777'// BOREDER COLOR OF BANNED
var HIDESQUOTE = true;// HIDE QUOTES FROM BANED PEOPLE
var HIDESIG = false; // HIDE ALL SIGNATRUE
var OWNCOLOR = '#BB0000'// BOREDER COLOR OF YOUR OWN POST
var NUKEBANNED = false; // remove banned people completly



var banlist = new Array();
var friendlist = new Array();
var NICKNAME ="skeldark"; // your user name
	
	
//---------HELPERS----------------------------------------
function getElementsByClassName (className){
		var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName("*");
		var results = [];

		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) {
			var elementClass = element.className;
			if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
				results.push(element);
		}
		return results;
}


  
function aaa() {
 }

//--------------------------------- DO what we here for
function active() {


    var $counter = 0 ;
    var friendcount = 0;
    var qoutenr  = 0;
    var ownpostnr = 0;
    
     var aall = getElementsByClassName("forummsginfo");
     var foruminfo  = getElementsByClassName("forummsginfo");
    $main('span[class="forummsginfo"]').each(function (i) {
        var aquote = false;
	    var $posttable = $main(this);
	    var $mastertable = $posttable.parent().parent().parent();
        var atext = aall[$counter].innerHTML; 
        var i3 = atext.search(">&nbsp;");
        var username =  atext.substring(i3+7);
        var i5 = username.indexOf("&");
        username =  username.substring(0,i5-1);    
        //CLean username
        var bad1 = username.search("<");
        var bad2;
        if (bad1 != -1)  bad2 = username.search(">");
        var temp1 = username.substring(0,bad1);
        var temp2 = username .substring(bad2);
        username = temp1+temp2;
        username.replace(/%nbsp;/g, "");   

           
        //search("&nbsp;(.*?) &nbsp;");
        var isunkown = true;
        var addtext = "";
        
        //-------------------------------------------------- BANS
        for (var j = 0 ; j < banlist.length ; j++) {
            if( username == banlist[j] ) {
            addtext = addtext + '<a><img src="'+ UNBANICON + '" style="cursor:pointer; vertical-align: middle; width: '+BANICONSIZE+'; height: '+BANICONSIZE+';" class="submessage" onclick="unban(\''+username+'\')" /></a>&nbsp;';
            $mastertable.children('tr').children('td').hide();
             $posttable.parent().parent().children('td').css('background-color',BANCOLOR);
            $posttable.parent().show();
              
            isunkown = false;
            break;
          }
        }

        //-------------------------------------------------FRIENDS
        for (var j = 0 ; j < friendlist.length ; j++) {
            if( username == friendlist[j] )  {    
            friendcount ++;    
            addtext = addtext +'<a><img id="friendanker'+friendcount +'"  src="'+ UNFRIENDICON + '" style="cursor:pointer; vertical-align: middle; width: '+FRIENDICONSIZE+'; height: '+FRIENDICONSIZE+';" class="submessage" onclick="unfriend(\''+username+'\')"/></a>';           
            $posttable.parent().parent().children('td').css('background-color',FRIENDCOLOR);
            isunkown = false;
            break;
          } 
        }
        
        
        //-------------------------------------------------OWNPOST
         if( username == NICKNAME )  { 
         ownpostnr++;             
          addtext = addtext +'<a id="ownanker'+ownpostnr +'"></a>';
            $posttable.parent().parent().children('td').css('background-color',OWNCOLOR);
            isunkown = false;
          } 

        
        //-----------------------------------------------NOTHING
        if (isunkown) {
            addtext = addtext +'<a><img src="'+ BANICON + '" style=" cursor:pointer; vertical-align: middle; width: '+BANICONSIZE+'; height: '+BANICONSIZE+';" class="submessage" onclick="ban(\''+username+'\')"/></a>&nbsp;';
           addtext = addtext + '<a><img src="'+ FRIENDICON + '"style=" cursor:pointer; vertical-align: middle; width: '+FRIENDICONSIZE+'; height: '+FRIENDICONSIZE+';" class="submessage" onclick="friend(\''+username+'\')" /></a>';
           //STRANGE BUGFIX let firefox recalculate
         $posttable.parent().parent().children('td').css('color','#000000');
        }
        
        // ADD THE ICONS
         $posttable.before(addtext);
       

         // -----------------------make term shorter by cutting month out
         var aa = $posttable.html();
         aa = aa.replace(/January/g, "01");
         aa= aa.replace(/February/g, "02");
          aa = aa.replace(/March/g, "03");
         aa= aa.replace(/April/g, "04");
         aa = aa.replace(/May/g, "05");
         aa= aa.replace(/June/g, "06");
          aa = aa.replace(/July/g, "07");
         aa= aa.replace(/August/g, "08");         
          aa = aa.replace(/September/g, "09");
         aa= aa.replace(/October/g, "10");
          aa = aa.replace(/November/g, "11");
         aa= aa.replace(/December/g, "12");           
         $posttable.html(aa);
         

        //---------------- NUKE BANNED
        if ( NUKEBANNED ){
           var aa = $posttable.html();
           if ( aa.search("/images/usericons/nuke.gif") != -1 ) {
                $mastertable.hide();
           }
        }    
         
         
         
         //Next
        $counter++;
	});
	

    
	

	
	
	
	  //------------------------------------------------HIDE SIGNATURE
	  if (HIDESIG) {  
	  //-----------------Remov  ALL SIGS
        $main('td[class="forumsig"]').each(function (i) {
            var $thesig = $main(this);
            $thesig.parent().parent().parent().parent().hide();
        });
     }
        
	//----------------------------------------Remove QUOTES from banned people        
	var pos1 = -1;
	var pos2 = -1;
	var thequote = "";
	var quotename = "";

	if (HIDESQUOTE) {
    var aall = getElementsByClassName("quote");	
    for (var i = 0; i  < aall.length; i++ ) {
        thequote = aall[i].innerHTML;
        pos1 = thequote.search(":");
        pos2 = thequote.search("wrote:");
        if (pos1 == -1) continue;
        if (pos2 == -1) continue;
        pos1 = pos1+4;
        pos2--;
        quotename = thequote.substring(pos1,pos2);      
        for (var j = 0 ; j < banlist.length ; j++) {
            if(quotename == banlist[j]  ) {
                aall[i].innerHTML = '<hr><b>TL BANHAMMER Quote from ' + quotename + ' removed!</b><hr>';
            }
         }
    }
    }
        
	//----------------------------------------MARK IS SOMEONE QUOTE YOU      
	var pos1 = -1;
	var pos2 = -1;
	var thequote = "";
	var quotename = ""; 
    var aall = getElementsByClassName("quote");	
    for (var i = 0; i  < aall.length; i++ ) {
        thequote = aall[i].innerHTML;
        pos1 = thequote.search(":");
        pos2 = thequote.search("wrote:");
        if (pos1 == -1) continue;
        if (pos2 == -1) continue;
        pos1 = pos1+4;
        pos2--;
        quotename = thequote.substring(pos1,pos2);      
        if(quotename == NICKNAME  ) {
            // MARK IT
            // make sure its top quote
            if (  aall[i].parentNode.className == "quote" ) continue;
            if (  aall[i].parentNode.parentNode.className == "quote" ) continue;
            qoutenr++;
            aall[i].innerHTML = '<div id="quoteanker' + qoutenr+ '" style="color:#770000;"  >' +aall[i].innerHTML +"</div>";
            
        }
    }
    
    var toaddtext = "";
    //-----------------OWN  TAG
	 if (ownpostnr != 0){	 
             toaddtext += ' Ownposts: ';
        for (var i = 1; i  <= ownpostnr; i++ ) {
	       toaddtext += '<a href="#ownanker' + i +'" style="color:' + OWNCOLOR +';" >' + i +'</a>&nbsp;';
	    }
    }

	//-----------------QUOTE  TAG
	 if (qoutenr != 0){	 
        toaddtext += ' Quotes: ';
        for (var i = 1; i  <= qoutenr; i++ ) {
        toaddtext += '<a href="#quoteanker' + i +'" style="color:'+ OWNCOLOR +';" >' + i +'</a>&nbsp;';
	    }
    }

	//-----------------Friend TAG
	 if (friendcount != 0){
        toaddtext += ' Friendposts: ';
        for (var i = 1; i  <= friendcount; i++ ) {
	       toaddtext += '<a href="#friendanker' + i +'" style="color:'+ FRIENDCOLOR +';" >' + i +'</a>&nbsp;';
	    }
    }
    
      $main('td[valign="bottom"][width="210"]').each(function (i) {
    $main(this).parent().parent().parent().before('<tr> <td>' +  toaddtext +'</td> </tr>');
    	});  
    
    
    
    //-----------------MARK Forum INdex ----------------------------------
     
     $main('td[class="forumindex donkerb"]').each(function (i) {
        var $knoten= $main(this);
         for (var j = 0 ; j < friendlist.length ; j++) {
             if ($knoten.html() == friendlist[j] )  { 
             
                $knoten.parent().children('td').css('background-color',FRIENDCOLOR);
            } 
        }
        for (var j = 0 ; j < banlist.length ; j++) {
             if ($knoten.html() == banlist[j] )  { 
                $knoten.parent().children('td').css('background-color',BANCOLOR);
            } 
        }
     });  
    $main('td[class="forumindex lichtb"]').each(function (i) {
        var $knoten= $main(this);
         for (var j = 0 ; j < friendlist.length ; j++) {
             if ($knoten.html() == friendlist[j] )  { 
                $knoten.parent().children('td').css('background-color',FRIENDCOLOR);
            } 
        }
        for (var j = 0 ; j < banlist.length ; j++) {
             if ($knoten.html() == banlist[j] )  { 
                $knoten.parent().children('td').css('background-color',BANCOLOR);
            } 
        }
     });  
      $main('td[class="forumindex"]').each(function (i) {
        var $knoten= $main(this);
         for (var j = 0 ; j < friendlist.length ; j++) {
             if ($knoten.html() == friendlist[j] )  { 
                $knoten.parent().children('td').css('background-color',FRIENDCOLOR);
            } 
        }
        for (var j = 0 ; j < banlist.length ; j++) {
             if ($knoten.html() == banlist[j] )  { 
                $knoten.parent().children('td').css('background-color',BANCOLOR);
            } 
        }
     });     
     
}
   
   
   
 function loadit()  {
    banlist =  new Array();
    friendlist =  new Array();
    //---------------------------------------load Bans
    if ( !window.localStorage.banlist ) window.localStorage.banlist = "";
    var wert = window.localStorage.banlist;
    banlist = wert.split(",");
    //---------------------------------------load friend
    if ( !window.localStorage.friendlist ) window.localStorage.friendlist = "";
    var wert = window.localStorage.friendlist;
    friendlist = wert.split(",");
    if (  window.localStorage.NICKNAME == null ) window.localStorage.NICKNAME = NICKNAME ; 
    if (  window.localStorage.BANICON == null ) window.localStorage.BANICON = BANICON;
    if (  window.localStorage.UNBANICON == null ) window.localStorage.UNBANICON = UNBANICON;
    if (  window.localStorage.BANICONSIZE ==null ) window.localStorage.BANICONSIZE = BANICONSIZE;
    if (  window.localStorage.FRIENDICON == null ) window.localStorage.FRIENDICON = FRIENDICON;
    if (  window.localStorage.UNFRIENDICON == null ) window.localStorage.UNFRIENDICON = UNFRIENDICON;
    if (  window.localStorage.FRIENDICONSIZE == null) window.localStorage.FRIENDICONSIZE = FRIENDICONSIZE;
    if (  window.localStorage.FRIENDCOLOR == null) window.localStorage.FRIENDCOLOR = FRIENDCOLOR;
    if (  window.localStorage.BANCOLOR == null) window.localStorage.BANCOLOR =BANCOLOR;
    if (  window.localStorage.HIDESQUOTE == null ) window.localStorage.HIDESQUOTE = HIDESQUOTE;         
    if (  window.localStorage.HIDESIG ==null) window.localStorage.HIDESIG = HIDESIG;
    if (  window.localStorage.BANCOLOR == null ) window.localStorage.BANCOLOR = BANCOLOR;
    if (  window.localStorage.OWNCOLOR == null ) window.localStorage.OWNCOLOR = OWNCOLOR;       
    if (  window.localStorage.NUKEBANNED == null ) window.localStorage.NUKEBANNED = NUKEBANNED;            
    NICKNAME = window.localStorage.NICKNAME; 
    BANICON = window.localStorage.BANICON;
    UNBANICON = window.localStorage.UNBANICON;
    BANICONSIZE = window.localStorage.BANICONSIZE;
    FRIENDICON = window.localStorage.FRIENDICON;
    UNFRIENDICON = window.localStorage.UNFRIENDICON;
    FRIENDICONSIZE = window.localStorage.FRIENDICONSIZE;
    FRIENDCOLOR = window.localStorage.FRIENDCOLOR;
    BANCOLOR = window.localStorage.BANCOLOR;
    BANCOLOR = window.localStorage.BANCOLOR;
    OWNCOLOR = window.localStorage.OWNCOLOR;       
 
    if (  window.localStorage.HIDESQUOTE == "false"  )  HIDESQUOTE  = false; 
    else  HIDESQUOTE  = true; 
    if (  window.localStorage.HIDESIG == "false"  )  HIDESIG  = false;  
    else  HIDESIG  = true; 
   if (  window.localStorage.NUKEBANNED == "false"  )  NUKEBANNED  = false;  
    else  NUKEBANNED  = true; 
  }






  //INIT -------------- LOAD THE JS INTO THE PAGE AND SET UP THE ICONS--------------------------------

    function initit() {
    // load data as cookie
   

    // Look at each post on the page
    
    
  
  var $somewhere = $main('body');
  var scripttext = '<SCRIPT TYPE="text/javascript">  ';

   scripttext += ' var  banlist ; ';
   scripttext += ' var  friendlist; '; 
  
  //HELPER
     
  scripttext += ' function removeDuplicateElement(arrayName)';
  scripttext += '  {';
  scripttext += '  var newArray=new Array();';
  scripttext += '  label:for(var i=0; i<arrayName.length;i++ )';
  scripttext += '  {  ';
   scripttext += ' for(var j=0; j<newArray.length;j++ )';
   scripttext += ' {';
   scripttext += ' if(newArray[j]==arrayName[i]) ';
   scripttext += ' continue label;';
   scripttext += ' }';
   scripttext += ' newArray[newArray.length] = arrayName[i];';
   scripttext += ' }';
  scripttext += '  return newArray;';
   scripttext += ' }';

  
  
  //LOAD SAVE------------------------------------------------------------------------------------------
  scripttext += 'function loadit()  {';
  scripttext += '  banlist =  new Array();';
  scripttext += '  friendlist =  new Array();';
  scripttext += '  var wert = window.localStorage.banlist;';
  scripttext += '  banlist = wert.split(",");';
  scripttext += '  wert = window.localStorage.friendlist;';
  scripttext += '  friendlist = wert.split(",");';
  scripttext += '}';

   
  scripttext += 'function saveit() {';
  scripttext += '  var wert = ""; ';
   scripttext += '    banlist = removeDuplicateElement(banlist);';
   scripttext += '  friendlist = removeDuplicateElement(friendlist);';
    scripttext += '  for (var j = 0 ; j < banlist.length ; j++) {';
  scripttext += '  if (banlist[j] == "") continue; ';
  scripttext += '          wert = "" + wert + banlist[j] + ",";';
  scripttext += '  }';
  scripttext += '  window.localStorage.banlist = wert;';
  scripttext += '  wert = "";   ';
  scripttext += '  for (var j = 0 ; j < friendlist.length ; j++) {';
   scripttext += '  if (friendlist[j] == "") continue; ';
  scripttext += '          wert = wert + friendlist[j]  + ","  ;';
  scripttext += '  }';
  scripttext += '  window.localStorage.friendlist = wert;';
  scripttext += ' }'; 
  

  
  
  
  //FRIEND CODE------------------------------------------------------------------------------------------
  scripttext +=' function friend(name) { ';
  scripttext +=' if ( name == "skeldark") alert ("YOU CHOOSE YOUR FRIENDS WISE..."); ';
   scripttext +=' loadit();  ';
  scripttext +=' friendlist.push(name);';
  scripttext +=' saveit();';
  scripttext +=' location.reload();    ';
  scripttext +=' }  ';

    //BAN CODE------------------------------------------------------------------------------------------
  scripttext +='  function ban(name) { ';
  scripttext +=' if ( name == "skeldark"){ alert ("YOU CAN NOT ESCAPE THE TRUTH..."); return; } ';
   scripttext +=' loadit();  ';
  scripttext +=' banlist.push(name);';
  scripttext +=' saveit();';
  scripttext +=' location.reload();    ';
  scripttext +=' }  ';

  //UNFRIEND CODE------------------------------------------------------------------------------------------
  scripttext +=' function unfriend(name) { ';
  scripttext +=' loadit(); ';
  scripttext +=' var nr = -1;  ';
  scripttext +=' for (var i = 0 ; i < friendlist.length; i++ ) { ';
  
  scripttext +=' if (friendlist[i] == name ) nr = i;  ';
  scripttext +='  }  ';
  scripttext +=' if (nr == -1) return;  ';
  scripttext +='  friendlist.splice(nr,1); ';
  scripttext +=' saveit();';
  scripttext +=' location.reload();    ';
  scripttext += '}   ';
   
  //UNBAN CODE------------------------------------------------------------------------------------------
   scripttext +=' function unban(name) { ';
  scripttext +=' loadit(); ';
  scripttext +=' var nr = -1;  ';
  scripttext +=' for (var i = 0 ; i < banlist.length; i++ ) { ';
  
  scripttext +=' if (banlist[i] == name ) nr = i;  ';
  scripttext +='  }  ';
  scripttext +=' if (nr == -1) return;  ';
  scripttext +='  banlist.splice(nr,1); ';
  scripttext +=' saveit();';
  scripttext +=' location.reload();    ';
  scripttext += '}   ';

  //ADD BAN CODE------------------------------------------------------------------------------------------
  scripttext +='function updatefriendList(namen) { ';
    scripttext +=' friendlist = namen.split(",");  ';
  scripttext +=' saveit(); ';
  scripttext +=' toggleshow(); ';
  scripttext +=' toggleshow(); ';
  scripttext += '}  ';

  //ADD  FRIEND CODE------------------------------------------------------------------------------------------
  scripttext +=' function updatebanList(namen) { ';
  scripttext +=' banlist = namen.split(",");  ';
  scripttext +=' saveit(); ';
  scripttext +=' toggleshow(); ';
  scripttext +=' toggleshow(); ';
  scripttext += '}  ';
  
  
    //ADD  OWN CODE------------------------------------------------------------------------------------------
  scripttext +=' function updateDATA(NICKNAME1,BANICON1,UNBANICON1,BANICONSIZE1,FRIENDICON1,UNFRIENDICON1,FRIENDICONSIZE1,FRIENDCOLOR1,BANCOLOR1,HIDESQUOTE1,HIDESIG1,BANCOLOR1,OWNCOLOR1,NUKEBANNED1) { ';;  
  scripttext += '    window.localStorage.NICKNAME = NICKNAME1 ; ';
  scripttext += '    window.localStorage.BANICON = BANICON1; ';
  scripttext += '    window.localStorage.UNBANICON = UNBANICON1; ';
  scripttext += '    window.localStorage.BANICONSIZE = BANICONSIZE1; ';
  scripttext += '    window.localStorage.FRIENDICON = FRIENDICON1; ';
  scripttext += '    window.localStorage.UNFRIENDICON = UNFRIENDICON1; ';
  scripttext += '    window.localStorage.FRIENDICONSIZE = FRIENDICONSIZE1; ';
  scripttext += '    window.localStorage.FRIENDCOLOR = FRIENDCOLOR1; ';
  scripttext += '    window.localStorage.BANCOLOR = BANCOLOR1;  ';
  scripttext += '    window.localStorage.BANCOLOR = BANCOLOR1; ';
  scripttext += '    window.localStorage.OWNCOLOR = OWNCOLOR1;        ';
  scripttext += ' window.localStorage.HIDESQUOTE = HIDESQUOTE1; ';
  scripttext += '    window.localStorage.HIDESIG = HIDESIG1;        ';
  scripttext += '    window.localStorage.NUKEBANNED = NUKEBANNED1;        ';
  
  scripttext +=' toggleshow(); ';
  scripttext +=' toggleshow(); ';
  scripttext += '}  ';
  
  // TOGGLE OPTION SHOW
  
  
  
  
  
  scripttext +='var is_optionvisible = false;';
  scripttext +='function toggleshow(){';
  scripttext +='  var optionGUI = document.getElementById("optionGUI");';
  scripttext +='';
  scripttext +='    if (is_optionvisible) {';
  scripttext +='        is_optionvisible = false;';
  scripttext +='        optionGUI.style.display = \'none\';';
  scripttext +='        return;';
  scripttext +='    }';
  scripttext +='    loadit();';
  scripttext +='     var scripttextEDIT="";';
  scripttext +='     var banlistgui = document.getElementById("banlistGUI");';
  scripttext +='        for (var j = 0 ; j < banlist.length ; j++) {';
  scripttext +='            scripttextEDIT = scripttextEDIT  + banlist[j] + ",";';
  scripttext +='        }';
  scripttext +='    banlistgui.value = scripttextEDIT;';
  scripttext +='    scripttextEDIT="";';
  scripttext +='    var friendlistGUI = document.getElementById("friendlistGUI");';
  scripttext +='        for (var j = 0 ; j < friendlist.length ; j++) {';
  scripttext +='            scripttextEDIT = scripttextEDIT  + friendlist[j] + ",";';
  scripttext +='        }';
  scripttext +='    friendlistGUI.innerHTML = scripttextEDIT;  ';
  scripttext +='    optionGUI.style.display = \'block\';';
  scripttext +='    is_optionvisible = true;';
 scripttext +='} ';




  $somewhere.before(scripttext);
  
  
  

  var $counter = 0 ;

  //EDIT  CODE------------------------------------------------------------------------------------------
    var scripttextEDIT= "";
    
    scripttextEDIT += '<span style="color: rgb(255, 255, 255); font-size:x-small; " >TL-BanHammer'; 
    scripttextEDIT += '<a href="http://www.teamliquid.net/forum/viewmessage.php?topic_id=255507" style="color: rgb(255, 255, 255);"> ';
    scripttextEDIT += '<img src="/images/hot.png"/ style="width:12px; heigth:12px;"></a> ';
    scripttextEDIT += '<img src="/images/usericons/banling.png"  onclick="toggleshow();" style="cursor:pointer; width:14px; heigth:14px;"/>';
    scripttextEDIT += '</span ><br>  ';
    
    var $somewhere2 = $main('span[class="topright"]');  
    $somewhere2.prepend(scripttextEDIT);
    
    
    var $somewhereelse = $main('body');
    var aw = (window.innerWidth-994-12) /2;
    scripttextEDIT ='<div id="optionGUI"  style=" display:none; background-color:#000000; padding:5px; position:fixed; top:0px; left:'+aw+'px; color:#FFFFFF; width:984px; z-index:999; font-size:small;"> ';     
    scripttextEDIT += '<span style=" float:left;  color: rgb(255, 255, 255);"><b>BanHammer & FriendMarker  '+VERSION+ '</b></span>';
    scripttextEDIT += '<div style="width:100%; color: rgb(255, 255, 255); text-align:right; v-align:right;">  ';
    scripttextEDIT += ' <span onclick="toggleshow();" style="cursor:pointer; width:14px; heigth:14px;"> <b>X </b></span>  <br> ';
    scripttextEDIT += ' </div> ';

    
    scripttextEDIT +=  '<div style="width:300px; height:300px; padding: 5px;   border: 1px solid rgb(255, 255, 255); background-color: rgb(0, 0, 0); float:left; ">  ';
    scripttextEDIT +=  '<b> Banlist </b> '+ banlist.length +' <br>  ';
    scripttextEDIT +=  '<form name="unbanform" onsubmit="return false;"  >  ';
    scripttextEDIT +=  '    <textarea name="banlistGUI" rows="15" cols="35" id="banlistGUI"> </textarea></br> ';
    scripttextEDIT += '   <input type="button" value=" Update " onclick="updatebanList(banlistGUI.value);"> </br>  ';;
    scripttextEDIT += ' </form></div> ';
    
    scripttextEDIT +=  '<div  style="width:300px;  height:300px;  padding: 5px;  border: 1px solid rgb(255, 255, 255); background-color: rgb(0, 0, 0);  float:left; ">  ';
    scripttextEDIT += ' <b> Friendlist </b>'+ friendlist.length +'<br> ';
    scripttextEDIT += '<form name="friendform" onsubmit="return false;"  >   ';
    scripttextEDIT +=  '   <textarea name="friendlistGUI" rows="15" cols="35" id="friendlistGUI"> </textarea></br> ';
    scripttextEDIT += '    <input type="button" value=" Update " onclick="updatefriendList(friendlistGUI.value);"> </br>  ';
    scripttextEDIT += '</form> </div>  ';
    scripttextEDIT +=  '<div  style="width:300px;  height:300px; padding: 5px;  border: 1px solid rgb(255, 255, 255); background-color: rgb(0, 0, 0); float:left; "> ';
    scripttextEDIT +=  ' <b> Options </b><br> ';
    scripttextEDIT += '<form name="ownforum" onsubmit="return false;"  >   ';
    scripttextEDIT +=  '   Nickname: <input name="NICKNAME1GUI" type="text" size="20" maxlength="90" value="' +  NICKNAME  +'"><br>';
        scripttextEDIT +=  '   OwnColor: <input name="OWNCOLOR1GUI" type="text" size="20" maxlength="90" value="' +  OWNCOLOR  +'"><br><hr>';
    scripttextEDIT +=  '   Banicon: <input name="BANICON1GUI" type="text" size="20" maxlength="90" value="' +  BANICON  +'"><br>';
    scripttextEDIT +=  '   Unbanicon: <input name="UNBANICON1GUI" type="text" size="20" maxlength="90" value="' +  UNBANICON  +'"><br>';    
    scripttextEDIT +=  '   Baniconsize: <input name="BANICONSIZE1GUI" type="text" size="20" maxlength="90" value="' +  BANICONSIZE  +'"><br>';
    scripttextEDIT +=  '   Banclolor: <input name="BANCOLOR1GUI" type="text" size="20" maxlength="90" value="' +  BANCOLOR  +'"><br><hr>';  
    scripttextEDIT +=  '   Friendicon: <input name="FRIENDICON1GUI" type="text" size="20" maxlength="90" value="' +  FRIENDICON  +'"><br>';
    scripttextEDIT +=  '   Unfriendicon: <input name="UNFRIENDICON1GUI" type="text" size="20" maxlength="90" value="' +  UNFRIENDICON  +'"><br>';        
    scripttextEDIT +=  '   Friendiconsize: <input name="FRIENDICONSIZE1GUI" type="text" size="20" maxlength="90" value="' +  FRIENDICONSIZE  +'"><br>';
    scripttextEDIT +=  '   Friendcolor: <input name="FRIENDCOLOR1GUI" type="text" size="20" maxlength="90" value="' +  FRIENDCOLOR  +'"><br><hr>';
     


   var  t1 ="";
   var  t2  ="";
      var  t3  ="";
   if ( HIDESQUOTE) t1 =' checked="checked"';
   if ( HIDESIG) t2 =' checked="checked"'; 
    if ( NUKEBANNED) t3 =' checked="checked"';  
   
   scripttextEDIT +=  '   Hide BanQuotes:   <input type="checkbox" name="HIDESQUOTE1GUI" ' +     t1      +'> ';
   scripttextEDIT +=  '   Hide Signatures:  <input type="checkbox" name="HIDESIG1GUI" ' +     t2      +'></br> ';
    scripttextEDIT +=  ' Nuke TL-Banned People:  <input type="checkbox" name="NUKEBANNED1GUI" ' +     t3      +'>   ';
    scripttextEDIT += '    <input type="button" value=" Update " onclick="updateDATA(NICKNAME1GUI.value,BANICON1GUI.value,UNBANICON1GUI.value,BANICONSIZE1GUI.value,FRIENDICON1GUI.value,UNFRIENDICON1GUI.value,FRIENDICONSIZE1GUI.value,FRIENDCOLOR1GUI.value,BANCOLOR1GUI.value,HIDESQUOTE1GUI.checked,HIDESIG1GUI.checked,BANCOLOR1GUI.value,OWNCOLOR1GUI.value,NUKEBANNED1GUI.checked) ;"> </br>  ';
    scripttextEDIT += '</form> </div>  ';
    scripttextEDIT += ' </div>  ';
    scripttextEDIT += '</div>   ';
    $somewhereelse.prepend(scripttextEDIT);
}





function main() {
    loadit();
    initit();
    active();
}



// shutdown tl
//	$main('body').hide();



main();
