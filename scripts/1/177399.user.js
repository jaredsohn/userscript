// ==UserScript==

// @name           X's Inviter

// @namespace      X

// @description    Something I'm playing with

// @include        http://im.storm8.com/group.php*

// ==/UserScript==

var numClick = GM_getValue('autoclicknum', 0);

var codes = [ 'UT8JXF' ,

'5K4HG8' ,

'TAYBAS' ,

'VQ3WW2' ,

'8MENWB' ,

'NU5RQA' ,

'FH24SQ' ,

'C73APY' ,

'DWMKR4' ,

'QGMTUM' ,

'6Y4PUF' ,

'7ARPA8' ,

'BJG8XQ' ,

'GY4GBX' ,

'WGG5BK' ,

'CWRWJE' ,

'XXMTPN' ,

'XAJBDR' ,

'KFB59F' ,

'KWVNFH' ,

'VYESSP' ,

'3CUHYH' , 

'H6DWE8' ,

'BQMJGX' ,

'3Y9BUN' ,

'PHJR6U' , 

'3URYBV' , 

'GWS6NC' ,

'4TRU4G' ,

'S93XHW' ,

'2U57V7' ,
  
'PFJ3FG' ,
  
'B2M5AD' ,

'UR8YS4' ,

'95C3JX' ,

'DTD2U2' ,

'C88ENH' ,
  
'XXD7YU' ,
  
'EB6PP6' ,

'SVBATC' ,

'6YKPQS' ,

'B3AHCA' ,

'XVXYFU' ,

'NPGN8H' ,

'NXFVBN' ,

'BC28YK' ,

'7JCP24' ,

'S8K6P6' ,

'GYDXEQ' ,

'VUGYGU' ,

'AK2WCM' ,
  
'FY35DJ' ,

'4TRU4G' ,
  
'F3D33C' ,
  
'6HW5BC' ,
  
'MSB825' ,
  
'UXMY9E' ,
  
'PBNMU8' ,
  
'8YDEJH' ,
  
'YWVJV4' ,

'N4AHEN' ,
 
'FMADM9' ,
 
'3HT8GK' ,
 
'XJ9VNQ' ,
  
'HRY5UU' ,
  
'PH2KE2' ,

'CU6RUT' ,

'RDTRSG' ,

'4SHVED' ,

'AKB9F5' ,

'CBNTVE' ,

'G4SCTT' ,

'J394K8' ,

'BX8FKR' ,

'FM28WN' ,

'TAYBH2' ,

'TA8XWU' ,

'UK42C8' ,

'8KMJ7A' ,

'N54YU8' ,

'DVECRA' ,

'P6WPPT' ,

'M29CV8' ,

'WFRGNW' ,

'CFKACY' ,

'8XNKAP' ,

'S2ED8D' ,

'V68UXC' ,

'4EAEN6' ,

'NH4YF8' ,

'9X4KQS' ,

'7WA5W9' ,

'V3EW2K' ,

'SKWEU2' ,

'EGHU3A' ,

'N2BMNP' ,

'FBRW4F' ,

'JT8N34' , 

'JSDWRU' ,

'DAPE96' ,

'H2BGUE' ,

'BJR9G9' ,

'XG6SFP' ,

'WSF4F6' ,

'HDJSVQ' ,

'MGHKJH' ,

'835J5N' ,

'SVXA2S' ,

'T94X8X' ,

'BJ45S9' ,

'4AQ65T' ,

'BB9RXF' ,

'GURMGF' ,

'JDP2PD' ,

'BEDEXJ' ,

'2C8AHE' ,

'W52DD3' ,

'8PKVD2' ,

'UBQYPY' ,

'X5DKAQ' ,

'7WVFPV' ,

'PRA6VY' ,

'W2CF8P' ,

'W5K5C4' ,

'MNASNM' ,

'EA2B47' ,

'J9FVDY' ,

'7HS86A' ,

'XYYFBX' ,

'PFKNW3' ,

'C3R8JT' ,

'9T25GV' ,

'S3D5BN' ,

'4SFNFV' ,

'8B83UY' ,

'F6HKYR' ,

'F3D33C' ,

'3TVE3Q' ,

'R5VV9W' ,

'YU59RB' ,

'GTR4NM' ,

'X9SGW4' ,
 
'F6U8VB' ,

'KK8PYJ' ,

'XPWU4N' ,

'BF4W5Y' ,

'XXXXXX' ]





var index = parseInt(GM_getValue("index", 0));



console.log(index+ '/' +codes.length);

if (index < codes.length - 1)

{

        var f = document.forms[0];

        f.getElementsByTagName('input')[0].value = codes[index];

        f.addEventListener('submit',submitHandler,false);

}

else

{

        GM_setValue('index',codes.length-1);

        index = codes.length-1;

        if (numClick > 0)

        {

                numClick = 0;

                GM_setValue('autoclicknum', 0);

                alert("no more codes!\nBug the author with a donation and tell him you need more ;)");

        }

}



function submitHandler()

{

        var nc = parseInt(document.getElementById("acdn").value);

        if (nc > 0)

                GM_setValue('autoclicknum', nc-1);

        if (index < codes.length - 1)

                if (f.getElementsByTagName('input')[0].value == codes[index])

                        GM_setValue('index',index+1);

}

function include(arr,obj) {

        return (arr.indexOf(obj) != -1);

}



// auto-click mechanism

var wwash = document.getElementsByClassName('inviteSectionHeader')[0];

wwash.innerHTML += '<br><p style="font-size: 10px; color: #0f0; padding: 5px 0">AutoClick <input id="acdn" type="text" value="'+numClick+'" style="background: #000; color: #0f0; border: #0f0 1px solid; width: 30px"> times</p>';

wwash.style.height = 'auto';

if (numClick > 0)

        click(document.getElementsByClassName('btnInvite')[0]);



// Click by JoeSimmons

// Syntax: click(element); // String argument will grab it by id, or you can supply an element

function click(e, type) {

if(!e) {return;}

if(typeof e=='string') e=document.getElementById(e);

var evObj = document.createEvent('MouseEvents');

evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);

e.dispatchEvent(evObj);

}