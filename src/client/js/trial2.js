$(document).ready(documentReady);

function documentReady(){
    console.log("I'm ready");
    //$(".loadmore").on("click",loadMoreClicked());
    var qs = new Querystring();
    var id = qs.get("Instr");
    loadInstructor(id);
}


function loadInstructor(id){

    console.log("Loading all instructotrs...");
    
    document.title="Instructor "+id.toString();
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "../../server/server.php", //Relative or absolute path to file.php file
        data: {id:id},
        success: function(response) {
            console.log(JSON.parse(response));
            var instructors=JSON.parse(response);
            var el="";
            for(var i=0;i<instructors.length;i++){
                console.log(instructors[i].Name);
                //$(".contents").html(" "+instructors[i].Name);
                el+="<div class='instructor' id='"+instructors[i].Cf+"'><h2>"+instructors[i].Name+"</h2><span>"+instructors[i].Surname+"</span></div>";
            }
            $("body").html(el);
        1},
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
}