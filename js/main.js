let date1 = document.getElementById("date1");
let date2 = document.getElementById("date2");

let time1 = document.getElementById("time1");
let time2 = document.getElementById("time2");

let gapDate = document.getElementById("gapDate");
let gapTime = document.getElementById("gapTime");


let valueDate1;
let valueDate2;
let daysInMonth;
let differenceInDays;
let days;
let months;
let years;

date1.onchange = function () {
    valueDate1 = date1.valueAsDate.getTime();
    if (valueDate2 != null) {
        differenceDates();
    }
}

date2.onchange = function () {
    valueDate2 = date2.valueAsDate.getTime();
    if (valueDate1 != null) {
        differenceDates();
    }
}

let valueTime1;
let valueTime2;
let difference;
let differenceOfHours;
let differenceOfMinutes;

time1.onchange = function () {
    valueTime1 = time1.valueAsDate.getTime();
    if ((valueTime2 != null)) {
        differenceTimes();
    }
}

time2.onchange = function () {
    valueTime2 = time2.valueAsDate.getTime();
    if ((valueTime1 != null)) {
        differenceTimes();
    }
}

function differenceDates() {
    differenceInDays = Math.abs(valueDate2 - valueDate1) / (1000 * 3600 * 24);
    daysInMonth = 0;
    if (differenceInDays < 2) {
        gapDate.innerText = "L'ecart est de " + differenceInDays + " jour";
    } else {
        gapDate.innerText = "L'ecart est de " + differenceInDays + " jours";
    }

    if (differenceInDays >= 31 && differenceInDays <= 365) {
        if (differenceInDays % 31 === 0) {
            months = differenceInDays / 31;
            gapDate.innerText = "L'ecart est de " + months + " mois";
        } else {
            days = differenceInDays % 31;
            months = Math.floor(differenceInDays / 31);
            gapDate.innerText = "L'ecart est de " + days + " jours " +  months + " mois";
        }
    }
}
function differenceTimes() {
    if (valueTime1 > valueTime2) {
        difference = ((1000 * 60 * 60 * 24) - valueTime1) + valueTime2;
    } else {
        difference = Math.abs(valueTime2 - valueTime1);
    }

    differenceOfHours = Math.floor(difference / (1000 * 60 * 60));
    differenceOfMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    if ((differenceOfHours < 10) && (differenceOfMinutes < 10)) {
        gapTime.innerText = "L'ecart est de " + "0" + differenceOfHours + ":" + "0" + differenceOfMinutes;
    } else if (differenceOfHours < 10) {
        gapTime.innerText = "L'ecart est de " + "0" + differenceOfHours + ":" + differenceOfMinutes;
    } else if (differenceOfMinutes < 10) {
        gapTime.innerText = "L'ecart est de " + differenceOfHours + ":" + "0" + differenceOfMinutes;
    } else {
        gapTime.innerText = "L'ecart est de " + differenceOfHours + ":" + differenceOfMinutes;
    }
}