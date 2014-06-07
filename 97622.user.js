// ==UserScript==
// @name           IGM sender
// @namespace      ivicaSR
// @description    Poluautomatsko slanje IGMova
// @include        http://www.erepublik.com/*
// ==/UserScript==


var IDlist;
var MSGsubject;
var MSGtext;

var spisak_str="";
var MSGsubject_str = "";
var MSGtext_str = "";

var spisak_arr;
var msg_subject="";
var msg_message="";
function sendMessages() {
   var first = IDlist.split(",")[0];
   document.location.href = "http://www.erepublik.com/en/messages/compose/"+first;
}


function startSending() {
   if (unsafeWindow.startSendingVal==1) {
       //alert(1);
       IDlist = unsafeWindow.IDlist;
       MSGsubject = unsafeWindow.MSGsubject;
       MSGtext = unsafeWindow.MSGtext;
       //alert(MSGtext);
       
       GM_setValue('IDlist',IDlist);
       GM_setValue('MSGsubject',MSGsubject);
       GM_setValue('MSGtext',MSGtext);
       
       sendMessages();
       
   } else {
       setTimeout(startSending, 2000);
   }
}



var loc1 = document.location.href;
if (loc1.split("/")[4]=="igmsend") {
   //alert(1);
   //dodati polje za unos spiska IDova
   document.getElementsByTagName("body")[0].innerHTML = '<p>Uputstvo za upotrebu:</p>'+
                                                          '<p>Na ovoj stranici se nalaze 3 (slovima: tri) polja. U prvo polje (&quot;ID lista&quot;) se upisuje lista IDjeva, odvojenih zarezima, naloga kojima je potrebno poslati poruku.</p>'+
                                                          '<p>Primer: 2,3,1000000,12121212</p>'+
                                                          '<p>Ne ubacujte novi red ili bilo sta izmedju, dakle samo zarezi (zapete :P).</p>'+
                                                          '<p>U drugo polje (&quot;Subject&quot;) se upisuje naravno naslov poruke (maximalno 80 znakova, valjda je tako u erepu podeseno).</p>'+
                                                          '<p>U trece polje (&quot;Message&quot;) se upisuje poruka...</p>'+
                                                          '<p>Nakon toga potrebno je kliknuti na dugme &quot;Submit&quot;. Skripta ce sama poceti sa radom. Jedina vasa obaveza je da kada iskoci prozorcic usled pojave smrdljivog captcha-e upisete reci koje vidite na slici... I naravno kliknete OK. Taj prozorcic ce iskakati prilikom slanja svake pete poruke, pa je ipak potrebno nadgledati slanje poruka... Dakle nije potpuno automatski ali je jako olaksano...</p>'+
                                                          '<p>Nisam testirao jako dugacke poruke niti sam testirao poruke sa specijalnim znacima... Koga ne mrzi neka proba pa mi kaze sta se desilo :)</p>'+
                                                          '<p>&nbsp;</p>';
   document.getElementsByTagName("body")[0].innerHTML += '<form>\n' +
                                                          '<p>ID lista:</p>'+
                                                           '<label>\n' +
                                                          '<textarea name="IDlist" id="IDlist" cols="50" rows="10"></textarea>\n' +
                                                          '</label>\n' +
                                                          '<p>Subject:</p>'+
                                                           '<label>\n' +
                                                          '<input type"text" name="MSGsub" id="MSGsub" maxlength="80"></input>\n' +
                                                          '</label>\n' +
                                                          '<p>Message:</p>'+
                                                           '<label>\n' +
                                                          '<textarea name="MSGtext" id="MSGtext" cols="50" rows="10"></textarea>\n' +
                                                          '</label>\n' +
                                                          '<p>\n' +
                                                          '  <label>\n' +
                                                          '  <input type="button" id="IDsubmit" value="Submit" onclick="javascript:startSending();" />\n' +
                                                          '  </label>\n' +
                                                          '</p>\n' +
                                                        '</form>';
   
   //scriptCode.push(''        );
   var scriptCode = new Array();
   
   scriptCode.push('var startSendingVal=0;'        );
   scriptCode.push('var IDlist="";'        );
   scriptCode.push('var MSGsubject="";'        );
   scriptCode.push('var MSGtext="";'        );
   scriptCode.push('function startSending() {'        );
   //scriptCode.push('    alert(1);'        );
   scriptCode.push('    IDlist = document.getElementById("IDlist").value;'        );
   scriptCode.push('    MSGsubject = document.getElementById("MSGsub").value;'        );
   scriptCode.push('    MSGtext = document.getElementById("MSGtext").value;'        );
   //scriptCode.push('    alert(MSGtext);'        );
   scriptCode.push('    startSendingVal = 1;'        );
   scriptCode.push('}'        );
   
   var script = document.createElement('script');    // create the script element
   script.type="text/javascript"
   script.innerHTML = scriptCode.join('\n');         // add the script code to it
   scriptCode.length = 0;
   document.getElementsByTagName('head')[0].appendChild(script);
   
   
   setTimeout(startSending, 2000);
}




var IGM_sender_menu_item = "<li><a rel=\"nofollow\" href=\"http://www.erepublik.com/en/igmsend\">IGM sender</a></li>";
document.getElementById("menu4").getElementsByTagName("ul")[0].innerHTML+=IGM_sender_menu_item;


spisak_str = GM_getValue("IDlist","");
MSGsubject_str = GM_getValue("MSGsubject","");
MSGtext_str = GM_getValue("MSGtext","");
if (spisak_str!="") {
   spisak_arr = spisak_str.split(",");
   msg_subject = MSGsubject_str;
   msg_message = MSGtext_str;
   /*
   var spisak_str = "";
   if (GM_getValue("IGMlist","")=="") {
       alert(1);
       spisak_str = "";
       GM_setValue("IGMlist",spisak_str);
   } else {
       spisak_str = GM_getValue("IGMlist","");
   }

   var spisak_arr = spisak_str.split(",");
   alert(spisak_arr.length);
   var msg_subject = "test subject";
   var msg_message = "test poruka";*/

   var brojac=0;
   brojac = GM_getValue("brojac",0);

   //msg_subject += brojac;
   //msg_message += brojac;

   var loc1 = document.location.href;
   if (spisak_arr.length>0) {
       //alert(spisak_arr.length);
       if (loc1.split("/")[5]=="compose") {
           //alert(1);
           brojac++;
           GM_setValue("brojac", brojac);
           document.getElementById("message_subject").value = msg_subject;
           document.getElementById("message_body").value = msg_message;
           var content = document.getElementById("content");
           //alert(content.innerHTML);
           var sendpost = content.getElementsByClassName("sendpost largepadded")[0];
           //alert(sendpost.innerHTML);
           if (document.getElementById("recaptcha_widget_div")) {
               document.getElementById("logo").innerHTML = document.getElementById("recaptcha_image").innerHTML;
               var answer = prompt("Resi captcha sa stranice:","");
               document.getElementById("recaptcha_response_field").value = answer;
           }
           sendpost.submit();
       }
       if (loc1.split("/")[5]=="inbox") {
           //alert(1);
           document.location.href = "http://www.erepublik.com/en/messages/compose/"+spisak_arr[spisak_arr.length-1];
           spisak_arr.pop();
           spisak_str = spisak_arr.join(",");
           GM_setValue("IDlist",spisak_str);
       }
   }
}
//GM_setValue("brojac", 0);

