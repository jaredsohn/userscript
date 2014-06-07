// ==UserScript==
// @name           Fagsystemer-highlight
// @namespace      example.com
// @include        http://wiki.apress.local/confluence/display/DOC/Dokumentasjon+for+Fagsystemer
// @include        http://wiki/confluence/display/DOC/Dokumentasjon+for+Fagsystemer
// @include         http://wiki.apress.local/confluence/display/Informasjon/Ferieliste+2010
// @include         http://wiki/confluence/display/Informasjon/Ferieliste+2010
// ==/UserScript==

var $, jQuery;
$ = jQuery = unsafeWindow.jQuery;

var relatedNodes = {};
var ids = 0;
function log(s){
    if(typeof console != "undefined" && console.log) {
        console.log.apply(this, arguments);
    }
}
function getRelatedCells(c){

    var $c =  $(c);
    
    /*
    //caching not needed now, as avoiding jquery in looping is faster
    
    console.log("---")
    var id = $c.attr("jq-id");
    
    if( id === undefined) {
      console.log("id er udefinert");
      id = ids++;
      $c.attr("jq-id", id);
      console.log("cached cell with id", id);
    }
    */
    var $cells = undefined;// = relatedNodes[+id];
       
    
    //console.log("id er nå:", id)
    //console.log("relatedNodes :", $cells)
    //console.log("all nodes:", relatedNodes)
    if($cells === undefined ) {
        var idx = $c.attr("cellIndex");
      
        
        /*$cells =
        $c.closest("tr").parent().find("tr td").not($c).filter( function(){
            return this.cellIndex == idx
        })
       .add($c.siblings());*/
        /*
        $cells =
        $c.closest("tr").parent().find("tr td").filter( function(){
            console.log("cellidx: ", this.cellIndex, "idx: ", idx)
            return this.cellIndex == idx
        })
        .not(c)
        .add($c.siblings());
        
       */
        
        var $parent = $c.closest("tr").parent();
        var rows = $parent.attr("rows");
        
        var cells = [];
        for(var i=0, len=rows.length; i < len; i++) {
            var row = rows[i];
            var cell = row.cells[idx];
            if(cell.nodeName == "TD" && cell != c) cells.push(cell);
            
        }
        
        /*
        log("reference cell:", c);
        log("reference cell siblings:", $c.siblings());
        log("found cells;:",$cells);
         */
        
        $cells = $(cells)

        .add($c.siblings() );
        
    
        
        
        
    }
   
    return $cells;
   

}


$("table.confluenceTable td")
.mouseenter( function(){
    var $cells = getRelatedCells(this);
    
    $cells.css("background", "#E9967A");
})
.mouseleave(function(){
   
   var $cells = getRelatedCells(this);
   $cells.css("background", "")

})