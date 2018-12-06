import React, { Component } from 'react';
import DateFns from 'date-fns';
import es from 'date-fns/locale/es';

class Calendar extends Component {
    state = {
        currentMont: new Date(),
        selectedDate: new Date()
    };

    renderHeader() {
        const dateFormat = "MMMM";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>
                        {DateFns.format(this.state.currentMont, dateFormat, {locale: es})}
                    </span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">
                        chevron_right
                    </div>
                </div>
            </div>
        )
    };

    renderDays() {
        const dateFormat = "dddd";
        const days = [];

        let startDate = DateFns.startOfWeek(this.state.currentMont);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-denter">
                    {DateFns.format(DateFns.addDays(startDate, i), dateFormat, {locale: es})}
                </div>
            )
        }
        return (
            <div className="days row">
                {days}
            </div>
        )
    };

    renderCells() {
        const { currentMont, selectedDate } = this.state;
        const monthStart = DateFns.startOfMonth(currentMont);
        const monthEnd = DateFns.endOfMonth(monthStart);
        const startDate = DateFns.startOfWeek(monthStart);
        const endDate = DateFns.endOfWeek(monthEnd);
        
        const dateFormat = "D";
        const rows = [];
    
        let days = [];
        let day = startDate;
        let formattedDate = "";
    
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = DateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push (
                    <div
                        className={`col cell ${
                            !DateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : DateFns.isSameDay(day, selectedDate) ? "selected" : ""
                        }`}
                        key={day}
                        onClick={ () => this.onDateClick(DateFns.parse(cloneDay)) }
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = DateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row">
                    {days}
                </div>
            )
            days = [];
        }
        return <div className="body">{rows}</div>;
    };

    onDateClick = (day) => {
        this.setState({
            selectedDate: day
          });
    };

    nextMonth = () => {
        this.setState({
            currentMont: DateFns.addMonths(this.state.currentMont, 1)
        })
    };

    prevMonth = () => {
        this.setState({
            currentMont: DateFns.subMonths(this.state.currentMont, 1)
        })
    };

    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        );
    }
}

export default Calendar;