{\rtf1\ansi\ansicpg1252\cocoartf1038\cocoasubrtf350
{\fonttbl\f0\fnil\fcharset0 AndaleMono;}
{\colortbl;\red255\green255\blue255;\red42\green106\blue16;\red255\green255\blue255;\red150\green87\blue30;
\red20\green32\blue248;\red226\green35\blue27;\red228\green57\blue251;}
\margl1440\margr1440\vieww9000\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\sl320\ql\qnatural

\f0\fs22 \cf2 \cb3 // ==UserScript==
\fs24 \cf0 \

\fs22 \cf2 // @name           douchebag
\fs24 \cf0 \

\fs22 \cf2 // @namespace      GLB
\fs24 \cf0 \

\fs22 \cf2 // @include        http://goallineblitz.com/game/forum*
\fs24 \cf0 \

\fs22 \cf2 // ==/UserScript==
\fs24 \cf0 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf4 function
\fs24 \cf0  
\fs22 \cf5 getElementsByClassName\cf0 (
\fs24 classname
\fs22 ,
\fs24  par
\fs22 )\{
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0    
\fs22 \cf4 var
\fs24 \cf0  a
\fs22 =[];
\fs24 \
   
\fs22 \cf4 var
\fs24 \cf0  re 
\fs22 =
\fs24  
\fs22 \cf4 new
\fs24 \cf0  
\fs22 \cf5 RegExp\cf0 (\cf6 '\cf7 \\\\\cf6 b'
\fs24 \cf0  
\fs22 +
\fs24  classname 
\fs22 +
\fs24  
\fs22 \cf6 '\cf7 \\\\\cf6 b'\cf0 );
\fs24 \
   
\fs22 \cf4 var
\fs24 \cf0  els 
\fs22 =
\fs24  par
\fs22 .\cf5 getElementsByTagName\cf0 (\cf6 "*"\cf0 );
\fs24 \
   
\fs22 \cf4 for\cf0 (\cf4 var
\fs24 \cf0  i
\fs22 =\cf6 0\cf0 ,
\fs24 j
\fs22 =
\fs24 els
\fs22 .
\fs24 length
\fs22 ;
\fs24  i
\fs22 <
\fs24 j
\fs22 ;
\fs24  i
\fs22 ++)\{
\fs24 \
      
\fs22 \cf4 if\cf0 (
\fs24 re
\fs22 .\cf5 test\cf0 (
\fs24 els
\fs22 [
\fs24 i
\fs22 ].
\fs24 className
\fs22 ))\{
\fs24 \
         a
\fs22 .\cf5 push\cf0 (
\fs24 els
\fs22 [
\fs24 i
\fs22 ]);
\fs24 \
      
\fs22 \}
\fs24 \
   
\fs22 \}
\fs24 \
   
\fs22 \cf4 return
\fs24 \cf0  a
\fs22 ;
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf0 \};
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf4 function
\fs24 \cf0  
\fs22 \cf5 findName\cf0 (
\fs24 test
\fs22 )
\fs24  
\fs22 \{
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0     
\fs22 \cf4 if
\fs24 \cf0  
\fs22 (
\fs24 test
\fs22 .
\fs24 parentNode
\fs22 .
\fs24 parentNode
\fs22 .
\fs24 innerHTML
\fs22 .\cf5 indexOf\cf0 (\cf6 'href="/game/home.pl?user_id=345725"'\cf0 ,
\fs24  
\fs22 \cf6 0\cf0 )>=\cf6 0\cf0 )
\fs24  
\fs22 \cf4 return
\fs24 \cf0  
\fs22 \cf6 1\cf0 ;
\fs24 \
  
\fs22 \cf4 return
\fs24 \cf0  
\fs22 \cf6 0\cf0 ;
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf0 \}
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf4 var
\fs24 \cf0  els 
\fs22 =
\fs24  
\fs22 \cf5 getElementsByClassName\cf0 (\cf6 'post_content'\cf0 ,
\fs24  document
\fs22 );
\fs24 \

\fs22 \cf4 for\cf0 (\cf4 var
\fs24 \cf0  i
\fs22 =\cf6 0\cf0 ,
\fs24 j
\fs22 =
\fs24 els
\fs22 .
\fs24 length
\fs22 ;
\fs24  i
\fs22 <
\fs24 j
\fs22 ;
\fs24  i
\fs22 ++)
\fs24  
\fs22 \{
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 	
\fs22 \cf4 if
\fs24 \cf0  
\fs22 (\cf5 findName\cf0 (
\fs24 els
\fs22 [
\fs24 i
\fs22 ]))\{
\fs24 \
		els
\fs22 [
\fs24 i
\fs22 ].
\fs24 innerHTML 
\fs22 =
\fs24  
\fs22 \cf6 '0 replies'
\fs24 \cf0 \
	
\fs22 \}
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf0 \}
\fs24 \
}