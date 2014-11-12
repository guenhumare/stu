stu
===
Сайт сделан на базе шаблонизатора Stacey. Stacey работает очень просто - в каталоге `/content` и его подкаталогах лежат текстовые файлы, в которых определяются некоторые переменные, подставляемые в шаблон, а также весь остальной контент сайта - то есть изображения, флеш-ролики и так далее, за исключением "очень редко" меняющихся файлов, типа css и js, и еще одним - о котором я напишу отдельно ниже - для них предназначен каталог `/public`. На основе этих файлов и шаблонов из каталога `/templates` и создаются показываемые пользователю странички. Более подробно это описано в документации Stacey, здесь же я опишу особенности используемых шаблонов применительно к желаемой структуре сайта.

Сайт имеет следующую структуру (в скобках приведены подкаталоги `content` и URL соответствующих страниц):

Заглавная страница (/index, /)
	Фотогалереи (/05.gallery/, /gallery/)
		Альбом1 (/05.gallery/01.asdf/, /gallery/asdf/)
		Альбом2 (/05.gallery/02.zxcv/, /gallery/zxcv/)
		Альбом3 (/05.gallery/03.qwer/, /gallery/qwer/)
		...
	Виртуальные туры (/04.tours/, /tours/)
		Тур1 (/04.tours/01.asdf/, /tours/asdf/)
		Тур2 (/04.tours/02.zxcv/, /tours/zxcv/)
		...
	3D-объекты (/03.3d/, /3d/)
		Объект1 (/03.3d/01.asdf/, /3d/asdf/)
		Объект2 (/03.3d/02.zxcv/, /3d/zxcv/)
		...
	Блог (/02.blog/, /blog/)
		Запись1 (/02.blog/01.asdf/, /blog/asdf/)
		Запись2 (/02.blog/02.zxcv/, /blog/zxcv/)
		...
	Контакты (/01.contact/, /contact/)

Механизм формирования URL из имени подкаталога проще пояснить примерами выше, чем описывать подробно. Общий принцип - странице сайта соответствует каталог, его содержимое - непосредственное содержимое страницы, его подкаталоги - "дочерние" страницы. Порядок, в котором перечисляются разделы сайта (и вложенные страницы) - обратный порядку их нумерации.

Если каталог соответствует странице сайта, то он должен содержать один текстовый файл, имя которого определяет используемый для этой страницы шаблон. Для каждого из разделов сайта применяются разные шаблоны, поэтому произвольно редактировать эти файлы не стоит. Рассмотрим некоторые "типовые" задачи, возникающие при обновлении сайта.

#Добавление новой фотогалереи

Создаем в каталоге `/content/05.gallery/` новый каталог. Номер его должен быть "следующим" по отношению к существующим, оставшаяся часть имени будет определять URL. В этом каталоге создаем файл `album.txt` со следующим содержанием:

title: Название
-

На место слова "Название" вставляем желаемое название галереи - не очень длинное. Оно будет отображаться в качестве заголовка (title) HTML-страницы галереи, а также в интерфейсе просмотра "всех галерей" как ее название.

Перейдем к непосредственному содержимому галереи. Все файлы в ней ожидаются в виде изображений любого распространенного формата и произвольного размера. Вместе с изображениями нужно выложить их "уменьшенные" (до размера 370 пикселей в ширину, и желательно одинаковой во всех случаях высоты - скажем, 246 пикселей, что соответствует соотношению сторон фотоснимка) версии, назвав их так же, как и оригинальные, но с добавлением суффикса `_sml` к имени файла - например, `file.jpg` соответствует `file_sml.jpg`. Важно, чтобы совпадали регистры символов в именах и расширениях "полной" и "уменьшенной" картинок (Batch в Фотошопе иногда приводит расширение к нижнему регистру). Кроме того, в каталоге галереи нужен файл `thumb.jpg` того же размера - который будет отображаться на страничке "всех галерей".

#Виртуальные туры

Здесь все аналогично случаю фотогалереи - только файл называется `tour.txt`, а в нем определяется еще и переменная `content`:

title: Название
-
content: Содержимое страницы, с `Markdown` или <html>-форматированием</html>
-

На странице тура ее содержимое будет отображаться внизу, туда можно внести описание изображенного на снимке.

Содержимое каталога - все тот же `thumb.jpg` и `swf`-файл собственно виртуального тура с файлом настроек - `xml`-файл с названием типа `file.swf.xml` (дописываем `.xml` к названию), кучка разных каталогов с изображениями и так далее). А вот само "содержание" тура иногда представляет собой исключение. Из-за того, что скрипт тура в некоторых своих версиях не дружит со сложными RewriteRule в .htaccess, и "расчитывает" на то, что файлы изображений можно получить простым приписыванием относительного пути к URL, приходится выкладывать изображения в `/public`. Например, если каталог тура (относительно "корня" сайта) находится по адресу `/content/04.tours/01.asdf/`, то составляющие панораму изображения нужно выложить в `/public/tours/asdf/panos/` и так далее (сохраняя ожидаемую туром структуру подкаталогов).

#3D-объекты

Здесь, к сожалению, файл с переменными - `object.txt` - пришлось еще усложнить.

title: Название
-
frames: 20
-
frame: 14
-
rows: 6
-
row 3
-
images-path: @path
-
images: ###.jpg
-
speed: 0.3
-
content: Содержимое страницы, с `Markdown` или <html>-форматированием</html>
-

Смысл переменных `title` и `content` остается прежним. Остальные переменные относятся к параметрам плагина jQuery.reel **[http://jquery.vostrel.cz/reel]. Значение `images-path` менять не надо, не понимая сути происходящего (если придерживаться той идеологии, что снимки лежат в одном каталоге с файлом описания). Поддерживаются следующие параметры (возможно, список будет расширяться):

* frames
* footage
* orbital
* rows
* frame
* row
* images
* cw
* inversed
* speed
* timeout
* brake

Их назначение описано в документации jQuery.reel и примерах, идущих вместе с плагином. Не все из них являются обязательными, например, frames можно опустить, если определены footage и rows.

Содержимое каталога - `thumb.jpg` и снимки, которые будут "ротироваться".

#Блог, добавление новых записей

Каждой записи блога, опять же, соответствует отдельный каталог, а файл параметров называется `blog-post.txt`. В нем параметров еще больше:

title: Название
-
author: Неизвестный летчик-пародист АС Пушкин
-
short-content: Короткий вариант записи
-
content: Полный текст записи
-

Короткий вариант текста записи, определенный в `short-content`, показывается в нижней части главной страницы сайта и на странице блога. В нем можно либо коротко пересказать содержание, либо ограничиться несколькими первыми предложениями - в зависимости от фантазии и художественных талантов автора.

#Контакты

Здесь, я надеюсь, все понятно и без перевода :)

Этого описания должно хватить для стандартных задач, возникающих при обновлении содержимого сайта.

#"Общие" переменные

Как несложно заметить, переменные в файлах контента несут один и тот же смысл. Здесь будут описаны все "глобально используемые" переменные, общие для всех шаблонов.

title: Название, показывается в заголовке страницы и внутри самой страницы (на синем фоне)

seo-description: Определена в _shared.txt (как глобальная для всего сайта), но может переопределяться в каждом из файлов. Определяет содержимое &lt;meta name="description"&gt;.

content: "Текстовое" содержимое страницы там, где оно имеет смысл (запись блога, описание виртуального тура или 3D-объекта)

short-content: Сокращенный вариант описания страницы

Ниже идет Readme от шаблонизатора.

# Stacey 2.3.0

## Overview
Stacey takes content from `.txt` files, image files and implied directory structure and generates a website.
It is a no-database, dynamic website generator.

If you look in the `/content` and `/templates` folders, you should get the general idea of how it all works.

## Installation

Copy to server, `chmod 777 app/_cache`.

If you want clean urls, `mv htaccess .htaccess`

## Templates

There are an additional two sets of templates which can be found at:
<http://github.com/kolber/stacey-template2> &
<http://github.com/kolber/stacey-template3>

## Read More

See <http://staceyapp.com> for more detailed usage information.

## Copyright/License

Copyright (c) 2009 Anthony Kolber. See `LICENSE` for details.
Except PHP Markdown Extra which is (c) Michel Fortin (see `/app/parsers/markdown-parser.inc.php` for details) and
JSON.minify which is (c) Kyle Simpson (see 'app/parsers/json-minifier.inc.php' for details).
