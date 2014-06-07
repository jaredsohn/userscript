// ==UserScript==
// @name           deviantART - First/Last Page in Message Center Views
// @namespace      http://davidjcobb.deviantart.com/
// @description    Changes the page links in the Message Center to show first/last page links.
// @include        http://my.deviantart.com/messages/*
// ==/UserScript==

var Run=
function() {
   if(!unsafeWindow) var unsafeWindow=window;
   unsafeWindow.HTMLPager.prototype.on=
      function () {
         var C=[],D,E,A,B;
         C.push("<span class=\"shadow\"><span>");

         var DJC_inMC=!!(da_minish_messages&&this.owner&&this.owner.owner&&this.owner.owner==da_minish_messages);
         if(DJC_inMC) {
            this.prev_label="\u25C4";
            this.next_label="\u25BA";
         }

         if (this.page > 0) {
            if (DJC_inMC) C.push("<a class=\"l\" href=\""+this.makeLink(0)+"\" htmlpage=\"0\" title=\"First Page\">|\u25C4</a>");
            C.push("<a class=\"l"+(DJC_inMC?"":" page")+"\" href=\""+this.makeLink(this.page - 1)+"\" htmlpage=\""+(this.page - 1)+"\" title=\"Previous Page\">"+this.prev_label+"</a>");
         } else {
            if (DJC_inMC) C.push("<del class=\"l\" title=\"First Page\">|\u25C4</del>");
            C.push("<del class=\"l\" title=\"Previous Page\">"+this.prev_label+"</del>")
         }
         if (!this.alt) C.push("&nbsp;&nbsp;&nbsp;&nbsp;");
         if (this.pages===!!this.pages) {
            C.push("&nbsp;&nbsp;&nbsp;&nbsp;","&nbsp;&nbsp;&nbsp;&nbsp;");
         } else {
            this.pages--;
            D=Math.max(0,this.page-1);
            E=Math.min(D+4,this.pages);
            D=Math.max(0,Math.min(D,E-4));
            if(D!=E) {
               for(B=D;B<=E;++B) {
                  if (B==this.page) {
                     C.push("<strong>"+(B+1)+"</strong>");
                  } else {
                     C.push("<a href=\""+this.makeLink(B)+"\" htmlpage=\""+B+"\">");
                     if(B==D&&B>0) C.push("...");
                     C.push(B+1);
                     if(B==E&&B<this.pages) C.push("...");
                     C.push("</a>");
                  }
               }
            }
         }
         if (!this.alt) C.push("&nbsp;&nbsp;&nbsp;&nbsp;");
         if (this.pages===!0||this.page<this.pages) {
            C.push("<a class=\"r"+(DJC_inMC?"":" page")+"\" href=\""+this.makeLink(this.page+1)+"\" htmlpage=\""+(this.page+1)+"\" title=\"Next Page\">"+this.next_label+"</a>");
            if (DJC_inMC) C.push("<a class=\"r\" href=\""+this.makeLink(this.pages)+"\" htmlpage=\""+this.pages+"\" title=\"Last Page\">\u25BA|</a>");
         } else {
            C.push("<del class=\"r\" title=\"Next Page\">"+this.next_label+"</del>");
            if (DJC_inMC) C.push("<del class=\"r\" title=\"Last Page\">\u25BA|</del>");
         }
         C.push("</span></span>");
         this.node.innerHTML=C.join("");
         A=Tree.gets(this.node,"a");
         for(B=0;A[B];B++) {
            A[B].onclick=bind(this,this.clicked,Number(A[B].getAttribute("htmlpage")));
         }
      };
};
var Prep=
function() {
   var STR=Run.toString().replace(/\n/g,""); // FF3 prevents sandboxes from screwing around with the prototypes of other sandboxes' objects.
   window.location.href="javascript:("+STR+")();void(0);"; // so we will cleverly use a JS URL to work around that.
};
unsafeWindow.addEventListener("load",Prep,!1);