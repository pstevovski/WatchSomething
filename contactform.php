<?php

if(isset($_POST['submit'])) {
    $name = $_POST['name'];
    $emailFrom = $_POST['mail'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mailTo = "stevovski.petar@gmail.com";
    $headers = "From: ".$emailFrom;
    $txt = "You have recieved an email from ".$name.".\n\n\".$message;

    mail($mailTo,$subject,$txt,$headers);
}