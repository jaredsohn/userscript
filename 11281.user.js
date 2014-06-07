// ==UserScript==
// @name          Puretna Randomlurker Extra
// @description   Adds improvements to puretna website.
// @include       *.puretna.com/browse.php*
// @include       *.puretna.com/forums/posting.php*
// ==/UserScript==

function loadBrowseScripts() { 
/*---  Code used to add Check and Uncheck all radio buttons to the browse category list ---*/ 
/*--- Functionality suggested/requested by makkumatr ---*/ 
   var an_forms = document.getElementsByTagName('form')[0]; 
   if ( an_forms != null ) { 
      var table = an_forms.lastChild.previousSibling; 
      table.previousSibling.setAttribute('style', 'display:none'); 
      option_tbody = table.previousSibling.previousSibling.previousSibling.lastChild; 
      var an_newTR = document.createElement('tr'); 
      option_tbody.appendChild(an_newTR); 
      var an_newTD = document.createElement('td'); 
      an_newTR.appendChild(an_newTD); 
      an_newTD.setAttribute('colspan', '8'); 
      an_newTD.setAttribute('align', 'center'); 
      an_newTD.setAttribute('class', 'clear'); 
      an_newTD.innerHTML = '<input type="radio" id="an_all" name="an_check"'+ 
      ' />&nbsp;:Check all&nbsp;&nbsp;<input type="radio" id="an_none" name='+ 
      '"an_check" />&nbsp;:Check none'; 
      var none = document.getElementById('an_none'); 
      none.addEventListener('click', function(event) { 
         var me = document.getElementById('an_none'); 
         if (me.checked) { 
            var an_checkBox = null; 
            for (var x=1; x<32; x++) { 
               var elementName = 'c' + x; 
               if ( an_checkBox = document.getElementsByName(elementName) ) 
                  an_checkBox[0].checked=false; 
            } 
            document.getElementById('an_all').checked=false; 
         } 
      }, true); 

      var all = document.getElementById('an_all'); 
      all.addEventListener('click', function(event) { 
         var me = document.getElementById('an_all'); 
         if (me.checked) { 
            var an_checkBox = null; 
            for (var x=1; x<32; x++) { 
               var elementName = 'c' + x; 
               if ( an_checkBox = document.getElementsByName(elementName) ) 
               an_checkBox[0].checked=true; 
            } 
            document.getElementById('an_none').checked=false; 
         } 
      }, true); 
   } 

/*---  Code used to remove the seen=1 parameter from the URL of the Browse/torrent page ---*/ 
/*--- Functionality suggested/requested by  DrOnLine ---*/ 
   var point = location.href.indexOf('&seen=1'); 
   if ( point > 0 ) { 
      location.href = location.href.substring(0,point)+location.href.substring(point+7*1); 
   } else { 
      point = location.href.indexOf('seen=1&'); 
      if ( point > 0 ) { 
         location.href = location.href.substring(0,point)+location.href.substring(point+7*1); 
      } else { 
         point = location.href.indexOf('seen=1'); 
         if ( point > 0 ) 
            location.href = location.href.substring(0,point)+location.href.substring(point+6*1); 
      } 
   } 

/*---  Code used to include the "include dead torrents" setting in search requests ---*/ 
/*--- Functionality suggested/requested by  Breeze ---*/ 
   var thisSelectedIndex = document.getElementsByName('incldead')[0].selectedIndex; 
   var targetForm = document.getElementsByTagName('form')[1]; 
   if ( thisSelectedIndex != null && targetForm != null ) { 
      var select = document.createElement('select'); 
      targetForm.appendChild(select); 
      select.setAttribute('style','display:none'); 
      select.setAttribute('name','incldead'); 
      for ( var x=0;x<3;x++ ) { 
         var option = document.createElement('option'); 
         select.appendChild(option); 
         option.value=x; 
      } 
      select.selectedIndex = thisSelectedIndex; 
   } 
    
/*---  Code used to add page navagation to the top of the torrent list ---*/ 
/*--- Functionality suggested/requested by  bajskorv11 ---*/ 
   var nav_ps = document.getElementsByTagName('p'); 
   var nav_newP = null; 
   if ( nav_ps.length == 1 ) { 
      nav_newP = nav_ps[0].cloneNode(true); 
      var nav_tables = document.getElementsByTagName('table'); 
      nav_tables[11].parentNode.insertBefore( nav_newP,nav_tables[11]); 
   } 
    
/*--- Code used to set the "visited" state color for torrent title and file list links on the torrent list. ---*/ 
/*--- Functionality suggested/requested by  Breeze  ---*/ 
   var body = document.getElementsByTagName('body')[0]; 
   var style=document.createElement('style'); 
   body.appendChild(style); 
   style.setAttribute('type','text/css'); 
   /*--- Set the initial color where currently it is "color:white" and set the color after a click/visit 
      where currently it is "color:#0055A4"  If a color name such as "blue", "black", "green" etc. is 
      used, remove the # sign.  Otherwise any vaild RGB color ID, such as #FFFFFF for white to 
      #000000 for black are acceptable. ---*/ 
   /*--- The first "style" statement is for the title link and the second is for the files link. ---*/ 
   style.innerHTML = '.greaseTitleLink:link{color:white;text-decoration:none;}'+ 
      ' .greaseTitleLink:visited{color:#0055A4;}'; 
   style.innerHTML += '.greaseFileLink:link{color:white;text-decoration:underline;}'+ 
      ' .greaseFileLink:visited{color:#0055A4;}'; 
   var table=document.getElementsByTagName('tbody')[12]; 
   var tr = table.firstChild.nextSibling.nextSibling; 
   var title = tr.firstChild.nextSibling.nextSibling.nextSibling; 
   title.firstChild.setAttribute('style',''); 
   title.firstChild.className="greaseTitleLink"; 
   if ( title.firstChild.firstChild.firstChild.nextSibling != null ) 
      /*--- This color value sets the color of the (NEW) tag of the first torren listed on the torrent list 
         and follows the same rules as for the link colors above. ---*/ 
      title.firstChild.firstChild.firstChild.nextSibling.color = "#0055A4"; 
   var files = title.nextSibling; 
   files.firstChild.firstChild.className="greaseFileLink"; 
   while (tr=tr.nextSibling.nextSibling.nextSibling.nextSibling){ 
      title = tr.firstChild.nextSibling.nextSibling.nextSibling; 
      title.firstChild.setAttribute('style',''); 
      if ( title.firstChild.firstChild.firstChild.nextSibling != null ) 
         /*--- This color value sets the color of the (NEW) tag for the second and all following torrents listed on the 
            torrent list and follows the same rules as for the link colors above. ---*/ 
         title.firstChild.firstChild.firstChild.nextSibling.color = "#0055A4"; 
      title.firstChild.className="greaseTitleLink"; 
      files = title.nextSibling; 
      files.firstChild.firstChild.className="greaseFileLink"; 
   } 
} 

function loadPostEditor() { 
/*--- Functionality suggested/requested by  randomlurker  ---*/ 
   var checkBox = null; 
   if ( checkBox = document.getElementsByName('attach_sig')[0] ) 
      checkBox.checked = true; 
} 
if ( location.href.indexOf('puretna.com/browse.php') != -1 ) { 
   window.addEventListener("load", function(e) { loadBrowseScripts(); }, false); 
} else if ( location.href.indexOf('puretna.com/forums/posting.php') != -1 ) { 
   window.addEventListener("load", function(e) { loadPostEditor(); }, false);
}