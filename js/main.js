let date1 = document.getElementById("date1");
let date2 = document.getElementById("date2");

let time1 = document.getElementById("time1");
let time2 = document.getElementById("time2");

let gapDate = document.getElementById("gapDate");
let gapTime = document.getElementById("gapTime");


let valueDate1;
let valueDate2;
let differenceOfDates;

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
    differenceOfDates = Math.abs(valueDate2 - valueDate1) / (1000 * 3600 * 24);
    if (differenceOfDates < 2) {
        gapDate.innerText = "L'ecart est de " + differenceOfDates + " jour";
    } else {
        gapDate.innerText = "L'ecart est de " + differenceOfDates + " jours";
    }

}
function differenceTimes() {
    difference = Math.abs(valueTime2 - valueTime1);
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