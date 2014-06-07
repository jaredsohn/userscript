// Vkontakte Playlist maker script

// version 0.03 ALFA!

// 2009−03−05

// Copyright (c) 2009, Nikolay Kandalincev

// Released under the GPL license

// http://www.gnu.org/copyleft/gpl.html

//

// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−

//

// This is a Greasemonkey user script.

//

// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/

// Then restart Firefox and revisit this script.

// Under Tools, there will be a new menu item to "Install User Script".

// Accept the default configuration and install.

//

// To uninstall, go to Tools/Manage User Scripts,

// select "VKPlaylist", and click Uninstall.

//

// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−

//

// ==UserScript==

// @name          Vkontakte Playlist maker

// @namespace     http://nicloay.blogspot.com/

// @description   make playlist from text data

// @include       http://vkontakte.ru/audio.php*

// ==/UserScript==









window.initPlayList = function() {

    var APPEND_TIMEOUT = 3000;

    var REMOVE_TIMEOUT = 1001;

    var activeSongIndex;

    var song;

    var big_timeout_count=0;

    var BIG_TIMEOUT_VALUE=50;

    var BIG_TIMEOUT = 15000;

    var TIMEOUT_DISPERSION= 1000;



    var content = document.getElementById("content");

    content.appendChild(createGUI());





    //-------------------test Data--------REMOVE THIS!!!!----

    //testData();





    function createGUI() {

        var gui = document.createElement("div");

        gui.appendChild(createInputList());

        gui.appendChild(createButton('startButton','Start',startButtonClick));



        gui.appendChild(createButton('generateDownloadList','Generate Download List', generateDownloadList));
	gui.appendChild(createCheckBox());

        gui.appendChild(createButton('deleteDuplikate','Delete Duplikate!',deleteDuplikat));

        gui.appendChild(createButton('deleteList','Delete Our List!',deleteListFull));



        gui.appendChild(createLogList());





        return gui;



        function createButton(id,caption,event){

           button = document.createElement('button');

            button.setAttribute('id', id);

            button.appendChild(document.createTextNode(caption));

            button.addEventListener('click', event, true);

            return button;

        }



        function createInputList() {

            var inputList = document.createElement("textarea");

            inputList.setAttribute("id", "inputList");

            inputList.setAttribute("cols", 95);

            inputList.setAttribute("rows", 15);

            return inputList;

        }



        function createLogList() {

            var logList = document.createElement("textarea");

            logList.setAttribute("id", "logList");

            logList.style.display = 'none';

            logList.setAttribute("cols", 95);

            logList.setAttribute("rows", 25);

            return logList;

        }
	function createCheckBox() {
	    var cBox=document.createElement("input");
            cBox.type="checkbox";
	    cBox.setAttribute("id","isTitle")
		return cBox;
	}





        function startButtonClick() {

            executePlaylist();

        }

    }





    function executePlaylist() {

        traceStr("execute play list......")

        var playList = document.getElementById("inputList").value;

        song = new Array();

        song = playList.split('\n');

        traceStr("totoal track: " + song.length);

        activeSongIndex = 0;

        getTrack(activeSongIndex);

        function getTrack(index) {

            if (index == song.length) {

                return;

            }

            var trackName = song[index];

            var url = 'http://vkontakte.ru/audiosearch.php?q=' +

                      encodeURIComponent(trackName);

            GM_xmlhttpRequest({

                'method': 'GET',

                'url': url,

                'onload': function(xhr) {

                    trace("[" + (1 + index) + "] " + trackName + ": ");

                    var summary;

                    var regex = /class="summary">(.*?)<\//gi;

                    if (regex.test(xhr.responseText)) {

                        summary = RegExp.$1;

                        if (summary == "") {

                            nextIteration();

                            return;

                        }

                    } else {

                        //todo real error handling

                        nextIteration();

                        traceStr("wtf? :(");

                        return;

                    }



                    summary = parseInt(summary.split(" ")[1]);

                    if (isNaN(summary)) {

                        trace("not found");

                        nextIteration();

                        return;

                    } else {

                        //todo mayby rating, or most length, or size

                        trace("founded(" + summary + ") get first");

                    }

                    regex = /onclick="addAudio\(this, (.*?)\);return false;/gi;

                    if (!regex.test(xhr.responseText)) {

                        nextIteration();

                        return;

                    }



                    //to execute page element look here http://wiki.greasespot.net/Location_hack#Executing_large_blocks_of_code

                    var oldBodyTitle = document.body.title;

                    document.body.title=nextIteration();

                    location.href = "javascript:(" + function() {

                        var param = RegExp.$1;

                        eval('var params='+param);

                        Ajax.postWithCaptcha('audio.php', params, {

                            onSuccess:function(res, text){

                                if (!text.split("Добавлено").length>0){

                                    setTimeout(document.body.title,15000)

                                } else {

                                    document.body.title;

                                }



                            },

                            onFail:function(res,text) {

                            }});

                    } + ")()";

                    document.body.title = oldBodyTitle;

                    return;

                    function nextIteration() {

                        trace("\n");

                        activeSongIndex++;

                        var tmpTimeout;

                        var delayed = function() {

                            getTrack(activeSongIndex);

                        };

                        if (++big_timeout_count<BIG_TIMEOUT_VALUE){

                            tmpTimeout=APPEND_TIMEOUT;

                        }else{

                            big_timeout_count=0;

                            tmpTimeout=BIG_TIMEOUT;

                        }





                        tmpTimeout=tmpTimeout+Math.ceil(Math.random()*500);

                        setTimeout(delayed, tmpTimeout);

                    }





                }

            });



        }

    }



    function traceStr(text) {

        trace(text + '\n');

    }





    function trace(text) {

        var logList = document.getElementById("logList");

        if (logList !== null) {

            if (logList.value == "") {

                logList.style.display = 'block';

            }

            logList.value = logList.value + text;

            logList.scrollTop = logList.scrollHeight - logList.clientHeight;

        } else {

            GM_log(text);

        }

    }

    function clearLog() {

        var logList = document.getElementById("logList");

        logList.value = "";

    }

    function testData() {

        var inputList = document.getElementById("inputList");

        inputList.value = 'uinya-muinyaalsdkjflaskjljkeasefasefas\nQueen  I Want To Break Free\nRage Against The Machine  Wake Up\nRam Jam  Black Betty\nRed Hot Chili Peppers  Dani California\nRed Hot Chili Peppers  Tell Me Baby';

        //inputList.value = 'Red Hot Chili Peppers  Tell Me Baby';



    }



    function generateDownloadList() {

        clearLog();

        traceStr("starting generate loading list....\n\n");

	var printTitle=document.getElementById('isTitle').checked

	if (printTitle){
		traceStr('copy data to some file.\n for download wia wget use folow script (change value FILE_NAME to you file name\n')	
		traceStr('FILE_NAME=vk.pls; for i in $(seq `wc -l $FILE_NAME|awk \'{print $1}\'`);do path=$(cat $FILE_NAME | awk \'NR==\'$i|awk -F\'\\t\' \'{print $1}\');name=$(cat $FILE_NAME | awk \'NR==\'$i|awk -F\'\\t\' \'{print $2}\'); echo $path  $name;wget -O "$name".mp3 $path;done')
		traceStr('=================================================================================')
	}        
	GM_xmlhttpRequest({

            'method': 'GET',

            'url': "http://vkontakte.ru/audio.php?act=edit",         //<b id="performer64519150">Rodrigo Y Gabriela</b> - <span id="title64519150">Diablo Rojo</span>

            'onload': function(xhr) {
		var regex = /class="playimg" src="images\/play.png" nosorthandle="true" onclick="return operate\((.*?),(.*?),(.*?),'(.*?)',(?:[\s\S]*?)performer(?:\d*)\">(.*)<\/b>(?:[\s\S]*?)title(?:\d*)\">(.*)<\/span>/gi;


                while (regex.test(xhr.responseText)) {			

                    var link = 'http://cs' + RegExp.$2 + ".vkontakte.ru/u" + RegExp.$3 + "/audio/" + RegExp.$4 + ".mp3" 

			if (printTitle){
				link=link+"\t"+RegExp.$5+" - "+ RegExp.$6
			}			                    
			traceStr(link);

                }

		if (printTitle){
			traceStr('=================================================================================')		
		}

                traceStr("\n task complite! :)")

            }

        });

    }



    function deleteDuplikat(){

        clearLog()

        traceStr("starting duplikate remove");

        var userId;

        var regex = /<a href="\/id(.*?)\?/gi;

        clearLog();

        if (regex.test(document.getElementById('myprofile').innerHTML)) {

            userId = RegExp.$1;

        } else {

            traceStr("wtf :(...?");

        }

        var songArray=new Array();

        var removeArray=new Array();

        GM_xmlhttpRequest({

            'method': 'GET',

            'url': "http://vkontakte.ru/audio.php?act=edit",

            'onload': function(xhr) {

                                                                                                 

                var regex = /class="playimg" src="images\/play.png" nosorthandle="true" onclick="return operate\((.*),(.*),(.*),'(.*)',(.*)\);/gi;

                while (regex.test(xhr.responseText)) {

                    var r=new Object;

                    r.userId=RegExp.$3;

                    r.songId=RegExp.$4;

                    r.innerId=RegExp.$1

                    var dupl=false;

                    for (i=0;i<songArray.length;i++){

                        if (songArray[i].userId==r.userId&&songArray[i].songId==r.songId){

                            dupl=true

                            trace("+");

                        }

                    }

                    if (dupl){

                        removeArray.push(r.innerId);

                    } else {

                        songArray.push(r);

                    }

                }



                i = 0;

                   traceStr("\nfound "+removeArray.length +" duplikate");

                   var delay = function() {

                       removeTrack(i)

                   };

                   setTimeout(delay, REMOVE_TIMEOUT);



                   function removeTrack(id) {

                       GM_xmlhttpRequest({

                           'method': 'GET',

                           'url': "http://vkontakte.ru/audio.php?act=adeleteaudio&aid=" + removeArray[id] + "&oid=" + userId,

                           'headers': {

                                   'Content-Type':

                                   'application/x-www-form-urlencoded; charset=UTF-8'

                           },

                           'onload': function(xhr) {

                               traceStr((++id) + " ["+removeArray[id]+"] removed "+xhr.responseText);

                               if (++i < removeArray.length) {

                                   var delay = function() {

                                       removeTrack(i)

                                   };

                                   setTimeout(delay, REMOVE_TIMEOUT);

                               } else {

                                   traceStr("\n\n task complite! :)");

                               }

                           }

                       });



                   }

            }

        });

        

    }







    function deleteListFull() {

        if (!confirm("A Your sure?, you can't restore your songs!!!")) {

            traceStr("canceled");

            return;

        }

        var userId;

        var regex = /<a href="\/id(.*?)\?/gi;

        clearLog();

        if (regex.test(document.getElementById('myprofile').innerHTML)) {

            userId = RegExp.$1;

        } else {

            traceStr("wtf :(...?");

        }

        traceStr("deleting list....\n\n");

        GM_xmlhttpRequest({

            'method': 'GET',

            'url': "http://vkontakte.ru/audio.php?act=edit",

            'onload': function(xhr) {

                var regex = /showDeleteAudioBox\((.*?)\)/gi;

                var songId = new Array();

                var i = 0;

                while (regex.test(xhr.responseText)) {

                    songId[i++] = RegExp.$1;

                }

                traceStr("total "+songId.length);

                i = 0;



                var delay = function() {

                    removeTrack(i)

                };

                setTimeout(delay, REMOVE_TIMEOUT);



                function removeTrack(id) {

                    GM_xmlhttpRequest({

                        'method': 'GET',

                        'url': "http://vkontakte.ru/audio.php?act=adeleteaudio&aid=" + songId[id] + "&oid=" + userId,

                        'headers': {

                                'Content-Type':

                                'application/x-www-form-urlencoded; charset=UTF-8'

                        },

                        'onload': function(xhr) {

                            traceStr((++id) + " removed "+xhr.responseText);

                            if (++i < songId.length) {

                                var delay = function() {

                                    removeTrack(i)

                                };

                                setTimeout(delay, REMOVE_TIMEOUT);

                            } else {

                                traceStr("\n\n task complite! :)");

                            }

                        }

                    });



                }





            }

        });





    }

};



initPlayList();