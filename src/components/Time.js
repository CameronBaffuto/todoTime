import React, { useEffect, useState } from "react";
import moment from 'moment';

export default function Time() {

var days = 10;
	
var date = new Date()
console.log("moment date", date)

var newDate = moment(date).add(days, 'days').format('YYYY-MM-DD');
console.log("new", newDate)

const targetTime = moment(newDate);
const [currentTime, setCurrentTime] = useState(moment());
const timeBetween = moment.duration(targetTime.diff(currentTime));

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTime(moment());
  }, 1000);

  return () => clearInterval(interval);
}, []);

  return (
	<div>
       {/* <Moment fromNow>{newDate}</Moment>
       <br />
       <Countdown date={Date.now() + newDate} /> */}

      <p className="counter">
        <span>{timeBetween.years()}yr </span>
        <span>{timeBetween.months()}m </span>
        <span>{timeBetween.days()}d </span>
        <span>{timeBetween.hours()}h </span>
        <span>{timeBetween.minutes()}min </span>
        <span>{timeBetween.seconds()}s </span>
      </p>
	</div>
  )
}
