<?php
$subject = "Новое сообщение контактной формы smiletous.com";

$name = check_input($_POST['name'], "Вы не ввели свое имя");
$email = check_input($_POST['email']);
$telephone = check_input($_POST['telephone']);
$message = check_input($_POST['message'], "Вы не указали текст сообщения");
#way = $_POST['way'];

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
Способ связи: $way

Message:
$message";

$targetMail = "guenhumare@gmail.com;mail@smiletous.com";
$headerFields = array(
  "From: contact_form@smiletous.com",
  "MIME-Version: 1.0",
  "Content-Type: text/html;charset=utf-8");

mail($targetMail, $subject, $message, implode("\r\n", $headerFields));

//header('Location: thanks.html');
echo "Ваше сообщение успешно отправлено";
exit();

/* Functions we used */
function check_input($data, $problem='')
{
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  if ($problem && strlen($data) == 0) {
    show_error($problem);
  }

  return $data;
}

function show_error($myError)
{
  header('HTTP/1.0 400 Bad Request', true, 400);
  echo $myError;
  exit();
}