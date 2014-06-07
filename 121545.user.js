// ==UserScript==
// @name           naver ruby
// @namespace      http://code.google.com/p/naver-ruby-greasemonkey/
// @description    네이버 일본어 사전에서 Ruby 후리가나를 보여줍니다.
// @version        0.64
// @include        http://jpdic.naver.com/*
// ==/UserScript==

GM_addStyle(".huri{color: gray;}");

function hasHan(node)
{
        if (node)
        {
                if (node.className == "han")
                {
                        return true;
                }              
                else if (node.getElementsByTagName)
                {
                        nodes=node.getElementsByTagName("*");
                        for (k=0; k<nodes.length; k++)
                        {
                                if (nodes[k].className == "han")
                                {
                                        return true;
                                }
                        }
                        
                        return false;
                }
        }
        
        return false;
}

function hasHuri(node)
{
        if (node)
        {
                if (node.className == "huri")
                {
                        return true;
                }
                else if (node.getElementsByTagName)
                {
                        nodes=node.getElementsByTagName("*");
                        for (k=0; k<nodes.length; k++)
                        {
                                if (nodes[k].className == "huri")
                                {
                                        return true;
                                }
                        }
                        
                        return false;
                }
        }
        
        return false;
}

if (document.getElementsByTagName("SUP"))
{
        tagSUP = document.getElementsByTagName("SUP");

        for ( i=0 ; i<tagSUP.length ; i++)       
        { 
                
                thisE = tagSUP[i];
                
                if (thisE.className == "huri")

                {
                        
                        RT = document.createElement("RT");        
                        RT.innerHTML = "<span class='huri'>"+thisE.innerHTML+"</span>";
                        
                        if(thisE.nextSibling)
                        {
                                nextE = thisE.nextSibling;
                                
                                while(nextE.nodeValue == "·" && nextE.nextSibling.tagName == "SUP" && nextE.nextSibling.className == "huri")
                                {
                                        RT.innerHTML = RT.innerHTML + "<span class='huri'>·</span><span class='huri'>"+nextE.nextSibling.innerHTML+"</span>";
                                        i++;
                                        
                                        nextE.nodeValue = "";
                                        nextE.nextSibling.setAttribute('style', 'display: none;');
                        
                                        if (nextE.nextSibling.nextSibling)
                                        {
                                                nextE = nextE.nextSibling.nextSibling;
                                        }
                                        else
                                        {
                                                break;
                                        }
                                              
                                }
                        }
                        else if (thisE.parentNode.nextSibling)
                        {
                                nextE = thisE.parentNode.nextSibling;
                                
                                while(nextE.nodeValue == "·" && nextE.nextSibling.tagName == "SUP" && nextE.nextSibling.className == "huri")
                                {
                                        RT.innerHTML = RT.innerHTML + "<span class='huri'>·</span><span class='huri'>"+nextE.nextSibling.innerHTML+"</span>";
                                        i++;
                                        
                                        nextE.nodeValue = "";
                                        nextE.nextSibling.setAttribute("STYLE", "display: none;");
                        
                                        if (nextE.nextSibling.nextSibling)
                                        {
                                                nextE = nextE.nextSibling.nextSibling;
                                        }
                                        else
                                        {
                                                break;
                                        }
                                }                                       
                        }



                        RB = document.createElement("RB");

                        if (thisE.previousSibling)
                        {
                                prevE = thisE.previousSibling;
                                
                                firstRunFlag = false;
                                
                                while ( hasHan(prevE) && ! hasHuri(prevE) || prevE.nodeType == 3 ) // TEXT_NODE = 3                         
                                {
                                        
                                        if (prevE.nodeType == 3)
                                        {
                                                if (prevE.nodeValue == "(")
                                                {
                                                        RB.innerHTML = "(" + RB.innerHTML;
                                                        prevE.nodeValue = "";
                                                
                                                }
                                                else if (prevE.nodeValue == ")")
                                                {
                                                        RB.innerHTML = ")" + RB.innerHTML;
                                                        prevE.nodeValue = "";
                                                }
                                                else if (prevE.nodeValue.match(/[ぁ-んァ-ン一-龠]+$/) && ! firstRunFlag)
                                                {
                                                        RB.innerHTML = "<span class='jp'>"+ prevE.nodeValue + "</span>" + RB.innerHTML;
                                                        prevE.nodeValue = "";
                                                        
                                                        firstRunFlag = true;
                                                }
                                                else
                                                {
                                                        break;
                                                }
                                        }
                                        else
                                        {
                                                newNode = prevE.cloneNode(true);
                                                
                                                if (RB.hasChildNodes())
                                                {
                                                        RB.insertBefore(newNode, RB.firstChild);
                                                }
                                                else
                                                {
                                                        RB.appendChild(newNode);
                                                }
                                                
                                                prevE.setAttribute("STYLE", "display: none;");
                                                
                                                firstRunFlag = true;

                                        }
                                                

                                        if (prevE.previousSibling)
                                        {
                                                prevE = prevE.previousSibling;
                                        }
                                        else if (prevE.parentNode.previousSibling)
                                        {
                                                prevE = prevE.parentNode.previousSibling;
                                        }
                                        else
                                        {
                                                break;
                                        }
                                       
                                }
                        }

                        newElement = document.createElement("RUBY");
                        newElement.appendChild(RB);
                        newElement.appendChild(RT);
                        
                        thisE.parentNode.insertBefore(newElement, thisE);
                        thisE.setAttribute("STYLE", "display: none;");
   
                }      
                
        }
            
}
