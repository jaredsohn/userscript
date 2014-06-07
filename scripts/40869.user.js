// ==UserScript==
// @name           GLB Forum Toolbar shortcut [removes "Chat" and "Flex Points" buttons]
// @namespace      GLB
// @author         DDCUnderground
// @description    GLB Forum Toolbar
// @include        http://goallineblitz.com/game/*
// ==/UserScript==
// 
// 

function getElementsByClassName(classname, par){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};

function orderLinks(){
    // get the thread address
   var url = window.location.href;

   var savedAddresses = GM_getValue("favoriteAddresses", "");
   var savedTitles = GM_getValue("favoriteTitles", "");

   if(savedAddresses != ""){   

       var newwindow ='';
       newwindow=window.open('',"Sort Favorites", "width=260,height=240,scrollbars=no,resizable=yes,toolbar=no,location=no,menubar=no");
       if (!newwindow.opener) newwindow.opener = self;

       dropdownstring ='<select id="listorder" size=7 style="font-size: 12px; color: rgb(0, 0, 0); font-family: Arial; background-color: rgb(255, 255, 255);">';
       // get the saved thread addresses and titles      
       var favoriteAddresses = savedAddresses.split(",");
       var favoriteTitles = savedTitles.split(",");
       for(var favloop =0; favloop<favoriteAddresses.length; favloop++) {
           dropdownstring += '<option value ="' + favoriteAddresses[favloop] + '">' + favoriteTitles[favloop] + '</option>'
       };
       newwindow.document.write(dropdownstring + '</select>');
       var writeline = '';
       writeline = '<center><br><input type=button value="&#9650;" onclick=moveup()>'
       writeline += '<input type=button value="&#9660" onclick=movedown()></center><br><center><input type=button value="Delete" onclick=deletefav()><input type=button value="Submit" onclick=dochange()></center>'

       newwindow.document.write(writeline);

       var javaline = ''
       javaline = '<script language="JavaScript" type="text/javascript">function moveup() {var lb = document.getElementById("listorder");var selecteditem = lb.selectedIndex; arrTexts = new Array(); arrValues = new Array();for(var i=0; i<lb.length; i++)  {arrTexts[i] = lb.options[i].text; arrValues[i] = lb.options[i].value;}; if(selecteditem > 0){var holdtext = ""; var holdvalue = ""; holdtext = arrTexts[selecteditem - 1]; holdvalue = arrValues[selecteditem - 1]; arrTexts[selecteditem - 1] = arrTexts[selecteditem]; arrValues[selecteditem - 1] = arrValues[selecteditem]; arrTexts[selecteditem] = holdtext; arrValues[selecteditem] = holdvalue;for(var f=0; f<lb.length; f++) {lb.options[f].text = arrTexts[f]; lb.options[f].value = arrValues[f];}; lb.options[selecteditem-1].selected=true;};};</script>';
       
       newwindow.document.write(javaline);

       javaline = '<script language="JavaScript" type="text/javascript">function movedown() {var lb = document.getElementById("listorder");var selecteditem = lb.selectedIndex; arrTexts = new Array();arrValues = new Array();for(var i=0; i<lb.length; i++){arrTexts[i] = lb.options[i].text;arrValues[i] = lb.options[i].value;}; if(selecteditem < lb.length -1){var holdtext = ""; var holdvalue = ""; holdtext = arrTexts[selecteditem + 1]; holdvalue = arrValues[selecteditem + 1]; arrTexts[selecteditem + 1] = arrTexts[selecteditem]; arrValues[selecteditem + 1] = arrValues[selecteditem]; arrTexts[selecteditem] = holdtext; arrValues[selecteditem] = holdvalue;for(var f=0; f<lb.length; f++) {lb.options[f].text = arrTexts[f]; lb.options[f].value = arrValues[f];};lb.options[selecteditem+1].selected=true;};};</script>';
       
       newwindow.document.write(javaline);

       javaline = '<script language="JavaScript" type="text/javascript">function dochange() {var lb = document.getElementById("listorder");var strvalue = "";for(var i=0; i<lb.length; i++){opener.document.getElementById("hiddentext").value+=lb.options[i].value+","+lb.options[i].text+",";};opener.document.getElementById("hiddentext").value=opener.document.getElementById("hiddentext").value.substring(0,opener.document.getElementById("hiddentext").value.length-1);opener.document.cookie="favaddress=" + escape(opener.document.getElementById("hiddentext").value) + "; expires=15/02/2010 00:00:00";opener.document.getElementById("hiddentext").onchange();window.close();};</script>'

       newwindow.document.write(javaline);

       javaline = '<script language="JavaScript" type="text/javascript">function deletefav() {var lb = document.getElementById("listorder");var selecteditem = lb.selectedIndex; if(lb.length>1){lb.removeChild(lb[selecteditem]);};};</script>';

       newwindow.document.write(javaline);

       
   };

   
}


function addOutsideFav(){
        ctrlkey=false;
        var newaddress = prompt("Enter new favorite url:",'http://')
        newaddress = newaddress.replace(/,/g, '');

        if((newaddress.indexOf('http://') == -1) && (newaddress.indexOf('https://') == -1)) {
            alert('Invalid Address');
            return 0;
        }
        var newtitle = prompt("Enter new favorite title:",'')

        newtitle = newtitle.replace(/,/g, '');

        if (newtitle.length == 0) {
            alert('No Title Exiting Add');
            return 0;
        }

        var addlist = GM_getValue("favoriteAddresses", "");
        var titlelist = GM_getValue("favoriteTitles", "");

        var tempadd = new Array();
        var temptitle = new Array();

        if (addlist!="") {
    
            var favAddresses = addlist.split(",");
            var favTitles = titlelist.split(",");
    
            
    
            for(var i=0;i<favAddresses.length;i++) {
                    tempadd.push(favAddresses[i]);
                    temptitle.push(favTitles[i]);
            };
        };

        tempadd.push(newaddress);
        temptitle.push(newtitle);

        GM_setValue("favoriteAddresses", tempadd.join());
        GM_setValue("favoriteTitles", temptitle.join());

        window.location.reload()

}

function getForum(){
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/forum_main.pl',
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(forums) {
           //function to add cash, Contract Expiration, and player overall bar to the player content window
           var response1=forums.responseText;
           //split for cash information
           var forumsplit=response1.split('<tr class="alternating_color2 forum">');
           var dropdownstring = '<center></b></div><form class="toolbar_item" name="form1"><select onchange="if (document.form1.menu.options[document.form1.menu.selectedIndex].value.indexOf(/\game\/) > -1) {window.location=document.form1.menu.options[document.form1.menu.selectedIndex].value;} else {window.open(document.form1.menu.options[document.form1.menu.selectedIndex].value, target=/_blank/);};" name="menu" style="font-size: 10px; color: rgb(0, 0, 0); font-family: Arial; background-color: rgb(255, 255, 255);"><option disabled="true" selected="true" style=" font-weight: normal;">- Select a forum -</option>';
//           alert("(if (document.form1.menu.options[document.form1.menu.selectedIndex].value.indexOf(' + String.fromCharCode(34) + 'goallineblitz.com' + String.fromCharCode(34) + ') > -1) {window.location=document.form1.menu.options[document.form1.menu.selectedIndex].value;} else {window.open(document.form1.menu.options[document.form1.menu.selectedIndex].value, target='+ String.fromCharCode(34) + '_blank' + String.fromCharCode(34) + ');});");


           var savedAddresses = GM_getValue("favoriteAddresses", "");
           var savedTitles = GM_getValue("favoriteTitles", "");

           if(savedAddresses != ""){   

               // get the saved thread addresses and titles      
               var favoriteAddresses = savedAddresses.split(",");
               var favoriteTitles = savedTitles.split(",");
               dropdownstring += '<option disabled="true" style=" font-weight: bold;">- Favorites -</option>';
               for(var favloop =0; favloop<favoriteAddresses.length; favloop++) {
                   dropdownstring += '<option value ="' + favoriteAddresses[favloop] + '" style=" font-weight: normal;">' + favoriteTitles[favloop] + '</option>'
               }

           };

           if(showforum == 1) {
    
               dropdownstring += '<option disabled="true" style=" font-weight: bold;">- All Forums -</option>';
               for (var i=1; i<forumsplit.length;i++) {
                   var isnew = forumsplit[i].indexOf('no_new_posts.gif');
                   if (isnew>0) {
                       var optionvalue = forumsplit[i].substring(forumsplit[i].indexOf('<a href="',forumsplit[i].indexOf('<td class="title">')) + 9, forumsplit[i].indexOf('" class="',forumsplit[i].indexOf('<td class="title">')));
                       var optiontitle = forumsplit[i].substring(forumsplit[i].indexOf('class="forum_title">',forumsplit[i].indexOf('<td class="title">')) + 20, forumsplit[i].indexOf('</a>',forumsplit[i].indexOf('<td class="title">')));
                       dropdownstring = dropdownstring + '<option value ="' + optionvalue + '" style=" font-weight: normal;">'+optiontitle + '</option>';
                   }else {
                       var optionvalue = forumsplit[i].substring(forumsplit[i].indexOf('<a href="',forumsplit[i].indexOf('<td class="title">')) + 9, forumsplit[i].indexOf('" class="',forumsplit[i].indexOf('<td class="title">')));
                       var optiontitle = forumsplit[i].substring(forumsplit[i].indexOf('class="forum_title">',forumsplit[i].indexOf('<td class="title">')) + 20, forumsplit[i].indexOf('</a>',forumsplit[i].indexOf('<td class="title">')));
                       dropdownstring = dropdownstring + '<option value ="' + optionvalue + '" style=" font-weight: bold;">'+optiontitle + '</option>';
                   }
               }
           }
           if(showforum ==0 && savedAddresses=="") {
               dropdownstring += '<option disabled="true" style=" font-weight: bold;">- All Forums -</option>';
               for (var i=1; i<forumsplit.length;i++) {
				   
                   var isnew = forumsplit[i].indexOf('no_new_posts.gif');
                   if (isnew>0) {
                       var optionvalue = forumsplit[i].substring(forumsplit[i].indexOf('<a href="',forumsplit[i].indexOf('<td class="title">')) + 9, forumsplit[i].indexOf('" class="',forumsplit[i].indexOf('<td class="title">')));
                       var optiontitle = forumsplit[i].substring(forumsplit[i].indexOf('class="forum_title">',forumsplit[i].indexOf('<td class="title">')) + 20, forumsplit[i].indexOf('</a>',forumsplit[i].indexOf('<td class="title">')));
                       dropdownstring = dropdownstring + '<option value ="' + optionvalue + '" style=" font-weight: normal;">'+optiontitle + '</option>';
                   }else {
                       var optionvalue = forumsplit[i].substring(forumsplit[i].indexOf('<a href="',forumsplit[i].indexOf('<td class="title">')) + 9, forumsplit[i].indexOf('" class="',forumsplit[i].indexOf('<td class="title">')));
                       var optiontitle = forumsplit[i].substring(forumsplit[i].indexOf('class="forum_title">',forumsplit[i].indexOf('<td class="title">')) + 20, forumsplit[i].indexOf('</a>',forumsplit[i].indexOf('<td class="title">')));
                       dropdownstring = dropdownstring + '<option value ="' + optionvalue + '" style=" font-weight: bold;">'+optiontitle + '</option>';
                   }
               }
           }



           var toolbox=document.getElementById('toolbar');
           if (toolbox.innerHTML.indexOf('<a href="/game/logout.pl"')>0) {
               toolbox.innerHTML = toolbox.innerHTML.replace('<a href="/game/chat.pl" class="toolbar_item">Chat</a>','');
               toolbox.innerHTML = toolbox.innerHTML.replace('<a href="/game/flex_points.pl" class="toolbar_item">Flex Points</a>','');
               			   toolbox.innerHTML = toolbox.innerHTML.replace('<a href="http://www.blogtalkradio.com/GoalLine-Blitz-Radio" class="toolbar_item" target="_new">GLB Radio</a>','')


               var toolbarpt1 = toolbox.innerHTML.substring(0, toolbox.innerHTML.indexOf('<a href="/game/logout.pl"'));
               var toolbarpt2 = toolbox.innerHTML.substring(toolbox.innerHTML.indexOf('<a href="/game/logout.pl"'));
               toolbox.innerHTML= '<span style=" font-weight: normal;">' + toolbarpt1 + dropdownstring + '</select>\n</form></center></span>';
               if(savedAddresses != ""){   
                   if(indexInArray(favoriteAddresses, url)){
                       toolbox.innerHTML+= '<center><form class="toolbar_item" name="form2"><span class="fav2">Remove</span></form></center><form class="toolbar_item" name="form3"><span class="fav2">Edit</span></form></center>';
                   }else{
                       toolbox.innerHTML+= '<center><form class="toolbar_item" name="form2"><span class="fav2">Add Fav</span></form></center>';   
                   }
               }else{
                   toolbox.innerHTML+= '<center><form class="toolbar_item" name="form2"><span class="fav2">Add Fav</span></form></center>';   
               };


               toolbox.innerHTML+=toolbarpt2;

               var button = getElementsByClassName("fav2",document);
               if(savedAddresses != "") {
                   if(indexInArray(favoriteAddresses, url)){
                       button[0].addEventListener('click', removeFavorite, false);
                       button[1].addEventListener('click', editFavorite, false);
                   }else{
                       button[0].addEventListener('click', addFavorite, false);
                   }
               }else{
                   button[0].addEventListener('click', addFavorite, false);
               };

           }

           

      }
   })
};

function editFavorite(){
    var addlist = GM_getValue("favoriteAddresses","");
    var titlelist = GM_getValue("favoriteTitles","");

    var favAddresses = addlist.split(",");
    var favTitles = titlelist.split(",");

    for(var i=0;i<favAddresses.length;i++) {
        if(url==favAddresses[i]) {
            var oldtitle = favTitles[i];
        };
    };


    var newtitle = prompt("Enter new favorite title:",oldtitle)

    newtitle = newtitle.replace(/,/g,'')

    var tempadd = new Array();
    var temptitle = new Array();

    for(var i=0;i<favAddresses.length;i++) {
        if(url==favAddresses[i]) {
            tempadd.push(favAddresses[i]);
            temptitle.push(newtitle.substring(0,36));
        }else{
            tempadd.push(favAddresses[i]);
            temptitle.push(favTitles[i]);
        };
    };

    GM_setValue("favoriteAddresses", tempadd.join());
    GM_setValue("favoriteTitles", temptitle.join());

    window.location.reload()
}


function addFavorite(){
   var favoriteAddresses = [];
   var favoriteTitles = [];
   
   // get the thread address
   var url = window.location.href;
   var left = url.split("&");   
   var address = url;
   
   // get the thread title
   var big_head = getElementsByClassName("big_head subhead_head", document);
   if (url.indexOf('forum')>0) {
       var re = /(.+)<\/a>\s&gt;\s(.+)/;
       var matches = big_head[0].innerHTML.match(re);
       var title = matches[2];
   }else{
       var title = big_head[0].innerHTML;
       if (title.indexOf('</span>')>0) {
           title = title.substring(title.indexOf('>', title.indexOf('<span')) + 1, title.indexOf('</span>'))
       }
   }
   
   title = title.replace(/,/g, "&x;");
   
   if(address.indexOf("#") == address.length-1) address = address.replace("#", "");

   // check for saved favorites
   var savedAddresses = GM_getValue("favoriteAddresses", "");
   var savedTitles = GM_getValue("favoriteTitles", "");
   if(savedAddresses == ""){      
      // create a new list
      favoriteAddresses.push(address);
      favoriteTitles.push(title);
   }else{
      // add to the existing list
      favoriteAddresses = savedAddresses.split(",");
      favoriteTitles = savedTitles.split(",");
      if(!indexInArray(favoriteAddresses, address)){
         favoriteAddresses.push(address);
         favoriteTitles.push(title);
      }
   }
   
   GM_setValue("favoriteAddresses", favoriteAddresses.join());
   GM_setValue("favoriteTitles", favoriteTitles.join());

   window.location.reload();
};

function indexInArray(theArray, theValue){
   var arLength = theArray.length;
   for(var i=0;i<theArray.length;i++){
      if(theArray[i] == theValue) return true;
   }   
   return false;
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

function removeFavorite(){
    var addlist = GM_getValue("favoriteAddresses","");
    var titlelist = GM_getValue("favoriteTitles","");

    var favAddresses = addlist.split(",");
    var favTitles = titlelist.split(",");
    var removeitem = 0;

    var tempadd = new Array();
    var temptitle = new Array();

    for(var i=0;i<favAddresses.length;i++) {
        if(url==favAddresses[i]) {
            removeitem = i;
        }else{
            tempadd.push(favAddresses[i])
            temptitle.push(favTitles[i])
        };
    };

    GM_setValue("favoriteAddresses", tempadd.join());
    GM_setValue("favoriteTitles", temptitle.join());

    //Remove the shortcut
    //shortcut.remove("Ctrl+Z");


    window.location.reload();

};


var url = window.location.href;
var parts = url.split("=");   
var current = parts[0];

var javcookie = '';

//look for javascript cookie
if (document.cookie.length>0){
    var c_start=document.cookie.indexOf("favaddress=");
    var c_name='favaddress';
    if (c_start!=-1){ 
        c_start=c_start + c_name.length+1; 
        var c_end=document.cookie.indexOf(";",c_start);
        if (c_end==-1) c_end=document.cookie.length;
        javcookie = unescape(document.cookie.substring(c_start,c_end));
        //delete cookie
        document.cookie='favaddress=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    } 
}

//alert(javcookie);

if (javcookie!='') {
    var cookieaddress = new Array();
    var cookietitle = new Array();
    var cookiearr = javcookie.split(',')
    for (var splitloop = 0; splitloop < cookiearr.length; splitloop++) {
        //alert(splitloop +' : '+cookiearr[splitloop]);
        if(splitloop==0) {
            cookieaddress.push(cookiearr[splitloop]);
        }else{
        
            if (splitloop%2>0) {
                cookietitle.push(cookiearr[splitloop]);
            }else{
                cookieaddress.push(cookiearr[splitloop]);
            };
        };
    }
    GM_setValue("favoriteAddresses", cookieaddress.join());
    //GM_setValue("favoriteAddresses", "");
    GM_setValue("favoriteTitles", cookietitle.join());
    //GM_setValue("favoriteTitles", "");
}





var savedAddresses = GM_getValue("favoriteAddresses", "");
var savedTitles = GM_getValue("favoriteTitles", "");
if(savedAddresses > ""){      

    // add to the existing list
    favoriteAddresses = savedAddresses.split(",");
    favoriteTitles = savedTitles.split(",");

    var css = '.fav{color:blue;cursor:pointer;float:left;padding:5px;background-color:#EEE;border:1px solid #A0A0A0;}' +
        '.fav:hover {color:red;}' +
        '#popUpFavs {padding:5px;border:1px solid #A0A0A0;position:absolute;top:100px;left:200px;;background-color:#FBFBF8;width:600px;' +
        'height:100px;z-index: 9002;}' +
        'html, body {height: 100%;}' +
        'html>body #popUpFavs {height: auto;}';

    addGlobalStyle(css);
};



var ctrlkey = false;
var shiftkey = false;
var showforum = 1;

document.addEventListener("keydown",function(e) {
	if (e.keyCode==16) {
        shiftkey=true;
    };
    if (e.keyCode==17) {
        ctrlkey=true;
    };
    if (e.keyCode==89 && ctrlkey && !shiftkey) {
        addOutsideFav();
    };
    if (e.keyCode==89 && ctrlkey && shiftkey) {
        orderLinks();
    };
},true);

document.addEventListener("keyup", function(f) {
    if (f.keyCode==17) {
        ctrlkey=false;
    };
    if (f.keyCode==16) {
        shiftkey=false;
    };
    
}, true);


var subpagehidden = document.createElement("input");
subpagehidden.setAttribute("name", "hiddentextname");
subpagehidden.setAttribute("type", "text");
subpagehidden.setAttribute("id", "hiddentext")
subpagehidden.setAttribute("onchange", "window.location.reload();")
//subpagehidden.addEventListener("onchange", updatesort,false);

var insertdiv = document.getElementsByTagName('div');
insertdiv[1].appendChild(subpagehidden);

//document.getElementById("hiddentext").addEventListener("onchange", updatesort,false);
document.getElementById("hiddentext").style.visibility="hidden";


getForum();