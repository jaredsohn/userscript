 // ==UserScript==
// @name           UKChatterbox Auto Signature
// @author         Michael_R
// @include        http://www.ukchatterbox.com/mail.php?action=compose*
// ==/UserScript==

                      
                     var newElement, thisInput, queue;
                                  var e = document.getElementsByTagName('input');
                                  
                                  pathArray = window.location.pathname.split( '/' );
                              	newPathname = "";
                              	for ( i = 0; i pathArray.length; i++ ) 
                              	{
                              		newPathname += "/";
                              		newPathname += pathArray[i];
                              	}
                              	
                              	alert(pathArray[1]);