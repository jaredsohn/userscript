// ==UserScript==
// @name        VNPlus
// @namespace   VNPlus
// @description VocabularyNotebook PLUS
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js
// @include     http://www.vocabularynotebook.com/student/studying
// @include     http://vocabularynotebook.com/student/studying
// @include     https://www.vocabularynotebook.com/student/studying
// @include     https://vocabularynotebook.com/student/studying
// @version     0.3
// @grant       none
// ==/UserScript==
 
$(document).ready(function(){
     
    //alert("Working!");
    
    ////////GLOBAL DECLARATIONS
    var str, i;
    var vN = {
        word: null,           //ENGLISH (2)
        definition: null,     //DEFINITION (4)
        sentence: null,       //SENTENCE (6)
        translation: null,    //SPANISH (3)
        notes: null,          //INTERESTING LINKS (5)
        categories: null      //FIELD (1)
    };
    
    
    ///////// .CSS STYLE RULES 
    var StyleMargin = $('<style> .newMargin{display: inline-block; margin-left: 0px;}</style>');
    $('html > head').append(StyleMargin);
    var StyleButtons = $('<style> .newButton{display: inline-block; margin-right: 4px;}</style>');
    $('html > head').append(StyleButtons);
    var StyleShowWord = $('<style> .showWord{display: inline-block; margin-right: 4px; padding-top:2px; height: 23px; width: 100px; border-radius: 5px; background-color: red; text-align: center; color: #FFFFFF; font-family: Verdana, Arial, Sans-Serif; opacity: 0.5;}</style>');
    $('html > head').append(StyleShowWord);
    var StyleShowCategory = $('<style> .showCategory{display: inline-block; margin-right: 4px; padding-top:2px; height: 23px; width: 200px; border-radius: 5px; background-color: blue; text-align: center; color: #FFFFFF; font-family: Verdana, Arial, Sans-Serif; opacity: 0.5;}</style>');
    $('html > head').append(StyleShowCategory);
        
    
    //////// ADDING NEW BUTTONS    
    $('#content').before('<div id="barButtons" style="text-align:center;margin-top:12px;"></div>');
    $('#barButtons').append('<div class="newButton"><button id="addFile">Add File</button><br/></div>');
    $('#barButtons').append('<div class="newButton"><button id="directUpload">Direct Upload</button><br/></div>');
    $('#barButtons').append('<div class="newButton"><button id="previousWord">Previous Word</button><br/></div>');
    $('#barButtons').append('<div class="newButton"><button id="nextWord">Next Word</button><br/></div>');
    $('#barButtons').append('<div class="newButton"><button id="goToLine">Go to</button><br/></div>');
    $('#barButtons').append('<div class="newButton"><button id="resetWords">Reset Words</button><br/></div>');
    $('#barButtons').append('<div class="showWord" id="showWord">Line: <span>0<span></div>');
    $('#barButtons').append('<div class="showCategory" id="showCategory">Category:</div>');
    
    
    //////// ADD FILE
    $('#addFile').click(function(){
    
        $('#btnHide').trigger("click");
        $('#btnHide').show();
    
        var addFL = prompt("Paste the file's content");
        str = addFL.split(";");
        
        if (str != ""){
            alert("Ready!");
            update($('#showWord span'),0);
            i=6;
            update($('#showWord span'),1);
        }

        else
            alert("Failed. For help, donwload tutorial:\n http://mega.co.nz/#!Z1o3mL6Y!YtsTTDxq_9pVyqha38Nt5jMMEV5cIqk1ZTNi9JxgaUI");

    });


    //////// DIRECT UPLOAD
    $('#directUpload').click(function(){
    
       if (confirm("ATTENTION: Categories will be empty!\n\n Are you sure you want to continue?")) {
       
        var size = (str.length-7)/6;
        
        for (x=0; x<size; x++){
        
            $('#nextWord').trigger("click");
            $('#btnAddWord').trigger("click");
        }
       }
    
    });

    
    /////// WORD--
    $('#previousWord').click(function(){
    
        $('#inputNewWord').trigger("click");
        
        if (i > 12){
        
            i-=12;
            update($('#showWord span'),-1);
            setNext();
            printWord();
        }
    });
    
    
    //////// WORD++
    $('#nextWord').click(function(){ 
    
        $('#inputNewWord').trigger("click");
        
            update($('#showWord span'),1);
            setNext();
            printWord();
    });
    
        
    
    //////// GO TO THE LINE...
    $('#goToLine').click(function(){
        
        var data = prompt("Enter the number of line:")        
        line = parseInt(data);

        if (line > 0){
            if (line > (i/6)+6){
                update($('#showWord span'), line-1);
                i = (6*line)-6;
                $('#nextWord').trigger("click");
            }
            
            else{
                update($('#showWord span'), line+1);
                i = (6*line)+6;
                $('#previousWord').trigger("click");
            }   
        }
    });
    
    
    
    /////// RESET WORDS COUNT
    $('#resetWords').click(function(){
    
        $('#btnHide').trigger("click");
        
        i=6;
        update($('#showWord span'),0);
        $('#showCategory').text("Category: ");
    });

    
    /////// SHOW NUMBER OF WORD
    $('#showWord').mouseenter(function(){
        $(this).fadeTo('fast',1);
    });
    $('#showWord').mouseleave(function(){
        $(this).fadeTo('slow',0.5);
    });
    
    /////// SHOW CATEGORY OF WORD
    $('#showCategory').mouseenter(function(){
        $(this).fadeTo('fast',1);
    });
    $('#showCategory').mouseleave(function(){
        $(this).fadeTo('slow',0.5);
    });
    
    
    /////// SET NEXT WORD TO PRINT
    function setNext(){
        
        vN.categories = str[i+0];
        vN.word = str[i+1];
        vN.translation = str[i+2];
        vN.definition = str[i+3];
        vN.notes = str[i+4];
        vN.sentence = str[i+5];
        
        i+=6;
    }
    
    
    ////// PRINT PRESENT WORD
    function printWord(){
    
        $('#inputNewWord').val(vN.word),
        $("textarea[id=definition]").val(vN.definition),
        $("textarea[id=sentence]").val(vN.sentence),
        $("textarea[id=translation]").val(vN.translation),
        $("textarea[id=notes]").val(vN.notes),
        $('#showCategory').text("Category: " + vN.categories);
    }
    
    
    ////// UPDATE COUNT WORDS
    function update(j,k){
        var n = parseInt(j.text(),10);
        
        if (k == 1)
            j.text(n+1);
        else if (k == -1)
            j.text(n-1);
        else if (k == 0)
            j.text(0);
        else
            j.text(k);
    }
    
});