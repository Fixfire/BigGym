$(document).ready(documentReady);

function documentReady(){
    console.log("I'm ready");
    var name = getUrlVars()["name"];
    var from = getUrlVars()["from"];
    loadCourses(name, from);
}



// Funciton that loads all the elements of the Course page.
function loadCourses(name, from){

    console.log("Loading course " + name.toString());
    
    document.title="Course " + name.toString();
    
    //Load images and course description amd create the context.
    $.ajax({
        method: "POST",
        crossDomain: true, 
        url: "http://bigbiggym.altervista.org/server/getCourses_name.php", 
        data: {name:name},
        success: function(response) {
            console.log(JSON.parse(response));
            var courses = JSON.parse(response);
            console.log(courses[0].Name);
            if (from == "all") {
                $("#context").html("<a href='#'>" + courses[0].Category + "</a> <span> > </span>");
            } else {
                $("#context").html("<a href='#'>" + courses[0].Category + "</a> <span> > </span><a href='coursesbycategory.html?cat=" + courses[0].Category + "'>All " + courses[0].Category + " courses</a> <span> > </span>");
            }
          
            $(".headerImg").attr("src","images/" + courses[0].Category + "/head.jpg");
            $(".page-header").html(courses[0].Name);       
            $("#roomLink").html("Room " + courses[0].Room);
            $("#courseImage").attr("src","images/" + courses[0].Name + "/main.png");    
            $("#courseDescription > p").html(courses[0].Description);
            $("#courseImage1").attr("src","images/" + courses[0].Name + "/1.jpg");
            $("#courseImage2").attr("src","images/" + courses[0].Name + "/2.jpg");
            $("#courseImage3").attr("src","images/" + courses[0].Name + "/3.jpg");
            $("#courseImage4").attr("src","images/" + courses[0].Name + "/4.jpg");
  
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
    
    console.log("Loading teachers " + name.toString());

    //Load teachers info and links.
    $.ajax({
        method: "POST",
        crossDomain: true, 
        url: "http://bigbiggym.altervista.org/server/getTeaches.php", 
        data: {name:name},
        success: function(response) {
            console.log(JSON.parse(response));
            var teaches = JSON.parse(response);
            var el = "";
            
            for (var i=0; i<teaches.length; i++) {
                el += "<a href='instructor.html?instr=" + teaches[i].Id + "'><img class='img-hover' src='images/Instructors/" + teaches[i].Name + teaches[i].Surname + ".jpg' width='65' height='80' id='thunbnail' /></a>";
                el += "<p>Instructor : <a href='instructor.html?instr=" + teaches[i].Id + "'> " + teaches[i].Name + " " + teaches[i].Surname + "</a></p>";
            }
            
            console.log(el);
            $("#courseInstructor").html(el);
        },
        error: function(request,error) 
        {
            console.log("Error");
        }
    });
    
    console.log("Loading lessons " + name.toString());
    
    //Load lessons information to fill the calendar.
    $.ajax({
        method: "POST",
        crossDomain: true, //localhost purposes
        url: "http://bigbiggym.altervista.org/server/getLessons.php", //Relative or absolute path to file.php file
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
    
    console.log("Loading guided tour " + name.toString());
    //Load courses for the guided tour.
    if (from == "all") {
         $.ajax({
            method: "POST",
            crossDomain: true, //localhost purposes
            url: "http://bigbiggym.altervista.org/server/getAllCourses_alphabet.php", //Relative or absolute path to file.php file
            success: function(response) {
                console.log(JSON.parse(response));
                var courses= JSON.parse(response);
                var next;
                var prev;

                 for (var i=0; i<courses.length; i++) {
                     if (courses[i].Name == name) {
                         if (i == 0) {
                             prev = courses[courses.length - 1].Name;
                         } else {
                             prev = courses[i - 1].Name;
                         }
                         
                         if (i == (courses.length - 1)) {
                             next = courses[0].Name;
                         } else {
                             next = courses[ i + 1].Name;
                         }
                         break;
                     }
    
                 }

                $("#prev > a").attr("href","course.html?name=" + prev + "&from=" + from );
                $("#next > a").attr("href","course.html?name=" + next + "&from=" + from );
            },
            error: function(request,error) 
            {
                console.log("Error");
            }
        });
    } else {
        $.ajax({
            method: "POST",
            crossDomain: true, //localhost purposes
            url: "http://bigbiggym.altervista.org/server/getAllCourses_category.php", //Relative or absolute path to file.php file
            data: {category:from},
            success: function(response) {
                console.log(JSON.parse(response));
                var courses= JSON.parse(response);
                var next;
                var prev;

                 for (var i=0; i<courses.length; i++) {
                     if (courses[i].Name == name) {
                         if (i == 0) {
                             prev = courses[courses.length - 1].Name;
                         } else {
                             prev = courses[i - 1].Name;
                         }
                         
                         if (i == (courses.length - 1)) {
                             next = courses[0].Name;
                         } else {
                             next = courses[ i + 1].Name;
                         }
                         break;
                     }
    
                 }

                $("#prev > a").attr("href","course.html?name=" + prev + "&from=" + from );
                $("#next > a").attr("href","course.html?name=" + next + "&from=" + from );
            },
            error: function(request,error) 
            {
                console.log("Error");
            }
        });
        
    }
    
}


//Function that format the data.
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



