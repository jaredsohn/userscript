// ==UserScript==
// @name        HF Memberlist Generator
// @namespace   HFGroups
// @description Generates a thread for a member list based on the group management page

//CHANGE THIS
// @include     http://www.hackforums.net/managegroup.php?gid=ID
//DO NOT CHANGE BELOW THIS


// @version     1
// ==/UserScript==

var PageTables = document.getElementsByTagName("table");
var MemberListTable;

if (PageTables.length > 0)
    {
       MemberListTable = PageTables[0];
       AddOutputBox();
       GenerateList();
    }
else
    {
        alert("Could not find a table on the page?  Are you using this on the group membership page?");
    }
    
function GenerateList(){
    
    var bbpost = document.getElementById('bbpost');
    bbpost.value = "";
    if (MemberListTable != null)
    {
     
        var rowCount = MemberListTable.rows.length;
        var MemberRow = "";
        rows = MemberListTable.rows;
        
        for (var j = 0; j <= rowCount-1; j++) {
             cells = rows[j].getElementsByTagName("TD");
             for (var i = 0; i < cells.length; i++) {
                 if ( cells[i] != null &&  cells[i].textContent.length > 0){
               
                      if ( cells[i].textContent != previousCol && cells[i].textContent != "\n\n"){
                          switch (i){
                          case 0:
                       
                        if (j > 1){
                             MemberRow += "[url=";
                             MemberRow += cells[i].innerHTML.replace("<a href=\"","");
                             MemberRow = MemberRow.replace("amp;","");
                             var n=MemberRow.indexOf("\">");
                             MemberRow = MemberRow.substring(0,n);
                             MemberRow += "]";
                             MemberRow += cells[i].textContent;
                             MemberRow += "[/url]";
                        }else if (j == 0)
                        {
                       
                        //Add some styling to headers
                         MemberRow += "[color=white][size=large]";
                         MemberRow += cells[i].textContent;
                         MemberRow += "[/size][/color]";
                         
                        }
                                                                              
                          case 1:
                          //Second column
                          MemberRow += "\n";
                         }
                    var previousCol =  cells[i].textContent;
                        }
                   }
            }
         }
                
           bbpost.value =  bbpost.value + MemberRow; 
           var MemberRow = "";
    }
    
   
        
}


function AddOutputBox(){
    ParentElement = document.getElementById('content');
    var box = document.getElementById('bbpost');
   if (box == null){
        var input = document.createElement('textarea');
        input.name = 'post';
        input.maxLength = 5000;
        input.cols = 80;
        input.rows = 40;
        input.id = 'bbpost';
        ParentElement.appendChild(input)
    }
}