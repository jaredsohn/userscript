// ==UserScript==
// @name        blgcss
// @namespace   blgcss
// @version     1
// ==/UserScript==
body {
color:#666666;
font-family:Helvetica,Arial,sans-serif;
font-size:13px;
background-color: #F1F5F8; 
}

a                   {color: #2B4CDD;text-decoration:none;border-bottom: 1px dotted #c0c0c0;}
a:hover             {color: #A1A2A2;}
#wrapper            {margin: 0 auto;width: 972px;}
#faux               {margin: 0 auto;margin-bottom: 0px;width:972px;}
#header             {height: 30px;text-align: center;width: 100%;height:100%;}
#column-1           { display: inline;margin: 0px;color: #333;padding-top:4px;width: 250px;float: left;}
#column-stuff       { display: inline;margin: 0px;color: #333;padding-top:4px;width: 250px;float: left;}
#column-2           { display: inline;margin: 0px;color: #333;padding-top:4px;width: 120px;float: left;}
#column-3           { width:602px;float:right;padding: 0px;height:auto !important; /* IE Hack (old IE doesn't have min-height or !important, so what happens is firefox goes !important (auto) and ofc minimum height, but IE just goes height.) */height:400px;}
#footer             { margin: 0 auto; width: 952px;clear: both;color: #333;background: #D4EAFC;padding: 10px;text-align:center;}
#navigation         { width: 952px;padding:10px;text-align:left;margin: 0 auto; }
#navigation ul      { list-style-type: none;}
#navigation li      { display:inline;}
#navigation a       { border: none;padding-left: 20px;padding-right: 20px;padding-top: 10px;padding-bottom: 10px;font-weight: normal;font-size: 110%;color:#000; float:none; text-decoration:none;}
#navigation 
    a:hover, 
    #tabs a:focus   { background: #fff;color:#000; }
#navigation 
    .selected a     { background: #fff; color:#000; }
#content            { text-align:center; margin-left: 10px;border: 1px solid #C2BEB1;background-color: white;margin: 4px 0 0 10px;padding: 4px 10px 4px 10px; }

table   { width: 100%; }
th      { background-color: #D5DFE7; padding: 6px; border: 1px solid #C6D2DA; }
th h2   { padding-left: 10px; display:inline; font-size: 13px; vertical-align: middle; }
td      { padding: 6px;border: 1px solid #DDDDDD; }
td.odd  { background-color:#F5FBFF; }

td.paying {text-align: left;}

#column-1 a {
    border: 0px;
}
#column-1 a:hover {border-bottom: 1px solid;}

#column-1 h2 { padding:0px; margin: 0px; }
#column-1 ul { width: 100%; margin-left:0px;  padding-left: 0px;}
#column-1 li {
    list-style: none;
margin-right: 5px;
    border-bottom: 1px dotted black;
    padding-bottom: 3px;
    padding-top: 3px;
} 

.news {text-align: left;}
.news .postinfo {
    background-color: #CCC; padding: 6px; border: 1px solid #C6D2DA; 
}
