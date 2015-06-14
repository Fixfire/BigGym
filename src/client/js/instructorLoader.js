$(document).ready(documentReady);

function documentReady(){
    //Facebook script setup
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
          appId: '1677221109163837',
          xfbml      : true,
          version: 'v2.3' // or v2.0, v2.1, v2.0
        });     
        $('#loginbutton,#feedbutton').removeAttr('disabled');
    });
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
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://bigbiggym.altervista.org/server/GetInstructorCategories.php", //Relative or absolute path to file.php file
        data: {id:id},
        success: function(response) {
            categoriesList=JSON.parse(response);
            var el2="";
            for(var j=0;j<categoriesList.length;j++){
                el2+="<a href='#'>"+categoriesList[j].Category+"</a><br>";
            }
            $(".categoriesTeaching").html(el2);
        1},
    });
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://bigbiggym.altervista.org/server/HasAwards.php", //Relative or absolute path to file.php file
        data: {id:id},
        success: function(response) {
            var result=JSON.parse(response);
            hasAwards=result['boolean'];
            if(hasAwards){
                $("#awardsLink").html("Personal Awards");
            }else{
                $("#awardsLink").hide();
            }
        1},
    });
    
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://bigbiggym.altervista.org/server/GetInstructor.php", //Relative or absolute path to file.php file
        data: {id:id},
        success: function(response) {
            var instructors=JSON.parse(response);
            var el="";
            
            createContext(from,el,instructors);
            el="";
            for(var i=0;i<instructors.length;i++){
                //Set the document title
                document.title=instructors[i].Name+" "+instructors[i].Surname;
                //Fill instructor name
                el+=instructors[i].Name+" "+instructors[i].Surname;
                $("#instructorName").html(el);
                //Fill the instructorContent
                $("#instrThumbnail").attr("src","images/Instructors/"+instructors[i].Name+instructors[i].Surname+".jpg");
                $(".instructorPositionTitle").html(instructors[i].Position);
                $(".instructorCertTitle").html(instructors[i].Certifications);
                $("#biography").html(instructors[i].Biography);
                
                $("#awardsLink").attr("href","awards.html?id="+instructors[i].Id+"&name="+instructors[i].Name+"&surname="+instructors[i].Surname);
                
                $("#teaches").attr("href","http://bigbiggym.altervista.org/client/teaches.html?instr="+instructors[i].Id+"&name="+instructors[i].Name+"&surname="+instructors[i].Surname);
                //Fill tweets div
                if(!instructors[i].TwitterURL==""){
                    fillTweets(instructors[i]);
                    
                }else{
                    $('#twitter-api').hide();
                }
            }
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

/* TWETTER JS CORE*/
function fillTweets(instructor) {
    var displaylimit = 4;
    var twitterprofile = instructor.TwitterURL;
	//var screenname = instructor.Name"Michele Zanella";
    var showdirecttweets = false;
    var showretweets = true;
    var showtweetlinks = true;
    var showprofilepic = true;
	//var showtweetactions = false;
	//var showretweetindicator = false;
	
	var headerHTML = '';
	var loadingHTML = '';
	headerHTML += '<a href="https://twitter.com/" target="_blank"><img src="images/twitter-bird-light.png" width="34" style="float:left;padding:3px 12px 0px 6px" alt="twitter bird" /></a>';
	headerHTML += '<span style="font-size:13px"><a href="https://twitter.com/'+twitterprofile+'" target="_blank">@'+twitterprofile+'</a></span></h1>';
	loadingHTML += '<div id="loading-container"><img src="images/ajax-loader.gif" width="32" height="32" alt="tweet loader" /></div>';
	
	$('#twitter-api').html(headerHTML + loadingHTML);
	 
    $.ajax({
        method: "POST",
        //dataType: "json", //type of data
        crossDomain: true, //localhost purposes
        url: "http://bigbiggym.altervista.org/server/TwitterFeed.php", //Relative or absolute path to file.php file
       
        data: {twitterprofile:twitterprofile},
        success: function(response) {   
            var feeds=JSON.parse(response);
		   //alert(feeds);
            var feedHTML = '';
            var displayCounter = 1;
            console.log(twitterprofile);
            console.log(feeds);
            for (var i=0; i<feeds.length; i++) {
				var tweetscreenname = feeds[i].user.name;
                var tweetusername = feeds[i].user.screen_name;
                var profileimage = feeds[i].user.profile_image_url_https;
                var status = feeds[i].text; 
				var isaretweet = false;
				var isdirect = false;
				var tweetid = feeds[i].id_str;
				
				//If the tweet has been retweeted, get the profile pic of the tweeter
				if(typeof feeds[i].retweeted_status != 'undefined'){
				   profileimage = feeds[i].retweeted_status.user.profile_image_url_https;
				   tweetscreenname = feeds[i].retweeted_status.user.name;
				   tweetusername = feeds[i].retweeted_status.user.screen_name;
				   tweetid = feeds[i].retweeted_status.id_str;
				   status = feeds[i].retweeted_status.text; 
				   isaretweet = true;
				 };
				 
				 
				 //Check to see if the tweet is a direct message
				 if (feeds[i].text.substr(0,1) == "@") {
					 isdirect = true;
				 }
				 
				//console.log(feeds[i]);
				 
				 //Generate twitter feed HTML based on selected options
				 if (((showretweets == true) || ((isaretweet == false) && (showretweets == false))) && ((showdirecttweets == true) || ((showdirecttweets == false) && (isdirect == false)))) { 
					if ((feeds[i].text.length > 1) && (displayCounter <= displaylimit)) {             
						if (showtweetlinks == true) {
							status = addlinks(status);
						}
						 
						if (displayCounter == 1) {
							feedHTML += headerHTML;
						}
									 
						feedHTML += '<div class="twitter-article" id="tw'+displayCounter+'">'; 										                 
						feedHTML += '<div class="twitter-pic"><a href="https://twitter.com/'+tweetusername+'" target="_blank"><img src="'+profileimage+'"images/twitter-feed-icon.png" width="42" height="42" alt="twitter icon" /></a></div>';
						feedHTML += '<div class="twitter-text"><p><span class="tweetprofilelink"><strong><a href="https://twitter.com/'+tweetusername+'" target="_blank">'+tweetscreenname+'</a></strong> <a href="https://twitter.com/'+tweetusername+'" target="_blank">@'+tweetusername+'</a></span><span class="tweet-time"><a href="https://twitter.com/'+tweetusername+'/status/'+tweetid+'" target="_blank">'+relative_time(feeds[i].created_at)+'</a></span><br/>'+status+'</p>';
						
						/*if ((isaretweet == true) && (showretweetindicator == true)) {
							feedHTML += '<div id="retweet-indicator"></div>';
						}						
						if (showtweetactions == true) {
							feedHTML += '<div id="twitter-actions"><div class="intent" id="intent-reply"><a href="https://twitter.com/intent/tweet?in_reply_to='+tweetid+'" title="Reply"></a></div><div class="intent" id="intent-retweet"><a href="https://twitter.com/intent/retweet?tweet_id='+tweetid+'" title="Retweet"></a></div><div class="intent" id="intent-fave"><a href="https://twitter.com/intent/favorite?tweet_id='+tweetid+'" title="Favourite"></a></div></div>';
						}*/
						
						feedHTML += '</div>';
						feedHTML += '</div>';
						displayCounter++;
					}   
				 }
            }
             
            $('#twitter-api').html(feedHTML);
			
			//Add twitter action animation and rollovers
			/*if (showtweetactions == true) {				
				$('.twitter-article').hover(function(){
					$(this).find('#twitter-actions').css({'display':'block', 'opacity':0, 'margin-top':-20});
					$(this).find('#twitter-actions').animate({'opacity':1, 'margin-top':0},200);
				}, function() {
					$(this).find('#twitter-actions').animate({'opacity':0, 'margin-top':-20},120, function(){
						$(this).css('display', 'none');
					});
				});			
			
				//Add new window for action clicks
			
				$('#twitter-actions a').click(function(){
					var url = $(this).attr('href');
				  window.open(url, 'tweet action window', 'width=580,height=500');
				  return false;
				});
			}*/
			
			
    },  
    error: function(jqXHR, textStatus, errorThrown) {
		var error = "";
			 if (jqXHR.status === 0) {
               error = 'Connection problem. Check file path and www vs non-www in getJSON request';
            } else if (jqXHR.status == 404) {
                error = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                error = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                error = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                error = 'Time out error.';
            } else if (exception === 'abort') {
                error = 'Ajax request aborted.';
            } else {
                error = 'Uncaught Error.\n' + jqXHR.responseText;
            }	
       		alert("error: " + error);
    }
    });
    

   //Function modified from Stack Overflow
    function addlinks(data) {
        //Add link to all http:// links within tweets
         data = data.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
            return '<a href="'+url+'"  target="_blank">'+url+'</a>';
        });
             
        //Add link to @usernames used within tweets
        data = data.replace(/\B@([_a-z0-9]+)/ig, function(reply) {
            return '<a href="http://twitter.com/'+reply.substring(1)+'" style="font-weight:lighter;" target="_blank">'+reply.charAt(0)+reply.substring(1)+'</a>';
        });
		//Add link to #hastags used within tweets
        data = data.replace(/\B#([_a-z0-9]+)/ig, function(reply) {
            return '<a href="https://twitter.com/search?q='+reply.substring(1)+'" style="font-weight:lighter;" target="_blank">'+reply.charAt(0)+reply.substring(1)+'</a>';
        });
        return data;
    }
     
     
    function relative_time(time_value) {
      var values = time_value.split(" ");
      time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
      var parsed_date = Date.parse(time_value);
      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	  var shortdate = time_value.substr(4,2) + " " + time_value.substr(0,3);
      delta = delta + (relative_to.getTimezoneOffset() * 60);
     
      if (delta < 60) {
        return '1m';
      } else if(delta < 120) {
        return '1m';
      } else if(delta < (60*60)) {
        return (parseInt(delta / 60)).toString() + 'm';
      } else if(delta < (120*60)) {
        return '1h';
      } else if(delta < (24*60*60)) {
        return (parseInt(delta / 3600)).toString() + 'h';
      } else if(delta < (48*60*60)) {
        //return '1 day';
		return shortdate;
      } else {
        return shortdate;
      }
    }
     
}