$(document).ready(documentReady);

function documentReady(){
    console.log("I'm ready");

    $(".loadmore").on("click",loadMoreClicked);

}


function loadMoreClicked(){

    console.log("You clicked load more");
    
    var id=$(".loadmore").attr("id");
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "../../server/server.php", //Relative or absolute path to file.php file
        data: {pt:id},
        success: function(response) {
            console.log(JSON.parse(response));
            var instructors=JSON.parse(response);
            for(var i=0;i<instructors.length;i++){
                console.log(instructors[i]);
                $(".contents").html(" "+instructors[i]);
            }
        1},
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
}