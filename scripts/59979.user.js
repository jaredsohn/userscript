// ==UserScript==
// @name           pantip-list
// @namespace      tag:796c39c3-c0d5-4168-be63-f822469bd72e,2009-05-28
// @description    Modify appearance of pantip.com topic list
// @include        http://www.pantip.com/cafe/*/list*.php*
// @include        http://www.pantip.com/tech/*/list*.php*
// ==/UserScript==
// http://userscripts.org/scripts/show/59979

function parseList(cell)
{
  var i;
  for (i=0; i+8<cell.childNodes.length; ++i) {
    if (cell.childNodes[ i ].nodeName == "#text")
      ++i;
    if ((cell.childNodes[i+0].nodeName=="FONT"
        || cell.childNodes[i+0].nodeName=="SPAN")
      && cell.childNodes[i+2].nodeName=="A"
      && (cell.childNodes[i+4].nodeName=="FONT" 
        || cell.childNodes[i+4].nodeName=="SPAN")
      && (cell.childNodes[i+6].nodeName=="FONT"
        || cell.childNodes[i+6].nodeName=="SPAN")
      && (cell.childNodes[i+7].nodeName=="BR" 
        || cell.childNodes[i+8].nodeName=="BR"
        || cell.childNodes[i+8].nodeName=="IMG" 
          && (cell.childNodes[i+9].nodeName=="BR"
            || cell.childNodes[i+10].nodeName=="BR" 
            || cell.childNodes[i+10].nodeName=="IMG" 
              && (cell.childNodes[i+11].nodeName=="BR"
                || cell.childNodes[i+12].nodeName=="BR" 
        ) ) ) )
    {
      var anode = cell.childNodes[i+2];
      if (anode.childNodes.length>=2 
        && anode.childNodes[1].nodeName=="IMG" 
        && anode.childNodes[1].src=="http://www.pantip.com/tech/image/work2.gif"
         ) 
      {
        anode.style.backgroundColor = "#002800";
      }
      var am = /\((\d+) - \n?.+\n?\)/.exec(cell.childNodes[i+6].childNodes[0].nodeValue);
      if (am)
      {
        var newnode = document.createElement("font");
        newnode.color = "#BBDDFF";
        newnode.innerHTML = (am[1]<10?" &nbsp;&nbsp;":am[1]<100?" &nbsp;":" ")
          + am[1] + " ";
        cell.replaceChild(newnode,cell.childNodes[i+1]);
      }
    }
    while (i<cell.childNodes.length && cell.childNodes[i].nodeName != "BR")
      ++i;
  }
}

function findList(node)
{
  var n1;
  for (n1=node.firstChild; n1; n1=n1.nextSibling) {
    if (n1.nodeName=="TABLE") {
      if (n1.rows[2] && n1.rows[2].cells[0]) {
        if (n1.bgColor = bgrBlend(n1.bgColor,"#000000",1/2));
        findList(n1.rows[2].cells[0]);
      } else if (n1.rows[0] && n1.rows[0].cells[1]) {
        parseList(n1.rows[0].cells[1]);
      }
    }
    else if (n1.nodeName=="P") {
      parseList(n1);
    }
  }
}

function parseColor(c)
{
  var color = new Array();
  var am;
  if (c.substr(0,1)=='#')
  {
    color[0] = parseInt(c.substr(5,2),16);
    color[1] = parseInt(c.substr(3,2),16);
    color[2] = parseInt(c.substr(1,2),16);
    return color;
  }
  else if ((am = /rgb\((\d+), (\d+), (\d+)\)/.exec(c)))
  {
    color[0] = parseInt(am[3],10);
    color[1] = parseInt(am[2],10);
    color[2] = parseInt(am[1],10);
    return color;
  }
}

function blendColor(c1,c2,x)
{
  var color1 = parseColor(c1);
  var color2 = parseColor(c2);
  var xc,b,g,r;
  xc = 1-x;
  b = Math.floor(color1[2]*x + color2[2]*xc);
  g = Math.floor(color1[1]*x + color2[1]*xc);
  r = Math.floor(color1[0]*x + color2[0]*xc);
  return "#" + (((256+b)*256+g)*256+r).toString(16).substr(1);
}

if (document.body) {
  if(document.body.vLink)
    document.body.vLink = "#b0b0b0";
  else if(document.styleSheets.length==3)
  {
    var rules = document.styleSheets[1].cssRules;
    var i;
    for(i=0; i<rules.length; ++i)
      if (/a\.linkkratoo:visited/.test(rules[i].selectorText)) {
        rules[i].style.color = blendColor(rules[i].style.color,"#e0e0e0",0.5);
        break;
      }
  }
  if(document.body.bgColor)
    document.body.bgColor = blendColor(document.body.bgColor,"#000000",0.5);
  else
    document.body.style.backgroundColor = blendColor(document.defaultView.getComputedStyle(document.body, null).getPropertyValue("background-color"),"#000000",0.5);
  findList(document.body);
  parseList(document.body);
}
