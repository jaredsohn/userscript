// ==UserScript==
// @name       Allow Password Save
// @version    0.1
// @description  Removes autocomplete="off" from all input fields
// @match      https://*/* 
// ==/UserScript==

   var ac, c, f, fa, fe, fea, x, y, z;
   //ac = autocomplete constant (attribute to search for)
   //c = count of the number of times the autocomplete constant was found
   //f = all forms on the current page
   //fa = attibutes in the current form
   //fe = elements in the current form
   //fea = attibutes in the current form element
   //x,y,z = loop variables

   ac = "autocomplete";
   c = 0;
   f = document.forms;

   //cycle through each form
   for(x = 0; x < f.length; x++) {
      fa = f[x].attributes;
      //cycle through each attribute in the form
      for(y = 0; y < fa.length; y++) {
         //check for autocomplete in the form attribute
         if(fa[y].name.toLowerCase() == ac) {
            fa[y].value = "on";
            c++;
         }
      }

      fe = f[x].elements;
      //cycle through each element in the form
      for(y = 0; y < fe.length; y++) {
         fea = fe[y].attributes;
         //cycle through each attribute in the element
         for(z = 0; z < fea.length; z++) {
            //check for autocomplete in the element attribute
            if(fea[z].name.toLowerCase() == ac) {
               fea[z].value = "on";
               c++;
            }
         }
      }
   }
if (c>0) {
   alert("Enabled '" + ac + "' on " + c + " objects.");
}