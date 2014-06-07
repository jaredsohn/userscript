{\rtf1\ansi\ansicpg1252\cocoartf1038\cocoasubrtf360
{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;\red49\green104\blue19;\red255\green255\blue255;\red148\green86\blue31;
\red0\green48\blue246;\red220\green38\blue27;}
\paperw11900\paperh16840\margl1440\margr1440\vieww17660\viewh11880\viewkind0
\deftab720
\pard\pardeftab720\sl320\ql\qnatural

\f0\fs22 \cf2 \cb3 // ==UserScript==
\fs26 \cf0 \

\fs22 \cf2 // @name		YouTube HQ + 720p [7 March 2009] [NEW: Resize Youtube for 720p!!!] [+force low quality option]
\fs26 \cf0 \

\fs22 \cf2 // @description		Makes ALL your YouTube videos go to HQ automatically. Configurable: Resize youtube to fit 720p, force low quality
\fs26 \cf0 \

\fs22 \cf2 // @include	   	http://*youtube.com/watch?*
\fs26 \cf0 \

\fs22 \cf2 // @version	   	1.2
\fs26 \cf0 \

\fs22 \cf2 // ==/UserScript==
\fs26 \cf0 \
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf4 function
\fs26 \cf0  
\fs22 \cf5 ytHQ\cf0 ()
\fs26  
\fs22 \{
\fs26 	\
\pard\pardeftab720\sl380\ql\qnatural
\cf0 	
\fs22 \cf2 /* CONFIG: */
\fs26 \cf0 \
	
\fs22 \cf4 var
\fs26 \cf0  forceLowQuality
\fs22 =\cf4 true\cf0 ;
\fs26 		
\fs22 \cf2 // <-- Should we force low quality playback?
\fs26 \cf0 \
	
\fs22 \cf4 var
\fs26 \cf0  resize720p
\fs22 =\cf4 false\cf0 ;
\fs26 			
\fs22 \cf2 // <-- Resize youtube for real 720p playback? Only works if video has 720p mode
\fs26 \cf0 \
	
\fs22 \cf4 var
\fs26 \cf0  useHD
\fs22 =\cf4 false\cf0 ;
\fs26 				
\fs22 \cf2 // <-- Should we use HD when available?
\fs26 \cf0 \
	
\fs22 \cf2 /* END OF CONFIG */
\fs26 \cf0 \
\
	
\fs22 \cf2 /* DO NOT EDIT BELOW THIS LINE!!!!!! (Unless you know javascript ofcourse :)) */
\fs26 \cf0 \
	
\fs22 \cf4 var
\fs26 \cf0  map
\fs22 =
\fs26 swfArgs
\fs22 .
\fs26 fmt_map
\fs22 ;
\fs26 \
	
\fs22 \cf4 var
\fs26 \cf0  fmts
\fs22 =\cf4 new
\fs26 \cf0  
\fs22 \cf5 Array\cf0 (\cf6 18\cf0 ,\cf6 22\cf0 ,\cf6 35\cf0 );
\fs26 			  
\fs22 \cf2 // a list of the highest YouTube format
\fs26 \cf0 \
	
\fs22 \cf4 var
\fs26 \cf0  fmt
\fs22 ;
\fs26 \
	
\fs22 \cf4 var
\fs26 \cf0  toLoad
\fs22 =\cf6 18\cf0 ;
\fs26 \
	
\fs22 \cf4 var
\fs26 \cf0  i
\fs22 =\cf6 0\cf0 ;
\fs26 \
	
\fs22 \cf4 var
\fs26 \cf0  fmtmap
\fs22 =\cf4 true\cf0 ;
\fs26 \
	
\fs22 \cf4 var
\fs26 \cf0  urlfmt
\fs22 =\cf6 0\cf0 ;
\fs26 \
	
\fs22 \cf4 var
\fs26 \cf0  fullURL 
\fs22 =
\fs26  parent
\fs22 .
\fs26 document
\fs22 .
\fs26 URL
\fs22 ;
\fs26 \
	
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 fullURL
\fs22 .\cf5 indexOf\cf0 (\cf6 'fmt='\cf0 )
\fs26  
\fs22 !=
\fs26  
\fs22 -\cf6 1\cf0 )
\fs26  
\fs22 \{
\fs26 \
		
\fs22 \cf4 var
\fs26 \cf0  urlfmt 
\fs22 =
\fs26  fullURL
\fs22 .\cf5 split\cf0 (\cf6 "&fmt="\cf0 )[\cf6 1\cf0 ].\cf5 split\cf0 (\cf6 "&"\cf0 )[\cf6 0\cf0 ];
\fs26  
\fs22 \cf2 // Thanks to JoeSimmons ;)
\fs26 \cf0 \
		
\fs22 \cf2 //var urlfmt = fullURL.substring(fullURL.indexOf('fmt=')+4, fullURL.indexOf('fmt=')+6);
\fs26 \cf0 \
	
\fs22 \}
\fs26 \
	resizeToHD 
\fs22 =
\fs26  
\fs22 \cf4 function\cf0 ()
\fs26  
\fs22 \{
\fs26  
\fs22 \cf2 // Resize youtube to fit the 720p sized movie player
\fs26 \cf0 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "baseDiv"\cf0 ).
\fs26 style
\fs22 .
\fs26 width 
\fs22 =
\fs26  
\fs22 \cf6 "1300px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "masthead"\cf0 ).
\fs26 style
\fs22 .
\fs26 width 
\fs22 =
\fs26  
\fs22 \cf6 "1300px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-player-div"\cf0 ).
\fs26 style
\fs22 .
\fs26 padding 
\fs22 =
\fs26  
\fs22 \cf6 "0px 0px 0px 10px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-this-vid"\cf0 ).
\fs26 style
\fs22 .
\fs26 height 
\fs22 =
\fs26  
\fs22 \cf6 "748px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-this-vid"\cf0 ).
\fs26 style
\fs22 .
\fs26 width 
\fs22 =
\fs26  
\fs22 \cf6 "1280px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-player-div"\cf0 ).
\fs26 style
\fs22 .
\fs26 height 
\fs22 =
\fs26  
\fs22 \cf6 "748px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-player-div"\cf0 ).
\fs26 style
\fs22 .
\fs26 width 
\fs22 =
\fs26  
\fs22 \cf6 "1280px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-this-vid-info"\cf0 ).
\fs26 style
\fs22 .
\fs26 width 
\fs22 =
\fs26  
\fs22 \cf6 "800px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-this-vid-info"\cf0 ).
\fs26 style
\fs22 .
\fs26 marginTop 
\fs22 =
\fs26  
\fs22 \cf6 "10px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-other-vids"\cf0 ).
\fs26 style
\fs22 .
\fs26 width 
\fs22 =
\fs26  
\fs22 \cf6 "450px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-other-vids"\cf0 ).
\fs26 style
\fs22 .
\fs26 marginTop 
\fs22 =
\fs26  
\fs22 \cf6 "30px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "movie_player"\cf0 ).
\fs26 style
\fs22 .
\fs26 height 
\fs22 =
\fs26  
\fs22 \cf6 "748px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "movie_player"\cf0 ).
\fs26 style
\fs22 .
\fs26 width 
\fs22 =
\fs26  
\fs22 \cf6 "1280px"\cf0 ;
\fs26 \
		window
\fs22 .\cf5 scrollBy\cf0 (\cf6 0\cf0 ,
\fs26  
\fs22 -\cf6 2000\cf0 );
\fs26 \
		window
\fs22 .\cf5 scrollBy\cf0 (\cf6 0\cf0 ,
\fs26  
\fs22 \cf6 88\cf0 );
\fs26 \
	
\fs22 \};
\fs26 \
\
	resizeToNormal 
\fs22 =
\fs26  
\fs22 \cf4 function\cf0 ()
\fs26  
\fs22 \{
\fs26  
\fs22 \cf2 // Resize youtube back to normal style
\fs26 \cf0 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "baseDiv"\cf0 ).
\fs26 style
\fs22 .
\fs26 width 
\fs22 =
\fs26  
\fs22 \cf6 "960px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "masthead"\cf0 ).
\fs26 style
\fs22 .
\fs26 width 
\fs22 =
\fs26  
\fs22 \cf6 "960px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-player-div"\cf0 ).
\fs26 style
\fs22 .
\fs26 padding 
\fs22 =
\fs26  
\fs22 \cf6 "0px 0px 0px 0px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-this-vid"\cf0 ).
\fs26 style
\fs22 .
\fs26 height 
\fs22 =
\fs26  
\fs22 \cf6 "385px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-this-vid"\cf0 ).
\fs26 style
\fs22 .
\fs26 width 
\fs22 =
\fs26  
\fs22 \cf6 "640px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-player-div"\cf0 ).
\fs26 style
\fs22 .
\fs26 height 
\fs22 =
\fs26  
\fs22 \cf6 "385px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-player-div"\cf0 ).
\fs26 style
\fs22 .
\fs26 width 
\fs22 =
\fs26  
\fs22 \cf6 "640px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-this-vid-info"\cf0 ).
\fs26 style
\fs22 .
\fs26 width 
\fs22 =
\fs26  
\fs22 \cf6 "640px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-this-vid-info"\cf0 ).
\fs26 style
\fs22 .
\fs26 marginTop 
\fs22 =
\fs26  
\fs22 \cf6 "0px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-other-vids"\cf0 ).
\fs26 style
\fs22 .
\fs26 width 
\fs22 =
\fs26  
\fs22 \cf6 "300px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "watch-other-vids"\cf0 ).
\fs26 style
\fs22 .
\fs26 marginTop 
\fs22 =
\fs26  
\fs22 \cf6 "0px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "movie_player"\cf0 ).
\fs26 style
\fs22 .
\fs26 height 
\fs22 =
\fs26  
\fs22 \cf6 "385px"\cf0 ;
\fs26 \
		document
\fs22 .\cf5 getElementById\cf0 (\cf6 "movie_player"\cf0 ).
\fs26 style
\fs22 .
\fs26 width 
\fs22 =
\fs26  
\fs22 \cf6 "640px"\cf0 ;
\fs26 \
	
\fs22 \};
\fs26 	\
	resizePlayer 
\fs22 =
\fs26  
\fs22 \cf4 function
\fs26 \cf0  
\fs22 (
\fs26 vq
\fs22 )
\fs26  
\fs22 \{
\fs26 						\
		
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 vq 
\fs22 ==
\fs26  yt
\fs22 .
\fs26 VideoQualityConstants
\fs22 .
\fs26 HIGH
\fs22 )
\fs26  
\fs22 \{
\fs26 \
			
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 isHDAvailable 
\fs22 &&
\fs26  resize720p
\fs22 )
\fs26  
\fs22 \{
\fs26 \
				
\fs22 \cf5 resizeToHD\cf0 ();
\fs26 \
			
\fs22 \}
\fs26 			\
		
\fs22 \}
\fs26 \
		
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \{
\fs26 \
			
\fs22 \cf5 resizeToNormal\cf0 ();
\fs26 \
		
\fs22 \}
\fs26 \
	
\fs22 \}
\fs26 \
	\
	
\fs22 \cf4 while\cf0 (
\fs26 fmt
\fs22 =
\fs26 fmts
\fs22 [
\fs26 i
\fs22 ++])
\fs26  
\fs22 \{
\fs26 	
\fs22 \cf2 // check available formats		
\fs26 \cf0 \
		
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 urlfmt 
\fs22 ==
\fs26  fmt 
\fs22 &&
\fs26  
\fs22 !
\fs26 forceLowQuality
\fs22 )
\fs26  
\fs22 \{
\fs26 \
			useHD 
\fs22 =
\fs26  
\fs22 \cf4 true\cf0 ;
\fs26 \
			
\fs22 \cf4 var
\fs26 \cf0  alreadyloaded 
\fs22 =
\fs26  
\fs22 \cf4 true\cf0 ;
\fs26 \
		
\fs22 \}
\fs26 \
\
		
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 fmt
\fs22 ==\cf6 22
\fs26 \cf0  
\fs22 &&
\fs26  
\fs22 !
\fs26 useHD
\fs22 )
\fs26  
\fs22 \cf4 continue\cf0 ;
\fs26 	 
\fs22 \cf2 // and seek out the best one
\fs26 \cf0 \
		
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 swfArgs
\fs22 .
\fs26 fmt_map
\fs22 .\cf5 substring\cf0 (\cf6 0\cf0 ,\cf6 2\cf0 )
\fs26  
\fs22 ==
\fs26  fmt 
\fs22 &&
\fs26  fmt 
\fs22 !=
\fs26  
\fs22 \cf6 18\cf0 )
\fs26  
\fs22 \{
\fs26 \
			
\fs22 \cf4 var
\fs26 \cf0  fmtmap 
\fs22 =
\fs26  
\fs22 \cf4 false\cf0 ;
\fs26 \
		
\fs22 \}
\fs26 \
		
\fs22 \cf4 if\cf0 (\cf4 new
\fs26 \cf0  
\fs22 \cf5 RegExp\cf0 (
\fs26 fmt
\fs22 +\cf6 "/"\cf0 ).\cf5 test\cf0 (
\fs26 map
\fs22 ))
\fs26  
\fs22 \{
\fs26   
\fs22 \cf2 // if it's available
\fs26 \cf0 \
			toLoad
\fs22 =
\fs26 fmt
\fs22 ;
\fs26 \
			
\fs22 \cf4 break\cf0 ;
\fs26 \
		
\fs22 \}
\fs26 \
\
	
\fs22 \}
\fs26 	\
	
\fs22 \cf5 setTimeout\cf0 (\cf6 '_gel("movie_player").addEventListener("onPlaybackQualityChange", "resizePlayer");'\cf0 ,
\fs26  
\fs22 \cf6 950\cf0 );
\fs26 \
	
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 forceLowQuality
\fs22 )
\fs26  
\fs22 \{
\fs26 \
		swfArgs
\fs22 .
\fs26 vq 
\fs22 =
\fs26  
\fs22 \cf6 '1'\cf0 ;
\fs26 \
		fo 
\fs22 =
\fs26  
\fs22 \cf5 writeMoviePlayer\cf0 (\cf6 "watch-player-div"\cf0 );
\fs26 		\
	
\fs22 \}
\fs26 \
	
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (
\fs26 fmtmap
\fs22 )
\fs26  
\fs22 \{
\fs26 \
		swfArgs
\fs22 .
\fs26 vq 
\fs22 =
\fs26  
\fs22 \cf6 '2'\cf0 ;
\fs26 \
		isHDAvailable 
\fs22 =
\fs26  
\fs22 \cf4 false\cf0 ;
\fs26 \
		swfArgs
\fs22 .
\fs26 fmt_map 
\fs22 =
\fs26  
\fs22 \cf6 '18/512000/9/0/115'\cf0 ;
\fs26 \
		fo 
\fs22 =
\fs26  
\fs22 \cf5 writeMoviePlayer\cf0 (\cf6 "watch-player-div"\cf0 );
\fs26 \
	
\fs22 \}
\fs26 \
	
\fs22 \cf4 else
\fs26 \cf0  
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (!
\fs26 fmtmap
\fs22 )
\fs26  
\fs22 \{
\fs26 		\
		
\fs22 \cf4 if
\fs26 \cf0  
\fs22 (!
\fs26 alreadyloaded
\fs22 )
\fs26  
\fs22 \{
\fs26 \
			
\fs22 \cf5 setTimeout\cf0 (\cf6 '_gel("movie_player").setPlaybackQuality(yt.VideoQualityConstants.HIGH);'\cf0 ,
\fs26  
\fs22 \cf6 1000\cf0 );
\fs26 \
		
\fs22 \}
\fs26 \
\
	
\fs22 \}
\fs26 \
\
\pard\pardeftab720\sl320\ql\qnatural

\fs22 \cf0 \}
\fs26 \
\pard\pardeftab720\sl380\ql\qnatural
\cf0 document
\fs22 .
\fs26 body
\fs22 .\cf5 appendChild\cf0 (
\fs26 document
\fs22 .\cf5 createElement\cf0 (\cf6 "script"\cf0 )).
\fs26 innerHTML
\fs22 =\cf6 "("
\fs26 \cf0  
\fs22 +
\fs26  ytHQ 
\fs22 +
\fs26  
\fs22 \cf6 ")()"\cf0 ;
\fs26 \
}