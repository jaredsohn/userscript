// ==UserScript==
// @name          Wikipedia For Typophiles PLUS
// @namespace     http://userstyles.org
// @description	  SEE http://userstyles.org/styles/20789 IF YOU DON'T OWN THESE FONTS. It keeps the layout but uses Calibri and Constantia
// @author        herarchitectlover
// @homepage      http://userstyles.org/styles/18433
// @include       http://eo.wikipedia*
// ==/UserScript==
(function() {
var css = "h1, h2, h3, h4, h5, h6
{
    border-bottom: 1px dashed #B2B2B2 !important;
    font-family: Tanar  !important;
    
    
    
}

h1
{
    font-size: 36px !important;
    margin-top: 0.625em !important;
    margin-bottom: 0.3em !important;
    padding-bottom: 0 !important;
}
h2
{
    font-size: 24px !important;   
    line-height: 0.9375 !important;
    margin-top: 0.9375em !important;
    margin-bottom: 0.9375em !important;
}
h3
{
    font-size: 21px !important;   
    line-height: 1.071 !important;
    margin-top: 1.071em !important;
    margin-bottom: 1.071em !important;
}
h4
{
    font-size: 18px !important;   
    line-height: 1.25 !important;
    margin-top: 1.25em !important;
    margin-bottom: 1.25em !important;
}
h5
{
    font-size: 16px !important;   
    line-height: 1.071 !important;
    margin-top: 1.071em !important;
    margin-bottom: 1.071em !important;
}
h6
{
    font-size: 15px !important;   
    line-height: 1.406 !important;
    margin-top: 1.406em !important;
    margin-bottom: 1.406em !important;
}


.firstHeading
{
    font-size: 36px !important;
    font-family: Tanar, Tanar, Tanar;
    font-style: italic;
    
    
    
     
    
}

#p-cactions, #p-logo, #p-tb, #p-lang
{
    display: none !important;
}
body
{
    background: #F1F1F1 !important;
    min-width: 1000px;
    max-width: 1500px;
    margin: 0 auto;
    min-height: 100%;   
    
    
    
}

p
{
    margin-bottom: 1.406em !important;
    line-height: 1.5 !important;
}

.dablink
{
    padding-left: 0em !important;
    padding-top: 0em !important;
    opacity: 1;
    font-family: Tanar, Tanar !important;    
    font-size: 15px;
}

.dablink:before
{
    
content: \"k \";
    color: #E76A25 !important;
    font-family: Tanar !important;
}

#content
{
    
    padding: 0px 38px 38px 38px !important;
    border-top: 1px solid #D9D9D9 !important;
    border-right: 1px solid #D9D9D9 !important;
    border-bottom: 1px dashed #B2B2B2 !important;
    border-left:0px !important;    
    font-family: Tanar !important;
    font-size: 16px !important;
    font-weight: 500;
    line-height: 1.5em !important;
    width: 33em !important;
    position: absolute !important;
    left: 11.5% !important;
    
    
    


   
    
    
    
}

.portlet, #footer, #bodyContent > H3:first-child + DIV + DIV + DIV + TABLE, #bodyContent > H3:first-child + DIV + DIV + DIV + TABLE + TABLE, #anon-banner, #siteSub, #siteNotice, span.editsection,
span#coordinates,
span.editsection,
span.toctoggle,
#togglelink,
#contentSub,
.metadata,
div.topicon
{
    display: none !important;
}

.metadata.plainlinks.ambox.ambox-content
{
    margin-top: 10px !important;
    margin-bottom: 10px !important;
}

table.ambox th.ambox-text, table.ambox td.ambox-text
{
    padding-left: 1em !important;
    padding-right: 1em !important;
    width: 100%;
    opacity: .75;
}

.searchresult
{
    width: 95% !important;
}
.infobox
{
    margin-left: 1.5em !important;
    margin-top: 1.0em !important;
    
}
.thumbinner
{
    background-color: #FFF !important;
    margin-left: 0em !important;
    margin-top: 1.0em !important;
    border: none !important;
    

}
.thumbcaption 
{
    background-color: #FFF !important;
    margin-top: 1.0em !important;
    border-top: 1px dashed #B2B2B2 !important;
    
    
}    
#toc #toctitle, .toc #toctitle, #toc .toctitle, .toc .toctitle
{
    display: none !important;
   
    
}

img.thumbimage, img
{
    opacity:1 !important;
}

img.thumbimage:hover, img:hover
{
    opacity:0.8 !important;
}

div.thumbcaption:before
{
    content: \"k\";
    color: #E76A25 !important;
    font-family: MercuryNumericG4-SemiItalic !important;
       
}

div.thumbcaption
{
    
    text-align: left !important;
    font-family: Tanar;
    font-size: 14px !important;
    font-style: italic;
    
    
    
    
    
}

div.rellink
{
    text-align: left !important;
    font-family: Tanar;
}

div.rellink:before
{
    content: \"k \";
    color: #E76A25 !important;
    font-family: Tanar !important; 
}

big
{
text-transform: UPPERCASE;   
font-size: 20px !important;

}
table.plainlinks
{
margin-top: 25px !important;
max-width: 530px !important;



}
div.infobox
{
margin-top: 5px !important;
max-width: 530px !important;

}
a:link { font-weight: bolder; color: #2D4464 !important; text-decoration: none !important;   } 

a:hover, a:active { color: #000000 !important; background-color: #F4F2E4 !important; text-decoration: none; border-bottom: dotted #cccccc 1px; }


#toc
{
background-color: #F8F7EF !important;
    border-bottom: 1px dashed #B2B2B2 !important;
    border-right: 0px !important;
    border-top: 1px dashed #B2B2B2 !important;
    border-left:0px !important;
}
.infobox
{
background-color: #EDEBD5 !important;

}
table.navbox
{
max-width: 533px !important;

}

p { 
margin-bottom:0 !important; 

} 

p + p { 
text-indent: 1.406em !important; 
margin-top: 0 !important; 
}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
