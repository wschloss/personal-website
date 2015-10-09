<?php
// Check for the post data
if ($_POST) {
  // Get the data sent
  $name = $_POST["name"];
  $email = $_POST["email"];
  $message = $_POST["message"];

  // Append the name to the beginning of the message
  $message = $name . ":\n" . $message;

  // And send it to meh
  mail("wcschlosser@comcast.net", "A message from: " . $email, $message);
}
?>
