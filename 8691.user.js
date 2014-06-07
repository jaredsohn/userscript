// ==UserScript==
// @name          RedTube Downloader
// @description	  This script resolves path+name of video files on redtube.com. Videos can be downloaded via "Share this Video" (link changed from /share to file path).
// @include       http://*redtube.com/*
// ==/UserScript==

if (top==self)
 {
  var host=window.location.hostname;
  var vid =window.location.pathname.substr(1);

  var mediaSource;

  function insertnotice()
  {
    var hrefNodes = document.getElementsByTagName('a');
    for(var a = 0; a < hrefNodes.length; a++)
    {
      if(hrefNodes[a].getAttribute('href').substr(0,28) == "http://www.redtube.com/share")
      {
        hrefNodes[a].setAttribute('href', mediaSource);
      }
    }
  }

  function extracturls()
  {
    if (host.match(/redtube\./i) !=null)
    {
      var p_file = "" + vid;
      if(p_file == "" || p_file == "video.flv")
      {
        p_file = "1";
      }
      
      var v_fileFloat = "" + Math.floor(parseFloat(p_file) / 1000); // 477 --> 0.477 --> 0
      var v_fileLength = p_file.length; // --> 3
      for (var a = 1; a <= 7 - v_fileLength; ++a)
      {
        p_file = "0" + p_file; // 477 --> 0000477
      }
      v_fileLength = v_fileFloat.length; // --> 1
      for (var a = 1; a <= 7 - v_fileLength; ++a)
      {
        v_fileFloat = "0" + v_fileFloat; // 0 --> 0000000
      }

      var map = new Array("R", "1", "5", "3", "4", "2", "O", "7", "K", "9", "H", "B", "C", "D", "X", "F", "G", "A", "I", "J", "8", "L", "M", "Z", "6", "P", "Q", "0", "S", "T", "U", "V", "W", "E", "Y", "N");
      var mapping = "";
      var myInt = 0;
      for (var a = 0; a <= 6; ++a)
      {
        myInt = myInt + parseInt(p_file.charAt(a)) * (a + 1);
              /* 0000477
              0 --> 0*1 = 0
              0 --> 0*2 = 0
              0 --> 0*3 = 0
              0 --> 0*4 = 0
              4 --> 4*5 = 20
              7 --> 7*6 = 42
              7 --> 7*7 = 49
              myInt = 20+42+49 = 62+49 = 100+2+9=111
              */
      }
      
      var myChar = "" + myInt; // --> "111"
      myInt = 0;
      for (var a = 0; a < myChar.length; ++a) // 3 times
      {
        myInt = myInt + parseInt(myChar.charAt(a));
        //111 --> myInt = 3
      }
      
      var newChar;
      if (myInt >= 10)
      {
        newChar = "" + myInt;
      }
      else
      {
        newChar = "0" + myInt; // newChar = "03"
      }
      
      // p_file = "0000477"
      // myInt = 3
      // newChar = "03"
      // char codes: 0=48 1=49 2=50 3=51 4=52 5=52 6=54 7=55 8=56 9=57
      mapping = mapping + map[p_file.charCodeAt(3) - 48 + myInt + 3]; // char=0 map[48-48+3+3]=map[6] = "O"
      mapping = mapping + newChar.charAt(1);                          // "3"
      mapping = mapping + map[p_file.charCodeAt(0) - 48 + myInt + 2]; // char=0 map[48-48+3+2]=map[5] = "2"
      mapping = mapping + map[p_file.charCodeAt(2) - 48 + myInt + 1]; // char=0 map[48-48+3+1]=map[4] = "4"
      mapping = mapping + map[p_file.charCodeAt(5) - 48 + myInt + 6]; // char=7 map[55-48+3+6]=map[16] = "G"
      mapping = mapping + map[p_file.charCodeAt(1) - 48 + myInt + 5]; // char=0 map[48-48+3+5]=map[8] = "K"
      mapping = mapping + newChar.charAt(0);                          // "0"
      mapping = mapping + map[p_file.charCodeAt(4) - 48 + myInt + 7]; // char=4 map[4+3+7]=map[14] = "X"
      mapping = mapping + map[p_file.charCodeAt(6) - 48 + myInt + 4]; // char=7 map[7+3+4]=map[14] = "X"
      // --> mapping = "O324GK0XX"
      mediaSource = "http://dl.redtube.com/_videos_t4vn23s9jc5498tgj49icfj4678/" + v_fileFloat + "/" + mapping + ".flv";
      // --> http://dl.redtube.com/_videos_t4vn23s9jc5498tgj49icfj4678/0000000/O324GK0XX.flv
      insertnotice();
    }
  }

  extracturls();

 };