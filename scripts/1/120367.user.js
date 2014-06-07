{\rtf1\ansi\ansicpg1252\cocoartf1038\cocoasubrtf320
{\fonttbl\f0\fnil\fcharset0 AndaleMono;}
{\colortbl;\red255\green255\blue255;\red13\green112\blue4;\red255\green255\blue255;\red161\green84\blue20;
\red252\green0\blue10;\red0\green0\blue254;}
\paperw11900\paperh16840\margl1440\margr1440\vieww24180\viewh20400\viewkind0
\deftab720
\pard\pardeftab720\sl320\ql\qnatural

\f0\fs22 \cf2 \cb3 // ==UserScript==
\fs24 \cf0 \

\fs22 \cf2 // @name           Google Pirate v2 Extended
\fs24 \cf0 \

\fs22 \cf2 // @namespace      http://userscripts.org/users/110447
\fs24 \cf0 \

\fs22 \cf2 // @description    Use Google to find free music, tv shows, movies, anime, torrents, comics, books and other files stored publicly online.
\fs24 \cf0 \

\fs22 \cf2 // @version		   2.8.4
\fs24 \cf0 \

\fs22 \cf2 // @include        http://www.google.*/webhp*
\fs24 \cf0 \

\fs22 \cf2 // @include        http://www.google.*/webhp*
\fs24 \cf0 \

\fs22 \cf2 // @include        http://www.google.*/
\fs24 \cf0 \

\fs22 \cf2 // @include        http://www.google.*/
\fs24 \cf0 \

\fs22 \cf2 // @include        http://www.google.*/search*
\fs24 \cf0 \

\fs22 \cf2 // @include        http://www.google.*/search*
\fs24 \cf0 \

\fs22 \cf2 // @include        *google.*/firefox*
\fs24 \cf0 \

\fs22 \cf2 // @include        *google.*/firefox*
\fs24 \cf0 \

\fs22 \cf2 // @exclude        *images.google*
\fs24 \cf0 \

\fs22 \cf2 // @exclude        *video.google*
\fs24 \cf0 \

\fs22 \cf2 // ==/UserScript==
\fs24 \cf0 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf4 if\cf0 ((
\fs24 document
\fs22 .
\fs24 title
\fs22 ===\cf5 'Google'\cf0 )
\fs24  
\fs22 ||
\fs24  
\fs22 (
\fs24 document
\fs22 .
\fs24 title
\fs22 ===\cf5 'Mozilla Firefox Start Page'\cf0 ))\{
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 document
\fs22 .\cf6 getElementsByName\cf0 (\cf5 'q'\cf0 )[\cf5 0\cf0 ].\cf6 focus\cf0 ();
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf4 function
\fs24 \cf0  
\fs22 \cf6 newradio\cf0 (
\fs24 nametext
\fs22 ,
\fs24  dorkvalue
\fs22 )\{
\fs24 \

\fs22 \cf4 var
\fs24 \cf0  search 
\fs22 =
\fs24  document
\fs22 .\cf6 getElementsByName\cf0 (\cf5 'f'\cf0 )[\cf5 0\cf0 ];
\fs24 \

\fs22 \cf4 var
\fs24 \cf0  sometext 
\fs22 =
\fs24  document
\fs22 .\cf6 createTextNode\cf0 (
\fs24 nametext
\fs22 );
\fs24 \

\fs22 \cf4 var
\fs24 \cf0  someradio 
\fs22 =
\fs24  document
\fs22 .\cf6 createElement\cf0 (\cf5 'input'\cf0 );
\fs24 \

\fs22 \cf4 var
\fs24 \cf0  breakup 
\fs22 =
\fs24  document
\fs22 .\cf6 createElement\cf0 (\cf5 'br'\cf0 );
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 someradio
\fs22 .\cf6 setAttribute\cf0 (\cf5 'type'\cf0 ,
\fs24  
\fs22 \cf5 'radio'\cf0 );
\fs24 \
someradio
\fs22 .\cf6 setAttribute\cf0 (\cf5 'name'\cf0 ,
\fs24  
\fs22 \cf5 'q'\cf0 );
\fs24 \
someradio
\fs22 .\cf6 setAttribute\cf0 (\cf5 'value'\cf0 ,
\fs24  dorkvalue
\fs22 );
\fs24 \
search
\fs22 .\cf6 appendChild\cf0 (
\fs24 breakup
\fs22 );
\fs24 \
search
\fs22 .\cf6 appendChild\cf0 (
\fs24 someradio
\fs22 );
\fs24 \
search
\fs22 .\cf6 appendChild\cf0 (
\fs24 sometext
\fs22 );
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf0 \}
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf6 newradio\cf0 (\cf5 'Web'\cf0 ,
\fs24  
\fs22 \cf5 ''\cf0 );
\fs24 \

\fs22 \cf6 newradio\cf0 (\cf5 'Youtube'\cf0 ,
\fs24  
\fs22 \cf5 'site:youtube.com'\cf0 );
\fs24 \

\fs22 \cf6 newradio\cf0 (\cf5 'FTP Folder'\cf0 ,
\fs24  
\fs22 \cf5 '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -xxx -shtml -opendivx -md5 -md5sums -asp'\cf0 );
\fs24 \

\fs22 \cf6 newradio\cf0 (\cf5 'RAR/Zip Archives'\cf0 ,
\fs24  
\fs22 \cf5 '(rar|zip|tar|7zip|iso|cso|gz) -torrent +intitle:"index.of"'\cf0 );
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf0 \}\cf4 else\cf0 \{
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf4 function
\fs24 \cf0  
\fs22 \cf6 newselect\cf0 (
\fs24 nametext
\fs22 ,
\fs24  dork
\fs22 )\{
\fs24 \

\fs22 \cf4 var
\fs24 \cf0  newoption 
\fs22 =
\fs24  document
\fs22 .\cf6 createElement\cf0 (\cf5 'option'\cf0 );
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 newoption
\fs22 .\cf6 setAttribute\cf0 (\cf5 'value'\cf0 ,
\fs24  dork
\fs22 );
\fs24 \
newoption
\fs22 .
\fs24 innerHTML
\fs22 =
\fs24 nametext
\fs22 ;
\fs24 \
s
\fs22 .\cf6 appendChild\cf0 (
\fs24 newoption
\fs22 );
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf0 \}
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf4 var
\fs24 \cf0  s 
\fs22 =
\fs24  document
\fs22 .\cf6 createElement\cf0 (\cf5 'select'\cf0 );
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 s
\fs22 .\cf6 setAttribute\cf0 (\cf5 'name'\cf0 ,
\fs24  
\fs22 \cf5 'q'\cf0 );
\fs24 \
s
\fs22 .\cf6 setAttribute\cf0 (\cf5 'onchange'\cf0 ,
\fs24  
\fs22 \cf5 'window.location.href=window.location.href.split("&q=")[0]+"&q="+window.location.href.split("&q=")[1].split("&")[0]+"&q="+this.value'\cf0 );
\fs24 \
document
\fs22 .\cf6 getElementById\cf0 (\cf5 'prs'\cf0 ).\cf6 appendChild\cf0 (
\fs24 s
\fs22 );
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf6 newselect\cf0 (\cf5 'Web'\cf0 ,
\fs24  
\fs22 \cf5 ''\cf0 );
\fs24 \

\fs22 \cf6 newselect\cf0 (\cf5 'Youtube'\cf0 ,
\fs24  
\fs22 \cf5 'site:youtube.com'\cf0 );
\fs24 \

\fs22 \cf6 newselect\cf0 (\cf5 'FTP Folder'\cf0 ,
\fs24  
\fs22 \cf5 '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -idftp -xxx -shtml -opendivx -md5 -md5sums -asp'\cf0 );
\fs24 \

\fs22 \cf6 newselect\cf0 (\cf5 'RAR/Zip Archives'\cf0 ,
\fs24  
\fs22 \cf5 '(rar|zip|tar|7zip|iso|cso|gz) -torrent +intitle:"index.of"'\cf0 );
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf4 if\cf0 (
\fs24 window
\fs22 .
\fs24 location
\fs22 .
\fs24 href
\fs22 .\cf6 search\cf0 (\cf5 'idftp'\cf0 )>\cf5 0\cf0 )\{
\fs24 s
\fs22 .
\fs24 options
\fs22 [\cf5 3\cf0 ].
\fs24 defaultSelected
\fs22 =\cf5 'true'\cf0 ;\}
\fs24 \

\fs22 \cf4 var
\fs24 \cf0  i 
\fs22 =
\fs24  
\fs22 \cf5 1\cf0 ;
\fs24 \

\fs22 \cf4 while
\fs24 \cf0  
\fs22 (
\fs24 i
\fs22 <
\fs24 s
\fs22 .
\fs24 options
\fs22 .
\fs24 length
\fs22 )\{
\fs24 \

\fs22 \cf4 if\cf0 (
\fs24 s
\fs22 .
\fs24 options
\fs22 [
\fs24 i
\fs22 ].
\fs24 defaultSelected
\fs22 ===\cf4 true\cf0 )\{
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 document
\fs22 .\cf6 evaluate\cf0 (
\fs24  
\fs22 \cf5 '//input[contains(@title, "Search")]'
\fs24 \cf0  
\fs22 ,
\fs24  document
\fs22 ,
\fs24  
\fs22 \cf4 null\cf0 ,
\fs24  
\fs22 \cf5 0\cf0 ,
\fs24  
\fs22 \cf4 null
\fs24 \cf0  
\fs22 ).\cf6 iterateNext\cf0 ().
\fs24 value 
\fs22 =
\fs24  window
\fs22 .
\fs24 location
\fs22 .
\fs24 href
\fs22 .\cf6 split\cf0 (\cf5 "&q="\cf0 )[\cf5 1\cf0 ].\cf6 split\cf0 (\cf5 "&"\cf0 )[\cf5 0\cf0 ];\}
\fs24 \
i
\fs22 ++;\}
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf4 var
\fs24 \cf0  p 
\fs22 =
\fs24  
\fs22 \cf5 0\cf0 ;
\fs24 \

\fs22 \cf4 var
\fs24 \cf0  qs 
\fs22 =
\fs24  document
\fs22 .\cf6 evaluate\cf0 (
\fs24  
\fs22 \cf5 '//input[contains(@title, "Search")]'
\fs24 \cf0  
\fs22 ,
\fs24  document
\fs22 ,
\fs24  
\fs22 \cf4 null\cf0 ,
\fs24  
\fs22 \cf5 0\cf0 ,
\fs24  
\fs22 \cf4 null
\fs24 \cf0  
\fs22 ).\cf6 iterateNext\cf0 ();
\fs24 \

\fs22 \cf4 var
\fs24 \cf0  newqs 
\fs22 =
\fs24  
\fs22 \cf5 ''\cf0 ;
\fs24 \

\fs22 \cf4 while\cf0 (
\fs24 p
\fs22 <
\fs24 qs
\fs22 .
\fs24 value
\fs22 .\cf6 split\cf0 (\cf5 '+'\cf0 ).
\fs24 length
\fs22 )\{
\fs24 \

\fs22 \cf4 if\cf0 (
\fs24 p
\fs22 ==
\fs24 qs
\fs22 .
\fs24 value
\fs22 .\cf6 split\cf0 (\cf5 '+'\cf0 ).
\fs24 length
\fs22 \cf5 -1\cf0 )\{
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 newqs 
\fs22 =
\fs24  newqs
\fs22 +
\fs24 qs
\fs22 .
\fs24 value
\fs22 .\cf6 split\cf0 (\cf5 '+'\cf0 )[
\fs24 p
\fs22 ];
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf0 \}\cf4 else\cf0 \{
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 newqs 
\fs22 =
\fs24  newqs
\fs22 +
\fs24 qs
\fs22 .
\fs24 value
\fs22 .\cf6 split\cf0 (\cf5 '+'\cf0 )[
\fs24 p
\fs22 ]+\cf5 ' '\cf0 ;
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf0 \}
\fs24 p
\fs22 ++;\}
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 qs
\fs22 .
\fs24 value 
\fs22 =
\fs24  newqs
\fs22 ;
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf4 var
\fs24 \cf0  ni 
\fs22 =
\fs24  document
\fs22 .\cf6 createElement\cf0 (\cf5 'input'\cf0 );
\fs24 \
\pard\pardeftab720\sl360\ql\qnatural
\cf0 ni
\fs22 .\cf6 setAttribute\cf0 (\cf5 'type'\cf0 ,
\fs24  
\fs22 \cf5 'hidden'\cf0 );
\fs24 \
ni
\fs22 .\cf6 setAttribute\cf0 (\cf5 'name'\cf0 ,
\fs24  
\fs22 \cf5 'q'\cf0 );
\fs24 \
ni
\fs22 .\cf6 setAttribute\cf0 (\cf5 'value'\cf0 ,
\fs24  s
\fs22 .
\fs24 value
\fs22 );
\fs24 \
document
\fs22 .
\fs24 forms
\fs22 [\cf5 0\cf0 ].\cf6 appendChild\cf0 (
\fs24 ni
\fs22 );
\fs24 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf0 \}
\fs24 inurl
\fs22 :
\fs24 youtube\
}