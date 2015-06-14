<?php

session_start();
require_once("twitteroauth-master/twitteroauth/twitteroauth.php"); //Path to twitteroauth library

$twitterprofile = $_POST["twitterprofile"];

$twitteruser = $twitterprofile;
$notweets = 4;
$consumerkey = "BOovZUcHv2fQlXeDhTFPVGQZ1";
$consumersecret = "jku7hEXIePj1BFk7Y2uxwqbz6sm5RBfEaI18VCDg8e8pGW02pw";
$accesstoken = "398745094-qp0ggaEmbwWQAhaMM0vvTwkOC1M7ux2D9C9CGEBi";
$accesstokensecret = "BhZO7VjV0pO9m8nDU7hYgKGueRqgtBQWitIQdzpbSuQ7f";
 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);

echo json_encode($tweets);
?>
