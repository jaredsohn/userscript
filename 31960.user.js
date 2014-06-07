// ==UserScript==
// @name           Calcolatore Risorse Travian
// @namespace      calcolatore_risorse
// @include        http://*.travian.*/*
// @exclude        http://www.travian.*/*
// @exclude        http://forum.travian.*/*
// @exclude        http://*.travian.*/manual.php*
// ==/UserScript==

lg="en";  // Change this Value For Change The Language - Cambia questo valore per cambiare il linguaggio...

html=new Array();
immagini=new Array();
lang=new Array();

lang['it']=Array('Disponibili alle:', 'Risorse attuali', 'Produzione', 'Costo edificio', 'Calcola tempo necessario!', 'Ora:');
lang['en']=Array('Aviable at:', 'Current', 'Production', 'Cost', 'Calculate time needed!', 'Now is:');

immagini['legno']="data:image/gif;base64,R0lGODlhEgAMAOYAAP%2F%2F%2F%2F%2F%2B%2Fv%2F%2B%2B%2F38%2B%2F369%2Fv6%2BfHt6e%2Fp4%2B7n4u%2Ff1OPc1tjUz9rTy9zRyNrQxfzIi%2FfEnvTEkdLGvfa%2Fi%2B%2FBcO6%2BbtK9pPSzgOe1g9e4lu%2B0b%2Bu1dvGxiNe4ht60eOqwdeSxd%2FqradCxguinb%2BWnatOnh9%2BmdOGked6jfuCmU9CnZrSqnuWgcNyicdija%2BaeYrukkdqgVNGbctGadeOXZM%2BafNibVuOXXLeeitGaXNWaVLWcjtKUd9qXSKmckK%2BbibWYfr%2BUedCUSN6OWteSQbWVft2NRdqJRtyKOsSLV6qPbMWKRL6HZ8GKRZ6MgbuJU8qDTKiJb72CVNZ%2BNLaBadt7OcF8T8l5SMZ1W8Z4Qq96UsdyPqx1UrB3PbB1P7BxTLtpMaNnPKRkO3tiTptQKHpYM5BSLoxOOGNRSIBJNoFIOHNKKnk7Kmw7LGc7H10zGk4yJ0M0KEUzJ1YsIlArFEUuH0wlEjgiGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAAASAAwAAAeRgACCg4SCChYIAYqFgytOPzUnTFRDVg6MAAtRJRA5ZW0xWGoEjEVaLDdgb2wbPHMGjDMtLhdpcF80WXE7jEo9HSAyZ1wjV2hAhQVjKFVINlBiEVtudweDA0EmE09hdHY6Lw9mcoUJRykfFV51FBgqQms%2BhQ1TRhxNTRJEIRokMJg4kpDxwABABildRAjAxLBhIAA7";
immagini['argilla']="data:image/gif;base64,R0lGODlhEgAMAOYAAJBcMPHWwMahh7R4VMdQHP727ci6sNt6VqtlPsltT%2Brl48JrQtivpbaIZ96FXI9YSOjGr%2Bm1iNphNrxqPvPr3dGomc14VOVsSZxxSeCeduPHvPB8S9u%2BsqFWLubhwLteNP%2F%2F%2F8iwlNJpRcmKacldMNdrNeSJY9JuS6VkT%2B17U9CCWt62l92HTcl5Wvjz8PjdxeDEvLxwUfTQsKZhPNephfHg2JNhROrYz9jCs8OWduFpKtW3pZtzWu%2Fmz8xvS%2FB%2BW8lyQOzMsfR%2BQ%2BqDVqxmTPDHp%2Ffy6%2BZrQMyZZrdtS%2BR1U86betSunNh9WeaWaNFgK9uzo7%2BPcei0kp5bOtdxOeR6S869tNBZF%2F%2F69o9jVu6BPqVbN8SRZvKQYOJ2SeHRx61jQeTPvfDh29a2qs1ySs2DYNh%2BUu6GVMxyQpNaOPLWxdBrP7eLdOa1jORmN%2BZzSr9jNNCslNyynMOAXfb19PTjyaRmQevYzqN1V%2BaLVb1rSv%2F%2F%2FwAAAAAAAAAAAAAAACH5BAUUAHsALAAAAAASAAwAAAeygHuCglhYg4eIg3Q5RWFhAS8FiYcKAxF4KAlmQZOCODtsNHMnKV1FnXsCMhQhZSYZEVxxapKDYndLIzwDJGQ2aWA%2BDhCHVnUQIxNUWiwICwcpVSuHBh49UWhvZ05JTUpKXipyhntWGA0qJVMAM3pAWw9EC2ZSRntfHXAlQjN2FiJVwGRp8WNDnhp7bnwgcEUHmglrJLghE%2BPJkQtDEGIZU4EJkzAcGDBgogEGFCgMOLgIBAA7";
immagini['ferro']="data:image/gif;base64,R0lGODlhEgAMAOYAAA4SDOvhzaaOdXZrXM%2FEtFJKPv%2F%2F%2F7Ozqj05NIR5aPDu62VXT%2BjeyTAkFYZuXKWXkV9JM5yEb9nSynZuaCQiG8y%2Fr%2B3n45N8bGlUQ6OSgVZTTd%2Ff3Ec4MYtzZPr38q6bkSEbGMK1pW5XSD8xItvOxIuFepmGeOXXvH5zcHpnVGZWRkxBMrWjlK%2Bbj2lkVOTe1%2FLlyF1JOYBxXMO2raCLcz0rGCkhGUM5Mt3TyaORe3VwZurl4HxtXPn49%2Fbx7JRzY0dEPYt7amZfUpaCbsvGv7%2B3sDInHJqFcR4hH3JVQ1NRUK6gmpmJfHZjUPDmzVlLRYFzZEJCMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAYALAAAAAASAAwAAAeFgAaCg4SFhocWPoeLGxo6BAEMAYceOEsPSkgALicwToUKFSEVHxw2FFEFMzgHhAoJPBAtLCkqIUcrQAVChEUYTTEdOQIXDwsNHAMjhDNJPEFQCUMiIDc1ND8OhDsdHSsoCAMZRkwXIYczDilPICsyQjMkiwoZESYTJUQ9PYuCPS8S%2BPULBAA7";
immagini['grano']="data:image/gif;base64,R0lGODlhEgAMAOYAAIhNJfn05%2BLHqcyogumqOqKFYuGRKvvlxLp3Jt%2BybP%2F%2F%2F%2BDEicSISODQwPHp3%2BGqY%2BvGj821ncORQ%2Fj39OGfT%2BCpUPHIdu7Xr%2FHavNx7GujHnPPo1cWgbtezjfG6W6JSFtvBpvfw6NiBKv778LiQZ%2Bzdw%2FDXs96%2BoPKWI%2BurUOjUtuy8Qfvq0%2F%2F13ujRhPjIbOW2ctS1g%2F%2Fmxfzx4d7Fn8mMWuzRn82NNvbbqfrt0vHNgObYvNq9jP%2F89uiULvTZvOfNlv%2F55vz59ezgtv%2Fx5evbzPbq2Y1VJfjsxt7FlPfm3vLGefTAXd69pfCyVeTKivG3dvvo0f%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAFIALAAAAAASAAwAAAeCgFKCUkIhg4KFh4obMTlGIBsbJyo9ij0BQTQ8NkkcAxdAFwIHAYMBQ0gLC086LzAQHT8CKqWDPTsRGC4eK0wWF0QNIFGHMyVFRjhOBChLI4rQUgESCB8k0dATBUcANZXYgyMPIhk%2BLeCDQlApBhQs6IINCRU3DBrf4A4HJiYltYeBAAA7";

html['body']=document.body;

function Immagine(obj){
return '<img src="'+immagini[obj]+'" alt="" />';
}


html['table']=document.createElement('div');
html['table'].innerHTML='<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<table><tr><td>'+lang[lg][0]+'<br/>'+lang[lg][5]+'</td><td><iframe name="esecutore" style="height: 40px; width: 200px; border:hidden;"></iframe></td></tr></table><form name="a" action="http://matt93.altervista.org/travian/risorse/GM_plugin.php" target="esecutore" method="post"><div id="input"><h3>'+lang[lg][1]+'</h3>'+Immagine('legno')+'<input name="attuale_legno" style="width: 50px;" value="'+'" />'+Immagine('argilla')+'<input style="width: 50px;" name="attuale_argilla" />'+Immagine('ferro')+'<input style="width: 50px;" name="attuale_ferro" />'+Immagine('grano')+'<input style="width: 50px;" name="attuale_grano" /><h3>'+lang[lg][2]+'</h3>'+Immagine('legno')+'<input style="width: 50px;" name="produzione_legno" />'+Immagine('argilla')+'<input style="width: 50px;" name="produzione_argilla" />'+Immagine('ferro')+'<input style="width: 50px;" name="produzione_ferro" />'+Immagine('grano')+'<input style="width: 50px;" name="produzione_grano" /><h3>'+lang[lg][3]+'</h3>'+Immagine('legno')+'<input style="width: 50px;" name="costo_legno" />'+Immagine('argilla')+'<input style="width: 50px;" name="costo_argilla" />'+Immagine('ferro')+'<input style="width: 50px;" name="costo_ferro" />'+Immagine('grano')+'<input style="width: 50px;" name="costo_grano" /><br/><input type="submit" value="'+lang[lg][4]+'" /></div></form>';

html['body'].parentNode.insertBefore(html['table'], html['body'].nextSibling);