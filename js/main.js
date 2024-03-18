import Months from "./Months.js";

let date1 = document.getElementById("date1");
let date2 = document.getElementById("date2");

let time1 = document.getElementById("time1");
let time2 = document.getElementById("time2");

let gapDate = document.getElementById("gapDate");
let gapTime = document.getElementById("gapTime");


let valueDate1;
let valueDate2;
let differenceInDays;
let days = 0;
let daysInTheYear = 365;
let daysAnotherYear = 0;
let months = 0;
let year = 0;

date1.onchange = function () {
    if (!isYearStart1) {
        yearStart1 = date1.valueAsDate.getFullYear();
    }
    valueDate1 = date1.valueAsDate.getTime();
    if (valueDate2 != null) {
        differenceDates();
    }
}

date2.onchange = function () {
    if (!isYearStart2) {
        yearStart2 = date2.valueAsDate.getFullYear();
    }
    valueDate2 = date2.valueAsDate.getTime();
    if (valueDate1 != null) {
        differenceDates();
    }
}

let valueTime1;
let valueTime2;
let month1;
let month2;
let year1;
let year2;
let yearStart1;
let yearStart2;
let isYearStart1 = false;
let isYearStart2 = false;
let difference;
let differenceOfHours;
let differenceOfMinutes;
let differenceOfYears;
let daysBuffered;
let getDifference;
let monthsArray = [];
let monthInstance = new Months();
const milliSecondsInDay = 1000 * 3600 * 24;

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
    year1 = date1.valueAsDate.getFullYear();
    year2 = date2.valueAsDate.getFullYear();
    month1 = date1.valueAsDate.getMonth();
    month2 = date2.valueAsDate.getMonth();

    differenceOfYears = Math.abs(year2 - year1);
    differenceInDays = Math.abs(valueDate2 - valueDate1) / milliSecondsInDay;

    for (let i = 0; i < 12; i++) {
        switch (i) {
            case 0:
            case 2:
            case 4:
            case 6:
            case 7:
            case 9:
            case 11:
                monthInstance = new Months(i, 31);
                monthsArray.push(monthInstance);
                break;
            case 3:
            case 5:
            case 8:
            case 10:
                monthInstance = new Months(i, 30);
                monthsArray.push(monthInstance);
                break;
            case 1:
                if ((year1 % 4 === 0) || (year2 % 4 === 0)) {
                    monthInstance = new Months(i, 29);
                } else {
                    monthInstance = new Months(i, 28);
                }
                monthsArray.push(monthInstance);
                break;
        }
    }

    if (year1 === year2) {
        if (month2 > month1) {
            for (let i = month1; i < month2; i++) {
                if (differenceInDays >= monthsArray[i].getDaysQuantity) {
                    differenceInDays = differenceInDays - monthsArray[i].getDaysQuantity;
                    months++;
                }
            }
        } else if (month2 < month1) {
            for (let i = month2; i < month1; i++) {
                if (differenceInDays >= monthsArray[i].getDaysQuantity) {
                    differenceInDays = differenceInDays - monthsArray[i].getDaysQuantity;
                    months++;
                }
            }
        }
        days = Math.abs(differenceInDays);
    } else if (month2 > month1) {
        calculerJours();
        calculerMois(month1, month2);
        if (year2 > year1) {
            calculerLaResteDuJours();
        } else {
            if (days <= daysInTheYear) {
                days = differenceInDays;
            } else {
                calculerMois(month2, month1);
                getDifference = differenceInDays;
            }
        }
    } else if (month2 < month1) {
        calculerJours();
        if (year1 < year2) {
            calculerMois(month1, month2);
        } else {
            calculerMois(month2, month1);
        }
        calculerLaResteDuJours();
    } else if (month2 === month1) {
        calculerJours();
        calculerMois(month1, month2);
        calculerLaResteDuJours();
    }

    if (days >= daysInTheYear) {
        if (differenceOfYears > 1) {
            if (getDifference >= 0) {
                daysAnotherYear = getDifference;
            } else {
                daysAnotherYear = Math.abs((days - (differenceOfYears * daysInTheYear)));
            }
        } else {
            if (getDifference >= 0) {
                daysAnotherYear = getDifference;
            } else {
                daysAnotherYear = Math.abs(days - daysInTheYear);
            }
        }
    }

    if (days >= daysInTheYear && months > 0 && daysAnotherYear === 0) {
        year = Math.floor(days / daysInTheYear);
        if (months === 12) {
            year++;
        }
        if (year < 2) {
            gapDate.innerText = "L'ecart est de " + year + " annee " + months + " mois";
        } else {
            gapDate.innerText = "L'ecart est de " + year + " annees " + months + " mois";
        }
    }

    else if ((months === 12 || months === 0) && days === 0 && (year1 !== year2)) {
        gapDate.innerText = "L'ecart est de 1 annee";
    }

    else if (days >= daysInTheYear && months > 0 && daysAnotherYear >= 2) {
        year = Math.floor(days / daysInTheYear);
        if (year < 2) {
            gapDate.innerText = "L'ecart est de " + year + " annee " + daysAnotherYear + " jours " + months + " mois";
        } else {
            gapDate.innerText = "L'ecart est de " + year + " annees " + daysAnotherYear + " jours " + months + " mois";
        }
    }

    else if (days >= daysInTheYear && months > 0 && daysAnotherYear < 2) {
        year = Math.floor(days / daysInTheYear);
        if (year < 2) {
            gapDate.innerText = "L'ecart est de " + year + " annee " + daysAnotherYear + " jour " + months + " mois";
        } else {
            gapDate.innerText = "L'ecart est de " + year + " annees " + daysAnotherYear + " jour " + months + " mois";
        }
    }

    else if (days >= daysInTheYear && months === 0 && daysAnotherYear >= 2) {
        year = Math.floor(days / daysInTheYear);
        if (year < 2) {
            gapDate.innerText = "L'ecart est de " + year + " annee " + daysAnotherYear + " jours";
        } else {
            gapDate.innerText = "L'ecart est de " + year + " annees " + daysAnotherYear + " jours";
        }
    }

    else if (days >= daysInTheYear && months === 0 && daysAnotherYear < 2) {
        year = Math.floor(days / daysInTheYear);
        if (year < 2) {
            gapDate.innerText = "L'ecart est de " + year + " annee " + daysAnotherYear + " jour";
        } else {
            gapDate.innerText = "L'ecart est de " + year + " annees " + daysAnotherYear + " jour";
        }
    }

    else if (days >= 2 && months > 0) {
        gapDate.innerText = "L'ecart est de " + days +  " jours " + months + " mois";
    }

    else if (days < 2 && days > 0 && months > 0) {
        gapDate.innerText = "L'ecart est de " + days + " jour " + months + " mois";
    }

    else if (days === 0 && months > 0) {
        gapDate.innerText = "L'ecart est de " + months + " mois";
    }

    else if (days >= 2 && months === 0) {
        gapDate.innerText = "L'ecart est de " + days + " jours";
    }

    else if (days < 2 && months === 0) {
        gapDate.innerText = "L'ecart est de " + days + " jour";
    }

    months = 0;
}
function differenceTimes() {
    if (valueTime1 > valueTime2) {
        difference = (milliSecondsInDay - valueTime1) + valueTime2;
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

function calculerJours() {
    daysBuffered = differenceInDays;
    differenceOfYears = Math.floor(daysBuffered / daysInTheYear);
    differenceInDays = daysBuffered - (daysInTheYear * differenceOfYears);
    days = Math.abs(daysBuffered);
}

function calculerMois(first_month, second_month) {
    for (let i = first_month; i < 12; i++) {
        if (differenceInDays >= monthsArray[i].getDaysQuantity) {
            differenceInDays = differenceInDays - monthsArray[i].getDaysQuantity;
            months++;
        }
        if (i === 11) {
            for (let j = 0; j < second_month; j++) {
                if (differenceInDays >= monthsArray[i].getDaysQuantity) {
                    differenceInDays = differenceInDays - monthsArray[i].getDaysQuantity;
                    months++;
                }
            }
        }
    }
}

function calculerLaResteDuJours() {
    if (days <= daysInTheYear) {
        days = differenceInDays;
    } else {
        getDifference = differenceInDays;
    }
}