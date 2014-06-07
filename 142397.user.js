// ==UserScript==
// @name          RPPartage fix for PNJ
// @namespace     http://www/
// @description   Description
// @include       http://www.univers-rr.com/RPartage/index.php*
// ==/UserScript==
//
//
unsafeWindow.ok = function (Src){
        var ready = true;
if (ready) {
            if (ready) {
                document.getElementById("control").innerHTML = Src;
                var cells = document.getElementById("control").getElementsByTagName("table");
                for (var i = 0; i < cells.length; i++) {
                    var status = cells[i].className;

                    if(status == "forumline")
                    {
                        var lignes = cells[i].getElementsByTagName("td");
                        for (var j = 0; j < lignes.length; j++)
                        {
                            var class_ligne = lignes[j].className;
                            if((class_ligne == "row1")||(class_ligne == "row2"))
                            {
                                var width_ligne = lignes[j].getAttribute("width");
                                var valign = lignes[j].getAttribute("valign");
                                if((width_ligne == "150")&&(valign == "top"))
                                {
                                    var span = lignes[j].getElementsByTagName("span");
                                    if(unsafeWindow.ndd == "off")
                                    {
                                        var boldi = span[0].getElementsByTagName("b");
                                    }
                                    else
                                    {
                                        var boldi = span[0].getElementsByTagName("strong");
                                    }

                                    if(boldi.length > 0)
                                    {
                                        var avatar = span[boldi.length].getElementsByTagName("img");
                                        if(unsafeWindow.final1 != "")
                                        {
                                            unsafeWindow.final1 = unsafeWindow.final1 + "</div></div>";
                                        }
                                        unsafeWindow.final1 = unsafeWindow.final1 + '<div class="post"><div class="auteur">';

                                        if(boldi[boldi.length -1].childNodes[0].nodeValue != null){
                                            unsafeWindow.final1 = unsafeWindow.final1 + "<strong>" + boldi[boldi.length -1].childNodes[0].nodeValue + "</strong><br />";
                                        }else{
                                            if (boldi[0].getElementsByTagName("span").length > 0) {
                                                var myspan = boldi[0].getElementsByTagName("span")[0];
                                                unsafeWindow.final1 = unsafeWindow.final1 + '<strong style="color: ' + myspan.style.color + '">' + myspan.innerHTML + "</strong><br />";
                                            } else {
                                                unsafeWindow.final1 = unsafeWindow.final1 + "<strong>" + boldi[0].getElementsByTagName("a")[0].childNodes[0].nodeValue + "</strong><br />";
                                            }
                                        }


                                        for(var n = 0; n < avatar.length; n++)
                                        {
                                            if(avatar[n].getAttribute("alt") == "")
                                            {
                                                unsafeWindow.final1 = unsafeWindow.final1 + "<img src='" + unsafeWindow.avatar_src(avatar[n].src) + "' />";
                                            }
                                        }

                                        unsafeWindow.final1 = unsafeWindow.final1 + "</div>";
                                    }

                                }
                                else
                                {
                                    if(unsafeWindow.ndd == "off")
                                        var span2 = lignes[j].getElementsByTagName("span");
                                    else
                                        var span2 = lignes[j].getElementsByTagName("div");
                                    var flag = 0;
                                    for(var k = 0; k < span2.length; k++)
                                    {
                                        var class_span = span2[k].className;
                                        if(class_span == "postbody")
                                        {
                                            if(flag == 0) { unsafeWindow.final1 = unsafeWindow.final1 + "<div class='message'>"; }
                                            flag++;
                                            unsafeWindow.final1 = unsafeWindow.final1 + "<div class='texte'>";
                                            unsafeWindow.final1 = unsafeWindow.recurs_text(span2[k], unsafeWindow.final1);
                                            unsafeWindow.final1 = unsafeWindow.final1 + "</div>";
                                        }
                                        if(class_span == "genmed")
                                        {
                                            if(unsafeWindow.profondeur == 0)
                                            {
                                                unsafeWindow.final1 = unsafeWindow.final1 + "<div class='quote'><strong>" + span2[k].getElementsByTagName("b")[0].childNodes[0].nodeValue + "</strong><br />";
                                                unsafeWindow.final1 = unsafeWindow.final1 + "<div class='quote_text'>";
                                                unsafeWindow.final1 = unsafeWindow.recurs_text(span2[k].parentNode.parentNode.parentNode.getElementsByTagName("td")[1], unsafeWindow.final1);
                                                unsafeWindow.final1 = unsafeWindow.final1 + "</div></div>";
                                            }
                                            else
                                            {
                                                unsafeWindow.profondeur--;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if(unsafeWindow.final1 != "")
                        {
                            unsafeWindow.final1 = unsafeWindow.final1 + "</div></div>";
                        }

                    }
                }

            } else {
                alert('Un probl�me est survenu avec la requ�te. Status='+http_request.status);
            }
        }

}

