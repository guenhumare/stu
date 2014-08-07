<?php
$subject = "Холодная заявка на пробную съёмку от STU";

$name = check_input($_POST['name'], "Вы не ввели своё имя.");
$telephone = check_input($_POST['telephone'], "Не оставлен контактный номер.");

$message = "

Имя: $name
Телефон: $telephone

Message:
Это заявка на пробную съёмку.";

$targetMail = "alexey.pushkariov@gmail.com";
$headerFields = array(
  "From: contact_form@smiletous.com",
  "MIME-Version: 1.0",
  "Content-Type: text/html;charset=utf-8");

mail($targetMail, $subject, $message, implode("\r\n", $headerFields));

echo "Сообщение отправлено";
exit();

function check_input($data, $problem='') {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  if ($problem && strlen($data) == 0) {
    show_error($problem);
  }

  return $data;
}

function show_error($myError) {
  header('HTTP/1.0 400 Bad Request', true, 400);
  echo $myError;
  exit();
}