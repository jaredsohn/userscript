// ==UserScript==
// @name        cookieclicker autopilot & autoclicker
// @namespace   cookieclicker autopilot & autoclicker
// @description cookieclicker autopilot & autoclicker
// @include     */orteil.dashnet.org/cookieclicker/*
// @downloadURL	http://userscripts.org/scripts/source/178720.user.js
// @updateURL	http://userscripts.org/scripts/source/178720.meta.js
// @version     0.5
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
/*jslint browser: true*/
/*global $, jQuery*/

var glob={}; //singleton pattern
glob.ccTime=0.1;
glob.gcTime=1;
glob.upTime=1;
glob.upPrRatio=3;
glob.cur=0;
glob.gra=0;
glob.far=0;
glob.fac=0;
glob.min=0;
glob.shi=0;
glob.alc=0;
glob.por=0;
glob.tim1=0;
glob.con1=0;
glob.tim=false;
glob.con=false;
glob.optimal=false;

var globReset=glob;

//Save settings, using local storage
function saveSettings(){ localStorage.setItem('glob', JSON.stringify(glob)); }

//Load settings, using local storage
function loadSettings(){ 
    if(localStorage.getItem('glob')){ glob=$.parseJSON(localStorage.glob);} 
}
//reset settings
function reset(){ localStorage.clear(); glob=globReset;}

function autopilot(){
    $(document).ready(function(){
        var $bC = $("#bigCookie"), $gC = $("#goldenCookie"),own,i,j,$theDiv,prPrice,upPrice=0,optPrice,
            substr,max,ratio=[],primer=[[15,0.1], [100,0.5], [500,2], [3000,10], [10000,40], [40000,100], 
                                        [200000,400], [1666666,6666], [123456789,98765], [3999999999,999999]],
            getNum=function(i){return parseFloat(i.replace(/\,/g,"").match(/\d+(\.\d+)?/g).join(),10);};
        window.clearInterval(window.interval0); //resetting intervals
        window.clearInterval(window.interval1); 
        window.clearInterval(window.interval2); 
        window.clearInterval(window.interval3);
        window.interval0 = setInterval(function(){ saveSettings(); },1000); //saves your settings every second
        if(glob.ccTime>0){
            window.interval1 = setInterval(function(){	$bC.click(); },glob.ccTime*1000); //cookie clicker, click every ccTime seconds
        }
        if(glob.gcTime>0){	//golden cookie clicker,check every gcTime seconds
            window.interval2 = setInterval(function(){ if($gC.css("display")!="none"){$gC.click();} },glob.gcTime*1000);
        }
        if(glob.upTime>0){
            window.interval3 = setInterval(function(){	//every upTime seconds check for available upgrades/products
                for(i=$("#upgrades > div").size();i--;i){ //available upgrade checker (final argument just to pass strict syntax check)
                    if(glob.upPrRatio==0){break;} //if ratio 0, no upgrades will ever be bought
                    $theDiv=$("#upgrade"+i); //else get upgrade i (starting from more expensive)
                    if($theDiv.hasClass("enabled")){ //if can be bought and not covenant, buy
                        if($theDiv.attr("onmouseover").indexOf("Switch")==-1){
                            $theDiv.click();
                            console.log($theDiv.attr("onmouseover").split("%22name%22%3E")[1].split("%3C/div%3E")[0].replace(/%20/g," ") +
                                        " is the cheapest upgrade, bought.");
                            break;
                        }
                    }
                }
                j=$("#upgrade0").attr("onmouseover").indexOf("Switch")== -1 ? 0 : 1;	//get new price of cheapest upgrade (except the covenant)
                upPrice=$("#upgrade"+j).length>0 ? parseFloat($("#upgrade"+j).attr("onmouseover").split("%22price%22%3E")[1].split("%3C/span%3E")[0].replace(/%2C/g,""),10) : 0;
                
                
                
                if(!glob.optimal){
                    for(i=10;i--;i){ //available product checker
                        $theDiv=$(".product").eq(i); //get i product, starting from the condensers
                        own=parseFloat($theDiv.find(".owned").text(),10); //find how many user owns
                        if($theDiv.hasClass("enabled") && //if product can be bought, and is chosen to be bought
                           ((i==0 && (own<glob.cur || (glob.cur>0 && isNaN(own)))) || (i==1 && (own<glob.gra || (glob.gra>0 && isNaN(own)))) ||
                            (i==2 && (own<glob.far || (glob.far>0 && isNaN(own)))) || (i==3 && (own<glob.fac || (glob.fac>0 && isNaN(own)))) ||
                            (i==4 && (own<glob.min || (glob.min>0 && isNaN(own)))) || (i==5 && (own<glob.shi || (glob.shi>0 && isNaN(own)))) ||
                            (i==6 && (own<glob.alc || (glob.alc>0 && isNaN(own)))) || (i==7 && (own<glob.por || (glob.por>0 && isNaN(own)))) ||
                            (i==8 && (own<glob.tim1 || glob.tim || (glob.tim1>0 && isNaN(own)))) || 
                            (i==9 && (own<glob.con1 || glob.con || (glob.con1>0 && isNaN(own)))))){
                            prPrice=parseFloat($($theDiv.find(".price").get(0)).text().replace(/\,/g,"").match(/\d+(\.\d+)?/g).join(),10); //get price
                            if(0<upPrice && upPrice<prPrice*glob.upPrRatio){break;} //if upgrade price smaller than most expensive product times upPrRatio, skip
                            $theDiv.click(); //else buy
                            console.log($($theDiv.find(".title").get(0)).text() + " is the most expensive product, bought.");
                            break;
                        }
                    }
                }else{ //optimal product buying
                    for(i=10;i--;i){
                        $theDiv=$("#rowInfoContent"+i);
                        substr=$theDiv.html().split("<br>",2); //delimit string
                        substr=$.map(substr,getNum); //get total owning of product and how much benefit from it
                        if(substr[0]==0 || isNaN(substr[0])){//product not bought yet,replace with priming values
                            substr[0]=1;
                            substr[1]=primer[i][1]/i;
                            optPrice=primer[i][0];
                        }else{ //else get price for next product
                            optPrice=parseFloat($($(".product").eq(i).find(".price").get(0)).text().replace(/\,/g,"").match(/\d+(\.\d+)?/g).join(),10);
                        }
                        ratio[i]=(substr[1]/substr[0])/optPrice; //get ratio of benefit to cost
                        max= i<9 ? (ratio[i]>=ratio[max] ? i : max) : i; //get max ratio from all of them
                    console.log(ratio[i]);
                    }
                    console.log(max);
                    if(!isNaN(ratio[max])){ //wait an interval if content not loaded
                        $theDiv=$(".product").eq(max);
                        prPrice=parseFloat($($theDiv.find(".price").get(0)).text().replace(/\,/g,"").match(/\d+(\.\d+)?/g).join(),10); //get price
                        if($theDiv.hasClass("enabled") && (upPrice==0 || upPrice>=prPrice*glob.upPrRatio || isNaN(prPrice) || prPrice==0)){ //buy if available, else wait
                            $theDiv.click(); 
                            console.log($($theDiv.find(".title").get(0)).text() + " is the optimal product, bought.");
                        }
                    }
                }
            },glob.upTime*1000);
        }
    });
}

function main(){
    loadSettings();
    autopilot(); //call script function that manipulates the game
    var $setDiv = $("<div>", {id: "settingsAutopilot"}), //create UI div, below populate div with inputs and UI elements
        colValue= glob.optimal ? "grey" : "white", 
        curValue= glob.optimal ? "default" : "pointer", 
        opValue= glob.optimal ? "0.3" : "1";
    
    $("<span>Periods in secs & cost ratio to choose between upgrade/product</span>").css({color:"gray", marginLeft:"15px", "font-style":"italic"}).appendTo($setDiv);
    
    $("<br>").appendTo($setDiv);
    
    $("<input>", {type:"text", id:"ccTime", name:"ccTime", value:glob.ccTime}).css({marginLeft:"5px"})
    .keyup(function(){if($.isNumeric(this.value)){glob.ccTime=parseFloat(this.value);autopilot();}})
    .focus(function(){$(this).select(); $(this).mouseup(function(){$(this).unbind("mouseup"); return false;});}).appendTo($setDiv);
    
    $("<span>&nbsp;cookie clicker time&nbsp;&nbsp;</span>").appendTo($setDiv);
    
    $("<input>", {type:"text", id:"gcTime", name:"gcTime", value:glob.gcTime}).css({marginLeft:"35px"})
    .keyup(function(){if($.isNumeric(this.value)){glob.gcTime=parseFloat(this.value);autopilot();}})
    .focus(function(){$(this).select(); $(this).mouseup(function(){$(this).unbind("mouseup"); return false;});}).appendTo($setDiv);
    
    $("<span>&nbsp;golden cookie check&nbsp;&nbsp;</span>").appendTo($setDiv);
    
    $("<br>").appendTo($setDiv);
    
    $("<input>", {type:"text", id:"upTime", name:"upTime", value:glob.upTime}).css({marginLeft:"5px"})
    .keyup(function(){if($.isNumeric(this.value)){glob.upTime=parseFloat(this.value);autopilot();}})
    .focus(function(){$(this).select(); $(this).mouseup(function(){$(this).unbind("mouseup"); return false;});}).appendTo($setDiv);
    
    $("<span>&nbsp;upgrade & product check&nbsp;&nbsp;</span>").appendTo($setDiv);
    
    $("<input>", {type:"text", id:"upPrRatio", name:"upPrRatio", value:glob.upPrRatio}).css({marginLeft:"-3px"})
    .keyup(function(){if($.isNumeric(this.value)){glob.upPrRatio=parseFloat(this.value);autopilot();}})
    .focus(function(){$(this).select(); $(this).mouseup(function(){$(this).unbind("mouseup"); return false;});}).appendTo($setDiv);
    
    $("<span>&nbsp;upgrade/product cost ratio</span>").appendTo($setDiv);
    
    $("<br>").appendTo($setDiv);
    
    $("<span>Max amount of products to end up buying</span>").css({color:"gray", marginLeft:"145px", "font-style":"italic"}).appendTo($setDiv);
    
    $("<br>").appendTo($setDiv);
    
    $("<input>", {type:"text", id:"cur", class:"canDisable", name:"cur", value:glob.cur, disabled:glob.optimal}).css({marginLeft:"2px"})
    .keyup(function(){if($.isNumeric(this.value)){glob.cur=parseFloat(this.value);autopilot();}})
    .focus(function(){$(this).select(); $(this).mouseup(function(){$(this).unbind("mouseup"); return false;});}).appendTo($setDiv);
    
    $("<span>&nbsp;cursors&nbsp;&nbsp;</span>").appendTo($setDiv);
    
    $("<input>", {type:"text", id:"gra", class:"canDisable", name:"gra", value:glob.gra, disabled:glob.optimal}).css({marginLeft:0})
    .keyup(function(){if($.isNumeric(this.value)){glob.gra=parseFloat(this.value);autopilot();}})
    .focus(function(){$(this).select(); $(this).mouseup(function(){$(this).unbind("mouseup"); return false;});}).appendTo($setDiv);
    
    $("<span>&nbsp;grandmas&nbsp;&nbsp;</span>").appendTo($setDiv);
    
    $("<input>", {type:"text", id:"far", class:"canDisable", name:"far", value:glob.far, disabled:glob.optimal}).css({marginLeft:"5px"})
    .keyup(function(){if($.isNumeric(this.value)){glob.far=parseFloat(this.value);autopilot();}})
    .focus(function(){$(this).select(); $(this).mouseup(function(){$(this).unbind("mouseup"); return false;});}).appendTo($setDiv);
    
    $("<span>&nbsp;farms</span>").appendTo($setDiv);
    
    $("<input>", {type:"text", id:"fac", class:"canDisable", name:"fac", value:glob.fac, disabled:glob.optimal}).css({marginLeft:"47px"})
    .keyup(function(){if($.isNumeric(this.value)){glob.fac=parseFloat(this.value);autopilot();}})
    .focus(function(){$(this).select(); $(this).mouseup(function(){$(this).unbind("mouseup"); return false;});}).appendTo($setDiv);
    
    $("<span>&nbsp;factories&nbsp;&nbsp;</span>").appendTo($setDiv);
    
    $("<br>").appendTo($setDiv);
    
    $("<input>", {type:"text", id:"min", class:"canDisable", name:"min", value:glob.min, disabled:glob.optimal}).css({marginLeft:"2px"})
    .keyup(function(){if($.isNumeric(this.value)){glob.min=parseFloat(this.value);autopilot();}})
    .focus(function(){$(this).select(); $(this).mouseup(function(){$(this).unbind("mouseup"); return false;});}).appendTo($setDiv);
    
    $("<span>&nbsp;mines&nbsp;&nbsp;</span>").appendTo($setDiv);
    
    $("<input>", {type:"text", id:"shi", class:"canDisable", name:"shi", value:glob.shi, disabled:glob.optimal}).css({marginLeft:"8px"})
    .keyup(function(){if($.isNumeric(this.value)){glob.shi=parseFloat(this.value);autopilot();}})
    .focus(function(){$(this).select(); $(this).mouseup(function(){$(this).unbind("mouseup"); return false;});}).appendTo($setDiv);
    
    $("<span>&nbsp;shipments&nbsp;&nbsp;</span>").appendTo($setDiv);
    
    $("<input>", {type:"text", id:"alc", class:"canDisable", name:"alc", value:glob.alc, disabled:glob.optimal}).css({marginLeft:"4px"})
    .keyup(function(){if($.isNumeric(this.value)){glob.alc=parseFloat(this.value);autopilot();}})
    .focus(function(){$(this).select(); $(this).mouseup(function(){$(this).unbind("mouseup"); return false;});}).appendTo($setDiv);
    
    $("<span>&nbsp;alchemy labs</span>").appendTo($setDiv);
    
    $("<input>", {type:"text", id:"por", class:"canDisable", name:"por", value:glob.por, disabled:glob.optimal}).css({marginLeft:"6px"})
    .keyup(function(){if($.isNumeric(this.value)){glob.por=parseFloat(this.value);autopilot();}})
    .focus(function(){$(this).select(); $(this).mouseup(function(){$(this).unbind("mouseup"); return false;});}).appendTo($setDiv);
    
    $("<span>&nbsp;portals&nbsp;&nbsp;</span>").appendTo($setDiv);
    
    $("<br>").appendTo($setDiv);
    
    $("<input>", {type:"text", id:"tim1", class:"canDisable", name:"tim1", value:glob.tim1, disabled:glob.optimal}).css({marginLeft:"2px"})
    .keyup(function(){if($.isNumeric(this.value)){glob.tim1=parseFloat(this.value);autopilot();}})
    .focus(function(){$(this).select(); $(this).mouseup(function(){$(this).unbind("mouseup"); return false;});}).appendTo($setDiv);
    
    $("<span>&nbsp;time machines&nbsp;&nbsp;</span>").appendTo($setDiv);
    
    $("<input>", {type:"text", id:"con1", class:"canDisable", name:"con1", value:glob.con1, disabled:glob.optimal}).css({marginLeft:"60px"})
    .keyup(function(){if($.isNumeric(this.value)){glob.con1=parseFloat(this.value);autopilot();}})
    .focus(function(){$(this).select(); $(this).mouseup(function(){$(this).unbind("mouseup"); return false;});}).appendTo($setDiv);
    
    $("<span>&nbsp;antimatter condensers&nbsp;&nbsp;</span>").appendTo($setDiv);
    
    $("<br>").appendTo($setDiv);
    
    $("<input>", {type:"checkbox", id:"tim", class:"canDisable", name:"tim", value:"1", checked:glob.tim, disabled:glob.optimal}).css({marginLeft:"16px"})
    .click(function(){glob.tim=this.checked;autopilot();}).appendTo($setDiv);
    
    $("<span>&infin; time machines&nbsp;&nbsp;</span>").appendTo($setDiv);
    
    $("<input>", {type:"checkbox", id:"con", class:"canDisable", name:"con", value:"1", checked:glob.con, disabled:glob.optimal}).css({marginLeft:"59px"})
    .click(function(){glob.con=this.checked;autopilot();}).appendTo($setDiv);
    
    $("<span>&infin; antimatter condensers</span>").appendTo($setDiv);
    
    $("<br>").appendTo($setDiv);
    
    $("<input>", {type:"checkbox", id:"optimal", name:"optimal", value:"1", checked:glob.optimal}).css({marginLeft:"16px"})
    .click(function(){
        glob.optimal=this.checked;
        $("#settingsAutopilot").find(".canDisable").each(function(){	//if optimal checkbox enabled, disable now irrelevant options
            var colValue= glob.optimal ? "grey" : "white", 
                curValue= glob.optimal ? "default" : "pointer", 
                opValue= glob.optimal ? "0.3" : "1";
            $(this).attr("disabled",glob.optimal).css({color:colValue, cursor:curValue}).next().css({color:colValue});
            if($(this).attr("type")=="checkbox"){ $(this).css({opacity:opValue}); }
        });
        autopilot();
    }).appendTo($setDiv);
    
    $("<span>Optimal product buying (based on cost efficiency)</span>").appendTo($setDiv);
    
    //further style UI elements, end by appending whole UI div to correct position in DOM
    $setDiv.find("input[type='text']").css({width:"7%", "border-style":"none", backgroundColor:"black",
                                            color:"white", "font-weight":"bold", "text-align":"right", cursor:"pointer"});
    
    $setDiv.find("input[type='checkbox']").css({cursor:"pointer"});
    
    $setDiv.find(".canDisable").css({color:colValue, cursor:curValue}).next().css({color:colValue});
    $setDiv.find(".canDisable[type='checkbox']").css({opacity:opValue});
    
    $setDiv.find("span").css({cursor:"default"});
    
    $setDiv.css({backgroundColor:"black", paddingTop:"3px", color:"white", position:"absolute", right:0, bottom:"33px", 
                 width:"100%", height:"180px", "z-index":10000, opacity:0.66}).appendTo($("#sectionLeft"));
}

main(); //call main function of script
