/* ==================================================
	Калькулятор стоимости тура
================================================== */

// Функция расчёта стоимости одной панорамы в зависимости от их числа
function panoPrice(count) {
	if (count <= 9)  return 2500;
	if (count <= 19) return 2250;
	if (count >= 20) return 2000;
	return 2000;
}

// Не используется
function tourPrice(count) {
	var price = 1500;
	if (count > 5) {
		var magic = ~~((count - 5) / 5) + 1;
		price += 1000 * magic;
	}

	return 0;
}

// Функция расчёта полей калькулятора
function recalculate() {
	var panoCount = parseInt(jQuery('#tourcalc-pano-count').val());
	var photoCountText = (jQuery('#tourcalc-photo-count').val() || '');
	var photoCount = parseInt(photoCountText);
	var isCarPano = (jQuery('#tourcalc-is-car').val() === 'true');

	var sumSpan = jQuery('#tourcalc-sum');
	sumSpan.text('\u2014');

	var panoCountError = jQuery('#tourcalc-pano-count-error');
	if (isNaN(panoCount) || panoCount <= 0) {
		panoCountError.show();
		return;
	} else {
		panoCountError.hide();
	}

	var photoCountError = jQuery('#tourcalc-photo-count-error');
	if (photoCountText.trim() === '') {
		photoCountError.hide();
		photoCount = 0;
	} else if (isNaN(photoCount) || photoCount < 0) {
		photoCountError.show();
		return;
	} else {
		photoCountError.hide();
	}

	var singlePanoPrice = panoPrice(panoCount);
	var tourWorkPrice = tourPrice(panoCount);
	var sum = (panoCount * singlePanoPrice) + (photoCount * 500) + tourWorkPrice;

	if (isCarPano) sum *= 2;

	sumSpan.text(sum);
	sumSpan.digits();
}

// Работаем с DOM
jQuery(document).ready(function() {
	var panoCount = jQuery('#tourcalc-pano-count');
	panoCount.keyup(recalculate);
	jQuery('#tourcalc-photo-count').keyup(recalculate);
	jQuery('#tourcalc-is-car').change(recalculate);
	jQuery('#tourcalc-is-anaglyph').change(recalculate);

	var params = getQueryParameters();
	if (typeof params.count !== 'undefined') {
		panoCount.val(params.count);
	}

	recalculate();
	
	
});

/* ===============================================================
	Прокрутка до якоря (работает только этот самописный вариант)
================================================================== */
function ScrollToAnchor(id_to) {
    target = jQuery(id_to).offset().top;
	jQuery('html, body').animate({scrollTop: target}, 500);
    return false;
}


/* ==================================================
	Обработка всплывающих форм
================================================== */

// Функци вывода и скрытия тени
function ShowShadow() {
	if(document.getElementById('shadow') != null) {
		document.getElementById('shadow').style.display = "block";
	}
}

function HideShadow() {
	if(document.getElementById('shadow') != null) {
		document.getElementById('shadow').style.display = "none";
	}
}

// Форма быстрого калькулятора
function ShowAirCalcForm() {
	// Убираем форму подробного заказа
	if(document.getElementById('air-submit-form') != null) {
		document.getElementById('air-submit-form').style.display = "none";
	}

	ShowShadow();	
	
	if(document.getElementById('air-calc-form') != null) {
		document.getElementById('air-calc-form').style.display = "block";
	}	
}

function HideAirCalcForm() {	
	HideShadow();
	
	if(document.getElementById('air-calc-form') != null) {
		document.getElementById('air-calc-form').style.display = "none";
	}	
}

// Форма заказа точного расчёта
function ShowSubmitForm() {
	HideAirCalcForm();
	ShowShadow();	
		
	if(document.getElementById('air-submit-form') != null) {
		document.getElementById('air-submit-form').style.display = "block";
	}
}

function HideSubmitForm() {	
	HideShadow();
		
	if(document.getElementById('air-submit-form') != null) {
		document.getElementById('air-submit-form').style.display = "none";
	}
}

// Форма заказа пробной съёмки
function ShowAirFreePanoForm() {
	HideAirCalcForm();
	ShowShadow();	
	
	if(document.getElementById('air-freepano-form') != null) {
		document.getElementById('air-freepano-form').style.display = "block";
	}
}

function HideAirFreePanoForm() {
	HideShadow();
	
	if(document.getElementById('air-freepano-form') != null) {
		document.getElementById('air-freepano-form').style.display = "none";
	}	
}
