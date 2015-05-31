$(document).ready(documentReady);

function documentReady(){
    console.log("I'm ready");
    getAllInstructors();
}

function getAllInstructors(){
    console.log("Loading all instructotrs...");
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "../../server/getAllInstructors.php", //Relative or absolute path to file.php file
        //data: {instructor:id},
        success: function(response) {
            console.log(JSON.parse(response));
            var instructors=JSON.parse(response);
            var el="";
            for(var i=0;i<instructors.length;i++){
                console.log(instructors[i].Name);
                //$(".contents").html(" "+instructors[i].Name);
                el+="<div class='instructor' id='"+instructors[i].Id+"'><h2>"+instructors[i].Name+"</h2>  <span>"+instructors[i].Surname+"</span><a href='instructor.html?instr="+instructors[i].Id+"' class='loadmore' id='"+instructors[i].Id+"'>Load more</a></div>";
            }
            $("body").html(el);
        1},
        error: function(request,error) 
        {
            console.log("Error");
        }
    });

}