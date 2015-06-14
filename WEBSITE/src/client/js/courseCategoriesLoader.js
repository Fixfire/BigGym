$(document).ready(documentReady);

function documentReady(){
    console.log("I'm ready");
    var category = getUrlVars()["cat"];
    loadCoursesCategories(category);
}

// Funciton that create the context in the html page.
function createContext(category){
    var el="";
    el += "<a href='#'>" + category + "</a> <span> > </span>";
    el += "<h3 class='page-header'>" + category + " Course</h3>";
    $("#context").html(el);
}

// Funciton that loads all the elements of the Courses of Category page.
function loadCoursesCategories(category){

    console.log("Loading courses " + category.toString());
    
    document.title="All courses by categories";
    
    $.ajax({
        method: "POST",
        crossDomain: true, 
        url: "http://bigbiggym.altervista.org/server/getAllCourses_category.php",
        data: {category:category},
        success: function(response) {
            console.log(JSON.parse(response));
            var courses = JSON.parse(response);
            var el = "";
            
            createContext(category);
            
            el += "<div class='row'>";
            if(courses.length>0){
                for (var i=0; i<courses.length; i++) {

                    console.log(courses[i].Name);

                    el += "<div class='col-md-4'>";
                    el += "<img src='images/" + courses[i].Name  + "/main.png' height='200' width='230' />";
                    el += "<h3>" + courses[i].Name + "</h3>";
                    el += "<p id='courseDetail'>" + courses[i].ShortDescription + "</p>";
                    el += "<p>Category: " + courses[i].Category + "</p>";
                    el += "<p>Level: " + courses[i].Level + "</p>";
                    el += "<button class='btn' type='button' id='std-btn' onclick=\"parent.location='course.html?name=" + courses[i].Name + "&from=" + courses[i].Category + "'\">More Info</button>";
                    el += "</div>";
                }
            }else{
                el += "No courses";
            }
            el += "</div>";
            console.log(el);
            $("#container").html(el);
        },
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


