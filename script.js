document.addEventListener('DOMContentLoaded', () => {
    const timerList = document.getElementById('timerList');
    const startStopTimerButton = document.getElementById('startStopTimer');
    const audio = document.getElementById('audio');
    
    let activeTimer = null;

    // Function to format time as HH:MM:SS
    function formatTime(timer) {
        const hoursStr = String(timer.hours).padStart(2, '0');
        const minutesStr = String(timer.minutes).padStart(2, '0');
        const secondsStr = String(timer.seconds).padStart(2, '0');
        return `${hoursStr}:${minutesStr}:${secondsStr}`;
    }

    // Function to play the audio alert
    function playAudioAlert() {
        audio.play();
    }

    // Function to stop the audio when the "Stop Timer" button is clicked
    function stopAudio() {
        audio.pause();
        audio.currentTime = 0;
    }

    // Event listener for the "Start/Stop Timer" button
    startStopTimerButton.addEventListener('click', () => {
        if (!activeTimer) {
            startNewTimer();
        } else {
            clearInterval(activeTimer.intervalID);
            activeTimer = null;
            stopAudio(); // Stop the audio when stopping the timer
            startStopTimerButton.textContent = 'Start Timer';
            startStopTimerButton.classList.remove('stop-timer'); // Remove the class that makes it red
            timerList.innerHTML = ''; // Clear the active timer display
        }
    });

    function startNewTimer() {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;

        if (hours === 0 && minutes === 0 && seconds === 0) {
            alert('Please enter a valid time.');
            return;
        }

        const timer = {
            hours,
            minutes,
            seconds,
            intervalID: null
        };

        activeTimer = timer;

        const timerElement = document.createElement('div');
        timerList.appendChild(timerElement);

        timer.intervalID = setInterval(() => {
            timer.seconds--;

            if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
                clearInterval(timer.intervalID);
                // Play an audio alert
                playAudioAlert();
                startStopTimerButton.textContent = 'Stop Timer';
                timerElement.textContent = 'Time Left: 00:00:00'; // Show 00:00:00 when time is up
                startStopTimerButton.classList.add('stop-timer'); // Add the class that makes it red
            } else {
                startStopTimerButton.textContent = 'Stop Timer';
                timerElement.textContent = `Time Left: ${formatTime(timer)}`;
            }
        }, 1000);
    }
});
