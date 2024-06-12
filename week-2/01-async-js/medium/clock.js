function clockWork() {
    const time = new Date()
    let hours = time.getHours()
    let minutes = time.getMinutes()
    let seconds = time.getSeconds()
    let meridian = ''

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes: minutes;
    seconds = seconds < 10 ? '0' + seconds: seconds;
    meridian = hours < 12 ? 'AM' : 'PM'

    const clock = hours + ":" + minutes + ":" + seconds + " " + meridian

    console.log(clock);

    setTimeout(clockWork, 1000)

}
clockWork()
setInterval(clockWork, 1000)