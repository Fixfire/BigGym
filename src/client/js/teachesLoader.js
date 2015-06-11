$(document).ready(documentReady);

function documentReady(){
    var id = getUrlVars()["instr"];
    var name=getUrlVars()["name"];
    var surname=getUrlVars()["surname"];
    loadCoursesInstructor(id,name,surname);
}

function createContext(id,name,surname){
    var el="";
    el+=  "<a href='instructor.html?instr="+id+"'>"+name+" "+surname+"</a> <span> > </span>";
    $("#context").html(el);
}

function loadCoursesInstructor(id,name,surname){
    $.ajax({
        method: "POST",
        crossDomain: true, //localhost purposes
        url: "http://bigbiggym.altervista.org/server/getAllCourses_instructor.php", //Relative or absolute path to file.php file
        data: {id:id},
        success: function(response) {
            console.log(JSON.parse(response));
            var courses= JSON.parse(response);
            var el = "";
      
            createContext(id,name,surname);
            for (var i=0; i<courses.length; i++) {
                document.title="Courses of "+name+" "+surname;
                console.log(courses[i].Name);
                
                el += "<div class='col-md-6' id='courseInstructorBlock'>";
                el += "<img src='images/" +  courses[i].Name+"/main.png' height='100' width='115' style='float:left; margin-right: 5%'/>";
                el+= "<div class='courseContainer'>";
                el += "<h3 class='courseName'>" + courses[i].Name+"</h3>";
                el += "<p class='courseLevel'>Level: " + courses[i].Level + "</p>";
                el += "<button class='btn' type='button' id='std-btn'                 onclick=\"parent.location='course.html?name=" + courses[i].Name + "&from=all'\" >More Info</button>";
                el += "</div> </div>";
            }
            console.log(el);
            $("#container").html(el);
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
