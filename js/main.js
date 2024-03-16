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
let daysInTheYear = 0;
let daysAnotherYear = 0;
let months = 0;
let year = 0;

date1.onchange = function () {
    if (!date1IsChosen) {
        date1IsChosen = true;
        date2IsChosen = false;
    }
    valueDate1 = date1.valueAsDate.getTime();
    if (valueDate2 != null) {
        differenceDates();
    }
}

date2.onchange = function () {
    if (!date2IsChosen) {
        date2IsChosen = true;
        date1IsChosen = false;
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
let difference;
let differenceOfHours;
let differenceOfMinutes;
let differenceOfYears;
let monthsArray = [];
let monthInstance = new Months();
let date1IsChosen = false;
let date2IsChosen = false;
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
                if (year2 % 4 === 0 || (month2 < 1)) {
                    daysInTheYear = 366;
                    monthInstance = new Months(i, 29);
                } else {
                    daysInTheYear = 365;
                    monthInstance = new Months(i, 28);
                }
                monthsArray.push(monthInstance);
                break;
        }
    }

    console.log(differenceInDays);
    console.log(date1IsChosen + ' date1');
    console.log(date2IsChosen + ' date2');

    if (date2IsChosen) {
        if (Math.abs(month1 - month2) !== 0) {
            for (let i = month1; i < month2; i++) {
                if (monthsArray[i].getDaysQuantity <= differenceInDays) {
                    differenceInDays = differenceInDays - monthsArray[i].getDaysQuantity;
                    months++;
                }
            }
        }

        console.log(differenceInDays);

        if (differenceInDays >= daysInTheYear) {
            if (differenceOfYears > 1) {
                daysAnotherYear = Math.abs((days - (differenceOfYears * daysInTheYear)));
            } else {
                daysAnotherYear = Math.abs(days - daysInTheYear);
            }
            year = Math.floor(days / daysInTheYear);
            days = Math.abs(daysAnotherYear);
        } else {
            days = Math.abs(differenceInDays);
        }

    } else {
        year = Math.floor(differenceInDays / daysInTheYear);
        days = differenceInDays - daysInTheYear;
    }

    if (year > 0 && months > 0) {
        if (year < 2) {
            gapDate.innerText = "L'ecart est de " + year + " annee " + months + " mois";
        } else {
            gapDate.innerText = "L'ecart est de " + year + " annees " + months + " mois";
        }
    }

    else if (year > 0 && months > 0) {
        if (year < 2) {
            gapDate.innerText = "L'ecart est de " + year + " annne " + days + " jours " + months + " mois";
        } else {
            gapDate.innerText = "L'ecart est de " + year + " annnes " + days + " jours " + months + " mois";
        }
    }

    else if (year > 0 && months > 0) {
        if (year < 2) {
            gapDate.innerText = "L'ecart est de " + year + " annne " + days + " jour " + months + " mois";
        } else {
            gapDate.innerText = "L'ecart est de " + year + " annnes " + days + " jour " + months + " mois";
        }
    }

    else if (year > 0 && months === 0) {
        if (year < 2) {
            gapDate.innerText = "L'ecart est de " + year + " annne " + days + " jours";
        } else {
            gapDate.innerText = "L'ecart est de " + year + " annnes " + days + " jours";
        }
    }

    else if (year > 0 && months === 0) {
        if (year < 2) {
            gapDate.innerText = "L'ecart est de " + year + " annne " + days + " jour";
        } else {
            gapDate.innerText = "L'ecart est de " + year + " annnes " + days + " jour";
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