 // ==UserScript== / / == == UserScript 
                     // @name          Travian Multi crop finder / / @ Name Travian Multi memotong finder 
                     // @description   Script shows villages, that have 9 or 15 crop fields. / / @ Description Script desa menunjukkan, bahwa ada 9 atau 15 bidang tanaman. By remiusba@gmail.com Oleh remiusba@gmail.com 
                     // @include       http://s*.travian.*/*kart* / / @ Termasuk http://s *. travian .* / * * kart 
                    
                     // ==/UserScript== / / == / UserScript == 
                    
                     /** / ** 
                     Changelog: ChangeLog: 
                     - 2007-08-22: version 1.0 - 2007/08/22: versi 1.0 
                     - 2007-08-22: version 1.1 - Repaired bug causing crash when found not occupied village - 2007/08/22: versi 1,1 - diperbaiki bug yang menyebabkan crash ketika ditemukan tidak menduduki desa 
                     - 2007-11-08: version 1.2 - Added new regexp, showing now 'Abandoned walley' instead of 'Site: ##' + some bugs repaired - 2007/11/08: versi 1.2 - Ditambahkan regexp baru, kini muncul 'Abaikan walley' dan 'Situs: # #' + beberapa bug diperbaiki 
                     */ * / 
                    
                     var counter = 0; var counter = 0; 
                    
                     function processReqChange(req, mapIndex) { fungsi processReqChange (req, mapIndex) ( 
                      if (req.readyState == 4) { If (req.readyState == 4) ( 
                       if (req.status == 200) { If (req.status == 200) ( 
                        var reqTxt = req.responseText; Var reqTxt = req.responseText; 
                        myInfo('.'); MyInfo ('.'); 
                        if (reqTxt.indexOf('div id="f6"') > -1 || If (reqTxt.indexOf ( 'div id = "d6"')> -1 | | 
                         reqTxt.indexOf('div id="f1"') > -1){ ReqTxt.indexOf ( 'div id = "f1"')> -1) ( 
                         //this is multicrop!!! / / Ini adalah multicrop! 
                         var re = new RegExp('<div.*<h1>(.*)<\/h1>', 'g'); var re = new RegExp ( '<div <h1> (.*)< .* \ / h1>', 'g'); 
                         var myArray = re.exec(reqTxt); Var myArray = re.exec (reqTxt); 
                         if (myArray && myArray[1]){ If (myArray & & myArray [1]) ( 
                          myInfo('<br><a href="' + myAreas[mapIndex].href + '">' + myArray[1] + '</a><br>'); myInfo ( '<a href="' <br> myAreas[mapIndex].href + +'">' + myArray [1] + '</ a> <br>'); 
                         } else { ) Else ( 
                          myInfo('<br><a href="' + myAreas[mapIndex].href + '">Site No.:' + counter + '</a><br>'); myInfo ( '<br> <a href="' + +'"> Situs myAreas[mapIndex].href No: "+ counter +' </ a> <br> '); 
                         } ) 
                        } ) 
                    
                           found = false; Found = false; 
                        do { Do ( 
                         if (counter <= (myAreas.length - 1)){ If (counter <= (myAreas.length - 1)) ( 
                          if (myAreas[counter]){ If (myAreas [counter]) ( 
                           var ret = myAreas[counter].href; Var ret = myAreas [counter]. Href; 
                           if (ret.indexOf('karte.php?d=') > -1) { If (ret.indexOf ( 'karte.php? D =')> -1) ( 
                            found = true; Ditemukan = true; 
                            loadXMLDoc(ret, counter); LoadXMLDoc (ret, counter); 
                           } ) 
                          } ) 
                         } else { ) Else ( 
                          found = true; Ditemukan = true; 
                          myInfo('<br><b>Finished:</b>' + getDateString() + '<br>'); myInfo ( '<br> <b> Selesai: </ b>' + getDateString () + '<br>'); 
                         } ) 
                         counter++; Counter + +; 
                        } while (found == false) ) While (ditemukan == false) 
                       } else { ) Else ( 
                          myInfo("There was a problem retrieving the XML data:\n" + req.statusText); myInfo ( "Ada masalah mengambil XML data: \ n" + req.statusText); 
                       } ) 
                      } ) 
                     } ) 
                    
                     function loadXMLDoc(myUrl, mapIndex) { fungsi loadXMLDoc (myUrl, mapIndex) ( 
                      if (window.XMLHttpRequest) { If (window.XMLHttpRequest) ( 
                       req = new XMLHttpRequest(); Req = new XMLHttpRequest (); 
                       req.onreadystatechange = function() {processReqChange(req, mapIndex)}; req.onreadystatechange = function () (processReqChange (req, mapIndex)); 
                       req.open("GET", myUrl, true); Req.open ( "GET", myUrl, true); 
                       req.send(null); Req.send (null); 
                      } else if (window.ActiveXObject) { ) Else if (window.ActiveXObject) ( 
                       req = new ActiveXObject("Microsoft.XMLHTTP"); Req = new ActiveXObject ( "Microsoft.XMLHTTP"); 
                       if (req) { If (req) ( 
                        req.onreadystatechange = processReqChange; Req.onreadystatechange = processReqChange; 
                        req.open("GET", myUrl, true); Req.open ( "GET", myUrl, true); 
                        req.send(); Req.send (); 
                       } ) 
                      } ) 
                     } ) 
                    
                     function myInfo(textInfo){ fungsi myInfo (textInfo) ( 
                      infoDiv.innerHTML += textInfo; InfoDiv.innerHTML + = textInfo; 
                     } ) 
                    
                     function addInfoDiv(){ fungsi addInfoDiv () ( 
                      infoDiv = document.createElement('div'); InfoDiv = document.createElement ( 'div'); 
                      infoDiv.style.margin = "2em 0em 0em"; InfoDiv.style.margin = "2em 0em 0em"; 
                      var sExpr = "//div[@id=\"map_content\"]" Var sExpr = "/ / div [@ id = \" map_content \ "]" 
                      var xpath = document.evaluate(sExpr, document, null, XPathResult.ANY_TYPE, null); var xpath = document.evaluate (sExpr, dokumen, null, XPathResult.ANY_TYPE, null); 
                      var item = xpath.iterateNext(); Var item = xpath.iterateNext (); 
                      item.appendChild(infoDiv); Item.appendChild (infoDiv); 
                     } ) 
                    
                     function getDateString(){ fungsi getDateString () ( 
                      var datum = new Date(); Datum var = new Tanggal (); 
                      var ret = ''; Var ret =''; 
                      ret += datum.getHours() + ':' + datum.getMinutes() + ':' + datum.getSeconds(); ret + = datum.getHours () + ':' + datum.getMinutes () + ':' + datum.getSeconds (); 
                      return ret; Return ret; 
                     } ) 
                    
                     function mapClearEventsFromArrows() { fungsi mapClearEventsFromArrows () ( 
                      var sXpathExpr = "//div[@id='map_content']//area[@title]"; var sXpathExpr = "/ / div [@ id = 'map_content'] / / daerah [@ title]"; 
                      var xpathRes = document.evaluate(sXpathExpr, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var xpathRes = document.evaluate (sXpathExpr, dokumen, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
                      for (var i = 0; i < xpathRes.snapshotLength; ++i) { for (var i = 0; i <xpathRes.snapshotLength; + + i) ( 
                       var el = xpathRes.snapshotItem(i); Var el = xpathRes.snapshotItem (i); 
                       // remove onclick because it calls Ajax preventing distance from displaying / / Menghapus onclick karena panggilan jarak dari Ajax mencegah menampilkan 
                       el.removeAttribute("onclick"); El.removeAttribute ( "onclick"); 
                      } ) 
                     } ) 
                    
                     function mapDoubleScroll() { fungsi mapDoubleScroll () ( 
                      var colAdds = [-801, 1, 801, -1]; Var colAdds = [-801, 1, 801, -1]; 
                      var sXpath = "//div[@id='map_content']//area[@title]"; var sXpath = "/ / div [@ id = 'map_content'] / / daerah [@ title]"; 
                      var xpathRes = document.evaluate(sXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var xpathRes = document.evaluate (sXpath, dokumen, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
                      for (var i = 0; i < xpathRes.snapshotLength; ++i)    { for (var i = 0; i <xpathRes.snapshotLength; + + i) ( 
                       var el = xpathRes.snapshotItem(i); Var el = xpathRes.snapshotItem (i); 
                       var nIdx = el.href.indexOf("=") + 1; Var nIdx = el.href.indexOf ("=") + 1; 
                       var nPos = el.href.substr(nIdx) - 0; // index of map field var nPos = el.href.substr (nIdx) - 0; / / indeks peta bidang 
                       nPos += colAdds[i % 4] * (Math.floor(i / 4) + 6); nPos + = colAdds [i% 4] * (Math.floor (i / 4) + 6); 
                       el.href = el.href.substr(0, nIdx) + nPos; El.href = el.href.substr (0, nIdx) + nPos; 
                      } ) 
                     } ) 
                    
                     var myMap = document.getElementsByTagName('map')[1]; var myMap = document.getElementsByTagName ( 'peta') [1]; 
                     var infoDiv; var infoDiv; 
                     if (myMap) { if (myMap) ( 
                      // map enhancements, taken from http://camlost.wz.cz/greasemonkey/, bloody good code :-)/ / / Peta tambahan, diambil dari http://camlost.wz.cz/greasemonkey/, berdarah baik kode :-) / 
                      mapClearEventsFromArrows(); MapClearEventsFromArrows (); 
                      mapDoubleScroll(); MapDoubleScroll (); 
                      //I am on the right page with map, so let's search :-) / / Saya di sebelah kanan halaman dengan peta, jadi mari kita cari :-) 
                      addInfoDiv(); AddInfoDiv (); 
                      myInfo('<b>Start:</b>' + getDateString() + '<br>'); myInfo ( '<b> Mulai: </ b>' + getDateString () + '<br>'); 
                      var myAreas = myMap.getElementsByTagName('area'); var myAreas = myMap.getElementsByTagName ( 'daerah'); 
                      found = false; Found = false; 
                      do { Do ( 
                       if (myAreas[counter]){ If (myAreas [counter]) ( 
                        var ret = myAreas[counter].href; Var ret = myAreas [counter]. Href; 
                        if (ret.indexOf('karte.php?d=') > -1) { If (ret.indexOf ( 'karte.php? D =')> -1) ( 
                         loadXMLDoc(ret, counter); LoadXMLDoc (ret, counter); 
                         found = true; Ditemukan = true; 
                        } ) 
                        counter++; Counter + +; 
                       } ) 
                      } while (found == false) ) While (ditemukan == false) 
                     } ) 