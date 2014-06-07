// ==UserScript==
// @name        ITSM Use Default Mail client
// @namespace   neemspeesweetikveel
// @include     https://didataservices.service-now.com/u_request.do*
// @include     https://didataservices.service-now.com/change_request.do*
// @include     https://didataservices.service-now.com/incident.do*
// @version     1.6
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant       unsafeWindow
// @grant       GM_deleteValue 
// @grant       GM_getValue
// @grant       GM_setValue 
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function() { 
  if (typeof unsafeWindow == "undefined") { unsafeWindow = window; }
  unsafeWindow.setTimeout(Aloop,500);
  
  function Aloop () {

    function ooo(){
        detailsArr = unsafeWindow.globalContext['requester\.contact\.details'].split(','); 
        
        alert(detailsArr[0].toString()+ '\n ' + detailsArr[1].toString()+ '\n ' + detailsArr[2].toString()+ '\n ' + detailsArr[3].toString()+ '\n ' + detailsArr[4].toString()+ '\n ' + detailsArr[5].toString()+ '\n ' + detailsArr[6].toString()); 
        
    }
    
    function mc(){
       var script = window.location.pathname.replace('.do','').replace('/','');                                                                                //  Get page type, request, change or incident
       var casenr = $('#' + script + '\\.number').attr('value');
       var cclist = GM_getValue('cclist'+casenr,'');
       cclist = prompt('Do you want to define a CC list for '+casenr+'?', cclist );
       cclist = cclist.replace('didatabosprod@service-now.com','').replace(',',';').replace(' ',';').replace(';;',';');
       GM_setValue('cclist'+casenr,cclist);
       if (cclist != '') {cclist = ';'+cclist;}
//       I should update the href of the $('#email_client_open') 
       detailsArr = unsafeWindow.globalContext['requester\.contact\.details'].split(',');                                                                      //  Pull array from globalContext
       var recep  = detailsArr[6].toString();                                                                                                                  //  Get requester email
       mlt =  'mailto://' + recep + '?subject=RE: ' + casenr + ' - ' + encodeURIComponent($('#' + script + '\\.short_description').attr('value') );            //  Put the requester email address, [6] in array, in mailto:// and (SVR nr + short description) in subject
       mlt += '&body=Dear ,%0A%0A%0ABest%20regards,%0A%0AMichel';
       mlt += '&CC=didatabosprod@service-now.com'+ cclist;
       $('#email_client_open').attr('href', mlt);                                                                                                              //  Adjust the link
    }
  
    if ( typeof unsafeWindow.globalContext['requester\.contact\.details'] == "undefined" ) {                                                                   //  Loop until we can get requester email from globalContext, no longer undefined
       unsafeWindow.setTimeout(Aloop,500);
    } else {
       detailsArr = unsafeWindow.globalContext['requester\.contact\.details'].split(',');                                                                      //  Pull array from globalContext
       var script = window.location.pathname.replace('.do','').replace('/','');                                                                                //  Get page type, request, change or incident
       var casenr = $('#' + script + '\\.number').attr('value');                                                                                               //  get number of SVR ICM or CHN 
       var recep  = detailsArr[6].toString();                                                                                                                  //  Get requester email
       var cust   = detailsArr[0].toString() + ' ' +detailsArr[1].toString(); 
       if (recep == '') { alert('No requester Email ??? !!! \n\nOekandanou ??? !!!');}
       var cclist = GM_getValue('cclist'+casenr,'');                                                                                                           //  Get stored cclist
       if (cclist) { 
           if (cclist == '') { GM_setValue('cclist'+casenr,''); } else {cclist = ';'+cclist;} 
       } else { cclist = ''; }
       var mlt;
       mlt =  'mailto://' + recep + '?subject=RE: ' + casenr + ' - ' + encodeURIComponent($('#' + script + '\\.short_description').attr('value') );            //  Put the requester email address, [6] in array, in mailto:// and (SVR nr + short description) in subject
       mlt += '&body=Dear ' + cust + ',%0A%0A%0ABest%20regards,%0A%0AMichel';
       mlt += '&CC=didatabosprod@service-now.com'+ cclist;
       if($('#email_client_open').length === 0 ) { alert("email button not found ??? !!!\n\nOekandanou ??? !!!"); }                                            //  Do we see the email link?
       else {                                                                                                                                                  //  Yes we do 
         $('#email_client_open').unbind('click').attr('href', mlt).attr('onclick','');                                                                         //  Adjust the link
         if ( recep.indexOf('nomail')>0 ){                                                                                                                     //  Detect noemail and flag with red envelope
            btbg = 'red'; tit = 'Bad email address'} 
         else { 
            btbg = 'SpringGreen'; tit = 'Default mail client';}                      
         $('#email_client_open img:first-child').attr('title',tit).css('border', "solid 2px " + btbg).css('background-color', btbg);                           //  Adjust the image     
         $('#email_client_open').each( function(){
            var obj = $(this)
            obj.parent().append('<A id="mc" ><img class="i16x16" src="images/icons/edit.gifx" title="Configure CClist"></img></A>');
            obj.parent().append('<A id="ooo"><img class="i16x16" src="images/issues.gifx"     title="Out Of Office"   ></img></A>');
         });
         $("#mc").click(mc).css('border', "solid 2px " + btbg).css('background-color', btbg).css('width', '16px');
         $("#ooo").attr('href', 'mailto://' + recep + '?subject=Out Of Office&body=Dear Customer,%0A%0AI\'m out of the office.%0A%0ABest%20regards,%0A%0AMichel');
       }
       if( $('td.label_left').length === 0 ) { alert("Cant find label_left"); }
       $('A.spell_check').each( function(){
          var obj = $(this)
          obj.parent().append('<A id="swow" title="Test">SWOW</A>');
       });
       $("#swow").click(ooo).css('background-color', '#FFF').css('border', "solid 2px " + btbg);
       var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1; 
       if(is_chrome){$("a[href^='mailto:']").on("click",function() { window.top.location = $(this).prop("href"); return false;});}                             //  Helper for Chrome to make mailto href work
    } 
  }

  return 0;
});   