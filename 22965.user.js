   // ==UserScript==
   // @name           iGoogle w/o Search Box
   // @namespace      MT
   // @description    iGoogle with logo and background only (based on iGoogle Trasnparency script)
   // @author         MTkavc
   // @include        http://www.google.com/ig*
   // ==/UserScript==
   
   try
  {
      // set display of left logo, search box and right-side links
      var searchFormRow = document.getElementById( 'sfrm' ).firstChild.firstChild.rows[ 0 ];
          searchFormRow.cells[ 0 ].style.MozOpacity = 0.80;
          searchFormRow.cells[ 1 ].style.MozOpacity = 0;
	    searchFormRow.cells[ 2 ].style.display = 'none';

         
       // set display of search button and lucky button
       document.getElementById( 'btnG' ).style.display = 'none';
       document.getElementById( 'btnI' ).style.display = 'none';
     
       // set opacity of search textbox
       // document.getElementById('gsea').style.MozOpacity = 0.1;
   }
  catch( e ) {}