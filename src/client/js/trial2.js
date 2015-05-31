$(document).ready(documentReady);

function documentReady(){
    console.log("I'm ready");
    var id=getUrlVars()["instr"];
    loadInstructor(id);
}


function loadInstructor(id){

    console.log("Loading instructotrs"+id.toString());
    
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

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}