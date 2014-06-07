{\rtf1\ansi\ansicpg1252\cocoartf1138\cocoasubrtf320
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;\red46\green103\blue21;\red255\green255\blue255;\red153\green86\blue33;
\red230\green37\blue30;\red0\green53\blue244;\red230\green37\blue30;\red223\green73\blue247;\red168\green51\ble187;
}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\sl320

\f0\fs22 \cf2 \cb3 // ==UserScript==
\fs26 \cf0 \

\fs22 \cf2 // @name           SH Assistant
\fs26 \cf0 \

\fs22 \cf2 // @namespace      http://www.source.site90.com/
\fs26 \cf0 \

\fs22 \cf2 // @description    Makes playing slavehack a bit easier
\fs26 \cf0 \

\fs22 \cf2 // @include        http://www.slavehack.com/index2.php*
\fs26 \cf0 \

\fs22 \cf2 // @version       1.4
\fs26 \cf0 \

\fs22 \cf2 // ==/UserScript==
\fs26 \cf0 \
\pard\pardeftab720\sl380
\cf0 \
\pard\pardeftab720\sl320

\fs22 \cf2 // Chrome users can replace localhost with something else to mask their IP with.
\fs26 \cf0 \
\pard\pardeftab720\sl320

\fs22 \cf4 var
\fs26 \cf0  IP_MASK 
\fs22 =
\fs26  
\fs22 \cf5 "121..53.24"\cf0 ;
\fs26 \
\pard\pardeftab720\sl380
\cf0 \
\pard\pardeftab720\sl320

\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 GM_registerMenuCommand
\fs22 )\{
\fs26 \
\pard\pardeftab720\sl380
\cf0     
\fs22 \cf6 GM_registerMenuCommand\cf0 (\cf5 "Change IP Mask"\cf0 ,
\fs26  changeMask
\fs22 );
\fs26 \
\pard\pardeftab720\sl320

\fs22 \cf0 \}
\fs26 \
\pard\pardeftab720\sl380
\cf0 \
\pard\pardeftab720\sl320

\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 document
\fs22 .\cf6 getElementById\cf0 (\cf5 "editlog"\cf0 ))\{
\fs26  
\fs22 \cf2 // No log file on page - nothing to do
\fs26 \cf0 \
\pard\pardeftab720\sl380
\cf0     
\fs22 \cf4 var
\fs26 \cf0  myip 
\fs22 =
\fs26  document
\fs22 .\cf6 getElementById\cf0 (\cf5 "content"\cf0 ).\cf6 getElementsByTagName\cf0 (\cf5 "h2"\cf0 )[\cf5 0\cf0 ].
\fs26 innerHTML
\fs22 .\cf6 split\cf0 (\cf5 "'"\cf0 )[\cf5 1\cf0 ];
\fs26 \
    
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 document
\fs22 .\cf6 getElementById\cf0 (\cf5 "editlog"\cf0 ).
\fs26 innerHTML
\fs22 .\cf6 match\cf0 (
\fs26 myip
\fs22 ))\{
\fs26  
\fs22 \cf2 // Log file found and contains your ip
\fs26 \cf0 \
        
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 GM_getValue
\fs22 )\{
\fs26 \
            
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 GM_getValue
\fs22 .
\fs26 toString 
\fs22 &&
\fs26  GM_getValue
\fs22 .\cf6 toString\cf0 ().\cf6 indexOf\cf0 (\cf5 "not supported"\cf0 )!=-\cf5 1\cf0 )\{
\fs26 \
                
\fs22 \cf4 var
\fs26 \cf0  mask 
\fs22 =
\fs26  IP_MASK
\fs22 ;
\fs26 \
            
\fs22 \}
\fs26 \
            
\fs22 \cf4 else\cf0 \{
\fs26 \
                
\fs22 \cf4 var
\fs26 \cf0  mask 
\fs22 =
\fs26  
\fs22 \cf6 GM_getValue\cf0 (\cf5 "mask"\cf0 ,
\fs26  
\fs22 \cf5 "\cf7 \cb1 121..53.24\cf5
\fs26 \cf0 \
        
\fs22 \cf4 var
\fs26 \cf0  listButton 
\fs22 =
\fs26  document
\fs22 .\cf6 createElement\cf0 (\cf5 "input"\cf0 );
\fs26 \
        listButton
\fs22 .
\fs26 type 
\fs22 =
\fs26  
\fs22 \cf5 "button"\cf0 ;
\fs26 \
        listButton
\fs22 .
\fs26 value 
\fs22 =
\fs26  
\fs22 \cf5 "list Addresses"\cf0 ;
\fs26 \
        listButton
\fs22 .
\fs26 id 
\fs22 =
\fs26  
\fs22 \cf5 "listButton"\cf0 ;
\fs26 \
        document
\fs22 .\cf6 getElementById\cf0 (\cf5 "editlog"\cf0 ).
\fs26 parentNode
\fs22 .\cf6 insertBefore\cf0 (
\fs26 listButton
\fs22 ,
\fs26  document
\fs22 .\cf6 getElementById\cf0 (\cf5 "editlog"\cf0 ));
\fs26 \
        document
\fs22 .\cf6 getElementById\cf0 (\cf5 "listButton"\cf0 ).\cf6 addEventListener\cf0 (\cf5 "click"\cf0 ,
\fs26  list
\fs22 ,
\fs26  
\fs22 \cf4 true\cf0 );
\fs26 \
        \
        
\fs22 \cf4 var
\fs26 \cf0  filterButton 
\fs22 =
\fs26  document
\fs22 .\cf6 createElement\cf0 (\cf5 "input"\cf0 );
\fs26 \
        filterButton
\fs22 .
\fs26 type 
\fs22 =
\fs26  
\fs22 \cf5 "button"\cf0 ;
\fs26 \
        filterButton
\fs22 .
\fs26 value 
\fs22 =
\fs26  
\fs22 \cf5 "Filter Addresses"\cf0 ;
\fs26 \
        filterButton
\fs22 .
\fs26 id 
\fs22 =
\fs26  
\fs22 \cf5 "filterButton"\cf0 ;
\fs26 \
        document
\fs22 .\cf6 getElementById\cf0 (\cf5 "editlog"\cf0 ).
\fs26 parentNode
\fs22 .\cf6 insertBefore\cf0 (
\fs26 filterButton
\fs22 ,
\fs26  document
\fs22 .\cf6 getElementById\cf0 (\cf5 "editlog"\cf0 ));
\fs26 \
        document
\fs22 .\cf6 getElementById\cf0 (\cf5 "filterButton"\cf0 ).\cf6 addEventListener\cf0 (\cf5 "click"\cf0 ,
\fs26  filter
\fs22 ,
\fs26  
\fs22 \cf4 true\cf0 );
\fs26 \
        \
    
\fs22 \}
\fs26 \
\pard\pardeftab720\sl320

\fs22 \cf0 \}
\fs26 \
\pard\pardeftab720\sl380
\cf0 \
\pard\pardeftab720\sl320

\fs22 \cf4 function
\fs26 \cf0  
\fs22 \cf6 list\cf0 ()\{
\fs26 \
\pard\pardeftab720\sl380
\cf0     
\fs22 \cf4 var
\fs26 \cf0  events 
\fs22 =
\fs26  document
\fs22 .\cf6 getElementById\cf0 (\cf5 "editlog"\cf0 ).
\fs26 innerHTML
\fs22 .\cf6 split\cf0 (\cf5 "\cf8 \\n\cf5 "\cf0 );
\fs26 \
    
\fs22 \cf4 var
\fs26 \cf0  replacement 
\fs22 =
\fs26  
\fs22 \cf5 ""\cf0 ;
\fs26 \
    
\fs22 \cf4 for
\fs26 \cf0  
\fs22 (
\fs26 i 
\fs22 =
\fs26  
\fs22 \cf5 0\cf0 ;
\fs26  i 
\fs22 <
\fs26  events
\fs22 .
\fs26 length
\fs22 ;
\fs26  i
\fs22 ++)\{
\fs26 \
        ipaddr 
\fs22 =
\fs26  events
\fs22 [
\fs26 i
\fs22 ].\cf6 match\cf0 (\cf9 /[0-9]\{1,3\}\\.[0-9]\{1,3\}\\.[0-9]\{1,3\}\\.[0-9]\{1,3\}/\cf0 )
\fs26 \
        
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 ipaddr
\fs22 )\{
\fs26 \
            replacement 
\fs22 =
\fs26  replacement 
\fs22 +
\fs26  ipaddr 
\fs22 +
\fs26  
\fs22 \cf5 "\cf8 \\n\cf5 "\cf0 ;
\fs26 \
        
\fs22 \}
\fs26 \
        document
\fs22 .\cf6 getElementById\cf0 (\cf5 "editlog"\cf0 ).
\fs26 innerHTML 
\fs22 =
\fs26  replacement
\fs22 ;
\fs26 \
    
\fs22 \}
\fs26 \
\pard\pardeftab720\sl320

\fs22 \cf0 \}
\fs26 \
\pard\pardeftab720\sl380
\cf0 \
\pard\pardeftab720\sl320

\fs22 \cf4 function
\fs26 \cf0  
\fs22 \cf6 filter\cf0 ()\{
\fs26 \
\pard\pardeftab720\sl380
\cf0     
\fs22 \cf4 var
\fs26 \cf0  events 
\fs22 =
\fs26  document
\fs22 .\cf6 getElementById\cf0 (\cf5 "editlog"\cf0 ).
\fs26 innerHTML
\fs22 .\cf6 split\cf0 (\cf5 "\cf8 \\n\cf5 "\cf0 );
\fs26 \
    
\fs22 \cf4 var
\fs26 \cf0  replacement 
\fs22 =
\fs26  
\fs22 \cf5 ""\cf0 ;
\fs26 \
    
\fs22 \cf4 for
\fs26 \cf0  
\fs22 (
\fs26 i 
\fs22 =
\fs26  
\fs22 \cf5 0\cf0 ;
\fs26  i 
\fs22 <
\fs26  events
\fs22 .
\fs26 length
\fs22 ;
\fs26  i
\fs22 ++)\{
\fs26 \
        ipaddr 
\fs22 =
\fs26  events
\fs22 [
\fs26 i
\fs22 ].\cf6 match\cf0 (\cf9 /[0-9]\{1,3\}\\.[0-9]\{1,3\}\\.[0-9]\{1,3\}\\.[0-9]\{1,3\}/\cf0 )
\fs26 \
        
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 ipaddr
\fs22 )\{
\fs26 \
            replacement 
\fs22 =
\fs26  replacement 
\fs22 +
\fs26  events
\fs22 [
\fs26 i
\fs22 ]
\fs26  
\fs22 +
\fs26  
\fs22 \cf5 "\cf8 \\n\cf5 "\cf0 ;
\fs26 \
        
\fs22 \}
\fs26 \
        document
\fs22 .\cf6 getElementById\cf0 (\cf5 "editlog"\cf0 ).
\fs26 innerHTML 
\fs22 =
\fs26  replacement
\fs22 ;
\fs26 \
    
\fs22 \}
\fs26 \
\pard\pardeftab720\sl320

\fs22 \cf0 \}
\fs26 \
\pard\pardeftab720\sl380
\cf0 \
\pard\pardeftab720\sl320

\fs22 \cf4 function
\fs26 \cf0  
\fs22 \cf6 changeMask\cf0 ()\{
\fs26 \
\pard\pardeftab720\sl380
\cf0     
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 GM_getValue
\fs22 )\{
\fs26 \
        mask 
\fs22 =
\fs26  
\fs22 \cf6 GM_getValue\cf0 (\cf5 "mask"\cf0 ,
\fs26  
\fs22 \cf5 "\cf7 \cb1 121..53.24\cf5 \cb3 "\cf0 );
\fs26 \
        newMask 
\fs22 =
\fs26  
\fs22 \cf6 prompt\cf0 (\cf5 "New IP mask:"\cf0 ,
\fs26  mask
\fs22 );
\fs26 \
        
\fs22 \cf6 GM_setValue\cf0 (\cf5 "mask"\cf0 ,
\fs26  newMask
\fs22 );
\fs26 \
    
\fs22 \}
\fs26 \
    
\fs22 \cf4 else\cf0 \{
\fs26 \
        
\fs22 \cf6 alert\cf0 (\cf5 "Upgrade your version of greasemonkey to use this feature"\cf0 );
\fs26 \
    
\fs22 \}
\fs26 \
\pard\pardeftab720\sl320

\fs22 \cf0 \}
\fs26 \
}