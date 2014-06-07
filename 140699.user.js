// ==UserScript==
// @name        badoo
// @namespace   badoo    
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include     http://badoo.com  /*  
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1
// ==/UserScript==                
                 
var longString = <str><![CDATA[
                
.blockPerson{
        background: #f85032;
        background: -moz-linear-gradient(top,  #f85032 0%, #f16f5c 50%, #f6290c 51%, #f02f17 71%, #e73827 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f85032), color-stop(50%,#f16f5c), color-stop(51%,#f6290c), color-stop(71%,#f02f17), color-stop(100%,#e73827));
        background: -webkit-linear-gradient(top,  #f85032 0%,#f16f5c 50%,#f6290c 51%,#f02f17 71%,#e73827 100%);
        background: -o-linear-gradient(top,  #f85032 0%,#f16f5c 50%,#f6290c 51%,#f02f17 71%,#e73827 100%);
        background: -ms-linear-gradient(top,  #f85032 0%,#f16f5c 50%,#f6290c 51%,#f02f17 71%,#e73827 100%);
        background: linear-gradient(to bottom,  #f85032 0%,#f16f5c 50%,#f6290c 51%,#f02f17 71%,#e73827 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f85032', endColorstr='#e73827',GradientType=0 );
        cursor: pointer;
        -webkit-border-top-left-radius: 4px;
        -webkit-border-top-right-radius: 4px;
        -moz-border-radius-topleft: 4px;
        -moz-border-radius-topright: 4px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        position:absolute;
        margin-top:131px;
        margin-left:147px;
        padding:5px;
}           

.blocked{
        background: #FCBFBF;
}
                                                                                                                                                                                                                                                                                                                                                                                                                                  }
 ]]></str>.toString();     
 

 
 



$(document).ready(function(){
        
        $('head').append( $('<style type="text/css"/>').text(longString));        
        tmp = [];   

        /* FUNCTIONS */
        function removeDuplicates(array){
                var tmpArray = [];
                array = array.sort();
                for (var i = 0; i < array.length; i++) {
                        if (array[i + 1] != array[i] ) {
                                tmpArray.push(array[i]);
                        }
                        
                }  
                return tmpArray;
        }
        
        
        function tmp2real(){
                
                tmp2 = [];
                for ( i = 0; i < tmp.length ; i++) {
                        tmp2 = tmp2.concat(tmp[i]); 
                } 
                tmp2 = removeDuplicates(tmp2.concat(blockedPeoples));
                // console.log('tmp2',tmp2);
                tmp2_joined = tmp2.join(",");
                //console.log('tmp2j',tmp2_joined);
                GM_setValue('blockedPeoples',tmp2_joined); 
                run();
                $("#loader").css('display','none');
        }
        
        
        function getBlockedPeoples(page){
                if(!page)page=1;
                $.get("http://badoo.com/connections/blocked/?webapp=1&wa=1&ws=1&page="+page,
                        function(data){                                
                                $("#loader").css('display','block');
                                        
                                var data = JSON.parse(data); 
                                data = data.page.center;
                                var pattern = /([0-9]{10})\/\?r\=38/g;  
                                match = data.match(pattern);
                                if(match){
                                        match = removeDuplicates(match);
                                        for (i=0;i<match.length;i++)
                                        {
                                                match[i] = match[i].replace("/?r=38","");           
                                        }  
                                }
                                
                                if(data.match(/no_users/g)){
                                        tmp2real();      
                                }else{ 
                                        tmp[page-1] = match;
                                        page++;                                
                                        ilosc = match.length;
                                        el = match[ilosc-1];  
                                        if(blockedPeoples!=undefined){ 
                                                console.log("searching",el,blockedPeoples);
                                                if(blockedPeoples.indexOf(el)!== -1 ){ 
                                                        console.log("found");
                                                        tmp2real();                                                          
                                                }else{       
                                                        console.log("not found");
                                                        getBlockedPeoples(page);    
                                                }                                        
                                        }else{   
                                                getBlockedPeoples(page);        
                                        }
                                       
                                }  
                        }, 
                        "json");
        }
        
        function ru(){
                var interval = setInterval(function() {
                        len = $("#CHECK").length;
                        if(len==0){
                                clearInterval(interval);
                                run();
                        }
                }, 500); 
        }        
        
        function run(){
                if(window.location.pathname.match(/search/g)){
                        /*** BUTTON     */           
                        $(".user_contact").each(function(){
                               // if($(this).find(".blockPerson").length<1){
                                href = $(this).find(".userpic").parent().attr('href');
                                if(id=href.match(/[0-9]{10}/g)){
                                        $(this).prepend("<div class='blockPerson' id='id_"+id[0]+"'>block</div>");                  
                                        if(blockedPeoples.indexOf(id[0])!== -1){  
                                                $("#id_"+id).parent().remove();
                                        }else{
                                        }
                                //}
                                }
                        });        
                        $("#cl_content").append("<span id='CHECK'></span>");
                        ru();
                }
                
                
                if(window.location.pathname.match(/visitors/g)){                                 
                        $(".user_contact").each(function(){
                               // if($(this).find(".blockPerson").length<1){
                                href = $(this).find(".userpic").parent().attr('href');
                                if(id=href.match(/[0-9]{10}/g)){
                                        $(this).prepend("<div  id='id_"+id[0]+"'></div>");                  
                                        if(blockedPeoples.indexOf(id[0])!== -1){  
                                                $("#id_"+id).parent().addClass("blocked");
                                        }else{
                                        }
                                //}
                                }
                        });
                }
        }         
        /* END FUNCTIONS */        
    
        blockedPeoples = GM_getValue('blockedPeoples');
        if(blockedPeoples!=undefined){
                blockedPeoples = blockedPeoples.split(",");      
                // console.log(blockedPeoples.length,blockedPeoples); 
                run(); 
        }
        
        
        /* autoCheck = GM_getValue('autoCheck');
        if(!autoCheck){
                autoCheck = 0;
                GM_setValue('autoCheck', autoCheck);
                checked = "";
        }else if(autoCheck==1){
                checked = "checked='checked'";                
        }else{
                checked = "";                        
        }*/
        autoCheck =1;
             
        
        img = "data:image/gif;base64,R0lGODlhdgALAIAAAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBQAAACwAAAAAdgALAAACI4yPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9lYAACH5BAkFABcALAAAAAB2AAsAhAQCBISChMTCxFxaXOTi5CwqLBQWFPT29Nza3Hx6fAwODLSytMzOzPz+/AQGBMTGxGxqbOTm5Dw6PBweHPz6/Hx+fLy6vP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVO4CWOZGmeaKqubOu+cCzPdG2PDTNIFXH/wKALMQEYBwehcimsGI2KB3NKlUGeRkt1y00tsAVEd0w+JAyAwoJCbnMpDAGi4a7b7/i8XhgCACH5BAkFABkALAAAAAB2AAsAhAQCBIyKjDw+PMTGxOTm5DQyNGRiZBQSFLy+vNza3PT29ExOTHRydBwaHAQGBJSSlMzOzOzu7Dw6PGxqbBQWFMTCxNze3Pz6/FRSVP///wAAAAAAAAAAAAAAAAAAAAAAAAVNYCaOZGmeaKqubOu+cCzPdG3fYhQIGHLhwKAwdWEAjpTBcMnEWSjHo6FJrb4SjihgYe16TRGJ9vEtfysFwMEQMbutBARE8a7b7/h8PgQAIfkECQUAGgAsAAAAAHYACwCEBAIEhIaEREJExMbE5ObkNDY09Pb0FBIUfH58XFpcDAoMTEpM7O7stLK01NbU/P78BAYElJKUREZEzMrM7Ors/Pr8HBocDA4MTE5M9PL0////AAAAAAAAAAAAAAAAAAAABU2gJo5kaZ5oqq5s675wLM90bd+yEQlYU+HAoDD1CACOl8ZwycRlLMfjokmtviiQKKBg7XpNBokW8S1/HQXIJUEwu62UwYTxrtvv+DwzBAAh+QQJBQAaACwAAAAAdgALAIQEAgSEgoTEwsRMTkzk4uQkIiQcGhykpqT08vTU0tR0dnQMDgw8Ojy8urz8+vzc2twEBgSUkpRcXlzk5uQkJiQcHhysrqx8enz8/vzc3tz///8AAAAAAAAAAAAAAAAAAAAFTqAmjmRpnmiqrmzrvnAsz3Rt33hJKIyU5MCg0IQYAI6FyXDJrDUWx2OkSa2yLNHjxcrtjh6VbMNLrmIOBYDhgim7mY6MIOF42+/4vL4VAgAh+QQJBQAWACwAAAAAdgALAIQEAgSUlpQ0NjTMysxUVlTs7uwcHhzExsSkoqRERkQMCgzc2tz09vRMTkycnpxkZmQkJiSkpqRMSkwMDgzk4uT8+vz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFSqAljmRpnmiqrmzrvnAsz3Rt37jKOImEVLmgcGgKKAAAhYPIbNogSKTASa22JlGAwcrtkgjZh3dsXSSSjQV57SwcDgW2fE6v21EhACH5BAkFACIALAAAAAB2AAsAhQQCBISChMTCxFRWVOTi5CwuLPTy9GxqbNTS1BQSFKSmpOzq7Pz6/HRydAwODJSSlMzOzGRmZDQ2NNza3AQGBMTGxFxeXOTm5PT29GxubNTW1BweHLy6vOzu7Pz+/HR2dJSWlDw6PP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZ8QJFwSCwaj8ikcslsOp/QqHRKrUY9lUEocLF6mZNM6KD5mkWIDWAdMZzfwo5kDZB04NUGHeBA4M8KFHsKf1MWexQVhV8gewAPi1EKewUEkVYQCXQOEJdPBg0OFAUcDJ5UHg9qGw8ep04YCAITrq9TDBoCGqa2vb6/wMF/QQAh+QQJBQAmACwAAAAAdgALAIUEAgSEhoQ8OjzExsTs6uwkIiRUVlSkpqQUEhTU1tT09vRERkQMCgycnpwsLixsamzMzsz08vS8vrzk4uT8/vxMTkw0NjQEBgSUkpREQkTMyszs7uxcWlwcGhzc2tz8+vxMSkwMDgykoqQ0MjRsbmzEwsT///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGdkCTcEgsGo/IpHLJbDqf0Kh0Sq1ao4SAwFCiXJmfA2jRUHzPVcUDwO5A0EkRg33BwO/PBILNJuGNFnwABX+FSRoXggaGQwWCDIyRQwQOgg2Sa3yLkpEUEpUhJBGSHhUMFxkenJIfEyUQZpwbGgMbq7e4ubq7q0EAIfkECQUAKQAsAAAAAHYACwCFBAIEhIKExMLEREJE5OLkJCYkpKKk1NLUZGJk9PL0FBYUjI6MDAoMzMrMVFJUNDY0tLa03Nrc/Pr8jIqM7OrsdHZ0PD48BAYEhIaExMbEREZE5ObkpKak1NbU9Pb0HBoclJaUDA4MzM7MVFZUPDo8vLq83N7c/P78fH58////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABnrAlHBILBqPyKRyyWw6n9CodEqtWq/KxMLigEiopgoJccCaz0sJCsBWlKYJDRtQoKDv+NTmMweMphAMfSB5hVgEF30WUxx9ACiGkVQJFn0YUx18cxmSnVEiDwAhCBtTJwYFAAoYJ56uThsCGR5VEh0CHV+vu7y9vr94QQAh+QQJBQAnACwAAAAAdgALAIUEAgSEhoTExsREQkQkIiTk5uS0srQUEhRkZmT09vScmpzU1tQ0MjQMCgxcWlzs7uyUkpRMSkwcGhx0cnT8/vykoqTc3tw8OjwEBgSMiozMyswsKizs6uzEwsT8+vycnpzc2tw0NjQMDgz08vRMTkwcHhx8enz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGesCTcEgsGo/IpHLJbDqf0Kh0Sq1ar1XL5IJYKD0G0gCSwJrP1ccAwN5wkgYRGxCgoO/4pQEzByiSa3MlI3mFhkIVfXRJDH0YD4eRdwsHcxgCSSZ9Ax6SnlgUHwQAEnVJBQ4iGCFen65VHiAdC51KDxodBa+7vL2+v1hBACH5BAkFACcALAAAAAB2AAsAhQQCBISGhMTGxERCROTm5CQiJGxubKyqrNza3BQWFPT29FRWVDw6PAwKDMzOzMTCxJSWlExKTPTy9CwqLHx+fLS2tOTi5Pz+/AQGBIyOjMzKzOzq7CQmJHRydKyurNze3BweHPz6/FxaXDw+PAwODNTS1ExOTP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZ8wJNwSCwaj8ikcslsOp/QqHRKrVqvWKECMogcFEUChSFyXLLotPWSAbhJB6Jk4QaAPuq8vhkC1QEjRAIkfwF7h4hECg1/HEQVfwAGiZR7FyZ/k0MWHH8VlaBqCAwYDQsWRCEenQkUYKGwWBsCAhJGIR8PDiGxvb6/wMFRQQAh+QQJBQAvACwAAAAAdgALAIUEAgSEgoTEwsRERkTk4uQkIiSsqqxkYmTU0tT08vQUEhScmpw0MjS0trR0dnTMysxUVlTs6uzc2tz8+vwcGhwMCgyMioxsbmw8Ojy8vrwEBgTExsRUUlTk5uQsLiysrqxkZmTU1tT09vQUFhScnpy8urx8enzMzsxcXlzs7uzc3tz8/vwcHhyMjow8Pjz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGoMCXcEgsGo/IpHLJbDqf0Kh0Sq0mIwEMZLOyepkIEOYiKU4aHJcl8XWKDoA4BdGuF1OeOMCVImYoeg4TdkonFXoADoSEJIgaH0QoiCMdi0gbGogolnUWiAAkRAOOKpxGHXl6BqZfG4dxI3RDnnoubKxDZ3kKFyK4VisWgCwLXUMRBxUaDA+/RBMqAieDzlUiIQIhxkQiJwKV1eHi4+TluEEAIfkECQUALQAsAAAAAHYACwCFBAIEhIaEREJExMbELCos5ObkZGJkFBIUtLa09Pb0VFJU3N7cNDY0nJqcDAoMzM7M7O7sdHJ0HBocTEpMNDI0xMLE/P78XF5cPD48pKKkBAYEjI6MREZEzMrMLC4s7OrsZGZkFBYUvLq8/Pr8VFZU5OLkPDo8nJ6cDA4M1NLU9PL0fH58HB4c////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABp3AlnBILBqPyKRyyWw6n9CodEqtWpEjhAKzUV2biQyHkxkVCwETaWD+upOiA2C+ar+PDcdccyImQHMAEg93hUQkgQAhH4ZGBIkERClygRGNhhiJGgWXRJRzIUQDGokXnXcBiQJepy0XpUQFFIkZrW4fFygAFIS2CxwOGhwLRBYijygRrLZXKh0VnMwtEAMDEEYjJRUPCdLe3+Dh4q1BACH5BAkFACcALAAAAAB2AAsAhQQCBISGhMzKzDw6POTm5BweHKyurFRWVPT29BQSFNza3JyanCwuLGRmZNTS1Ozu7AwKDLy+vPz+/BwaHKSipDQ2NGxubAQGBIyOjMzOzDw+POzq7CQiJFxaXPz6/BQWFOTi5JyenDQyNGxqbNTW1PTy9MTCxP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAabwJNwSCwaj8ikcslsOp/QqHRKrVqvJ4npMAg8qgrLoEEqarmBDXbNFkwAcAti+hjAAYzv0H0fzdmAVBZ3AAllUgYXhBREg3eGgZFRB4QXGVMLhAAYRJR3FwKSok2ZdyIEUw4Jn6FDIYQMaqOzSA8WqwwRVBILBQAFGB5EJbd4ERK0yUYIGSYEwlQeJCYk0ETMJiDWytzd3t/gykEAIfkECQUALAAsAAAAAHYACwCFBAIEjIqMxMbEPD485ObkZGJkJCYkrKqsFBIUnJqcTE5M9Pb03NrcDAoMlJKUREZE7O7sbG5szM7MNDI0vL68HB4cpKakXFpc/P785OLkBAYEjI6MzMrMREJE7OrsZGZkFBYUnJ6cVFJU/Pr83N7cDA4MlJaUTEpM9PL0dHZ0PDo8xMLE////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABpxAlnBILBqPyKRyyWw6n9CodEqtWq/MRehxsoyUi8OpY1oUIYGBiPLFut9JUwMAaISUhxJdsyGOUnQAICtwhYYsBoEAE0oDihVtLCQgiheHl1gIj0qJgRqRDBqKJ5ilVCKKBUoRigoYQxAqin2mtU8kHRoNJyRKGQolGgMMRQITACUfELbMTRACHMtLKAICHkcEKxIozd3e3+DhcEEAIfkECQUAJAAsAAAAAHYACwCFBAIEhIKETE5MxMLE5OLkJCIkbGpsFBYUpKak1NLU9PL0dHZ0PDo8tLK0/Pr8DA4MXFpczM7MLCosHB4c3NrcfH58BAYElJKUxMbE5ObkJCYkbG5sHBocrK6s9Pb0fHp8vLq8/P78XF5c3N7c////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABpxAknBILBqPyKRyyWw6n9CodEqtWq/RUATCqBCMhAVDlCg6tt0vds12UgqAOERBVAjigEKGSJngIR5tgoNFAXgADwNEIBaHF0QVhw8YhJWCG4cAIEQdjXgfRAaZm5alVw2HGiN8fnikQh2paqa0Uh4fBwAaHSFEDggaAAcVDkS3uRoNvbXMUGcDI8u+FAMJ0kMeEdDXzd3e3+DhVkEAIfkECQUAIQAsAAAAAHYACwCFBAIEhIKEREJExMbE5ObkNDY0fH58VFJU9Pb0FBIUtLK0DAoMTEpM1NLU7O7slJKUPD48XFpc/P78BAYEhIaEREZEzMrM7OrsPDo8/Pr8HBoctLa0DA4MTE5M1NbU9PL0XF5c////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABqXAkHBILBqPyKRyyWw6n9CodEqtFhHWLPPzgHQUmWJm04E8PtfuN6w9UiTtODFDAdg5iuImYQcE2CEZAX0JG3JFGmiHcQ4afQAMRR2PGg5DjY8di0MTlptaDguPBUUYjxMXQwQTo58hFViuVggVjwZFBo8CsSEIDLauHrJaDQUTHBEERQQgHBMFDUXFx8nD1lYXAxaeRR8WA8pGBNqK1+bn6Onq10EAIfkECQUALgAsAAAAAHYACwCFBAIEhIKExMLEREZE5OLkpKKkJCYkbGps1NLUtLK0FBIU9PL0XFpclJKUzMrMrKqsdHZ03NrcvLq8HBoc/Pr8DAoM7OrsPDo8ZGJkfH58BAYEhIaExMbETEpM5ObkpKakLCos1NbUtLa0FBYU9Pb0XF5clJaUzM7MrK6sfHp83N7cvL68HB4c/P78////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsZAl3BILBqPyKRyyWw6n9CodEqtWlWQCwZhfSIwF4jK6MlcGI5W8QSGELpw12IAqBsscaXHUAcMFkQLJX0sIUQWfHUdgHlUCRV9ACaNSCaRFSJEDpB9GUQNkRoSlFMfkQCepEUZpx9EKxqRGESskQ+qUSETkRy4RByRE4ZDBCCRKEQCkYW+Ty0FLBoTGxTNQhQBIwAGBWpDFCjGIxAkRBQZIxrc1dZNLRECCOXtLi0IAhHeRC0qAifs5u5FAEivoMGDCBNaCwIAIfkECQUAMQAsAAAAAHYACwCFBAIEhIKEREJExMLEJCIkZGJk5OLkpKakFBIUVFJU9Pb03NrcNDI0dHJ0vLq8DAoMlJKUTEpMzMrM7OrsHBocLCosbGpstLK0XFpc/P78PDo8fHp8BAYEjIqMREZExMbEJCYk5ObkrKqsFBYUVFZU/Pr83N7cvL68DA4MnJqcTE5MzM7M7O7sHB4cbG5sPD48fH58////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABrjAmHBILBqPyKRyyWw6n9CodEqtWqEhmAYjyVAVKU/kUCqWTolXh1UEi8nXOFSBAdhbCyqEY38cigMjdgANCkR7dih/coxLHyiDADBUBJEMRQWRIyZDGS2RGo2iSA6RABZUfIMERSqRHHlCJQ+RrKO3QwYgkSJUJJGoh6ATRK6Dwbi3GSIVAAgbhlMLLxwPKgZFIRaQDANF09XXyckZJh8r0VQsHxJsRgoSAyFHE+zu4/j5+vv8/U5BACH5BAkFADAALAAAAAB2AAsAhQQCBISChMTCxExOTOTi5CQiJKSipPTy9BQSFJSSlNTS1GxqbDQyNLy6vOzq7KyqrPz6/BwaHJyanNza3HR2dAwODIyOjMzKzGRiZCwuLDw6PAQGBISGhFRWVOTm5CQmJKSmpPT29BQWFJSWlNTW1GxubDQ2NLy+vOzu7KyurPz+/BweHJyenNze3Hx6fMzOzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbBQJhwSCwaj8ikcslsOp/QqHRKrVqvRAXGRCEsSQtNaWJ0cDQdAaQIFpOxcKynAKgPUEkUow4w4YchJXwiF0R6fBp/cYtSCXwAFQ1JBht8Gw9EJAiPC0QGj5eMolAujwApSRamI0QvlXwdRKqPrKO2SyePK29HLxV8FQpEDnt8Eq2/dcG3zEgQLiIbHwYqSRAJKwArI9VEJxmQJQdEEBYR2tzN6kUqCgIT3dYkAiTxQxAeAi8hRhDz9esCChxIsOC6IAAh+QQJBQAyACwAAAAAdgALAIUEAgSEgoRERkTEwsTk4uQkJiRkYmQUEhSkoqT08vRUVlTU0tQ0MjRsbmyUlpQMCgxMTkzMyszs6uwcGhz8+vwsLixsamy8urxcXlzc2tw8Ojx0dnScnpwEBgSMioxMSkzExsTk5uQsKixkZmQUFhSkpqT09vRcWlw0NjR0cnScmpwMDgxUUlTMzszs7uwcHhz8/vzc3tz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGvECZcEgsGo/IpHLJbDqf0Kh0Sq1ar0mXR6O4wIoUhEDAMRVhIIUmEAKLyWasfC40WQD4CajIWeEfDkULE3gAIwlEHA9/gXSOVhkHhYZFDJMFRSmTKwtEFZePoVMtHZMsRYSFK0UYkx17Q6l4B6K1TxIokypFBpMKRSWTFQREvYUntslMA58rDS5FMR8dDwIZRQkpKx0iFxREMQIPHQIxyudJIQMtcUUuESASRyYLAzFf7vDQ6Pz9/v8AHwUBACH5BAkFADUALAAAAAB2AAsAhQQCBISChMTCxERCROTi5CQiJKSipGRiZBQSFNTS1PTy9DQ2NJyanLSytHRydAwKDIyKjMzKzFRSVOzq7CwqLBwaHNza3Pz6/Ly6vHx6fDw+PFxaXAQGBISGhMTGxOTm5CQmJKyqrGRmZBQWFNTW1PT29Dw6PJyenLS2tHR2dAwODIyOjMzOzOzu7CwuLBweHNze3Pz+/Ly+vHx+fFxeXP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbGwJpwSCwaj8ikcslsOp/QqHRKrVqvyZhnY5pNjDCHSZQwKlYaCeqiTNBMKQJ2Pk9UAPhDidga4AEUX0MlGX8IMkkEL38SCnSPVCl/ACosRA0ckwxEHyOTEkkrkw+IkKZPB5MAHkQnqgFEBJl/A0mSkw2nukwGky4fRHZ/HKxDChqTEEkYky8wu9BIJQ4qHBQoMUQXJy8cFR3ZRBELlAeCRyUzniAh4dHvQxcsAjDu8RYCCWxGHwIRe0rk0dsHr6DBgwgTQgoCACH5BAkFADQALAAAAAB2AAsAhQQCBISGhERCRMTGxCQiJGRiZOTm5KyqrBQSFFRSVDQyNNTW1PT29JSSlHRydLy6vAwKDExKTMzOzCwqLBwaHFxaXDw6PHx6fIyOjPTy9LS2tNze3Pz+/AQGBIyKjERGRMzKzCQmJOzq7KyurBQWFFRWVDQ2NPz6/JSWlHR2dMTCxAwODExOTNTS1CwuLBweHFxeXDw+PHx+fOTi5P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa9QJpwSCwaj8ikcslsOp/QqHRKrVqvygwmltCciowRS4BiGCUwy2VGDY8bZqy8eZIB7ohHcYS4AzwcRDMEfiUZU3x+AYFzjUgGFH4AJUUCkhRxQgGSKypTH5Ivh46kgh2SMUUukh2ZNA6SABpTq34do6WlGTGSAUUpkhFfQxqSBBtTF8GuuY4SCgArMCJFBiUQHSYLYDJ9IQeMUTMlK9nbzc0GKiDMQhkgA9RGJxIDG+FS7yry6P3+/wAD/gsCACH5BAkFAC0ALAAAAAB2AAsAhQQCBIyKjERCRMTGxOTm5CQiJGRmZKyqrBQSFFRSVNTW1PT29DQyNLy6vAwKDExKTMzOzOzu7Hx6fJSWlLSytBweHFxaXNze3Pz+/Dw6PAQGBIyOjERGRMzKzOzq7CQmJHRydKyurBQWFPz6/MTCxAwODExOTNTS1PTy9Hx+fFxeXOTi5Dw+PP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa6wJZwSCwaj8ikcslsOp/QqHRKrVqvS4gqI1kZV5KMCmJcTASP0Ai7HDUSLDZ7VQDYEyhiJGEHFC5EGAF9JSFySSQidodXg30OJEQkJX0AAUQoFZUcjEcqfZ1VIJUAFEQhGpUgeg6VDKFFHKCwUg2VFYBDF3V9DUQLD6q0Qxuzw08LKYofBxhEIwcfACIpa0QKDBolFl7HEQYlGsdRIxAkF85FIxckENZFBAMdEeNCCx2R9fr7/P3+REEAACH5BAkFADMALAAAAAB2AAsAhQQCBISChMTCxERCROTi5CQiJKSmpGRiZBQSFNTS1JSWlPTy9ExOTDQ2NHRydAwKDIyKjMzKzLS2tBwaHNza3Pz6/ExKTOzq7CwqLJyenFRWVDw+PHx+fAQGBISGhMTGxERGROTm5KyurGRmZBQWFNTW1JyanPT29FRSVDw6PHR2dAwODIyOjMzOzLy6vBweHNze3Pz+/CwuLP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAafwJlwSCwaj8ikcslsOp/QqHRKrVqvy5NiwBBVihUJasNaGBOjlAOGbbudMQhgvhIVXYg5gPMdXjB6A2ZvhIVDJxN6AANFGookIUQKih0ShpdvJw+KMkUblAREAYoABpinVxUgiipFcnobg0IfHXokJai5VCUpHQ8akUQXB5sNEUUxHokvBn26z08XAh+yRAsfH8FgCQIUztDg4eLj5IVBACH5BAkFADAALAAAAAB2AAsAhQQCBISChMTCxDw+POTi5CQiJKSipGRiZNTS1PTy9BQSFJSSlFRSVDQyNLSytMzKzOzq7HRydNza3Pz6/BwaHAwKDIyKjExKTCwqLJyanLy+vAQGBISGhMTGxERCROTm5KyqrGRmZNTW1PT29BQWFFRWVDw6PLS2tMzOzOzu7HR2dNze3Pz+/BweHCwuLJyenP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAahQJhwSCwaj8ikcslsOp/QqHRKrVqvTNHBFJEYPwFTqcNSpiwDhmaCbbuTEAxg7kkRR4c5gIJITiJ6JAJvhIUZegAbDkQoCogqSSskiAeFlm0ciAAvRB2alUgSG4gXl6ZVHaNzJCJEBC6IBkkpJogWp7hRLBYkGwUZZUMTJ3IKKglKHS4bFSF2udBNEyICIsFELCsCKCNMH9vd0eLj5OXmpkEAIfkECQUALAAsAAAAAHYACwCFBAIEhIaEPDo8xMbE5ObkHB4cVFZUpKakFBIU1NbUlJaU9Pb0TEpMNDI0ZGZkDAoMzM7MnJ6c7O7sJCYkxMLEHBoc3N7c/P78VFJUbG5sBAYEjI6MREZEzMrM7OrsJCIkXFpcrKqsFBYU3NrcnJqc/Pr8TE5MNDY0bGpsDA4M1NLUpKKk////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABp1AlnBILBqPyKRyyWw6n9CodEqtWq/MRYTDWJWKJQpGEJBURxmBI4FtuxUPAOARKQ4qckBmMZUI8g1mboNUE3kADUUOhwhsUiEahyuElFEIhxVFGIcaKlMKhwAblaRNBocORaB5Jx5TKil5DxCltUkWHBoPDBZFEhmXDRRUJQoFAAUbF7bMRh4DHYJFCx0UvVUXIxQJX83e3+Dh4oNBACH5BAkFACwALAAAAAB2AAsAhQQCBISChMTCxExOTOTi5CQiJKSmpGRmZBQSFNTS1PTy9DQyNIyOjHRydLy+vBwaHNza3Pz6/Dw6PAwODMzOzFxeXOzu7KyurGxubJSWlAQGBIyKjMTGxFRWVOTm5CQmJKyqrGxqbBQWFNTW1PT29DQ2NJSSlHx6fBweHNze3Pz+/Dw+PP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAahQJZwSCwaj8ikcslsOp/QqHRKrVqvTUhIchgZLRtJxxHBMgmNVSVhbiMtJYB8YSFGMHKAiONGKgZ5BR59hCwgGnkABkQQIokHhUUOE4kMkW4ZiQCWQyOIeQOXQxeaDaJmCZRyExREFhKJGacsECiJDrNXKiYoGigMKkUCCwATIXWnKgYfeifBuVYqEAIjZUYEDhQk0BEpAgnW0OLj5OXmREEAIfkECQUAJwAsAAAAAHYACwCFBAIElJKUREJEzMrM5ObkJCIkZGZkrK6sFBIUVFJU9Pb03NrcDAoMpKakdHZ0xMLETEpM1NbU7O7sPDo8HB4cXFpc/P78BAYEnJqcREZEzM7M7OrsLCosbGpstLK0FBYU/Pr85OLkDA4MrKqsfH58xMbEXF5c////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABnnAk3BILBqPyKRyyWw6n9CodEqtWq9NUAOSwSiKlkFlQiJgz2h0gwEAXALFCKUNMH3T+PxzQgdQiiR9IgN6hYZHBX0XRQZ9AA+HkYcdfQlFI30cIZKceQsJDBcCEUUKDggAHAcWna1oEiUlG0cKGg8hrK66u7y9vpFBACH5BAkFACgALAAAAAB2AAsAhQQCBISChMTCxExKTOTi5CQmJKSipGxqbBQSFNTS1PTy9LSytMzKzFxaXHR2dBwaHPz6/AwKDOzq7Dw6PKyqrNza3Ly+vGRiZHx+fAQGBJSWlMTGxOTm5CwqLBQWFPT29LS2tMzOzFxeXHx6fBweHPz+/KyurNze3P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZ6QJRwSCwaj8ikcslsOp/QqHRKrVqvzpNjIkosOZhJg1HCms9UxQDALkiSnwYbQPKi73glKDMHaJIbCH0YeYWGQhR9AIRIFooXh5F3CSR9AkkEBX0mkp1YJQaaHgFlSBALBRkIDh+erlUQFQIhEEslBLO1r7u8vb6/eEEAIfkECQUAKAAsAAAAAHYACwCFBAIEhIKExMLEREJE5OLkJCYkZGJk9PL0FBIUpKKk1NLUXFpcDAoMTEpM7Ors/Pr8tLK03NrclJKUzMrMNDY0dHZ0HBocBAYEhIaExMbEREZE5Obk9Pb0rKqs1NbUDA4MTE5M7O7s/P78vLq83N7cPDo8fH58HB4c////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABnlAlHBILBqPyKRyyWw6n9CodEqtWq/OBwQ0kByqikWpQsCaz0vIB8DGiKabAhvQCKHveFRjDrDYpRJ8FyN5hVgUgn9RJnwAHYaQVIxzGhxTAnwnHpGcUBsLHxcUClQPJhYABQlvna1MBxkZDlYPCgIerK66u7y9vldBACH5BAkFACMALAAAAAB2AAsAhQQCBISChMTCxFxaXOTm5CQiJKSmpBQSFNTW1PT29GxubDQ2NLSytAwODJSSlMzOzOzu7CwqLBweHNze3Pz+/Hx6fAQGBMTGxGxqbCQmJKyurBQWFNza3Pz6/Dw6PLy6vJSWlPTy9Hx+fP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZ8wJFwSCwaj8ikcslsOp/QqHRKrVqvT0LFM3h0sEwOxoNBgM/T0ADAlkzQSMiCDVhA4HjmpUEHBPJFBn0WBoCGRgwWfRiHQg59ACCNkxMZfQyTD3xsDQ+TjRQaEQAHFQmTFA4SABIOFJ+NHRMCD6efHQgCCK+wvb6/wMFOQQAh+QQJBQAXACwAAAAAdgALAIQEAgSMjozMysw8Pjzk5uRcXlw0MjT08vQUEhTc3ty8urxUUlR0dnT8+vwEBgTMzsxERkTs7uxkZmT09vQUFhTk4uTEwsT///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFTeAljmRpnmiqrmzrvnAsz3Rt32+jLENw4MCgUGWhAI6MxnDJxBWOR0qlSa2+IFCAI2Htek2B7CDyLXsjEgTAYDG7rQeBhfCu2+/4fDUEACH5BAkFABkALAAAAAB2AAsAhAQCBISGhMzKzERCROzq7CQiJLSytJyanBwaHNTW1Pz6/AwKDGRmZDw6PKSipNze3AQGBIyKjOzu7CwqLMTCxJyenNza3Pz+/HRydP///wAAAAAAAAAAAAAAAAAAAAAAAAVOYCaOZGmeaKqubOu+cCzPdG3f9YM1TIL/wKBKMgAYJwShcokzQIzGA3NKfTmgxkB1yzUlEFAIpUvmKg4FACJwKbuplwQloXjb7/i8PhgCACH5BAkFABkALAAAAAB2AAsAhAQCBISChMTCxFRWVOTi5PTy9CwuLHRydBQSFMzOzPz6/KSmpGRmZOzq7AQGBMTGxFxeXOTm5PT29Dw6PHR2dBweHNTS1Pz+/Ly6vP///wAAAAAAAAAAAAAAAAAAAAAAAAVPYCaOZGmeaKqubOu+cCzPdG3f+Hk9wxREuaBwaLJUAEhGgchs1g5IJCLhrFpZkCjyce16RwutAfgtVwsHBMCAUZjfTUlCQJDA7/i8fq8KAQAh+QQJBQAXACwAAAAAdgALAIQEAgSMjoxUUlTU0tQkIiT08vSsqqx0dnQMDgy8vrzc3tw8Ojz8+vx8fnwEBgRcXlwkJiS0srR8enwUFhTEwsTk4uT8/vz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFTeAljmRpnmiqrmzrvnAsz3Rt3zg+PMtR5cCg0FQhAI6CwnDJrAWOR0SiSa2yDtBjxMrtjhJZgsJLrhYaEwDEwCi7mYxBQtF+2+/4fDkEACH5BAkFABkALAAAAAB2AAsAhAQCBIyKjMzKzERCROTm5DQ2NBQWFLS2tGRiZPTy9AwODOTi5FRSVMTCxPz6/AQGBIyOjMzOzOzq7Dw+PBwaHLy6vHx+fPT29FRWVP///wAAAAAAAAAAAAAAAAAAAAAAAAVNYCaOZGmeaKqubOu+cCzPdG3feE4n0MQcDp1wSMw4LICkoVJsOmUESjKJeVqvqcVjCphgv+DEhBsAm6+RAkCBIJzfTkJDkIDb7/g8LQQAOw==";
        $("#wrap").prepend("<span id='loader' style='position:fixed;display:block;padding:5px;display:none;'><img src='"+img+"'/></span>");
        //$("#wrap").prepend("<span style='position:fixed;display:block;padding:5px;border:1px solid grey;margin-top:20px;'><input type='checkbox' id='autoCheck' "+checked+" style='margin-right:10px;'/><span id='refresh_blocked' style='cursor:pointer;'>refresh blocked</span></span>");
        
        /* $("#autoCheck").click(function(){
                val = $(this).attr('checked');
                if(val==true){
                        autoCheck=1;
                        GM_setValue('autoCheck', 1);                        
                }else{
                        autoCheck=0;
                        GM_setValue('autoCheck', 0);                              
                }
        });     */   
        
      
    
        /*** ACTION     */
        $(".blockPerson").live('click',function(){
                $("#loader").css('display','block');
                dis = $(this);
                id = $(this).attr('id').split('_')[1];
                console.log(id);
                $.get("http://badoo.com/ws/contacts-move.phtml?cloud=1&user_id="+id+"&folder_type=Deleted&action=move_to&burl=badoo.com");
                dis.parent().hide('slow');  
                
                if(autoCheck==1){
                        setTimeout(function(){
                                getBlockedPeoples();
                        },1000)
                }else{                        
                        $("#loader").css('display','none');
                }
        });
    
        $("#refresh_blocked").click(function(){
                getBlockedPeoples();
                run();
        });
    
        /* DISABLE SPOTLIGHT */
        $("#spotlight").hide();
       // $(".spp-promo-button").hide();
        $("#footer").hide();
    

});       
