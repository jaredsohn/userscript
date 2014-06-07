// ==UserScript==
// @name           BaiduTools
// @namespace      http://www.baidu.com
// @include        http://tieba.baidu.com/*
// ==/UserScript==

function main(){

var nr = document.getElementsByName("co");
if (nr.length!=1) return;
nr = nr[0];
//insert br before "回复内容"
var br=document.createElement("br");
nr.parentNode.insertBefore(br,nr);
//make nr widerrrrrrr
nr.cols = 18*4+1;
nr.rows = 15;
//insert ui
//s ="每页<select id='___x'><option value='5'>5</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option><option value='11'>11</option><option value='12'>12</option><option value='13'>13</option><option value='14'>14</option><option value='15'>15</option><option value='16'>16</option><option value='17'>17</option><option value='18' selected=\"selected\">18</option><option value='19'>19</option><option value='20'>20</option><option value='25'>25</option><option value='30'>30</option></select>竖行，";
//s+="每竖行<select id='___y'><option value='5'>5</option><option value='8'>8</option><option value='9'>9</option><option value='10' selected=\"selected\">10</option><option value='11'>11</option><option value='12'>12</option><option value='13'>13</option><option value='14'>14</option><option value='15'>15</option><option value='16'>16</option><option value='17'>17</option><option value='18'>18</option><option value='19'>19</option><option value='20'>20</option><option value='25'>25</option><option value='30'>30</option></select>个字"
s ="每页<input type=text id='___x' value='19' size='1' maxlength='2'>竖行，";
s+="每竖行<input type=text id='___y'value='37' size='1' maxlength='2'>个字";
s+="使用<select id='___tbl'><option value='0'>粗实线+细实线</option><option value='1'>双实线+细实线</option><option value='2' selected=\"selected\">细实线+细虚线</option></select>边框";
s+="<button id=\"___btncvt\">转换</button><button id=\"___btnrev\" disabled=\"true\">还原</button>"
span = document.createElement("span");
span.setAttribute("title", "From http://www.cshbl.com/gushu.html");
span.innerHTML=s;
br.parentNode.insertBefore(span,br);
//convert
var triggerEvent=function(){
    var evt=document.createEvent("KeyboardEvent");
    evt.initKeyEvent(                                                                                      
                 "keyup",        //  in DOMString typeArg,                                                           
                  true,             //  in boolean canBubbleArg,                                                        
                  true,             //  in boolean cancelableArg,                                                       
                  null,             //  in nsIDOMAbstractView viewArg,  Specifies UIEvent.view. This value may be null.     
                  false,            //  in boolean ctrlKeyArg,                                                               
                  false,            //  in boolean altKeyArg,                                                        
                  false,            //  in boolean shiftKeyArg,                                                      
                  false,            //  in boolean metaKeyArg,                                                       
                   9,               //  in unsigned long keyCodeArg,                                                      
                   0);              //  in unsigned long charCodeArg);    
    nr.dispatchEvent(evt);

}
var cvtclick = function(e){
    if (e.explicitOriginalTarget != document.getElementById("___btncvt")) return;
    e.preventDefault();
    window.___nrbak = nr.value;
    var x = parseInt(document.getElementById("___x").value);
    var y = parseInt(document.getElementById("___y").value);
    var tb = parseInt(document.getElementById("___tbl").value);
    var realx = x*4 + 1;
    if (nr.cols<realx) nr.cols=realx;
    txt = convert(nr.value,x,y,tb);
    //txt = "<font style=\"font-size:12px;line-height:12px;width:"+((x*2+1)*12)+"px;\">\r\n"+txt+"</font>\r\n"
    nr.value = txt;
    document.getElementById("___btncvt").disabled = true;
    document.getElementById("___btnrev").disabled = false;
    triggerEvent();
    return false;
}
var revclick = function(e){
    if (e.explicitOriginalTarget != document.getElementById("___btnrev")) return;
    e.preventDefault();
    nr.value = window.___nrbak;
    document.getElementById("___btncvt").disabled = false;
    document.getElementById("___btnrev").disabled = true;
    triggerEvent();
}
document.getElementById("___btncvt").addEventListener("click",cvtclick,false);
document.getElementById("___btnrev").addEventListener("click",revclick,false);
}
main();


//convert misc
function convert(s,width,height,tblTemplet){
    if(!s || s.length == 0){
        return "";
    }
    var blankChar = '　';
    var tblChars = [['┏','┓','┗','┛','┯','┷','┃','│', '━'],
                ['╔','╗','╚','╝','╤','╧','║','│', '═'],
                ['┌','┐','└','┘','┬','┴','│','┆', '─']];
    var ary = [];
    var i,j, index;
    var t = "";
    index = 0;
    //width = document.getElementById("x").value * 1;
    //height = document.getElementById("y").value * 1;
    //tblTemplet = document.getElementById("tbl").value * 1;
    var tb = tblChars[tblTemplet];
    for(i=width*2; i>=0; i--){
        ary[i] = new Array();
    }
    while(index < s.length){
        for(i=width*2; i>=0; i--){
            var aryi=ary[i];
            for(j=0; j<=(height+1); j++){
                if( i == (width * 2)){
                    if(j==0){
                        aryi[j] = tb[1];
                    }else if(j == (height + 1)){
                        aryi[j] = tb[3];
                    }else{
                        aryi[j] = tb[6];
                    }
                }else if( i== 0){
                    if(j==0){
                        aryi[j] = tb[0];
                    }else if(j == (height + 1)){
                        aryi[j] = tb[2];
                    }else{
                        aryi[j] = tb[6];
                    }
                }else if( i % 2 == 0){
                    if(j==0){
                        aryi[j] = tb[4];
                    }else if(j == (height + 1)){
                        aryi[j] = tb[5];
                    }else{
                        aryi[j] = tb[7];
                    }
                }else if(j == 0 || j == (height + 1)){
                    aryi[j] = tb[8];
                }else{
                    var c = getChar(s, index++);
                    if (c == '\n' || c == '\r'){
                        if(j == 1){
                            j = 0;
                            continue;
                        }else{
                            while(j<(height+1)){
                                aryi[j] = blankChar;
                                j++;
                            }
                            j = height;
                        }
                    }else{
                        aryi[j] = c;
                    }
                }
            }
        }
        for(j=0; j<=(height + 1); j++){
            for(i=0; i<=width*2; i++){
                t += ary[i][j];
            }
            t += "\r\n";
        }
        //t += "\r\n";
    }
    return t;
    
}


var ___map = null;
function getChar(s, index){
    var blankChar = '　';
    if(index >= s.length){
        return blankChar;
    }
    if (___map == null)
    {
	    var half = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','(',')','[',']','{','}','<','>','*','&','^','%','$','#','@','!','~','`','+','-','=','_','|','\\','\'','"',';',':','.',',','?','/',' ','（','）','【','】','《','》'];
        var full = ['０','１','２','３','４','５','６','７','８','９','ａ','ｂ','ｃ','ｄ','ｅ','ｆ','ｇ','ｈ','ｉ','ｊ','ｋ','ｌ','ｍ','ｎ','ｏ','ｐ','ｑ','ｒ','ｓ','ｔ','ｕ','ｖ','ｗ','ｘ','ｙ','ｚ','Ａ','Ｂ','Ｃ','Ｄ','Ｅ','Ｆ','Ｇ','Ｈ','Ｉ','Ｊ','Ｋ','Ｌ','Ｍ','Ｎ','Ｏ','Ｐ','Ｑ','Ｒ','Ｓ','Ｔ','Ｕ','Ｖ','Ｗ','Ｘ','Ｙ','Ｚ','︵','︶','︻','︼','︷','︸','︽','︾','＊','＆','︿','％','＄','＃','＠','！','～','｀','＋','－','＝','＿','｜','＼','＇','＂','；','：','。','，','？','／', blankChar,'︵','︶','︻','︼','︽','︾'];
        ___map = {};
        for (var i=0;i<half.length;++i)
			___map[half[i]]=full[i];
    }
    var c = s.charAt(index);
    if (c in ___map)
        c = ___map[c];
    return c;
}
