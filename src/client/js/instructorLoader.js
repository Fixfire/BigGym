$(document).ready(documentReady);

function documentReady(){
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

    var categoriesList;
    var hasAwards;
    
    $.ajax({
        method: "POST",
        async:false,
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "../../server/getInstructorCategories.php", //Relative or absolute path to file.php file
        data: {id:id},
        success: function(response) {
            categoriesList=JSON.parse(response);
        1},
    });
    
    $.ajax({
        method: "POST",
        async:false,
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "../../server/hasAwards.php", //Relative or absolute path to file.php file
        data: {id:id},
        success: function(response) {
            var result=JSON.parse(response);
            hasAwards=result['boolean'];
        1},
    });
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "../../server/server.php", //Relative or absolute path to file.php file
        data: {id:id},
        success: function(response) {
            var instructors=JSON.parse(response);
            var el="";
            var el2="";
            
            createContext(from,el,instructors);
            el="";
            for(var i=0;i<instructors.length;i++){
                document.title=instructors[i].Name+" "+instructors[i].Surname;
                //$(".contents").html(" "+instructors[i].Name);
                el+=instructors[i].Name+" "+instructors[i].Surname;
                el2+="<img src='images/Instructors/"+instructors[i].Name+instructors[i].Surname+".jpg' height='275' width='195' style='float:right;padding-left:10px'/>";
                el2+="<h4 class='instructorPositionTitle'>"+instructors[i].Position+"</h4>";
                el2+="<h4 class='instructorCertTitle'>"+instructors[i].Certifications+"</h4>";
                el2+="<p id='biography'>"+instructors[i].Biography+"</p>";
                if(hasAwards){
                    el2+="<a href='#' class='hlink'>Personal Awards</a>";
                }
                el2+="<h4>Categories of activity:</h4>";
                el2+="<div class='categoriesTeaching'>";
                //var categoriesList=loadCategories(id);
                for(var j=0;j<categoriesList.length;j++){
                     el2+="<a href='#'>"+categoriesList[j].Category+"</a><br>";
                }
                el2+="</div>";
                el2+="<a href='#' class='hlink'>Course teaching list</a>";
            }
            $("#instructorName").html(el);
            $("#subtitleDiv").html(el2);
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