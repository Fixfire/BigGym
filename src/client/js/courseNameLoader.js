$(document).ready(documentReady);

function documentReady(){
    console.log("I'm ready");
    var name = getUrlVars()["name"];
    loadCourses(name);
}




function loadCourses(name){

    console.log("Loading course " + name.toString());
    
    document.title="Course " + name.toString();
    
    $.ajax({
        method: "POST",
        crossDomain: true, //localhost purposes
        url: "../../server/getCourses_name.php", //Relative or absolute path to file.php file
        data: {name:name},
        success: function(response) {
            console.log(JSON.parse(response));
            var courses = JSON.parse(response);
            console.log(courses[0].Name);
            
            $(".headerImg").attr("src","images/" + courses[0].Category + "/head.jpg");
            $(".centralText > h3").html(courses[0].Name);       
            $("#roomLink").html("Room " + courses[0].Room);
            $("#courseImage").attr("src","images/" + courses[0].Name + "/main.png");    
            $("#courseDescription > p").html(courses[0].Description);
  
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
    
    console.log("Loading teachers " + name.toString());
    

    
    $.ajax({
        method: "POST",
        crossDomain: true, //localhost purposes
        url: "../../server/getTeaches.php", //Relative or absolute path to file.php file
        data: {name:name},
        success: function(response) {
            console.log(JSON.parse(response));
            var teaches = JSON.parse(response);
            var el = "";
            
            for (var i=0; i<teaches.length; i++) {
                el += "<img src='images/Instructors/" + teaches[i].Name + teaches[i].Surname + ".jpg' width='65' height='80' id='thunbnail' />";
                el += "<p>Instructors : " + teaches[i].Name + " " + teaches[i].Surname + "</p>";
            }
            
            console.log(el);
            $("#courseInstructor").html(el);
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
    
    $.ajax({
        method: "POST",
        crossDomain: true, //localhost purposes
        url: "../../server/getLessons.php", //Relative or absolute path to file.php file
        data: {name:name},
        success: function(response) {
            console.log(JSON.parse(response));
            var lessons = JSON.parse(response);
            
            for (var i=0; i<lessons.length; i++) {
                
                $("#" + lessons[i].Day).html(dateFormatter(lessons[i]));
            }
            
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });

}



function dateFormatter(lesson) {
    var start = lesson.StartingTime.toString().slice(0,2);
    var end =  lesson.EndingTime.toString().slice(0,2);
    return start + " - " + end;
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



