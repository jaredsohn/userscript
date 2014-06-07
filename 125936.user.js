// ==UserScript==
// @name           @document-start Example
// @version        0.0.2
// @namespace      example@dindog.com
// @include        http://*
// @run-at         document-start
// ==/UserScript==

var changed = 2; // How many scripts need to be edited with

window.addEventListener('beforescriptexecute', function(e) {

    ///for external script:
	src = e.target.src;
	if (src.search(/bad\.js/) != -1) {
                changed--;
		e.preventDefault();
		e.stopPropagation();
		append(NewScript1);
                   // append a sauced incline script to take the original script place.
	};

    ///for inline script:
        if(e.target===document.getElementsByTagName("script")[0]){
                     // 0 is just an arbitrary number I took for example, change it to fit the situation. 
            changed--;
            e.stopPropagation();
            e.preventDefault();
            // the original script has been prevent from running
            // so you can add code you want to run here
        }
        //tips: you could also run a regex search for the e.target.innerHTML
        //if the position of the inline script is not fixed.


    /// when meet the preset count, job is done, remove the listener:
	if(changed == 0) window.removeEventListener(e.type, arguments.callee, true);

}, true);



    ////// append with new block function:
              function append(s) {	 
                    document.head.appendChild(document.createElement('script'))
                          .innerHTML = s.toString().replace(/^function.*{|}$/g, '');
           }

    ////////////////////////////////////////////////
              function NewScript1(){
                        /* insert new block here, like:  */
                          function load_good_stuff(){
                              /* we still got it!! 
                               * only without the evil thing. 
                               */
                          }
               };