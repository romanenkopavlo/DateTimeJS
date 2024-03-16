class Months {
    numberOfMonth;
    daysQuantity;
    get getNumberOfMonth() {
        return this.numberOfMonth;
    }

    set setNumberOfMonth(value) {
        this.numberOfMonth = value;
    }

    get getDaysQuantity() {
        return this.daysQuantity;
    }

    set setDaysQuantity(value) {
        this.daysQuantity = value;
    }
    constructor(numberOfMonth, daysQuantity) {
        this.numberOfMonth = numberOfMonth;
        this.daysQuantity = daysQuantity;
    }
}

export default Months;