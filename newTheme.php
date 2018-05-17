<?php
$to = "markrmessmore@hotmail.com";
$subject = "New Theme on DotaTheme.com";
$txt = "This is a simple email to let you know there is a new theme on DotaTheme.com. Before it can be displayed it must be approved by a DotaTheme Admin.";
$headers = "From: webmaster@DotaTheme.com"
mail($to,$subject,$txt,$headers);
?>
