// ==UserScript==
// @name           GPS[GW]
// @namespace      document, form
// @description    GPS on main page
// @author         Orcer (редакция sp3ctr3) 
// @include        http://www.ganjawars.ru/me/*
// ==/UserScript==

(function()
{ 
  var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
  
  //current island
  var isS = false;
  var isG = false;
  var isZ = false;
  var isP = false;
  
  //add link to harbor
  var a = root.document.getElementsByTagName('a');
  var found = false;
  var harborLink = '';
  var outmoveLink = '';
  var overmoveLink = '';
  for (i = 0; i < a.length; i++)
  {
    if ((a[i].href.indexOf('/map.php?sx=') != -1) && ((a[i].innerHTML.indexOf('[Z]') != -1) || (a[i].innerHTML.indexOf('[G]') != -1) || (a[i].innerHTML.indexOf('[S]') != -1)))
    {
      if (a[i].innerHTML.indexOf('[Z]') != -1)
      {
        isZ = true;
      }
      
      if (a[i].innerHTML.indexOf('[G]') != -1)
      {
        isG = true;
      }

      if (a[i].innerHTML.indexOf('[S]') != -1)
      {
        isS = true;
      }
      
      if (a[i].innerHTML.indexOf('[P]') != -1)
      {
        isP = true;
      }

      //Z
      if (a[i].href.indexOf('/map.php?sx=151&sy=150') != -1)
      {
        //Energy One      
        harborLink = 'http://www.ganjawars.ru/object.php?id=22137';
        outmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=12&sectorout=10&confirm=1';
		overmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=13&sectorout=10&confirm=1';
        found = true;
      }
      
      if (a[i].href.indexOf('/map.php?sx=151&sy=152') != -1)
      {
        //Freedom End      
        harborLink = 'http://www.ganjawars.ru/object.php?id=12083';
        outmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=12&sectorout=9&confirm=1';
		overmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=13&sectorout=9&confirm=1';
        found = true;
      }
      
      if (a[i].href.indexOf('/map.php?sx=149&sy=152') != -1)
      {
        //Grand Port     
        harborLink = 'http://www.ganjawars.ru/object.php?id=55915';
        outmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=12&sectorout=11&confirm=1';
		overmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=13&sectorout=11&confirm=1';
        found = true;
      }
      
      if (a[i].href.indexOf('/map.php?sx=152&sy=148') != -1)
      {
        //Cygnus Base      
        harborLink = 'http://www.ganjawars.ru/object.php?id=68978';
        outmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=12&sectorout=8&confirm=1';
		overmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=13&sectorout=8&confirm=1';
        found = true;      
      }
            
      if (a[i].href.indexOf('/map.php?sx=149&sy=149') != -1)
      {
        //Power Lost      
        harborLink = 'http://www.ganjawars.ru/object.php?id=68977';
        outmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=12&sectorout=7&confirm=1';
		overmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=13&sectorout=7&confirm=1';
        found = true;      
      }   
      
      //G
      if (a[i].href.indexOf('/map.php?sx=52&sy=50') != -1)
      {
        //Green Parks
        harborLink = 'http://www.ganjawars.ru/object.php?id=11712';
        outmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=12&sectorout=0&confirm=1';
		overmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=13&sectorout=0&confirm=1';
        found = true;
      }

      if (a[i].href.indexOf('/map.php?sx=49&sy=53') != -1)
      {
        //Failure of perl     
        harborLink = 'http://www.ganjawars.ru/object.php?id=11718';
        outmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=12&sectorout=1&confirm=1';
		overmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=13&sectorout=1&confirm=1';
        found = true;
      }

      if (a[i].href.indexOf('/map.php?sx=50&sy=47') != -1)
      {
        //Seaside walleys      
        harborLink = 'http://www.ganjawars.ru/object.php?id=11739';
        outmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=12&sectorout=2&confirm=1';
		overmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=13&sectorout=2&confirm=1';
        found = true;
      }
      
      if (a[i].href.indexOf('/map.php?sx=47&sy=49') != -1)
      {
        //Sheever place     
        harborLink = 'http://www.ganjawars.ru/object.php?id=68982';
        outmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=12&sectorout=3&confirm=1';
		overmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=13&sectorout=3&confirm=1';
        found = true;      
      }
      
      if (a[i].href.indexOf('/map.php?sx=47&sy=52') != -1)
      {
        //Red point      
        harborLink = 'http://www.ganjawars.ru/object.php?id=68981';
        outmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=12&sectorout=4&confirm=1';
		overmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=13&sectorout=4&confirm=1';
        found = true;            
      }        
      
      if (a[i].href.indexOf('/map.php?sx=53&sy=53') != -1)
      {
        //Black Brooklyn      
        harborLink = 'http://www.ganjawars.ru/object.php?id=68983';
        outmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=12&sectorout=5&confirm=1';
		overmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=13&sectorout=5&confirm=1';
        found = true;        
      }       
      
      //S
      if (a[i].href.indexOf('/map.php?sx=99&sy=100') != -1)
      {
        //Dolphin Port      
        harborLink = 'http://www.ganjawars.ru/object.php?id=11717';
        outmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=12&sectorout=6&confirm=1';
		overmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=13&sectorout=6&confirm=1';
        found = true;
      }     
      
      //P
      if (a[i].href.indexOf('/map.php?sx=125&sy=75') != -1)
      {
        //Palm Airport
        harborLink = 'http://www.ganjawars.ru/object.php?id=69403';
        outmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=12&sectorout=14&confirm=1';
		overmoveLink = 'http://www.ganjawars.ru/map.move.php?seaway=1&sectorin=13&sectorout=14&confirm=1';
        found = true;
      }     
      
      if (found)
      {	  
	    var overmove = root.document.createElement('a');
        overmove.setAttribute("href", overmoveLink);
        overmove.setAttribute("style", 'text-decoration: none');        
        overmove.innerHTML = "&nbsp;<img border=0 src='data:image/gif;base64,R0lGODlhCgAKANX/AJCwt2qQkXWZmv7///v8/ER4cHmXkld7c2uPhoigllN4aHuVild4aFp9a1h5aPT29U5vWlNzXlR0X1Z1YV98aUJmTklrVElqVExtV05vWU1uWFd1YVx6ZnCLeU1uV01tV05uWFBwWkhoUGaBbWqEcfL08v3+/fr7+vb39v////7+/v39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAACgAKAAAGSMCUkIDxaEBIYQpxUKI+ygepoARhrhhRQLnBCEeCFEBByHg7jJQBosFYvImMQ3JJNVbe1GKiCg1MKXknBCUVShgRHBSLEStCQQA7' alt='Overlord Point'/>&nbsp;";
        a[i].parentNode.insertBefore(overmove, a[i]);
		
        var outmove = root.document.createElement('a');
        outmove.setAttribute("href", outmoveLink);
        outmove.setAttribute("style", 'text-decoration: none');        
		outmove.innerHTML = "&nbsp;<img border=0 src='data:image/gif;base64,R0lGODlhCgAKAFD/ACwAAAAACgAKAIcAAAAAADMAAGYAAJkAAMwAAP8AKwAAKzMAK2YAK5kAK8wAK/8AVQAAVTMAVWYAVZkAVcwAVf8AgAAAgDMAgGYAgJkAgMwAgP8AqgAAqjMAqmYAqpkAqswAqv8A1QAA1TMA1WYA1ZkA1cwA1f8A/wAA/zMA/2YA/5kA/8wA//8zAAAzADMzAGYzAJkzAMwzAP8zKwAzKzMzK2YzK5kzK8wzK/8zVQAzVTMzVWYzVZkzVcwzVf8zgAAzgDMzgGYzgJkzgMwzgP8zqgAzqjMzqmYzqpkzqswzqv8z1QAz1TMz1WYz1Zkz1cwz1f8z/wAz/zMz/2Yz/5kz/8wz//9mAABmADNmAGZmAJlmAMxmAP9mKwBmKzNmK2ZmK5lmK8xmK/9mVQBmVTNmVWZmVZlmVcxmVf9mgABmgDNmgGZmgJlmgMxmgP9mqgBmqjNmqmZmqplmqsxmqv9m1QBm1TNm1WZm1Zlm1cxm1f9m/wBm/zNm/2Zm/5lm/8xm//+ZAACZADOZAGaZAJmZAMyZAP+ZKwCZKzOZK2aZK5mZK8yZK/+ZVQCZVTOZVWaZVZmZVcyZVf+ZgACZgDOZgGaZgJmZgMyZgP+ZqgCZqjOZqmaZqpmZqsyZqv+Z1QCZ1TOZ1WaZ1ZmZ1cyZ1f+Z/wCZ/zOZ/2aZ/5mZ/8yZ///MAADMADPMAGbMAJnMAMzMAP/MKwDMKzPMK2bMK5nMK8zMK//MVQDMVTPMVWbMVZnMVczMVf/MgADMgDPMgGbMgJnMgMzMgP/MqgDMqjPMqmbMqpnMqszMqv/M1QDM1TPM1WbM1ZnM1czM1f/M/wDM/zPM/2bM/5nM/8zM////AAD/ADP/AGb/AJn/AMz/AP//KwD/KzP/K2b/K5n/K8z/K///VQD/VTP/VWb/VZn/Vcz/Vf//gAD/gDP/gGb/gJn/gMz/gP//qgD/qjP/qmb/qpn/qsz/qv//1QD/1TP/1Wb/1Zn/1cz/1f///wD//zP//2b//5n//8z///8AAAAAAAAAAAAAAAAISAD3CcSBpmBBHAL33UgosEdCNPt8pBEoZh/EGwVvZIqI44YPMW8sQiRoUdO+NxD3nUEo8M0NMRhJDnTDcOHDiQLReBTTo2LCgAA7' alt='Ejection Point'/>&nbsp;";
        a[i].parentNode.insertBefore(outmove, a[i]);

        var harbor = root.document.createElement('a');
        harbor.setAttribute("href", harborLink);
        harbor.setAttribute("style", 'text-decoration: none');        
        harbor.innerHTML = "&nbsp;<img border=0 src='data:image/gif;base64,R0lGODlhCgAKAKIEAENDQ5eXlx4eHgAAAP///wAAAAAAAAAAACH5BAEAAAQALAAAAAAKAAoAAAMgSEoxsXAQCVUQryqhF+/EtwBfCYTAwwWkBQzCkFZXRiQAOw==' alt='В порт'/>&nbsp;";
        a[i].parentNode.insertBefore(harbor, a[i]);   
      }
      
      break;
    }
  }  
  
}
)(); 