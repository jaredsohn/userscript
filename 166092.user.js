{\rtf1\ansi\ansicpg1252\cocoartf1187\cocoasubrtf370
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;\red15\green112\blue3;\red255\green255\blue255;\red161\green84\blue20;
\red0\green0\blue255;\red251\green0\blue7;\red251\green0\blue255;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\sl320

\f0\fs22 \cf2 \cb3 // ==UserScript==
\fs26 \cf0 \

\fs22 \cf2 // @name       View all cams on reallifecam.com
\fs26 \cf0 \

\fs22 \cf2 // @namespace  None
\fs26 \cf0 \

\fs22 \cf2 // @version    1.6.2
\fs26 \cf0 \

\fs22 \cf2 // @description  View all cams without paying
\fs26 \cf0 \

\fs22 \cf2 // @match      http://reallifecam.com/
\fs26 \cf0 \

\fs22 \cf2 // @copyright  2012+, None
\fs26 \cf0 \

\fs22 \cf2 // @downloadURL    https://userscripts.org/scripts/source/152651.user.js
\fs26 \cf0 \

\fs22 \cf2 // @updateURL      https://userscripts.org/scripts/source/152651.meta.js
\fs26 \cf0 \

\fs22 \cf2 // @require    https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
\fs26 \cf0 \

\fs22 \cf2 // ==/UserScript==
\fs26 \cf0 \
\pard\pardeftab720\sl380
\cf0 \
\pard\pardeftab720\sl320

\fs22 \cf4 var
\fs26 \cf0  clipsDiv    
\fs22 =
\fs26  
\fs22 \cf5 $\cf0 (\cf6 ".clips.low"\cf0 );
\fs26 \

\fs22 \cf4 var
\fs26 \cf0  offset      
\fs22 =
\fs26  
\fs22 \cf6 0\cf0 ;
\fs26 \

\fs22 \cf4 var
\fs26 \cf0  newHTML     
\fs22 =
\fs26  
\fs22 \cf6 ''\cf0 ;
\fs26 \
\pard\pardeftab720\sl380
\cf0 \
\pard\pardeftab720\sl320

\fs22 \cf2 // Overriding auto-refresh
\fs26 \cf0 \
\pard\pardeftab720\sl320

\fs22 \cf4 var
\fs26 \cf0  scriptCode 
\fs22 =
\fs26  
\fs22 \cf4 new
\fs26 \cf0  
\fs22 \cf5 Array\cf0 ();
\fs26 \
\pard\pardeftab720\sl380
\cf0 scriptCode
\fs22 .\cf5 push\cf0 (\cf6 'function reload_page()\{'
\fs26 \cf0  
\fs22 );
\fs26 \
scriptCode
\fs22 .\cf5 push\cf0 (\cf6 '  return false;'
\fs26 \cf0          
\fs22 );
\fs26 \
scriptCode
\fs22 .\cf5 push\cf0 (\cf6 '\}'
\fs26 \cf0                        
\fs22 );
\fs26 \
\pard\pardeftab720\sl320

\fs22 \cf4 var
\fs26 \cf0  script 
\fs22 =
\fs26  document
\fs22 .\cf5 createElement\cf0 (\cf6 'script'\cf0 );
\fs26 \
\pard\pardeftab720\sl380
\cf0 script
\fs22 .
\fs26 innerHTML 
\fs22 =
\fs26  scriptCode
\fs22 .\cf5 join\cf0 (\cf6 '\cf7 \\n\cf6 '\cf0 );
\fs26 \
scriptCode
\fs22 .
\fs26 length 
\fs22 =
\fs26  
\fs22 \cf6 0\cf0 ;
\fs26 \
document
\fs22 .\cf5 getElementsByTagName\cf0 (\cf6 'head'\cf0 )[\cf6 0\cf0 ].\cf5 appendChild\cf0 (
\fs26 script
\fs22 );
\fs26 \
\
\pard\pardeftab720\sl320

\fs22 \cf2 // function generateCamera ( offset, name )
\fs26 \cf0 \
\pard\pardeftab720\sl320

\fs22 \cf4 function
\fs26 \cf0  
\fs22 \cf5 generateCamera \cf0 (
\fs26  offset
\fs22 ,
\fs26  rooms
\fs22 ,
\fs26  room_no
\fs22 ,
\fs26  category 
\fs22 )
\fs26  
\fs22 \{
\fs26 \
\pard\pardeftab720\sl380
\cf0 \
    
\fs22 \cf4 for
\fs26 \cf0  
\fs22 (
\fs26  
\fs22 \cf4 var
\fs26 \cf0  i 
\fs22 =
\fs26  offset
\fs22 ;
\fs26  i 
\fs22 <
\fs26  offset 
\fs22 +
\fs26  rooms
\fs22 ;
\fs26  i
\fs22 ++
\fs26  
\fs22 )\{
\fs26 \
        
\fs22 \cf4 var
\fs26 \cf0  room 
\fs22 =
\fs26  
\fs22 \cf6 "["
\fs26 \cf0  
\fs22 +
\fs26  room_no 
\fs22 +
\fs26  
\fs22 \cf6 "] "\cf0 ;
\fs26 \
        
\fs22 \cf4 var
\fs26 \cf0  cam 
\fs22 =
\fs26  
\fs22 \cf6 'cam'
\fs26 \cf0  
\fs22 +
\fs26  i
\fs22 ;
\fs26 \
        
\fs22 \cf4 if
\fs26 \cf0       
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 )
\fs26 \
            room 
\fs22 +=
\fs26  
\fs22 \cf6 "Living Room"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 1
\fs26 \cf0  
\fs22 )
\fs26 \
            room 
\fs22 +=
\fs26  
\fs22 \cf6 "Kitchen"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  \
            
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 2
\fs26 \cf0  
\fs22 &&
\fs26  
\fs22 (
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 1
\fs26 \cf0  
\fs22 ||
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 3
\fs26 \cf0  
\fs22 ||
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 4
\fs26 \cf0       
\fs22 )
\fs26  
\fs22 )
\fs26 \
        
\fs22 )
\fs26 \
            room 
\fs22 +=
\fs26  
\fs22 \cf6 "Hallway"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  \
            
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 3
\fs26 \cf0  
\fs22 &&
\fs26  
\fs22 (
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 1
\fs26 \cf0  
\fs22 ||
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 3
\fs26 \cf0                      
\fs22 )
\fs26  
\fs22 )
\fs26  
\fs22 ||
\fs26 \
            
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 4
\fs26 \cf0  
\fs22 &&
\fs26  
\fs22 (
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 2
\fs26 \cf0  
\fs22 ||
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 5
\fs26 \cf0                      
\fs22 )
\fs26  
\fs22 )
\fs26  
\fs22 ||
\fs26 \
            
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 5
\fs26 \cf0  
\fs22 &&
\fs26  
\fs22 (
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 4
\fs26 \cf0  
\fs22 ||
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 5
\fs26 \cf0                      
\fs22 )
\fs26  
\fs22 )
\fs26 \
        
\fs22 )
\fs26 \
            room 
\fs22 +=
\fs26  
\fs22 \cf6 "Bedroom"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  \
            
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 4
\fs26 \cf0  
\fs22 &&
\fs26  
\fs22 (
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 1
\fs26 \cf0  
\fs22 ||
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 3
\fs26 \cf0  
\fs22 ||
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 4
\fs26 \cf0      
\fs22 )
\fs26  
\fs22 )
\fs26  
\fs22 ||
\fs26  \
            
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 3
\fs26 \cf0  
\fs22 &&
\fs26  
\fs22 (
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 2
\fs26 \cf0  
\fs22 ||
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 4
\fs26 \cf0  
\fs22 ||
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 5
\fs26 \cf0      
\fs22 )
\fs26  
\fs22 )
\fs26  
\fs22 ||
\fs26 \
            
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 2
\fs26 \cf0  
\fs22 &&
\fs26  
\fs22 (
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 2
\fs26 \cf0                                      
\fs22 )
\fs26  
\fs22 )
\fs26 \
        
\fs22 )
\fs26 \
            room 
\fs22 +=
\fs26  
\fs22 \cf6 "Bathroom"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  \
            
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 2
\fs26 \cf0  
\fs22 &&
\fs26  
\fs22 (
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 5
\fs26 \cf0  
\fs22 )
\fs26  
\fs22 )
\fs26 \
        
\fs22 )
\fs26 \
            room 
\fs22 +=
\fs26  
\fs22 \cf6 "Sex Dungeon"\cf0 ;
\fs26 \
        
\fs22 \cf2 // Overrides, as private rooms are 'encrypted'
\fs26 \cf0 \
        
\fs22 \cf4 if
\fs26 \cf0       
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 3
\fs26 \cf0  
\fs22 &&
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 1
\fs26 \cf0  
\fs22 )
\fs26 \
            cam 
\fs22 =
\fs26  
\fs22 \cf6 "cvsdfs"
\fs26 \cf0  
\fs22 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 4
\fs26 \cf0  
\fs22 &&
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 1
\fs26 \cf0  
\fs22 )
\fs26 \
            cam 
\fs22 =
\fs26  
\fs22 \cf6 "3hvngd"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 3
\fs26 \cf0  
\fs22 &&
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 2
\fs26 \cf0  
\fs22 )
\fs26 \
            cam 
\fs22 =
\fs26  
\fs22 \cf6 "dsfnrn"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 4
\fs26 \cf0  
\fs22 &&
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 2
\fs26 \cf0  
\fs22 )
\fs26 \
            cam 
\fs22 =
\fs26  
\fs22 \cf6 "5hjdfn"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 3
\fs26 \cf0  
\fs22 &&
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 3
\fs26 \cf0  
\fs22 )
\fs26 \
            cam 
\fs22 =
\fs26  
\fs22 \cf6 "erda3j"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 4
\fs26 \cf0  
\fs22 &&
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 3
\fs26 \cf0  
\fs22 )
\fs26 \
            cam 
\fs22 =
\fs26  
\fs22 \cf6 "dhv3j3"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 3
\fs26 \cf0  
\fs22 &&
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 4
\fs26 \cf0  
\fs22 )
\fs26 \
            cam 
\fs22 =
\fs26  
\fs22 \cf6 "nfgnbf"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 4
\fs26 \cf0  
\fs22 &&
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 4
\fs26 \cf0  
\fs22 )
\fs26 \
            cam 
\fs22 =
\fs26  
\fs22 \cf6 "jnsdfn"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 5
\fs26 \cf0  
\fs22 &&
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 4
\fs26 \cf0  
\fs22 )
\fs26 \
            cam 
\fs22 =
\fs26  
\fs22 \cf6 "njn43l"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 3
\fs26 \cf0  
\fs22 &&
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 5
\fs26 \cf0  
\fs22 )
\fs26 \
            cam 
\fs22 =
\fs26  
\fs22 \cf6 "asdfn3"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 4
\fs26 \cf0  
\fs22 &&
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 5
\fs26 \cf0  
\fs22 )
\fs26 \
            cam 
\fs22 =
\fs26  
\fs22 \cf6 "ren3js"\cf0 ;
\fs26 \
        
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26  i 
\fs22 ==
\fs26  offset 
\fs22 +
\fs26  
\fs22 \cf6 5
\fs26 \cf0  
\fs22 &&
\fs26  room_no 
\fs22 ==
\fs26  
\fs22 \cf6 5
\fs26 \cf0  
\fs22 )
\fs26 \
            cam 
\fs22 =
\fs26  
\fs22 \cf6 "sadfne"\cf0 ;
\fs26 \
\
        newHTML 
\fs22 =
\fs26  newHTML 
\fs22 +
\fs26  
\fs22 \cf6 '<div class="galki-vpravo menu'
\fs26 \cf0  
\fs22 +
\fs26  category 
\fs22 +
\fs26   
\fs22 \cf6 '" onclick="changeclass(\cf7 \\'\cf6 0'
\fs26 \cf0  
\fs22 +
\fs26  category 
\fs22 +
\fs26  
\fs22 \cf6 '_'
\fs26 \cf0  
\fs22 +
\fs26  i 
\fs22 +
\fs26  
\fs22 \cf6 '\cf7 \\'\cf6 );return false;" style="display: block; "> <a href="'
\fs26 \cf0  
\fs22 +
\fs26  cam 
\fs22 +
\fs26  
\fs22 \cf6 '.stream" id="0'
\fs26 \cf0  
\fs22 +
\fs26  category 
\fs22 +
\fs26  
\fs22 \cf6 '_'
\fs26 \cf0  
\fs22 +
\fs26  i 
\fs22 +
\fs26  
\fs22 \cf6 '" class=""> '
\fs26 \cf0  
\fs22 +
\fs26  room 
\fs22 +\cf6 ' </a> </div>'
\fs26 \cf0 \
    
\fs22 \}
\fs26 \
\pard\pardeftab720\sl320

\fs22 \cf0 \}
\fs26 \
\pard\pardeftab720\sl380
\cf0 \
\pard\pardeftab720\sl320

\fs22 \cf2 // Cam 1 "Lora & Max"
\fs26 \cf0 \
\pard\pardeftab720\sl320

\fs22 \cf5 generateCamera\cf0 (
\fs26  
\fs22 \cf6 6
\fs26 \cf0  
\fs22 ,
\fs26  
\fs22 \cf6 5\cf0 ,
\fs26  
\fs22 \cf6 1\cf0 ,
\fs26  
\fs22 \cf6 2\cf0 ,
\fs26  
\fs22 \cf6 "Lora & Max"
\fs26 \cf0  
\fs22 );
\fs26 \
\pard\pardeftab720\sl320

\fs22 \cf2 // Cam 2 "Maria & John"
\fs26 \cf0 \
\pard\pardeftab720\sl320

\fs22 \cf5 generateCamera\cf0 (
\fs26  
\fs22 \cf6 11\cf0 ,
\fs26  
\fs22 \cf6 5\cf0 ,
\fs26  
\fs22 \cf6 2\cf0 ,
\fs26  
\fs22 \cf6 3\cf0 ,
\fs26  
\fs22 \cf6 "Maria & John"
\fs26 \cf0  
\fs22 );
\fs26 \
\pard\pardeftab720\sl320

\fs22 \cf2 // Cam 3 "Anila & Anton"
\fs26 \cf0 \
\pard\pardeftab720\sl320

\fs22 \cf5 generateCamera\cf0 (
\fs26  
\fs22 \cf6 1
\fs26 \cf0  
\fs22 ,
\fs26  
\fs22 \cf6 5\cf0 ,
\fs26  
\fs22 \cf6 3\cf0 ,
\fs26  
\fs22 \cf6 1\cf0 ,
\fs26  
\fs22 \cf6 "Anila & Anton"
\fs26 \cf0  
\fs22 );
\fs26 \
\pard\pardeftab720\sl320

\fs22 \cf2 // Cam 4 "Kristina & Evgeni"
\fs26 \cf0 \
\pard\pardeftab720\sl320

\fs22 \cf5 generateCamera\cf0 (
\fs26  
\fs22 \cf6 16\cf0 ,
\fs26  
\fs22 \cf6 6\cf0 ,
\fs26  
\fs22 \cf6 4\cf0 ,
\fs26  
\fs22 \cf6 4\cf0 ,
\fs26  
\fs22 \cf6 "Kristina & Evgeni"
\fs26 \cf0  
\fs22 );
\fs26 \
\pard\pardeftab720\sl320

\fs22 \cf2 // Cam 5 "Nastya & Zheka"
\fs26 \cf0 \
\pard\pardeftab720\sl320

\fs22 \cf5 generateCamera\cf0 (
\fs26  
\fs22 \cf6 22\cf0 ,
\fs26  
\fs22 \cf6 6\cf0 ,
\fs26  
\fs22 \cf6 5\cf0 ,
\fs26  
\fs22 \cf6 5\cf0 ,
\fs26  
\fs22 \cf6 "Nastya & Zheka"
\fs26 \cf0  
\fs22 );
\fs26 \
\pard\pardeftab720\sl380
\cf0 \
clipsDiv
\fs22 .\cf5 html\cf0 (
\fs26 newHTML
\fs22 );
\fs26 \
}