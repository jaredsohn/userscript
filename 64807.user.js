// ==UserScript==
// @name            Blueprint Delete File confirmation: Click Delete button in pop-up
// @description     2009-12-23: 

// ==/UserScript==

/*
    (c) Aleksey Tyschenko

    Copy, use, modify, spread as you see fit.
*/

document.getElementsByClassName = function(cl) {
   var retnode = [];
   var myclass = new RegExp('\\b'+cl+'\\b');
   var elem = this.getElementsByTagName('*');
   for (var i = 0; i < elem.length; i++) {

      var classes = elem[i].className;
      if (myclass.test(classes)) retnode.push(elem[i]);

                                          }
   return retnode;

                                      }; 

(function() {

    var GreasemonkeyBPDeleteFile =
    {
        go: function()
        {
            
           delobj = document.getElementsByClassName('bp_button bpDialogButton')[0].getElementsByTagName('td')[1];
    delobj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);

        },

    }
while(true) {
    GreasemonkeyBPDeleteFile.go();
           }

})();