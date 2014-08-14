<?php
$subject = "Горячая заявка на расчёт проекта от STU";

$name = check_input($_POST['name'], "Вы не ввели своё имя.");
$email = check_input($_POST['email']);
$telephone = check_input($_POST['telephone']);
$message = check_input($_POST['message'], "Описание проекта не заполнено.");
$contact_way = $_POST['way'];

if ($email == '') {
  if ($telephone == '') {
    show_error('Вы не оставили контактов.');
  }
} else {
  if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email)) {
   show_error("Проверьте адрес почты.");
  }
}

$message = "

Имя: $name
E-mail: $email
Телефон: $telephone
Способ связи: $contact_way

Message:
$message";

$targetMail = "guenhumare@gmail.com;mail@smiletous.com";
$headerFields = array(
  "From: contact_form@smiletous.com",
  "MIME-Version: 1.0",
  "Content-Type: text/html;charset=utf-8");

mail($targetMail, $subject, $message, implode("\r\n", $headerFields));

echo "Сообщение отправлено.";
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