<?php
$subject = "Новое сообщение контактной формы amp.photo";

$name = check_input($_POST['name'], "Вы не ввели свое имя");
$email = check_input($_POST['email']);
$telephone = check_input($_POST['telephone']);
$message = check_input($_POST['message'], "Вы не указали текст сообщения");
$contact_way = $_POST['way'];

if ($email == '') {
  if ($telephone == '') {
    show_error('Вы не указали ваших контактов');
  }
} else {
  if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email)) {
   show_error("Указанный адрес электронной почты не корректен");
  }
}

$message = "

Имя: $name
E-mail: $email
Телефон: $telephone
Способ связи: $contact_way

Message:
$message";

$targetMail = "guenhumare@gmail.com;mail@amp.photo";
$headerFields = array(
  "From: contact_form@amp.photo",
  "MIME-Version: 1.0",
  "Content-Type: text/html;charset=utf-8");

mail($targetMail, $subject, $message, implode("\r\n", $headerFields));

echo "Ваше сообщение успешно отправлено";
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