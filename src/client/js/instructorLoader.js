$(document).ready(documentReady);

function documentReady(){
    console.log("I'm ready");
    var id=getUrlVars()["instr"];
    var from=getUrlVars()["from"];
    loadInstructor(id,from);
}


function createContext(from,el,instructors){
    if(from=="month"){
    el +=  "<a href='#'>Instructors of the month</a> <span> > </span>";
    //el+="<div id='padding'></div>";
    }else{
    el +=  "<a href='allinstructors.html'>All instructors</a> <span> > </span>";
    }
     $("#context").html(el);
}

function loadInstructor(id,from){

    console.log("Loading instructotrs"+id.toString());
    
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
            
            createContext(from,el,instructors);
            el="";
            for(var i=0;i<instructors.length;i++){
                console.log(instructors[i].Name);
                document.title=instructors[i].Name+" "+instructors[i].Surname;
                //$(".contents").html(" "+instructors[i].Name);
                el+=instructors[i].Name+" "+instructors[i].Surname;
            }
            $("#instructorName").html(el);
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